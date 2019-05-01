const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('actor',{
    id: {
        field: 'actorId',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: 'actorName',
        type: Sequelize.STRING
    },
    age: {
        field: 'age',
        type: Sequelize.INTEGER
    },
}, {
    timestamps:false
});