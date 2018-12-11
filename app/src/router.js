
import VueRouter from 'vue-router';
import Home from './components/home/Home';
import Dogs from './components/dogs/Dogs';

export default new VueRouter({
  // mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/dogs', component: Dogs },
    { path: '*', redirect: '/' }
  ]
});