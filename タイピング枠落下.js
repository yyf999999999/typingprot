console.log("やるぞやるやる3");
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
import textWarehouse from "./タイピング枠落下.json" assert{type:"json"};
import {enWrite,enInput,enAnswer,enToJn} from "./タイピング.js";
var text=[],count=0,i;
    function drawBlock(letter){
        if (enWrite!=""&&i==0){
            letter.en=enWrite;
        }
        ctx.beginPath();
        ctx.fillStyle="#000000";
        ctx.font="24px Arial";
        if (letter.en.length>letter.jn.length*2){
            ctx.fillText(letter.en,letter.x,letter.y);
            ctx.fillText(letter.jn,letter.x+(letter.en.length-letter.jn.length*2)*6,letter.y-24);
            var inum=(letter.en.match(new RegExp('['+"iftjl"+']','g'))||[]).length||0;
            ctx.rect(letter.x-8,letter.y-51,letter.en.length*12+16-(inum-1)*4,57);
        }else{
            ctx.fillText(letter.en,letter.x+(letter.jn.length*2-letter.en.length)*6,letter.y);
            ctx.fillText(letter.jn,letter.x,letter.y-24);
            ctx.rect(letter.x-8,letter.y-51,letter.jn.length*24+16,57);
        }
        ctx.lineWidth=1;
        if (i==0){
            ctx.fillStyle="FF0000";
            if (letter.en.length>letter.jn.length*2)var tX=letter.x; else var tX=letter.x+(letter.jn.length*2-letter.en.length)*6
            ctx.fillText(enInput,tX,letter.y);
            ctx.strokeStyle="#FF0000";
            enAnswer=letter.enC;
        }else{
            ctx.strokeStyle="#000000";
        }
        ctx.stroke();
        ctx.closePath();
    }
    function main(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        count++;
        if (count%150==0){
            var number=Math.floor(Math.random()*textWarehouse.length),textX;
            if (textWarehouse[number].en.length>textWarehouse[number].jn.length*2){
                textX=Math.floor(Math.random()*(750-textWarehouse[number].jn.length*24))+9;
                console.log(textWarehouse[number].jn);
            }else{
                textX=Math.floor(Math.random()*(750-textWarehouse[number].en.length*12))+9;
            }
            text.push({x:textX,y:0,jn:textWarehouse[number].jn,en:textWarehouse[number].en,enC:textWarehouse[number].en});
        }
        if (text.length>0){
            if (enToJn(enInput)==enToJn(text[0].en)){
                text.shift();
                enInput="";
                enWrite="";
                text[0].en=text[0].enC;
            }
        }
        for (i=0;i<text.length;i++){
            text[i].y+=0.25;
            drawBlock(text[i]);
        }
        console.log(enInput);
    }
    setInterval(main,10);