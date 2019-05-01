const frisby = require('frisby');

const Joi = frisby.Joi;

// TESTING GET HAPPY
it('should return a status of 200 when specific character is found', () => {
    return frisby
    .get('http://localhost:8000/api/characters/5')
    .expect('status',200);
})

// TESTING GET NOT HAPPY
it('should return a status of 404 when specific character is not found', () => {
    return frisby
    .get('http://localhost:8000/api/characters/-1')
    .expect('status',404);
})

// TESTING GET RETURNS CORRECT PERSON
it('should return the character name', () => {
    return frisby
        .get('http://localhost:8000/api/characters/2')
        .expect('json','name','Robert Baratheon')
})

// TESTING DELETE NOT HAPPY
it('should return a 404 when deleting character that doesnt exist', () => {
    return frisby
        .del('http://localhost:8000/api/characters/-1')
        .expect('status',404);
})

// TESTING DELETE HAPPY
it('should return a 204 when deleting character that exists', () => {
    return frisby
        .del('http://localhost:8000/api/characters/7')
        .expect('status',204);
})
