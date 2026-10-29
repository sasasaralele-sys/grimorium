import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MeuGrimorio() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suas Anotações Mágicas</Text>
      <Text style={styles.empty}>Nenhum ritual cadastrado ainda. (Em breve com CRUD e MySQL!)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FAEADD', marginBottom: 10 },
  empty: { color: '#888', textAlign: 'center' }
});