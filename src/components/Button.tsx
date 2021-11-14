import styled from "styled-components/native";

export const StyledButton = styled.Button<{color: string}>`
  font-size: 1rem;
  margin: 0 1rem;
  padding: 0.25em 1em;
  border-radius: 3px;

  color: ${props => props.color };
`;

