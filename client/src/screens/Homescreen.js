import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Room from '../components/Room';
import moment from 'moment'
import Loader from '../components/Loader';
import { DatePicker, Space } from 'antd';

const Homescreen = () => {
 
  const [data, setData] = useState([])
  const [rooms,setrooms] = useState()
  const[loading , setloading] = useState()
  const[error , seterror] = useState()
  const { RangePicker } = DatePicker;
const[fromdate, setfromdate]=useState()
const[todate, settodate]=useState()
const [duplicaterooms, setduplicaterooms] = useState([])

  useEffect(() => {
    const fetchData = async () =>{
 
      try {
        setloading(true)
        const {data: response} = await axios.get('/api/rooms/getallrooms');
        
        setData(response);
        setduplicaterooms(response)
        setloading(false)

      } catch (error) {
        seterror(true)
        console.error(error.message);
        setloading(false)
      }
  
    }

    fetchData();
  }, []);


  function filerByDate(dates){
    // console.log(moment(dates[0].format('YYYY-MM-DD'))._i)
    // console.log(moment(dates[1].format('YYYY-MM-DD')))
  
    setfromdate(moment(dates[0].format('YYYY-MM-DD'))._i)
    settodate(moment(dates[1].format('YYYY-MM-DD'))._i)


    var temprooms = []
    var availability = false
    for(const room of duplicaterooms){
      if(room.currentbookings.length > 0 ){

        for(const booking of room.currentbookings){
          if (!moment(moment(moment(dates[0].format('YYYY-MM-DD'))._i).isBetween(booking.fromdate, booking.todate))
            && !moment(moment(moment(dates[1].format('YYYY-MM-DD'))._i).isBetween(booking.fromdate, booking.todate))
          ){

            if (moment(dates[0].format('YYYY-MM-DD'))._i !== booking.fromdate &&
              moment(dates[0].format('YYYY-MM-DD'))._i !== booking.todate &&
              moment(dates[1].format('YYYY-MM-DD'))._i !== booking.fromdate &&
              moment(dates[1].format('YYYY-MM-DD'))._i !== booking.todate 
              ) {
              availability = true
            }

          }

        }
        

      }

      if (availability == true|| room.currentbookings.length==0) {
        temprooms.push(room)
      }
      setrooms(temprooms)
    }

  }

  return (
    <div className='container'>
      <div className='row mt-5' >

        <div className='col-md-3'>
            
        <RangePicker format='YYYY-MM-DD' onChange={filerByDate} />

        </div>
        

      </div>
        <div className='row justify-content-center mt-5'>
        {loading ? (
          <h1><Loader/></h1>
          ) : data.length>1 ? (
            data.map((rooms)=>{
              return <div className='col-md-9 mt-3'>
                      <Room rooms={rooms} fromdate={fromdate} todate={todate}  />
              </div>;
       })
            ) : (
              <error/>
             )}

        </div>
    </div>
  )
}

export default Homescreen;