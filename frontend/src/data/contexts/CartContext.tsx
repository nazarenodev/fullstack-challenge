import { createContext, useState } from "react";
import CartItem from "../model/cartItem";
import { Shoe } from "../model/Shoe";

interface CartContextProps {
    items: CartItem[]
    itemsQtd: number
    addItem: (item: Shoe) => void
    removeItem: (item: Shoe) => void
}

const CartContext = createContext<CartContextProps>({} as any);

export function CartProvider(props: any) {
    const [items, setItems] = useState<CartItem[]>([]);
    
    function addItem(shoe: Shoe) {
        const itemIndex = items.findIndex((i) => i.shoe.id === shoe.id);

        if (itemIndex === -1) {
            updateItems([...items, {shoe, quantity: 1}]);
        } else {
            const newItems = [...items];
            newItems[itemIndex].quantity++;
            updateItems(newItems);
        }
    }

    function removeItem(shoe: Shoe) {
        const newItems = items.map((i) => {
            if (i.shoe.id === shoe.id) {
                i.quantity--;
            }
            return i
        }).filter((i) => i.quantity > 0)

        updateItems(newItems);
    }

    function updateItems(newItems: CartItem[]) {
        setItems(newItems);
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                get itemsQtd() {
                    return items.reduce((total, item) => total + item.quantity, 0 );
                }
            }}
        >
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext;