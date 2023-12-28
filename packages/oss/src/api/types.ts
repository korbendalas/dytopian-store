export interface IUser {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
}

export interface GenericResponse {
    status: string;
    message: string;
}

export interface ILoginResponse {
    status: string;
    access_token: string;
}

export interface IUserResponse {
    status: string;
    data: {
        user: IUser;
    };
}
