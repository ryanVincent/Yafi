var utils = (function() {

  var guid = function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };

  var merge = function merge(target, source) {

    /* Merges two (or more) objects,
       giving the last one precedence */

    if ( typeof target !== 'object' ) {
        target = {};
    }

    for (var property in source) {

        if ( source.hasOwnProperty(property) ) {

            var sourceProperty = source[ property ];

            if ( typeof sourceProperty === 'object' ) {
                target[ property ] = merge( target[ property ], sourceProperty );
                continue;
            }

            target[ property ] = sourceProperty;

        }

    }

    for (var a = 2, l = arguments.length; a < l; a++) {
        merge(target, arguments[a]);
    }

    return target;
};

  return {
    guid: guid,
    merge: merge
  };

})();
