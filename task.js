const fs = require("fs");
const path = require("path");

// File path for storing tasks
const tasksFilePath = path.join(__dirname, "tasks.json");

// Generate a unique task ID
function generateId(tasks) {
  return tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
}

// Add a task with id, createdAt, and updatedAt
function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: generateId(tasks),
    description,
    status: "todo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Task added successfully (ID:${newTask.id})`);
}

// Update the description of a task by id
function updateTask(id, description) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.description = description;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ${id} updated successfully.`);
  } else {
    console.log("Task not found.");
  }
}

// Remove a task by id
function removeTask(id) {
  const tasks = loadTasks();
  const index = tasks.findIndex((t) => t.id === id);
  if (index !== -1) {
    const removedTask = tasks.splice(index, 1);
    saveTasks(tasks);
    console.log(`Removed task: ${removedTask[0].description}`);
  } else {
    console.log("Task not found.");
  }
}

// Marking a task as in progress by id
function markInProgress(id) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.status = "in-progress";
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ${id} marked as in progress.`);
  } else {
    console.log("Task not found.");
  }
}

// Marking a task as done by id
function markDone(id) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.status = "done";
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ${id} marked as done.`);
  } else {
    console.log("Task not found.");
  }
}

// Load tasks from the tasks.json file
function loadTasks() {
  try {
    const dataBuffer = fs.readFileSync(tasksFilePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return []; // Return an empty array if no file exists
  }
}

// List all tasks with id and timestamps
function listTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No tasks available.");
  } else {
    tasks.forEach((task) => {
      console.log(`${task.id}. ${task.description} - ${task.status}`);
      console.log(`   Created: ${task.createdAt} | Updated: ${task.updatedAt}`);
    });
  }
}

// List all done tasks
function listDoneTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No tasks available.");
  } else {
    const doneTasks = tasks.filter((task) => task.status === "done");
    if (doneTasks.length === 0) {
      console.log("No tasks marked as done.");
    } else {
      doneTasks.forEach((task) => {
        console.log(`${task.id}. ${task.description} - ${task.status}`);
        console.log(
          `   Created: ${task.createdAt} | Updated: ${task.updatedAt}`
        );
      });
    }
  }
}

// List all todo tasks
function listTodoTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No tasks available.");
  } else {
    const todoTasks = tasks.filter((task) => task.status === "todo");
    if (todoTasks.length === 0) {
      console.log("No tasks marked as todo.");
    } else {
      todoTasks.forEach((task) => {
        console.log(`${task.id}. ${task.description} - ${task.status}`);
        console.log(
          `   Created: ${task.createdAt} | Updated: ${task.updatedAt}`
        );
      });
    }
  }
}

// List all in progress task
function listInProgressTasks() {
  const tasks = loadTasks();
  if (tasks.length === 0) {
    console.log("No tasks available.");
  } else {
    const inProgressTasks = tasks.filter(
      (task) => task.status === "in-progress"
    );
    if (inProgressTasks.length === 0) {
      console.log("No tasks marked as in progress.");
    } else {
      inProgressTasks.forEach((task) => {
        console.log(`${task.id}. ${task.description} - ${task.status}`);
        console.log(
          `   Created: ${task.createdAt} | Updated: ${task.updatedAt}`
        );
      });
    }
  }
}

// Save tasks to the tasks.json file
function saveTasks(tasks) {
  const dataJSON = JSON.stringify(tasks, null, 2); // Pretty print JSON for better readability
  fs.writeFileSync(tasksFilePath, dataJSON);
}

// Mark a task as completed and update the updatedAt timestamp
function completeTask(id) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = true;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`Task ${id} marked as completed.`);
  } else {
    console.log("Task not found.");
  }
}

module.exports = {
  addTask,
  updateTask,
  markInProgress,
  markDone,
  listTasks,
  listDoneTasks,
  listTodoTasks,
  listInProgressTasks,
  completeTask,
  removeTask,
};
