import './style.css';
import toDoHeader from './ToDoHeader/toDoHeader';

import newProjectBtn from './NewProjectButton/newProjectButton';
import newTaskBtn from './NewTaskButton/newTaskButton';
import projects from "./Projects/projects";

const mainBody = document.querySelector( "#content" );
const sectionOne = document.createElement( "section" );
const sectionTwo = document.createElement( "section" );

// SECTION ONE
let taskBtn = newTaskBtn();
let projectBtn = newProjectBtn();
sectionOne.classList.add( "sectionOne" );
sectionOne.append( toDoHeader, projectBtn, taskBtn );


// SECTION TWO
sectionTwo.classList.add( "sectionTwo" ); // Check on this later on if it is needed
sectionTwo.append( projects );


mainBody.classList.add( "mainBody" );


mainBody.append( sectionOne );
mainBody.append( sectionTwo );
