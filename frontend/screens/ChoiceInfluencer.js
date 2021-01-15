import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Card, ListItem, Button, Icon} from 'react-native-elements'
import {connect} from 'react-redux';
import { Divider, Menu, Provider } from 'react-native-paper';

import {BasicButton} from '@phomea/react-native-buttons';
import {IP_HOST} from '../variable'

function ChoiceInfluencer({takeToken, navigation}) {

    const [returnCampaignDetailList, setReturnCampaignDetailList] = useState([])
    const [returnInfluenceur, setReturnInfluenceur] = useState([])
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
  
    useEffect(() => {
        async function fetchData() {
          const response = await fetch(`${IP_HOST}/get-influencer-request-list?brandToken=${takeToken}`)
          const jsonResponse = await response.json()
          console.log('jsonR', jsonResponse)
          setReturnCampaignDetailList(jsonResponse.returnCampaignDetail)
          setReturnInfluenceur(jsonResponse.influenceur)
        }
    
        fetchData()
      }, [takeToken])
    
      console.log("infos campagne", returnCampaignDetailList);

      const updateStatusAcc = async () => {
        var UpdateStatusAccepted = { ...returnCampaignDetailList }
        UpdateStatusAccepted.status = 'Accepted'
        console.log(UpdateStatusAccepted)
        setReturnCampaignDetailList(UpdateStatusAccepted)

        const data = await fetch('https://esport-back.herokuapp.com/update-request-acc', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `token=${takeToken}`
        })
    
      }


  const updateStatusRef = async () => {


    var UpdateStatusRefused = { ...returnCampaignDetailList }
    UpdateStatusRefused.status = 'Refused'
    console.log(UpdateStatusRefused)

    setReturnCampaignDetailList(UpdateStatusRefused)

    const data = await fetch('https://esport-back.herokuapp.com/update-request-ref', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `token=${takeToken}`
    })


  }
  if (returnCampaignDetailList.status == 'Waiting') {

    return (
        <Provider>
<Menu    
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Show menu</Button>}>
          <Menu.Item onPress={() => navigation.navigate('MyCampaigns')} title="My campaigns" />
          <Menu.Item onPress={() => navigation.navigate('CreateCampaign')} title="CreateCampaign" />
          <Menu.Item onPress={() => navigation.navigate('ProfileBrand')} title="Profile" />
        </Menu>
        <ScrollView>
        <View style={styles.regform}>

<Card containerStyle={{backgroundColor: '#721B81', height:'90%'} }> 
  <Card.Title style={styles.secondtitle}>{returnCampaignDetailList.campaignName}
</Card.Title>
  <Card.Divider/>
  <Card.Image source={{uri: returnInfluenceur.uploadedDOc}}></Card.Image>      
    <Text style={styles.textinput}>
    {returnInfluenceur.userName}
   </Text>
   <Text style={styles.textinput}>
    Name: {returnInfluenceur.firstName}
   </Text>
   <Text style={styles.textinput}>
   Bio: {returnInfluenceur.bio}
   </Text>
   <Text style={styles.textinput}>
   Status: {returnCampaignDetailList.status}
   </Text>

   <View style={styles.container}>
     <View style={styles.buttonContainer}>
    <BasicButton
      icon={<Icon name='code' color='#ffffff' />}
      onPress={() => updateStatusAcc()}

      title='Accept' />

        <BasicButton
      icon={<Icon name='code' color='#ffffff' />}
      onPress={() => updateStatusRef()}

      title='Refuse' />
       </View>
       </View>
</Card>
</View>

</ScrollView>

    </Provider>
    )
} else if (returnCampaignDetailList.status == 'Accepted') {

    return (
        <Provider>
<Menu    
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Show menu</Button>}>
          <Menu.Item onPress={() => navigation.navigate('MyCampaigns')} title="My campaigns" />
          <Menu.Item onPress={() => navigation.navigate('CreateCampaign')} title="CreateCampaign" />
          <Menu.Item onPress={() => navigation.navigate('ProfileBrand')} title="Profile" />
        </Menu>
        <ScrollView>
        <View style={styles.regform}>


<Card containerStyle={{backgroundColor: '#721B81', height:'90%'} }>
  <Card.Title style={styles.secondtitle}>{returnCampaignDetailList.campaignName}
</Card.Title>
  <Card.Divider/>
  <Card.Image source={{uri: returnInfluenceur.uploadedDOc}}></Card.Image>      
    <Text style={styles.textinput}>
    {returnInfluenceur.userName}
   </Text>
   <Text style={styles.textinput}>
    Name: {returnInfluenceur.firstName}
   </Text>
   <Text style={styles.textinput}>
   Bio: {returnInfluenceur.bio}
   </Text>
   <Text style={styles.textinput}>
   Status: {returnCampaignDetailList.status}
   </Text>
   <Text style={styles.textinput}>
   Followers: {returnInfluenceur.numberFollower}
   </Text>
    
       <Text style={styles.textinput}>
       {returnInfluenceur.description}        
   </Text>
</Card>
</View>
</ScrollView>

    </Provider>

    )
} else {
    return (
        <View style={styles.regform}>

        <Card containerStyle={{backgroundColor: '#721B81', height:'90%'} }>
  <Card.Title style={styles.secondtitle}>No request
</Card.Title>
  <Card.Divider/>
  <Card.Image source={{uri: returnInfluenceur.uploadedDOc}}></Card.Image>      

</Card>
</View>

    )
} }

const styles = StyleSheet.create({
    regform: {
      alignSelf: 'stretch',
      backgroundColor: '#9C27B0',
      height: '130%',
  
    },
    menuh : {
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
    secondtitle: {
      fontSize: 20,
      color: '#fff',
      paddingBottom: 10,
      marginBottom: 10,
      borderBottomColor: '#199187',
      borderBottomWidth: 1,
      textAlign: "center",
      marginTop: 20, 
      
    },
    textinput: {
      marginTop : 30,
      alignSelf: 'stretch',
      color: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    margin : 30  ,
    marginBottom : 60

  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    
    


  }
 
  });
  
    
function mapStateToProps(state) {
    return { takeToken : state.token }
  }
  

  export default connect(
    mapStateToProps,
    null
  )(ChoiceInfluencer)