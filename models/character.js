const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('character',{
    id: {
        field: 'characterId',
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name: {
        field: 'name',
        type: Sequelize.STRING,
    },
    gender: {
        field: 'gender',
        type: Sequelize.STRING
    },
    houseId:{
        field: 'houseId',
        type: Sequelize.INTEGER
    }
}, {
     timestamps:false
});