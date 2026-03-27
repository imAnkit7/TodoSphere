import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { HistLenContext } from '../App';
import { ToastContainer, toast } from 'react-toastify';

import { MdDelete } from 'react-icons/md'
import Filter from './Filter'
import Todo from './Todo'
import Navbar from './Navbar';
import Dash from './Dash';
import History from './History';
import Footer from './Footer';

const Mytodos = (props) => {
    const HistLen = useContext(HistLenContext);
    const [refreshHistory, setRefreshHistory] = useState(false);
    const [data, SetData] = useState([])
    const [filteredData, setFilteredData] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        } else {
            getTodo()
        }
    }, [navigate]);

    const token = localStorage.getItem('token')
    const getTodo = async () => {
        const data = await fetch('https://todo-backend-ybko.onrender.com/todos', {
            method: 'get',
            headers: {
                'Authorization': `Bearer ${token}` // Attach the token in the header
            }
        })
        if (data.status === 401) {
            alert("Session expired ! Please login again");
            localStorage.removeItem("token");
            navigate("/"); // redirect to login page
            return;
        }

        const result = await data.json()
        SetData(result)
        console.log(data)
        setFilteredData(result)
    }

    const deleteTodo = async (id) => {
        if (!token) {
            alert('Session expire! please login')
            navigate('/')
        } else {
            const result = await fetch(`https://todo-backend-ybko.onrender.com/todos/${id}`, {
                method: 'Delete',
                headers: {
                    'Authorization': `Bearer ${token}` // Attach the token in the header
                }
            })
            const deldata = await result.json()
            if (deldata) {
                getTodo()
            }
        }
    }


    const filterItem = (pr) => {
        const updateData = data.filter((e) => {
            return e.priority === pr;
        })
        setFilteredData(updateData)
    }
    const AllTasks = () => {
        setFilteredData(data)
    }
    const histTodo = async (id) => {
        const isConfrim = window.confirm("Are you sure ! You will see it in Complted task")
        if (isConfrim) {
            const result = await fetch(`https://todo-backend-ybko.onrender.com/past/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: "completed" }),
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}` // Attach the token in the header
                }
            })
            const histdata = await result.json()
            if (histdata) {
                getTodo()
                setRefreshHistory(!refreshHistory);
            } else {
                console.log("Nothing found")
            }
        }
    }
   
    return (
        <div className='WholeContainer' id='home'>
            <Navbar />
            <Dash task={data?.length || 0} />
            <div id='mainContainer'>
                
                <Todo getTodo={getTodo} />
                <div className='container py-5 my-3' style={{overflowX: 'auto'}}>
                    <Filter filterItem={filterItem} AllTasks={AllTasks} /><hr/>
                    <table className="table" style={{ width: '100%', minWidth: '600px' }}>
                        <thead>
                            <tr>
                                <th scope="col">Sr No.</th>
                                <th scope="col">Todo</th>
                                <th scope="col">Priority</th>
                                <th scope="col">Done</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Status</th>
                                <th scope="col">Created At</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                filteredData.length > 0 ? (
                                    filteredData.map((item, index) => {
                                        return <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td style={{ fontWeight: '' }}>{item.task}</td>
                                            <td className={`showPriority ${item.priority.toLowerCase()}`}>{item.priority}</td>
                                            <td><button id='done' onClick={() => histTodo(item._id)} className="btn">Done</button></td>
                                            <td><MdDelete style={{ cursor: 'pointer' }} onClick={() => deleteTodo(item._id)} /></td>
                                            <td>{item.status}</td>
                                            <td>{new Date(item.createdAt).toLocaleString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}</td>
                                        </tr>
                                    })
                                ) : (<tr><td><h4>No task pending right now </h4></td></tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
            <div className='container' id='history'>
                <h2 className='my-3'>Completed task</h2>
                <History refreshHistory={refreshHistory}/>
            </div>
            <div>
                <Footer/>
            </div>
        </div>
    )
}

export default Mytodos
