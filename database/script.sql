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

INSERT INTO bruxo (nome, idade, casa, habilidade, sangue, patrono) VALUES ('Amanda', '17', 'Lufa-lufa', 'Animagia', 'Mestiço', 'lontra');

CREATE TABLE varinha (
    id SERIAL PRIMARY KEY,
    material VARCHAR(100) NOT NULL,
    comprimento  INT,
    nucleo VARCHAR(100) NOT NULL,
    madeIn DATE NOT NULL
);

INSERT INTO bruxo (material, comprimento, nucleo, madeIn) VALUES ('abeto', '25', 'Pêlo de Unicórnio', '2004-03-03');