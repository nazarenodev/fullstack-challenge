import CartItem from '../../data/model/CartItem';

export interface TotalCartProps {
    items: CartItem[]
}

export default function TotalCart(props: TotalCartProps) {
    const total = props.items.reduce((acc, item) => acc + item.shoe.price * item.quantity, 0);

    return (
        <div className='flex items-center justify-between border rounded-md p-7'>
            <div className='flex flex-col justify-between'>
                <span className='text-zinc-500'>Total</span>
                <span className='text-3xl font-bold text-yellow-500'>€ {total.toFixed(2)}</span>
            </div>
            <button className='bg-green-600 px-4 py-2 rounded-md text-xl'>Order</button>
        </div>
    )
}