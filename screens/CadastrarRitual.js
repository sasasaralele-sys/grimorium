import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function CadastrarRitual() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Conteúdo Oficial (Admin)</Text>
      <TextInput style={styles.input} placeholder="Título do Ritual ou Erva" placeholderTextColor="#888" />
      <TextInput style={styles.input} placeholder="Categoria" placeholderTextColor="#888" />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Salvar no Catálogo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FAEADD', marginBottom: 20 },
  input: { width: '100%', height: 50, backgroundColor: '#332f35', borderRadius: 8, paddingHorizontal: 15, color: '#FAEADD', marginBottom: 15, borderWidth: 1, borderColor: '#522A6F' },
  button: { width: '100%', height: 50, backgroundColor: '#522A6F', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }
});