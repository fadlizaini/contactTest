import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SearchBar, Icon, ListItem, Avatar} from 'react-native-elements';
import {getContact} from '../services/serviceContact';
import TouchableScale from 'react-native-touchable-scale';

const Home = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [contact, setContact] = useState([]);
  const [data, setData]=useState([]);

  useEffect(() => {
    getContact()
      .then(response => {
        console.log(JSON.stringify(response.data, null, 2));
        setContact(response.data.data);
        setData(response.data.data)
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  const searchFilterFunction = text => {
    const newData = contact.filter(item => {
      const itemData = `${item.firstName.toUpperCase()} ${item.lastName.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setData(newData)
  };
  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search contact..."
        onChangeText={search => {
          setSearch(search) ; searchFilterFunction(search);
        }}
        value={search}
        lightTheme={true}
        containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
      />
      {data.map((l, i) => (
        <ListItem
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          key={i}
          bottomDivider>
          <Avatar rounded source={{uri: l.photo}} />
          <ListItem.Content>
            <ListItem.Title>
              {l.firstName} {l.lastName}
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ))}
      <TouchableScale style={styles.addButton} onPress={()=>navigation.navigate('addContact')}>
        <Icon name="add" color="white" />
      </TouchableScale>

      {/* <FlatList
        onEndReached={() => {
          addList(page + 1) ;setPage(page + 1);
        }}
        onEndReachedThreshold={0.5}
        data={DATA}
        renderItem={({item, index}) => (
          <Movie
            data={item}
            index={index}
            imagePress={handlePressImage}
            navigation={props.navigation}
          />
        )}
        keyExtractor={item => item.imdbID}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <TouchableOpacity
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
          onPress={() => setModalVisible(false)}>
          <Image
            style={{width: '80%', height: '80%'}}
            source={{
              uri: modalImage,
            }}
          />
        </TouchableOpacity>
      </Modal> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  bigText: {
    marginBottom: '10%',

    paddingTop: '15%',
    color: '#333333',
    fontSize: 50,
    alignSelf: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  addButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 30,
    right: 30,
    height: 70,
    backgroundColor: '#C678D4',
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
export default Home;
