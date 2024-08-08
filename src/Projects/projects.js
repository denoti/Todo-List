import '../style.css';
import newTaskBtn from '../NewTaskButton/newTaskButton';
import listOfProjects from '../DataSource/dataSource';

// Create unordered list to hold all Project Items
const projectsList = document.createElement( 'ul' );



projectsList.classList.add("projects")

// List of Project Names

listOfProjects.forEach( ( project ) => {
    let projectTask = Object.keys( project )[0]
    let taskBtn = newTaskBtn();
    let projectItem = document.createElement( "li" );
    let linkProject = document.createElement( "a" );
    linkProject.href = "#";
    linkProject.textContent = projectTask;
    projectItem.append( linkProject, taskBtn );
    console.log(listOfProjects)
    projectsList.appendChild( projectItem );
} )


const projectBtn = document.querySelector( ".projectBtn" );
console.log(projectBtn)
// projectBtn.onclick = () => {
//     let newProject = {'Greatest Tasks': ['Task 10']};
//     listOfProjects.push( newProject );
    
//     // Create a new list item in the DOM for the new project
//     const projectsList = document.querySelector( '.projects' );
//     const projectItem = document.createElement( 'li' );
//     const linkProject = document.createElement( 'a' );
//     linkProject.href = "#";
//     linkProject.textContent = Object.keys( newProject )[0];
//     projectItem.append( linkProject, newTaskBtn.cloneNode( true ) );
//     console.log( listOfProjects )
//     projectsList.appendChild( projectItem );
// }


export default projectsList;