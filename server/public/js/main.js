//Extracted all the clickable items 
const missionComplete = document.querySelectorAll('span.not')
const todoMission = document.querySelectorAll('span.completed')
const removeTask = document.querySelectorAll('.deltask')
const removeMission = document.querySelectorAll('.delMission')

//Created an array and attached an eventlistener to each of clickable items
Array.from(missionComplete).forEach((el) => {
    el.addEventListener('click', markComplete)
})
Array.from(todoMission).forEach((el) => {
    el.addEventListener('click', markIncomplete)
})
Array.from(removeTask).forEach((el) => {
    el.addEventListener('click', deleteTask)
})
Array.from(removeMission).forEach((el) => {
    el.addEventListener('click', deleteMission)
})

//Acquires the data necessary to mark the task completed and sends it to the appropriate router-controller
async function markComplete() {
    const missionId = this.parentNode.dataset.id
    const taskValue = this.innerText
    try {
        const response = await fetch('mission/markComplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'missionIdFromJSFile': missionId,
                'task': taskValue
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

//Acquires the data necessary to mark the task completed and sends it to the appropriate router-controller
async function markIncomplete() {
    const missionId = this.parentNode.dataset.id
    const taskValue = this.innerText
    try {
        const response = await fetch('mission/markIncomplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'missionIdFromJSFile': missionId,
                'task': taskValue
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

//Acquires the data necessary to delete the task and sends it to the appropriate router-controller
async function deleteTask() {
    const missionId = this.parentNode.dataset.id
    const taskValue = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('mission/deleteTask', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'missionIdFromJSFile': missionId,
                'task': taskValue
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}

//Acquires the data necessary to delete the whole mission and sends it to the appropriate router-controller
async function deleteMission() {
    const missionId = this.parentNode.parentNode.dataset.id
    try {
        const response = await fetch('mission/deleteMission', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'missionIdFromJSFile': missionId,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    } catch (err) {
        console.log(err)
    }
}