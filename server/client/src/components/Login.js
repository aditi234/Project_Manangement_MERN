import React, {useState} from 'react';
import { useHistory } from "react-router";
import './../css/login.css'

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { push } = useHistory();

    const login =()=>{
        fetch("/api/v1/users/login",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email,
                password
            })
        })
        .then(res=> res.json())
        .then(data =>{
            if(data.error){
                console.log(data.error);
                alert("Please login again")
            }else{
                localStorage.setItem('jwt', data.token);
                push("/project");
            }
        })
    }

    return(
        <>
        <div className='nav'>
            <h1>Manage Your Work</h1>
        </div>
        <div className="login">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button class="login-button" onClick = {()=> login()}>
                    login
                </button>
        </div>
        </>
    )
}