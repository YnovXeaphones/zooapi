const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Zoo', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });
};
