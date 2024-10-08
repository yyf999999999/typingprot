import textWarehouse from "./../json/タイピング枠落下.json" with{type:"json"};

import {enToJn,enInput,enAnswer,enWrite,back,typeNumber,music,ring,ringBgm,abgm} from "./タイピング.js";
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");
const lineCanvas=document.getElementById("lineCanvas");
const lineCtx=lineCanvas.getContext("2d");
const timeCanvas=document.getElementById("timeCanvas");
const timeCtx=timeCanvas.getContext("2d");
var text=[],fText=[],examContinue={ing:false,ed:false},
    count=0,examCount=-2000,controlCount=0,letter,i,n,interval,countInterval,reExamCount=1000,
    difficulty=localStorage.getItem('difficulty'),game={now:false,pre:false},time=60,nDifficulty;
nDifficulty=difficulty;
switch (difficulty){
    case "やさしい": {
        countInterval=750;
        typeNumber.standard=20;
        typeNumber.limit=10;
        difficulty="easy";
        break;
    }
    case "普通":{
        countInterval=500;
        typeNumber.standard=50;
        typeNumber.limit=20;
        difficulty="normal";
        break;
    }
    case "難しい":{
        countInterval=300;
        typeNumber.standard=100;
        difficulty="hard";
        break;
    }
    case "地獄":{
        countInterval=200;
        typeNumber.standard=125;
        difficulty="hell";
        break;
    }
}
function finish(result){
    game.now=false;
    var data=JSON.parse(localStorage.getItem("score")),uData=JSON.parse(localStorage.getItem("username"));
    var score=data[difficulty],username=uData[difficulty];
    if (score[4]<typeNumber.all){
        drawOBlock({context:ctx,x:(canvas.width-492)/2-8,y:(canvas.height-36)/2-34,width:516,height:118,fillColor:"#FFFFFF",strokeColor:"#000000"});
        for (i=4;i>=-1;i--){
            if (i==-1)break;
            if (score[i]>=typeNumber.all)break;
        }
        i++;
        //console.log(`i=${i}`);
        for (n=4;n>i;n--){
            score[n]=score[n-1];
            username[n]=username[n-1];
        }
        score[i]=typeNumber.all;username[i]="名無し";
        data[difficulty]=score;uData[difficulty]=username;
        localStorage.setItem("score",JSON.stringify(data));localStorage.setItem("username",JSON.stringify(uData));
        drawText(ctx,"24px Arial","#000000",`第${i+1}位ランクイン!`,(canvas.width-194)/2,(canvas.height-36)/2+56);
        drawText(ctx,"24px Arial","#000000","下のフォームからユーザーネームを入力してね",(canvas.width-492)/2,(canvas.height-36)/2+78);
        localStorage.setItem("rank",i);
        document.getElementById("form").style.display="block";
    }else{
        drawOBlock({context:ctx,x:(canvas.width-196)/2-8,y:(canvas.height-36)/2-34,width:208,height:94,fillColor:"#FFFFFF",strokeColor:"#000000"});
        drawText(ctx,"24px Arial","#000000","ランクインならず",(canvas.width-194)/2,(canvas.height-36)/2+56);
    }
    drawText(ctx,"36px Arial","#000000",result,(canvas.width-72)/2,(canvas.height-36)/2);
    drawText(ctx,"24px Arial","#000000","SCORE:"+typeNumber.all,(canvas.width-136)/2,(canvas.height-36)/2+30);
}
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
function drawText(context,font,color,letter,x,y){
    context.font="bold "+font;
    context.fillStyle="#FFFFFF";
    context.fillText(letter,x,y);
    context.font=font;
    context.fillStyle=color;
    context.fillText(letter,x,y);
}
function drawOBlock(obj){
    obj.context.beginPath();
    obj.context.rect(obj.x,obj.y,obj.width,obj.height);
    obj.context.fillStyle=obj.fillColor;
    obj.context.strokeStyle=obj.strokeColor;
    obj.context.fill();obj.context.stroke();
    obj.context.closePath();
}
function main(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    lineCtx.clearRect(0,0,lineCanvas.width,lineCanvas.height);
    timeCtx.clearRect(0,0,timeCanvas.width,timeCanvas.height);
    drawText(lineCtx,"24px Arial","#000000","60点ライン",60,24);
    drawText(lineCtx,"24px Arial","#FF0000","0点ライン",72,510);
    if (count>=0) drawText(timeCtx,"24px Arial","#000000","残り時間:"+Math.ceil(time-(count-controlCount)/100)+"秒",2,24);
    else drawText(timeCtx,"24px Arial","#000000","残り時間:60秒",2,24);
    drawText(timeCtx,"24px Arial","#000000",`難易度:${nDifficulty}`,2,48);
    drawText(timeCtx,"24px Arial","#000000",`SCORE:${typeNumber.all}`,2,72);
    drawText(timeCtx,"24px Arial","#000000","試験ゲージ",2,474);
    drawOBlock({context:timeCtx,x:2,y:478,width:146,height:32,fillColor:"#FFFFFF",strokeColor:"#000000"});
    if (count-examCount<1000||controlCount!=0){
        if (controlCount!=0||examContinue.ing){
            drawOBlock({context:timeCtx,x:2,y:478,width:146,height:32,fillColor:"#FF0000",strokeColor:"#000000"});
        }else{
            drawOBlock({context:timeCtx,x:2,y:478,width:146*(typeNumber.part/(typeNumber.standard/2)),height:32,fillColor:"#00FF00",strokeColor:"#000000"});
        }
    }else{
        drawOBlock({context:timeCtx,x:2,y:478,width:146*(typeNumber.part/typeNumber.standard),height:32,fillColor:"#0000FF",strokeColor:"#000000"});
    }
    drawText(timeCtx,"24px Arial","#000000","ランキング",2,120);
    var rank=JSON.parse(localStorage.getItem("score"))[difficulty];
    if (rank[4]<typeNumber.all){
        for (i=4;i>=-1;i--){
            if (i==-1)break;
            if (rank[i]>=typeNumber.all)break;
        }
        i++;
        for (n=4;n>i;n--){
            rank[n]=rank[n-1];
        }
        rank[i]=typeNumber.all;
        drawText(timeCtx,"24px Arial","#000000",`現在第${i+1}位`,2,96);
        //console.log(typeNumber.all);
        //console.log(rank);
    }else{
        drawText(timeCtx,"24px Arial","#000000",`現在ランク外`,2,96);
    }
    for (i=0;i<5;i++){
        drawText(timeCtx,"24px Arial","#000000",`${i+1}.${rank[i]}`,2,24*(6+i));
    }
    if (count%countInterval==0){
        var number=0,textX;
        console.log(number,textWarehouse[number].en.length,typeNumber.limit);
        do{
            var number=Math.floor(Math.random()*textWarehouse.length);
        }while (typeNumber.limit<textWarehouse[number].en.length);
        /*while (typeNumber.limit<textWarehouse[number].en.length){
            var number=Math.floor(Math.random()*textWarehouse.length);
        }*/
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
            typeNumber.part++;typeNumber.all++;
            ring(music.input[Math.floor(Math.random()*8)]);
            ring(music.turn);
            enInput.text="";enWrite.text="";enAnswer.text="絶対打てない";
            if (text.length>0) text[0].en=text[0].enC;
        }
    }
    for (i=text.length-1;i>=0;i--){
        text[i].y+=0.25;
        //console.log(text[i]);
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
    //console.log(examContinue,typeNumber.part,examCount,time-(count-controlCount)/100);
    if (Math.ceil(time-(count-controlCount)/100)>0){
        if (count-examCount<250&&!examContinue.ing){
            if (count==examCount){
                ringBgm(music.tbgm);
                countInterval/=2;
                typeNumber.part=0;
            }
            drawText(ctx,"36px Arial","#000000","試験期間突入",(canvas.width-216)/2,(canvas.height-36)/2)
        }else if (reExamCount+250>count-examCount&&count-examCount>=reExamCount){
            if (examContinue.ing&&!examContinue.ed){
                if (count-examCount==reExamCount) //console.log("突入時タイプ数"+typeNumber.part);
                if (count-examCount==reExamCount) {
                    controlCount=reExamCount;
                }
                //console.log(count-examCount,reExamCount+249,count-examCount==reExamCount+249);
                if (count-examCount==reExamCount+249){
                    controlCount=0;
                    count-=reExamCount;
                    examContinue.ed=true;
                    reExamCount=1000;
                }
                drawText(ctx,"36px Arial","#000000","再試突入",(canvas.width-216)/2,(canvas.height-36)/2);
            }else{
                if (count-examCount==1000){
                    countInterval*=2;
                    typeNumber.part=0;
                    ringBgm(music.nbgm);
                } 
                if (count-examCount==1249) examContinue={ing:false,ed:false};
                drawText(ctx,"36px Arial","#000000","試験期間終了",(canvas.width-216)/2,(canvas.height-36)/2);
            }
        }
    }
    if (text.length>0) if (text[0].y>512){
        console.log("GAMEOVER");
        ringBgm(music.gobgm);
        //drawOBlock({context:ctx,x:(canvas.width-492)/2-8,y:(canvas.height-36)/2-34,width:508,height:114,fillColor:"#FFFFFF",strokeColor:"#000000"});
        //drawText(ctx,"36px Arial","#000000","留年",(canvas.width-72)/2,(canvas.height-36)/2);
        //drawText(ctx,"24px Arial","#000000","SCORE:"+typeNumber.all,(canvas.width-136)/2,(canvas.height-36)/2+30);
        clearInterval(interval);
        finish("留年");
    }
    if (Math.ceil(time-(count-controlCount)/100)<=0){
        console.log("GAMECLEAR");
        clearInterval(interval);
        ring(music.gcbgm);
        //drawOBlock({context:ctx,x:(canvas.width-492)/2-8,y:(canvas.height-36)/2-34,width:508,height:114,fillColor:"#FFFFFF",strokeColor:"#000000"});
        //drawText(ctx,"36px Arial","#000000","進級",(canvas.width-72)/2,(canvas.height-36)/2);
        //drawText(ctx,"24px Arial","#000000","SCORE:"+typeNumber.all,(canvas.width-136)/2,(canvas.height-36)/2+30);
        finish("進級");
    }
    count++;
}
export {game};
count=-1;
main();
document.addEventListener("keypress",start,false);
drawText(ctx,"24px Arial","#000000","キーを押して開始",(canvas.width-194)/2,(canvas.height-36)/2);
function start(){
    if (!game.pre){
        game.pre=true;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ring(music.countdown);
        setTimeout(function(){
        interval=setInterval(main,10);
        game.now=true;
        interval;
        abgm[0]=music.nbgm;ring(abgm[0]);
    },3500);
    }
}

