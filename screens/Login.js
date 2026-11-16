import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { logarUsuario, setToken } from '../services/api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const showAlert = (msg) => {
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Grimorium', msg);
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      showAlert('Preencha e-mail e senha!');
      return;
    }

    try {
      const resultado = await logarUsuario({ email, senha });
      setToken(resultado.token);
      navigation.replace('Home');
    } catch (error) {
      showAlert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Grimorium 🌿</Text>
      <Text style={styles.subtitle}>Conecte-se à sua sabedoria interior</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#F29CB7"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#F29CB7"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#522A6F',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FAEADD',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#F29CB7',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    backgroundColor: '#222023',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#FAEADD',
    borderWidth: 1,
    borderColor: '#F29CB7',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#222023',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FBCF4F',
    marginTop: 5,
  },
  buttonText: {
    color: '#FAEADD',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: '#FBCF4F',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});