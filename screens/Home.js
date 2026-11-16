import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { logout, getNivelUsuario } from '../services/api';
import { useTheme } from '../context/ThemeContext';

function calcularFaseLunar() {
  const hoje = new Date();
  const luaNovaRef = new Date('2024-01-11T11:57:00Z');
  const ciclo = 29.53058867;
  const diasPassados = (hoje - luaNovaRef) / (1000 * 60 * 60 * 24);
  const idadeLua = diasPassados % ciclo;
  

  if (idadeLua < 1.84) return { nome: 'Lua Nova 🌑', dica: 'Dia ideal para plantar novas intenções, iniciar projetos e silenciar a mente.' };
  if (idadeLua < 7.38) return { nome: 'Lua Crescente 🌒', dica: 'Momento de expansão, atrair prosperidade, coragem e fortalecer rituais.' };
  if (idadeLua < 14.76) return { nome: 'Lua Cheia 🌕', dica: 'Ápice energético! Ideal para consagração de cristais, intuição e rituais de amor.' };
  return { nome: 'Lua Minguante 🌘', dica: 'Dia ideal para banimentos, limpeza energética, desapego e encerramentos de ciclos.' };
}

export default function Home({ navigation }) {
  const { modoClaro, alternarTema, cores } = useTheme();
  const isAdmin = getNivelUsuario() === 'admin';
  const luaAtual = calcularFaseLunar();

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: cores.fundo }]}>
      <View style={styles.headerRow}>
        <View style={{ flex: 1 }}>
          <Text style={[styles.welcome, { color: cores.texto }]}>Bem-vinda, Bruxa ✨</Text>
          <Text style={[styles.description, { color: cores.dourado }]}>O que você deseja consultar hoje?</Text>
        </View>

        <View style={styles.topButtons}>
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: cores.cardFundo, borderColor: cores.borda }]}
            onPress={alternarTema}
          >
            <Text style={[styles.themeText, { color: cores.texto }]}>
              {modoClaro ? '🌙 Escuro' : '☀️ Claro'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: cores.cardFundo, borderColor: cores.rosa }]}
            onPress={handleLogout}
          >
            <Text style={[styles.logoutText, { color: cores.rosa }]}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.luaCard, { backgroundColor: cores.cardFundo, borderColor: cores.dourado }]}>
        <Text style={[styles.luaTitle, { color: cores.dourado }]}>{luaAtual.nome}</Text>
        <Text style={[styles.luaDica, { color: cores.texto }]}>{luaAtual.dica}</Text>
      </View>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CatalogoDicas')}>
        <Text style={styles.cardTitle}>📜 Guia de Rituais & Correspondências</Text>
        <Text style={styles.cardText}>Consulte ervas, cristais, cores e receitas mágicas.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MeuGrimorio')}>
        <Text style={styles.cardTitle}>📖 Meu Grimório & Diário de Sonhos</Text>
        <Text style={styles.cardText}>Gerencie seus rituais privados e registros oníricos.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CalendarioMagico')}>
        <Text style={styles.cardTitle}>📅 Calendário & Roda do Ano</Text>
        <Text style={styles.cardText}>Diário por data e datas sagradas (Samhain, Imbolc, Yule...).</Text>
      </TouchableOpacity>

      {isAdmin && (
        <View style={[styles.adminSection, { borderTopColor: cores.borda }]}>
          <Text style={[styles.adminTitle, { color: cores.rosa }]}>Área do Administrador</Text>
          <TouchableOpacity
            style={[styles.adminButton, { backgroundColor: cores.cardFundo, borderColor: cores.dourado }]}
            onPress={() => navigation.navigate('CadastrarRitual')}
          >
            <Text style={[styles.adminButtonText, { color: cores.texto }]}>+ Cadastrar Conteúdo Oficial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.adminButton, { backgroundColor: cores.cardFundo, borderColor: cores.dourado }]}
            onPress={() => navigation.navigate('Usuarios')}
          >
            <Text style={[styles.adminButtonText, { color: cores.texto }]}>Gerenciar Níveis de Usuários</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 15 },
  topButtons: { flexDirection: 'row', gap: 8, marginTop: 10 },
  welcome: { fontSize: 22, fontWeight: 'bold', marginTop: 10 },
  description: { fontSize: 14, marginTop: 5 },
  themeButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1 },
  themeText: { fontWeight: 'bold', fontSize: 12 },
  logoutButton: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1 },
  logoutText: { fontWeight: 'bold', fontSize: 12 },
  luaCard: { padding: 18, borderRadius: 12, marginBottom: 18, borderWidth: 1 },
  luaTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  luaDica: { fontSize: 13, lineHeight: 19 },
  card: { backgroundColor: '#522A6F', padding: 18, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#F29CB7' },
  cardTitle: { fontSize: 17, fontWeight: 'bold', color: '#FAEADD', marginBottom: 4 },
  cardText: { fontSize: 13, color: '#DDAAFF' },
  adminSection: { marginTop: 15, paddingTop: 15, borderTopWidth: 1 },
  adminTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  adminButton: { padding: 14, borderRadius: 8, marginBottom: 10, borderWidth: 1, alignItems: 'center' },
  adminButtonText: { fontWeight: 'bold', fontSize: 14 }
});