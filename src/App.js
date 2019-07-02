import React, { Component } from 'react'
import CORS from 'cors'
import './App.css'
import axios from 'axios'

class App extends Component {

  constructor () {
  super()
  this.state = {
  autobahn_result: '',
  autobahn_job:'',
  autobahn_timeStamp:'',
  autobahn_duration:'',

  ascend_result: '',
  ascend_job:'',
  ascend_timeStamp:'',
  ascend_duration:'',
}

}

componentDidMount()   {
  axios.get('https://url',
  {
    headers: {
      "Accept":"application/json",
      "Authorization":"Basic dW1haGFlYTpQYXNzd29yZEAx",
    }
  }).then(response => this.setState({ autobahn_result: response.data.result, autobahn_job: response.data.url, autobahn_timeStamp: response.data.timestamp, autobahn_duration: response.data.duration}))

  axios.get('https://url',
    {
      headers: {
        "Accept":"application/json",
        "Authorization":"Basic dW1haGFXNzd29yZEAx",
      }
  }).then(response => this.setState({ ascend_result: response.data.result, ascend_job: response.data.url, ascend_timeStamp: response.data.timestamp, ascend_duration: response.data.duration }))
}

autobahnStyles = () => {
  if (this.state.autobahn_result === 'SUCCESS') {
    return 'success'
  }
  if (this.state.autobahn_result === 'FAILURE') {
    return 'failure'
  }

  return 'other'
}

ascendStyles = () => {
  if (this.state.ascend_result === 'SUCCESS') {
    return 'success'
  }
  if (this.state.ascend_result === 'FAILURE') {
    return 'failure'
  }

  return 'other'
}

  render () {
    return (
      <div className='button__container'>
      <h1>Project Skynet Execution Status</h1>

      <table>
        <tr>
          <th>Team</th>
          <th>Execution Status</th>
          <th>Build URL</th>
          <th>Time Stamp</th>
          <th>Duration</th>
        </tr>
        <tr>
          <td>Autobahn</td>
          <td className={`autobahn_text_${this.autobahnStyles()}`}>{this.state.autobahn_result}</td>
          <td>{this.state.autobahn_job}</td>
          <td>{this.state.autobahn_timeStamp}</td>
          <td>{this.state.autobahn_duration}</td>
        </tr>
        <tr>
          <td>Ascend</td>
          <td className={`ascend_text_${this.ascendStyles()}`}>{this.state.ascend_result}</td>
          <td>{this.state.ascend_job}</td>
          <td>{this.state.ascend_timeStamp}</td>
          <td>{this.state.ascend_duration}</td>
        </tr>
      </table>
      </div>

    )


  }
}
export default App
