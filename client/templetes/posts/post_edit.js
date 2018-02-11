Template.postEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            title: $(e.target).find('[name=title]').val(),
            content: $(e.target).find('[name=content]').val(),
            submitted:new Date()
        }

        Posts.update(currentPostId, {$set: postProperties}, function(error) {
            if (error) {
                // 向用户显示错误信息
                sAlert.error(error.reason,{effect:'jelly'});
            } else {
                Router.go('postPage', {_id: currentPostId});
            }
        });
    },

    'click .delete': function(e) {
        e.preventDefault();

        if (confirm("Delete this post?")) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});