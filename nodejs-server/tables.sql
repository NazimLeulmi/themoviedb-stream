USE themoviedb;
CREATE TABLE users(
    email VARCHAR(150) NOT NULL PRIMARY KEY UNIQUE,
    password VARCHAR(150) NOT NULL,
    token VARCHAR(150) NOT NULL, -- confirmation token
    confirmed TINYINT DEFAULT 0, 
    firstLogin TINYINT DEFAULT 1,
    plan TINYINT NOT NULL DEFAULT 0,
    subscription VARCHAR(150) DEFAULT "free" -- stripe subscription id
);
CREATE TABLE sessions(
    token VARCHAR(150) NOT NULL PRIMARY KEY UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    email VARCHAR(150) NOT NULL,
    FOREIGN KEY (email) REFERENCES users(email)
    ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE movies(
    title VARCHAR(150) NOT NULL PRIMARY KEY UNIQUE,
    releaseDate VARCHAR(150) NOT NULL,
    poster VARCHAR(150) NOT NULL,
    rating INT NOT NULL DEFAULT 0
);
-- Junction / Joining table for a many to many relationship
CREATE TABLE user_movies(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT UNIQUE,
    user VARCHAR(150) NOT NULL,
    movie VARCHAR(150) NOT NULL,
    FOREIGN KEY (user) REFERENCES users(email)
    ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (movie) REFERENCES movies(title)
    ON DELETE CASCADE ON UPDATE CASCADE
);

