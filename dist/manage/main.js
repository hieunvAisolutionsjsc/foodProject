const food = new Food() ; 
const cart = new Cart();
const pay = new Pay();
const mess = new Mess()
food.setLocal()
let data =
           food.getFood() === null ? [] :food.getFood() ;
const renderManage = (list)=>{
    const elementManage =  document.getElementById("manage") ; 
    let render =`
    <tr>
        <th>STT  </th>
        <th>Image</th>
        <th>Name  
            </th>
        <th>Describe </th>
        <th>Price<select name="price" id="price">
        <option value="none">...</option>
            <option value="re">high to low</option>
            <option value="in">Low to high</option>
        </select></th>
            <th>Rate
            <select name="rate" id="rate">
        <option value="none">...</option>
            <option value="re">high to low</option>
            <option value="in">Low to high</option>
        </select>
        </th>
       </tr>`;
    if (list.length === 0) {
       elementManage.innerHTML = "<h2>You have no food </h2>" 
    }
    else{
        list.forEach((element , index) => {
            const {imgsmail , rate, id ,   dc2 , name   , price} = element
            render+=`  
             <tr class="manage__item">
             <td class="manage__item--img">
                <p>${index}</p>
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
                    <p>${rate}</p>
                    <img src="../img/star.png" alt="">
                </div>
               
            </div>
        </td>
        </tr>`
        });
        elementManage.innerHTML = render;
    }
  
}
const sortItem = (name , kind , data)=>{
let newData ;
     newData =  kind === "in"   ? data.sort((a ,b) => {
        console.log(parseInt(b) , name ,kind)
        return  parseInt(a[name])-parseInt(b[name])}) 
     : data.sort((a ,b) => {return  parseInt(b[name])-parseInt(a[name])}) ;
console.log(newData)
   main()
}
const elementManage =  document.getElementById("manage") ; 
const listSelect = [...elementManage.getElementsByTagName("select")] ;

function setE(){
    document.getElementById("rate").onchange =(e)=>{
        sortItem("rate" , e.target.value ,data) ; 
        
    }
    document.getElementById("price").onchange =(e)=>{
        console.log(data)
        sortItem("price" , e.target.value , data )
    }
}
const search = ()=>{
     const elementSearch = document.getElementById("search") ;
     const elementSearchF = document.getElementById("searchform") ;
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
  mess.setMess("Add food success")
 
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
    renderManage(data)
setE(); ;
addDis()
search()
}
main()