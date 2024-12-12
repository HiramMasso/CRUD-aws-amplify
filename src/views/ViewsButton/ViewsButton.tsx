import React from "react";

interface ViewsButtonProps {
    className: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    viewBox: string;
    pathD: string;
    pathD1?: string;
    pathD2?: string;
    clipRule?: "nonzero" | "evenodd" | "inherit";
    fillRule?: "nonzero" | "evenodd" | "inherit";
}

const ViewsButton: React.FC<ViewsButtonProps> = ({
    className,
    onClick,
    viewBox,
    pathD,
    pathD1,
    pathD2,
    clipRule,
    fillRule
}) => {

    return (
        <button className={className} onClick={onClick}>
            <svg className="bin" viewBox={viewBox}>
                <path d={pathD}></path>
                {pathD1 && <path d={pathD1}></path>}
                {pathD2 && <path d={pathD2} clipRule={clipRule} fillRule={fillRule}></path>}
            </svg>
        </button>
    );
};

export default ViewsButton;
