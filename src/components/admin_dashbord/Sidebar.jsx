import React from 'react'

import { NavLink } from 'react-router-dom'

function Sidebar() {
    
    return (
        <aside className="app-sidebar sticky" id="sidebar">

            {/* Start::main-sidebar-header */}
            <div className="main-sidebar-header">
                <a href="index.html" className="header-logo">
                    <img src="admin_dashboard_assets/images/brand-logos/desktop-logo.png"
                        alt="logo" className="desktop-logo" />
                    <img src="admin_dashboard_assets/images/brand-logos/toggle-logo.png"
                        alt="logo" className="toggle-logo" />
                    <img src="admin_dashboard_assets/images/brand-logos/desktop-dark.png"
                        alt="logo" className="desktop-dark" />
                    <img src="admin_dashboard_assets/images/brand-logos/toggle-dark.png"
                        alt="logo" className="toggle-dark" />
                    <img src="admin_dashboard_assets/images/brand-logos/desktop-white.png"
                        alt="logo" className="desktop-white" />
                    <img src="admin_dashboard_assets/images/brand-logos/toggle-white.png"
                        alt="logo" className="toggle-white" />
                </a>
            </div>
            {/* End::main-sidebar-header */}

            {/* Start::main-sidebar */}
            <div className="main-sidebar" id="sidebar-scroll">

                {/* Start::nav */}
                <nav className="main-menu-container nav nav-pills flex-column sub-open">
                    <div className="slide-left" id="slide-left">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191" width="24" height="24"
                            viewBox="0 0 24 24">
                            <path d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"></path>
                        </svg>
                    </div>
                    <ul className="main-menu">
                        {/* Start::slide__category */}
                        <li className="slide__category"><span className="category-name">Main</span></li>
                        {/* End::slide__category */}

                        {/* Start::slide */}
                        <li className="slide">
                            <NavLink to="/admin/dashboard" className="side-menu__item">
                                <i className="bx bx-home side-menu__icon"></i>
                                Dashboard
                            </NavLink>
                        </li>
                        {/* End::slide */}

                        {/* Start::General Menus */}
                        <li className="slide__category"><span className="category-name">General</span></li>
                        {/* End::General Menus */}



                        {/* Start::Post Menu */}
                        <li className="slide has-sub">
                            <a href="#" className="side-menu__item">
                                <i className="bx bx-file-blank side-menu__icon"></i>
                                <span className="side-menu__label">Posts</span>
                                <i className="fe fe-chevron-right side-menu__angle"></i>
                            </a>
                            <ul className="slide-menu child1">
                                <li className="slide">
                                    <NavLink to="/admin/post" className="side-menu__item">Manage Posts</NavLink>
                                </li>
                                <li className="slide">
                                    <NavLink to="/admin/post/create" className="side-menu__item">Add Post</NavLink>
                                </li>
                            </ul>
                        </li>
                        {/* End::Post Menu */}

                        {/* Start::Post Menu */}
                        <li className="slide has-sub">
                            <a href="#" className="side-menu__item">
                                <i className="bx bx-party side-menu__icon"></i>
                                <span className="side-menu__label">Categories</span>
                                <i className="fe fe-chevron-right side-menu__angle"></i>
                            </a>
                            <ul className="slide-menu child1">
                                <li className="slide">
                                    <NavLink to="/admin/category" className="side-menu__item">Manage Categories</NavLink>
                                </li>
                                <li className="slide">
                                    <NavLink to="/admin/category/create" className="side-menu__item">Add Category</NavLink>
                                </li>
                            </ul>
                        </li>
                        {/* End::Post Menu */}

                        {/* Start::Post Menu */}
                        <li className="slide has-sub">
                            <a href="#" className="side-menu__item">
                                <i className="bx bx-box side-menu__icon"></i>
                                <span className="side-menu__label">Tags</span>
                                <i className="fe fe-chevron-right side-menu__angle"></i>
                            </a>
                            <ul className="slide-menu child1">
                                <li className="slide">
                                    <NavLink to="/admin/tag" className="side-menu__item">Manage Tags</NavLink>
                                </li>
                                <li className="slide">
                                    <NavLink to="/admin/tag/create" className="side-menu__item">Add Tag</NavLink>
                                </li>
                            </ul>
                        </li>
                        {/* End::Post Menu */}

                    </ul>
                    <div className="slide-right" id="slide-right"><svg xmlns="http://www.w3.org/2000/svg" fill="#7b8191"
                        width="24" height="24" viewBox="0 0 24 24">
                        <path d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"></path>
                    </svg></div>
                </nav>
                {/* End::nav */}

            </div>
            {/* End::main-sidebar */}

        </aside>
    )
}

export default Sidebar