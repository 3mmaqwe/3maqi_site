

// // page for my scripts!!

// //script for showing when my page was last updated
// let text = document.lastModified;
// document.getElementById("date").innerHTML += text;

// //script for vistor counter
// //heres the guide i got this code from :3 --> https://goblin-heart.net/sadgrl/learn/articles/last-update-visitors
// // btw you need to be a supporter for this to work, neocities doesnt let you connect to api's on a basic/free plan

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         var site_data = JSON.parse(this.responseText);
//         var num_arr = site_data.info.views.toString().split("");
//         var num_str = "";
//         for (i = 0; i < num_arr.length; i++) {
//             num_str += num_arr[i];
//             if ( (num_arr.length-1 - i) % 3 == 0 && (num_arr.length-1 - i) != 0 ) {num_str += ",";}
//             var date_str = site_data.info.last_updated;
//             var date_obj = new Date(site_data.info.last_updated)
//         }
//         document.getElementById("hitcount").innerHTML = num_str;
//     } else {
//        console.log("failed connection didnt work");
//       }
// };


// xhttp.open("GET", "https://weirdscifi.ratiosemper.com/neocities.php?sitename=3maqi", true);
// xhttp.send();

// keeping in just incase other code breaks
