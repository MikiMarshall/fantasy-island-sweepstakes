/*
	Miki's Common Function Library (JavaScript)
	
	Reusable functions I've written and collected as our 
	class has progressed, along with a few handy functions 
	offered from the textbook.
	
	Author:			Miki Marshall
	Last Updated:	03/21/12
*/


// Wrappers! ---------------------------------------------
// Simplified wrappers for things we do often, like
// getElementById(). From now on, "$" prepended to a 
// function will mean "By ID", and the first argument
// will always be the desired element's ID.
// --------------------------------------------------------

//Get element $(by ID)
function $(id)
{
	return document.getElementById(id);
}

//Set/get class of this element, $(by ID)
function $class(id, newClass)
{
	//Set if value passed
	if (newClass)
	{
		$(id).className = newClass;
	}
	
	//Get
	return $(id).className;
}

//Connect an event handler to an element event, $(by ID)
function $eventHandler(id, event, handler)
{
	//Create a command as a string and evaluate it
	eval("$('" + id + "')." + event + " = " + handler + ";");
}

//Set focus on this element, $(by ID)
function $focus(id)
{
	$(id).focus();
}

//Set/get html content of an element, $(by ID)
function $html(id, newHtml)
{
	//Set if value passed
	if (newHtml)
	{
		$(id).innerHTML = newHtml;
	}
	
	//Get
	return $(id).innerHTML;
}

//Set the value of a page element's property, $(by ID)
function $property(id, property, newValue)
{
	//Create a command as a string and evaluate it
	eval("$('" + id + "')." + property + " = '" + newValue + "';");
}

//Set checked property of a radio button or checkbox, $(by ID)
function $checked(id, isChecked)
{
	//Set checked property of element
	$(id).checked = isChecked;	
}

//Get checked property of a radio button or checkbox, $(by ID)
function $isChecked(id)
{
//alert("$(" + id + ")");
	return ($(id).checked);
}

//Set/get element source, $(by ID)
function $src(id, newSrc)
{
	//Set if value passed
	if (newSrc)
	{
		$(id).src = newSrc;
	}
	
	//Get
	return 	$(id).src;
}

//Set the value of an element's style property, $(by ID)
function $style(id, property, newValue)
{
	//Create a command as a string and evaluate it
	eval("$('" + id + "').style." + property + " = '" + newValue + "';");
}

//Set/get an element's value (including form input fields), $(by ID)  
function $value(id, newValue)
{
//alert("$value(" + id + ", " + newValue + ")");
	//If value passed, set it as the current value
	if (newValue)
	{
		$(id).value = newValue;
	}

	// Either way, return the current value
	return $(id).value;
}

//Set element visibilty, $(by ID)
function $visibility(id, isVisible)
{
	//Set visibility of element
	$(id).style.visibility = (isVisible) ? "visible" : "hidden";
}

//Get element visibilty, $(by ID)
function $isVisible(id)
{
	return ($(id).style.visibility == "visible");
}
 

// Cookies! -----------------------------------------------
// Cookie creation, reading, and deleting functions 
// (from Head First JavaScript, page 118)
// --------------------------------------------------------

//Write a cookie
function writeCookie(name, value, days) 
{
	var expires = "";
			
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
			
	document.cookie = name + "=" + value + expires + "; path=/";
}

//Read a cookie		
function readCookie(name) 
{
	var searchName = name + "=";
	var cookies = document.cookie.split(';');
	
	for (var i=0; i < cookies.length; i++) {
		var c = cookies[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1, c.length);
		}

		if (c.indexOf(searchName) == 0) {
			return c.substring(searchName.length, c.length);
		}
	}

	return null;
}

//Erase a cookie		
function eraseCookie(name) 
{
	writeCookie(name, "", -1);
}

// Dates! -------------------------------------------------
// General date manipulation routines.
// --------------------------------------------------------

//Get current date in a nice format
function getNiceDate()
{
	var myDate = new Date();

	//Format the date in to something usable
	var myDay = myDate.getDate();
	var myMonth = myDate.getMonth() + 1;
	var myYear = myDate.getFullYear();
	
	//Format nicely
	var myNiceDate = myMonth + "/" + myDay + "/" + myYear;		
	
	//Return the result
	return myNiceDate;
}

// Forms!- ------------------------------------------------
// Simple wrappers for manipulating form input fields by ID.
// Most especially that problematic radio button (shudder).
// --------------------------------------------------------

//Return a zero-based index of the selected radio button, if any
//(return -1 if none).
function getCheckedRadioButtonIndex(form, group) 
{
	//Local variables
	var value = "";
	var index = -1;
	
	//Retrieve count of buttons in this group
	var count = getRadioButtonCount(form, group);

	//Iterate buttons and find the chosen one
	for (var i = 0; i < count; i++) 
	{
		if (isRadioButtonChecked(form, group, i))
		{
			//Save that index
			index = i;
		}
	}
	
	//Return result
	return index;
}

//Retrieve the number of radio buttons in this group
function getRadioButtonCount(form, group)
{
	//Retrieve count of buttons in group
	return eval("document." + form + "." + group + ".length");
}

//Return a radio button's id
function getRadioButtonId(form, group, index)
{
	//Retrieve the value of the selected radio button
	return eval("document." + form + "." + group + "[" + index + "].id");
}

//Return a radio button's value
function getRadioButtonValue(form, group, index)
{
	//Retrieve the value of the selected radio button
	return eval("document." + form + "." + group + "[" + index + "].value");
}

//Return whether a radio button has been checked
function isRadioButtonChecked(form, group, index)
{
	//Retrieve the checked property of a given radio button
	return eval("document." + form + "." + group + "[" + index + "].checked");
}

//Set a radio button's style
/* Usage: 	Radio buttons must be nested in a label, as it acts on the 
			parent node (the label) to effect the text in the label. 
			It should look like this:
				<label>
					<input type="radio" name="buttonName" value="my value" />
					Some text to go with the button
				</label>
*/
function setRadioButtonStyle(form, group, index, style, value)
{
	//Set the style of the selected radio button label
	eval("document." + form + "." + group + "[" + index + "].parentNode.style." + style + " = '" + value + "';");
}

//Set a given style for all radio buttons in this group
// (good for clearing an old style)
function setAllRadioButtonStyles(form, group, style, value)
{
	//Retrieve count of buttons in this group
	var count = getRadioButtonCount(form, group);

	//For each button
	for (var i = 0; i < count; i++) 
	{
		//Set the style
		setRadioButtonStyle(form, group, i, style, value);
	}
}



// Math! --------------------------------------------------
// Functions and wrappers that do stuff with numbers.
// --------------------------------------------------------

//Return a random number between "min" and "max" values.
// (Src: Debra Carino, CS133S (CCC), Javascript instructor)
function randomNumber(min, max) 
{
	//Generate a random integer between two end points
	return Math.floor(Math.random() * (max - min + 1)) + min;
}


