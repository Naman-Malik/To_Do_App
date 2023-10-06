const main = document.querySelector(".main");
const addBtn = document.querySelector(".add");
const delBtn = document.querySelector(".delete");
delBtn.addEventListener("click", deleteHelper);
let arr = [];
let isDelete = true;
const adddate = document.querySelector(".date");


const date = new Date();
// console.log(date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear());
adddate.innerHTML = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();

function deleteHelper() {
    if (isDelete == false) {
        let allTickets = document.querySelectorAll(".ticket");
    for(let i=0;i<allTickets.length;i++){
        let textarea = allTickets[i].querySelector("textarea");
        textarea.removeAttribute("readonly","");
    }
        isDelete = true;
    } else {
        let allTickets = document.querySelectorAll(".ticket");
    for(let i=0;i<allTickets.length;i++){
        let textarea = allTickets[i].querySelector("textarea");
        textarea.setAttribute("readonly","");
    }
        isDelete = false;
    }
}

addBtn.addEventListener("click",function(){
    handleCreation();
})
function handleCreation(){
    // isDelete = false;
    let id = uuidv4();
    createModal(id);
}

function createModal(id){
    let cColor = "black";
    let modal = document.createElement("div");
    modal.setAttribute("class","modal");
    modal.innerHTML=`
    <textarea class="contentarea"
    placeholder="Enter some Task"
    ></textarea>
    <div class="pallet_container">
    <div class="pallet_color pink"></div>
    <div class="pallet_color blue"></div>
    <div class="pallet_color green"></div>
    <div class="pallet_color black"></div>
    </div>`;
    main.appendChild(modal);
    let allColors = modal.querySelectorAll(".pallet_color");
    for(let i=0;i<allColors.length;i++){
        allColors[i].addEventListener("click",function(){
            cColor = allColors[i].classList[1];
        })
    }

    modal.addEventListener("keypress",function(e){
        let key = e.key;
        if(key=="Enter"){
            let textarea = modal.querySelector("textarea");
            let text = textarea.value;

            modal.remove();

            createTicket(id,cColor,text);
        }
    })
}

function createTicket(id,cColor,text){
    let ticket = document.createElement("div");
    ticket.setAttribute("class","ticket");
    ticket.innerHTML = `
    <div class="ticket_header ${cColor}"></div>
    <div class="ticket_content">
        <div class="ticket_id">#${id}</div>
        <textarea name="" id="txtara" >${text}</textarea>
    </div>
    `;
    main.appendChild(ticket);
    let header = ticket.querySelector(".ticket_header");
    header.addEventListener("click",changeColor);
    ticket.addEventListener("mouseup",deleteTicket);  
    // let students = ["Vikas", "Utsav", "Pranjal", 
    //                     "Aditya", "Arya"]
    arr.push({
        id:id,
        color:cColor,
        text:text
    })

    const edit = document.querySelectorAll("#txtara");
    // console.log(edit);
    for(let e=0;e<edit.length;e++){
    edit[e].addEventListener("input", function(e) {
        let ntext = e.currentTarget.value;
        let id = e.currentTarget.parentElement.parentElement.children[1].children[0].innerHTML;
        // console.log(ticket);
        arr.forEach((element) => {
            
          if (element.id == id.substring(1)) {
            console.log(element);
              element.text = ntext;
          }
        });
        localStrorage(arr);
    });
    }
    localStrorage(arr);
}

function deleteTicket(e){
    if(isDelete==true){
    if(e.button==2){
        // console.log(e.currentTarget.children[1].children[0].innerHTML);
        let chld = e.currentTarget.children[1].children[0].innerHTML;
        let arr2 = [];
        for(let i=0;i<arr.length;i++){
            if(arr[i].id!=chld.substring(1)){
                console.log(arr[i]);
                arr2.push(arr[i]);
            }
        }
        arr = arr2;
        localStrorage(arr);
    e.currentTarget.remove();
    }
}else{
    alert("First unlock it");
    return;
}
}

function localStrorage(arr){
    let string = JSON.stringify(arr)
    localStorage.setItem("arr", string) 
}


function changeColor(e){
    if(isDelete==false){
        return;
    }else{
    let header = e.currentTarget;
    let cColor = header.classList[1];
    let allColors = ["pink","blue","green","black"];
    let idx = 0;
    let id = 0;
    let chld = header.parentElement.children[1].children[0].innerHTML;

    for(let i=0;i<allColors.length;i++){
        if(cColor==allColors[i]){
            idx = i;
            break;
        }
    }

    idx = (idx+1)%allColors.length;

    header.classList.remove(cColor);
    header.classList.add(allColors[idx]);

    for (let Z = 0; Z < arr.length; Z++) {
        // console.log(arr[Z].id);
      if (arr[Z].id == chld.substring(1)) {
        arr[Z].color = allColors[idx];
        break;
      }
    }
    localStrorage(arr);
}
}

function setTickets(){
    let retString = localStorage.getItem("arr")
        let retArray = JSON.parse(retString)
        console.log(retArray);
        for(let i=0;i<retArray.length;i++){
            // let id = Object.entries(retArray[i].id);
            // let id = retArray[i].id;
            // console.log(id);
            // let color = retArray[i].color;
            // console.log(color);
            // let text = retArray[i].text;
            // console.log(text);
            createTicket(retArray[i].id,retArray[i].color,retArray[i].text);
        }
        arr = retArray;
}

setTickets();