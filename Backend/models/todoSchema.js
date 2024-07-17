
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema(
    {
      createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "todoUser",
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );
  const todoListSchema = mongoose.model("todoschema", todoSchema);

  module.exports=todoListSchema;