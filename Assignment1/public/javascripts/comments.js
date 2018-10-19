var name;
var comment;
var time;
var comments = [];

$(document).ready(function(){

    $("#submit").click(

        function(){

            // Creates a new object called myObject to hold name:values
            var myObject = {name,comment, time}; // 3 vars of name, comment, time

            // Stores the values from the form in the above object
            myObject.name = $("#name").val();
            myObject.comment = $('#comment').val();
            myObject.time = Date.now();

            // If user omissed "@" add it to their name
            var string = myObject.name;
            var substring = "@";
            if(!string.includes(substring)) {
                myObject.name = substring + string;
            }


            // Prints out the value of the object
            //alert(myObject.name + "\n" + myObject.comment + "\n" + myObject.time);

            // Pushes myObject onto the array for storage
            comments.push({"name": myObject.name, "comment": myObject.comment, "time": myObject.time});
        
            // Gets rid of all previous comments in the comment section
            $('#comments').empty();

            // Runs through the comments array and prints out a comment on screen
            for(var i=0; i<comments.length; i++) {
                var timeElapsed = (Date.now() - comments[i].time)/1000;
                var stringTimeElapsed;

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

                // HTML code to print out a comment
                var html = '<div class="panel panel-white post panel-shadow"><div class="post-heading"><div class="pull-left image"><img src="http://bootdey.com/img/Content/user_1.jpg" class="img-circle avatar" alt="user profile image"></div><div class="pull-left meta"><div class="title h5"><a href="#"><b>'+comments[i].name+'</b></a></div><h6 class="text-muted time">'+stringTimeElapsed+'</h6></div></div><div class="post-description"><p>'+comments[i].comment+'</p><div class="stats"><a href="#" class="btn btn-default stat-item"><i class="fa fa-thumbs-up icon"></i>2</a><a href="#" class="btn btn-default stat-item"><i class="fa fa-thumbs-down icon"></i>12</a></div></div></div>';
                // Prints out the comment
                $('#comments').prepend(html);
            
            }// End for loop

    });// End OnClick event

}); // End Doc Ready