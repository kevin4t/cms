Template.commentSubmit.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var $body = $(e.target).find('[name=body]');
        var $author =$(e.target).find('[name=anthor]');
        var comment = {
            content: $body.val(),
            postId: template.data._id,
            author:$author.val()
        };

        var errors = {};


        Meteor.call('commentInsert', comment, function(error, commentId) {
            if (error){
                throwError(error.reason);
            } else {
                $body.val('');
            }
        });
    }
});