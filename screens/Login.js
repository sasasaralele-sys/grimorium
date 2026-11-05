import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { logarUsuario } from '../services/api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const showAlert = (titulo, mensagem) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}: ${mensagem}`);
    } else {
      Alert.alert(titulo, mensagem);
    }
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      showAlert('Atenção', 'Informe e-mail e senha!');
      return;
    }

    try {
      const resultado = await logarUsuario({ email, senha });
      showAlert('Sucesso', resultado.mensagem);
      
      console.log('Token JWT recebido:', resultado.token);

      // Redireciona para a tela Home
      navigation.replace('Home');
    } catch (error) {
      showAlert('Erro ao Entrar', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grimorium 🌿</Text>
      <Text style={styles.subtitle}>Conecte-se à sua sabedoria interior</Text>

      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        placeholderTextColor="#888" 
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha" 
        placeholderTextColor="#888" 
        secureTextEntry 
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CadastroUsuario')}>
        <Text style={styles.linkText}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FAEADD', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#F29CB7', marginBottom: 30 },
  input: { width: '100%', height: 50, backgroundColor: '#332f35', borderRadius: 8, paddingHorizontal: 15, color: '#FAEADD', marginBottom: 15, borderWidth: 1, borderColor: '#522A6F' },
  button: { width: '100%', height: 50, backgroundColor: '#522A6F', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#FAEADD', fontSize: 16, fontWeight: 'bold' },
  linkText: { color: '#FBCF4F', marginTop: 20, fontSize: 14 }
});