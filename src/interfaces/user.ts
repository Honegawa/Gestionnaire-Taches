export interface User {
    email: string,
    password: string,
    token?: string
}

export type UserContext = {
    user: User|null;
    loading: boolean;
    login: (dataForm: User) => Promise<boolean>;
    disconnect: () => void;
}