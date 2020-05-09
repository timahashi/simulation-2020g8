
// var brd = JXG.JSXGraph.initBoard('jxgbox', { 
//     boundingbox: [-5, 5, 5, -5], axis:true
// });

// var updatefunction = function () {
//       brd.update();
//     };


const VUESLIDER_ERROR_TYPE = {
  VALUE: 1,
  INTERVAL: 2,
  MIN: 3,
  MAX: 4,
  ORDER: 5,
}

const VueSlider  = window[ 'vue-slider-component' ];

var updatevisiblemain = function() {};

var updatevisible = function() {
  updatevisiblehook();
};

var animcontrol = function() {
  animcontrolhook();
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
    func2: false,
    errorMsg: '',
    dira: 0,
    dirb: 0,
    anima: 0,
    animb: 0,
    interval: 100,
  },
  computed: {
    // get1a: function () {
    //   return this.func1a;
    // },
    // get1b: function () {
    //   return this.func1b;
    // },
    v1: function() {
      return this.func1;
    },
    v2: function() {
      return this.func2;
    },
    getfunc1equation: function() {
      return this.func1 ? "y=" + makelineq(this.func1a, this.func1b) : "";
    },
    getfunc2equation: function() {
      return this.func2 ? "y=" + makelineq(this.func2a, this.func2b) : "";
    },
  },
  methods: {
    f1: function(x) {
      return Number(this.func1a) * x + Number(this.func1b);
    },
    f2: function(x) {
      return Number(this.func2a) * x + Number(this.func2b);
    },
    clearErrorMsg: function () {
      this.errorMsg = '';
    },
    error: function (type,msg) {
      switch(type) {
        case VUESLIDER_ERROR_TYPE.MIN:
          break
        case VUESLIDER_ERROR_TYPE.MAX:
          break
        case VUESLIDER_ERROR_TYPE.VALUE:
          break
      }
      this.errorMsg = msg;
    },
    timermain: function (v,di,animf){
      if ((v <= -10) && (di == -1)) {
        di = 1;
      } else if ((v >= 10) && (di == 1)) {
        if (animf == 2) {
          di = -1
        } else {
          v = -10.0-0.1;
        }
      }
      v = Math.round((v + 0.1*di)*10)/10;
      return [v,di,animf];
    },
    timercount: function () {
      let self=this
      if (this.anima != 0) {
        if (this.dira == 0) {
          this.dira = 1
        }
        l = this.timermain(this.func1a, this.dira, this.anima);
        this.func1a = l[0];
        this.dira = l[1];
      } else {
          this.dira = 0
      }
      if (this.animb != 0) {
        if (this.dirb == 0) {
          this.dirb = 1
        }
        l = this.timermain(this.func1b, this.dirb, this.animb);
        this.func1b = l[0];
        this.dirb = l[1];
      } else {
          this.dirb = 0
      }
      if ((this.anima != 0) || (this.animb != 0)) {
        setTimeout(self.timercount, this.interval);
      }
    },
    animcontrolhook: function () {
      let self=this
      if ((this.anima != 0) || (this.animb != 0)) {
        setTimeout(self.timercount, this.interval)
      } else {
        this.dira = 0
        this.dirb = 0
      }
    },
    modifyinterval: function () {
      if (this.timeron) {
        self=this
        clearInterval(this.timerobj)
        this.timerobj = setInterval(function() {self.timercount()}, this.interval)
      }
    },
  },
  watch: {
    func1a: updatefunction,
    func1b: updatefunction,
    func2a: updatefunction,
    func2b: updatefunction,
    func1: updatevisible,
    func2: updatevisible,
    anima: 'animcontrolhook',
    animb: 'animcontrolhook',
    interval: 'modifyinterval',
  },
  mounted: function() {
    f1 = brd.create('functiongraph', [this.f1], {strokeWidth:2});
    f2 = brd.create('functiongraph', [this.f2], {strokeWidth:2, strokeColor:"red"});

    updatevisiblehook = function () {
      f1.setAttribute({visible: app.v1});
      f2.setAttribute({visible: app.v2});
    }

    updatefunctionhook = function () {
      if (!isNaN(app.func1a) && !isNaN(app.func1b)) {
        f1.needsUpdate = true;
        f1.update().updateRenderer();
      }
      if (!isNaN(app.func2a) && !isNaN(app.func2b)) {
        f2.needsUpdate = true;
        f2.update().updateRenderer();
      }
      // brd.update()
    }
  }
});





updatevisible();
brd.update();
