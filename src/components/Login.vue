<template>
  <main class="pa4 black-80">
    <form class="measure center" @submit.prevent="login">
      <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
        <legend class="f4 fw6 ph0 mh0">Sign In</legend>
        <div class="mt3">
          <label class="db fw6 lh-copy f6" for="email-address">Email</label>
          <input class="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" v-model="email">
        </div>
        <div class="mv3">
          <label class="db fw6 lh-copy f6" for="password">Password</label>
          <input class="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" v-model="password">
        </div>
        <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"> Remember me</label>
      </fieldset>
      <div class="">
        <input class="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Login >">
      </div>
      <div class="lh-copy mt3">
        <router-link to="signup" class="f6 link dim black db">Sign Up</router-link>
      </div>
    </form>
  </main>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      const self = this;
      console.log(this.$feathers);
      self.$feathers
        .authenticate({
          strategy: 'local',
          email: this.email,
          password: this.password,
        }).then((result) => {
          console.log('Authenticated!', result);
          this.$store.commit('setAuthenticated', true);
          console.log(this.$feathers);
          this.password = '';
          this.$router.push('todos');
        }).catch((error) => {
          console.error('Error authenticating!', error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
