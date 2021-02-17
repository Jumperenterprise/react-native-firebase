import React, { useState } from "react";
import { View, Button, TextInput, ScrollView, StyleSheet, Image } from "react-native";
import firebase from '../database/firebase';


const CreateUserScreen = (props) => {
    const [state, setState] = useState({
        name: "",
        email: "",
        phone: "",
        evento: "",
        pago: ""
    });

    const handleChangeText = (value, name) => {
        setState({ ...state, [name]: value });
    }; 

    const saveNewUser = async() => {
        if (state.name === "") {
            alert('Por favor inserte el nombre!')
        } else {
            await firebase.db.collection('users').add({
                name: state.name,
                email: state.email,
                phone: state.phone,
                evento: state.evento,
                pago: state.pago
            })
            props.navigation.navigate('UserList');
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput 
                  placeholder="Nombre" 
                  onChangeText={(value) => handleChangeText(value, "name") } 
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                  placeholder="Email"
                  onChangeText={(value) => handleChangeText(value, "email") } 
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput 
                 placeholder="Telefono" 
                 onChangeText={(value) => handleChangeText(value, "phone") } 
                />
            </View>

            <View style={styles.inputGroup}>
                <TextInput 
                  placeholder="Nombre del Evento"
                  onChangeText={(value) => handleChangeText(value, "evento") } 
                />
            </View>

            <View style={styles.inputGroup}>
                <TextInput 
                  placeholder="Pago o Debe"
                  onChangeText={(value) => handleChangeText(value, "pago") } 
                />
            </View>

            <View style={styles.buttonView}>
                <Button title="Guardar" onPress={() => saveNewUser()} />
            </View>

            <View  style={{alignItems: 'center', padding: 50}}>
                <Image
                    style={styles.tinyLogo}
                    source={{
                        uri: 'https://www.mediafire.com/convkey/ca21/wm6t5ftvfvtn9i0zg.jpg',
                    }}
                />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 45,    
    },

    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#595b83'
    },

    buttonView: {
        paddingRight: 80,
        paddingLeft: 80,
    },
    
    tinyLogo: {
        width: 80,
        height: 80,
      },
})

export default CreateUserScreen;