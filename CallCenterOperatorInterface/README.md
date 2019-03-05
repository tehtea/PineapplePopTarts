# Call Center Operator Interface
Frontend of the website for call center operators. Inclusive of login and report submission for new and updating incident. 

## HTML Code 
* AccountView - Display user's account information and enables user to log out
* FormView - Display form to submit new incident report
* HomeView - Display the main page of the website
* InformationView - Display useful information (emergency contact) 
* LoginView - For call center operators to login to their account
* SuccessfulLogoutView - Display that logout was successful
* SuccessfulNewView - Display that submission of new incident report was successful
* SuccessfulUpdateView - Display that submission of update incident report was successful
* UpdateFormView - Display form to submit updates on incident report

## CSS Code
* Account - Formatting for AccountView
* Form - Formatting for FormView and UpdateFormView
* Header - For all HTML to format the header
* Home - Formatting for HomeView
* Information - Formatting for InformationView
* Login - Formatting for LoginView
* Successful - Formatting for SuccessfulLogoutView, SuccessfulUpdateView and SuccessfulLogoutView

## Javascript Code
#### AccountRenderer
* Logout user (Remove sessionkey)
* Display username based on sessionKey in local storage
#### ContentValidation
* Prevent unauthorised users from accessing some of the pages
#### FormRenderer
* Enable that the form must be filled in the correct format when submitted
* Generate form into a JSON format for database storage
* Generate a form ID for call center to make updates
#### LoginRenderer
* Compare username and pw to database
* Login user (Store sessionkey)
#### UpdateFormRenderer
* Retrieve information on incident using sessionkey
* Enable that the form must be filled in the correct format when submitted
* Generate form into a JSON format for database storage
