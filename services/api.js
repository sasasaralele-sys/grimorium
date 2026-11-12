const API_URL = 'http://localhost:3000';

let tokenUsuario = '';
let nivelUsuario = '';

export function setToken(token) {
  tokenUsuario = token;
}

export function getNivelUsuario() {
  return nivelUsuario;
}

export async function logarUsuario(dados) {
  const resposta = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro no login');
  
  setToken(resultado.token);
  nivelUsuario = resultado.usuario.nivel;
  return resultado;
}

export async function cadastrarUsuario(dados) {
  const resposta = await fetch(`${API_URL}/api/auth/cadastrar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados),
  });
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro no cadastro');
  return resultado;
}

export async function obterRituais() {
  const resposta = await fetch(`${API_URL}/api/rituais`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenUsuario}`
    },
  });
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao carregar rituais');
  return resultado;
}

export async function criarRitual(dadosRitual) {
  const resposta = await fetch(`${API_URL}/api/rituais`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenUsuario}`
    },
    body: JSON.stringify(dadosRitual),
  });
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao criar ritual');
  return resultado;
}

export async function deletarRitual(id) {
  const resposta = await fetch(`${API_URL}/api/rituais/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenUsuario}`
    },
  });
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao deletar ritual');
  return resultado;
}

export function logout() {
  tokenUsuario = '';
  nivelUsuario = '';
}