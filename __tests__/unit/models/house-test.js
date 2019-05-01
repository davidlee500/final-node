const {expect}=require('chai');
const House = require('../../../models/house');

it('should be all letters', async () => {
   try{
       let house = new House({name: '2'});
       await house.validate();
   } catch (error) {
       expect(error.errors[0].message).to.equal('Name must only contain letters')
   }
});

it('should have a name', async () => {
    try{
        let house = new House({name: ''});
        await house.validate();
    } catch (error) {
        expect(error.errors[0].message).to.equal('Name is required')
    }
 });

 it('should be at least 3 characters', async () => {
    try{
        let house = new House({name: 'ab'});
        await house.validate();
    } catch (error) {
        expect(error.errors[0].message).to.equal('Name must be between 3 and 15 characters')
    }
 });

 it('should be less than 15 characters', async () => {
    try{
        let house = new House({name: 'aadfadfasdfasdfasdfasdfasdfasdfaadfasf'});
        await house.validate();
    } catch (error) {
        expect(error.errors[0].message).to.equal('Name must be between 3 and 15 characters')
    }
 });