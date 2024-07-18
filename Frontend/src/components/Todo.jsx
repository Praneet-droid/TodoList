import InputField from "../components/InputField";
import AddTodo from "../components/AddTodo";
import { Provider } from "react-redux";
import store from '../store/store'
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {createTodo,deleteTodo } from "../store/AuthSlice";
 function Todo(){
    const [userTodos,setUserTodos]=useState([]);
    const [deleteTodoItem,setDeleteTodoItem]=useState(false);
    const userId = useSelector((state) => state.auth.userId);
    
    const [input,setInput]=useState("");
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchTodos = async (userId) => {
            console.log("fetchTodo")
        try {
          const url = new URL(`http://localhost:8000/todos/${userId}`);
         
      
          const response = await fetch(url);
       
        
      
       if(!response.ok){
        console.log("Response Error")
       
       }
      
          const todos = await response.json();
       
          setUserTodos(todos);
          
          
        } catch (error) {
          console.error('Error fetching todos:', error);
        }
       
      };fetchTodos(userId);
      setDeleteTodoItem(false)
    },[userId,dispatch,deleteTodoItem]) 

      
  const handleDeleteTodo=(todoId)=>{
    
    dispatch(deleteTodo(todoId));
    setDeleteTodoItem(true);
    
  }
  const handleKeyPress=(e)=>{
    if (e.key === 'Enter') {
        handleAddTodo();
      }

  }
      
  
      
      const handleAddTodo = () => {
setDeleteTodoItem(true)
        if (userId) {
          dispatch(createTodo({
            text: input,
            createdBy: userId,
          }));
         
          setInput('');
        } else {
          console.error('User ID is not available');
        }
      };
      
     
      
return (
    <>  
    <Provider store={store}>
    <InputField handleAddTodo={handleAddTodo} setInput={setInput} input={input} handleKeyPress={handleKeyPress}  />
    <AddTodo userTodos={userTodos} handleDeleteTodo={handleDeleteTodo} setDeleteTodoItem={setDeleteTodoItem}/>
   
    </Provider>
    </>

);
}

export default Todo;