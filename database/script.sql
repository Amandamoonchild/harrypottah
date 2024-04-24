CREATE DATABASE harrypottah;

CREATE TABLE bruxo (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    idade INT,
    casa VARCHAR(100) NOT NULL,
    habilidade VARCHAR(100) NOT NULL,
    sangue VARCHAR(100) NOT NULL,
    patrono VARCHAR(100) NOT NULL
);

INSERT INTO bruxo (nome, idade, casa, habilidade, sangue, patrono) VALUES ('');