const mysql = require("mysql");

module.exports = connectDB = () => {
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "prison_db",
  });

  connection.connect();

  return connection;
};
