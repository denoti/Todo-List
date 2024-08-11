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

function stylingLinks() {
  let links = document.querySelectorAll('a');
  links.forEach((ln) => {
    ln.style.color = '#27b4a4';
  });
}

const listOfProjects = [
  {
    'Critical Tasks': [
      { 'Task 1': false },
      { 'Task 2': false },
      { 'Task 3': true },
    ],
  },
  {
    'General Tasks': [
      { 'Task 4': true },
      { 'Task 5': false },
      { 'Task 6': true },
    ],
  },
  { Completed: [{ 'Task 7': true }, { 'Task 8': false }, { 'Task 9': true }] },
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
    const projectExists = listOfProjects.some(
      (project) => Object.keys(project)[0] === realProject,
    );
    if (!projectExists) {
      const newProject = { [realProject]: [] };
      listOfProjects.push(newProject);
      tasksBoard.innerHTML = '';

      // Create a new list item in the DOM for the new project
      stylingLinks();
      const projectsList = document.querySelector('.projects');
      const projectItem = document.createElement('li');
      const linkProject = document.createElement('a');
      linkProject.href = '#';
      linkProject.style.color = 'purple';
      linkProject.textContent = realProject;
      projectItem.append(linkProject, newTaskBtn().cloneNode(true));
      projectsList.appendChild(projectItem);
    } else {
      alert('Project already exists!');
    }
  }

  projectModal.children[0].children[1].value = '';
  callTaskBtn();
  callProjectLinks();
});

// FORM TASK EVENT LISTENER

let currentProjectText = '';
let currrentProjectIndex;

formTask.addEventListener('submit', (e) => {
  const realTaskOne = formTask.children[1].value.trim();
  const realTaskTwo = formTask.children[2].value.trim();

  const finalDate = new Date(realTaskTwo);
  let dateString = finalDate.toDateString().split(' ').slice(0, 3).join(' ');

  let listOfCurrentProjects =
    listOfProjects[currrentProjectIndex][currentProjectText];
  if (realTaskOne && realTaskTwo) {
    let taskHolder = {};
    taskHolder[`${realTaskOne} by ${dateString}`] = false;
    listOfCurrentProjects.push(taskHolder);
  }
  if (listOfCurrentProjects.length > 0) {
    tasksBoard.innerHTML = '';
    listOfCurrentProjects.forEach((item) => {
      tasksBoard.append(createTaskInput(item));
    });
  }

  formTask.children[1].value = '';
  formTask.children[2].value = '';
  checkboxValidation(currentProjectText, currrentProjectIndex);
  deleteFunction();
  editBtns();
});

// FIRST INITIALISATION
function init() {
  let firstProject = document.querySelector('a').textContent;
  listOfProjects[0][firstProject].forEach((task) => {
    tasksBoard.append(createTaskInput(task));
  });
  checkboxValidation(firstProject, 0);
  document.querySelector('a').style.color = 'purple';
}

init();

// PROJECT AND TASK BUTTONS
function callProjectLinks() {
  let links = document.querySelectorAll('a');
  links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      tasksBoard.innerHTML = '';
      let text = e.target.textContent;
      links.forEach((ln) => {
        ln.style.color = '#27b4a4';
      });
      e.target.style.color = 'purple';
      let tasks = listOfProjects[index][`${text}`];
      if (tasks.length > 0) {
        tasks.forEach((task) => {
          tasksBoard.append(createTaskInput(task));
        });
      }
      deleteFunction();
      editBtns();
      checkboxValidation(text, index);
    });
  });
}

// e.target.parentElement.style.color = '#27b4a4';
callProjectLinks();

function callTaskBtn() {
  document.querySelectorAll('.taskBtn').forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
      stylingLinks();
      e.stopPropagation();
      taskModal.showModal();
      currentProjectText = btn.previousElementSibling.textContent;
      btn.previousElementSibling.style.color = 'purple';
      currrentProjectIndex = index;
    });
  });
}

callTaskBtn();

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

// CHECKBOX VALIDATION
function isChecked(par) {
  if (par.checked) {
    par.nextElementSibling.style.textDecorationLine = 'line-through';
    par.nextElementSibling.nextElementSibling.disabled = true;
  }
  if (!par.checked) {
    par.nextElementSibling.style.textDecorationLine = 'none';
    par.nextElementSibling.nextElementSibling.disabled = false;
  }
}

function checkboxValidation(key, idx) {
  let checkbox = document.querySelectorAll('input[type="checkbox"]');
  checkbox.forEach((box, index) => {
    isChecked(box);

    box.addEventListener('change', (e) => {
      isChecked(box);
      let tasksArray = listOfProjects[idx][key]; // SPECIFIC ARRAY TO BE ALTERED
      let taskKey = Object.keys(tasksArray[index])[0]; // KEY FOR ACCESSING VALUE IN OBJECT

      tasksArray[index][taskKey] = e.target.checked; // SET CHECKBOX TO TRUE OR FALSE
    });
  });
}

// DELETE BUTTON FUNCTIONALITY
function getTaskProject(taskName, arr) {
  return arr.find((obj) => {
    return (
      Object.keys(obj).find((category) => {
        return obj[category].some((task) => taskName in task);
      }) || null
    );
  });
}

function deleteFunction() {
  const delBtn = document.querySelectorAll('button.delete');
  delBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      let taskDetail =
        btn.previousElementSibling.previousElementSibling.textContent.trim();
      let answer = getTaskProject(taskDetail, listOfProjects);
      let projectDel = Object.keys(answer)[0];
      let projectIndex = listOfProjects.indexOf(answer);
      let taskToBeDeletedFrom = listOfProjects[projectIndex][projectDel];
      let updateArray = taskToBeDeletedFrom.filter(
        (obj) => Object.keys(obj)[0] !== taskDetail,
      );
      checkboxValidation(projectDel, projectIndex);

      listOfProjects[projectIndex][projectDel] = updateArray;
      repaintDomAfterDeletion(listOfProjects, projectDel, projectIndex);
    });
  });
}

function repaintDomAfterDeletion(arr, text, indexOfProject) {
  tasksBoard.innerHTML = '';
  let newArray = arr[indexOfProject][text];
  newArray.forEach((arrObj) => {
    tasksBoard.append(createTaskInput(arrObj));
  });
  checkboxValidation(text, indexOfProject);
  deleteFunction();
  editBtns();
}

deleteFunction();

function editBtns() {
  let editButtons = document.querySelectorAll('button.edit');
  editButtons.forEach((btn, index) => {
    if (btn.previousElementSibling.previousElementSibling.checked) {
      btn.disabled = true;
    }

    btn.addEventListener('click', () => {
      let taskDetail = btn.previousElementSibling.textContent.trim();
      let taskElement = btn.previousElementSibling;
      let answer = getTaskProject(taskDetail, listOfProjects);
      let projectDel = Object.keys(answer)[0];
      let projectIndex = listOfProjects.indexOf(answer);
      let taskToBeEdited = listOfProjects[projectIndex][projectDel][index];
      taskElement.previousElementSibling.disabled = true;
      btn.style.opacity = '0';
      taskElement.setAttribute('contenteditable', true);
      taskElement.focus();

      taskElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.keyCode === 14) {
          console.log(taskElement.textContent);

          taskElement.blur();
          btn.style.opacity = '1';
          taskElement.setAttribute('contenteditable', false);
          taskElement.previousElementSibling.disabled = false;
          if (taskElement.textContent === taskDetail) {
            return;
          }
          taskToBeEdited[taskElement.textContent] = taskToBeEdited[taskDetail];
          delete taskToBeEdited[taskDetail];
        }
      });
    });
  });
}

editBtns();
