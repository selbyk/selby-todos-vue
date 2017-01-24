import { STORAGE_KEY } from './mutations';

const localStoragePlugin = (store) => {
  store.subscribe((mutation, { todos }) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); // eslint-disable-line
  });
}
;
export default [localStoragePlugin];
