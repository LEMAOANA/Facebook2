import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image,FlatList,TextInput,SafeAreaView,TouchableOpacity } from 'react-native';
import { AntDesign,Entypo,MaterialIcons, EvilIcons,MaterialCommunityIcons,Fontisto  } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
   
        <View style={styles.settings}>
         <Entypo name="chevron-small-left" size={40} color="white" />
         <MaterialIcons name="search" size={40} color="white"/>
        <AntDesign name="bars" size={40} color="white" />
        </View>
       
        <View style={styles.post}>
          <View style={styles.profile}>
           <Image style={styles.image}
           source={require('./assets/lenongpic.jpg')} />

           <Text> LEMAOANA LEJONE<br/> March 26 at 3:32 AM</Text>
           <AntDesign name="ellipsis1" size={40} color="white" />
          </View>
          <Text style={styles.postText}>
          Am in love with the humble soul inside me..Am grateful for who i am and what I do to make people happy though hard times.. Only God who knows what he has for me..The best yet to come❤️😍<br/>
           <Text style={styles.link}>#LENONGLALIHLABADesign</Text>
          </Text>
          <Image style={styles.postpic}
          source={require('./assets/postpicture.png')} />
          <View style={styles.countContainer}>
            <Text>{count} likes                                               0 comments</Text>
          </View>
          <View style={styles.likecommentshare}>
            <TouchableOpacity
               style={styles.licosh}
               onPress={onPress}>
                 <EvilIcons name="like" size={30} color="blue">
                 </EvilIcons>
                 <Text style={styles.likestyle}>like</Text>
             </TouchableOpacity>
             <MaterialCommunityIcons name="comment" size={20} color="black">
             <TextInput
          style={styles.textInputStyle}
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
          underlineColorAndroid="transparent"
          placeholder="write a comment"
          />
             </MaterialCommunityIcons>
             <MaterialCommunityIcons name="share-outline" size={24} color="black">
               <Text style={styles.licosh}>Share
               </Text>
             </MaterialCommunityIcons>
          </View>
          
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 10,
  },
  textInputStyle: {
    height: 15,
    width:100,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: '#009688',
    backgroundColor: '#FFFFFF',
  },
  post:{
    height: 700,
    backgroundColor:'#f5f5f5',
    justifyContent:'flex-start',
    margin: 12,
  },
  settings:{
    height:70,
    backgroundColor:'blue',
    margin: 12,
    alignItems:'center',
   justifyContent: 'space-between',
   flexDirection: 'row',
  },
  postText:{
    color:'black',
    fontSize:15,
    fontWeight:'regullar',
    margin:10,
  },
  link:{
    color:'blue',
    fontSize: 15,
    fontWeight:'bold',
  },
  image:{
    width: 50,
    height: 50,
    borderRadius:80,
    marginRight:10,
    alignItems:'flex-start'
      },
  postpic:{
    height:'50%',
    width: '100%',
    marginTop:5,
  },
  profile:{
    padding:10,
    flexDirection:'row',
  },
  likecommentshare:{
    height:40,
    backgroundColor:'white',
    margin: 12,
    width:'98%',
   justifyContent: 'space-between',
   flexDirection: 'row',
   alignItems:'center',
  },
  licosh:{
    fontSize: 15,
    alignItems:'center',
    flexDirection:'row'
  },
  countContainer: {
    paddingTop:10,
    justifyContent:'space-between',
    flexDirection:'row',
    height:20,
  },
  likestyle:{
    color:'blue',
  }
});