Shine Coding Exercise


Using html, css, and javascript (any javascript libraries such as React, JQuery, etc can be used if desired), take the following list of eight images and lay them out on a single web page in a 2x4 grid (grid is 2 units wide).

(list of image assets)

On the same web page, perform these two different tasks with image clicks:

Handle click events on the <img> elements so you can keep track of the order in which the items were clicked.  Each <img> element should only allow a single click to specify its order. Save the order of the images to local storage and then read the order of the images back from local storage on page load. Use the stored order on page load (if set) to set the initial order of the images; otherwise use the previous ordering. All images should be shown on page load/load regardless of how many images were clicked previously.
Count image clicks on each image and sort the click counts so that the images with the most click counts are listed in descending order. Display or log this information
When you are done, identify the parts of this task were familiar/easy, and which were new or unfamiliar. Briefly discuss any coding decisions you made that you feel need further explanation.



Notes:
You can assume we are using the latest version of either Chrome (v71 or higher) or Firefox (v64 or higher) browsers for this exercise (ie. we do not need IE support).



Zip your solution files and email the zip bundle but make sure the zip is as small as possible - exclude any npm_modules and .git subdirectories and ensure your submission includes build instructions if needed.


------------------------------------------------------------------------------------------------------------------------------

Questions:

What parts of this task were familiar/easy?

I would say that general usage of jQuery/DOM traversal, SASS styling, image grid placement, array iteration and localStorage use were easy. I'm familiar with pushing and splicing on arrays, as well as programmatically manipulating front-end elements. Making sure that elements were reasonably mobile friendly was simple, although I could have gone into even deeper detail for a project.



What parts of this task were new/unfamiliar

Although I knew about its overall purpose, I had not used localStorage before as my previous projects typically relied on a database, and user profile or layout changes would be stored as user configs. Other information such as log in state were handled via php SESSION.



Were there any coding decisions you feel need further explanation?

I tried to make the UX as smooth as possible so there are alerts/confirms when Image Order is to be reset and saved. I also started by simply writing out steps and iteration/tuning those until I got the finished product. Most comments have been preserved so you can have an idea of the thought process behind my work.
