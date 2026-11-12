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

ALTER TABLE rituais ADD COLUMN is_oficial BOOLEAN DEFAULT FALSE;

CREATE TABLE diario_calendario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  data_anotacao DATE NOT NULL,
  humor_energia VARCHAR(50),               -- Ex: Intuitivo, Calmo, Intenso
  fase_lunar VARCHAR(50),                  -- Ex: Crescente, Cheia
  anotacao TEXT NOT NULL,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE rodadoano (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome_festividade VARCHAR(100) NOT NULL, -- Ex: Samhain, Imbolc, Saturnália
  data_referencia VARCHAR(50) NOT NULL,    -- Ex: 31 de Outubro
  hemisferio VARCHAR(20) DEFAULT 'Sul',    -- Importante para bruxaria no Brasil/Portugal!
  descricao TEXT NOT NULL,
  correspondencias VARCHAR(255)            -- Ex: Abóboras, Velas Laranjas, Ancestrais
);