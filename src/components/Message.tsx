import React from "react";
import styled from "styled-components/native";
import { Header } from "./Header";
import { StyledSegment } from "./Segment";

interface Props {
    error: boolean;
    success: boolean;
    header: string;
    content: string;
}

const ErrorContent = styled.Text`
    color: 'red';
`

const SuccessContent = styled.Text`
    color: 'green';
`

export default function Message({error, success, header, content}: Props){
    return(
        <StyledSegment>
            <Header>{header}</Header>
            {success ?
            <SuccessContent>{content}</SuccessContent>:
            <ErrorContent>{content}</ErrorContent>}
        </StyledSegment>
    );
}