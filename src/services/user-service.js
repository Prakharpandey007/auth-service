const UserRepository=require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const {JWT_KEY}=require('../config/serverConfig');
class UserService{
    constructor(){
        this.UserRepository=new UserRepository();

    }
    async create(data){
        try {
            const user=await this.UserRepository.create(data);
            return user;
        } catch (error) {
            console.log("something went wrong in service layer");
            throw error;
        }
    }

    createToken(user){
try {
    const result=jwt.sign(user,JWT_KEY,
        {expiresIn:'1d'}
        );
        return result;
} catch (error) {
    console.log("something went wrong in token creation in service layer");
    throw error;
}
   }
   verifyToken(token){
    try {
        const response=jwt.verify(token,JWT_KEY);
        return response;
    } catch (error) {
        console.log("something went wrong in token validation in service layer",error);
        throw error;
        
    }
   }
checkPassword(userInputPlainPassword,encryptedPassword){
    try {
        return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
    } catch (error) {
        console.log("something went wrong in password comparision in service layer");
        throw error;
    }
}

}

module.exports=UserService;
