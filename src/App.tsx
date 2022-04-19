import React, { useState } from "react";
import styled from "styled-components";
import Circle from "./Circle";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

interface DummyProps {
  text: string;
  otherThingHere?: boolean;
}

function Dummy({ text, otherThingHere = false }: DummyProps) {
  return <H1>{text}</H1>;
}

function App() {
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {};
  return (
    <Container>
      <Dummy text="hello"></Dummy>
      <form>
        <button onClick={onClick}></button>
      </form>
    </Container>
  );
}

export default App;
