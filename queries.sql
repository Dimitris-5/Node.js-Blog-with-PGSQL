CREATE DATABASE books_db;

CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  publication_date DATE,
  genre VARCHAR(255),
  isbn VARCHAR(13)
);

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  book_id INTEGER NOT NULL,
  review_text TEXT,
  rating INTEGER,
  review_date DATE DEFAULT CURRENT_DATE,
  FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
);

INSERT INTO books (title, author, publication_date, genre, isbn) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '1925-04-10', 'Fiction', '7540766212'),
('1984', 'George Orwell', '1949-06-08', 'Dystopian', '1782124209'),
('To Kill a Mockingbird', 'Harper Lee', '1960-07-11', 'Fiction', '1439550417');

INSERT INTO reviews (book_id, review_text, rating) VALUES
(1, 'A fascinating glimpse into the Roaring Twenties.', 5),
(2, 'A chilling dystopian novel that remains relevant today.', 4),
(3, 'A powerful exploration of race and justice in America.', 5);
