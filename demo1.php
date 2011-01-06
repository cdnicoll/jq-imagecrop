<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
	    <!-- ==== CREATED ON 02-10-10_09-04 ==== -->
		<title>jQuery Image Crop Plugin</title>

		<!-- ZERO OUT CSS -->
		<link rel="stylesheet" type="text/css" href="http://localhost/_common_libraries/zeroOut.css">

		<!-- CORE jQUERY LIBRARIES -->
		<script type="text/javascript" src="http://localhost/_common_libraries/jquery.js"></script>
        <script type="text/javascript" src="jquery.imagecrop.js"></script>
        <script type="text/javascript" src="jquery.metadata.js"></script>
        
        
        <script type="text/javascript" charset="utf-8">
            $(document).ready(function()
            {
                $('.crop').imageCrop();

                // === OR ===

                $.fn.imageCrop.defaults.cropWidth = '100';
                $.fn.imageCrop.defaults.cropHeight = '100';
                $('.crop_2').imageCrop();
                
                // === OR ===
                $('.crop_3').imageCrop();
            });
        </script>

        <!-- ===== CSS ===== -->
        <style type="text/css">
            /* start css */
            ul li {display: inline; margin: 10px; float: left;}
            #clear {clear: both;}
        </style>
	</head>
	<body>

        <?php
        // get a list of images
        // put them into an array
        // get their size
        // loop through them and output the src, width, height.
        
        $dir = "images/";       // The folder you want to look in   
        $imgArray = array();    // container for the images;
        
        // check if the directory exists
        if (is_dir($dir)) {
            // open that directory
            if ($dh = opendir($dir)) {
                // while there are files within the folder
                 $c = 0;
                 while (($file = readdir($dh)) !== false) {
                    // remove the "hidden" files
                    if (strpos($file,".",1) && $file != "..") {
                         $imgArray[$c]['name'] = $dir.$file;
                         $imgArray[$c]['info'] = getimagesize($dir.$file);
                         $c++;
                    } // close hidden file search
                 } // close while loop
             } // close open dir
             
             
        } // close is dir
        ?>


         <ul>
            <?php 
             foreach ($imgArray as $img) {
                 echo "<li><img src='".$img['name']."'".$img['info'][3]." class='crop' /></li>";
             }
             ?>
        <ul>
        
        <!-- ================================================================ -->
        <div id="clear"></div><br><hr><br>
        <!-- ================================================================ -->
        
        <ul>
            <?php 
             foreach ($imgArray as $img) {
                 echo "<li><img src='".$img['name']."'".$img['info'][3]." class='crop_2' /></li>";
             }
             ?>
        <ul>
         
        <!-- ================================================================ -->
        <div id="clear"></div><br><hr><br>
        <!-- ================================================================ -->

        <!--
        Showing how you can use {cropWidth: 125, cropHeight:125} to override the default settings.
        Note that im looping through the array my manually incrementing. This could also be done with a
        if statement if you were to be looping through it. I wanted to show how overriding here worked, so a
        loop would defeat the purpose of this example.
        -->
        <ul>
            <?php
             echo "<li><img src='".$imgArray[0]['name']."'".$imgArray[0]['info'][3]."  class='crop_3 {cropWidth: 125, cropHeight:125}' /></li>";
             echo "<li><img src='".$imgArray[1]['name']."'".$imgArray[1]['info'][3]."  class='crop_3 {cropWidth: 125, cropHeight:125}' /></li>";
             echo "<li><img src='".$imgArray[2]['name']."'".$imgArray[2]['info'][3]."  class='crop_3 {cropWidth: 250, cropHeight:100}' /></li>";
             echo "<li><img src='".$imgArray[3]['name']."'".$imgArray[3]['info'][3]."  class='crop_3 {cropWidth: 125, cropHeight:125}' /></li>";
             echo "<li><img src='".$imgArray[4]['name']."'".$imgArray[4]['info'][3]."  class='crop_3 {cropWidth: 125, cropHeight:125}' /></li>";
             echo "<li><img src='".$imgArray[5]['name']."'".$imgArray[5]['info'][3]."  class='crop_3 {cropWidth: 125, cropHeight:125}' /></li>";
             echo "<li><img src='".$imgArray[6]['name']."'".$imgArray[6]['info'][3]."  class='crop_3 {cropWidth: 125, cropHeight:125}' /></li>";
            ?>
        <ul>
    
        
	</body>
</html>