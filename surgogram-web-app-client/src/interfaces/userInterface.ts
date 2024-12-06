export interface CreateUserInterface {
    email: string;
    password: string;
}
export interface UpdateUserInterface {
    fullName: string;
    userName: string;
    imageFile: File;
}