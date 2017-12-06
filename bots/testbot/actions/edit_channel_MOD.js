module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Edit channel",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Mods by Lasse",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	const names = ['Same Channel', 'Mentioned Channel', 'Default Channel', 'Temp Variable', 'Server Variable', 'Global Variable'];
	const index = parseInt(data.storage);
	return index < 3 ? `${names[index]}` : `${names[index]} - ${data.varName}`;
},



//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["storage", "varName", "toChange", "newState"],

//---------------------------------------------------------------------
// Command HTML
//
// This function returns a string containing the HTML used for
// editting actions.
//
// The "isEvent" parameter will be true if this action is being used
// for an event. Due to their nature, events lack certain information,
// so edit the HTML to reflect this.
//
// The "data" parameter stores constants for select elements to use.
// Each is an array: index 0 for commands, index 1 for events.
// The names are: sendTargets, members, roles, channels,
//                messages, servers, variables
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
<div>
	<div style="float: left; width: 35%;">
		Source Channel:<br>
		<select id="storage" class="round" onchange="glob.channelChange(this, 'varNameContainer')">
			${data.channels[isEvent ? 1 : 0]}
		</select>
	</div>
	<div id="varNameContainer" style="display: none; float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text" list="variableList"><br>
	</div>
</div><br><br><br>
<div style="float: left; width: 80%;">
	Change:<br>
	<select id="toChange" class="round">
		<option value="name">Name</option>
		<option value="topic">Topic</option>
                <option value="position">Position</option>
                <option value="bitrate">Bitrate</option>
                <option value="userLimit">User Limit</option
	</select>
</div>
	<div style="float: left; width: 55%;">
		Change To:<br>
		<input id="newState" class="round" type="text"><br>
	</div>
	<div style="float: left; width: 55%;">
		Reason for Audit Log:<br>
		<input id="reason" class="round" type="text" placeholder="Not working ATM! Leave blank for none!"><br>
	</div>
</div>`
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
	const {glob, document} = this;

	glob.channelChange(document.getElementById('storage'), 'varNameContainer');
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter,
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

//action: function(cache) {
//	const data = cache.actions[cache.index];
//	const server = cache.server;
//	if(!server) {
//		this.callNextAction(cache);
//		return;
//	}
//	const storage = parseInt(data.storage);
//	const varName = this.evalMessage(data.varName, cache);
//	const channel = this.getChannel(storage, varName, cache);
//	const options = {};
//	options[data.permission] = Boolean(data.state === "0");
//	if(Array.isArray(channel)) {
//		this.callListFunc(channel, 'edit', [server.id, options]).then(function() {
//			this.callNextAction(cache);
//		}.bind(this));
//	} else if(channel && channel.edit) {
//		channel.edit(data.toChange, data.newState).then(function() {
//			this.callNextAction(cache);
//		}.bind(this)).catch(this.displayError.bind(this, data, cache));
//	} else {
//		this.callNextAction(cache);
//	}
//},

action: function(cache) {
	const data = cache.actions[cache.index];
	const storage = parseInt(data.storage);
	const varName = this.evalMessage(data.VarName, cache);
	const channel = this.getChannel(storage, varName, cache);
	const toChange = parseInt(data.toChange);
	const newState = parseInt(data.newState);
	const reason = parseInt(data.reason);
	//channel.edit({topic: this.evalMessage(data.newState)});
	//this.callNextAction(cache);
	if(data.toChange === "topic") {
		channel.edit({topic: this.evalMessage(data.newState)});
	}
	if(data.toChange === "name") {
		channel.edit({name: this.evalMessage(data.newState)});
	}
	if(data.toChange === "position") {
		channel.edit({position: this.evalMessage(data.newState)});
	}
	if(data.toChange === "bitrate") {
		channel.edit({bitrate: this.evalMessage(data.newState)});
	}
	if(data.toChange === "userLimit") {
		channel.edit({userLimit: this.evalMessage(data.newState)});
	}
	this.callNextAction(cache);
},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {
}

}; // End of module