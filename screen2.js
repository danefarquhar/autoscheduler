

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Sort tasks by priority
tasks.sort((a, b) => a.priority - b.priority);

// Create a list of tasks
const taskList = document.createElement('ul');
taskList.classList.add('list-group');

tasks.forEach((task) => {
  const listItem = document.createElement('li');
  listItem.classList.add('list-group-item');
  
  const taskNameSpan = document.createElement('span');
  taskNameSpan.textContent = task.task;
  
  const timeNeededSpan = document.createElement('span');
  timeNeededSpan.classList.add('time-needed');
  timeNeededSpan.textContent = `${task.timeNeeded} mins`;
  
  listItem.appendChild(taskNameSpan);
  listItem.appendChild(timeNeededSpan);
  
  listItem.style.display = 'flex';
  listItem.style.justifyContent = 'space-between';


  taskList.appendChild(listItem);
});

const tasksContainer = document.querySelector('.tasks');
tasksContainer.appendChild(taskList);

function clearTasks() {
  // Clear tasks from localStorage
  localStorage.removeItem('tasks');

  // Clear the task list on the page
  tasksContainer.innerHTML = "<p>No tasks available.</p>";
}


function handleAutoSchedule() {
    const startTime = prompt('Enter the start time (in 24-hour format, e.g., 08:00)');
    const endTime = prompt('Enter the end time (in 24-hour format, e.g., 17:00)');
  
    // Validate the input
    if (!startTime || !endTime) {
      alert('Invalid time range. Please try again.');
      return;
    }
  
    const start = parseTime(startTime);
    const end = parseTime(endTime);
  
    if (!start || !end || start >= end) {
      alert('Invalid time range. Please try again.');
      return;
    }
  
    const totalTaskTime = tasks.reduce((total, task) => total + task.timeNeeded, 0);
    const totalTime = end - start - totalTaskTime;
  
    // Create a new array to store the scheduled tasks
    const scheduledTasks = [];
    let scheduledTime = start;
  
    tasks.forEach((task) => {
      const scheduledTimeString = formatTime(scheduledTime);
      scheduledTasks.push({ ...task, scheduledTime: scheduledTimeString });
      scheduledTime = addMinutes(scheduledTime, task.timeNeeded);
    });
  
    // Store the scheduled tasks in localStorage for screen3.html
    localStorage.setItem('scheduledTasks', JSON.stringify(scheduledTasks));
  
    // Redirect to screen3.html
    window.location.href = 'screen3.html';
  }

// Helper functions for time manipulation

function parseTime(timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      return null;
    }
    return hours * 60 + minutes;
  }
  
  function addMinutes(time, minutes) {
    return time + minutes;
  }
  
  function formatTime(time) {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    return `${padZero(hours)}:${padZero(minutes)}`;
  }
  
  function padZero(number) {
    return number.toString().padStart(2, '0');
  }