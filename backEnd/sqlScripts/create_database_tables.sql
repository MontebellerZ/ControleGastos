/* DROP DATABASE ControleGastos; */
CREATE DATABASE IF NOT EXISTS ControleGastos;
USE ControleGastos;

CREATE TABLE IF NOT EXISTS Usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(80) UNIQUE,
    senha VARCHAR(20) NOT NULL,
    nome VARCHAR(40) NOT NULL,
    sobrenome VARCHAR(40) NOT NULL,
    balanco DECIMAL(12,2),
    entrada DECIMAL(12,2),
    saida DECIMAL(12,2)
);

CREATE TABLE IF NOT EXISTS Gastos (
	id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    dia DATE NOT NULL,
    tipo ENUM("Salário", "Lazer", "Ganho", "Comida", "Necessidade", "Doação", "Outros") NOT NULL,
    objeto VARCHAR(120) NOT NULL,
    acao ENUM("Et", "Db", "Cr", "Tr", "Dp", "I+", "I-") NOT NULL,
    valor DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

/* 
SELECT * FROM Usuarios;
SELECT * FROM Contas;
SELECT * FROM Gastos;
*/




