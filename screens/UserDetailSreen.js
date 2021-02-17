import React, { useEffect, useState } from "react";
import { 
         View, 
         StyleSheet, 
         TextInput, 
         ScrollView, 
         Button, 
         ActivityIndicator, 
         Alert, 
         Image 
       } from "react-native";
import firebase from "../database/firebase";


const UserDetailScreen = (props) => {

    const initialState = {
        id: '',
        name: '',
        email: '',
        phone: '',
        evento: '',
        pago: ''
    }

    const [user, setUser] = useState(initialState);

    const [loading, setLoading] = useState(true)

    const getUserById = async (id) => {
        const dbRef = firebase.db.collection('users').doc(id);
        const doc = await dbRef.get();
        const user = doc.data();
        setUser({
            ...user,
            id: doc.id,
        });
        setLoading(false)
    };

    useEffect(() => {
        getUserById(props.route.params.userId);
    }, []);

    const handleChangeText = (value, name) => {
        setUser({ ...user, [name]: value });
    };

    const deleteUser = async () => {
        const dbRef = firebase.db.collection('users').doc(props.route.params.userId);
        await dbRef.delete();
        props.navigation.navigate('UserList')
    }

    const updateUser = async () => {
        const dbRef = firebase.db.collection('users').doc(user.id);
        await dbRef.set({
            name: user.name,
            email: user.email,
            phone: user.phone,
            evento: user.evento,
            pago: user.pago
        })
        setUser(initialState)
        props.navigation.navigate('UserList')
    }

    const openConfirmationAlert = () => {
        Alert.alert('Borrar Usuario', '¿Estas seguro que quieres borrar el usuario?', [
            { text: 'Si', onPress: () => deleteUser() },
            { text: 'No', onPress: () => console.log(false) }
        ])
    }

    if (loading) {
        return (
            <View style={{padding: 100}}>
                <ActivityIndicator size="large" color="#ff0000" />
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Nombre"
                    value={user.name}
                    onChangeText={(value) => handleChangeText(value, "name")}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Email"
                    value={user.email}
                    onChangeText={(value) => handleChangeText(value, "email")}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Telefono"
                    value={user.phone}
                    onChangeText={(value) => handleChangeText(value, "phone")}
                />
            </View>

            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Nombre del Evento"
                    value={user.evento}
                    onChangeText={(value) => handleChangeText(value, "evento")}
                />
            </View>

            <View style={styles.inputGroup}>
                <TextInput
                    placeholder="Pago o Debe"
                    value={user.pago}
                    onChangeText={(value) => handleChangeText(value, "pago")}
                />
            </View>

            <View style={styles.buttonView}>
                <Button
                    color="#19AC52"
                    title="Actualizar"
                    onPress={() => updateUser()} />
            </View>
            <View style={styles.buttonView}>
                <Button
                    color="#ff0000"
                    title="Borrar"
                    onPress={() => openConfirmationAlert()} />
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
        padding: 50,
    },

    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#595b83'
    },

    buttonView: {
        paddingRight: 40,
        paddingLeft: 40,
        marginBottom: 10
    },

    tinyLogo: {
        width: 80,
        height: 80,
      },
});

export default UserDetailScreen;