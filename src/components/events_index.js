import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'lodash'

import { readEvents } from '../actions'

function EventsIndex(props) {
  useEffect(() => {
    props.readEvents()
  }, [])

  const renderEvents = () => {
      return _.map(props.events, event => (
        <tr key={event.id}>
          <td>{event.id}</td>
          <td>{event.title}</td>
          <td>{event.body}</td>
        </tr>
      ))
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>

        <tbody>
          {renderEvents()}
        </tbody>
      </table>

      <Link to="events/new">New Event</Link>
    </>
  )
}

const mapStateToProps = state => ({ events: state.events })
const mapDispatchToProps = ({ readEvents })

export default connect(mapStateToProps, mapDispatchToProps)(EventsIndex)
