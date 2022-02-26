/* DROP DATABASE ControleGastos; */
CREATE DATABASE IF NOT EXISTS ControleGastos;
USE ControleGastos;

CREATE TABLE IF NOT EXISTS Usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(80) UNIQUE,
    senha VARCHAR(20) NOT NULL,
    nome VARCHAR(40) NOT NULL,
    sobrenome VARCHAR(40) NOT NULL,
    verificado BOOLEAN DEFAULT FALSE,
    trans_categorias BLOB,
    trans_tipos BLOB,
    pref_tema ENUM("Claro", "Escuro")
);

CREATE TABLE IF NOT EXISTS Transacoes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    dia DATE NOT NULL,
    categoria VARCHAR(30) NOT NULL,
    motivo VARCHAR(120) NOT NULL,
    tipo VARCHAR(30) NOT NULL,
    valor DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);



/* 
SELECT * FROM Usuarios;
SELECT * FROM Transacoes;

DESCRIBE Transacoes;

ALTER TABLE Transacoes MODIFY tipo VARCHAR(30) NOT NULL;

DELETE FROM Usuarios WHERE id=4;
DELETE FROM Transacoes WHERE id>0;

DROP TABLE Preferencias;

SELECT @@datadir;
*/




