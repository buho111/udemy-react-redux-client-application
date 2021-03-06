import _ from 'lodash'
import { READ_EVENTS } from '../actions'

const initialState = { value: 0 }

 const counter = (events = {}, action) => {
    switch(action.type) {
        case READ_EVENTS:
            console.log(action.response.data)
            return _.mapKeys(action.response.data, 'id')
        default:
            return events
    }
}

export default counter;