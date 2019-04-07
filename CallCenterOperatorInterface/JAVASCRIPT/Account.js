/**
 * Account entity class
 */
class Account{
	/**
	 * Account constructor
	 * @param {string} username the account's username 
	 * @param {string} password the account's password
	 */
	 constructor(username,password) {
		this.username = username;
		this.password = password;
		this.sessionKey;
	 }
	 
	/**
	 * Set account's username
	 * @param {string} _username The new username
	 */
	setUsername(_username) {
		this.username = _username;
	}
	/**
	 * Set account's password
	 * @param {string} _password The new password
	 */
	setPassword(_password) {
		this.password = _password;
	}
	/**
	 * Set account's sessionKey
	 * @param {string} _sessionKey The new session key
	 */
	setSessionKey(_sessionKey) {
		this.sessionKey = _sessionKey;
	}
	
	/**
	 * Get account's username
	 * @returns {string} the account's username
	 */
	getUsername() {
		return username;
	}
	/**
	 * Get account's paasword
	 * @returns {string} the account's password
	 */
	getPassword() {
		return password;
	}
	/**
	 * Get account's sessionKey
	 * @returns {string} the account's session key
	 */
	getSessionKey() {
		return sessionKey;  
	}
}
