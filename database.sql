CREATE DATABASE IF NOT EXISTS `RH`;

USE `RH`;

CREATE TABLE Employe (
    id Int Auto_increment PRIMARY KEY NOT NULL,    
    nom varchar(255) NOT NULL,
    prenom varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    telephone varchar(255),
    poste varchar(255),
    salaire int
);