var express = require('express');
let Employee = require("../models/Employee");
let router = express.Router();

router.put("/", (req, res) => {
    let body = req.body;
    let employee = new Employee();

    employee.name = body.name;
    employee.email = body.email;
    employee.phoneno = body.phoneno;

    employee.save().then((result) => {
        res.send(JSON.stringify({ status: 'success', data: result }));
    }, (err) => {
        res.send(JSON.stringify({ status: 'failed', error: err }));
    })
});

router.post("/:id", async (req, res) => {
    let body = req.body;
    let employee = await Employee.findById(req.params.id);
    employee.name = body.name;
    employee.email = body.email;
    employee.phoneno = body.phoneno;

    employee.save().then((result) => {
        res.send(JSON.stringify({ status: "success", data: result }));
    }, (err) => {
        res.send(JSON.stringify({ status: "failed", err }));
    })
});

router.get("/", async (req, res) => {
    let data = await Employee.find();
    res.send(JSON.stringify({ status: "success", data: data }));
});

// delete from body
router.delete("/", async (req, res) => {
    let body = req.body;
    await Employee.findByIdAndDelete(body.id)
    res.send(JSON.stringify({ status: "success" }));
});

// delete from params(url)
// router.delete("/:id", async (req, res) => {
//     await Employee.findByIdAndDelete(req.params.id);
//     res.send(JSON.stringify({ status: "success" }));
// });

router.get("/:id", async (req, res) => {
    let data = await Employee.findById(req.params.id);
    res.end(JSON.stringify({ status: "success", data: data }));
})



module.exports = router;