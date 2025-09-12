let all_controls = true;
let last_light;
let all_auto_element=document.getElementById("manual-controls");
let auto_button=document.getElementById('auto-button');
let manual_button=document.getElementById('manual-button');
let live_vehicles_detection=document.getElementById('live-vehicles-detection');

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });
const counterDiv = document.getElementById('counter');
const trackList = document.getElementById('trackList');
let model;
let detectedObjects = [];
// ----------------- declear light red false
let light1_red=false;
let light2_red=false;
let light3_red=false;
let light4_red=false;

//----------------- declear light yellow false
let light1_Yellow=false;
let light2_Yellow=false;
let light3_Yellow=false;
let light4_Yellow=false;

value = 2;


//---------------all roads
road1 = document.querySelectorAll(".road1-light");
road2 = document.querySelectorAll(".road2-light");
road3 = document.querySelectorAll(".road3-light");
road4 = document.querySelectorAll(".road4-light");

//-----------Light 1
road1_red = document.querySelector("#road1-red");
road1_yellow = document.querySelector("#road1-yellow");
road1_green = document.querySelector("#road1-green");
light1_timer = document.querySelector("#light1-timer");

road1_counter = 0;

//------------Light 2
road2_red = document.querySelector("#road2-red");
road2_yellow = document.querySelector("#road2-yellow");
road2_green = document.querySelector("#road2-green");
light2_timer = document.querySelector("#light2-timer");
road2_counter = 0;

//-------------Light 3
road3_red = document.querySelector("#road3-red");
road3_yellow = document.querySelector("#road3-yellow");
road3_green = document.querySelector("#road3-green");
light3_timer = document.querySelector("#light3-timer");
road3_counter = 0;

//--------------Light4
road4_red = document.querySelector("#road4-red");
road4_yellow = document.querySelector("#road4-yellow");
road4_green = document.querySelector("#road4-green");
light4_timer = document.querySelector("#light4-timer");
road4_counter = 0;

//---------------Red Lights
red_lights = document.querySelectorAll(".red-light");
red_counter = 0;

//--------------Yellow Lights
yellow_lights = document.querySelectorAll(".yellow-light");
yellow_counter = 0;

//--------------Green Lights
green_lights = document.querySelectorAll(".green-light");
green_countemanage_timelight_timer = 0;

let light_counter = 1;
let light_timer = value;

//---------------access one light are red button
btn_light1Red=document.querySelector("#btn_light1Red");
btn_light2Red=document.querySelector("#btn_light2Red");
btn_light3Red=document.querySelector("#btn_light3Red");
btn_light4Red=document.querySelector("#btn_light4Red");

//-------------- access one light are Green button
btn_light1Green=document.querySelector("#btn_light1green");
btn_light2Green=document.querySelector("#btn_light2green");
btn_light3Green=document.querySelector("#btn_light3green");
btn_light4Green=document.querySelector("#btn_light4green");

//------------- access one light are yellow button
btn_light1Yellow=document.querySelector("#btn_light1yellow");
btn_light2Yellow=document.querySelector("#btn_light2yellow");
btn_light3Yellow=document.querySelector("#btn_light3yellow");
btn_light4Yellow=document.querySelector("#btn_light4yellow");

//----------------Green light button color control
btn_light1_Green_button_control=true;
btn_light2_Green_button_control=true;
btn_light3_Green_button_control=true;
btn_light4_Green_button_control=true;
setInterval(Set_light_timer, 1000);

//------------Set the timer of lights
function Set_light_timer() {
    if(all_controls){
        light_timer--;
        if (light_timer ==  0) {
          light_timer = value;
          if (light_counter == 4) {
            light_counter = 1;
          } else {
            light_counter++;
          }
        }
        control_lights();
          if(light_timer==2){  
              captureAndDetect();
              setTimeout(()=>{
                  console.log(totalVehicles);
                  value=totalVehicles+4;
                  if(value<5){
                      value=5;
                  }
                  else if(value>20){
                      value=20
                  }
              },500)
           
          }
    }
  
}

// ---------------Control the Lights(switch the lights)
function control_lights() {
  if (light_counter == 1) {
    if(light1_red || light1_Yellow ){
      Set_light_timer();  
    }
    else{
      live_vehicles_detection.innerText=`Light 1 Dectection`;
      if (light4_timer) light4_timer.innerHTML = "00:00";
      if (light1_timer) light1_timer.innerHTML = manage_light_timer(light_timer);
      if(!light2_red){
        if (light_timer == 1) enable_one_yellow_light(road2);
      }
      change_light_color(road1);
      if(light4_Yellow){
        enable_one_yellow_light(road4);
      }
    }


  } else if (light_counter == 2) {
    if(light2_red || light2_Yellow){
      Set_light_timer()
    }  
    else{
      live_vehicles_detection.innerText=`Light 2 Dectection`;
      if (light1_timer) light1_timer.innerHTML = "00:00";
      if (light2_timer) light2_timer.innerHTML = manage_light_timer(light_timer);
      if(!light3_red){
        if (light_timer == 1) enable_one_yellow_light(road3);
      }
      change_light_color(road2);
    if(light1_Yellow){
      enable_one_yellow_light(road1);
    }
    }
   
 
  } else if (light_counter == 3) {
    if(light3_red || light3_Yellow){
      Set_light_timer()
    }
    else{
      live_vehicles_detection.innerText=`Light 3 Dectection`;
      if (light2_timer) light2_timer.innerHTML = "00:00";
      if (light3_timer) light3_timer.innerHTML = manage_light_timer(light_timer);
      if(!light4_red){
        if (light_timer == 1) enable_one_yellow_light(road4);
      }
     
      change_light_color(road3);
      if(light2_Yellow){
        enable_one_yellow_light(road2);
      }
    }
   
  } else {
    if(light4_red || light4_Yellow){
      Set_light_timer()
    }
    else{
      live_vehicles_detection.innerText=`Light 4 Dectection`;
      if (light3_timer) light3_timer.innerHTML = "00:00";
      if (light4_timer) light4_timer.innerHTML = manage_light_timer(light_timer);
      if(!light1_red){
        if (light_timer == 1) enable_one_yellow_light(road1);
      }
        
      change_light_color(road4);
      if(light3_Yellow){
        enable_one_yellow_light(road3);
      }
    }

  }
}

//-------------------Manage the timer of lights
function manage_light_timer(manage_time) {
  let set_timer;
  if (manage_time < 10) {
    set_timer = `00:0${manage_time}`;
  } else if (manage_time < 60) {
    set_timer = `00:${manage_time}`;
  } else {
    let minit = Math.floor(manage_time / 60);
    let second = manage_time % 60;
    if (minit < 10) {
      if (second < 10) {
        set_timer = `0${minit}:0${second}`;
      } else {
        set_timer = `0${minit}:${second}`;
      }
    } else {
      if (second < 10) {
        set_timer = `${minit}:0${second}`;
      } else {
        set_timer = `${minit}:${second}`;
      }
    }
  }
  return set_timer;
}


//---------------------Change the light color for way open
function change_light_color(item) {
  if (all_controls) {
    if (last_light) {
    
        last_light[0].style.backgroundColor = "red";
        last_light[1].style.background = "none";
        last_light[2].style.background = "none";
    
     
      last_light = NaN;
    } else {

      item[0].style.background = "none";
      item[1].style.background = "none";
      item[2].style.backgroundColor = "green";
      if (light_timer >= value +1) {
        item[1].style.backgroundColor = "yellow";
        item[2].style.background = "none";
      }
      if (light_timer == 1) {
        last_light = item;
      }
    }
  }
}
//----------------------enable one yellow light
function enable_one_yellow_light(item) {
  item[0].style.background = "none";
  item[1].style.backgroundColor = "yellow";
  item[2].style.background = "none";
}

//----------------------------- all lights are yellow
function all_lights_yellow() {
  check_green_light_button_control();
  road1_red.style.background = "none";
  road2_red.style.background = "none";
  road3_red.style.background = "none";
  road4_red.style.background = "none";

  road1_green.style.background = "none";
  road2_green.style.background = "none";
  road3_green.style.background = "none";
  road4_green.style.background = "none";

  road1_yellow.style.background = "yellow";
  road2_yellow.style.background = "yellow";
  road3_yellow.style.background = "yellow";
  road4_yellow.style.background = "yellow";
  all_controls = false;
}

//------------------------------all lights are red
function all_lights_red() {
  check_green_light_button_control()
  road1_red.style.background = "red";
  road2_red.style.background = "red";
  road3_red.style.background = "red";
  road4_red.style.background = "red";

  road1_green.style.background = "none";
  road2_green.style.background = "none";
  road3_green.style.background = "none";
  road4_green.style.background = "none";

  road1_yellow.style.background = "none";
  road2_yellow.style.background = "none";
  road3_yellow.style.background = "none";
  road4_yellow.style.background = "none";
  all_controls=false;
}

function all_lights_green() {
  check_green_light_button_control()
  road1_red.style.background = "none";
  road2_red.style.background = "none";
  road3_red.style.background = "none";
  road4_red.style.background = "none";

  road1_yellow.style.background = "none";
  road2_yellow.style.background = "none";
  road3_yellow.style.background = "none";
  road4_yellow.style.background = "none";

  road1_green.style.background = "green";
  road2_green.style.background = "green";
  road3_green.style.background = "green";
  road4_green.style.background = "green";

 
  
}

//-------------------------- One light are green
function light1_green(){
  road1_red.style.background = "none";
  road1_green.style.background = "green";
}
function light2_green(){
  road2_red.style.background = "none";
  road2_green.style.background = "green";
}
function light3_green(){
  road3_red.style.background = "none";
  road3_green.style.background = "green";
}
function light4_green(){
  road4_red.style.background = "none";
  road4_green.style.background = "green";
}




async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;
    return new Promise(resolve => video.onloadedmetadata = resolve);
}

async function loadModel() {
    model = await cocoSsd.load(); // Load COCO-SSD model
}


async function captureAndDetect() {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return detectObjects();
}

async function detectObjects() {
    const predictions = await model.detect(canvas);
    let count = { car: 0, truck: 0, bus: 0, motorcycle: 0, taxi: 0, van: 0, jeep: 0, camion: 0, person: 0, train: 0, boat: 0, teddyBear: 0, chair: 0, bottle: 0, cup: 0, mirror: 0, whiteObject: 0, doubt: 0 };
  
    
    predictions.forEach(prediction => {
        if (["car", "truck", "bus", "motorcycle", "taxi", "van", "jeep", "camion", "person", "train", "boat", "teddy bear", "chair", "bottle", "cup", "mirror", "white object"].includes(prediction.class) && prediction.score >= 0.01) {
            count[prediction.class.replace(' ', '')]++;
           
            ctx.strokeStyle = "#FF0000";
            ctx.lineWidth = 3;
            ctx.strokeRect(...prediction.bbox);
            ctx.fillStyle = "rgba(255, 0, 0, 0.7)";
            ctx.fillRect(prediction.bbox[0], prediction.bbox[1] - 20, 120, 20);
            ctx.fillStyle = "#FFF";
            ctx.font = "14px Arial";
            ctx.fillText(`${prediction.class} (${Math.round(prediction.score * 100)}%)`, prediction.bbox[0] + 5, prediction.bbox[1] - 5);
        } else if (prediction.score >= 0.02 && prediction.score < 100) {
            count.doubt++;
         
        }
    });
    
    totalVehicles = count.car + count.truck + count.bus + count.motorcycle + count.taxi + count.van + count.jeep + count.person + count.camion;
    counterDiv.innerText = ` Total Vehicles: ${totalVehicles}`;
   
    
    return totalVehicles;
}

async function main() {
    await setupCamera();
    await loadModel();
    return captureAndDetect();
}

function allLightAreGreen(){
  all_normal()
  all_controls=false;
  all_lights_green();
}

function allLightAreRed(){
  all_normal()
  all_controls=false;
  all_lights_red();
}

function allLightAreYellow(){
  all_normal()
  all_controls=false;
  all_lights_yellow();
}


//=================function call for one green light
function light1Green(){
  all_normal()
  all_controls=false;
  all_lights_red();
  light1_green();
  if(btn_light1_Green_button_control==true){
    check_green_light_button_control();
    btn_light1_Green_button_control=false;
    btn_light1Green.style.background='Green';
  }
  else{ 
    btn_light1Green.style.background="linear-gradient(45deg, #66bb6ab6, #43a047)";
    check_green_light_button_control();
    btn_light1_Green_button_control=true;
    
      all_controls= true;
      road1_red.style.background = "red";
      road1_green.style.background = "none";
    }
    
  }
 


function light2Green(){
  all_normal()
  all_controls=false;
  all_lights_red();
  light2_green();
  if(btn_light2_Green_button_control==true){
    check_green_light_button_control();
    btn_light2_Green_button_control=false;
    btn_light2Green.style.background='Green';
  }
  else{ 
    btn_light2Green.style.background="linear-gradient(45deg, #66bb6ab6, #43a047)";
    btn_light2_Green_button_control=true;
   
      all_controls= true;
      check_green_light_button_control();
      btn_light2_Green_button_control=true;
        road2_red.style.background = "red";
        road2_green.style.background = "none";      
    }
  }


function light3Green(){
  all_normal()
  all_controls=false;
  all_lights_red();
  light3_green();
  if(btn_light3_Green_button_control==true){
    check_green_light_button_control();
    btn_light3_Green_button_control=false;
    btn_light3Green.style.background='Green';
  }
  else{ 
    btn_light3Green.style.background="linear-gradient(45deg, #66bb6ab6, #43a047)";
    btn_light3_Green_button_control=true;
   
      all_controls= true;
      check_green_light_button_control();
      btn_light1_Green_button_control=true;
        road3_red.style.background = "red";
        road3_green.style.background = "none";      
    }
  }



function light4Green(){
  all_normal()
  all_controls=false;
  all_lights_red();
  light4_green();
  if(btn_light4_Green_button_control==true){
    check_green_light_button_control();
    btn_light4_Green_button_control=false;
    btn_light4Green.style.background='Green';
  }
  else{ 
    btn_light4Green.style.background="linear-gradient(45deg, #66bb6ab6, #43a047)";
    btn_light4_Green_button_control=true;
   
      all_controls= true;
      check_green_light_button_control();
      btn_light4_Green_button_control=true;
        road4_red.style.background = "red";
        road4_green.style.background = "none";      
    }
  
 
}

//===================function call for one yellow light


//===================functon call for one red light
function light1Red(){

  all_controls=true;
  if(!light1_red){
    road1_red.style.background = "red";
    road1_green.style.background = "none";
    road1_yellow.style.background = "none";
    light1_red=true;
    btn_light1Red.style.background="red";
  } else{
    light1_red=false;
    btn_light1Red.style.background="linear-gradient(45deg, #e538358c, #c62828)";
  }
 
}
function light2Red(){
  all_controls=true;
  if(!light2_red){
    road2_red.style.background = "red";
    road2_green.style.background = "none";
    road2_yellow.style.background = "none";
    light2_red=true;
    btn_light2Red.style.background="red";
  }else{
    light2_red=false;
    btn_light2Red.style.background="linear-gradient(45deg, #e538358c, #c62828)";
  }
}
function light3Red(){
  all_controls=true;
  if(!light3_red){
    road3_red.style.background = "red";
    road3_green.style.background = "none";
    road3_yellow.style.background = "none";
    light3_red=true;
    btn_light3Red.style.background="red";
  } else{
    light3_red=false;
    btn_light3Red.style.background="linear-gradient(45deg, #e538358c, #c62828)";
  }
}
function light4Red(){
  all_controls=true;
  if(!light4_red){
    road4_red.style.background = "red";
    road4_green.style.background = "none";
    road4_yellow.style.background = "none";
    light4_red=true;
    btn_light4Red.style.background="red";
  }else{
    light4_red=false;
    btn_light4Red.style.background="linear-gradient(45deg, #e538358c, #c62828)";
  }
}


//-------------------------- One light are Yellow
function light1Yellow(){
  all_controls=true;
  if(!light1_Yellow){
    road1_red.style.background = "none";
    road1_green.style.background = "none";
    road1_yellow.style.background = "yellow";
    light1_Yellow=true;
    btn_light1Yellow.style.background="yellow";
} else{
  road1_red.style.background = "red";
  road1_yellow.style.background = "none";
  light1_Yellow=false;
  btn_light1Yellow.style.background="linear-gradient(45deg, #fdd8358f, #fbc02d)";
}
}
function light2Yellow(){
  all_controls=true;
  if(!light2_Yellow){
    road2_red.style.background = "none";
    road2_green.style.background = "none";
    road2_yellow.style.background = "yellow";
    light2_Yellow=true;
    btn_light2Yellow.style.background="yellow";
} else{
  light2_Yellow=false;
  road2_red.style.background = "red";
  road2_yellow.style.background = "none";
  btn_light2Yellow.style.background="linear-gradient(45deg, #fdd8358f, #fbc02d)";
}
}
function light3Yellow(){
  all_controls=true;
  if(!light3_Yellow){
    road3_red.style.background = "none";
    road3_green.style.background = "none";
    road3_yellow.style.background = "yellow";
    light3_Yellow=true;
    btn_light3yellow.style.background="yellow";
} else{
  light3_Yellow=false;
  road3_red.style.background = "red";
  road3_yellow.style.background = "none";
  btn_light3Yellow.style.background="linear-gradient(45deg, #fdd8358f, #fbc02d)";
}
}
function light4Yellow(){
  all_controls=true;
  if(!light4_Yellow){
    road4_red.style.background = "none";
    road4_green.style.background = "none";
    road4_yellow.style.background = "yellow";
    light4_Yellow=true;
    btn_light4Yellow.style.background="yellow";
} else{
  light4_Yellow=false;
  road4_red.style.background = "red";
  road4_yellow.style.background = "none";
  btn_light4Yellow.style.background="linear-gradient(45deg, #fdd8358f, #fbc02d)";
}
}




function all_normal(){
  btn_light1Yellow.style.background="rgba(190, 190, 101, 0.567)";
  btn_light2Yellow.style.background="rgba(190, 190, 101, 0.567)";
  btn_light3Yellow.style.background="rgba(190, 190, 101, 0.567)";
  btn_light4Yellow.style.background="rgba(190, 190, 101, 0.567)";
  btn_light1Red.style.background="rgba(190, 114, 101, 0.537)";
  btn_light2Red.style.background="rgba(190, 114, 101, 0.537)";
  btn_light3Red.style.background="rgba(190, 114, 101, 0.537)";
  btn_light4Red.style.background="rgba(190, 114, 101, 0.537)";
  light1_Yellow=false;
  light2_Yellow=false;
  light3_Yellow=false;
  light4_Yellow=false;

  light1_red=false;
  light2_red=false;
  light3_red=false;
  light4_red=false;
}


function auto(){
  if(!all_controls){
     all_auto_element.style.opacity="0";
     allLightAreRed();
     all_controls=true;
     auto_button.style.backgroundColor = "rgba(58, 131, 55, 0.79)";
     manual_button.style.backgroundColor = "rgba(131, 137, 130, 0.59)";
  }

}

function manual(){
  if(all_controls){
    all_controls=false;
     all_auto_element.style.opacity="1";
     all_lights_red();
     manual_button.style.backgroundColor = "rgba(58, 131, 55, 0.79)";
     auto_button.style.backgroundColor = "rgba(131, 137, 130, 0.59)";
  }

}


//-----------------Check green light button control
function check_green_light_button_control(){
  btn_light1_Green_button_control=true;
  btn_light2_Green_button_control=true;
  btn_light3_Green_button_control=true;
  btn_light4_Green_button_control=true;
  btn_light1Green.style.background="linear-gradient(45deg, #66bb6ab6, #43a047)";
  btn_light2Green.style.background="linear-gradient(45deg, #66bb6ab6, #43a047)";
  btn_light3Green.style.background="linear-gradient(45deg, #66bb6ab6, #43a047)";
  btn_light4Green.style.background="linear-gradient(45deg, #66bb6ab6, #43a047)";
}


//--------------call the main fuction 
main();
