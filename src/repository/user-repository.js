const { User, Role } = require("../models/index");

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
        if(error.name=='SequelizeValidationError'){
            console.log("creating a new validation error");
            let validationError=new validationError(error);
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
      return user;
    } catch (error) {
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
