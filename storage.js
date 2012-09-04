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
        var k, v, cookies = document.cookie.split(";");
        for(var i=0; i < cookies.length; i++) {
          k = cookies[i].substring(0, cookies[i].indexOf('='));
          v = cookies[i].substring(cookies[i].indexOf('=') + 1);
          k = k.replace(/^\s+|\s+$/g, "");//remove white space
          if(k == 'storage') {
            return JSON.parse(unescape(v));
          }
        }
        return {};
      },

      setStorageCookie: function(value) {
        var domain = document.domain;
        this.storage = this.getStorageCookie();
        if(typeof(value) === 'object') {

          value = JSON.stringify(value);
        }
        else {
          value = new Object(value);
          value = JSON.stringify(value);
        }
        this.removeStorageCookie();
        document.cookie += 'storage=' + escape(value) +
                          ';path=/;domain=' + domain + ';';
      },

      removeStorageCookie: function() {
        var k, v, cookies = document.cookie.split(";");
        for(var i=0; i < cookies.length; i++) {
          k = cookies[i].substring(0, cookies[i].indexOf('='));
          v = cookies[i].substring(cookies[i].indexOf('=') + 1);
          k = k.replace(/^\s+|\s+$/g, "");//remove white space
          if(k == 'storage') {
            cookies.remove(i);
            break;
          }
        }
        document.cookie = cookies.join(';');
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
