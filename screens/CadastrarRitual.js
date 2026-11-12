import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { criarRitualOficial } from '../services/api';

export default function CadastrarRitual({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [conteudo, setConteudo] = useState('');

  const showAlert = (msg) => {
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Aviso', msg);
  };

  const handlePublicar = async () => {
    if (!titulo || !conteudo) {
      showAlert('Preencha título e conteúdo!');
      return;
    }

    try {
      await criarRitualOficial({
        titulo,
        categoria: categoria || 'Guia Oficial',
        conteudo
      });
      showAlert('Conteúdo oficial publicado com sucesso! 🌟');
      navigation.goBack();
    } catch (error) {
      showAlert(error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Publicar no Guia Oficial 🌟</Text>
      <Text style={styles.subtitle}>Este conteúdo ficará visível para todos os praticantes.</Text>

      <TextInput
        style={styles.input}
        placeholder="Título do ritual ou erva..."
        placeholderTextColor="#888"
        value={titulo}
        onChangeText={setTitulo}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoria (ex: Culinária Mágica, Ervas)..."
        placeholderTextColor="#888"
        value={categoria}
        onChangeText={setCategoria}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Passos, propriedades e instruções..."
        placeholderTextColor="#888"
        value={conteudo}
        onChangeText={setConteudo}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handlePublicar}>
        <Text style={styles.buttonText}>Publicar Conteúdo Oficial</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#222023' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FAEADD', marginBottom: 5 },
  subtitle: { fontSize: 13, color: '#FBCF4F', marginBottom: 20 },
  input: { height: 48, backgroundColor: '#332f35', borderRadius: 8, paddingHorizontal: 15, color: '#FAEADD', borderWidth: 1, borderColor: '#522A6F', marginBottom: 12 },
  textArea: { height: 120, textAlignVertical: 'top', paddingTop: 12 },
  button: { backgroundColor: '#522A6F', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FAEADD', fontWeight: 'bold', fontSize: 16 }
});