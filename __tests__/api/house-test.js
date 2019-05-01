const frisby = require('frisby');

const Joi = frisby.Joi;

it('should create a house', () => {
    return frisby
        .post('http://localhost:8000/api/houses', {
            name: 'Testinggg'
        })
        .expect('status',200)
        .expect('json','name','Testinggg')
        .expect('jsonTypes','id',Joi.number().required())
})

// it('should return 422 when using numbers in house name', () => {
//     return frisby
//         .post('http://localhost:8000/api/houses', {
//             name: 'Tang3002'
//         })
//         .expect('status',422)
//         .expect('json','name','Tang3002')
//         .expect('jsonTypes','id',Joi.number().required())
// })