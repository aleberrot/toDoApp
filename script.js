const task = document.getElementById('task');
const addTask = document.getElementById('addTask');
const tasks = document.getElementById('tasks');
const taskList = document.getElementById('taskList');
const removeTask = document.getElementById('removeTask');
const clearTasks = document.getElementById('clearTasks');
let createdTask = false;


// TODO Handle the task
function handleTask() {
    // TODO check if the task is empty
    if (task.value === '') {
        alert('Please enter a task');
        return;
    }
    // TODO Create a taskItem
    const taskValue = task.value;
    const taskItem = document.createElement('li');   
    taskItem.id = setId();
    const taskItemText = document.createElement('span');
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    taskItem.className = 'taskItem';
    taskItem.draggable = true;

    //TODO Add drag and drop events

    taskItem.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', taskItem.id);
    }
    )

    taskItemText.textContent = taskValue;
    taskItem.appendChild(taskItemText);
    taskItem.prepend(checkBox);

    // TODO Add event listener to the checkbox
    checkBox.addEventListener('change', ()=>{
        if (checkBox.checked) {
            taskItemText.style.textDecoration = 'line-through';
        } else {
            taskItemText.style.textDecoration = 'none';
        }
    })

    // TODO Add taskItem to the taskList
    taskList.appendChild(taskItem);

    // TODO Add remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    taskItem.appendChild(removeButton);
    const handleRemoveTask = () => {
        taskItem.remove();
    }
    // TODO Add event listener to the remove button
    removeButton.addEventListener('click', handleRemoveTask);

    // TODO Add edit task button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    taskItem.appendChild(editButton);
    editButton.addEventListener('click', () => {
        const inputNewTask = document.createElement('input');
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        inputNewTask.type = 'text';
        inputNewTask.placeholder = 'Enter new task';
        inputNewTask.value = taskValue;

        // TODO Add event listener to the save button
        saveButton.addEventListener('click', ()=>{
            taskItemText.textContent = inputNewTask.value;
            saveButton.remove();
            inputNewTask.remove();
        })

        taskItem.appendChild(inputNewTask);
        taskItem.appendChild(saveButton);
    });
    if (!createdTask) {
        task.value = '';
        createdTask = true;
    }
}

// TODO Clear all tasks
function handleClearTasks() {
    if(confirm('Are you sure you want to clear all tasks?')){
        taskList.innerHTML = '';
    }
    return;
}

// TODO Create function set an id to each task
function setId() {
    return crypto.randomUUID();
}

// TODO Add event listener to the button addTask
addTask.addEventListener('click', ()=>{
    handleTask();
    createdTask = false;
    console.log(taskList.children);
});

// TODO Add event listener to the button clearTasks
clearTasks.addEventListener('click', handleClearTasks);

// TODO Add event listener to task as dropzone
taskList.addEventListener('dragover', (e) => {
    e.preventDefault();
}
)

taskList.addEventListener('drop', (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const  draggedElement = document.getElementById(data);
    if (draggedElement === null) {
        return;
    }

    let insertBeforeElement = null;

    for (let child of taskList.children) {
        const rect = child.getBoundingClientRect();
        if (e.clientY < rect.top + rect.height / 2) {
            insertBeforeElement = child;
            break;
        }
    }
    taskList.insertBefore(draggedElement, insertBeforeElement);
})