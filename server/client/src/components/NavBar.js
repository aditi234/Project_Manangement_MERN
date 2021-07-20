import React from 'react';
import { FaProjectDiagram } from 'react-icons/fa';
import {BsListCheck} from 'react-icons/bs';
import {ImSearch} from 'react-icons/im';
import './../css/navbar.css';

export default function Navbar(){
    return(
        <>
            <div className='navbar'>
                <ul>
                    <li><a href='/project'><FaProjectDiagram />Your Projects</a></li>
                    <li><a href='/search'><ImSearch />Search</a></li>
                    <li><a href='/todo'><BsListCheck />ToDo List</a></li>
                </ul>
            </div>
        </>
    )
}
