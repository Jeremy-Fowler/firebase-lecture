<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <router-link
      class="navbar-brand d-flex align-items-center"
      :to="{ name: 'Home' }"
    >
      <div class="d-flex flex-column align-items-center">
        <img
          alt="logo"
          src="https://brandpalettes.com/wp-content/uploads/2021/06/firebase-color-codes.svg"
          height="60"
        />
      </div>
      <h1 class="ps-3">
        Firebase
        <i class="border-bottom border-warning border-3">is sick y'all</i>
      </h1>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <button
            v-if="account.id"
            data-bs-target="#create-post"
            data-bs-toggle="modal"
            class="btn btn-warning fs-4 ms-2"
          >
            New Post <b><i class="mdi mdi-plus"></i></b>
          </button>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    };
  },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}
.nav-link {
  text-transform: uppercase;
}
.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
