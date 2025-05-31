let tasks = [];
let taskToEditId = null;

function addTask() {
  const title = document.getElementById("task-title").value;
  const desc = document.getElementById("task-desc").value;
  const date = document.getElementById("task-date").value;
  const priority = document.getElementById("task-priority").value;
  const category = document.getElementById("task-category").value;
  const tags = document.getElementById("task-tags").value.split(',').map(t => t.trim());

  if (!title || !date || !priority || !category) {
    alert("Wypełnij wszystkie wymagane pola!");
    return;
  }

  if (taskToEditId !== null) {
    // AKTUALIZUJ ZADANIE
    const task = tasks.find(t => t.id === taskToEditId);
    if (task) {
      task.title = title;
      task.desc = desc;
      task.date = date;
      task.priority = priority;
      task.category = category;
      task.tags = tags;
    }
    showNotification("Zadanie zaktualizowane!");
    taskToEditId = null;
    document.querySelector("button[onclick='addTask()']").innerHTML = `<i class="fas fa-plus-circle"></i> Dodaj`;
  } else {
    // DODAJ NOWE
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
    showNotification("Zadanie dodane!");
  }

  renderTasks();
  clearForm();
}

function clearForm() {
  document.getElementById("task-title").value = '';
  document.getElementById("task-desc").value = '';
  document.getElementById("task-date").value = '';
  document.getElementById("task-priority").value = '';
  document.getElementById("task-category").value = '';
  document.getElementById("task-tags").value = '';
}

function deleteTask(id) {
    const taskElement = document.getElementById(`task-${id}`);
    if (taskElement) {
      taskElement.classList.add("fade-out");
      setTimeout(() => {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
        showNotification("Zadanie usunięte!");
      }, 400);
    }
  }  

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      document.getElementById("task-title").value = task.title;
      document.getElementById("task-desc").value = task.desc;
      document.getElementById("task-date").value = task.date;
      document.getElementById("task-priority").value = task.priority;
      document.getElementById("task-category").value = task.category;
      document.getElementById("task-tags").value = task.tags.join(", ");
      taskToEditId = id;
  
      // zmiana przycisku
      document.querySelector("button[onclick='addTask()']").innerHTML = `<i class="fas fa-save"></i> Zapisz zmiany`;
      document.getElementById("cancel-edit").classList.remove("hidden");
  
      renderTasks(); // ponowne narysowanie z podświetleniem
    }
  }  

function renderTasks(filtered = tasks) {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  filtered.forEach(task => {
    const item = document.createElement("div");
    item.className = "task";
    item.id = `task-${task.id}`;
    item.title = "Kliknij, aby edytować to zadanie";
    item.addEventListener("click", function() {
        editTask(task.id);
      });      
    if (task.id === taskToEditId) {
        item.classList.add("editing");
      }      
    item.innerHTML = `
      <strong>${task.title}</strong> – ${task.date} – ${task.priority}<br>
      <em>${task.desc}</em><br>
      Kategoria: ${task.category}<br>
      Tagi: ${task.tags.join(', ')}<br>
      <button onclick="editTask(${task.id})"><i class="fas fa-edit"></i> Edytuj</button>
      <button onclick="deleteTask(${task.id})"><i class="fas fa-trash-alt"></i> Usuń</button>
    `;
    list.appendChild(item);
    item.classList.add("task-enter");
    setTimeout(() => {
      item.classList.remove("task-enter");
    }, 500);
  });
}

function filterTasks() {
  const title = document.getElementById("filter-title").value.toLowerCase();
  const category = document.getElementById("filter-category").value;
  const priority = document.getElementById("filter-priority").value;

  const filtered = tasks.filter(task =>
    task.title.toLowerCase().includes(title) &&
    (category === "" || task.category === category) &&
    (priority === "" || task.priority === priority)
  );

  renderTasks(filtered);
}

function showNotification(message) {
  const notif = document.getElementById("notification");
  notif.textContent = ` ${message}`;
  notif.classList.remove("hidden");
  notif.classList.add("show");

  setTimeout(() => {
    notif.classList.remove("show");
    notif.classList.add("hidden");
  }, 2500);
}

function cancelEdit() {
    taskToEditId = null;
    clearForm();
    document.querySelector("button[onclick='addTask()']").innerHTML = `<i class="fas fa-plus-circle"></i> Dodaj`;
    document.getElementById("cancel-edit").classList.add("hidden");
    renderTasks();
  }
  
  function sortTasks() {
    const sortOrder = document.getElementById("sort-order").value;
  
    if (sortOrder === "date-asc") {
      tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortOrder === "date-desc") {
      tasks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
  
    renderTasks();
  }
  
  function toggleDarkMode() {
    document.body.classList.toggle("dark");
  }
  