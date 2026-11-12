import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { obterUsuarios, alterarNivelUsuario } from '../services/api';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const showAlert = (msg) => {
    if (Platform.OS === 'web') alert(msg);
    else Alert.alert('Aviso', msg);
  };

  const carregarUsuarios = async () => {
    try {
      const dados = await obterUsuarios();
      setUsuarios(dados);
    } catch (error) {
      showAlert(error.message);
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const alternarNivel = async (usuario) => {
    const novoNivel = usuario.nivel === 'admin' ? 'praticante' : 'admin';
    try {
      await alterarNivelUsuario(usuario.id, novoNivel);
      showAlert(`Usuário ${usuario.nome} agora é ${novoNivel}!`);
      carregarUsuarios();
    } catch (error) {
      showAlert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Níveis de Usuários 👥</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flex: 1 }}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.email}>{item.email}</Text>
              <Text style={[styles.nivel, item.nivel === 'admin' && styles.nivelAdmin]}>
                Nível: {item.nivel.toUpperCase()}
              </Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => alternarNivel(item)}>
              <Text style={styles.buttonText}>
                {item.nivel === 'admin' ? 'Tornar Praticante' : 'Promover a Admin'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#222023' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#FAEADD', marginBottom: 15 },
  card: { backgroundColor: '#332f35', padding: 15, borderRadius: 10, marginBottom: 10, borderWidth: 1, borderColor: '#522A6F', flexDirection: 'row', alignItems: 'center' },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#FAEADD' },
  email: { fontSize: 12, color: '#bbb', marginTop: 2 },
  nivel: { fontSize: 12, color: '#FBCF4F', fontWeight: 'bold', marginTop: 5 },
  nivelAdmin: { color: '#F29CB7' },
  button: { backgroundColor: '#522A6F', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  buttonText: { color: '#FAEADD', fontWeight: 'bold', fontSize: 12 }
});