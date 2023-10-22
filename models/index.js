import { Sequelize } from "sequelize";
import User from "./User.js"
const sequelize = new Sequelize("socialmedia", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("DB connection has been established successfully.");
  })
  .catch((err) => {
    console.log("Unable to connect to the database: ", err);
  });
  sequelize.sync({force: false});


const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.user = User(sequelize, Sequelize);
export default db;