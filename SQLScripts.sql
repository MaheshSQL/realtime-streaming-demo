--Step 1: Create a Database first or use existing database

--Step 2: Create below table
USE [TestDB]
GO

/****** Object:  Table [dbo].[SensorReadings]    Script Date: 28/01/2022 4:21:16 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SensorReadings](
	[SensorID] [varchar](50) NOT NULL,
	[InsertDateTime] [datetime2](7) NOT NULL,
	[Reading] [decimal](18, 10) NOT NULL
) ON [PRIMARY]
GO

--Step 3: Create stored procedure
/****** Object:  StoredProcedure [dbo].[InsertSensorReadings120]    Script Date: 28/01/2022 4:21:40 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--EXEC [dbo].[InsertSensorReadings120] @SensorID='S1', @Delay='00:00:01', @LowerReading = 0.002,@UpperReading = 0.009
--EXEC [dbo].[InsertSensorReadings120] @SensorID='S2', @Delay='00:00:04', @LowerReading = 0.02,@UpperReading = 0.05
ALTER PROCEDURE [dbo].[InsertSensorReadings120]
@SensorID VARCHAR(50) = 'S1',
@Delay VARCHAR(50) = '00:00:01',
@LowerReading DECIMAL(5,3) = 0.002,
@UpperReading DECIMAL(5,3) = 0.009
AS 

BEGIN

	DECLARE @i INT = 1

	WHILE (@i <= 120)
	 BEGIN
	  WAITFOR DELAY @Delay --How many seconds

		 INSERT INTO [dbo].[SensorReadings]
			   ([SensorID]
			   ,[InsertDateTime]
			   ,[Reading])
		 VALUES
			   (@SensorID
			   ,GETDATE()

			   --,RAND()*(0.009-0.002)+0.002
			   ,RAND()*(@UpperReading-@LowerReading)+@LowerReading
			   
			   )
		
		PRINT('Record added.')

	 SET  @i = @i + 1
	END 

END



--Step 4:
/****** Object:  StoredProcedure [dbo].[InsertSensorReadingsTooth120]    Script Date: 31/01/2022 3:24:04 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--EXEC [dbo].[InsertSensorReadingsTooth120] @SensorID='S1', @Delay='00:00:01'
--EXEC [dbo].[InsertSensorReadingsTooth120] @SensorID='S2', @Delay='00:00:04'
ALTER PROCEDURE [dbo].[InsertSensorReadingsTooth120]
@SensorID VARCHAR(50) = 'S1',
@Delay VARCHAR(50) = '00:00:01'
AS 

BEGIN

DECLARE @Value DECIMAL(18,10) = 0

-----------

	DECLARE db_cursor CURSOR FOR 
	SELECT Value FROM
	(
		SELECT 0 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 1.2 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 1.2 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 1.2 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 0 AS Value UNION ALL
		SELECT 1 AS Value UNION ALL
		SELECT 1 AS Value 
	) AS DataTable

	OPEN db_cursor  
	FETCH NEXT FROM db_cursor INTO @Value

	WHILE @@FETCH_STATUS = 0  
	BEGIN  

		 INSERT INTO [dbo].[SensorReadings]
			   ([SensorID]
			   ,[InsertDateTime]
			   ,[Reading])
		 VALUES
			   (@SensorID
			   ,GETDATE()
			   ,@Value			   
			   )	  

		  WAITFOR DELAY @Delay --How many seconds

		  FETCH NEXT FROM db_cursor INTO @Value
	END 

	CLOSE db_cursor  
	DEALLOCATE db_cursor 


END

--Step 5: During demo to generate sensor readings, please call any of the above stored procedures above, with example call syntax given at the begining of the procedure.