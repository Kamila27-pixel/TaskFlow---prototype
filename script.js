let tasks = [];

function addTask() {
  const title = document.getElementById('task-title').value;
  const desc = document.getElementById('task-desc').value;
  const date = document.getElementById('task-date').value;
  const priority = document.getElementById('task-priority').value;
  const category = document.getElementById('task-category').value;
  const tags = document.getElementById('task-tags').value.split(',').map(tag => tag.trim());

  if (!title || !date || !priority || !category) {
    alert('Uzupełnij wszystkie pola wymagane!');
    return;
  }

  const task = {
    id: Date.now(),
    title,
    desc,
    date,
    priority,
    category,
    tags
  };

  tasks.push(task);
  renderTasks();
  clearForm();
}

function clearForm() {
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value = '';
  document.getElementById('task-date').value = '';
  document.getElementById('task-priority').value = '';
  document.getElementById('task-category').value = '';
  document.getElementById('task-tags').value = '';
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function renderTasks(filteredTasks = tasks) {
  const container = document.getElementById('task-list');
  container.innerHTML = '';

  filteredTasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';
    taskDiv.innerHTML = `
      <strong>${task.title}</strong> (${task.date})<br>
      <em>${task.desc}</em><br>
      Kategoria: ${task.category} | Priorytet: ${task.priority} <br>
      Tagi: ${task.tags.join(', ')}<br>
      <button onclick="deleteTask(${task.id})">Usuń</button>
    `;
    container.appendChild(taskDiv);
  });
}

function filterTasks() {
  const title = document.getElementById('filter-title').value.toLowerCase();
  const category = document.getElementById('filter-category').value;
  const priority = document.getElementById('filter-priority').value;

  const filtered = tasks.filter(task =>
    task.title.toLowerCase().includes(title) &&
    (category === '' || task.category === category) &&
    (priority === '' || task.priority === priority)
  );

  renderTasks(filtered);
}
