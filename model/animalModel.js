const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Animal', {
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
    specie: {
      type: DataTypes.STRING,
      allowNull: false
    },
    diet: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cages',
        key: 'id'
      }
    }
  }, {
    timestamps: false
  });
};
