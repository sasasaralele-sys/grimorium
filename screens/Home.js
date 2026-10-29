import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vinda de volta, Bruxa ✨</Text>
      <Text style={styles.description}>Explore rituais sazonais ou acesse suas anotações privadas.</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MeuGrimorio')}>
        <Text style={styles.cardTitle}>📖 Meu Grimório Pessoal</Text>
        <Text style={styles.cardText}>Gerencie suas anotações e rituais criados.</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'flex-start' },
  welcome: { fontSize: 22, fontWeight: 'bold', color: '#FAEADD', marginTop: 20 },
  description: { fontSize: 14, color: '#FBCF4F', marginBottom: 30, marginTop: 5 },
  card: { backgroundColor: '#522A6F', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#F29CB7' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#FAEADD', marginBottom: 5 },
  cardText: { fontSize: 13, color: '#FAEADD' }
});