// screen3.js

// Retrieve scheduled tasks from localStorage
const scheduledTasks = JSON.parse(localStorage.getItem('scheduledTasks')) || [];

document.getElementById("idPrint").innerHTML = JSON.stringify(scheduledTasks,
  null, 4);
// Create a list of scheduled tasks
const taskList = document.createElement('ul');
taskList.classList.add('list-group');

scheduledTasks.forEach((task) => {
  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item');

  const taskNameSpan = document.createElement('span');
  taskNameSpan.classList.add('task-name');
  taskNameSpan.textContent = task.task;

  const taskTimeSpan = document.createElement('span');
  taskTimeSpan.classList.add('task-time');
  taskTimeSpan.textContent = `Time: ${task.scheduledTime}`;

  listItem.appendChild(taskNameSpan);
  listItem.appendChild(taskTimeSpan);

  listItem.style.display = 'flex';
  listItem.style.justifyContent = 'space-between';

  taskList.appendChild(listItem);
});

const taskContainer = document.querySelector('.task-list');
taskContainer.appendChild(taskList);