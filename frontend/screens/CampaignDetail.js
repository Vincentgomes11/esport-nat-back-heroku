import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements'
import {connect} from 'react-redux';
import { Divider, Menu, Provider } from 'react-native-paper';
import {BasicButton} from '@phomea/react-native-buttons';
import {IP_HOST} from '../variable'


function CampaignDetail({takeToken, navigation}) {

    const [campaignDetails, setCampaignDetails] = useState([])
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
  
    const IdFromParams = navigation.getParam('IdFromParams', 'NO-ID');

    console.log("campagneID", IdFromParams)
    console.log("<token", takeToken)


    useEffect(() => {
        async function getCampaign() {
        const response = await fetch(`${IP_HOST}/get-campaign-details/`+IdFromParams)
        const jsonResponse = await response.json()
        console.log('jsonR',jsonResponse)
        setCampaignDetails(jsonResponse.returnCampaign)
    }
    getCampaign()
      }, [IdFromParams]) 
    
    
    const applyCampaign = async () => {

        const data = await fetch(`${IP_HOST}/campaign-apply`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `id=${IdFromParams}&token=${takeToken}`
        })

        console.log(data.body + "HELLO add campaign")

    }
    return (
        <Provider>
        <Menu    
             visible={visible}
             onDismiss={closeMenu}
             anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Menu</Button>}>
             <Menu.Item onPress={() => navigation.navigate('MyRequests')} title="My Requests" />
             <Menu.Item onPress={() => navigation.navigate('ProfileInfluencer')} title="Profile" />
             <Divider />
             <Menu.Item onPress={() => navigation.navigate('HomeScreen')} title="Home" />
           </Menu>
        <View style={styles.regform}>
<Card containerStyle={{backgroundColor: '#721B81', height:'90%'} }>
  <Card.Title style={styles.secondtitle}>{campaignDetails.campaignName}
</Card.Title>
  <Card.Divider/>
  <Card.Image source={campaignDetails.campaignImg}></Card.Image>
    <Text style={styles.textinput}>
    {campaignDetails.description}
   </Text>
    <BasicButton
      icon={<Icon name='code' color='#ffffff'/>}
      onPress={() => applyCampaign()}
      title='Apply' />
</Card>
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
   
    secondtitle: {
      fontSize: 20,
      color: '#fff',
      paddingBottom: 30,
      marginBottom: 10,
      borderBottomColor: '#199187',
      borderBottomWidth: 1,
      textAlign: "center",
      marginTop: 30, 
      
    },
    textinput: {
      margin : 30,
      alignSelf: 'stretch',
      color: '#fff',
  },
  
});

function mapStateToProps(state) {
    return { takeToken : state.token }
  }
  

  export default connect(
    mapStateToProps,
    null
  )(CampaignDetail)