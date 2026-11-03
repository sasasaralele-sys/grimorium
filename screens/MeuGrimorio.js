import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function MeuGrimorio() {
  const [anotacoes, setAnotacoes] = useState([
    { id: '1', titulo: 'Meu banho de ervas favorito', texto: 'Usar alecrim e arruda na lua minguante.' }
  ]);
  const [novoTitulo, setNovoTitulo] = useState('');

  const adicionarAnotacao = () => {
    if (!novoTitulo) return;
    setAnotacoes([...anotacoes, { id: Date.now().toString(), titulo: novoTitulo, texto: 'Descrição rápida' }]);
    setNovoTitulo('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Grimório Pessoal 📖</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Novo título de ritual/anotação..." 
          placeholderTextColor="#888"
          value={novoTitulo}
          onChangeText={setNovoTitulo}
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarAnotacao}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={anotacoes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardText}>{item.texto}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FAEADD', marginBottom: 15 },
  form: { flexDirection: 'row', marginBottom: 20 },
  input: { flex: 1, height: 45, backgroundColor: '#332f35', borderRadius: 8, paddingHorizontal: 15, color: '#FAEADD', borderWidth: 1, borderColor: '#522A6F', marginRight: 10 },
  addButton: { backgroundColor: '#522A6F', justifyContent: 'center', paddingHorizontal: 20, borderRadius: 8 },
  buttonText: { color: '#FAEADD', fontWeight: 'bold' },
  card: { backgroundColor: '#332f35', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#522A6F' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FAEADD' },
  cardText: { fontSize: 13, color: '#FBCF4F', marginTop: 4 }
});