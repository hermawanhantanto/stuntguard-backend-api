import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// createTaskHandler function
export const createTaskHandler = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId)
      return res.status(400).json({ message: "Missing required fields" });

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const task = await prisma.task.create({
      data: {
        title,
        content,
        assignedToUserId: userId,
      },
    });

    if (!task)
      return res.status(400).json({ message: "Failed to create task" });

    return res.status(201).json({
      message: "Succesfully created task",
      task,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// getTaskHandler function
export const getTaskHandler = async (req, res) => {
  try {
    const { userId } = req.body;

    const tasks = await prisma.task.findMany({
      where: {
        assignedToUserId: userId,
      },
    });

    if (!tasks)
      return res.status(404).json({ message: "Tasks not found", tasks: [] });

    return res.status(200).json({
      status: 200,
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// getTaskByIdHandler function
export const getTaskByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "Missing required fields" });

    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    return res.status(200).json({
      message: "Successfully retrieved task",
      task,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};



// deleteTaskHandler function
export const deleteTaskHandler = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id)
      return res.status(400).json({ message: "Missing required fields" });

    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!task) return res.status(404).json({ message: "Task not found" });

    await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      message: "Successfully deleted task",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
