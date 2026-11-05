// Se estiver rodando na Web, usa localhost; caso contrário, usa o IP da sua máquina
const API_URL = 'http://localhost:3000';

export async function cadastrarUsuario(dados) {
  try {
    const resposta = await fetch(`${API_URL}/api/auth/cadastrar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });
    
    const resultado = await resposta.json();
    if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao cadastrar');
    return resultado;
  } catch (error) {
    throw error;
  }
}

export async function logarUsuario(dados) {
  try {
    const resposta = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();
    if (!resposta.ok) throw new Error(resultado.erro || 'Erro ao fazer login');
    return resultado;
  } catch (error) {
    throw error;
  }
}