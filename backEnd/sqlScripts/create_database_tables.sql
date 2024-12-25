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
    pref_tema ENUM("Claro", "Escuro") DEFAULT "Claro"
);

CREATE TABLE IF NOT EXISTS Transacoes (
	id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    dia DATE NOT NULL,
    categoria VARCHAR(30) NOT NULL,
    motivo VARCHAR(120) NOT NULL,
    tipo ENUM("Entrada", "Credito", "Debito") NOT NULL DEFAULT "Entrada",
    valor DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(id)
);



/* 
SELECT * FROM Usuarios;
SELECT * FROM Transacoes;

DESCRIBE Transacoes;

ALTER TABLE Transacoes MODIFY tipo ENUM("Entrada", "Credito", "Debito") NOT NULL DEFAULT "Entrada";
ALTER TABLE Usuarios DROP COLUMN trans_tipos;

DELETE FROM Usuarios WHERE id=4;
DELETE FROM Transacoes WHERE id>0;

DROP TABLE Transacoes;

SELECT @@datadir;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
FLUSH PRIVILEGES;
SET SQL_SAFE_UPDATES = 1;
*/



