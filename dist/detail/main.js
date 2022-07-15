let foodInfor;
const pay = new Pay();
const cart = new Cart()
const food = new Food();
const mess = new Mess();
const getFood = ()=>{
    const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('foodid');
const listFood = food.getFood() ; 

console.log(id);
  const foodInfor = listFood.find(element => element.id === id) ; 
  return foodInfor;

}
foodInfor = getFood();
console.log(foodInfor)
const renderFood = () => {
            const elementFoodDetail = document.getElementById("fooddetail") ; 
            let render = "" ;
            const {imgbig , name , rate , restaurant , dc2  , price , id} = foodInfor ; 

            render = ` <div class="fooddetail__img">
            <img src="${imgbig}" alt="">
        </div>
        <div class="fooddetail__content"> 
            <p>${name}</p>
                <div class="fooddetail__content--rate fooddetail__content--price">
                    <div class="fooddetail__content--rate item">
                        <p>${rate}</p>
                        <img src="../img/star.png" alt="">
                    </div>
                    <p>${price} VND</p>
                </div>
                <div class="fooddetail__content--res item">
                    <p>Cung cấp bởi nhà hàng  : ${restaurant.name}</p>
                    <p>Địa chỉ  : ${restaurant.address}</p>
                </div>
                
                <div class="fooddetail__content--dic">
                    <p>Miêu Tả</p>
                    <p>
                  ${dc2}
                </p>
                </div>
                <div class="addcart">
                    <button class="fooddetail__content--addcart tocart"  id-value=${id}>Add To Cart</button>
                    <button class="fooddetail__content--buy buy"  id-value=${id}>Buy Now</button>
                </div>
                
        </div>`
        elementFoodDetail.innerHTML =render
}
const renderComment = ()=>{
    const elementComment = document.getElementById("comment") ; 
    let render = "" ; 
    const listComment = foodInfor.comment ; 
    console.log(listComment) ; 
    listComment.forEach(element => {
        render+=`<div class="comment__item">
        <div class="comment__item--avatar">
            <div>
                <img src="${element.avatar}" alt="">
            </div>
            <p>${element.name}</p>
        </div>
        <p>${element.comment}</p>
    </div>`
    });
    elementComment.innerHTML = render;
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
food.getFood().forEach(element => {
  if(element.id === idFood){
     element.quantities = 1;
     pay.setAll([element])
     window.open("http://192.168.1.8:5500/dist/pay/index.html")
            
  }
});
}
});
}

renderFood()
renderComment()
setEventAddCart()
setEventPay()