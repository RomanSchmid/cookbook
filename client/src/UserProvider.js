import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(true);

    const value = {
        isAuthorized
    }

    return (
        <UserContext.Provider
            value={value}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;