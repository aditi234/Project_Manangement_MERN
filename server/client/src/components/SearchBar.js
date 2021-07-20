import React, { useEffect, useState } from 'react';
import Navbar from './NavBar';
import './../css/search.css';

export default function SearchBar(){
    const [tasks, setTasks] = useState([]);
    const [deadlineBefore, setDeadlineBefore] = useState('');
    const [deadlineAfter, setDeadlineAfter] = useState('');
    const [percentageComplete, setPercentageComplete] = useState('');
    const [projectName, setProjectName] = useState('');
    
    const Search = () =>{
        let token=localStorage.getItem('jwt');
        fetch('/api/v1/search/',{
            method:"post",
            headers:{
                "Authorization": "Bearer "+ token,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                deadlineBefore,
                deadlineAfter,
                projectName,
                percentageComplete
            })
        }).then(res => res.json())
        .then(result =>{
            if(result.error){
                console.log("error",result.error);
                alert("something went wrong");
            }else{
                setTasks(result.query);
                
            }
        })
        setProjectName('');
        setDeadlineAfter('');
        setDeadlineBefore('');
        setPercentageComplete('');
    }

    return (
        <div className='search'>
            <Navbar />
            <h1>SearchBar</h1>
            <div className='search-inputs'>
                <h2>Deadline Before: </h2>
                <input 
                type="date"
                placeholder="Deadline Before"
                value={deadlineBefore}
                onChange={(e) => setDeadlineBefore(e.target.value)}
                />
            </div>
            <div className='search-inputs'>
                <h2>Deadline After: </h2>
                <input 
                type="date"
                placeholder="Deadline After"
                value={deadlineAfter}
                onChange={(e) => setDeadlineAfter(e.target.value)}
                />
            </div>
            <div className='search-inputs'>
                <h2>Project Name: </h2>
                <input 
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                />
            </div>
            <div className='search-inputs'>
                <h2>Sort all tasks in increasing order of Percentage Complete: </h2>
                <input 
                type="text"
                placeholder="yes/no"
                value={percentageComplete}
                onChange={(e) => setPercentageComplete(e.target.value)}
                /> 
                
            </div>
            <div className='search-inputs'>
                <button onClick={()=>Search()}>Search</button>
            </div>
                 
           {
                tasks.map(item=>{
                    return(
                        <div className='box'>
                            <h3 className='search-inputs'>{item.projectName}</h3>
                            <h4>Description: {item.description}</h4>
                            <h4>Start date: {item.startDate.substring(0, 10)}</h4>
                            <h4>Finish date: {item.finishDate.substring(0, 10)}</h4>
                            <h4>Percentage Complete: {item.percentageComplete} %</h4>
                        </div>
                    )
                })
            }
        </div>
    )
}