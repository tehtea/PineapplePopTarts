-------------------------------------------------------------
-- CZ3003 GROUP SSP1 
-- PineapplePoptarts
-- SOFTWARE LAB 3 
-- DATABASE SCHEMA: CONSOLIDATED TRIGGER FOR RESPECTIVE TABLES 
-------------------------------------------------------------

/* trigger for accountTbl */
-- ASSUMING username and sessionKey CANNOT be changed

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
