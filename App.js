import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import MeuGrimorioScreen from './screens/MeuGrimorio';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#522A6F' }, // Purple Seduction
          headerTintColor: '#FAEADD', // Rosarian
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#222023' } // Wet Charcoal
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Entrar no Grimorium' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início — Grimorium' }} />
        <Stack.Screen name="MeuGrimorio" component={MeuGrimorioScreen} options={{ title: 'Meu Grimório Pessoal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}