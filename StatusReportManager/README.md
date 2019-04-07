# Status Report Manager
Backend component to automatically generate and send a status summary report email to the Prime Minister's Office every 30 minutes.  

## Javascript Code
#### statusReportManager
* Creates a cron schedule that runs every 30 minutes to send an email to the Prime Minister's Office with the status summary report as a Microsoft Word Document attachment.  

#### reportTransmitter
* Creates an SMTP transport with parameters of the email server being used as well as the login credentials of the sender's email account.

#### reportGenerator
* Creates a Microsoft Word Document every 30 minutes which consolidates all new incidents, updated incidents, change of respondent types, key trends, and key indicators for the past 30 minutes.
 
#### keyIncidentFetcher
* Fetches a list of any new incidents, updated incidents, as well as change in respondent types in the past 30 minutes from the database via DBManager.
* Acts as a client to receive data from DBManager 
 
#### apiDataFetcher
* Fetches a list of all key indicators in the past 30 minutes from the CrisisMap component and identify any trends.

#### dateTime
* Gets the current date and time
* Gets the date and time 30 minutes ago

#### DBManager
* Acts as a server to pull data from the database
* Waits for 'srRequest' before sending the data to the client (keyIncidentFetcher)

#### DBRetriever
* Contains the configuration and credentials of the database as well as all SQL queries
* Retrieves all new incidents
* Retrieves all updated incidents
* Retrieves all change of respondent type

#### NewIncident
* Class for a New Incident object
* Constructor with 9 arguments to create a newIncident object
* Constructor converts insert time into string in the form YYYY-MM-DD, HH:MM:SS
* Constructor converts resolved flag from boolean true/false to string "Yes"/"No"
* Getters and Setters

#### UpdatedIncident
* Class for a Updated Incident object
* Constructor with 6 arguments to create an updatdedIncident object
* Constructor converts update time into string in the form YYYY-MM-DD, HH:MM:SS
* Constructor reads description for [RESOLVED] tag. If present, remove the tag from description and set resolved string to "Yes", else set resolved string to "No".
* Getters and Setters

#### ChangeRespondent
* Class for a Change Respondent object
* Constructor with 3 arguments to create a changeRespondent object
* Constructor converts insert time into string in the form YYYY-MM-DD, HH:MM:SS
* Getters and Setters