# Call Center Operator Interface
Frontend of the website for call center operators. Inclusive of login and report submission for new and updating incident. 

## HTML Code 
* AccountView - Display user's account information and enables user to log out
* FormView - Display form to submit new incident report
* HomeView - Display the main page of the website
* InformationView - Display useful information (emergency contact) 
* LoginView - For call center operators to login to their account
* UpdateFormView - Display form to submit updates on incident report

## CSS Code
* Account - Formatting for AccountView
* Form - Formatting for FormView and UpdateFormView
* Header - For all HTML to format the header
* Home - Formatting for HomeView
* Information - Formatting for InformationView
* Login - Formatting for LoginView
* Successful - Formatting for SuccessfulLogout, SuccessfulUpdate and SuccessfulLogout

## Javascript Code

#### Entity Classes
* Account
* NewIncident
* UpdateIncident

#### AccountRenderer
* Logout user (Remove sessionkey)
* Display username based on sessionKey in local storage

#### ContentValidation
* Prevent unauthorised users from accessing some of the pages

#### FormRenderer, FormManager
* Enable that the form must be filled in the correct format when submitted
* Generate form into a JSON format for database storage
* Generate a form ID for call center to make updates

#### LoginRenderer
* Compare username and pw to database
* Login user (Store sessionkey)

#### UpdateFormRenderer
* Retrieve information on incident
* Enable that the form must be filled in the correct format when submitted
* Generate form into a JSON format for database storage

#### CallCenterOperatorFacade
* Act as the connect line for the call center operator to the database and other subsystems

#### DatabaseManager, DatabaseRetriever
* Retrieve information from the subsystem 
* Parse information to other subsystems

#### AccountDetailsRenderer
* JS File for the account information webpage

## Pre-requisite
#### Install the following with npm in the "Apps" folder:
* mssql
* socket.io
* express
#### Connect to the school vpn
#### Allow 3rd party cookies on web-browser 
#### Run DatabaseManager.js on a server or usign node.js
