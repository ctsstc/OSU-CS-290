# Assignment 2 - HTML/CSS

This week you will be making a simple web page. You will submit a .zip file to Canvas which contains exactly two files: content.html and style.css. Content.html will have all of the html content and will link to the style.css style-sheet.

## In this web page, you should do the following

1. Create a 6x6 table (inclusive of the header row) and fill in the table with your own contents.
   - The upper left cell should be empty. The others should be non-empty.
   - The table should have a caption detailing the contents of the table.
   - The table should have a header section, all the cells in this section should have bold text (this is default).
   - The first column of the table should have header cells that have italic text (these should not be bold).
   - The table should have a footer section (this row is not counted in 6 rows in the table) made up of two cells, one should be 2 columns wide, the other should be 4 columns wide.

2. Create a list (ul, ol or dl) with at least 3 entries.

3. Create a div that is aligned to the left side of the page and takes up 3/4 of the page width, has a space of 20px between it and the previous element and has a class of 'outer-content'.
   - Its background should be pink (or any color that looks like pink).
   - Inside that div have another div called 'inner-content'.
      - Its background should be blue (any kind of blue works).
      - It should take up 3/4 of the parent divs width and should be centered.
   
4. Create two forms. One should submit via a post, the other via a get, they should have identical content.
   - They should submit to http://classes.engr.oregonstate.edu/eecs/winter2015/cs290-400/tools/class-content/form_tests/check_request.php to better facilitate testing.
   - There should be 4 input types
      - A text input with a name attribute of 'text_input'
      - A number input with a name attribute of 'numerical_input'
      - A password input with a name attribute of 'password_input'
      - A set of radio inputs
         - They should be named 'candy'
         - These options should exist in this order
            - Snickers
            - Skittles
            - Mentos

## Extra credit

Make the non-header rows alternate colors. To accomplish this you will need to use a pseudo-class called:nth-of-type()

Here is a picture of a site meeting the requirements (NOTE: There is a 2nd, identical form below the GET form that was cut off. It is the same in every way except it submits via POST instead of GET):

![EC Image](extra-credit-image.png)