import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import { Button, Container, HStack, Input, Table, Tbody, Td, Tfoot, Th, Thead, Tr, VStack } from '@chakra-ui/react'
import axios from 'axios' 


const options = {
  method: 'GET',
  url: 'http://api.aladhan.com/v1/timings',

};

const objToArray = (obj) => {
  let temp = []
  for (const key in obj) {
    temp.push({ key: key, value: obj[key] })

  }
  return temp
}



function App() {
  const [latitude, setLatitude] = useState(-7);
  const [longitude, setLongitude] = useState(110);
  const [data, setData] = useState([])

  const getData = async () => {
    return await axios.request({ ...options, params: { latitude: latitude, longitude: longitude } }).then(function (response) {
      console.log(response.data.data);
      setData(objToArray(response.data.data.timings))
    }).catch(function (error) {
      console.error(error);
    });
  }
  function locationSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const altitude = position.coords.altitude;
    const accuracy = position.coords.accuracy;
    const altitudeAccuracy = position.coords.altitudeAccuracy;
    const heading = position.coords.height;
    const speed = position.coords.speed;
    const timestamp = position.timestamp;
    setLatitude(latitude)
    setLongitude(longitude)
    // work with this information however you'd like!
  }

  function locationError(error) {
    const code = error.code;
    const message = error.message;

    // read the code and message and decide how you want to handle this!
  }


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    getData()

  }, []);

  return (
    <div className="App">
      <VStack>

        <Container maxW='container.lg' mt={24}>
          <HStack>
            
          </HStack>
        </Container>

        <Container maxW='container.lg'>
          <Table variant='striped' colorScheme='blue'>
            <Thead>
              <Tr>
                <Th>Waktu</Th>
                <Th>Pukul</Th>
              </Tr>
            </Thead>
            <Tbody>
              {
                data.map((item, index)=>  
                <Tr key={index}>
                  <Td>{item.key}</Td>
                  <Td>{item.value}</Td>
                </Tr>)
  
              }
            </Tbody>
            <Tfoot>

            </Tfoot>
          </Table>
        </Container>
      </VStack>
    </div >
  )
}

export default App
