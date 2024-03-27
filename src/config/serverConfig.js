const dotenv=require('dotenv');
const bcrypt=require('bcrypt');
dotenv.config();

module.exports={
    PORT:process.env.PORT,
    //generate SALT using the genSaltSync function.
    SALT:bcrypt.genSaltSync(10)
}