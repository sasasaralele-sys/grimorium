const API_URL = 'http://localhost:3000';

let tokenUsuario = '';
let nivelUsuario = '';

export function setToken(token) {
  tokenUsuario = token;
}

export function getNivelUsuario() {
  return nivelUsuario;
}

export function logout() {
  tokenUsuario = '';
  nivelUsuario = '';
}

// 1. Autenticação
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

// 2. Rituais Privados (CRUD do Grimório Pessoal)
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

// 3. Conteúdos Oficiais (Guia Público gerido pelo Admin)
export async function obterRituaisOficiais() {
  const resposta = await fetch(`${API_URL}/api/rituais/oficiais`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${tokenUsuario}` },
  });
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao buscar guia oficial');
  return resultado;
}

export async function criarRitualOficial(dados) {
  const resposta = await fetch(`${API_URL}/api/rituais/oficial`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenUsuario}`
    },
    body: JSON.stringify(dados),
  });
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao cadastrar conteúdo oficial');
  return resultado;
}

// 4. Gestão de Utilizadores (Exclusivo Admin)
export async function obterUsuarios() {
  const resposta = await fetch(`${API_URL}/api/usuarios`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${tokenUsuario}` },
  });
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao carregar usuários');
  return resultado;
}

export async function alterarNivelUsuario(id, nivel) {
  const resposta = await fetch(`${API_URL}/api/usuarios/${id}/nivel`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenUsuario}`
    },
    body: JSON.stringify({ nivel }),
  });
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao alterar nível');
  return resultado;
}

// 5. Recursos Temáticos (Roda do Ano, Correspondências e Diário Calendário)
export async function obterRodaDoAno() {
  const resposta = await fetch(`${API_URL}/api/tematico/rodadoano`, {
    headers: { 'Authorization': `Bearer ${tokenUsuario}` }
  });
  return resposta.json();
}

export async function obterCorrespondencias() {
  const resposta = await fetch(`${API_URL}/api/tematico/correspondencias`, {
    headers: { 'Authorization': `Bearer ${tokenUsuario}` }
  });
  return resposta.json();
}

export async function obterDiarioCalendario() {
  const resposta = await fetch(`${API_URL}/api/tematico/diario`, {
    headers: { 'Authorization': `Bearer ${tokenUsuario}` }
  });
  return resposta.json();
}

export async function salvarEntradaDiario(dados) {
  const resposta = await fetch(`${API_URL}/api/tematico/diario`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${tokenUsuario}`
    },
    body: JSON.stringify(dados)
  });
  const resultado = await resposta.json();
  if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao salvar diário');
  return resultado;
}