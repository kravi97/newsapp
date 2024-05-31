import React from 'react'
import loader from './loader.gif'

// export default class Spinner extends Component {
const Spinner = () => {
    // render() {
    return (
        <div className='text-center'>
            <img className='my-3' src={loader} alt="spinner" />
        </div>
    )
    // }
}

export default Spinner