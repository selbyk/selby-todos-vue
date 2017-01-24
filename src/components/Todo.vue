<template>
  <li class="todo ph3 pv3 bb b--light-silver">
    <span class="view" v-show="!editing">
      <input class="toggle"
        type="checkbox"
        :checked="todo.done"
        @change="toggleTodo">
      <label class="pa0 f5 f4-ns mb3 black-80" v-text="todo.text" @dblclick="editTodo"></label>
    </span>
    <input class="edit"
      v-show="editing"
      v-focus="editing"
      v-model="tempTodo.text"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="cancelEdit">
    <button v-on:click="deleteTodo" class="fr no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center tc br2">
      <span class="f6">✕</span>
    </button>
    <button v-on:click="editTodo" class="fr no-underline near-white bg-animate bg-near-black hover-bg-gray inline-flex items-center tc br2">
      <span class="f6">✎</span>
    </button>
  </li>
</template>

<script>
import { focus } from 'vue-focus';

export default {
  directives: { focus },
  name: 'Todo',
  props: ['todo'],
  data() {
    return {
      editing: false,
      tempTodo: {
        text: '',
        done: false,
      },
    };
  },
  methods: {
    deleteTodo() {
      this.$feathers
        .service('todos')
        .remove(this.todo._id) // eslint-disable-line
        .then((todo) => {
          console.log(todo);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editTodo() {
      if (this.editing) {
        this.doneEdit();
      } else {
        this.tempTodo.text = this.todo.text;
        this.editing = true;
      }
    },
    doneEdit() {
      const editedTodo = {
        text: this.tempTodo.text,
      };
      this.$feathers
        .service('todos')
        .patch(this.todo._id, editedTodo) // eslint-disable-line
        .then((todo) => {
          console.log(todo);
          this.reset();
        })
        .catch((err) => {
          console.log(err);
          this.reset();
        });
    },
    cancelEdit() {
      this.reset();
    },
    toggleTodo() {
      const editedTodo = {
        done: !this.todo.done,
      };
      this.$feathers
        .service('todos')
        .patch(this.todo._id, editedTodo) // eslint-disable-line
        .then((todo) => {
          console.log(todo);
          this.reset();
        })
        .catch((err) => {
          console.log(err);
          this.reset();
        });
    },
    reset() {
      this.editing = false;
      this.tempTodo = {
        text: '',
        done: false,
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
