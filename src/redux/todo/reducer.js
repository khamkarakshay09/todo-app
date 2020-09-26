import { ADD_TODO, COMPLETE_TODO, GET_TODOS, DELETE_TODO } from "./actions";

const initState = {
  todos: [],
};

export default function (state = initState, action) {
  switch (action.type) {
    case ADD_TODO:
    case COMPLETE_TODO:
    case DELETE_TODO: {
      return {
        ...state,
        todos: [...action.payload],
      };
    }
    case GET_TODOS:
    default: {
      return {
        ...state,
      };
    }
  }
}
