import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Dimensions,
    Keyboard,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Input, Button, FormControl } from "native-base";
import Ripple from 'react-native-material-ripple';
import SplashScreen from 'react-native-splash-screen'

const LoginScreen = ({ navigation }) => {
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 4000)
    }, [])

    const validate = () => {
        let ferror = false;
        let err = {};
        if (!email) {
            err['email'] = true;
            ferror = true;
        }
        if (!password) {
            err['password'] = true;
            ferror = true;
        }
        if (password.length < 6) {
            err['password'] = true;
            ferror = true;
        }

        let valid = String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

        if (!valid) {
            err['email'] = true;
            ferror = true;
        }

        console.log(err);
        setErrors(err);
        return ferror;
    }

    const login = () => {
        console.log("hello")
        let success = validate();
        if (success)
            return false;

        Keyboard.dismiss();
        navigation.navigate('Categories')
    }

    return (
            <ScrollView keyboardShouldPersistTaps='handled' style={styles.loginView}>
                <View style={styles.loginHeader}>
                    <Entypo name='shopping-bag' size={100} color="#ffffff" />
                    <Text style={styles.loginHeaderText}>Lets Start Shopping!</Text>
                </View>
                <View style={styles.loginFormSection}>
                    <View style={{ padding: 40 }}>
                        <Text style={{ fontSize: 35, color: "#FF6666" }}>Welcome</Text>
                    </View>

                    <View style={styles.loginForm}>
                        <FormControl style={styles.form} isInvalid={'email' in errors}>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input onChangeText={(v) => setEmail(v)} variant="underlined" fontSize={17} placeholder='example@example.com' _focus={{ borderBottomColor: "#FF6666" }} type="email" />
                            {'email' in errors ? <FormControl.ErrorMessage>Invalid Email</FormControl.ErrorMessage> : null}
                        </FormControl>
                        <FormControl style={[{ marginTop: 20 }, styles.form]} isInvalid={'password' in errors}>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input onChangeText={(v) => setPassword(v)} variant="underlined" placeholder='*********' _focus={{ borderBottomColor: "#FF6666" }} type="password" />
                            {'password' in errors ? <FormControl.ErrorMessage>Invalid Password</FormControl.ErrorMessage> : null}
                        </FormControl>

                        <Ripple onPress={login} rippleColor="#ffffff" style={{ marginTop: 40 }}>
                            <Button style={styles.loginButton}>Login</Button>
                        </Ripple>
                    </View>
                </View>
            </ScrollView>
    );
};


const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    loginHeader: {
        height: Dimensions.get('window').height / 2.5,
        backgroundColor: "#FF6666",
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    loginHeaderText: {
        fontSize: 20,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    loginFormSection: {
        flex: 1.5,
        backgroundColor: '#ffffff',
        bottom: 70,
        borderTopRightRadius: 70,
        borderTopLeftRadius: 70
    },
    form: {
        width: Dimensions.get('window').width / 1.2
    },
    loginForm: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginButton: {
        width: Dimensions.get('window').width / 1.2,
        backgroundColor: '#FF6666'
    }
});

export default LoginScreen;
