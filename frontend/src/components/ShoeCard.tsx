import useCart from "@/data/hooks/useCart";
import { Shoe } from "@/data/model/Shoe";

export interface ShoeCardProps {
    shoe: Shoe
}

export default function ShoeCard(props: ShoeCardProps) {
    const { addItem } = useCart();

    const { brand, price, availableSizes } = props.shoe;

    return (
        <div className="flex flex-col w-72 border">
            <div className="flex-1 flex flex-col gap-4 p-5">
                <h2 className="text-xl font-bold">{brand}</h2>                
                <h2 className="text-sm">Sizes: {availableSizes.join(', ')}</h2>                
                <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold mt-2">R$ {price.toFixed(2)}</span>
                    <button
                        onClick={() => addItem(props.shoe)}
                        className="border rounded-full px-5 py-1 text-sm"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};