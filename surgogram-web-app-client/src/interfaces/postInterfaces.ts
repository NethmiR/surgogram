export interface CreatePostInterface {
    imageFile: File;
    description: string;
    location: string;
    userId: number;
}

export interface Post {
    id: number;
    URL: string;
    description: string;
    noOfLikes: number;
    location: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}