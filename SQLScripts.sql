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

--Step 4: During demo to generate sensor readings, please call stored procedure above with example syntax given at the begining of the procedure.
