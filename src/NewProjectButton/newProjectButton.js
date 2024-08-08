function newProjectBtn () {
    let newProjectBtn = document.createElement( 'button' );
    newProjectBtn.classList.add( "projectBtn" );
    newProjectBtn.textContent = "+ Add Project";
    newProjectBtn.onclick = () => {
        console.log("Project BTN")
    }
    return newProjectBtn;
}

export default newProjectBtn;