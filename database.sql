CREATE DATABASE IF NOT EXISTS `RH`;

USE `RH`;

CREATE TABLE Employe (
    id Int Auto_increment PRIMARY KEY NOT NULL,    
    nom varchar(255) NOT NULL,
    prenom varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    telephone varchar(255),
    poste varchar(255),
    salaire int,
    password varchar(255) NOT NULL
);

CREATE TABLE Absence (
    id Int auto_increment PRIMARY KEY NOT NULL,
    employe_id INT NOT NULL,
    date_debut date NOT NULL,
    date_fin date NOT NULL,
    duree INT NOT NULL,
    valide boolean NOT NULL DEFAULT FALSE
);