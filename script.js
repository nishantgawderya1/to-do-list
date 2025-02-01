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

$(document).ready(function() {
    // Load tasks from localStorage on page load
    loadTasks();
  
    $(".tdl-new").keypress(function(e) {
      if (e.which === 13) {
        e.preventDefault();
        var inputValue = $(this).val().trim();
        if (inputValue !== "") {
          $(".tdl-content ul").append(
            "<li><label><input type='checkbox'><i></i><span>" +
              inputValue +
              "</span><a href='#'>–</a></label></li>"
          );
          $(this).val("");
          saveTasks(); // Save tasks to localStorage
        }
      }
    });
  
    $(".tdl-content").on("click", "a", function() {
      var li = $(this).parent().parent("li");
      li.addClass("remove").stop().delay(100).slideUp("fast", function() {
        li.remove();
        saveTasks(); // Save tasks to localStorage after removing a task
      });
      return false;
    });
  
    // Event listener for checkbox change
    $(".tdl-content").on("change", "input[type='checkbox']", function() {
      saveTasks(); // Save tasks to localStorage after checkbox change
    });

      
    // Function to save tasks to localStorage
    function saveTasks() {
      var tasks = [];
      $(".tdl-content ul li").each(function() {
        var task = {
          text: $(this).find("span").text(),
          checked: $(this).find("input[type='checkbox']").prop("checked")
        };
        tasks.push(task);
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Function to load tasks from localStorage
    function loadTasks() {
      var storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        var tasks = JSON.parse(storedTasks);
        $.each(tasks, function(index, task) {
          var checkedAttribute = task.checked ? "checked='checked'" : "";
          var listItem =
            "<li><label><input type='checkbox' " +
            checkedAttribute +
            "><i></i><span>" +
            task.text +
            "</span><a href='#'>–</a></label></li>";
          $(".tdl-content ul").append(listItem);
        });
      }
    }
  });
  
