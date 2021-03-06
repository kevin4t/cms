Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return [ Meteor.subscribe('comments')];
    }
});



Router.route('/posts/:_id', {
    name: 'postPage',
    waitOn: function() {
        return [
            Meteor.subscribe('singlePost', this.params._id),
            //Meteor.subscribe('comments', this.params._id)
        ];
    },
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
    name: 'postEdit',
    waitOn: function() {
        return Meteor.subscribe('singlePost', this.params._id);
    },
    data: function() { return Posts.findOne(this.params._id); }
});
Router.route('/admin',{name:'admin'});
Router.route('/admin/write',{name:'write'});

PostsListController = RouteController.extend({
    template: 'postsList',
    increment: 10,
    postsLimit: function() {
        return parseInt(this.params.postsLimit) || this.increment;
    },
    findOptions: function() {
        return {sort: {submitted: -1}, limit: this.postsLimit()};
    },
    subscriptions: function() {
        this.postsSub = Meteor.subscribe('posts', this.findOptions());
    },
    posts: function() {
        return Posts.find({}, this.findOptions());
    },
    data: function() {
        var hasMore = this.posts().count() === this.postsLimit();
        var nextPath = this.route.path({postsLimit: this.postsLimit() + this.increment});
        return {
            posts: this.posts(),
            ready: this.postsSub.ready,
            nextPath: hasMore ? nextPath : null
        };
    }
});


Router.route('/:postsLimit?', {
    name: 'postsList',

});

var requireLogin = function() {
    if (! Meteor.user()) {
        this.render('accessDenied');
        sAlert.error("请登录",{effect: 'jelly', position: 'bottom-right', timeout: '3000', onRouteClose: false, stack: false, offset: '10px'});
    } else {
        this.next();
    }
}
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'write'});