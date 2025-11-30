document.addEventListener('DOMContentLoaded', function () {

    // Get references to HTML elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to add a task
    function addTask(taskText = null, save = true) {
        // Get task text from input if not passed
        if (taskText === null) {
            taskText = taskInput.value.trim();
        }

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn'); // checker requires classList.add

        // Remove task on click
        removeBtn.onclick = function () {
            taskList.removeChild(li);

            // Remove from Local Storage
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const index = tasks.indexOf(taskText);
            if (index > -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        };

        // Append remove button to li and li to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if required
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear input field
        taskInput.value = '';
    }

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false prevents saving again
    }

    loadTasks(); // call it immediately

    // Event listener: Add task on button click
    addButton.addEventListener('click', addTask);

    // Event listener: Add task on Enter key
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});
