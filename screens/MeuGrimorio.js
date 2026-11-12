import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Alert, Platform } from 'react-native';
import { obterRituais, criarRitual, deletarRitual } from '../services/api';

export default function MeuGrimorio({ navigation }) {
  const [anotacoes, setAnotacoes] = useState([]);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novoConteudo, setNovoConteudo] = useState('');

  const showAlert = (msg) => {
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Aviso', msg);
  };

  const carregarRituais = async () => {
    try {
      const dados = await obterRituais();
      setAnotacoes(dados);
    } catch (error) {
      showAlert(error.message);
    }
  };

  useEffect(() => {
    carregarRituais();
  }, []);

  const adicionarAnotacao = async () => {
    if (!novoTitulo || !novoConteudo) {
      showAlert('Preencha o título e o conteúdo!');
      return;
    }

    try {
      await criarRitual({ 
        titulo: novoTitulo, 
        categoria: novaCategoria || 'Geral', 
        conteudo: novoConteudo 
      });
      
      showAlert('Ritual salvo no grimório! ✨');
      setNovoTitulo('');
      setNovaCategoria('');
      setNovoConteudo('');
      carregarRituais();
    } catch (error) {
      showAlert(error.message);
    }
  };

  const handleExcluir = async (id) => {
    try {
      await deletarRitual(id);
      showAlert('Ritual removido com sucesso!');
      carregarRituais(); // Atualiza a lista na hora
    } catch (error) {
      showAlert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Grimório Pessoal 📖</Text>

      <View style={styles.form}>
        <TextInput 
          style={styles.input} 
          placeholder="Título do ritual..." 
          placeholderTextColor="#888"
          value={novoTitulo}
          onChangeText={setNovoTitulo}
        />
        <TextInput 
          style={styles.input} 
          placeholder="Categoria..." 
          placeholderTextColor="#888"
          value={novaCategoria}
          onChangeText={setNovaCategoria}
        />
        <TextInput 
          style={[styles.input, styles.textArea]} 
          placeholder="Descrição/passos..." 
          placeholderTextColor="#888"
          value={novoConteudo}
          onChangeText={setNovoConteudo}
          multiline
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarAnotacao}>
          <Text style={styles.buttonText}>Salvar no Grimório</Text>
        </TouchableOpacity>
      </View>

      <FlatList 
        data={anotacoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity 
              style={{ flex: 1 }} 
              onPress={() => navigation.navigate('DetalhesRitual', { ritual: item })}
            >
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardCategory}>Categoria: {item.categoria}</Text>
              <Text style={styles.cardText} numberOfLines={2}>{item.conteudo}</Text>
            </TouchableOpacity>

            {/* Botão de Excluir Direto no Cartão */}
            <TouchableOpacity 
              style={styles.deleteIcon} 
              onPress={() => handleExcluir(item.id)}
            >
              <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#222023' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FAEADD', marginBottom: 15 },
  form: { marginBottom: 20 },
  input: { height: 45, backgroundColor: '#332f35', borderRadius: 8, paddingHorizontal: 15, color: '#FAEADD', borderWidth: 1, borderColor: '#522A6F', marginBottom: 10 },
  textArea: { height: 80, textAlignVertical: 'top', paddingTop: 10 },
  addButton: { backgroundColor: '#522A6F', justifyContent: 'center', alignItems: 'center', padding: 12, borderRadius: 8 },
  buttonText: { color: '#FAEADD', fontWeight: 'bold' },
  card: { backgroundColor: '#332f35', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#522A6F', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FAEADD' },
  cardCategory: { fontSize: 12, color: '#FBCF4F', marginTop: 2 },
  cardText: { fontSize: 13, color: '#FAEADD', marginTop: 6 },
  deleteIcon: { padding: 10, justifyContent: 'center', alignItems: 'center' },
  deleteText: { fontSize: 18 }
});