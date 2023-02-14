// Brainstorm what kind of properties your todo-items are going to have. 
// At a minimum they should have a title, description, dueDate and priority. 
// You might also want to include notes or even a checklist.
// Your todo list should have projects or separate lists of todos. 
// When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put.
//  Users should be able to create new projects and choose which project their todos go into.


export function displayInput(){
    //create struture for website
    const create = document.createElement.bind(document)
    const addTasks = document.querySelector('#add-task')
    const addProjects = document.querySelector('#add-projects')
    const mainContent = document.querySelector('.main-content')
    const sidebar = document.querySelector('.sidebar')
    
    //create form block
    function createThing1(){
        const addThing = create('div')
        const addTitle = create('input')
        const addDesc = create('input')
        const addDate = create('input')
        const addPriority = create('div')
        const highPriority = create('input')
        const hLabel = create('label')
        const mediumPriority = create('input')
        const mLabel = create('label')
        const lowPriority = create('input')
        const lLabel = create('label')
        const addConfirm = create('button')
        const addCancel = create('button')
        
        function setAttributes(el, attrs) {
            for(let key in attrs) {
            el.setAttribute(key, attrs[key]);
            }
        }
        function appendChilds(el,childs){
            for(let child of childs){
                el.appendChild(child)
            }
        }
        setAttributes(addTitle,{'type':'text','name':'title','placeholder':'Fill out your title here'})
        setAttributes(addDesc,{'type':'text','name':'desc','placeholder':'Fill out your description here'})
        setAttributes(addDate,{'type':'date','name':'date'})
        setAttributes(highPriority,{'type':'radio','name':'priority','id':'highPrior1','value':'high'})
        setAttributes(mediumPriority,{'type':'radio','name':'priority','id':'mediumPrior1','value':'medium'})
        setAttributes(lowPriority,{'type':'radio','name':'priority','id':'lowPrior1','value':'low'})

        hLabel.textContent = 'high'
        hLabel.htmlFor = 'highPrior1'
        mLabel.textContent = 'medium'
        mLabel.htmlFor = 'mediumPrior1'
        lLabel.textContent = 'low'
        lLabel.htmlFor = 'lowPrior1'
        addConfirm.textContent = 'Submit'
        addCancel.textContent = 'Cancel'

        addPriority.classList.add('priority')
        addConfirm.classList.add('btn-confirm')
        addCancel.classList.add('btn-cancel')
        addThing.classList.add('primary')

        appendChilds(addPriority,[highPriority,hLabel,mediumPriority,mLabel,lowPriority,lLabel])
        appendChilds(addThing,[addTitle,addDesc,addDate,addPriority,addConfirm,addCancel])
        
        return addThing
    }
    //create form block
    function createThing2(){
        const addThing = create('div')
        const addTitle = create('input')
        const addDesc = create('input')
        const addDate = create('input')
        const addPriority = create('div')
        const highPriority = create('input')
        const hLabel = create('label')
        const mediumPriority = create('input')
        const mLabel = create('label')
        const lowPriority = create('input')
        const lLabel = create('label')
        const addConfirm = create('button')
        const addCancel = create('button')
        
        function setAttributes(el, attrs) {
            for(let key in attrs) {
            el.setAttribute(key, attrs[key]);
            }
        }
        function appendChilds(el,childs){
            for(let child of childs){
                el.appendChild(child)
            }
        }
        setAttributes(addTitle,{'type':'text','name':'title','placeholder':'Fill out your title here'})
        setAttributes(addDesc,{'type':'text','name':'desc','placeholder':'Fill out your description here'})
        setAttributes(addDate,{'type':'date','name':'date'})
        setAttributes(highPriority,{'type':'radio','name':'priority','id':'highPrior2','value':'high'})
        setAttributes(mediumPriority,{'type':'radio','name':'priority','id':'mediumPrior2','value':'medium'})
        setAttributes(lowPriority,{'type':'radio','name':'priority','id':'lowPrior2','value':'low'})

        hLabel.textContent = 'high'
        hLabel.htmlFor = 'highPrior2'
        mLabel.textContent = 'medium'
        mLabel.htmlFor = 'mediumPrior2'
        lLabel.textContent = 'low'
        lLabel.htmlFor = 'lowPrior2'
        addConfirm.textContent = 'Submit'
        addCancel.textContent = 'Cancel'

        addPriority.classList.add('priority')
        addConfirm.classList.add('btn-confirm')
        addCancel.classList.add('btn-cancel')
        addThing.classList.add('primary')

        appendChilds(addPriority,[highPriority,hLabel,mediumPriority,mLabel,lowPriority,lLabel])
        appendChilds(addThing,[addTitle,addDesc,addDate,addPriority,addConfirm,addCancel])
        
        return addThing
    }

    //add form block to main-content and sidebar
    const addThing1 = createThing1()
    const addThing2 = createThing2()

    mainContent.appendChild(addThing1)
    sidebar.appendChild(addThing2)
    addThing1.setAttribute('style','display:none;')
    addThing2.setAttribute('style','display:none;')

    addTasks.addEventListener('click',function showAddThing1(){
        addThing1.setAttribute('style','display:flex;')
        addTasks.setAttribute('style','display:none;')
        addThing2.setAttribute('style','display:none;')
        addProjects.setAttribute('style','display:flex;')
    })
    addProjects.addEventListener('click',function showAddThing2(){
        addTasks.setAttribute('style','display:flex;')
        addThing1.setAttribute('style','display:none;')
        addThing2.setAttribute('style','display:flex;')
        addProjects.setAttribute('style','display:none;')
    })

    //set function display formblock for main content
    const allInput1 = addThing1.querySelectorAll('input')
    const addCancel1 = addThing1.querySelector('.btn-cancel')
    const addConfirm1 = addThing1.querySelector('.btn-confirm')
    addCancel1.addEventListener('click', function handleCancel(){
        addTasks.setAttribute('style','display:flex;')
        addThing1.setAttribute('style','display:none;')
    })
    addConfirm1.addEventListener('click',function handleAddTasks(){
        if(checkEmpty(allInput1[0],allInput1[1],allInput1[2],checkRdb(allInput1[3],allInput1[4],allInput1[5]))){
            addTasks.setAttribute('style','display:flex;')
            addThing1.setAttribute('style','display:none;')
        }
        else window.alert('You have to fill all the input')
    })

    //set function display formblock for sidebar
    const allInput2 = addThing2.querySelectorAll('input')
    const addCancel2 = addThing2.querySelector('.btn-cancel')
    const addConfirm2 = addThing2.querySelector('.btn-confirm')
    addCancel2.addEventListener('click', function handleCancel(){
        addProjects.setAttribute('style','display:flex;')
        addThing2.setAttribute('style','display:none;')
    })
    addConfirm2.addEventListener('click',function handleAddTasks(){
        if(checkEmpty(allInput2[0],allInput2[1],allInput2[2],checkRdb(allInput2[3],allInput2[4],allInput2[5]))){
            addProjects.setAttribute('style','display:flex;')
            addThing2.setAttribute('style','display:none;')
        }
        else window.alert('You have to fill all the input')
    })

}

export function getPresentTab(){
    const $ = document.querySelector.bind(document)
    const $$ = document.querySelectorAll.bind(document)

    const localTodolist = JSON.parse(localStorage.getItem('Todolist'))

    const sidaNavs = $$('.side-nav')
    
    sidaNavs.forEach(sideNav=>sideNav.addEventListener('click',function currentTab(){
        const contentTitle = $('.content-title')
        const activeTab = $('.active')
        const addTasks = $('#add-task')
        const mainContent = $('.main-content')
        const taskRow = $$('.task-row')
        const localTodolist = JSON.parse(localStorage.getItem('Todolist'))

        activeTab.classList.remove('active')
        sideNav.classList.add('active')
        contentTitle.textContent = sideNav.textContent
        if(sideNav.textContent === "This week"){
            if(addTasks)mainContent.removeChild(addTasks)
            if(taskRow)taskRow.forEach(task=>mainContent.removeChild(task))
            if(localTodolist)renderTask2(localTodolist[2]['task'],mainContent)
        }
        else if(sideNav.textContent === "Today"){
            if(addTasks)mainContent.removeChild(addTasks)
            if(taskRow)taskRow.forEach(task=>mainContent.removeChild(task))
            if(localTodolist)renderTask2(localTodolist[1]['task'],mainContent)
        }
        else if(sideNav.textContent === "Inbox"){
            if(taskRow)taskRow.forEach(task=>mainContent.removeChild(task))
            if(localTodolist)renderTask2(localTodolist[0]['task'],mainContent)
            if(!addTasks)mainContent.appendChild(createTask())
        }
    }))
}



function createTask(){
    const mainContentBtn = document.createElement('div')
    const btnIcon = document.createElement('i')

    btnIcon.classList.add('fa-solid', 'fa-plus')
    mainContentBtn.classList.add('add-projects')
    mainContentBtn.id = 'add-task'

    mainContentBtn.textContent = "Add task"
    
    mainContentBtn.appendChild(btnIcon)
    return mainContentBtn
}

function checkRdb(rdb1,rdb2,rdb3){
    if(!rdb1.checked&&!rdb2.checked&&!rdb3.checked)return false
    else return true
}

function checkEmpty(in1,in2,in3,in4){
    if(in1&&in2&&in3&&in4)return true
    else return false
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
function renderTask2(arr,root){
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

        root.appendChild(taskRow)
    })
}