export interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    [key: string]: any;
}

export interface NewUser {
    name: string;
    email: string;
    age: number;
}
