// PROJECT MODAL FOR KEYING IN PROJECT VALUES
function projectModal() {
  const projectMdl = document.createElement('dialog');
  projectMdl.classList.add('dialogProject');
  const form = document.createElement('form');
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.textContent = 'X';
  button.classList.add('exit');

  form.setAttribute('method', 'dialog');
  form.classList.add('project');
  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'SUBMIT';

  const input = document.createElement('input');
  input.setAttribute('required', true);
  projectMdl.classList.add('projectModal');

  form.append(button, input, submitBtn);
  projectMdl.append(form);
  return projectMdl;
}

// TASKS MODAL FOR KEYING IN TASKS
function taskModal(prevSibling) {
  const taskMdl = document.createElement('dialog');
  taskMdl.classList.add('dialogTask');
  taskMdl.classList.add('taskModal');

  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.textContent = 'X';
  button.classList.add('exit');

  const form = document.createElement('form');
  form.setAttribute('method', 'dialog');
  form.classList.add('task');

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'SUBMIT';

  const input = document.createElement('input');
  input.setAttribute('required', true);

  const calendar = document.createElement('input');
  calendar.setAttribute('required', true);
  calendar.setAttribute('type', 'date');
  const today = new Date().toISOString().split('T')[0]; // GET TODAYS DATE
  calendar.setAttribute('min', today); // SET TODAYS DATE AS MINIMUM FOR ACCOMPLISHING TASK

  form.append(button, input, calendar, submitBtn);
  taskMdl.append(form);

  return taskMdl;
}

export default { projectModal, taskModal };
