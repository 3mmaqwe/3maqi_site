to run local server run following command: 

1. cd src
2. python -m http.server 8000


to update footer, header, and sidebar run the following script:

1. make sure that files are closed.
2. run this command: 

    .\update-components.ps1


 i change it so that i can still change footer, and header, and sidebar in once place but
 now its done by replace the text via scripting (powershell), as dynamically loading the html was causing flashing issues.

