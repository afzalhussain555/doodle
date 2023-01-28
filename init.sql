CREATE DATABASE IF NOT EXISTS doodle;
USE doodle;
CREATE TABLE User (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL
);

CREATE TABLE Product (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255),
  quantity INT
);

CREATE TABLE `Order` (
  id VARCHAR(50) KEY,
  product_id VARCHAR(50) NOT NULL,
  user_id VARCHAR(50) NOT NULL,
  quantity INT,
  FOREIGN KEY (product_id) REFERENCES Product(id),
  FOREIGN KEY (user_id) REFERENCES User(id)
);


INSERT INTO Product (id, name, quantity) VALUES ("PRD1", 'Product 1', 10);
INSERT INTO Product (id, name, quantity) VALUES ("PRD2", 'Product 2', 20);
INSERT INTO Product (id, name, quantity) VALUES ("PRD3", 'Product 3', 30);