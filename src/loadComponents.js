

// Last modified date
const date = new Date(document.lastModified);
    document.getElementById("date").innerHTML += date.toDateString();

// Visitor counter
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var site_data = JSON.parse(this.responseText);
        var num_arr = site_data.info.views.toString().split("");
        var num_str = "";
        for (i = 0; i < num_arr.length; i++) {
            num_str += num_arr[i];
            if ( (num_arr.length-1 - i) % 3 == 0 && (num_arr.length-1 - i) != 0 ) {
                num_str += ",";
            }
            var date_str = site_data.info.last_updated;
            var date_obj = new Date(site_data.info.last_updated)
        }
       
        document.getElementById("hitcount").innerText = num_str;
       // document.getElementById("hitcount_big").innerHTML = num_str;
    }
};

xhttp.open("GET", "https://weirdscifi.ratiosemper.com/neocities.php?sitename=3maqi", true);
xhttp.send();
/// end of vistor code

//navigation bar code go here
var coll = document.getElementsByClassName("collapsible");
var nav;


for (nav = 0; nav < coll.length; nav++) {
coll[nav].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
        console.log("hello");
    content.style.display = "none";
    } else {
    content.style.display = "block";
    }
});
}

                    /// end of nav bar code
  //watecolor gallery
  document.querySelectorAll('.watercolor, .isda').forEach(img => {
  img.addEventListener('click', function() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.8)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = 10000;
    overlay.addEventListener('click', () => document.body.removeChild(overlay));

    // Create large image
    const bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.style.maxWidth = '90vw';
    bigImg.style.maxHeight = '90vh';
    bigImg.style.borderRadius = '10px';
    bigImg.style.boxShadow = '0 0 20px #000';

    overlay.appendChild(bigImg);
    document.body.appendChild(overlay);
  });
});                

// to-do nav bar code
document.addEventListener('DOMContentLoaded', function() {
  const links = document.querySelectorAll('#sidebar-todo a[data-entry]');
  const sections = document.querySelectorAll('.todo-section');

  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      // Hide all sections
      sections.forEach(sec => sec.style.display = 'none');
      // Remove active class from all links
      links.forEach(a => a.classList.remove('active'));
      // Show the selected section
      const entryId = this.getAttribute('data-entry');
      const section = document.getElementById(entryId);
      if (section) section.style.display = 'block';
      // Highlight the active link
      this.classList.add('active');
    });
  });

  // Show the first section and highlight the first link by default
  if (sections.length > 0) sections[0].style.display = 'block';
  if (links.length > 0) links[0].classList.add('active');
});



           
         
  
