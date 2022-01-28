DROP TABLE IF EXISTS auth;

DROP TABLE IF EXISTS items;

DROP TABLE IF EXISTS folders;

CREATE TABLE auth (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20),
    pwd VARCHAR(255)
);

INSERT INTO
    auth (username, pwd)
VALUES
    ('admin', 'admin');

CREATE TABLE folders (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    name VARCHAR(255)
);

INSERT INTO
    folders (userID, name)
VALUES
    (1, 'To-do');

CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userID INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(500),
    datetime TIMESTAMP NOT NULL,
    reminder INT,
    repeats VARCHAR(16),
    folder INT NOT NULL,
    finished BOOLEAN NOT NULL DEFAULT 0 
);

INSERT INTO
    items (userID, name, description, datetime, reminder, repeats, folder)
VALUES
    (1, 'First Item', 'Remind me to do shopping', now(), 0, 'none', 1);

SHOW TABLES;