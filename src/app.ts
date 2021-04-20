import routes from './route'

new Vue({
  el: '.app',
  router: new Router({routes, mode: 'history'}),
})
