import { createContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(true);

    const toggleIsAuthorized = (auth) => {
        setIsAuthorized(auth)
    }

    const value = {
        isAuthorized,
        toggleIsAuthorized
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