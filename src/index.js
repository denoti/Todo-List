import './style.css';
import toDoHeader from './ToDoHeader/toDoHeader';

import createProjectsList from './Projects/projects';
import createTasksBoard from './TasksBoard/tasksBoard';
import modals from './Modals/modals';

const listOfProjects = [
  { 'Critical Tasks': ['Task 1', 'Task 2', 'Task 3'] },
  { 'General Tasks': ['Task 4', 'Task 5', 'Task 6'] },
  { Completed: ['Task 7', 'Task 8', 'Task 9'] },
];

const mainBody = document.querySelector('#content');
const sectionOne = document.createElement('section');
const sectionTwo = document.createElement('section');

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

// SECTION ONE
let taskBtn = newTaskBtn();
let projectBtn = newProjectBtn();
sectionOne.classList.add('sectionOne');
sectionOne.append(toDoHeader, projectBtn, taskBtn);

// SECTION TWO
let projects = createProjectsList(listOfProjects, newTaskBtn);
sectionTwo.classList.add('sectionTwo'); // Check on this later on if it is needed
sectionTwo.append(projects, createTasksBoard());

mainBody.classList.add('mainBody');

projectBtn.onclick = () => {
  let newProject = { 'Greatest Tasks': ['Task 10'] };
  listOfProjects.push(newProject);

  // Create a new list item in the DOM for the new project
  const projectsList = document.querySelector('.projects');
  const projectItem = document.createElement('li');
  const linkProject = document.createElement('a');
  linkProject.href = '#';
  linkProject.textContent = Object.keys(newProject)[0];
  projectItem.append(linkProject, newTaskBtn().cloneNode(true));
  console.log(listOfProjects);
  projectsList.appendChild(projectItem);
};

console.log( modals.projectModal() );
console.log(modals.taskModal());

mainBody.append(sectionOne);
mainBody.append(sectionTwo);
