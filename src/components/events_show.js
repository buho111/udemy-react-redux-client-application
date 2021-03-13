import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'

import { getEvent, deleteEvent, putEvent } from '../actions'

function EventsShow(props) {
  const renderField = (field) => {
    const { input, label , type, meta: { touched, error } } = field

    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    )
  }

  const onDeleteClick = async () => {
    const { id } = props.match.params
    await props.deleteEvent(id)
    props.history.push('/')
  }

  const onSubmit = async (values) => {
    await props.putEvent(values)
    props.history.push('/')
  }

  useEffect(() => {
    const { id } = props.match.params
    if (id) props.getEvent(id)
  }, [])

  const { handleSubmit, pristine, submitting, invalid } = props

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div><Field label="Title" name="title" type="text" component={renderField} /></div>
        <div><Field label="Body" name="body" type="text" component={renderField} /></div>

        <div>
          <input type="submit" value="Submit" disabled={pristine || submitting || invalid} />
          <Link to="/" >Cancel</Link>
          <Link to="/" onClick={onDeleteClick}>Delete</Link>
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

const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
}
const mapDispatchToProps = ({ deleteEvent, getEvent, putEvent })

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow)
)