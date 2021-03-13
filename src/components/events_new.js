import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import { postEvent } from '../actions'

function EventsNew(props) {
  const renderField = (field) => {
    const { input, label , type, meta: { touched, error } } = field

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }
  const onSubmit = async (values) => {
    await props.postEvent(values)
    props.history.push('/')
  }

  const { handleSubmit, pristine, submitting } = props

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div><Field label="Title" name="title" type="text" component={renderField} /></div>
        <div><Field label="Body" name="body" type="text" component={renderField} /></div>

        <div>
          <input type="submit" value="Submit" disabled={pristine || submitting} />
          <Link to="/" >Cancel</Link>
        </div>
      </form>
    </>
  )
}

const validate = values => {
  const errors = {}

  if (!values.title) errors.title = "Enter a title, please."
  if (!values.body) errors.body = "Enter a body, please."

  return errors
}
const mapDispatchToProps = ({ postEvent })

export default connect(null, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventNewForm'})(EventsNew)
)