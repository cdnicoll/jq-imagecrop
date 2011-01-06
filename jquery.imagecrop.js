/*
Copyright (c) 2010 Cody Nicoll (http://www.cnicollonline.com)
Licensed under the MIT License:
    http://www.opensource.org/licenses/mit-license.php

@author:    cNicoll
@email:     cdnicoll[@]gmail.com
@name:	    jquery.imagecrop.js
@date:      02-10-10_11-22

RELEASE NOTES:
==========================================================================================
@version 1.2 | 03-03-10_15-37
    * incorporated the jquery.metadata.js to take advantage of using meta data options on the site
    ~~~~~~~~~~~~~~~~~~~~ DEMO ~~~~~~~~~~~~~~~~~~~~
    // call the plugin
    $('.crop_3').imageCrop(); // calling the function can now be called without paramerters.
    ...
    <!-- in the html -->
    <img src="images/01.jpg" class="crop_3 {cropWidth: 125, cropHeight:125}"  />
    <img src="images/02.jpg" class="crop_3 {cropWidth: 250, cropHeight:100}"  />
    ~~~~~~~~~~~~~~~~~~ END DEMO ~~~~~~~~~~~~~~~~~~
    
@version 1.1 | 02-24-10_11-12
    *   Fixed an issue that didn't allow for more than one set of cropped images at
        different sizes on the same page.
    *   Allowed public access to default plugin settings:
            ~~~~~~~~~~~~~~~~~~~~ DEMO ~~~~~~~~~~~~~~~~~~~~
            $.fn.imageCrop.defaults.cropWidth = '100';
            $.fn.imageCrop.defaults.cropHeight = '100';
            $('.crop').imageCrop(); // calling the function can now be called without paramerters.
            ~~~~~~~~~~~~~~~~~~ END DEMO ~~~~~~~~~~~~~~~~~~

@version 1.0 | 02-10-10_11-22
    *   This plugin finds the center of an image and crops it to the specified size.
    *   There are (3) options that can be overridden
            - cropWidth     [default: '75']
            - cropHeight    [default: '75']
            - borderColour  [default: '#4c4c4c']
    *   Currently only images can be cropped.
    *   To use simply include the script and call on it:

        ~~~~~~~~~~~~~~~~~~~~ DEMO ~~~~~~~~~~~~~~~~~~~~
        <html>
            <head>
                <title>demo</title>
                <!-- INCLUDE jQUERY -->
                <!-- INCLUDE jquery.imagecrop.js -->
            
                <script type="text/javascript" charset="utf-8">
                    var jQ = jQuery.noConflict();
                    jQ(document).ready(function()
                    {
                        jQ('.crop').imageCrop();
                    });
                </script>
            </head>
            <body>
                <img src="images/00.jpg" class="crop" />
                <!-- or -->
                <li class="crop"><img src="images/01.jpg" /></li>
            </body>
        </html>
        ~~~~~~~~~~~~~~~~~~ END DEMO ~~~~~~~~~~~~~~~~~~


KNOWN ISSUES:
==========================================================================================
@version 1.0
    [x] 02-24-10_12-09 * When the images are first loaded they sometimes do not center. There
                        needs to be a solution in that they all move into position before they
                        are drawn onto the page.
                        -------------- 03-10-10_14-04 --------------
                        This has been addressed and fixed. The <img> tag _MUST_ have a width and height
                        defiend. This can be done dynamically using PHP.

*/
(function($){  
    
          //This is where you write your plugin's name  
          $.fn.imageCrop = function(options) {
            
            // This allows the user to override options.
            // $.fn.imageCrop.defaults.cropWidth = '100';
            // $.fn.imageCrop.defaults.cropHeight = '100';
            // calling the function can now be called without paramerters
            //      $('.crop').imageCrop();
            var opts = $.extend({}, $.fn.imageCrop.defaults, options);
            
            //Iterate over the current set of matched elements  
            return this.each(function() {  
               obj = $(this);
               //console.log(obj);
               //console.log($.metadata);
                
                // if metadata is present, extend main_opts, otherwise just use main_opts
                var o = $.metadata ? $.extend({}, opts, obj.metadata()) : opts;
                
                 
                                
                var imgWidth = $.fn.imageCrop.getWidth(obj);
    			var imgHeight = $.fn.imageCrop.getHeight(obj);
    			var moveX = (imgWidth / 2) - (o.cropWidth / 2);
    			var moveY = (imgHeight / 2) - (o.cropHeight / 2);

    		    obj.wrap('<div class="crop_holder">');
                                
                // access the objects parent crop holder (we dont want to alter ALL .crop_holder)
    		    $(obj).parent().css({
    		        'width'         :   o.cropWidth+'px',
    		        'height'        :   o.cropHeight+'px',
    		        'overflow'      :   'hidden',
    		        'border-style'  :   o.borderStyle,
    		        'border-width'  :   o.borderWidth+'px',
    		        'border-color'  :   o.borderColour
    		    });
    		    

            	obj.ready(function() {
                    if (imgWidth >= o.cropWidth) {
        		    	obj.css("margin-left", -moveX);
        		    }
        		    if (imgHeight >= o.cropHeight) {
                		obj.css("margin-top", -moveY);
                	}
                })
    		    
    		    if (window.console && window.console.log) {
                    // console.log(obj.clientWidth)
                    // console.log(imgWidth + "x" + imgHeight);
                    // console.log("moveX = " + moveX);
                    // console.log("moveY = " + moveY);
                    // console.log("options.cropWidth " + o.cropWidth);
                    // console.log("options.cropHeight " + o.cropHeight);
    		    }
    		        		    
            }); // close the return
        }  // close the panelGroup function
    
    // ====================================================================================================
    // PRIVATE FUNCTIONS
    // ====================================================================================================
    
    // @param image object
    // @return image width
    $.fn.imageCrop.getWidth = function($img) {
    	//console.log($img.width)
    	console.log($img[0].clientWidth);
    	return $img[0].clientWidth;
    };

    // @param image object
    // @return image height
     $.fn.imageCrop.getHeight = function($img) {
    	return $img[0].clientHeight;
    };
    
    $.fn.imageCrop.defaults = {
        cropWidth:      '75',
        cropHeight:     '75',
        borderColour:   '#4c4c4c',
        borderWidth:    '1',
        borderStyle:    'solid'
    }
     
//pass jQuery to the function,   
//So that we will able to use any valid Javascript variable name   
//to replace "$" SIGN. But, we'll stick to $ (I like dollar sign: ) )         
})(jQuery); // close the function wrapper