/*
		CS-133S-01 - JavaScript
		Miki Marshall
		03/21/2012
		Final Exam Project - Winter 2012
		
		Fantasy Island Travel	
		
*/

//Global Constants ..................................................
//Array of destination cities
var VACATIONS = 
	["Athens, Greece", "Madrid, Spain", "Tokyo, Japan", "Honolulu, USA", "Sydney, Australia", "London, England", "Oslo, Sweden", "Moscow, Russia", "Kingston, Antigua", "Acapulco, Mexico", "Brasilia, Brazil", "Lima, Peru", "Chicago, USA", "Toronto, Canada", "Cairo, Egypt", "Capetown, South Africa"];


//Global variables ..................................................
//Totals accumulator
var myTotals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//Poll question tally
var myVoteCount = 0;


//Event Handlers ....................................................
// (in onload event)
window.onload = function()
{
	//Initialize the page itself ..........................
    //Hide the "entries" heading from the bottom of the page
	$visibility("entries", false);
	
	//Populate the radio buttons with two new vacation destinations
	doNewPoll();
	
	//Show initial zero totals, to fill the space
	displayTotals()
	
	//Register button click event handlers
	$eventHandler("optRadio1", "onclick", doOption1Click);
	$eventHandler("optRadio2", "onclick", doOption2Click);
}

//Handle onclick for option 1 button
function doOption1Click()
{
	//Update vote total for this button
	doVoteTotal("optRadio1");
}

//Handle onclick for option 2 button
function doOption2Click()
{
	//Update vote total for this button
	doVoteTotal("optRadio2");
}


//Functions .........................................................

//( doRandomNumber() can be found in commonliob.js )

//Display tally of entries for each vacation spot
function displayTotals()
{
	//HTML string, as table
	var html = "<table>";
	
	//For each vacation location
	rows = VACATIONS.length / 2;
	for (var i = 0; i < (rows); i++)
	{
		//First column
		html += "<tr><td>" + VACATIONS[i] + "</td>"
		html += "<td class='tally'>" + myTotals[i] + "</td>"
		//Second column
		html += "<td>" + VACATIONS[i + rows] + "</td>"
		html += "<td class='tally'>" + myTotals[i + rows] + "</td></tr>"
	}
	
	//Close table and display
	html += "</table>";
	$html("results", html);
}

//Populate the radio buttons with two different vacation destinations
function doNewPoll()
{
	var max = VACATIONS.length - 1;
	var choice1, choice2;

	//Select a random vacation for first choice
	choice1	= VACATIONS[randomNumber(0, max)];
	
	//Select a different random vacation for second choice
	do
	{
		var choice2 = VACATIONS[randomNumber(0, max)];
	} 
	while (choice1 == choice2);

	//Display choices on radio buttons
	$html("optSpan1", choice1);
	$html("optSpan2", choice2);
	
	//Set values of radio buttons
	$value("optRadio1", choice1);
	$value("optRadio2", choice2);
	
	//Deselect both radio buttons
	$checked("optRadio1", false);
	$checked("optRadio2", false);
}

function doVoteTotal(buttonId)
{
	//Only when the button is checked...
	if ($isChecked(buttonId))
	{	
		//Get the vacation name selected
		var choice = $value(buttonId);
		
		//Find matching vacation in array
		for (var i = 0; i < VACATIONS.length; i++)
		{
			if (choice == VACATIONS[i])
			{
				//Increment total for that entry and exit loop
				myTotals[i]++;
				break;
			}
		}

		//Increment entry count and redisplay totals
		myVoteCount++;
		displayTotals();
		
		// Display entry statistics
		$html("count", myVoteCount);
		$visibility("entries", true);
		
		//Start a new poll
		doNewPoll();
	}
}
