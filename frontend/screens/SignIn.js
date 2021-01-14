import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Button} from 'react-native';
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';
import {BasicButton} from '@phomea/react-native-buttons';
import {IP_HOST} from '../variable'

function SignIn(props) {

    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [userExists, setUserExists] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const [roleState, setRoleState]= useState('')
    const [listErrorsSignIn, setErrorsSignIn] = useState([])

console.log("IP HOST", IP_HOST)
    var handleSubmitSignIn = async () => {
 
        const data = await fetch(`${IP_HOST}/sign-in`, {
          method: 'POST',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
        })
    
        const body = await data.json()
        console.log("Body",body)
      
       
    
        if(body.result == true){
            console.log("BODY TOKEN", body.token)
          props.onSubmitToken(body.token)
          setUserExists(true)
          setRoleState(body.user.role)
        }  else {
          setErrorsSignIn(body.error)
        }
      }
    
      if(roleState == 'brand'){
          console.log("BRAND")
        return  props.navigation.navigate('MyCampaigns')
      } else if (roleState == 'influenceur'){
        console.log("INFLUENCER")
        return props.navigation.navigate('CampaignList')
      }
    
      var tabErrorsSignin = listErrorsSignIn.map((error,i) => {
        return(<p>{error}</p>)
      }) 
    
    return (

        <View style={styles.regform}>

            <Text style={styles.header}>Sign-in with your account</Text>

            <KeyboardAvoidingView behavior="padding" enabled keyboardVerticalOffset={150}>

            <TextInput onChangeText={(val) => setSignInEmail(val)} style={styles.textinput} placeholder="Email" placeholderTextColor="#fff"/>

            <TextInput onChangeText={(val) => setSignInPassword(val)} style={styles.textinput} secureTextEntry={true} placeholder="Password" placeholderTextColor="#fff"/>
           
            <TouchableOpacity style={styles.button}>
                <BasicButton onPress={() => {handleSubmitSignIn()}}   title="Sign In"/>
            </TouchableOpacity>
            
            {/* {redirect ? navigation.navigate('SignIn') : null } */}
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
)(withNavigation(SignIn))

