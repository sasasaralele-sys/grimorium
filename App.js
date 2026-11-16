import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './context/ThemeContext';

import Login from './screens/Login';
import CadastroUsuario from './screens/CadastroUsuario';
import Home from './screens/Home';
import CatalogoDicas from './screens/CatalogoDicas';
import MeuGrimorio from './screens/MeuGrimorio';
import DetalhesRitual from './screens/DetalhesRitual';
import CadastrarRitual from './screens/CadastrarRitual';
import Usuarios from './screens/Usuarios';
import CalendarioMagico from './screens/CalendarioMagico';

const Stack = createNativeStackNavigator();

function Navegacao() {
  const { cores } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#522A6F' },
          headerTintColor: '#FAEADD',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: cores.fundo },
        }}
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ title: 'Criar Conta' }} />
        <Stack.Screen name="Home" component={Home} options={{ title: 'Grimorium' }} />
        <Stack.Screen name="CatalogoDicas" component={CatalogoDicas} options={{ title: 'Guia Sazonal' }} />
        <Stack.Screen name="MeuGrimorio" component={MeuGrimorio} options={{ title: 'Meu Grimório' }} />
        <Stack.Screen name="DetalhesRitual" component={DetalhesRitual} options={{ title: 'Detalhes' }} />
        <Stack.Screen name="CadastrarRitual" component={CadastrarRitual} options={{ title: 'Novo Conteúdo' }} />
        <Stack.Screen name="Usuarios" component={Usuarios} options={{ title: 'Gerenciar Usuários' }} />
        <Stack.Screen name="CalendarioMagico" component={CalendarioMagico} options={{ title: 'Calendário & Roda do Ano' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Navegacao />
    </ThemeProvider>
  );
}