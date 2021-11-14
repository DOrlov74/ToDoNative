import React, { useContext } from "react";
import { useHistory} from "react-router-dom";
import styled from "styled-components/native";
import { deleteToDo, getToDo, postToDo } from "../api/api";
import { StyledButton } from "./Button";
import { Header } from "./Header";
import { StyledSegment } from "./Segment";
import { ToDoContext } from "./ToDoProvider";

const StyledHeader = styled.Text`
    font-family: 'Lato';
  font-style: bold;
  font-size: 1.2rem;
  text-align: center;
  margin: 1rem 0;
`

const StyledText = styled.Text`
    font-style: italic;
`

const StyledDivider = styled.View`
    margin: 1rem;
    border-color: #949494;
    border-width: 1px;
`

const StyledElement = styled.View`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-around;
    margin: 0.2rem;
`

const StyledElementLeft = styled.View`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const StyledElementRight = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`

export default function ToDoList() {
    const history = useHistory();
    const {tasks, setTasks, setMessage} = useContext(ToDoContext);

    function handleDelete(id: number) {
        deleteToDo(id);
        setTasks(tasks.filter(t => t.Id !== id));
        setMessage({
                success: true,
                header: 'Success',
                content: 'Task successsfully deleted'
            });
    }

    function toggleActive(id: number) {
        const task = getToDo(id);
        if (task) {
            task.Edited = new Date();
            task.Active = !task.Active;
            postToDo(task);
            setMessage({
                success: true,
                header: 'Success',
                content: 'Task successsfully edited'
            });
        }
    }

    return (
        <>
            <Header> List of tasks</Header>
            {tasks.length > 0 && tasks.map( task => (
                <StyledSegment key={task.Id}>
                    <StyledHeader>{task.Content}</StyledHeader>
                    <StyledElement>
                        <StyledElementLeft>
                            <StyledButton onPress={() => toggleActive(task.Id)} color={task.Active ? 'orange' : 'teal'} title={task.Active ? 'Active' : 'Already done'}/>
                            {task.Created < task.Edited ?
                            <StyledText>Edited: {task.Edited.toLocaleDateString()} at {task.Edited.toLocaleTimeString()}</StyledText>
                            : <StyledText>Created: {task.Created.toLocaleDateString()} at {task.Created.toLocaleTimeString()}</StyledText>}
                        </StyledElementLeft>
                        <StyledElementRight>
                            <StyledButton color='forestgreen' title='Edit' onPress={() => {history.push(`/edittodo/${task.Id}`)}}/>
                            <StyledButton color='tomato' onPress={()=>handleDelete(task.Id) } title='Delete'/>
                        </StyledElementRight>
                    </StyledElement>
                </StyledSegment>
            ))}
            <StyledDivider/>
                <StyledHeader>
                    New Task
                </StyledHeader>
            <StyledElement>
                <StyledButton color="seagreen" title='Create Task' onPress={() => {history.push('/newtodo')}}/>
            </StyledElement>
            
        </>
    )
}