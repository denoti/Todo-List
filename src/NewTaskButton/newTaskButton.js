function newTaskBtn () {
    let newTaskBtn = document.createElement( 'button' );
    newTaskBtn.classList.add("taskBtn")
    newTaskBtn.textContent = "+ Add Task"
    return newTaskBtn
}

export default newTaskBtn;