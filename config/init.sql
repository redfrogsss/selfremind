DROP TABLE IF EXISTS auth;
DROP TABLE IF EXISTS items;

CREATE TABLE auth (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20),
    pwd VARCHAR(255)
);

INSERT INTO
    auth (username, pwd)
VALUES
    ('admin', 'admin');

CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    name VARCHAR(255),
    description VARCHAR(500),
    datetime TIMESTAMP,
    reminder INT,
    repeats VARCHAR(16),
    folder VARCHAR(255),
    finished BOOLEAN
);

SHOW TABLES;