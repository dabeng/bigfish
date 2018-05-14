import Vue from 'vue'

Vue.directive('click-outside', function (el, binding, vnode) {
  document.body.addEventListener('click', function (event) {
    if (el.querySelector('.in-edit')) {
      if (!(el.querySelector('.in-edit') === event.target || el.querySelector('.in-edit').contains(event.target))) {
        binding.value()
      }
    }
  })
})
