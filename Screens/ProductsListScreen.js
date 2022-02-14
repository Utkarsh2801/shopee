import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import products from '../Models/ProductsModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';


const ProductListScreen = ({ navigation, route }) => {
    const [categoryId, setCategoryId] = useState('');


    useEffect(() => {
        navigation.setOptions({
            headerRight:(props) => <TouchableOpacity onPress={() => navigation.navigate('Cart')}><Entypo name="shopping-cart" size={25} color="#ffffff"/></TouchableOpacity>
        })
    })

    useEffect(() => {
        let id = route.params.id
        let category = route.params.category;
        navigation.setOptions({
            title: category
        })
        setCategoryId(id);
    }, [])

    const renderProduct = ({ item }) => (
        <TouchableOpacity onPress={() => {
            return navigation.navigate('Details', { product : { category : categoryId, ...item } })
        }}>
            <View style={styles.card}>
                <Image style={styles.image} source={item.image}/>
                <View style={styles.detailBox}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={{color : "#000000", marginTop : 10, fontSize : 18}}>Rating : {item.Rating}</Text>
                    <Text style={{color : "#000000", marginTop : 10, fontWeight : "bold", fontSize : 20}}>Price : ${item.Price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView style={styles.productsListBox}>
            {categoryId.length ? (<FlatList
                contentContainerStyle={{ paddingBottom: 90 }}
                data={products[categoryId].products}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
            >
            </FlatList>) : null}
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    productsListBox: {
        height: Dimensions.get('window').height,
    },
    card : {
        borderBottomWidth: 1,
        marginBottom : 5,
        padding : 10,
        justifyContent : "space-between",
        backgroundColor : "#ffffff",
        flexDirection : 'row',
        borderBottomColor : "rgba(239, 83, 84, 0.5)"
    },
    image : {
        height : 110,
        width : 110,
        marginRight : 15
    },
    detailBox : {
        flex : 1
    },
    productName : {
        fontSize : 25,
        fontWeight : 'bold',
        color : "#000000"
    }
});

export default ProductListScreen;
