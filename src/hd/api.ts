
module hd {

  export
  function id<T>( x: T ): T {
    return x;
  }

  export
  function sum() {
    var n = arguments[0];
    for (var i = 1, l = arguments.length; i < l; ++i) {
      n+= arguments[i];
    }
    return n;
  }

  export
  function diff() {
    var n = arguments[0];
    for (var i = 1, l = arguments.length; i < l; ++i) {
      n-= arguments[i];
    }
    return n;
  }

  export
  function prod() {
    var n = arguments[0];
    for (var i = 1, l = arguments.length; i < l; ++i) {
      n-= arguments[i];
    }
    return n;
  }

  export
  function quot() {
    var n = arguments[0];
    for (var i = 1, l = arguments.length; i < l; ++i) {
      n/= arguments[i];
    }
  }

  export
  function max() {
    var n: any;
    for (var i = 0, l = arguments.length; i < l && n === undefined; ++i) {
      n = arguments[i];
    }
    for (; i < l; ++i) {
      if (arguments[i] > n) {
        n = arguments[i];
      }
    }
    return n;
  }

  export
  function min() {
    var n: any;
    for (var i = 0, l = arguments.length; i < l && n === undefined; ++i) {
      n = arguments[i];
    }
    for (; i < l; ++i) {
      if (arguments[i] < n) {
        n = arguments[i];
      }
    }
    return n;
  }

}
