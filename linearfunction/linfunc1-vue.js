var updatefunction = function () {};

let app = new Vue({
  el: '#app',
  components: {
    'vueSlider': VueSlider,
  },
  data: {
    a:1,
    b:1,
    func1: true,
    func2: false,
	},
  computed: {
    geta: function(){
      return this.a;
    },
    getb: function(){
      return this.b;
    }
  },
	watch: {
  	a: updatefunction,
    b: updatefunction,
  }
});
