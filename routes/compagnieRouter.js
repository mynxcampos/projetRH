const express = require("express");
const compagnieModel = require("../models/compagnie.js");
const employeeModel = require("../models/employee.js");
const compagnieRouter = express.Router();
const routeGuard = require("../customDependances/authGuard");
const upload = require('../customDependances/multer')
const crypt = require('../customDependances/bcrypt.js')

// fonction asynchrone (qui ne s'execute pas en meme temps ) et derriere req (requete) , res (reponse)//

compagnieRouter.post("/addCompagnie", async (req, res) => {
  try {

    req.body.password = await crypt.cryptPassword(req.body.password)
    let newCompagnie = new compagnieModel(req.body);
    newCompagnie.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});



compagnieRouter.get("/", async (req, res) => {
  try {
    res.render("login.twig");
  } catch (err) {
    console.log(err);
  }
});

compagnieRouter.get('/addcompagnie', async (req, res) => {
  try {
    res.render("addcompagnie.twig");
  } catch (err) {
    console.log(err);
  }

});

compagnieRouter.post('/login', async (req, res) => {
  try {
    let compagnie = await compagnieModel.findOne({ mail: req.body.mail});
    if (compagnie) {
      if (await crypt.comparePassword(req.body.password, compagnie.password)) {
        req.session.compagnieId = compagnie._id
        res.redirect('/employee')
     } else {
        res.redirect('/')
     }

    } else {
      res.redirect('/')
    }

  } catch (err) {
    console.log(err);
  }
});














// route pour avoir acces a ma page projet
// projetRouter.get("/addProject",routeGuard, async (req, res) => {
//   try {
//     res.render("addProject.twig");
//   } catch (error) {
//     res.send(error);
//   }
// });

module.exports = compagnieRouter;