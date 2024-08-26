const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("hpc_test", "root", "", {
  host: "127.0.0.1",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const User = sequelize.define("users", {
  UserName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Job: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//Create
sequelize
  .sync()
  .then(() => {
    console.log("User table created successfully!");

    User.create({
      UserName: "Briar",
      Email: "Madio@gmail.com",
      Job: "Professional timewaster",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Failed to create a new record : ", error);
      });
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

//Read
sequelize
  .sync()
  .then(() => {
    Book.findAll()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

sequelize
  .sync()
  .then(() => {
    Book.findOne({
      where: {
        id: "1",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error("Failed to retrieve data : ", error);
      });
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

//Delete
sequelize
  .sync()
  .then(() => {
    Book.destroy({
      where: {
        id: 2,
      },
    })
      .then(() => {
        console.log("Successfully deleted record.");
      })
      .catch((error) => {
        console.error("Failed to delete record : ", error);
      });
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
