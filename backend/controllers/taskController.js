import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
const addTask = async (req, res) => {
    const { title, description, priority } = req.body;
    console.log(priority);
    const userId = req.user.id;
    const user = await userModel.find({_id: userId});
    const newTask = new taskModel({ title, description, priority, userId,completed: false  })
    newTask.save()
        .then(() => {
            return (res.status(200).json({ message: "Task added successfully" }))
        })
        .catch((error) => {
            return (
                res.status(500).json({ message: error.message })
            )
        }
        )
}
const removeTask = (req, res) => {
    const { id } = req.user.id;
    console.log("id: ", id);
    taskModel.findByIdAndDelete(id)
        .then(() => res.status(200).json({ message: "Task deleted successfully" }))
        .catch((error) => res.status(501).json({ message: error.message }))
}

const getTask = (req, res) => {
    taskModel.find({ userId: req.user.id })
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(501).json({ message: error.message }))
}
export { addTask, getTask,removeTask }
