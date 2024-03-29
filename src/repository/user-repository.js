const { StatusCodes } = require("http-status-codes");
const { User, Role } = require("../models/index");
const ValidationError = require('../utils/validation-error');
const ClientError=require('../utils/client-error');
class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
        if(error.name=='SequelizeValidationError'){
            console.log("creating a new validation error");
            let validationError=new ValidationError(error);
            throw new validationError(error);

        }
      

      console.log("something wen twrong in repository layer");
      throw error;
    }
  }

  async destroy(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log("something wen twrong in repository layer");
      throw error;
    }
  }
  async getById(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ["email", "id"],
      });
      return user;
    } catch (error) {
      console.log("something went wrong in user repository");
      throw error;
    }
  }

  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
      
      if(!user){
        throw new ClientError(
            'Attribute NotFound',
            'Invalid email sent in the request',
            'Please check the email as there is no record of the email',
            StatusCodes.NOT_FOUND
        );
      }
      return user;
    } catch (error) {
        console.log(error);
      console.log("something went wrong in repository layer");
      throw error;
    }
  }
  async isAdmin(userId) {
    try {
      // console.log(userId)
      const user = await User.findByPk(userId);

      const adminRole = await Role.findOne({
        where: {
          name: "ADMIN",
        },
      });

      return user.hasRole(adminRole);
    } catch (error) {
      console.log("something went wrong in isadmin fn in  repository layer");
      throw error;
    }
  }
}

module.exports = UserRepository;
