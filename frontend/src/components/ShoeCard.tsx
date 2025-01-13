export interface Shoe {
    id: string;
    brand: string;
    availableSizes: number[];
    price: number;
}

export default function ShoeCard({ shoe }: { shoe: Shoe }) {
    return (
        <div className="border p-4 rounded shadow-md">
            <h3 className="text-lg font-bold">{shoe.brand}</h3>
            <p>Price: ${shoe.price}</p>
            <p>Available Sizes: {shoe.availableSizes.join(', ')}</p>
        </div>
    );
};