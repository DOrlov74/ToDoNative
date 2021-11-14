import { ActionMessage } from "./ActionMessage";
import { ToDoElement } from "./ToDoElement";

export interface ToDoContextType {
    tasks: ToDoElement[];
    setTasks: any;
    message: ActionMessage | null;
    setMessage: any;
}