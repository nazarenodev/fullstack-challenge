import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-xl font-bold">Shoe Store</h1>
                <nav className="space-x-4">
                    <Link href="/">Home</Link>
                    <Link href="/shoes">Shoes</Link>
                    <Link href="/orders">Orders</Link>
                </nav>
            </div>
        </header>
    )
}