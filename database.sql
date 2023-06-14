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
    password varchar(255) NOT NULL,
    jours int not null,
    role varchar(255) NOT NULL
);

CREATE TABLE Absence (
    id Int auto_increment PRIMARY KEY NOT NULL,
    employe_id INT NOT NULL,
    date_debut date NOT NULL,
    date_fin date NOT NULL,
    duree INT NOT NULL,
    valide boolean NOT NULL DEFAULT FALSE,
    FOREIGN KEY (employe_id) REFERENCES Employe (id)
);

CREATE TABLE Token (
    employe_id INT NOT NULL,
    token varchar(255) NOT NUll,
    FOREIGN KEY (employe_id) REFERENCES Employe (id)
);

INSERT INTO `employe` (`id`, `nom`, `prenom`, `email`, `telephone`, `poste`, `salaire`, `password`, `jours`, `role`) VALUES (NULL, 'admin', 'admin', 'admin', NULL, NULL, NULL, '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', '30', 'rh');