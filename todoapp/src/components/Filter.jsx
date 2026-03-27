import React from 'react'
import './todo.css'
export default function Filter(props) {
    return (
        <div className='filterContainer'>
            <div className='radio'>
                <input type="radio" onChange={() => props.filterItem("urgent")} id="urgent" name="priority" value="" />
                <label htmlFor="urgent">Urgent</label>
            </div>
            <div className='radio'>
                <input type="radio" onChange={() => props.filterItem("important")} id="important" name="priority" value="" />
                <label htmlFor="important">Important</label>
            </div>
            <div className='radio'>
                <input type="radio" onChange={() => props.AllTasks()} id="clear" name="priority" value="" />
                <label htmlFor="clear">All</label>
            </div>
        </div>
    )
}
