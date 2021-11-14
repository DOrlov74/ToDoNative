import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import styled from "styled-components/native";
import { getTime, getToDo, postToDo } from "../api/api";
import { DateTimeDto } from "../models/DateTimeDto";
import { ToDoElement } from "../models/ToDoElement";
import { StyledButton } from "./Button";
import { Header } from "./Header";
import { StyledSegment } from "./Segment";
import { ToDoContext } from "./ToDoProvider";

const StyledLabel = styled.Text`
    text-align: left;
    font-size: 1.2rem;
`
const StyledElement = styled.View`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: center;
    margin: 0.5rem;
`
const StyledElementLeft = styled.View`
    margin: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: stretch;
`
const StyledInput = styled.TextInput`
    box-sizing: border-box;
    font-size: 1rem;
    background-color: white;
    height: 2rem;
    padding: 0.5rem;
    margin: 0.5rem 0;
`
export default function ToDoForm() {
    const {tasks, message, setMessage} = useContext(ToDoContext);
    const history = useHistory();
    const {id} = useParams<{id: string}>();
    const [task, setTask] = useState<ToDoElement>({
        Id: 0,
        Content: '',
        Active: true,
        Created: new Date(),
        Edited: new Date()
    })

    useEffect(() => {
        if(id) {
            const todo = getToDo(Number(id));
            if (todo) {
                setTask(todo);
            }
        };
    }, [id])

    useEffect(() => {
        if (message !== null) {
            setMessage(null);
        }
    }, [])

    function handleSubmit() {
        if (validateContext()){
            
                getTime<DateTimeDto>().then(
                    response => {
                        if (task.Id !== 0) {
                            task.Edited = new Date(response.dateTime);
                        } else {
                            task.Created = new Date(response.dateTime);
                        }
                    }
                ).catch((error) => {
                    console.error(error);
                    setMessage({
                        success: false,
                        header: 'Error',
                        content: 'Error in getting current time'
                    });
                });
                
            
            postToDo(task);
            setMessage({
                success: true,
                header: 'Success',
                content: 'Task successsfully added'
            });
            history.push('/');
        }
    }

    function handleInputChange(value: string){
        setTask({...task, "Content": value});
        if (message !== null) {
            setMessage(null);
        }
    }

    function toggleActive() {
        setTask({...task, Active: !task.Active});
        if (message !== null) {
            setMessage(null);
        }
    }

    function closeForm() {
        history.push('/');
        if (message !== null) {
            setMessage(null);
        }
    }

    function validateContext() {
        if (task.Content.trim() === '') {
            setMessage({
                success: false,
                header: 'Empty Task',
                content: 'Task is empty, please fill task description'
            });
            return false;
        } else if (tasks.some(t => t.Content === task.Content)) {
            setMessage({
                success: false,
                header: 'Task duplication',
                content: 'Such task already exist, please submit another task'
            });
            return false;
        };
        return true;
    }

    return (
        <>
        <Header >{id?'Edit':'New'} task</Header>
            <StyledSegment>
                <StyledElementLeft>
                <StyledLabel>Task description</StyledLabel>
                <StyledInput  
                    placeholder='Write the task here' 
                    value={task.Content || ''} 
                    nativeID='Content' 
                    onChangeText={(value) => handleInputChange(value)}/>
                {/* <CheckBox 
                    label='Active' 
                    checked={task.Active || false} 
                    name='Active' 
                    onChange={toggleActive}/> */}
                </StyledElementLeft>
                <StyledElement>
                    <StyledButton color="green" onPress={handleSubmit} title='Submit'/>
                    <StyledButton color="lightslategrey" onPress={closeForm} title='Cancel'/>
                </StyledElement>
            </StyledSegment>
        </>
    )
}