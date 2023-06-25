//initialize express router
let router = require('express').Router();

//set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

//Import Manchester Controller
var manchesterController = require('./manchesterController');

//routes
router.route('/manchester')
    .get(manchesterController.index)
    .post(manchesterController.add);
router.route('/manchester/:manchester_id')
    .get(manchesterController.view)
    .patch(manchesterController.update)
    .put(manchesterController.update)
    .delete(manchesterController.delete);

//Export API routes
module.exports = router;


