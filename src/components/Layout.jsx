// import { Activity, LayoutDashboard, ShieldCheck, UserPlus } from 'lucide-react';
// import { NavLink } from 'react-router-dom';

// const Layout = ({ children }) => {
//     return (
//         <div className="flex h-screen bg-gray-50 font-sans">
//             {/* Sidebar */}
//             <aside className="w-64 bg-gradient-to-b from-indigo-900 to-indigo-700 text-white shadow-2xl flex flex-col">
//                 <div className="p-6 flex items-center gap-3 border-b border-indigo-600/30">
//                     <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
//                         <Activity size={28} className="text-pink-400" />
//                     </div>
//                     <div>
//                         <h1 className="text-xl font-bold tracking-tight">MediTrack</h1>
//                         <p className="text-xs text-indigo-300">BMI & Health System</p>
//                     </div>
//                 </div>

//                 <nav className="flex-1 p-4 space-y-2">
//                     <NavLink to="/" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10 shadow-lg border-l-4 border-pink-500 font-semibold' : 'hover:bg-white/5 hover:translate-x-1 text-indigo-100'}`}>
//                         <LayoutDashboard size={20} /> Dashboard
//                     </NavLink>
//                     <NavLink to="/add-patient" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10 shadow-lg border-l-4 border-pink-500 font-semibold' : 'hover:bg-white/5 hover:translate-x-1 text-indigo-100'}`}>
//                         <UserPlus size={20} /> Add Patient
//                     </NavLink>
//                     <NavLink to="/doctor" className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10 shadow-lg border-l-4 border-pink-500 font-semibold' : 'hover:bg-white/5 hover:translate-x-1 text-indigo-100'}`}>
//                         <ShieldCheck size={20} /> Doctor Panel
//                     </NavLink>
//                 </nav>

//                 <div className="p-4 border-t border-indigo-600/30 text-center text-xs text-indigo-300">
//                     <p>&copy; 2025 MediTrack Systems</p>
//                 </div>
//             </aside>

//             {/* Main Content */}
//             <main className="flex-1 overflow-y-auto">
//                 <header className="bg-white shadow-sm p-4 sticky top-0 z-10 flex justify-between items-center">
//                     <h2 className="text-xl font-semibold text-gray-800">Welcome Back, Dr.</h2>
//                     <div className="flex items-center gap-4">
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
//                             Dr
//                         </div>
//                     </div>
//                 </header>
//                 <div className="p-8">
//                     {children}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Layout;


import { Activity, LayoutDashboard, Menu, ShieldCheck, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Layout = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-50 font-sans">

            {/* ======= MOBILE SIDEBAR OVERLAY ======= */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-30"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* ======= SIDEBAR ======= */}
            <aside className={`
                fixed lg:static top-0 left-0 h-full w-64 
                bg-gradient-to-b from-indigo-900 to-indigo-700 text-white shadow-2xl flex flex-col 
                transition-transform duration-300 z-40
                ${open ? "translate-x-0" : "-translate-x-64 lg:translate-x-0"}
            `}>
                {/* Logo */}
                <div className="p-6 flex items-center gap-3 border-b border-indigo-600/30">
                    <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                        <Activity size={28} className="text-pink-400" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">MediTrack</h1>
                        <p className="text-xs text-indigo-300">BMI & Health System</p>
                    </div>
                </div>

                {/* MENU */}
                <nav className="flex-1 p-4 space-y-2">
                    <MenuItem to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                    <MenuItem to="/add-patient" icon={<UserPlus size={20} />} label="Add Patient" />
                    <MenuItem to="/doctor" icon={<ShieldCheck size={20} />} label="Doctor Panel" />
                </nav>

                <div className="p-4 border-t border-indigo-600/30 text-center text-xs text-indigo-300">
                    <p>&copy; 2025 MediTrack Systems</p>
                </div>
            </aside>

            {/* ======= MAIN CONTENT ======= */}
            <main className="flex-1 overflow-y-auto">

                {/* Top Navbar */}
                <header className="bg-white shadow-sm p-4 sticky top-0 z-20 flex justify-between items-center">

                    {/* Hamburger Menu (Mobile/Tablet Only) */}
                    <button
                        className="lg:hidden p-2 bg-gray-100 rounded-lg shadow-sm"
                        onClick={() => setOpen(true)}
                    >
                        <Menu size={24} className="text-gray-700" />
                    </button>

                    <h2 className="text-xl font-semibold text-gray-800">Welcome Back, Dr.</h2>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
                            Dr
                        </div>
                    </div>
                </header>

                {/* Main Page Content */}
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

/* ======= MENU ITEM COMPONENT ======= */
const MenuItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all duration-300 
            ${isActive
                ? "bg-white/10 shadow-lg border-l-4 border-pink-500 font-semibold"
                : "hover:bg-white/5 hover:translate-x-1 text-indigo-100"
            }`
        }
    >
        {icon} {label}
    </NavLink>
);

export default Layout;
