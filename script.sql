CREATE USER 'Jacouille'@'localhost' IDENTIFIED BY 'Lafripouille';
GRANT ALL PRIVILEGES ON cive_lampus_db.* TO 'Jacouille'@'localhost' IDENTIFIED BY 'Lafripouille';

USE cive_lampus_db;

CREATE TABLE users(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    hashedPassword VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE details(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    userId INTEGER NOT NULL,
    age  INTEGER,
    address VARCHAR(100),
    phone VARCHAR(20),
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO users (firstName, lastName, email, hashedPassword, role) VALUES
('Alice', 'Martin', 'alice.martin@example.com', 'hashed_pw_1', 'student'),
('Bob', 'Dupont', 'bob.dupont@example.com', 'hashed_pw_2', 'teacher'),
('Claire', 'Lemoine', 'claire.lemoine@example.com', 'hashed_pw_3', 'student'),
('David', 'Moreau', 'david.moreau@example.com', 'hashed_pw_4', 'teacher'),
('Emma', 'Girard', 'emma.girard@example.com', 'hashed_pw_5', 'student'),
('François', 'Roux', 'francois.roux@example.com', 'hashed_pw_6', 'teacher'),
('Gabrielle', 'Baron', 'gabrielle.baron@example.com', 'hashed_pw_7', 'student'),
('Hugo', 'Renard', 'hugo.renard@example.com', 'hashed_pw_8', 'student'),
('Isabelle', 'Chevalier', 'isabelle.chevalier@example.com', 'hashed_pw_9', 'teacher'),
('Julien', 'Noir', 'julien.noir@example.com', 'hashed_pw_10', 'student');



