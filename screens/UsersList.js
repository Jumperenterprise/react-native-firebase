import React, { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import firebase from "../database/firebase";
import { ListItem, Avatar, Button } from "react-native-elements";


const UserList = (props) => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        firebase.db.collection('users').onSnapshot(querySnapshot => {
             
            const users = [];

            querySnapshot.docs.forEach(doc => {
                const {name, email, phone, evento, pago} = doc.data()
                users.push({
                    id: doc.id,
                    name,
                    email,
                    phone,
                    evento,
                    pago
                })
            });
           setUsers(users) 
        });
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.buttonView}>
            <Button 
            style={styles.create}
            type="solid"
            title= "Crear Usuario" 
            onPress={() => props.navigation.navigate("CreateUserScreen")}             
            />
            </View>
            {
                users.map(user => {
                    return (
                        <ListItem
                            key={user.id}
                            bottomDivider 
                            onPress={() => {
                                props.navigation.navigate('UserDetailScreen',{
                                    userId: user.id
                                })
                            }}
                        > 
                            <ListItem.Chevron/>
                             <Avatar source={{uri: 'https://img.icons8.com/fluent/48/000000/user-male-circle.png'}} />
                                <ListItem.Content>
                                    <ListItem.Title>{user.name}</ListItem.Title>
                                    <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
                                    <ListItem.Subtitle>{user.evento}</ListItem.Subtitle>
                                    <ListItem.Subtitle>{user.pago}</ListItem.Subtitle>
                                </ListItem.Content>
                        </ListItem>
                    )
                })
            }

        </ScrollView>
    );
};

const styles = StyleSheet.create ({
     container: {
        backgroundColor: '#dcdcdc',
     },
     
     buttonView: {
         marginTop: 10,
         marginBottom: 10,
         paddingRight: 80,
         paddingLeft: 80,
     }
});



export default UserList;