var all_timers_table = [];
/*
order of items in "all_timers_table":
    0: name
    1: reset interval
    2: duration
    3: duration in seconts
    4: elapsed time in seconds
    5: state(resumed - true / paused - false)
*/



function loadup() {
    if (document.cookie.length > 0) {
        all_timers_table = JSON.parse(document.cookie);
    }
}

function userAddTimer() {
    var INPUT_timer_reset_interval = document.getElementById("form_timer_reset_interval").value;
    var INPUT_timer_name = document.getElementById("form_timer_name").value;
    var INPUT_timer_duration = document.getElementById("form_timer_duration").value;
    
    if (INPUT_timer_reset_interval == "") {
        alert("Choose timer reset interval.");
    }
    else if (INPUT_timer_name == "") {
        alert("Enter timer name.");
    }
    else if (INPUT_timer_duration == "") {
        alert("Enter timer duration.");
    }

    else {
        addTimerToTable(INPUT_timer_name, INPUT_timer_reset_interval, INPUT_timer_duration);
        renderTimers();
    }
}

function userRemoveTimer(ID) {
    all_timers_table.splice(ID, 1);
    renderTimers();
    saveTimersToCookie();
}

function addTimerToTable(NAME, RESET_INTERVAL, DURATION) {

    // converting duration from hour format to seconds
    var duration_in_seconds = DURATION.split(':');
    duration_in_seconds[0] = parseInt(duration_in_seconds[0]) * 60 * 60;
    duration_in_seconds[1] = parseInt(duration_in_seconds[1]) * 60;
    duration_in_seconds = duration_in_seconds[0] + duration_in_seconds[1];


    if (all_timers_table.length > 0) {
        // checking if a timer with that name already exists
        for (var i = all_timers_table.length-1; i >= 0; i--) {
            if (all_timers_table[i][0] == NAME) {
                alert("A timer with that name already exists");
                break
            }
        }
        // last 0 is elapsed time | boolean is resumed(true) / paused(false)
        all_timers_table[all_timers_table.length] = [NAME, RESET_INTERVAL, DURATION, duration_in_seconds, 0, false];
    }
    else {
        // last 0 is elapsed time | boolean is resumed(true) / paused(false)
        all_timers_table[all_timers_table.length] = [NAME, RESET_INTERVAL, DURATION, duration_in_seconds, 0, false];
    }
    saveTimersToCookie();
}

function renderTimers() {
    if (all_timers_table.length > 0) {
        var string_to_add = "";
        for (var timer_id = 0; timer_id <= all_timers_table.length-1; timer_id++) {

            

            string_to_add += "<div class='timer_container_1' id='"+ timer_id +"'>"+
                "<div class='timer_container_2a' >"+
                    "<div class='pause_button' onclick='pauseResume("+ timer_id +")'></div>"+
                "</div>"+
                "<div class='timer_container_2b'>"+
                    all_timers_table[i][0] +" - "+ all_timers_table[i][2] +"<br>"+
                    "<div class='progressbar_wrapper'>"+
                        "<div class='progressbar_outer'>"+
                            "<div class='progressbar_inner' ></div>"+
                        "</div>"+
                        "<div class='delete_timer' onclick='userRemoveTimer("+ timer_id +")'></div>"+
                    "</div>"+
                "</div>"+
            "</div>";
        }
        document.getElementById("timers_drawer").innerHTML = string_to_add;
    }
    else {
        var string_to_add = "";
        document.getElementById("timers_drawer").innerHTML = string_to_add;
    }
}

function saveTimersToCookie() {
    document.cookie = JSON.stringify(all_timers_table);
}




const updateTimers_loop = setInterval(updateTimers, 1000);