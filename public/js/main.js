//created an array from the following classes span.not and span.completed
const missionComplete = document.querySelectorAll('span.not')
const todoMission = document.querySelectorAll('span.completed')

//
Array.from(missionComplete).forEach((el)=>{
    el.addEventListener('click', markComplete)
})
Array.from(todoMission).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

//acquires the data necessary to mark the task completed and sends it to the appropriate router-controller
async function markComplete(){
    const missionID = this.parentNode.dataset.id
    const taskValue = this.innerText
    try{
        const response = await fetch('mission/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'missionIdFromJSFile': missionID,
                'task': taskValue
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//acquires the data necessary to mark the task completed and sends it to the appropriate router-controller
async function markIncomplete(){
    const missionIdFromJSFile = this.parentNode.dataset.id
    const taskValue = this.innerText
    try{
        const response = await fetch('mission/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'missionIdFromJSFile': missionIdFromJSFile,
                'task': taskValue
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}