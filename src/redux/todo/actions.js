export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const GET_TODOS = "GET_TODOS";

export const addTodo = (payload) => ({
  type: ADD_TODO,
  payload,
});

export const completeTodo = (payload) => ({
  type: COMPLETE_TODO,
  payload,
});

export const removeTodo = (payload) => ({
  type: DELETE_TODO,
  payload,
});

export const getTodos = () => ({
  type: GET_TODOS,
});
