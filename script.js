$(document).ready(function () {
    const taskList = $("#task-list");
    const newTaskInput = $("#new-task");
    const taskCounter = $("#task-counter");
    const clearAllButton = $("#clear-all");

    // Load tasks from local storage
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Render tasks
    function renderTasks() {
        taskList.empty();
        tasks.forEach((task, index) => {
            const taskItem = $(`
                <li>
                    <label>
                        <input type="checkbox" class="task-checkbox" data-index="${index}" ${task.completed ? "checked" : ""}>
                        <i></i>
                        <span class="${task.completed ? "completed" : ""}">${task.text}</span>
                        <a class="delete-task" data-index="${index}">✖</a>
                        <a class="edit-task" data-index="${index}">✎</a>
                    </label>
                </li>
            `);
            taskList.append(taskItem);
        });
        updateTaskCounter();
    }

    // Update task counter
    function updateTaskCounter() {
        const pendingTasks = tasks.filter(task => !task.completed).length;
        taskCounter.text(`${pendingTasks} ${pendingTasks === 1 ? "task" : "tasks"} remaining`);
    }

    // Add new task
    newTaskInput.on("keypress", function (e) {
        if (e.which === 13 && newTaskInput.val().trim() !== "") {
            tasks.push({ text: newTaskInput.val().trim(), completed: false });
            newTaskInput.val("");
            saveTasks();
            renderTasks();
        }
    });

    // Toggle task completion
    taskList.on("change", ".task-checkbox", function () {
        const index = $(this).data("index");
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    });

    // Delete task
    taskList.on("click", ".delete-task", function () {
        const index = $(this).data("index");
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    });

    // Edit task
    taskList.on("click", ".edit-task", function () {
        const index = $(this).data("index");
        const newText = prompt("Edit your task:", tasks[index].text);
        if (newText !== null && newText.trim() !== "") {
            tasks[index].text = newText.trim();
            saveTasks();
            renderTasks();
        }
    });

    // Clear all tasks
    clearAllButton.on("click", function () {
        tasks = [];
        saveTasks();
        renderTasks();
    });

    // Save tasks to local storage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Initial render
    renderTasks();
});
