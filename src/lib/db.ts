const { Sequelize } = require("sequelize");

// Configure the database connection
const sequelize = new Sequelize("mockusersdb", "neema", "neema", {
  host: "localhost", 
  dialect: "postgres", 
});

// Test the connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
