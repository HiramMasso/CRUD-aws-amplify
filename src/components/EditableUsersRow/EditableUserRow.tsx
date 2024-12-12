import React, { useState, useEffect } from "react";
import "./EditableUserRow.css";
import ViewsButton from "../../views/ViewsButton/ViewsButton";
import ViewsInput from "../../views/ViewsInput/ViewsInput";

interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    [key: string]: any;
}

interface EditableUserRowProps {
    user: User;
    index: number;
    editingIndex: number | null;
    editedUser: User;
    handleEditClick: (index: number) => void;
    handleSaveClick: (index: number) => void;
    handleChange: (field: keyof User, value: string) => void;
    setEmailError: (hasError: boolean) => void;
}


const EditableUserRow: React.FC<EditableUserRowProps> = ({
    user,
    index,
    editingIndex,
    editedUser,
    handleEditClick,
    handleSaveClick,
    handleChange,
    setEmailError
}) => {
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isNameValid, setIsNameValid] = useState(true);
    const [isAgeValid, setIsAgeValid] = useState(true);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateInput = (input: string) => {
        return input.trim() !== "";
    };

    useEffect(() => {
        if (editingIndex === index) {
            if (editedUser.email !== undefined) {
                const valid = validateEmail(editedUser.email) && validateInput(editedUser.email);
                setIsEmailValid(valid);
                setEmailError(!valid);
            }
            if (editedUser.name !== undefined) {
                const valid = validateInput(editedUser.name);
                setIsNameValid(valid);
            }
            if (editedUser.age !== undefined) {
                const valid = validateInput(editedUser.age.toString());
                setIsAgeValid(valid);
            }
        }
    }, [editedUser, editingIndex, index, setEmailError]);

    const onSaveClick = () => {
        let isValid = true;

        if (!editedUser.email || !validateEmail(editedUser.email) || !validateInput(editedUser.email)) {
            setIsEmailValid(false);
            setEmailError(true);
            isValid = false;
        }

        if (!editedUser.name || !validateInput(editedUser.name)) {
            setIsNameValid(false);
            isValid = false;
        }

        if (!editedUser.age || !validateInput(editedUser.age.toString())) {
            setIsAgeValid(false);
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        handleSaveClick(index);
    };

    const renderUserField = (field: keyof User) => {
        let inputType = "text";
        let min: string | undefined;
        let max: string | undefined;
        let step: string | undefined;
        let placeholder = "Enter value";
        let autoComplete = "off";
    
        if (field === "age") {
            inputType = "number";
            min = "0";
            max = "99";
            step = "1";
        } else if (field === "email") {
            inputType = "email";
            placeholder = "Enter email";
        } else if (field === "name") {
            placeholder = "Enter name";
        }
    
        return editingIndex === index ? (
            <ViewsInput
                type={inputType}
                value={String(editedUser[field] || "")}
                name={String(field)}
                onChange={(e) => handleChange(field, e.target.value)}
                autoComplete={autoComplete}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                className={
                    (!isNameValid && field === "name") ||
                    (!isAgeValid && field === "age") ||
                    (!isEmailValid && field === "email")
                        ? "inputError"
                        : ""
                }
            />
        ) : (
            user[field]
        );
    };
    

    return (
        <tr>
            <td>{index + 1}</td>
            <td className="truncateName">{renderUserField("name")}</td>
            <td>{renderUserField("age")}</td>
            <td className="truncateMail">{renderUserField("email")}</td>
            <td>
                <ViewsButton
                    className={editingIndex === index ? "saveButton" : "editButton"}
                    onClick={editingIndex === index ? onSaveClick : () => handleEditClick(index)}
                    viewBox={editingIndex === index ? "0 0 256 256" : "0 0 512 512"}
                    pathD={
                        editingIndex === index
                            ? "M74.34 85.66a8 8 0 0 1 11.32-11.32L120 108.69V24a8 8 0 0 1 16 0v84.69l34.34-34.35a8 8 0 0 1 11.32 11.32l-48 48a8 8 0 0 1-11.32 0ZM240 136v64a16 16 0 0 1-16 16H32a16 16 0 0 1-16-16v-64a16 16 0 0 1 16-16h52.4a4 4 0 0 1 2.83 1.17L111 145a24 24 0 0 0 34 0l23.8-23.8a4 4 0 0 1 2.8-1.2H224a16 16 0 0 1 16 16m-40 32a12 12 0 1 0-12 12a12 12 0 0 0 12-12"
                            : "M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                    }
                />
            </td>
        </tr>
    );
};

export default EditableUserRow;
