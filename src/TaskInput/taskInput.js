function createTaskInput(task) {
  const taskInput = document.createElement('div');
  const checkBox = document.createElement('input');
  const text = document.createElement('p');
  const editButton = document.createElement('i');
  const deleteButton = document.createElement('i');

  checkBox.setAttribute('type', 'checkbox');

  text.textContent = task;

  deleteButton.classList.add('fas');
  deleteButton.classList.add('fa-trash-alt');

  editButton.classList.add('fas');
  editButton.classList.add('fa-pencil-alt');

  taskInput.classList.add('taskInput');
  taskInput.append(checkBox, text, editButton, deleteButton);
  return taskInput;
}

export default createTaskInput;
