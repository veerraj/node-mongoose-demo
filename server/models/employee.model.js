const mongoose = require("mongoose");
const schema = mongoose.Schema;

const employeeSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
        type: String,
        required: true,
    },
    dob:{
       type:Date,
       required:true
    },
    dept_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    company_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    skill_id: {
      type: [mongoose.Schema.ObjectId],
      required: true,
    },
    ctc: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    isActive: {
      type:Boolean,
      default:false,
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "update_at",
    },
  }
);

module.exports = mongoose.model("employee", employeeSchema);
