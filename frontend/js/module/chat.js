define([
	'text!tpl/module/chat.html',
	'js/module/message',
	'js/module/popup',
	'js/module/userlist',
	'js/module/chattip',
	'js/util'
], function(tpl, Message, Popup, UserList, Chattip, util){
	var	$body = $('body'),
		$notice = $('#notice'),
		$side = $('#side'),
		$popup = $('#popup'),
		$header = null,
		$content = null,
		$footer = null,
		$input = null;

	var View = Backbone.View.extend({
		className: 'mod-chat',
		events: {
			'keydown .mod-chat-input': 'onKeydown'
		},
		initialize: function(options){
			var self = this;

			this.uinfo = util.getStorage();
			if(!this.uinfo){
				this.initPopup();
				return;
			}

			this.options = options;
			this.initWebsocket();
			this.initUserList();
			this.renderFrame();
			this.cacheElements();
		},
		initPopup: function(){
			new Popup({
				renderTo: $body,
				onsubmit: function(data){
					data.id = util.getId('uid');
					util.setStorage(data);
					this.uinfo = util.getStorage();
					location.reload();
				}
			});
		},
		initUserList: function(){
			this.userList = new UserList({
				renderTo: $side,
				me: this.uinfo
			});
		},
		initWebsocket: function(){
			var self = this;

			if(window.WebSocket){
				var socket = new window.WebSocket('ws://43.155.105.128:8200');
				socket.onopen = function(e) {
					socket.onmessage = function(e) {
						self.handleMessage(e.data)
					};
					socket.onclose = function(e) {
						self.handleMessage(e.data)
					};

					self.uinfo.type = 'connect';
					socket.send(JSON.stringify(self.uinfo));
				};
			} else {
				throw new Error('WebSocket is not supported');
			}
		},
		renderFrame: function(){
			this.$el.html(tpl);
			this.options.renderTo.html(this.$el);
		},
		cacheElements: function(){
			$header = this.$el.find('.mod-chat-header');
			$content = this.$el.find('.mod-chat-content');
			$footer = this.$el.find('.mod-chat-footer');
			$input = this.$el.find('.mod-chat-input');
		},
		onKeydown: function(e){
			var text = $.trim($input.val());

			if(e.keyCode == 13 && text){
				e.preventDefault();
				this.comment(text);
				this.clearInput();
			}
		},
		comment: function(text){
			// 仅向服务器发送请求，不渲染
			var message = new Message({
				text: text,
				mid: util.getId('mid'),
				uid: this.uinfo.id,
				uname: this.uinfo.name
			});
		},
		clearInput: function(){
			$input.val('');
		},
		handleMessage: function(message){
			message = JSON.parse(message || {});
			switch(message.type){
				case 'connect':
				case 'leave':
					this.userList.collection.reset(message.data);
					this.userList.collection.trigger('change');
					break;
				case 'message':
					// 仅渲染，不向服务器发送请求
					new Message({
						text: message.text,
						time: message.time,
						uid: message.uid,
						uname: message.uname,
						mid: message.mid,
						klass: this.uinfo.id == message.uid ? 'mod-msg-mine' : '',  
						renderTo: $content,
						silent: true
					});
					this.scrollBootom();
					break;
				case 'tip':
					new Chattip({
						data: message.data,
						renderTo: $content
					});
					this.scrollBootom();
					break;
				case 'close':
					break;
			}
		},
		scrollBootom: function(){
			$content.scrollTop($content.height() + $content.scrollTop());
		}
	});

	return View;
});