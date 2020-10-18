export const LOGIN = 'LOGIN';

export interface LoginType{
    type: typeof LOGIN;
    data: Object;
    user: Object;
}

export type LoginAction = LoginType;

