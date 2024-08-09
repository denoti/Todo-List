// PROJECT MODAL FOR KEYING IN PROJECT VALUES
function projectModal() {
  const projectMdl = document.createElement('dialog');
  const form = document.createElement('form');
  form.setAttribute('method', 'dialog');
  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'SUBMIT';

  const input = document.createElement('input');
  input.setAttribute('required', true);
  projectMdl.classList.add('projectModal');

  form.append(input, submitBtn);
  projectMdl.append(form);
  return projectMdl;
}

// TASKS MODAL FOR KEYING IN TASKS
function taskModal() {
  const taskMdl = document.createElement('dialog');
  taskMdl.classList.add('taskModal');

  const form = document.createElement('form');
  form.setAttribute('method', 'dialog');

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'SUBMIT';

  const input = document.createElement('input');
  input.setAttribute('required', true);

  const calendar = document.createElement('input');
  calendar.setAttribute('required', true);
  calendar.setAttribute('type', 'date');

  form.append(input, calendar,submitBtn);
  taskMdl.append(form);

  return taskMdl;
}

export default { projectModal, taskModal };
