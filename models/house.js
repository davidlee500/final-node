const sequelize = require('./../database/sequelize');
const Sequelize = require('sequelize');

module.exports = sequelize.define('house',{
    id: {
        field: 'houseId',
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: 'houseName',
        type: Sequelize.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: 'Name is required'
            },
            isAlpha: {
                args: true,
                msg: 'Name must contain letters'
            }
        }
    },
    words: {
        field: 'words',
        type: Sequelize.STRING
    },
}, {
    timestamps:false
});