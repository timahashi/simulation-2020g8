const VueSlider  = window[ 'vue-slider-component' ];

var brd = JXG.JSXGraph.initBoard('jxgbox', { 
    boundingbox: [-5, 5, 5, -5], axis:true
});

var updatefunction = function () {
      brd.update();
    };

let app = new Vue({
  el: '#app',
  components: {
    'vueSlider': VueSlider,
  },
  data: {
    a:1,
    b:1,
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

function func(x) {
	return app.geta*x+app.getb;
}

var f = brd.create('functiongraph', [func], {strokewidth:2});

