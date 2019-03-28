// Entity Class - Account
class Account{
	// Constructor
	 constructor(username,password) {
		this.username = username;
		this.password = password;
		this.sessionKey;
	 }
	 
	// Mutator
	setUsername(_username) {
		this.username = _username;
	}
	setPassword(_password) {
		this.password = _password;
	}
	setSessionKey(_sessionKey) {
		this.sessionKey = _sessionKey;
	}
	
	// Accessor
	getUsername() {
		return username;
	}
	getPassword() {
		return password;
	}
	getSessionKey() {
		return sessionKey;  
	}
}
