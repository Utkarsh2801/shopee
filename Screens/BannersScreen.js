import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    View,
    Dimensions,
    ImageBackground,
    TouchableOpacity
} from 'react-native';
import categories from '../Models/BannerModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';

const BannersScreen = ({ navigation }) => {


    useEffect(() => {
        navigation.setOptions({
            headerRight:(props) => <TouchableOpacity onPress={() => navigation.navigate('Cart')}><Entypo name="shopping-cart" size={25} color="#ffffff"/></TouchableOpacity>
        })
    })


    const renderBanner = ({ item }) => (
        <TouchableOpacity onPress={() => {
            navigation.navigate('Products', { id : item.id, category : item.category})
        }}>
            <View style={styles.banner}>
                <ImageBackground source={item.image} style={styles.image}>
                </ImageBackground>
                <View style={styles.overlay}></View>
                <View style={styles.textOverlay}>
                    <Text style={styles.categoryText}>{item.category}</Text>
                    <Text style={{fontWeight : "bold", color : "#ffffff"}}>{item.description}</Text>    
                </View>
                
            </View>
        </TouchableOpacity>
    );


    return (
        <SafeAreaView style={styles.categoriesListBox}>
            <FlatList
                contentContainerStyle={{ paddingBottom: 90 }}
                data={categories}
                renderItem={renderBanner}
                keyExtractor={item => item.id}
            >
            </FlatList>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    categoriesListBox: {
        height: Dimensions.get('window').height,
    },
    banner: {
        marginTop: 5
    },
    image: {
        height: Dimensions.get('window').height / 3,
    },
    categoryText: {
        fontSize: 30,
        color: "#ffffff"
    },
    overlay: {
        position: 'absolute',
        backgroundColor: "#000000",
        opacity: 0.5,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    textOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingLeft: 30,
    }
});

export default BannersScreen;
