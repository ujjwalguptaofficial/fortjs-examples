# xml in body

This is an example of fortjs to configure xml parser and accept xml data as body.

The example uses library "xml2js" but you are feel free to use any thing.

## important 

* xml-parser.js - this contains a xml parser class which is passed to fortjs app configuration.
* app.js - parser from `xml-parser.js` is passed as configutation. 

So whenever there will be an xml data in body, fortjs will call the parser & data returned from parser is set as body.

# Example request

<img src="static/Screenshot%20from%202020-05-16%2019-56-32.png"/>

# How to use

*  Clone or download the repo
*  Open the folder location in a command prompt
*  run command - `npm install`
*  run command - `npm run start`