/*
        
        FILL IN THESE VARIABLES BASED ON THE GUIDE AT https://drawbox.nekoweb.org
        
        IF YOU HAVE ANY QUESTION, SUGGESTIONS, OR NEED HELP, PLEASE EMAIL ME AT drawbox@jhorn.net OR @MONKEYBATION on DISCORD *** This contact info might not be working anymore**
        
				      /`Â·.Â¸
				     /Â¸...Â¸`:Â·
				 Â¸.Â·Â´  Â¸   `Â·.Â¸.Â·Â´)
				: Â© ):Â´;      Â¸  {
				 `Â·.Â¸ `Â·  Â¸.Â·Â´\`Â·Â¸)
				     `\\Â´Â´\Â¸.Â·Â´
        
*/
const GOOGLE_FORM_ID = "1FAIpQLSe0SOsjo9DTCoNWYzS_2XK9uBkQCQsOgmtNMrCeJA1ciYQLqg";
const ENTRY_ID = "entry.1488240571";
const GOOGLE_SHEET_ID = "1cWkdTasq-rY5XmerIga-lBclc9F2MO0R8mV4srwFbbw";
const DISPLAY_IMAGES = true;
/*
        
        DONT EDIT BELOW THIS POINT IF YOU DONT KNOW WHAT YOU ARE DOING.
        const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSe0SOsjo9DTCoNWYzS_2XK9uBkQCQsOgmtNMrCeJA1ciYQLqg/formResponse";

*/

const CLIENT_ID = "bfaaee57f0b78f1";
// old id 
//const CLIENT_ID = "b4fb95e0edc434c";
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/" + GOOGLE_SHEET_ID + "/export?format=csv";
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/" + GOOGLE_FORM_ID + "/formResponse";

let canvas = document.getElementById("drawboxcanvas");
let context = canvas.getContext("2d");
const image = document.getElementById("paper");
//context.drawImage(image, 10, 10);


function setCanvasSize () {
   canvas.width = canvas.offsetWidth;
   canvas.height = canvas.offsetWidth;
   const image = document.getElementById("paper");
   context.drawImage(image, 0, 0, canvas.height, canvas.width);
     console.log("resizing canvas");

   }

window.addEventListener('resize', setCanvasSize);

setCanvasSize();

let restore_array = [];
let start_index = -1;
let stroke_color = "black";
let stroke_width = "2";
let is_drawing = false;

function change_color(element) {
  stroke_color = element.style.background;
}

function start(event) {
  is_drawing = true;
  context.beginPath();
  context.moveTo(getX(event), getY(event));
  event.preventDefault();
}

function draw(event) {
  if (!is_drawing) return;
  context.lineTo(getX(event), getY(event));
  context.strokeStyle = stroke_color;
  context.lineWidth = stroke_width;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.stroke();
  event.preventDefault();
}

function stop(event) {
  if (!is_drawing) return;
  context.stroke();
  context.closePath();
  is_drawing = false;
  restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
  start_index++;
  event.preventDefault();
}

function getX(event) {
  return event.pageX
    ? event.pageX - canvas.offsetLeft
    : event.targetTouches[0].pageX - canvas.offsetLeft;
}

function getY(event) {
  return event.pageY
    ? event.pageY - canvas.offsetTop
    : event.targetTouches[0].pageY - canvas.offsetTop;
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

function Restore() {
  if (start_index <= 0 ) {
    console.log("im running restore");
    Clear();
  } else {
    start_index--;
    restore_array.pop();
    context.putImageData(restore_array[start_index], 0, 0);
  }
}

function Clear() {
 context.clearRect(0, 0, canvas.width, canvas.height);   
 context.drawImage(image, 0, 0,canvas.height, canvas.width);
  restore_array = [];
  start_index = -1;
  console.log("cleared drawing");
}


document.getElementById("submit").addEventListener("click", async function () {
  const submitButton = document.getElementById("submit");
  const statusText = document.getElementById("status");

  submitButton.disabled = true;
  statusText.textContent = "Uploading...";


  const imageData = canvas.toDataURL("image/png");
  const blob = await (await fetch(imageData)).blob();
  const formData = new FormData();
  formData.append("image", blob, "drawing.png");

  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: { Authorization: `Client-ID ${CLIENT_ID}` },
      body: formData,
    });

    const data = await response.json();
    if (!data.success) throw new Error("Imgur upload failed");

    const imageUrl = data.data.link;
    console.log("Uploaded image URL:", imageUrl);

    const googleFormData = new FormData();
    googleFormData.append(ENTRY_ID, imageUrl);

    await fetch(GOOGLE_FORM_URL, {
      method: "POST",
      body: googleFormData,
      mode: "no-cors",
    });

    statusText.textContent = "Upload successful!";
    alert("Image uploaded and submitted successfully â˜»");
    location.reload();
  } catch (error) {
    console.error(error);
    statusText.textContent = "Error uploading image.";
    alert("Error uploading image or submitting to Google Form.");
  } finally {
    submitButton.disabled = false;
  }
});

async function fetchImages() {
  if (!DISPLAY_IMAGES) {
    console.log("Image display is disabled.");
    return;
  }

  try {
    const response = await fetch(GOOGLE_SHEET_URL);
    const csvText = await response.text();
    const rows = csvText.split("\n").slice(1);

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "";
    rows.reverse().forEach((row) => {
      const columns = row.split(",");
      if (columns.length < 2) return;

      const timestamp = columns[0].trim();
      const imgUrl = columns[1].trim().replace(/"/g, "");
      const approved =columns[2].trim().replace(/"/g, "");

      // add && approved=="TRUE" if things start to get... bad 
      if (imgUrl.startsWith("http") ) {
        const div = document.createElement("div");
        div.classList.add("image-container");

        div.innerHTML = `
                    <img src="${imgUrl}"  class="drawbox" alt="drawing">
                    <p>${timestamp}</p>
                `;
        gallery.appendChild(div);
      }
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    document.getElementById("gallery").textContent = "Failed to load images.";
  }
   document.querySelectorAll('.drawbox').forEach(img => {
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
}



fetchImages();

function keyPressHandler(e) {
      var evtobj = window.event ? window.event : e;

      if (evtobj.ctrlKey && evtobj.keyCode == 90) {
          Restore();
      }
}

window.addEventListener('keydown', keyPressHandler);
