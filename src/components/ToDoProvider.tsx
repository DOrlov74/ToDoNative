import React, { createContext, useEffect, useState } from "react";
import { getToDoList } from "../api/api";
import { ActionMessage } from "../models/ActionMessage";
import { ToDoContextType } from "../models/ToDoContextType";
import { ToDoElement } from "../models/ToDoElement";

const toDoContextDefault: ToDoContextType = {
    message: null,
    setMessage: null,
    tasks: [],
    setTasks: null
}

export const ToDoContext = createContext<ToDoContextType>(toDoContextDefault);

interface Props {
    children: React.ReactNode;
}

export default function ToDoProvider({children}: Props) {
    const [tasks, setTasks] = useState<ToDoElement[]>([]);
    const [message, setMessage] = useState<ActionMessage | null> (null);

    useEffect(() => {
        setTasks(getToDoList());
    }, [])

    return (
        <ToDoContext.Provider value={{tasks, setTasks, message, setMessage}}>
            {children}
        </ToDoContext.Provider>
    )
}