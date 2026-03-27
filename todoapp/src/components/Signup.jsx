import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { MdEmail } from "react-icons/md";

const Signup = () => {
    const [uname, SetUname] = useState("")
    const [emailid, SetEmailid] = useState("")
    const [pass, SetPass] = useState("")
    const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    const navigate = useNavigate();
    const hadleSingup = async () => {

        if (uname === "" || emailid === "" || pass === "") {
            // toast.warning('Enter the credentials')
            toast.warning('Enter the credentials');
        } else if (!regex.test(emailid)) {
            // alert("write valid email");
            toast.error('write valid email id')
        }
        else {

            const insert = await fetch('http://localhost:5000/user', {
                method: 'post',
                body: JSON.stringify({ username: uname, email: emailid, password: pass }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (insert.ok) {
                let result = insert.json()
                console.log(result)
                toast.success('user added!!')
                navigate('/')
            } else {
                toast.error("already account with this email please login")
                let result = insert.json()
                console.log(result)

            }

        }
    }

    return (
        <>
            <ToastContainer position='top-center'/>
            <input onChange={(e) => SetUname(e.target.value)} value={uname} type="text" placeholder='Name' /><br /><br />
            <input onChange={(e) => SetEmailid(e.target.value)} value={emailid} type="email" placeholder='Email' /><br /><br />
            <input onChange={(e) => SetPass(e.target.value)} value={pass} type="password" placeholder='password' /><br /><br />
            <button className='publicBtn' onClick={hadleSingup}>singup</button>
        </>
    )
}

export default Signup
