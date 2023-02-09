let bcrypt = require('bcrypt');

let saltRounds = 10;    //Melange de plusieurs chaines de caracteres avec celles de base pour que le mdp soit introuvable(crypté)

let cryptPassword = async function(password) {
    let salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(password, salt)
}


let comparePassword = async function(plainPass, hashword) {
    let compare = bcrypt.compare(plainPass, hashword);
    return compare;
}


module.exports = {
    cryptPassword,
    comparePassword
};
