import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Paper,
  Card,
  CardActions,
  CardContent,
  IconButton,
  makeStyles,
  Button,
} from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";
import { getTodos, completeTodo, removeTodo } from "../../redux/todo/actions";

const useStyles = makeStyles(() => ({
  root: {
    padding: "12px",
    borderRadius: "24px",
    backgroundColor: "#e2e2e2",
  },
  cardRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "100px",
    marginBottom: "5px",
  },
  noTaskCard: {
    textAlign: "center",
    borderRadius: "100px",
    marginBottom: "5px",
  },
  filters: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    boxShadow: "none",
    marginTop: "10px",
    padding: "0 10px",
  },
  count: {
    marginRight: "auto",
  },
  btnGrp: {
    display: "flex",
    marginRight: "auto",
  },
  active: {
    color: "#3f51b5",
  },
}));

function ListItem({ todo, onDoneClick, onRemoveClick }) {
  const classes = useStyles();
  return (
    <Card className={`${classes.cardRoot} qa-listItem`}>
      <CardContent>{todo.title}</CardContent>
      <CardActions>
        {!todo.isDone && (
          <IconButton
            className="qa-done-btn"
            id={todo._id}
            onClick={onDoneClick}
            color="primary"
          >
            <DoneIcon />
          </IconButton>
        )}
        <IconButton
          className="qa-delete-btn"
          id={todo._id}
          onClick={onRemoveClick}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

function List({ todos, onDoneClickHandler, onRemoveClickHandler }) {
  const classes = useStyles();
  return todos && todos.length > 0 ? (
    todos.map((todo, index) => (
      <ListItem
        key={index}
        todo={todo}
        onDoneClick={onDoneClickHandler}
        onRemoveClick={onRemoveClickHandler}
      />
    ))
  ) : (
    <Card id="qa-no-data" className={classes.noTaskCard}>
      <CardContent>No tasks found!</CardContent>
    </Card>
  );
}

function TodoList() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [todos, setTodos] = useState([]);
  const classes = useStyles();
  const todosProps = useSelector((state) => state.todosState.todos);
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(getTodos());
  }, [dispatcher]);

  useEffect(() => {
    setTodos(todosProps);
    if (activeFilter === "Active") {
      setTodos(
        todosProps.length > 0
          ? todosProps.filter((todo) => !todo.isDone)
          : [...todos]
      );
    }
    if (activeFilter === "Completed") {
      setTodos(
        todosProps.length > 0
          ? todosProps.filter((todo) => todo.isDone)
          : [...todos]
      );
    }
    if (activeFilter === "All") {
      setTodos([...todosProps]);
    }
  }, [todosProps]);

  const handleDoneClick = ({ currentTarget: { id } }) => {
    const updateTodos = [...todos];
    const updateIndex = updateTodos.findIndex(
      (todo) => todo._id === id
    );

    if (updateIndex > -1) {
      updateTodos[updateIndex].isDone = true;
      dispatcher(completeTodo([...updateTodos]));
    }
  };

  const handleRemoveClick = ({ currentTarget: { id } }) => {
    const updateTodos = [...todos];
    const updateIndex = updateTodos.findIndex(
      (todo) => todo._id === id
    );

    if (updateIndex > -1) {
      updateTodos.splice(updateIndex, 1);
      dispatcher(removeTodo([...updateTodos]));
    }
  };

  const handleFilterClick = ({ currentTarget: { id } }) => {
    if (id === "Active") {
      setActiveFilter("Active");
      setTodos(
        todosProps.length > 0
          ? todosProps.filter((todo) => !todo.isDone)
          : [...todos]
      );
    }
    if (id === "Completed") {
      setActiveFilter("Completed");
      setTodos(
        todosProps.length > 0
          ? todosProps.filter((todo) => todo.isDone)
          : [...todos]
      );
    }
    if (id === "All") {
      setActiveFilter("All");
      setTodos([...todosProps]);
    }
  };

  return (
    <Paper className={classes.root}>
      <List
        todos={todos}
        onDoneClickHandler={handleDoneClick}
        onRemoveClickHandler={handleRemoveClick}
      />
      <Card className={classes.filters}>
        <p id="qa-count" className={classes.count}>All({todos.length})</p>
        <div className={classes.btnGrp}>
          <Button
            id="All"
            className={activeFilter === "All" ? classes.active : ""}
            variant="text"
            onClick={handleFilterClick}
          >
            All
          </Button>
          <Button
            id="Active"
            className={activeFilter === "Active" ? classes.active : ""}
            variant="text"
            onClick={handleFilterClick}
          >
            Active
          </Button>
          <Button
            id="Completed"
            className={activeFilter === "Completed" ? classes.active : ""}
            variant="text"
            onClick={handleFilterClick}
          >
            Completed
          </Button>
        </div>
      </Card>
    </Paper>
  );
}

export default TodoList;
