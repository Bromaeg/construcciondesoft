DROP DATABASE masones_log;
CREATE DATABASE masones_log;
USE masones_log;

CREATE TABLE masones(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL
    );


INSERT INTO masones (username, password) VALUES ('mason', 'mason');

