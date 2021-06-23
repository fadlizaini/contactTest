import {LOGICAL_OPERATORS} from '@babel/types';
import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Alert, Text, Image} from 'react-native';
import {Avatar, Input, Icon} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import {deleteContact, editContact} from '../services/serviceContact';

const DetailContact = ({navigation, route}) => {
  const {l} = route.params;
  const [first, setFirst] = useState(l.firstName);
  const [last, setLast] = useState(l.lastName);
  const [age, setAge] = useState(`${l.age}`);
  const [photo, setPhoto] = useState(l.photo);
  const [isEdit, setIsEdit] = useState(false);

  // useEffect(()=>{},[])

  const handleSave = () => {
    console.log('savePressed');
    editContact(first, last, age, photo, l.id)
      .then(response => {
        console.log(response);
        navigation.goBack();
      })
      .catch(e => {
        console.log(JSON.stringify(e.response, null, 2));
        Alert.alert('Error', e.response.data.message);

      });
  };
  const handleDelete = () => {
    console.log('delete pressed');
    deleteContact(l.id)
      .then(response => {
        console.log(response);
        navigation.goBack();
      })
      .catch(e => {
        console.log(JSON.stringify(e.response, null, 2));
        Alert.alert('Error', e.response.data.message);

      });
  };
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center'}}>
          <Avatar
            rounded
            size={125}
            containerStyle={{
              backgroundColor: '#C678D4',
              marginVertical: 30,
            }}
            source={{
              uri: photo,
            }}></Avatar>

          <Input
            label="First name"
            placeholder="Input first name..."
            onChangeText={text => setFirst(text)}
            disabled={!isEdit}
            value={first}
            containerStyle={style.input}
          />
          <Input
            label="Last name"
            placeholder="Input last name..."
            onChangeText={text => setLast(text)}
            value={last}
            disabled={!isEdit}
            containerStyle={style.input}
          />
          <Input
            label="Age"
            placeholder="Input age"
            containerStyle={style.input}
            onChangeText={text => setAge(text)}
            value={age}
            maxLength={3}
            disabled={!isEdit}
            keyboardType="decimal-pad"
          />
          <Input
            label="Photo Url"
            placeholder="input url..."
            containerStyle={style.input}
            disabled={!isEdit}
            onChangeText={text => setPhoto(text)}
            value={photo}
          />
        </View>
      </ScrollView>
      <TouchableScale
        style={style.saveButton}
        onPress={() => (isEdit ? handleSave() : setIsEdit(true))}>
        {isEdit ? (
          <Icon name="save-alt" color="white" />
        ) : (
          <Icon name="drive-file-rename-outline" color="white" />
        )}
      </TouchableScale>
      <TouchableScale
        style={style.deleteButton}
        onPress={() => handleDelete()}>
        <Icon name="delete" color="white" />
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
  deleteButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 30,
    right: 120,
    height: 70,
    backgroundColor: 'tomato',
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

export default DetailContact;
