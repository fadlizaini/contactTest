import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {SearchBar, Icon, ListItem, Avatar} from 'react-native-elements';
import {getContact} from '../services/serviceContact';
import TouchableScale from 'react-native-touchable-scale';
import {useIsFocused} from '@react-navigation/native';
import {connect, useStore, useSelector, useDispatch} from 'react-redux';
import {action, actionsContact, setContact} from '../redux/actions';
import {bindActionCreators} from 'redux';

const Home = props => {
  const store = useStore();
  const {navigation} = props;
  const [search, setSearch] = useState('');
  // const [contact, setContact] = useState([]);
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(true);
  const kontak = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefreshing(true);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount

    if (refreshing) {
      getContact()
        .then(response => {
          console.log(JSON.stringify(response.data, null, 2));
          // setContact(response.data.data);
      
          dispatch(actionsContact(response.data.data));
          
          setRefreshing(false);
        })
        .catch(e => {
          console.log(e);
          setRefreshing(false);
          Alert.alert('Error', e.response.data.message);
        });
    }
    return unsubscribe;
  }, [refreshing]);

  useEffect(()=>{setData(kontak.kontak)},[kontak])
  const searchFilterFunction = text => {
    const newData = kontak.kontak.filter(item => {
      const itemData = `${item.firstName.toUpperCase()} ${item.lastName.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });

    setData(newData);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search contact..."
        onChangeText={search => {
          setSearch(search);
          searchFilterFunction(search);
        }}
        value={search}
        lightTheme={true}
        containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }>
        {data.map((l, i) => (
          <ListItem
            Component={TouchableScale}
            friction={90}
            tension={100}
            activeScale={0.95}
            key={i}
            onPress={() => navigation.navigate('detailContact', {l})}
            bottomDivider>
            <Avatar rounded source={{uri: l.photo}} />
            <ListItem.Content>
              <ListItem.Title>
                {l.firstName} {l.lastName}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
        {/* {kontak.kontak.map((n, i) => (
          <Text>{n.firstName}</Text>
        ))} */}
      </ScrollView>

      <TouchableScale
        style={styles.addButton}
        onPress={() => navigation.navigate('addContact')}>
        <Icon name="add" color="white" />
      </TouchableScale>
    </View>
  );
};
// const mapStateToProps = state => ({
//   contact:state.contact
// });

// const ActionCreators = Object.assign(
//   {},
//   actionsContact,
// );
// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(ActionCreators, dispatch),
// });

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
// export default connect(mapStateToProps, mapDispatchToProps)(Home)
export default Home;
