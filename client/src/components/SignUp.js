import React, {useState} from 'react';
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import './../css/login.css'

export default function SignUp(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const { push } = useHistory();

    const Signup =()=>{
        fetch("/api/v1/users/signup",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,
                email,
                password,
                passwordConfirm
            })
        }).then(res=> res.json())
        .then(data =>{
            if(data.error){
                console.log(data.error);
                alert(data.error._message)
            }else{
                localStorage.setItem('jwt', data.token);
                push("/project");
            }
        })
        
    }
    

    return(
        <div>
        <div className='nav'>
            <h1>Manage Your Work</h1>
        </div>
        <div className="login">
                 <input
                    type="name"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <input
                    type="password"
                    placeholder="PasswordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <button class="login-button" onClick = {()=> Signup()}>
                    Sign Up
                </button>
                <div>
                    <h2>Already Registered? <Link to='/login' style={{color: 'rgb(226, 130, 20)'}}>login</Link></h2>
                    
                </div>
        </div>
        </div>
    )
}