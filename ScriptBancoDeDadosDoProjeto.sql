CREATE DATABASE dbApiProdutos;

-- Uso do Banco de Dados
USE dbApiProdutos;

-- Criação da Tabela 'usuarios'
CREATE TABLE usuarios (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Email VARCHAR(255) NOT NULL,
    Senha VARCHAR(255) NOT NULL,
    Foto TEXT,
    DescricaoPerfil VARCHAR(255),
    Empresa VARCHAR(255)
);

-- Criação da Tabela 'produtos'
CREATE TABLE produtos (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Image TEXT,
    Produto VARCHAR(255) NOT NULL,
    Descricao VARCHAR(255),
    Valor FLOAT,
    IdUsuario INT,
    FOREIGN KEY (IdUsuario) REFERENCES usuarios(Id)
);

-- Consultar tabelas : 

SELECT * FROM produtos;
SELECT * FROM usuarios