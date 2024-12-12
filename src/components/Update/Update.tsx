import React, { useState, useEffect } from "react";
import UserTable from "../../views/UserTable/UserTable";
import "./Update.css";

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    [key: string]: any;
}

interface UpdateProps {
    users: User[];
    searchResults: User[];
    onSave: (index: number, updatedUser: User) => void;
}

const Update: React.FC<UpdateProps> = ({ users, searchResults }) => {
    const [localUsers, setLocalUsers] = useState<User[]>(users);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedUser, setEditedUser] = useState<User>({} as User);

    useEffect(() => {
        setLocalUsers(users);
    }, [users]);

    const handleEditClick = (index: number) => {
        setEditingIndex(index);
        setEditedUser(localUsers[index]);
    };

    const handleSaveClick = (index: number) => {
        const userId = localUsers[index].id;
        fetch(`http://localhost:5000/update-user/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedUser),
        })
            .then(response => response.json())
            .then(updatedUser => {
                setLocalUsers(prevUsers => prevUsers.map(user => user.id === userId ? updatedUser : user));
                setEditingIndex(null);
                window.location.reload();
            })
            .catch(error => console.error("Error updating user:", error));
    };

    const handleChange = (field: keyof User, value: string) => {
        setEditedUser(prevUser => ({ ...prevUser, [field]: value }));
    };    

    return (
        <div>
            <h2 className="tittle">Update Users</h2>
            <div className="box">
            <UserTable
                users={searchResults.length > 0 ? searchResults : localUsers}
                editingIndex={editingIndex}
                editedUser={editedUser}
                handleEditClick={handleEditClick}
                handleSaveClick={handleSaveClick}
                handleChange={handleChange}
                setEmailError={() => {}}
                deleteUser={(id) => console.log("Delete user with id:", id)}
                expandedRowIndex={null}
                handleNameToggle={(index) => console.log("Toggle name at index:", index)}
            />

            </div>
        </div>
    );
};

export default Update;
