import React from 'react'
import { Row, Col } from 'antd'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import Login from './Login.jsx'
import './style.css'

export default class App extends React.Component {
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <div className="root">
          <Row type="flex" justify="space-around" align="middle">
            <Col span={6}>
              <Login/>
            </Col>
          </Row>
        </div>
      </LocaleProvider>
    )
  }
}