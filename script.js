//select element
let searchedValue = document.querySelector("input");
let addItemBtn = document.querySelector("button");
let form = document.querySelector("form");
let tasksSection = document.querySelectorAll(".tasks-section");
// console.log(tasksSection);
let data = [];
let inProgress = {};
let draggedItem;

// {key==inprogress:value==['css','html']}

// functionilty of local storage
window.addEventListener("load", function () {
  for (let i = 0; i < tasksSection.length; i++) {
    let ReturnedStoredData = JSON.parse(localStorage.getItem(tasksSection[i].parentElement.className));
    if(!ReturnedStoredData)
    {
      ReturnedStoredData={};
    }
    let storedData =ReturnedStoredData[tasksSection[i].parentElement.className];
    if(!storedData)
    {
      storedData = [];
    }
    console.log(storedData);

    for (let j = 0; j < storedData.length; j++) {
      if (storedData[j]) {
        tasksSection[i].innerHTML +=`<li class="dragged-item" id="${storedData[j]}"draggable="true">${storedData[j]}</li>`;
      }
    }
  }
  
  draggedItem = document.querySelectorAll(".dragged-item");
  draggedItem.forEach((Element) => {
    Element.addEventListener("dragstart", function (event) {
      event.dataTransfer.setData("text", this.id);
    });
  });
});


addItemBtn.addEventListener("click", function (e) {
  e.preventDefault();
  inProgress = JSON.parse(localStorage.getItem("inProgress"));
  if (!inProgress) {
    inProgress = {};
  }
  if (!searchedValue.value) {
    alert("Invalid input");
  } else {
    data.push(searchedValue.value);
    tasksSection[0].innerHTML+=`<li class="dragged-item" id="${searchedValue.value}" draggable="true">${searchedValue.value}</li>`;
    searchedValue.value= "";
  }
  inProgress["inProgress"] = [...data];

  localStorage.setItem("inProgress", JSON.stringify(inProgress));
  // functionality of event //drag and drop functionality
  //  drag and drop event
  //console.log(data);
  draggedItem = document.querySelectorAll(".dragged-item");
  draggedItem.forEach((Element) => {
    Element.addEventListener("dragstart", dragStart);
  });

});
tasksSection.forEach(function (element) {
  element.addEventListener("dragover", dragOver);
  element.addEventListener("drop", drop);
});
function dragStart(event) {
  event.dataTransfer.setData("text", this.id);
}
function dragOver(event) {
  event.preventDefault();
}
let newData = [];

/*
inprogress[onhold]
  inprogress={


    inprogress = [html],
    onhold = [],
    Review = [],
    Approved = []

  }
  inprogress['onhold']
*/
function drop(event) {
  let droppedItem = event.dataTransfer.getData("text");
  let item = document.getElementById(droppedItem);

  let deletedItemClassName = item.parentElement.parentElement.className;
  let LocalStorageData = JSON.parse(localStorage[deletedItemClassName]);

  for (let i = 0; i < LocalStorageData[deletedItemClassName].length; i++) {
    if (LocalStorageData[deletedItemClassName][i] === droppedItem) {
      LocalStorageData[deletedItemClassName].splice(i, 1);
      newData.push(item.textContent);
    }
  }

  localStorage.setItem(deletedItemClassName, JSON.stringify(LocalStorageData));
  this.append(item);

 // console.log(newData);
  let parentClassName = this.parentElement.className;
  // console.log(parentClassName);
  let TransferedData = JSON.parse(localStorage.getItem(parentClassName));
  if (!TransferedData) {
    TransferedData = {};
    TransferedData[parentClassName]=[];
  }
  TransferedData[parentClassName].push(...newData);
  localStorage.setItem(parentClassName, JSON.stringify(TransferedData));
  newData = [];
 }

















// addItemBtn.addEventListener('click',function(e){
//     data.push(searchedValue.value)
//     console.log(data);
//     e.preventDefault();
//     for (let i = 0; i < array.length; i++) {
//         data = JSON.parse(localStorage.getItem('inProgress'));
//         for (let i = 0; i < data.length; i++) {
//             tasksSection.innerHTML+= `<li class="dragged-item"  draggable="true">${data[i]}</li>`;
//         }
//     }
// });

// window.addEventListener('load',function(){
//     let inProgress;
//     inProgress = JSON.parse(localStorage.getItem(inProgress));
//     if(!inProgress)
//     {
//         inProgress={};
//     }
//     inProgress['inProgress']= data;
//     localStorage.setItem('inProgress',JSON.stringify(inProgress));
// let items = JSON.parse(localStorage.getItem(tasksSection[0].parentElement.className));
// let itemsValue = [...Object.values(items)];
// console.log(itemsValue);
// for (const item of itemsValue) {
//     let li = document.createElement('li');
//         li.id=item;
//         li.draggable=true;
//         li.innerHTML = item;
//         li.addEventListener('dragstart', dragStart);
//         tasksSection[0].appendChild(li);
// }

// })
// for (let i = 0; i < tasksSection.length; i++) {
//     tasksSection[i].addEventListener('dragover', dragOver);
//     tasksSection[i].addEventListener('drop', drop);
// }

// function dragStart(e)
// {
//     e.dataTransfer.setData('text', this.id);
// }

// function dragOver(e)
// {
//     e.preventDefault();
// }
// function drop(e)
// {
//    let droppedValue = e.dataTransfer.getData('text');
//    let transItem =  document.getElementById(droppedValue);

//    console.log(transItem);

// }

//    tasksSection.forEach(function(element){
//             let items = JSON.parse(localStorage.getItem(element.parentElement.className));
//             console.log(element.parentElement.className);
//             console.log(items);
//             for (const key in items) {
//             let li = document.createElement('li');
//             li.id=key;
//             li.draggable=true;
//             li.innerHTML = items[key];
//             element.appendChild(li);
//         }

//     });
