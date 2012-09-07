(function() {
  if(typeof(sessionStorage) === 'undefined'){
    //when unsupproted localStorage using cookie
    sessionStorage = {
      storage: {},

      getItem: function(key) {
        this.storage = this.getStorageCookie();
        return this.storage[key];
      },

      setItem: function(key, value) {
        this.storage = this.getStorageCookie();
        this.storage[key] = value;
        this.setStorageCookie(this.storage);
      },

      removeItem: function(key) {
        this.storage = this.getStorageCookie();
        delete(this.storage[key]);
        this.setStorageCookie(this.storage);
      },

      clear: function() {
        this.storage = {};
        this.setStorageCookie(this.storage);
      },

      getStorageCookie: function() {
        var cookie = document.cookie;
        var key = 'storage=';
        var start_index = cookie.indexOf(key);
        if(start_index != -1) {
          start_index = start_index + key.length;
          var end_index = cookie.indexOf(';', start_index);
          end_index = (end_index == -1)? cookie.length : end_index;
          var v = cookie.substring(start_index, end_index);
          return JSON.parse(unescape(v));
        }
        return {};
      },

      setStorageCookie: function(value) {
        var domain = document.domain;
        if(typeof(value) === 'object') {
          value = JSON.stringify(value);
        }
        else {
          value = new Object(value);
          value = JSON.stringify(value);
        }
        document.cookie = 'storage=' + escape(value) +
                          '; path=/; domain=' + domain + ';';
      },

      removeStorageCookie: function() {
        var exp = new Date();
        var domain = document.domain;
        exp.setDate( exp.getDate() - 1 );
        document.cookie = 'storage=' + '; expires=' + exp.toGMTString() +
                          '; path=/; domain=' + domain + ';';
      }
    }
  }

  storage = function(key, value) {
    var s = sessionStorage;
    if(typeof(value) !== 'undefined') {
      if(typeof(value) == 'object')
        return s.setItem(key, JSON.stringify(value));
      else {
        var t_obj = new Object(value);
        return s.setItem(key, JSON.stringify(value));
      }
    }
    else {
      var temp = s.getItem(key);
      return (temp)? JSON.parse(temp) : '';
    }
  }

  storage.remove = function(key) {
    sessionStorage.removeItem(key);
  };

  storage.clear = function() {
    sessionStorage.clear();
  };
})();
