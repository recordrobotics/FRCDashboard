// Define UI elements
let ui = {
		robotState: document.getElementById('robot-state').firstChild,
};

let buttonNames = [];
let buttonColors = [];
let buttonIDs = [];
let buttonBooleans = [];

buttonNames.push("button1");
buttonNames.push("button2");

buttonColors.push("#00FFF2");
buttonColors.push("silver");

var i = 0;
for (var name in buttonNames){
	buttonIDs.push(document.getElementById(buttonNames[name]));
	buttonBooleans.push(false);
	buttonIDs[i].innerHTML = buttonNames[i] + " (off)"; 
	buttonIDs[i].style.backgroundColor = buttonColors[i]; 
	i++;
}

function toggleButton(buttonIndex, encoderID){
	buttonBooleans[buttonIndex] = !buttonBooleans[buttonIndex];
	if (buttonBooleans[buttonIndex])
		buttonIDs[buttonIndex].innerHTML = buttonNames[buttonIndex] + " (on)"; 
	else 
		buttonIDs[buttonIndex].innerHTML = buttonNames[buttonIndex] + " (off)"; 
	NetworkTables.putValue("/SmartDashboard/" + encoderID + ".encoder", buttonBooleans[buttonIndex]);
}


// Key Listeners
//

function setupMarks(){
	var mark1 = document.getElementById("mark1"); 
	var mark2 = document.getElementById("mark2"); 
	var mark3 = document.getElementById("mark3"); 
	var mark4 = document.getElementById("mark4"); 
	var mark5 = document.getElementById("mark5"); 
	var mark6 = document.getElementById("mark6"); 

	mark1.style.height = '10%'; 
	mark2.style.height = '10%'; 
	mark3.style.height = '10%'; 
	mark4.style.height = '10%'; 
	mark5.style.height = '10%'; 
	mark6.style.height = '10%'; 
}

setupMarks();


// KAISU ADDITIONS
NetworkTables.addKeyListener('/SmartDashboard/lifter.encoder', (key, value) => {
	let MIN = 0.00;
	let MAX = 2.00;
	var lifterBar = document.getElementById("lifterBar"); 
	var lifterStats = document.getElementById("lifterStats"); 
	width = (value).toFixed(2);
	if (width < 0){
		width = 0;
	}
	lifterBar.style.height = (width-MIN)*100/2 + '%'; 
	lifterStats.innerHTML = ((width-MIN)*100/2).toFixed(1) + '% (Lifter)'; 
});


NetworkTables.addKeyListener('/SmartDashboard/lifter.encoder', (key, value) => {
	let MIN = 0.00;
	let MAX = 2.00;
	var pivotBar = document.getElementById("pivotBar"); 
	var pivotStats = document.getElementById("pivotStats"); 
	width = (value).toFixed(2);
	if (width < 0){
		width = 0;
	}
	pivotBar.style.height = (width-MIN)*100/2 + '%'; 
	pivotStats.innerHTML = ((width-MIN)*100/2).toFixed(1) + '% (pivot)'; 
});

addEventListener('error',(ev)=>{
    ipc.send('windowError',{mesg:ev.message,file:ev.filename,lineNumber:ev.lineno})
})
