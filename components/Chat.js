import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Startup from './Startup';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Icon, Avatar} from "react-native-elements";

// import firebase from 'react-native-firebase';




//Tämä on chatti mätsin kanssa
export default function Chat(props) {

// States
const [messages, setMessages] = useState([]);


//Tämä on heitetty nyt App.js , kutsutaan kerran ja vain täältä.
//firebase.app();
// React.useEffect(() => {
//   console.log("use effect")
//   //firebase.initializeApp()
//   firebase.initializeApp(global.firebaseConfig);
//   console.log(firebase.config.toString())
//    //yritaKirjautua();

// }, []);

//Tämä on debuggausta varten, testataan viestin lähettämistä
React.useEffect(() => {
//LahetaViestiFirebaseen()
}, []);


//Tällä pystyy lähettää viestinm parametrinä tulee viestin teksti.
//Laitetaan firebasessa validointi ja automaattisna infona lähettäjä, timestamp ja  sallitaan vain message kenttä.

//TODO Timestamppi oikein.
  function LahetaViestiFirebaseen(viesti) {
    //https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
    let body = {
      data: {
        message: viesti,
        match: props.route.params.chatti, //tää pitäs tulla propsi parametristä
      },
    idToken: "dummytoken", //menee nyt dummyna, tän voi hakea kuitenkin ylläolevan ohjeen mukaisesti ja käytetään sitten kun verifiointi päällä
      uid: auth().currentUser.uid //uid menee nyt dummydatana koska verifointifunkkaria ei käytetä.
    }
    //console.log(body)
    fetch(global.url + "message",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      }
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data)
      })
      .catch(err => console.error(err))
  }

// --UPDATED METHOD TO GET MESSAGES REALTIME
// ref for wanted doc, global.keskusteluDOC needs to be changed after to be matching specific chat
const ref = firestore().collection('matches').doc(props.route.params.chatti).collection('messages').orderBy('timestamp', 'desc');

function getConversationsRT() {
  
  // luodaan snapshot joka, "hakee" firestoren sisällön
  ref.onSnapshot((querySnapshot) => {
    // array johon laitetaan firestoren viestit
    const keskustelunViestit = [];
    // tulostaa kuinka monta viestiä collection sisältää
    console.log('Total messages: ', querySnapshot.size);
    // looppi jossa muodostetaan viestit jokaisesta tietueesta
    querySnapshot.forEach((doc) => {
      
      console.log('Viestin sisältö : ',doc.data().message);
      // Alla selvitetään onko henkilö lähettäjä/vastaanottaja, jotta tiedetään kummalle puolelle näyttöä viestit renderöidään
      let sender = 2;
      if(doc.data().sender == auth().currentUser.uid){
        sender = 1;}
      // lisätään arrayhin halutut viesti datat
      keskustelunViestit.push({
        _id: keskustelunViestit.length+1,
        text: doc.data().message,
        createdAt: new Date(doc.data().timestamp._seconds * 1000),
        user: {
          _id: sender,          
        }
      });
      // asettaan taulun stateen jota Giftedchat käyttää datana
      setMessages(keskustelunViestit); 
      
    })
  })
}

useEffect(() => {
  //console.log("Chatin useEffect")
  getConversationsRT();
}, []);  


  // invert shit chatin kääntelyyn mahd.
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    //console.log(messages[0].text)
    LahetaViestiFirebaseen(messages[0].text);
  }, [])


  return (
    <View style={styles.container}>
      <Icon size={20} reverse name="info"  /*tällä napilla voidaan myöhemmin poistaa match*//>
      <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      //onSend={handleSend}
      user={{
        _id: 1,
      }}
    />
    <Button 
    onPress={getConversationsRT} 
    title="debug log"
    containerStyle={{ paddingHorizontal: 10 }}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


// ____________________ Vanhaa koodia ____________________________

/*  // err = "The caller does not have permission to execute the specified operation"
    const sendMessage = () => {
      firestore()
      .collection('messages').doc('8vrpX2NsjbtVuATcsiqC').collection('messages')
      .add({
        message: 'Harmillista',
        sender: 'user1uid',
        timestamp: 1601103600
      })
      .then(() => {
        console.log('message send!');
      });
    } */


/* chat user id's of specific doc
const getChatterUID = async () => {
  try{
    // this returns whole result of 'doc'
    //vaihdetaan global.matches propsiin 
    
    const get_users_from_doc = await firestore().collection(global.matches).doc(global.keskusteluDOC).get();
    setChatters(get_users_from_doc.data().users)
  }
  catch(error){
      console.log(error)
  }
} */
/*
// getting data from firebase
const getConversationdataFromDoc = async () => {
  try {

    const post = [];
    firestore()
    // specify route to desired collection / document__________________ this orders fetched content according timestamp  (ordered by id, default) 
    .collection(global.matches).doc(global.keskusteluDOC).collection('messages').orderBy('timestamp') 
    .get()
    .then(querySnapshot => {
      // querySnapshot = result (messages collection)
      console.log('Total messages: ', querySnapshot.size);
      console.log('Current UID : ',auth().currentUser.uid)
      // forEach (documentSnapshot = individual doc inside the messages collection)
      querySnapshot.forEach(documentSnapshot => {

        post.push({text : documentSnapshot.data().message, dt: documentSnapshot.data().timestamp, sender: documentSnapshot.data().sender})
        
        // logs convo/message id and its message content of each result (remove message, and this shows all data)
        console.log('Message ID : ', documentSnapshot.id, '  Sender uid: ', documentSnapshot.data().sender, '  Message :', documentSnapshot.data().message);
  
        // logs only the text content <String> of each message
        // specific fields can be referenced as shown below extracting wanted field after doc.data(). + 'field'
        //console.log('message : ',  documentSnapshot.data().message);
      });

      // Chat näkyviin a'la Jaani. Nyt all ja ylläoleva tekee about samat, poistetaan toinen seuraavassa spintissä-
      const o = []
      //reverse koska giftedchatin dokumentaatiota tutkimalla siellä on defaulttina reverse, 
      // ja sitä parametriä ei nyt käytetä niin tässä tehdään oma reverse. "Korjataan" seuraavassa sprintissä
      post.reverse();
      post.forEach((element) => {
        //console.log(element.message)
          let sender = 2;
          if(element.sender == 'qREmoPw72NRHB2JA6uBCKJyuWhY2'){
            sender = 1;}
            o.push({
            _id: o.length+1,
            text: element.text,
            createdAt: new Date(element.dt._seconds * 1000),
            user: {
              _id: sender,          
            }
          })       
      }) 
      // asets 'o' array to chat   
      setMessages(o)
    });

  } catch (error) {
    console.log(error);
   
  }
}
*/