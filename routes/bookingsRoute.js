const express = require("express");
const router = express.Router();
const Booking = require("../models/booking")
const Room = require("../models/room")
const moment = require('moment');
const { default: Bookingscreen } = require("../client/src/screens/Bookingscreen");
router.post("/bookroom", async (req, res) => {

    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays
    } = req.body


    try {
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromdate: moment(fromdate).format('YYYY-MM-DD'),
            todate: moment(todate).format('YYYY-MM-DD'),
            totaldays,
            totalamount,
            transactionId: '1234',
        })

        const booking = await newbooking.save();

        const roomtemp = await Room.findOne({_id : room._id}); 
        roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: moment(fromdate).format('YYYY-MM-DD'), todate: moment(todate).format('YYYY-MM-DD'), userid : userid, status : booking.status })

        await roomtemp.save()
        res.send("Room Booked Successfully");
    } catch (error) {
        return res.status(400).json({ error });
    }
});

router.post("/getbookingsbyuserid", async (req, res) => {
    const userid = req.body.userid

    try {
        const bookings = await Booking.find({ userid: userid })
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error })

    }


    router.post("/cancelbooking", async (req, res) => {
        const { bookingid, roomid } = req.body
        try {
            const bookingitem = await Booking.findOne({ _id: bookingid })
            bookingitem.status = 'cancelled'
            await bookingitem.save()
            const room = await Room.findOne({_id : roomid})

            const bookings = room.currentbookings
            const temp = bookings.filter(bookings=> bookings.bookingid.toString()!==bookingid)
            room.currentbookings= temp
            await room.save()
            res.send('Your booking cancelled successfully')


        } catch (error) {

           return res.status(400).json({error})
        }

    })

})

router.post("/deletebooking", async (req, res) => {
    const { bookingid} = req.body
    try {
        const bookingitem = await Booking.deleteOne({ _id: bookingid })
        await bookingitem.save()
        

       
        res.send('Your booking cancelled successfully')


    } catch (error) {

        return res.status(400).json({ error })
    }
})


module.exports = router