import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import { Button } from "native-base";
import Ripple from 'react-native-material-ripple';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';


const ProductDetails = ({ navigation, route }) => {
    const [product, setProduct] = useState(null)

    useEffect(() => {
        navigation.setOptions({
            headerRight:(props) => <TouchableOpacity onPress={() => navigation.navigate('Cart')}><Entypo name="shopping-cart" size={25} color="#ffffff"/></TouchableOpacity>
        })
    })

    useEffect(() => {
        navigation.setOptions({
            title: route.params.product.name
        })
        setProduct(route.params.product)
    }, [])

    const addToCart = async () => {
        let products = await AsyncStorage.getItem('cart');
        if(products) {
            products = JSON.parse(products);
            let f  = products.find(p => p.key == product.key);
            if(!f) {
                products.unshift(product);
            }
        } else {
            products = [product];
        }
        await AsyncStorage.setItem('cart', JSON.stringify(products));
        
        navigation.navigate('Cart')
    }


    return (
        <>
            {product ? (
                <>
                    <ScrollView style={styles.detailsBox}>
                        <View style={styles.productImageBox}>
                            <Image style={styles.productImage} source={product.image} />
                            <Text style={styles.productTitle}>{product.name}</Text>
                        </View>
                        <View style={styles.detailBox}>
                            {Object.entries(product).map(([key, value], i) => {
                                if (key == 'id' || key == 'image' || key == 'category' || key == 'key') {
                                    return null;
                                } else if (key == 'Price') {
                                    return (
                                        <View style={styles.detail} key={i}>
                                            <View style={styles.key}><Text style={{ color : "#000000", fontSize : 16 }}>{key}</Text></View>
                                            <View style={styles.value}><Text style={{ color : "#000000", fontSize : 16 }}>${value}</Text></View>
                                        </View>
                                    )
                                } else {
                                    return (
                                        <View style={styles.detail} key={i}>
                                            <View style={styles.key}><Text style={{ color : "#000000", fontSize : 16 }}>{key}</Text></View>
                                            <View style={styles.value}><Text style={{ color : "#000000", fontSize : 16 }}>{value}</Text></View>
                                        </View>
                                    )
                                }
                            })}
                        </View>
                        <View style={{ height: 100 }}></View>
                    </ScrollView>
                    <Ripple onPress={addToCart} rippleColor="#ffffff" style={{
                        marginTop: 40, position: 'absolute',
                        bottom: 0,
                    }}>
                        <Button style={styles.buyNowButton}>Buy Now</Button>
                    </Ripple>
                </>
            ) : null}
        </>
    );
};


const styles = StyleSheet.create({
    detailsBox: {
        height: Dimensions.get('window').height,
    },
    container: {
        flex: 1
    },
    productImageBox: {
        height: 400,
        justifyContent: 'center',
        alignItems: "center"
    },
    productImage: {
        width: 300,
        height: 300
    },
    productTitle: {
        fontSize: 25,
        marginTop: 15,
        color : "#000000"
    },
    detailBox: {
        borderTopWidth: 1,
        borderTopColor: "#cccccc",
        borderBottomWidth: 1,
        borderBottomColor: "#cccccc"
    },
    buyNowButton: {
        width: Dimensions.get('window').width,
        backgroundColor: '#FF6666',
        height: 70
    },
    detail: {
        height: 60,
        flexDirection: "row",
    },
    key: {
        flex: 1.3,
        justifyContent: "center",
        paddingLeft: 20,
        borderRightWidth: 1,
        borderRightColor: "#cccccc",
    },
    value: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 30,
    }
});

export default ProductDetails;
