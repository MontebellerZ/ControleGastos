/* DROP DATABASE ControleGastos; */
CREATE DATABASE IF NOT EXISTS ControleGastos;
USE ControleGastos;

CREATE TABLE IF NOT EXISTS Usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(80) UNIQUE,
    senha VARCHAR(20) NOT NULL,
    nome VARCHAR(40) NOT NULL,
    sobrenome VARCHAR(40) NOT NULL
);

CREATE TABLE IF NOT EXISTS Transacoes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    dia DATE NOT NULL,
    motivo VARCHAR(20) NOT NULL,
    objetivo VARCHAR(120) NOT NULL,
    tipo ENUM("Entrada", "Débito", "Crédito", "Transferência") NOT NULL,
    valor DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);

/* 
SELECT * FROM Usuarios;
SELECT * FROM Transacoes;

SHOW COLUMNS FROM Transacoes;

DELETE FROM Usuarios WHERE id>0;
DELETE FROM Transacoes WHERE id>0;

DROP TABLE Transacoes;

*/




