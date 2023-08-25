import React, {useState, useEffect} from 'react'
import { Tabs } from 'antd';
import { TabPane } from 'react-bootstrap';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";

function Profilescreen() {
  

    const user = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
      if (!user) {
        window.location.href='/login'
      }
    }, [])
    

  return (
    
    <div className='ml-3 mt-3'> 

        <Tabs defaultActiveKey='2' >
            <TabPane tab="Profile" key={'1'}>
                <h1>My Profile</h1> 

                <br/>
                <h1>Name: {user.name}</h1>
                <h1>Email: {user.email}</h1>
                <h1>isAdmin: {user.isAdmin ? 'YES' : 'NO '}</h1>
            </TabPane>
            <TabPane tab="Bookings" key={'2'}>
                <MyBookings/>
            </TabPane>
        </Tabs>
    </div>
  )
}

export default Profilescreen;


export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser"))
    const[bookings, setbookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(); 

    useEffect(() => {
      const fetchData = async () => {
     try {
      setLoading(true);
        const data = await axios.post('/api/bookings/getbookingsbyuserid', {userid: user._id});
       setbookings(data.data)
        console.log(data)
        
        setLoading(false);
     } catch (error) {
        console.log(error)
        setLoading(false);
        setError(true)
     }  
    }
    fetchData();
    }, []);


   async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true)
      const result = await axios.post("/api/bookings/cancelbooking", {bookingid , roomid}).data
      console.log(result)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
      
    }
  async function deleteBooking(bookingid) {
    try {
      setLoading(true)
      const result = await (await axios.post("/api/bookings/deletebooking", { bookingid})).data
      console.log(result)
      setLoading(false)
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }
    
    return(
        <div>
            <div className='row'>
              <div className='col-md-6'>
              {loading && (<Loader/>)}
            {bookings.map && (bookings.map(booking => {

                return(
                  <div className='bs'>
                    <h1>{booking.room}</h1>
                    <p><b>Booking Id :</b> {booking._id}</p>
                    <p><b>Check In :</b> {booking.fromdate}</p>
                    <p><b>Check Out :</b> {booking.todate}</p>
                    <p><b>Status :</b> {booking.status === 'booked' ? 'CONFIRMED' : 'CANCELLED'}</p>

                    <div className='text-left'>
                    <button class='btn btn-primary' onClick={()=>{cancelBooking(booking._id , booking.roomid)}}>CANCEL BOOKING</button>

                    </div>
                    <div className='text-right'>
                      <button class='btn btn-primary' onClick={() => { deleteBooking(booking._id) }}>DELETE BOOKING</button>

                    </div>
                  </div>
                )


              }))}

              </div>
            </div>
        </div>
    );
}