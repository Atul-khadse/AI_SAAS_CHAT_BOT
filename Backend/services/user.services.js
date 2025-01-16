const { use } = require('../app');
const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if(!firstname || !lastname || !email || !password){
        throw new Error('All firlds are require');
    }

    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}