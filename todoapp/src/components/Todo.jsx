import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './todo.css'
import { ToastContainer, toast } from 'react-toastify';

const Todo = (props) => {

    const [todo, SetTodo] = useState("")
    const [priority, SetPriority] = useState("")


    const handlePriorityChange = (e) => {
        SetPriority(e.target.value);
    };
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const handleClick = async () => {
        if (!token) {
            alert('Seesion expired please login')
            navigate('/')
        }
        // alert('our todo app')
        if (todo === "" || priority === "") {
            // alert('')
            toast.warning("Please enter task & select Priority");

        } else {
            const insert = await fetch('https://todo-backend-ybko.onrender.com/add', {
                method: 'post',
                body: JSON.stringify({ task: todo, priority: priority }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            let result = insert.json()
            console.log(result)
            SetTodo("")
            props.getTodo()
            toast.success("Task addd sucessfully");


        }
    }

    return (
        <div className='container'>
            <ToastContainer position="top-center"
                autoClose={3000} />
            <div className='box addBox'>
                <input type="text" onChange={(e) => SetTodo(e.target.value)} placeholder='+ Add new task' value={todo} autoComplete='off' className="form-control" id="inputTask" />
                <button type="button" onClick={handleClick} className="btn btnAdd">Add</button>
            </div>
            <span>Priority : </span>
            <label htmlFor='priority1'  className='mx-2' >Urgent</label>
            <input type="radio" onChange={handlePriorityChange} name="priority" value="urgent" id="priority1" required />
            <label htmlFor='priority2' className='mx-2' > Important </label>
            <input type="radio" onChange={handlePriorityChange} name="priority" value="important" id="priority2" required />

            {/* </form> */}
        </div>
    )
}

export default Todo
