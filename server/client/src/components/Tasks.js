import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom'
import './../css/task.css';
import {MdDelete} from 'react-icons/md';
import {RiAddBoxFill} from 'react-icons/ri';


export default function Tasks(){
    const {id} = useParams();
    const [tasks, setTasks] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [members, setMembers] = useState([]);
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [finishDate, setFinishDate] = useState('');
    const [description, setDescription] = useState('');
    const [percentageComplete, setPercentageComplete] = useState('');
    const [percentage, setPercentage] = useState(0);
    const [update, setUpdate] = useState(0);


    useEffect(()=>{
        let token=localStorage.getItem('jwt');
        fetch(`/api/v1/projects/${id}/tasks`,{
            headers:{
                "Authorization": "Bearer "+ token
            }
        }).then(res => res.json())
        .then(result =>{
            if(result.error){
                console.log("error",result.error);
                alert("something went wrong");
            }else{
                setTasks(result.tasks);
            }
        })
    },[]);

    useEffect(()=>{
        fetch(`/api/v1/projects/${id}`,{
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res=> res.json())
        .then(result =>{
            if(result.error){
                console.log("error",result.error);
                alert("something went wrong");
            }else{
                const project= result.project;
                setProjectName(project.name);
                setMembers(project.members);
            }
        })
    },[]);

    const AddMember=()=>{
        fetch(`/api/v1/projects/${id}/member`,{
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                email
            })
        })
        .then(res=> res.json())
        .then(result =>{
            if(result.error){
                alert(result.error);
            }else{
                setMembers(result.members);
            }
            setEmail('');
            
            
        })
    }
    const deleteMember = (email) =>{
        fetch(`/api/v1/projects/${id}/member/${email}`,{
            method: "put",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res=> res.json())
        .then(result =>{
            if(result.error){
                console.log("error",result.error);
                alert("something went wrong");
            }else{
                setMembers(result.members);
            }
        })   
    }

    const AddTask = () =>{
        let token=localStorage.getItem('jwt');
        fetch(`/api/v1/projects/${id}/tasks`,{
            method: "post",
            headers: {
                "Authorization": "Bearer "+ token,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                startDate,
                finishDate,
                description,
                percentageComplete
            })
        })
        .then(res=> res.json())
        .then(result =>{
            if(result.error){
                console.log("error",result.error);
                alert("something went wrong");
            }else{
               setTasks([result.newTask, ...tasks]);
               setStartDate('');
               setFinishDate('');
               setDescription('');
               setPercentageComplete('');
            }
        })
    }

    const deleteTask = (taskId) =>{
        fetch(`/api/v1/projects/${id}/tasks/${taskId}`,{
            method: 'delete',
            headers: {
             "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(result =>{
             if(result.error){
                 console.log("error",result.error);
                 alert("something went wrong");
             }else{
                 const newData = tasks.filter(item =>{
                     return item._id !== result.task._id
                 });
                 setTasks(newData);
             }
            
        });
    }

    const updateTaskPercentage=(taskId)=>{
        fetch(`/api/v1/projects/${id}/tasks/${taskId}`,{
            method: 'put',
            headers: {
             "Content-Type": "application/json"
            },
            body: JSON.stringify({
               percentage
            })
        }).then(res => res.json())
        .then(result =>{
             if(result.error){
                 console.log("error",result.error);
                 alert("something went wrong");
             }else{
                const newData = tasks.map(item =>{
                    if(item._id === result.task._id){
                        item.percentageComplete = percentage;
                    }
                    return item;
                });
                setTasks(newData);
             }
             setPercentage(0);
             setUpdate(0);
            
        })
    }

    return(
        <div className='task'>
            <h1>Tasks of {projectName}</h1>
            <div className='member'>
            <h2>Add Members</h2>    
            <input 
                type="text"
                placeholder="Write Member Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />
                 <div className='btn'>
                   <RiAddBoxFill  size="30px" onClick={()=>AddMember()}/>
                 </div>
                
                <div className='dropdown'>
                   <button class="dropbtn">Members</button>
                   <div className='dropdown-content'>
                        {
                            members.map(item =>{
                                return(
                                    <a>{item}<MdDelete size='25px' color='chocolate' onClick={()=>deleteMember(item)}/></a>
                                )
                            })
                        }
                    </div>
                </div>
                        
            </div>
            <div className="task-box">
                <div className='task-inputs'>
                    <h2>Enter following inputs to create a task: </h2>
                </div>
                <div className='task-inputs'>
                    <h2>Choose Start Date: </h2>
                    <input 
                        type="date"
                        placeholder="Write start date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className='task-inputs'>
                    <h2>Choose Finish Date: </h2>
                    <input 
                        type="date"
                        placeholder="Write finish date"
                        value={finishDate}
                        onChange={(e) => setFinishDate(e.target.value)}
                    />
                </div>
                <div className='task-inputs'>
                    <h2>Enter description: </h2>
                    <input 
                        type="text"
                        placeholder="Write description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='task-inputs'>
                    <h2>Enter description: </h2>
                    <input 
                        type="number"
                        placeholder="Write percentage complete"
                        value={percentageComplete}
                        onChange={(e) => setPercentageComplete(e.target.value)}
                    />  
                </div>
                <div className='task-inputs'>
                    <button onClick={()=>AddTask()}>Create Task</button>
                </div>
                {tasks.map(item => {
                    return(
                        <>
                        <div className='box'>
                            <h4>Description: {item.description}</h4>
                            <h4>Start date: {item.startDate.substring(0, 10)}</h4>
                            <h4>Finish date: {item.finishDate.substring(0, 10)}</h4>
                            <div className='percentage'>
                                <h4>Percentage Complete: {item.percentageComplete} %</h4>
                                <button onClick={()=>setUpdate(1)}>Update</button>
                            </div>
                            {
                                update ? (<div>
                                    <input 
                                    type="number"
                                    placeholder="Percentage"
                                    value={percentage}
                                    onChange={(e) => setPercentage(e.target.value)}
                                    />
                                    <button onClick={()=>updateTaskPercentage(item._id)}>done</button>
                                </div>): null
                            }
                            <div className="task-inputs">
                               <button onClick={()=>deleteTask(item._id)}>delete</button>
                            </div>
                            
                        </div>
                        </>
                    )
                })}
            </div>
            
        </div>
    )
}