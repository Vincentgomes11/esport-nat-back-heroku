import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import {Button , Card} from 'react-native-elements'
import {connect} from 'react-redux';
import { Divider, Menu, Provider } from 'react-native-paper';
import {IP_HOST} from '../variable'


function ProfileBrand({ takeToken, navigation }) {
    
    const [companyDetails, setCompanyDetails] = useState([])
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
  
    useEffect(() => {
        async function fetchData() {
          const response = await fetch(`${IP_HOST}/branddetails?brandToken=${takeToken}`)
          const jsonResponse = await response.json()
    
          setCompanyDetails(jsonResponse.brandProfil)
        }
        fetchData()
      }, []) 

    return (
<Provider>
            <Menu    
                      visible={visible}
                      onDismiss={closeMenu}
                      anchor={<Button  style={styles.menuh} onPress={openMenu} title="Menu">Menu</Button>}>
                      <Menu.Item onPress={() => navigation.navigate('ChoiceInfluencer')} title="Response Request" />
                      <Menu.Item onPress={() => navigation.navigate('CreateCampaign')} title="Create campaign" />
                      <Divider />
                      <Menu.Item onPress={() => navigation.navigate('MyCampaigns')} title="My Campaigns" />
                    </Menu>
                    <View style={styles.regform}>       
                             <ScrollView>
        <Card>
          <Card.Title>{companyDetails.company}
        </Card.Title>
            <Text style={{marginBottom: 10}}>
            {companyDetails.bio}
            </Text>
            <Text style={{marginBottom: 10}}>
            {companyDetails.firstName}</Text>
            <Text style={{marginBottom: 10}}>
            {companyDetails.lastName}</Text>
            <Text style={{marginBottom: 10}}>
            {companyDetails.phone}</Text>
            <Text style={{marginBottom: 10}}>
            {companyDetails.email}</Text>
        </Card>
        </ScrollView>
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
          button: {
              alignSelf: 'stretch',
              alignItems: 'center',
              padding: 20,
              backgroundColor: '#59cbbd',
              marginTop: 30,
          },
          btntext: {
              color: '#fff',
              fontWeight: 'bold'
          }
      });

        function mapStateToProps(state) {
            return { takeToken: state.token }
          }
          
          export default connect(
            mapStateToProps,
            null
          )(ProfileBrand)