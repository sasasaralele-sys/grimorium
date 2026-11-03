import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import CadastroUsuario from './screens/CadastroUsuario';
import Home from './screens/Home';
import CatalogoDicas from './screens/CatalogoDicas';
import DetalhesRitual from './screens/DetalhesRitual';
import MeuGrimorio from './screens/MeuGrimorio';
import CadastrarRitual from './screens/CadastrarRitual';
import Usuarios from './screens/Usuarios';

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
        <Stack.Screen name="Login" component={Login} options={{ title: 'Entrar no Grimorium' }} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ title: 'Criar Conta' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Painel Principal' }} />
        <Stack.Screen name="CatalogoDicas" component={CatalogoDicas} options={{ title: 'Guia Sazonal' }} />
        <Stack.Screen name="DetalhesRitual" component={DetalhesRitual} options={{ title: 'Detalhes do Ritual' }} />
        <Stack.Screen name="MeuGrimorio" component={MeuGrimorio} options={{ title: 'Meu Grimório Pessoal' }} />
        <Stack.Screen name="CadastrarRitual" component={CadastrarRitual} options={{ title: 'Novo Conteúdo (Admin)' }} />
        <Stack.Screen name="Usuarios" component={Usuarios} options={{ title: 'Gerenciar Usuários (Admin)' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}