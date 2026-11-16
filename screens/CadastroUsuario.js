import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { cadastrarUsuario } from '../services/api';

export default function CadastroUsuario({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { cores } = useTheme();

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    try {
      await cadastrarUsuario({ nome, email, senha, nivel: 'praticante' });
      Alert.alert('Sucesso', 'Conta criada com sucesso! Faça login.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={[styles.container, { backgroundColor: cores.fundo }]}></ScrollView>
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

      <TouchableOpacity style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#222023' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FAEADD', marginBottom: 5 },
  subtitle: { fontSize: 13, color: '#FBCF4F', marginBottom: 20 },
  input: { height: 48, backgroundColor: '#222023', borderRadius: 8, paddingHorizontal: 15, color: '#FAEADD', borderWidth: 1, borderColor: '#522A6F', marginBottom: 12 },
  textArea: { height: 120, textAlignVertical: 'top', paddingTop: 12 },
  button: { backgroundColor: '#522A6F', padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#F29CB7', marginTop: 10 },
  buttonText: { color: '#FAEADD', fontWeight: 'bold', fontSize: 16 }
});