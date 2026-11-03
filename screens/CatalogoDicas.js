import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

const rituaisExemplo = [
  { id: '1', titulo: 'Chá de Ervas para Intuição', categoria: 'Culinária Mágica' },
  { id: '2', titulo: 'Ritual de Limpeza com Alecrim', categoria: 'Bruxaria Verde' },
];

export default function CatalogoDicas({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guia Sazonal & Culinária Mágica</Text>
      
      <FlatList 
        data={rituaisExemplo}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('DetalhesRitual', { ritual: item })}
          >
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardCategory}>{item.categoria}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#222023' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FAEADD', marginBottom: 20 },
  card: { backgroundColor: '#332f35', padding: 15, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#522A6F' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FAEADD' },
  cardCategory: { fontSize: 12, color: '#FBCF4F', marginTop: 4 }
});
