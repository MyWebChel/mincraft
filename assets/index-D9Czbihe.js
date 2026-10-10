var gm=Object.defineProperty;var _m=(i,t,e)=>t in i?gm(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var C=(i,t,e)=>_m(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Hr=function(i,t){let s=i;const r=fo[t];let o=null,a=0,c=null;const l=[],h={},u=function(b,L){a=s*4+17,o=(function(x){const y=new Array(x);for(let R=0;R<x;R+=1){y[R]=new Array(x);for(let P=0;P<x;P+=1)y[R][P]=null}return y})(a),f(0,0),f(a-7,0),f(0,a-7),_(),m(),p(b,L),s>=7&&g(b),c==null&&(c=v(s,r,l)),M(c,L)},f=function(b,L){for(let x=-1;x<=7;x+=1)if(!(b+x<=-1||a<=b+x))for(let y=-1;y<=7;y+=1)L+y<=-1||a<=L+y||(0<=x&&x<=6&&(y==0||y==6)||0<=y&&y<=6&&(x==0||x==6)||2<=x&&x<=4&&2<=y&&y<=4?o[b+x][L+y]=!0:o[b+x][L+y]=!1)},d=function(){let b=0,L=0;for(let x=0;x<8;x+=1){u(!0,x);const y=Ki.getLostPoint(h);(x==0||b>y)&&(b=y,L=x)}return L},m=function(){for(let b=8;b<a-8;b+=1)o[b][6]==null&&(o[b][6]=b%2==0);for(let b=8;b<a-8;b+=1)o[6][b]==null&&(o[6][b]=b%2==0)},_=function(){const b=Ki.getPatternPosition(s);for(let L=0;L<b.length;L+=1)for(let x=0;x<b.length;x+=1){const y=b[L],R=b[x];if(o[y][R]==null)for(let P=-2;P<=2;P+=1)for(let U=-2;U<=2;U+=1)P==-2||P==2||U==-2||U==2||P==0&&U==0?o[y+P][R+U]=!0:o[y+P][R+U]=!1}},g=function(b){const L=Ki.getBCHTypeNumber(s);for(let x=0;x<18;x+=1){const y=!b&&(L>>x&1)==1;o[Math.floor(x/3)][x%3+a-8-3]=y}for(let x=0;x<18;x+=1){const y=!b&&(L>>x&1)==1;o[x%3+a-8-3][Math.floor(x/3)]=y}},p=function(b,L){const x=r<<3|L,y=Ki.getBCHTypeInfo(x);for(let R=0;R<15;R+=1){const P=!b&&(y>>R&1)==1;R<6?o[R][8]=P:R<8?o[R+1][8]=P:o[a-15+R][8]=P}for(let R=0;R<15;R+=1){const P=!b&&(y>>R&1)==1;R<8?o[8][a-R-1]=P:R<9?o[8][15-R-1+1]=P:o[8][15-R-1]=P}o[a-8][8]=!b},M=function(b,L){let x=-1,y=a-1,R=7,P=0;const U=Ki.getMaskFunction(L);for(let z=a-1;z>0;z-=2)for(z==6&&(z-=1);;){for(let W=0;W<2;W+=1)if(o[y][z-W]==null){let X=!1;P<b.length&&(X=(b[P]>>>R&1)==1),U(y,z-W)&&(X=!X),o[y][z-W]=X,R-=1,R==-1&&(P+=1,R=7)}if(y+=x,y<0||a<=y){y-=x,x=-x;break}}},S=function(b,L){let x=0,y=0,R=0;const P=new Array(L.length),U=new Array(L.length);for(let K=0;K<L.length;K+=1){const G=L[K].dataCount,et=L[K].totalCount-G;y=Math.max(y,G),R=Math.max(R,et),P[K]=new Array(G);for(let Yt=0;Yt<P[K].length;Yt+=1)P[K][Yt]=255&b.getBuffer()[Yt+x];x+=G;const lt=Ki.getErrorCorrectPolynomial(et),Ft=Mo(P[K],lt.getLength()-1).mod(lt);U[K]=new Array(lt.getLength()-1);for(let Yt=0;Yt<U[K].length;Yt+=1){const se=Yt+Ft.getLength()-U[K].length;U[K][Yt]=se>=0?Ft.getAt(se):0}}let z=0;for(let K=0;K<L.length;K+=1)z+=L[K].totalCount;const W=new Array(z);let X=0;for(let K=0;K<y;K+=1)for(let G=0;G<L.length;G+=1)K<P[G].length&&(W[X]=P[G][K],X+=1);for(let K=0;K<R;K+=1)for(let G=0;G<L.length;G+=1)K<U[G].length&&(W[X]=U[G][K],X+=1);return W},v=function(b,L,x){const y=Bu.getRSBlocks(b,L),R=zu();for(let U=0;U<x.length;U+=1){const z=x[U];R.put(z.getMode(),4),R.put(z.getLength(),Ki.getLengthInBits(z.getMode(),b)),z.write(R)}let P=0;for(let U=0;U<y.length;U+=1)P+=y[U].dataCount;if(R.getLengthInBits()>P*8)throw"code length overflow. ("+R.getLengthInBits()+">"+P*8+")";for(R.getLengthInBits()+4<=P*8&&R.put(0,4);R.getLengthInBits()%8!=0;)R.putBit(!1);for(;!(R.getLengthInBits()>=P*8||(R.put(236,8),R.getLengthInBits()>=P*8));)R.put(17,8);return S(R,y)};h.addData=function(b,L){L=L||"Byte";let x=null;switch(L){case"Numeric":x=vm(b);break;case"Alphanumeric":x=xm(b);break;case"Byte":x=Mm(b);break;case"Kanji":x=ym(b);break;default:throw"mode:"+L}l.push(x),c=null},h.isDark=function(b,L){if(b<0||a<=b||L<0||a<=L)throw b+","+L;return o[b][L]},h.getModuleCount=function(){return a},h.make=function(){if(s<1){let b=1;for(;b<40;b++){const L=Bu.getRSBlocks(b,r),x=zu();for(let R=0;R<l.length;R++){const P=l[R];x.put(P.getMode(),4),x.put(P.getLength(),Ki.getLengthInBits(P.getMode(),b)),P.write(x)}let y=0;for(let R=0;R<L.length;R++)y+=L[R].dataCount;if(x.getLengthInBits()<=y*8)break}s=b}u(!1,d())},h.createTableTag=function(b,L){b=b||2,L=typeof L>"u"?b*4:L;let x="";x+='<table style="',x+=" border-width: 0px; border-style: none;",x+=" border-collapse: collapse;",x+=" padding: 0px; margin: "+L+"px;",x+='">',x+="<tbody>";for(let y=0;y<h.getModuleCount();y+=1){x+="<tr>";for(let R=0;R<h.getModuleCount();R+=1)x+='<td style="',x+=" border-width: 0px; border-style: none;",x+=" border-collapse: collapse;",x+=" padding: 0px; margin: 0px;",x+=" width: "+b+"px;",x+=" height: "+b+"px;",x+=" background-color: ",x+=h.isDark(y,R)?"#000000":"#ffffff",x+=";",x+='"/>';x+="</tr>"}return x+="</tbody>",x+="</table>",x},h.createSvgTag=function(b,L,x,y){let R={};typeof arguments[0]=="object"&&(R=arguments[0],b=R.cellSize,L=R.margin,x=R.alt,y=R.title),b=b||2,L=typeof L>"u"?b*4:L,x=typeof x=="string"?{text:x}:x||{},x.text=x.text||null,x.id=x.text?x.id||"qrcode-description":null,y=typeof y=="string"?{text:y}:y||{},y.text=y.text||null,y.id=y.text?y.id||"qrcode-title":null;const P=h.getModuleCount()*b+L*2;let U,z,W,X,K="",G;for(G="l"+b+",0 0,"+b+" -"+b+",0 0,-"+b+"z ",K+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',K+=R.scalable?"":' width="'+P+'px" height="'+P+'px"',K+=' viewBox="0 0 '+P+" "+P+'" ',K+=' preserveAspectRatio="xMinYMin meet"',K+=y.text||x.text?' role="img" aria-labelledby="'+E([y.id,x.id].join(" ").trim())+'"':"",K+=">",K+=y.text?'<title id="'+E(y.id)+'">'+E(y.text)+"</title>":"",K+=x.text?'<description id="'+E(x.id)+'">'+E(x.text)+"</description>":"",K+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',K+='<path d="',W=0;W<h.getModuleCount();W+=1)for(X=W*b+L,U=0;U<h.getModuleCount();U+=1)h.isDark(W,U)&&(z=U*b+L,K+="M"+z+","+X+G);return K+='" stroke="transparent" fill="black"/>',K+="</svg>",K},h.createDataURL=function(b,L){b=b||2,L=typeof L>"u"?b*4:L;const x=h.getModuleCount()*b+L*2,y=L,R=x-L;return wm(x,x,function(P,U){if(y<=P&&P<R&&y<=U&&U<R){const z=Math.floor((P-y)/b),W=Math.floor((U-y)/b);return h.isDark(W,z)?0:1}else return 1})},h.createImgTag=function(b,L,x){b=b||2,L=typeof L>"u"?b*4:L;const y=h.getModuleCount()*b+L*2;let R="";return R+="<img",R+=' src="',R+=h.createDataURL(b,L),R+='"',R+=' width="',R+=y,R+='"',R+=' height="',R+=y,R+='"',x&&(R+=' alt="',R+=E(x),R+='"'),R+="/>",R};const E=function(b){let L="";for(let x=0;x<b.length;x+=1){const y=b.charAt(x);switch(y){case"<":L+="&lt;";break;case">":L+="&gt;";break;case"&":L+="&amp;";break;case'"':L+="&quot;";break;default:L+=y;break}}return L},w=function(b){b=typeof b>"u"?2:b;const x=h.getModuleCount()*1+b*2,y=b,R=x-b;let P,U,z,W,X;const K={"██":"█","█ ":"▀"," █":"▄","  ":" "},G={"██":"▀","█ ":"▀"," █":" ","  ":" "};let et="";for(P=0;P<x;P+=2){for(z=Math.floor((P-y)/1),W=Math.floor((P+1-y)/1),U=0;U<x;U+=1)X="█",y<=U&&U<R&&y<=P&&P<R&&h.isDark(z,Math.floor((U-y)/1))&&(X=" "),y<=U&&U<R&&y<=P+1&&P+1<R&&h.isDark(W,Math.floor((U-y)/1))?X+=" ":X+="█",et+=b<1&&P+1>=R?G[X]:K[X];et+=`
`}return x%2&&b>0?et.substring(0,et.length-x-1)+Array(x+1).join("▀"):et.substring(0,et.length-1)};return h.createASCII=function(b,L){if(b=b||1,b<2)return w(L);b-=1,L=typeof L>"u"?b*2:L;const x=h.getModuleCount()*b+L*2,y=L,R=x-L;let P,U,z,W;const X=Array(b+1).join("██"),K=Array(b+1).join("  ");let G="",et="";for(P=0;P<x;P+=1){for(z=Math.floor((P-y)/b),et="",U=0;U<x;U+=1)W=1,y<=U&&U<R&&y<=P&&P<R&&h.isDark(z,Math.floor((U-y)/b))&&(W=0),et+=W?X:K;for(z=0;z<b;z+=1)G+=et+`
`}return G.substring(0,G.length-1)},h.renderTo2dContext=function(b,L){L=L||2;const x=h.getModuleCount();for(let y=0;y<x;y++)for(let R=0;R<x;R++)b.fillStyle=h.isDark(y,R)?"black":"white",b.fillRect(R*L,y*L,L,L)},h};Hr.stringToBytes=function(i){const t=[];for(let e=0;e<i.length;e+=1){const n=i.charCodeAt(e);t.push(n&255)}return t};Hr.createStringToBytes=function(i,t){const e=(function(){const s=Sm(i),r=function(){const c=s.read();if(c==-1)throw"eof";return c};let o=0;const a={};for(;;){const c=s.read();if(c==-1)break;const l=r(),h=r(),u=r(),f=String.fromCharCode(c<<8|l),d=h<<8|u;a[f]=d,o+=1}if(o!=t)throw o+" != "+t;return a})(),n=63;return function(s){const r=[];for(let o=0;o<s.length;o+=1){const a=s.charCodeAt(o);if(a<128)r.push(a);else{const c=e[s.charAt(o)];typeof c=="number"?(c&255)==c?r.push(c):(r.push(c>>>8),r.push(c&255)):r.push(n)}}return r}};const _n={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},fo={L:1,M:0,Q:3,H:2},Yi={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},Ki=(function(){const i=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],t=1335,e=7973,n=21522,s={},r=function(o){let a=0;for(;o!=0;)a+=1,o>>>=1;return a};return s.getBCHTypeInfo=function(o){let a=o<<10;for(;r(a)-r(t)>=0;)a^=t<<r(a)-r(t);return(o<<10|a)^n},s.getBCHTypeNumber=function(o){let a=o<<12;for(;r(a)-r(e)>=0;)a^=e<<r(a)-r(e);return o<<12|a},s.getPatternPosition=function(o){return i[o-1]},s.getMaskFunction=function(o){switch(o){case Yi.PATTERN000:return function(a,c){return(a+c)%2==0};case Yi.PATTERN001:return function(a,c){return a%2==0};case Yi.PATTERN010:return function(a,c){return c%3==0};case Yi.PATTERN011:return function(a,c){return(a+c)%3==0};case Yi.PATTERN100:return function(a,c){return(Math.floor(a/2)+Math.floor(c/3))%2==0};case Yi.PATTERN101:return function(a,c){return a*c%2+a*c%3==0};case Yi.PATTERN110:return function(a,c){return(a*c%2+a*c%3)%2==0};case Yi.PATTERN111:return function(a,c){return(a*c%3+(a+c)%2)%2==0};default:throw"bad maskPattern:"+o}},s.getErrorCorrectPolynomial=function(o){let a=Mo([1],0);for(let c=0;c<o;c+=1)a=a.multiply(Mo([1,rs.gexp(c)],0));return a},s.getLengthInBits=function(o,a){if(1<=a&&a<10)switch(o){case _n.MODE_NUMBER:return 10;case _n.MODE_ALPHA_NUM:return 9;case _n.MODE_8BIT_BYTE:return 8;case _n.MODE_KANJI:return 8;default:throw"mode:"+o}else if(a<27)switch(o){case _n.MODE_NUMBER:return 12;case _n.MODE_ALPHA_NUM:return 11;case _n.MODE_8BIT_BYTE:return 16;case _n.MODE_KANJI:return 10;default:throw"mode:"+o}else if(a<41)switch(o){case _n.MODE_NUMBER:return 14;case _n.MODE_ALPHA_NUM:return 13;case _n.MODE_8BIT_BYTE:return 16;case _n.MODE_KANJI:return 12;default:throw"mode:"+o}else throw"type:"+a},s.getLostPoint=function(o){const a=o.getModuleCount();let c=0;for(let u=0;u<a;u+=1)for(let f=0;f<a;f+=1){let d=0;const m=o.isDark(u,f);for(let _=-1;_<=1;_+=1)if(!(u+_<0||a<=u+_))for(let g=-1;g<=1;g+=1)f+g<0||a<=f+g||_==0&&g==0||m==o.isDark(u+_,f+g)&&(d+=1);d>5&&(c+=3+d-5)}for(let u=0;u<a-1;u+=1)for(let f=0;f<a-1;f+=1){let d=0;o.isDark(u,f)&&(d+=1),o.isDark(u+1,f)&&(d+=1),o.isDark(u,f+1)&&(d+=1),o.isDark(u+1,f+1)&&(d+=1),(d==0||d==4)&&(c+=3)}for(let u=0;u<a;u+=1)for(let f=0;f<a-6;f+=1)o.isDark(u,f)&&!o.isDark(u,f+1)&&o.isDark(u,f+2)&&o.isDark(u,f+3)&&o.isDark(u,f+4)&&!o.isDark(u,f+5)&&o.isDark(u,f+6)&&(c+=40);for(let u=0;u<a;u+=1)for(let f=0;f<a-6;f+=1)o.isDark(f,u)&&!o.isDark(f+1,u)&&o.isDark(f+2,u)&&o.isDark(f+3,u)&&o.isDark(f+4,u)&&!o.isDark(f+5,u)&&o.isDark(f+6,u)&&(c+=40);let l=0;for(let u=0;u<a;u+=1)for(let f=0;f<a;f+=1)o.isDark(f,u)&&(l+=1);const h=Math.abs(100*l/a/a-50)/5;return c+=h*10,c},s})(),rs=(function(){const i=new Array(256),t=new Array(256);for(let n=0;n<8;n+=1)i[n]=1<<n;for(let n=8;n<256;n+=1)i[n]=i[n-4]^i[n-5]^i[n-6]^i[n-8];for(let n=0;n<255;n+=1)t[i[n]]=n;const e={};return e.glog=function(n){if(n<1)throw"glog("+n+")";return t[n]},e.gexp=function(n){for(;n<0;)n+=255;for(;n>=256;)n-=255;return i[n]},e})(),Mo=function(i,t){if(typeof i.length>"u")throw i.length+"/"+t;const e=(function(){let s=0;for(;s<i.length&&i[s]==0;)s+=1;const r=new Array(i.length-s+t);for(let o=0;o<i.length-s;o+=1)r[o]=i[o+s];return r})(),n={};return n.getAt=function(s){return e[s]},n.getLength=function(){return e.length},n.multiply=function(s){const r=new Array(n.getLength()+s.getLength()-1);for(let o=0;o<n.getLength();o+=1)for(let a=0;a<s.getLength();a+=1)r[o+a]^=rs.gexp(rs.glog(n.getAt(o))+rs.glog(s.getAt(a)));return Mo(r,0)},n.mod=function(s){if(n.getLength()-s.getLength()<0)return n;const r=rs.glog(n.getAt(0))-rs.glog(s.getAt(0)),o=new Array(n.getLength());for(let a=0;a<n.getLength();a+=1)o[a]=n.getAt(a);for(let a=0;a<s.getLength();a+=1)o[a]^=rs.gexp(rs.glog(s.getAt(a))+r);return Mo(o,0).mod(s)},n},Bu=(function(){const i=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(s,r){const o={};return o.totalCount=s,o.dataCount=r,o},e={},n=function(s,r){switch(r){case fo.L:return i[(s-1)*4+0];case fo.M:return i[(s-1)*4+1];case fo.Q:return i[(s-1)*4+2];case fo.H:return i[(s-1)*4+3];default:return}};return e.getRSBlocks=function(s,r){const o=n(s,r);if(typeof o>"u")throw"bad rs block @ typeNumber:"+s+"/errorCorrectionLevel:"+r;const a=o.length/3,c=[];for(let l=0;l<a;l+=1){const h=o[l*3+0],u=o[l*3+1],f=o[l*3+2];for(let d=0;d<h;d+=1)c.push(t(u,f))}return c},e})(),zu=function(){const i=[];let t=0;const e={};return e.getBuffer=function(){return i},e.getAt=function(n){const s=Math.floor(n/8);return(i[s]>>>7-n%8&1)==1},e.put=function(n,s){for(let r=0;r<s;r+=1)e.putBit((n>>>s-r-1&1)==1)},e.getLengthInBits=function(){return t},e.putBit=function(n){const s=Math.floor(t/8);i.length<=s&&i.push(0),n&&(i[s]|=128>>>t%8),t+=1},e},vm=function(i){const t=_n.MODE_NUMBER,e=i,n={};n.getMode=function(){return t},n.getLength=function(o){return e.length},n.write=function(o){const a=e;let c=0;for(;c+2<a.length;)o.put(s(a.substring(c,c+3)),10),c+=3;c<a.length&&(a.length-c==1?o.put(s(a.substring(c,c+1)),4):a.length-c==2&&o.put(s(a.substring(c,c+2)),7))};const s=function(o){let a=0;for(let c=0;c<o.length;c+=1)a=a*10+r(o.charAt(c));return a},r=function(o){if("0"<=o&&o<="9")return o.charCodeAt(0)-48;throw"illegal char :"+o};return n},xm=function(i){const t=_n.MODE_ALPHA_NUM,e=i,n={};n.getMode=function(){return t},n.getLength=function(r){return e.length},n.write=function(r){const o=e;let a=0;for(;a+1<o.length;)r.put(s(o.charAt(a))*45+s(o.charAt(a+1)),11),a+=2;a<o.length&&r.put(s(o.charAt(a)),6)};const s=function(r){if("0"<=r&&r<="9")return r.charCodeAt(0)-48;if("A"<=r&&r<="Z")return r.charCodeAt(0)-65+10;switch(r){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+r}};return n},Mm=function(i){const t=_n.MODE_8BIT_BYTE,e=Hr.stringToBytes(i),n={};return n.getMode=function(){return t},n.getLength=function(s){return e.length},n.write=function(s){for(let r=0;r<e.length;r+=1)s.put(e[r],8)},n},ym=function(i){const t=_n.MODE_KANJI,e=Hr.stringToBytes;(function(r,o){const a=e(r);if(a.length!=2||(a[0]<<8|a[1])!=o)throw"sjis not supported."})("友",38726);const n=e(i),s={};return s.getMode=function(){return t},s.getLength=function(r){return~~(n.length/2)},s.write=function(r){const o=n;let a=0;for(;a+1<o.length;){let c=(255&o[a])<<8|255&o[a+1];if(33088<=c&&c<=40956)c-=33088;else if(57408<=c&&c<=60351)c-=49472;else throw"illegal char at "+(a+1)+"/"+c;c=(c>>>8&255)*192+(c&255),r.put(c,13),a+=2}if(a<o.length)throw"illegal char at "+(a+1)},s},sp=function(){const i=[],t={};return t.writeByte=function(e){i.push(e&255)},t.writeShort=function(e){t.writeByte(e),t.writeByte(e>>>8)},t.writeBytes=function(e,n,s){n=n||0,s=s||e.length;for(let r=0;r<s;r+=1)t.writeByte(e[r+n])},t.writeString=function(e){for(let n=0;n<e.length;n+=1)t.writeByte(e.charCodeAt(n))},t.toByteArray=function(){return i},t.toString=function(){let e="";e+="[";for(let n=0;n<i.length;n+=1)n>0&&(e+=","),e+=i[n];return e+="]",e},t},bm=function(){let i=0,t=0,e=0,n="";const s={},r=function(a){n+=String.fromCharCode(o(a&63))},o=function(a){if(a<0)throw"n:"+a;if(a<26)return 65+a;if(a<52)return 97+(a-26);if(a<62)return 48+(a-52);if(a==62)return 43;if(a==63)return 47;throw"n:"+a};return s.writeByte=function(a){for(i=i<<8|a&255,t+=8,e+=1;t>=6;)r(i>>>t-6),t-=6},s.flush=function(){if(t>0&&(r(i<<6-t),i=0,t=0),e%3!=0){const a=3-e%3;for(let c=0;c<a;c+=1)n+="="}},s.toString=function(){return n},s},Sm=function(i){const t=i;let e=0,n=0,s=0;const r={};r.read=function(){for(;s<8;){if(e>=t.length){if(s==0)return-1;throw"unexpected end of file./"+s}const c=t.charAt(e);if(e+=1,c=="=")return s=0,-1;if(c.match(/^\s$/))continue;n=n<<6|o(c.charCodeAt(0)),s+=6}const a=n>>>s-8&255;return s-=8,a};const o=function(a){if(65<=a&&a<=90)return a-65;if(97<=a&&a<=122)return a-97+26;if(48<=a&&a<=57)return a-48+52;if(a==43)return 62;if(a==47)return 63;throw"c:"+a};return r},Em=function(i,t){const e=i,n=t,s=new Array(i*t),r={};r.setPixel=function(l,h,u){s[h*e+l]=u},r.write=function(l){l.writeString("GIF87a"),l.writeShort(e),l.writeShort(n),l.writeByte(128),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(255),l.writeByte(255),l.writeByte(255),l.writeString(","),l.writeShort(0),l.writeShort(0),l.writeShort(e),l.writeShort(n),l.writeByte(0);const h=2,u=a(h);l.writeByte(h);let f=0;for(;u.length-f>255;)l.writeByte(255),l.writeBytes(u,f,255),f+=255;l.writeByte(u.length-f),l.writeBytes(u,f,u.length-f),l.writeByte(0),l.writeString(";")};const o=function(l){const h=l;let u=0,f=0;const d={};return d.write=function(m,_){if(m>>>_)throw"length over";for(;u+_>=8;)h.writeByte(255&(m<<u|f)),_-=8-u,m>>>=8-u,f=0,u=0;f=m<<u|f,u=u+_},d.flush=function(){u>0&&h.writeByte(f)},d},a=function(l){const h=1<<l,u=(1<<l)+1;let f=l+1;const d=c();for(let M=0;M<h;M+=1)d.add(String.fromCharCode(M));d.add(String.fromCharCode(h)),d.add(String.fromCharCode(u));const m=sp(),_=o(m);_.write(h,f);let g=0,p=String.fromCharCode(s[g]);for(g+=1;g<s.length;){const M=String.fromCharCode(s[g]);g+=1,d.contains(p+M)?p=p+M:(_.write(d.indexOf(p),f),d.size()<4095&&(d.size()==1<<f&&(f+=1),d.add(p+M)),p=M)}return _.write(d.indexOf(p),f),_.write(u,f),_.flush(),m.toByteArray()},c=function(){const l={};let h=0;const u={};return u.add=function(f){if(u.contains(f))throw"dup key:"+f;l[f]=h,h+=1},u.size=function(){return h},u.indexOf=function(f){return l[f]},u.contains=function(f){return typeof l[f]<"u"},u};return r},wm=function(i,t,e){const n=Em(i,t);for(let a=0;a<t;a+=1)for(let c=0;c<i;c+=1)n.setPixel(c,a,e(c,a));const s=sp();n.write(s);const r=bm(),o=s.toByteArray();for(let a=0;a<o.length;a+=1)r.writeByte(o[a]);return r.flush(),"data:image/gif;base64,"+r};Hr.stringToBytes;const rp="Mincraft",ee=16,Pe=128,Tm=ee*ee*Pe,Tn=46,op=24e3,Tc=6,Am=16;function Hn(i,t,e){return(t*ee+e)*ee+i}function Qe(i,t){return`${i},${t}`}const Wh=10,Ge=(1<<Wh)-1,Xt=i=>i&Ge,Ms=i=>i>>>Wh,ti=(i,t=0)=>(i|t<<Wh)&65535,Po=[[0,0,-1],[1,0,0],[0,0,1],[-1,0,0]],Ul=[5,0,4,1],yr=i=>i+2&3,A={AIR:0,STONE:1,GRASS:2,DIRT:3,COBBLESTONE:4,OAK_PLANKS:5,BIRCH_PLANKS:6,SPRUCE_PLANKS:7,OAK_LOG:8,BIRCH_LOG:9,SPRUCE_LOG:10,OAK_LEAVES:11,BIRCH_LEAVES:12,SPRUCE_LEAVES:13,SAND:14,GRAVEL:15,SANDSTONE:16,GLASS:17,BEDROCK:18,WATER:19,LAVA:20,COAL_ORE:21,IRON_ORE:22,GOLD_ORE:23,DIAMOND_ORE:24,SNOW_BLOCK:25,SNOWY_GRASS:26,ICE:27,CACTUS:28,TALL_GRASS:29,DANDELION:30,POPPY:31,DEAD_BUSH:32,BRICKS:33,STONE_BRICKS:34,MOSSY_COBBLESTONE:35,OBSIDIAN:36,BOOKSHELF:37,GLOWSTONE:38,WHITE_WOOL:39,RED_WOOL:40,PINK_WOOL:41,YELLOW_WOOL:42,GREEN_WOOL:43,BLUE_WOOL:44,PURPLE_WOOL:45,BLACK_WOOL:46,CRAFTING_TABLE:47,FURNACE:48,LIT_FURNACE:49,CHEST:50,TORCH:51,LADDER:52,OAK_DOOR:53,OAK_FENCE:54,OAK_SLAB:55,COBBLESTONE_SLAB:56,STONE_SLAB:57,OAK_STAIRS:58,COBBLESTONE_STAIRS:59,STONE_BRICK_STAIRS:60,BED:61,FARMLAND:62,WHEAT:63,OAK_SAPLING:64,BIRCH_SAPLING:65,SPRUCE_SAPLING:66,TNT:67,IRON_BLOCK:68,GOLD_BLOCK:69,DIAMOND_BLOCK:70,GLASS_PANE:71,OAK_TRAPDOOR:72,OAK_FENCE_GATE:73,PUMPKIN:74,JACK_O_LANTERN:75,SUGAR_CANE:76},ap=286,cp=287,lp=273,It=i=>()=>i,bs=(i,t,e=t)=>(n,s)=>s===2?t:s===3?e:i,Xh=(i,t)=>(e,n)=>{const s=e&3;return(s===1?n<=1:s===2?n>=4:n===2||n===3)?t:i},Io=(i,t,e,n=e)=>(s,r)=>r===2?e:r===3?n:r===Ul[s&3]?i:t,Rm={shape:"cube",layer:"opaque",solid:!0,fullCube:!0,opacity:15,light:0,hardness:1,tool:null,harvestLevel:-1,sound:"stone",replaceable:!1,gravity:!1,climbable:!1,wave:0,cullSame:!1},No=[];function ft(i,t,e,n,s={}){const r={...Rm,key:t,name:e,tiles:n,item:i,...s};(r.shape!=="cube"||r.layer!=="opaque")&&s.fullCube===void 0&&(r.fullCube=!1),!r.fullCube&&s.opacity===void 0&&(r.opacity=0),No[i]=r}const Vi=(i={})=>({shape:"cross",layer:"cutout",solid:!1,hardness:0,sound:"grass",wave:2,...i}),Yh={layer:"cutout",opacity:1,hardness:.2,tool:"shears",sound:"grass",wave:1},Ln={hardness:2,tool:"axe",sound:"wood"},Ye=(i,t=0)=>({hardness:i,tool:"pickaxe",harvestLevel:t,sound:"stone"}),Ss={hardness:.8,tool:"shears",sound:"wool"};ft(A.AIR,"air","Воздух",It(""),{shape:"none",solid:!1,fullCube:!1,hardness:0,replaceable:!0,item:null});ft(A.STONE,"stone","Камень",It("stone"),Ye(1.5));ft(A.GRASS,"grass","Дёрн",bs("grass_side","grass_top","dirt"),{hardness:.6,tool:"shovel",sound:"grass"});ft(A.DIRT,"dirt","Земля",It("dirt"),{hardness:.5,tool:"shovel",sound:"gravel"});ft(A.COBBLESTONE,"cobblestone","Булыжник",It("cobblestone"),Ye(2));ft(A.OAK_PLANKS,"oak_planks","Дубовые доски",It("oak_planks"),Ln);ft(A.BIRCH_PLANKS,"birch_planks","Берёзовые доски",It("birch_planks"),Ln);ft(A.SPRUCE_PLANKS,"spruce_planks","Еловые доски",It("spruce_planks"),Ln);ft(A.OAK_LOG,"oak_log","Дубовое бревно",Xh("oak_log","oak_log_top"),Ln);ft(A.BIRCH_LOG,"birch_log","Берёзовое бревно",Xh("birch_log","birch_log_top"),Ln);ft(A.SPRUCE_LOG,"spruce_log","Еловое бревно",Xh("spruce_log","spruce_log_top"),Ln);ft(A.OAK_LEAVES,"oak_leaves","Дубовая листва",It("oak_leaves"),Yh);ft(A.BIRCH_LEAVES,"birch_leaves","Берёзовая листва",It("birch_leaves"),Yh);ft(A.SPRUCE_LEAVES,"spruce_leaves","Еловая хвоя",It("spruce_leaves"),Yh);ft(A.SAND,"sand","Песок",It("sand"),{hardness:.5,tool:"shovel",sound:"sand",gravity:!0});ft(A.GRAVEL,"gravel","Гравий",It("gravel"),{hardness:.6,tool:"shovel",sound:"gravel",gravity:!0});ft(A.SANDSTONE,"sandstone","Песчаник",bs("sandstone_side","sandstone_top","sandstone_bottom"),Ye(.8));ft(A.GLASS,"glass","Стекло",It("glass"),{layer:"cutout",hardness:.3,sound:"glass",cullSame:!0});ft(A.BEDROCK,"bedrock","Коренная порода",It("bedrock"),{hardness:-1});ft(A.WATER,"water","Вода",(i,t)=>t===2&&!(i&8)&&(i&7)===0?"water_still":"water_flow",{shape:"fluid",layer:"translucent",solid:!1,opacity:2,hardness:-1,replaceable:!0,item:null});ft(A.LAVA,"lava","Лава",(i,t)=>t===2&&!(i&8)&&(i&7)===0?"lava_still":"lava_flow",{shape:"fluid",layer:"opaque",solid:!1,opacity:1,light:15,hardness:-1,replaceable:!0,item:null});ft(A.COAL_ORE,"coal_ore","Угольная руда",It("coal_ore"),Ye(3,0));ft(A.IRON_ORE,"iron_ore","Железная руда",It("iron_ore"),Ye(3,1));ft(A.GOLD_ORE,"gold_ore","Золотая руда",It("gold_ore"),Ye(3,2));ft(A.DIAMOND_ORE,"diamond_ore","Алмазная руда",It("diamond_ore"),Ye(3,2));ft(A.SNOW_BLOCK,"snow_block","Снег",It("snow"),{hardness:.2,tool:"shovel",sound:"snow"});ft(A.SNOWY_GRASS,"snowy_grass","Заснеженный дёрн",bs("snowy_grass_side","snow","dirt"),{hardness:.6,tool:"shovel",sound:"snow"});ft(A.ICE,"ice","Лёд",It("ice"),{layer:"translucent",opacity:2,hardness:.5,tool:"pickaxe",sound:"glass",cullSame:!0});ft(A.CACTUS,"cactus","Кактус",bs("cactus_side","cactus_top","cactus_bottom"),{shape:"cactus",layer:"cutout",hardness:.4,sound:"wool"});ft(A.TALL_GRASS,"tall_grass","Высокая трава",It("tall_grass"),Vi({replaceable:!0}));ft(A.DANDELION,"dandelion","Одуванчик",It("dandelion"),Vi());ft(A.POPPY,"poppy","Мак",It("poppy"),Vi());ft(A.DEAD_BUSH,"dead_bush","Сухой куст",It("dead_bush"),Vi({replaceable:!0,wave:0}));ft(A.BRICKS,"bricks","Кирпичи",It("bricks"),Ye(2));ft(A.STONE_BRICKS,"stone_bricks","Каменные кирпичи",It("stone_bricks"),Ye(1.5));ft(A.MOSSY_COBBLESTONE,"mossy_cobblestone","Замшелый булыжник",It("mossy_cobblestone"),Ye(2));ft(A.OBSIDIAN,"obsidian","Обсидиан",It("obsidian"),Ye(50,3));ft(A.BOOKSHELF,"bookshelf","Книжная полка",bs("bookshelf","oak_planks"),{...Ln,hardness:1.5});ft(A.GLOWSTONE,"glowstone","Светокамень",It("glowstone"),{hardness:.3,sound:"glass",light:15});ft(A.WHITE_WOOL,"white_wool","Белая шерсть",It("wool_white"),Ss);ft(A.RED_WOOL,"red_wool","Красная шерсть",It("wool_red"),Ss);ft(A.PINK_WOOL,"pink_wool","Розовая шерсть",It("wool_pink"),Ss);ft(A.YELLOW_WOOL,"yellow_wool","Жёлтая шерсть",It("wool_yellow"),Ss);ft(A.GREEN_WOOL,"green_wool","Зелёная шерсть",It("wool_green"),Ss);ft(A.BLUE_WOOL,"blue_wool","Синяя шерсть",It("wool_blue"),Ss);ft(A.PURPLE_WOOL,"purple_wool","Фиолетовая шерсть",It("wool_purple"),Ss);ft(A.BLACK_WOOL,"black_wool","Чёрная шерсть",It("wool_black"),Ss);ft(A.CRAFTING_TABLE,"crafting_table","Верстак",(i,t)=>t===2?"crafting_table_top":t===3?"oak_planks":t>=4?"crafting_table_front":"crafting_table_side",{...Ln,hardness:2.5});ft(A.FURNACE,"furnace","Печь",Io("furnace_front","furnace_side","furnace_top"),Ye(3.5));ft(A.LIT_FURNACE,"lit_furnace","Горящая печь",Io("furnace_front_lit","furnace_side","furnace_top"),{...Ye(3.5),light:13,item:A.FURNACE});ft(A.CHEST,"chest","Сундук",Io("chest_front","chest_side","chest_top"),{...Ln,shape:"chest",hardness:2.5});ft(A.TORCH,"torch","Факел",It("torch"),{shape:"torch",layer:"cutout",solid:!1,hardness:0,light:14,sound:"wood"});ft(A.LADDER,"ladder","Лестница",It("ladder"),{shape:"ladder",layer:"cutout",hardness:.4,tool:"axe",sound:"wood",climbable:!0});ft(A.OAK_DOOR,"oak_door","Дубовая дверь",i=>i&8?"door_top":"door_bottom",{...Ln,shape:"door",layer:"cutout",hardness:3,item:ap});ft(A.OAK_FENCE,"oak_fence","Дубовый забор",It("oak_planks"),{...Ln,shape:"fence"});ft(A.OAK_SLAB,"oak_slab","Дубовая плита",It("oak_planks"),{...Ln,shape:"slab"});ft(A.COBBLESTONE_SLAB,"cobblestone_slab","Булыжная плита",It("cobblestone"),{...Ye(2),shape:"slab"});ft(A.STONE_SLAB,"stone_slab","Каменная плита",bs("stone_slab_side","stone_slab_top"),{...Ye(2),shape:"slab"});ft(A.OAK_STAIRS,"oak_stairs","Дубовые ступеньки",It("oak_planks"),{...Ln,shape:"stairs"});ft(A.COBBLESTONE_STAIRS,"cobblestone_stairs","Булыжные ступеньки",It("cobblestone"),{...Ye(2),shape:"stairs"});ft(A.STONE_BRICK_STAIRS,"stone_brick_stairs","Ступеньки из каменных кирпичей",It("stone_bricks"),{...Ye(1.5),shape:"stairs"});ft(A.BED,"bed","Кровать",(i,t)=>{const e=(i&4)!==0,n=i&3;return t===2?e?"bed_head_top":"bed_foot_top":t===3?"oak_planks":t===Ul[n]?e?"bed_head_end":"bed_foot_side":t===Ul[yr(n)]?e?"bed_head_side":"bed_foot_end":e?"bed_head_side":"bed_foot_side"},{shape:"bed",layer:"cutout",hardness:.2,sound:"wood",item:cp,topRotation:i=>i&3});ft(A.FARMLAND,"farmland","Грядка",bs("dirt","farmland_top","dirt"),{shape:"farmland",hardness:.6,tool:"shovel",sound:"gravel",item:A.DIRT});ft(A.WHEAT,"wheat","Пшеница",i=>`wheat_${Math.min(7,i&7)}`,{...Vi(),shape:"crop",item:lp});ft(A.OAK_SAPLING,"oak_sapling","Саженец дуба",It("oak_sapling"),Vi());ft(A.BIRCH_SAPLING,"birch_sapling","Саженец берёзы",It("birch_sapling"),Vi());ft(A.SPRUCE_SAPLING,"spruce_sapling","Саженец ели",It("spruce_sapling"),Vi());ft(A.TNT,"tnt","Динамит",bs("tnt_side","tnt_top","tnt_bottom"),{hardness:0,sound:"grass"});ft(A.IRON_BLOCK,"iron_block","Железный блок",It("iron_block"),{...Ye(5,1),sound:"metal"});ft(A.GOLD_BLOCK,"gold_block","Золотой блок",It("gold_block"),{...Ye(3,2),sound:"metal"});ft(A.DIAMOND_BLOCK,"diamond_block","Алмазный блок",It("diamond_block"),{...Ye(5,2),sound:"metal"});ft(A.GLASS_PANE,"glass_pane","Стеклянная панель",(i,t)=>t===2||t===3?"glass_pane_top":"glass",{shape:"pane",layer:"cutout",hardness:.3,sound:"glass"});ft(A.OAK_TRAPDOOR,"oak_trapdoor","Дубовый люк",It("trapdoor"),{...Ln,shape:"trapdoor",layer:"cutout",hardness:3});ft(A.OAK_FENCE_GATE,"oak_fence_gate","Дубовая калитка",It("oak_planks"),{...Ln,shape:"gate"});ft(A.PUMPKIN,"pumpkin","Тыква",Io("pumpkin_face","pumpkin_side","pumpkin_top"),{hardness:1,tool:"axe",sound:"wood"});ft(A.JACK_O_LANTERN,"jack_o_lantern","Светильник Джека",Io("jack_o_lantern","pumpkin_side","pumpkin_top"),{hardness:1,tool:"axe",sound:"wood",light:15});ft(A.SUGAR_CANE,"sugar_cane","Сахарный тростник",It("sugar_cane"),Vi({wave:0}));const ri=No.length,je=No,Cm=["none","cube","cross","crop","fluid","torch","slab","stairs","door","ladder","fence","bed","farmland","cactus","chest","pane","trapdoor","gate"],Vr=0,lc=1,Wr=2,Uo=3,Xr=4,Yr=5,go=6,hp=7,Kh=8,Kr=9,qh=10,$h=11,up=12,fp=13,Ol=14,dp=15,jh=16,hc=17,Lm=0,Dm=1,pp=2,Pm=new Set(["glowstone","lava_still","lava_flow","furnace_front_lit","torch","jack_o_lantern"]),Im=["water_still","water_flow","lava_still","lava_flow",...Array.from({length:10},(i,t)=>`destroy_${t}`)],Pr=[],kl=new Map,mp=i=>{!i||kl.has(i)||(kl.set(i,Pr.length),Pr.push(i))};for(const i of No)for(let t=0;t<64;t++)for(let e=0;e<6;e++)mp(i.tiles(t,e));Im.forEach(mp);const Zh=i=>kl.get(i)??0,dn=new Uint8Array(ri),gp=new Uint8Array(ri),Fl=new Uint8Array(ri),un=new Uint8Array(ri),Jh=new Uint8Array(ri),Qh=new Uint8Array(ri),Bl=new Uint8Array(ri),_p=new Uint8Array(ri),Sr=new Uint8Array(ri),Rn=new Uint8Array(ri*64*6),vp=new Uint8Array(ri*64),Oo=new Uint8Array(Pr.length);No.forEach((i,t)=>{dn[t]=Cm.indexOf(i.shape),gp[t]=i.layer==="opaque"?Lm:i.layer==="cutout"?Dm:pp,Fl[t]=i.solid?1:0,un[t]=i.fullCube?1:0,Jh[t]=i.opacity,Qh[t]=i.light,Bl[t]=i.wave,_p[t]=i.cullSame?1:0,Sr[t]=i.replaceable?1:0;for(let e=0;e<64;e++){for(let n=0;n<6;n++)Rn[t*384+e*6+n]=Zh(i.tiles(e,n));vp[t*64+e]=i.topRotation?i.topRotation(e)&3:0}});Pr.forEach((i,t)=>Oo[t]=Pm.has(i)?1:0);const Nm=i=>Xt(i)===A.WATER,Ac=i=>dn[Xt(i)]===Xr,Um=i=>Ms(i)&7,Om=i=>(Ms(i)&8)!==0;function Xa(i){if(Om(i))return 1;const t=Um(i);return t===0?.875:Math.max(.12,(8-t)/9*.95)}const Gu={[A.OAK_SLAB]:A.OAK_PLANKS,[A.COBBLESTONE_SLAB]:A.COBBLESTONE,[A.STONE_SLAB]:A.STONE};function km(i,t,e,n){const s=Xt(i(t,e-1,n));if(s===A.SUGAR_CANE)return!0;if(s!==A.GRASS&&s!==A.DIRT&&s!==A.SAND&&s!==A.SNOWY_GRASS)return!1;for(const[r,,o]of Po)if(Nm(i(t+r,e-1,n+o)))return!0;return!1}const j={STICK:256,COAL:257,CHARCOAL:258,IRON_INGOT:259,GOLD_INGOT:260,DIAMOND:261,FLINT:262,FLINT_AND_STEEL:263,STRING:264,FEATHER:265,GUNPOWDER:266,BONE:267,BONE_MEAL:268,ARROW:269,BOW:270,LEATHER:271,ROTTEN_FLESH:272,WHEAT_SEEDS:lp,WHEAT:274,BREAD:275,APPLE:276,PORKCHOP:277,COOKED_PORKCHOP:278,BEEF:279,STEAK:280,CHICKEN:281,COOKED_CHICKEN:282,BUCKET:283,WATER_BUCKET:284,LAVA_BUCKET:285,OAK_DOOR:ap,BED:cp,SHEARS:288,RED_DYE:289,YELLOW_DYE:290,MUTTON:291,COOKED_MUTTON:292,PAPER:293,BOOK:294},qr=new Map;function uc(i){qr.set(i.id,{maxStack:64,...i})}const Fm=new Set([A.AIR,A.WATER,A.LAVA,A.LIT_FURNACE,A.OAK_DOOR,A.BED,A.WHEAT]),Bm={[A.OAK_PLANKS]:300,[A.BIRCH_PLANKS]:300,[A.SPRUCE_PLANKS]:300,[A.OAK_LOG]:300,[A.BIRCH_LOG]:300,[A.SPRUCE_LOG]:300,[A.OAK_SLAB]:150,[A.OAK_STAIRS]:300,[A.OAK_FENCE]:300,[A.CRAFTING_TABLE]:300,[A.CHEST]:300,[A.BOOKSHELF]:300,[A.LADDER]:300,[A.OAK_TRAPDOOR]:300,[A.OAK_FENCE_GATE]:300,[A.OAK_SAPLING]:100,[A.BIRCH_SAPLING]:100,[A.SPRUCE_SAPLING]:100};for(let i=0;i<ri;i++){if(Fm.has(i))continue;const t=je[i];uc({id:i,key:t.key,name:t.name,places:ti(i),fuel:Bm[i],hidden:i===A.FARMLAND||i===A.SNOWY_GRASS})}const ie=(i,t,e,n={})=>uc({id:i,key:t,name:e,sprite:t,...n});ie(j.STICK,"stick","Палка",{fuel:100});ie(j.COAL,"coal","Уголь",{fuel:1600});ie(j.CHARCOAL,"charcoal","Древесный уголь",{fuel:1600});ie(j.IRON_INGOT,"iron_ingot","Железный слиток");ie(j.GOLD_INGOT,"gold_ingot","Золотой слиток");ie(j.DIAMOND,"diamond","Алмаз");ie(j.FLINT,"flint","Кремень");ie(j.FLINT_AND_STEEL,"flint_and_steel","Огниво",{maxStack:1,durability:64});ie(j.STRING,"string","Нить");ie(j.FEATHER,"feather","Перо");ie(j.GUNPOWDER,"gunpowder","Порох");ie(j.BONE,"bone","Кость");ie(j.BONE_MEAL,"bone_meal","Костная мука");ie(j.ARROW,"arrow","Стрела");ie(j.BOW,"bow","Лук",{maxStack:1,durability:384,fuel:300});ie(j.LEATHER,"leather","Кожа");ie(j.ROTTEN_FLESH,"rotten_flesh","Гнилая плоть",{food:{hunger:4,saturation:.8}});ie(j.WHEAT_SEEDS,"wheat_seeds","Семена пшеницы",{places:ti(A.WHEAT)});ie(j.WHEAT,"wheat","Пшеница");ie(j.BREAD,"bread","Хлеб",{food:{hunger:5,saturation:6}});ie(j.APPLE,"apple","Яблоко",{food:{hunger:4,saturation:2.4}});ie(j.PORKCHOP,"porkchop","Сырая свинина",{food:{hunger:3,saturation:1.8}});ie(j.COOKED_PORKCHOP,"cooked_porkchop","Жареная свинина",{food:{hunger:8,saturation:12.8}});ie(j.BEEF,"beef","Сырая говядина",{food:{hunger:3,saturation:1.8}});ie(j.STEAK,"steak","Стейк",{food:{hunger:8,saturation:12.8}});ie(j.CHICKEN,"chicken","Сырая курица",{food:{hunger:2,saturation:1.2}});ie(j.COOKED_CHICKEN,"cooked_chicken","Жареная курица",{food:{hunger:6,saturation:7.2}});ie(j.MUTTON,"mutton","Сырая баранина",{food:{hunger:2,saturation:1.2}});ie(j.COOKED_MUTTON,"cooked_mutton","Жареная баранина",{food:{hunger:6,saturation:9.6}});ie(j.BUCKET,"bucket","Ведро",{maxStack:16});ie(j.WATER_BUCKET,"water_bucket","Ведро воды",{maxStack:1});ie(j.LAVA_BUCKET,"lava_bucket","Ведро лавы",{maxStack:1,fuel:2e4});ie(j.OAK_DOOR,"oak_door_item","Дубовая дверь",{places:ti(A.OAK_DOOR),fuel:200});ie(j.BED,"bed_item","Кровать",{maxStack:1,places:ti(A.BED)});ie(j.SHEARS,"shears","Ножницы",{maxStack:1,durability:238,tool:{type:"shears",level:0,speed:5}});ie(j.RED_DYE,"red_dye","Красный краситель");ie(j.YELLOW_DYE,"yellow_dye","Жёлтый краситель");ie(j.PAPER,"paper","Бумага");ie(j.BOOK,"book","Книга");const ki=(i,t="ый")=>({f:`${i}ая`,m:`${i}${t}`,p:`${i}ые`}),xp=[{key:"wooden",name:ki("Деревянн"),level:0,speed:2,durability:59,damage:0,fuel:200},{key:"stone",name:ki("Каменн"),level:1,speed:4,durability:131,damage:1,fuel:0},{key:"iron",name:ki("Железн"),level:2,speed:6,durability:250,damage:2,fuel:0},{key:"golden",name:ki("Золот","ой"),level:0,speed:12,durability:32,damage:0,fuel:0},{key:"diamond",name:ki("Алмазн"),level:3,speed:8,durability:1561,damage:3,fuel:0}],zm=[{key:"pickaxe",type:"pickaxe",name:i=>`${i.f} кирка`,damage:3},{key:"axe",type:"axe",name:i=>`${i.m} топор`,damage:4},{key:"shovel",type:"shovel",name:i=>`${i.f} лопата`,damage:2},{key:"sword",type:"sword",name:i=>`${i.m} меч`,damage:5},{key:"hoe",type:"hoe",name:i=>`${i.f} мотыга`,damage:1}];xp.forEach((i,t)=>zm.forEach((e,n)=>{const s=`${i.key}_${e.key}`;uc({id:300+t*5+n,key:s,name:e.name(i.name),sprite:s,maxStack:1,durability:i.durability,tool:{type:e.type,level:i.level,speed:i.speed},damage:e.damage+i.damage,fuel:i.fuel||void 0})}));const Gm=[{key:"leather",name:ki("Кожан"),points:[1,3,2,1],durability:5,color:"#8b5a2b"},{key:"iron",name:ki("Железн"),points:[2,6,5,2],durability:15,color:"#d8d8d8"},{key:"golden",name:ki("Золот","ой"),points:[2,5,3,1],durability:7,color:"#f2cf3a"},{key:"diamond",name:ki("Алмазн"),points:[3,8,6,3],durability:33,color:"#5fe0d6"}],Hm=[{key:"helmet",name:i=>`${i.m} шлем`,base:11},{key:"chestplate",name:i=>`${i.m} нагрудник`,base:16},{key:"leggings",name:i=>`${i.p} поножи`,base:15},{key:"boots",name:i=>`${i.p} ботинки`,base:13}];Gm.forEach((i,t)=>Hm.forEach((e,n)=>{const s=`${i.key}_${e.key}`;uc({id:330+t*4+n,key:s,name:e.name(i.name),sprite:s,maxStack:1,durability:e.base*i.durability,armor:{slot:n,points:i.points[n],color:i.color}})}));const Mp=[...qr.values()].sort((i,t)=>i.id-t.id);function pe(i){return qr.get(i)}const Vm=i=>Number.isInteger(i)&&qr.has(i),Wm=i=>{var t;return((t=qr.get(i))==null?void 0:t.name)??"?"},hs=i=>{var t;return((t=qr.get(i))==null?void 0:t.maxStack)??64},ms=i=>i<256;Mp.filter(i=>i.sprite).map(i=>i.sprite);const yp=Mp.filter(i=>!i.hidden).map(i=>i.id),Vo={pig:[.9,.9],cow:[.9,1.4],sheep:[.9,1.3],chicken:[.4,.7],zombie:[.6,1.95],skeleton:[.6,1.99],creeper:[.6,1.7],spider:[1.4,.9]},bp=["#e53935","#fb8c00","#fdd835","#43a047","#00acc1","#1e88e5","#8e24aa","#ec407a"],Hu=1,Xm=2,Ym=4,Vu=8;/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const tu="180",Km=0,Wu=1,qm=2,Sp=1,$m=2,Ui=3,Hi=0,Cn=1,Jn=2,gs=0,Lr=1,zl=2,Xu=3,Yu=4,jm=5,ks=100,Zm=101,Jm=102,Qm=103,tg=104,eg=200,ng=201,ig=202,sg=203,Gl=204,Hl=205,rg=206,og=207,ag=208,cg=209,lg=210,hg=211,ug=212,fg=213,dg=214,Vl=0,Wl=1,Xl=2,Ir=3,Yl=4,Kl=5,ql=6,$l=7,fc=0,pg=1,mg=2,_s=0,gg=1,_g=2,vg=3,xg=4,Mg=5,yg=6,bg=7,Ep=300,Nr=301,Ur=302,jl=303,Zl=304,dc=306,Jl=1e3,Hs=1001,Ql=1002,ln=1003,Sg=1004,po=1005,yi=1006,Rc=1007,Vs=1008,pi=1009,wp=1010,Tp=1011,yo=1012,eu=1013,Ys=1014,bi=1015,zi=1016,nu=1017,iu=1018,bo=1020,Ap=35902,Rp=35899,Cp=1021,Lp=1022,fi=1023,So=1026,Eo=1027,su=1028,ru=1029,Dp=1030,ou=1031,au=1033,Ia=33776,Na=33777,Ua=33778,Oa=33779,th=35840,eh=35841,nh=35842,ih=35843,sh=36196,rh=37492,oh=37496,ah=37808,ch=37809,lh=37810,hh=37811,uh=37812,fh=37813,dh=37814,ph=37815,mh=37816,gh=37817,_h=37818,vh=37819,xh=37820,Mh=37821,yh=36492,bh=36494,Sh=36495,Eh=36283,wh=36284,Th=36285,Ah=36286,Eg=3200,wg=3201,pc=0,Tg=1,ls="",hn="srgb",Or="srgb-linear",Ya="linear",Se="srgb",js=7680,Ku=519,Ag=512,Rg=513,Cg=514,Pp=515,Lg=516,Dg=517,Pg=518,Ig=519,Rh=35044,Ws=35048,us="300 es",Si=2e3,Ka=2001;class $r{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ka=Math.PI/180,Ch=180/Math.PI;function vs(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(mn[i&255]+mn[i>>8&255]+mn[i>>16&255]+mn[i>>24&255]+"-"+mn[t&255]+mn[t>>8&255]+"-"+mn[t>>16&15|64]+mn[t>>24&255]+"-"+mn[e&63|128]+mn[e>>8&255]+"-"+mn[e>>16&255]+mn[e>>24&255]+mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]).toLowerCase()}function ce(i,t,e){return Math.max(t,Math.min(e,i))}function Ng(i,t){return(i%t+t)%t}function Cc(i,t,e){return(1-e)*i+e*t}function Mi(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ee(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class kt{constructor(t=0,e=0){kt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class jr{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],m=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=m,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==m){let g=1-a;const p=c*f+l*d+h*m+u*_,M=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){const E=Math.sqrt(S),w=Math.atan2(E,p*M);g=Math.sin(g*w)/E,a=Math.sin(a*w)/E}const v=a*M;if(c=c*g+f*v,l=l*g+d*v,h=h*g+m*v,u=u*g+_*v,g===1-a){const E=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=E,l*=E,h*=E,u*=E}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return t[e]=a*m+h*u+c*d-l*f,t[e+1]=c*m+h*f+l*u-a*d,t[e+2]=l*m+h*d+a*f-c*u,t[e+3]=h*m-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"YZX":this._x=f*h*u+l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u-f*d*m;break;case"XZY":this._x=f*h*u-l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ce(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,n=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(qu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(qu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Lc.copy(this).projectOnVector(t),this.sub(Lc)}reflect(t){return this.sub(Lc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Lc=new F,qu=new jr;class Jt{constructor(t,e,n,s,r,o,a,c,l){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],_=s[0],g=s[3],p=s[6],M=s[1],S=s[4],v=s[7],E=s[2],w=s[5],b=s[8];return r[0]=o*_+a*M+c*E,r[3]=o*g+a*S+c*w,r[6]=o*p+a*v+c*b,r[1]=l*_+h*M+u*E,r[4]=l*g+h*S+u*w,r[7]=l*p+h*v+u*b,r[2]=f*_+d*M+m*E,r[5]=f*g+d*S+m*w,r[8]=f*p+d*v+m*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,m=e*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Dc.makeScale(t,e)),this}rotate(t){return this.premultiply(Dc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Dc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Dc=new Jt;function Ip(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function qa(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ug(){const i=qa("canvas");return i.style.display="block",i}const $u={};function wo(i){i in $u||($u[i]=!0,console.warn(i))}function Og(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const ju=new Jt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zu=new Jt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function kg(){const i={enabled:!0,workingColorSpace:Or,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Se&&(s.r=Gi(s.r),s.g=Gi(s.g),s.b=Gi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Se&&(s.r=Dr(s.r),s.g=Dr(s.g),s.b=Dr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ls?Ya:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return wo("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return wo("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Or]:{primaries:t,whitePoint:n,transfer:Ya,toXYZ:ju,fromXYZ:Zu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:t,whitePoint:n,transfer:Se,toXYZ:ju,fromXYZ:Zu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const de=kg();function Gi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Dr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Zs;class Fg{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Zs===void 0&&(Zs=qa("canvas")),Zs.width=t.width,Zs.height=t.height;const s=Zs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=Zs}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=qa("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Gi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Gi(e[n]/255)*255):e[n]=Gi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Bg=0;class cu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Bg++}),this.uuid=vs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Pc(s[o].image)):r.push(Pc(s[o]))}else r=Pc(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Pc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Fg.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let zg=0;const Ic=new F;class Sn extends $r{constructor(t=Sn.DEFAULT_IMAGE,e=Sn.DEFAULT_MAPPING,n=Hs,s=Hs,r=yi,o=Vs,a=fi,c=pi,l=Sn.DEFAULT_ANISOTROPY,h=ls){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zg++}),this.uuid=vs(),this.name="",this.source=new cu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new kt(0,0),this.repeat=new kt(1,1),this.center=new kt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ic).x}get height(){return this.source.getSize(Ic).y}get depth(){return this.source.getSize(Ic).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Ep)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Jl:t.x=t.x-Math.floor(t.x);break;case Hs:t.x=t.x<0?0:1;break;case Ql:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Jl:t.y=t.y-Math.floor(t.y);break;case Hs:t.y=t.y<0?0:1;break;case Ql:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=Ep;Sn.DEFAULT_ANISOTROPY=1;class Oe{constructor(t=0,e=0,n=0,s=1){Oe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(l+1)/2,v=(d+1)/2,E=(p+1)/2,w=(h+f)/4,b=(u+_)/4,L=(m+g)/4;return S>v&&S>E?S<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(S),s=w/n,r=b/n):v>E?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=w/s,r=L/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=b/r,s=L/r),this.set(n,s,r,e),this}let M=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(u-_)/M,this.z=(f-h)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this.w=ce(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this.w=ce(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gg extends $r{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:yi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new Oe(0,0,t,e),this.scissorTest=!1,this.viewport=new Oe(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Sn(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:yi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new cu(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ei extends Gg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class lu extends Sn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Hg extends Sn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Hs,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Es{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ai.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ai.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ai.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ai):ai.fromBufferAttribute(r,o),ai.applyMatrix4(t.matrixWorld),this.expandByPoint(ai);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Wo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Wo.copy(n.boundingBox)),Wo.applyMatrix4(t.matrixWorld),this.union(Wo)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ai),ai.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(eo),Xo.subVectors(this.max,eo),Js.subVectors(t.a,eo),Qs.subVectors(t.b,eo),tr.subVectors(t.c,eo),qi.subVectors(Qs,Js),$i.subVectors(tr,Qs),Cs.subVectors(Js,tr);let e=[0,-qi.z,qi.y,0,-$i.z,$i.y,0,-Cs.z,Cs.y,qi.z,0,-qi.x,$i.z,0,-$i.x,Cs.z,0,-Cs.x,-qi.y,qi.x,0,-$i.y,$i.x,0,-Cs.y,Cs.x,0];return!Nc(e,Js,Qs,tr,Xo)||(e=[1,0,0,0,1,0,0,0,1],!Nc(e,Js,Qs,tr,Xo))?!1:(Yo.crossVectors(qi,$i),e=[Yo.x,Yo.y,Yo.z],Nc(e,Js,Qs,tr,Xo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ai).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ai).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ci),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ci=[new F,new F,new F,new F,new F,new F,new F,new F],ai=new F,Wo=new Es,Js=new F,Qs=new F,tr=new F,qi=new F,$i=new F,Cs=new F,eo=new F,Xo=new F,Yo=new F,Ls=new F;function Nc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ls.fromArray(i,r);const a=s.x*Math.abs(Ls.x)+s.y*Math.abs(Ls.y)+s.z*Math.abs(Ls.z),c=t.dot(Ls),l=e.dot(Ls),h=n.dot(Ls);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Vg=new Es,no=new F,Uc=new F;class Wi{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Vg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;no.subVectors(t,this.center);const e=no.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(no,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Uc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(no.copy(t.center).add(Uc)),this.expandByPoint(no.copy(t.center).sub(Uc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Li=new F,Oc=new F,Ko=new F,ji=new F,kc=new F,qo=new F,Fc=new F;class hu{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Li)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Li.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Li.copy(this.origin).addScaledVector(this.direction,e),Li.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Oc.copy(t).add(e).multiplyScalar(.5),Ko.copy(e).sub(t).normalize(),ji.copy(this.origin).sub(Oc);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Ko),a=ji.dot(this.direction),c=-ji.dot(Ko),l=ji.lengthSq(),h=Math.abs(1-o*o);let u,f,d,m;if(h>0)if(u=o*c-a,f=o*a-c,m=r*h,u>=0)if(f>=-m)if(f<=m){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Oc).addScaledVector(Ko,f),d}intersectSphere(t,e){Li.subVectors(t.center,this.origin);const n=Li.dot(this.direction),s=Li.dot(Li)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Li)!==null}intersectTriangle(t,e,n,s,r){kc.subVectors(e,t),qo.subVectors(n,t),Fc.crossVectors(kc,qo);let o=this.direction.dot(Fc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ji.subVectors(this.origin,t);const c=a*this.direction.dot(qo.crossVectors(ji,qo));if(c<0)return null;const l=a*this.direction.dot(kc.cross(ji));if(l<0||c+l>o)return null;const h=-a*ji.dot(Fc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ve{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,m,_,g){ve.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,_,g)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,_,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ve().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/er.setFromMatrixColumn(t,0).length(),r=1/er.setFromMatrixColumn(t,1).length(),o=1/er.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,m=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+m*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=m+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,m=l*h,_=l*u;e[0]=f+_*a,e[4]=m*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-m,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,m=l*h,_=l*u;e[0]=f-_*a,e[4]=-o*u,e[8]=m+d*a,e[1]=d+m*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,m=a*h,_=a*u;e[0]=c*h,e[4]=m*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=_-f*u,e[8]=m*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+m,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*c,d=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Wg,t,Xg)}lookAt(t,e,n){const s=this.elements;return Fn.subVectors(t,e),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),Zi.crossVectors(n,Fn),Zi.lengthSq()===0&&(Math.abs(n.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),Zi.crossVectors(n,Fn)),Zi.normalize(),$o.crossVectors(Fn,Zi),s[0]=Zi.x,s[4]=$o.x,s[8]=Fn.x,s[1]=Zi.y,s[5]=$o.y,s[9]=Fn.y,s[2]=Zi.z,s[6]=$o.z,s[10]=Fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],_=n[6],g=n[10],p=n[14],M=n[3],S=n[7],v=n[11],E=n[15],w=s[0],b=s[4],L=s[8],x=s[12],y=s[1],R=s[5],P=s[9],U=s[13],z=s[2],W=s[6],X=s[10],K=s[14],G=s[3],et=s[7],lt=s[11],bt=s[15];return r[0]=o*w+a*y+c*z+l*G,r[4]=o*b+a*R+c*W+l*et,r[8]=o*L+a*P+c*X+l*lt,r[12]=o*x+a*U+c*K+l*bt,r[1]=h*w+u*y+f*z+d*G,r[5]=h*b+u*R+f*W+d*et,r[9]=h*L+u*P+f*X+d*lt,r[13]=h*x+u*U+f*K+d*bt,r[2]=m*w+_*y+g*z+p*G,r[6]=m*b+_*R+g*W+p*et,r[10]=m*L+_*P+g*X+p*lt,r[14]=m*x+_*U+g*K+p*bt,r[3]=M*w+S*y+v*z+E*G,r[7]=M*b+S*R+v*W+E*et,r[11]=M*L+S*P+v*X+E*lt,r[15]=M*x+S*U+v*K+E*bt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+_*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+g*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],_=t[13],g=t[14],p=t[15],M=u*g*l-_*f*l+_*c*d-a*g*d-u*c*p+a*f*p,S=m*f*l-h*g*l-m*c*d+o*g*d+h*c*p-o*f*p,v=h*_*l-m*u*l+m*a*d-o*_*d-h*a*p+o*u*p,E=m*u*c-h*_*c-m*a*f+o*_*f+h*a*g-o*u*g,w=e*M+n*S+s*v+r*E;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/w;return t[0]=M*b,t[1]=(_*f*r-u*g*r-_*s*d+n*g*d+u*s*p-n*f*p)*b,t[2]=(a*g*r-_*c*r+_*s*l-n*g*l-a*s*p+n*c*p)*b,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*b,t[4]=S*b,t[5]=(h*g*r-m*f*r+m*s*d-e*g*d-h*s*p+e*f*p)*b,t[6]=(m*c*r-o*g*r-m*s*l+e*g*l+o*s*p-e*c*p)*b,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*b,t[8]=v*b,t[9]=(m*u*r-h*_*r-m*n*d+e*_*d+h*n*p-e*u*p)*b,t[10]=(o*_*r-m*a*r+m*n*l-e*_*l-o*n*p+e*a*p)*b,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*b,t[12]=E*b,t[13]=(h*_*s-m*u*s+m*n*f-e*_*f-h*n*g+e*u*g)*b,t[14]=(m*a*s-o*_*s-m*n*c+e*_*c+o*n*g-e*a*g)*b,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*b,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,m=r*u,_=o*h,g=o*u,p=a*u,M=c*l,S=c*h,v=c*u,E=n.x,w=n.y,b=n.z;return s[0]=(1-(_+p))*E,s[1]=(d+v)*E,s[2]=(m-S)*E,s[3]=0,s[4]=(d-v)*w,s[5]=(1-(f+p))*w,s[6]=(g+M)*w,s[7]=0,s[8]=(m+S)*b,s[9]=(g-M)*b,s[10]=(1-(f+_))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=er.set(s[0],s[1],s[2]).length();const o=er.set(s[4],s[5],s[6]).length(),a=er.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],ci.copy(this);const l=1/r,h=1/o,u=1/a;return ci.elements[0]*=l,ci.elements[1]*=l,ci.elements[2]*=l,ci.elements[4]*=h,ci.elements[5]*=h,ci.elements[6]*=h,ci.elements[8]*=u,ci.elements[9]*=u,ci.elements[10]*=u,e.setFromRotationMatrix(ci),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=Si,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let m,_;if(c)m=r/(o-r),_=o*r/(o-r);else if(a===Si)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Ka)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=Si,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let m,_;if(c)m=1/(o-r),_=o/(o-r);else if(a===Si)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===Ka)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const er=new F,ci=new ve,Wg=new F(0,0,0),Xg=new F(1,1,1),Zi=new F,$o=new F,Fn=new F,Ju=new ve,Qu=new jr;class ni{constructor(t=0,e=0,n=0,s=ni.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ce(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ce(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ce(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ju.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ju,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Qu.setFromEuler(this),this.setFromQuaternion(Qu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ni.DEFAULT_ORDER="XYZ";class Np{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Yg=0;const tf=new F,nr=new jr,Di=new ve,jo=new F,io=new F,Kg=new F,qg=new jr,ef=new F(1,0,0),nf=new F(0,1,0),sf=new F(0,0,1),rf={type:"added"},$g={type:"removed"},ir={type:"childadded",child:null},Bc={type:"childremoved",child:null};class nn extends $r{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yg++}),this.uuid=vs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=nn.DEFAULT_UP.clone();const t=new F,e=new ni,n=new jr,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ve},normalMatrix:{value:new Jt}}),this.matrix=new ve,this.matrixWorld=new ve,this.matrixAutoUpdate=nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Np,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return nr.setFromAxisAngle(t,e),this.quaternion.multiply(nr),this}rotateOnWorldAxis(t,e){return nr.setFromAxisAngle(t,e),this.quaternion.premultiply(nr),this}rotateX(t){return this.rotateOnAxis(ef,t)}rotateY(t){return this.rotateOnAxis(nf,t)}rotateZ(t){return this.rotateOnAxis(sf,t)}translateOnAxis(t,e){return tf.copy(t).applyQuaternion(this.quaternion),this.position.add(tf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ef,t)}translateY(t){return this.translateOnAxis(nf,t)}translateZ(t){return this.translateOnAxis(sf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Di.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?jo.copy(t):jo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),io.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Di.lookAt(io,jo,this.up):Di.lookAt(jo,io,this.up),this.quaternion.setFromRotationMatrix(Di),s&&(Di.extractRotation(s.matrixWorld),nr.setFromRotationMatrix(Di),this.quaternion.premultiply(nr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(rf),ir.child=t,this.dispatchEvent(ir),ir.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent($g),Bc.child=t,this.dispatchEvent(Bc),Bc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Di.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Di.multiply(t.parent.matrixWorld)),t.applyMatrix4(Di),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(rf),ir.child=t,this.dispatchEvent(ir),ir.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,t,Kg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(io,qg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}nn.DEFAULT_UP=new F(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const li=new F,Pi=new F,zc=new F,Ii=new F,sr=new F,rr=new F,of=new F,Gc=new F,Hc=new F,Vc=new F,Wc=new Oe,Xc=new Oe,Yc=new Oe;class Xn{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),li.subVectors(t,e),s.cross(li);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){li.subVectors(s,e),Pi.subVectors(n,e),zc.subVectors(t,e);const o=li.dot(li),a=li.dot(Pi),c=li.dot(zc),l=Pi.dot(Pi),h=Pi.dot(zc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,m=(o*h-a*c)*f;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Ii)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ii.x),c.addScaledVector(o,Ii.y),c.addScaledVector(a,Ii.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Wc.setScalar(0),Xc.setScalar(0),Yc.setScalar(0),Wc.fromBufferAttribute(t,e),Xc.fromBufferAttribute(t,n),Yc.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Wc,r.x),o.addScaledVector(Xc,r.y),o.addScaledVector(Yc,r.z),o}static isFrontFacing(t,e,n,s){return li.subVectors(n,e),Pi.subVectors(t,e),li.cross(Pi).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return li.subVectors(this.c,this.b),Pi.subVectors(this.a,this.b),li.cross(Pi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Xn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;sr.subVectors(s,n),rr.subVectors(r,n),Gc.subVectors(t,n);const c=sr.dot(Gc),l=rr.dot(Gc);if(c<=0&&l<=0)return e.copy(n);Hc.subVectors(t,s);const h=sr.dot(Hc),u=rr.dot(Hc);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(sr,o);Vc.subVectors(t,r);const d=sr.dot(Vc),m=rr.dot(Vc);if(m>=0&&d<=m)return e.copy(r);const _=d*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(rr,a);const g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return of.subVectors(r,s),a=(u-h)/(u-h+(d-m)),e.copy(s).addScaledVector(of,a);const p=1/(g+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(sr,o).addScaledVector(rr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Up={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ji={h:0,s:0,l:0},Zo={h:0,s:0,l:0};function Kc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class Kt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,de.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=de.workingColorSpace){return this.r=t,this.g=e,this.b=n,de.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=de.workingColorSpace){if(t=Ng(t,1),e=ce(e,0,1),n=ce(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=Kc(o,r,t+1/3),this.g=Kc(o,r,t),this.b=Kc(o,r,t-1/3)}return de.colorSpaceToWorking(this,s),this}setStyle(t,e=hn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=hn){const n=Up[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Gi(t.r),this.g=Gi(t.g),this.b=Gi(t.b),this}copyLinearToSRGB(t){return this.r=Dr(t.r),this.g=Dr(t.g),this.b=Dr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hn){return de.workingToColorSpace(gn.copy(this),t),Math.round(ce(gn.r*255,0,255))*65536+Math.round(ce(gn.g*255,0,255))*256+Math.round(ce(gn.b*255,0,255))}getHexString(t=hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=de.workingColorSpace){de.workingToColorSpace(gn.copy(this),e);const n=gn.r,s=gn.g,r=gn.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=de.workingColorSpace){return de.workingToColorSpace(gn.copy(this),e),t.r=gn.r,t.g=gn.g,t.b=gn.b,t}getStyle(t=hn){de.workingToColorSpace(gn.copy(this),t);const e=gn.r,n=gn.g,s=gn.b;return t!==hn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Ji),this.setHSL(Ji.h+t,Ji.s+e,Ji.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ji),t.getHSL(Zo);const n=Cc(Ji.h,Zo.h,e),s=Cc(Ji.s,Zo.s,e),r=Cc(Ji.l,Zo.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gn=new Kt;Kt.NAMES=Up;let jg=0;class Ti extends $r{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=vs(),this.name="",this.type="Material",this.blending=Lr,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gl,this.blendDst=Hl,this.blendEquation=ks,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Kt(0,0,0),this.blendAlpha=0,this.depthFunc=Ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ku,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=js,this.stencilZFail=js,this.stencilZPass=js,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Lr&&(n.blending=this.blending),this.side!==Hi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Gl&&(n.blendSrc=this.blendSrc),this.blendDst!==Hl&&(n.blendDst=this.blendDst),this.blendEquation!==ks&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Ir&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ku&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==js&&(n.stencilFail=this.stencilFail),this.stencilZFail!==js&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==js&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ko extends Ti{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ve=new F,Jo=new kt;let Zg=0;class ye{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zg++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Rh,this.updateRanges=[],this.gpuType=bi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Jo.fromBufferAttribute(this,e),Jo.applyMatrix3(t),this.setXY(e,Jo.x,Jo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Mi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Mi(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Mi(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Mi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Mi(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array),r=Ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Rh&&(t.usage=this.usage),t}}class Op extends ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class kp extends ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Xe extends ye{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Jg=0;const $n=new ve,qc=new nn,or=new F,Bn=new Es,so=new Es,cn=new F;class He extends $r{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=vs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ip(t)?kp:Op)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Jt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return $n.makeRotationFromQuaternion(t),this.applyMatrix4($n),this}rotateX(t){return $n.makeRotationX(t),this.applyMatrix4($n),this}rotateY(t){return $n.makeRotationY(t),this.applyMatrix4($n),this}rotateZ(t){return $n.makeRotationZ(t),this.applyMatrix4($n),this}translate(t,e,n){return $n.makeTranslation(t,e,n),this.applyMatrix4($n),this}scale(t,e,n){return $n.makeScale(t,e,n),this.applyMatrix4($n),this}lookAt(t){return qc.lookAt(t),qc.updateMatrix(),this.applyMatrix4(qc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(or).negate(),this.translate(or.x,or.y,or.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Xe(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Es);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Bn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Wi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const n=this.boundingSphere.center;if(Bn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];so.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(Bn.min,so.min),Bn.expandByPoint(cn),cn.addVectors(Bn.max,so.max),Bn.expandByPoint(cn)):(Bn.expandByPoint(so.min),Bn.expandByPoint(so.max))}Bn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)cn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(cn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)cn.fromBufferAttribute(a,l),c&&(or.fromBufferAttribute(t,l),cn.add(or)),s=Math.max(s,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ye(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<n.count;L++)a[L]=new F,c[L]=new F;const l=new F,h=new F,u=new F,f=new kt,d=new kt,m=new kt,_=new F,g=new F;function p(L,x,y){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,x),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,L),d.fromBufferAttribute(r,x),m.fromBufferAttribute(r,y),h.sub(l),u.sub(l),d.sub(f),m.sub(f);const R=1/(d.x*m.y-m.x*d.y);isFinite(R)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(R),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(R),a[L].add(_),a[x].add(_),a[y].add(_),c[L].add(g),c[x].add(g),c[y].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let L=0,x=M.length;L<x;++L){const y=M[L],R=y.start,P=y.count;for(let U=R,z=R+P;U<z;U+=3)p(t.getX(U+0),t.getX(U+1),t.getX(U+2))}const S=new F,v=new F,E=new F,w=new F;function b(L){E.fromBufferAttribute(s,L),w.copy(E);const x=a[L];S.copy(x),S.sub(E.multiplyScalar(E.dot(x))).normalize(),v.crossVectors(w,x);const R=v.dot(c[L])<0?-1:1;o.setXYZW(L,S.x,S.y,S.z,R)}for(let L=0,x=M.length;L<x;++L){const y=M[L],R=y.start,P=y.count;for(let U=R,z=R+P;U<z;U+=3)b(t.getX(U+0)),b(t.getX(U+1)),b(t.getX(U+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new F,r=new F,o=new F,a=new F,c=new F,l=new F,h=new F,u=new F;if(t)for(let f=0,d=t.count;f<d;f+=3){const m=t.getX(f+0),_=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)cn.fromBufferAttribute(t,e),cn.normalize(),t.setXYZ(e,cn.x,cn.y,cn.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let p=0;p<h;p++)f[m++]=l[d++]}return new ye(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const af=new ve,Ds=new hu,Qo=new Wi,cf=new F,ta=new F,ea=new F,na=new F,$c=new F,ia=new F,lf=new F,sa=new F;class _e extends nn{constructor(t=new He,e=new ko){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){ia.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&($c.fromBufferAttribute(u,t),o?ia.addScaledVector($c,h):ia.addScaledVector($c.sub(e),h))}e.add(ia)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qo.copy(n.boundingSphere),Qo.applyMatrix4(r),Ds.copy(t.ray).recast(t.near),!(Qo.containsPoint(Ds.origin)===!1&&(Ds.intersectSphere(Qo,cf)===null||Ds.origin.distanceToSquared(cf)>(t.far-t.near)**2))&&(af.copy(r).invert(),Ds.copy(t.ray).applyMatrix4(af),!(n.boundingBox!==null&&Ds.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ds)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const g=f[m],p=o[g.materialIndex],M=Math.max(g.start,d.start),S=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=M,E=S;v<E;v+=3){const w=a.getX(v),b=a.getX(v+1),L=a.getX(v+2);s=ra(this,p,t,n,l,h,u,w,b,L),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){const M=a.getX(g),S=a.getX(g+1),v=a.getX(g+2);s=ra(this,o,t,n,l,h,u,M,S,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const g=f[m],p=o[g.materialIndex],M=Math.max(g.start,d.start),S=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let v=M,E=S;v<E;v+=3){const w=v,b=v+1,L=v+2;s=ra(this,p,t,n,l,h,u,w,b,L),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){const M=g,S=g+1,v=g+2;s=ra(this,o,t,n,l,h,u,M,S,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function Qg(i,t,e,n,s,r,o,a){let c;if(t.side===Cn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Hi,a),c===null)return null;sa.copy(a),sa.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(sa);return l<e.near||l>e.far?null:{distance:l,point:sa.clone(),object:i}}function ra(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,ta),i.getVertexPosition(c,ea),i.getVertexPosition(l,na);const h=Qg(i,t,e,n,ta,ea,na,lf);if(h){const u=new F;Xn.getBarycoord(lf,ta,ea,na,u),s&&(h.uv=Xn.getInterpolatedAttribute(s,a,c,l,u,new kt)),r&&(h.uv1=Xn.getInterpolatedAttribute(r,a,c,l,u,new kt)),o&&(h.normal=Xn.getInterpolatedAttribute(o,a,c,l,u,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new F,materialIndex:0};Xn.getNormal(ta,ea,na,f.normal),h.face=f,h.barycoord=u}return h}class tn extends He{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Xe(l,3)),this.setAttribute("normal",new Xe(h,3)),this.setAttribute("uv",new Xe(u,2));function m(_,g,p,M,S,v,E,w,b,L,x){const y=v/b,R=E/L,P=v/2,U=E/2,z=w/2,W=b+1,X=L+1;let K=0,G=0;const et=new F;for(let lt=0;lt<X;lt++){const bt=lt*R-U;for(let Ft=0;Ft<W;Ft++){const Yt=Ft*y-P;et[_]=Yt*M,et[g]=bt*S,et[p]=z,l.push(et.x,et.y,et.z),et[_]=0,et[g]=0,et[p]=w>0?1:-1,h.push(et.x,et.y,et.z),u.push(Ft/b),u.push(1-lt/L),K+=1}}for(let lt=0;lt<L;lt++)for(let bt=0;bt<b;bt++){const Ft=f+bt+W*lt,Yt=f+bt+W*(lt+1),se=f+(bt+1)+W*(lt+1),ae=f+(bt+1)+W*lt;c.push(Ft,Yt,ae),c.push(Yt,se,ae),G+=6}a.addGroup(d,G,x),d+=G,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new tn(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function kr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function An(i){const t={};for(let e=0;e<i.length;e++){const n=kr(i[e]);for(const s in n)t[s]=n[s]}return t}function t1(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Fp(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:de.workingColorSpace}const Lh={clone:kr,merge:An};var e1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,n1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class en extends Ti{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=e1,this.fragmentShader=n1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=kr(t.uniforms),this.uniformsGroups=t1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Bp extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ve,this.projectionMatrix=new ve,this.projectionMatrixInverse=new ve,this.coordinateSystem=Si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new F,hf=new kt,uf=new kt;class Wn extends Bp{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ch*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ka*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ch*2*Math.atan(Math.tan(ka*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Qi.x,Qi.y).multiplyScalar(-t/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qi.x,Qi.y).multiplyScalar(-t/Qi.z)}getViewSize(t,e){return this.getViewBounds(t,hf,uf),e.subVectors(uf,hf)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ka*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ar=-90,cr=1;class i1 extends nn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wn(ar,cr,t,e);s.layers=this.layers,this.add(s);const r=new Wn(ar,cr,t,e);r.layers=this.layers,this.add(r);const o=new Wn(ar,cr,t,e);o.layers=this.layers,this.add(o);const a=new Wn(ar,cr,t,e);a.layers=this.layers,this.add(a);const c=new Wn(ar,cr,t,e);c.layers=this.layers,this.add(c);const l=new Wn(ar,cr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===Si)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ka)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class zp extends Sn{constructor(t=[],e=Nr,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class s1 extends ei{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new zp(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new tn(5,5,5),r=new en({name:"CubemapFromEquirect",uniforms:kr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Cn,blending:gs});r.uniforms.tEquirect.value=e;const o=new _e(s,r),a=e.minFilter;return e.minFilter===Vs&&(e.minFilter=yi),new i1(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class Mn extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const r1={type:"move"};class jc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(r1)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Mn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Gp extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ni,this.environmentIntensity=1,this.environmentRotation=new ni,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class o1{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Rh,this.updateRanges=[],this.version=0,this.uuid=vs()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vs()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vs()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wn=new F;class $a{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)wn.fromBufferAttribute(this,e),wn.applyMatrix4(t),this.setXYZ(e,wn.x,wn.y,wn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)wn.fromBufferAttribute(this,e),wn.applyNormalMatrix(t),this.setXYZ(e,wn.x,wn.y,wn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)wn.fromBufferAttribute(this,e),wn.transformDirection(t),this.setXYZ(e,wn.x,wn.y,wn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Mi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ee(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Mi(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Mi(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Mi(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Mi(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array),r=Ee(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ye(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new $a(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Hp extends Ti{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Kt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let lr;const ro=new F,hr=new F,ur=new F,fr=new kt,oo=new kt,Vp=new ve,oa=new F,ao=new F,aa=new F,ff=new kt,Zc=new kt,df=new kt;let a1=class extends nn{constructor(t=new Hp){if(super(),this.isSprite=!0,this.type="Sprite",lr===void 0){lr=new He;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new o1(e,5);lr.setIndex([0,1,2,0,2,3]),lr.setAttribute("position",new $a(n,3,0,!1)),lr.setAttribute("uv",new $a(n,2,3,!1))}this.geometry=lr,this.material=t,this.center=new kt(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),hr.setFromMatrixScale(this.matrixWorld),Vp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ur.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&hr.multiplyScalar(-ur.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;ca(oa.set(-.5,-.5,0),ur,o,hr,s,r),ca(ao.set(.5,-.5,0),ur,o,hr,s,r),ca(aa.set(.5,.5,0),ur,o,hr,s,r),ff.set(0,0),Zc.set(1,0),df.set(1,1);let a=t.ray.intersectTriangle(oa,ao,aa,!1,ro);if(a===null&&(ca(ao.set(-.5,.5,0),ur,o,hr,s,r),Zc.set(0,1),a=t.ray.intersectTriangle(oa,aa,ao,!1,ro),a===null))return;const c=t.ray.origin.distanceTo(ro);c<t.near||c>t.far||e.push({distance:c,point:ro.clone(),uv:Xn.getInterpolation(ro,oa,ao,aa,ff,Zc,df,new kt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function ca(i,t,e,n,s,r){fr.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(oo.x=r*fr.x-s*fr.y,oo.y=s*fr.x+r*fr.y):oo.copy(fr),i.copy(t),i.x+=oo.x,i.y+=oo.y,i.applyMatrix4(Vp)}class c1 extends Sn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=ln,h=ln,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class pf extends ye{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const dr=new ve,mf=new ve,la=[],gf=new Es,l1=new ve,co=new _e,lo=new Wi;class h1 extends _e{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new pf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,l1)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Es),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,dr),gf.copy(t.boundingBox).applyMatrix4(dr),this.boundingBox.union(gf)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Wi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,dr),lo.copy(t.boundingSphere).applyMatrix4(dr),this.boundingSphere.union(lo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(co.geometry=this.geometry,co.material=this.material,co.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),lo.copy(this.boundingSphere),lo.applyMatrix4(n),t.ray.intersectsSphere(lo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,dr),mf.multiplyMatrices(n,dr),co.matrixWorld=mf,co.raycast(t,la);for(let o=0,a=la.length;o<a;o++){const c=la[o];c.instanceId=r,c.object=this,e.push(c)}la.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new pf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new c1(new Float32Array(s*this.count),s,this.count,su,bi));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Jc=new F,u1=new F,f1=new Jt;class Us{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=Jc.subVectors(n,e).cross(u1.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Jc),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||f1.getNormalMatrix(t),s=this.coplanarPoint(Jc).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ps=new Wi,d1=new kt(.5,.5),ha=new F;class uu{constructor(t=new Us,e=new Us,n=new Us,s=new Us,r=new Us,o=new Us){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Si,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],m=r[8],_=r[9],g=r[10],p=r[11],M=r[12],S=r[13],v=r[14],E=r[15];if(s[0].setComponents(l-o,d-h,p-m,E-M).normalize(),s[1].setComponents(l+o,d+h,p+m,E+M).normalize(),s[2].setComponents(l+a,d+u,p+_,E+S).normalize(),s[3].setComponents(l-a,d-u,p-_,E-S).normalize(),n)s[4].setComponents(c,f,g,v).normalize(),s[5].setComponents(l-c,d-f,p-g,E-v).normalize();else if(s[4].setComponents(l-c,d-f,p-g,E-v).normalize(),e===Si)s[5].setComponents(l+c,d+f,p+g,E+v).normalize();else if(e===Ka)s[5].setComponents(c,f,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ps.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ps.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ps)}intersectsSprite(t){Ps.center.set(0,0,0);const e=d1.distanceTo(t.center);return Ps.radius=.7071067811865476+e,Ps.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ps)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(ha.x=s.normal.x>0?t.max.x:t.min.x,ha.y=s.normal.y>0?t.max.y:t.min.y,ha.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ha)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Wp extends Ti{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const ja=new F,Za=new F,_f=new ve,ho=new hu,ua=new Wi,Qc=new F,vf=new F;class p1 extends nn{constructor(t=new He,e=new Wp){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)ja.fromBufferAttribute(e,s-1),Za.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=ja.distanceTo(Za);t.setAttribute("lineDistance",new Xe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ua.copy(n.boundingSphere),ua.applyMatrix4(s),ua.radius+=r,t.ray.intersectsSphere(ua)===!1)return;_f.copy(s).invert(),ho.copy(t.ray).applyMatrix4(_f);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=d,g=m-1;_<g;_+=l){const p=h.getX(_),M=h.getX(_+1),S=fa(this,t,ho,c,p,M,_);S&&e.push(S)}if(this.isLineLoop){const _=h.getX(m-1),g=h.getX(d),p=fa(this,t,ho,c,_,g,m-1);p&&e.push(p)}}else{const d=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let _=d,g=m-1;_<g;_+=l){const p=fa(this,t,ho,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=fa(this,t,ho,c,m-1,d,m-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function fa(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(ja.fromBufferAttribute(a,s),Za.fromBufferAttribute(a,r),e.distanceSqToSegment(ja,Za,Qc,vf)>n)return;Qc.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Qc);if(!(l<t.near||l>t.far))return{distance:l,point:vf.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const xf=new F,Mf=new F;class Xp extends p1{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)xf.fromBufferAttribute(e,s),Mf.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+xf.distanceTo(Mf);t.setAttribute("lineDistance",new Xe(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class m1 extends Ti{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Kt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const yf=new ve,Dh=new hu,da=new Wi,pa=new F;class Yp extends nn{constructor(t=new He,e=new m1){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),da.copy(n.boundingSphere),da.applyMatrix4(s),da.radius+=r,t.ray.intersectsSphere(da)===!1)return;yf.copy(s).invert(),Dh.copy(t.ray).applyMatrix4(yf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let m=f,_=d;m<_;m++){const g=l.getX(m);pa.fromBufferAttribute(u,g),bf(pa,g,c,s,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let m=f,_=d;m<_;m++)pa.fromBufferAttribute(u,m),bf(pa,m,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function bf(i,t,e,n,s,r,o){const a=Dh.distanceSqToPoint(i);if(a<e){const c=new F;Dh.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class fu extends Sn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ja extends Sn{constructor(t,e,n=Ys,s,r,o,a=ln,c=ln,l,h=So,u=1){if(h!==So&&h!==Eo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new cu(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Kp extends Sn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}const ma=new F,ga=new F,tl=new F,_a=new Xn;class g1 extends He{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(ka*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let m=0;m<c;m+=3){o?(l[0]=o.getX(m),l[1]=o.getX(m+1),l[2]=o.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);const{a:_,b:g,c:p}=_a;if(_.fromBufferAttribute(a,l[0]),g.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),_a.getNormal(tl),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let M=0;M<3;M++){const S=(M+1)%3,v=u[M],E=u[S],w=_a[h[M]],b=_a[h[S]],L=`${v}_${E}`,x=`${E}_${v}`;x in f&&f[x]?(tl.dot(f[x].normal)<=r&&(d.push(w.x,w.y,w.z),d.push(b.x,b.y,b.z)),f[x]=null):L in f||(f[L]={index0:l[M],index1:l[S],normal:tl.clone()})}}for(const m in f)if(f[m]){const{index0:_,index1:g}=f[m];ma.fromBufferAttribute(a,_),ga.fromBufferAttribute(a,g),d.push(ma.x,ma.y,ma.z),d.push(ga.x,ga.y,ga.z)}this.setAttribute("position",new Xe(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Fo extends He{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],m=[],_=[],g=[];for(let p=0;p<h;p++){const M=p*f-o;for(let S=0;S<l;S++){const v=S*u-r;m.push(v,-M,0),_.push(0,0,1),g.push(S/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){const S=M+l*p,v=M+l*(p+1),E=M+1+l*(p+1),w=M+1+l*p;d.push(S,v,w),d.push(v,E,w)}this.setIndex(d),this.setAttribute("position",new Xe(m,3)),this.setAttribute("normal",new Xe(_,3)),this.setAttribute("uv",new Xe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fo(t.width,t.height,t.widthSegments,t.heightSegments)}}class du extends He{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new F,f=new F,d=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const M=[],S=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&c===Math.PI&&(v=-.5/e);for(let E=0;E<=e;E++){const w=E/e;u.x=-t*Math.cos(s+w*r)*Math.sin(o+S*a),u.y=t*Math.cos(o+S*a),u.z=t*Math.sin(s+w*r)*Math.sin(o+S*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),g.push(w+v,1-S),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const S=h[p][M+1],v=h[p][M],E=h[p+1][M],w=h[p+1][M+1];(p!==0||o>0)&&d.push(S,v,w),(p!==n-1||c<Math.PI)&&d.push(v,E,w)}this.setIndex(d),this.setAttribute("position",new Xe(m,3)),this.setAttribute("normal",new Xe(_,3)),this.setAttribute("uv",new Xe(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new du(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Er extends en{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class _1 extends Ti{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pc,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class v1 extends Ti{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Kt(16777215),this.specular=new Kt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pc,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Ei extends Ti{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pc,this.normalScale=new kt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ni,this.combine=fc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class qp extends Ti{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Eg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class x1 extends Ti{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class $p extends nn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const el=new ve,Sf=new F,Ef=new F;class M1{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new kt(512,512),this.mapType=pi,this.map=null,this.mapPass=null,this.matrix=new ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new uu,this._frameExtents=new kt(1,1),this._viewportCount=1,this._viewports=[new Oe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Sf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Sf),Ef.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Ef),e.updateMatrixWorld(),el.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(el,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(el)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class mc extends Bp{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class y1 extends M1{constructor(){super(new mc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class jp extends $p{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new y1}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Zp extends $p{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class b1 extends Wn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function wf(i,t,e,n){const s=S1(n);switch(e){case Cp:return i*t;case su:return i*t/s.components*s.byteLength;case ru:return i*t/s.components*s.byteLength;case Dp:return i*t*2/s.components*s.byteLength;case ou:return i*t*2/s.components*s.byteLength;case Lp:return i*t*3/s.components*s.byteLength;case fi:return i*t*4/s.components*s.byteLength;case au:return i*t*4/s.components*s.byteLength;case Ia:case Na:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Ua:case Oa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case eh:case ih:return Math.max(i,16)*Math.max(t,8)/4;case th:case nh:return Math.max(i,8)*Math.max(t,8)/2;case sh:case rh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case oh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ah:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case ch:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case lh:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case hh:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case uh:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case fh:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case dh:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ph:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case mh:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case gh:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case _h:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case vh:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case xh:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Mh:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case yh:case bh:case Sh:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Eh:case wh:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Th:case Ah:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function S1(i){switch(i){case pi:case wp:return{byteLength:1,components:1};case yo:case Tp:case zi:return{byteLength:2,components:1};case nu:case iu:return{byteLength:2,components:4};case Ys:case eu:case bi:return{byteLength:4,components:1};case Ap:case Rp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:tu}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=tu);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Jp(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function E1(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){const m=u[f],_=u[d];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){const _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var w1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,T1=`#ifdef USE_ALPHAHASH
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
#endif`,A1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,R1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,C1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,L1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,D1=`#ifdef USE_AOMAP
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
#endif`,P1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,I1=`#ifdef USE_BATCHING
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
#endif`,N1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,U1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,O1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,k1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,F1=`#ifdef USE_IRIDESCENCE
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
#endif`,B1=`#ifdef USE_BUMPMAP
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
#endif`,z1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,G1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,H1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,V1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,W1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,X1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Y1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,K1=`#if defined( USE_COLOR_ALPHA )
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
#endif`,q1=`#define PI 3.141592653589793
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
} // validated`,$1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,j1=`vec3 transformedNormal = objectNormal;
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
#endif`,Z1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,J1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Q1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,t_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,e_="gl_FragColor = linearToOutputTexel( gl_FragColor );",n_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,i_=`#ifdef USE_ENVMAP
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
#endif`,s_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,r_=`#ifdef USE_ENVMAP
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
#endif`,o_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,a_=`#ifdef USE_ENVMAP
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
#endif`,c_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,l_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,u_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,f_=`#ifdef USE_GRADIENTMAP
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
}`,d_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,p_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,m_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,g_=`uniform bool receiveShadow;
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
#endif`,__=`#ifdef USE_ENVMAP
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
#endif`,v_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,x_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,M_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,y_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,b_=`PhysicalMaterial material;
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
#endif`,S_=`struct PhysicalMaterial {
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
}`,E_=`
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
#endif`,w_=`#if defined( RE_IndirectDiffuse )
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
#endif`,T_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,A_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,R_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,C_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,L_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,D_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,P_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,I_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,N_=`#if defined( USE_POINTS_UV )
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
#endif`,U_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,O_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,k_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,F_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,B_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,z_=`#ifdef USE_MORPHTARGETS
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
#endif`,G_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,V_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,W_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,X_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,K_=`#ifdef USE_NORMALMAP
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
#endif`,q_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,$_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,j_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Z_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,J_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Q_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ev=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,iv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,rv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ov=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,av=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,lv=`float getShadowMask() {
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
}`,hv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uv=`#ifdef USE_SKINNING
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
#endif`,fv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dv=`#ifdef USE_SKINNING
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
#endif`,pv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_v=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,vv=`#ifdef USE_TRANSMISSION
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
#endif`,xv=`#ifdef USE_TRANSMISSION
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
#endif`,Mv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,bv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ev=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,wv=`uniform sampler2D t2D;
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
}`,Tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Av=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Rv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lv=`#include <common>
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
}`,Dv=`#if DEPTH_PACKING == 3200
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
}`,Pv=`#define DISTANCE
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
}`,Iv=`#define DISTANCE
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
}`,Nv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Uv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ov=`uniform float scale;
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
}`,kv=`uniform vec3 diffuse;
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
}`,Fv=`#include <common>
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
}`,Bv=`uniform vec3 diffuse;
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
}`,zv=`#define LAMBERT
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
}`,Gv=`#define LAMBERT
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
}`,Hv=`#define MATCAP
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
}`,Vv=`#define MATCAP
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
}`,Wv=`#define NORMAL
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
}`,Xv=`#define NORMAL
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
}`,Yv=`#define PHONG
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
}`,Kv=`#define PHONG
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
}`,qv=`#define STANDARD
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
}`,$v=`#define STANDARD
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
}`,jv=`#define TOON
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
}`,Zv=`#define TOON
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
}`,Jv=`uniform float size;
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
}`,Qv=`uniform vec3 diffuse;
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
}`,tx=`#include <common>
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
}`,ex=`uniform vec3 color;
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
}`,nx=`uniform float rotation;
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
}`,ix=`uniform vec3 diffuse;
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
}`,te={alphahash_fragment:w1,alphahash_pars_fragment:T1,alphamap_fragment:A1,alphamap_pars_fragment:R1,alphatest_fragment:C1,alphatest_pars_fragment:L1,aomap_fragment:D1,aomap_pars_fragment:P1,batching_pars_vertex:I1,batching_vertex:N1,begin_vertex:U1,beginnormal_vertex:O1,bsdfs:k1,iridescence_fragment:F1,bumpmap_pars_fragment:B1,clipping_planes_fragment:z1,clipping_planes_pars_fragment:G1,clipping_planes_pars_vertex:H1,clipping_planes_vertex:V1,color_fragment:W1,color_pars_fragment:X1,color_pars_vertex:Y1,color_vertex:K1,common:q1,cube_uv_reflection_fragment:$1,defaultnormal_vertex:j1,displacementmap_pars_vertex:Z1,displacementmap_vertex:J1,emissivemap_fragment:Q1,emissivemap_pars_fragment:t_,colorspace_fragment:e_,colorspace_pars_fragment:n_,envmap_fragment:i_,envmap_common_pars_fragment:s_,envmap_pars_fragment:r_,envmap_pars_vertex:o_,envmap_physical_pars_fragment:__,envmap_vertex:a_,fog_vertex:c_,fog_pars_vertex:l_,fog_fragment:h_,fog_pars_fragment:u_,gradientmap_pars_fragment:f_,lightmap_pars_fragment:d_,lights_lambert_fragment:p_,lights_lambert_pars_fragment:m_,lights_pars_begin:g_,lights_toon_fragment:v_,lights_toon_pars_fragment:x_,lights_phong_fragment:M_,lights_phong_pars_fragment:y_,lights_physical_fragment:b_,lights_physical_pars_fragment:S_,lights_fragment_begin:E_,lights_fragment_maps:w_,lights_fragment_end:T_,logdepthbuf_fragment:A_,logdepthbuf_pars_fragment:R_,logdepthbuf_pars_vertex:C_,logdepthbuf_vertex:L_,map_fragment:D_,map_pars_fragment:P_,map_particle_fragment:I_,map_particle_pars_fragment:N_,metalnessmap_fragment:U_,metalnessmap_pars_fragment:O_,morphinstance_vertex:k_,morphcolor_vertex:F_,morphnormal_vertex:B_,morphtarget_pars_vertex:z_,morphtarget_vertex:G_,normal_fragment_begin:H_,normal_fragment_maps:V_,normal_pars_fragment:W_,normal_pars_vertex:X_,normal_vertex:Y_,normalmap_pars_fragment:K_,clearcoat_normal_fragment_begin:q_,clearcoat_normal_fragment_maps:$_,clearcoat_pars_fragment:j_,iridescence_pars_fragment:Z_,opaque_fragment:J_,packing:Q_,premultiplied_alpha_fragment:tv,project_vertex:ev,dithering_fragment:nv,dithering_pars_fragment:iv,roughnessmap_fragment:sv,roughnessmap_pars_fragment:rv,shadowmap_pars_fragment:ov,shadowmap_pars_vertex:av,shadowmap_vertex:cv,shadowmask_pars_fragment:lv,skinbase_vertex:hv,skinning_pars_vertex:uv,skinning_vertex:fv,skinnormal_vertex:dv,specularmap_fragment:pv,specularmap_pars_fragment:mv,tonemapping_fragment:gv,tonemapping_pars_fragment:_v,transmission_fragment:vv,transmission_pars_fragment:xv,uv_pars_fragment:Mv,uv_pars_vertex:yv,uv_vertex:bv,worldpos_vertex:Sv,background_vert:Ev,background_frag:wv,backgroundCube_vert:Tv,backgroundCube_frag:Av,cube_vert:Rv,cube_frag:Cv,depth_vert:Lv,depth_frag:Dv,distanceRGBA_vert:Pv,distanceRGBA_frag:Iv,equirect_vert:Nv,equirect_frag:Uv,linedashed_vert:Ov,linedashed_frag:kv,meshbasic_vert:Fv,meshbasic_frag:Bv,meshlambert_vert:zv,meshlambert_frag:Gv,meshmatcap_vert:Hv,meshmatcap_frag:Vv,meshnormal_vert:Wv,meshnormal_frag:Xv,meshphong_vert:Yv,meshphong_frag:Kv,meshphysical_vert:qv,meshphysical_frag:$v,meshtoon_vert:jv,meshtoon_frag:Zv,points_vert:Jv,points_frag:Qv,shadow_vert:tx,shadow_frag:ex,sprite_vert:nx,sprite_frag:ix},dt={common:{diffuse:{value:new Kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},envMapRotation:{value:new Jt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new kt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Kt(16777215)},opacity:{value:1},center:{value:new kt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},xi={basic:{uniforms:An([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:te.meshbasic_vert,fragmentShader:te.meshbasic_frag},lambert:{uniforms:An([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:te.meshlambert_vert,fragmentShader:te.meshlambert_frag},phong:{uniforms:An([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)},specular:{value:new Kt(1118481)},shininess:{value:30}}]),vertexShader:te.meshphong_vert,fragmentShader:te.meshphong_frag},standard:{uniforms:An([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag},toon:{uniforms:An([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Kt(0)}}]),vertexShader:te.meshtoon_vert,fragmentShader:te.meshtoon_frag},matcap:{uniforms:An([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:te.meshmatcap_vert,fragmentShader:te.meshmatcap_frag},points:{uniforms:An([dt.points,dt.fog]),vertexShader:te.points_vert,fragmentShader:te.points_frag},dashed:{uniforms:An([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:te.linedashed_vert,fragmentShader:te.linedashed_frag},depth:{uniforms:An([dt.common,dt.displacementmap]),vertexShader:te.depth_vert,fragmentShader:te.depth_frag},normal:{uniforms:An([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:te.meshnormal_vert,fragmentShader:te.meshnormal_frag},sprite:{uniforms:An([dt.sprite,dt.fog]),vertexShader:te.sprite_vert,fragmentShader:te.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:te.background_vert,fragmentShader:te.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Jt}},vertexShader:te.backgroundCube_vert,fragmentShader:te.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:te.cube_vert,fragmentShader:te.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:te.equirect_vert,fragmentShader:te.equirect_frag},distanceRGBA:{uniforms:An([dt.common,dt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:te.distanceRGBA_vert,fragmentShader:te.distanceRGBA_frag},shadow:{uniforms:An([dt.lights,dt.fog,{color:{value:new Kt(0)},opacity:{value:1}}]),vertexShader:te.shadow_vert,fragmentShader:te.shadow_frag}};xi.physical={uniforms:An([xi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new kt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new kt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Kt(0)},specularColor:{value:new Kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new kt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:te.meshphysical_vert,fragmentShader:te.meshphysical_frag};const va={r:0,b:0,g:0},Is=new ni,sx=new ve;function rx(i,t,e,n,s,r,o){const a=new Kt(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function m(S){let v=S.isScene===!0?S.background:null;return v&&v.isTexture&&(v=(S.backgroundBlurriness>0?e:t).get(v)),v}function _(S){let v=!1;const E=m(S);E===null?p(a,c):E&&E.isColor&&(p(E,1),v=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,o):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(S,v){const E=m(v);E&&(E.isCubeTexture||E.mapping===dc)?(h===void 0&&(h=new _e(new tn(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:kr(xi.backgroundCube.uniforms),vertexShader:xi.backgroundCube.vertexShader,fragmentShader:xi.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,b,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Is.copy(v.backgroundRotation),Is.x*=-1,Is.y*=-1,Is.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Is.y*=-1,Is.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(sx.makeRotationFromEuler(Is)),h.material.toneMapped=de.getTransfer(E.colorSpace)!==Se,(u!==E||f!==E.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=E,f=E.version,d=i.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new _e(new Fo(2,2),new en({name:"BackgroundMaterial",uniforms:kr(xi.background.uniforms),vertexShader:xi.background.vertexShader,fragmentShader:xi.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=de.getTransfer(E.colorSpace)!==Se,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||f!==E.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=E,f=E.version,d=i.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,v){S.getRGB(va,Fp(i)),n.buffers.color.setClear(va.r,va.g,va.b,v,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,v=1){a.set(S),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(a,c)},render:_,addToRenderList:g,dispose:M}}function ox(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(y,R,P,U,z){let W=!1;const X=u(U,P,R);r!==X&&(r=X,l(r.object)),W=d(y,U,P,z),W&&m(y,U,P,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,v(y,R,P,U),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,R,P){const U=P.wireframe===!0;let z=n[y.id];z===void 0&&(z={},n[y.id]=z);let W=z[R.id];W===void 0&&(W={},z[R.id]=W);let X=W[U];return X===void 0&&(X=f(c()),W[U]=X),X}function f(y){const R=[],P=[],U=[];for(let z=0;z<e;z++)R[z]=0,P[z]=0,U[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:R,enabledAttributes:P,attributeDivisors:U,object:y,attributes:{},index:null}}function d(y,R,P,U){const z=r.attributes,W=R.attributes;let X=0;const K=P.getAttributes();for(const G in K)if(K[G].location>=0){const lt=z[G];let bt=W[G];if(bt===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(bt=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(bt=y.instanceColor)),lt===void 0||lt.attribute!==bt||bt&&lt.data!==bt.data)return!0;X++}return r.attributesNum!==X||r.index!==U}function m(y,R,P,U){const z={},W=R.attributes;let X=0;const K=P.getAttributes();for(const G in K)if(K[G].location>=0){let lt=W[G];lt===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(lt=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(lt=y.instanceColor));const bt={};bt.attribute=lt,lt&&lt.data&&(bt.data=lt.data),z[G]=bt,X++}r.attributes=z,r.attributesNum=X,r.index=U}function _(){const y=r.newAttributes;for(let R=0,P=y.length;R<P;R++)y[R]=0}function g(y){p(y,0)}function p(y,R){const P=r.newAttributes,U=r.enabledAttributes,z=r.attributeDivisors;P[y]=1,U[y]===0&&(i.enableVertexAttribArray(y),U[y]=1),z[y]!==R&&(i.vertexAttribDivisor(y,R),z[y]=R)}function M(){const y=r.newAttributes,R=r.enabledAttributes;for(let P=0,U=R.length;P<U;P++)R[P]!==y[P]&&(i.disableVertexAttribArray(P),R[P]=0)}function S(y,R,P,U,z,W,X){X===!0?i.vertexAttribIPointer(y,R,P,z,W):i.vertexAttribPointer(y,R,P,U,z,W)}function v(y,R,P,U){_();const z=U.attributes,W=P.getAttributes(),X=R.defaultAttributeValues;for(const K in W){const G=W[K];if(G.location>=0){let et=z[K];if(et===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(et=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(et=y.instanceColor)),et!==void 0){const lt=et.normalized,bt=et.itemSize,Ft=t.get(et);if(Ft===void 0)continue;const Yt=Ft.buffer,se=Ft.type,ae=Ft.bytesPerElement,tt=se===i.INT||se===i.UNSIGNED_INT||et.gpuType===eu;if(et.isInterleavedBufferAttribute){const it=et.data,xt=it.stride,Ut=et.offset;if(it.isInstancedInterleavedBuffer){for(let _t=0;_t<G.locationSize;_t++)p(G.location+_t,it.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=it.meshPerAttribute*it.count)}else for(let _t=0;_t<G.locationSize;_t++)g(G.location+_t);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let _t=0;_t<G.locationSize;_t++)S(G.location+_t,bt/G.locationSize,se,lt,xt*ae,(Ut+bt/G.locationSize*_t)*ae,tt)}else{if(et.isInstancedBufferAttribute){for(let it=0;it<G.locationSize;it++)p(G.location+it,et.meshPerAttribute);y.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=et.meshPerAttribute*et.count)}else for(let it=0;it<G.locationSize;it++)g(G.location+it);i.bindBuffer(i.ARRAY_BUFFER,Yt);for(let it=0;it<G.locationSize;it++)S(G.location+it,bt/G.locationSize,se,lt,bt*ae,bt/G.locationSize*it*ae,tt)}}else if(X!==void 0){const lt=X[K];if(lt!==void 0)switch(lt.length){case 2:i.vertexAttrib2fv(G.location,lt);break;case 3:i.vertexAttrib3fv(G.location,lt);break;case 4:i.vertexAttrib4fv(G.location,lt);break;default:i.vertexAttrib1fv(G.location,lt)}}}}M()}function E(){L();for(const y in n){const R=n[y];for(const P in R){const U=R[P];for(const z in U)h(U[z].object),delete U[z];delete R[P]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;const R=n[y.id];for(const P in R){const U=R[P];for(const z in U)h(U[z].object),delete U[z];delete R[P]}delete n[y.id]}function b(y){for(const R in n){const P=n[R];if(P[y.id]===void 0)continue;const U=P[y.id];for(const z in U)h(U[z].object),delete U[z];delete P[y.id]}}function L(){x(),o=!0,r!==s&&(r=s,l(r.object))}function x(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:x,dispose:E,releaseStatesOfGeometry:w,releaseStatesOfProgram:b,initAttributes:_,enableAttribute:g,disableUnusedAttributes:M}}function ax(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<l.length;m++)o(l[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*f[_];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function cx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(b){return!(b!==fi&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(b){const L=b===zi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==pi&&n.convert(b)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==bi&&!L)}function c(b){if(b==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),S=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=m>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:S,maxFragmentUniforms:v,vertexTextures:E,maxSamples:w}}function lx(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Us,a=new Jt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{const M=r?0:n,S=M*4;let v=p.clippingState||null;c.value=v,v=h(m,f,S,d);for(let E=0;E!==S;++E)v[E]=e[E];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=d+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let S=0,v=d;S!==_;++S,v+=4)o.copy(u[S]).applyMatrix4(M,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function hx(i){let t=new WeakMap;function e(o,a){return a===jl?o.mapping=Nr:a===Zl&&(o.mapping=Ur),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===jl||a===Zl)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new s1(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const wr=4,Tf=[.125,.215,.35,.446,.526,.582],Fs=20,nl=new mc,Af=new Kt;let il=null,sl=0,rl=0,ol=!1;const Os=(1+Math.sqrt(5))/2,pr=1/Os,Rf=[new F(-Os,pr,0),new F(Os,pr,0),new F(-pr,0,Os),new F(pr,0,Os),new F(0,Os,-pr),new F(0,Os,pr),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],ux=new F;class Cf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=ux}=r;il=this._renderer.getRenderTarget(),sl=this._renderer.getActiveCubeFace(),rl=this._renderer.getActiveMipmapLevel(),ol=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Pf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Df(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(il,sl,rl),this._renderer.xr.enabled=ol,t.scissorTest=!1,xa(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Nr||t.mapping===Ur?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),il=this._renderer.getRenderTarget(),sl=this._renderer.getActiveCubeFace(),rl=this._renderer.getActiveMipmapLevel(),ol=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:yi,minFilter:yi,generateMipmaps:!1,type:zi,format:fi,colorSpace:Or,depthBuffer:!1},s=Lf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lf(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=fx(r)),this._blurMaterial=dx(r,t,e)}return s}_compileMaterial(t){const e=new _e(this._lodPlanes[0],t);this._renderer.compile(e,nl)}_sceneToCubeUV(t,e,n,s,r){const c=new Wn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Af),u.toneMapping=_s,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const _=new ko({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1}),g=new _e(new tn,_);let p=!1;const M=t.background;M?M.isColor&&(_.color.copy(M),t.background=null,p=!0):(_.color.copy(Af),p=!0);for(let S=0;S<6;S++){const v=S%3;v===0?(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[S],r.y,r.z)):v===1?(c.up.set(0,0,l[S]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[S],r.z)):(c.up.set(0,l[S],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[S]));const E=this._cubeSize;xa(s,v*E,S>2?E:0,E,E),u.setRenderTarget(s),p&&u.render(g,c),u.render(t,c)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Nr||t.mapping===Ur;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Pf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Df());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new _e(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;xa(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,nl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Rf[(s-r-1)%Rf.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new _e(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Fs-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):Fs;g>Fs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Fs}`);const p=[];let M=0;for(let b=0;b<Fs;++b){const L=b/_,x=Math.exp(-L*L/2);p.push(x),b===0?M+=x:b<g&&(M+=2*x)}for(let b=0;b<p.length;b++)p[b]=p[b]/M;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:S}=this;f.dTheta.value=m,f.mipInt.value=S-n;const v=this._sizeLods[s],E=3*v*(s>S-wr?s-S+wr:0),w=4*(this._cubeSize-v);xa(e,E,w,3*v,2*v),c.setRenderTarget(e),c.render(u,nl)}}function fx(i){const t=[],e=[],n=[];let s=i;const r=i-wr+1+Tf.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-wr?c=Tf[o-i+wr-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,_=3,g=2,p=1,M=new Float32Array(_*m*d),S=new Float32Array(g*m*d),v=new Float32Array(p*m*d);for(let w=0;w<d;w++){const b=w%3*2/3-1,L=w>2?0:-1,x=[b,L,0,b+2/3,L,0,b+2/3,L+1,0,b,L,0,b+2/3,L+1,0,b,L+1,0];M.set(x,_*m*w),S.set(f,g*m*w);const y=[w,w,w,w,w,w];v.set(y,p*m*w)}const E=new He;E.setAttribute("position",new ye(M,_)),E.setAttribute("uv",new ye(S,g)),E.setAttribute("faceIndex",new ye(v,p)),t.push(E),s>wr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Lf(i,t,e){const n=new ei(i,t,e);return n.texture.mapping=dc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function xa(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function dx(i,t,e){const n=new Float32Array(Fs),s=new F(0,1,0);return new en({name:"SphericalGaussianBlur",defines:{n:Fs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:pu(),fragmentShader:`

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
		`,blending:gs,depthTest:!1,depthWrite:!1})}function Df(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pu(),fragmentShader:`

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
		`,blending:gs,depthTest:!1,depthWrite:!1})}function Pf(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:gs,depthTest:!1,depthWrite:!1})}function pu(){return`

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
	`}function px(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===jl||c===Zl,h=c===Nr||c===Ur;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new Cf(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new Cf(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function mx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&wo("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function gx(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const m in f.attributes)t.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,m=u.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let S=0,v=M.length;S<v;S+=3){const E=M[S+0],w=M[S+1],b=M[S+2];f.push(E,w,w,b,b,E)}}else if(m!==void 0){const M=m.array;_=m.version;for(let S=0,v=M.length/3-1;S<v;S+=3){const E=S+0,w=S+1,b=S+2;f.push(E,w,w,b,b,E)}}else return;const g=new(Ip(f)?kp:Op)(f,1);g.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function _x(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,f*o,m),e.update(d,n,m))}function h(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];e.update(g,n,1)}function u(f,d,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,m);let p=0;for(let M=0;M<m;M++)p+=d[M]*_[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function vx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function xx(i,t,e){const n=new WeakMap,s=new Oe;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let x=function(){b.dispose(),n.delete(a),a.removeEventListener("dispose",x)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let S=0;d===!0&&(S=1),m===!0&&(S=2),_===!0&&(S=3);let v=a.attributes.position.count*S,E=1;v>t.maxTextureSize&&(E=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const w=new Float32Array(v*E*4*u),b=new lu(w,v,E,u);b.type=bi,b.needsUpdate=!0;const L=S*4;for(let y=0;y<u;y++){const R=g[y],P=p[y],U=M[y],z=v*E*4*y;for(let W=0;W<R.count;W++){const X=W*L;d===!0&&(s.fromBufferAttribute(R,W),w[z+X+0]=s.x,w[z+X+1]=s.y,w[z+X+2]=s.z,w[z+X+3]=0),m===!0&&(s.fromBufferAttribute(P,W),w[z+X+4]=s.x,w[z+X+5]=s.y,w[z+X+6]=s.z,w[z+X+7]=0),_===!0&&(s.fromBufferAttribute(U,W),w[z+X+8]=s.x,w[z+X+9]=s.y,w[z+X+10]=s.z,w[z+X+11]=U.itemSize===4?s.w:1)}}f={count:u,texture:b,size:new kt(v,E)},n.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const m=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Mx(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const Qp=new Sn,If=new Ja(1,1),t0=new lu,e0=new Hg,n0=new zp,Nf=[],Uf=[],Of=new Float32Array(16),kf=new Float32Array(9),Ff=new Float32Array(4);function Zr(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Nf[s];if(r===void 0&&(r=new Float32Array(s),Nf[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function sn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function rn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function gc(i,t){let e=Uf[t];e===void 0&&(e=new Int32Array(t),Uf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function yx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function bx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(sn(e,t))return;i.uniform2fv(this.addr,t),rn(e,t)}}function Sx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(sn(e,t))return;i.uniform3fv(this.addr,t),rn(e,t)}}function Ex(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(sn(e,t))return;i.uniform4fv(this.addr,t),rn(e,t)}}function wx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),rn(e,t)}else{if(sn(e,n))return;Ff.set(n),i.uniformMatrix2fv(this.addr,!1,Ff),rn(e,n)}}function Tx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),rn(e,t)}else{if(sn(e,n))return;kf.set(n),i.uniformMatrix3fv(this.addr,!1,kf),rn(e,n)}}function Ax(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),rn(e,t)}else{if(sn(e,n))return;Of.set(n),i.uniformMatrix4fv(this.addr,!1,Of),rn(e,n)}}function Rx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Cx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(sn(e,t))return;i.uniform2iv(this.addr,t),rn(e,t)}}function Lx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(sn(e,t))return;i.uniform3iv(this.addr,t),rn(e,t)}}function Dx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(sn(e,t))return;i.uniform4iv(this.addr,t),rn(e,t)}}function Px(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ix(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(sn(e,t))return;i.uniform2uiv(this.addr,t),rn(e,t)}}function Nx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(sn(e,t))return;i.uniform3uiv(this.addr,t),rn(e,t)}}function Ux(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(sn(e,t))return;i.uniform4uiv(this.addr,t),rn(e,t)}}function Ox(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(If.compareFunction=Pp,r=If):r=Qp,e.setTexture2D(t||r,s)}function kx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||e0,s)}function Fx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||n0,s)}function Bx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||t0,s)}function zx(i){switch(i){case 5126:return yx;case 35664:return bx;case 35665:return Sx;case 35666:return Ex;case 35674:return wx;case 35675:return Tx;case 35676:return Ax;case 5124:case 35670:return Rx;case 35667:case 35671:return Cx;case 35668:case 35672:return Lx;case 35669:case 35673:return Dx;case 5125:return Px;case 36294:return Ix;case 36295:return Nx;case 36296:return Ux;case 35678:case 36198:case 36298:case 36306:case 35682:return Ox;case 35679:case 36299:case 36307:return kx;case 35680:case 36300:case 36308:case 36293:return Fx;case 36289:case 36303:case 36311:case 36292:return Bx}}function Gx(i,t){i.uniform1fv(this.addr,t)}function Hx(i,t){const e=Zr(t,this.size,2);i.uniform2fv(this.addr,e)}function Vx(i,t){const e=Zr(t,this.size,3);i.uniform3fv(this.addr,e)}function Wx(i,t){const e=Zr(t,this.size,4);i.uniform4fv(this.addr,e)}function Xx(i,t){const e=Zr(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function Yx(i,t){const e=Zr(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Kx(i,t){const e=Zr(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function qx(i,t){i.uniform1iv(this.addr,t)}function $x(i,t){i.uniform2iv(this.addr,t)}function jx(i,t){i.uniform3iv(this.addr,t)}function Zx(i,t){i.uniform4iv(this.addr,t)}function Jx(i,t){i.uniform1uiv(this.addr,t)}function Qx(i,t){i.uniform2uiv(this.addr,t)}function tM(i,t){i.uniform3uiv(this.addr,t)}function eM(i,t){i.uniform4uiv(this.addr,t)}function nM(i,t,e){const n=this.cache,s=t.length,r=gc(e,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Qp,r[o])}function iM(i,t,e){const n=this.cache,s=t.length,r=gc(e,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||e0,r[o])}function sM(i,t,e){const n=this.cache,s=t.length,r=gc(e,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||n0,r[o])}function rM(i,t,e){const n=this.cache,s=t.length,r=gc(e,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||t0,r[o])}function oM(i){switch(i){case 5126:return Gx;case 35664:return Hx;case 35665:return Vx;case 35666:return Wx;case 35674:return Xx;case 35675:return Yx;case 35676:return Kx;case 5124:case 35670:return qx;case 35667:case 35671:return $x;case 35668:case 35672:return jx;case 35669:case 35673:return Zx;case 5125:return Jx;case 36294:return Qx;case 36295:return tM;case 36296:return eM;case 35678:case 36198:case 36298:case 36306:case 35682:return nM;case 35679:case 36299:case 36307:return iM;case 35680:case 36300:case 36308:case 36293:return sM;case 36289:case 36303:case 36311:case 36292:return rM}}class aM{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=zx(e.type)}}class cM{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=oM(e.type)}}class lM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const al=/(\w+)(\])?(\[|\.)?/g;function Bf(i,t){i.seq.push(t),i.map[t.id]=t}function hM(i,t,e){const n=i.name,s=n.length;for(al.lastIndex=0;;){const r=al.exec(n),o=al.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Bf(e,l===void 0?new aM(a,i,t):new cM(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new lM(a),Bf(e,u)),e=u}}}class Fa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);hM(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function zf(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const uM=37297;let fM=0;function dM(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const Gf=new Jt;function pM(i){de._getMatrix(Gf,de.workingColorSpace,i);const t=`mat3( ${Gf.elements.map(e=>e.toFixed(4))} )`;switch(de.getTransfer(i)){case Ya:return[t,"LinearTransferOETF"];case Se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Hf(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+dM(i.getShaderSource(t),a)}else return r}function mM(i,t){const e=pM(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function gM(i,t){let e;switch(t){case gg:e="Linear";break;case _g:e="Reinhard";break;case vg:e="Cineon";break;case xg:e="ACESFilmic";break;case yg:e="AgX";break;case bg:e="Neutral";break;case Mg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Ma=new F;function _M(){de.getLuminanceCoefficients(Ma);const i=Ma.x.toFixed(4),t=Ma.y.toFixed(4),e=Ma.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(mo).join(`
`)}function xM(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function MM(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function mo(i){return i!==""}function Vf(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Wf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const yM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ph(i){return i.replace(yM,SM)}const bM=new Map;function SM(i,t){let e=te[t];if(e===void 0){const n=bM.get(t);if(n!==void 0)e=te[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ph(e)}const EM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xf(i){return i.replace(EM,wM)}function wM(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Yf(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function TM(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Sp?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===$m?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ui&&(t="SHADOWMAP_TYPE_VSM"),t}function AM(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Nr:case Ur:t="ENVMAP_TYPE_CUBE";break;case dc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function RM(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Ur:t="ENVMAP_MODE_REFRACTION";break}return t}function CM(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case fc:t="ENVMAP_BLENDING_MULTIPLY";break;case pg:t="ENVMAP_BLENDING_MIX";break;case mg:t="ENVMAP_BLENDING_ADD";break}return t}function LM(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function DM(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=TM(e),l=AM(e),h=RM(e),u=CM(e),f=LM(e),d=vM(e),m=xM(r),_=s.createProgram();let g,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(mo).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(mo).join(`
`),p.length>0&&(p+=`
`)):(g=[Yf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(mo).join(`
`),p=[Yf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==_s?"#define TONE_MAPPING":"",e.toneMapping!==_s?te.tonemapping_pars_fragment:"",e.toneMapping!==_s?gM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",te.colorspace_pars_fragment,mM("linearToOutputTexel",e.outputColorSpace),_M(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(mo).join(`
`)),o=Ph(o),o=Vf(o,e),o=Wf(o,e),a=Ph(a),a=Vf(a,e),a=Wf(a,e),o=Xf(o),a=Xf(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===us?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===us?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const S=M+g+o,v=M+p+a,E=zf(s,s.VERTEX_SHADER,S),w=zf(s,s.FRAGMENT_SHADER,v);s.attachShader(_,E),s.attachShader(_,w),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function b(R){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(_)||"",U=s.getShaderInfoLog(E)||"",z=s.getShaderInfoLog(w)||"",W=P.trim(),X=U.trim(),K=z.trim();let G=!0,et=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,w);else{const lt=Hf(s,E,"vertex"),bt=Hf(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+W+`
`+lt+`
`+bt)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(X===""||K==="")&&(et=!1);et&&(R.diagnostics={runnable:G,programLog:W,vertexShader:{log:X,prefix:g},fragmentShader:{log:K,prefix:p}})}s.deleteShader(E),s.deleteShader(w),L=new Fa(s,_),x=MM(s,_)}let L;this.getUniforms=function(){return L===void 0&&b(this),L};let x;this.getAttributes=function(){return x===void 0&&b(this),x};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,uM)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=fM++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=w,this}let PM=0;class IM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new NM(t),e.set(t,n)),n}}class NM{constructor(t){this.id=PM++,this.code=t,this.usedTimes=0}}function UM(i,t,e,n,s,r,o){const a=new Np,c=new IM,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function g(x,y,R,P,U){const z=P.fog,W=U.geometry,X=x.isMeshStandardMaterial?P.environment:null,K=(x.isMeshStandardMaterial?e:t).get(x.envMap||X),G=K&&K.mapping===dc?K.image.height:null,et=m[x.type];x.precision!==null&&(d=s.getMaxPrecision(x.precision),d!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const lt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,bt=lt!==void 0?lt.length:0;let Ft=0;W.morphAttributes.position!==void 0&&(Ft=1),W.morphAttributes.normal!==void 0&&(Ft=2),W.morphAttributes.color!==void 0&&(Ft=3);let Yt,se,ae,tt;if(et){const me=xi[et];Yt=me.vertexShader,se=me.fragmentShader}else Yt=x.vertexShader,se=x.fragmentShader,c.update(x),ae=c.getVertexShaderID(x),tt=c.getFragmentShaderID(x);const it=i.getRenderTarget(),xt=i.state.buffers.depth.getReversed(),Ut=U.isInstancedMesh===!0,_t=U.isBatchedMesh===!0,le=!!x.map,pn=!!x.matcap,k=!!K,Le=!!x.aoMap,$t=!!x.lightMap,Vt=!!x.bumpMap,At=!!x.normalMap,De=!!x.displacementMap,Rt=!!x.emissiveMap,Qt=!!x.metalnessMap,an=!!x.roughnessMap,ze=x.anisotropy>0,I=x.clearcoat>0,T=x.dispersion>0,Y=x.iridescence>0,Q=x.sheen>0,st=x.transmission>0,Z=ze&&!!x.anisotropyMap,Pt=I&&!!x.clearcoatMap,ht=I&&!!x.clearcoatNormalMap,Ct=I&&!!x.clearcoatRoughnessMap,Lt=Y&&!!x.iridescenceMap,at=Y&&!!x.iridescenceThicknessMap,vt=Q&&!!x.sheenColorMap,Gt=Q&&!!x.sheenRoughnessMap,Dt=!!x.specularMap,mt=!!x.specularColorMap,Zt=!!x.specularIntensityMap,B=st&&!!x.transmissionMap,ct=st&&!!x.thicknessMap,ut=!!x.gradientMap,St=!!x.alphaMap,rt=x.alphaTest>0,nt=!!x.alphaHash,wt=!!x.extensions;let qt=_s;x.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(qt=i.toneMapping);const Ae={shaderID:et,shaderType:x.type,shaderName:x.name,vertexShader:Yt,fragmentShader:se,defines:x.defines,customVertexShaderID:ae,customFragmentShaderID:tt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:_t,batchingColor:_t&&U._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&U.instanceColor!==null,instancingMorph:Ut&&U.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:it===null?i.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Or,alphaToCoverage:!!x.alphaToCoverage,map:le,matcap:pn,envMap:k,envMapMode:k&&K.mapping,envMapCubeUVHeight:G,aoMap:Le,lightMap:$t,bumpMap:Vt,normalMap:At,displacementMap:f&&De,emissiveMap:Rt,normalMapObjectSpace:At&&x.normalMapType===Tg,normalMapTangentSpace:At&&x.normalMapType===pc,metalnessMap:Qt,roughnessMap:an,anisotropy:ze,anisotropyMap:Z,clearcoat:I,clearcoatMap:Pt,clearcoatNormalMap:ht,clearcoatRoughnessMap:Ct,dispersion:T,iridescence:Y,iridescenceMap:Lt,iridescenceThicknessMap:at,sheen:Q,sheenColorMap:vt,sheenRoughnessMap:Gt,specularMap:Dt,specularColorMap:mt,specularIntensityMap:Zt,transmission:st,transmissionMap:B,thicknessMap:ct,gradientMap:ut,opaque:x.transparent===!1&&x.blending===Lr&&x.alphaToCoverage===!1,alphaMap:St,alphaTest:rt,alphaHash:nt,combine:x.combine,mapUv:le&&_(x.map.channel),aoMapUv:Le&&_(x.aoMap.channel),lightMapUv:$t&&_(x.lightMap.channel),bumpMapUv:Vt&&_(x.bumpMap.channel),normalMapUv:At&&_(x.normalMap.channel),displacementMapUv:De&&_(x.displacementMap.channel),emissiveMapUv:Rt&&_(x.emissiveMap.channel),metalnessMapUv:Qt&&_(x.metalnessMap.channel),roughnessMapUv:an&&_(x.roughnessMap.channel),anisotropyMapUv:Z&&_(x.anisotropyMap.channel),clearcoatMapUv:Pt&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:ht&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ct&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:at&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Gt&&_(x.sheenRoughnessMap.channel),specularMapUv:Dt&&_(x.specularMap.channel),specularColorMapUv:mt&&_(x.specularColorMap.channel),specularIntensityMapUv:Zt&&_(x.specularIntensityMap.channel),transmissionMapUv:B&&_(x.transmissionMap.channel),thicknessMapUv:ct&&_(x.thicknessMap.channel),alphaMapUv:St&&_(x.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(At||ze),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!W.attributes.uv&&(le||St),fog:!!z,useFog:x.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:xt,skinning:U.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:bt,morphTextureStride:Ft,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&R.length>0,shadowMapType:i.shadowMap.type,toneMapping:qt,decodeVideoTexture:le&&x.map.isVideoTexture===!0&&de.getTransfer(x.map.colorSpace)===Se,decodeVideoTextureEmissive:Rt&&x.emissiveMap.isVideoTexture===!0&&de.getTransfer(x.emissiveMap.colorSpace)===Se,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Jn,flipSided:x.side===Cn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:wt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(wt&&x.extensions.multiDraw===!0||_t)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ae.vertexUv1s=l.has(1),Ae.vertexUv2s=l.has(2),Ae.vertexUv3s=l.has(3),l.clear(),Ae}function p(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const R in x.defines)y.push(R),y.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(M(y,x),S(y,x),y.push(i.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function M(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function S(x,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),x.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),x.push(a.mask)}function v(x){const y=m[x.type];let R;if(y){const P=xi[y];R=Lh.clone(P.uniforms)}else R=x.uniforms;return R}function E(x,y){let R;for(let P=0,U=h.length;P<U;P++){const z=h[P];if(z.cacheKey===y){R=z,++R.usedTimes;break}}return R===void 0&&(R=new DM(i,y,x,r),h.push(R)),R}function w(x){if(--x.usedTimes===0){const y=h.indexOf(x);h[y]=h[h.length-1],h.pop(),x.destroy()}}function b(x){c.remove(x)}function L(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:E,releaseProgram:w,releaseShaderCache:b,programs:h,dispose:L}}function OM(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function kM(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Kf(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function qf(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,m,_,g){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=_,p.group=g),t++,p}function a(u,f,d,m,_,g){const p=o(u,f,d,m,_,g);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,m,_,g){const p=o(u,f,d,m,_,g);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||kM),n.length>1&&n.sort(f||Kf),s.length>1&&s.sort(f||Kf)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function FM(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new qf,i.set(n,[o])):s>=r.length?(o=new qf,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function BM(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new Kt};break;case"SpotLight":e={position:new F,direction:new F,color:new Kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new Kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new Kt,groundColor:new Kt};break;case"RectAreaLight":e={color:new Kt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function zM(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new kt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let GM=0;function HM(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function VM(i){const t=new BM,e=zM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const s=new F,r=new ve,o=new ve;function a(l){let h=0,u=0,f=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let d=0,m=0,_=0,g=0,p=0,M=0,S=0,v=0,E=0,w=0,b=0;l.sort(HM);for(let x=0,y=l.length;x<y;x++){const R=l[x],P=R.color,U=R.intensity,z=R.distance,W=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)h+=P.r*U,u+=P.g*U,f+=P.b*U;else if(R.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(R.sh.coefficients[X],U);b++}else if(R.isDirectionalLight){const X=t.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const K=R.shadow,G=e.get(R);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=W,n.directionalShadowMatrix[d]=R.shadow.matrix,M++}n.directional[d]=X,d++}else if(R.isSpotLight){const X=t.get(R);X.position.setFromMatrixPosition(R.matrixWorld),X.color.copy(P).multiplyScalar(U),X.distance=z,X.coneCos=Math.cos(R.angle),X.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),X.decay=R.decay,n.spot[_]=X;const K=R.shadow;if(R.map&&(n.spotLightMap[E]=R.map,E++,K.updateMatrices(R),R.castShadow&&w++),n.spotLightMatrix[_]=K.matrix,R.castShadow){const G=e.get(R);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=W,v++}_++}else if(R.isRectAreaLight){const X=t.get(R);X.color.copy(P).multiplyScalar(U),X.halfWidth.set(R.width*.5,0,0),X.halfHeight.set(0,R.height*.5,0),n.rectArea[g]=X,g++}else if(R.isPointLight){const X=t.get(R);if(X.color.copy(R.color).multiplyScalar(R.intensity),X.distance=R.distance,X.decay=R.decay,R.castShadow){const K=R.shadow,G=e.get(R);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,G.shadowCameraNear=K.camera.near,G.shadowCameraFar=K.camera.far,n.pointShadow[m]=G,n.pointShadowMap[m]=W,n.pointShadowMatrix[m]=R.shadow.matrix,S++}n.point[m]=X,m++}else if(R.isHemisphereLight){const X=t.get(R);X.skyColor.copy(R.color).multiplyScalar(U),X.groundColor.copy(R.groundColor).multiplyScalar(U),n.hemi[p]=X,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==d||L.pointLength!==m||L.spotLength!==_||L.rectAreaLength!==g||L.hemiLength!==p||L.numDirectionalShadows!==M||L.numPointShadows!==S||L.numSpotShadows!==v||L.numSpotMaps!==E||L.numLightProbes!==b)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=v+E-w,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=b,L.directionalLength=d,L.pointLength=m,L.spotLength=_,L.rectAreaLength=g,L.hemiLength=p,L.numDirectionalShadows=M,L.numPointShadows=S,L.numSpotShadows=v,L.numSpotMaps=E,L.numLightProbes=b,n.version=GM++)}function c(l,h){let u=0,f=0,d=0,m=0,_=0;const g=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const S=l[p];if(S.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),u++}else if(S.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(S.matrixWorld),s.setFromMatrixPosition(S.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),d++}else if(S.isRectAreaLight){const v=n.rectArea[m];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(S.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(S.width*.5,0,0),v.halfHeight.set(0,S.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(S.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(S.matrixWorld),v.position.applyMatrix4(g),f++}else if(S.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(S.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function $f(i){const t=new VM(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function WM(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new $f(i),t.set(s,[a])):r>=o.length?(a=new $f(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const XM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,YM=`uniform sampler2D shadow_pass;
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
}`;function KM(i,t,e){let n=new uu;const s=new kt,r=new kt,o=new Oe,a=new qp({depthPacking:wg}),c=new x1,l={},h=e.maxTextureSize,u={[Hi]:Cn,[Cn]:Hi,[Jn]:Jn},f=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new kt},radius:{value:4}},vertexShader:XM,fragmentShader:YM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const m=new He;m.setAttribute("position",new ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new _e(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sp;let p=this.type;this.render=function(w,b,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||w.length===0)return;const x=i.getRenderTarget(),y=i.getActiveCubeFace(),R=i.getActiveMipmapLevel(),P=i.state;P.setBlending(gs),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const U=p!==Ui&&this.type===Ui,z=p===Ui&&this.type!==Ui;for(let W=0,X=w.length;W<X;W++){const K=w[W],G=K.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const et=G.getFrameExtents();if(s.multiply(et),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/et.x),s.x=r.x*et.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/et.y),s.y=r.y*et.y,G.mapSize.y=r.y)),G.map===null||U===!0||z===!0){const bt=this.type!==Ui?{minFilter:ln,magFilter:ln}:{};G.map!==null&&G.map.dispose(),G.map=new ei(s.x,s.y,bt),G.map.texture.name=K.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const lt=G.getViewportCount();for(let bt=0;bt<lt;bt++){const Ft=G.getViewport(bt);o.set(r.x*Ft.x,r.y*Ft.y,r.x*Ft.z,r.y*Ft.w),P.viewport(o),G.updateMatrices(K,bt),n=G.getFrustum(),v(b,L,G.camera,K,this.type)}G.isPointLightShadow!==!0&&this.type===Ui&&M(G,L),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(x,y,R)};function M(w,b){const L=t.update(_);f.defines.VSM_SAMPLES!==w.blurSamples&&(f.defines.VSM_SAMPLES=w.blurSamples,d.defines.VSM_SAMPLES=w.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ei(s.x,s.y)),f.uniforms.shadow_pass.value=w.map.texture,f.uniforms.resolution.value=w.mapSize,f.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(b,null,L,f,_,null),d.uniforms.shadow_pass.value=w.mapPass.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(b,null,L,d,_,null)}function S(w,b,L,x){let y=null;const R=L.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(R!==void 0)y=R;else if(y=L.isPointLight===!0?c:a,i.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){const P=y.uuid,U=b.uuid;let z=l[P];z===void 0&&(z={},l[P]=z);let W=z[U];W===void 0&&(W=y.clone(),z[U]=W,b.addEventListener("dispose",E)),y=W}if(y.visible=b.visible,y.wireframe=b.wireframe,x===Ui?y.side=b.shadowSide!==null?b.shadowSide:b.side:y.side=b.shadowSide!==null?b.shadowSide:u[b.side],y.alphaMap=b.alphaMap,y.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,y.map=b.map,y.clipShadows=b.clipShadows,y.clippingPlanes=b.clippingPlanes,y.clipIntersection=b.clipIntersection,y.displacementMap=b.displacementMap,y.displacementScale=b.displacementScale,y.displacementBias=b.displacementBias,y.wireframeLinewidth=b.wireframeLinewidth,y.linewidth=b.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const P=i.properties.get(y);P.light=L}return y}function v(w,b,L,x,y){if(w.visible===!1)return;if(w.layers.test(b.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===Ui)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,w.matrixWorld);const U=t.update(w),z=w.material;if(Array.isArray(z)){const W=U.groups;for(let X=0,K=W.length;X<K;X++){const G=W[X],et=z[G.materialIndex];if(et&&et.visible){const lt=S(w,et,x,y);w.onBeforeShadow(i,w,b,L,U,lt,G),i.renderBufferDirect(L,null,U,lt,w,G),w.onAfterShadow(i,w,b,L,U,lt,G)}}}else if(z.visible){const W=S(w,z,x,y);w.onBeforeShadow(i,w,b,L,U,W,null),i.renderBufferDirect(L,null,U,W,w,null),w.onAfterShadow(i,w,b,L,U,W,null)}}const P=w.children;for(let U=0,z=P.length;U<z;U++)v(P[U],b,L,x,y)}function E(w){w.target.removeEventListener("dispose",E);for(const L in l){const x=l[L],y=w.target.uuid;y in x&&(x[y].dispose(),delete x[y])}}}const qM={[Vl]:Wl,[Xl]:ql,[Yl]:$l,[Ir]:Kl,[Wl]:Vl,[ql]:Xl,[$l]:Yl,[Kl]:Ir};function $M(i,t){function e(){let B=!1;const ct=new Oe;let ut=null;const St=new Oe(0,0,0,0);return{setMask:function(rt){ut!==rt&&!B&&(i.colorMask(rt,rt,rt,rt),ut=rt)},setLocked:function(rt){B=rt},setClear:function(rt,nt,wt,qt,Ae){Ae===!0&&(rt*=qt,nt*=qt,wt*=qt),ct.set(rt,nt,wt,qt),St.equals(ct)===!1&&(i.clearColor(rt,nt,wt,qt),St.copy(ct))},reset:function(){B=!1,ut=null,St.set(-1,0,0,0)}}}function n(){let B=!1,ct=!1,ut=null,St=null,rt=null;return{setReversed:function(nt){if(ct!==nt){const wt=t.get("EXT_clip_control");nt?wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.ZERO_TO_ONE_EXT):wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.NEGATIVE_ONE_TO_ONE_EXT),ct=nt;const qt=rt;rt=null,this.setClear(qt)}},getReversed:function(){return ct},setTest:function(nt){nt?it(i.DEPTH_TEST):xt(i.DEPTH_TEST)},setMask:function(nt){ut!==nt&&!B&&(i.depthMask(nt),ut=nt)},setFunc:function(nt){if(ct&&(nt=qM[nt]),St!==nt){switch(nt){case Vl:i.depthFunc(i.NEVER);break;case Wl:i.depthFunc(i.ALWAYS);break;case Xl:i.depthFunc(i.LESS);break;case Ir:i.depthFunc(i.LEQUAL);break;case Yl:i.depthFunc(i.EQUAL);break;case Kl:i.depthFunc(i.GEQUAL);break;case ql:i.depthFunc(i.GREATER);break;case $l:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}St=nt}},setLocked:function(nt){B=nt},setClear:function(nt){rt!==nt&&(ct&&(nt=1-nt),i.clearDepth(nt),rt=nt)},reset:function(){B=!1,ut=null,St=null,rt=null,ct=!1}}}function s(){let B=!1,ct=null,ut=null,St=null,rt=null,nt=null,wt=null,qt=null,Ae=null;return{setTest:function(me){B||(me?it(i.STENCIL_TEST):xt(i.STENCIL_TEST))},setMask:function(me){ct!==me&&!B&&(i.stencilMask(me),ct=me)},setFunc:function(me,Ri,mi){(ut!==me||St!==Ri||rt!==mi)&&(i.stencilFunc(me,Ri,mi),ut=me,St=Ri,rt=mi)},setOp:function(me,Ri,mi){(nt!==me||wt!==Ri||qt!==mi)&&(i.stencilOp(me,Ri,mi),nt=me,wt=Ri,qt=mi)},setLocked:function(me){B=me},setClear:function(me){Ae!==me&&(i.clearStencil(me),Ae=me)},reset:function(){B=!1,ct=null,ut=null,St=null,rt=null,nt=null,wt=null,qt=null,Ae=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],m=null,_=!1,g=null,p=null,M=null,S=null,v=null,E=null,w=null,b=new Kt(0,0,0),L=0,x=!1,y=null,R=null,P=null,U=null,z=null;const W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,K=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(G)[1]),X=K>=1):G.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),X=K>=2);let et=null,lt={};const bt=i.getParameter(i.SCISSOR_BOX),Ft=i.getParameter(i.VIEWPORT),Yt=new Oe().fromArray(bt),se=new Oe().fromArray(Ft);function ae(B,ct,ut,St){const rt=new Uint8Array(4),nt=i.createTexture();i.bindTexture(B,nt),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let wt=0;wt<ut;wt++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(ct,0,i.RGBA,1,1,St,0,i.RGBA,i.UNSIGNED_BYTE,rt):i.texImage2D(ct+wt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,rt);return nt}const tt={};tt[i.TEXTURE_2D]=ae(i.TEXTURE_2D,i.TEXTURE_2D,1),tt[i.TEXTURE_CUBE_MAP]=ae(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[i.TEXTURE_2D_ARRAY]=ae(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),tt[i.TEXTURE_3D]=ae(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),it(i.DEPTH_TEST),o.setFunc(Ir),Vt(!1),At(Wu),it(i.CULL_FACE),Le(gs);function it(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function xt(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function Ut(B,ct){return u[B]!==ct?(i.bindFramebuffer(B,ct),u[B]=ct,B===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ct),B===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ct),!0):!1}function _t(B,ct){let ut=d,St=!1;if(B){ut=f.get(ct),ut===void 0&&(ut=[],f.set(ct,ut));const rt=B.textures;if(ut.length!==rt.length||ut[0]!==i.COLOR_ATTACHMENT0){for(let nt=0,wt=rt.length;nt<wt;nt++)ut[nt]=i.COLOR_ATTACHMENT0+nt;ut.length=rt.length,St=!0}}else ut[0]!==i.BACK&&(ut[0]=i.BACK,St=!0);St&&i.drawBuffers(ut)}function le(B){return m!==B?(i.useProgram(B),m=B,!0):!1}const pn={[ks]:i.FUNC_ADD,[Zm]:i.FUNC_SUBTRACT,[Jm]:i.FUNC_REVERSE_SUBTRACT};pn[Qm]=i.MIN,pn[tg]=i.MAX;const k={[eg]:i.ZERO,[ng]:i.ONE,[ig]:i.SRC_COLOR,[Gl]:i.SRC_ALPHA,[lg]:i.SRC_ALPHA_SATURATE,[ag]:i.DST_COLOR,[rg]:i.DST_ALPHA,[sg]:i.ONE_MINUS_SRC_COLOR,[Hl]:i.ONE_MINUS_SRC_ALPHA,[cg]:i.ONE_MINUS_DST_COLOR,[og]:i.ONE_MINUS_DST_ALPHA,[hg]:i.CONSTANT_COLOR,[ug]:i.ONE_MINUS_CONSTANT_COLOR,[fg]:i.CONSTANT_ALPHA,[dg]:i.ONE_MINUS_CONSTANT_ALPHA};function Le(B,ct,ut,St,rt,nt,wt,qt,Ae,me){if(B===gs){_===!0&&(xt(i.BLEND),_=!1);return}if(_===!1&&(it(i.BLEND),_=!0),B!==jm){if(B!==g||me!==x){if((p!==ks||v!==ks)&&(i.blendEquation(i.FUNC_ADD),p=ks,v=ks),me)switch(B){case Lr:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zl:i.blendFunc(i.ONE,i.ONE);break;case Xu:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Yu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Lr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case zl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Xu:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Yu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}M=null,S=null,E=null,w=null,b.set(0,0,0),L=0,g=B,x=me}return}rt=rt||ct,nt=nt||ut,wt=wt||St,(ct!==p||rt!==v)&&(i.blendEquationSeparate(pn[ct],pn[rt]),p=ct,v=rt),(ut!==M||St!==S||nt!==E||wt!==w)&&(i.blendFuncSeparate(k[ut],k[St],k[nt],k[wt]),M=ut,S=St,E=nt,w=wt),(qt.equals(b)===!1||Ae!==L)&&(i.blendColor(qt.r,qt.g,qt.b,Ae),b.copy(qt),L=Ae),g=B,x=!1}function $t(B,ct){B.side===Jn?xt(i.CULL_FACE):it(i.CULL_FACE);let ut=B.side===Cn;ct&&(ut=!ut),Vt(ut),B.blending===Lr&&B.transparent===!1?Le(gs):Le(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const St=B.stencilWrite;a.setTest(St),St&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Rt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):xt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Vt(B){y!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),y=B)}function At(B){B!==Km?(it(i.CULL_FACE),B!==R&&(B===Wu?i.cullFace(i.BACK):B===qm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):xt(i.CULL_FACE),R=B}function De(B){B!==P&&(X&&i.lineWidth(B),P=B)}function Rt(B,ct,ut){B?(it(i.POLYGON_OFFSET_FILL),(U!==ct||z!==ut)&&(i.polygonOffset(ct,ut),U=ct,z=ut)):xt(i.POLYGON_OFFSET_FILL)}function Qt(B){B?it(i.SCISSOR_TEST):xt(i.SCISSOR_TEST)}function an(B){B===void 0&&(B=i.TEXTURE0+W-1),et!==B&&(i.activeTexture(B),et=B)}function ze(B,ct,ut){ut===void 0&&(et===null?ut=i.TEXTURE0+W-1:ut=et);let St=lt[ut];St===void 0&&(St={type:void 0,texture:void 0},lt[ut]=St),(St.type!==B||St.texture!==ct)&&(et!==ut&&(i.activeTexture(ut),et=ut),i.bindTexture(B,ct||tt[B]),St.type=B,St.texture=ct)}function I(){const B=lt[et];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function T(){try{i.compressedTexImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Y(){try{i.compressedTexImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Q(){try{i.texSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function st(){try{i.texSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Pt(){try{i.compressedTexSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ht(){try{i.texStorage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ct(){try{i.texStorage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Lt(){try{i.texImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function at(){try{i.texImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function vt(B){Yt.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),Yt.copy(B))}function Gt(B){se.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),se.copy(B))}function Dt(B,ct){let ut=l.get(ct);ut===void 0&&(ut=new WeakMap,l.set(ct,ut));let St=ut.get(B);St===void 0&&(St=i.getUniformBlockIndex(ct,B.name),ut.set(B,St))}function mt(B,ct){const St=l.get(ct).get(B);c.get(ct)!==St&&(i.uniformBlockBinding(ct,St,B.__bindingPointIndex),c.set(ct,St))}function Zt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},et=null,lt={},u={},f=new WeakMap,d=[],m=null,_=!1,g=null,p=null,M=null,S=null,v=null,E=null,w=null,b=new Kt(0,0,0),L=0,x=!1,y=null,R=null,P=null,U=null,z=null,Yt.set(0,0,i.canvas.width,i.canvas.height),se.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:it,disable:xt,bindFramebuffer:Ut,drawBuffers:_t,useProgram:le,setBlending:Le,setMaterial:$t,setFlipSided:Vt,setCullFace:At,setLineWidth:De,setPolygonOffset:Rt,setScissorTest:Qt,activeTexture:an,bindTexture:ze,unbindTexture:I,compressedTexImage2D:T,compressedTexImage3D:Y,texImage2D:Lt,texImage3D:at,updateUBOMapping:Dt,uniformBlockBinding:mt,texStorage2D:ht,texStorage3D:Ct,texSubImage2D:Q,texSubImage3D:st,compressedTexSubImage2D:Z,compressedTexSubImage3D:Pt,scissor:vt,viewport:Gt,reset:Zt}}function jM(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new kt,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,T){return d?new OffscreenCanvas(I,T):qa("canvas")}function _(I,T,Y){let Q=1;const st=ze(I);if((st.width>Y||st.height>Y)&&(Q=Y/Math.max(st.width,st.height)),Q<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const Z=Math.floor(Q*st.width),Pt=Math.floor(Q*st.height);u===void 0&&(u=m(Z,Pt));const ht=T?m(Z,Pt):u;return ht.width=Z,ht.height=Pt,ht.getContext("2d").drawImage(I,0,0,Z,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+Z+"x"+Pt+")."),ht}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),I;return I}function g(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function M(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function S(I,T,Y,Q,st=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Z=T;if(T===i.RED&&(Y===i.FLOAT&&(Z=i.R32F),Y===i.HALF_FLOAT&&(Z=i.R16F),Y===i.UNSIGNED_BYTE&&(Z=i.R8)),T===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(Z=i.R8UI),Y===i.UNSIGNED_SHORT&&(Z=i.R16UI),Y===i.UNSIGNED_INT&&(Z=i.R32UI),Y===i.BYTE&&(Z=i.R8I),Y===i.SHORT&&(Z=i.R16I),Y===i.INT&&(Z=i.R32I)),T===i.RG&&(Y===i.FLOAT&&(Z=i.RG32F),Y===i.HALF_FLOAT&&(Z=i.RG16F),Y===i.UNSIGNED_BYTE&&(Z=i.RG8)),T===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(Z=i.RG8UI),Y===i.UNSIGNED_SHORT&&(Z=i.RG16UI),Y===i.UNSIGNED_INT&&(Z=i.RG32UI),Y===i.BYTE&&(Z=i.RG8I),Y===i.SHORT&&(Z=i.RG16I),Y===i.INT&&(Z=i.RG32I)),T===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),Y===i.UNSIGNED_INT&&(Z=i.RGB32UI),Y===i.BYTE&&(Z=i.RGB8I),Y===i.SHORT&&(Z=i.RGB16I),Y===i.INT&&(Z=i.RGB32I)),T===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),Y===i.UNSIGNED_INT&&(Z=i.RGBA32UI),Y===i.BYTE&&(Z=i.RGBA8I),Y===i.SHORT&&(Z=i.RGBA16I),Y===i.INT&&(Z=i.RGBA32I)),T===i.RGB&&(Y===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),Y===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),T===i.RGBA){const Pt=st?Ya:de.getTransfer(Q);Y===i.FLOAT&&(Z=i.RGBA32F),Y===i.HALF_FLOAT&&(Z=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(Z=Pt===Se?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&t.get("EXT_color_buffer_float"),Z}function v(I,T){let Y;return I?T===null||T===Ys||T===bo?Y=i.DEPTH24_STENCIL8:T===bi?Y=i.DEPTH32F_STENCIL8:T===yo&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):T===null||T===Ys||T===bo?Y=i.DEPTH_COMPONENT24:T===bi?Y=i.DEPTH_COMPONENT32F:T===yo&&(Y=i.DEPTH_COMPONENT16),Y}function E(I,T){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==ln&&I.minFilter!==yi?Math.log2(Math.max(T.width,T.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?T.mipmaps.length:1}function w(I){const T=I.target;T.removeEventListener("dispose",w),L(T),T.isVideoTexture&&h.delete(T)}function b(I){const T=I.target;T.removeEventListener("dispose",b),y(T)}function L(I){const T=n.get(I);if(T.__webglInit===void 0)return;const Y=I.source,Q=f.get(Y);if(Q){const st=Q[T.__cacheKey];st.usedTimes--,st.usedTimes===0&&x(I),Object.keys(Q).length===0&&f.delete(Y)}n.remove(I)}function x(I){const T=n.get(I);i.deleteTexture(T.__webglTexture);const Y=I.source,Q=f.get(Y);delete Q[T.__cacheKey],o.memory.textures--}function y(I){const T=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(T.__webglFramebuffer[Q]))for(let st=0;st<T.__webglFramebuffer[Q].length;st++)i.deleteFramebuffer(T.__webglFramebuffer[Q][st]);else i.deleteFramebuffer(T.__webglFramebuffer[Q]);T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer[Q])}else{if(Array.isArray(T.__webglFramebuffer))for(let Q=0;Q<T.__webglFramebuffer.length;Q++)i.deleteFramebuffer(T.__webglFramebuffer[Q]);else i.deleteFramebuffer(T.__webglFramebuffer);if(T.__webglDepthbuffer&&i.deleteRenderbuffer(T.__webglDepthbuffer),T.__webglMultisampledFramebuffer&&i.deleteFramebuffer(T.__webglMultisampledFramebuffer),T.__webglColorRenderbuffer)for(let Q=0;Q<T.__webglColorRenderbuffer.length;Q++)T.__webglColorRenderbuffer[Q]&&i.deleteRenderbuffer(T.__webglColorRenderbuffer[Q]);T.__webglDepthRenderbuffer&&i.deleteRenderbuffer(T.__webglDepthRenderbuffer)}const Y=I.textures;for(let Q=0,st=Y.length;Q<st;Q++){const Z=n.get(Y[Q]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(Y[Q])}n.remove(I)}let R=0;function P(){R=0}function U(){const I=R;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),R+=1,I}function z(I){const T=[];return T.push(I.wrapS),T.push(I.wrapT),T.push(I.wrapR||0),T.push(I.magFilter),T.push(I.minFilter),T.push(I.anisotropy),T.push(I.internalFormat),T.push(I.format),T.push(I.type),T.push(I.generateMipmaps),T.push(I.premultiplyAlpha),T.push(I.flipY),T.push(I.unpackAlignment),T.push(I.colorSpace),T.join()}function W(I,T){const Y=n.get(I);if(I.isVideoTexture&&Qt(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&Y.__version!==I.version){const Q=I.image;if(Q===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{tt(Y,I,T);return}}else I.isExternalTexture&&(Y.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+T)}function X(I,T){const Y=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&Y.__version!==I.version){tt(Y,I,T);return}e.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+T)}function K(I,T){const Y=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&Y.__version!==I.version){tt(Y,I,T);return}e.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+T)}function G(I,T){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){it(Y,I,T);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+T)}const et={[Jl]:i.REPEAT,[Hs]:i.CLAMP_TO_EDGE,[Ql]:i.MIRRORED_REPEAT},lt={[ln]:i.NEAREST,[Sg]:i.NEAREST_MIPMAP_NEAREST,[po]:i.NEAREST_MIPMAP_LINEAR,[yi]:i.LINEAR,[Rc]:i.LINEAR_MIPMAP_NEAREST,[Vs]:i.LINEAR_MIPMAP_LINEAR},bt={[Ag]:i.NEVER,[Ig]:i.ALWAYS,[Rg]:i.LESS,[Pp]:i.LEQUAL,[Cg]:i.EQUAL,[Pg]:i.GEQUAL,[Lg]:i.GREATER,[Dg]:i.NOTEQUAL};function Ft(I,T){if(T.type===bi&&t.has("OES_texture_float_linear")===!1&&(T.magFilter===yi||T.magFilter===Rc||T.magFilter===po||T.magFilter===Vs||T.minFilter===yi||T.minFilter===Rc||T.minFilter===po||T.minFilter===Vs)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,et[T.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,et[T.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,et[T.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,lt[T.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,lt[T.minFilter]),T.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,bt[T.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(T.magFilter===ln||T.minFilter!==po&&T.minFilter!==Vs||T.type===bi&&t.has("OES_texture_float_linear")===!1)return;if(T.anisotropy>1||n.get(T).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(T.anisotropy,s.getMaxAnisotropy())),n.get(T).__currentAnisotropy=T.anisotropy}}}function Yt(I,T){let Y=!1;I.__webglInit===void 0&&(I.__webglInit=!0,T.addEventListener("dispose",w));const Q=T.source;let st=f.get(Q);st===void 0&&(st={},f.set(Q,st));const Z=z(T);if(Z!==I.__cacheKey){st[Z]===void 0&&(st[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),st[Z].usedTimes++;const Pt=st[I.__cacheKey];Pt!==void 0&&(st[I.__cacheKey].usedTimes--,Pt.usedTimes===0&&x(T)),I.__cacheKey=Z,I.__webglTexture=st[Z].texture}return Y}function se(I,T,Y){return Math.floor(Math.floor(I/Y)/T)}function ae(I,T,Y,Q){const Z=I.updateRanges;if(Z.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,T.width,T.height,Y,Q,T.data);else{Z.sort((at,vt)=>at.start-vt.start);let Pt=0;for(let at=1;at<Z.length;at++){const vt=Z[Pt],Gt=Z[at],Dt=vt.start+vt.count,mt=se(Gt.start,T.width,4),Zt=se(vt.start,T.width,4);Gt.start<=Dt+1&&mt===Zt&&se(Gt.start+Gt.count-1,T.width,4)===mt?vt.count=Math.max(vt.count,Gt.start+Gt.count-vt.start):(++Pt,Z[Pt]=Gt)}Z.length=Pt+1;const ht=i.getParameter(i.UNPACK_ROW_LENGTH),Ct=i.getParameter(i.UNPACK_SKIP_PIXELS),Lt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,T.width);for(let at=0,vt=Z.length;at<vt;at++){const Gt=Z[at],Dt=Math.floor(Gt.start/4),mt=Math.ceil(Gt.count/4),Zt=Dt%T.width,B=Math.floor(Dt/T.width),ct=mt,ut=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Zt),i.pixelStorei(i.UNPACK_SKIP_ROWS,B),e.texSubImage2D(i.TEXTURE_2D,0,Zt,B,ct,ut,Y,Q,T.data)}I.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ht),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ct),i.pixelStorei(i.UNPACK_SKIP_ROWS,Lt)}}function tt(I,T,Y){let Q=i.TEXTURE_2D;(T.isDataArrayTexture||T.isCompressedArrayTexture)&&(Q=i.TEXTURE_2D_ARRAY),T.isData3DTexture&&(Q=i.TEXTURE_3D);const st=Yt(I,T),Z=T.source;e.bindTexture(Q,I.__webglTexture,i.TEXTURE0+Y);const Pt=n.get(Z);if(Z.version!==Pt.__version||st===!0){e.activeTexture(i.TEXTURE0+Y);const ht=de.getPrimaries(de.workingColorSpace),Ct=T.colorSpace===ls?null:de.getPrimaries(T.colorSpace),Lt=T.colorSpace===ls||ht===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);let at=_(T.image,!1,s.maxTextureSize);at=an(T,at);const vt=r.convert(T.format,T.colorSpace),Gt=r.convert(T.type);let Dt=S(T.internalFormat,vt,Gt,T.colorSpace,T.isVideoTexture);Ft(Q,T);let mt;const Zt=T.mipmaps,B=T.isVideoTexture!==!0,ct=Pt.__version===void 0||st===!0,ut=Z.dataReady,St=E(T,at);if(T.isDepthTexture)Dt=v(T.format===Eo,T.type),ct&&(B?e.texStorage2D(i.TEXTURE_2D,1,Dt,at.width,at.height):e.texImage2D(i.TEXTURE_2D,0,Dt,at.width,at.height,0,vt,Gt,null));else if(T.isDataTexture)if(Zt.length>0){B&&ct&&e.texStorage2D(i.TEXTURE_2D,St,Dt,Zt[0].width,Zt[0].height);for(let rt=0,nt=Zt.length;rt<nt;rt++)mt=Zt[rt],B?ut&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,mt.width,mt.height,vt,Gt,mt.data):e.texImage2D(i.TEXTURE_2D,rt,Dt,mt.width,mt.height,0,vt,Gt,mt.data);T.generateMipmaps=!1}else B?(ct&&e.texStorage2D(i.TEXTURE_2D,St,Dt,at.width,at.height),ut&&ae(T,at,vt,Gt)):e.texImage2D(i.TEXTURE_2D,0,Dt,at.width,at.height,0,vt,Gt,at.data);else if(T.isCompressedTexture)if(T.isCompressedArrayTexture){B&&ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Dt,Zt[0].width,Zt[0].height,at.depth);for(let rt=0,nt=Zt.length;rt<nt;rt++)if(mt=Zt[rt],T.format!==fi)if(vt!==null)if(B){if(ut)if(T.layerUpdates.size>0){const wt=wf(mt.width,mt.height,T.format,T.type);for(const qt of T.layerUpdates){const Ae=mt.data.subarray(qt*wt/mt.data.BYTES_PER_ELEMENT,(qt+1)*wt/mt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,qt,mt.width,mt.height,1,vt,Ae)}T.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,mt.width,mt.height,at.depth,vt,mt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,rt,Dt,mt.width,mt.height,at.depth,0,mt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else B?ut&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,rt,0,0,0,mt.width,mt.height,at.depth,vt,Gt,mt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,rt,Dt,mt.width,mt.height,at.depth,0,vt,Gt,mt.data)}else{B&&ct&&e.texStorage2D(i.TEXTURE_2D,St,Dt,Zt[0].width,Zt[0].height);for(let rt=0,nt=Zt.length;rt<nt;rt++)mt=Zt[rt],T.format!==fi?vt!==null?B?ut&&e.compressedTexSubImage2D(i.TEXTURE_2D,rt,0,0,mt.width,mt.height,vt,mt.data):e.compressedTexImage2D(i.TEXTURE_2D,rt,Dt,mt.width,mt.height,0,mt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):B?ut&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,mt.width,mt.height,vt,Gt,mt.data):e.texImage2D(i.TEXTURE_2D,rt,Dt,mt.width,mt.height,0,vt,Gt,mt.data)}else if(T.isDataArrayTexture)if(B){if(ct&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Dt,at.width,at.height,at.depth),ut)if(T.layerUpdates.size>0){const rt=wf(at.width,at.height,T.format,T.type);for(const nt of T.layerUpdates){const wt=at.data.subarray(nt*rt/at.data.BYTES_PER_ELEMENT,(nt+1)*rt/at.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,nt,at.width,at.height,1,vt,Gt,wt)}T.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,vt,Gt,at.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Dt,at.width,at.height,at.depth,0,vt,Gt,at.data);else if(T.isData3DTexture)B?(ct&&e.texStorage3D(i.TEXTURE_3D,St,Dt,at.width,at.height,at.depth),ut&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,vt,Gt,at.data)):e.texImage3D(i.TEXTURE_3D,0,Dt,at.width,at.height,at.depth,0,vt,Gt,at.data);else if(T.isFramebufferTexture){if(ct)if(B)e.texStorage2D(i.TEXTURE_2D,St,Dt,at.width,at.height);else{let rt=at.width,nt=at.height;for(let wt=0;wt<St;wt++)e.texImage2D(i.TEXTURE_2D,wt,Dt,rt,nt,0,vt,Gt,null),rt>>=1,nt>>=1}}else if(Zt.length>0){if(B&&ct){const rt=ze(Zt[0]);e.texStorage2D(i.TEXTURE_2D,St,Dt,rt.width,rt.height)}for(let rt=0,nt=Zt.length;rt<nt;rt++)mt=Zt[rt],B?ut&&e.texSubImage2D(i.TEXTURE_2D,rt,0,0,vt,Gt,mt):e.texImage2D(i.TEXTURE_2D,rt,Dt,vt,Gt,mt);T.generateMipmaps=!1}else if(B){if(ct){const rt=ze(at);e.texStorage2D(i.TEXTURE_2D,St,Dt,rt.width,rt.height)}ut&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,vt,Gt,at)}else e.texImage2D(i.TEXTURE_2D,0,Dt,vt,Gt,at);g(T)&&p(Q),Pt.__version=Z.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function it(I,T,Y){if(T.image.length!==6)return;const Q=Yt(I,T),st=T.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+Y);const Z=n.get(st);if(st.version!==Z.__version||Q===!0){e.activeTexture(i.TEXTURE0+Y);const Pt=de.getPrimaries(de.workingColorSpace),ht=T.colorSpace===ls?null:de.getPrimaries(T.colorSpace),Ct=T.colorSpace===ls||Pt===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,T.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,T.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,T.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);const Lt=T.isCompressedTexture||T.image[0].isCompressedTexture,at=T.image[0]&&T.image[0].isDataTexture,vt=[];for(let nt=0;nt<6;nt++)!Lt&&!at?vt[nt]=_(T.image[nt],!0,s.maxCubemapSize):vt[nt]=at?T.image[nt].image:T.image[nt],vt[nt]=an(T,vt[nt]);const Gt=vt[0],Dt=r.convert(T.format,T.colorSpace),mt=r.convert(T.type),Zt=S(T.internalFormat,Dt,mt,T.colorSpace),B=T.isVideoTexture!==!0,ct=Z.__version===void 0||Q===!0,ut=st.dataReady;let St=E(T,Gt);Ft(i.TEXTURE_CUBE_MAP,T);let rt;if(Lt){B&&ct&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Zt,Gt.width,Gt.height);for(let nt=0;nt<6;nt++){rt=vt[nt].mipmaps;for(let wt=0;wt<rt.length;wt++){const qt=rt[wt];T.format!==fi?Dt!==null?B?ut&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt,0,0,qt.width,qt.height,Dt,qt.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt,Zt,qt.width,qt.height,0,qt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt,0,0,qt.width,qt.height,Dt,mt,qt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt,Zt,qt.width,qt.height,0,Dt,mt,qt.data)}}}else{if(rt=T.mipmaps,B&&ct){rt.length>0&&St++;const nt=ze(vt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Zt,nt.width,nt.height)}for(let nt=0;nt<6;nt++)if(at){B?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,vt[nt].width,vt[nt].height,Dt,mt,vt[nt].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Zt,vt[nt].width,vt[nt].height,0,Dt,mt,vt[nt].data);for(let wt=0;wt<rt.length;wt++){const Ae=rt[wt].image[nt].image;B?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt+1,0,0,Ae.width,Ae.height,Dt,mt,Ae.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt+1,Zt,Ae.width,Ae.height,0,Dt,mt,Ae.data)}}else{B?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,0,0,Dt,mt,vt[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0,Zt,Dt,mt,vt[nt]);for(let wt=0;wt<rt.length;wt++){const qt=rt[wt];B?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt+1,0,0,Dt,mt,qt.image[nt]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+nt,wt+1,Zt,Dt,mt,qt.image[nt])}}}g(T)&&p(i.TEXTURE_CUBE_MAP),Z.__version=st.version,T.onUpdate&&T.onUpdate(T)}I.__version=T.version}function xt(I,T,Y,Q,st,Z){const Pt=r.convert(Y.format,Y.colorSpace),ht=r.convert(Y.type),Ct=S(Y.internalFormat,Pt,ht,Y.colorSpace),Lt=n.get(T),at=n.get(Y);if(at.__renderTarget=T,!Lt.__hasExternalTextures){const vt=Math.max(1,T.width>>Z),Gt=Math.max(1,T.height>>Z);st===i.TEXTURE_3D||st===i.TEXTURE_2D_ARRAY?e.texImage3D(st,Z,Ct,vt,Gt,T.depth,0,Pt,ht,null):e.texImage2D(st,Z,Ct,vt,Gt,0,Pt,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),Rt(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Q,st,at.__webglTexture,0,De(T)):(st===i.TEXTURE_2D||st>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Q,st,at.__webglTexture,Z),e.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(I,T,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,I),T.depthBuffer){const Q=T.depthTexture,st=Q&&Q.isDepthTexture?Q.type:null,Z=v(T.stencilBuffer,st),Pt=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=De(T);Rt(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,Z,T.width,T.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,Z,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Z,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pt,i.RENDERBUFFER,I)}else{const Q=T.textures;for(let st=0;st<Q.length;st++){const Z=Q[st],Pt=r.convert(Z.format,Z.colorSpace),ht=r.convert(Z.type),Ct=S(Z.internalFormat,Pt,ht,Z.colorSpace),Lt=De(T);Y&&Rt(T)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Lt,Ct,T.width,T.height):Rt(T)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Lt,Ct,T.width,T.height):i.renderbufferStorage(i.RENDERBUFFER,Ct,T.width,T.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function _t(I,T){if(T&&T.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(T.depthTexture&&T.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Q=n.get(T.depthTexture);Q.__renderTarget=T,(!Q.__webglTexture||T.depthTexture.image.width!==T.width||T.depthTexture.image.height!==T.height)&&(T.depthTexture.image.width=T.width,T.depthTexture.image.height=T.height,T.depthTexture.needsUpdate=!0),W(T.depthTexture,0);const st=Q.__webglTexture,Z=De(T);if(T.depthTexture.format===So)Rt(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0);else if(T.depthTexture.format===Eo)Rt(T)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0,Z):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function le(I){const T=n.get(I),Y=I.isWebGLCubeRenderTarget===!0;if(T.__boundDepthTexture!==I.depthTexture){const Q=I.depthTexture;if(T.__depthDisposeCallback&&T.__depthDisposeCallback(),Q){const st=()=>{delete T.__boundDepthTexture,delete T.__depthDisposeCallback,Q.removeEventListener("dispose",st)};Q.addEventListener("dispose",st),T.__depthDisposeCallback=st}T.__boundDepthTexture=Q}if(I.depthTexture&&!T.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");const Q=I.texture.mipmaps;Q&&Q.length>0?_t(T.__webglFramebuffer[0],I):_t(T.__webglFramebuffer,I)}else if(Y){T.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[Q]),T.__webglDepthbuffer[Q]===void 0)T.__webglDepthbuffer[Q]=i.createRenderbuffer(),Ut(T.__webglDepthbuffer[Q],I,!1);else{const st=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=T.__webglDepthbuffer[Q];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,Z)}}else{const Q=I.texture.mipmaps;if(Q&&Q.length>0?e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,T.__webglFramebuffer),T.__webglDepthbuffer===void 0)T.__webglDepthbuffer=i.createRenderbuffer(),Ut(T.__webglDepthbuffer,I,!1);else{const st=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=T.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,Z)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function pn(I,T,Y){const Q=n.get(I);T!==void 0&&xt(Q.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&le(I)}function k(I){const T=I.texture,Y=n.get(I),Q=n.get(T);I.addEventListener("dispose",b);const st=I.textures,Z=I.isWebGLCubeRenderTarget===!0,Pt=st.length>1;if(Pt||(Q.__webglTexture===void 0&&(Q.__webglTexture=i.createTexture()),Q.__version=T.version,o.memory.textures++),Z){Y.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(T.mipmaps&&T.mipmaps.length>0){Y.__webglFramebuffer[ht]=[];for(let Ct=0;Ct<T.mipmaps.length;Ct++)Y.__webglFramebuffer[ht][Ct]=i.createFramebuffer()}else Y.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(T.mipmaps&&T.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ht=0;ht<T.mipmaps.length;ht++)Y.__webglFramebuffer[ht]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Pt)for(let ht=0,Ct=st.length;ht<Ct;ht++){const Lt=n.get(st[ht]);Lt.__webglTexture===void 0&&(Lt.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&Rt(I)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ht=0;ht<st.length;ht++){const Ct=st[ht];Y.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[ht]);const Lt=r.convert(Ct.format,Ct.colorSpace),at=r.convert(Ct.type),vt=S(Ct.internalFormat,Lt,at,Ct.colorSpace,I.isXRRenderTarget===!0),Gt=De(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Gt,vt,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,Y.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),Ut(Y.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture),Ft(i.TEXTURE_CUBE_MAP,T);for(let ht=0;ht<6;ht++)if(T.mipmaps&&T.mipmaps.length>0)for(let Ct=0;Ct<T.mipmaps.length;Ct++)xt(Y.__webglFramebuffer[ht][Ct],I,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Ct);else xt(Y.__webglFramebuffer[ht],I,T,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);g(T)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let ht=0,Ct=st.length;ht<Ct;ht++){const Lt=st[ht],at=n.get(Lt);let vt=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(vt=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(vt,at.__webglTexture),Ft(vt,Lt),xt(Y.__webglFramebuffer,I,Lt,i.COLOR_ATTACHMENT0+ht,vt,0),g(Lt)&&p(vt)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ht=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,Q.__webglTexture),Ft(ht,T),T.mipmaps&&T.mipmaps.length>0)for(let Ct=0;Ct<T.mipmaps.length;Ct++)xt(Y.__webglFramebuffer[Ct],I,T,i.COLOR_ATTACHMENT0,ht,Ct);else xt(Y.__webglFramebuffer,I,T,i.COLOR_ATTACHMENT0,ht,0);g(T)&&p(ht),e.unbindTexture()}I.depthBuffer&&le(I)}function Le(I){const T=I.textures;for(let Y=0,Q=T.length;Y<Q;Y++){const st=T[Y];if(g(st)){const Z=M(I),Pt=n.get(st).__webglTexture;e.bindTexture(Z,Pt),p(Z),e.unbindTexture()}}}const $t=[],Vt=[];function At(I){if(I.samples>0){if(Rt(I)===!1){const T=I.textures,Y=I.width,Q=I.height;let st=i.COLOR_BUFFER_BIT;const Z=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pt=n.get(I),ht=T.length>1;if(ht)for(let Lt=0;Lt<T.length;Lt++)e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer);const Ct=I.texture.mipmaps;Ct&&Ct.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let Lt=0;Lt<T.length;Lt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(st|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(st|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[Lt]);const at=n.get(T[Lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,at,0)}i.blitFramebuffer(0,0,Y,Q,0,0,Y,Q,st,i.NEAREST),c===!0&&($t.length=0,Vt.length=0,$t.push(i.COLOR_ATTACHMENT0+Lt),I.depthBuffer&&I.resolveDepthBuffer===!1&&($t.push(Z),Vt.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Vt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,$t))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let Lt=0;Lt<T.length;Lt++){e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[Lt]);const at=n.get(T[Lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.TEXTURE_2D,at,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){const T=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[T])}}}function De(I){return Math.min(s.maxSamples,I.samples)}function Rt(I){const T=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&T.__useRenderToTexture!==!1}function Qt(I){const T=o.render.frame;h.get(I)!==T&&(h.set(I,T),I.update())}function an(I,T){const Y=I.colorSpace,Q=I.format,st=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||Y!==Or&&Y!==ls&&(de.getTransfer(Y)===Se?(Q!==fi||st!==pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),T}function ze(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=U,this.resetTextureUnits=P,this.setTexture2D=W,this.setTexture2DArray=X,this.setTexture3D=K,this.setTextureCube=G,this.rebindTextures=pn,this.setupRenderTarget=k,this.updateRenderTargetMipmap=Le,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=xt,this.useMultisampledRTT=Rt}function ZM(i,t){function e(n,s=ls){let r;const o=de.getTransfer(s);if(n===pi)return i.UNSIGNED_BYTE;if(n===nu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===iu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ap)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Rp)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===wp)return i.BYTE;if(n===Tp)return i.SHORT;if(n===yo)return i.UNSIGNED_SHORT;if(n===eu)return i.INT;if(n===Ys)return i.UNSIGNED_INT;if(n===bi)return i.FLOAT;if(n===zi)return i.HALF_FLOAT;if(n===Cp)return i.ALPHA;if(n===Lp)return i.RGB;if(n===fi)return i.RGBA;if(n===So)return i.DEPTH_COMPONENT;if(n===Eo)return i.DEPTH_STENCIL;if(n===su)return i.RED;if(n===ru)return i.RED_INTEGER;if(n===Dp)return i.RG;if(n===ou)return i.RG_INTEGER;if(n===au)return i.RGBA_INTEGER;if(n===Ia||n===Na||n===Ua||n===Oa)if(o===Se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ia)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ua)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Oa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ia)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Na)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ua)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Oa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===th||n===eh||n===nh||n===ih)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===th)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===eh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===nh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ih)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===sh||n===rh||n===oh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===sh||n===rh)return o===Se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===oh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ah||n===ch||n===lh||n===hh||n===uh||n===fh||n===dh||n===ph||n===mh||n===gh||n===_h||n===vh||n===xh||n===Mh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ah)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ch)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===lh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===hh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===uh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ph)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===mh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===gh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_h)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===vh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Mh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===yh||n===bh||n===Sh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===yh)return o===Se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===bh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Eh||n===wh||n===Th||n===Ah)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Eh)return r.COMPRESSED_RED_RGTC1_EXT;if(n===wh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Th)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ah)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===bo?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const JM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,QM=`
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

}`;class ty{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Kp(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new en({vertexShader:JM,fragmentShader:QM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new _e(new Fo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ey extends $r{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,m=null;const _=typeof XRWebGLBinding<"u",g=new ty,p={},M=e.getContextAttributes();let S=null,v=null;const E=[],w=[],b=new kt;let L=null;const x=new Wn;x.viewport=new Oe;const y=new Wn;y.viewport=new Oe;const R=[x,y],P=new b1;let U=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(tt){let it=E[tt];return it===void 0&&(it=new jc,E[tt]=it),it.getTargetRaySpace()},this.getControllerGrip=function(tt){let it=E[tt];return it===void 0&&(it=new jc,E[tt]=it),it.getGripSpace()},this.getHand=function(tt){let it=E[tt];return it===void 0&&(it=new jc,E[tt]=it),it.getHandSpace()};function W(tt){const it=w.indexOf(tt.inputSource);if(it===-1)return;const xt=E[it];xt!==void 0&&(xt.update(tt.inputSource,tt.frame,l||o),xt.dispatchEvent({type:tt.type,data:tt.inputSource}))}function X(){s.removeEventListener("select",W),s.removeEventListener("selectstart",W),s.removeEventListener("selectend",W),s.removeEventListener("squeeze",W),s.removeEventListener("squeezestart",W),s.removeEventListener("squeezeend",W),s.removeEventListener("end",X),s.removeEventListener("inputsourceschange",K);for(let tt=0;tt<E.length;tt++){const it=w[tt];it!==null&&(w[tt]=null,E[tt].disconnect(it))}U=null,z=null,g.reset();for(const tt in p)delete p[tt];t.setRenderTarget(S),d=null,f=null,u=null,s=null,v=null,ae.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(b.width,b.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(tt){r=tt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(tt){a=tt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(tt){l=tt},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(tt){if(s=tt,s!==null){if(S=t.getRenderTarget(),s.addEventListener("select",W),s.addEventListener("selectstart",W),s.addEventListener("selectend",W),s.addEventListener("squeeze",W),s.addEventListener("squeezestart",W),s.addEventListener("squeezeend",W),s.addEventListener("end",X),s.addEventListener("inputsourceschange",K),M.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(b),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let xt=null,Ut=null,_t=null;M.depth&&(_t=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,xt=M.stencil?Eo:So,Ut=M.stencil?bo:Ys);const le={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(le),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new ei(f.textureWidth,f.textureHeight,{format:fi,type:pi,depthTexture:new Ja(f.textureWidth,f.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,xt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const xt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,xt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new ei(d.framebufferWidth,d.framebufferHeight,{format:fi,type:pi,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),ae.setContext(s),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(tt){for(let it=0;it<tt.removed.length;it++){const xt=tt.removed[it],Ut=w.indexOf(xt);Ut>=0&&(w[Ut]=null,E[Ut].disconnect(xt))}for(let it=0;it<tt.added.length;it++){const xt=tt.added[it];let Ut=w.indexOf(xt);if(Ut===-1){for(let le=0;le<E.length;le++)if(le>=w.length){w.push(xt),Ut=le;break}else if(w[le]===null){w[le]=xt,Ut=le;break}if(Ut===-1)break}const _t=E[Ut];_t&&_t.connect(xt)}}const G=new F,et=new F;function lt(tt,it,xt){G.setFromMatrixPosition(it.matrixWorld),et.setFromMatrixPosition(xt.matrixWorld);const Ut=G.distanceTo(et),_t=it.projectionMatrix.elements,le=xt.projectionMatrix.elements,pn=_t[14]/(_t[10]-1),k=_t[14]/(_t[10]+1),Le=(_t[9]+1)/_t[5],$t=(_t[9]-1)/_t[5],Vt=(_t[8]-1)/_t[0],At=(le[8]+1)/le[0],De=pn*Vt,Rt=pn*At,Qt=Ut/(-Vt+At),an=Qt*-Vt;if(it.matrixWorld.decompose(tt.position,tt.quaternion,tt.scale),tt.translateX(an),tt.translateZ(Qt),tt.matrixWorld.compose(tt.position,tt.quaternion,tt.scale),tt.matrixWorldInverse.copy(tt.matrixWorld).invert(),_t[10]===-1)tt.projectionMatrix.copy(it.projectionMatrix),tt.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const ze=pn+Qt,I=k+Qt,T=De-an,Y=Rt+(Ut-an),Q=Le*k/I*ze,st=$t*k/I*ze;tt.projectionMatrix.makePerspective(T,Y,Q,st,ze,I),tt.projectionMatrixInverse.copy(tt.projectionMatrix).invert()}}function bt(tt,it){it===null?tt.matrixWorld.copy(tt.matrix):tt.matrixWorld.multiplyMatrices(it.matrixWorld,tt.matrix),tt.matrixWorldInverse.copy(tt.matrixWorld).invert()}this.updateCamera=function(tt){if(s===null)return;let it=tt.near,xt=tt.far;g.texture!==null&&(g.depthNear>0&&(it=g.depthNear),g.depthFar>0&&(xt=g.depthFar)),P.near=y.near=x.near=it,P.far=y.far=x.far=xt,(U!==P.near||z!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),U=P.near,z=P.far),P.layers.mask=tt.layers.mask|6,x.layers.mask=P.layers.mask&3,y.layers.mask=P.layers.mask&5;const Ut=tt.parent,_t=P.cameras;bt(P,Ut);for(let le=0;le<_t.length;le++)bt(_t[le],Ut);_t.length===2?lt(P,x,y):P.projectionMatrix.copy(x.projectionMatrix),Ft(tt,P,Ut)};function Ft(tt,it,xt){xt===null?tt.matrix.copy(it.matrixWorld):(tt.matrix.copy(xt.matrixWorld),tt.matrix.invert(),tt.matrix.multiply(it.matrixWorld)),tt.matrix.decompose(tt.position,tt.quaternion,tt.scale),tt.updateMatrixWorld(!0),tt.projectionMatrix.copy(it.projectionMatrix),tt.projectionMatrixInverse.copy(it.projectionMatrixInverse),tt.isPerspectiveCamera&&(tt.fov=Ch*2*Math.atan(1/tt.projectionMatrix.elements[5]),tt.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(tt){c=tt,f!==null&&(f.fixedFoveation=tt),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=tt)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(P)},this.getCameraTexture=function(tt){return p[tt]};let Yt=null;function se(tt,it){if(h=it.getViewerPose(l||o),m=it,h!==null){const xt=h.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let Ut=!1;xt.length!==P.cameras.length&&(P.cameras.length=0,Ut=!0);for(let k=0;k<xt.length;k++){const Le=xt[k];let $t=null;if(d!==null)$t=d.getViewport(Le);else{const At=u.getViewSubImage(f,Le);$t=At.viewport,k===0&&(t.setRenderTargetTextures(v,At.colorTexture,At.depthStencilTexture),t.setRenderTarget(v))}let Vt=R[k];Vt===void 0&&(Vt=new Wn,Vt.layers.enable(k),Vt.viewport=new Oe,R[k]=Vt),Vt.matrix.fromArray(Le.transform.matrix),Vt.matrix.decompose(Vt.position,Vt.quaternion,Vt.scale),Vt.projectionMatrix.fromArray(Le.projectionMatrix),Vt.projectionMatrixInverse.copy(Vt.projectionMatrix).invert(),Vt.viewport.set($t.x,$t.y,$t.width,$t.height),k===0&&(P.matrix.copy(Vt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Ut===!0&&P.cameras.push(Vt)}const _t=s.enabledFeatures;if(_t&&_t.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const k=u.getDepthInformation(xt[0]);k&&k.isValid&&k.texture&&g.init(k,s.renderState)}if(_t&&_t.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let k=0;k<xt.length;k++){const Le=xt[k].camera;if(Le){let $t=p[Le];$t||($t=new Kp,p[Le]=$t);const Vt=u.getCameraImage(Le);$t.sourceTexture=Vt}}}}for(let xt=0;xt<E.length;xt++){const Ut=w[xt],_t=E[xt];Ut!==null&&_t!==void 0&&_t.update(Ut,it,l||o)}Yt&&Yt(tt,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),m=null}const ae=new Jp;ae.setAnimationLoop(se),this.setAnimationLoop=function(tt){Yt=tt},this.dispose=function(){}}}const Ns=new ni,ny=new ve;function iy(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Fp(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,S,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,M,S):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Cn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Cn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const M=t.get(p),S=M.envMap,v=M.envMapRotation;S&&(g.envMap.value=S,Ns.copy(v),Ns.x*=-1,Ns.y*=-1,Ns.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Ns.y*=-1,Ns.z*=-1),g.envMapRotation.value.setFromMatrix4(ny.makeRotationFromEuler(Ns)),g.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,M,S){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=S*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Cn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const M=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function sy(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,S){const v=S.program;n.uniformBlockBinding(M,v)}function l(M,S){let v=s[M.id];v===void 0&&(m(M),v=h(M),s[M.id]=v,M.addEventListener("dispose",g));const E=S.program;n.updateUBOMapping(M,E);const w=t.render.frame;r[M.id]!==w&&(f(M),r[M.id]=w)}function h(M){const S=u();M.__bindingPointIndex=S;const v=i.createBuffer(),E=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,E,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,S,v),v}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const S=s[M.id],v=M.uniforms,E=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,S);for(let w=0,b=v.length;w<b;w++){const L=Array.isArray(v[w])?v[w]:[v[w]];for(let x=0,y=L.length;x<y;x++){const R=L[x];if(d(R,w,x,E)===!0){const P=R.__offset,U=Array.isArray(R.value)?R.value:[R.value];let z=0;for(let W=0;W<U.length;W++){const X=U[W],K=_(X);typeof X=="number"||typeof X=="boolean"?(R.__data[0]=X,i.bufferSubData(i.UNIFORM_BUFFER,P+z,R.__data)):X.isMatrix3?(R.__data[0]=X.elements[0],R.__data[1]=X.elements[1],R.__data[2]=X.elements[2],R.__data[3]=0,R.__data[4]=X.elements[3],R.__data[5]=X.elements[4],R.__data[6]=X.elements[5],R.__data[7]=0,R.__data[8]=X.elements[6],R.__data[9]=X.elements[7],R.__data[10]=X.elements[8],R.__data[11]=0):(X.toArray(R.__data,z),z+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,R.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,S,v,E){const w=M.value,b=S+"_"+v;if(E[b]===void 0)return typeof w=="number"||typeof w=="boolean"?E[b]=w:E[b]=w.clone(),!0;{const L=E[b];if(typeof w=="number"||typeof w=="boolean"){if(L!==w)return E[b]=w,!0}else if(L.equals(w)===!1)return L.copy(w),!0}return!1}function m(M){const S=M.uniforms;let v=0;const E=16;for(let b=0,L=S.length;b<L;b++){const x=Array.isArray(S[b])?S[b]:[S[b]];for(let y=0,R=x.length;y<R;y++){const P=x[y],U=Array.isArray(P.value)?P.value:[P.value];for(let z=0,W=U.length;z<W;z++){const X=U[z],K=_(X),G=v%E,et=G%K.boundary,lt=G+et;v+=et,lt!==0&&E-lt<K.storage&&(v+=E-lt),P.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=v,v+=K.storage}}}const w=v%E;return w>0&&(v+=E-w),M.__size=v,M.__cache={},this}function _(M){const S={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(S.boundary=4,S.storage=4):M.isVector2?(S.boundary=8,S.storage=8):M.isVector3||M.isColor?(S.boundary=16,S.storage=12):M.isVector4?(S.boundary=16,S.storage=16):M.isMatrix3?(S.boundary=48,S.storage=48):M.isMatrix4?(S.boundary=64,S.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),S}function g(M){const S=M.target;S.removeEventListener("dispose",g);const v=o.indexOf(S.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[S.id]),delete s[S.id],delete r[S.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class ry{constructor(t={}){const{canvas:e=Ug(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const M=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=_s,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let E=!1;this._outputColorSpace=hn;let w=0,b=0,L=null,x=-1,y=null;const R=new Oe,P=new Oe;let U=null;const z=new Kt(0);let W=0,X=e.width,K=e.height,G=1,et=null,lt=null;const bt=new Oe(0,0,X,K),Ft=new Oe(0,0,X,K);let Yt=!1;const se=new uu;let ae=!1,tt=!1;const it=new ve,xt=new F,Ut=new Oe,_t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let le=!1;function pn(){return L===null?G:1}let k=n;function Le(D,H){return e.getContext(D,H)}try{const D={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${tu}`),e.addEventListener("webglcontextlost",ut,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",rt,!1),k===null){const H="webgl2";if(k=Le(H,D),k===null)throw Le(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let $t,Vt,At,De,Rt,Qt,an,ze,I,T,Y,Q,st,Z,Pt,ht,Ct,Lt,at,vt,Gt,Dt,mt,Zt;function B(){$t=new mx(k),$t.init(),Dt=new ZM(k,$t),Vt=new cx(k,$t,t,Dt),At=new $M(k,$t),Vt.reversedDepthBuffer&&f&&At.buffers.depth.setReversed(!0),De=new vx(k),Rt=new OM,Qt=new jM(k,$t,At,Rt,Vt,Dt,De),an=new hx(v),ze=new px(v),I=new E1(k),mt=new ox(k,I),T=new gx(k,I,De,mt),Y=new Mx(k,T,I,De),at=new xx(k,Vt,Qt),ht=new lx(Rt),Q=new UM(v,an,ze,$t,Vt,mt,ht),st=new iy(v,Rt),Z=new FM,Pt=new WM($t),Lt=new rx(v,an,ze,At,Y,d,c),Ct=new KM(v,Y,Vt),Zt=new sy(k,De,Vt,At),vt=new ax(k,$t,De),Gt=new _x(k,$t,De),De.programs=Q.programs,v.capabilities=Vt,v.extensions=$t,v.properties=Rt,v.renderLists=Z,v.shadowMap=Ct,v.state=At,v.info=De}B();const ct=new ey(v,k);this.xr=ct,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const D=$t.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=$t.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(D){D!==void 0&&(G=D,this.setSize(X,K,!1))},this.getSize=function(D){return D.set(X,K)},this.setSize=function(D,H,q=!0){if(ct.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=D,K=H,e.width=Math.floor(D*G),e.height=Math.floor(H*G),q===!0&&(e.style.width=D+"px",e.style.height=H+"px"),this.setViewport(0,0,D,H)},this.getDrawingBufferSize=function(D){return D.set(X*G,K*G).floor()},this.setDrawingBufferSize=function(D,H,q){X=D,K=H,G=q,e.width=Math.floor(D*q),e.height=Math.floor(H*q),this.setViewport(0,0,D,H)},this.getCurrentViewport=function(D){return D.copy(R)},this.getViewport=function(D){return D.copy(bt)},this.setViewport=function(D,H,q,$){D.isVector4?bt.set(D.x,D.y,D.z,D.w):bt.set(D,H,q,$),At.viewport(R.copy(bt).multiplyScalar(G).round())},this.getScissor=function(D){return D.copy(Ft)},this.setScissor=function(D,H,q,$){D.isVector4?Ft.set(D.x,D.y,D.z,D.w):Ft.set(D,H,q,$),At.scissor(P.copy(Ft).multiplyScalar(G).round())},this.getScissorTest=function(){return Yt},this.setScissorTest=function(D){At.setScissorTest(Yt=D)},this.setOpaqueSort=function(D){et=D},this.setTransparentSort=function(D){lt=D},this.getClearColor=function(D){return D.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor(...arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha(...arguments)},this.clear=function(D=!0,H=!0,q=!0){let $=0;if(D){let V=!1;if(L!==null){const ot=L.texture.format;V=ot===au||ot===ou||ot===ru}if(V){const ot=L.texture.type,gt=ot===pi||ot===Ys||ot===yo||ot===bo||ot===nu||ot===iu,Et=Lt.getClearColor(),yt=Lt.getClearAlpha(),Bt=Et.r,Wt=Et.g,Nt=Et.b;gt?(m[0]=Bt,m[1]=Wt,m[2]=Nt,m[3]=yt,k.clearBufferuiv(k.COLOR,0,m)):(_[0]=Bt,_[1]=Wt,_[2]=Nt,_[3]=yt,k.clearBufferiv(k.COLOR,0,_))}else $|=k.COLOR_BUFFER_BIT}H&&($|=k.DEPTH_BUFFER_BIT),q&&($|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ut,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",rt,!1),Lt.dispose(),Z.dispose(),Pt.dispose(),Rt.dispose(),an.dispose(),ze.dispose(),Y.dispose(),mt.dispose(),Zt.dispose(),Q.dispose(),ct.dispose(),ct.removeEventListener("sessionstart",mi),ct.removeEventListener("sessionend",Iu),As.stop()};function ut(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const D=De.autoReset,H=Ct.enabled,q=Ct.autoUpdate,$=Ct.needsUpdate,V=Ct.type;B(),De.autoReset=D,Ct.enabled=H,Ct.autoUpdate=q,Ct.needsUpdate=$,Ct.type=V}function rt(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function nt(D){const H=D.target;H.removeEventListener("dispose",nt),wt(H)}function wt(D){qt(D),Rt.remove(D)}function qt(D){const H=Rt.get(D).programs;H!==void 0&&(H.forEach(function(q){Q.releaseProgram(q)}),D.isShaderMaterial&&Q.releaseShaderCache(D))}this.renderBufferDirect=function(D,H,q,$,V,ot){H===null&&(H=_t);const gt=V.isMesh&&V.matrixWorld.determinant()<0,Et=hm(D,H,q,$,V);At.setMaterial($,gt);let yt=q.index,Bt=1;if($.wireframe===!0){if(yt=T.getWireframeAttribute(q),yt===void 0)return;Bt=2}const Wt=q.drawRange,Nt=q.attributes.position;let oe=Wt.start*Bt,be=(Wt.start+Wt.count)*Bt;ot!==null&&(oe=Math.max(oe,ot.start*Bt),be=Math.min(be,(ot.start+ot.count)*Bt)),yt!==null?(oe=Math.max(oe,0),be=Math.min(be,yt.count)):Nt!=null&&(oe=Math.max(oe,0),be=Math.min(be,Nt.count));const ke=be-oe;if(ke<0||ke===1/0)return;mt.setup(V,$,Et,q,yt);let Ce,Te=vt;if(yt!==null&&(Ce=I.get(yt),Te=Gt,Te.setIndex(Ce)),V.isMesh)$.wireframe===!0?(At.setLineWidth($.wireframeLinewidth*pn()),Te.setMode(k.LINES)):Te.setMode(k.TRIANGLES);else if(V.isLine){let Ot=$.linewidth;Ot===void 0&&(Ot=1),At.setLineWidth(Ot*pn()),V.isLineSegments?Te.setMode(k.LINES):V.isLineLoop?Te.setMode(k.LINE_LOOP):Te.setMode(k.LINE_STRIP)}else V.isPoints?Te.setMode(k.POINTS):V.isSprite&&Te.setMode(k.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)wo("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Te.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if($t.get("WEBGL_multi_draw"))Te.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Ot=V._multiDrawStarts,Ie=V._multiDrawCounts,fe=V._multiDrawCount,On=yt?I.get(yt).bytesPerElement:1,$s=Rt.get($).currentProgram.getUniforms();for(let kn=0;kn<fe;kn++)$s.setValue(k,"_gl_DrawID",kn),Te.render(Ot[kn]/On,Ie[kn])}else if(V.isInstancedMesh)Te.renderInstances(oe,ke,V.count);else if(q.isInstancedBufferGeometry){const Ot=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ie=Math.min(q.instanceCount,Ot);Te.renderInstances(oe,ke,Ie)}else Te.render(oe,ke)};function Ae(D,H,q){D.transparent===!0&&D.side===Jn&&D.forceSinglePass===!1?(D.side=Cn,D.needsUpdate=!0,Ho(D,H,q),D.side=Hi,D.needsUpdate=!0,Ho(D,H,q),D.side=Jn):Ho(D,H,q)}this.compile=function(D,H,q=null){q===null&&(q=D),p=Pt.get(q),p.init(H),S.push(p),q.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),D!==q&&D.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const $=new Set;return D.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const ot=V.material;if(ot)if(Array.isArray(ot))for(let gt=0;gt<ot.length;gt++){const Et=ot[gt];Ae(Et,q,V),$.add(Et)}else Ae(ot,q,V),$.add(ot)}),p=S.pop(),$},this.compileAsync=function(D,H,q=null){const $=this.compile(D,H,q);return new Promise(V=>{function ot(){if($.forEach(function(gt){Rt.get(gt).currentProgram.isReady()&&$.delete(gt)}),$.size===0){V(D);return}setTimeout(ot,10)}$t.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let me=null;function Ri(D){me&&me(D)}function mi(){As.stop()}function Iu(){As.start()}const As=new Jp;As.setAnimationLoop(Ri),typeof self<"u"&&As.setContext(self),this.setAnimationLoop=function(D){me=D,ct.setAnimationLoop(D),D===null?As.stop():As.start()},ct.addEventListener("sessionstart",mi),ct.addEventListener("sessionend",Iu),this.render=function(D,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ct.enabled===!0&&ct.isPresenting===!0&&(ct.cameraAutoUpdate===!0&&ct.updateCamera(H),H=ct.getCamera()),D.isScene===!0&&D.onBeforeRender(v,D,H,L),p=Pt.get(D,S.length),p.init(H),S.push(p),it.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),se.setFromProjectionMatrix(it,Si,H.reversedDepth),tt=this.localClippingEnabled,ae=ht.init(this.clippingPlanes,tt),g=Z.get(D,M.length),g.init(),M.push(g),ct.enabled===!0&&ct.isPresenting===!0){const ot=v.xr.getDepthSensingMesh();ot!==null&&Ec(ot,H,-1/0,v.sortObjects)}Ec(D,H,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(et,lt),le=ct.enabled===!1||ct.isPresenting===!1||ct.hasDepthSensing()===!1,le&&Lt.addToRenderList(g,D),this.info.render.frame++,ae===!0&&ht.beginShadows();const q=p.state.shadowsArray;Ct.render(q,D,H),ae===!0&&ht.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=g.opaque,V=g.transmissive;if(p.setupLights(),H.isArrayCamera){const ot=H.cameras;if(V.length>0)for(let gt=0,Et=ot.length;gt<Et;gt++){const yt=ot[gt];Uu($,V,D,yt)}le&&Lt.render(D);for(let gt=0,Et=ot.length;gt<Et;gt++){const yt=ot[gt];Nu(g,D,yt,yt.viewport)}}else V.length>0&&Uu($,V,D,H),le&&Lt.render(D),Nu(g,D,H);L!==null&&b===0&&(Qt.updateMultisampleRenderTarget(L),Qt.updateRenderTargetMipmap(L)),D.isScene===!0&&D.onAfterRender(v,D,H),mt.resetDefaultState(),x=-1,y=null,S.pop(),S.length>0?(p=S[S.length-1],ae===!0&&ht.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function Ec(D,H,q,$){if(D.visible===!1)return;if(D.layers.test(H.layers)){if(D.isGroup)q=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(H);else if(D.isLight)p.pushLight(D),D.castShadow&&p.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||se.intersectsSprite(D)){$&&Ut.setFromMatrixPosition(D.matrixWorld).applyMatrix4(it);const gt=Y.update(D),Et=D.material;Et.visible&&g.push(D,gt,Et,q,Ut.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||se.intersectsObject(D))){const gt=Y.update(D),Et=D.material;if($&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),Ut.copy(D.boundingSphere.center)):(gt.boundingSphere===null&&gt.computeBoundingSphere(),Ut.copy(gt.boundingSphere.center)),Ut.applyMatrix4(D.matrixWorld).applyMatrix4(it)),Array.isArray(Et)){const yt=gt.groups;for(let Bt=0,Wt=yt.length;Bt<Wt;Bt++){const Nt=yt[Bt],oe=Et[Nt.materialIndex];oe&&oe.visible&&g.push(D,gt,oe,q,Ut.z,Nt)}}else Et.visible&&g.push(D,gt,Et,q,Ut.z,null)}}const ot=D.children;for(let gt=0,Et=ot.length;gt<Et;gt++)Ec(ot[gt],H,q,$)}function Nu(D,H,q,$){const V=D.opaque,ot=D.transmissive,gt=D.transparent;p.setupLightsView(q),ae===!0&&ht.setGlobalState(v.clippingPlanes,q),$&&At.viewport(R.copy($)),V.length>0&&Go(V,H,q),ot.length>0&&Go(ot,H,q),gt.length>0&&Go(gt,H,q),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function Uu(D,H,q,$){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new ei(1,1,{generateMipmaps:!0,type:$t.has("EXT_color_buffer_half_float")||$t.has("EXT_color_buffer_float")?zi:pi,minFilter:Vs,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:de.workingColorSpace}));const ot=p.state.transmissionRenderTarget[$.id],gt=$.viewport||R;ot.setSize(gt.z*v.transmissionResolutionScale,gt.w*v.transmissionResolutionScale);const Et=v.getRenderTarget(),yt=v.getActiveCubeFace(),Bt=v.getActiveMipmapLevel();v.setRenderTarget(ot),v.getClearColor(z),W=v.getClearAlpha(),W<1&&v.setClearColor(16777215,.5),v.clear(),le&&Lt.render(q);const Wt=v.toneMapping;v.toneMapping=_s;const Nt=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),ae===!0&&ht.setGlobalState(v.clippingPlanes,$),Go(D,q,$),Qt.updateMultisampleRenderTarget(ot),Qt.updateRenderTargetMipmap(ot),$t.has("WEBGL_multisampled_render_to_texture")===!1){let oe=!1;for(let be=0,ke=H.length;be<ke;be++){const Ce=H[be],Te=Ce.object,Ot=Ce.geometry,Ie=Ce.material,fe=Ce.group;if(Ie.side===Jn&&Te.layers.test($.layers)){const On=Ie.side;Ie.side=Cn,Ie.needsUpdate=!0,Ou(Te,q,$,Ot,Ie,fe),Ie.side=On,Ie.needsUpdate=!0,oe=!0}}oe===!0&&(Qt.updateMultisampleRenderTarget(ot),Qt.updateRenderTargetMipmap(ot))}v.setRenderTarget(Et,yt,Bt),v.setClearColor(z,W),Nt!==void 0&&($.viewport=Nt),v.toneMapping=Wt}function Go(D,H,q){const $=H.isScene===!0?H.overrideMaterial:null;for(let V=0,ot=D.length;V<ot;V++){const gt=D[V],Et=gt.object,yt=gt.geometry,Bt=gt.group;let Wt=gt.material;Wt.allowOverride===!0&&$!==null&&(Wt=$),Et.layers.test(q.layers)&&Ou(Et,H,q,yt,Wt,Bt)}}function Ou(D,H,q,$,V,ot){D.onBeforeRender(v,H,q,$,V,ot),D.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),V.onBeforeRender(v,H,q,$,D,ot),V.transparent===!0&&V.side===Jn&&V.forceSinglePass===!1?(V.side=Cn,V.needsUpdate=!0,v.renderBufferDirect(q,H,$,V,D,ot),V.side=Hi,V.needsUpdate=!0,v.renderBufferDirect(q,H,$,V,D,ot),V.side=Jn):v.renderBufferDirect(q,H,$,V,D,ot),D.onAfterRender(v,H,q,$,V,ot)}function Ho(D,H,q){H.isScene!==!0&&(H=_t);const $=Rt.get(D),V=p.state.lights,ot=p.state.shadowsArray,gt=V.state.version,Et=Q.getParameters(D,V.state,ot,H,q),yt=Q.getProgramCacheKey(Et);let Bt=$.programs;$.environment=D.isMeshStandardMaterial?H.environment:null,$.fog=H.fog,$.envMap=(D.isMeshStandardMaterial?ze:an).get(D.envMap||$.environment),$.envMapRotation=$.environment!==null&&D.envMap===null?H.environmentRotation:D.envMapRotation,Bt===void 0&&(D.addEventListener("dispose",nt),Bt=new Map,$.programs=Bt);let Wt=Bt.get(yt);if(Wt!==void 0){if($.currentProgram===Wt&&$.lightsStateVersion===gt)return Fu(D,Et),Wt}else Et.uniforms=Q.getUniforms(D),D.onBeforeCompile(Et,v),Wt=Q.acquireProgram(Et,yt),Bt.set(yt,Wt),$.uniforms=Et.uniforms;const Nt=$.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Nt.clippingPlanes=ht.uniform),Fu(D,Et),$.needsLights=fm(D),$.lightsStateVersion=gt,$.needsLights&&(Nt.ambientLightColor.value=V.state.ambient,Nt.lightProbe.value=V.state.probe,Nt.directionalLights.value=V.state.directional,Nt.directionalLightShadows.value=V.state.directionalShadow,Nt.spotLights.value=V.state.spot,Nt.spotLightShadows.value=V.state.spotShadow,Nt.rectAreaLights.value=V.state.rectArea,Nt.ltc_1.value=V.state.rectAreaLTC1,Nt.ltc_2.value=V.state.rectAreaLTC2,Nt.pointLights.value=V.state.point,Nt.pointLightShadows.value=V.state.pointShadow,Nt.hemisphereLights.value=V.state.hemi,Nt.directionalShadowMap.value=V.state.directionalShadowMap,Nt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Nt.spotShadowMap.value=V.state.spotShadowMap,Nt.spotLightMatrix.value=V.state.spotLightMatrix,Nt.spotLightMap.value=V.state.spotLightMap,Nt.pointShadowMap.value=V.state.pointShadowMap,Nt.pointShadowMatrix.value=V.state.pointShadowMatrix),$.currentProgram=Wt,$.uniformsList=null,Wt}function ku(D){if(D.uniformsList===null){const H=D.currentProgram.getUniforms();D.uniformsList=Fa.seqWithValue(H.seq,D.uniforms)}return D.uniformsList}function Fu(D,H){const q=Rt.get(D);q.outputColorSpace=H.outputColorSpace,q.batching=H.batching,q.batchingColor=H.batchingColor,q.instancing=H.instancing,q.instancingColor=H.instancingColor,q.instancingMorph=H.instancingMorph,q.skinning=H.skinning,q.morphTargets=H.morphTargets,q.morphNormals=H.morphNormals,q.morphColors=H.morphColors,q.morphTargetsCount=H.morphTargetsCount,q.numClippingPlanes=H.numClippingPlanes,q.numIntersection=H.numClipIntersection,q.vertexAlphas=H.vertexAlphas,q.vertexTangents=H.vertexTangents,q.toneMapping=H.toneMapping}function hm(D,H,q,$,V){H.isScene!==!0&&(H=_t),Qt.resetTextureUnits();const ot=H.fog,gt=$.isMeshStandardMaterial?H.environment:null,Et=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Or,yt=($.isMeshStandardMaterial?ze:an).get($.envMap||gt),Bt=$.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Wt=!!q.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Nt=!!q.morphAttributes.position,oe=!!q.morphAttributes.normal,be=!!q.morphAttributes.color;let ke=_s;$.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(ke=v.toneMapping);const Ce=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Te=Ce!==void 0?Ce.length:0,Ot=Rt.get($),Ie=p.state.lights;if(ae===!0&&(tt===!0||D!==y)){const En=D===y&&$.id===x;ht.setState($,D,En)}let fe=!1;$.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==Ie.state.version||Ot.outputColorSpace!==Et||V.isBatchedMesh&&Ot.batching===!1||!V.isBatchedMesh&&Ot.batching===!0||V.isBatchedMesh&&Ot.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Ot.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Ot.instancing===!1||!V.isInstancedMesh&&Ot.instancing===!0||V.isSkinnedMesh&&Ot.skinning===!1||!V.isSkinnedMesh&&Ot.skinning===!0||V.isInstancedMesh&&Ot.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ot.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ot.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ot.instancingMorph===!1&&V.morphTexture!==null||Ot.envMap!==yt||$.fog===!0&&Ot.fog!==ot||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==ht.numPlanes||Ot.numIntersection!==ht.numIntersection)||Ot.vertexAlphas!==Bt||Ot.vertexTangents!==Wt||Ot.morphTargets!==Nt||Ot.morphNormals!==oe||Ot.morphColors!==be||Ot.toneMapping!==ke||Ot.morphTargetsCount!==Te)&&(fe=!0):(fe=!0,Ot.__version=$.version);let On=Ot.currentProgram;fe===!0&&(On=Ho($,H,V));let $s=!1,kn=!1,to=!1;const Ne=On.getUniforms(),Kn=Ot.uniforms;if(At.useProgram(On.program)&&($s=!0,kn=!0,to=!0),$.id!==x&&(x=$.id,kn=!0),$s||y!==D){At.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Ne.setValue(k,"projectionMatrix",D.projectionMatrix),Ne.setValue(k,"viewMatrix",D.matrixWorldInverse);const Dn=Ne.map.cameraPosition;Dn!==void 0&&Dn.setValue(k,xt.setFromMatrixPosition(D.matrixWorld)),Vt.logarithmicDepthBuffer&&Ne.setValue(k,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Ne.setValue(k,"isOrthographic",D.isOrthographicCamera===!0),y!==D&&(y=D,kn=!0,to=!0)}if(V.isSkinnedMesh){Ne.setOptional(k,V,"bindMatrix"),Ne.setOptional(k,V,"bindMatrixInverse");const En=V.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),Ne.setValue(k,"boneTexture",En.boneTexture,Qt))}V.isBatchedMesh&&(Ne.setOptional(k,V,"batchingTexture"),Ne.setValue(k,"batchingTexture",V._matricesTexture,Qt),Ne.setOptional(k,V,"batchingIdTexture"),Ne.setValue(k,"batchingIdTexture",V._indirectTexture,Qt),Ne.setOptional(k,V,"batchingColorTexture"),V._colorsTexture!==null&&Ne.setValue(k,"batchingColorTexture",V._colorsTexture,Qt));const qn=q.morphAttributes;if((qn.position!==void 0||qn.normal!==void 0||qn.color!==void 0)&&at.update(V,q,On),(kn||Ot.receiveShadow!==V.receiveShadow)&&(Ot.receiveShadow=V.receiveShadow,Ne.setValue(k,"receiveShadow",V.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Kn.envMap.value=yt,Kn.flipEnvMap.value=yt.isCubeTexture&&yt.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&H.environment!==null&&(Kn.envMapIntensity.value=H.environmentIntensity),kn&&(Ne.setValue(k,"toneMappingExposure",v.toneMappingExposure),Ot.needsLights&&um(Kn,to),ot&&$.fog===!0&&st.refreshFogUniforms(Kn,ot),st.refreshMaterialUniforms(Kn,$,G,K,p.state.transmissionRenderTarget[D.id]),Fa.upload(k,ku(Ot),Kn,Qt)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Fa.upload(k,ku(Ot),Kn,Qt),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Ne.setValue(k,"center",V.center),Ne.setValue(k,"modelViewMatrix",V.modelViewMatrix),Ne.setValue(k,"normalMatrix",V.normalMatrix),Ne.setValue(k,"modelMatrix",V.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const En=$.uniformsGroups;for(let Dn=0,wc=En.length;Dn<wc;Dn++){const Rs=En[Dn];Zt.update(Rs,On),Zt.bind(Rs,On)}}return On}function um(D,H){D.ambientLightColor.needsUpdate=H,D.lightProbe.needsUpdate=H,D.directionalLights.needsUpdate=H,D.directionalLightShadows.needsUpdate=H,D.pointLights.needsUpdate=H,D.pointLightShadows.needsUpdate=H,D.spotLights.needsUpdate=H,D.spotLightShadows.needsUpdate=H,D.rectAreaLights.needsUpdate=H,D.hemisphereLights.needsUpdate=H}function fm(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(D,H,q){const $=Rt.get(D);$.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Rt.get(D.texture).__webglTexture=H,Rt.get(D.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:q,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,H){const q=Rt.get(D);q.__webglFramebuffer=H,q.__useDefaultFramebuffer=H===void 0};const dm=k.createFramebuffer();this.setRenderTarget=function(D,H=0,q=0){L=D,w=H,b=q;let $=!0,V=null,ot=!1,gt=!1;if(D){const yt=Rt.get(D);if(yt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(k.FRAMEBUFFER,null),$=!1;else if(yt.__webglFramebuffer===void 0)Qt.setupRenderTarget(D);else if(yt.__hasExternalTextures)Qt.rebindTextures(D,Rt.get(D.texture).__webglTexture,Rt.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const Nt=D.depthTexture;if(yt.__boundDepthTexture!==Nt){if(Nt!==null&&Rt.has(Nt)&&(D.width!==Nt.image.width||D.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Qt.setupDepthRenderbuffer(D)}}const Bt=D.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(gt=!0);const Wt=Rt.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Wt[H])?V=Wt[H][q]:V=Wt[H],ot=!0):D.samples>0&&Qt.useMultisampledRTT(D)===!1?V=Rt.get(D).__webglMultisampledFramebuffer:Array.isArray(Wt)?V=Wt[q]:V=Wt,R.copy(D.viewport),P.copy(D.scissor),U=D.scissorTest}else R.copy(bt).multiplyScalar(G).floor(),P.copy(Ft).multiplyScalar(G).floor(),U=Yt;if(q!==0&&(V=dm),At.bindFramebuffer(k.FRAMEBUFFER,V)&&$&&At.drawBuffers(D,V),At.viewport(R),At.scissor(P),At.setScissorTest(U),ot){const yt=Rt.get(D.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+H,yt.__webglTexture,q)}else if(gt){const yt=H;for(let Bt=0;Bt<D.textures.length;Bt++){const Wt=Rt.get(D.textures[Bt]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Bt,Wt.__webglTexture,q,yt)}}else if(D!==null&&q!==0){const yt=Rt.get(D.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,yt.__webglTexture,q)}x=-1},this.readRenderTargetPixels=function(D,H,q,$,V,ot,gt,Et=0){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=Rt.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&gt!==void 0&&(yt=yt[gt]),yt){At.bindFramebuffer(k.FRAMEBUFFER,yt);try{const Bt=D.textures[Et],Wt=Bt.format,Nt=Bt.type;if(!Vt.textureFormatReadable(Wt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Vt.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=D.width-$&&q>=0&&q<=D.height-V&&(D.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Et),k.readPixels(H,q,$,V,Dt.convert(Wt),Dt.convert(Nt),ot))}finally{const Bt=L!==null?Rt.get(L).__webglFramebuffer:null;At.bindFramebuffer(k.FRAMEBUFFER,Bt)}}},this.readRenderTargetPixelsAsync=async function(D,H,q,$,V,ot,gt,Et=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=Rt.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&gt!==void 0&&(yt=yt[gt]),yt)if(H>=0&&H<=D.width-$&&q>=0&&q<=D.height-V){At.bindFramebuffer(k.FRAMEBUFFER,yt);const Bt=D.textures[Et],Wt=Bt.format,Nt=Bt.type;if(!Vt.textureFormatReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Vt.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const oe=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,oe),k.bufferData(k.PIXEL_PACK_BUFFER,ot.byteLength,k.STREAM_READ),D.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Et),k.readPixels(H,q,$,V,Dt.convert(Wt),Dt.convert(Nt),0);const be=L!==null?Rt.get(L).__webglFramebuffer:null;At.bindFramebuffer(k.FRAMEBUFFER,be);const ke=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Og(k,ke,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,oe),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,ot),k.deleteBuffer(oe),k.deleteSync(ke),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,H=null,q=0){const $=Math.pow(2,-q),V=Math.floor(D.image.width*$),ot=Math.floor(D.image.height*$),gt=H!==null?H.x:0,Et=H!==null?H.y:0;Qt.setTexture2D(D,0),k.copyTexSubImage2D(k.TEXTURE_2D,q,0,0,gt,Et,V,ot),At.unbindTexture()};const pm=k.createFramebuffer(),mm=k.createFramebuffer();this.copyTextureToTexture=function(D,H,q=null,$=null,V=0,ot=null){ot===null&&(V!==0?(wo("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ot=V,V=0):ot=0);let gt,Et,yt,Bt,Wt,Nt,oe,be,ke;const Ce=D.isCompressedTexture?D.mipmaps[ot]:D.image;if(q!==null)gt=q.max.x-q.min.x,Et=q.max.y-q.min.y,yt=q.isBox3?q.max.z-q.min.z:1,Bt=q.min.x,Wt=q.min.y,Nt=q.isBox3?q.min.z:0;else{const qn=Math.pow(2,-V);gt=Math.floor(Ce.width*qn),Et=Math.floor(Ce.height*qn),D.isDataArrayTexture?yt=Ce.depth:D.isData3DTexture?yt=Math.floor(Ce.depth*qn):yt=1,Bt=0,Wt=0,Nt=0}$!==null?(oe=$.x,be=$.y,ke=$.z):(oe=0,be=0,ke=0);const Te=Dt.convert(H.format),Ot=Dt.convert(H.type);let Ie;H.isData3DTexture?(Qt.setTexture3D(H,0),Ie=k.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(Qt.setTexture2DArray(H,0),Ie=k.TEXTURE_2D_ARRAY):(Qt.setTexture2D(H,0),Ie=k.TEXTURE_2D),k.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,H.flipY),k.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),k.pixelStorei(k.UNPACK_ALIGNMENT,H.unpackAlignment);const fe=k.getParameter(k.UNPACK_ROW_LENGTH),On=k.getParameter(k.UNPACK_IMAGE_HEIGHT),$s=k.getParameter(k.UNPACK_SKIP_PIXELS),kn=k.getParameter(k.UNPACK_SKIP_ROWS),to=k.getParameter(k.UNPACK_SKIP_IMAGES);k.pixelStorei(k.UNPACK_ROW_LENGTH,Ce.width),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ce.height),k.pixelStorei(k.UNPACK_SKIP_PIXELS,Bt),k.pixelStorei(k.UNPACK_SKIP_ROWS,Wt),k.pixelStorei(k.UNPACK_SKIP_IMAGES,Nt);const Ne=D.isDataArrayTexture||D.isData3DTexture,Kn=H.isDataArrayTexture||H.isData3DTexture;if(D.isDepthTexture){const qn=Rt.get(D),En=Rt.get(H),Dn=Rt.get(qn.__renderTarget),wc=Rt.get(En.__renderTarget);At.bindFramebuffer(k.READ_FRAMEBUFFER,Dn.__webglFramebuffer),At.bindFramebuffer(k.DRAW_FRAMEBUFFER,wc.__webglFramebuffer);for(let Rs=0;Rs<yt;Rs++)Ne&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Rt.get(D).__webglTexture,V,Nt+Rs),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Rt.get(H).__webglTexture,ot,ke+Rs)),k.blitFramebuffer(Bt,Wt,gt,Et,oe,be,gt,Et,k.DEPTH_BUFFER_BIT,k.NEAREST);At.bindFramebuffer(k.READ_FRAMEBUFFER,null),At.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(V!==0||D.isRenderTargetTexture||Rt.has(D)){const qn=Rt.get(D),En=Rt.get(H);At.bindFramebuffer(k.READ_FRAMEBUFFER,pm),At.bindFramebuffer(k.DRAW_FRAMEBUFFER,mm);for(let Dn=0;Dn<yt;Dn++)Ne?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,qn.__webglTexture,V,Nt+Dn):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,qn.__webglTexture,V),Kn?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,En.__webglTexture,ot,ke+Dn):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,En.__webglTexture,ot),V!==0?k.blitFramebuffer(Bt,Wt,gt,Et,oe,be,gt,Et,k.COLOR_BUFFER_BIT,k.NEAREST):Kn?k.copyTexSubImage3D(Ie,ot,oe,be,ke+Dn,Bt,Wt,gt,Et):k.copyTexSubImage2D(Ie,ot,oe,be,Bt,Wt,gt,Et);At.bindFramebuffer(k.READ_FRAMEBUFFER,null),At.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Kn?D.isDataTexture||D.isData3DTexture?k.texSubImage3D(Ie,ot,oe,be,ke,gt,Et,yt,Te,Ot,Ce.data):H.isCompressedArrayTexture?k.compressedTexSubImage3D(Ie,ot,oe,be,ke,gt,Et,yt,Te,Ce.data):k.texSubImage3D(Ie,ot,oe,be,ke,gt,Et,yt,Te,Ot,Ce):D.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,ot,oe,be,gt,Et,Te,Ot,Ce.data):D.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,ot,oe,be,Ce.width,Ce.height,Te,Ce.data):k.texSubImage2D(k.TEXTURE_2D,ot,oe,be,gt,Et,Te,Ot,Ce);k.pixelStorei(k.UNPACK_ROW_LENGTH,fe),k.pixelStorei(k.UNPACK_IMAGE_HEIGHT,On),k.pixelStorei(k.UNPACK_SKIP_PIXELS,$s),k.pixelStorei(k.UNPACK_SKIP_ROWS,kn),k.pixelStorei(k.UNPACK_SKIP_IMAGES,to),ot===0&&H.generateMipmaps&&k.generateMipmap(Ie),At.unbindTexture()},this.initRenderTarget=function(D){Rt.get(D).__webglFramebuffer===void 0&&Qt.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?Qt.setTextureCube(D,0):D.isData3DTexture?Qt.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?Qt.setTexture2DArray(D,0):Qt.setTexture2D(D,0),At.unbindTexture()},this.resetState=function(){w=0,b=0,L=null,At.reset(),mt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=de._getDrawingBufferColorSpace(t),e.unpackColorSpace=de._getUnpackColorSpace()}}const Fi=9,Tr=36,cl=4,Fe=(i,t=1,e=0)=>e?{id:i,count:t,dmg:e}:{id:i,count:t},Ar=i=>Array.from({length:i},()=>null);function i0(i,t){return i.id===t.id&&(i.dmg??0)===(t.dmg??0)&&hs(i.id)>1}function oy(i){var a;if(!i||typeof i!="object")return null;const{id:t,count:e,dmg:n}=i;if(!Vm(t)||!Number.isInteger(e)||e<=0)return null;const s=hs(t),r=((a=pe(t))==null?void 0:a.durability)??0,o=Number.isInteger(n)?Math.max(0,Math.min(r,n)):0;return Fe(t,Math.min(s,e),o)}function jf(i,t){const e=Ar(t);if(Array.isArray(i))for(let n=0;n<t;n++)e[n]=oy(i[n]);return e}const ay=Array.from({length:Tr},(i,t)=>t);function ui(i,t,e=ay){let n=t.count;const s=hs(t.id);for(const r of e){const o=i[r];if(n<=0)break;if(o&&i0(o,t)&&o.count<s){const a=Math.min(n,s-o.count);o.count+=a,n-=a}}for(const r of e){if(n<=0)break;if(!i[r]){const o=Math.min(n,s);i[r]={...t,count:o},n-=o}}return n}function Zf(i,t=1){var s;const e=(s=pe(i.id))==null?void 0:s.durability;if(!e)return i;const n=(i.dmg??0)+t;return n>=e?null:{...i,dmg:n}}function cy(i,t){const e=je[Xt(i)];return e.harvestLevel<0?!0:!!(t!=null&&t.tool)&&t.tool.type===e.tool&&t.tool.level>=e.harvestLevel}function ly(i,t,e=!1,n=!0){var c;const s=je[Xt(i)];if(s.hardness<0)return 1/0;if(s.hardness===0)return 0;const r=t===null?void 0:pe(t);let o=1;r!=null&&r.tool&&s.tool===r.tool.type&&(o=r.tool.speed),((c=r==null?void 0:r.tool)==null?void 0:c.type)==="sword"&&s.tool==="shears"&&(o=1.5);let a=o/s.hardness/(cy(i,r)?30:100);return e&&(a/=5),n||(a/=5),a>=1?0:Math.ceil(1/a)/20}const hy=[0,0,0,1,1,1],J=i=>i/16;function Yn(i,t){let[e,n,s,r,o,a]=i;for(let c=0;c<(t&3);c++){const l=1-a,h=1-s;s=e,a=r,e=l,r=h}return[e,n,s,r,o,a]}function uy(i){const t=J(3),e=(i&4)!==0,n=[0,0,1-t,1,1,1];return[Yn(e?[0,0,0,t,1,1]:n,i&3)]}function fy(i){const t=(i&4)!==0;return[t?[0,.5,0,1,1,1]:[0,0,0,1,.5,1],Yn(t?[0,0,0,1,.5,.5]:[0,.5,0,1,1,.5],i&3)]}const dy=i=>{const t=Xt(i);return t===A.OAK_FENCE||t===A.OAK_FENCE_GATE||un[t]===1&&dn[t]===lc},py=i=>{const t=Xt(i);return t===A.GLASS_PANE||t===A.GLASS||un[t]===1&&dn[t]===lc};function my(i){const t=[J(7),0,J(7),J(9),1,J(9)],e=[];for(let n=0;n<4;n++){const[s,,r]=Po[n];i&&py(i(s,0,r))&&e.push(Yn([J(7),0,0,J(9),1,J(7)],n))}if(!e.length)for(let n=0;n<4;n++)e.push(Yn([J(7),0,0,J(9),1,J(7)],n));return[t,...e]}function gy(i){const t=J(3);return i&4?[Yn([0,0,0,1,1,t],i&3)]:[i&8?[0,1-t,0,1,1,1]:[0,0,0,1,t,1]]}function s0(i,t){const e=(i&4)!==0;let n;if(t){if(e)return[];n=[[0,0,J(6),1,1.5,J(10)]]}else e?n=[[0,J(5),J(7),J(2),1,J(9)],[J(14),J(5),J(7),1,1,J(9)],[0,J(6),J(9),J(2),J(9),J(15)],[0,J(12),J(9),J(2),J(15),J(15)],[J(14),J(6),J(9),1,J(9),J(15)],[J(14),J(12),J(9),1,J(15),J(15)]]:n=[[0,J(5),J(7),J(2),1,J(9)],[J(14),J(5),J(7),1,1,J(9)],[J(2),J(6),J(7),J(14),J(9),J(9)],[J(2),J(12),J(7),J(14),J(15),J(9)],[J(6),J(9),J(7),J(8),J(12),J(9)],[J(8),J(9),J(7),J(10),J(12),J(9)]];return i&1?n.map(s=>Yn(s,1)):n}function r0(i,t,e){const s=[[J(6),0,J(6),J(10),t,J(10)]];if(!i)return s;for(let r=0;r<4;r++){const[o,,a]=Po[r];dy(i(o,0,a))&&(e?s.push(Yn([J(6),0,0,J(10),t,J(6)],r)):(s.push(Yn([J(7),J(12),0,J(9),J(15),J(6)],r)),s.push(Yn([J(7),J(6),0,J(9),J(9),J(6)],r))))}return s}function mu(i,t){const e=Xt(i),n=Ms(i);switch(dn[e]){case go:return[n&1?[0,.5,0,1,1,1]:[0,0,0,1,.5,1]];case hp:return fy(n);case Kh:return uy(n);case Kr:return[Yn([0,0,0,1,1,J(1)],n&3)];case qh:return r0(t,1,!1);case $h:return[[0,0,0,1,J(9),1]];case up:return[[0,0,0,1,J(15),1]];case fp:return[[J(1),0,J(1),J(15),1,J(15)]];case Ol:return[[J(1),0,J(1),J(15),J(14),J(15)]];case dp:return my(t);case jh:return gy(n);case hc:return s0(n,!1);case lc:return[hy];default:return[]}}function _y(i,t){const e=Xt(i),n=dn[e];if(e===A.AIR)return[];switch(n){case Vr:case Wr:case Uo:case Xr:case Yr:return[];case Kr:return[Yn([0,0,0,1,1,J(3)],Ms(i)&3)];case qh:return r0(t,1.5,!0);case hc:return s0(Ms(i),!0);default:return mu(i,t)}}function Ih(i,t){const e=Xt(i),n=Ms(i);switch(dn[e]){case Vr:case Xr:return[];case Wr:return[[J(2),0,J(2),J(14),J(13),J(14)]];case Uo:return[[0,0,0,1,J(2+2*Math.min(7,n&7)),1]];case Yr:return n===0?[[J(6),0,J(6),J(10),J(10),J(10)]]:[Yn([J(5.5),J(3),0,J(10.5),J(13),J(5)],n-1&3)];case Kr:return[Yn([0,0,0,1,1,J(3)],n&3)];default:return mu(i,t)}}const mr=1e-7;function o0(i,t,e,n,s,r,o){const a=[],c=Math.floor(t),l=Math.floor(s),h=Math.floor(e)-1,u=Math.floor(r),f=Math.floor(n),d=Math.floor(o);for(let m=h;m<=u;m++)for(let _=f;_<=d;_++)for(let g=c;g<=l;g++){const p=i.getState(g,m,_),M=Xt(p);if(M===A.AIR||dn[M]===Vr||!je[M].solid)continue;const S=_y(p,(v,E,w)=>i.getState(g+v,m+E,_+w));for(const v of S)a.push(g+v[0],m+v[1],_+v[2],g+v[3],m+v[4],_+v[5])}return a}function os(i,t,e,n){if(n===0)return 0;const s=(e+1)%3,r=(e+2)%3;for(let o=0;o<i.length;o+=6)i[o+s+3]<=t[s]+mr||i[o+s]>=t[s+3]-mr||i[o+r+3]<=t[r]+mr||i[o+r]>=t[r+3]-mr||(n>0&&t[e+3]<=i[o+e]+mr?n=Math.min(n,i[o+e]-t[e+3]):n<0&&t[e]>=i[o+e+3]-mr&&(n=Math.max(n,i[o+e+3]-t[e])));return n}const Oi=(i,t,e)=>{i[t]+=e,i[t+3]+=e};function a0(i){const t=i.width/2;return[i.x-t,i.y,i.z-t,i.x+t,i.y+i.height,i.z+t]}function vy(i,t,e,n,s,r=0){const o=a0(t),a=Math.max(r,0)+.01,c=o0(i,Math.min(o[0],o[0]+e)-.01,Math.min(o[1],o[1]+n)-.01,Math.min(o[2],o[2]+s)-.01,Math.max(o[3],o[3]+e)+.01,Math.max(o[4],o[4]+n)+a,Math.max(o[5],o[5]+s)+.01),l=[...o],h=os(c,l,1,n);Oi(l,1,h);const u=os(c,l,0,e);Oi(l,0,u);const f=os(c,l,2,s);Oi(l,2,f);const d=n<0&&h!==n,m=u!==e||f!==s;if(r>0&&m&&(t.onGround||d)){const _=[...o],g=os(c,_,1,r);Oi(_,1,g);const p=os(c,_,0,e);Oi(_,0,p);const M=os(c,_,2,s);Oi(_,2,M);const S=os(c,_,1,-g+(n<0?n:0));if(Oi(_,1,S),p*p+M*M>u*u+f*f+1e-6){l.splice(0,6,..._),t.x=(l[0]+l[3])/2,t.y=l[1],t.z=(l[2]+l[5])/2,t.onGround=!0,t.collidedH=p!==e||M!==s,p!==e&&(t.vx=0),M!==s&&(t.vz=0),t.vy=0;return}}t.x=(l[0]+l[3])/2,t.y=l[1],t.z=(l[2]+l[5])/2,t.onGround=d,t.collidedH=m,h!==n&&(t.vy=0),u!==e&&(t.vx=0),f!==s&&(t.vz=0)}function ll(i,t,e,n){const s=a0(t);Oi(s,0,e),Oi(s,2,n);const r=o0(i,s[0],s[1]-1,s[2],s[3],s[1],s[5]);return os(r,s,1,-1)>-1+1e-4}function xy(i,t,e,n){for(;e!==0&&!ll(i,t,e,0);)e=Math.abs(e)<.05?0:e-Math.sign(e)*.05;for(;n!==0&&!ll(i,t,0,n);)n=Math.abs(n)<.05?0:n-Math.sign(n)*.05;for(;e!==0&&n!==0&&!ll(i,t,e,n);)e=Math.abs(e)<.05?0:e-Math.sign(e)*.05,n=Math.abs(n)<.05?0:n-Math.sign(n)*.05;return[e,n]}function My(i,t,e){const n=t.width/2-.001,s={inWater:!1,inLava:!1,eyeInWater:!1,onLadder:!1},r=Math.floor(t.y),o=Math.floor(t.y+t.height-.01);for(let l=r;l<=o;l++)for(let h=Math.floor(t.z-n);h<=Math.floor(t.z+n);h++)for(let u=Math.floor(t.x-n);u<=Math.floor(t.x+n);u++){const f=i.getState(u,l,h),d=Xt(f);if(d===A.WATER||d===A.LAVA){const m=l+Xa(f);t.y+.1<m&&(d===A.WATER?s.inWater=!0:s.inLava=!0)}else je[d].climbable&&(s.onLadder=!0)}const a=t.y+e,c=i.getState(Math.floor(t.x),Math.floor(a),Math.floor(t.z));return Xt(c)===A.WATER&&a<Math.floor(a)+Xa(c)+.05&&(s.eyeInWater=!0),s}function Jf(i,t,e,n){const s=i.width/2;return i.x+s>t&&i.x-s<t+1&&i.y+i.height>e&&i.y<e+1&&i.z+s>n&&i.z-s<n+1}const c0=Math.sqrt(3),yy=.5*(c0-1),uo=(3-c0)/6,by=1/3,gi=1/6,_o=i=>Math.floor(i)|0,Qf=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]),hl=new Float64Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);function as(i=Math.random){const t=l0(i),e=new Float64Array(t).map(s=>Qf[s%12*2]),n=new Float64Array(t).map(s=>Qf[s%12*2+1]);return function(r,o){let a=0,c=0,l=0;const h=(r+o)*yy,u=_o(r+h),f=_o(o+h),d=(u+f)*uo,m=u-d,_=f-d,g=r-m,p=o-_;let M,S;g>p?(M=1,S=0):(M=0,S=1);const v=g-M+uo,E=p-S+uo,w=g-1+2*uo,b=p-1+2*uo,L=u&255,x=f&255;let y=.5-g*g-p*p;if(y>=0){const U=L+t[x],z=e[U],W=n[U];y*=y,a=y*y*(z*g+W*p)}let R=.5-v*v-E*E;if(R>=0){const U=L+M+t[x+S],z=e[U],W=n[U];R*=R,c=R*R*(z*v+W*E)}let P=.5-w*w-b*b;if(P>=0){const U=L+1+t[x+1],z=e[U],W=n[U];P*=P,l=P*P*(z*w+W*b)}return 70*(a+c+l)}}function ul(i=Math.random){const t=l0(i),e=new Float64Array(t).map(r=>hl[r%12*3]),n=new Float64Array(t).map(r=>hl[r%12*3+1]),s=new Float64Array(t).map(r=>hl[r%12*3+2]);return function(o,a,c){let l,h,u,f;const d=(o+a+c)*by,m=_o(o+d),_=_o(a+d),g=_o(c+d),p=(m+_+g)*gi,M=m-p,S=_-p,v=g-p,E=o-M,w=a-S,b=c-v;let L,x,y,R,P,U;E>=w?w>=b?(L=1,x=0,y=0,R=1,P=1,U=0):E>=b?(L=1,x=0,y=0,R=1,P=0,U=1):(L=0,x=0,y=1,R=1,P=0,U=1):w<b?(L=0,x=0,y=1,R=0,P=1,U=1):E<b?(L=0,x=1,y=0,R=0,P=1,U=1):(L=0,x=1,y=0,R=1,P=1,U=0);const z=E-L+gi,W=w-x+gi,X=b-y+gi,K=E-R+2*gi,G=w-P+2*gi,et=b-U+2*gi,lt=E-1+3*gi,bt=w-1+3*gi,Ft=b-1+3*gi,Yt=m&255,se=_&255,ae=g&255;let tt=.6-E*E-w*w-b*b;if(tt<0)l=0;else{const _t=Yt+t[se+t[ae]];tt*=tt,l=tt*tt*(e[_t]*E+n[_t]*w+s[_t]*b)}let it=.6-z*z-W*W-X*X;if(it<0)h=0;else{const _t=Yt+L+t[se+x+t[ae+y]];it*=it,h=it*it*(e[_t]*z+n[_t]*W+s[_t]*X)}let xt=.6-K*K-G*G-et*et;if(xt<0)u=0;else{const _t=Yt+R+t[se+P+t[ae+U]];xt*=xt,u=xt*xt*(e[_t]*K+n[_t]*G+s[_t]*et)}let Ut=.6-lt*lt-bt*bt-Ft*Ft;if(Ut<0)f=0;else{const _t=Yt+1+t[se+1+t[ae+1]];Ut*=Ut,f=Ut*Ut*(e[_t]*lt+n[_t]*bt+s[_t]*Ft)}return 32*(l+h+u+f)}}function l0(i){const e=new Uint8Array(512);for(let n=0;n<512/2;n++)e[n]=n;for(let n=0;n<512/2-1;n++){const s=n+~~(i()*(256-n)),r=e[n];e[n]=e[s],e[s]=r}for(let n=256;n<512;n++)e[n]=e[n-256];return e}function Bo(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function qe(i,t,e,n){let s=n|0;return s=s+Math.imul(i|0,668265261)|0,s=s+Math.imul(t|0,374761393)|0,s=s+Math.imul(e|0,1013904242)|0,s=Math.imul(s^s>>>15,2246822507),s=Math.imul(s^s>>>13,3266489909),s^=s>>>16,(s>>>0)/4294967296}const ge={PLAINS:0,FOREST:1,DESERT:2,SNOWY:3,MOUNTAINS:4,BEACH:5,OCEAN:6},ts=5,Sy=Tn+38,Ba=Tn+50,Ey=10;function gr(i,t,e,n){let s=0,r=1,o=1,a=0;for(let c=0;c<n;c++)s+=i(t*o,e*o)*r,a+=r,r*=.5,o*=2;return s/a}function wy(i,t,e){const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)}class Ty{constructor(t){C(this,"seed");C(this,"continent");C(this,"hills");C(this,"detail");C(this,"mountain");C(this,"ridge");C(this,"temperature");C(this,"moisture");C(this,"cave1");C(this,"cave2");C(this,"cavern");this.seed=t|0;let e=0;const n=()=>Bo(this.seed+2654435769*++e);this.continent=as(n()),this.hills=as(n()),this.detail=as(n()),this.mountain=as(n()),this.ridge=as(n()),this.temperature=as(n()),this.moisture=as(n()),this.cave1=ul(n()),this.cave2=ul(n()),this.cavern=ul(n())}column(t,e){const n=gr(this.continent,t/700,e/700,4),s=gr(this.hills,t/120,e/120,4),r=this.detail(t/30,e/30),o=wy(.15,.55,gr(this.mountain,t/420,e/420,3)),a=1-Math.abs(gr(this.ridge,t/160,e/160,4)),c=Tn+4+n*24+s*8+r*2+o*a*a*60,l=Math.max(4,Math.min(Pe-14,Math.floor(c))),h=gr(this.temperature,t/520,e/520,2),u=gr(this.moisture,t/460,e/460,2);let f;return l<Tn-1?f=h<-.3?ge.SNOWY:ge.OCEAN:l>=Sy?f=ge.MOUNTAINS:l<=Tn+1?f=h<-.3?ge.SNOWY:ge.BEACH:h>.25&&u<.1?f=ge.DESERT:h<-.3?f=ge.SNOWY:u>.12?f=ge.FOREST:f=ge.PLAINS,{height:l,biome:f}}isCave(t,e,n){const s=this.cave1(t*.045,e*.07,n*.045),r=this.cave2(t*.045,e*.07,n*.045);return s*s+r*r<.016?!0:e<40&&this.cavern(t*.02,e*.035,n*.02)>.7}ore(t,e,n){const s=qe(t>>1,e>>1,n>>1,this.seed+101);let r=A.STONE;return s<.004?r=e<16?A.DIAMOND_ORE:A.STONE:s<.01?r=e<32?A.GOLD_ORE:A.STONE:s<.035?r=e<64?A.IRON_ORE:A.STONE:s<.065?r=A.COAL_ORE:s<.075&&e<60&&(r=A.GRAVEL),r===A.STONE||qe(t,e,n,this.seed+102)<.55?r:A.STONE}generateChunk(t,e){const n=new Uint16Array(Tm),s=t*ee,r=e*ee;for(let o=0;o<ee;o++)for(let a=0;a<ee;a++){const c=s+a,l=r+o,{height:h,biome:u}=this.column(c,l),f=qe(c,0,l,this.seed+7),d=3+Math.floor(f*2);let m=A.GRASS,_=A.DIRT,g=A.STONE;switch(u){case ge.DESERT:m=A.SAND,_=A.SAND,g=A.SANDSTONE;break;case ge.SNOWY:m=h<Tn?A.DIRT:h<=Tn+1?A.SAND:A.SNOWY_GRASS,_=m===A.SAND?A.SAND:A.DIRT;break;case ge.BEACH:m=A.SAND,_=A.SAND,g=A.SANDSTONE;break;case ge.OCEAN:m=h>=Tn-6?A.SAND:this.detail(c/12,l/12)>0?A.GRAVEL:A.DIRT,_=m===A.GRAVEL?A.GRAVEL:m===A.DIRT?A.DIRT:A.SAND;break;case ge.MOUNTAINS:m=h>=Ba?A.SNOW_BLOCK:f<.5&&h<Ba-6?A.GRASS:A.STONE,_=m===A.GRASS?A.DIRT:A.STONE;break}const p=u===ge.SNOWY;for(let v=0;v<=Math.max(h,Tn);v++){let E;v===0||v<=3&&qe(c,v,l,this.seed+3)<.8-v*.2?E=A.BEDROCK:v>h?E=p&&v===Tn?A.ICE:A.WATER:v===h?E=m:v>h-d?E=_:v>h-d-3&&g!==A.STONE?E=g:v<h-5&&this.isCave(c,v,l)?E=v<=Ey?A.LAVA:A.AIR:E=this.ore(c,v,l),n[Hn(a,v,o)]=E}const M=h+1;if(M<=Tn||M>=Pe-4)continue;const S=qe(c,1,l,this.seed+9);if(h===Tn&&!p&&(m===A.GRASS||m===A.SAND||m===A.DIRT)&&qe(c,5,l,this.seed+9)<.1&&[[1,0],[-1,0],[0,1],[0,-1]].some(([E,w])=>this.column(c+E,l+w).height<Tn)){const E=1+Math.floor(qe(c,6,l,this.seed+9)*3);for(let w=0;w<E;w++)n[Hn(a,M+w,o)]=A.SUGAR_CANE;continue}if(m===A.GRASS&&u===ge.PLAINS&&qe(c>>3,7,l>>3,this.seed+21)<.03&&qe(c,8,l,this.seed+21)<.12){n[Hn(a,M,o)]=ti(A.PUMPKIN,Math.floor(qe(c,9,l,this.seed+21)*4));continue}if(m===A.GRASS){const v=u===ge.PLAINS?.22:.1;S<v?n[Hn(a,M,o)]=A.TALL_GRASS:S<v+.012?n[Hn(a,M,o)]=A.DANDELION:S<v+.022&&(n[Hn(a,M,o)]=A.POPPY)}else if(u===ge.DESERT)if(S<.005){const v=1+Math.floor(qe(c,2,l,this.seed+9)*3);for(let E=0;E<v;E++)n[Hn(a,M+E,o)]=A.CACTUS}else S<.012&&(n[Hn(a,M,o)]=A.DEAD_BUSH)}return this.placeTrees(n,t,e),n}placeTrees(t,e,n){const r=e*ee-3,o=e*ee+ee-1+3,a=n*ee-3,c=n*ee+ee-1+3;for(let l=Math.floor(a/ts);l<=Math.floor(c/ts);l++)for(let h=Math.floor(r/ts);h<=Math.floor(o/ts);h++){const u=h*ts+Math.floor(qe(h,1,l,this.seed+12)*ts),f=l*ts+Math.floor(qe(h,2,l,this.seed+12)*ts);if(u<r||u>o||f<a||f>c)continue;const{height:d,biome:m}=this.column(u,f);if(d<=Tn+1)continue;let _=0;if(m===ge.FOREST?_=.8:m===ge.PLAINS?_=.07:m===ge.SNOWY?_=.35:m===ge.MOUNTAINS&&d<Ba-6&&(_=.08),qe(h,0,l,this.seed+11)>=_||d+12>=Pe||m===ge.MOUNTAINS&&qe(u,0,f,this.seed+7)>=.5)continue;const g=qe(h,3,l,this.seed+12),p=m===ge.SNOWY||m===ge.MOUNTAINS?"spruce":m===ge.FOREST&&g<.3?"birch":"oak",M=qe(h,4,l,this.seed+12);Ly(p,M,(S,v,E,w,b)=>Cy(t,e,n,S,v,E,w,b),u,d+1,f)}}findSpawn(){for(let t=0;t<600;t+=4){const e=Math.max(1,Math.floor(2*Math.PI*t/8));for(let n=0;n<e;n++){const s=n/e*Math.PI*2,r=Math.round(Math.cos(s)*t),o=Math.round(Math.sin(s)*t),{height:a,biome:c}=this.column(r,o);if(a>Tn+1&&c!==ge.MOUNTAINS)return[r+.5,a+1,o+.5]}}return[.5,this.column(0,0).height+1,.5]}}function Ay(i,t){const e=Xt(i);return e===A.WATER||e===A.LAVA?!1:Sr[e]===1||e===A.DANDELION||e===A.POPPY||e===A.OAK_SAPLING||e===A.BIRCH_SAPLING||e===A.SPRUCE_SAPLING||t&&(e===A.OAK_LEAVES||e===A.BIRCH_LEAVES||e===A.SPRUCE_LEAVES)}function Ry(i,t,e){return t===A.DIRT?Xt(i)===A.GRASS||Xt(i)===A.SNOWY_GRASS:Ay(i,e)}function Cy(i,t,e,n,s,r,o,a){const c=n-t*ee,l=r-e*ee;if(c<0||c>=ee||l<0||l>=ee||s<0||s>=Pe)return;const h=Hn(c,s,l);Ry(i[h],o,a)&&(i[h]=o)}function Ly(i,t,e,n,s,r){const o=Bo(Math.floor(t*1e9)^Math.imul(n,73856093)^Math.imul(r,19349663));if(i==="spruce"){const u=6+Math.floor(t*4),f=[0,1,1,2,1,2,3,2,3,2];for(let d=0;d<Math.min(f.length,u-1);d++){const m=s+u-d,_=f[d];for(let g=-_;g<=_;g++)for(let p=-_;p<=_;p++)Math.abs(p)+Math.abs(g)>_+(_>1?1:0)||e(n+p,m,r+g,A.SPRUCE_LEAVES,!1)}for(let d=0;d<u;d++)e(n,s+d,r,A.SPRUCE_LOG,!0);e(n,s-1,r,A.DIRT,!0);return}const a=i==="birch",c=(a?5:4)+Math.floor(t*3),l=a?A.BIRCH_LOG:A.OAK_LOG,h=a?A.BIRCH_LEAVES:A.OAK_LEAVES;for(let u=c-3;u<=c;u++){const f=u>=c-1?1:2;for(let d=-f;d<=f;d++)for(let m=-f;m<=f;m++)Math.abs(m)===f&&Math.abs(d)===f&&(u===c||o()<.5)||e(n+m,s+u,r+d,h,!1)}for(let u=0;u<c;u++)e(n,s+u,r,l,!0);e(n,s-1,r,A.DIRT,!0)}const Dy=32,Py=8,fl=2,dl=32,Nh=48e3,td=700,Iy=.6,Ny=.32,Uy=.24,di=Math.PI*2;function h0(i){let t=i>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Oy(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619);return t>>>0}const Nn=(i,t,e)=>i<t?t:i>e?e:i,es=(i,t)=>typeof i=="number"&&Number.isFinite(i)?i:t,ya=i=>typeof i=="number"&&Number.isFinite(i),gu=i=>440*Math.pow(2,(i-69)/12);class _u{constructor(t,e){C(this,"r");this.sr=t,this.r=h0(e)}u(t,e){return t+(e-t)*this.r()}sign(){return this.r()<.5?-1:1}pick(t){return t[Math.floor(this.r()*t.length)]}buf(t){return new Float32Array(Math.max(1,Math.round(t*this.sr)))}white(t){const e=this.buf(t);for(let n=0;n<e.length;n++)e[n]=this.r()*2-1;return e}pink(t){const e=this.buf(t);let n=0,s=0,r=0;for(let o=0;o<e.length;o++){const a=this.r()*2-1;n=.99765*n+a*.099046,s=.963*s+a*.2965164,r=.57*r+a*1.0526913,e[o]=(n+s+r+a*.1848)*.25}return e}brown(t){const e=this.buf(t);let n=0;for(let s=0;s<e.length;s++)n=(n+.02*(this.r()*2-1))/1.02,e[s]=n*3.5;return e}mix(t,e,n=0,s=1){const r=Math.round(n*this.sr),o=Math.min(e.length,t.length-r);for(let a=Math.max(0,-r);a<o;a++)t[r+a]+=e[a]*s;return t}}function Me(i,t,e,n,s=.707){const r=1/s,o=t*.45;let a=0,c=0,l=0;const h=p=>{const M=Math.tan(Math.PI*Nn(p,10,o)/t);a=1/(1+M*(M+r)),c=M*a,l=M*c},u=typeof n=="function"?n:null;typeof n=="number"&&h(n);const f=e==="hp"||e==="notch"?1:0,d=e==="lp"?0:e==="bp"?r:-r,m=e==="lp"?1:e==="hp"?-1:0;let _=0,g=0;for(let p=0;p<i.length;p++){u&&(p&15)===0&&h(u(p/t));const M=i[p],S=M-g,v=a*_+c*S,E=g+c*_+l*S;_=2*v-_,g=2*E-g,i[p]=f*M+d*v+m*E}return i}function re(i,t,e){let n=e(0);for(let s=0;s<i.length;s+=4){const r=e((s+4)/t),o=Math.min(i.length,s+4);for(let a=s;a<o;a++)i[a]*=n+(r-n)*(a-s)*.25;n=r}return i}function ws(i,t,e=.005){const n=Math.min(i.length,Math.round(e*t));for(let s=0;s<n;s++)i[i.length-1-s]*=.5-.5*Math.cos(Math.PI*s/n);return i}function Qa(i){let t=0;for(let e=0;e<i.length;e++){const n=Math.abs(i[e]);n>t&&(t=n)}return t}function Ue(i,t=1){const e=Qa(i);if(e>0)for(let n=0;n<i.length;n++)i[n]*=t/e;return i}const jt=(i,t)=>e=>e<=0?0:e<i?e/i:Math.exp(-(e-i)/t),$e=(i,t,e)=>n=>n<=0?0:n<i?n/i:n<i+t?1:Math.exp(-(n-i-t)/e),Gn=(i,t,e)=>n=>{if(n<=0||n>=t)return 0;const s=n<i?.5-.5*Math.cos(Math.PI*n/i):1,r=n>t-e?.5-.5*Math.cos(Math.PI*(t-n)/e):1;return s*r};function tc(i,t){return i<t?(i/=t,i+i-i*i-1):i>1-t?(i=(i-1)/t,i*i+i+i+1):0}function u0(i,t,e){let n=i<e?1:-1;return n+=tc(i,t),n-=tc((i+1-e)%1,t),n-(2*e-1)}function Rr(i,t,e,n="sine",s=.5){const r=i.sr,o=i.buf(t),a=typeof e=="function"?e:null;let c=Nn((typeof e=="number"?e:0)/r,0,.45),l=0;for(let h=0;h<o.length;h++)a&&(h&3)===0&&(c=Nn(a(h/r)/r,0,.45)),o[h]=n==="sine"?Math.sin(di*l):n==="saw"?2*l-1-tc(l,c):u0(l,c,s),l+=c,l>=1&&(l-=1);return o}function yn(i,t,e,n,s,r){if(!(n>0)||n>=t*.47||s===0)return;const o=Math.max(0,Math.round(e*t)),a=di*n/t,c=Math.exp(-1/(r*t)),l=2*c*Math.cos(a),h=c*c;let u=0,f=-s*Math.sin(a)/c;const d=Math.min(i.length,o+Math.ceil(r*t*9));for(let m=o;m<d;m++){i[m]+=u;const _=l*u-h*f;f=u,u=_}}function ky(i,t,e,n=2){const s=i.sr,r=i.buf(t),o=typeof e=="function"?e:null;let a=(typeof e=="number"?e:0)/s;const c=Math.max(1,Math.round(8e-4*s));let l=0,h=0;for(let u=0;u<r.length;u++)o&&(u&15)===0&&(a=o(u/s)/s),l>0?(r[u]=h*(i.r()*2-1),l--):i.r()<a&&(l=Math.floor(i.r()*c),h=Math.pow(i.r(),n),r[u]=h*i.sign());return r}function Vn(i,t,e){const n=i.buf(t),s=i.sr/e;let r=i.r(),o=i.r(),a=0;for(let c=0;c<n.length;c++)a>=s&&(a-=s,r=o,o=i.r()),n[c]=r+(o-r)*(.5-.5*Math.cos(Math.PI*a/s)),a++;return n}function Fy(i,t,e,n,s){const r=i.buf(t),o=Math.max(2,Math.round(i.sr/e-.5)),a=new Float32Array(o);let c=0;for(let u=0;u<o;u++)c+=s*(i.r()*2-1-c),a[u]=c;let l=0,h=0;for(let u=0;u<r.length;u++){const f=a[l],d=n*.5*(f+h);h=f,a[l]=d,r[u]=d,l=l+1===o?0:l+1}return Ue(r)}function Pn(i,t,e){const n=i.sr,s=i.buf(t),r=typeof e.f0=="function"?e.f0:null,o=typeof e.f0=="number"?e.f0:0,a=e.q??[6,8,10],c=e.gains??[1,.6,.3],l=e.duty??0,h=e.vib??0,u=e.vibDepth??0,f=e.jitter??0,d=e.breath??0,m=e.growl??0,_=e.dry??0,g=[1/a[0],1/a[1],1/a[2]],p=[0,0,0],M=[0,0,0],S=[0,0,0],v=[0,0,0],E=[0,0,0],w=1-Math.exp(-di*18*4/n),b=1/Math.sqrt(w/(2-w)),L=1-Math.exp(-di*700/n);let x=i.r(),y=0,R=0,P=0,U=0;for(let z=0;z<s.length;z++){const W=z/n;if((z&31)===0){const G=e.formants(W);for(let et=0;et<3;et++){const lt=Math.tan(Math.PI*Nn(G[et],50,n*.45)/n);p[et]=1/(1+lt*(lt+g[et])),M[et]=lt*p[et],S[et]=lt*M[et]}}if((z&3)===0){R+=w*(i.r()*2-1-R);const G=(r?r(W):o)*(1+u*Math.sin(di*h*W)+f*R*b);U=Nn(G/n,0,.45)}let X=l>0?u0(x,U,l):2*x-1-tc(x,U);m>0&&(X*=1-m*(.5+.5*Math.cos(Math.PI*(x+y)))),x+=U,x>=1&&(x-=1,y^=1),X+=d*(i.r()*2-1);let K=0;for(let G=0;G<3;G++){const et=X-E[G],lt=p[G]*v[G]+M[G]*et,bt=E[G]+M[G]*v[G]+S[G]*et;v[G]=2*lt-v[G],E[G]=2*bt-E[G],K+=c[G]*g[G]*lt}_>0&&(P+=L*(X-P),K+=_*P),s[z]=K}return Ue(s)}function hi(i){return t=>{if(t<=i[0][0])return i[0][1];for(let e=1;e<i.length;e++){const[n,s]=i[e];if(t<=n){const[r,o]=i[e-1],a=(t-r)/(n-r||1);return[o[0]+(s[0]-o[0])*a,o[1]+(s[1]-o[1])*a,o[2]+(s[2]-o[2])*a]}}return i[i.length-1][1]}}const Ke={a:[730,1090,2440],o:[570,840,2410],u:[300,870,2240],U:[440,1020,2240],uh:[640,1190,2390]};function Ze(i,t,e,n){const s=i.white(n*8+.002);return Me(s,i.sr,"bp",t,e),Ue(ws(re(s,i.sr,jt(4e-4,n)),i.sr,.001))}function he(i,t,e,...n){const s=i.white(t);for(const[r,o,a]of n)Me(s,i.sr,r,o,a);return Ue(ws(re(s,i.sr,e),i.sr))}function Je(i,t,e,n,s,r,o=2){const a=ky(i,t,e,o);return Me(a,i.sr,"bp",n,s),Ue(ws(re(a,i.sr,r),i.sr))}function jn(i,t,e,n){const s=Rr(i,n*7,r=>e+(t-e)*Math.exp(-r/(n*.5)));return Ue(ws(re(s,i.sr,jt(.002,n)),i.sr))}function cs(i,t,e,n,s,r,o=1){const a=[1,i.u(1.9,2.2),i.u(3.1,3.6),i.u(4.8,5.6)],c=[1,.55*o,.32*o,.16*o],l=[1,.6,.38,.24];for(let h=0;h<4;h++)yn(t,i.sr,e,n*a[h],s*c[h],r*l[h])}function ec(i,t,e,n,s,r){const o=[1,2.76*i.u(.98,1.02),5.4*i.u(.97,1.03),8.93*i.u(.96,1.04)],a=[1,.6,.35,.2],c=[1,.75,.5,.32];for(let l=0;l<4;l++)yn(t,i.sr,e,n*o[l],s*a[l],r*c[l]);yn(t,i.sr,e,n*1.004,s*.5,r*1.2)}function By(i,t,e,n,s,r){const o=[[1,1,1],[2,.45,.6],[3.01,.22,.4],[4.17,.12,.25],[5.43,.06,.15]];for(const[a,c,l]of o)yn(t,i.sr,e,n*a,s*c,r*l);yn(t,i.sr,e,n*1.003,s*.4,r*1.1)}function ba(i,t,e,n,s,r){const o=r*6,a=Rr(i,o,c=>n*(1+2.5*c/o));i.mix(t,ws(re(a,i.sr,jt(.001,r)),i.sr),e,s)}function Sa(i,t,e,n,s){const r=i.sr,o=i.buf(t);let a=0;for(let h=0;h<o.length;h++)a+=e*(1+(n-1)*h/o.length)*(.85+.3*i.r())/r,a>=1&&(a-=1,o[h]=.5+.5*i.r());const c=new Float32Array(o.length);for(const h of s)i.mix(c,Me(o.slice(),r,"bp",h*i.u(.9,1.1),10));const l=Vn(i,t,9);for(let h=0;h<c.length;h++)c[h]*=.45+.55*l[h];return Ue(re(c,r,Gn(.03,t,.08)))}function pl(i,t,e,n,s=1){i.mix(t,Ze(i,i.u(2200,3600)*s,1.3,.0012),e,n*.7),yn(t,i.sr,e,i.u(700,1300)*s,n*.5,i.u(.008,.018)),yn(t,i.sr,e,i.u(1800,2800)*s,n*.3,i.u(.004,.01))}function ml(i,t,e,n,s){const r=i.sr,o=typeof e=="function"?e:()=>e,a=typeof n=="function"?n:()=>n,c=Ue(Me(i.white(t),r,"bp",a,2.5)),l=Ue(Me(i.white(t),r,"bp",_=>.3*a(_),2)),h=Ue(Me(i.white(t),r,"hp",4500,.7)),u=Vn(i,t,25),f=i.buf(t);let d=0,m=0;for(let _=0;_<f.length;_++){(_&15)===0&&(m=o(_/r)/r),d+=m,d>=1&&(d-=1);const g=Math.sin(di*d),p=g>0?g*g*g:0;f[_]=(c[_]+.6*l[_])*p*(.4+.6*u[_])+.22*h[_]}return re(f,r,s),i.mix(f,Je(i,t,70,2500,3,s,2),0,.35),Ue(f)}const zy=["stone","wood","gravel","grass","sand","glass","wool","snow","metal"],Gy=["break","hit","step","place"];function Hy(i,t,e){const n=i.sr,s=e==="break",r=e==="place",o=e==="step",a=s?1:r?.6:o?.25:.3,c=e==="hit"?.7:1,l=s?.34:r?.22:o?.16:.13,h=.04+.24*Math.pow(a,1.5),u=i.buf(l+(t==="metal"?.1+h:t==="glass"&&s?.2:0));switch(t){case"stone":{i.mix(u,Ze(i,2600*c*i.u(.85,1.15),.9,.003),0,o?.45:.9),i.mix(u,he(i,.15,jt(8e-4,.012+.025*a),["bp",i.u(650,950)*c,1.8]),0,.8);const d=Je(i,l,m=>3500*Math.exp(-m/(.02+.07*a)),i.u(1300,2200)*c,.9,jt(.001,.02+.07*a));if(i.mix(u,d,.002,s?1:.7),(s||r)&&i.mix(u,jn(i,170,70,.03),0,.3),s)for(let m=0;m<7;m++)i.mix(u,Ze(i,i.u(1800,4200),1.4,.0015),i.u(.05,.26),i.u(.1,.35));break}case"wood":{const f=i.u(190,300)*c;if(cs(i,u,0,f,1,.016+.022*a,o?.6:1),i.mix(u,Ze(i,i.u(1500,2500)*c,1,.0025),0,o?.25:.6),i.mix(u,he(i,.2,jt(.001,.015+.03*a),["bp",f*i.u(1.3,1.8),4]),0,.7),s||r){const d=Je(i,l,m=>900*Math.exp(-m/.08),i.u(1800,3e3),1.2,jt(.002,.03+.06*a));i.mix(u,d,.004,s?.6:.35)}s&&cs(i,u,i.u(.06,.1),f*i.u(1.2,1.5),.45,.025);break}case"gravel":{const f=$e(o?.008:.003,.01+.03*a,.03+.08*a),d=Vn(i,l,45),m=g=>(s?1800:1300)*(.15+1.7*d[Math.min(d.length-1,Math.round(g*n))]);i.mix(u,Je(i,l,m,i.u(900,1400)*c,.9,f,1.4),0,1),i.mix(u,Je(i,l,500,i.u(2200,3200)*c,1.2,f,2),0,.4);const _=Math.round(4+8*a);for(let g=0;g<_;g++){const p=l*.8*Math.pow(i.r(),1.5);i.mix(u,Ze(i,i.u(1200,3500)*c,1.6,.0015),p,i.u(.2,.6)*f(p))}i.mix(u,he(i,l,f,["lp",600*c],["hp",100]),0,.35),(s||r)&&i.mix(u,jn(i,140,70,.03),0,.3);break}case"sand":{const f=$e(o?.025:.014,.015+.05*a,.04+.08*a),d=Je(i,l,7e3,i.u(3e3,4200)*c,.5,f,1.1);i.mix(u,Me(d,n,"hp",1500*c),0,1),i.mix(u,he(i,l,f,["bp",i.u(2200,3e3)*c,.7],["hp",900]),0,.6),i.mix(u,he(i,l,f,["lp",300]),0,.12);break}case"grass":{const f=$e(o?.022:.014,.02+.05*a,.04+.07*a),d=i.white(l),m=Vn(i,l,70);for(let _=0;_<d.length;_++)d[_]*=.15+.85*m[_]*m[_]*m[_];Me(d,n,"bp",i.u(2e3,2800)*c,.8),Me(d,n,"hp",600*c),i.mix(u,Ue(ws(re(d,n,f),n)),0,1),i.mix(u,Je(i,l,350,i.u(3500,5e3)*c,1.5,f,2.5),0,.5),i.mix(u,he(i,l,jt(.004,.01+.04*a),["lp",300]),0,.45);break}case"glass":{if(s){i.mix(u,he(i,.25,jt(5e-4,.05),["hp",2500]),0,.8),i.mix(u,Ze(i,3500,1,.003),0,.6);for(let f=0;f<36;f++){const d=.34*Math.pow(i.r(),1.7);yn(u,n,d,i.u(2200,8500),i.u(.05,.35)*Math.exp(-d/.25),i.u(.015,.07))}i.mix(u,Je(i,.4,f=>800*Math.exp(-f/.1),5e3,.8,jt(.001,.1)),.01,.4)}else{i.mix(u,Ze(i,i.u(3e3,4500)*c,1.2,o?.004:.003),0,.8),i.mix(u,he(i,.1,jt(.001,.012+.02*a),["bp",i.u(900,1300)*c,2]),0,.5);const f=r?3:2;for(let d=0;d<f;d++)yn(u,n,i.u(0,.01),i.u(2500,6e3)*c,i.u(.1,.25),i.u(.015,.035)*(.5+a))}break}case"wool":{const f=$e(o?.012:.008,.01+.03*a,.03+.06*a);i.mix(u,he(i,l,f,["lp",i.u(380,600)*c],["hp",60]),0,1),i.mix(u,he(i,l,f,["bp",i.u(1200,1800)*c,.8]),0,.12);break}case"snow":{const f=$e(o?.012:.006,.02+.04*a,.03+.07*a);i.mix(u,he(i,l,f,["lp",i.u(500,800)*c],["hp",60]),0,.8),i.mix(u,Je(i,l,1400,i.u(1e3,1600)*c,1.1,f,1.8),0,.6),i.mix(u,Je(i,l,500,i.u(2200,3e3)*c,1.4,f,2.5),0,.2);break}case"metal":{const f=i.u(650,1100)*c*(o?1.4:1);i.mix(u,Ze(i,i.u(2500,3500)*c,.9,.0025),0,.8),i.mix(u,he(i,.1,jt(8e-4,.015+.02*a),["bp",i.u(1200,1800)*c,1.5]),0,.6),ec(i,u,.001,f,s||r?.5:.35,h),s&&(ec(i,u,i.u(.05,.09),f*i.u(1.3,1.6),.2,.1),i.mix(u,Je(i,.2,d=>2e3*Math.exp(-d/.05),2500,1,jt(.001,.05)),.003,.4));break}}return o&&Me(u,n,"lp",4500,.7),u}const Ht=(i,t,e={})=>({gen:t,gain:i,vars:e.vars??3,jitter:e.jitter??.06,drive:e.drive??0,rate:e.rate??1}),Vy={pop:Ht(.4,i=>{const t=i.u(380,520),e=t*i.u(2.4,3),n=r=>e-(e-t)*Math.exp(-r/.012),s=re(Rr(i,.11,n),i.sr,jt(.002,.028));return i.mix(s,re(Rr(i,.11,r=>2*n(r)),i.sr,jt(.002,.012)),0,.25)},{vars:3,jitter:.2,rate:.5}),click:Ht(.5,i=>{const t=i.buf(.06);return i.mix(t,Ze(i,i.u(2600,3200),1.2,.0015)),yn(t,i.sr,0,i.u(1500,1800),.5,.006),yn(t,i.sr,.012,i.u(2200,2600),.25,.004),t},{vars:2,jitter:.02}),hurt:Ht(.8,i=>{const t=i.u(.9,1.1),e=Pn(i,.3,{f0:n=>(150-50*Math.min(1,n/.2))*t,formants:hi([[0,Ke.U],[.08,Ke.uh],[.25,Ke.o]]),jitter:.02,breath:.15,growl:.15,dry:.3});return re(e,i.sr,$e(.012,.07,.06)),i.mix(e,jn(i,140,70,.03),0,.35)},{rate:.5}),death:Ht(.85,i=>{const t=i.u(.9,1.1),e=Pn(i,.55,{f0:n=>(140-75*Math.min(1,n/.45))*t,formants:hi([[0,Ke.U],[.12,Ke.uh],[.3,Ke.o],[.5,Ke.u]]),jitter:.03,breath:.15,growl:.25,dry:.3});return re(e,i.sr,$e(.015,.12,.12)),i.mix(e,jn(i,120,50,.05),0,.4)},{vars:2,jitter:.04,rate:.5}),eat:Ht(.55,i=>{const t=i.buf(.38),e=i.r()<.5?2:3,n=i.u(.1,.13);for(let s=0;s<e;s++){const r=$e(.004,.015,.025),o=s===0?1:i.u(.55,.85);i.mix(t,Je(i,.1,2200,i.u(1600,2600),.9,r,1.5),s*n,o),i.mix(t,he(i,.1,r,["lp",500]),s*n,.35*o)}return t},{vars:4,jitter:.1}),burp:Ht(.6,i=>{const t=i.u(.4,.55),e=i.u(70,95),n=Pn(i,t,{f0:r=>e*(1+.25*Math.sin(Math.PI*r/t)),formants:hi([[0,Ke.o],[t*.5,Ke.uh],[t,Ke.U]]),jitter:.12,breath:.05,growl:.5,dry:.4}),s=Vn(i,t,35);for(let r=0;r<n.length;r++)n[r]*=.5+.5*s[r];return re(n,i.sr,Gn(.02,t,.12))},{vars:2,jitter:.08,rate:.5}),attack:Ht(.45,i=>{const t=i.u(.22,.28),e=i.u(400,600),n=i.u(1800,2600),r=he(i,t,o=>Math.pow(Math.sin(Math.PI*Math.min(1,o/t)),2),["bp",o=>e+(n-e)*Math.sin(Math.PI*Math.min(1,o/t)),1.4]);return i.mix(r,he(i,t,Gn(t*.4,t,t*.5),["lp",500]),0,.3)},{vars:3,jitter:.08,rate:.5}),strong_hit:Ht(.8,i=>{const t=i.buf(.45);return i.mix(t,jn(i,i.u(150,190),50,.07)),i.mix(t,he(i,.15,jt(.001,.03),["bp",i.u(900,1400),1]),0,.7),i.mix(t,Ze(i,3e3,.7,.003),0,.5),t},{vars:3,jitter:.06,drive:1.5,rate:.5}),bow_shoot:Ht(.65,i=>{const t=i.buf(.5);i.mix(t,re(Fy(i,.5,i.u(180,240),.992,.6),i.sr,jt(.001,.12)),0,.8);const e=he(i,.3,n=>Math.pow(Math.sin(Math.PI*Math.min(1,n/.3)),2),["bp",n=>900+2500*n/.3,1.2]);return i.mix(t,e,.01,.45),i.mix(t,Ze(i,2e3,1,.002),0,.3)},{vars:3,jitter:.08,rate:.5}),arrow_hit:Ht(.6,i=>{const t=i.buf(.25);cs(i,t,0,i.u(260,340),1,.035,.8),i.mix(t,Ze(i,1800,1,.002),0,.5),i.mix(t,jn(i,150,90,.025),0,.5);const e=Rr(i,.2,i.u(130,170));return re(e,i.sr,n=>Math.exp(-n/.05)*(.6+.4*Math.sin(di*30*n))),i.mix(t,e,.004,.25)},{vars:3,jitter:.08,rate:.5}),explode:Ht(1,i=>{const e=i.buf(2);i.mix(e,he(i,.4,jt(8e-4,.04),["lp",6e3]),0,.9);const n=i.brown(2);Me(n,i.sr,"lp",o=>120+900*Math.exp(-o/.15),.8),i.mix(e,Ue(re(n,i.sr,jt(.004,.45))),0,1),i.mix(e,jn(i,75,32,.28),0,.9);const s=i.white(2);Me(s,i.sr,"lp",260,.7);const r=Vn(i,2,12);for(let o=0;o<s.length;o++)s[o]*=.3+.7*r[o];return i.mix(e,Ue(re(s,i.sr,jt(.05,.6))),0,.6),i.mix(e,Je(i,1,o=>400*Math.exp(-o/.25),1800,.8,jt(.01,.3),2.5),.03,.35)},{vars:3,jitter:.08,drive:2,rate:.5}),fuse:Ht(.6,i=>{const e=i.white(1.5);Me(e,i.sr,"hp",2500,.7),Me(e,i.sr,"bp",i.u(5e3,6500),.5);const n=Vn(i,1.5,18);for(let s=0;s<e.length;s++)e[s]*=.7+.3*n[s];return Ue(e),i.mix(e,Je(i,1.5,60,4e3,1,()=>1,2),0,.5),re(e,i.sr,Gn(.04,1.5,.15))},{vars:2,jitter:.04}),splash:Ht(.7,i=>{const e=i.buf(.85);i.mix(e,he(i,.2,jt(.002,.04),["lp",500]),0,.6);const n=i.white(.85),s=Vn(i,.85,40);for(let r=0;r<n.length;r++)n[r]*=.3+.7*s[r];Me(n,i.sr,"bp",r=>1500+2500*Math.exp(-r/.2),.7),i.mix(e,Ue(re(n,i.sr,jt(.006,.17))));for(let r=0;r<12;r++){const o=.04+.5*Math.pow(i.r(),1.5);ba(i,e,o,i.u(400,1300),i.u(.1,.3)*Math.exp(-o/.3),i.u(.015,.035))}return e},{vars:3,jitter:.08,rate:.5}),swim:Ht(.4,i=>{const t=i.u(.45,.6),e=i.buf(t),n=i.white(t),s=Vn(i,t,25);for(let r=0;r<n.length;r++)n[r]*=.3+.7*s[r];Me(n,i.sr,"bp",r=>1100+700*r/t,.6),i.mix(e,Ue(re(n,i.sr,$e(.05,.08,.12))));for(let r=0;r<4;r++)ba(i,e,i.u(.05,t*.6),i.u(350,900),i.u(.1,.25),i.u(.015,.03));return e},{vars:4,jitter:.1,rate:.5}),fizz:Ht(.5,i=>{const e=he(i,.7,jt(.004,.22),["hp",i.u(3e3,4e3)]);return i.mix(e,Je(i,.7,n=>900*Math.exp(-n/.25),6e3,.7,jt(.002,.25),2),0,.6)},{vars:3,jitter:.1}),lava_pop:Ht(.45,i=>{const t=i.u(110,160),e=re(Rr(i,.25,n=>t*(1+2.2*Math.min(1,n/.05))),i.sr,jt(.003,.035));return i.mix(e,he(i,.05,jt(.001,.01),["bp",1200,1.2]),.01,.3)},{vars:4,jitter:.12,rate:.5}),door_open:Ht(.6,i=>{const t=i.buf(.5);return i.mix(t,Ze(i,3200,2,.002),0,.5),yn(t,i.sr,0,2400,.15,.01),i.mix(t,Sa(i,.36,i.u(45,70),i.u(1.2,1.6),[400,950,1700]),.04,1),cs(i,t,.38,i.u(220,280),.25,.03),t},{rate:.5}),door_close:Ht(.65,i=>{const t=i.buf(.35);return i.mix(t,Sa(i,.1,i.u(60,80),.8,[450,1e3,1800]),0,.35),cs(i,t,.07,i.u(150,200),1,.05),i.mix(t,he(i,.2,jt(.001,.03),["lp",400]),.07,.4),i.mix(t,Ze(i,3e3,2,.002),.075,.4)},{rate:.5}),chest_open:Ht(.6,i=>{const t=i.buf(.65);return cs(i,t,0,i.u(160,210),.35,.03),i.mix(t,Sa(i,.55,i.u(28,40),i.u(1.3,1.7),[300,700,1300]),.03,1)},{vars:3,jitter:.05,rate:.5}),chest_close:Ht(.65,i=>{const t=i.buf(.4);return i.mix(t,Sa(i,.12,i.u(40,55),.8,[320,750,1400]),0,.3),cs(i,t,.1,i.u(120,160),1,.06),i.mix(t,he(i,.25,jt(.001,.04),["lp",350]),.1,.6),i.mix(t,Ze(i,2500,1.5,.002),.105,.3)},{vars:3,jitter:.05,rate:.5}),tool_break:Ht(.75,i=>{const t=i.buf(.45);i.mix(t,he(i,.1,jt(5e-4,.012),["hp",1500])),ec(i,t,0,i.u(1800,2600),.45,.12);const e=i.u(.08,.14);return ec(i,t,e,i.u(2800,3800),.2,.05),i.mix(t,Ze(i,4e3,1.5,.002),e,.3)}),shear:Ht(.55,i=>{const t=i.buf(.3),e=i.u(.08,.11);for(let n=0;n<2;n++){const s=n*e;i.mix(t,he(i,.06,$e(.004,.01,.012),["bp",i.u(3500,5e3),1.5]),s,.8-.2*n),yn(t,i.sr,s+.012,i.u(4500,6500),.25,.025),i.mix(t,Ze(i,6e3,2,.0015),s+.014,.4)}return t},{vars:3,jitter:.08}),flint_and_steel:Ht(.6,i=>{const t=i.buf(.4),e=i.white(.14),n=Vn(i,.14,120);for(let s=0;s<e.length;s++)e[s]*=.4+.6*n[s];return Me(e,i.sr,"bp",s=>2500+3e3*s/.14,2),i.mix(t,Ue(re(e,i.sr,Gn(.01,.14,.03)))),i.mix(t,Je(i,.25,s=>160*Math.exp(-s/.08),6500,1.5,jt(.001,.08),2.5),.1,.7),i.mix(t,he(i,.25,Gn(.05,.25,.15),["lp",900]),.12,.25)},{vars:3,jitter:.08}),bucket_fill:Ht(.6,i=>{const e=i.buf(.65),n=i.white(.65),s=Vn(i,.65,14);for(let o=0;o<n.length;o++)n[o]*=s[o]*s[o];Me(n,i.sr,"lp",900),Me(n,i.sr,"hp",150),i.mix(e,Ue(re(n,i.sr,Gn(.03,.65,.2))),0,.5);const r=7+Math.floor(i.r()*3);for(let o=0;o<r;o++){const a=.03+o*.5/r+i.u(-.01,.01);ba(i,e,a,(350+450*o/r)*i.u(.8,1.2),i.u(.3,.6),i.u(.02,.04))}return e},{rate:.5}),bucket_empty:Ht(.6,i=>{const e=i.buf(.7),n=i.white(.7),s=Vn(i,.7,30);for(let o=0;o<n.length;o++)n[o]*=Math.pow(s[o],1.5);Me(n,i.sr,"bp",1600,.6),Me(n,i.sr,"lp",3e3),i.mix(e,Ue(re(n,i.sr,Gn(.02,.7,.3))),0,.8),i.mix(e,he(i,.2,jt(.003,.05),["lp",600]),.05,.4);const r=6;for(let o=0;o<r;o++)ba(i,e,.05+o*.08+i.u(0,.03),(900-500*o/r)*i.u(.85,1.15),i.u(.2,.45),i.u(.015,.03));return e},{rate:.5}),fall_small:Ht(.55,i=>{const t=i.buf(.32);return i.mix(t,jn(i,i.u(110,130),50,.05)),i.mix(t,he(i,.15,jt(.002,.03),["lp",400]),0,.6),i.mix(t,Ze(i,1500,.7,.002),0,.15)},{rate:.5}),fall_big:Ht(.8,i=>{const t=i.buf(.6);return i.mix(t,jn(i,i.u(95,110),38,.09)),i.mix(t,he(i,.3,jt(.002,.06),["lp",600]),0,.7),i.mix(t,Je(i,.25,1500,1100,.8,jt(.002,.05),1.5),0,.45),i.mix(t,jn(i,80,45,.04),i.u(.07,.1),.35)},{vars:3,jitter:.06,drive:1.2,rate:.5}),level_up:Ht(.55,i=>{const t=i.buf(1.4),e=76+i.pick([0,2,-2]);return[0,4,7,12].forEach((n,s)=>By(i,t,s*.07,gu(e+n),s===3?.9:.55,s===3?.55:.25)),t},{vars:2,jitter:0,rate:.5}),zombie_say:Ht(.6,i=>{const t=i.u(.8,1.15),e=i.u(95,130),n=i.r()<.5,s=Pn(i,t,{f0:r=>e*(n?1+.12*Math.sin(Math.PI*r/t):1.08-.2*r/t),formants:hi([[0,Ke.U],[t*.35,Ke.uh],[t*.75,Ke.o],[t,Ke.u]]),vib:i.u(4,6),vibDepth:.03,jitter:.05,breath:.12,growl:.35,dry:.3,q:[5,7,9]});return re(s,i.sr,Gn(.12,t,.3))},{vars:3,jitter:.1,rate:.5}),zombie_hurt:Ht(.75,i=>{const t=i.u(.3,.4),e=i.u(170,210),n=Pn(i,t,{f0:s=>e*(1.1-.25*s/t),formants:hi([[0,Ke.uh],[t,Ke.U]]),jitter:.05,breath:.15,growl:.3,dry:.25,q:[5,7,9]});return re(n,i.sr,$e(.015,t*.3,t*.2))},{vars:3,jitter:.1,rate:.5}),zombie_death:Ht(.75,i=>{const t=i.u(1.2,1.4),e=i.u(120,140),n=Pn(i,t,{f0:s=>e*(1-.45*s/t),formants:hi([[0,Ke.a],[t*.4,Ke.o],[t,Ke.u]]),vib:5,vibDepth:.03,jitter:.06,breath:.15,growl:.45,dry:.3,q:[5,7,9]});return re(n,i.sr,Gn(.04,t,t*.5))},{vars:2,jitter:.08,rate:.5}),skeleton_say:Ht(.6,i=>{const t=i.buf(.7),e=4+Math.floor(i.r()*5);let n=.002;for(let s=0;s<e;s++)pl(i,t,n,i.u(.5,1)),n+=i.u(.03,.08);return t},{vars:3,jitter:.1,rate:.5}),skeleton_hurt:Ht(.75,i=>{const t=i.buf(.32);i.mix(t,he(i,.1,jt(5e-4,.01),["hp",2e3]),0,.6);const e=3+Math.floor(i.r()*3);let n=0;for(let s=0;s<e;s++)pl(i,t,n,i.u(.6,1),1.2),n+=i.u(.018,.04);return t},{vars:3,jitter:.1,rate:.5}),skeleton_death:Ht(.75,i=>{const t=i.buf(1.2);let e=0,n=.025;for(let s=0;s<18&&e<1;s++)pl(i,t,e,Math.exp(-e/.5)*i.u(.5,1),1-.3*e),e+=n*i.u(.6,1.4),n*=1.12;return cs(i,t,i.u(.15,.3),i.u(160,220),.5,.05),t},{vars:2,jitter:.06,rate:.5}),creeper_hurt:Ht(.75,i=>{const e=i.buf(.38);i.mix(e,he(i,.38,$e(.004,.05,.08),["bp",i.u(2500,3500),.8]),0,.8),i.mix(e,Je(i,.38,n=>900*Math.exp(-n/.1),1800,1.2,jt(.002,.12),2),0,.6);for(let n=0;n<4;n++)i.mix(e,jn(i,i.u(300,500),150,.01),i.u(0,.22),i.u(.3,.6));return e},{vars:3,jitter:.1,rate:.5}),creeper_death:Ht(.75,i=>{const e=i.buf(.95);i.mix(e,he(i,.95,jt(.01,.3),["bp",s=>4e3*Math.exp(-s/.5)+900,.9]),0,.8);const n=Je(i,.95,s=>700*Math.exp(-s/.3),s=>2500-1500*s/.95,1,jt(.005,.3),2);i.mix(e,n,0,.6);for(let s=0;s<7;s++){const r=s*.09+i.u(0,.05);i.mix(e,jn(i,i.u(260,420)*(1-r*.6),100,.015),r,.5*Math.exp(-r/.5))}return i.mix(e,he(i,.4,jt(.01,.12),["lp",300]),i.u(.05,.12),.4)},{vars:2,jitter:.06,rate:.5}),spider_say:Ht(.6,i=>{const t=i.u(.55,.8),e=i.u(22,34);return ml(i,t,e,n=>3200+800*Math.sin(di*3*n),Gn(.04,t,.15))},{vars:3,jitter:.1}),spider_hurt:Ht(.75,i=>{const t=i.u(.22,.3);return ml(i,t,i.u(36,46),i.u(3800,4600),$e(.005,t*.3,t*.2))},{vars:3,jitter:.1}),spider_death:Ht(.75,i=>{const t=i.u(1,1.2);return ml(i,t,e=>30-18*e/t,e=>3500-2e3*e/t,jt(.02,.4))},{vars:2,jitter:.06}),pig_say:Ht(.6,i=>{const t=i.buf(.75),e=i.pick([1,2,2,2,3]);let n=0;for(let s=0;s<e;s++){const r=i.u(.13,.2),o=i.u(150,230),a=Pn(i,r,{f0:c=>o*(1+.35*Math.sin(Math.PI*c/r)),formants:hi([[0,[300,1100,2300]],[r*.4,[520,1300,2500]],[r,[380,1700,2500]]]),duty:.3,jitter:.1,growl:.45,breath:.1,dry:.2,q:[4,6,7]});i.mix(t,re(a,i.sr,$e(.012,r*.4,r*.25)),n,s?.8:1),n+=r+i.u(.06,.1)}return t},{vars:3,jitter:.1,rate:.5}),pig_hurt:Ht(.75,i=>{const t=i.u(.24,.34),e=i.u(520,700),n=Pn(i,t,{f0:s=>e*(1+.3*Math.sin(Math.PI*s/t)),formants:()=>[900,2200,3200],vib:11,vibDepth:.03,duty:.35,jitter:.06,breath:.12,growl:.2,q:[5,7,8]});return re(n,i.sr,$e(.01,t*.5,t*.2))},{vars:3,jitter:.1,rate:.5}),cow_say:Ht(.6,i=>{const t=i.u(.85,1.15),e=i.u(98,120),n=Pn(i,t,{f0:s=>{const r=s/t;return e*(1+.2*Math.sin(Math.PI*Math.min(1,r/.75))-(r>.75?.3*(r-.75):0))},formants:hi([[0,[260,650,2200]],[.12,[320,760,2300]],[t*.55,[560,900,2400]],[t,[420,780,2300]]]),vib:3.5,vibDepth:.012,jitter:.03,breath:.05,growl:.12,dry:.6,q:[4,6,8]});return Me(n,i.sr,"lp",s=>350+3500*Math.min(1,s/.25),.7),re(n,i.sr,Gn(.08,t,.3))},{vars:3,jitter:.08,rate:.5}),cow_hurt:Ht(.75,i=>{const t=i.u(.28,.36),e=i.u(160,190),n=Pn(i,t,{f0:s=>e*(1+.15*Math.sin(Math.PI*s/t)),formants:hi([[0,[300,700,2200]],[t*.4,[600,950,2400]],[t,[450,800,2300]]]),jitter:.04,breath:.08,growl:.2,dry:.5,q:[4,6,8]});return Me(n,i.sr,"lp",s=>500+3500*Math.min(1,s/.06),.7),re(n,i.sr,$e(.015,t*.4,t*.2))},{vars:3,jitter:.08,rate:.5}),sheep_say:Ht(.6,i=>{const t=i.u(.6,.85),e=i.u(270,340),n=i.u(7,9.5),s=Pn(i,t,{f0:r=>e*(1+.05*Math.sin(Math.PI*r/t)),formants:hi([[0,[400,1100,2600]],[.05,[850,1500,2800]],[t,[700,1750,2750]]]),vib:n,vibDepth:.045,jitter:.03,breath:.12,duty:.4,q:[5,7,9]});return re(s,i.sr,r=>1-.4*(.5+.5*Math.sin(di*n*r))),re(s,i.sr,Gn(.03,t,.2))},{vars:3,jitter:.08,rate:.5}),sheep_hurt:Ht(.75,i=>{const t=i.u(.26,.34),e=i.u(380,450),n=i.u(10,12),s=Pn(i,t,{f0:r=>e*(1.05-.1*r/t),formants:hi([[0,[450,1200,2700]],[.03,[900,1600,2900]],[t,[800,1800,2800]]]),vib:n,vibDepth:.05,jitter:.04,breath:.15,duty:.4,q:[5,7,9]});return re(s,i.sr,r=>1-.35*(.5+.5*Math.sin(di*n*r))),re(s,i.sr,$e(.01,t*.4,t*.2))},{vars:3,jitter:.08,rate:.5}),chicken_say:Ht(.55,i=>{const t=i.buf(.8),e=2+Math.floor(i.r()*3);let n=0;for(let s=0;s<e;s++){const r=i.u(.04,.07),o=i.u(600,900),a=Pn(i,r,{f0:c=>o*(1+.5*Math.sin(Math.PI*c/r)),formants:()=>[950,1900,3e3],duty:.3,jitter:.05,breath:.1,q:[3,5,6]});i.mix(t,re(a,i.sr,$e(.004,r*.35,r*.3)),n,i.u(.6,1)),n+=r+i.u(.05,.12)}return t},{vars:3,jitter:.1,rate:.5}),chicken_hurt:Ht(.7,i=>{const t=i.u(.16,.22),e=i.u(1e3,1300),n=Pn(i,t,{f0:s=>e*(1-.35*s/t),formants:()=>[1100,2300,3400],duty:.25,jitter:.08,breath:.25,growl:.4,q:[3,5,6]});return re(n,i.sr,$e(.005,t*.35,t*.25))},{vars:3,jitter:.1,rate:.5})},Ks={};for(const i of zy)for(const t of Gy){const e=i==="wool"||i==="snow"?.85:1,n=(t==="break"?.8:t==="place"?.72:t==="hit"?.42:.3)*e;Ks[`${t}_${i}`]=Ht(n,s=>Hy(s,i,t),{vars:t==="hit"||t==="step"?4:3,jitter:t==="step"?.05:.06,rate:e<1?.5:1})}Object.assign(Ks,Vy);const Wy=Object.keys(Ks);function Xy(i,t,e){const n=1-di*20/t;let s=0,r=0;for(let M=0;M<i.length;M++){const S=i[M];r=S-s+n*r,s=S,i[M]=r}let o=Qa(i);if(!(o>0))return i;if(e>0){const M=1/Math.tanh(e);for(let S=0;S<i.length;S++)i[S]=Math.tanh(e*i[S]/o)*M;o=1}let a=i.length;const c=o*.001;for(;a>1&&Math.abs(i[a-1])<c;)a--;const l=i.slice(0,Math.min(i.length,a+Math.round(.004*t))),h=Math.min(l.length,Math.round(5e-4*t));for(let M=0;M<h;M++)l[M]*=.5-.5*Math.cos(Math.PI*M/h);ws(l,t,Math.max(.004,Math.min(.03,.1*l.length/t)));const u=Me(l.slice(),t,"hp",90,.6),f=Me(u.slice(),t,"hp",1800,.7),d=Math.max(1,Math.min(u.length,Math.round(.025*t)));let m=0,_=0;for(let M=0;M<u.length;M++){const S=u[M]+.55*f[M];if(m+=S*S,M>=d){const v=u[M-d]+.55*f[M-d];m-=v*v}m>_&&(_=m)}const g=Math.sqrt(_/d),p=Math.min(g>0?.25/g:1/0,.98/Qa(l));for(let M=0;M<l.length;M++)l[M]*=p;return l}function Yy(i,t=48e3){var s;const e=Math.min(Nh,t),n=((s=Ks[i])==null?void 0:s.rate)??1;return n<1?Math.max(16e3,Math.round(e*n)):e}function Ky(i,t=0,e=48e3){const n=Ks[i];if(!n)throw new Error(`Unknown sound: ${i}`);const s=new _u(e,Oy(`${i}#${t}`));return Xy(n.gen(s),e,n.drive)}function qy(i,t){const e=Math.round(t*i),n=Math.round(.3*i);return[0,1].map(s=>{const r=new _u(i,1953+s),o=(e+n)/i,a=r.pink(o);Me(a,i,"hp",350,.6);const c=Me(a.slice(),i,"bp",2600,.5);Me(a,i,"lp",5500,.6);const l=Vn(r,o,.7),h=new Float32Array(e),u=m=>(a[m]+.6*c[m])*(.85+.3*l[m]);for(let m=0;m<e;m++)if(m<n){const _=m/n*Math.PI/2;h[m]=u(m)*Math.sin(_)+u(e+m)*Math.cos(_)}else h[m]=u(m);let f=0;for(let m=0;m<e;m++)f+=h[m]*h[m];const d=Math.sqrt(f/e);return d>0?Ue(h,Math.min(.98,Qa(h)*(.2/d))):h})}function $y(i,t){const e=Math.round(t*i);return[0,1].map(n=>{const s=new _u(i,53769+n),r=new Float32Array(e),o=Math.round(t*75);for(let a=0;a<o;a++){const c=Math.floor(s.r()*e),l=s.r();let h,u;l<.6?(h=Ze(s,s.u(2e3,6500),s.u(.8,2.5),s.u(6e-4,.0018)),u=Math.pow(s.r(),2)):l<.85?(h=s.buf(.05),yn(h,i,0,s.u(1800,4500),1,s.u(.004,.012)),u=.3*Math.pow(s.r(),2)):(h=he(s,.04,jt(.001,.006),["bp",s.u(500,1200),1]),u=.5*s.r());for(let f=0;f<h.length;f++)r[(c+f)%e]+=h[f]*u}return Ue(r,.9)})}function za(i,t,e){const n=i.createBuffer(t.length,t[0].length,e);return t.forEach((s,r)=>n.getChannelData(r).set(s)),n}function To(i,t,e,n){i.cancelScheduledValues(e),i.setValueAtTime(i.value,e),i.linearRampToValueAtTime(t,e+n)}function nc(i,t=500){typeof requestIdleCallback=="function"?requestIdleCallback(i,{timeout:t}):setTimeout(i,40)}class jy{constructor(t,e,n){C(this,"parts");this.parts=n.map(s=>{const r=t.createBufferSource();r.buffer=s,r.loop=!0;const o=t.createGain();return o.gain.value=0,r.connect(o),o.connect(e),r.start(t.currentTime,Math.random()*s.duration),{src:r,gain:o}})}set(t,e){const[n,s]=this.parts;To(n.gain.gain,Ny*Math.pow(t,1.3),e,1.5),To(s.gain.gain,Uy*Math.pow(t,.8),e,1.5)}stop(){for(const{src:t,gain:e}of this.parts){try{t.stop()}catch{}t.disconnect(),e.disconnect()}}}const gl=[36,42,48,54,60,66,72,78,84,90],Zy=[[0,2,4,7,9],[0,2,4,7,9,11]],Jy={0:[0,4,7,11],2:[2,5,9,12],4:[4,7,11,14],5:[5,9,12,16],7:[7,11,14,21],9:[9,12,16,19]},Qy=[[0,5],[0,9,5,0],[5,0],[0,4,5,0],[9,5,0,7],[0,7,9,5],[0,2,5,0]];function tb(i,t){const e=gu(i),n=Nn(4.5*Math.pow(261.6/e,.3),2.5,6),s=new Float32Array(Math.round(n*t)),r=Math.min(t*.45,6e3);for(let a=1;a<=16;a++){const c=a*e*Math.sqrt(1+4e-4*a*a);if(c>r)break;const l=1/(1+Math.pow(c/1400,2))/Math.pow(a,1.1);yn(s,t,0,c,l*.6,n*.12/(1+.5*(a-1))),yn(s,t,0,c*1.0006,l*.4,n*.3/(1+.25*(a-1)))}const o=Math.round(.004*t);for(let a=0;a<o;a++)s[a]*=.5-.5*Math.cos(Math.PI*a/o);return Ue(ws(s,t,n*.2),.5)}function eb(i,t,e){const n=i.sampleRate,s=Math.round(t*n),r=i.createBuffer(2,s,n),o=Math.round(.018*n);for(let a=0;a<2;a++){const c=r.getChannelData(a),l=h0(48879+a);let h=0;for(let u=o;u<s;u++){const f=(u-o)/n;h+=(.08+.55*Math.exp(-f/.9))*(l()*2-1-h),c[u]=h*Math.exp(-6.9*f/e)*Math.min(1,(s-u)/(.05*n))}}return r}class nb{constructor(t,e){C(this,"out");C(this,"bus");C(this,"wave");C(this,"samples",new Map);C(this,"nodes",new Set);C(this,"sampleRate");C(this,"events",[]);C(this,"timer");C(this,"nextPhrase",0);C(this,"playing",!1);C(this,"generation",0);C(this,"tick",()=>{try{const t=this.ctx.currentTime;if(!this.events.length&&t>=this.nextPhrase){const e=this.compose(t+.2);this.nextPhrase=e+30+Math.random()*90}for(;this.events.length&&this.events[0].t<t+1.5;){const e=this.events.shift();e.t<t||(e.kind==="note"?this.note(e.t,e.midi,e.vel):this.pad(e.t,e.notes,e.dur,e.vel))}}catch{}});this.ctx=t,this.dest=e,this.sampleRate=Math.max(22050,Math.min(24e3,t.sampleRate)),this.out=t.createGain(),this.out.gain.value=0,this.bus=t.createGain();const n=t.createGain();n.gain.value=.7;const s=t.createGain();s.gain.value=.55;const r=t.createConvolver();r.buffer=eb(t,4,3.2),this.bus.connect(n),n.connect(this.out),this.bus.connect(s),s.connect(r),r.connect(this.out);const o=[0,1,.3,.12,.05,.02];this.wave=t.createPeriodicWave(new Float32Array(o.length),new Float32Array(o))}setVolume(t){const e=this.ctx.currentTime;To(this.out.gain,t*Iy,e,t>0?1:1.5),t>0&&!this.playing?this.start(e):t<=0&&this.playing&&this.stop()}dispose(){this.stop(),this.silence()}start(t){this.playing=!0,this.generation++,this.out.connect(this.dest),this.nextPhrase=t+3+Math.random()*4,this.timer===void 0&&(this.timer=setInterval(this.tick,250));const e=gl.filter(s=>!this.samples.has(s)),n=()=>{const s=e.shift();if(!(s===void 0||!this.playing)){try{this.sample(s)}catch{return}nc(n,1e3)}};nc(n,1e3)}stop(){this.playing=!1,this.events=[],this.timer!==void 0&&clearInterval(this.timer),this.timer=void 0;const t=++this.generation;setTimeout(()=>{!this.playing&&t===this.generation&&this.silence()},2500)}silence(){for(const t of this.nodes)try{t.stop()}catch{}this.nodes.clear(),this.out.disconnect()}compose(t){const e=Math.random,n=v=>v[Math.floor(e()*v.length)],s=48+Math.floor(e()*8),r=n(Zy),o=60/(54+e()*24),a=n(Qy),c=n([4,6,8]),l=c*o,h=Math.max(2,Math.round((20+e()*40)/l)),u=e()<.6,f=[];for(let v=s+12;v<=s+36;v++)r.includes((v-s)%12)&&f.push(v);const d=(f.length-1)/2,m=[];for(let v=0;v<c;v+=.5)e()<(v%1?.12:.5)&&m.push(v);for(;m.length<2;){const v=Math.floor(e()*c);m.includes(v)||m.push(v)}m.sort((v,E)=>v-E);const _=m.map(()=>n([-2,-1,-1,1,1,2,3,-3]));let g=Math.round(d),p=-1;const M=[];for(let v=0;v<h;v++){const E=t+v*l,w=Jy[a[v%a.length]];let b=s-12+w[0];for(;b>50;)b-=12;if(M.push({t:E,kind:"note",midi:b,vel:.3+e()*.1}),e()<.4&&M.push({t:E+o*Math.floor(c/2),kind:"note",midi:b+7,vel:.22}),u){const x=[w[0],w[1],w[w.length-1]].map(y=>{let R=s+y;for(;R<55;)R+=12;for(;R>70;)R-=12;return R});M.push({t:E,kind:"pad",notes:x,dur:l+2,vel:.03+e()*.015})}const L=w.map(x=>x%12);for(let x=0;x<f.length&&e()<.8;x++){if(g-x>=0&&L.includes((f[g-x]-s)%12)){g-=x;break}if(g+x<f.length&&L.includes((f[g+x]-s)%12)){g+=x;break}}m.forEach((x,y)=>{if(e()<.15)return;if(y>0){let P=e()<.25?n([-1,1,2,-2]):_[y];Math.abs(g-d)>f.length*.3&&Math.sign(P)===Math.sign(g-d)&&(P=-P),g=Nn(g+P,0,f.length-1)}f[g]===p&&e()<.7&&(g=Nn(g+(g>d?-1:1),0,f.length-1)),p=f[g];const R=E+x*o+(e()-.5)*.04;M.push({t:R,kind:"note",midi:f[g],vel:.22+e()*.18+(x===0?.06:0)}),e()<.12&&g>=2&&M.push({t:R+.012,kind:"note",midi:f[g-2],vel:.15})})}const S=t+h*l;return M.push({t:S,kind:"note",midi:s+24,vel:.3}),M.push({t:S,kind:"note",midi:s-12,vel:.28}),M.sort((v,E)=>v.t-E.t),this.events=M,S+6}sample(t){let e=this.samples.get(t);return e||(e=za(this.ctx,[tb(t,this.sampleRate)],this.sampleRate),this.samples.set(t,e)),e}track(t,e){this.nodes.add(t),t.onended=()=>{this.nodes.delete(t),t.disconnect();for(const n of e)n.disconnect()}}note(t,e,n){const s=this.ctx;let r=gl[0];for(const c of gl)Math.abs(c-e)<Math.abs(r-e)&&(r=c);const o=s.createBufferSource();o.buffer=this.sample(r),o.playbackRate.value=Math.pow(2,(e-r)/12);const a=s.createGain();a.gain.value=n,o.connect(a),a.connect(this.bus),this.track(o,[a]),o.start(t)}pad(t,e,n,s){const r=this.ctx,o=r.createBiquadFilter();o.type="lowpass",o.frequency.value=700+Math.random()*500,o.Q.value=0;const a=r.createGain(),c=Math.min(3,n*.35),l=Math.min(4,n*.45);a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(s,t+c),a.gain.setValueAtTime(s,t+n-l),a.gain.linearRampToValueAtTime(0,t+n),o.connect(a),a.connect(this.bus),e.forEach((h,u)=>{for(const f of[-7,7]){const d=r.createOscillator();d.setPeriodicWave(this.wave),d.frequency.value=gu(h),d.detune.value=f+(Math.random()-.5)*4,d.connect(o),this.track(d,u===e.length-1&&f>0?[o,a]:[]),d.start(t),d.stop(t+n+.05)}})}}class ib{constructor(){C(this,"ctx",null);C(this,"unavailable",!1);C(this,"disposed",!1);C(this,"rate",Nh);C(this,"master",null);C(this,"sfxIn",null);C(this,"water",null);C(this,"sfxVol",null);C(this,"music",null);C(this,"rain",null);C(this,"rainBuffers",null);C(this,"rainTimer");C(this,"buffers",new Map);C(this,"lastVariant",new Map);C(this,"voices",[]);C(this,"fadingUntil",[]);C(this,"warm",null);C(this,"volume",1);C(this,"musicVolume",0);C(this,"rainLevel",0);C(this,"underwater",!1);C(this,"pos",{x:0,y:0,z:0,yaw:0,pitch:0});C(this,"warmStep",t=>{const e=this.warm;if(!e||this.disposed||!this.ctx)return;const n=performance.now();try{for(;e.length&&(e.shift()(),!((t&&!t.didTimeout?t.timeRemaining():6-(performance.now()-n))<3)););}catch{e.length=0}e.length&&nc(this.warmStep)})}unlock(){if(!(this.disposed||this.unavailable))try{this.ctx||this.init();const t=this.ctx;if(!t)return;if(t.state!=="running"){const e=t.resume();e&&e.then(()=>this.warmUp(),()=>{})}this.warmUp()}catch{}}setVolume(t){this.volume=Nn(es(t,this.volume),0,1);try{this.ctx&&this.sfxVol&&To(this.sfxVol.gain,this.volume,this.ctx.currentTime,.05)}catch{}}setMusicVolume(t){var e;this.musicVolume=Nn(es(t,this.musicVolume),0,1);try{if(!this.ctx||!this.master)return;!this.music&&this.musicVolume>0&&(this.music=new nb(this.ctx,this.master)),(e=this.music)==null||e.setVolume(this.musicVolume)}catch{}}setListener(t,e,n,s,r){if(![t,e,n,s,r].every(ya))return;const o=this.pos;if(!(o.x===t&&o.y===e&&o.z===n&&o.yaw===s&&o.pitch===r)){o.x=t,o.y=e,o.z=n,o.yaw=s,o.pitch=r;try{this.applyListener()}catch{}}}play(t,e){try{const n=this.ctx,s=this.sfxIn;if(!n||!s||this.disposed||n.state!=="running")return;const r=Ks[t];if(!r)return;const o=Nn(es(e==null?void 0:e.volume,1),0,2),a=Nn(es(e==null?void 0:e.pitch,1),.25,4),c=!!e&&(ya(e.x)||ya(e.y)||ya(e.z));let l=0,h=0,u=0,f=1;if(c){const w=this.pos;l=es(e.x,w.x),h=es(e.y,w.y),u=es(e.z,w.z);const b=Math.hypot(l-w.x,h-w.y,u-w.z);if(b>=dl)return;f=1-Math.max(0,b-fl)/(dl-fl)}const d=r.gain*o*f;if(d<.002)return;const m=n.currentTime;let _=0;for(const w of this.voices)w.name===t&&m-w.start<.05&&_++;if(_>=3||this.voices.length>=Dy&&!this.steal(d,m))return;const g=this.pick(t);if(!g)return;const p=n.createBufferSource();p.buffer=g;const M=a*(1+r.jitter*(Math.random()*2-1));p.playbackRate.value=M;const S=n.createGain();S.gain.value=r.gain*o,p.connect(S);let v=null;c?(v=n.createPanner(),v.panningModel="equalpower",v.distanceModel="linear",v.refDistance=fl,v.maxDistance=dl,v.rolloffFactor=1,v.positionX?(v.positionX.value=l,v.positionY.value=h,v.positionZ.value=u):v.setPosition(l,h,u),S.connect(v),v.connect(s)):S.connect(s),p.start(m);const E={src:p,gain:S,panner:v,name:t,start:m,end:m+g.duration/M,level:d};p.onended=()=>this.release(E),this.voices.push(E)}catch{}}setRain(t){this.rainLevel=Nn(es(t,0),0,1);try{this.applyRain()}catch{}}setUnderwater(t){this.underwater=!!t;try{this.applyUnderwater()}catch{}}dispose(){var t,e;if(!this.disposed){this.disposed=!0,this.warm=null,clearTimeout(this.rainTimer);try{(t=this.music)==null||t.dispose(),(e=this.rain)==null||e.stop();for(const s of this.voices)try{s.src.stop()}catch{}const n=this.ctx;n&&typeof n.close=="function"&&n.close().catch(()=>{})}catch{}this.voices=[],this.music=null,this.rain=null,this.ctx=null,this.sfxIn=null,this.buffers.clear(),this.rainBuffers=null}}init(){const t=globalThis,e=t.AudioContext??t.webkitAudioContext;if(!e){this.unavailable=!0;return}let n;try{n=new e({latencyHint:"interactive"})}catch{n=new e}this.ctx=n,this.rate=Math.min(Nh,n.sampleRate);const s=n.createDynamicsCompressor();s.threshold.value=-8,s.knee.value=4,s.ratio.value=20,s.attack.value=.002,s.release.value=.15,s.connect(n.destination);const r=n.createGain();r.gain.value=.7,r.connect(s),this.master=r;const o=n.createGain();o.gain.value=this.volume,o.connect(r);const a=n.createBiquadFilter();a.type="lowpass",a.Q.value=0,a.frequency.value=this.underwater?td:this.openCutoff(),a.connect(o);const c=n.createGain();c.connect(a),this.sfxVol=o,this.water=a,this.sfxIn=c,n.onstatechange=()=>{n.state==="running"&&this.warmUp()};const l=n.createBufferSource();l.buffer=n.createBuffer(1,1,n.sampleRate),l.connect(n.destination),l.start(0),this.applyListener(),this.applyRain(),this.setMusicVolume(this.musicVolume)}openCutoff(){var t;return Math.min(2e4,(((t=this.ctx)==null?void 0:t.sampleRate)??44100)*.45)}applyListener(){const t=this.ctx;if(!t)return;const{x:e,y:n,z:s,yaw:r,pitch:o}=this.pos,a=Math.cos(o),c=Math.sin(o),l=Math.cos(r),h=Math.sin(r),u=-h*a,f=c,d=-l*a,m=h*c,_=a,g=l*c,p=t.listener;p.positionX?(p.positionX.value=e,p.positionY.value=n,p.positionZ.value=s,p.forwardX.value=u,p.forwardY.value=f,p.forwardZ.value=d,p.upX.value=m,p.upY.value=_,p.upZ.value=g):(p.setPosition(e,n,s),p.setOrientation(u,f,d,m,_,g))}applyUnderwater(){var s;const t=this.ctx,e=(s=this.water)==null?void 0:s.frequency;if(!t||!e)return;const n=t.currentTime;e.cancelScheduledValues(n),e.setValueAtTime(Math.max(20,e.value),n),e.exponentialRampToValueAtTime(this.underwater?td:this.openCutoff(),n+(this.underwater?.15:.35))}applyRain(){const t=this.ctx;if(!t||!this.sfxIn)return;const e=this.rainLevel;clearTimeout(this.rainTimer),e>0&&!this.rain&&(this.rain=new jy(t,this.sfxIn,this.rainLoops(t))),this.rain&&(this.rain.set(e,t.currentTime),e<=0&&(this.rainTimer=setTimeout(()=>{this.rainLevel<=0&&this.rain&&(this.rain.stop(),this.rain=null)},4e3)))}rainLoops(t){return this.rainBuffers??(this.rainBuffers=[za(t,qy(this.rate,4),this.rate),za(t,$y(this.rate,2.7),this.rate)]),this.rainBuffers}pick(t){const e=this.buffers.get(t),n=[];if(e)for(let r=0;r<e.length;r++)e[r]&&n.push(r);if(!e||!n.length)return this.variant(t,0);let s=Math.floor(Math.random()*n.length);return n.length>1&&n[s]===this.lastVariant.get(t)&&(s=(s+1)%n.length),this.lastVariant.set(t,n[s]),e[n[s]]}variant(t,e){const n=this.ctx;if(!n)return;let s=this.buffers.get(t);s||(s=[],this.buffers.set(t,s));let r=s[e];if(!r){const o=Yy(t,this.rate);r=za(n,[Ky(t,e,o)],o),s[e]=r}return r}warmUp(){const t=this.ctx;if(this.warm||this.disposed||(t==null?void 0:t.state)!=="running")return;const e=[];for(let n=0;n<4;n++)for(const s of Wy)n<Ks[s].vars&&e.push(()=>this.variant(s,n));e.push(()=>this.rainLoops(t)),this.warm=e,nc(this.warmStep)}steal(t,e){if(this.fadingUntil=this.fadingUntil.filter(o=>o>e),this.fadingUntil.length>=Py)return!1;let n=-1,s=1/0;for(let o=0;o<this.voices.length;o++){const a=this.voices[o],c=a.end-a.start,l=c>0?Nn((a.end-e)/c,0,1):0,h=a.level*(.25+.75*l);h<s&&(s=h,n=o)}if(n<0||s>t)return!1;const r=this.voices[n];this.voices.splice(n,1),this.fadingUntil.push(e+.012);try{To(r.gain.gain,0,e,.01),r.src.stop(e+.012)}catch{}return!0}release(t){var n;const e=this.voices.indexOf(t);e>=0&&this.voices.splice(e,1),t.src.disconnect(),t.gain.disconnect(),(n=t.panner)==null||n.disconnect()}}const Xi=`
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
`,Jr=`
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
`,f0=`
#ifdef USE_SHADOWS
uniform sampler2D uShadowMap;
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
  float bias = 0.00025 + 0.0006 * (1.0 - ndl);
  float sum = 0.0;
  for (int i = 0; i < SHADOW_TAPS; i++) {
    float d = texture(uShadowMap, c.xy + POISSON[i] * uShadowTexel * 1.6).r;
    sum += c.z - bias > d ? 0.0 : 1.0;
  }
  float s = sum / float(SHADOW_TAPS);
  vec2 e = abs(c.xy - 0.5) * 2.0;
  return mix(s, 1.0, smoothstep(0.82, 0.98, max(e.x, e.y)));
}
#else
float shadowFactor(vec3 world, vec3 normal, float ndl) { return 1.0; }
#endif
`,d0=`
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
`,p0=`
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
`,_l=`
precision highp float;
precision highp int;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
${Xi}
${d0}
${p0}

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
`,m0=`
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
`,ed=`
precision highp float;
precision highp int;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${Xi}
${Jr}
${f0}

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

${m0}

void main() {
  vec4 tex = sampleAtlas(vUv, vAnim, vFace);
  if (tex.a < 0.5) discard;
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
`,sb=`
precision highp float;
precision highp int;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${Xi}
${Jr}
${f0}

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

${m0}

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
`,rb=`
precision highp float;
precision highp int;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
${Xi}
${d0}
${p0}
out vec3 vUv;
void main() {
  Decoded d = decode();
  vUv = d.uv;
  gl_Position = projectionMatrix * viewMatrix * d.world;
}
`,ob=`
precision highp float;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
in vec3 vUv;
out vec4 outColor;
void main() {
  if (texture(uAtlas, vUv).a < 0.5) discard;
  outColor = vec4(1.0);
}
`,ab=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`,cb=`
${Xi}
uniform float uNight;
uniform vec3 uSunDisk;
uniform vec3 uMoonDisk;
varying vec3 vDir;
${Jr}

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
`,nd=`
attribute float aShade;
varying vec3 vWorld;
varying float vShade;
void main() {
  vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vShade = aShade;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,lb=`
${Xi}
varying vec3 vWorld;
varying float vShade;
${Jr}
void main() {
  vec3 col = (uAmbient * 1.2 + uLightColor * 0.85) * vShade;
  col = mix(col, col * 0.55, uRain);
  vec3 v = vWorld - uCameraPos;
  float dist = length(v);
  float fog = smoothstep(uFogFar * 1.2, uFogFar * 3.2, dist);
  vec3 c = mix(col, skyColor(v / dist), fog);
  gl_FragColor = vec4(c, 0.86 * (1.0 - fog * 0.85));
}
`,hb=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,ub=`
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
varying vec2 vUv;

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
  vec3 col = texture2D(tColor, uv).rgb;
#ifdef GOD_RAYS
  if (uSunVisible > 0.0) {
    vec2 delta = (uSunScreen - uv) / 40.0;
    vec2 p = uv;
    float acc = 0.0;
    float w = 1.0;
    for (int i = 0; i < 40; i++) {
      p += delta;
      float d = texture2D(tDepth, clamp(p, 0.0, 1.0)).r;
      acc += (d >= 0.99999 ? 1.0 : 0.0) * w;
      w *= 0.965;
    }
    float fall = 1.0 - smoothstep(0.0, 0.9, length((uv - uSunScreen) * vec2(1.0, 0.6)));
    col += uRayColor * acc / 40.0 * uSunVisible * fall * 0.9;
  }
#endif
  col *= uExposure;
  col = aces(col);
  float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = mix(vec3(luma), col, uSaturation);
  vec2 q = vUv - 0.5;
  col *= 1.0 - dot(q, q) * 0.55;
  if (uUnderwaterTint > 0.5) col = mix(col, col * vec3(0.55, 0.75, 1.0), 0.45);
  col = mix(col, vec3(0.7, 0.0, 0.0), uDamage * smoothstep(0.15, 0.75, length(q)));
  gl_FragColor = vec4(toSRGB(clamp(col, 0.0, 1.0)), 1.0);
}
`,Uh=1,Oh=2;function fb(){return{uTime:{value:0},uCameraPos:{value:new F},uSunDir:{value:new F(0,1,0)},uLightDir:{value:new F(0,1,0)},uLightColor:{value:new F(1,1,1)},uAmbient:{value:new F(.5,.5,.5)},uZenith:{value:new F(.1,.3,.8)},uHorizon:{value:new F(.6,.7,1)},uSunGlow:{value:new F(.5,.5,.4)},uBlockLight:{value:new F(1,.72,.42)},uFogNear:{value:60},uFogFar:{value:100},uUnderwater:{value:0},uWaterFog:{value:new F(.02,.07,.15)},uRain:{value:0},uShadowMap:{value:null},uShadowMatrix:{value:new ve},uShadowTexel:{value:1/1024}}}function db(i,t){const e=new lu(i,16,16,t);return e.magFilter=ln,e.minFilter=po,e.generateMipmaps=!0,e.colorSpace=hn,e.needsUpdate=!0,e}function pb(i,t,e){const n={};e.waving&&(n.WAVING=1),e.shadows&&(n.USE_SHADOWS=1,n.SHADOW_TAPS=e.shadowTaps);const s={...t,uAtlas:{value:i}},r=new Er({glslVersion:us,vertexShader:_l,fragmentShader:ed,uniforms:s,defines:n}),o=new Er({glslVersion:us,vertexShader:_l,fragmentShader:sb,uniforms:s,defines:n,transparent:!0,depthWrite:!1,side:Jn}),a=new Er({glslVersion:us,vertexShader:rb,fragmentShader:ob,uniforms:s,defines:e.waving?{WAVING:1}:{},side:Jn}),c={...n,ENTITY:1};return delete c.WAVING,{solid:r,translucent:o,shadowDepth:a,entityBlock:(h,u=!1)=>new Er({glslVersion:us,vertexShader:_l,fragmentShader:ed,uniforms:{...s,uEntityLight:{value:h},uNoFog:{value:u?1:0}},defines:c}),atlas:i}}function Fr(i,t){i.traverse(e=>{const n=e;if(!n.isMesh)return;e.layers.enable(Oh),e.castShadow=!0;const s=Array.isArray(n.material)?n.material:[n.material];for(const r of s)!r||r.__entityLight||(r instanceof Ei||r instanceof _1||r instanceof v1)&&(r.__entityLight=!0,r.onBeforeCompile=o=>{o.uniforms.uEntityLight=t,o.fragmentShader=o.fragmentShader.replace("void main() {",`uniform vec3 uEntityLight;
void main() {`).replace("#include <opaque_fragment>",`outgoingLight *= uEntityLight;
#include <opaque_fragment>`)},r.customProgramCacheKey=()=>"entity-light",r.needsUpdate=!0)})}const ic="#e0ac80",Bs="#4a2f1b",mb="#2c3e7a";function id(i){const t=document.createElement("canvas");t.width=t.height=8;const e=t.getContext("2d");i(e);const n=new fu(t);return n.magFilter=ln,n.minFilter=ln,n.generateMipmaps=!1,n.colorSpace=hn,n}const zn=(i,t,e,n,s=1,r=1)=>{i.fillStyle=t,i.fillRect(e,n,s,r)};let Ea=null;function gb(){if(Ea)return Ea;const i=id(e=>{zn(e,ic,0,0,8,8),zn(e,Bs,0,0,8,2),zn(e,Bs,0,2,1,1),zn(e,Bs,7,2,1,1),zn(e,"#ffffff",1,4),zn(e,"#3b5bb5",2,4),zn(e,"#3b5bb5",5,4),zn(e,"#ffffff",6,4),zn(e,"#b07850",3,5,2,1),zn(e,"#8a4b3a",3,6,2,1)}),t=id(e=>{zn(e,ic,0,0,8,8),zn(e,Bs,0,0,8,3),zn(e,Bs,4,3,4,1)});return Ea={face:i,side:t},Ea}function wa(i,t,e,n,s,r){const o=new Mn;o.position.set(r,s,0);const a=new _e(new tn(i,t,e),n);return a.position.y=-t/2,o.add(a),o}function _b(i,t){const e=document.createElement("canvas"),n=e.getContext("2d"),s='600 40px "Pixelify Sans", monospace';n.font=s;const r=Math.ceil(n.measureText(i).width)+24;e.width=r,e.height=56,n.font=s,n.fillStyle="rgba(0,0,0,0.45)",n.fillRect(0,0,r,56),n.fillStyle=t,n.fillRect(0,52,r,4),n.fillStyle="#ffffff",n.textBaseline="middle",n.fillText(i,12,28);const o=new fu(e);o.colorSpace=hn;const a=new a1(new Hp({map:o,depthTest:!1,transparent:!0,toneMapped:!1}));return a.scale.set(.32*r/56,.32,1),a.position.y=2.25,a.renderOrder=10,a}class sd{constructor(t,e,n,s){C(this,"group",new Mn);C(this,"target",new F);C(this,"light",{value:new F(1,1,1)});C(this,"sneaking",!1);C(this,"sleeping",!1);C(this,"targetYaw",0);C(this,"targetPitch",0);C(this,"yaw",0);C(this,"walkPhase",0);C(this,"swingTime",1);C(this,"body",new Mn);C(this,"head");C(this,"torso");C(this,"arms");C(this,"legs");C(this,"tag");C(this,"materials",[]);C(this,"held",null);C(this,"heldId",0);C(this,"armorMeshes",[]);C(this,"armorIds",[0,0,0,0]);this.name=t,this.items=s;const r=d=>{const m=new Ei(d);return this.materials.push(m),m},o=r({color:e}),a=r({color:mb}),c=r({color:ic}),{face:l,side:h}=gb();this.body.scale.setScalar(.9),this.group.add(this.body),this.torso=new _e(new tn(.5,.75,.25),o),this.torso.position.y=1.125,this.body.add(this.torso),this.head=new Mn,this.head.position.y=1.5;const u=[r({map:h}),r({map:h}),r({color:Bs}),r({color:ic}),r({color:Bs}),r({map:l})],f=new _e(new tn(.5,.5,.5),u);f.position.y=.25,this.head.add(f),this.body.add(this.head),this.arms=[wa(.25,.75,.25,o,1.5,.375),wa(.25,.75,.25,o,1.5,-.375)];for(const d of this.arms){const m=new _e(new tn(.251,.2,.251),c);m.position.y=-.65,d.add(m)}this.legs=[wa(.25,.75,.25,a,.75,.125),wa(.25,.75,.25,a,.75,-.125)],this.body.add(...this.arms,...this.legs),this.tag=_b(t,e),this.group.add(this.tag),Fr(this.body,this.light),this.target.set(...n),this.group.position.copy(this.target)}setTarget(t,e,n,s,r){this.target.set(t,e,n),this.targetYaw=s,this.targetPitch=r}swing(){this.swingTime=0}setHeld(t){if(t===this.heldId||(this.heldId=t,this.held&&(this.held.object.removeFromParent(),this.held.dispose(),this.held=null),!t))return;this.held=this.items.create(t);const e=this.held.object,n=this.items.isFlat(t);e.scale.setScalar(n?.55:.3),e.position.set(0,-.72,n?-.12:-.08),e.rotation.set(n?-Math.PI/2:0,n?Math.PI/2:Math.PI/4,0),this.arms[0].add(e)}setArmor(t){if(t.every((s,r)=>s===this.armorIds[r]))return;this.armorIds=[...t];for(const s of this.armorMeshes)s.removeFromParent(),s.geometry.dispose(),s.material.dispose();this.armorMeshes=[];const e=(s,r,o,a,c,l)=>{const h=new Ei({color:l}),u=new _e(new tn(r,o,a),h);u.position.y=c,s.add(u),this.armorMeshes.push(u)},n=s=>{var r,o;return((o=(r=pe(s))==null?void 0:r.armor)==null?void 0:o.color)??"#cccccc"};if(t[0]&&e(this.head,.58,.58,.58,.25,n(t[0])),t[1]){e(this.torso,.56,.8,.31,0,n(t[1]));for(const s of this.arms)e(s,.31,.4,.31,-.18,n(t[1]))}if(t[2])for(const s of this.legs)e(s,.29,.5,.29,-.28,n(t[2]));if(t[3])for(const s of this.legs)e(s,.3,.22,.3,-.66,n(t[3]));Fr(this.body,this.light)}update(t){const e=this.group.position,n=e.x,s=e.z;e.distanceToSquared(this.target)>64?e.copy(this.target):e.lerp(this.target,1-Math.exp(-t*14));let r=this.targetYaw-this.yaw;r=Math.atan2(Math.sin(r),Math.cos(r)),this.yaw+=r*(1-Math.exp(-t*14)),this.group.rotation.y=this.yaw,this.head.rotation.x+=(this.targetPitch-this.head.rotation.x)*(1-Math.exp(-t*14));const o=Math.hypot(e.x-n,e.z-s),a=t>0?o/t:0;this.walkPhase+=o*2.6;const c=Math.min(1,a/4),l=Math.sin(this.walkPhase)*.8*c;this.legs[0].rotation.x=l,this.legs[1].rotation.x=-l,this.arms[0].rotation.x=-l*.8,this.arms[1].rotation.x=l*.8,this.swingTime=Math.min(1,this.swingTime+t/.3),this.swingTime<1&&(this.arms[0].rotation.x=-Math.sin(this.swingTime*Math.PI)*1.6),this.heldId&&this.swingTime>=1&&(this.arms[0].rotation.x-=.3),this.body.rotation.x=0,this.body.position.set(0,0,0),this.torso.rotation.x=this.sneaking?.45:0,this.head.position.y=this.sneaking?1.38:1.5,this.tag.position.y=this.sneaking?2:2.25,this.sleeping&&(this.body.rotation.x=-Math.PI/2,this.body.position.set(0,.3,.9)),this.held&&(this.held.color.value.copy(this.light.value),this.held.light.set(1,0))}dispose(){var t,e;this.group.traverse(n=>{var s;n instanceof _e&&!((s=this.held)!=null&&s.object.getObjectById(n.id))&&n.geometry.dispose()}),(t=this.held)==null||t.dispose();for(const n of this.materials)n.dispose();for(const n of this.armorMeshes)n.material.dispose();(e=this.tag.material.map)==null||e.dispose(),this.tag.material.dispose()}}const We=16;class g0{constructor(t=We,e=We){C(this,"px");this.width=t,this.height=e,this.px=new Uint8ClampedArray(t*e*4)}index(t,e){const n=this.width,s=this.height;return((Math.floor(e)%s+s)%s*n+(Math.floor(t)%n+n)%n)*4}set(t,e,n,s=255){const r=this.index(t,e);this.px[r]=n[0],this.px[r+1]=n[1],this.px[r+2]=n[2],this.px[r+3]=s}get(t,e){const n=this.index(t,e);return[this.px[n],this.px[n+1],this.px[n+2]]}getAlpha(t,e){return this.px[this.index(t,e)+3]}alpha(t,e,n){this.px[this.index(t,e)+3]=n}clear(){this.px.fill(0)}rect(t,e,n,s,r,o=255){for(let a=e;a<=s;a++)for(let c=t;c<=n;c++)this.set(c,a,r,o)}copyFrom(t){this.px.set(t.px)}}const N=i=>[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)],fn=(i,t)=>[i[0]*t,i[1]*t,i[2]*t],bn=(i,t,e)=>[i[0]+(t[0]-i[0])*e,i[1]+(t[1]-i[1])*e,i[2]+(t[2]-i[2])*e];function _0(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619);return t>>>0}function _c(i){const t=document.createElement("canvas");return t.width=i.width,t.height=i.height,t.getContext("2d",{willReadFrequently:!0}).putImageData(new ImageData(new Uint8ClampedArray(i.px),i.width,i.height),0,0),t}function vb(i){return new Fb(i)}const xn=1/16,zs=64,Ta=.01,v0=2.66,xb=.8,Ao=i=>i>0?i<1?i:1:0,rd=(i,t,e)=>i>t?i<e?i:e:t;function Ts(i,t){i.rotation.y=rd(t.headYaw||0,-1.4,1.4),i.rotation.x=rd(t.headPitch||0,-1.2,1.2)}function vc(i,t=1){return Math.sin((i.walkPhase||0)*v0)*xb*t*Ao(i.walkAmount)}function xc(i,t){const e=vc(t);i[0].rotation.x=-e,i[1].rotation.x=e,i[2].rotation.x=e,i[3].rotation.x=-e}function x0(i){const t=i*20;return[Math.sin(t*.067)*.05,Math.cos(t*.09)*.05+.05]}const M0=["right","left","top","bottom","back","front"];class Mb{constructor(t,e,n,s,r){this.u=t,this.v=e,this.w=n,this.h=s,this.d=r}face(t){const{u:e,v:n,w:s,h:r,d:o}=this;switch(t){case"top":return{x:e+o,y:n,w:s,h:o};case"bottom":return{x:e+o+s,y:n,w:s,h:o};case"right":return{x:e,y:n+o,w:o,h:r};case"front":return{x:e+o,y:n+o,w:s,h:r};case"left":return{x:e+o+s,y:n+o,w:o,h:r};case"back":return{x:e+2*o+s,y:n+o,w:s,h:r}}}}function wi(i,t){return(e,n)=>{var s;return t[((s=i[n])==null?void 0:s[e])??""]}}class yb{constructor(t){C(this,"tile",new g0(zs,zs));C(this,"shelves",[]);C(this,"bottom",0);this.rnd=t}box(t,e,n,s){const r=this.alloc(2*(t+n),e+n),o=new Mb(r.x,r.y,t,e,n);for(const a of M0){const c=o.face(a);this.fill(c,(l,h)=>s(a,l,h,c.w,c.h))}return o}rect(t,e,n){const s=this.alloc(t,e),r={x:s.x,y:s.y,w:t,h:e};return this.fill(r,n),r}n(t,e=.1){return fn(t,1+(this.rnd()-.5)*e)}pick(t,e){let n=this.rnd()*e.reduce((s,r)=>s+r,0);for(let s=0;s<t.length;s++)if(n-=e[s],n<0)return t[s];return t[t.length-1]}alloc(t,e){let n=this.shelves.find(r=>e<=r.h&&r.x+t<=zs);if(!n){if(t>zs||this.bottom+e>zs)throw new Error("mobModels: texture atlas overflow");n={x:0,y:this.bottom,h:e},this.shelves.push(n),this.bottom+=e}const s={x:n.x,y:n.y};return n.x+=t,s}fill(t,e){for(let n=0;n<t.h;n++)for(let s=0;s<t.w;s++){const r=e(s,n);r&&this.tile.set(t.x+s,t.y+n,r)}}}function bb(i){const t=new fu(_c(i));return t.colorSpace=hn,t.magFilter=ln,t.minFilter=ln,t.generateMipmaps=!1,t}function y0(i,t,e,n,s){i.setXY(t,(e.x+Ta+n*(e.w-2*Ta))/zs,1-(e.y+Ta+(1-s)*(e.h-2*Ta))/zs)}function zt(i,t,e,n,s=0){const r=new tn((i.w+2*s)*xn,(i.h+2*s)*xn,(i.d+2*s)*xn),o=r.getAttribute("uv");for(let a=0;a<6;a++){const c=i.face(M0[a]);for(let l=a*4;l<a*4+4;l++)y0(o,l,c,o.getX(l),o.getY(l))}return r.translate(t*xn,e*xn,n*xn),r}function Sb(i,t,e,n){const s=new Fo(i.w*xn,i.h*xn);s.rotateY(Math.PI);const r=s.getAttribute("uv");for(let o=0;o<r.count;o++)y0(r,o,i,r.getX(o),r.getY(o));return s.translate(t*xn,e*xn,n*xn),s}function ue(...i){let t=0,e=0;for(const c of i)t+=c.getAttribute("position").count,e+=c.getIndex().count;const n={position:new Float32Array(t*3),normal:new Float32Array(t*3),uv:new Float32Array(t*2)},s=new Uint16Array(e);let r=0,o=0;for(const c of i){for(const h in n){const u=c.getAttribute(h);n[h].set(u.array,r*u.itemSize)}const l=c.getIndex().array;for(let h=0;h<l.length;h++)s[o+h]=l[h]+r;r+=c.getAttribute("position").count,o+=l.length,c.dispose()}const a=new He;return a.setAttribute("position",new ye(n.position,3)),a.setAttribute("normal",new ye(n.normal,3)),a.setAttribute("uv",new ye(n.uv,2)),a.setIndex(new ye(s,1)),a.computeBoundingSphere(),a}const Eb=new Kt(1.8,1.8,1.8);class wb{constructor(t,e,n){C(this,"materials",[]);C(this,"skin");this.root=t,this.map=e,this.skin=new Ei({map:e,alphaTest:n?.01:0,side:n?Jn:Hi,alphaHash:!0}),this.materials.push(this.skin)}part(t,e,n,s,r=this.root,o=this.skin){const a=new _e(t,o);return a.position.set(e*xn,n*xn,s*xn),a.rotation.order="ZYX",a.castShadow=!0,r.add(a),a}glow(){const t=new ko({map:this.map,color:Eb,alphaTest:.5,alphaHash:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2});return this.materials.push(t),t}}function Mc(i,t,e,n,s,r){return[i.part(t,e,n,s),i.part(t,-e,n,s),i.part(t,e,n,r),i.part(t,-e,n,r)]}const vu=N("#f4f1f1");function Tb(i){const t=N("#efa3a0"),e=N("#d98884"),n=N("#f6b6b2"),s=N("#b06a66"),r=wi(["","","","","wb....bw"],{w:vu,b:N("#24181a")}),o=wi(["","n..n"],{n:N("#9a524f")}),a=i.box(8,8,8,(m,_,g)=>m==="front"&&r(_,g)||i.n(m==="bottom"?e:t,.08)),c=i.box(4,3,1,(m,_,g)=>m==="front"&&o(_,g)||i.n(n,.05)),l=i.box(10,8,16,(m,_,g,p,M)=>i.n(m==="bottom"||m!=="top"&&g===M-1?e:t,.08)),h=i.box(4,6,4,(m,_,g)=>i.n(m==="bottom"||g===5?s:t,.08)),u=ue(zt(a,0,0,-4),zt(c,0,-1.5,-8.5)),f=ue(zt(l,0,0,0)),d=ue(zt(h,0,-3,0));return m=>{m.part(f,0,10,0);const _=m.part(u,0,12,-6),g=Mc(m,d,3,6,-5,7);return p=>{Ts(_,p),xc(g,p)}}}function Ab(i,t,e,n){const s=new Array(t*e).fill(!1);for(let r=0;r<n;r++){const o=i.rnd()*t,a=i.rnd()*e,c=1.5+i.rnd()*t*.3,l=1.5+i.rnd()*e*.3;for(let h=0;h<e;h++)for(let u=0;u<t;u++){const f=(u+.5-o)/c,d=(h+.5-a)/l;f*f+d*d<.85+i.rnd()*.3&&(s[h*t+u]=!0)}}return s}function Rb(i){const t=N("#4f3b2b"),e=N("#3b2b1f"),n=N("#e7e5e0"),s=N("#d8cfb8"),r=N("#eaa3a1"),o=N("#4a433d"),a=wi(["BBBWWBBB","BBWWWWBB","BBBWWBBB","wkBWWBkw","BBBBBBBB","BmmmmmmB","BmnmmnmB","BmmmmmmB"],{B:t,W:n,w:vu,k:N("#141010"),m:N("#c9b0a0"),n:N("#5e4940")}),c=new Map,l=(v,E)=>(w,b,L,x,y)=>{const R=v+w;let P=c.get(R);return P||c.set(R,P=Ab(i,x,y,w==="bottom"?E+2:E)),P[L*x+b]?i.n(n,.05):i.n(i.rnd()<.15?e:t,.08)},h=l("head",1),u=i.box(8,8,6,(v,E,w,b,L)=>v==="front"?a(E,w)??i.n(t,.08):v==="top"&&(E===3||E===4)&&w<3?i.n(n,.05):h(v,E,w,b,L)),f=i.box(1,3,1,(v,E,w)=>i.n(w===0?fn(s,.75):s,.05)),d=i.box(12,10,18,l("body",3)),m=i.box(4,1,6,(v,E,w)=>i.n(v==="bottom"&&(E===0||E===3)&&(w===1||w===4)?fn(r,.82):r,.05)),_=l("leg",1),g=i.box(4,12,4,(v,E,w,b,L)=>v==="bottom"||w>=10?i.n(o,.08):_(v,E,w,b,L)),p=ue(zt(u,0,0,-3),zt(f,4.5,3.5,-3.5),zt(f,-4.5,3.5,-3.5)),M=ue(zt(d,0,0,0),zt(m,0,-5.5,6)),S=ue(zt(g,0,-6,0));return v=>{v.part(M,0,17,1);const E=v.part(p,0,20,-8),w=Mc(v,S,4,12,-6,7);return b=>{Ts(E,b),xc(w,b)}}}function Cb(i){const t=N("#ebe8e1"),e=N("#d6d2c9"),n=N("#f7f5f0"),s=N("#d6b8a3"),r=N("#c09f89"),o=N("#c3b1a1"),a=N("#6f6159"),c=wi(["","","wb..bw","","..pp..","..mm.."],{w:vu,b:N("#1a1414"),p:N("#d79c94"),m:N("#a2827a")}),l=()=>{const M=i.rnd();return i.n(M<.14?e:M>.88?n:t,.05)},h=i.box(8,6,16,M=>i.n(M==="bottom"?r:s,.06)),u=i.box(8,6,16,l),f=i.box(4,12,4,(M,S,v)=>i.n(M==="bottom"||v===11?a:s,.06)),d=i.box(4,6,4,l),m=i.box(6,6,8,(M,S,v)=>M==="front"&&c(S,v)||i.n(o,.06)),_=i.box(6,6,6,l),g={body:ue(zt(h,0,0,0),zt(u,0,0,0,1.75)),head:ue(zt(m,0,1,-2),zt(_,0,1,-1,.6)),leg:ue(zt(f,0,-6,0),zt(d,0,-3,0,.5))},p={body:ue(zt(h,0,0,0)),head:ue(zt(m,0,1,-2)),leg:ue(zt(f,0,-6,0))};return M=>{const S=M.part(g.body,0,15,0),v=M.part(g.head,0,18,-8),E=Mc(M,g.leg,3,12,-5,7);return w=>{const b=w.sheared?p:g;S.geometry=b.body,v.geometry=b.head;for(const L of E)L.geometry=b.leg;Ts(v,w),xc(E,w)}}}function Lb(i){const t=N("#f4f4f2"),e=N("#d8d8d4"),n=N("#f5b01c"),s=N("#d68712"),r=N("#d42a1e"),o=N("#e3892a"),a=N("#141414"),c=()=>i.n(i.rnd()<.1?e:t,.05),l=i.box(4,6,3,(v,E,w,b)=>w===1&&(v==="front"&&(E===0||E===b-1)||v==="right"&&E===b-1||v==="left"&&E===0)?a:c()),h=i.box(4,2,2,(v,E,w)=>i.n(v==="bottom"||v!=="top"&&w===1?s:n,.05)),u=i.box(2,2,2,(v,E,w)=>i.n(v==="bottom"||w===1?fn(r,.8):r,.05)),f=i.box(6,6,8,(v,E,w)=>v==="bottom"||v==="back"&&w<3&&E>0&&E<5&&(E+w)%2===0?i.n(e,.05):c()),d=i.box(1,4,6,(v,E,w,b,L)=>v==="top"||v==="bottom"?c():i.n(w===L-1||w===L-2&&E%2===(v==="right"?0:1)&&b>1?e:t,.05)),m=i.box(1,5,1,()=>i.n(o,.06)),_=i.box(3,1,2,v=>i.n(v==="top"?o:fn(o,.88),.06)),g=ue(zt(l,0,3,-.5),zt(h,0,3,-3),zt(u,0,1,-2)),p=ue(zt(f,0,0,0)),M=ue(zt(d,0,-2,0)),S=ue(zt(m,0,-2.5,0),zt(_,0,-4.5,-.5));return v=>{v.part(p,0,8,0);const E=v.part(g,0,9,-4),w=[v.part(M,3.5,11,0),v.part(M,-3.5,11,0)],b=[v.part(S,1.5,5,-.5),v.part(S,-1.5,5,-.5)],L=Math.random()*7;return x=>{Ts(E,x);const y=vc(x,1.2);b[0].rotation.x=y,b[1].rotation.x=-y;const R=(((x.time||0)+L)%7+7)%7,P=R<.8?Math.sin(R/.8*Math.PI):0,z=Math.max(P,Ao(x.walkAmount)*.35)*(.5+.5*Math.sin((x.time||0)*28))*1.1;w[0].rotation.z=z,w[1].rotation.z=-z}}}function Db(i){const t=N("#5c8e42"),e=N("#4a7535"),n=N("#3d6230"),s=N("#2e9b9b"),r=N("#247c7d"),o=N("#46409a"),a=N("#36307b"),c=N("#3d3d44"),l=wi(["hhhhhhhh","h......h","","",".kk..kk.","...nn...","..mmmm.."],{h:n,k:N("#141812"),n:N("#436b31"),m:N("#2e4a23")}),h=i.box(8,8,8,(M,S,v)=>M==="front"?l(S,v)??i.n(t,.08):M==="top"?i.n(n,.1):M==="bottom"?i.n(e,.08):M==="back"?i.n(v<3?n:e,.08):i.n(v<2||v===2&&i.rnd()<.5?n:t,.08)),u=i.box(8,12,4,(M,S,v)=>M==="front"&&v===0&&(S===3||S===4)?i.n(t,.06):i.n(i.rnd()<.1?r:s,.08)),f=i.box(4,12,4,(M,S,v)=>i.n(M==="bottom"||v===11?e:t,.08)),d=i.box(4,12,4,(M,S,v)=>i.n(M==="bottom"||v>=11?c:i.rnd()<.1?a:o,.08)),m=ue(zt(h,0,4,0)),_=ue(zt(u,0,0,0)),g=ue(zt(f,0,-4,0)),p=ue(zt(d,0,-6,0));return M=>{M.part(_,0,18,0);const S=M.part(m,0,24,0),v=[M.part(g,6,22,0),M.part(g,-6,22,0)],E=[M.part(p,1.9,12,0),M.part(p,-1.9,12,0)];return w=>{Ts(S,w);const b=vc(w);E[0].rotation.x=b,E[1].rotation.x=-b;const L=w.attackTime>=0&&w.attackTime<.3?w.attackTime/.3:0,x=Math.sin(L*Math.PI),y=Math.sin((1-(1-L)*(1-L))*Math.PI),[R,P]=x0(w.time||0),U=1.48-x*1.2+y*.4,z=.1-x*.6;v[0].rotation.set(U+R-b*.15,z,P),v[1].rotation.set(U-R+b*.15,-z,-P)}}}function Pb(i){const t=N("#c6c6c6"),e=N("#dedede"),n=N("#9a9a9a"),s=N("#7a5332"),r=wi(["","","",".kk..kk.",".kk..kk.","...nn...",".dldldl.","jjjjjjjj"],{k:N("#222222"),n:N("#4a4a4a"),d:N("#3a3a3a"),l:e,j:n}),o=i.box(8,8,8,(v,E,w)=>v==="front"&&r(E,w)||i.n(i.rnd()<.08?n:t,.07)),a=v=>v===0||v===2||v===4||v===6||v>=10,c=i.box(8,12,4,(v,E,w)=>v==="top"||v==="bottom"?i.n(t,.07):(v==="front"||v==="back")&&(E===3||E===4)||a(w)?i.n(w>=10?n:t,.07):null),l=i.box(2,12,2,(v,E,w)=>v==="bottom"||w===5||w===11?i.n(n,.06):i.n(E===0&&v!=="top"?e:t,.06)),h=i.box(1,5,1,(v,E,w)=>i.n(w===0||w===4?s:N("#4d3420"),.06)),u=i.box(1,3,1,()=>i.n(s,.08)),f=i.box(1,2,2,()=>i.n(N("#9c6c3e"),.06)),d=i.box(1,15,1,()=>i.n(N("#e6e6e6"),.04)),m=ue(zt(h,0,0,-.5),zt(u,0,4,.5),zt(u,0,-4,.5),zt(f,0,6.5,2),zt(f,0,-6.5,2),zt(d,0,0,3.2,-.3));m.rotateX(-Math.PI/2),m.translate(0,-10*xn,0);const _=ue(zt(o,0,4,0)),g=ue(zt(c,0,0,0)),p=ue(zt(l,0,-4,0)),M=ue(zt(l,0,-4,0),m),S=ue(zt(l,0,-6,0));return v=>{v.part(g,0,18,0);const E=v.part(_,0,24,0),w=[v.part(M,5,22,0),v.part(p,-5,22,0)],b=[v.part(S,2,12,0),v.part(S,-2,12,0)];return L=>{Ts(E,L);const x=vc(L);b[0].rotation.x=x,b[1].rotation.x=-x;const[y,R]=x0(L.time||0),P=L.attackTime>=0&&L.attackTime<.25?1-L.attackTime/.25:0,U=Math.PI/2+E.rotation.x;w[0].rotation.set(U+y+P*.25,.1+E.rotation.y,R),w[1].rotation.set(U-y,-.5+E.rotation.y,-R)}}}function Ib(i){const t=["#4b9a41","#5fae54","#7cc370","#367a2f","#245a20","#a6d69b","#c5cfc2","#3f8b37"].map(N),e=[24,20,13,16,8,8,5,6],n=()=>i.n(i.pick(t,e),.06),s=N("#0f0f0f"),r=N("#262626"),o=wi(["","",".##..##.",".##..##.","...##...","..####..","..####..","..#..#.."],{"#":s}),a=i.box(8,8,8,(d,m,_)=>d==="front"&&o(m,_)&&(i.rnd()<.2?r:s)||n()),c=i.box(8,12,4,n),l=i.box(4,6,4,d=>d==="bottom"?i.n(t[4],.1):n()),h=ue(zt(a,0,4,0)),u=ue(zt(c,0,0,0)),f=ue(zt(l,0,-3,0));return d=>{d.part(u,0,12,0);const m=d.part(h,0,18,0),_=Mc(d,f,2,6,-4,4);return g=>{Ts(m,g),xc(_,g)}}}const od=[2,1,0,-1],Nb=[Math.PI/4,Math.PI/8,-Math.PI/8,-Math.PI/4],ad=[-Math.PI/4,-.5812,-.5812,-Math.PI/4],cd=[0,Math.PI,Math.PI/2,Math.PI*1.5];function Ub(i){const t=N("#2d2621"),e=N("#1c1815"),n=N("#4b3d32"),s=N("#5e4736"),r={E:N("#d01b16"),H:N("#ff5a40"),e:N("#b01412")},o=wi(["","","...ee...",".HE..HE.","eEE..EEe"],r),a=wi(["","","","","","","..f..f..","..f..f.."],{f:N("#6b5a4a")}),c=wi(["","....mm....","...m..m...","..m.mm.m..","....mm....",".m..mm..m.","..m.mm.m..","....mm....","...m..m...","..m....m.."],{m:s}),l=()=>{const v=i.rnd();return i.n(v<.16?n:v<.4?e:t,.12)},h=i.box(8,8,8,(v,E,w)=>v==="front"&&(o(E,w)||a(E,w))||l()),u=i.box(6,6,6,l),f=i.box(10,8,12,(v,E,w)=>v==="top"&&c(E,w)&&i.n(s,.1)||l()),d=i.box(16,2,2,(v,E)=>i.n(E%5===4?n:i.rnd()<.3?e:t,.12)),m=i.rect(8,8,(v,E)=>o(v,E)??null),_=ue(zt(h,0,0,-4)),g=Sb(m,0,0,-8.05),p=ue(zt(u,0,0,0),zt(f,0,0,9)),M=ue(zt(d,7,0,0)),S=ue(zt(d,-7,0,0));return v=>{v.part(p,0,9,0);const E=v.part(_,0,9,-3);v.part(g,0,0,0,E,v.glow()).castShadow=!1;const w=od.map(L=>v.part(M,4,9,L)),b=od.map(L=>v.part(S,-4,9,L));return L=>{Ts(E,L);const x=Ao(L.walkAmount),y=(L.walkPhase||0)*v0,R=L.attackTime>=0&&L.attackTime<.4?Math.sin(L.attackTime/.4*Math.PI):0;E.rotation.x+=R*.35;for(let P=0;P<4;P++){const U=Nb[P]-Math.cos(y*2+cd[P])*.4*x,z=Math.abs(Math.sin(y+cd[P]))*.4*x+R*(P===3?1.1:P===2?.5:0);w[P].rotation.set(0,-U,ad[P]+z),b[P].rotation.set(0,U,-ad[P]-z)}}}}const b0={pig:{height:1,lift:5,build:Tb},cow:{height:1.5,lift:6,build:Rb},sheep:{height:1.4,lift:5,build:Cb},chicken:{height:.95,lift:3,build:Lb},zombie:{height:2,lift:4,build:Db},skeleton:{height:2,lift:4,cutout:!0,build:Pb},creeper:{height:1.65,lift:4,build:Ib},spider:{height:.85,lift:5,build:Ub}},ld=new Map;function Ob(i){let t=ld.get(i);if(!t){const e=new yb(Bo(_0(`mob:${i}`))),n=b0[i].build(e);t={map:bb(e.tile),rig:n},ld.set(i,t)}return t}const kb={walkPhase:0,walkAmount:0,headYaw:0,headPitch:0,attackTime:1/0,fuse:0,sheared:!1,hurt:!1,death:0,time:0};class Fb{constructor(t){C(this,"group",new Mn);C(this,"height");C(this,"root",new Mn);C(this,"kind");C(this,"rig");C(this,"animate");C(this,"swells");C(this,"flashPhase",0);this.kind=b0[t],this.height=this.kind.height,this.swells=t==="creeper";const e=Ob(t);this.group.name=`mob:${t}`,this.group.add(this.root),this.rig=new wb(this.root,e.map,this.kind.cutout===!0),this.animate=e.rig(this.rig),this.update(0,kb)}update(t,e){this.animate(e,t);const n=Ao(e.death),s=n>0?Math.min(1,Math.sqrt(n*1.6))*(Math.PI/2):0;this.root.rotation.z=s,this.root.position.y=Math.sin(s)*this.kind.lift*xn;let r=0;if(this.swells){const c=Ao(e.fuse),l=c*c,h=1+Math.sin(c*100)*c*.01,u=(1+l*.22)*h;if(this.root.scale.set(u,(1+l*.1)/h,u),c>0){const f=Number.isFinite(t)&&t>0?t:0;this.flashPhase=(this.flashPhase+f*(2+10*c))%1,this.flashPhase>=.5&&(r=.35+.4*c)}else this.flashPhase=0}const o=this.rig.skin;e.hurt||n>0?(o.color.setRGB(1.2,.5,.5),o.emissive.setRGB(.22,.01,.01)):r>0?(o.color.setScalar(1+r),o.emissive.setScalar(r)):(o.color.setScalar(1),o.emissive.setScalar(0));const a=n>.7?1-(n-.7)/.3:1;for(const c of this.rig.materials)c.opacity=a}dispose(){this.group.removeFromParent();for(const t of this.rig.materials)t.dispose()}}const hd=i=>Math.atan2(Math.sin(i),Math.cos(i));class Bb{constructor(t,e,n,s,r){C(this,"visuals",new Map);C(this,"time",0);this.scene=t,this.items=e,this.world=n,this.particles=s,this.lightFn=r}get count(){return this.visuals.size}get(t){return this.visuals.get(t)}spawn(t){var l,h;const e=this.visuals.get(t.id);if(e){t.item&&e.info.item&&(t.item.count!==e.info.item.count||t.item.id!==e.info.item.id)&&(e.info.item=t.item),e.target.set(...t.p);return}const n={value:new F(1,1,1)};let s,r,o,a,c;switch(t.kind){case"mob":{r=vb(t.type),s=r.group,Fr(s,n);break}case"item":{const u=((l=t.item)==null?void 0:l.id)??A.STONE;o=this.items.create(u);const f=new Mn,d=this.items.isFlat(u);o.object.scale.setScalar(d?.42:.26),o.object.position.y=d?.22:.16,f.add(o.object),(((h=t.item)==null?void 0:h.count)??1)>1&&(a=this.items.create(u),a.object.scale.copy(o.object.scale),a.object.position.set(.06,o.object.position.y+.04,.05),f.add(a.object)),s=f;break}case"tnt":case"falling":{const u=t.kind==="tnt"?A.TNT:t.state??A.SAND;o=this.items.create(Xt(u),u);const f=new Mn;o.object.position.y=.5,f.add(o.object),t.kind==="tnt"&&(c=new _e(new tn(1.01,1.01,1.01),new ko({color:"#ffffff",transparent:!0,opacity:0})),c.position.y=.5,f.add(c)),s=f;break}default:{const u=new Mn,f=new _e(new tn(.05,.05,.55),new Ei({color:"#8b6a3e"})),d=new _e(new tn(.07,.07,.08),new Ei({color:"#9a9a9a"}));d.position.z=-.3;const m=new _e(new tn(.12,.12,.12),new Ei({color:"#e8e8e8"}));m.position.z=.25,u.add(f,d,m),Fr(u,n),s=u}}s.position.set(...t.p),this.scene.add(s),this.visuals.set(t.id,{info:t,object:s,target:new F(...t.p),targetYaw:t.yaw,targetPitch:t.pitch??0,yaw:t.yaw,pitch:t.pitch??0,flags:t.flags??0,mob:r,item:o,extra:a,light:n,walkPhase:0,walkAmount:0,attackTime:1/0,fuse:0,fuseActive:!1,death:0,hurt:0,spawnTime:this.time,flash:c})}move(t){for(let e=0;e+6<t.length;e+=7){const n=this.visuals.get(t[e]);if(!n)continue;n.target.set(t[e+1],t[e+2],t[e+3]),n.targetYaw=t[e+4],n.targetPitch=t[e+5];const s=t[e+6];s&Hu&&!(n.flags&Hu)&&(n.hurt=.4),s&Vu&&!(n.flags&Vu)&&(n.attackTime=0),n.flags=s,n.info.kind==="tnt"&&(n.fuse=s/10)}}event(t,e,n){const s=this.visuals.get(t);s&&(e==="hurt"?s.hurt=.4:e==="death"?(s.hurt=.4,s.death=1e-4):e==="attack"?s.attackTime=0:e==="fuse"&&(s.fuseActive=n===1))}remove(t,e){for(const n of t){const s=this.visuals.get(n);if(s){if(e&&s.info.kind==="item"){s.pickup={to:e,t:0};continue}if(s.info.kind==="mob"&&s.death>0){const[r,o]=Vo[s.info.type]??[.6,1];this.particles.puff(s.object.position.x,s.object.position.y+o/2,s.object.position.z,14,r,[.8,.8,.8],1.5)}this.dispose(n,s)}}}dispose(t,e){var s,r,o;this.scene.remove(e.object),(s=e.mob)==null||s.dispose(),(r=e.item)==null||r.dispose(),(o=e.extra)==null||o.dispose();const n=new Set;e.item&&e.item.object.traverse(a=>n.add(a)),e.extra&&e.extra.object.traverse(a=>n.add(a)),e.object.traverse(a=>{const c=a;c.isMesh&&!e.mob&&!n.has(c)&&(c.geometry.dispose(),c.material.dispose())}),this.visuals.delete(t)}clear(){for(const[t,e]of this.visuals)this.dispose(t,e)}update(t){this.time+=t,new F;for(const[e,n]of this.visuals){const s=n.object.position;if(n.pickup){n.pickup.t+=t/.15,s.lerp(n.pickup.to(),Math.min(1,n.pickup.t)),n.pickup.t>=1&&this.dispose(e,n);continue}const r=s.x,o=s.z;s.distanceToSquared(n.target)>64?s.copy(n.target):s.lerp(n.target,1-Math.exp(-t*12)),n.yaw+=hd(n.targetYaw-n.yaw)*(1-Math.exp(-t*10)),n.pitch+=hd(n.targetPitch-n.pitch)*(1-Math.exp(-t*10));const a=this.world.getLight(Math.floor(s.x),Math.floor(s.y+.5),Math.floor(s.z));switch(this.lightFn(a,n.light.value),n.item&&(n.item.light.set((a>>4)/15,(a&15)/15),n.item.color.value.copy(n.light.value),n.extra&&(n.extra.light.copy(n.item.light),n.extra.color.value.copy(n.light.value))),n.info.kind){case"mob":{const c=Math.hypot(s.x-r,s.z-o);if(n.walkPhase+=c,n.walkAmount+=(Math.min(1,c/Math.max(t,.001)/3)-n.walkAmount)*Math.min(1,t*8),n.hurt=Math.max(0,n.hurt-t),n.attackTime+=t,n.death>0&&(n.death=Math.min(1,n.death+t)),n.fuseActive?n.fuse=Math.min(1,n.fuse+t/1.5):n.fuse=Math.max(0,n.fuse-t/1.5),n.object.rotation.y=n.yaw,n.mob.update(t,{walkPhase:n.walkPhase,walkAmount:n.walkAmount,headYaw:n.pitch,headPitch:0,attackTime:n.attackTime,fuse:n.fuse,sheared:(n.flags&Ym)!==0,hurt:n.hurt>0,death:n.death,time:this.time}),n.flags&Xm&&Math.random()<t*20){const[l,h]=Vo[n.info.type];this.particles.puff(s.x,s.y+Math.random()*h,s.z,1,l,[2.4,1.1,.3],.8)}break}case"item":{const c=this.time-n.spawnTime,l=n.object.children;for(const h of l)h.rotation.y=c*1.6;n.object.position.y=s.y+Math.sin(c*2.5)*.06,s.y=n.object.position.y,n.object.position.y=n.target.y+(s.y-n.target.y);break}case"tnt":{if(n.fuse=Math.max(0,n.fuse-t),n.flash){const c=Math.floor(n.fuse*(n.fuse<1?10:4))%2===0;n.flash.material.opacity=c?.55:0;const l=1+(n.fuse<.4?(.4-n.fuse)*.6:0);n.object.scale.setScalar(l)}Math.random()<t*30&&this.particles.puff(s.x,s.y+1.1,s.z,1,.1,[.5,.5,.5],.5);break}case"arrow":n.object.rotation.set(n.pitch,n.yaw,0,"YXZ");break}}}raycast(t,e,n){let s=null;for(const[r,o]of this.visuals){if(o.info.kind!=="mob"||o.death>0)continue;const[a,c]=Vo[o.info.type]??[.6,1.8],l=o.object.position,h=zb(t,e,l.x-a/2,l.y,l.z-a/2,l.x+a/2,l.y+c,l.z+a/2);h!==null&&h<=n&&(!s||h<s.dist)&&(s={id:r,dist:h})}return s}blocksCell(t,e,n){for(const s of this.visuals.values()){if(s.info.kind!=="mob"||s.death>0)continue;const[r,o]=Vo[s.info.type]??[.6,1.8],a=s.object.position;if(a.x+r/2>t&&a.x-r/2<t+1&&a.y+o>e&&a.y<e+1&&a.z+r/2>n&&a.z-r/2<n+1)return!0}return!1}isMob(t){const e=this.visuals.get(t);return(e==null?void 0:e.info.kind)==="mob"?e.info.type:null}static particleLayer(t){return ms(t)?Rn[t*384]:-1}}function zb(i,t,e,n,s,r,o,a){let c=0,l=1/0;const h=[e,n,s],u=[r,o,a],f=[i.x,i.y,i.z],d=[t.x,t.y,t.z];for(let m=0;m<3;m++){if(Math.abs(d[m])<1e-9){if(f[m]<h[m]||f[m]>u[m])return null;continue}let _=(h[m]-f[m])/d[m],g=(u[m]-f[m])/d[m];if(_>g&&([_,g]=[g,_]),c=Math.max(c,_),l=Math.min(l,g),c>l)return null}return c}const S0=()=>matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0;class Gb{constructor(t,e){C(this,"active",!1);C(this,"sensitivity",8);C(this,"invertY",!1);C(this,"keys",new Set);C(this,"lookX",0);C(this,"lookY",0);C(this,"lastSpace",0);C(this,"lastW",0);C(this,"sprintLatch",!1);C(this,"stick",{x:0,y:0});C(this,"touchJump",!1);C(this,"touchDown",!1);C(this,"touchSneak",!1);C(this,"onKeyDown",t=>{var e;if(((e=t.target)==null?void 0:e.tagName)!=="INPUT"&&this.active&&(["Space","Tab","F3","F5","Slash","ArrowUp","ArrowDown","KeyQ"].includes(t.code)&&t.preventDefault(),t.ctrlKey&&t.code==="KeyW"&&t.preventDefault(),!t.repeat)){if(this.keys.add(t.code),t.code==="Space"){const n=performance.now();n-this.lastSpace<300?(this.h.toggleFly(),this.lastSpace=0):this.lastSpace=n}if(t.code==="KeyW"){const n=performance.now();n-this.lastW<280&&(this.sprintLatch=!0),this.lastW=n}if(t.code.startsWith("Digit")){const n=Number(t.code.slice(5));n>=1&&n<=9&&this.h.hotbar(n-1)}switch(t.code){case"KeyT":case"Enter":t.preventDefault(),this.release(),this.h.chat("");break;case"Slash":this.release(),this.h.chat("/");break;case"KeyE":this.release(),this.h.inventory();break;case"KeyQ":this.h.drop(t.ctrlKey);break;case"Tab":this.h.playerList(!0);break;case"F3":this.h.debug();break;case"F5":this.h.toggleView();break}}});C(this,"onKeyUp",t=>{this.keys.delete(t.code),t.code==="Tab"&&this.h.playerList(!1)});C(this,"onMouseMove",t=>{!this.active||!this.pointerLocked||Math.abs(t.movementX)>400||Math.abs(t.movementY)>400||(this.lookX+=t.movementX,this.lookY+=t.movementY)});C(this,"onMouseDown",t=>{!this.active||!this.pointerLocked||(t.button===0?this.h.attackStart():t.button===2?this.h.useStart():t.button===1&&(t.preventDefault(),this.h.pick()))});C(this,"onMouseUp",t=>{t.button===0?this.h.attackEnd():t.button===2&&this.h.useEnd()});C(this,"onWheel",t=>{t.preventDefault(),this.active&&t.deltaY&&this.h.scroll(Math.sign(t.deltaY))});this.canvas=t,this.h=e,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",()=>{this.keys.clear(),this.h.attackEnd(),this.h.useEnd()}),document.addEventListener("mousemove",this.onMouseMove),t.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),t.addEventListener("wheel",this.onWheel,{passive:!1}),t.addEventListener("contextmenu",n=>n.preventDefault())}get pointerLocked(){return document.pointerLockElement===this.canvas}release(){this.keys.clear(),this.stick={x:0,y:0},this.touchJump=this.touchDown=!1,this.sprintLatch=!1}moveInput(){if(!this.active)return{forward:0,strafe:0,jump:!1,sneak:this.touchSneak,sprint:!1};const t=this.keys;let e=(t.has("KeyW")||t.has("ArrowUp")?1:0)-(t.has("KeyS")||t.has("ArrowDown")?1:0),n=(t.has("KeyD")||t.has("ArrowRight")?1:0)-(t.has("KeyA")||t.has("ArrowLeft")?1:0);(this.stick.x||this.stick.y)&&(e=-this.stick.y,n=this.stick.x),e<=0&&(this.sprintLatch=!1);const s=Math.hypot(this.stick.x,this.stick.y)>.97&&-this.stick.y>.8;return{forward:e,strafe:n,jump:t.has("Space")||this.touchJump,sneak:t.has("ShiftLeft")||t.has("ShiftRight")||this.touchDown||this.touchSneak,sprint:t.has("ControlLeft")||t.has("KeyR")||this.sprintLatch||s}}consumeLook(){const t=this.sensitivity*25e-5,e=[this.lookX*t,this.lookY*t*(this.invertY?-1:1)];return this.lookX=this.lookY=0,e}setupTouch(t){t.hidden=!1;const e=t.querySelector("#joystick"),n=t.querySelector("#joystick-knob");let s=null,r=null,o={x:0,y:0,t:0},a={x:0,y:0},c=0,l=!1,h=!1;const u=m=>{const _=e.getBoundingClientRect(),g=_.width/2;let p=(m.clientX-(_.left+g))/g,M=(m.clientY-(_.top+g))/g;const S=Math.hypot(p,M);S>1&&(p/=S,M/=S),this.stick={x:p,y:M},n.style.transform=`translate(${p*g*.6}px, ${M*g*.6}px)`};e.addEventListener("touchstart",m=>{m.preventDefault();const _=m.changedTouches[0];s=_.identifier,u(_)}),this.canvas.addEventListener("touchstart",m=>{if(m.preventDefault(),r!==null||!this.active)return;const _=m.changedTouches[0];r=_.identifier,o={x:_.clientX,y:_.clientY,t:performance.now()},a={x:_.clientX,y:_.clientY},h=!1,l=!1,clearTimeout(c),c=window.setTimeout(()=>{r!==null&&!h&&(l=!0,this.h.attackStart())},280)}),window.addEventListener("touchmove",m=>{for(const _ of Array.from(m.changedTouches))_.identifier===s?u(_):_.identifier===r&&this.active&&(this.lookX+=(_.clientX-a.x)*2.2,this.lookY+=(_.clientY-a.y)*2.2,a={x:_.clientX,y:_.clientY},Math.hypot(_.clientX-o.x,_.clientY-o.y)>14&&(h=!0))},{passive:!0});const f=m=>{for(const _ of Array.from(m.changedTouches))_.identifier===s&&(s=null,this.stick={x:0,y:0},n.style.transform=""),_.identifier===r&&(r=null,clearTimeout(c),l?this.h.attackEnd():!h&&performance.now()-o.t<280&&this.active&&(this.h.useStart(),this.h.useEnd()),l=!1)};window.addEventListener("touchend",f),window.addEventListener("touchcancel",f);const d=(m,_,g=()=>{})=>{const p=t.querySelector(m);if(!p)return;p.addEventListener("touchstart",S=>{S.preventDefault(),S.stopPropagation(),p.classList.add("pressed"),_()});const M=S=>{S.preventDefault(),p.classList.remove("pressed"),g()};p.addEventListener("touchend",M),p.addEventListener("touchcancel",M)};d("#btn-jump",()=>this.touchJump=!0,()=>this.touchJump=!1),d("#btn-down",()=>this.touchDown=!0,()=>this.touchDown=!1),d("#btn-sneak",()=>{var m;this.touchSneak=!this.touchSneak,(m=t.querySelector("#btn-sneak"))==null||m.classList.toggle("active",this.touchSneak)}),d("#btn-fly",()=>this.h.toggleFly()),d("#btn-attack",()=>this.h.attackStart(),()=>this.h.attackEnd()),d("#btn-use",()=>this.h.useStart(),()=>this.h.useEnd()),d("#btn-chat",()=>this.h.chat("")),d("#btn-inventory",()=>this.h.inventory()),d("#btn-drop",()=>this.h.drop(!1)),d("#btn-pause",()=>this.h.pause())}}class Hb{constructor(){C(this,"slots",Ar(Tr));C(this,"armor",Ar(cl));C(this,"selected",0);C(this,"onChange",()=>{});C(this,"onOverflow")}load(t,e,n){this.slots=jf(t,Tr),this.armor=jf(e,cl),this.selected=Math.max(0,Math.min(Fi-1,n|0)),this.changed()}changed(){this.onChange()}get held(){return this.slots[this.selected]}set held(t){this.slots[this.selected]=t&&t.count>0?t:null,this.changed()}select(t){this.selected=(t%Fi+Fi)%Fi,this.changed()}add(t){const e=ui(this.slots,t);return this.changed(),e}consumeHeld(t=1){const e=this.held;e&&(e.count-=t,this.held=e.count>0?e:null)}damageHeld(t=1){var s;const e=this.held;if(!e||!((s=pe(e.id))!=null&&s.durability))return!1;const n=Zf(e,t);return this.held=n,n===null}replaceHeld(t){var n;const e=this.held;e&&e.count>1?(e.count--,ui(this.slots,t)>0&&((n=this.onOverflow)==null||n.call(this,t)),this.changed()):this.held=t}armorPoints(){return this.armor.reduce((t,e)=>{var n,s;return t+(e?((s=(n=pe(e.id))==null?void 0:n.armor)==null?void 0:s.points)??0:0)},0)}damageArmor(t){const e=Math.max(1,Math.floor(t/4));let n=!1;this.armor=this.armor.map(s=>s&&(n=!0,Zf(s,e))),n&&this.changed()}takeAll(){const t=[...this.slots,...this.armor].filter(e=>!!e).map(e=>({...e}));return this.slots=Ar(Tr),this.armor=Ar(cl),this.changed(),t}count(t){return this.slots.reduce((e,n)=>e+(n&&n.id===t?n.count:0),0)}takeOne(t){for(let e=Tr-1;e>=0;e--){const n=this.slots[e];if(n&&n.id===t)return n.count--,n.count<=0&&(this.slots[e]=null),this.changed(),!0}return!1}}function Aa(i,t,e,n,s){const r=i[t];if(!e){if(!r)return null;if(n){const o=Math.ceil(r.count/2),a=r.count-o;return i[t]=a>0?{...r,count:a}:null,{...r,count:o}}return i[t]=null,r}if(s&&!s(e))return e;if(!r)return n?(i[t]={...e,count:1},e.count>1?{...e,count:e.count-1}:null):(i[t]=e,null);if(i0(r,e)){const o=hs(r.id),a=Math.min(n?1:e.count,o-r.count);return a<=0?e:(i[t]={...r,count:r.count+a},e.count-a>0?{...e,count:e.count-a}:null)}return i[t]=e,r}const Vb={planks:[A.OAK_PLANKS,A.BIRCH_PLANKS,A.SPRUCE_PLANKS],log:[A.OAK_LOG,A.BIRCH_LOG,A.SPRUCE_LOG],coal:[j.COAL,j.CHARCOAL],wool:[A.WHITE_WOOL,A.RED_WOOL,A.PINK_WOOL,A.YELLOW_WOOL,A.GREEN_WOOL,A.BLUE_WOOL,A.PURPLE_WOOL,A.BLACK_WOOL]},sc=(i,t)=>typeof i=="number"?i===t:Vb[i].includes(t),Wb=sc,Ro=[],ne=(i,t,e,n=1)=>Ro.push({kind:"shaped",pattern:i,keys:t,result:Fe(e,n)}),oi=(i,t,e=1)=>Ro.push({kind:"shapeless",ingredients:i,result:Fe(t,e)});oi([A.OAK_LOG],A.OAK_PLANKS,4);oi([A.BIRCH_LOG],A.BIRCH_PLANKS,4);oi([A.SPRUCE_LOG],A.SPRUCE_PLANKS,4);ne(["#","#"],{"#":"planks"},j.STICK,4);ne(["##","##"],{"#":"planks"},A.CRAFTING_TABLE);ne(["C","S"],{C:"coal",S:j.STICK},A.TORCH,4);ne(["###","# #","###"],{"#":"planks"},A.CHEST);ne(["###","# #","###"],{"#":A.COBBLESTONE},A.FURNACE);ne(["S S","SSS","S S"],{S:j.STICK},A.LADDER,3);ne(["##","##","##"],{"#":"planks"},j.OAK_DOOR,3);ne(["#S#","#S#"],{"#":"planks",S:j.STICK},A.OAK_FENCE,3);ne(["###"],{"#":"planks"},A.OAK_SLAB,6);ne(["###"],{"#":A.COBBLESTONE},A.COBBLESTONE_SLAB,6);ne(["###"],{"#":A.STONE},A.STONE_SLAB,6);ne(["#  ","## ","###"],{"#":"planks"},A.OAK_STAIRS,4);ne(["#  ","## ","###"],{"#":A.COBBLESTONE},A.COBBLESTONE_STAIRS,4);ne(["#  ","## ","###"],{"#":A.STONE_BRICKS},A.STONE_BRICK_STAIRS,4);ne(["WWW","###"],{W:"wool","#":"planks"},j.BED);ne(["###","###"],{"#":"planks"},A.OAK_TRAPDOOR,2);ne(["S#S","S#S"],{"#":"planks",S:j.STICK},A.OAK_FENCE_GATE);ne(["###","BBB","###"],{"#":"planks",B:j.BOOK},A.BOOKSHELF);ne(["###","###"],{"#":A.GLASS},A.GLASS_PANE,16);ne(["P","T"],{P:A.PUMPKIN,T:A.TORCH},A.JACK_O_LANTERN);ne(["###"],{"#":A.SUGAR_CANE},j.PAPER,3);oi([j.PAPER,j.PAPER,j.PAPER,j.LEATHER],j.BOOK);ne(["##","##"],{"#":A.SAND},A.SANDSTONE);ne(["##","##"],{"#":A.STONE},A.STONE_BRICKS,4);ne(["##","##"],{"#":j.STRING},A.WHITE_WOOL);ne(["GSG","SGS","GSG"],{G:j.GUNPOWDER,S:A.SAND},A.TNT);ne(["I I"," I "],{I:j.IRON_INGOT},j.BUCKET);ne([" I","I "],{I:j.IRON_INGOT},j.SHEARS);oi([j.IRON_INGOT,j.FLINT],j.FLINT_AND_STEEL);ne([" #S","# S"," #S"],{"#":j.STICK,S:j.STRING},j.BOW);ne(["F","#","E"],{F:j.FLINT,"#":j.STICK,E:j.FEATHER},j.ARROW,4);ne(["WWW"],{W:j.WHEAT},j.BREAD);oi([j.BONE],j.BONE_MEAL,3);oi([A.POPPY],j.RED_DYE);oi([A.DANDELION],j.YELLOW_DYE);oi([A.WHITE_WOOL,j.RED_DYE],A.RED_WOOL);oi([A.WHITE_WOOL,j.YELLOW_DYE],A.YELLOW_WOOL);oi([A.WHITE_WOOL,j.RED_DYE,j.BONE_MEAL],A.PINK_WOOL);for(const[i,t]of[[j.IRON_INGOT,A.IRON_BLOCK],[j.GOLD_INGOT,A.GOLD_BLOCK],[j.DIAMOND,A.DIAMOND_BLOCK]])ne(["###","###","###"],{"#":i},t),oi([t],i,9);const Xb=["planks",A.COBBLESTONE,j.IRON_INGOT,j.GOLD_INGOT,j.DIAMOND];xp.forEach((i,t)=>{const e=Xb[t],n=300+t*5;ne(["XXX"," # "," # "],{X:e,"#":j.STICK},n),ne(["XX","X#"," #"],{X:e,"#":j.STICK},n+1),ne(["X","#","#"],{X:e,"#":j.STICK},n+2),ne(["X","X","#"],{X:e,"#":j.STICK},n+3),ne(["XX"," #"," #"],{X:e,"#":j.STICK},n+4)});const Yb=[j.LEATHER,j.IRON_INGOT,j.GOLD_INGOT,j.DIAMOND];Yb.forEach((i,t)=>{const e=330+t*4;ne(["XXX","X X"],{X:i},e),ne(["X X","XXX","XXX"],{X:i},e+1),ne(["XXX","X X","X X"],{X:i},e+2),ne(["X X","X X"],{X:i},e+3)});function Kb(i,t){const e=i.length/t;let n=t,s=e,r=-1,o=-1;const a=[];for(let h=0;h<e;h++)for(let u=0;u<t;u++){const f=i[h*t+u];f&&(a.push(f.id),n=Math.min(n,u),r=Math.max(r,u),s=Math.min(s,h),o=Math.max(o,h))}if(!a.length)return null;const c=r-n+1,l=o-s+1;for(const h of Ro){if(h.kind==="shapeless"){if(h.ingredients.length!==a.length)continue;const f=[...a];if(h.ingredients.every(m=>{const _=f.findIndex(g=>sc(m,g));return _<0?!1:(f.splice(_,1),!0)}))return h;continue}if(!(Math.max(...h.pattern.map(f=>f.length))!==c||h.pattern.length!==l))for(const f of[!1,!0]){let d=!0;for(let m=0;m<l&&d;m++)for(let _=0;_<c&&d;_++){const g=h.pattern[m][f?c-1-_:_]??" ",p=i[(s+m)*t+n+_];g===" "?d=!p:d=!!p&&sc(h.keys[g],p.id)}if(d)return h}}return null}function vl(i,t){const e=new Array(t*t).fill(null);return i.kind==="shapeless"?i.ingredients.length>e.length?null:(i.ingredients.forEach((s,r)=>e[r]=s),e):Math.max(...i.pattern.map(s=>s.length))>t||i.pattern.length>t?null:(i.pattern.forEach((s,r)=>{for(let o=0;o<s.length;o++)s[o]!==" "&&(e[r*t+o]=i.keys[s[o]])}),e)}function qb(i){if(i.kind==="shapeless")return[...i.ingredients];const t=[];for(const e of i.pattern)for(const n of e)n!==" "&&t.push(i.keys[n]);return t}function ud(i,t){const e=t.filter(n=>!!n).map(n=>({id:n.id,count:n.count}));for(const n of qb(i)){const s=e.find(r=>r.count>0&&sc(n,r.id));if(!s)return!1;s.count--}return!0}const $b={[A.IRON_ORE]:Fe(j.IRON_INGOT),[A.GOLD_ORE]:Fe(j.GOLD_INGOT),[A.DIAMOND_ORE]:Fe(j.DIAMOND),[A.COAL_ORE]:Fe(j.COAL),[A.SAND]:Fe(A.GLASS),[A.COBBLESTONE]:Fe(A.STONE),[A.OAK_LOG]:Fe(j.CHARCOAL),[A.BIRCH_LOG]:Fe(j.CHARCOAL),[A.SPRUCE_LOG]:Fe(j.CHARCOAL),[j.PORKCHOP]:Fe(j.COOKED_PORKCHOP),[j.BEEF]:Fe(j.STEAK),[j.CHICKEN]:Fe(j.COOKED_CHICKEN),[j.MUTTON]:Fe(j.COOKED_MUTTON)},jb=i=>{var t;return((t=pe(i))==null?void 0:t.fuel)??0},O=16,qs=[255,255,255],rc=[0,0,0],pt=(...i)=>i.map(N);function Tt(i,t){const e=Math.round(t);return i[e<0?0:e>=i.length?i.length-1:e]}function xu(i,t,e){if(!e)return i[Math.min(i.length-1,Math.max(0,Math.floor(t*i.length)))];let n=0;for(const r of e)n+=r;let s=0;for(let r=0;r<i.length;r++)if(s+=e[r]/n,t<s)return i[r];return i[i.length-1]}const Re=(i,t)=>t[Math.floor(i()*t.length)],Be=(i,t,e)=>fn(i,1+(t()-.5)*e),Mu=(i,t)=>(t%O+O)%O*O+(i%O+O)%O,oc=(i,t)=>{const e=Math.abs(i-t)%O;return Math.min(e,O-e)},fd=i=>i*i*(3-2*i);function we(i,t,e=t){const n=Array.from({length:t*e},()=>i()),s=(r,o)=>n[(o%e+e)%e*t+(r%t+t)%t];return(r,o)=>{const a=(r+.5)/O*t-.5,c=(o+.5)/O*e-.5,l=Math.floor(a),h=Math.floor(c),u=fd(a-l),f=fd(c-h),d=s(l,h)+(s(l+1,h)-s(l,h))*u,m=s(l,h+1)+(s(l+1,h+1)-s(l,h+1))*u;return d+(m-d)*f}}function on(i){const t=new Float32Array(O*O);for(let s=0;s<O;s++)for(let r=0;r<O;r++)t[s*O+r]=i(r,s);const e=Array.from({length:O*O},(s,r)=>r).sort((s,r)=>t[s]-t[r]),n=new Float32Array(O*O);return e.forEach((s,r)=>n[s]=(r+.5)/(O*O)),n}function Un(i,t,e,n){for(let s=0;s<O;s++)for(let r=0;r<O;r++)i.set(r,s,xu(t,e[s*O+r],n))}function yc(i,t,e,n=.85,s=.3){const r=[];for(let a=0;a<e;a++)for(let c=0;c<t;c++)r.push([(c+.5+(i()-.5)*n)*O/t,(a+.5+(i()-.5)*n)*O/e,1+(i()-.5)*s]);const o=new Int16Array(O*O);for(let a=0;a<O;a++)for(let c=0;c<O;c++){let l=1/0;r.forEach(([h,u,f],d)=>{const m=Math.hypot(oc(c+.5,h),oc(a+.5,u))/f;m<l&&(l=m,o[a*O+c]=d)})}return{count:r.length,at:(a,c)=>o[Mu(a,c)]}}function ii(i,t,e,n,s=0,r=0){e.forEach((o,a)=>{for(let c=0;c<o.length;c++){const l=n[o[c]];l&&i.set(s+c,r+a,Array.isArray(l[0])?Re(t,l):l)}})}function E0(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function fs(i,t,e,n,s,r,o,a){for(let c=s;c<=o;c++){let l=n;for(;l<=r;){const h=2+Math.floor(t()*5),u=(t()-.5)*1.6;for(let f=0;f<h&&l<=r;f++,l++)i.set(l,c,Tt(e,a+u+(t()<.07?-1:0)))}}}function w0(i,t,e){for(let n=0;n<O;n++)i.set(n,0,Re(t,e)),i.set(n,O-1,Re(t,e)),i.set(0,n,Re(t,e)),i.set(O-1,n,Re(t,e))}const Zb=pt("#5b3d27","#69472e","#775236","#845d3f","#916848","#a07553"),T0=pt("#3c7322","#468229","#509030","#5a9d37","#65a93f","#73b649"),A0=pt("#d6e1e8","#e1eaef","#eaf1f5","#f3f8fa","#fbfdfe");function xl(i,t){const e=we(t,8);Un(i,Zb,on((n,s)=>e(n,s)*.45+t()*.7),[1,2,3,3,2,1]);for(let n=0;n<8;n++)i.set(t()*O,t()*O,t()<.5?N("#ad855b"):N("#47301f"))}function Jb(i,t){const e=we(t,8);Un(i,T0,on((n,s)=>e(n,s)*.35+t()*.8),[1,2,3,3,2,1.2])}function dd(i,t,e,n,s){for(let r=0;r<O;r++){let o=s+(t()<.5?1:0);t()<.22&&(o+=1+Math.floor(t()*2));for(let a=0;a<o;a++)i.set(r,a,Tt(e,1+t()*(e.length-1.5)-(a===o-1?1:0)));i.set(r,o-1,t()<.6?n:e[0]),i.set(r,o,fn(i.get(r,o),.72))}}function Qb(i,t){const e=pt("#24160a","#2f1d0e","#3a2614","#45301a","#513a21","#5e4428","#6c4f31"),n=we(t,8);Un(i,e.slice(2),on((r,o)=>n(r,o)*.45+t()*.8),[1,2,3,2,1]);const s=we(t,4,1);for(let r=0;r<4;r++)for(let o=0;o<O;o++){if(t()<.15)continue;const a=r*4+3+(s(o,0)>.55?1:0);i.set(o,a,Tt(e,t()*1.6)),t()<.5&&i.set(o,a-1,Tt(e,2+t()))}for(let r=0;r<9;r++)i.set(t()*O,t()*O,t()<.5?e[6]:N("#7a5a3c"))}const Ml=pt("#5e5e5e","#686868","#717171","#7a7a7a","#838383","#8d8d8d","#979797");function R0(i,t){const e=we(t,4),n=we(t,8);Un(i,Ml,on((s,r)=>e(s,r)*.15+n(s,r)*.4+t()*.5),[1,2,3,4,3,2,1]);for(let s=0;s<8;s++){const r=Math.floor(t()*O),o=Math.floor(t()*O),a=2+Math.floor(t()*3),c=t()<.6?Ml[1]:Ml[5];for(let l=0;l<a;l++)i.set(r+l,o,c)}}const pd=[[[0,0],[1,0],[0,1],[1,1],[2,1]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[1,0],[1,1],[2,1],[2,2],[1,2]],[[1,0],[2,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[1,0],[0,1],[1,1],[2,1],[1,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[3,1],[1,2],[2,2]]];function Ra(i,t,e,n=6){R0(i,t);const s=[];for(let r=0;s.length<n&&r<400;r++){const o=Math.floor(t()*O),a=Math.floor(t()*O);if(s.some(([h,u])=>Math.max(oc(h,o),oc(u,a))<5))continue;s.push([o,a]);const c=pd[Math.floor(t()*pd.length)],l=(h,u)=>c.some(([f,d])=>f===h&&d===u);for(const[h,u]of c)l(h+1,u)||i.set(o+h+1,a+u,fn(i.get(o+h+1,a+u),.8)),l(h,u+1)||i.set(o+h,a+u+1,fn(i.get(o+h,a+u+1),.8));for(const[h,u]of c){const f=!l(h,u-1)||!l(h-1,u),d=!l(h,u+1)||!l(h+1,u),m=f&&!d?e[2]:d&&!f?e[0]:e[1];i.set(o+h,a+u,Be(m,t,.08))}}}const tS=pt("#4a4a4a","#585858","#666666","#757575","#848484","#939393","#a3a3a3"),eS=pt("#303030","#383838","#404040");function C0(i,t){const e=yc(t,3,3,.9,.35),n=Array.from({length:e.count},()=>t()),s=new Uint8Array(O*O);for(let o=0;o<O;o++)for(let a=0;a<O;a++){const c=e.at(a,o);(e.at(a+1,o)!==c||e.at(a,o+1)!==c)&&(s[o*O+a]=1)}const r=(o,a)=>s[Mu(o,a)]===1;for(let o=0;o<O;o++)for(let a=0;a<O;a++){if(r(a,o)){i.set(a,o,Re(t,eS));continue}let c=1.4+n[e.at(a,o)]*2.8+(t()-.5)*1.4;(r(a-1,o)||r(a,o-1))&&(c+=1.4),(r(a+1,o)||r(a,o+1))&&(c-=1.2),i.set(a,o,Tt(tS,c))}}function nS(i,t){const e=pt("#2f4a1c","#3a5b23","#466c2a","#537d32","#618e3b","#6f9d45");C0(i,t);const n=we(t,4),s=on((r,o)=>n(r,o)+t()*.35);for(let r=0;r<O;r++)for(let o=0;o<O;o++){if(s[r*O+o]<.6)continue;const[a,c,l]=i.get(o,r);i.set(o,r,Tt(e,((a+c+l)/3-50)/21))}}function iS(i,t){const e=pt("#5c5c5c","#676767","#727272","#7c7c7c","#868686","#919191","#9c9c9c"),n=we(t,8),s=on((r,o)=>n(r,o)*.5+t()*.6);for(let r=0;r<O;r++)for(let o=0;o<O;o++){const a=r<8?0:1,c=(o+(a?8:0))%O,l=r%8;if(l===7||c===15){i.set(o,r,Be(N("#454545"),t,.12));continue}let h=1.6+s[r*O+o]*2.8;l===0||c===0?h+=1.5:(l===6||c===14)&&(h-=1.3),i.set(o,r,Tt(e,h))}for(let r=0;r<2;r++){let o=2+Math.floor(t()*11),a=1+Math.floor(t()*4)+(r?8:0);for(let c=0;c<3;c++)i.set(o,a,N("#555555")),o+=t()<.5?1:0,a+=1}}function md(i,t){const e=pt("#999999","#a0a0a0","#a6a6a6","#acacac","#b2b2b2"),n=we(t,8);Un(i,e,on((s,r)=>n(s,r)*.3+t()),[1,2,3,2,1])}const sS=pt("#151515","#252525","#353535","#464646","#575757","#6a6a6a","#808080");function rS(i,t){const e=we(t,4),n=we(t,8);Un(i,sS,on((s,r)=>e(s,r)*.5+n(s,r)*.5+t()*.45),[2,2,2,2,2,1.5,1])}function oS(i,t){const e=pt("#0b0814","#120d1d","#1a1428","#231b35","#2e2444","#3c2f59","#54427c"),n=we(t,4),s=we(t,8);Un(i,e,on((r,o)=>n(r,o)*.45+s(r,o)*.35+t()*.3),[3,3,3,2,1.6,1,.5]);for(let r=0;r<4;r++){const o=Math.floor(t()*O),a=Math.floor(t()*O);i.set(o,a,N("#6b56a0")),i.set(o+1,a+1,N("#3c2f59"))}}const aS=pt("#cbbf8b","#d4c995","#dbd19f","#e2d9a9","#e9e1b4"),yu=pt("#bcae76","#c6b880","#d0c28a","#d8cb94","#dfd39e","#e7ddab");function cS(i,t){const e=we(t,8);Un(i,aS,on((n,s)=>e(n,s)*.3+t()),[1,2,3,2,1]);for(let n=0;n<10;n++)i.set(t()*O,t()*O,t()<.6?N("#b8aa76"):N("#f2ecca"))}function lS(i,t){const e=pt("#4f4a48","#5e5855","#6d6763","#7c7672","#8b8581","#9b9591","#aba5a1"),n=pt("#54473f","#63554c","#72635a","#827268","#918176","#a09084","#ae9f93"),s=yc(t,5,5,.95,.5),r=Array.from({length:s.count},()=>2+t()*3.5),o=Array.from({length:s.count},()=>t()<.28);for(let a=0;a<O;a++)for(let c=0;c<O;c++){const l=s.at(c,a),h=s.at(c+1,a)!==l||s.at(c,a+1)!==l,u=s.at(c-1,a)!==l||s.at(c,a-1)!==l,f=r[l]+(t()-.5)*.9+(u?1:0)-(h?2.2:0);i.set(c,a,Tt(o[l]?n:e,f))}}function hS(i,t){const e=we(t,2,8),n=on((s,r)=>e(s,r)*.6+t()*.5);for(let s=0;s<O;s++)for(let r=0;r<O;r++){let o=1.6+n[s*O+r]*2.6;s<=1&&(o+=1.4),(s===2||s===13)&&(o-=.7),(s===3||s===12)&&(o=.2+t()*.6),s===15&&(o-=1.4),i.set(r,s,Tt(yu,o))}}function uS(i,t){const e=we(t,8);Un(i,yu.slice(2),on((n,s)=>e(n,s)*.3+t()),[1,3,3,1])}function fS(i,t){const e=we(t,4);Un(i,yu.slice(0,5),on((n,s)=>e(n,s)*.5+t()*.8),[1,2,3,3,2]);for(let n=0;n<5;n++){let s=Math.floor(t()*O),r=Math.floor(t()*O);for(let o=0;o<3;o++)i.set(s,r,N("#a99a63")),s+=t()<.5?1:-1,r+=t()<.5?1:0}}function dS(i,t){const e=we(t,8);Un(i,A0,on((n,s)=>e(n,s)*.4+t()*.8),[1,2,3,4,3])}function pS(i,t){const e=pt("#729ce8","#7fa7ec","#8db2f0","#9cbdf4","#aecaf7"),n=we(t,4),s=on((r,o)=>n(r,o)*.55+t()*.6);for(let r=0;r<O;r++)for(let o=0;o<O;o++){const a=s[r*O+o];i.set(o,r,xu(e,a),Math.round(190+a*14))}for(let r=0;r<4;r++){let o=Math.floor(t()*O),a=Math.floor(t()*O);const c=3+Math.floor(t()*4);for(let l=0;l<c;l++)i.set(o,a,N("#d6e6fd"),208),o+=1,a-=t()<.7?1:0}}const Zn={ramp:pt("#7d5f36","#8c6b3e","#9b7847","#a98551","#b6915b","#c29d65"),gap:N("#5c4426")},mS={ramp:pt("#a5925c","#b3a068","#c0ad74","#cab87f","#d4c389","#ddcd94"),gap:N("#86744a")},gS={ramp:pt("#47321e","#523a23","#5d4228","#684b2d","#735333","#7e5c39"),gap:N("#2f2116")},gd={ramp:pt("#6a4217","#784b1b","#875520","#955f26","#a2692c","#ae7434"),gap:N("#432a0f")};function Ga(i,t,e){const n=(e.ramp.length-1)/2;let s=Math.floor(t()*O);for(let r=0;r<4;r++){const o=r*4,a=n+(t()-.5)*1.1;fs(i,t,e.ramp,0,o,O-1,o,a+.7),fs(i,t,e.ramp,0,o+1,O-1,o+1,a),fs(i,t,e.ramp,0,o+2,O-1,o+2,a-.7);for(let c=0;c<O;c++)i.set(c,o+3,Be(e.gap,t,.12));for(let c=0;c<3;c++)i.set(s,o+c,bn(e.gap,e.ramp[1],.45));s=(s+5+Math.floor(t()*7))%O}}function _d(i,t,e){const n=e.length,s=[];for(;s.length<O;){const r=2+Math.floor(t()*2),o=n-2+(t()-.5)*1.4;for(let a=0;a<r;a++)s.push(o-(a===0?-.3:a===r-1?1.3:.3));s.push(.3+t()*.9)}for(let r=0;r<O;r++){let o=0;for(let a=0;a<O;a++)t()<.2&&(o=(t()-.5)*2),i.set(r,a,Tt(e,s[r]+o))}for(let r=0;r<5;r++){const o=Math.floor(t()*O),a=Math.floor(t()*O);i.set(o,a,e[0]),i.set(o,a+1,e[1])}}function yl(i,t,e,n){for(let s=0;s<O;s++)for(let r=0;r<O;r++){if(r===0||s===0||r===O-1||s===O-1){i.set(r,s,Tt(n,1+t()*2.5));continue}const o=Math.abs(r-7.5),a=Math.abs(s-7.5),c=.45*Math.max(o,a)+.55*Math.hypot(o,a)+(t()-.5)*.3;let l;Math.max(o,a)>6?l=bn(e[0],n[n.length-1],.35):c<1.2?l=e[0]:l=c%2.2<.85?e[0]:c%2.2<1.5?e[1]:e[2],i.set(r,s,Be(l,t,.06))}}function _S(i,t){const e=pt("#b4b1a8","#c3c0b7","#d1cfc6","#dddbd3","#e8e6df"),n=pt("#1f1f1f","#2c2c2c","#3a3a3a"),s=we(t,2,8);Un(i,e,on((r,o)=>s(r,o)*.5+t()*.6),[1,2,3,3,2]);for(let r=0;r<9;r++){const o=Math.floor(t()*O),a=Math.floor(t()*O),c=2+Math.floor(t()*4);for(let l=0;l<c;l++)i.set(o+l,a,Re(t,n));if(c>3&&t()<.5)for(let l=1;l<c-1;l++)i.set(o+l,a+1,Re(t,n))}}const vd=pt("#382916","#45331c","#523d23","#5f472a","#6c5131","#7a5d39"),xd=pt("#21160b","#2a1d0f","#342413","#3e2c18","#48331d","#533c23"),vS=pt("#9d9a91","#c3c0b7","#d1cfc6","#e2e0d8");function bl(i,t,e,n=.18){const s=yc(t,6,6,.9,.4),r=Array.from({length:s.count},()=>1.5+t()*(e.length-2.5)),o=new Float32Array(O*O);for(let h=0;h<O;h++)for(let u=0;u<O;u++){const f=s.at(u,h),d=s.at(u+1,h)!==f||s.at(u,h+1)!==f,m=s.at(u-1,h)!==f||s.at(u,h-1)!==f;i.set(u,h,Tt(e,r[f]+(t()-.5)*1.2+(m?1:0)-(d?1.3:0))),o[h*O+u]=(d?.3:0)+t()}const a=Array.from({length:O*O},(h,u)=>u).sort((h,u)=>o[u]-o[h]),c=Math.round(O*O*n),l=new Uint8Array(O*O);for(let h=0;h<c;h++)l[a[h]]=1;for(let h=0;h<O;h++)for(let u=0;u<O;u++)l[h*O+u]?i.alpha(u,h,0):l[Mu(u,h-1)]&&i.set(u,h,fn(i.get(u,h),.78))}const Co=pt("#2c6a1b","#367d21","#418f28","#4ca030","#5ab03b","#69bd47");function xS(i,t){for(let e=0;e<20;e++){let n=1+Math.floor(t()*14);const s=3+Math.floor(t()*12),r=t()<.5?-1:1,o=.3+t()*.4,a=1+t()*3;for(let c=0;c<s&&(c>s*o&&t()<.35&&(n+=r),!(n<0||n>=O));c++)i.set(n,O-1-c,Tt(Co,a+c/s*1.6-.9))}}const L0=[".......g........",".......g........","....G..g..G.....",".....GGg.GG.....","......Ggg.......",".......g........",".......g........"];function MS(i,t){const e={g:Co[2],G:Co[1],Y:pt("#f2d421","#f7dc2c"),y:N("#fff27c"),o:N("#e0a10e")};ii(i,t,L0,e,0,9),ii(i,t,[".yYY.","yYYYo","YYoYo",".Yoo."],e,5,5)}function yS(i,t){const e={g:Co[2],G:Co[1],R:pt("#e0282a","#d62224"),r:N("#a8141a"),l:N("#ff5a4f"),k:N("#2b0b0b")};ii(i,t,L0,e,0,9),ii(i,t,[".lRr.","lRRRr","RRkRr","rRRrr",".rrr."],e,5,4)}function bS(i,t){const e={b:pt("#7a5429","#87602f"),B:N("#5e3f1c"),l:N("#9c7440")};ii(i,t,["................","..l.........l...","...b.......b..l.",".l..b.....b..b..","..b..b...l..b...","...b.b..b..b....","....bb..b.b..l..",".l...b.b.bb.b...","..b..bbbbb..b...","...bb.bBb..b....",".....bBBb.b.....","......BBbb......",".......BB.......",".......BB.......",".......BB.......",".......BB......."],e)}const SS=pt("#5d4124","#6e4e2c");function Sl(i,t,e,n,s){ii(i,t,e,{d:n[0],g:[n[1],n[2]],G:[n[3],n[4]],L:n[5],t:s[1],T:s[0]})}const ES=["................","................","......gGg.......","....gGLGGgg.....","...gGLGgGLGg....","..gGGdGGLGGgd...","..gLGgdGgGdGg...","...gGGgGLGgGd...","..dgGdgGGdGGg...","...dgGgtgGgd....",".....dgtTgd.....",".......tT.......",".......tT.......",".......tT.......",".......tT.......","......tTTT......"],wS=["................",".......gG.......",".....gGLGg......","....gGLGGGg.....","...gGGgLGgGd....","...gLGdGGLGg....","....gGGgGGgd....",".....dgGtgd.....","......dgtd......","........t.......",".......Tt.......","........t.......","........t.......",".......tT.......","........t.......",".......ttT......"],TS=["................",".......g........","......gGg.......",".....gGLGd......","......gGd.......","....gGGLGGd.....","...gGLGGGLGd....",".....dgtgd......","...gGGgtGGgd....","..gGLGGtGGLGd...",".gGGgGGtGgGGGd..","....dd.tT.dd....",".......tT.......",".......tT.......",".......tT.......","......tTTT......"];function AS(i){return t=>{const e=E0(99537381),n=pt("#245d15","#2f7419","#3c8a22","#4b9e2d","#5db23a"),s=pt("#6e5016","#8a671f","#a6812a","#bf9a37","#d5b24b","#e6c963"),r=Math.min(1,Math.max(0,(i-3)/4)),o=l=>bn(Tt(n,l),Tt(s,l+.8),r),a=i>=7?s.slice(1):i===6?s.slice(1).map(l=>bn(l,n[3],.3)):s.slice(1).map(l=>bn(l,n[3],.6)),c=9;for(let l=0;l<c;l++){const h=l%2===0;let u=Math.min(O-1,Math.max(0,Math.round(.8+l*1.8+(e()-.5)*.8)));const f=.72+e()*.28,d=Math.max(1,Math.round((1.6+i*1.8)*f)),m=e()<.5?-1:1,_=Math.floor(d*(.45+e()*.3)),g=1+Math.floor(e()*3),p=i>=5?i-2:0,M=h?2.2:1.2;for(let S=0;S<d;S++){const v=O-1-S;if(S===_&&i>=2&&e()<.7&&(u=Math.min(O-1,Math.max(0,u+m))),S>=d-p){const E=(S&1)===0;t.set(u,v,Tt(a,(h?3:2)+(E?1:-1))),(E||S===d-p)&&t.set(u-m,v,Tt(a,(h?2:1)+(E?-1:1))),S===d-1&&t.set(u,v-1,Tt(a,4))}else if(t.set(u,v,o(M+(S%3===0?.6:0))),i>=1&&i<=6&&(S===g||i>=3&&S===g+4)){const E=S===g?-m:m;t.set(u+E,v-1,o(M+1)),i>=2&&t.set(u+2*E,v-2,o(M+1.6))}}}}}function RS(i,t){const e=pt("#1b4716","#255b1d","#306f25","#3c832e","#4a9638","#59a944"),n=[0,2,4,3,1,2,4,3,1,2,4,3,1,3,2,0];for(let s=0;s<O;s++)for(let r=0;r<O;r++)i.set(r,s,Tt(e,n[r]+(t()<.15?-1:0)));for(const[s,r]of[[4,2],[8,6],[12,3],[4,10],[8,13],[12,11]])i.set(s,r,N("#e4e0a6")),i.set(s,r+1,N("#173f12"))}function CS(i,t){const e=pt("#1b4716","#255b1d","#306f25","#3c832e","#4a9638","#59a944");for(let n=0;n<O;n++)for(let s=0;s<O;s++){const r=Math.max(Math.abs(s-7.5),Math.abs(n-7.5)),o=r>7?0:r>6?2:Math.floor(r)%2===0?4:3;i.set(s,n,Tt(e,o+(t()<.15?-1:0)))}for(const[n,s]of[[3,3],[12,3],[3,12],[12,12],[7,2],[2,8],[13,7],[8,13]])i.set(n,s,N("#e4e0a6"))}function LS(i,t){const e=pt("#86a85a","#94b567","#a1c174","#adcc82");for(let n=0;n<O;n++)for(let s=0;s<O;s++){const r=Math.max(Math.abs(s-7.5),Math.abs(n-7.5));i.set(s,n,r>7?N("#1b4716"):r>6?N("#306f25"):r>5?N("#4a9638"):Re(t,e))}for(let n=0;n<6;n++)i.set(4+t()*8,4+t()*8,N("#6c8d44"))}function DS(i,t){const e=pt("#7a3829","#8a4332","#994e3a","#a65843","#b4654f","#c0735c"),n=pt("#958f86","#a29c93","#aea99f");for(let s=0;s<4;s++){const r=s%2?4:0;for(let o=0;o<2;o++){const a=1.2+t()*2.2;for(let c=0;c<4;c++)for(let l=0;l<8;l++){const h=o*8+l+r,u=s*4+c;if(c===3||l===7){i.set(h,u,Re(t,n));continue}const f=a+(c===0?.9:0)-(c===2||l===6?.8:0)+(t()-.5)*.9;i.set(h,u,Tt(e,f))}}}}function PS(i,t){const e=pt("#8e2626","#2a4c8c","#2d7a39","#8c6a1d","#6a2a7a","#b0802c","#3f6f78","#7a2f4a"),n=pt("#2c1d0c","#352411");fs(i,t,Zn.ramp,0,0,O-1,0,4),fs(i,t,Zn.ramp,0,7,O-1,7,4),fs(i,t,Zn.ramp,0,8,O-1,8,1.5),fs(i,t,Zn.ramp,0,15,O-1,15,1);for(let s=0;s<O;s++)i.set(0,s,Tt(Zn.ramp,3+t())),i.set(O-1,s,Tt(Zn.ramp,1+t()));for(const[s,r]of[[1,6],[9,14]]){for(let a=s;a<=r;a++)for(let c=1;c<O-1;c++)i.set(c,a,Re(t,n));let o=1;for(;o<O-1;){const a=t()<.2?1:t()<.8?2:3,c=Re(t,e),l=s+(t()<.35?1:0),h=t()<.6?l+1+Math.floor(t()*3):-1;for(let u=0;u<a&&o<O-1;u++,o++)for(let f=l;f<=r;f++){let d=fn(c,u===0?1.15:u===a-1&&a>1?.8:1);f===l&&(d=fn(d,1.2)),f===h&&(d=bn(d,N("#e2c46a"),.55)),i.set(o,f,d)}t()<.18&&o<O-2&&o++}}}function IS(i,t){const e=pt("#6b4a22","#8c6430","#b0823b","#cf9f48","#e8bb57","#f8d572","#ffe9a3","#fff7d6"),n=yc(t,4,4,.95,.5),s=Array.from({length:n.count},()=>3+t()*3.5);for(let r=0;r<O;r++)for(let o=0;o<O;o++){const a=n.at(o,r),c=n.at(o+1,r)!==a||n.at(o,r+1)!==a,l=n.at(o-1,r)!==a||n.at(o,r-1)!==a,h=c?t()*2.2:s[a]+(t()-.5)*1.6+(l?1:0);i.set(o,r,Tt(e,h))}}function ns(i){const t=N(i),e=[bn(t,rc,.3),bn(t,rc,.15),t,bn(t,qs,.08),bn(t,qs,.18)];return(n,s)=>{const r=we(s,4);for(let o=0;o<O;o++)for(let a=0;a<O;a++){const c=a+o+Math.round(r(a,o)*4)&3,l=c===0?-.9:c===1?.7:0;n.set(a,o,Tt(e,2+l+(s()-.5)*1.1))}}}function bu(i,t,e){for(let n=0;n<O;n++)for(let s=0;s<O;s++)i.set(s,n,Be(e.base,t,.04));for(let n=0;n<O;n++)i.set(n,0,e.light),i.set(0,n,e.light),i.set(n,O-1,e.dark),i.set(O-1,n,e.dark);for(let n=1;n<O-1;n++)i.set(n,1,e.hi),i.set(1,n,e.hi),i.set(n,O-2,e.shadow),i.set(O-2,n,e.shadow);i.set(O-2,1,e.base),i.set(1,O-2,e.base)}const NS={hi:N("#ffffff"),light:N("#f0f0f0"),base:N("#dadada"),shadow:N("#b2b2b2"),dark:N("#8f8f8f")},_i={hi:N("#fffbc4"),light:N("#fff09a"),base:N("#f5d33a"),shadow:N("#d4a923"),dark:N("#a77d15")},Ca={hi:N("#e6fffc"),light:N("#b4fbf3"),base:N("#5fe0d6"),shadow:N("#36b3aa"),dark:N("#1d827b")};function US(i,t){bu(i,t,NS);for(let e=2;e<O-2;e++)i.set(e,7,N("#bdbdbd")),i.set(e,8,N("#ececec"));for(const[e,n]of[[3,3],[12,3],[3,12],[12,12]])i.set(e,n,N("#a4a4a4")),i.set(e-1,n-1,qs)}function OS(i,t){bu(i,t,_i);for(let e=2;e<O-2;e++)for(let n=2;n<O-2;n++){const s=n+e;s===8||s===9?i.set(n,e,bn(_i.base,_i.light,s===8?.75:.45)):s===11?i.set(n,e,bn(_i.base,_i.light,.3)):s>16&&t()<.12&&i.set(n,e,bn(_i.base,_i.shadow,.5))}i.set(10,11,_i.shadow),i.set(11,11,_i.shadow),i.set(5,9,_i.shadow)}function kS(i,t){bu(i,t,Ca);for(let e=2;e<O-2;e++)for(let n=2;n<O-2;n++){const s=Math.abs(n-7.5)+Math.abs(e-7.5);s>5&&s<6.1?i.set(n,e,e<7.5?Ca.light:Ca.shadow):s<2.1&&i.set(n,e,Ca.hi)}i.set(4,4,qs),i.set(5,3,qs)}function FS(i,t){const e=N("#c63a2c"),n=[1.15,1,.88,.6];for(let r=0;r<O;r++)for(let o=0;o<O;o++)i.set(o,r,Be(fn(e,n[o%4]),t,.06));for(let r=0;r<O;r++){i.set(r,4,N("#9c2c22")),i.set(r,5,N("#d8d8d8"));for(let o=6;o<=10;o++)i.set(r,o,Be(N("#f0f0f0"),t,.04));i.set(r,11,N("#cfcfcf")),i.set(r,12,N("#9c2c22"))}const s=N("#1a1a1a");ii(i,t,["###.#..#.###",".#..##.#..#.",".#..#.##..#.",".#..#..#..#.",".#..#..#..#."],{"#":s},2,6)}function Md(i,t,e){const n=N("#6e1d16");for(let s=0;s<O;s++)for(let r=0;r<O;r++)i.set(r,s,Be(n,t,.1));for(let s=0;s<4;s++)for(let r=0;r<4;r++)ii(i,t,[".rr.","rRRr","RlRr",".rr."],{r:N("#b8352a"),R:N("#d64a3a"),l:N("#e8705e")},r*4,s*4);e&&(ii(i,t,["..kk..",".kgGk.","kgGGgk","kGgGgk",".kgGk.","..kk.."],{k:N("#2a2a2a"),g:N("#6b6b6b"),G:N("#9a9a9a")},5,5),i.set(10,4,N("#9a9a9a")),i.set(11,3,N("#6b6b6b")))}const br=pt("#3f2a14","#47301a","#4f361d");function BS(i,t){const e=pt("#8f6b3c","#9d7745","#ab844f","#b89159","#c49d64","#cfa86e");for(let n=0;n<O;n++)for(let s=0;s<O;s++){if(s===0||n===0||s===O-1||n===O-1){i.set(s,n,Re(t,br));continue}if(s%5===0||n%5===0){i.set(s,n,Be(N("#62441f"),t,.1));continue}const r=s%5,o=n%5;let a=2.5+(t()-.5)*1.4;(r===1||o===1)&&(a+=1.3),(r===4||o===4)&&(a-=1.3),i.set(s,n,Tt(e,a))}}function D0(i,t){Ga(i,t,Zn);const e=pt("#6b4a26","#77542c","#835e33");for(let n=0;n<O;n++)i.set(n,0,Re(t,br)),i.set(n,1,Re(t,e)),i.set(n,2,Re(t,e)),i.set(n,3,Re(t,br)),i.set(n,O-1,Re(t,br));for(let n=4;n<O;n++)i.set(0,n,Re(t,br)),i.set(1,n,Re(t,e)),i.set(O-2,n,Re(t,e)),i.set(O-1,n,Re(t,br))}function zS(i,t){D0(i,t),ii(i,t,["..k...k..","..mk.km..","...mkm...","....k....","...b.b...","..b...b..","..b...b..",".bb...bb."],{k:N("#4a4a4a"),m:N("#b5b5b5"),b:N("#5a3a1a")},3,5)}function GS(i,t){D0(i,t);const e={b:N("#4f3215"),B:N("#7a5328"),m:N("#bdbdbd"),M:N("#8f8f8f"),k:N("#4e4e4e")};ii(i,t,["...BBB...kMMMk..","..Bb.bB..kmmmk..","..BBBBB....B....","...mmM.....b....","...mmMk....B....","...mmMM....b....","...mmMk....B....","...mmMM....b....","...mMMk....B....","...MMk.....b...."],e,0,5)}const HS=pt("#5b5b5b","#666666","#717171","#7c7c7c","#878787","#929292");function Su(i,t){const e=we(t,8);Un(i,HS,on((n,s)=>e(n,s)*.4+t()*.8),[1,2,3,3,2,1]);for(let n=0;n<O;n++)i.set(n,0,Be(N("#4c4c4c"),t,.08)),i.set(0,n,Be(N("#4c4c4c"),t,.08)),i.set(n,O-1,Be(N("#3c3c3c"),t,.08)),i.set(O-1,n,Be(N("#3c3c3c"),t,.08));for(let n=1;n<O-1;n++)i.set(n,1,Be(N("#a0a0a0"),t,.06)),i.set(1,n,Be(N("#a0a0a0"),t,.06)),i.set(n,O-2,Be(N("#5e5e5e"),t,.06)),i.set(O-2,n,Be(N("#5e5e5e"),t,.06))}function VS(i,t){Su(i,t);for(let e=4;e<=11;e++)i.set(e,4,N("#5a5a5a")),i.set(4,e,N("#5a5a5a")),i.set(e,11,N("#9a9a9a")),i.set(11,e,N("#9a9a9a"))}function yd(i){return(t,e)=>{Su(t,e);for(let s=4;s<=11;s++)t.set(s,3,N("#2f2f2f")),t.set(s,4,N("#232323")),t.set(s,5,N("#a5a5a5"));for(let s=3;s<=12;s++)t.set(s,7,N("#a8a8a8")),t.set(s,14,N("#5a5a5a"));for(let s=8;s<=13;s++){t.set(3,s,N("#4a4a4a")),t.set(12,s,N("#9a9a9a"));for(let r=4;r<=11;r++)t.set(r,s,s===8?N("#0e0e0e"):Be(N("#191919"),e,.2))}if(!i){for(let s=4;s<=11;s++)t.set(s,13,Be(N("#2b2b2b"),e,.2));return}const n=pt("#7a1d06","#b33208","#e0560d","#f78a1b","#fdbb2f","#ffe36a","#fff8cf");for(let s=4;s<=11;s++){const r=2+Math.floor(e()*4);for(let o=0;o<r;o++){const a=13-o;t.set(s,a,Tt(n,6-o/r*5-e()*.8))}t.set(s,13-r,N("#3a1004"))}}}const bd=pt("#2b1a09","#34200c","#3d260f");function kh(i,t,e){const n=(gd.ramp.length-1)/2;fs(i,t,gd.ramp,0,0,O-1,O-1,n);for(let s=0;s<O;s++)for(let r=0;r<O;r++){const o=s%5;o===0&&i.set(r,s,fn(i.get(r,s),1.12)),o===4&&i.set(r,s,fn(i.get(r,s),.82))}if(w0(i,t,bd),e)for(let s=1;s<O-1;s++)i.set(s,5,Re(t,bd)),i.set(s,6,fn(i.get(s,6),.8)),i.set(s,4,fn(i.get(s,4),1.1))}function WS(i,t){kh(i,t,!0),ii(i,t,["kkkk","kmMk","kmMk","kMdk","kMMk","kkkk"],{k:N("#2a2a2a"),m:N("#e4e4e4"),M:N("#b0b0b0"),d:N("#3a3a3a")},6,3)}function XS(i){const t=pt("#5a3d1c","#7a5529","#956a35");for(let e=8;e<O;e++)i.set(7,e,t[2]),i.set(8,e,t[1]);i.set(8,15,t[0]),i.set(7,8,N("#6b4a22")),i.set(8,8,N("#4a3216")),i.set(7,6,N("#ffd84a")),i.set(8,6,N("#ffa62b")),i.set(7,7,N("#fffbe8")),i.set(8,7,N("#ffe066"))}function YS(i,t){const e=pt("#5e4320","#77562b","#8e6935","#a07a40");for(let n=0;n<O;n++)i.set(1,n,Tt(e,2.5+(t()-.5))),i.set(2,n,Tt(e,1.2+(t()-.5))),i.set(13,n,Tt(e,2.5+(t()-.5))),i.set(14,n,Tt(e,1.2+(t()-.5)));for(let n=1;n<O;n+=4){for(let s=3;s<=12;s++)i.set(s,n,Tt(e,3-(t()<.2?1:0))),i.set(s,n+1,Tt(e,1+(t()<.3?1:0)));i.set(2,n,N("#3b2912")),i.set(13,n,N("#3b2912"))}}function Sd(i){const t=pt("#45301a","#4d361d"),e=pt("#674a28","#70522d");return(n,s)=>{for(let r=0;r<O;r++)for(let o=0;o<O;o++){const a=i?r<=2||r===12||r===13:r===6||r===7||r>=13;let c;if(o===0||o===O-1||r===(i?0:O-1))c=Re(s,t);else if(o===1||o===O-2||a){const l=i?r===2||r===13:r===7||r===14;c=Tt(Zn.ramp,4.2+(s()-.5)*1.2-(o===O-2?1.4:0)-(l?1.6:0))}else{const l=(o-2)%3;c=l===2?Be(N("#6a4e2b"),s,.08):Tt(Zn.ramp,2.3+(l===0?.7:0)+(s()-.5)*1.1)}n.set(o,r,c)}if(i){for(let r=3;r<=11;r++)for(let o=3;o<=12;o++)n.set(o,r,Re(s,e));for(const r of[4,8])for(const o of[4,9])for(let a=r;a<r+3;a++)for(let c=o;c<o+3;c++)n.set(c,a,rc,0)}else{for(let r=2;r<=4;r++)n.set(13,r,N("#2d2d2d"));n.set(11,3,N("#cfcfcf")),n.set(12,3,N("#8f8f8f")),n.set(11,4,N("#5c4326")),n.set(12,4,N("#5c4326"))}}}const Cr=pt("#7c5a30","#94703f","#aa854f","#bd9862","#cdaa73"),xs=pt("#6f1518","#861b1f","#9e2327","#b42b2e","#c63a3b","#d65050"),vo=pt("#bdbdbd","#d0d0d0","#e1e1e1","#eeeeee","#fafafa");function P0(i,t,e,n){for(let s=e;s<=n;s++)for(let r=1;r<O-1;r++){const o=(r+s)%4===0?-.7:(r-s+O)%4===2?.5:0;i.set(r,s,Tt(xs,2.6+o+(t()-.5)*.8))}}function I0(i,t){for(let e=0;e<O;e++)i.set(0,e,Tt(Cr,3+(t()-.5))),i.set(O-1,e,Tt(Cr,1.5+(t()-.5)))}function KS(i,t){I0(i,t);for(let e=0;e<=5;e++)for(let n=1;n<O-1;n++){const s=e===0||e===5,r=n===1||n===O-2;let o=3.3+(t()-.5)*.6;e===1&&(o+=.8),(s||r)&&(o=1.5),s&&r&&(o=.3),i.set(n,e,Tt(vo,o))}P0(i,t,6,O-1);for(let e=1;e<O-1;e++)i.set(e,6,Tt(vo,2.5+(t()-.5))),i.set(e,7,Tt(xs,1))}function qS(i,t){I0(i,t),P0(i,t,0,O-1);for(let e=1;e<O-1;e++)i.set(e,11,Tt(xs,4.6)),i.set(e,12,Tt(xs,3.6)),i.set(e,13,Tt(xs,.4))}function La(i){return(t,e)=>{for(let n=0;n<O;n++)i?(t.set(n,7,Tt(vo,4)),t.set(n,8,Tt(vo,3+(e()-.5))),t.set(n,9,Tt(vo,1.6))):(t.set(n,7,Tt(xs,4.5)),t.set(n,8,Tt(xs,2.8+(e()-.5)*.8)),t.set(n,9,Tt(xs,1.5))),t.set(n,10,Tt(Cr,3.8)),t.set(n,11,Tt(Cr,2.5+(e()-.5))),t.set(n,12,Tt(Cr,1));for(let n=13;n<O;n++)for(const s of[0,1,2,13,14,15]){const r=s===0||s===13?2.6:s===2||s===15?.6:1.7;t.set(s,n,Tt(Cr,r))}}}function Ed(i){const t=pt("#2546a9","#2a50b9","#2f5ac6","#3664d0","#3f6fd8"),e=N("#6f97e8"),n=N("#93b4f0");return(s,r)=>{const o=i?we(r,8,2):we(r,4),a=on((c,l)=>o(c,l)*.75+r()*.35);for(let c=0;c<O;c++)for(let l=0;l<O;l++){const h=a[c*O+l];s.set(l,c,xu(t,h,[1,2,3,2,1]),Math.round(178+h*14))}if(i)for(let c=0;c<9;c++){const l=Math.floor(r()*O),h=Math.floor(r()*O),u=2+Math.floor(r()*4);for(let f=0;f<u;f++)s.set(l,h+f,f===0?n:e,196)}else for(let c=0;c<7;c++){const l=Math.floor(r()*O),h=Math.floor(r()*O),u=3+Math.floor(r()*3);for(let f=0;f<u;f++)s.set(l+f,h+(f===0||f===u-1?0:1),f===1?n:e,196)}}}function wd(i){const t=pt("#5c1403","#822006","#a72e08","#ca420b","#e35b10","#f27a17","#f99d22","#fdc334","#ffe370","#fff4bf");return(e,n)=>{const s=i?we(n,4,2):we(n,4),r=i?we(n,8,3):we(n,8),o=on((a,c)=>s(a,c)*.6+r(a,c)*.4+n()*.12);Un(e,t,o,[1,1.4,2,3,3.5,3.5,3,2,1.2,.5])}}let El=null;function $S(){if(El)return El;const i=E0(12648430),t=new Uint8Array(O*O),e=[],n=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]],s=(l,h)=>l>=0&&h>=0&&l<O&&h<O,r=(l,h)=>{let u=0;for(const[f,d]of n)s(l+f,h+d)&&t[(h+d)*O+l+f]&&u++;return u>2},o=(l,h,u)=>(l-7.5)*n[u][0]+(h-7.5)*n[u][1]>=-.5,a=(l,h)=>{t[h*O+l]=1,e.push([l,h,180+Math.floor(i()*50)])},c=[];a(7,8);for(const l of[1,3,5,7])c.push({x:7,y:8,d:l,life:4+Math.floor(i()*6)});for(let l=0;e.length<100&&l<5e3;l++){if(!c.length){const[h,u]=e[Math.floor(i()*Math.min(e.length,40))];let f=Math.floor(i()*8);for(;!o(h,u,f);)f=(f+1)%8;c.push({x:h,y:u,d:f,life:3+Math.floor(i()*6)})}for(let h=0;h<c.length;h++){const u=c[h];if(i()<.15){const _=(u.d+(i()<.5?1:7))%8;o(u.x,u.y,_)&&(u.d=_)}const f=i()<.4?(u.d+(i()<.5?1:7))%8:u.d,d=u.x+n[f][0],m=u.y+n[f][1];if(!s(d,m)||t[m*O+d]||r(d,m)||--u.life<0){c.splice(h--,1);continue}if(u.x=d,u.y=m,a(d,m),i()<.1){const _=(u.d+(i()<.5?2:6))%8;o(d,m,_)&&c.push({x:d,y:m,d:_,life:2+Math.floor(i()*4)})}}}return El=e,e}const jS=[3,8,14,21,29,38,48,60,74,90];function ZS(i){return t=>{const e=$S(),n=Math.min(e.length,jS[i]);for(let s=0;s<n;s++){const[r,o,a]=e[s];t.set(r,o,s%3===0?N("#262626"):N("#121212"),a)}}}const N0=pt("#a4520a","#b65f0e","#c66c12","#d47a18","#e08a22","#eb9a30");function U0(i,t){for(let e=0;e<O;e++)for(let n=0;n<O;n++){const s=n%4,r=s===0?.6:s===2?4.2:2.8;i.set(n,e,Tt(N0,r+(t()-.5)*1.3-(e===0||e===O-1?.8:0)))}}function JS(i,t){for(let n=0;n<O;n++)for(let s=0;s<O;s++){const r=Math.max(Math.abs(s-7.5),Math.abs(n-7.5)),o=Math.floor(r)%3===0?1.2:3.2;i.set(s,n,Tt(N0,o+(t()-.5)*1.2))}const e=pt("#3d4a1c","#4f5f23","#617329");for(let n=6;n<=9;n++)for(let s=6;s<=9;s++)i.set(s,n,Re(t,e));i.set(6,6,N("#2e3815")),i.set(9,9,N("#2e3815"))}function Td(i){return(t,e)=>{U0(t,e);const n=(s,r)=>{const o=i?r>=10?N("#ffe46b"):N("#ffbf2e"):N("#2a1404");t.set(s,r,i?bn(o,qs,e()*.25):Be(o,e,.3))};for(const s of[3,10]){n(s+1,4);for(let r=s;r<=s+2;r++)n(r,5);for(let r=s;r<=s+2;r++)n(r,6)}for(let s=3;s<=12;s++)n(s,10);for(let s=2;s<=13;s++)s!==5&&s!==10&&n(s,11);for(let s=3;s<=12;s++)s!==7&&s!==8&&n(s,12);for(let s=5;s<=10;s++)n(s,13)}}function QS(i,t){const e=pt("#5d8a33","#6f9e3c","#84b44a","#98c45a","#aed36f"),n=N("#c9d98c");for(const[s,r,o]of[[3,1,0],[8,0,2],[12,3,1]])for(let a=r;a<O;a++){const c=(a+o)%5===0;i.set(s,a,c?n:Tt(e,3+(t()-.5))),i.set(s+1,a,c?bn(n,e[1],.5):Tt(e,1.4+(t()-.5)))}for(const[s,r,o]of[[2,6,-1],[5,10,1],[10,4,1],[7,12,-1],[14,9,1]])i.set(s,r,e[2]),i.set(s+o,r-1,e[3])}function t2(i,t){for(let e=0;e<O;e++)for(let n=0;n<O;n++)n===0||e===0||n===O-1||e===O-1?i.set(n,e,Tt(Zn.ramp,1+(t()-.5))):n===7||n===8||e===7||e===8||n===1||e===1||n===O-2||e===O-2?i.set(n,e,Tt(Zn.ramp,3.4+(t()-.5)*1.2)):(n===3||n===12)&&(e===3||e===12)?i.set(n,e,N("#5c4426")):i.set(n,e,rc,0);i.set(7,7,N("#4a3216")),i.set(8,8,N("#4a3216"))}const e2={stone:R0,grass_side:(i,t)=>{xl(i,t),dd(i,t,T0,N("#356a1d"),3)},grass_top:Jb,dirt:xl,cobblestone:C0,oak_planks:(i,t)=>Ga(i,t,Zn),birch_planks:(i,t)=>Ga(i,t,mS),spruce_planks:(i,t)=>Ga(i,t,gS),oak_log:(i,t)=>_d(i,t,vd),oak_log_top:(i,t)=>yl(i,t,pt("#8a6a3c","#a9864f","#b8955d"),vd),birch_log:_S,birch_log_top:(i,t)=>yl(i,t,pt("#b49f68","#cdba85","#d9c893"),vS),spruce_log:(i,t)=>_d(i,t,xd),spruce_log_top:(i,t)=>yl(i,t,pt("#5a3e22","#76552f","#846138"),xd),oak_leaves:(i,t)=>bl(i,t,pt("#1f4a17","#29601d","#337223","#3e842a","#4a9531","#58a53b")),birch_leaves:(i,t)=>bl(i,t,pt("#395c24","#456c2b","#527c33","#5f8c3b","#6d9b44","#7ca94f")),spruce_leaves:(i,t)=>bl(i,t,pt("#14301d","#1b3d24","#224a2b","#2a5733","#33643b","#3d7044")),sand:cS,gravel:lS,sandstone_side:hS,sandstone_top:uS,sandstone_bottom:fS,glass:i=>{const t=N("#f2fafc"),e=N("#d4e9f0"),n=N("#a8c9d5");for(let s=0;s<O;s++)i.set(s,0,t),i.set(0,s,t),i.set(s,O-1,n),i.set(O-1,s,n);i.set(O-1,0,e),i.set(0,O-1,e);for(const[s,r]of[[3,6],[4,5],[5,4],[6,3],[5,6],[6,5],[10,12],[11,11],[12,10]])i.set(s,r,s+r>15?e:qs)},bedrock:rS,water_flow:Ed(!0),water_still:Ed(!1),lava_flow:wd(!0),lava_still:wd(!1),coal_ore:(i,t)=>Ra(i,t,pt("#141414","#262626","#404040")),iron_ore:(i,t)=>Ra(i,t,pt("#9c765e","#cfa486","#ebcdb7")),gold_ore:(i,t)=>Ra(i,t,pt("#b88a10","#f2cc2e","#fff3a0")),diamond_ore:(i,t)=>Ra(i,t,pt("#1b9a94","#4de0e6","#c9fffb"),4),snow:dS,snowy_grass_side:(i,t)=>{xl(i,t),dd(i,t,A0.slice(1),N("#c3d1d9"),3)},ice:pS,cactus_side:RS,cactus_top:CS,cactus_bottom:LS,tall_grass:xS,dandelion:MS,poppy:yS,dead_bush:bS,bricks:DS,stone_bricks:iS,mossy_cobblestone:nS,obsidian:oS,bookshelf:PS,glowstone:IS,wool_white:ns("#e9ecec"),wool_red:ns("#a12722"),wool_pink:ns("#ed8dac"),wool_yellow:ns("#f8c527"),wool_green:ns("#5e7c16"),wool_blue:ns("#35399d"),wool_purple:ns("#7a2aac"),wool_black:ns("#1d1d21"),crafting_table_side:zS,crafting_table_top:BS,crafting_table_front:GS,furnace_side:Su,furnace_top:VS,furnace_front:yd(!1),furnace_front_lit:yd(!0),chest_side:(i,t)=>kh(i,t,!0),chest_top:(i,t)=>kh(i,t,!1),chest_front:WS,torch:XS,ladder:YS,door_bottom:Sd(!1),door_top:Sd(!0),stone_slab_side:(i,t)=>{md(i,t);for(let e=0;e<O;e++)i.set(e,0,N("#bdbdbd")),i.set(e,7,N("#7c7c7c")),i.set(e,8,N("#bdbdbd")),i.set(e,O-1,N("#7c7c7c"))},stone_slab_top:(i,t)=>{md(i,t),w0(i,t,pt("#7c7c7c","#818181"))},bed_foot_side:La(!1),bed_foot_top:qS,bed_foot_end:La(!1),bed_head_side:La(!1),bed_head_top:KS,bed_head_end:La(!0),farmland_top:Qb,...Object.fromEntries(Array.from({length:8},(i,t)=>[`wheat_${t}`,AS(t)])),oak_sapling:(i,t)=>Sl(i,t,ES,pt("#1f4a17","#2c621f","#367425","#41862c","#4d9733","#62ad42"),SS),birch_sapling:(i,t)=>Sl(i,t,wS,pt("#395c24","#4a702d","#577f35","#668f3e","#749e47","#88b257"),pt("#3a3a3a","#e0ded6")),spruce_sapling:(i,t)=>Sl(i,t,TS,pt("#14301d","#1d4126","#244e2d","#2d5c36","#37693f","#4a7f50"),pt("#2e1f10","#4a3420")),tnt_side:FS,tnt_top:(i,t)=>Md(i,t,!0),tnt_bottom:(i,t)=>Md(i,t,!1),iron_block:US,gold_block:OS,diamond_block:kS,glass_pane_top:(i,t)=>{for(let e=0;e<O;e++)for(let n=0;n<O;n++)i.set(n,e,Be(N("#cfe3ea"),t,.06))},trapdoor:t2,pumpkin_side:U0,pumpkin_top:JS,pumpkin_face:Td(!1),jack_o_lantern:Td(!0),sugar_cane:QS,...Object.fromEntries(Array.from({length:10},(i,t)=>[`destroy_${t}`,ZS(t)]))},Ad=9;function Fh(i,t,e,n=()=>!0){t.forEach((s,r)=>{for(let o=0;o<s.length;o++){const a=e[s[o]];a&&n(o)&&i.set(o,r,N(a))}})}function is(i,t){return e=>Fh(e,i,t)}function wl(i,t,e,n){return s=>{const r=o=>n?o<=4:o>=4;Fh(s,i,e,o=>!r(o)),Fh(s,i,t,r)}}const Tl=[".kkk.kkk.","kWWRkRRRk","kWRRRRRRk","kRRRRRRDk",".kRRRRDk.","..kRRDk..","...kDk...","....k....","........."],Rd={k:"#1e0505",W:"#ffc4c4",R:"#e0201f",D:"#a3100f"},Cd={k:"#1e0505",W:"#4a3434",R:"#2f1e1e",D:"#241616"},Al=["....kkkk.","...kMHMMk","..kMHMMMk","..kMMMMDk",".kWkMMDk.","kWWWkkk..","kWWk.....",".kk......","........."],Ld={k:"#2a1405",M:"#b5642a",H:"#e09a52",D:"#7f3f14",W:"#f2eee4"},Dd={k:"#2a1405",M:"#33261b",H:"#45362a",D:"#271c13",W:"#3a3a36"},Rl=["kkk...kkk","kLLkkkLAk","kLAAAAAAk","kkAAAAAkk",".kLAAAAk.",".kAAAADk.",".kAAADDk.",".kkkkkkk.","........."],Pd={k:"#1c1c1c",L:"#ffffff",A:"#d6d6d6",D:"#9a9a9a"},Id={k:"#1c1c1c",L:"#3c3c3c",A:"#2c2c2c",D:"#232323"},n2=["..kkkkk..",".kLLLLLk.","kLWWBBBLk","kLWBBBBLk","kLBBBBBLk","kLBBBBDLk","kLBBBDDLk",".kLLLLLk.","..kkkkk.."],i2=["....k....",".k..L..k.","..L...L..",".........","kL.....Lk",".........","..L...L..",".k..L..k.","....k...."],Nd={k:"#0d2a5e",L:"#8fc3ff",W:"#ffffff",B:"#c9e4ff",D:"#a3cbff"},s2={heart_full:is(Tl,Rd),heart_half:wl(Tl,Rd,Cd,!0),heart_empty:is(Tl,Cd),food_full:is(Al,Ld),food_half:wl(Al,Ld,Dd,!1),food_empty:is(Al,Dd),armor_full:is(Rl,Pd),armor_half:wl(Rl,Pd,Id,!0),armor_empty:is(Rl,Id),bubble:is(n2,Nd),bubble_pop:is(i2,Nd)},si=16,Ud=i=>i[0]*.299+i[1]*.587+i[2]*.114;class Ai{constructor(t=si,e=si){C(this,"c");C(this,"o");this.w=t,this.h=e,this.c=new Array(t*e).fill(null),this.o=new Array(t*e).fill(null)}inside(t,e){return t>=0&&e>=0&&t<this.w&&e<this.h}put(t,e,n,s=null){this.inside(t,e)&&(this.c[e*this.w+t]=n,this.o[e*this.w+t]=s)}emit(t){for(let e=0;e<this.h;e++)for(let n=0;n<this.w;n++){const s=this.c[e*this.w+n];if(s){t.set(n,e,s);continue}let r=null;for(const[o,a]of[[1,0],[-1,0],[0,1],[0,-1]]){if(!this.inside(n+o,e+a))continue;const c=this.o[(e+a)*this.w+n+o];c&&(!r||Ud(c)<Ud(r))&&(r=c)}r&&t.set(n,e,r)}}}function O0(i,t,e,n,s,r=0,o=0){e.forEach((a,c)=>{for(let l=0;l<a.length;l++){const h=n[a[l]];if(!h)continue;const u=Array.isArray(h)?h:[h],f=s===null?null:typeof s=="string"?s:s[a[l]]??s["*"]??null;i.put(r+l,o+c,N(u[Math.floor(t()*u.length)]),f?N(f):null)}})}function xe(i,t,e){return(n,s)=>{const r=new Ai(n.width,n.height);O0(r,s,i,t,e),r.emit(n)}}const Qn=(i,t,e,n,s)=>({hi:N(i),light:N(t),mid:N(e),dark:N(n),outline:N(s)});function Bi(i,t,e){for(let n=0;n<i.h;n++)for(let s=0;s<i.w;s++){if(!t(s,n))continue;const r=t(s,n-1),o=t(s-1,n),a=!r||!o,c=!t(s,n+1)||!t(s+1,n);let l=a&&!c?e.light:c&&!a?e.dark:e.mid;!r&&!o&&!c&&(l=e.hi),i.put(s,n,l,e.outline)}}const k0=(i,t="#")=>(e,n)=>n>=0&&n<i.length&&e>=0&&i[n][e]===t,Cl=Qn("#b38b50","#a27c45","#8a6837","#6a4f27","#2a1c0b");function Bh(i,t,e=-11){for(let n=0;n<si;n++)for(let s=0;s<si;s++){const r=s-n,o=s+n;(o===15||o===16)&&r>=e&&r<=t&&i.put(s,n,o===15?Cl.light:Cl.dark,Cl.outline)}}const r2=["................","................","...########.....",".....########...",".........####...","..........####..","...........###..","............##..","............##..","............##..","............##..",".............#..",".............#.."];function o2(i,t){const e=i-t,n=i+t;if(n-e<2||e-n>-2)return!1;if(n>=7&&n<=14){const s=14-n,r=n===7?1.2:0;return e>=2-s*.65+r&&e<=4+s*.6-r}return(n===17||n===18)&&Math.abs(e-3)<=1.5}const a2=["................","................","...........####.","..........#####.","..........#####.","..........####..","...........##..."],c2=["................","................",".....########...","....#########...","....##.....##...","....#..........."];function l2(i,t){return e=>{const n=new Ai;if(i==="sword"){const o=(l,h)=>{const u=l-h,f=l+h;return f>=14&&f<=16&&u>=-1&&u<=13-Math.abs(f-15)};Bh(n,-4,-8),Bi(n,o,t),Bi(n,(l,h)=>{const u=l-h,f=l+h;return(u===-2||u===-3)&&f>=11&&f<=20},{...t,hi:t.mid,light:t.mid,mid:t.dark,dark:bn(t.dark,t.outline,.4)}),Bi(n,(l,h)=>{const u=l-h,f=l+h;return(u===-9||u===-10)&&f>=14&&f<=17},t),n.emit(e);return}const s={pickaxe:4,axe:6,shovel:4,hoe:6}[i];Bh(n,s);const r=i==="axe"?o2:k0({pickaxe:r2,shovel:a2,hoe:c2}[i]);Bi(n,r,t),n.emit(e)}}const Ha={wooden:Qn("#c9a466","#b8925a","#a5824f","#8b6a3e","#3b2a12"),stone:Qn("#b8b8b8","#a4a4a4","#8a8a8a","#6a6a6a","#2c2c2c"),iron:Qn("#ffffff","#f2f2f2","#d8d8d8","#a9a9a9","#383838"),golden:Qn("#fffbd0","#fbe77a","#f2cf3a","#c99b1b","#4f3604"),diamond:Qn("#e8fffc","#b4fbf3","#5fe0d6","#2aa69e","#0c3f3b")},h2=["................","................","................",".....######.....","....########....","...##########...","...##########...","...##########...","...####..####...","...###....###...","...##......##..."],u2=["................","................","..####....####..",".######..######.",".##############.",".##############.",".##.########.##.","...##########...","...##########...","...##########...","...##########...","...##########...","...##########...","....########...."],f2=["................","................","...##########...","...##########...","...####..####...","...####..####...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###..."],d2=["................","................","................","................","................","................","................","...###....###...","...###....###...","...###....###...","...###....###...","..####...####...","..####...####..."],F0={helmet:h2,chestplate:u2,leggings:f2,boots:d2},p2={helmet:["","","","","","....l...........","","...dddddddddd..."],chestplate:["","","","","......dddd......","..l.............","",".......dd.......",".......dd.......",".......dd.......","","","",""],leggings:["","","....l...........","...dddddddddd..."],boots:["","","","","","","","","","","","","..dddd...dddd..."]},m2={leather:Qn("#b88148","#a46f3a","#8b5a2b","#6a431f","#2e1b0a"),iron:Ha.iron,golden:Ha.golden,diamond:Ha.diamond};function g2(i,t){const e=F0[i],n=p2[i];return s=>{const r=new Ai,o=k0(e);Bi(r,o,t),n.forEach((a,c)=>{for(let l=0;l<a.length;l++)o(l,c)&&a[l]!=="."&&r.put(l,c,a[l]==="d"?t.dark:t.light,t.outline)}),r.emit(s)}}const _2=i=>{const t=new Ai;Bh(t,9,-9),t.emit(i)},B0=["................","................","................",".......abb......",".....aabbbc.....","....abbbcbbc....","....babbbbcc....","...abbbbbcbcd...","...bbcbbbbccd...","...bbbbcbbccd...","....bbbbbccdd...","....cbccccdd....",".....ccddd......"],v2=xe(B0,{a:"#5c5c5c",b:["#3a3a3a","#363636"],c:"#262626",d:"#171717"},"#080808"),x2=xe(B0,{a:"#6a5646",b:["#45382e","#41352b"],c:"#30271f",d:"#1e1813"},"#0c0907"),z0=["................","................","................","................","................","......hhhhhhh...",".....hlllllllr..","....hlllllllrr..","...ffffffffrr...","...mmmmmmmmr....","...dddddddd....."],M2=xe(z0,{h:"#ffffff",l:"#e8e8e8",r:"#9c9c9c",f:"#d4d4d4",m:"#c2c2c2",d:"#8e8e8e"},"#353535"),y2=xe(z0,{h:"#fffbd0",l:"#fbe46a",r:"#c4931a",f:"#f2cf3a",m:"#e3b92b",d:"#b4840f"},"#4f3604"),b2=xe(["................","................","................",".....wwllll.....","....wllbbbbc....","...wlbbbbbbcc...","..llbbbbbbbbcc..","..lbbbbbbbbbcd..","...bbbbbbbbccd..","....bbbbbbccd...",".....bbbbccd....","......bbccd.....",".......bcd......","........d......."],{w:"#ffffff",l:"#b9fbf3",b:"#5fe0d6",c:"#2fb3aa",d:"#1b7f78"},"#0c3f3b"),S2=xe(["................","................","................","........a.......",".......abb......","......abbbc.....",".....abbcbbc....",".....bbbbcbc....","....abbcbbbcc...","....bbbbbcbcc...","....bcbbbbccd...",".....bbcbccdd...","......ccccdd....",".......ddd......"],{a:"#7c7c7c",b:"#525252",c:"#3b3b3b",d:"#272727"},"#0f0f0f");function E2(i,t){const e=new Ai,n=Qn("#ffffff","#e6e6e6","#bdbdbd","#858585","#232323");Bi(e,(s,r)=>{const o=s+.5-10.5,a=r+.5-5.5,c=Math.hypot(o,a);return c>=1.9&&c<=3.7&&!(o<0&&Math.abs(a)<1.5)},n),O0(e,t,["..ab...",".abbc..","abbcbc.","bbcbccd",".bccdd.","..ddd.."],{a:"#7c7c7c",b:"#545454",c:"#3c3c3c",d:"#282828"},"#0f0f0f",2,8),e.emit(i)}const w2=xe(["................","................",".............w..","............w...","...........w....","........www.....",".......w........","......w.........","......w.........",".......gw.......",".........w......",".........w......","........w.......","......wg........","....ww.........."],{w:"#f4f4f4",g:"#cfcfcf"},"#3e3e3e");function T2(i){const t=new Ai,e=N("#f3f3f3"),n=N("#d6d6d6"),s=N("#a7a7a7");for(let r=0;r<si;r++)for(let o=0;o<si;o++){const a=o-r,c=o+r;if(a<-10||a>11)continue;const l=1-Math.abs(a-1)/11,h=Math.round(3.2*Math.sqrt(Math.max(0,l))),u=Math.round(1.6*Math.sqrt(Math.max(0,l)));c===15?t.put(o,r,a<-7?N("#8a8a8a"):s,N("#5a5a5a")):a>-7&&c<15&&15-c<=h?t.put(o,r,(15-c+a)%4===0?n:e,N("#5a5a5a")):a>-7&&c>15&&c-15<=u&&t.put(o,r,n,N("#5a5a5a"))}t.emit(i)}const G0=["................","................","................","................","................","................",".......pp.......",".....pppPpp.....","....pPpppppPp...","...ppppdpPpppp..","..pPpppppppdppp.","..ppdppPpppppp..","...pppppdpppp..."],A2=xe(G0,{p:["#7a7a7a","#6c6c6c","#858585"],P:"#ababab",d:"#454545"},"#262626"),R2=xe(G0,{p:["#ebe8dd","#dcd8cc","#f4f2ea"],P:"#ffffff",d:"#bdb8a8"},"#6b665a");function C2(i){const t=new Ai,e=N("#f2efe6"),n=N("#d3cebf"),s=N("#5f5a4f");for(let r=0;r<si;r++)for(let o=0;o<si;o++){const a=o-r,c=o+r,l=(c===15||c===16)&&Math.abs(a)<=8,h=Math.abs(a)>=8&&Math.abs(a)<=10&&(c>=12&&c<=14||c>=17&&c<=19);(l||h)&&t.put(o,r,c>=16&&!h?n:e,s)}t.emit(i)}function L2(i){const t=new Ai,e=Qn("#ffffff","#dcdcdc","#b0b0b0","#7c7c7c","#262626");Bi(t,(n,s)=>{const r=n-s,o=Math.abs(n+s-15);return r>=8&&r<=11&&o<=11-r+(r===8?1:0)},e);for(let n=0;n<si;n++)for(let s=0;s<si;s++){const r=s-n,o=s+n,a=Math.abs(o-15);o===15&&r>=-11&&r<=7?t.put(s,n,r<-6?N("#5e4424"):N("#7d5c33"),N("#2a1c0b")):a>=1&&a<=2&&r>=-11&&r<=-7-a&&t.put(s,n,o<15?N("#f4f4f4"):N("#c4c4c4"),N("#4a4a4a"))}t.emit(i)}function D2(i){const t=new Ai,e=Qn("#b08a52","#9a7542","#80602f","#5e4520","#24180a");for(let n=0;n<si;n++)for(let s=0;s<si;s++){const r=s-n,o=s+n;if(Math.abs(r)>11)continue;const a=15-9.5*(1-(r/11.5)**2);if(Math.abs(o-a)<=.9){const l=Math.abs(r)<=2;t.put(s,n,l?N("#5a3a1c"):o<a?e.light:e.mid,e.outline)}else o===15&&Math.abs(r)<=9&&t.put(s,n,N("#e6e6e6"),null)}t.emit(i)}const P2=xe(["................","................","................","..LL........LL..","..LMMMMMMMMMMM..","...MMMlMMMMMMM..","...MMMMMMMlMM...","...MlMMMMMMMM...","...MMMMMlMMMD...","...MMMMMMMMMD...","...MMlMMMMMMD...","...MMMMMMMMMMD..","..MMDDD...DDDD..","..DD........DD.."],{L:"#b9803f",M:["#9a5f2c","#94592a"],l:"#a96b33",D:"#764720"},"#331e0b"),I2=xe(["................","................","................","........gg......","......gGgbb.....","....ggbbGbbb....","...gbbbbbblGb...","..gbbGbbbbbbbg..","..bbblbbgbbbbb..","..gbbbbbbbbGbb..","...bbGbbblbbg...","....bbbbgbbb....",".....gbbbbb.....",".......gg......."],{b:["#94563a","#8c5034"],l:"#b0704c",G:"#6f8c35",g:"#55702a"},"#2f1a10"),N2=xe(["................","................","................","................",".........a......","....a....b......","....b.......a...","............b...",".......a........",".......b...ab...","...ab...........","..........a.....",".......a..b.....",".......b........"],{a:"#b9cf62",b:"#7a9832"},"#26300c"),U2=xe(["................","...........E..E.","..........Ee.Ee.",".........eE.eE..","........Ee.Ee.E.",".......eE.eE.eE.",".......s.Ee.Ee..","......s.s..eE...","......ss..s.....",".....ss.ss......","....kkks........","....kks.........","...ss...........","..ss............"],{E:"#f4d872",e:"#cfa640",s:["#b8a046","#a58c38"],k:"#7a5222"},"#3d2c08"),O2=xe(["................","................","................","................","................",".....LLLLLL.....","...LLlLLlLLLL...","..LlLLlLLlLLlL..",".LLLLLLLLLLLLLL.",".MMMMMMMMMMMMMMD",".MMMMMMMMMMMMMD.","..DDDDDDDDDDDD.."],{L:"#c9903f",l:"#ecc26e",M:"#a86e2a",D:"#7a4d1c"},"#3a220c"),k2=xe(["................","................","........S.......",".......SLL......","....rrrSrrr.....","...rRRRrRRRr....","..rRWRRRRRRRr...","..rRWRRRRRRRr...","..rRRRRRRRRRr...","..rRRRRRRRRDr...","...rRRRRRRDr....","...rRRRRRRDr....","....rRRRRDr.....",".....rrrrr......"],{S:"#5a3a1a",L:"#3f9a2a",r:"#b3161b",R:"#d8262b",W:"#ff9a8f",D:"#8a0f13"},{S:"#1f1006",L:"#123a0c","*":"#3a0507"}),H0=["................","................","................","................",".......ffff.....",".....ffpppff....","....fpppPpppf...","...fppPpppppf...","...fpppppPppf...","..fpppPpppppf...","..fppppppppf....","..fpppppppf.....","...ffpppff......",".....fff........"],F2=xe(H0,{f:"#f6dcd6",p:["#ea9aa1","#e5939a"],P:"#c96d78"},"#5a2a2e"),B2=xe(H0,{f:"#e6c48e",p:["#b5783c","#ad7236"],P:"#8a5426"},"#3a210c"),V0=["................","................","................","................","......rrrrr.....","....rrRRrRRrr...","...rRRwRRRRRr...","..rRRRRRRwRRRr..","..rRwRRRRRRRRr..","..rRRRRRRwRRr...","...rRRRRRRRRr...","....rrRRRRrr....","......rrrr......"],z2=xe(V0,{r:"#9a2320",R:["#cc3630","#c4322c"],w:"#f2c8c4"},"#3f0b0a"),G2=xe(V0,{r:"#5e3a1e",R:["#8c5c33","#86572f"],w:"#b88c5a"},"#2a1608"),W0=["................","................","................","........mmmm....",".......mMMMMm...","......mMHMMMMm..","......mMMMMMMm..","......mMMMMMm...",".....bmMMMMm....","....bb.mmmm.....","...bb...........",".bbb............",".bb.............","..b............."],H2=xe(W0,{m:"#d9a493",M:"#f1cbbd",H:"#fff0e8",b:"#f4f0e6"},{b:"#6b665a","*":"#5a3328"}),V2=xe(W0,{m:"#9c6428",M:"#c98a3e",H:"#e8b56a",b:"#f4f0e6"},{b:"#6b665a","*":"#3a210c"}),X0=["................","................","................","......RRRR......","....RRRRRRRr....","...RRwRRRRRRr...","...RRRRRRwRRr...","...RRRRRRRRRr...","....RRRwRRRr....",".....RRRRRr.....","......rrrb......","........bb......","........bbb.....",".........bb....."],W2=xe(X0,{R:["#c23b3b","#ba3636"],r:"#8a2626",w:"#eaa9a1",b:"#efe9dc"},{b:"#6b665a","*":"#3a0c0c"}),X2=xe(X0,{R:["#8f5732","#88522f"],r:"#5e3418",w:"#c48e5c",b:"#efe9dc"},{b:"#6b665a","*":"#2a1608"});function Ll(i){return xe(["................","................","................","......hhhh......","....hh....hh....","...h........h...","...LLLLLLLLLL...","..LiiiiiiiiiiD..","..LLiiiiiiiiDD..","...MMMMMMMMMD...","...LMMMMMMMMD...","....MMMMMMMD....","....LMMMMMMD....",".....MMMMMD....."],{h:"#8a8a8a",L:"#e8e8e8",M:["#c4c4c4","#bcbcbc"],D:"#8c8c8c",i:i??["#4a4a4a","#444444"]},"#2c2c2c")}const Y2=xe(["................","....FFFFFFFF....","....FggFFggf....","....FggFFggf....","....FFFFFFFf....","....FggFFggf....","....FggFFggf....","....FFFFFFFf....","....FPPPPPpf....","....FPPPPPkf....","....FPPPPPpf....","....FFFFFFFf....","....FPPPPPpf....","....FPPPPPpf....","....FFFFFFFf...."],{F:["#b38e58","#ad8853"],f:"#8a6a3c",g:"#3d2c16",P:"#9d7a47",p:"#83633a",k:"#2a2a2a"},"#2e200d"),K2=xe(["................","................","................","................","................","..pppRRRRRRRRR..",".pppRRRRRRRRRR..",".PPPrrrrrrrrrrr.",".wwwrrrrrrrrrrr.",".FFFFFFFFFFFFFF.",".FF..........FF.",".ff..........ff."],{p:"#f4f4f4",P:"#d0d0d0",w:"#bdbdbd",R:"#c63a3b",r:"#9e2327",F:"#bd9862",f:"#94703f"},{p:"#4a4a4a",P:"#4a4a4a",w:"#4a4a4a","*":"#2e0c0c",F:"#3a2a12",f:"#3a2a12"});function q2(i){const t=new Ai,e=Qn("#ffffff","#f0f0f0","#cdcdcd","#9a9a9a","#262626"),n=Qn("#8c8c8c","#787878","#606060","#484848","#161616");Bi(t,(o,a)=>{const c=o-a;return c>=0&&c<=10&&Math.abs(o+a-15.5)<=(c<=5?1.6:1.6-(c-5)*.22)},e);const s=(o,a,c,l)=>Math.max(Math.abs(o-c),Math.abs(a-l))===1;Bi(t,(o,a)=>s(o,a,3,8)||s(o,a,8,13)||a===8&&(o===5||o===6)||o===8&&(a===10||a===11)||o===7&&a===9,n),t.put(7,8,N("#3a3a3a"),n.outline),t.emit(i)}const Y0=["................","................","................","................","................",".......hh.......","......hCCC......",".....hCCCCC.....","....hCCCCCCC....","...hCCCCCCCCD...","...CCCCCCCCDD...","....DDDDDDDD...."],$2=xe(Y0,{h:"#ff6b5e",C:["#cc282c","#c4252a"],D:"#8a1418"},"#3a0507"),j2=xe(Y0,{h:"#fff28a",C:["#f2c81c","#ecc118"],D:"#b8860b"},"#4f3604"),K0={};for(const[i,t]of Object.entries(Ha))for(const e of["pickaxe","axe","shovel","sword","hoe"])K0[`${i}_${e}`]=l2(e,t);const q0={};for(const[i,t]of Object.entries(m2))for(const e of Object.keys(F0))q0[`${i}_${e}`]=g2(e,t);const Z2={stick:_2,coal:v2,charcoal:x2,iron_ingot:M2,gold_ingot:y2,diamond:b2,flint:S2,flint_and_steel:E2,string:w2,feather:T2,gunpowder:A2,bone:C2,bone_meal:R2,arrow:L2,bow:D2,leather:P2,rotten_flesh:I2,wheat_seeds:N2,wheat:U2,bread:O2,apple:k2,porkchop:F2,cooked_porkchop:B2,beef:z2,steak:G2,chicken:H2,cooked_chicken:V2,bucket:Ll(null),water_bucket:Ll(["#2f5fd0","#3a6bd8","#4a7ce0"]),lava_bucket:Ll(["#e8600f","#f8901c","#ffc23a"]),oak_door_item:Y2,bed_item:K2,shears:q2,paper:xe(["................","................","...wwwwwwwwww...","...wwwwwwwwwww..","...wllllllllww..","...wwwwwwwwwww..","..wwlllllllww...","..wwwwwwwwwww...","..wwllllllllw...","..wwwwwwwwwww...","...wllllllllww..","...wwwwwwwwwww..","...wwwwwwwwww...","................","................","................"],{w:["#f6f6f2","#efefe9"],l:"#c8c8c0"},"#5e5e58"),book:xe(["................","...dCCCCCCCCC...","...dCCCCCCCCCc..","...dCcyyyyyCCc..","...dCcyCCCyCCc..","...dCcyyyyyCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dpppppppppp..","....pppppppppp..","................","................"],{C:["#7a3f1c","#84461f"],c:"#9b5a2c",d:"#4a250f",y:"#e9c23a",p:["#f2efe4","#e2ddcc"]},"#2a1607"),red_dye:$2,yellow_dye:j2,mutton:W2,cooked_mutton:X2,...K0,...q0},Od=i=>{for(let t=0;t<We;t++)for(let e=0;e<We;e++)i.set(e,t,e>>3^t>>3?N("#f800f8"):N("#000000"))};function Eu(i,t,e=We,n=We){const s=new g0(e,n);try{(i??Od)(s,Bo(_0(t)))}catch(r){console.error(`Текстура «${t}» не нарисовалась`,r),Od(s)}return s}function J2(){const i=Pr.length,t=new Uint8Array(i*We*We*4),e=Pr.map((n,s)=>{const r=Eu(e2[n],n);return t.set(r.px,s*We*We*4),r});return{data:t,count:i,tiles:e}}const kd=new Map;function $0(i){let t=kd.get(i);return t||kd.set(i,t=Eu(Z2[i],i)),t}const Fd=new WeakMap,_r=i=>{let t=Fd.get(i);return t||Fd.set(i,t=_c(i)),t},Bd=new Map;function wu(i,t){const e=Bd.get(t);if(e)return e;const n=64,s=document.createElement("canvas");s.width=s.height=n;const r=s.getContext("2d",{willReadFrequently:!0});r.imageSmoothingEnabled=!1;const o=pe(t);if(o&&ms(t)){const c=dn[t],l=h=>i.tiles[Rn[t*384+h]];if(c===Wr||c===Uo||c===Yr||c===Kr||c===Kh||c===$h||c===dp||c===jh)r.drawImage(_r(l(0)),4,4,56,56);else if(c===hc){const h=_r(l(0));for(const[u,f,d,m]of[[6,10,8,46],[50,10,8,46],[14,18,36,8],[14,38,36,8],[28,26,8,12]])r.drawImage(h,u/4,f/4,d/4,m/4,u,f,d,m)}else{const h=c===go?.5:c===up?.9375:c===Ol?.875:1,u=c===fp||c===Ol||c===qh?4:0;tE(r,_r(l(2)),_r(l(4)),_r(l(0)),h,u)}}else o!=null&&o.sprite&&r.drawImage(_r($0(o.sprite)),4,4,56,56);r.setTransform(1,0,0,1,0,0);const a=s.toDataURL();return Bd.set(t,a),a}function Q2(i,t){let e=0;const n=r=>typeof requestIdleCallback=="function"?requestIdleCallback(r,{timeout:1e3}):setTimeout(()=>r({timeRemaining:()=>6}),30),s=r=>{const o=performance.now();for(;e<t.length&&(r.timeRemaining()>2||performance.now()-o<3);)wu(i,t[e++]);e<t.length&&n(s)};n(s)}function tE(i,t,e,n,s,r){const o=(1-s)*32,a=(64-r*2)/64,c=r,l=(h,u,f,d)=>{i.setTransform(u[0]*a,u[1]*a,u[2]*a,u[3]*a,c+u[4]*a,r+u[5]*a),i.globalCompositeOperation="source-over",d?i.drawImage(h,0,We*(1-s),We,We*s,0,0,We,We*s):i.drawImage(h,0,0),f>0&&(i.globalCompositeOperation="source-atop",i.fillStyle=`rgba(0,0,0,${f})`,i.fillRect(0,0,We,d?We*s:We))};l(t,[2,-1,2,1,0,16+o],0,!1),l(e,[2,1,0,2,0,16+o],.22,!0),l(n,[2,-1,0,2,32,32+o],.42,!0),i.globalCompositeOperation="source-over"}const zd=new Map;function Gd(i){let t=zd.get(i);if(!t){const e=Eu(s2[i],i,Ad,Ad);t=_c(e).toDataURL(),zd.set(i,t)}return t}function eE(i,t,e=0){const n=_c(i.tiles[Zh(t)]);if(e){const s=n.getContext("2d");s.fillStyle=`rgba(0,0,0,${e})`,s.fillRect(0,0,We,We)}return n.toDataURL()}const nE={menu:"menu",loading:"loading",pause:"pause",death:"death",inventory:"inventory-screen",disconnected:"disconnected"},iE=80,sE=1e4,Mt=i=>document.getElementById(i);function Va(i,t,e){var o;const n=t?`${t.id}:${t.count}:${t.dmg??0}`:"";if(i.dataset.key===n||(i.dataset.key=n,i.replaceChildren(),!t))return;const s=document.createElement("img");if(s.src=wu(e,t.id),s.alt="",s.draggable=!1,i.append(s),t.count>1){const a=document.createElement("span");a.className="count",a.textContent=String(t.count),i.append(a)}const r=(o=pe(t.id))==null?void 0:o.durability;if(r&&t.dmg){const a=1-t.dmg/r,c=document.createElement("span");c.className="dur";const l=document.createElement("i");l.style.width=`${Math.round(a*100)}%`,l.style.background=`hsl(${Math.round(a*120)}, 90%, 50%)`,c.append(l),i.append(c)}}class rE{constructor(t){C(this,"itemNameTimer",0);C(this,"hudKey","");this.atlas=t}show(t){for(const[e,n]of Object.entries(nE))Mt(n).hidden=e!==t}setHud(t){Mt("hud").hidden=!t}setLoading(t){Mt("loading-bar").style.width=`${Math.round(Math.max(0,Math.min(1,t))*100)}%`}renderHotbar(t,e){const n=Mt("hotbar");n.childElementCount!==9&&n.replaceChildren(...Array.from({length:9},(s,r)=>{const o=document.createElement("div");return o.className="slot",o.addEventListener("pointerdown",a=>{a.stopPropagation(),e(r)}),o})),Array.from(n.children).forEach((s,r)=>{s.classList.toggle("selected",r===t.selected),Va(s,t.slots[r],this.atlas)})}setStatus(t,e,n,s,r,o){const a=`${Math.ceil(t)}|${e}|${n}|${Math.ceil(s)}|${r}|${o}`;if(a===this.hudKey)return;this.hudKey=a;const c=r==="survival";if(Mt("status").style.visibility=c?"visible":"hidden",!c)return;const l=(f,d,m,_,g,p=!0)=>{const M=Mt(f);if(M.replaceChildren(),!!p)for(let S=0;S<10;S++){const v=d-S*2,E=v>=2?m:v===1?_:g;if(!E)continue;const w=document.createElement("i");w.style.backgroundImage=`url(${Gd(E)})`,M.append(w)}};l("hearts",Math.ceil(t),"heart_full","heart_half","heart_empty"),l("food",e,"food_full","food_half","food_empty"),l("armor-bar",n,"armor_full","armor_half","armor_empty",n>0);const h=Math.ceil(s/15*10),u=Mt("air");if(u.replaceChildren(),s<15)for(let f=0;f<h;f++){const d=document.createElement("i");d.style.backgroundImage=`url(${Gd(f===h-1&&s%1.5<.4?"bubble_pop":"bubble")})`,u.append(d)}Mt("hearts").classList.toggle("shake",o)}flashItemName(t){const e=Mt("item-name");e.textContent=t?Wm(t):"",e.classList.add("show"),clearTimeout(this.itemNameTimer),this.itemNameTimer=window.setTimeout(()=>e.classList.remove("show"),1600)}addChat(t,e,n){const s=document.createElement("div");if(s.className="chat-line"+(t?"":" system"),t){const o=document.createElement("b");o.textContent=`<${t}> `,e&&(o.style.color=e),s.append(o)}s.append(document.createTextNode(n));const r=Mt("chat-log");for(r.append(s);r.childElementCount>iE;)r.firstElementChild.remove();r.scrollTop=r.scrollHeight,setTimeout(()=>s.classList.add("faded"),sE)}openChat(t){Mt("chat").classList.add("open"),Mt("chat-form").hidden=!1;const e=Mt("chat-input");e.value=t,setTimeout(()=>e.focus(),0)}closeChat(){Mt("chat").classList.remove("open"),Mt("chat-form").hidden=!0,Mt("chat-input").blur()}setPlayerList(t){const e=Mt("player-list");if(e.hidden=!t,!t)return;const n=document.createElement("div");n.textContent=`Игроки онлайн: ${t.length}`,e.replaceChildren(n,...t.map(s=>{const r=document.createElement("div"),o=document.createElement("i");return o.style.background=s.color,r.append(o,document.createTextNode(s.name)),r}))}setDebug(t){const e=Mt("debug");e.hidden=t===null,t!==null&&(e.textContent=t)}setUnderwater(t){Mt("underwater").classList.toggle("on",t)}setSleeping(t){Mt("sleep-overlay").classList.toggle("on",t)}get isSleeping(){return Mt("sleep-overlay").classList.contains("on")}}const Hd="minecraft:recipe-book",Vd=[{key:"all",name:"Все",filter:()=>!0},{key:"blocks",name:"Блоки",filter:i=>ms(i)},{key:"tools",name:"Инструменты",filter:i=>{var t,e;return!!((t=pe(i))!=null&&t.tool)||!!((e=pe(i))!=null&&e.armor)||[263,269,270,283,284,285,288].includes(i)}},{key:"food",name:"Еда",filter:i=>{var t;return!!((t=pe(i))!=null&&t.food)}},{key:"misc",name:"Разное",filter:i=>{var t,e,n;return!ms(i)&&!((t=pe(i))!=null&&t.tool)&&!((e=pe(i))!=null&&e.armor)&&!((n=pe(i))!=null&&n.food)}}];class oE{constructor(t,e,n,s){C(this,"kind",null);C(this,"cursor",null);C(this,"craft",Ar(9));C(this,"craftW",2);C(this,"container",null);C(this,"panel",Mt("inventory-panel"));C(this,"cursorEl",Mt("cursor-item"));C(this,"tooltip",Mt("tooltip"));C(this,"slots",[]);C(this,"tab","all");C(this,"pointer",{x:0,y:0});C(this,"longPress",0);C(this,"longPressed",!1);C(this,"lastTap",{el:null,time:0});C(this,"book",Mt("recipe-book"));C(this,"bookOpen",!0);C(this,"bookAll",!1);C(this,"bookKey","");C(this,"bookRecipes",[]);C(this,"onPointerDown",t=>{const e=t.target.closest(".slot");if(e){if(t.preventDefault(),this.pointer={x:t.clientX,y:t.clientY},t.pointerType==="touch"){this.longPressed=!1,clearTimeout(this.longPress),this.longPress=window.setTimeout(()=>{this.longPressed=!0,this.click(e,!0,!1)},420);return}this.click(e,t.button===2,t.shiftKey)}});C(this,"onPointerUp",t=>{if(t.pointerType!=="touch")return;clearTimeout(this.longPress);const e=t.target.closest(".slot");if(!e||this.longPressed)return;const n=performance.now(),s=this.lastTap.el===e&&n-this.lastTap.time<320;this.lastTap={el:e,time:n},s?(this.click(e,!1,!1),this.click(e,!1,!0)):this.click(e,!1,!1)});this.atlas=t,this.inv=e,this.h=n,this.mode=s;const r=Mt("inventory-screen");try{this.bookOpen=localStorage.getItem(Hd)!=="0"}catch{}this.setupBook(),this.panel.addEventListener("contextmenu",o=>o.preventDefault()),r.addEventListener("contextmenu",o=>o.preventDefault()),this.panel.addEventListener("pointerdown",this.onPointerDown),this.panel.addEventListener("pointerup",this.onPointerUp),this.panel.addEventListener("pointercancel",()=>clearTimeout(this.longPress)),r.addEventListener("pointermove",o=>{this.pointer={x:o.clientX,y:o.clientY},this.placeFloating()}),r.addEventListener("pointerdown",o=>{this.panel.contains(o.target)||this.book.contains(o.target)||this.cursor&&(o.button===2?(this.h.drop({...this.cursor,count:1}),this.cursor=this.cursor.count>1?{...this.cursor,count:this.cursor.count-1}:null):(this.h.drop(this.cursor),this.cursor=null),this.render())}),this.panel.addEventListener("pointerover",o=>{const a=o.target.closest(".slot");if(!a||o.pointerType==="touch")return this.hideTooltip();const c=this.stackOf(a);if(!c)return this.hideTooltip();const l=pe(c.id);let h=(l==null?void 0:l.name)??"";l!=null&&l.durability&&(h+=` (${l.durability-(c.dmg??0)}/${l.durability})`),this.tooltip.textContent=h,this.tooltip.hidden=!1,this.placeFloating()}),this.panel.addEventListener("pointerout",()=>this.hideTooltip())}get isOpen(){return this.kind!==null}get openContainerId(){var t;return((t=this.container)==null?void 0:t.cid)??null}open(t,e){this.returnCraft(),this.kind=t,this.container=e??null,this.craftW=t==="crafting"?3:2,this.build(),this.render()}close(){this.kind&&(this.returnCraft(),this.cursor&&(this.giveBack(this.cursor),this.cursor=null),this.kind=null,this.container=null,this.book.hidden=!0,this.cursorEl.hidden=!0,this.hideTooltip(),this.inv.changed(),this.h.close())}giveBack(t){const e=ui(this.inv.slots,{...t});e>0&&this.h.drop({...t,count:e})}returnCraft(){for(let t=0;t<this.craft.length;t++){const e=this.craft[t];e&&this.giveBack(e),this.craft[t]=null}}setContainerSlot(t,e,n){var s;((s=this.container)==null?void 0:s.cid)===t&&(this.container.slots[e]=n,this.render())}setProgress(t,e,n,s){var a;if(((a=this.container)==null?void 0:a.cid)!==t)return;this.container.burn=e,this.container.burnMax=n,this.container.cook=s;const r=this.panel.querySelector(".flame"),o=this.panel.querySelector(".cook-arrow");r&&r.style.setProperty("--burn",`${n?Math.round(e/n*100):0}%`),o&&o.style.setProperty("--cook",`${Math.round(s/200*100)}%`)}containerClosed(t){var e;((e=this.container)==null?void 0:e.cid)===t&&this.close()}refresh(){this.kind&&this.render()}slot(t,e,n){const s=document.createElement("div");return s.className="slot",s.dataset.g=t,s.dataset.i=String(e),n==null||n(s),this.slots.push(s),s}grid(t,e,n,s){const r=document.createElement("div");r.className="inv-grid",r.style.gridTemplateColumns=`repeat(${s}, var(--slot))`;for(let o=0;o<n;o++)r.append(this.slot(t,e+o));return r}title(t){const e=document.createElement("div");return e.className="inv-title",e.textContent=t,e}playerSection(){const t=this.grid("main",Fi,Tr-Fi,9),e=this.grid("hotbar",0,Fi,9);return e.style.marginTop="6px",[this.title("Инвентарь"),t,e]}craftingRow(){const t=document.createElement("div");t.className="inv-row";const e=document.createElement("div");e.className="craft-grid",e.style.gridTemplateColumns=`repeat(${this.craftW}, var(--slot))`;for(let o=0;o<this.craftW*this.craftW;o++)e.append(this.slot("craft",o));const n=document.createElement("div");n.className="arrow",n.textContent="➜";const s=document.createElement("button");s.className="book-toggle",s.title="Книга рецептов";const r=document.createElement("img");return r.src=wu(this.atlas,j.BOOK),r.alt="Рецепты",s.append(r),s.onclick=()=>{this.bookOpen=!this.bookOpen;try{localStorage.setItem(Hd,this.bookOpen?"1":"0")}catch{}this.bookKey="",this.renderBook()},t.append(e,n,this.slot("out",0),s),t}build(){this.slots=[];const t=[];switch(this.kind){case"inventory":{const e=document.createElement("div");e.className="inv-row";const n=document.createElement("div");n.className="inv-col";for(let r=0;r<4;r++)n.append(this.slot("armor",r));const s=document.createElement("div");if(s.className="inv-col",s.append(this.title("Создание"),this.craftingRow()),e.append(n,s),t.push(e,...this.playerSection()),this.mode()==="creative"){const r=document.createElement("button");r.className="mc-button small",r.textContent="Творческий инвентарь",r.onclick=()=>this.open("creative"),t.push(r)}break}case"crafting":t.push(this.title("Верстак"),this.craftingRow(),...this.playerSection());break;case"chest":t.push(this.title("Сундук"),this.grid("cont",0,27,9),...this.playerSection());break;case"furnace":{const e=document.createElement("div");e.className="furnace-ui";const n=document.createElement("div");n.className="inv-col";const s=document.createElement("div");s.className="flame",n.append(this.slot("cont",0),s,this.slot("cont",1));const r=document.createElement("div");r.className="cook-arrow",e.append(n,r,this.slot("cont",2)),t.push(this.title("Печь"),e,...this.playerSection());break}case"creative":{const e=document.createElement("div");e.className="creative-tabs";for(const a of Vd){const c=document.createElement("button");c.textContent=a.name,c.className=a.key===this.tab?"active":"",c.onclick=()=>{this.tab=a.key,this.build(),this.render()},e.append(c)}const n=document.createElement("button");n.textContent="Инвентарь",n.onclick=()=>this.open("inventory"),e.append(n);const s=document.createElement("div");s.className="creative-grid";const r=Vd.find(a=>a.key===this.tab).filter;yp.filter(r).forEach(a=>s.append(this.slot("creative",a)));const o=document.createElement("div");o.className="inv-row",o.append(this.grid("hotbar",0,Fi,9),this.slot("trash",0,a=>a.classList.add("trash"))),t.push(this.title("Творческий режим"),e,s,o);break}}this.panel.replaceChildren(...t),this.kind==="furnace"&&this.container&&this.setProgress(this.container.cid,this.container.burn??0,this.container.burnMax??0,this.container.cook??0)}output(){var e;const t=this.craftW===3?this.craft:[this.craft[0],this.craft[1],this.craft[2],this.craft[3]];return((e=Kb(t,this.craftW))==null?void 0:e.result)??null}stackOf(t){var n;const e=Number(t.dataset.i);switch(t.dataset.g){case"main":case"hotbar":return this.inv.slots[e];case"armor":return this.inv.armor[e];case"craft":return this.craft[e];case"out":return this.output();case"cont":return((n=this.container)==null?void 0:n.slots[e])??null;case"creative":return Fe(e,1);default:return null}}render(){for(const t of this.slots)Va(t,this.stackOf(t),this.atlas);this.cursorEl.hidden=!this.cursor,Va(this.cursorEl,this.cursor,this.atlas),this.placeFloating(),this.renderBook()}setupBook(){this.book.addEventListener("contextmenu",t=>t.preventDefault()),this.book.addEventListener("pointerdown",t=>{const e=t.target.closest(".slot[data-r]");if(!e)return;t.preventDefault();const n=this.bookRecipes[Number(e.dataset.r)];n&&this.fillRecipe(n,t.shiftKey||t.button===2)}),this.book.addEventListener("pointerover",t=>{var r;const e=t.target.closest(".slot[data-r]");if(!e||t.pointerType==="touch")return this.hideTooltip();const n=this.bookRecipes[Number(e.dataset.r)];if(!n)return this.hideTooltip();let s=((r=pe(n.result.id))==null?void 0:r.name)??"";vl(n,this.craftW)?ud(n,[...this.inv.slots,...this.craft])||(s+=" — не хватает материалов"):s+=" — нужен верстак",this.tooltip.textContent=s,this.tooltip.hidden=!1,this.placeFloating()}),this.book.addEventListener("pointerout",()=>this.hideTooltip())}renderBook(){const t=(this.kind==="inventory"||this.kind==="crafting")&&this.bookOpen;if(this.book.hidden=!t,!t)return;const e=[...this.inv.slots,...this.craft],n=Ro.map(l=>({r:l,fits:!!vl(l,this.craftW),ok:ud(l,e)})).filter(l=>this.bookAll||l.ok).sort((l,h)=>Number(h.ok&&h.fits)-Number(l.ok&&l.fits)||Number(h.ok)-Number(l.ok)),s=`${this.craftW}|${this.bookAll}|${n.map(l=>`${Ro.indexOf(l.r)}${l.ok?1:0}${l.fits?1:0}`).join(",")}`;if(s===this.bookKey)return;this.bookKey=s,this.bookRecipes=n.map(l=>l.r);const r=document.createElement("div");r.className="inv-title",r.textContent="Рецепты";const o=document.createElement("label"),a=document.createElement("input");a.type="checkbox",a.checked=this.bookAll,a.onchange=()=>{this.bookAll=a.checked,this.renderBook()},o.append(a,"Показать все");const c=document.createElement("div");if(c.className="recipe-grid",n.forEach((l,h)=>{const u=document.createElement("div");u.className=`slot${l.ok&&l.fits?" ready":" locked"}`,u.dataset.r=String(h),Va(u,l.r.result,this.atlas),c.append(u)}),!n.length){const l=document.createElement("div");l.className="empty",l.textContent="Пока ничего — добудьте дерево (бейте ствол дерева)",c.append(l)}this.book.replaceChildren(r,o,c)}fillRecipe(t,e){const n=vl(t,this.craftW);if(n){this.returnCraft();for(let s=0;s<(e?64:1);s++){const r=this.inv.slots.map(c=>c?{...c}:null),o=this.craft.map(c=>c?{...c}:null);let a=!0;for(let c=0;c<n.length&&a;c++){const l=n[c];if(l===null)continue;const h=o[c];if(h&&h.count>=hs(h.id)){a=!1;break}const u=r.findIndex(d=>!!d&&(h?d.id===h.id:Wb(l,d.id)));if(u<0){a=!1;break}const f=r[u];r[u]=f.count>1?{...f,count:f.count-1}:null,o[c]=h?{...h,count:h.count+1}:{...f,count:1}}if(!a)break;r.forEach((c,l)=>this.inv.slots[l]=c),o.forEach((c,l)=>this.craft[l]=c)}this.h.sound("click"),this.inv.changed(),this.render()}}placeFloating(){this.cursorEl.style.left=`${this.pointer.x}px`,this.cursorEl.style.top=`${this.pointer.y}px`,this.tooltip.style.left=`${this.pointer.x+16}px`,this.tooltip.style.top=`${this.pointer.y-30}px`}hideTooltip(){this.tooltip.hidden=!0}click(t,e,n){const s=t.dataset.g,r=Number(t.dataset.i),o=this.container?this.container.slots.map(a=>a?{...a}:null):null;switch(s){case"main":case"hotbar":n?this.quickFromInventory(r):this.cursor=Aa(this.inv.slots,r,this.cursor,e);break;case"armor":if(n){const a=this.inv.armor[r];a&&ui(this.inv.slots,{...a})===0&&(this.inv.armor[r]=null)}else this.cursor=Aa(this.inv.armor,r,this.cursor,e,a=>{var c,l;return((l=(c=pe(a.id))==null?void 0:c.armor)==null?void 0:l.slot)===r});break;case"craft":if(n){const a=this.craft[r];if(a){const c=ui(this.inv.slots,{...a});this.craft[r]=c>0?{...a,count:c}:null}}else this.cursor=Aa(this.craft,r,this.cursor,e);break;case"out":this.takeOutput(n);break;case"cont":{if(!this.container)break;const a=this.container.slots;if(n){const c=a[r];if(c){const l=ui(this.inv.slots,{...c});a[r]=l>0?{...c,count:l}:null}}else{const c=this.container.kind==="furnace"&&r===2;this.cursor=c?this.takeOnly(a,r):Aa(a,r,this.cursor,e)}break}case"creative":{const a=hs(r);n?ui(this.inv.slots,Fe(r,a)):this.cursor&&this.cursor.id===r&&!e?this.cursor={...this.cursor,count:Math.min(a,this.cursor.count+1)}:this.cursor?this.cursor=null:this.cursor=Fe(r,e?1:a);break}case"trash":this.cursor=null;break}this.container&&o&&this.container.slots.forEach((a,c)=>{const l=o[c];!a&&!l||a&&l&&a.id===l.id&&a.count===l.count&&(a.dmg??0)===(l.dmg??0)||this.h.containerSlot(this.container.cid,c,a)}),this.h.sound("click"),this.inv.changed(),this.render()}takeOnly(t,e){const n=t[e];return n?this.cursor?this.cursor.id===n.id&&this.cursor.count+n.count<=hs(n.id)?(t[e]=null,{...this.cursor,count:this.cursor.count+n.count}):this.cursor:(t[e]=null,n):this.cursor}quickFromInventory(t){var c;const e=this.inv.slots[t];if(!e)return;const n=(l,h)=>{const u=ui(l,{...e},h);this.inv.slots[t]=u>0?{...e,count:u}:null};if(this.kind==="chest"&&this.container)return n(this.container.slots,Array.from({length:27},(l,h)=>h));if(this.kind==="furnace"&&this.container){if($b[e.id])return n(this.container.slots,[0]);if(jb(e.id)>0)return n(this.container.slots,[1])}const s=(c=pe(e.id))==null?void 0:c.armor;if(this.kind==="inventory"&&s&&!this.inv.armor[s.slot]){this.inv.armor[s.slot]=e,this.inv.slots[t]=null;return}if(this.kind==="creative")return;const r=t<Fi?Array.from({length:27},(l,h)=>h+9):Array.from({length:9},(l,h)=>h),o={...e};this.inv.slots[t]=null;const a=ui(this.inv.slots,o,r);a>0&&(this.inv.slots[t]={...e,count:a})}takeOutput(t){for(let e=0;e<(t?64:1);e++){const n=this.output();if(!n)return;if(t){const r=this.inv.slots.map(o=>o?{...o}:null);if(ui(r,{...n})>0)return;ui(this.inv.slots,{...n})}else{if(this.cursor&&(this.cursor.id!==n.id||this.cursor.count+n.count>hs(n.id)))return;this.cursor=this.cursor?{...this.cursor,count:this.cursor.count+n.count}:{...n}}const s=this.craftW*this.craftW;for(let r=0;r<s;r++){const o=this.craft[r];o&&(this.craft[r]=o.count>1?{...o,count:o.count-1}:null)}this.h.sound("pop")}}}function aE(i){const t=-Math.sin(i),e=-Math.cos(i);return Math.abs(t)>Math.abs(e)?t>0?1:3:e>0?2:0}function Dl(i,t){return i>0?1:i<0?3:t>0?2:0}function cE(i,t,e,n){const s=pe(i);if(!(s!=null&&s.places))return null;const r=Xt(s.places),o=dn[r],a=t.state&Ge,c=aE(e),l=t.py-Math.floor(t.py);if(o===go&&a===r){const g=Ms(t.state)&1;if(t.ny===1&&g===0||t.ny===-1&&g===1)return{x:t.x,y:t.y,z:t.z,state:ti(Gu[r]??r)}}let h=t.x+t.nx,u=t.y+t.ny,f=t.z+t.nz;Sr[a]&&a!==A.AIR&&(h=t.x,u=t.y,f=t.z);const d=n(h,u,f),m=Xt(d);if(o===go&&m===r)return{x:h,y:u,z:f,state:ti(Gu[r]??r)};if(!Sr[m])return null;let _=0;switch(r){case A.OAK_LOG:case A.BIRCH_LOG:case A.SPRUCE_LOG:_=t.nx!==0?1:t.nz!==0?2:0;break;case A.FURNACE:case A.CHEST:case A.PUMPKIN:case A.JACK_O_LANTERN:_=yr(c);break}switch(o){case go:_=t.ny===-1||t.ny===0&&l>.5?1:0;break;case hp:_=c|(t.ny===-1||t.ny===0&&l>.5?4:0);break;case Yr:{if(t.ny===-1)return null;if(t.ny===1){if(!un[Xt(n(h,u-1,f))])return null;_=0}else if(_=1+yr(Dl(t.nx,t.nz)),!un[a])return null;break}case Kr:if(t.ny!==0||!un[a])return null;_=yr(Dl(t.nx,t.nz));break;case Kh:if(_=c,!Sr[Xt(n(h,u+1,f))]||!je[Xt(n(h,u-1,f))].fullCube)return null;break;case jh:t.ny===0?_=yr(Dl(t.nx,t.nz))|(l>.5?8:0):_=yr(c)|(t.ny===-1?8:0);break;case hc:_=c;break;case $h:{_=c;const[g,,p]=Po[c];if(!Sr[Xt(n(h+g,u,f+p))]||!je[Xt(n(h,u-1,f))].solid||!je[Xt(n(h+g,u-1,f+p))].solid)return null;break}}return r===A.WHEAT&&Xt(n(h,u-1,f))!==A.FARMLAND||r===A.SUGAR_CANE&&!km(n,h,u,f)?null:{x:h,y:u,z:f,state:ti(r,_)}}function lE(i){const t=Xt(i);return t===A.CRAFTING_TABLE||t===A.CHEST||t===A.FURNACE||t===A.LIT_FURNACE||t===A.OAK_DOOR||t===A.OAK_TRAPDOOR||t===A.OAK_FENCE_GATE||t===A.BED}function hE(i){const t=Xt(i.state),e=Ms(i.state);if(t===A.OAK_DOOR)return[{x:i.x,y:i.y+1,z:i.z,state:ti(A.OAK_DOOR,e&3|8)}];if(t===A.BED){const[n,,s]=Po[e&3];return[{x:i.x+n,y:i.y,z:i.z+s,state:ti(A.BED,e&3|4)}]}return[]}const uE=.6,fE=1.8,dE=1.62,pE=1.54,Wd=32,mE=8.6,gE={fall:"разбивается насмерть",drown:"тонет",lava:"сгорает в лаве",fire:"сгорает",starve:"умирает от голода",void:"падает в пустоту",kill:"погибает",зомби:"погибает от зомби",скелет:"погибает от стрелы скелета",стрела:"погибает от стрелы",паук:"погибает от паука",крипер:"взрывается из-за крипера",динамит:"взрывается"};class _E{constructor(t){C(this,"x",0);C(this,"y",0);C(this,"z",0);C(this,"vx",0);C(this,"vy",0);C(this,"vz",0);C(this,"width",uE);C(this,"height",fE);C(this,"onGround",!1);C(this,"collidedH",!1);C(this,"yaw",0);C(this,"pitch",0);C(this,"mode","survival");C(this,"flying",!1);C(this,"sneaking",!1);C(this,"sprinting",!1);C(this,"inWater",!1);C(this,"inLava",!1);C(this,"eyeInWater",!1);C(this,"onLadder",!1);C(this,"alive",!0);C(this,"sleeping",!1);C(this,"hp",20);C(this,"food",20);C(this,"saturation",5);C(this,"exhaustion",0);C(this,"air",15);C(this,"fire",0);C(this,"fallDistance",0);C(this,"hurtCooldown",0);C(this,"regenTimer",0);C(this,"starveTimer",0);C(this,"drownTimer",0);C(this,"fireTimer",0);C(this,"lavaTimer",0);C(this,"walkDistance",0);C(this,"speed",0);C(this,"lastCause","kill");C(this,"onHurt",()=>{});C(this,"onDeath",()=>{});C(this,"onStep",()=>{});C(this,"onLand",()=>{});C(this,"onSplash",()=>{});C(this,"armorPoints",()=>0);this.world=t}get eyeHeight(){return this.sneaking&&!this.flying?pE:dE}get survival(){return this.mode==="survival"}setPosition(t,e,n){this.x=t,this.y=e,this.z=n,this.vx=this.vy=this.vz=0,this.fallDistance=0}update(t,e){if(!this.alive||this.sleeping)return;this.hurtCooldown=Math.max(0,this.hurtCooldown-t);const n=this.inWater,s=My(this.world,this,this.eyeHeight);this.inWater=s.inWater,this.inLava=s.inLava,this.eyeInWater=s.eyeInWater,this.onLadder=s.onLadder,this.inWater&&!n&&this.vy<-4&&this.onSplash(),this.mode!=="creative"&&(this.flying=!1),this.sneaking=e.sneak&&!this.flying;const r=e.forward!==0||e.strafe!==0;this.sprinting=e.sprint&&e.forward>0&&!this.sneaking&&(this.food>6||!this.survival);const o=Math.sin(this.yaw),a=Math.cos(this.yaw);let c=-o*e.forward+a*e.strafe,l=-a*e.forward-o*e.strafe;const h=Math.hypot(c,l);h>1&&(c/=h,l/=h);let u=this.sprinting?5.612:4.317;this.sneaking&&(u=1.3);let f=this.onGround?14:2.6;this.flying?(u=this.sprinting?21.6:10.9,f=8):(this.inWater||this.inLava)&&(u=this.inLava?1.2:this.sprinting?3:2.1,f=6);const d=1-Math.exp(-f*t);this.vx+=(c*u-this.vx)*d,this.vz+=(l*u-this.vz)*d;let m=!1;if(this.flying){const L=((e.jump?1:0)-(e.sneak?1:0))*(this.sprinting?12:8);this.vy+=(L-this.vy)*(1-Math.exp(-10*t))}else this.onLadder?e.jump||r&&this.collidedH?this.vy=2.6:this.sneaking?this.vy=0:this.vy=Math.max(this.vy-Wd*t,-2.6):this.inWater||this.inLava?(this.vy-=(this.inLava?6:10)*t,this.vy*=Math.exp(-2.5*t),e.jump&&(this.vy=Math.min(this.vy+28*t,this.inLava?2:3.6)),e.sneak&&(this.vy=Math.max(this.vy-20*t,-3.6)),e.jump&&this.collidedH&&!this.eyeInWater&&(this.vy=6.5),this.vy=Math.max(this.vy,-5)):(this.vy=Math.max(this.vy-Wd*t,-78),e.jump&&this.onGround&&(this.vy=mE,m=!0,this.sprinting&&(this.vx+=c*2,this.vz+=l*2)));let _=this.vx*t,g=this.vz*t;this.sneaking&&this.onGround&&!this.flying&&([_,g]=xy(this.world,this,_,g));const p=Math.max(Math.abs(_),Math.abs(this.vy*t),Math.abs(g)),M=Math.max(1,Math.ceil(p/.35)),S=this.x,v=this.z,E=this.y,w=this.onGround;for(let L=0;L<M;L++)vy(this.world,this,_/M,this.vy*t/M,g/M,this.flying?0:.6);this.flying&&this.onGround&&!e.jump&&(this.flying=!1);const b=Math.hypot(this.x-S,this.z-v);if(this.speed=b/Math.max(t,1e-4),this.onGround&&!this.flying){const L=Math.floor(this.walkDistance/2.2);this.walkDistance+=b,Math.floor(this.walkDistance/2.2)!==L&&!this.sneaking&&this.onStep()}else this.onLadder&&(this.walkDistance+=Math.abs(this.y-E)*.8);if(this.survival&&(this.exhaustion+=b*(this.sprinting?.1:this.inWater?.015:.01),m&&(this.exhaustion+=this.sprinting?.2:.05)),this.flying||this.inWater||this.onLadder||!this.survival?this.fallDistance=0:this.y<E&&(this.fallDistance+=E-this.y),this.onGround&&!w){this.fallDistance>1.5&&this.onLand(this.fallDistance);const L=Math.ceil(this.fallDistance-3);L>0&&this.damage(L,"fall"),this.fallDistance=0}this.y<-40&&this.damage(4*t*10,"void"),this.survivalTick(t)}survivalTick(t){if(!this.survival){this.air=15,this.fire=0;return}for(this.eyeInWater?(this.air-=t,this.air<=0&&(this.air=0,this.drownTimer+=t,this.drownTimer>=1&&(this.drownTimer=0,this.damage(2,"drown")))):this.air=Math.min(15,this.air+t*5),this.inLava&&(this.fire=8,this.lavaTimer+=t,this.lavaTimer>=.5&&(this.lavaTimer=0,this.damage(4,"lava"))),this.inWater&&(this.fire=0),this.fire>0&&(this.fire-=t,this.fireTimer+=t,this.fireTimer>=1&&(this.fireTimer=0,this.damage(1,"fire")));this.exhaustion>=4;)this.exhaustion-=4,this.saturation>0?this.saturation=Math.max(0,this.saturation-1):this.food=Math.max(0,this.food-1);this.food>=18&&this.hp<20?(this.regenTimer+=t,this.regenTimer>=4&&(this.regenTimer=0,this.hp=Math.min(20,this.hp+1),this.exhaustion+=3)):this.regenTimer=0,this.food<=0&&(this.starveTimer+=t,this.starveTimer>=4&&(this.starveTimer=0,this.hp>1&&this.damage(1,"starve")))}damage(t,e,n=0,s=0){if(!this.alive||!this.survival&&e!=="kill"&&e!=="void"||this.hurtCooldown>0&&e!=="kill"&&e!=="void")return;const r=!["fall","drown","starve","void","kill","fire","lava"].includes(e);let o=t;r&&(o*=1-Math.min(20,this.armorPoints())/25),this.hp=Math.max(0,this.hp-o),this.hurtCooldown=.5,this.exhaustion+=.1,this.lastCause=e,this.sleeping=!1,(n||s)&&(this.vx+=n*5,this.vz+=s*5,this.vy=Math.max(this.vy,4.5)),this.onHurt(o,e),this.hp<=0&&(this.alive=!1,this.onDeath(e))}eat(t,e){this.food=Math.min(20,this.food+t),this.saturation=Math.min(this.food,this.saturation+e)}addExhaustion(t){this.survival&&(this.exhaustion+=t)}respawn(t,e,n){this.setPosition(t,e,n),this.hp=20,this.food=20,this.saturation=5,this.exhaustion=0,this.air=15,this.fire=0,this.alive=!0}}function vE(i,t,e,n,s,r,o){let a=-1/0,c=1/0,l=-1,h=0;const u=[i,t,e],f=[n,s,r];for(let d=0;d<3;d++){const m=o[d],_=o[d+3];if(Math.abs(f[d])<1e-12){if(u[d]<m||u[d]>_)return null;continue}let g=(m-u[d])/f[d],p=(_-u[d])/f[d],M=-1;if(g>p&&([g,p]=[p,g],M=1),g>a&&(a=g,l=d,h=M),c=Math.min(c,p),a>c)return null}return c<0?null:{t:Math.max(0,a),axis:l,sign:h}}function Xd(i,t,e,n,s,r,o,a){let c=Math.floor(t),l=Math.floor(e),h=Math.floor(n);const u=Math.sign(s),f=Math.sign(r),d=Math.sign(o),m=u?Math.abs(1/s):1/0,_=f?Math.abs(1/r):1/0,g=d?Math.abs(1/o):1/0;let p=u>0?(c+1-t)*m:u<0?(t-c)*m:1/0,M=f>0?(l+1-e)*_:f<0?(e-l)*_:1/0,S=d>0?(h+1-n)*g:d<0?(n-h)*g:1/0,v=0;for(let E=0;E<64&&v<=a;E++){const w=i(c,l,h),b=w&Ge;if(b!==A.AIR&&dn[b]!==Xr&&dn[b]!==Vr){const L=c,x=l,y=h,R=Ih(w,(U,z,W)=>i(L+U,x+z,y+W));let P=null;for(const U of R){const z=vE(t,e,n,s,r,o,[c+U[0],l+U[1],h+U[2],c+U[3],l+U[4],h+U[5]]);z&&z.t<=a&&(!P||z.t<P.t)&&(P=z)}if(P){const U=[0,0,0];return P.axis>=0&&(U[P.axis]=P.sign),{x:c,y:l,z:h,nx:U[0],ny:U[1],nz:U[2],state:w,px:t+s*P.t,py:e+r*P.t,pz:n+o*P.t,dist:P.t}}}p<M&&p<S?(c+=u,v=p,p+=m):M<S?(l+=f,v=M,M+=_):(h+=d,v=S,S+=g)}return null}function xE(i,t,e,n,s,r,o,a){const c=Math.ceil(a/.1);for(let l=1;l<=c;l++){const h=l*.1,u=Math.floor(t+s*h),f=Math.floor(e+r*h),d=Math.floor(n+o*h),m=i(u,f,d),_=m&Ge;if(dn[_]===Xr)return{x:u,y:f,z:d,state:m};if(_!==A.AIR&&dn[_]!==Vr&&dn[_]!==Wr)return null}return null}const vi=(i,t,e)=>[i[0]+(t[0]-i[0])*e,i[1]+(t[1]-i[1])*e,i[2]+(t[2]-i[2])*e],ss=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)},ME={zenith:[.1,.27,.75],horizon:[.5,.68,1],ambient:[.34,.42,.58],light:[1.05,.97,.82],glow:[.55,.5,.4]},yE={zenith:[.14,.18,.42],horizon:[1.05,.5,.22],ambient:[.32,.27,.3],light:[.95,.5,.22],glow:[1.5,.62,.2]},Yd={zenith:[.004,.006,.018],horizon:[.014,.02,.048],ambient:[.05,.065,.12],light:[.16,.2,.32],glow:[.02,.025,.04]},bE=[.32,.35,.4],j0=12,In=64,vr=j0*In,SE=118,EE=4;class wE{constructor(t,e){C(this,"sunDir",new F);C(this,"lightDir",new F);C(this,"daylight",1);C(this,"night",0);C(this,"sunVisibility",1);C(this,"rayColor",new F);C(this,"dome");C(this,"skyUniforms");C(this,"clouds",null);C(this,"cloudPrepass",null);C(this,"cloudDrift",0);this.scene=t,this.u=e,this.skyUniforms={...e,uNight:{value:0},uSunDisk:{value:new F},uMoonDisk:{value:new F}};const n=new en({vertexShader:ab,fragmentShader:cb,uniforms:this.skyUniforms,side:Cn,depthWrite:!1});this.dome=new _e(new du(500,32,16),n),this.dome.frustumCulled=!1,this.dome.renderOrder=-1e3,t.add(this.dome)}setClouds(t){t&&!this.clouds&&this.buildClouds(),this.clouds&&(this.clouds.visible=t),this.cloudPrepass&&(this.cloudPrepass.visible=t)}update(t,e,n,s,r,o){const a=this.u,c=t/op*Math.PI*2;this.sunDir.set(Math.cos(c),Math.sin(c),.3).normalize();const l=this.sunDir.y,h=ss(-.14,.18,l),u=Math.max(0,1-Math.abs(l)/.32)*ss(-.3,.02,l);this.daylight=.15+.85*h,this.night=1-ss(-.2,.05,l);const f=S=>{let v=vi(Yd[S],ME[S],h);return v=vi(v,yE[S],u*.85),v};let d=f("zenith"),m=f("horizon"),_=f("ambient");const g=f("glow");let p=f("light");if(l>-.06){this.lightDir.copy(this.sunDir);const S=ss(-.06,.12,l);p=vi([0,0,0],p,S)}else{this.lightDir.copy(this.sunDir).negate();const S=ss(.06,.25,-l);p=vi([0,0,0],Yd.light,S)}if(e>0){const S=vi([.01,.012,.02],bE,h);d=vi(d,S,e*.85),m=vi(m,vi(S,[.45,.48,.52],h*.5),e*.85),_=vi(_,[_[0]*.75,_[1]*.78,_[2]*.8],e),p=vi(p,[p[0]*.15,p[1]*.16,p[2]*.18],e)}a.uSunDir.value.copy(this.sunDir),a.uLightDir.value.copy(this.lightDir),a.uLightColor.value.set(...p),a.uAmbient.value.set(..._),a.uZenith.value.set(...d),a.uHorizon.value.set(...m),a.uSunGlow.value.set(...g).multiplyScalar(1-e*.8),a.uRain.value=e,a.uUnderwater.value=o?1:0,a.uWaterFog.value.set(.015,.06,.13).multiplyScalar(.25+.75*this.daylight);const M=Math.max(32,r*16-6);if(a.uFogFar.value=M*(1-e*.35),a.uFogNear.value=M*(.42-e*.2),this.skyUniforms.uNight.value=this.night,this.skyUniforms.uSunDisk.value.set(55,46,32).multiplyScalar(ss(-.05,.05,l)),this.skyUniforms.uMoonDisk.value.set(2.6,2.8,3.2).multiplyScalar(ss(-.05,.05,-l)),this.sunVisibility=ss(-.02,.12,l)*(1-e),this.rayColor.set(...g).multiplyScalar(.9+u).lerp(new F(...p).multiplyScalar(.25),.4),this.dome.position.copy(n.position),this.clouds&&this.cloudPrepass){this.cloudDrift+=s*.8;const S=Math.floor((n.position.x-this.cloudDrift)/vr)*vr+this.cloudDrift,v=Math.floor(n.position.z/vr)*vr;this.clouds.position.set(S,SE,v),this.cloudPrepass.position.copy(this.clouds.position)}}buildClouds(){const t=as(Bo(4242)),e=[];for(let d=0;d<In;d++)for(let m=0;m<In;m++){const _=m/In*Math.PI*2,g=d/In*Math.PI*2,p=t(Math.cos(_)*1.6,Math.sin(_)*1.6+Math.cos(g)*1.6)*.6+t(Math.sin(g)*3.2,Math.cos(_)*3.2+Math.sin(g))*.4;e.push(p>.22)}const n=(d,m)=>e[(m%In+In)%In*In+(d%In+In)%In],s=[],r=[],o=(d,m)=>{const[_,g,p,M]=d;s.push(..._,...g,...p,..._,...p,...M);for(let S=0;S<6;S++)r.push(m)},a=j0,c=EE;for(let d=0;d<In;d++)for(let m=0;m<In;m++){if(!n(m,d))continue;const _=m*a,g=d*a,p=_+a,M=g+a;o([[_,c,M],[p,c,M],[p,c,g],[_,c,g]],1),o([[_,0,g],[p,0,g],[p,0,M],[_,0,M]],.62),n(m+1,d)||o([[p,0,M],[p,0,g],[p,c,g],[p,c,M]],.78),n(m-1,d)||o([[_,0,g],[_,0,M],[_,c,M],[_,c,g]],.78),n(m,d+1)||o([[_,0,M],[p,0,M],[p,c,M],[_,c,M]],.86),n(m,d-1)||o([[p,0,g],[_,0,g],[_,c,g],[p,c,g]],.86)}const l=new He;l.setAttribute("position",new Xe(s,3)),l.setAttribute("aShade",new Xe(r,1));const h=new en({vertexShader:nd,fragmentShader:lb,uniforms:this.u,transparent:!0,depthWrite:!1}),u=new en({vertexShader:nd,fragmentShader:"void main() { gl_FragColor = vec4(0.0); }",colorWrite:!1}),f=d=>{const m=new h1(l,d,9);let _=0;const g=new ve;for(let p=-1;p<=1;p++)for(let M=-1;M<=1;M++)m.setMatrixAt(_++,g.makeTranslation(p*vr,0,M*vr));return m.frustumCulled=!1,m};this.cloudPrepass=f(u),this.cloudPrepass.renderOrder=1,this.clouds=f(h),this.clouds.renderOrder=2,this.scene.add(this.cloudPrepass,this.clouds)}}const TE="#e0ac80",AE=new jr().setFromUnitVectors(new F(0,1,0),new F(-.36,.3,-.88).normalize());class RE{constructor(t,e,n){C(this,"root",new Mn);C(this,"arm");C(this,"armLight",{value:new F(1,1,1)});C(this,"item",null);C(this,"itemId",-1);C(this,"swingTime",1);C(this,"equip",1);C(this,"bob",0);this.meshes=e,t.add(new Zp("#ffffff",Math.PI*.75));const s=new jp("#ffffff",Math.PI*.55);s.position.set(-.5,1,.6),t.add(s);const r=new Ei({color:TE}),o=new Ei({color:n});this.arm=new _e(new tn(.25,.75,.25),r);const a=new _e(new tn(.27,.3,.27),o);a.position.y=-.24,this.arm.add(a),Fr(this.arm,this.armLight),t.add(this.root)}swing(){this.swingTime>.5&&(this.swingTime=0)}setItem(t){var n;const e=t??0;if(e!==this.itemId){if(this.itemId=e,this.equip=0,this.root.clear(),(n=this.item)==null||n.dispose(),this.item=null,!e){this.root.add(this.arm);return}this.item=this.meshes.create(e,void 0,!0),this.root.add(this.item.object)}}update(t,e){this.swingTime=Math.min(1,this.swingTime+t/.3),e.mining&&this.swingTime>=1&&(this.swingTime=0),this.equip=Math.min(1,this.equip+t/.2),e.speed>.1&&(this.bob+=t*e.speed*2.2);const n=Math.min(1,e.speed/4.3),s=this.swingTime,r=Math.sin(Math.sqrt(s)*Math.PI),o=Math.sin(s*s*Math.PI),a=Math.sin(this.bob)*.025*n,c=-Math.abs(Math.cos(this.bob))*.03*n,l=(1-this.equip)*.6,h=this.itemId?this.meshes.isFlat(this.itemId):!1,u=this.root;if(u.rotation.set(0,0,0),u.scale.setScalar(1),this.itemId?h?(u.position.set(.5+a-r*.25,-.38+c-l+Math.sin(Math.sqrt(s)*Math.PI*2)*.12,-.62-r*.2),u.rotation.set(-r*1.2,-1.3+o*.4,.35),u.scale.setScalar(.62)):(u.position.set(.48+a-r*.25,-.42+c-l+Math.sin(Math.sqrt(s)*Math.PI*2)*.1,-.68-r*.15),u.rotation.set(-r*.8,.78,0),u.scale.setScalar(.4)):(u.position.set(.5+a-r*.25,-.5+c-l+Math.sin(Math.sqrt(s)*Math.PI*2)*.1,-.56-r*.2),u.rotation.set(-r*.7,-o*.3,r*.25),this.arm.position.set(0,0,0),this.arm.quaternion.copy(AE)),e.eating>0){const f=Math.min(1,e.eating*4);u.position.x-=.32*f,u.position.y+=.18*f+Math.abs(Math.sin(e.eating*40))*.03,u.rotation.y+=.5*f}e.bowDraw>0&&(u.position.x-=.28*Math.min(1,e.bowDraw*3),u.position.z+=.1*e.bowDraw,u.rotation.y+=.6,e.bowDraw>=1&&(u.position.y+=Math.sin(performance.now()*.05)*.004)),this.item&&(this.item.light.set(e.sky,e.block),this.item.color.value.copy(e.lightColor)),this.armLight.value.copy(e.lightColor)}get isBlockInHand(){return this.itemId>0&&ms(this.itemId)&&!this.meshes.isFlat(this.itemId)}}const Lo=ee+2,ds=Lo*Lo,ac=ds*(Pe+2),Tu=(i,t,e)=>((t+1)*Lo+(e+1))*Lo+(i+1);function CE(i,t,e){t.fill(0),e.fill(0),t.fill(A.BEDROCK,0,ds),e.fill(240,ds*(Pe+1));for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++){const r=i[(n+1)*3+(s+1)];if(!r)continue;const o=s===-1?ee-1:0,a=s===1?0:ee-1,c=n===-1?ee-1:0,l=n===1?0:ee-1;for(let h=0;h<Pe;h++)for(let u=c;u<=l;u++){let f=Tu(o+s*ee,h,u+n*ee),d=Hn(o,h,u);for(let m=o;m<=a;m++,f++,d++)t[f]=r.blocks[d],e[f]=r.light[d]}}}class Kd{constructor(){C(this,"pos",new Uint16Array(4096*4));C(this,"data",new Uint8Array(4096*4));C(this,"index",new Uint32Array(4096*6));C(this,"verts",0);C(this,"indices",0);C(this,"minY",Pe);C(this,"maxY",0)}reset(){this.verts=0,this.indices=0,this.minY=Pe,this.maxY=0}grow(){const t=new Uint16Array(this.pos.length*2);t.set(this.pos),this.pos=t;const e=new Uint8Array(this.data.length*2);e.set(this.data),this.data=e;const n=new Uint32Array(this.index.length*2);n.set(this.index),this.index=n}vertex(t,e,n,s,r,o,a,c){(this.verts+1)*4>this.pos.length&&this.grow();const l=this.verts*4;this.pos[l]=t,this.pos[l+1]=e,this.pos[l+2]=n,this.pos[l+3]=s,this.data[l]=r,this.data[l+1]=o,this.data[l+2]=a,this.data[l+3]=c,this.verts++}quad(t,e){this.indices+12>this.index.length&&this.grow();const n=this.verts-4,s=this.index;let r=this.indices;t?(s[r++]=n+1,s[r++]=n+2,s[r++]=n+3,s[r++]=n+1,s[r++]=n+3,s[r++]=n):(s[r++]=n,s[r++]=n+1,s[r++]=n+2,s[r++]=n,s[r++]=n+2,s[r++]=n+3),e&&(s[r++]=n,s[r++]=n+2,s[r++]=n+1,s[r++]=n,s[r++]=n+3,s[r++]=n+2),this.indices=r}span(t,e){t<this.minY&&(this.minY=t),e>this.maxY&&(this.maxY=e)}build(){if(!this.verts)return null;const t=this.verts>65535?this.index.slice(0,this.indices):Uint16Array.from(this.index.subarray(0,this.indices));return{pos:this.pos.slice(0,this.verts*4),data:this.data.slice(0,this.verts*4),index:t,minY:Math.max(0,Math.floor(this.minY)),maxY:Math.min(Pe,Math.ceil(this.maxY))}}}const Z0=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],zo=[[[1,0,1,0,1],[1,0,0,1,1],[1,1,0,1,0],[1,1,1,0,0]],[[0,0,0,0,1],[0,0,1,1,1],[0,1,1,1,0],[0,1,0,0,0]],[[0,1,1,0,1],[1,1,1,1,1],[1,1,0,1,0],[0,1,0,0,0]],[[0,0,0,0,1],[1,0,0,1,1],[1,0,1,1,0],[0,0,1,0,0]],[[0,0,1,0,1],[1,0,1,1,1],[1,1,1,1,0],[0,1,1,0,0]],[[1,0,0,0,1],[0,0,0,1,1],[0,1,0,1,0],[1,1,0,0,0]]],xo=(i,t,e)=>t*ds+e*Lo+i,Do=Z0.map(([i,t,e])=>xo(i,t,e)),LE=Z0.map((i,t)=>{const e=i.findIndex(s=>s!==0),n=[0,1,2].filter(s=>s!==e);return zo[t].map(s=>{const r=[...i],o=[...i];r[n[0]]+=s[n[0]]?1:-1,o[n[1]]+=s[n[1]]?1:-1;const a=[...i];return a[n[0]]=r[n[0]],a[n[1]]=o[n[1]],[xo(r[0],r[1],r[2]),xo(o[0],o[1],o[2]),xo(a[0],a[1],a[2])]})});function DE(i,t,e){switch(e&3){case 1:return[1-t,i];case 2:return[1-i,1-t];case 3:return[t,1-i];default:return[i,t]}}const Qr=(i,t,e,n)=>i|t<<8|e<<11|n<<13,vn=(i,t,e)=>i|t<<5|e<<7,ps=i=>Math.round(i*17),qd={solid:new Kd,translucent:new Kd};function J0(i,t,e){const n=qd.solid,s=qd.translucent;n.reset(),s.reset();const r=[0,0,0,0],o=[0,0,0,0],a=[0,0,0,0];for(let c=0;c<Pe;c++)for(let l=0;l<ee;l++){let h=Tu(0,c,l);for(let u=0;u<ee;u++,h++){const f=i[h],d=f&Ge,m=dn[d];if(m===Vr)continue;const _=f>>>10,g=gp[d]===pp?s:n;if(m===lc){const E=Bl[d]===1,w=d===A.ICE?1:0;for(let b=0;b<6;b++){const x=i[h+Do[b]]&Ge;if(un[x]||x===d&&(_p[d]||E&&!e.fancyLeaves))continue;const y=h+Do[b],R=LE[b];for(let W=0;W<4;W++){const X=h+R[W][0],K=h+R[W][1],G=h+R[W][2],et=un[i[X]&Ge],lt=un[i[K]&Ge],bt=et&&lt?1:un[i[G]&Ge];r[W]=et&&lt?0:3-et-lt-bt;let Ft=t[y]>>4,Yt=t[y]&15,se=1;et||(Ft+=t[X]>>4,Yt+=t[X]&15,se++),lt||(Ft+=t[K]>>4,Yt+=t[K]&15,se++),bt||(Ft+=t[G]>>4,Yt+=t[G]&15,se++),o[W]=ps(Ft/se),a[W]=ps(Yt/se)}const P=Rn[d*384+_*6+b],U=Oo[P],z=zo[b];for(let W=0;W<4;W++){const X=z[W];g.vertex((u+X[0])*16,(c+X[1])*16,(l+X[2])*16,Qr(P,b,r[W],U),vn(X[3]*16,E?1:0,0),X[4]*16+(w<<5),o[W],a[W])}g.quad(r[0]+r[2]<r[1]+r[3],!1),g.span(c,c+1)}continue}const p=t[h],M=ps(p>>4),S=ps(p&15);if(m===Wr){const E=Rn[d*384+_*6],w=Bl[d]===2?2:0,b=Math.max(Math.floor(qe(u,c,l,77)*7)-3,-u*16),L=Math.max(Math.floor(qe(l,c,u,78)*7)-3,-l*16);$d(g,u,c,l,b,L,[0,0,16,16],E,w,M,S),$d(g,u,c,l,b,L,[0,16,16,0],E,w,M,S),g.span(c,c+1);continue}if(m===Uo){const E=Rn[d*384+_*6];for(const w of[4,12])jd(g,u,c,l,"x",w,E,M,S),jd(g,u,c,l,"z",w,E,M,S);g.span(c,c+1);continue}if(m===Xr){OE(g,i,t,h,u,c,l,f);continue}if(m===Yr){PE(g,u,c,l,_,Rn[d*384],M,S),g.span(c,c+1);continue}const v=mu(f,(E,w,b)=>i[h+xo(E,w,b)]);for(const E of v)NE(g,i,t,h,u,c,l,d,_,E)}}return{solid:n.build(),translucent:s.build()}}function $d(i,t,e,n,s,r,o,a,c,l,h){const[u,f,d,m]=o,_=t*16+s,g=n*16+r,p=e*16,M=Qr(a,6,3,Oo[a]);i.vertex(_+u,p,g+f,M,vn(0,0,0),16,l,h),i.vertex(_+d,p,g+m,M,vn(16,0,0),16,l,h),i.vertex(_+d,p+16,g+m,M,vn(16,c,0),0,l,h),i.vertex(_+u,p+16,g+f,M,vn(0,c,0),0,l,h),i.quad(!1,!0)}function jd(i,t,e,n,s,r,o,a,c){const l=Qr(o,6,3,0),h=Math.max(0,e*16-1);if(s==="x"){const u=t*16+r;i.vertex(u,h,n*16,l,vn(0,0,0),16,a,c),i.vertex(u,h,n*16+16,l,vn(16,0,0),16,a,c),i.vertex(u,h+16,n*16+16,l,vn(16,2,0),0,a,c),i.vertex(u,h+16,n*16,l,vn(0,2,0),0,a,c)}else{const u=n*16+r;i.vertex(t*16,h,u,l,vn(0,0,0),16,a,c),i.vertex(t*16+16,h,u,l,vn(16,0,0),16,a,c),i.vertex(t*16+16,h+16,u,l,vn(16,2,0),0,a,c),i.vertex(t*16,h+16,u,l,vn(0,2,0),0,a,c)}i.quad(!1,!0)}function PE(i,t,e,n,s,r,o,a){const c=s>=1&&s<=4,l=c?s-1:0,h=l===1?1:l===3?-1:0,u=l===0?-1:l===2?1:0,f=[7/16,0,7/16,9/16,10/16,9/16],d=(m,_,g)=>{if(!c)return[m,_,g];const p=_*.4;return[m+h*.3125-h*p,_+.2,g+u*.3125-u*p]};for(let m=0;m<6;m++){const[_,g,p,M]=IE(m),S=zo[m];for(let v=0;v<4;v++){const E=S[v],w=E[0]?f[3]:f[0],b=E[1]?f[4]:f[1],L=E[2]?f[5]:f[2],[x,y,R]=d(w,b,L);i.vertex(Math.round((t+x)*16),Math.round((e+y)*16),Math.round((n+R)*16),Qr(r,m,3,1),vn(E[3]?p:_,0,0),E[4]?M:g,o,a)}i.quad(!1,!1)}}function IE(i){return i===2?[7,6,9,8]:i===3?[7,14,9,16]:[7,6,9,16]}function NE(i,t,e,n,s,r,o,a,c,l){const[h,u,f,d,m,_]=l;for(let g=0;g<6;g++){const p=g===0&&d>=1||g===1&&h<=0||g===2&&m>=1||g===3&&u<=0||g===4&&_>=1||g===5&&f<=0,M=n+Do[g];if(p&&un[t[M]&Ge])continue;const S=p?e[M]:e[n],v=ps(S>>4),E=ps(S&15),w=Rn[a*384+c*6+g],b=Oo[w],L=g===2?vp[a*64+c]:0,x=zo[g];for(let y=0;y<4;y++){const R=x[y],P=R[0]?d:h,U=R[1]?m:u,z=R[2]?_:f;let[W,X]=UE(g,P,U,z);L&&([W,X]=DE(W,X,L)),i.vertex(Math.round((s+P)*16),Math.round((r+U)*16),Math.round((o+z)*16),Qr(w,g,3,b),vn(Math.round(W*16),0,0),Math.round(X*16),v,E)}i.quad(!1,!1)}i.span(r+u,r+Math.min(m,1.5))}function UE(i,t,e,n){const s=Math.min(1,Math.max(0,e));switch(i){case 0:return[1-n,1-s];case 1:return[n,1-s];case 2:return[t,n];case 3:return[t,1-n];case 4:return[t,1-s];default:return[1-t,1-s]}}function OE(i,t,e,n,s,r,o,a){const c=a&Ge,h=(t[n+ds]&Ge)===c,u=h?1:Xa(a),f=c===A.WATER,d=e[n],m=Math.max(d>>4,e[n+ds]>>4),_=ps(m),g=ps(Math.max(d&15,e[n+ds]&15)),p=a>>>10;for(let M=0;M<6;M++){const S=t[n+Do[M]],v=S&Ge;if(un[v]&&M!==2)continue;let E=0,w=u;if(M===2){if(h||un[v]&&u>=1)continue}else if(M===3){if(v===c)continue}else if(v===c&&(E=(t[n+Do[M]+ds]&Ge)===c?1:Xa(S),E>=w))continue;const b=Rn[c*384+p*6+M],L=Oo[b],x=M===2&&f?3:0,y=zo[M];for(let R=0;R<4;R++){const P=y[R],U=M===2?u:M===3?0:P[1]?w:E,z=M===2||M===3?P[4]:1-U;i.vertex((s+P[0])*16,Math.round((r+U)*16),(o+P[2])*16,Qr(b,M,3,L),vn(P[3]*16,x,1),Math.round(z*16)+(f?0:32),_,g)}i.quad(!1,!1)}i.span(r,r+1)}function kE(i){const t=new Uint16Array(ac),e=new Uint8Array(ac).fill(240);return t[Tu(0,1,0)]=i,J0(t,e,{fancyLeaves:!0})}function Zd(i){const t=new He;return t.setAttribute("aPos",new ye(i.pos,4)),t.setAttribute("aData",new ye(i.data,4)),t.setIndex(new ye(i.index,1)),t.boundingSphere=new Wi(new F(.5,1.5,.5),1.2),t}function FE(i){const t=[],e=[],n=[],s=new Kt,r=i.width,o=i.height,a=(f,d)=>f>=0&&d>=0&&f<r&&d<o&&i.getAlpha(f,d)>127,c=1/16,l=c,h=(f,d,m,_,g)=>{for(const p of[f,d,m,f,m,_])t.push(...p),e.push(...g),n.push(s.r,s.g,s.b)};for(let f=0;f<o;f++)for(let d=0;d<r;d++){if(!a(d,f))continue;const[m,_,g]=i.get(d,f);s.setRGB(m/255,_/255,g/255,hn);const p=d*c-.5,M=p+c,S=.5-f*c,v=S-c,E=-l/2,w=l/2;h([p,v,w],[M,v,w],[M,S,w],[p,S,w],[0,0,1]),h([M,v,E],[p,v,E],[p,S,E],[M,S,E],[0,0,-1]),a(d-1,f)||h([p,v,E],[p,v,w],[p,S,w],[p,S,E],[-1,0,0]),a(d+1,f)||h([M,v,w],[M,v,E],[M,S,E],[M,S,w],[1,0,0]),a(d,f-1)||h([p,S,w],[M,S,w],[M,S,E],[p,S,E],[0,1,0]),a(d,f+1)||h([p,v,E],[M,v,E],[M,v,w],[p,v,w],[0,-1,0])}const u=new He;return u.setAttribute("position",new Xe(t,3)),u.setAttribute("normal",new Xe(e,3)),u.setAttribute("color",new Xe(n,3)),u.computeBoundingSphere(),u}class BE{constructor(t,e){C(this,"blockGeo",new Map);C(this,"spriteGeo",new Map);this.atlas=t,this.materials=e}setMaterials(t){this.materials=t}isFlat(t){if(!ms(t))return!0;const e=dn[t];return e===Wr||e===Uo||e===Yr||e===Kr}spriteFor(t){const e=pe(t);return ms(t)?this.atlas.tiles[Rn[t*384]]:$0((e==null?void 0:e.sprite)??"stick")}create(t,e,n=!1){var c,l;const s=new kt(1,0),r={value:new F(1,1,1)},o=new Mn,a=[];if(e!==void 0||!this.isFlat(t)){const h=e??((c=pe(t))==null?void 0:c.places)??ti(t);let u=this.blockGeo.get(h);if(!u){const{solid:d,translucent:m}=kE(h);u={solid:d&&Zd(d),translucent:m&&Zd(m)},this.blockGeo.set(h,u)}const f=new Mn;f.position.set(-.5,-1.5,-.5);for(const d of[u.solid,u.translucent]){if(!d)continue;const m=this.materials.entityBlock(s,n);a.push(m);const _=new _e(d,m);_.frustumCulled=!1,f.add(_)}o.add(f)}else{const h=ms(t)?`block:${t}`:((l=pe(t))==null?void 0:l.sprite)??"stick";let u=this.spriteGeo.get(h);u||this.spriteGeo.set(h,u=FE(this.spriteFor(t)));const f=new Ei({vertexColors:!0});a.push(f),o.add(new _e(u,f)),Fr(o,r)}return{object:o,light:s,color:r,dispose:()=>a.forEach(h=>h.dispose())}}}const zE=`
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
`,GE=`
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
`;class HE{constructor(t,e){C(this,"crack");C(this,"crackMat");C(this,"outline");C(this,"layers",Array.from({length:10},(t,e)=>Zh(`destroy_${e}`)));this.crackMat=new Er({glslVersion:us,vertexShader:zE,fragmentShader:GE,uniforms:{uAtlas:{value:e},uLayer:{value:0}},transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4});const n=new tn(1,1,1);n.translate(.5,.5,.5),this.crack=new _e(n,this.crackMat),this.crack.visible=!1,this.crack.renderOrder=3,t.add(this.crack);const s=new g1(new tn(1,1,1).translate(.5,.5,.5));this.outline=new Xp(s,new Wp({color:"#000000",transparent:!0,opacity:.5})),this.outline.visible=!1,t.add(this.outline)}fit(t,e,n,s,r,o){let a=1,c=1,l=1,h=0,u=0,f=0;for(const d of r)a=Math.min(a,d[0]),c=Math.min(c,d[1]),l=Math.min(l,d[2]),h=Math.max(h,d[3]),u=Math.max(u,d[4]),f=Math.max(f,d[5]);t.position.set(e+a-o,n+c-o,s+l-o),t.scale.set(h-a+o*2,u-c+o*2,f-l+o*2)}setTarget(t){this.outline.visible=!!t&&t.boxes.length>0,t&&this.outline.visible&&this.fit(this.outline,t.x,t.y,t.z,t.boxes,.003)}setCrack(t,e){this.crack.visible=!!t&&e>=0&&t.boxes.length>0,!(!t||!this.crack.visible)&&(this.crackMat.uniforms.uLayer.value=this.layers[Math.max(0,Math.min(9,e))],this.fit(this.crack,t.x,t.y,t.z,t.boxes,.002))}}const VE=`
attribute float aAlpha;
varying float vAlpha;
varying vec3 vWorld;
void main() {
  vAlpha = aAlpha;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,WE=`
${Xi}
${Jr}
varying float vAlpha;
varying vec3 vWorld;
void main() {
  vec3 c = (uAmbient * 1.2 + uLightColor * 0.2) * vec3(0.75, 0.82, 1.0);
  gl_FragColor = vec4(c, 0.45 * vAlpha);
}
`,XE=`
uniform float uPixelScale;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(uPixelScale * 0.07 / -mv.z, 1.0, 9.0);
  gl_Position = projectionMatrix * mv;
}
`,YE=`
${Xi}
void main() {
  gl_FragColor = vec4(uAmbient * 1.4 + uLightColor * 0.6 + vec3(0.02), 0.9);
}
`,xr=900;class KE{constructor(t,e,n,s,r=()=>1){C(this,"lines");C(this,"flakes");C(this,"pos",new Float32Array(xr*6));C(this,"alpha",new Float32Array(xr*2));C(this,"flakePos",new Float32Array(xr*3));C(this,"drops",[]);C(this,"snowUniforms",{uPixelScale:{value:800}});C(this,"kind",1);C(this,"kindTimer",0);C(this,"time",0);C(this,"intensity",0);this.surfaceY=n,this.onSplash=s,this.precipitation=r;const o=new He;o.setAttribute("position",new ye(this.pos,3).setUsage(Ws)),o.setAttribute("aAlpha",new ye(this.alpha,1).setUsage(Ws)),this.lines=new Xp(o,new en({vertexShader:VE,fragmentShader:WE,uniforms:e,transparent:!0,depthWrite:!1})),this.lines.frustumCulled=!1,this.lines.visible=!1,t.add(this.lines);const a=new He;a.setAttribute("position",new ye(this.flakePos,3).setUsage(Ws)),this.flakes=new Yp(a,new en({vertexShader:XE,fragmentShader:YE,uniforms:{...e,...this.snowUniforms},transparent:!0,depthWrite:!1})),this.flakes.frustumCulled=!1,this.flakes.visible=!1,t.add(this.flakes)}setPixelScale(t){this.snowUniforms.uPixelScale.value=t}reset(t,e,n,s,r){t.x=e+(Math.random()-.5)*32,t.z=s+(Math.random()-.5)*32,t.y=r?n+14+Math.random()*6:n+(Math.random()-.3)*24,t.floor=this.surfaceY(Math.floor(t.x),Math.floor(t.z))+1,t.speed=this.kind===2?1.6+Math.random()*1.2:22+Math.random()*8,t.phase=Math.random()*Math.PI*2}update(t,e){if(this.time+=t,this.kindTimer-=t,this.kindTimer<=0){this.kindTimer=.5;const o=this.precipitation(Math.floor(e.x),Math.floor(e.y),Math.floor(e.z));if(o!==this.kind){this.kind=o;for(const a of this.drops)this.reset(a,e.x,e.y,e.z,!1)}}const n=this.intensity>.01&&this.kind!==0;if(this.lines.visible=n&&this.kind===1,this.flakes.visible=n&&this.kind===2,!n)return;const s=this.kind===2,r=Math.floor(xr*this.intensity);for(;this.drops.length<xr;){const o={x:0,y:0,z:0,floor:0,speed:0,phase:0};this.reset(o,e.x,e.y,e.z,!1),this.drops.push(o)}for(let o=0;o<xr;o++){const a=this.drops[o];a.y-=a.speed*t,s&&(a.x+=Math.sin(this.time*1.3+a.phase)*.5*t,a.z+=Math.cos(this.time*1.1+a.phase*1.7)*.4*t),(a.y<a.floor||Math.abs(a.x-e.x)>18||Math.abs(a.z-e.z)>18)&&(!s&&a.y<a.floor&&a.floor>e.y-16&&Math.random()<.08&&this.onSplash(a.x,a.floor,a.z),this.reset(a,e.x,e.y,e.z,!0));const c=o<r&&a.y>a.floor?1:0;if(s){const h=o*3;this.flakePos[h]=a.x,this.flakePos[h+1]=c?a.y:-9999,this.flakePos[h+2]=a.z;continue}const l=o*6;this.pos[l]=a.x,this.pos[l+1]=a.y,this.pos[l+2]=a.z,this.pos[l+3]=a.x,this.pos[l+4]=a.y+.7,this.pos[l+5]=a.z,this.alpha[o*2]=c,this.alpha[o*2+1]=c*.2}s?this.flakes.geometry.getAttribute("position").needsUpdate=!0:(this.lines.geometry.getAttribute("position").needsUpdate=!0,this.lines.geometry.getAttribute("aAlpha").needsUpdate=!0)}}const Mr=2048,qE=`
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
`,$E=`
precision highp float;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${Xi}
${Jr}
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
`;class jE{constructor(t,e,n,s,r){C(this,"list",[]);C(this,"geometry",new He);C(this,"pos",new Float32Array(Mr*3));C(this,"info",new Float32Array(Mr*4));C(this,"light",new Float32Array(Mr*2));C(this,"color",new Float32Array(Mr*3));C(this,"points");C(this,"material");this.getState=s,this.getLight=r,this.geometry.setAttribute("position",new ye(this.pos,3).setUsage(Ws)),this.geometry.setAttribute("aInfo",new ye(this.info,4).setUsage(Ws)),this.geometry.setAttribute("aLight",new ye(this.light,2).setUsage(Ws)),this.geometry.setAttribute("aColor",new ye(this.color,3).setUsage(Ws)),this.geometry.setDrawRange(0,0),this.material=new Er({glslVersion:us,vertexShader:qE,fragmentShader:$E,uniforms:{...n,uAtlas:{value:e},uScale:{value:400}}}),this.points=new Yp(this.geometry,this.material),this.points.frustumCulled=!1,t.add(this.points)}setPixelScale(t){this.material.uniforms.uScale.value=t*.6}push(t){this.list.length>=Mr&&this.list.shift(),this.list.push(t)}blockBreak(t,e,n,s,r=28,o=!1){for(let a=0;a<r;a++){const c=o?t+Math.random():t+.1+Math.random()*.8,l=o?e+Math.random():e+.1+Math.random()*.8,h=o?n+Math.random():n+.1+Math.random()*.8;this.push({x:c,y:l,z:h,vx:(c-t-.5)*3+(Math.random()-.5),vy:Math.random()*3+(o?.5:1.5),vz:(h-n-.5)*3+(Math.random()-.5),life:.6+Math.random()*.6,gravity:14,layer:s,u:Math.floor(Math.random()*12),v:Math.floor(Math.random()*12),size:.08+Math.random()*.06,r:1,g:1,b:1,emissive:!1})}}puff(t,e,n,s,r,o,a=2){for(let c=0;c<s;c++)this.push({x:t+(Math.random()-.5)*r,y:e+(Math.random()-.5)*r,z:n+(Math.random()-.5)*r,vx:(Math.random()-.5)*a,vy:Math.random()*a*.6,vz:(Math.random()-.5)*a,life:.5+Math.random()*1.2,gravity:-.6,layer:-1,u:0,v:0,size:.12+Math.random()*.25,r:o[0],g:o[1],b:o[2],emissive:!0})}splash(t,e,n,s,r){for(let o=0;o<s;o++)this.push({x:t+(Math.random()-.5)*.8,y:e,z:n+(Math.random()-.5)*.8,vx:(Math.random()-.5)*2,vy:2+Math.random()*2,vz:(Math.random()-.5)*2,life:.4+Math.random()*.3,gravity:12,layer:r,u:Math.floor(Math.random()*12),v:Math.floor(Math.random()*12),size:.05,r:.8,g:.9,b:1,emissive:!1})}update(t){let e=0;for(let n=this.list.length-1;n>=0;n--){const s=this.list[n];if(s.life-=t,s.life<=0){this.list.splice(n,1);continue}s.vy-=s.gravity*t;const r=s.x+s.vx*t,o=s.y+s.vy*t,a=s.z+s.vz*t;if(s.gravity>0&&un[this.getState(Math.floor(r),Math.floor(o),Math.floor(a))&Ge]?(s.vx*=.3,s.vz*=.3,s.vy=0):(s.x=r,s.y=o,s.z=a),e>=Mr)continue;this.pos[e*3]=s.x,this.pos[e*3+1]=s.y,this.pos[e*3+2]=s.z,this.info[e*4]=s.layer,this.info[e*4+1]=s.u,this.info[e*4+2]=s.v,this.info[e*4+3]=s.size;const c=s.emissive?240:this.getLight(Math.floor(s.x),Math.floor(s.y),Math.floor(s.z));this.light[e*2]=(c>>4)/15,this.light[e*2+1]=(c&15)/15;const l=s.layer<0?Math.min(1,s.life*2):1;this.color[e*3]=s.r*l,this.color[e*3+1]=s.g*l,this.color[e*3+2]=s.b*l,e++}this.geometry.setDrawRange(0,e);for(const n of["position","aInfo","aLight","aColor"])this.geometry.getAttribute(n).needsUpdate=!0}}class ZE{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const JE=new mc(-1,1,1,-1,0,1);class QE extends He{constructor(){super(),this.setAttribute("position",new Xe([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Xe([0,2,0,0,2,0],2))}}const tw=new QE;class Q0{constructor(t){this._mesh=new _e(tw,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,JE)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}const Pl={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},ew={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Kt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Br extends ZE{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new kt(t.x,t.y):new kt(256,256),this.clearColor=new Kt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new ei(r,o,{type:zi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new ei(r,o,{type:zi});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new ei(r,o,{type:zi});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=ew;this.highPassUniforms=Lh.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new en({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new kt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Lh.clone(Pl.uniforms),this.blendMaterial=new en({uniforms:this.copyUniforms,vertexShader:Pl.vertexShader,fragmentShader:Pl.fragmentShader,blending:zl,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new Kt,this._oldClearAlpha=1,this._basic=new ko,this._fsQuad=new Q0(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new kt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=Br.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Br.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new en({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new kt(.5,.5)},direction:{value:new kt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}_getCompositeMaterial(t){return new en({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}Br.BlurDirectionX=new kt(1,0);Br.BlurDirectionY=new kt(0,1);const Da={low:{level:"low",shadowSize:0,shadowDistance:0,shadowTaps:4,bloom:!1,godRays:!1,msaa:0,fancyLeaves:!1,clouds:!0,waving:!0,maxPixelRatio:1},medium:{level:"medium",shadowSize:1024,shadowDistance:36,shadowTaps:4,bloom:!0,godRays:!1,msaa:0,fancyLeaves:!0,clouds:!0,waving:!0,maxPixelRatio:1.25},high:{level:"high",shadowSize:2048,shadowDistance:48,shadowTaps:9,bloom:!0,godRays:!0,msaa:4,fancyLeaves:!0,clouds:!0,waving:!0,maxPixelRatio:1.5},ultra:{level:"ultra",shadowSize:4096,shadowDistance:72,shadowTaps:16,bloom:!0,godRays:!0,msaa:4,fancyLeaves:!0,clouds:!0,waving:!0,maxPixelRatio:2}},Il={low:"Низкая (телефоны)",medium:"Средняя",high:"Высокая (шейдеры)",ultra:"Ультра"};class nw{constructor(t,e,n,s,r){C(this,"renderer");C(this,"handScene",new Gp);C(this,"handCamera",new Wn(70,1,.01,10));C(this,"sceneRT");C(this,"shadowRT",null);C(this,"shadowCamera",new mc(-1,1,1,-1,1,400));C(this,"bloom",null);C(this,"finalQuad");C(this,"finalMaterial");C(this,"entityDepth",new qp);C(this,"width",1);C(this,"height",1);C(this,"damageFlash",0);C(this,"exposure",1);this.scene=e,this.camera=n,this.uniforms=s,this.quality=r,this.renderer=new ry({antialias:!1,powerPreference:"high-performance",stencil:!1}),this.renderer.autoClear=!1,this.renderer.info.autoReset=!1,t.prepend(this.renderer.domElement),this.camera.layers.enable(Uh),this.camera.layers.enable(Oh),this.finalMaterial=new en({vertexShader:hb,fragmentShader:ub,uniforms:{tColor:{value:null},tDepth:{value:null},uSunScreen:{value:new kt},uSunVisible:{value:0},uRayColor:{value:new F},uExposure:{value:1},uSaturation:{value:1.08},uUnderwaterTint:{value:0},uTimeF:{value:0},uDamage:{value:0}},depthTest:!1,depthWrite:!1}),this.finalQuad=new Q0(this.finalMaterial),this.setQuality(r)}get hdrSupported(){return this.renderer.extensions.has("EXT_color_buffer_half_float")||this.renderer.extensions.has("EXT_color_buffer_float")}setQuality(t){var e;if(this.quality=t,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,t.maxPixelRatio)),this.finalMaterial.defines=t.godRays?{GOD_RAYS:1}:{},this.finalMaterial.needsUpdate=!0,(e=this.shadowRT)==null||e.dispose(),this.shadowRT=null,t.shadowSize>0){const n=new Ja(t.shadowSize,t.shadowSize);this.shadowRT=new ei(t.shadowSize,t.shadowSize,{depthTexture:n,depthBuffer:!0}),this.uniforms.uShadowMap.value=n,this.uniforms.uShadowTexel.value=1/t.shadowSize}else this.uniforms.uShadowMap.value=null;this.resize(this.width,this.height,!0)}resize(t,e,n=!1){var a,c;if(!n&&t===this.width&&e===this.height)return;this.width=t,this.height=e,this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.handCamera.aspect=t/e,this.handCamera.updateProjectionMatrix();const s=this.renderer.getPixelRatio(),r=Math.max(1,Math.floor(t*s)),o=Math.max(1,Math.floor(e*s));(a=this.sceneRT)==null||a.dispose(),this.sceneRT=new ei(r,o,{type:this.hdrSupported?zi:pi,samples:this.quality.msaa,depthTexture:new Ja(r,o),depthBuffer:!0}),(c=this.bloom)==null||c.dispose(),this.bloom=this.quality.bloom?new Br(new kt(r/2,o/2),.32,.55,1.05):null}renderShadows(t,e){if(!this.shadowRT)return;const n=this.quality,s=this.shadowCamera,r=n.shadowDistance;s.left=-r,s.right=r,s.top=r,s.bottom=-r,s.near=1,s.far=400;const o=this.uniforms.uLightDir.value;s.position.copy(e).addScaledVector(o,200),s.up.set(0,0,1),s.lookAt(e),s.updateMatrixWorld(),s.updateProjectionMatrix();const a=new ve().multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),c=new Oe(0,0,0,1).applyMatrix4(a),l=n.shadowSize/2,h=(Math.round(c.x*l)-c.x*l)/l,u=(Math.round(c.y*l)-c.y*l)/l;s.projectionMatrix.elements[12]+=h,s.projectionMatrix.elements[13]+=u,this.uniforms.uShadowMatrix.value.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse);const f=this.renderer;f.setRenderTarget(this.shadowRT),f.clear(!0,!0,!1),s.layers.set(Uh),this.scene.overrideMaterial=t.shadowDepth,f.render(this.scene,s),s.layers.set(Oh),this.scene.overrideMaterial=this.entityDepth,f.render(this.scene,s),this.scene.overrideMaterial=null}render(t,e,n,s,r){const o=this.renderer;o.info.reset(),this.shadowRT&&this.uniforms.uLightColor.value.lengthSq()>1e-4&&this.renderShadows(t,n),o.setRenderTarget(this.sceneRT),o.setClearColor(0,1),o.clear(!0,!0,!1),o.render(this.scene,this.camera),o.clearDepth(),o.render(this.handScene,this.handCamera),this.bloom&&this.bloom.render(o,null,this.sceneRT,0,!1);const a=this.finalMaterial.uniforms,l=this.camera.position.clone().addScaledVector(e.sunDir,400).project(this.camera),h=new F;this.camera.getWorldDirection(h);const u=h.dot(e.sunDir);a.uSunScreen.value.set(l.x*.5+.5,l.y*.5+.5),a.uSunVisible.value=u>0&&!r?e.sunVisibility*Math.min(1,u*2):0,a.uRayColor.value.copy(e.rayColor),a.tColor.value=this.sceneRT.texture,a.tDepth.value=this.sceneRT.depthTexture,a.uExposure.value=this.exposure,a.uUnderwaterTint.value=r?1:0,a.uTimeF.value=s,a.uDamage.value=this.damageFlash,o.setRenderTarget(null),o.clear(!0,!0,!1),this.finalQuad.render(o)}dispose(){var t,e;this.sceneRT.dispose(),(t=this.shadowRT)==null||t.dispose(),(e=this.bloom)==null||e.dispose(),this.finalQuad.dispose(),this.renderer.dispose()}}const tm="minecraft:settings:v2";function iw(){const i=S0();return{name:"",color:bp[7],renderDistance:i?4:8,sensitivity:i?10:8,fov:75,quality:i?"low":"high",volume:80,music:40}}function sw(){const i=iw();try{const t=JSON.parse(localStorage.getItem(tm)??"{}"),e={...i,...t};return["low","medium","high","ultra"].includes(e.quality)||(e.quality=i.quality),e}catch{return i}}function Wa(i){try{localStorage.setItem(tm,JSON.stringify(i))}catch{}}const Au=[1,-1,0,0,0,0],Ru=[0,0,1,-1,0,0],Cu=[0,0,0,0,1,-1],em=3,zr=(i,t,e)=>(t*ee+e)*ee+i,zh=(i,t)=>Jh[i.blocks[t]&Ge],Gr=(i,t,e)=>e?i.light[t]>>4:i.light[t]&15,Xs=(i,t,e,n)=>{i.light[t]=e?i.light[t]&15|n<<4:i.light[t]&240|n};class nm{constructor(t,e){C(this,"lastCx",NaN);C(this,"lastCz",NaN);C(this,"last");C(this,"lastMarked");this.src=t,this.changed=e}chunk(t,e){const n=t>>4,s=e>>4;return(n!==this.lastCx||s!==this.lastCz)&&(this.lastCx=n,this.lastCz=s,this.last=this.src.getChunk(n,s)),this.last}mark(t,e,n){if(!this.changed)return;const s=e&15,r=n&15,o=s===0||s===15||r===0||r===15;if(t===this.lastMarked&&!o)return;this.lastMarked=t;const a=e>>4,c=n>>4;if(this.changed.add(Qe(a,c)),!o)return;const l=s===0?-1:s===15?1:0,h=r===0?-1:r===15?1:0;l&&this.changed.add(Qe(a+l,c)),h&&this.changed.add(Qe(a,c+h)),l&&h&&this.changed.add(Qe(a+l,c+h))}}function Gh(i,t,e){for(let n=0;n<t.length;n+=3){const s=t[n],r=t[n+1],o=t[n+2],a=i.chunk(s,o);if(!a)continue;const c=Gr(a,zr(s&15,r,o&15),e);if(!(c<=1))for(let l=0;l<6;l++){const h=r+Ru[l];if(h<0||h>=Pe)continue;const u=s+Au[l],f=o+Cu[l],d=i.chunk(u,f);if(!d)continue;const m=zr(u&15,h,f&15),_=zh(d,m);if(_>=15)continue;const g=e&&l===em&&c===15&&_===0?15:c-Math.max(1,_);g>Gr(d,m,e)&&(Xs(d,m,e,g),i.mark(d,u,f),t.push(u,h,f))}}}function rw(i,t,e,n,s,r){const o=[t,e,n,s],a=[];for(let c=0;c<o.length;c+=4){const l=o[c],h=o[c+1],u=o[c+2],f=o[c+3];for(let d=0;d<6;d++){const m=h+Ru[d];if(m<0||m>=Pe)continue;const _=l+Au[d],g=u+Cu[d],p=i.chunk(_,g);if(!p)continue;const M=zr(_&15,m,g&15),S=Gr(p,M,r);if(S!==0)if(S<f||r&&d===em&&f===15&&S===15){const v=r?0:Qh[p.blocks[M]&Ge];Xs(p,M,r,v),i.mark(p,_,g),o.push(_,m,g,S),v&&a.push(_,m,g)}else a.push(_,m,g)}}return a}function Jd(i,t,e,n,s){if(e<0||e>=Pe)return;const r=new nm(i,s),o=r.chunk(t,n);if(!o)return;const a=zr(t&15,e,n&15),c=Qh[o.blocks[a]&Ge];r.mark(o,t,n);for(const l of[!0,!1]){const h=Gr(o,a,l);Xs(o,a,l,0);const u=h>0?rw(r,t,e,n,h,l):[];!l&&c&&(Xs(o,a,!1,c),u.push(t,e,n));for(let d=0;d<6;d++){const m=e+Ru[d];m>=0&&m<Pe&&u.push(t+Au[d],m,n+Cu[d])}const f=Jh[o.blocks[a]&Ge];l&&e===Pe-1&&f<15&&(Xs(o,a,!0,Math.max(0,15-f)),u.push(t,e,n)),Gh(r,u,l)}}function ow(i,t,e,n){const s=i.getChunk(t,e);if(!s)return;const r=new nm(i,n),o={sky:[],block:[]};for(let a=0;a<4;a++){const c=a===0?1:a===1?-1:0,l=a===2?1:a===3?-1:0,h=i.getChunk(t+c,e+l);if(h)for(let u=0;u<Pe;u++)for(let f=0;f<ee;f++){const d=c===1?15:c===-1?0:f,m=l===1?15:l===-1?0:f,_=c===1?0:c===-1?15:f,g=l===1?0:l===-1?15:f,p=zr(d,u,m),M=zr(_,u,g),S=zh(s,p),v=zh(h,M),E=t*ee+d,w=e*ee+m,b=(t+c)*ee+_,L=(e+l)*ee+g;for(const x of[!0,!1]){const y=Gr(s,p,x),R=Gr(h,M,x),P=x?o.sky:o.block;v<15&&y-Math.max(1,v)>R?(Xs(h,M,x,y-Math.max(1,v)),r.mark(h,b,L),P.push(b,u,L)):S<15&&R-Math.max(1,S)>y&&(Xs(s,p,x,R-Math.max(1,S)),r.mark(s,E,w),P.push(E,u,w))}}}Gh(r,o.sky,!0),Gh(r,o.block,!1)}class aw{constructor(){C(this,"chunks",new Map);C(this,"edits",new Map)}getChunk(t,e){return this.chunks.get(Qe(t,e))}getState(t,e,n){if(e<0)return A.BEDROCK;if(e>=Pe)return A.AIR;const s=this.chunks.get(Qe(t>>4,n>>4));return s?s.blocks[Hn(t&15,e,n&15)]:A.AIR}getLight(t,e,n){if(e>=Pe)return 240;if(e<0)return 0;const s=this.chunks.get(Qe(t>>4,n>>4));return s?s.light[Hn(t&15,e,n&15)]:240}isLoaded(t,e){return this.chunks.has(Qe(Math.floor(t)>>4,Math.floor(e)>>4))}isReady(t,e){var n;return!!((n=this.chunks.get(Qe(Math.floor(t)>>4,Math.floor(e)>>4)))!=null&&n.meshed)}editsFor(t,e){const n=this.edits.get(Qe(t,e));return n?[...n]:[]}setState(t,e,n,s){if(e<0||e>=Pe)return!1;const r=t>>4,o=n>>4,a=Qe(r,o),c=Hn(t&15,e,n&15);let l=this.edits.get(a);l||this.edits.set(a,l=new Map),l.set(c,s);const h=this.chunks.get(a);if(!h||h.blocks[c]===s)return!1;h.blocks[c]=s;const u=new Set([a]);Jd(this,t,e,n,u);const f=t&15,d=n&15;for(let m=d===0?-1:0;m<=(d===15?1:0);m++)for(let _=f===0?-1:0;_<=(f===15?1:0);_++)u.add(Qe(r+_,o+m));for(const m of u){const _=this.chunks.get(m);_&&(_.needsMesh=_.urgent=!0)}return!0}applyEdits(t){for(let e=0;e+3<t.length;e+=4)this.setState(t[e],t[e+1],t[e+2],t[e+3])}addChunk(t,e,n,s){const r={cx:t,cz:e,blocks:n,light:s,solid:null,translucent:null,needsMesh:!0,urgent:!1,meshed:!1},o=Qe(t,e);this.chunks.set(o,r);const a=[],c=this.edits.get(o);if(c)for(const[h,u]of c)n[h]!==u&&a.push(h,u);const l=new Set;ow(this,t,e,l);for(let h=0;h<a.length;h+=2){const u=a[h];n[u]=a[h+1],Jd(this,t*ee+(u&15),u>>8,e*ee+(u>>4&15),l)}for(const h of l){const u=this.chunks.get(h);u&&u!==r&&u.meshed&&(u.needsMesh=!0)}return r}isOpaque(t,e,n){return un[this.getState(t,e,n)&Ge]===1}}class cw{constructor(t,e,n,s,r){C(this,"renderDistance");C(this,"meshOptions",{fancyLeaves:!0});C(this,"workers",[]);C(this,"workerLoad",[]);C(this,"inflight",new Set);C(this,"queue",[]);C(this,"center",null);C(this,"padBlocks",new Uint16Array(ac));C(this,"padLight",new Uint8Array(ac));this.world=t,this.scene=e,this.materials=n,this.seed=s,this.renderDistance=r;const o=Math.max(1,Math.min(4,(navigator.hardwareConcurrency||4)-1));for(let a=0;a<o;a++){const c=new Worker(new URL(""+new URL("gen.worker-Bgpnpv0h.js",import.meta.url).href,import.meta.url),{type:"module"});c.onmessage=l=>{this.workerLoad[a]--,this.onGenerated(l.data.cx,l.data.cz,l.data.blocks,l.data.light)},this.workers.push(c),this.workerLoad.push(0)}}setRenderDistance(t){this.renderDistance=t,this.center=null}setMaterials(t,e){this.materials=t,this.meshOptions=e;for(const n of this.world.chunks.values())n.meshed&&(n.needsMesh=!0)}get loadedCount(){return this.world.chunks.size}get pendingCount(){return this.queue.length+this.inflight.size}update(t,e,n){const s=Math.floor(t)>>4,r=Math.floor(e)>>4;(!this.center||this.center[0]!==s||this.center[1]!==r)&&(this.center=[s,r],this.refresh(s,r)),this.dispatch(),this.buildMeshes(s,r,n)}refresh(t,e){const n=this.renderDistance;for(const[r,o]of this.world.chunks)Math.max(Math.abs(o.cx-t),Math.abs(o.cz-e))>n+2&&(this.disposeMeshes(o),this.world.chunks.delete(r));const s=[];for(let r=-n-1;r<=n+1;r++)for(let o=-n-1;o<=n+1;o++){if(o*o+r*r>(n+1.5)*(n+1.5))continue;const a=t+o,c=e+r,l=Qe(a,c);this.world.chunks.has(l)||this.inflight.has(l)||s.push([a,c,o*o+r*r])}s.sort((r,o)=>o[2]-r[2]),this.queue=s.map(([r,o])=>[r,o])}dispatch(){for(;this.queue.length;){let t=0;for(let s=1;s<this.workers.length;s++)this.workerLoad[s]<this.workerLoad[t]&&(t=s);if(this.workerLoad[t]>=2)return;const[e,n]=this.queue.pop();this.inflight.add(Qe(e,n)),this.workerLoad[t]++,this.workers[t].postMessage({seed:this.seed,cx:e,cz:n,edits:this.world.editsFor(e,n)})}}onGenerated(t,e,n,s){this.inflight.delete(Qe(t,e));const r=this.center;!r||Math.max(Math.abs(t-r[0]),Math.abs(e-r[1]))>this.renderDistance+2||this.world.chunks.has(Qe(t,e))||this.world.addChunk(t,e,n,s)}buildMeshes(t,e,n){const s=this.renderDistance,r=[];for(const a of this.world.chunks.values()){if(!a.needsMesh)continue;const c=a.cx-t,l=a.cz-e;c*c+l*l>(s+.5)*(s+.5)&&!a.meshed||this.hasNeighbors(a)&&r.push({chunk:a,score:(a.urgent?-1e6:0)+c*c+l*l})}if(!r.length)return;r.sort((a,c)=>a.score-c.score);const o=performance.now();for(const{chunk:a}of r){if(!a.urgent&&performance.now()-o>n)break;this.meshChunk(a)}}hasNeighbors(t){for(let e=-1;e<=1;e++)for(let n=-1;n<=1;n++)if(!this.world.chunks.has(Qe(t.cx+n,t.cz+e)))return!1;return!0}meshChunk(t){const e=[];for(let r=-1;r<=1;r++)for(let o=-1;o<=1;o++)e.push(this.world.getChunk(t.cx+o,t.cz+r));CE(e,this.padBlocks,this.padLight);const{solid:n,translucent:s}=J0(this.padBlocks,this.padLight,this.meshOptions);this.disposeMeshes(t),t.solid=n&&this.createMesh(n,this.materials.solid,t,!0),t.translucent=s&&this.createMesh(s,this.materials.translucent,t,!1),t.needsMesh=t.urgent=!1,t.meshed=!0}createMesh(t,e,n,s){const r=new He;r.setAttribute("aPos",new ye(t.pos,4)),r.setAttribute("aData",new ye(t.data,4)),r.setIndex(new ye(t.index,1)),r.boundingBox=new Es(new F(0,t.minY-.5,0),new F(ee,t.maxY+.5,ee)),r.boundingSphere=r.boundingBox.getBoundingSphere(new Wi);const o=new _e(r,e);return o.position.set(n.cx*ee,0,n.cz*ee),o.matrixAutoUpdate=!1,o.updateMatrix(),s&&o.layers.set(Uh),this.scene.add(o),o}disposeMeshes(t){for(const e of[t.solid,t.translucent])e&&(this.scene.remove(e),e.geometry.dispose());t.solid=t.translucent=null}dispose(){for(const t of this.workers)t.terminate();for(const t of this.world.chunks.values())this.disposeMeshes(t)}}const Hh="minecraft:autojoin",Ni=.25,Qd=i=>i/(3-2*i),lw=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};function hw(i,t,e,n,s){const r=Xt(n),o=n>>>10;if(r===A.OAK_DOOR){const a=o&8?t-1:t+1;return Xt(s(i,a,e))===A.OAK_DOOR?[[i,a,e]]:[]}if(r===A.BED){const a=o&4?(o&3)+2&3:o&3,[c,l]=[[0,-1],[1,0],[0,1],[-1,0]][a];return Xt(s(i+c,t,e+l))===A.BED?[[i+c,t,e+l]]:[]}return[]}class uw{constructor(t,e,n,s,r){C(this,"scene",new Gp);C(this,"camera",new Wn(75,1,.05,1200));C(this,"uniforms",fb());C(this,"pipeline");C(this,"env");C(this,"atlasTex");C(this,"materials");C(this,"quality");C(this,"world",new aw);C(this,"chunks");C(this,"player");C(this,"inv",new Hb);C(this,"invUI");C(this,"itemMeshes");C(this,"entities");C(this,"particles");C(this,"overlays");C(this,"rainFx");C(this,"hand");C(this,"sound",new ib);C(this,"input");C(this,"avatars",new Map);C(this,"colors",new Map);C(this,"selfAvatar");C(this,"touch",S0());C(this,"myId");C(this,"mode","loading");C(this,"autoReconnect",!1);C(this,"tipsPending",!1);C(this,"gameMode");C(this,"time");C(this,"rain");C(this,"rainLevel");C(this,"spawn");C(this,"openContainerId",null);C(this,"target",null);C(this,"targetEntity",null);C(this,"attackHeld",!1);C(this,"useHeld",!1);C(this,"breakProgress",0);C(this,"breakKey","");C(this,"breakTick",0);C(this,"actionCooldown",0);C(this,"attackCooldown",0);C(this,"eating",0);C(this,"bowDraw",0);C(this,"view",0);C(this,"debug",!1);C(this,"fps",0);C(this,"fpsFrames",0);C(this,"fpsTime",0);C(this,"lastFrame",performance.now());C(this,"lastSent",0);C(this,"lastSentPos",new F(1/0,0,0));C(this,"lastSentRot",[0,0]);C(this,"invTimer",0);C(this,"statsTimer",0);C(this,"damageFlash",0);C(this,"shake",0);C(this,"hurtTilt",0);C(this,"lastHp",20);C(this,"elapsed",0);C(this,"entityLight",new F);C(this,"autoQuality",!0);C(this,"perfFrames",[]);C(this,"perfGood",0);C(this,"playTime",0);C(this,"onResize",()=>{this.pipeline.resize(window.innerWidth,window.innerHeight);const t=window.innerHeight*this.pipeline.renderer.getPixelRatio();this.particles.setPixelScale(t),this.rainFx.setPixelScale(t)});C(this,"onMessage",t=>{var e;switch(t.t){case"join":this.addAvatar(t.player);break;case"leave":{const n=this.avatars.get(t.id);if(!n)break;this.scene.remove(n.group),n.dispose(),this.avatars.delete(t.id),this.colors.delete(t.id);break}case"moves":for(let n=0;n+6<t.d.length;n+=7){if(t.d[n]===this.myId)continue;const s=this.avatars.get(t.d[n]);s&&(s.setTarget(t.d[n+1],t.d[n+2],t.d[n+3],t.d[n+4],t.d[n+5]),s.sneaking=(t.d[n+6]&1)!==0,s.sleeping=(t.d[n+6]&2)!==0)}break;case"playerInfo":{const n=this.avatars.get(t.id);n==null||n.setHeld(t.held),n==null||n.setArmor(t.armor);break}case"swing":(e=this.avatars.get(t.id))==null||e.swing();break;case"blocks":for(let n=0;n+3<t.d.length;n+=4)this.applyRemoteBlock(t.d[n],t.d[n+1],t.d[n+2],t.d[n+3]);break;case"spawn":for(const n of t.e)this.entities.spawn(n);break;case"entities":this.entities.move(t.d);break;case"despawn":{const n=t.by,s=n===this.myId?()=>new F(this.player.x,this.player.y+.8,this.player.z):n!==void 0&&this.avatars.has(n)?()=>this.avatars.get(n).group.position.clone().add(new F(0,.8,0)):void 0;this.entities.remove(t.ids,s);break}case"entityEvent":this.entities.event(t.id,t.ev,t.v);break;case"hurt":this.player.damage(t.amount,t.cause,t.kx,t.kz);break;case"give":{const n=this.inv.add({...t.item});this.sound.play("pop",{pitch:1+Math.random()*.4}),n>0&&this.dropItem({...t.item,count:n},!0);break}case"container":this.openContainerId=t.c.cid,(this.mode==="play"||this.mode==="inventory")&&(this.setMode("inventory"),this.invUI.open(t.c.kind,t.c));break;case"containerSlot":this.invUI.setContainerSlot(t.cid,t.slot,t.item);break;case"containerProgress":this.invUI.setProgress(t.cid,t.burn,t.burnMax,t.cook);break;case"containerClosed":this.invUI.containerClosed(t.cid);break;case"sound":this.sound.play(t.name,{x:t.p[0],y:t.p[1],z:t.p[2],volume:t.volume,pitch:t.pitch});break;case"explosion":{const[n,s,r]=t.p;this.sound.play("explode",{x:n,y:s,z:r}),this.particles.puff(n,s,r,60,t.power*1.2,[1.4,1.3,1.2],5),this.particles.puff(n,s,r,20,t.power*.6,[3,2,.8],3);const o=Math.hypot(this.player.x-n,this.player.y-s,this.player.z-r);this.shake=Math.max(this.shake,Math.max(0,1-o/24));break}case"chat":this.ui.addChat(t.from,t.color,t.text);break;case"time":this.time=t.time;break;case"weather":this.rain=t.rain;break;case"tp":this.player.setPosition(...t.p);break;case"mode":this.gameMode=t.mode,this.applyGameMode();break;case"spawnPoint":this.spawn=t.p,this.ui.addChat(null,void 0,"Точка возрождения установлена");break;case"sleep":this.player.sleeping=t.sleeping,this.ui.setSleeping(t.sleeping);break}});C(this,"frame",t=>{requestAnimationFrame(this.frame);const e=t-this.lastFrame,n=Math.min(.1,Math.max(0,e/1e3));this.lastFrame=t,this.elapsed+=n;const s=this.player,r=this.camera,[o,a]=this.input.consumeLook();if(s.sleeping||(s.yaw-=o,s.pitch=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,s.pitch-a))),this.actionCooldown=Math.max(0,this.actionCooldown-n),this.attackCooldown=Math.max(0,this.attackCooldown-n),this.mode==="loading")this.trySpawn()&&(this.tipsPending=!0,this.setMode(this.touch?"play":"pause"));else if(this.world.isLoaded(s.x,s.z)){const m=this.input.moveInput();s.sleeping&&((m.forward||m.strafe||m.jump||m.sneak)&&this.wake(),m.forward=m.strafe=0,m.jump=m.sneak=m.sprint=!1),(this.eating>0||this.bowDraw>0)&&(m.forward*=.3,m.strafe*=.3,m.sprint=!1);const _=Math.ceil(n/.05);for(let g=0;g<_;g++)s.update(n/_,m)}const c=this.eye,l=this.shake*.3;if(this.shake=Math.max(0,this.shake-n*1.5),this.hurtTilt=Math.max(0,this.hurtTilt-n*3),r.rotation.set(s.pitch+(Math.random()-.5)*l*.1,s.yaw+(Math.random()-.5)*l*.1,Math.sin(this.hurtTilt*8)*this.hurtTilt*.12),s.sleeping?r.position.set(s.x,s.y+.4,s.z):r.position.copy(c),this.view>0){const m=this.lookDir().multiplyScalar(this.view===1?-1:1),_=Xd((p,M,S)=>this.world.getState(p,M,S),c.x,c.y,c.z,m.x,m.y,m.z,4),g=_?Math.max(.3,_.dist-.25):4;r.position.addScaledVector(m,g),this.view===2&&r.rotation.set(-s.pitch,s.yaw+Math.PI,0)}const h=this.settings.fov*(s.sprinting?1.12:1)*(this.bowDraw>0?1-Math.min(1,this.bowDraw)*.15:1);Math.abs(r.fov-h)>.01&&(r.fov+=(h-r.fov)*Math.min(1,n*10),r.updateProjectionMatrix()),this.chunks.update(s.x,s.z,this.mode==="loading"?14:5),this.time=(this.time+n*20)%op,this.rainLevel+=(this.rain-this.rainLevel)*Math.min(1,n*.4);const u=s.eyeInWater&&this.view===0;this.uniforms.uTime.value=this.elapsed,this.uniforms.uCameraPos.value.copy(r.position),this.env.update(this.time,this.rainLevel,r,n,this.chunks.renderDistance,u),this.ui.setUnderwater(u),this.updateTarget(),this.mode==="play"&&(this.updateBreaking(n),this.updateUsing(n));const f=this.world.getLight(Math.floor(s.x),Math.floor(s.y+1),Math.floor(s.z));this.lightColor(f,this.entityLight),this.hand.update(n,{speed:s.onGround?s.speed:0,sky:(f>>4)/15,block:(f&15)/15,lightColor:this.entityLight,eating:this.eating>0?Math.min(1,this.eating):0,bowDraw:this.bowDraw>0?Math.min(1,this.bowDraw):0,mining:this.attackHeld&&this.breakProgress>0}),this.pipeline.handScene.visible=this.view===0&&!s.sleeping,this.selfAvatar.group.visible=this.view>0,this.view>0&&(this.selfAvatar.setTarget(s.x,s.y,s.z,s.yaw,s.pitch),this.selfAvatar.sneaking=s.sneaking,this.selfAvatar.light.value.copy(this.entityLight),this.selfAvatar.update(n));for(const m of this.avatars.values()){const _=m.group.position;this.lightColor(this.world.getLight(Math.floor(_.x),Math.floor(_.y+1),Math.floor(_.z)),m.light.value),m.update(n)}this.entities.update(n),this.particles.update(n),this.rainFx.intensity=this.rainLevel,this.rainFx.update(n,r.position);const d=f>>4>=14;this.sound.setListener(r.position.x,r.position.y,r.position.z,s.yaw,s.pitch),this.sound.setUnderwater(u),this.sound.setRain(this.rainLevel*(d?1:.3)),this.mode!=="loading"&&this.sendMove(t),this.invTimer>0&&(this.invTimer-=n,this.invTimer<=0&&this.sendInventory()),this.statsTimer+=n,this.statsTimer>3&&(this.statsTimer=0,this.conn.send({t:"stats",hp:s.hp,food:s.food,saturation:s.saturation})),s.hp<this.lastHp&&(this.damageFlash=1,this.hurtTilt=1),this.lastHp=s.hp,this.damageFlash=Math.max(0,this.damageFlash-n*2.5),this.pipeline.damageFlash=this.damageFlash*.5,this.ui.setStatus(s.hp,s.food,this.inv.armorPoints(),s.air,this.gameMode,s.hp<=4&&Math.floor(this.elapsed*6)%2===0),this.updateDebug(n),this.trackPerformance(e,n),this.pipeline.render(this.materials,this.env,new F(s.x,s.y,s.z),this.elapsed,u)});this.conn=t,this.settings=n,this.ui=s,this.myId=e.id,this.time=e.time,this.rain=e.rain,this.rainLevel=e.rain,this.gameMode=e.self.mode,this.spawn=e.self.spawn,this.quality=Da[n.quality],this.atlasTex=db(r.data,r.count),this.materials=this.makeMaterials(),this.pipeline=new nw(Mt("app"),this.scene,this.camera,this.uniforms,this.quality),this.camera.rotation.order="YXZ",this.camera.fov=n.fov,this.env=new wE(this.scene,this.uniforms),this.env.setClouds(this.quality.clouds),this.scene.add(new Zp("#ffffff",Math.PI*.62));const o=new jp("#ffffff",Math.PI*.5);o.position.set(.4,1,.6),this.scene.add(o),this.chunks=new cw(this.world,this.scene,this.materials,e.seed,n.renderDistance),this.chunks.meshOptions={fancyLeaves:this.quality.fancyLeaves},this.world.applyEdits(e.edits),this.player=new _E(this.world),this.player.setPosition(...e.self.p),this.player.yaw=e.self.r[0],this.player.pitch=e.self.r[1],this.player.hp=e.self.hp,this.player.food=e.self.food,this.player.saturation=e.self.saturation,this.player.mode=this.gameMode,this.player.armorPoints=()=>this.inv.armorPoints(),this.lastHp=this.player.hp,this.itemMeshes=new BE(r,this.materials),this.particles=new jE(this.scene,this.atlasTex,this.uniforms,(c,l,h)=>this.world.getState(c,l,h),(c,l,h)=>this.world.getLight(c,l,h)),this.overlays=new HE(this.scene,this.atlasTex);const a=new Ty(e.seed);this.rainFx=new KE(this.scene,this.uniforms,(c,l)=>this.surfaceY(c,l),(c,l,h)=>this.particles.splash(c,l,h,2,Rn[A.WATER*384]),(c,l,h)=>{const{biome:u}=a.column(c,h);return u===ge.DESERT?0:u===ge.SNOWY||u===ge.MOUNTAINS&&l>Ba-8?2:1}),this.hand=new RE(this.pipeline.handScene,this.itemMeshes,n.color),this.entities=new Bb(this.scene,this.itemMeshes,this.world,this.particles,(c,l)=>this.lightColor(c,l));for(const c of e.entities)this.entities.spawn(c);for(const c of e.players)this.addAvatar(c);this.selfAvatar=new sd(n.name,n.color,e.self.p,this.itemMeshes),this.selfAvatar.group.visible=!1,this.scene.add(this.selfAvatar.group),this.sound.setVolume(n.volume/100),this.sound.setMusicVolume(n.music/100),this.input=new Gb(this.pipeline.renderer.domElement,{attackStart:()=>this.onAttackStart(),attackEnd:()=>this.onAttackEnd(),useStart:()=>this.onUseStart(),useEnd:()=>this.onUseEnd(),pick:()=>this.pickBlock(),hotbar:c=>this.selectSlot(c),scroll:c=>this.selectSlot(this.inv.selected+c),toggleFly:()=>{this.gameMode==="creative"&&(this.player.flying=!this.player.flying,this.player.vy=0)},drop:c=>this.dropHeld(c),chat:c=>this.openChat(c),inventory:()=>this.openInventory(),playerList:c=>this.ui.setPlayerList(c?this.playerList():null),debug:()=>this.debug=!this.debug,pause:()=>this.setMode("pause"),toggleView:()=>this.view=(this.view+1)%3}),this.input.sensitivity=n.sensitivity,this.touch&&this.input.setupTouch(Mt("touch")),this.invUI=new oE(r,this.inv,{close:()=>{this.openContainerId&&this.conn.send({t:"containerClose"}),this.openContainerId=null,this.mode==="inventory"&&this.resume()},drop:c=>this.dropItem(c,!1),containerSlot:(c,l,h)=>this.conn.send({t:"containerSlot",cid:c,slot:l,item:h}),sound:c=>this.sound.play(c)},()=>this.gameMode),this.inv.onOverflow=c=>this.dropItem(c,!1),this.inv.onChange=()=>this.onInventoryChange(),this.inv.load(e.self.inventory,e.self.armor,e.self.selected),this.bindPlayer(),this.setupUI(),this.setupPointerLock(),window.addEventListener("resize",this.onResize),this.onResize(),t.onClose=(c,l)=>this.disconnect(c,!l),t.setHandler(this.onMessage),t.isOpen||this.disconnect("Соединение с сервером потеряно"),this.applyGameMode(),this.ui.setHud(!0),this.setMode("loading"),requestAnimationFrame(this.frame)}makeMaterials(){return pb(this.atlasTex,this.uniforms,{shadows:this.quality.shadowSize>0,shadowTaps:this.quality.shadowTaps,waving:this.quality.waving})}lightColor(t,e){const n=Qd((t>>4)/15),s=Qd((t&15)/15),r=this.uniforms;return e.copy(r.uAmbient.value).multiplyScalar(n*1.2),e.addScaledVector(r.uLightColor.value,.5*lw(.6,.95,(t>>4)/15)),e.addScaledVector(r.uBlockLight.value,s*s*1.35),e.addScalar(.02),e}surfaceY(t,e){for(let n=Pe-1;n>0;n--){const s=this.world.getState(t,n,e)&Ge;if(s!==A.AIR&&(Fl[s]||Ac(s)||je[s].opacity>0))return n}return 0}setMode(t){this.mode!=="disconnected"&&(this.mode=t,this.input.active=t==="play",t!=="play"&&(this.input.release(),this.attackHeld=this.useHeld=!1,this.stopUsing(),this.overlays.setCrack(null,-1)),t==="play"&&(Mt("resume").textContent="Вернуться к игре",this.tipsPending&&(this.tipsPending=!1,this.showTips())),this.ui.show(t==="pause"?"pause":t==="loading"?"loading":t==="dead"?"death":t==="disconnected"?"disconnected":t==="inventory"?"inventory":null),Mt("touch").hidden=!this.touch||t!=="play",t!=="play"&&t!=="loading"&&!this.touch&&document.pointerLockElement&&document.exitPointerLock())}resume(){var e;if(this.sound.unlock(),this.touch)return this.setMode("play");this.ui.show(null);const t=()=>{this.mode!=="dead"&&this.mode!=="disconnected"&&this.setMode("pause")};try{const n=this.pipeline.renderer.domElement.requestPointerLock();(e=n==null?void 0:n.catch)==null||e.call(n,t)}catch{t()}}setupPointerLock(){document.addEventListener("pointerlockchange",()=>{this.input.pointerLocked?(this.mode==="pause"||this.mode==="chat"||this.mode==="inventory"||this.mode==="dead"&&this.player.alive)&&this.setMode("play"):this.mode==="play"&&this.setMode("pause")}),document.addEventListener("pointerlockerror",()=>{this.mode!=="disconnected"&&this.mode!=="dead"&&this.mode!=="inventory"&&this.setMode("pause")}),this.pipeline.renderer.domElement.addEventListener("click",()=>{this.sound.unlock(),!this.touch&&this.mode==="pause"&&this.resume()});const e=()=>this.sound.unlock();for(const n of["pointerdown","keydown","touchend"])window.addEventListener(n,e,{capture:!0,passive:!0})}setupUI(){const t=this.settings;Mt("resume").onclick=()=>this.resume(),Mt("reconnect").onclick=()=>this.reconnect(),Mt("disconnect-menu").onclick=()=>location.reload(),document.addEventListener("visibilitychange",()=>{!document.hidden&&this.mode==="disconnected"&&this.autoReconnect&&this.reconnect()}),Mt("to-menu").onclick=()=>location.reload(),Mt("respawn").onclick=()=>this.respawn(),Mt("wake").onclick=()=>this.wake(),Mt("fullscreen").onclick=()=>{var o,a;if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});return}const r=()=>{var c,l;return(l=(c=screen.orientation).lock)==null?void 0:l.call(c,"landscape").catch(()=>{})};(a=(o=document.documentElement).requestFullscreen)==null||a.call(o).then(r).catch(()=>{})};const e=Mt("quality");e.replaceChildren(...Object.keys(Da).map(r=>{const o=document.createElement("option");return o.value=r,o.textContent=Il[r],o})),e.value=t.quality,e.onchange=()=>{t.quality=e.value,Wa(t),this.autoQuality=!1,this.setQuality(Da[t.quality])};const n=(r,o,a,c)=>{const l=Mt(r),h=Mt(`${r}-value`),u=f=>h.textContent=c?c(f):String(f);l.value=String(o),u(o),l.oninput=()=>{const f=Number(l.value);u(f),a(f),Wa(t)}};n("rd",t.renderDistance,r=>{t.renderDistance=r,this.chunks.setRenderDistance(r)}),n("sens",t.sensitivity,r=>{t.sensitivity=r,this.input.sensitivity=r}),n("fov",t.fov,r=>t.fov=r),n("vol",t.volume,r=>{t.volume=r,this.sound.setVolume(r/100)},r=>`${r}%`),n("music",t.music,r=>{t.music=r,this.sound.setMusicVolume(r/100)},r=>r?`${r}%`:"выкл");const s=Mt("chat-input");Mt("chat-form").onsubmit=r=>{r.preventDefault();const o=s.value.trim();o&&this.conn.send({t:"chat",text:o}),this.closeChat()},s.onkeydown=r=>{r.key==="Escape"&&(r.preventDefault(),this.closeChat())},window.addEventListener("keydown",r=>{this.mode==="inventory"&&(r.code==="KeyE"||r.code==="Escape")&&(r.preventDefault(),this.invUI.close())}),this.renderHotbar()}setQuality(t){this.quality=t;const e=this.materials;this.materials=this.makeMaterials(),this.pipeline.setQuality(t),this.chunks.setMaterials(this.materials,{fancyLeaves:t.fancyLeaves}),this.itemMeshes.setMaterials(this.materials),this.env.setClouds(t.clouds),this.onResize();for(const n of[e.solid,e.translucent,e.shadowDepth])n.dispose()}trackPerformance(t,e){if(!this.autoQuality||this.mode!=="play"||document.hidden||this.chunks.pendingCount>0||(this.playTime+=e,this.playTime<4)||(this.perfFrames.push(t),this.perfFrames.length<150))return;const n=this.perfFrames.sort((a,c)=>a-c),s=n[n.length>>1];this.perfFrames.length=0;const r=["low","medium","high","ultra"],o=r.indexOf(this.quality.level);if(s>45&&o>0){const a=r[o-1];this.settings.quality=a,Wa(this.settings),this.setQuality(Da[a]),Mt("quality").value=a,this.ui.addChat(null,void 0,`Графика: «${Il[a]}» — так игра пойдёт плавнее. Изменить можно в меню паузы.`),this.perfGood=0}else s<30&&++this.perfGood>=2&&(this.autoQuality=!1)}applyGameMode(){this.player.mode=this.gameMode,this.gameMode!=="creative"&&(this.player.flying=!1),Mt("touch").classList.toggle("creative",this.gameMode==="creative")}renderHotbar(){this.ui.renderHotbar(this.inv,t=>this.selectSlot(t))}selectSlot(t){var e;this.inv.select(t),this.stopUsing(),this.ui.flashItemName(((e=this.inv.held)==null?void 0:e.id)??null)}onInventoryChange(){var t,e;this.renderHotbar(),this.hand.setItem(((t=this.inv.held)==null?void 0:t.id)??null),this.selfAvatar.setHeld(((e=this.inv.held)==null?void 0:e.id)??0),this.selfAvatar.setArmor(this.inv.armor.map(n=>(n==null?void 0:n.id)??0)),this.invUI.refresh(),this.invTimer=.4}sendInventory(){var t;this.conn.send({t:"inventory",slots:this.inv.slots,armor:this.inv.armor,selected:this.inv.selected,held:((t=this.inv.held)==null?void 0:t.id)??0})}openChat(t){this.mode==="play"&&(this.setMode("chat"),this.ui.openChat(t))}closeChat(){this.ui.closeChat(),this.mode==="chat"&&this.resume()}openInventory(){this.mode==="play"&&(this.setMode("inventory"),this.invUI.open(this.gameMode==="creative"?"creative":"inventory"))}disconnect(t,e=!0){this.mode!=="disconnected"&&(Mt("disconnect-reason").textContent=t,this.setMode("disconnected"),this.ui.setHud(!1),this.autoReconnect=e,e&&!document.hidden&&setTimeout(()=>this.autoReconnect&&!document.hidden&&this.reconnect(),3e3))}reconnect(){this.autoReconnect=!1;try{sessionStorage.setItem(Hh,"1")}catch{}location.reload()}playerList(){return[{name:`${this.settings.name} (вы)`,color:this.settings.color},...[...this.avatars].map(([t,e])=>({name:e.name,color:this.colors.get(t)??"#fff"}))]}applyRemoteBlock(t,e,n,s){const r=this.world.getState(t,e,n);if(!this.world.setState(t,e,n,s))return;const o=Xt(r),a=Xt(s);o!==a&&(a===A.AIR&&o!==A.AIR&&!Ac(r)?(this.particles.blockBreak(t,e,n,Rn[o*384]),this.sound.play(`break_${je[o].sound}`,{x:t+.5,y:e+.5,z:n+.5})):o===A.AIR&&a!==A.AIR&&!Ac(s)&&this.sound.play(`place_${je[a].sound}`,{x:t+.5,y:e+.5,z:n+.5}))}addAvatar(t){if(t.id===this.myId||this.avatars.has(t.id))return;const e=new sd(t.name,t.color,t.p,this.itemMeshes);e.setTarget(...t.p,t.r[0],t.r[1]),e.setHeld(t.held),e.setArmor(t.armor),this.avatars.set(t.id,e),this.colors.set(t.id,t.color),this.scene.add(e.group)}sendMove(t,e=!1){if(!e&&t-this.lastSent<50)return;const n=this.player,s=new F(n.x,n.y,n.z);!(s.distanceToSquared(this.lastSentPos)>1e-4||Math.abs(n.yaw-this.lastSentRot[0])>.001||Math.abs(n.pitch-this.lastSentRot[1])>.001)&&t-this.lastSent<2e3||(this.conn.send({t:"move",p:[n.x,n.y,n.z],r:[n.yaw,n.pitch],sneak:n.sneaking,fly:n.flying}),this.lastSent=t,this.lastSentPos.copy(s),this.lastSentRot=[n.yaw,n.pitch])}get eye(){return new F(this.player.x,this.player.y+this.player.eyeHeight,this.player.z)}lookDir(){const t=this.player;return new F(-Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),-Math.cos(t.yaw)*Math.cos(t.pitch))}swing(){this.hand.swing(),this.selfAvatar.swing(),this.conn.send({t:"swing"})}onAttackStart(){if(!(this.mode!=="play"||!this.player.alive)){if(this.attackHeld=!0,this.breakProgress=0,this.breakKey="",this.targetEntity&&(!this.target||this.targetEntity.dist<this.target.dist)){this.attackEntity(this.targetEntity.id);return}this.swing(),this.gameMode==="creative"&&this.creativeBreak()}}onAttackEnd(){this.attackHeld=!1,this.breakProgress=0,this.overlays.setCrack(null,-1)}attackEntity(t){var s;if(this.attackCooldown>0)return;this.attackCooldown=.25,this.swing();const e=this.inv.held,n=this.player.vy<-.5&&!this.player.onGround;if(this.conn.send({t:"attack",id:t,item:(e==null?void 0:e.id)??null,crit:n}),this.sound.play(n?"strong_hit":"attack"),this.player.addExhaustion(.1),e&&((s=pe(e.id))!=null&&s.tool)&&this.gameMode==="survival"){const r=pe(e.id).tool.type;this.inv.damageHeld(r==="sword"?1:2)&&this.sound.play("tool_break")}}creativeBreak(){var e,n,s;const t=this.target;!t||this.actionCooldown>0||((s=(n=pe(((e=this.inv.held)==null?void 0:e.id)??0))==null?void 0:n.tool)==null?void 0:s.type)!=="sword"&&(this.actionCooldown=.2,this.breakBlock(t))}breakBlock(t){var s,r;const e=t.state,n=Xt(e);this.world.setState(t.x,t.y,t.z,A.AIR);for(const[o,a,c]of hw(t.x,t.y,t.z,e,(l,h,u)=>this.world.getState(l,h,u)))this.world.setState(o,a,c,A.AIR);if(this.conn.send({t:"break",x:t.x,y:t.y,z:t.z,tool:((s=this.inv.held)==null?void 0:s.id)??null}),this.particles.blockBreak(t.x,t.y,t.z,Rn[n*384+(e>>>10)*6]),this.sound.play(`break_${je[n].sound}`,{x:t.x+.5,y:t.y+.5,z:t.z+.5}),this.gameMode==="survival"){this.player.addExhaustion(.005);const o=this.inv.held;if(o&&((r=pe(o.id))!=null&&r.tool)&&je[n].hardness>0){const a=pe(o.id).tool.type;this.inv.damageHeld(a==="sword"?2:1)&&this.sound.play("tool_break")}}}updateBreaking(t){var a;if(!this.attackHeld){this.overlays.setCrack(null,-1);return}if(this.gameMode==="creative"){this.actionCooldown<=0&&this.creativeBreak();return}if(this.targetEntity&&(!this.target||this.targetEntity.dist<this.target.dist)){this.attackCooldown<=0&&this.attackEntity(this.targetEntity.id),this.overlays.setCrack(null,-1);return}const e=this.target;if(!e){this.breakProgress=0,this.overlays.setCrack(null,-1);return}const n=`${e.x},${e.y},${e.z},${e.state}`;if(n!==this.breakKey&&(this.breakKey=n,this.breakProgress=0,this.breakTick=0),this.actionCooldown>0)return;const s=this.player,r=ly(e.state,((a=this.inv.held)==null?void 0:a.id)??null,s.eyeInWater,s.onGround||s.onLadder||s.flying);if(!Number.isFinite(r))return;if(this.breakProgress+=r<=0?1:t/r,this.breakTick-=t,this.breakTick<=0){this.breakTick=.25,this.swing();const c=Xt(e.state);this.sound.play(`hit_${je[c].sound}`,{x:e.x+.5,y:e.y+.5,z:e.z+.5}),this.particles.blockBreak(e.x,e.y,e.z,Rn[c*384+(e.state>>>10)*6],3,!0)}const o=Ih(e.state,(c,l,h)=>this.world.getState(e.x+c,e.y+l,e.z+h));this.overlays.setCrack({x:e.x,y:e.y,z:e.z,boxes:o},Math.floor(this.breakProgress*10)),this.breakProgress>=1&&(this.breakBlock(e),this.breakProgress=0,this.breakKey="",this.actionCooldown=Ni,this.overlays.setCrack(null,-1))}onUseStart(){this.mode!=="play"||!this.player.alive||(this.useHeld=!0,this.useItem(!0))}onUseEnd(){this.useHeld=!1,this.bowDraw>0&&this.releaseBow(),this.eating=0}stopUsing(){this.eating=0,this.bowDraw=0}useItem(t){var h;if(this.actionCooldown>0&&!t)return;const e=this.player,n=this.inv.held,s=n?pe(n.id):void 0,r=this.target;if(this.targetEntity&&(!r||this.targetEntity.dist<r.dist)&&(n==null?void 0:n.id)===j.SHEARS&&this.entities.isMob(this.targetEntity.id)==="sheep"){this.conn.send({t:"interactEntity",id:this.targetEntity.id,item:n.id}),this.swing(),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break"),this.actionCooldown=Ni;return}if(r&&lE(r.state)&&!e.sneaking){if(!t)return;this.swing(),Xt(r.state)===A.CRAFTING_TABLE?(this.setMode("inventory"),this.invUI.open("crafting")):this.conn.send({t:"interact",x:r.x,y:r.y,z:r.z}),this.actionCooldown=Ni;return}if(s!=null&&s.food){(e.food<20||this.gameMode==="creative")&&(this.eating=Math.max(this.eating,1e-4));return}if((n==null?void 0:n.id)===j.BOW){(this.gameMode==="creative"||this.inv.count(j.ARROW)>0)&&(this.bowDraw=Math.max(this.bowDraw,1e-4));return}if((n==null?void 0:n.id)===j.BUCKET){const u=this.eye,f=this.lookDir(),d=xE((m,_,g)=>this.world.getState(m,_,g),u.x,u.y,u.z,f.x,f.y,f.z,Tc);if(d&&!(d.state>>>10)){const m=Xt(d.state)===A.LAVA;this.conn.send({t:"use",x:d.x,y:d.y,z:d.z,action:"fill"}),this.world.setState(d.x,d.y,d.z,A.AIR),this.sound.play("bucket_fill"),this.gameMode==="survival"&&this.inv.replaceHeld(Fe(m?j.LAVA_BUCKET:j.WATER_BUCKET)),this.actionCooldown=Ni}return}if(!r)return;const o={x:r.x+r.nx,y:r.y+r.ny,z:r.z+r.nz};if((n==null?void 0:n.id)===j.WATER_BUCKET||(n==null?void 0:n.id)===j.LAVA_BUCKET){const u=n.id===j.LAVA_BUCKET,f=je[Xt(r.state)].replaceable?r:o;this.conn.send({t:"use",x:f.x,y:f.y,z:f.z,action:"empty",fluid:u?"lava":"water"}),this.world.setState(f.x,f.y,f.z,ti(u?A.LAVA:A.WATER)),this.sound.play("bucket_empty"),this.swing(),this.gameMode==="survival"&&this.inv.replaceHeld(Fe(j.BUCKET)),this.actionCooldown=Ni;return}if(((h=s==null?void 0:s.tool)==null?void 0:h.type)==="hoe"){const u=Xt(r.state);(u===A.GRASS||u===A.DIRT)&&r.ny===1&&this.world.getState(r.x,r.y+1,r.z)===A.AIR&&(this.conn.send({t:"use",x:r.x,y:r.y,z:r.z,action:"till"}),this.world.setState(r.x,r.y,r.z,A.FARMLAND),this.sound.play("step_gravel",{x:r.x+.5,y:r.y+1,z:r.z+.5}),this.swing(),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break"),this.actionCooldown=Ni);return}if((n==null?void 0:n.id)===j.BONE_MEAL){const u=Xt(r.state);(u===A.WHEAT||u===A.GRASS||u===A.OAK_SAPLING||u===A.BIRCH_SAPLING||u===A.SPRUCE_SAPLING)&&(this.conn.send({t:"use",x:r.x,y:r.y,z:r.z,action:"bonemeal"}),this.particles.puff(r.x+.5,r.y+1,r.z+.5,8,.8,[.4,1.4,.4],.5),this.swing(),this.gameMode==="survival"&&this.inv.consumeHeld(),this.actionCooldown=Ni);return}if((n==null?void 0:n.id)===j.FLINT_AND_STEEL){Xt(r.state)===A.TNT&&(this.conn.send({t:"use",x:r.x,y:r.y,z:r.z,action:"ignite"}),this.sound.play("flint_and_steel"),this.swing(),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break")),this.actionCooldown=Ni;return}if(!n||!(s!=null&&s.places))return;const a=cE(n.id,r,e.yaw,(u,f,d)=>this.world.getState(u,f,d));if(!a||a.y<1||a.y>=Pe)return;const c=Xt(a.state),l=hE(a);if(Fl[c])for(const u of[a,...l]){if(Jf(e,u.x,u.y,u.z)||this.entities.blocksCell(u.x,u.y,u.z))return;for(const f of this.avatars.values())if(Jf({x:f.target.x,y:f.target.y,z:f.target.z,width:.6,height:1.8},u.x,u.y,u.z))return}this.world.setState(a.x,a.y,a.z,a.state);for(const u of l)this.world.setState(u.x,u.y,u.z,u.state);this.sendMove(performance.now(),!0),this.conn.send({t:"place",x:a.x,y:a.y,z:a.z,state:a.state,item:n.id}),this.sound.play(`place_${je[c].sound}`,{x:a.x+.5,y:a.y+.5,z:a.z+.5}),this.swing(),this.gameMode==="survival"&&this.inv.consumeHeld(),this.actionCooldown=Ni}updateUsing(t){const e=this.inv.held,n=e?pe(e.id):void 0;if(this.eating>0)if(!this.useHeld||!(n!=null&&n.food))this.eating=0;else{const s=this.eating;this.eating+=t,Math.floor(s/.24)!==Math.floor(this.eating/.24)&&this.sound.play("eat",{pitch:.9+Math.random()*.3}),this.eating>=1.6&&(this.player.eat(n.food.hunger,n.food.saturation),this.gameMode==="survival"&&this.inv.consumeHeld(),this.sound.play("burp"),this.eating=0)}this.bowDraw>0&&((e==null?void 0:e.id)!==j.BOW?this.bowDraw=0:this.bowDraw+=t),this.useHeld&&this.eating===0&&this.bowDraw===0&&this.actionCooldown<=0&&this.useItem(!1)}releaseBow(){const t=Math.min(1,this.bowDraw);if(this.bowDraw=0,t<.15||this.gameMode==="survival"&&!this.inv.takeOne(j.ARROW))return;const e=this.eye,n=this.lookDir(),s=12+t*48;this.conn.send({t:"shoot",p:[e.x+n.x*.6,e.y+n.y*.6,e.z+n.z*.6],v:[n.x*s,n.y*s,n.z*s]}),this.sound.play("bow_shoot"),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break")}pickBlock(){var s;const t=this.target;if(!t)return;const e=je[Xt(t.state)].item;if(e===null||!pe(e))return;for(let r=0;r<9;r++)if(((s=this.inv.slots[r])==null?void 0:s.id)===e)return this.selectSlot(r);if(this.gameMode==="creative"){this.inv.slots[this.inv.selected]=Fe(e,pe(e).maxStack),this.inv.changed();return}const n=this.inv.slots.findIndex((r,o)=>o>=9&&(r==null?void 0:r.id)===e);if(n>=0){const r=this.inv.slots[this.inv.selected];this.inv.slots[this.inv.selected]=this.inv.slots[n],this.inv.slots[n]=r,this.inv.changed()}}dropHeld(t){const e=this.inv.held;if(!e)return;const n=t?e.count:1;this.dropItem({...e,count:n},!1),this.inv.consumeHeld(n),this.swing()}dropItem(t,e){const n=this.eye,s=this.lookDir();this.conn.send({t:"drop",item:t,p:[n.x+s.x*.3,n.y-.3,n.z+s.z*.3],v:[s.x*5,s.y*5+2,s.z*5],returned:e})}showTips(){const t="minecraft:tips-shown";try{if(localStorage.getItem(t))return;localStorage.setItem(t,"1")}catch{return}(this.touch?["Добро пожаловать! Удерживайте палец на стволе дерева, чтобы добыть брёвна.","Кнопка «Инвентарь» — крафт. Слева книга рецептов: нажмите на рецепт, потом заберите результат.","Короткое касание — поставить блок. Сделайте верстак, а на нём — кирку и факелы.","Ночью выходят монстры — постройте укрытие. Друзья заходят по ссылке или QR-коду из главного меню."]:["Добро пожаловать! Зажмите ЛКМ на стволе дерева, чтобы добыть брёвна.","E — инвентарь и крафт. Слева книга рецептов: кликните рецепт, потом заберите результат.","ПКМ — поставить блок. Сделайте верстак, а на нём — кирку и факелы.","Ночью выходят монстры — постройте укрытие. Друзья заходят по ссылке или QR-коду из главного меню, /help — команды."]).forEach((n,s)=>setTimeout(()=>this.ui.addChat(null,void 0,n),1500+s*7e3))}bindPlayer(){const t=this.player;t.onHurt=(e,n)=>{this.sound.play("hurt"),this.ui.isSleeping&&(this.ui.setSleeping(!1),this.conn.send({t:"wake"})),n!=="fall"&&n!=="drown"&&n!=="starve"&&this.inv.damageArmor(e)},t.onDeath=e=>this.onDeath(e),t.onStep=()=>{const e=Xt(this.world.getState(Math.floor(t.x),Math.floor(t.y-.2),Math.floor(t.z)));e!==A.AIR&&this.sound.play(`step_${je[e].sound}`,{volume:.5})},t.onLand=e=>this.sound.play(e>5?"fall_big":"fall_small",{volume:Math.min(1,e/6)}),t.onSplash=()=>{this.sound.play("splash"),this.particles.splash(t.x,t.y+.5,t.z,16,Rn[A.WATER*384])}}onDeath(t){this.setMode("dead"),this.invUI.isOpen&&this.invUI.close(),this.openContainerId=null,this.ui.setSleeping(!1);const e=this.gameMode==="survival"?this.inv.takeAll():[],n=gE[t]??`погибает (${t})`;this.conn.send({t:"died",cause:n,items:e}),this.sound.play("death"),Mt("death-cause").textContent=`${this.settings.name} ${n}`}respawn(){this.ui.setSleeping(!1),this.conn.send({t:"respawn"}),this.player.respawn(...this.spawn),this.lastHp=20,this.resume()}wake(){this.player.sleeping&&(this.player.sleeping=!1,this.ui.setSleeping(!1),this.conn.send({t:"wake"}))}trySpawn(){const t=this.player,e=this.chunks.renderDistance;if(this.ui.setLoading(Math.min(1,this.world.chunks.size/Math.max(1,Math.PI*(e+1)*(e+1)))),!this.world.isReady(t.x,t.z))return!1;const n=Math.floor(t.x),s=Math.floor(t.z);let r=Math.floor(t.y);const o=a=>un[Xt(this.world.getState(n,a,s))]||un[Xt(this.world.getState(n,a+1,s))];if(o(r)){for(;r<Pe&&o(r);)r++;t.setPosition(t.x,r,t.z)}return!0}updateTarget(){const t=this.eye,e=this.lookDir(),n=this.gameMode==="creative"?Tc+1.5:Tc,s=(c,l,h)=>this.world.getState(c,l,h),r=this.mode!=="loading"&&this.player.alive;this.target=r?Xd(s,t.x,t.y,t.z,e.x,e.y,e.z,n):null,this.targetEntity=r?this.entities.raycast(t,e,Math.min(n,4.5)):null;const o=this.target,a=o&&!(this.targetEntity&&this.targetEntity.dist<o.dist);this.overlays.setTarget(a&&o?{x:o.x,y:o.y,z:o.z,boxes:Ih(o.state,(c,l,h)=>s(o.x+c,o.y+l,o.z+h))}:null)}updateDebug(t){if(this.fpsFrames++,this.fpsTime+=t,this.fpsTime>=.5&&(this.fps=Math.round(this.fpsFrames/this.fpsTime),this.fpsFrames=0,this.fpsTime=0),!this.debug)return this.ui.setDebug(null);const e=this.player,s=["север (-Z)","запад (-X)","юг (+Z)","восток (+X)"][(Math.round(e.yaw/(Math.PI/2))%4+4)%4],r=Math.floor((this.time/1e3+6)%24),o=Math.floor(this.time%1e3/1e3*60),a=this.world.getLight(Math.floor(e.x),Math.floor(e.y),Math.floor(e.z)),c=this.pipeline.renderer.info;this.ui.setDebug([`${rp} · ${this.fps} FPS · ${Il[this.quality.level]}`,`XYZ: ${e.x.toFixed(2)} / ${e.y.toFixed(2)} / ${e.z.toFixed(2)}`,`Чанк: ${Qe(Math.floor(e.x)>>4,Math.floor(e.z)>>4)} · загружено ${this.chunks.loadedCount}, в очереди ${this.chunks.pendingCount}`,`Смотрит на ${s}`,`Свет: небо ${a>>4}, блоки ${a&15}`,`Время: ${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}${this.rain?", дождь":""}`,`Режим: ${this.gameMode==="creative"?"творческий":"выживание"}${e.flying?", полёт":""}`,`Сущностей: ${this.entities.count} · игроков: ${this.avatars.size+1}`,`Отрисовка: ${c.render.calls} вызовов, ${Math.round(c.render.triangles/1e3)}k треугольников`,this.target?`Блок: ${je[Xt(this.target.state)].key} (${this.target.x} ${this.target.y} ${this.target.z})`:""].filter(Boolean).join(`
`))}}class Lu{constructor(t,e){C(this,"endpoints",new Map);C(this,"nextId",1);C(this,"saveWaiters",[]);C(this,"guests",0);C(this,"onGuestsChange",()=>{});this.worker=t,this.seed=e,t.onmessage=s=>{var o;const r=s.data;if(r.t==="msg")(o=this.endpoints.get(r.id))==null||o.deliver(r.data);else if(r.t==="close"){const a=this.endpoints.get(r.id);this.endpoints.delete(r.id),a==null||a.end()}else r.t==="saved"&&this.saveWaiters.splice(0).forEach(a=>a())};const n=()=>void this.save();window.addEventListener("pagehide",n),document.addEventListener("visibilitychange",()=>document.hidden&&n())}static start(t=!1){const e=new Worker(new URL(""+new URL("server.worker-Bt9Hci-1.js",import.meta.url).href,import.meta.url),{type:"module"});return new Promise((n,s)=>{const r=setTimeout(()=>s(new Error("Мир не запустился")),3e4);e.onmessage=o=>{o.data.t==="ready"?(clearTimeout(r),n(new Lu(e,o.data.seed))):o.data.t==="error"&&(clearTimeout(r),s(new Error(`Не удалось открыть мир: ${o.data.message}`)))},e.onerror=o=>{clearTimeout(r),s(new Error(`Не удалось запустить мир: ${o.message}`))},e.postMessage({t:"start",fresh:t})})}post(t){this.worker.postMessage(t)}connectLocal(){const t=this.nextId++;let e=!0;const n={get isOpen(){return e},send:s=>e&&this.post({t:"msg",id:t,data:s}),close:()=>{e&&(e=!1,this.endpoints.delete(t),this.post({t:"close",id:t}),n.onclose())},onopen:()=>{},onmessage:()=>{},onclose:()=>{}};return this.endpoints.set(t,{deliver:s=>n.onmessage(s),end:()=>{e&&(e=!1,n.onclose())}}),this.post({t:"open",id:t}),n}attach(t){const e=this.nextId++;let n=!0;this.guests++,this.onGuestsChange(this.guests);const s=()=>{n&&(n=!1,this.guests--,this.onGuestsChange(this.guests))};this.endpoints.set(e,{deliver:r=>t.send(r),end:()=>{s(),setTimeout(()=>t.close(),200)}}),t.onmessage=r=>n&&this.post({t:"msg",id:e,data:r}),t.onclose=()=>{n&&(s(),this.endpoints.delete(e),this.post({t:"close",id:e}))},this.post({t:"open",id:e})}save(){return new Promise(t=>{this.saveWaiters.push(t),this.post({t:"save"})})}}const fw="modulepreload",dw=function(i,t){return new URL(i,t).href},tp={},pw=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let o=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const a=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));s=o(e.map(h=>{if(h=dw(h,n),h in tp)return;tp[h]=!0;const u=h.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(!!n)for(let _=a.length-1;_>=0;_--){const g=a[_];if(g.href===h&&(!u||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${f}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":fw,u||(m.as="script"),m.crossOrigin="",m.href=h,l&&m.setAttribute("nonce",l),document.head.appendChild(m),u)return new Promise((_,g)=>{m.addEventListener("load",_),m.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},ep="mincraft:host-id",Pa=16e3;function im(){const i=new URLSearchParams(location.search).get("peer");if(i){const[t,e]=i.split(":");return{host:t,port:Number(e)||9e3,path:"/",secure:!1,debug:0}}return{debug:0}}function mw(){const i=new URLSearchParams(location.search).get("peer");return i?`&peer=${encodeURIComponent(i)}`:""}async function sm(){return(await pw(()=>import("./bundler-asumSYiq.js"),[],import.meta.url)).Peer}function gw(){let i=1;return(t,e)=>{if(t.length<=Pa)return e(`=${t}`);const n=i++,s=Math.ceil(t.length/Pa);for(let r=0;r<s;r++)e(`+${n},${r},${s},${t.slice(r*Pa,(r+1)*Pa)}`)}}function _w(){const i=new Map;return t=>{if(t[0]==="=")return t.slice(1);if(t[0]!=="+")return null;let e=1;const n=()=>{const c=t.indexOf(",",e),l=Number(t.slice(e,c));return e=c+1,l},s=n(),r=n(),o=n();if(!Number.isInteger(s)||!Number.isInteger(o)||o>1e4||r>=o)return null;let a=i.get(s);return a||i.set(s,a=[]),a[r]=t.slice(e),a.filter(c=>c!==void 0).length<o?null:(i.delete(s),a.join(""))}}const np=3e3,vw=3e4;function rm(i){const t=gw(),e=_w();let n=!1,s=Date.now(),r=0;const o={get isOpen(){return i.open&&!n},send:l=>{!i.open||n||t(l,h=>void i.send(h))},close:()=>{n||(c(),i.close())},onopen:()=>{},onmessage:()=>{},onclose:()=>{}},a=()=>{s=Date.now();let l=Date.now();r=window.setInterval(()=>{if(n)return;const h=Date.now();if(h-l>np*3&&(s=h),l=h,h-s>vw)return o.close();i.open&&i.send("~")},np)};i.open&&a(),i.on("open",()=>{r||a(),o.onopen()}),i.on("data",l=>{if(s=Date.now(),typeof l!="string"||l==="~")return;const h=e(l);h!==null&&o.onmessage(h)});function c(){n||(n=!0,clearInterval(r),o.onclose())}return i.on("close",c),i.on("error",c),o}async function xw(i,t){const e=await sm();let n="";try{n=localStorage.getItem(ep)??""}catch{}const s=()=>`mincraft-${Math.random().toString(36).slice(2,8)}${Math.random().toString(36).slice(2,8)}`;/^mincraft-[a-z0-9]{6,}$/.test(n)||(n=s());const r=(o,a)=>{t({state:"connecting"});const c=new e(o,im());c.on("open",l=>{try{localStorage.setItem(ep,l)}catch{}t({state:"ready",id:l})}),c.on("connection",l=>{const h=rm(l);l.open?i.attach(h):h.onopen=()=>i.attach(h)}),c.on("disconnected",()=>{c.destroyed||setTimeout(()=>!c.destroyed&&c.reconnect(),3e3)}),c.on("error",l=>{const h=l.type;if(h==="unavailable-id"&&a<3){c.destroy(),setTimeout(()=>r(a<2?o:s(),a+1),4e3);return}if(h==="network"||h==="server-error"||h==="socket-error"||h==="socket-closed"){t({state:"error",message:"Сервер приглашений недоступен — играть можно, но друзья пока не смогут зайти"});return}h!=="peer-unavailable"&&t({state:"error",message:`Ошибка соединения: ${h??String(l)}`})}),window.addEventListener("pagehide",()=>c.destroy(),{once:!0})};r(n,0)}async function Mw(i){const t=await sm();return new Promise((e,n)=>{const s=new t(im());let r=!1;const o=c=>{r||(r=!0,s.destroy(),n(new Error(c)))},a=setTimeout(()=>o("Не удалось связаться с другом: проверьте, что у него открыта игра. Если вы в разных сетях, попробуйте одну Wi-Fi"),25e3);s.on("open",()=>{const c=s.connect(i,{reliable:!0,serialization:"raw"}),l=rm(c),h=l.onopen;l.onopen=()=>{r||(r=!0,clearTimeout(a),e(l),h())},window.addEventListener("pagehide",()=>s.destroy(),{once:!0})}),s.on("error",c=>{const l=c.type;clearTimeout(a),o(l==="peer-unavailable"?"Мир друга не найден — возможно, он закрыл игру. Попросите прислать ссылку заново":l==="network"||l==="server-error"||l==="socket-error"?"Сервер приглашений недоступен. Проверьте интернет":`Не удалось подключиться: ${l??String(c)}`)})})}function yw(i=`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`){const t=new WebSocket(i),e={get isOpen(){return t.readyState===WebSocket.OPEN},send:n=>t.readyState===WebSocket.OPEN&&t.send(n),close:()=>t.close(),onopen:()=>{},onmessage:()=>{},onclose:()=>{}};return t.addEventListener("open",()=>e.onopen()),t.addEventListener("message",n=>e.onmessage(String(n.data))),t.addEventListener("close",()=>e.onclose()),e}class Du{constructor(t){C(this,"onClose",()=>{});C(this,"handler",null);C(this,"pending",[]);C(this,"kickReason",null);C(this,"closed",!1);this.link=t,t.onmessage=e=>{let n;try{n=JSON.parse(e)}catch{return}n.t==="kick"&&(this.kickReason=n.reason),this.handler?this.handler(n):this.pending.push(n)},t.onclose=()=>{this.closed||(this.closed=!0,this.onClose(this.kickReason??"Соединение с сервером потеряно",this.kickReason!==null))}}get isOpen(){return!this.closed&&this.link.isOpen}setHandler(t){this.handler=t;const e=this.pending;this.pending=[];for(const n of e)t(n)}static connect(t,e,n=yw(),s=15e3){return new Promise((r,o)=>{const a=new Du(n),c=setTimeout(()=>{n.close(),o(new Error("Сервер не отвечает"))},s);a.handler=h=>{h.t==="welcome"&&(clearTimeout(c),a.handler=null,a.onClose=()=>{},r({conn:a,welcome:h}))},a.onClose=h=>{clearTimeout(c),o(new Error(a.kickReason?h:"Не удалось подключиться к серверу"))};const l=()=>a.send({t:"hello",name:t,color:e});n.isOpen?l():n.onopen=l})}send(t){this.isOpen&&this.link.send(JSON.stringify(t))}}const bc=J2(),ys=sw(),bw=new rE(bc);Q2(bc,yp);const Sw=`url(${eE(bc,"dirt",.55)})`;document.querySelectorAll(".dirt").forEach(i=>i.style.backgroundImage=Sw);document.title=rp;const Pu=Mt("name-input"),Gs=Mt("menu-status"),Ew=Mt("join-form"),ww=Mt("play");Pu.value=ys.name;const cc=new URLSearchParams(location.search).get("join"),Tw=Mt("color-picker"),om=()=>Tw.replaceChildren(...bp.map(i=>{const t=document.createElement("button");return t.type="button",t.className="swatch"+(i===ys.color?" selected":""),t.style.background=i,t.ariaLabel=i,t.onclick=()=>{ys.color=i,om()},t}));om();function Aw(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function am(i){const t=Hr(0,"M");t.addData(i),t.make();const e=t.getModuleCount(),n=2,s=document.createElement("canvas");s.width=s.height=e+n*2;const r=s.getContext("2d");r.fillStyle="#fff",r.fillRect(0,0,s.width,s.height),r.fillStyle="#000";for(let o=0;o<e;o++)for(let a=0;a<e;a++)t.isDark(o,a)&&r.fillRect(a+n,o+n,1,1);return s}function cm(i,t=i.replace(/^https?:\/\//,"")){const e=document.createElement("a");return e.href=i,e.textContent=t,e.target="_blank",e.className="copy",e.onclick=n=>{navigator.clipboard&&(n.preventDefault(),navigator.clipboard.writeText(i).then(()=>{e.dataset.copied="1",setTimeout(()=>delete e.dataset.copied,1500)}))},e}async function Rw(){try{const i=await fetch("api/lan",{cache:"no-store"});return i.ok&&(i.headers.get("content-type")??"").includes("json")}catch{return!1}}async function Cw(){const i=location.hostname,t=i==="localhost"||i==="127.0.0.1"||i==="[::1]";let e=[];if(t)try{const s=await(await fetch("api/lan")).json(),r=location.port?`:${location.port}`:"";e=(s.addresses??[]).map(o=>`${location.protocol}//${o}${r}`)}catch{}else{e=[location.origin];const n=document.querySelector("#share p");n&&(n.textContent="Отправьте друзьям эту ссылку или покажите QR-код:")}e.length&&(Mt("share-links").replaceChildren(...e.slice(0,3).map(n=>cm(n))),Mt("share-qr").replaceChildren(am(e[0])),Mt("share").hidden=!1)}function Lw(){const i=document.querySelector("#share p");i&&(i.textContent=cc?"Вы откроете мир друга. Чтобы играть в своём мире, нажмите «Играть в своём мире».":"Мир хранится в этом браузере. Чтобы позвать друзей, в игре откройте паузу → «Пригласить друзей» и отправьте ссылку или покажите QR-код."),Mt("share").hidden=!1}function Dw(i){const t=Mt("invite-btn"),e=Mt("invite"),n=Mt("invite-status");t.hidden=!1,t.onclick=()=>e.hidden=!e.hidden;let s="";const r=()=>{s&&(n.textContent=i.guests?`Друзей в игре: ${i.guests}`:"Ждём друзей — отправьте им ссылку:")};i.onGuestsChange=r,xw(i,o=>{o.state==="connecting"?n.textContent="Подключаемся к серверу приглашений…":o.state==="error"?n.textContent=o.message:(s=`${location.origin}${location.pathname}?join=${encodeURIComponent(o.id)}${mw()}`,Mt("invite-link").replaceChildren(cm(s,"Ссылка-приглашение (нажмите, чтобы скопировать)")),Mt("invite-qr").replaceChildren(am(s)),r())}).catch(o=>{console.error(o),n.textContent="Не удалось загрузить модуль приглашений"})}let Vh=!1,Nl=!1;function Pw(){const i=Pu.value.trim().replace(/\s+/g," ");return!i||i.length>Am||!/^[\p{L}\p{N}_\- ]+$/u.test(i)?(Gs.textContent="Ник: буквы, цифры, пробел, _ или -",null):Aw()?(ys.name=i,Wa(ys),i):(Gs.textContent="Браузер не поддерживает WebGL 2 — игра не запустится",null)}const ip=i=>document.querySelectorAll("#join-form button").forEach(t=>t.disabled=i);async function Sc(i){if(Nl)return;const t=Pw();if(t){Nl=!0,ip(!0);try{let e,n=null;i.kind==="local"?(Gs.textContent=i.fresh?"Создаём новый мир…":"Открываем мир…",n=await Lu.start(i.fresh),e=n.connectLocal()):i.kind==="peer"?(Gs.textContent="Подключаемся к другу…",e=await Mw(i.id)):Gs.textContent="Подключение…";const{conn:s,welcome:r}=await Du.connect(t,ys.color,e);Gs.textContent="";const o=new uw(s,r,ys,bw,bc);n&&Dw(n),new URLSearchParams(location.search).has("debug")&&Object.assign(window,{game:o,host:n})}catch(e){console.error(e),Gs.textContent=e.message,Nl=!1,ip(!1)}}}const lm=()=>Vh?{kind:"server"}:cc?{kind:"peer",id:cc}:{kind:"local",fresh:!1};Ew.onsubmit=i=>{i.preventDefault(),Sc(lm())};Mt("own-world").onclick=()=>void Sc({kind:"local",fresh:!1});Mt("new-world").onclick=()=>{confirm("Начать новый мир? Текущий мир в этом браузере будет удалён.")&&Sc({kind:"local",fresh:!0})};async function Iw(){Vh=await Rw(),Vh?Cw():(Mt("world-actions").hidden=!1,cc&&(Mt("invite-banner").hidden=!1,ww.textContent="Присоединиться к другу",Mt("own-world").hidden=!1,Mt("new-world").hidden=!0),Lw());let i=!1;try{i=sessionStorage.getItem(Hh)==="1",sessionStorage.removeItem(Hh)}catch{}i&&ys.name?Sc(lm()):matchMedia("(pointer: coarse)").matches||Pu.focus()}Iw();
