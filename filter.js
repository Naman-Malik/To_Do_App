let boxes = document.querySelectorAll(".color-boxes");

function showAllTickets(){
    let tkts = document.querySelectorAll(".ticket");
    for(let j=0;j<tkts.length;j++){
        tkts[j].style.display = "block";
    }
}

for(let i=0;i<boxes.length;i++){
    boxes[i].addEventListener("click",function(){
        
        let child = boxes[i].children[0];
        let color = child.classList[1];
        // console.log(color);

        let secondClass = boxes[i].classList[1];
        if(secondClass=="active"){
            showAllTickets();
        }else{

        for(let j=0;j<boxes.length;j++){
            boxes[j].classList.remove("active");
        }
        boxes[i].classList.add("active");

        // for()
        let tkts = document.querySelectorAll(".ticket");
        for(let j=0;j<tkts.length;j++){
            let tktschild = tkts[j].children[0];
            let tktschildcolor = tktschild.classList[1];
            console.log(tktschildcolor);
            if(tktschildcolor!=color){
                tkts[j].style.display = "none";
            }else{
                tkts[j].style.display = "block";
            }
        }
    }

    })
}