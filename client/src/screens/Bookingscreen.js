import React from "react";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment"; // import moment library
import Button from "react-bootstrap/esm/Button";
import Loader from "../components/Loader";
import Error from "../components/Error";

function Bookingscreen({ match }) {
  const { roomid, fromdate, todate } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [room, setrooms] = useState(true);

  const firstdate = moment(fromdate , 'YYYY-MM-DD')
  const lastdate = moment(todate , 'YYYY-MM-DD')
  const totaldays = moment.duration(lastdate.diff(firstdate)).asDays()+1

  // const totalamount = (totaldays*room.rentperday);
  const [totalamount, settotalamount] = useState(0)




  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/rooms/getroombyid", { roomid });
        console.log(response);
        settotalamount(response.data.rentperday*totaldays)
        setrooms(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchRoom();
  }, [roomid]);



  async function bookRoom(){
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      // Handle the case where currentUser is null or undefined
      return;
    }
    console.log('currentUser:', currentUser);
      
    const bookingDetails ={
      room ,
      userid: currentUser._id,
      fromdate,
      todate,
      totalamount,
      totaldays
    }
    try {
      const result =await axios.post('/api/bookings/bookroom', bookingDetails)
    } catch (error) {
      // handle error
    }
  }
    return (
    <div className="m-5">
      {loading ? (
        <Loader/>
      ) : room ? (
        <div>
          <div className="row justify-content-center mt-5 bs bg-white">
            <div className="col-md-6">
              <h1>{room?.name}</h1>
              {room?.imageurls && room?.imageurls.length > 0 && (
                <img src={room.imageurls[0]} className="big-img" />
              )}
            </div>
            <div className="col-md-6">
              <div style={{ textAlign: "right" }}>
                <h1>Booking Details </h1>
                <hr />
                <b>
                  <p>Name : {JSON.parse(localStorage.getItem('currentUser')).name}</p>
                  
                  <p>From Date : {fromdate}</p>
                  <p>To Date : {todate}</p>
                  <p>Max Count : {room.maxcount}</p>
                </b>
              </div>

              <div style={{ textAlign: "right" }}>
                <b>
                  <h1>Amount </h1>
                  <hr />
                  <p>Total Days : {totaldays}</p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total Amount : {totalamount} </p>
                </b>
              </div>

              <div style={{ float: "right" }}>
                <button className="btn btn-primary" onClick={bookRoom}>Pay Now </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Error /> // add error component
      )}
    </div>
  );
}

export default Bookingscreen;