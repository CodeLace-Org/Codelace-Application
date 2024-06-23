import { StudentResponse } from "../../routes/interfaces/routes-response";

export interface PostResponse {
    id: number;
    student: StudentResponse;
    demoUrl: string;
    repoUrl: string;
    descripcion: string;
    title: string;
    date: string;
    image: string;
}

export interface StudentResponsePost{
    id: number
    email: string
    username: string
    status: string
    description: string
    profile_picture: string
    role: null
}

export interface CommentResponse{
    id: number
    student: StudentResponsePost
    content: string
    date: string
}

export interface PostResponseId{
    id: number
    student: StudentResponsePost
    rockets: number
    comments: number
    demoUrl: string
    repoUrl: string
    title: string
    description: string
    date: string
    image: string
}

export interface RocketResponse{
    id: number
    post: PostResponse
    student: StudentResponse
}