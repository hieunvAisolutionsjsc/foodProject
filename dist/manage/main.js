const food = new Food() ; 
const cart = new Cart();
const pay = new Pay();
const mess = new Mess();
let display = 1 ; 
food.setLocal()
let data =
           food.getFood() === null ? [] :food.getFood() ;
let sortName = "none" ; 
let sortDe = "none" ; 
let sortPrice = "none" ; 
let sortRate = "none";
const renderManage = (list)=>{
    const elementManage =  document.getElementById("manage") ; 
    const elementLoadMore = document.getElementById("loadmore");
    if(list.length <= 20*display){
        elementLoadMore.style.display ="none" ; 
    }else{
        elementLoadMore.style.display ="block" ; 
    }
    let render =`
    <tr>
        <th>STT</th>
        <th>Image</th>
        <th>Name <div class="sort-icon ${sortName}" id="sortname">
        <img src="../img/up-and-down-opposite-double-arrows-side-by-side.png" alt="">
        <img src="../img//up-arrow.png" alt="">
        <img src="../img/down-arrow.png" alt=""> 
        </div>
            </th>
        <th>Describe
        <div class="sort-icon ${sortDe}" id="sortde">
        <img src="../img/up-and-down-opposite-double-arrows-side-by-side.png" alt="">
        <img src="../img//up-arrow.png" alt="">
        <img src="../img/down-arrow.png" alt=""> 
        </div>
        </th>
        <th>Price
        <div class="sort-icon ${sortPrice}" id="sortprice">
        <img src="../img/up-and-down-opposite-double-arrows-side-by-side.png" alt="">
        <img src="../img//up-arrow.png" alt="">
        <img src="../img/down-arrow.png" alt=""> 
        </div>
        </th>
      
        </div>
            <th>Rate
            <div class="sort-icon ${sortRate}" id="sortrate">
            <img src="../img/up-and-down-opposite-double-arrows-side-by-side.png" alt="">
            <img src="../img//up-arrow.png" alt="">
            <img src="../img/down-arrow.png" alt=""> 
            </div>
        </th>
       </tr>`;
    if (list.length === 0) {
       elementManage.innerHTML = "<h2>You have no food </h2>" 
    }
    else{
        for (let index = 0; index < 20*display; index++) {
            if(list[index]){
                const element = list[index];
            
                let renderRate = "";
                for (let index = 0; index < element.rate; index++) {
                    renderRate+= `<img src="../img/star.png" alt="">`
       }
                const {imgsmail , rate, id ,   dc2 , name   , price} = element ; 
                
                render+=`  
                 <tr class="manage__item">
                 <td class="manage__item--img">
                    <p>${index+1}</p>
                </td>
                <td class="manage__item--img">
                    <img src="${imgsmail}" alt="">
                </td>
                <td><p>${name} </p></td>
                 <td >
                   
                    <p>${dc2}</p>
                   
                </td>
                <td><p>${price}VND</p></td>
                <td><div class="rate price">
                    <div class="foodlist__item--rate">
                        ${renderRate}
                    </div>
                   
                </div>
            </td>
            </tr>`
            }
           
        
        }
        
        elementManage.innerHTML = render;
    }
  
}
const sortItem = (name , kind , data)=>{
    console.log(data)
let newData ;
if(name ==="name" || name === "dc2"){
    newData =  kind === "in"   ? data.sort((a, b) => a[name].localeCompare(b[name]))
                                : data.sort((a, b) => b[name].localeCompare(a[name]));
}
     newData =  kind === "in"   ? data.sort((a ,b) => {
        
        return  parseInt(a[name])-parseInt(b[name])}) 
     : data.sort((a ,b) => {return  parseInt(b[name])-parseInt(a[name])}) ;
     renderManage(data)
   main()
}
const elementManage =  document.getElementById("manage") ; 
const listSelect = [...elementManage.getElementsByTagName("select")] ;

function setEventSort(){
   
    const elementSortName = document.getElementById("sortname") ; 
    const elementSortDe = document.getElementById("sortde") ;
    const elementSortPrice = document.getElementById("sortprice") ;
    const elementSortRate = document.getElementById("sortrate") ;

    elementSortName.onclick = (e)=>{
        sortName = sortName === "re"   ? "in" : "re" ; 
     
          sortDe = "none" ; 
          sortPrice = "none" ; 
          sortRate = "none";
        sortItem("name" , sortName , data)
    }
    elementSortDe.onclick = (e)=>{
        sortDe = sortDe === "re"   ? "in" : "re" ; 
        sortName = "none" ; 
        sortPrice = "none" ; 
        sortRate = "none";
        sortItem("dc2" , sortDe , data)
    }
    elementSortPrice.onclick = (e)=>{
         sortName = "none" ; 
         sortDe = "none" ; 
         sortRate = "none";
        sortPrice = sortPrice === "re"   ? "in" : "re" ; 
        sortItem("price" , sortPrice , data)
    }
    elementSortRate.onclick = (e)=>{
        
        sortRate = sortRate === "re"   ? "in" : "re" ; 
        sortName = "none" ; 
         sortDe = "none" ; 
         sortPrice = "none" ; 
        sortItem("rate" , sortRate , data)
    }
}
const search = ()=>{
     const elementSearch = document.getElementById("search") ;
     const elementSearchF = document.getElementById("searchform") ;
     console.log(elementSearch)
     elementSearchF.onsubmit = (e)=>{
        e.preventDefault()
     }
     elementSearch.onchange = (e)=>{
        const value = e.target.value;
        let newData ; 
        console.log("first")
        if(value ===""){
            newData =
           food.getFood() === null ? [] :food.getFood() ;
        }else{
            newData=data.filter((element)=> (element.name).indexOf(value) !== -1 ||(element.dc2).indexOf(value) !== -1);
        }
        renderManage(newData);
       
     }
}
const arrinput = document.getElementById("formadd") ; 
const a = arrinput.getElementsByTagName("input") ; 

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}
console.log(a) ; 
const dataS  = {} ; 
let s = [...a] ; 
s.forEach(element => {
  const t = element.attributes["name"].value; 
  element.onchange = e=>{
   if(e.target.attributes["type"].value === "file"){
    const file = e.target.files[0];
    const reader = new FileReader();
    

  reader.addEventListener("load", function (result) {
    // convert image file to base64 string
    dataS[e.target.attributes["name"].value]= result.target.result;
    document.getElementById(e.target.attributes["name"].value).innerHTML = ` <img src="${result.target.result}" alt="">`
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
   }
else{
  dataS[e.target.attributes["name"].value]= e.target.value;
}

  }
  console.log(t)  ;

});
arrinput.onsubmit = (e)=>{
    e.preventDefault();
    const dataSRes = {
        name : dataS.nameres , 
        adddress : dataS.address
    }
    delete dataS.nameres ; 
    delete dataS.adddress ; 
    const newDataS = {
        ...dataS , 
        rate : 5,
        restaurant : dataSRes ,
        id : food.getFood() != null ?   (Math.max(...(
            food.getFood().map(re=> re.id)
            )
            )+1
            ) : getRandomInt(1000  , 9000)
    }
    console.log(newDataS)
  food.setFood(newDataS)
  mess.setMess("Add food success") ; 
  data =
  food.getFood() === null ? [] :food.getFood() ;
 main()
 
  const elementAdd = document.getElementById("formadd") ; 
  
        elementAdd.classList.remove("addactive")
  
}
const addDis = ()=>{
    const elementOpen = document.getElementById("add") ; 
    const elementAdd = document.getElementById("formadd") ; 
    const elementCancel = document.getElementById("cancel") ;
    elementOpen.onclick =()=>{
          elementAdd.classList.add("addactive")
    }
    elementCancel.onclick =()=>{
        elementAdd.classList.remove("addactive")
  }
}
function main(){
    document.getElementById("loadmore").onclick = (e)=>{
        display = display+1 ; 
       
  
        renderManage(data);
        setEventSort(); ;
        addDis()
        search()
     }
    renderManage(data)
setEventSort(); ;
addDis()
search()
}
main()