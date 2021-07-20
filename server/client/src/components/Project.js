import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import {IoArrowRedo} from 'react-icons/io5'
import './../css/project.css'

export default function Project(){
    const [projects, setProjects] = useState([]);
    const [name, setName] = useState('');
    useEffect(()=>{
        let token=localStorage.getItem('jwt');
        fetch('/api/v1/projects/',{
            headers:{
                "Authorization": "Bearer "+ token
            }
        }).then(res => res.json())
        .then(result =>{
            if(result.error){
                console.log("error",result.error);
                alert("something went wrong");
            }else{
                console.log(result.projects);
                setProjects(result.projects);
            }
        })
    },[]);
     
    useEffect(()=>{
        let token=localStorage.getItem('jwt');
        fetch('/api/v1/projects/',{
            headers:{
                "Authorization": "Bearer "+ token
            }
        }).then(res => res.json())
        .then(result =>{
            if(result.error){
                console.log("error",result.error);
                alert("something went wrong");
            }else{
                console.log(result.projects);
                setProjects(result.projects);
            }
        })
    },[]);



    const AddProject =()=>{
        let token=localStorage.getItem('jwt');
        fetch('/api/v1/projects/',{
            method: "post",
            headers: {
                "Authorization": "Bearer "+ token,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name
            })
        })
        .then(res=> res.json())
        .then(result =>{
            if(result.error){
                alert(result.error);
            }else{
                setProjects([result.newProject, ...projects,]);
                setName('');
            }
        })
    }

    return(
        <div>
            <Navbar />
            <h1 className='project'>Your Projects</h1>
            <div className="createProject">
                <input 
                type="text"
                placeholder="Write Project Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                 />
                <button onClick={()=>AddProject()}>+</button>
                
            </div>
            {
                projects.map(item =>{
                    return(
                        <div className='projectBox'>
                            <div className='design'></div>
                            <h3>{item.name} </h3>
                            <a href={`/project/${item._id}`}>See Tasks <IoArrowRedo size="20px"/></a>
                        </div>
                    )
                })
            }
        </div>
    )
}