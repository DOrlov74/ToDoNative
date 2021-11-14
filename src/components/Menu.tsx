import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/native";
import { Pressable } from "react-native";

const StyledMenu = styled.View`
  height: 3rem;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 2rem;
  position: fixed;
  top: 0;
  border-style: solid;
  border-bottom-color: red;
  border-bottom-width: 1px;
`

const StyledLink = styled.Pressable`
  font-family: 'Lato';
  text-decoration: none;
  margin-top: 1rem;
`

export default function Menu() {
  const history = useHistory();

  return (
      <div>
        <StyledMenu>
          <Pressable onPress={() => history.push("/")} >
            <StyledLink>Home</StyledLink>
          </Pressable>
        </StyledMenu>
      </div>
    )
}