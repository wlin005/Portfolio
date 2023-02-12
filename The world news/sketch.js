// The world news
// by wlin
// 12/02/2023

//TURN OFF AUTO-REFRESH NOW !!!


//From: https://api.openaq.org
let airData;
let loading = true;
//let url = "https://api.openaq.org/v2/measurements?location_id=225765&parameter=pm25&parameter=pm10&parameter=no2&date_from=2023-02-06T00:00:00Z&date_to=2023-02-12T00:00:00Z&limit=1000";
let url = "https://inshorts.deta.dev/news?category=world";

index = 1;
angle = 0;


function drawFog(){
  push();
  fill(255, 16);
  noStroke();
  rect(0,0,width,height);
  pop();
}

//https://inshorts.deta.dev/news?category=world
function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);

   //HAVE YOU TURNED OFF AUTO-REFRESH?
  
  // perform request
  fetch(url).then(function(response) {
    return response.json();
  }).then(function(data) {
    console.log("Got data");
    console.log(data);
    //HAVE YOU TURNED OFF AUTO-REFRESH?
    
   // airData = data;
    newsData = data;
    loading = false;
     
  
  }).catch(function(err) {
    console.log(`Something went wrong: ${err}`);
  });
}

function draw() {

  //fog
  if(frameCount % 4 == 0)drawFog(); // only draw the fog evey 16 frames

  textAlign(LEFT);
  background(250);

  fill(0);

  if (loading) {
    // loading screen
    textSize(30);
    
    text("Loading...", 0, height/2-25, width, 50);
    
  }else{
     let centerX = width/2;
     let centerY = height /2;
     text("The World News on " + newsData.data[index].date,centerX -150,centerY,400);
    textSize(15);
    textWrap(WORD);
   // updateWord();
    push();
    translate(centerX, centerY);
    rotate(angle);
    text(newsData.data[index].content ,50,100,400);
    pop();

    push();
    translate(centerX, centerY);
    rotate(-angle);
    fill (150,100,100);
    text(newsData.data[index].time,50,20,400);
    pop();
    if(frameCount % 30 == 0){
      index++;
      angle = angle + 6;
    }


if (index >= newsData.data.length -1 ) {
      index = 0;
    }
  }
}


