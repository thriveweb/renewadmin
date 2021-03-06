import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.css'
import './FooterForm.css'

class FooterForm extends React.Component {
  static defaultProps = {
    name: 'Quick Contact',
    subject: '', // optional subject of the notification email
    action: '',
    honeypot: 'confirm',
    successMessage: 'Thanks for your enquiry, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    alert: '',
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)
    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
      .then(res => {
        if (res.ok) {
          return res
        } else {
          throw new Error('Network error')
        }
      })
      .then(() => {
        form.reset()
        this.setState({
          alert: this.props.successMessage,
          disabled: false
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          disabled: false,
          alert: this.props.errorMessage
        })
      })
  }

  render() {
    const { name, subject, action, honeypot } = this.props

    return (
      <form
        className="Form FooterForm"
        name={name}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=""
        data-netlify-honeypot={honeypot}
      >
        {this.state.alert && (
          <div className="Form--Alert">{this.state.alert}</div>
        )}
        <div className="FormGroup">
          <label className="Form--Label">
            <input
              className="Form--Input"
              type="text"
              placeholder="Name"
              name="name"
              required
            />
          </label>
          <label className="Form--Label">
            <input
              className="Form--Input"
              type="email"
              placeholder="Email"
              name="emailAddress"
              required
            />
          </label>
        </div>
        <label className="Form--Label">
          <textarea
            className="Form--Input Form--Textarea"
            placeholder="Message"
            name="message"
            rows="1"
            required
          />
        </label>
        <input
          type="text"
          name={honeypot}
          className="Form--Input-honey"
          placeholder="Leave blank if you are a human"
        />
        {!!subject && <input type="hidden" name="subject" value={subject} />}
        <input type="hidden" name="form-name" value={name} />
        <button
          className="Button Form--SubmitButton Tertiary"
          value="Enquire"
          disabled={this.state.disabled}
        >
          send
        </button>
      </form>
    )
  }
}

export default FooterForm
