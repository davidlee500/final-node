const express = require('express');
const Sequelize = require('sequelize');
const bodyParser=require('body-parser');
const Character = require('./models/character');
const Actor = require('./models/actor');
const House = require('./models/house');

const Op = Sequelize.Op; 
const app = express();

// Parse Json request bodies
app.use(bodyParser.json());

//DEFINE RELATIONSHIPS
Character.belongsTo(House, {
    foreignKey: 'houseId'
});

// DELETE CHARACTERS
app.delete('/api/characters/:id', function(request,response){
    let id = request.params.id;

    Character
        .findByPk(id)
        .then((character) => {
            if (character) {
                return character.destroy();
            } else {
                return Promise.reject();
            } 
        })
        .then(() => {
            response.status(204).send();
        }, () => {
            response.status(404).send();
        });
});

// CREATE HOUSE
app.post('/api/houses', function(request, response){ 
    House.create({
        name: request.body.name
    }).then((house) => {
        response.json(house);
    }, (validation) => {
        response.status(422).json({
            errors: validation.errors.map((error) => {
                return {
                    attribute: error.path,
                    message: error.message
                }
            })
        });
    });
});

// EDIT HOUSE
app.patch('/api/houses/:id', function(request,response){
    let id = request.params.id;
    let updates = request.body;

    House.findByPk(id, {
        include: [Character]
    }).then((house) => {
        console.log(house);
        if (house){
            return house.update(updates);
        } else {
            return Promise.reject();
        }
    }).then((updatedHouse) => {
        //if update succeeds send status 200 and updated house
        response.json(updatedHouse);
        response.status(200).send();
    }, (validation) => {
        //if update fails return empty response and status 404
        response.status(422).json({
            errors: validation.errors.map((error) => {
                return{
                    attribute: error.path,
                    message: error.message
                };
            })
        });
    });
});

 // GET CHARACTERS
app.get('/api/characters',function(request, response){
    let filter = {};
    let q = request.query.q;

    if (q) {
        filter = {
            where: {
                name: {
                    [Op.like]: `${q}%`
                }
            }
        };
    }

    Character.findAll().then((characters)=>{
        response.json(characters);
    });
});

app.get('/api/characters/:id',function(request, response){
    let id = request.params.id;

    Character.findByPk(id, {
        include: [House]
    }).then((character) => {
        if(character){
            response.json(character);
        } else {
            response.status(404).send();
        }
    });
});

// Server setup
app.listen(process.env.port||8000);