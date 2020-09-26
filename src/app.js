import React from "react";
import { Container, makeStyles } from "@material-ui/core";
import Todo from "./pages/todo";

const userStyles = makeStyles(() => ({
  root: {
    textAlign: "center",
  },
}));

function App() {
  const classes = userStyles();
  return (
    <Container className={classes.root}>
      <Todo />
    </Container>
  );
}

export default App;
