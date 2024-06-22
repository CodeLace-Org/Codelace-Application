export interface RouteResponse {
  id: number
  name: string
  description: string
  icon: string
}

export interface ProjectResponse {
  id: number
  title: string
  description: string
  image: string
  level: number
}

export interface InscriptionResponse {
  id: number
  studenId: number
  route: RouteResponse
}

export interface InscriptionRequest {
  student: number
  route: number
}

export interface ProjectDetailsResponse {
  id: number
  title: string
  description: string
  image: string
  level: number
  progress: ProgressResponse[]
}

export interface ProgressResponse {
  id: number
  completed: boolean
  description: string
}

export interface PostsByProjectResponse {
  id: number
  student: StudentResponse
  rockets: number
  comments: number
  date: Date
  image: string
}

export interface StudentResponse {
  id: number
  username: string
  status: string
  description: string
  email: string
  pwd: string
  profile_picture: string
  role: null
}

export interface ResourceResponse {
  id: number
  title: string
  link: string
  projectId: number
}
export interface BlogResponse {
  id: number
  title: string
  content: string
  project: ProjectResponse
  image: string
}
