import React, { useState } from "react";
import "./Navbar.css";
import ViewsInput from "../../views/ViewsInput/ViewsInput";

interface NavbarProps {
    handleSearch: (value: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        handleSearch(value);
    };    

    return (
        <nav className="navbar">
            <h1 className="logo">hello</h1>
            <ul className="nav-links">
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/Add">Add</a>
                </li>
                <li>
                    <a href="/Update">Update</a>
                </li>
            </ul>
            <div className="search">
                <ViewsInput
                    type="text"
                    autoComplete="off"
                    name="search"
                    className="inputSearch"
                    placeholder="Search: by Name"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
            </div>
        </nav>
    );
};

export default Navbar;
