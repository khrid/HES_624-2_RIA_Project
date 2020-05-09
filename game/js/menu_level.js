function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
  
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  
  window.localStorage.setItem('level', data);
  
  var continuebtn = document.getElementById("continue");
  continuebtn.style.display = "block";
  var replaybtn = document.getElementById("replay");
  replaybtn.style.display = "block";

  var elements = document.getElementsByClassName("level_box");
  for(var i=0; i<elements.length; i++)
      elements[i].setAttribute("draggable", "false");

}

