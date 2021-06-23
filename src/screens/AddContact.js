import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Alert, Text} from 'react-native';
import {Avatar, Input, Icon} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import {saveContact} from '../services/serviceContact';
import * as ImagePicker from 'react-native-image-picker';

const AddContact = ({navigation}) => {
  const [first, setFirst] = useState('');
  const [last, setLast] = useState('');
  const [age, setAge] = useState('');

  const [image, setImage] = useState({fileName: '', type: '', uri: ''});

  const chooseImage = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        // alert(JSON.stringify(response));s
        console.log('response', JSON.stringify(response));
        setImage({
         fileName: response.assets[0].fileName,
           type: response.assets[0].type,
          uri: response.assets[0].uri,
        });
      }
    });
  };

  const launchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = {uri: response.uri};
        console.log('response', JSON.stringify(response));
        setImage({
          fileName: response.assets[0].fileName,
          type: response.assets[0].type,
         uri: response.assets[0].uri,
        });
      }
    });
  };

  const handlePress = async() => {
    const data = await new FormData();
    await data.append('photo', {
      name: image.fileName,
      type: image.type,
      uri:image.uri})
      console.log(data);
    saveContact(first, last, age, data)
      .then(response => {
        console.log(response.data);
        navigation.goBack();
      })
      .catch(e => {
        Alert.alert('Error');
        console.log(e.response);
      });
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          {image.fileUri === '' ? (
            <Avatar
              onPress={() =>
                Alert.alert('Pick', 'Wich image picker method', [
                  {
                    text: 'Camera',
                    onPress: () => launchCamera(),
                  },
                  {
                    text: 'Choose File',
                    onPress: () => chooseImage(),
                  },
                  {
                    text: 'Cancel',
                    onPress: () => console.log('OK Pressed'),
                    style: 'cancel',
                  },
                ])
              }
              rounded
              size={125}
              containerStyle={{
                backgroundColor: '#C678D4',
                marginVertical: 30,
              }}
              icon={{name: 'camera-alt'}}
            />
          ) : (
            <Avatar
              onPress={() =>
                Alert.alert('Pick', 'Wich image picker method', [
                  {
                    text: 'Camera',
                    onPress: () => launchCamera(),
                  },
                  {
                    text: 'Choose File',
                    onPress: () => chooseImage(),
                  },
                  {
                    text: 'Cancel',
                    onPress: () => console.log('OK Pressed'),
                    style: 'cancel',
                  },
                ])
              }
              rounded
              size={125}
              containerStyle={{
                backgroundColor: '#C678D4',
                marginVertical: 30,
              }}
              source={{
                uri: image.uri,
              }}>
              <Avatar.Accessory icon={{name: 'camera-alt'}} size={30} />
            </Avatar>
          )}

          <Input
            label="First name"
            placeholder="Input first name..."
            onChangeText={text => setFirst(text)}
            value={first}
            containerStyle={style.input}
          />
          <Input
            label="Last name"
            placeholder="Input last name..."
            onChangeText={text => setLast(text)}
            value={last}
            containerStyle={style.input}
          />
          <Input
            label="Age"
            placeholder="Input age"
            containerStyle={style.input}
            onChangeText={text => setAge(text)}
            value={age}
            keyboardType="decimal-pad"
          />
        </View>
      </ScrollView>
      <TouchableScale
        style={style.saveButton}
        onPress={() => handlePress}>
        <Icon name="save-alt" color="white" />
      </TouchableScale>
    </>
  );
};
const style = StyleSheet.create({
  input: {
    width: '90%',
  },
  saveButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 30,
    right: 30,
    height: 70,
    backgroundColor: '#8B2F8A',
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default AddContact;
