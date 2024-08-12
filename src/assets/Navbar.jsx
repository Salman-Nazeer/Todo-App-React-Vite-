import React from 'react'
const Navbar = () => {
    return (
        <>
            <nav className='flex justify-between bg-slate-700 text-white py-2'>
                <div className="logo">
                    <span className="font-bold text-xl mx-8">iTask</span>
                </div>
                <div className="menu">
                    <ul className="flex gap-7 mx-9">
                        <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
                        <li className='cursor-pointer hover:font-bold transition-all'>Your Task</li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
