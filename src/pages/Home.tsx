import logo from '../assets/logo2.svg'

export default function Home() {
    return (
        <section className="flex flex-col items-center justify-center text-center h-full">
            <img
                src={logo}
                alt="Mistribe logo"
                className="w-72 h-72 md:w-200 md:h-200 drop-shadow-[0_0_24px_rgba(0,0,0,0.1)] brightness-0 invert opacity-70"
            />

            <h1 className="font-alegreyasc text-7xl md:text-9xl font-black tracking-widest uppercase text-white/70">
                Mistribe
            </h1>
            <p className="font-alegreyasc text-2xl md:text-4xl max-w-4xl text-white/70">
                Building projects with care, clarity and passion.
            </p>
        </section>
    )
}
