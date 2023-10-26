import textWarehouse from "./タイピング枠落下.json" assert{type:"json"};
import {enToJn,enInput,enAnswer,enWrite,back,typeNumber} from "./タイピング.js";
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
var text=[],fText=[],examContinue={ing:false,ed:false},
    count=0,examCount=-2000,controlCount=0,letter,i,interval,countInterval,reExamCount=1000;
countInterval=300;
    function drawBlock(letter){
        if (enWrite.text!=""&&i==0){
            letter.en=enWrite.text;
        }
        ctx.beginPath();
        ctx.fillStyle="#000000";
        ctx.font="24px Arial";
        if (letter.en.length>letter.jn.length*2){
            ctx.rect(letter.x-16,letter.y-51,letter.en.length*12+32,57);
        }else{
            ctx.rect(letter.x-8,letter.y-51,letter.jn.length*24+16,57);
        }
        ctx.lineWidth=1;
        if (i==0){
            ctx.strokeStyle="#FF0000";
            ctx.fillStyle="#FFFFFF";
            //console.log(letter.enC,typeof(letter.enC));
        }else{
            ctx.strokeStyle="#000000";
            ctx.fillStyle="#FFFFFF";
        }
        ctx.fill();ctx.stroke();ctx.closePath();
        if (letter.en.length>letter.jn.length*2){
            ctx.fillText(letter.en,letter.x,letter.y);
            ctx.fillText(letter.jn,letter.x+(letter.en.length-letter.jn.length*2)*6,letter.y-24);
        }else{
            ctx.fillText(letter.en,letter.x+(letter.jn.length*2-letter.en.length)*6,letter.y);
            ctx.fillText(letter.jn,letter.x,letter.y-24);
        }
        if (i==0){
            ctx.fillStyle="FF0000";
            if (letter.en.length>letter.jn.length*2)var tX=letter.x; else var tX=letter.x+(letter.jn.length*2-letter.en.length)*6
            ctx.fillText(enInput.text,tX,letter.y);
            enAnswer.text=letter.enC;
        }
    }
    function main(){
        count++;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.beginPath();
        ctx.fillStyle="#000000";
        ctx.font="24px Arial";
        ctx.fillText("60点ライン",2,24);
        ctx.fillText("残り時間:"+Math.ceil(60-(count-controlCount)/100)+"秒",612,24);
        ctx.fillStyle="#FF0000";
        ctx.fillText("0点ライン",2,510);
        if (count%countInterval==0){
            var number=Math.floor(Math.random()*textWarehouse.length),textX;
            if (textWarehouse[number].en.length>textWarehouse[number].jn.length*2){
                textX=Math.floor(Math.random()*(750-textWarehouse[number].jn.length*24-16))+9;
                //console.log(textWarehouse[number].jn);
            }else{
                textX=Math.floor(Math.random()*(750-textWarehouse[number].en.length*13-16))+9;
            }
            text.push({x:textX,y:0,jn:textWarehouse[number].jn,en:textWarehouse[number].en,enC:textWarehouse[number].en});
        }
        if (text.length>0){
            if (enToJn(enInput.text)==enToJn(text[0].en)){
                fText.push(text[0]);
                text.shift();
                enInput.text="";enWrite.text="";
                //back.ans="";back.printCharacter="";
                if (text.length>0) text[0].en=text[0].enC;
            }
        }
        for (i=0;i<text.length;i++){
            console.log(text.length,text[text.length-1]);
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
            ctx.font="36px Arial";
            ctx.fillStyle="#000000";
            ctx.fillText("GAMEOVER",(canvas.width-218)/2,(canvas.height-36)/2);
            ctx.font="24px Arial";
            ctx.fillText("SCORE:"+typeNumber.all,(canvas.width-160)/2,(canvas.height-36)/2+30);
            clearInterval(interval);
        }
        if (fText.length>0) if (fText[0].y<-39){
            fText.shift();
        }
        if (typeNumber.part>typeNumber.standard/2&&count-examCount<1250){
            if (!examContinue.ing)reExamCount=count-examCount;
            examContinue.ing=true;
        }
        if (typeNumber.part>typeNumber.standard&&count-examCount>2000) examCount=count;
        console.log(examContinue,typeNumber.part,examCount,60-(count-controlCount)/100);
        if (Math.ceil(60-(count-controlCount)/100)>0){
            if (count-examCount<250&&!examContinue.ing){
                if (count==examCount){
                    countInterval/=2;
                    typeNumber.part=0;
                }
                ctx.font="36px Arial";
                ctx.fillStyle="#000000";
                ctx.fillText("試験期間突入",(canvas.width-216)/2,(canvas.height-36)/2);
            }else if (reExamCount+250>count-examCount&&count-examCount>=reExamCount){
                if (examContinue.ing&&!examContinue.ed){
                    if (count-examCount==reExamCount) console.log("突入時タイプ数"+typeNumber.part);
                    if (count-examCount==reExamCount) controlCount=reExamCount;
                    console.log(count-examCount,reExamCount+249,count-examCount==reExamCount+249);
                    if (count-examCount==reExamCount+249){
                        controlCount=0;
                        count-=reExamCount;
                        examContinue.ed=true;
                        reExamCount=1000;
                    }
                    ctx.font="36px Arial";
                    ctx.fillStyle="#000000";
                    ctx.fillText("再試突入",(canvas.width-216)/2,(canvas.height-36)/2);
                }else{
                    if (count-examCount==1000) countInterval*=2;typeNumber.part=0;
                    if (count-examCount==1249) examContinue={ing:false,ed:false};
                    ctx.font="36px Arial";
                    ctx.fillStyle="#000000";
                    ctx.fillText("試験期間終了",(canvas.width-216)/2,(canvas.height-36)/2);
                }
            }
        }
        if (Math.ceil(60-(count-controlCount)/100)<=0){
            console.log("GAMECLEAR");
            ctx.font="36px Arial";
            ctx.fillStyle="#000000";
            ctx.fillText("GAMECLEAR",(canvas.width-249)/2,(canvas.height-36)/2);
            ctx.font="24px Arial";
            ctx.fillText("SCORE:"+typeNumber.all,(canvas.width-160)/2,(canvas.height-36)/2+30);
            clearInterval(interval);
        }
    }
interval=setInterval(main,10);
interval;