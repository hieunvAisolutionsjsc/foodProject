let listFood  ; 
let numberDis = 1; 
const food = new Food() ; 
const cart = new Cart();
let pickCa = "all" ; 
food.setLocal() ; 
const mess = new Mess() ; 
 const pay = new Pay()       
listFood = food.getFood() === null ? [] : food.getFood();
const renderCa = ()=>{
    const listPick = [...document.getElementsByClassName("category__item")] ; 
   listPick.forEach(item => {
          const id = item.attributes["value-id"].value  ; 
         console.log(id)
          if(id=== pickCa){
            item.classList.add("ca-active") ; 
          }else{
            item.classList.remove("ca-active") ;
          }
   });
}

const renderList = (listFood)=>{
      const elementContainer = document.getElementById("listfood") ; 
      let render = "" ;
      let casePick = "" ; 
      let titleFood = document.getElementById("titlefood") ; 
      
       switch (pickCa) {
        case "a":
             casePick = "Món Á"
        break;
         case "au":
            casePick = "Món ÂU"
        break;
        case "dch":
            casePick = "Món Địa Trung Hải"
        break;
        case "tq":
             casePick = "Món Trung Quốc"
        break;
        case "nb":
            casePick = "Món Nhật Bản"
        break;
        case "tl":
            casePick = "Món Thái Lan"
        break;
        default:
            break;
       }
       titleFood.innerHTML = `Danh Sách Đồ Ăn ${casePick}`;
       if(listFood.length <= numberDis *20){
        document.getElementById("loadmore").style.display ="none" ;

    }else{
        document.getElementById("loadmore").style.display ="block" ;
    }
      for (let index = 0; index < ( 20*numberDis); index++) {
     let renderRate = "" ; 
     const element = listFood[index] ; 
  
     console.log(index)
    
        if(listFood[index]){
            for (let index = 0; index < element.rate; index++) {
                renderRate+= `<img src="../img/star.png" alt="">`
      
   }
            render+=` <div class="foodlist__item">
            <div class="foodlist__item--img">
                <a href="../detail/index.html?foodid=${element.id}"><img src="${element.imgbig}" alt=""></a>
            </div>
         <p><a href="../detail/index.html?foodid=${element.id}">${element.name}</a></p>
            <div class="rate price">
                <div class="foodlist__item--rate">
                    ${
                        renderRate
                      }
                 
                </div>
                <p>${element.price} VND</p>
            </div>
            <p class="dic">
                ${element.dc}
            </p>
            <div class="addcart ">
                <button class="fooddetail__content--addcart tocart" id-value=${element.id}>Add To Cart</button>
                <button class="fooddetail__content--buy buy" id-value=${element.id}>Buy Now</button>
            </div>
        </div>`
        }else{

        }
        
      }
      
      elementContainer.innerHTML = render;
}
const pickKindFood = (kind)=>{
   
    let listKind   = document.getElementsByClassName("category__item") ; 
    listKind = [...listKind];
    let foodKind ;
    listKind.forEach(element => {
        element.onclick = (e)=>{
            numberDis = 1;
            const value = element.attributes["value-id"].value ; 
         listFood = food.getFoodByKind(value) ;
         pickCa = value;
         renderCa();
         console.log(pickCa)
         console.log(listFood)
         renderList(listFood);
         setEventAddCart() ;
        setEventPay()
        }
        
    });
    console.log(foodKind);
}
const setEventAddCart = ()=>{
           let listBtnAddCart = document.getElementsByClassName("tocart") ; 
           listBtnAddCart = [...listBtnAddCart];
           listBtnAddCart.forEach(element => {
            element.onclick = (e)=>{
                
               const idFood = e.target.attributes["id-value"].value ; 
              food.getFood().forEach(element => {
                if(element.id === idFood){
                   console.log(element)
                   cart.setCart(element);
                  mess.setMess("Add to cart success")
                      
                }
              });
            }
           });
}
const setEventPay= ()=>{
    let listBtnAddCart = document.getElementsByClassName("buy") ; 
    listBtnAddCart = [...listBtnAddCart];
    listBtnAddCart.forEach(element => {
     element.onclick = (e)=>{
         
        const idFood = e.target.attributes["id-value"].value ; 
       (food.getFood()).forEach(element => {
         if(element.id === idFood){
            element.quantities = 1;
            pay.setAll([element])
            window.open("../pay/index.html")
                   
         }
       });
     }
    });
}
function main(){
    setTimeout(()=>{
        renderList(food.getFood());
        setEventAddCart() ;
        setEventPay();
        
       
    } , 1000)
    pickKindFood() ;
    document.getElementById("loadmore").onclick = (e)=>{
       numberDis = numberDis+1 ; 
       renderList(food.getFood());
       setEventAddCart() ;
        setEventPay()
    }
   
}

main();



