<template>
  <button @click="confirmInput">Confirm</button>
  <button @click="saveChanges">Save changes</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  data() {
    return {
      changesSave: false,
    };
  },
  components: {
    UserItem,
  },
  inject: ['users'],
  methods: {
    saveChanges() {
      this.changesSave = true;
    },
    confirmInput() {
      // tadz neco udelame
      this.$router.push('/teams');
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('UserList Cmp beforeRouteEntered');
    console.log(to, from);
    next();
  },
  beforeRouteLeave(to, from, next) {
    console.log('UserList beforeRouteLeave');
    console.log(to, from);
    if (this.changesSave) {
      next();
    } else {
      const userDecide = confirm(
        'Opravdu chcete odejit z tohoto neulozeneho formulare?'
      );
      next(userDecide);
    }
  },
  unmounted() {
    console.log('Unmounted');
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>