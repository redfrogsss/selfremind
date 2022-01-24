DROP TABLE IF EXISTS auth;

CREATE TABLE auth (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20),
    pwd VARCHAR(255)
);

INSERT INTO
    auth (username, pwd)
VALUES
    ('admin', 'admin');

SHOW TABLES;