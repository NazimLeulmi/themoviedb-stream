USE themoviedb;
CREATE TABLE users(
    email VARCHAR(150) NOT NULL PRIMARY KEY UNIQUE,
    password VARCHAR(150) NOT NULL,
    token VARCHAR(150) NOT NULL, -- confirmation token
    confirmed TINYINT DEFAULT "0",
    first_login TINYINT DEFAULT "1",
    plan VARCHAR(10) NOT NULL DEFAULT 'free'
);
CREATE TABLE sessions(
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    token VARCHAR(150) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email)
    ON DELETE CASCADE ON UPDATE CASCADE
);
