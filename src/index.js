import './style.css';
import toDoHeader from './ToDoHeader/toDoHeader';

import createProjectsList from './Projects/projects';
import createTasksBoard from './TasksBoard/tasksBoard';
import modals from './Modals/modals';
import createTaskInput from './TaskInput/taskInput';

let projectModal = modals.projectModal();
let taskModal = modals.taskModal();

const mainBody = document.querySelector('#content');

const sectionOne = document.createElement('section');
const sectionTwo = document.createElement('section');

const listOfProjects = [
  { 'Critical Tasks': ['Task 1', 'Task 2', 'Task 3'] },
  { 'General Tasks': ['Task 4', 'Task 5', 'Task 6'] },
  { Completed: ['Task 7', 'Task 8', 'Task 9'] },
];

// New Project Button
function newProjectBtn() {
  let newProjectBtn = document.createElement('button');
  newProjectBtn.classList.add('projectBtn');
  newProjectBtn.textContent = '+ Add Project';
  return newProjectBtn;
}

// New Task Button
function newTaskBtn() {
  let newTaskBtn = document.createElement('button');
  newTaskBtn.classList.add('taskBtn');
  newTaskBtn.textContent = '+ Add Task';
  return newTaskBtn;
}

// SECTION ONE
let taskBtn = newTaskBtn();
let projectBtn = newProjectBtn();
sectionOne.classList.add('sectionOne');
sectionOne.append(toDoHeader, projectBtn);

// SECTION TWO
let projects = createProjectsList(listOfProjects, newTaskBtn);
let tasksBoard = createTasksBoard();
sectionTwo.classList.add('sectionTwo'); // Check on this later on if it is needed

sectionTwo.append(projects, tasksBoard);

mainBody.classList.add('mainBody');
mainBody.append(sectionOne);
mainBody.append(sectionTwo, projectModal, taskModal);

// SELECT FORMS FOR DATA ENTRY
const formProject = document.querySelector('.project');
const formTask = document.querySelector('.task');
// const taskButtons = document.querySelectorAll('.taskBtn');
const projectButton = document.querySelector('.projectBtn');

// FORM PROJECT EVENT LISTENER
formProject.addEventListener('submit', (e) => {
  const realProject = formProject.children[1].value.trim();
  if (realProject) {
    const newProject = { [realProject]: [] };
    listOfProjects.push(newProject);
    let itemArray = Object.values(newProject)[0];
    let itemLength = Object.values(newProject)[0].length;
    if (itemLength > 0) {
      itemArray.forEach((item) => {
        tasksBoard.append(createTaskInput(item));
      });
    }
  }

  // Create a new list item in the DOM for the new project
  const projectsList = document.querySelector('.projects');
  const projectItem = document.createElement('li');
  const linkProject = document.createElement('a');
  linkProject.href = '#';
  linkProject.textContent = realProject;
  projectItem.append(linkProject, newTaskBtn().cloneNode(true));
  projectsList.appendChild(projectItem);

  projectModal.children[0].children[1].value = '';
});

// FORM TASK EVENT LISTENER

let currentProjectText = '';
let currrentProjectIndex;

formTask.addEventListener('submit', (e) => {
  const realTaskOne = formTask.children[1].value.trim();
  const realTaskTwo = formTask.children[2].value.trim();
  let listOfCurrentProjects =
    listOfProjects[currrentProjectIndex][currentProjectText];
  if (realTaskOne && realTaskTwo) {
    listOfCurrentProjects.push(`${realTaskOne} ON ${realTaskTwo}`);
  }
  if (listOfCurrentProjects.length > 0) {
    tasksBoard.innerHTML = '';
    listOfCurrentProjects.forEach((item) => {
      tasksBoard.append(createTaskInput(item));
    });
  }
  formTask.children[1].value = '';
  formTask.children[2].value = '';
});

// PROJECT AND TASK BUTTONS

document.querySelectorAll('a').forEach((link, index) => {
  link.addEventListener('click', (e) => {
    tasksBoard.innerHTML = '';
    let text = e.target.textContent;
    let tasks = listOfProjects[index][`${text}`];
    if (tasks.length > 0) {
      tasks.forEach((task) => {
        tasksBoard.append(createTaskInput(task));
      });
    }
  });
});

document.querySelectorAll('.taskBtn').forEach((btn, index) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    taskModal.showModal();
    currentProjectText = btn.previousSibling.textContent;
    currrentProjectIndex = index;
  });
});

projectButton.addEventListener('click', (e) => {
  e.stopPropagation();
  projectModal.showModal();
});

const exitButtons = document.querySelectorAll('.exit');

exitButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const dialog = btn.closest('.dialogProject, .dialogTask');
    if (dialog) {
      dialog.close();
    }
  });
});
