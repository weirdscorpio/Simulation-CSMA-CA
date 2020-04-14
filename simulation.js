/*variables*/

var x;
var y;
var ifs = 4000;
var k = [0,0,0,0,0,0];
var tp = 1000;
var channel = 0;
var r;
var clsrts=document.querySelectorAll(".rts");
var clscts=document.querySelectorAll(".cts");
var clsdata=document.querySelectorAll(".sending-data");
var swp=0;

/*variables end*/

/*functions*/


function display(a,b){
  if(channel==0)
  {
    x=a;
    y=b;
  }
}

function checkChannel(){
  if(channel == 0 )
  { var n = document.querySelectorAll(".d-none");
    n[x-1].classList.remove('d-none');
    n[x-1].classList.add('d-block');
    setTimeout(sendSignal,ifs);
  }
  else
  {
    alert("Transmission taking place,channel not idle");
  }
}

function sendSignal(){
  var n = document.querySelectorAll(".ifs");
  n[x-1].classList.remove('d-block');
  n[x-1].classList.add('d-none');
  r = tp*parseInt(Math.random()*k[x-1]);
  sendRTS();
}

function sendRTS()
{ var a = "station"+ x;
  clsrts[x-1].innerHTML="RTS : Sent";
  clsrts[y-1].innerHTML="RTS : Received";
  var n = Math.random();
  if(n>0.85)
  {
    k[x-1]=k[x-1]+1;
    if(k[x-1]>15)
    {
      abortSignal();
    }
    else{
      clscts[x-1].innerHTML="CTS : Not received,trying again";
      clscts[y-1].innerHTML="CTS : Could not send";
      setTimeout(checkChannel,tp*r);
    }
  }
  else{
    checkIFS();
  }
}

function checkIFS(){
  for(let n=0;n<6;n++)
  {
    if(n!=y-1)
      clscts[n].innerHTML="CTS : Received";
  }
  document.getElementById("station1").innerHTML="Station"+x;
  document.getElementById("station2").innerHTML="Station"+y;
  clscts[y-1].innerHTML="CTS : Sent"
  clsdata[x-1].innerHTML="Data Transfer : Sending";
  clsdata[y-1].innerHTML="Data Transfer : Receiving";
  channel = 1;
  document.getElementById("channel").innerHTML="Channel : Not free";
  swap();
  setTimeout(sendFrame,ifs);
}

function swap(){
  if(swp==0)
  {
    var none = document.querySelectorAll(".for-swap");
    none[0].classList.remove('d-none');
    none[0].classList.add('d-block','d-flex');
    none[1].classList.remove('d-none');
    none[1].classList.add('d-block','d-flex');
    swp=1;
  }
  else{
    var block = document.querySelectorAll(".for-swap");
    block[0].classList.remove('d-block','d-flex');
    block[0].classList.add('d-none');
    block[1].classList.remove('d-block','d-flex');
    block[1].classList.add('d-none');
    
    swp=0;
  }
}

function sendFrame(){  
  var n = Math.random();
  if(n>0.1)
  {
    success();
  }
  else{
    k[x-1]=k[x-1]+1;
    if(k[x-1]>15)
    { swap();
      abortSignal();
    }
    else{
      clsdata[x-1].innerHTML=clsdata[y-1].innerHTML="Acknowledge timeout,trying again";
      channel = 0; 
      for(let i =0;i<6;i++)
      {
        clscts[i].innerHTML="CTS : -";
        clsrts[i].innerHTML="CTS : -";
        document.getElementById("channel").innerHTML="Channel : Free";
        clsdata[i].innerHTML="Data Transfer : -";
      }
      document.getElementById("channel").innerHTML="Channel : Free";
      setTimeout(checkChannel,tp*r);
    }
  } 
}

function success(){
  clsdata[x-1].innerHTML=clsdata[y-1].innerHTML="Data sent successfully!";
  alert("Data sent successfully!");
  swap();
  setDefault();
}

function abortSignal(){
  clsdata[x-1].innerHTML=clsdata[y-1].innerHTML="Data not sent,process aborted";
  setDefault();
  alert("Data not sent,process aborted");
}

function setDefault(){
  k = [0,0,0,0,0,0];
  r = 0;
  channel = 0;
  for(let i =0;i<6;i++)
  {
    clscts[i].innerHTML="CTS : -";
    clsrts[i].innerHTML="RTS : -";
    document.getElementById("channel").innerHTML="Channel : Free";
    clsdata[i].innerHTML="Data Transfer : -";
  }
}


/*functions end*/