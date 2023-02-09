const express = require("express");
const compagnieModel = require("../models/compagnie.js");
const employeeModel = require("../models/employee.js");
const employeeRouter = express.Router();
const routeGuard = require("../customDependances/authGuard");
const upload = require('../customDependances/multer');

employeeRouter.get('/employee', async (req, res) => {
    try {
        let compagnie = await compagnieModel.findOne({ _id: req.session.compagnieId }).populate("employees")
        console.log(compagnie);
        let employees = compagnie.employees
        res.render("employee.twig", {
            employees: employees
        });


    } catch (err) {
        console.log(err);
    }

});


employeeRouter.get('/addemployee', async (req, res) => {
    try {
        res.render("addemployee.twig");
    } catch (err) {
        console.log(err);
    }

});

employeeRouter.post("/addemployee", upload.single('photo'), async (req, res) => {
    try {
        if (req.file) {
            req.body.photo = req.file.filename
        }
        let newemployee = new employeeModel(req.body);
        newemployee.save();
        await compagnieModel.updateOne({_id: req.session.compagnieId}, {$push: { employees: newemployee._id}});
        res.redirect("/employee");
    } catch (err) {
        console.log(err);
    }
});

employeeRouter.get('/delete/:id', async (req, res) => {
    try {
       await employeeModel.deleteOne({_id: req.params.id});
       res.redirect("/employee")
    } catch (err) {
        console.log(err);
    }

});

employeeRouter.post('/edit/:id', upload.single('photo'), async (req, res) => {
    try {
if (req.file) {
    req.body.photo = req.file.filename
}

       await employeeModel.updateOne({_id: req.params.id},req.body);
       res.redirect("/employee")
    } catch (err) {
        console.log(err);
    }

});

employeeRouter.get('/edit/:id', async (req, res) => {
    try {
        res.render("editemployee.twig", {
            id: req.params.id
        });
    } catch (err) {
        console.log(err);
    }

});

employeeRouter.get('/blame/:id', async (req, res) => {
    try {
        let employee = await employeeModel.findOne({ _id: req.params.id });
        employee.blame++
        if (employee.blame>=3) {
            res.redirect("/delete/"+req.params.id)
        } else{
            await employeeModel.updateOne({_id: req.params.id}, employee);
         res.redirect("/employee");   
        }
        
    } catch (err) {
        console.log(err);
    }

});

module.exports = employeeRouter;