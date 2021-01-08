import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import {Button, Card} from 'react-native-elements'
import {connect} from 'react-redux';
import { Divider, Menu, Provider } from 'react-native-paper';
import {IP_HOST} from '../variable'


function ProfileInfluencer({ takeToken, navigation }) {
    
    const [influencerDetails, setInfluencerDetails] = useState([])
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
  
    useEffect(() => {
      async function fetchData() {
        const response = await fetch(`${IP_HOST}/influencerdetails?influencerToken=${takeToken}`)
        const jsonResponse = await response.json()
  
        setInfluencerDetails(jsonResponse.influencerProfil)
      }
      fetchData()
    }, [])
    return (
        <Provider>
        <Menu    
             visible={visible}
             onDismiss={closeMenu}
             anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Menu</Button>}>
             <Menu.Item onPress={() => navigation.navigate('MyRequests')} title="My Requests" />
             <Menu.Item onPress={() => navigation.navigate('CampaignList')} title="Search Campaign" />
             <Divider />
             <Menu.Item onPress={() => navigation.navigate('HomeScreen')} title="Home" />
           </Menu>
        <View style={styles.regform}>

        <Text style={styles.header}>Profile</Text>
        <KeyboardAvoidingView>

        <ScrollView>

        <Card>
          <Card.Title>{influencerDetails.firstName}
        </Card.Title>
            <Text style={{marginBottom: 10}}>
            {influencerDetails.lastName}
            </Text>
            <Text style={{marginBottom: 10}}>
            {influencerDetails.phone}
            </Text>
            <Text style={{marginBottom: 10}}>
            {influencerDetails.email}</Text>
            <Text style={{marginBottom: 10}}>
            {influencerDetails.favoriteGame}</Text>
        </Card>
        </ScrollView>
            </KeyboardAvoidingView>
        </View>
        </Provider>

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
                textAlign: "center",
                marginTop: 50, 
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
        function mapStateToProps(state) {
            return { takeToken: state.token }
          }
          
          export default connect(
            mapStateToProps,
            null
          )(ProfileInfluencer)