const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Cage', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zooId: {
      type: DataTypes.STRING,
      references: {
        model: 'Zoos',
        key: 'id'
      }
    }
  });
};

