let tasks = [];
let editId = null; // To track which task is being edited

// Add or update task
function addTask() {
  let input = document.getElementById("taskInput");
  let taskText = input.value.trim();

  if (taskText !== "") {
    if (editId === null) {
      // Add new task
      let taskObject = {
        id: tasks.length + 1,
        title: taskText
      };
      tasks.push(taskObject);
    } else {
      // Update existing task
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === editId) {
          tasks[i].title = taskText;
          break;
        }
      }
      editId = null;
      document.querySelector("button").innerText = "Add Task";
    }

    input.value = "";
    displayTasks();
  }
}

// Show all tasks
function displayTasks() {
  let html = ""; 
  for (let i = 0; i < tasks.length; i++) {
    html += "<div class='task-item'>" +
            new Date().toLocaleString('en-GB', { hour12: true}) +
              "<span>" + tasks[i].title + "</span>" +
              "<button class='edit-btn' onclick='editTask(" + tasks[i].id + ")'>Edit</button>" +
              "<button class='delete-btn' onclick='deleteTask(" + tasks[i].id + ")'>X</button>" +
            "</div>";
  }

  document.getElementById("taskList").innerHTML = html;
}

// Delete task
function deleteTask(id) {
  let updatedTasks = [];

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== id) {
      updatedTasks.push(tasks[i]);
    }
  }

  tasks = updatedTasks;
  displayTasks();
}

// Edit task
function editTask(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      document.getElementById("taskInput").value = tasks[i].title;
      editId = id;
      document.querySelector("button").innerText = "Update Task";
      break;
    }
  }
}
