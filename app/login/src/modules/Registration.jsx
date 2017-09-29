import React from 'react'
import {Form, Input, Button, Tooltip, Icon, Select} from 'antd'

const FormItem = Form.Item
const Option = Select.Option

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.checkPassword = this.checkPassword.bind(this)
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this)
    this.checkConfirm = this.checkConfirm.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values)
      }
    })
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!')
    } else {
      callback()
    }
  }

  handleConfirmBlur(e) {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '7',
    })(
      <Select style={{ width: 60 }}>
        <Option value="7">+7</Option>
        <Option value="86">+87</Option>
      </Select>
    )

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    }

    return (
      <div className="root-registration">
        <Form onSubmit={this.handleSubmit} className="registration-form">
          <FormItem {...formItemLayout} label="Phone Number">
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: 'Please input your phone number!' }],
            })(
              <Input addonBefore={prefixSelector} style={{ width: '100%' }}/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Password" hasFeedback>
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.checkConfirm,
              }],
            })(
              <Input type="password"/>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.checkPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={(
              <span>
              Nickname&nbsp;
                <Tooltip title="To find you in search results">
                  <Icon type="question-circle-o"/>
                </Tooltip>
              </span>
            )}
            hasFeedback
          >
            {getFieldDecorator('nickname', {
              rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const Registration = Form.create()(RegistrationForm)
export default Registration