const express = require('express');
const router = express.Router();
const messageController = require('../controller/message.controller.js');
const auth = require('../middleware/auth.middleware.js');
const limiter = require("./../middleware/rateLimit.middleware.js");

router.get('/',() => limiter(10,100), messageController.getAll);
router.get('/:id',() => limiter(10,100), messageController.getById);

router.post('/',auth,() => limiter(10,100), messageController.create);

router.put('/:id',auth,() => limiter(10,100), messageController.update);
router.delete('/:id',auth,() => limiter(10,100), messageController.remove);



module.exports = router;