import { UserInterface } from './userInterface';
export interface CreatePostInterface {
    imageFile: File;
    description: string;
    location: string;
    userId: number;
}

export interface PostInterface {
    id: number;
    URL: string;
    description: string;
    noOfLikes: number;
    location: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface GetPostInterface extends PostInterface {
    user: UserInterface;
}

export interface GetAllPostsPaginatedInterface {
    totalPosts: number;
    posts: GetPostInterface[];
}

