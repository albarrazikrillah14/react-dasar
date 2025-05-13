import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './couterSlice.js';
import Counter from './Counter.jsx';
import PreviewCounter from './PreviewCounter.jsx';
import { todoListSlice } from './todolist/todoListSlicie.js';
import TodoApp from './todolist/TodoApp.jsx';

const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    todoList: todoListSlice.reducer,
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<App/>}/>
          <Route path={'/counter'} element={<Counter/>}/>
          <Route path='/preview-counter' element={<PreviewCounter/>}/>
          <Route path={'/todos'} element={<TodoApp/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
