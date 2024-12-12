import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import UserRow from "../../components/UserRow/UserRow";
import "../../components/Users/Users.css";
import EditableUserRow from "../../components/EditableUsersRow/EditableUserRow";

interface User {
    id: number;
    name: string;
    age: number;
    email: string;
    [key: string]: any;
}

interface UserTableProps {
    users: User[];
    editingIndex: number | null;
    editedUser: User;
    handleEditClick: (index: number) => void;
    handleSaveClick: (index: number) => void;
    handleChange: (field: keyof User, value: string) => void;
    setEmailError: (hasError: boolean) => void;
    deleteUser: (id: number) => void;
    expandedRowIndex: number | null;
    handleNameToggle: (index: number) => void;
}



const UserTable: React.FC<UserTableProps> = ({
    users,
    deleteUser,
    editingIndex,
    handleEditClick,
    handleSaveClick,
    handleChange,
    editedUser,
    expandedRowIndex,
    handleNameToggle
}) => {
    const location = useLocation();
    const [emailError, setEmailError] = useState<boolean>(false);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th className={emailError ? "error" : ""}>Mail</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    location.pathname === "/" ? (
                        <UserRow
                            key={user.id}
                            user={user}
                            index={index}
                            deleteUser={deleteUser}
                            expandedRowIndex={expandedRowIndex}
                            handleNameToggle={handleNameToggle}
                        />
                    ) : (
                        <EditableUserRow
                            key={user.id}
                            user={user}
                            index={index}
                            editingIndex={editingIndex}
                            editedUser={editedUser}
                            handleEditClick={handleEditClick}
                            handleSaveClick={handleSaveClick}
                            handleChange={handleChange}
                            setEmailError={setEmailError}
                        />
                    )
                ))}
            </tbody>
        </table>
    );
};

export default UserTable;