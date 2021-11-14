import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ToDoList from './components/ToDoList';
import ToDoForm from './components/ToDoForm';
import ToDoProvider, { ToDoContext } from './components/ToDoProvider';
import styled from 'styled-components/native';
import Menu from './components/Menu';
import Message from './components/Message';
import { StyledSegment } from './components/Segment';

const StyledContainer = styled.View`
  margin-top: 3em;
  display: flex;
  flex-direction: row;
  justify-content: center;
`
const StyledContent = styled.View`
  width: 100%;
  max-width: 800px;
`

function App() {
const {message} = useContext(ToDoContext);

  return (
    <ToDoProvider>
      <BrowserRouter basename="/ToDoList" >
        <div className="App">
          <Menu/>
            <StyledContainer>
              <StyledContent>
              <Switch>
                <Route path='/' exact component={ToDoList}/>
                <Route path={['/newtodo','/edittodo/:id']} 
                  component={ToDoForm}/>
              </Switch>
                {message && 
                <Message
                        error={!message.success}
                        success={message.success}
                        header={message.header}
                        content={message.content}
                    />
              }  
              </StyledContent>
            </StyledContainer>
        </div>
      </BrowserRouter>
    </ToDoProvider>
  );
}

export default App;
