    Template.login.events({
        'submit form': function(event){
            event.preventDefault();
            var myUsername = event.target.username.value;
            var myPassword = event.target.loginPassword.value;

            Meteor.loginWithPassword(myUsername, myPassword, function(error){
                if (Meteor.user()) {
                    console.log(Meteor.userId());
                    sAlert.success("登陆成功",{effect:'jelly'});
                } else {
                    console.log("ERROR: " + error.reason);
                    alert("ERROR: " + error.reason);
                }
            });
        }
    });

    Template.home.events({
        'click .logout': function(event){
            event.preventDefault();

            Meteor.logout(function(error) {
                if(error) {
                    console.log("ERROR: " + error.reason);
                }
            });
        }
    });

    Template.write.events({
        'submit form': function(event){
            event.preventDefault();
            var myTitle = event.target.title.value;
            var myContent = event.target.content.value;



            var post = {
                title: $(event.target).find('[name=title]').val(),
                content: $(event.target).find('[name=content]').val()
            };
            Meteor.call('postInsert', post, function(error, result) {
                // 显示错误信息并退出
                if (error)
                    return sAlert.error(error.reason,{effect: 'jelly'});

                Router.go('postPage', {_id: result._id});
            });
        }



    });


