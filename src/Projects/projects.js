import '../style.css';

function createProjectsList(listOfProjects, taskBtn) {
  const projectsList = document.createElement('ul');
  projectsList.classList.add('projects');
  listOfProjects.forEach((project) => {
    let projectTask = Object.keys(project)[0];
    let projectItem = document.createElement('li');
    let linkProject = document.createElement('a');
    linkProject.href = '#';
    linkProject.textContent = projectTask;
    projectItem.append(linkProject, taskBtn());
    projectsList.appendChild(projectItem);
  });

  return projectsList;
}

export default createProjectsList;
