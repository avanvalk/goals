<template>
    <section class="dogs">
        <h2>My Goals</h2>
        <h3>Add a New Goal</h3>
        <AddDog :onAdd="handleAdd"/>
        <h3>Current Goals</h3>
        <DogList v-if="dogs && dogs.length > 0" :dogs="dogs"/>
        <p v-else>Add a goal to get started!</p>
    </section>
</template>

<script>
import api from '../../services/api';
import AddDog from './AddDog';
import DogList from './DogList';

export default {
  data() {
    return {
      dogs: null
    };
  },
  components: {
    AddDog,
    DogList
  },
  created() {
    api.getDogs()
      .then(dogs => {
        this.dogs = dogs;
      })
      .catch(err => {
        this.error = err;
      });
  },
  methods: {
    handleAdd(dog) {
      return api.addDog(dog)
        .then(saved => {
          this.dogs.push(saved);
        });
    }
  }
};
</script>