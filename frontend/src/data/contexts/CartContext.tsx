'use client';

import { createContext, useEffect, useState } from "react";

import { Shoe } from "../model/Shoe";
import CartItem from "../model/CartItem";
import useLocalStorage from "../hooks/useLocalStorage";
import client from "@/lib/apolloClient";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "@/lib/graphql/mutations";

interface CartContextProps {
    items: CartItem[]
    itemsQtd: number
    addItem: (item: Shoe) => void
    removeItem: (item: Shoe) => void
    finishCart: (clientId: string, shippingInfo: string) => void
}

const CartContext = createContext<CartContextProps>({} as any);

export function CartProvider(props: any) {
    const [items, setItems] = useState<CartItem[]>([]);
    const { set, get } = useLocalStorage()
    const [createOrder] = useMutation(CREATE_ORDER, {client});

    useEffect(() => {
        const cart = get('shoe-store-cart');
        if (cart) {
            setItems(cart);
        }
    }, [get])
    
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
        set('shoe-store-cart', newItems)
    }

    async function finishCart(clientId: string, shippingInfo: string): Promise<void> {
        const totalPrice = items.reduce((total, item) => total + item.shoe.price * item.quantity, 0);
    
        const orderItems = items.map(({ shoe, quantity }) => ({
            shoeId: shoe.id,
            brand: shoe.brand,
            size: Math.floor(Math.random() * 60) + 1,
            price: shoe.price,
            quantity,
        }));
    
        try {
            const { data } = await createOrder({
                variables: {
                    client: clientId,
                    items: orderItems,
                    totalPrice,
                    shippingInfo,
                },
            });
    
            if (data) {
                console.log('Order successfully created:', data.createOrder);
                setItems([]);
                set('shoe-store-cart', []);
                alert('Order placed successfully!');
            } else {
                alert('Failed to create order.');
            }
        } catch (error) {
            console.error('Error creating order:', error);
            alert('An error occurred while placing the order.');
        }
    }

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                finishCart,
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