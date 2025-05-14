const API_URL = 'http://localhost:3001/tasks';

// Elements
const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskDesc = document.getElementById('task-desc');
const taskList = document.getElementById('task-list');
const taskCounts = document.getElementById('taskCounts');

let taskChart; // Chart instance


async function fetchTasks() {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    renderTasks(tasks);
    updateTaskChart(tasks); // Update chart as well
}

// Render tasks in a table-like layout
function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const row = document.createElement('div');
        row.className = 'task-row' + (task.is_completed ? ' task-completed' : '');
        row.innerHTML = `
            <span class="col-title">${task.title}</span>
            <span class="col-desc">${task.description}</span>
            <span class="col-status">
                <span class="${task.is_completed ? 'status-completed' : 'status-pending'}">
                    ${task.is_completed ? 'Completed' : 'To Do'}
                </span>
            </span>
            <span class="col-created">${new Date(task.created_at).toLocaleString()}</span>
            <span class="col-actions">
                <button class="complete-btn" ${task.is_completed ? 'disabled' : ''} data-id="${task.id}">Complete</button>
                <button class="delete-btn" data-id="${task.id}">Delete</button>
            </span>
        `;

        // Complete button
        row.querySelector('.complete-btn').addEventListener('click', async () => {
            await fetch(`${API_URL}/${task.id}/complete`, { method: 'PUT' });
            fetchTasks();
        });

        // Delete button
        row.querySelector('.delete-btn').addEventListener('click', async () => {
            await fetch(`${API_URL}/${task.id}`, { method: 'DELETE' });
            fetchTasks();
        });

        taskList.appendChild(row);
    });
}

// Add new task
if (taskForm) {
    taskForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = taskTitle.value.trim();
        const description = taskDesc.value.trim();
        if (!title || !description) return;
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        taskTitle.value = '';
        taskDesc.value = '';
        fetchTasks();
    });
}

// Chart.js logic
function updateTaskChart(tasks) {
    const completed = tasks.filter(t => t.is_completed).length;
    const pending = tasks.length - completed;

    const data = {
        labels: ['Completed', 'Pending'],
        datasets: [{
            label: 'Tasks',
            data: [completed, pending],
            backgroundColor: ['#22c55e', '#ef4444'],
            hoverOffset: 10
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#bfc9db',
                        font: { size: 14 }
                    }
                }
            }
        }
    };

    if (taskChart) {
        taskChart.destroy(); 
    }

    const ctx = document.getElementById('taskChart')?.getContext('2d');
    if (ctx) {
        taskChart = new Chart(ctx, config);
    }

   
    if (taskCounts) {
        taskCounts.innerHTML = `
            <p><strong>Completed:</strong> ${completed}</p>
            <p><strong>Pending:</strong> ${pending}</p>
        `;
    }
}

fetchTasks();
