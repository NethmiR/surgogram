import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserInterface } from "@/interfaces/userInterface";

interface UserContextType {
    user: UserInterface | null;
    setUser: (user: UserInterface) => void;
}
export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => { },
});

interface UserProviderProps {
    children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserInterface | null>(null
    );
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
