import Logo from "./Logo";
import NavCart from "./NavCart";

export default function Header() {
    return (
        <header className="
            flex justify-between items-center
            bg-zinc-800 h-20 px-10 text-white
        ">            
            <Logo />
            <NavCart />
        </header>
    )
}