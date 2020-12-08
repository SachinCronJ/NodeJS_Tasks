// Please follow below steps to start the server
// 1. npm install (to install the required dependencies)
// 2. npm start app.js 



// include './db/mongoose', so that connection can be established between server and mongodb
require("./db/mongoose");

// including books model so that we can perform CRUD operations on books model
const Book = require("./db/models/books");

//importing express for staring server
const express = require("express");

const app = express();

// we can tell the express to recieve data as json
app.use(express.json());

// adding book to books model
// endpoint - POST 127.0.0.1:3000/books with data {"name": "book1", "price": 11}

app.post("/books", (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then(() => {
      res.send(book);
    })
    .catch(() => {
      res.status(500).send("Error");
    });
});

// fetch all books from collection
// GET 127.0.0.1:3000/books

app.get("/books", (req, res) => {
  Book.find({})
    .then((books) => {
      res.send(books);
    })
    .catch((e) => {
      res.status(404).send();
    });
});

// fetch books by ID from collection
// GET 127.0.0.1:3000/books/:id

app.get("/books/:id", (req, res) => {
  const _id = req.params.id;
  Book.findById(_id).then((book) => {
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  });
});

// update any book by ID
// endpoint - PUT 127.0.0.1:3000/books/:id with data {"name": "book2", "price": 12}

app.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (e) {
    res.status(404).send();
  }
});

// delete book by ID
// DELETE 127.0.0.1:3000/books/:id

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (e) {
    res.status(500).send();
  }
});

//server listening on port 3000

app.listen(3000, () => {
  console.log("Server is Running");
});
