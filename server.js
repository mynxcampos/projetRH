const express = require('express');
const mongoose = require('mongoose');
const compagnieRouter = require ('./routes/compagnieRouter');
const employeeRouter = require ('./routes/employeeRouter');
require('dotenv').config();
const session = require('express-session');

const db = process.env.BDD_URL //path bdd a mettre ici
const app = express()


//BIEN RESPECTER L ORDRE POUR NE PAS AVOIR D ERREURS D AFFICHAGE//

app.use(session({secret: "test",saveUninitialized: true,resave: true}));
app.use(express.static('./assets')); 
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(compagnieRouter)
app.use(employeeRouter)



app.listen(3000,(err)=>{
    if (err) {
       console.log(err); 
    }else{
        console.log('Je suis connecté');
    }
})
mongoose.set('strictQuery', false);
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("connecter a la bdd");
    }
})