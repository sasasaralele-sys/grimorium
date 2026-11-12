import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { getNivelUsuario, logout } from '../services/api';

export default function Home({ navigation }) {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const nivel = getNivelUsuario();
    if (nivel === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    logout(); // Limpa o token e o nível
    navigation.replace('Login'); // Volta para o login
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.welcome}>Bem-vinda, Bruxa ✨</Text>
          <Text style={styles.description}>O que você deseja consultar hoje?</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CatalogoDicas')}>
        <Text style={styles.cardTitle}>📜 Guia de Rituais e Ervas</Text>
        <Text style={styles.cardText}>Explore conteúdos públicos e culinária mágica.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('MeuGrimorio')}>
        <Text style={styles.cardTitle}>📖 Meu Grimório Pessoal</Text>
        <Text style={styles.cardText}>Gerencie suas anotações e rituais privados (CRUD).</Text>
      </TouchableOpacity>

      {isAdmin && (
        <View style={styles.adminSection}>
          <Text style={styles.adminTitle}>Área do Administrador</Text>
          <TouchableOpacity style={styles.adminButton} onPress={() => navigation.navigate('CadastrarRitual')}>
            <Text style={styles.buttonText}>+ Cadastrar Conteúdo Oficial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.adminButtonAlt} onPress={() => navigation.navigate('Usuarios')}>
            <Text style={styles.buttonText}>Gerenciar Níveis de Usuários</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#222023', flexGrow: 1 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  welcome: { fontSize: 22, fontWeight: 'bold', color: '#FAEADD', marginTop: 10 },
  description: { fontSize: 14, color: '#FBCF4F', marginTop: 5 },
  logoutButton: { backgroundColor: '#332f35', paddingVertical: 8, paddingHorizontal: 15, borderRadius: 8, borderWidth: 1, borderColor: '#F29CB7', marginTop: 10 },
  logoutText: { color: '#F29CB7', fontWeight: 'bold', fontSize: 12 },
  card: { backgroundColor: '#522A6F', padding: 20, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: '#F29CB7' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#FAEADD', marginBottom: 5 },
  cardText: { fontSize: 13, color: '#FAEADD' },
  adminSection: { marginTop: 20, borderTopWidth: 1, borderTopColor: '#332f35', paddingTop: 20 },
  adminTitle: { fontSize: 16, fontWeight: 'bold', color: '#F29CB7', marginBottom: 10 },
  adminButton: { backgroundColor: '#332f35', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#522A6F' },
  adminButtonAlt: { backgroundColor: '#332f35', padding: 15, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#FBCF4F' },
  buttonText: { color: '#FAEADD', fontWeight: 'bold' }
});