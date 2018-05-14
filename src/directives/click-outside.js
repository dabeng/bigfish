import Vue from 'vue'

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    document.body.addEventListener('click', function (event) {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
        // vnode.context.[binding.expression](event)
      }
    })
  },
  // unbind: function (el, binding, vnode) {
  //   document.body.removeEventListener('click', vnode.context.event)
  // }
})
