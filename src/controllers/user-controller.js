const { response } = require("express");
const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
  try {
    const response = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      success: true,
      message: "successfully created new user",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode).json({
      message:error.message,
      data: [],
      success: false,
      err: error.explanation,
    });
  }
};
const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      success: true,
      data: response,
      err: {},
      message: "successfully signed in",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong in signIn function in controller",
      data: [],
      success: false,
      err: error,
    });
  }
};

const isAuthenticated = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const response = await userService.isAuthenticated(token);
    return res.status(200).json({
      success: true,
      err: {},
      data: response,
      message: "user is authenticated and token is valid",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong in signIn function in controller",
      data: [],
      success: false,
      err: error,
    });
  }
};
const isAdmin = async (req, res) => {
  try {
    // console.log(req.body)
    const response = await userService.isAdmin(req.body.id);
    return res.status(200).json({
      data: response,
      err: {},
      success: true,
      message: "successfully fetched wheater user is admin or not ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "something went wrong in admin function in controller",
      data: [],
      success: false,
      err: error,
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticated,
  isAdmin,
};
