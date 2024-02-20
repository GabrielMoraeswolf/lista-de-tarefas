// models/tarefa.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Tarefa = sequelize.define('Tarefa', {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Tarefa;
};
