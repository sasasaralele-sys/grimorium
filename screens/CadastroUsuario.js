import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function CadastroUsuario({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleCadastro = () => {
    // Aqui depois faremos a integração com a rota do backend em Node.js
    Alert.alert('Sucesso', 'Conta criada com sucesso! Faça login.');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Conta ✨</Text>
      <Text style={styles.subtitle}>Junte-se ao nosso círculo de sabedoria</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Nome de Bruxa / Usuária" 
        placeholderTextColor="#888" 
        value={nome}
        onChangeText={setNome}
      />
      <TextInput 
        style={styles.input} 
        placeholder="E-mail" 
        placeholderTextColor="#888" 
        value={email}
        onChangeText={setEmail}
      />
      <TextInput 
        style={styles.input} 
        placeholder="Senha (com hash seguro)" 
        placeholderTextColor="#888" 
        secureTextEntry 
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#222023' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#FAEADD', marginBottom: 5 },
  subtitle: { fontSize: 14, color: '#F29CB7', marginBottom: 30 },
  input: { width: '100%', height: 50, backgroundColor: '#332f35', borderRadius: 8, paddingHorizontal: 15, color: '#FAEADD', marginBottom: 15, borderWidth: 1, borderColor: '#522A6F' },
  button: { width: '100%', height: 50, backgroundColor: '#522A6F', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10 },
  buttonText: { color: '#FAEADD', fontSize: 16, fontWeight: 'bold' }
});