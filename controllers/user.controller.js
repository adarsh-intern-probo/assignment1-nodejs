const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


/*------- Function for SignUp of a user ------*/
function signUp(req,res){

    bcryptjs.genSalt(10,function(err,salt){

        models.User.findOne({where : {email : req.body.email}}).then(result => {
            if(result){
                res.status(409).json({
                    message : "Email already exists",
                })
            } else {
                bcryptjs.hash(req.body.password,salt,function(err,hash){
                    const user = {
                        firstname : req.body.firstname,
                        lastname : req.body.lastname,
                        password : hash,
                        email : req.body.email,
                        phone : req.body.phone
                    }
                
                    models.User.create(user).then(result => {
                        res.status(201).json({
                            message : "User created Successfully",
                        })
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({
                            message : "Something went wrong!",
                        });
                    });
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                message : "Something went wrong!",
            });
        }); 
    });
}

/*------- Function for Login of a user ------*/
function login(req,res) {
    models.User.findOne({where:{email : req.body.email}}).then(user => {
          if(user === null){
            res.status(401).json({
                message : "Invalid credentials!"
            })
          } else {
            //hasing the password
            bcryptjs.compare(req.body.password,user.password,function(err,result){
                if(result){
                    const token = jwt.sign({
                        email : user.email,
                        userId : user.id,
                    },'secret', function(err,token) {
                        res.status(200).json({
                            message : "Authentication Successfull",
                            token : token
                        });
                    });
                } else {
                    res.status(401).json({
                        message : "Invalid credentials!"
                    })
                }
            })
          }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message : "Something went wrong!",
        });
    });
}

/*------- Function for Getting all users ------*/
function showAll(req,res){
    models.User.findAll().then(result => {
        res.status(200).json(result);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message : "Something went wrong!",
        });
    });
}

/*------- Function for Getting single user ------*/
function show(req,res){
    const id = req.params.id;
    models.User.findByPk(id).then(result => {
        // console.log(result);
        res.status(200).json(result);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message : "Something went wrong!",
        });
    });
}

/*------- Function for Deleting a user ------*/
function deleteUser(req,res){

    const id = req.params.id;

    models.User.destroy({where : {id: id}}).then(result => {
        res.status(200).json({
            message : "User deleted successfully",
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message : "Something went wrong!",
        });
    });
}

/*------- Function for Updating details of a user ------*/
function update(req,res) {
    const id = req.params.id;
    const newData = {
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        password : req.body.password,
        email : req.body.email,
        phone : req.body.phone
    }
    bcryptjs.genSalt(10,function(err,salt){
        models.User.findOne({where: {id : id}}).then(result => {
            if(newData.email !== result.email){
                res.status(500).json({
                    message : "Email cannot be changed!",
                });
            } else {
                //hasing the new password
                bcryptjs.hash(req.body.password,salt,function(err,hash){
                    const user = {
                        firstname : newData.firstname,
                        lastname : newData.lastname,
                        password : hash,
                        email : newData.email,
                        phone : newData.phone
                    }
                
                    models.User.update(user, {where:{id:id}}).then(result => {
                        res.status(201).json({
                            message : "User details updated Successfully",
                        })
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({
                            message : "Something went wrong!",
                        });
                    });
                });
            }
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                message : "Something went wrong!",
            });
        });
    });
}

module.exports = {
    signUp : signUp,
    login : login,
    getUsers : showAll,
    delete : deleteUser,
    update : update,
    show : show
}