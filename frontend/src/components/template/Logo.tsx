import Link from 'next/link'

export default function Logo() {
    return (
        <Link href="/">
            <div className="flex flex-col items-center mt-2">
                <div className="text-xl leading-4">Shoe Store - Fullstack Challenge</div>                
            </div>
        </Link>
    )
}