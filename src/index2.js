import './style.css';

// New Project Button
function newProjectBtn() {
  let newProjectBtn = document.createElement('button');
  newProjectBtn.classList.add('projectBtn');
  newProjectBtn.textContent = '+ Add Project';
  newProjectBtn.onclick = () => {
    console.log('Project BTN');
  };
  return newProjectBtn;
}

// New Task Button
function newTaskBtn() {
  let newTaskBtn = document.createElement('button');
  newTaskBtn.classList.add('taskBtn');
  newTaskBtn.textContent = '+ Add Task';
  return newTaskBtn;
}

const mainBody = document.querySelector('#content');

import modals from './Modals/modals';
let projectModal = modals.projectModal();
let taskModal = modals.taskModal();

let taskBtn = newTaskBtn();
let projectBtn = newProjectBtn();

mainBody.append(projectModal, taskModal, projectBtn, taskBtn);

// PROJECT BUTTON EVENT LISTENER FOR OPENING MODAL TO KEY IN PROJECT
projectBtn.addEventListener('click', () => {
  projectModal.showModal();
  projectModal.children[0].children[0].value = '';
});

taskBtn.addEventListener('click', () => {
  taskModal.showModal();
});
