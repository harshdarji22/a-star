// file that provides the mapping functions
// from the algorithm objects (vertices, edges, visited, current
// to the visual elements of the DOM (circle, lines)
// Check http://www.w3schools.com/svg/svg_reference.asp

// circle: cx, cy, r, Color, FillStroke, Graphics, fill (color)
// line: x1, y1, x2, y2, Color, stroke,Graphics, fill (color)

// the data for the circle is the id of the vertex


function getCircleX(d){
   return d.x;
}

function getCircleY(d){
   return maxy-d.y+offsety;
}

function getCircleR(d){
   retR=15;
   if (d.type=="look")
      retR=20;
   return retR;
}





function getMovX(d){
	
   if (d.type=="other"){
      var v=getVertex(d.id);
      var x=Number(v.x)-15;
      return x;
   }
   else{
      var qpos=getQueuePos(d.id);
      if (qpos!=-1)
         return 600;
      else
         return getCircleX(getVertex(d.id))-3;
   }

}

function getMovY(d){
   if (d.type=="other"){
      var v=getVertex(d.id);
      return maxy-Number(v.y)-15+offsety;
   }
   else{
      var qpos=getQueuePos(d.id);
      if (qpos!=-1)
          return 500-20*qpos;
      else
          return getCircleY(getVertex(d.id));
   }
}

function getMovR(d){
   return 60;
}


function getMovW(d){
	
   if (d.type=="other")
      return 30;
   else
      return 0;
}

function getMovH(d){
   if (d.type=="other")
      return 30;
   else
      return 0;
}

function getMovColor(d){
   if (d.type=="other")
      return "green";
   else
      return getCircleColor(d);
}

function getMovStrokeColor(d){
   if (d.type=="queue")
      return "black";
   else 
      return "";
}

function getCircleColor(d){
   var currentId=data.current;
   var e=data.end;
   if (d.id==currentId)
      return "yellow";
   else if (d.id==e)
	   return "red";
   else if (d.type=="xyz")
	   return "purple";
   else if (d.type=="pending")
      return "orange";
   else if (d.type=="done")
      return "lightgreen";
   else if (d.type=="abc")
	   return "blue";
   else
      return "lightblue";
}

function getDashArray(d){
   var dArray="";
   if (d.type=="back")
      dArray="5,5";
   return dArray;
}

function getLineWidth(d){
   var inTree=1;
   if (d.type=="tree")
      inTree=6;
   else if (d.type=="back")
      inTree=3;
   return inTree;
}

function getLineColor(d){
   var rcolor="black";
   if (d.type=="back")
      rcolor="red";
   else if (d.type=="btree" || d.type=="bback")
      rcolor="white";
   return rcolor;
}

function getLineOpacity(d){
   var ropacity=1;
   if (d.type=="btree" || d.type=="bback")
      ropacity=0;
   return ropacity;
}

function getLineX1(d){
   var x1=getVertex(d.inV).x;
   return x1;
}

function getLineY1(d){
   var y1=maxy-getVertex(d.inV).y;
   return y1+offsety;
}

function getLineX2(d){
   var x2=getVertex(d.outV).x;
   return x2;
}

function getLineY2(d){
   var y2=maxy-getVertex(d.outV).y;
   return y2+offsety;
}

function getLabelOpacity(d){
   if (d.type=="queue"){
      var qpos=getQueuePos(d.value);
      if (qpos!=-1)
         return 1;
      else
         return 0;
   }
   else
      return 1;
}

function getLabelX(d){
   if (d.type=="vertex")
      return getVertex(d.value).x-5;
   else if (d.type=="message")
      return messageArray[d.number][0];
   else if (d.type=="queue"){
      // document.write("X->"+d.value+"<br>");
      var qpos=getQueuePos(d.value);
      if (qpos!=-1)
         return 610;
      else
         return getVertex(d.value).x-16;
   }
}

function getLabelY(d){
   if (d.type=="vertex")
      return maxy-getVertex(d.value).y+4+offsety;
   else if (d.type=="message")
      return messageArray[d.number][1];
   else if (d.type=="queue"){
      var qpos=getQueuePos(d.value);
      if (qpos!=-1)
          return 500-20*(qpos-1)-3;
      else
          return maxy-getVertex(d.value).y+4+offsety;
   }

}

function getLabelSize(d){
   if (d.type=="vertex" || d.type=="queue")
      return 12;
   else if (d.type=="message")
      return messageArray[d.number][2];
}

function getLabel(d){
   var rvalue;
   if (d.type=="vertex"){
      var vert=getVertex(d.value);
	  rvalue=d.value;
      //rvalue=""+d.value+" ("+vert.pre+","+vert.post+")";
      return rvalue;
   }
   else if (d.type=="message" /*|| d.type=="queue"*/)
      return d.value;
}

function getLabelWeight(d){
    if(d.type=="vertex" || d.type=="queue") 
      return "normal"
    else if (d.type=="message")
      return messageArray[d.number][4];
}

function rotX(x,y,st,ct){
   return -x*st-y*ct;
}

function rotY(x,y,st,ct){
   return -x*ct+y*st;
}

function getArrow(d){
   var asize=15;
   var r=28;
   var pdata="";
   if (d.type=="tree" || d.type=="back"){
      if (d.type=="back")
         asize=8;
      var x2=getVertex(d.outV).x;
      var y2=maxy-getVertex(d.outV).y;

      var x1=getVertex(d.inV).x;
      var y1=maxy-getVertex(d.inV).y;
   

      var ct=(y2-y1)/Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
      var st=(x2-x1)/Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));

      var mx1=1.0*x2+rotX(r,0,st,ct);
      var my1=1.0*y2+rotY(r,0,st,ct)+offsety;
      var mx2=1.0*x2+rotX(r+asize,asize,st,ct);
      var my2=1.0*y2+rotY(r+asize,asize,st,ct)+offsety;
      var mx3=1.0*x2+rotX(r+asize,-asize,st,ct);
      var my3=1.0*y2+rotY(r+asize,-asize,st,ct)+offsety;

      pdata ="M" +mx1;
      pdata+="," +my1;
      pdata+=" L"+mx2;
      pdata+="," +my2;
      pdata+=" L"+mx3;
      pdata+="," +my3;
      pdata+=" Z";
   }
   return pdata;

}


