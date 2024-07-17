const jwt =require('jsonwebtoken')
const secretKey="Babu@1234"
const setUser = ( user) => {
 const payload={
  _id:user._id,
  email:user.email,
 }

 return jwt.sign(payload,secretKey);
}

const getUser = (token) => {

    if(!token)return null; 
  return  jwt.verify(token,secretKey);
  
}

module.exports = { getUser, setUser };

