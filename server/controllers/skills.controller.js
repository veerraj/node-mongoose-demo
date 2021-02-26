const Employee = require("../models/employee.model");
const Skill = require("../models/skill.model");

exports.addSkills = async (req, res, next) => {
  try {
    const payload = req.body;

    const skill = await Skill.find({ name: payload.name });

    if (!skill || skill.length) {
      const errorObj = {
        error: "Skill already exist! Please add new skill",
        statusCode: 400,
      };
      return next(errorObj);
    }

    const new_skill = new Skill({
      name: payload.name
    });

    try {
      const savedSkill = await new_skill.save();
      res.status(201).json({ error: null, data: { skillId: savedSkill._id } });
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

exports.getSkills = async (req, res, next) => {
  try {
    const payload = req.body;

    try {
      const skills = await Skill.find({});
      res.status(201).json({ error: null, data: skills });
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


