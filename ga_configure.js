/*
 wot.js
 Copyright © 2009 - 2012  WOT Services Oy <info@mywot.com>

 This file is part of WOT.

 WOT is free software: you can redistribute it and/or modify it
 under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 WOT is distributed in the hope that it will be useful, but WITHOUT
 ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public
 License for more details.

 You should have received a copy of the GNU General Public License
 along with WOT. If not, see <http://www.gnu.org/licenses/>.
 */


// this script must be placed right after wot.js
// it is separated from html to conform strict content policy

var _gaq = _gaq || [];
_gaq.push(['_setAccount', wot.ga_id]);
_gaq.push(['_trackPageview']);


/* This adds logic for counting events to wot object */

$.extend(wot, { ga: {

	disable: false, // general switcher to stop counting stats
	_tracker: null,

	categories: {
		WS: "WarningScreen",
		RW: "RatingWindow",
		GEN: "General",
		INJ: "Injections"
	},

	actions: {
		RW_TESTIMONY:   "RW_testimony",
		RW_BTN_CLOSE:   "RW_btn_close",
		RW_MSG_CLICKED: "RW_msg_clicked",
		WS_SHOW:        "WS_shown",
		WS_BTN_ENTER:   "WS_btn_enter",
		WS_BTN_CLOSE:   "WS_btn_close",
		D_POPUP_SHOWN:  "D_popup_shown",
		GEN_INSTALLED:  "WOT_installed"
	},

	init_tracker: function() {
		if(!wot.ga._tracker) {
			if(_gat) {
				try {
					wot.ga._tracker = _gat.getTrackerByName();
					wot.ga._tracker._setAccount(wot.ga_id);
				} catch (e) {
					// failed. No Problem.
				}
			}
		}

		return !!wot.ga._tracker;
	},

	fire_event: function(category, action, label) {

		if(wot.ga.disable) return;

		try {
			if( wot.ga.init_tracker() ) {
				wot.ga._tracker._trackEvent(category, action, label);
			} else {
				// backup option, if AsyncTracker still isn't inited
				_gaq.push(['_trackEvent', category, action, label]);
			}
		} catch (e){
			// silence...
			//console.log("Error in wot.ga.fire_event(). Msg: ", e);
		}
	}

}});
