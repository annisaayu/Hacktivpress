<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
body {
  padding-top: 54px;
}

@media (min-width: 992px) {
  body {
    padding-top: 56px;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.bd-grey{
  border: 1px solid rgba(0,0,0,.125);
}

</style>
