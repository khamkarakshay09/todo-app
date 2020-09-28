import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { IconButton, TextField, makeStyles } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { addTodo } from "../../redux/todo/actions";

const useStyles = makeStyles(() => ({
  root: {
    margin: "24px 0",
  },
  todoInput: {
    width: "50%",
    marginRight: "12px",
  },
}));

function TodoFrom() {
  const todos = useSelector((state) => state.todosState.todos);
  const dispatcher = useDispatch();
  const [todo, setTodo] = useState({
    title: "",
    isDone: false,
  });

  const handleChange = ({ target: { value } }) => {
    setTodo({
      ...todo,
      title: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isPresent =
      todos.length > 0
        ? todos.findIndex((td) => !td.isDone && td.title === todo.title)
        : -1;

    if (isPresent <= -1) {
      dispatcher(
        addTodo([
          ...todos,
          { ...todo, _id: uuidv4() },
        ])
      );
    } else {
      alert("Task Already Exist!!");
    }
    setTodo({
      title: "",
      isDone: false,
    });
  };

  const classes = useStyles();

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <TextField
        id="qa-todo-input"
        className={classes.todoInput}
        value={todo.title}
        onChange={handleChange}
        variant="outlined"
        label="Add New Task"
      />
      <IconButton id="qa-submit-btn" type="submit" color="primary">
        <SendIcon />
      </IconButton>
    </form>
  );
}

export default TodoFrom;
