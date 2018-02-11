Comments = new Mongo.Collection('comments');

Meteor.methods({
    commentInsert: function(commentAttributes) {
        check(this.userId, String);
        check(commentAttributes, {
            postId: String,
            content: String,
            author:String
        });

        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);

        if (!post)
            sAlert.error('invalid-comment', 'You must comment on a post');

        comment = _.extend(commentAttributes, {

            submitted: new Date()
        });

        return Comments.insert(comment);
    }
});