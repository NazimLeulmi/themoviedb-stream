USE themoviedb;
CREATE TABLE users(
    email VARCHAR(150) NOT NULL PRIMARY KEY UNIQUE,
    token VARCHAR(150) NOT NULL, -- confirmation token
    confirmed TINYINT DEFAULT "0",
    password VARCHAR(150) NOT NULL
);
CREATE TABLE sessions(
    token VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email)
    ON DELETE CASCADE ON UPDATE CASCADE
);
