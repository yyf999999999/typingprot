import textWarehouse from "./タイピング枠落下.json" assert{type:"json"};
import {enToJn,enInput,enAnswer,enWrite,back} from "./タイピング.js";
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const subCanvas=document.getElementById("subCanvas");
const subCtx=subCanvas.getContext("2d");
/*subCtx.fillStyle="#000000";
subCtx.font="12px Arial";
subCtx.fillText("60点ライン",0,12);
subCtx.fillStyle="#FF0000";
subCtx.fillText("0点ライン",0,512);*/
ctx.fillStyle="#000000";
ctx.font="12px Arial";
ctx.fillText("60点ライン",0,12);
ctx.fillStyle="#FF0000";
ctx.fillText("0点ライン",0,512);
/*console.log(enAnswer,typeof(enAnswer));
enAnswer.text="なんでや!";
console.log(enAnswer);*/
var text=[],fText=[],count=0,letter,i,interval;
    function drawBlock(letter){
        if (enWrite.text!=""&&i==0){
            letter.en=enWrite.text;
        }
        ctx.beginPath();
        ctx.fillStyle="#000000";
        ctx.font="24px Arial";
        if (letter.en.length>letter.jn.length*2){
            ctx.fillText(letter.en,letter.x,letter.y);
            ctx.fillText(letter.jn,letter.x+(letter.en.length-letter.jn.length*2)*6,letter.y-24);
            ctx.rect(letter.x-16,letter.y-51,letter.en.length*12+32,57);
        }else{
            ctx.fillText(letter.en,letter.x+(letter.jn.length*2-letter.en.length)*6,letter.y);
            ctx.fillText(letter.jn,letter.x,letter.y-24);
            ctx.rect(letter.x-8,letter.y-51,letter.jn.length*24+16,57);
        }
        ctx.lineWidth=1;
        if (i==0){
            ctx.fillStyle="FF0000";
            if (letter.en.length>letter.jn.length*2)var tX=letter.x; else var tX=letter.x+(letter.jn.length*2-letter.en.length)*6
            ctx.fillText(enInput.text,tX,letter.y);
            ctx.strokeStyle="#FF0000";
            //console.log(letter.enC,typeof(letter.enC));
            enAnswer.text=letter.enC;
        }else{
            ctx.strokeStyle="#000000";
        }
        ctx.stroke();
        ctx.closePath();
    }
    function main(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.moveTo(0,512);ctx.lineTo(canvas.width,512);
        ctx.strokeStyle="#FF0000";
        ctx.stroke();
        ctx.closePath();
        count++;
        if (count%250==0){
            var number=Math.floor(Math.random()*textWarehouse.length),textX;
            if (textWarehouse[number].en.length>textWarehouse[number].jn.length*2){
                textX=Math.floor(Math.random()*(750-textWarehouse[number].jn.length*24-16))+73;
                console.log(textWarehouse[number].jn);
            }else{
                textX=Math.floor(Math.random()*(750-textWarehouse[number].en.length*12))+9;
            }
            text.push({x:textX,y:0,jn:textWarehouse[number].jn,en:textWarehouse[number].en,enC:textWarehouse[number].en});
        }
        if (text.length>0){
            if (enToJn(enInput.text)==enToJn(text[0].en)){
                fText.push(text[0]);
                text.shift();
                enInput.text="";enWrite.text="";
                back.ans="";back.printCharacter="";
                text[0].en=text[0].enC;
            }
        }
        for (i=0;i<text.length;i++){
            text[i].y+=0.25;
            //console.log(text[i]);
            drawBlock(text[i]);
        }
        for (i=1;i<=fText.length;i++){
            fText[i-1].y-=10;
            drawBlock(fText[i-1]);
        }
        if (text.length>0) if (text[0].y>512){
            console.log("GAMEOVER");
            clearInterval(interval);
        }
        if (fText.length>0) if (fText[0].y<-39){
            fText.shift();
        }
        //console.log(enInput.text);
    }
interval=setInterval(main,10);
interval;