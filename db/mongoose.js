const mongoose = require("mongoose");

// connecting to mongodb, it will create a database book-manager-api

mongoose.connect("mongodb://127.0.0.1:27017/book-manager-api", {
  useCreateIndex: true,
  useNewUrlParser: true,
});
