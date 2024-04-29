let tasks = [];
    let completedTasks = [];
    let recycleBin = [];

    function addTask() {
        const taskInput = document.getElementById("taskInput");
        const task = taskInput.value.trim();

        if (task !== "") {
            tasks.push(task);
            renderTasks();
            taskInput.value = "";
        }
    }

    function deleteTask(index, taskType) {
        if (taskType === "pending") {
            recycleBin.push(tasks[index]);
            tasks.splice(index, 1);
        } else {
            recycleBin.push(completedTasks[index]);
            completedTasks.splice(index, 1);
        }
        renderTasks();
    }

    function restoreTask(index) {
        tasks.push(recycleBin[index]);
        recycleBin.splice(index, 1);
        renderTasks();
    }

    function deletePermanently(index) {
        recycleBin.splice(index, 1);
        renderTasks();
    }

    function completeTask(index) {
        completedTasks.push(tasks[index]);
        tasks.splice(index, 1);
        renderTasks();
    }

    function renderTasks() {
        const pendingTasksElement = document.getElementById("pendingTasks");
        const completedTasksElement = document.getElementById("completedTasks");
        const recycleBinElement = document.getElementById("recycleBin");

        pendingTasksElement.innerHTML = "";
        completedTasksElement.innerHTML = "";
        recycleBinElement.innerHTML = "";

        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task;
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => deleteTask(index, "pending");
            li.appendChild(deleteButton);
            const completeButton = document.createElement("button");
            completeButton.textContent = "Completar";
            completeButton.className
            completeButton.onclick = () => completeTask(index);
            li.appendChild(completeButton);
            pendingTasksElement.appendChild(li);
        });

        completedTasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task;
            li.classList.add("completed");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.onclick = () => deleteTask(index, "completed");
            li.appendChild(deleteButton);
            completedTasksElement.appendChild(li);
        });

        recycleBin.forEach((task, index) => {
            const li = document.createElement("li");
            li.textContent = task;
            const restoreButton = document.createElement("button");
            restoreButton.textContent = "Restaurar";
            restoreButton.onclick = () => restoreTask(index);
            li.appendChild(restoreButton);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar Definitivamente";
            deleteButton.onclick = () => deletePermanently(index);
            li.appendChild(deleteButton);
            recycleBinElement.appendChild(li);
        });
    }

    renderTasks();