const app = require("./app");
require("dotenv").config();
const mongoose = require("mongoose");

const { PORT = 3000, DB_HOST, DB_NAME } = process.env;

mongoose.Promise = global.Promise;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .then(() => console.log(`Database (${DB_NAME}) connection successful`))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
