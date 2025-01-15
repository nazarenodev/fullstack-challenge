'use client';

import CartItemsList from "@/components/cart/CartItemsList";
import EmptyCart from "@/components/cart/EmptyCart";
import TotalCart from "@/components/cart/TotalCart";
import BasicPage from "@/components/template/BasicPage";
import useCart from "@/data/hooks/useCart";

export default function CartPage() {
    const { items, addItem, removeItem } = useCart();

    return (
        <BasicPage className='flex flex-col gap-10'>
            {items.length === 0 ? (
                <EmptyCart />
            ) : (
                <>
                    <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
                    <div className="flex flex-col gap-5">
                        {items.map((item) => (
                            <CartItemsList
                                key={item.shoe.id}
                                item={item}
                                add={(item) => addItem(item.shoe)}
                                remove={(item) => removeItem(item.shoe)}
                            />
                        ))}
                    </div>
                    <TotalCart items={items} />
                </>
            )} 
        </BasicPage>
    )
}