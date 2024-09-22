const {
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
} = require("./task");

// Get the arguments from the command line (excluding 'node' and the script name)
const args = process.argv.slice(2);

// Simple command handling
const command = args[0];

if (command === "add") {
  const description = args.slice(1).join(" ");
  if (description) {
    addTask(description);
  } else {
    console.log("Please provide a description for the task.");
  }
} else if (command === "update") {
  const id = parseInt(args[1], 10);
  const description = args.slice(2).join(" ");
  if (!isNaN(id) && description) {
    updateTask(id, description);
  } else {
    console.log("Please provide a valid task ID and description.");
  }
} else if (command === "mark-in-progress") {
  const id = parseInt(args[1], 10);
  if (!isNaN(id)) {
    markInProgress(id);
  } else {
    console.log("Please provide a valid task ID.");
  }
} else if (command === "mark-done") {
  const id = parseInt(args[1], 10);
  if (!isNaN(id)) {
    markDone(id);
  } else {
    console.log("Please provide a valid task ID.");
  }
} else if (command === "list") {
  if (args[1] === "done") {
    listDoneTasks();
  } else if (args[1] === "todo") {
    listTodoTasks();
  } else if (args[1] === "in-progress") {
    listInProgressTasks();
  } else {
    listTasks();
  }
} else if (command === "complete") {
  const id = parseInt(args[1], 10);
  if (!isNaN(id)) {
    completeTask(id);
  } else {
    console.log("Please provide a valid task ID.");
  }
} else if (command === "delete") {
  const id = parseInt(args[1], 10);
  if (!isNaN(id)) {
    removeTask(id);
  } else {
    console.log("Please provide a valid task ID.");
  }
} else {
  console.log(
    "Invalid command. Use one of the following: add, list, complete, remove"
  );
}
