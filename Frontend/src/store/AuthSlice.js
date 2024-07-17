import { createSlice,  createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    {
      completed: false,
      createdAt: "2024-07-07T17:44:54.003Z",
      createdBy: "66856031f00f0df7c859796a",
      text: "erer",
      updatedAt: "2024-07-07T17:44:54.003Z",
      __v: 0,
      _id: "668ad415ab6a8627546fa69f",
    },
  ],
};

export const createTodo = createAsyncThunk(
  "todos/createTodo",
  async (newTodo, thunkAPI) => {
    const { text, createdBy } = newTodo;
    
    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",    
        },
        body: JSON.stringify({ text, createdBy }),
         credentials: 'include'
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const deleteTodo= createAsyncThunk("todos/deleteTodo",
  async (todoId,thunkAPI) =>{
    try{
      const response=await fetch(`http://localhost:8000/todos/${todoId}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
        },
        credentials: 'include'
      })
 
      const data = await response.json();

      return data;
    }
    catch(error){
      return thunkAPI.rejectWithValue({ error: error.message });


    }
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
 
    setUserId(state, action) {
   
      state.userId = action.payload;
    },

    updateTodo(state, action) {
      const { id, text } = action.payload;

      const todo = state.todos.find((todo) => todo.id === id);

      if (todo) {
        todo.text = text;
      }
    },
  },
});

export const {  updateTodo, setUserId } = authSlice.actions;
export default authSlice.reducer;
