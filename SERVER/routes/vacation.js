var express = require('express');
var router = express.Router();
const controller = require('../Servises/controller/controller');



/* GET All-vacation-Api. */
router.get('/', controller.allvacation);

/* GET Single-vacation-Api. */
// router.get('/:id', controller.vacation);


// /* POST Single-vacation-Api. */
// router.post('/add', vacationAPI.addSingle);

// /* PUT Single-vacation-Api. */
// router.put('/put/:id', vacationAPI.putSingle);

// /* DELETE Single-vacation-Api. */
// router.delete('/delete/:id', vacationAPI.deleteSingle);





module.exports = router;
