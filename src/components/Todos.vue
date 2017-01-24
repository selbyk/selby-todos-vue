<template>
  <article>
    <div class="bg-lightest-blue pa4-l mw7 center br4">
        <fieldset class="cf bn ma0 pa0">
          <legend class="pa0 f5 f4-ns mb3 black-80">Create Todo</legend>
          <div class="cf">
            <label class="clip" for="email-address">Todo</label>
            <input v-model="tempText"class="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns" placeholder="What do you have to do?" type="text" name="email-address" value="" id="email-address">
            <button v-on:click="createTodo" class="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns">
              + Create
            </button>
          </div>
        </fieldset>
    </div>
    <h1 class="f4 bold center mw6">Total: {{ total }}</h1>
    <ul class="list pl0 ml0 center mw7 ba b--light-silver br2">
      <todo v-for="todo in todos" :todo="todo"></todo>
    </ul>
  </article>
</template>

<script>
import Todo from './Todo.vue'; // eslint-disable-line

export default {
  name: 'Todos',
  data() {
    return {
      tempText: '',
      tempTodo: {
        text: '',
      },
    };
  },
  computed: {
    total() {
      return this.$store.state.todos.total;
    },
    todos() {
      return this.$store.state.todos.data;
    },
  },
  methods: {
    getTodos() {
      this.$feathers
        .service('todos')
        .find({})
        .then((todos) => {
          this.$store.commit('setTodos', { todos });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createTodo() {
      console.log('fuck');
      console.log(this.tempText);
      const newTodo = { text: this.tempText };
      this.tempText = '';
      this.$feathers
        .service('todos')
        .create(newTodo)
        .then((ed) => {
          console.log('reset', ed);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  feathers: { // here is our section
    todos: { // here is the subsection for the 'messages' service
      created(data) {
        console.log('feathers created', data);
        this.getTodos();
      },
      updated(data) {
        console.log('feathers updated', data);
        this.getTodos();
      },
      patched(data) {
        console.log('feathers patched', data);
        this.getTodos();
      },
      removed(data) {
        console.log('feathers removed', data);
        this.getTodos();
      },
    },
  },
  created() {
    console.log('created');
    this.$feathers
      .passport
      .getJWT()
      .then((token) => {
        console.log(token);
        return this.$feathers.authenticate({ strategy: 'jwt', accessToken: token });
      })
      .then(() => {
        this.$store.commit('setAuthenticated', true);
        this.getTodos();
      })
      .catch((err) => {
        console.log(err);
        this.$router.push('login');
      });
  },
  components: {
    todo: Todo,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
