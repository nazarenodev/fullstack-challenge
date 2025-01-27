'use client';

import CartContext from '@/data/contexts/CartContext';
import CartItem from '@/data/model/CartItem';
import { useContext, useState } from 'react';

export interface TotalCartProps {
    items: CartItem[]
}

export default function TotalCart(props: TotalCartProps) {
    const { items, finishCart } = useContext(CartContext);
    const [client, setClient] = useState(''); // For client ID input
    const [shippingInfo, setShippingInfo] = useState(''); // For shipping info input

    const total = items?.reduce((acc, item) => acc + item.shoe.price * item.quantity, 0);

    const handleOrderClick = async () => {
        if (!client || !shippingInfo) {
            alert('Please provide client ID and shipping information.');
            return;
        }

        if (finishCart) {
            await finishCart(client, shippingInfo); // Get the finishCart handler
        }
    };

    return (
        <div className='flex flex-col border rounded-md p-7'>
            <div className='flex items-center justify-between'>
                <div className='flex flex-col'>
                    <span className='text-zinc-500'>Total</span>
                    <span className='text-3xl font-bold text-yellow-500'>€ {total?.toFixed(2)}</span>
                </div>
            </div>
            <div className='mt-4'>
                <input
                    type='text'
                    placeholder='Client ID'
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className='border p-2 rounded-md w-full mb-2'
                />
                <textarea
                    placeholder='Shipping Information'
                    value={shippingInfo}
                    onChange={(e) => setShippingInfo(e.target.value)}
                    className='border p-2 rounded-md w-full mb-4'
                />
                <button
                    onClick={handleOrderClick}
                    className='bg-green-600 px-4 py-2 rounded-md text-xl w-full'
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}