import React, { Component } from 'react'
import CORS from 'cors'
import './App.css'
import axios from 'axios'

class App extends Component {

  constructor () {
  super()
  this.state = {
  autobahn_result: '',
  ascend_result: '',
}

}

componentDidMount()   {
  axios.get('https://jenkins-skynet.pla.pearsondev.tech/view/Autobahn-All-In-One/job/Autobahn-All-In-One/lastBuild/api/json',
  {
    headers: {
      "Accept":"application/json",
      "Authorization":"Basic dW1haGFlYTpQYXNzd29yZEAx",
    }
  }).then(response => this.setState({ autobahn_result: response.data.result }))

  axios.get('https://jenkins-skynet.pla.pearsondev.tech/view/All-In-One/job/All-In-One/lastBuild/api/json',
    {
      headers: {
        "Accept":"application/json",
        "Authorization":"Basic dW1haGFlYTpQYXNzd29yZEAx",
      }
  }).then(response => this.setState({ ascend_result: response.data.result }))
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
        </tr>
        <tr>
          <td>Autobahn</td>
          <td className={`autobahn_text_${this.autobahnStyles()}`}>{this.state.autobahn_result}</td>
        </tr>
        <tr>
          <td>Ascend</td>
          <td className={`ascend_text_${this.ascendStyles()}`}>{this.state.ascend_result}</td>
        </tr>
      </table>
      </div>

    )


  }
}
export default App
