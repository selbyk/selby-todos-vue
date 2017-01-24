import Vue from 'vue';
import VueRouter from 'vue-router';
import Feathers from 'feathers/client';
import hooks from 'feathers-hooks';
import authentication from 'feathers-authentication-client';
import socketio from 'feathers-socketio/client';
import io from 'socket.io-client';
import vueFeathers from 'vue-feathers';
import store from './store';

import Home from './components/Hello.vue'; // eslint-disable-line
import Todos from './components/Todos.vue'; // eslint-disable-line
import Login from './components/Login.vue'; // eslint-disable-line

const host = 'http://localhost:3030';
const socket = io(host);
const feathers = Feathers() // eslint-disable-line
  // .configure(rest(host).superagent(superagent))
  .configure(socketio(socket))
  .configure(hooks())
  .configure(authentication({
    storage: window.localStorage, // eslint-disable-line
  }));

Vue.use(VueRouter);
Vue.use(vueFeathers, feathers);

const routes = [
  { path: '/home', component: Home },
  { path: '/todos', component: Todos },
  { path: '/login', component: Login },
];

const router = new VueRouter({
  routes, // short for routes: routes
});

new Vue({
  store,
  router,
  computed: {
    authenticated() {
      return this.$store.state.authenticated;
    },
  },
  methods: {
    logout() {
      console.log('log out!');
      this.$feathers
        .logout()
        .then(() => {
          this.$store.commit('setAuthenticated', false);
          this.$router.push('home');
        })
        .catch(err => console.log(err));
    },
  },
}).$mount('#app');
