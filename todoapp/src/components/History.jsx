import React, { useState, useEffect, useContext } from 'react'
import { HistLenContext } from '../App'
import { useNavigate } from 'react-router-dom'
import { MdDelete } from 'react-icons/md'
import { FaCheckCircle} from "react-icons/fa";

export default function History(props) {
  const [data, SetData] = useState([])
  const {completedCount, setCompletedCount}=useContext(HistLenContext);
  const token = localStorage.getItem('token')
  const getFunc = async () => {
    const histData = await fetch("https://todo-backend-ybko.onrender.com/past", {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${token}` // Attach the token in the header
      }
    })
    const result = await histData.json()
    SetData(result)
    setCompletedCount(result.length)
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      getFunc()
    }
  }, [props.refreshHistory, navigate])
  const delHist = async (id) => {
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
        getFunc()
      }
    }

  }
  return (
    <div style={{overflowX: 'auto'}}>
      
      <table className="table" style={{ width: '100%', minWidth: '600px' }} >
        <thead>
          <tr>
            <th scope="col">Sr No.</th>
            <th scope="col">Todo</th>
            <th>Status</th>
            <th scope="col">CompletedAt</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>

          {
            data.length > 0 ? (
              data.map((item, index) => {
                return <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ fontWeight: '' }}>{item.task}</td>
                  <td>{item.status} <FaCheckCircle style={{color:'green'}}/></td>
                  <td>{new Date(item.completedAt).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}</td>
                  <td><MdDelete onClick={() => delHist(item._id)} style={{ cursor: 'pointer' }} /></td>
                  {/* <td><MdDelete onClick={console.log(data)} style={{ cursor: 'pointer' }} /></td> */}
                </tr>
              })
            ) : (<tr><td><h4>No todo found</h4></td></tr>)
          }

        </tbody>
      </table>
    </div>
  )
}
