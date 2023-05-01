type TAppContext = {
    logged: boolean;
    login: (email: string, password: string) => Promise<boolean>
    verifyToken: () => Promise<void>
    logout: () => void
}

type Props = {
    children?: React.ReactNode
};

type AuthProps = {
    logged: boolean,
    email?: string,
    password?: string
};

export type { AuthProps, Props, TAppContext };