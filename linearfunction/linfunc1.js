
// var brd = JXG.JSXGraph.initBoard('jxgbox', { 
//     boundingbox: [-5, 5, 5, -5], axis:true
// });

// var updatefunction = function () {
//       brd.update();
//     };




const VueSlider  = window[ 'vue-slider-component' ];

var updatevisiblemain = function() {};

var updatevisible = function() {
  updatevisiblemain();
};

var makelineq = function(a, b) {
  if (a == 0) {
    eq = String(b);
  } else {
    if (a == 1) {
      coef = ""
    } else if (a == -1) {
      coef = "-"
    } else {
      coef= String(a);
    }
    if (b == 0) { 
      cst = ""
    } else if (b > 0) {
      cst = "+" + String(b)
    } else {
      cst = String(b)
    }
    eq = coef + "x" + cst
  }
  return eq;
}

let app = new Vue({
  el: '#app',
  components: {
    'vueSlider': VueSlider,
  },
  data: {
    func1a: 1,
    func1b: 1,
    func2a: -2,
    func2b: 2,
    func1: true,
    func2: true,
  },
  computed: {
    // get1a: function () {
    //   return this.func1a;
    // },
    // get1b: function () {
    //   return this.func1b;
    // },
    v1: function () {
      return app.func1;
    },
    v2 : function () {
      return app.func2;
    },
    getfunc1equation: function() {
      return this.func1 ? "y=" + makelineq(this.func1a, this.func1b) : "";
    },
    getfunc2equation: function() {
      return this.func2 ? "y=" + makelineq(this.func2a, this.func2b) : "";
    },
  },
  watch: {
    func1a: updatefunction,
    func1b: updatefunction,
    func2a: updatefunction,
    func2b: updatefunction,
    func1: updatevisible,
    func2: updatevisible,
  }
});
   

function f1(x) {
	return app.func1a*x+app.func1b;
}

function f2(x) {
	return app.func2a*x+app.func2b;
}


var f1 = brd.create('functiongraph', [f1], {strokeWidth:2, needsUpdate: true});

var f2 = brd.create('functiongraph', [f2], {strokeWidth:2, strokeColor:"red", needsUpdate: true});

var updatevisiblemain = function () {
  f1.setAttribute({visible: app.func1});
  f2.setAttribute({visible: app.func2});
}

var updatefunctionhook = function () {
  console.log(app.func1,app.func2);
}