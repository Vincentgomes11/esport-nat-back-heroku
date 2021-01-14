import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView,  } from 'react-native';
import { Button, Card} from 'react-native-elements'
import { connect } from 'react-redux';
import { Divider, Menu, Provider } from 'react-native-paper';
import {IP_HOST} from '../variable'

import MyRequestList from '../screens/MyRequestList'

function MyRequests({ takeToken, navigation }) {

    const [returnCampaignDetailList, setReturnCampaignDetailList] = useState([])
    const [returnBrand, setReturnBrand] = useState([])
 
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
  

    useEffect(() => {
        async function fetchData() {
        const response = await fetch(`${IP_HOST}/get-request-list-influencer?influencerToken=${takeToken}`)
        const jsonResponse = await response.json()
        console.log('jsonR',jsonResponse)
        setReturnCampaignDetailList(jsonResponse.returnCampaignDetail)
        setReturnBrand(jsonResponse.brand)


    }
    fetchData()
      }, [takeToken])



    var returnRequestList = returnCampaignDetailList.map((mycampaign, i) => {
    
        return (<MyRequestList key={i} campaignName={mycampaign.campaignName} campaignStatus={mycampaign.status} campaignDesc={mycampaign.description} campaignUpload={mycampaign.uploadedDoc}/>)
    })


    if (returnCampaignDetailList.status == 'Waiting' || 'Accepted'|| 'Refused') {

        return (
        <Provider>
     
            <Menu    
                 visible={visible}
                 onDismiss={closeMenu}
                 anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Show menu</Button>}>
                 <Menu.Item onPress={() => navigation.navigate('CampaignList')} title="Search campaign" />
                 <Menu.Item onPress={() => navigation.navigate('ProfileInfluencer')} title="Profile" />
                 <Divider />
                 <Menu.Item onPress={() => navigation.navigate('HomeScreen')} title="Home" />
               </Menu>
            <View style={styles.regform}>
            <ScrollView>

                      <Text style={styles.header}>My last requests</Text>

                <ScrollView>
                    {returnRequestList}
                </ScrollView>
                </ScrollView>

            </View>
            </Provider>

        )
    } else {
        return (

            <View style={styles.regform}>

            <Card containerStyle={{backgroundColor: '#721B81', height:'40'} }>
            <Card.Title style={styles.secondtitle}>Campaigns Section
          </Card.Title>
              <Text style={{marginBottom: 10}}> No Request</Text>
              
          </Card>
          <Button title="Profile"/>
          </View>

        )
    }




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
   
    secondtitle: {
      fontSize: 20,
      color: '#fff',
      paddingBottom: 10,
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
function mapStateToProps(state) {
    return { takeToken: state.token }
}


export default connect(
    mapStateToProps,
    null
)(MyRequests)