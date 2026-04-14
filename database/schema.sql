-- PG Finder Database Schema
-- Database: pg_finder_db

CREATE TABLE pgs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    rent INT NOT NULL,
    deposit INT DEFAULT 0,
    gender ENUM('boys', 'girls', 'unisex') NOT NULL,
    food BOOLEAN DEFAULT 0,
    distance FLOAT NOT NULL,
    verified BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pg_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pg_id INT NOT NULL,
    photo_url VARCHAR(255) NOT NULL,
    FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE
);

CREATE TABLE reports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pg_id INT NOT NULL,
    reason TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pg_id) REFERENCES pgs(id) ON DELETE CASCADE
);
