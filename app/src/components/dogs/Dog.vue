<template>
    <li>{{dog.name}} the {{dog.type}}</li>
</template>

<script>
export default {
  props: {
    dog: null
  }
};
</script>

<style>
</style>