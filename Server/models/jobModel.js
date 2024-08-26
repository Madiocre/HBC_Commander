const { DataTypes } = require("sequelize");

const Job = sequelize.define("Job", {
  JobID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  JobTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Job.belongsTo(User, {
  foreignKey: "UserID",
  as: "user",
});

module.exports = Job;