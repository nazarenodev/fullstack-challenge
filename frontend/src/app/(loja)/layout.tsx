'use client';

import { CartProvider } from "@/data/contexts/CartContext";

export default function Layout(props: any) {
    return <CartProvider>{props.children}</CartProvider>
}