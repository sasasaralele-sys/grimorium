import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

const usuariosExemplo = [
  { id: '1', nome: 'Luna', nivel: 'Admin' },
  { id: '2', nome: 'Clara', nivel: 'Praticante' }
];

export default function Usuarios() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Níveis de Usuários (Painel Admin)</Text>
      <FlatList 
        data={usuariosExemplo}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.nome}</Text>
            <Text style={styles.cardCategory}>Nível: {item.nivel}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FAEADD', marginBottom: 20 },
  card: { backgroundColor: '#332f35', padding: 15, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#522A6F' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FAEADD' },
  cardCategory: { fontSize: 12, color: '#FBCF4F', marginTop: 4 }
});