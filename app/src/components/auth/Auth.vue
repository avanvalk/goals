<template>
  <section>
    <div v-if="method === 'signin'">
      <h2>Sign In</h2>
      
      <p>
        Need to register?
        <button @click="method = 'signup'">Sign Up</button>
      </p>
      <CredentialsForm prompt="Sign In" :onSubmit="handleSignIn"/>
    </div>

    <div v-else>
      <h2>Sign Up</h2>
      
      <p>
        Already have an account?
        <button @click="method = 'signin'">Sign In</button>
      </p>

      <CredentialsForm prompt="Sign Up" :onSubmit="handleSignUp"/>
    </div>
    <pre v-if="error">{{error}}</pre>
  </section>
</template>

<script>
import CredentialsForm from './CredentialsForm';

export default {
  props: {
    onSignIn: Function,
    onSignUp: Function
  },
  data() {
    return {
      method: 'signin',
      error: ''
    };
  },
  components: {
    CredentialsForm
  },
  methods: {
    handleSignIn(profile) {
      this.error = '';
      this.onSignIn(profile)
        .catch(error => {
          this.error = error.error;
        });
    },
    handleSignUp(profile) {
      this.error = '';
      this.onSignUp(profile)
        .catch(error => {
          this.error = error.error;
        });
    }
  }
};
</script>