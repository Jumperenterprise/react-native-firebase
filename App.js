import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

import UserList from "./screens/UsersList";
import UserDetailScreen from "./screens/UserDetailSreen";
import CreateUserScreen from "./screens/CreateUserScreen";

function MyStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList} options={{title: 'Lista de Clientes'}} />
      <Stack.Screen name="CreateUserScreen" component={CreateUserScreen} options={{title: 'Crear Nuevo Cliente'}} />
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options={{title: 'Detalles de Cliente'}} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}


