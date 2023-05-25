const Student = require("../models/Student");

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const createNewStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findOneAndUpdate({ id: id }, req.body, {
      new: true,
    });
    res.json({ message: "Student updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findOneAndDelete({ id: id });
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
}