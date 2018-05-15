import Vue from 'vue'

Vue.directive('click-outside', function (el, binding, vnode) {
  var selector = binding.value.selector
  var func = binding.value.func
  document.body.addEventListener('click', function (event) {
    if (el.querySelector(selector)) {
      if (!(el.querySelector(selector) === event.target || el.querySelector(selector).contains(event.target))) {
        func()
      }
    }
  })
})
