import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Users from "./components/Users/Users.tsx";
import Add from "./components/Add/Add";
import Update from "./components/Update/Update";
import Navbar from "./components/Navbar/Navbar";
import { User, NewUser } from "../types.ts";

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchResults, setSearchResults] = useState<User[]>([]);

    useEffect(() => {
        fetch("http://ec2-50-16-13-125.compute-1.amazonaws.com:5000/users")
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error("Error fetching users:", error));
    }, []);

    const addUser = async (user: NewUser) => {
        try {
            const response = await fetch("http://ec2-50-16-13-125.compute-1.amazonaws.com:5000/create-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            const newUser: User = await response.json();
            setUsers((prevUsers) => [...prevUsers, newUser]);
            window.location.reload();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const updateUser = (index: number, updatedUser: User) => {
        const updatedUsers = users.map((user, idx) =>
            idx === index ? updatedUser : user
        );
        setUsers(updatedUsers);
    };

    const handleSearch = (term: string) => {
        if (term !== "") {
            const results = users.filter((user) =>
                user.name && user.name.toLowerCase().includes(term.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    return (
        <div className="App-header">
            <div className="background"></div>
            <Router>
                <Navbar handleSearch={handleSearch} />
                <Routes>
                    <Route
                        path="/"
                        element={<Users searchResults={searchResults} />}
                    />
                    <Route
                        path="/Add"
                        element={<Add addUser={addUser} />}
                    />
                    <Route
                        path="/Update"
                        element={<Update users={users} searchResults={searchResults} onSave={updateUser} />}
                    />
                </Routes>
            </Router>
        </div>
    );
};

export default App;