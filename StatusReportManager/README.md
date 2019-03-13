# Status Report Manager
Backend component to automatically generate and send a status summary report email to the Prime Minister's Office every 30 minutes.  

## Javascript Code
#### report_transmitter
* Creates an SMTP transport with parameters of the email server being used as well as the login credentials of the sender's email account
* Creates a cron schedule that runs every 30 minutes to send an email to the Prime Minister's Office with the status summary report as a Microsoft Word Document attachment.  

#### report_generator
* Creates a Microsoft Word Document every 30 minutes which consolidates all new and unresolved incidents, key trends, and key indicators for the past 30 minutes.
 
#### key_incident_fetcher
* Fetches a list of any new and/or unresolved incidents in the past 30 minutes from the CallCenterOperatorInterface component.
 
#### api_data_fetcher
* Fetches a list of all key indicators in the past 30 minutes from the CrisisMap component and identify any trends.
