const express = require("express");
const { updateUser,deleteUser, getUser } = require("../controllers/users.controllers");
const router = express.Router();


//update
router.put('/:id',updateUser);
//delete
router.delete('/:id',deleteUser);
//get one user
router.get('/:id',getUser);


module.exports = router;