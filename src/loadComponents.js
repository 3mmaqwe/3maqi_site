

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
        document.getElementById("hitcount").innerHTML = num_str;
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
                    

           
         
  
