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