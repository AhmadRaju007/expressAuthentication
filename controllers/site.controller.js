const Validator = require('fastest-validator');
const db= require('../connection/connect');

function save(req, res){
    const site= {
        name: req.body.name,
        jurisdiction: req.body.jurisdiction,
        description: req.body.description,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
    }
    const schema = {
        name: {type:"string", optional: false, max: "100"},
        jurisdiction: {type:"string", optional: false, max: "100"},
        description: {type: "string", optional: true, max: "500"},
        latitude: {type: "string", optional: false},
        longitude: {type: "string", optional: false}
    }

    const v = new Validator();
    const validationResponse = v.validate(site, schema);

    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }


    db.promise().query('INSERT INTO SITES(name,jurisdiction,description,latitude,longitude) SET ?', site, function(err, result, fields) {
        if (err){
            console.log(err);
            // handle erroraa
        }else{
            // Your row is inserted you can view
            console.log(result.insertId);
            res.status(201).send({msg: "success"});
        }
    });

}


module.exports = {
    save: save
}