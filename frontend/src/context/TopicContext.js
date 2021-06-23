import { createContext, useContext, useState } from "react";

export const GroupOrEventContext = createContext();

export const useTheme = () = useContext(GroupOrEventContext);

export default function TopicProvider({ children }) {
    const [groupOrEvent, setGroupOrEvent] = useState("groups");

    return (
        <GroupOrEventContext.Provider
            value={{
                groupOrEvent,
                setGroupOrEvent
            }}
        >
            {children}
        </GroupOrEventContext.Provider>
    );
}
