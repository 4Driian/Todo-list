let titlePage = ["Todo List - Quehaceres", "Todo List - Tareas", "Todo List - Deberes"];
let counter = 0;
let docTitle = document.title;

setInterval(function() {
  document.title = titlePage[counter % titlePage.length];
  counter ++;
}, 4000);

  window.addEventListener("blur", () => {
    document.title = "Ya terminaste? :(";
  })
  window.addEventListener("focus", () => {
    document.title = titlePage;
})

class TodoList {
  constructor() {
    this.inputTask = document.getElementById('input-task');
    this.addTaskButton = document.getElementById('add-task');
    this.resetTasksButton = document.getElementById('reset-tasks');
    this.taskList = document.getElementById('task-list');
    this.categoryButtons = document.querySelectorAll('.category-btn');
    this.selectedCategory = null;

    this.addTaskButton.addEventListener('click', () => this.addTask());
    this.resetTasksButton.addEventListener('click', () => this.resetTasks());

    for (let i = 0; i < this.categoryButtons.length; i++) {
      this.categoryButtons[i].addEventListener('click', () => {
        this.selectedCategory = this.categoryButtons[i].innerText;
      });
    }

    this.taskList.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON' && e.target.innerText === 'Eliminar') {
        e.target.parentElement.remove();
      }
    });

    this.inputTask.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.addTask();
      }
    });

setInterval(() => {
      const taskItems = this.taskList.getElementsByTagName('li');
      for (let i = 0; i < taskItems.length; i++) {
        const taskItem = taskItems[i];
        const timeElement = taskItem.querySelector('.time');
        if (timeElement) {
          const timestamp = parseInt(timeElement.getAttribute('data-timestamp'));
          const timeDiff = Math.floor((Date.now() - timestamp) / 1000);
          let timeString;
          if (timeDiff < 60) {
            timeString = timeDiff + ' segundos';
          } else if (timeDiff < 3600) {
            timeString = Math.floor(timeDiff / 60) + ' minutos';
          } else {
            timeString = Math.floor(timeDiff / 3600) + ' horas';
          }
          timeElement.innerText = timeString;
        }
      }
    }, 1000);
  }

  addTask() {
    const newTask = document.createElement('li');
    const deleteBtn = document.createElement('button');
    const checkbox = document.createElement('input');
    const timeElement = document.createElement('span');
    timeElement.className = 'time';
    timeElement.setAttribute('data-timestamp', Date.now());
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
      this.taskLine(checkbox);
      this.textLine(checkbox, newTask);
    });
    deleteBtn.innerText = 'Eliminar';
    newTask.innerText = this.inputTask.value;
    if (this.selectedCategory) {
      const category = document.createElement('span');
      category.innerText = this.selectedCategory;
      newTask.appendChild(category);
      const categoryIcon = document.createElement('img');
      categoryIcon.src = `img/${this.selectedCategory.toLowerCase()}.svg`;
      newTask.appendChild(categoryIcon);
      this.selectedCategory = null;
    }
    newTask.appendChild(timeElement);
    newTask.appendChild(checkbox);
    newTask.appendChild(deleteBtn);
    this.taskList.appendChild(newTask);
    this.inputTask.value = '';
  }

  resetTasks() {
    const taskItems = this.taskList.getElementsByTagName('li');
    for (let i = 0; i < taskItems.length; i++) {
      const taskItem = taskItems[i];
      const checkbox = taskItem.querySelector('input[type="checkbox"]');
      if (checkbox.checked) {
        taskItem.remove();
      }
    }
  }
  
  taskLine(checkbox) {
    const taskText = checkbox.nextSibling;
    if (checkbox.checked) {
      taskText.classList.add('completed');
    } else {
      taskText.classList.remove('completed');
    }
  }
  
  textLine(checkbox, task) {
    if (checkbox.checked) {
      task.style.textDecoration = 'line-through';
    } else {
      task.style.textDecoration = 'none';
    }
  }
}

const todoList = new TodoList();