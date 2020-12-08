const mongoose = require("mongoose");

//Books model

const Book = mongoose.model("Book", {
  name: {
    type: "string",
  },
  price: {
    type: "number",
  },
});

module.exports = Book;
