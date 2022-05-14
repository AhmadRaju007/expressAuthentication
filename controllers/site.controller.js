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
  
  //Insert data into sites
  db.query(`INSERT INTO SITES(name,jurisdiction,description,latitude,longitude) VALUES
     ('${site.name}', '${site.jurisdiction}', '${site.description}', '${site.latitude}', '${site.longitude}')`,
    function(err, result) {
      if (err){
        console.log(err);
        // handle erroraa
      }else{
        // Insert data in logs table
        const siteId = result.insertId;
        const userName = req.user.username;
        db.query(`INSERT INTO LOGS(username,site_id,operation) VALUES
           ('${userName}', '${siteId}', 'CREATE')`,
          function(err, result, fields) {
              if (err) {
                  console.log(err);
                  res.status(201).send({message: err});
              } else {
                  res.status(201).send({message: "Successfully Created!", siteId: siteId});
              }
          });
      }
  });

}

function details(req, res){
  const siteId= req.params.siteId;
  
  db.query(`SELECT * FROM SITES WHERE SITES.id = '${siteId}'`, async function (err, result) {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err });
    } else if(result.length) {
      const site= result[0];
      db.query(`SELECT id, username, operation, unix_timestamp(createdAt) as created_at FROM LOGS WHERE LOGS.site_id = '${siteId}'`, async function (err, result) {
        if (err) {
          console.log(err);
          res.status(400).json({ message: err });
        } else{
          return res.status(200).json({ message: "success", site, logs: result });
        }
      });
    } else {
      res.status(400).json({ message: "Invalid Site ID!" });
    }
  });
  
}
module.exports = {
  save: save,
  details: details
}