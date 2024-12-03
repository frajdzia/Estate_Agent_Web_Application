import React, {useState} from 'react';

const Cart = ({cartItems, setCartItems}) =>{
    const [total, setTotal] = useState(0);
    const handleDrop = (e) =>{
        e.preventDefault();
        const properties = JSON.parse(e.dataTransfer.getData('properties'));
        const updatedCart = [...cartItems];
        const index = updatedCart.findIndex(item => item.id === properties.id);
        if (index === -1){
            updatedCart.push({...properties, quantity:1});
        }
        else{
            updatedCart[index].quantity +=1
        }
        setCartItems(updatedCart);
        updateTotal(updatedCart);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const updateTotal = (items) => {
        const totalPrice = items.reduce((acc, item) => acc + item.price*item.quantity, 0);
        setTotal(parseFloat(totalPrice.toFixed(2)));
    };

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        updateTotal(updatedCart);
    };
        return (
            <div className='cart' onDrop={handleDrop} onDragOver = {handleDragOver}>
                <h3>Cart</h3>
                <div>
                    {cartItems.length > 0 ?(
                        cartItems.map (item => (
                            <div key={item.id} className='cart-item'>
                                <p>{item.id} (x{item.quantity})</p>
                                <p>${(item.price*item.quantity).toFixed(2)}</p>
                                <button onClick={()=> removeItem(item.id)}>
                                    Remove
                                </button>
                            </div>
                        ))
                    ):(
                        <p>Your cart is empty.</p>
                    )}
                </div>
                <h4>Total price: ${total.toFixed(2)}</h4>
            </div>
        );
};

export default Cart;