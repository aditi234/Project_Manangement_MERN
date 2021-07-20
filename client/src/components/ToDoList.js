import React,{useEffect, useState} from 'react';
import Navbar from './NavBar';
import './../css/todo.css';
import {MdDelete} from 'react-icons/md';
import {ImCheckboxUnchecked, ImCheckboxChecked} from 'react-icons/im';

export default function ToDoList(){
    const [data, setData] = useState([]);
    const [task, setTask] = useState('');

    useEffect(()=>{
        let token=localStorage.getItem('jwt');
        fetch('/api/v1/toDo/',{
            headers:{
                "Authorization": "Bearer "+ token
            }
        }).then(res => res.json())
        .then(result =>{
            if(result.error){
                console.log("error",result.error);
                alert("something went wrong");
            }else{
                setData(result.tasks);
            }
        })
    },[]);

    
    const AddTask = () =>{
        let token=localStorage.getItem('jwt');
        fetch('/api/v1/toDo/',{
            method: "post",
            headers: {
                "Authorization": "Bearer "+ token,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                task
            })
        })
        .then(res=> res.json())
        .then(result =>{
            if(result.error){
                console.log("error",result.error);
                alert("something went wrong");
            }else{
                setData([...data,result.newTasks]);
                setTask('');
            }
        })
        
    }

    const deleteTask = (taskId)=>{
       fetch(`/api/v1/toDo/${taskId}`,{
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
                const newData = data.filter(item =>{
                    return item._id !== result.task._id
                });
                setData(newData);
            }
           
       })
    }

    const statusUpdate = (taskId) =>{
        fetch(`/api/v1/toDo/${taskId}`,{
            method: 'put',
            headers: {
             "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(result =>{
             if(result.error){
                 console.log("error",result.error);
                 alert("something went wrong");
             }else{
                const newData = data.map(item =>{
                    if(item._id === result.task._id){
                        item.status = !item.status;
                    }
                    return item;
                });
                setData(newData);
             }
            
        })
    }
    
    return(
        <div>
            <Navbar />
            <h1 className='todo'>To Do Lists </h1>
            <div className="createTask">
                <input 
                type="text"
                placeholder="Write Task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                 />
                <button onClick={()=>AddTask()}>+</button>
            </div>
            {
                data.map(item=>{
                    return(
                        <div className='slip'>
                            <button onClick={()=>statusUpdate(item._id)}>
                                {item.status ? 
                                       (<ImCheckboxChecked size='25px' color='chocolate' />):
                                       (<ImCheckboxUnchecked size='25px' color='chocolate'/>)
                                }
                            </button>
                            <h3>{item.task}</h3>
                            <button ><MdDelete onClick={()=>deleteTask(item._id)} size='25px' color='chocolate'/></button>
                        </div>
                        
                    )
                })
            }
            
        </div>
    );
}