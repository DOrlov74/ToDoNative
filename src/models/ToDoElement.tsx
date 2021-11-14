export interface ToDoElement {
    Id: number,
    Content: string,
    Active: boolean,
    Created: Date,
    Edited: Date
}

export const toDoData: ToDoElement[] = [
    {
        Id: 1,
        Content: 'Drink some coffee',
        Active: true,
        Created: new Date(),
        Edited: new Date()
    },
    {
        Id: 2,
        Content: 'Develop a ToDo program',
        Active: true,
        Created: new Date(),
        Edited: new Date()
    }
] 
