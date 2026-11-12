import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { obterRituaisOficiais } from '../services/api';

const DICAS_BASE = [
  { id: 'base-1', titulo: 'Chá de Ervas para Intuição', categoria: 'Culinária Mágica', conteudo: 'Infusão de camomila, artemísia e anis-estrelado antes de dormir.' },
  { id: 'base-2', titulo: 'Ritual de Limpeza com Alecrim', categoria: 'Bruxaria Verde', conteudo: 'Queime um ramo seco de alecrim mentalizando luz nos cantos da casa.' }
];

export default function CatalogoDicas({ navigation }) {
  const [lista, setLista] = useState(DICAS_BASE);

  useEffect(() => {
    async function carregar() {
      try {
        const oficiais = await obterRituaisOficiais();
        setLista([...DICAS_BASE, ...oficiais]);
      } catch (e) {
        console.log(e);
      }
    }
    carregar();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guia Sazonal & Culinária Mágica</Text>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id.toString()}
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
  title: { fontSize: 20, fontWeight: 'bold', color: '#FAEADD', marginBottom: 15 },
  card: { backgroundColor: '#332f35', padding: 18, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#522A6F' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FAEADD' },
  cardCategory: { fontSize: 12, color: '#FBCF4F', marginTop: 4 }
});