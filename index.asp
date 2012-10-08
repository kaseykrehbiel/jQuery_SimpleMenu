<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=8" />
      <link rel="stylesheet" type="text/css" href="css/jquery.simpleMenu.css" />
      <link rel="stylesheet" type="text/css" href="css/jquery-ui-1.8.10.custom.css" />
      <script type="text/javascript" src="scripts/jquery.js"></script>
      <script type="text/javascript" src="scripts/jquery.simpleMenu.js"></script>
      <script type="text/javascript" src="scripts/jquery-ui-1.8.10.custom.min.js"></script>
      <script type="text/javascript">
         $(document).ready(function() {
            $('#container').simpleMenu({
               source: "/menu/includes/jquery.simpleMenu.asp",
               clickToOpen: false,
               type: 'horizontal',
               closeTimeout: 750,
               slideDuration: 500
            });
         });
      </script>
      <title>SimpleMenu Test</title>
   </head>
   <body>
      <h1>Simple Menu</h1>
      <div id="container"></div>
   </body>
</html>