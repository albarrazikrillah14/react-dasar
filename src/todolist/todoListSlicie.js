import { createSlice } from "@reduxjs/toolkit";

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState: [{
    "id": 1,
    "name": "test"
  }],
  reducers: {
    createTodo: (state, action) => {
      const { name } = action.payload;
      const id = state.length + 1;
      state.push({
        id: id,
        name: name
      })
    },
    updateTodoByID: (state, action) => {
      const {id, name} = action.payload;

      const index = state.findIndex((todo) => todo.id === id);

      state[index].name = name
    },
    deleteTodoByID:  (state, action) => {
      const { id } = action;
      const index = state.findIndex((todo) => todo.id === id);
      state.splice(index, 1);

    }
  },
  selectors: {
    getTodoByID: (state, action) => {
      const { id } = action;

      return state.filter((todo) => todo.id === id)[0];
    }
  }
});

export const  { createTodo, updateTodoByID, deleteTodoByID } = todoListSlice.actions 

export const { getTodoByID } = todoListSlice.selectors