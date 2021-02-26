const Company = require("../models/company.model");

exports.addCompany = async (req, res, next) => {
  try {
    const payload = req.body;

    const new_dept = new Company({
      name: payload.name,
      address: payload.address,
      type_of_comapny:payload.type_of_comapny,
      website_url:payload.website_url,
      revenue:payload.revenue,
      description: payload.description,
    });

    try {
      const savedCompany = await new_dept.save();
      res.status(201).json({ error: null, data: { compId: savedCompany._id } });
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

exports.getCompanies = async (req, res, next) => {
    try {
      const result = await Company.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "_id",
            foreignField: "company_id",
            as: "department",
          },
        },
        // {
        //   $unwind: "$department",
        // },
        {
          $lookup: {
            from: "employees",
            "let": { "id": "$_id" },
            "pipeline": [
              { "$match": { "$expr": { "$eq": ["$company_id", "$$id"] }}},
              { "$lookup": {
                "from": "skills",
                "let": { "skill_id": "$skill_id" },
                "pipeline": [
                  { "$match": { "$expr": { "$in": ["$_id", "$$skill_id"] }}}
                ],
                "as": "skills"
              }}
            ],
            // localField: "_id",
            // foreignField: "company_id",
            as: "employee",
          },
        },
        {
          $project: {
            name: 1,
            description: 1,
            revenue:{
               $concat: [ "'$'",{ $toString: "$revenue" }, " M" ] //convert data type and modified data logic
            }, 
            isBigCompany:{         //custom data on the basis of cond (using condition and if/else operator)
              $cond: { if: { $gt: [ "$revenue", 5 ] }, then: true, else: false }
            }, 
            "department": "$department.name",
            // "department.description": 1,
            "employee.name":1,
            "employee.designation":1,
            "employee.skills.name":1,
            //  {
            //     // $filter: {
            //     //   input: "$employee.skills",
            //     //   as: "skill",
            //       $cond: { $eq: [ "$employee.skills.name", "React" ] }
            //   // }
            // },
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

