const Validator = require("fastest-validator");
const db = require("../connection/connect");
require('dotenv').config();

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

async function login(req, res) {
    const user = {
        username: req.body.username,
        password: req.body.password
    };
    
    const schema = {
        username: {type: "string", optional: false, max: "100"},
        password: {type: "string", optional: false}
    };
    
    const v = new Validator();
    const validationResponse = v.validate(user, schema);
    
    if (validationResponse !== true) {
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }
    
    db.query(`SELECT *
              FROM USERS
              WHERE username = '${user.username}'`, async function (err, result) {
        if (err) {
            console.log(err);
        } else if(result.length) {
            const validPassword = await bcrypt.compare(user.password, result[0].password);
            if (validPassword) {
                const authtoken = jwt.sign(
                  {
                      user: {
                          id: result[0].id,
                          username: result[0].username
                      },
                  },
                  process.env.TOKEN_KEY,
                  {
                      expiresIn: "2h",
                  }
                );
                
                return res.status(200).json({ message: "login successful!", token: authtoken });
            } else {
                res.status(400).json({ message: "Invalid Password" });
            }
        } else{
            res.status(400).json({ message: "User not found!" });
        }
    });
}

async function register(req, res){
    const user= {
        username: req.body.username,
        password: req.body.password
    }
    const schema = {
        username: {type:"string", optional: false, max: "100"},
        password: {type:"string", optional: false, max: "20", min: "8"}
    }
    
    const v = new Validator();
    const validationResponse = v.validate(user, schema);
    
    if(validationResponse !== true){
        return res.status(400).json({
            message: "Validation failed",
            errors: validationResponse
        });
    }
    
    const salt = await bcrypt.genSalt(10);
    const passHash= await bcrypt.hash(user.password, salt);
    
    db.query(`SELECT * FROM USERS WHERE username= '${user.username}'`, function (err, result) {
        if (result.length) {
            return res.status(400).json({
                message: "User Already exists!",
            });
        } else{
            db.query(`INSERT INTO USERS(username,password) VALUES
                ('${user.username}', '${passHash}')`,
              function(err, result, fields) {
                  if (err){
                      console.log(err);
                      return res.status(400).json({
                          message: "Unknown Error!",
                      });
                  } else{
                      return res.status(200).json({ message: "Registration successful!"});
                  }
              });
        }
    });
}

module.exports = {
    login: login,
    register: register
}