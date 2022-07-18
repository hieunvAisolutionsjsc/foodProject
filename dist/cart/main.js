const food = new Food() ; 
const cart = new Cart();
const pay = new Pay();
let listCart =  cart.getCart() === null ? [] :cart.getCart() ; 

const renderCart = (list)=>{
        const elementCart =  document.getElementById("cart") ; 
        const elementTotal = document.getElementById("total") ; 
        let sl = 0  ; 
        let money = 0 ; 
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
            list.forEach((element , index) => {
                const {imgsmail  ,quantities, id , name  , price} = element
                render+=`  <tr class="cart__item">
                <td class="cart__item--img">
                    <img src="${imgsmail}" alt="">
                </td>
                <td><p>${name} </p></td>
                
                <td><p>${price}VND</p></td>
                <td class="cart__item--quatities">
                <button class="reduce" value-id ="${id}">-</button>
                    <p>${quantities}</p>
                    <button class="increase" value-id ="${id}">+</button>
                    <button class="remove" value-id ="${id}"><img src="../img/trash_bin.png" value-id ="${id}"  > </button>
                </td>
            </tr>`
             sl +=quantities ; 
             money+=(quantities*price)
            });
            elementCart.innerHTML = render;
            elementTotal.innerHTML = ` <div class="total" id="total">
            <p>Số Món : ${list.length}</p>
            <p>Số lượng : ${sl}</p>
            <p>Tổng Tiền : ${money}</p>
        </div>`
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
            cart.setAll(listCart) ; 
            main()
           
            console.log(e);
            console.log(listCart)
        })
    });
    listElementReduce.forEach(element => {
        element.addEventListener("click" , (e)=>{
            const id = e.target.attributes["value-id"].value;
            listCart =  listCart.map(item => item.id === id ? {...item , quantities : item.quantities-1} : item);

            listCart = listCart.filter(item => item.quantities  > 0)
            cart.setAll(listCart)
            main()
            
           
            
            console.log(e);
          
        })
    });
}
const setListPay = ()=>{
    document.getElementById("setpay").onclick = ()=>{
                 pay.setAll(listCart)
    }
}
const setEventRemove= ()=>{
    const listElementRemove= [...(document.getElementsByClassName("remove"))] ; 
    console.log(listElementRemove);
    listElementRemove.forEach(item =>{
        item.onclick = (e)=>{
            const id = e.target.attributes["value-id"].value;
            cart.remove(id);
            main()
        }
    })
}
function main(){
    listCart =  cart.getCart() === null ? [] :cart.getCart() ; 
    renderCart(listCart);

    setEventQuantities();
    setListPay()
    setEventRemove();
    
}
main()