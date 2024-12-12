import React from "react";

interface ViewsInputProps {
    type: string;
    name: string;
    className: string;
    value: string;
    placeholder: string;
    autoComplete: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    min?: string;
    max?: string; 
    step?: string;
}

const ViewsInput: React.FC<ViewsInputProps> = ({
    type,
    name,
    className,
    value,
    placeholder,
    onChange,
    autoComplete
}) => {
    const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === "age") {
            if (/^\d*$/.test(value) && (value === "" || (value.length === 1 || value[0] !== "0") && (parseInt(value) > 0 && parseInt(value) <= 99))) {
                onChange(e, value);
            } else if (value === "") {
                onChange(e, value);
            }
        } else if ((name === "name" || name === "email") && value.length <= 50) {
            onChange(e, value);
        } else if (name !== "age" && name !== "name" && name !== "email") {
            onChange(e, value);
        }
    };

    return (
        <input
            type={type}
            name={name}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={handleValidation}
            autoComplete={autoComplete}
        />
    );
};

export default ViewsInput;
