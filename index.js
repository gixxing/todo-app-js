
let arr = JSON.parse(localStorage.getItem("data")) || [];

const addTask = document.getElementById("addTask") ;
const tasks = document.querySelector(".tasks ul");

display();

addTask.addEventListener("click" , addNewTask);

document.addEventListener("keydown" , event => {

    if(event.key === "Enter"){
        addNewTask();
    }

});

function addNewTask(){
    const inputTask = document.getElementById("inputTask").value.trim();

    if(inputTask == ""){
        return ;
    }

    arr.push({

        id : Date.now(),
        text : inputTask,
        completed : false,
    });

    display();
    
    updateLocalStorage();

    document.getElementById("inputTask").value = "";
}


function display(){
    
    tasks.textContent = "";

    arr.forEach(element => {
        
        const newTask = document.createElement("li");
        const newCheckbox = document.createElement("input");
        const newDelBtn = document.createElement("button");
        const newP = document.createElement("p");

        addproperties(newTask, newCheckbox, newDelBtn, newP, element);

        newCheckbox.addEventListener("change" , () => {

            element.completed = !element.completed ;

            display();

            updateLocalStorage();
        });

        newDelBtn.addEventListener("click", () => {

            const index = arr.findIndex(task => task.id === element.id);
            arr.splice(index, 1);

            display();
            updateLocalStorage();

        });

        tasks.appendChild(newTask);


    });
}

function addproperties(newTask, newCheckbox, newDelBtn, newP, element){
    
    newCheckbox.type = "checkbox";
    newCheckbox.classList.add("circleCheck");
    
    newDelBtn.textContent = "X";
    newDelBtn.classList.add("delete");

    newP.textContent = element.text;
    newP.classList.add("line");

    if(element.completed){
        newP.classList.add("completed");
        newCheckbox.checked = true ;
    }
    else{
        newP.classList.remove("completed");
    }

    newTask.appendChild(newCheckbox);
    newTask.appendChild(newP);
    newTask.appendChild(newDelBtn);
}

function updateLocalStorage(){

    localStorage.setItem("data", JSON.stringify(arr));

}
