var zm=Object.defineProperty;var Gm=(i,t,e)=>t in i?zm(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var S=(i,t,e)=>Gm(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Zr=function(i,t){let s=i;const r=So[t];let o=null,a=0,c=null;const l=[],h={},u=function(b,C){a=s*4+17,o=(function(x){const y=new Array(x);for(let R=0;R<x;R+=1){y[R]=new Array(x);for(let P=0;P<x;P+=1)y[R][P]=null}return y})(a),f(0,0),f(a-7,0),f(0,a-7),v(),m(),p(b,C),s>=7&&g(b),c==null&&(c=_(s,r,l)),M(c,C)},f=function(b,C){for(let x=-1;x<=7;x+=1)if(!(b+x<=-1||a<=b+x))for(let y=-1;y<=7;y+=1)C+y<=-1||a<=C+y||(0<=x&&x<=6&&(y==0||y==6)||0<=y&&y<=6&&(x==0||x==6)||2<=x&&x<=4&&2<=y&&y<=4?o[b+x][C+y]=!0:o[b+x][C+y]=!1)},d=function(){let b=0,C=0;for(let x=0;x<8;x+=1){u(!0,x);const y=ns.getLostPoint(h);(x==0||b>y)&&(b=y,C=x)}return C},m=function(){for(let b=8;b<a-8;b+=1)o[b][6]==null&&(o[b][6]=b%2==0);for(let b=8;b<a-8;b+=1)o[6][b]==null&&(o[6][b]=b%2==0)},v=function(){const b=ns.getPatternPosition(s);for(let C=0;C<b.length;C+=1)for(let x=0;x<b.length;x+=1){const y=b[C],R=b[x];if(o[y][R]==null)for(let P=-2;P<=2;P+=1)for(let N=-2;N<=2;N+=1)P==-2||P==2||N==-2||N==2||P==0&&N==0?o[y+P][R+N]=!0:o[y+P][R+N]=!1}},g=function(b){const C=ns.getBCHTypeNumber(s);for(let x=0;x<18;x+=1){const y=!b&&(C>>x&1)==1;o[Math.floor(x/3)][x%3+a-8-3]=y}for(let x=0;x<18;x+=1){const y=!b&&(C>>x&1)==1;o[x%3+a-8-3][Math.floor(x/3)]=y}},p=function(b,C){const x=r<<3|C,y=ns.getBCHTypeInfo(x);for(let R=0;R<15;R+=1){const P=!b&&(y>>R&1)==1;R<6?o[R][8]=P:R<8?o[R+1][8]=P:o[a-15+R][8]=P}for(let R=0;R<15;R+=1){const P=!b&&(y>>R&1)==1;R<8?o[8][a-R-1]=P:R<9?o[8][15-R-1+1]=P:o[8][15-R-1]=P}o[a-8][8]=!b},M=function(b,C){let x=-1,y=a-1,R=7,P=0;const N=ns.getMaskFunction(C);for(let B=a-1;B>0;B-=2)for(B==6&&(B-=1);;){for(let X=0;X<2;X+=1)if(o[y][B-X]==null){let V=!1;P<b.length&&(V=(b[P]>>>R&1)==1),N(y,B-X)&&(V=!V),o[y][B-X]=V,R-=1,R==-1&&(P+=1,R=7)}if(y+=x,y<0||a<=y){y-=x,x=-x;break}}},E=function(b,C){let x=0,y=0,R=0;const P=new Array(C.length),N=new Array(C.length);for(let K=0;K<C.length;K+=1){const G=C[K].dataCount,Z=C[K].totalCount-G;y=Math.max(y,G),R=Math.max(R,Z),P[K]=new Array(G);for(let Wt=0;Wt<P[K].length;Wt+=1)P[K][Wt]=255&b.getBuffer()[Wt+x];x+=G;const rt=ns.getErrorCorrectPolynomial(Z),Bt=Po(P[K],rt.getLength()-1).mod(rt);N[K]=new Array(rt.getLength()-1);for(let Wt=0;Wt<N[K].length;Wt+=1){const ne=Wt+Bt.getLength()-N[K].length;N[K][Wt]=ne>=0?Bt.getAt(ne):0}}let B=0;for(let K=0;K<C.length;K+=1)B+=C[K].totalCount;const X=new Array(B);let V=0;for(let K=0;K<y;K+=1)for(let G=0;G<C.length;G+=1)K<P[G].length&&(X[V]=P[G][K],V+=1);for(let K=0;K<R;K+=1)for(let G=0;G<C.length;G+=1)K<N[G].length&&(X[V]=N[G][K],V+=1);return X},_=function(b,C,x){const y=af.getRSBlocks(b,C),R=cf();for(let N=0;N<x.length;N+=1){const B=x[N];R.put(B.getMode(),4),R.put(B.getLength(),ns.getLengthInBits(B.getMode(),b)),B.write(R)}let P=0;for(let N=0;N<y.length;N+=1)P+=y[N].dataCount;if(R.getLengthInBits()>P*8)throw"code length overflow. ("+R.getLengthInBits()+">"+P*8+")";for(R.getLengthInBits()+4<=P*8&&R.put(0,4);R.getLengthInBits()%8!=0;)R.putBit(!1);for(;!(R.getLengthInBits()>=P*8||(R.put(236,8),R.getLengthInBits()>=P*8));)R.put(17,8);return E(R,y)};h.addData=function(b,C){C=C||"Byte";let x=null;switch(C){case"Numeric":x=Hm(b);break;case"Alphanumeric":x=Vm(b);break;case"Byte":x=Wm(b);break;case"Kanji":x=Xm(b);break;default:throw"mode:"+C}l.push(x),c=null},h.isDark=function(b,C){if(b<0||a<=b||C<0||a<=C)throw b+","+C;return o[b][C]},h.getModuleCount=function(){return a},h.make=function(){if(s<1){let b=1;for(;b<40;b++){const C=af.getRSBlocks(b,r),x=cf();for(let R=0;R<l.length;R++){const P=l[R];x.put(P.getMode(),4),x.put(P.getLength(),ns.getLengthInBits(P.getMode(),b)),P.write(x)}let y=0;for(let R=0;R<C.length;R++)y+=C[R].dataCount;if(x.getLengthInBits()<=y*8)break}s=b}u(!1,d())},h.createTableTag=function(b,C){b=b||2,C=typeof C>"u"?b*4:C;let x="";x+='<table style="',x+=" border-width: 0px; border-style: none;",x+=" border-collapse: collapse;",x+=" padding: 0px; margin: "+C+"px;",x+='">',x+="<tbody>";for(let y=0;y<h.getModuleCount();y+=1){x+="<tr>";for(let R=0;R<h.getModuleCount();R+=1)x+='<td style="',x+=" border-width: 0px; border-style: none;",x+=" border-collapse: collapse;",x+=" padding: 0px; margin: 0px;",x+=" width: "+b+"px;",x+=" height: "+b+"px;",x+=" background-color: ",x+=h.isDark(y,R)?"#000000":"#ffffff",x+=";",x+='"/>';x+="</tr>"}return x+="</tbody>",x+="</table>",x},h.createSvgTag=function(b,C,x,y){let R={};typeof arguments[0]=="object"&&(R=arguments[0],b=R.cellSize,C=R.margin,x=R.alt,y=R.title),b=b||2,C=typeof C>"u"?b*4:C,x=typeof x=="string"?{text:x}:x||{},x.text=x.text||null,x.id=x.text?x.id||"qrcode-description":null,y=typeof y=="string"?{text:y}:y||{},y.text=y.text||null,y.id=y.text?y.id||"qrcode-title":null;const P=h.getModuleCount()*b+C*2;let N,B,X,V,K="",G;for(G="l"+b+",0 0,"+b+" -"+b+",0 0,-"+b+"z ",K+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',K+=R.scalable?"":' width="'+P+'px" height="'+P+'px"',K+=' viewBox="0 0 '+P+" "+P+'" ',K+=' preserveAspectRatio="xMinYMin meet"',K+=y.text||x.text?' role="img" aria-labelledby="'+T([y.id,x.id].join(" ").trim())+'"':"",K+=">",K+=y.text?'<title id="'+T(y.id)+'">'+T(y.text)+"</title>":"",K+=x.text?'<description id="'+T(x.id)+'">'+T(x.text)+"</description>":"",K+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',K+='<path d="',X=0;X<h.getModuleCount();X+=1)for(V=X*b+C,N=0;N<h.getModuleCount();N+=1)h.isDark(X,N)&&(B=N*b+C,K+="M"+B+","+V+G);return K+='" stroke="transparent" fill="black"/>',K+="</svg>",K},h.createDataURL=function(b,C){b=b||2,C=typeof C>"u"?b*4:C;const x=h.getModuleCount()*b+C*2,y=C,R=x-C;return $m(x,x,function(P,N){if(y<=P&&P<R&&y<=N&&N<R){const B=Math.floor((P-y)/b),X=Math.floor((N-y)/b);return h.isDark(X,B)?0:1}else return 1})},h.createImgTag=function(b,C,x){b=b||2,C=typeof C>"u"?b*4:C;const y=h.getModuleCount()*b+C*2;let R="";return R+="<img",R+=' src="',R+=h.createDataURL(b,C),R+='"',R+=' width="',R+=y,R+='"',R+=' height="',R+=y,R+='"',x&&(R+=' alt="',R+=T(x),R+='"'),R+="/>",R};const T=function(b){let C="";for(let x=0;x<b.length;x+=1){const y=b.charAt(x);switch(y){case"<":C+="&lt;";break;case">":C+="&gt;";break;case"&":C+="&amp;";break;case'"':C+="&quot;";break;default:C+=y;break}}return C},w=function(b){b=typeof b>"u"?2:b;const x=h.getModuleCount()*1+b*2,y=b,R=x-b;let P,N,B,X,V;const K={"██":"█","█ ":"▀"," █":"▄","  ":" "},G={"██":"▀","█ ":"▀"," █":" ","  ":" "};let Z="";for(P=0;P<x;P+=2){for(B=Math.floor((P-y)/1),X=Math.floor((P+1-y)/1),N=0;N<x;N+=1)V="█",y<=N&&N<R&&y<=P&&P<R&&h.isDark(B,Math.floor((N-y)/1))&&(V=" "),y<=N&&N<R&&y<=P+1&&P+1<R&&h.isDark(X,Math.floor((N-y)/1))?V+=" ":V+="█",Z+=b<1&&P+1>=R?G[V]:K[V];Z+=`
`}return x%2&&b>0?Z.substring(0,Z.length-x-1)+Array(x+1).join("▀"):Z.substring(0,Z.length-1)};return h.createASCII=function(b,C){if(b=b||1,b<2)return w(C);b-=1,C=typeof C>"u"?b*2:C;const x=h.getModuleCount()*b+C*2,y=C,R=x-C;let P,N,B,X;const V=Array(b+1).join("██"),K=Array(b+1).join("  ");let G="",Z="";for(P=0;P<x;P+=1){for(B=Math.floor((P-y)/b),Z="",N=0;N<x;N+=1)X=1,y<=N&&N<R&&y<=P&&P<R&&h.isDark(B,Math.floor((N-y)/b))&&(X=0),Z+=X?V:K;for(B=0;B<b;B+=1)G+=Z+`
`}return G.substring(0,G.length-1)},h.renderTo2dContext=function(b,C){C=C||2;const x=h.getModuleCount();for(let y=0;y<x;y++)for(let R=0;R<x;R++)b.fillStyle=h.isDark(y,R)?"black":"white",b.fillRect(R*C,y*C,C,C)},h};Zr.stringToBytes=function(i){const t=[];for(let e=0;e<i.length;e+=1){const n=i.charCodeAt(e);t.push(n&255)}return t};Zr.createStringToBytes=function(i,t){const e=(function(){const s=Km(i),r=function(){const c=s.read();if(c==-1)throw"eof";return c};let o=0;const a={};for(;;){const c=s.read();if(c==-1)break;const l=r(),h=r(),u=r(),f=String.fromCharCode(c<<8|l),d=h<<8|u;a[f]=d,o+=1}if(o!=t)throw o+" != "+t;return a})(),n=63;return function(s){const r=[];for(let o=0;o<s.length;o+=1){const a=s.charCodeAt(o);if(a<128)r.push(a);else{const c=e[s.charAt(o)];typeof c=="number"?(c&255)==c?r.push(c):(r.push(c>>>8),r.push(c&255)):r.push(n)}}return r}};const Tn={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},So={L:1,M:0,Q:3,H:2},es={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},ns=(function(){const i=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],t=1335,e=7973,n=21522,s={},r=function(o){let a=0;for(;o!=0;)a+=1,o>>>=1;return a};return s.getBCHTypeInfo=function(o){let a=o<<10;for(;r(a)-r(t)>=0;)a^=t<<r(a)-r(t);return(o<<10|a)^n},s.getBCHTypeNumber=function(o){let a=o<<12;for(;r(a)-r(e)>=0;)a^=e<<r(a)-r(e);return o<<12|a},s.getPatternPosition=function(o){return i[o-1]},s.getMaskFunction=function(o){switch(o){case es.PATTERN000:return function(a,c){return(a+c)%2==0};case es.PATTERN001:return function(a,c){return a%2==0};case es.PATTERN010:return function(a,c){return c%3==0};case es.PATTERN011:return function(a,c){return(a+c)%3==0};case es.PATTERN100:return function(a,c){return(Math.floor(a/2)+Math.floor(c/3))%2==0};case es.PATTERN101:return function(a,c){return a*c%2+a*c%3==0};case es.PATTERN110:return function(a,c){return(a*c%2+a*c%3)%2==0};case es.PATTERN111:return function(a,c){return(a*c%3+(a+c)%2)%2==0};default:throw"bad maskPattern:"+o}},s.getErrorCorrectPolynomial=function(o){let a=Po([1],0);for(let c=0;c<o;c+=1)a=a.multiply(Po([1,ps.gexp(c)],0));return a},s.getLengthInBits=function(o,a){if(1<=a&&a<10)switch(o){case Tn.MODE_NUMBER:return 10;case Tn.MODE_ALPHA_NUM:return 9;case Tn.MODE_8BIT_BYTE:return 8;case Tn.MODE_KANJI:return 8;default:throw"mode:"+o}else if(a<27)switch(o){case Tn.MODE_NUMBER:return 12;case Tn.MODE_ALPHA_NUM:return 11;case Tn.MODE_8BIT_BYTE:return 16;case Tn.MODE_KANJI:return 10;default:throw"mode:"+o}else if(a<41)switch(o){case Tn.MODE_NUMBER:return 14;case Tn.MODE_ALPHA_NUM:return 13;case Tn.MODE_8BIT_BYTE:return 16;case Tn.MODE_KANJI:return 12;default:throw"mode:"+o}else throw"type:"+a},s.getLostPoint=function(o){const a=o.getModuleCount();let c=0;for(let u=0;u<a;u+=1)for(let f=0;f<a;f+=1){let d=0;const m=o.isDark(u,f);for(let v=-1;v<=1;v+=1)if(!(u+v<0||a<=u+v))for(let g=-1;g<=1;g+=1)f+g<0||a<=f+g||v==0&&g==0||m==o.isDark(u+v,f+g)&&(d+=1);d>5&&(c+=3+d-5)}for(let u=0;u<a-1;u+=1)for(let f=0;f<a-1;f+=1){let d=0;o.isDark(u,f)&&(d+=1),o.isDark(u+1,f)&&(d+=1),o.isDark(u,f+1)&&(d+=1),o.isDark(u+1,f+1)&&(d+=1),(d==0||d==4)&&(c+=3)}for(let u=0;u<a;u+=1)for(let f=0;f<a-6;f+=1)o.isDark(u,f)&&!o.isDark(u,f+1)&&o.isDark(u,f+2)&&o.isDark(u,f+3)&&o.isDark(u,f+4)&&!o.isDark(u,f+5)&&o.isDark(u,f+6)&&(c+=40);for(let u=0;u<a;u+=1)for(let f=0;f<a-6;f+=1)o.isDark(f,u)&&!o.isDark(f+1,u)&&o.isDark(f+2,u)&&o.isDark(f+3,u)&&o.isDark(f+4,u)&&!o.isDark(f+5,u)&&o.isDark(f+6,u)&&(c+=40);let l=0;for(let u=0;u<a;u+=1)for(let f=0;f<a;f+=1)o.isDark(f,u)&&(l+=1);const h=Math.abs(100*l/a/a-50)/5;return c+=h*10,c},s})(),ps=(function(){const i=new Array(256),t=new Array(256);for(let n=0;n<8;n+=1)i[n]=1<<n;for(let n=8;n<256;n+=1)i[n]=i[n-4]^i[n-5]^i[n-6]^i[n-8];for(let n=0;n<255;n+=1)t[i[n]]=n;const e={};return e.glog=function(n){if(n<1)throw"glog("+n+")";return t[n]},e.gexp=function(n){for(;n<0;)n+=255;for(;n>=256;)n-=255;return i[n]},e})(),Po=function(i,t){if(typeof i.length>"u")throw i.length+"/"+t;const e=(function(){let s=0;for(;s<i.length&&i[s]==0;)s+=1;const r=new Array(i.length-s+t);for(let o=0;o<i.length-s;o+=1)r[o]=i[o+s];return r})(),n={};return n.getAt=function(s){return e[s]},n.getLength=function(){return e.length},n.multiply=function(s){const r=new Array(n.getLength()+s.getLength()-1);for(let o=0;o<n.getLength();o+=1)for(let a=0;a<s.getLength();a+=1)r[o+a]^=ps.gexp(ps.glog(n.getAt(o))+ps.glog(s.getAt(a)));return Po(r,0)},n.mod=function(s){if(n.getLength()-s.getLength()<0)return n;const r=ps.glog(n.getAt(0))-ps.glog(s.getAt(0)),o=new Array(n.getLength());for(let a=0;a<n.getLength();a+=1)o[a]=n.getAt(a);for(let a=0;a<s.getLength();a+=1)o[a]^=ps.gexp(ps.glog(s.getAt(a))+r);return Po(o,0).mod(s)},n},af=(function(){const i=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(s,r){const o={};return o.totalCount=s,o.dataCount=r,o},e={},n=function(s,r){switch(r){case So.L:return i[(s-1)*4+0];case So.M:return i[(s-1)*4+1];case So.Q:return i[(s-1)*4+2];case So.H:return i[(s-1)*4+3];default:return}};return e.getRSBlocks=function(s,r){const o=n(s,r);if(typeof o>"u")throw"bad rs block @ typeNumber:"+s+"/errorCorrectionLevel:"+r;const a=o.length/3,c=[];for(let l=0;l<a;l+=1){const h=o[l*3+0],u=o[l*3+1],f=o[l*3+2];for(let d=0;d<h;d+=1)c.push(t(u,f))}return c},e})(),cf=function(){const i=[];let t=0;const e={};return e.getBuffer=function(){return i},e.getAt=function(n){const s=Math.floor(n/8);return(i[s]>>>7-n%8&1)==1},e.put=function(n,s){for(let r=0;r<s;r+=1)e.putBit((n>>>s-r-1&1)==1)},e.getLengthInBits=function(){return t},e.putBit=function(n){const s=Math.floor(t/8);i.length<=s&&i.push(0),n&&(i[s]|=128>>>t%8),t+=1},e},Hm=function(i){const t=Tn.MODE_NUMBER,e=i,n={};n.getMode=function(){return t},n.getLength=function(o){return e.length},n.write=function(o){const a=e;let c=0;for(;c+2<a.length;)o.put(s(a.substring(c,c+3)),10),c+=3;c<a.length&&(a.length-c==1?o.put(s(a.substring(c,c+1)),4):a.length-c==2&&o.put(s(a.substring(c,c+2)),7))};const s=function(o){let a=0;for(let c=0;c<o.length;c+=1)a=a*10+r(o.charAt(c));return a},r=function(o){if("0"<=o&&o<="9")return o.charCodeAt(0)-48;throw"illegal char :"+o};return n},Vm=function(i){const t=Tn.MODE_ALPHA_NUM,e=i,n={};n.getMode=function(){return t},n.getLength=function(r){return e.length},n.write=function(r){const o=e;let a=0;for(;a+1<o.length;)r.put(s(o.charAt(a))*45+s(o.charAt(a+1)),11),a+=2;a<o.length&&r.put(s(o.charAt(a)),6)};const s=function(r){if("0"<=r&&r<="9")return r.charCodeAt(0)-48;if("A"<=r&&r<="Z")return r.charCodeAt(0)-65+10;switch(r){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+r}};return n},Wm=function(i){const t=Tn.MODE_8BIT_BYTE,e=Zr.stringToBytes(i),n={};return n.getMode=function(){return t},n.getLength=function(s){return e.length},n.write=function(s){for(let r=0;r<e.length;r+=1)s.put(e[r],8)},n},Xm=function(i){const t=Tn.MODE_KANJI,e=Zr.stringToBytes;(function(r,o){const a=e(r);if(a.length!=2||(a[0]<<8|a[1])!=o)throw"sjis not supported."})("友",38726);const n=e(i),s={};return s.getMode=function(){return t},s.getLength=function(r){return~~(n.length/2)},s.write=function(r){const o=n;let a=0;for(;a+1<o.length;){let c=(255&o[a])<<8|255&o[a+1];if(33088<=c&&c<=40956)c-=33088;else if(57408<=c&&c<=60351)c-=49472;else throw"illegal char at "+(a+1)+"/"+c;c=(c>>>8&255)*192+(c&255),r.put(c,13),a+=2}if(a<o.length)throw"illegal char at "+(a+1)},s},R0=function(){const i=[],t={};return t.writeByte=function(e){i.push(e&255)},t.writeShort=function(e){t.writeByte(e),t.writeByte(e>>>8)},t.writeBytes=function(e,n,s){n=n||0,s=s||e.length;for(let r=0;r<s;r+=1)t.writeByte(e[r+n])},t.writeString=function(e){for(let n=0;n<e.length;n+=1)t.writeByte(e.charCodeAt(n))},t.toByteArray=function(){return i},t.toString=function(){let e="";e+="[";for(let n=0;n<i.length;n+=1)n>0&&(e+=","),e+=i[n];return e+="]",e},t},Ym=function(){let i=0,t=0,e=0,n="";const s={},r=function(a){n+=String.fromCharCode(o(a&63))},o=function(a){if(a<0)throw"n:"+a;if(a<26)return 65+a;if(a<52)return 97+(a-26);if(a<62)return 48+(a-52);if(a==62)return 43;if(a==63)return 47;throw"n:"+a};return s.writeByte=function(a){for(i=i<<8|a&255,t+=8,e+=1;t>=6;)r(i>>>t-6),t-=6},s.flush=function(){if(t>0&&(r(i<<6-t),i=0,t=0),e%3!=0){const a=3-e%3;for(let c=0;c<a;c+=1)n+="="}},s.toString=function(){return n},s},Km=function(i){const t=i;let e=0,n=0,s=0;const r={};r.read=function(){for(;s<8;){if(e>=t.length){if(s==0)return-1;throw"unexpected end of file./"+s}const c=t.charAt(e);if(e+=1,c=="=")return s=0,-1;if(c.match(/^\s$/))continue;n=n<<6|o(c.charCodeAt(0)),s+=6}const a=n>>>s-8&255;return s-=8,a};const o=function(a){if(65<=a&&a<=90)return a-65;if(97<=a&&a<=122)return a-97+26;if(48<=a&&a<=57)return a-48+52;if(a==43)return 62;if(a==47)return 63;throw"c:"+a};return r},qm=function(i,t){const e=i,n=t,s=new Array(i*t),r={};r.setPixel=function(l,h,u){s[h*e+l]=u},r.write=function(l){l.writeString("GIF87a"),l.writeShort(e),l.writeShort(n),l.writeByte(128),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(255),l.writeByte(255),l.writeByte(255),l.writeString(","),l.writeShort(0),l.writeShort(0),l.writeShort(e),l.writeShort(n),l.writeByte(0);const h=2,u=a(h);l.writeByte(h);let f=0;for(;u.length-f>255;)l.writeByte(255),l.writeBytes(u,f,255),f+=255;l.writeByte(u.length-f),l.writeBytes(u,f,u.length-f),l.writeByte(0),l.writeString(";")};const o=function(l){const h=l;let u=0,f=0;const d={};return d.write=function(m,v){if(m>>>v)throw"length over";for(;u+v>=8;)h.writeByte(255&(m<<u|f)),v-=8-u,m>>>=8-u,f=0,u=0;f=m<<u|f,u=u+v},d.flush=function(){u>0&&h.writeByte(f)},d},a=function(l){const h=1<<l,u=(1<<l)+1;let f=l+1;const d=c();for(let M=0;M<h;M+=1)d.add(String.fromCharCode(M));d.add(String.fromCharCode(h)),d.add(String.fromCharCode(u));const m=R0(),v=o(m);v.write(h,f);let g=0,p=String.fromCharCode(s[g]);for(g+=1;g<s.length;){const M=String.fromCharCode(s[g]);g+=1,d.contains(p+M)?p=p+M:(v.write(d.indexOf(p),f),d.size()<4095&&(d.size()==1<<f&&(f+=1),d.add(p+M)),p=M)}return v.write(d.indexOf(p),f),v.write(u,f),v.flush(),m.toByteArray()},c=function(){const l={};let h=0;const u={};return u.add=function(f){if(u.contains(f))throw"dup key:"+f;l[f]=h,h+=1},u.size=function(){return h},u.indexOf=function(f){return l[f]},u.contains=function(f){return typeof l[f]<"u"},u};return r},$m=function(i,t,e){const n=qm(i,t);for(let a=0;a<t;a+=1)for(let c=0;c<i;c+=1)n.setPixel(c,a,e(c,a));const s=R0();n.write(s);const r=Ym(),o=s.toByteArray();for(let a=0;a<o.length;a+=1)r.writeByte(o[a]);return r.flush(),"data:image/gif;base64,"+r};Zr.stringToBytes;const C0="Mincraft",Mt=16,Se=128,jm=Mt*Mt*Se,mn=46,L0=24e3,Wc=6,Zm=16;function Ae(i,t,e){return(t*Mt+e)*Mt+i}function rn(i,t){return`${i},${t}`}const hu=10,Ye=(1<<hu)-1,Lt=i=>i&Ye,Rs=i=>i>>>hu,gn=(i,t=0)=>(i|t<<hu)&65535,Xo=[[0,0,-1],[1,0,0],[0,0,1],[-1,0,0]],eh=[5,0,4,1],Pr=i=>i+2&3,A={AIR:0,STONE:1,GRASS:2,DIRT:3,COBBLESTONE:4,OAK_PLANKS:5,BIRCH_PLANKS:6,SPRUCE_PLANKS:7,OAK_LOG:8,BIRCH_LOG:9,SPRUCE_LOG:10,OAK_LEAVES:11,BIRCH_LEAVES:12,SPRUCE_LEAVES:13,SAND:14,GRAVEL:15,SANDSTONE:16,GLASS:17,BEDROCK:18,WATER:19,LAVA:20,COAL_ORE:21,IRON_ORE:22,GOLD_ORE:23,DIAMOND_ORE:24,SNOW_BLOCK:25,SNOWY_GRASS:26,ICE:27,CACTUS:28,TALL_GRASS:29,DANDELION:30,POPPY:31,DEAD_BUSH:32,BRICKS:33,STONE_BRICKS:34,MOSSY_COBBLESTONE:35,OBSIDIAN:36,BOOKSHELF:37,GLOWSTONE:38,WHITE_WOOL:39,RED_WOOL:40,PINK_WOOL:41,YELLOW_WOOL:42,GREEN_WOOL:43,BLUE_WOOL:44,PURPLE_WOOL:45,BLACK_WOOL:46,CRAFTING_TABLE:47,FURNACE:48,LIT_FURNACE:49,CHEST:50,TORCH:51,LADDER:52,OAK_DOOR:53,OAK_FENCE:54,OAK_SLAB:55,COBBLESTONE_SLAB:56,STONE_SLAB:57,OAK_STAIRS:58,COBBLESTONE_STAIRS:59,STONE_BRICK_STAIRS:60,BED:61,FARMLAND:62,WHEAT:63,OAK_SAPLING:64,BIRCH_SAPLING:65,SPRUCE_SAPLING:66,TNT:67,IRON_BLOCK:68,GOLD_BLOCK:69,DIAMOND_BLOCK:70,GLASS_PANE:71,OAK_TRAPDOOR:72,OAK_FENCE_GATE:73,PUMPKIN:74,JACK_O_LANTERN:75,SUGAR_CANE:76},D0=286,P0=287,I0=273,Ut=i=>()=>i,Ls=(i,t,e=t)=>(n,s)=>s===2?t:s===3?e:i,uu=(i,t)=>(e,n)=>{const s=e&3;return(s===1?n<=1:s===2?n>=4:n===2||n===3)?t:i},Yo=(i,t,e,n=e)=>(s,r)=>r===2?e:r===3?n:r===eh[s&3]?i:t,Jm={shape:"cube",layer:"opaque",solid:!0,fullCube:!0,opacity:15,light:0,hardness:1,tool:null,harvestLevel:-1,sound:"stone",replaceable:!1,gravity:!1,climbable:!1,wave:0,cullSame:!1},Ko=[];function ft(i,t,e,n,s={}){const r={...Jm,key:t,name:e,tiles:n,item:i,...s};(r.shape!=="cube"||r.layer!=="opaque")&&s.fullCube===void 0&&(r.fullCube=!1),!r.fullCube&&s.opacity===void 0&&(r.opacity=0),Ko[i]=r}const Zi=(i={})=>({shape:"cross",layer:"cutout",solid:!1,hardness:0,sound:"grass",wave:2,...i}),fu={layer:"cutout",opacity:1,hardness:.2,tool:"shears",sound:"grass",wave:1},On={hardness:2,tool:"axe",sound:"wood"},nn=(i,t=0)=>({hardness:i,tool:"pickaxe",harvestLevel:t,sound:"stone"}),Ds={hardness:.8,tool:"shears",sound:"wool"};ft(A.AIR,"air","Воздух",Ut(""),{shape:"none",solid:!1,fullCube:!1,hardness:0,replaceable:!0,item:null});ft(A.STONE,"stone","Камень",Ut("stone"),nn(1.5));ft(A.GRASS,"grass","Дёрн",Ls("grass_side","grass_top","dirt"),{hardness:.6,tool:"shovel",sound:"grass"});ft(A.DIRT,"dirt","Земля",Ut("dirt"),{hardness:.5,tool:"shovel",sound:"gravel"});ft(A.COBBLESTONE,"cobblestone","Булыжник",Ut("cobblestone"),nn(2));ft(A.OAK_PLANKS,"oak_planks","Дубовые доски",Ut("oak_planks"),On);ft(A.BIRCH_PLANKS,"birch_planks","Берёзовые доски",Ut("birch_planks"),On);ft(A.SPRUCE_PLANKS,"spruce_planks","Еловые доски",Ut("spruce_planks"),On);ft(A.OAK_LOG,"oak_log","Дубовое бревно",uu("oak_log","oak_log_top"),On);ft(A.BIRCH_LOG,"birch_log","Берёзовое бревно",uu("birch_log","birch_log_top"),On);ft(A.SPRUCE_LOG,"spruce_log","Еловое бревно",uu("spruce_log","spruce_log_top"),On);ft(A.OAK_LEAVES,"oak_leaves","Дубовая листва",Ut("oak_leaves"),fu);ft(A.BIRCH_LEAVES,"birch_leaves","Берёзовая листва",Ut("birch_leaves"),fu);ft(A.SPRUCE_LEAVES,"spruce_leaves","Еловая хвоя",Ut("spruce_leaves"),fu);ft(A.SAND,"sand","Песок",Ut("sand"),{hardness:.5,tool:"shovel",sound:"sand",gravity:!0});ft(A.GRAVEL,"gravel","Гравий",Ut("gravel"),{hardness:.6,tool:"shovel",sound:"gravel",gravity:!0});ft(A.SANDSTONE,"sandstone","Песчаник",Ls("sandstone_side","sandstone_top","sandstone_bottom"),nn(.8));ft(A.GLASS,"glass","Стекло",Ut("glass"),{layer:"cutout",hardness:.3,sound:"glass",cullSame:!0});ft(A.BEDROCK,"bedrock","Коренная порода",Ut("bedrock"),{hardness:-1});ft(A.WATER,"water","Вода",(i,t)=>t===2&&!(i&8)&&(i&7)===0?"water_still":"water_flow",{shape:"fluid",layer:"translucent",solid:!1,opacity:2,hardness:-1,replaceable:!0,item:null});ft(A.LAVA,"lava","Лава",(i,t)=>t===2&&!(i&8)&&(i&7)===0?"lava_still":"lava_flow",{shape:"fluid",layer:"opaque",solid:!1,opacity:1,light:15,hardness:-1,replaceable:!0,item:null});ft(A.COAL_ORE,"coal_ore","Угольная руда",Ut("coal_ore"),nn(3,0));ft(A.IRON_ORE,"iron_ore","Железная руда",Ut("iron_ore"),nn(3,1));ft(A.GOLD_ORE,"gold_ore","Золотая руда",Ut("gold_ore"),nn(3,2));ft(A.DIAMOND_ORE,"diamond_ore","Алмазная руда",Ut("diamond_ore"),nn(3,2));ft(A.SNOW_BLOCK,"snow_block","Снег",Ut("snow"),{hardness:.2,tool:"shovel",sound:"snow"});ft(A.SNOWY_GRASS,"snowy_grass","Заснеженный дёрн",Ls("snowy_grass_side","snow","dirt"),{hardness:.6,tool:"shovel",sound:"snow"});ft(A.ICE,"ice","Лёд",Ut("ice"),{layer:"translucent",opacity:2,hardness:.5,tool:"pickaxe",sound:"glass",cullSame:!0});ft(A.CACTUS,"cactus","Кактус",Ls("cactus_side","cactus_top","cactus_bottom"),{shape:"cactus",layer:"cutout",hardness:.4,sound:"wool"});ft(A.TALL_GRASS,"tall_grass","Высокая трава",Ut("tall_grass"),Zi({replaceable:!0}));ft(A.DANDELION,"dandelion","Одуванчик",Ut("dandelion"),Zi());ft(A.POPPY,"poppy","Мак",Ut("poppy"),Zi());ft(A.DEAD_BUSH,"dead_bush","Сухой куст",Ut("dead_bush"),Zi({replaceable:!0,wave:0}));ft(A.BRICKS,"bricks","Кирпичи",Ut("bricks"),nn(2));ft(A.STONE_BRICKS,"stone_bricks","Каменные кирпичи",Ut("stone_bricks"),nn(1.5));ft(A.MOSSY_COBBLESTONE,"mossy_cobblestone","Замшелый булыжник",Ut("mossy_cobblestone"),nn(2));ft(A.OBSIDIAN,"obsidian","Обсидиан",Ut("obsidian"),nn(50,3));ft(A.BOOKSHELF,"bookshelf","Книжная полка",Ls("bookshelf","oak_planks"),{...On,hardness:1.5});ft(A.GLOWSTONE,"glowstone","Светокамень",Ut("glowstone"),{hardness:.3,sound:"glass",light:15});ft(A.WHITE_WOOL,"white_wool","Белая шерсть",Ut("wool_white"),Ds);ft(A.RED_WOOL,"red_wool","Красная шерсть",Ut("wool_red"),Ds);ft(A.PINK_WOOL,"pink_wool","Розовая шерсть",Ut("wool_pink"),Ds);ft(A.YELLOW_WOOL,"yellow_wool","Жёлтая шерсть",Ut("wool_yellow"),Ds);ft(A.GREEN_WOOL,"green_wool","Зелёная шерсть",Ut("wool_green"),Ds);ft(A.BLUE_WOOL,"blue_wool","Синяя шерсть",Ut("wool_blue"),Ds);ft(A.PURPLE_WOOL,"purple_wool","Фиолетовая шерсть",Ut("wool_purple"),Ds);ft(A.BLACK_WOOL,"black_wool","Чёрная шерсть",Ut("wool_black"),Ds);ft(A.CRAFTING_TABLE,"crafting_table","Верстак",(i,t)=>t===2?"crafting_table_top":t===3?"oak_planks":t>=4?"crafting_table_front":"crafting_table_side",{...On,hardness:2.5});ft(A.FURNACE,"furnace","Печь",Yo("furnace_front","furnace_side","furnace_top"),nn(3.5));ft(A.LIT_FURNACE,"lit_furnace","Горящая печь",Yo("furnace_front_lit","furnace_side","furnace_top"),{...nn(3.5),light:13,item:A.FURNACE});ft(A.CHEST,"chest","Сундук",Yo("chest_front","chest_side","chest_top"),{...On,shape:"chest",hardness:2.5});ft(A.TORCH,"torch","Факел",Ut("torch"),{shape:"torch",layer:"cutout",solid:!1,hardness:0,light:14,sound:"wood"});ft(A.LADDER,"ladder","Лестница",Ut("ladder"),{shape:"ladder",layer:"cutout",hardness:.4,tool:"axe",sound:"wood",climbable:!0});ft(A.OAK_DOOR,"oak_door","Дубовая дверь",i=>i&8?"door_top":"door_bottom",{...On,shape:"door",layer:"cutout",hardness:3,item:D0});ft(A.OAK_FENCE,"oak_fence","Дубовый забор",Ut("oak_planks"),{...On,shape:"fence"});ft(A.OAK_SLAB,"oak_slab","Дубовая плита",Ut("oak_planks"),{...On,shape:"slab"});ft(A.COBBLESTONE_SLAB,"cobblestone_slab","Булыжная плита",Ut("cobblestone"),{...nn(2),shape:"slab"});ft(A.STONE_SLAB,"stone_slab","Каменная плита",Ls("stone_slab_side","stone_slab_top"),{...nn(2),shape:"slab"});ft(A.OAK_STAIRS,"oak_stairs","Дубовые ступеньки",Ut("oak_planks"),{...On,shape:"stairs"});ft(A.COBBLESTONE_STAIRS,"cobblestone_stairs","Булыжные ступеньки",Ut("cobblestone"),{...nn(2),shape:"stairs"});ft(A.STONE_BRICK_STAIRS,"stone_brick_stairs","Ступеньки из каменных кирпичей",Ut("stone_bricks"),{...nn(1.5),shape:"stairs"});ft(A.BED,"bed","Кровать",(i,t)=>{const e=(i&4)!==0,n=i&3;return t===2?e?"bed_head_top":"bed_foot_top":t===3?"oak_planks":t===eh[n]?e?"bed_head_end":"bed_foot_side":t===eh[Pr(n)]?e?"bed_head_side":"bed_foot_end":e?"bed_head_side":"bed_foot_side"},{shape:"bed",layer:"cutout",hardness:.2,sound:"wood",item:P0,topRotation:i=>i&3});ft(A.FARMLAND,"farmland","Грядка",Ls("dirt","farmland_top","dirt"),{shape:"farmland",hardness:.6,tool:"shovel",sound:"gravel",item:A.DIRT});ft(A.WHEAT,"wheat","Пшеница",i=>`wheat_${Math.min(7,i&7)}`,{...Zi(),shape:"crop",item:I0});ft(A.OAK_SAPLING,"oak_sapling","Саженец дуба",Ut("oak_sapling"),Zi());ft(A.BIRCH_SAPLING,"birch_sapling","Саженец берёзы",Ut("birch_sapling"),Zi());ft(A.SPRUCE_SAPLING,"spruce_sapling","Саженец ели",Ut("spruce_sapling"),Zi());ft(A.TNT,"tnt","Динамит",Ls("tnt_side","tnt_top","tnt_bottom"),{hardness:0,sound:"grass"});ft(A.IRON_BLOCK,"iron_block","Железный блок",Ut("iron_block"),{...nn(5,1),sound:"metal"});ft(A.GOLD_BLOCK,"gold_block","Золотой блок",Ut("gold_block"),{...nn(3,2),sound:"metal"});ft(A.DIAMOND_BLOCK,"diamond_block","Алмазный блок",Ut("diamond_block"),{...nn(5,2),sound:"metal"});ft(A.GLASS_PANE,"glass_pane","Стеклянная панель",(i,t)=>t===2||t===3?"glass_pane_top":"glass",{shape:"pane",layer:"cutout",hardness:.3,sound:"glass"});ft(A.OAK_TRAPDOOR,"oak_trapdoor","Дубовый люк",Ut("trapdoor"),{...On,shape:"trapdoor",layer:"cutout",hardness:3});ft(A.OAK_FENCE_GATE,"oak_fence_gate","Дубовая калитка",Ut("oak_planks"),{...On,shape:"gate"});ft(A.PUMPKIN,"pumpkin","Тыква",Yo("pumpkin_face","pumpkin_side","pumpkin_top"),{hardness:1,tool:"axe",sound:"wood"});ft(A.JACK_O_LANTERN,"jack_o_lantern","Светильник Джека",Yo("jack_o_lantern","pumpkin_side","pumpkin_top"),{hardness:1,tool:"axe",sound:"wood",light:15});ft(A.SUGAR_CANE,"sugar_cane","Сахарный тростник",Ut("sugar_cane"),Zi({wave:0}));const ui=Ko.length,Ze=Ko,Qm=["none","cube","cross","crop","fluid","torch","slab","stairs","door","ladder","fence","bed","farmland","cactus","chest","pane","trapdoor","gate"],Jr=0,Tc=1,Qr=2,qo=3,to=4,eo=5,Ao=6,k0=7,du=8,no=9,pu=10,mu=11,N0=12,U0=13,nh=14,O0=15,gu=16,Ac=17,tg=0,F0=1,B0=2,eg=new Set(["glowstone","lava_still","lava_flow","furnace_front_lit","torch","jack_o_lantern"]),ng=["water_still","water_flow","lava_still","lava_flow",...Array.from({length:10},(i,t)=>`destroy_${t}`)],Gr=[],ih=new Map,z0=i=>{!i||ih.has(i)||(ih.set(i,Gr.length),Gr.push(i))};for(const i of Ko)for(let t=0;t<64;t++)for(let e=0;e<6;e++)z0(i.tiles(t,e));ng.forEach(z0);const vu=i=>ih.get(i)??0,bn=new Uint8Array(ui),G0=new Uint8Array(ui),Hr=new Uint8Array(ui),Ke=new Uint8Array(ui),Rc=new Uint8Array(ui),_u=new Uint8Array(ui),sh=new Uint8Array(ui),H0=new Uint8Array(ui),kr=new Uint8Array(ui),Nn=new Uint8Array(ui*64*6),V0=new Uint8Array(ui*64),$o=new Uint8Array(Gr.length);Ko.forEach((i,t)=>{bn[t]=Qm.indexOf(i.shape),G0[t]=i.layer==="opaque"?tg:i.layer==="cutout"?F0:B0,Hr[t]=i.solid?1:0,Ke[t]=i.fullCube?1:0,Rc[t]=i.opacity,_u[t]=i.light,sh[t]=i.wave,H0[t]=i.cullSame?1:0,kr[t]=i.replaceable?1:0;for(let e=0;e<64;e++){for(let n=0;n<6;n++)Nn[t*384+e*6+n]=vu(i.tiles(e,n));V0[t*64+e]=i.topRotation?i.topRotation(e)&3:0}});Gr.forEach((i,t)=>$o[t]=eg.has(i)?1:0);const ig=i=>Lt(i)===A.WATER,Ro=i=>bn[Lt(i)]===to,sg=i=>Rs(i)&7,rg=i=>(Rs(i)&8)!==0;function ac(i){if(rg(i))return 1;const t=sg(i);return t===0?.875:Math.max(.12,(8-t)/9*.95)}const lf={[A.OAK_SLAB]:A.OAK_PLANKS,[A.COBBLESTONE_SLAB]:A.COBBLESTONE,[A.STONE_SLAB]:A.STONE};function og(i,t,e,n){const s=Lt(i(t,e-1,n));if(s===A.SUGAR_CANE)return!0;if(s!==A.GRASS&&s!==A.DIRT&&s!==A.SAND&&s!==A.SNOWY_GRASS)return!1;for(const[r,,o]of Xo)if(ig(i(t+r,e-1,n+o)))return!0;return!1}const j={STICK:256,COAL:257,CHARCOAL:258,IRON_INGOT:259,GOLD_INGOT:260,DIAMOND:261,FLINT:262,FLINT_AND_STEEL:263,STRING:264,FEATHER:265,GUNPOWDER:266,BONE:267,BONE_MEAL:268,ARROW:269,BOW:270,LEATHER:271,ROTTEN_FLESH:272,WHEAT_SEEDS:I0,WHEAT:274,BREAD:275,APPLE:276,PORKCHOP:277,COOKED_PORKCHOP:278,BEEF:279,STEAK:280,CHICKEN:281,COOKED_CHICKEN:282,BUCKET:283,WATER_BUCKET:284,LAVA_BUCKET:285,OAK_DOOR:D0,BED:P0,SHEARS:288,RED_DYE:289,YELLOW_DYE:290,MUTTON:291,COOKED_MUTTON:292,PAPER:293,BOOK:294},io=new Map;function Cc(i){io.set(i.id,{maxStack:64,...i})}const ag=new Set([A.AIR,A.WATER,A.LAVA,A.LIT_FURNACE,A.OAK_DOOR,A.BED,A.WHEAT]),cg={[A.OAK_PLANKS]:300,[A.BIRCH_PLANKS]:300,[A.SPRUCE_PLANKS]:300,[A.OAK_LOG]:300,[A.BIRCH_LOG]:300,[A.SPRUCE_LOG]:300,[A.OAK_SLAB]:150,[A.OAK_STAIRS]:300,[A.OAK_FENCE]:300,[A.CRAFTING_TABLE]:300,[A.CHEST]:300,[A.BOOKSHELF]:300,[A.LADDER]:300,[A.OAK_TRAPDOOR]:300,[A.OAK_FENCE_GATE]:300,[A.OAK_SAPLING]:100,[A.BIRCH_SAPLING]:100,[A.SPRUCE_SAPLING]:100};for(let i=0;i<ui;i++){if(ag.has(i))continue;const t=Ze[i];Cc({id:i,key:t.key,name:t.name,places:gn(i),fuel:cg[i],hidden:i===A.FARMLAND||i===A.SNOWY_GRASS})}const oe=(i,t,e,n={})=>Cc({id:i,key:t,name:e,sprite:t,...n});oe(j.STICK,"stick","Палка",{fuel:100});oe(j.COAL,"coal","Уголь",{fuel:1600});oe(j.CHARCOAL,"charcoal","Древесный уголь",{fuel:1600});oe(j.IRON_INGOT,"iron_ingot","Железный слиток");oe(j.GOLD_INGOT,"gold_ingot","Золотой слиток");oe(j.DIAMOND,"diamond","Алмаз");oe(j.FLINT,"flint","Кремень");oe(j.FLINT_AND_STEEL,"flint_and_steel","Огниво",{maxStack:1,durability:64});oe(j.STRING,"string","Нить");oe(j.FEATHER,"feather","Перо");oe(j.GUNPOWDER,"gunpowder","Порох");oe(j.BONE,"bone","Кость");oe(j.BONE_MEAL,"bone_meal","Костная мука");oe(j.ARROW,"arrow","Стрела");oe(j.BOW,"bow","Лук",{maxStack:1,durability:384,fuel:300});oe(j.LEATHER,"leather","Кожа");oe(j.ROTTEN_FLESH,"rotten_flesh","Гнилая плоть",{food:{hunger:4,saturation:.8}});oe(j.WHEAT_SEEDS,"wheat_seeds","Семена пшеницы",{places:gn(A.WHEAT)});oe(j.WHEAT,"wheat","Пшеница");oe(j.BREAD,"bread","Хлеб",{food:{hunger:5,saturation:6}});oe(j.APPLE,"apple","Яблоко",{food:{hunger:4,saturation:2.4}});oe(j.PORKCHOP,"porkchop","Сырая свинина",{food:{hunger:3,saturation:1.8}});oe(j.COOKED_PORKCHOP,"cooked_porkchop","Жареная свинина",{food:{hunger:8,saturation:12.8}});oe(j.BEEF,"beef","Сырая говядина",{food:{hunger:3,saturation:1.8}});oe(j.STEAK,"steak","Стейк",{food:{hunger:8,saturation:12.8}});oe(j.CHICKEN,"chicken","Сырая курица",{food:{hunger:2,saturation:1.2}});oe(j.COOKED_CHICKEN,"cooked_chicken","Жареная курица",{food:{hunger:6,saturation:7.2}});oe(j.MUTTON,"mutton","Сырая баранина",{food:{hunger:2,saturation:1.2}});oe(j.COOKED_MUTTON,"cooked_mutton","Жареная баранина",{food:{hunger:6,saturation:9.6}});oe(j.BUCKET,"bucket","Ведро",{maxStack:16});oe(j.WATER_BUCKET,"water_bucket","Ведро воды",{maxStack:1});oe(j.LAVA_BUCKET,"lava_bucket","Ведро лавы",{maxStack:1,fuel:2e4});oe(j.OAK_DOOR,"oak_door_item","Дубовая дверь",{places:gn(A.OAK_DOOR),fuel:200});oe(j.BED,"bed_item","Кровать",{maxStack:1,places:gn(A.BED)});oe(j.SHEARS,"shears","Ножницы",{maxStack:1,durability:238,tool:{type:"shears",level:0,speed:5}});oe(j.RED_DYE,"red_dye","Красный краситель");oe(j.YELLOW_DYE,"yellow_dye","Жёлтый краситель");oe(j.PAPER,"paper","Бумага");oe(j.BOOK,"book","Книга");const Gi=(i,t="ый")=>({f:`${i}ая`,m:`${i}${t}`,p:`${i}ые`}),W0=[{key:"wooden",name:Gi("Деревянн"),level:0,speed:2,durability:59,damage:0,fuel:200},{key:"stone",name:Gi("Каменн"),level:1,speed:4,durability:131,damage:1,fuel:0},{key:"iron",name:Gi("Железн"),level:2,speed:6,durability:250,damage:2,fuel:0},{key:"golden",name:Gi("Золот","ой"),level:0,speed:12,durability:32,damage:0,fuel:0},{key:"diamond",name:Gi("Алмазн"),level:3,speed:8,durability:1561,damage:3,fuel:0}],lg=[{key:"pickaxe",type:"pickaxe",name:i=>`${i.f} кирка`,damage:3},{key:"axe",type:"axe",name:i=>`${i.m} топор`,damage:4},{key:"shovel",type:"shovel",name:i=>`${i.f} лопата`,damage:2},{key:"sword",type:"sword",name:i=>`${i.m} меч`,damage:5},{key:"hoe",type:"hoe",name:i=>`${i.f} мотыга`,damage:1}];W0.forEach((i,t)=>lg.forEach((e,n)=>{const s=`${i.key}_${e.key}`;Cc({id:300+t*5+n,key:s,name:e.name(i.name),sprite:s,maxStack:1,durability:i.durability,tool:{type:e.type,level:i.level,speed:i.speed},damage:e.damage+i.damage,fuel:i.fuel||void 0})}));const hg=[{key:"leather",name:Gi("Кожан"),points:[1,3,2,1],durability:5,color:"#8b5a2b"},{key:"iron",name:Gi("Железн"),points:[2,6,5,2],durability:15,color:"#d8d8d8"},{key:"golden",name:Gi("Золот","ой"),points:[2,5,3,1],durability:7,color:"#f2cf3a"},{key:"diamond",name:Gi("Алмазн"),points:[3,8,6,3],durability:33,color:"#5fe0d6"}],ug=[{key:"helmet",name:i=>`${i.m} шлем`,base:11},{key:"chestplate",name:i=>`${i.m} нагрудник`,base:16},{key:"leggings",name:i=>`${i.p} поножи`,base:15},{key:"boots",name:i=>`${i.p} ботинки`,base:13}];hg.forEach((i,t)=>ug.forEach((e,n)=>{const s=`${i.key}_${e.key}`;Cc({id:330+t*4+n,key:s,name:e.name(i.name),sprite:s,maxStack:1,durability:e.base*i.durability,armor:{slot:n,points:i.points[n],color:i.color}})}));const X0=[...io.values()].sort((i,t)=>i.id-t.id);function ye(i){return io.get(i)}const fg=i=>Number.isInteger(i)&&io.has(i),dg=i=>{var t;return((t=io.get(i))==null?void 0:t.name)??"?"},_s=i=>{var t;return((t=io.get(i))==null?void 0:t.maxStack)??64},bs=i=>i<256;X0.filter(i=>i.sprite).map(i=>i.sprite);const Y0=X0.filter(i=>!i.hidden).map(i=>i.id),pg={pig:"свинья",cow:"корова",sheep:"овца",chicken:"курица",zombie:"зомби",skeleton:"скелет",creeper:"крипер",spider:"паук"},ea={pig:[.9,.9],cow:[.9,1.4],sheep:[.9,1.3],chicken:[.4,.7],zombie:[.6,1.95],skeleton:[.6,1.99],creeper:[.6,1.7],spider:[1.4,.9]},K0=["#e53935","#fb8c00","#fdd835","#43a047","#00acc1","#1e88e5","#8e24aa","#ec407a"],hf=1,mg=2,gg=4,uf=8;/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xu="180",vg=0,ff=1,_g=2,q0=1,xg=2,Fi=3,qi=0,Un=1,ii=2,Ss=0,Br=1,cc=2,df=3,pf=4,Mg=5,Vs=100,yg=101,bg=102,Sg=103,Eg=104,wg=200,Tg=201,Ag=202,Rg=203,rh=204,oh=205,Cg=206,Lg=207,Dg=208,Pg=209,Ig=210,kg=211,Ng=212,Ug=213,Og=214,ah=0,ch=1,lh=2,Vr=3,hh=4,uh=5,fh=6,dh=7,Lc=0,Fg=1,Bg=2,Es=0,zg=1,Gg=2,Hg=3,Vg=4,Wg=5,Xg=6,Yg=7,$0=300,Wr=301,Xr=302,ph=303,mh=304,Dc=306,gh=1e3,js=1001,vh=1002,vn=1003,Kg=1004,Eo=1005,_i=1006,Xc=1007,Zs=1008,yi=1009,j0=1010,Z0=1011,Io=1012,Mu=1013,tr=1014,Ai=1015,Yi=1016,yu=1017,bu=1018,ko=1020,J0=35902,Q0=35899,tp=1021,ep=1022,xi=1023,No=1026,Uo=1027,Su=1028,Eu=1029,np=1030,wu=1031,Tu=1033,Za=33776,Ja=33777,Qa=33778,tc=33779,_h=35840,xh=35841,Mh=35842,yh=35843,bh=36196,Sh=37492,Eh=37496,wh=37808,Th=37809,Ah=37810,Rh=37811,Ch=37812,Lh=37813,Dh=37814,Ph=37815,Ih=37816,kh=37817,Nh=37818,Uh=37819,Oh=37820,Fh=37821,Bh=36492,zh=36494,Gh=36495,Hh=36283,Vh=36284,Wh=36285,Xh=36286,qg=3200,$g=3201,Pc=0,jg=1,vs="",xn="srgb",Yr="srgb-linear",lc="linear",Re="srgb",sr=7680,mf=519,Zg=512,Jg=513,Qg=514,Au=515,t1=516,e1=517,n1=518,i1=519,Yh=35044,Js=35048,Hi="300 es",Ri=2e3,hc=2001;class so{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const En=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ec=Math.PI/180,Kh=180/Math.PI;function ws(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(En[i&255]+En[i>>8&255]+En[i>>16&255]+En[i>>24&255]+"-"+En[t&255]+En[t>>8&255]+"-"+En[t>>16&15|64]+En[t>>24&255]+"-"+En[e&63|128]+En[e>>8&255]+"-"+En[e>>16&255]+En[e>>24&255]+En[n&255]+En[n>>8&255]+En[n>>16&255]+En[n>>24&255]).toLowerCase()}function fe(i,t,e){return Math.max(t,Math.min(e,i))}function s1(i,t){return(i%t+t)%t}function Yc(i,t,e){return(1-e)*i+e*t}function Ti(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ce(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Vt{constructor(t=0,e=0){Vt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ro{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],m=r[o+2],v=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=m,t[e+3]=v;return}if(u!==v||c!==f||l!==d||h!==m){let g=1-a;const p=c*f+l*d+h*m+u*v,M=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const T=Math.sqrt(E),w=Math.atan2(T,p*M);g=Math.sin(g*w)/T,a=Math.sin(a*w)/T}const _=a*M;if(c=c*g+f*_,l=l*g+d*_,h=h*g+m*_,u=u*g+v*_,g===1-a){const T=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=T,l*=T,h*=T,u*=T}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return t[e]=a*m+h*u+c*d-l*f,t[e+1]=c*m+h*f+l*u-a*d,t[e+2]=l*m+h*d+a*f-c*u,t[e+3]=h*m-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"YZX":this._x=f*h*u+l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u-f*d*m;break;case"XZY":this._x=f*h*u-l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(fe(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,n=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(gf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(gf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this.z=fe(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this.z=fe(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Kc.copy(this).projectOnVector(t),this.sub(Kc)}reflect(t){return this.sub(Kc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(fe(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kc=new F,gf=new ro;class ee{constructor(t,e,n,s,r,o,a,c,l){ee.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],v=s[0],g=s[3],p=s[6],M=s[1],E=s[4],_=s[7],T=s[2],w=s[5],b=s[8];return r[0]=o*v+a*M+c*T,r[3]=o*g+a*E+c*w,r[6]=o*p+a*_+c*b,r[1]=l*v+h*M+u*T,r[4]=l*g+h*E+u*w,r[7]=l*p+h*_+u*b,r[2]=f*v+d*M+m*T,r[5]=f*g+d*E+m*w,r[8]=f*p+d*_+m*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,m=e*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return t[0]=u*v,t[1]=(s*l-h*n)*v,t[2]=(a*n-s*o)*v,t[3]=f*v,t[4]=(h*e-s*c)*v,t[5]=(s*r-a*e)*v,t[6]=d*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(qc.makeScale(t,e)),this}rotate(t){return this.premultiply(qc.makeRotation(-t)),this}translate(t,e){return this.premultiply(qc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const qc=new ee;function ip(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function uc(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function r1(){const i=uc("canvas");return i.style.display="block",i}const vf={};function Oo(i){i in vf||(vf[i]=!0,console.warn(i))}function o1(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const _f=new ee().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xf=new ee().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function a1(){const i={enabled:!0,workingColorSpace:Yr,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Re&&(s.r=Ki(s.r),s.g=Ki(s.g),s.b=Ki(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Re&&(s.r=zr(s.r),s.g=zr(s.g),s.b=zr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===vs?lc:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Oo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Oo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Yr]:{primaries:t,whitePoint:n,transfer:lc,toXYZ:_f,fromXYZ:xf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:xn},outputColorSpaceConfig:{drawingBufferColorSpace:xn}},[xn]:{primaries:t,whitePoint:n,transfer:Re,toXYZ:_f,fromXYZ:xf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:xn}}}),i}const Me=a1();function Ki(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let rr;class c1{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{rr===void 0&&(rr=uc("canvas")),rr.width=t.width,rr.height=t.height;const s=rr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=rr}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=uc("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Ki(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ki(e[n]/255)*255):e[n]=Ki(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let l1=0;class Ru{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:l1++}),this.uuid=ws(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push($c(s[o].image)):r.push($c(s[o]))}else r=$c(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function $c(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?c1.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let h1=0;const jc=new F;class Dn extends so{constructor(t=Dn.DEFAULT_IMAGE,e=Dn.DEFAULT_MAPPING,n=js,s=js,r=_i,o=Zs,a=xi,c=yi,l=Dn.DEFAULT_ANISOTROPY,h=vs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:h1++}),this.uuid=ws(),this.name="",this.source=new Ru(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Vt(0,0),this.repeat=new Vt(1,1),this.center=new Vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ee,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(jc).x}get height(){return this.source.getSize(jc).y}get depth(){return this.source.getSize(jc).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$0)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case gh:t.x=t.x-Math.floor(t.x);break;case js:t.x=t.x<0?0:1;break;case vh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case gh:t.y=t.y-Math.floor(t.y);break;case js:t.y=t.y<0?0:1;break;case vh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Dn.DEFAULT_IMAGE=null;Dn.DEFAULT_MAPPING=$0;Dn.DEFAULT_ANISOTROPY=1;class Ge{constructor(t=0,e=0,n=0,s=1){Ge.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],m=c[9],v=c[2],g=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+v)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const E=(l+1)/2,_=(d+1)/2,T=(p+1)/2,w=(h+f)/4,b=(u+v)/4,C=(m+g)/4;return E>_&&E>T?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=w/n,r=b/n):_>T?_<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(_),n=w/s,r=C/s):T<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=b/r,s=C/r),this.set(n,s,r,e),this}let M=Math.sqrt((g-m)*(g-m)+(u-v)*(u-v)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(u-v)/M,this.z=(f-h)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=fe(this.x,t.x,e.x),this.y=fe(this.y,t.y,e.y),this.z=fe(this.z,t.z,e.z),this.w=fe(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=fe(this.x,t,e),this.y=fe(this.y,t,e),this.z=fe(this.z,t,e),this.w=fe(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(fe(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class u1 extends so{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:_i,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Ge(0,0,t,e),this.scissorTest=!1,this.viewport=new Ge(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Dn(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:_i,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ru(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends u1{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Cu extends Dn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=vn,this.minFilter=vn,this.wrapR=js,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class f1 extends Dn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=vn,this.minFilter=vn,this.wrapR=js,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $i{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(di.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(di.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=di.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,di):di.fromBufferAttribute(r,o),di.applyMatrix4(t.matrixWorld),this.expandByPoint(di);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),na.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),na.copy(n.boundingBox)),na.applyMatrix4(t.matrixWorld),this.union(na)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,di),di.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(uo),ia.subVectors(this.max,uo),or.subVectors(t.a,uo),ar.subVectors(t.b,uo),cr.subVectors(t.c,uo),is.subVectors(ar,or),ss.subVectors(cr,ar),Ns.subVectors(or,cr);let e=[0,-is.z,is.y,0,-ss.z,ss.y,0,-Ns.z,Ns.y,is.z,0,-is.x,ss.z,0,-ss.x,Ns.z,0,-Ns.x,-is.y,is.x,0,-ss.y,ss.x,0,-Ns.y,Ns.x,0];return!Zc(e,or,ar,cr,ia)||(e=[1,0,0,0,1,0,0,0,1],!Zc(e,or,ar,cr,ia))?!1:(sa.crossVectors(is,ss),e=[sa.x,sa.y,sa.z],Zc(e,or,ar,cr,ia))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,di).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(di).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Pi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Pi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Pi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Pi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Pi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Pi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Pi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Pi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Pi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Pi=[new F,new F,new F,new F,new F,new F,new F,new F],di=new F,na=new $i,or=new F,ar=new F,cr=new F,is=new F,ss=new F,Ns=new F,uo=new F,ia=new F,sa=new F,Us=new F;function Zc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Us.fromArray(i,r);const a=s.x*Math.abs(Us.x)+s.y*Math.abs(Us.y)+s.z*Math.abs(Us.z),c=t.dot(Us),l=e.dot(Us),h=n.dot(Us);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const d1=new $i,fo=new F,Jc=new F;class Ji{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):d1.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;fo.subVectors(t,this.center);const e=fo.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(fo,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(fo.copy(t.center).add(Jc)),this.expandByPoint(fo.copy(t.center).sub(Jc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Ii=new F,Qc=new F,ra=new F,rs=new F,tl=new F,oa=new F,el=new F;class Lu{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ii)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Ii.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ii.copy(this.origin).addScaledVector(this.direction,e),Ii.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Qc.copy(t).add(e).multiplyScalar(.5),ra.copy(e).sub(t).normalize(),rs.copy(this.origin).sub(Qc);const r=t.distanceTo(e)*.5,o=-this.direction.dot(ra),a=rs.dot(this.direction),c=-rs.dot(ra),l=rs.lengthSq(),h=Math.abs(1-o*o);let u,f,d,m;if(h>0)if(u=o*c-a,f=o*a-c,m=r*h,u>=0)if(f>=-m)if(f<=m){const v=1/h;u*=v,f*=v,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Qc).addScaledVector(ra,f),d}intersectSphere(t,e){Ii.subVectors(t.center,this.origin);const n=Ii.dot(this.direction),s=Ii.dot(Ii)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Ii)!==null}intersectTriangle(t,e,n,s,r){tl.subVectors(e,t),oa.subVectors(n,t),el.crossVectors(tl,oa);let o=this.direction.dot(el),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;rs.subVectors(this.origin,t);const c=a*this.direction.dot(oa.crossVectors(rs,oa));if(c<0)return null;const l=a*this.direction.dot(tl.cross(rs));if(l<0||c+l>o)return null;const h=-a*rs.dot(el);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ve{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,m,v,g){ve.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,v,g)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,v,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ve().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/lr.setFromMatrixColumn(t,0).length(),r=1/lr.setFromMatrixColumn(t,1).length(),o=1/lr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,m=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+m*l,e[5]=f-v*l,e[9]=-a*c,e[2]=v-f*l,e[6]=m+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,m=l*h,v=l*u;e[0]=f+v*a,e[4]=m*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-m,e[6]=v+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,m=l*h,v=l*u;e[0]=f-v*a,e[4]=-o*u,e[8]=m+d*a,e[1]=d+m*a,e[5]=o*h,e[9]=v-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,m=a*h,v=a*u;e[0]=c*h,e[4]=m*l-d,e[8]=f*l+v,e[1]=c*u,e[5]=v*l+f,e[9]=d*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,m=a*c,v=a*l;e[0]=c*h,e[4]=v-f*u,e[8]=m*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+m,e[10]=f-v*u}else if(t.order==="XZY"){const f=o*c,d=o*l,m=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+v,e[5]=o*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=a*h,e[10]=v*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(p1,t,m1)}lookAt(t,e,n){const s=this.elements;return Xn.subVectors(t,e),Xn.lengthSq()===0&&(Xn.z=1),Xn.normalize(),os.crossVectors(n,Xn),os.lengthSq()===0&&(Math.abs(n.z)===1?Xn.x+=1e-4:Xn.z+=1e-4,Xn.normalize(),os.crossVectors(n,Xn)),os.normalize(),aa.crossVectors(Xn,os),s[0]=os.x,s[4]=aa.x,s[8]=Xn.x,s[1]=os.y,s[5]=aa.y,s[9]=Xn.y,s[2]=os.z,s[6]=aa.z,s[10]=Xn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],v=n[6],g=n[10],p=n[14],M=n[3],E=n[7],_=n[11],T=n[15],w=s[0],b=s[4],C=s[8],x=s[12],y=s[1],R=s[5],P=s[9],N=s[13],B=s[2],X=s[6],V=s[10],K=s[14],G=s[3],Z=s[7],rt=s[11],yt=s[15];return r[0]=o*w+a*y+c*B+l*G,r[4]=o*b+a*R+c*X+l*Z,r[8]=o*C+a*P+c*V+l*rt,r[12]=o*x+a*N+c*K+l*yt,r[1]=h*w+u*y+f*B+d*G,r[5]=h*b+u*R+f*X+d*Z,r[9]=h*C+u*P+f*V+d*rt,r[13]=h*x+u*N+f*K+d*yt,r[2]=m*w+v*y+g*B+p*G,r[6]=m*b+v*R+g*X+p*Z,r[10]=m*C+v*P+g*V+p*rt,r[14]=m*x+v*N+g*K+p*yt,r[3]=M*w+E*y+_*B+T*G,r[7]=M*b+E*R+_*X+T*Z,r[11]=M*C+E*P+_*V+T*rt,r[15]=M*x+E*N+_*K+T*yt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],v=t[7],g=t[11],p=t[15];return m*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+v*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+g*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],v=t[13],g=t[14],p=t[15],M=u*g*l-v*f*l+v*c*d-a*g*d-u*c*p+a*f*p,E=m*f*l-h*g*l-m*c*d+o*g*d+h*c*p-o*f*p,_=h*v*l-m*u*l+m*a*d-o*v*d-h*a*p+o*u*p,T=m*u*c-h*v*c-m*a*f+o*v*f+h*a*g-o*u*g,w=e*M+n*E+s*_+r*T;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/w;return t[0]=M*b,t[1]=(v*f*r-u*g*r-v*s*d+n*g*d+u*s*p-n*f*p)*b,t[2]=(a*g*r-v*c*r+v*s*l-n*g*l-a*s*p+n*c*p)*b,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*b,t[4]=E*b,t[5]=(h*g*r-m*f*r+m*s*d-e*g*d-h*s*p+e*f*p)*b,t[6]=(m*c*r-o*g*r-m*s*l+e*g*l+o*s*p-e*c*p)*b,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*b,t[8]=_*b,t[9]=(m*u*r-h*v*r-m*n*d+e*v*d+h*n*p-e*u*p)*b,t[10]=(o*v*r-m*a*r+m*n*l-e*v*l-o*n*p+e*a*p)*b,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*b,t[12]=T*b,t[13]=(h*v*s-m*u*s+m*n*f-e*v*f-h*n*g+e*u*g)*b,t[14]=(m*a*s-o*v*s-m*n*c+e*v*c+o*n*g-e*a*g)*b,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*b,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,m=r*u,v=o*h,g=o*u,p=a*u,M=c*l,E=c*h,_=c*u,T=n.x,w=n.y,b=n.z;return s[0]=(1-(v+p))*T,s[1]=(d+_)*T,s[2]=(m-E)*T,s[3]=0,s[4]=(d-_)*w,s[5]=(1-(f+p))*w,s[6]=(g+M)*w,s[7]=0,s[8]=(m+E)*b,s[9]=(g-M)*b,s[10]=(1-(f+v))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=lr.set(s[0],s[1],s[2]).length();const o=lr.set(s[4],s[5],s[6]).length(),a=lr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],pi.copy(this);const l=1/r,h=1/o,u=1/a;return pi.elements[0]*=l,pi.elements[1]*=l,pi.elements[2]*=l,pi.elements[4]*=h,pi.elements[5]*=h,pi.elements[6]*=h,pi.elements[8]*=u,pi.elements[9]*=u,pi.elements[10]*=u,e.setFromRotationMatrix(pi),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Ri,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let m,v;if(c)m=r/(o-r),v=o*r/(o-r);else if(a===Ri)m=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===hc)m=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Ri,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let m,v;if(c)m=1/(o-r),v=o/(o-r);else if(a===Ri)m=-2/(o-r),v=-(o+r)/(o-r);else if(a===hc)m=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=v,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const lr=new F,pi=new ve,p1=new F(0,0,0),m1=new F(1,1,1),os=new F,aa=new F,Xn=new F,Mf=new ve,yf=new ro;class ci{constructor(t=0,e=0,n=0,s=ci.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(fe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-fe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(fe(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-fe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(fe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-fe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Mf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Mf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yf.setFromEuler(this),this.setFromQuaternion(yf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ci.DEFAULT_ORDER="XYZ";class sp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let g1=0;const bf=new F,hr=new ro,ki=new ve,ca=new F,po=new F,v1=new F,_1=new ro,Sf=new F(1,0,0),Ef=new F(0,1,0),wf=new F(0,0,1),Tf={type:"added"},x1={type:"removed"},ur={type:"childadded",child:null},nl={type:"childremoved",child:null};class cn extends so{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:g1++}),this.uuid=ws(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=cn.DEFAULT_UP.clone();const t=new F,e=new ci,n=new ro,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ve},normalMatrix:{value:new ee}}),this.matrix=new ve,this.matrixWorld=new ve,this.matrixAutoUpdate=cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return hr.setFromAxisAngle(t,e),this.quaternion.multiply(hr),this}rotateOnWorldAxis(t,e){return hr.setFromAxisAngle(t,e),this.quaternion.premultiply(hr),this}rotateX(t){return this.rotateOnAxis(Sf,t)}rotateY(t){return this.rotateOnAxis(Ef,t)}rotateZ(t){return this.rotateOnAxis(wf,t)}translateOnAxis(t,e){return bf.copy(t).applyQuaternion(this.quaternion),this.position.add(bf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Sf,t)}translateY(t){return this.translateOnAxis(Ef,t)}translateZ(t){return this.translateOnAxis(wf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ki.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ca.copy(t):ca.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),po.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ki.lookAt(po,ca,this.up):ki.lookAt(ca,po,this.up),this.quaternion.setFromRotationMatrix(ki),s&&(ki.extractRotation(s.matrixWorld),hr.setFromRotationMatrix(ki),this.quaternion.premultiply(hr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Tf),ur.child=t,this.dispatchEvent(ur),ur.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(x1),nl.child=t,this.dispatchEvent(nl),nl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ki.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ki.multiply(t.parent.matrixWorld)),t.applyMatrix4(ki),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Tf),ur.child=t,this.dispatchEvent(ur),ur.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(po,t,v1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(po,_1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}cn.DEFAULT_UP=new F(0,1,0);cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const mi=new F,Ni=new F,il=new F,Ui=new F,fr=new F,dr=new F,Af=new F,sl=new F,rl=new F,ol=new F,al=new Ge,cl=new Ge,ll=new Ge;class jn{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),mi.subVectors(t,e),s.cross(mi);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){mi.subVectors(s,e),Ni.subVectors(n,e),il.subVectors(t,e);const o=mi.dot(mi),a=mi.dot(Ni),c=mi.dot(il),l=Ni.dot(Ni),h=Ni.dot(il),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,m=(o*h-a*c)*f;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Ui)===null?!1:Ui.x>=0&&Ui.y>=0&&Ui.x+Ui.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Ui)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ui.x),c.addScaledVector(o,Ui.y),c.addScaledVector(a,Ui.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return al.setScalar(0),cl.setScalar(0),ll.setScalar(0),al.fromBufferAttribute(t,e),cl.fromBufferAttribute(t,n),ll.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(al,r.x),o.addScaledVector(cl,r.y),o.addScaledVector(ll,r.z),o}static isFrontFacing(t,e,n,s){return mi.subVectors(n,e),Ni.subVectors(t,e),mi.cross(Ni).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return mi.subVectors(this.c,this.b),Ni.subVectors(this.a,this.b),mi.cross(Ni).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return jn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return jn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return jn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return jn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return jn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;fr.subVectors(s,n),dr.subVectors(r,n),sl.subVectors(t,n);const c=fr.dot(sl),l=dr.dot(sl);if(c<=0&&l<=0)return e.copy(n);rl.subVectors(t,s);const h=fr.dot(rl),u=dr.dot(rl);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(fr,o);ol.subVectors(t,r);const d=fr.dot(ol),m=dr.dot(ol);if(m>=0&&d<=m)return e.copy(r);const v=d*l-c*m;if(v<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(dr,a);const g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return Af.subVectors(r,s),a=(u-h)/(u-h+(d-m)),e.copy(s).addScaledVector(Af,a);const p=1/(g+v+f);return o=v*p,a=f*p,e.copy(n).addScaledVector(fr,o).addScaledVector(dr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const rp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},as={h:0,s:0,l:0},la={h:0,s:0,l:0};function hl(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class $t{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=xn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Me.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=Me.workingColorSpace){return this.r=t,this.g=e,this.b=n,Me.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=Me.workingColorSpace){if(t=s1(t,1),e=fe(e,0,1),n=fe(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=hl(o,r,t+1/3),this.g=hl(o,r,t),this.b=hl(o,r,t-1/3)}return Me.colorSpaceToWorking(this,s),this}setStyle(t,e=xn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=xn){const n=rp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ki(t.r),this.g=Ki(t.g),this.b=Ki(t.b),this}copyLinearToSRGB(t){return this.r=zr(t.r),this.g=zr(t.g),this.b=zr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=xn){return Me.workingToColorSpace(wn.copy(this),t),Math.round(fe(wn.r*255,0,255))*65536+Math.round(fe(wn.g*255,0,255))*256+Math.round(fe(wn.b*255,0,255))}getHexString(t=xn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Me.workingColorSpace){Me.workingToColorSpace(wn.copy(this),e);const n=wn.r,s=wn.g,r=wn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Me.workingColorSpace){return Me.workingToColorSpace(wn.copy(this),e),t.r=wn.r,t.g=wn.g,t.b=wn.b,t}getStyle(t=xn){Me.workingToColorSpace(wn.copy(this),t);const e=wn.r,n=wn.g,s=wn.b;return t!==xn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(as),this.setHSL(as.h+t,as.s+e,as.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(as),t.getHSL(la);const n=Yc(as.h,la.h,e),s=Yc(as.s,la.s,e),r=Yc(as.l,la.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wn=new $t;$t.NAMES=rp;let M1=0;class Ci extends so{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:M1++}),this.uuid=ws(),this.name="",this.type="Material",this.blending=Br,this.side=qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rh,this.blendDst=oh,this.blendEquation=Vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=Vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=mf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=sr,this.stencilZFail=sr,this.stencilZPass=sr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Br&&(n.blending=this.blending),this.side!==qi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==rh&&(n.blendSrc=this.blendSrc),this.blendDst!==oh&&(n.blendDst=this.blendDst),this.blendEquation!==Vs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Vr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==mf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==sr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==sr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==sr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class nr extends Ci{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Lc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const $e=new F,ha=new Vt;let y1=0;class we{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:y1++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Yh,this.updateRanges=[],this.gpuType=Ai,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ha.fromBufferAttribute(this,e),ha.applyMatrix3(t),this.setXY(e,ha.x,ha.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix3(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyMatrix4(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.applyNormalMatrix(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)$e.fromBufferAttribute(this,e),$e.transformDirection(t),this.setXYZ(e,$e.x,$e.y,$e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ti(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ce(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ti(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ti(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ti(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ti(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ce(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ce(e,this.array),n=Ce(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ce(e,this.array),n=Ce(n,this.array),s=Ce(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ce(e,this.array),n=Ce(n,this.array),s=Ce(s,this.array),r=Ce(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Yh&&(t.usage=this.usage),t}}class op extends we{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class ap extends we{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class en extends we{constructor(t,e,n){super(new Float32Array(t),e,n)}}let b1=0;const ti=new ve,ul=new cn,pr=new F,Yn=new $i,mo=new $i,dn=new F;class qe extends so{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:b1++}),this.uuid=ws(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ip(t)?ap:op)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new ee().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ti.makeRotationFromQuaternion(t),this.applyMatrix4(ti),this}rotateX(t){return ti.makeRotationX(t),this.applyMatrix4(ti),this}rotateY(t){return ti.makeRotationY(t),this.applyMatrix4(ti),this}rotateZ(t){return ti.makeRotationZ(t),this.applyMatrix4(ti),this}translate(t,e,n){return ti.makeTranslation(t,e,n),this.applyMatrix4(ti),this}scale(t,e,n){return ti.makeScale(t,e,n),this.applyMatrix4(ti),this}lookAt(t){return ul.lookAt(t),ul.updateMatrix(),this.applyMatrix4(ul.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(pr).negate(),this.translate(pr.x,pr.y,pr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new en(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new $i);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Yn.setFromBufferAttribute(r),this.morphTargetsRelative?(dn.addVectors(this.boundingBox.min,Yn.min),this.boundingBox.expandByPoint(dn),dn.addVectors(this.boundingBox.max,Yn.max),this.boundingBox.expandByPoint(dn)):(this.boundingBox.expandByPoint(Yn.min),this.boundingBox.expandByPoint(Yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ji);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const n=this.boundingSphere.center;if(Yn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];mo.setFromBufferAttribute(a),this.morphTargetsRelative?(dn.addVectors(Yn.min,mo.min),Yn.expandByPoint(dn),dn.addVectors(Yn.max,mo.max),Yn.expandByPoint(dn)):(Yn.expandByPoint(mo.min),Yn.expandByPoint(mo.max))}Yn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)dn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(dn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)dn.fromBufferAttribute(a,l),c&&(pr.fromBufferAttribute(t,l),dn.add(pr)),s=Math.max(s,n.distanceToSquared(dn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new we(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let C=0;C<n.count;C++)a[C]=new F,c[C]=new F;const l=new F,h=new F,u=new F,f=new Vt,d=new Vt,m=new Vt,v=new F,g=new F;function p(C,x,y){l.fromBufferAttribute(n,C),h.fromBufferAttribute(n,x),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,C),d.fromBufferAttribute(r,x),m.fromBufferAttribute(r,y),h.sub(l),u.sub(l),d.sub(f),m.sub(f);const R=1/(d.x*m.y-m.x*d.y);isFinite(R)&&(v.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(R),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(R),a[C].add(v),a[x].add(v),a[y].add(v),c[C].add(g),c[x].add(g),c[y].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let C=0,x=M.length;C<x;++C){const y=M[C],R=y.start,P=y.count;for(let N=R,B=R+P;N<B;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const E=new F,_=new F,T=new F,w=new F;function b(C){T.fromBufferAttribute(s,C),w.copy(T);const x=a[C];E.copy(x),E.sub(T.multiplyScalar(T.dot(x))).normalize(),_.crossVectors(w,x);const R=_.dot(c[C])<0?-1:1;o.setXYZW(C,E.x,E.y,E.z,R)}for(let C=0,x=M.length;C<x;++C){const y=M[C],R=y.start,P=y.count;for(let N=R,B=R+P;N<B;N+=3)b(t.getX(N+0)),b(t.getX(N+1)),b(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new we(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new F,r=new F,o=new F,a=new F,c=new F,l=new F,h=new F,u=new F;if(t)for(let f=0,d=t.count;f<d;f+=3){const m=t.getX(f+0),v=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)dn.fromBufferAttribute(t,e),dn.normalize(),t.setXYZ(e,dn.x,dn.y,dn.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,m=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?d=c[v]*a.data.stride+a.offset:d=c[v]*h;for(let p=0;p<h;p++)f[m++]=l[d++]}return new we(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new qe,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Rf=new ve,Os=new Lu,ua=new Ji,Cf=new F,fa=new F,da=new F,pa=new F,fl=new F,ma=new F,Lf=new F,ga=new F;class ge extends cn{constructor(t=new qe,e=new nr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){ma.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(fl.fromBufferAttribute(u,t),o?ma.addScaledVector(fl,h):ma.addScaledVector(fl.sub(e),h))}e.add(ma)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ua.copy(n.boundingSphere),ua.applyMatrix4(r),Os.copy(t.ray).recast(t.near),!(ua.containsPoint(Os.origin)===!1&&(Os.intersectSphere(ua,Cf)===null||Os.origin.distanceToSquared(Cf)>(t.far-t.near)**2))&&(Rf.copy(r).invert(),Os.copy(t.ray).applyMatrix4(Rf),!(n.boundingBox!==null&&Os.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Os)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,v=f.length;m<v;m++){const g=f[m],p=o[g.materialIndex],M=Math.max(g.start,d.start),E=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,T=E;_<T;_+=3){const w=a.getX(_),b=a.getX(_+1),C=a.getX(_+2);s=va(this,p,t,n,l,h,u,w,b,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),v=Math.min(a.count,d.start+d.count);for(let g=m,p=v;g<p;g+=3){const M=a.getX(g),E=a.getX(g+1),_=a.getX(g+2);s=va(this,o,t,n,l,h,u,M,E,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,v=f.length;m<v;m++){const g=f[m],p=o[g.materialIndex],M=Math.max(g.start,d.start),E=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let _=M,T=E;_<T;_+=3){const w=_,b=_+1,C=_+2;s=va(this,p,t,n,l,h,u,w,b,C),s&&(s.faceIndex=Math.floor(_/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),v=Math.min(c.count,d.start+d.count);for(let g=m,p=v;g<p;g+=3){const M=g,E=g+1,_=g+2;s=va(this,o,t,n,l,h,u,M,E,_),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function S1(i,t,e,n,s,r,o,a){let c;if(t.side===Un?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===qi,a),c===null)return null;ga.copy(a),ga.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ga);return l<e.near||l>e.far?null:{distance:l,point:ga.clone(),object:i}}function va(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,fa),i.getVertexPosition(c,da),i.getVertexPosition(l,pa);const h=S1(i,t,e,n,fa,da,pa,Lf);if(h){const u=new F;jn.getBarycoord(Lf,fa,da,pa,u),s&&(h.uv=jn.getInterpolatedAttribute(s,a,c,l,u,new Vt)),r&&(h.uv1=jn.getInterpolatedAttribute(r,a,c,l,u,new Vt)),o&&(h.normal=jn.getInterpolatedAttribute(o,a,c,l,u,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new F,materialIndex:0};jn.getNormal(fa,da,pa,f.normal),h.face=f,h.barycoord=u}return h}class tn extends qe{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new en(l,3)),this.setAttribute("normal",new en(h,3)),this.setAttribute("uv",new en(u,2));function m(v,g,p,M,E,_,T,w,b,C,x){const y=_/b,R=T/C,P=_/2,N=T/2,B=w/2,X=b+1,V=C+1;let K=0,G=0;const Z=new F;for(let rt=0;rt<V;rt++){const yt=rt*R-N;for(let Bt=0;Bt<X;Bt++){const Wt=Bt*y-P;Z[v]=Wt*M,Z[g]=yt*E,Z[p]=B,l.push(Z.x,Z.y,Z.z),Z[v]=0,Z[g]=0,Z[p]=w>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(Bt/b),u.push(1-rt/C),K+=1}}for(let rt=0;rt<C;rt++)for(let yt=0;yt<b;yt++){const Bt=f+yt+X*rt,Wt=f+yt+X*(rt+1),ne=f+(yt+1)+X*(rt+1),ae=f+(yt+1)+X*rt;c.push(Bt,Wt,ae),c.push(Wt,ne,ae),G+=6}a.addGroup(d,G,x),d+=G,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Kr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function kn(i){const t={};for(let e=0;e<i.length;e++){const n=Kr(i[e]);for(const s in n)t[s]=n[s]}return t}function E1(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function cp(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Me.workingColorSpace}const qh={clone:Kr,merge:kn};var w1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,T1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class an extends Ci{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=w1,this.fragmentShader=T1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Kr(t.uniforms),this.uniformsGroups=E1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class lp extends cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ve,this.projectionMatrix=new ve,this.projectionMatrixInverse=new ve,this.coordinateSystem=Ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const cs=new F,Df=new Vt,Pf=new Vt;class $n extends lp{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Kh*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ec*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Kh*2*Math.atan(Math.tan(ec*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){cs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(cs.x,cs.y).multiplyScalar(-t/cs.z),cs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(cs.x,cs.y).multiplyScalar(-t/cs.z)}getViewSize(t,e){return this.getViewBounds(t,Df,Pf),e.subVectors(Pf,Df)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ec*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const mr=-90,gr=1;class A1 extends cn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new $n(mr,gr,t,e);s.layers=this.layers,this.add(s);const r=new $n(mr,gr,t,e);r.layers=this.layers,this.add(r);const o=new $n(mr,gr,t,e);o.layers=this.layers,this.add(o);const a=new $n(mr,gr,t,e);a.layers=this.layers,this.add(a);const c=new $n(mr,gr,t,e);c.layers=this.layers,this.add(c);const l=new $n(mr,gr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Ri)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===hc)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class hp extends Dn{constructor(t=[],e=Wr,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class R1 extends oi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new hp(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new tn(5,5,5),r=new an({name:"CubemapFromEquirect",uniforms:Kr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Un,blending:Ss});r.uniforms.tEquirect.value=e;const o=new ge(s,r),a=e.minFilter;return e.minFilter===Zs&&(e.minFilter=_i),new A1(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class Mn extends cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const C1={type:"move"};class dl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),p=this._getHandJoint(l,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(C1)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Mn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class up extends cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ci,this.environmentIntensity=1,this.environmentRotation=new ci,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class L1{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Yh,this.updateRanges=[],this.version=0,this.uuid=ws()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ws()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ws()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const In=new F;class fc{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)In.fromBufferAttribute(this,e),In.applyMatrix4(t),this.setXYZ(e,In.x,In.y,In.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)In.fromBufferAttribute(this,e),In.applyNormalMatrix(t),this.setXYZ(e,In.x,In.y,In.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)In.fromBufferAttribute(this,e),In.transformDirection(t),this.setXYZ(e,In.x,In.y,In.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Ti(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Ce(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Ti(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Ti(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Ti(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Ti(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ce(e,this.array),n=Ce(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ce(e,this.array),n=Ce(n,this.array),s=Ce(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ce(e,this.array),n=Ce(n,this.array),s=Ce(s,this.array),r=Ce(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new we(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new fc(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Du extends Ci{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let vr;const go=new F,_r=new F,xr=new F,Mr=new Vt,vo=new Vt,fp=new ve,_a=new F,_o=new F,xa=new F,If=new Vt,pl=new Vt,kf=new Vt;let dp=class extends cn{constructor(t=new Du){if(super(),this.isSprite=!0,this.type="Sprite",vr===void 0){vr=new qe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new L1(e,5);vr.setIndex([0,1,2,0,2,3]),vr.setAttribute("position",new fc(n,3,0,!1)),vr.setAttribute("uv",new fc(n,2,3,!1))}this.geometry=vr,this.material=t,this.center=new Vt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),_r.setFromMatrixScale(this.matrixWorld),fp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),xr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&_r.multiplyScalar(-xr.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;Ma(_a.set(-.5,-.5,0),xr,o,_r,s,r),Ma(_o.set(.5,-.5,0),xr,o,_r,s,r),Ma(xa.set(.5,.5,0),xr,o,_r,s,r),If.set(0,0),pl.set(1,0),kf.set(1,1);let a=t.ray.intersectTriangle(_a,_o,xa,!1,go);if(a===null&&(Ma(_o.set(-.5,.5,0),xr,o,_r,s,r),pl.set(0,1),a=t.ray.intersectTriangle(_a,xa,_o,!1,go),a===null))return;const c=t.ray.origin.distanceTo(go);c<t.near||c>t.far||e.push({distance:c,point:go.clone(),uv:jn.getInterpolation(go,_a,_o,xa,If,pl,kf,new Vt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function Ma(i,t,e,n,s,r){Mr.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(vo.x=r*Mr.x-s*Mr.y,vo.y=s*Mr.x+r*Mr.y):vo.copy(Mr),i.copy(t),i.x+=vo.x,i.y+=vo.y,i.applyMatrix4(fp)}class D1 extends Dn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=vn,h=vn,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nf extends we{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const yr=new ve,Uf=new ve,ya=[],Of=new $i,P1=new ve,xo=new ge,Mo=new Ji;class I1 extends ge{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Nf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,P1)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new $i),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,yr),Of.copy(t.boundingBox).applyMatrix4(yr),this.boundingBox.union(Of)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ji),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,yr),Mo.copy(t.boundingSphere).applyMatrix4(yr),this.boundingSphere.union(Mo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(xo.geometry=this.geometry,xo.material=this.material,xo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Mo.copy(this.boundingSphere),Mo.applyMatrix4(n),t.ray.intersectsSphere(Mo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,yr),Uf.multiplyMatrices(n,yr),xo.matrixWorld=Uf,xo.raycast(t,ya);for(let o=0,a=ya.length;o<a;o++){const c=ya[o];c.instanceId=r,c.object=this,e.push(c)}ya.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Nf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new D1(new Float32Array(s*this.count),s,this.count,Su,Ai));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const ml=new F,k1=new F,N1=new ee;class Gs{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=ml.subVectors(n,e).cross(k1.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ml),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||N1.getNormalMatrix(t),s=this.coplanarPoint(ml).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Fs=new Ji,U1=new Vt(.5,.5),ba=new F;class Fo{constructor(t=new Gs,e=new Gs,n=new Gs,s=new Gs,r=new Gs,o=new Gs){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Ri,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],m=r[8],v=r[9],g=r[10],p=r[11],M=r[12],E=r[13],_=r[14],T=r[15];if(s[0].setComponents(l-o,d-h,p-m,T-M).normalize(),s[1].setComponents(l+o,d+h,p+m,T+M).normalize(),s[2].setComponents(l+a,d+u,p+v,T+E).normalize(),s[3].setComponents(l-a,d-u,p-v,T-E).normalize(),n)s[4].setComponents(c,f,g,_).normalize(),s[5].setComponents(l-c,d-f,p-g,T-_).normalize();else if(s[4].setComponents(l-c,d-f,p-g,T-_).normalize(),e===Ri)s[5].setComponents(l+c,d+f,p+g,T+_).normalize();else if(e===hc)s[5].setComponents(c,f,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Fs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Fs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Fs)}intersectsSprite(t){Fs.center.set(0,0,0);const e=U1.distanceTo(t.center);return Fs.radius=.7071067811865476+e,Fs.applyMatrix4(t.matrixWorld),this.intersectsSphere(Fs)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(ba.x=s.normal.x>0?t.max.x:t.min.x,ba.y=s.normal.y>0?t.max.y:t.min.y,ba.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ba)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class pp extends Ci{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const dc=new F,pc=new F,Ff=new ve,yo=new Lu,Sa=new Ji,gl=new F,Bf=new F;class O1 extends cn{constructor(t=new qe,e=new pp){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)dc.fromBufferAttribute(e,s-1),pc.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=dc.distanceTo(pc);t.setAttribute("lineDistance",new en(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sa.copy(n.boundingSphere),Sa.applyMatrix4(s),Sa.radius+=r,t.ray.intersectsSphere(Sa)===!1)return;Ff.copy(s).invert(),yo.copy(t.ray).applyMatrix4(Ff);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let v=d,g=m-1;v<g;v+=l){const p=h.getX(v),M=h.getX(v+1),E=Ea(this,t,yo,c,p,M,v);E&&e.push(E)}if(this.isLineLoop){const v=h.getX(m-1),g=h.getX(d),p=Ea(this,t,yo,c,v,g,m-1);p&&e.push(p)}}else{const d=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let v=d,g=m-1;v<g;v+=l){const p=Ea(this,t,yo,c,v,v+1,v);p&&e.push(p)}if(this.isLineLoop){const v=Ea(this,t,yo,c,m-1,d,m-1);v&&e.push(v)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Ea(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(dc.fromBufferAttribute(a,s),pc.fromBufferAttribute(a,r),e.distanceSqToSegment(dc,pc,gl,Bf)>n)return;gl.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(gl);if(!(l<t.near||l>t.far))return{distance:l,point:Bf.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const zf=new F,Gf=new F;class mp extends O1{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)zf.fromBufferAttribute(e,s),Gf.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+zf.distanceTo(Gf);t.setAttribute("lineDistance",new en(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class F1 extends Ci{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Hf=new ve,$h=new Lu,wa=new Ji,Ta=new F;class gp extends cn{constructor(t=new qe,e=new F1){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wa.copy(n.boundingSphere),wa.applyMatrix4(s),wa.radius+=r,t.ray.intersectsSphere(wa)===!1)return;Hf.copy(s).invert(),$h.copy(t.ray).applyMatrix4(Hf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let m=f,v=d;m<v;m++){const g=l.getX(m);Ta.fromBufferAttribute(u,g),Vf(Ta,g,c,s,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let m=f,v=d;m<v;m++)Ta.fromBufferAttribute(u,m),Vf(Ta,m,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Vf(i,t,e,n,s,r,o){const a=$h.distanceSqToPoint(i);if(a<e){const c=new F;$h.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class Ic extends Dn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class mc extends Dn{constructor(t,e,n=tr,s,r,o,a=vn,c=vn,l,h=No,u=1){if(h!==No&&h!==Uo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ru(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class vp extends Dn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}const Aa=new F,Ra=new F,vl=new F,Ca=new jn;class B1 extends qe{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(ec*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let m=0;m<c;m+=3){o?(l[0]=o.getX(m),l[1]=o.getX(m+1),l[2]=o.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);const{a:v,b:g,c:p}=Ca;if(v.fromBufferAttribute(a,l[0]),g.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),Ca.getNormal(vl),u[0]=`${Math.round(v.x*s)},${Math.round(v.y*s)},${Math.round(v.z*s)}`,u[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let M=0;M<3;M++){const E=(M+1)%3,_=u[M],T=u[E],w=Ca[h[M]],b=Ca[h[E]],C=`${_}_${T}`,x=`${T}_${_}`;x in f&&f[x]?(vl.dot(f[x].normal)<=r&&(d.push(w.x,w.y,w.z),d.push(b.x,b.y,b.z)),f[x]=null):C in f||(f[C]={index0:l[M],index1:l[E],normal:vl.clone()})}}for(const m in f)if(f[m]){const{index0:v,index1:g}=f[m];Aa.fromBufferAttribute(a,v),Ra.fromBufferAttribute(a,g),d.push(Aa.x,Aa.y,Aa.z),d.push(Ra.x,Ra.y,Ra.z)}this.setAttribute("position",new en(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class jo extends qe{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],m=[],v=[],g=[];for(let p=0;p<h;p++){const M=p*f-o;for(let E=0;E<l;E++){const _=E*u-r;m.push(_,-M,0),v.push(0,0,1),g.push(E/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){const E=M+l*p,_=M+l*(p+1),T=M+1+l*(p+1),w=M+1+l*p;d.push(E,_,w),d.push(_,T,w)}this.setIndex(d),this.setAttribute("position",new en(m,3)),this.setAttribute("normal",new en(v,3)),this.setAttribute("uv",new en(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jo(t.width,t.height,t.widthSegments,t.heightSegments)}}class Pu extends qe{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new F,f=new F,d=[],m=[],v=[],g=[];for(let p=0;p<=n;p++){const M=[],E=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let T=0;T<=e;T++){const w=T/e;u.x=-t*Math.cos(s+w*r)*Math.sin(o+E*a),u.y=t*Math.cos(o+E*a),u.z=t*Math.sin(s+w*r)*Math.sin(o+E*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),v.push(f.x,f.y,f.z),g.push(w+_,1-E),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const E=h[p][M+1],_=h[p][M],T=h[p+1][M],w=h[p+1][M+1];(p!==0||o>0)&&d.push(E,_,w),(p!==n-1||c<Math.PI)&&d.push(_,T,w)}this.setIndex(d),this.setAttribute("position",new en(m,3)),this.setAttribute("normal",new en(v,3)),this.setAttribute("uv",new en(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pu(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ws extends an{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class z1 extends Ci{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new $t(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pc,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class G1 extends Ci{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new $t(16777215),this.specular=new $t(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pc,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Lc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Mi extends Ci{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pc,this.normalScale=new Vt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ci,this.combine=Lc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class _p extends Ci{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=qg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class H1 extends Ci{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class xp extends cn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new $t(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const _l=new ve,Wf=new F,Xf=new F;class V1{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Vt(512,512),this.mapType=yi,this.map=null,this.mapPass=null,this.matrix=new ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fo,this._frameExtents=new Vt(1,1),this._viewportCount=1,this._viewports=[new Ge(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Wf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Wf),Xf.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Xf),e.updateMatrixWorld(),_l.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_l,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(_l)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class kc extends lp{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class W1 extends V1{constructor(){super(new kc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Mp extends xp{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(cn.DEFAULT_UP),this.updateMatrix(),this.target=new cn,this.shadow=new W1}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class yp extends xp{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class X1 extends $n{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Yf(i,t,e,n){const s=Y1(n);switch(e){case tp:return i*t;case Su:return i*t/s.components*s.byteLength;case Eu:return i*t/s.components*s.byteLength;case np:return i*t*2/s.components*s.byteLength;case wu:return i*t*2/s.components*s.byteLength;case ep:return i*t*3/s.components*s.byteLength;case xi:return i*t*4/s.components*s.byteLength;case Tu:return i*t*4/s.components*s.byteLength;case Za:case Ja:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Qa:case tc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case xh:case yh:return Math.max(i,16)*Math.max(t,8)/4;case _h:case Mh:return Math.max(i,8)*Math.max(t,8)/2;case bh:case Sh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Eh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case wh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Th:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Ah:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Rh:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Ch:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Lh:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Dh:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Ph:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ih:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case kh:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Nh:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Uh:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Oh:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Fh:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Bh:case zh:case Gh:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Hh:case Vh:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Wh:case Xh:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Y1(i){switch(i){case yi:case j0:return{byteLength:1,components:1};case Io:case Z0:case Yi:return{byteLength:2,components:1};case yu:case bu:return{byteLength:2,components:4};case tr:case Mu:case Ai:return{byteLength:4,components:1};case J0:case Q0:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xu);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bp(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function K1(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){const m=u[f],v=u[d];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++f,u[f]=v)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){const v=u[d];i.bufferSubData(l,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var q1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,j1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Z1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,J1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Q1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tv=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,ev=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nv=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,iv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ov=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,av=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,cv=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,lv=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,hv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,uv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,dv=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mv=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,gv=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,vv=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_v=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xv=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Mv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,bv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ev="gl_FragColor = linearToOutputTexel( gl_FragColor );",wv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Tv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Av=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Rv=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Cv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Lv=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Dv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Iv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,kv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Nv=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Uv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ov=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fv=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bv=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,zv=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Gv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hv=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Wv=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Xv=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Yv=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Kv=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,qv=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,$v=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,jv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Zv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Jv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,t_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,e_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,n_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,i_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,s_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,r_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,o_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,a_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,c_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,l_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,h_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,f_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,d_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,p_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,m_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,g_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,v_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,__=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,x_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,M_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,y_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,b_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,S_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,E_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,w_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,T_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,A_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,R_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,C_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,L_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,D_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,P_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,I_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,k_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,N_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,U_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,O_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,F_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,B_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,z_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,G_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,H_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,V_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,W_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,X_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Y_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const K_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,q_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,j_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,J_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,tx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ex=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,nx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ox=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ax=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,cx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ux=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,fx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,dx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,px=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,_x=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,bx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Sx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ex=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,wx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,se={alphahash_fragment:q1,alphahash_pars_fragment:$1,alphamap_fragment:j1,alphamap_pars_fragment:Z1,alphatest_fragment:J1,alphatest_pars_fragment:Q1,aomap_fragment:tv,aomap_pars_fragment:ev,batching_pars_vertex:nv,batching_vertex:iv,begin_vertex:sv,beginnormal_vertex:rv,bsdfs:ov,iridescence_fragment:av,bumpmap_pars_fragment:cv,clipping_planes_fragment:lv,clipping_planes_pars_fragment:hv,clipping_planes_pars_vertex:uv,clipping_planes_vertex:fv,color_fragment:dv,color_pars_fragment:pv,color_pars_vertex:mv,color_vertex:gv,common:vv,cube_uv_reflection_fragment:_v,defaultnormal_vertex:xv,displacementmap_pars_vertex:Mv,displacementmap_vertex:yv,emissivemap_fragment:bv,emissivemap_pars_fragment:Sv,colorspace_fragment:Ev,colorspace_pars_fragment:wv,envmap_fragment:Tv,envmap_common_pars_fragment:Av,envmap_pars_fragment:Rv,envmap_pars_vertex:Cv,envmap_physical_pars_fragment:zv,envmap_vertex:Lv,fog_vertex:Dv,fog_pars_vertex:Pv,fog_fragment:Iv,fog_pars_fragment:kv,gradientmap_pars_fragment:Nv,lightmap_pars_fragment:Uv,lights_lambert_fragment:Ov,lights_lambert_pars_fragment:Fv,lights_pars_begin:Bv,lights_toon_fragment:Gv,lights_toon_pars_fragment:Hv,lights_phong_fragment:Vv,lights_phong_pars_fragment:Wv,lights_physical_fragment:Xv,lights_physical_pars_fragment:Yv,lights_fragment_begin:Kv,lights_fragment_maps:qv,lights_fragment_end:$v,logdepthbuf_fragment:jv,logdepthbuf_pars_fragment:Zv,logdepthbuf_pars_vertex:Jv,logdepthbuf_vertex:Qv,map_fragment:t_,map_pars_fragment:e_,map_particle_fragment:n_,map_particle_pars_fragment:i_,metalnessmap_fragment:s_,metalnessmap_pars_fragment:r_,morphinstance_vertex:o_,morphcolor_vertex:a_,morphnormal_vertex:c_,morphtarget_pars_vertex:l_,morphtarget_vertex:h_,normal_fragment_begin:u_,normal_fragment_maps:f_,normal_pars_fragment:d_,normal_pars_vertex:p_,normal_vertex:m_,normalmap_pars_fragment:g_,clearcoat_normal_fragment_begin:v_,clearcoat_normal_fragment_maps:__,clearcoat_pars_fragment:x_,iridescence_pars_fragment:M_,opaque_fragment:y_,packing:b_,premultiplied_alpha_fragment:S_,project_vertex:E_,dithering_fragment:w_,dithering_pars_fragment:T_,roughnessmap_fragment:A_,roughnessmap_pars_fragment:R_,shadowmap_pars_fragment:C_,shadowmap_pars_vertex:L_,shadowmap_vertex:D_,shadowmask_pars_fragment:P_,skinbase_vertex:I_,skinning_pars_vertex:k_,skinning_vertex:N_,skinnormal_vertex:U_,specularmap_fragment:O_,specularmap_pars_fragment:F_,tonemapping_fragment:B_,tonemapping_pars_fragment:z_,transmission_fragment:G_,transmission_pars_fragment:H_,uv_pars_fragment:V_,uv_pars_vertex:W_,uv_vertex:X_,worldpos_vertex:Y_,background_vert:K_,background_frag:q_,backgroundCube_vert:$_,backgroundCube_frag:j_,cube_vert:Z_,cube_frag:J_,depth_vert:Q_,depth_frag:tx,distanceRGBA_vert:ex,distanceRGBA_frag:nx,equirect_vert:ix,equirect_frag:sx,linedashed_vert:rx,linedashed_frag:ox,meshbasic_vert:ax,meshbasic_frag:cx,meshlambert_vert:lx,meshlambert_frag:hx,meshmatcap_vert:ux,meshmatcap_frag:fx,meshnormal_vert:dx,meshnormal_frag:px,meshphong_vert:mx,meshphong_frag:gx,meshphysical_vert:vx,meshphysical_frag:_x,meshtoon_vert:xx,meshtoon_frag:Mx,points_vert:yx,points_frag:bx,shadow_vert:Sx,shadow_frag:Ex,sprite_vert:wx,sprite_frag:Tx},dt={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ee}},envmap:{envMap:{value:null},envMapRotation:{value:new ee},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ee}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ee}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ee},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ee},normalScale:{value:new Vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ee},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ee}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ee}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ee}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0},uvTransform:{value:new ee}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new Vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ee},alphaMap:{value:null},alphaMapTransform:{value:new ee},alphaTest:{value:0}}},wi={basic:{uniforms:kn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:kn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new $t(0)}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:kn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:kn([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:kn([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new $t(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:kn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:kn([dt.points,dt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:kn([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:kn([dt.common,dt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:kn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:kn([dt.sprite,dt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new ee},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ee}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distanceRGBA:{uniforms:kn([dt.common,dt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distanceRGBA_vert,fragmentShader:se.distanceRGBA_frag},shadow:{uniforms:kn([dt.lights,dt.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};wi.physical={uniforms:kn([wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ee},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ee},clearcoatNormalScale:{value:new Vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ee},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ee},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ee},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ee},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ee},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ee},transmissionSamplerSize:{value:new Vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ee},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ee},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ee},anisotropyVector:{value:new Vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ee}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};const La={r:0,b:0,g:0},Bs=new ci,Ax=new ve;function Rx(i,t,e,n,s,r,o){const a=new $t(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function m(E){let _=E.isScene===!0?E.background:null;return _&&_.isTexture&&(_=(E.backgroundBlurriness>0?e:t).get(_)),_}function v(E){let _=!1;const T=m(E);T===null?p(a,c):T&&T.isColor&&(p(T,1),_=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(E,_){const T=m(_);T&&(T.isCubeTexture||T.mapping===Dc)?(h===void 0&&(h=new ge(new tn(1,1,1),new an({name:"BackgroundCubeMaterial",uniforms:Kr(wi.backgroundCube.uniforms),vertexShader:wi.backgroundCube.vertexShader,fragmentShader:wi.backgroundCube.fragmentShader,side:Un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,b,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Bs.copy(_.backgroundRotation),Bs.x*=-1,Bs.y*=-1,Bs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Bs.y*=-1,Bs.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ax.makeRotationFromEuler(Bs)),h.material.toneMapped=Me.getTransfer(T.colorSpace)!==Re,(u!==T||f!==T.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,f=T.version,d=i.toneMapping),h.layers.enableAll(),E.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new ge(new jo(2,2),new an({name:"BackgroundMaterial",uniforms:Kr(wi.background.uniforms),vertexShader:wi.background.vertexShader,fragmentShader:wi.background.fragmentShader,side:qi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=Me.getTransfer(T.colorSpace)!==Re,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||f!==T.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=T,f=T.version,d=i.toneMapping),l.layers.enableAll(),E.unshift(l,l.geometry,l.material,0,0,null))}function p(E,_){E.getRGB(La,cp(i)),n.buffers.color.setClear(La.r,La.g,La.b,_,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,_=1){a.set(E),c=_,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(E){c=E,p(a,c)},render:v,addToRenderList:g,dispose:M}}function Cx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(y,R,P,N,B){let X=!1;const V=u(N,P,R);r!==V&&(r=V,l(r.object)),X=d(y,N,P,B),X&&m(y,N,P,B),B!==null&&t.update(B,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,_(y,R,P,N),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,R,P){const N=P.wireframe===!0;let B=n[y.id];B===void 0&&(B={},n[y.id]=B);let X=B[R.id];X===void 0&&(X={},B[R.id]=X);let V=X[N];return V===void 0&&(V=f(c()),X[N]=V),V}function f(y){const R=[],P=[],N=[];for(let B=0;B<e;B++)R[B]=0,P[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:P,attributeDivisors:N,object:y,attributes:{},index:null}}function d(y,R,P,N){const B=r.attributes,X=R.attributes;let V=0;const K=P.getAttributes();for(const G in K)if(K[G].location>=0){const rt=B[G];let yt=X[G];if(yt===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(yt=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(yt=y.instanceColor)),rt===void 0||rt.attribute!==yt||yt&&rt.data!==yt.data)return!0;V++}return r.attributesNum!==V||r.index!==N}function m(y,R,P,N){const B={},X=R.attributes;let V=0;const K=P.getAttributes();for(const G in K)if(K[G].location>=0){let rt=X[G];rt===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(rt=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(rt=y.instanceColor));const yt={};yt.attribute=rt,rt&&rt.data&&(yt.data=rt.data),B[G]=yt,V++}r.attributes=B,r.attributesNum=V,r.index=N}function v(){const y=r.newAttributes;for(let R=0,P=y.length;R<P;R++)y[R]=0}function g(y){p(y,0)}function p(y,R){const P=r.newAttributes,N=r.enabledAttributes,B=r.attributeDivisors;P[y]=1,N[y]===0&&(i.enableVertexAttribArray(y),N[y]=1),B[y]!==R&&(i.vertexAttribDivisor(y,R),B[y]=R)}function M(){const y=r.newAttributes,R=r.enabledAttributes;for(let P=0,N=R.length;P<N;P++)R[P]!==y[P]&&(i.disableVertexAttribArray(P),R[P]=0)}function E(y,R,P,N,B,X,V){V===!0?i.vertexAttribIPointer(y,R,P,B,X):i.vertexAttribPointer(y,R,P,N,B,X)}function _(y,R,P,N){v();const B=N.attributes,X=P.getAttributes(),V=R.defaultAttributeValues;for(const K in X){const G=X[K];if(G.location>=0){let Z=B[K];if(Z===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(Z=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(Z=y.instanceColor)),Z!==void 0){const rt=Z.normalized,yt=Z.itemSize,Bt=t.get(Z);if(Bt===void 0)continue;const Wt=Bt.buffer,ne=Bt.type,ae=Bt.bytesPerElement,Q=ne===i.INT||ne===i.UNSIGNED_INT||Z.gpuType===Mu;if(Z.isInterleavedBufferAttribute){const nt=Z.data,mt=nt.stride,zt=Z.offset;if(nt.isInstancedInterleavedBuffer){for(let _t=0;_t<G.locationSize;_t++)p(G.location+_t,nt.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let _t=0;_t<G.locationSize;_t++)g(G.location+_t);i.bindBuffer(i.ARRAY_BUFFER,Wt);for(let _t=0;_t<G.locationSize;_t++)E(G.location+_t,yt/G.locationSize,ne,rt,mt*ae,(zt+yt/G.locationSize*_t)*ae,Q)}else{if(Z.isInstancedBufferAttribute){for(let nt=0;nt<G.locationSize;nt++)p(G.location+nt,Z.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let nt=0;nt<G.locationSize;nt++)g(G.location+nt);i.bindBuffer(i.ARRAY_BUFFER,Wt);for(let nt=0;nt<G.locationSize;nt++)E(G.location+nt,yt/G.locationSize,ne,rt,yt*ae,yt/G.locationSize*nt*ae,Q)}}else if(V!==void 0){const rt=V[K];if(rt!==void 0)switch(rt.length){case 2:i.vertexAttrib2fv(G.location,rt);break;case 3:i.vertexAttrib3fv(G.location,rt);break;case 4:i.vertexAttrib4fv(G.location,rt);break;default:i.vertexAttrib1fv(G.location,rt)}}}}M()}function T(){C();for(const y in n){const R=n[y];for(const P in R){const N=R[P];for(const B in N)h(N[B].object),delete N[B];delete R[P]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;const R=n[y.id];for(const P in R){const N=R[P];for(const B in N)h(N[B].object),delete N[B];delete R[P]}delete n[y.id]}function b(y){for(const R in n){const P=n[R];if(P[y.id]===void 0)continue;const N=P[y.id];for(const B in N)h(N[B].object),delete N[B];delete P[y.id]}}function C(){x(),o=!0,r!==s&&(r=s,l(r.object))}function x(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:C,resetDefaultState:x,dispose:T,releaseStatesOfGeometry:w,releaseStatesOfProgram:b,initAttributes:v,enableAttribute:g,disableUnusedAttributes:M}}function Lx(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<l.length;m++)o(l[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let m=0;for(let v=0;v<u;v++)m+=h[v]*f[v];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Dx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==xi&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const C=b===Yi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==yi&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==Ai&&!C)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),_=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=m>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:E,maxFragmentUniforms:_,vertexTextures:T,maxSamples:w}}function Px(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Gs,a=new ee,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const m=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{const M=r?0:n,E=M*4;let _=p.clippingState||null;c.value=_,_=h(m,f,E,d);for(let T=0;T!==E;++T)_[T]=e[T];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=c.value,m!==!0||g===null){const p=d+v*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let E=0,_=d;E!==v;++E,_+=4)o.copy(u[E]).applyMatrix4(M,a),o.normal.toArray(g,_),g[_+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function Ix(i){let t=new WeakMap;function e(o,a){return a===ph?o.mapping=Wr:a===mh&&(o.mapping=Xr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===ph||a===mh)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new R1(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Nr=4,Kf=[.125,.215,.35,.446,.526,.582],Xs=20,xl=new kc,qf=new $t;let Ml=null,yl=0,bl=0,Sl=!1;const Hs=(1+Math.sqrt(5))/2,br=1/Hs,$f=[new F(-Hs,br,0),new F(Hs,br,0),new F(-br,0,Hs),new F(br,0,Hs),new F(0,Hs,-br),new F(0,Hs,br),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],kx=new F;class jf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=kx}=r;Ml=this._renderer.getRenderTarget(),yl=this._renderer.getActiveCubeFace(),bl=this._renderer.getActiveMipmapLevel(),Sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Jf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Ml,yl,bl),this._renderer.xr.enabled=Sl,t.scissorTest=!1,Da(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Wr||t.mapping===Xr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ml=this._renderer.getRenderTarget(),yl=this._renderer.getActiveCubeFace(),bl=this._renderer.getActiveMipmapLevel(),Sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:_i,minFilter:_i,generateMipmaps:!1,type:Yi,format:xi,colorSpace:Yr,depthBuffer:!1},s=Zf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zf(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Nx(r)),this._blurMaterial=Ux(r,t,e)}return s}_compileMaterial(t){const e=new ge(this._lodPlanes[0],t);this._renderer.compile(e,xl)}_sceneToCubeUV(t,e,n,s,r){const c=new $n(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(qf),u.toneMapping=Es,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const v=new nr({name:"PMREM.Background",side:Un,depthWrite:!1,depthTest:!1}),g=new ge(new tn,v);let p=!1;const M=t.background;M?M.isColor&&(v.color.copy(M),t.background=null,p=!0):(v.color.copy(qf),p=!0);for(let E=0;E<6;E++){const _=E%3;_===0?(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[E],r.y,r.z)):_===1?(c.up.set(0,0,l[E]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[E],r.z)):(c.up.set(0,l[E],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[E]));const T=this._cubeSize;Da(s,_*T,E>2?T:0,T,T),u.setRenderTarget(s),p&&u.render(g,c),u.render(t,c)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Wr||t.mapping===Xr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Jf());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new ge(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;Da(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,xl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=$f[(s-r-1)%$f.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new ge(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Xs-1),v=r/m,g=isFinite(r)?1+Math.floor(h*v):Xs;g>Xs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Xs}`);const p=[];let M=0;for(let b=0;b<Xs;++b){const C=b/v,x=Math.exp(-C*C/2);p.push(x),b===0?M+=x:b<g&&(M+=2*x)}for(let b=0;b<p.length;b++)p[b]=p[b]/M;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:E}=this;f.dTheta.value=m,f.mipInt.value=E-n;const _=this._sizeLods[s],T=3*_*(s>E-Nr?s-E+Nr:0),w=4*(this._cubeSize-_);Da(e,T,w,3*_,2*_),c.setRenderTarget(e),c.render(u,xl)}}function Nx(i){const t=[],e=[],n=[];let s=i;const r=i-Nr+1+Kf.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Nr?c=Kf[o-i+Nr-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,v=3,g=2,p=1,M=new Float32Array(v*m*d),E=new Float32Array(g*m*d),_=new Float32Array(p*m*d);for(let w=0;w<d;w++){const b=w%3*2/3-1,C=w>2?0:-1,x=[b,C,0,b+2/3,C,0,b+2/3,C+1,0,b,C,0,b+2/3,C+1,0,b,C+1,0];M.set(x,v*m*w),E.set(f,g*m*w);const y=[w,w,w,w,w,w];_.set(y,p*m*w)}const T=new qe;T.setAttribute("position",new we(M,v)),T.setAttribute("uv",new we(E,g)),T.setAttribute("faceIndex",new we(_,p)),t.push(T),s>Nr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Zf(i,t,e){const n=new oi(i,t,e);return n.texture.mapping=Dc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Da(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Ux(i,t,e){const n=new Float32Array(Xs),s=new F(0,1,0);return new an({name:"SphericalGaussianBlur",defines:{n:Xs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Iu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function Jf(){return new an({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Iu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function Qf(){return new an({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Iu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ss,depthTest:!1,depthWrite:!1})}function Iu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ox(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===ph||c===mh,h=c===Wr||c===Xr;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new jf(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new jf(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function Fx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Oo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Bx(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const m in f.attributes)t.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,m=u.attributes.position;let v=0;if(d!==null){const M=d.array;v=d.version;for(let E=0,_=M.length;E<_;E+=3){const T=M[E+0],w=M[E+1],b=M[E+2];f.push(T,w,w,b,b,T)}}else if(m!==void 0){const M=m.array;v=m.version;for(let E=0,_=M.length/3-1;E<_;E+=3){const T=E+0,w=E+1,b=E+2;f.push(T,w,w,b,b,T)}}else return;const g=new(ip(f)?ap:op)(f,1);g.version=v;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function zx(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,f*o,m),e.update(d,n,m))}function h(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];e.update(g,n,1)}function u(f,d,m,v){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,v,0,m);let p=0;for(let M=0;M<m;M++)p+=d[M]*v[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Gx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Hx(i,t,e){const n=new WeakMap,s=new Ge;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let x=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",x)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let E=0;d===!0&&(E=1),m===!0&&(E=2),v===!0&&(E=3);let _=a.attributes.position.count*E,T=1;_>t.maxTextureSize&&(T=Math.ceil(_/t.maxTextureSize),_=t.maxTextureSize);const w=new Float32Array(_*T*4*u),b=new Cu(w,_,T,u);b.type=Ai,b.needsUpdate=!0;const C=E*4;for(let y=0;y<u;y++){const R=g[y],P=p[y],N=M[y],B=_*T*4*y;for(let X=0;X<R.count;X++){const V=X*C;d===!0&&(s.fromBufferAttribute(R,X),w[B+V+0]=s.x,w[B+V+1]=s.y,w[B+V+2]=s.z,w[B+V+3]=0),m===!0&&(s.fromBufferAttribute(P,X),w[B+V+4]=s.x,w[B+V+5]=s.y,w[B+V+6]=s.z,w[B+V+7]=0),v===!0&&(s.fromBufferAttribute(N,X),w[B+V+8]=s.x,w[B+V+9]=s.y,w[B+V+10]=s.z,w[B+V+11]=N.itemSize===4?s.w:1)}}f={count:u,texture:b,size:new Vt(_,T)},n.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let v=0;v<l.length;v++)d+=l[v];const m=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Vx(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const Sp=new Dn,td=new mc(1,1),Ep=new Cu,wp=new f1,Tp=new hp,ed=[],nd=[],id=new Float32Array(16),sd=new Float32Array(9),rd=new Float32Array(4);function oo(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=ed[s];if(r===void 0&&(r=new Float32Array(s),ed[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function ln(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function hn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Nc(i,t){let e=nd[t];e===void 0&&(e=new Int32Array(t),nd[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Wx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Xx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2fv(this.addr,t),hn(e,t)}}function Yx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ln(e,t))return;i.uniform3fv(this.addr,t),hn(e,t)}}function Kx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4fv(this.addr,t),hn(e,t)}}function qx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),hn(e,t)}else{if(ln(e,n))return;rd.set(n),i.uniformMatrix2fv(this.addr,!1,rd),hn(e,n)}}function $x(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),hn(e,t)}else{if(ln(e,n))return;sd.set(n),i.uniformMatrix3fv(this.addr,!1,sd),hn(e,n)}}function jx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(ln(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),hn(e,t)}else{if(ln(e,n))return;id.set(n),i.uniformMatrix4fv(this.addr,!1,id),hn(e,n)}}function Zx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Jx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2iv(this.addr,t),hn(e,t)}}function Qx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ln(e,t))return;i.uniform3iv(this.addr,t),hn(e,t)}}function tM(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4iv(this.addr,t),hn(e,t)}}function eM(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function nM(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ln(e,t))return;i.uniform2uiv(this.addr,t),hn(e,t)}}function iM(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ln(e,t))return;i.uniform3uiv(this.addr,t),hn(e,t)}}function sM(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ln(e,t))return;i.uniform4uiv(this.addr,t),hn(e,t)}}function rM(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(td.compareFunction=Au,r=td):r=Sp,e.setTexture2D(t||r,s)}function oM(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||wp,s)}function aM(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Tp,s)}function cM(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Ep,s)}function lM(i){switch(i){case 5126:return Wx;case 35664:return Xx;case 35665:return Yx;case 35666:return Kx;case 35674:return qx;case 35675:return $x;case 35676:return jx;case 5124:case 35670:return Zx;case 35667:case 35671:return Jx;case 35668:case 35672:return Qx;case 35669:case 35673:return tM;case 5125:return eM;case 36294:return nM;case 36295:return iM;case 36296:return sM;case 35678:case 36198:case 36298:case 36306:case 35682:return rM;case 35679:case 36299:case 36307:return oM;case 35680:case 36300:case 36308:case 36293:return aM;case 36289:case 36303:case 36311:case 36292:return cM}}function hM(i,t){i.uniform1fv(this.addr,t)}function uM(i,t){const e=oo(t,this.size,2);i.uniform2fv(this.addr,e)}function fM(i,t){const e=oo(t,this.size,3);i.uniform3fv(this.addr,e)}function dM(i,t){const e=oo(t,this.size,4);i.uniform4fv(this.addr,e)}function pM(i,t){const e=oo(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function mM(i,t){const e=oo(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function gM(i,t){const e=oo(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function vM(i,t){i.uniform1iv(this.addr,t)}function _M(i,t){i.uniform2iv(this.addr,t)}function xM(i,t){i.uniform3iv(this.addr,t)}function MM(i,t){i.uniform4iv(this.addr,t)}function yM(i,t){i.uniform1uiv(this.addr,t)}function bM(i,t){i.uniform2uiv(this.addr,t)}function SM(i,t){i.uniform3uiv(this.addr,t)}function EM(i,t){i.uniform4uiv(this.addr,t)}function wM(i,t,e){const n=this.cache,s=t.length,r=Nc(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Sp,r[o])}function TM(i,t,e){const n=this.cache,s=t.length,r=Nc(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||wp,r[o])}function AM(i,t,e){const n=this.cache,s=t.length,r=Nc(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Tp,r[o])}function RM(i,t,e){const n=this.cache,s=t.length,r=Nc(e,s);ln(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Ep,r[o])}function CM(i){switch(i){case 5126:return hM;case 35664:return uM;case 35665:return fM;case 35666:return dM;case 35674:return pM;case 35675:return mM;case 35676:return gM;case 5124:case 35670:return vM;case 35667:case 35671:return _M;case 35668:case 35672:return xM;case 35669:case 35673:return MM;case 5125:return yM;case 36294:return bM;case 36295:return SM;case 36296:return EM;case 35678:case 36198:case 36298:case 36306:case 35682:return wM;case 35679:case 36299:case 36307:return TM;case 35680:case 36300:case 36308:case 36293:return AM;case 36289:case 36303:case 36311:case 36292:return RM}}class LM{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=lM(e.type)}}class DM{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=CM(e.type)}}class PM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const El=/(\w+)(\])?(\[|\.)?/g;function od(i,t){i.seq.push(t),i.map[t.id]=t}function IM(i,t,e){const n=i.name,s=n.length;for(El.lastIndex=0;;){const r=El.exec(n),o=El.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){od(e,l===void 0?new LM(a,i,t):new DM(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new PM(a),od(e,u)),e=u}}}class nc{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);IM(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function ad(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const kM=37297;let NM=0;function UM(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const cd=new ee;function OM(i){Me._getMatrix(cd,Me.workingColorSpace,i);const t=`mat3( ${cd.elements.map(e=>e.toFixed(4))} )`;switch(Me.getTransfer(i)){case lc:return[t,"LinearTransferOETF"];case Re:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function ld(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+UM(i.getShaderSource(t),a)}else return r}function FM(i,t){const e=OM(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function BM(i,t){let e;switch(t){case zg:e="Linear";break;case Gg:e="Reinhard";break;case Hg:e="Cineon";break;case Vg:e="ACESFilmic";break;case Xg:e="AgX";break;case Yg:e="Neutral";break;case Wg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Pa=new F;function zM(){Me.getLuminanceCoefficients(Pa);const i=Pa.x.toFixed(4),t=Pa.y.toFixed(4),e=Pa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function GM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wo).join(`
`)}function HM(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function VM(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function wo(i){return i!==""}function hd(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ud(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const WM=/^[ \t]*#include +<([\w\d./]+)>/gm;function jh(i){return i.replace(WM,YM)}const XM=new Map;function YM(i,t){let e=se[t];if(e===void 0){const n=XM.get(t);if(n!==void 0)e=se[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return jh(e)}const KM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fd(i){return i.replace(KM,qM)}function qM(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function dd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function $M(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===q0?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===xg?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Fi&&(t="SHADOWMAP_TYPE_VSM"),t}function jM(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Wr:case Xr:t="ENVMAP_TYPE_CUBE";break;case Dc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function ZM(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Xr:t="ENVMAP_MODE_REFRACTION";break}return t}function JM(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Lc:t="ENVMAP_BLENDING_MULTIPLY";break;case Fg:t="ENVMAP_BLENDING_MIX";break;case Bg:t="ENVMAP_BLENDING_ADD";break}return t}function QM(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function ty(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=$M(e),l=jM(e),h=ZM(e),u=JM(e),f=QM(e),d=GM(e),m=HM(r),v=s.createProgram();let g,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(wo).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(wo).join(`
`),p.length>0&&(p+=`
`)):(g=[dd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wo).join(`
`),p=[dd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Es?"#define TONE_MAPPING":"",e.toneMapping!==Es?se.tonemapping_pars_fragment:"",e.toneMapping!==Es?BM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,FM("linearToOutputTexel",e.outputColorSpace),zM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(wo).join(`
`)),o=jh(o),o=hd(o,e),o=ud(o,e),a=jh(a),a=hd(a,e),a=ud(a,e),o=fd(o),a=fd(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Hi?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Hi?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=M+g+o,_=M+p+a,T=ad(s,s.VERTEX_SHADER,E),w=ad(s,s.FRAGMENT_SHADER,_);s.attachShader(v,T),s.attachShader(v,w),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function b(R){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(v)||"",N=s.getShaderInfoLog(T)||"",B=s.getShaderInfoLog(w)||"",X=P.trim(),V=N.trim(),K=B.trim();let G=!0,Z=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,w);else{const rt=ld(s,T,"vertex"),yt=ld(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+X+`
`+rt+`
`+yt)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(V===""||K==="")&&(Z=!1);Z&&(R.diagnostics={runnable:G,programLog:X,vertexShader:{log:V,prefix:g},fragmentShader:{log:K,prefix:p}})}s.deleteShader(T),s.deleteShader(w),C=new nc(s,v),x=VM(s,v)}let C;this.getUniforms=function(){return C===void 0&&b(this),C};let x;this.getAttributes=function(){return x===void 0&&b(this),x};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,kM)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=NM++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=w,this}let ey=0;class ny{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new iy(t),e.set(t,n)),n}}class iy{constructor(t){this.id=ey++,this.code=t,this.usedTimes=0}}function sy(i,t,e,n,s,r,o){const a=new sp,c=new ny,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return l.add(x),x===0?"uv":`uv${x}`}function g(x,y,R,P,N){const B=P.fog,X=N.geometry,V=x.isMeshStandardMaterial?P.environment:null,K=(x.isMeshStandardMaterial?e:t).get(x.envMap||V),G=K&&K.mapping===Dc?K.image.height:null,Z=m[x.type];x.precision!==null&&(d=s.getMaxPrecision(x.precision),d!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const rt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,yt=rt!==void 0?rt.length:0;let Bt=0;X.morphAttributes.position!==void 0&&(Bt=1),X.morphAttributes.normal!==void 0&&(Bt=2),X.morphAttributes.color!==void 0&&(Bt=3);let Wt,ne,ae,Q;if(Z){const be=wi[Z];Wt=be.vertexShader,ne=be.fragmentShader}else Wt=x.vertexShader,ne=x.fragmentShader,c.update(x),ae=c.getVertexShaderID(x),Q=c.getFragmentShaderID(x);const nt=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),zt=N.isInstancedMesh===!0,_t=N.isBatchedMesh===!0,de=!!x.map,Sn=!!x.matcap,O=!!K,Ue=!!x.aoMap,Qt=!!x.lightMap,Kt=!!x.bumpMap,Rt=!!x.normalMap,Oe=!!x.displacementMap,Ct=!!x.emissiveMap,ie=!!x.metalnessMap,fn=!!x.roughnessMap,Xe=x.anisotropy>0,I=x.clearcoat>0,L=x.dispersion>0,Y=x.iridescence>0,et=x.sheen>0,st=x.transmission>0,J=Xe&&!!x.anisotropyMap,Nt=I&&!!x.clearcoatMap,ht=I&&!!x.clearcoatNormalMap,Dt=I&&!!x.clearcoatRoughnessMap,It=Y&&!!x.iridescenceMap,ct=Y&&!!x.iridescenceThicknessMap,xt=et&&!!x.sheenColorMap,Yt=et&&!!x.sheenRoughnessMap,kt=!!x.specularMap,gt=!!x.specularColorMap,te=!!x.specularIntensityMap,z=st&&!!x.transmissionMap,lt=st&&!!x.thicknessMap,ut=!!x.gradientMap,Et=!!x.alphaMap,ot=x.alphaTest>0,it=!!x.alphaHash,Tt=!!x.extensions;let Zt=Es;x.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Zt=i.toneMapping);const Pe={shaderID:Z,shaderType:x.type,shaderName:x.name,vertexShader:Wt,fragmentShader:ne,defines:x.defines,customVertexShaderID:ae,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:_t,batchingColor:_t&&N._colorsTexture!==null,instancing:zt,instancingColor:zt&&N.instanceColor!==null,instancingMorph:zt&&N.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Yr,alphaToCoverage:!!x.alphaToCoverage,map:de,matcap:Sn,envMap:O,envMapMode:O&&K.mapping,envMapCubeUVHeight:G,aoMap:Ue,lightMap:Qt,bumpMap:Kt,normalMap:Rt,displacementMap:f&&Oe,emissiveMap:Ct,normalMapObjectSpace:Rt&&x.normalMapType===jg,normalMapTangentSpace:Rt&&x.normalMapType===Pc,metalnessMap:ie,roughnessMap:fn,anisotropy:Xe,anisotropyMap:J,clearcoat:I,clearcoatMap:Nt,clearcoatNormalMap:ht,clearcoatRoughnessMap:Dt,dispersion:L,iridescence:Y,iridescenceMap:It,iridescenceThicknessMap:ct,sheen:et,sheenColorMap:xt,sheenRoughnessMap:Yt,specularMap:kt,specularColorMap:gt,specularIntensityMap:te,transmission:st,transmissionMap:z,thicknessMap:lt,gradientMap:ut,opaque:x.transparent===!1&&x.blending===Br&&x.alphaToCoverage===!1,alphaMap:Et,alphaTest:ot,alphaHash:it,combine:x.combine,mapUv:de&&v(x.map.channel),aoMapUv:Ue&&v(x.aoMap.channel),lightMapUv:Qt&&v(x.lightMap.channel),bumpMapUv:Kt&&v(x.bumpMap.channel),normalMapUv:Rt&&v(x.normalMap.channel),displacementMapUv:Oe&&v(x.displacementMap.channel),emissiveMapUv:Ct&&v(x.emissiveMap.channel),metalnessMapUv:ie&&v(x.metalnessMap.channel),roughnessMapUv:fn&&v(x.roughnessMap.channel),anisotropyMapUv:J&&v(x.anisotropyMap.channel),clearcoatMapUv:Nt&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:ht&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Dt&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:It&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:Yt&&v(x.sheenRoughnessMap.channel),specularMapUv:kt&&v(x.specularMap.channel),specularColorMapUv:gt&&v(x.specularColorMap.channel),specularIntensityMapUv:te&&v(x.specularIntensityMap.channel),transmissionMapUv:z&&v(x.transmissionMap.channel),thicknessMapUv:lt&&v(x.thicknessMap.channel),alphaMapUv:Et&&v(x.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Rt||Xe),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!X.attributes.uv&&(de||Et),fog:!!B,useFog:x.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:mt,skinning:N.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:yt,morphTextureStride:Bt,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:Zt,decodeVideoTexture:de&&x.map.isVideoTexture===!0&&Me.getTransfer(x.map.colorSpace)===Re,decodeVideoTextureEmissive:Ct&&x.emissiveMap.isVideoTexture===!0&&Me.getTransfer(x.emissiveMap.colorSpace)===Re,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ii,flipSided:x.side===Un,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Tt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Tt&&x.extensions.multiDraw===!0||_t)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Pe.vertexUv1s=l.has(1),Pe.vertexUv2s=l.has(2),Pe.vertexUv3s=l.has(3),l.clear(),Pe}function p(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const R in x.defines)y.push(R),y.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(M(y,x),E(y,x),y.push(i.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function M(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function E(x,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),x.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),x.push(a.mask)}function _(x){const y=m[x.type];let R;if(y){const P=wi[y];R=qh.clone(P.uniforms)}else R=x.uniforms;return R}function T(x,y){let R;for(let P=0,N=h.length;P<N;P++){const B=h[P];if(B.cacheKey===y){R=B,++R.usedTimes;break}}return R===void 0&&(R=new ty(i,y,x,r),h.push(R)),R}function w(x){if(--x.usedTimes===0){const y=h.indexOf(x);h[y]=h[h.length-1],h.pop(),x.destroy()}}function b(x){c.remove(x)}function C(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:_,acquireProgram:T,releaseProgram:w,releaseShaderCache:b,programs:h,dispose:C}}function ry(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function oy(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function pd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function md(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,m,v,g){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:v,group:g},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=v,p.group=g),t++,p}function a(u,f,d,m,v,g){const p=o(u,f,d,m,v,g);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,m,v,g){const p=o(u,f,d,m,v,g);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||oy),n.length>1&&n.sort(f||pd),s.length>1&&s.sort(f||pd)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function ay(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new md,i.set(n,[o])):s>=r.length?(o=new md,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function cy(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new $t};break;case"SpotLight":e={position:new F,direction:new F,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new $t,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":e={color:new $t,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function ly(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let hy=0;function uy(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function fy(i){const t=new cy,e=ly(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const s=new F,r=new ve,o=new ve;function a(l){let h=0,u=0,f=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let d=0,m=0,v=0,g=0,p=0,M=0,E=0,_=0,T=0,w=0,b=0;l.sort(uy);for(let x=0,y=l.length;x<y;x++){const R=l[x],P=R.color,N=R.intensity,B=R.distance,X=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=P.r*N,u+=P.g*N,f+=P.b*N;else if(R.isLightProbe){for(let V=0;V<9;V++)n.probe[V].addScaledVector(R.sh.coefficients[V],N);b++}else if(R.isDirectionalLight){const V=t.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const K=R.shadow,G=e.get(R);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=X,n.directionalShadowMatrix[d]=R.shadow.matrix,M++}n.directional[d]=V,d++}else if(R.isSpotLight){const V=t.get(R);V.position.setFromMatrixPosition(R.matrixWorld),V.color.copy(P).multiplyScalar(N),V.distance=B,V.coneCos=Math.cos(R.angle),V.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),V.decay=R.decay,n.spot[v]=V;const K=R.shadow;if(R.map&&(n.spotLightMap[T]=R.map,T++,K.updateMatrices(R),R.castShadow&&w++),n.spotLightMatrix[v]=K.matrix,R.castShadow){const G=e.get(R);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.spotShadow[v]=G,n.spotShadowMap[v]=X,_++}v++}else if(R.isRectAreaLight){const V=t.get(R);V.color.copy(P).multiplyScalar(N),V.halfWidth.set(R.width*.5,0,0),V.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=V,g++}else if(R.isPointLight){const V=t.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),V.distance=R.distance,V.decay=R.decay,R.castShadow){const K=R.shadow,G=e.get(R);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,G.shadowCameraNear=K.camera.near,G.shadowCameraFar=K.camera.far,n.pointShadow[m]=G,n.pointShadowMap[m]=X,n.pointShadowMatrix[m]=R.shadow.matrix,E++}n.point[m]=V,m++}else if(R.isHemisphereLight){const V=t.get(R);V.skyColor.copy(R.color).multiplyScalar(N),V.groundColor.copy(R.groundColor).multiplyScalar(N),n.hemi[p]=V,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const C=n.hash;(C.directionalLength!==d||C.pointLength!==m||C.spotLength!==v||C.rectAreaLength!==g||C.hemiLength!==p||C.numDirectionalShadows!==M||C.numPointShadows!==E||C.numSpotShadows!==_||C.numSpotMaps!==T||C.numLightProbes!==b)&&(n.directional.length=d,n.spot.length=v,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=_+T-w,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=b,C.directionalLength=d,C.pointLength=m,C.spotLength=v,C.rectAreaLength=g,C.hemiLength=p,C.numDirectionalShadows=M,C.numPointShadows=E,C.numSpotShadows=_,C.numSpotMaps=T,C.numLightProbes=b,n.version=hy++)}function c(l,h){let u=0,f=0,d=0,m=0,v=0;const g=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const E=l[p];if(E.isDirectionalLight){const _=n.directional[u];_.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),u++}else if(E.isSpotLight){const _=n.spot[d];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(g),_.direction.setFromMatrixPosition(E.matrixWorld),s.setFromMatrixPosition(E.target.matrixWorld),_.direction.sub(s),_.direction.transformDirection(g),d++}else if(E.isRectAreaLight){const _=n.rectArea[m];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(g),o.identity(),r.copy(E.matrixWorld),r.premultiply(g),o.extractRotation(r),_.halfWidth.set(E.width*.5,0,0),_.halfHeight.set(0,E.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),m++}else if(E.isPointLight){const _=n.point[f];_.position.setFromMatrixPosition(E.matrixWorld),_.position.applyMatrix4(g),f++}else if(E.isHemisphereLight){const _=n.hemi[v];_.direction.setFromMatrixPosition(E.matrixWorld),_.direction.transformDirection(g),v++}}}return{setup:a,setupView:c,state:n}}function gd(i){const t=new fy(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function dy(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new gd(i),t.set(s,[a])):r>=o.length?(a=new gd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const py=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,my=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function gy(i,t,e){let n=new Fo;const s=new Vt,r=new Vt,o=new Ge,a=new _p({depthPacking:$g}),c=new H1,l={},h=e.maxTextureSize,u={[qi]:Un,[Un]:qi,[ii]:ii},f=new an({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Vt},radius:{value:4}},vertexShader:py,fragmentShader:my}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const m=new qe;m.setAttribute("position",new we(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new ge(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=q0;let p=this.type;this.render=function(w,b,C){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;const x=i.getRenderTarget(),y=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),P=i.state;P.setBlending(Ss),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const N=p!==Fi&&this.type===Fi,B=p===Fi&&this.type!==Fi;for(let X=0,V=w.length;X<V;X++){const K=w[X],G=K.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const Z=G.getFrameExtents();if(s.multiply(Z),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Z.x),s.x=r.x*Z.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Z.y),s.y=r.y*Z.y,G.mapSize.y=r.y)),G.map===null||N===!0||B===!0){const yt=this.type!==Fi?{minFilter:vn,magFilter:vn}:{};G.map!==null&&G.map.dispose(),G.map=new oi(s.x,s.y,yt),G.map.texture.name=K.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const rt=G.getViewportCount();for(let yt=0;yt<rt;yt++){const Bt=G.getViewport(yt);o.set(r.x*Bt.x,r.y*Bt.y,r.x*Bt.z,r.y*Bt.w),P.viewport(o),G.updateMatrices(K,yt),n=G.getFrustum(),_(b,C,G.camera,K,this.type)}G.isPointLightShadow!==!0&&this.type===Fi&&M(G,C),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(x,y,R)};function M(w,b){const C=t.update(v);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new oi(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(b,null,C,f,v,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(b,null,C,d,v,null)}function E(w,b,C,x){let y=null;const R=C.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)y=R;else if(y=C.isPointLight===!0?c:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){const P=y.uuid,N=b.uuid;let B=l[P];B===void 0&&(B={},l[P]=B);let X=B[N];X===void 0&&(X=y.clone(),B[N]=X,b.addEventListener("dispose",T)),y=X}if(y.visible=b.visible,y.wireframe=b.wireframe,x===Fi?y.side=b.shadowSide!==null?b.shadowSide:b.side:y.side=b.shadowSide!==null?b.shadowSide:u[b.side],y.alphaMap=b.alphaMap,y.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,y.map=b.map,y.clipShadows=b.clipShadows,y.clippingPlanes=b.clippingPlanes,y.clipIntersection=b.clipIntersection,y.displacementMap=b.displacementMap,y.displacementScale=b.displacementScale,y.displacementBias=b.displacementBias,y.wireframeLinewidth=b.wireframeLinewidth,y.linewidth=b.linewidth,C.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const P=i.properties.get(y);P.light=C}return y}function _(w,b,C,x,y){if(w.visible===!1)return;if(w.layers.test(b.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===Fi)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,w.matrixWorld);const N=t.update(w),B=w.material;if(Array.isArray(B)){const X=N.groups;for(let V=0,K=X.length;V<K;V++){const G=X[V],Z=B[G.materialIndex];if(Z&&Z.visible){const rt=E(w,Z,x,y);w.onBeforeShadow(i,w,b,C,N,rt,G),i.renderBufferDirect(C,null,N,rt,w,G),w.onAfterShadow(i,w,b,C,N,rt,G)}}}else if(B.visible){const X=E(w,B,x,y);w.onBeforeShadow(i,w,b,C,N,X,null),i.renderBufferDirect(C,null,N,X,w,null),w.onAfterShadow(i,w,b,C,N,X,null)}}const P=w.children;for(let N=0,B=P.length;N<B;N++)_(P[N],b,C,x,y)}function T(w){w.target.removeEventListener("dispose",T);for(const C in l){const x=l[C],y=w.target.uuid;y in x&&(x[y].dispose(),delete x[y])}}}const vy={[ah]:ch,[lh]:fh,[hh]:dh,[Vr]:uh,[ch]:ah,[fh]:lh,[dh]:hh,[uh]:Vr};function _y(i,t){function e(){let z=!1;const lt=new Ge;let ut=null;const Et=new Ge(0,0,0,0);return{setMask:function(ot){ut!==ot&&!z&&(i.colorMask(ot,ot,ot,ot),ut=ot)},setLocked:function(ot){z=ot},setClear:function(ot,it,Tt,Zt,Pe){Pe===!0&&(ot*=Zt,it*=Zt,Tt*=Zt),lt.set(ot,it,Tt,Zt),Et.equals(lt)===!1&&(i.clearColor(ot,it,Tt,Zt),Et.copy(lt))},reset:function(){z=!1,ut=null,Et.set(-1,0,0,0)}}}function n(){let z=!1,lt=!1,ut=null,Et=null,ot=null;return{setReversed:function(it){if(lt!==it){const Tt=t.get("EXT_clip_control");it?Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.ZERO_TO_ONE_EXT):Tt.clipControlEXT(Tt.LOWER_LEFT_EXT,Tt.NEGATIVE_ONE_TO_ONE_EXT),lt=it;const Zt=ot;ot=null,this.setClear(Zt)}},getReversed:function(){return lt},setTest:function(it){it?nt(i.DEPTH_TEST):mt(i.DEPTH_TEST)},setMask:function(it){ut!==it&&!z&&(i.depthMask(it),ut=it)},setFunc:function(it){if(lt&&(it=vy[it]),Et!==it){switch(it){case ah:i.depthFunc(i.NEVER);break;case ch:i.depthFunc(i.ALWAYS);break;case lh:i.depthFunc(i.LESS);break;case Vr:i.depthFunc(i.LEQUAL);break;case hh:i.depthFunc(i.EQUAL);break;case uh:i.depthFunc(i.GEQUAL);break;case fh:i.depthFunc(i.GREATER);break;case dh:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Et=it}},setLocked:function(it){z=it},setClear:function(it){ot!==it&&(lt&&(it=1-it),i.clearDepth(it),ot=it)},reset:function(){z=!1,ut=null,Et=null,ot=null,lt=!1}}}function s(){let z=!1,lt=null,ut=null,Et=null,ot=null,it=null,Tt=null,Zt=null,Pe=null;return{setTest:function(be){z||(be?nt(i.STENCIL_TEST):mt(i.STENCIL_TEST))},setMask:function(be){lt!==be&&!z&&(i.stencilMask(be),lt=be)},setFunc:function(be,Di,bi){(ut!==be||Et!==Di||ot!==bi)&&(i.stencilFunc(be,Di,bi),ut=be,Et=Di,ot=bi)},setOp:function(be,Di,bi){(it!==be||Tt!==Di||Zt!==bi)&&(i.stencilOp(be,Di,bi),it=be,Tt=Di,Zt=bi)},setLocked:function(be){z=be},setClear:function(be){Pe!==be&&(i.clearStencil(be),Pe=be)},reset:function(){z=!1,lt=null,ut=null,Et=null,ot=null,it=null,Tt=null,Zt=null,Pe=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],m=null,v=!1,g=null,p=null,M=null,E=null,_=null,T=null,w=null,b=new $t(0,0,0),C=0,x=!1,y=null,R=null,P=null,N=null,B=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,K=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(G)[1]),V=K>=1):G.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),V=K>=2);let Z=null,rt={};const yt=i.getParameter(i.SCISSOR_BOX),Bt=i.getParameter(i.VIEWPORT),Wt=new Ge().fromArray(yt),ne=new Ge().fromArray(Bt);function ae(z,lt,ut,Et){const ot=new Uint8Array(4),it=i.createTexture();i.bindTexture(z,it),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Tt=0;Tt<ut;Tt++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,Et,0,i.RGBA,i.UNSIGNED_BYTE,ot):i.texImage2D(lt+Tt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ot);return it}const Q={};Q[i.TEXTURE_2D]=ae(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=ae(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=ae(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=ae(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(i.DEPTH_TEST),o.setFunc(Vr),Kt(!1),Rt(ff),nt(i.CULL_FACE),Ue(Ss);function nt(z){h[z]!==!0&&(i.enable(z),h[z]=!0)}function mt(z){h[z]!==!1&&(i.disable(z),h[z]=!1)}function zt(z,lt){return u[z]!==lt?(i.bindFramebuffer(z,lt),u[z]=lt,z===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=lt),z===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function _t(z,lt){let ut=d,Et=!1;if(z){ut=f.get(lt),ut===void 0&&(ut=[],f.set(lt,ut));const ot=z.textures;if(ut.length!==ot.length||ut[0]!==i.COLOR_ATTACHMENT0){for(let it=0,Tt=ot.length;it<Tt;it++)ut[it]=i.COLOR_ATTACHMENT0+it;ut.length=ot.length,Et=!0}}else ut[0]!==i.BACK&&(ut[0]=i.BACK,Et=!0);Et&&i.drawBuffers(ut)}function de(z){return m!==z?(i.useProgram(z),m=z,!0):!1}const Sn={[Vs]:i.FUNC_ADD,[yg]:i.FUNC_SUBTRACT,[bg]:i.FUNC_REVERSE_SUBTRACT};Sn[Sg]=i.MIN,Sn[Eg]=i.MAX;const O={[wg]:i.ZERO,[Tg]:i.ONE,[Ag]:i.SRC_COLOR,[rh]:i.SRC_ALPHA,[Ig]:i.SRC_ALPHA_SATURATE,[Dg]:i.DST_COLOR,[Cg]:i.DST_ALPHA,[Rg]:i.ONE_MINUS_SRC_COLOR,[oh]:i.ONE_MINUS_SRC_ALPHA,[Pg]:i.ONE_MINUS_DST_COLOR,[Lg]:i.ONE_MINUS_DST_ALPHA,[kg]:i.CONSTANT_COLOR,[Ng]:i.ONE_MINUS_CONSTANT_COLOR,[Ug]:i.CONSTANT_ALPHA,[Og]:i.ONE_MINUS_CONSTANT_ALPHA};function Ue(z,lt,ut,Et,ot,it,Tt,Zt,Pe,be){if(z===Ss){v===!0&&(mt(i.BLEND),v=!1);return}if(v===!1&&(nt(i.BLEND),v=!0),z!==Mg){if(z!==g||be!==x){if((p!==Vs||_!==Vs)&&(i.blendEquation(i.FUNC_ADD),p=Vs,_=Vs),be)switch(z){case Br:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cc:i.blendFunc(i.ONE,i.ONE);break;case df:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case pf:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Br:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case cc:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case df:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case pf:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}M=null,E=null,T=null,w=null,b.set(0,0,0),C=0,g=z,x=be}return}ot=ot||lt,it=it||ut,Tt=Tt||Et,(lt!==p||ot!==_)&&(i.blendEquationSeparate(Sn[lt],Sn[ot]),p=lt,_=ot),(ut!==M||Et!==E||it!==T||Tt!==w)&&(i.blendFuncSeparate(O[ut],O[Et],O[it],O[Tt]),M=ut,E=Et,T=it,w=Tt),(Zt.equals(b)===!1||Pe!==C)&&(i.blendColor(Zt.r,Zt.g,Zt.b,Pe),b.copy(Zt),C=Pe),g=z,x=!1}function Qt(z,lt){z.side===ii?mt(i.CULL_FACE):nt(i.CULL_FACE);let ut=z.side===Un;lt&&(ut=!ut),Kt(ut),z.blending===Br&&z.transparent===!1?Ue(Ss):Ue(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),o.setFunc(z.depthFunc),o.setTest(z.depthTest),o.setMask(z.depthWrite),r.setMask(z.colorWrite);const Et=z.stencilWrite;a.setTest(Et),Et&&(a.setMask(z.stencilWriteMask),a.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),a.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),Ct(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Kt(z){y!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),y=z)}function Rt(z){z!==vg?(nt(i.CULL_FACE),z!==R&&(z===ff?i.cullFace(i.BACK):z===_g?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):mt(i.CULL_FACE),R=z}function Oe(z){z!==P&&(V&&i.lineWidth(z),P=z)}function Ct(z,lt,ut){z?(nt(i.POLYGON_OFFSET_FILL),(N!==lt||B!==ut)&&(i.polygonOffset(lt,ut),N=lt,B=ut)):mt(i.POLYGON_OFFSET_FILL)}function ie(z){z?nt(i.SCISSOR_TEST):mt(i.SCISSOR_TEST)}function fn(z){z===void 0&&(z=i.TEXTURE0+X-1),Z!==z&&(i.activeTexture(z),Z=z)}function Xe(z,lt,ut){ut===void 0&&(Z===null?ut=i.TEXTURE0+X-1:ut=Z);let Et=rt[ut];Et===void 0&&(Et={type:void 0,texture:void 0},rt[ut]=Et),(Et.type!==z||Et.texture!==lt)&&(Z!==ut&&(i.activeTexture(ut),Z=ut),i.bindTexture(z,lt||Q[z]),Et.type=z,Et.texture=lt)}function I(){const z=rt[Z];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function L(){try{i.compressedTexImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Y(){try{i.compressedTexImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function et(){try{i.texSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function st(){try{i.texSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Nt(){try{i.compressedTexSubImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ht(){try{i.texStorage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Dt(){try{i.texStorage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function It(){try{i.texImage2D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ct(){try{i.texImage3D(...arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function xt(z){Wt.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),Wt.copy(z))}function Yt(z){ne.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),ne.copy(z))}function kt(z,lt){let ut=l.get(lt);ut===void 0&&(ut=new WeakMap,l.set(lt,ut));let Et=ut.get(z);Et===void 0&&(Et=i.getUniformBlockIndex(lt,z.name),ut.set(z,Et))}function gt(z,lt){const Et=l.get(lt).get(z);c.get(lt)!==Et&&(i.uniformBlockBinding(lt,Et,z.__bindingPointIndex),c.set(lt,Et))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Z=null,rt={},u={},f=new WeakMap,d=[],m=null,v=!1,g=null,p=null,M=null,E=null,_=null,T=null,w=null,b=new $t(0,0,0),C=0,x=!1,y=null,R=null,P=null,N=null,B=null,Wt.set(0,0,i.canvas.width,i.canvas.height),ne.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:mt,bindFramebuffer:zt,drawBuffers:_t,useProgram:de,setBlending:Ue,setMaterial:Qt,setFlipSided:Kt,setCullFace:Rt,setLineWidth:Oe,setPolygonOffset:Ct,setScissorTest:ie,activeTexture:fn,bindTexture:Xe,unbindTexture:I,compressedTexImage2D:L,compressedTexImage3D:Y,texImage2D:It,texImage3D:ct,updateUBOMapping:kt,uniformBlockBinding:gt,texStorage2D:ht,texStorage3D:Dt,texSubImage2D:et,texSubImage3D:st,compressedTexSubImage2D:J,compressedTexSubImage3D:Nt,scissor:xt,viewport:Yt,reset:te}}function xy(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Vt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,L){return d?new OffscreenCanvas(I,L):uc("canvas")}function v(I,L,Y){let et=1;const st=Xe(I);if((st.width>Y||st.height>Y)&&(et=Y/Math.max(st.width,st.height)),et<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const J=Math.floor(et*st.width),Nt=Math.floor(et*st.height);u===void 0&&(u=m(J,Nt));const ht=L?m(J,Nt):u;return ht.width=J,ht.height=Nt,ht.getContext("2d").drawImage(I,0,0,J,Nt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+J+"x"+Nt+")."),ht}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),I;return I}function g(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function M(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function E(I,L,Y,et,st=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let J=L;if(L===i.RED&&(Y===i.FLOAT&&(J=i.R32F),Y===i.HALF_FLOAT&&(J=i.R16F),Y===i.UNSIGNED_BYTE&&(J=i.R8)),L===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(J=i.R8UI),Y===i.UNSIGNED_SHORT&&(J=i.R16UI),Y===i.UNSIGNED_INT&&(J=i.R32UI),Y===i.BYTE&&(J=i.R8I),Y===i.SHORT&&(J=i.R16I),Y===i.INT&&(J=i.R32I)),L===i.RG&&(Y===i.FLOAT&&(J=i.RG32F),Y===i.HALF_FLOAT&&(J=i.RG16F),Y===i.UNSIGNED_BYTE&&(J=i.RG8)),L===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(J=i.RG8UI),Y===i.UNSIGNED_SHORT&&(J=i.RG16UI),Y===i.UNSIGNED_INT&&(J=i.RG32UI),Y===i.BYTE&&(J=i.RG8I),Y===i.SHORT&&(J=i.RG16I),Y===i.INT&&(J=i.RG32I)),L===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(J=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(J=i.RGB16UI),Y===i.UNSIGNED_INT&&(J=i.RGB32UI),Y===i.BYTE&&(J=i.RGB8I),Y===i.SHORT&&(J=i.RGB16I),Y===i.INT&&(J=i.RGB32I)),L===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),Y===i.UNSIGNED_INT&&(J=i.RGBA32UI),Y===i.BYTE&&(J=i.RGBA8I),Y===i.SHORT&&(J=i.RGBA16I),Y===i.INT&&(J=i.RGBA32I)),L===i.RGB&&(Y===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),Y===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),L===i.RGBA){const Nt=st?lc:Me.getTransfer(et);Y===i.FLOAT&&(J=i.RGBA32F),Y===i.HALF_FLOAT&&(J=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(J=Nt===Re?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function _(I,L){let Y;return I?L===null||L===tr||L===ko?Y=i.DEPTH24_STENCIL8:L===Ai?Y=i.DEPTH32F_STENCIL8:L===Io&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):L===null||L===tr||L===ko?Y=i.DEPTH_COMPONENT24:L===Ai?Y=i.DEPTH_COMPONENT32F:L===Io&&(Y=i.DEPTH_COMPONENT16),Y}function T(I,L){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==vn&&I.minFilter!==_i?Math.log2(Math.max(L.width,L.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?L.mipmaps.length:1}function w(I){const L=I.target;L.removeEventListener("dispose",w),C(L),L.isVideoTexture&&h.delete(L)}function b(I){const L=I.target;L.removeEventListener("dispose",b),y(L)}function C(I){const L=n.get(I);if(L.__webglInit===void 0)return;const Y=I.source,et=f.get(Y);if(et){const st=et[L.__cacheKey];st.usedTimes--,st.usedTimes===0&&x(I),Object.keys(et).length===0&&f.delete(Y)}n.remove(I)}function x(I){const L=n.get(I);i.deleteTexture(L.__webglTexture);const Y=I.source,et=f.get(Y);delete et[L.__cacheKey],o.memory.textures--}function y(I){const L=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(L.__webglFramebuffer[et]))for(let st=0;st<L.__webglFramebuffer[et].length;st++)i.deleteFramebuffer(L.__webglFramebuffer[et][st]);else i.deleteFramebuffer(L.__webglFramebuffer[et]);L.__webglDepthbuffer&&i.deleteRenderbuffer(L.__webglDepthbuffer[et])}else{if(Array.isArray(L.__webglFramebuffer))for(let et=0;et<L.__webglFramebuffer.length;et++)i.deleteFramebuffer(L.__webglFramebuffer[et]);else i.deleteFramebuffer(L.__webglFramebuffer);if(L.__webglDepthbuffer&&i.deleteRenderbuffer(L.__webglDepthbuffer),L.__webglMultisampledFramebuffer&&i.deleteFramebuffer(L.__webglMultisampledFramebuffer),L.__webglColorRenderbuffer)for(let et=0;et<L.__webglColorRenderbuffer.length;et++)L.__webglColorRenderbuffer[et]&&i.deleteRenderbuffer(L.__webglColorRenderbuffer[et]);L.__webglDepthRenderbuffer&&i.deleteRenderbuffer(L.__webglDepthRenderbuffer)}const Y=I.textures;for(let et=0,st=Y.length;et<st;et++){const J=n.get(Y[et]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(Y[et])}n.remove(I)}let R=0;function P(){R=0}function N(){const I=R;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),R+=1,I}function B(I){const L=[];return L.push(I.wrapS),L.push(I.wrapT),L.push(I.wrapR||0),L.push(I.magFilter),L.push(I.minFilter),L.push(I.anisotropy),L.push(I.internalFormat),L.push(I.format),L.push(I.type),L.push(I.generateMipmaps),L.push(I.premultiplyAlpha),L.push(I.flipY),L.push(I.unpackAlignment),L.push(I.colorSpace),L.join()}function X(I,L){const Y=n.get(I);if(I.isVideoTexture&&ie(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&Y.__version!==I.version){const et=I.image;if(et===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(Y,I,L);return}}else I.isExternalTexture&&(Y.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+L)}function V(I,L){const Y=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&Y.__version!==I.version){Q(Y,I,L);return}e.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+L)}function K(I,L){const Y=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&Y.__version!==I.version){Q(Y,I,L);return}e.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+L)}function G(I,L){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){nt(Y,I,L);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+L)}const Z={[gh]:i.REPEAT,[js]:i.CLAMP_TO_EDGE,[vh]:i.MIRRORED_REPEAT},rt={[vn]:i.NEAREST,[Kg]:i.NEAREST_MIPMAP_NEAREST,[Eo]:i.NEAREST_MIPMAP_LINEAR,[_i]:i.LINEAR,[Xc]:i.LINEAR_MIPMAP_NEAREST,[Zs]:i.LINEAR_MIPMAP_LINEAR},yt={[Zg]:i.NEVER,[i1]:i.ALWAYS,[Jg]:i.LESS,[Au]:i.LEQUAL,[Qg]:i.EQUAL,[n1]:i.GEQUAL,[t1]:i.GREATER,[e1]:i.NOTEQUAL};function Bt(I,L){if(L.type===Ai&&t.has("OES_texture_float_linear")===!1&&(L.magFilter===_i||L.magFilter===Xc||L.magFilter===Eo||L.magFilter===Zs||L.minFilter===_i||L.minFilter===Xc||L.minFilter===Eo||L.minFilter===Zs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,Z[L.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,Z[L.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,Z[L.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,rt[L.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,rt[L.minFilter]),L.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,yt[L.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(L.magFilter===vn||L.minFilter!==Eo&&L.minFilter!==Zs||L.type===Ai&&t.has("OES_texture_float_linear")===!1)return;if(L.anisotropy>1||n.get(L).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(L.anisotropy,s.getMaxAnisotropy())),n.get(L).__currentAnisotropy=L.anisotropy}}}function Wt(I,L){let Y=!1;I.__webglInit===void 0&&(I.__webglInit=!0,L.addEventListener("dispose",w));const et=L.source;let st=f.get(et);st===void 0&&(st={},f.set(et,st));const J=B(L);if(J!==I.__cacheKey){st[J]===void 0&&(st[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),st[J].usedTimes++;const Nt=st[I.__cacheKey];Nt!==void 0&&(st[I.__cacheKey].usedTimes--,Nt.usedTimes===0&&x(L)),I.__cacheKey=J,I.__webglTexture=st[J].texture}return Y}function ne(I,L,Y){return Math.floor(Math.floor(I/Y)/L)}function ae(I,L,Y,et){const J=I.updateRanges;if(J.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,L.width,L.height,Y,et,L.data);else{J.sort((ct,xt)=>ct.start-xt.start);let Nt=0;for(let ct=1;ct<J.length;ct++){const xt=J[Nt],Yt=J[ct],kt=xt.start+xt.count,gt=ne(Yt.start,L.width,4),te=ne(xt.start,L.width,4);Yt.start<=kt+1&&gt===te&&ne(Yt.start+Yt.count-1,L.width,4)===gt?xt.count=Math.max(xt.count,Yt.start+Yt.count-xt.start):(++Nt,J[Nt]=Yt)}J.length=Nt+1;const ht=i.getParameter(i.UNPACK_ROW_LENGTH),Dt=i.getParameter(i.UNPACK_SKIP_PIXELS),It=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,L.width);for(let ct=0,xt=J.length;ct<xt;ct++){const Yt=J[ct],kt=Math.floor(Yt.start/4),gt=Math.ceil(Yt.count/4),te=kt%L.width,z=Math.floor(kt/L.width),lt=gt,ut=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,te),i.pixelStorei(i.UNPACK_SKIP_ROWS,z),e.texSubImage2D(i.TEXTURE_2D,0,te,z,lt,ut,Y,et,L.data)}I.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ht),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Dt),i.pixelStorei(i.UNPACK_SKIP_ROWS,It)}}function Q(I,L,Y){let et=i.TEXTURE_2D;(L.isDataArrayTexture||L.isCompressedArrayTexture)&&(et=i.TEXTURE_2D_ARRAY),L.isData3DTexture&&(et=i.TEXTURE_3D);const st=Wt(I,L),J=L.source;e.bindTexture(et,I.__webglTexture,i.TEXTURE0+Y);const Nt=n.get(J);if(J.version!==Nt.__version||st===!0){e.activeTexture(i.TEXTURE0+Y);const ht=Me.getPrimaries(Me.workingColorSpace),Dt=L.colorSpace===vs?null:Me.getPrimaries(L.colorSpace),It=L.colorSpace===vs||ht===Dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,L.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,L.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let ct=v(L.image,!1,s.maxTextureSize);ct=fn(L,ct);const xt=r.convert(L.format,L.colorSpace),Yt=r.convert(L.type);let kt=E(L.internalFormat,xt,Yt,L.colorSpace,L.isVideoTexture);Bt(et,L);let gt;const te=L.mipmaps,z=L.isVideoTexture!==!0,lt=Nt.__version===void 0||st===!0,ut=J.dataReady,Et=T(L,ct);if(L.isDepthTexture)kt=_(L.format===Uo,L.type),lt&&(z?e.texStorage2D(i.TEXTURE_2D,1,kt,ct.width,ct.height):e.texImage2D(i.TEXTURE_2D,0,kt,ct.width,ct.height,0,xt,Yt,null));else if(L.isDataTexture)if(te.length>0){z&&lt&&e.texStorage2D(i.TEXTURE_2D,Et,kt,te[0].width,te[0].height);for(let ot=0,it=te.length;ot<it;ot++)gt=te[ot],z?ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,gt.width,gt.height,xt,Yt,gt.data):e.texImage2D(i.TEXTURE_2D,ot,kt,gt.width,gt.height,0,xt,Yt,gt.data);L.generateMipmaps=!1}else z?(lt&&e.texStorage2D(i.TEXTURE_2D,Et,kt,ct.width,ct.height),ut&&ae(L,ct,xt,Yt)):e.texImage2D(i.TEXTURE_2D,0,kt,ct.width,ct.height,0,xt,Yt,ct.data);else if(L.isCompressedTexture)if(L.isCompressedArrayTexture){z&&lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Et,kt,te[0].width,te[0].height,ct.depth);for(let ot=0,it=te.length;ot<it;ot++)if(gt=te[ot],L.format!==xi)if(xt!==null)if(z){if(ut)if(L.layerUpdates.size>0){const Tt=Yf(gt.width,gt.height,L.format,L.type);for(const Zt of L.layerUpdates){const Pe=gt.data.subarray(Zt*Tt/gt.data.BYTES_PER_ELEMENT,(Zt+1)*Tt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,Zt,gt.width,gt.height,1,xt,Pe)}L.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,gt.width,gt.height,ct.depth,xt,gt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ot,kt,gt.width,gt.height,ct.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else z?ut&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,gt.width,gt.height,ct.depth,xt,Yt,gt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ot,kt,gt.width,gt.height,ct.depth,0,xt,Yt,gt.data)}else{z&&lt&&e.texStorage2D(i.TEXTURE_2D,Et,kt,te[0].width,te[0].height);for(let ot=0,it=te.length;ot<it;ot++)gt=te[ot],L.format!==xi?xt!==null?z?ut&&e.compressedTexSubImage2D(i.TEXTURE_2D,ot,0,0,gt.width,gt.height,xt,gt.data):e.compressedTexImage2D(i.TEXTURE_2D,ot,kt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):z?ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,gt.width,gt.height,xt,Yt,gt.data):e.texImage2D(i.TEXTURE_2D,ot,kt,gt.width,gt.height,0,xt,Yt,gt.data)}else if(L.isDataArrayTexture)if(z){if(lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,Et,kt,ct.width,ct.height,ct.depth),ut)if(L.layerUpdates.size>0){const ot=Yf(ct.width,ct.height,L.format,L.type);for(const it of L.layerUpdates){const Tt=ct.data.subarray(it*ot/ct.data.BYTES_PER_ELEMENT,(it+1)*ot/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,it,ct.width,ct.height,1,xt,Yt,Tt)}L.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,xt,Yt,ct.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,kt,ct.width,ct.height,ct.depth,0,xt,Yt,ct.data);else if(L.isData3DTexture)z?(lt&&e.texStorage3D(i.TEXTURE_3D,Et,kt,ct.width,ct.height,ct.depth),ut&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,xt,Yt,ct.data)):e.texImage3D(i.TEXTURE_3D,0,kt,ct.width,ct.height,ct.depth,0,xt,Yt,ct.data);else if(L.isFramebufferTexture){if(lt)if(z)e.texStorage2D(i.TEXTURE_2D,Et,kt,ct.width,ct.height);else{let ot=ct.width,it=ct.height;for(let Tt=0;Tt<Et;Tt++)e.texImage2D(i.TEXTURE_2D,Tt,kt,ot,it,0,xt,Yt,null),ot>>=1,it>>=1}}else if(te.length>0){if(z&&lt){const ot=Xe(te[0]);e.texStorage2D(i.TEXTURE_2D,Et,kt,ot.width,ot.height)}for(let ot=0,it=te.length;ot<it;ot++)gt=te[ot],z?ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,xt,Yt,gt):e.texImage2D(i.TEXTURE_2D,ot,kt,xt,Yt,gt);L.generateMipmaps=!1}else if(z){if(lt){const ot=Xe(ct);e.texStorage2D(i.TEXTURE_2D,Et,kt,ot.width,ot.height)}ut&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,xt,Yt,ct)}else e.texImage2D(i.TEXTURE_2D,0,kt,xt,Yt,ct);g(L)&&p(et),Nt.__version=J.version,L.onUpdate&&L.onUpdate(L)}I.__version=L.version}function nt(I,L,Y){if(L.image.length!==6)return;const et=Wt(I,L),st=L.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+Y);const J=n.get(st);if(st.version!==J.__version||et===!0){e.activeTexture(i.TEXTURE0+Y);const Nt=Me.getPrimaries(Me.workingColorSpace),ht=L.colorSpace===vs?null:Me.getPrimaries(L.colorSpace),Dt=L.colorSpace===vs||Nt===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,L.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,L.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);const It=L.isCompressedTexture||L.image[0].isCompressedTexture,ct=L.image[0]&&L.image[0].isDataTexture,xt=[];for(let it=0;it<6;it++)!It&&!ct?xt[it]=v(L.image[it],!0,s.maxCubemapSize):xt[it]=ct?L.image[it].image:L.image[it],xt[it]=fn(L,xt[it]);const Yt=xt[0],kt=r.convert(L.format,L.colorSpace),gt=r.convert(L.type),te=E(L.internalFormat,kt,gt,L.colorSpace),z=L.isVideoTexture!==!0,lt=J.__version===void 0||et===!0,ut=st.dataReady;let Et=T(L,Yt);Bt(i.TEXTURE_CUBE_MAP,L);let ot;if(It){z&&lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,Et,te,Yt.width,Yt.height);for(let it=0;it<6;it++){ot=xt[it].mipmaps;for(let Tt=0;Tt<ot.length;Tt++){const Zt=ot[Tt];L.format!==xi?kt!==null?z?ut&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Tt,0,0,Zt.width,Zt.height,kt,Zt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Tt,te,Zt.width,Zt.height,0,Zt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Tt,0,0,Zt.width,Zt.height,kt,gt,Zt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Tt,te,Zt.width,Zt.height,0,kt,gt,Zt.data)}}}else{if(ot=L.mipmaps,z&&lt){ot.length>0&&Et++;const it=Xe(xt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,Et,te,it.width,it.height)}for(let it=0;it<6;it++)if(ct){z?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,xt[it].width,xt[it].height,kt,gt,xt[it].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,te,xt[it].width,xt[it].height,0,kt,gt,xt[it].data);for(let Tt=0;Tt<ot.length;Tt++){const Pe=ot[Tt].image[it].image;z?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Tt+1,0,0,Pe.width,Pe.height,kt,gt,Pe.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Tt+1,te,Pe.width,Pe.height,0,kt,gt,Pe.data)}}else{z?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,kt,gt,xt[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,te,kt,gt,xt[it]);for(let Tt=0;Tt<ot.length;Tt++){const Zt=ot[Tt];z?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Tt+1,0,0,kt,gt,Zt.image[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,Tt+1,te,kt,gt,Zt.image[it])}}}g(L)&&p(i.TEXTURE_CUBE_MAP),J.__version=st.version,L.onUpdate&&L.onUpdate(L)}I.__version=L.version}function mt(I,L,Y,et,st,J){const Nt=r.convert(Y.format,Y.colorSpace),ht=r.convert(Y.type),Dt=E(Y.internalFormat,Nt,ht,Y.colorSpace),It=n.get(L),ct=n.get(Y);if(ct.__renderTarget=L,!It.__hasExternalTextures){const xt=Math.max(1,L.width>>J),Yt=Math.max(1,L.height>>J);st===i.TEXTURE_3D||st===i.TEXTURE_2D_ARRAY?e.texImage3D(st,J,Dt,xt,Yt,L.depth,0,Nt,ht,null):e.texImage2D(st,J,Dt,xt,Yt,0,Nt,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),Ct(L)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,st,ct.__webglTexture,0,Oe(L)):(st===i.TEXTURE_2D||st>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,et,st,ct.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function zt(I,L,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,I),L.depthBuffer){const et=L.depthTexture,st=et&&et.isDepthTexture?et.type:null,J=_(L.stencilBuffer,st),Nt=L.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=Oe(L);Ct(L)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,J,L.width,L.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,J,L.width,L.height):i.renderbufferStorage(i.RENDERBUFFER,J,L.width,L.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Nt,i.RENDERBUFFER,I)}else{const et=L.textures;for(let st=0;st<et.length;st++){const J=et[st],Nt=r.convert(J.format,J.colorSpace),ht=r.convert(J.type),Dt=E(J.internalFormat,Nt,ht,J.colorSpace),It=Oe(L);Y&&Ct(L)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,It,Dt,L.width,L.height):Ct(L)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It,Dt,L.width,L.height):i.renderbufferStorage(i.RENDERBUFFER,Dt,L.width,L.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function _t(I,L){if(L&&L.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(L.depthTexture&&L.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const et=n.get(L.depthTexture);et.__renderTarget=L,(!et.__webglTexture||L.depthTexture.image.width!==L.width||L.depthTexture.image.height!==L.height)&&(L.depthTexture.image.width=L.width,L.depthTexture.image.height=L.height,L.depthTexture.needsUpdate=!0),X(L.depthTexture,0);const st=et.__webglTexture,J=Oe(L);if(L.depthTexture.format===No)Ct(L)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0);else if(L.depthTexture.format===Uo)Ct(L)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function de(I){const L=n.get(I),Y=I.isWebGLCubeRenderTarget===!0;if(L.__boundDepthTexture!==I.depthTexture){const et=I.depthTexture;if(L.__depthDisposeCallback&&L.__depthDisposeCallback(),et){const st=()=>{delete L.__boundDepthTexture,delete L.__depthDisposeCallback,et.removeEventListener("dispose",st)};et.addEventListener("dispose",st),L.__depthDisposeCallback=st}L.__boundDepthTexture=et}if(I.depthTexture&&!L.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");const et=I.texture.mipmaps;et&&et.length>0?_t(L.__webglFramebuffer[0],I):_t(L.__webglFramebuffer,I)}else if(Y){L.__webglDepthbuffer=[];for(let et=0;et<6;et++)if(e.bindFramebuffer(i.FRAMEBUFFER,L.__webglFramebuffer[et]),L.__webglDepthbuffer[et]===void 0)L.__webglDepthbuffer[et]=i.createRenderbuffer(),zt(L.__webglDepthbuffer[et],I,!1);else{const st=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=L.__webglDepthbuffer[et];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,J)}}else{const et=I.texture.mipmaps;if(et&&et.length>0?e.bindFramebuffer(i.FRAMEBUFFER,L.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,L.__webglFramebuffer),L.__webglDepthbuffer===void 0)L.__webglDepthbuffer=i.createRenderbuffer(),zt(L.__webglDepthbuffer,I,!1);else{const st=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=L.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,J)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Sn(I,L,Y){const et=n.get(I);L!==void 0&&mt(et.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&de(I)}function O(I){const L=I.texture,Y=n.get(I),et=n.get(L);I.addEventListener("dispose",b);const st=I.textures,J=I.isWebGLCubeRenderTarget===!0,Nt=st.length>1;if(Nt||(et.__webglTexture===void 0&&(et.__webglTexture=i.createTexture()),et.__version=L.version,o.memory.textures++),J){Y.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(L.mipmaps&&L.mipmaps.length>0){Y.__webglFramebuffer[ht]=[];for(let Dt=0;Dt<L.mipmaps.length;Dt++)Y.__webglFramebuffer[ht][Dt]=i.createFramebuffer()}else Y.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(L.mipmaps&&L.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ht=0;ht<L.mipmaps.length;ht++)Y.__webglFramebuffer[ht]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Nt)for(let ht=0,Dt=st.length;ht<Dt;ht++){const It=n.get(st[ht]);It.__webglTexture===void 0&&(It.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&Ct(I)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ht=0;ht<st.length;ht++){const Dt=st[ht];Y.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[ht]);const It=r.convert(Dt.format,Dt.colorSpace),ct=r.convert(Dt.type),xt=E(Dt.internalFormat,It,ct,Dt.colorSpace,I.isXRRenderTarget===!0),Yt=Oe(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Yt,xt,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,Y.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),zt(Y.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,et.__webglTexture),Bt(i.TEXTURE_CUBE_MAP,L);for(let ht=0;ht<6;ht++)if(L.mipmaps&&L.mipmaps.length>0)for(let Dt=0;Dt<L.mipmaps.length;Dt++)mt(Y.__webglFramebuffer[ht][Dt],I,L,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Dt);else mt(Y.__webglFramebuffer[ht],I,L,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);g(L)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Nt){for(let ht=0,Dt=st.length;ht<Dt;ht++){const It=st[ht],ct=n.get(It);let xt=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(xt=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(xt,ct.__webglTexture),Bt(xt,It),mt(Y.__webglFramebuffer,I,It,i.COLOR_ATTACHMENT0+ht,xt,0),g(It)&&p(xt)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ht=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,et.__webglTexture),Bt(ht,L),L.mipmaps&&L.mipmaps.length>0)for(let Dt=0;Dt<L.mipmaps.length;Dt++)mt(Y.__webglFramebuffer[Dt],I,L,i.COLOR_ATTACHMENT0,ht,Dt);else mt(Y.__webglFramebuffer,I,L,i.COLOR_ATTACHMENT0,ht,0);g(L)&&p(ht),e.unbindTexture()}I.depthBuffer&&de(I)}function Ue(I){const L=I.textures;for(let Y=0,et=L.length;Y<et;Y++){const st=L[Y];if(g(st)){const J=M(I),Nt=n.get(st).__webglTexture;e.bindTexture(J,Nt),p(J),e.unbindTexture()}}}const Qt=[],Kt=[];function Rt(I){if(I.samples>0){if(Ct(I)===!1){const L=I.textures,Y=I.width,et=I.height;let st=i.COLOR_BUFFER_BIT;const J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Nt=n.get(I),ht=L.length>1;if(ht)for(let It=0;It<L.length;It++)e.bindFramebuffer(i.FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Nt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Nt.__webglMultisampledFramebuffer);const Dt=I.texture.mipmaps;Dt&&Dt.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Nt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Nt.__webglFramebuffer);for(let It=0;It<L.length;It++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(st|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(st|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Nt.__webglColorRenderbuffer[It]);const ct=n.get(L[It]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ct,0)}i.blitFramebuffer(0,0,Y,et,0,0,Y,et,st,i.NEAREST),c===!0&&(Qt.length=0,Kt.length=0,Qt.push(i.COLOR_ATTACHMENT0+It),I.depthBuffer&&I.resolveDepthBuffer===!1&&(Qt.push(J),Kt.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Kt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Qt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let It=0;It<L.length;It++){e.bindFramebuffer(i.FRAMEBUFFER,Nt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.RENDERBUFFER,Nt.__webglColorRenderbuffer[It]);const ct=n.get(L[It]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Nt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+It,i.TEXTURE_2D,ct,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Nt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){const L=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[L])}}}function Oe(I){return Math.min(s.maxSamples,I.samples)}function Ct(I){const L=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&L.__useRenderToTexture!==!1}function ie(I){const L=o.render.frame;h.get(I)!==L&&(h.set(I,L),I.update())}function fn(I,L){const Y=I.colorSpace,et=I.format,st=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||Y!==Yr&&Y!==vs&&(Me.getTransfer(Y)===Re?(et!==xi||st!==yi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),L}function Xe(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=P,this.setTexture2D=X,this.setTexture2DArray=V,this.setTexture3D=K,this.setTextureCube=G,this.rebindTextures=Sn,this.setupRenderTarget=O,this.updateRenderTargetMipmap=Ue,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=Ct}function My(i,t){function e(n,s=vs){let r;const o=Me.getTransfer(s);if(n===yi)return i.UNSIGNED_BYTE;if(n===yu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===bu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===J0)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Q0)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===j0)return i.BYTE;if(n===Z0)return i.SHORT;if(n===Io)return i.UNSIGNED_SHORT;if(n===Mu)return i.INT;if(n===tr)return i.UNSIGNED_INT;if(n===Ai)return i.FLOAT;if(n===Yi)return i.HALF_FLOAT;if(n===tp)return i.ALPHA;if(n===ep)return i.RGB;if(n===xi)return i.RGBA;if(n===No)return i.DEPTH_COMPONENT;if(n===Uo)return i.DEPTH_STENCIL;if(n===Su)return i.RED;if(n===Eu)return i.RED_INTEGER;if(n===np)return i.RG;if(n===wu)return i.RG_INTEGER;if(n===Tu)return i.RGBA_INTEGER;if(n===Za||n===Ja||n===Qa||n===tc)if(o===Re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Za)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ja)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Qa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===tc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Za)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ja)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Qa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===tc)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===_h||n===xh||n===Mh||n===yh)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===_h)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===xh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Mh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===yh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===bh||n===Sh||n===Eh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===bh||n===Sh)return o===Re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Eh)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===wh||n===Th||n===Ah||n===Rh||n===Ch||n===Lh||n===Dh||n===Ph||n===Ih||n===kh||n===Nh||n===Uh||n===Oh||n===Fh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wh)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Th)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ah)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Rh)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ch)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Lh)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Dh)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ph)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ih)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===kh)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Nh)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Uh)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Oh)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Fh)return o===Re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Bh||n===zh||n===Gh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Bh)return o===Re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===zh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Gh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Hh||n===Vh||n===Wh||n===Xh)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Hh)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Wh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ko?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const yy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,by=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Sy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new vp(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new an({vertexShader:yy,fragmentShader:by,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new ge(new jo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ey extends so{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,m=null;const v=typeof XRWebGLBinding<"u",g=new Sy,p={},M=e.getContextAttributes();let E=null,_=null;const T=[],w=[],b=new Vt;let C=null;const x=new $n;x.viewport=new Ge;const y=new $n;y.viewport=new Ge;const R=[x,y],P=new X1;let N=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let nt=T[Q];return nt===void 0&&(nt=new dl,T[Q]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Q){let nt=T[Q];return nt===void 0&&(nt=new dl,T[Q]=nt),nt.getGripSpace()},this.getHand=function(Q){let nt=T[Q];return nt===void 0&&(nt=new dl,T[Q]=nt),nt.getHandSpace()};function X(Q){const nt=w.indexOf(Q.inputSource);if(nt===-1)return;const mt=T[nt];mt!==void 0&&(mt.update(Q.inputSource,Q.frame,l||o),mt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function V(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",K);for(let Q=0;Q<T.length;Q++){const nt=w[Q];nt!==null&&(w[Q]=null,T[Q].disconnect(nt))}N=null,B=null,g.reset();for(const Q in p)delete p[Q];t.setRenderTarget(E),d=null,f=null,u=null,s=null,_=null,ae.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(E=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",V),s.addEventListener("inputsourceschange",K),M.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(b),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,zt=null,_t=null;M.depth&&(_t=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=M.stencil?Uo:No,zt=M.stencil?ko:tr);const de={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(de),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),_=new oi(f.textureWidth,f.textureHeight,{format:xi,type:yi,depthTexture:new mc(f.textureWidth,f.textureHeight,zt,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const mt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),_=new oi(d.framebufferWidth,d.framebufferHeight,{format:xi,type:yi,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ae.setContext(s),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(Q){for(let nt=0;nt<Q.removed.length;nt++){const mt=Q.removed[nt],zt=w.indexOf(mt);zt>=0&&(w[zt]=null,T[zt].disconnect(mt))}for(let nt=0;nt<Q.added.length;nt++){const mt=Q.added[nt];let zt=w.indexOf(mt);if(zt===-1){for(let de=0;de<T.length;de++)if(de>=w.length){w.push(mt),zt=de;break}else if(w[de]===null){w[de]=mt,zt=de;break}if(zt===-1)break}const _t=T[zt];_t&&_t.connect(mt)}}const G=new F,Z=new F;function rt(Q,nt,mt){G.setFromMatrixPosition(nt.matrixWorld),Z.setFromMatrixPosition(mt.matrixWorld);const zt=G.distanceTo(Z),_t=nt.projectionMatrix.elements,de=mt.projectionMatrix.elements,Sn=_t[14]/(_t[10]-1),O=_t[14]/(_t[10]+1),Ue=(_t[9]+1)/_t[5],Qt=(_t[9]-1)/_t[5],Kt=(_t[8]-1)/_t[0],Rt=(de[8]+1)/de[0],Oe=Sn*Kt,Ct=Sn*Rt,ie=zt/(-Kt+Rt),fn=ie*-Kt;if(nt.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(fn),Q.translateZ(ie),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),_t[10]===-1)Q.projectionMatrix.copy(nt.projectionMatrix),Q.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const Xe=Sn+ie,I=O+ie,L=Oe-fn,Y=Ct+(zt-fn),et=Ue*O/I*Xe,st=Qt*O/I*Xe;Q.projectionMatrix.makePerspective(L,Y,et,st,Xe,I),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function yt(Q,nt){nt===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(nt.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let nt=Q.near,mt=Q.far;g.texture!==null&&(g.depthNear>0&&(nt=g.depthNear),g.depthFar>0&&(mt=g.depthFar)),P.near=y.near=x.near=nt,P.far=y.far=x.far=mt,(N!==P.near||B!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),N=P.near,B=P.far),P.layers.mask=Q.layers.mask|6,x.layers.mask=P.layers.mask&3,y.layers.mask=P.layers.mask&5;const zt=Q.parent,_t=P.cameras;yt(P,zt);for(let de=0;de<_t.length;de++)yt(_t[de],zt);_t.length===2?rt(P,x,y):P.projectionMatrix.copy(x.projectionMatrix),Bt(Q,P,zt)};function Bt(Q,nt,mt){mt===null?Q.matrix.copy(nt.matrixWorld):(Q.matrix.copy(mt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(nt.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(nt.projectionMatrix),Q.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Kh*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Q){c=Q,f!==null&&(f.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(P)},this.getCameraTexture=function(Q){return p[Q]};let Wt=null;function ne(Q,nt){if(h=nt.getViewerPose(l||o),m=nt,h!==null){const mt=h.views;d!==null&&(t.setRenderTargetFramebuffer(_,d.framebuffer),t.setRenderTarget(_));let zt=!1;mt.length!==P.cameras.length&&(P.cameras.length=0,zt=!0);for(let O=0;O<mt.length;O++){const Ue=mt[O];let Qt=null;if(d!==null)Qt=d.getViewport(Ue);else{const Rt=u.getViewSubImage(f,Ue);Qt=Rt.viewport,O===0&&(t.setRenderTargetTextures(_,Rt.colorTexture,Rt.depthStencilTexture),t.setRenderTarget(_))}let Kt=R[O];Kt===void 0&&(Kt=new $n,Kt.layers.enable(O),Kt.viewport=new Ge,R[O]=Kt),Kt.matrix.fromArray(Ue.transform.matrix),Kt.matrix.decompose(Kt.position,Kt.quaternion,Kt.scale),Kt.projectionMatrix.fromArray(Ue.projectionMatrix),Kt.projectionMatrixInverse.copy(Kt.projectionMatrix).invert(),Kt.viewport.set(Qt.x,Qt.y,Qt.width,Qt.height),O===0&&(P.matrix.copy(Kt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),zt===!0&&P.cameras.push(Kt)}const _t=s.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const O=u.getDepthInformation(mt[0]);O&&O.isValid&&O.texture&&g.init(O,s.renderState)}if(_t&&_t.includes("camera-access")&&v){t.state.unbindTexture(),u=n.getBinding();for(let O=0;O<mt.length;O++){const Ue=mt[O].camera;if(Ue){let Qt=p[Ue];Qt||(Qt=new vp,p[Ue]=Qt);const Kt=u.getCameraImage(Ue);Qt.sourceTexture=Kt}}}}for(let mt=0;mt<T.length;mt++){const zt=w[mt],_t=T[mt];zt!==null&&_t!==void 0&&_t.update(zt,nt,l||o)}Wt&&Wt(Q,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),m=null}const ae=new bp;ae.setAnimationLoop(ne),this.setAnimationLoop=function(Q){Wt=Q},this.dispose=function(){}}}const zs=new ci,wy=new ve;function Ty(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,cp(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,E,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,_)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,M,E):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Un&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Un&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const M=t.get(p),E=M.envMap,_=M.envMapRotation;E&&(g.envMap.value=E,zs.copy(_),zs.x*=-1,zs.y*=-1,zs.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(zs.y*=-1,zs.z*=-1),g.envMapRotation.value.setFromMatrix4(wy.makeRotationFromEuler(zs)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,M,E){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=E*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Un&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const M=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Ay(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,E){const _=E.program;n.uniformBlockBinding(M,_)}function l(M,E){let _=s[M.id];_===void 0&&(m(M),_=h(M),s[M.id]=_,M.addEventListener("dispose",g));const T=E.program;n.updateUBOMapping(M,T);const w=t.render.frame;r[M.id]!==w&&(f(M),r[M.id]=w)}function h(M){const E=u();M.__bindingPointIndex=E;const _=i.createBuffer(),T=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,_),i.bufferData(i.UNIFORM_BUFFER,T,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,E,_),_}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const E=s[M.id],_=M.uniforms,T=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let w=0,b=_.length;w<b;w++){const C=Array.isArray(_[w])?_[w]:[_[w]];for(let x=0,y=C.length;x<y;x++){const R=C[x];if(d(R,w,x,T)===!0){const P=R.__offset,N=Array.isArray(R.value)?R.value:[R.value];let B=0;for(let X=0;X<N.length;X++){const V=N[X],K=v(V);typeof V=="number"||typeof V=="boolean"?(R.__data[0]=V,i.bufferSubData(i.UNIFORM_BUFFER,P+B,R.__data)):V.isMatrix3?(R.__data[0]=V.elements[0],R.__data[1]=V.elements[1],R.__data[2]=V.elements[2],R.__data[3]=0,R.__data[4]=V.elements[3],R.__data[5]=V.elements[4],R.__data[6]=V.elements[5],R.__data[7]=0,R.__data[8]=V.elements[6],R.__data[9]=V.elements[7],R.__data[10]=V.elements[8],R.__data[11]=0):(V.toArray(R.__data,B),B+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,E,_,T){const w=M.value,b=E+"_"+_;if(T[b]===void 0)return typeof w=="number"||typeof w=="boolean"?T[b]=w:T[b]=w.clone(),!0;{const C=T[b];if(typeof w=="number"||typeof w=="boolean"){if(C!==w)return T[b]=w,!0}else if(C.equals(w)===!1)return C.copy(w),!0}return!1}function m(M){const E=M.uniforms;let _=0;const T=16;for(let b=0,C=E.length;b<C;b++){const x=Array.isArray(E[b])?E[b]:[E[b]];for(let y=0,R=x.length;y<R;y++){const P=x[y],N=Array.isArray(P.value)?P.value:[P.value];for(let B=0,X=N.length;B<X;B++){const V=N[B],K=v(V),G=_%T,Z=G%K.boundary,rt=G+Z;_+=Z,rt!==0&&T-rt<K.storage&&(_+=T-rt),P.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=_,_+=K.storage}}}const w=_%T;return w>0&&(_+=T-w),M.__size=_,M.__cache={},this}function v(M){const E={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(E.boundary=4,E.storage=4):M.isVector2?(E.boundary=8,E.storage=8):M.isVector3||M.isColor?(E.boundary=16,E.storage=12):M.isVector4?(E.boundary=16,E.storage=16):M.isMatrix3?(E.boundary=48,E.storage=48):M.isMatrix4?(E.boundary=64,E.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),E}function g(M){const E=M.target;E.removeEventListener("dispose",g);const _=o.indexOf(E.__bindingPointIndex);o.splice(_,1),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Ry{constructor(t={}){const{canvas:e=r1(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const m=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const M=[],E=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Es,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const _=this;let T=!1;this._outputColorSpace=xn;let w=0,b=0,C=null,x=-1,y=null;const R=new Ge,P=new Ge;let N=null;const B=new $t(0);let X=0,V=e.width,K=e.height,G=1,Z=null,rt=null;const yt=new Ge(0,0,V,K),Bt=new Ge(0,0,V,K);let Wt=!1;const ne=new Fo;let ae=!1,Q=!1;const nt=new ve,mt=new F,zt=new Ge,_t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let de=!1;function Sn(){return C===null?G:1}let O=n;function Ue(D,H){return e.getContext(D,H)}try{const D={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${xu}`),e.addEventListener("webglcontextlost",ut,!1),e.addEventListener("webglcontextrestored",Et,!1),e.addEventListener("webglcontextcreationerror",ot,!1),O===null){const H="webgl2";if(O=Ue(H,D),O===null)throw Ue(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let Qt,Kt,Rt,Oe,Ct,ie,fn,Xe,I,L,Y,et,st,J,Nt,ht,Dt,It,ct,xt,Yt,kt,gt,te;function z(){Qt=new Fx(O),Qt.init(),kt=new My(O,Qt),Kt=new Dx(O,Qt,t,kt),Rt=new _y(O,Qt),Kt.reversedDepthBuffer&&f&&Rt.buffers.depth.setReversed(!0),Oe=new Gx(O),Ct=new ry,ie=new xy(O,Qt,Rt,Ct,Kt,kt,Oe),fn=new Ix(_),Xe=new Ox(_),I=new K1(O),gt=new Cx(O,I),L=new Bx(O,I,Oe,gt),Y=new Vx(O,L,I,Oe),ct=new Hx(O,Kt,ie),ht=new Px(Ct),et=new sy(_,fn,Xe,Qt,Kt,gt,ht),st=new Ty(_,Ct),J=new ay,Nt=new dy(Qt),It=new Rx(_,fn,Xe,Rt,Y,d,c),Dt=new gy(_,Y,Kt),te=new Ay(O,Oe,Kt,Rt),xt=new Lx(O,Qt,Oe),Yt=new zx(O,Qt,Oe),Oe.programs=et.programs,_.capabilities=Kt,_.extensions=Qt,_.properties=Ct,_.renderLists=J,_.shadowMap=Dt,_.state=Rt,_.info=Oe}z();const lt=new Ey(_,O);this.xr=lt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const D=Qt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=Qt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(D){D!==void 0&&(G=D,this.setSize(V,K,!1))},this.getSize=function(D){return D.set(V,K)},this.setSize=function(D,H,q=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}V=D,K=H,e.width=Math.floor(D*G),e.height=Math.floor(H*G),q===!0&&(e.style.width=D+"px",e.style.height=H+"px"),this.setViewport(0,0,D,H)},this.getDrawingBufferSize=function(D){return D.set(V*G,K*G).floor()},this.setDrawingBufferSize=function(D,H,q){V=D,K=H,G=q,e.width=Math.floor(D*q),e.height=Math.floor(H*q),this.setViewport(0,0,D,H)},this.getCurrentViewport=function(D){return D.copy(R)},this.getViewport=function(D){return D.copy(yt)},this.setViewport=function(D,H,q,$){D.isVector4?yt.set(D.x,D.y,D.z,D.w):yt.set(D,H,q,$),Rt.viewport(R.copy(yt).multiplyScalar(G).round())},this.getScissor=function(D){return D.copy(Bt)},this.setScissor=function(D,H,q,$){D.isVector4?Bt.set(D.x,D.y,D.z,D.w):Bt.set(D,H,q,$),Rt.scissor(P.copy(Bt).multiplyScalar(G).round())},this.getScissorTest=function(){return Wt},this.setScissorTest=function(D){Rt.setScissorTest(Wt=D)},this.setOpaqueSort=function(D){Z=D},this.setTransparentSort=function(D){rt=D},this.getClearColor=function(D){return D.copy(It.getClearColor())},this.setClearColor=function(){It.setClearColor(...arguments)},this.getClearAlpha=function(){return It.getClearAlpha()},this.setClearAlpha=function(){It.setClearAlpha(...arguments)},this.clear=function(D=!0,H=!0,q=!0){let $=0;if(D){let W=!1;if(C!==null){const at=C.texture.format;W=at===Tu||at===wu||at===Eu}if(W){const at=C.texture.type,vt=at===yi||at===tr||at===Io||at===ko||at===yu||at===bu,wt=It.getClearColor(),St=It.getClearAlpha(),Xt=wt.r,qt=wt.g,Ot=wt.b;vt?(m[0]=Xt,m[1]=qt,m[2]=Ot,m[3]=St,O.clearBufferuiv(O.COLOR,0,m)):(v[0]=Xt,v[1]=qt,v[2]=Ot,v[3]=St,O.clearBufferiv(O.COLOR,0,v))}else $|=O.COLOR_BUFFER_BIT}H&&($|=O.DEPTH_BUFFER_BIT),q&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ut,!1),e.removeEventListener("webglcontextrestored",Et,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),It.dispose(),J.dispose(),Nt.dispose(),Ct.dispose(),fn.dispose(),Xe.dispose(),Y.dispose(),gt.dispose(),te.dispose(),et.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",bi),lt.removeEventListener("sessionend",tf),Is.stop()};function ut(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Et(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const D=Oe.autoReset,H=Dt.enabled,q=Dt.autoUpdate,$=Dt.needsUpdate,W=Dt.type;z(),Oe.autoReset=D,Dt.enabled=H,Dt.autoUpdate=q,Dt.needsUpdate=$,Dt.type=W}function ot(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function it(D){const H=D.target;H.removeEventListener("dispose",it),Tt(H)}function Tt(D){Zt(D),Ct.remove(D)}function Zt(D){const H=Ct.get(D).programs;H!==void 0&&(H.forEach(function(q){et.releaseProgram(q)}),D.isShaderMaterial&&et.releaseShaderCache(D))}this.renderBufferDirect=function(D,H,q,$,W,at){H===null&&(H=_t);const vt=W.isMesh&&W.matrixWorld.determinant()<0,wt=km(D,H,q,$,W);Rt.setMaterial($,vt);let St=q.index,Xt=1;if($.wireframe===!0){if(St=L.getWireframeAttribute(q),St===void 0)return;Xt=2}const qt=q.drawRange,Ot=q.attributes.position;let ue=qt.start*Xt,Te=(qt.start+qt.count)*Xt;at!==null&&(ue=Math.max(ue,at.start*Xt),Te=Math.min(Te,(at.start+at.count)*Xt)),St!==null?(ue=Math.max(ue,0),Te=Math.min(Te,St.count)):Ot!=null&&(ue=Math.max(ue,0),Te=Math.min(Te,Ot.count));const He=Te-ue;if(He<0||He===1/0)return;gt.setup(W,$,wt,q,St);let ke,De=xt;if(St!==null&&(ke=I.get(St),De=Yt,De.setIndex(ke)),W.isMesh)$.wireframe===!0?(Rt.setLineWidth($.wireframeLinewidth*Sn()),De.setMode(O.LINES)):De.setMode(O.TRIANGLES);else if(W.isLine){let Gt=$.linewidth;Gt===void 0&&(Gt=1),Rt.setLineWidth(Gt*Sn()),W.isLineSegments?De.setMode(O.LINES):W.isLineLoop?De.setMode(O.LINE_LOOP):De.setMode(O.LINE_STRIP)}else W.isPoints?De.setMode(O.POINTS):W.isSprite&&De.setMode(O.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)Oo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),De.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(Qt.get("WEBGL_multi_draw"))De.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const Gt=W._multiDrawStarts,Be=W._multiDrawCounts,_e=W._multiDrawCount,Vn=St?I.get(St).bytesPerElement:1,ir=Ct.get($).currentProgram.getUniforms();for(let Wn=0;Wn<_e;Wn++)ir.setValue(O,"_gl_DrawID",Wn),De.render(Gt[Wn]/Vn,Be[Wn])}else if(W.isInstancedMesh)De.renderInstances(ue,He,W.count);else if(q.isInstancedBufferGeometry){const Gt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Be=Math.min(q.instanceCount,Gt);De.renderInstances(ue,He,Be)}else De.render(ue,He)};function Pe(D,H,q){D.transparent===!0&&D.side===ii&&D.forceSinglePass===!1?(D.side=Un,D.needsUpdate=!0,ta(D,H,q),D.side=qi,D.needsUpdate=!0,ta(D,H,q),D.side=ii):ta(D,H,q)}this.compile=function(D,H,q=null){q===null&&(q=D),p=Nt.get(q),p.init(H),E.push(p),q.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),D!==q&&D.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(p.pushLight(W),W.castShadow&&p.pushShadow(W))}),p.setupLights();const $=new Set;return D.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const at=W.material;if(at)if(Array.isArray(at))for(let vt=0;vt<at.length;vt++){const wt=at[vt];Pe(wt,q,W),$.add(wt)}else Pe(at,q,W),$.add(at)}),p=E.pop(),$},this.compileAsync=function(D,H,q=null){const $=this.compile(D,H,q);return new Promise(W=>{function at(){if($.forEach(function(vt){Ct.get(vt).currentProgram.isReady()&&$.delete(vt)}),$.size===0){W(D);return}setTimeout(at,10)}Qt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let be=null;function Di(D){be&&be(D)}function bi(){Is.stop()}function tf(){Is.start()}const Is=new bp;Is.setAnimationLoop(Di),typeof self<"u"&&Is.setContext(self),this.setAnimationLoop=function(D){be=D,lt.setAnimationLoop(D),D===null?Is.stop():Is.start()},lt.addEventListener("sessionstart",bi),lt.addEventListener("sessionend",tf),this.render=function(D,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(H),H=lt.getCamera()),D.isScene===!0&&D.onBeforeRender(_,D,H,C),p=Nt.get(D,E.length),p.init(H),E.push(p),nt.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),ne.setFromProjectionMatrix(nt,Ri,H.reversedDepth),Q=this.localClippingEnabled,ae=ht.init(this.clippingPlanes,Q),g=J.get(D,M.length),g.init(),M.push(g),lt.enabled===!0&&lt.isPresenting===!0){const at=_.xr.getDepthSensingMesh();at!==null&&Hc(at,H,-1/0,_.sortObjects)}Hc(D,H,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(Z,rt),de=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,de&&It.addToRenderList(g,D),this.info.render.frame++,ae===!0&&ht.beginShadows();const q=p.state.shadowsArray;Dt.render(q,D,H),ae===!0&&ht.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=g.opaque,W=g.transmissive;if(p.setupLights(),H.isArrayCamera){const at=H.cameras;if(W.length>0)for(let vt=0,wt=at.length;vt<wt;vt++){const St=at[vt];nf($,W,D,St)}de&&It.render(D);for(let vt=0,wt=at.length;vt<wt;vt++){const St=at[vt];ef(g,D,St,St.viewport)}}else W.length>0&&nf($,W,D,H),de&&It.render(D),ef(g,D,H);C!==null&&b===0&&(ie.updateMultisampleRenderTarget(C),ie.updateRenderTargetMipmap(C)),D.isScene===!0&&D.onAfterRender(_,D,H),gt.resetDefaultState(),x=-1,y=null,E.pop(),E.length>0?(p=E[E.length-1],ae===!0&&ht.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function Hc(D,H,q,$){if(D.visible===!1)return;if(D.layers.test(H.layers)){if(D.isGroup)q=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(H);else if(D.isLight)p.pushLight(D),D.castShadow&&p.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||ne.intersectsSprite(D)){$&&zt.setFromMatrixPosition(D.matrixWorld).applyMatrix4(nt);const vt=Y.update(D),wt=D.material;wt.visible&&g.push(D,vt,wt,q,zt.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||ne.intersectsObject(D))){const vt=Y.update(D),wt=D.material;if($&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),zt.copy(D.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),zt.copy(vt.boundingSphere.center)),zt.applyMatrix4(D.matrixWorld).applyMatrix4(nt)),Array.isArray(wt)){const St=vt.groups;for(let Xt=0,qt=St.length;Xt<qt;Xt++){const Ot=St[Xt],ue=wt[Ot.materialIndex];ue&&ue.visible&&g.push(D,vt,ue,q,zt.z,Ot)}}else wt.visible&&g.push(D,vt,wt,q,zt.z,null)}}const at=D.children;for(let vt=0,wt=at.length;vt<wt;vt++)Hc(at[vt],H,q,$)}function ef(D,H,q,$){const W=D.opaque,at=D.transmissive,vt=D.transparent;p.setupLightsView(q),ae===!0&&ht.setGlobalState(_.clippingPlanes,q),$&&Rt.viewport(R.copy($)),W.length>0&&Qo(W,H,q),at.length>0&&Qo(at,H,q),vt.length>0&&Qo(vt,H,q),Rt.buffers.depth.setTest(!0),Rt.buffers.depth.setMask(!0),Rt.buffers.color.setMask(!0),Rt.setPolygonOffset(!1)}function nf(D,H,q,$){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new oi(1,1,{generateMipmaps:!0,type:Qt.has("EXT_color_buffer_half_float")||Qt.has("EXT_color_buffer_float")?Yi:yi,minFilter:Zs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Me.workingColorSpace}));const at=p.state.transmissionRenderTarget[$.id],vt=$.viewport||R;at.setSize(vt.z*_.transmissionResolutionScale,vt.w*_.transmissionResolutionScale);const wt=_.getRenderTarget(),St=_.getActiveCubeFace(),Xt=_.getActiveMipmapLevel();_.setRenderTarget(at),_.getClearColor(B),X=_.getClearAlpha(),X<1&&_.setClearColor(16777215,.5),_.clear(),de&&It.render(q);const qt=_.toneMapping;_.toneMapping=Es;const Ot=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),ae===!0&&ht.setGlobalState(_.clippingPlanes,$),Qo(D,q,$),ie.updateMultisampleRenderTarget(at),ie.updateRenderTargetMipmap(at),Qt.has("WEBGL_multisampled_render_to_texture")===!1){let ue=!1;for(let Te=0,He=H.length;Te<He;Te++){const ke=H[Te],De=ke.object,Gt=ke.geometry,Be=ke.material,_e=ke.group;if(Be.side===ii&&De.layers.test($.layers)){const Vn=Be.side;Be.side=Un,Be.needsUpdate=!0,sf(De,q,$,Gt,Be,_e),Be.side=Vn,Be.needsUpdate=!0,ue=!0}}ue===!0&&(ie.updateMultisampleRenderTarget(at),ie.updateRenderTargetMipmap(at))}_.setRenderTarget(wt,St,Xt),_.setClearColor(B,X),Ot!==void 0&&($.viewport=Ot),_.toneMapping=qt}function Qo(D,H,q){const $=H.isScene===!0?H.overrideMaterial:null;for(let W=0,at=D.length;W<at;W++){const vt=D[W],wt=vt.object,St=vt.geometry,Xt=vt.group;let qt=vt.material;qt.allowOverride===!0&&$!==null&&(qt=$),wt.layers.test(q.layers)&&sf(wt,H,q,St,qt,Xt)}}function sf(D,H,q,$,W,at){D.onBeforeRender(_,H,q,$,W,at),D.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),W.onBeforeRender(_,H,q,$,D,at),W.transparent===!0&&W.side===ii&&W.forceSinglePass===!1?(W.side=Un,W.needsUpdate=!0,_.renderBufferDirect(q,H,$,W,D,at),W.side=qi,W.needsUpdate=!0,_.renderBufferDirect(q,H,$,W,D,at),W.side=ii):_.renderBufferDirect(q,H,$,W,D,at),D.onAfterRender(_,H,q,$,W,at)}function ta(D,H,q){H.isScene!==!0&&(H=_t);const $=Ct.get(D),W=p.state.lights,at=p.state.shadowsArray,vt=W.state.version,wt=et.getParameters(D,W.state,at,H,q),St=et.getProgramCacheKey(wt);let Xt=$.programs;$.environment=D.isMeshStandardMaterial?H.environment:null,$.fog=H.fog,$.envMap=(D.isMeshStandardMaterial?Xe:fn).get(D.envMap||$.environment),$.envMapRotation=$.environment!==null&&D.envMap===null?H.environmentRotation:D.envMapRotation,Xt===void 0&&(D.addEventListener("dispose",it),Xt=new Map,$.programs=Xt);let qt=Xt.get(St);if(qt!==void 0){if($.currentProgram===qt&&$.lightsStateVersion===vt)return of(D,wt),qt}else wt.uniforms=et.getUniforms(D),D.onBeforeCompile(wt,_),qt=et.acquireProgram(wt,St),Xt.set(St,qt),$.uniforms=wt.uniforms;const Ot=$.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Ot.clippingPlanes=ht.uniform),of(D,wt),$.needsLights=Um(D),$.lightsStateVersion=vt,$.needsLights&&(Ot.ambientLightColor.value=W.state.ambient,Ot.lightProbe.value=W.state.probe,Ot.directionalLights.value=W.state.directional,Ot.directionalLightShadows.value=W.state.directionalShadow,Ot.spotLights.value=W.state.spot,Ot.spotLightShadows.value=W.state.spotShadow,Ot.rectAreaLights.value=W.state.rectArea,Ot.ltc_1.value=W.state.rectAreaLTC1,Ot.ltc_2.value=W.state.rectAreaLTC2,Ot.pointLights.value=W.state.point,Ot.pointLightShadows.value=W.state.pointShadow,Ot.hemisphereLights.value=W.state.hemi,Ot.directionalShadowMap.value=W.state.directionalShadowMap,Ot.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ot.spotShadowMap.value=W.state.spotShadowMap,Ot.spotLightMatrix.value=W.state.spotLightMatrix,Ot.spotLightMap.value=W.state.spotLightMap,Ot.pointShadowMap.value=W.state.pointShadowMap,Ot.pointShadowMatrix.value=W.state.pointShadowMatrix),$.currentProgram=qt,$.uniformsList=null,qt}function rf(D){if(D.uniformsList===null){const H=D.currentProgram.getUniforms();D.uniformsList=nc.seqWithValue(H.seq,D.uniforms)}return D.uniformsList}function of(D,H){const q=Ct.get(D);q.outputColorSpace=H.outputColorSpace,q.batching=H.batching,q.batchingColor=H.batchingColor,q.instancing=H.instancing,q.instancingColor=H.instancingColor,q.instancingMorph=H.instancingMorph,q.skinning=H.skinning,q.morphTargets=H.morphTargets,q.morphNormals=H.morphNormals,q.morphColors=H.morphColors,q.morphTargetsCount=H.morphTargetsCount,q.numClippingPlanes=H.numClippingPlanes,q.numIntersection=H.numClipIntersection,q.vertexAlphas=H.vertexAlphas,q.vertexTangents=H.vertexTangents,q.toneMapping=H.toneMapping}function km(D,H,q,$,W){H.isScene!==!0&&(H=_t),ie.resetTextureUnits();const at=H.fog,vt=$.isMeshStandardMaterial?H.environment:null,wt=C===null?_.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Yr,St=($.isMeshStandardMaterial?Xe:fn).get($.envMap||vt),Xt=$.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,qt=!!q.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Ot=!!q.morphAttributes.position,ue=!!q.morphAttributes.normal,Te=!!q.morphAttributes.color;let He=Es;$.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(He=_.toneMapping);const ke=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,De=ke!==void 0?ke.length:0,Gt=Ct.get($),Be=p.state.lights;if(ae===!0&&(Q===!0||D!==y)){const Pn=D===y&&$.id===x;ht.setState($,D,Pn)}let _e=!1;$.version===Gt.__version?(Gt.needsLights&&Gt.lightsStateVersion!==Be.state.version||Gt.outputColorSpace!==wt||W.isBatchedMesh&&Gt.batching===!1||!W.isBatchedMesh&&Gt.batching===!0||W.isBatchedMesh&&Gt.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&Gt.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&Gt.instancing===!1||!W.isInstancedMesh&&Gt.instancing===!0||W.isSkinnedMesh&&Gt.skinning===!1||!W.isSkinnedMesh&&Gt.skinning===!0||W.isInstancedMesh&&Gt.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&Gt.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&Gt.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&Gt.instancingMorph===!1&&W.morphTexture!==null||Gt.envMap!==St||$.fog===!0&&Gt.fog!==at||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==ht.numPlanes||Gt.numIntersection!==ht.numIntersection)||Gt.vertexAlphas!==Xt||Gt.vertexTangents!==qt||Gt.morphTargets!==Ot||Gt.morphNormals!==ue||Gt.morphColors!==Te||Gt.toneMapping!==He||Gt.morphTargetsCount!==De)&&(_e=!0):(_e=!0,Gt.__version=$.version);let Vn=Gt.currentProgram;_e===!0&&(Vn=ta($,H,W));let ir=!1,Wn=!1,ho=!1;const ze=Vn.getUniforms(),Jn=Gt.uniforms;if(Rt.useProgram(Vn.program)&&(ir=!0,Wn=!0,ho=!0),$.id!==x&&(x=$.id,Wn=!0),ir||y!==D){Rt.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),ze.setValue(O,"projectionMatrix",D.projectionMatrix),ze.setValue(O,"viewMatrix",D.matrixWorldInverse);const Fn=ze.map.cameraPosition;Fn!==void 0&&Fn.setValue(O,mt.setFromMatrixPosition(D.matrixWorld)),Kt.logarithmicDepthBuffer&&ze.setValue(O,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&ze.setValue(O,"isOrthographic",D.isOrthographicCamera===!0),y!==D&&(y=D,Wn=!0,ho=!0)}if(W.isSkinnedMesh){ze.setOptional(O,W,"bindMatrix"),ze.setOptional(O,W,"bindMatrixInverse");const Pn=W.skeleton;Pn&&(Pn.boneTexture===null&&Pn.computeBoneTexture(),ze.setValue(O,"boneTexture",Pn.boneTexture,ie))}W.isBatchedMesh&&(ze.setOptional(O,W,"batchingTexture"),ze.setValue(O,"batchingTexture",W._matricesTexture,ie),ze.setOptional(O,W,"batchingIdTexture"),ze.setValue(O,"batchingIdTexture",W._indirectTexture,ie),ze.setOptional(O,W,"batchingColorTexture"),W._colorsTexture!==null&&ze.setValue(O,"batchingColorTexture",W._colorsTexture,ie));const Qn=q.morphAttributes;if((Qn.position!==void 0||Qn.normal!==void 0||Qn.color!==void 0)&&ct.update(W,q,Vn),(Wn||Gt.receiveShadow!==W.receiveShadow)&&(Gt.receiveShadow=W.receiveShadow,ze.setValue(O,"receiveShadow",W.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Jn.envMap.value=St,Jn.flipEnvMap.value=St.isCubeTexture&&St.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&H.environment!==null&&(Jn.envMapIntensity.value=H.environmentIntensity),Wn&&(ze.setValue(O,"toneMappingExposure",_.toneMappingExposure),Gt.needsLights&&Nm(Jn,ho),at&&$.fog===!0&&st.refreshFogUniforms(Jn,at),st.refreshMaterialUniforms(Jn,$,G,K,p.state.transmissionRenderTarget[D.id]),nc.upload(O,rf(Gt),Jn,ie)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(nc.upload(O,rf(Gt),Jn,ie),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&ze.setValue(O,"center",W.center),ze.setValue(O,"modelViewMatrix",W.modelViewMatrix),ze.setValue(O,"normalMatrix",W.normalMatrix),ze.setValue(O,"modelMatrix",W.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const Pn=$.uniformsGroups;for(let Fn=0,Vc=Pn.length;Fn<Vc;Fn++){const ks=Pn[Fn];te.update(ks,Vn),te.bind(ks,Vn)}}return Vn}function Nm(D,H){D.ambientLightColor.needsUpdate=H,D.lightProbe.needsUpdate=H,D.directionalLights.needsUpdate=H,D.directionalLightShadows.needsUpdate=H,D.pointLights.needsUpdate=H,D.pointLightShadows.needsUpdate=H,D.spotLights.needsUpdate=H,D.spotLightShadows.needsUpdate=H,D.rectAreaLights.needsUpdate=H,D.hemisphereLights.needsUpdate=H}function Um(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(D,H,q){const $=Ct.get(D);$.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Ct.get(D.texture).__webglTexture=H,Ct.get(D.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:q,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,H){const q=Ct.get(D);q.__webglFramebuffer=H,q.__useDefaultFramebuffer=H===void 0};const Om=O.createFramebuffer();this.setRenderTarget=function(D,H=0,q=0){C=D,w=H,b=q;let $=!0,W=null,at=!1,vt=!1;if(D){const St=Ct.get(D);if(St.__useDefaultFramebuffer!==void 0)Rt.bindFramebuffer(O.FRAMEBUFFER,null),$=!1;else if(St.__webglFramebuffer===void 0)ie.setupRenderTarget(D);else if(St.__hasExternalTextures)ie.rebindTextures(D,Ct.get(D.texture).__webglTexture,Ct.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const Ot=D.depthTexture;if(St.__boundDepthTexture!==Ot){if(Ot!==null&&Ct.has(Ot)&&(D.width!==Ot.image.width||D.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ie.setupDepthRenderbuffer(D)}}const Xt=D.texture;(Xt.isData3DTexture||Xt.isDataArrayTexture||Xt.isCompressedArrayTexture)&&(vt=!0);const qt=Ct.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(qt[H])?W=qt[H][q]:W=qt[H],at=!0):D.samples>0&&ie.useMultisampledRTT(D)===!1?W=Ct.get(D).__webglMultisampledFramebuffer:Array.isArray(qt)?W=qt[q]:W=qt,R.copy(D.viewport),P.copy(D.scissor),N=D.scissorTest}else R.copy(yt).multiplyScalar(G).floor(),P.copy(Bt).multiplyScalar(G).floor(),N=Wt;if(q!==0&&(W=Om),Rt.bindFramebuffer(O.FRAMEBUFFER,W)&&$&&Rt.drawBuffers(D,W),Rt.viewport(R),Rt.scissor(P),Rt.setScissorTest(N),at){const St=Ct.get(D.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+H,St.__webglTexture,q)}else if(vt){const St=H;for(let Xt=0;Xt<D.textures.length;Xt++){const qt=Ct.get(D.textures[Xt]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Xt,qt.__webglTexture,q,St)}}else if(D!==null&&q!==0){const St=Ct.get(D.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,St.__webglTexture,q)}x=-1},this.readRenderTargetPixels=function(D,H,q,$,W,at,vt,wt=0){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=Ct.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&vt!==void 0&&(St=St[vt]),St){Rt.bindFramebuffer(O.FRAMEBUFFER,St);try{const Xt=D.textures[wt],qt=Xt.format,Ot=Xt.type;if(!Kt.textureFormatReadable(qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Kt.textureTypeReadable(Ot)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=D.width-$&&q>=0&&q<=D.height-W&&(D.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+wt),O.readPixels(H,q,$,W,kt.convert(qt),kt.convert(Ot),at))}finally{const Xt=C!==null?Ct.get(C).__webglFramebuffer:null;Rt.bindFramebuffer(O.FRAMEBUFFER,Xt)}}},this.readRenderTargetPixelsAsync=async function(D,H,q,$,W,at,vt,wt=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=Ct.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&vt!==void 0&&(St=St[vt]),St)if(H>=0&&H<=D.width-$&&q>=0&&q<=D.height-W){Rt.bindFramebuffer(O.FRAMEBUFFER,St);const Xt=D.textures[wt],qt=Xt.format,Ot=Xt.type;if(!Kt.textureFormatReadable(qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Kt.textureTypeReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ue=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,ue),O.bufferData(O.PIXEL_PACK_BUFFER,at.byteLength,O.STREAM_READ),D.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+wt),O.readPixels(H,q,$,W,kt.convert(qt),kt.convert(Ot),0);const Te=C!==null?Ct.get(C).__webglFramebuffer:null;Rt.bindFramebuffer(O.FRAMEBUFFER,Te);const He=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await o1(O,He,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,ue),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,at),O.deleteBuffer(ue),O.deleteSync(He),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,H=null,q=0){const $=Math.pow(2,-q),W=Math.floor(D.image.width*$),at=Math.floor(D.image.height*$),vt=H!==null?H.x:0,wt=H!==null?H.y:0;ie.setTexture2D(D,0),O.copyTexSubImage2D(O.TEXTURE_2D,q,0,0,vt,wt,W,at),Rt.unbindTexture()};const Fm=O.createFramebuffer(),Bm=O.createFramebuffer();this.copyTextureToTexture=function(D,H,q=null,$=null,W=0,at=null){at===null&&(W!==0?(Oo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),at=W,W=0):at=0);let vt,wt,St,Xt,qt,Ot,ue,Te,He;const ke=D.isCompressedTexture?D.mipmaps[at]:D.image;if(q!==null)vt=q.max.x-q.min.x,wt=q.max.y-q.min.y,St=q.isBox3?q.max.z-q.min.z:1,Xt=q.min.x,qt=q.min.y,Ot=q.isBox3?q.min.z:0;else{const Qn=Math.pow(2,-W);vt=Math.floor(ke.width*Qn),wt=Math.floor(ke.height*Qn),D.isDataArrayTexture?St=ke.depth:D.isData3DTexture?St=Math.floor(ke.depth*Qn):St=1,Xt=0,qt=0,Ot=0}$!==null?(ue=$.x,Te=$.y,He=$.z):(ue=0,Te=0,He=0);const De=kt.convert(H.format),Gt=kt.convert(H.type);let Be;H.isData3DTexture?(ie.setTexture3D(H,0),Be=O.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(ie.setTexture2DArray(H,0),Be=O.TEXTURE_2D_ARRAY):(ie.setTexture2D(H,0),Be=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment);const _e=O.getParameter(O.UNPACK_ROW_LENGTH),Vn=O.getParameter(O.UNPACK_IMAGE_HEIGHT),ir=O.getParameter(O.UNPACK_SKIP_PIXELS),Wn=O.getParameter(O.UNPACK_SKIP_ROWS),ho=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,ke.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ke.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Xt),O.pixelStorei(O.UNPACK_SKIP_ROWS,qt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Ot);const ze=D.isDataArrayTexture||D.isData3DTexture,Jn=H.isDataArrayTexture||H.isData3DTexture;if(D.isDepthTexture){const Qn=Ct.get(D),Pn=Ct.get(H),Fn=Ct.get(Qn.__renderTarget),Vc=Ct.get(Pn.__renderTarget);Rt.bindFramebuffer(O.READ_FRAMEBUFFER,Fn.__webglFramebuffer),Rt.bindFramebuffer(O.DRAW_FRAMEBUFFER,Vc.__webglFramebuffer);for(let ks=0;ks<St;ks++)ze&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ct.get(D).__webglTexture,W,Ot+ks),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ct.get(H).__webglTexture,at,He+ks)),O.blitFramebuffer(Xt,qt,vt,wt,ue,Te,vt,wt,O.DEPTH_BUFFER_BIT,O.NEAREST);Rt.bindFramebuffer(O.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(W!==0||D.isRenderTargetTexture||Ct.has(D)){const Qn=Ct.get(D),Pn=Ct.get(H);Rt.bindFramebuffer(O.READ_FRAMEBUFFER,Fm),Rt.bindFramebuffer(O.DRAW_FRAMEBUFFER,Bm);for(let Fn=0;Fn<St;Fn++)ze?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Qn.__webglTexture,W,Ot+Fn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Qn.__webglTexture,W),Jn?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Pn.__webglTexture,at,He+Fn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Pn.__webglTexture,at),W!==0?O.blitFramebuffer(Xt,qt,vt,wt,ue,Te,vt,wt,O.COLOR_BUFFER_BIT,O.NEAREST):Jn?O.copyTexSubImage3D(Be,at,ue,Te,He+Fn,Xt,qt,vt,wt):O.copyTexSubImage2D(Be,at,ue,Te,Xt,qt,vt,wt);Rt.bindFramebuffer(O.READ_FRAMEBUFFER,null),Rt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Jn?D.isDataTexture||D.isData3DTexture?O.texSubImage3D(Be,at,ue,Te,He,vt,wt,St,De,Gt,ke.data):H.isCompressedArrayTexture?O.compressedTexSubImage3D(Be,at,ue,Te,He,vt,wt,St,De,ke.data):O.texSubImage3D(Be,at,ue,Te,He,vt,wt,St,De,Gt,ke):D.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,at,ue,Te,vt,wt,De,Gt,ke.data):D.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,at,ue,Te,ke.width,ke.height,De,ke.data):O.texSubImage2D(O.TEXTURE_2D,at,ue,Te,vt,wt,De,Gt,ke);O.pixelStorei(O.UNPACK_ROW_LENGTH,_e),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Vn),O.pixelStorei(O.UNPACK_SKIP_PIXELS,ir),O.pixelStorei(O.UNPACK_SKIP_ROWS,Wn),O.pixelStorei(O.UNPACK_SKIP_IMAGES,ho),at===0&&H.generateMipmaps&&O.generateMipmap(Be),Rt.unbindTexture()},this.initRenderTarget=function(D){Ct.get(D).__webglFramebuffer===void 0&&ie.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?ie.setTextureCube(D,0):D.isData3DTexture?ie.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?ie.setTexture2DArray(D,0):ie.setTexture2D(D,0),Rt.unbindTexture()},this.resetState=function(){w=0,b=0,C=null,Rt.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Me._getDrawingBufferColorSpace(t),e.unpackColorSpace=Me._getUnpackColorSpace()}}const Vi=9,Ur=36,wl=4,Ve=(i,t=1,e=0)=>e?{id:i,count:t,dmg:e}:{id:i,count:t},Or=i=>Array.from({length:i},()=>null);function Ap(i,t){return i.id===t.id&&(i.dmg??0)===(t.dmg??0)&&_s(i.id)>1}function Cy(i){var a;if(!i||typeof i!="object")return null;const{id:t,count:e,dmg:n}=i;if(!fg(t)||!Number.isInteger(e)||e<=0)return null;const s=_s(t),r=((a=ye(t))==null?void 0:a.durability)??0,o=Number.isInteger(n)?Math.max(0,Math.min(r,n)):0;return Ve(t,Math.min(s,e),o)}function vd(i,t){const e=Or(t);if(Array.isArray(i))for(let n=0;n<t;n++)e[n]=Cy(i[n]);return e}const Ly=Array.from({length:Ur},(i,t)=>t);function gi(i,t,e=Ly){let n=t.count;const s=_s(t.id);for(const r of e){const o=i[r];if(n<=0)break;if(o&&Ap(o,t)&&o.count<s){const a=Math.min(n,s-o.count);o.count+=a,n-=a}}for(const r of e){if(n<=0)break;if(!i[r]){const o=Math.min(n,s);i[r]={...t,count:o},n-=o}}return n}function _d(i,t=1){var s;const e=(s=ye(i.id))==null?void 0:s.durability;if(!e)return i;const n=(i.dmg??0)+t;return n>=e?null:{...i,dmg:n}}function Dy(i,t){const e=Ze[Lt(i)];return e.harvestLevel<0?!0:!!(t!=null&&t.tool)&&t.tool.type===e.tool&&t.tool.level>=e.harvestLevel}function Py(i,t,e=!1,n=!0){var c;const s=Ze[Lt(i)];if(s.hardness<0)return 1/0;if(s.hardness===0)return 0;const r=t===null?void 0:ye(t);let o=1;r!=null&&r.tool&&s.tool===r.tool.type&&(o=r.tool.speed),((c=r==null?void 0:r.tool)==null?void 0:c.type)==="sword"&&s.tool==="shears"&&(o=1.5);let a=o/s.hardness/(Dy(i,r)?30:100);return e&&(a/=5),n||(a/=5),a>=1?0:Math.ceil(1/a)/20}const Iy=[0,0,0,1,1,1],tt=i=>i/16;function Zn(i,t){let[e,n,s,r,o,a]=i;for(let c=0;c<(t&3);c++){const l=1-a,h=1-s;s=e,a=r,e=l,r=h}return[e,n,s,r,o,a]}function ky(i){const t=tt(3),e=(i&4)!==0,n=[0,0,1-t,1,1,1];return[Zn(e?[0,0,0,t,1,1]:n,i&3)]}function Ny(i){const t=(i&4)!==0;return[t?[0,.5,0,1,1,1]:[0,0,0,1,.5,1],Zn(t?[0,0,0,1,.5,.5]:[0,.5,0,1,1,.5],i&3)]}const Uy=i=>{const t=Lt(i);return t===A.OAK_FENCE||t===A.OAK_FENCE_GATE||Ke[t]===1&&bn[t]===Tc},Oy=i=>{const t=Lt(i);return t===A.GLASS_PANE||t===A.GLASS||Ke[t]===1&&bn[t]===Tc};function Fy(i){const t=[tt(7),0,tt(7),tt(9),1,tt(9)],e=[];for(let n=0;n<4;n++){const[s,,r]=Xo[n];i&&Oy(i(s,0,r))&&e.push(Zn([tt(7),0,0,tt(9),1,tt(7)],n))}if(!e.length)for(let n=0;n<4;n++)e.push(Zn([tt(7),0,0,tt(9),1,tt(7)],n));return[t,...e]}function By(i){const t=tt(3);return i&4?[Zn([0,0,0,1,1,t],i&3)]:[i&8?[0,1-t,0,1,1,1]:[0,0,0,1,t,1]]}function Rp(i,t){const e=(i&4)!==0;let n;if(t){if(e)return[];n=[[0,0,tt(6),1,1.5,tt(10)]]}else e?n=[[0,tt(5),tt(7),tt(2),1,tt(9)],[tt(14),tt(5),tt(7),1,1,tt(9)],[0,tt(6),tt(9),tt(2),tt(9),tt(15)],[0,tt(12),tt(9),tt(2),tt(15),tt(15)],[tt(14),tt(6),tt(9),1,tt(9),tt(15)],[tt(14),tt(12),tt(9),1,tt(15),tt(15)]]:n=[[0,tt(5),tt(7),tt(2),1,tt(9)],[tt(14),tt(5),tt(7),1,1,tt(9)],[tt(2),tt(6),tt(7),tt(14),tt(9),tt(9)],[tt(2),tt(12),tt(7),tt(14),tt(15),tt(9)],[tt(6),tt(9),tt(7),tt(8),tt(12),tt(9)],[tt(8),tt(9),tt(7),tt(10),tt(12),tt(9)]];return i&1?n.map(s=>Zn(s,1)):n}function Cp(i,t,e){const s=[[tt(6),0,tt(6),tt(10),t,tt(10)]];if(!i)return s;for(let r=0;r<4;r++){const[o,,a]=Xo[r];Uy(i(o,0,a))&&(e?s.push(Zn([tt(6),0,0,tt(10),t,tt(6)],r)):(s.push(Zn([tt(7),tt(12),0,tt(9),tt(15),tt(6)],r)),s.push(Zn([tt(7),tt(6),0,tt(9),tt(9),tt(6)],r))))}return s}function ku(i,t){const e=Lt(i),n=Rs(i);switch(bn[e]){case Ao:return[n&1?[0,.5,0,1,1,1]:[0,0,0,1,.5,1]];case k0:return Ny(n);case du:return ky(n);case no:return[Zn([0,0,0,1,1,tt(1)],n&3)];case pu:return Cp(t,1,!1);case mu:return[[0,0,0,1,tt(9),1]];case N0:return[[0,0,0,1,tt(15),1]];case U0:return[[tt(1),0,tt(1),tt(15),1,tt(15)]];case nh:return[[tt(1),0,tt(1),tt(15),tt(14),tt(15)]];case O0:return Fy(t);case gu:return By(n);case Ac:return Rp(n,!1);case Tc:return[Iy];default:return[]}}function zy(i,t){const e=Lt(i),n=bn[e];if(e===A.AIR)return[];switch(n){case Jr:case Qr:case qo:case to:case eo:return[];case no:return[Zn([0,0,0,1,1,tt(3)],Rs(i)&3)];case pu:return Cp(t,1.5,!0);case Ac:return Rp(Rs(i),!0);default:return ku(i,t)}}function Zh(i,t){const e=Lt(i),n=Rs(i);switch(bn[e]){case Jr:case to:return[];case Qr:return[[tt(2),0,tt(2),tt(14),tt(13),tt(14)]];case qo:return[[0,0,0,1,tt(2+2*Math.min(7,n&7)),1]];case eo:return n===0?[[tt(6),0,tt(6),tt(10),tt(10),tt(10)]]:[Zn([tt(5.5),tt(3),0,tt(10.5),tt(13),tt(5)],n-1&3)];case no:return[Zn([0,0,0,1,1,tt(3)],n&3)];default:return ku(i,t)}}const Sr=1e-7;function Lp(i,t,e,n,s,r,o){const a=[],c=Math.floor(t),l=Math.floor(s),h=Math.floor(e)-1,u=Math.floor(r),f=Math.floor(n),d=Math.floor(o);for(let m=h;m<=u;m++)for(let v=f;v<=d;v++)for(let g=c;g<=l;g++){const p=i.getState(g,m,v),M=Lt(p);if(M===A.AIR||bn[M]===Jr||!Ze[M].solid)continue;const E=zy(p,(_,T,w)=>i.getState(g+_,m+T,v+w));for(const _ of E)a.push(g+_[0],m+_[1],v+_[2],g+_[3],m+_[4],v+_[5])}return a}function ms(i,t,e,n){if(n===0)return 0;const s=(e+1)%3,r=(e+2)%3;for(let o=0;o<i.length;o+=6)i[o+s+3]<=t[s]+Sr||i[o+s]>=t[s+3]-Sr||i[o+r+3]<=t[r]+Sr||i[o+r]>=t[r+3]-Sr||(n>0&&t[e+3]<=i[o+e]+Sr?n=Math.min(n,i[o+e]-t[e+3]):n<0&&t[e]>=i[o+e+3]-Sr&&(n=Math.max(n,i[o+e+3]-t[e])));return n}const Bi=(i,t,e)=>{i[t]+=e,i[t+3]+=e};function Dp(i){const t=i.width/2;return[i.x-t,i.y,i.z-t,i.x+t,i.y+i.height,i.z+t]}function Gy(i,t,e,n,s,r=0){const o=Dp(t),a=Math.max(r,0)+.01,c=Lp(i,Math.min(o[0],o[0]+e)-.01,Math.min(o[1],o[1]+n)-.01,Math.min(o[2],o[2]+s)-.01,Math.max(o[3],o[3]+e)+.01,Math.max(o[4],o[4]+n)+a,Math.max(o[5],o[5]+s)+.01),l=[...o],h=ms(c,l,1,n);Bi(l,1,h);const u=ms(c,l,0,e);Bi(l,0,u);const f=ms(c,l,2,s);Bi(l,2,f);const d=n<0&&h!==n,m=u!==e||f!==s;if(r>0&&m&&(t.onGround||d)){const v=[...o],g=ms(c,v,1,r);Bi(v,1,g);const p=ms(c,v,0,e);Bi(v,0,p);const M=ms(c,v,2,s);Bi(v,2,M);const E=ms(c,v,1,-g+(n<0?n:0));if(Bi(v,1,E),p*p+M*M>u*u+f*f+1e-6){l.splice(0,6,...v),t.x=(l[0]+l[3])/2,t.y=l[1],t.z=(l[2]+l[5])/2,t.onGround=!0,t.collidedH=p!==e||M!==s,p!==e&&(t.vx=0),M!==s&&(t.vz=0),t.vy=0;return}}t.x=(l[0]+l[3])/2,t.y=l[1],t.z=(l[2]+l[5])/2,t.onGround=d,t.collidedH=m,h!==n&&(t.vy=0),u!==e&&(t.vx=0),f!==s&&(t.vz=0)}function Tl(i,t,e,n){const s=Dp(t);Bi(s,0,e),Bi(s,2,n);const r=Lp(i,s[0],s[1]-1,s[2],s[3],s[1],s[5]);return ms(r,s,1,-1)>-1+1e-4}function Hy(i,t,e,n){for(;e!==0&&!Tl(i,t,e,0);)e=Math.abs(e)<.05?0:e-Math.sign(e)*.05;for(;n!==0&&!Tl(i,t,0,n);)n=Math.abs(n)<.05?0:n-Math.sign(n)*.05;for(;e!==0&&n!==0&&!Tl(i,t,e,n);)e=Math.abs(e)<.05?0:e-Math.sign(e)*.05,n=Math.abs(n)<.05?0:n-Math.sign(n)*.05;return[e,n]}function Vy(i,t,e){const n=t.width/2-.001,s={inWater:!1,inLava:!1,eyeInWater:!1,onLadder:!1},r=Math.floor(t.y),o=Math.floor(t.y+t.height-.01);for(let l=r;l<=o;l++)for(let h=Math.floor(t.z-n);h<=Math.floor(t.z+n);h++)for(let u=Math.floor(t.x-n);u<=Math.floor(t.x+n);u++){const f=i.getState(u,l,h),d=Lt(f);if(d===A.WATER||d===A.LAVA){const m=l+ac(f);t.y+.1<m&&(d===A.WATER?s.inWater=!0:s.inLava=!0)}else Ze[d].climbable&&(s.onLadder=!0)}const a=t.y+e,c=i.getState(Math.floor(t.x),Math.floor(a),Math.floor(t.z));return Lt(c)===A.WATER&&a<Math.floor(a)+ac(c)+.05&&(s.eyeInWater=!0),s}function xd(i,t,e,n){const s=i.width/2;return i.x+s>t&&i.x-s<t+1&&i.y+i.height>e&&i.y<e+1&&i.z+s>n&&i.z-s<n+1}const Pp=Math.sqrt(3),Wy=.5*(Pp-1),bo=(3-Pp)/6,Xy=1/3,Si=1/6,Co=i=>Math.floor(i)|0,Md=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]),Al=new Float64Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);function gs(i=Math.random){const t=Ip(i),e=new Float64Array(t).map(s=>Md[s%12*2]),n=new Float64Array(t).map(s=>Md[s%12*2+1]);return function(r,o){let a=0,c=0,l=0;const h=(r+o)*Wy,u=Co(r+h),f=Co(o+h),d=(u+f)*bo,m=u-d,v=f-d,g=r-m,p=o-v;let M,E;g>p?(M=1,E=0):(M=0,E=1);const _=g-M+bo,T=p-E+bo,w=g-1+2*bo,b=p-1+2*bo,C=u&255,x=f&255;let y=.5-g*g-p*p;if(y>=0){const N=C+t[x],B=e[N],X=n[N];y*=y,a=y*y*(B*g+X*p)}let R=.5-_*_-T*T;if(R>=0){const N=C+M+t[x+E],B=e[N],X=n[N];R*=R,c=R*R*(B*_+X*T)}let P=.5-w*w-b*b;if(P>=0){const N=C+1+t[x+1],B=e[N],X=n[N];P*=P,l=P*P*(B*w+X*b)}return 70*(a+c+l)}}function Rl(i=Math.random){const t=Ip(i),e=new Float64Array(t).map(r=>Al[r%12*3]),n=new Float64Array(t).map(r=>Al[r%12*3+1]),s=new Float64Array(t).map(r=>Al[r%12*3+2]);return function(o,a,c){let l,h,u,f;const d=(o+a+c)*Xy,m=Co(o+d),v=Co(a+d),g=Co(c+d),p=(m+v+g)*Si,M=m-p,E=v-p,_=g-p,T=o-M,w=a-E,b=c-_;let C,x,y,R,P,N;T>=w?w>=b?(C=1,x=0,y=0,R=1,P=1,N=0):T>=b?(C=1,x=0,y=0,R=1,P=0,N=1):(C=0,x=0,y=1,R=1,P=0,N=1):w<b?(C=0,x=0,y=1,R=0,P=1,N=1):T<b?(C=0,x=1,y=0,R=0,P=1,N=1):(C=0,x=1,y=0,R=1,P=1,N=0);const B=T-C+Si,X=w-x+Si,V=b-y+Si,K=T-R+2*Si,G=w-P+2*Si,Z=b-N+2*Si,rt=T-1+3*Si,yt=w-1+3*Si,Bt=b-1+3*Si,Wt=m&255,ne=v&255,ae=g&255;let Q=.6-T*T-w*w-b*b;if(Q<0)l=0;else{const _t=Wt+t[ne+t[ae]];Q*=Q,l=Q*Q*(e[_t]*T+n[_t]*w+s[_t]*b)}let nt=.6-B*B-X*X-V*V;if(nt<0)h=0;else{const _t=Wt+C+t[ne+x+t[ae+y]];nt*=nt,h=nt*nt*(e[_t]*B+n[_t]*X+s[_t]*V)}let mt=.6-K*K-G*G-Z*Z;if(mt<0)u=0;else{const _t=Wt+R+t[ne+P+t[ae+N]];mt*=mt,u=mt*mt*(e[_t]*K+n[_t]*G+s[_t]*Z)}let zt=.6-rt*rt-yt*yt-Bt*Bt;if(zt<0)f=0;else{const _t=Wt+1+t[ne+1+t[ae+1]];zt*=zt,f=zt*zt*(e[_t]*rt+n[_t]*yt+s[_t]*Bt)}return 32*(l+h+u+f)}}function Ip(i){const e=new Uint8Array(512);for(let n=0;n<512/2;n++)e[n]=n;for(let n=0;n<512/2-1;n++){const s=n+~~(i()*(256-n)),r=e[n];e[n]=e[s],e[s]=r}for(let n=256;n<512;n++)e[n]=e[n-256];return e}function ao(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ne(i,t,e,n){let s=n|0;return s=s+Math.imul(i|0,668265261)|0,s=s+Math.imul(t|0,374761393)|0,s=s+Math.imul(e|0,1013904242)|0,s=Math.imul(s^s>>>15,2246822507),s=Math.imul(s^s>>>13,3266489909),s^=s>>>16,(s>>>0)/4294967296}const pe={PLAINS:0,FOREST:1,DESERT:2,SNOWY:3,MOUNTAINS:4,BEACH:5,OCEAN:6},ls=5,Er=64,wr=4,Tr=6,Yy=mn+38,ic=mn+50,yd=10;function Ar(i,t,e,n){let s=0,r=1,o=1,a=0;for(let c=0;c<n;c++)s+=i(t*o,e*o)*r,a+=r,r*=.5,o*=2;return s/a}function Ky(i,t,e){const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)}class qy{constructor(t){S(this,"seed");S(this,"continent");S(this,"hills");S(this,"detail");S(this,"mountain");S(this,"ridge");S(this,"temperature");S(this,"moisture");S(this,"cave1");S(this,"cave2");S(this,"cavern");this.seed=t|0;let e=0;const n=()=>ao(this.seed+2654435769*++e);this.continent=gs(n()),this.hills=gs(n()),this.detail=gs(n()),this.mountain=gs(n()),this.ridge=gs(n()),this.temperature=gs(n()),this.moisture=gs(n()),this.cave1=Rl(n()),this.cave2=Rl(n()),this.cavern=Rl(n())}column(t,e){const n=Ar(this.continent,t/700,e/700,4),s=Ar(this.hills,t/120,e/120,4),r=this.detail(t/30,e/30),o=Ky(.15,.55,Ar(this.mountain,t/420,e/420,3)),a=1-Math.abs(Ar(this.ridge,t/160,e/160,4)),c=mn+4+n*24+s*8+r*2+o*a*a*60,l=Math.max(4,Math.min(Se-14,Math.floor(c))),h=Ar(this.temperature,t/520,e/520,2),u=Ar(this.moisture,t/460,e/460,2);let f;return l<mn-1?f=h<-.3?pe.SNOWY:pe.OCEAN:l>=Yy?f=pe.MOUNTAINS:l<=mn+1?f=h<-.3?pe.SNOWY:pe.BEACH:h>.25&&u<.1?f=pe.DESERT:h<-.3?f=pe.SNOWY:u>.12?f=pe.FOREST:f=pe.PLAINS,{height:l,biome:f}}isCave(t,e,n){const s=this.cave1(t*.045,e*.07,n*.045),r=this.cave2(t*.045,e*.07,n*.045);return s*s+r*r<.016?!0:e<40&&this.cavern(t*.02,e*.035,n*.02)>.7}ore(t,e,n){const s=Ne(t>>1,e>>1,n>>1,this.seed+101);let r=A.STONE;return s<.004?r=e<16?A.DIAMOND_ORE:A.STONE:s<.01?r=e<32?A.GOLD_ORE:A.STONE:s<.035?r=e<64?A.IRON_ORE:A.STONE:s<.065?r=A.COAL_ORE:s<.075&&e<60&&(r=A.GRAVEL),r===A.STONE||Ne(t,e,n,this.seed+102)<.55?r:A.STONE}generateChunk(t,e){const n=new Uint16Array(jm),s=new Int16Array(Mt*Mt),r=t*Mt,o=e*Mt;for(let a=0;a<Mt;a++)for(let c=0;c<Mt;c++){const l=r+c,h=o+a,{height:u,biome:f}=this.column(l,h);s[a*Mt+c]=u;const d=Ne(l,0,h,this.seed+7),m=3+Math.floor(d*2);let v=A.GRASS,g=A.DIRT,p=A.STONE;switch(f){case pe.DESERT:v=A.SAND,g=A.SAND,p=A.SANDSTONE;break;case pe.SNOWY:v=u<mn?A.DIRT:u<=mn+1?A.SAND:A.SNOWY_GRASS,g=v===A.SAND?A.SAND:A.DIRT;break;case pe.BEACH:v=A.SAND,g=A.SAND,p=A.SANDSTONE;break;case pe.OCEAN:v=u>=mn-6?A.SAND:this.detail(l/12,h/12)>0?A.GRAVEL:A.DIRT,g=v===A.GRAVEL?A.GRAVEL:v===A.DIRT?A.DIRT:A.SAND;break;case pe.MOUNTAINS:v=u>=ic?A.SNOW_BLOCK:d<.5&&u<ic-6?A.GRASS:A.STONE,g=v===A.GRASS?A.DIRT:A.STONE;break}const M=f===pe.SNOWY;for(let T=0;T<=Math.max(u,mn);T++){let w;T===0||T<=3&&Ne(l,T,h,this.seed+3)<.8-T*.2?w=A.BEDROCK:T>u?w=M&&T===mn?A.ICE:A.WATER:T===u?w=v:T>u-m?w=g:T>u-m-3&&p!==A.STONE?w=p:T<u-5&&this.isCave(l,T,h)?w=T<=yd?A.LAVA:A.AIR:w=this.ore(l,T,h),n[Ae(c,T,a)]=w}const E=u+1;if(E<=mn||E>=Se-4)continue;const _=Ne(l,1,h,this.seed+9);if(u===mn&&!M&&(v===A.GRASS||v===A.SAND||v===A.DIRT)&&Ne(l,5,h,this.seed+9)<.1&&[[1,0],[-1,0],[0,1],[0,-1]].some(([w,b])=>this.column(l+w,h+b).height<mn)){const w=1+Math.floor(Ne(l,6,h,this.seed+9)*3);for(let b=0;b<w;b++)n[Ae(c,E+b,a)]=A.SUGAR_CANE;continue}if(v===A.GRASS&&f===pe.PLAINS&&Ne(l>>3,7,h>>3,this.seed+21)<.03&&Ne(l,8,h,this.seed+21)<.12){n[Ae(c,E,a)]=gn(A.PUMPKIN,Math.floor(Ne(l,9,h,this.seed+21)*4));continue}if(v===A.GRASS){const T=f===pe.PLAINS?.22:.1;_<T?n[Ae(c,E,a)]=A.TALL_GRASS:_<T+.012?n[Ae(c,E,a)]=A.DANDELION:_<T+.022&&(n[Ae(c,E,a)]=A.POPPY)}else if(f===pe.DESERT)if(_<.005){const T=1+Math.floor(Ne(l,2,h,this.seed+9)*3);for(let w=0;w<T;w++)n[Ae(c,E+w,a)]=A.CACTUS}else _<.012&&(n[Ae(c,E,a)]=A.DEAD_BUSH)}return this.placeOddities(n,s,t,e),this.placeTrees(n,t,e),n}placeOddities(t,e,n,s){this.carveTunnels(t,e,n,s),this.placeCaveTorches(t,e,n,s),this.placePyramid(t,e,n,s),this.placeShrine(t,e,n,s)}tunnel(t,e){const n=o=>Ne(t,o,e,this.seed+41);if(n(0)>=.35)return null;const s=n(4)<.5,r=n(5)<.5?1:-1;return{x:t*Er+Math.floor(n(1)*Er),y:16+Math.floor(n(2)*22),z:e*Er+Math.floor(n(3)*Er),dx:s?r:0,dz:s?0:r,length:24+Math.floor(n(6)*36)}}carveTunnels(t,e,n,s){const r=n*Mt,o=s*Mt,a=Math.floor(r/Er),c=Math.floor(o/Er);for(let l=c-1;l<=c+1;l++)for(let h=a-1;h<=a+1;h++){const u=this.tunnel(h,l);if(!u)continue;const f=u.dz!==0?1:0,d=u.dx!==0?1:0;for(let m=0;m<u.length;m++)for(let v=0;v<2;v++){const g=u.x+u.dx*m+f*v,p=u.z+u.dz*m+d*v,M=g-r,E=p-o;if(M<0||M>=Mt||E<0||E>=Mt||u.y+7>e[E*Mt+M])continue;const _=Lt(t[Ae(M,u.y+2,E)]);if(_===A.WATER||_===A.LAVA||_===A.SAND||_===A.GRAVEL)continue;for(let w=u.y;w<u.y+2;w++){const b=Ae(M,w,E),C=Lt(t[b]);C!==A.WATER&&C!==A.LAVA&&C!==A.BEDROCK&&(t[b]=A.AIR)}const T=Ae(M,u.y,E);m===0&&v===0&&t[T]===A.AIR&&Ne(h,7,l,this.seed+41)<.6&&Ke[Lt(t[Ae(M,u.y-1,E)])]&&(t[T]=gn(A.TORCH,0))}}}placeCaveTorches(t,e,n,s){for(let r=0;r<Mt;r++)for(let o=0;o<Mt;o++){const a=n*Mt+o,c=s*Mt+r,l=e[r*Mt+o]-6;for(let h=yd+2;h<l;h++)t[Ae(o,h,r)]!==A.AIR||t[Ae(o,h+1,r)]!==A.AIR||Ke[Lt(t[Ae(o,h-1,r)])]&&Ne(a,h,c,this.seed+31)<.0012&&(t[Ae(o,h,r)]=gn(A.TORCH,0))}}placePyramid(t,e,n,s){const r=Math.floor(n/wr),o=Math.floor(s/wr);for(let a=0;a<3;a++){const c=M=>Ne(r,a*8+M,o,this.seed+51);if(c(0)>=.4||r*wr+Math.floor(c(1)*wr)!==n||o*wr+Math.floor(c(2)*wr)!==s)continue;const l=5+Math.floor(c(3)*6),h=5+Math.floor(c(4)*6),u=n*Mt+l,f=s*Mt+h,d=e[h*Mt+l],m=mn-d;if(m<1||m>3||this.column(u,f).biome!==pe.OCEAN)continue;const v=m+2,g=[];for(let M=-v;M<=v;M++)for(let E=-v;E<=v;E++)g.push(e[(h+M)*Mt+l+E]);if(g.some(M=>M>=mn))continue;let p=0;for(let M=-v;M<=v;M++)for(let E=-v;E<=v;E++){const _=d+1+v-Math.max(Math.abs(E),Math.abs(M));for(let T=g[p++]+1;T<=_;T++)t[Ae(l+E,T,h+M)]=A.SANDSTONE}t[Ae(l,d+2+v,h)]=gn(A.TORCH,0);return}}placeShrine(t,e,n,s){const r=Math.floor(n/Tr),o=Math.floor(s/Tr),a=m=>Ne(r,m,o,this.seed+61);if(a(0)>=.35||r*Tr+Math.floor(a(1)*Tr)!==n||o*Tr+Math.floor(a(2)*Tr)!==s)return;const c=2+Math.floor(a(3)*12),l=2+Math.floor(a(4)*12),h=n*Mt+c,u=s*Mt+l,f=e[l*Mt+c];if(f<=mn+1||f+4>=Se)return;const{biome:d}=this.column(h,u);if(!(d===pe.OCEAN||d===pe.BEACH||d===pe.MOUNTAINS)){for(let m=-1;m<=1;m++)for(let v=-1;v<=1;v++)if(e[(l+m)*Mt+c+v]!==f)return;for(let m=-1;m<=1;m++)for(let v=-1;v<=1;v++){t[Ae(c+v,f,l+m)]=A.GOLD_BLOCK;for(let g=f+1;g<=f+3;g++)t[Ae(c+v,g,l+m)]=A.AIR}t[Ae(c,f+1,l)]=A.MOSSY_COBBLESTONE,t[Ae(c,f+2,l)]=gn(A.TORCH,0);for(const[m,v]of[[1,0],[-1,0],[0,1],[0,-1]])t[Ae(c+m,f+1,l+v)]=gn(A.TORCH,0)}}placeTrees(t,e,n){const r=e*Mt-3,o=e*Mt+Mt-1+3,a=n*Mt-3,c=n*Mt+Mt-1+3;for(let l=Math.floor(a/ls);l<=Math.floor(c/ls);l++)for(let h=Math.floor(r/ls);h<=Math.floor(o/ls);h++){const u=h*ls+Math.floor(Ne(h,1,l,this.seed+12)*ls),f=l*ls+Math.floor(Ne(h,2,l,this.seed+12)*ls);if(u<r||u>o||f<a||f>c)continue;const{height:d,biome:m}=this.column(u,f);if(d<=mn+1)continue;let v=0;if(m===pe.FOREST?v=.8:m===pe.PLAINS?v=.07:m===pe.SNOWY?v=.35:m===pe.MOUNTAINS&&d<ic-6&&(v=.08),Ne(h,0,l,this.seed+11)>=v||d+12>=Se||m===pe.MOUNTAINS&&Ne(u,0,f,this.seed+7)>=.5)continue;const g=Ne(h,3,l,this.seed+12),p=m===pe.SNOWY||m===pe.MOUNTAINS?"spruce":m===pe.FOREST&&g<.3?"birch":"oak",M=Ne(h,4,l,this.seed+12),E=(_,T,w,b,C)=>Zy(t,e,n,_,T,w,b,C);Ne(h,5,l,this.seed+12)<.05?Jy(p,M,E,u,d+1,f):Qy(p,M,E,u,d+1,f)}}findSpawn(){for(let t=0;t<600;t+=4){const e=Math.max(1,Math.floor(2*Math.PI*t/8));for(let n=0;n<e;n++){const s=n/e*Math.PI*2,r=Math.round(Math.cos(s)*t),o=Math.round(Math.sin(s)*t),{height:a,biome:c}=this.column(r,o);if(a>mn+1&&c!==pe.MOUNTAINS)return[r+.5,a+1,o+.5]}}return[.5,this.column(0,0).height+1,.5]}}function $y(i,t){const e=Lt(i);return e===A.WATER||e===A.LAVA?!1:kr[e]===1||e===A.DANDELION||e===A.POPPY||e===A.OAK_SAPLING||e===A.BIRCH_SAPLING||e===A.SPRUCE_SAPLING||t&&(e===A.OAK_LEAVES||e===A.BIRCH_LEAVES||e===A.SPRUCE_LEAVES)}function jy(i,t,e){return t===A.DIRT?Lt(i)===A.GRASS||Lt(i)===A.SNOWY_GRASS:$y(i,e)}function Zy(i,t,e,n,s,r,o,a){const c=n-t*Mt,l=r-e*Mt;if(c<0||c>=Mt||l<0||l>=Mt||s<0||s>=Se)return;const h=Ae(c,s,l);jy(i[h],o,a)&&(i[h]=o)}function Jy(i,t,e,n,s,r){const o=ao(Math.floor(t*1e9)^Math.imul(n,83492791)^Math.imul(r,-1640531535)),a=i==="birch"?A.BIRCH_LOG:i==="spruce"?A.SPRUCE_LOG:A.OAK_LOG,c=5+Math.floor(t*3);for(let u=0;u<c;u++)e(n,s+u,r,a,!0);const l=[[1,0],[-1,0],[0,1],[0,-1]],h=2+Math.floor(o()*3);for(let u=0;u<h;u++){const[f,d]=l[Math.floor(o()*4)],m=s+c-1-Math.floor(o()*3),v=1+Math.floor(o()*2),g=gn(a,f!==0?1:2);for(let p=1;p<=v;p++)e(n+f*p,m+(p===v&&o()<.5?1:0),r+d*p,g,!0)}e(n,s-1,r,A.DIRT,!0)}function Qy(i,t,e,n,s,r){const o=ao(Math.floor(t*1e9)^Math.imul(n,73856093)^Math.imul(r,19349663));if(i==="spruce"){const u=6+Math.floor(t*4),f=[0,1,1,2,1,2,3,2,3,2];for(let d=0;d<Math.min(f.length,u-1);d++){const m=s+u-d,v=f[d];for(let g=-v;g<=v;g++)for(let p=-v;p<=v;p++)Math.abs(p)+Math.abs(g)>v+(v>1?1:0)||e(n+p,m,r+g,A.SPRUCE_LEAVES,!1)}for(let d=0;d<u;d++)e(n,s+d,r,A.SPRUCE_LOG,!0);e(n,s-1,r,A.DIRT,!0);return}const a=i==="birch",c=(a?5:4)+Math.floor(t*3),l=a?A.BIRCH_LOG:A.OAK_LOG,h=a?A.BIRCH_LEAVES:A.OAK_LEAVES;for(let u=c-3;u<=c;u++){const f=u>=c-1?1:2;for(let d=-f;d<=f;d++)for(let m=-f;m<=f;m++)Math.abs(m)===f&&Math.abs(d)===f&&(u===c||o()<.5)||e(n+m,s+u,r+d,h,!1)}for(let u=0;u<c;u++)e(n,s+u,r,l,!0);e(n,s-1,r,A.DIRT,!0)}const tb=32,eb=8,Cl=2,Ll=32,Jh=48e3,bd=700,nb=.6,ib=.32,sb=.24,ri=Math.PI*2;function kp(i){let t=i>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function rb(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619);return t>>>0}const Gn=(i,t,e)=>i<t?t:i>e?e:i,hs=(i,t)=>typeof i=="number"&&Number.isFinite(i)?i:t,Ia=i=>typeof i=="number"&&Number.isFinite(i),gc=i=>440*Math.pow(2,(i-69)/12);class Nu{constructor(t,e){S(this,"r");this.sr=t,this.r=kp(e)}u(t,e){return t+(e-t)*this.r()}sign(){return this.r()<.5?-1:1}pick(t){return t[Math.floor(this.r()*t.length)]}buf(t){return new Float32Array(Math.max(1,Math.round(t*this.sr)))}white(t){const e=this.buf(t);for(let n=0;n<e.length;n++)e[n]=this.r()*2-1;return e}pink(t){const e=this.buf(t);let n=0,s=0,r=0;for(let o=0;o<e.length;o++){const a=this.r()*2-1;n=.99765*n+a*.099046,s=.963*s+a*.2965164,r=.57*r+a*1.0526913,e[o]=(n+s+r+a*.1848)*.25}return e}brown(t){const e=this.buf(t);let n=0;for(let s=0;s<e.length;s++)n=(n+.02*(this.r()*2-1))/1.02,e[s]=n*3.5;return e}mix(t,e,n=0,s=1){const r=Math.round(n*this.sr),o=Math.min(e.length,t.length-r);for(let a=Math.max(0,-r);a<o;a++)t[r+a]+=e[a]*s;return t}}function Jt(i,t,e,n,s=.707){const r=1/s,o=t*.45;let a=0,c=0,l=0;const h=p=>{const M=Math.tan(Math.PI*Gn(p,10,o)/t);a=1/(1+M*(M+r)),c=M*a,l=M*c},u=typeof n=="function"?n:null;typeof n=="number"&&h(n);const f=e==="hp"||e==="notch"?1:0,d=e==="lp"?0:e==="bp"?r:-r,m=e==="lp"?1:e==="hp"?-1:0;let v=0,g=0;for(let p=0;p<i.length;p++){u&&(p&15)===0&&h(u(p/t));const M=i[p],E=M-g,_=a*v+c*E,T=g+c*v+l*E;v=2*_-v,g=2*T-g,i[p]=f*M+d*_+m*T}return i}function Ht(i,t,e){let n=e(0);for(let s=0;s<i.length;s+=4){const r=e((s+4)/t),o=Math.min(i.length,s+4);for(let a=s;a<o;a++)i[a]*=n+(r-n)*(a-s)*.25;n=r}return i}function Ps(i,t,e=.005){const n=Math.min(i.length,Math.round(e*t));for(let s=0;s<n;s++)i[i.length-1-s]*=.5-.5*Math.cos(Math.PI*s/n);return i}function vc(i){let t=0;for(let e=0;e<i.length;e++){const n=Math.abs(i[e]);n>t&&(t=n)}return t}function me(i,t=1){const e=vc(i);if(e>0)for(let n=0;n<i.length;n++)i[n]*=t/e;return i}const jt=(i,t)=>e=>e<=0?0:e<i?e/i:Math.exp(-(e-i)/t),je=(i,t,e)=>n=>n<=0?0:n<i?n/i:n<i+t?1:Math.exp(-(n-i-t)/e),Fe=(i,t,e)=>n=>{if(n<=0||n>=t)return 0;const s=n<i?.5-.5*Math.cos(Math.PI*n/i):1,r=n>t-e?.5-.5*Math.cos(Math.PI*(t-n)/e):1;return s*r};function _c(i,t){return i<t?(i/=t,i+i-i*i-1):i>1-t?(i=(i-1)/t,i*i+i+i+1):0}function Np(i,t,e){let n=i<e?1:-1;return n+=_c(i,t),n-=_c((i+1-e)%1,t),n-(2*e-1)}function vi(i,t,e,n="sine",s=.5){const r=i.sr,o=i.buf(t),a=typeof e=="function"?e:null;let c=Gn((typeof e=="number"?e:0)/r,0,.45),l=0;for(let h=0;h<o.length;h++)a&&(h&3)===0&&(c=Gn(a(h/r)/r,0,.45)),o[h]=n==="sine"?Math.sin(ri*l):n==="saw"?2*l-1-_c(l,c):Np(l,c,s),l+=c,l>=1&&(l-=1);return o}function on(i,t,e,n,s,r){if(!(n>0)||n>=t*.47||s===0)return;const o=Math.max(0,Math.round(e*t)),a=ri*n/t,c=Math.exp(-1/(r*t)),l=2*c*Math.cos(a),h=c*c;let u=0,f=-s*Math.sin(a)/c;const d=Math.min(i.length,o+Math.ceil(r*t*9));for(let m=o;m<d;m++){i[m]+=u;const v=l*u-h*f;f=u,u=v}}function Uu(i,t,e,n=2){const s=i.sr,r=i.buf(t),o=typeof e=="function"?e:null;let a=(typeof e=="number"?e:0)/s;const c=Math.max(1,Math.round(8e-4*s));let l=0,h=0;for(let u=0;u<r.length;u++)o&&(u&15)===0&&(a=o(u/s)/s),l>0?(r[u]=h*(i.r()*2-1),l--):i.r()<a&&(l=Math.floor(i.r()*c),h=Math.pow(i.r(),n),r[u]=h*i.sign());return r}function qn(i,t,e){const n=i.buf(t),s=i.sr/e;let r=i.r(),o=i.r(),a=0;for(let c=0;c<n.length;c++)a>=s&&(a-=s,r=o,o=i.r()),n[c]=r+(o-r)*(.5-.5*Math.cos(Math.PI*a/s)),a++;return n}function ob(i,t,e,n,s){const r=i.buf(t),o=Math.max(2,Math.round(i.sr/e-.5)),a=new Float32Array(o);let c=0;for(let u=0;u<o;u++)c+=s*(i.r()*2-1-c),a[u]=c;let l=0,h=0;for(let u=0;u<r.length;u++){const f=a[l],d=n*.5*(f+h);h=f,a[l]=d,r[u]=d,l=l+1===o?0:l+1}return me(r)}function _n(i,t,e){const n=i.sr,s=i.buf(t),r=typeof e.f0=="function"?e.f0:null,o=typeof e.f0=="number"?e.f0:0,a=e.q??[6,8,10],c=e.gains??[1,.6,.3],l=e.duty??0,h=e.vib??0,u=e.vibDepth??0,f=e.jitter??0,d=e.breath??0,m=e.growl??0,v=e.dry??0,g=[1/a[0],1/a[1],1/a[2]],p=[0,0,0],M=[0,0,0],E=[0,0,0],_=[0,0,0],T=[0,0,0],w=1-Math.exp(-ri*18*4/n),b=1/Math.sqrt(w/(2-w)),C=1-Math.exp(-ri*700/n);let x=i.r(),y=0,R=0,P=0,N=0;for(let B=0;B<s.length;B++){const X=B/n;if((B&31)===0){const G=e.formants(X);for(let Z=0;Z<3;Z++){const rt=Math.tan(Math.PI*Gn(G[Z],50,n*.45)/n);p[Z]=1/(1+rt*(rt+g[Z])),M[Z]=rt*p[Z],E[Z]=rt*M[Z]}}if((B&3)===0){R+=w*(i.r()*2-1-R);const G=(r?r(X):o)*(1+u*Math.sin(ri*h*X)+f*R*b);N=Gn(G/n,0,.45)}let V=l>0?Np(x,N,l):2*x-1-_c(x,N);m>0&&(V*=1-m*(.5+.5*Math.cos(Math.PI*(x+y)))),x+=N,x>=1&&(x-=1,y^=1),V+=d*(i.r()*2-1);let K=0;for(let G=0;G<3;G++){const Z=V-T[G],rt=p[G]*_[G]+M[G]*Z,yt=T[G]+M[G]*_[G]+E[G]*Z;_[G]=2*rt-_[G],T[G]=2*yt-T[G],K+=c[G]*g[G]*rt}v>0&&(P+=C*(V-P),K+=v*P),s[B]=K}return me(s)}function zn(i){return t=>{if(t<=i[0][0])return i[0][1];for(let e=1;e<i.length;e++){const[n,s]=i[e];if(t<=n){const[r,o]=i[e-1],a=(t-r)/(n-r||1);return[o[0]+(s[0]-o[0])*a,o[1]+(s[1]-o[1])*a,o[2]+(s[2]-o[2])*a]}}return i[i.length-1][1]}}const xe={a:[730,1090,2440],o:[570,840,2410],u:[300,870,2240],U:[440,1020,2240],uh:[640,1190,2390],e:[530,1840,2480]};function Je(i,t,e,n){const s=i.white(n*8+.002);return Jt(s,i.sr,"bp",t,e),me(Ps(Ht(s,i.sr,jt(4e-4,n)),i.sr,.001))}function le(i,t,e,...n){const s=i.white(t);for(const[r,o,a]of n)Jt(s,i.sr,r,o,a);return me(Ps(Ht(s,i.sr,e),i.sr))}function sn(i,t,e,n,s,r,o=2){const a=Uu(i,t,e,o);return Jt(a,i.sr,"bp",n,s),me(Ps(Ht(a,i.sr,r),i.sr))}function An(i,t,e,n){const s=vi(i,n*7,r=>e+(t-e)*Math.exp(-r/(n*.5)));return me(Ps(Ht(s,i.sr,jt(.002,n)),i.sr))}function zi(i,t,e,n,s,r,o=1){const a=[1,i.u(1.9,2.2),i.u(3.1,3.6),i.u(4.8,5.6)],c=[1,.55*o,.32*o,.16*o],l=[1,.6,.38,.24];for(let h=0;h<4;h++)on(t,i.sr,e,n*a[h],s*c[h],r*l[h])}function xc(i,t,e,n,s,r){const o=[1,2.76*i.u(.98,1.02),5.4*i.u(.97,1.03),8.93*i.u(.96,1.04)],a=[1,.6,.35,.2],c=[1,.75,.5,.32];for(let l=0;l<4;l++)on(t,i.sr,e,n*o[l],s*a[l],r*c[l]);on(t,i.sr,e,n*1.004,s*.5,r*1.2)}function ab(i,t,e,n,s,r){const o=[[1,1,1],[2,.45,.6],[3.01,.22,.4],[4.17,.12,.25],[5.43,.06,.15]];for(const[a,c,l]of o)on(t,i.sr,e,n*a,s*c,r*l);on(t,i.sr,e,n*1.003,s*.4,r*1.1)}function ka(i,t,e,n,s,r){const o=r*6,a=vi(i,o,c=>n*(1+2.5*c/o));i.mix(t,Ps(Ht(a,i.sr,jt(.001,r)),i.sr),e,s)}function Na(i,t,e,n,s){const r=i.sr,o=i.buf(t);let a=0;for(let h=0;h<o.length;h++)a+=e*(1+(n-1)*h/o.length)*(.85+.3*i.r())/r,a>=1&&(a-=1,o[h]=.5+.5*i.r());const c=new Float32Array(o.length);for(const h of s)i.mix(c,Jt(o.slice(),r,"bp",h*i.u(.9,1.1),10));const l=qn(i,t,9);for(let h=0;h<c.length;h++)c[h]*=.45+.55*l[h];return me(Ht(c,r,Fe(.03,t,.08)))}function Dl(i,t,e,n,s=1){i.mix(t,Je(i,i.u(2200,3600)*s,1.3,.0012),e,n*.7),on(t,i.sr,e,i.u(700,1300)*s,n*.5,i.u(.008,.018)),on(t,i.sr,e,i.u(1800,2800)*s,n*.3,i.u(.004,.01))}function Pl(i,t,e,n,s){const r=i.sr,o=typeof e=="function"?e:()=>e,a=typeof n=="function"?n:()=>n,c=me(Jt(i.white(t),r,"bp",a,2.5)),l=me(Jt(i.white(t),r,"bp",v=>.3*a(v),2)),h=me(Jt(i.white(t),r,"hp",4500,.7)),u=qn(i,t,25),f=i.buf(t);let d=0,m=0;for(let v=0;v<f.length;v++){(v&15)===0&&(m=o(v/r)/r),d+=m,d>=1&&(d-=1);const g=Math.sin(ri*d),p=g>0?g*g*g:0;f[v]=(c[v]+.6*l[v])*p*(.4+.6*u[v])+.22*h[v]}return Ht(f,r,s),i.mix(f,sn(i,t,70,2500,3,s,2),0,.35),me(f)}const cb=["stone","wood","gravel","grass","sand","glass","wool","snow","metal"],lb=["break","hit","step","place"];function hb(i,t,e){const n=i.sr,s=e==="break",r=e==="place",o=e==="step",a=s?1:r?.6:o?.25:.3,c=e==="hit"?.7:1,l=s?.34:r?.22:o?.16:.13,h=.04+.24*Math.pow(a,1.5),u=i.buf(l+(t==="metal"?.1+h:t==="glass"&&s?.2:0));switch(t){case"stone":{i.mix(u,Je(i,2600*c*i.u(.85,1.15),.9,.003),0,o?.45:.9),i.mix(u,le(i,.15,jt(8e-4,.012+.025*a),["bp",i.u(650,950)*c,1.8]),0,.8);const d=sn(i,l,m=>3500*Math.exp(-m/(.02+.07*a)),i.u(1300,2200)*c,.9,jt(.001,.02+.07*a));if(i.mix(u,d,.002,s?1:.7),(s||r)&&i.mix(u,An(i,170,70,.03),0,.3),s)for(let m=0;m<7;m++)i.mix(u,Je(i,i.u(1800,4200),1.4,.0015),i.u(.05,.26),i.u(.1,.35));break}case"wood":{const f=i.u(190,300)*c;if(zi(i,u,0,f,1,.016+.022*a,o?.6:1),i.mix(u,Je(i,i.u(1500,2500)*c,1,.0025),0,o?.25:.6),i.mix(u,le(i,.2,jt(.001,.015+.03*a),["bp",f*i.u(1.3,1.8),4]),0,.7),s||r){const d=sn(i,l,m=>900*Math.exp(-m/.08),i.u(1800,3e3),1.2,jt(.002,.03+.06*a));i.mix(u,d,.004,s?.6:.35)}s&&zi(i,u,i.u(.06,.1),f*i.u(1.2,1.5),.45,.025);break}case"gravel":{const f=je(o?.008:.003,.01+.03*a,.03+.08*a),d=qn(i,l,45),m=g=>(s?1800:1300)*(.15+1.7*d[Math.min(d.length-1,Math.round(g*n))]);i.mix(u,sn(i,l,m,i.u(900,1400)*c,.9,f,1.4),0,1),i.mix(u,sn(i,l,500,i.u(2200,3200)*c,1.2,f,2),0,.4);const v=Math.round(4+8*a);for(let g=0;g<v;g++){const p=l*.8*Math.pow(i.r(),1.5);i.mix(u,Je(i,i.u(1200,3500)*c,1.6,.0015),p,i.u(.2,.6)*f(p))}i.mix(u,le(i,l,f,["lp",600*c],["hp",100]),0,.35),(s||r)&&i.mix(u,An(i,140,70,.03),0,.3);break}case"sand":{const f=je(o?.025:.014,.015+.05*a,.04+.08*a),d=sn(i,l,7e3,i.u(3e3,4200)*c,.5,f,1.1);i.mix(u,Jt(d,n,"hp",1500*c),0,1),i.mix(u,le(i,l,f,["bp",i.u(2200,3e3)*c,.7],["hp",900]),0,.6),i.mix(u,le(i,l,f,["lp",300]),0,.12);break}case"grass":{const f=je(o?.022:.014,.02+.05*a,.04+.07*a),d=i.white(l),m=qn(i,l,70);for(let v=0;v<d.length;v++)d[v]*=.15+.85*m[v]*m[v]*m[v];Jt(d,n,"bp",i.u(2e3,2800)*c,.8),Jt(d,n,"hp",600*c),i.mix(u,me(Ps(Ht(d,n,f),n)),0,1),i.mix(u,sn(i,l,350,i.u(3500,5e3)*c,1.5,f,2.5),0,.5),i.mix(u,le(i,l,jt(.004,.01+.04*a),["lp",300]),0,.45);break}case"glass":{if(s){i.mix(u,le(i,.25,jt(5e-4,.05),["hp",2500]),0,.8),i.mix(u,Je(i,3500,1,.003),0,.6);for(let f=0;f<36;f++){const d=.34*Math.pow(i.r(),1.7);on(u,n,d,i.u(2200,8500),i.u(.05,.35)*Math.exp(-d/.25),i.u(.015,.07))}i.mix(u,sn(i,.4,f=>800*Math.exp(-f/.1),5e3,.8,jt(.001,.1)),.01,.4)}else{i.mix(u,Je(i,i.u(3e3,4500)*c,1.2,o?.004:.003),0,.8),i.mix(u,le(i,.1,jt(.001,.012+.02*a),["bp",i.u(900,1300)*c,2]),0,.5);const f=r?3:2;for(let d=0;d<f;d++)on(u,n,i.u(0,.01),i.u(2500,6e3)*c,i.u(.1,.25),i.u(.015,.035)*(.5+a))}break}case"wool":{const f=je(o?.012:.008,.01+.03*a,.03+.06*a);i.mix(u,le(i,l,f,["lp",i.u(380,600)*c],["hp",60]),0,1),i.mix(u,le(i,l,f,["bp",i.u(1200,1800)*c,.8]),0,.12);break}case"snow":{const f=je(o?.012:.006,.02+.04*a,.03+.07*a);i.mix(u,le(i,l,f,["lp",i.u(500,800)*c],["hp",60]),0,.8),i.mix(u,sn(i,l,1400,i.u(1e3,1600)*c,1.1,f,1.8),0,.6),i.mix(u,sn(i,l,500,i.u(2200,3e3)*c,1.4,f,2.5),0,.2);break}case"metal":{const f=i.u(650,1100)*c*(o?1.4:1);i.mix(u,Je(i,i.u(2500,3500)*c,.9,.0025),0,.8),i.mix(u,le(i,.1,jt(8e-4,.015+.02*a),["bp",i.u(1200,1800)*c,1.5]),0,.6),xc(i,u,.001,f,s||r?.5:.35,h),s&&(xc(i,u,i.u(.05,.09),f*i.u(1.3,1.6),.2,.1),i.mix(u,sn(i,.2,d=>2e3*Math.exp(-d/.05),2500,1,jt(.001,.05)),.003,.4));break}}return o&&Jt(u,n,"lp",4500,.7),u}function xs(i,t,e,n,s,r=2500){const o=i.buf(t.length/i.sr+e*s);i.mix(o,t);let a=t;for(let c=1;c<=s;c++)a=Jt(a.slice(),i.sr,"lp",r/c,.6),i.mix(o,a,e*c,Math.pow(n,c));return o}function Sd(i,t,e){const n=Math.max(0,Math.min(.9999,i/t))*e;return[Math.floor(n),n%1]}function ub(i,t){const e=i.sr,n=Math.max(3,Math.round(t*i.u(4,6))),s=[];for(let u=0;u<=n;u++)s.push([u/n*t,i.pick([xe.a,xe.o,xe.u,xe.e,xe.uh,xe.U])]);const r=zn(s),o=i.white(t),a=i.buf(t),c=[1,.7,.45];for(let u=0;u<3;u++)i.mix(a,Jt(o.slice(),e,"bp",f=>r(f)[u]*1.1,7+u*2),0,c[u]);const l=Array.from({length:n},()=>[i.u(.35,1),i.r()<.35?1:0]);Ht(a,e,u=>{const[f,d]=Sd(u,t,n);return Math.pow(Math.sin(Math.PI*d),1.5)*l[f][0]});const h=Jt(i.white(t),e,"hp",4200,.8);return Ht(h,e,u=>{const[f,d]=Sd(u,t,n);return l[f][1]&&d<.4?Math.sin(Math.PI*d/.4)*.8:.03}),i.mix(a,h,0,.35),Ht(me(a),e,Fe(.12,t,.3))}function fb(i){const e=i.buf(2.6),n=i.u(48,58);for(const r of[1,1.0595,1.4142,1.498,2]){const o=n*r*i.u(.995,1.005);i.mix(e,vi(i,2.6,a=>o*(1-.06*a),"saw"),0,r===1?.5:.32)}Jt(e,i.sr,"lp",r=>180+2600*Math.exp(-r*2.2),1.2);const s=i.u(1300,1700);for(const r of[s,s*1.06]){const o=vi(i,1.6,a=>r*(1+.02*Math.sin(ri*7*a)),"saw");Jt(o,i.sr,"bp",r*1.5,3),i.mix(e,Ht(me(o),i.sr,jt(.01,.45)),.02,.25)}return i.mix(e,le(i,.4,jt(.002,.08),["bp",2200,.8]),0,.5),i.mix(e,An(i,120,35,.25),0,.9),Ht(me(e),i.sr,je(.01,.4,.7))}function db(i){const t=i.sr;switch(Math.floor(i.r()*5)){case 0:{const e=i.u(3.5,5),n=i.u(80,120),s=_n(i,e,{f0:r=>n*(1.05-.35*r/e),formants:zn([[0,xe.o],[e*.6,xe.u],[e,xe.U]]),vib:3,vibDepth:.02,jitter:.04,breath:.4,growl:.4,dry:.4,q:[4,6,8]});return Jt(s,t,"lp",1200,.7),xs(i,Ht(s,t,Fe(.8,e,1.5)),.31,.45,4,1500)}case 1:{const e=i.u(4,6),n=i.buf(e),s=i.u(55,90);for(const r of[1,1.5*i.u(.99,1.01),2.01,2.67]){const o=i.u(-.12,.08);i.mix(n,vi(i,e,a=>s*r*(1+o*a/e)),0,1/r)}return xs(i,Ht(me(n),t,Fe(1.2,e,1.8)),.4,.4,3,900)}case 2:{const e=i.u(2.5,3.5),n=Uu(i,e,s=>300+2500*Math.abs(Math.sin(s*3.1)),1.5);return Jt(n,t,"bp",s=>500+400*Math.sin(s*2.3),2.5),Jt(n,t,"lp",2200,.7),xs(i,Ht(me(n),t,Fe(.3,e,.8)),.27,.4,3,1800)}case 3:{const e=i.u(4,6),n=i.pink(e),s=i.u(350,700);return Jt(n,t,"bp",r=>s*(1+.35*Math.sin(r*1.3+1)+.15*Math.sin(r*3.7)),14),Ht(me(n),t,Fe(1.3,e,1.6))}default:{const e=i.u(3,4.5),n=i.brown(e);Jt(n,t,"lp",160,.8),me(n,.6);for(let s=i.u(.3,.8);s<e-.6;s+=i.u(.5,1.2))i.mix(n,An(i,i.u(60,90),30,.18),s,i.u(.3,.6));return xs(i,Ht(n,t,Fe(.6,e,1)),.35,.35,3,600)}}}const Pt=(i,t,e={})=>({gen:t,gain:i,vars:e.vars??3,jitter:e.jitter??.06,drive:e.drive??0,rate:e.rate??1}),pb={pop:Pt(.4,i=>{const t=i.u(380,520),e=t*i.u(2.4,3),n=r=>e-(e-t)*Math.exp(-r/.012),s=Ht(vi(i,.11,n),i.sr,jt(.002,.028));return i.mix(s,Ht(vi(i,.11,r=>2*n(r)),i.sr,jt(.002,.012)),0,.25)},{vars:3,jitter:.2,rate:.5}),click:Pt(.5,i=>{const t=i.buf(.06);return i.mix(t,Je(i,i.u(2600,3200),1.2,.0015)),on(t,i.sr,0,i.u(1500,1800),.5,.006),on(t,i.sr,.012,i.u(2200,2600),.25,.004),t},{vars:2,jitter:.02}),hurt:Pt(.8,i=>{const t=i.u(.9,1.1),e=_n(i,.3,{f0:n=>(150-50*Math.min(1,n/.2))*t,formants:zn([[0,xe.U],[.08,xe.uh],[.25,xe.o]]),jitter:.02,breath:.15,growl:.15,dry:.3});return Ht(e,i.sr,je(.012,.07,.06)),i.mix(e,An(i,140,70,.03),0,.35)},{rate:.5}),death:Pt(.85,i=>{const t=i.u(.9,1.1),e=_n(i,.55,{f0:n=>(140-75*Math.min(1,n/.45))*t,formants:zn([[0,xe.U],[.12,xe.uh],[.3,xe.o],[.5,xe.u]]),jitter:.03,breath:.15,growl:.25,dry:.3});return Ht(e,i.sr,je(.015,.12,.12)),i.mix(e,An(i,120,50,.05),0,.4)},{vars:2,jitter:.04,rate:.5}),eat:Pt(.55,i=>{const t=i.buf(.38),e=i.r()<.5?2:3,n=i.u(.1,.13);for(let s=0;s<e;s++){const r=je(.004,.015,.025),o=s===0?1:i.u(.55,.85);i.mix(t,sn(i,.1,2200,i.u(1600,2600),.9,r,1.5),s*n,o),i.mix(t,le(i,.1,r,["lp",500]),s*n,.35*o)}return t},{vars:4,jitter:.1}),burp:Pt(.6,i=>{const t=i.u(.4,.55),e=i.u(70,95),n=_n(i,t,{f0:r=>e*(1+.25*Math.sin(Math.PI*r/t)),formants:zn([[0,xe.o],[t*.5,xe.uh],[t,xe.U]]),jitter:.12,breath:.05,growl:.5,dry:.4}),s=qn(i,t,35);for(let r=0;r<n.length;r++)n[r]*=.5+.5*s[r];return Ht(n,i.sr,Fe(.02,t,.12))},{vars:2,jitter:.08,rate:.5}),attack:Pt(.45,i=>{const t=i.u(.22,.28),e=i.u(400,600),n=i.u(1800,2600),r=le(i,t,o=>Math.pow(Math.sin(Math.PI*Math.min(1,o/t)),2),["bp",o=>e+(n-e)*Math.sin(Math.PI*Math.min(1,o/t)),1.4]);return i.mix(r,le(i,t,Fe(t*.4,t,t*.5),["lp",500]),0,.3)},{vars:3,jitter:.08,rate:.5}),strong_hit:Pt(.8,i=>{const t=i.buf(.45);return i.mix(t,An(i,i.u(150,190),50,.07)),i.mix(t,le(i,.15,jt(.001,.03),["bp",i.u(900,1400),1]),0,.7),i.mix(t,Je(i,3e3,.7,.003),0,.5),t},{vars:3,jitter:.06,drive:1.5,rate:.5}),bow_shoot:Pt(.65,i=>{const t=i.buf(.5);i.mix(t,Ht(ob(i,.5,i.u(180,240),.992,.6),i.sr,jt(.001,.12)),0,.8);const e=le(i,.3,n=>Math.pow(Math.sin(Math.PI*Math.min(1,n/.3)),2),["bp",n=>900+2500*n/.3,1.2]);return i.mix(t,e,.01,.45),i.mix(t,Je(i,2e3,1,.002),0,.3)},{vars:3,jitter:.08,rate:.5}),arrow_hit:Pt(.6,i=>{const t=i.buf(.25);zi(i,t,0,i.u(260,340),1,.035,.8),i.mix(t,Je(i,1800,1,.002),0,.5),i.mix(t,An(i,150,90,.025),0,.5);const e=vi(i,.2,i.u(130,170));return Ht(e,i.sr,n=>Math.exp(-n/.05)*(.6+.4*Math.sin(ri*30*n))),i.mix(t,e,.004,.25)},{vars:3,jitter:.08,rate:.5}),explode:Pt(1,i=>{const e=i.buf(2);i.mix(e,le(i,.4,jt(8e-4,.04),["lp",6e3]),0,.9);const n=i.brown(2);Jt(n,i.sr,"lp",o=>120+900*Math.exp(-o/.15),.8),i.mix(e,me(Ht(n,i.sr,jt(.004,.45))),0,1),i.mix(e,An(i,75,32,.28),0,.9);const s=i.white(2);Jt(s,i.sr,"lp",260,.7);const r=qn(i,2,12);for(let o=0;o<s.length;o++)s[o]*=.3+.7*r[o];return i.mix(e,me(Ht(s,i.sr,jt(.05,.6))),0,.6),i.mix(e,sn(i,1,o=>400*Math.exp(-o/.25),1800,.8,jt(.01,.3),2.5),.03,.35)},{vars:3,jitter:.08,drive:2,rate:.5}),fuse:Pt(.6,i=>{const e=i.white(1.5);Jt(e,i.sr,"hp",2500,.7),Jt(e,i.sr,"bp",i.u(5e3,6500),.5);const n=qn(i,1.5,18);for(let s=0;s<e.length;s++)e[s]*=.7+.3*n[s];return me(e),i.mix(e,sn(i,1.5,60,4e3,1,()=>1,2),0,.5),Ht(e,i.sr,Fe(.04,1.5,.15))},{vars:2,jitter:.04}),splash:Pt(.7,i=>{const e=i.buf(.85);i.mix(e,le(i,.2,jt(.002,.04),["lp",500]),0,.6);const n=i.white(.85),s=qn(i,.85,40);for(let r=0;r<n.length;r++)n[r]*=.3+.7*s[r];Jt(n,i.sr,"bp",r=>1500+2500*Math.exp(-r/.2),.7),i.mix(e,me(Ht(n,i.sr,jt(.006,.17))));for(let r=0;r<12;r++){const o=.04+.5*Math.pow(i.r(),1.5);ka(i,e,o,i.u(400,1300),i.u(.1,.3)*Math.exp(-o/.3),i.u(.015,.035))}return e},{vars:3,jitter:.08,rate:.5}),swim:Pt(.4,i=>{const t=i.u(.45,.6),e=i.buf(t),n=i.white(t),s=qn(i,t,25);for(let r=0;r<n.length;r++)n[r]*=.3+.7*s[r];Jt(n,i.sr,"bp",r=>1100+700*r/t,.6),i.mix(e,me(Ht(n,i.sr,je(.05,.08,.12))));for(let r=0;r<4;r++)ka(i,e,i.u(.05,t*.6),i.u(350,900),i.u(.1,.25),i.u(.015,.03));return e},{vars:4,jitter:.1,rate:.5}),fizz:Pt(.5,i=>{const e=le(i,.7,jt(.004,.22),["hp",i.u(3e3,4e3)]);return i.mix(e,sn(i,.7,n=>900*Math.exp(-n/.25),6e3,.7,jt(.002,.25),2),0,.6)},{vars:3,jitter:.1}),lava_pop:Pt(.45,i=>{const t=i.u(110,160),e=Ht(vi(i,.25,n=>t*(1+2.2*Math.min(1,n/.05))),i.sr,jt(.003,.035));return i.mix(e,le(i,.05,jt(.001,.01),["bp",1200,1.2]),.01,.3)},{vars:4,jitter:.12,rate:.5}),door_open:Pt(.6,i=>{const t=i.buf(.5);return i.mix(t,Je(i,3200,2,.002),0,.5),on(t,i.sr,0,2400,.15,.01),i.mix(t,Na(i,.36,i.u(45,70),i.u(1.2,1.6),[400,950,1700]),.04,1),zi(i,t,.38,i.u(220,280),.25,.03),t},{rate:.5}),door_close:Pt(.65,i=>{const t=i.buf(.35);return i.mix(t,Na(i,.1,i.u(60,80),.8,[450,1e3,1800]),0,.35),zi(i,t,.07,i.u(150,200),1,.05),i.mix(t,le(i,.2,jt(.001,.03),["lp",400]),.07,.4),i.mix(t,Je(i,3e3,2,.002),.075,.4)},{rate:.5}),chest_open:Pt(.6,i=>{const t=i.buf(.65);return zi(i,t,0,i.u(160,210),.35,.03),i.mix(t,Na(i,.55,i.u(28,40),i.u(1.3,1.7),[300,700,1300]),.03,1)},{vars:3,jitter:.05,rate:.5}),chest_close:Pt(.65,i=>{const t=i.buf(.4);return i.mix(t,Na(i,.12,i.u(40,55),.8,[320,750,1400]),0,.3),zi(i,t,.1,i.u(120,160),1,.06),i.mix(t,le(i,.25,jt(.001,.04),["lp",350]),.1,.6),i.mix(t,Je(i,2500,1.5,.002),.105,.3)},{vars:3,jitter:.05,rate:.5}),tool_break:Pt(.75,i=>{const t=i.buf(.45);i.mix(t,le(i,.1,jt(5e-4,.012),["hp",1500])),xc(i,t,0,i.u(1800,2600),.45,.12);const e=i.u(.08,.14);return xc(i,t,e,i.u(2800,3800),.2,.05),i.mix(t,Je(i,4e3,1.5,.002),e,.3)}),shear:Pt(.55,i=>{const t=i.buf(.3),e=i.u(.08,.11);for(let n=0;n<2;n++){const s=n*e;i.mix(t,le(i,.06,je(.004,.01,.012),["bp",i.u(3500,5e3),1.5]),s,.8-.2*n),on(t,i.sr,s+.012,i.u(4500,6500),.25,.025),i.mix(t,Je(i,6e3,2,.0015),s+.014,.4)}return t},{vars:3,jitter:.08}),flint_and_steel:Pt(.6,i=>{const t=i.buf(.4),e=i.white(.14),n=qn(i,.14,120);for(let s=0;s<e.length;s++)e[s]*=.4+.6*n[s];return Jt(e,i.sr,"bp",s=>2500+3e3*s/.14,2),i.mix(t,me(Ht(e,i.sr,Fe(.01,.14,.03)))),i.mix(t,sn(i,.25,s=>160*Math.exp(-s/.08),6500,1.5,jt(.001,.08),2.5),.1,.7),i.mix(t,le(i,.25,Fe(.05,.25,.15),["lp",900]),.12,.25)},{vars:3,jitter:.08}),bucket_fill:Pt(.6,i=>{const e=i.buf(.65),n=i.white(.65),s=qn(i,.65,14);for(let o=0;o<n.length;o++)n[o]*=s[o]*s[o];Jt(n,i.sr,"lp",900),Jt(n,i.sr,"hp",150),i.mix(e,me(Ht(n,i.sr,Fe(.03,.65,.2))),0,.5);const r=7+Math.floor(i.r()*3);for(let o=0;o<r;o++){const a=.03+o*.5/r+i.u(-.01,.01);ka(i,e,a,(350+450*o/r)*i.u(.8,1.2),i.u(.3,.6),i.u(.02,.04))}return e},{rate:.5}),bucket_empty:Pt(.6,i=>{const e=i.buf(.7),n=i.white(.7),s=qn(i,.7,30);for(let o=0;o<n.length;o++)n[o]*=Math.pow(s[o],1.5);Jt(n,i.sr,"bp",1600,.6),Jt(n,i.sr,"lp",3e3),i.mix(e,me(Ht(n,i.sr,Fe(.02,.7,.3))),0,.8),i.mix(e,le(i,.2,jt(.003,.05),["lp",600]),.05,.4);const r=6;for(let o=0;o<r;o++)ka(i,e,.05+o*.08+i.u(0,.03),(900-500*o/r)*i.u(.85,1.15),i.u(.2,.45),i.u(.015,.03));return e},{rate:.5}),fall_small:Pt(.55,i=>{const t=i.buf(.32);return i.mix(t,An(i,i.u(110,130),50,.05)),i.mix(t,le(i,.15,jt(.002,.03),["lp",400]),0,.6),i.mix(t,Je(i,1500,.7,.002),0,.15)},{rate:.5}),fall_big:Pt(.8,i=>{const t=i.buf(.6);return i.mix(t,An(i,i.u(95,110),38,.09)),i.mix(t,le(i,.3,jt(.002,.06),["lp",600]),0,.7),i.mix(t,sn(i,.25,1500,1100,.8,jt(.002,.05),1.5),0,.45),i.mix(t,An(i,80,45,.04),i.u(.07,.1),.35)},{vars:3,jitter:.06,drive:1.2,rate:.5}),level_up:Pt(.55,i=>{const t=i.buf(1.4),e=76+i.pick([0,2,-2]);return[0,4,7,12].forEach((n,s)=>ab(i,t,s*.07,gc(e+n),s===3?.9:.55,s===3?.55:.25)),t},{vars:2,jitter:0,rate:.5}),zombie_say:Pt(.6,i=>{const t=i.u(.8,1.15),e=i.u(95,130),n=i.r()<.5,s=_n(i,t,{f0:r=>e*(n?1+.12*Math.sin(Math.PI*r/t):1.08-.2*r/t),formants:zn([[0,xe.U],[t*.35,xe.uh],[t*.75,xe.o],[t,xe.u]]),vib:i.u(4,6),vibDepth:.03,jitter:.05,breath:.12,growl:.35,dry:.3,q:[5,7,9]});return Ht(s,i.sr,Fe(.12,t,.3))},{vars:3,jitter:.1,rate:.5}),zombie_hurt:Pt(.75,i=>{const t=i.u(.3,.4),e=i.u(170,210),n=_n(i,t,{f0:s=>e*(1.1-.25*s/t),formants:zn([[0,xe.uh],[t,xe.U]]),jitter:.05,breath:.15,growl:.3,dry:.25,q:[5,7,9]});return Ht(n,i.sr,je(.015,t*.3,t*.2))},{vars:3,jitter:.1,rate:.5}),zombie_death:Pt(.75,i=>{const t=i.u(1.2,1.4),e=i.u(120,140),n=_n(i,t,{f0:s=>e*(1-.45*s/t),formants:zn([[0,xe.a],[t*.4,xe.o],[t,xe.u]]),vib:5,vibDepth:.03,jitter:.06,breath:.15,growl:.45,dry:.3,q:[5,7,9]});return Ht(n,i.sr,Fe(.04,t,t*.5))},{vars:2,jitter:.08,rate:.5}),skeleton_say:Pt(.6,i=>{const t=i.buf(.7),e=4+Math.floor(i.r()*5);let n=.002;for(let s=0;s<e;s++)Dl(i,t,n,i.u(.5,1)),n+=i.u(.03,.08);return t},{vars:3,jitter:.1,rate:.5}),skeleton_hurt:Pt(.75,i=>{const t=i.buf(.32);i.mix(t,le(i,.1,jt(5e-4,.01),["hp",2e3]),0,.6);const e=3+Math.floor(i.r()*3);let n=0;for(let s=0;s<e;s++)Dl(i,t,n,i.u(.6,1),1.2),n+=i.u(.018,.04);return t},{vars:3,jitter:.1,rate:.5}),skeleton_death:Pt(.75,i=>{const t=i.buf(1.2);let e=0,n=.025;for(let s=0;s<18&&e<1;s++)Dl(i,t,e,Math.exp(-e/.5)*i.u(.5,1),1-.3*e),e+=n*i.u(.6,1.4),n*=1.12;return zi(i,t,i.u(.15,.3),i.u(160,220),.5,.05),t},{vars:2,jitter:.06,rate:.5}),creeper_hurt:Pt(.75,i=>{const e=i.buf(.38);i.mix(e,le(i,.38,je(.004,.05,.08),["bp",i.u(2500,3500),.8]),0,.8),i.mix(e,sn(i,.38,n=>900*Math.exp(-n/.1),1800,1.2,jt(.002,.12),2),0,.6);for(let n=0;n<4;n++)i.mix(e,An(i,i.u(300,500),150,.01),i.u(0,.22),i.u(.3,.6));return e},{vars:3,jitter:.1,rate:.5}),creeper_death:Pt(.75,i=>{const e=i.buf(.95);i.mix(e,le(i,.95,jt(.01,.3),["bp",s=>4e3*Math.exp(-s/.5)+900,.9]),0,.8);const n=sn(i,.95,s=>700*Math.exp(-s/.3),s=>2500-1500*s/.95,1,jt(.005,.3),2);i.mix(e,n,0,.6);for(let s=0;s<7;s++){const r=s*.09+i.u(0,.05);i.mix(e,An(i,i.u(260,420)*(1-r*.6),100,.015),r,.5*Math.exp(-r/.5))}return i.mix(e,le(i,.4,jt(.01,.12),["lp",300]),i.u(.05,.12),.4)},{vars:2,jitter:.06,rate:.5}),spider_say:Pt(.6,i=>{const t=i.u(.55,.8),e=i.u(22,34);return Pl(i,t,e,n=>3200+800*Math.sin(ri*3*n),Fe(.04,t,.15))},{vars:3,jitter:.1}),spider_hurt:Pt(.75,i=>{const t=i.u(.22,.3);return Pl(i,t,i.u(36,46),i.u(3800,4600),je(.005,t*.3,t*.2))},{vars:3,jitter:.1}),spider_death:Pt(.75,i=>{const t=i.u(1,1.2);return Pl(i,t,e=>30-18*e/t,e=>3500-2e3*e/t,jt(.02,.4))},{vars:2,jitter:.06}),pig_say:Pt(.6,i=>{const t=i.buf(.75),e=i.pick([1,2,2,2,3]);let n=0;for(let s=0;s<e;s++){const r=i.u(.13,.2),o=i.u(150,230),a=_n(i,r,{f0:c=>o*(1+.35*Math.sin(Math.PI*c/r)),formants:zn([[0,[300,1100,2300]],[r*.4,[520,1300,2500]],[r,[380,1700,2500]]]),duty:.3,jitter:.1,growl:.45,breath:.1,dry:.2,q:[4,6,7]});i.mix(t,Ht(a,i.sr,je(.012,r*.4,r*.25)),n,s?.8:1),n+=r+i.u(.06,.1)}return t},{vars:3,jitter:.1,rate:.5}),pig_hurt:Pt(.75,i=>{const t=i.u(.24,.34),e=i.u(520,700),n=_n(i,t,{f0:s=>e*(1+.3*Math.sin(Math.PI*s/t)),formants:()=>[900,2200,3200],vib:11,vibDepth:.03,duty:.35,jitter:.06,breath:.12,growl:.2,q:[5,7,8]});return Ht(n,i.sr,je(.01,t*.5,t*.2))},{vars:3,jitter:.1,rate:.5}),cow_say:Pt(.6,i=>{const t=i.u(.85,1.15),e=i.u(98,120),n=_n(i,t,{f0:s=>{const r=s/t;return e*(1+.2*Math.sin(Math.PI*Math.min(1,r/.75))-(r>.75?.3*(r-.75):0))},formants:zn([[0,[260,650,2200]],[.12,[320,760,2300]],[t*.55,[560,900,2400]],[t,[420,780,2300]]]),vib:3.5,vibDepth:.012,jitter:.03,breath:.05,growl:.12,dry:.6,q:[4,6,8]});return Jt(n,i.sr,"lp",s=>350+3500*Math.min(1,s/.25),.7),Ht(n,i.sr,Fe(.08,t,.3))},{vars:3,jitter:.08,rate:.5}),cow_hurt:Pt(.75,i=>{const t=i.u(.28,.36),e=i.u(160,190),n=_n(i,t,{f0:s=>e*(1+.15*Math.sin(Math.PI*s/t)),formants:zn([[0,[300,700,2200]],[t*.4,[600,950,2400]],[t,[450,800,2300]]]),jitter:.04,breath:.08,growl:.2,dry:.5,q:[4,6,8]});return Jt(n,i.sr,"lp",s=>500+3500*Math.min(1,s/.06),.7),Ht(n,i.sr,je(.015,t*.4,t*.2))},{vars:3,jitter:.08,rate:.5}),sheep_say:Pt(.6,i=>{const t=i.u(.6,.85),e=i.u(270,340),n=i.u(7,9.5),s=_n(i,t,{f0:r=>e*(1+.05*Math.sin(Math.PI*r/t)),formants:zn([[0,[400,1100,2600]],[.05,[850,1500,2800]],[t,[700,1750,2750]]]),vib:n,vibDepth:.045,jitter:.03,breath:.12,duty:.4,q:[5,7,9]});return Ht(s,i.sr,r=>1-.4*(.5+.5*Math.sin(ri*n*r))),Ht(s,i.sr,Fe(.03,t,.2))},{vars:3,jitter:.08,rate:.5}),sheep_hurt:Pt(.75,i=>{const t=i.u(.26,.34),e=i.u(380,450),n=i.u(10,12),s=_n(i,t,{f0:r=>e*(1.05-.1*r/t),formants:zn([[0,[450,1200,2700]],[.03,[900,1600,2900]],[t,[800,1800,2800]]]),vib:n,vibDepth:.05,jitter:.04,breath:.15,duty:.4,q:[5,7,9]});return Ht(s,i.sr,r=>1-.35*(.5+.5*Math.sin(ri*n*r))),Ht(s,i.sr,je(.01,t*.4,t*.2))},{vars:3,jitter:.08,rate:.5}),chicken_say:Pt(.55,i=>{const t=i.buf(.8),e=2+Math.floor(i.r()*3);let n=0;for(let s=0;s<e;s++){const r=i.u(.04,.07),o=i.u(600,900),a=_n(i,r,{f0:c=>o*(1+.5*Math.sin(Math.PI*c/r)),formants:()=>[950,1900,3e3],duty:.3,jitter:.05,breath:.1,q:[3,5,6]});i.mix(t,Ht(a,i.sr,je(.004,r*.35,r*.3)),n,i.u(.6,1)),n+=r+i.u(.05,.12)}return t},{vars:3,jitter:.1,rate:.5}),chicken_hurt:Pt(.7,i=>{const t=i.u(.16,.22),e=i.u(1e3,1300),n=_n(i,t,{f0:s=>e*(1-.35*s/t),formants:()=>[1100,2300,3400],duty:.25,jitter:.08,breath:.25,growl:.4,q:[3,5,6]});return Ht(n,i.sr,je(.005,t*.35,t*.25))},{vars:3,jitter:.1,rate:.5}),horror_sting:Pt(.9,i=>xs(i,fb(i),.23,.35,3),{vars:2,jitter:.02,drive:.6}),horror_heartbeat:Pt(.85,i=>{const t=i.buf(.75);return i.mix(t,An(i,i.u(70,85),38,.07),0,1),i.mix(t,An(i,i.u(60,72),34,.06),i.u(.2,.26),.7),Jt(t,i.sr,"lp",220,.7)},{vars:3,jitter:.03,rate:.5}),horror_whisper:Pt(.55,i=>xs(i,ub(i,i.u(1.4,2.4)),.12,.25,2,3500),{vars:4,jitter:.05}),horror_breath:Pt(.5,i=>{const t=i.u(.9,1.3),e=i.u(1.1,1.6),n=i.buf(t+e+.4);i.mix(n,le(i,t,Fe(.5,t,.25),["bp",r=>900+600*r/t,1.2],["hp",300]),0,.6),i.mix(n,le(i,e,Fe(.12,e,.7),["bp",r=>700-250*r/e,1],["hp",200]),t+.15,1);const s=_n(i,e,{f0:i.u(60,75),formants:()=>xe.uh,breath:2.5,growl:.6,q:[3,4,5]});return i.mix(n,Ht(s,i.sr,Fe(.2,e,.6)),t+.15,.25),n},{vars:2,jitter:.04,rate:.5}),horror_cave:Pt(.7,db,{vars:6,jitter:.05,rate:.5}),horror_static:Pt(.45,i=>{const t=i.u(.5,.9),e=i.white(t);Jt(e,i.sr,"bp",2600,.5),i.mix(e,Uu(i,t,900,1),0,1.5),i.mix(e,vi(i,t,50,"square"),0,.15);const n=Array.from({length:12},()=>i.r()<.75?i.u(.5,1):.05);return Ht(me(e),i.sr,s=>n[Math.min(11,Math.floor(s/t*12))]*Math.min(1,s/.01,Math.max(0,t-s)/.02))},{vars:2,jitter:.08}),horror_scream:Pt(.5,i=>{const t=i.u(1.4,2),e=i.u(330,420),n=_n(i,t,{f0:s=>e*(1+.35*Math.sin(Math.PI*Math.min(1,s/(t*.7))))*(s>t*.7?1-.3*(s-t*.7)/(t*.3):1),formants:zn([[0,xe.e],[t*.2,xe.a],[t,xe.a]]),vib:6,vibDepth:.04,jitter:.05,breath:.25,growl:.15,q:[6,8,10]});return Jt(n,i.sr,"lp",1700,.7),xs(i,Ht(n,i.sr,Fe(.08,t,.5)),.42,.45,4,1400)},{vars:2,jitter:.06}),horror_music_box:Pt(.4,i=>{const t=[0,2,3,5,7,8,11,12],e=72+Math.floor(i.u(0,5)),n=[0,4,2,4,5,4,2,1,0],s=i.buf(6.5);let r=.02;return n.forEach((o,a)=>{const c=gc(e+t[o])*(1-.004*a*a*i.u(.5,1));on(s,i.sr,r,c,.5,.6),on(s,i.sr,r,c*2.76,.12,.2),on(s,i.sr,r,c*5.4,.05,.08),r+=.28+.012*a*a}),xs(i,me(s),.21,.3,2,3e3)},{vars:2,jitter:.01}),horror_knock:Pt(.7,i=>{const t=i.buf(1.6),e=i.r()<.5?3:4;let n=.02;for(let s=0;s<e;s++)zi(i,t,n,i.u(110,150),1,.05,.8),i.mix(t,Je(i,1800,1.2,.002),n,.3),n+=i.u(.24,.34);return me(t)},{vars:2,jitter:.04}),horror_drone:Pt(.5,i=>{const e=i.buf(8),n=i.u(36,44);for(const[s,r]of[[1,1],[1.007,.8],[1.5,.35],[2.12,.25]])i.mix(e,vi(i,8,o=>n*s*(1+.01*Math.sin(o*.7*s)),"saw"),0,r);return Jt(e,i.sr,"lp",s=>220+140*Math.sin(s*.5),.9),Ht(me(e),i.sr,Fe(2.5,8,3))},{vars:2,jitter:0,rate:.5})},Ts={};for(const i of cb)for(const t of lb){const e=i==="wool"||i==="snow"?.85:1,n=(t==="break"?.8:t==="place"?.72:t==="hit"?.42:.3)*e;Ts[`${t}_${i}`]=Pt(n,s=>hb(s,i,t),{vars:t==="hit"||t==="step"?4:3,jitter:t==="step"?.05:.06,rate:e<1?.5:1})}Object.assign(Ts,pb);const Ed=Object.keys(Ts);function mb(i,t,e){const n=1-ri*20/t;let s=0,r=0;for(let M=0;M<i.length;M++){const E=i[M];r=E-s+n*r,s=E,i[M]=r}let o=vc(i);if(!(o>0))return i;if(e>0){const M=1/Math.tanh(e);for(let E=0;E<i.length;E++)i[E]=Math.tanh(e*i[E]/o)*M;o=1}let a=i.length;const c=o*.001;for(;a>1&&Math.abs(i[a-1])<c;)a--;const l=i.slice(0,Math.min(i.length,a+Math.round(.004*t))),h=Math.min(l.length,Math.round(5e-4*t));for(let M=0;M<h;M++)l[M]*=.5-.5*Math.cos(Math.PI*M/h);Ps(l,t,Math.max(.004,Math.min(.03,.1*l.length/t)));const u=Jt(l.slice(),t,"hp",90,.6),f=Jt(u.slice(),t,"hp",1800,.7),d=Math.max(1,Math.min(u.length,Math.round(.025*t)));let m=0,v=0;for(let M=0;M<u.length;M++){const E=u[M]+.55*f[M];if(m+=E*E,M>=d){const _=u[M-d]+.55*f[M-d];m-=_*_}m>v&&(v=m)}const g=Math.sqrt(v/d),p=Math.min(g>0?.25/g:1/0,.98/vc(l));for(let M=0;M<l.length;M++)l[M]*=p;return l}function gb(i,t=48e3){var s;const e=Math.min(Jh,t),n=((s=Ts[i])==null?void 0:s.rate)??1;return n<1?Math.max(16e3,Math.round(e*n)):e}function vb(i,t=0,e=48e3){const n=Ts[i];if(!n)throw new Error(`Unknown sound: ${i}`);const s=new Nu(e,rb(`${i}#${t}`));return mb(n.gen(s),e,n.drive)}function _b(i,t){const e=Math.round(t*i),n=Math.round(.3*i);return[0,1].map(s=>{const r=new Nu(i,1953+s),o=(e+n)/i,a=r.pink(o);Jt(a,i,"hp",350,.6);const c=Jt(a.slice(),i,"bp",2600,.5);Jt(a,i,"lp",5500,.6);const l=qn(r,o,.7),h=new Float32Array(e),u=m=>(a[m]+.6*c[m])*(.85+.3*l[m]);for(let m=0;m<e;m++)if(m<n){const v=m/n*Math.PI/2;h[m]=u(m)*Math.sin(v)+u(e+m)*Math.cos(v)}else h[m]=u(m);let f=0;for(let m=0;m<e;m++)f+=h[m]*h[m];const d=Math.sqrt(f/e);return d>0?me(h,Math.min(.98,vc(h)*(.2/d))):h})}function xb(i,t){const e=Math.round(t*i);return[0,1].map(n=>{const s=new Nu(i,53769+n),r=new Float32Array(e),o=Math.round(t*75);for(let a=0;a<o;a++){const c=Math.floor(s.r()*e),l=s.r();let h,u;l<.6?(h=Je(s,s.u(2e3,6500),s.u(.8,2.5),s.u(6e-4,.0018)),u=Math.pow(s.r(),2)):l<.85?(h=s.buf(.05),on(h,i,0,s.u(1800,4500),1,s.u(.004,.012)),u=.3*Math.pow(s.r(),2)):(h=le(s,.04,jt(.001,.006),["bp",s.u(500,1200),1]),u=.5*s.r());for(let f=0;f<h.length;f++)r[(c+f)%e]+=h[f]*u}return me(r,.9)})}function Ys(i,t,e){const n=i.createBuffer(t.length,t[0].length,e);return t.forEach((s,r)=>n.getChannelData(r).set(s)),n}function Bo(i,t,e,n){i.cancelScheduledValues(e),i.setValueAtTime(i.value,e),i.linearRampToValueAtTime(t,e+n)}function Mb(i,t=500){typeof requestIdleCallback=="function"?requestIdleCallback(i,{timeout:t}):setTimeout(i,40)}class yb{constructor(t,e,n){S(this,"parts");this.parts=n.map(s=>{const r=t.createBufferSource();r.buffer=s,r.loop=!0;const o=t.createGain();return o.gain.value=0,r.connect(o),o.connect(e),r.start(t.currentTime,Math.random()*s.duration),{src:r,gain:o}})}set(t,e){const[n,s]=this.parts;Bo(n.gain.gain,ib*Math.pow(t,1.3),e,1.5),Bo(s.gain.gain,sb*Math.pow(t,.8),e,1.5)}stop(){for(const{src:t,gain:e}of this.parts){try{t.stop()}catch{}t.disconnect(),e.disconnect()}}}const Il=[36,42,48,54,60,66,72,78,84,90],bb=[[0,2,4,7,9],[0,2,4,7,9,11]],Sb={0:[0,4,7,11],2:[2,5,9,12],4:[4,7,11,14],5:[5,9,12,16],7:[7,11,14,21],9:[9,12,16,19]},Eb=[[0,5],[0,9,5,0],[5,0],[0,4,5,0],[9,5,0,7],[0,7,9,5],[0,2,5,0]];function wb(i,t){const e=gc(i),n=Gn(4.5*Math.pow(261.6/e,.3),2.5,6),s=new Float32Array(Math.round(n*t)),r=Math.min(t*.45,6e3);for(let a=1;a<=16;a++){const c=a*e*Math.sqrt(1+4e-4*a*a);if(c>r)break;const l=1/(1+Math.pow(c/1400,2))/Math.pow(a,1.1);on(s,t,0,c,l*.6,n*.12/(1+.5*(a-1))),on(s,t,0,c*1.0006,l*.4,n*.3/(1+.25*(a-1)))}const o=Math.round(.004*t);for(let a=0;a<o;a++)s[a]*=.5-.5*Math.cos(Math.PI*a/o);return me(Ps(s,t,n*.2),.5)}function Tb(i,t,e){const n=Math.round(t*i),s=Math.round(.018*i);return[0,1].map(r=>{const o=new Float32Array(n),a=kp(48879+r);let c=0;for(let l=s;l<n;l++){const h=(l-s)/i;c+=(.08+.55*Math.exp(-h/.9))*(a()*2-1-c),o[l]=c*Math.exp(-6.9*h/e)*Math.min(1,(n-l)/(.05*i))}return o})}class Ab{constructor(t,e,n){S(this,"out");S(this,"bus");S(this,"wave");S(this,"samples",new Map);S(this,"nodes",new Set);S(this,"sampleRate");S(this,"events",[]);S(this,"timer");S(this,"nextPhrase",0);S(this,"playing",!1);S(this,"generation",0);S(this,"tick",()=>{try{const t=this.ctx.currentTime;if(!this.events.length&&t>=this.nextPhrase){const e=this.compose(t+.2);this.nextPhrase=e+30+Math.random()*90}for(;this.events.length&&this.events[0].t<t+1.5;){const e=this.events.shift();e.t<t||(e.kind==="note"?this.note(e.t,e.midi,e.vel):this.pad(e.t,e.notes,e.dur,e.vel))}}catch{}});this.ctx=t,this.dest=e,this.synth=n,this.sampleRate=Math.max(22050,Math.min(24e3,t.sampleRate)),this.out=t.createGain(),this.out.gain.value=0,this.bus=t.createGain();const s=t.createGain();s.gain.value=.7;const r=t.createGain();r.gain.value=.55;const o=t.createConvolver(),a=t.sampleRate;n.request(`reverb:${a}`,{kind:"reverb",rate:a,sec:4,rt60:3.2},!1,l=>o.buffer=Ys(t,l,a)),this.bus.connect(s),s.connect(this.out),this.bus.connect(r),r.connect(o),o.connect(this.out);const c=[0,1,.3,.12,.05,.02];this.wave=t.createPeriodicWave(new Float32Array(c.length),new Float32Array(c))}setVolume(t){const e=this.ctx.currentTime;Bo(this.out.gain,t*nb,e,t>0?1:1.5),t>0&&!this.playing?this.start(e):t<=0&&this.playing&&this.stop()}dispose(){this.stop(),this.silence()}start(t){this.playing=!0,this.generation++,this.out.connect(this.dest),this.nextPhrase=t+3+Math.random()*4,this.timer===void 0&&(this.timer=setInterval(this.tick,250));for(const e of Il)this.sample(e)}stop(){this.playing=!1,this.events=[],this.timer!==void 0&&clearInterval(this.timer),this.timer=void 0;const t=++this.generation;setTimeout(()=>{!this.playing&&t===this.generation&&this.silence()},2500)}silence(){for(const t of this.nodes)try{t.stop()}catch{}this.nodes.clear(),this.out.disconnect()}compose(t){const e=Math.random,n=_=>_[Math.floor(e()*_.length)],s=48+Math.floor(e()*8),r=n(bb),o=60/(54+e()*24),a=n(Eb),c=n([4,6,8]),l=c*o,h=Math.max(2,Math.round((20+e()*40)/l)),u=e()<.6,f=[];for(let _=s+12;_<=s+36;_++)r.includes((_-s)%12)&&f.push(_);const d=(f.length-1)/2,m=[];for(let _=0;_<c;_+=.5)e()<(_%1?.12:.5)&&m.push(_);for(;m.length<2;){const _=Math.floor(e()*c);m.includes(_)||m.push(_)}m.sort((_,T)=>_-T);const v=m.map(()=>n([-2,-1,-1,1,1,2,3,-3]));let g=Math.round(d),p=-1;const M=[];for(let _=0;_<h;_++){const T=t+_*l,w=Sb[a[_%a.length]];let b=s-12+w[0];for(;b>50;)b-=12;if(M.push({t:T,kind:"note",midi:b,vel:.3+e()*.1}),e()<.4&&M.push({t:T+o*Math.floor(c/2),kind:"note",midi:b+7,vel:.22}),u){const x=[w[0],w[1],w[w.length-1]].map(y=>{let R=s+y;for(;R<55;)R+=12;for(;R>70;)R-=12;return R});M.push({t:T,kind:"pad",notes:x,dur:l+2,vel:.03+e()*.015})}const C=w.map(x=>x%12);for(let x=0;x<f.length&&e()<.8;x++){if(g-x>=0&&C.includes((f[g-x]-s)%12)){g-=x;break}if(g+x<f.length&&C.includes((f[g+x]-s)%12)){g+=x;break}}m.forEach((x,y)=>{if(e()<.15)return;if(y>0){let P=e()<.25?n([-1,1,2,-2]):v[y];Math.abs(g-d)>f.length*.3&&Math.sign(P)===Math.sign(g-d)&&(P=-P),g=Gn(g+P,0,f.length-1)}f[g]===p&&e()<.7&&(g=Gn(g+(g>d?-1:1),0,f.length-1)),p=f[g];const R=T+x*o+(e()-.5)*.04;M.push({t:R,kind:"note",midi:f[g],vel:.22+e()*.18+(x===0?.06:0)}),e()<.12&&g>=2&&M.push({t:R+.012,kind:"note",midi:f[g-2],vel:.15})})}const E=t+h*l;return M.push({t:E,kind:"note",midi:s+24,vel:.3}),M.push({t:E,kind:"note",midi:s-12,vel:.28}),M.sort((_,T)=>_.t-T.t),this.events=M,E+6}sample(t){const e=this.samples.get(t);if(e)return e;const n=this.sampleRate;this.synth.request(`piano:${t}:${n}`,{kind:"piano",midi:t,rate:n},!1,s=>this.samples.set(t,Ys(this.ctx,s,n)))}track(t,e){this.nodes.add(t),t.onended=()=>{this.nodes.delete(t),t.disconnect();for(const n of e)n.disconnect()}}note(t,e,n){const s=this.ctx;let r=Il[0];for(const l of Il)Math.abs(l-e)<Math.abs(r-e)&&(r=l);const o=this.sample(r);if(!o)return;const a=s.createBufferSource();a.buffer=o,a.playbackRate.value=Math.pow(2,(e-r)/12);const c=s.createGain();c.gain.value=n,a.connect(c),c.connect(this.bus),this.track(a,[c]),a.start(t)}pad(t,e,n,s){const r=this.ctx,o=r.createBiquadFilter();o.type="lowpass",o.frequency.value=700+Math.random()*500,o.Q.value=0;const a=r.createGain(),c=Math.min(3,n*.35),l=Math.min(4,n*.45);a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(s,t+c),a.gain.setValueAtTime(s,t+n-l),a.gain.linearRampToValueAtTime(0,t+n),o.connect(a),a.connect(this.bus),e.forEach((h,u)=>{for(const f of[-7,7]){const d=r.createOscillator();d.setPeriodicWave(this.wave),d.frequency.value=gc(h),d.detune.value=f+(Math.random()-.5)*4,d.connect(o),this.track(d,u===e.length-1&&f>0?[o,a]:[]),d.start(t),d.stop(t+n+.05)}})}}function Rb(i){switch(i.kind){case"sound":return[vb(i.name,i.variant,i.rate)];case"rain":return[..._b(i.rate,4),...xb(i.rate,2.7)];case"piano":return[wb(i.midi,i.rate)];case"reverb":return Tb(i.rate,i.sec,i.rt60)}}class Cb{constructor(t){S(this,"worker",null);S(this,"pending",new Map);S(this,"order",[]);S(this,"busy",null);S(this,"disposed",!1);try{const e=(t==null?void 0:t())??null;e&&(e.onmessage=n=>this.finish(n.data.key,n.data.channels),e.onerror=()=>this.fallback()),this.worker=e}catch{this.worker=null}}request(t,e,n,s){if(this.disposed)return;const r=this.pending.get(t);if(r){r.done.push(s);const o=this.order.indexOf(t);n&&o>0&&this.order.unshift(...this.order.splice(o,1));return}this.pending.set(t,{job:e,done:[s]}),n?this.order.unshift(t):this.order.push(t),this.next()}dispose(){var t;this.disposed=!0,(t=this.worker)==null||t.terminate(),this.worker=null,this.pending.clear(),this.order.length=0}next(){if(this.busy!==null||this.disposed)return;const t=this.order.shift();if(t===void 0)return;const e=this.pending.get(t);if(!e)return this.next();if(this.busy=t,this.worker){this.worker.postMessage({key:t,job:e.job});return}Mb(()=>{let n=[];try{n=Rb(e.job)}catch{}this.finish(t,n)})}fallback(){var t;(t=this.worker)==null||t.terminate(),this.worker=null,this.busy!==null&&this.order.unshift(this.busy),this.busy=null,this.next()}finish(t,e){this.busy===t&&(this.busy=null);const n=this.pending.get(t);if(this.pending.delete(t),n&&e.length&&!this.disposed)for(const s of n.done)try{s(e)}catch{}this.next()}}class Lb{constructor(t){S(this,"ctx",null);S(this,"synth",null);S(this,"unavailable",!1);S(this,"disposed",!1);S(this,"rate",Jh);S(this,"master",null);S(this,"sfxIn",null);S(this,"water",null);S(this,"sfxVol",null);S(this,"music",null);S(this,"rain",null);S(this,"rainBuffers",null);S(this,"rainTimer");S(this,"buffers",new Map);S(this,"lastVariant",new Map);S(this,"voices",[]);S(this,"fadingUntil",[]);S(this,"warm",!1);S(this,"volume",1);S(this,"musicVolume",0);S(this,"rainLevel",0);S(this,"underwater",!1);S(this,"pos",{x:0,y:0,z:0,yaw:0,pitch:0});this.createWorker=t}unlock(){if(!(this.disposed||this.unavailable))try{this.ctx||this.init();const t=this.ctx;if(!t)return;if(t.state!=="running"){const e=t.resume();e&&e.then(()=>this.warmUp(),()=>{})}this.warmUp()}catch{}}setVolume(t){this.volume=Gn(hs(t,this.volume),0,1);try{this.ctx&&this.sfxVol&&Bo(this.sfxVol.gain,this.volume,this.ctx.currentTime,.05)}catch{}}setMusicVolume(t){var e;this.musicVolume=Gn(hs(t,this.musicVolume),0,1);try{if(!this.ctx||!this.master)return;!this.music&&this.musicVolume>0&&this.synth&&(this.music=new Ab(this.ctx,this.master,this.synth)),(e=this.music)==null||e.setVolume(this.musicVolume)}catch{}}setListener(t,e,n,s,r){if(![t,e,n,s,r].every(Ia))return;const o=this.pos;if(!(o.x===t&&o.y===e&&o.z===n&&o.yaw===s&&o.pitch===r)){o.x=t,o.y=e,o.z=n,o.yaw=s,o.pitch=r;try{this.applyListener()}catch{}}}play(t,e){try{const n=this.ctx,s=this.sfxIn;if(!n||!s||this.disposed||n.state!=="running")return;const r=Ts[t];if(!r)return;const o=Gn(hs(e==null?void 0:e.volume,1),0,2),a=Gn(hs(e==null?void 0:e.pitch,1),.25,4),c=!!e&&(Ia(e.x)||Ia(e.y)||Ia(e.z));let l=0,h=0,u=0,f=1;if(c){const w=this.pos;l=hs(e.x,w.x),h=hs(e.y,w.y),u=hs(e.z,w.z);const b=Math.hypot(l-w.x,h-w.y,u-w.z);if(b>=Ll)return;f=1-Math.max(0,b-Cl)/(Ll-Cl)}const d=r.gain*o*f;if(d<.002)return;const m=n.currentTime;let v=0;for(const w of this.voices)w.name===t&&m-w.start<.05&&v++;if(v>=3||this.voices.length>=tb&&!this.steal(d,m))return;const g=this.pick(t);if(!g)return;const p=n.createBufferSource();p.buffer=g;const M=a*(1+r.jitter*(Math.random()*2-1));p.playbackRate.value=M;const E=n.createGain();E.gain.value=r.gain*o,p.connect(E);let _=null;c?(_=n.createPanner(),_.panningModel="equalpower",_.distanceModel="linear",_.refDistance=Cl,_.maxDistance=Ll,_.rolloffFactor=1,_.positionX?(_.positionX.value=l,_.positionY.value=h,_.positionZ.value=u):_.setPosition(l,h,u),E.connect(_),_.connect(s)):E.connect(s),p.start(m);const T={src:p,gain:E,panner:_,name:t,start:m,end:m+g.duration/M,level:d};p.onended=()=>this.release(T),this.voices.push(T)}catch{}}setRain(t){this.rainLevel=Gn(hs(t,0),0,1);try{this.applyRain()}catch{}}setUnderwater(t){this.underwater=!!t;try{this.applyUnderwater()}catch{}}dispose(){var t,e,n;if(!this.disposed){this.disposed=!0,(t=this.synth)==null||t.dispose(),clearTimeout(this.rainTimer);try{(e=this.music)==null||e.dispose(),(n=this.rain)==null||n.stop();for(const r of this.voices)try{r.src.stop()}catch{}const s=this.ctx;s&&typeof s.close=="function"&&s.close().catch(()=>{})}catch{}this.voices=[],this.music=null,this.rain=null,this.ctx=null,this.sfxIn=null,this.buffers.clear(),this.rainBuffers=null}}init(){const t=globalThis,e=t.AudioContext??t.webkitAudioContext;if(!e){this.unavailable=!0;return}let n;try{n=new e({latencyHint:"interactive"})}catch{n=new e}this.ctx=n,this.rate=Math.min(Jh,n.sampleRate),this.synth=new Cb(this.createWorker);const s=n.createDynamicsCompressor();s.threshold.value=-8,s.knee.value=4,s.ratio.value=20,s.attack.value=.002,s.release.value=.15,s.connect(n.destination);const r=n.createGain();r.gain.value=.7,r.connect(s),this.master=r;const o=n.createGain();o.gain.value=this.volume,o.connect(r);const a=n.createBiquadFilter();a.type="lowpass",a.Q.value=0,a.frequency.value=this.underwater?bd:this.openCutoff(),a.connect(o);const c=n.createGain();c.connect(a),this.sfxVol=o,this.water=a,this.sfxIn=c,n.onstatechange=()=>{n.state==="running"&&this.warmUp()};const l=n.createBufferSource();l.buffer=n.createBuffer(1,1,n.sampleRate),l.connect(n.destination),l.start(0),this.applyListener(),this.applyRain(),this.setMusicVolume(this.musicVolume)}openCutoff(){var t;return Math.min(2e4,(((t=this.ctx)==null?void 0:t.sampleRate)??44100)*.45)}applyListener(){const t=this.ctx;if(!t)return;const{x:e,y:n,z:s,yaw:r,pitch:o}=this.pos,a=Math.cos(o),c=Math.sin(o),l=Math.cos(r),h=Math.sin(r),u=-h*a,f=c,d=-l*a,m=h*c,v=a,g=l*c,p=t.listener;p.positionX?(p.positionX.value=e,p.positionY.value=n,p.positionZ.value=s,p.forwardX.value=u,p.forwardY.value=f,p.forwardZ.value=d,p.upX.value=m,p.upY.value=v,p.upZ.value=g):(p.setPosition(e,n,s),p.setOrientation(u,f,d,m,v,g))}applyUnderwater(){var s;const t=this.ctx,e=(s=this.water)==null?void 0:s.frequency;if(!t||!e)return;const n=t.currentTime;e.cancelScheduledValues(n),e.setValueAtTime(Math.max(20,e.value),n),e.exponentialRampToValueAtTime(this.underwater?bd:this.openCutoff(),n+(this.underwater?.15:.35))}applyRain(){const t=this.ctx;if(!t||!this.sfxIn)return;const e=this.rainLevel;if(clearTimeout(this.rainTimer),e>0&&!this.rain){const n=this.rainLoops(t);n&&(this.rain=new yb(t,this.sfxIn,n))}this.rain&&(this.rain.set(e,t.currentTime),e<=0&&(this.rainTimer=setTimeout(()=>{this.rainLevel<=0&&this.rain&&(this.rain.stop(),this.rain=null)},4e3)))}rainLoops(t){var n;if(this.rainBuffers)return this.rainBuffers;const e=this.rate;return(n=this.synth)==null||n.request(`rain:${e}`,{kind:"rain",rate:e},!0,s=>{this.rainBuffers=[Ys(t,s.slice(0,2),e),Ys(t,s.slice(2,4),e)],this.applyRain()}),null}pick(t){const e=this.buffers.get(t),n=[];if(e)for(let r=0;r<e.length;r++)e[r]&&n.push(r);if(!n.length){this.variant(t,0,!0);return}let s=Math.floor(Math.random()*n.length);return n.length>1&&n[s]===this.lastVariant.get(t)&&(s=(s+1)%n.length),this.lastVariant.set(t,n[s]),e[n[s]]}variant(t,e,n){var a;const s=this.ctx,r=this.synth;if(!s||!r||(a=this.buffers.get(t))!=null&&a[e])return;const o=gb(t,this.rate);r.request(`${t}#${e}:${o}`,{kind:"sound",name:t,variant:e,rate:o},n,([c])=>{let l=this.buffers.get(t);l||this.buffers.set(t,l=[]),l[e]=Ys(s,[c],o)})}warmUp(){var s;const t=this.ctx;if(this.warm||this.disposed||(t==null?void 0:t.state)!=="running")return;this.warm=!0;const e=Math.max(...Ed.map(r=>Ts[r].vars));for(let r=0;r<e;r++)for(const o of Ed)r<Ts[o].vars&&this.variant(o,r,!1);const n=this.rate;(s=this.synth)==null||s.request(`rain:${n}`,{kind:"rain",rate:n},!1,r=>{this.rainBuffers??(this.rainBuffers=[Ys(t,r.slice(0,2),n),Ys(t,r.slice(2,4),n)])})}steal(t,e){if(this.fadingUntil=this.fadingUntil.filter(o=>o>e),this.fadingUntil.length>=eb)return!1;let n=-1,s=1/0;for(let o=0;o<this.voices.length;o++){const a=this.voices[o],c=a.end-a.start,l=c>0?Gn((a.end-e)/c,0,1):0,h=a.level*(.25+.75*l);h<s&&(s=h,n=o)}if(n<0||s>t)return!1;const r=this.voices[n];this.voices.splice(n,1),this.fadingUntil.push(e+.012);try{Bo(r.gain.gain,0,e,.01),r.src.stop(e+.012)}catch{}return!0}release(t){var n;const e=this.voices.indexOf(t);e>=0&&this.voices.splice(e,1),t.src.disconnect(),t.gain.disconnect(),(n=t.panner)==null||n.disconnect()}}const Qi=`
uniform float uTime;
uniform vec3 uCameraPos;
uniform vec3 uSunDir;
uniform vec3 uLightDir;
uniform vec3 uLightColor;
uniform vec3 uAmbient;
uniform vec3 uZenith;
uniform vec3 uHorizon;
uniform vec3 uSunGlow;
uniform vec3 uBlockLight;
uniform float uFogNear;
uniform float uFogFar;
uniform float uUnderwater;
uniform vec3 uWaterFog;
uniform float uRain;
`,co=`
vec3 skyColor(vec3 dir) {
  float y = dir.y;
  vec3 col = mix(uHorizon, uZenith, pow(clamp(y, 0.0, 1.0), 0.5));
  col = mix(col, uHorizon * 0.55, clamp(-y * 2.5, 0.0, 1.0));
  float s = max(dot(dir, uSunDir), 0.0);
  float horizonBoost = clamp(1.0 - y * 1.5, 0.25, 1.0);
  col += uSunGlow * (pow(s, 5.0) * 0.55 + pow(s, 40.0) * 1.1) * horizonBoost;
  return col;
}

/** Кривая яркости уровней света как в Minecraft (0..1 -> 0..1). */
float lightCurve(float l) {
  return l / (3.0 - 2.0 * l);
}

vec3 applyFog(vec3 col, vec3 world) {
  vec3 v = world - uCameraPos;
  float dist = length(v);
  if (uUnderwater > 0.5) {
    float f = 1.0 - exp(-dist * 0.085);
    return mix(col, uWaterFog, f);
  }
  float f = smoothstep(uFogNear, uFogFar, dist);
  f = max(f, uRain * 0.35 * smoothstep(0.0, uFogFar, dist));
  return mix(col, skyColor(v / max(dist, 1e-4)), f);
}
`,Up=`
#ifdef USE_SHADOWS
uniform highp sampler2DShadow uShadowMap;
uniform mat4 uShadowMatrix;
uniform float uShadowTexel;
const vec2 POISSON[16] = vec2[16](
  vec2(-0.94201624, -0.39906216), vec2(0.94558609, -0.76890725), vec2(-0.09418410, -0.92938870), vec2(0.34495938, 0.29387760),
  vec2(-0.91588581, 0.45771432), vec2(-0.81544232, -0.87912464), vec2(-0.38277543, 0.27676845), vec2(0.97484398, 0.75648379),
  vec2(0.44323325, -0.97511554), vec2(0.53742981, -0.47373420), vec2(-0.26496911, -0.41893023), vec2(0.79197514, 0.19090188),
  vec2(-0.24188840, 0.99706507), vec2(-0.81409955, 0.91437590), vec2(0.19984126, 0.78641367), vec2(0.14383161, -0.14100790)
);
float shadowFactor(vec3 world, vec3 normal, float ndl) {
  vec3 p = world + normal * 0.045 + uLightDir * 0.02;
  vec4 sc = uShadowMatrix * vec4(p, 1.0);
  vec3 c = sc.xyz * 0.5 + 0.5;
  if (c.x <= 0.0 || c.x >= 1.0 || c.y <= 0.0 || c.y >= 1.0 || c.z >= 1.0) return 1.0;
  float ref = c.z - (0.00025 + 0.0006 * (1.0 - ndl));
  // Сравнение глубины делает видеокарта и сразу сглаживает его по четырём текселям.
  float sum = 0.0;
  for (int i = 0; i < SHADOW_TAPS; i++) sum += texture(uShadowMap, vec3(c.xy + POISSON[i] * uShadowTexel * 1.6, ref));
  float s = sum / float(SHADOW_TAPS);
  vec2 e = abs(c.xy - 0.5) * 2.0;
  return mix(s, 1.0, smoothstep(0.82, 0.98, max(e.x, e.y)));
}
#else
float shadowFactor(vec3 world, vec3 normal, float ndl) { return 1.0; }
#endif
`,Op=`
vec3 leafWave(vec3 p) {
  float t = uTime * (1.0 + uRain);
  float a = sin(t * 1.6 + p.x * 0.8 + p.z * 0.4);
  float b = sin(t * 2.2 + p.z * 0.9 - p.y * 0.5);
  return vec3(a, 0.5 * b, b) * (0.035 + 0.03 * uRain);
}
vec2 plantWave(vec3 p) {
  float t = uTime * (1.0 + uRain);
  return vec2(sin(t * 1.9 + p.x * 0.7 + p.z * 0.3), sin(t * 2.5 + p.z * 0.8 + p.x * 0.2)) * (0.07 + 0.05 * uRain);
}
float waterWave(vec3 p) {
  return (sin(uTime * 1.3 + p.x * 0.9 + p.z * 0.4) + sin(uTime * 1.7 - p.z * 1.1 + p.x * 0.3)) * 0.022 - 0.03;
}
`,Fp=`
in vec4 aPos;
in vec4 aData;

const vec3 NORMALS[7] = vec3[7](
  vec3(1.0, 0.0, 0.0), vec3(-1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vec3(0.0, -1.0, 0.0),
  vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, -1.0), vec3(0.0, 1.0, 0.0)
);

struct Decoded {
  vec4 world;
  vec3 uv;
  int face;
  int ao;
  int glow;
  int anim;
  int notWater;
};

Decoded decode() {
  Decoded d;
  int w = int(aPos.w + 0.5);
  int ub = int(aData.x + 0.5);
  int vb = int(aData.y + 0.5);
  d.face = (w >> 8) & 7;
  d.ao = (w >> 11) & 3;
  d.glow = (w >> 13) & 1;
  d.anim = (ub >> 7) & 1;
  d.notWater = (vb >> 5) & 1;
  d.uv = vec3(float(ub & 31) / 16.0, float(vb & 31) / 16.0, float(w & 255));
  d.world = modelMatrix * vec4(aPos.xyz / 16.0, 1.0);
#ifdef WAVING
  int wave = (ub >> 5) & 3;
  if (wave == 1) d.world.xyz += leafWave(d.world.xyz);
  else if (wave == 2) d.world.xz += plantWave(d.world.xyz);
  else if (wave == 3) d.world.y += waterWave(d.world.xyz);
#endif
  return d;
}
`,Ua=`
precision highp float;
precision highp int;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
${Qi}
${Op}
${Fp}

out vec3 vUv;
out vec3 vWorld;
out vec2 vLight;
out float vAO;
flat out int vFace;
flat out int vGlow;
flat out int vAnim;
flat out int vNotWater;

#ifdef ENTITY
uniform vec2 uEntityLight;
#endif

const float AO_LEVELS[4] = float[4](0.42, 0.62, 0.8, 1.0);

void main() {
  Decoded d = decode();
  vUv = d.uv;
  vWorld = d.world.xyz;
#ifdef ENTITY
  vLight = uEntityLight;
#else
  vLight = aData.zw / 255.0;
#endif
  vAO = AO_LEVELS[d.ao];
  vFace = d.face;
  vGlow = d.glow;
  vAnim = d.anim;
  vNotWater = d.notWater;
  gl_Position = projectionMatrix * viewMatrix * d.world;
}
`,Bp=`
vec4 sampleAtlas(vec3 uvl, int anim, int face) {
  if (anim == 0) return texture(uAtlas, uvl);
  // Текущая жидкость: текстура течёт вниз по боковым граням и слегка дрожит сверху.
  vec2 uv = uvl.xy;
  if (face == 2) uv += vec2(sin(uTime * 0.6 + vWorld.z * 0.5), cos(uTime * 0.5 + vWorld.x * 0.5)) * 0.06 + uTime * vec2(0.02, 0.015);
  else uv.y -= uTime * 0.35;
  vec2 dx = dFdx(uvl.xy);
  vec2 dy = dFdy(uvl.xy);
  return textureGrad(uAtlas, vec3(fract(uv), uvl.z), dx, dy);
}
`,kl=`
precision highp float;
precision highp int;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${Qi}
${co}
${Up}

in vec3 vUv;
in vec3 vWorld;
in vec2 vLight;
in float vAO;
flat in int vFace;
flat in int vGlow;
flat in int vAnim;
flat in int vNotWater;

out vec4 outColor;

#ifdef ENTITY
uniform float uNoFog;
#endif

const vec3 NORMALS_F[7] = vec3[7](
  vec3(1.0, 0.0, 0.0), vec3(-1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vec3(0.0, -1.0, 0.0),
  vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, -1.0), vec3(0.0, 1.0, 0.0)
);
// Затенение граней в тени, как в оригинальной игре: верх светлее, низ темнее.
const float FACE_AMBIENT[7] = float[7](0.62, 0.62, 1.0, 0.5, 0.8, 0.8, 0.9);

${Bp}

void main() {
  vec4 tex = sampleAtlas(vUv, vAnim, vFace);
#ifdef ALPHA_TEST
  if (tex.a < 0.5) discard;
#endif
  vec3 albedo = tex.rgb;
  vec3 n = NORMALS_F[vFace];

  float sky = vLight.x;
  float blk = vLight.y;
  float skyL = lightCurve(sky);
  float blkL = lightCurve(blk);

  float ndl = vFace == 6 ? 0.45 + 0.55 * max(uLightDir.y, 0.0) : max(dot(n, uLightDir), 0.0);
  float sunVis = smoothstep(0.6, 0.95, sky);
  float shadow = ndl > 0.0 && sunVis > 0.0 ? shadowFactor(vWorld, n, ndl) : 0.0;
#ifdef ENTITY
  if (uNoFog > 0.5) shadow = 1.0;
#endif
  vec3 direct = uLightColor * ndl * shadow * sunVis;
  vec3 ambient = uAmbient * skyL * FACE_AMBIENT[vFace];
  vec3 torch = uBlockLight * blkL * blkL * 1.35;
  vec3 lighting = (ambient + torch + vec3(0.006)) * vAO + direct * mix(0.75, 1.0, vAO);
  vec3 col = albedo * lighting;
  if (vGlow == 1) col = albedo * 1.9 + col * 0.2;
  // В дождь поверхности становятся темнее и чуть «мокрее».
  col *= 1.0 - uRain * 0.25 * skyL;
#ifdef ENTITY
  if (uNoFog > 0.5) {
    outColor = vec4(col, 1.0);
    return;
  }
#endif
  outColor = vec4(applyFog(col, vWorld), 1.0);
}
`,Db=`
precision highp float;
precision highp int;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${Qi}
${co}
${Up}

in vec3 vUv;
in vec3 vWorld;
in vec2 vLight;
in float vAO;
flat in int vFace;
flat in int vGlow;
flat in int vAnim;
flat in int vNotWater;

out vec4 outColor;

const vec3 NORMALS_F[7] = vec3[7](
  vec3(1.0, 0.0, 0.0), vec3(-1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0), vec3(0.0, -1.0, 0.0),
  vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, -1.0), vec3(0.0, 1.0, 0.0)
);

${Bp}

vec3 waterNormal(vec2 p) {
  float t = uTime;
  vec2 g = vec2(0.0);
  vec2 k;
  k = vec2(0.9, 0.4);   g += k * cos(dot(k, p) + t * 1.2) * 0.05;
  k = vec2(-0.5, 1.1);  g += k * cos(dot(k, p) + t * 1.5) * 0.04;
  k = vec2(1.7, -1.3);  g += k * cos(dot(k, p) + t * 2.1) * 0.02;
  k = vec2(-2.6, -0.8); g += k * cos(dot(k, p) + t * 2.7) * 0.012;
  k = vec2(4.3, 3.1);   g += k * cos(dot(k, p) + t * 3.9) * 0.005;
  return normalize(vec3(-g.x, 1.0, -g.y));
}

void main() {
  vec4 tex = sampleAtlas(vUv, vAnim, vFace);
  vec3 n = NORMALS_F[vFace];
  bool water = vNotWater == 0;
  if (water && vFace == 2) n = waterNormal(vWorld.xz);
  vec3 toCam = uCameraPos - vWorld;
  float dist = length(toCam);
  vec3 v = toCam / max(dist, 1e-4);
  if (dot(n, v) < 0.0) n = -n;

  float skyL = lightCurve(vLight.x);
  float blkL = lightCurve(vLight.y);
  float ndl = max(dot(n, uLightDir), 0.0);
  float sunVis = smoothstep(0.6, 0.95, vLight.x);
  float shadow = sunVis > 0.0 ? shadowFactor(vWorld, NORMALS_F[vFace], max(ndl, 0.3)) : 0.0;
  vec3 lighting = uAmbient * skyL + uBlockLight * blkL * blkL * 1.35 + uLightColor * ndl * 0.35 * shadow * sunVis + vec3(0.006);
  vec3 base = tex.rgb * lighting;
  vec3 col;
  float alpha;
  if (water) {
    float fres = 0.02 + 0.98 * pow(1.0 - max(dot(n, v), 0.0), 5.0);
    vec3 refl = skyColor(reflect(-v, n)) * smoothstep(0.35, 0.9, vLight.x);
    vec3 h = normalize(uLightDir + v);
    float spec = pow(max(dot(n, h), 0.0), 260.0) * 7.0 * shadow * sunVis;
    col = mix(base, refl, clamp(fres * 0.9 + 0.08, 0.0, 1.0)) + uLightColor * spec;
    alpha = clamp(mix(0.62, 0.95, fres) * (0.6 + 0.4 * tex.a / 0.75), 0.4, 0.97);
    if (uUnderwater > 0.5) alpha = 0.55;
  } else {
    // Лёд: полупрозрачный с бликом.
    vec3 h = normalize(uLightDir + v);
    col = base + uLightColor * pow(max(dot(n, h), 0.0), 80.0) * shadow * sunVis * 0.6;
    alpha = tex.a;
  }
  outColor = vec4(applyFog(col, vWorld), alpha);
}
`,Pb=`
precision highp float;
precision highp int;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
${Qi}
${Op}
${Fp}
out vec3 vUv;
void main() {
  Decoded d = decode();
  vUv = d.uv;
  gl_Position = projectionMatrix * viewMatrix * d.world;
}
`,Ib=`
precision highp float;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
in vec3 vUv;
out vec4 outColor;
void main() {
#ifdef ALPHA_TEST
  if (texture(uAtlas, vUv).a < 0.5) discard;
#endif
  outColor = vec4(1.0);
}
`,kb=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`,Nb=`
${Qi}
uniform float uNight;
uniform vec3 uSunDisk;
uniform vec3 uMoonDisk;
varying vec3 vDir;
${co}

float hash(vec3 p) {
  p = fract(p * 0.3183099 + 0.1);
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

/** Квадратный диск вокруг направления center (как солнце в Minecraft). */
float squareDisk(vec3 dir, vec3 center, float size, out vec2 local) {
  vec3 right = normalize(cross(center, vec3(0.0, 0.0, 1.0)));
  vec3 up = cross(right, center);
  float d = dot(dir, center);
  local = vec2(dot(dir, right), dot(dir, up)) / max(d, 1e-4);
  if (d <= 0.0) return 0.0;
  vec2 a = abs(local);
  return 1.0 - smoothstep(size * 0.92, size, max(a.x, a.y));
}

void main() {
  vec3 dir = normalize(vDir);
  vec3 col = skyColor(dir);
  vec2 l;
  float sun = squareDisk(dir, uSunDir, 0.085, l);
  col += uSunDisk * sun * (1.0 - uRain);
  float moon = squareDisk(dir, -uSunDir, 0.065, l);
  if (moon > 0.0) {
    float crater = hash(floor(vec3(l * 40.0, 1.0)));
    col += uMoonDisk * moon * (0.75 + 0.25 * crater) * (1.0 - uRain);
  }
  // Звёзды вращаются вместе с небом.
  if (uNight > 0.01 && dir.y > -0.1) {
    vec3 sd = dir;
    float ang = atan(uSunDir.y, uSunDir.x);
    float c = cos(-ang);
    float s = sin(-ang);
    sd = vec3(c * sd.x - s * sd.y, s * sd.x + c * sd.y, sd.z);
    vec3 cell = floor(sd * 220.0);
    float h = hash(cell);
    if (h > 0.9965) col += vec3(0.9, 0.95, 1.0) * (h - 0.9965) * 900.0 * uNight * (1.0 - uRain) * smoothstep(-0.1, 0.2, dir.y);
  }
  gl_FragColor = vec4(col, 1.0);
}
`,wd=`
attribute float aShade;
varying vec3 vWorld;
varying float vShade;
void main() {
  vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vShade = aShade;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,Ub=`
${Qi}
varying vec3 vWorld;
varying float vShade;
${co}
void main() {
  vec3 col = (uAmbient * 1.2 + uLightColor * 0.85) * vShade;
  col = mix(col, col * 0.55, uRain);
  vec3 v = vWorld - uCameraPos;
  float dist = length(v);
  float fog = smoothstep(uFogFar * 1.2, uFogFar * 3.2, dist);
  vec3 c = mix(col, skyColor(v / dist), fog);
  gl_FragColor = vec4(c, 0.86 * (1.0 - fog * 0.85));
}
`,Ob=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Fb=`
uniform sampler2D tColor;
uniform sampler2D tDepth;
uniform vec2 uSunScreen;
uniform float uSunVisible;
uniform vec3 uRayColor;
uniform float uExposure;
uniform float uSaturation;
uniform float uUnderwaterTint;
uniform float uTimeF;
uniform float uDamage;
/** Страх: тёмная виньетка, блеклые цвета, зерно. Сбой: рваные строки, расходящиеся цвета, помехи. */
uniform float uDread;
uniform float uGlitch;
varying vec2 vUv;

float hash12(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 aces(vec3 x) {
  const float a = 2.51;
  const float b = 0.03;
  const float c = 2.43;
  const float d = 0.59;
  const float e = 0.14;
  return clamp((x * (a * x + b)) / (x * (c * x + d) + e), 0.0, 1.0);
}

vec3 toSRGB(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  vec2 uv = vUv;
  if (uUnderwaterTint > 0.5) uv += vec2(sin(uv.y * 30.0 + uTimeF * 2.0), cos(uv.x * 25.0 + uTimeF * 1.7)) * 0.0025;
  vec3 col;
  if (uGlitch > 0.001) {
    // Строки изображения рвутся и съезжают, каналы цвета расходятся.
    float band = floor(uv.y * 42.0 + floor(uTimeF * 23.0) * 7.0);
    float n = hash12(vec2(band, floor(uTimeF * 31.0)));
    uv.x += (n - 0.5) * 0.08 * uGlitch * step(0.55, n);
    float o = 0.008 * uGlitch;
    col = vec3(texture2D(tColor, uv + vec2(o, 0.0)).r, texture2D(tColor, uv).g, texture2D(tColor, uv - vec2(o, 0.0)).b);
  } else col = texture2D(tColor, uv).rgb;
#ifdef GOD_RAYS
  if (uSunVisible > 0.0) {
    // 24 шага со случайным сдвигом на пиксель выглядят как 40 ровных и вдвое дешевле.
    const int STEPS = 24;
    vec2 delta = (uSunScreen - uv) / float(STEPS);
    float jitter = fract(52.9829189 * fract(dot(gl_FragCoord.xy, vec2(0.06711056, 0.00583715))));
    vec2 p = uv + delta * jitter;
    float acc = 0.0;
    float w = 1.0;
    for (int i = 0; i < STEPS; i++) {
      p += delta;
      float d = texture2D(tDepth, clamp(p, 0.0, 1.0)).r;
      acc += (d >= 0.99999 ? 1.0 : 0.0) * w;
      w *= 0.942;
    }
    float fall = 1.0 - smoothstep(0.0, 0.9, length((uv - uSunScreen) * vec2(1.0, 0.6)));
    col += uRayColor * acc / float(STEPS) * uSunVisible * fall * 0.9;
  }
#endif
  col *= uExposure;
  col = aces(col);
  float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(luma), col, uSaturation);
  vec2 q = vUv - 0.5;
  col *= 1.0 - dot(q, q) * (0.55 + uDread * 1.6);
  if (uDread + uGlitch > 0.001) {
    float l = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = mix(col, vec3(l) * vec3(0.92, 0.95, 1.0), uDread * 0.55);
    float grain = hash12(gl_FragCoord.xy + fract(uTimeF * 7.13) * 512.0) - 0.5;
    col += grain * (0.05 * uDread + 0.26 * uGlitch);
  }
  if (uUnderwaterTint > 0.5) col = mix(col, col * vec3(0.55, 0.75, 1.0), 0.45);
  col = mix(col, vec3(0.7, 0.0, 0.0), uDamage * smoothstep(0.15, 0.75, length(q)));
  gl_FragColor = vec4(toSRGB(clamp(col, 0.0, 1.0)), 1.0);
}
`,Qh=1,tu=2,eu=3;function Bb(){return{uTime:{value:0},uCameraPos:{value:new F},uSunDir:{value:new F(0,1,0)},uLightDir:{value:new F(0,1,0)},uLightColor:{value:new F(1,1,1)},uAmbient:{value:new F(.5,.5,.5)},uZenith:{value:new F(.1,.3,.8)},uHorizon:{value:new F(.6,.7,1)},uSunGlow:{value:new F(.5,.5,.4)},uBlockLight:{value:new F(1,.72,.42)},uFogNear:{value:60},uFogFar:{value:100},uUnderwater:{value:0},uWaterFog:{value:new F(.02,.07,.15)},uRain:{value:0},uShadowMap:{value:null},uShadowMatrix:{value:new ve},uShadowTexel:{value:1/1024}}}function zb(i,t){const e=new Cu(i,16,16,t);return e.magFilter=vn,e.minFilter=Eo,e.generateMipmaps=!0,e.colorSpace=xn,e.needsUpdate=!0,e}function Gb(i,t,e){const n={};e.waving&&(n.WAVING=1),e.shadows&&(n.USE_SHADOWS=1,n.SHADOW_TAPS=e.shadowTaps);const s={...t,uAtlas:{value:i}},r=new Ws({glslVersion:Hi,vertexShader:Ua,fragmentShader:kl,uniforms:s,defines:n}),o=new Ws({glslVersion:Hi,vertexShader:Ua,fragmentShader:kl,uniforms:s,defines:{...n,ALPHA_TEST:1}}),a=new Ws({glslVersion:Hi,vertexShader:Ua,fragmentShader:Db,uniforms:s,defines:n,transparent:!0,depthWrite:!1,side:ii}),c=d=>new Ws({glslVersion:Hi,vertexShader:Pb,fragmentShader:Ib,uniforms:s,defines:d,side:ii,colorWrite:!1}),l=c({}),h=c(e.waving?{WAVING:1,ALPHA_TEST:1}:{ALPHA_TEST:1}),u={...n,ENTITY:1,ALPHA_TEST:1};return delete u.WAVING,{opaque:r,cutout:o,translucent:a,shadowOpaque:l,shadowCutout:h,entityBlock:(d,m=!1)=>new Ws({glslVersion:Hi,vertexShader:Ua,fragmentShader:kl,uniforms:{...s,uEntityLight:{value:d},uNoFog:{value:m?1:0}},defines:u}),atlas:i}}function ji(i,t){i.traverse(e=>{const n=e;if(!n.isMesh)return;e.layers.enable(tu),e.castShadow=!0;const s=Array.isArray(n.material)?n.material:[n.material];for(const r of s)!r||r.__entityLight||(r instanceof Mi||r instanceof z1||r instanceof G1)&&(r.__entityLight=!0,r.onBeforeCompile=o=>{o.uniforms.uEntityLight=t,o.fragmentShader=o.fragmentShader.replace("void main() {",`uniform vec3 uEntityLight;
void main() {`).replace("#include <opaque_fragment>",`outgoingLight *= uEntityLight;
#include <opaque_fragment>`)},r.customProgramCacheKey=()=>"entity-light",r.needsUpdate=!0)})}const Mc="#e0ac80",Ks="#4a2f1b",Hb="#2c3e7a";function Td(i){const t=document.createElement("canvas");t.width=t.height=8;const e=t.getContext("2d");i(e);const n=new Ic(t);return n.magFilter=vn,n.minFilter=vn,n.generateMipmaps=!1,n.colorSpace=xn,n}const Kn=(i,t,e,n,s=1,r=1)=>{i.fillStyle=t,i.fillRect(e,n,s,r)};let Oa=null;function Vb(){if(Oa)return Oa;const i=Td(e=>{Kn(e,Mc,0,0,8,8),Kn(e,Ks,0,0,8,2),Kn(e,Ks,0,2,1,1),Kn(e,Ks,7,2,1,1),Kn(e,"#ffffff",1,4),Kn(e,"#3b5bb5",2,4),Kn(e,"#3b5bb5",5,4),Kn(e,"#ffffff",6,4),Kn(e,"#b07850",3,5,2,1),Kn(e,"#8a4b3a",3,6,2,1)}),t=Td(e=>{Kn(e,Mc,0,0,8,8),Kn(e,Ks,0,0,8,3),Kn(e,Ks,4,3,4,1)});return Oa={face:i,side:t},Oa}function Fa(i,t,e,n,s,r){const o=new Mn;o.position.set(r,s,0);const a=new ge(new tn(i,t,e),n);return a.position.y=-t/2,o.add(a),o}function Wb(i,t){const e=document.createElement("canvas"),n=e.getContext("2d"),s='600 40px "Pixelify Sans", monospace';n.font=s;const r=Math.ceil(n.measureText(i).width)+24;e.width=r,e.height=56,n.font=s,n.fillStyle="rgba(0,0,0,0.45)",n.fillRect(0,0,r,56),n.fillStyle=t,n.fillRect(0,52,r,4),n.fillStyle="#ffffff",n.textBaseline="middle",n.fillText(i,12,28);const o=new Ic(e);o.colorSpace=xn;const a=new dp(new Du({map:o,depthTest:!1,transparent:!0,toneMapped:!1}));return a.scale.set(.32*r/56,.32,1),a.position.y=2.25,a.renderOrder=10,a}class Nl{constructor(t,e,n,s){S(this,"group",new Mn);S(this,"target",new F);S(this,"light",{value:new F(1,1,1)});S(this,"sneaking",!1);S(this,"sleeping",!1);S(this,"targetYaw",0);S(this,"targetPitch",0);S(this,"yaw",0);S(this,"walkPhase",0);S(this,"swingTime",1);S(this,"body",new Mn);S(this,"head");S(this,"torso");S(this,"arms");S(this,"legs");S(this,"tag");S(this,"materials",[]);S(this,"held",null);S(this,"heldId",0);S(this,"armorMeshes",[]);S(this,"armorIds",[0,0,0,0]);this.name=t,this.items=s;const r=d=>{const m=new Mi(d);return this.materials.push(m),m},o=r({color:e}),a=r({color:Hb}),c=r({color:Mc}),{face:l,side:h}=Vb();this.body.scale.setScalar(.9),this.group.add(this.body),this.torso=new ge(new tn(.5,.75,.25),o),this.torso.position.y=1.125,this.body.add(this.torso),this.head=new Mn,this.head.position.y=1.5;const u=[r({map:h}),r({map:h}),r({color:Ks}),r({color:Mc}),r({color:Ks}),r({map:l})],f=new ge(new tn(.5,.5,.5),u);f.position.y=.25,this.head.add(f),this.body.add(this.head),this.arms=[Fa(.25,.75,.25,o,1.5,.375),Fa(.25,.75,.25,o,1.5,-.375)];for(const d of this.arms){const m=new ge(new tn(.251,.2,.251),c);m.position.y=-.65,d.add(m)}this.legs=[Fa(.25,.75,.25,a,.75,.125),Fa(.25,.75,.25,a,.75,-.125)],this.body.add(...this.arms,...this.legs),this.tag=Wb(t,e),this.group.add(this.tag),ji(this.body,this.light),this.target.set(...n),this.group.position.copy(this.target)}setTarget(t,e,n,s,r){this.target.set(t,e,n),this.targetYaw=s,this.targetPitch=r}swing(){this.swingTime=0}setHeld(t){if(t===this.heldId||(this.heldId=t,this.held&&(this.held.object.removeFromParent(),this.held.dispose(),this.held=null),!t))return;this.held=this.items.create(t);const e=this.held.object,n=this.items.isFlat(t);e.scale.setScalar(n?.55:.3),e.position.set(0,-.72,n?-.12:-.08),e.rotation.set(n?-Math.PI/2:0,n?Math.PI/2:Math.PI/4,0),this.arms[0].add(e)}setArmor(t){if(t.every((s,r)=>s===this.armorIds[r]))return;this.armorIds=[...t];for(const s of this.armorMeshes)s.removeFromParent(),s.geometry.dispose(),s.material.dispose();this.armorMeshes=[];const e=(s,r,o,a,c,l)=>{const h=new Mi({color:l}),u=new ge(new tn(r,o,a),h);u.position.y=c,s.add(u),this.armorMeshes.push(u)},n=s=>{var r,o;return((o=(r=ye(s))==null?void 0:r.armor)==null?void 0:o.color)??"#cccccc"};if(t[0]&&e(this.head,.58,.58,.58,.25,n(t[0])),t[1]){e(this.torso,.56,.8,.31,0,n(t[1]));for(const s of this.arms)e(s,.31,.4,.31,-.18,n(t[1]))}if(t[2])for(const s of this.legs)e(s,.29,.5,.29,-.28,n(t[2]));if(t[3])for(const s of this.legs)e(s,.3,.22,.3,-.66,n(t[3]));ji(this.body,this.light)}update(t){const e=this.group.position,n=e.x,s=e.z;e.distanceToSquared(this.target)>64?e.copy(this.target):e.lerp(this.target,1-Math.exp(-t*14));let r=this.targetYaw-this.yaw;r=Math.atan2(Math.sin(r),Math.cos(r)),this.yaw+=r*(1-Math.exp(-t*14)),this.group.rotation.y=this.yaw,this.head.rotation.x+=(this.targetPitch-this.head.rotation.x)*(1-Math.exp(-t*14));const o=Math.hypot(e.x-n,e.z-s),a=t>0?o/t:0;this.walkPhase+=o*2.6;const c=Math.min(1,a/4),l=Math.sin(this.walkPhase)*.8*c;this.legs[0].rotation.x=l,this.legs[1].rotation.x=-l,this.arms[0].rotation.x=-l*.8,this.arms[1].rotation.x=l*.8,this.swingTime=Math.min(1,this.swingTime+t/.3),this.swingTime<1&&(this.arms[0].rotation.x=-Math.sin(this.swingTime*Math.PI)*1.6),this.heldId&&this.swingTime>=1&&(this.arms[0].rotation.x-=.3),this.body.rotation.x=0,this.body.position.set(0,0,0),this.torso.rotation.x=this.sneaking?.45:0,this.head.position.y=this.sneaking?1.38:1.5,this.tag.position.y=this.sneaking?2:2.25,this.sleeping&&(this.body.rotation.x=-Math.PI/2,this.body.position.set(0,.3,.9)),this.held&&(this.held.color.value.copy(this.light.value),this.held.light.set(1,0))}dispose(){var t,e;this.group.traverse(n=>{var s;n instanceof ge&&!((s=this.held)!=null&&s.object.getObjectById(n.id))&&n.geometry.dispose()}),(t=this.held)==null||t.dispose();for(const n of this.materials)n.dispose();for(const n of this.armorMeshes)n.material.dispose();(e=this.tag.material.map)==null||e.dispose(),this.tag.material.dispose()}}const Qe=16;class zp{constructor(t=Qe,e=Qe){S(this,"px");this.width=t,this.height=e,this.px=new Uint8ClampedArray(t*e*4)}index(t,e){const n=this.width,s=this.height;return((Math.floor(e)%s+s)%s*n+(Math.floor(t)%n+n)%n)*4}set(t,e,n,s=255){const r=this.index(t,e);this.px[r]=n[0],this.px[r+1]=n[1],this.px[r+2]=n[2],this.px[r+3]=s}get(t,e){const n=this.index(t,e);return[this.px[n],this.px[n+1],this.px[n+2]]}getAlpha(t,e){return this.px[this.index(t,e)+3]}alpha(t,e,n){this.px[this.index(t,e)+3]=n}clear(){this.px.fill(0)}rect(t,e,n,s,r,o=255){for(let a=e;a<=s;a++)for(let c=t;c<=n;c++)this.set(c,a,r,o)}copyFrom(t){this.px.set(t.px)}}const k=i=>[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)],yn=(i,t)=>[i[0]*t,i[1]*t,i[2]*t],Ln=(i,t,e)=>[i[0]+(t[0]-i[0])*e,i[1]+(t[1]-i[1])*e,i[2]+(t[2]-i[2])*e];function Gp(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619);return t>>>0}function Uc(i){const t=document.createElement("canvas");return t.width=i.width,t.height=i.height,t.getContext("2d",{willReadFrequently:!0}).putImageData(new ImageData(new Uint8ClampedArray(i.px),i.width,i.height),0,0),t}function Hp(i){return new qp(i)}function Xb(){return new qp("herobrine")}const Cn=1/16,qs=64,Ba=.01,Vp=2.66,Yb=.8,zo=i=>i>0?i<1?i:1:0,Ad=(i,t,e)=>i>t?i<e?i:e:t;function ts(i,t){i.rotation.y=Ad(t.headYaw||0,-1.4,1.4),i.rotation.x=Ad(t.headPitch||0,-1.2,1.2)}function Zo(i,t=1){return Math.sin((i.walkPhase||0)*Vp)*Yb*t*zo(i.walkAmount)}function Oc(i,t){const e=Zo(t);i[0].rotation.x=-e,i[1].rotation.x=e,i[2].rotation.x=e,i[3].rotation.x=-e}function Ou(i){const t=i*20;return[Math.sin(t*.067)*.05,Math.cos(t*.09)*.05+.05]}const Wp=["right","left","top","bottom","back","front"];class Kb{constructor(t,e,n,s,r){this.u=t,this.v=e,this.w=n,this.h=s,this.d=r}face(t){const{u:e,v:n,w:s,h:r,d:o}=this;switch(t){case"top":return{x:e+o,y:n,w:s,h:o};case"bottom":return{x:e+o+s,y:n,w:s,h:o};case"right":return{x:e,y:n+o,w:o,h:r};case"front":return{x:e+o,y:n+o,w:s,h:r};case"left":return{x:e+o+s,y:n+o,w:o,h:r};case"back":return{x:e+2*o+s,y:n+o,w:s,h:r}}}}function ai(i,t){return(e,n)=>{var s;return t[((s=i[n])==null?void 0:s[e])??""]}}class qb{constructor(t){S(this,"tile",new zp(qs,qs));S(this,"shelves",[]);S(this,"bottom",0);this.rnd=t}box(t,e,n,s){const r=this.alloc(2*(t+n),e+n),o=new Kb(r.x,r.y,t,e,n);for(const a of Wp){const c=o.face(a);this.fill(c,(l,h)=>s(a,l,h,c.w,c.h))}return o}rect(t,e,n){const s=this.alloc(t,e),r={x:s.x,y:s.y,w:t,h:e};return this.fill(r,n),r}n(t,e=.1){return yn(t,1+(this.rnd()-.5)*e)}pick(t,e){let n=this.rnd()*e.reduce((s,r)=>s+r,0);for(let s=0;s<t.length;s++)if(n-=e[s],n<0)return t[s];return t[t.length-1]}alloc(t,e){let n=this.shelves.find(r=>e<=r.h&&r.x+t<=qs);if(!n){if(t>qs||this.bottom+e>qs)throw new Error("mobModels: texture atlas overflow");n={x:0,y:this.bottom,h:e},this.shelves.push(n),this.bottom+=e}const s={x:n.x,y:n.y};return n.x+=t,s}fill(t,e){for(let n=0;n<t.h;n++)for(let s=0;s<t.w;s++){const r=e(s,n);r&&this.tile.set(t.x+s,t.y+n,r)}}}function $b(i){const t=new Ic(Uc(i));return t.colorSpace=xn,t.magFilter=vn,t.minFilter=vn,t.generateMipmaps=!1,t}function Xp(i,t,e,n,s){i.setXY(t,(e.x+Ba+n*(e.w-2*Ba))/qs,1-(e.y+Ba+(1-s)*(e.h-2*Ba))/qs)}function Ft(i,t,e,n,s=0){const r=new tn((i.w+2*s)*Cn,(i.h+2*s)*Cn,(i.d+2*s)*Cn),o=r.getAttribute("uv");for(let a=0;a<6;a++){const c=i.face(Wp[a]);for(let l=a*4;l<a*4+4;l++)Xp(o,l,c,o.getX(l),o.getY(l))}return r.translate(t*Cn,e*Cn,n*Cn),r}function Yp(i,t,e,n){const s=new jo(i.w*Cn,i.h*Cn);s.rotateY(Math.PI);const r=s.getAttribute("uv");for(let o=0;o<r.count;o++)Xp(r,o,i,r.getX(o),r.getY(o));return s.translate(t*Cn,e*Cn,n*Cn),s}function he(...i){let t=0,e=0;for(const c of i)t+=c.getAttribute("position").count,e+=c.getIndex().count;const n={position:new Float32Array(t*3),normal:new Float32Array(t*3),uv:new Float32Array(t*2)},s=new Uint16Array(e);let r=0,o=0;for(const c of i){for(const h in n){const u=c.getAttribute(h);n[h].set(u.array,r*u.itemSize)}const l=c.getIndex().array;for(let h=0;h<l.length;h++)s[o+h]=l[h]+r;r+=c.getAttribute("position").count,o+=l.length,c.dispose()}const a=new qe;return a.setAttribute("position",new we(n.position,3)),a.setAttribute("normal",new we(n.normal,3)),a.setAttribute("uv",new we(n.uv,2)),a.setIndex(new we(s,1)),a.computeBoundingSphere(),a}const jb=new $t(1.8,1.8,1.8);class Zb{constructor(t,e,n){S(this,"materials",[]);S(this,"skin");this.root=t,this.map=e,this.skin=new Mi({map:e,alphaTest:n?.01:0,side:n?ii:qi,alphaHash:!0}),this.materials.push(this.skin)}part(t,e,n,s,r=this.root,o=this.skin){const a=new ge(t,o);return a.position.set(e*Cn,n*Cn,s*Cn),a.rotation.order="ZYX",a.castShadow=!0,r.add(a),a}glow(t=jb){const e=new nr({map:this.map,color:t,alphaTest:.5,alphaHash:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2});return this.materials.push(e),e}}function Fc(i,t,e,n,s,r){return[i.part(t,e,n,s),i.part(t,-e,n,s),i.part(t,e,n,r),i.part(t,-e,n,r)]}const Fu=k("#f4f1f1");function Jb(i){const t=k("#efa3a0"),e=k("#d98884"),n=k("#f6b6b2"),s=k("#b06a66"),r=ai(["","","","","wb....bw"],{w:Fu,b:k("#24181a")}),o=ai(["","n..n"],{n:k("#9a524f")}),a=i.box(8,8,8,(m,v,g)=>m==="front"&&r(v,g)||i.n(m==="bottom"?e:t,.08)),c=i.box(4,3,1,(m,v,g)=>m==="front"&&o(v,g)||i.n(n,.05)),l=i.box(10,8,16,(m,v,g,p,M)=>i.n(m==="bottom"||m!=="top"&&g===M-1?e:t,.08)),h=i.box(4,6,4,(m,v,g)=>i.n(m==="bottom"||g===5?s:t,.08)),u=he(Ft(a,0,0,-4),Ft(c,0,-1.5,-8.5)),f=he(Ft(l,0,0,0)),d=he(Ft(h,0,-3,0));return m=>{m.part(f,0,10,0);const v=m.part(u,0,12,-6),g=Fc(m,d,3,6,-5,7);return p=>{ts(v,p),Oc(g,p)}}}function Qb(i,t,e,n){const s=new Array(t*e).fill(!1);for(let r=0;r<n;r++){const o=i.rnd()*t,a=i.rnd()*e,c=1.5+i.rnd()*t*.3,l=1.5+i.rnd()*e*.3;for(let h=0;h<e;h++)for(let u=0;u<t;u++){const f=(u+.5-o)/c,d=(h+.5-a)/l;f*f+d*d<.85+i.rnd()*.3&&(s[h*t+u]=!0)}}return s}function tS(i){const t=k("#4f3b2b"),e=k("#3b2b1f"),n=k("#e7e5e0"),s=k("#d8cfb8"),r=k("#eaa3a1"),o=k("#4a433d"),a=ai(["BBBWWBBB","BBWWWWBB","BBBWWBBB","wkBWWBkw","BBBBBBBB","BmmmmmmB","BmnmmnmB","BmmmmmmB"],{B:t,W:n,w:Fu,k:k("#141010"),m:k("#c9b0a0"),n:k("#5e4940")}),c=new Map,l=(_,T)=>(w,b,C,x,y)=>{const R=_+w;let P=c.get(R);return P||c.set(R,P=Qb(i,x,y,w==="bottom"?T+2:T)),P[C*x+b]?i.n(n,.05):i.n(i.rnd()<.15?e:t,.08)},h=l("head",1),u=i.box(8,8,6,(_,T,w,b,C)=>_==="front"?a(T,w)??i.n(t,.08):_==="top"&&(T===3||T===4)&&w<3?i.n(n,.05):h(_,T,w,b,C)),f=i.box(1,3,1,(_,T,w)=>i.n(w===0?yn(s,.75):s,.05)),d=i.box(12,10,18,l("body",3)),m=i.box(4,1,6,(_,T,w)=>i.n(_==="bottom"&&(T===0||T===3)&&(w===1||w===4)?yn(r,.82):r,.05)),v=l("leg",1),g=i.box(4,12,4,(_,T,w,b,C)=>_==="bottom"||w>=10?i.n(o,.08):v(_,T,w,b,C)),p=he(Ft(u,0,0,-3),Ft(f,4.5,3.5,-3.5),Ft(f,-4.5,3.5,-3.5)),M=he(Ft(d,0,0,0),Ft(m,0,-5.5,6)),E=he(Ft(g,0,-6,0));return _=>{_.part(M,0,17,1);const T=_.part(p,0,20,-8),w=Fc(_,E,4,12,-6,7);return b=>{ts(T,b),Oc(w,b)}}}function eS(i){const t=k("#ebe8e1"),e=k("#d6d2c9"),n=k("#f7f5f0"),s=k("#d6b8a3"),r=k("#c09f89"),o=k("#c3b1a1"),a=k("#6f6159"),c=ai(["","","wb..bw","","..pp..","..mm.."],{w:Fu,b:k("#1a1414"),p:k("#d79c94"),m:k("#a2827a")}),l=()=>{const M=i.rnd();return i.n(M<.14?e:M>.88?n:t,.05)},h=i.box(8,6,16,M=>i.n(M==="bottom"?r:s,.06)),u=i.box(8,6,16,l),f=i.box(4,12,4,(M,E,_)=>i.n(M==="bottom"||_===11?a:s,.06)),d=i.box(4,6,4,l),m=i.box(6,6,8,(M,E,_)=>M==="front"&&c(E,_)||i.n(o,.06)),v=i.box(6,6,6,l),g={body:he(Ft(h,0,0,0),Ft(u,0,0,0,1.75)),head:he(Ft(m,0,1,-2),Ft(v,0,1,-1,.6)),leg:he(Ft(f,0,-6,0),Ft(d,0,-3,0,.5))},p={body:he(Ft(h,0,0,0)),head:he(Ft(m,0,1,-2)),leg:he(Ft(f,0,-6,0))};return M=>{const E=M.part(g.body,0,15,0),_=M.part(g.head,0,18,-8),T=Fc(M,g.leg,3,12,-5,7);return w=>{const b=w.sheared?p:g;E.geometry=b.body,_.geometry=b.head;for(const C of T)C.geometry=b.leg;ts(_,w),Oc(T,w)}}}function nS(i){const t=k("#f4f4f2"),e=k("#d8d8d4"),n=k("#f5b01c"),s=k("#d68712"),r=k("#d42a1e"),o=k("#e3892a"),a=k("#141414"),c=()=>i.n(i.rnd()<.1?e:t,.05),l=i.box(4,6,3,(_,T,w,b)=>w===1&&(_==="front"&&(T===0||T===b-1)||_==="right"&&T===b-1||_==="left"&&T===0)?a:c()),h=i.box(4,2,2,(_,T,w)=>i.n(_==="bottom"||_!=="top"&&w===1?s:n,.05)),u=i.box(2,2,2,(_,T,w)=>i.n(_==="bottom"||w===1?yn(r,.8):r,.05)),f=i.box(6,6,8,(_,T,w)=>_==="bottom"||_==="back"&&w<3&&T>0&&T<5&&(T+w)%2===0?i.n(e,.05):c()),d=i.box(1,4,6,(_,T,w,b,C)=>_==="top"||_==="bottom"?c():i.n(w===C-1||w===C-2&&T%2===(_==="right"?0:1)&&b>1?e:t,.05)),m=i.box(1,5,1,()=>i.n(o,.06)),v=i.box(3,1,2,_=>i.n(_==="top"?o:yn(o,.88),.06)),g=he(Ft(l,0,3,-.5),Ft(h,0,3,-3),Ft(u,0,1,-2)),p=he(Ft(f,0,0,0)),M=he(Ft(d,0,-2,0)),E=he(Ft(m,0,-2.5,0),Ft(v,0,-4.5,-.5));return _=>{_.part(p,0,8,0);const T=_.part(g,0,9,-4),w=[_.part(M,3.5,11,0),_.part(M,-3.5,11,0)],b=[_.part(E,1.5,5,-.5),_.part(E,-1.5,5,-.5)],C=Math.random()*7;return x=>{ts(T,x);const y=Zo(x,1.2);b[0].rotation.x=y,b[1].rotation.x=-y;const R=(((x.time||0)+C)%7+7)%7,P=R<.8?Math.sin(R/.8*Math.PI):0,B=Math.max(P,zo(x.walkAmount)*.35)*(.5+.5*Math.sin((x.time||0)*28))*1.1;w[0].rotation.z=B,w[1].rotation.z=-B}}}function iS(i){const t=k("#5c8e42"),e=k("#4a7535"),n=k("#3d6230"),s=k("#2e9b9b"),r=k("#247c7d"),o=k("#46409a"),a=k("#36307b"),c=k("#3d3d44"),l=ai(["hhhhhhhh","h......h","","",".kk..kk.","...nn...","..mmmm.."],{h:n,k:k("#141812"),n:k("#436b31"),m:k("#2e4a23")}),h=i.box(8,8,8,(M,E,_)=>M==="front"?l(E,_)??i.n(t,.08):M==="top"?i.n(n,.1):M==="bottom"?i.n(e,.08):M==="back"?i.n(_<3?n:e,.08):i.n(_<2||_===2&&i.rnd()<.5?n:t,.08)),u=i.box(8,12,4,(M,E,_)=>M==="front"&&_===0&&(E===3||E===4)?i.n(t,.06):i.n(i.rnd()<.1?r:s,.08)),f=i.box(4,12,4,(M,E,_)=>i.n(M==="bottom"||_===11?e:t,.08)),d=i.box(4,12,4,(M,E,_)=>i.n(M==="bottom"||_>=11?c:i.rnd()<.1?a:o,.08)),m=he(Ft(h,0,4,0)),v=he(Ft(u,0,0,0)),g=he(Ft(f,0,-4,0)),p=he(Ft(d,0,-6,0));return M=>{M.part(v,0,18,0);const E=M.part(m,0,24,0),_=[M.part(g,6,22,0),M.part(g,-6,22,0)],T=[M.part(p,1.9,12,0),M.part(p,-1.9,12,0)];return w=>{ts(E,w);const b=Zo(w);T[0].rotation.x=b,T[1].rotation.x=-b;const C=w.attackTime>=0&&w.attackTime<.3?w.attackTime/.3:0,x=Math.sin(C*Math.PI),y=Math.sin((1-(1-C)*(1-C))*Math.PI),[R,P]=Ou(w.time||0),N=1.48-x*1.2+y*.4,B=.1-x*.6;_[0].rotation.set(N+R-b*.15,B,P),_[1].rotation.set(N-R+b*.15,-B,-P)}}}function sS(i){const t=k("#c6c6c6"),e=k("#dedede"),n=k("#9a9a9a"),s=k("#7a5332"),r=ai(["","","",".kk..kk.",".kk..kk.","...nn...",".dldldl.","jjjjjjjj"],{k:k("#222222"),n:k("#4a4a4a"),d:k("#3a3a3a"),l:e,j:n}),o=i.box(8,8,8,(_,T,w)=>_==="front"&&r(T,w)||i.n(i.rnd()<.08?n:t,.07)),a=_=>_===0||_===2||_===4||_===6||_>=10,c=i.box(8,12,4,(_,T,w)=>_==="top"||_==="bottom"?i.n(t,.07):(_==="front"||_==="back")&&(T===3||T===4)||a(w)?i.n(w>=10?n:t,.07):null),l=i.box(2,12,2,(_,T,w)=>_==="bottom"||w===5||w===11?i.n(n,.06):i.n(T===0&&_!=="top"?e:t,.06)),h=i.box(1,5,1,(_,T,w)=>i.n(w===0||w===4?s:k("#4d3420"),.06)),u=i.box(1,3,1,()=>i.n(s,.08)),f=i.box(1,2,2,()=>i.n(k("#9c6c3e"),.06)),d=i.box(1,15,1,()=>i.n(k("#e6e6e6"),.04)),m=he(Ft(h,0,0,-.5),Ft(u,0,4,.5),Ft(u,0,-4,.5),Ft(f,0,6.5,2),Ft(f,0,-6.5,2),Ft(d,0,0,3.2,-.3));m.rotateX(-Math.PI/2),m.translate(0,-10*Cn,0);const v=he(Ft(o,0,4,0)),g=he(Ft(c,0,0,0)),p=he(Ft(l,0,-4,0)),M=he(Ft(l,0,-4,0),m),E=he(Ft(l,0,-6,0));return _=>{_.part(g,0,18,0);const T=_.part(v,0,24,0),w=[_.part(M,5,22,0),_.part(p,-5,22,0)],b=[_.part(E,2,12,0),_.part(E,-2,12,0)];return C=>{ts(T,C);const x=Zo(C);b[0].rotation.x=x,b[1].rotation.x=-x;const[y,R]=Ou(C.time||0),P=C.attackTime>=0&&C.attackTime<.25?1-C.attackTime/.25:0,N=Math.PI/2+T.rotation.x;w[0].rotation.set(N+y+P*.25,.1+T.rotation.y,R),w[1].rotation.set(N-y,-.5+T.rotation.y,-R)}}}function rS(i){const t=["#4b9a41","#5fae54","#7cc370","#367a2f","#245a20","#a6d69b","#c5cfc2","#3f8b37"].map(k),e=[24,20,13,16,8,8,5,6],n=()=>i.n(i.pick(t,e),.06),s=k("#0f0f0f"),r=k("#262626"),o=ai(["","",".##..##.",".##..##.","...##...","..####..","..####..","..#..#.."],{"#":s}),a=i.box(8,8,8,(d,m,v)=>d==="front"&&o(m,v)&&(i.rnd()<.2?r:s)||n()),c=i.box(8,12,4,n),l=i.box(4,6,4,d=>d==="bottom"?i.n(t[4],.1):n()),h=he(Ft(a,0,4,0)),u=he(Ft(c,0,0,0)),f=he(Ft(l,0,-3,0));return d=>{d.part(u,0,12,0);const m=d.part(h,0,18,0),v=Fc(d,f,2,6,-4,4);return g=>{ts(m,g),Oc(v,g)}}}const Rd=[2,1,0,-1],oS=[Math.PI/4,Math.PI/8,-Math.PI/8,-Math.PI/4],Cd=[-Math.PI/4,-.5812,-.5812,-Math.PI/4],Ld=[0,Math.PI,Math.PI/2,Math.PI*1.5];function aS(i){const t=k("#2d2621"),e=k("#1c1815"),n=k("#4b3d32"),s=k("#5e4736"),r={E:k("#d01b16"),H:k("#ff5a40"),e:k("#b01412")},o=ai(["","","...ee...",".HE..HE.","eEE..EEe"],r),a=ai(["","","","","","","..f..f..","..f..f.."],{f:k("#6b5a4a")}),c=ai(["","....mm....","...m..m...","..m.mm.m..","....mm....",".m..mm..m.","..m.mm.m..","....mm....","...m..m...","..m....m.."],{m:s}),l=()=>{const _=i.rnd();return i.n(_<.16?n:_<.4?e:t,.12)},h=i.box(8,8,8,(_,T,w)=>_==="front"&&(o(T,w)||a(T,w))||l()),u=i.box(6,6,6,l),f=i.box(10,8,12,(_,T,w)=>_==="top"&&c(T,w)&&i.n(s,.1)||l()),d=i.box(16,2,2,(_,T)=>i.n(T%5===4?n:i.rnd()<.3?e:t,.12)),m=i.rect(8,8,(_,T)=>o(_,T)??null),v=he(Ft(h,0,0,-4)),g=Yp(m,0,0,-8.05),p=he(Ft(u,0,0,0),Ft(f,0,0,9)),M=he(Ft(d,7,0,0)),E=he(Ft(d,-7,0,0));return _=>{_.part(p,0,9,0);const T=_.part(v,0,9,-3);_.part(g,0,0,0,T,_.glow()).castShadow=!1;const w=Rd.map(C=>_.part(M,4,9,C)),b=Rd.map(C=>_.part(E,-4,9,C));return C=>{ts(T,C);const x=zo(C.walkAmount),y=(C.walkPhase||0)*Vp,R=C.attackTime>=0&&C.attackTime<.4?Math.sin(C.attackTime/.4*Math.PI):0;T.rotation.x+=R*.35;for(let P=0;P<4;P++){const N=oS[P]-Math.cos(y*2+Ld[P])*.4*x,B=Math.abs(Math.sin(y+Ld[P]))*.4*x+R*(P===3?1.1:P===2?.5:0);w[P].rotation.set(0,-N,Cd[P]+B),b[P].rotation.set(0,N,-Cd[P]-B)}}}}const cS=new $t(4,4,4);function lS(i){const t=k("#b5876c"),e=k("#9a6f57"),n=k("#3a2416"),s=k("#4a2f1d"),r=k("#1f9d9e"),o=k("#178182"),a=k("#3b3a97"),c=k("#2d2c78"),l=k("#4a4950"),h=k("#ffffff"),u=ai(["","","","",".ww..ww."],{w:h}),f=ai(["hhhhhhhh","hHhhhhHh","h......h","","","...nn...","..mmmm.."],{h:n,H:s,n:k("#8e6450"),m:k("#6b4434")}),d=i.box(8,8,8,(b,C,x)=>b==="front"?u(C,x)??f(C,x)??i.n(t,.06):b==="top"?i.n(i.rnd()<.2?s:n,.1):b==="bottom"?i.n(e,.06):b==="back"?i.n(x<6?n:e,.08):i.n(x<2||x===2&&C>1?n:t,.07)),m=i.box(8,12,4,(b,C,x)=>b==="front"&&x===0&&C>=3&&C<=4?i.n(t,.05):i.n(i.rnd()<.12?o:r,.07)),v=i.box(4,12,4,(b,C,x)=>b==="bottom"?i.n(e,.06):i.n(x<4&&b!=="top"||b==="top"?r:x===11?e:t,.07)),g=i.box(4,12,4,(b,C,x)=>i.n(b==="bottom"||x>=10?l:i.rnd()<.1?c:a,.07)),p=i.rect(8,8,(b,C)=>u(b,C)??null),M=he(Ft(d,0,4,0)),E=Yp(p,0,4,-4.05),_=he(Ft(m,0,0,0)),T=he(Ft(v,0,-4,0)),w=he(Ft(g,0,-6,0));return b=>{b.part(_,0,18,0);const C=b.part(M,0,24,0);b.part(E,0,0,0,C,b.glow(cS)).castShadow=!1;const x=[b.part(T,6,22,0),b.part(T,-6,22,0)],y=[b.part(w,1.9,12,0),b.part(w,-1.9,12,0)];return R=>{ts(C,R);const P=Zo(R);y[0].rotation.x=P,y[1].rotation.x=-P;const[N,B]=Ou(R.time||0);x[0].rotation.set(-P*.6+N*.4,0,B*.3),x[1].rotation.set(P*.6-N*.4,0,-B*.3)}}}const Kp={pig:{height:1,lift:5,build:Jb},cow:{height:1.5,lift:6,build:tS},sheep:{height:1.4,lift:5,build:eS},chicken:{height:.95,lift:3,build:nS},zombie:{height:2,lift:4,build:iS},skeleton:{height:2,lift:4,cutout:!0,build:sS},creeper:{height:1.65,lift:4,build:rS},spider:{height:.85,lift:5,build:aS},herobrine:{height:2,lift:4,build:lS}},Dd=new Map;function hS(i){let t=Dd.get(i);if(!t){const e=new qb(ao(Gp(`mob:${i}`))),n=Kp[i].build(e);t={map:$b(e.tile),rig:n},Dd.set(i,t)}return t}const uS={walkPhase:0,walkAmount:0,headYaw:0,headPitch:0,attackTime:1/0,fuse:0,sheared:!1,hurt:!1,death:0,time:0};class qp{constructor(t){S(this,"group",new Mn);S(this,"height");S(this,"root",new Mn);S(this,"kind");S(this,"rig");S(this,"animate");S(this,"swells");S(this,"flashPhase",0);S(this,"fade",1);S(this,"glowFade",1);this.kind=Kp[t],this.height=this.kind.height,this.swells=t==="creeper";const e=hS(t);this.group.name=`mob:${t}`,this.group.add(this.root),this.rig=new Zb(this.root,e.map,this.kind.cutout===!0),this.animate=e.rig(this.rig),this.update(0,uS)}update(t,e){this.animate(e,t);const n=zo(e.death),s=n>0?Math.min(1,Math.sqrt(n*1.6))*(Math.PI/2):0;this.root.rotation.z=s,this.root.position.y=Math.sin(s)*this.kind.lift*Cn;let r=0;if(this.swells){const c=zo(e.fuse),l=c*c,h=1+Math.sin(c*100)*c*.01,u=(1+l*.22)*h;if(this.root.scale.set(u,(1+l*.1)/h,u),c>0){const f=Number.isFinite(t)&&t>0?t:0;this.flashPhase=(this.flashPhase+f*(2+10*c))%1,this.flashPhase>=.5&&(r=.35+.4*c)}else this.flashPhase=0}const o=this.rig.skin;e.hurt||n>0?(o.color.setRGB(1.2,.5,.5),o.emissive.setRGB(.22,.01,.01)):r>0?(o.color.setScalar(1+r),o.emissive.setScalar(r)):(o.color.setScalar(1),o.emissive.setScalar(0));const a=n>.7?1-(n-.7)/.3:1;for(const c of this.rig.materials)c.opacity=a*(c instanceof nr?this.glowFade:this.fade)}dispose(){this.group.removeFromParent();for(const t of this.rig.materials)t.dispose()}}const za=i=>Math.atan2(Math.sin(i),Math.cos(i));class fS{constructor(t,e,n,s,r){S(this,"visuals",new Map);S(this,"time",0);S(this,"stareAt",null);S(this,"stareUntil",0);this.scene=t,this.items=e,this.world=n,this.particles=s,this.lightFn=r}get count(){return this.visuals.size}get(t){return this.visuals.get(t)}spawn(t){var l,h;const e=this.visuals.get(t.id);if(e){t.item&&e.info.item&&(t.item.count!==e.info.item.count||t.item.id!==e.info.item.id)&&(e.info.item=t.item),e.target.set(...t.p);return}const n={value:new F(1,1,1)};let s,r,o,a,c;switch(t.kind){case"mob":{r=Hp(t.type),s=r.group,ji(s,n);break}case"item":{const u=((l=t.item)==null?void 0:l.id)??A.STONE;o=this.items.create(u);const f=new Mn,d=this.items.isFlat(u);o.object.scale.setScalar(d?.42:.26),o.object.position.y=d?.22:.16,f.add(o.object),(((h=t.item)==null?void 0:h.count)??1)>1&&(a=this.items.create(u),a.object.scale.copy(o.object.scale),a.object.position.set(.06,o.object.position.y+.04,.05),f.add(a.object)),s=f;break}case"tnt":case"falling":{const u=t.kind==="tnt"?A.TNT:t.state??A.SAND;o=this.items.create(Lt(u),u);const f=new Mn;o.object.position.y=.5,f.add(o.object),t.kind==="tnt"&&(c=new ge(new tn(1.01,1.01,1.01),new nr({color:"#ffffff",transparent:!0,opacity:0})),c.position.y=.5,f.add(c)),s=f;break}default:{const u=new Mn,f=new ge(new tn(.05,.05,.55),new Mi({color:"#8b6a3e"})),d=new ge(new tn(.07,.07,.08),new Mi({color:"#9a9a9a"}));d.position.z=-.3;const m=new ge(new tn(.12,.12,.12),new Mi({color:"#e8e8e8"}));m.position.z=.25,u.add(f,d,m),ji(u,n),s=u}}s.position.set(...t.p),this.scene.add(s),this.visuals.set(t.id,{info:t,object:s,target:new F(...t.p),targetYaw:t.yaw,targetPitch:t.pitch??0,yaw:t.yaw,pitch:t.pitch??0,flags:t.flags??0,mob:r,item:o,extra:a,light:n,walkPhase:0,walkAmount:0,attackTime:1/0,fuse:0,fuseActive:!1,death:0,hurt:0,spawnTime:this.time,flash:c})}move(t){for(let e=0;e+6<t.length;e+=7){const n=this.visuals.get(t[e]);if(!n)continue;n.target.set(t[e+1],t[e+2],t[e+3]),n.targetYaw=t[e+4],n.targetPitch=t[e+5];const s=t[e+6];s&hf&&!(n.flags&hf)&&(n.hurt=.4),s&uf&&!(n.flags&uf)&&(n.attackTime=0),n.flags=s,n.info.kind==="tnt"&&(n.fuse=s/10)}}event(t,e,n){const s=this.visuals.get(t);s&&(e==="hurt"?s.hurt=.4:e==="death"?(s.hurt=.4,s.death=1e-4):e==="attack"?s.attackTime=0:e==="fuse"&&(s.fuseActive=n===1))}remove(t,e){for(const n of t){const s=this.visuals.get(n);if(s){if(e&&s.info.kind==="item"){s.pickup={to:e,t:0};continue}if(s.info.kind==="mob"&&s.death>0){const[r,o]=ea[s.info.type]??[.6,1];this.particles.puff(s.object.position.x,s.object.position.y+o/2,s.object.position.z,14,r,[.8,.8,.8],1.5)}this.dispose(n,s)}}}dispose(t,e){var s,r,o;this.scene.remove(e.object),(s=e.mob)==null||s.dispose(),(r=e.item)==null||r.dispose(),(o=e.extra)==null||o.dispose();const n=new Set;e.item&&e.item.object.traverse(a=>n.add(a)),e.extra&&e.extra.object.traverse(a=>n.add(a)),e.object.traverse(a=>{const c=a;c.isMesh&&!e.mob&&!n.has(c)&&(c.geometry.dispose(),c.material.dispose())}),this.visuals.delete(t)}clear(){for(const[t,e]of this.visuals)this.dispose(t,e)}stare(t,e){this.stareAt=t,this.stareUntil=this.time+e}mobsNear(t,e){let n=0;for(const s of this.visuals.values())s.info.kind==="mob"&&s.death===0&&s.object.position.distanceToSquared(t)<e*e&&n++;return n}update(t){var e;this.time+=t,new F;for(const[n,s]of this.visuals){const r=s.object.position;if(s.pickup){s.pickup.t+=t/.15,r.lerp(s.pickup.to(),Math.min(1,s.pickup.t)),s.pickup.t>=1&&this.dispose(n,s);continue}const o=r.x,a=r.z,c=this.stareAt,l=c!==null&&this.time<this.stareUntil&&s.info.kind==="mob"&&s.death===0&&r.distanceToSquared(c)<1024;let h=0;if(l){const f=c.x-r.x,d=c.z-r.z;s.yaw+=za(Math.atan2(-f,-d)-s.yaw)*(1-Math.exp(-t*2.5)),s.pitch+=za(0-s.pitch)*(1-Math.exp(-t*5)),h=Math.atan2(c.y-(r.y+(((e=s.mob)==null?void 0:e.height)??1)*.85),Math.hypot(f,d))}else r.distanceToSquared(s.target)>64?r.copy(s.target):r.lerp(s.target,1-Math.exp(-t*12)),s.yaw+=za(s.targetYaw-s.yaw)*(1-Math.exp(-t*10)),s.pitch+=za(s.targetPitch-s.pitch)*(1-Math.exp(-t*10));const u=this.world.getLight(Math.floor(r.x),Math.floor(r.y+.5),Math.floor(r.z));switch(this.lightFn(u,s.light.value),s.item&&(s.item.light.set((u>>4)/15,(u&15)/15),s.item.color.value.copy(s.light.value),s.extra&&(s.extra.light.copy(s.item.light),s.extra.color.value.copy(s.light.value))),s.info.kind){case"mob":{const f=Math.hypot(r.x-o,r.z-a);if(s.walkPhase+=f,s.walkAmount+=(Math.min(1,f/Math.max(t,.001)/3)-s.walkAmount)*Math.min(1,t*8),s.hurt=Math.max(0,s.hurt-t),s.attackTime+=t,s.death>0&&(s.death=Math.min(1,s.death+t)),s.fuseActive?s.fuse=Math.min(1,s.fuse+t/1.5):s.fuse=Math.max(0,s.fuse-t/1.5),s.object.rotation.y=s.yaw,s.mob.update(t,{walkPhase:s.walkPhase,walkAmount:s.walkAmount,headYaw:s.pitch,headPitch:h,attackTime:s.attackTime,fuse:s.fuse,sheared:(s.flags&gg)!==0,hurt:s.hurt>0,death:s.death,time:this.time}),s.flags&mg&&Math.random()<t*20){const[d,m]=ea[s.info.type];this.particles.puff(r.x,r.y+Math.random()*m,r.z,1,d,[2.4,1.1,.3],.8)}break}case"item":{const f=this.time-s.spawnTime,d=s.object.children;for(const m of d)m.rotation.y=f*1.6;s.object.position.y=r.y+Math.sin(f*2.5)*.06,r.y=s.object.position.y,s.object.position.y=s.target.y+(r.y-s.target.y);break}case"tnt":{if(s.fuse=Math.max(0,s.fuse-t),s.flash){const f=Math.floor(s.fuse*(s.fuse<1?10:4))%2===0;s.flash.material.opacity=f?.55:0;const d=1+(s.fuse<.4?(.4-s.fuse)*.6:0);s.object.scale.setScalar(d)}Math.random()<t*30&&this.particles.puff(r.x,r.y+1.1,r.z,1,.1,[.5,.5,.5],.5);break}case"arrow":s.object.rotation.set(s.pitch,s.yaw,0,"YXZ");break}}}raycast(t,e,n){let s=null;for(const[r,o]of this.visuals){if(o.info.kind!=="mob"||o.death>0)continue;const[a,c]=ea[o.info.type]??[.6,1.8],l=o.object.position,h=dS(t,e,l.x-a/2,l.y,l.z-a/2,l.x+a/2,l.y+c,l.z+a/2);h!==null&&h<=n&&(!s||h<s.dist)&&(s={id:r,dist:h})}return s}blocksCell(t,e,n){for(const s of this.visuals.values()){if(s.info.kind!=="mob"||s.death>0)continue;const[r,o]=ea[s.info.type]??[.6,1.8],a=s.object.position;if(a.x+r/2>t&&a.x-r/2<t+1&&a.y+o>e&&a.y<e+1&&a.z+r/2>n&&a.z-r/2<n+1)return!0}return!1}isMob(t){const e=this.visuals.get(t);return(e==null?void 0:e.info.kind)==="mob"?e.info.type:null}static particleLayer(t){return bs(t)?Nn[t*384]:-1}}function dS(i,t,e,n,s,r,o,a){let c=0,l=1/0;const h=[e,n,s],u=[r,o,a],f=[i.x,i.y,i.z],d=[t.x,t.y,t.z];for(let m=0;m<3;m++){if(Math.abs(d[m])<1e-9){if(f[m]<h[m]||f[m]>u[m])return null;continue}let v=(h[m]-f[m])/d[m],g=(u[m]-f[m])/d[m];if(v>g&&([v,g]=[g,v]),c=Math.max(c,v),l=Math.min(l,g),c>l)return null}return c}const Ga=1.72,nu=["выкл","иногда","часто","постоянно"],pS=[1,1.8,1,.5],Ha="Herobrine",mS="#ffffff",gS=["я вижу тебя","обернись","ты здесь не один","зачем ты сюда пришёл","не спи","я всегда был здесь","уходи","мне нравится смотреть, как ты строишь","почему ты не смотришь на меня","это мой мир","не копай слишком глубоко","ты слышишь шаги?","помоги мне","ещё не поздно уйти","я за деревом","...","{name}","{name}, я рядом","{name}, посмотри назад"],vS=["ОН ЗДЕСЬ","ты не один","Herobrine смотрит на тебя","не оборачивайся","не выключай свет","он ближе, чем ты думаешь"],_S=["ОН ЗДЕСЬ","НЕ СПИ","Я ВИЖУ ТЕБЯ","БЕГИ"],ce=(i,t)=>i+Math.random()*(t-i),Ul=i=>Ke[i]!==0||Hr[i]!==0&&Rc[i]>0,Va=i=>i[Math.floor(Math.random()*i.length)],Pd=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};function Id(i){for(;i.length;){let t=Math.random()*i.reduce((n,[s])=>n+s,0),e=0;for(;e<i.length-1&&(t-=i[e][0])>0;)e++;if(i[e][1]())return!0;i.splice(e,1)}return!1}function kd(i,t){let e="";for(const n of i){if(e+=n,n===" ")continue;const s=Math.floor(Math.random()*t);for(let r=0;r<s;r++)e+=String.fromCharCode(768+Math.floor(Math.random()*112))}return e}function xS(){const i=["hhhhhhhh","hHhhhhHh","h......h","........",".ww..ww.","...nn...","..mmmm..","........"],t={h:[40,24,14],H:[58,36,22],".":[150,104,84],w:[255,255,255],n:[112,74,58],m:[70,38,30]},e=document.createElement("canvas");e.width=e.height=8;const n=e.getContext("2d");return n&&i.forEach((s,r)=>[...s].forEach((o,a)=>{const[c,l,h]=t[o],u=o==="w"?1:.85+Math.random()*.2;n.fillStyle=`rgb(${c*u},${l*u},${h*u})`,n.fillRect(a,r,1,1)})),e}function MS(){const i=document.createElement("canvas");i.width=i.height=32;const t=i.getContext("2d");if(t){const e=t.createRadialGradient(16,16,0,16,16,16);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.45)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,32,32)}return new Ic(i)}class yS{constructor(t){S(this,"ghost",null);S(this,"level",2);S(this,"clock",0);S(this,"nextEvent",ce(25,45));S(this,"nextHero",0);S(this,"nextAmbient",ce(20,40));S(this,"nextFace",300);S(this,"seenHim",!1);S(this,"heroFails",0);S(this,"hero",null);S(this,"model");S(this,"light",{value:new F(1,1,1)});S(this,"halo");S(this,"pose",{walkPhase:0,walkAmount:0,headYaw:0,headPitch:0,attackTime:1/0,fuse:0,sheared:!1,hurt:!1,death:0,time:0});S(this,"timers",[]);S(this,"dread",0);S(this,"dreadLevel",0);S(this,"dreadHold",0);S(this,"glitch",0);S(this,"glitchHold",0);S(this,"flickerLen",0);S(this,"flickerT",0);S(this,"flickerK",1);S(this,"flickerNext",0);S(this,"torchBase");S(this,"wasNight",!1);S(this,"wasSleeping",!1);S(this,"flashEl",null);S(this,"flashTimer",0);S(this,"face",null);S(this,"eye",new F);S(this,"fwd",new F);S(this,"ndc",new F);S(this,"sky",15);S(this,"blk",0);S(this,"underground",!1);S(this,"indoors",!1);S(this,"events",{watch:()=>this.watch(!1),cave:()=>this.watch(!0),approach:()=>this.approach(),eyes:()=>this.eyes(),behind:()=>this.behind(),wake:()=>this.wakeScare(),turn:()=>this.turnAround(),face:()=>this.faceEvent(),join:()=>this.fakeJoin(),chat:()=>this.creepyChat(),stare:()=>this.mobStare(),flicker:()=>this.flicker(),fog:()=>this.fogRoll(),steps:()=>this.footsteps(),knock:()=>this.knock(),door:()=>this.doors(),scream:()=>this.scream(),musicbox:()=>this.musicBox(),whisper:()=>this.whisper(),static:()=>this.staticBurst(),blood:()=>this.bloodMoon()});this.host=t,this.torchBase=t.torchLight.clone(),this.model=Xb(),ji(this.model.group,this.light),this.halo=new Du({map:MS(),blending:cc,depthWrite:!1,transparent:!0,opacity:0});for(const e of[-1,1]){const n=new dp(this.halo);n.position.set(e*2/16,Ga,-4.6/16),n.scale.setScalar(.6),this.model.group.add(n)}this.model.group.visible=!1,t.scene.add(this.model.group)}get isEnabled(){return this.level>0}get enabled(){return this.level>0}get pace(){return pS[this.level]}setLevel(t){if(t=Math.max(0,Math.min(nu.length-1,Math.round(t)||0)),t!==this.level){if(this.level=t,t>0){this.nextEvent=this.clock+ce(25,45)*this.pace,this.nextHero=Math.min(this.nextHero,this.nextEvent);return}this.vanish(!1),this.timers=[],this.ghost=null,this.host.env.fogTarget=0,this.host.env.bloodTarget=0,this.flickerLen=0,this.host.torchLight.copy(this.torchBase),this.flashEl&&(this.flashEl.hidden=!0)}}trigger(t){this.sense();const e=this.events[t];return!!e&&e()}update(t){const e=this.host;this.sense(),this.hero&&!e.player.alive&&this.vanish(!1),this.enabled&&e.playing()&&e.player.alive&&(this.clock+=t,this.runTimers(),this.updateSleep(),this.updateBloodMoon(),this.hero?this.updateHero(t):this.clock>=this.nextEvent&&!e.player.sleeping&&this.startEvent(),this.updateAmbient()),this.updateFlicker(t),this.hero&&this.poseHero(t),this.updateEffects(t)}after(t,e){this.timers.push({at:this.clock+t,fn:e})}runTimers(){if(!this.timers.length)return;const t=this.timers.filter(e=>e.at<=this.clock);if(t.length){this.timers=this.timers.filter(e=>e.at>this.clock);for(const e of t)e.fn()}}cooldown(){const t=this.host.env;let e=1;return t.night>.5&&(e*=.75),t.bloodTarget>0&&(e*=.6),t.fogTarget>0&&(e*=.8),this.underground&&(e*=.85),ce(25,55)*e*this.pace}startEvent(){if(this.nextEvent=this.clock+this.cooldown(),this.clock>=this.nextHero){if(this.heroEvent()){this.heroFails=0;return}if(++this.heroFails<8){this.nextEvent=this.clock+6;return}this.heroFails=0}const t=this.host.env,e=t.night>.5,n=[],s=(r,o)=>{r>0&&n.push([r,o])};s(e&&this.clock>=this.nextFace?.6:0,()=>this.faceEvent()),s(this.ghost?0:2,()=>this.fakeJoin()),s(1.2,()=>this.creepyChat()),s(1.5,()=>this.mobStare()),s(this.blk>=6?2.5:0,()=>this.flicker()),s(!this.underground&&t.fogTarget===0?1.2:0,()=>this.fogRoll()),s(2,()=>this.footsteps()),s(this.indoors||this.underground?2.5:1,()=>this.knock()),s(1.5,()=>this.doors()),s(e||this.underground?1.2:.4,()=>this.scream()),s(e||this.underground||this.indoors?1:.3,()=>this.musicBox()),s(1.5,()=>this.whisper()),s(.8,()=>this.staticBurst()),Id(n)}heroEvent(){if(!this.seenHim)return this.watch(this.underground)||!this.underground&&this.approach();const t=this.host.env,e=t.night>.5,n=1-Math.max(this.sky/15*t.daylight,this.blk/15)>.65,s=this.host.firstPerson(),r=[],o=(a,c)=>{a>0&&r.push([a,c])};return o(this.underground?5:6,()=>this.watch(this.underground)),o(this.underground||e&&n?3:0,()=>this.eyes()),o(this.underground?0:e?3:1.5,()=>this.approach()),o(s?2.5:0,()=>this.behind()),o(s?.7:0,()=>this.turnAround()),Id(r)}sense(){const t=this.host,e=t.player,n=t.world;this.eye.set(e.x,e.y+e.eyeHeight,e.z),t.camera.updateMatrixWorld(),t.camera.getWorldDirection(this.fwd);const s=Math.floor(e.x),r=Math.floor(this.eye.y),o=Math.floor(e.z),a=n.getLight(s,r,o);this.sky=a>>4,this.blk=a&15;let c=!1;for(let l=1;l<=10&&!c;l++)c=Ul(Lt(n.getState(s,r+l,o)));this.underground=c&&this.sky<=4,this.indoors=c&&!this.underground}get lookYaw(){return Math.atan2(-this.fwd.x,-this.fwd.z)}around(t,e,n=0){return new F(this.eye.x-Math.sin(t)*e,this.eye.y+n,this.eye.z-Math.cos(t)*e)}screen(t){const e=this.host.camera,n=this.ndc.copy(t).project(e);return n.z<=-1||n.z>=1||Math.abs(n.x)>.95||Math.abs(n.y)>.95?null:this.clear(e.position,t)?n:null}clear(t,e,n=!1){const s=this.host.world,r=e.x-t.x,o=e.y-t.y,a=e.z-t.z,c=Math.ceil(Math.hypot(r,o,a)/.25);let l=NaN,h=NaN,u=NaN;for(let f=1;f<c;f++){const d=f/c,m=Math.floor(t.x+r*d),v=Math.floor(t.y+o*d),g=Math.floor(t.z+a*d);if(m===l&&v===h&&g===u)continue;l=m,h=v,u=g;const p=Lt(s.getState(m,v,g));if(n?p!==A.AIR&&p!==A.GLASS:Ul(p))return!1}return!0}standable(t,e,n){if(e<1||e>=Se-2)return!1;const s=this.host.world,r=s.getState(t,e-1,n),o=s.getState(t,e,n),a=s.getState(t,e+1,n);return Ul(Lt(r))&&!Hr[Lt(o)]&&!Ro(o)&&!Hr[Lt(a)]&&!Ro(a)}floorNear(t,e,n,s,r){for(let o=e+s;o>=e-r;o--)if(this.standable(t,o,n))return o;return null}topNear(t,e,n){const s=Math.min(Se-3,e+20);return this.floorNear(t,s,n,0,s-Math.max(1,e-20))}head(t){return new F(t.x,t.y+Ga,t.z)}hidden(t){const e=this.head(t);return!this.clear(this.eye,e,!0)||!this.clear(this.eye,new F(t.x,t.y+.9,t.z))||this.screen(e)!==null}findSpot(t,e,n,s=!1){const r=this.host.world,o=this.lookYaw,a=Math.floor(this.host.player.y);for(let c=0;c<48;c++){const l=s?.5:Math.random(),h=Math.random()<.5?-1:1,u=o+(l<.35?ce(-.8,.8):h*(l<.8?ce(1,1.6):ce(1.6,2.7))),f=ce(t,e),d=Math.floor(this.eye.x-Math.sin(u)*f),m=Math.floor(this.eye.z-Math.cos(u)*f);if(!r.isLoaded(d,m))continue;const v=n?this.floorNear(d,a,m,6,6):this.topNear(d,a,m);if(v===null||Math.abs(v-a)>8)continue;const g=r.getLight(d,v+1,m);if(n?(g&15)>7:g>>4<12)continue;const p=new F(d+.5,v,m+.5);if(!this.hidden(p))return p}return null}appear(t,e,n=!1){this.hero={kind:t,pos:e,age:0,noticed:!1,noticedAt:0,lookTime:0,awayTime:0,cued:!1,moveAt:12,cave:n,beat:0,final:!1,misses:0,leaveAt:0,loud:!1},this.model.group.visible=!0,this.nextHero=this.clock+ce(60,110)*this.pace,this.poseHero(0)}distances(t,e){if(t)return[11,18];const n=Math.max(16,Math.min(this.host.env.night>.5?22:28,e*.7));return[n*.6,n]}watch(t){if(this.hero)return!1;const[e,n]=this.distances(t,this.host.fog()[1]),s=this.findSpot(e,n,t);return s?(this.appear("watch",s,t),!0):!1}approach(){if(this.hero||this.underground)return!1;const[,t]=this.distances(!1,this.host.fog()[1]),e=this.findSpot(t*.75,t,!1);return e?(this.appear("approach",e),!0):!1}eyes(){if(this.hero)return!1;const t=this.host.env.night>.5;if(!this.underground&&!t)return!1;const e=this.findSpot(10,this.underground?18:20,this.underground);return!e||!this.dark(e)?!1:(this.appear("eyes",e,this.underground),!0)}dark(t){return(this.host.world.getLight(Math.floor(t.x),Math.floor(t.y+1),Math.floor(t.z))&15)<=3}reposition(t){let e;if(t.kind==="eyes")e=this.findSpot(10,t.cave?18:20,t.cave,!0),e&&!this.dark(e)&&(e=null);else{const[n,s]=this.distances(t.cave,this.host.fog()[1]);e=this.findSpot(t.kind==="approach"?s*.75:n,s,t.cave,!0)}e&&t.pos.copy(e)}behindSpot(){const t=this.lookYaw,e=Math.floor(this.host.player.y);for(let n=0;n<20;n++){const s=t+Math.PI+ce(-.45,.45),r=ce(2.4,3.4),o=Math.floor(this.eye.x-Math.sin(s)*r),a=Math.floor(this.eye.z-Math.cos(s)*r),c=this.floorNear(o,e,a,1,1);if(c===null)continue;const l=new F(o+.5,c,a+.5);if(!this.hidden(l))return l}return null}behind(){if(this.hero||!this.host.firstPerson())return!1;const t=this.behindSpot();if(!t)return!1;const e=this.head(t);return this.appear("behind",t),this.play("horror_breath",{x:e.x,y:e.y,z:e.z,volume:1.5}),!0}wakeScare(){if(this.hero)return!1;const t=this.lookYaw,e=Math.floor(this.host.player.y);for(let n=0;n<20;n++){const s=t+ce(-.5,.5),r=ce(2.2,3.8),o=Math.floor(this.eye.x-Math.sin(s)*r),a=Math.floor(this.eye.z-Math.cos(s)*r),c=this.floorNear(o,e,a,1,2);if(c===null)continue;const l=new F(o+.5,c,a+.5);if(this.clear(this.eye,this.head(l),!0))return this.appear("wake",l),!0}return!1}updateHero(t){const e=this.hero;if(e.age+=t,e.leaveAt>0){e.age>=e.leaveAt&&this.vanish(e.loud);return}const n=this.head(e.pos),s=n.distanceTo(this.eye),r=this.screen(n),o=r!==null,a=r!==null&&Math.abs(r.x)<.8&&Math.abs(r.y)<.8,c=r!==null&&Math.abs(r.x)<.14&&Math.abs(r.y)<.2;switch(e.awayTime=o?0:e.awayTime+t,e.lookTime=c?e.lookTime+t:Math.max(0,e.lookTime-t),e.noticed&&this.dreadFor(.55+.4*(1-Math.min(1,s/40)),.4),e.kind){case"watch":case"eyes":{if(!e.noticed)return this.unnoticed(e,a,n);if(this.heartbeat(e,t,s),e.kind==="eyes"){s<7||e.lookTime>1.1?(this.play("horror_whisper",{x:n.x,y:n.y,z:n.z,volume:1.4}),this.vanish(!1)):(e.awayTime>1.2||e.age-e.noticedAt>25)&&this.vanish(!1);return}s<10||e.lookTime>1.6||e.age-e.noticedAt>25?this.vanish(!0):e.awayTime>1.2&&this.vanish(!1);return}case"approach":{if(!e.noticed)return this.unnoticed(e,a,n);if(this.heartbeat(e,t,s),e.final){o?(this.scare(!0),this.leave(e,.3,!0)):e.awayTime>8&&(this.play("horror_whisper",{x:n.x,y:n.y,z:n.z,volume:1.4}),this.vanish(!1));return}s<7&&a?(this.scare(!1),this.leave(e,.25,!0)):e.awayTime>.7?this.stepCloser(e):(e.lookTime>3||e.age>70)&&this.vanish(!0);return}case"behind":{o?(e.noticed=!0,this.scare(!1),this.leave(e,.35,!0)):e.age>3.2&&!e.cued?(e.cued=!0,this.play("horror_breath",{x:n.x,y:n.y,z:n.z,volume:1.5})):e.age>8&&(this.play("horror_whisper",{x:n.x,y:n.y,z:n.z,volume:1.5}),this.vanish(!1));return}case"wake":{e.noticed?(e.age-e.noticedAt>1.4||e.lookTime>.7)&&this.vanish(!0):e.age>.5&&o?(e.noticed=!0,e.noticedAt=e.age,this.play("horror_sting",{volume:1.2}),this.glitchFor(.4,.15)):e.age>6&&this.vanish(!1);return}}}unnoticed(t,e,n){if(e){t.noticed=!0,t.noticedAt=t.age,this.seenHim=!0;const s=n.distanceTo(this.eye);t.kind!=="eyes"&&this.play("horror_sting",{volume:s>24?.8:1}),this.play("horror_drone",{volume:.9}),this.glitchFor(.35,.12)}else if(t.age>45)this.vanish(!1);else if(t.age>t.moveAt&&(t.moveAt=t.age+12,this.reposition(t),!t.cued)){t.cued=!0;const s=this.head(t.pos).sub(this.eye).setLength(6).add(this.eye);this.play("horror_whisper",{x:s.x,y:s.y,z:s.z,volume:1})}}stepCloser(t){const e=t.pos.x-this.eye.x,n=t.pos.z-this.eye.z,s=Math.hypot(e,n),r=s<10,o=r?ce(2.6,3.4):s*.55,a=Math.atan2(e,n),c=Math.floor(this.host.player.y);for(let l=0;l<16;l++){const h=a+(l===0?0:ce(-.7,.7)),u=l===0?o:o*ce(.8,1.2),f=Math.floor(this.eye.x+Math.sin(h)*u),d=Math.floor(this.eye.z+Math.cos(h)*u),m=this.floorNear(f,c,d,r?1:5,r?2:8);if(m===null)continue;const v=new F(f+.5,m,d+.5);if(!this.hidden(v)){t.pos.copy(v),t.awayTime=0,t.final=r;return}}t.awayTime=0,++t.misses>4&&this.vanish(!1)}heartbeat(t,e,n){t.beat-=e,!(t.beat>0)&&(t.beat=n<12?.6:.85,this.play("horror_heartbeat",{volume:n<12?1:.75}))}scare(t){this.play("horror_sting",{volume:1.4}),this.play("horror_static",{volume:.8}),this.glitchFor(1,.35),this.dreadFor(1,3),t&&this.flash(this.faceImage(),170)}leave(t,e,n){t.leaveAt=t.age+e,t.loud=n}vanish(t){const e=this.hero;e&&(t&&(this.glitchFor(1,.25),this.play("horror_static",{volume:.9})),this.model.group.visible=!1,this.hero=null,e.noticed||(this.nextHero=this.clock+ce(15,30)*this.pace),this.nextEvent=Math.max(this.nextEvent,this.clock+ce(12,25)*this.pace))}poseHero(t){const e=this.hero,n=this.model,s=this.host.camera.position,r=s.x-e.pos.x,o=s.z-e.pos.z,a=s.y-(e.pos.y+Ga);n.group.position.copy(e.pos),n.group.rotation.y=Math.atan2(-r,-o),this.pose.headPitch=Math.atan2(a,Math.hypot(r,o)),this.pose.time+=t,this.host.lightColor(this.host.world.getLight(Math.floor(e.pos.x),Math.floor(e.pos.y+1),Math.floor(e.pos.z)),this.light.value);const[c,l]=this.host.fog(),h=Pd(c,l,Math.hypot(r,a,o));n.fade=e.kind==="eyes"?0:1-h,n.glowFade=1-h*.4,n.update(t,this.pose);const u=this.host.world.getLight(Math.floor(e.pos.x),Math.floor(e.pos.y+Ga),Math.floor(e.pos.z)),f=Math.max((u>>4)/15*this.host.env.daylight,(u&15)/15);this.halo.opacity=(1-Pd(.2,.55,f))*n.glowFade}turnAround(){return this.hero||!this.host.firstPerson()||!this.behindSpot()?!1:(this.flashText("ОБЕРНИСЬ",260),this.play("horror_static",{volume:.7}),this.glitchFor(.7,.25),this.after(1.2,()=>this.behind()),!0)}faceEvent(){return this.nextFace=this.clock+ce(300,500)*this.pace,this.scare(!0),!0}fakeJoin(){if(this.ghost)return!1;const t=this.host.ui;this.ghost=Ha,t.addChat(null,void 0,`${Ha} теперь в игре`);const e=ce(45,90),n=1+Math.floor(Math.random()*3);for(let s=0;s<n;s++)this.after(ce(6,e-5),()=>this.ghost&&this.say());return this.after(e,()=>{this.ghost&&(t.addChat(null,void 0,`${Ha} больше не в игре`),this.ghost=null)}),!0}say(){const t=Va(gS).replace("{name}",this.host.playerName||"Стив");this.host.ui.addChat(Ha,mS,Math.random()<.25?kd(t,3):t),this.play("horror_static",{volume:.25})}creepyChat(){return Math.random()<.6?this.say():this.host.ui.addChat(null,void 0,kd(Va(vS),4)),this.glitchFor(.25,.1),!0}mobStare(){if(this.host.entities.mobsNear(this.eye,24)===0)return!1;this.host.entities.stare(this.eye,8),this.dreadFor(.45,8);for(let t=0;t<8;t++)this.after(.8+t*.85,()=>this.play("horror_heartbeat",{volume:.7}));return!0}flicker(){return this.blk<6||this.flickerLen>0?!1:(this.flickerLen=ce(3.5,5.5),this.flickerT=0,this.flickerNext=0,this.after(this.flickerLen-1.1,()=>this.play("horror_whisper",{volume:.9})),this.dreadFor(.35,this.flickerLen),!0)}updateFlicker(t){if(this.flickerLen<=0)return;this.flickerT+=t;const e=this.host.torchLight;if(this.flickerT>=this.flickerLen){this.flickerLen=0,e.copy(this.torchBase);return}this.flickerT>this.flickerLen-1.3?this.flickerK=.02:this.flickerT>=this.flickerNext&&(this.flickerNext=this.flickerT+ce(.05,.18),this.flickerK=Math.random()<.35?ce(.05,.35):ce(.65,1.05)),e.copy(this.torchBase).multiplyScalar(this.flickerK)}fogRoll(){const t=this.host.env;return this.underground||t.fogTarget>0?!1:(t.fogTarget=1,this.after(ce(70,140),()=>t.fogTarget=0),this.after(ce(12,25),()=>this.scream()),!0)}footsteps(){const t=this.host.world,e=this.host.player,n=this.lookYaw+Math.PI+ce(-.5,.5),s=6+Math.floor(Math.random()*3);let r=!1;for(let o=0;o<s;o++)this.after(o*.46,()=>{const a=-Math.sin(n),c=-Math.cos(n);if(r||this.fwd.x*a+this.fwd.z*c>.5){r=!0;return}const l=10-o/(s-1)*8.4,h=e.x+a*l,u=e.z+c*l,f=this.floorNear(Math.floor(h),Math.floor(e.y),Math.floor(u),2,3)??Math.floor(e.y),d=Lt(t.getState(Math.floor(h),f-1,Math.floor(u))),m=d===A.AIR?"step_stone":`step_${Ze[d].sound}`;this.play(m,{x:h,y:f,z:u,volume:1.2}),o===s-1&&Math.random()<.4&&this.after(.8,()=>this.play("horror_breath",{x:h,y:f+1.6,z:u,volume:1.3}))});return!0}knock(){const t=this.host.world;for(let e=0;e<12;e++){const n=Math.random()*Math.PI*2;for(let s=1.5;s<=7;s+=.5){const r=this.around(n,s,-.3);if(Ke[Lt(t.getState(Math.floor(r.x),Math.floor(r.y),Math.floor(r.z)))])return this.play("horror_knock",{x:r.x,y:r.y,z:r.z,volume:1.4}),Math.random()<.35&&this.after(ce(2.5,4),()=>this.play("horror_knock",{x:r.x,y:r.y,z:r.z,volume:1.6})),!0}}return!1}doors(){const t=this.host.world,e=this.host.player,n=Math.floor(e.x),s=Math.floor(e.y),r=Math.floor(e.z),o=[];for(let h=s-4;h<=s+4;h++)for(let u=n-10;u<=n+10;u++)for(let f=r-10;f<=r+10;f++){const d=t.getState(u,h,f),m=Lt(d);(m===A.OAK_DOOR&&!(d>>>10&8)||m===A.CHEST)&&o.push([new F(u+.5,h+.5,f+.5),m===A.CHEST])}const a=o.filter(([h])=>!this.screen(h));if(!a.length)return!1;const[c,l]=Va(a);return this.play(l?"chest_open":"door_open",{x:c.x,y:c.y,z:c.z,volume:1.2}),this.after(ce(1.2,2.4),()=>this.play(l?"chest_close":"door_close",{x:c.x,y:c.y,z:c.z,volume:1.2})),!0}scream(){const t=this.around(Math.random()*Math.PI*2,ce(18,26),ce(-4,2));return this.play("horror_scream",{x:t.x,y:t.y,z:t.z,volume:2}),this.dreadFor(.3,4),!0}musicBox(){const t=this.around(Math.random()*Math.PI*2,ce(7,11),ce(-2,1));return this.play("horror_music_box",{x:t.x,y:t.y,z:t.z,volume:1.8}),!0}whisper(){const t=this.around(this.lookYaw+(Math.random()<.5?1:-1)*(Math.PI/2),.7);return this.play("horror_whisper",{x:t.x,y:t.y,z:t.z,volume:1.1}),this.dreadFor(.3,3),!0}staticBurst(){return this.play("horror_static",{volume:.9}),this.glitchFor(.8,.45),Math.random()<.5&&this.flashText(Va(_S),160),!0}bloodMoon(){const t=this.host.env;return t.bloodTarget>0?!1:(t.bloodTarget=1,this.host.ui.addChat(null,void 0,"Луна наливается кровью…"),this.play("horror_drone",{volume:.8}),!0)}updateBloodMoon(){const t=this.host.env.night;!this.wasNight&&t>.35?(this.wasNight=!0,this.clock>120&&Math.random()<.15&&this.bloodMoon()):this.wasNight&&t<.15&&(this.wasNight=!1,this.host.env.bloodTarget=0)}updateSleep(){const t=this.host.player.sleeping;t!==this.wasSleeping&&(this.wasSleeping=t,t?Math.random()<.4&&this.after(ce(1,2.5),()=>this.host.player.sleeping&&(Math.random()<.5?this.knock():this.whisper())):!this.hero&&this.clock>30&&Math.random()<.3&&this.wakeScare())}updateAmbient(){if(this.clock<this.nextAmbient||(this.nextAmbient=this.clock+ce(20,50)*this.pace,!this.underground&&this.host.env.night<.5))return;const t=this.around(Math.random()*Math.PI*2,ce(8,15),ce(-3,3));this.play("horror_cave",{x:t.x,y:t.y,z:t.z,volume:this.underground?1.6:1.1})}play(t,e){this.host.sound.play(t,e)}dreadFor(t,e){this.dreadLevel=Math.max(this.dreadLevel,t),this.dreadHold=Math.max(this.dreadHold,e)}glitchFor(t,e){this.glitch=Math.max(this.glitch,t),this.glitchHold=Math.max(this.glitchHold,e)}updateEffects(t){const e=this.host.env;this.dreadHold=Math.max(0,this.dreadHold-t),this.dreadHold===0&&(this.dreadLevel=0);const n=this.enabled?Math.max(this.dreadLevel,e.bloodTarget*e.night*.3,e.fogTarget*.15):0;this.dread+=(n-this.dread)*Math.min(1,t*(n>this.dread?2:.3)),this.glitchHold=Math.max(0,this.glitchHold-t),this.glitchHold===0&&(this.glitch=Math.max(0,this.glitch-t*4)),this.enabled||(this.glitch=0),this.host.pipeline.dread=this.dread,this.host.pipeline.glitch=Math.min(1,this.glitch)}faceImage(){return this.face??(this.face=xS()),this.face}flashText(t,e){const n=document.createElement("p");n.textContent=t,this.flash(n,e)}flash(t,e){let n=this.flashEl;n||(n=this.flashEl=document.createElement("div"),n.className="horror-flash",document.body.append(n)),n.replaceChildren(t),n.classList.toggle("text",!(t instanceof HTMLCanvasElement)),n.hidden=!1,clearTimeout(this.flashTimer);const s=n;this.flashTimer=window.setTimeout(()=>s.hidden=!0,e)}}const Bu=()=>matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0;class bS{constructor(t,e){S(this,"active",!1);S(this,"sensitivity",8);S(this,"invertY",!1);S(this,"keys",new Set);S(this,"lookX",0);S(this,"lookY",0);S(this,"lockedAt",0);S(this,"lastMove",0);S(this,"lastSpace",0);S(this,"lastW",0);S(this,"sprintLatch",!1);S(this,"stick",{x:0,y:0});S(this,"touchJump",!1);S(this,"touchDown",!1);S(this,"touchSneak",!1);S(this,"onKeyDown",t=>{var e;if(((e=t.target)==null?void 0:e.tagName)!=="INPUT"&&this.active&&(["Space","Tab","F1","F3","F5","Slash","ArrowUp","ArrowDown","KeyQ"].includes(t.code)&&t.preventDefault(),(t.ctrlKey||t.metaKey)&&t.preventDefault(),this.keys.add(t.code),!t.repeat)){if(t.code==="Space"){const n=performance.now();n-this.lastSpace<300?(this.h.toggleFly(),this.lastSpace=0):this.lastSpace=n}if(t.code==="KeyW"){const n=performance.now();n-this.lastW<280&&(this.sprintLatch=!0),this.lastW=n}if(t.code.startsWith("Digit")){const n=Number(t.code.slice(5));n>=1&&n<=9&&this.h.hotbar(n-1)}switch(t.code){case"KeyT":case"Enter":t.preventDefault(),this.release(),this.h.chat("");break;case"Slash":this.release(),this.h.chat("/");break;case"KeyE":this.release(),this.h.inventory(),t.stopImmediatePropagation();break;case"KeyQ":this.h.drop(t.ctrlKey);break;case"Tab":this.h.playerList(!0);break;case"F3":this.h.debug();break;case"F5":this.h.toggleView();break}}});S(this,"onKeyUp",t=>{this.keys.delete(t.code),t.code==="Tab"&&this.h.playerList(!1)});S(this,"onMouseMove",t=>{if(!this.active||!this.pointerLocked)return;const e=Math.max(Math.abs(t.movementX),Math.abs(t.movementY));if(e===0)return;const n=this.lastMove;this.lastMove=e,!(performance.now()-this.lockedAt<120)&&(e>400||e>200&&e>10*Math.max(n,15)||(this.lookX+=t.movementX,this.lookY+=t.movementY))});S(this,"onMouseDown",t=>{!this.active||!this.pointerLocked||(t.button===0?this.h.attackStart():t.button===2?this.h.useStart():t.button===1&&(t.preventDefault(),this.h.pick()))});S(this,"onMouseUp",t=>{t.button===0?this.h.attackEnd():t.button===2&&this.h.useEnd()});S(this,"onWheel",t=>{t.preventDefault(),this.active&&t.deltaY&&this.h.scroll(Math.sign(t.deltaY))});this.canvas=t,this.h=e,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",()=>{this.keys.clear(),this.h.attackEnd(),this.h.useEnd()}),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("pointerlockchange",()=>{this.pointerLocked&&(this.lockedAt=performance.now(),this.lastMove=0)}),t.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),t.addEventListener("wheel",this.onWheel,{passive:!1}),t.addEventListener("contextmenu",n=>n.preventDefault())}get pointerLocked(){return document.pointerLockElement===this.canvas}release(){this.keys.clear(),this.stick={x:0,y:0},this.touchJump=this.touchDown=!1,this.sprintLatch=!1}moveInput(){if(!this.active)return{forward:0,strafe:0,jump:!1,sneak:this.touchSneak,sprint:!1};const t=this.keys;let e=(t.has("KeyW")||t.has("ArrowUp")?1:0)-(t.has("KeyS")||t.has("ArrowDown")?1:0),n=(t.has("KeyD")||t.has("ArrowRight")?1:0)-(t.has("KeyA")||t.has("ArrowLeft")?1:0);(this.stick.x||this.stick.y)&&(e=-this.stick.y,n=this.stick.x),e<=0&&(this.sprintLatch=!1);const s=Math.hypot(this.stick.x,this.stick.y)>.97&&-this.stick.y>.8;return{forward:e,strafe:n,jump:t.has("Space")||this.touchJump,sneak:t.has("ShiftLeft")||t.has("ShiftRight")||this.touchDown||this.touchSneak,sprint:t.has("ControlLeft")||t.has("KeyR")||this.sprintLatch||s}}consumeLook(){const t=this.sensitivity*25e-5,e=[this.lookX*t,this.lookY*t*(this.invertY?-1:1)];return this.lookX=this.lookY=0,e}setupTouch(t){t.hidden=!1;const e=t.querySelector("#joystick"),n=t.querySelector("#joystick-knob");let s=null,r=null,o={x:0,y:0,t:0},a={x:0,y:0},c=0,l=!1,h=!1,u={x:0,y:0};const f=.15,d=.32,m=p=>{const M=e.getBoundingClientRect().width/2;let E=(p.clientX-u.x)/(M*.8),_=(p.clientY-u.y)/(M*.8);const T=Math.min(1,Math.hypot(E,_));if(T<f)E=_=0;else{let w=Math.atan2(_,E);const b=Math.round(w/(Math.PI/2))*(Math.PI/2);Math.abs(w-b)<d&&(w=b);const C=(T-f)/(1-f);E=Math.cos(w)*C,_=Math.sin(w)*C}this.stick={x:E,y:_},n.style.transform=`translate(${E*M*.6}px, ${_*M*.6}px)`};e.addEventListener("touchstart",p=>{p.preventDefault();const M=p.changedTouches[0];s=M.identifier;const E=e.getBoundingClientRect(),_=E.left+E.width/2,T=E.top+E.height/2;u=Math.hypot(M.clientX-_,M.clientY-T)<E.width/4?{x:M.clientX,y:M.clientY}:{x:_,y:T},m(M)}),this.canvas.addEventListener("touchstart",p=>{if(p.preventDefault(),r!==null||!this.active)return;const M=p.changedTouches[0];r=M.identifier,o={x:M.clientX,y:M.clientY,t:performance.now()},a={x:M.clientX,y:M.clientY},h=!1,l=!1,clearTimeout(c),c=window.setTimeout(()=>{r!==null&&!h&&(l=!0,this.h.attackStart())},280)}),window.addEventListener("touchmove",p=>{for(const M of Array.from(p.changedTouches))M.identifier===s?m(M):M.identifier===r&&this.active&&(this.lookX+=(M.clientX-a.x)*2.2,this.lookY+=(M.clientY-a.y)*2.2,a={x:M.clientX,y:M.clientY},Math.hypot(M.clientX-o.x,M.clientY-o.y)>14&&(h=!0))},{passive:!0});const v=p=>{for(const M of Array.from(p.changedTouches))M.identifier===s&&(s=null,this.stick={x:0,y:0},n.style.transform=""),M.identifier===r&&(r=null,clearTimeout(c),l?this.h.attackEnd():!h&&performance.now()-o.t<280&&this.active&&(this.h.useStart(),this.h.useEnd()),l=!1)};window.addEventListener("touchend",v),window.addEventListener("touchcancel",v);const g=(p,M,E=()=>{})=>{const _=t.querySelector(p);if(!_)return;_.addEventListener("touchstart",w=>{w.preventDefault(),w.stopPropagation(),_.classList.add("pressed"),M()});const T=w=>{w.preventDefault(),_.classList.remove("pressed"),E()};_.addEventListener("touchend",T),_.addEventListener("touchcancel",T)};g("#btn-jump",()=>this.touchJump=!0,()=>this.touchJump=!1),g("#btn-down",()=>this.touchDown=!0,()=>this.touchDown=!1),g("#btn-sneak",()=>{var p;this.touchSneak=!this.touchSneak,(p=t.querySelector("#btn-sneak"))==null||p.classList.toggle("active",this.touchSneak)}),g("#btn-fly",()=>this.h.toggleFly()),g("#btn-attack",()=>this.h.attackStart(),()=>this.h.attackEnd()),g("#btn-use",()=>this.h.useStart(),()=>this.h.useEnd()),g("#btn-chat",()=>this.h.chat("")),g("#btn-inventory",()=>this.h.inventory()),g("#btn-drop",()=>this.h.drop(!1)),g("#btn-pause",()=>this.h.pause())}}class SS{constructor(){S(this,"slots",Or(Ur));S(this,"armor",Or(wl));S(this,"selected",0);S(this,"onChange",()=>{});S(this,"onOverflow")}load(t,e,n){this.slots=vd(t,Ur),this.armor=vd(e,wl),this.selected=Math.max(0,Math.min(Vi-1,n|0)),this.changed()}changed(){this.onChange()}get held(){return this.slots[this.selected]}set held(t){this.slots[this.selected]=t&&t.count>0?t:null,this.changed()}select(t){this.selected=(t%Vi+Vi)%Vi,this.changed()}add(t){const e=gi(this.slots,t);return this.changed(),e}consumeHeld(t=1){const e=this.held;e&&(e.count-=t,this.held=e.count>0?e:null)}damageHeld(t=1){var s;const e=this.held;if(!e||!((s=ye(e.id))!=null&&s.durability))return!1;const n=_d(e,t);return this.held=n,n===null}replaceHeld(t){var n;const e=this.held;e&&e.count>1?(e.count--,gi(this.slots,t)>0&&((n=this.onOverflow)==null||n.call(this,t)),this.changed()):this.held=t}armorPoints(){return this.armor.reduce((t,e)=>{var n,s;return t+(e?((s=(n=ye(e.id))==null?void 0:n.armor)==null?void 0:s.points)??0:0)},0)}damageArmor(t){const e=Math.max(1,Math.floor(t/4));let n=!1;this.armor=this.armor.map(s=>s&&(n=!0,_d(s,e))),n&&this.changed()}takeAll(){const t=[...this.slots,...this.armor].filter(e=>!!e).map(e=>({...e}));return this.slots=Or(Ur),this.armor=Or(wl),this.changed(),t}count(t){return this.slots.reduce((e,n)=>e+(n&&n.id===t?n.count:0),0)}takeOne(t){for(let e=Ur-1;e>=0;e--){const n=this.slots[e];if(n&&n.id===t)return n.count--,n.count<=0&&(this.slots[e]=null),this.changed(),!0}return!1}}function Wa(i,t,e,n,s){const r=i[t];if(!e){if(!r)return null;if(n){const o=Math.ceil(r.count/2),a=r.count-o;return i[t]=a>0?{...r,count:a}:null,{...r,count:o}}return i[t]=null,r}if(s&&!s(e))return e;if(!r)return n?(i[t]={...e,count:1},e.count>1?{...e,count:e.count-1}:null):(i[t]=e,null);if(Ap(r,e)){const o=_s(r.id),a=Math.min(n?1:e.count,o-r.count);return a<=0?e:(i[t]={...r,count:r.count+a},e.count-a>0?{...e,count:e.count-a}:null)}return i[t]=e,r}const ES={planks:[A.OAK_PLANKS,A.BIRCH_PLANKS,A.SPRUCE_PLANKS],log:[A.OAK_LOG,A.BIRCH_LOG,A.SPRUCE_LOG],coal:[j.COAL,j.CHARCOAL],wool:[A.WHITE_WOOL,A.RED_WOOL,A.PINK_WOOL,A.YELLOW_WOOL,A.GREEN_WOOL,A.BLUE_WOOL,A.PURPLE_WOOL,A.BLACK_WOOL]},yc=(i,t)=>typeof i=="number"?i===t:ES[i].includes(t),wS=yc,Go=[],re=(i,t,e,n=1)=>Go.push({kind:"shaped",pattern:i,keys:t,result:Ve(e,n)}),fi=(i,t,e=1)=>Go.push({kind:"shapeless",ingredients:i,result:Ve(t,e)});fi([A.OAK_LOG],A.OAK_PLANKS,4);fi([A.BIRCH_LOG],A.BIRCH_PLANKS,4);fi([A.SPRUCE_LOG],A.SPRUCE_PLANKS,4);re(["#","#"],{"#":"planks"},j.STICK,4);re(["##","##"],{"#":"planks"},A.CRAFTING_TABLE);re(["C","S"],{C:"coal",S:j.STICK},A.TORCH,4);re(["###","# #","###"],{"#":"planks"},A.CHEST);re(["###","# #","###"],{"#":A.COBBLESTONE},A.FURNACE);re(["S S","SSS","S S"],{S:j.STICK},A.LADDER,3);re(["##","##","##"],{"#":"planks"},j.OAK_DOOR,3);re(["#S#","#S#"],{"#":"planks",S:j.STICK},A.OAK_FENCE,3);re(["###"],{"#":"planks"},A.OAK_SLAB,6);re(["###"],{"#":A.COBBLESTONE},A.COBBLESTONE_SLAB,6);re(["###"],{"#":A.STONE},A.STONE_SLAB,6);re(["#  ","## ","###"],{"#":"planks"},A.OAK_STAIRS,4);re(["#  ","## ","###"],{"#":A.COBBLESTONE},A.COBBLESTONE_STAIRS,4);re(["#  ","## ","###"],{"#":A.STONE_BRICKS},A.STONE_BRICK_STAIRS,4);re(["WWW","###"],{W:"wool","#":"planks"},j.BED);re(["###","###"],{"#":"planks"},A.OAK_TRAPDOOR,2);re(["S#S","S#S"],{"#":"planks",S:j.STICK},A.OAK_FENCE_GATE);re(["###","BBB","###"],{"#":"planks",B:j.BOOK},A.BOOKSHELF);re(["###","###"],{"#":A.GLASS},A.GLASS_PANE,16);re(["P","T"],{P:A.PUMPKIN,T:A.TORCH},A.JACK_O_LANTERN);re(["###"],{"#":A.SUGAR_CANE},j.PAPER,3);fi([j.PAPER,j.PAPER,j.PAPER,j.LEATHER],j.BOOK);re(["##","##"],{"#":A.SAND},A.SANDSTONE);re(["##","##"],{"#":A.STONE},A.STONE_BRICKS,4);re(["##","##"],{"#":j.STRING},A.WHITE_WOOL);re(["GSG","SGS","GSG"],{G:j.GUNPOWDER,S:A.SAND},A.TNT);re(["I I"," I "],{I:j.IRON_INGOT},j.BUCKET);re([" I","I "],{I:j.IRON_INGOT},j.SHEARS);fi([j.IRON_INGOT,j.FLINT],j.FLINT_AND_STEEL);re([" #S","# S"," #S"],{"#":j.STICK,S:j.STRING},j.BOW);re(["F","#","E"],{F:j.FLINT,"#":j.STICK,E:j.FEATHER},j.ARROW,4);re(["WWW"],{W:j.WHEAT},j.BREAD);fi([j.BONE],j.BONE_MEAL,3);fi([A.POPPY],j.RED_DYE);fi([A.DANDELION],j.YELLOW_DYE);fi([A.WHITE_WOOL,j.RED_DYE],A.RED_WOOL);fi([A.WHITE_WOOL,j.YELLOW_DYE],A.YELLOW_WOOL);fi([A.WHITE_WOOL,j.RED_DYE,j.BONE_MEAL],A.PINK_WOOL);for(const[i,t]of[[j.IRON_INGOT,A.IRON_BLOCK],[j.GOLD_INGOT,A.GOLD_BLOCK],[j.DIAMOND,A.DIAMOND_BLOCK]])re(["###","###","###"],{"#":i},t),fi([t],i,9);const TS=["planks",A.COBBLESTONE,j.IRON_INGOT,j.GOLD_INGOT,j.DIAMOND];W0.forEach((i,t)=>{const e=TS[t],n=300+t*5;re(["XXX"," # "," # "],{X:e,"#":j.STICK},n),re(["XX","X#"," #"],{X:e,"#":j.STICK},n+1),re(["X","#","#"],{X:e,"#":j.STICK},n+2),re(["X","X","#"],{X:e,"#":j.STICK},n+3),re(["XX"," #"," #"],{X:e,"#":j.STICK},n+4)});const AS=[j.LEATHER,j.IRON_INGOT,j.GOLD_INGOT,j.DIAMOND];AS.forEach((i,t)=>{const e=330+t*4;re(["XXX","X X"],{X:i},e),re(["X X","XXX","XXX"],{X:i},e+1),re(["XXX","X X","X X"],{X:i},e+2),re(["X X","X X"],{X:i},e+3)});function RS(i,t){const e=i.length/t;let n=t,s=e,r=-1,o=-1;const a=[];for(let h=0;h<e;h++)for(let u=0;u<t;u++){const f=i[h*t+u];f&&(a.push(f.id),n=Math.min(n,u),r=Math.max(r,u),s=Math.min(s,h),o=Math.max(o,h))}if(!a.length)return null;const c=r-n+1,l=o-s+1;for(const h of Go){if(h.kind==="shapeless"){if(h.ingredients.length!==a.length)continue;const f=[...a];if(h.ingredients.every(m=>{const v=f.findIndex(g=>yc(m,g));return v<0?!1:(f.splice(v,1),!0)}))return h;continue}if(!(Math.max(...h.pattern.map(f=>f.length))!==c||h.pattern.length!==l))for(const f of[!1,!0]){let d=!0;for(let m=0;m<l&&d;m++)for(let v=0;v<c&&d;v++){const g=h.pattern[m][f?c-1-v:v]??" ",p=i[(s+m)*t+n+v];g===" "?d=!p:d=!!p&&yc(h.keys[g],p.id)}if(d)return h}}return null}function Ol(i,t){const e=new Array(t*t).fill(null);return i.kind==="shapeless"?i.ingredients.length>e.length?null:(i.ingredients.forEach((s,r)=>e[r]=s),e):Math.max(...i.pattern.map(s=>s.length))>t||i.pattern.length>t?null:(i.pattern.forEach((s,r)=>{for(let o=0;o<s.length;o++)s[o]!==" "&&(e[r*t+o]=i.keys[s[o]])}),e)}function CS(i){if(i.kind==="shapeless")return[...i.ingredients];const t=[];for(const e of i.pattern)for(const n of e)n!==" "&&t.push(i.keys[n]);return t}function Nd(i,t){const e=t.filter(n=>!!n).map(n=>({id:n.id,count:n.count}));for(const n of CS(i)){const s=e.find(r=>r.count>0&&yc(n,r.id));if(!s)return!1;s.count--}return!0}const LS={[A.IRON_ORE]:Ve(j.IRON_INGOT),[A.GOLD_ORE]:Ve(j.GOLD_INGOT),[A.DIAMOND_ORE]:Ve(j.DIAMOND),[A.COAL_ORE]:Ve(j.COAL),[A.SAND]:Ve(A.GLASS),[A.COBBLESTONE]:Ve(A.STONE),[A.OAK_LOG]:Ve(j.CHARCOAL),[A.BIRCH_LOG]:Ve(j.CHARCOAL),[A.SPRUCE_LOG]:Ve(j.CHARCOAL),[j.PORKCHOP]:Ve(j.COOKED_PORKCHOP),[j.BEEF]:Ve(j.STEAK),[j.CHICKEN]:Ve(j.COOKED_CHICKEN),[j.MUTTON]:Ve(j.COOKED_MUTTON)},DS=i=>{var t;return((t=ye(i))==null?void 0:t.fuel)??0},U=16,er=[255,255,255],bc=[0,0,0],pt=(...i)=>i.map(k);function At(i,t){const e=Math.round(t);return i[e<0?0:e>=i.length?i.length-1:e]}function zu(i,t,e){if(!e)return i[Math.min(i.length-1,Math.max(0,Math.floor(t*i.length)))];let n=0;for(const r of e)n+=r;let s=0;for(let r=0;r<i.length;r++)if(s+=e[r]/n,t<s)return i[r];return i[i.length-1]}const Ie=(i,t)=>t[Math.floor(i()*t.length)],We=(i,t,e)=>yn(i,1+(t()-.5)*e),Gu=(i,t)=>(t%U+U)%U*U+(i%U+U)%U,Sc=(i,t)=>{const e=Math.abs(i-t)%U;return Math.min(e,U-e)},Ud=i=>i*i*(3-2*i);function Le(i,t,e=t){const n=Array.from({length:t*e},()=>i()),s=(r,o)=>n[(o%e+e)%e*t+(r%t+t)%t];return(r,o)=>{const a=(r+.5)/U*t-.5,c=(o+.5)/U*e-.5,l=Math.floor(a),h=Math.floor(c),u=Ud(a-l),f=Ud(c-h),d=s(l,h)+(s(l+1,h)-s(l,h))*u,m=s(l,h+1)+(s(l+1,h+1)-s(l,h+1))*u;return d+(m-d)*f}}function un(i){const t=new Float32Array(U*U);for(let s=0;s<U;s++)for(let r=0;r<U;r++)t[s*U+r]=i(r,s);const e=Array.from({length:U*U},(s,r)=>r).sort((s,r)=>t[s]-t[r]),n=new Float32Array(U*U);return e.forEach((s,r)=>n[s]=(r+.5)/(U*U)),n}function Hn(i,t,e,n){for(let s=0;s<U;s++)for(let r=0;r<U;r++)i.set(r,s,zu(t,e[s*U+r],n))}function Bc(i,t,e,n=.85,s=.3){const r=[];for(let a=0;a<e;a++)for(let c=0;c<t;c++)r.push([(c+.5+(i()-.5)*n)*U/t,(a+.5+(i()-.5)*n)*U/e,1+(i()-.5)*s]);const o=new Int16Array(U*U);for(let a=0;a<U;a++)for(let c=0;c<U;c++){let l=1/0;r.forEach(([h,u,f],d)=>{const m=Math.hypot(Sc(c+.5,h),Sc(a+.5,u))/f;m<l&&(l=m,o[a*U+c]=d)})}return{count:r.length,at:(a,c)=>o[Gu(a,c)]}}function li(i,t,e,n,s=0,r=0){e.forEach((o,a)=>{for(let c=0;c<o.length;c++){const l=n[o[c]];l&&i.set(s+c,r+a,Array.isArray(l[0])?Ie(t,l):l)}})}function $p(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ms(i,t,e,n,s,r,o,a){for(let c=s;c<=o;c++){let l=n;for(;l<=r;){const h=2+Math.floor(t()*5),u=(t()-.5)*1.6;for(let f=0;f<h&&l<=r;f++,l++)i.set(l,c,At(e,a+u+(t()<.07?-1:0)))}}}function jp(i,t,e){for(let n=0;n<U;n++)i.set(n,0,Ie(t,e)),i.set(n,U-1,Ie(t,e)),i.set(0,n,Ie(t,e)),i.set(U-1,n,Ie(t,e))}const PS=pt("#5b3d27","#69472e","#775236","#845d3f","#916848","#a07553"),Zp=pt("#3c7322","#468229","#509030","#5a9d37","#65a93f","#73b649"),Jp=pt("#d6e1e8","#e1eaef","#eaf1f5","#f3f8fa","#fbfdfe");function Fl(i,t){const e=Le(t,8);Hn(i,PS,un((n,s)=>e(n,s)*.45+t()*.7),[1,2,3,3,2,1]);for(let n=0;n<8;n++)i.set(t()*U,t()*U,t()<.5?k("#ad855b"):k("#47301f"))}function IS(i,t){const e=Le(t,8);Hn(i,Zp,un((n,s)=>e(n,s)*.35+t()*.8),[1,2,3,3,2,1.2])}function Od(i,t,e,n,s){for(let r=0;r<U;r++){let o=s+(t()<.5?1:0);t()<.22&&(o+=1+Math.floor(t()*2));for(let a=0;a<o;a++)i.set(r,a,At(e,1+t()*(e.length-1.5)-(a===o-1?1:0)));i.set(r,o-1,t()<.6?n:e[0]),i.set(r,o,yn(i.get(r,o),.72))}}function kS(i,t){const e=pt("#24160a","#2f1d0e","#3a2614","#45301a","#513a21","#5e4428","#6c4f31"),n=Le(t,8);Hn(i,e.slice(2),un((r,o)=>n(r,o)*.45+t()*.8),[1,2,3,2,1]);const s=Le(t,4,1);for(let r=0;r<4;r++)for(let o=0;o<U;o++){if(t()<.15)continue;const a=r*4+3+(s(o,0)>.55?1:0);i.set(o,a,At(e,t()*1.6)),t()<.5&&i.set(o,a-1,At(e,2+t()))}for(let r=0;r<9;r++)i.set(t()*U,t()*U,t()<.5?e[6]:k("#7a5a3c"))}const Bl=pt("#5e5e5e","#686868","#717171","#7a7a7a","#838383","#8d8d8d","#979797");function Qp(i,t){const e=Le(t,4),n=Le(t,8);Hn(i,Bl,un((s,r)=>e(s,r)*.15+n(s,r)*.4+t()*.5),[1,2,3,4,3,2,1]);for(let s=0;s<8;s++){const r=Math.floor(t()*U),o=Math.floor(t()*U),a=2+Math.floor(t()*3),c=t()<.6?Bl[1]:Bl[5];for(let l=0;l<a;l++)i.set(r+l,o,c)}}const Fd=[[[0,0],[1,0],[0,1],[1,1],[2,1]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[1,0],[1,1],[2,1],[2,2],[1,2]],[[1,0],[2,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[1,0],[0,1],[1,1],[2,1],[1,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[3,1],[1,2],[2,2]]];function Xa(i,t,e,n=6){Qp(i,t);const s=[];for(let r=0;s.length<n&&r<400;r++){const o=Math.floor(t()*U),a=Math.floor(t()*U);if(s.some(([h,u])=>Math.max(Sc(h,o),Sc(u,a))<5))continue;s.push([o,a]);const c=Fd[Math.floor(t()*Fd.length)],l=(h,u)=>c.some(([f,d])=>f===h&&d===u);for(const[h,u]of c)l(h+1,u)||i.set(o+h+1,a+u,yn(i.get(o+h+1,a+u),.8)),l(h,u+1)||i.set(o+h,a+u+1,yn(i.get(o+h,a+u+1),.8));for(const[h,u]of c){const f=!l(h,u-1)||!l(h-1,u),d=!l(h,u+1)||!l(h+1,u),m=f&&!d?e[2]:d&&!f?e[0]:e[1];i.set(o+h,a+u,We(m,t,.08))}}}const NS=pt("#4a4a4a","#585858","#666666","#757575","#848484","#939393","#a3a3a3"),US=pt("#303030","#383838","#404040");function tm(i,t){const e=Bc(t,3,3,.9,.35),n=Array.from({length:e.count},()=>t()),s=new Uint8Array(U*U);for(let o=0;o<U;o++)for(let a=0;a<U;a++){const c=e.at(a,o);(e.at(a+1,o)!==c||e.at(a,o+1)!==c)&&(s[o*U+a]=1)}const r=(o,a)=>s[Gu(o,a)]===1;for(let o=0;o<U;o++)for(let a=0;a<U;a++){if(r(a,o)){i.set(a,o,Ie(t,US));continue}let c=1.4+n[e.at(a,o)]*2.8+(t()-.5)*1.4;(r(a-1,o)||r(a,o-1))&&(c+=1.4),(r(a+1,o)||r(a,o+1))&&(c-=1.2),i.set(a,o,At(NS,c))}}function OS(i,t){const e=pt("#2f4a1c","#3a5b23","#466c2a","#537d32","#618e3b","#6f9d45");tm(i,t);const n=Le(t,4),s=un((r,o)=>n(r,o)+t()*.35);for(let r=0;r<U;r++)for(let o=0;o<U;o++){if(s[r*U+o]<.6)continue;const[a,c,l]=i.get(o,r);i.set(o,r,At(e,((a+c+l)/3-50)/21))}}function FS(i,t){const e=pt("#5c5c5c","#676767","#727272","#7c7c7c","#868686","#919191","#9c9c9c"),n=Le(t,8),s=un((r,o)=>n(r,o)*.5+t()*.6);for(let r=0;r<U;r++)for(let o=0;o<U;o++){const a=r<8?0:1,c=(o+(a?8:0))%U,l=r%8;if(l===7||c===15){i.set(o,r,We(k("#454545"),t,.12));continue}let h=1.6+s[r*U+o]*2.8;l===0||c===0?h+=1.5:(l===6||c===14)&&(h-=1.3),i.set(o,r,At(e,h))}for(let r=0;r<2;r++){let o=2+Math.floor(t()*11),a=1+Math.floor(t()*4)+(r?8:0);for(let c=0;c<3;c++)i.set(o,a,k("#555555")),o+=t()<.5?1:0,a+=1}}function Bd(i,t){const e=pt("#999999","#a0a0a0","#a6a6a6","#acacac","#b2b2b2"),n=Le(t,8);Hn(i,e,un((s,r)=>n(s,r)*.3+t()),[1,2,3,2,1])}const BS=pt("#151515","#252525","#353535","#464646","#575757","#6a6a6a","#808080");function zS(i,t){const e=Le(t,4),n=Le(t,8);Hn(i,BS,un((s,r)=>e(s,r)*.5+n(s,r)*.5+t()*.45),[2,2,2,2,2,1.5,1])}function GS(i,t){const e=pt("#0b0814","#120d1d","#1a1428","#231b35","#2e2444","#3c2f59","#54427c"),n=Le(t,4),s=Le(t,8);Hn(i,e,un((r,o)=>n(r,o)*.45+s(r,o)*.35+t()*.3),[3,3,3,2,1.6,1,.5]);for(let r=0;r<4;r++){const o=Math.floor(t()*U),a=Math.floor(t()*U);i.set(o,a,k("#6b56a0")),i.set(o+1,a+1,k("#3c2f59"))}}const HS=pt("#cbbf8b","#d4c995","#dbd19f","#e2d9a9","#e9e1b4"),Hu=pt("#bcae76","#c6b880","#d0c28a","#d8cb94","#dfd39e","#e7ddab");function VS(i,t){const e=Le(t,8);Hn(i,HS,un((n,s)=>e(n,s)*.3+t()),[1,2,3,2,1]);for(let n=0;n<10;n++)i.set(t()*U,t()*U,t()<.6?k("#b8aa76"):k("#f2ecca"))}function WS(i,t){const e=pt("#4f4a48","#5e5855","#6d6763","#7c7672","#8b8581","#9b9591","#aba5a1"),n=pt("#54473f","#63554c","#72635a","#827268","#918176","#a09084","#ae9f93"),s=Bc(t,5,5,.95,.5),r=Array.from({length:s.count},()=>2+t()*3.5),o=Array.from({length:s.count},()=>t()<.28);for(let a=0;a<U;a++)for(let c=0;c<U;c++){const l=s.at(c,a),h=s.at(c+1,a)!==l||s.at(c,a+1)!==l,u=s.at(c-1,a)!==l||s.at(c,a-1)!==l,f=r[l]+(t()-.5)*.9+(u?1:0)-(h?2.2:0);i.set(c,a,At(o[l]?n:e,f))}}function XS(i,t){const e=Le(t,2,8),n=un((s,r)=>e(s,r)*.6+t()*.5);for(let s=0;s<U;s++)for(let r=0;r<U;r++){let o=1.6+n[s*U+r]*2.6;s<=1&&(o+=1.4),(s===2||s===13)&&(o-=.7),(s===3||s===12)&&(o=.2+t()*.6),s===15&&(o-=1.4),i.set(r,s,At(Hu,o))}}function YS(i,t){const e=Le(t,8);Hn(i,Hu.slice(2),un((n,s)=>e(n,s)*.3+t()),[1,3,3,1])}function KS(i,t){const e=Le(t,4);Hn(i,Hu.slice(0,5),un((n,s)=>e(n,s)*.5+t()*.8),[1,2,3,3,2]);for(let n=0;n<5;n++){let s=Math.floor(t()*U),r=Math.floor(t()*U);for(let o=0;o<3;o++)i.set(s,r,k("#a99a63")),s+=t()<.5?1:-1,r+=t()<.5?1:0}}function qS(i,t){const e=Le(t,8);Hn(i,Jp,un((n,s)=>e(n,s)*.4+t()*.8),[1,2,3,4,3])}function $S(i,t){const e=pt("#729ce8","#7fa7ec","#8db2f0","#9cbdf4","#aecaf7"),n=Le(t,4),s=un((r,o)=>n(r,o)*.55+t()*.6);for(let r=0;r<U;r++)for(let o=0;o<U;o++){const a=s[r*U+o];i.set(o,r,zu(e,a),Math.round(190+a*14))}for(let r=0;r<4;r++){let o=Math.floor(t()*U),a=Math.floor(t()*U);const c=3+Math.floor(t()*4);for(let l=0;l<c;l++)i.set(o,a,k("#d6e6fd"),208),o+=1,a-=t()<.7?1:0}}const ni={ramp:pt("#7d5f36","#8c6b3e","#9b7847","#a98551","#b6915b","#c29d65"),gap:k("#5c4426")},jS={ramp:pt("#a5925c","#b3a068","#c0ad74","#cab87f","#d4c389","#ddcd94"),gap:k("#86744a")},ZS={ramp:pt("#47321e","#523a23","#5d4228","#684b2d","#735333","#7e5c39"),gap:k("#2f2116")},zd={ramp:pt("#6a4217","#784b1b","#875520","#955f26","#a2692c","#ae7434"),gap:k("#432a0f")};function sc(i,t,e){const n=(e.ramp.length-1)/2;let s=Math.floor(t()*U);for(let r=0;r<4;r++){const o=r*4,a=n+(t()-.5)*1.1;Ms(i,t,e.ramp,0,o,U-1,o,a+.7),Ms(i,t,e.ramp,0,o+1,U-1,o+1,a),Ms(i,t,e.ramp,0,o+2,U-1,o+2,a-.7);for(let c=0;c<U;c++)i.set(c,o+3,We(e.gap,t,.12));for(let c=0;c<3;c++)i.set(s,o+c,Ln(e.gap,e.ramp[1],.45));s=(s+5+Math.floor(t()*7))%U}}function Gd(i,t,e){const n=e.length,s=[];for(;s.length<U;){const r=2+Math.floor(t()*2),o=n-2+(t()-.5)*1.4;for(let a=0;a<r;a++)s.push(o-(a===0?-.3:a===r-1?1.3:.3));s.push(.3+t()*.9)}for(let r=0;r<U;r++){let o=0;for(let a=0;a<U;a++)t()<.2&&(o=(t()-.5)*2),i.set(r,a,At(e,s[r]+o))}for(let r=0;r<5;r++){const o=Math.floor(t()*U),a=Math.floor(t()*U);i.set(o,a,e[0]),i.set(o,a+1,e[1])}}function zl(i,t,e,n){for(let s=0;s<U;s++)for(let r=0;r<U;r++){if(r===0||s===0||r===U-1||s===U-1){i.set(r,s,At(n,1+t()*2.5));continue}const o=Math.abs(r-7.5),a=Math.abs(s-7.5),c=.45*Math.max(o,a)+.55*Math.hypot(o,a)+(t()-.5)*.3;let l;Math.max(o,a)>6?l=Ln(e[0],n[n.length-1],.35):c<1.2?l=e[0]:l=c%2.2<.85?e[0]:c%2.2<1.5?e[1]:e[2],i.set(r,s,We(l,t,.06))}}function JS(i,t){const e=pt("#b4b1a8","#c3c0b7","#d1cfc6","#dddbd3","#e8e6df"),n=pt("#1f1f1f","#2c2c2c","#3a3a3a"),s=Le(t,2,8);Hn(i,e,un((r,o)=>s(r,o)*.5+t()*.6),[1,2,3,3,2]);for(let r=0;r<9;r++){const o=Math.floor(t()*U),a=Math.floor(t()*U),c=2+Math.floor(t()*4);for(let l=0;l<c;l++)i.set(o+l,a,Ie(t,n));if(c>3&&t()<.5)for(let l=1;l<c-1;l++)i.set(o+l,a+1,Ie(t,n))}}const Hd=pt("#382916","#45331c","#523d23","#5f472a","#6c5131","#7a5d39"),Vd=pt("#21160b","#2a1d0f","#342413","#3e2c18","#48331d","#533c23"),QS=pt("#9d9a91","#c3c0b7","#d1cfc6","#e2e0d8");function Gl(i,t,e,n=.18){const s=Bc(t,6,6,.9,.4),r=Array.from({length:s.count},()=>1.5+t()*(e.length-2.5)),o=new Float32Array(U*U);for(let h=0;h<U;h++)for(let u=0;u<U;u++){const f=s.at(u,h),d=s.at(u+1,h)!==f||s.at(u,h+1)!==f,m=s.at(u-1,h)!==f||s.at(u,h-1)!==f;i.set(u,h,At(e,r[f]+(t()-.5)*1.2+(m?1:0)-(d?1.3:0))),o[h*U+u]=(d?.3:0)+t()}const a=Array.from({length:U*U},(h,u)=>u).sort((h,u)=>o[u]-o[h]),c=Math.round(U*U*n),l=new Uint8Array(U*U);for(let h=0;h<c;h++)l[a[h]]=1;for(let h=0;h<U;h++)for(let u=0;u<U;u++)l[h*U+u]?i.alpha(u,h,0):l[Gu(u,h-1)]&&i.set(u,h,yn(i.get(u,h),.78))}const Ho=pt("#2c6a1b","#367d21","#418f28","#4ca030","#5ab03b","#69bd47");function t2(i,t){for(let e=0;e<20;e++){let n=1+Math.floor(t()*14);const s=3+Math.floor(t()*12),r=t()<.5?-1:1,o=.3+t()*.4,a=1+t()*3;for(let c=0;c<s&&(c>s*o&&t()<.35&&(n+=r),!(n<0||n>=U));c++)i.set(n,U-1-c,At(Ho,a+c/s*1.6-.9))}}const em=[".......g........",".......g........","....G..g..G.....",".....GGg.GG.....","......Ggg.......",".......g........",".......g........"];function e2(i,t){const e={g:Ho[2],G:Ho[1],Y:pt("#f2d421","#f7dc2c"),y:k("#fff27c"),o:k("#e0a10e")};li(i,t,em,e,0,9),li(i,t,[".yYY.","yYYYo","YYoYo",".Yoo."],e,5,5)}function n2(i,t){const e={g:Ho[2],G:Ho[1],R:pt("#e0282a","#d62224"),r:k("#a8141a"),l:k("#ff5a4f"),k:k("#2b0b0b")};li(i,t,em,e,0,9),li(i,t,[".lRr.","lRRRr","RRkRr","rRRrr",".rrr."],e,5,4)}function i2(i,t){const e={b:pt("#7a5429","#87602f"),B:k("#5e3f1c"),l:k("#9c7440")};li(i,t,["................","..l.........l...","...b.......b..l.",".l..b.....b..b..","..b..b...l..b...","...b.b..b..b....","....bb..b.b..l..",".l...b.b.bb.b...","..b..bbbbb..b...","...bb.bBb..b....",".....bBBb.b.....","......BBbb......",".......BB.......",".......BB.......",".......BB.......",".......BB......."],e)}const s2=pt("#5d4124","#6e4e2c");function Hl(i,t,e,n,s){li(i,t,e,{d:n[0],g:[n[1],n[2]],G:[n[3],n[4]],L:n[5],t:s[1],T:s[0]})}const r2=["................","................","......gGg.......","....gGLGGgg.....","...gGLGgGLGg....","..gGGdGGLGGgd...","..gLGgdGgGdGg...","...gGGgGLGgGd...","..dgGdgGGdGGg...","...dgGgtgGgd....",".....dgtTgd.....",".......tT.......",".......tT.......",".......tT.......",".......tT.......","......tTTT......"],o2=["................",".......gG.......",".....gGLGg......","....gGLGGGg.....","...gGGgLGgGd....","...gLGdGGLGg....","....gGGgGGgd....",".....dgGtgd.....","......dgtd......","........t.......",".......Tt.......","........t.......","........t.......",".......tT.......","........t.......",".......ttT......"],a2=["................",".......g........","......gGg.......",".....gGLGd......","......gGd.......","....gGGLGGd.....","...gGLGGGLGd....",".....dgtgd......","...gGGgtGGgd....","..gGLGGtGGLGd...",".gGGgGGtGgGGGd..","....dd.tT.dd....",".......tT.......",".......tT.......",".......tT.......","......tTTT......"];function c2(i){return t=>{const e=$p(99537381),n=pt("#245d15","#2f7419","#3c8a22","#4b9e2d","#5db23a"),s=pt("#6e5016","#8a671f","#a6812a","#bf9a37","#d5b24b","#e6c963"),r=Math.min(1,Math.max(0,(i-3)/4)),o=l=>Ln(At(n,l),At(s,l+.8),r),a=i>=7?s.slice(1):i===6?s.slice(1).map(l=>Ln(l,n[3],.3)):s.slice(1).map(l=>Ln(l,n[3],.6)),c=9;for(let l=0;l<c;l++){const h=l%2===0;let u=Math.min(U-1,Math.max(0,Math.round(.8+l*1.8+(e()-.5)*.8)));const f=.72+e()*.28,d=Math.max(1,Math.round((1.6+i*1.8)*f)),m=e()<.5?-1:1,v=Math.floor(d*(.45+e()*.3)),g=1+Math.floor(e()*3),p=i>=5?i-2:0,M=h?2.2:1.2;for(let E=0;E<d;E++){const _=U-1-E;if(E===v&&i>=2&&e()<.7&&(u=Math.min(U-1,Math.max(0,u+m))),E>=d-p){const T=(E&1)===0;t.set(u,_,At(a,(h?3:2)+(T?1:-1))),(T||E===d-p)&&t.set(u-m,_,At(a,(h?2:1)+(T?-1:1))),E===d-1&&t.set(u,_-1,At(a,4))}else if(t.set(u,_,o(M+(E%3===0?.6:0))),i>=1&&i<=6&&(E===g||i>=3&&E===g+4)){const T=E===g?-m:m;t.set(u+T,_-1,o(M+1)),i>=2&&t.set(u+2*T,_-2,o(M+1.6))}}}}}function l2(i,t){const e=pt("#1b4716","#255b1d","#306f25","#3c832e","#4a9638","#59a944"),n=[0,2,4,3,1,2,4,3,1,2,4,3,1,3,2,0];for(let s=0;s<U;s++)for(let r=0;r<U;r++)i.set(r,s,At(e,n[r]+(t()<.15?-1:0)));for(const[s,r]of[[4,2],[8,6],[12,3],[4,10],[8,13],[12,11]])i.set(s,r,k("#e4e0a6")),i.set(s,r+1,k("#173f12"))}function h2(i,t){const e=pt("#1b4716","#255b1d","#306f25","#3c832e","#4a9638","#59a944");for(let n=0;n<U;n++)for(let s=0;s<U;s++){const r=Math.max(Math.abs(s-7.5),Math.abs(n-7.5)),o=r>7?0:r>6?2:Math.floor(r)%2===0?4:3;i.set(s,n,At(e,o+(t()<.15?-1:0)))}for(const[n,s]of[[3,3],[12,3],[3,12],[12,12],[7,2],[2,8],[13,7],[8,13]])i.set(n,s,k("#e4e0a6"))}function u2(i,t){const e=pt("#86a85a","#94b567","#a1c174","#adcc82");for(let n=0;n<U;n++)for(let s=0;s<U;s++){const r=Math.max(Math.abs(s-7.5),Math.abs(n-7.5));i.set(s,n,r>7?k("#1b4716"):r>6?k("#306f25"):r>5?k("#4a9638"):Ie(t,e))}for(let n=0;n<6;n++)i.set(4+t()*8,4+t()*8,k("#6c8d44"))}function f2(i,t){const e=pt("#7a3829","#8a4332","#994e3a","#a65843","#b4654f","#c0735c"),n=pt("#958f86","#a29c93","#aea99f");for(let s=0;s<4;s++){const r=s%2?4:0;for(let o=0;o<2;o++){const a=1.2+t()*2.2;for(let c=0;c<4;c++)for(let l=0;l<8;l++){const h=o*8+l+r,u=s*4+c;if(c===3||l===7){i.set(h,u,Ie(t,n));continue}const f=a+(c===0?.9:0)-(c===2||l===6?.8:0)+(t()-.5)*.9;i.set(h,u,At(e,f))}}}}function d2(i,t){const e=pt("#8e2626","#2a4c8c","#2d7a39","#8c6a1d","#6a2a7a","#b0802c","#3f6f78","#7a2f4a"),n=pt("#2c1d0c","#352411");Ms(i,t,ni.ramp,0,0,U-1,0,4),Ms(i,t,ni.ramp,0,7,U-1,7,4),Ms(i,t,ni.ramp,0,8,U-1,8,1.5),Ms(i,t,ni.ramp,0,15,U-1,15,1);for(let s=0;s<U;s++)i.set(0,s,At(ni.ramp,3+t())),i.set(U-1,s,At(ni.ramp,1+t()));for(const[s,r]of[[1,6],[9,14]]){for(let a=s;a<=r;a++)for(let c=1;c<U-1;c++)i.set(c,a,Ie(t,n));let o=1;for(;o<U-1;){const a=t()<.2?1:t()<.8?2:3,c=Ie(t,e),l=s+(t()<.35?1:0),h=t()<.6?l+1+Math.floor(t()*3):-1;for(let u=0;u<a&&o<U-1;u++,o++)for(let f=l;f<=r;f++){let d=yn(c,u===0?1.15:u===a-1&&a>1?.8:1);f===l&&(d=yn(d,1.2)),f===h&&(d=Ln(d,k("#e2c46a"),.55)),i.set(o,f,d)}t()<.18&&o<U-2&&o++}}}function p2(i,t){const e=pt("#6b4a22","#8c6430","#b0823b","#cf9f48","#e8bb57","#f8d572","#ffe9a3","#fff7d6"),n=Bc(t,4,4,.95,.5),s=Array.from({length:n.count},()=>3+t()*3.5);for(let r=0;r<U;r++)for(let o=0;o<U;o++){const a=n.at(o,r),c=n.at(o+1,r)!==a||n.at(o,r+1)!==a,l=n.at(o-1,r)!==a||n.at(o,r-1)!==a,h=c?t()*2.2:s[a]+(t()-.5)*1.6+(l?1:0);i.set(o,r,At(e,h))}}function us(i){const t=k(i),e=[Ln(t,bc,.3),Ln(t,bc,.15),t,Ln(t,er,.08),Ln(t,er,.18)];return(n,s)=>{const r=Le(s,4);for(let o=0;o<U;o++)for(let a=0;a<U;a++){const c=a+o+Math.round(r(a,o)*4)&3,l=c===0?-.9:c===1?.7:0;n.set(a,o,At(e,2+l+(s()-.5)*1.1))}}}function Vu(i,t,e){for(let n=0;n<U;n++)for(let s=0;s<U;s++)i.set(s,n,We(e.base,t,.04));for(let n=0;n<U;n++)i.set(n,0,e.light),i.set(0,n,e.light),i.set(n,U-1,e.dark),i.set(U-1,n,e.dark);for(let n=1;n<U-1;n++)i.set(n,1,e.hi),i.set(1,n,e.hi),i.set(n,U-2,e.shadow),i.set(U-2,n,e.shadow);i.set(U-2,1,e.base),i.set(1,U-2,e.base)}const m2={hi:k("#ffffff"),light:k("#f0f0f0"),base:k("#dadada"),shadow:k("#b2b2b2"),dark:k("#8f8f8f")},Ei={hi:k("#fffbc4"),light:k("#fff09a"),base:k("#f5d33a"),shadow:k("#d4a923"),dark:k("#a77d15")},Ya={hi:k("#e6fffc"),light:k("#b4fbf3"),base:k("#5fe0d6"),shadow:k("#36b3aa"),dark:k("#1d827b")};function g2(i,t){Vu(i,t,m2);for(let e=2;e<U-2;e++)i.set(e,7,k("#bdbdbd")),i.set(e,8,k("#ececec"));for(const[e,n]of[[3,3],[12,3],[3,12],[12,12]])i.set(e,n,k("#a4a4a4")),i.set(e-1,n-1,er)}function v2(i,t){Vu(i,t,Ei);for(let e=2;e<U-2;e++)for(let n=2;n<U-2;n++){const s=n+e;s===8||s===9?i.set(n,e,Ln(Ei.base,Ei.light,s===8?.75:.45)):s===11?i.set(n,e,Ln(Ei.base,Ei.light,.3)):s>16&&t()<.12&&i.set(n,e,Ln(Ei.base,Ei.shadow,.5))}i.set(10,11,Ei.shadow),i.set(11,11,Ei.shadow),i.set(5,9,Ei.shadow)}function _2(i,t){Vu(i,t,Ya);for(let e=2;e<U-2;e++)for(let n=2;n<U-2;n++){const s=Math.abs(n-7.5)+Math.abs(e-7.5);s>5&&s<6.1?i.set(n,e,e<7.5?Ya.light:Ya.shadow):s<2.1&&i.set(n,e,Ya.hi)}i.set(4,4,er),i.set(5,3,er)}function x2(i,t){const e=k("#c63a2c"),n=[1.15,1,.88,.6];for(let r=0;r<U;r++)for(let o=0;o<U;o++)i.set(o,r,We(yn(e,n[o%4]),t,.06));for(let r=0;r<U;r++){i.set(r,4,k("#9c2c22")),i.set(r,5,k("#d8d8d8"));for(let o=6;o<=10;o++)i.set(r,o,We(k("#f0f0f0"),t,.04));i.set(r,11,k("#cfcfcf")),i.set(r,12,k("#9c2c22"))}const s=k("#1a1a1a");li(i,t,["###.#..#.###",".#..##.#..#.",".#..#.##..#.",".#..#..#..#.",".#..#..#..#."],{"#":s},2,6)}function Wd(i,t,e){const n=k("#6e1d16");for(let s=0;s<U;s++)for(let r=0;r<U;r++)i.set(r,s,We(n,t,.1));for(let s=0;s<4;s++)for(let r=0;r<4;r++)li(i,t,[".rr.","rRRr","RlRr",".rr."],{r:k("#b8352a"),R:k("#d64a3a"),l:k("#e8705e")},r*4,s*4);e&&(li(i,t,["..kk..",".kgGk.","kgGGgk","kGgGgk",".kgGk.","..kk.."],{k:k("#2a2a2a"),g:k("#6b6b6b"),G:k("#9a9a9a")},5,5),i.set(10,4,k("#9a9a9a")),i.set(11,3,k("#6b6b6b")))}const Ir=pt("#3f2a14","#47301a","#4f361d");function M2(i,t){const e=pt("#8f6b3c","#9d7745","#ab844f","#b89159","#c49d64","#cfa86e");for(let n=0;n<U;n++)for(let s=0;s<U;s++){if(s===0||n===0||s===U-1||n===U-1){i.set(s,n,Ie(t,Ir));continue}if(s%5===0||n%5===0){i.set(s,n,We(k("#62441f"),t,.1));continue}const r=s%5,o=n%5;let a=2.5+(t()-.5)*1.4;(r===1||o===1)&&(a+=1.3),(r===4||o===4)&&(a-=1.3),i.set(s,n,At(e,a))}}function nm(i,t){sc(i,t,ni);const e=pt("#6b4a26","#77542c","#835e33");for(let n=0;n<U;n++)i.set(n,0,Ie(t,Ir)),i.set(n,1,Ie(t,e)),i.set(n,2,Ie(t,e)),i.set(n,3,Ie(t,Ir)),i.set(n,U-1,Ie(t,Ir));for(let n=4;n<U;n++)i.set(0,n,Ie(t,Ir)),i.set(1,n,Ie(t,e)),i.set(U-2,n,Ie(t,e)),i.set(U-1,n,Ie(t,Ir))}function y2(i,t){nm(i,t),li(i,t,["..k...k..","..mk.km..","...mkm...","....k....","...b.b...","..b...b..","..b...b..",".bb...bb."],{k:k("#4a4a4a"),m:k("#b5b5b5"),b:k("#5a3a1a")},3,5)}function b2(i,t){nm(i,t);const e={b:k("#4f3215"),B:k("#7a5328"),m:k("#bdbdbd"),M:k("#8f8f8f"),k:k("#4e4e4e")};li(i,t,["...BBB...kMMMk..","..Bb.bB..kmmmk..","..BBBBB....B....","...mmM.....b....","...mmMk....B....","...mmMM....b....","...mmMk....B....","...mmMM....b....","...mMMk....B....","...MMk.....b...."],e,0,5)}const S2=pt("#5b5b5b","#666666","#717171","#7c7c7c","#878787","#929292");function Wu(i,t){const e=Le(t,8);Hn(i,S2,un((n,s)=>e(n,s)*.4+t()*.8),[1,2,3,3,2,1]);for(let n=0;n<U;n++)i.set(n,0,We(k("#4c4c4c"),t,.08)),i.set(0,n,We(k("#4c4c4c"),t,.08)),i.set(n,U-1,We(k("#3c3c3c"),t,.08)),i.set(U-1,n,We(k("#3c3c3c"),t,.08));for(let n=1;n<U-1;n++)i.set(n,1,We(k("#a0a0a0"),t,.06)),i.set(1,n,We(k("#a0a0a0"),t,.06)),i.set(n,U-2,We(k("#5e5e5e"),t,.06)),i.set(U-2,n,We(k("#5e5e5e"),t,.06))}function E2(i,t){Wu(i,t);for(let e=4;e<=11;e++)i.set(e,4,k("#5a5a5a")),i.set(4,e,k("#5a5a5a")),i.set(e,11,k("#9a9a9a")),i.set(11,e,k("#9a9a9a"))}function Xd(i){return(t,e)=>{Wu(t,e);for(let s=4;s<=11;s++)t.set(s,3,k("#2f2f2f")),t.set(s,4,k("#232323")),t.set(s,5,k("#a5a5a5"));for(let s=3;s<=12;s++)t.set(s,7,k("#a8a8a8")),t.set(s,14,k("#5a5a5a"));for(let s=8;s<=13;s++){t.set(3,s,k("#4a4a4a")),t.set(12,s,k("#9a9a9a"));for(let r=4;r<=11;r++)t.set(r,s,s===8?k("#0e0e0e"):We(k("#191919"),e,.2))}if(!i){for(let s=4;s<=11;s++)t.set(s,13,We(k("#2b2b2b"),e,.2));return}const n=pt("#7a1d06","#b33208","#e0560d","#f78a1b","#fdbb2f","#ffe36a","#fff8cf");for(let s=4;s<=11;s++){const r=2+Math.floor(e()*4);for(let o=0;o<r;o++){const a=13-o;t.set(s,a,At(n,6-o/r*5-e()*.8))}t.set(s,13-r,k("#3a1004"))}}}const Yd=pt("#2b1a09","#34200c","#3d260f");function iu(i,t,e){const n=(zd.ramp.length-1)/2;Ms(i,t,zd.ramp,0,0,U-1,U-1,n);for(let s=0;s<U;s++)for(let r=0;r<U;r++){const o=s%5;o===0&&i.set(r,s,yn(i.get(r,s),1.12)),o===4&&i.set(r,s,yn(i.get(r,s),.82))}if(jp(i,t,Yd),e)for(let s=1;s<U-1;s++)i.set(s,5,Ie(t,Yd)),i.set(s,6,yn(i.get(s,6),.8)),i.set(s,4,yn(i.get(s,4),1.1))}function w2(i,t){iu(i,t,!0),li(i,t,["kkkk","kmMk","kmMk","kMdk","kMMk","kkkk"],{k:k("#2a2a2a"),m:k("#e4e4e4"),M:k("#b0b0b0"),d:k("#3a3a3a")},6,3)}function T2(i){const t=pt("#5a3d1c","#7a5529","#956a35");for(let e=8;e<U;e++)i.set(7,e,t[2]),i.set(8,e,t[1]);i.set(8,15,t[0]),i.set(7,8,k("#6b4a22")),i.set(8,8,k("#4a3216")),i.set(7,6,k("#ffd84a")),i.set(8,6,k("#ffa62b")),i.set(7,7,k("#fffbe8")),i.set(8,7,k("#ffe066"))}function A2(i,t){const e=pt("#5e4320","#77562b","#8e6935","#a07a40");for(let n=0;n<U;n++)i.set(1,n,At(e,2.5+(t()-.5))),i.set(2,n,At(e,1.2+(t()-.5))),i.set(13,n,At(e,2.5+(t()-.5))),i.set(14,n,At(e,1.2+(t()-.5)));for(let n=1;n<U;n+=4){for(let s=3;s<=12;s++)i.set(s,n,At(e,3-(t()<.2?1:0))),i.set(s,n+1,At(e,1+(t()<.3?1:0)));i.set(2,n,k("#3b2912")),i.set(13,n,k("#3b2912"))}}function Kd(i){const t=pt("#45301a","#4d361d"),e=pt("#674a28","#70522d");return(n,s)=>{for(let r=0;r<U;r++)for(let o=0;o<U;o++){const a=i?r<=2||r===12||r===13:r===6||r===7||r>=13;let c;if(o===0||o===U-1||r===(i?0:U-1))c=Ie(s,t);else if(o===1||o===U-2||a){const l=i?r===2||r===13:r===7||r===14;c=At(ni.ramp,4.2+(s()-.5)*1.2-(o===U-2?1.4:0)-(l?1.6:0))}else{const l=(o-2)%3;c=l===2?We(k("#6a4e2b"),s,.08):At(ni.ramp,2.3+(l===0?.7:0)+(s()-.5)*1.1)}n.set(o,r,c)}if(i){for(let r=3;r<=11;r++)for(let o=3;o<=12;o++)n.set(o,r,Ie(s,e));for(const r of[4,8])for(const o of[4,9])for(let a=r;a<r+3;a++)for(let c=o;c<o+3;c++)n.set(c,a,bc,0)}else{for(let r=2;r<=4;r++)n.set(13,r,k("#2d2d2d"));n.set(11,3,k("#cfcfcf")),n.set(12,3,k("#8f8f8f")),n.set(11,4,k("#5c4326")),n.set(12,4,k("#5c4326"))}}}const Fr=pt("#7c5a30","#94703f","#aa854f","#bd9862","#cdaa73"),As=pt("#6f1518","#861b1f","#9e2327","#b42b2e","#c63a3b","#d65050"),Lo=pt("#bdbdbd","#d0d0d0","#e1e1e1","#eeeeee","#fafafa");function im(i,t,e,n){for(let s=e;s<=n;s++)for(let r=1;r<U-1;r++){const o=(r+s)%4===0?-.7:(r-s+U)%4===2?.5:0;i.set(r,s,At(As,2.6+o+(t()-.5)*.8))}}function sm(i,t){for(let e=0;e<U;e++)i.set(0,e,At(Fr,3+(t()-.5))),i.set(U-1,e,At(Fr,1.5+(t()-.5)))}function R2(i,t){sm(i,t);for(let e=0;e<=5;e++)for(let n=1;n<U-1;n++){const s=e===0||e===5,r=n===1||n===U-2;let o=3.3+(t()-.5)*.6;e===1&&(o+=.8),(s||r)&&(o=1.5),s&&r&&(o=.3),i.set(n,e,At(Lo,o))}im(i,t,6,U-1);for(let e=1;e<U-1;e++)i.set(e,6,At(Lo,2.5+(t()-.5))),i.set(e,7,At(As,1))}function C2(i,t){sm(i,t),im(i,t,0,U-1);for(let e=1;e<U-1;e++)i.set(e,11,At(As,4.6)),i.set(e,12,At(As,3.6)),i.set(e,13,At(As,.4))}function Ka(i){return(t,e)=>{for(let n=0;n<U;n++)i?(t.set(n,7,At(Lo,4)),t.set(n,8,At(Lo,3+(e()-.5))),t.set(n,9,At(Lo,1.6))):(t.set(n,7,At(As,4.5)),t.set(n,8,At(As,2.8+(e()-.5)*.8)),t.set(n,9,At(As,1.5))),t.set(n,10,At(Fr,3.8)),t.set(n,11,At(Fr,2.5+(e()-.5))),t.set(n,12,At(Fr,1));for(let n=13;n<U;n++)for(const s of[0,1,2,13,14,15]){const r=s===0||s===13?2.6:s===2||s===15?.6:1.7;t.set(s,n,At(Fr,r))}}}function qd(i){const t=pt("#2546a9","#2a50b9","#2f5ac6","#3664d0","#3f6fd8"),e=k("#6f97e8"),n=k("#93b4f0");return(s,r)=>{const o=i?Le(r,8,2):Le(r,4),a=un((c,l)=>o(c,l)*.75+r()*.35);for(let c=0;c<U;c++)for(let l=0;l<U;l++){const h=a[c*U+l];s.set(l,c,zu(t,h,[1,2,3,2,1]),Math.round(178+h*14))}if(i)for(let c=0;c<9;c++){const l=Math.floor(r()*U),h=Math.floor(r()*U),u=2+Math.floor(r()*4);for(let f=0;f<u;f++)s.set(l,h+f,f===0?n:e,196)}else for(let c=0;c<7;c++){const l=Math.floor(r()*U),h=Math.floor(r()*U),u=3+Math.floor(r()*3);for(let f=0;f<u;f++)s.set(l+f,h+(f===0||f===u-1?0:1),f===1?n:e,196)}}}function $d(i){const t=pt("#5c1403","#822006","#a72e08","#ca420b","#e35b10","#f27a17","#f99d22","#fdc334","#ffe370","#fff4bf");return(e,n)=>{const s=i?Le(n,4,2):Le(n,4),r=i?Le(n,8,3):Le(n,8),o=un((a,c)=>s(a,c)*.6+r(a,c)*.4+n()*.12);Hn(e,t,o,[1,1.4,2,3,3.5,3.5,3,2,1.2,.5])}}let Vl=null;function L2(){if(Vl)return Vl;const i=$p(12648430),t=new Uint8Array(U*U),e=[],n=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]],s=(l,h)=>l>=0&&h>=0&&l<U&&h<U,r=(l,h)=>{let u=0;for(const[f,d]of n)s(l+f,h+d)&&t[(h+d)*U+l+f]&&u++;return u>2},o=(l,h,u)=>(l-7.5)*n[u][0]+(h-7.5)*n[u][1]>=-.5,a=(l,h)=>{t[h*U+l]=1,e.push([l,h,180+Math.floor(i()*50)])},c=[];a(7,8);for(const l of[1,3,5,7])c.push({x:7,y:8,d:l,life:4+Math.floor(i()*6)});for(let l=0;e.length<100&&l<5e3;l++){if(!c.length){const[h,u]=e[Math.floor(i()*Math.min(e.length,40))];let f=Math.floor(i()*8);for(;!o(h,u,f);)f=(f+1)%8;c.push({x:h,y:u,d:f,life:3+Math.floor(i()*6)})}for(let h=0;h<c.length;h++){const u=c[h];if(i()<.15){const v=(u.d+(i()<.5?1:7))%8;o(u.x,u.y,v)&&(u.d=v)}const f=i()<.4?(u.d+(i()<.5?1:7))%8:u.d,d=u.x+n[f][0],m=u.y+n[f][1];if(!s(d,m)||t[m*U+d]||r(d,m)||--u.life<0){c.splice(h--,1);continue}if(u.x=d,u.y=m,a(d,m),i()<.1){const v=(u.d+(i()<.5?2:6))%8;o(d,m,v)&&c.push({x:d,y:m,d:v,life:2+Math.floor(i()*4)})}}}return Vl=e,e}const D2=[3,8,14,21,29,38,48,60,74,90];function P2(i){return t=>{const e=L2(),n=Math.min(e.length,D2[i]);for(let s=0;s<n;s++){const[r,o,a]=e[s];t.set(r,o,s%3===0?k("#262626"):k("#121212"),a)}}}const rm=pt("#a4520a","#b65f0e","#c66c12","#d47a18","#e08a22","#eb9a30");function om(i,t){for(let e=0;e<U;e++)for(let n=0;n<U;n++){const s=n%4,r=s===0?.6:s===2?4.2:2.8;i.set(n,e,At(rm,r+(t()-.5)*1.3-(e===0||e===U-1?.8:0)))}}function I2(i,t){for(let n=0;n<U;n++)for(let s=0;s<U;s++){const r=Math.max(Math.abs(s-7.5),Math.abs(n-7.5)),o=Math.floor(r)%3===0?1.2:3.2;i.set(s,n,At(rm,o+(t()-.5)*1.2))}const e=pt("#3d4a1c","#4f5f23","#617329");for(let n=6;n<=9;n++)for(let s=6;s<=9;s++)i.set(s,n,Ie(t,e));i.set(6,6,k("#2e3815")),i.set(9,9,k("#2e3815"))}function jd(i){return(t,e)=>{om(t,e);const n=(s,r)=>{const o=i?r>=10?k("#ffe46b"):k("#ffbf2e"):k("#2a1404");t.set(s,r,i?Ln(o,er,e()*.25):We(o,e,.3))};for(const s of[3,10]){n(s+1,4);for(let r=s;r<=s+2;r++)n(r,5);for(let r=s;r<=s+2;r++)n(r,6)}for(let s=3;s<=12;s++)n(s,10);for(let s=2;s<=13;s++)s!==5&&s!==10&&n(s,11);for(let s=3;s<=12;s++)s!==7&&s!==8&&n(s,12);for(let s=5;s<=10;s++)n(s,13)}}function k2(i,t){const e=pt("#5d8a33","#6f9e3c","#84b44a","#98c45a","#aed36f"),n=k("#c9d98c");for(const[s,r,o]of[[3,1,0],[8,0,2],[12,3,1]])for(let a=r;a<U;a++){const c=(a+o)%5===0;i.set(s,a,c?n:At(e,3+(t()-.5))),i.set(s+1,a,c?Ln(n,e[1],.5):At(e,1.4+(t()-.5)))}for(const[s,r,o]of[[2,6,-1],[5,10,1],[10,4,1],[7,12,-1],[14,9,1]])i.set(s,r,e[2]),i.set(s+o,r-1,e[3])}function N2(i,t){for(let e=0;e<U;e++)for(let n=0;n<U;n++)n===0||e===0||n===U-1||e===U-1?i.set(n,e,At(ni.ramp,1+(t()-.5))):n===7||n===8||e===7||e===8||n===1||e===1||n===U-2||e===U-2?i.set(n,e,At(ni.ramp,3.4+(t()-.5)*1.2)):(n===3||n===12)&&(e===3||e===12)?i.set(n,e,k("#5c4426")):i.set(n,e,bc,0);i.set(7,7,k("#4a3216")),i.set(8,8,k("#4a3216"))}const U2={stone:Qp,grass_side:(i,t)=>{Fl(i,t),Od(i,t,Zp,k("#356a1d"),3)},grass_top:IS,dirt:Fl,cobblestone:tm,oak_planks:(i,t)=>sc(i,t,ni),birch_planks:(i,t)=>sc(i,t,jS),spruce_planks:(i,t)=>sc(i,t,ZS),oak_log:(i,t)=>Gd(i,t,Hd),oak_log_top:(i,t)=>zl(i,t,pt("#8a6a3c","#a9864f","#b8955d"),Hd),birch_log:JS,birch_log_top:(i,t)=>zl(i,t,pt("#b49f68","#cdba85","#d9c893"),QS),spruce_log:(i,t)=>Gd(i,t,Vd),spruce_log_top:(i,t)=>zl(i,t,pt("#5a3e22","#76552f","#846138"),Vd),oak_leaves:(i,t)=>Gl(i,t,pt("#1f4a17","#29601d","#337223","#3e842a","#4a9531","#58a53b")),birch_leaves:(i,t)=>Gl(i,t,pt("#395c24","#456c2b","#527c33","#5f8c3b","#6d9b44","#7ca94f")),spruce_leaves:(i,t)=>Gl(i,t,pt("#14301d","#1b3d24","#224a2b","#2a5733","#33643b","#3d7044")),sand:VS,gravel:WS,sandstone_side:XS,sandstone_top:YS,sandstone_bottom:KS,glass:i=>{const t=k("#f2fafc"),e=k("#d4e9f0"),n=k("#a8c9d5");for(let s=0;s<U;s++)i.set(s,0,t),i.set(0,s,t),i.set(s,U-1,n),i.set(U-1,s,n);i.set(U-1,0,e),i.set(0,U-1,e);for(const[s,r]of[[3,6],[4,5],[5,4],[6,3],[5,6],[6,5],[10,12],[11,11],[12,10]])i.set(s,r,s+r>15?e:er)},bedrock:zS,water_flow:qd(!0),water_still:qd(!1),lava_flow:$d(!0),lava_still:$d(!1),coal_ore:(i,t)=>Xa(i,t,pt("#141414","#262626","#404040")),iron_ore:(i,t)=>Xa(i,t,pt("#9c765e","#cfa486","#ebcdb7")),gold_ore:(i,t)=>Xa(i,t,pt("#b88a10","#f2cc2e","#fff3a0")),diamond_ore:(i,t)=>Xa(i,t,pt("#1b9a94","#4de0e6","#c9fffb"),4),snow:qS,snowy_grass_side:(i,t)=>{Fl(i,t),Od(i,t,Jp.slice(1),k("#c3d1d9"),3)},ice:$S,cactus_side:l2,cactus_top:h2,cactus_bottom:u2,tall_grass:t2,dandelion:e2,poppy:n2,dead_bush:i2,bricks:f2,stone_bricks:FS,mossy_cobblestone:OS,obsidian:GS,bookshelf:d2,glowstone:p2,wool_white:us("#e9ecec"),wool_red:us("#a12722"),wool_pink:us("#ed8dac"),wool_yellow:us("#f8c527"),wool_green:us("#5e7c16"),wool_blue:us("#35399d"),wool_purple:us("#7a2aac"),wool_black:us("#1d1d21"),crafting_table_side:y2,crafting_table_top:M2,crafting_table_front:b2,furnace_side:Wu,furnace_top:E2,furnace_front:Xd(!1),furnace_front_lit:Xd(!0),chest_side:(i,t)=>iu(i,t,!0),chest_top:(i,t)=>iu(i,t,!1),chest_front:w2,torch:T2,ladder:A2,door_bottom:Kd(!1),door_top:Kd(!0),stone_slab_side:(i,t)=>{Bd(i,t);for(let e=0;e<U;e++)i.set(e,0,k("#bdbdbd")),i.set(e,7,k("#7c7c7c")),i.set(e,8,k("#bdbdbd")),i.set(e,U-1,k("#7c7c7c"))},stone_slab_top:(i,t)=>{Bd(i,t),jp(i,t,pt("#7c7c7c","#818181"))},bed_foot_side:Ka(!1),bed_foot_top:C2,bed_foot_end:Ka(!1),bed_head_side:Ka(!1),bed_head_top:R2,bed_head_end:Ka(!0),farmland_top:kS,...Object.fromEntries(Array.from({length:8},(i,t)=>[`wheat_${t}`,c2(t)])),oak_sapling:(i,t)=>Hl(i,t,r2,pt("#1f4a17","#2c621f","#367425","#41862c","#4d9733","#62ad42"),s2),birch_sapling:(i,t)=>Hl(i,t,o2,pt("#395c24","#4a702d","#577f35","#668f3e","#749e47","#88b257"),pt("#3a3a3a","#e0ded6")),spruce_sapling:(i,t)=>Hl(i,t,a2,pt("#14301d","#1d4126","#244e2d","#2d5c36","#37693f","#4a7f50"),pt("#2e1f10","#4a3420")),tnt_side:x2,tnt_top:(i,t)=>Wd(i,t,!0),tnt_bottom:(i,t)=>Wd(i,t,!1),iron_block:g2,gold_block:v2,diamond_block:_2,glass_pane_top:(i,t)=>{for(let e=0;e<U;e++)for(let n=0;n<U;n++)i.set(n,e,We(k("#cfe3ea"),t,.06))},trapdoor:N2,pumpkin_side:om,pumpkin_top:I2,pumpkin_face:jd(!1),jack_o_lantern:jd(!0),sugar_cane:k2,...Object.fromEntries(Array.from({length:10},(i,t)=>[`destroy_${t}`,P2(t)]))},Zd=9;function su(i,t,e,n=()=>!0){t.forEach((s,r)=>{for(let o=0;o<s.length;o++){const a=e[s[o]];a&&n(o)&&i.set(o,r,k(a))}})}function fs(i,t){return e=>su(e,i,t)}function Wl(i,t,e,n){return s=>{const r=o=>n?o<=4:o>=4;su(s,i,e,o=>!r(o)),su(s,i,t,r)}}const Xl=[".kkk.kkk.","kWWRkRRRk","kWRRRRRRk","kRRRRRRDk",".kRRRRDk.","..kRRDk..","...kDk...","....k....","........."],Jd={k:"#1e0505",W:"#ffc4c4",R:"#e0201f",D:"#a3100f"},Qd={k:"#1e0505",W:"#4a3434",R:"#2f1e1e",D:"#241616"},Yl=["....kkkk.","...kMHMMk","..kMHMMMk","..kMMMMDk",".kWkMMDk.","kWWWkkk..","kWWk.....",".kk......","........."],t0={k:"#2a1405",M:"#b5642a",H:"#e09a52",D:"#7f3f14",W:"#f2eee4"},e0={k:"#2a1405",M:"#33261b",H:"#45362a",D:"#271c13",W:"#3a3a36"},Kl=["kkk...kkk","kLLkkkLAk","kLAAAAAAk","kkAAAAAkk",".kLAAAAk.",".kAAAADk.",".kAAADDk.",".kkkkkkk.","........."],n0={k:"#1c1c1c",L:"#ffffff",A:"#d6d6d6",D:"#9a9a9a"},i0={k:"#1c1c1c",L:"#3c3c3c",A:"#2c2c2c",D:"#232323"},O2=["..kkkkk..",".kLLLLLk.","kLWWBBBLk","kLWBBBBLk","kLBBBBBLk","kLBBBBDLk","kLBBBDDLk",".kLLLLLk.","..kkkkk.."],F2=["....k....",".k..L..k.","..L...L..",".........","kL.....Lk",".........","..L...L..",".k..L..k.","....k...."],s0={k:"#0d2a5e",L:"#8fc3ff",W:"#ffffff",B:"#c9e4ff",D:"#a3cbff"},B2={heart_full:fs(Xl,Jd),heart_half:Wl(Xl,Jd,Qd,!0),heart_empty:fs(Xl,Qd),food_full:fs(Yl,t0),food_half:Wl(Yl,t0,e0,!1),food_empty:fs(Yl,e0),armor_full:fs(Kl,n0),armor_half:Wl(Kl,n0,i0,!0),armor_empty:fs(Kl,i0),bubble:fs(O2,s0),bubble_pop:fs(F2,s0)},hi=16,r0=i=>i[0]*.299+i[1]*.587+i[2]*.114;class Li{constructor(t=hi,e=hi){S(this,"c");S(this,"o");this.w=t,this.h=e,this.c=new Array(t*e).fill(null),this.o=new Array(t*e).fill(null)}inside(t,e){return t>=0&&e>=0&&t<this.w&&e<this.h}put(t,e,n,s=null){this.inside(t,e)&&(this.c[e*this.w+t]=n,this.o[e*this.w+t]=s)}emit(t){for(let e=0;e<this.h;e++)for(let n=0;n<this.w;n++){const s=this.c[e*this.w+n];if(s){t.set(n,e,s);continue}let r=null;for(const[o,a]of[[1,0],[-1,0],[0,1],[0,-1]]){if(!this.inside(n+o,e+a))continue;const c=this.o[(e+a)*this.w+n+o];c&&(!r||r0(c)<r0(r))&&(r=c)}r&&t.set(n,e,r)}}}function am(i,t,e,n,s,r=0,o=0){e.forEach((a,c)=>{for(let l=0;l<a.length;l++){const h=n[a[l]];if(!h)continue;const u=Array.isArray(h)?h:[h],f=s===null?null:typeof s=="string"?s:s[a[l]]??s["*"]??null;i.put(r+l,o+c,k(u[Math.floor(t()*u.length)]),f?k(f):null)}})}function Ee(i,t,e){return(n,s)=>{const r=new Li(n.width,n.height);am(r,s,i,t,e),r.emit(n)}}const si=(i,t,e,n,s)=>({hi:k(i),light:k(t),mid:k(e),dark:k(n),outline:k(s)});function Wi(i,t,e){for(let n=0;n<i.h;n++)for(let s=0;s<i.w;s++){if(!t(s,n))continue;const r=t(s,n-1),o=t(s-1,n),a=!r||!o,c=!t(s,n+1)||!t(s+1,n);let l=a&&!c?e.light:c&&!a?e.dark:e.mid;!r&&!o&&!c&&(l=e.hi),i.put(s,n,l,e.outline)}}const cm=(i,t="#")=>(e,n)=>n>=0&&n<i.length&&e>=0&&i[n][e]===t,ql=si("#b38b50","#a27c45","#8a6837","#6a4f27","#2a1c0b");function ru(i,t,e=-11){for(let n=0;n<hi;n++)for(let s=0;s<hi;s++){const r=s-n,o=s+n;(o===15||o===16)&&r>=e&&r<=t&&i.put(s,n,o===15?ql.light:ql.dark,ql.outline)}}const z2=["................","................","...########.....",".....########...",".........####...","..........####..","...........###..","............##..","............##..","............##..","............##..",".............#..",".............#.."];function G2(i,t){const e=i-t,n=i+t;if(n-e<2||e-n>-2)return!1;if(n>=7&&n<=14){const s=14-n,r=n===7?1.2:0;return e>=2-s*.65+r&&e<=4+s*.6-r}return(n===17||n===18)&&Math.abs(e-3)<=1.5}const H2=["................","................","...........####.","..........#####.","..........#####.","..........####..","...........##..."],V2=["................","................",".....########...","....#########...","....##.....##...","....#..........."];function W2(i,t){return e=>{const n=new Li;if(i==="sword"){const o=(l,h)=>{const u=l-h,f=l+h;return f>=14&&f<=16&&u>=-1&&u<=13-Math.abs(f-15)};ru(n,-4,-8),Wi(n,o,t),Wi(n,(l,h)=>{const u=l-h,f=l+h;return(u===-2||u===-3)&&f>=11&&f<=20},{...t,hi:t.mid,light:t.mid,mid:t.dark,dark:Ln(t.dark,t.outline,.4)}),Wi(n,(l,h)=>{const u=l-h,f=l+h;return(u===-9||u===-10)&&f>=14&&f<=17},t),n.emit(e);return}const s={pickaxe:4,axe:6,shovel:4,hoe:6}[i];ru(n,s);const r=i==="axe"?G2:cm({pickaxe:z2,shovel:H2,hoe:V2}[i]);Wi(n,r,t),n.emit(e)}}const rc={wooden:si("#c9a466","#b8925a","#a5824f","#8b6a3e","#3b2a12"),stone:si("#b8b8b8","#a4a4a4","#8a8a8a","#6a6a6a","#2c2c2c"),iron:si("#ffffff","#f2f2f2","#d8d8d8","#a9a9a9","#383838"),golden:si("#fffbd0","#fbe77a","#f2cf3a","#c99b1b","#4f3604"),diamond:si("#e8fffc","#b4fbf3","#5fe0d6","#2aa69e","#0c3f3b")},X2=["................","................","................",".....######.....","....########....","...##########...","...##########...","...##########...","...####..####...","...###....###...","...##......##..."],Y2=["................","................","..####....####..",".######..######.",".##############.",".##############.",".##.########.##.","...##########...","...##########...","...##########...","...##########...","...##########...","...##########...","....########...."],K2=["................","................","...##########...","...##########...","...####..####...","...####..####...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###..."],q2=["................","................","................","................","................","................","................","...###....###...","...###....###...","...###....###...","...###....###...","..####...####...","..####...####..."],lm={helmet:X2,chestplate:Y2,leggings:K2,boots:q2},$2={helmet:["","","","","","....l...........","","...dddddddddd..."],chestplate:["","","","","......dddd......","..l.............","",".......dd.......",".......dd.......",".......dd.......","","","",""],leggings:["","","....l...........","...dddddddddd..."],boots:["","","","","","","","","","","","","..dddd...dddd..."]},j2={leather:si("#b88148","#a46f3a","#8b5a2b","#6a431f","#2e1b0a"),iron:rc.iron,golden:rc.golden,diamond:rc.diamond};function Z2(i,t){const e=lm[i],n=$2[i];return s=>{const r=new Li,o=cm(e);Wi(r,o,t),n.forEach((a,c)=>{for(let l=0;l<a.length;l++)o(l,c)&&a[l]!=="."&&r.put(l,c,a[l]==="d"?t.dark:t.light,t.outline)}),r.emit(s)}}const J2=i=>{const t=new Li;ru(t,9,-9),t.emit(i)},hm=["................","................","................",".......abb......",".....aabbbc.....","....abbbcbbc....","....babbbbcc....","...abbbbbcbcd...","...bbcbbbbccd...","...bbbbcbbccd...","....bbbbbccdd...","....cbccccdd....",".....ccddd......"],Q2=Ee(hm,{a:"#5c5c5c",b:["#3a3a3a","#363636"],c:"#262626",d:"#171717"},"#080808"),tE=Ee(hm,{a:"#6a5646",b:["#45382e","#41352b"],c:"#30271f",d:"#1e1813"},"#0c0907"),um=["................","................","................","................","................","......hhhhhhh...",".....hlllllllr..","....hlllllllrr..","...ffffffffrr...","...mmmmmmmmr....","...dddddddd....."],eE=Ee(um,{h:"#ffffff",l:"#e8e8e8",r:"#9c9c9c",f:"#d4d4d4",m:"#c2c2c2",d:"#8e8e8e"},"#353535"),nE=Ee(um,{h:"#fffbd0",l:"#fbe46a",r:"#c4931a",f:"#f2cf3a",m:"#e3b92b",d:"#b4840f"},"#4f3604"),iE=Ee(["................","................","................",".....wwllll.....","....wllbbbbc....","...wlbbbbbbcc...","..llbbbbbbbbcc..","..lbbbbbbbbbcd..","...bbbbbbbbccd..","....bbbbbbccd...",".....bbbbccd....","......bbccd.....",".......bcd......","........d......."],{w:"#ffffff",l:"#b9fbf3",b:"#5fe0d6",c:"#2fb3aa",d:"#1b7f78"},"#0c3f3b"),sE=Ee(["................","................","................","........a.......",".......abb......","......abbbc.....",".....abbcbbc....",".....bbbbcbc....","....abbcbbbcc...","....bbbbbcbcc...","....bcbbbbccd...",".....bbcbccdd...","......ccccdd....",".......ddd......"],{a:"#7c7c7c",b:"#525252",c:"#3b3b3b",d:"#272727"},"#0f0f0f");function rE(i,t){const e=new Li,n=si("#ffffff","#e6e6e6","#bdbdbd","#858585","#232323");Wi(e,(s,r)=>{const o=s+.5-10.5,a=r+.5-5.5,c=Math.hypot(o,a);return c>=1.9&&c<=3.7&&!(o<0&&Math.abs(a)<1.5)},n),am(e,t,["..ab...",".abbc..","abbcbc.","bbcbccd",".bccdd.","..ddd.."],{a:"#7c7c7c",b:"#545454",c:"#3c3c3c",d:"#282828"},"#0f0f0f",2,8),e.emit(i)}const oE=Ee(["................","................",".............w..","............w...","...........w....","........www.....",".......w........","......w.........","......w.........",".......gw.......",".........w......",".........w......","........w.......","......wg........","....ww.........."],{w:"#f4f4f4",g:"#cfcfcf"},"#3e3e3e");function aE(i){const t=new Li,e=k("#f3f3f3"),n=k("#d6d6d6"),s=k("#a7a7a7");for(let r=0;r<hi;r++)for(let o=0;o<hi;o++){const a=o-r,c=o+r;if(a<-10||a>11)continue;const l=1-Math.abs(a-1)/11,h=Math.round(3.2*Math.sqrt(Math.max(0,l))),u=Math.round(1.6*Math.sqrt(Math.max(0,l)));c===15?t.put(o,r,a<-7?k("#8a8a8a"):s,k("#5a5a5a")):a>-7&&c<15&&15-c<=h?t.put(o,r,(15-c+a)%4===0?n:e,k("#5a5a5a")):a>-7&&c>15&&c-15<=u&&t.put(o,r,n,k("#5a5a5a"))}t.emit(i)}const fm=["................","................","................","................","................","................",".......pp.......",".....pppPpp.....","....pPpppppPp...","...ppppdpPpppp..","..pPpppppppdppp.","..ppdppPpppppp..","...pppppdpppp..."],cE=Ee(fm,{p:["#7a7a7a","#6c6c6c","#858585"],P:"#ababab",d:"#454545"},"#262626"),lE=Ee(fm,{p:["#ebe8dd","#dcd8cc","#f4f2ea"],P:"#ffffff",d:"#bdb8a8"},"#6b665a");function hE(i){const t=new Li,e=k("#f2efe6"),n=k("#d3cebf"),s=k("#5f5a4f");for(let r=0;r<hi;r++)for(let o=0;o<hi;o++){const a=o-r,c=o+r,l=(c===15||c===16)&&Math.abs(a)<=8,h=Math.abs(a)>=8&&Math.abs(a)<=10&&(c>=12&&c<=14||c>=17&&c<=19);(l||h)&&t.put(o,r,c>=16&&!h?n:e,s)}t.emit(i)}function uE(i){const t=new Li,e=si("#ffffff","#dcdcdc","#b0b0b0","#7c7c7c","#262626");Wi(t,(n,s)=>{const r=n-s,o=Math.abs(n+s-15);return r>=8&&r<=11&&o<=11-r+(r===8?1:0)},e);for(let n=0;n<hi;n++)for(let s=0;s<hi;s++){const r=s-n,o=s+n,a=Math.abs(o-15);o===15&&r>=-11&&r<=7?t.put(s,n,r<-6?k("#5e4424"):k("#7d5c33"),k("#2a1c0b")):a>=1&&a<=2&&r>=-11&&r<=-7-a&&t.put(s,n,o<15?k("#f4f4f4"):k("#c4c4c4"),k("#4a4a4a"))}t.emit(i)}function fE(i){const t=new Li,e=si("#b08a52","#9a7542","#80602f","#5e4520","#24180a");for(let n=0;n<hi;n++)for(let s=0;s<hi;s++){const r=s-n,o=s+n;if(Math.abs(r)>11)continue;const a=15-9.5*(1-(r/11.5)**2);if(Math.abs(o-a)<=.9){const l=Math.abs(r)<=2;t.put(s,n,l?k("#5a3a1c"):o<a?e.light:e.mid,e.outline)}else o===15&&Math.abs(r)<=9&&t.put(s,n,k("#e6e6e6"),null)}t.emit(i)}const dE=Ee(["................","................","................","..LL........LL..","..LMMMMMMMMMMM..","...MMMlMMMMMMM..","...MMMMMMMlMM...","...MlMMMMMMMM...","...MMMMMlMMMD...","...MMMMMMMMMD...","...MMlMMMMMMD...","...MMMMMMMMMMD..","..MMDDD...DDDD..","..DD........DD.."],{L:"#b9803f",M:["#9a5f2c","#94592a"],l:"#a96b33",D:"#764720"},"#331e0b"),pE=Ee(["................","................","................","........gg......","......gGgbb.....","....ggbbGbbb....","...gbbbbbblGb...","..gbbGbbbbbbbg..","..bbblbbgbbbbb..","..gbbbbbbbbGbb..","...bbGbbblbbg...","....bbbbgbbb....",".....gbbbbb.....",".......gg......."],{b:["#94563a","#8c5034"],l:"#b0704c",G:"#6f8c35",g:"#55702a"},"#2f1a10"),mE=Ee(["................","................","................","................",".........a......","....a....b......","....b.......a...","............b...",".......a........",".......b...ab...","...ab...........","..........a.....",".......a..b.....",".......b........"],{a:"#b9cf62",b:"#7a9832"},"#26300c"),gE=Ee(["................","...........E..E.","..........Ee.Ee.",".........eE.eE..","........Ee.Ee.E.",".......eE.eE.eE.",".......s.Ee.Ee..","......s.s..eE...","......ss..s.....",".....ss.ss......","....kkks........","....kks.........","...ss...........","..ss............"],{E:"#f4d872",e:"#cfa640",s:["#b8a046","#a58c38"],k:"#7a5222"},"#3d2c08"),vE=Ee(["................","................","................","................","................",".....LLLLLL.....","...LLlLLlLLLL...","..LlLLlLLlLLlL..",".LLLLLLLLLLLLLL.",".MMMMMMMMMMMMMMD",".MMMMMMMMMMMMMD.","..DDDDDDDDDDDD.."],{L:"#c9903f",l:"#ecc26e",M:"#a86e2a",D:"#7a4d1c"},"#3a220c"),_E=Ee(["................","................","........S.......",".......SLL......","....rrrSrrr.....","...rRRRrRRRr....","..rRWRRRRRRRr...","..rRWRRRRRRRr...","..rRRRRRRRRRr...","..rRRRRRRRRDr...","...rRRRRRRDr....","...rRRRRRRDr....","....rRRRRDr.....",".....rrrrr......"],{S:"#5a3a1a",L:"#3f9a2a",r:"#b3161b",R:"#d8262b",W:"#ff9a8f",D:"#8a0f13"},{S:"#1f1006",L:"#123a0c","*":"#3a0507"}),dm=["................","................","................","................",".......ffff.....",".....ffpppff....","....fpppPpppf...","...fppPpppppf...","...fpppppPppf...","..fpppPpppppf...","..fppppppppf....","..fpppppppf.....","...ffpppff......",".....fff........"],xE=Ee(dm,{f:"#f6dcd6",p:["#ea9aa1","#e5939a"],P:"#c96d78"},"#5a2a2e"),ME=Ee(dm,{f:"#e6c48e",p:["#b5783c","#ad7236"],P:"#8a5426"},"#3a210c"),pm=["................","................","................","................","......rrrrr.....","....rrRRrRRrr...","...rRRwRRRRRr...","..rRRRRRRwRRRr..","..rRwRRRRRRRRr..","..rRRRRRRwRRr...","...rRRRRRRRRr...","....rrRRRRrr....","......rrrr......"],yE=Ee(pm,{r:"#9a2320",R:["#cc3630","#c4322c"],w:"#f2c8c4"},"#3f0b0a"),bE=Ee(pm,{r:"#5e3a1e",R:["#8c5c33","#86572f"],w:"#b88c5a"},"#2a1608"),mm=["................","................","................","........mmmm....",".......mMMMMm...","......mMHMMMMm..","......mMMMMMMm..","......mMMMMMm...",".....bmMMMMm....","....bb.mmmm.....","...bb...........",".bbb............",".bb.............","..b............."],SE=Ee(mm,{m:"#d9a493",M:"#f1cbbd",H:"#fff0e8",b:"#f4f0e6"},{b:"#6b665a","*":"#5a3328"}),EE=Ee(mm,{m:"#9c6428",M:"#c98a3e",H:"#e8b56a",b:"#f4f0e6"},{b:"#6b665a","*":"#3a210c"}),gm=["................","................","................","......RRRR......","....RRRRRRRr....","...RRwRRRRRRr...","...RRRRRRwRRr...","...RRRRRRRRRr...","....RRRwRRRr....",".....RRRRRr.....","......rrrb......","........bb......","........bbb.....",".........bb....."],wE=Ee(gm,{R:["#c23b3b","#ba3636"],r:"#8a2626",w:"#eaa9a1",b:"#efe9dc"},{b:"#6b665a","*":"#3a0c0c"}),TE=Ee(gm,{R:["#8f5732","#88522f"],r:"#5e3418",w:"#c48e5c",b:"#efe9dc"},{b:"#6b665a","*":"#2a1608"});function $l(i){return Ee(["................","................","................","......hhhh......","....hh....hh....","...h........h...","...LLLLLLLLLL...","..LiiiiiiiiiiD..","..LLiiiiiiiiDD..","...MMMMMMMMMD...","...LMMMMMMMMD...","....MMMMMMMD....","....LMMMMMMD....",".....MMMMMD....."],{h:"#8a8a8a",L:"#e8e8e8",M:["#c4c4c4","#bcbcbc"],D:"#8c8c8c",i:i??["#4a4a4a","#444444"]},"#2c2c2c")}const AE=Ee(["................","....FFFFFFFF....","....FggFFggf....","....FggFFggf....","....FFFFFFFf....","....FggFFggf....","....FggFFggf....","....FFFFFFFf....","....FPPPPPpf....","....FPPPPPkf....","....FPPPPPpf....","....FFFFFFFf....","....FPPPPPpf....","....FPPPPPpf....","....FFFFFFFf...."],{F:["#b38e58","#ad8853"],f:"#8a6a3c",g:"#3d2c16",P:"#9d7a47",p:"#83633a",k:"#2a2a2a"},"#2e200d"),RE=Ee(["................","................","................","................","................","..pppRRRRRRRRR..",".pppRRRRRRRRRR..",".PPPrrrrrrrrrrr.",".wwwrrrrrrrrrrr.",".FFFFFFFFFFFFFF.",".FF..........FF.",".ff..........ff."],{p:"#f4f4f4",P:"#d0d0d0",w:"#bdbdbd",R:"#c63a3b",r:"#9e2327",F:"#bd9862",f:"#94703f"},{p:"#4a4a4a",P:"#4a4a4a",w:"#4a4a4a","*":"#2e0c0c",F:"#3a2a12",f:"#3a2a12"});function CE(i){const t=new Li,e=si("#ffffff","#f0f0f0","#cdcdcd","#9a9a9a","#262626"),n=si("#8c8c8c","#787878","#606060","#484848","#161616");Wi(t,(o,a)=>{const c=o-a;return c>=0&&c<=10&&Math.abs(o+a-15.5)<=(c<=5?1.6:1.6-(c-5)*.22)},e);const s=(o,a,c,l)=>Math.max(Math.abs(o-c),Math.abs(a-l))===1;Wi(t,(o,a)=>s(o,a,3,8)||s(o,a,8,13)||a===8&&(o===5||o===6)||o===8&&(a===10||a===11)||o===7&&a===9,n),t.put(7,8,k("#3a3a3a"),n.outline),t.emit(i)}const vm=["................","................","................","................","................",".......hh.......","......hCCC......",".....hCCCCC.....","....hCCCCCCC....","...hCCCCCCCCD...","...CCCCCCCCDD...","....DDDDDDDD...."],LE=Ee(vm,{h:"#ff6b5e",C:["#cc282c","#c4252a"],D:"#8a1418"},"#3a0507"),DE=Ee(vm,{h:"#fff28a",C:["#f2c81c","#ecc118"],D:"#b8860b"},"#4f3604"),_m={};for(const[i,t]of Object.entries(rc))for(const e of["pickaxe","axe","shovel","sword","hoe"])_m[`${i}_${e}`]=W2(e,t);const xm={};for(const[i,t]of Object.entries(j2))for(const e of Object.keys(lm))xm[`${i}_${e}`]=Z2(e,t);const PE={stick:J2,coal:Q2,charcoal:tE,iron_ingot:eE,gold_ingot:nE,diamond:iE,flint:sE,flint_and_steel:rE,string:oE,feather:aE,gunpowder:cE,bone:hE,bone_meal:lE,arrow:uE,bow:fE,leather:dE,rotten_flesh:pE,wheat_seeds:mE,wheat:gE,bread:vE,apple:_E,porkchop:xE,cooked_porkchop:ME,beef:yE,steak:bE,chicken:SE,cooked_chicken:EE,bucket:$l(null),water_bucket:$l(["#2f5fd0","#3a6bd8","#4a7ce0"]),lava_bucket:$l(["#e8600f","#f8901c","#ffc23a"]),oak_door_item:AE,bed_item:RE,shears:CE,paper:Ee(["................","................","...wwwwwwwwww...","...wwwwwwwwwww..","...wllllllllww..","...wwwwwwwwwww..","..wwlllllllww...","..wwwwwwwwwww...","..wwllllllllw...","..wwwwwwwwwww...","...wllllllllww..","...wwwwwwwwwww..","...wwwwwwwwww...","................","................","................"],{w:["#f6f6f2","#efefe9"],l:"#c8c8c0"},"#5e5e58"),book:Ee(["................","...dCCCCCCCCC...","...dCCCCCCCCCc..","...dCcyyyyyCCc..","...dCcyCCCyCCc..","...dCcyyyyyCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dpppppppppp..","....pppppppppp..","................","................"],{C:["#7a3f1c","#84461f"],c:"#9b5a2c",d:"#4a250f",y:"#e9c23a",p:["#f2efe4","#e2ddcc"]},"#2a1607"),red_dye:LE,yellow_dye:DE,mutton:wE,cooked_mutton:TE,..._m,...xm},o0=i=>{for(let t=0;t<Qe;t++)for(let e=0;e<Qe;e++)i.set(e,t,e>>3^t>>3?k("#f800f8"):k("#000000"))};function Xu(i,t,e=Qe,n=Qe){const s=new zp(e,n);try{(i??o0)(s,ao(Gp(t)))}catch(r){console.error(`Текстура «${t}» не нарисовалась`,r),o0(s)}return s}function IE(){const i=Gr.length,t=new Uint8Array(i*Qe*Qe*4),e=Gr.map((n,s)=>{const r=Xu(U2[n],n);return t.set(r.px,s*Qe*Qe*4),r});return{data:t,count:i,tiles:e}}const a0=new Map;function Mm(i){let t=a0.get(i);return t||a0.set(i,t=Xu(PE[i],i)),t}const c0=new WeakMap,Rr=i=>{let t=c0.get(i);return t||c0.set(i,t=Uc(i)),t},l0=new Map;function Yu(i,t){const e=l0.get(t);if(e)return e;const n=64,s=document.createElement("canvas");s.width=s.height=n;const r=s.getContext("2d",{willReadFrequently:!0});r.imageSmoothingEnabled=!1;const o=ye(t);if(o&&bs(t)){const c=bn[t],l=h=>i.tiles[Nn[t*384+h]];if(c===Qr||c===qo||c===eo||c===no||c===du||c===mu||c===O0||c===gu)r.drawImage(Rr(l(0)),4,4,56,56);else if(c===Ac){const h=Rr(l(0));for(const[u,f,d,m]of[[6,10,8,46],[50,10,8,46],[14,18,36,8],[14,38,36,8],[28,26,8,12]])r.drawImage(h,u/4,f/4,d/4,m/4,u,f,d,m)}else{const h=c===Ao?.5:c===N0?.9375:c===nh?.875:1,u=c===U0||c===nh||c===pu?4:0;NE(r,Rr(l(2)),Rr(l(4)),Rr(l(0)),h,u)}}else o!=null&&o.sprite&&r.drawImage(Rr(Mm(o.sprite)),4,4,56,56);r.setTransform(1,0,0,1,0,0);const a=s.toDataURL();return l0.set(t,a),a}function kE(i,t){let e=0;const n=r=>typeof requestIdleCallback=="function"?requestIdleCallback(r,{timeout:1e3}):setTimeout(()=>r({timeRemaining:()=>6}),30),s=r=>{const o=performance.now();for(;e<t.length&&(r.timeRemaining()>2||performance.now()-o<3);)Yu(i,t[e++]);e<t.length&&n(s)};n(s)}function NE(i,t,e,n,s,r){const o=(1-s)*32,a=(64-r*2)/64,c=r,l=(h,u,f,d)=>{i.setTransform(u[0]*a,u[1]*a,u[2]*a,u[3]*a,c+u[4]*a,r+u[5]*a),i.globalCompositeOperation="source-over",d?i.drawImage(h,0,Qe*(1-s),Qe,Qe*s,0,0,Qe,Qe*s):i.drawImage(h,0,0),f>0&&(i.globalCompositeOperation="source-atop",i.fillStyle=`rgba(0,0,0,${f})`,i.fillRect(0,0,Qe,d?Qe*s:Qe))};l(t,[2,-1,2,1,0,16+o],0,!1),l(e,[2,1,0,2,0,16+o],.22,!0),l(n,[2,-1,0,2,32,32+o],.42,!0),i.globalCompositeOperation="source-over"}const h0=new Map;function u0(i){let t=h0.get(i);if(!t){const e=Xu(B2[i],i,Zd,Zd);t=Uc(e).toDataURL(),h0.set(i,t)}return t}function UE(i,t,e=0){const n=Uc(i.tiles[vu(t)]);if(e){const s=n.getContext("2d");s.fillStyle=`rgba(0,0,0,${e})`,s.fillRect(0,0,Qe,Qe)}return n.toDataURL()}const OE={menu:"menu",loading:"loading",pause:"pause",death:"death",inventory:"inventory-screen",disconnected:"disconnected"},FE=80,BE=1e4,bt=i=>document.getElementById(i);function oc(i,t,e){var o;const n=t?`${t.id}:${t.count}:${t.dmg??0}`:"";if(i.dataset.key===n||(i.dataset.key=n,i.replaceChildren(),!t))return;const s=document.createElement("img");if(s.src=Yu(e,t.id),s.alt="",s.draggable=!1,i.append(s),t.count>1){const a=document.createElement("span");a.className="count",a.textContent=String(t.count),i.append(a)}const r=(o=ye(t.id))==null?void 0:o.durability;if(r&&t.dmg){const a=1-t.dmg/r,c=document.createElement("span");c.className="dur";const l=document.createElement("i");l.style.width=`${Math.round(a*100)}%`,l.style.background=`hsl(${Math.round(a*120)}, 90%, 50%)`,c.append(l),i.append(c)}}class zE{constructor(t){S(this,"itemNameTimer",0);S(this,"hudKey","");this.atlas=t}show(t){for(const[e,n]of Object.entries(OE))bt(n).hidden=e!==t}setHud(t){bt("hud").hidden=!t}setLoading(t){bt("loading-bar").style.width=`${Math.round(Math.max(0,Math.min(1,t))*100)}%`}renderHotbar(t,e){const n=bt("hotbar");n.childElementCount!==9&&n.replaceChildren(...Array.from({length:9},(s,r)=>{const o=document.createElement("div");return o.className="slot",o.addEventListener("pointerdown",a=>{a.stopPropagation(),e(r)}),o})),Array.from(n.children).forEach((s,r)=>{s.classList.toggle("selected",r===t.selected),oc(s,t.slots[r],this.atlas)})}setStatus(t,e,n,s,r,o){const a=`${Math.ceil(t)}|${e}|${n}|${Math.ceil(s)}|${r}|${o}`;if(a===this.hudKey)return;this.hudKey=a;const c=r==="survival";if(bt("status").style.visibility=c?"visible":"hidden",!c)return;const l=(f,d,m,v,g,p=!0)=>{const M=bt(f);if(M.replaceChildren(),!!p)for(let E=0;E<10;E++){const _=d-E*2,T=_>=2?m:_===1?v:g;if(!T)continue;const w=document.createElement("i");w.style.backgroundImage=`url(${u0(T)})`,M.append(w)}};l("hearts",Math.ceil(t),"heart_full","heart_half","heart_empty"),l("food",e,"food_full","food_half","food_empty"),l("armor-bar",n,"armor_full","armor_half","armor_empty",n>0);const h=Math.ceil(s/15*10),u=bt("air");if(u.replaceChildren(),s<15)for(let f=0;f<h;f++){const d=document.createElement("i");d.style.backgroundImage=`url(${u0(f===h-1&&s%1.5<.4?"bubble_pop":"bubble")})`,u.append(d)}bt("hearts").classList.toggle("shake",o)}flashItemName(t){const e=bt("item-name");e.textContent=t?dg(t):"",e.classList.add("show"),clearTimeout(this.itemNameTimer),this.itemNameTimer=window.setTimeout(()=>e.classList.remove("show"),1600)}addChat(t,e,n){const s=document.createElement("div");if(s.className="chat-line"+(t?"":" system"),t){const o=document.createElement("b");o.textContent=`<${t}> `,e&&(o.style.color=e),s.append(o)}s.append(document.createTextNode(n));const r=bt("chat-log");for(r.append(s);r.childElementCount>FE;)r.firstElementChild.remove();r.scrollTop=r.scrollHeight,setTimeout(()=>s.classList.add("faded"),BE)}openChat(t){bt("chat").classList.add("open"),bt("chat-form").hidden=!1;const e=bt("chat-input");e.value=t,setTimeout(()=>e.focus(),0)}closeChat(){bt("chat").classList.remove("open"),bt("chat-form").hidden=!0,bt("chat-input").blur()}setPlayerList(t){const e=bt("player-list");if(e.hidden=!t,!t)return;const n=document.createElement("div");n.textContent=`Игроки онлайн: ${t.length}`,e.replaceChildren(n,...t.map(s=>{const r=document.createElement("div"),o=document.createElement("i");return o.style.background=s.color,r.append(o,document.createTextNode(s.name)),r}))}setDebug(t){const e=bt("debug");e.hidden=t===null,t!==null&&(e.textContent=t)}setUnderwater(t){bt("underwater").classList.toggle("on",t)}setSleeping(t){bt("sleep-overlay").classList.toggle("on",t)}get isSleeping(){return bt("sleep-overlay").classList.contains("on")}}const f0="minecraft:recipe-book",d0=[{key:"all",name:"Все",filter:()=>!0},{key:"blocks",name:"Блоки",filter:i=>bs(i)},{key:"tools",name:"Инструменты",filter:i=>{var t,e;return!!((t=ye(i))!=null&&t.tool)||!!((e=ye(i))!=null&&e.armor)||[263,269,270,283,284,285,288].includes(i)}},{key:"food",name:"Еда",filter:i=>{var t;return!!((t=ye(i))!=null&&t.food)}},{key:"misc",name:"Разное",filter:i=>{var t,e,n;return!bs(i)&&!((t=ye(i))!=null&&t.tool)&&!((e=ye(i))!=null&&e.armor)&&!((n=ye(i))!=null&&n.food)}}];class GE{constructor(t,e,n,s){S(this,"kind",null);S(this,"cursor",null);S(this,"craft",Or(9));S(this,"craftW",2);S(this,"container",null);S(this,"panel",bt("inventory-panel"));S(this,"cursorEl",bt("cursor-item"));S(this,"tooltip",bt("tooltip"));S(this,"slots",[]);S(this,"tab","all");S(this,"pointer",{x:0,y:0});S(this,"longPress",0);S(this,"longPressed",!1);S(this,"lastTap",{el:null,time:0});S(this,"book",bt("recipe-book"));S(this,"bookOpen",!0);S(this,"bookAll",!1);S(this,"bookKey","");S(this,"bookRecipes",[]);S(this,"onPointerDown",t=>{const e=t.target.closest(".slot");if(e){if(t.preventDefault(),this.pointer={x:t.clientX,y:t.clientY},t.pointerType==="touch"){this.longPressed=!1,clearTimeout(this.longPress),this.longPress=window.setTimeout(()=>{this.longPressed=!0,this.click(e,!0,!1)},420);return}this.click(e,t.button===2,t.shiftKey)}});S(this,"onPointerUp",t=>{if(t.pointerType!=="touch")return;clearTimeout(this.longPress);const e=t.target.closest(".slot");if(!e||this.longPressed)return;const n=performance.now(),s=this.lastTap.el===e&&n-this.lastTap.time<320;this.lastTap={el:e,time:n},s?(this.click(e,!1,!1),this.click(e,!1,!0)):this.click(e,!1,!1)});this.atlas=t,this.inv=e,this.h=n,this.mode=s;const r=bt("inventory-screen");try{this.bookOpen=localStorage.getItem(f0)!=="0"}catch{}this.setupBook(),this.panel.addEventListener("contextmenu",o=>o.preventDefault()),r.addEventListener("contextmenu",o=>o.preventDefault()),this.panel.addEventListener("pointerdown",this.onPointerDown),this.panel.addEventListener("pointerup",this.onPointerUp),this.panel.addEventListener("pointercancel",()=>clearTimeout(this.longPress)),r.addEventListener("pointermove",o=>{this.pointer={x:o.clientX,y:o.clientY},this.placeFloating()}),r.addEventListener("pointerdown",o=>{const a=o.target;this.panel.contains(a)||this.book.contains(a)||a.closest("#inv-close")||this.cursor&&(o.button===2?(this.h.drop({...this.cursor,count:1}),this.cursor=this.cursor.count>1?{...this.cursor,count:this.cursor.count-1}:null):(this.h.drop(this.cursor),this.cursor=null),this.render())}),this.panel.addEventListener("pointerover",o=>{const a=o.target.closest(".slot");if(!a||o.pointerType==="touch")return this.hideTooltip();const c=this.stackOf(a);if(!c)return this.hideTooltip();const l=ye(c.id);let h=(l==null?void 0:l.name)??"";l!=null&&l.durability&&(h+=` (${l.durability-(c.dmg??0)}/${l.durability})`),this.tooltip.textContent=h,this.tooltip.hidden=!1,this.placeFloating()}),this.panel.addEventListener("pointerout",()=>this.hideTooltip())}get isOpen(){return this.kind!==null}get openContainerId(){var t;return((t=this.container)==null?void 0:t.cid)??null}open(t,e){this.returnCraft(),this.kind=t,this.container=e??null,this.craftW=t==="crafting"?3:2,this.build(),this.render()}close(){this.kind&&(this.returnCraft(),this.cursor&&(this.giveBack(this.cursor),this.cursor=null),this.kind=null,this.container=null,this.book.hidden=!0,this.cursorEl.hidden=!0,this.hideTooltip(),this.inv.changed(),this.h.close())}giveBack(t){const e=gi(this.inv.slots,{...t});e>0&&this.h.drop({...t,count:e})}returnCraft(){for(let t=0;t<this.craft.length;t++){const e=this.craft[t];e&&this.giveBack(e),this.craft[t]=null}}setContainerSlot(t,e,n){var s;((s=this.container)==null?void 0:s.cid)===t&&(this.container.slots[e]=n,this.render())}setProgress(t,e,n,s){var a;if(((a=this.container)==null?void 0:a.cid)!==t)return;this.container.burn=e,this.container.burnMax=n,this.container.cook=s;const r=this.panel.querySelector(".flame"),o=this.panel.querySelector(".cook-arrow");r&&r.style.setProperty("--burn",`${n?Math.round(e/n*100):0}%`),o&&o.style.setProperty("--cook",`${Math.round(s/200*100)}%`)}containerClosed(t){var e;((e=this.container)==null?void 0:e.cid)===t&&this.close()}refresh(){this.kind&&this.render()}slot(t,e,n){const s=document.createElement("div");return s.className="slot",s.dataset.g=t,s.dataset.i=String(e),n==null||n(s),this.slots.push(s),s}grid(t,e,n,s){const r=document.createElement("div");r.className="inv-grid",r.style.gridTemplateColumns=`repeat(${s}, var(--slot))`;for(let o=0;o<n;o++)r.append(this.slot(t,e+o));return r}title(t){const e=document.createElement("div");return e.className="inv-title",e.textContent=t,e}playerSection(){const t=this.grid("main",Vi,Ur-Vi,9),e=this.grid("hotbar",0,Vi,9);return e.style.marginTop="6px",[this.title("Инвентарь"),t,e]}craftingRow(){const t=document.createElement("div");t.className="inv-row";const e=document.createElement("div");e.className="craft-grid",e.style.gridTemplateColumns=`repeat(${this.craftW}, var(--slot))`;for(let o=0;o<this.craftW*this.craftW;o++)e.append(this.slot("craft",o));const n=document.createElement("div");n.className="arrow",n.textContent="➜";const s=document.createElement("button");s.className="book-toggle",s.title="Книга рецептов";const r=document.createElement("img");return r.src=Yu(this.atlas,j.BOOK),r.alt="Рецепты",s.append(r),s.onclick=()=>{this.bookOpen=!this.bookOpen;try{localStorage.setItem(f0,this.bookOpen?"1":"0")}catch{}this.bookKey="",this.renderBook()},t.append(e,n,this.slot("out",0),s),t}build(){this.slots=[];const t=[];switch(this.kind){case"inventory":{const e=document.createElement("div");e.className="inv-row";const n=document.createElement("div");n.className="inv-col";for(let r=0;r<4;r++)n.append(this.slot("armor",r));const s=document.createElement("div");if(s.className="inv-col",s.append(this.title("Создание"),this.craftingRow()),e.append(n,s),t.push(e,...this.playerSection()),this.mode()==="creative"){const r=document.createElement("button");r.className="mc-button small",r.textContent="Творческий инвентарь",r.onclick=()=>this.open("creative"),t.push(r)}break}case"crafting":t.push(this.title("Верстак"),this.craftingRow(),...this.playerSection());break;case"chest":t.push(this.title("Сундук"),this.grid("cont",0,27,9),...this.playerSection());break;case"furnace":{const e=document.createElement("div");e.className="furnace-ui";const n=document.createElement("div");n.className="inv-col";const s=document.createElement("div");s.className="flame",n.append(this.slot("cont",0),s,this.slot("cont",1));const r=document.createElement("div");r.className="cook-arrow",e.append(n,r,this.slot("cont",2)),t.push(this.title("Печь"),e,...this.playerSection());break}case"creative":{const e=document.createElement("div");e.className="creative-tabs";for(const a of d0){const c=document.createElement("button");c.textContent=a.name,c.className=a.key===this.tab?"active":"",c.onclick=()=>{this.tab=a.key,this.build(),this.render()},e.append(c)}const n=document.createElement("button");n.textContent="Инвентарь",n.onclick=()=>this.open("inventory"),e.append(n);const s=document.createElement("div");s.className="creative-grid";const r=d0.find(a=>a.key===this.tab).filter;Y0.filter(r).forEach(a=>s.append(this.slot("creative",a)));const o=document.createElement("div");o.className="inv-row",o.append(this.grid("hotbar",0,Vi,9),this.slot("trash",0,a=>a.classList.add("trash"))),t.push(this.title("Творческий режим"),e,s,o);break}}this.panel.replaceChildren(...t),this.kind==="furnace"&&this.container&&this.setProgress(this.container.cid,this.container.burn??0,this.container.burnMax??0,this.container.cook??0)}output(){var e;const t=this.craftW===3?this.craft:[this.craft[0],this.craft[1],this.craft[2],this.craft[3]];return((e=RS(t,this.craftW))==null?void 0:e.result)??null}stackOf(t){var n;const e=Number(t.dataset.i);switch(t.dataset.g){case"main":case"hotbar":return this.inv.slots[e];case"armor":return this.inv.armor[e];case"craft":return this.craft[e];case"out":return this.output();case"cont":return((n=this.container)==null?void 0:n.slots[e])??null;case"creative":return Ve(e,1);default:return null}}render(){for(const t of this.slots)oc(t,this.stackOf(t),this.atlas);this.cursorEl.hidden=!this.cursor,oc(this.cursorEl,this.cursor,this.atlas),this.placeFloating(),this.renderBook()}setupBook(){this.book.addEventListener("contextmenu",t=>t.preventDefault()),this.book.addEventListener("pointerdown",t=>{const e=t.target.closest(".slot[data-r]");if(!e)return;t.preventDefault();const n=this.bookRecipes[Number(e.dataset.r)];n&&this.fillRecipe(n,t.shiftKey||t.button===2)}),this.book.addEventListener("pointerover",t=>{var r;const e=t.target.closest(".slot[data-r]");if(!e||t.pointerType==="touch")return this.hideTooltip();const n=this.bookRecipes[Number(e.dataset.r)];if(!n)return this.hideTooltip();let s=((r=ye(n.result.id))==null?void 0:r.name)??"";Ol(n,this.craftW)?Nd(n,[...this.inv.slots,...this.craft])||(s+=" — не хватает материалов"):s+=" — нужен верстак",this.tooltip.textContent=s,this.tooltip.hidden=!1,this.placeFloating()}),this.book.addEventListener("pointerout",()=>this.hideTooltip())}renderBook(){const t=(this.kind==="inventory"||this.kind==="crafting")&&this.bookOpen;if(this.book.hidden=!t,!t)return;const e=[...this.inv.slots,...this.craft],n=Go.map(l=>({r:l,fits:!!Ol(l,this.craftW),ok:Nd(l,e)})).filter(l=>this.bookAll||l.ok).sort((l,h)=>Number(h.ok&&h.fits)-Number(l.ok&&l.fits)||Number(h.ok)-Number(l.ok)),s=`${this.craftW}|${this.bookAll}|${n.map(l=>`${Go.indexOf(l.r)}${l.ok?1:0}${l.fits?1:0}`).join(",")}`;if(s===this.bookKey)return;this.bookKey=s,this.bookRecipes=n.map(l=>l.r);const r=document.createElement("div");r.className="inv-title",r.textContent="Рецепты";const o=document.createElement("label"),a=document.createElement("input");a.type="checkbox",a.checked=this.bookAll,a.onchange=()=>{this.bookAll=a.checked,this.renderBook()},o.append(a,"Показать все");const c=document.createElement("div");if(c.className="recipe-grid",n.forEach((l,h)=>{const u=document.createElement("div");u.className=`slot${l.ok&&l.fits?" ready":" locked"}`,u.dataset.r=String(h),oc(u,l.r.result,this.atlas),c.append(u)}),!n.length){const l=document.createElement("div");l.className="empty",l.textContent="Пока ничего — добудьте дерево (бейте ствол дерева)",c.append(l)}this.book.replaceChildren(r,o,c)}fillRecipe(t,e){const n=Ol(t,this.craftW);if(n){this.returnCraft();for(let s=0;s<(e?64:1);s++){const r=this.inv.slots.map(c=>c?{...c}:null),o=this.craft.map(c=>c?{...c}:null);let a=!0;for(let c=0;c<n.length&&a;c++){const l=n[c];if(l===null)continue;const h=o[c];if(h&&h.count>=_s(h.id)){a=!1;break}const u=r.findIndex(d=>!!d&&(h?d.id===h.id:wS(l,d.id)));if(u<0){a=!1;break}const f=r[u];r[u]=f.count>1?{...f,count:f.count-1}:null,o[c]=h?{...h,count:h.count+1}:{...f,count:1}}if(!a)break;r.forEach((c,l)=>this.inv.slots[l]=c),o.forEach((c,l)=>this.craft[l]=c)}this.h.sound("click"),this.inv.changed(),this.render()}}placeFloating(){this.cursorEl.style.left=`${this.pointer.x}px`,this.cursorEl.style.top=`${this.pointer.y}px`,this.tooltip.style.left=`${this.pointer.x+16}px`,this.tooltip.style.top=`${this.pointer.y-30}px`}hideTooltip(){this.tooltip.hidden=!0}click(t,e,n){const s=t.dataset.g,r=Number(t.dataset.i),o=this.container?this.container.slots.map(a=>a?{...a}:null):null;switch(s){case"main":case"hotbar":n?this.quickFromInventory(r):this.cursor=Wa(this.inv.slots,r,this.cursor,e);break;case"armor":if(n){const a=this.inv.armor[r];a&&gi(this.inv.slots,{...a})===0&&(this.inv.armor[r]=null)}else this.cursor=Wa(this.inv.armor,r,this.cursor,e,a=>{var c,l;return((l=(c=ye(a.id))==null?void 0:c.armor)==null?void 0:l.slot)===r});break;case"craft":if(n){const a=this.craft[r];if(a){const c=gi(this.inv.slots,{...a});this.craft[r]=c>0?{...a,count:c}:null}}else this.cursor=Wa(this.craft,r,this.cursor,e);break;case"out":this.takeOutput(n);break;case"cont":{if(!this.container)break;const a=this.container.slots;if(n){const c=a[r];if(c){const l=gi(this.inv.slots,{...c});a[r]=l>0?{...c,count:l}:null}}else{const c=this.container.kind==="furnace"&&r===2;this.cursor=c?this.takeOnly(a,r):Wa(a,r,this.cursor,e)}break}case"creative":{const a=_s(r);n?gi(this.inv.slots,Ve(r,a)):this.cursor&&this.cursor.id===r&&!e?this.cursor={...this.cursor,count:Math.min(a,this.cursor.count+1)}:this.cursor?this.cursor=null:this.cursor=Ve(r,e?1:a);break}case"trash":this.cursor=null;break}this.container&&o&&this.container.slots.forEach((a,c)=>{const l=o[c];!a&&!l||a&&l&&a.id===l.id&&a.count===l.count&&(a.dmg??0)===(l.dmg??0)||this.h.containerSlot(this.container.cid,c,a)}),this.h.sound("click"),this.inv.changed(),this.render()}takeOnly(t,e){const n=t[e];return n?this.cursor?this.cursor.id===n.id&&this.cursor.count+n.count<=_s(n.id)?(t[e]=null,{...this.cursor,count:this.cursor.count+n.count}):this.cursor:(t[e]=null,n):this.cursor}quickFromInventory(t){var c;const e=this.inv.slots[t];if(!e)return;const n=(l,h)=>{const u=gi(l,{...e},h);this.inv.slots[t]=u>0?{...e,count:u}:null};if(this.kind==="chest"&&this.container)return n(this.container.slots,Array.from({length:27},(l,h)=>h));if(this.kind==="furnace"&&this.container){if(LS[e.id])return n(this.container.slots,[0]);if(DS(e.id)>0)return n(this.container.slots,[1])}const s=(c=ye(e.id))==null?void 0:c.armor;if(this.kind==="inventory"&&s&&!this.inv.armor[s.slot]){this.inv.armor[s.slot]=e,this.inv.slots[t]=null;return}if(this.kind==="creative")return;const r=t<Vi?Array.from({length:27},(l,h)=>h+9):Array.from({length:9},(l,h)=>h),o={...e};this.inv.slots[t]=null;const a=gi(this.inv.slots,o,r);a>0&&(this.inv.slots[t]={...e,count:a})}takeOutput(t){for(let e=0;e<(t?64:1);e++){const n=this.output();if(!n)return;if(t){const r=this.inv.slots.map(o=>o?{...o}:null);if(gi(r,{...n})>0)return;gi(this.inv.slots,{...n})}else{if(this.cursor&&(this.cursor.id!==n.id||this.cursor.count+n.count>_s(n.id)))return;this.cursor=this.cursor?{...this.cursor,count:this.cursor.count+n.count}:{...n}}const s=this.craftW*this.craftW;for(let r=0;r<s;r++){const o=this.craft[r];o&&(this.craft[r]=o.count>1?{...o,count:o.count-1}:null)}this.h.sound("pop")}}}function HE(i){const t=-Math.sin(i),e=-Math.cos(i);return Math.abs(t)>Math.abs(e)?t>0?1:3:e>0?2:0}function jl(i,t){return i>0?1:i<0?3:t>0?2:0}function VE(i,t,e,n){const s=ye(i);if(!(s!=null&&s.places))return null;const r=Lt(s.places),o=bn[r],a=t.state&Ye,c=HE(e),l=t.py-Math.floor(t.py);if(o===Ao&&a===r){const g=Rs(t.state)&1;if(t.ny===1&&g===0||t.ny===-1&&g===1)return{x:t.x,y:t.y,z:t.z,state:gn(lf[r]??r)}}let h=t.x+t.nx,u=t.y+t.ny,f=t.z+t.nz;kr[a]&&a!==A.AIR&&(h=t.x,u=t.y,f=t.z);const d=n(h,u,f),m=Lt(d);if(o===Ao&&m===r)return{x:h,y:u,z:f,state:gn(lf[r]??r)};if(!kr[m])return null;let v=0;switch(r){case A.OAK_LOG:case A.BIRCH_LOG:case A.SPRUCE_LOG:v=t.nx!==0?1:t.nz!==0?2:0;break;case A.FURNACE:case A.CHEST:case A.PUMPKIN:case A.JACK_O_LANTERN:v=Pr(c);break}switch(o){case Ao:v=t.ny===-1||t.ny===0&&l>.5?1:0;break;case k0:v=c|(t.ny===-1||t.ny===0&&l>.5?4:0);break;case eo:{if(t.ny===-1)return null;if(t.ny===1){if(!Ke[Lt(n(h,u-1,f))])return null;v=0}else if(v=1+Pr(jl(t.nx,t.nz)),!Ke[a])return null;break}case no:if(t.ny!==0||!Ke[a])return null;v=Pr(jl(t.nx,t.nz));break;case du:if(v=c,!kr[Lt(n(h,u+1,f))]||!Ze[Lt(n(h,u-1,f))].fullCube)return null;break;case gu:t.ny===0?v=Pr(jl(t.nx,t.nz))|(l>.5?8:0):v=Pr(c)|(t.ny===-1?8:0);break;case Ac:v=c;break;case mu:{v=c;const[g,,p]=Xo[c];if(!kr[Lt(n(h+g,u,f+p))]||!Ze[Lt(n(h,u-1,f))].solid||!Ze[Lt(n(h+g,u-1,f+p))].solid)return null;break}}return r===A.WHEAT&&Lt(n(h,u-1,f))!==A.FARMLAND||r===A.SUGAR_CANE&&!og(n,h,u,f)?null:{x:h,y:u,z:f,state:gn(r,v)}}function WE(i){const t=Lt(i);return t===A.CRAFTING_TABLE||t===A.CHEST||t===A.FURNACE||t===A.LIT_FURNACE||t===A.OAK_DOOR||t===A.OAK_TRAPDOOR||t===A.OAK_FENCE_GATE||t===A.BED}function XE(i){const t=Lt(i.state),e=Rs(i.state);if(t===A.OAK_DOOR)return[{x:i.x,y:i.y+1,z:i.z,state:gn(A.OAK_DOOR,e&3|8)}];if(t===A.BED){const[n,,s]=Xo[e&3];return[{x:i.x+n,y:i.y,z:i.z+s,state:gn(A.BED,e&3|4)}]}return[]}const YE=.6,KE=1.8,qE=1.62,$E=1.54,p0=32,jE=8.6,ZE={fall:"разбивается насмерть",drown:"тонет",lava:"сгорает в лаве",fire:"сгорает",starve:"умирает от голода",void:"падает в пустоту",kill:"погибает",зомби:"погибает от зомби",скелет:"погибает от стрелы скелета",стрела:"погибает от стрелы",паук:"погибает от паука",крипер:"взрывается из-за крипера",динамит:"взрывается"};class JE{constructor(t){S(this,"x",0);S(this,"y",0);S(this,"z",0);S(this,"vx",0);S(this,"vy",0);S(this,"vz",0);S(this,"width",YE);S(this,"height",KE);S(this,"onGround",!1);S(this,"collidedH",!1);S(this,"yaw",0);S(this,"pitch",0);S(this,"mode","survival");S(this,"flying",!1);S(this,"sneaking",!1);S(this,"sprinting",!1);S(this,"inWater",!1);S(this,"inLava",!1);S(this,"eyeInWater",!1);S(this,"onLadder",!1);S(this,"alive",!0);S(this,"sleeping",!1);S(this,"hp",20);S(this,"food",20);S(this,"saturation",5);S(this,"exhaustion",0);S(this,"air",15);S(this,"fire",0);S(this,"fallDistance",0);S(this,"hurtCooldown",0);S(this,"regenTimer",0);S(this,"starveTimer",0);S(this,"drownTimer",0);S(this,"fireTimer",0);S(this,"lavaTimer",0);S(this,"walkDistance",0);S(this,"speed",0);S(this,"lastCause","kill");S(this,"onHurt",()=>{});S(this,"onDeath",()=>{});S(this,"onStep",()=>{});S(this,"onLand",()=>{});S(this,"onSplash",()=>{});S(this,"armorPoints",()=>0);this.world=t}get eyeHeight(){return this.sneaking&&!this.flying?$E:qE}get survival(){return this.mode==="survival"}setPosition(t,e,n){this.x=t,this.y=e,this.z=n,this.vx=this.vy=this.vz=0,this.fallDistance=0}update(t,e){if(!this.alive||this.sleeping)return;this.hurtCooldown=Math.max(0,this.hurtCooldown-t);const n=this.inWater,s=Vy(this.world,this,this.eyeHeight);this.inWater=s.inWater,this.inLava=s.inLava,this.eyeInWater=s.eyeInWater,this.onLadder=s.onLadder,this.inWater&&!n&&this.vy<-4&&this.onSplash(),this.mode!=="creative"&&(this.flying=!1),this.sneaking=e.sneak&&!this.flying;const r=e.forward!==0||e.strafe!==0;this.sprinting=e.sprint&&e.forward>0&&!this.sneaking&&(this.food>6||!this.survival);const o=Math.sin(this.yaw),a=Math.cos(this.yaw);let c=-o*e.forward+a*e.strafe,l=-a*e.forward-o*e.strafe;const h=Math.hypot(c,l);h>1&&(c/=h,l/=h);let u=this.sprinting?5.612:4.317;this.sneaking&&(u=1.3);let f=this.onGround?14:2.6;this.flying?(u=this.sprinting?21.6:10.9,f=8):(this.inWater||this.inLava)&&(u=this.inLava?1.2:this.sprinting?3:2.1,f=6);const d=1-Math.exp(-f*t);this.vx+=(c*u-this.vx)*d,this.vz+=(l*u-this.vz)*d;let m=!1;if(this.flying){const C=((e.jump?1:0)-(e.sneak?1:0))*(this.sprinting?12:8);this.vy+=(C-this.vy)*(1-Math.exp(-10*t))}else this.onLadder?e.jump||r&&this.collidedH?this.vy=2.6:this.sneaking?this.vy=0:this.vy=Math.max(this.vy-p0*t,-2.6):this.inWater||this.inLava?(this.vy-=(this.inLava?6:10)*t,this.vy*=Math.exp(-2.5*t),e.jump&&(this.vy=Math.min(this.vy+28*t,this.inLava?2:3.6)),e.sneak&&(this.vy=Math.max(this.vy-20*t,-3.6)),e.jump&&this.collidedH&&!this.eyeInWater&&(this.vy=6.5),this.vy=Math.max(this.vy,-5)):(this.vy=Math.max(this.vy-p0*t,-78),e.jump&&this.onGround&&(this.vy=jE,m=!0,this.sprinting&&(this.vx+=c*2,this.vz+=l*2)));let v=this.vx*t,g=this.vz*t;this.sneaking&&this.onGround&&!this.flying&&([v,g]=Hy(this.world,this,v,g));const p=Math.max(Math.abs(v),Math.abs(this.vy*t),Math.abs(g)),M=Math.max(1,Math.ceil(p/.35)),E=this.x,_=this.z,T=this.y,w=this.onGround;for(let C=0;C<M;C++)Gy(this.world,this,v/M,this.vy*t/M,g/M,this.flying?0:.6);this.flying&&this.onGround&&!e.jump&&(this.flying=!1);const b=Math.hypot(this.x-E,this.z-_);if(this.speed=b/Math.max(t,1e-4),this.onGround&&!this.flying){const C=Math.floor(this.walkDistance/2.2);this.walkDistance+=b,Math.floor(this.walkDistance/2.2)!==C&&!this.sneaking&&this.onStep()}else this.onLadder&&(this.walkDistance+=Math.abs(this.y-T)*.8);if(this.survival&&(this.exhaustion+=b*(this.sprinting?.1:this.inWater?.015:.01),m&&(this.exhaustion+=this.sprinting?.2:.05)),this.flying||this.inWater||this.onLadder||!this.survival?this.fallDistance=0:this.y<T&&(this.fallDistance+=T-this.y),this.onGround&&!w){this.fallDistance>1.5&&this.onLand(this.fallDistance);const C=Math.ceil(this.fallDistance-3);C>0&&this.damage(C,"fall"),this.fallDistance=0}this.y<-40&&this.damage(4*t*10,"void"),this.survivalTick(t)}survivalTick(t){if(!this.survival){this.air=15,this.fire=0;return}for(this.eyeInWater?(this.air-=t,this.air<=0&&(this.air=0,this.drownTimer+=t,this.drownTimer>=1&&(this.drownTimer=0,this.damage(2,"drown")))):this.air=Math.min(15,this.air+t*5),this.inLava&&(this.fire=8,this.lavaTimer+=t,this.lavaTimer>=.5&&(this.lavaTimer=0,this.damage(4,"lava"))),this.inWater&&(this.fire=0),this.fire>0&&(this.fire-=t,this.fireTimer+=t,this.fireTimer>=1&&(this.fireTimer=0,this.damage(1,"fire")));this.exhaustion>=4;)this.exhaustion-=4,this.saturation>0?this.saturation=Math.max(0,this.saturation-1):this.food=Math.max(0,this.food-1);this.food>=18&&this.hp<20?(this.regenTimer+=t,this.regenTimer>=4&&(this.regenTimer=0,this.hp=Math.min(20,this.hp+1),this.exhaustion+=3)):this.regenTimer=0,this.food<=0&&(this.starveTimer+=t,this.starveTimer>=4&&(this.starveTimer=0,this.hp>1&&this.damage(1,"starve")))}damage(t,e,n=0,s=0){if(!this.alive||!this.survival&&e!=="kill"&&e!=="void"||this.hurtCooldown>0&&e!=="kill"&&e!=="void")return;const r=!["fall","drown","starve","void","kill","fire","lava"].includes(e);let o=t;r&&(o*=1-Math.min(20,this.armorPoints())/25),this.hp=Math.max(0,this.hp-o),this.hurtCooldown=.5,this.exhaustion+=.1,this.lastCause=e,this.sleeping=!1,(n||s)&&(this.vx+=n*5,this.vz+=s*5,this.vy=Math.max(this.vy,4.5)),this.onHurt(o,e),this.hp<=0&&(this.alive=!1,this.onDeath(e))}eat(t,e){this.food=Math.min(20,this.food+t),this.saturation=Math.min(this.food,this.saturation+e)}addExhaustion(t){this.survival&&(this.exhaustion+=t)}respawn(t,e,n){this.setPosition(t,e,n),this.hp=20,this.food=20,this.saturation=5,this.exhaustion=0,this.air=15,this.fire=0,this.alive=!0}}function QE(i,t,e,n,s,r,o){let a=-1/0,c=1/0,l=-1,h=0;const u=[i,t,e],f=[n,s,r];for(let d=0;d<3;d++){const m=o[d],v=o[d+3];if(Math.abs(f[d])<1e-12){if(u[d]<m||u[d]>v)return null;continue}let g=(m-u[d])/f[d],p=(v-u[d])/f[d],M=-1;if(g>p&&([g,p]=[p,g],M=1),g>a&&(a=g,l=d,h=M),c=Math.min(c,p),a>c)return null}return c<0?null:{t:Math.max(0,a),axis:l,sign:h}}function m0(i,t,e,n,s,r,o,a){let c=Math.floor(t),l=Math.floor(e),h=Math.floor(n);const u=Math.sign(s),f=Math.sign(r),d=Math.sign(o),m=u?Math.abs(1/s):1/0,v=f?Math.abs(1/r):1/0,g=d?Math.abs(1/o):1/0;let p=u>0?(c+1-t)*m:u<0?(t-c)*m:1/0,M=f>0?(l+1-e)*v:f<0?(e-l)*v:1/0,E=d>0?(h+1-n)*g:d<0?(n-h)*g:1/0,_=0;for(let T=0;T<64&&_<=a;T++){const w=i(c,l,h),b=w&Ye;if(b!==A.AIR&&bn[b]!==to&&bn[b]!==Jr){const C=c,x=l,y=h,R=Zh(w,(N,B,X)=>i(C+N,x+B,y+X));let P=null;for(const N of R){const B=QE(t,e,n,s,r,o,[c+N[0],l+N[1],h+N[2],c+N[3],l+N[4],h+N[5]]);B&&B.t<=a&&(!P||B.t<P.t)&&(P=B)}if(P){const N=[0,0,0];return P.axis>=0&&(N[P.axis]=P.sign),{x:c,y:l,z:h,nx:N[0],ny:N[1],nz:N[2],state:w,px:t+s*P.t,py:e+r*P.t,pz:n+o*P.t,dist:P.t}}}p<M&&p<E?(c+=u,_=p,p+=m):M<E?(l+=f,_=M,M+=v):(h+=d,_=E,E+=g)}return null}function tw(i,t,e,n,s,r,o,a){const c=Math.ceil(a/.1);for(let l=1;l<=c;l++){const h=l*.1,u=Math.floor(t+s*h),f=Math.floor(e+r*h),d=Math.floor(n+o*h),m=i(u,f,d),v=m&Ye;if(bn[v]===to)return{x:u,y:f,z:d,state:m};if(v!==A.AIR&&bn[v]!==Jr&&bn[v]!==Qr)return null}return null}const pn=(i,t,e)=>[i[0]+(t[0]-i[0])*e,i[1]+(t[1]-i[1])*e,i[2]+(t[2]-i[2])*e],ds=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)},ew={zenith:[.1,.27,.75],horizon:[.5,.68,1],ambient:[.34,.42,.58],light:[1.05,.97,.82],glow:[.55,.5,.4]},nw={zenith:[.14,.18,.42],horizon:[1.05,.5,.22],ambient:[.32,.27,.3],light:[.95,.5,.22],glow:[1.5,.62,.2]},g0={zenith:[.004,.006,.018],horizon:[.014,.02,.048],ambient:[.05,.065,.12],light:[.16,.2,.32],glow:[.02,.025,.04]},iw=[.32,.35,.4],ym=12,Bn=64,Cr=ym*Bn,sw=118,rw=4,v0=9;class ow{constructor(t,e){S(this,"sunDir",new F);S(this,"lightDir",new F);S(this,"daylight",1);S(this,"night",0);S(this,"sunVisibility",1);S(this,"fogTarget",0);S(this,"bloodTarget",0);S(this,"fog",0);S(this,"blood",0);S(this,"rayColor",new F);S(this,"dome");S(this,"skyUniforms");S(this,"clouds",null);S(this,"cloudPrepass",null);S(this,"cloudDrift",0);S(this,"cloudTiles","");this.scene=t,this.u=e,this.skyUniforms={...e,uNight:{value:0},uSunDisk:{value:new F},uMoonDisk:{value:new F}};const n=new an({vertexShader:kb,fragmentShader:Nb,uniforms:this.skyUniforms,side:Un,depthWrite:!1});this.dome=new ge(new Pu(500,32,16),n),this.dome.frustumCulled=!1,this.dome.renderOrder=-1e3,t.add(this.dome)}setClouds(t){t&&!this.clouds&&this.buildClouds(),this.clouds&&(this.clouds.visible=t),this.cloudPrepass&&(this.cloudPrepass.visible=t)}update(t,e,n,s,r,o){const a=this.u,c=t/L0*Math.PI*2;this.sunDir.set(Math.cos(c),Math.sin(c),.3).normalize();const l=this.sunDir.y,h=ds(-.14,.18,l),u=Math.max(0,1-Math.abs(l)/.32)*ds(-.3,.02,l);this.daylight=.15+.85*h,this.night=1-ds(-.2,.05,l);const f=w=>{let b=pn(g0[w],ew[w],h);return b=pn(b,nw[w],u*.85),b};let d=f("zenith"),m=f("horizon"),v=f("ambient");const g=f("glow");let p=f("light");if(l>-.06){this.lightDir.copy(this.sunDir);const w=ds(-.06,.12,l);p=pn([0,0,0],p,w)}else{this.lightDir.copy(this.sunDir).negate();const w=ds(.06,.25,-l);p=pn([0,0,0],g0.light,w)}this.blood+=(this.bloodTarget-this.blood)*Math.min(1,s*.25);const M=this.blood*this.night;M>.001&&(d=pn(d,[.06,.004,.004],M),m=pn(m,[.26,.02,.015],M),v=pn(v,[.17,.045,.04],M),l<=-.06&&(p=pn(p,[.42,.06,.05],M))),this.fog+=(this.fogTarget-this.fog)*Math.min(1,s*.15);const E=this.fog;if(E>.001){const w=pn([.02,.022,.026],[.58,.6,.62],h);d=pn(d,w,E*.8),m=pn(m,w,E*.9),p=pn(p,[p[0]*.35,p[1]*.35,p[2]*.37],E)}if(e>0){const w=pn([.01,.012,.02],iw,h);d=pn(d,w,e*.85),m=pn(m,pn(w,[.45,.48,.52],h*.5),e*.85),v=pn(v,[v[0]*.75,v[1]*.78,v[2]*.8],e),p=pn(p,[p[0]*.15,p[1]*.16,p[2]*.18],e)}a.uSunDir.value.copy(this.sunDir),a.uLightDir.value.copy(this.lightDir),a.uLightColor.value.set(...p),a.uAmbient.value.set(...v),a.uZenith.value.set(...d),a.uHorizon.value.set(...m),a.uSunGlow.value.set(...g).multiplyScalar((1-e*.8)*(1-E*.8)),a.uRain.value=e,a.uUnderwater.value=o?1:0,a.uWaterFog.value.set(.015,.06,.13).multiplyScalar(.25+.75*this.daylight);const _=Math.max(32,r*16-6),T=1-E*.68;if(a.uFogFar.value=_*(1-e*.35)*T,a.uFogNear.value=_*(.42-e*.2)*T*T,this.skyUniforms.uNight.value=this.night,this.skyUniforms.uSunDisk.value.set(55,46,32).multiplyScalar(ds(-.05,.05,l)),this.skyUniforms.uMoonDisk.value.set(2.6+1.6*this.blood,2.8-2.4*this.blood,3.2-2.9*this.blood).multiplyScalar(ds(-.05,.05,-l)),this.sunVisibility=ds(-.02,.12,l)*(1-e)*(1-E*.85),this.rayColor.set(...g).multiplyScalar(.9+u).lerp(new F(...p).multiplyScalar(.25),.4),this.dome.position.copy(n.position),this.clouds&&this.cloudPrepass){this.cloudDrift+=s*.8,this.clouds.position.set(this.cloudDrift,sw,0),this.cloudPrepass.position.copy(this.clouds.position);const w=a.uFogFar.value*3.2,b=n.position.x-this.cloudDrift,C=n.position.z,x=Math.floor((b-w)/Cr),y=Math.floor((b+w)/Cr),R=Math.floor((C-w)/Cr),P=Math.floor((C+w)/Cr),N=`${x},${y},${R},${P}`;if(N!==this.cloudTiles){this.cloudTiles=N;const B=new ve;let X=0;for(let V=R;V<=P;V++)for(let K=x;K<=y&&X<v0;K++,X++)B.makeTranslation(K*Cr,0,V*Cr),this.clouds.setMatrixAt(X,B),this.cloudPrepass.setMatrixAt(X,B);for(const V of[this.clouds,this.cloudPrepass])V.count=X,V.instanceMatrix.needsUpdate=!0}}}buildClouds(){const t=gs(ao(4242)),e=[];for(let d=0;d<Bn;d++)for(let m=0;m<Bn;m++){const v=m/Bn*Math.PI*2,g=d/Bn*Math.PI*2,p=t(Math.cos(v)*1.6,Math.sin(v)*1.6+Math.cos(g)*1.6)*.6+t(Math.sin(g)*3.2,Math.cos(v)*3.2+Math.sin(g))*.4;e.push(p>.22)}const n=(d,m)=>e[(m%Bn+Bn)%Bn*Bn+(d%Bn+Bn)%Bn],s=[],r=[],o=(d,m)=>{const[v,g,p,M]=d;s.push(...v,...g,...p,...v,...p,...M);for(let E=0;E<6;E++)r.push(m)},a=ym,c=rw;for(let d=0;d<Bn;d++)for(let m=0;m<Bn;m++){if(!n(m,d))continue;const v=m*a,g=d*a,p=v+a,M=g+a;o([[v,c,M],[p,c,M],[p,c,g],[v,c,g]],1),o([[v,0,g],[p,0,g],[p,0,M],[v,0,M]],.62),n(m+1,d)||o([[p,0,M],[p,0,g],[p,c,g],[p,c,M]],.78),n(m-1,d)||o([[v,0,g],[v,0,M],[v,c,M],[v,c,g]],.78),n(m,d+1)||o([[v,0,M],[p,0,M],[p,c,M],[v,c,M]],.86),n(m,d-1)||o([[p,0,g],[v,0,g],[v,c,g],[p,c,g]],.86)}const l=new qe;l.setAttribute("position",new en(s,3)),l.setAttribute("aShade",new en(r,1));const h=new an({vertexShader:wd,fragmentShader:Ub,uniforms:this.u,transparent:!0,depthWrite:!1}),u=new an({vertexShader:wd,fragmentShader:"void main() { gl_FragColor = vec4(0.0); }",colorWrite:!1}),f=d=>{const m=new I1(l,d,v0);return m.count=0,m.frustumCulled=!1,m};this.cloudPrepass=f(u),this.cloudPrepass.renderOrder=1,this.clouds=f(h),this.clouds.renderOrder=2,this.scene.add(this.cloudPrepass,this.clouds),this.cloudTiles=""}}const aw="#e0ac80",cw=new ro().setFromUnitVectors(new F(0,1,0),new F(-.36,.3,-.88).normalize());class lw{constructor(t,e,n){S(this,"root",new Mn);S(this,"arm");S(this,"armLight",{value:new F(1,1,1)});S(this,"item",null);S(this,"itemId",-1);S(this,"swingTime",1);S(this,"equip",1);S(this,"bob",0);this.meshes=e,t.add(new yp("#ffffff",Math.PI*.75));const s=new Mp("#ffffff",Math.PI*.55);s.position.set(-.5,1,.6),t.add(s);const r=new Mi({color:aw}),o=new Mi({color:n});this.arm=new ge(new tn(.25,.75,.25),r);const a=new ge(new tn(.27,.3,.27),o);a.position.y=-.24,this.arm.add(a),ji(this.arm,this.armLight),t.add(this.root)}swing(){this.swingTime>.5&&(this.swingTime=0)}setItem(t){var n;const e=t??0;if(e!==this.itemId){if(this.itemId=e,this.equip=0,this.root.clear(),(n=this.item)==null||n.dispose(),this.item=null,!e){this.root.add(this.arm);return}this.item=this.meshes.create(e,void 0,!0),this.root.add(this.item.object)}}update(t,e){this.swingTime=Math.min(1,this.swingTime+t/.3),e.mining&&this.swingTime>=1&&(this.swingTime=0),this.equip=Math.min(1,this.equip+t/.2),e.speed>.1&&(this.bob+=t*e.speed*2.2);const n=Math.min(1,e.speed/4.3),s=this.swingTime,r=Math.sin(Math.sqrt(s)*Math.PI),o=Math.sin(s*s*Math.PI),a=Math.sin(this.bob)*.025*n,c=-Math.abs(Math.cos(this.bob))*.03*n,l=(1-this.equip)*.6,h=this.itemId?this.meshes.isFlat(this.itemId):!1,u=this.root;if(u.rotation.set(0,0,0),u.scale.setScalar(1),this.itemId?h?(u.position.set(.5+a-r*.25,-.38+c-l+Math.sin(Math.sqrt(s)*Math.PI*2)*.12,-.62-r*.2),u.rotation.set(-r*1.2,-1.3+o*.4,.35),u.scale.setScalar(.62)):(u.position.set(.48+a-r*.25,-.42+c-l+Math.sin(Math.sqrt(s)*Math.PI*2)*.1,-.68-r*.15),u.rotation.set(-r*.8,.78,0),u.scale.setScalar(.4)):(u.position.set(.5+a-r*.25,-.5+c-l+Math.sin(Math.sqrt(s)*Math.PI*2)*.1,-.56-r*.2),u.rotation.set(-r*.7,-o*.3,r*.25),this.arm.position.set(0,0,0),this.arm.quaternion.copy(cw)),e.eating>0){const f=Math.min(1,e.eating*4);u.position.x-=.32*f,u.position.y+=.18*f+Math.abs(Math.sin(e.eating*40))*.03,u.rotation.y+=.5*f}e.bowDraw>0&&(u.position.x-=.28*Math.min(1,e.bowDraw*3),u.position.z+=.1*e.bowDraw,u.rotation.y+=.6,e.bowDraw>=1&&(u.position.y+=Math.sin(performance.now()*.05)*.004)),this.item&&(this.item.light.set(e.sky,e.block),this.item.color.value.copy(e.lightColor)),this.armLight.value.copy(e.lightColor)}get isBlockInHand(){return this.itemId>0&&bs(this.itemId)&&!this.meshes.isFlat(this.itemId)}}const Vo=Mt+2,Xi=Vo*Vo,Ec=Xi*(Se+2),ei=Se/16,Ku=(i,t,e)=>((t+1)*Vo+(e+1))*Vo+(i+1);function hw(i,t,e){t.fill(0),e.fill(0),t.fill(A.BEDROCK,0,Xi),e.fill(240,Xi*(Se+1));for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++){const r=i[(n+1)*3+(s+1)];if(!r)continue;const o=s===-1?Mt-1:0,a=s===1?0:Mt-1,c=n===-1?Mt-1:0,l=n===1?0:Mt-1;for(let h=0;h<Se;h++)for(let u=c;u<=l;u++){let f=Ku(o+s*Mt,h,u+n*Mt),d=Ae(o,h,u);for(let m=o;m<=a;m++,f++,d++)t[f]=r.blocks[d],e[f]=r.light[d]}}}class Zl{constructor(){S(this,"pos",new Uint16Array(4096*4));S(this,"data",new Uint8Array(4096*4));S(this,"index",new Uint32Array(4096*6));S(this,"verts",0);S(this,"indices",0);S(this,"minY",Se);S(this,"maxY",0);S(this,"sections",new Uint32Array(ei+1))}reset(){this.verts=0,this.indices=0,this.minY=Se,this.maxY=0,this.sections.fill(0)}grow(){const t=new Uint16Array(this.pos.length*2);t.set(this.pos),this.pos=t;const e=new Uint8Array(this.data.length*2);e.set(this.data),this.data=e;const n=new Uint32Array(this.index.length*2);n.set(this.index),this.index=n}vertex(t,e,n,s,r,o,a,c){(this.verts+1)*4>this.pos.length&&this.grow();const l=this.verts*4;this.pos[l]=t,this.pos[l+1]=e,this.pos[l+2]=n,this.pos[l+3]=s,this.data[l]=r,this.data[l+1]=o,this.data[l+2]=a,this.data[l+3]=c,this.verts++}quad(t,e){this.indices+12>this.index.length&&this.grow();const n=this.verts-4,s=this.index;let r=this.indices;t?(s[r++]=n+1,s[r++]=n+2,s[r++]=n+3,s[r++]=n+1,s[r++]=n+3,s[r++]=n):(s[r++]=n,s[r++]=n+1,s[r++]=n+2,s[r++]=n,s[r++]=n+2,s[r++]=n+3),e&&(s[r++]=n,s[r++]=n+2,s[r++]=n+1,s[r++]=n,s[r++]=n+3,s[r++]=n+2),this.indices=r}span(t,e){t<this.minY&&(this.minY=t),e>this.maxY&&(this.maxY=e)}build(){if(!this.verts)return null;const t=this.verts>65535?this.index.slice(0,this.indices):Uint16Array.from(this.index.subarray(0,this.indices));return{pos:this.pos.slice(0,this.verts*4),data:this.data.slice(0,this.verts*4),index:t,minY:Math.max(0,Math.floor(this.minY)),maxY:Math.min(Se,Math.ceil(this.maxY)),sections:this.sections.slice()}}}const bm=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],Jo=[[[1,0,1,0,1],[1,0,0,1,1],[1,1,0,1,0],[1,1,1,0,0]],[[0,0,0,0,1],[0,0,1,1,1],[0,1,1,1,0],[0,1,0,0,0]],[[0,1,1,0,1],[1,1,1,1,1],[1,1,0,1,0],[0,1,0,0,0]],[[0,0,0,0,1],[1,0,0,1,1],[1,0,1,1,0],[0,0,1,0,0]],[[0,0,1,0,1],[1,0,1,1,1],[1,1,1,1,0],[0,1,1,0,0]],[[1,0,0,0,1],[0,0,0,1,1],[0,1,0,1,0],[1,1,0,0,0]]],Do=(i,t,e)=>t*Xi+e*Vo+i,Wo=bm.map(([i,t,e])=>Do(i,t,e)),uw=bm.map((i,t)=>{const e=i.findIndex(s=>s!==0),n=[0,1,2].filter(s=>s!==e);return Jo[t].map(s=>{const r=[...i],o=[...i];r[n[0]]+=s[n[0]]?1:-1,o[n[1]]+=s[n[1]]?1:-1;const a=[...i];return a[n[0]]=r[n[0]],a[n[1]]=o[n[1]],[Do(r[0],r[1],r[2]),Do(o[0],o[1],o[2]),Do(a[0],a[1],a[2])]})});function fw(i,t,e){switch(e&3){case 1:return[1-t,i];case 2:return[1-i,1-t];case 3:return[t,1-i];default:return[i,t]}}const lo=(i,t,e,n)=>i|t<<8|e<<11|n<<13,Rn=(i,t,e)=>i|t<<5|e<<7,ys=i=>Math.round(i*17),dw={opaque:new Zl,cutout:new Zl,translucent:new Zl};function pw(i,t,e){const{opaque:n,cutout:s,translucent:r}=dw;n.reset(),s.reset(),r.reset();const o=[0,0,0,0],a=[0,0,0,0],c=[0,0,0,0];let l=0;for(let h=0;h<Se;h++){const u=1<<(h>>4);if((h&15)===0){const f=h>>4;n.sections[f]=n.indices,s.sections[f]=s.indices,r.sections[f]=r.indices}for(let f=0;f<Mt;f++){let d=Ku(0,h,f);for(let m=0;m<Mt;m++,d++){const v=i[d],g=v&Ye,p=bn[g];if(p===Jr)continue;const M=v>>>10,E=G0[g],_=E===B0?r:E===F0?s:n;if(p===Tc){const x=sh[g]===1,y=g===A.ICE?1:0;for(let R=0;R<6;R++){const N=i[d+Wo[R]]&Ye;if(Ke[N]||N===g&&(H0[g]||x&&!1))continue;const B=d+Wo[R],X=uw[R];for(let Z=0;Z<4;Z++){const rt=d+X[Z][0],yt=d+X[Z][1],Bt=d+X[Z][2],Wt=Ke[i[rt]&Ye],ne=Ke[i[yt]&Ye],ae=Wt&&ne?1:Ke[i[Bt]&Ye];o[Z]=Wt&&ne?0:3-Wt-ne-ae;let Q=t[B]>>4,nt=t[B]&15,mt=1;Wt||(Q+=t[rt]>>4,nt+=t[rt]&15,mt++),ne||(Q+=t[yt]>>4,nt+=t[yt]&15,mt++),ae||(Q+=t[Bt]>>4,nt+=t[Bt]&15,mt++),a[Z]=ys(Q/mt),c[Z]=ys(nt/mt)}a[0]+a[1]+a[2]+a[3]>0&&(l|=u);const V=Nn[g*384+M*6+R],K=$o[V],G=Jo[R];for(let Z=0;Z<4;Z++){const rt=G[Z];_.vertex((m+rt[0])*16,(h+rt[1])*16,(f+rt[2])*16,lo(V,R,o[Z],K),Rn(rt[3]*16,x?1:0,0),rt[4]*16+(y<<5),a[Z],c[Z])}_.quad(o[0]+o[2]<o[1]+o[3],!1),_.span(h,h+1)}continue}const T=t[d],w=ys(T>>4),b=ys(T&15);if((T>>4||t[d+Xi]>>4)&&(l|=u),p===Qr){const x=Nn[g*384+M*6],y=sh[g]===2?2:0,R=Math.max(Math.floor(Ne(m,h,f,77)*7)-3,-m*16),P=Math.max(Math.floor(Ne(f,h,m,78)*7)-3,-f*16);_0(_,m,h,f,R,P,[0,0,16,16],x,y,w,b),_0(_,m,h,f,R,P,[0,16,16,0],x,y,w,b),_.span(h,h+1);continue}if(p===qo){const x=Nn[g*384+M*6];for(const y of[4,12])x0(_,m,h,f,"x",y,x,w,b),x0(_,m,h,f,"z",y,x,w,b);_.span(h,h+1);continue}if(p===to){xw(_,i,t,d,m,h,f,v);continue}if(p===eo){mw(_,m,h,f,M,Nn[g*384],w,b),_.span(h,h+1);continue}const C=ku(v,(x,y,R)=>i[d+Do(x,y,R)]);for(const x of C)vw(_,i,t,d,m,h,f,g,M,x)}}}for(const h of[n,s,r])h.sections[ei]=h.indices;return{opaque:n.build(),cutout:s.build(),translucent:r.build(),lit:l}}function _0(i,t,e,n,s,r,o,a,c,l,h){const[u,f,d,m]=o,v=t*16+s,g=n*16+r,p=e*16,M=lo(a,6,3,$o[a]);i.vertex(v+u,p,g+f,M,Rn(0,0,0),16,l,h),i.vertex(v+d,p,g+m,M,Rn(16,0,0),16,l,h),i.vertex(v+d,p+16,g+m,M,Rn(16,c,0),0,l,h),i.vertex(v+u,p+16,g+f,M,Rn(0,c,0),0,l,h),i.quad(!1,!0)}function x0(i,t,e,n,s,r,o,a,c){const l=lo(o,6,3,0),h=Math.max(0,e*16-1);if(s==="x"){const u=t*16+r;i.vertex(u,h,n*16,l,Rn(0,0,0),16,a,c),i.vertex(u,h,n*16+16,l,Rn(16,0,0),16,a,c),i.vertex(u,h+16,n*16+16,l,Rn(16,2,0),0,a,c),i.vertex(u,h+16,n*16,l,Rn(0,2,0),0,a,c)}else{const u=n*16+r;i.vertex(t*16,h,u,l,Rn(0,0,0),16,a,c),i.vertex(t*16+16,h,u,l,Rn(16,0,0),16,a,c),i.vertex(t*16+16,h+16,u,l,Rn(16,2,0),0,a,c),i.vertex(t*16,h+16,u,l,Rn(0,2,0),0,a,c)}i.quad(!1,!0)}function mw(i,t,e,n,s,r,o,a){const c=s>=1&&s<=4,l=c?s-1:0,h=l===1?1:l===3?-1:0,u=l===0?-1:l===2?1:0,f=[7/16,0,7/16,9/16,10/16,9/16],d=(m,v,g)=>{if(!c)return[m,v,g];const p=v*.4;return[m+h*.3125-h*p,v+.2,g+u*.3125-u*p]};for(let m=0;m<6;m++){const[v,g,p,M]=gw(m),E=Jo[m];for(let _=0;_<4;_++){const T=E[_],w=T[0]?f[3]:f[0],b=T[1]?f[4]:f[1],C=T[2]?f[5]:f[2],[x,y,R]=d(w,b,C);i.vertex(Math.round((t+x)*16),Math.round((e+y)*16),Math.round((n+R)*16),lo(r,m,3,1),Rn(T[3]?p:v,0,0),T[4]?M:g,o,a)}i.quad(!1,!1)}}function gw(i){return i===2?[7,6,9,8]:i===3?[7,14,9,16]:[7,6,9,16]}function vw(i,t,e,n,s,r,o,a,c,l){const[h,u,f,d,m,v]=l;for(let g=0;g<6;g++){const p=g===0&&d>=1||g===1&&h<=0||g===2&&m>=1||g===3&&u<=0||g===4&&v>=1||g===5&&f<=0,M=n+Wo[g];if(p&&Ke[t[M]&Ye])continue;const E=p?e[M]:e[n],_=ys(E>>4),T=ys(E&15),w=Nn[a*384+c*6+g],b=$o[w],C=g===2?V0[a*64+c]:0,x=Jo[g];for(let y=0;y<4;y++){const R=x[y],P=R[0]?d:h,N=R[1]?m:u,B=R[2]?v:f;let[X,V]=_w(g,P,N,B);C&&([X,V]=fw(X,V,C)),i.vertex(Math.round((s+P)*16),Math.round((r+N)*16),Math.round((o+B)*16),lo(w,g,3,b),Rn(Math.round(X*16),0,0),Math.round(V*16),_,T)}i.quad(!1,!1)}i.span(r+u,r+Math.min(m,1.5))}function _w(i,t,e,n){const s=Math.min(1,Math.max(0,e));switch(i){case 0:return[1-n,1-s];case 1:return[n,1-s];case 2:return[t,n];case 3:return[t,1-n];case 4:return[t,1-s];default:return[1-t,1-s]}}function xw(i,t,e,n,s,r,o,a){const c=a&Ye,h=(t[n+Xi]&Ye)===c,u=h?1:ac(a),f=c===A.WATER,d=e[n],m=Math.max(d>>4,e[n+Xi]>>4),v=ys(m),g=ys(Math.max(d&15,e[n+Xi]&15)),p=a>>>10;for(let M=0;M<6;M++){const E=t[n+Wo[M]],_=E&Ye;if(Ke[_]&&M!==2)continue;let T=0,w=u;if(M===2){if(h||Ke[_]&&u>=1)continue}else if(M===3){if(_===c)continue}else if(_===c&&(T=(t[n+Wo[M]+Xi]&Ye)===c?1:ac(E),T>=w))continue;const b=Nn[c*384+p*6+M],C=$o[b],x=M===2&&f?3:0,y=Jo[M];for(let R=0;R<4;R++){const P=y[R],N=M===2?u:M===3?0:P[1]?w:T,B=M===2||M===3?P[4]:1-N;i.vertex((s+P[0])*16,Math.round((r+N)*16),(o+P[2])*16,lo(b,M,3,C),Rn(P[3]*16,x,1),Math.round(B*16)+(f?0:32),v,g)}i.quad(!1,!1)}i.span(r,r+1)}function Mw(i){const t=new Uint16Array(Ec),e=new Uint8Array(Ec).fill(240);return t[Ku(0,1,0)]=i,pw(t,e)}function yw(i){const t=new qe;return t.setAttribute("aPos",new we(i.pos,4)),t.setAttribute("aData",new we(i.data,4)),t.setIndex(new we(i.index,1)),t.boundingSphere=new Ji(new F(.5,1.5,.5),1.2),t}function bw(i){const t=[],e=[],n=[],s=new $t,r=i.width,o=i.height,a=(f,d)=>f>=0&&d>=0&&f<r&&d<o&&i.getAlpha(f,d)>127,c=1/16,l=c,h=(f,d,m,v,g)=>{for(const p of[f,d,m,f,m,v])t.push(...p),e.push(...g),n.push(s.r,s.g,s.b)};for(let f=0;f<o;f++)for(let d=0;d<r;d++){if(!a(d,f))continue;const[m,v,g]=i.get(d,f);s.setRGB(m/255,v/255,g/255,xn);const p=d*c-.5,M=p+c,E=.5-f*c,_=E-c,T=-l/2,w=l/2;h([p,_,w],[M,_,w],[M,E,w],[p,E,w],[0,0,1]),h([M,_,T],[p,_,T],[p,E,T],[M,E,T],[0,0,-1]),a(d-1,f)||h([p,_,T],[p,_,w],[p,E,w],[p,E,T],[-1,0,0]),a(d+1,f)||h([M,_,w],[M,_,T],[M,E,T],[M,E,w],[1,0,0]),a(d,f-1)||h([p,E,w],[M,E,w],[M,E,T],[p,E,T],[0,1,0]),a(d,f+1)||h([p,_,T],[M,_,T],[M,_,w],[p,_,w],[0,-1,0])}const u=new qe;return u.setAttribute("position",new en(t,3)),u.setAttribute("normal",new en(e,3)),u.setAttribute("color",new en(n,3)),u.computeBoundingSphere(),u}class Sw{constructor(t,e){S(this,"blockGeo",new Map);S(this,"spriteGeo",new Map);this.atlas=t,this.materials=e}setMaterials(t){this.materials=t}isFlat(t){if(!bs(t))return!0;const e=bn[t];return e===Qr||e===qo||e===eo||e===no}spriteFor(t){const e=ye(t);return bs(t)?this.atlas.tiles[Nn[t*384]]:Mm((e==null?void 0:e.sprite)??"stick")}create(t,e,n=!1){var c,l;const s=new Vt(1,0),r={value:new F(1,1,1)},o=new Mn,a=[];if(e!==void 0||!this.isFlat(t)){const h=e??((c=ye(t))==null?void 0:c.places)??gn(t);let u=this.blockGeo.get(h);if(!u){const d=Mw(h);u=[d.opaque,d.cutout,d.translucent].filter(m=>!!m).map(yw),this.blockGeo.set(h,u)}const f=new Mn;f.position.set(-.5,-1.5,-.5);for(const d of u){const m=this.materials.entityBlock(s,n);a.push(m);const v=new ge(d,m);v.frustumCulled=!1,f.add(v)}o.add(f)}else{const h=bs(t)?`block:${t}`:((l=ye(t))==null?void 0:l.sprite)??"stick";let u=this.spriteGeo.get(h);u||this.spriteGeo.set(h,u=bw(this.spriteFor(t)));const f=new Mi({vertexColors:!0});a.push(f),o.add(new ge(u,f)),ji(o,r)}return{object:o,light:s,color:r,dispose:()=>a.forEach(h=>h.dispose())}}}const Ew=`
precision highp float;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
in vec3 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
`,ww=`
precision highp float;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
uniform float uLayer;
in vec2 vUv;
out vec4 outColor;
void main() {
  vec4 c = texture(uAtlas, vec3(vUv, uLayer));
  if (c.a < 0.1) discard;
  outColor = vec4(c.rgb * 0.15, c.a * 0.85);
}
`;class Tw{constructor(t,e){S(this,"crack");S(this,"crackMat");S(this,"outline");S(this,"layers",Array.from({length:10},(t,e)=>vu(`destroy_${e}`)));this.crackMat=new Ws({glslVersion:Hi,vertexShader:Ew,fragmentShader:ww,uniforms:{uAtlas:{value:e},uLayer:{value:0}},transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4});const n=new tn(1,1,1);n.translate(.5,.5,.5),this.crack=new ge(n,this.crackMat),this.crack.visible=!1,this.crack.renderOrder=3,t.add(this.crack);const s=new B1(new tn(1,1,1).translate(.5,.5,.5));this.outline=new mp(s,new pp({color:"#000000",transparent:!0,opacity:.5})),this.outline.visible=!1,t.add(this.outline)}fit(t,e,n,s,r,o){let a=1,c=1,l=1,h=0,u=0,f=0;for(const d of r)a=Math.min(a,d[0]),c=Math.min(c,d[1]),l=Math.min(l,d[2]),h=Math.max(h,d[3]),u=Math.max(u,d[4]),f=Math.max(f,d[5]);t.position.set(e+a-o,n+c-o,s+l-o),t.scale.set(h-a+o*2,u-c+o*2,f-l+o*2)}setTarget(t){this.outline.visible=!!t&&t.boxes.length>0,t&&this.outline.visible&&this.fit(this.outline,t.x,t.y,t.z,t.boxes,.003)}setCrack(t,e){this.crack.visible=!!t&&e>=0&&t.boxes.length>0,!(!t||!this.crack.visible)&&(this.crackMat.uniforms.uLayer.value=this.layers[Math.max(0,Math.min(9,e))],this.fit(this.crack,t.x,t.y,t.z,t.boxes,.002))}}const Aw=`
attribute float aAlpha;
varying float vAlpha;
varying vec3 vWorld;
void main() {
  vAlpha = aAlpha;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,Rw=`
${Qi}
${co}
varying float vAlpha;
varying vec3 vWorld;
void main() {
  vec3 c = (uAmbient * 1.2 + uLightColor * 0.2) * vec3(0.75, 0.82, 1.0);
  gl_FragColor = vec4(c, 0.45 * vAlpha);
}
`,Cw=`
uniform float uPixelScale;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(uPixelScale * 0.07 / -mv.z, 1.0, 9.0);
  gl_Position = projectionMatrix * mv;
}
`,Lw=`
${Qi}
void main() {
  gl_FragColor = vec4(uAmbient * 1.4 + uLightColor * 0.6 + vec3(0.02), 0.9);
}
`,Lr=900;class Dw{constructor(t,e,n,s,r=()=>1){S(this,"lines");S(this,"flakes");S(this,"pos",new Float32Array(Lr*6));S(this,"alpha",new Float32Array(Lr*2));S(this,"flakePos",new Float32Array(Lr*3));S(this,"drops",[]);S(this,"snowUniforms",{uPixelScale:{value:800}});S(this,"kind",1);S(this,"kindTimer",0);S(this,"time",0);S(this,"intensity",0);this.surfaceY=n,this.onSplash=s,this.precipitation=r;const o=new qe;o.setAttribute("position",new we(this.pos,3).setUsage(Js)),o.setAttribute("aAlpha",new we(this.alpha,1).setUsage(Js)),this.lines=new mp(o,new an({vertexShader:Aw,fragmentShader:Rw,uniforms:e,transparent:!0,depthWrite:!1})),this.lines.frustumCulled=!1,this.lines.visible=!1,t.add(this.lines);const a=new qe;a.setAttribute("position",new we(this.flakePos,3).setUsage(Js)),this.flakes=new gp(a,new an({vertexShader:Cw,fragmentShader:Lw,uniforms:{...e,...this.snowUniforms},transparent:!0,depthWrite:!1})),this.flakes.frustumCulled=!1,this.flakes.visible=!1,t.add(this.flakes)}setPixelScale(t){this.snowUniforms.uPixelScale.value=t}reset(t,e,n,s,r){t.x=e+(Math.random()-.5)*32,t.z=s+(Math.random()-.5)*32,t.y=r?n+14+Math.random()*6:n+(Math.random()-.3)*24,t.floor=this.surfaceY(Math.floor(t.x),Math.floor(t.z))+1,t.speed=this.kind===2?1.6+Math.random()*1.2:22+Math.random()*8,t.phase=Math.random()*Math.PI*2}update(t,e){if(this.time+=t,this.kindTimer-=t,this.kindTimer<=0){this.kindTimer=.5;const o=this.precipitation(Math.floor(e.x),Math.floor(e.y),Math.floor(e.z));if(o!==this.kind){this.kind=o;for(const a of this.drops)this.reset(a,e.x,e.y,e.z,!1)}}const n=this.intensity>.01&&this.kind!==0;if(this.lines.visible=n&&this.kind===1,this.flakes.visible=n&&this.kind===2,!n)return;const s=this.kind===2,r=Math.floor(Lr*this.intensity);for(;this.drops.length<Lr;){const o={x:0,y:0,z:0,floor:0,speed:0,phase:0};this.reset(o,e.x,e.y,e.z,!1),this.drops.push(o)}for(let o=0;o<Lr;o++){const a=this.drops[o];a.y-=a.speed*t,s&&(a.x+=Math.sin(this.time*1.3+a.phase)*.5*t,a.z+=Math.cos(this.time*1.1+a.phase*1.7)*.4*t),(a.y<a.floor||Math.abs(a.x-e.x)>18||Math.abs(a.z-e.z)>18)&&(!s&&a.y<a.floor&&a.floor>e.y-16&&Math.random()<.08&&this.onSplash(a.x,a.floor,a.z),this.reset(a,e.x,e.y,e.z,!0));const c=o<r&&a.y>a.floor?1:0;if(s){const h=o*3;this.flakePos[h]=a.x,this.flakePos[h+1]=c?a.y:-9999,this.flakePos[h+2]=a.z;continue}const l=o*6;this.pos[l]=a.x,this.pos[l+1]=a.y,this.pos[l+2]=a.z,this.pos[l+3]=a.x,this.pos[l+4]=a.y+.7,this.pos[l+5]=a.z,this.alpha[o*2]=c,this.alpha[o*2+1]=c*.2}s?this.flakes.geometry.getAttribute("position").needsUpdate=!0:(this.lines.geometry.getAttribute("position").needsUpdate=!0,this.lines.geometry.getAttribute("aAlpha").needsUpdate=!0)}}const Dr=2048,Pw=`
precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float uScale;
in vec3 position;
in vec4 aInfo;   // слой текстуры, u, v (смещение в текстуре 0..12), размер
in vec2 aLight;
in vec3 aColor;
out vec3 vUv;
out vec2 vLight;
out vec3 vColor;
out vec3 vWorld;
void main() {
  vUv = aInfo.xyz;
  vLight = aLight;
  vColor = aColor;
  vWorld = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = aInfo.w * uScale / max(-mv.z, 0.05);
  gl_Position = projectionMatrix * mv;
}
`,Iw=`
precision highp float;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${Qi}
${co}
in vec3 vUv;
in vec2 vLight;
in vec3 vColor;
in vec3 vWorld;
out vec4 outColor;
void main() {
  vec2 uv = (vUv.yz + gl_PointCoord * 4.0) / 16.0;
  vec4 tex = vUv.x < 0.0 ? vec4(1.0) : texture(uAtlas, vec3(uv, vUv.x));
  if (tex.a < 0.5) discard;
  vec3 light = uAmbient * lightCurve(vLight.x) + uBlockLight * lightCurve(vLight.y) * 1.3 + uLightColor * 0.35 * smoothstep(0.6, 1.0, vLight.x) + 0.01;
  vec3 col = tex.rgb * vColor * light;
  if (vUv.x < 0.0) col = vColor;
  outColor = vec4(applyFog(col, vWorld), 1.0);
}
`;class kw{constructor(t,e,n,s,r){S(this,"list",[]);S(this,"geometry",new qe);S(this,"pos",new Float32Array(Dr*3));S(this,"info",new Float32Array(Dr*4));S(this,"light",new Float32Array(Dr*2));S(this,"color",new Float32Array(Dr*3));S(this,"points");S(this,"material");this.getState=s,this.getLight=r,this.geometry.setAttribute("position",new we(this.pos,3).setUsage(Js)),this.geometry.setAttribute("aInfo",new we(this.info,4).setUsage(Js)),this.geometry.setAttribute("aLight",new we(this.light,2).setUsage(Js)),this.geometry.setAttribute("aColor",new we(this.color,3).setUsage(Js)),this.geometry.setDrawRange(0,0),this.material=new Ws({glslVersion:Hi,vertexShader:Pw,fragmentShader:Iw,uniforms:{...n,uAtlas:{value:e},uScale:{value:400}}}),this.points=new gp(this.geometry,this.material),this.points.frustumCulled=!1,t.add(this.points)}setPixelScale(t){this.material.uniforms.uScale.value=t*.6}push(t){this.list.length>=Dr&&this.list.shift(),this.list.push(t)}blockBreak(t,e,n,s,r=28,o=!1){for(let a=0;a<r;a++){const c=o?t+Math.random():t+.1+Math.random()*.8,l=o?e+Math.random():e+.1+Math.random()*.8,h=o?n+Math.random():n+.1+Math.random()*.8;this.push({x:c,y:l,z:h,vx:(c-t-.5)*3+(Math.random()-.5),vy:Math.random()*3+(o?.5:1.5),vz:(h-n-.5)*3+(Math.random()-.5),life:.6+Math.random()*.6,gravity:14,layer:s,u:Math.floor(Math.random()*12),v:Math.floor(Math.random()*12),size:.08+Math.random()*.06,r:1,g:1,b:1,emissive:!1})}}puff(t,e,n,s,r,o,a=2){for(let c=0;c<s;c++)this.push({x:t+(Math.random()-.5)*r,y:e+(Math.random()-.5)*r,z:n+(Math.random()-.5)*r,vx:(Math.random()-.5)*a,vy:Math.random()*a*.6,vz:(Math.random()-.5)*a,life:.5+Math.random()*1.2,gravity:-.6,layer:-1,u:0,v:0,size:.12+Math.random()*.25,r:o[0],g:o[1],b:o[2],emissive:!0})}splash(t,e,n,s,r){for(let o=0;o<s;o++)this.push({x:t+(Math.random()-.5)*.8,y:e,z:n+(Math.random()-.5)*.8,vx:(Math.random()-.5)*2,vy:2+Math.random()*2,vz:(Math.random()-.5)*2,life:.4+Math.random()*.3,gravity:12,layer:r,u:Math.floor(Math.random()*12),v:Math.floor(Math.random()*12),size:.05,r:.8,g:.9,b:1,emissive:!1})}update(t){let e=0;for(let n=this.list.length-1;n>=0;n--){const s=this.list[n];if(s.life-=t,s.life<=0){this.list.splice(n,1);continue}s.vy-=s.gravity*t;const r=s.x+s.vx*t,o=s.y+s.vy*t,a=s.z+s.vz*t;if(s.gravity>0&&Ke[this.getState(Math.floor(r),Math.floor(o),Math.floor(a))&Ye]?(s.vx*=.3,s.vz*=.3,s.vy=0):(s.x=r,s.y=o,s.z=a),e>=Dr)continue;this.pos[e*3]=s.x,this.pos[e*3+1]=s.y,this.pos[e*3+2]=s.z,this.info[e*4]=s.layer,this.info[e*4+1]=s.u,this.info[e*4+2]=s.v,this.info[e*4+3]=s.size;const c=s.emissive?240:this.getLight(Math.floor(s.x),Math.floor(s.y),Math.floor(s.z));this.light[e*2]=(c>>4)/15,this.light[e*2+1]=(c&15)/15;const l=s.layer<0?Math.min(1,s.life*2):1;this.color[e*3]=s.r*l,this.color[e*3+1]=s.g*l,this.color[e*3+2]=s.b*l,e++}this.geometry.setDrawRange(0,e);for(const n of["position","aInfo","aLight","aColor"])this.geometry.getAttribute(n).needsUpdate=!0}}class Nw{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Uw=new kc(-1,1,1,-1,0,1);class Ow extends qe{constructor(){super(),this.setAttribute("position",new en([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new en([0,2,0,0,2,0],2))}}const Fw=new Ow;class Sm{constructor(t){this._mesh=new ge(Fw,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Uw)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}const Jl={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Bw={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new $t(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class qr extends Nw{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new Vt(t.x,t.y):new Vt(256,256),this.clearColor=new $t(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new oi(r,o,{type:Yi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new oi(r,o,{type:Yi});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new oi(r,o,{type:Yi});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=Bw;this.highPassUniforms=qh.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new an({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Vt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=qh.clone(Jl.uniforms),this.blendMaterial=new an({uniforms:this.copyUniforms,vertexShader:Jl.vertexShader,fragmentShader:Jl.fragmentShader,blending:cc,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new $t,this._oldClearAlpha=1,this._basic=new nr,this._fsQuad=new Sm(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Vt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=qr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=qr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new an({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Vt(.5,.5)},direction:{value:new Vt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(t){return new an({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}qr.BlurDirectionX=new Vt(1,0);qr.BlurDirectionY=new Vt(0,1);const qa={low:{level:"low",shadowSize:0,shadowDistance:0,shadowTaps:4,bloom:!1,godRays:!1,msaa:0,fancyLeaves:!1,clouds:!0,waving:!0,maxPixelRatio:1},medium:{level:"medium",shadowSize:1024,shadowDistance:36,shadowTaps:4,bloom:!0,godRays:!1,msaa:0,fancyLeaves:!0,clouds:!0,waving:!0,maxPixelRatio:1},high:{level:"high",shadowSize:2048,shadowDistance:48,shadowTaps:8,bloom:!0,godRays:!0,msaa:2,fancyLeaves:!0,clouds:!0,waving:!0,maxPixelRatio:1.25},ultra:{level:"ultra",shadowSize:4096,shadowDistance:72,shadowTaps:12,bloom:!0,godRays:!0,msaa:4,fancyLeaves:!0,clouds:!0,waving:!0,maxPixelRatio:2}},Ql={low:"Низкая (телефоны)",medium:"Средняя",high:"Высокая (шейдеры)",ultra:"Ультра"};class zw{constructor(t,e,n,s,r){S(this,"renderer");S(this,"handScene",new up);S(this,"handCamera",new $n(70,1,.01,10));S(this,"sceneRT");S(this,"shadowRT",null);S(this,"shadowCamera",new kc(-1,1,1,-1,1,400));S(this,"bloom",null);S(this,"finalQuad");S(this,"finalMaterial");S(this,"entityDepth",new _p);S(this,"width",1);S(this,"height",1);S(this,"renderScale",1);S(this,"onPass",()=>{});S(this,"damageFlash",0);S(this,"dread",0);S(this,"glitch",0);S(this,"exposure",1);this.scene=e,this.camera=n,this.uniforms=s,this.quality=r,this.renderer=new Ry({antialias:!1,powerPreference:"high-performance",stencil:!1}),this.renderer.autoClear=!1,this.renderer.info.autoReset=!1,this.renderer.debug.checkShaderErrors=!1,t.prepend(this.renderer.domElement),this.camera.layers.enable(Qh),this.camera.layers.enable(eu),this.camera.layers.enable(tu),this.finalMaterial=new an({vertexShader:Ob,fragmentShader:Fb,uniforms:{tColor:{value:null},tDepth:{value:null},uSunScreen:{value:new Vt},uSunVisible:{value:0},uRayColor:{value:new F},uExposure:{value:1},uSaturation:{value:1.08},uUnderwaterTint:{value:0},uTimeF:{value:0},uDamage:{value:0},uDread:{value:0},uGlitch:{value:0}},depthTest:!1,depthWrite:!1}),this.finalQuad=new Sm(this.finalMaterial),this.setQuality(r)}get hdrSupported(){return this.renderer.extensions.has("EXT_color_buffer_half_float")||this.renderer.extensions.has("EXT_color_buffer_float")}get scale(){return this.renderScale}setRenderScale(t){const e=Math.max(.5,Math.min(1,t));Math.abs(e-this.renderScale)<.01||(this.renderScale=e,this.applyPixelRatio(),this.resize(this.width,this.height,!0))}applyPixelRatio(){this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.quality.maxPixelRatio)*this.renderScale)}setQuality(t){var e;if(this.quality=t,this.applyPixelRatio(),this.finalMaterial.defines=t.godRays?{GOD_RAYS:1}:{},this.finalMaterial.needsUpdate=!0,(e=this.shadowRT)==null||e.dispose(),this.shadowRT=null,t.shadowSize>0){const n=new mc(t.shadowSize,t.shadowSize);n.compareFunction=Au,n.minFilter=n.magFilter=_i,this.shadowRT=new oi(t.shadowSize,t.shadowSize,{depthTexture:n,depthBuffer:!0}),this.uniforms.uShadowMap.value=n,this.uniforms.uShadowTexel.value=1/t.shadowSize}else this.uniforms.uShadowMap.value=null;this.resize(this.width,this.height,!0)}resize(t,e,n=!1){var a,c;if(!n&&t===this.width&&e===this.height)return;this.width=t,this.height=e,this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.handCamera.aspect=t/e,this.handCamera.updateProjectionMatrix();const s=this.renderer.getPixelRatio(),r=Math.max(1,Math.floor(t*s)),o=Math.max(1,Math.floor(e*s));(a=this.sceneRT)==null||a.dispose(),this.sceneRT=new oi(r,o,{type:this.hdrSupported?Yi:yi,samples:this.quality.msaa,depthTexture:new mc(r,o),depthBuffer:!0}),(c=this.bloom)==null||c.dispose(),this.bloom=this.quality.bloom?new qr(new Vt(r/2,o/2),.32,.55,1.05):null}precompile(t){const e=this.renderer,n=r=>{const o=e.getRenderTarget();e.setRenderTarget(this.sceneRT);try{return r()}finally{e.setRenderTarget(o)}},s=r=>{var a;const o=r.material;for(const c of Array.isArray(o)?o:o?[o]:[])(a=e.properties.get(c).currentProgram)==null||a.getUniforms()};return n(()=>e.compileAsync(t,this.camera,this.scene)).then(()=>{n(()=>{e.compile(this.scene,this.camera),e.compile(this.handScene,this.handCamera)}),this.scene.traverse(s),this.handScene.traverse(s)})}renderShadows(t,e){if(!this.shadowRT)return;const n=this.quality,s=this.shadowCamera,r=n.shadowDistance;s.left=-r,s.right=r,s.top=r,s.bottom=-r;const o=r+48;s.near=1,s.far=o*2;const a=this.uniforms.uLightDir.value;s.position.copy(e).addScaledVector(a,o),s.up.set(0,0,1),s.lookAt(e),s.updateMatrixWorld(),s.updateProjectionMatrix();const c=new ve().multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),l=new Ge(0,0,0,1).applyMatrix4(c),h=n.shadowSize/2,u=(Math.round(l.x*h)-l.x*h)/h,f=(Math.round(l.y*h)-l.y*h)/h;s.projectionMatrix.elements[12]+=u,s.projectionMatrix.elements[13]+=f,this.uniforms.uShadowMatrix.value.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse);const d=this.renderer;this.onPass(s,!0),d.setRenderTarget(this.shadowRT),d.clear(!0,!0,!1),s.layers.set(Qh),this.scene.overrideMaterial=t.shadowOpaque,d.render(this.scene,s),s.layers.set(eu),this.scene.overrideMaterial=t.shadowCutout,d.render(this.scene,s),s.layers.set(tu),this.scene.overrideMaterial=this.entityDepth,d.render(this.scene,s),this.scene.overrideMaterial=null}render(t,e,n,s,r){const o=this.renderer;o.info.reset(),this.shadowRT&&this.uniforms.uLightColor.value.lengthSq()>1e-4&&this.renderShadows(t,n),this.onPass(this.camera,!1),o.setRenderTarget(this.sceneRT),o.setClearColor(0,1),o.clear(!0,!0,!1),o.render(this.scene,this.camera),o.clearDepth(),o.render(this.handScene,this.handCamera),this.bloom&&this.bloom.render(o,null,this.sceneRT,0,!1);const a=this.finalMaterial.uniforms,l=this.camera.position.clone().addScaledVector(e.sunDir,400).project(this.camera),h=new F;this.camera.getWorldDirection(h);const u=h.dot(e.sunDir);a.uSunScreen.value.set(l.x*.5+.5,l.y*.5+.5),a.uSunVisible.value=u>0&&!r?e.sunVisibility*Math.min(1,u*2):0,a.uRayColor.value.copy(e.rayColor),a.tColor.value=this.sceneRT.texture,a.tDepth.value=this.sceneRT.depthTexture,a.uExposure.value=this.exposure,a.uUnderwaterTint.value=r?1:0,a.uTimeF.value=s,a.uDamage.value=this.damageFlash,a.uDread.value=this.dread,a.uGlitch.value=this.glitch,o.setRenderTarget(null),o.clear(!0,!0,!1),this.finalQuad.render(o)}dispose(){var t,e;this.sceneRT.dispose(),(t=this.shadowRT)==null||t.dispose(),(e=this.bloom)==null||e.dispose(),this.finalQuad.dispose(),this.renderer.dispose()}}const Em="minecraft:settings:v3",Gw="minecraft:settings:v2",Hw=["name","color","sensitivity","fov","volume","music"];function Vw(){var i;if(Bu())return"low";try{const t=document.createElement("canvas").getContext("webgl2");if(!t)return"low";const e=t.getExtension("WEBGL_debug_renderer_info"),n=String(t.getParameter(e?e.UNMASKED_RENDERER_WEBGL:t.RENDERER)).toLowerCase();return(i=t.getExtension("WEBGL_lose_context"))==null||i.loseContext(),/swiftshader|llvmpipe|software|basic render/.test(n)?"low":/nvidia|geforce|quadro|\brtx\b|\bgtx\b|radeon (rx|pro|r9)|\brx ?\d{3,4}|\barc\b|apple m\d (pro|max|ultra)/.test(n)?"high":"medium"}catch{return"medium"}}const Ww={low:4,medium:6,high:8,ultra:10};function Xw(){const i=Bu(),t=Vw();return{name:"",color:K0[7],renderDistance:Ww[t],sensitivity:i?10:8,fov:75,quality:t,volume:80,music:40,horror:2}}function M0(i){const t=localStorage.getItem(i);return t?JSON.parse(t):null}function Yw(){const i=Xw();try{let t=M0(Em);if(!t){const s=M0(Gw)??{};t=Object.fromEntries(Hw.filter(r=>s[r]!==void 0).map(r=>[r,s[r]]))}const e={...i,...t};["low","medium","high","ultra"].includes(e.quality)||(e.quality=i.quality);const n=e.horror;return e.horror=n===!1?0:typeof n=="number"&&n>=0&&n<=3?Math.round(n):i.horror,e}catch{return i}}function To(i){try{localStorage.setItem(Em,JSON.stringify(i))}catch{}}const qu=[1,-1,0,0,0,0],$u=[0,0,1,-1,0,0],ju=[0,0,0,0,1,-1],wm=3,$r=(i,t,e)=>(t*Mt+e)*Mt+i,ou=(i,t)=>Rc[i.blocks[t]&Ye],jr=(i,t,e)=>e?i.light[t]>>4:i.light[t]&15,Qs=(i,t,e,n)=>{i.light[t]=e?i.light[t]&15|n<<4:i.light[t]&240|n};class Tm{constructor(t,e){S(this,"lastCx",NaN);S(this,"lastCz",NaN);S(this,"last");S(this,"lastMarked");this.src=t,this.changed=e}chunk(t,e){const n=t>>4,s=e>>4;return(n!==this.lastCx||s!==this.lastCz)&&(this.lastCx=n,this.lastCz=s,this.last=this.src.getChunk(n,s)),this.last}mark(t,e,n){if(!this.changed)return;const s=e&15,r=n&15,o=s===0||s===15||r===0||r===15;if(t===this.lastMarked&&!o)return;this.lastMarked=t;const a=e>>4,c=n>>4;if(this.changed.add(rn(a,c)),!o)return;const l=s===0?-1:s===15?1:0,h=r===0?-1:r===15?1:0;l&&this.changed.add(rn(a+l,c)),h&&this.changed.add(rn(a,c+h)),l&&h&&this.changed.add(rn(a+l,c+h))}}function au(i,t,e){for(let n=0;n<t.length;n+=3){const s=t[n],r=t[n+1],o=t[n+2],a=i.chunk(s,o);if(!a)continue;const c=jr(a,$r(s&15,r,o&15),e);if(!(c<=1))for(let l=0;l<6;l++){const h=r+$u[l];if(h<0||h>=Se)continue;const u=s+qu[l],f=o+ju[l],d=i.chunk(u,f);if(!d)continue;const m=$r(u&15,h,f&15),v=ou(d,m);if(v>=15)continue;const g=e&&l===wm&&c===15&&v===0?15:c-Math.max(1,v);g>jr(d,m,e)&&(Qs(d,m,e,g),i.mark(d,u,f),t.push(u,h,f))}}}function Kw(i,t,e,n,s,r){const o=[t,e,n,s],a=[];for(let c=0;c<o.length;c+=4){const l=o[c],h=o[c+1],u=o[c+2],f=o[c+3];for(let d=0;d<6;d++){const m=h+$u[d];if(m<0||m>=Se)continue;const v=l+qu[d],g=u+ju[d],p=i.chunk(v,g);if(!p)continue;const M=$r(v&15,m,g&15),E=jr(p,M,r);if(E!==0)if(E<f||r&&d===wm&&f===15&&E===15){const _=r?0:_u[p.blocks[M]&Ye];Qs(p,M,r,_),i.mark(p,v,g),o.push(v,m,g,E),_&&a.push(v,m,g)}else a.push(v,m,g)}}return a}function y0(i,t,e,n,s){if(e<0||e>=Se)return;const r=new Tm(i,s),o=r.chunk(t,n);if(!o)return;const a=$r(t&15,e,n&15),c=_u[o.blocks[a]&Ye];r.mark(o,t,n);for(const l of[!0,!1]){const h=jr(o,a,l);Qs(o,a,l,0);const u=h>0?Kw(r,t,e,n,h,l):[];!l&&c&&(Qs(o,a,!1,c),u.push(t,e,n));for(let d=0;d<6;d++){const m=e+$u[d];m>=0&&m<Se&&u.push(t+qu[d],m,n+ju[d])}const f=Rc[o.blocks[a]&Ye];l&&e===Se-1&&f<15&&(Qs(o,a,!0,Math.max(0,15-f)),u.push(t,e,n)),au(r,u,l)}}function qw(i,t,e,n){const s=i.getChunk(t,e);if(!s)return;const r=new Tm(i,n),o={sky:[],block:[]};for(let a=0;a<4;a++){const c=a===0?1:a===1?-1:0,l=a===2?1:a===3?-1:0,h=i.getChunk(t+c,e+l);if(h)for(let u=0;u<Se;u++)for(let f=0;f<Mt;f++){const d=c===1?15:c===-1?0:f,m=l===1?15:l===-1?0:f,v=c===1?0:c===-1?15:f,g=l===1?0:l===-1?15:f,p=$r(d,u,m),M=$r(v,u,g),E=ou(s,p),_=ou(h,M),T=t*Mt+d,w=e*Mt+m,b=(t+c)*Mt+v,C=(e+l)*Mt+g;for(const x of[!0,!1]){const y=jr(s,p,x),R=jr(h,M,x),P=x?o.sky:o.block;_<15&&y-Math.max(1,_)>R?(Qs(h,M,x,y-Math.max(1,_)),r.mark(h,b,C),P.push(b,u,C)):E<15&&R-Math.max(1,E)>y&&(Qs(s,p,x,R-Math.max(1,E)),r.mark(s,T,w),P.push(T,u,w))}}}au(r,o.sky,!0),au(r,o.block,!1)}const $a=3;class $w{constructor(){S(this,"chunks",new Map);S(this,"edits",new Map);S(this,"onEdit",()=>{})}getChunk(t,e){return this.chunks.get(rn(t,e))}getState(t,e,n){if(e<0)return A.BEDROCK;if(e>=Se)return A.AIR;const s=this.chunks.get(rn(t>>4,n>>4));return s?s.blocks[Ae(t&15,e,n&15)]:A.AIR}getLight(t,e,n){if(e>=Se)return 240;if(e<0)return 0;const s=this.chunks.get(rn(t>>4,n>>4));return s?s.light[Ae(t&15,e,n&15)]:240}isLoaded(t,e){return this.chunks.has(rn(Math.floor(t)>>4,Math.floor(e)>>4))}isReady(t,e){var n;return!!((n=this.chunks.get(rn(Math.floor(t)>>4,Math.floor(e)>>4)))!=null&&n.meshed)}editsFor(t,e){const n=this.edits.get(rn(t,e));return n?[...n]:[]}setState(t,e,n,s){if(e<0||e>=Se)return!1;const r=t>>4,o=n>>4,a=rn(r,o),c=Ae(t&15,e,n&15);let l=this.edits.get(a);l||this.edits.set(a,l=new Map),l.set(c,s);const h=this.chunks.get(a);if(!h||h.blocks[c]===s)return!1;h.blocks[c]=s;const u=new Set([a]);y0(this,t,e,n,u);const f=t&15,d=n&15;for(let m=d===0?-1:0;m<=(d===15?1:0);m++)for(let v=f===0?-1:0;v<=(f===15?1:0);v++)u.add(rn(r+v,o+m));for(const m of u){const v=this.chunks.get(m);v&&(v.needsMesh=v.urgent=!0)}return this.onEdit(),!0}applyEdits(t){for(let e=0;e+3<t.length;e+=4)this.setState(t[e],t[e+1],t[e+2],t[e+3])}addChunk(t,e,n,s){const r={cx:t,cz:e,blocks:n,light:s,meshes:[null,null,null],sections:[null,null,null],conn:null,needsMesh:!0,urgent:!1,meshed:!1,meshing:!1,viewLo:0,viewHi:ei-1,minY:0,maxY:Se,litLo:0,litHi:ei-1},o=rn(t,e);this.chunks.set(o,r);const a=[],c=this.edits.get(o);if(c)for(const[h,u]of c)n[h]!==u&&a.push(h,u);const l=new Set;qw(this,t,e,l);for(let h=0;h<a.length;h+=2){const u=a[h];n[u]=a[h+1],y0(this,t*Mt+(u&15),u>>8,e*Mt+(u>>4&15),l)}for(const h of l){const u=this.chunks.get(h);u&&u!==r&&u.meshed&&(u.needsMesh=!0)}return r}isOpaque(t,e,n){return Ke[this.getState(t,e,n)&Ye]===1}}const jw=2,Zw=[1,-1,0,0,0,0],Jw=[0,0,1,-1,0,0],Qw=[0,0,0,0,1,-1],b0=[1,0,3,2,5,4];class tT{constructor(t,e,n,s,r){S(this,"renderDistance");S(this,"meshOptions",{fancyLeaves:!0});S(this,"culling",!0);S(this,"workers",[]);S(this,"workerLoad",[]);S(this,"jobs",new Map);S(this,"nextJob",1);S(this,"inflightGen",new Set);S(this,"genQueue",[]);S(this,"center",null);S(this,"padPool",[]);S(this,"ready",[]);S(this,"urgentReady",[]);S(this,"batches",new Map);S(this,"nextBatch",1);S(this,"editQueued",!1);S(this,"meshing",0);S(this,"visDirty",!0);S(this,"viewMatrix",new ve);S(this,"lastView",new ve);S(this,"frustum",new Fo);S(this,"passMatrix",new ve);S(this,"passFrustum",new Fo);S(this,"box",new $i);S(this,"visCap",0);S(this,"visSeen",new Uint8Array(0));S(this,"visQueue",new Int32Array(0));S(this,"visFrom",new Uint8Array(0));S(this,"visDirs",new Uint8Array(0));S(this,"visLo",new Int8Array(0));S(this,"visHi",new Int8Array(0));S(this,"visGrid",[]);this.world=t,this.scene=e,this.materials=n,this.seed=s,this.renderDistance=r,t.onEdit=()=>{this.editQueued||(this.editQueued=!0,queueMicrotask(()=>{this.editQueued=!1,this.center&&this.dispatch(this.center[0],this.center[1],performance.now(),1)}))};const o=Math.max(1,Math.min(4,(navigator.hardwareConcurrency||4)-1));for(let a=0;a<o;a++){const c=new Worker(new URL(""+new URL("chunk.worker-02n_5dnw.js",import.meta.url).href,import.meta.url),{type:"module"});c.onmessage=l=>this.onResult(a,l.data),this.workers.push(c),this.workerLoad.push(0)}}setRenderDistance(t){this.renderDistance=t,this.center=null}setMaterials(t,e){const n=e.fancyLeaves!==this.meshOptions.fancyLeaves;this.materials=t,this.meshOptions=e;for(const s of this.world.chunks.values()){for(let r=0;r<$a;r++){const o=s.meshes[r];o&&(o.material=this.layerMaterial(r))}n&&s.meshed&&(s.needsMesh=!0)}}get loadedCount(){return this.world.chunks.size}get pendingCount(){return this.genQueue.length+this.inflightGen.size+this.meshing+this.ready.length}update(t,e){const{x:n,z:s}=t.position,r=Math.floor(n)>>4,o=Math.floor(s)>>4;(!this.center||this.center[0]!==r||this.center[1]!==o)&&(this.center=[r,o],this.refresh(r,o));const a=performance.now();for(const c of this.urgentReady.splice(0))this.applyMesh(c);for(;this.ready.length&&performance.now()-a<e;)this.applyMesh(this.ready.shift());this.dispatch(r,o,a,e),this.updateVisibility(t)}refresh(t,e){const n=this.renderDistance;for(const[r,o]of this.world.chunks)Math.max(Math.abs(o.cx-t),Math.abs(o.cz-e))>n+2&&(this.disposeMeshes(o),this.world.chunks.delete(r));const s=[];for(let r=-n-1;r<=n+1;r++)for(let o=-n-1;o<=n+1;o++){if(o*o+r*r>(n+1.5)*(n+1.5))continue;const a=t+o,c=e+r,l=rn(a,c);this.world.chunks.has(l)||this.inflightGen.has(l)||s.push([a,c,o*o+r*r])}s.sort((r,o)=>o[2]-r[2]),this.genQueue=s.map(([r,o])=>[r,o]),this.visDirty=!0}pickWorker(t){let e=0;for(let n=1;n<this.workers.length;n++)this.workerLoad[n]<this.workerLoad[e]&&(e=n);return t||this.workerLoad[e]<jw?e:-1}dispatch(t,e,n,s){const r=this.renderDistance,o=[];for(const l of this.world.chunks.values()){if(!l.needsMesh||l.meshing)continue;const h=l.cx-t,u=l.cz-e,f=h*h+u*u;f>(r+.5)*(r+.5)&&!l.meshed||this.hasNeighbors(l)&&o.push({chunk:l,score:l.urgent?-1:f})}o.sort((l,h)=>l.score-h.score);let a=0,c=0;for(;c<o.length&&o[c].chunk.urgent;c++)a||(a=this.nextBatch++,this.batches.set(a,{left:0,results:[]})),this.batches.get(a).left++,this.sendMesh(o[c].chunk,this.pickWorker(!0),a);for(;;){const l=this.pickWorker(!1);if(l<0)return;const h=o[c],u=this.genQueue[this.genQueue.length-1],f=u?(u[0]-t)**2+(u[1]-e)**2:1/0;if(h&&h.score<=f){if(performance.now()-n>s)return;c++,this.sendMesh(h.chunk,l,0)}else if(u)this.genQueue.pop(),this.sendGen(u[0],u[1],l);else return}}sendGen(t,e,n){const s=rn(t,e),r=this.nextJob++;this.inflightGen.add(s),this.jobs.set(r,{kind:"gen",key:s,worker:n}),this.workerLoad[n]++,this.post(n,{t:"gen",id:r,seed:this.seed,cx:t,cz:e,edits:this.world.editsFor(t,e)},[])}sendMesh(t,e,n){const s=[];for(let c=-1;c<=1;c++)for(let l=-1;l<=1;l++)s.push(this.world.getChunk(t.cx+l,t.cz+c));const r=this.padPool.pop()??{blocks:new Uint16Array(Ec),light:new Uint8Array(Ec)};hw(s,r.blocks,r.light),t.needsMesh=t.urgent=!1,t.meshing=!0,this.meshing++;const o=this.nextJob++;this.jobs.set(o,{kind:"mesh",chunk:t,worker:e,batch:n}),this.workerLoad[e]++;const a={t:"mesh",id:o,blocks:r.blocks,light:r.light,fancyLeaves:this.meshOptions.fancyLeaves};this.post(e,a,[r.blocks.buffer,r.light.buffer])}post(t,e,n){this.workers[t].postMessage(e,n)}onResult(t,e){this.handleResult(t,e),this.center&&this.dispatch(this.center[0],this.center[1],performance.now(),1)}handleResult(t,e){const n=this.jobs.get(e.id);if(!n)return;if(this.jobs.delete(e.id),this.workerLoad[t]--,e.t==="gen"){this.inflightGen.delete(rn(e.cx,e.cz));const o=this.center;if(!o||Math.max(Math.abs(e.cx-o[0]),Math.abs(e.cz-o[1]))>this.renderDistance+2||this.world.chunks.has(rn(e.cx,e.cz)))return;this.world.addChunk(e.cx,e.cz,e.blocks,e.light);return}if(this.padPool.push({blocks:e.blocks,light:e.light}),n.kind!=="mesh")return;n.chunk.meshing=!1,this.meshing--;const s={chunk:n.chunk,meshes:e.meshes,lit:e.lit,conn:e.conn};if(!n.batch){this.ready.push(s);return}const r=this.batches.get(n.batch);r.results.push(s),!(--r.left>0)&&(this.batches.delete(n.batch),this.urgentReady.push(...r.results))}hasNeighbors(t){for(let e=-1;e<=1;e++)for(let n=-1;n<=1;n++)if(!this.world.chunks.has(rn(t.cx+n,t.cz+e)))return!1;return!0}applyMesh(t){const e=t.chunk;if(this.world.getChunk(e.cx,e.cz)===e){this.disposeMeshes(e),e.minY=Se,e.maxY=0;for(let n=0;n<$a;n++){const s=t.meshes[n];e.sections[n]=s?s.sections:null,e.meshes[n]=s?this.createMesh(s,n,e):null,s&&(e.minY=Math.min(e.minY,s.minY-.5),e.maxY=Math.max(e.maxY,s.maxY+.5))}e.conn=t.conn,e.litLo=t.lit?31-Math.clz32(t.lit&-t.lit):ei,e.litHi=t.lit?31-Math.clz32(t.lit):-1,e.meshed=!0,this.visDirty=!0}}layerMaterial(t){return t===0?this.materials.opaque:t===1?this.materials.cutout:this.materials.translucent}createMesh(t,e,n){const s=new qe;s.setAttribute("aPos",new we(t.pos,4)),s.setAttribute("aData",new we(t.data,4)),s.setIndex(new we(t.index,1)),s.boundingBox=new $i(new F(0,t.minY-.5,0),new F(Mt,t.maxY+.5,Mt)),s.boundingSphere=s.boundingBox.getBoundingSphere(new Ji);const r=new ge(s,this.layerMaterial(e));return r.frustumCulled=!1,r.visible=!1,r.position.set(n.cx*Mt,0,n.cz*Mt),r.matrixAutoUpdate=!1,r.updateMatrix(),e===0?r.layers.set(Qh):e===1&&r.layers.set(eu),this.scene.add(r),r}disposeMeshes(t){for(let e=0;e<$a;e++){const n=t.meshes[e];n&&(this.scene.remove(n),n.geometry.dispose(),t.meshes[e]=null,t.sections[e]=null)}}preparePass(t,e){t.updateMatrixWorld(),this.passMatrix.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.passFrustum.setFromProjectionMatrix(this.passMatrix);const n=this.box,s=e&&!this.culling;for(const r of this.world.chunks.values()){const o=s?0:e?r.litLo:r.viewLo,a=s?ei-1:e?r.litHi:r.viewHi;let c=o<=a;c&&(n.min.set(r.cx*Mt,Math.max(o*16,r.minY),r.cz*Mt),n.max.set(r.cx*Mt+Mt,Math.min(a*16+16,r.maxY),r.cz*Mt+Mt),c=n.min.y<n.max.y&&this.passFrustum.intersectsBox(n));for(let l=0;l<$a;l++){const h=r.meshes[l],u=r.sections[l];if(!h||!u)continue;const f=c?u[o]:0,d=c?u[a+1]-f:0;h.visible=d>0,d>0&&h.geometry.setDrawRange(f,d)}}}updateVisibility(t){const{x:e,y:n,z:s}=t.position,r=Math.floor(e)>>4,o=Math.floor(s)>>4,a=Math.min(ei-1,Math.max(0,Math.floor(n)>>4));if(t.updateMatrixWorld(),this.viewMatrix.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),!this.visDirty&&this.viewMatrix.equals(this.lastView))return;if(this.lastView.copy(this.viewMatrix),this.visDirty=!1,!this.culling){for(const f of this.world.chunks.values())f.viewLo=0,f.viewHi=ei-1;this.visDirty=!0;return}const l=this.renderDistance+1,h=2*l+1,u=this.visGrid;u.length=h*h;for(let f=0;f<h;f++)for(let d=0;d<h;d++)u[f*h+d]=this.world.getChunk(r+d-l,o+f-l);this.frustum.setFromProjectionMatrix(this.viewMatrix),this.traverse(r,a,o,this.frustum);for(const f of this.world.chunks.values()){const d=f.cx-r+l,m=f.cz-o+l,v=d>=0&&d<h&&m>=0&&m<h?m*h+d:-1;f.viewLo=v<0?ei:this.visLo[v],f.viewHi=v<0?-1:this.visHi[v]}}traverse(t,e,n,s){var w;const r=this.renderDistance,o=r+1,a=2*o+1,c=a*a,l=c*ei;this.visCap<l&&(this.visCap=l,this.visSeen=new Uint8Array(l),this.visQueue=new Int32Array(l),this.visFrom=new Uint8Array(l),this.visDirs=new Uint8Array(l),this.visLo=new Int8Array(c),this.visHi=new Int8Array(c));const{visSeen:h,visQueue:u,visFrom:f,visDirs:d,visLo:m,visHi:v,visGrid:g,box:p}=this;h.fill(0,0,l),m.fill(ei,0,c),v.fill(-1,0,c);const M=(e*a+o)*a+o;h[M]=1,u[0]=M,f[0]=6,d[0]=0;let E=0,_=1;const T=(r+1)*(r+1);for(;E<_;){const b=u[E],C=f[E],x=d[E];E++;const y=b%a,R=(b/a|0)%a,P=b/c|0,N=R*a+y;P<m[N]&&(m[N]=P),P>v[N]&&(v[N]=P);const B=(w=g[N])==null?void 0:w.conn,X=C===6||!B?63:B[P*6+C];for(let V=0;V<6;V++){if(!(X&1<<V)||x&1<<b0[V])continue;const K=P+Jw[V];if(K<0||K>=ei)continue;const G=y+Zw[V],Z=R+Qw[V],rt=G-o,yt=Z-o;if(rt*rt+yt*yt>T)continue;const Bt=(K*a+Z)*a+G;if(!h[Bt]){if(Math.abs(rt)>1||Math.abs(yt)>1||Math.abs(K-e)>1){const Wt=(t+rt)*Mt,ne=(n+yt)*Mt;if(p.min.set(Wt,K*16,ne),p.max.set(Wt+Mt,K*16+16,ne+Mt),!s.intersectsBox(p))continue}h[Bt]=1,u[_]=Bt,f[_]=b0[V],d[_]=x|1<<V,_++}}}}dispose(){for(const t of this.workers)t.terminate();for(const t of this.world.chunks.values())this.disposeMeshes(t)}}const cu="minecraft:autojoin",Oi=.25,S0=i=>i/(3-2*i),eT=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};function nT(i,t,e,n,s){const r=Lt(n),o=n>>>10;if(r===A.OAK_DOOR){const a=o&8?t-1:t+1;return Lt(s(i,a,e))===A.OAK_DOOR?[[i,a,e]]:[]}if(r===A.BED){const a=o&4?(o&3)+2&3:o&3,[c,l]=[[0,-1],[1,0],[0,1],[-1,0]][a];return Lt(s(i+c,t,e+l))===A.BED?[[i+c,t,e+l]]:[]}return[]}class iT{constructor(t,e,n,s,r){S(this,"scene",new up);S(this,"camera",new $n(75,1,.05,1200));S(this,"uniforms",Bb());S(this,"pipeline");S(this,"env");S(this,"atlasTex");S(this,"materials");S(this,"quality");S(this,"world",new $w);S(this,"chunks");S(this,"player");S(this,"inv",new SS);S(this,"invUI");S(this,"itemMeshes");S(this,"entities");S(this,"particles");S(this,"overlays");S(this,"rainFx");S(this,"hand");S(this,"horror");S(this,"sound",new Lb(()=>new Worker(new URL(""+new URL("synth.worker-BEZfTObr.js",import.meta.url).href,import.meta.url),{type:"module"})));S(this,"input");S(this,"avatars",new Map);S(this,"colors",new Map);S(this,"selfAvatar");S(this,"touch",Bu());S(this,"myId");S(this,"mode","loading");S(this,"autoReconnect",!1);S(this,"tipsPending",!1);S(this,"gameMode");S(this,"time");S(this,"rain");S(this,"rainLevel");S(this,"spawn");S(this,"openContainerId",null);S(this,"target",null);S(this,"targetEntity",null);S(this,"attackHeld",!1);S(this,"useHeld",!1);S(this,"breakProgress",0);S(this,"breakKey","");S(this,"breakTick",0);S(this,"actionCooldown",0);S(this,"attackCooldown",0);S(this,"eating",0);S(this,"bowDraw",0);S(this,"view",0);S(this,"debug",!1);S(this,"fps",0);S(this,"fpsFrames",0);S(this,"fpsTime",0);S(this,"lastFrame",performance.now());S(this,"lastSent",0);S(this,"lastSentPos",new F(1/0,0,0));S(this,"lastSentRot",[0,0]);S(this,"invTimer",0);S(this,"statsTimer",0);S(this,"damageFlash",0);S(this,"shake",0);S(this,"hurtTilt",0);S(this,"lastHp",20);S(this,"elapsed",0);S(this,"entityLight",new F);S(this,"autoQuality",!0);S(this,"perfFrames",[]);S(this,"perfSlow",0);S(this,"playTime",0);S(this,"lastDownscale",-1/0);S(this,"onResize",()=>{this.pipeline.resize(window.innerWidth,window.innerHeight);const t=window.innerHeight*this.pipeline.renderer.getPixelRatio();this.particles.setPixelScale(t),this.rainFx.setPixelScale(t)});S(this,"onMessage",t=>{var e;switch(t.t){case"join":this.addAvatar(t.player);break;case"leave":{const n=this.avatars.get(t.id);if(!n)break;this.scene.remove(n.group),n.dispose(),this.avatars.delete(t.id),this.colors.delete(t.id);break}case"moves":for(let n=0;n+6<t.d.length;n+=7){if(t.d[n]===this.myId)continue;const s=this.avatars.get(t.d[n]);s&&(s.setTarget(t.d[n+1],t.d[n+2],t.d[n+3],t.d[n+4],t.d[n+5]),s.sneaking=(t.d[n+6]&1)!==0,s.sleeping=(t.d[n+6]&2)!==0)}break;case"playerInfo":{const n=this.avatars.get(t.id);n==null||n.setHeld(t.held),n==null||n.setArmor(t.armor);break}case"swing":(e=this.avatars.get(t.id))==null||e.swing();break;case"blocks":for(let n=0;n+3<t.d.length;n+=4)this.applyRemoteBlock(t.d[n],t.d[n+1],t.d[n+2],t.d[n+3]);break;case"spawn":for(const n of t.e)this.entities.spawn(n);break;case"entities":this.entities.move(t.d);break;case"despawn":{const n=t.by,s=n===this.myId?()=>new F(this.player.x,this.player.y+.8,this.player.z):n!==void 0&&this.avatars.has(n)?()=>this.avatars.get(n).group.position.clone().add(new F(0,.8,0)):void 0;this.entities.remove(t.ids,s);break}case"entityEvent":this.entities.event(t.id,t.ev,t.v);break;case"hurt":this.player.damage(t.amount,t.cause,t.kx,t.kz);break;case"give":{const n=this.inv.add({...t.item});this.sound.play("pop",{pitch:1+Math.random()*.4}),n>0&&this.dropItem({...t.item,count:n},!0);break}case"container":this.openContainerId=t.c.cid,(this.mode==="play"||this.mode==="inventory")&&(this.setMode("inventory"),this.invUI.open(t.c.kind,t.c));break;case"containerSlot":this.invUI.setContainerSlot(t.cid,t.slot,t.item);break;case"containerProgress":this.invUI.setProgress(t.cid,t.burn,t.burnMax,t.cook);break;case"containerClosed":this.invUI.containerClosed(t.cid);break;case"sound":this.sound.play(t.name,{x:t.p[0],y:t.p[1],z:t.p[2],volume:t.volume,pitch:t.pitch});break;case"explosion":{const[n,s,r]=t.p;this.sound.play("explode",{x:n,y:s,z:r}),this.particles.puff(n,s,r,60,t.power*1.2,[1.4,1.3,1.2],5),this.particles.puff(n,s,r,20,t.power*.6,[3,2,.8],3);const o=Math.hypot(this.player.x-n,this.player.y-s,this.player.z-r);this.shake=Math.max(this.shake,Math.max(0,1-o/24));break}case"chat":this.ui.addChat(t.from,t.color,t.text);break;case"time":this.time=t.time;break;case"weather":this.rain=t.rain;break;case"tp":this.player.setPosition(...t.p);break;case"mode":this.gameMode=t.mode,this.applyGameMode();break;case"spawnPoint":this.spawn=t.p,this.ui.addChat(null,void 0,"Точка возрождения установлена");break;case"sleep":this.player.sleeping=t.sleeping,this.ui.setSleeping(t.sleeping);break}});S(this,"frame",t=>{requestAnimationFrame(this.frame);const e=t-this.lastFrame,n=Math.min(.1,Math.max(0,e/1e3));this.lastFrame=t,this.elapsed+=n;const s=this.player,r=this.camera,[o,a]=this.input.consumeLook();if(s.sleeping||(s.yaw-=o,s.pitch=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,s.pitch-a))),this.actionCooldown=Math.max(0,this.actionCooldown-n),this.attackCooldown=Math.max(0,this.attackCooldown-n),this.mode==="loading")this.trySpawn()&&(this.tipsPending=!0,this.setMode(this.touch?"play":"pause"));else if(this.world.isLoaded(s.x,s.z)){const m=this.input.moveInput();s.sleeping&&((m.forward||m.strafe||m.jump||m.sneak)&&this.wake(),m.forward=m.strafe=0,m.jump=m.sneak=m.sprint=!1),(this.eating>0||this.bowDraw>0)&&(m.forward*=.3,m.strafe*=.3,m.sprint=!1);const v=Math.ceil(n/.05);for(let g=0;g<v;g++)s.update(n/v,m)}const c=this.eye,l=this.shake*.3;if(this.shake=Math.max(0,this.shake-n*1.5),this.hurtTilt=Math.max(0,this.hurtTilt-n*3),r.rotation.set(s.pitch+(Math.random()-.5)*l*.1,s.yaw+(Math.random()-.5)*l*.1,Math.sin(this.hurtTilt*8)*this.hurtTilt*.12),s.sleeping?r.position.set(s.x,s.y+.4,s.z):r.position.copy(c),this.view>0){const m=this.lookDir().multiplyScalar(this.view===1?-1:1),v=m0((p,M,E)=>this.world.getState(p,M,E),c.x,c.y,c.z,m.x,m.y,m.z,4),g=v?Math.max(.3,v.dist-.25):4;r.position.addScaledVector(m,g),this.view===2&&r.rotation.set(-s.pitch,s.yaw+Math.PI,0)}const h=this.settings.fov*(s.sprinting?1.12:1)*(this.bowDraw>0?1-Math.min(1,this.bowDraw)*.15:1);Math.abs(r.fov-h)>.01&&(r.fov+=(h-r.fov)*Math.min(1,n*10),r.updateProjectionMatrix()),this.chunks.update(r,this.mode==="loading"?8:3),this.time=(this.time+n*20)%L0,this.rainLevel+=(this.rain-this.rainLevel)*Math.min(1,n*.4);const u=s.eyeInWater&&this.view===0;this.uniforms.uTime.value=this.elapsed,this.uniforms.uCameraPos.value.copy(r.position),this.env.update(this.time,this.rainLevel,r,n,this.chunks.renderDistance,u),this.ui.setUnderwater(u),this.updateTarget(),this.mode==="play"&&(this.updateBreaking(n),this.updateUsing(n));const f=this.world.getLight(Math.floor(s.x),Math.floor(s.y+1),Math.floor(s.z));this.lightColor(f,this.entityLight),this.hand.update(n,{speed:s.onGround?s.speed:0,sky:(f>>4)/15,block:(f&15)/15,lightColor:this.entityLight,eating:this.eating>0?Math.min(1,this.eating):0,bowDraw:this.bowDraw>0?Math.min(1,this.bowDraw):0,mining:this.attackHeld&&this.breakProgress>0}),this.pipeline.handScene.visible=this.view===0&&!s.sleeping,this.selfAvatar.group.visible=this.view>0,this.view>0&&(this.selfAvatar.setTarget(s.x,s.y,s.z,s.yaw,s.pitch),this.selfAvatar.sneaking=s.sneaking,this.selfAvatar.light.value.copy(this.entityLight),this.selfAvatar.update(n));for(const m of this.avatars.values()){const v=m.group.position;this.lightColor(this.world.getLight(Math.floor(v.x),Math.floor(v.y+1),Math.floor(v.z)),m.light.value),m.update(n)}this.entities.update(n),this.horror.update(n),this.particles.update(n),this.rainFx.intensity=this.rainLevel,this.rainFx.update(n,r.position);const d=f>>4>=14;this.sound.setListener(r.position.x,r.position.y,r.position.z,s.yaw,s.pitch),this.sound.setUnderwater(u),this.sound.setRain(this.rainLevel*(d?1:.3)),this.mode!=="loading"&&this.sendMove(t),this.invTimer>0&&(this.invTimer-=n,this.invTimer<=0&&this.sendInventory()),this.statsTimer+=n,this.statsTimer>3&&(this.statsTimer=0,this.conn.send({t:"stats",hp:s.hp,food:s.food,saturation:s.saturation})),s.hp<this.lastHp&&(this.damageFlash=1,this.hurtTilt=1),this.lastHp=s.hp,this.damageFlash=Math.max(0,this.damageFlash-n*2.5),this.pipeline.damageFlash=this.damageFlash*.5,this.ui.setStatus(s.hp,s.food,this.inv.armorPoints(),s.air,this.gameMode,s.hp<=4&&Math.floor(this.elapsed*6)%2===0),this.updateDebug(n),this.trackPerformance(e,n),this.pipeline.render(this.materials,this.env,new F(s.x,s.y,s.z),this.elapsed,u)});this.conn=t,this.settings=n,this.ui=s,this.myId=e.id,this.time=e.time,this.rain=e.rain,this.rainLevel=e.rain,this.gameMode=e.self.mode,this.spawn=e.self.spawn,this.quality=qa[n.quality],this.atlasTex=zb(r.data,r.count),this.materials=this.makeMaterials(),this.pipeline=new zw(bt("app"),this.scene,this.camera,this.uniforms,this.quality),this.camera.rotation.order="YXZ",this.camera.fov=n.fov,this.env=new ow(this.scene,this.uniforms),this.env.setClouds(this.quality.clouds),this.scene.add(new yp("#ffffff",Math.PI*.62));const o=new Mp("#ffffff",Math.PI*.5);o.position.set(.4,1,.6),this.scene.add(o),this.chunks=new tT(this.world,this.scene,this.materials,e.seed,n.renderDistance),this.chunks.meshOptions={fancyLeaves:this.quality.fancyLeaves},this.pipeline.onPass=(c,l)=>this.chunks.preparePass(c,l),this.world.applyEdits(e.edits),this.player=new JE(this.world),this.player.setPosition(...e.self.p),this.player.yaw=e.self.r[0],this.player.pitch=e.self.r[1],this.player.hp=e.self.hp,this.player.food=e.self.food,this.player.saturation=e.self.saturation,this.player.mode=this.gameMode,this.player.armorPoints=()=>this.inv.armorPoints(),this.lastHp=this.player.hp,this.itemMeshes=new Sw(r,this.materials),this.particles=new kw(this.scene,this.atlasTex,this.uniforms,(c,l,h)=>this.world.getState(c,l,h),(c,l,h)=>this.world.getLight(c,l,h)),this.overlays=new Tw(this.scene,this.atlasTex);const a=new qy(e.seed);this.rainFx=new Dw(this.scene,this.uniforms,(c,l)=>this.surfaceY(c,l),(c,l,h)=>this.particles.splash(c,l,h,2,Nn[A.WATER*384]),(c,l,h)=>{const{biome:u}=a.column(c,h);return u===pe.DESERT?0:u===pe.SNOWY||u===pe.MOUNTAINS&&l>ic-8?2:1}),this.hand=new lw(this.pipeline.handScene,this.itemMeshes,n.color),this.entities=new fS(this.scene,this.itemMeshes,this.world,this.particles,(c,l)=>this.lightColor(c,l));for(const c of e.entities)this.entities.spawn(c);for(const c of e.players)this.addAvatar(c);this.selfAvatar=new Nl(n.name,n.color,e.self.p,this.itemMeshes),this.selfAvatar.group.visible=!1,this.scene.add(this.selfAvatar.group),this.horror=new yS({scene:this.scene,camera:this.camera,player:this.player,world:this.world,sound:this.sound,ui:this.ui,entities:this.entities,env:this.env,pipeline:this.pipeline,torchLight:this.uniforms.uBlockLight.value,playerName:n.name,fog:()=>[this.uniforms.uFogNear.value,this.uniforms.uFogFar.value],lightColor:(c,l)=>this.lightColor(c,l),playing:()=>this.mode==="play",firstPerson:()=>this.view===0}),this.horror.setLevel(n.horror),this.sound.setVolume(n.volume/100),this.sound.setMusicVolume(n.music/100),this.input=new bS(this.pipeline.renderer.domElement,{attackStart:()=>this.onAttackStart(),attackEnd:()=>this.onAttackEnd(),useStart:()=>this.onUseStart(),useEnd:()=>this.onUseEnd(),pick:()=>this.pickBlock(),hotbar:c=>this.selectSlot(c),scroll:c=>this.selectSlot(this.inv.selected+c),toggleFly:()=>{this.gameMode==="creative"&&(this.player.flying=!this.player.flying,this.player.vy=0)},drop:c=>this.dropHeld(c),chat:c=>this.openChat(c),inventory:()=>this.openInventory(),playerList:c=>this.ui.setPlayerList(c?this.playerList():null),debug:()=>this.debug=!this.debug,pause:()=>this.setMode("pause"),toggleView:()=>this.view=(this.view+1)%3}),this.input.sensitivity=n.sensitivity,this.touch&&this.input.setupTouch(bt("touch")),this.invUI=new GE(r,this.inv,{close:()=>{this.openContainerId&&this.conn.send({t:"containerClose"}),this.openContainerId=null,this.mode==="inventory"&&this.resume()},drop:c=>this.dropItem(c,!1),containerSlot:(c,l,h)=>this.conn.send({t:"containerSlot",cid:c,slot:l,item:h}),sound:c=>this.sound.play(c)},()=>this.gameMode),this.inv.onOverflow=c=>this.dropItem(c,!1),this.inv.onChange=()=>this.onInventoryChange(),this.inv.load(e.self.inventory,e.self.armor,e.self.selected),this.bindPlayer(),this.setupUI(),this.setupPointerLock(),window.addEventListener("resize",this.onResize),this.onResize(),t.onClose=(c,l)=>this.disconnect(c,!l),t.setHandler(this.onMessage),t.isOpen||this.disconnect("Соединение с сервером потеряно"),this.applyGameMode(),this.ui.setHud(!0),this.setMode("loading"),this.warmUpShaders(),requestAnimationFrame(this.frame)}warmUpShaders(){const t=new Mn;t.visible=!1;const e={value:new F(1,1,1)};for(const r of Object.keys(pg)){const o=Hp(r);ji(o.group,e),t.add(o.group)}t.add(new Nl("",this.settings.color,[0,0,0],this.itemMeshes).group);for(const r of[A.STONE,j.STICK])t.add(this.itemMeshes.create(r).object);const n=new tn(.1,.1,.1),s=new ge(n,new Mi({color:"#8b6a3e"}));ji(s,e),t.add(s,new ge(n,new nr({transparent:!0})),new ge(n,this.pipeline.entityDepth)),this.scene.add(t),this.pipeline.precompile(t).catch(()=>{})}makeMaterials(){return Gb(this.atlasTex,this.uniforms,{shadows:this.quality.shadowSize>0,shadowTaps:this.quality.shadowTaps,waving:this.quality.waving})}lightColor(t,e){const n=S0((t>>4)/15),s=S0((t&15)/15),r=this.uniforms;return e.copy(r.uAmbient.value).multiplyScalar(n*1.2),e.addScaledVector(r.uLightColor.value,.5*eT(.6,.95,(t>>4)/15)),e.addScaledVector(r.uBlockLight.value,s*s*1.35),e.addScalar(.02),e}surfaceY(t,e){for(let n=Se-1;n>0;n--){const s=this.world.getState(t,n,e)&Ye;if(s!==A.AIR&&(Hr[s]||Ro(s)||Ze[s].opacity>0))return n}return 0}setMode(t){this.mode!=="disconnected"&&(this.mode=t,this.input.active=t==="play",t!=="play"&&(this.input.release(),this.attackHeld=this.useHeld=!1,this.stopUsing(),this.overlays.setCrack(null,-1)),t==="play"&&(bt("resume").textContent="Вернуться к игре",this.tipsPending&&(this.tipsPending=!1,this.showTips())),this.ui.show(t==="pause"?"pause":t==="loading"?"loading":t==="dead"?"death":t==="disconnected"?"disconnected":t==="inventory"?"inventory":null),bt("touch").hidden=!this.touch||t!=="play",t!=="play"&&t!=="loading"&&!this.touch&&document.pointerLockElement&&document.exitPointerLock())}resume(){var e;if(this.sound.unlock(),this.touch)return this.setMode("play");this.ui.show(null);const t=()=>{this.mode!=="dead"&&this.mode!=="disconnected"&&this.setMode("pause")};try{const n=this.pipeline.renderer.domElement.requestPointerLock();(e=n==null?void 0:n.catch)==null||e.call(n,t)}catch{t()}}setupPointerLock(){document.addEventListener("pointerlockchange",()=>{this.input.pointerLocked?(this.mode==="pause"||this.mode==="chat"||this.mode==="inventory"||this.mode==="dead"&&this.player.alive)&&this.setMode("play"):this.mode==="play"&&this.setMode("pause")}),document.addEventListener("pointerlockerror",()=>{this.mode!=="disconnected"&&this.mode!=="dead"&&this.mode!=="inventory"&&this.setMode("pause")}),this.pipeline.renderer.domElement.addEventListener("click",()=>{this.sound.unlock(),!this.touch&&this.mode==="pause"&&this.resume()});const e=()=>this.sound.unlock();for(const n of["pointerdown","keydown","touchend"])window.addEventListener(n,e,{capture:!0,passive:!0})}setupUI(){const t=this.settings;bt("resume").onclick=()=>this.resume(),bt("reconnect").onclick=()=>this.reconnect(),bt("disconnect-menu").onclick=()=>location.reload(),document.addEventListener("visibilitychange",()=>{!document.hidden&&this.mode==="disconnected"&&this.autoReconnect&&this.reconnect()}),bt("to-menu").onclick=()=>location.reload(),bt("respawn").onclick=()=>this.respawn(),bt("wake").onclick=()=>this.wake(),bt("fullscreen").onclick=()=>{var c,l;if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});return}const a=()=>{var h,u;return(u=(h=screen.orientation).lock)==null?void 0:u.call(h,"landscape").catch(()=>{})};(l=(c=document.documentElement).requestFullscreen)==null||l.call(c).then(a).catch(()=>{})};const e=bt("quality");e.replaceChildren(...Object.keys(qa).map(a=>{const c=document.createElement("option");return c.value=a,c.textContent=Ql[a],c})),e.value=t.quality,e.onchange=()=>{t.quality=e.value,To(t),this.autoQuality=!1,this.setQuality(qa[t.quality])};const n=(a,c,l,h)=>{const u=bt(a),f=bt(`${a}-value`),d=m=>f.textContent=h?h(m):String(m);u.value=String(c),d(c),u.oninput=()=>{const m=Number(u.value);d(m),l(m),To(t)}};n("rd",t.renderDistance,a=>{t.renderDistance=a,this.chunks.setRenderDistance(a)}),n("sens",t.sensitivity,a=>{t.sensitivity=a,this.input.sensitivity=a}),n("fov",t.fov,a=>t.fov=a),n("vol",t.volume,a=>{t.volume=a,this.sound.setVolume(a/100)},a=>`${a}%`),n("music",t.music,a=>{t.music=a,this.sound.setMusicVolume(a/100)},a=>a?`${a}%`:"выкл");const s=bt("horror"),r=()=>s.textContent=`Ужасы: ${nu[t.horror]}`;r(),s.onclick=()=>{t.horror=(t.horror+1)%nu.length,To(t),this.horror.setLevel(t.horror),r()};const o=bt("chat-input");bt("chat-form").onsubmit=a=>{a.preventDefault();const c=o.value.trim();c&&this.conn.send({t:"chat",text:c}),this.closeChat()},o.onkeydown=a=>{a.key==="Escape"&&(a.preventDefault(),this.closeChat())},window.addEventListener("keydown",a=>{this.mode==="inventory"&&!a.repeat&&(a.code==="KeyE"||a.code==="Escape")&&(a.preventDefault(),this.invUI.close())}),bt("inv-close").onclick=()=>this.invUI.close(),this.renderHotbar()}setQuality(t){this.quality=t;const e=this.materials;this.materials=this.makeMaterials(),this.pipeline.setQuality(t),this.chunks.setMaterials(this.materials,{fancyLeaves:t.fancyLeaves}),this.itemMeshes.setMaterials(this.materials),this.env.setClouds(t.clouds),this.onResize();for(const n of[e.opaque,e.cutout,e.translucent,e.shadowOpaque,e.shadowCutout])n.dispose()}trackPerformance(t,e){if(this.mode!=="play"||document.hidden||this.chunks.pendingCount>16){this.perfFrames.length=0;return}if(this.playTime+=e,this.playTime<3||(this.perfFrames.push(t),this.perfFrames.length<60))return;const n=this.perfFrames.sort((o,a)=>o-a),s=n[n.length>>1];this.perfFrames.length=0;const r=this.pipeline.scale;if(s>22){if(this.lastDownscale=this.elapsed,r>.55){this.pipeline.setRenderScale(r-(s>40?.2:.1));return}const o=["low","medium","high","ultra"],a=o.indexOf(this.quality.level);if(!this.autoQuality||a<=0||++this.perfSlow<2)return;this.perfSlow=0;const c=o[a-1];this.settings.quality=c,To(this.settings),this.setQuality(qa[c]),this.pipeline.setRenderScale(.8),bt("quality").value=c,this.ui.addChat(null,void 0,`Графика: «${Ql[c]}» — так игра пойдёт плавнее. Изменить можно в меню паузы.`)}else this.perfSlow=0,s<17.5&&r<1&&this.elapsed-this.lastDownscale>20&&this.pipeline.setRenderScale(r+.05)}applyGameMode(){this.player.mode=this.gameMode,this.gameMode!=="creative"&&(this.player.flying=!1),bt("touch").classList.toggle("creative",this.gameMode==="creative")}renderHotbar(){this.ui.renderHotbar(this.inv,t=>this.selectSlot(t))}selectSlot(t){var e;this.inv.select(t),this.stopUsing(),this.ui.flashItemName(((e=this.inv.held)==null?void 0:e.id)??null)}onInventoryChange(){var t,e;this.renderHotbar(),this.hand.setItem(((t=this.inv.held)==null?void 0:t.id)??null),this.selfAvatar.setHeld(((e=this.inv.held)==null?void 0:e.id)??0),this.selfAvatar.setArmor(this.inv.armor.map(n=>(n==null?void 0:n.id)??0)),this.invUI.refresh(),this.invTimer=.4}sendInventory(){var t;this.conn.send({t:"inventory",slots:this.inv.slots,armor:this.inv.armor,selected:this.inv.selected,held:((t=this.inv.held)==null?void 0:t.id)??0})}openChat(t){this.mode==="play"&&(this.setMode("chat"),this.ui.openChat(t))}closeChat(){this.ui.closeChat(),this.mode==="chat"&&this.resume()}openInventory(){this.mode==="play"&&(this.setMode("inventory"),this.invUI.open(this.gameMode==="creative"?"creative":"inventory"))}disconnect(t,e=!0){this.mode!=="disconnected"&&(bt("disconnect-reason").textContent=t,this.setMode("disconnected"),this.ui.setHud(!1),this.autoReconnect=e,e&&!document.hidden&&setTimeout(()=>this.autoReconnect&&!document.hidden&&this.reconnect(),3e3))}reconnect(){this.autoReconnect=!1;try{sessionStorage.setItem(cu,"1")}catch{}location.reload()}playerList(){const t=[{name:`${this.settings.name} (вы)`,color:this.settings.color},...[...this.avatars].map(([e,n])=>({name:n.name,color:this.colors.get(e)??"#fff"}))];return this.horror.ghost&&t.push({name:this.horror.ghost,color:"#ffffff"}),t}applyRemoteBlock(t,e,n,s){const r=this.world.getState(t,e,n);if(!this.world.setState(t,e,n,s))return;const o=Lt(r),a=Lt(s);o!==a&&(a===A.AIR&&o!==A.AIR&&!Ro(r)?(this.particles.blockBreak(t,e,n,Nn[o*384]),this.sound.play(`break_${Ze[o].sound}`,{x:t+.5,y:e+.5,z:n+.5})):o===A.AIR&&a!==A.AIR&&!Ro(s)&&this.sound.play(`place_${Ze[a].sound}`,{x:t+.5,y:e+.5,z:n+.5}))}addAvatar(t){if(t.id===this.myId||this.avatars.has(t.id))return;const e=new Nl(t.name,t.color,t.p,this.itemMeshes);e.setTarget(...t.p,t.r[0],t.r[1]),e.setHeld(t.held),e.setArmor(t.armor),this.avatars.set(t.id,e),this.colors.set(t.id,t.color),this.scene.add(e.group)}sendMove(t,e=!1){if(!e&&t-this.lastSent<50)return;const n=this.player,s=new F(n.x,n.y,n.z);!(s.distanceToSquared(this.lastSentPos)>1e-4||Math.abs(n.yaw-this.lastSentRot[0])>.001||Math.abs(n.pitch-this.lastSentRot[1])>.001)&&t-this.lastSent<2e3||(this.conn.send({t:"move",p:[n.x,n.y,n.z],r:[n.yaw,n.pitch],sneak:n.sneaking,fly:n.flying}),this.lastSent=t,this.lastSentPos.copy(s),this.lastSentRot=[n.yaw,n.pitch])}get eye(){return new F(this.player.x,this.player.y+this.player.eyeHeight,this.player.z)}lookDir(){const t=this.player;return new F(-Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),-Math.cos(t.yaw)*Math.cos(t.pitch))}swing(){this.hand.swing(),this.selfAvatar.swing(),this.conn.send({t:"swing"})}onAttackStart(){if(!(this.mode!=="play"||!this.player.alive)){if(this.attackHeld=!0,this.breakProgress=0,this.breakKey="",this.targetEntity&&(!this.target||this.targetEntity.dist<this.target.dist)){this.attackEntity(this.targetEntity.id);return}this.swing(),this.gameMode==="creative"&&this.creativeBreak()}}onAttackEnd(){this.attackHeld=!1,this.breakProgress=0,this.overlays.setCrack(null,-1)}attackEntity(t){var s;if(this.attackCooldown>0)return;this.attackCooldown=.25,this.swing();const e=this.inv.held,n=this.player.vy<-.5&&!this.player.onGround;if(this.conn.send({t:"attack",id:t,item:(e==null?void 0:e.id)??null,crit:n}),this.sound.play(n?"strong_hit":"attack"),this.player.addExhaustion(.1),e&&((s=ye(e.id))!=null&&s.tool)&&this.gameMode==="survival"){const r=ye(e.id).tool.type;this.inv.damageHeld(r==="sword"?1:2)&&this.sound.play("tool_break")}}creativeBreak(){var e,n,s;const t=this.target;!t||this.actionCooldown>0||((s=(n=ye(((e=this.inv.held)==null?void 0:e.id)??0))==null?void 0:n.tool)==null?void 0:s.type)!=="sword"&&(this.actionCooldown=.2,this.breakBlock(t))}breakBlock(t){var s,r;const e=t.state,n=Lt(e);this.world.setState(t.x,t.y,t.z,A.AIR);for(const[o,a,c]of nT(t.x,t.y,t.z,e,(l,h,u)=>this.world.getState(l,h,u)))this.world.setState(o,a,c,A.AIR);if(this.conn.send({t:"break",x:t.x,y:t.y,z:t.z,tool:((s=this.inv.held)==null?void 0:s.id)??null}),this.particles.blockBreak(t.x,t.y,t.z,Nn[n*384+(e>>>10)*6]),this.sound.play(`break_${Ze[n].sound}`,{x:t.x+.5,y:t.y+.5,z:t.z+.5}),this.gameMode==="survival"){this.player.addExhaustion(.005);const o=this.inv.held;if(o&&((r=ye(o.id))!=null&&r.tool)&&Ze[n].hardness>0){const a=ye(o.id).tool.type;this.inv.damageHeld(a==="sword"?2:1)&&this.sound.play("tool_break")}}}updateBreaking(t){var a;if(!this.attackHeld){this.overlays.setCrack(null,-1);return}if(this.gameMode==="creative"){this.actionCooldown<=0&&this.creativeBreak();return}if(this.targetEntity&&(!this.target||this.targetEntity.dist<this.target.dist)){this.attackCooldown<=0&&this.attackEntity(this.targetEntity.id),this.overlays.setCrack(null,-1);return}const e=this.target;if(!e){this.breakProgress=0,this.overlays.setCrack(null,-1);return}const n=`${e.x},${e.y},${e.z},${e.state}`;if(n!==this.breakKey&&(this.breakKey=n,this.breakProgress=0,this.breakTick=0),this.actionCooldown>0)return;const s=this.player,r=Py(e.state,((a=this.inv.held)==null?void 0:a.id)??null,s.eyeInWater,s.onGround||s.onLadder||s.flying);if(!Number.isFinite(r))return;if(this.breakProgress+=r<=0?1:t/r,this.breakTick-=t,this.breakTick<=0){this.breakTick=.25,this.swing();const c=Lt(e.state);this.sound.play(`hit_${Ze[c].sound}`,{x:e.x+.5,y:e.y+.5,z:e.z+.5}),this.particles.blockBreak(e.x,e.y,e.z,Nn[c*384+(e.state>>>10)*6],3,!0)}const o=Zh(e.state,(c,l,h)=>this.world.getState(e.x+c,e.y+l,e.z+h));this.overlays.setCrack({x:e.x,y:e.y,z:e.z,boxes:o},Math.floor(this.breakProgress*10)),this.breakProgress>=1&&(this.breakBlock(e),this.breakProgress=0,this.breakKey="",this.actionCooldown=Oi,this.overlays.setCrack(null,-1))}onUseStart(){this.mode!=="play"||!this.player.alive||(this.useHeld=!0,this.useItem(!0))}onUseEnd(){this.useHeld=!1,this.bowDraw>0&&this.releaseBow(),this.eating=0}stopUsing(){this.eating=0,this.bowDraw=0}useItem(t){var h;if(this.actionCooldown>0&&!t)return;const e=this.player,n=this.inv.held,s=n?ye(n.id):void 0,r=this.target;if(this.targetEntity&&(!r||this.targetEntity.dist<r.dist)&&(n==null?void 0:n.id)===j.SHEARS&&this.entities.isMob(this.targetEntity.id)==="sheep"){this.conn.send({t:"interactEntity",id:this.targetEntity.id,item:n.id}),this.swing(),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break"),this.actionCooldown=Oi;return}if(r&&WE(r.state)&&!e.sneaking){if(!t)return;this.swing(),Lt(r.state)===A.CRAFTING_TABLE?(this.setMode("inventory"),this.invUI.open("crafting")):this.conn.send({t:"interact",x:r.x,y:r.y,z:r.z}),this.actionCooldown=Oi;return}if(s!=null&&s.food){(e.food<20||this.gameMode==="creative")&&(this.eating=Math.max(this.eating,1e-4));return}if((n==null?void 0:n.id)===j.BOW){(this.gameMode==="creative"||this.inv.count(j.ARROW)>0)&&(this.bowDraw=Math.max(this.bowDraw,1e-4));return}if((n==null?void 0:n.id)===j.BUCKET){const u=this.eye,f=this.lookDir(),d=tw((m,v,g)=>this.world.getState(m,v,g),u.x,u.y,u.z,f.x,f.y,f.z,Wc);if(d&&!(d.state>>>10)){const m=Lt(d.state)===A.LAVA;this.conn.send({t:"use",x:d.x,y:d.y,z:d.z,action:"fill"}),this.world.setState(d.x,d.y,d.z,A.AIR),this.sound.play("bucket_fill"),this.gameMode==="survival"&&this.inv.replaceHeld(Ve(m?j.LAVA_BUCKET:j.WATER_BUCKET)),this.actionCooldown=Oi}return}if(!r)return;const o={x:r.x+r.nx,y:r.y+r.ny,z:r.z+r.nz};if((n==null?void 0:n.id)===j.WATER_BUCKET||(n==null?void 0:n.id)===j.LAVA_BUCKET){const u=n.id===j.LAVA_BUCKET,f=Ze[Lt(r.state)].replaceable?r:o;this.conn.send({t:"use",x:f.x,y:f.y,z:f.z,action:"empty",fluid:u?"lava":"water"}),this.world.setState(f.x,f.y,f.z,gn(u?A.LAVA:A.WATER)),this.sound.play("bucket_empty"),this.swing(),this.gameMode==="survival"&&this.inv.replaceHeld(Ve(j.BUCKET)),this.actionCooldown=Oi;return}if(((h=s==null?void 0:s.tool)==null?void 0:h.type)==="hoe"){const u=Lt(r.state);(u===A.GRASS||u===A.DIRT)&&r.ny===1&&this.world.getState(r.x,r.y+1,r.z)===A.AIR&&(this.conn.send({t:"use",x:r.x,y:r.y,z:r.z,action:"till"}),this.world.setState(r.x,r.y,r.z,A.FARMLAND),this.sound.play("step_gravel",{x:r.x+.5,y:r.y+1,z:r.z+.5}),this.swing(),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break"),this.actionCooldown=Oi);return}if((n==null?void 0:n.id)===j.BONE_MEAL){const u=Lt(r.state);(u===A.WHEAT||u===A.GRASS||u===A.OAK_SAPLING||u===A.BIRCH_SAPLING||u===A.SPRUCE_SAPLING)&&(this.conn.send({t:"use",x:r.x,y:r.y,z:r.z,action:"bonemeal"}),this.particles.puff(r.x+.5,r.y+1,r.z+.5,8,.8,[.4,1.4,.4],.5),this.swing(),this.gameMode==="survival"&&this.inv.consumeHeld(),this.actionCooldown=Oi);return}if((n==null?void 0:n.id)===j.FLINT_AND_STEEL){Lt(r.state)===A.TNT&&(this.conn.send({t:"use",x:r.x,y:r.y,z:r.z,action:"ignite"}),this.sound.play("flint_and_steel"),this.swing(),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break")),this.actionCooldown=Oi;return}if(!n||!(s!=null&&s.places))return;const a=VE(n.id,r,e.yaw,(u,f,d)=>this.world.getState(u,f,d));if(!a||a.y<1||a.y>=Se)return;const c=Lt(a.state),l=XE(a);if(Hr[c])for(const u of[a,...l]){if(xd(e,u.x,u.y,u.z)||this.entities.blocksCell(u.x,u.y,u.z))return;for(const f of this.avatars.values())if(xd({x:f.target.x,y:f.target.y,z:f.target.z,width:.6,height:1.8},u.x,u.y,u.z))return}this.world.setState(a.x,a.y,a.z,a.state);for(const u of l)this.world.setState(u.x,u.y,u.z,u.state);this.sendMove(performance.now(),!0),this.conn.send({t:"place",x:a.x,y:a.y,z:a.z,state:a.state,item:n.id}),this.sound.play(`place_${Ze[c].sound}`,{x:a.x+.5,y:a.y+.5,z:a.z+.5}),this.swing(),this.gameMode==="survival"&&this.inv.consumeHeld(),this.actionCooldown=Oi}updateUsing(t){const e=this.inv.held,n=e?ye(e.id):void 0;if(this.eating>0)if(!this.useHeld||!(n!=null&&n.food))this.eating=0;else{const s=this.eating;this.eating+=t,Math.floor(s/.24)!==Math.floor(this.eating/.24)&&this.sound.play("eat",{pitch:.9+Math.random()*.3}),this.eating>=1.6&&(this.player.eat(n.food.hunger,n.food.saturation),this.gameMode==="survival"&&this.inv.consumeHeld(),this.sound.play("burp"),this.eating=0)}this.bowDraw>0&&((e==null?void 0:e.id)!==j.BOW?this.bowDraw=0:this.bowDraw+=t),this.useHeld&&this.eating===0&&this.bowDraw===0&&this.actionCooldown<=0&&this.useItem(!1)}releaseBow(){const t=Math.min(1,this.bowDraw);if(this.bowDraw=0,t<.15||this.gameMode==="survival"&&!this.inv.takeOne(j.ARROW))return;const e=this.eye,n=this.lookDir(),s=12+t*48;this.conn.send({t:"shoot",p:[e.x+n.x*.6,e.y+n.y*.6,e.z+n.z*.6],v:[n.x*s,n.y*s,n.z*s]}),this.sound.play("bow_shoot"),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break")}pickBlock(){var s;const t=this.target;if(!t)return;const e=Ze[Lt(t.state)].item;if(e===null||!ye(e))return;for(let r=0;r<9;r++)if(((s=this.inv.slots[r])==null?void 0:s.id)===e)return this.selectSlot(r);if(this.gameMode==="creative"){this.inv.slots[this.inv.selected]=Ve(e,ye(e).maxStack),this.inv.changed();return}const n=this.inv.slots.findIndex((r,o)=>o>=9&&(r==null?void 0:r.id)===e);if(n>=0){const r=this.inv.slots[this.inv.selected];this.inv.slots[this.inv.selected]=this.inv.slots[n],this.inv.slots[n]=r,this.inv.changed()}}dropHeld(t){const e=this.inv.held;if(!e)return;const n=t?e.count:1;this.dropItem({...e,count:n},!1),this.inv.consumeHeld(n),this.swing()}dropItem(t,e){const n=this.eye,s=this.lookDir();this.conn.send({t:"drop",item:t,p:[n.x+s.x*.3,n.y-.3,n.z+s.z*.3],v:[s.x*5,s.y*5+2,s.z*5],returned:e})}showTips(){const t="minecraft:tips-shown";try{if(localStorage.getItem(t))return;localStorage.setItem(t,"1")}catch{return}(this.touch?["Добро пожаловать! Удерживайте палец на стволе дерева, чтобы добыть брёвна.","Кнопка «Инвентарь» — крафт. Слева книга рецептов: нажмите на рецепт, потом заберите результат.","Короткое касание — поставить блок. Сделайте верстак, а на нём — кирку и факелы.","Ночью выходят монстры — постройте укрытие. Друзья заходят по ссылке или QR-коду из главного меню."]:["Добро пожаловать! Зажмите ЛКМ на стволе дерева, чтобы добыть брёвна.","E — инвентарь и крафт. Слева книга рецептов: кликните рецепт, потом заберите результат.","ПКМ — поставить блок. Сделайте верстак, а на нём — кирку и факелы.","Ночью выходят монстры — постройте укрытие. Друзья заходят по ссылке или QR-коду из главного меню, /help — команды."]).forEach((n,s)=>setTimeout(()=>this.ui.addChat(null,void 0,n),1500+s*7e3))}bindPlayer(){const t=this.player;t.onHurt=(e,n)=>{this.sound.play("hurt"),this.ui.isSleeping&&(this.ui.setSleeping(!1),this.conn.send({t:"wake"})),n!=="fall"&&n!=="drown"&&n!=="starve"&&this.inv.damageArmor(e)},t.onDeath=e=>this.onDeath(e),t.onStep=()=>{const e=Lt(this.world.getState(Math.floor(t.x),Math.floor(t.y-.2),Math.floor(t.z)));e!==A.AIR&&this.sound.play(`step_${Ze[e].sound}`,{volume:.5})},t.onLand=e=>this.sound.play(e>5?"fall_big":"fall_small",{volume:Math.min(1,e/6)}),t.onSplash=()=>{this.sound.play("splash"),this.particles.splash(t.x,t.y+.5,t.z,16,Nn[A.WATER*384])}}onDeath(t){this.setMode("dead"),this.invUI.isOpen&&this.invUI.close(),this.openContainerId=null,this.ui.setSleeping(!1);const e=this.gameMode==="survival"?this.inv.takeAll():[],n=ZE[t]??`погибает (${t})`;this.conn.send({t:"died",cause:n,items:e}),this.sound.play("death"),bt("death-cause").textContent=`${this.settings.name} ${n}`}respawn(){this.ui.setSleeping(!1),this.conn.send({t:"respawn"}),this.player.respawn(...this.spawn),this.lastHp=20,this.resume()}wake(){this.player.sleeping&&(this.player.sleeping=!1,this.ui.setSleeping(!1),this.conn.send({t:"wake"}))}trySpawn(){const t=this.player,e=this.chunks.renderDistance;if(this.ui.setLoading(Math.min(1,this.world.chunks.size/Math.max(1,Math.PI*(e+1)*(e+1)))),!this.world.isReady(t.x,t.z))return!1;const n=Math.floor(t.x),s=Math.floor(t.z);let r=Math.floor(t.y);const o=a=>Ke[Lt(this.world.getState(n,a,s))]||Ke[Lt(this.world.getState(n,a+1,s))];if(o(r)){for(;r<Se&&o(r);)r++;t.setPosition(t.x,r,t.z)}return!0}updateTarget(){const t=this.eye,e=this.lookDir(),n=this.gameMode==="creative"?Wc+1.5:Wc,s=(c,l,h)=>this.world.getState(c,l,h),r=this.mode!=="loading"&&this.player.alive;this.target=r?m0(s,t.x,t.y,t.z,e.x,e.y,e.z,n):null,this.targetEntity=r?this.entities.raycast(t,e,Math.min(n,4.5)):null;const o=this.target,a=o&&!(this.targetEntity&&this.targetEntity.dist<o.dist);this.overlays.setTarget(a&&o?{x:o.x,y:o.y,z:o.z,boxes:Zh(o.state,(c,l,h)=>s(o.x+c,o.y+l,o.z+h))}:null)}updateDebug(t){if(this.fpsFrames++,this.fpsTime+=t,this.fpsTime>=.5&&(this.fps=Math.round(this.fpsFrames/this.fpsTime),this.fpsFrames=0,this.fpsTime=0),!this.debug)return this.ui.setDebug(null);const e=this.player,s=["север (-Z)","запад (-X)","юг (+Z)","восток (+X)"][(Math.round(e.yaw/(Math.PI/2))%4+4)%4],r=Math.floor((this.time/1e3+6)%24),o=Math.floor(this.time%1e3/1e3*60),a=this.world.getLight(Math.floor(e.x),Math.floor(e.y),Math.floor(e.z)),c=this.pipeline.renderer.info;this.ui.setDebug([`${C0} · ${this.fps} FPS · ${Ql[this.quality.level]} · разрешение ${Math.round(this.pipeline.scale*100)}%`,`XYZ: ${e.x.toFixed(2)} / ${e.y.toFixed(2)} / ${e.z.toFixed(2)}`,`Чанк: ${rn(Math.floor(e.x)>>4,Math.floor(e.z)>>4)} · загружено ${this.chunks.loadedCount}, в очереди ${this.chunks.pendingCount}`,`Смотрит на ${s}`,`Свет: небо ${a>>4}, блоки ${a&15}`,`Время: ${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}${this.rain?", дождь":""}`,`Режим: ${this.gameMode==="creative"?"творческий":"выживание"}${e.flying?", полёт":""}`,`Сущностей: ${this.entities.count} · игроков: ${this.avatars.size+1}`,`Отрисовка: ${c.render.calls} вызовов, ${Math.round(c.render.triangles/1e3)}k треугольников`,this.target?`Блок: ${Ze[Lt(this.target.state)].key} (${this.target.x} ${this.target.y} ${this.target.z})`:""].filter(Boolean).join(`
`))}}class Zu{constructor(t,e){S(this,"endpoints",new Map);S(this,"nextId",1);S(this,"saveWaiters",[]);S(this,"guests",0);S(this,"onGuestsChange",()=>{});this.worker=t,this.seed=e,t.onmessage=s=>{var o;const r=s.data;if(r.t==="msg")(o=this.endpoints.get(r.id))==null||o.deliver(r.data);else if(r.t==="close"){const a=this.endpoints.get(r.id);this.endpoints.delete(r.id),a==null||a.end()}else r.t==="saved"&&this.saveWaiters.splice(0).forEach(a=>a())};const n=()=>void this.save();window.addEventListener("pagehide",n),document.addEventListener("visibilitychange",()=>document.hidden&&n())}static start(t=!1){const e=new Worker(new URL(""+new URL("server.worker-579PTLhk.js",import.meta.url).href,import.meta.url),{type:"module"});return new Promise((n,s)=>{const r=setTimeout(()=>s(new Error("Мир не запустился")),3e4);e.onmessage=o=>{o.data.t==="ready"?(clearTimeout(r),n(new Zu(e,o.data.seed))):o.data.t==="error"&&(clearTimeout(r),s(new Error(`Не удалось открыть мир: ${o.data.message}`)))},e.onerror=o=>{clearTimeout(r),s(new Error(`Не удалось запустить мир: ${o.message}`))},e.postMessage({t:"start",fresh:t})})}post(t){this.worker.postMessage(t)}connectLocal(){const t=this.nextId++;let e=!0;const n={get isOpen(){return e},send:s=>e&&this.post({t:"msg",id:t,data:s}),close:()=>{e&&(e=!1,this.endpoints.delete(t),this.post({t:"close",id:t}),n.onclose())},onopen:()=>{},onmessage:()=>{},onclose:()=>{}};return this.endpoints.set(t,{deliver:s=>n.onmessage(s),end:()=>{e&&(e=!1,n.onclose())}}),this.post({t:"open",id:t}),n}attach(t){const e=this.nextId++;let n=!0;this.guests++,this.onGuestsChange(this.guests);const s=()=>{n&&(n=!1,this.guests--,this.onGuestsChange(this.guests))};this.endpoints.set(e,{deliver:r=>t.send(r),end:()=>{s(),setTimeout(()=>t.close(),200)}}),t.onmessage=r=>n&&this.post({t:"msg",id:e,data:r}),t.onclose=()=>{n&&(s(),this.endpoints.delete(e),this.post({t:"close",id:e}))},this.post({t:"open",id:e})}save(){return new Promise(t=>{this.saveWaiters.push(t),this.post({t:"save"})})}}const sT="modulepreload",rT=function(i,t){return new URL(i,t).href},E0={},oT=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let o=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const a=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));s=o(e.map(h=>{if(h=rT(h,n),h in E0)return;E0[h]=!0;const u=h.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(!!n)for(let v=a.length-1;v>=0;v--){const g=a[v];if(g.href===h&&(!u||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${f}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":sT,u||(m.as="script"),m.crossOrigin="",m.href=h,l&&m.setAttribute("nonce",l),document.head.appendChild(m),u)return new Promise((v,g)=>{m.addEventListener("load",v),m.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},w0="mincraft:host-id",ja=16e3;function Am(){const i=new URLSearchParams(location.search).get("peer");if(i){const[t,e]=i.split(":");return{host:t,port:Number(e)||9e3,path:"/",secure:!1,debug:0}}return{debug:0}}function aT(){const i=new URLSearchParams(location.search).get("peer");return i?`&peer=${encodeURIComponent(i)}`:""}async function Rm(){return(await oT(()=>import("./bundler-asumSYiq.js"),[],import.meta.url)).Peer}function cT(){let i=1;return(t,e)=>{if(t.length<=ja)return e(`=${t}`);const n=i++,s=Math.ceil(t.length/ja);for(let r=0;r<s;r++)e(`+${n},${r},${s},${t.slice(r*ja,(r+1)*ja)}`)}}function lT(){const i=new Map;return t=>{if(t[0]==="=")return t.slice(1);if(t[0]!=="+")return null;let e=1;const n=()=>{const c=t.indexOf(",",e),l=Number(t.slice(e,c));return e=c+1,l},s=n(),r=n(),o=n();if(!Number.isInteger(s)||!Number.isInteger(o)||o>1e4||r>=o)return null;let a=i.get(s);return a||i.set(s,a=[]),a[r]=t.slice(e),a.filter(c=>c!==void 0).length<o?null:(i.delete(s),a.join(""))}}const T0=3e3,hT=3e4;function Cm(i){const t=cT(),e=lT();let n=!1,s=Date.now(),r=0;const o={get isOpen(){return i.open&&!n},send:l=>{!i.open||n||t(l,h=>void i.send(h))},close:()=>{n||(c(),i.close())},onopen:()=>{},onmessage:()=>{},onclose:()=>{}},a=()=>{s=Date.now();let l=Date.now();r=window.setInterval(()=>{if(n)return;const h=Date.now();if(h-l>T0*3&&(s=h),l=h,h-s>hT)return o.close();i.open&&i.send("~")},T0)};i.open&&a(),i.on("open",()=>{r||a(),o.onopen()}),i.on("data",l=>{if(s=Date.now(),typeof l!="string"||l==="~")return;const h=e(l);h!==null&&o.onmessage(h)});function c(){n||(n=!0,clearInterval(r),o.onclose())}return i.on("close",c),i.on("error",c),o}async function uT(i,t){const e=await Rm();let n="";try{n=localStorage.getItem(w0)??""}catch{}const s=()=>`mincraft-${Math.random().toString(36).slice(2,8)}${Math.random().toString(36).slice(2,8)}`;/^mincraft-[a-z0-9]{6,}$/.test(n)||(n=s());const r=(o,a)=>{t({state:"connecting"});const c=new e(o,Am());c.on("open",l=>{try{localStorage.setItem(w0,l)}catch{}t({state:"ready",id:l})}),c.on("connection",l=>{const h=Cm(l);l.open?i.attach(h):h.onopen=()=>i.attach(h)}),c.on("disconnected",()=>{c.destroyed||setTimeout(()=>!c.destroyed&&c.reconnect(),3e3)}),c.on("error",l=>{const h=l.type;if(h==="unavailable-id"&&a<3){c.destroy(),setTimeout(()=>r(a<2?o:s(),a+1),4e3);return}if(h==="network"||h==="server-error"||h==="socket-error"||h==="socket-closed"){t({state:"error",message:"Сервер приглашений недоступен — играть можно, но друзья пока не смогут зайти"});return}h!=="peer-unavailable"&&t({state:"error",message:`Ошибка соединения: ${h??String(l)}`})}),window.addEventListener("pagehide",()=>c.destroy(),{once:!0})};r(n,0)}async function fT(i){const t=await Rm();return new Promise((e,n)=>{const s=new t(Am());let r=!1;const o=c=>{r||(r=!0,s.destroy(),n(new Error(c)))},a=setTimeout(()=>o("Не удалось связаться с другом: проверьте, что у него открыта игра. Если вы в разных сетях, попробуйте одну Wi-Fi"),25e3);s.on("open",()=>{const c=s.connect(i,{reliable:!0,serialization:"raw"}),l=Cm(c),h=l.onopen;l.onopen=()=>{r||(r=!0,clearTimeout(a),e(l),h())},window.addEventListener("pagehide",()=>s.destroy(),{once:!0})}),s.on("error",c=>{const l=c.type;clearTimeout(a),o(l==="peer-unavailable"?"Мир друга не найден — возможно, он закрыл игру. Попросите прислать ссылку заново":l==="network"||l==="server-error"||l==="socket-error"?"Сервер приглашений недоступен. Проверьте интернет":`Не удалось подключиться: ${l??String(c)}`)})})}function dT(i=`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`){const t=new WebSocket(i),e={get isOpen(){return t.readyState===WebSocket.OPEN},send:n=>t.readyState===WebSocket.OPEN&&t.send(n),close:()=>t.close(),onopen:()=>{},onmessage:()=>{},onclose:()=>{}};return t.addEventListener("open",()=>e.onopen()),t.addEventListener("message",n=>e.onmessage(String(n.data))),t.addEventListener("close",()=>e.onclose()),e}class Ju{constructor(t){S(this,"onClose",()=>{});S(this,"handler",null);S(this,"pending",[]);S(this,"kickReason",null);S(this,"closed",!1);this.link=t,t.onmessage=e=>{let n;try{n=JSON.parse(e)}catch{return}n.t==="kick"&&(this.kickReason=n.reason),this.handler?this.handler(n):this.pending.push(n)},t.onclose=()=>{this.closed||(this.closed=!0,this.onClose(this.kickReason??"Соединение с сервером потеряно",this.kickReason!==null))}}get isOpen(){return!this.closed&&this.link.isOpen}setHandler(t){this.handler=t;const e=this.pending;this.pending=[];for(const n of e)t(n)}static connect(t,e,n=dT(),s=15e3){return new Promise((r,o)=>{const a=new Ju(n),c=setTimeout(()=>{n.close(),o(new Error("Сервер не отвечает"))},s);a.handler=h=>{h.t==="welcome"&&(clearTimeout(c),a.handler=null,a.onClose=()=>{},r({conn:a,welcome:h}))},a.onClose=h=>{clearTimeout(c),o(new Error(a.kickReason?h:"Не удалось подключиться к серверу"))};const l=()=>a.send({t:"hello",name:t,color:e});n.isOpen?l():n.onopen=l})}send(t){this.isOpen&&this.link.send(JSON.stringify(t))}}const zc=IE(),Cs=Yw(),pT=new zE(zc);kE(zc,Y0);const mT=`url(${UE(zc,"dirt",.55)})`;document.querySelectorAll(".dirt").forEach(i=>i.style.backgroundImage=mT);document.title=C0;const Qu=bt("name-input"),$s=bt("menu-status"),gT=bt("join-form"),vT=bt("play");Qu.value=Cs.name;const wc=new URLSearchParams(location.search).get("join"),_T=bt("color-picker"),Lm=()=>_T.replaceChildren(...K0.map(i=>{const t=document.createElement("button");return t.type="button",t.className="swatch"+(i===Cs.color?" selected":""),t.style.background=i,t.ariaLabel=i,t.onclick=()=>{Cs.color=i,Lm()},t}));Lm();function xT(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function Dm(i){const t=Zr(0,"M");t.addData(i),t.make();const e=t.getModuleCount(),n=2,s=document.createElement("canvas");s.width=s.height=e+n*2;const r=s.getContext("2d");r.fillStyle="#fff",r.fillRect(0,0,s.width,s.height),r.fillStyle="#000";for(let o=0;o<e;o++)for(let a=0;a<e;a++)t.isDark(o,a)&&r.fillRect(a+n,o+n,1,1);return s}function Pm(i,t=i.replace(/^https?:\/\//,"")){const e=document.createElement("a");return e.href=i,e.textContent=t,e.target="_blank",e.className="copy",e.onclick=n=>{navigator.clipboard&&(n.preventDefault(),navigator.clipboard.writeText(i).then(()=>{e.dataset.copied="1",setTimeout(()=>delete e.dataset.copied,1500)}))},e}async function MT(){try{const i=await fetch("api/lan",{cache:"no-store"});return i.ok&&(i.headers.get("content-type")??"").includes("json")}catch{return!1}}async function yT(){const i=location.hostname,t=i==="localhost"||i==="127.0.0.1"||i==="[::1]";let e=[];if(t)try{const s=await(await fetch("api/lan")).json(),r=location.port?`:${location.port}`:"";e=(s.addresses??[]).map(o=>`${location.protocol}//${o}${r}`)}catch{}else{e=[location.origin];const n=document.querySelector("#share p");n&&(n.textContent="Отправьте друзьям эту ссылку или покажите QR-код:")}e.length&&(bt("share-links").replaceChildren(...e.slice(0,3).map(n=>Pm(n))),bt("share-qr").replaceChildren(Dm(e[0])),bt("share").hidden=!1)}function bT(){const i=document.querySelector("#share p");i&&(i.textContent=wc?"Вы откроете мир друга. Чтобы играть в своём мире, нажмите «Играть в своём мире».":"Мир хранится в этом браузере. Чтобы позвать друзей, в игре откройте паузу → «Пригласить друзей» и отправьте ссылку или покажите QR-код."),bt("share").hidden=!1}function ST(i){const t=bt("invite-btn"),e=bt("invite"),n=bt("invite-status");t.hidden=!1,t.onclick=()=>e.hidden=!e.hidden;let s="";const r=()=>{s&&(n.textContent=i.guests?`Друзей в игре: ${i.guests}`:"Ждём друзей — отправьте им ссылку:")};i.onGuestsChange=r,uT(i,o=>{o.state==="connecting"?n.textContent="Подключаемся к серверу приглашений…":o.state==="error"?n.textContent=o.message:(s=`${location.origin}${location.pathname}?join=${encodeURIComponent(o.id)}${aT()}`,bt("invite-link").replaceChildren(Pm(s,"Ссылка-приглашение (нажмите, чтобы скопировать)")),bt("invite-qr").replaceChildren(Dm(s)),r())}).catch(o=>{console.error(o),n.textContent="Не удалось загрузить модуль приглашений"})}let lu=!1,th=!1;function ET(){const i=Qu.value.trim().replace(/\s+/g," ");return!i||i.length>Zm||!/^[\p{L}\p{N}_\- ]+$/u.test(i)?($s.textContent="Ник: буквы, цифры, пробел, _ или -",null):xT()?(Cs.name=i,To(Cs),i):($s.textContent="Браузер не поддерживает WebGL 2 — игра не запустится",null)}const A0=i=>document.querySelectorAll("#join-form button").forEach(t=>t.disabled=i);async function Gc(i){if(th)return;const t=ET();if(t){th=!0,A0(!0);try{let e,n=null;i.kind==="local"?($s.textContent=i.fresh?"Создаём новый мир…":"Открываем мир…",n=await Zu.start(i.fresh),e=n.connectLocal()):i.kind==="peer"?($s.textContent="Подключаемся к другу…",e=await fT(i.id)):$s.textContent="Подключение…";const{conn:s,welcome:r}=await Ju.connect(t,Cs.color,e);$s.textContent="";const o=new iT(s,r,Cs,pT,zc);n&&ST(n),new URLSearchParams(location.search).has("debug")&&Object.assign(window,{game:o,host:n})}catch(e){console.error(e),$s.textContent=e.message,th=!1,A0(!1)}}}const Im=()=>lu?{kind:"server"}:wc?{kind:"peer",id:wc}:{kind:"local",fresh:!1};gT.onsubmit=i=>{i.preventDefault(),Gc(Im())};bt("own-world").onclick=()=>void Gc({kind:"local",fresh:!1});bt("new-world").onclick=()=>{confirm("Начать новый мир? Текущий мир в этом браузере будет удалён.")&&Gc({kind:"local",fresh:!0})};async function wT(){lu=await MT(),lu?yT():(bt("world-actions").hidden=!1,wc&&(bt("invite-banner").hidden=!1,vT.textContent="Присоединиться к другу",bt("own-world").hidden=!1,bt("new-world").hidden=!0),bT());let i=!1;try{i=sessionStorage.getItem(cu)==="1",sessionStorage.removeItem(cu)}catch{}i&&Cs.name?Gc(Im()):matchMedia("(pointer: coarse)").matches||Qu.focus()}wT();
