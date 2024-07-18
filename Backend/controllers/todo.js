
const todoListSchema=require('../models/todoSchema')
const { ObjectId } = require('mongodb');
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

  const handleUpdateTodo= async(req,res)=>{

    const id=req.params.Id;
    
    const {text}=req.body;
    
    
    
    const updateTodo= await todoListSchema.updateOne(
      { _id: id },
      { $set: { text: text } }
    );
    console.log(updateTodo)
    if(!updateTodo)
    {
      res.status(500).json({error:"Updation Failed"})
    }
    res.status(200).json({message:"Update SuccessFull"})
  }
  module.exports={handleDeleteTodo,handleGetUser,handleCreateTodo,handleUpdateTodo}