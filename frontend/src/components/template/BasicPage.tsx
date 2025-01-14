import Header from "./Header"

export interface BasicPageProps {
    children: React.ReactNode
    className?: string
}

export default function BasicPage(props: any) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className={`flex-1 w-[1200px] mx-auto
                    ${props.className ?? ''} py-10
                `}>
                {props.children}
            </main>
        </div>
    )
}