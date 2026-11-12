import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Alert, Platform } from 'react-native';
import { deletarRitual } from '../services/api';

export default function DetalhesRitual({ route, navigation }) {
  const { ritual } = route.params || { 
    id: null,
    titulo: 'Ritual Exemplo', 
    categoria: 'Geral', 
    conteudo: 'Detalhes indisponíveis.' 
  };

  const showAlert = (titulo, mensagem, callback) => {
    if (Platform.OS === 'web') {
      alert(`${titulo}: ${mensagem}`);
      if (callback) callback();
    } else {
      Alert.alert(titulo, mensagem, [{ text: 'OK', onPress: callback }]);
    }
  };

  const handleDeletar = async () => {
    if (!ritual.id) {
      showAlert('Erro', 'Este ritual padrão não pode ser apagado.');
      return;
    }

    try {
      await deletarRitual(ritual.id);
      showAlert('Sucesso', 'Ritual removido do grimório!', () => {
        navigation.goBack(); // Volta para a lista anterior
      });
    } catch (error) {
      showAlert('Erro', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{ritual.titulo}</Text>
      <Text style={styles.category}>Categoria: {ritual.categoria}</Text>
      
      <View style={styles.contentBox}>
        <Text style={styles.contentLabel}>Passos / Ingredientes:</Text>
        <Text style={styles.content}>{ritual.conteudo}</Text>
      </View>

      {/* Botão de Excluir (O 'D' do CRUD) */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeletar}>
        <Text style={styles.deleteButtonText}>Excluir Ritual 🗑️</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#222023' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FAEADD', marginBottom: 5 },
  category: { fontSize: 14, color: '#FBCF4F', marginBottom: 20 },
  contentBox: { backgroundColor: '#332f35', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#522A6F', marginBottom: 20 },
  contentLabel: { fontSize: 14, fontWeight: 'bold', color: '#F29CB7', marginBottom: 10 },
  content: { fontSize: 16, color: '#FAEADD', lineHeight: 24 },
  deleteButton: { backgroundColor: '#8B0000', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  deleteButtonText: { color: '#FAEADD', fontWeight: 'bold', fontSize: 16 }
});