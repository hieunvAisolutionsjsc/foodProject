const food = new Food() ; 
const pay = new Pay();
const mess = new Mess(); 
let listPay = [];
listPay = pay.getPay() ; 
const renderList = (list)=>{
    
    const elementPay =  document.getElementById("pay") ; 
    let render =`
    <tr>
     <th>Image</th>
     <th>Name</th>
     <th>Price</th>
     <th>Quantities</th>
    </tr>`;
    if (list.length === 0 || list.length ===null) {
       elementPay.innerHTML = "<h2>You have no food </h2>" 
    }
    else{
        list.forEach(element => {
            const {imgsmail  ,quantities, id , name  , price} = element
            render+=`  <tr class="pay__item">
            <td class="pay__item--img">
                <img src="${imgsmail}" alt="">
            </td>
            <td><p>${name} </p></td>
            
            <td><p>${price}VND</p></td>
            <td class="pay__item--quatities">
                
                <p>${quantities}</p>
                
            </td>
        </tr>`
        });
        elementPay.innerHTML = render;
    }
  

}
const renderPay = ()=>{
       let quantities  = 0 ; 
       let payment = 0 ; 
       let render = ""
       const elementPayTop = document.getElementById("paytop") ; 
     listPay.forEach(element => {
        quantities+=element.quantities;
        payment+=(element.quantities)*parseInt(element.price)
     });
console.log(quantities , payment);
render+=` <div class="totalpay">
<p> total pay  : ${payment}VND</p>
</div>
<div class="totalitem">
<p>total food : ${quantities}</p>
</div>`
       elementPayTop.innerHTML = render;
}
const renderSelectTp =(data)=>{
    const elementTp =  document.getElementById("TP") ; 
    let render = "" ; 
    
    data.forEach((element)=>{
        render+=`<option class="option" value="${element.code}">${element.name}</option>`
    })
    elementTp.innerHTML = render;
}
const renderSelectQh =(data)=>{
    const elementQH =  document.getElementById("QH") ; 
    let render = "" ; 
    console.log(data)
    data.forEach((element)=>{
        render+=`<option class="option" value="${element.code}">${element.name}</option>`
    })
    elementQH.innerHTML = render;
}
const renderSelectX =(data)=>{
    const elementX =  document.getElementById("X") ; 
    let render = "" ; 
    console.log(data)
    data.forEach((element)=>{
        render+=`<option class="option" value="${element.code}">${element.name}</option>`
    })
    elementX.innerHTML = render;
}
const getTT  = async(url) =>{
    const data = await fetch(url) ;
    return data.json()
}
getTT("https://api.mysupership.vn/v1/partner/areas/province").then((result)=>{
  
    renderSelectTp(result.results);
})
const elementTp =  document.getElementById("TP") ; 
elementTp.onchange = (e)=>{
    let value = e.target.value ;
    console.log(value);
    getTT(`https://api.mysupership.vn/v1/partner/areas/district?province=${value}`)
    .then(result =>{
        console.log(result)
        renderSelectQh(result.results);
    })

}
const elementQh =  document.getElementById("QH") ;
elementQh.onchange = (e)=>{
    let value = e.target.value ;
    console.log(value);
    getTT(`https://api.mysupership.vn/v1/partner/areas/commune?district=${value}`)
    .then(result =>{
        console.log(result)
        renderSelectX(result.results);
    })

}

renderList(listPay)
renderPay() ;
document.getElementById("paybtn").onclick = (e)=>{
    mess.setMess("Pay done")
  }