CREATE TABLE books (
    ID SERIAL PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL
);

INSERT INTO books (author, title)
VALUES  ('J.K. Rowling', 'Harry Potter');

DROP TABLE foods;

CREATE TABLE foods (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT,
    units VARCHAR(255),
    storageCategory VARCHAR(255),
    expiry DATE,
    icon VARCHAR(128),
    userId INT
);

INSERT INTO foods (name, quantity, units, storageCategory, expiry, icon, userId)
VALUES ('egg', 1, 'carton', 'fridge', '10/30/1995', './dairy/eggs.svg', 0);

INSERT INTO foods (name, quantity, units, storageCategory, expiry, icon, userId)
VALUES ('tomatoes', 2, 'jar', 'fridge', '10/30/1995', './vegetable/tomato.svg', 0);