import textWarehouse from "./タイピング枠落下.json" assert{type:"json"};
import {enToJn,enInput,enAnswer,enWrite,back,typeNumber} from "./タイピング.js";
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const lineCanvas=document.getElementById("lineCanvas");
const lineCtx=lineCanvas.getContext("2d");
const timeCanvas=document.getElementById("timeCanvas");
const timeCtx=timeCanvas.getContext("2d");
var text=[],fText=[],examContinue={ing:false,ed:false},
    count=0,examCount=-2000,controlCount=0,letter,i,interval,countInterval,reExamCount=1000;
countInterval=300;
    function drawBlock(letter){
        if (enWrite.text!=""&&i==0){
            letter.en=enWrite.text;
        }
        ctx.beginPath();
        ctx.font="24px Arial";
        if (letter.en.length>letter.jn.length*2){
            ctx.rect(letter.x-16,letter.y-51,letter.en.length*12+32,57);
        }else{
            ctx.rect(letter.x-8,letter.y-51,letter.jn.length*24+16,57);
        }
        ctx.lineWidth=1;
        if (i==0) ctx.strokeStyle="#FF0000";
        else ctx.strokeStyle="#000000";  
        ctx.fillStyle="#FFFFFF";
        ctx.fill();ctx.stroke();
        ctx.fillStyle="#000000";
        if (letter.en.length>letter.jn.length*2){
            ctx.fillText(letter.en,letter.x,letter.y);
            ctx.fillText(letter.jn,letter.x+(letter.en.length-letter.jn.length*2)*6,letter.y-24);
        }else{
            ctx.fillText(letter.en,letter.x+(letter.jn.length*2-letter.en.length)*6,letter.y);
            ctx.fillText(letter.jn,letter.x,letter.y-24);
        }
        if (i==0){
            ctx.fillStyle="#FF0000";
            if (letter.en.length>letter.jn.length*2)var tX=letter.x; else var tX=letter.x+(letter.jn.length*2-letter.en.length)*6
            ctx.fillText(enInput.text,tX,letter.y);
            enAnswer.text=letter.enC;
        }
        ctx.closePath();
    }
    function drawText(context,font,letter,x,y){
        context.font="bold "+font;
        context.fillStyle="#FFFFFF";
        context.fillText(letter,x,y);
        context.font=font;
        context.fillStyle="#000000";
        context.fillText(letter,x,y);
    }
    function main(){
        count++;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        lineCtx.clearRect(0,0,lineCanvas.width,lineCanvas.height);
        timeCtx.clearRect(0,0,timeCanvas.width,timeCanvas.height);
        //lineCtx.font="24px Arial";lineCtx.fillStyle="#000000";
        //lineCtx.fillText("60点ライン",36,24);
        drawText(lineCtx,"24px Arial","60点ライン",36,24);
        //lineCtx.fillStyle="#FF0000";
        //lineCtx.fillText("0点ライン",48,510);
        drawText(lineCtx,"24px Arial","0点ライン",48,510);
        //timeCtx.font="24px Arial";timeCtx.fillStyle="#000000";
        //timeCtx.fillText("残り時間:"+Math.ceil(60-(count-controlCount)/100)+"秒",2,24);
        drawText(timeCtx,"24px Arial","残り時間:"+Math.ceil(60-(count-controlCount)/100)+"秒",2,24);
        if (count%countInterval==0){
            var number=Math.floor(Math.random()*textWarehouse.length),textX;
            if (textWarehouse[number].en.length>textWarehouse[number].jn.length*2){
                textX=Math.floor(Math.random()*(canvas.width/1.25-textWarehouse[number].jn.length*24-25))+9;
            }else{
                textX=Math.floor(Math.random()*(canvas.width/1.25-textWarehouse[number].en.length*13-25))+9;
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
        for (i=text.length-1;i>=0;i--){
            //console.log(text.length,text[text.length-1]);
            text[i].y+=0.25;
            console.log(text[i]);
            drawBlock(text[i]);
        }
        for (i=1;i<=fText.length;i++){
            fText[i-1].y-=10;
            drawBlock(fText[i-1]);
        }
        if (fText.length>0) if (fText[0].y<-39){
            fText.push();
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
                drawText(ctx,"36px Arial","試験期間突入",(canvas.width-216)/2,(canvas.height-36)/2)
                /*ctx.font="bold 36px Arial";ctx.fillStyle="#FFFFFF";
                ctx.fillText("試験期間突入",(canvas.width-216)/2,(canvas.height-36)/2);
                ctx.font="36px Arial";ctx.fillStyle="#000000";
                ctx.fillText("試験期間突入",(canvas.width-216)/2,(canvas.height-36)/2);*/
                //ctx.strokeText("試験期間突入",(canvas.width-216)/2,(canvas.height-36)/2);
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
                    drawText(ctx,"36px Arial","再試突入",(canvas.width-216)/2,(canvas.height-36)/2)
                    /*ctx.font="bold 36px Arial";ctx.fillStyle="#FFFFFF";
                    ctx.fillText("再試突入",(canvas.width-216)/2,(canvas.height-36)/2);
                    ctx.font="36px Arial";ctx.fillStyle="#000000";
                    ctx.fillText("再試突入",(canvas.width-216)/2,(canvas.height-36)/2);*/
                    //ctx.strokeText("再試突入",(canvas.width-216)/2,(canvas.height-36)/2);
                }else{
                    if (count-examCount==1000){
                        countInterval*=2;
                        typeNumber.part=0;
                    } 
                    if (count-examCount==1249) examContinue={ing:false,ed:false};
                    drawText(ctx,"36px Arial","試験期間終了",(canvas.width-216)/2,(canvas.height-36)/2)
                    /*ctx.font="bold 36px Arial";ctx.fillStyle="#FFFFFF";
                    ctx.fillText("試験期間終了",(canvas.width-216)/2,(canvas.height-36)/2);
                    ctx.font="36px Arial";ctx.fillStyle="#000000";
                    ctx.fillText("試験期間終了",(canvas.width-216)/2,(canvas.height-36)/2);*/
                    //ctx.strokeText("試験期間終了",(canvas.width-216)/2,(canvas.height-36)/2);
                }
            }
        }
        if (text.length>0) if (text[0].y>512){
            console.log("GAMEOVER");
            drawText(ctx,"36px Arial","留年",(canvas.width-72)/2,(canvas.height-36)/2);
            drawText(ctx,"24px Arial","SCORE:"+typeNumber.all,(canvas.width-136)/2,(canvas.height-36)/2+30);
            /*ctx.font="bold 36px Arial";ctx.fillStyle="#FFFFFF";
            ctx.fillText("GAMEOVER",(canvas.width-218)/2,);
            ctx.font="36px Arial";ctx.fillStyle="#000000";
            ctx.fillText("GAMEOVER",(canvas.width-218)/2,(canvas.height-36)/2);
            ctx.font="bold 24px Arial";ctx.fillStyle="#FFFFFF";
            ctx.fillText("SCORE:"+typeNumber.all,(canvas.width-160)/2,(canvas.height-36)/2+30);
            ctx.font="24px Arial";ctx.fillStyle="#000000";
            ctx.fillText("SCORE:"+typeNumber.all,(canvas.width-160)/2,(canvas.height-36)/2+30);*/
            //ctx.strokeText("SCORE:"+typeNumber.all,(canvas.width-160)/2,(canvas.height-36)/2+30);
            clearInterval(interval);
        }
        if (Math.ceil(60-(count-controlCount)/100)<=0){
            console.log("GAMECLEAR");
            drawText(ctx,"36px Arial","進学",(canvas.width-72)/2,(canvas.height-36)/2);
            drawText(ctx,"24px Arial","SCORE:"+typeNumber.all,(canvas.width-136)/2,(canvas.height-36)/2+30);
            /*ctx.font="bold 36px Arial";ctx.fillStyle="#FFFFFF";
            ctx.fillText("GAMECLEAR",(canvas.width-249)/2,(canvas.height-36)/2);
            ctx.font="36px Arial";ctx.fillStyle="#000000";
            ctx.fillText("GAMECLEAR",(canvas.width-249)/2,(canvas.height-36)/2);
            //ctx.strokeText("GAMECLEAR",(canvas.width-249)/2,(canvas.height-36)/2);
            ctx.font="bold 24px Arial";ctx.fillStyle="#FFFFFF";
            ctx.fillText("SCORE:"+typeNumber.all,(canvas.width-160)/2,(canvas.height-36)/2+30);
            ctx.font="24px Arial";ctx.fillStyle="#000000";
            ctx.fillText("SCORE:"+typeNumber.all,(canvas.width-160)/2,(canvas.height-36)/2+30);*/
            //ctx.strokeText("SCORE:"+typeNumber.all,(canvas.width-160)/2,(canvas.height-36)/2+30);
            clearInterval(interval);
        }
    }
interval=setInterval(main,10);
interval;