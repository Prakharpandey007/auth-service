const AppError = require("./error-handler");
const { StatusCodes } = require("http-status-codes");

class ValidationError extends AppError {
  constructor(error) {
    let errorName = error.name;
    let explaination=[];
    // Object.keys(error.errors)
error.errors.forEach((err)=>{
explanation.push(err.message);
});
    super(
      errorName,
      "Not Able to Validate the data sent in the request",
      explaination,
      StatusCodes.BAD_REQUEST
    );
  }
}
module.exports=ValidationError;
