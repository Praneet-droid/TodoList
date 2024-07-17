
const express = require("express");
const cookieParser = require("cookie-parser")
const app = express();

const router=express.Router()
const {handleSignUp,handleLogin}=require('../controllers/user')
const {restrictedLoginUserOnly}=require('../middlewares/auth')
const {handleDeleteTodo,handleGetUser,handleCreateTodo}=require('../controllers/todo')


app.use(cookieParser());
router.post("/todos",restrictedLoginUserOnly,handleCreateTodo);
  
  router.post("/signup",handleSignUp );
  
  router.post("/login",handleLogin);


  router.get('/todos/:userId',handleGetUser )
  router.delete("/todos/:Id",handleDeleteTodo)
  
  
  module.exports=router;