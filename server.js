const app = require('./app')
const connectDB = require('./connections');
require('dotenv').config();
const HOST = process.env.DB_HOST;

connectDB.mongoose
  .connect(HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running. Use our API on port: 3000DB");
    });
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

