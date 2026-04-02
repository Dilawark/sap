const Student = require("../models/Student");

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ user: req.user.id });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const createNewStudent = async (req, res) => {
  try {
    const userId = req.user.id;
    const student = new Student({
      ...req.body,
      user: userId,
    });
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const student = await Student.findOne({ id: id, user: userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    const updatedStudent = await Student.findOneAndUpdate(
      { id: id, user: userId },
      req.body,
      { new: true }
    );
    res.json({ message: "Student updated successfully", student: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const student = await Student.findOne({ id: id, user: userId });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    await Student.findOneAndDelete({ id: id, user: userId });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = {
  getAllStudents,
  createNewStudent,
  updateStudent,
  deleteStudent,
};