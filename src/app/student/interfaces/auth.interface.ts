export interface SignupRequest {
    username: string;
    email: string;
    pwd: string;
    confirmPassword: string;
}

export interface Profile {
    id: number;
    username: string;
    status?: string;
    description?: string;
    profile_picture?: string;
    role: 'USER' | 'ADMIN';
}

export interface AuthResponse {
    token: string;
    user: Profile
}

export interface AuthRequest {
    email?: string;
    pwd?:string;
}