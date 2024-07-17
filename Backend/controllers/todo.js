
const todoListSchema=require('../models/todoSchema')

const handleCreateTodo=async (req, res) => {
    const { text,createdBy } = req.body;
   
    await todoListSchema.create({ text,createdBy });
    res.json({ Message: "Todo Added" });
  }
  const handleGetUser = async (req, res) => {
    const { userId } = req.params;
   
  
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const todos = await todoListSchema.find({ createdBy: userId });
      console.log(todos)
      res.status(200).json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
 const handleDeleteTodo= async(req,res)=>{
    const {Id}=req.params;
   
    const deleteTodo= await todoListSchema.findByIdAndDelete(Id);
  
    if(!deleteTodo){
     
      res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Todo deleted successfully', deleteTodo });
  }
  module.exports={handleDeleteTodo,handleGetUser,handleCreateTodo}