import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DetalhesRitual({ route }) {
  const { ritual } = route.params || { titulo: 'Ritual Exemplo', categoria: 'Geral' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{ritual.titulo}</Text>
      <Text style={styles.category}>Categoria: {ritual.categoria}</Text>
      <Text style={styles.content}>
        Aqui virá a descrição detalhada do ritual, ingredientes necessários, passo a passo e propriedades energéticas da erva ou culinária mágica selecionada.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FAEADD', marginBottom: 10 },
  category: { fontSize: 14, color: '#FBCF4F', marginBottom: 20 },
  content: { fontSize: 16, color: '#FAEADD', lineHeight: 24 }
});