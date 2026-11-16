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

CREATE TABLE IF NOT EXISTS correspondencias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  intencao VARCHAR(50) NOT NULL, -- Ex: Proteção, Amor, Prosperidade, Intuição
  ervas VARCHAR(150) NOT NULL,
  cristais VARCHAR(150) NOT NULL,
  cores VARCHAR(100) NOT NULL,
  fase_lunar_ideal VARCHAR(50) NOT NULL
);

-- Populando a Roda do Ano (Hemisfério Sul)
TRUNCATE TABLE rodadoano;

INSERT INTO rodadoano (nome_festividade, data_referencia, hemisferio, descricao, correspondencias) VALUES
('Samhain', '30/04 - 01/05', 'Sul', 'Ano Novo das Bruxas. Momento em que o véu entre os mundos está mais fino, ideal para honrar ancestrais e encerrar ciclos.', 'Abóbora, romã, velas pretas e laranjas, obsidiana'),
('Yule (Solstício de Inverno)', '20/06 - 23/06', 'Sul', 'A noite mais longa do ano e o renascimento do Sol. Celebração de esperança, recolhimento e renovação interior.', 'Pinheiro, canela, cravo, velas verdes, vermelhas e douradas'),
('Imbolc', '01/08 - 02/08', 'Sul', 'Despertar da terra após o inverno. Festival do fogo sagrado, purificação, inspiração criativa e novos começos.', 'Alecrim, camomila, velas brancas, quartzo transparente'),
('Ostara (Equinócio de Primavera)', '22/09 - 23/09', 'Sul', 'Equilíbrio perfeito entre dia e noite. Celebração da fertilidade, florescimento de projetos e alegria.', 'Jasmim, lavanda, ovos pintados, quartzo rosa e citrino'),
('Beltane', '31/10 - 01/11', 'Sul', 'Auge da primavera, celebração da vida, paixão, criatividade e abundância na natureza.', 'Rosas, hibisco, mel, fogueiras, cornalina e esmeralda'),
('Litha (Solstício de Verão)', '21/12 - 22/12', 'Sul', 'O dia mais longo do ano. Ápice da energia solar, força vital, sucesso e gratidão.', 'Girassol, louro, hipericão, olho de tigre e pirita'),
('Lammas / Lughnasadh', '01/02 - 02/02', 'Sul', 'Primeira colheita do ano. Tempo de agradecer pelos frutos colhidos e compartilhar abundância.', 'Trigo, milho, pães artesanais, âmbar e aventurina'),
('Mabon (Equinócio de Outono)', '20/03 - 21/03', 'Sul', 'Segunda colheita e agradecimento. Momento de balanço pessoal, equilíbrio e preparação para o recolhimento.', 'Maçã, sálvia, folhas secas, ametista e lápis-lazúli');
-- Populando o Guia de Correspondências
INSERT INTO correspondencias (intencao, ervas, cristais, cores, fase_lunar_ideal) VALUES
('Proteção', 'Alecrim, Arruda, Sálvia, Espada-de-São-Jorge', 'Turmalina Negra, Obsidiana, Ônix', 'Preto, Branco, Azul Escuro', 'Lua Minguante'),
('Amor & Autoestima', 'Pétalas de Rosa, Hibisco, Lavanda, Canela', 'Quartzo Rosa, Rodonita, Esmeralda', 'Rosa, Vermelho, Verde', 'Lua Cheia'),
('Prosperidade', 'Louro, Manjericão, Canela, Camomila', 'Pirita, Citrino, Olho de Tigre', 'Dourado, Amarelo, Verde', 'Lua Crescente'),
('Intuição & Sonhos', 'Artemísia, Anis-Estrelado, Jasmim, Lavanda', 'Ametista, Pedra da Lua, Labradorita', 'Roxo, Lilás, Prata', 'Lua Cheia ou Nova');
