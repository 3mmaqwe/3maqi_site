to run local server run following command: 

1. cd src
2. python -m http.server 8000


to update footer, header, and sidebar run the following script:

1. make sure that files are closed.
2. run this command: 

    .\update-components.ps1


to compress images run this:
./compress.ps1

this will make image files a bit smaller


 i change it so that i can still change footer, and header, and sidebar in once place but
 now its done by replace the text via scripting (powershell), as dynamically loading the html was causing flashing issues.

I added a submodule called Phaser so i can start making web games. Maybe if i really fall in love with one site ill just move it over to its own page
but for now ill just have live here. I also made a backup of my site without the submodule

More about submodules here: https://git-scm.com/book/en/v2/Git-Tools-Submodules


if css isnt updating on localhost server: 

1. Force Browser Refresh

Perform a hard refresh to bypass the browser cache:

Windows/Linux: Press Ctrl + F5 or Ctrl + Shift + R.

to view localhost site on mobile: 10.0.0.11:8000
[how to view site on mobile](https://www.geeksforgeeks.org/techtips/access-localhost-on-mobile-browsers/)

Cool resource sites:
[icons8.com](https://icons8.com/icons)
this sites has alot of cool and free icons to choose from :D 
[minecraft.wiki](https://minecraft.wik)
has alot of assets i use for my minecraft blog