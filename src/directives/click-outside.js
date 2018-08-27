import Vue from 'vue'

// Vue.directive('click-outside', function (el, binding, vnode) {
//   var selector = binding.value.selector
//   var func = binding.value.func
//   document.body.addEventListener('click', function (event) {
//     if (el.querySelector(selector)) {
//       if (!(el.querySelector(selector) === event.target || el.querySelector(selector).contains(event.target))) {
//         func()
//       }
//     }
//   })
// })
Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideHandler = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideHandler)
  },
  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideHandler)
  }
})
