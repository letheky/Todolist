export function saveInput(){
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)
   
    
    const mainContent = $('.main-content')
    const sidebar = $('.sidebar')
    const addBtn1 = mainContent.querySelector('.primary')
    const addBtn2 = sidebar.querySelector('.primary')
    let todoList

    const initTodoList = [
        {'name':'inbox','task':[]},
        {'name':'daily','task':[]},
        {'name':'weekly','task':[]}
    ]

    const localTodolist = JSON.parse(localStorage.getItem('Todolist'))
    
    if(localTodolist)todoList = localTodolist
    else todoList = initTodoList
    createObject(addBtn1,todoList)
    createObject(addBtn2,todoList)
}

function createObject(div,todoList){
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)

    

    //primary assignment
    let title = ''
    let desc = ''
    let date = ''
    let priority = ''
    let object

    //advanced  assignment
    const project = []
    

    //element assignment
    const rdbBtn = div.querySelector('.priority').childNodes
    const allInput = div.querySelectorAll('input')
    const confirmBtn = div.querySelector('.btn-confirm')
    const cancelBtn = div.querySelector('.btn-cancel')
    const mainContent = document.querySelector('.main-content')
    const sidebar = document.querySelector('.sidebar')
    const add1 = mainContent.querySelector('#add-task')
    const add2 = sidebar.querySelector('#add-projects')
    allInput[0].addEventListener('change',function setTitle(){
        title = allInput[0].value
    })
    allInput[1].addEventListener('change',function setTitle(){
        desc = allInput[1].value
    })
    allInput[2].addEventListener('change',function setTitle(){
        date = allInput[2].value
    })
    rdbBtn.forEach(rdb=>rdb.addEventListener('click',function checkPriority(){
        if(rdb.checked === true)priority = rdb.value
    }))
    confirmBtn.addEventListener('click',function saveInfo(){
        if(title&&desc&&date&&priority){
            object = {title, desc, date, priority}
           
            const mainContent = $('.main-content')
            const sidebar = $('.sidebar')
            const addBtn1 = mainContent.querySelector('.primary')
            const addBtn2 = sidebar.querySelector('.primary')
    
            if(div === addBtn1){
                todoList[0]['task'].push(object)
                if(isToday(date))todoList[1]['task'].push(object)
                if(isWeekly(date))todoList[2]['task'].push(object)
                const taskRows = document.querySelectorAll('.task-row')
                if(taskRows.length>0)taskRows.forEach(taskRow=>mainContent.removeChild(taskRow))
                setLocalStorage(todoList)
                renderTask(todoList[0]['task'],mainContent,add1)
                deleteTask(todoList,mainContent)
            }
            if(div === addBtn2){
                todoList.push(object)
                const projectRows = document.querySelectorAll('.projects-row')
                if(projectRows)projectRows.forEach(projectRow=>mainContent.removeChild(projectRow))
                setLocalStorage(todoList)
                renderTask(todoList.slice(-1),sidebar,add2)
                deleteTask2(todoList,sidebar)
            }
            allInput[0].value = allInput[1].value = allInput[2].value = title = desc = date = priority = ''
            rdbBtn.forEach(rdb=>rdb.checked = false)
        }
    })
    cancelBtn.addEventListener('click',function exit(){
        title = ''
        desc = ''
        date = ''
        priority = ''
    })
}

function renderTask(arr,root,lastChild){
    arr.forEach(arr=>{
        const mainContent = document.querySelector('.main-content')
        const sidebar = document.querySelector('.sidebar')
        const taskRow = document.createElement('div')
        const rowTitle = document.createElement('p')
        const rowDesc = document.createElement('p')
        const rowDate = document.createElement('p')
        const rowPrior = document.createElement('p')
        const rowDelete = document.createElement('div')
        
        if(root === mainContent)taskRow.classList.add('task-row')
        if(root === sidebar)taskRow.classList.add('project-row')
        rowDelete.classList.add('delete-icon')

        rowTitle.textContent = arr.title
        rowDesc.textContent = arr.desc
        rowDate.textContent = arr.date
        rowPrior.textContent = arr.priority
        rowDelete.textContent = 'X'

        taskRow.appendChild(rowTitle)
        taskRow.appendChild(rowDesc)
        taskRow.appendChild(rowDate)
        taskRow.appendChild(rowPrior)
        taskRow.appendChild(rowDelete)

        root.insertBefore(taskRow,lastChild)
    })
}


function setLocalStorage(content){
    const jsonTodolist = JSON.stringify(content)
    localStorage.setItem('Todolist',jsonTodolist)
}

export function isWeekly(dueDate){
    const date = new Date()
    let isWeekly
    const firstDay = date.getDate()-date.getDay()+1
    const lastDay = firstDay+6

    dueDate = Number(dueDate.slice(-2))
    if( dueDate >= firstDay && dueDate <= lastDay) isWeekly = true
    else isWeekly = false
    return isWeekly
}

export function isToday(dueDate){
    const date = new Date()
    let isToday

    dueDate = Number(dueDate.slice(-2))
    if(dueDate === date.getDate())isToday = true
    else isToday = false
    return isToday
}

function deleteTask(arr,div){
    const deleteBtns = div.querySelectorAll('.delete-icon')
    let date
    if(deleteBtns)deleteBtns.forEach((deleteBtn,index)=>deleteBtn.onclick = ()=>{
        const date = arr[0]['task'][index]['date']
        deleteBtn.parentNode.setAttribute('style','display:none')
        arr[0]['task'].splice(index,1)
        if(isToday(date))arr[1]['task'].splice(index,1)
        if(isWeekly(date))arr[2]['task'].splice(index,1)
        setLocalStorage(arr)
    })
}

function deleteTask2(arr,div){
    const deleteBtns = div.querySelectorAll('.delete-icon')
    if(deleteBtns)deleteBtns.forEach((deleteBtn,index)=>deleteBtn.onclick = ()=>{
        deleteBtn.parentNode.setAttribute('style','display:none')
        arr.splice(index+3,1)
        setLocalStorage(arr)
    })
}