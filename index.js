var alarms = [];
var totalAlarms = 0;

function showtime() {
  var d = new Date();
  var seconds = d.getSeconds();
  var minutes = d.getMinutes();
  var hours = d.getHours();
  var session = hours > 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  var hours = hours < 10 ? "0" + hours : hours;
  var minutes = minutes < 10 ? "0" + minutes : minutes;
  var seconds = seconds < 10 ? "0" + seconds : seconds;
  var time = hours + ":" + minutes + ":" + seconds + " " + session;
  document.getElementById("clock").innerHTML = time;
}
setInterval(showtime, 1000);
setInterval(ringalarm, 1000);
var audio = new Audio("audio.wav");

function Alarm() {
  if ($(".alarm-btn").text() === "Create an Alarm") {
    $(".add-alarm").css("display", "block");
    $(".Alarm-input").css("display", "flex");
    $(".alarm-input-button").css("display", "block");
    $(".alarm-btn").text("Cancel");
  } else {
    $(".add-alarm").css("display", "none");
    $(".alarm-btn").text("Create an Alarm");
  }
}

function createAlarm() {
  var alarm_name = document.getElementById("alarm-name").value;
  var hours = document.getElementById("hours").value;
  var minutes = document.getElementById("minutes").value;
  var session = document.getElementById("session").value;
  var time = hours + ":" + minutes + " " + session;
  if (alarm_name === "" || hours === "" || minutes === "" || session === "") {
    alert("Please enter all values");
    return;
  }
  if (!alarms.includes(time)) {
    totalAlarms++;
    alarms.push(time);
    $(".add-alarm").css("display", "none");
    $(".alarm-btn").text("Create an Alarm");
    document.getElementById("alarm-name").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("session").value = "";
    $(".add-alarm").after(
      "<div id='alarm" +
        totalAlarms +
        "' class='alarm'><h2 class='alarm-text'>" +
        alarm_name +
        "</h2><h2 id='alarm-time' class='alarm-text'>" +
        time +
        "</h2><button onclick='Delete_btn(id)' id='" +
        totalAlarms +
        "' class='delete-btn'>Delete</button></div>"
    );
  } else {
    alert("Already Added");
    document.getElementById("alarm-name").value = "";
    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("session").value = "";
  }
}

function Delete_btn(id) {
  var time = $("#alarm" + id + " #alarm-time").html();
  var index = alarms.indexOf(time);
  alarms.splice(index, 1);
  $("#alarm" + id).remove();
  totalAlarms--;
  audio.pause();
  audio.currentTime = 0;
}

function ringalarm() {
  var d = new Date();
  var seconds = d.getSeconds();
  var minutes = d.getMinutes();
  var hours = d.getHours();
  var session = hours > 12 ? "PM" : "AM";
  hours = hours > 12 ? hours - 12 : hours;
  var hours = hours < 10 ? "0" + hours : hours;
  var minutes = minutes < 10 ? "0" + minutes : minutes;
  var seconds = seconds < 10 ? "0" + seconds : seconds;
  var time = hours + ":" + minutes + " " + session;
  if (alarms.includes(time)) {
    audio.play();
  }
}
