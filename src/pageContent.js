import { isWeekly, isToday } from "./save"

export function initPageContent(){
    const create = document.createElement.bind(document)

    const content = document.getElementById('content')

    const localTodolist = JSON.parse(localStorage.getItem('Todolist'))

    //Create struture for website
    const header = create('div')
    const headerIcon = create('i')
    const main = create('div')
    const sidebar = create('div')
    const mainContent = create('div')
    const footer = create('div')
    
    //append header to the page
    headerIcon.classList.add('fa-solid', 'fa-list')
    header.textContent = "Todo List"
    header.classList.add('header')
    content.appendChild(header)
    header.appendChild(headerIcon)


    //append main sidebar to the page
    for(let i=0; i<5; i++){
        if(i===0){
            const sidebarRow = create('div')
            const sidebarIcon = create('i')
            sidebarIcon.classList.add('fa-solid', 'fa-inbox')
            sidebarRow.textContent = "Inbox"
            sidebarRow.classList.add('side-nav','active')
            sidebarRow.appendChild(sidebarIcon)
            sidebar.appendChild(sidebarRow)
        }
        if(i===1){
            const sidebarRow = create('div')
            const sidebarIcon = create('i')
            sidebarIcon.classList.add('fa-solid', 'fa-calendar-day')
            sidebarRow.textContent = "Today"
            sidebarRow.classList.add('side-nav')
            sidebarRow.appendChild(sidebarIcon)
            sidebar.appendChild(sidebarRow)
        }
        if(i===2){
            const sidebarRow = create('div')
            const sidebarIcon = create('i')
            sidebarIcon.classList.add('fa-solid', 'fa-calendar-week')
            sidebarRow.textContent = "This week"
            sidebarRow.classList.add('side-nav')
            sidebarRow.appendChild(sidebarIcon)
            sidebar.appendChild(sidebarRow)
        }
        if(i===3){
            const projects = create('h2')
            projects.textContent = "Projects"
            projects.classList.add('.sidebar-project')
            sidebar.appendChild(projects)
        }
        if(i===4){
            const sidebarRow = create('div')
            const sidebarIcon = create('i')
            sidebarIcon.classList.add('fa-solid', 'fa-plus')
            sidebarRow.textContent = "Add project"
            sidebarRow.classList.add('add-projects')
            sidebarRow.id = 'add-projects'
            sidebarRow.appendChild(sidebarIcon)
            sidebar.appendChild(sidebarRow)
        }
    }
    

    //append main content to the page
    const mainContentTitle = create('h2')
    const mainContentBtn = create('div')
    const btnIcon = create('i')

    btnIcon.classList.add('fa-solid', 'fa-plus')
    mainContentTitle.classList.add('content-title')
    mainContentBtn.classList.add('add-projects')
    mainContentBtn.id = 'add-task'

    mainContentTitle.textContent = "Inbox"
    mainContentBtn.textContent = "Add task"

    main.classList.add('main')
    sidebar.classList.add('sidebar')
    mainContent.classList.add('main-content')

    mainContent.appendChild(mainContentTitle)
    mainContent.appendChild(mainContentBtn)
    mainContentBtn.appendChild(btnIcon)
    content.appendChild(main)
    main.appendChild(sidebar)
    main.appendChild(mainContent)


    const add1 = mainContent.querySelector('#add-task')
    const add2 = sidebar.querySelector('#add-projects')
    if(localTodolist)renderTask(localTodolist[0]['task'],mainContent,add1)
    if(localTodolist)renderTask(localTodolist.slice(3),sidebar,add2)
    const deleteBtn1 = mainContent.querySelectorAll('.delete-icon')
    const deleteBtn2 = sidebar.querySelectorAll('.delete-icon')
    if(deleteBtn1.length>0)deleteTask(localTodolist,mainContent)
    if(deleteBtn2.length>0)deleteTask2(localTodolist,sidebar)

    //append footer to the page
    footer.textContent = 'Copyright © 2021 Le The Ky'
    footer.classList.add('footer')
    content.appendChild(footer)
}

export function showProject(){
    const projectRows = document.querySelectorAll('.project-row')
    projectRows.forEach(projectRow => projectRow.onclick = () => {
        const taskRows = document.querySelectorAll('.task-row')
        const mainContent = document.querySelector('.main-content')
        const contentTitle = mainContent.querySelector('.content-title')
        const projectRow2 = mainContent.querySelector('.project-row')
        const addTask = mainContent.querySelector('#add-task')
        const primary = mainContent.querySelector('.primary')
        if(taskRows.length>0)taskRows.forEach(task => mainContent.removeChild(task))
        if(projectRow2)mainContent.removeChild(projectRow2)
        if(addTask)mainContent.removeChild(addTask)
        if(primary)mainContent.removeChild(primary)
        mainContent.appendChild(projectRow)
        contentTitle.textContent = 'Project'
        const paras = projectRow.querySelectorAll('p')
        paras.forEach(para => para.setAttribute('style','display:inline-block'))
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

function deleteTask(arr,div){
    const deleteBtns = div.querySelectorAll('.delete-icon')
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


function setLocalStorage(content){
    const jsonTodolist = JSON.stringify(content)
    localStorage.setItem('Todolist',jsonTodolist)
}