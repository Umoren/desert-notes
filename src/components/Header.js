const Header = () => {
    const greeting = new Date().getHours() < 12 ? "Good Morning" : new Date().getHours() < 18 ? "Good Afternoon" : "Good Evening";
    return (
        <header className="text-white bg-black sm:p-8 py-8 px-4 flex justify-between items-center font-sans">
            <h1 className="text-lg sm:text-2xl font-semibold"> 🏝️ Desert Island Notes</h1>
            <h1 className="sm:text-xl font-normal">{greeting}</h1>
        </header>
    )
}

export default Header;