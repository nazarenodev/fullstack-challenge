'use client';

import CartItem from "@/data/model/CartItem";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";

export interface CartItemsListProps {
    item: CartItem
    add?: (item: CartItem) => void
    remove?: (item: CartItem) => void
}

export default function CartItemsList(props: CartItemsListProps) {
    return (
        <div className="flex items-center gap-5 border p-3 rounded-md overflow-hidden">
            <div className="flex flex-col justify-center flex-1">
                <span className="text-xl font-bold">{props.item.shoe.brand}</span>                
                <div className="flex items-center gap-2 mt-2 text-zinc-400 text-lg font-bold">
                    <span>€ {props.item.shoe.price.toFixed(2)}</span>
                    <IconX size={20} />
                    <span>{props.item.quantity}</span>
                    <span>=</span>
                    <span className="text-red-600">
                        € {(props.item.shoe.price * props.item.quantity).toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="flex gap-2 items-center px-5">
                <button onClick={() => props.remove?.(props.item)}>
                    <IconMinus />
                </button>
                <span className="flex px-4 py-2 rounded-md border">{props.item.quantity}</span>
                <button onClick={() => props.add?.(props.item)}>
                    <IconPlus />
                </button>
            </div>
        </div>
    )
}