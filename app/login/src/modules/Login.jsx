import React from 'react'
import { Form, Icon, Input, Button, Row } from 'antd'
import { Link } from 'react-router-dom'
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
      <div className="root-login">
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="mobile" style={{ fontSize: 13 }} />} placeholder="Username" />
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
            <Row>
              <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
            </Row>
            <Row>
              Or <Link to="/registration">register now!</Link>
            </Row>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const Login = Form.create()(LoginForm)
export default Login