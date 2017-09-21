import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Row, Col } from 'antd'
import './style.css'
const FormItem = Form.Item

class LoginForm extends React.Component {
  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Row type="flex" justify="space-between">
            <Col span={12}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>Remember me</Checkbox>
              )}
            </Col>
            <Col span={12} className="forgot-password">
              <a href="">Forgot password</a>
            </Col>
          </Row>
          <Row>
            <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
          </Row>
          <Row>
            Or <a href="">register now!</a>
          </Row>
        </FormItem>
      </Form>
    )
  }
}
const Login = Form.create()(LoginForm)
export default Login