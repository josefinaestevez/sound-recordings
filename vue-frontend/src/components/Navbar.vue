<style scoped>
  .link {
    color: #fff;
    font-weight: 700;
    margin: 0 20px;
  }
</style>
<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#"><img src="@/assets/bmat.png" width="150"/></b-navbar-brand>

      <b-navbar-toggle target="nav_collapse" />

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="#"><router-link :to="{ name: 'home' }" class="link">Home</router-link></b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
