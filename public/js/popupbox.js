//Extracted all the clickable items 
const missionPop = document.querySelectorAll('.editMission')
const taskPop = document.querySelectorAll('.editTask')
const addTaskPop = document.querySelectorAll('.addTask')
const closePopup = document.querySelectorAll('.close')

//Created an array and attached an eventlistener to each of clickable items
Array.from(missionPop).forEach((el) => {
    el.addEventListener('click', editMission)
})
Array.from(taskPop).forEach((el) => {
    el.addEventListener('click', editTask)
})
Array.from(addTaskPop).forEach((el) => {
    el.addEventListener('click', addTask)
})
Array.from(closePopup).forEach((el) => {
    el.addEventListener('click', closePop)
})

/* When the mission's edit icon is clicked 
show the mission popup window */
function editMission() {
    document.querySelector('.pop-up-container.missionContainer').classList.add('show')
    //extracts the selected mission's id
    const missionID = this.parentNode.parentNode.dataset.id
    //and stores it in as one of the input values in the form
    document.querySelector('#missionId').value = missionID
}

/* When the task's edit icon is clicked 
show the mission popup window */
function editTask() {
    document.querySelector('.pop-up-container.taskContainer').classList.add('show')
    //extracts the selected mission's id and original task values
    const missionID = this.parentNode.dataset.id
    const taskValue = this.parentNode.childNodes[1].innerText
    //and stores it in as one of the input values in the form
    document.querySelector('#taskId').value = missionID
    document.querySelector('#taskvalue').value = taskValue
}

/* When the plus icon is clicked 
show the add task popup window */
async function addTask() {
    document.querySelector('.pop-up-container.addContainer').classList.add('show')
    //extracts the selected mission's id and original task values
    const missionID = this.parentNode.parentNode.dataset.id
    //and stores it in as one of the input values in the form
    document.querySelector('#addId').value = missionID
}

/* When you click the X in the pop up box,
 remove class 'show' to hide pop up box */
function closePop() {
    this.parentNode.parentNode.parentNode.classList.remove('show')
}