class Cart{

    getCart(){
        return JSON.parse(localStorage.getItem("cart")) ; 
    }
    setCart(cartItem){
        let cartList = this.getCart() === null ? [] :  this.getCart() ; 
        cartItem.quantities = 1 ; 
        cartList.push(cartItem) ; 
        localStorage.setItem("cart" , JSON.stringify(cartList)) 
    }
    setAll(arr){
        localStorage.setItem("cart" , JSON.stringify(arr)) 
    }
}