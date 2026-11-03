CREATE DATABASE IF NOT EXISTS grimorium;
USE grimorium;

-- Tabela de Usuários (com níveis de acesso)
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  nivel ENUM('praticante', 'admin') DEFAULT 'praticante',
  criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Rituais / Grimório Pessoal
CREATE TABLE IF NOT EXISTS rituais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT,
  titulo VARCHAR(150) NOT NULL,
  categoria VARCHAR(100),
  conteudo TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);