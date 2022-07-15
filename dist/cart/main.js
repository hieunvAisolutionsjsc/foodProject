const food = new Food() ; 
const cart = new Cart();
const pay = new Pay();
let listCart = cart.getCart() ; 

const renderCart = (list)=>{
        const elementCart =  document.getElementById("cart") ; 
        let render =`
        <tr>
         <th>Ảnh</th>
         <th>Tên</th>
         <th>Đơn giá</th>
         <th>Số lượng</th>
        </tr>`;
        if (list.length === 0) {
           elementCart.innerHTML = "<h2>You have no food </h2>" 
        }
        else{
            list.forEach(element => {
                const {imgsmail  ,quantities, id , name  , price} = element
                render+=`  <tr class="cart__item">
                <td class="cart__item--img">
                    <img src="${imgsmail}" alt="">
                </td>
                <td><p>${name} </p></td>
                
                <td><p>${price}VND</p></td>
                <td class="cart__item--quatities">
                    <button class="increase" value-id ="${id}">+</button>
                    <p>${quantities}</p>
                    <button class="reduce" value-id ="${id}">-</button>
                </td>
            </tr>`
            });
            elementCart.innerHTML = render;
        }
      
}
const setEventQuantities = ()=>{
    const listElementReduce = [...(document.getElementsByClassName("reduce"))] ; 
    const listElementIncrease = [...(document.getElementsByClassName("increase"))] ; 
    console.log(listElementIncrease , listElementReduce);
    listElementIncrease.forEach(element => {
        element.addEventListener("click" , (e)=>{
            const id = e.target.attributes["value-id"].value;
            listCart =  listCart.map(item => item.id === id ? {...item , quantities : item.quantities+1} : item);
            main()
            cart.setAll(listCart) ; 
            console.log(e);
            console.log(listCart)
        })
    });
    listElementReduce.forEach(element => {
        element.addEventListener("click" , (e)=>{
            const id = e.target.attributes["value-id"].value;
            listCart =  listCart.map(item => item.id === id ? {...item , quantities : item.quantities-1} : item);
            listCart = listCart.filter(item => item.quantities  > 0)
            main()
            cart.setAll(listCart) ; 
            console.log(e);
            console.log(listCart)
        })
    });
}
const setListPay = ()=>{
    document.getElementById("setpay").onclick = ()=>{
                 pay.setAll(listCart)
    }
}
function main(){
    renderCart(listCart);

    setEventQuantities();
    setListPay()
    
}
main()