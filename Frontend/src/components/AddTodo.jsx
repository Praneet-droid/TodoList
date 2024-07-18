import { TiTick } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { useDispatch } from 'react-redux'
import { deleteTodo, updateTodo } from "../store/AuthSlice";
import { useState } from "react";


function AddTodo({userTodos,handleDeleteTodo,setDeleteTodoItem}) {

const [editText,setEditText]=useState("");
const [input,setInput]= useState("");


const dispatch=useDispatch()

const editCompleted=(id)=>{
 setEditText("")
 setDeleteTodoItem(true)
 dispatch(updateTodo({id,text:input}))
    
    setInput('');
}



return (  
    <>
      {userTodos.length > 0 ? (
        userTodos.map((todo) => (
           todo._id!==editText?(
          <div key={todo.id}>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
               disabled
               key={todo.id}
                type="text"
                value={todo.text}
                id={todo.id}
                className="block w-full rounded-md border-1 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button onClick={()=>(setEditText(todo._id))} type="button" className="btn btn-warning p-0.5">
                  <FaEdit /></button>
                <button onClick={()=>handleDeleteTodo(todo._id)} type="button" className="btn btn-danger p-0">
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          </div>
        ): (  <div key={todo.id}>
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"></div>
              <input
              
                type="text"
              onChange={(e)=>(setInput(e.target.value))}
             
                id={todo.id}
                className="block w-full rounded-md border-1 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
              <button onClick={()=>editCompleted(todo._id)}
              
              type="button" className="btn btn-warning p-0.5">
              <TiTick /></button>
                <button type="button" onClick={()=>(dispatch(deleteTodo(todo.id)))} className="btn btn-danger p-0">
                  <MdDeleteForever />
                </button>
              </div>
            </div>
          </div>)))
        
    ): (<p>Enter Your First Todo</p>)
      }
      


    </>
  );
}

export default AddTodo;
