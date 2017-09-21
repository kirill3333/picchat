import React from 'react'
import { Row, Col } from 'antd'
import { LocaleProvider } from 'antd'
import { Layout } from 'antd'
const { Header, Footer, Sider, Content } = Layout
import enUS from 'antd/lib/locale-provider/en_US'
import Login from './Login.jsx'

export default class App extends React.Component {
  render() {
    return (
      <LocaleProvider locale={enUS}>
        <Layout>
          <Content>
            <Row type="flex" justify="space-around" align="middle">
              <Col span={6}>
                <Login/>
              </Col>
            </Row>
          </Content>
        </Layout>
      </LocaleProvider>
    )
  }
}