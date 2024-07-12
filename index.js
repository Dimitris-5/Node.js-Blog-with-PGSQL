import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://covers.openlibrary.org/b/isbn/";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "books_db",
  password: "Postgres44!!",
  port: 5433,
});
db.connect();

let books = [];

app.get("/", async (req, res) => {
  try {
    const blog_result = await db.query("SELECT b.book_id, b.title, b.author, b.publication_date, b.genre, b.isbn,r.review_text, r.rating, r.review_date FROM books b LEFT JOIN reviews r ON b.book_id = r.book_id;");
    books = blog_result.rows;
    const isbns = books.map(book => book.isbn);
    // var posters=[];
    // for(let isbn of isbns){
    //   var response = await axios.get(API_URL + isbn +"-L");
    //   posters = response.data;
    // }
    // console.log(posters);    
    
    const posters = books.map(book => `${API_URL}${book.isbn}-L.jpg`);

    // Add posters to each book object
    books.forEach((book, index) => {
      book.poster = posters[index];
    });

    res.render("index.ejs", {
      bookslist: books
    });
  } catch (err) {
    console.log(err);
  }
});


app.get("/new-review", (req, res) => {
  res.render("new-review.ejs");
});

app.get('/single/:id?', async (req, res) => {
  try {
    const id = req.params.id;
    const single_result = await db.query("SELECT b.book_id, b.title, b.author, b.publication_date, b.genre, b.isbn, r.review_text, r.rating,  r.review_date FROM books b LEFT JOIN reviews r ON b.book_id = r.book_id WHERE b.book_id = $1;", [id]);
    let book = single_result.rows[0];
    let poster = `${API_URL}${book.isbn}-L.jpg`;
    book.poster = poster;
    res.render('single.ejs', {single_book: book});
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const book_title = req.body.b_title;
  const author = req.body.b_author;
  const genre = req.body.b_genre;
  const p_date = req.body.b_date;
  const isbn = req.body.isbn;
  const review = req.body.review;
  const rating = req.body.rating;
  try{
  const book_result = await db.query(
    "INSERT INTO books (title, author, publication_date, genre, isbn) VALUES($1, $2, $3, $4, $5) RETURNING *;",
    [book_title, author, p_date, genre, isbn]
  );
  const bookId = book_result.rows[0].book_id;
  const insert_review = await db.query(
    "INSERT INTO reviews (book_id, review_text, rating) VALUES ($1, $2, $3);",
    [bookId, review, rating]
  );
  res.redirect("/");
}catch(err){
  console.log(err);
}
});

app.post("/edit", async (req, res) => {
  try {
  var up_id = req.body["id"];
  const single_result = await db.query("SELECT b.book_id, b.title, b.author, b.publication_date, b.genre, r.review_text, r.rating,  r.review_date FROM books b LEFT JOIN reviews r ON b.book_id = r.book_id WHERE b.book_id = $1;", [up_id]);
  let edit_book = single_result.rows[0];
  res.render('edit.ejs', {book: edit_book});
  } catch (err) {
    console.log(err);
  }
});

app.post("/submit-update", async (req, res) => {
  var b_id = req.body.id;
  var b_review = req.body.review;
  var b_rating = req.body.rating;
  try {
    await db.query(`
      UPDATE reviews 
      SET review_text = $1, rating = $2
       WHERE book_id = $3
       `, [b_review, b_rating, b_id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});


app.post("/delete", async (req, res) => {
  const id = req.body.deleteItemId;
  try {
    await db.query("DELETE FROM books WHERE book_id = $1", [id]);
    await db.query("DELETE FROM reviews WHERE book_id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
