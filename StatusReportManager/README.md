# Status Report Manager
Backend component to automatically generate and send a status summary report email to the Prime Minister's Office every 30 minutes.  

## Javascript Code
#### reportTransmitter
* Creates an SMTP transport with parameters of the email server being used as well as the login credentials of the sender's email account
* Creates a cron schedule that runs every 30 minutes to send an email to the Prime Minister's Office with the status summary report as a Microsoft Word Document attachment.  

#### reportGenerator
* Creates a Microsoft Word Document every 30 minutes which consolidates all new and unresolved incidents, key trends, and key indicators for the past 30 minutes.
 
#### keyIncidentFetcher
* Fetches a list of any new and/or unresolved incidents in the past 30 minutes from the CallCenterOperatorInterface component.
 
#### apiDataFetcher
* Fetches a list of all key indicators in the past 30 minutes from the CrisisMap component and identify any trends.

#### dateTime
* Gets the current date and time
* Gets the date and time 30 minutes ago
