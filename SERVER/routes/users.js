var express = require('express');
var router = express.Router();
const verifySignUp = require('../Servises/verifySignUp');
const authJwt = require('../Servises/verifyJwtToken');
const controller = require('../Servises/controller/controller');
const File = require('../Servises/controller/file.controller');





router.get('/', controller.allusers);

router.post('/signup', [verifySignUp.checkDuplicateUserNameOrEmail, verifySignUp.checkRolesExisted], controller.signup);

router.post('/signin', controller.signin);

router.get('/user', [authJwt.verifyToken], controller.userContent);


//PMorAdmin
// router.post('/admin/upload', controller.adminSendFile);
router.post('/admin/upload',File, async (req, res, next) => {
    try {
        let body = req.body;
        let file = req.files.file;
        console.log(body, file);
        const uploadSql = await controller.adminSendFile(body, file);
        res.send(uploadSql);
    } finally { }
    // catch (error) { res.status(500).send('Error>>' + error, console.log('Error>>' + error)) }
})
router.get('/admin/search-user/:id',
// [authJwt.verifyToken, authJwt.isAdmin],
 controller.oneusers);

router.get('/pm', [authJwt.verifyToken, authJwt.isPmOrAdmin], controller.managementBoard);

router.get('/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);


module.exports = router;
