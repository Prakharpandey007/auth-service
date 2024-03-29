const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");
const AppErrors = require("../utils/error-handler");
class UserService {
  constructor() {
    this.UserRepository = new UserRepository();
  }
  async create(data) {
    try {
      const user = await this.UserRepository.create(data);
      return user;
    } catch (error) {
      if (error.name == "SequelizeValidationError") {
        throw error;
      }
      console.log("something went wrong in service layer");
      //   throw new AppErrors(
      //     "ServerError",
      //     "Something went wrong in service ",
      //     "Logical Issue Found",
      //     500
      //   );
      throw error;
    }
  }

  async signIn(email, plainPassword) {
    try {
      //step -1  fetch the user by using email

      const user = await this.UserRepository.getByEmail(email);

      //step -2  comapre incoming plain password to store encrypted password

      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("password doesnot match in service layer");
        throw {
          error: "incorrect password",
        };
      }
      //step 3 if password is match then create a token and send it to the user

      const newJWT = this.createToken({
        email: user.email,
        id: user.id,
      });
      return newJWT;
    } catch (error) {
      if (error.name == "Attribute NotFound") {
        throw error;
      }
      console.log("something went wrong in signin process in service layer");
      throw error;
    }
  }

  async isAuthenticated(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw {
          error: "invalid token",
        };
      }
      const user = await this.UserRepository.getById(response.id);
      if (!user) {
        throw {
          error: "no user with the corresponding token exists",
        };
        return user.id;
      }
    } catch (error) {
      console.log("something went wrong in signin process in serive layer");
      throw error;
    }
  }

  createToken(user) {
    try {
      const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
      return result;
    } catch (error) {
      console.log("something went wrong in token creation in service layer");
      throw error;
    }
  }
  verifyToken(token) {
    try {
      const response = jwt.verify(token, JWT_KEY);
      return response;
    } catch (error) {
      console.log(
        "something went wrong in token validation in service layer",
        error
      );
      throw error;
    }
  }
  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log(
        "something went wrong in password comparision in service layer"
      );
      throw error;
    }
  }

  isAdmin(userId) {
    try {
      return this.UserRepository.isAdmin(userId);
    } catch (error) {
      console.log("something went wrong in isAdmin in service layer");
      throw error;
    }
  }
}

module.exports = UserService;
