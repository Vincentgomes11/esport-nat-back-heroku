import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Card, ListItem, Button, Icon, Image} from 'react-native-elements'
import {connect} from 'react-redux';
import { withNavigation } from 'react-navigation';
import {BasicButton} from '@phomea/react-native-buttons';
import {IP_HOST} from '../variable'

function CampaignListComponent(props) {

    return (

<Card containerStyle={{backgroundColor: '#721B81'}} >
  <Card.Title style={styles.secondtitle}
>{props.campaignName}
</Card.Title>
<Card.Image source={{uri: props.campaignUpload}}></Card.Image>      

  <Text style={styles.textinput}>
    {props.campaignDesc}
    </Text>
    <BasicButton
      icon={<Icon name='code' color='#ffffff' />}

      onPress={() => props.navigation.navigate('CampaignDetail', {
        IdFromParams: props.campaignId,
      })}
      title='Select Campaign' />
</Card>

    )
}

const styles = StyleSheet.create({
  secondtitle: {
    fontSize: 20,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 2,
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
function mapDispatchToProps(dispatch){
    return {
        onSubmitCampaign: function(campaignSelected){
        dispatch({type: 'saveCampaign', campaignSelected: campaignSelected})
      }
    }
  }
  export default connect(
    null,
    mapDispatchToProps
  )(withNavigation (CampaignListComponent));

