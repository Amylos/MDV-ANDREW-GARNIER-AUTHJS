CREATE USER 'Jacouille'@'localhost' IDENTIFIED BY 'Lafripouille';
GRANT ALL PRIVILEGES ON cive_lampus_db.* TO 'Jacouille'@'localhost' IDENTIFIED BY 'Lafripouille';

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

