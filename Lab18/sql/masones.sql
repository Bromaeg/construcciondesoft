/* Base de datos de los masones */
/* Tabla de los masones */

CREATE DATABASE IF NOT EXISTS masones;
USE masones;

CREATE TABLE IF NOT EXISTS masones (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);

/* Insertamos los datos de los masones */

INSERT INTO masones (username, password) VALUES ('mason', 'mason');