const express=require('express');
const bodyParser=require('body-parser');
const {PORT}=require('./config/serverConfig');
const apiRoutes=require('./routes/index');

// const {User}=require('./models/index')
// const bcrypt=require('bcrypt');
// const UserRepository=require('./repository/user-repository');

//checking of valid token or not 

// const UserSevice=require('./services/user-service');

const app= express();

const prepareAndStartServer=()=>{
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use('/api',apiRoutes);

    app.listen(PORT,async ()=>{
        console.log(`server start on Port:${PORT}`);
// const repo=new UserRepository();
// const response=await repo.getById(1);
// console.log(response);

//         const incomingpassword='12345678';
// const user=await User.findByPk(3);

//         const response=bcrypt.compareSync(incomingpassword,user.password);
//         console.log(response);

// const service=new UserSevice();
// const newToken=service.createToken({email:"pandey@admin.com",id:1});
// console.log("new token is",newToken);
// const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhbmRleUBhZG1pbi5jb20iLCJpZCI6MSwiaWF0IjoxNzExNjA5MjA0LCJleHAiOjE3MTE2MDkyMzR9.9XIfCzAlkrVPoFuNSuqFRx4QnpLUcB4CU7_GAxJ-zMk'
// const response=service.verifyToken(token);

// console.log(response);
    });
}
prepareAndStartServer();
