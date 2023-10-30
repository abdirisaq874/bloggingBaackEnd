const Employee = require('../models/Employees');

const { StatusCodes } = require('http-status-codes');
const CustomError = require('../Errors');

const { checkPermissions } = require('../Utils');
const User = require('../models/User');

const createEmployee = async (req, res) => {
  const {
    bio,
    titleAtOrbiba,
    description,
    salary,
    employmentStatus,
    location,
    experienceLevel,
    userId,
  } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`);
  }

  // check if the user is already an employee
  const employeeAlreadyExists = await Employee.findOne({ user: userId });
  if (employeeAlreadyExists) {
    throw new CustomError.BadRequestError(
      `User with id : ${userId} is already an employee`
    );
  }

  const employee = await Employee.create({
    bio,
    titleAtOrbiba,
    description,
    salary,
    employmentStatus,
    location,
    experienceLevel,
    user: userId,
  });
  res.status(StatusCodes.CREATED).json({ data: employee });
};
const getAllEmployees = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 10; // Number of employees per page

  const skip = (page - 1) * limit;

  const employees = await Employee.find({})
    .populate({
      path: 'user',
      select: 'name email',
    })
    .skip(skip)
    .limit(limit);

  const totalEmployees = await Employee.countDocuments();

  const totalPages = Math.ceil(totalEmployees / limit);

  const response = {
    data: {
      employees,
      currentUser: req.user.userId,
    },
    meta: {
      pagination: {
        total: totalEmployees,
        limit,
        page,
        totalPages,
      },
    },
  };

  res.status(StatusCodes.OK).json(response);
};

module.exports = {
  createEmployee,
  getAllEmployees,
};
