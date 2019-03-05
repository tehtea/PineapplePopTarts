-------------------------------------------------------------
-- CZ3003 GROUP SSP1 
-- PineapplePoptarts
-- SOFTWARE LAB 3 
-- DATABASE SCHEMA: CONSOLIDATED TRIGGER FOR RESPECTIVE TABLES 
-------------------------------------------------------------

/* trigger for accountTbl */
-- ASSUMING username and sessionKey will not be changed

CREATE TRIGGER upd_account_time on [accountTbl] after update
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	update accountTbl
	set upd_date = getdate()
	where accountTbl.username in 
	(select i.username from inserted i 
	inner join deleted d on i.username = d.username
	where i.password <> d.password)


END
GO



/* trigger for incidentTbl */
-- ASSUMPTION is that the only update that can be done on this table is updating of 'status' 
CREATE TRIGGER upd_incident_time on [incidentTbl] after update
AS 
BEGIN 
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	update incidentTbl
	set upd_date = getdate()
	where incidentTbl.recordID in
	(select i.recordID from inserted i
	inner join deleted d on i.recordId = d.recordId
	where i.status <> d.status)
END
GO


