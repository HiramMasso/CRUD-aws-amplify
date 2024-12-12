import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserForm.css";
import ViewsInput from "../../views/ViewsInput/ViewsInput";

interface AddProps {
    addUser: (user: { name: string; email: string; age: number }) => void;
}

const Add: React.FC<AddProps> = ({ addUser }) => {
    const [formData, setFormData] = useState<{ name: string; email: string; age: string }>({ name: "", email: "", age: "" });
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: !value.trim() }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors: { [key: string]: boolean } = {};
        Object.keys(formData).forEach((field) => {
            if (!formData[field as keyof typeof formData].trim()) {
                newErrors[field] = true;
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            const userWithAgeAsNumber = {
                ...formData,
                age: Number(formData.age)
            };
            addUser(userWithAgeAsNumber);
            navigate("/");
        }
    };

    const getPlaceholder = (field: string) => {
        return errors[field] ? "This field is required" : `Enter ${field.charAt(0).toUpperCase() + field.slice(1)}...`;
    };

    return (
        <div>
            <h2 className="tittle">Add users form</h2>
            <div className="box1">
                <form className="inputForm" onSubmit={handleSubmit}>
                    <ViewsInput
                        type="text"
                        name="name"
                        className={`input1 ${errors.name ? "error" : ""}`}
                        placeholder={getPlaceholder("name")}
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <ViewsInput
                        type="email"
                        name="email"
                        className={`input1 ${errors.email ? "error" : ""}`}
                        placeholder={getPlaceholder("email")}
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="off"
                    />
                    <ViewsInput
                        type="number"
                        name="age"
                        className={`input1 ${errors.age ? "error" : ""}`}
                        placeholder={getPlaceholder("age")}
                        value={formData.age}
                        onChange={handleChange}
                        min="0"
                        max="99"
                        step="1"
                        autoComplete="off"
                    />
                    <button className="addButton">
                        <span>Add</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Add;
