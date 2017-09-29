import React from 'react'
import { LocaleProvider } from 'antd'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import enUS from 'antd/lib/locale-provider/en_US'
import Login from './Login.jsx'
import Registration from './Registration.jsx'
import './style.css'

export default class Root extends React.Component {
  render() {
    return (
      <Router>
        <LocaleProvider locale={enUS}>
          <div>
            <Switch>
              <Route exact path="/" component={Login}/>
              <Route path="/registration" component={Registration}/>
            </Switch>
          </div>
        </LocaleProvider>
      </Router>
    )
  }
}