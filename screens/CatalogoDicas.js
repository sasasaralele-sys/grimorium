import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { obterRituaisOficiais, obterCorrespondencias } from '../services/api';
import { useTheme } from '../context/ThemeContext';

export default function CatalogoDicas({ navigation }) {
  const [aba, setAba] = useState('rituais');
  const [rituais, setRituais] = useState([]);
  const [correspondencias, setCorrespondencias] = useState([]);
  const { cores } = useTheme();

  useEffect(() => {
    async function carregar() {
      try {
        const oficiais = await obterRituaisOficiais();
        const listaCorresp = await obterCorrespondencias();
        if (Array.isArray(oficiais)) setRituais(oficiais);
        if (Array.isArray(listaCorresp)) setCorrespondencias(listaCorresp);
      } catch (e) {
        console.log(e);
      }
    }
    carregar();
  }, []);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: cores.fundo }]}>
      <Text style={styles.title}>📜 Guia Sazonal & Correspondências</Text>

      <View style={styles.tabRow}>
        <TouchableOpacity style={[styles.tab, aba === 'rituais' && styles.tabAtiva]} onPress={() => setAba('rituais')}>
          <Text style={styles.tabText}>Rituais & Receitas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, aba === 'corresp' && styles.tabAtiva]} onPress={() => setAba('corresp')}>
          <Text style={styles.tabText}>🌿 Ervas, Cristais & Cores</Text>
        </TouchableOpacity>
      </View>

      {aba === 'rituais' ? (
        rituais.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => navigation.navigate('DetalhesRitual', { ritual: item })}
          >
            <Text style={styles.cardTitle}>{item.titulo}</Text>
            <Text style={styles.cardCategory}>{item.categoria}</Text>
          </TouchableOpacity>
        ))
      ) : (
        correspondencias.map((c) => (
          <View key={c.id} style={styles.card}>
            <Text style={styles.cardTitle}>✨ Intenção: {c.intencao}</Text>
            <Text style={styles.infoText}>🌿 <Text style={styles.bold}>Ervas:</Text> {c.ervas}</Text>
            <Text style={styles.infoText}>💎 <Text style={styles.bold}>Cristais:</Text> {c.cristais}</Text>
            <Text style={styles.infoText}>🕯️ <Text style={styles.bold}>Cores:</Text> {c.cores}</Text>
            <Text style={styles.cardCategory}>🌙 Lua Ideal: {c.fase_lunar_ideal}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#222023' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FAEADD', marginBottom: 15 },
  tabRow: { flexDirection: 'row', marginBottom: 15, gap: 10 },
  tab: { flex: 1, padding: 12, backgroundColor: '#222023', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#522A6F' },
  tabAtiva: { backgroundColor: '#522A6F', borderColor: '#F29CB7' },
  tabText: { color: '#FAEADD', fontWeight: 'bold', fontSize: 13 },
  card: { backgroundColor: '#222023', padding: 16, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#522A6F' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FAEADD', marginBottom: 6 },
  cardCategory: { fontSize: 12, color: '#FBCF4F', marginTop: 6, fontWeight: 'bold' },
  infoText: { fontSize: 13, color: '#FAEADD', marginBottom: 3 },
  bold: { fontWeight: 'bold', color: '#F29CB7' }
});