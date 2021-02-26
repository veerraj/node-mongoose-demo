const mongoose = require("mongoose");
const schema = mongoose.Schema;

const deptSchema = new schema(
  {
    name: {
      type: String,
      required: true,
    },
    company_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "update_at",
    },
  }
);

module.exports = mongoose.model("department", deptSchema);
