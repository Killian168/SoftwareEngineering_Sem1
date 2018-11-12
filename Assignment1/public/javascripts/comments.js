var name;
var comment;
var time;
var upVotes;
var downVotes;

$(document).ready(function(){

    // Gets rid of all previous comments in the comment section
    $('#comments').empty();

    // Returns all comments from the db
    getComments();

    // Toggles text in the toggle comment div
    $("#toggle-comments").click(function(){

            if ($('#comments').html().trim()) {

                $("#comments").slideToggle();

                if ($("#commentButtonText").text()=="Hide Comments") {
                    $("#commentButtonText").text("Show Comments");
                }
                else {
                    $("#commentButtonText").text("Hide Comments");
                }

            }

    });// End toggle-Comments

    // Submits a new comment to the DB and displays it
    $("#submit").click(

        function(){

            // Remove previous stylings
            $('#name').removeClass('inValid');
            $('#comment').removeClass('inValid');

            // Creates a new object called myObject to hold name:values
            var myObject = {name,comment, upVotes, downVotes, time};

            // Stores the values from the form in the above object
            myObject.name = $("#name").val();
            myObject.comment = $('#comment').val();
            myObject.upVotes = 0;
            myObject.downVotes = 0;
            myObject.time = Date.now();

            // Error checks typing
            var formComplete = checkForm();

            // Checks if the form is successfully completed    
            if(formComplete==false) {

                // If not highlight areas that need to be filled
                if($.trim($('#name').val()) == '') { // zero-length string AFTER a trim
                    $('#name').addClass('inValid');
                }
                if($.trim($('#comment').val()) == '') { // zero-length string AFTER a trim
                    $('#comment').addClass('inValid');
                }

            } 
            else {

                // If user omissed "@" add it to their name
                var string = myObject.name;
                var substring = "@";
                if(!string.includes(substring)) {
                    myObject.name = substring + string;
                }

                // Sends the comment to the DB
                postComment(myObject);

                // Gets comments from DB and displays them on the page
                getComments();

                // Changes the text inside the commentButton
                if ($("#commentButtonText").text()!="Show Comments") {
                        $("#commentButtonText").text("Remove Comments");
                }
            }

    });// End submit OnClick event

    $('#close-modal').click(function() {
        $('#name').removeClass('inValid');
        $('#comment').removeClass('inValid');
    });

}); // End Doc Ready

function postComment(commentDets) {          
        console.log("I'm posting a comment");  
            $.ajax({
                url: '/addComment/',
                type: 'POST',
                data: {handle: commentDets.name, comment: commentDets.comment, upVotes: commentDets.upVotes,
                        downVotes: commentDets.downVotes, timeStamp: commentDets.time},
                success: function() {
                    console.log('I sent a comment to the DB succesfully');
                    displayComment(commentDets);
                },
                error: console.log('There was an error when sending the comment to the DB')
            });
    }// End postComments

    function getComments() {
        console.log("I'm getting the comments");
        $('#comments').empty();
            $.ajax({
                url: '/getComment',
                type: 'GET',
                success: function (data) {

                    console.log("Got the Comments");

                    if (!$.trim(data)){
                        console.log("There are no Comments");
                        $("#commentButtonText").text("No Comments Available");
                    }
                    else{   
                        console.log("About to display!!");
                        var posts = "";
                        for (var i = 0; i < data.length; i++) {
                            // Creates HTML
                            console.log(data);
                            console.log(data.length);
                            console.log('Get Comments loop ran '+ i +' times');
                            displayComment(data[i]);
                        }
                    }
                }
            });
    }// End getComments

    function displayComment(data) {

                console.log(data);

                var stringTimeElapsed = calcTime(data.timeStamp);

                // HTML code to print out a comment
                var html = '<div class="panel panel-white post panel-shadow"><div class="post-heading"><div class="pull-left image"><img src="http://bootdey.com/img/Content/user_1.jpg" class="img-circle avatar" alt="user profile image"></div><div class="pull-left meta"><div class="title h5"><a href="#"><b>'+data.handle+'</b></a></div><h6 class="text-muted time">'+stringTimeElapsed+'</h6></div></div><div class="post-description"><p>'+data.comment+'</p><div class="stats"><button class="btn btn-default stat-item" id="upVotes"><i class="fa fa-thumbs-up icon"></i>'+data.upVotes+'</button><button class="btn btn-default stat-item" id="downVotes" ><i class="fa fa-thumbs-down icon"></i>'+data.downVotes+'</button></div></div></div>';
                
                // Prints out the comment
                $('#comments').prepend(html);

    }// End displayComment

    // Calculates the time from when it was posted
    function calcTime(time) {

        var date = new Date(time)
        var timeElapsed = ((Date.now() - date.getTime())/1000);
        var stringTimeElapsed = "";

                // If in Seconds
                if(timeElapsed<60) {
                    timeElapsed = Math.round(timeElapsed);
                    stringTimeElapsed = "posted " + timeElapsed + "s ago";
                }
                else {

                    // If in Minutes
                    if(timeElapsed<3600) {
                        timeElapsed = Math.round((timeElapsed/60));
                        stringTimeElapsed = "posted " + timeElapsed + "m ago";
                    }
                    else {

                        // if in hours
                        if(timeElapsed<86400) {
                            timeElapsed = Math.round((timeElapsed/3600));
                            stringTimeElapsed = "posted " + timeElapsed + "hrs ago";
                        }
                        else {

                            // if in days
                            if(timeElapsed<604800) {
                                timeElapsed = Math.round((timeElapsed/86400));
                                stringTimeElapsed = "posted " + timeElapsed + "days ago";
                            }
                            else {

                                // if in weeks
                                if(timeElapsed<2419200) {
                                    timeElapsed = Math.round((timeElapsed/604800));
                                    stringTimeElapsed = "posted " + timeElapsed + "weeks ago";
                                }
                                else {

                                    // if in Months
                                    if(timeElapsed<29030400) {
                                        timeElapsed = Math.round((timeElapsed/2419200));
                                        stringTimeElapsed = "posted " + timeElapsed + "months ago";
                                    }
                                    else {
                                        
                                        // if in Years
                                        timeElapsed = Math.round((timeElapsed/29030400));
                                        stringTimeElapsed = "posted " + timeElapsed + "years ago";

                                    }

                                }

                            }

                        }

                    }

                }

                return stringTimeElapsed;

    }// End calcTime

    function checkForm() {

        // Checks if areas are filled
        if(($.trim($('#name').val()) == '')||($.trim($('#comment').val()) == '')) 
        {
            return false;
        }
        else {
            return true;
        }

    }// End checkForm()