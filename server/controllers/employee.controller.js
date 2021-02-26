const Employee = require("../models/employee.model");
const Department = require("../models/department.model");
const Company = require("../models/company.model");
const Skill = require("../models/skill.model");
const mongoose = require('mongoose');

exports.addEmployee = async (req, res, next) => {
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

    // const department = await Department.find({ name: payload.dept_name });
    // if (!department || !department.length) {
    //   const errorObj = {
    //     error: "Department not exist",
    //     statusCode: 400,
    //   };
    //   return next(errorObj);
    // }

    // const skill = await Skill.find({ name: payload.skill_name });
    // if (!skill || !skill.length) {
    //   const errorObj = {
    //     error: "skill not exist",
    //     statusCode: 400,
    //   };
    //   return next(errorObj);
    // }

    const new_employee = new Employee({
      name: payload.name,
      address: payload.address,
      dept_id: payload.dept_id,
      company_id: payload.company_id,
      skill_id: payload.skill_id,
      ctc: payload.ctc,
      dob: payload.dob,
      designation: payload.designation,
      isActive:payload.isActive
    });

    try {
      const savedEmployee = await new_employee.save();
      res.status(201).json({ error: null, data: { empId: savedEmployee._id } });
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

exports.getAllEmployee = async (req, res, next) => {
  try {
    const result = await Employee.aggregate(
      [

      { $sort: { name:-1 }},  //sort by employee name
      // { $limit : 1 },
      // { $match: {isActive:false}},         //condition match isActive field
     
      // { $match: {
      //    $and: [
      //        { created_at :{ $lte: new Date('January 23, 2021 10:29:37')}}  //condition match if fetch only value which greater then create_at
      //    ] 
      // }},
      {
        $lookup: {
          from: "departments",
          localField: "dept_id",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $unwind: "$department",
      },
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
        $lookup: {
          from: "skills",
          let: { skill_id: "$skill_id" },
          pipeline: [
            {
              $match: {
                $expr: { $in: ["$_id", "$$skill_id"] },
              },
            },
          ],
          as: "skill",
        },
      },
      {
        $project: {
          name: 1,
          nameType:{$type:'$name'},
          designation: 1,
          created_at:1,
          // isActive:{
          //     $cond:{
          //         if:{
          //           $eq: [ '$isActive', false]
          //         },
          //         then:[],
          //         else:'$isActive'
          //     }
          // },
          "department.name": 1,
          "company.name": 1,
          "skill.name": 1,
          skillType:{$type: "$skill.name"}
          // count: { $sum: 1 }
        },
      },
      // { 
      //   $group: {     
      //       _id: {
      //         name:'$name',
      //         department: "$department.name",
      //       }, count: { $sum: 1 } 
      //   } 
      // }
    //  { $count : "total_employees"}
    ]);
    res.status(200).json({ error: null, data: result });
    console.log(result);
  } catch(error) {
    const errorObj = {
      error: error.message,
      statusCode: 400,
    };
    return next(errorObj);
  }
};


exports.getEmployeeById = async (req,res,next) => {
    try{
       const { paramsId } = req.params;
       objectId = mongoose.Types.ObjectId(paramsId); //convert paramid to objectid so can compare
       const result = await Employee.aggregate([
        { $match: {_id:objectId}},{
          $project:{
            name:1
          }
        }  
      ])
      res.status(200).json({ error: null, data: result });
    }
    catch(err){
      const errorObj = {
        error: err.message,
        statusCode: 400,
      };
      return next(errorObj);
    }
}


