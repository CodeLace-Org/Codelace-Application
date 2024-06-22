import { RouteResponse } from "../../routes/interfaces/routes-response";

export interface InscriptionResponse {
    id: number;
    studentId: number;
    route: RouteResponse;
}