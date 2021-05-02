/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import SQLite from 'react-native-sqlite-storage';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { TextInput } from 'react-native-paper';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

let db;

db = SQLite.openDatabase(
    {
    name: 'MathSaya-database.db',
    createFromLocation : "~MathSaya-database.db",
    }
);

const LoginScreen = ({ navigation }) => {
    let [username, setUserName] = useState('');
    let [password, setPassword] = useState('');
    let [userData, setUserData] = useState('');

    let login_user = () => {
        console.log(username, password);
    
        if (!username) {
          alert('butngi username');
          return;
        }
        if (!password) {
          alert('butangi password');
          return;
        }

        db.transaction(tx => {
            tx.executeSql(`SELECT * FROM table_users WHERE user_name=?`, 
            [username],
            (tx, results) => {
                var len = results.rows.length;
                console.log('length:', len);
                if (len > 0) { 
                    setUserData(results.rows.item(0));

                    if (password === userData.user_password){
                        Alert.alert(
                            'Success',
                            'You Login Successfully',
                            [
                                {
                                text: 'Ok',
                                onPress: () => navigation.navigate('TestView'),
                                },
                            ],
                            { cancelable: false }
                        );
                    }
                    else{
                        alert('wala nag tugma ang imo username ug password');
                    }

                }
                else {
                    alert('This account does not exist!');
                }
                }
            );
        });
    };



    return (
        <SafeAreaView style={{ flex:1, backgroundColor: '#fefac0' }} >
            <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center'}} >

                <View style={{ flex: 1, justifyContent: 'center' }} >

                    <View style={{alignItems: 'center'}}>
                        <Image
                            source={require('../assets/logo.png')}
                            style={styles.logo}
                        />
                    </View>

                    <ScrollView 
                        style={{ marginHorizontal: 40 }} 
                        showsVerticalScrollIndicator={false} 
                    >

                        <Text style={styles.text}>Sign In</Text>

                        <FormInput
                            labelValue={username}
                            onChangeText={(userName) => setUserName(userName)}
                            placeholderText="Username"
                            iconType="user"
                            autoCapitalize="none"
                            autoCorrect={false}
                        />

                        <FormInput
                            labelValue={password}
                            onChangeText={(userPassword) => setPassword(userPassword)}
                            placeholderText="Password"
                            iconType="lock"
                            secureTextEntry={true}
                        />

                        <FormButton
                            buttonTitle="Sign In"
                            onPress={login_user}
                            //onPress={() => alert('Sign In Clicked!')}
                        />
                    </ScrollView>
            
                    <View style={{ alignItems: 'center'}}>
                        <TouchableOpacity 
                            style={styles.forgotButton} 
                            //onPress={() => navigation.navigate('Remember')}
                        > 
                            <Text style={styles.navButtonText}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.forgotButton}
                            onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.navButtonText}>
                                Don't have an account? Create here
                            </Text>
                        </TouchableOpacity>
                    </View>
 
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        padding: 40,
        paddingTop: 40,
        backgroundColor: '#fefac0',
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'cover',
        marginTop: 15,
    },
    text: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Quicksand-Bold',
        fontSize: 40,
        marginBottom: 5,
        color: '#402A03',        
    },
    navButton: {
       marginTop: 15,
    },
    forgotButton: {
        //marginVertical: 5,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2e64e5',
        fontFamily: 'Roboto-Medium',
        marginBottom: 8
    },
});