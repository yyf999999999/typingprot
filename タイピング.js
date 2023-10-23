
var jn=["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と",
    "な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る","れ","ろ",
    "わ","ゐ","ゑ","を","ん","ヴ","が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ","だ","ぢ","づ","で","ど",
    "ば","び","ぶ","べ","ぼ","ぱ","ぴ","ぷ","ぺ","ぽ","いぇ","うぁ","うぃ","うぇ","うぉ","きゃ","きぃ","きゅ","きぇ","きょ",
    "くぁ","くぃ","くぅ","くぇ","くぉ","くゃ","くゅ","くょ","しゃ","しぃ","しゅ","しぇ","しょ","すぁ","すぃ","すぅ","すぇ","すぉ",
    "ちゃ","ちぃ","ちゅ","ちぇ","ちょ","つぁ","つぃ","つぇ","つぉ","てゃ","てぃ","てゅ","てぇ","てょ",
    "とぁ","とぃ","とぅ","とぇ","とぉ","にゃ","にぃ","にゅ","にぇ","にょ","ひゃ","ひぃ","ひゅ","ひぇ","ひょ",
    "ふぁ","ふぃ","ふぇ","ふぉ","みゃ","みぃ","みゅ","みぇ","みょ","りゃ","りぃ","りゅ","りぇ","りょ","ヴぁ","ヴぃ","ヴぇ","ヴぉ",
    "ぎゃ","ぎぃ","ぎゅ","ぎぇ","ぎょ","ぐぁ","ぐぃ","ぐぅ","ぐぇ","ぐぉ","じゃ","じぃ","じゅ","じぇ","じょ",
    "ぢゃ","ぢぃ","ぢゅ","ぢぇ","ぢょ","でゃ","でぃ","でゅ","でぇ","でょ","どぁ","どぃ","どぅ","どぇ","どぉ",
    "びゃ","びぃ","びゅ","びぇ","びょ","ぴゃ","ぴぃ","ぴゅ","ぴぇ","ぴょ",
    "ぁ","ぃ","ぅ","ぇ","ぉ","ゃ","ゅ","ょ","っ","ゎ","ヵ","ヶ","ー","、","。","・"],
    en=[["a"],["i","yi"],["u","wu","whu"],["e"],["o"],["ka","ca"],["ki"],["ku","qu","cu"],["ke"],["ko","co"],
        ["sa"],["si","shi","ci"],["su"],["se","ce"],["so"],["ta"],["ti","chi"],["tu","tsu"],["te"],["to"],
        ["na"],["ni"],["nu"],["ne"],["no"],["ha"],["hi"],["hu","fu"],["he"],["ho"],["ma"],["mi"],["mu"],["me"],["mo"],
        ["ya"],["yu"],["yo"],["ra"],["ri"],["ru"],["re"],["ro"],["wa"],["wyi"],["wye"],["wo"],["nn","n","xn"],
        ["vu"],["ga"],["gi"],["gu"],["ge"],["go"],["za"],["zi","ji"],["zu"],["ze"],["zo"],
        ["da"],["di"],["du"],["de"],["do"],["ba"],["bi"],["bu"],["be"],["bo"],["pa"],["pi"],["pu"],["pe"],["po"],
        ["ye"],["wha"],["wi","whi"],["we","whe"],["who"],["kya"],["kyi"],["kyu"],["kye"],["kyo"],
        ["qa","qwa","kwa"],["qi","qwi"],["qwu"],["qe","qwe"],["qo","qwo"],["qya"],["qyu"],["qyo"],
        ["sya","sha"],["syi"],["syu","shu"],["sye","she"],["syo","sho"],["swa"],["swi"],["swi"],["swe"],["swo"],
        ["tya","cha","cya"],["tyi","cyi"],["tyu","chu","cyu"],["tye","che","cye"],["tyo","cho","cyo"],
        ["tsa"],["tsi"],["tse"],["tso"],["tha"],["thi"],["thu"],["the"],["tho"],
        ["twa"],["twi"],["twu"],["twe"],["two"],["nya"],["nyi"],["nyu"],["nye"],["nyo"],
        ["hya"],["hyi"],["hyu"],["hye"],["hyo"],["fa"],["fi"],["fe"],["fo"],
        ["mya"],["myi"],["myu"],["mye"],["myo"],["rya"],["ryi"],["ryu"],["rye"],["ryo"],
        ["va"],["vi"],["ve"],["vo"],["gya"],["gyi"],["gyu"],["gye"],["gyo"],["gwa"],["gwi"],["gwu"],["gwe"],["gwo"],
        ["zya","ja","jya"],["zyi","jwi"],["zyu","ju","jyu"],["zye","je","jye"],["zyo","jo","jyo"],
        ["dya"],["dyi"],["dyu"],["dye"],["dyo"],["dha"],["dhi"],["dhu"],["dhe"],["dho"],
        ["dwa"],["dwi"],["dwu"],["dwe"],["dwo"],["bya"],["byi"],["byu"],["bye"],["byo"],
        ["pya"],["pyi"],["pyu"],["pye"],["pyo"],
        ["xa","la"],["xi","li","xyi","lyi"],["xu","lu"],["xe","le","xye","lye"],["xo","lo"],
        ["xya","lya"],["xyu","lyu"],["xyo","lyo"],["xtu","xtsu","ltu","ltsu"],["xwa","lwa"],
        ["xka","lka"],["xke","lke"],["-"],[","],["."],["/"]],
    enCharacter=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p",
                "q","r","s","t","u","v","w","x","y","z","-",",",".","/"],
    jnInput,jnVowel=jn.slice(0,5),enVowel=en.slice(0,5),enInput={text:""},enAnswer={text:"定義可能のはずやのに..."},
    enWrite={text:""},back={printCharacter:"",ans:""},i,j,n;
for (i=0;i<enVowel.length;i++){
    enVowel[i]=enVowel[i][0];
}
function jnToEn(letter){
    var convertText=letter.split("");
    for (i=0;i<convertText.length;i++){
        if (jn.includes(convertText[i]+convertText[i+1])){
            convertText[i]+=convertText[i+1];
            convertText.splice(i+1,1);
        }
        if ((convertText[i]!="っ"||jnVowel.includes(convertText[i+1]))&&jn.includes(convertText[i])){
            convertText[i]=en[jn.indexOf(convertText[i])][0];
        }
        if (convertText[i-1]=="っ"){
            convertText.splice(i-1,1);
            i--;
            convertText[i]=convertText[i].split("")[0].repeat(2)+convertText[i].split("").slice(1).join("");
        }
    }
    return(convertText.join(""));
}
function enToJn(letter){
    var sentence="",sentenceLength=0;
    for (i=0;letter.length!=0;i++){
        var character="",breaker=false;
        while (!breaker){
            if (letter.length!=0){
                character+=letter.split("")[0];
                letter=letter.split("").slice(1).join("");
            }else{
                sentence+=character;
                break;
            }
            if (!enCharacter.includes(character.split("")[0])){
                
                sentence+=character;
                break;
            }
            for (j=0;j<en.length;j++){
                if (en[j].includes(character)&&
                    !(character=="n"&&(enVowel.includes(letter.split("")[0])||letter.split("")[0]=="n"||letter.split("").length==0||letter.split("")[0]=="y"))){
                    sentence+=jn[j];
                    breaker=true;
                    break;
                }else if(character!="n"&&!enVowel.includes(character)&&character==letter.split("")[0]){
                    sentence+="っ";
                    breaker=true;
                    break;
                }
            }
            
        }
    }
    return(sentence);
}
function input(e){
    if (e.key!="Enter"){
        enInput.text+=e.key;
        var inp=enToJn(enInput.text).split(""),ans=enToJn(enAnswer.text).split(""),printCharacter=enInput.text,prChD=false;
        while (inp[0]==ans[0]/*&&jn.includes(inp[0])*/&&ans.length!=0){
            inp=inp.slice(1);ans=ans.slice(1);
        }
        for (i=0;i<inp.length;i++){
            printCharacter=printCharacter.slice(0,-1);
        }
        if (enToJn(enInput.text).slice(0,-1)!==enToJn(enAnswer.text)){
            if (jnVowel.includes(inp.join(""))){
                inp[0]=enVowel[jnVowel.indexOf(inp[0])];
            }
            if (jn.includes(ans[0]+ans[1])){
                var characters=[en[jn.indexOf(ans[0]+ans[1])],en[jn.indexOf(ans[2])]];
                prChD=true;
            }else if (jn.includes(ans[0])){
                var characters=[en[jn.indexOf(ans[0])],en[jn.indexOf(ans[1])]];
            }else{
                var characters=[[ans[0]],[ans[1]]];
            }
            var character,character2,character3,tfC=false,tfI=false;
            if (/*Array.isArray(characters[0])&&*/characters[0][0]){
                for (i=0;i<characters[0].length;i++){
                    tfI=true;
                    character=characters[0][i].split("");
                    for (j=0;j<inp.length;j++){
                        if (ans[0]=="っ"){
                            for (n=0;n<characters[1].length;n++){
                                character2=characters[1][n].split("");
                                if (inp[0]==character2[0]){
                                    character=(character2[0]+character2.join("")).split("");
                                    break;
                                }
                            }
                        }
                        tfI=tfI&&character[j]==inp[j];
                    }
                    if (tfI&&!tfC){
                        if (ans[0]=="っ"){
                            if (inp.length!=0&&character2!=undefined){
                                if (ans.length>2){
                                    if (jn.includes(ans[1]+ans[2])){
                                        character3=en[jn.indexOf(ans[1]+ans[2])];
                                        for (j=0;j<character3.length;j++){
                                            if (character3[j][0]==inp[0]) break;
                                        }
                                        printCharacter+=character3[j][0]+character3[j];
                                        ans.splice(0,2);
                                    }else{
                                        printCharacter+=character2[0]+character2.join("");
                                        ans.splice(0,1);
                                    }
                                }else{
                                    printCharacter+=character2[0]+character2.join("");
                                    ans.splice(0,1);
                                }
                            }else{
                                ans[0]=jnToEn(ans[1])[0];
                                ans.unshift("");
                            }                            
                        }else{
                            printCharacter+=character.join("");
                        }
                        if (prChD) ans.splice(0,1);
                    }
                    tfC=tfC||tfI;
                }
                if (!tfC){
                    enInput.text=enInput.text.slice(0,-1);
                    if (enInput.text.length>0) printCharacter=back.printCharacter;ans=back.ans;
                }
            }
        }else{
            enInput.text=enInput.text.slice(0,-1);
        }
        //console.log(printCharacter,"|",ans.join(""));
        back.ans=JSON.parse(JSON.stringify(ans));back.printCharacter=printCharacter;
        enWrite.text=jnToEn(printCharacter+ans.splice(1).join(""));
        //if (!tfC) console.log("enWrite:"+enWrite)
        //console.log(printCharacter,"|",ans.join(""));
    }
}
enAnswer.text="値変えまーすwww";
document.addEventListener("keypress",input,false);
export {enToJn,enInput,enAnswer,enWrite,back};