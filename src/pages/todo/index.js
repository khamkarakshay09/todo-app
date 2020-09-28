import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import TodoForm from "../../components/todo-form";
import TodoList from "../../components/todo-list";

const userStyles = makeStyles(() => ({
  header: {
    marginTop: "24px"
  }
}));

function Todo() {
  const classes = userStyles();
  return (
    <section>
      <Typography className={classes.header} variant="h3" gutterBottom>
        Todos
      </Typography>
      <TodoForm />
      <TodoList/>
    </section>
  );
}

export default Todo;