import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { obterRodaDoAno, obterDiarioCalendario, salvarEntradaDiario } from '../services/api';
import { useTheme } from '../context/ThemeContext';

export default function CalendarioMagico() {
  const [aba, setAba] = useState('diario');
  const [festivais, setFestivais] = useState([]);
  const [entradas, setEntradas] = useState([]);
  const { cores } = useTheme();

  const hojeFormatado = new Date().toISOString().split('T')[0];
  const [dataAnotacao, setDataAnotacao] = useState(hojeFormatado);
  const [humorEnergia, setHumorEnergia] = useState('');
  const [anotacao, setAnotacao] = useState('');

  const showAlert = (msg) => {
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Grimorium', msg);
  };

  const carregarDados = async () => {
    try {
      const listaFestivais = await obterRodaDoAno();
      const listaDiario = await obterDiarioCalendario();
      if (Array.isArray(listaFestivais)) setFestivais(listaFestivais);
      if (Array.isArray(listaDiario)) setEntradas(listaDiario);
    } catch (e) {
      console.log('Erro ao carregar dados temáticos:', e);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleSalvarDiario = async () => {
    if (!anotacao) {
      showAlert('Escreva sua anotação do dia!');
      return;
    }
    try {
      await salvarEntradaDiario({
        data_anotacao: dataAnotacao,
        humor_energia: humorEnergia || 'Equilibrada',
        fase_lunar: 'Ciclo Atual',
        anotacao
      });
      showAlert('Anotação registrada no calendário! ✨');
      setAnotacao('');
      setHumorEnergia('');
      carregarDados();
    } catch (e) {
      showAlert(e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: cores.fundo }]}>
      <Text style={styles.title}>📅 Calendário & Roda do Ano</Text>

      <View style={styles.tabRow}>
        <TouchableOpacity
          style={[styles.tab, aba === 'diario' && styles.tabAtiva]}
          onPress={() => setAba('diario')}
        >
          <Text style={styles.tabText}>📖 Diário por Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, aba === 'roda' && styles.tabAtiva]}
          onPress={() => setAba('roda')}
        >
          <Text style={styles.tabText}>🎡 Roda do Ano (Sabbats)</Text>
        </TouchableOpacity>
      </View>

      {aba === 'diario' ? (
        <View>
          <Text style={styles.sectionTitle}>Registrar Dia ({dataAnotacao})</Text>
          <TextInput
            style={styles.input}
            placeholder="Data (AAAA-MM-DD)"
            placeholderTextColor="#DDAAFF"
            value={dataAnotacao}
            onChangeText={setDataAnotacao}
          />
          <TextInput
            style={styles.input}
            placeholder="Energia / Humor do dia (ex: Intuitiva, Intensa...)"
            placeholderTextColor="#DDAAFF"
            value={humorEnergia}
            onChangeText={setHumorEnergia}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="O que aconteceu hoje? Sinais, sentimentos, práticas..."
            placeholderTextColor="#DDAAFF"
            value={anotacao}
            onChangeText={setAnotacao}
            multiline
          />
          <TouchableOpacity style={styles.button} onPress={handleSalvarDiario}>
            <Text style={styles.buttonText}>Salvar Página do Dia</Text>
          </TouchableOpacity>

          <Text style={[styles.sectionTitle, { marginTop: 25 }]}>Registros Anteriores</Text>
          {entradas.length === 0 ? (
            <Text style={styles.emptyText}>Nenhuma página registrada ainda.</Text>
          ) : (
            entradas.map((item) => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.cardDate}>🗓️ {item.data_anotacao} • Energia: {item.humor_energia}</Text>
                <Text style={styles.cardBody}>{item.anotacao}</Text>
              </View>
            ))
          )}
        </View>
      ) : (
        <View>
          <Text style={styles.subtitle}>Festividades Sagradas (Hemisfério Sul)</Text>
          {festivais.length === 0 ? (
            <Text style={styles.emptyText}>Nenhum sabbat carregado.</Text>
          ) : (
            festivais.map((fest) => (
              <View key={fest.id} style={styles.card}>
                <Text style={styles.cardTitle}>{fest.nome_festividade}</Text>
                <Text style={styles.cardDate}>📅 Data: {fest.data_referencia}</Text>
                <Text style={styles.cardBody}>{fest.descricao}</Text>
                <Text style={styles.cardCorresp}>✨ Correspondências: {fest.correspondencias}</Text>
              </View>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#222023', flexGrow: 1 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#FAEADD', marginBottom: 15 },
  subtitle: { fontSize: 13, color: '#FBCF4F', marginBottom: 15 },
  emptyText: { color: '#F29CB7', fontStyle: 'italic', marginTop: 10 },
  tabRow: { flexDirection: 'row', marginBottom: 20, gap: 10 },
  tab: { flex: 1, padding: 12, backgroundColor: '#222023', borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#522A6F' },
  tabAtiva: { backgroundColor: '#522A6F', borderColor: '#F29CB7' },
  tabText: { color: '#FAEADD', fontWeight: 'bold', fontSize: 13 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#FBCF4F', marginBottom: 10 },
  input: { height: 45, backgroundColor: '#222023', borderRadius: 8, paddingHorizontal: 12, color: '#FAEADD', borderWidth: 1, borderColor: '#522A6F', marginBottom: 10 },
  textArea: { height: 90, textAlignVertical: 'top', paddingTop: 10 },
  button: { backgroundColor: '#522A6F', padding: 14, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#F29CB7' },
  buttonText: { color: '#FAEADD', fontWeight: 'bold' },
  card: { backgroundColor: '#222023', padding: 15, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#522A6F' },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#FAEADD' },
  cardDate: { fontSize: 12, color: '#FBCF4F', marginVertical: 4, fontWeight: 'bold' },
  cardBody: { fontSize: 13, color: '#FAEADD', lineHeight: 19 },
  cardCorresp: { fontSize: 12, color: '#F29CB7', marginTop: 8, fontStyle: 'italic' }
});