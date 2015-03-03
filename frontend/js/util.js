define([
], function(){
	return {
		getId: function(type){
			return (type || 'id') + '-xxxxxx'.replace(/x/g, function(c) {
		        var r = Math.random() * 16 | 0,
		            v = c == 'x' ? r : (r & 0x3 | 0x8);

		        return v.toString(16);
		    }).toUpperCase();
		},
		getStorage: function(){
			var localStorage = window.localStorage,
				ret = '{}';

			if(localStorage){
				ret = localStorage.getItem('im-demo');
			}
			return JSON.parse(ret);
		},
		setStorage: function(data){
			localStorage.setItem('im-demo', JSON.stringify(data));
		}
	}
});