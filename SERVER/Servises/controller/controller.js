const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;
const vacations = db.vacations;
const follower = db.follower;
const File = require('../controller/file.controller');

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    // Save User to Database
    console.log("application/json");
    console.log("Processing func -> SignUp");
    console.log(req.body);

    User.create({
        name: req.body.name,
        username: req.body.username,
        lname: req.body.lname,
        password: req.body.password,
        roles: req.body.roles,

    }).then(user => {
        Role.findAll({
            where: {
                name: {
                    [Op.or]: req.body.roles
                }
            }
        }).then(roles => {
            user.setRoles(roles).then(() => {
                res.send("User registered successfully!");
            });

        }).catch(err => {
            res.status(500).send("Error -> " + err);
        });
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
    console.log("finish signUp");
}

exports.signin = (req, res) => {
    console.log("Sign-In");
    console.log(req.body);
    console.log('body.username', req.body.username)
    console.log('body.password', req.body.password)

    User.findOne({
        where: {
            username: req.body.username
        },
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]

    }).then(user => {
        if (!user) {
            return res.status(405).send('User Not Found.');
        }
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).send({
            auth: true, accessToken: token,
            "user": user,

        });
        console.log(req.body.username, { auth: true, accessToken: token });
        console.log(">>>>>>>>Sign-In Sucsess")
    }).catch(err => {
        res.status(500).send('Error -> ' + err);
    });
}

exports.userContent = (req, res) => {
    console.log("User-Content");
    console.log(req.body);
    User.findOne({
        where: {
            id: req.body.id
        },
        attributes: ['name', 'username'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "User Content Page",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access User Page",
            "error": err
        });
    })
}

exports.adminBoard = (req, res) => {
    User.findOne({
        where: { id: req.userId },
        attributes: ['name', 'username',],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "Admin Board",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access Admin Board",
            "error": err
        });
    })
}

exports.adminSendFile = (body, file, File) => {
    let image = file.name;

    console.log(File, '>>>>>>>>>>>>>>File>>>>>>>>>>>>>>>>sdfsdfsdfsdfsdf');

    let { description, destination, fromDate, toDate, price } = body;
    return uploadSql = new Promise((resolve, reject) => {
        resolve(vacations.create({
            description: description,
            destination: destination,
            fromDate: fromDate,
            toDate: toDate,
            price: price,
            img: image,
            // imgPath: filePath,
        }));
    });

};

exports.adminDelete = (req, res) => {
    let id = req.params.id
    console.log('vacationI =', id);
    res.send('Deleted successfully =' + id)
    vacations.destroy({
        where: {
            id: id //this will be your id that you want to delete
        }
    }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
        if (rowDeleted === 1) {
            console.log('Deleted successfully');
            res.send('Deleted successfully')
        }
    }, function (err) {
        console.log(err);
        res.status(500).send('Error -> ' + err);
    });

}
exports.adminChangeVacation = (req, res) => {
    console.log(req.body, 'req.body===Newput');
    let body = req.body
    let { description, destination, fromDate, toDate, price } = body;

    vacations.update({
        description: description,
        destination: destination,
        fromDate: fromDate,
        toDate: toDate,
        price: price,
    }, {
        where: { id: id }
    }).success(res =>
        handleResult(res),
        res.send(res, 'PUT successfully')
    ).error(err =>
        console.log(err),
        res.status(500).send('Error -> ' + err)
    )
}

exports.managementBoard = (req, res) => {
    User.findOne({
        where: { id: req.userId },
        attributes: ['name', 'username'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "Management Board",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access Management Board",
            "error": err
        });
    })
}

exports.allvacation = (req, res) => {
    console.log("Processing func -> Get-allvacation");
    vacations.findAll().then(function (vacations) {
        res.send(vacations)
        // console.log(vacations);
    }).catch(err => {
        res.status(500).send('Error to find allvacation -> ' + err);
    });
}

exports.allusers = (req, res) => {
    console.log("Processing func -> Get-allusers");
    User.findAll().then((users) => {
        res.send(users)
        console.log(users);
    }).catch(err => {
        res.status(500).send('Error to find allusers -> ' + err);
    });
}

