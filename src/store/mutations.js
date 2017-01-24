export const STORAGE_KEY = 'todos-vuejs';

export const state = {
  authenticated: false,
  todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]'), // eslint-disable-line
};

export const mutations = {
  setAuthenticated(state, authenticated) { // eslint-disable-line
    state.authenticated = authenticated; // eslint-disable-line
  },

  setTodos(state, { todos }) { // eslint-disable-line
    state.todos = todos; // eslint-disable-line
  },

  addTodo(state, { todo }) { // eslint-disable-line
    state.todos.push(todo);
  },

  deleteTodo(state, { todo }) { // eslint-disable-line
    state.todos.splice(state.todos.indexOf(todo), 1);
  },

  toggleTodo(state, { todo }) { // eslint-disable-line
    todo.done = !todo.done; // eslint-disable-line
  },

  editTodo(state, { todo, value }) { // eslint-disable-line
    todo.text = value; // eslint-disable-line
  },

  toggleAll(state, { done }) { // eslint-disable-line
    state.todos.forEach((todo) => {
      todo.done = done; // eslint-disable-line
    });
  },

  clearCompleted(state) { // eslint-disable-line
    state.todos = state.todos.filter(todo => !todo.done);  // eslint-disable-line
  },
};
