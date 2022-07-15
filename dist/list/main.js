let listFood  ; 
let numberDis = 1; 
const food = new Food() ; 
const cart = new Cart();
food.setLocal() ; 
const mess = new Mess() ; 
 const pay = new Pay()       
listFood = food.getFood() === null ? [] : food.getFood();
const renderList = (listFood)=>{
      const elementContainer = document.getElementById("listfood") ; 
      let render = "" ;
      for (let index = 0; index < ( 20*numberDis); index++) {
     
        if(listFood[index]){
            const element = listFood[index] ; 
            render+=` <div class="foodlist__item">
            <div class="foodlist__item--img">
                <a href="../detail/index.html?foodid=${element.id}"><img src="${element.imgbig}" alt=""></a>
            </div>
         <p><a href="../detail/index.html?foodid=${element.id}">${element.name}</a></p>
            <div class="rate price">
                <div class="foodlist__item--rate">
                    <p>${element.rate}</p>
                    <img src="../img/star.png" alt="">
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
            const value = element.attributes["value-id"].value ; 
         listFood = food.getFoodByKind(value) ;
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
            window.open("http://192.168.1.8:5500/dist/pay/index.html")
                   
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



