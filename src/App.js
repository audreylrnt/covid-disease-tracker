import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Table} from 'react-bootstrap'
import countries from './countries'
function App() {
  const baseURL = `https://disease.sh/v3/covid-19/countries/`
  const options = countries
  const [data, setData] = useState({
    countryName: '',
    case: 0,
    active: 0,
    recovered: 0,
    died: 0,
    img: '',
    updatedtime: 0
  })

  const getData = countryName => {
    countryName && axios.get(`${baseURL}${countryName}?strict=true`).then(response => {
          const {country, cases, active, recovered, deaths, countryInfo, updated} = response.data
          setData({
            countryName: country,
            case: cases.toLocaleString(),
            active: active.toLocaleString(),
            recovered: recovered.toLocaleString(),
            died: deaths.toLocaleString(),
            img: countryInfo.flag,
            updatedtime: new Date(updated).toString()
          })
        }).catch(error => {
          console.log(`Something went wrong...`)
        })
  }
  useEffect(() => {
    const RANDOM_COUNTRY = ['South Korea', 'Indonesia', 'USA', 'Japan', 'Australia']

    axios.get(`${baseURL}${RANDOM_COUNTRY[Math.floor(Math.random()*5)]}?strict=true`).then(response => {
      const {country, cases, active, recovered, deaths, countryInfo, updated} = response.data
      setData({
        countryName: country,
        case: cases.toLocaleString(),
        active: active.toLocaleString(),
        recovered: recovered.toLocaleString(),
        died: deaths.toLocaleString(),
        img: countryInfo.flag,
        updatedtime: new Date(updated).toString()
      })
    })

  }, [baseURL])

  
  return (
    <div className="container">
      <Form>
        <Form.Label>Search Country</Form.Label>
        <Typeahead 
          className="typeahead"
          labelKey="name"
          onChange={selected => {getData(selected.length && selected[0].name)}}
          options={options}
          placeholder="Select country..."
        />
      </Form>
      
      <div className="title">
        <h3>{data.countryName} COVID-19 Statistic</h3>
        <img className="flag" src={data.img} alt="flag"></img>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Update time</th>
            <th>Case</th>
            <th>Active</th>
            <th>Recovered</th>
            <th>Died</th>
          </tr>
        </thead>
        <tbody>
          <td>{data.updatedtime}</td>
          <td>{data.case}</td>
          <td>{data.active}</td>
          <td>{data.recovered}</td>
          <td>{data.died}</td>
        </tbody>
      </Table>
    </div>
  )
}

export default App
