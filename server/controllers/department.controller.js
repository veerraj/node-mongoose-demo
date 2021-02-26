const Department = require("../models/department.model");
const Company = require("../models/company.model");

exports.addDepartment = async (req, res, next) => {
  try {
    const payload = req.body;

    // const company = await Company.find({ name: payload.company_name });
    // console.log(company, payload.company_name);

    // if (!company || !company.length) {
    //   const errorObj = {
    //     error: "Company not exist",
    //     statusCode: 400,
    //   };
    //   return next(errorObj);
    // }

    const new_dept = new Department({
      name: payload.name,
      company_id: payload.company_id,
      description: payload.description,
    });

    try {
      const savedDept = await new_dept.save();
      res.status(201).json({ error: null, data: { deptId: savedDept._id } });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } catch (err) {
    const errorObj = {
      error: error.message,
      statusCode: 400,
    };
    return next(errorObj);
  }
};

exports.getDepartments = async (req, res, next) => {
  try {
    const result = await Department.aggregate([
      {
        $lookup: {
          from: "companies",
          localField: "company_id",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },
      {
        $project: {
          name: 1,
          description: 1,
          "company": 1,
          isBigCompany:{
             $cond : { if: {$gt : ["$company.revenue",5]}, then: true, else: false}  //custom condition
          }
        },
      },
    ]);
    res.status(200).json({ error: null, data: result });
  } catch (err) {
    console.log(err);
    const errorObj = {
      error: err.message,
      statusCode: 400,
    };
    return next(errorObj);
  }
};
