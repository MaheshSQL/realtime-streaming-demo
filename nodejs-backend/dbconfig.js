const  config = {
    user:  'sa', // sql user or UPDATE
    password:  '<UPDATE ME>', //UPDATE SQL USER PWD
    server:  '<UPDATE WITH IP ADDRESS>', // IP ADDRESS OF SQL SERVER
    database:  'TestDB', //UPDATE DB NAME
    options: {
      trustedconnection:  true,
      enableArithAbort:  true//,
    //   instancename:  'SQLEXPRESS'  // SQL Server instance name
    },
    port:  1401 //UPDATE PORT
  }
  
  module.exports = config;