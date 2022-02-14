import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import { showMessage } from "react-native-flash-message";

const CartScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getProducts();
    }, [])


    const getProducts = async () => {
        try {
            let products = await AsyncStorage.getItem('cart');
            if (products) {
                products = JSON.parse(products);
                let t = 0;
                products.forEach((p) => {
                    t += p.Price;
                });
                setTotal(t);
                setProducts(products)
            }
        } catch (err) {
            console.log(err);
        }
    }

    const removeFromCart = async (item) => {
        let p = products.filter(p => p.key !== item.key);
        let t = 0;
        p.forEach((k) => {
            t += k.Price;
        });
        await AsyncStorage.setItem('cart', JSON.stringify(p));
        setTotal(t);
        setProducts(p);
    }

    const checkout = async () => {
        await AsyncStorage.removeItem('cart');
        setTotal(0);
        setProducts([]);
        showMessage({
            message: "Order Placed",
            type: "success",
        });
    }

    const renderProduct = ({ item }) => (
        <View style={styles.card}>
            <Image style={styles.image} source={item.image} />
            <View style={styles.detailBox}>
                <View>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={{ color: "#000000", marginTop: 10, fontWeight: "bold", fontSize: 20 }}>Price : ${item.Price}</Text>
                </View>
                <TouchableWithoutFeedback onPress={() => { removeFromCart(item) }}>
                    <Entypo name="cross" size={20} color="#000000"/>
                </TouchableWithoutFeedback>
            </View>
        </View>

    );


    return (
        <>
            <SafeAreaView style={styles.productsListBox}>
                {products.length ? (<FlatList
                    contentContainerStyle={{ paddingBottom: 90 }}
                    data={products}
                    renderItem={renderProduct}
                    keyExtractor={item => item.key}
                >
                </FlatList>) : (
                    <View style={styles.empty}>
                        <Text style={{color : "#000000"}}>Nothing to show here!</Text>
                    </View>
                )}
            </SafeAreaView>
            <>
                {products.length ? (
                    <View style={styles.checkoutSection}>
                        <View style={styles.priceBox}><Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: "#ffffff"
                        }}>Total : ${total}</Text></View>
                        <TouchableOpacity onPress={checkout} style={styles.checkoutBox}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: 'bold',
                                color: "#ffffff"
                            }}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </>
        </>
    );
};


const styles = StyleSheet.create({
    empty: {
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get('window').height,
        color : "#000000"
    },
    productsListBox: {
        height: Dimensions.get('window').height - 70,
    },
    card: {
        borderBottomWidth: 1,
        marginBottom: 5,
        padding: 10,
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        flexDirection: 'row',
        borderBottomColor: "rgba(239, 83, 84, 0.5)"
    },
    image: {
        height: 110,
        width: 110,
        marginRight: 15
    },
    detailBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    productName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "#000000"
    },
    checkoutSection: {
        height: 70,
        position: 'absolute',
        bottom: 0,
        backgroundColor: "#FF6666",
        width: Dimensions.get('window').width,
        flexDirection: 'row'
    },
    priceBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        borderRightWidth: 1,
        borderRightColor: "#cccccc"
    },
    checkoutBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default CartScreen;
