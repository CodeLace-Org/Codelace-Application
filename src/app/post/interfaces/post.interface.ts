import { StudentResponse } from "../../routes/interfaces/routes-response";

export interface PostResponse {
    id: number;
    student: StudentResponse;
    demoUrl: string;
    repoUrl: string;
    description: string;
    title: string;
    date: string;
    image: string;
}