import { useState, useEffect  } from 'react';
import './index.css'
import Select from 'react-select';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

function App() {
  var [data, setData] = useState([])
  var [selectOptions, setSelectOptions] = useState([])
  var [selectedCountry, setSelectedCountry] = useState('')

  const axios = require('axios');
  
  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/region/europe')
    .then(res => setData(res.data))
    .catch(err => console.log(err + 'error'))

  }, [])

  useEffect(()=>{
    setSelectOptions([])
    data.map(country => {
      let selectTest = selectOptions
      selectTest.push({value: country.name.common, label: country.name.official})
      setSelectOptions(selectTest)
    })
  }, [data]);

  return (
    <div className='md:m-10 m-5 text-center'>
      <Select onChange={(e)=>{
        setSelectedCountry(e.value)
      }} options={selectOptions} />
      <div className='flex justify-center content-center'>
        {selectedCountry ? data.map((country, i) => {
          if(selectedCountry === country.name.common){
            return(<div key={i} className=' w-3/4 max-w-3xl min-w-180 bg-gray-100 border-2 border-red-600 md:m-10 mx-2 my-5 flex flex-col justify-center items-center p-5'>
            <img src={country.flags.png} className=' w-20 mb-2 ' alt="" />
            <h1 className=' text-2xl'>{country.name.common}</h1>
            <h2><span className=' font-bold'>Capital:</span> {country.capital}</h2>
            <h2><span className=' font-bold'>Population:</span> {country.population}</h2> 
            <div className='mt-7'>
              <MapContainer center={country.latlng} zoom={3} scrollWheelZoom={true}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={country.latlng}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
          </div>
          </div>)
          }
        }) : <div className='text-center m-4 text-2xl'>You didn't select nothing</div>}
      </div>
      <p className='text-center mt-10'>Api - data from: <a target="_blank" rel="noreferrer" className=' text-blue-700 hover:text-blue-400 text-xl ml-2' href="https://restcountries.com/v3.1/region/europe">restcountries.com</a></p>
 
  </div>
  );
}

export default App;
