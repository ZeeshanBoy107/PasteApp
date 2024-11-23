import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="flex flex-row gap-20 p-12 font-bold text-xl mx-auto max-w-[700px] mb-12 justify-center border-y border-t-0 border-slate-100">
      <NavLink to="/" className="text-white hover:text-slate-200 hover:scale-105">
        Home
      </NavLink>
      <NavLink to="/pastes" className="text-white hover:text-slate-200 hover:scale-105">
        Pastes
      </NavLink>
    </div>
  );
}

export default Navbar