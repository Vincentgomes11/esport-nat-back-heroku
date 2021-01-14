import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements'
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';
import {IP_HOST} from '../variable'

function MyCampaignsListComponent(props) {

    return (

<Card containerStyle={{backgroundColor: '#721B81'} }>
  <Card.Title style={styles.secondtitle}>{props.campaignName}
</Card.Title>
    <Text style={styles.textinput}>
    Status: {props.campaignStatus}
    </Text>
    <Text style={styles.textinput}>
    {props.campaignDesc}
    </Text>
   
</Card>

    )
}
const styles = StyleSheet.create({
    regform: {
      alignSelf: 'stretch',
      backgroundColor: '#9C27B0',
      height: '95%',

    },
   
    secondtitle: {
      fontSize: 20,
      color: '#fff',
      paddingBottom: 30,
      marginBottom: 10,
      borderBottomColor: '#199187',
      borderBottomWidth: 1,
      textAlign: "center",
      marginTop: 10, 
      
    },
    textinput: {
      margin : 10,
      alignSelf: 'stretch',
      color: '#fff',
  },
  
});
export default MyCampaignsListComponent