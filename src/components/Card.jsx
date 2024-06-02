import { useEffect, useState } from 'react'
import '../Card.css'
import axios from 'axios'
export default function Card() {
    const [city, setcity] = useState('')
    const [data, setdata] = useState('')
    function handleSubmit(e) {
        e.preventDefault();
        axios.get(`https://api.weatherapi.com/v1/current.json?key=5ecd70d2b9124b5e986181845243105&q=${city}&aqi=yes`)
        .then((d)=>setdata(d.data))
        setcity('')
    }
    function getLocationData(lat,lon){
        axios.get(`https://api.weatherapi.com/v1/current.json?key=5ecd70d2b9124b5e986181845243105&q=${lat},${lon}&aqi=yes`)
        .then((d)=>setdata(d.data))
    }
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((p)=>{
            getLocationData(p.coords.latitude,p.coords.longitude)
        })
    },[])
    return (
        <>
            <div className="card m-6 bg-white rounded-lg p-10 flex items-center flex-col outline-none gap-5 justify-center sm:h-auto sm:w-auto" >
                <div className="search flex justify-evenly items-center w-full">
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder="Enter City Name" name="city" value={city} onChange={(e) => setcity(e.target.value)} required/>
                        <button type="submit" className='ml-5'>Search</button>
                    </form>
                </div>
                <div className="data flex items-start justify-start flex-col text-xl gap-3">
                    <img src={data?.current?.condition?.icon} alt="not found" />
                    <h1>Temperature : {data?.current?.temp_c} °C</h1>
                    <h1>Feels Like : {data?.current?.feelslike_c} °C</h1>
                    <h3>Wind Speed : {data?.current?.wind_kph}kph</h3>
                    <h3>Humadity : {data?.current?.humidity}</h3>
                    <h2>{data?.location?.name} {data?.location?.region},{data?.location?.country}</h2>
                </div>
                <p>Made By Nesar Alam</p>
            </div>
        </>
    )
}