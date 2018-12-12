<template>
  <ul v-if="dogs">
    <Dog v-for="dog in dogs" 
      :key="dog.id"
      :dog="dog"/>
  </ul>

</template>

<script>
import Dog from './Dog';
export default {
  props: {
    dogs: null
  },
  components: {
    Dog
  }
};
</script>