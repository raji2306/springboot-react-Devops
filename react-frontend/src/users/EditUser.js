import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function EditUser(){

    let navigate=useNavigate()

    const {id}=useParams()

    const [user, setUser] = useState({
        name : "",
        username :"",
        email:"",
    });

    const{name,username,email}=user;

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };

    useEffect(() => {
        loadUsers();
    },[]);

    const onSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:8080/user/${id}`,user)
        navigate("/")
    };

    const loadUsers=async()=>{
        const result=await axios.get(`http://localhost:8080/user/${id}`)
        setUser(result.data)
    }
      

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-3'>Edit User</h2>
                    <form onSubmit={(e)=>onSubmit(e)}>
                    <div className='mb-3'>
                        <label htmlFor='Name' className='form-label'> Name </label>
                        <input type={"text"} className='form-control' placeholder='Enter your name' name="name" value={name} onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='UserName' className='form-label'> Username </label>
                        <input type={"text"} className='form-control' placeholder='Enter your UserName' name="username" value={username} onChange={(e)=>onInputChange(e)}></input>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='Email' className='form-label'> Email </label>
                        <input type={"email"} className='form-control' placeholder='Enter your Email' name="email" value={email} onChange={(e)=>onInputChange(e)}></input>

                    </div>
                    <div>
                        <small id="emailHelp" class="form-text text-muted" color='grey'>We'll never share your data with anyone else.</small>
                    </div>
                    <div className='d-flex align-items-center mb-3 mt-3'>
                        <input type='checkbox' className='mr-2' id='exampleCheck1' style={{ float: 'left' }} required></input>
                            <label htmlFor='exampleCheck1' style={{ marginBottom: '0', textIndent: '7px' }}>
                                Check this box to proceed
                            </label>
                    </div>
                    <button type="submit" className='btn btn-outline-primary'>Submit</button>
                    <Link type="submit" className='btn btn-outline-danger mx-2' to='/'>Cancel</Link>
                    </form>
                </div> 
            </div>
        </div>
    );
}
