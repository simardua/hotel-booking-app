const express = require('express');
const router = express.Router();

const Room = require('../models/room');
const { Code } = require('bson');

router.get("/getallrooms", async(req,res)=>{

    try{
        const rooms = await Room.find({})
        res.send(rooms)
    } catch(error){
        return res.status(400).json({message: error});
    }
});

module.exports= router;