import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Button} from 'react-native-elements'
import {connect} from 'react-redux';
import {BasicButton} from '@phomea/react-native-buttons';
import {IP_HOST} from '../variable'


 function RegisterBrand({onSubmitToken, navigation}) {

    const [signUpFirstName, setSignUpFirstName] = useState('')
    const [signUpLastName, setSignUpLastName] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpCompany, setSignUpCompagny] = useState('')
    const [signUpPhone, setSignUpPhone] = useState('')

    const [redirect, setRedirect] = useState(false)
    const [userExists, setUserExists] = useState(false)
    const [listErrorsSignup, setErrorsSignup] = useState([])

    const [isConnect, setIsConnect] = useState(false)
    const [isNotConnect, setIsNotConnect] = useState('')
    const [token, setToken] = useState('')
    const [tokenIsSubmited, setTokenIsSubmited] = useState(false)

    useEffect(() => {
        AsyncStorage.getItem('userToken', (err, value) => {
          if (value) {
            setToken(value);
            onSubmitToken(value);
            setTokenIsSubmited(true);
          }
        })
      }, []);

    var handleSubmitSignupBrand = async () => {

        console.log("début handle submit")

        const data = await fetch(`${IP_HOST}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `firstNameFromFront=${signUpFirstName}&lastNameFromFront=${signUpLastName}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}&phoneFromFront=${signUpPhone}&companyFromFront=${signUpCompany}`
        })

        const body = await data.json()
        console.log("sign up brand", body)

        if (body.result == true) {
            onSubmitToken(body.saveUser.token)
            AsyncStorage.setItem('userToken', body.saveUser.token);
            setUserExists(true)
            setRedirect(true)
          } else {
            setErrorsSignup(body.error)
          }
        }
        var tabErrorsSignup = listErrorsSignup.map((error,i) => {
          return(<p>{error}</p>)
        })
    
    
    return (

        <View style={styles.regform}>

            <Text style={styles.header}>Sign-up as a Company</Text>
      <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={150}>

            <ScrollView>

            <TextInput onChangeText={(val) => setSignUpCompagny(val)} style={styles.textinput} placeholder="Company" placeholderTextColor="#fff"/>

            <TextInput onChangeText={(val) => setSignUpFirstName(val)} style={styles.textinput} placeholder="First Name" placeholderTextColor="#fff"/>
            <TextInput onChangeText={(val) => setSignUpLastName(val)} style={styles.textinput} placeholder="Last Name" placeholderTextColor="#fff" />
            <TextInput onChangeText={(val) => setSignUpEmail(val)} style={styles.textinput} placeholder="Email" placeholderTextColor="#fff" />
            <TextInput onChangeText={(val) => setSignUpPassword(val)} style={styles.textinput} secureTextEntry={true} placeholder="Password" placeholderTextColor="#fff" />
            <TextInput onChangeText={(val) => setSignUpPhone(val)} style={styles.textinput} placeholder="Phone" placeholderTextColor="#fff" />

      
                <BasicButton onPress={() => {handleSubmitSignupBrand()}} title="Sign up"/>

            {redirect ? navigation.navigate('CreateCampaign') : null}
            </ScrollView>
            </KeyboardAvoidingView>

        </View>

    )
}

const styles = StyleSheet.create({
  regform: {
      alignSelf: 'stretch',
      backgroundColor: '#9C27B0',
      height: '95%', 

  },
  header: {
      fontSize: 24,
      color: '#fff',
      paddingBottom: 10,
      marginBottom: 40,
      borderBottomColor: '#199187',
      borderBottomWidth: 1,
       marginTop: 50, 
       width: '95%', 
       marginLeft: 10,
       textAlign: "center"

  },
  textinput: {
      alignSelf: 'stretch',
      height: 40,
      marginBottom: 30,
      color: '#fff',
      borderBottomColor: '#f8f8f8',
      borderBottomWidth: 1,
      marginLeft:10

  },
  
});

function mapDispatchToProps(dispatch){
    return {
        onSubmitToken: function(token){
        dispatch({type: 'addToken', token: token})
      }
    }
  }
  export default connect(
    null,
    mapDispatchToProps
  )(RegisterBrand)