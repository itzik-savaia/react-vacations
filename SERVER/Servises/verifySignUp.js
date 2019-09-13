const db = require('./config/db.config');
const config = require('./config/config');
const ROLEs = config.ROLEs;
const User = db.user;
const Role = db.role;

checkDuplicateUserNameOrEmail = (req, res, next) => {
    console.log(req.body);

    // -> Check Username is already in use
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send("Fail -> Username is already taken!");
            return;
        }
        next();
    });
}

checkRolesExisted = (req, res, next) => {
    console.log(req.body.roles);
    for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
            res.status(400).send("Fail -> Does NOT exist Role = " + req.body.roles[i]);
            return;
        }
    }
    next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;