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
  autobahn_buildExecutionTime: '',
  autobahn_duration:'',

  ascend_result: '',
  ascend_job:'',
  ascend_timeStamp:'',
  ascend_buildExecutionTime: '',
  ascend_duration:'',
}

}

componentDidMount()   {
  axios.get('https://jenkins-skynet.pla.pearsondev.tech/view/Autobahn-All-In-One/job/Autobahn-All-In-One/lastBuild/api/json',
  {
    headers: {
      "Accept":"application/json",
      "Authorization":"Basic dW1haGFlYTpQYXNzd29yZEAx",
    }
  }).then(response => this.setState({ autobahn_result: response.data.result, autobahn_job: response.data.url, autobahn_timeStamp: response.data.timestamp, autobahn_duration: response.data.duration}))

  axios.get('https://jenkins-skynet.pla.pearsondev.tech/view/All-In-One/job/All-In-One/lastBuild/api/json',
    {
      headers: {
        "Accept":"application/json",
        "Authorization":"Basic dW1haGFlYTpQYXNzd29yZEAx",
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

autobahn_dateFormat = () => {
  var date = new Date(this.state.autobahn_timeStamp);
  this.state.autobahn_buildExecutionTime = date.toLocaleString();
  return this.state.autobahn_buildExecutionTime
}

ascend_dateFormat = () => {
  var date = new Date(this.state.ascend_timeStamp);
  this.state.ascend_buildExecutionTime = date.toLocaleString();
  return this.state.ascend_buildExecutionTime
}

autobahn_duration_in_minutes = () => {
  return Number(this.state.autobahn_duration/60).toFixed(2)
}

ascend_duration_in_minutes = () => {
  return Number(this.state.ascend_duration/60).toFixed(2)
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
          <th>Build Last Run</th>
          <th>Duration(mins)</th>
        </tr>
        <tr>
          <td>Autobahn</td>
          <td className={`autobahn_text_${this.autobahnStyles()}`}>{this.state.autobahn_result}</td>
          <td><a href={this.state.autobahn_job}>{this.state.autobahn_job}</a></td>
          <td>{this.autobahn_dateFormat()}</td>
          <td>{this.autobahn_duration_in_minutes()}</td>
        </tr>
        <tr>
          <td>Ascend</td>
          <td className={`ascend_text_${this.ascendStyles()}`}>{this.state.ascend_result}</td>
          <td><a href={this.state.ascend_job}>{this.state.ascend_job}</a></td>
          <td>{this.ascend_dateFormat()}</td>
          <td>{this.ascend_duration_in_minutes()}</td>
        </tr>
      </table>
      </div>
    )
  }
}
export default App
