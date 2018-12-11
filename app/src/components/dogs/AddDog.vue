<template>
    <form @submit.prevent="handleSubmit">
        <label>Name:</label>
        <input v-focus v-model="dog.name" require>
        <label>Type:</label>
        <input v-focus v-model="dog.type" require>
        <button>Add</button>
    </form>
</template>

<script>

function initDog() {
  return {
    name: '',
    type: ''
  };
}

export default {
  props: {
    onAdd: Function
  },
  data() {
    return {
      dog: initDog()
    };
  },
  methods: {
    handleSubmit() {
      this.onAdd(this.dog)
        .then(() => {
          this.dog = initDog();
        });
    }
  }
};
</script>