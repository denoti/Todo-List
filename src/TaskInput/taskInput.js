function createTaskInput(task) {
  const taskInput = document.createElement('div');
  const checkBox = document.createElement('input');
  const text = document.createElement('p');
  const editButton = document.createElement('button');
  const editIcon = document.createElement('i');
  editButton.appendChild(editIcon);

  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('i');
  deleteButton.appendChild(deleteIcon);

  checkBox.setAttribute('type', 'checkbox');
  checkBox.checked = Object.values(task)[0];

  text.textContent = Object.keys(task)[0];

  deleteIcon.classList.add('fas');
  deleteIcon.classList.add('fa-trash-alt');
  deleteButton.classList.add('delete');

  editIcon.classList.add('fas');
  editIcon.classList.add('fa-pencil-alt');
  editButton.classList.add('edit');

  taskInput.classList.add('taskInput');
  taskInput.append(checkBox, text, editButton, deleteButton);
  return taskInput;
}

export default createTaskInput;
