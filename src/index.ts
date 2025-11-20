#!/usr/bin/env node
import { TaskManager } from "./models/Task";
import { TaskPriority, TaskCreateInput } from "./types/task.types";

const args = process.argv.slice(2); // Ignore node et script.js
const command = args[0]; // Première vraie commande
const taskmanager = new TaskManager();

switch (command) {
  case "create":
    let taskinput;
    const taskInput: TaskCreateInput = {
      name: args[1],
      description: args[3],
      priority: args[2] as TaskPriority,
    };
    console.log(taskmanager.createTask(taskInput));
    break;

  case "list":
    if (args[1]) {
      const filter = args[1];
      console.log(taskmanager.getTasks(filter));
    } else {
      console.log(taskmanager.getTasks());
    }
    break;

  case "delete":
    const id = args[1];
    console.log(taskmanager.deleteTask(id));
    break;

  case "help":
  default:
    console.log(`
    Usage: task <command> [options]

    Commands:
      create <name> <priority> <description>   Create a new task
      list [filter]                            List all tasks or filter by name
      delete <id>                              Delete a task by ID
      [nothing]                                Show this help message

    Examples:
      task create "Buy milk" "very important" "Go to Lidl"
      task list
      task list mil
      task delete 3eb2e...

  `);
}
