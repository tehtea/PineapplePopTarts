/**
 * Date Time formatter class
 */
module.exports = {
	/**
	 * Get the current time in a string format
	 * @returns {string} the current time
	 */
    getDateTimeNow: function() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + "/" + month + "/" + year + ", " + hour + ":" + min;
    },

	/**
	 * Get the time 30 minutes before the current time in a string format
	 * @returns {string} the time
	 */
    getDateTime30MinAgo: function() {

        var date = new Date();
        const MS_PER_MINUTE = 60000;
        var pastDate = new Date(date - (30 * MS_PER_MINUTE));

        var hour = pastDate.getHours();
        hour = (hour < 10 ? "0" : "") + hour;
    
        var min  = pastDate.getMinutes();
        min = (min < 10 ? "0" : "") + min;
    
        var year = pastDate.getFullYear();
    
        var month = pastDate.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
    
        var day  = pastDate.getDate();
        day = (day < 10 ? "0" : "") + day;
        
        return day + "/" + month + "/" + year + ", " + hour + ":" + min;
        }
}