export interface CreateUserInterface {
    email: string;
    password: string;
}
export interface UpdateUserInterface {
    fullName: string;
    userName: string;
    imageFile: File;
}
export interface LoginResponseInterface {
    token: string;
    user: UserInterface;
}

export interface UserInterface {
    id: number;
    fullName: string;
    userName: string;
    email: string;
    profileUrl: string;
    createdAt: string;
    updatedAt: string;
}