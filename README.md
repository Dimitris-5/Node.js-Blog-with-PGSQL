This Node.js application is a simple book review management system built using Express.js for server-side logic, PostgreSQL as the database, and EJS as the templating engine. 
The application performs CRUD (Create, Read, Update, Delete) operations on books and their reviews, with the added functionality of fetching book cover images from an external API.

Key Features:
Express.js Setup:

Uses Express for routing and server-side logic.
Body-parser is used to parse incoming request bodies.
Serves static files from the "public" directory.
Database Connection:

Connects to a PostgreSQL database using the pg library.
Database credentials are provided to connect to the books_db database.
Fetching and Displaying Data:

Fetches a list of books and their reviews from the database.
Each book's ISBN is used to construct a URL for fetching book cover images from the Open Library Covers API.
The books and their associated cover images are rendered on the home page using the index.ejs template.
Routes:

GET /: Fetches and displays all books and their reviews along with cover images.
GET /new-review: Renders a form to add a new review.
GET /single/:id: Fetches and displays a single book and its review based on the book ID.
POST /add: Adds a new book and its review to the database.
POST /edit: Renders a form to edit an existing review.
POST /submit-update: Updates an existing review in the database.
POST /delete: Deletes a book and its associated review from the database.
Templates:

Uses EJS templates to render HTML pages.
index.ejs: Displays a list of books with their reviews and cover images.
single.ejs: Displays a single book and its review.
new-review.ejs: Form to add a new review.
edit.ejs: Form to edit an existing review.
Error Handling:

Uses try-catch blocks to handle errors during database operations and external API calls.
Logs errors to the console for debugging.
External API Integration:

Fetches book cover images from the Open Library Covers API using Axios.
Constructs the URL for each book cover image using the book's ISBN.
Server Configuration:

Listens on port 3000 for incoming requests.
This application demonstrates the use of Express.js for building a web application with dynamic content, PostgreSQL for data storage, and EJS for rendering views, integrating external APIs to enhance functionality.
