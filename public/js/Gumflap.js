(function($) {
  
  window.Message = Backbone.Model.extend({
    url: '/messages'
  });
  
  window.Messages = Backbone.Collection.extend({
    model: Message,
    url: '/messages'
  });
  
  window.messages = new Messages();
  
  window.MessageView = Backbone.View.extend({
    tagName: 'li',
    className: 'message',
    
    initialize: function() {
      _.bindAll(this, 'render');
      this.model.bind('change', this.render);
      this.template = _.template($("#message-template").html());
    },
    
    render: function() {
      var renderedContent = this.template(this.model.toJSON());
      $(this.el).html(renderedContent);
      return this;
    }
  });
  
  window.ChatMessageView = MessageView.extend({});
  
  window.ChatView = Backbone.View.extend({
    tagName: 'section',
    className: 'chat',
    
    initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($('#chat-template').html());
      this.collection.bind('reset', this.render);
    },
    
    events: {
      "keypress .message-input"      : "createOnEnter"
    },
    
    render: function() {
      var $messages,
        collection = this.collection;
      $(this.el).html(this.template({}));
      $messages = this.$('.messages');
      this.collection.each(function(message) {
        var view = new ChatMessageView({
          model: message,
          collection: collection
        });
        $messages.append(view.render().el);
      });
      return this;
    },
    
    createOnEnter: function(e) {
      if (e.keyCode != 13) return;
      $input = $('.message-input')
      message = new Message({ body: $input.val(), username: sessionStorage.getItem('chat.username') });
      message.save();
      $input.val('');
      messages.add(message);
      this.render();
    },
  });
  
  window.BackboneGumflap = Backbone.Router.extend({
    routes: {
      '': 'home'
    },
    
    initialize: function() {
      this.chatView = new ChatView({
        collection: window.messages
      });
    },
    
    home: function() {
      var $container = $('#container');
      $container.empty();
      $container.append(this.chatView.render().el);
    }
  });
  
  $(function() {
    window.App = new BackboneGumflap();
    Backbone.history.start();
  });
})(jQuery);