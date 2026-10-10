var Mm=Object.defineProperty;var ym=(i,t,e)=>t in i?Mm(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var w=(i,t,e)=>ym(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const Wr=function(i,t){let s=i;const r=go[t];let o=null,a=0,c=null;const l=[],h={},u=function(S,L){a=s*4+17,o=(function(x){const y=new Array(x);for(let A=0;A<x;A+=1){y[A]=new Array(x);for(let P=0;P<x;P+=1)y[A][P]=null}return y})(a),f(0,0),f(a-7,0),f(0,a-7),_(),m(),p(S,L),s>=7&&g(S),c==null&&(c=v(s,r,l)),M(c,L)},f=function(S,L){for(let x=-1;x<=7;x+=1)if(!(S+x<=-1||a<=S+x))for(let y=-1;y<=7;y+=1)L+y<=-1||a<=L+y||(0<=x&&x<=6&&(y==0||y==6)||0<=y&&y<=6&&(x==0||x==6)||2<=x&&x<=4&&2<=y&&y<=4?o[S+x][L+y]=!0:o[S+x][L+y]=!1)},d=function(){let S=0,L=0;for(let x=0;x<8;x+=1){u(!0,x);const y=Zi.getLostPoint(h);(x==0||S>y)&&(S=y,L=x)}return L},m=function(){for(let S=8;S<a-8;S+=1)o[S][6]==null&&(o[S][6]=S%2==0);for(let S=8;S<a-8;S+=1)o[6][S]==null&&(o[6][S]=S%2==0)},_=function(){const S=Zi.getPatternPosition(s);for(let L=0;L<S.length;L+=1)for(let x=0;x<S.length;x+=1){const y=S[L],A=S[x];if(o[y][A]==null)for(let P=-2;P<=2;P+=1)for(let N=-2;N<=2;N+=1)P==-2||P==2||N==-2||N==2||P==0&&N==0?o[y+P][A+N]=!0:o[y+P][A+N]=!1}},g=function(S){const L=Zi.getBCHTypeNumber(s);for(let x=0;x<18;x+=1){const y=!S&&(L>>x&1)==1;o[Math.floor(x/3)][x%3+a-8-3]=y}for(let x=0;x<18;x+=1){const y=!S&&(L>>x&1)==1;o[x%3+a-8-3][Math.floor(x/3)]=y}},p=function(S,L){const x=r<<3|L,y=Zi.getBCHTypeInfo(x);for(let A=0;A<15;A+=1){const P=!S&&(y>>A&1)==1;A<6?o[A][8]=P:A<8?o[A+1][8]=P:o[a-15+A][8]=P}for(let A=0;A<15;A+=1){const P=!S&&(y>>A&1)==1;A<8?o[8][a-A-1]=P:A<9?o[8][15-A-1+1]=P:o[8][15-A-1]=P}o[a-8][8]=!S},M=function(S,L){let x=-1,y=a-1,A=7,P=0;const N=Zi.getMaskFunction(L);for(let z=a-1;z>0;z-=2)for(z==6&&(z-=1);;){for(let X=0;X<2;X+=1)if(o[y][z-X]==null){let W=!1;P<S.length&&(W=(S[P]>>>A&1)==1),N(y,z-X)&&(W=!W),o[y][z-X]=W,A-=1,A==-1&&(P+=1,A=7)}if(y+=x,y<0||a<=y){y-=x,x=-x;break}}},b=function(S,L){let x=0,y=0,A=0;const P=new Array(L.length),N=new Array(L.length);for(let K=0;K<L.length;K+=1){const G=L[K].dataCount,Z=L[K].totalCount-G;y=Math.max(y,G),A=Math.max(A,Z),P[K]=new Array(G);for(let zt=0;zt<P[K].length;zt+=1)P[K][zt]=255&S.getBuffer()[zt+x];x+=G;const rt=Zi.getErrorCorrectPolynomial(Z),Ut=So(P[K],rt.getLength()-1).mod(rt);N[K]=new Array(rt.getLength()-1);for(let zt=0;zt<N[K].length;zt+=1){const te=zt+Ut.getLength()-N[K].length;N[K][zt]=te>=0?Ut.getAt(te):0}}let z=0;for(let K=0;K<L.length;K+=1)z+=L[K].totalCount;const X=new Array(z);let W=0;for(let K=0;K<y;K+=1)for(let G=0;G<L.length;G+=1)K<P[G].length&&(X[W]=P[G][K],W+=1);for(let K=0;K<A;K+=1)for(let G=0;G<L.length;G+=1)K<N[G].length&&(X[W]=N[G][K],W+=1);return X},v=function(S,L,x){const y=Yu.getRSBlocks(S,L),A=Ku();for(let N=0;N<x.length;N+=1){const z=x[N];A.put(z.getMode(),4),A.put(z.getLength(),Zi.getLengthInBits(z.getMode(),S)),z.write(A)}let P=0;for(let N=0;N<y.length;N+=1)P+=y[N].dataCount;if(A.getLengthInBits()>P*8)throw"code length overflow. ("+A.getLengthInBits()+">"+P*8+")";for(A.getLengthInBits()+4<=P*8&&A.put(0,4);A.getLengthInBits()%8!=0;)A.putBit(!1);for(;!(A.getLengthInBits()>=P*8||(A.put(236,8),A.getLengthInBits()>=P*8));)A.put(17,8);return b(A,y)};h.addData=function(S,L){L=L||"Byte";let x=null;switch(L){case"Numeric":x=bm(S);break;case"Alphanumeric":x=Sm(S);break;case"Byte":x=Em(S);break;case"Kanji":x=wm(S);break;default:throw"mode:"+L}l.push(x),c=null},h.isDark=function(S,L){if(S<0||a<=S||L<0||a<=L)throw S+","+L;return o[S][L]},h.getModuleCount=function(){return a},h.make=function(){if(s<1){let S=1;for(;S<40;S++){const L=Yu.getRSBlocks(S,r),x=Ku();for(let A=0;A<l.length;A++){const P=l[A];x.put(P.getMode(),4),x.put(P.getLength(),Zi.getLengthInBits(P.getMode(),S)),P.write(x)}let y=0;for(let A=0;A<L.length;A++)y+=L[A].dataCount;if(x.getLengthInBits()<=y*8)break}s=S}u(!1,d())},h.createTableTag=function(S,L){S=S||2,L=typeof L>"u"?S*4:L;let x="";x+='<table style="',x+=" border-width: 0px; border-style: none;",x+=" border-collapse: collapse;",x+=" padding: 0px; margin: "+L+"px;",x+='">',x+="<tbody>";for(let y=0;y<h.getModuleCount();y+=1){x+="<tr>";for(let A=0;A<h.getModuleCount();A+=1)x+='<td style="',x+=" border-width: 0px; border-style: none;",x+=" border-collapse: collapse;",x+=" padding: 0px; margin: 0px;",x+=" width: "+S+"px;",x+=" height: "+S+"px;",x+=" background-color: ",x+=h.isDark(y,A)?"#000000":"#ffffff",x+=";",x+='"/>';x+="</tr>"}return x+="</tbody>",x+="</table>",x},h.createSvgTag=function(S,L,x,y){let A={};typeof arguments[0]=="object"&&(A=arguments[0],S=A.cellSize,L=A.margin,x=A.alt,y=A.title),S=S||2,L=typeof L>"u"?S*4:L,x=typeof x=="string"?{text:x}:x||{},x.text=x.text||null,x.id=x.text?x.id||"qrcode-description":null,y=typeof y=="string"?{text:y}:y||{},y.text=y.text||null,y.id=y.text?y.id||"qrcode-title":null;const P=h.getModuleCount()*S+L*2;let N,z,X,W,K="",G;for(G="l"+S+",0 0,"+S+" -"+S+",0 0,-"+S+"z ",K+='<svg version="1.1" xmlns="http://www.w3.org/2000/svg"',K+=A.scalable?"":' width="'+P+'px" height="'+P+'px"',K+=' viewBox="0 0 '+P+" "+P+'" ',K+=' preserveAspectRatio="xMinYMin meet"',K+=y.text||x.text?' role="img" aria-labelledby="'+E([y.id,x.id].join(" ").trim())+'"':"",K+=">",K+=y.text?'<title id="'+E(y.id)+'">'+E(y.text)+"</title>":"",K+=x.text?'<description id="'+E(x.id)+'">'+E(x.text)+"</description>":"",K+='<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>',K+='<path d="',X=0;X<h.getModuleCount();X+=1)for(W=X*S+L,N=0;N<h.getModuleCount();N+=1)h.isDark(X,N)&&(z=N*S+L,K+="M"+z+","+W+G);return K+='" stroke="transparent" fill="black"/>',K+="</svg>",K},h.createDataURL=function(S,L){S=S||2,L=typeof L>"u"?S*4:L;const x=h.getModuleCount()*S+L*2,y=L,A=x-L;return Cm(x,x,function(P,N){if(y<=P&&P<A&&y<=N&&N<A){const z=Math.floor((P-y)/S),X=Math.floor((N-y)/S);return h.isDark(X,z)?0:1}else return 1})},h.createImgTag=function(S,L,x){S=S||2,L=typeof L>"u"?S*4:L;const y=h.getModuleCount()*S+L*2;let A="";return A+="<img",A+=' src="',A+=h.createDataURL(S,L),A+='"',A+=' width="',A+=y,A+='"',A+=' height="',A+=y,A+='"',x&&(A+=' alt="',A+=E(x),A+='"'),A+="/>",A};const E=function(S){let L="";for(let x=0;x<S.length;x+=1){const y=S.charAt(x);switch(y){case"<":L+="&lt;";break;case">":L+="&gt;";break;case"&":L+="&amp;";break;case'"':L+="&quot;";break;default:L+=y;break}}return L},T=function(S){S=typeof S>"u"?2:S;const x=h.getModuleCount()*1+S*2,y=S,A=x-S;let P,N,z,X,W;const K={"██":"█","█ ":"▀"," █":"▄","  ":" "},G={"██":"▀","█ ":"▀"," █":" ","  ":" "};let Z="";for(P=0;P<x;P+=2){for(z=Math.floor((P-y)/1),X=Math.floor((P+1-y)/1),N=0;N<x;N+=1)W="█",y<=N&&N<A&&y<=P&&P<A&&h.isDark(z,Math.floor((N-y)/1))&&(W=" "),y<=N&&N<A&&y<=P+1&&P+1<A&&h.isDark(X,Math.floor((N-y)/1))?W+=" ":W+="█",Z+=S<1&&P+1>=A?G[W]:K[W];Z+=`
`}return x%2&&S>0?Z.substring(0,Z.length-x-1)+Array(x+1).join("▀"):Z.substring(0,Z.length-1)};return h.createASCII=function(S,L){if(S=S||1,S<2)return T(L);S-=1,L=typeof L>"u"?S*2:L;const x=h.getModuleCount()*S+L*2,y=L,A=x-L;let P,N,z,X;const W=Array(S+1).join("██"),K=Array(S+1).join("  ");let G="",Z="";for(P=0;P<x;P+=1){for(z=Math.floor((P-y)/S),Z="",N=0;N<x;N+=1)X=1,y<=N&&N<A&&y<=P&&P<A&&h.isDark(z,Math.floor((N-y)/S))&&(X=0),Z+=X?W:K;for(z=0;z<S;z+=1)G+=Z+`
`}return G.substring(0,G.length-1)},h.renderTo2dContext=function(S,L){L=L||2;const x=h.getModuleCount();for(let y=0;y<x;y++)for(let A=0;A<x;A++)S.fillStyle=h.isDark(y,A)?"black":"white",S.fillRect(A*L,y*L,L,L)},h};Wr.stringToBytes=function(i){const t=[];for(let e=0;e<i.length;e+=1){const n=i.charCodeAt(e);t.push(n&255)}return t};Wr.createStringToBytes=function(i,t){const e=(function(){const s=Am(i),r=function(){const c=s.read();if(c==-1)throw"eof";return c};let o=0;const a={};for(;;){const c=s.read();if(c==-1)break;const l=r(),h=r(),u=r(),f=String.fromCharCode(c<<8|l),d=h<<8|u;a[f]=d,o+=1}if(o!=t)throw o+" != "+t;return a})(),n=63;return function(s){const r=[];for(let o=0;o<s.length;o+=1){const a=s.charCodeAt(o);if(a<128)r.push(a);else{const c=e[s.charAt(o)];typeof c=="number"?(c&255)==c?r.push(c):(r.push(c>>>8),r.push(c&255)):r.push(n)}}return r}};const vn={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},go={L:1,M:0,Q:3,H:2},ji={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},Zi=(function(){const i=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],t=1335,e=7973,n=21522,s={},r=function(o){let a=0;for(;o!=0;)a+=1,o>>>=1;return a};return s.getBCHTypeInfo=function(o){let a=o<<10;for(;r(a)-r(t)>=0;)a^=t<<r(a)-r(t);return(o<<10|a)^n},s.getBCHTypeNumber=function(o){let a=o<<12;for(;r(a)-r(e)>=0;)a^=e<<r(a)-r(e);return o<<12|a},s.getPatternPosition=function(o){return i[o-1]},s.getMaskFunction=function(o){switch(o){case ji.PATTERN000:return function(a,c){return(a+c)%2==0};case ji.PATTERN001:return function(a,c){return a%2==0};case ji.PATTERN010:return function(a,c){return c%3==0};case ji.PATTERN011:return function(a,c){return(a+c)%3==0};case ji.PATTERN100:return function(a,c){return(Math.floor(a/2)+Math.floor(c/3))%2==0};case ji.PATTERN101:return function(a,c){return a*c%2+a*c%3==0};case ji.PATTERN110:return function(a,c){return(a*c%2+a*c%3)%2==0};case ji.PATTERN111:return function(a,c){return(a*c%3+(a+c)%2)%2==0};default:throw"bad maskPattern:"+o}},s.getErrorCorrectPolynomial=function(o){let a=So([1],0);for(let c=0;c<o;c+=1)a=a.multiply(So([1,ls.gexp(c)],0));return a},s.getLengthInBits=function(o,a){if(1<=a&&a<10)switch(o){case vn.MODE_NUMBER:return 10;case vn.MODE_ALPHA_NUM:return 9;case vn.MODE_8BIT_BYTE:return 8;case vn.MODE_KANJI:return 8;default:throw"mode:"+o}else if(a<27)switch(o){case vn.MODE_NUMBER:return 12;case vn.MODE_ALPHA_NUM:return 11;case vn.MODE_8BIT_BYTE:return 16;case vn.MODE_KANJI:return 10;default:throw"mode:"+o}else if(a<41)switch(o){case vn.MODE_NUMBER:return 14;case vn.MODE_ALPHA_NUM:return 13;case vn.MODE_8BIT_BYTE:return 16;case vn.MODE_KANJI:return 12;default:throw"mode:"+o}else throw"type:"+a},s.getLostPoint=function(o){const a=o.getModuleCount();let c=0;for(let u=0;u<a;u+=1)for(let f=0;f<a;f+=1){let d=0;const m=o.isDark(u,f);for(let _=-1;_<=1;_+=1)if(!(u+_<0||a<=u+_))for(let g=-1;g<=1;g+=1)f+g<0||a<=f+g||_==0&&g==0||m==o.isDark(u+_,f+g)&&(d+=1);d>5&&(c+=3+d-5)}for(let u=0;u<a-1;u+=1)for(let f=0;f<a-1;f+=1){let d=0;o.isDark(u,f)&&(d+=1),o.isDark(u+1,f)&&(d+=1),o.isDark(u,f+1)&&(d+=1),o.isDark(u+1,f+1)&&(d+=1),(d==0||d==4)&&(c+=3)}for(let u=0;u<a;u+=1)for(let f=0;f<a-6;f+=1)o.isDark(u,f)&&!o.isDark(u,f+1)&&o.isDark(u,f+2)&&o.isDark(u,f+3)&&o.isDark(u,f+4)&&!o.isDark(u,f+5)&&o.isDark(u,f+6)&&(c+=40);for(let u=0;u<a;u+=1)for(let f=0;f<a-6;f+=1)o.isDark(f,u)&&!o.isDark(f+1,u)&&o.isDark(f+2,u)&&o.isDark(f+3,u)&&o.isDark(f+4,u)&&!o.isDark(f+5,u)&&o.isDark(f+6,u)&&(c+=40);let l=0;for(let u=0;u<a;u+=1)for(let f=0;f<a;f+=1)o.isDark(f,u)&&(l+=1);const h=Math.abs(100*l/a/a-50)/5;return c+=h*10,c},s})(),ls=(function(){const i=new Array(256),t=new Array(256);for(let n=0;n<8;n+=1)i[n]=1<<n;for(let n=8;n<256;n+=1)i[n]=i[n-4]^i[n-5]^i[n-6]^i[n-8];for(let n=0;n<255;n+=1)t[i[n]]=n;const e={};return e.glog=function(n){if(n<1)throw"glog("+n+")";return t[n]},e.gexp=function(n){for(;n<0;)n+=255;for(;n>=256;)n-=255;return i[n]},e})(),So=function(i,t){if(typeof i.length>"u")throw i.length+"/"+t;const e=(function(){let s=0;for(;s<i.length&&i[s]==0;)s+=1;const r=new Array(i.length-s+t);for(let o=0;o<i.length-s;o+=1)r[o]=i[o+s];return r})(),n={};return n.getAt=function(s){return e[s]},n.getLength=function(){return e.length},n.multiply=function(s){const r=new Array(n.getLength()+s.getLength()-1);for(let o=0;o<n.getLength();o+=1)for(let a=0;a<s.getLength();a+=1)r[o+a]^=ls.gexp(ls.glog(n.getAt(o))+ls.glog(s.getAt(a)));return So(r,0)},n.mod=function(s){if(n.getLength()-s.getLength()<0)return n;const r=ls.glog(n.getAt(0))-ls.glog(s.getAt(0)),o=new Array(n.getLength());for(let a=0;a<n.getLength();a+=1)o[a]=n.getAt(a);for(let a=0;a<s.getLength();a+=1)o[a]^=ls.gexp(ls.glog(s.getAt(a))+r);return So(o,0).mod(s)},n},Yu=(function(){const i=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(s,r){const o={};return o.totalCount=s,o.dataCount=r,o},e={},n=function(s,r){switch(r){case go.L:return i[(s-1)*4+0];case go.M:return i[(s-1)*4+1];case go.Q:return i[(s-1)*4+2];case go.H:return i[(s-1)*4+3];default:return}};return e.getRSBlocks=function(s,r){const o=n(s,r);if(typeof o>"u")throw"bad rs block @ typeNumber:"+s+"/errorCorrectionLevel:"+r;const a=o.length/3,c=[];for(let l=0;l<a;l+=1){const h=o[l*3+0],u=o[l*3+1],f=o[l*3+2];for(let d=0;d<h;d+=1)c.push(t(u,f))}return c},e})(),Ku=function(){const i=[];let t=0;const e={};return e.getBuffer=function(){return i},e.getAt=function(n){const s=Math.floor(n/8);return(i[s]>>>7-n%8&1)==1},e.put=function(n,s){for(let r=0;r<s;r+=1)e.putBit((n>>>s-r-1&1)==1)},e.getLengthInBits=function(){return t},e.putBit=function(n){const s=Math.floor(t/8);i.length<=s&&i.push(0),n&&(i[s]|=128>>>t%8),t+=1},e},bm=function(i){const t=vn.MODE_NUMBER,e=i,n={};n.getMode=function(){return t},n.getLength=function(o){return e.length},n.write=function(o){const a=e;let c=0;for(;c+2<a.length;)o.put(s(a.substring(c,c+3)),10),c+=3;c<a.length&&(a.length-c==1?o.put(s(a.substring(c,c+1)),4):a.length-c==2&&o.put(s(a.substring(c,c+2)),7))};const s=function(o){let a=0;for(let c=0;c<o.length;c+=1)a=a*10+r(o.charAt(c));return a},r=function(o){if("0"<=o&&o<="9")return o.charCodeAt(0)-48;throw"illegal char :"+o};return n},Sm=function(i){const t=vn.MODE_ALPHA_NUM,e=i,n={};n.getMode=function(){return t},n.getLength=function(r){return e.length},n.write=function(r){const o=e;let a=0;for(;a+1<o.length;)r.put(s(o.charAt(a))*45+s(o.charAt(a+1)),11),a+=2;a<o.length&&r.put(s(o.charAt(a)),6)};const s=function(r){if("0"<=r&&r<="9")return r.charCodeAt(0)-48;if("A"<=r&&r<="Z")return r.charCodeAt(0)-65+10;switch(r){case" ":return 36;case"$":return 37;case"%":return 38;case"*":return 39;case"+":return 40;case"-":return 41;case".":return 42;case"/":return 43;case":":return 44;default:throw"illegal char :"+r}};return n},Em=function(i){const t=vn.MODE_8BIT_BYTE,e=Wr.stringToBytes(i),n={};return n.getMode=function(){return t},n.getLength=function(s){return e.length},n.write=function(s){for(let r=0;r<e.length;r+=1)s.put(e[r],8)},n},wm=function(i){const t=vn.MODE_KANJI,e=Wr.stringToBytes;(function(r,o){const a=e(r);if(a.length!=2||(a[0]<<8|a[1])!=o)throw"sjis not supported."})("友",38726);const n=e(i),s={};return s.getMode=function(){return t},s.getLength=function(r){return~~(n.length/2)},s.write=function(r){const o=n;let a=0;for(;a+1<o.length;){let c=(255&o[a])<<8|255&o[a+1];if(33088<=c&&c<=40956)c-=33088;else if(57408<=c&&c<=60351)c-=49472;else throw"illegal char at "+(a+1)+"/"+c;c=(c>>>8&255)*192+(c&255),r.put(c,13),a+=2}if(a<o.length)throw"illegal char at "+(a+1)},s},lp=function(){const i=[],t={};return t.writeByte=function(e){i.push(e&255)},t.writeShort=function(e){t.writeByte(e),t.writeByte(e>>>8)},t.writeBytes=function(e,n,s){n=n||0,s=s||e.length;for(let r=0;r<s;r+=1)t.writeByte(e[r+n])},t.writeString=function(e){for(let n=0;n<e.length;n+=1)t.writeByte(e.charCodeAt(n))},t.toByteArray=function(){return i},t.toString=function(){let e="";e+="[";for(let n=0;n<i.length;n+=1)n>0&&(e+=","),e+=i[n];return e+="]",e},t},Tm=function(){let i=0,t=0,e=0,n="";const s={},r=function(a){n+=String.fromCharCode(o(a&63))},o=function(a){if(a<0)throw"n:"+a;if(a<26)return 65+a;if(a<52)return 97+(a-26);if(a<62)return 48+(a-52);if(a==62)return 43;if(a==63)return 47;throw"n:"+a};return s.writeByte=function(a){for(i=i<<8|a&255,t+=8,e+=1;t>=6;)r(i>>>t-6),t-=6},s.flush=function(){if(t>0&&(r(i<<6-t),i=0,t=0),e%3!=0){const a=3-e%3;for(let c=0;c<a;c+=1)n+="="}},s.toString=function(){return n},s},Am=function(i){const t=i;let e=0,n=0,s=0;const r={};r.read=function(){for(;s<8;){if(e>=t.length){if(s==0)return-1;throw"unexpected end of file./"+s}const c=t.charAt(e);if(e+=1,c=="=")return s=0,-1;if(c.match(/^\s$/))continue;n=n<<6|o(c.charCodeAt(0)),s+=6}const a=n>>>s-8&255;return s-=8,a};const o=function(a){if(65<=a&&a<=90)return a-65;if(97<=a&&a<=122)return a-97+26;if(48<=a&&a<=57)return a-48+52;if(a==43)return 62;if(a==47)return 63;throw"c:"+a};return r},Rm=function(i,t){const e=i,n=t,s=new Array(i*t),r={};r.setPixel=function(l,h,u){s[h*e+l]=u},r.write=function(l){l.writeString("GIF87a"),l.writeShort(e),l.writeShort(n),l.writeByte(128),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(0),l.writeByte(255),l.writeByte(255),l.writeByte(255),l.writeString(","),l.writeShort(0),l.writeShort(0),l.writeShort(e),l.writeShort(n),l.writeByte(0);const h=2,u=a(h);l.writeByte(h);let f=0;for(;u.length-f>255;)l.writeByte(255),l.writeBytes(u,f,255),f+=255;l.writeByte(u.length-f),l.writeBytes(u,f,u.length-f),l.writeByte(0),l.writeString(";")};const o=function(l){const h=l;let u=0,f=0;const d={};return d.write=function(m,_){if(m>>>_)throw"length over";for(;u+_>=8;)h.writeByte(255&(m<<u|f)),_-=8-u,m>>>=8-u,f=0,u=0;f=m<<u|f,u=u+_},d.flush=function(){u>0&&h.writeByte(f)},d},a=function(l){const h=1<<l,u=(1<<l)+1;let f=l+1;const d=c();for(let M=0;M<h;M+=1)d.add(String.fromCharCode(M));d.add(String.fromCharCode(h)),d.add(String.fromCharCode(u));const m=lp(),_=o(m);_.write(h,f);let g=0,p=String.fromCharCode(s[g]);for(g+=1;g<s.length;){const M=String.fromCharCode(s[g]);g+=1,d.contains(p+M)?p=p+M:(_.write(d.indexOf(p),f),d.size()<4095&&(d.size()==1<<f&&(f+=1),d.add(p+M)),p=M)}return _.write(d.indexOf(p),f),_.write(u,f),_.flush(),m.toByteArray()},c=function(){const l={};let h=0;const u={};return u.add=function(f){if(u.contains(f))throw"dup key:"+f;l[f]=h,h+=1},u.size=function(){return h},u.indexOf=function(f){return l[f]},u.contains=function(f){return typeof l[f]<"u"},u};return r},Cm=function(i,t,e){const n=Rm(i,t);for(let a=0;a<t;a+=1)for(let c=0;c<i;c+=1)n.setPixel(c,a,e(c,a));const s=lp();n.write(s);const r=Tm(),o=s.toByteArray();for(let a=0;a<o.length;a+=1)r.writeByte(o[a]);return r.flush(),"data:image/gif;base64,"+r};Wr.stringToBytes;const hp="Mincraft",Bt=16,Ae=128,Lm=Bt*Bt*Ae,Tn=46,up=24e3,Cc=6,Dm=16;function Hn(i,t,e){return(t*Bt+e)*Bt+i}function tn(i,t){return`${i},${t}`}const jh=10,Ge=(1<<jh)-1,Kt=i=>i&Ge,bs=i=>i>>>jh,ei=(i,t=0)=>(i|t<<jh)&65535,ko=[[0,0,-1],[1,0,0],[0,0,1],[-1,0,0]],zl=[5,0,4,1],wr=i=>i+2&3,C={AIR:0,STONE:1,GRASS:2,DIRT:3,COBBLESTONE:4,OAK_PLANKS:5,BIRCH_PLANKS:6,SPRUCE_PLANKS:7,OAK_LOG:8,BIRCH_LOG:9,SPRUCE_LOG:10,OAK_LEAVES:11,BIRCH_LEAVES:12,SPRUCE_LEAVES:13,SAND:14,GRAVEL:15,SANDSTONE:16,GLASS:17,BEDROCK:18,WATER:19,LAVA:20,COAL_ORE:21,IRON_ORE:22,GOLD_ORE:23,DIAMOND_ORE:24,SNOW_BLOCK:25,SNOWY_GRASS:26,ICE:27,CACTUS:28,TALL_GRASS:29,DANDELION:30,POPPY:31,DEAD_BUSH:32,BRICKS:33,STONE_BRICKS:34,MOSSY_COBBLESTONE:35,OBSIDIAN:36,BOOKSHELF:37,GLOWSTONE:38,WHITE_WOOL:39,RED_WOOL:40,PINK_WOOL:41,YELLOW_WOOL:42,GREEN_WOOL:43,BLUE_WOOL:44,PURPLE_WOOL:45,BLACK_WOOL:46,CRAFTING_TABLE:47,FURNACE:48,LIT_FURNACE:49,CHEST:50,TORCH:51,LADDER:52,OAK_DOOR:53,OAK_FENCE:54,OAK_SLAB:55,COBBLESTONE_SLAB:56,STONE_SLAB:57,OAK_STAIRS:58,COBBLESTONE_STAIRS:59,STONE_BRICK_STAIRS:60,BED:61,FARMLAND:62,WHEAT:63,OAK_SAPLING:64,BIRCH_SAPLING:65,SPRUCE_SAPLING:66,TNT:67,IRON_BLOCK:68,GOLD_BLOCK:69,DIAMOND_BLOCK:70,GLASS_PANE:71,OAK_TRAPDOOR:72,OAK_FENCE_GATE:73,PUMPKIN:74,JACK_O_LANTERN:75,SUGAR_CANE:76},fp=286,dp=287,pp=273,It=i=>()=>i,ws=(i,t,e=t)=>(n,s)=>s===2?t:s===3?e:i,Zh=(i,t)=>(e,n)=>{const s=e&3;return(s===1?n<=1:s===2?n>=4:n===2||n===3)?t:i},Oo=(i,t,e,n=e)=>(s,r)=>r===2?e:r===3?n:r===zl[s&3]?i:t,Pm={shape:"cube",layer:"opaque",solid:!0,fullCube:!0,opacity:15,light:0,hardness:1,tool:null,harvestLevel:-1,sound:"stone",replaceable:!1,gravity:!1,climbable:!1,wave:0,cullSame:!1},Fo=[];function ft(i,t,e,n,s={}){const r={...Pm,key:t,name:e,tiles:n,item:i,...s};(r.shape!=="cube"||r.layer!=="opaque")&&s.fullCube===void 0&&(r.fullCube=!1),!r.fullCube&&s.opacity===void 0&&(r.opacity=0),Fo[i]=r}const Ki=(i={})=>({shape:"cross",layer:"cutout",solid:!1,hardness:0,sound:"grass",wave:2,...i}),Jh={layer:"cutout",opacity:1,hardness:.2,tool:"shears",sound:"grass",wave:1},Ln={hardness:2,tool:"axe",sound:"wood"},Ke=(i,t=0)=>({hardness:i,tool:"pickaxe",harvestLevel:t,sound:"stone"}),Ts={hardness:.8,tool:"shears",sound:"wool"};ft(C.AIR,"air","Воздух",It(""),{shape:"none",solid:!1,fullCube:!1,hardness:0,replaceable:!0,item:null});ft(C.STONE,"stone","Камень",It("stone"),Ke(1.5));ft(C.GRASS,"grass","Дёрн",ws("grass_side","grass_top","dirt"),{hardness:.6,tool:"shovel",sound:"grass"});ft(C.DIRT,"dirt","Земля",It("dirt"),{hardness:.5,tool:"shovel",sound:"gravel"});ft(C.COBBLESTONE,"cobblestone","Булыжник",It("cobblestone"),Ke(2));ft(C.OAK_PLANKS,"oak_planks","Дубовые доски",It("oak_planks"),Ln);ft(C.BIRCH_PLANKS,"birch_planks","Берёзовые доски",It("birch_planks"),Ln);ft(C.SPRUCE_PLANKS,"spruce_planks","Еловые доски",It("spruce_planks"),Ln);ft(C.OAK_LOG,"oak_log","Дубовое бревно",Zh("oak_log","oak_log_top"),Ln);ft(C.BIRCH_LOG,"birch_log","Берёзовое бревно",Zh("birch_log","birch_log_top"),Ln);ft(C.SPRUCE_LOG,"spruce_log","Еловое бревно",Zh("spruce_log","spruce_log_top"),Ln);ft(C.OAK_LEAVES,"oak_leaves","Дубовая листва",It("oak_leaves"),Jh);ft(C.BIRCH_LEAVES,"birch_leaves","Берёзовая листва",It("birch_leaves"),Jh);ft(C.SPRUCE_LEAVES,"spruce_leaves","Еловая хвоя",It("spruce_leaves"),Jh);ft(C.SAND,"sand","Песок",It("sand"),{hardness:.5,tool:"shovel",sound:"sand",gravity:!0});ft(C.GRAVEL,"gravel","Гравий",It("gravel"),{hardness:.6,tool:"shovel",sound:"gravel",gravity:!0});ft(C.SANDSTONE,"sandstone","Песчаник",ws("sandstone_side","sandstone_top","sandstone_bottom"),Ke(.8));ft(C.GLASS,"glass","Стекло",It("glass"),{layer:"cutout",hardness:.3,sound:"glass",cullSame:!0});ft(C.BEDROCK,"bedrock","Коренная порода",It("bedrock"),{hardness:-1});ft(C.WATER,"water","Вода",(i,t)=>t===2&&!(i&8)&&(i&7)===0?"water_still":"water_flow",{shape:"fluid",layer:"translucent",solid:!1,opacity:2,hardness:-1,replaceable:!0,item:null});ft(C.LAVA,"lava","Лава",(i,t)=>t===2&&!(i&8)&&(i&7)===0?"lava_still":"lava_flow",{shape:"fluid",layer:"opaque",solid:!1,opacity:1,light:15,hardness:-1,replaceable:!0,item:null});ft(C.COAL_ORE,"coal_ore","Угольная руда",It("coal_ore"),Ke(3,0));ft(C.IRON_ORE,"iron_ore","Железная руда",It("iron_ore"),Ke(3,1));ft(C.GOLD_ORE,"gold_ore","Золотая руда",It("gold_ore"),Ke(3,2));ft(C.DIAMOND_ORE,"diamond_ore","Алмазная руда",It("diamond_ore"),Ke(3,2));ft(C.SNOW_BLOCK,"snow_block","Снег",It("snow"),{hardness:.2,tool:"shovel",sound:"snow"});ft(C.SNOWY_GRASS,"snowy_grass","Заснеженный дёрн",ws("snowy_grass_side","snow","dirt"),{hardness:.6,tool:"shovel",sound:"snow"});ft(C.ICE,"ice","Лёд",It("ice"),{layer:"translucent",opacity:2,hardness:.5,tool:"pickaxe",sound:"glass",cullSame:!0});ft(C.CACTUS,"cactus","Кактус",ws("cactus_side","cactus_top","cactus_bottom"),{shape:"cactus",layer:"cutout",hardness:.4,sound:"wool"});ft(C.TALL_GRASS,"tall_grass","Высокая трава",It("tall_grass"),Ki({replaceable:!0}));ft(C.DANDELION,"dandelion","Одуванчик",It("dandelion"),Ki());ft(C.POPPY,"poppy","Мак",It("poppy"),Ki());ft(C.DEAD_BUSH,"dead_bush","Сухой куст",It("dead_bush"),Ki({replaceable:!0,wave:0}));ft(C.BRICKS,"bricks","Кирпичи",It("bricks"),Ke(2));ft(C.STONE_BRICKS,"stone_bricks","Каменные кирпичи",It("stone_bricks"),Ke(1.5));ft(C.MOSSY_COBBLESTONE,"mossy_cobblestone","Замшелый булыжник",It("mossy_cobblestone"),Ke(2));ft(C.OBSIDIAN,"obsidian","Обсидиан",It("obsidian"),Ke(50,3));ft(C.BOOKSHELF,"bookshelf","Книжная полка",ws("bookshelf","oak_planks"),{...Ln,hardness:1.5});ft(C.GLOWSTONE,"glowstone","Светокамень",It("glowstone"),{hardness:.3,sound:"glass",light:15});ft(C.WHITE_WOOL,"white_wool","Белая шерсть",It("wool_white"),Ts);ft(C.RED_WOOL,"red_wool","Красная шерсть",It("wool_red"),Ts);ft(C.PINK_WOOL,"pink_wool","Розовая шерсть",It("wool_pink"),Ts);ft(C.YELLOW_WOOL,"yellow_wool","Жёлтая шерсть",It("wool_yellow"),Ts);ft(C.GREEN_WOOL,"green_wool","Зелёная шерсть",It("wool_green"),Ts);ft(C.BLUE_WOOL,"blue_wool","Синяя шерсть",It("wool_blue"),Ts);ft(C.PURPLE_WOOL,"purple_wool","Фиолетовая шерсть",It("wool_purple"),Ts);ft(C.BLACK_WOOL,"black_wool","Чёрная шерсть",It("wool_black"),Ts);ft(C.CRAFTING_TABLE,"crafting_table","Верстак",(i,t)=>t===2?"crafting_table_top":t===3?"oak_planks":t>=4?"crafting_table_front":"crafting_table_side",{...Ln,hardness:2.5});ft(C.FURNACE,"furnace","Печь",Oo("furnace_front","furnace_side","furnace_top"),Ke(3.5));ft(C.LIT_FURNACE,"lit_furnace","Горящая печь",Oo("furnace_front_lit","furnace_side","furnace_top"),{...Ke(3.5),light:13,item:C.FURNACE});ft(C.CHEST,"chest","Сундук",Oo("chest_front","chest_side","chest_top"),{...Ln,shape:"chest",hardness:2.5});ft(C.TORCH,"torch","Факел",It("torch"),{shape:"torch",layer:"cutout",solid:!1,hardness:0,light:14,sound:"wood"});ft(C.LADDER,"ladder","Лестница",It("ladder"),{shape:"ladder",layer:"cutout",hardness:.4,tool:"axe",sound:"wood",climbable:!0});ft(C.OAK_DOOR,"oak_door","Дубовая дверь",i=>i&8?"door_top":"door_bottom",{...Ln,shape:"door",layer:"cutout",hardness:3,item:fp});ft(C.OAK_FENCE,"oak_fence","Дубовый забор",It("oak_planks"),{...Ln,shape:"fence"});ft(C.OAK_SLAB,"oak_slab","Дубовая плита",It("oak_planks"),{...Ln,shape:"slab"});ft(C.COBBLESTONE_SLAB,"cobblestone_slab","Булыжная плита",It("cobblestone"),{...Ke(2),shape:"slab"});ft(C.STONE_SLAB,"stone_slab","Каменная плита",ws("stone_slab_side","stone_slab_top"),{...Ke(2),shape:"slab"});ft(C.OAK_STAIRS,"oak_stairs","Дубовые ступеньки",It("oak_planks"),{...Ln,shape:"stairs"});ft(C.COBBLESTONE_STAIRS,"cobblestone_stairs","Булыжные ступеньки",It("cobblestone"),{...Ke(2),shape:"stairs"});ft(C.STONE_BRICK_STAIRS,"stone_brick_stairs","Ступеньки из каменных кирпичей",It("stone_bricks"),{...Ke(1.5),shape:"stairs"});ft(C.BED,"bed","Кровать",(i,t)=>{const e=(i&4)!==0,n=i&3;return t===2?e?"bed_head_top":"bed_foot_top":t===3?"oak_planks":t===zl[n]?e?"bed_head_end":"bed_foot_side":t===zl[wr(n)]?e?"bed_head_side":"bed_foot_end":e?"bed_head_side":"bed_foot_side"},{shape:"bed",layer:"cutout",hardness:.2,sound:"wood",item:dp,topRotation:i=>i&3});ft(C.FARMLAND,"farmland","Грядка",ws("dirt","farmland_top","dirt"),{shape:"farmland",hardness:.6,tool:"shovel",sound:"gravel",item:C.DIRT});ft(C.WHEAT,"wheat","Пшеница",i=>`wheat_${Math.min(7,i&7)}`,{...Ki(),shape:"crop",item:pp});ft(C.OAK_SAPLING,"oak_sapling","Саженец дуба",It("oak_sapling"),Ki());ft(C.BIRCH_SAPLING,"birch_sapling","Саженец берёзы",It("birch_sapling"),Ki());ft(C.SPRUCE_SAPLING,"spruce_sapling","Саженец ели",It("spruce_sapling"),Ki());ft(C.TNT,"tnt","Динамит",ws("tnt_side","tnt_top","tnt_bottom"),{hardness:0,sound:"grass"});ft(C.IRON_BLOCK,"iron_block","Железный блок",It("iron_block"),{...Ke(5,1),sound:"metal"});ft(C.GOLD_BLOCK,"gold_block","Золотой блок",It("gold_block"),{...Ke(3,2),sound:"metal"});ft(C.DIAMOND_BLOCK,"diamond_block","Алмазный блок",It("diamond_block"),{...Ke(5,2),sound:"metal"});ft(C.GLASS_PANE,"glass_pane","Стеклянная панель",(i,t)=>t===2||t===3?"glass_pane_top":"glass",{shape:"pane",layer:"cutout",hardness:.3,sound:"glass"});ft(C.OAK_TRAPDOOR,"oak_trapdoor","Дубовый люк",It("trapdoor"),{...Ln,shape:"trapdoor",layer:"cutout",hardness:3});ft(C.OAK_FENCE_GATE,"oak_fence_gate","Дубовая калитка",It("oak_planks"),{...Ln,shape:"gate"});ft(C.PUMPKIN,"pumpkin","Тыква",Oo("pumpkin_face","pumpkin_side","pumpkin_top"),{hardness:1,tool:"axe",sound:"wood"});ft(C.JACK_O_LANTERN,"jack_o_lantern","Светильник Джека",Oo("jack_o_lantern","pumpkin_side","pumpkin_top"),{hardness:1,tool:"axe",sound:"wood",light:15});ft(C.SUGAR_CANE,"sugar_cane","Сахарный тростник",It("sugar_cane"),Ki({wave:0}));const oi=Fo.length,Ze=Fo,Im=["none","cube","cross","crop","fluid","torch","slab","stairs","door","ladder","fence","bed","farmland","cactus","chest","pane","trapdoor","gate"],Xr=0,fc=1,Yr=2,Bo=3,Kr=4,qr=5,xo=6,mp=7,Qh=8,$r=9,tu=10,eu=11,gp=12,_p=13,Gl=14,vp=15,nu=16,dc=17,Nm=0,xp=1,Mp=2,Um=new Set(["glowstone","lava_still","lava_flow","furnace_front_lit","torch","jack_o_lantern"]),km=["water_still","water_flow","lava_still","lava_flow",...Array.from({length:10},(i,t)=>`destroy_${t}`)],Ur=[],Hl=new Map,yp=i=>{!i||Hl.has(i)||(Hl.set(i,Ur.length),Ur.push(i))};for(const i of Fo)for(let t=0;t<64;t++)for(let e=0;e<6;e++)yp(i.tiles(t,e));km.forEach(yp);const iu=i=>Hl.get(i)??0,pn=new Uint8Array(oi),bp=new Uint8Array(oi),Vl=new Uint8Array(oi),un=new Uint8Array(oi),su=new Uint8Array(oi),ru=new Uint8Array(oi),Wl=new Uint8Array(oi),Sp=new Uint8Array(oi),Ar=new Uint8Array(oi),Rn=new Uint8Array(oi*64*6),Ep=new Uint8Array(oi*64),zo=new Uint8Array(Ur.length);Fo.forEach((i,t)=>{pn[t]=Im.indexOf(i.shape),bp[t]=i.layer==="opaque"?Nm:i.layer==="cutout"?xp:Mp,Vl[t]=i.solid?1:0,un[t]=i.fullCube?1:0,su[t]=i.opacity,ru[t]=i.light,Wl[t]=i.wave,Sp[t]=i.cullSame?1:0,Ar[t]=i.replaceable?1:0;for(let e=0;e<64;e++){for(let n=0;n<6;n++)Rn[t*384+e*6+n]=iu(i.tiles(e,n));Ep[t*64+e]=i.topRotation?i.topRotation(e)&3:0}});Ur.forEach((i,t)=>zo[t]=Um.has(i)?1:0);const Om=i=>Kt(i)===C.WATER,Lc=i=>pn[Kt(i)]===Kr,Fm=i=>bs(i)&7,Bm=i=>(bs(i)&8)!==0;function $a(i){if(Bm(i))return 1;const t=Fm(i);return t===0?.875:Math.max(.12,(8-t)/9*.95)}const qu={[C.OAK_SLAB]:C.OAK_PLANKS,[C.COBBLESTONE_SLAB]:C.COBBLESTONE,[C.STONE_SLAB]:C.STONE};function zm(i,t,e,n){const s=Kt(i(t,e-1,n));if(s===C.SUGAR_CANE)return!0;if(s!==C.GRASS&&s!==C.DIRT&&s!==C.SAND&&s!==C.SNOWY_GRASS)return!1;for(const[r,,o]of ko)if(Om(i(t+r,e-1,n+o)))return!0;return!1}const j={STICK:256,COAL:257,CHARCOAL:258,IRON_INGOT:259,GOLD_INGOT:260,DIAMOND:261,FLINT:262,FLINT_AND_STEEL:263,STRING:264,FEATHER:265,GUNPOWDER:266,BONE:267,BONE_MEAL:268,ARROW:269,BOW:270,LEATHER:271,ROTTEN_FLESH:272,WHEAT_SEEDS:pp,WHEAT:274,BREAD:275,APPLE:276,PORKCHOP:277,COOKED_PORKCHOP:278,BEEF:279,STEAK:280,CHICKEN:281,COOKED_CHICKEN:282,BUCKET:283,WATER_BUCKET:284,LAVA_BUCKET:285,OAK_DOOR:fp,BED:dp,SHEARS:288,RED_DYE:289,YELLOW_DYE:290,MUTTON:291,COOKED_MUTTON:292,PAPER:293,BOOK:294},jr=new Map;function pc(i){jr.set(i.id,{maxStack:64,...i})}const Gm=new Set([C.AIR,C.WATER,C.LAVA,C.LIT_FURNACE,C.OAK_DOOR,C.BED,C.WHEAT]),Hm={[C.OAK_PLANKS]:300,[C.BIRCH_PLANKS]:300,[C.SPRUCE_PLANKS]:300,[C.OAK_LOG]:300,[C.BIRCH_LOG]:300,[C.SPRUCE_LOG]:300,[C.OAK_SLAB]:150,[C.OAK_STAIRS]:300,[C.OAK_FENCE]:300,[C.CRAFTING_TABLE]:300,[C.CHEST]:300,[C.BOOKSHELF]:300,[C.LADDER]:300,[C.OAK_TRAPDOOR]:300,[C.OAK_FENCE_GATE]:300,[C.OAK_SAPLING]:100,[C.BIRCH_SAPLING]:100,[C.SPRUCE_SAPLING]:100};for(let i=0;i<oi;i++){if(Gm.has(i))continue;const t=Ze[i];pc({id:i,key:t.key,name:t.name,places:ei(i),fuel:Hm[i],hidden:i===C.FARMLAND||i===C.SNOWY_GRASS})}const se=(i,t,e,n={})=>pc({id:i,key:t,name:e,sprite:t,...n});se(j.STICK,"stick","Палка",{fuel:100});se(j.COAL,"coal","Уголь",{fuel:1600});se(j.CHARCOAL,"charcoal","Древесный уголь",{fuel:1600});se(j.IRON_INGOT,"iron_ingot","Железный слиток");se(j.GOLD_INGOT,"gold_ingot","Золотой слиток");se(j.DIAMOND,"diamond","Алмаз");se(j.FLINT,"flint","Кремень");se(j.FLINT_AND_STEEL,"flint_and_steel","Огниво",{maxStack:1,durability:64});se(j.STRING,"string","Нить");se(j.FEATHER,"feather","Перо");se(j.GUNPOWDER,"gunpowder","Порох");se(j.BONE,"bone","Кость");se(j.BONE_MEAL,"bone_meal","Костная мука");se(j.ARROW,"arrow","Стрела");se(j.BOW,"bow","Лук",{maxStack:1,durability:384,fuel:300});se(j.LEATHER,"leather","Кожа");se(j.ROTTEN_FLESH,"rotten_flesh","Гнилая плоть",{food:{hunger:4,saturation:.8}});se(j.WHEAT_SEEDS,"wheat_seeds","Семена пшеницы",{places:ei(C.WHEAT)});se(j.WHEAT,"wheat","Пшеница");se(j.BREAD,"bread","Хлеб",{food:{hunger:5,saturation:6}});se(j.APPLE,"apple","Яблоко",{food:{hunger:4,saturation:2.4}});se(j.PORKCHOP,"porkchop","Сырая свинина",{food:{hunger:3,saturation:1.8}});se(j.COOKED_PORKCHOP,"cooked_porkchop","Жареная свинина",{food:{hunger:8,saturation:12.8}});se(j.BEEF,"beef","Сырая говядина",{food:{hunger:3,saturation:1.8}});se(j.STEAK,"steak","Стейк",{food:{hunger:8,saturation:12.8}});se(j.CHICKEN,"chicken","Сырая курица",{food:{hunger:2,saturation:1.2}});se(j.COOKED_CHICKEN,"cooked_chicken","Жареная курица",{food:{hunger:6,saturation:7.2}});se(j.MUTTON,"mutton","Сырая баранина",{food:{hunger:2,saturation:1.2}});se(j.COOKED_MUTTON,"cooked_mutton","Жареная баранина",{food:{hunger:6,saturation:9.6}});se(j.BUCKET,"bucket","Ведро",{maxStack:16});se(j.WATER_BUCKET,"water_bucket","Ведро воды",{maxStack:1});se(j.LAVA_BUCKET,"lava_bucket","Ведро лавы",{maxStack:1,fuel:2e4});se(j.OAK_DOOR,"oak_door_item","Дубовая дверь",{places:ei(C.OAK_DOOR),fuel:200});se(j.BED,"bed_item","Кровать",{maxStack:1,places:ei(C.BED)});se(j.SHEARS,"shears","Ножницы",{maxStack:1,durability:238,tool:{type:"shears",level:0,speed:5}});se(j.RED_DYE,"red_dye","Красный краситель");se(j.YELLOW_DYE,"yellow_dye","Жёлтый краситель");se(j.PAPER,"paper","Бумага");se(j.BOOK,"book","Книга");const Fi=(i,t="ый")=>({f:`${i}ая`,m:`${i}${t}`,p:`${i}ые`}),wp=[{key:"wooden",name:Fi("Деревянн"),level:0,speed:2,durability:59,damage:0,fuel:200},{key:"stone",name:Fi("Каменн"),level:1,speed:4,durability:131,damage:1,fuel:0},{key:"iron",name:Fi("Железн"),level:2,speed:6,durability:250,damage:2,fuel:0},{key:"golden",name:Fi("Золот","ой"),level:0,speed:12,durability:32,damage:0,fuel:0},{key:"diamond",name:Fi("Алмазн"),level:3,speed:8,durability:1561,damage:3,fuel:0}],Vm=[{key:"pickaxe",type:"pickaxe",name:i=>`${i.f} кирка`,damage:3},{key:"axe",type:"axe",name:i=>`${i.m} топор`,damage:4},{key:"shovel",type:"shovel",name:i=>`${i.f} лопата`,damage:2},{key:"sword",type:"sword",name:i=>`${i.m} меч`,damage:5},{key:"hoe",type:"hoe",name:i=>`${i.f} мотыга`,damage:1}];wp.forEach((i,t)=>Vm.forEach((e,n)=>{const s=`${i.key}_${e.key}`;pc({id:300+t*5+n,key:s,name:e.name(i.name),sprite:s,maxStack:1,durability:i.durability,tool:{type:e.type,level:i.level,speed:i.speed},damage:e.damage+i.damage,fuel:i.fuel||void 0})}));const Wm=[{key:"leather",name:Fi("Кожан"),points:[1,3,2,1],durability:5,color:"#8b5a2b"},{key:"iron",name:Fi("Железн"),points:[2,6,5,2],durability:15,color:"#d8d8d8"},{key:"golden",name:Fi("Золот","ой"),points:[2,5,3,1],durability:7,color:"#f2cf3a"},{key:"diamond",name:Fi("Алмазн"),points:[3,8,6,3],durability:33,color:"#5fe0d6"}],Xm=[{key:"helmet",name:i=>`${i.m} шлем`,base:11},{key:"chestplate",name:i=>`${i.m} нагрудник`,base:16},{key:"leggings",name:i=>`${i.p} поножи`,base:15},{key:"boots",name:i=>`${i.p} ботинки`,base:13}];Wm.forEach((i,t)=>Xm.forEach((e,n)=>{const s=`${i.key}_${e.key}`;pc({id:330+t*4+n,key:s,name:e.name(i.name),sprite:s,maxStack:1,durability:e.base*i.durability,armor:{slot:n,points:i.points[n],color:i.color}})}));const Tp=[...jr.values()].sort((i,t)=>i.id-t.id);function ge(i){return jr.get(i)}const Ym=i=>Number.isInteger(i)&&jr.has(i),Km=i=>{var t;return((t=jr.get(i))==null?void 0:t.name)??"?"},ps=i=>{var t;return((t=jr.get(i))==null?void 0:t.maxStack)??64},_s=i=>i<256;Tp.filter(i=>i.sprite).map(i=>i.sprite);const Ap=Tp.filter(i=>!i.hidden).map(i=>i.id),qm={pig:"свинья",cow:"корова",sheep:"овца",chicken:"курица",zombie:"зомби",skeleton:"скелет",creeper:"крипер",spider:"паук"},Yo={pig:[.9,.9],cow:[.9,1.4],sheep:[.9,1.3],chicken:[.4,.7],zombie:[.6,1.95],skeleton:[.6,1.99],creeper:[.6,1.7],spider:[1.4,.9]},Rp=["#e53935","#fb8c00","#fdd835","#43a047","#00acc1","#1e88e5","#8e24aa","#ec407a"],$u=1,$m=2,jm=4,ju=8;/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ou="180",Zm=0,Zu=1,Jm=2,Cp=1,Qm=2,ki=3,Xi=0,Cn=1,Qn=2,vs=0,Ir=1,Xl=2,Ju=3,Qu=4,tg=5,Bs=100,eg=101,ng=102,ig=103,sg=104,rg=200,og=201,ag=202,cg=203,Yl=204,Kl=205,lg=206,hg=207,ug=208,fg=209,dg=210,pg=211,mg=212,gg=213,_g=214,ql=0,$l=1,jl=2,kr=3,Zl=4,Jl=5,Ql=6,th=7,mc=0,vg=1,xg=2,xs=0,Mg=1,yg=2,bg=3,Sg=4,Eg=5,wg=6,Tg=7,Lp=300,Or=301,Fr=302,eh=303,nh=304,gc=306,ih=1e3,Ys=1001,sh=1002,ln=1003,Ag=1004,_o=1005,di=1006,Dc=1007,Ks=1008,_i=1009,Dp=1010,Pp=1011,Eo=1012,au=1013,js=1014,Ei=1015,Vi=1016,cu=1017,lu=1018,wo=1020,Ip=35902,Np=35899,Up=1021,kp=1022,pi=1023,To=1026,Ao=1027,hu=1028,uu=1029,Op=1030,fu=1031,du=1033,Fa=33776,Ba=33777,za=33778,Ga=33779,rh=35840,oh=35841,ah=35842,ch=35843,lh=36196,hh=37492,uh=37496,fh=37808,dh=37809,ph=37810,mh=37811,gh=37812,_h=37813,vh=37814,xh=37815,Mh=37816,yh=37817,bh=37818,Sh=37819,Eh=37820,wh=37821,Th=36492,Ah=36494,Rh=36495,Ch=36283,Lh=36284,Dh=36285,Ph=36286,Rg=3200,Cg=3201,_c=0,Lg=1,ds="",hn="srgb",Br="srgb-linear",ja="linear",Se="srgb",tr=7680,tf=519,Dg=512,Pg=513,Ig=514,pu=515,Ng=516,Ug=517,kg=518,Og=519,Ih=35044,qs=35048,Bi="300 es",wi=2e3,Za=2001;class Zr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const s=n[t];if(s!==void 0){const r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}}const gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ha=Math.PI/180,Nh=180/Math.PI;function Ms(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(gn[i&255]+gn[i>>8&255]+gn[i>>16&255]+gn[i>>24&255]+"-"+gn[t&255]+gn[t>>8&255]+"-"+gn[t>>16&15|64]+gn[t>>24&255]+"-"+gn[e&63|128]+gn[e>>8&255]+"-"+gn[e>>16&255]+gn[e>>24&255]+gn[n&255]+gn[n>>8&255]+gn[n>>16&255]+gn[n>>24&255]).toLowerCase()}function ce(i,t,e){return Math.max(t,Math.min(e,i))}function Fg(i,t){return(i%t+t)%t}function Pc(i,t,e){return(1-e)*i+e*t}function Si(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ee(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Ft{constructor(t=0,e=0){Ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*s+t.x,this.y=r*s+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jr{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,o,a){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const f=r[o+0],d=r[o+1],m=r[o+2],_=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=d,t[e+2]=m,t[e+3]=_;return}if(u!==_||c!==f||l!==d||h!==m){let g=1-a;const p=c*f+l*d+h*m+u*_,M=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const E=Math.sqrt(b),T=Math.atan2(E,p*M);g=Math.sin(g*T)/E,a=Math.sin(a*T)/E}const v=a*M;if(c=c*g+f*v,l=l*g+d*v,h=h*g+m*v,u=u*g+_*v,g===1-a){const E=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=E,l*=E,h*=E,u*=E}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,s,r,o){const a=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[o],f=r[o+1],d=r[o+2],m=r[o+3];return t[e]=a*m+h*u+c*d-l*f,t[e+1]=c*m+h*f+l*u-a*d,t[e+2]=l*m+h*d+a*f-c*u,t[e+3]=h*m-a*u-c*f-l*d,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(s/2),u=a(r/2),f=c(n/2),d=c(s/2),m=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"YXZ":this._x=f*h*u+l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"ZXY":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u-f*d*m;break;case"ZYX":this._x=f*h*u-l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u+f*d*m;break;case"YZX":this._x=f*h*u+l*d*m,this._y=l*d*u+f*h*m,this._z=l*h*m-f*d*u,this._w=l*h*u-f*d*m;break;case"XZY":this._x=f*h*u-l*d*m,this._y=l*d*u-f*h*m,this._z=l*h*m+f*d*u,this._w=l*h*u+f*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=n+a+u;if(f>0){const d=.5/Math.sqrt(f+1);this._w=.25/d,this._x=(h-c)*d,this._y=(r-l)*d,this._z=(o-s)*d}else if(n>a&&n>u){const d=2*Math.sqrt(1+n-a-u);this._w=(h-c)/d,this._x=.25*d,this._y=(s+o)/d,this._z=(r+l)/d}else if(a>u){const d=2*Math.sqrt(1+a-n-u);this._w=(r-l)/d,this._x=(s+o)/d,this._y=.25*d,this._z=(c+h)/d}else{const d=2*Math.sqrt(1+u-n-a);this._w=(o-s)/d,this._x=(r+l)/d,this._y=(c+h)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ce(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-s*a,this._w=o*h-n*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=s,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const d=1-e;return this._w=d*o+e*this._w,this._x=d*n+e*this._x,this._y=d*s+e*this._y,this._z=d*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=n*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,e=0,n=0){F.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ef.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ef.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*n),h=2*(a*e-r*s),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-n*c,this.z=n*a-s*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ic.copy(this).projectOnVector(t),this.sub(Ic)}reflect(t){return this.sub(Ic.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ic=new F,ef=new Jr;class Qt{constructor(t,e,n,s,r,o,a,c,l){Qt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l)}set(t,e,n,s,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],f=n[2],d=n[5],m=n[8],_=s[0],g=s[3],p=s[6],M=s[1],b=s[4],v=s[7],E=s[2],T=s[5],S=s[8];return r[0]=o*_+a*M+c*E,r[3]=o*g+a*b+c*T,r[6]=o*p+a*v+c*S,r[1]=l*_+h*M+u*E,r[4]=l*g+h*b+u*T,r[7]=l*p+h*v+u*S,r[2]=f*_+d*M+m*E,r[5]=f*g+d*b+m*T,r[8]=f*p+d*v+m*S,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+s*r*l-s*o*c}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,d=l*r-o*c,m=e*u+n*f+s*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=u*_,t[1]=(s*l-h*n)*_,t[2]=(a*n-s*o)*_,t[3]=f*_,t[4]=(h*e-s*c)*_,t[5]=(s*r-a*e)*_,t[6]=d*_,t[7]=(n*c-l*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Nc.makeScale(t,e)),this}rotate(t){return this.premultiply(Nc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Nc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Nc=new Qt;function Fp(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Ja(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Bg(){const i=Ja("canvas");return i.style.display="block",i}const nf={};function Ro(i){i in nf||(nf[i]=!0,console.warn(i))}function zg(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const sf=new Qt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),rf=new Qt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Gg(){const i={enabled:!0,workingColorSpace:Br,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===Se&&(s.r=Wi(s.r),s.g=Wi(s.g),s.b=Wi(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Se&&(s.r=Nr(s.r),s.g=Nr(s.g),s.b=Nr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ds?ja:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ro("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ro("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Br]:{primaries:t,whitePoint:n,transfer:ja,toXYZ:sf,fromXYZ:rf,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:hn},outputColorSpaceConfig:{drawingBufferColorSpace:hn}},[hn]:{primaries:t,whitePoint:n,transfer:Se,toXYZ:sf,fromXYZ:rf,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:hn}}}),i}const me=Gg();function Wi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Nr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let er;class Hg{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{er===void 0&&(er=Ja("canvas")),er.width=t.width,er.height=t.height;const s=er.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),n=er}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Ja("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Wi(r[o]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Wi(e[n]/255)*255):e[n]=Wi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Vg=0;class mu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vg++}),this.uuid=Ms(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Uc(s[o].image)):r.push(Uc(s[o]))}else r=Uc(s);n.url=r}return e||(t.images[this.uuid]=n),n}}function Uc(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Hg.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Wg=0;const kc=new F;class Sn extends Zr{constructor(t=Sn.DEFAULT_IMAGE,e=Sn.DEFAULT_MAPPING,n=Ys,s=Ys,r=di,o=Ks,a=pi,c=_i,l=Sn.DEFAULT_ANISOTROPY,h=ds){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=Ms(),this.name="",this.source=new mu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Ft(0,0),this.repeat=new Ft(1,1),this.center=new Ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Qt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(kc).x}get height(){return this.source.getSize(kc).y}get depth(){return this.source.getSize(kc).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Lp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ih:t.x=t.x-Math.floor(t.x);break;case Ys:t.x=t.x<0?0:1;break;case sh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ih:t.y=t.y-Math.floor(t.y);break;case Ys:t.y=t.y<0?0:1;break;case sh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Sn.DEFAULT_IMAGE=null;Sn.DEFAULT_MAPPING=Lp;Sn.DEFAULT_ANISOTROPY=1;class ke{constructor(t=0,e=0,n=0,s=1){ke.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*s+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r;const c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],d=c[5],m=c[9],_=c[2],g=c[6],p=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(l+d+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const b=(l+1)/2,v=(d+1)/2,E=(p+1)/2,T=(h+f)/4,S=(u+_)/4,L=(m+g)/4;return b>v&&b>E?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=T/n,r=S/n):v>E?v<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),n=T/s,r=L/s):E<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),n=S/r,s=L/r),this.set(n,s,r,e),this}let M=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(f-h)*(f-h));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(u-_)/M,this.z=(f-h)/M,this.w=Math.acos((l+d+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ce(this.x,t.x,e.x),this.y=ce(this.y,t.y,e.y),this.z=ce(this.z,t.z,e.z),this.w=ce(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ce(this.x,t,e),this.y=ce(this.y,t,e),this.z=ce(this.z,t,e),this.w=ce(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ce(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xg extends Zr{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:di,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new ke(0,0,t,e),this.scissorTest=!1,this.viewport=new ke(0,0,t,e);const s={width:t,height:e,depth:n.depth},r=new Sn(s);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(t={}){const e={minFilter:di,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const s=Object.assign({},t.textures[e].image);this.textures[e].source=new mu(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ni extends Xg{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class gu extends Sn{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ys,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Yg extends Sn{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=ln,this.minFilter=ln,this.wrapR=Ys,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yi{constructor(t=new F(1/0,1/0,1/0),e=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(ci.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(ci.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=ci.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,ci):ci.fromBufferAttribute(r,o),ci.applyMatrix4(t.matrixWorld),this.expandByPoint(ci);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ko.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ko.copy(n.boundingBox)),Ko.applyMatrix4(t.matrixWorld),this.union(Ko)}const s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ci),ci.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(so),qo.subVectors(this.max,so),nr.subVectors(t.a,so),ir.subVectors(t.b,so),sr.subVectors(t.c,so),Ji.subVectors(ir,nr),Qi.subVectors(sr,ir),Ds.subVectors(nr,sr);let e=[0,-Ji.z,Ji.y,0,-Qi.z,Qi.y,0,-Ds.z,Ds.y,Ji.z,0,-Ji.x,Qi.z,0,-Qi.x,Ds.z,0,-Ds.x,-Ji.y,Ji.x,0,-Qi.y,Qi.x,0,-Ds.y,Ds.x,0];return!Oc(e,nr,ir,sr,qo)||(e=[1,0,0,0,1,0,0,0,1],!Oc(e,nr,ir,sr,qo))?!1:($o.crossVectors(Ji,Qi),e=[$o.x,$o.y,$o.z],Oc(e,nr,ir,sr,qo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ci).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ci).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Li),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Li=[new F,new F,new F,new F,new F,new F,new F,new F],ci=new F,Ko=new Yi,nr=new F,ir=new F,sr=new F,Ji=new F,Qi=new F,Ds=new F,so=new F,qo=new F,$o=new F,Ps=new F;function Oc(i,t,e,n,s){for(let r=0,o=i.length-3;r<=o;r+=3){Ps.fromArray(i,r);const a=s.x*Math.abs(Ps.x)+s.y*Math.abs(Ps.y)+s.z*Math.abs(Ps.z),c=t.dot(Ps),l=e.dot(Ps),h=n.dot(Ps);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Kg=new Yi,ro=new F,Fc=new F;class qi{constructor(t=new F,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Kg.setFromPoints(t).getCenter(n);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ro.subVectors(t,this.center);const e=ro.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ro,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Fc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ro.copy(t.center).add(Fc)),this.expandByPoint(ro.copy(t.center).sub(Fc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const Di=new F,Bc=new F,jo=new F,ts=new F,zc=new F,Zo=new F,Gc=new F;class _u{constructor(t=new F,e=new F(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Di)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Di.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Di.copy(this.origin).addScaledVector(this.direction,e),Di.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Bc.copy(t).add(e).multiplyScalar(.5),jo.copy(e).sub(t).normalize(),ts.copy(this.origin).sub(Bc);const r=t.distanceTo(e)*.5,o=-this.direction.dot(jo),a=ts.dot(this.direction),c=-ts.dot(jo),l=ts.lengthSq(),h=Math.abs(1-o*o);let u,f,d,m;if(h>0)if(u=o*c-a,f=o*a-c,m=r*h,u>=0)if(f>=-m)if(f<=m){const _=1/h;u*=_,f*=_,d=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;else f<=-m?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l):f<=m?(u=0,f=Math.min(Math.max(-r,-c),r),d=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),d=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),d=-u*u+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Bc).addScaledVector(jo,f),d}intersectSphere(t,e){Di.subVectors(t.center,this.origin);const n=Di.dot(this.direction),s=Di.dot(Di)-n*n,r=t.radius*t.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),n>o||r>s||((r>n||isNaN(n))&&(n=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),n>c||a>s)||((a>n||n!==n)&&(n=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Di)!==null}intersectTriangle(t,e,n,s,r){zc.subVectors(e,t),Zo.subVectors(n,t),Gc.crossVectors(zc,Zo);let o=this.direction.dot(Gc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ts.subVectors(this.origin,t);const c=a*this.direction.dot(Zo.crossVectors(ts,Zo));if(c<0)return null;const l=a*this.direction.dot(zc.cross(ts));if(l<0||c+l>o)return null;const h=-a*ts.dot(Gc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(t,e,n,s,r,o,a,c,l,h,u,f,d,m,_,g){de.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,_,g)}set(t,e,n,s,r,o,a,c,l,h,u,f,d,m,_,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=s,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=f,p[3]=d,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/rr.setFromMatrixColumn(t,0).length(),r=1/rr.setFromMatrixColumn(t,1).length(),o=1/rr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const f=o*h,d=o*u,m=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=d+m*l,e[5]=f-_*l,e[9]=-a*c,e[2]=_-f*l,e[6]=m+d*l,e[10]=o*c}else if(t.order==="YXZ"){const f=c*h,d=c*u,m=l*h,_=l*u;e[0]=f+_*a,e[4]=m*a-d,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=d*a-m,e[6]=_+f*a,e[10]=o*c}else if(t.order==="ZXY"){const f=c*h,d=c*u,m=l*h,_=l*u;e[0]=f-_*a,e[4]=-o*u,e[8]=m+d*a,e[1]=d+m*a,e[5]=o*h,e[9]=_-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const f=o*h,d=o*u,m=a*h,_=a*u;e[0]=c*h,e[4]=m*l-d,e[8]=f*l+_,e[1]=c*u,e[5]=_*l+f,e[9]=d*l-m,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const f=o*c,d=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=_-f*u,e[8]=m*u+d,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=d*u+m,e[10]=f-_*u}else if(t.order==="XZY"){const f=o*c,d=o*l,m=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+_,e[5]=o*h,e[9]=d*u-m,e[2]=m*u-d,e[6]=a*h,e[10]=_*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(qg,t,$g)}lookAt(t,e,n){const s=this.elements;return Fn.subVectors(t,e),Fn.lengthSq()===0&&(Fn.z=1),Fn.normalize(),es.crossVectors(n,Fn),es.lengthSq()===0&&(Math.abs(n.z)===1?Fn.x+=1e-4:Fn.z+=1e-4,Fn.normalize(),es.crossVectors(n,Fn)),es.normalize(),Jo.crossVectors(Fn,es),s[0]=es.x,s[4]=Jo.x,s[8]=Fn.x,s[1]=es.y,s[5]=Jo.y,s[9]=Fn.y,s[2]=es.z,s[6]=Jo.z,s[10]=Fn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],f=n[9],d=n[13],m=n[2],_=n[6],g=n[10],p=n[14],M=n[3],b=n[7],v=n[11],E=n[15],T=s[0],S=s[4],L=s[8],x=s[12],y=s[1],A=s[5],P=s[9],N=s[13],z=s[2],X=s[6],W=s[10],K=s[14],G=s[3],Z=s[7],rt=s[11],Mt=s[15];return r[0]=o*T+a*y+c*z+l*G,r[4]=o*S+a*A+c*X+l*Z,r[8]=o*L+a*P+c*W+l*rt,r[12]=o*x+a*N+c*K+l*Mt,r[1]=h*T+u*y+f*z+d*G,r[5]=h*S+u*A+f*X+d*Z,r[9]=h*L+u*P+f*W+d*rt,r[13]=h*x+u*N+f*K+d*Mt,r[2]=m*T+_*y+g*z+p*G,r[6]=m*S+_*A+g*X+p*Z,r[10]=m*L+_*P+g*W+p*rt,r[14]=m*x+_*N+g*K+p*Mt,r[3]=M*T+b*y+v*z+E*G,r[7]=M*S+b*A+v*X+E*Z,r[11]=M*L+b*P+v*W+E*rt,r[15]=M*x+b*N+v*K+E*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],d=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+r*c*u-s*l*u-r*a*f+n*l*f+s*a*d-n*c*d)+_*(+e*c*d-e*l*f+r*o*f-s*o*d+s*l*h-r*c*h)+g*(+e*l*u-e*a*d-r*o*u+n*o*d+r*a*h-n*l*h)+p*(-s*a*h-e*c*u+e*a*f+s*o*u-n*o*f+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],d=t[11],m=t[12],_=t[13],g=t[14],p=t[15],M=u*g*l-_*f*l+_*c*d-a*g*d-u*c*p+a*f*p,b=m*f*l-h*g*l-m*c*d+o*g*d+h*c*p-o*f*p,v=h*_*l-m*u*l+m*a*d-o*_*d-h*a*p+o*u*p,E=m*u*c-h*_*c-m*a*f+o*_*f+h*a*g-o*u*g,T=e*M+n*b+s*v+r*E;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const S=1/T;return t[0]=M*S,t[1]=(_*f*r-u*g*r-_*s*d+n*g*d+u*s*p-n*f*p)*S,t[2]=(a*g*r-_*c*r+_*s*l-n*g*l-a*s*p+n*c*p)*S,t[3]=(u*c*r-a*f*r-u*s*l+n*f*l+a*s*d-n*c*d)*S,t[4]=b*S,t[5]=(h*g*r-m*f*r+m*s*d-e*g*d-h*s*p+e*f*p)*S,t[6]=(m*c*r-o*g*r-m*s*l+e*g*l+o*s*p-e*c*p)*S,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*d+e*c*d)*S,t[8]=v*S,t[9]=(m*u*r-h*_*r-m*n*d+e*_*d+h*n*p-e*u*p)*S,t[10]=(o*_*r-m*a*r+m*n*l-e*_*l-o*n*p+e*a*p)*S,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*d-e*a*d)*S,t[12]=E*S,t[13]=(h*_*s-m*u*s+m*n*f-e*_*f-h*n*g+e*u*g)*S,t[14]=(m*a*s-o*_*s-m*n*c+e*_*c+o*n*g-e*a*g)*S,t[15]=(o*u*s-h*a*s+h*n*c-e*u*c-o*n*f+e*a*f)*S,this}scale(t){const e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+n,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,o){return this.set(1,n,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,d=r*h,m=r*u,_=o*h,g=o*u,p=a*u,M=c*l,b=c*h,v=c*u,E=n.x,T=n.y,S=n.z;return s[0]=(1-(_+p))*E,s[1]=(d+v)*E,s[2]=(m-b)*E,s[3]=0,s[4]=(d-v)*T,s[5]=(1-(f+p))*T,s[6]=(g+M)*T,s[7]=0,s[8]=(m+b)*S,s[9]=(g-M)*S,s[10]=(1-(f+_))*S,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let r=rr.set(s[0],s[1],s[2]).length();const o=rr.set(s[4],s[5],s[6]).length(),a=rr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],li.copy(this);const l=1/r,h=1/o,u=1/a;return li.elements[0]*=l,li.elements[1]*=l,li.elements[2]*=l,li.elements[4]*=h,li.elements[5]*=h,li.elements[6]*=h,li.elements[8]*=u,li.elements[9]*=u,li.elements[10]*=u,e.setFromRotationMatrix(li),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,s,r,o,a=wi,c=!1){const l=this.elements,h=2*r/(e-t),u=2*r/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let m,_;if(c)m=r/(o-r),_=o*r/(o-r);else if(a===wi)m=-(o+r)/(o-r),_=-2*o*r/(o-r);else if(a===Za)m=-o/(o-r),_=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,r,o,a=wi,c=!1){const l=this.elements,h=2/(e-t),u=2/(n-s),f=-(e+t)/(e-t),d=-(n+s)/(n-s);let m,_;if(c)m=1/(o-r),_=o/(o-r);else if(a===wi)m=-2/(o-r),_=-(o+r)/(o-r);else if(a===Za)m=-1/(o-r),_=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=u,l[9]=0,l[13]=d,l[2]=0,l[6]=0,l[10]=m,l[14]=_,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const rr=new F,li=new de,qg=new F(0,0,0),$g=new F(1,1,1),es=new F,Jo=new F,Fn=new F,of=new de,af=new Jr;class ii{constructor(t=0,e=0,n=0,s=ii.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],d=s[10];switch(e){case"XYZ":this._y=Math.asin(ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,d),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,d),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ce(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,d),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-ce(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,d),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(ce(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,d));break;case"XZY":this._z=Math.asin(-ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return of.makeRotationFromQuaternion(t),this.setFromRotationMatrix(of,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return af.setFromEuler(this),this.setFromQuaternion(af,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ii.DEFAULT_ORDER="XYZ";class Bp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let jg=0;const cf=new F,or=new Jr,Pi=new de,Qo=new F,oo=new F,Zg=new F,Jg=new Jr,lf=new F(1,0,0),hf=new F(0,1,0),uf=new F(0,0,1),ff={type:"added"},Qg={type:"removed"},ar={type:"childadded",child:null},Hc={type:"childremoved",child:null};class nn extends Zr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=Ms(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=nn.DEFAULT_UP.clone();const t=new F,e=new ii,n=new Jr,s=new F(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new de},normalMatrix:{value:new Qt}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return or.setFromAxisAngle(t,e),this.quaternion.multiply(or),this}rotateOnWorldAxis(t,e){return or.setFromAxisAngle(t,e),this.quaternion.premultiply(or),this}rotateX(t){return this.rotateOnAxis(lf,t)}rotateY(t){return this.rotateOnAxis(hf,t)}rotateZ(t){return this.rotateOnAxis(uf,t)}translateOnAxis(t,e){return cf.copy(t).applyQuaternion(this.quaternion),this.position.add(cf.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(lf,t)}translateY(t){return this.translateOnAxis(hf,t)}translateZ(t){return this.translateOnAxis(uf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pi.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Qo.copy(t):Qo.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),oo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pi.lookAt(oo,Qo,this.up):Pi.lookAt(Qo,oo,this.up),this.quaternion.setFromRotationMatrix(Pi),s&&(Pi.extractRotation(s.matrixWorld),or.setFromRotationMatrix(Pi),this.quaternion.premultiply(or.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ff),ar.child=t,this.dispatchEvent(ar),ar.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Qg),Hc.child=t,this.dispatchEvent(Hc),Hc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ff),ar.child=t,this.dispatchEvent(ar),ar.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oo,t,Zg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(oo,Jg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),d=o(t.animations),m=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),f.length>0&&(n.skeletons=f),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=s,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}nn.DEFAULT_UP=new F(0,1,0);nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hi=new F,Ii=new F,Vc=new F,Ni=new F,cr=new F,lr=new F,df=new F,Wc=new F,Xc=new F,Yc=new F,Kc=new ke,qc=new ke,$c=new ke;class Xn{constructor(t=new F,e=new F,n=new F){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),hi.subVectors(t,e),s.cross(hi);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){hi.subVectors(s,e),Ii.subVectors(n,e),Vc.subVectors(t,e);const o=hi.dot(hi),a=hi.dot(Ii),c=hi.dot(Vc),l=Ii.dot(Ii),h=Ii.dot(Vc),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const f=1/u,d=(l*c-a*h)*f,m=(o*h-a*c)*f;return r.set(1-d-m,m,d)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,Ni)===null?!1:Ni.x>=0&&Ni.y>=0&&Ni.x+Ni.y<=1}static getInterpolation(t,e,n,s,r,o,a,c){return this.getBarycoord(t,e,n,s,Ni)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ni.x),c.addScaledVector(o,Ni.y),c.addScaledVector(a,Ni.z),c)}static getInterpolatedAttribute(t,e,n,s,r,o){return Kc.setScalar(0),qc.setScalar(0),$c.setScalar(0),Kc.fromBufferAttribute(t,e),qc.fromBufferAttribute(t,n),$c.fromBufferAttribute(t,s),o.setScalar(0),o.addScaledVector(Kc,r.x),o.addScaledVector(qc,r.y),o.addScaledVector($c,r.z),o}static isFrontFacing(t,e,n,s){return hi.subVectors(n,e),Ii.subVectors(t,e),hi.cross(Ii).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return hi.subVectors(this.c,this.b),Ii.subVectors(this.a,this.b),hi.cross(Ii).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Xn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return Xn.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return Xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,r=this.c;let o,a;cr.subVectors(s,n),lr.subVectors(r,n),Wc.subVectors(t,n);const c=cr.dot(Wc),l=lr.dot(Wc);if(c<=0&&l<=0)return e.copy(n);Xc.subVectors(t,s);const h=cr.dot(Xc),u=lr.dot(Xc);if(h>=0&&u<=h)return e.copy(s);const f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(cr,o);Yc.subVectors(t,r);const d=cr.dot(Yc),m=lr.dot(Yc);if(m>=0&&d<=m)return e.copy(r);const _=d*l-c*m;if(_<=0&&l>=0&&m<=0)return a=l/(l-m),e.copy(n).addScaledVector(lr,a);const g=h*m-d*u;if(g<=0&&u-h>=0&&d-m>=0)return df.subVectors(r,s),a=(u-h)/(u-h+(d-m)),e.copy(s).addScaledVector(df,a);const p=1/(g+_+f);return o=_*p,a=f*p,e.copy(n).addScaledVector(cr,o).addScaledVector(lr,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const zp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ns={h:0,s:0,l:0},ta={h:0,s:0,l:0};function jc(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class qt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=hn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,me.colorSpaceToWorking(this,e),this}setRGB(t,e,n,s=me.workingColorSpace){return this.r=t,this.g=e,this.b=n,me.colorSpaceToWorking(this,s),this}setHSL(t,e,n,s=me.workingColorSpace){if(t=Fg(t,1),e=ce(e,0,1),n=ce(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=jc(o,r,t+1/3),this.g=jc(o,r,t),this.b=jc(o,r,t-1/3)}return me.colorSpaceToWorking(this,s),this}setStyle(t,e=hn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=hn){const n=zp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Wi(t.r),this.g=Wi(t.g),this.b=Wi(t.b),this}copyLinearToSRGB(t){return this.r=Nr(t.r),this.g=Nr(t.g),this.b=Nr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=hn){return me.workingToColorSpace(_n.copy(this),t),Math.round(ce(_n.r*255,0,255))*65536+Math.round(ce(_n.g*255,0,255))*256+Math.round(ce(_n.b*255,0,255))}getHexString(t=hn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=me.workingColorSpace){me.workingToColorSpace(_n.copy(this),e);const n=_n.r,s=_n.g,r=_n.b,o=Math.max(n,s,r),a=Math.min(n,s,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=me.workingColorSpace){return me.workingToColorSpace(_n.copy(this),e),t.r=_n.r,t.g=_n.g,t.b=_n.b,t}getStyle(t=hn){me.workingToColorSpace(_n.copy(this),t);const e=_n.r,n=_n.g,s=_n.b;return t!==hn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(ns),this.setHSL(ns.h+t,ns.s+e,ns.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ns),t.getHSL(ta);const n=Pc(ns.h,ta.h,e),s=Pc(ns.s,ta.s,e),r=Pc(ns.l,ta.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const _n=new qt;qt.NAMES=zp;let t1=0;class Ai extends Zr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:t1++}),this.uuid=Ms(),this.name="",this.type="Material",this.blending=Ir,this.side=Xi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Yl,this.blendDst=Kl,this.blendEquation=Bs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qt(0,0,0),this.blendAlpha=0,this.depthFunc=kr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=tr,this.stencilZFail=tr,this.stencilZPass=tr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ir&&(n.blending=this.blending),this.side!==Xi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Yl&&(n.blendSrc=this.blendSrc),this.blendDst!==Kl&&(n.blendDst=this.blendDst),this.blendEquation!==Bs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==kr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==tr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==tr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==tr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=s(t.textures),o=s(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class Qr extends Ai{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ve=new F,ea=new Ft;let e1=0;class ye{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:e1++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ih,this.updateRanges=[],this.gpuType=Ei,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)ea.fromBufferAttribute(this,e),ea.applyMatrix3(t),this.setXY(e,ea.x,ea.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix3(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Si(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ee(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Si(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Si(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Si(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Si(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ee(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array),r=Ee(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ih&&(t.usage=this.usage),t}}class Gp extends ye{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Hp extends ye{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ye extends ye{constructor(t,e,n){super(new Float32Array(t),e,n)}}let n1=0;const $n=new de,Zc=new nn,hr=new F,Bn=new Yi,ao=new Yi,cn=new F;class He extends Zr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:n1++}),this.uuid=Ms(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Fp(t)?Hp:Gp)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Qt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return $n.makeRotationFromQuaternion(t),this.applyMatrix4($n),this}rotateX(t){return $n.makeRotationX(t),this.applyMatrix4($n),this}rotateY(t){return $n.makeRotationY(t),this.applyMatrix4($n),this}rotateZ(t){return $n.makeRotationZ(t),this.applyMatrix4($n),this}translate(t,e,n){return $n.makeTranslation(t,e,n),this.applyMatrix4($n),this}scale(t,e,n){return $n.makeScale(t,e,n),this.applyMatrix4($n),this}lookAt(t){return Zc.lookAt(t),Zc.updateMatrix(),this.applyMatrix4(Zc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(hr).negate(),this.translate(hr.x,hr.y,hr.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,r=t.length;s<r;s++){const o=t[s];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ye(n,3))}else{const n=Math.min(t.length,e.count);for(let s=0;s<n;s++){const r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const r=e[n];Bn.setFromBufferAttribute(r),this.morphTargetsRelative?(cn.addVectors(this.boundingBox.min,Bn.min),this.boundingBox.expandByPoint(cn),cn.addVectors(this.boundingBox.max,Bn.max),this.boundingBox.expandByPoint(cn)):(this.boundingBox.expandByPoint(Bn.min),this.boundingBox.expandByPoint(Bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const n=this.boundingSphere.center;if(Bn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];ao.setFromBufferAttribute(a),this.morphTargetsRelative?(cn.addVectors(Bn.min,ao.min),Bn.expandByPoint(cn),cn.addVectors(Bn.max,ao.max),Bn.expandByPoint(cn)):(Bn.expandByPoint(ao.min),Bn.expandByPoint(ao.max))}Bn.getCenter(n);let s=0;for(let r=0,o=t.count;r<o;r++)cn.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(cn));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)cn.fromBufferAttribute(a,l),c&&(hr.fromBufferAttribute(t,l),cn.add(hr)),s=Math.max(s,n.distanceToSquared(cn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ye(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],c=[];for(let L=0;L<n.count;L++)a[L]=new F,c[L]=new F;const l=new F,h=new F,u=new F,f=new Ft,d=new Ft,m=new Ft,_=new F,g=new F;function p(L,x,y){l.fromBufferAttribute(n,L),h.fromBufferAttribute(n,x),u.fromBufferAttribute(n,y),f.fromBufferAttribute(r,L),d.fromBufferAttribute(r,x),m.fromBufferAttribute(r,y),h.sub(l),u.sub(l),d.sub(f),m.sub(f);const A=1/(d.x*m.y-m.x*d.y);isFinite(A)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-d.y).multiplyScalar(A),g.copy(u).multiplyScalar(d.x).addScaledVector(h,-m.x).multiplyScalar(A),a[L].add(_),a[x].add(_),a[y].add(_),c[L].add(g),c[x].add(g),c[y].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let L=0,x=M.length;L<x;++L){const y=M[L],A=y.start,P=y.count;for(let N=A,z=A+P;N<z;N+=3)p(t.getX(N+0),t.getX(N+1),t.getX(N+2))}const b=new F,v=new F,E=new F,T=new F;function S(L){E.fromBufferAttribute(s,L),T.copy(E);const x=a[L];b.copy(x),b.sub(E.multiplyScalar(E.dot(x))).normalize(),v.crossVectors(T,x);const A=v.dot(c[L])<0?-1:1;o.setXYZW(L,b.x,b.y,b.z,A)}for(let L=0,x=M.length;L<x;++L){const y=M[L],A=y.start,P=y.count;for(let N=A,z=A+P;N<z;N+=3)S(t.getX(N+0)),S(t.getX(N+1)),S(t.getX(N+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ye(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,d=n.count;f<d;f++)n.setXYZ(f,0,0,0);const s=new F,r=new F,o=new F,a=new F,c=new F,l=new F,h=new F,u=new F;if(t)for(let f=0,d=t.count;f<d;f+=3){const m=t.getX(f+0),_=t.getX(f+1),g=t.getX(f+2);s.fromBufferAttribute(e,m),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(n,m),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(m,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let f=0,d=e.count;f<d;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),n.setXYZ(f+0,h.x,h.y,h.z),n.setXYZ(f+1,h.x,h.y,h.z),n.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)cn.fromBufferAttribute(t,e),cn.normalize(),t.setXYZ(e,cn.x,cn.y,cn.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h);let d=0,m=0;for(let _=0,g=c.length;_<g;_++){a.isInterleavedBufferAttribute?d=c[_]*a.data.stride+a.offset:d=c[_]*h;for(let p=0;p<h;p++)f[m++]=l[d++]}return new ye(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new He,n=this.index.array,s=this.attributes;for(const a in s){const c=s[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const f=l[h],d=t(f,n);c.push(d)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){const d=l[u];h.push(d.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere=a.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let f=0,d=u.length;f<d;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pf=new de,Is=new _u,na=new qi,mf=new F,ia=new F,sa=new F,ra=new F,Jc=new F,oa=new F,gf=new F,aa=new F;class fe extends nn{constructor(t=new He,e=new Qr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(r&&a){oa.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Jc.fromBufferAttribute(u,t),o?oa.addScaledVector(Jc,h):oa.addScaledVector(Jc.sub(e),h))}e.add(oa)}return e}raycast(t,e){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),na.copy(n.boundingSphere),na.applyMatrix4(r),Is.copy(t.ray).recast(t.near),!(na.containsPoint(Is.origin)===!1&&(Is.intersectSphere(na,mf)===null||Is.origin.distanceToSquared(mf)>(t.far-t.near)**2))&&(pf.copy(r).invert(),Is.copy(t.ray).applyMatrix4(pf),!(n.boundingBox!==null&&Is.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Is)))}_computeIntersections(t,e,n){let s;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,d=r.drawRange;if(a!==null)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const g=f[m],p=o[g.materialIndex],M=Math.max(g.start,d.start),b=Math.min(a.count,Math.min(g.start+g.count,d.start+d.count));for(let v=M,E=b;v<E;v+=3){const T=a.getX(v),S=a.getX(v+1),L=a.getX(v+2);s=ca(this,p,t,n,l,h,u,T,S,L),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),_=Math.min(a.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){const M=a.getX(g),b=a.getX(g+1),v=a.getX(g+2);s=ca(this,o,t,n,l,h,u,M,b,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let m=0,_=f.length;m<_;m++){const g=f[m],p=o[g.materialIndex],M=Math.max(g.start,d.start),b=Math.min(c.count,Math.min(g.start+g.count,d.start+d.count));for(let v=M,E=b;v<E;v+=3){const T=v,S=v+1,L=v+2;s=ca(this,p,t,n,l,h,u,T,S,L),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=g.materialIndex,e.push(s))}}else{const m=Math.max(0,d.start),_=Math.min(c.count,d.start+d.count);for(let g=m,p=_;g<p;g+=3){const M=g,b=g+1,v=g+2;s=ca(this,o,t,n,l,h,u,M,b,v),s&&(s.faceIndex=Math.floor(g/3),e.push(s))}}}}function i1(i,t,e,n,s,r,o,a){let c;if(t.side===Cn?c=n.intersectTriangle(o,r,s,!0,a):c=n.intersectTriangle(s,r,o,t.side===Xi,a),c===null)return null;aa.copy(a),aa.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(aa);return l<e.near||l>e.far?null:{distance:l,point:aa.clone(),object:i}}function ca(i,t,e,n,s,r,o,a,c,l){i.getVertexPosition(a,ia),i.getVertexPosition(c,sa),i.getVertexPosition(l,ra);const h=i1(i,t,e,n,ia,sa,ra,gf);if(h){const u=new F;Xn.getBarycoord(gf,ia,sa,ra,u),s&&(h.uv=Xn.getInterpolatedAttribute(s,a,c,l,u,new Ft)),r&&(h.uv1=Xn.getInterpolatedAttribute(r,a,c,l,u,new Ft)),o&&(h.normal=Xn.getInterpolatedAttribute(o,a,c,l,u,new F),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const f={a,b:c,c:l,normal:new F,materialIndex:0};Xn.getNormal(ia,sa,ra,f.normal),h.face=f,h.barycoord=u}return h}class Xe extends He{constructor(t=1,e=1,n=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let f=0,d=0;m("z","y","x",-1,-1,n,e,t,o,r,0),m("z","y","x",1,-1,n,e,-t,o,r,1),m("x","z","y",1,1,t,n,e,s,o,2),m("x","z","y",1,-1,t,n,-e,s,o,3),m("x","y","z",1,-1,t,e,n,s,r,4),m("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Ye(l,3)),this.setAttribute("normal",new Ye(h,3)),this.setAttribute("uv",new Ye(u,2));function m(_,g,p,M,b,v,E,T,S,L,x){const y=v/S,A=E/L,P=v/2,N=E/2,z=T/2,X=S+1,W=L+1;let K=0,G=0;const Z=new F;for(let rt=0;rt<W;rt++){const Mt=rt*A-N;for(let Ut=0;Ut<X;Ut++){const zt=Ut*y-P;Z[_]=zt*M,Z[g]=Mt*b,Z[p]=z,l.push(Z.x,Z.y,Z.z),Z[_]=0,Z[g]=0,Z[p]=T>0?1:-1,h.push(Z.x,Z.y,Z.z),u.push(Ut/S),u.push(1-rt/L),K+=1}}for(let rt=0;rt<L;rt++)for(let Mt=0;Mt<S;Mt++){const Ut=f+Mt+X*rt,zt=f+Mt+X*(rt+1),te=f+(Mt+1)+X*(rt+1),re=f+(Mt+1)+X*rt;c.push(Ut,zt,re),c.push(zt,te,re),G+=6}a.addGroup(d,G,x),d+=G,f+=K}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Xe(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function zr(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function An(i){const t={};for(let e=0;e<i.length;e++){const n=zr(i[e]);for(const s in n)t[s]=n[s]}return t}function s1(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Vp(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:me.workingColorSpace}const Uh={clone:zr,merge:An};var r1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,o1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class en extends Ai{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=r1,this.fragmentShader=o1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=zr(t.uniforms),this.uniformsGroups=s1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Wp extends nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=wi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const is=new F,_f=new Ft,vf=new Ft;class Wn extends Wp{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Nh*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ha*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Nh*2*Math.atan(Math.tan(Ha*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){is.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(is.x,is.y).multiplyScalar(-t/is.z),is.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(is.x,is.y).multiplyScalar(-t/is.z)}getViewSize(t,e){return this.getViewBounds(t,_f,vf),e.subVectors(vf,_f)}setViewOffset(t,e,n,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ha*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*n/l,s*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ur=-90,fr=1;class a1 extends nn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Wn(ur,fr,t,e);s.layers=this.layers,this.add(s);const r=new Wn(ur,fr,t,e);r.layers=this.layers,this.add(r);const o=new Wn(ur,fr,t,e);o.layers=this.layers,this.add(o);const a=new Wn(ur,fr,t,e);a.layers=this.layers,this.add(a);const c=new Wn(ur,fr,t,e);c.layers=this.layers,this.add(c);const l=new Wn(ur,fr,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===wi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Za)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),d=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,o),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(u,f,d),t.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class Xp extends Sn{constructor(t=[],e=Or,n,s,r,o,a,c,l,h){super(t,e,n,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class c1 extends ni{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Xp(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Xe(5,5,5),r=new en({name:"CubemapFromEquirect",uniforms:zr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Cn,blending:vs});r.uniforms.tEquirect.value=e;const o=new fe(s,r),a=e.minFilter;return e.minFilter===Ks&&(e.minFilter=di),new a1(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e=!0,n=!0,s=!0){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,s);t.setRenderTarget(r)}}class fn extends nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const l1={type:"move"};class Qc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,n),p=this._getHandJoint(l,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),d=.02,m=.005;l.inputState.pinching&&f>d+m?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=d-m&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(l1)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new fn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Yp extends nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ii,this.environmentIntensity=1,this.environmentRotation=new ii,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class h1{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ih,this.updateRanges=[],this.version=0,this.uuid=Ms()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,r=this.stride;s<r;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ms()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Ms()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const wn=new F;class Qa{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)wn.fromBufferAttribute(this,e),wn.applyMatrix4(t),this.setXYZ(e,wn.x,wn.y,wn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)wn.fromBufferAttribute(this,e),wn.applyNormalMatrix(t),this.setXYZ(e,wn.x,wn.y,wn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)wn.fromBufferAttribute(this,e),wn.transformDirection(t),this.setXYZ(e,wn.x,wn.y,wn.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Si(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ee(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Ee(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Si(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Si(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Si(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Si(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=Ee(e,this.array),n=Ee(n,this.array),s=Ee(s,this.array),r=Ee(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return new ye(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Qa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Kp extends Ai{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let dr;const co=new F,pr=new F,mr=new F,gr=new Ft,lo=new Ft,qp=new de,la=new F,ho=new F,ha=new F,xf=new Ft,tl=new Ft,Mf=new Ft;let u1=class extends nn{constructor(t=new Kp){if(super(),this.isSprite=!0,this.type="Sprite",dr===void 0){dr=new He;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new h1(e,5);dr.setIndex([0,1,2,0,2,3]),dr.setAttribute("position",new Qa(n,3,0,!1)),dr.setAttribute("uv",new Qa(n,2,3,!1))}this.geometry=dr,this.material=t,this.center=new Ft(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),pr.setFromMatrixScale(this.matrixWorld),qp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),mr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&pr.multiplyScalar(-mr.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const o=this.center;ua(la.set(-.5,-.5,0),mr,o,pr,s,r),ua(ho.set(.5,-.5,0),mr,o,pr,s,r),ua(ha.set(.5,.5,0),mr,o,pr,s,r),xf.set(0,0),tl.set(1,0),Mf.set(1,1);let a=t.ray.intersectTriangle(la,ho,ha,!1,co);if(a===null&&(ua(ho.set(-.5,.5,0),mr,o,pr,s,r),tl.set(0,1),a=t.ray.intersectTriangle(la,ha,ho,!1,co),a===null))return;const c=t.ray.origin.distanceTo(co);c<t.near||c>t.far||e.push({distance:c,point:co.clone(),uv:Xn.getInterpolation(co,la,ho,ha,xf,tl,Mf,new Ft),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}};function ua(i,t,e,n,s,r){gr.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(lo.x=r*gr.x-s*gr.y,lo.y=s*gr.x+r*gr.y):lo.copy(gr),i.copy(t),i.x+=lo.x,i.y+=lo.y,i.applyMatrix4(qp)}class f1 extends Sn{constructor(t=null,e=1,n=1,s,r,o,a,c,l=ln,h=ln,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yf extends ye{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const _r=new de,bf=new de,fa=[],Sf=new Yi,d1=new de,uo=new fe,fo=new qi;class p1 extends fe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new yf(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,d1)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Yi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,_r),Sf.copy(t.boundingBox).applyMatrix4(_r),this.boundingBox.union(Sf)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new qi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,_r),fo.copy(t.boundingSphere).applyMatrix4(_r),this.boundingSphere.union(fo)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,o=t*r+1;for(let a=0;a<n.length;a++)n[a]=s[o+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(uo.geometry=this.geometry,uo.material=this.material,uo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fo.copy(this.boundingSphere),fo.applyMatrix4(n),t.ray.intersectsSphere(fo)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,_r),bf.multiplyMatrices(n,_r),uo.matrixWorld=bf,uo.raycast(t,fa);for(let o=0,a=fa.length;o<a;o++){const c=fa[o];c.instanceId=r,c.object=this,e.push(c)}fa.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new yf(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new f1(new Float32Array(s*this.count),s,this.count,hu,Ei));const r=this.morphTexture.source.data.data;let o=0;for(let l=0;l<n.length;l++)o+=n[l];const a=this.geometry.morphTargetsRelative?1:1-o,c=s*t;r[c]=a,r.set(n,c+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const el=new F,m1=new F,g1=new Qt;class Os{constructor(t=new F(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=el.subVectors(n,e).cross(m1.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(el),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||g1.getNormalMatrix(t),s=this.coplanarPoint(el).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ns=new qi,_1=new Ft(.5,.5),da=new F;class Co{constructor(t=new Os,e=new Os,n=new Os,s=new Os,r=new Os,o=new Os){this.planes=[t,e,n,s,r,o]}set(t,e,n,s,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=wi,n=!1){const s=this.planes,r=t.elements,o=r[0],a=r[1],c=r[2],l=r[3],h=r[4],u=r[5],f=r[6],d=r[7],m=r[8],_=r[9],g=r[10],p=r[11],M=r[12],b=r[13],v=r[14],E=r[15];if(s[0].setComponents(l-o,d-h,p-m,E-M).normalize(),s[1].setComponents(l+o,d+h,p+m,E+M).normalize(),s[2].setComponents(l+a,d+u,p+_,E+b).normalize(),s[3].setComponents(l-a,d-u,p-_,E-b).normalize(),n)s[4].setComponents(c,f,g,v).normalize(),s[5].setComponents(l-c,d-f,p-g,E-v).normalize();else if(s[4].setComponents(l-c,d-f,p-g,E-v).normalize(),e===wi)s[5].setComponents(l+c,d+f,p+g,E+v).normalize();else if(e===Za)s[5].setComponents(c,f,g,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ns.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ns.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ns)}intersectsSprite(t){Ns.center.set(0,0,0);const e=_1.distanceTo(t.center);return Ns.radius=.7071067811865476+e,Ns.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ns)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(da.x=s.normal.x>0?t.max.x:t.min.x,da.y=s.normal.y>0?t.max.y:t.min.y,da.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(da)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class $p extends Ai{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const tc=new F,ec=new F,Ef=new de,po=new _u,pa=new qi,nl=new F,wf=new F;class v1 extends nn{constructor(t=new He,e=new $p){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)tc.fromBufferAttribute(e,s-1),ec.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=tc.distanceTo(ec);t.setAttribute("lineDistance",new Ye(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),pa.copy(n.boundingSphere),pa.applyMatrix4(s),pa.radius+=r,t.ray.intersectsSphere(pa)===!1)return;Ef.copy(s).invert(),po.copy(t.ray).applyMatrix4(Ef);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,f=n.attributes.position;if(h!==null){const d=Math.max(0,o.start),m=Math.min(h.count,o.start+o.count);for(let _=d,g=m-1;_<g;_+=l){const p=h.getX(_),M=h.getX(_+1),b=ma(this,t,po,c,p,M,_);b&&e.push(b)}if(this.isLineLoop){const _=h.getX(m-1),g=h.getX(d),p=ma(this,t,po,c,_,g,m-1);p&&e.push(p)}}else{const d=Math.max(0,o.start),m=Math.min(f.count,o.start+o.count);for(let _=d,g=m-1;_<g;_+=l){const p=ma(this,t,po,c,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=ma(this,t,po,c,m-1,d,m-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function ma(i,t,e,n,s,r,o){const a=i.geometry.attributes.position;if(tc.fromBufferAttribute(a,s),ec.fromBufferAttribute(a,r),e.distanceSqToSegment(tc,ec,nl,wf)>n)return;nl.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(nl);if(!(l<t.near||l>t.far))return{distance:l,point:wf.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}const Tf=new F,Af=new F;class jp extends v1{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Tf.fromBufferAttribute(e,s),Af.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Tf.distanceTo(Af);t.setAttribute("lineDistance",new Ye(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class x1 extends Ai{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Rf=new de,kh=new _u,ga=new qi,_a=new F;class Zp extends nn{constructor(t=new He,e=new x1){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(s),ga.radius+=r,t.ray.intersectsSphere(ga)===!1)return;Rf.copy(s).invert(),kh.copy(t.ray).applyMatrix4(Rf);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=n.index,u=n.attributes.position;if(l!==null){const f=Math.max(0,o.start),d=Math.min(l.count,o.start+o.count);for(let m=f,_=d;m<_;m++){const g=l.getX(m);_a.fromBufferAttribute(u,g),Cf(_a,g,c,s,t,e,this)}}else{const f=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let m=f,_=d;m<_;m++)_a.fromBufferAttribute(u,m),Cf(_a,m,c,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Cf(i,t,e,n,s,r,o){const a=kh.distanceSqToPoint(i);if(a<e){const c=new F;kh.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(a),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class vu extends Sn{constructor(t,e,n,s,r,o,a,c,l){super(t,e,n,s,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class nc extends Sn{constructor(t,e,n=js,s,r,o,a=ln,c=ln,l,h=To,u=1){if(h!==To&&h!==Ao)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:t,height:e,depth:u};super(f,s,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new mu(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Jp extends Sn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}const va=new F,xa=new F,il=new F,Ma=new Xn;class M1 extends He{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){const s=Math.pow(10,4),r=Math.cos(Ha*e),o=t.getIndex(),a=t.getAttribute("position"),c=o?o.count:a.count,l=[0,0,0],h=["a","b","c"],u=new Array(3),f={},d=[];for(let m=0;m<c;m+=3){o?(l[0]=o.getX(m),l[1]=o.getX(m+1),l[2]=o.getX(m+2)):(l[0]=m,l[1]=m+1,l[2]=m+2);const{a:_,b:g,c:p}=Ma;if(_.fromBufferAttribute(a,l[0]),g.fromBufferAttribute(a,l[1]),p.fromBufferAttribute(a,l[2]),Ma.getNormal(il),u[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,u[1]=`${Math.round(g.x*s)},${Math.round(g.y*s)},${Math.round(g.z*s)}`,u[2]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let M=0;M<3;M++){const b=(M+1)%3,v=u[M],E=u[b],T=Ma[h[M]],S=Ma[h[b]],L=`${v}_${E}`,x=`${E}_${v}`;x in f&&f[x]?(il.dot(f[x].normal)<=r&&(d.push(T.x,T.y,T.z),d.push(S.x,S.y,S.z)),f[x]=null):L in f||(f[L]={index0:l[M],index1:l[b],normal:il.clone()})}}for(const m in f)if(f[m]){const{index0:_,index1:g}=f[m];va.fromBufferAttribute(a,_),xa.fromBufferAttribute(a,g),d.push(va.x,va.y,va.z),d.push(xa.x,xa.y,xa.z)}this.setAttribute("position",new Ye(d,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Go extends He{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,d=[],m=[],_=[],g=[];for(let p=0;p<h;p++){const M=p*f-o;for(let b=0;b<l;b++){const v=b*u-r;m.push(v,-M,0),_.push(0,0,1),g.push(b/a),g.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<a;M++){const b=M+l*p,v=M+l*(p+1),E=M+1+l*(p+1),T=M+1+l*p;d.push(b,v,T),d.push(v,E,T)}this.setIndex(d),this.setAttribute("position",new Ye(m,3)),this.setAttribute("normal",new Ye(_,3)),this.setAttribute("uv",new Ye(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Go(t.width,t.height,t.widthSegments,t.heightSegments)}}class xu extends He{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new F,f=new F,d=[],m=[],_=[],g=[];for(let p=0;p<=n;p++){const M=[],b=p/n;let v=0;p===0&&o===0?v=.5/e:p===n&&c===Math.PI&&(v=-.5/e);for(let E=0;E<=e;E++){const T=E/e;u.x=-t*Math.cos(s+T*r)*Math.sin(o+b*a),u.y=t*Math.cos(o+b*a),u.z=t*Math.sin(s+T*r)*Math.sin(o+b*a),m.push(u.x,u.y,u.z),f.copy(u).normalize(),_.push(f.x,f.y,f.z),g.push(T+v,1-b),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<e;M++){const b=h[p][M+1],v=h[p][M],E=h[p+1][M],T=h[p+1][M+1];(p!==0||o>0)&&d.push(b,v,T),(p!==n-1||c<Math.PI)&&d.push(v,E,T)}this.setIndex(d),this.setAttribute("position",new Ye(m,3)),this.setAttribute("normal",new Ye(_,3)),this.setAttribute("uv",new Ye(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xu(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class zs extends en{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class y1 extends Ai{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_c,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class b1 extends Ai{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new qt(16777215),this.specular=new qt(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_c,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class gi extends Ai{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new qt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=_c,this.normalScale=new Ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ii,this.combine=mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Qp extends Ai{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class S1 extends Ai{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class t0 extends nn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new qt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}const sl=new de,Lf=new F,Df=new F;class E1{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ft(512,512),this.mapType=_i,this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Co,this._frameExtents=new Ft(1,1),this._viewportCount=1,this._viewports=[new ke(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Lf.setFromMatrixPosition(t.matrixWorld),e.position.copy(Lf),Df.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Df),e.updateMatrixWorld(),sl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sl,e.coordinateSystem,e.reversedDepth),e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(sl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class vc extends Wp{constructor(t=-1,e=1,n=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class w1 extends E1{constructor(){super(new vc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class e0 extends t0{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(nn.DEFAULT_UP),this.updateMatrix(),this.target=new nn,this.shadow=new w1}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class n0 extends t0{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class T1 extends Wn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Pf(i,t,e,n){const s=A1(n);switch(e){case Up:return i*t;case hu:return i*t/s.components*s.byteLength;case uu:return i*t/s.components*s.byteLength;case Op:return i*t*2/s.components*s.byteLength;case fu:return i*t*2/s.components*s.byteLength;case kp:return i*t*3/s.components*s.byteLength;case pi:return i*t*4/s.components*s.byteLength;case du:return i*t*4/s.components*s.byteLength;case Fa:case Ba:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case za:case Ga:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case oh:case ch:return Math.max(i,16)*Math.max(t,8)/4;case rh:case ah:return Math.max(i,8)*Math.max(t,8)/2;case lh:case hh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case uh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case fh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case dh:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case ph:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case mh:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case gh:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case _h:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case vh:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case xh:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Mh:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case yh:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case bh:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Sh:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Eh:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case wh:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Th:case Ah:case Rh:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ch:case Lh:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Dh:case Ph:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function A1(i){switch(i){case _i:case Dp:return{byteLength:1,components:1};case Eo:case Pp:case Vi:return{byteLength:2,components:1};case cu:case lu:return{byteLength:2,components:4};case js:case au:case Ei:return{byteLength:4,components:1};case Ip:case Np:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ou}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ou);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function i0(){let i=null,t=!1,e=null,n=null;function s(r,o){e(r,o),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function R1(i){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,h),a.onUploadCallback();let d;if(l instanceof Float32Array)d=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)d=i.HALF_FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?d=i.HALF_FLOAT:d=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)d=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,a),u.length===0)i.bufferSubData(l,0,h);else{u.sort((d,m)=>d.start-m.start);let f=0;for(let d=1;d<u.length;d++){const m=u[f],_=u[d];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++f,u[f]=_)}u.length=f+1;for(let d=0,m=u.length;d<m;d++){const _=u[d];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(i.deleteBuffer(c.buffer),t.delete(a))}function o(a,c){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:s,remove:r,update:o}}var C1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,L1=`#ifdef USE_ALPHAHASH
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
#endif`,D1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,P1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,I1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,N1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,U1=`#ifdef USE_AOMAP
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
#endif`,k1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,O1=`#ifdef USE_BATCHING
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
#endif`,F1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,B1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,z1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,G1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,H1=`#ifdef USE_IRIDESCENCE
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
#endif`,V1=`#ifdef USE_BUMPMAP
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
#endif`,W1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,X1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Y1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,K1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,q1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,$1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,j1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Z1=`#if defined( USE_COLOR_ALPHA )
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
#endif`,J1=`#define PI 3.141592653589793
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
} // validated`,Q1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,t_=`vec3 transformedNormal = objectNormal;
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
#endif`,e_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,n_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,i_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,s_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,r_="gl_FragColor = linearToOutputTexel( gl_FragColor );",o_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,a_=`#ifdef USE_ENVMAP
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
#endif`,c_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,l_=`#ifdef USE_ENVMAP
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
#endif`,h_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,u_=`#ifdef USE_ENVMAP
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
#endif`,f_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,d_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,p_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,m_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,g_=`#ifdef USE_GRADIENTMAP
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
}`,__=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,v_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,x_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,M_=`uniform bool receiveShadow;
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
#endif`,y_=`#ifdef USE_ENVMAP
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
#endif`,b_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,S_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,E_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,w_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,T_=`PhysicalMaterial material;
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
#endif`,A_=`struct PhysicalMaterial {
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
}`,R_=`
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
#endif`,C_=`#if defined( RE_IndirectDiffuse )
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
#endif`,L_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,D_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,P_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,I_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,U_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,k_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,O_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,F_=`#if defined( USE_POINTS_UV )
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
#endif`,B_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,z_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,G_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,H_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,V_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,W_=`#ifdef USE_MORPHTARGETS
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
#endif`,X_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Y_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,K_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,q_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,j_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Z_=`#ifdef USE_NORMALMAP
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
#endif`,J_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Q_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,tv=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ev=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,iv=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,rv=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ov=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,av=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,lv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,hv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,uv=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,dv=`float getShadowMask() {
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
}`,pv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mv=`#ifdef USE_SKINNING
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
#endif`,gv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,_v=`#ifdef USE_SKINNING
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
#endif`,vv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,bv=`#ifdef USE_TRANSMISSION
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
#endif`,Sv=`#ifdef USE_TRANSMISSION
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
#endif`,Ev=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Tv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Av=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Cv=`uniform sampler2D t2D;
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
}`,Lv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Pv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Iv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nv=`#include <common>
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
}`,Uv=`#if DEPTH_PACKING == 3200
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
}`,kv=`#define DISTANCE
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
}`,Ov=`#define DISTANCE
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
}`,Fv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zv=`uniform float scale;
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
}`,Gv=`uniform vec3 diffuse;
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
}`,Hv=`#include <common>
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
}`,Vv=`uniform vec3 diffuse;
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
}`,Wv=`#define LAMBERT
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
}`,Xv=`#define LAMBERT
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
}`,Yv=`#define MATCAP
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
}`,Kv=`#define MATCAP
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
}`,qv=`#define NORMAL
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
}`,$v=`#define NORMAL
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
}`,jv=`#define PHONG
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
}`,Zv=`#define PHONG
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
}`,Jv=`#define STANDARD
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
}`,Qv=`#define STANDARD
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
}`,tx=`#define TOON
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
}`,ex=`#define TOON
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
}`,nx=`uniform float size;
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
}`,ix=`uniform vec3 diffuse;
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
}`,sx=`#include <common>
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
}`,rx=`uniform vec3 color;
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
}`,ox=`uniform float rotation;
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
}`,ax=`uniform vec3 diffuse;
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
}`,ne={alphahash_fragment:C1,alphahash_pars_fragment:L1,alphamap_fragment:D1,alphamap_pars_fragment:P1,alphatest_fragment:I1,alphatest_pars_fragment:N1,aomap_fragment:U1,aomap_pars_fragment:k1,batching_pars_vertex:O1,batching_vertex:F1,begin_vertex:B1,beginnormal_vertex:z1,bsdfs:G1,iridescence_fragment:H1,bumpmap_pars_fragment:V1,clipping_planes_fragment:W1,clipping_planes_pars_fragment:X1,clipping_planes_pars_vertex:Y1,clipping_planes_vertex:K1,color_fragment:q1,color_pars_fragment:$1,color_pars_vertex:j1,color_vertex:Z1,common:J1,cube_uv_reflection_fragment:Q1,defaultnormal_vertex:t_,displacementmap_pars_vertex:e_,displacementmap_vertex:n_,emissivemap_fragment:i_,emissivemap_pars_fragment:s_,colorspace_fragment:r_,colorspace_pars_fragment:o_,envmap_fragment:a_,envmap_common_pars_fragment:c_,envmap_pars_fragment:l_,envmap_pars_vertex:h_,envmap_physical_pars_fragment:y_,envmap_vertex:u_,fog_vertex:f_,fog_pars_vertex:d_,fog_fragment:p_,fog_pars_fragment:m_,gradientmap_pars_fragment:g_,lightmap_pars_fragment:__,lights_lambert_fragment:v_,lights_lambert_pars_fragment:x_,lights_pars_begin:M_,lights_toon_fragment:b_,lights_toon_pars_fragment:S_,lights_phong_fragment:E_,lights_phong_pars_fragment:w_,lights_physical_fragment:T_,lights_physical_pars_fragment:A_,lights_fragment_begin:R_,lights_fragment_maps:C_,lights_fragment_end:L_,logdepthbuf_fragment:D_,logdepthbuf_pars_fragment:P_,logdepthbuf_pars_vertex:I_,logdepthbuf_vertex:N_,map_fragment:U_,map_pars_fragment:k_,map_particle_fragment:O_,map_particle_pars_fragment:F_,metalnessmap_fragment:B_,metalnessmap_pars_fragment:z_,morphinstance_vertex:G_,morphcolor_vertex:H_,morphnormal_vertex:V_,morphtarget_pars_vertex:W_,morphtarget_vertex:X_,normal_fragment_begin:Y_,normal_fragment_maps:K_,normal_pars_fragment:q_,normal_pars_vertex:$_,normal_vertex:j_,normalmap_pars_fragment:Z_,clearcoat_normal_fragment_begin:J_,clearcoat_normal_fragment_maps:Q_,clearcoat_pars_fragment:tv,iridescence_pars_fragment:ev,opaque_fragment:nv,packing:iv,premultiplied_alpha_fragment:sv,project_vertex:rv,dithering_fragment:ov,dithering_pars_fragment:av,roughnessmap_fragment:cv,roughnessmap_pars_fragment:lv,shadowmap_pars_fragment:hv,shadowmap_pars_vertex:uv,shadowmap_vertex:fv,shadowmask_pars_fragment:dv,skinbase_vertex:pv,skinning_pars_vertex:mv,skinning_vertex:gv,skinnormal_vertex:_v,specularmap_fragment:vv,specularmap_pars_fragment:xv,tonemapping_fragment:Mv,tonemapping_pars_fragment:yv,transmission_fragment:bv,transmission_pars_fragment:Sv,uv_pars_fragment:Ev,uv_pars_vertex:wv,uv_vertex:Tv,worldpos_vertex:Av,background_vert:Rv,background_frag:Cv,backgroundCube_vert:Lv,backgroundCube_frag:Dv,cube_vert:Pv,cube_frag:Iv,depth_vert:Nv,depth_frag:Uv,distanceRGBA_vert:kv,distanceRGBA_frag:Ov,equirect_vert:Fv,equirect_frag:Bv,linedashed_vert:zv,linedashed_frag:Gv,meshbasic_vert:Hv,meshbasic_frag:Vv,meshlambert_vert:Wv,meshlambert_frag:Xv,meshmatcap_vert:Yv,meshmatcap_frag:Kv,meshnormal_vert:qv,meshnormal_frag:$v,meshphong_vert:jv,meshphong_frag:Zv,meshphysical_vert:Jv,meshphysical_frag:Qv,meshtoon_vert:tx,meshtoon_frag:ex,points_vert:nx,points_frag:ix,shadow_vert:sx,shadow_frag:rx,sprite_vert:ox,sprite_frag:ax},dt={common:{diffuse:{value:new qt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Qt}},envmap:{envMap:{value:null},envMapRotation:{value:new Qt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Qt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Qt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Qt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Qt},normalScale:{value:new Ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Qt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Qt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Qt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Qt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0},uvTransform:{value:new Qt}},sprite:{diffuse:{value:new qt(16777215)},opacity:{value:1},center:{value:new Ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Qt},alphaMap:{value:null},alphaMapTransform:{value:new Qt},alphaTest:{value:0}}},bi={basic:{uniforms:An([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:ne.meshbasic_vert,fragmentShader:ne.meshbasic_frag},lambert:{uniforms:An([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new qt(0)}}]),vertexShader:ne.meshlambert_vert,fragmentShader:ne.meshlambert_frag},phong:{uniforms:An([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new qt(0)},specular:{value:new qt(1118481)},shininess:{value:30}}]),vertexShader:ne.meshphong_vert,fragmentShader:ne.meshphong_frag},standard:{uniforms:An([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new qt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag},toon:{uniforms:An([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new qt(0)}}]),vertexShader:ne.meshtoon_vert,fragmentShader:ne.meshtoon_frag},matcap:{uniforms:An([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:ne.meshmatcap_vert,fragmentShader:ne.meshmatcap_frag},points:{uniforms:An([dt.points,dt.fog]),vertexShader:ne.points_vert,fragmentShader:ne.points_frag},dashed:{uniforms:An([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ne.linedashed_vert,fragmentShader:ne.linedashed_frag},depth:{uniforms:An([dt.common,dt.displacementmap]),vertexShader:ne.depth_vert,fragmentShader:ne.depth_frag},normal:{uniforms:An([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:ne.meshnormal_vert,fragmentShader:ne.meshnormal_frag},sprite:{uniforms:An([dt.sprite,dt.fog]),vertexShader:ne.sprite_vert,fragmentShader:ne.sprite_frag},background:{uniforms:{uvTransform:{value:new Qt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ne.background_vert,fragmentShader:ne.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Qt}},vertexShader:ne.backgroundCube_vert,fragmentShader:ne.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ne.cube_vert,fragmentShader:ne.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ne.equirect_vert,fragmentShader:ne.equirect_frag},distanceRGBA:{uniforms:An([dt.common,dt.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ne.distanceRGBA_vert,fragmentShader:ne.distanceRGBA_frag},shadow:{uniforms:An([dt.lights,dt.fog,{color:{value:new qt(0)},opacity:{value:1}}]),vertexShader:ne.shadow_vert,fragmentShader:ne.shadow_frag}};bi.physical={uniforms:An([bi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Qt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Qt},clearcoatNormalScale:{value:new Ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Qt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Qt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Qt},sheen:{value:0},sheenColor:{value:new qt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Qt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Qt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Qt},transmissionSamplerSize:{value:new Ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Qt},attenuationDistance:{value:0},attenuationColor:{value:new qt(0)},specularColor:{value:new qt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Qt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Qt},anisotropyVector:{value:new Ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Qt}}]),vertexShader:ne.meshphysical_vert,fragmentShader:ne.meshphysical_frag};const ya={r:0,b:0,g:0},Us=new ii,cx=new de;function lx(i,t,e,n,s,r,o){const a=new qt(0);let c=r===!0?0:1,l,h,u=null,f=0,d=null;function m(b){let v=b.isScene===!0?b.background:null;return v&&v.isTexture&&(v=(b.backgroundBlurriness>0?e:t).get(v)),v}function _(b){let v=!1;const E=m(b);E===null?p(a,c):E&&E.isColor&&(p(E,1),v=!0);const T=i.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,o):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function g(b,v){const E=m(v);E&&(E.isCubeTexture||E.mapping===gc)?(h===void 0&&(h=new fe(new Xe(1,1,1),new en({name:"BackgroundCubeMaterial",uniforms:zr(bi.backgroundCube.uniforms),vertexShader:bi.backgroundCube.vertexShader,fragmentShader:bi.backgroundCube.fragmentShader,side:Cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(T,S,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Us.copy(v.backgroundRotation),Us.x*=-1,Us.y*=-1,Us.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Us.y*=-1,Us.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(cx.makeRotationFromEuler(Us)),h.material.toneMapped=me.getTransfer(E.colorSpace)!==Se,(u!==E||f!==E.version||d!==i.toneMapping)&&(h.material.needsUpdate=!0,u=E,f=E.version,d=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(l===void 0&&(l=new fe(new Go(2,2),new en({name:"BackgroundMaterial",uniforms:zr(bi.background.uniforms),vertexShader:bi.background.vertexShader,fragmentShader:bi.background.fragmentShader,side:Xi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=E,l.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,l.material.toneMapped=me.getTransfer(E.colorSpace)!==Se,E.matrixAutoUpdate===!0&&E.updateMatrix(),l.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||f!==E.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=E,f=E.version,d=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function p(b,v){b.getRGB(ya,Vp(i)),n.buffers.color.setClear(ya.r,ya.g,ya.b,v,o)}function M(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(b,v=1){a.set(b),c=v,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(b){c=b,p(a,c)},render:_,addToRenderList:g,dispose:M}}function hx(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null);let r=s,o=!1;function a(y,A,P,N,z){let X=!1;const W=u(N,P,A);r!==W&&(r=W,l(r.object)),X=d(y,N,P,z),X&&m(y,N,P,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(X||o)&&(o=!1,v(y,A,P,N),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return i.createVertexArray()}function l(y){return i.bindVertexArray(y)}function h(y){return i.deleteVertexArray(y)}function u(y,A,P){const N=P.wireframe===!0;let z=n[y.id];z===void 0&&(z={},n[y.id]=z);let X=z[A.id];X===void 0&&(X={},z[A.id]=X);let W=X[N];return W===void 0&&(W=f(c()),X[N]=W),W}function f(y){const A=[],P=[],N=[];for(let z=0;z<e;z++)A[z]=0,P[z]=0,N[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:A,enabledAttributes:P,attributeDivisors:N,object:y,attributes:{},index:null}}function d(y,A,P,N){const z=r.attributes,X=A.attributes;let W=0;const K=P.getAttributes();for(const G in K)if(K[G].location>=0){const rt=z[G];let Mt=X[G];if(Mt===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(Mt=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(Mt=y.instanceColor)),rt===void 0||rt.attribute!==Mt||Mt&&rt.data!==Mt.data)return!0;W++}return r.attributesNum!==W||r.index!==N}function m(y,A,P,N){const z={},X=A.attributes;let W=0;const K=P.getAttributes();for(const G in K)if(K[G].location>=0){let rt=X[G];rt===void 0&&(G==="instanceMatrix"&&y.instanceMatrix&&(rt=y.instanceMatrix),G==="instanceColor"&&y.instanceColor&&(rt=y.instanceColor));const Mt={};Mt.attribute=rt,rt&&rt.data&&(Mt.data=rt.data),z[G]=Mt,W++}r.attributes=z,r.attributesNum=W,r.index=N}function _(){const y=r.newAttributes;for(let A=0,P=y.length;A<P;A++)y[A]=0}function g(y){p(y,0)}function p(y,A){const P=r.newAttributes,N=r.enabledAttributes,z=r.attributeDivisors;P[y]=1,N[y]===0&&(i.enableVertexAttribArray(y),N[y]=1),z[y]!==A&&(i.vertexAttribDivisor(y,A),z[y]=A)}function M(){const y=r.newAttributes,A=r.enabledAttributes;for(let P=0,N=A.length;P<N;P++)A[P]!==y[P]&&(i.disableVertexAttribArray(P),A[P]=0)}function b(y,A,P,N,z,X,W){W===!0?i.vertexAttribIPointer(y,A,P,z,X):i.vertexAttribPointer(y,A,P,N,z,X)}function v(y,A,P,N){_();const z=N.attributes,X=P.getAttributes(),W=A.defaultAttributeValues;for(const K in X){const G=X[K];if(G.location>=0){let Z=z[K];if(Z===void 0&&(K==="instanceMatrix"&&y.instanceMatrix&&(Z=y.instanceMatrix),K==="instanceColor"&&y.instanceColor&&(Z=y.instanceColor)),Z!==void 0){const rt=Z.normalized,Mt=Z.itemSize,Ut=t.get(Z);if(Ut===void 0)continue;const zt=Ut.buffer,te=Ut.type,re=Ut.bytesPerElement,Q=te===i.INT||te===i.UNSIGNED_INT||Z.gpuType===au;if(Z.isInterleavedBufferAttribute){const nt=Z.data,mt=nt.stride,kt=Z.offset;if(nt.isInstancedInterleavedBuffer){for(let vt=0;vt<G.locationSize;vt++)p(G.location+vt,nt.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let vt=0;vt<G.locationSize;vt++)g(G.location+vt);i.bindBuffer(i.ARRAY_BUFFER,zt);for(let vt=0;vt<G.locationSize;vt++)b(G.location+vt,Mt/G.locationSize,te,rt,mt*re,(kt+Mt/G.locationSize*vt)*re,Q)}else{if(Z.isInstancedBufferAttribute){for(let nt=0;nt<G.locationSize;nt++)p(G.location+nt,Z.meshPerAttribute);y.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=Z.meshPerAttribute*Z.count)}else for(let nt=0;nt<G.locationSize;nt++)g(G.location+nt);i.bindBuffer(i.ARRAY_BUFFER,zt);for(let nt=0;nt<G.locationSize;nt++)b(G.location+nt,Mt/G.locationSize,te,rt,Mt*re,Mt/G.locationSize*nt*re,Q)}}else if(W!==void 0){const rt=W[K];if(rt!==void 0)switch(rt.length){case 2:i.vertexAttrib2fv(G.location,rt);break;case 3:i.vertexAttrib3fv(G.location,rt);break;case 4:i.vertexAttrib4fv(G.location,rt);break;default:i.vertexAttrib1fv(G.location,rt)}}}}M()}function E(){L();for(const y in n){const A=n[y];for(const P in A){const N=A[P];for(const z in N)h(N[z].object),delete N[z];delete A[P]}delete n[y]}}function T(y){if(n[y.id]===void 0)return;const A=n[y.id];for(const P in A){const N=A[P];for(const z in N)h(N[z].object),delete N[z];delete A[P]}delete n[y.id]}function S(y){for(const A in n){const P=n[A];if(P[y.id]===void 0)continue;const N=P[y.id];for(const z in N)h(N[z].object),delete N[z];delete P[y.id]}}function L(){x(),o=!0,r!==s&&(r=s,l(r.object))}function x(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:L,resetDefaultState:x,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfProgram:S,initAttributes:_,enableAttribute:g,disableUnusedAttributes:M}}function ux(i,t,e){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),e.update(h,n,1)}function o(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let d=0;for(let m=0;m<u;m++)d+=h[m];e.update(d,n,1)}function c(l,h,u,f){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let m=0;m<l.length;m++)o(l[m],h[m],f[m]);else{d.multiDrawArraysInstancedWEBGL(n,l,0,h,0,f,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*f[_];e.update(m,n,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function fx(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const S=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(S.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(S){return!(S!==pi&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(S){const L=S===Vi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(S!==_i&&n.convert(S)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&S!==Ei&&!L)}function c(S){if(S==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";S="mediump"}return S==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),m=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),g=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),v=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),E=m>0,T=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:d,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:v,vertexTextures:E,maxSamples:T}}function dx(i){const t=this;let e=null,n=0,s=!1,r=!1;const o=new Os,a=new Qt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){const d=u.length!==0||f||n!==0||s;return s=f,n=u.length,d},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,d){const m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=i.get(u);if(!s||m===null||m.length===0||r&&!g)r?h(null):l();else{const M=r?0:n,b=M*4;let v=p.clippingState||null;c.value=v,v=h(m,f,b,d);for(let E=0;E!==b;++E)v[E]=e[E];p.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,f,d,m){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=c.value,m!==!0||g===null){const p=d+_*4,M=f.matrixWorldInverse;a.getNormalMatrix(M),(g===null||g.length<p)&&(g=new Float32Array(p));for(let b=0,v=d;b!==_;++b,v+=4)o.copy(u[b]).applyMatrix4(M,a),o.normal.toArray(g,v),g[v+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function px(i){let t=new WeakMap;function e(o,a){return a===eh?o.mapping=Or:a===nh&&(o.mapping=Fr),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===eh||a===nh)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new c1(c.height);return l.fromEquirectangularTexture(i,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Rr=4,If=[.125,.215,.35,.446,.526,.582],Gs=20,rl=new vc,Nf=new qt;let ol=null,al=0,cl=0,ll=!1;const Fs=(1+Math.sqrt(5))/2,vr=1/Fs,Uf=[new F(-Fs,vr,0),new F(Fs,vr,0),new F(-vr,0,Fs),new F(vr,0,Fs),new F(0,Fs,-vr),new F(0,Fs,vr),new F(-1,1,-1),new F(1,1,-1),new F(-1,1,1),new F(1,1,1)],mx=new F;class kf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100,r={}){const{size:o=256,position:a=mx}=r;ol=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),cl=this._renderer.getActiveMipmapLevel(),ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,s,c,a),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Bf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ff(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ol,al,cl),this._renderer.xr.enabled=ll,t.scissorTest=!1,ba(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Or||t.mapping===Fr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ol=this._renderer.getRenderTarget(),al=this._renderer.getActiveCubeFace(),cl=this._renderer.getActiveMipmapLevel(),ll=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:di,minFilter:di,generateMipmaps:!1,type:Vi,format:pi,colorSpace:Br,depthBuffer:!1},s=Of(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Of(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=gx(r)),this._blurMaterial=_x(r,t,e)}return s}_compileMaterial(t){const e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,rl)}_sceneToCubeUV(t,e,n,s,r){const c=new Wn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,f=u.autoClear,d=u.toneMapping;u.getClearColor(Nf),u.toneMapping=xs,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(s),u.clearDepth(),u.setRenderTarget(null));const _=new Qr({name:"PMREM.Background",side:Cn,depthWrite:!1,depthTest:!1}),g=new fe(new Xe,_);let p=!1;const M=t.background;M?M.isColor&&(_.color.copy(M),t.background=null,p=!0):(_.color.copy(Nf),p=!0);for(let b=0;b<6;b++){const v=b%3;v===0?(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[b],r.y,r.z)):v===1?(c.up.set(0,0,l[b]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[b],r.z)):(c.up.set(0,l[b],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[b]));const E=this._cubeSize;ba(s,v*E,b>2?E:0,E,E),u.setRenderTarget(s),p&&u.render(g,c),u.render(t,c)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=f,t.background=M}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Or||t.mapping===Fr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Bf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ff());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new fe(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;ba(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,rl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Uf[(s-r-1)%Uf.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,s,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,s,"latitudinal",r),this._halfBlur(o,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new fe(this._lodPlanes[s],l),f=l.uniforms,d=this._sizeLods[n]-1,m=isFinite(r)?Math.PI/(2*d):2*Math.PI/(2*Gs-1),_=r/m,g=isFinite(r)?1+Math.floor(h*_):Gs;g>Gs&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${Gs}`);const p=[];let M=0;for(let S=0;S<Gs;++S){const L=S/_,x=Math.exp(-L*L/2);p.push(x),S===0?M+=x:S<g&&(M+=2*x)}for(let S=0;S<p.length;S++)p[S]=p[S]/M;f.envMap.value=t.texture,f.samples.value=g,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:b}=this;f.dTheta.value=m,f.mipInt.value=b-n;const v=this._sizeLods[s],E=3*v*(s>b-Rr?s-b+Rr:0),T=4*(this._cubeSize-v);ba(e,E,T,3*v,2*v),c.setRenderTarget(e),c.render(u,rl)}}function gx(i){const t=[],e=[],n=[];let s=i;const r=i-Rr+1+If.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);e.push(a);let c=1/a;o>i-Rr?c=If[o-i+Rr-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],d=6,m=6,_=3,g=2,p=1,M=new Float32Array(_*m*d),b=new Float32Array(g*m*d),v=new Float32Array(p*m*d);for(let T=0;T<d;T++){const S=T%3*2/3-1,L=T>2?0:-1,x=[S,L,0,S+2/3,L,0,S+2/3,L+1,0,S,L,0,S+2/3,L+1,0,S,L+1,0];M.set(x,_*m*T),b.set(f,g*m*T);const y=[T,T,T,T,T,T];v.set(y,p*m*T)}const E=new He;E.setAttribute("position",new ye(M,_)),E.setAttribute("uv",new ye(b,g)),E.setAttribute("faceIndex",new ye(v,p)),t.push(E),s>Rr&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Of(i,t,e){const n=new ni(i,t,e);return n.texture.mapping=gc,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ba(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function _x(i,t,e){const n=new Float32Array(Gs),s=new F(0,1,0);return new en({name:"SphericalGaussianBlur",defines:{n:Gs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Mu(),fragmentShader:`

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
		`,blending:vs,depthTest:!1,depthWrite:!1})}function Ff(){return new en({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Mu(),fragmentShader:`

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
		`,blending:vs,depthTest:!1,depthWrite:!1})}function Bf(){return new en({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Mu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:vs,depthTest:!1,depthWrite:!1})}function Mu(){return`

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
	`}function vx(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===eh||c===nh,h=c===Or||c===Fr;if(l||h){let u=t.get(a);const f=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==f)return e===null&&(e=new kf(i)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const d=a.image;return l&&d&&d.height>0||h&&d&&s(d)?(e===null&&(e=new kf(i)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function s(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function xx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Ro("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function Mx(i,t,e,n){const s={},r=new WeakMap;function o(u){const f=u.target;f.index!==null&&t.remove(f.index);for(const m in f.attributes)t.remove(f.attributes[m]);f.removeEventListener("dispose",o),delete s[f.id];const d=r.get(f);d&&(t.remove(d),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){const f=u.attributes;for(const d in f)t.update(f[d],i.ARRAY_BUFFER)}function l(u){const f=[],d=u.index,m=u.attributes.position;let _=0;if(d!==null){const M=d.array;_=d.version;for(let b=0,v=M.length;b<v;b+=3){const E=M[b+0],T=M[b+1],S=M[b+2];f.push(E,T,T,S,S,E)}}else if(m!==void 0){const M=m.array;_=m.version;for(let b=0,v=M.length/3-1;b<v;b+=3){const E=b+0,T=b+1,S=b+2;f.push(E,T,T,S,S,E)}}else return;const g=new(Fp(f)?Hp:Gp)(f,1);g.version=_;const p=r.get(u);p&&t.remove(p),r.set(u,g)}function h(u){const f=r.get(u);if(f){const d=u.index;d!==null&&f.version<d.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function yx(i,t,e){let n;function s(f){n=f}let r,o;function a(f){r=f.type,o=f.bytesPerElement}function c(f,d){i.drawElements(n,d,r,f*o),e.update(d,n,1)}function l(f,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,f*o,m),e.update(d,n,m))}function h(f,d,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,f,0,m);let g=0;for(let p=0;p<m;p++)g+=d[p];e.update(g,n,1)}function u(f,d,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<f.length;p++)l(f[p]/o,d[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(n,d,0,r,f,0,_,0,m);let p=0;for(let M=0;M<m;M++)p+=d[M]*_[M];e.update(p,n,1)}}this.setMode=s,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case i.TRIANGLES:e.triangles+=a*(r/3);break;case i.LINES:e.lines+=a*(r/2);break;case i.LINE_STRIP:e.lines+=a*(r-1);break;case i.LINE_LOOP:e.lines+=a*r;break;case i.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Sx(i,t,e){const n=new WeakMap,s=new ke;function r(o,a,c){const l=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let f=n.get(a);if(f===void 0||f.count!==u){let x=function(){S.dispose(),n.delete(a),a.removeEventListener("dispose",x)};f!==void 0&&f.texture.dispose();const d=a.morphAttributes.position!==void 0,m=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let b=0;d===!0&&(b=1),m===!0&&(b=2),_===!0&&(b=3);let v=a.attributes.position.count*b,E=1;v>t.maxTextureSize&&(E=Math.ceil(v/t.maxTextureSize),v=t.maxTextureSize);const T=new Float32Array(v*E*4*u),S=new gu(T,v,E,u);S.type=Ei,S.needsUpdate=!0;const L=b*4;for(let y=0;y<u;y++){const A=g[y],P=p[y],N=M[y],z=v*E*4*y;for(let X=0;X<A.count;X++){const W=X*L;d===!0&&(s.fromBufferAttribute(A,X),T[z+W+0]=s.x,T[z+W+1]=s.y,T[z+W+2]=s.z,T[z+W+3]=0),m===!0&&(s.fromBufferAttribute(P,X),T[z+W+4]=s.x,T[z+W+5]=s.y,T[z+W+6]=s.z,T[z+W+7]=0),_===!0&&(s.fromBufferAttribute(N,X),T[z+W+8]=s.x,T[z+W+9]=s.y,T[z+W+10]=s.z,T[z+W+11]=N.itemSize===4?s.w:1)}}f={count:u,texture:S,size:new Ft(v,E)},n.set(a,f),a.addEventListener("dispose",x)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",o.morphTexture,e);else{let d=0;for(let _=0;_<l.length;_++)d+=l[_];const m=a.morphTargetsRelative?1:1-d;c.getUniforms().setValue(i,"morphTargetBaseInfluence",m),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function Ex(i,t,e,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}const s0=new Sn,zf=new nc(1,1),r0=new gu,o0=new Yg,a0=new Xp,Gf=[],Hf=[],Vf=new Float32Array(16),Wf=new Float32Array(9),Xf=new Float32Array(4);function to(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let r=Gf[s];if(r===void 0&&(r=new Float32Array(s),Gf[s]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,i[o].toArray(r,a)}return r}function sn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function rn(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function xc(i,t){let e=Hf[t];e===void 0&&(e=new Int32Array(t),Hf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function wx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Tx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(sn(e,t))return;i.uniform2fv(this.addr,t),rn(e,t)}}function Ax(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(sn(e,t))return;i.uniform3fv(this.addr,t),rn(e,t)}}function Rx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(sn(e,t))return;i.uniform4fv(this.addr,t),rn(e,t)}}function Cx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),rn(e,t)}else{if(sn(e,n))return;Xf.set(n),i.uniformMatrix2fv(this.addr,!1,Xf),rn(e,n)}}function Lx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),rn(e,t)}else{if(sn(e,n))return;Wf.set(n),i.uniformMatrix3fv(this.addr,!1,Wf),rn(e,n)}}function Dx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(sn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),rn(e,t)}else{if(sn(e,n))return;Vf.set(n),i.uniformMatrix4fv(this.addr,!1,Vf),rn(e,n)}}function Px(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Ix(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(sn(e,t))return;i.uniform2iv(this.addr,t),rn(e,t)}}function Nx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(sn(e,t))return;i.uniform3iv(this.addr,t),rn(e,t)}}function Ux(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(sn(e,t))return;i.uniform4iv(this.addr,t),rn(e,t)}}function kx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ox(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(sn(e,t))return;i.uniform2uiv(this.addr,t),rn(e,t)}}function Fx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(sn(e,t))return;i.uniform3uiv(this.addr,t),rn(e,t)}}function Bx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(sn(e,t))return;i.uniform4uiv(this.addr,t),rn(e,t)}}function zx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(zf.compareFunction=pu,r=zf):r=s0,e.setTexture2D(t||r,s)}function Gx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||o0,s)}function Hx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||a0,s)}function Vx(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||r0,s)}function Wx(i){switch(i){case 5126:return wx;case 35664:return Tx;case 35665:return Ax;case 35666:return Rx;case 35674:return Cx;case 35675:return Lx;case 35676:return Dx;case 5124:case 35670:return Px;case 35667:case 35671:return Ix;case 35668:case 35672:return Nx;case 35669:case 35673:return Ux;case 5125:return kx;case 36294:return Ox;case 36295:return Fx;case 36296:return Bx;case 35678:case 36198:case 36298:case 36306:case 35682:return zx;case 35679:case 36299:case 36307:return Gx;case 35680:case 36300:case 36308:case 36293:return Hx;case 36289:case 36303:case 36311:case 36292:return Vx}}function Xx(i,t){i.uniform1fv(this.addr,t)}function Yx(i,t){const e=to(t,this.size,2);i.uniform2fv(this.addr,e)}function Kx(i,t){const e=to(t,this.size,3);i.uniform3fv(this.addr,e)}function qx(i,t){const e=to(t,this.size,4);i.uniform4fv(this.addr,e)}function $x(i,t){const e=to(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function jx(i,t){const e=to(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function Zx(i,t){const e=to(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Jx(i,t){i.uniform1iv(this.addr,t)}function Qx(i,t){i.uniform2iv(this.addr,t)}function tM(i,t){i.uniform3iv(this.addr,t)}function eM(i,t){i.uniform4iv(this.addr,t)}function nM(i,t){i.uniform1uiv(this.addr,t)}function iM(i,t){i.uniform2uiv(this.addr,t)}function sM(i,t){i.uniform3uiv(this.addr,t)}function rM(i,t){i.uniform4uiv(this.addr,t)}function oM(i,t,e){const n=this.cache,s=t.length,r=xc(e,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||s0,r[o])}function aM(i,t,e){const n=this.cache,s=t.length,r=xc(e,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||o0,r[o])}function cM(i,t,e){const n=this.cache,s=t.length,r=xc(e,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a0,r[o])}function lM(i,t,e){const n=this.cache,s=t.length,r=xc(e,s);sn(n,r)||(i.uniform1iv(this.addr,r),rn(n,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||r0,r[o])}function hM(i){switch(i){case 5126:return Xx;case 35664:return Yx;case 35665:return Kx;case 35666:return qx;case 35674:return $x;case 35675:return jx;case 35676:return Zx;case 5124:case 35670:return Jx;case 35667:case 35671:return Qx;case 35668:case 35672:return tM;case 35669:case 35673:return eM;case 5125:return nM;case 36294:return iM;case 36295:return sM;case 36296:return rM;case 35678:case 36198:case 36298:case 36306:case 35682:return oM;case 35679:case 36299:case 36307:return aM;case 35680:case 36300:case 36308:case 36293:return cM;case 36289:case 36303:case 36311:case 36292:return lM}}class uM{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Wx(e.type)}}class fM{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=hM(e.type)}}class dM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(t,e[a.id],n)}}}const hl=/(\w+)(\])?(\[|\.)?/g;function Yf(i,t){i.seq.push(t),i.map[t.id]=t}function pM(i,t,e){const n=i.name,s=n.length;for(hl.lastIndex=0;;){const r=hl.exec(n),o=hl.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Yf(e,l===void 0?new uM(a,i,t):new fM(a,i,t));break}else{let u=e.map[a];u===void 0&&(u=new dM(a),Yf(e,u)),e=u}}}class Va{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);pM(r,o,this)}}setValue(t,e,n,s){const r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,r=t.length;s!==r;++s){const o=t[s];o.id in e&&n.push(o)}return n}}function Kf(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const mM=37297;let gM=0;function _M(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const qf=new Qt;function vM(i){me._getMatrix(qf,me.workingColorSpace,i);const t=`mat3( ${qf.elements.map(e=>e.toFixed(4))} )`;switch(me.getTransfer(i)){case ja:return[t,"LinearTransferOETF"];case Se:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function $f(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),r=(i.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return e.toUpperCase()+`

`+r+`

`+_M(i.getShaderSource(t),a)}else return r}function xM(i,t){const e=vM(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function MM(i,t){let e;switch(t){case Mg:e="Linear";break;case yg:e="Reinhard";break;case bg:e="Cineon";break;case Sg:e="ACESFilmic";break;case wg:e="AgX";break;case Tg:e="Neutral";break;case Eg:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Sa=new F;function yM(){me.getLuminanceCoefficients(Sa);const i=Sa.x.toFixed(4),t=Sa.y.toFixed(4),e=Sa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function bM(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(vo).join(`
`)}function SM(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function EM(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(t,s),o=r.name;let a=1;r.type===i.FLOAT_MAT2&&(a=2),r.type===i.FLOAT_MAT3&&(a=3),r.type===i.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:i.getAttribLocation(t,o),locationSize:a}}return e}function vo(i){return i!==""}function jf(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Zf(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const wM=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oh(i){return i.replace(wM,AM)}const TM=new Map;function AM(i,t){let e=ne[t];if(e===void 0){const n=TM.get(t);if(n!==void 0)e=ne[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Oh(e)}const RM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Jf(i){return i.replace(RM,CM)}function CM(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Qf(i){let t=`precision ${i.precision} float;
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
#define LOW_PRECISION`),t}function LM(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Cp?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===Qm?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ki&&(t="SHADOWMAP_TYPE_VSM"),t}function DM(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Or:case Fr:t="ENVMAP_TYPE_CUBE";break;case gc:t="ENVMAP_TYPE_CUBE_UV";break}return t}function PM(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Fr:t="ENVMAP_MODE_REFRACTION";break}return t}function IM(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case mc:t="ENVMAP_BLENDING_MULTIPLY";break;case vg:t="ENVMAP_BLENDING_MIX";break;case xg:t="ENVMAP_BLENDING_ADD";break}return t}function NM(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function UM(i,t,e,n){const s=i.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=LM(e),l=DM(e),h=PM(e),u=IM(e),f=NM(e),d=bM(e),m=SM(r),_=s.createProgram();let g,p,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(vo).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(vo).join(`
`),p.length>0&&(p+=`
`)):(g=[Qf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(vo).join(`
`),p=[Qf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==xs?"#define TONE_MAPPING":"",e.toneMapping!==xs?ne.tonemapping_pars_fragment:"",e.toneMapping!==xs?MM("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ne.colorspace_pars_fragment,xM("linearToOutputTexel",e.outputColorSpace),yM(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(vo).join(`
`)),o=Oh(o),o=jf(o,e),o=Zf(o,e),a=Oh(a),a=jf(a,e),a=Zf(a,e),o=Jf(o),a=Jf(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Bi?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Bi?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=M+g+o,v=M+p+a,E=Kf(s,s.VERTEX_SHADER,b),T=Kf(s,s.FRAGMENT_SHADER,v);s.attachShader(_,E),s.attachShader(_,T),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function S(A){if(i.debug.checkShaderErrors){const P=s.getProgramInfoLog(_)||"",N=s.getShaderInfoLog(E)||"",z=s.getShaderInfoLog(T)||"",X=P.trim(),W=N.trim(),K=z.trim();let G=!0,Z=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,E,T);else{const rt=$f(s,E,"vertex"),Mt=$f(s,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+A.name+`
Material Type: `+A.type+`

Program Info Log: `+X+`
`+rt+`
`+Mt)}else X!==""?console.warn("THREE.WebGLProgram: Program Info Log:",X):(W===""||K==="")&&(Z=!1);Z&&(A.diagnostics={runnable:G,programLog:X,vertexShader:{log:W,prefix:g},fragmentShader:{log:K,prefix:p}})}s.deleteShader(E),s.deleteShader(T),L=new Va(s,_),x=EM(s,_)}let L;this.getUniforms=function(){return L===void 0&&S(this),L};let x;this.getAttributes=function(){return x===void 0&&S(this),x};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(_,mM)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=gM++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=T,this}let kM=0;class OM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new FM(t),e.set(t,n)),n}}class FM{constructor(t){this.id=kM++,this.code=t,this.usedTimes=0}}function BM(i,t,e,n,s,r,o){const a=new Bp,c=new OM,l=new Set,h=[],u=s.logarithmicDepthBuffer,f=s.vertexTextures;let d=s.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return l.add(x),x===0?"uv":`uv${x}`}function g(x,y,A,P,N){const z=P.fog,X=N.geometry,W=x.isMeshStandardMaterial?P.environment:null,K=(x.isMeshStandardMaterial?e:t).get(x.envMap||W),G=K&&K.mapping===gc?K.image.height:null,Z=m[x.type];x.precision!==null&&(d=s.getMaxPrecision(x.precision),d!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const rt=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,Mt=rt!==void 0?rt.length:0;let Ut=0;X.morphAttributes.position!==void 0&&(Ut=1),X.morphAttributes.normal!==void 0&&(Ut=2),X.morphAttributes.color!==void 0&&(Ut=3);let zt,te,re,Q;if(Z){const _e=bi[Z];zt=_e.vertexShader,te=_e.fragmentShader}else zt=x.vertexShader,te=x.fragmentShader,c.update(x),re=c.getVertexShaderID(x),Q=c.getFragmentShaderID(x);const nt=i.getRenderTarget(),mt=i.state.buffers.depth.getReversed(),kt=N.isInstancedMesh===!0,vt=N.isBatchedMesh===!0,le=!!x.map,mn=!!x.matcap,O=!!K,De=!!x.aoMap,jt=!!x.lightMap,Xt=!!x.bumpMap,At=!!x.normalMap,Pe=!!x.displacementMap,Rt=!!x.emissiveMap,ee=!!x.metalnessMap,an=!!x.roughnessMap,ze=x.anisotropy>0,I=x.clearcoat>0,R=x.dispersion>0,Y=x.iridescence>0,et=x.sheen>0,st=x.transmission>0,J=ze&&!!x.anisotropyMap,Pt=I&&!!x.clearcoatMap,ht=I&&!!x.clearcoatNormalMap,Ct=I&&!!x.clearcoatRoughnessMap,Lt=Y&&!!x.iridescenceMap,ct=Y&&!!x.iridescenceThicknessMap,xt=et&&!!x.sheenColorMap,Vt=et&&!!x.sheenRoughnessMap,Dt=!!x.specularMap,gt=!!x.specularColorMap,Jt=!!x.specularIntensityMap,B=st&&!!x.transmissionMap,lt=st&&!!x.thicknessMap,ut=!!x.gradientMap,St=!!x.alphaMap,ot=x.alphaTest>0,it=!!x.alphaHash,wt=!!x.extensions;let $t=xs;x.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&($t=i.toneMapping);const Re={shaderID:Z,shaderType:x.type,shaderName:x.name,vertexShader:zt,fragmentShader:te,defines:x.defines,customVertexShaderID:re,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:vt,batchingColor:vt&&N._colorsTexture!==null,instancing:kt,instancingColor:kt&&N.instanceColor!==null,instancingMorph:kt&&N.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:nt===null?i.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Br,alphaToCoverage:!!x.alphaToCoverage,map:le,matcap:mn,envMap:O,envMapMode:O&&K.mapping,envMapCubeUVHeight:G,aoMap:De,lightMap:jt,bumpMap:Xt,normalMap:At,displacementMap:f&&Pe,emissiveMap:Rt,normalMapObjectSpace:At&&x.normalMapType===Lg,normalMapTangentSpace:At&&x.normalMapType===_c,metalnessMap:ee,roughnessMap:an,anisotropy:ze,anisotropyMap:J,clearcoat:I,clearcoatMap:Pt,clearcoatNormalMap:ht,clearcoatRoughnessMap:Ct,dispersion:R,iridescence:Y,iridescenceMap:Lt,iridescenceThicknessMap:ct,sheen:et,sheenColorMap:xt,sheenRoughnessMap:Vt,specularMap:Dt,specularColorMap:gt,specularIntensityMap:Jt,transmission:st,transmissionMap:B,thicknessMap:lt,gradientMap:ut,opaque:x.transparent===!1&&x.blending===Ir&&x.alphaToCoverage===!1,alphaMap:St,alphaTest:ot,alphaHash:it,combine:x.combine,mapUv:le&&_(x.map.channel),aoMapUv:De&&_(x.aoMap.channel),lightMapUv:jt&&_(x.lightMap.channel),bumpMapUv:Xt&&_(x.bumpMap.channel),normalMapUv:At&&_(x.normalMap.channel),displacementMapUv:Pe&&_(x.displacementMap.channel),emissiveMapUv:Rt&&_(x.emissiveMap.channel),metalnessMapUv:ee&&_(x.metalnessMap.channel),roughnessMapUv:an&&_(x.roughnessMap.channel),anisotropyMapUv:J&&_(x.anisotropyMap.channel),clearcoatMapUv:Pt&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:ht&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ct&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Lt&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:xt&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:Vt&&_(x.sheenRoughnessMap.channel),specularMapUv:Dt&&_(x.specularMap.channel),specularColorMapUv:gt&&_(x.specularColorMap.channel),specularIntensityMapUv:Jt&&_(x.specularIntensityMap.channel),transmissionMapUv:B&&_(x.transmissionMap.channel),thicknessMapUv:lt&&_(x.thicknessMap.channel),alphaMapUv:St&&_(x.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(At||ze),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!X.attributes.uv&&(le||St),fog:!!z,useFog:x.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:x.flatShading===!0&&x.wireframe===!1,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:mt,skinning:N.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:Ut,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&A.length>0,shadowMapType:i.shadowMap.type,toneMapping:$t,decodeVideoTexture:le&&x.map.isVideoTexture===!0&&me.getTransfer(x.map.colorSpace)===Se,decodeVideoTextureEmissive:Rt&&x.emissiveMap.isVideoTexture===!0&&me.getTransfer(x.emissiveMap.colorSpace)===Se,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Qn,flipSided:x.side===Cn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:wt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(wt&&x.extensions.multiDraw===!0||vt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function p(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const A in x.defines)y.push(A),y.push(x.defines[A]);return x.isRawShaderMaterial===!1&&(M(y,x),b(y,x),y.push(i.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function M(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function b(x,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),y.gradientMap&&a.enable(22),x.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),x.push(a.mask)}function v(x){const y=m[x.type];let A;if(y){const P=bi[y];A=Uh.clone(P.uniforms)}else A=x.uniforms;return A}function E(x,y){let A;for(let P=0,N=h.length;P<N;P++){const z=h[P];if(z.cacheKey===y){A=z,++A.usedTimes;break}}return A===void 0&&(A=new UM(i,y,x,r),h.push(A)),A}function T(x){if(--x.usedTimes===0){const y=h.indexOf(x);h[y]=h[h.length-1],h.pop(),x.destroy()}}function S(x){c.remove(x)}function L(){c.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:v,acquireProgram:E,releaseProgram:T,releaseShaderCache:S,programs:h,dispose:L}}function zM(){let i=new WeakMap;function t(o){return i.has(o)}function e(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function s(o,a,c){i.get(o)[a]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function GM(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function td(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ed(){const i=[];let t=0;const e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function o(u,f,d,m,_,g){let p=i[t];return p===void 0?(p={id:u.id,object:u,geometry:f,material:d,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},i[t]=p):(p.id=u.id,p.object=u,p.geometry=f,p.material=d,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=_,p.group=g),t++,p}function a(u,f,d,m,_,g){const p=o(u,f,d,m,_,g);d.transmission>0?n.push(p):d.transparent===!0?s.push(p):e.push(p)}function c(u,f,d,m,_,g){const p=o(u,f,d,m,_,g);d.transmission>0?n.unshift(p):d.transparent===!0?s.unshift(p):e.unshift(p)}function l(u,f){e.length>1&&e.sort(u||GM),n.length>1&&n.sort(f||td),s.length>1&&s.sort(f||td)}function h(){for(let u=t,f=i.length;u<f;u++){const d=i[u];if(d.id===null)break;d.id=null,d.object=null,d.geometry=null,d.material=null,d.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function HM(){let i=new WeakMap;function t(n,s){const r=i.get(n);let o;return r===void 0?(o=new ed,i.set(n,[o])):s>=r.length?(o=new ed,r.push(o)):o=r[s],o}function e(){i=new WeakMap}return{get:t,dispose:e}}function VM(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new F,color:new qt};break;case"SpotLight":e={position:new F,direction:new F,color:new qt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new F,color:new qt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new F,skyColor:new qt,groundColor:new qt};break;case"RectAreaLight":e={color:new qt,position:new F,halfWidth:new F,halfHeight:new F};break}return i[t.id]=e,e}}}function WM(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let XM=0;function YM(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function KM(i){const t=new VM,e=WM(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new F);const s=new F,r=new de,o=new de;function a(l){let h=0,u=0,f=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let d=0,m=0,_=0,g=0,p=0,M=0,b=0,v=0,E=0,T=0,S=0;l.sort(YM);for(let x=0,y=l.length;x<y;x++){const A=l[x],P=A.color,N=A.intensity,z=A.distance,X=A.shadow&&A.shadow.map?A.shadow.map.texture:null;if(A.isAmbientLight)h+=P.r*N,u+=P.g*N,f+=P.b*N;else if(A.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(A.sh.coefficients[W],N);S++}else if(A.isDirectionalLight){const W=t.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity),A.castShadow){const K=A.shadow,G=e.get(A);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.directionalShadow[d]=G,n.directionalShadowMap[d]=X,n.directionalShadowMatrix[d]=A.shadow.matrix,M++}n.directional[d]=W,d++}else if(A.isSpotLight){const W=t.get(A);W.position.setFromMatrixPosition(A.matrixWorld),W.color.copy(P).multiplyScalar(N),W.distance=z,W.coneCos=Math.cos(A.angle),W.penumbraCos=Math.cos(A.angle*(1-A.penumbra)),W.decay=A.decay,n.spot[_]=W;const K=A.shadow;if(A.map&&(n.spotLightMap[E]=A.map,E++,K.updateMatrices(A),A.castShadow&&T++),n.spotLightMatrix[_]=K.matrix,A.castShadow){const G=e.get(A);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=X,v++}_++}else if(A.isRectAreaLight){const W=t.get(A);W.color.copy(P).multiplyScalar(N),W.halfWidth.set(A.width*.5,0,0),W.halfHeight.set(0,A.height*.5,0),n.rectArea[g]=W,g++}else if(A.isPointLight){const W=t.get(A);if(W.color.copy(A.color).multiplyScalar(A.intensity),W.distance=A.distance,W.decay=A.decay,A.castShadow){const K=A.shadow,G=e.get(A);G.shadowIntensity=K.intensity,G.shadowBias=K.bias,G.shadowNormalBias=K.normalBias,G.shadowRadius=K.radius,G.shadowMapSize=K.mapSize,G.shadowCameraNear=K.camera.near,G.shadowCameraFar=K.camera.far,n.pointShadow[m]=G,n.pointShadowMap[m]=X,n.pointShadowMatrix[m]=A.shadow.matrix,b++}n.point[m]=W,m++}else if(A.isHemisphereLight){const W=t.get(A);W.skyColor.copy(A.color).multiplyScalar(N),W.groundColor.copy(A.groundColor).multiplyScalar(N),n.hemi[p]=W,p++}}g>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=f;const L=n.hash;(L.directionalLength!==d||L.pointLength!==m||L.spotLength!==_||L.rectAreaLength!==g||L.hemiLength!==p||L.numDirectionalShadows!==M||L.numPointShadows!==b||L.numSpotShadows!==v||L.numSpotMaps!==E||L.numLightProbes!==S)&&(n.directional.length=d,n.spot.length=_,n.rectArea.length=g,n.point.length=m,n.hemi.length=p,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=v+E-T,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=S,L.directionalLength=d,L.pointLength=m,L.spotLength=_,L.rectAreaLength=g,L.hemiLength=p,L.numDirectionalShadows=M,L.numPointShadows=b,L.numSpotShadows=v,L.numSpotMaps=E,L.numLightProbes=S,n.version=XM++)}function c(l,h){let u=0,f=0,d=0,m=0,_=0;const g=h.matrixWorldInverse;for(let p=0,M=l.length;p<M;p++){const b=l[p];if(b.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),u++}else if(b.isSpotLight){const v=n.spot[d];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),v.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),v.direction.sub(s),v.direction.transformDirection(g),d++}else if(b.isRectAreaLight){const v=n.rectArea[m];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),o.identity(),r.copy(b.matrixWorld),r.premultiply(g),o.extractRotation(r),v.halfWidth.set(b.width*.5,0,0),v.halfHeight.set(0,b.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),m++}else if(b.isPointLight){const v=n.point[f];v.position.setFromMatrixPosition(b.matrixWorld),v.position.applyMatrix4(g),f++}else if(b.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(b.matrixWorld),v.direction.transformDirection(g),_++}}}return{setup:a,setupView:c,state:n}}function nd(i){const t=new KM(i),e=[],n=[];function s(h){l.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:a,setupLightsView:c,pushLight:r,pushShadow:o}}function qM(i){let t=new WeakMap;function e(s,r=0){const o=t.get(s);let a;return o===void 0?(a=new nd(i),t.set(s,[a])):r>=o.length?(a=new nd(i),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const $M=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jM=`uniform sampler2D shadow_pass;
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
}`;function ZM(i,t,e){let n=new Co;const s=new Ft,r=new Ft,o=new ke,a=new Qp({depthPacking:Cg}),c=new S1,l={},h=e.maxTextureSize,u={[Xi]:Cn,[Cn]:Xi,[Qn]:Qn},f=new en({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ft},radius:{value:4}},vertexShader:$M,fragmentShader:jM}),d=f.clone();d.defines.HORIZONTAL_PASS=1;const m=new He;m.setAttribute("position",new ye(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new fe(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Cp;let p=this.type;this.render=function(T,S,L){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||T.length===0)return;const x=i.getRenderTarget(),y=i.getActiveCubeFace(),A=i.getActiveMipmapLevel(),P=i.state;P.setBlending(vs),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const N=p!==ki&&this.type===ki,z=p===ki&&this.type!==ki;for(let X=0,W=T.length;X<W;X++){const K=T[X],G=K.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);const Z=G.getFrameExtents();if(s.multiply(Z),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Z.x),s.x=r.x*Z.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Z.y),s.y=r.y*Z.y,G.mapSize.y=r.y)),G.map===null||N===!0||z===!0){const Mt=this.type!==ki?{minFilter:ln,magFilter:ln}:{};G.map!==null&&G.map.dispose(),G.map=new ni(s.x,s.y,Mt),G.map.texture.name=K.name+".shadowMap",G.camera.updateProjectionMatrix()}i.setRenderTarget(G.map),i.clear();const rt=G.getViewportCount();for(let Mt=0;Mt<rt;Mt++){const Ut=G.getViewport(Mt);o.set(r.x*Ut.x,r.y*Ut.y,r.x*Ut.z,r.y*Ut.w),P.viewport(o),G.updateMatrices(K,Mt),n=G.getFrustum(),v(S,L,G.camera,K,this.type)}G.isPointLightShadow!==!0&&this.type===ki&&M(G,L),G.needsUpdate=!1}p=this.type,g.needsUpdate=!1,i.setRenderTarget(x,y,A)};function M(T,S){const L=t.update(_);f.defines.VSM_SAMPLES!==T.blurSamples&&(f.defines.VSM_SAMPLES=T.blurSamples,d.defines.VSM_SAMPLES=T.blurSamples,f.needsUpdate=!0,d.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new ni(s.x,s.y)),f.uniforms.shadow_pass.value=T.map.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(S,null,L,f,_,null),d.uniforms.shadow_pass.value=T.mapPass.texture,d.uniforms.resolution.value=T.mapSize,d.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(S,null,L,d,_,null)}function b(T,S,L,x){let y=null;const A=L.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(A!==void 0)y=A;else if(y=L.isPointLight===!0?c:a,i.localClippingEnabled&&S.clipShadows===!0&&Array.isArray(S.clippingPlanes)&&S.clippingPlanes.length!==0||S.displacementMap&&S.displacementScale!==0||S.alphaMap&&S.alphaTest>0||S.map&&S.alphaTest>0||S.alphaToCoverage===!0){const P=y.uuid,N=S.uuid;let z=l[P];z===void 0&&(z={},l[P]=z);let X=z[N];X===void 0&&(X=y.clone(),z[N]=X,S.addEventListener("dispose",E)),y=X}if(y.visible=S.visible,y.wireframe=S.wireframe,x===ki?y.side=S.shadowSide!==null?S.shadowSide:S.side:y.side=S.shadowSide!==null?S.shadowSide:u[S.side],y.alphaMap=S.alphaMap,y.alphaTest=S.alphaToCoverage===!0?.5:S.alphaTest,y.map=S.map,y.clipShadows=S.clipShadows,y.clippingPlanes=S.clippingPlanes,y.clipIntersection=S.clipIntersection,y.displacementMap=S.displacementMap,y.displacementScale=S.displacementScale,y.displacementBias=S.displacementBias,y.wireframeLinewidth=S.wireframeLinewidth,y.linewidth=S.linewidth,L.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const P=i.properties.get(y);P.light=L}return y}function v(T,S,L,x,y){if(T.visible===!1)return;if(T.layers.test(S.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&y===ki)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,T.matrixWorld);const N=t.update(T),z=T.material;if(Array.isArray(z)){const X=N.groups;for(let W=0,K=X.length;W<K;W++){const G=X[W],Z=z[G.materialIndex];if(Z&&Z.visible){const rt=b(T,Z,x,y);T.onBeforeShadow(i,T,S,L,N,rt,G),i.renderBufferDirect(L,null,N,rt,T,G),T.onAfterShadow(i,T,S,L,N,rt,G)}}}else if(z.visible){const X=b(T,z,x,y);T.onBeforeShadow(i,T,S,L,N,X,null),i.renderBufferDirect(L,null,N,X,T,null),T.onAfterShadow(i,T,S,L,N,X,null)}}const P=T.children;for(let N=0,z=P.length;N<z;N++)v(P[N],S,L,x,y)}function E(T){T.target.removeEventListener("dispose",E);for(const L in l){const x=l[L],y=T.target.uuid;y in x&&(x[y].dispose(),delete x[y])}}}const JM={[ql]:$l,[jl]:Ql,[Zl]:th,[kr]:Jl,[$l]:ql,[Ql]:jl,[th]:Zl,[Jl]:kr};function QM(i,t){function e(){let B=!1;const lt=new ke;let ut=null;const St=new ke(0,0,0,0);return{setMask:function(ot){ut!==ot&&!B&&(i.colorMask(ot,ot,ot,ot),ut=ot)},setLocked:function(ot){B=ot},setClear:function(ot,it,wt,$t,Re){Re===!0&&(ot*=$t,it*=$t,wt*=$t),lt.set(ot,it,wt,$t),St.equals(lt)===!1&&(i.clearColor(ot,it,wt,$t),St.copy(lt))},reset:function(){B=!1,ut=null,St.set(-1,0,0,0)}}}function n(){let B=!1,lt=!1,ut=null,St=null,ot=null;return{setReversed:function(it){if(lt!==it){const wt=t.get("EXT_clip_control");it?wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.ZERO_TO_ONE_EXT):wt.clipControlEXT(wt.LOWER_LEFT_EXT,wt.NEGATIVE_ONE_TO_ONE_EXT),lt=it;const $t=ot;ot=null,this.setClear($t)}},getReversed:function(){return lt},setTest:function(it){it?nt(i.DEPTH_TEST):mt(i.DEPTH_TEST)},setMask:function(it){ut!==it&&!B&&(i.depthMask(it),ut=it)},setFunc:function(it){if(lt&&(it=JM[it]),St!==it){switch(it){case ql:i.depthFunc(i.NEVER);break;case $l:i.depthFunc(i.ALWAYS);break;case jl:i.depthFunc(i.LESS);break;case kr:i.depthFunc(i.LEQUAL);break;case Zl:i.depthFunc(i.EQUAL);break;case Jl:i.depthFunc(i.GEQUAL);break;case Ql:i.depthFunc(i.GREATER);break;case th:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}St=it}},setLocked:function(it){B=it},setClear:function(it){ot!==it&&(lt&&(it=1-it),i.clearDepth(it),ot=it)},reset:function(){B=!1,ut=null,St=null,ot=null,lt=!1}}}function s(){let B=!1,lt=null,ut=null,St=null,ot=null,it=null,wt=null,$t=null,Re=null;return{setTest:function(_e){B||(_e?nt(i.STENCIL_TEST):mt(i.STENCIL_TEST))},setMask:function(_e){lt!==_e&&!B&&(i.stencilMask(_e),lt=_e)},setFunc:function(_e,Ci,vi){(ut!==_e||St!==Ci||ot!==vi)&&(i.stencilFunc(_e,Ci,vi),ut=_e,St=Ci,ot=vi)},setOp:function(_e,Ci,vi){(it!==_e||wt!==Ci||$t!==vi)&&(i.stencilOp(_e,Ci,vi),it=_e,wt=Ci,$t=vi)},setLocked:function(_e){B=_e},setClear:function(_e){Re!==_e&&(i.clearStencil(_e),Re=_e)},reset:function(){B=!1,lt=null,ut=null,St=null,ot=null,it=null,wt=null,$t=null,Re=null}}}const r=new e,o=new n,a=new s,c=new WeakMap,l=new WeakMap;let h={},u={},f=new WeakMap,d=[],m=null,_=!1,g=null,p=null,M=null,b=null,v=null,E=null,T=null,S=new qt(0,0,0),L=0,x=!1,y=null,A=null,P=null,N=null,z=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let W=!1,K=0;const G=i.getParameter(i.VERSION);G.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(G)[1]),W=K>=1):G.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),W=K>=2);let Z=null,rt={};const Mt=i.getParameter(i.SCISSOR_BOX),Ut=i.getParameter(i.VIEWPORT),zt=new ke().fromArray(Mt),te=new ke().fromArray(Ut);function re(B,lt,ut,St){const ot=new Uint8Array(4),it=i.createTexture();i.bindTexture(B,it),i.texParameteri(B,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(B,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let wt=0;wt<ut;wt++)B===i.TEXTURE_3D||B===i.TEXTURE_2D_ARRAY?i.texImage3D(lt,0,i.RGBA,1,1,St,0,i.RGBA,i.UNSIGNED_BYTE,ot):i.texImage2D(lt+wt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ot);return it}const Q={};Q[i.TEXTURE_2D]=re(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),nt(i.DEPTH_TEST),o.setFunc(kr),Xt(!1),At(Zu),nt(i.CULL_FACE),De(vs);function nt(B){h[B]!==!0&&(i.enable(B),h[B]=!0)}function mt(B){h[B]!==!1&&(i.disable(B),h[B]=!1)}function kt(B,lt){return u[B]!==lt?(i.bindFramebuffer(B,lt),u[B]=lt,B===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=lt),B===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=lt),!0):!1}function vt(B,lt){let ut=d,St=!1;if(B){ut=f.get(lt),ut===void 0&&(ut=[],f.set(lt,ut));const ot=B.textures;if(ut.length!==ot.length||ut[0]!==i.COLOR_ATTACHMENT0){for(let it=0,wt=ot.length;it<wt;it++)ut[it]=i.COLOR_ATTACHMENT0+it;ut.length=ot.length,St=!0}}else ut[0]!==i.BACK&&(ut[0]=i.BACK,St=!0);St&&i.drawBuffers(ut)}function le(B){return m!==B?(i.useProgram(B),m=B,!0):!1}const mn={[Bs]:i.FUNC_ADD,[eg]:i.FUNC_SUBTRACT,[ng]:i.FUNC_REVERSE_SUBTRACT};mn[ig]=i.MIN,mn[sg]=i.MAX;const O={[rg]:i.ZERO,[og]:i.ONE,[ag]:i.SRC_COLOR,[Yl]:i.SRC_ALPHA,[dg]:i.SRC_ALPHA_SATURATE,[ug]:i.DST_COLOR,[lg]:i.DST_ALPHA,[cg]:i.ONE_MINUS_SRC_COLOR,[Kl]:i.ONE_MINUS_SRC_ALPHA,[fg]:i.ONE_MINUS_DST_COLOR,[hg]:i.ONE_MINUS_DST_ALPHA,[pg]:i.CONSTANT_COLOR,[mg]:i.ONE_MINUS_CONSTANT_COLOR,[gg]:i.CONSTANT_ALPHA,[_g]:i.ONE_MINUS_CONSTANT_ALPHA};function De(B,lt,ut,St,ot,it,wt,$t,Re,_e){if(B===vs){_===!0&&(mt(i.BLEND),_=!1);return}if(_===!1&&(nt(i.BLEND),_=!0),B!==tg){if(B!==g||_e!==x){if((p!==Bs||v!==Bs)&&(i.blendEquation(i.FUNC_ADD),p=Bs,v=Bs),_e)switch(B){case Ir:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xl:i.blendFunc(i.ONE,i.ONE);break;case Ju:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Qu:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Ir:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Xl:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ju:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qu:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}M=null,b=null,E=null,T=null,S.set(0,0,0),L=0,g=B,x=_e}return}ot=ot||lt,it=it||ut,wt=wt||St,(lt!==p||ot!==v)&&(i.blendEquationSeparate(mn[lt],mn[ot]),p=lt,v=ot),(ut!==M||St!==b||it!==E||wt!==T)&&(i.blendFuncSeparate(O[ut],O[St],O[it],O[wt]),M=ut,b=St,E=it,T=wt),($t.equals(S)===!1||Re!==L)&&(i.blendColor($t.r,$t.g,$t.b,Re),S.copy($t),L=Re),g=B,x=!1}function jt(B,lt){B.side===Qn?mt(i.CULL_FACE):nt(i.CULL_FACE);let ut=B.side===Cn;lt&&(ut=!ut),Xt(ut),B.blending===Ir&&B.transparent===!1?De(vs):De(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),o.setFunc(B.depthFunc),o.setTest(B.depthTest),o.setMask(B.depthWrite),r.setMask(B.colorWrite);const St=B.stencilWrite;a.setTest(St),St&&(a.setMask(B.stencilWriteMask),a.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),a.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),Rt(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?nt(i.SAMPLE_ALPHA_TO_COVERAGE):mt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Xt(B){y!==B&&(B?i.frontFace(i.CW):i.frontFace(i.CCW),y=B)}function At(B){B!==Zm?(nt(i.CULL_FACE),B!==A&&(B===Zu?i.cullFace(i.BACK):B===Jm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):mt(i.CULL_FACE),A=B}function Pe(B){B!==P&&(W&&i.lineWidth(B),P=B)}function Rt(B,lt,ut){B?(nt(i.POLYGON_OFFSET_FILL),(N!==lt||z!==ut)&&(i.polygonOffset(lt,ut),N=lt,z=ut)):mt(i.POLYGON_OFFSET_FILL)}function ee(B){B?nt(i.SCISSOR_TEST):mt(i.SCISSOR_TEST)}function an(B){B===void 0&&(B=i.TEXTURE0+X-1),Z!==B&&(i.activeTexture(B),Z=B)}function ze(B,lt,ut){ut===void 0&&(Z===null?ut=i.TEXTURE0+X-1:ut=Z);let St=rt[ut];St===void 0&&(St={type:void 0,texture:void 0},rt[ut]=St),(St.type!==B||St.texture!==lt)&&(Z!==ut&&(i.activeTexture(ut),Z=ut),i.bindTexture(B,lt||Q[B]),St.type=B,St.texture=lt)}function I(){const B=rt[Z];B!==void 0&&B.type!==void 0&&(i.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function R(){try{i.compressedTexImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Y(){try{i.compressedTexImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function et(){try{i.texSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function st(){try{i.texSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function J(){try{i.compressedTexSubImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Pt(){try{i.compressedTexSubImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ht(){try{i.texStorage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ct(){try{i.texStorage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Lt(){try{i.texImage2D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ct(){try{i.texImage3D(...arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function xt(B){zt.equals(B)===!1&&(i.scissor(B.x,B.y,B.z,B.w),zt.copy(B))}function Vt(B){te.equals(B)===!1&&(i.viewport(B.x,B.y,B.z,B.w),te.copy(B))}function Dt(B,lt){let ut=l.get(lt);ut===void 0&&(ut=new WeakMap,l.set(lt,ut));let St=ut.get(B);St===void 0&&(St=i.getUniformBlockIndex(lt,B.name),ut.set(B,St))}function gt(B,lt){const St=l.get(lt).get(B);c.get(lt)!==St&&(i.uniformBlockBinding(lt,St,B.__bindingPointIndex),c.set(lt,St))}function Jt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},Z=null,rt={},u={},f=new WeakMap,d=[],m=null,_=!1,g=null,p=null,M=null,b=null,v=null,E=null,T=null,S=new qt(0,0,0),L=0,x=!1,y=null,A=null,P=null,N=null,z=null,zt.set(0,0,i.canvas.width,i.canvas.height),te.set(0,0,i.canvas.width,i.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:nt,disable:mt,bindFramebuffer:kt,drawBuffers:vt,useProgram:le,setBlending:De,setMaterial:jt,setFlipSided:Xt,setCullFace:At,setLineWidth:Pe,setPolygonOffset:Rt,setScissorTest:ee,activeTexture:an,bindTexture:ze,unbindTexture:I,compressedTexImage2D:R,compressedTexImage3D:Y,texImage2D:Lt,texImage3D:ct,updateUBOMapping:Dt,uniformBlockBinding:gt,texStorage2D:ht,texStorage3D:Ct,texSubImage2D:et,texSubImage3D:st,compressedTexSubImage2D:J,compressedTexSubImage3D:Pt,scissor:xt,viewport:Vt,reset:Jt}}function ty(i,t,e,n,s,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ft,h=new WeakMap;let u;const f=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(I,R){return d?new OffscreenCanvas(I,R):Ja("canvas")}function _(I,R,Y){let et=1;const st=ze(I);if((st.width>Y||st.height>Y)&&(et=Y/Math.max(st.width,st.height)),et<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const J=Math.floor(et*st.width),Pt=Math.floor(et*st.height);u===void 0&&(u=m(J,Pt));const ht=R?m(J,Pt):u;return ht.width=J,ht.height=Pt,ht.getContext("2d").drawImage(I,0,0,J,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+J+"x"+Pt+")."),ht}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),I;return I}function g(I){return I.generateMipmaps}function p(I){i.generateMipmap(I)}function M(I){return I.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?i.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function b(I,R,Y,et,st=!1){if(I!==null){if(i[I]!==void 0)return i[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let J=R;if(R===i.RED&&(Y===i.FLOAT&&(J=i.R32F),Y===i.HALF_FLOAT&&(J=i.R16F),Y===i.UNSIGNED_BYTE&&(J=i.R8)),R===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(J=i.R8UI),Y===i.UNSIGNED_SHORT&&(J=i.R16UI),Y===i.UNSIGNED_INT&&(J=i.R32UI),Y===i.BYTE&&(J=i.R8I),Y===i.SHORT&&(J=i.R16I),Y===i.INT&&(J=i.R32I)),R===i.RG&&(Y===i.FLOAT&&(J=i.RG32F),Y===i.HALF_FLOAT&&(J=i.RG16F),Y===i.UNSIGNED_BYTE&&(J=i.RG8)),R===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(J=i.RG8UI),Y===i.UNSIGNED_SHORT&&(J=i.RG16UI),Y===i.UNSIGNED_INT&&(J=i.RG32UI),Y===i.BYTE&&(J=i.RG8I),Y===i.SHORT&&(J=i.RG16I),Y===i.INT&&(J=i.RG32I)),R===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(J=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(J=i.RGB16UI),Y===i.UNSIGNED_INT&&(J=i.RGB32UI),Y===i.BYTE&&(J=i.RGB8I),Y===i.SHORT&&(J=i.RGB16I),Y===i.INT&&(J=i.RGB32I)),R===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(J=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(J=i.RGBA16UI),Y===i.UNSIGNED_INT&&(J=i.RGBA32UI),Y===i.BYTE&&(J=i.RGBA8I),Y===i.SHORT&&(J=i.RGBA16I),Y===i.INT&&(J=i.RGBA32I)),R===i.RGB&&(Y===i.UNSIGNED_INT_5_9_9_9_REV&&(J=i.RGB9_E5),Y===i.UNSIGNED_INT_10F_11F_11F_REV&&(J=i.R11F_G11F_B10F)),R===i.RGBA){const Pt=st?ja:me.getTransfer(et);Y===i.FLOAT&&(J=i.RGBA32F),Y===i.HALF_FLOAT&&(J=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(J=Pt===Se?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(J=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(J=i.RGB5_A1)}return(J===i.R16F||J===i.R32F||J===i.RG16F||J===i.RG32F||J===i.RGBA16F||J===i.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function v(I,R){let Y;return I?R===null||R===js||R===wo?Y=i.DEPTH24_STENCIL8:R===Ei?Y=i.DEPTH32F_STENCIL8:R===Eo&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):R===null||R===js||R===wo?Y=i.DEPTH_COMPONENT24:R===Ei?Y=i.DEPTH_COMPONENT32F:R===Eo&&(Y=i.DEPTH_COMPONENT16),Y}function E(I,R){return g(I)===!0||I.isFramebufferTexture&&I.minFilter!==ln&&I.minFilter!==di?Math.log2(Math.max(R.width,R.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?R.mipmaps.length:1}function T(I){const R=I.target;R.removeEventListener("dispose",T),L(R),R.isVideoTexture&&h.delete(R)}function S(I){const R=I.target;R.removeEventListener("dispose",S),y(R)}function L(I){const R=n.get(I);if(R.__webglInit===void 0)return;const Y=I.source,et=f.get(Y);if(et){const st=et[R.__cacheKey];st.usedTimes--,st.usedTimes===0&&x(I),Object.keys(et).length===0&&f.delete(Y)}n.remove(I)}function x(I){const R=n.get(I);i.deleteTexture(R.__webglTexture);const Y=I.source,et=f.get(Y);delete et[R.__cacheKey],o.memory.textures--}function y(I){const R=n.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),n.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(R.__webglFramebuffer[et]))for(let st=0;st<R.__webglFramebuffer[et].length;st++)i.deleteFramebuffer(R.__webglFramebuffer[et][st]);else i.deleteFramebuffer(R.__webglFramebuffer[et]);R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer[et])}else{if(Array.isArray(R.__webglFramebuffer))for(let et=0;et<R.__webglFramebuffer.length;et++)i.deleteFramebuffer(R.__webglFramebuffer[et]);else i.deleteFramebuffer(R.__webglFramebuffer);if(R.__webglDepthbuffer&&i.deleteRenderbuffer(R.__webglDepthbuffer),R.__webglMultisampledFramebuffer&&i.deleteFramebuffer(R.__webglMultisampledFramebuffer),R.__webglColorRenderbuffer)for(let et=0;et<R.__webglColorRenderbuffer.length;et++)R.__webglColorRenderbuffer[et]&&i.deleteRenderbuffer(R.__webglColorRenderbuffer[et]);R.__webglDepthRenderbuffer&&i.deleteRenderbuffer(R.__webglDepthRenderbuffer)}const Y=I.textures;for(let et=0,st=Y.length;et<st;et++){const J=n.get(Y[et]);J.__webglTexture&&(i.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(Y[et])}n.remove(I)}let A=0;function P(){A=0}function N(){const I=A;return I>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+s.maxTextures),A+=1,I}function z(I){const R=[];return R.push(I.wrapS),R.push(I.wrapT),R.push(I.wrapR||0),R.push(I.magFilter),R.push(I.minFilter),R.push(I.anisotropy),R.push(I.internalFormat),R.push(I.format),R.push(I.type),R.push(I.generateMipmaps),R.push(I.premultiplyAlpha),R.push(I.flipY),R.push(I.unpackAlignment),R.push(I.colorSpace),R.join()}function X(I,R){const Y=n.get(I);if(I.isVideoTexture&&ee(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&Y.__version!==I.version){const et=I.image;if(et===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(et.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Q(Y,I,R);return}}else I.isExternalTexture&&(Y.__webglTexture=I.sourceTexture?I.sourceTexture:null);e.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+R)}function W(I,R){const Y=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&Y.__version!==I.version){Q(Y,I,R);return}e.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+R)}function K(I,R){const Y=n.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&Y.__version!==I.version){Q(Y,I,R);return}e.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+R)}function G(I,R){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){nt(Y,I,R);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+R)}const Z={[ih]:i.REPEAT,[Ys]:i.CLAMP_TO_EDGE,[sh]:i.MIRRORED_REPEAT},rt={[ln]:i.NEAREST,[Ag]:i.NEAREST_MIPMAP_NEAREST,[_o]:i.NEAREST_MIPMAP_LINEAR,[di]:i.LINEAR,[Dc]:i.LINEAR_MIPMAP_NEAREST,[Ks]:i.LINEAR_MIPMAP_LINEAR},Mt={[Dg]:i.NEVER,[Og]:i.ALWAYS,[Pg]:i.LESS,[pu]:i.LEQUAL,[Ig]:i.EQUAL,[kg]:i.GEQUAL,[Ng]:i.GREATER,[Ug]:i.NOTEQUAL};function Ut(I,R){if(R.type===Ei&&t.has("OES_texture_float_linear")===!1&&(R.magFilter===di||R.magFilter===Dc||R.magFilter===_o||R.magFilter===Ks||R.minFilter===di||R.minFilter===Dc||R.minFilter===_o||R.minFilter===Ks)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(I,i.TEXTURE_WRAP_S,Z[R.wrapS]),i.texParameteri(I,i.TEXTURE_WRAP_T,Z[R.wrapT]),(I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY)&&i.texParameteri(I,i.TEXTURE_WRAP_R,Z[R.wrapR]),i.texParameteri(I,i.TEXTURE_MAG_FILTER,rt[R.magFilter]),i.texParameteri(I,i.TEXTURE_MIN_FILTER,rt[R.minFilter]),R.compareFunction&&(i.texParameteri(I,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(I,i.TEXTURE_COMPARE_FUNC,Mt[R.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(R.magFilter===ln||R.minFilter!==_o&&R.minFilter!==Ks||R.type===Ei&&t.has("OES_texture_float_linear")===!1)return;if(R.anisotropy>1||n.get(R).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");i.texParameterf(I,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,s.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy}}}function zt(I,R){let Y=!1;I.__webglInit===void 0&&(I.__webglInit=!0,R.addEventListener("dispose",T));const et=R.source;let st=f.get(et);st===void 0&&(st={},f.set(et,st));const J=z(R);if(J!==I.__cacheKey){st[J]===void 0&&(st[J]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,Y=!0),st[J].usedTimes++;const Pt=st[I.__cacheKey];Pt!==void 0&&(st[I.__cacheKey].usedTimes--,Pt.usedTimes===0&&x(R)),I.__cacheKey=J,I.__webglTexture=st[J].texture}return Y}function te(I,R,Y){return Math.floor(Math.floor(I/Y)/R)}function re(I,R,Y,et){const J=I.updateRanges;if(J.length===0)e.texSubImage2D(i.TEXTURE_2D,0,0,0,R.width,R.height,Y,et,R.data);else{J.sort((ct,xt)=>ct.start-xt.start);let Pt=0;for(let ct=1;ct<J.length;ct++){const xt=J[Pt],Vt=J[ct],Dt=xt.start+xt.count,gt=te(Vt.start,R.width,4),Jt=te(xt.start,R.width,4);Vt.start<=Dt+1&&gt===Jt&&te(Vt.start+Vt.count-1,R.width,4)===gt?xt.count=Math.max(xt.count,Vt.start+Vt.count-xt.start):(++Pt,J[Pt]=Vt)}J.length=Pt+1;const ht=i.getParameter(i.UNPACK_ROW_LENGTH),Ct=i.getParameter(i.UNPACK_SKIP_PIXELS),Lt=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,R.width);for(let ct=0,xt=J.length;ct<xt;ct++){const Vt=J[ct],Dt=Math.floor(Vt.start/4),gt=Math.ceil(Vt.count/4),Jt=Dt%R.width,B=Math.floor(Dt/R.width),lt=gt,ut=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Jt),i.pixelStorei(i.UNPACK_SKIP_ROWS,B),e.texSubImage2D(i.TEXTURE_2D,0,Jt,B,lt,ut,Y,et,R.data)}I.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,ht),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ct),i.pixelStorei(i.UNPACK_SKIP_ROWS,Lt)}}function Q(I,R,Y){let et=i.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(et=i.TEXTURE_2D_ARRAY),R.isData3DTexture&&(et=i.TEXTURE_3D);const st=zt(I,R),J=R.source;e.bindTexture(et,I.__webglTexture,i.TEXTURE0+Y);const Pt=n.get(J);if(J.version!==Pt.__version||st===!0){e.activeTexture(i.TEXTURE0+Y);const ht=me.getPrimaries(me.workingColorSpace),Ct=R.colorSpace===ds?null:me.getPrimaries(R.colorSpace),Lt=R.colorSpace===ds||ht===Ct?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Lt);let ct=_(R.image,!1,s.maxTextureSize);ct=an(R,ct);const xt=r.convert(R.format,R.colorSpace),Vt=r.convert(R.type);let Dt=b(R.internalFormat,xt,Vt,R.colorSpace,R.isVideoTexture);Ut(et,R);let gt;const Jt=R.mipmaps,B=R.isVideoTexture!==!0,lt=Pt.__version===void 0||st===!0,ut=J.dataReady,St=E(R,ct);if(R.isDepthTexture)Dt=v(R.format===Ao,R.type),lt&&(B?e.texStorage2D(i.TEXTURE_2D,1,Dt,ct.width,ct.height):e.texImage2D(i.TEXTURE_2D,0,Dt,ct.width,ct.height,0,xt,Vt,null));else if(R.isDataTexture)if(Jt.length>0){B&&lt&&e.texStorage2D(i.TEXTURE_2D,St,Dt,Jt[0].width,Jt[0].height);for(let ot=0,it=Jt.length;ot<it;ot++)gt=Jt[ot],B?ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,gt.width,gt.height,xt,Vt,gt.data):e.texImage2D(i.TEXTURE_2D,ot,Dt,gt.width,gt.height,0,xt,Vt,gt.data);R.generateMipmaps=!1}else B?(lt&&e.texStorage2D(i.TEXTURE_2D,St,Dt,ct.width,ct.height),ut&&re(R,ct,xt,Vt)):e.texImage2D(i.TEXTURE_2D,0,Dt,ct.width,ct.height,0,xt,Vt,ct.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){B&&lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Dt,Jt[0].width,Jt[0].height,ct.depth);for(let ot=0,it=Jt.length;ot<it;ot++)if(gt=Jt[ot],R.format!==pi)if(xt!==null)if(B){if(ut)if(R.layerUpdates.size>0){const wt=Pf(gt.width,gt.height,R.format,R.type);for(const $t of R.layerUpdates){const Re=gt.data.subarray($t*wt/gt.data.BYTES_PER_ELEMENT,($t+1)*wt/gt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,$t,gt.width,gt.height,1,xt,Re)}R.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,gt.width,gt.height,ct.depth,xt,gt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ot,Dt,gt.width,gt.height,ct.depth,0,gt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else B?ut&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,gt.width,gt.height,ct.depth,xt,Vt,gt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ot,Dt,gt.width,gt.height,ct.depth,0,xt,Vt,gt.data)}else{B&&lt&&e.texStorage2D(i.TEXTURE_2D,St,Dt,Jt[0].width,Jt[0].height);for(let ot=0,it=Jt.length;ot<it;ot++)gt=Jt[ot],R.format!==pi?xt!==null?B?ut&&e.compressedTexSubImage2D(i.TEXTURE_2D,ot,0,0,gt.width,gt.height,xt,gt.data):e.compressedTexImage2D(i.TEXTURE_2D,ot,Dt,gt.width,gt.height,0,gt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):B?ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,gt.width,gt.height,xt,Vt,gt.data):e.texImage2D(i.TEXTURE_2D,ot,Dt,gt.width,gt.height,0,xt,Vt,gt.data)}else if(R.isDataArrayTexture)if(B){if(lt&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Dt,ct.width,ct.height,ct.depth),ut)if(R.layerUpdates.size>0){const ot=Pf(ct.width,ct.height,R.format,R.type);for(const it of R.layerUpdates){const wt=ct.data.subarray(it*ot/ct.data.BYTES_PER_ELEMENT,(it+1)*ot/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,it,ct.width,ct.height,1,xt,Vt,wt)}R.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,xt,Vt,ct.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Dt,ct.width,ct.height,ct.depth,0,xt,Vt,ct.data);else if(R.isData3DTexture)B?(lt&&e.texStorage3D(i.TEXTURE_3D,St,Dt,ct.width,ct.height,ct.depth),ut&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,xt,Vt,ct.data)):e.texImage3D(i.TEXTURE_3D,0,Dt,ct.width,ct.height,ct.depth,0,xt,Vt,ct.data);else if(R.isFramebufferTexture){if(lt)if(B)e.texStorage2D(i.TEXTURE_2D,St,Dt,ct.width,ct.height);else{let ot=ct.width,it=ct.height;for(let wt=0;wt<St;wt++)e.texImage2D(i.TEXTURE_2D,wt,Dt,ot,it,0,xt,Vt,null),ot>>=1,it>>=1}}else if(Jt.length>0){if(B&&lt){const ot=ze(Jt[0]);e.texStorage2D(i.TEXTURE_2D,St,Dt,ot.width,ot.height)}for(let ot=0,it=Jt.length;ot<it;ot++)gt=Jt[ot],B?ut&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,xt,Vt,gt):e.texImage2D(i.TEXTURE_2D,ot,Dt,xt,Vt,gt);R.generateMipmaps=!1}else if(B){if(lt){const ot=ze(ct);e.texStorage2D(i.TEXTURE_2D,St,Dt,ot.width,ot.height)}ut&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,xt,Vt,ct)}else e.texImage2D(i.TEXTURE_2D,0,Dt,xt,Vt,ct);g(R)&&p(et),Pt.__version=J.version,R.onUpdate&&R.onUpdate(R)}I.__version=R.version}function nt(I,R,Y){if(R.image.length!==6)return;const et=zt(I,R),st=R.source;e.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+Y);const J=n.get(st);if(st.version!==J.__version||et===!0){e.activeTexture(i.TEXTURE0+Y);const Pt=me.getPrimaries(me.workingColorSpace),ht=R.colorSpace===ds?null:me.getPrimaries(R.colorSpace),Ct=R.colorSpace===ds||Pt===ht?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,R.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,R.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);const Lt=R.isCompressedTexture||R.image[0].isCompressedTexture,ct=R.image[0]&&R.image[0].isDataTexture,xt=[];for(let it=0;it<6;it++)!Lt&&!ct?xt[it]=_(R.image[it],!0,s.maxCubemapSize):xt[it]=ct?R.image[it].image:R.image[it],xt[it]=an(R,xt[it]);const Vt=xt[0],Dt=r.convert(R.format,R.colorSpace),gt=r.convert(R.type),Jt=b(R.internalFormat,Dt,gt,R.colorSpace),B=R.isVideoTexture!==!0,lt=J.__version===void 0||et===!0,ut=st.dataReady;let St=E(R,Vt);Ut(i.TEXTURE_CUBE_MAP,R);let ot;if(Lt){B&&lt&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Jt,Vt.width,Vt.height);for(let it=0;it<6;it++){ot=xt[it].mipmaps;for(let wt=0;wt<ot.length;wt++){const $t=ot[wt];R.format!==pi?Dt!==null?B?ut&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt,0,0,$t.width,$t.height,Dt,$t.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt,Jt,$t.width,$t.height,0,$t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):B?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt,0,0,$t.width,$t.height,Dt,gt,$t.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt,Jt,$t.width,$t.height,0,Dt,gt,$t.data)}}}else{if(ot=R.mipmaps,B&&lt){ot.length>0&&St++;const it=ze(xt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Jt,it.width,it.height)}for(let it=0;it<6;it++)if(ct){B?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,xt[it].width,xt[it].height,Dt,gt,xt[it].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Jt,xt[it].width,xt[it].height,0,Dt,gt,xt[it].data);for(let wt=0;wt<ot.length;wt++){const Re=ot[wt].image[it].image;B?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt+1,0,0,Re.width,Re.height,Dt,gt,Re.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt+1,Jt,Re.width,Re.height,0,Dt,gt,Re.data)}}else{B?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,0,0,Dt,gt,xt[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,0,Jt,Dt,gt,xt[it]);for(let wt=0;wt<ot.length;wt++){const $t=ot[wt];B?ut&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt+1,0,0,Dt,gt,$t.image[it]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+it,wt+1,Jt,Dt,gt,$t.image[it])}}}g(R)&&p(i.TEXTURE_CUBE_MAP),J.__version=st.version,R.onUpdate&&R.onUpdate(R)}I.__version=R.version}function mt(I,R,Y,et,st,J){const Pt=r.convert(Y.format,Y.colorSpace),ht=r.convert(Y.type),Ct=b(Y.internalFormat,Pt,ht,Y.colorSpace),Lt=n.get(R),ct=n.get(Y);if(ct.__renderTarget=R,!Lt.__hasExternalTextures){const xt=Math.max(1,R.width>>J),Vt=Math.max(1,R.height>>J);st===i.TEXTURE_3D||st===i.TEXTURE_2D_ARRAY?e.texImage3D(st,J,Ct,xt,Vt,R.depth,0,Pt,ht,null):e.texImage2D(st,J,Ct,xt,Vt,0,Pt,ht,null)}e.bindFramebuffer(i.FRAMEBUFFER,I),Rt(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,et,st,ct.__webglTexture,0,Pe(R)):(st===i.TEXTURE_2D||st>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,et,st,ct.__webglTexture,J),e.bindFramebuffer(i.FRAMEBUFFER,null)}function kt(I,R,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,I),R.depthBuffer){const et=R.depthTexture,st=et&&et.isDepthTexture?et.type:null,J=v(R.stencilBuffer,st),Pt=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ht=Pe(R);Rt(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ht,J,R.width,R.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,ht,J,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,J,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pt,i.RENDERBUFFER,I)}else{const et=R.textures;for(let st=0;st<et.length;st++){const J=et[st],Pt=r.convert(J.format,J.colorSpace),ht=r.convert(J.type),Ct=b(J.internalFormat,Pt,ht,J.colorSpace),Lt=Pe(R);Y&&Rt(R)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Lt,Ct,R.width,R.height):Rt(R)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Lt,Ct,R.width,R.height):i.renderbufferStorage(i.RENDERBUFFER,Ct,R.width,R.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function vt(I,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,I),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const et=n.get(R.depthTexture);et.__renderTarget=R,(!et.__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),X(R.depthTexture,0);const st=et.__webglTexture,J=Pe(R);if(R.depthTexture.format===To)Rt(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,st,0);else if(R.depthTexture.format===Ao)Rt(R)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0,J):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,st,0);else throw new Error("Unknown depthTexture format")}function le(I){const R=n.get(I),Y=I.isWebGLCubeRenderTarget===!0;if(R.__boundDepthTexture!==I.depthTexture){const et=I.depthTexture;if(R.__depthDisposeCallback&&R.__depthDisposeCallback(),et){const st=()=>{delete R.__boundDepthTexture,delete R.__depthDisposeCallback,et.removeEventListener("dispose",st)};et.addEventListener("dispose",st),R.__depthDisposeCallback=st}R.__boundDepthTexture=et}if(I.depthTexture&&!R.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");const et=I.texture.mipmaps;et&&et.length>0?vt(R.__webglFramebuffer[0],I):vt(R.__webglFramebuffer,I)}else if(Y){R.__webglDepthbuffer=[];for(let et=0;et<6;et++)if(e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[et]),R.__webglDepthbuffer[et]===void 0)R.__webglDepthbuffer[et]=i.createRenderbuffer(),kt(R.__webglDepthbuffer[et],I,!1);else{const st=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=R.__webglDepthbuffer[et];i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,J)}}else{const et=I.texture.mipmaps;if(et&&et.length>0?e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer[0]):e.bindFramebuffer(i.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer===void 0)R.__webglDepthbuffer=i.createRenderbuffer(),kt(R.__webglDepthbuffer,I,!1);else{const st=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,J=R.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,J),i.framebufferRenderbuffer(i.FRAMEBUFFER,st,i.RENDERBUFFER,J)}}e.bindFramebuffer(i.FRAMEBUFFER,null)}function mn(I,R,Y){const et=n.get(I);R!==void 0&&mt(et.__webglFramebuffer,I,I.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&le(I)}function O(I){const R=I.texture,Y=n.get(I),et=n.get(R);I.addEventListener("dispose",S);const st=I.textures,J=I.isWebGLCubeRenderTarget===!0,Pt=st.length>1;if(Pt||(et.__webglTexture===void 0&&(et.__webglTexture=i.createTexture()),et.__version=R.version,o.memory.textures++),J){Y.__webglFramebuffer=[];for(let ht=0;ht<6;ht++)if(R.mipmaps&&R.mipmaps.length>0){Y.__webglFramebuffer[ht]=[];for(let Ct=0;Ct<R.mipmaps.length;Ct++)Y.__webglFramebuffer[ht][Ct]=i.createFramebuffer()}else Y.__webglFramebuffer[ht]=i.createFramebuffer()}else{if(R.mipmaps&&R.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ht=0;ht<R.mipmaps.length;ht++)Y.__webglFramebuffer[ht]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Pt)for(let ht=0,Ct=st.length;ht<Ct;ht++){const Lt=n.get(st[ht]);Lt.__webglTexture===void 0&&(Lt.__webglTexture=i.createTexture(),o.memory.textures++)}if(I.samples>0&&Rt(I)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ht=0;ht<st.length;ht++){const Ct=st[ht];Y.__webglColorRenderbuffer[ht]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[ht]);const Lt=r.convert(Ct.format,Ct.colorSpace),ct=r.convert(Ct.type),xt=b(Ct.internalFormat,Lt,ct,Ct.colorSpace,I.isXRRenderTarget===!0),Vt=Pe(I);i.renderbufferStorageMultisample(i.RENDERBUFFER,Vt,xt,I.width,I.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ht,i.RENDERBUFFER,Y.__webglColorRenderbuffer[ht])}i.bindRenderbuffer(i.RENDERBUFFER,null),I.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),kt(Y.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(J){e.bindTexture(i.TEXTURE_CUBE_MAP,et.__webglTexture),Ut(i.TEXTURE_CUBE_MAP,R);for(let ht=0;ht<6;ht++)if(R.mipmaps&&R.mipmaps.length>0)for(let Ct=0;Ct<R.mipmaps.length;Ct++)mt(Y.__webglFramebuffer[ht][Ct],I,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,Ct);else mt(Y.__webglFramebuffer[ht],I,R,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+ht,0);g(R)&&p(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Pt){for(let ht=0,Ct=st.length;ht<Ct;ht++){const Lt=st[ht],ct=n.get(Lt);let xt=i.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(xt=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(xt,ct.__webglTexture),Ut(xt,Lt),mt(Y.__webglFramebuffer,I,Lt,i.COLOR_ATTACHMENT0+ht,xt,0),g(Lt)&&p(xt)}e.unbindTexture()}else{let ht=i.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(ht=I.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(ht,et.__webglTexture),Ut(ht,R),R.mipmaps&&R.mipmaps.length>0)for(let Ct=0;Ct<R.mipmaps.length;Ct++)mt(Y.__webglFramebuffer[Ct],I,R,i.COLOR_ATTACHMENT0,ht,Ct);else mt(Y.__webglFramebuffer,I,R,i.COLOR_ATTACHMENT0,ht,0);g(R)&&p(ht),e.unbindTexture()}I.depthBuffer&&le(I)}function De(I){const R=I.textures;for(let Y=0,et=R.length;Y<et;Y++){const st=R[Y];if(g(st)){const J=M(I),Pt=n.get(st).__webglTexture;e.bindTexture(J,Pt),p(J),e.unbindTexture()}}}const jt=[],Xt=[];function At(I){if(I.samples>0){if(Rt(I)===!1){const R=I.textures,Y=I.width,et=I.height;let st=i.COLOR_BUFFER_BIT;const J=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pt=n.get(I),ht=R.length>1;if(ht)for(let Lt=0;Lt<R.length;Lt++)e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer);const Ct=I.texture.mipmaps;Ct&&Ct.length>0?e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer[0]):e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let Lt=0;Lt<R.length;Lt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(st|=i.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(st|=i.STENCIL_BUFFER_BIT)),ht){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[Lt]);const ct=n.get(R[Lt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ct,0)}i.blitFramebuffer(0,0,Y,et,0,0,Y,et,st,i.NEAREST),c===!0&&(jt.length=0,Xt.length=0,jt.push(i.COLOR_ATTACHMENT0+Lt),I.depthBuffer&&I.resolveDepthBuffer===!1&&(jt.push(J),Xt.push(J),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Xt)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,jt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),ht)for(let Lt=0;Lt<R.length;Lt++){e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.RENDERBUFFER,Pt.__webglColorRenderbuffer[Lt]);const ct=n.get(R[Lt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,Pt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Lt,i.TEXTURE_2D,ct,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&c){const R=I.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[R])}}}function Pe(I){return Math.min(s.maxSamples,I.samples)}function Rt(I){const R=n.get(I);return I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function ee(I){const R=o.render.frame;h.get(I)!==R&&(h.set(I,R),I.update())}function an(I,R){const Y=I.colorSpace,et=I.format,st=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||Y!==Br&&Y!==ds&&(me.getTransfer(Y)===Se?(et!==pi||st!==_i)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),R}function ze(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(l.width=I.naturalWidth||I.width,l.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(l.width=I.displayWidth,l.height=I.displayHeight):(l.width=I.width,l.height=I.height),l}this.allocateTextureUnit=N,this.resetTextureUnits=P,this.setTexture2D=X,this.setTexture2DArray=W,this.setTexture3D=K,this.setTextureCube=G,this.rebindTextures=mn,this.setupRenderTarget=O,this.updateRenderTargetMipmap=De,this.updateMultisampleRenderTarget=At,this.setupDepthRenderbuffer=le,this.setupFrameBufferTexture=mt,this.useMultisampledRTT=Rt}function ey(i,t){function e(n,s=ds){let r;const o=me.getTransfer(s);if(n===_i)return i.UNSIGNED_BYTE;if(n===cu)return i.UNSIGNED_SHORT_4_4_4_4;if(n===lu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ip)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Np)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Dp)return i.BYTE;if(n===Pp)return i.SHORT;if(n===Eo)return i.UNSIGNED_SHORT;if(n===au)return i.INT;if(n===js)return i.UNSIGNED_INT;if(n===Ei)return i.FLOAT;if(n===Vi)return i.HALF_FLOAT;if(n===Up)return i.ALPHA;if(n===kp)return i.RGB;if(n===pi)return i.RGBA;if(n===To)return i.DEPTH_COMPONENT;if(n===Ao)return i.DEPTH_STENCIL;if(n===hu)return i.RED;if(n===uu)return i.RED_INTEGER;if(n===Op)return i.RG;if(n===fu)return i.RG_INTEGER;if(n===du)return i.RGBA_INTEGER;if(n===Fa||n===Ba||n===za||n===Ga)if(o===Se)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Fa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ba)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===za)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ga)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Fa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ba)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===za)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ga)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===rh||n===oh||n===ah||n===ch)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===rh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===oh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===ah)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ch)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===lh||n===hh||n===uh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===lh||n===hh)return o===Se?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===uh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===fh||n===dh||n===ph||n===mh||n===gh||n===_h||n===vh||n===xh||n===Mh||n===yh||n===bh||n===Sh||n===Eh||n===wh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===fh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===dh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ph)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===mh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===gh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===_h)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===vh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===xh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Mh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===bh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Sh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Eh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wh)return o===Se?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Th||n===Ah||n===Rh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Th)return o===Se?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ah)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Rh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ch||n===Lh||n===Dh||n===Ph)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Ch)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Lh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Dh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ph)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===wo?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}const ny=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,iy=`
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

}`;class sy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Jp(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new en({vertexShader:ny,fragmentShader:iy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new fe(new Go(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ry extends Zr{constructor(t,e){super();const n=this;let s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,d=null,m=null;const _=typeof XRWebGLBinding<"u",g=new sy,p={},M=e.getContextAttributes();let b=null,v=null;const E=[],T=[],S=new Ft;let L=null;const x=new Wn;x.viewport=new ke;const y=new Wn;y.viewport=new ke;const A=[x,y],P=new T1;let N=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let nt=E[Q];return nt===void 0&&(nt=new Qc,E[Q]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Q){let nt=E[Q];return nt===void 0&&(nt=new Qc,E[Q]=nt),nt.getGripSpace()},this.getHand=function(Q){let nt=E[Q];return nt===void 0&&(nt=new Qc,E[Q]=nt),nt.getHandSpace()};function X(Q){const nt=T.indexOf(Q.inputSource);if(nt===-1)return;const mt=E[nt];mt!==void 0&&(mt.update(Q.inputSource,Q.frame,l||o),mt.dispatchEvent({type:Q.type,data:Q.inputSource}))}function W(){s.removeEventListener("select",X),s.removeEventListener("selectstart",X),s.removeEventListener("selectend",X),s.removeEventListener("squeeze",X),s.removeEventListener("squeezestart",X),s.removeEventListener("squeezeend",X),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",K);for(let Q=0;Q<E.length;Q++){const nt=T[Q];nt!==null&&(T[Q]=null,E[Q].disconnect(nt))}N=null,z=null,g.reset();for(const Q in p)delete p[Q];t.setRenderTarget(b),d=null,f=null,u=null,s=null,v=null,re.stop(),n.isPresenting=!1,t.setPixelRatio(L),t.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){r=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return f!==null?f:d},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(Q){if(s=Q,s!==null){if(b=t.getRenderTarget(),s.addEventListener("select",X),s.addEventListener("selectstart",X),s.addEventListener("selectend",X),s.addEventListener("squeeze",X),s.addEventListener("squeezestart",X),s.addEventListener("squeezeend",X),s.addEventListener("end",W),s.addEventListener("inputsourceschange",K),M.xrCompatible!==!0&&await e.makeXRCompatible(),L=t.getPixelRatio(),t.getSize(S),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let mt=null,kt=null,vt=null;M.depth&&(vt=M.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,mt=M.stencil?Ao:To,kt=M.stencil?wo:js);const le={colorFormat:e.RGBA8,depthFormat:vt,scaleFactor:r};u=this.getBinding(),f=u.createProjectionLayer(le),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),v=new ni(f.textureWidth,f.textureHeight,{format:pi,type:_i,depthTexture:new nc(f.textureWidth,f.textureHeight,kt,void 0,void 0,void 0,void 0,void 0,void 0,mt),stencilBuffer:M.stencil,colorSpace:t.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const mt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:r};d=new XRWebGLLayer(s,e,mt),s.updateRenderState({baseLayer:d}),t.setPixelRatio(1),t.setSize(d.framebufferWidth,d.framebufferHeight,!1),v=new ni(d.framebufferWidth,d.framebufferHeight,{format:pi,type:_i,colorSpace:t.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),re.setContext(s),re.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function K(Q){for(let nt=0;nt<Q.removed.length;nt++){const mt=Q.removed[nt],kt=T.indexOf(mt);kt>=0&&(T[kt]=null,E[kt].disconnect(mt))}for(let nt=0;nt<Q.added.length;nt++){const mt=Q.added[nt];let kt=T.indexOf(mt);if(kt===-1){for(let le=0;le<E.length;le++)if(le>=T.length){T.push(mt),kt=le;break}else if(T[le]===null){T[le]=mt,kt=le;break}if(kt===-1)break}const vt=E[kt];vt&&vt.connect(mt)}}const G=new F,Z=new F;function rt(Q,nt,mt){G.setFromMatrixPosition(nt.matrixWorld),Z.setFromMatrixPosition(mt.matrixWorld);const kt=G.distanceTo(Z),vt=nt.projectionMatrix.elements,le=mt.projectionMatrix.elements,mn=vt[14]/(vt[10]-1),O=vt[14]/(vt[10]+1),De=(vt[9]+1)/vt[5],jt=(vt[9]-1)/vt[5],Xt=(vt[8]-1)/vt[0],At=(le[8]+1)/le[0],Pe=mn*Xt,Rt=mn*At,ee=kt/(-Xt+At),an=ee*-Xt;if(nt.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(an),Q.translateZ(ee),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),vt[10]===-1)Q.projectionMatrix.copy(nt.projectionMatrix),Q.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const ze=mn+ee,I=O+ee,R=Pe-an,Y=Rt+(kt-an),et=De*O/I*ze,st=jt*O/I*ze;Q.projectionMatrix.makePerspective(R,Y,et,st,ze,I),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Mt(Q,nt){nt===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(nt.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(s===null)return;let nt=Q.near,mt=Q.far;g.texture!==null&&(g.depthNear>0&&(nt=g.depthNear),g.depthFar>0&&(mt=g.depthFar)),P.near=y.near=x.near=nt,P.far=y.far=x.far=mt,(N!==P.near||z!==P.far)&&(s.updateRenderState({depthNear:P.near,depthFar:P.far}),N=P.near,z=P.far),P.layers.mask=Q.layers.mask|6,x.layers.mask=P.layers.mask&3,y.layers.mask=P.layers.mask&5;const kt=Q.parent,vt=P.cameras;Mt(P,kt);for(let le=0;le<vt.length;le++)Mt(vt[le],kt);vt.length===2?rt(P,x,y):P.projectionMatrix.copy(x.projectionMatrix),Ut(Q,P,kt)};function Ut(Q,nt,mt){mt===null?Q.matrix.copy(nt.matrixWorld):(Q.matrix.copy(mt.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(nt.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(nt.projectionMatrix),Q.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=Nh*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(f===null&&d===null))return c},this.setFoveation=function(Q){c=Q,f!==null&&(f.fixedFoveation=Q),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=Q)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(P)},this.getCameraTexture=function(Q){return p[Q]};let zt=null;function te(Q,nt){if(h=nt.getViewerPose(l||o),m=nt,h!==null){const mt=h.views;d!==null&&(t.setRenderTargetFramebuffer(v,d.framebuffer),t.setRenderTarget(v));let kt=!1;mt.length!==P.cameras.length&&(P.cameras.length=0,kt=!0);for(let O=0;O<mt.length;O++){const De=mt[O];let jt=null;if(d!==null)jt=d.getViewport(De);else{const At=u.getViewSubImage(f,De);jt=At.viewport,O===0&&(t.setRenderTargetTextures(v,At.colorTexture,At.depthStencilTexture),t.setRenderTarget(v))}let Xt=A[O];Xt===void 0&&(Xt=new Wn,Xt.layers.enable(O),Xt.viewport=new ke,A[O]=Xt),Xt.matrix.fromArray(De.transform.matrix),Xt.matrix.decompose(Xt.position,Xt.quaternion,Xt.scale),Xt.projectionMatrix.fromArray(De.projectionMatrix),Xt.projectionMatrixInverse.copy(Xt.projectionMatrix).invert(),Xt.viewport.set(jt.x,jt.y,jt.width,jt.height),O===0&&(P.matrix.copy(Xt.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),kt===!0&&P.cameras.push(Xt)}const vt=s.enabledFeatures;if(vt&&vt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&_){u=n.getBinding();const O=u.getDepthInformation(mt[0]);O&&O.isValid&&O.texture&&g.init(O,s.renderState)}if(vt&&vt.includes("camera-access")&&_){t.state.unbindTexture(),u=n.getBinding();for(let O=0;O<mt.length;O++){const De=mt[O].camera;if(De){let jt=p[De];jt||(jt=new Jp,p[De]=jt);const Xt=u.getCameraImage(De);jt.sourceTexture=Xt}}}}for(let mt=0;mt<E.length;mt++){const kt=T[mt],vt=E[mt];kt!==null&&vt!==void 0&&vt.update(kt,nt,l||o)}zt&&zt(Q,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),m=null}const re=new i0;re.setAnimationLoop(te),this.setAnimationLoop=function(Q){zt=Q},this.dispose=function(){}}}const ks=new ii,oy=new de;function ay(i,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Vp(i)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function s(g,p,M,b,v){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),u(g,p)):p.isMeshPhongMaterial?(r(g,p),h(g,p)):p.isMeshStandardMaterial?(r(g,p),f(g,p),p.isMeshPhysicalMaterial&&d(g,p,v)):p.isMeshMatcapMaterial?(r(g,p),m(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),_(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?c(g,p,M,b):p.isSpriteMaterial?l(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Cn&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Cn&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const M=t.get(p),b=M.envMap,v=M.envMapRotation;b&&(g.envMap.value=b,ks.copy(v),ks.x*=-1,ks.y*=-1,ks.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(ks.y*=-1,ks.z*=-1),g.envMapRotation.value.setFromMatrix4(oy.makeRotationFromEuler(ks)),g.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function c(g,p,M,b){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*M,g.scale.value=b*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function l(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function f(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function d(g,p,M){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Cn&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=M.texture,g.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const M=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(M.matrixWorld),g.nearDistance.value=M.shadow.camera.near,g.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function cy(i,t,e,n){let s={},r={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){const v=b.program;n.uniformBlockBinding(M,v)}function l(M,b){let v=s[M.id];v===void 0&&(m(M),v=h(M),s[M.id]=v,M.addEventListener("dispose",g));const E=b.program;n.updateUBOMapping(M,E);const T=t.render.frame;r[M.id]!==T&&(f(M),r[M.id]=T)}function h(M){const b=u();M.__bindingPointIndex=b;const v=i.createBuffer(),E=M.__size,T=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,E,T),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,v),v}function u(){for(let M=0;M<a;M++)if(o.indexOf(M)===-1)return o.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(M){const b=s[M.id],v=M.uniforms,E=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let T=0,S=v.length;T<S;T++){const L=Array.isArray(v[T])?v[T]:[v[T]];for(let x=0,y=L.length;x<y;x++){const A=L[x];if(d(A,T,x,E)===!0){const P=A.__offset,N=Array.isArray(A.value)?A.value:[A.value];let z=0;for(let X=0;X<N.length;X++){const W=N[X],K=_(W);typeof W=="number"||typeof W=="boolean"?(A.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,P+z,A.__data)):W.isMatrix3?(A.__data[0]=W.elements[0],A.__data[1]=W.elements[1],A.__data[2]=W.elements[2],A.__data[3]=0,A.__data[4]=W.elements[3],A.__data[5]=W.elements[4],A.__data[6]=W.elements[5],A.__data[7]=0,A.__data[8]=W.elements[6],A.__data[9]=W.elements[7],A.__data[10]=W.elements[8],A.__data[11]=0):(W.toArray(A.__data,z),z+=K.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,P,A.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(M,b,v,E){const T=M.value,S=b+"_"+v;if(E[S]===void 0)return typeof T=="number"||typeof T=="boolean"?E[S]=T:E[S]=T.clone(),!0;{const L=E[S];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return E[S]=T,!0}else if(L.equals(T)===!1)return L.copy(T),!0}return!1}function m(M){const b=M.uniforms;let v=0;const E=16;for(let S=0,L=b.length;S<L;S++){const x=Array.isArray(b[S])?b[S]:[b[S]];for(let y=0,A=x.length;y<A;y++){const P=x[y],N=Array.isArray(P.value)?P.value:[P.value];for(let z=0,X=N.length;z<X;z++){const W=N[z],K=_(W),G=v%E,Z=G%K.boundary,rt=G+Z;v+=Z,rt!==0&&E-rt<K.storage&&(v+=E-rt),P.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=v,v+=K.storage}}}const T=v%E;return T>0&&(v+=E-T),M.__size=v,M.__cache={},this}function _(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),b}function g(M){const b=M.target;b.removeEventListener("dispose",g);const v=o.indexOf(b.__bindingPointIndex);o.splice(v,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const M in s)i.deleteBuffer(s[M]);o=[],s={},r={}}return{bind:c,update:l,dispose:p}}class ly{constructor(t={}){const{canvas:e=Bg(),context:n=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const M=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=xs,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let E=!1;this._outputColorSpace=hn;let T=0,S=0,L=null,x=-1,y=null;const A=new ke,P=new ke;let N=null;const z=new qt(0);let X=0,W=e.width,K=e.height,G=1,Z=null,rt=null;const Mt=new ke(0,0,W,K),Ut=new ke(0,0,W,K);let zt=!1;const te=new Co;let re=!1,Q=!1;const nt=new de,mt=new F,kt=new ke,vt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let le=!1;function mn(){return L===null?G:1}let O=n;function De(D,H){return e.getContext(D,H)}try{const D={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ou}`),e.addEventListener("webglcontextlost",ut,!1),e.addEventListener("webglcontextrestored",St,!1),e.addEventListener("webglcontextcreationerror",ot,!1),O===null){const H="webgl2";if(O=De(H,D),O===null)throw De(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(D){throw console.error("THREE.WebGLRenderer: "+D.message),D}let jt,Xt,At,Pe,Rt,ee,an,ze,I,R,Y,et,st,J,Pt,ht,Ct,Lt,ct,xt,Vt,Dt,gt,Jt;function B(){jt=new xx(O),jt.init(),Dt=new ey(O,jt),Xt=new fx(O,jt,t,Dt),At=new QM(O,jt),Xt.reversedDepthBuffer&&f&&At.buffers.depth.setReversed(!0),Pe=new bx(O),Rt=new zM,ee=new ty(O,jt,At,Rt,Xt,Dt,Pe),an=new px(v),ze=new vx(v),I=new R1(O),gt=new hx(O,I),R=new Mx(O,I,Pe,gt),Y=new Ex(O,R,I,Pe),ct=new Sx(O,Xt,ee),ht=new dx(Rt),et=new BM(v,an,ze,jt,Xt,gt,ht),st=new ay(v,Rt),J=new HM,Pt=new qM(jt),Lt=new lx(v,an,ze,At,Y,d,c),Ct=new ZM(v,Y,Xt),Jt=new cy(O,Pe,Xt,At),xt=new ux(O,jt,Pe),Vt=new yx(O,jt,Pe),Pe.programs=et.programs,v.capabilities=Xt,v.extensions=jt,v.properties=Rt,v.renderLists=J,v.shadowMap=Ct,v.state=At,v.info=Pe}B();const lt=new ry(v,O);this.xr=lt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const D=jt.get("WEBGL_lose_context");D&&D.loseContext()},this.forceContextRestore=function(){const D=jt.get("WEBGL_lose_context");D&&D.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(D){D!==void 0&&(G=D,this.setSize(W,K,!1))},this.getSize=function(D){return D.set(W,K)},this.setSize=function(D,H,q=!0){if(lt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}W=D,K=H,e.width=Math.floor(D*G),e.height=Math.floor(H*G),q===!0&&(e.style.width=D+"px",e.style.height=H+"px"),this.setViewport(0,0,D,H)},this.getDrawingBufferSize=function(D){return D.set(W*G,K*G).floor()},this.setDrawingBufferSize=function(D,H,q){W=D,K=H,G=q,e.width=Math.floor(D*q),e.height=Math.floor(H*q),this.setViewport(0,0,D,H)},this.getCurrentViewport=function(D){return D.copy(A)},this.getViewport=function(D){return D.copy(Mt)},this.setViewport=function(D,H,q,$){D.isVector4?Mt.set(D.x,D.y,D.z,D.w):Mt.set(D,H,q,$),At.viewport(A.copy(Mt).multiplyScalar(G).round())},this.getScissor=function(D){return D.copy(Ut)},this.setScissor=function(D,H,q,$){D.isVector4?Ut.set(D.x,D.y,D.z,D.w):Ut.set(D,H,q,$),At.scissor(P.copy(Ut).multiplyScalar(G).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(D){At.setScissorTest(zt=D)},this.setOpaqueSort=function(D){Z=D},this.setTransparentSort=function(D){rt=D},this.getClearColor=function(D){return D.copy(Lt.getClearColor())},this.setClearColor=function(){Lt.setClearColor(...arguments)},this.getClearAlpha=function(){return Lt.getClearAlpha()},this.setClearAlpha=function(){Lt.setClearAlpha(...arguments)},this.clear=function(D=!0,H=!0,q=!0){let $=0;if(D){let V=!1;if(L!==null){const at=L.texture.format;V=at===du||at===fu||at===uu}if(V){const at=L.texture.type,_t=at===_i||at===js||at===Eo||at===wo||at===cu||at===lu,Et=Lt.getClearColor(),bt=Lt.getClearAlpha(),Gt=Et.r,Yt=Et.g,Nt=Et.b;_t?(m[0]=Gt,m[1]=Yt,m[2]=Nt,m[3]=bt,O.clearBufferuiv(O.COLOR,0,m)):(_[0]=Gt,_[1]=Yt,_[2]=Nt,_[3]=bt,O.clearBufferiv(O.COLOR,0,_))}else $|=O.COLOR_BUFFER_BIT}H&&($|=O.DEPTH_BUFFER_BIT),q&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",ut,!1),e.removeEventListener("webglcontextrestored",St,!1),e.removeEventListener("webglcontextcreationerror",ot,!1),Lt.dispose(),J.dispose(),Pt.dispose(),Rt.dispose(),an.dispose(),ze.dispose(),Y.dispose(),gt.dispose(),Jt.dispose(),et.dispose(),lt.dispose(),lt.removeEventListener("sessionstart",vi),lt.removeEventListener("sessionend",zu),Cs.stop()};function ut(D){D.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function St(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const D=Pe.autoReset,H=Ct.enabled,q=Ct.autoUpdate,$=Ct.needsUpdate,V=Ct.type;B(),Pe.autoReset=D,Ct.enabled=H,Ct.autoUpdate=q,Ct.needsUpdate=$,Ct.type=V}function ot(D){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",D.statusMessage)}function it(D){const H=D.target;H.removeEventListener("dispose",it),wt(H)}function wt(D){$t(D),Rt.remove(D)}function $t(D){const H=Rt.get(D).programs;H!==void 0&&(H.forEach(function(q){et.releaseProgram(q)}),D.isShaderMaterial&&et.releaseShaderCache(D))}this.renderBufferDirect=function(D,H,q,$,V,at){H===null&&(H=vt);const _t=V.isMesh&&V.matrixWorld.determinant()<0,Et=pm(D,H,q,$,V);At.setMaterial($,_t);let bt=q.index,Gt=1;if($.wireframe===!0){if(bt=R.getWireframeAttribute(q),bt===void 0)return;Gt=2}const Yt=q.drawRange,Nt=q.attributes.position;let ae=Yt.start*Gt,be=(Yt.start+Yt.count)*Gt;at!==null&&(ae=Math.max(ae,at.start*Gt),be=Math.min(be,(at.start+at.count)*Gt)),bt!==null?(ae=Math.max(ae,0),be=Math.min(be,bt.count)):Nt!=null&&(ae=Math.max(ae,0),be=Math.min(be,Nt.count));const Oe=be-ae;if(Oe<0||Oe===1/0)return;gt.setup(V,$,Et,q,bt);let Le,Te=xt;if(bt!==null&&(Le=I.get(bt),Te=Vt,Te.setIndex(Le)),V.isMesh)$.wireframe===!0?(At.setLineWidth($.wireframeLinewidth*mn()),Te.setMode(O.LINES)):Te.setMode(O.TRIANGLES);else if(V.isLine){let Ot=$.linewidth;Ot===void 0&&(Ot=1),At.setLineWidth(Ot*mn()),V.isLineSegments?Te.setMode(O.LINES):V.isLineLoop?Te.setMode(O.LINE_LOOP):Te.setMode(O.LINE_STRIP)}else V.isPoints?Te.setMode(O.POINTS):V.isSprite&&Te.setMode(O.TRIANGLES);if(V.isBatchedMesh)if(V._multiDrawInstances!==null)Ro("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Te.renderMultiDrawInstances(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount,V._multiDrawInstances);else if(jt.get("WEBGL_multi_draw"))Te.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{const Ot=V._multiDrawStarts,Ie=V._multiDrawCounts,pe=V._multiDrawCount,kn=bt?I.get(bt).bytesPerElement:1,Qs=Rt.get($).currentProgram.getUniforms();for(let On=0;On<pe;On++)Qs.setValue(O,"_gl_DrawID",On),Te.render(Ot[On]/kn,Ie[On])}else if(V.isInstancedMesh)Te.renderInstances(ae,Oe,V.count);else if(q.isInstancedBufferGeometry){const Ot=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ie=Math.min(q.instanceCount,Ot);Te.renderInstances(ae,Oe,Ie)}else Te.render(ae,Oe)};function Re(D,H,q){D.transparent===!0&&D.side===Qn&&D.forceSinglePass===!1?(D.side=Cn,D.needsUpdate=!0,Xo(D,H,q),D.side=Xi,D.needsUpdate=!0,Xo(D,H,q),D.side=Qn):Xo(D,H,q)}this.compile=function(D,H,q=null){q===null&&(q=D),p=Pt.get(q),p.init(H),b.push(p),q.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),D!==q&&D.traverseVisible(function(V){V.isLight&&V.layers.test(H.layers)&&(p.pushLight(V),V.castShadow&&p.pushShadow(V))}),p.setupLights();const $=new Set;return D.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;const at=V.material;if(at)if(Array.isArray(at))for(let _t=0;_t<at.length;_t++){const Et=at[_t];Re(Et,q,V),$.add(Et)}else Re(at,q,V),$.add(at)}),p=b.pop(),$},this.compileAsync=function(D,H,q=null){const $=this.compile(D,H,q);return new Promise(V=>{function at(){if($.forEach(function(_t){Rt.get(_t).currentProgram.isReady()&&$.delete(_t)}),$.size===0){V(D);return}setTimeout(at,10)}jt.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let _e=null;function Ci(D){_e&&_e(D)}function vi(){Cs.stop()}function zu(){Cs.start()}const Cs=new i0;Cs.setAnimationLoop(Ci),typeof self<"u"&&Cs.setContext(self),this.setAnimationLoop=function(D){_e=D,lt.setAnimationLoop(D),D===null?Cs.stop():Cs.start()},lt.addEventListener("sessionstart",vi),lt.addEventListener("sessionend",zu),this.render=function(D,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),lt.enabled===!0&&lt.isPresenting===!0&&(lt.cameraAutoUpdate===!0&&lt.updateCamera(H),H=lt.getCamera()),D.isScene===!0&&D.onBeforeRender(v,D,H,L),p=Pt.get(D,b.length),p.init(H),b.push(p),nt.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),te.setFromProjectionMatrix(nt,wi,H.reversedDepth),Q=this.localClippingEnabled,re=ht.init(this.clippingPlanes,Q),g=J.get(D,M.length),g.init(),M.push(g),lt.enabled===!0&&lt.isPresenting===!0){const at=v.xr.getDepthSensingMesh();at!==null&&Ac(at,H,-1/0,v.sortObjects)}Ac(D,H,0,v.sortObjects),g.finish(),v.sortObjects===!0&&g.sort(Z,rt),le=lt.enabled===!1||lt.isPresenting===!1||lt.hasDepthSensing()===!1,le&&Lt.addToRenderList(g,D),this.info.render.frame++,re===!0&&ht.beginShadows();const q=p.state.shadowsArray;Ct.render(q,D,H),re===!0&&ht.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=g.opaque,V=g.transmissive;if(p.setupLights(),H.isArrayCamera){const at=H.cameras;if(V.length>0)for(let _t=0,Et=at.length;_t<Et;_t++){const bt=at[_t];Hu($,V,D,bt)}le&&Lt.render(D);for(let _t=0,Et=at.length;_t<Et;_t++){const bt=at[_t];Gu(g,D,bt,bt.viewport)}}else V.length>0&&Hu($,V,D,H),le&&Lt.render(D),Gu(g,D,H);L!==null&&S===0&&(ee.updateMultisampleRenderTarget(L),ee.updateRenderTargetMipmap(L)),D.isScene===!0&&D.onAfterRender(v,D,H),gt.resetDefaultState(),x=-1,y=null,b.pop(),b.length>0?(p=b[b.length-1],re===!0&&ht.setGlobalState(v.clippingPlanes,p.state.camera)):p=null,M.pop(),M.length>0?g=M[M.length-1]:g=null};function Ac(D,H,q,$){if(D.visible===!1)return;if(D.layers.test(H.layers)){if(D.isGroup)q=D.renderOrder;else if(D.isLOD)D.autoUpdate===!0&&D.update(H);else if(D.isLight)p.pushLight(D),D.castShadow&&p.pushShadow(D);else if(D.isSprite){if(!D.frustumCulled||te.intersectsSprite(D)){$&&kt.setFromMatrixPosition(D.matrixWorld).applyMatrix4(nt);const _t=Y.update(D),Et=D.material;Et.visible&&g.push(D,_t,Et,q,kt.z,null)}}else if((D.isMesh||D.isLine||D.isPoints)&&(!D.frustumCulled||te.intersectsObject(D))){const _t=Y.update(D),Et=D.material;if($&&(D.boundingSphere!==void 0?(D.boundingSphere===null&&D.computeBoundingSphere(),kt.copy(D.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),kt.copy(_t.boundingSphere.center)),kt.applyMatrix4(D.matrixWorld).applyMatrix4(nt)),Array.isArray(Et)){const bt=_t.groups;for(let Gt=0,Yt=bt.length;Gt<Yt;Gt++){const Nt=bt[Gt],ae=Et[Nt.materialIndex];ae&&ae.visible&&g.push(D,_t,ae,q,kt.z,Nt)}}else Et.visible&&g.push(D,_t,Et,q,kt.z,null)}}const at=D.children;for(let _t=0,Et=at.length;_t<Et;_t++)Ac(at[_t],H,q,$)}function Gu(D,H,q,$){const V=D.opaque,at=D.transmissive,_t=D.transparent;p.setupLightsView(q),re===!0&&ht.setGlobalState(v.clippingPlanes,q),$&&At.viewport(A.copy($)),V.length>0&&Wo(V,H,q),at.length>0&&Wo(at,H,q),_t.length>0&&Wo(_t,H,q),At.buffers.depth.setTest(!0),At.buffers.depth.setMask(!0),At.buffers.color.setMask(!0),At.setPolygonOffset(!1)}function Hu(D,H,q,$){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[$.id]===void 0&&(p.state.transmissionRenderTarget[$.id]=new ni(1,1,{generateMipmaps:!0,type:jt.has("EXT_color_buffer_half_float")||jt.has("EXT_color_buffer_float")?Vi:_i,minFilter:Ks,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:me.workingColorSpace}));const at=p.state.transmissionRenderTarget[$.id],_t=$.viewport||A;at.setSize(_t.z*v.transmissionResolutionScale,_t.w*v.transmissionResolutionScale);const Et=v.getRenderTarget(),bt=v.getActiveCubeFace(),Gt=v.getActiveMipmapLevel();v.setRenderTarget(at),v.getClearColor(z),X=v.getClearAlpha(),X<1&&v.setClearColor(16777215,.5),v.clear(),le&&Lt.render(q);const Yt=v.toneMapping;v.toneMapping=xs;const Nt=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),p.setupLightsView($),re===!0&&ht.setGlobalState(v.clippingPlanes,$),Wo(D,q,$),ee.updateMultisampleRenderTarget(at),ee.updateRenderTargetMipmap(at),jt.has("WEBGL_multisampled_render_to_texture")===!1){let ae=!1;for(let be=0,Oe=H.length;be<Oe;be++){const Le=H[be],Te=Le.object,Ot=Le.geometry,Ie=Le.material,pe=Le.group;if(Ie.side===Qn&&Te.layers.test($.layers)){const kn=Ie.side;Ie.side=Cn,Ie.needsUpdate=!0,Vu(Te,q,$,Ot,Ie,pe),Ie.side=kn,Ie.needsUpdate=!0,ae=!0}}ae===!0&&(ee.updateMultisampleRenderTarget(at),ee.updateRenderTargetMipmap(at))}v.setRenderTarget(Et,bt,Gt),v.setClearColor(z,X),Nt!==void 0&&($.viewport=Nt),v.toneMapping=Yt}function Wo(D,H,q){const $=H.isScene===!0?H.overrideMaterial:null;for(let V=0,at=D.length;V<at;V++){const _t=D[V],Et=_t.object,bt=_t.geometry,Gt=_t.group;let Yt=_t.material;Yt.allowOverride===!0&&$!==null&&(Yt=$),Et.layers.test(q.layers)&&Vu(Et,H,q,bt,Yt,Gt)}}function Vu(D,H,q,$,V,at){D.onBeforeRender(v,H,q,$,V,at),D.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,D.matrixWorld),D.normalMatrix.getNormalMatrix(D.modelViewMatrix),V.onBeforeRender(v,H,q,$,D,at),V.transparent===!0&&V.side===Qn&&V.forceSinglePass===!1?(V.side=Cn,V.needsUpdate=!0,v.renderBufferDirect(q,H,$,V,D,at),V.side=Xi,V.needsUpdate=!0,v.renderBufferDirect(q,H,$,V,D,at),V.side=Qn):v.renderBufferDirect(q,H,$,V,D,at),D.onAfterRender(v,H,q,$,V,at)}function Xo(D,H,q){H.isScene!==!0&&(H=vt);const $=Rt.get(D),V=p.state.lights,at=p.state.shadowsArray,_t=V.state.version,Et=et.getParameters(D,V.state,at,H,q),bt=et.getProgramCacheKey(Et);let Gt=$.programs;$.environment=D.isMeshStandardMaterial?H.environment:null,$.fog=H.fog,$.envMap=(D.isMeshStandardMaterial?ze:an).get(D.envMap||$.environment),$.envMapRotation=$.environment!==null&&D.envMap===null?H.environmentRotation:D.envMapRotation,Gt===void 0&&(D.addEventListener("dispose",it),Gt=new Map,$.programs=Gt);let Yt=Gt.get(bt);if(Yt!==void 0){if($.currentProgram===Yt&&$.lightsStateVersion===_t)return Xu(D,Et),Yt}else Et.uniforms=et.getUniforms(D),D.onBeforeCompile(Et,v),Yt=et.acquireProgram(Et,bt),Gt.set(bt,Yt),$.uniforms=Et.uniforms;const Nt=$.uniforms;return(!D.isShaderMaterial&&!D.isRawShaderMaterial||D.clipping===!0)&&(Nt.clippingPlanes=ht.uniform),Xu(D,Et),$.needsLights=gm(D),$.lightsStateVersion=_t,$.needsLights&&(Nt.ambientLightColor.value=V.state.ambient,Nt.lightProbe.value=V.state.probe,Nt.directionalLights.value=V.state.directional,Nt.directionalLightShadows.value=V.state.directionalShadow,Nt.spotLights.value=V.state.spot,Nt.spotLightShadows.value=V.state.spotShadow,Nt.rectAreaLights.value=V.state.rectArea,Nt.ltc_1.value=V.state.rectAreaLTC1,Nt.ltc_2.value=V.state.rectAreaLTC2,Nt.pointLights.value=V.state.point,Nt.pointLightShadows.value=V.state.pointShadow,Nt.hemisphereLights.value=V.state.hemi,Nt.directionalShadowMap.value=V.state.directionalShadowMap,Nt.directionalShadowMatrix.value=V.state.directionalShadowMatrix,Nt.spotShadowMap.value=V.state.spotShadowMap,Nt.spotLightMatrix.value=V.state.spotLightMatrix,Nt.spotLightMap.value=V.state.spotLightMap,Nt.pointShadowMap.value=V.state.pointShadowMap,Nt.pointShadowMatrix.value=V.state.pointShadowMatrix),$.currentProgram=Yt,$.uniformsList=null,Yt}function Wu(D){if(D.uniformsList===null){const H=D.currentProgram.getUniforms();D.uniformsList=Va.seqWithValue(H.seq,D.uniforms)}return D.uniformsList}function Xu(D,H){const q=Rt.get(D);q.outputColorSpace=H.outputColorSpace,q.batching=H.batching,q.batchingColor=H.batchingColor,q.instancing=H.instancing,q.instancingColor=H.instancingColor,q.instancingMorph=H.instancingMorph,q.skinning=H.skinning,q.morphTargets=H.morphTargets,q.morphNormals=H.morphNormals,q.morphColors=H.morphColors,q.morphTargetsCount=H.morphTargetsCount,q.numClippingPlanes=H.numClippingPlanes,q.numIntersection=H.numClipIntersection,q.vertexAlphas=H.vertexAlphas,q.vertexTangents=H.vertexTangents,q.toneMapping=H.toneMapping}function pm(D,H,q,$,V){H.isScene!==!0&&(H=vt),ee.resetTextureUnits();const at=H.fog,_t=$.isMeshStandardMaterial?H.environment:null,Et=L===null?v.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Br,bt=($.isMeshStandardMaterial?ze:an).get($.envMap||_t),Gt=$.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Yt=!!q.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),Nt=!!q.morphAttributes.position,ae=!!q.morphAttributes.normal,be=!!q.morphAttributes.color;let Oe=xs;$.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Oe=v.toneMapping);const Le=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Te=Le!==void 0?Le.length:0,Ot=Rt.get($),Ie=p.state.lights;if(re===!0&&(Q===!0||D!==y)){const En=D===y&&$.id===x;ht.setState($,D,En)}let pe=!1;$.version===Ot.__version?(Ot.needsLights&&Ot.lightsStateVersion!==Ie.state.version||Ot.outputColorSpace!==Et||V.isBatchedMesh&&Ot.batching===!1||!V.isBatchedMesh&&Ot.batching===!0||V.isBatchedMesh&&Ot.batchingColor===!0&&V.colorTexture===null||V.isBatchedMesh&&Ot.batchingColor===!1&&V.colorTexture!==null||V.isInstancedMesh&&Ot.instancing===!1||!V.isInstancedMesh&&Ot.instancing===!0||V.isSkinnedMesh&&Ot.skinning===!1||!V.isSkinnedMesh&&Ot.skinning===!0||V.isInstancedMesh&&Ot.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Ot.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Ot.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Ot.instancingMorph===!1&&V.morphTexture!==null||Ot.envMap!==bt||$.fog===!0&&Ot.fog!==at||Ot.numClippingPlanes!==void 0&&(Ot.numClippingPlanes!==ht.numPlanes||Ot.numIntersection!==ht.numIntersection)||Ot.vertexAlphas!==Gt||Ot.vertexTangents!==Yt||Ot.morphTargets!==Nt||Ot.morphNormals!==ae||Ot.morphColors!==be||Ot.toneMapping!==Oe||Ot.morphTargetsCount!==Te)&&(pe=!0):(pe=!0,Ot.__version=$.version);let kn=Ot.currentProgram;pe===!0&&(kn=Xo($,H,V));let Qs=!1,On=!1,io=!1;const Ne=kn.getUniforms(),Kn=Ot.uniforms;if(At.useProgram(kn.program)&&(Qs=!0,On=!0,io=!0),$.id!==x&&(x=$.id,On=!0),Qs||y!==D){At.buffers.depth.getReversed()&&D.reversedDepth!==!0&&(D._reversedDepth=!0,D.updateProjectionMatrix()),Ne.setValue(O,"projectionMatrix",D.projectionMatrix),Ne.setValue(O,"viewMatrix",D.matrixWorldInverse);const Dn=Ne.map.cameraPosition;Dn!==void 0&&Dn.setValue(O,mt.setFromMatrixPosition(D.matrixWorld)),Xt.logarithmicDepthBuffer&&Ne.setValue(O,"logDepthBufFC",2/(Math.log(D.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Ne.setValue(O,"isOrthographic",D.isOrthographicCamera===!0),y!==D&&(y=D,On=!0,io=!0)}if(V.isSkinnedMesh){Ne.setOptional(O,V,"bindMatrix"),Ne.setOptional(O,V,"bindMatrixInverse");const En=V.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),Ne.setValue(O,"boneTexture",En.boneTexture,ee))}V.isBatchedMesh&&(Ne.setOptional(O,V,"batchingTexture"),Ne.setValue(O,"batchingTexture",V._matricesTexture,ee),Ne.setOptional(O,V,"batchingIdTexture"),Ne.setValue(O,"batchingIdTexture",V._indirectTexture,ee),Ne.setOptional(O,V,"batchingColorTexture"),V._colorsTexture!==null&&Ne.setValue(O,"batchingColorTexture",V._colorsTexture,ee));const qn=q.morphAttributes;if((qn.position!==void 0||qn.normal!==void 0||qn.color!==void 0)&&ct.update(V,q,kn),(On||Ot.receiveShadow!==V.receiveShadow)&&(Ot.receiveShadow=V.receiveShadow,Ne.setValue(O,"receiveShadow",V.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(Kn.envMap.value=bt,Kn.flipEnvMap.value=bt.isCubeTexture&&bt.isRenderTargetTexture===!1?-1:1),$.isMeshStandardMaterial&&$.envMap===null&&H.environment!==null&&(Kn.envMapIntensity.value=H.environmentIntensity),On&&(Ne.setValue(O,"toneMappingExposure",v.toneMappingExposure),Ot.needsLights&&mm(Kn,io),at&&$.fog===!0&&st.refreshFogUniforms(Kn,at),st.refreshMaterialUniforms(Kn,$,G,K,p.state.transmissionRenderTarget[D.id]),Va.upload(O,Wu(Ot),Kn,ee)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(Va.upload(O,Wu(Ot),Kn,ee),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Ne.setValue(O,"center",V.center),Ne.setValue(O,"modelViewMatrix",V.modelViewMatrix),Ne.setValue(O,"normalMatrix",V.normalMatrix),Ne.setValue(O,"modelMatrix",V.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const En=$.uniformsGroups;for(let Dn=0,Rc=En.length;Dn<Rc;Dn++){const Ls=En[Dn];Jt.update(Ls,kn),Jt.bind(Ls,kn)}}return kn}function mm(D,H){D.ambientLightColor.needsUpdate=H,D.lightProbe.needsUpdate=H,D.directionalLights.needsUpdate=H,D.directionalLightShadows.needsUpdate=H,D.pointLights.needsUpdate=H,D.pointLightShadows.needsUpdate=H,D.spotLights.needsUpdate=H,D.spotLightShadows.needsUpdate=H,D.rectAreaLights.needsUpdate=H,D.hemisphereLights.needsUpdate=H}function gm(D){return D.isMeshLambertMaterial||D.isMeshToonMaterial||D.isMeshPhongMaterial||D.isMeshStandardMaterial||D.isShadowMaterial||D.isShaderMaterial&&D.lights===!0}this.getActiveCubeFace=function(){return T},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(D,H,q){const $=Rt.get(D);$.__autoAllocateDepthBuffer=D.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Rt.get(D.texture).__webglTexture=H,Rt.get(D.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:q,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(D,H){const q=Rt.get(D);q.__webglFramebuffer=H,q.__useDefaultFramebuffer=H===void 0};const _m=O.createFramebuffer();this.setRenderTarget=function(D,H=0,q=0){L=D,T=H,S=q;let $=!0,V=null,at=!1,_t=!1;if(D){const bt=Rt.get(D);if(bt.__useDefaultFramebuffer!==void 0)At.bindFramebuffer(O.FRAMEBUFFER,null),$=!1;else if(bt.__webglFramebuffer===void 0)ee.setupRenderTarget(D);else if(bt.__hasExternalTextures)ee.rebindTextures(D,Rt.get(D.texture).__webglTexture,Rt.get(D.depthTexture).__webglTexture);else if(D.depthBuffer){const Nt=D.depthTexture;if(bt.__boundDepthTexture!==Nt){if(Nt!==null&&Rt.has(Nt)&&(D.width!==Nt.image.width||D.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(D)}}const Gt=D.texture;(Gt.isData3DTexture||Gt.isDataArrayTexture||Gt.isCompressedArrayTexture)&&(_t=!0);const Yt=Rt.get(D).__webglFramebuffer;D.isWebGLCubeRenderTarget?(Array.isArray(Yt[H])?V=Yt[H][q]:V=Yt[H],at=!0):D.samples>0&&ee.useMultisampledRTT(D)===!1?V=Rt.get(D).__webglMultisampledFramebuffer:Array.isArray(Yt)?V=Yt[q]:V=Yt,A.copy(D.viewport),P.copy(D.scissor),N=D.scissorTest}else A.copy(Mt).multiplyScalar(G).floor(),P.copy(Ut).multiplyScalar(G).floor(),N=zt;if(q!==0&&(V=_m),At.bindFramebuffer(O.FRAMEBUFFER,V)&&$&&At.drawBuffers(D,V),At.viewport(A),At.scissor(P),At.setScissorTest(N),at){const bt=Rt.get(D.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+H,bt.__webglTexture,q)}else if(_t){const bt=H;for(let Gt=0;Gt<D.textures.length;Gt++){const Yt=Rt.get(D.textures[Gt]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Gt,Yt.__webglTexture,q,bt)}}else if(D!==null&&q!==0){const bt=Rt.get(D.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,bt.__webglTexture,q)}x=-1},this.readRenderTargetPixels=function(D,H,q,$,V,at,_t,Et=0){if(!(D&&D.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let bt=Rt.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&_t!==void 0&&(bt=bt[_t]),bt){At.bindFramebuffer(O.FRAMEBUFFER,bt);try{const Gt=D.textures[Et],Yt=Gt.format,Nt=Gt.type;if(!Xt.textureFormatReadable(Yt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Xt.textureTypeReadable(Nt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=D.width-$&&q>=0&&q<=D.height-V&&(D.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Et),O.readPixels(H,q,$,V,Dt.convert(Yt),Dt.convert(Nt),at))}finally{const Gt=L!==null?Rt.get(L).__webglFramebuffer:null;At.bindFramebuffer(O.FRAMEBUFFER,Gt)}}},this.readRenderTargetPixelsAsync=async function(D,H,q,$,V,at,_t,Et=0){if(!(D&&D.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let bt=Rt.get(D).__webglFramebuffer;if(D.isWebGLCubeRenderTarget&&_t!==void 0&&(bt=bt[_t]),bt)if(H>=0&&H<=D.width-$&&q>=0&&q<=D.height-V){At.bindFramebuffer(O.FRAMEBUFFER,bt);const Gt=D.textures[Et],Yt=Gt.format,Nt=Gt.type;if(!Xt.textureFormatReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Xt.textureTypeReadable(Nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ae=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,ae),O.bufferData(O.PIXEL_PACK_BUFFER,at.byteLength,O.STREAM_READ),D.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+Et),O.readPixels(H,q,$,V,Dt.convert(Yt),Dt.convert(Nt),0);const be=L!==null?Rt.get(L).__webglFramebuffer:null;At.bindFramebuffer(O.FRAMEBUFFER,be);const Oe=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await zg(O,Oe,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,ae),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,at),O.deleteBuffer(ae),O.deleteSync(Oe),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(D,H=null,q=0){const $=Math.pow(2,-q),V=Math.floor(D.image.width*$),at=Math.floor(D.image.height*$),_t=H!==null?H.x:0,Et=H!==null?H.y:0;ee.setTexture2D(D,0),O.copyTexSubImage2D(O.TEXTURE_2D,q,0,0,_t,Et,V,at),At.unbindTexture()};const vm=O.createFramebuffer(),xm=O.createFramebuffer();this.copyTextureToTexture=function(D,H,q=null,$=null,V=0,at=null){at===null&&(V!==0?(Ro("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),at=V,V=0):at=0);let _t,Et,bt,Gt,Yt,Nt,ae,be,Oe;const Le=D.isCompressedTexture?D.mipmaps[at]:D.image;if(q!==null)_t=q.max.x-q.min.x,Et=q.max.y-q.min.y,bt=q.isBox3?q.max.z-q.min.z:1,Gt=q.min.x,Yt=q.min.y,Nt=q.isBox3?q.min.z:0;else{const qn=Math.pow(2,-V);_t=Math.floor(Le.width*qn),Et=Math.floor(Le.height*qn),D.isDataArrayTexture?bt=Le.depth:D.isData3DTexture?bt=Math.floor(Le.depth*qn):bt=1,Gt=0,Yt=0,Nt=0}$!==null?(ae=$.x,be=$.y,Oe=$.z):(ae=0,be=0,Oe=0);const Te=Dt.convert(H.format),Ot=Dt.convert(H.type);let Ie;H.isData3DTexture?(ee.setTexture3D(H,0),Ie=O.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(ee.setTexture2DArray(H,0),Ie=O.TEXTURE_2D_ARRAY):(ee.setTexture2D(H,0),Ie=O.TEXTURE_2D),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,H.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,H.unpackAlignment);const pe=O.getParameter(O.UNPACK_ROW_LENGTH),kn=O.getParameter(O.UNPACK_IMAGE_HEIGHT),Qs=O.getParameter(O.UNPACK_SKIP_PIXELS),On=O.getParameter(O.UNPACK_SKIP_ROWS),io=O.getParameter(O.UNPACK_SKIP_IMAGES);O.pixelStorei(O.UNPACK_ROW_LENGTH,Le.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Le.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Gt),O.pixelStorei(O.UNPACK_SKIP_ROWS,Yt),O.pixelStorei(O.UNPACK_SKIP_IMAGES,Nt);const Ne=D.isDataArrayTexture||D.isData3DTexture,Kn=H.isDataArrayTexture||H.isData3DTexture;if(D.isDepthTexture){const qn=Rt.get(D),En=Rt.get(H),Dn=Rt.get(qn.__renderTarget),Rc=Rt.get(En.__renderTarget);At.bindFramebuffer(O.READ_FRAMEBUFFER,Dn.__webglFramebuffer),At.bindFramebuffer(O.DRAW_FRAMEBUFFER,Rc.__webglFramebuffer);for(let Ls=0;Ls<bt;Ls++)Ne&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Rt.get(D).__webglTexture,V,Nt+Ls),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Rt.get(H).__webglTexture,at,Oe+Ls)),O.blitFramebuffer(Gt,Yt,_t,Et,ae,be,_t,Et,O.DEPTH_BUFFER_BIT,O.NEAREST);At.bindFramebuffer(O.READ_FRAMEBUFFER,null),At.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(V!==0||D.isRenderTargetTexture||Rt.has(D)){const qn=Rt.get(D),En=Rt.get(H);At.bindFramebuffer(O.READ_FRAMEBUFFER,vm),At.bindFramebuffer(O.DRAW_FRAMEBUFFER,xm);for(let Dn=0;Dn<bt;Dn++)Ne?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,qn.__webglTexture,V,Nt+Dn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,qn.__webglTexture,V),Kn?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,En.__webglTexture,at,Oe+Dn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,En.__webglTexture,at),V!==0?O.blitFramebuffer(Gt,Yt,_t,Et,ae,be,_t,Et,O.COLOR_BUFFER_BIT,O.NEAREST):Kn?O.copyTexSubImage3D(Ie,at,ae,be,Oe+Dn,Gt,Yt,_t,Et):O.copyTexSubImage2D(Ie,at,ae,be,Gt,Yt,_t,Et);At.bindFramebuffer(O.READ_FRAMEBUFFER,null),At.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Kn?D.isDataTexture||D.isData3DTexture?O.texSubImage3D(Ie,at,ae,be,Oe,_t,Et,bt,Te,Ot,Le.data):H.isCompressedArrayTexture?O.compressedTexSubImage3D(Ie,at,ae,be,Oe,_t,Et,bt,Te,Le.data):O.texSubImage3D(Ie,at,ae,be,Oe,_t,Et,bt,Te,Ot,Le):D.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,at,ae,be,_t,Et,Te,Ot,Le.data):D.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,at,ae,be,Le.width,Le.height,Te,Le.data):O.texSubImage2D(O.TEXTURE_2D,at,ae,be,_t,Et,Te,Ot,Le);O.pixelStorei(O.UNPACK_ROW_LENGTH,pe),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,kn),O.pixelStorei(O.UNPACK_SKIP_PIXELS,Qs),O.pixelStorei(O.UNPACK_SKIP_ROWS,On),O.pixelStorei(O.UNPACK_SKIP_IMAGES,io),at===0&&H.generateMipmaps&&O.generateMipmap(Ie),At.unbindTexture()},this.initRenderTarget=function(D){Rt.get(D).__webglFramebuffer===void 0&&ee.setupRenderTarget(D)},this.initTexture=function(D){D.isCubeTexture?ee.setTextureCube(D,0):D.isData3DTexture?ee.setTexture3D(D,0):D.isDataArrayTexture||D.isCompressedArrayTexture?ee.setTexture2DArray(D,0):ee.setTexture2D(D,0),At.unbindTexture()},this.resetState=function(){T=0,S=0,L=null,At.reset(),gt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=me._getDrawingBufferColorSpace(t),e.unpackColorSpace=me._getUnpackColorSpace()}}const zi=9,Cr=36,ul=4,Fe=(i,t=1,e=0)=>e?{id:i,count:t,dmg:e}:{id:i,count:t},Lr=i=>Array.from({length:i},()=>null);function c0(i,t){return i.id===t.id&&(i.dmg??0)===(t.dmg??0)&&ps(i.id)>1}function hy(i){var a;if(!i||typeof i!="object")return null;const{id:t,count:e,dmg:n}=i;if(!Ym(t)||!Number.isInteger(e)||e<=0)return null;const s=ps(t),r=((a=ge(t))==null?void 0:a.durability)??0,o=Number.isInteger(n)?Math.max(0,Math.min(r,n)):0;return Fe(t,Math.min(s,e),o)}function id(i,t){const e=Lr(t);if(Array.isArray(i))for(let n=0;n<t;n++)e[n]=hy(i[n]);return e}const uy=Array.from({length:Cr},(i,t)=>t);function fi(i,t,e=uy){let n=t.count;const s=ps(t.id);for(const r of e){const o=i[r];if(n<=0)break;if(o&&c0(o,t)&&o.count<s){const a=Math.min(n,s-o.count);o.count+=a,n-=a}}for(const r of e){if(n<=0)break;if(!i[r]){const o=Math.min(n,s);i[r]={...t,count:o},n-=o}}return n}function sd(i,t=1){var s;const e=(s=ge(i.id))==null?void 0:s.durability;if(!e)return i;const n=(i.dmg??0)+t;return n>=e?null:{...i,dmg:n}}function fy(i,t){const e=Ze[Kt(i)];return e.harvestLevel<0?!0:!!(t!=null&&t.tool)&&t.tool.type===e.tool&&t.tool.level>=e.harvestLevel}function dy(i,t,e=!1,n=!0){var c;const s=Ze[Kt(i)];if(s.hardness<0)return 1/0;if(s.hardness===0)return 0;const r=t===null?void 0:ge(t);let o=1;r!=null&&r.tool&&s.tool===r.tool.type&&(o=r.tool.speed),((c=r==null?void 0:r.tool)==null?void 0:c.type)==="sword"&&s.tool==="shears"&&(o=1.5);let a=o/s.hardness/(fy(i,r)?30:100);return e&&(a/=5),n||(a/=5),a>=1?0:Math.ceil(1/a)/20}const py=[0,0,0,1,1,1],tt=i=>i/16;function Yn(i,t){let[e,n,s,r,o,a]=i;for(let c=0;c<(t&3);c++){const l=1-a,h=1-s;s=e,a=r,e=l,r=h}return[e,n,s,r,o,a]}function my(i){const t=tt(3),e=(i&4)!==0,n=[0,0,1-t,1,1,1];return[Yn(e?[0,0,0,t,1,1]:n,i&3)]}function gy(i){const t=(i&4)!==0;return[t?[0,.5,0,1,1,1]:[0,0,0,1,.5,1],Yn(t?[0,0,0,1,.5,.5]:[0,.5,0,1,1,.5],i&3)]}const _y=i=>{const t=Kt(i);return t===C.OAK_FENCE||t===C.OAK_FENCE_GATE||un[t]===1&&pn[t]===fc},vy=i=>{const t=Kt(i);return t===C.GLASS_PANE||t===C.GLASS||un[t]===1&&pn[t]===fc};function xy(i){const t=[tt(7),0,tt(7),tt(9),1,tt(9)],e=[];for(let n=0;n<4;n++){const[s,,r]=ko[n];i&&vy(i(s,0,r))&&e.push(Yn([tt(7),0,0,tt(9),1,tt(7)],n))}if(!e.length)for(let n=0;n<4;n++)e.push(Yn([tt(7),0,0,tt(9),1,tt(7)],n));return[t,...e]}function My(i){const t=tt(3);return i&4?[Yn([0,0,0,1,1,t],i&3)]:[i&8?[0,1-t,0,1,1,1]:[0,0,0,1,t,1]]}function l0(i,t){const e=(i&4)!==0;let n;if(t){if(e)return[];n=[[0,0,tt(6),1,1.5,tt(10)]]}else e?n=[[0,tt(5),tt(7),tt(2),1,tt(9)],[tt(14),tt(5),tt(7),1,1,tt(9)],[0,tt(6),tt(9),tt(2),tt(9),tt(15)],[0,tt(12),tt(9),tt(2),tt(15),tt(15)],[tt(14),tt(6),tt(9),1,tt(9),tt(15)],[tt(14),tt(12),tt(9),1,tt(15),tt(15)]]:n=[[0,tt(5),tt(7),tt(2),1,tt(9)],[tt(14),tt(5),tt(7),1,1,tt(9)],[tt(2),tt(6),tt(7),tt(14),tt(9),tt(9)],[tt(2),tt(12),tt(7),tt(14),tt(15),tt(9)],[tt(6),tt(9),tt(7),tt(8),tt(12),tt(9)],[tt(8),tt(9),tt(7),tt(10),tt(12),tt(9)]];return i&1?n.map(s=>Yn(s,1)):n}function h0(i,t,e){const s=[[tt(6),0,tt(6),tt(10),t,tt(10)]];if(!i)return s;for(let r=0;r<4;r++){const[o,,a]=ko[r];_y(i(o,0,a))&&(e?s.push(Yn([tt(6),0,0,tt(10),t,tt(6)],r)):(s.push(Yn([tt(7),tt(12),0,tt(9),tt(15),tt(6)],r)),s.push(Yn([tt(7),tt(6),0,tt(9),tt(9),tt(6)],r))))}return s}function yu(i,t){const e=Kt(i),n=bs(i);switch(pn[e]){case xo:return[n&1?[0,.5,0,1,1,1]:[0,0,0,1,.5,1]];case mp:return gy(n);case Qh:return my(n);case $r:return[Yn([0,0,0,1,1,tt(1)],n&3)];case tu:return h0(t,1,!1);case eu:return[[0,0,0,1,tt(9),1]];case gp:return[[0,0,0,1,tt(15),1]];case _p:return[[tt(1),0,tt(1),tt(15),1,tt(15)]];case Gl:return[[tt(1),0,tt(1),tt(15),tt(14),tt(15)]];case vp:return xy(t);case nu:return My(n);case dc:return l0(n,!1);case fc:return[py];default:return[]}}function yy(i,t){const e=Kt(i),n=pn[e];if(e===C.AIR)return[];switch(n){case Xr:case Yr:case Bo:case Kr:case qr:return[];case $r:return[Yn([0,0,0,1,1,tt(3)],bs(i)&3)];case tu:return h0(t,1.5,!0);case dc:return l0(bs(i),!0);default:return yu(i,t)}}function Fh(i,t){const e=Kt(i),n=bs(i);switch(pn[e]){case Xr:case Kr:return[];case Yr:return[[tt(2),0,tt(2),tt(14),tt(13),tt(14)]];case Bo:return[[0,0,0,1,tt(2+2*Math.min(7,n&7)),1]];case qr:return n===0?[[tt(6),0,tt(6),tt(10),tt(10),tt(10)]]:[Yn([tt(5.5),tt(3),0,tt(10.5),tt(13),tt(5)],n-1&3)];case $r:return[Yn([0,0,0,1,1,tt(3)],n&3)];default:return yu(i,t)}}const xr=1e-7;function u0(i,t,e,n,s,r,o){const a=[],c=Math.floor(t),l=Math.floor(s),h=Math.floor(e)-1,u=Math.floor(r),f=Math.floor(n),d=Math.floor(o);for(let m=h;m<=u;m++)for(let _=f;_<=d;_++)for(let g=c;g<=l;g++){const p=i.getState(g,m,_),M=Kt(p);if(M===C.AIR||pn[M]===Xr||!Ze[M].solid)continue;const b=yy(p,(v,E,T)=>i.getState(g+v,m+E,_+T));for(const v of b)a.push(g+v[0],m+v[1],_+v[2],g+v[3],m+v[4],_+v[5])}return a}function hs(i,t,e,n){if(n===0)return 0;const s=(e+1)%3,r=(e+2)%3;for(let o=0;o<i.length;o+=6)i[o+s+3]<=t[s]+xr||i[o+s]>=t[s+3]-xr||i[o+r+3]<=t[r]+xr||i[o+r]>=t[r+3]-xr||(n>0&&t[e+3]<=i[o+e]+xr?n=Math.min(n,i[o+e]-t[e+3]):n<0&&t[e]>=i[o+e+3]-xr&&(n=Math.max(n,i[o+e+3]-t[e])));return n}const Oi=(i,t,e)=>{i[t]+=e,i[t+3]+=e};function f0(i){const t=i.width/2;return[i.x-t,i.y,i.z-t,i.x+t,i.y+i.height,i.z+t]}function by(i,t,e,n,s,r=0){const o=f0(t),a=Math.max(r,0)+.01,c=u0(i,Math.min(o[0],o[0]+e)-.01,Math.min(o[1],o[1]+n)-.01,Math.min(o[2],o[2]+s)-.01,Math.max(o[3],o[3]+e)+.01,Math.max(o[4],o[4]+n)+a,Math.max(o[5],o[5]+s)+.01),l=[...o],h=hs(c,l,1,n);Oi(l,1,h);const u=hs(c,l,0,e);Oi(l,0,u);const f=hs(c,l,2,s);Oi(l,2,f);const d=n<0&&h!==n,m=u!==e||f!==s;if(r>0&&m&&(t.onGround||d)){const _=[...o],g=hs(c,_,1,r);Oi(_,1,g);const p=hs(c,_,0,e);Oi(_,0,p);const M=hs(c,_,2,s);Oi(_,2,M);const b=hs(c,_,1,-g+(n<0?n:0));if(Oi(_,1,b),p*p+M*M>u*u+f*f+1e-6){l.splice(0,6,..._),t.x=(l[0]+l[3])/2,t.y=l[1],t.z=(l[2]+l[5])/2,t.onGround=!0,t.collidedH=p!==e||M!==s,p!==e&&(t.vx=0),M!==s&&(t.vz=0),t.vy=0;return}}t.x=(l[0]+l[3])/2,t.y=l[1],t.z=(l[2]+l[5])/2,t.onGround=d,t.collidedH=m,h!==n&&(t.vy=0),u!==e&&(t.vx=0),f!==s&&(t.vz=0)}function fl(i,t,e,n){const s=f0(t);Oi(s,0,e),Oi(s,2,n);const r=u0(i,s[0],s[1]-1,s[2],s[3],s[1],s[5]);return hs(r,s,1,-1)>-1+1e-4}function Sy(i,t,e,n){for(;e!==0&&!fl(i,t,e,0);)e=Math.abs(e)<.05?0:e-Math.sign(e)*.05;for(;n!==0&&!fl(i,t,0,n);)n=Math.abs(n)<.05?0:n-Math.sign(n)*.05;for(;e!==0&&n!==0&&!fl(i,t,e,n);)e=Math.abs(e)<.05?0:e-Math.sign(e)*.05,n=Math.abs(n)<.05?0:n-Math.sign(n)*.05;return[e,n]}function Ey(i,t,e){const n=t.width/2-.001,s={inWater:!1,inLava:!1,eyeInWater:!1,onLadder:!1},r=Math.floor(t.y),o=Math.floor(t.y+t.height-.01);for(let l=r;l<=o;l++)for(let h=Math.floor(t.z-n);h<=Math.floor(t.z+n);h++)for(let u=Math.floor(t.x-n);u<=Math.floor(t.x+n);u++){const f=i.getState(u,l,h),d=Kt(f);if(d===C.WATER||d===C.LAVA){const m=l+$a(f);t.y+.1<m&&(d===C.WATER?s.inWater=!0:s.inLava=!0)}else Ze[d].climbable&&(s.onLadder=!0)}const a=t.y+e,c=i.getState(Math.floor(t.x),Math.floor(a),Math.floor(t.z));return Kt(c)===C.WATER&&a<Math.floor(a)+$a(c)+.05&&(s.eyeInWater=!0),s}function rd(i,t,e,n){const s=i.width/2;return i.x+s>t&&i.x-s<t+1&&i.y+i.height>e&&i.y<e+1&&i.z+s>n&&i.z-s<n+1}const d0=Math.sqrt(3),wy=.5*(d0-1),mo=(3-d0)/6,Ty=1/3,xi=1/6,Mo=i=>Math.floor(i)|0,od=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]),dl=new Float64Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);function us(i=Math.random){const t=p0(i),e=new Float64Array(t).map(s=>od[s%12*2]),n=new Float64Array(t).map(s=>od[s%12*2+1]);return function(r,o){let a=0,c=0,l=0;const h=(r+o)*wy,u=Mo(r+h),f=Mo(o+h),d=(u+f)*mo,m=u-d,_=f-d,g=r-m,p=o-_;let M,b;g>p?(M=1,b=0):(M=0,b=1);const v=g-M+mo,E=p-b+mo,T=g-1+2*mo,S=p-1+2*mo,L=u&255,x=f&255;let y=.5-g*g-p*p;if(y>=0){const N=L+t[x],z=e[N],X=n[N];y*=y,a=y*y*(z*g+X*p)}let A=.5-v*v-E*E;if(A>=0){const N=L+M+t[x+b],z=e[N],X=n[N];A*=A,c=A*A*(z*v+X*E)}let P=.5-T*T-S*S;if(P>=0){const N=L+1+t[x+1],z=e[N],X=n[N];P*=P,l=P*P*(z*T+X*S)}return 70*(a+c+l)}}function pl(i=Math.random){const t=p0(i),e=new Float64Array(t).map(r=>dl[r%12*3]),n=new Float64Array(t).map(r=>dl[r%12*3+1]),s=new Float64Array(t).map(r=>dl[r%12*3+2]);return function(o,a,c){let l,h,u,f;const d=(o+a+c)*Ty,m=Mo(o+d),_=Mo(a+d),g=Mo(c+d),p=(m+_+g)*xi,M=m-p,b=_-p,v=g-p,E=o-M,T=a-b,S=c-v;let L,x,y,A,P,N;E>=T?T>=S?(L=1,x=0,y=0,A=1,P=1,N=0):E>=S?(L=1,x=0,y=0,A=1,P=0,N=1):(L=0,x=0,y=1,A=1,P=0,N=1):T<S?(L=0,x=0,y=1,A=0,P=1,N=1):E<S?(L=0,x=1,y=0,A=0,P=1,N=1):(L=0,x=1,y=0,A=1,P=1,N=0);const z=E-L+xi,X=T-x+xi,W=S-y+xi,K=E-A+2*xi,G=T-P+2*xi,Z=S-N+2*xi,rt=E-1+3*xi,Mt=T-1+3*xi,Ut=S-1+3*xi,zt=m&255,te=_&255,re=g&255;let Q=.6-E*E-T*T-S*S;if(Q<0)l=0;else{const vt=zt+t[te+t[re]];Q*=Q,l=Q*Q*(e[vt]*E+n[vt]*T+s[vt]*S)}let nt=.6-z*z-X*X-W*W;if(nt<0)h=0;else{const vt=zt+L+t[te+x+t[re+y]];nt*=nt,h=nt*nt*(e[vt]*z+n[vt]*X+s[vt]*W)}let mt=.6-K*K-G*G-Z*Z;if(mt<0)u=0;else{const vt=zt+A+t[te+P+t[re+N]];mt*=mt,u=mt*mt*(e[vt]*K+n[vt]*G+s[vt]*Z)}let kt=.6-rt*rt-Mt*Mt-Ut*Ut;if(kt<0)f=0;else{const vt=zt+1+t[te+1+t[re+1]];kt*=kt,f=kt*kt*(e[vt]*rt+n[vt]*Mt+s[vt]*Ut)}return 32*(l+h+u+f)}}function p0(i){const e=new Uint8Array(512);for(let n=0;n<512/2;n++)e[n]=n;for(let n=0;n<512/2-1;n++){const s=n+~~(i()*(256-n)),r=e[n];e[n]=e[s],e[s]=r}for(let n=256;n<512;n++)e[n]=e[n-256];return e}function Ho(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function $e(i,t,e,n){let s=n|0;return s=s+Math.imul(i|0,668265261)|0,s=s+Math.imul(t|0,374761393)|0,s=s+Math.imul(e|0,1013904242)|0,s=Math.imul(s^s>>>15,2246822507),s=Math.imul(s^s>>>13,3266489909),s^=s>>>16,(s>>>0)/4294967296}const ve={PLAINS:0,FOREST:1,DESERT:2,SNOWY:3,MOUNTAINS:4,BEACH:5,OCEAN:6},ss=5,Ay=Tn+38,Wa=Tn+50,Ry=10;function Mr(i,t,e,n){let s=0,r=1,o=1,a=0;for(let c=0;c<n;c++)s+=i(t*o,e*o)*r,a+=r,r*=.5,o*=2;return s/a}function Cy(i,t,e){const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)}class Ly{constructor(t){w(this,"seed");w(this,"continent");w(this,"hills");w(this,"detail");w(this,"mountain");w(this,"ridge");w(this,"temperature");w(this,"moisture");w(this,"cave1");w(this,"cave2");w(this,"cavern");this.seed=t|0;let e=0;const n=()=>Ho(this.seed+2654435769*++e);this.continent=us(n()),this.hills=us(n()),this.detail=us(n()),this.mountain=us(n()),this.ridge=us(n()),this.temperature=us(n()),this.moisture=us(n()),this.cave1=pl(n()),this.cave2=pl(n()),this.cavern=pl(n())}column(t,e){const n=Mr(this.continent,t/700,e/700,4),s=Mr(this.hills,t/120,e/120,4),r=this.detail(t/30,e/30),o=Cy(.15,.55,Mr(this.mountain,t/420,e/420,3)),a=1-Math.abs(Mr(this.ridge,t/160,e/160,4)),c=Tn+4+n*24+s*8+r*2+o*a*a*60,l=Math.max(4,Math.min(Ae-14,Math.floor(c))),h=Mr(this.temperature,t/520,e/520,2),u=Mr(this.moisture,t/460,e/460,2);let f;return l<Tn-1?f=h<-.3?ve.SNOWY:ve.OCEAN:l>=Ay?f=ve.MOUNTAINS:l<=Tn+1?f=h<-.3?ve.SNOWY:ve.BEACH:h>.25&&u<.1?f=ve.DESERT:h<-.3?f=ve.SNOWY:u>.12?f=ve.FOREST:f=ve.PLAINS,{height:l,biome:f}}isCave(t,e,n){const s=this.cave1(t*.045,e*.07,n*.045),r=this.cave2(t*.045,e*.07,n*.045);return s*s+r*r<.016?!0:e<40&&this.cavern(t*.02,e*.035,n*.02)>.7}ore(t,e,n){const s=$e(t>>1,e>>1,n>>1,this.seed+101);let r=C.STONE;return s<.004?r=e<16?C.DIAMOND_ORE:C.STONE:s<.01?r=e<32?C.GOLD_ORE:C.STONE:s<.035?r=e<64?C.IRON_ORE:C.STONE:s<.065?r=C.COAL_ORE:s<.075&&e<60&&(r=C.GRAVEL),r===C.STONE||$e(t,e,n,this.seed+102)<.55?r:C.STONE}generateChunk(t,e){const n=new Uint16Array(Lm),s=t*Bt,r=e*Bt;for(let o=0;o<Bt;o++)for(let a=0;a<Bt;a++){const c=s+a,l=r+o,{height:h,biome:u}=this.column(c,l),f=$e(c,0,l,this.seed+7),d=3+Math.floor(f*2);let m=C.GRASS,_=C.DIRT,g=C.STONE;switch(u){case ve.DESERT:m=C.SAND,_=C.SAND,g=C.SANDSTONE;break;case ve.SNOWY:m=h<Tn?C.DIRT:h<=Tn+1?C.SAND:C.SNOWY_GRASS,_=m===C.SAND?C.SAND:C.DIRT;break;case ve.BEACH:m=C.SAND,_=C.SAND,g=C.SANDSTONE;break;case ve.OCEAN:m=h>=Tn-6?C.SAND:this.detail(c/12,l/12)>0?C.GRAVEL:C.DIRT,_=m===C.GRAVEL?C.GRAVEL:m===C.DIRT?C.DIRT:C.SAND;break;case ve.MOUNTAINS:m=h>=Wa?C.SNOW_BLOCK:f<.5&&h<Wa-6?C.GRASS:C.STONE,_=m===C.GRASS?C.DIRT:C.STONE;break}const p=u===ve.SNOWY;for(let v=0;v<=Math.max(h,Tn);v++){let E;v===0||v<=3&&$e(c,v,l,this.seed+3)<.8-v*.2?E=C.BEDROCK:v>h?E=p&&v===Tn?C.ICE:C.WATER:v===h?E=m:v>h-d?E=_:v>h-d-3&&g!==C.STONE?E=g:v<h-5&&this.isCave(c,v,l)?E=v<=Ry?C.LAVA:C.AIR:E=this.ore(c,v,l),n[Hn(a,v,o)]=E}const M=h+1;if(M<=Tn||M>=Ae-4)continue;const b=$e(c,1,l,this.seed+9);if(h===Tn&&!p&&(m===C.GRASS||m===C.SAND||m===C.DIRT)&&$e(c,5,l,this.seed+9)<.1&&[[1,0],[-1,0],[0,1],[0,-1]].some(([E,T])=>this.column(c+E,l+T).height<Tn)){const E=1+Math.floor($e(c,6,l,this.seed+9)*3);for(let T=0;T<E;T++)n[Hn(a,M+T,o)]=C.SUGAR_CANE;continue}if(m===C.GRASS&&u===ve.PLAINS&&$e(c>>3,7,l>>3,this.seed+21)<.03&&$e(c,8,l,this.seed+21)<.12){n[Hn(a,M,o)]=ei(C.PUMPKIN,Math.floor($e(c,9,l,this.seed+21)*4));continue}if(m===C.GRASS){const v=u===ve.PLAINS?.22:.1;b<v?n[Hn(a,M,o)]=C.TALL_GRASS:b<v+.012?n[Hn(a,M,o)]=C.DANDELION:b<v+.022&&(n[Hn(a,M,o)]=C.POPPY)}else if(u===ve.DESERT)if(b<.005){const v=1+Math.floor($e(c,2,l,this.seed+9)*3);for(let E=0;E<v;E++)n[Hn(a,M+E,o)]=C.CACTUS}else b<.012&&(n[Hn(a,M,o)]=C.DEAD_BUSH)}return this.placeTrees(n,t,e),n}placeTrees(t,e,n){const r=e*Bt-3,o=e*Bt+Bt-1+3,a=n*Bt-3,c=n*Bt+Bt-1+3;for(let l=Math.floor(a/ss);l<=Math.floor(c/ss);l++)for(let h=Math.floor(r/ss);h<=Math.floor(o/ss);h++){const u=h*ss+Math.floor($e(h,1,l,this.seed+12)*ss),f=l*ss+Math.floor($e(h,2,l,this.seed+12)*ss);if(u<r||u>o||f<a||f>c)continue;const{height:d,biome:m}=this.column(u,f);if(d<=Tn+1)continue;let _=0;if(m===ve.FOREST?_=.8:m===ve.PLAINS?_=.07:m===ve.SNOWY?_=.35:m===ve.MOUNTAINS&&d<Wa-6&&(_=.08),$e(h,0,l,this.seed+11)>=_||d+12>=Ae||m===ve.MOUNTAINS&&$e(u,0,f,this.seed+7)>=.5)continue;const g=$e(h,3,l,this.seed+12),p=m===ve.SNOWY||m===ve.MOUNTAINS?"spruce":m===ve.FOREST&&g<.3?"birch":"oak",M=$e(h,4,l,this.seed+12);Ny(p,M,(b,v,E,T,S)=>Iy(t,e,n,b,v,E,T,S),u,d+1,f)}}findSpawn(){for(let t=0;t<600;t+=4){const e=Math.max(1,Math.floor(2*Math.PI*t/8));for(let n=0;n<e;n++){const s=n/e*Math.PI*2,r=Math.round(Math.cos(s)*t),o=Math.round(Math.sin(s)*t),{height:a,biome:c}=this.column(r,o);if(a>Tn+1&&c!==ve.MOUNTAINS)return[r+.5,a+1,o+.5]}}return[.5,this.column(0,0).height+1,.5]}}function Dy(i,t){const e=Kt(i);return e===C.WATER||e===C.LAVA?!1:Ar[e]===1||e===C.DANDELION||e===C.POPPY||e===C.OAK_SAPLING||e===C.BIRCH_SAPLING||e===C.SPRUCE_SAPLING||t&&(e===C.OAK_LEAVES||e===C.BIRCH_LEAVES||e===C.SPRUCE_LEAVES)}function Py(i,t,e){return t===C.DIRT?Kt(i)===C.GRASS||Kt(i)===C.SNOWY_GRASS:Dy(i,e)}function Iy(i,t,e,n,s,r,o,a){const c=n-t*Bt,l=r-e*Bt;if(c<0||c>=Bt||l<0||l>=Bt||s<0||s>=Ae)return;const h=Hn(c,s,l);Py(i[h],o,a)&&(i[h]=o)}function Ny(i,t,e,n,s,r){const o=Ho(Math.floor(t*1e9)^Math.imul(n,73856093)^Math.imul(r,19349663));if(i==="spruce"){const u=6+Math.floor(t*4),f=[0,1,1,2,1,2,3,2,3,2];for(let d=0;d<Math.min(f.length,u-1);d++){const m=s+u-d,_=f[d];for(let g=-_;g<=_;g++)for(let p=-_;p<=_;p++)Math.abs(p)+Math.abs(g)>_+(_>1?1:0)||e(n+p,m,r+g,C.SPRUCE_LEAVES,!1)}for(let d=0;d<u;d++)e(n,s+d,r,C.SPRUCE_LOG,!0);e(n,s-1,r,C.DIRT,!0);return}const a=i==="birch",c=(a?5:4)+Math.floor(t*3),l=a?C.BIRCH_LOG:C.OAK_LOG,h=a?C.BIRCH_LEAVES:C.OAK_LEAVES;for(let u=c-3;u<=c;u++){const f=u>=c-1?1:2;for(let d=-f;d<=f;d++)for(let m=-f;m<=f;m++)Math.abs(m)===f&&Math.abs(d)===f&&(u===c||o()<.5)||e(n+m,s+u,r+d,h,!1)}for(let u=0;u<c;u++)e(n,s+u,r,l,!0);e(n,s-1,r,C.DIRT,!0)}const Uy=32,ky=8,ml=2,gl=32,Bh=48e3,ad=700,Oy=.6,Fy=.32,By=.24,mi=Math.PI*2;function m0(i){let t=i>>>0;return()=>{t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function zy(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619);return t>>>0}const Nn=(i,t,e)=>i<t?t:i>e?e:i,rs=(i,t)=>typeof i=="number"&&Number.isFinite(i)?i:t,Ea=i=>typeof i=="number"&&Number.isFinite(i),bu=i=>440*Math.pow(2,(i-69)/12);class Su{constructor(t,e){w(this,"r");this.sr=t,this.r=m0(e)}u(t,e){return t+(e-t)*this.r()}sign(){return this.r()<.5?-1:1}pick(t){return t[Math.floor(this.r()*t.length)]}buf(t){return new Float32Array(Math.max(1,Math.round(t*this.sr)))}white(t){const e=this.buf(t);for(let n=0;n<e.length;n++)e[n]=this.r()*2-1;return e}pink(t){const e=this.buf(t);let n=0,s=0,r=0;for(let o=0;o<e.length;o++){const a=this.r()*2-1;n=.99765*n+a*.099046,s=.963*s+a*.2965164,r=.57*r+a*1.0526913,e[o]=(n+s+r+a*.1848)*.25}return e}brown(t){const e=this.buf(t);let n=0;for(let s=0;s<e.length;s++)n=(n+.02*(this.r()*2-1))/1.02,e[s]=n*3.5;return e}mix(t,e,n=0,s=1){const r=Math.round(n*this.sr),o=Math.min(e.length,t.length-r);for(let a=Math.max(0,-r);a<o;a++)t[r+a]+=e[a]*s;return t}}function Me(i,t,e,n,s=.707){const r=1/s,o=t*.45;let a=0,c=0,l=0;const h=p=>{const M=Math.tan(Math.PI*Nn(p,10,o)/t);a=1/(1+M*(M+r)),c=M*a,l=M*c},u=typeof n=="function"?n:null;typeof n=="number"&&h(n);const f=e==="hp"||e==="notch"?1:0,d=e==="lp"?0:e==="bp"?r:-r,m=e==="lp"?1:e==="hp"?-1:0;let _=0,g=0;for(let p=0;p<i.length;p++){u&&(p&15)===0&&h(u(p/t));const M=i[p],b=M-g,v=a*_+c*b,E=g+c*_+l*b;_=2*v-_,g=2*E-g,i[p]=f*M+d*v+m*E}return i}function oe(i,t,e){let n=e(0);for(let s=0;s<i.length;s+=4){const r=e((s+4)/t),o=Math.min(i.length,s+4);for(let a=s;a<o;a++)i[a]*=n+(r-n)*(a-s)*.25;n=r}return i}function As(i,t,e=.005){const n=Math.min(i.length,Math.round(e*t));for(let s=0;s<n;s++)i[i.length-1-s]*=.5-.5*Math.cos(Math.PI*s/n);return i}function ic(i){let t=0;for(let e=0;e<i.length;e++){const n=Math.abs(i[e]);n>t&&(t=n)}return t}function Ue(i,t=1){const e=ic(i);if(e>0)for(let n=0;n<i.length;n++)i[n]*=t/e;return i}const Zt=(i,t)=>e=>e<=0?0:e<i?e/i:Math.exp(-(e-i)/t),je=(i,t,e)=>n=>n<=0?0:n<i?n/i:n<i+t?1:Math.exp(-(n-i-t)/e),Gn=(i,t,e)=>n=>{if(n<=0||n>=t)return 0;const s=n<i?.5-.5*Math.cos(Math.PI*n/i):1,r=n>t-e?.5-.5*Math.cos(Math.PI*(t-n)/e):1;return s*r};function sc(i,t){return i<t?(i/=t,i+i-i*i-1):i>1-t?(i=(i-1)/t,i*i+i+i+1):0}function g0(i,t,e){let n=i<e?1:-1;return n+=sc(i,t),n-=sc((i+1-e)%1,t),n-(2*e-1)}function Dr(i,t,e,n="sine",s=.5){const r=i.sr,o=i.buf(t),a=typeof e=="function"?e:null;let c=Nn((typeof e=="number"?e:0)/r,0,.45),l=0;for(let h=0;h<o.length;h++)a&&(h&3)===0&&(c=Nn(a(h/r)/r,0,.45)),o[h]=n==="sine"?Math.sin(mi*l):n==="saw"?2*l-1-sc(l,c):g0(l,c,s),l+=c,l>=1&&(l-=1);return o}function yn(i,t,e,n,s,r){if(!(n>0)||n>=t*.47||s===0)return;const o=Math.max(0,Math.round(e*t)),a=mi*n/t,c=Math.exp(-1/(r*t)),l=2*c*Math.cos(a),h=c*c;let u=0,f=-s*Math.sin(a)/c;const d=Math.min(i.length,o+Math.ceil(r*t*9));for(let m=o;m<d;m++){i[m]+=u;const _=l*u-h*f;f=u,u=_}}function Gy(i,t,e,n=2){const s=i.sr,r=i.buf(t),o=typeof e=="function"?e:null;let a=(typeof e=="number"?e:0)/s;const c=Math.max(1,Math.round(8e-4*s));let l=0,h=0;for(let u=0;u<r.length;u++)o&&(u&15)===0&&(a=o(u/s)/s),l>0?(r[u]=h*(i.r()*2-1),l--):i.r()<a&&(l=Math.floor(i.r()*c),h=Math.pow(i.r(),n),r[u]=h*i.sign());return r}function Vn(i,t,e){const n=i.buf(t),s=i.sr/e;let r=i.r(),o=i.r(),a=0;for(let c=0;c<n.length;c++)a>=s&&(a-=s,r=o,o=i.r()),n[c]=r+(o-r)*(.5-.5*Math.cos(Math.PI*a/s)),a++;return n}function Hy(i,t,e,n,s){const r=i.buf(t),o=Math.max(2,Math.round(i.sr/e-.5)),a=new Float32Array(o);let c=0;for(let u=0;u<o;u++)c+=s*(i.r()*2-1-c),a[u]=c;let l=0,h=0;for(let u=0;u<r.length;u++){const f=a[l],d=n*.5*(f+h);h=f,a[l]=d,r[u]=d,l=l+1===o?0:l+1}return Ue(r)}function Pn(i,t,e){const n=i.sr,s=i.buf(t),r=typeof e.f0=="function"?e.f0:null,o=typeof e.f0=="number"?e.f0:0,a=e.q??[6,8,10],c=e.gains??[1,.6,.3],l=e.duty??0,h=e.vib??0,u=e.vibDepth??0,f=e.jitter??0,d=e.breath??0,m=e.growl??0,_=e.dry??0,g=[1/a[0],1/a[1],1/a[2]],p=[0,0,0],M=[0,0,0],b=[0,0,0],v=[0,0,0],E=[0,0,0],T=1-Math.exp(-mi*18*4/n),S=1/Math.sqrt(T/(2-T)),L=1-Math.exp(-mi*700/n);let x=i.r(),y=0,A=0,P=0,N=0;for(let z=0;z<s.length;z++){const X=z/n;if((z&31)===0){const G=e.formants(X);for(let Z=0;Z<3;Z++){const rt=Math.tan(Math.PI*Nn(G[Z],50,n*.45)/n);p[Z]=1/(1+rt*(rt+g[Z])),M[Z]=rt*p[Z],b[Z]=rt*M[Z]}}if((z&3)===0){A+=T*(i.r()*2-1-A);const G=(r?r(X):o)*(1+u*Math.sin(mi*h*X)+f*A*S);N=Nn(G/n,0,.45)}let W=l>0?g0(x,N,l):2*x-1-sc(x,N);m>0&&(W*=1-m*(.5+.5*Math.cos(Math.PI*(x+y)))),x+=N,x>=1&&(x-=1,y^=1),W+=d*(i.r()*2-1);let K=0;for(let G=0;G<3;G++){const Z=W-E[G],rt=p[G]*v[G]+M[G]*Z,Mt=E[G]+M[G]*v[G]+b[G]*Z;v[G]=2*rt-v[G],E[G]=2*Mt-E[G],K+=c[G]*g[G]*rt}_>0&&(P+=L*(W-P),K+=_*P),s[z]=K}return Ue(s)}function ui(i){return t=>{if(t<=i[0][0])return i[0][1];for(let e=1;e<i.length;e++){const[n,s]=i[e];if(t<=n){const[r,o]=i[e-1],a=(t-r)/(n-r||1);return[o[0]+(s[0]-o[0])*a,o[1]+(s[1]-o[1])*a,o[2]+(s[2]-o[2])*a]}}return i[i.length-1][1]}}const qe={a:[730,1090,2440],o:[570,840,2410],u:[300,870,2240],U:[440,1020,2240],uh:[640,1190,2390]};function Je(i,t,e,n){const s=i.white(n*8+.002);return Me(s,i.sr,"bp",t,e),Ue(As(oe(s,i.sr,Zt(4e-4,n)),i.sr,.001))}function he(i,t,e,...n){const s=i.white(t);for(const[r,o,a]of n)Me(s,i.sr,r,o,a);return Ue(As(oe(s,i.sr,e),i.sr))}function Qe(i,t,e,n,s,r,o=2){const a=Gy(i,t,e,o);return Me(a,i.sr,"bp",n,s),Ue(As(oe(a,i.sr,r),i.sr))}function jn(i,t,e,n){const s=Dr(i,n*7,r=>e+(t-e)*Math.exp(-r/(n*.5)));return Ue(As(oe(s,i.sr,Zt(.002,n)),i.sr))}function fs(i,t,e,n,s,r,o=1){const a=[1,i.u(1.9,2.2),i.u(3.1,3.6),i.u(4.8,5.6)],c=[1,.55*o,.32*o,.16*o],l=[1,.6,.38,.24];for(let h=0;h<4;h++)yn(t,i.sr,e,n*a[h],s*c[h],r*l[h])}function rc(i,t,e,n,s,r){const o=[1,2.76*i.u(.98,1.02),5.4*i.u(.97,1.03),8.93*i.u(.96,1.04)],a=[1,.6,.35,.2],c=[1,.75,.5,.32];for(let l=0;l<4;l++)yn(t,i.sr,e,n*o[l],s*a[l],r*c[l]);yn(t,i.sr,e,n*1.004,s*.5,r*1.2)}function Vy(i,t,e,n,s,r){const o=[[1,1,1],[2,.45,.6],[3.01,.22,.4],[4.17,.12,.25],[5.43,.06,.15]];for(const[a,c,l]of o)yn(t,i.sr,e,n*a,s*c,r*l);yn(t,i.sr,e,n*1.003,s*.4,r*1.1)}function wa(i,t,e,n,s,r){const o=r*6,a=Dr(i,o,c=>n*(1+2.5*c/o));i.mix(t,As(oe(a,i.sr,Zt(.001,r)),i.sr),e,s)}function Ta(i,t,e,n,s){const r=i.sr,o=i.buf(t);let a=0;for(let h=0;h<o.length;h++)a+=e*(1+(n-1)*h/o.length)*(.85+.3*i.r())/r,a>=1&&(a-=1,o[h]=.5+.5*i.r());const c=new Float32Array(o.length);for(const h of s)i.mix(c,Me(o.slice(),r,"bp",h*i.u(.9,1.1),10));const l=Vn(i,t,9);for(let h=0;h<c.length;h++)c[h]*=.45+.55*l[h];return Ue(oe(c,r,Gn(.03,t,.08)))}function _l(i,t,e,n,s=1){i.mix(t,Je(i,i.u(2200,3600)*s,1.3,.0012),e,n*.7),yn(t,i.sr,e,i.u(700,1300)*s,n*.5,i.u(.008,.018)),yn(t,i.sr,e,i.u(1800,2800)*s,n*.3,i.u(.004,.01))}function vl(i,t,e,n,s){const r=i.sr,o=typeof e=="function"?e:()=>e,a=typeof n=="function"?n:()=>n,c=Ue(Me(i.white(t),r,"bp",a,2.5)),l=Ue(Me(i.white(t),r,"bp",_=>.3*a(_),2)),h=Ue(Me(i.white(t),r,"hp",4500,.7)),u=Vn(i,t,25),f=i.buf(t);let d=0,m=0;for(let _=0;_<f.length;_++){(_&15)===0&&(m=o(_/r)/r),d+=m,d>=1&&(d-=1);const g=Math.sin(mi*d),p=g>0?g*g*g:0;f[_]=(c[_]+.6*l[_])*p*(.4+.6*u[_])+.22*h[_]}return oe(f,r,s),i.mix(f,Qe(i,t,70,2500,3,s,2),0,.35),Ue(f)}const Wy=["stone","wood","gravel","grass","sand","glass","wool","snow","metal"],Xy=["break","hit","step","place"];function Yy(i,t,e){const n=i.sr,s=e==="break",r=e==="place",o=e==="step",a=s?1:r?.6:o?.25:.3,c=e==="hit"?.7:1,l=s?.34:r?.22:o?.16:.13,h=.04+.24*Math.pow(a,1.5),u=i.buf(l+(t==="metal"?.1+h:t==="glass"&&s?.2:0));switch(t){case"stone":{i.mix(u,Je(i,2600*c*i.u(.85,1.15),.9,.003),0,o?.45:.9),i.mix(u,he(i,.15,Zt(8e-4,.012+.025*a),["bp",i.u(650,950)*c,1.8]),0,.8);const d=Qe(i,l,m=>3500*Math.exp(-m/(.02+.07*a)),i.u(1300,2200)*c,.9,Zt(.001,.02+.07*a));if(i.mix(u,d,.002,s?1:.7),(s||r)&&i.mix(u,jn(i,170,70,.03),0,.3),s)for(let m=0;m<7;m++)i.mix(u,Je(i,i.u(1800,4200),1.4,.0015),i.u(.05,.26),i.u(.1,.35));break}case"wood":{const f=i.u(190,300)*c;if(fs(i,u,0,f,1,.016+.022*a,o?.6:1),i.mix(u,Je(i,i.u(1500,2500)*c,1,.0025),0,o?.25:.6),i.mix(u,he(i,.2,Zt(.001,.015+.03*a),["bp",f*i.u(1.3,1.8),4]),0,.7),s||r){const d=Qe(i,l,m=>900*Math.exp(-m/.08),i.u(1800,3e3),1.2,Zt(.002,.03+.06*a));i.mix(u,d,.004,s?.6:.35)}s&&fs(i,u,i.u(.06,.1),f*i.u(1.2,1.5),.45,.025);break}case"gravel":{const f=je(o?.008:.003,.01+.03*a,.03+.08*a),d=Vn(i,l,45),m=g=>(s?1800:1300)*(.15+1.7*d[Math.min(d.length-1,Math.round(g*n))]);i.mix(u,Qe(i,l,m,i.u(900,1400)*c,.9,f,1.4),0,1),i.mix(u,Qe(i,l,500,i.u(2200,3200)*c,1.2,f,2),0,.4);const _=Math.round(4+8*a);for(let g=0;g<_;g++){const p=l*.8*Math.pow(i.r(),1.5);i.mix(u,Je(i,i.u(1200,3500)*c,1.6,.0015),p,i.u(.2,.6)*f(p))}i.mix(u,he(i,l,f,["lp",600*c],["hp",100]),0,.35),(s||r)&&i.mix(u,jn(i,140,70,.03),0,.3);break}case"sand":{const f=je(o?.025:.014,.015+.05*a,.04+.08*a),d=Qe(i,l,7e3,i.u(3e3,4200)*c,.5,f,1.1);i.mix(u,Me(d,n,"hp",1500*c),0,1),i.mix(u,he(i,l,f,["bp",i.u(2200,3e3)*c,.7],["hp",900]),0,.6),i.mix(u,he(i,l,f,["lp",300]),0,.12);break}case"grass":{const f=je(o?.022:.014,.02+.05*a,.04+.07*a),d=i.white(l),m=Vn(i,l,70);for(let _=0;_<d.length;_++)d[_]*=.15+.85*m[_]*m[_]*m[_];Me(d,n,"bp",i.u(2e3,2800)*c,.8),Me(d,n,"hp",600*c),i.mix(u,Ue(As(oe(d,n,f),n)),0,1),i.mix(u,Qe(i,l,350,i.u(3500,5e3)*c,1.5,f,2.5),0,.5),i.mix(u,he(i,l,Zt(.004,.01+.04*a),["lp",300]),0,.45);break}case"glass":{if(s){i.mix(u,he(i,.25,Zt(5e-4,.05),["hp",2500]),0,.8),i.mix(u,Je(i,3500,1,.003),0,.6);for(let f=0;f<36;f++){const d=.34*Math.pow(i.r(),1.7);yn(u,n,d,i.u(2200,8500),i.u(.05,.35)*Math.exp(-d/.25),i.u(.015,.07))}i.mix(u,Qe(i,.4,f=>800*Math.exp(-f/.1),5e3,.8,Zt(.001,.1)),.01,.4)}else{i.mix(u,Je(i,i.u(3e3,4500)*c,1.2,o?.004:.003),0,.8),i.mix(u,he(i,.1,Zt(.001,.012+.02*a),["bp",i.u(900,1300)*c,2]),0,.5);const f=r?3:2;for(let d=0;d<f;d++)yn(u,n,i.u(0,.01),i.u(2500,6e3)*c,i.u(.1,.25),i.u(.015,.035)*(.5+a))}break}case"wool":{const f=je(o?.012:.008,.01+.03*a,.03+.06*a);i.mix(u,he(i,l,f,["lp",i.u(380,600)*c],["hp",60]),0,1),i.mix(u,he(i,l,f,["bp",i.u(1200,1800)*c,.8]),0,.12);break}case"snow":{const f=je(o?.012:.006,.02+.04*a,.03+.07*a);i.mix(u,he(i,l,f,["lp",i.u(500,800)*c],["hp",60]),0,.8),i.mix(u,Qe(i,l,1400,i.u(1e3,1600)*c,1.1,f,1.8),0,.6),i.mix(u,Qe(i,l,500,i.u(2200,3e3)*c,1.4,f,2.5),0,.2);break}case"metal":{const f=i.u(650,1100)*c*(o?1.4:1);i.mix(u,Je(i,i.u(2500,3500)*c,.9,.0025),0,.8),i.mix(u,he(i,.1,Zt(8e-4,.015+.02*a),["bp",i.u(1200,1800)*c,1.5]),0,.6),rc(i,u,.001,f,s||r?.5:.35,h),s&&(rc(i,u,i.u(.05,.09),f*i.u(1.3,1.6),.2,.1),i.mix(u,Qe(i,.2,d=>2e3*Math.exp(-d/.05),2500,1,Zt(.001,.05)),.003,.4));break}}return o&&Me(u,n,"lp",4500,.7),u}const Wt=(i,t,e={})=>({gen:t,gain:i,vars:e.vars??3,jitter:e.jitter??.06,drive:e.drive??0,rate:e.rate??1}),Ky={pop:Wt(.4,i=>{const t=i.u(380,520),e=t*i.u(2.4,3),n=r=>e-(e-t)*Math.exp(-r/.012),s=oe(Dr(i,.11,n),i.sr,Zt(.002,.028));return i.mix(s,oe(Dr(i,.11,r=>2*n(r)),i.sr,Zt(.002,.012)),0,.25)},{vars:3,jitter:.2,rate:.5}),click:Wt(.5,i=>{const t=i.buf(.06);return i.mix(t,Je(i,i.u(2600,3200),1.2,.0015)),yn(t,i.sr,0,i.u(1500,1800),.5,.006),yn(t,i.sr,.012,i.u(2200,2600),.25,.004),t},{vars:2,jitter:.02}),hurt:Wt(.8,i=>{const t=i.u(.9,1.1),e=Pn(i,.3,{f0:n=>(150-50*Math.min(1,n/.2))*t,formants:ui([[0,qe.U],[.08,qe.uh],[.25,qe.o]]),jitter:.02,breath:.15,growl:.15,dry:.3});return oe(e,i.sr,je(.012,.07,.06)),i.mix(e,jn(i,140,70,.03),0,.35)},{rate:.5}),death:Wt(.85,i=>{const t=i.u(.9,1.1),e=Pn(i,.55,{f0:n=>(140-75*Math.min(1,n/.45))*t,formants:ui([[0,qe.U],[.12,qe.uh],[.3,qe.o],[.5,qe.u]]),jitter:.03,breath:.15,growl:.25,dry:.3});return oe(e,i.sr,je(.015,.12,.12)),i.mix(e,jn(i,120,50,.05),0,.4)},{vars:2,jitter:.04,rate:.5}),eat:Wt(.55,i=>{const t=i.buf(.38),e=i.r()<.5?2:3,n=i.u(.1,.13);for(let s=0;s<e;s++){const r=je(.004,.015,.025),o=s===0?1:i.u(.55,.85);i.mix(t,Qe(i,.1,2200,i.u(1600,2600),.9,r,1.5),s*n,o),i.mix(t,he(i,.1,r,["lp",500]),s*n,.35*o)}return t},{vars:4,jitter:.1}),burp:Wt(.6,i=>{const t=i.u(.4,.55),e=i.u(70,95),n=Pn(i,t,{f0:r=>e*(1+.25*Math.sin(Math.PI*r/t)),formants:ui([[0,qe.o],[t*.5,qe.uh],[t,qe.U]]),jitter:.12,breath:.05,growl:.5,dry:.4}),s=Vn(i,t,35);for(let r=0;r<n.length;r++)n[r]*=.5+.5*s[r];return oe(n,i.sr,Gn(.02,t,.12))},{vars:2,jitter:.08,rate:.5}),attack:Wt(.45,i=>{const t=i.u(.22,.28),e=i.u(400,600),n=i.u(1800,2600),r=he(i,t,o=>Math.pow(Math.sin(Math.PI*Math.min(1,o/t)),2),["bp",o=>e+(n-e)*Math.sin(Math.PI*Math.min(1,o/t)),1.4]);return i.mix(r,he(i,t,Gn(t*.4,t,t*.5),["lp",500]),0,.3)},{vars:3,jitter:.08,rate:.5}),strong_hit:Wt(.8,i=>{const t=i.buf(.45);return i.mix(t,jn(i,i.u(150,190),50,.07)),i.mix(t,he(i,.15,Zt(.001,.03),["bp",i.u(900,1400),1]),0,.7),i.mix(t,Je(i,3e3,.7,.003),0,.5),t},{vars:3,jitter:.06,drive:1.5,rate:.5}),bow_shoot:Wt(.65,i=>{const t=i.buf(.5);i.mix(t,oe(Hy(i,.5,i.u(180,240),.992,.6),i.sr,Zt(.001,.12)),0,.8);const e=he(i,.3,n=>Math.pow(Math.sin(Math.PI*Math.min(1,n/.3)),2),["bp",n=>900+2500*n/.3,1.2]);return i.mix(t,e,.01,.45),i.mix(t,Je(i,2e3,1,.002),0,.3)},{vars:3,jitter:.08,rate:.5}),arrow_hit:Wt(.6,i=>{const t=i.buf(.25);fs(i,t,0,i.u(260,340),1,.035,.8),i.mix(t,Je(i,1800,1,.002),0,.5),i.mix(t,jn(i,150,90,.025),0,.5);const e=Dr(i,.2,i.u(130,170));return oe(e,i.sr,n=>Math.exp(-n/.05)*(.6+.4*Math.sin(mi*30*n))),i.mix(t,e,.004,.25)},{vars:3,jitter:.08,rate:.5}),explode:Wt(1,i=>{const e=i.buf(2);i.mix(e,he(i,.4,Zt(8e-4,.04),["lp",6e3]),0,.9);const n=i.brown(2);Me(n,i.sr,"lp",o=>120+900*Math.exp(-o/.15),.8),i.mix(e,Ue(oe(n,i.sr,Zt(.004,.45))),0,1),i.mix(e,jn(i,75,32,.28),0,.9);const s=i.white(2);Me(s,i.sr,"lp",260,.7);const r=Vn(i,2,12);for(let o=0;o<s.length;o++)s[o]*=.3+.7*r[o];return i.mix(e,Ue(oe(s,i.sr,Zt(.05,.6))),0,.6),i.mix(e,Qe(i,1,o=>400*Math.exp(-o/.25),1800,.8,Zt(.01,.3),2.5),.03,.35)},{vars:3,jitter:.08,drive:2,rate:.5}),fuse:Wt(.6,i=>{const e=i.white(1.5);Me(e,i.sr,"hp",2500,.7),Me(e,i.sr,"bp",i.u(5e3,6500),.5);const n=Vn(i,1.5,18);for(let s=0;s<e.length;s++)e[s]*=.7+.3*n[s];return Ue(e),i.mix(e,Qe(i,1.5,60,4e3,1,()=>1,2),0,.5),oe(e,i.sr,Gn(.04,1.5,.15))},{vars:2,jitter:.04}),splash:Wt(.7,i=>{const e=i.buf(.85);i.mix(e,he(i,.2,Zt(.002,.04),["lp",500]),0,.6);const n=i.white(.85),s=Vn(i,.85,40);for(let r=0;r<n.length;r++)n[r]*=.3+.7*s[r];Me(n,i.sr,"bp",r=>1500+2500*Math.exp(-r/.2),.7),i.mix(e,Ue(oe(n,i.sr,Zt(.006,.17))));for(let r=0;r<12;r++){const o=.04+.5*Math.pow(i.r(),1.5);wa(i,e,o,i.u(400,1300),i.u(.1,.3)*Math.exp(-o/.3),i.u(.015,.035))}return e},{vars:3,jitter:.08,rate:.5}),swim:Wt(.4,i=>{const t=i.u(.45,.6),e=i.buf(t),n=i.white(t),s=Vn(i,t,25);for(let r=0;r<n.length;r++)n[r]*=.3+.7*s[r];Me(n,i.sr,"bp",r=>1100+700*r/t,.6),i.mix(e,Ue(oe(n,i.sr,je(.05,.08,.12))));for(let r=0;r<4;r++)wa(i,e,i.u(.05,t*.6),i.u(350,900),i.u(.1,.25),i.u(.015,.03));return e},{vars:4,jitter:.1,rate:.5}),fizz:Wt(.5,i=>{const e=he(i,.7,Zt(.004,.22),["hp",i.u(3e3,4e3)]);return i.mix(e,Qe(i,.7,n=>900*Math.exp(-n/.25),6e3,.7,Zt(.002,.25),2),0,.6)},{vars:3,jitter:.1}),lava_pop:Wt(.45,i=>{const t=i.u(110,160),e=oe(Dr(i,.25,n=>t*(1+2.2*Math.min(1,n/.05))),i.sr,Zt(.003,.035));return i.mix(e,he(i,.05,Zt(.001,.01),["bp",1200,1.2]),.01,.3)},{vars:4,jitter:.12,rate:.5}),door_open:Wt(.6,i=>{const t=i.buf(.5);return i.mix(t,Je(i,3200,2,.002),0,.5),yn(t,i.sr,0,2400,.15,.01),i.mix(t,Ta(i,.36,i.u(45,70),i.u(1.2,1.6),[400,950,1700]),.04,1),fs(i,t,.38,i.u(220,280),.25,.03),t},{rate:.5}),door_close:Wt(.65,i=>{const t=i.buf(.35);return i.mix(t,Ta(i,.1,i.u(60,80),.8,[450,1e3,1800]),0,.35),fs(i,t,.07,i.u(150,200),1,.05),i.mix(t,he(i,.2,Zt(.001,.03),["lp",400]),.07,.4),i.mix(t,Je(i,3e3,2,.002),.075,.4)},{rate:.5}),chest_open:Wt(.6,i=>{const t=i.buf(.65);return fs(i,t,0,i.u(160,210),.35,.03),i.mix(t,Ta(i,.55,i.u(28,40),i.u(1.3,1.7),[300,700,1300]),.03,1)},{vars:3,jitter:.05,rate:.5}),chest_close:Wt(.65,i=>{const t=i.buf(.4);return i.mix(t,Ta(i,.12,i.u(40,55),.8,[320,750,1400]),0,.3),fs(i,t,.1,i.u(120,160),1,.06),i.mix(t,he(i,.25,Zt(.001,.04),["lp",350]),.1,.6),i.mix(t,Je(i,2500,1.5,.002),.105,.3)},{vars:3,jitter:.05,rate:.5}),tool_break:Wt(.75,i=>{const t=i.buf(.45);i.mix(t,he(i,.1,Zt(5e-4,.012),["hp",1500])),rc(i,t,0,i.u(1800,2600),.45,.12);const e=i.u(.08,.14);return rc(i,t,e,i.u(2800,3800),.2,.05),i.mix(t,Je(i,4e3,1.5,.002),e,.3)}),shear:Wt(.55,i=>{const t=i.buf(.3),e=i.u(.08,.11);for(let n=0;n<2;n++){const s=n*e;i.mix(t,he(i,.06,je(.004,.01,.012),["bp",i.u(3500,5e3),1.5]),s,.8-.2*n),yn(t,i.sr,s+.012,i.u(4500,6500),.25,.025),i.mix(t,Je(i,6e3,2,.0015),s+.014,.4)}return t},{vars:3,jitter:.08}),flint_and_steel:Wt(.6,i=>{const t=i.buf(.4),e=i.white(.14),n=Vn(i,.14,120);for(let s=0;s<e.length;s++)e[s]*=.4+.6*n[s];return Me(e,i.sr,"bp",s=>2500+3e3*s/.14,2),i.mix(t,Ue(oe(e,i.sr,Gn(.01,.14,.03)))),i.mix(t,Qe(i,.25,s=>160*Math.exp(-s/.08),6500,1.5,Zt(.001,.08),2.5),.1,.7),i.mix(t,he(i,.25,Gn(.05,.25,.15),["lp",900]),.12,.25)},{vars:3,jitter:.08}),bucket_fill:Wt(.6,i=>{const e=i.buf(.65),n=i.white(.65),s=Vn(i,.65,14);for(let o=0;o<n.length;o++)n[o]*=s[o]*s[o];Me(n,i.sr,"lp",900),Me(n,i.sr,"hp",150),i.mix(e,Ue(oe(n,i.sr,Gn(.03,.65,.2))),0,.5);const r=7+Math.floor(i.r()*3);for(let o=0;o<r;o++){const a=.03+o*.5/r+i.u(-.01,.01);wa(i,e,a,(350+450*o/r)*i.u(.8,1.2),i.u(.3,.6),i.u(.02,.04))}return e},{rate:.5}),bucket_empty:Wt(.6,i=>{const e=i.buf(.7),n=i.white(.7),s=Vn(i,.7,30);for(let o=0;o<n.length;o++)n[o]*=Math.pow(s[o],1.5);Me(n,i.sr,"bp",1600,.6),Me(n,i.sr,"lp",3e3),i.mix(e,Ue(oe(n,i.sr,Gn(.02,.7,.3))),0,.8),i.mix(e,he(i,.2,Zt(.003,.05),["lp",600]),.05,.4);const r=6;for(let o=0;o<r;o++)wa(i,e,.05+o*.08+i.u(0,.03),(900-500*o/r)*i.u(.85,1.15),i.u(.2,.45),i.u(.015,.03));return e},{rate:.5}),fall_small:Wt(.55,i=>{const t=i.buf(.32);return i.mix(t,jn(i,i.u(110,130),50,.05)),i.mix(t,he(i,.15,Zt(.002,.03),["lp",400]),0,.6),i.mix(t,Je(i,1500,.7,.002),0,.15)},{rate:.5}),fall_big:Wt(.8,i=>{const t=i.buf(.6);return i.mix(t,jn(i,i.u(95,110),38,.09)),i.mix(t,he(i,.3,Zt(.002,.06),["lp",600]),0,.7),i.mix(t,Qe(i,.25,1500,1100,.8,Zt(.002,.05),1.5),0,.45),i.mix(t,jn(i,80,45,.04),i.u(.07,.1),.35)},{vars:3,jitter:.06,drive:1.2,rate:.5}),level_up:Wt(.55,i=>{const t=i.buf(1.4),e=76+i.pick([0,2,-2]);return[0,4,7,12].forEach((n,s)=>Vy(i,t,s*.07,bu(e+n),s===3?.9:.55,s===3?.55:.25)),t},{vars:2,jitter:0,rate:.5}),zombie_say:Wt(.6,i=>{const t=i.u(.8,1.15),e=i.u(95,130),n=i.r()<.5,s=Pn(i,t,{f0:r=>e*(n?1+.12*Math.sin(Math.PI*r/t):1.08-.2*r/t),formants:ui([[0,qe.U],[t*.35,qe.uh],[t*.75,qe.o],[t,qe.u]]),vib:i.u(4,6),vibDepth:.03,jitter:.05,breath:.12,growl:.35,dry:.3,q:[5,7,9]});return oe(s,i.sr,Gn(.12,t,.3))},{vars:3,jitter:.1,rate:.5}),zombie_hurt:Wt(.75,i=>{const t=i.u(.3,.4),e=i.u(170,210),n=Pn(i,t,{f0:s=>e*(1.1-.25*s/t),formants:ui([[0,qe.uh],[t,qe.U]]),jitter:.05,breath:.15,growl:.3,dry:.25,q:[5,7,9]});return oe(n,i.sr,je(.015,t*.3,t*.2))},{vars:3,jitter:.1,rate:.5}),zombie_death:Wt(.75,i=>{const t=i.u(1.2,1.4),e=i.u(120,140),n=Pn(i,t,{f0:s=>e*(1-.45*s/t),formants:ui([[0,qe.a],[t*.4,qe.o],[t,qe.u]]),vib:5,vibDepth:.03,jitter:.06,breath:.15,growl:.45,dry:.3,q:[5,7,9]});return oe(n,i.sr,Gn(.04,t,t*.5))},{vars:2,jitter:.08,rate:.5}),skeleton_say:Wt(.6,i=>{const t=i.buf(.7),e=4+Math.floor(i.r()*5);let n=.002;for(let s=0;s<e;s++)_l(i,t,n,i.u(.5,1)),n+=i.u(.03,.08);return t},{vars:3,jitter:.1,rate:.5}),skeleton_hurt:Wt(.75,i=>{const t=i.buf(.32);i.mix(t,he(i,.1,Zt(5e-4,.01),["hp",2e3]),0,.6);const e=3+Math.floor(i.r()*3);let n=0;for(let s=0;s<e;s++)_l(i,t,n,i.u(.6,1),1.2),n+=i.u(.018,.04);return t},{vars:3,jitter:.1,rate:.5}),skeleton_death:Wt(.75,i=>{const t=i.buf(1.2);let e=0,n=.025;for(let s=0;s<18&&e<1;s++)_l(i,t,e,Math.exp(-e/.5)*i.u(.5,1),1-.3*e),e+=n*i.u(.6,1.4),n*=1.12;return fs(i,t,i.u(.15,.3),i.u(160,220),.5,.05),t},{vars:2,jitter:.06,rate:.5}),creeper_hurt:Wt(.75,i=>{const e=i.buf(.38);i.mix(e,he(i,.38,je(.004,.05,.08),["bp",i.u(2500,3500),.8]),0,.8),i.mix(e,Qe(i,.38,n=>900*Math.exp(-n/.1),1800,1.2,Zt(.002,.12),2),0,.6);for(let n=0;n<4;n++)i.mix(e,jn(i,i.u(300,500),150,.01),i.u(0,.22),i.u(.3,.6));return e},{vars:3,jitter:.1,rate:.5}),creeper_death:Wt(.75,i=>{const e=i.buf(.95);i.mix(e,he(i,.95,Zt(.01,.3),["bp",s=>4e3*Math.exp(-s/.5)+900,.9]),0,.8);const n=Qe(i,.95,s=>700*Math.exp(-s/.3),s=>2500-1500*s/.95,1,Zt(.005,.3),2);i.mix(e,n,0,.6);for(let s=0;s<7;s++){const r=s*.09+i.u(0,.05);i.mix(e,jn(i,i.u(260,420)*(1-r*.6),100,.015),r,.5*Math.exp(-r/.5))}return i.mix(e,he(i,.4,Zt(.01,.12),["lp",300]),i.u(.05,.12),.4)},{vars:2,jitter:.06,rate:.5}),spider_say:Wt(.6,i=>{const t=i.u(.55,.8),e=i.u(22,34);return vl(i,t,e,n=>3200+800*Math.sin(mi*3*n),Gn(.04,t,.15))},{vars:3,jitter:.1}),spider_hurt:Wt(.75,i=>{const t=i.u(.22,.3);return vl(i,t,i.u(36,46),i.u(3800,4600),je(.005,t*.3,t*.2))},{vars:3,jitter:.1}),spider_death:Wt(.75,i=>{const t=i.u(1,1.2);return vl(i,t,e=>30-18*e/t,e=>3500-2e3*e/t,Zt(.02,.4))},{vars:2,jitter:.06}),pig_say:Wt(.6,i=>{const t=i.buf(.75),e=i.pick([1,2,2,2,3]);let n=0;for(let s=0;s<e;s++){const r=i.u(.13,.2),o=i.u(150,230),a=Pn(i,r,{f0:c=>o*(1+.35*Math.sin(Math.PI*c/r)),formants:ui([[0,[300,1100,2300]],[r*.4,[520,1300,2500]],[r,[380,1700,2500]]]),duty:.3,jitter:.1,growl:.45,breath:.1,dry:.2,q:[4,6,7]});i.mix(t,oe(a,i.sr,je(.012,r*.4,r*.25)),n,s?.8:1),n+=r+i.u(.06,.1)}return t},{vars:3,jitter:.1,rate:.5}),pig_hurt:Wt(.75,i=>{const t=i.u(.24,.34),e=i.u(520,700),n=Pn(i,t,{f0:s=>e*(1+.3*Math.sin(Math.PI*s/t)),formants:()=>[900,2200,3200],vib:11,vibDepth:.03,duty:.35,jitter:.06,breath:.12,growl:.2,q:[5,7,8]});return oe(n,i.sr,je(.01,t*.5,t*.2))},{vars:3,jitter:.1,rate:.5}),cow_say:Wt(.6,i=>{const t=i.u(.85,1.15),e=i.u(98,120),n=Pn(i,t,{f0:s=>{const r=s/t;return e*(1+.2*Math.sin(Math.PI*Math.min(1,r/.75))-(r>.75?.3*(r-.75):0))},formants:ui([[0,[260,650,2200]],[.12,[320,760,2300]],[t*.55,[560,900,2400]],[t,[420,780,2300]]]),vib:3.5,vibDepth:.012,jitter:.03,breath:.05,growl:.12,dry:.6,q:[4,6,8]});return Me(n,i.sr,"lp",s=>350+3500*Math.min(1,s/.25),.7),oe(n,i.sr,Gn(.08,t,.3))},{vars:3,jitter:.08,rate:.5}),cow_hurt:Wt(.75,i=>{const t=i.u(.28,.36),e=i.u(160,190),n=Pn(i,t,{f0:s=>e*(1+.15*Math.sin(Math.PI*s/t)),formants:ui([[0,[300,700,2200]],[t*.4,[600,950,2400]],[t,[450,800,2300]]]),jitter:.04,breath:.08,growl:.2,dry:.5,q:[4,6,8]});return Me(n,i.sr,"lp",s=>500+3500*Math.min(1,s/.06),.7),oe(n,i.sr,je(.015,t*.4,t*.2))},{vars:3,jitter:.08,rate:.5}),sheep_say:Wt(.6,i=>{const t=i.u(.6,.85),e=i.u(270,340),n=i.u(7,9.5),s=Pn(i,t,{f0:r=>e*(1+.05*Math.sin(Math.PI*r/t)),formants:ui([[0,[400,1100,2600]],[.05,[850,1500,2800]],[t,[700,1750,2750]]]),vib:n,vibDepth:.045,jitter:.03,breath:.12,duty:.4,q:[5,7,9]});return oe(s,i.sr,r=>1-.4*(.5+.5*Math.sin(mi*n*r))),oe(s,i.sr,Gn(.03,t,.2))},{vars:3,jitter:.08,rate:.5}),sheep_hurt:Wt(.75,i=>{const t=i.u(.26,.34),e=i.u(380,450),n=i.u(10,12),s=Pn(i,t,{f0:r=>e*(1.05-.1*r/t),formants:ui([[0,[450,1200,2700]],[.03,[900,1600,2900]],[t,[800,1800,2800]]]),vib:n,vibDepth:.05,jitter:.04,breath:.15,duty:.4,q:[5,7,9]});return oe(s,i.sr,r=>1-.35*(.5+.5*Math.sin(mi*n*r))),oe(s,i.sr,je(.01,t*.4,t*.2))},{vars:3,jitter:.08,rate:.5}),chicken_say:Wt(.55,i=>{const t=i.buf(.8),e=2+Math.floor(i.r()*3);let n=0;for(let s=0;s<e;s++){const r=i.u(.04,.07),o=i.u(600,900),a=Pn(i,r,{f0:c=>o*(1+.5*Math.sin(Math.PI*c/r)),formants:()=>[950,1900,3e3],duty:.3,jitter:.05,breath:.1,q:[3,5,6]});i.mix(t,oe(a,i.sr,je(.004,r*.35,r*.3)),n,i.u(.6,1)),n+=r+i.u(.05,.12)}return t},{vars:3,jitter:.1,rate:.5}),chicken_hurt:Wt(.7,i=>{const t=i.u(.16,.22),e=i.u(1e3,1300),n=Pn(i,t,{f0:s=>e*(1-.35*s/t),formants:()=>[1100,2300,3400],duty:.25,jitter:.08,breath:.25,growl:.4,q:[3,5,6]});return oe(n,i.sr,je(.005,t*.35,t*.25))},{vars:3,jitter:.1,rate:.5})},Zs={};for(const i of Wy)for(const t of Xy){const e=i==="wool"||i==="snow"?.85:1,n=(t==="break"?.8:t==="place"?.72:t==="hit"?.42:.3)*e;Zs[`${t}_${i}`]=Wt(n,s=>Yy(s,i,t),{vars:t==="hit"||t==="step"?4:3,jitter:t==="step"?.05:.06,rate:e<1?.5:1})}Object.assign(Zs,Ky);const qy=Object.keys(Zs);function $y(i,t,e){const n=1-mi*20/t;let s=0,r=0;for(let M=0;M<i.length;M++){const b=i[M];r=b-s+n*r,s=b,i[M]=r}let o=ic(i);if(!(o>0))return i;if(e>0){const M=1/Math.tanh(e);for(let b=0;b<i.length;b++)i[b]=Math.tanh(e*i[b]/o)*M;o=1}let a=i.length;const c=o*.001;for(;a>1&&Math.abs(i[a-1])<c;)a--;const l=i.slice(0,Math.min(i.length,a+Math.round(.004*t))),h=Math.min(l.length,Math.round(5e-4*t));for(let M=0;M<h;M++)l[M]*=.5-.5*Math.cos(Math.PI*M/h);As(l,t,Math.max(.004,Math.min(.03,.1*l.length/t)));const u=Me(l.slice(),t,"hp",90,.6),f=Me(u.slice(),t,"hp",1800,.7),d=Math.max(1,Math.min(u.length,Math.round(.025*t)));let m=0,_=0;for(let M=0;M<u.length;M++){const b=u[M]+.55*f[M];if(m+=b*b,M>=d){const v=u[M-d]+.55*f[M-d];m-=v*v}m>_&&(_=m)}const g=Math.sqrt(_/d),p=Math.min(g>0?.25/g:1/0,.98/ic(l));for(let M=0;M<l.length;M++)l[M]*=p;return l}function jy(i,t=48e3){var s;const e=Math.min(Bh,t),n=((s=Zs[i])==null?void 0:s.rate)??1;return n<1?Math.max(16e3,Math.round(e*n)):e}function Zy(i,t=0,e=48e3){const n=Zs[i];if(!n)throw new Error(`Unknown sound: ${i}`);const s=new Su(e,zy(`${i}#${t}`));return $y(n.gen(s),e,n.drive)}function Jy(i,t){const e=Math.round(t*i),n=Math.round(.3*i);return[0,1].map(s=>{const r=new Su(i,1953+s),o=(e+n)/i,a=r.pink(o);Me(a,i,"hp",350,.6);const c=Me(a.slice(),i,"bp",2600,.5);Me(a,i,"lp",5500,.6);const l=Vn(r,o,.7),h=new Float32Array(e),u=m=>(a[m]+.6*c[m])*(.85+.3*l[m]);for(let m=0;m<e;m++)if(m<n){const _=m/n*Math.PI/2;h[m]=u(m)*Math.sin(_)+u(e+m)*Math.cos(_)}else h[m]=u(m);let f=0;for(let m=0;m<e;m++)f+=h[m]*h[m];const d=Math.sqrt(f/e);return d>0?Ue(h,Math.min(.98,ic(h)*(.2/d))):h})}function Qy(i,t){const e=Math.round(t*i);return[0,1].map(n=>{const s=new Su(i,53769+n),r=new Float32Array(e),o=Math.round(t*75);for(let a=0;a<o;a++){const c=Math.floor(s.r()*e),l=s.r();let h,u;l<.6?(h=Je(s,s.u(2e3,6500),s.u(.8,2.5),s.u(6e-4,.0018)),u=Math.pow(s.r(),2)):l<.85?(h=s.buf(.05),yn(h,i,0,s.u(1800,4500),1,s.u(.004,.012)),u=.3*Math.pow(s.r(),2)):(h=he(s,.04,Zt(.001,.006),["bp",s.u(500,1200),1]),u=.5*s.r());for(let f=0;f<h.length;f++)r[(c+f)%e]+=h[f]*u}return Ue(r,.9)})}function Hs(i,t,e){const n=i.createBuffer(t.length,t[0].length,e);return t.forEach((s,r)=>n.getChannelData(r).set(s)),n}function Lo(i,t,e,n){i.cancelScheduledValues(e),i.setValueAtTime(i.value,e),i.linearRampToValueAtTime(t,e+n)}function tb(i,t=500){typeof requestIdleCallback=="function"?requestIdleCallback(i,{timeout:t}):setTimeout(i,40)}class eb{constructor(t,e,n){w(this,"parts");this.parts=n.map(s=>{const r=t.createBufferSource();r.buffer=s,r.loop=!0;const o=t.createGain();return o.gain.value=0,r.connect(o),o.connect(e),r.start(t.currentTime,Math.random()*s.duration),{src:r,gain:o}})}set(t,e){const[n,s]=this.parts;Lo(n.gain.gain,Fy*Math.pow(t,1.3),e,1.5),Lo(s.gain.gain,By*Math.pow(t,.8),e,1.5)}stop(){for(const{src:t,gain:e}of this.parts){try{t.stop()}catch{}t.disconnect(),e.disconnect()}}}const xl=[36,42,48,54,60,66,72,78,84,90],nb=[[0,2,4,7,9],[0,2,4,7,9,11]],ib={0:[0,4,7,11],2:[2,5,9,12],4:[4,7,11,14],5:[5,9,12,16],7:[7,11,14,21],9:[9,12,16,19]},sb=[[0,5],[0,9,5,0],[5,0],[0,4,5,0],[9,5,0,7],[0,7,9,5],[0,2,5,0]];function rb(i,t){const e=bu(i),n=Nn(4.5*Math.pow(261.6/e,.3),2.5,6),s=new Float32Array(Math.round(n*t)),r=Math.min(t*.45,6e3);for(let a=1;a<=16;a++){const c=a*e*Math.sqrt(1+4e-4*a*a);if(c>r)break;const l=1/(1+Math.pow(c/1400,2))/Math.pow(a,1.1);yn(s,t,0,c,l*.6,n*.12/(1+.5*(a-1))),yn(s,t,0,c*1.0006,l*.4,n*.3/(1+.25*(a-1)))}const o=Math.round(.004*t);for(let a=0;a<o;a++)s[a]*=.5-.5*Math.cos(Math.PI*a/o);return Ue(As(s,t,n*.2),.5)}function ob(i,t,e){const n=Math.round(t*i),s=Math.round(.018*i);return[0,1].map(r=>{const o=new Float32Array(n),a=m0(48879+r);let c=0;for(let l=s;l<n;l++){const h=(l-s)/i;c+=(.08+.55*Math.exp(-h/.9))*(a()*2-1-c),o[l]=c*Math.exp(-6.9*h/e)*Math.min(1,(n-l)/(.05*i))}return o})}class ab{constructor(t,e,n){w(this,"out");w(this,"bus");w(this,"wave");w(this,"samples",new Map);w(this,"nodes",new Set);w(this,"sampleRate");w(this,"events",[]);w(this,"timer");w(this,"nextPhrase",0);w(this,"playing",!1);w(this,"generation",0);w(this,"tick",()=>{try{const t=this.ctx.currentTime;if(!this.events.length&&t>=this.nextPhrase){const e=this.compose(t+.2);this.nextPhrase=e+30+Math.random()*90}for(;this.events.length&&this.events[0].t<t+1.5;){const e=this.events.shift();e.t<t||(e.kind==="note"?this.note(e.t,e.midi,e.vel):this.pad(e.t,e.notes,e.dur,e.vel))}}catch{}});this.ctx=t,this.dest=e,this.synth=n,this.sampleRate=Math.max(22050,Math.min(24e3,t.sampleRate)),this.out=t.createGain(),this.out.gain.value=0,this.bus=t.createGain();const s=t.createGain();s.gain.value=.7;const r=t.createGain();r.gain.value=.55;const o=t.createConvolver(),a=t.sampleRate;n.request(`reverb:${a}`,{kind:"reverb",rate:a,sec:4,rt60:3.2},!1,l=>o.buffer=Hs(t,l,a)),this.bus.connect(s),s.connect(this.out),this.bus.connect(r),r.connect(o),o.connect(this.out);const c=[0,1,.3,.12,.05,.02];this.wave=t.createPeriodicWave(new Float32Array(c.length),new Float32Array(c))}setVolume(t){const e=this.ctx.currentTime;Lo(this.out.gain,t*Oy,e,t>0?1:1.5),t>0&&!this.playing?this.start(e):t<=0&&this.playing&&this.stop()}dispose(){this.stop(),this.silence()}start(t){this.playing=!0,this.generation++,this.out.connect(this.dest),this.nextPhrase=t+3+Math.random()*4,this.timer===void 0&&(this.timer=setInterval(this.tick,250));for(const e of xl)this.sample(e)}stop(){this.playing=!1,this.events=[],this.timer!==void 0&&clearInterval(this.timer),this.timer=void 0;const t=++this.generation;setTimeout(()=>{!this.playing&&t===this.generation&&this.silence()},2500)}silence(){for(const t of this.nodes)try{t.stop()}catch{}this.nodes.clear(),this.out.disconnect()}compose(t){const e=Math.random,n=v=>v[Math.floor(e()*v.length)],s=48+Math.floor(e()*8),r=n(nb),o=60/(54+e()*24),a=n(sb),c=n([4,6,8]),l=c*o,h=Math.max(2,Math.round((20+e()*40)/l)),u=e()<.6,f=[];for(let v=s+12;v<=s+36;v++)r.includes((v-s)%12)&&f.push(v);const d=(f.length-1)/2,m=[];for(let v=0;v<c;v+=.5)e()<(v%1?.12:.5)&&m.push(v);for(;m.length<2;){const v=Math.floor(e()*c);m.includes(v)||m.push(v)}m.sort((v,E)=>v-E);const _=m.map(()=>n([-2,-1,-1,1,1,2,3,-3]));let g=Math.round(d),p=-1;const M=[];for(let v=0;v<h;v++){const E=t+v*l,T=ib[a[v%a.length]];let S=s-12+T[0];for(;S>50;)S-=12;if(M.push({t:E,kind:"note",midi:S,vel:.3+e()*.1}),e()<.4&&M.push({t:E+o*Math.floor(c/2),kind:"note",midi:S+7,vel:.22}),u){const x=[T[0],T[1],T[T.length-1]].map(y=>{let A=s+y;for(;A<55;)A+=12;for(;A>70;)A-=12;return A});M.push({t:E,kind:"pad",notes:x,dur:l+2,vel:.03+e()*.015})}const L=T.map(x=>x%12);for(let x=0;x<f.length&&e()<.8;x++){if(g-x>=0&&L.includes((f[g-x]-s)%12)){g-=x;break}if(g+x<f.length&&L.includes((f[g+x]-s)%12)){g+=x;break}}m.forEach((x,y)=>{if(e()<.15)return;if(y>0){let P=e()<.25?n([-1,1,2,-2]):_[y];Math.abs(g-d)>f.length*.3&&Math.sign(P)===Math.sign(g-d)&&(P=-P),g=Nn(g+P,0,f.length-1)}f[g]===p&&e()<.7&&(g=Nn(g+(g>d?-1:1),0,f.length-1)),p=f[g];const A=E+x*o+(e()-.5)*.04;M.push({t:A,kind:"note",midi:f[g],vel:.22+e()*.18+(x===0?.06:0)}),e()<.12&&g>=2&&M.push({t:A+.012,kind:"note",midi:f[g-2],vel:.15})})}const b=t+h*l;return M.push({t:b,kind:"note",midi:s+24,vel:.3}),M.push({t:b,kind:"note",midi:s-12,vel:.28}),M.sort((v,E)=>v.t-E.t),this.events=M,b+6}sample(t){const e=this.samples.get(t);if(e)return e;const n=this.sampleRate;this.synth.request(`piano:${t}:${n}`,{kind:"piano",midi:t,rate:n},!1,s=>this.samples.set(t,Hs(this.ctx,s,n)))}track(t,e){this.nodes.add(t),t.onended=()=>{this.nodes.delete(t),t.disconnect();for(const n of e)n.disconnect()}}note(t,e,n){const s=this.ctx;let r=xl[0];for(const l of xl)Math.abs(l-e)<Math.abs(r-e)&&(r=l);const o=this.sample(r);if(!o)return;const a=s.createBufferSource();a.buffer=o,a.playbackRate.value=Math.pow(2,(e-r)/12);const c=s.createGain();c.gain.value=n,a.connect(c),c.connect(this.bus),this.track(a,[c]),a.start(t)}pad(t,e,n,s){const r=this.ctx,o=r.createBiquadFilter();o.type="lowpass",o.frequency.value=700+Math.random()*500,o.Q.value=0;const a=r.createGain(),c=Math.min(3,n*.35),l=Math.min(4,n*.45);a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(s,t+c),a.gain.setValueAtTime(s,t+n-l),a.gain.linearRampToValueAtTime(0,t+n),o.connect(a),a.connect(this.bus),e.forEach((h,u)=>{for(const f of[-7,7]){const d=r.createOscillator();d.setPeriodicWave(this.wave),d.frequency.value=bu(h),d.detune.value=f+(Math.random()-.5)*4,d.connect(o),this.track(d,u===e.length-1&&f>0?[o,a]:[]),d.start(t),d.stop(t+n+.05)}})}}function cb(i){switch(i.kind){case"sound":return[Zy(i.name,i.variant,i.rate)];case"rain":return[...Jy(i.rate,4),...Qy(i.rate,2.7)];case"piano":return[rb(i.midi,i.rate)];case"reverb":return ob(i.rate,i.sec,i.rt60)}}class lb{constructor(t){w(this,"worker",null);w(this,"pending",new Map);w(this,"order",[]);w(this,"busy",null);w(this,"disposed",!1);try{const e=(t==null?void 0:t())??null;e&&(e.onmessage=n=>this.finish(n.data.key,n.data.channels),e.onerror=()=>this.fallback()),this.worker=e}catch{this.worker=null}}request(t,e,n,s){if(this.disposed)return;const r=this.pending.get(t);if(r){r.done.push(s);const o=this.order.indexOf(t);n&&o>0&&this.order.unshift(...this.order.splice(o,1));return}this.pending.set(t,{job:e,done:[s]}),n?this.order.unshift(t):this.order.push(t),this.next()}dispose(){var t;this.disposed=!0,(t=this.worker)==null||t.terminate(),this.worker=null,this.pending.clear(),this.order.length=0}next(){if(this.busy!==null||this.disposed)return;const t=this.order.shift();if(t===void 0)return;const e=this.pending.get(t);if(!e)return this.next();if(this.busy=t,this.worker){this.worker.postMessage({key:t,job:e.job});return}tb(()=>{let n=[];try{n=cb(e.job)}catch{}this.finish(t,n)})}fallback(){var t;(t=this.worker)==null||t.terminate(),this.worker=null,this.busy!==null&&this.order.unshift(this.busy),this.busy=null,this.next()}finish(t,e){this.busy===t&&(this.busy=null);const n=this.pending.get(t);if(this.pending.delete(t),n&&e.length&&!this.disposed)for(const s of n.done)try{s(e)}catch{}this.next()}}class hb{constructor(t){w(this,"ctx",null);w(this,"synth",null);w(this,"unavailable",!1);w(this,"disposed",!1);w(this,"rate",Bh);w(this,"master",null);w(this,"sfxIn",null);w(this,"water",null);w(this,"sfxVol",null);w(this,"music",null);w(this,"rain",null);w(this,"rainBuffers",null);w(this,"rainTimer");w(this,"buffers",new Map);w(this,"lastVariant",new Map);w(this,"voices",[]);w(this,"fadingUntil",[]);w(this,"warm",!1);w(this,"volume",1);w(this,"musicVolume",0);w(this,"rainLevel",0);w(this,"underwater",!1);w(this,"pos",{x:0,y:0,z:0,yaw:0,pitch:0});this.createWorker=t}unlock(){if(!(this.disposed||this.unavailable))try{this.ctx||this.init();const t=this.ctx;if(!t)return;if(t.state!=="running"){const e=t.resume();e&&e.then(()=>this.warmUp(),()=>{})}this.warmUp()}catch{}}setVolume(t){this.volume=Nn(rs(t,this.volume),0,1);try{this.ctx&&this.sfxVol&&Lo(this.sfxVol.gain,this.volume,this.ctx.currentTime,.05)}catch{}}setMusicVolume(t){var e;this.musicVolume=Nn(rs(t,this.musicVolume),0,1);try{if(!this.ctx||!this.master)return;!this.music&&this.musicVolume>0&&this.synth&&(this.music=new ab(this.ctx,this.master,this.synth)),(e=this.music)==null||e.setVolume(this.musicVolume)}catch{}}setListener(t,e,n,s,r){if(![t,e,n,s,r].every(Ea))return;const o=this.pos;if(!(o.x===t&&o.y===e&&o.z===n&&o.yaw===s&&o.pitch===r)){o.x=t,o.y=e,o.z=n,o.yaw=s,o.pitch=r;try{this.applyListener()}catch{}}}play(t,e){try{const n=this.ctx,s=this.sfxIn;if(!n||!s||this.disposed||n.state!=="running")return;const r=Zs[t];if(!r)return;const o=Nn(rs(e==null?void 0:e.volume,1),0,2),a=Nn(rs(e==null?void 0:e.pitch,1),.25,4),c=!!e&&(Ea(e.x)||Ea(e.y)||Ea(e.z));let l=0,h=0,u=0,f=1;if(c){const T=this.pos;l=rs(e.x,T.x),h=rs(e.y,T.y),u=rs(e.z,T.z);const S=Math.hypot(l-T.x,h-T.y,u-T.z);if(S>=gl)return;f=1-Math.max(0,S-ml)/(gl-ml)}const d=r.gain*o*f;if(d<.002)return;const m=n.currentTime;let _=0;for(const T of this.voices)T.name===t&&m-T.start<.05&&_++;if(_>=3||this.voices.length>=Uy&&!this.steal(d,m))return;const g=this.pick(t);if(!g)return;const p=n.createBufferSource();p.buffer=g;const M=a*(1+r.jitter*(Math.random()*2-1));p.playbackRate.value=M;const b=n.createGain();b.gain.value=r.gain*o,p.connect(b);let v=null;c?(v=n.createPanner(),v.panningModel="equalpower",v.distanceModel="linear",v.refDistance=ml,v.maxDistance=gl,v.rolloffFactor=1,v.positionX?(v.positionX.value=l,v.positionY.value=h,v.positionZ.value=u):v.setPosition(l,h,u),b.connect(v),v.connect(s)):b.connect(s),p.start(m);const E={src:p,gain:b,panner:v,name:t,start:m,end:m+g.duration/M,level:d};p.onended=()=>this.release(E),this.voices.push(E)}catch{}}setRain(t){this.rainLevel=Nn(rs(t,0),0,1);try{this.applyRain()}catch{}}setUnderwater(t){this.underwater=!!t;try{this.applyUnderwater()}catch{}}dispose(){var t,e,n;if(!this.disposed){this.disposed=!0,(t=this.synth)==null||t.dispose(),clearTimeout(this.rainTimer);try{(e=this.music)==null||e.dispose(),(n=this.rain)==null||n.stop();for(const r of this.voices)try{r.src.stop()}catch{}const s=this.ctx;s&&typeof s.close=="function"&&s.close().catch(()=>{})}catch{}this.voices=[],this.music=null,this.rain=null,this.ctx=null,this.sfxIn=null,this.buffers.clear(),this.rainBuffers=null}}init(){const t=globalThis,e=t.AudioContext??t.webkitAudioContext;if(!e){this.unavailable=!0;return}let n;try{n=new e({latencyHint:"interactive"})}catch{n=new e}this.ctx=n,this.rate=Math.min(Bh,n.sampleRate),this.synth=new lb(this.createWorker);const s=n.createDynamicsCompressor();s.threshold.value=-8,s.knee.value=4,s.ratio.value=20,s.attack.value=.002,s.release.value=.15,s.connect(n.destination);const r=n.createGain();r.gain.value=.7,r.connect(s),this.master=r;const o=n.createGain();o.gain.value=this.volume,o.connect(r);const a=n.createBiquadFilter();a.type="lowpass",a.Q.value=0,a.frequency.value=this.underwater?ad:this.openCutoff(),a.connect(o);const c=n.createGain();c.connect(a),this.sfxVol=o,this.water=a,this.sfxIn=c,n.onstatechange=()=>{n.state==="running"&&this.warmUp()};const l=n.createBufferSource();l.buffer=n.createBuffer(1,1,n.sampleRate),l.connect(n.destination),l.start(0),this.applyListener(),this.applyRain(),this.setMusicVolume(this.musicVolume)}openCutoff(){var t;return Math.min(2e4,(((t=this.ctx)==null?void 0:t.sampleRate)??44100)*.45)}applyListener(){const t=this.ctx;if(!t)return;const{x:e,y:n,z:s,yaw:r,pitch:o}=this.pos,a=Math.cos(o),c=Math.sin(o),l=Math.cos(r),h=Math.sin(r),u=-h*a,f=c,d=-l*a,m=h*c,_=a,g=l*c,p=t.listener;p.positionX?(p.positionX.value=e,p.positionY.value=n,p.positionZ.value=s,p.forwardX.value=u,p.forwardY.value=f,p.forwardZ.value=d,p.upX.value=m,p.upY.value=_,p.upZ.value=g):(p.setPosition(e,n,s),p.setOrientation(u,f,d,m,_,g))}applyUnderwater(){var s;const t=this.ctx,e=(s=this.water)==null?void 0:s.frequency;if(!t||!e)return;const n=t.currentTime;e.cancelScheduledValues(n),e.setValueAtTime(Math.max(20,e.value),n),e.exponentialRampToValueAtTime(this.underwater?ad:this.openCutoff(),n+(this.underwater?.15:.35))}applyRain(){const t=this.ctx;if(!t||!this.sfxIn)return;const e=this.rainLevel;if(clearTimeout(this.rainTimer),e>0&&!this.rain){const n=this.rainLoops(t);n&&(this.rain=new eb(t,this.sfxIn,n))}this.rain&&(this.rain.set(e,t.currentTime),e<=0&&(this.rainTimer=setTimeout(()=>{this.rainLevel<=0&&this.rain&&(this.rain.stop(),this.rain=null)},4e3)))}rainLoops(t){var n;if(this.rainBuffers)return this.rainBuffers;const e=this.rate;return(n=this.synth)==null||n.request(`rain:${e}`,{kind:"rain",rate:e},!0,s=>{this.rainBuffers=[Hs(t,s.slice(0,2),e),Hs(t,s.slice(2,4),e)],this.applyRain()}),null}pick(t){const e=this.buffers.get(t),n=[];if(e)for(let r=0;r<e.length;r++)e[r]&&n.push(r);if(!n.length){this.variant(t,0,!0);return}let s=Math.floor(Math.random()*n.length);return n.length>1&&n[s]===this.lastVariant.get(t)&&(s=(s+1)%n.length),this.lastVariant.set(t,n[s]),e[n[s]]}variant(t,e,n){var a;const s=this.ctx,r=this.synth;if(!s||!r||(a=this.buffers.get(t))!=null&&a[e])return;const o=jy(t,this.rate);r.request(`${t}#${e}:${o}`,{kind:"sound",name:t,variant:e,rate:o},n,([c])=>{let l=this.buffers.get(t);l||this.buffers.set(t,l=[]),l[e]=Hs(s,[c],o)})}warmUp(){var n;const t=this.ctx;if(this.warm||this.disposed||(t==null?void 0:t.state)!=="running")return;this.warm=!0;for(let s=0;s<4;s++)for(const r of qy)s<Zs[r].vars&&this.variant(r,s,!1);const e=this.rate;(n=this.synth)==null||n.request(`rain:${e}`,{kind:"rain",rate:e},!1,s=>{this.rainBuffers??(this.rainBuffers=[Hs(t,s.slice(0,2),e),Hs(t,s.slice(2,4),e)])})}steal(t,e){if(this.fadingUntil=this.fadingUntil.filter(o=>o>e),this.fadingUntil.length>=ky)return!1;let n=-1,s=1/0;for(let o=0;o<this.voices.length;o++){const a=this.voices[o],c=a.end-a.start,l=c>0?Nn((a.end-e)/c,0,1):0,h=a.level*(.25+.75*l);h<s&&(s=h,n=o)}if(n<0||s>t)return!1;const r=this.voices[n];this.voices.splice(n,1),this.fadingUntil.push(e+.012);try{Lo(r.gain.gain,0,e,.01),r.src.stop(e+.012)}catch{}return!0}release(t){var n;const e=this.voices.indexOf(t);e>=0&&this.voices.splice(e,1),t.src.disconnect(),t.gain.disconnect(),(n=t.panner)==null||n.disconnect()}}const $i=`
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
`,eo=`
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
`,_0=`
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
`,v0=`
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
`,x0=`
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
`,Aa=`
precision highp float;
precision highp int;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
${$i}
${v0}
${x0}

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
`,M0=`
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
`,Ml=`
precision highp float;
precision highp int;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${$i}
${eo}
${_0}

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

${M0}

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
`,ub=`
precision highp float;
precision highp int;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${$i}
${eo}
${_0}

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

${M0}

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
`,fb=`
precision highp float;
precision highp int;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
${$i}
${v0}
${x0}
out vec3 vUv;
void main() {
  Decoded d = decode();
  vUv = d.uv;
  gl_Position = projectionMatrix * viewMatrix * d.world;
}
`,db=`
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
`,pb=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}
`,mb=`
${$i}
uniform float uNight;
uniform vec3 uSunDisk;
uniform vec3 uMoonDisk;
varying vec3 vDir;
${eo}

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
`,cd=`
attribute float aShade;
varying vec3 vWorld;
varying float vShade;
void main() {
  vec4 world = modelMatrix * instanceMatrix * vec4(position, 1.0);
  vWorld = world.xyz;
  vShade = aShade;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`,gb=`
${$i}
varying vec3 vWorld;
varying float vShade;
${eo}
void main() {
  vec3 col = (uAmbient * 1.2 + uLightColor * 0.85) * vShade;
  col = mix(col, col * 0.55, uRain);
  vec3 v = vWorld - uCameraPos;
  float dist = length(v);
  float fog = smoothstep(uFogFar * 1.2, uFogFar * 3.2, dist);
  vec3 c = mix(col, skyColor(v / dist), fog);
  gl_FragColor = vec4(c, 0.86 * (1.0 - fog * 0.85));
}
`,_b=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,vb=`
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
  col *= 1.0 - dot(q, q) * 0.55;
  if (uUnderwaterTint > 0.5) col = mix(col, col * vec3(0.55, 0.75, 1.0), 0.45);
  col = mix(col, vec3(0.7, 0.0, 0.0), uDamage * smoothstep(0.15, 0.75, length(q)));
  gl_FragColor = vec4(toSRGB(clamp(col, 0.0, 1.0)), 1.0);
}
`,zh=1,Gh=2,Hh=3;function xb(){return{uTime:{value:0},uCameraPos:{value:new F},uSunDir:{value:new F(0,1,0)},uLightDir:{value:new F(0,1,0)},uLightColor:{value:new F(1,1,1)},uAmbient:{value:new F(.5,.5,.5)},uZenith:{value:new F(.1,.3,.8)},uHorizon:{value:new F(.6,.7,1)},uSunGlow:{value:new F(.5,.5,.4)},uBlockLight:{value:new F(1,.72,.42)},uFogNear:{value:60},uFogFar:{value:100},uUnderwater:{value:0},uWaterFog:{value:new F(.02,.07,.15)},uRain:{value:0},uShadowMap:{value:null},uShadowMatrix:{value:new de},uShadowTexel:{value:1/1024}}}function Mb(i,t){const e=new gu(i,16,16,t);return e.magFilter=ln,e.minFilter=_o,e.generateMipmaps=!0,e.colorSpace=hn,e.needsUpdate=!0,e}function yb(i,t,e){const n={};e.waving&&(n.WAVING=1),e.shadows&&(n.USE_SHADOWS=1,n.SHADOW_TAPS=e.shadowTaps);const s={...t,uAtlas:{value:i}},r=new zs({glslVersion:Bi,vertexShader:Aa,fragmentShader:Ml,uniforms:s,defines:n}),o=new zs({glslVersion:Bi,vertexShader:Aa,fragmentShader:Ml,uniforms:s,defines:{...n,ALPHA_TEST:1}}),a=new zs({glslVersion:Bi,vertexShader:Aa,fragmentShader:ub,uniforms:s,defines:n,transparent:!0,depthWrite:!1,side:Qn}),c=d=>new zs({glslVersion:Bi,vertexShader:fb,fragmentShader:db,uniforms:s,defines:d,side:Qn,colorWrite:!1}),l=c({}),h=c(e.waving?{WAVING:1,ALPHA_TEST:1}:{ALPHA_TEST:1}),u={...n,ENTITY:1,ALPHA_TEST:1};return delete u.WAVING,{opaque:r,cutout:o,translucent:a,shadowOpaque:l,shadowCutout:h,entityBlock:(d,m=!1)=>new zs({glslVersion:Bi,vertexShader:Aa,fragmentShader:Ml,uniforms:{...s,uEntityLight:{value:d},uNoFog:{value:m?1:0}},defines:u}),atlas:i}}function Ss(i,t){i.traverse(e=>{const n=e;if(!n.isMesh)return;e.layers.enable(Gh),e.castShadow=!0;const s=Array.isArray(n.material)?n.material:[n.material];for(const r of s)!r||r.__entityLight||(r instanceof gi||r instanceof y1||r instanceof b1)&&(r.__entityLight=!0,r.onBeforeCompile=o=>{o.uniforms.uEntityLight=t,o.fragmentShader=o.fragmentShader.replace("void main() {",`uniform vec3 uEntityLight;
void main() {`).replace("#include <opaque_fragment>",`outgoingLight *= uEntityLight;
#include <opaque_fragment>`)},r.customProgramCacheKey=()=>"entity-light",r.needsUpdate=!0)})}const oc="#e0ac80",Vs="#4a2f1b",bb="#2c3e7a";function ld(i){const t=document.createElement("canvas");t.width=t.height=8;const e=t.getContext("2d");i(e);const n=new vu(t);return n.magFilter=ln,n.minFilter=ln,n.generateMipmaps=!1,n.colorSpace=hn,n}const zn=(i,t,e,n,s=1,r=1)=>{i.fillStyle=t,i.fillRect(e,n,s,r)};let Ra=null;function Sb(){if(Ra)return Ra;const i=ld(e=>{zn(e,oc,0,0,8,8),zn(e,Vs,0,0,8,2),zn(e,Vs,0,2,1,1),zn(e,Vs,7,2,1,1),zn(e,"#ffffff",1,4),zn(e,"#3b5bb5",2,4),zn(e,"#3b5bb5",5,4),zn(e,"#ffffff",6,4),zn(e,"#b07850",3,5,2,1),zn(e,"#8a4b3a",3,6,2,1)}),t=ld(e=>{zn(e,oc,0,0,8,8),zn(e,Vs,0,0,8,3),zn(e,Vs,4,3,4,1)});return Ra={face:i,side:t},Ra}function Ca(i,t,e,n,s,r){const o=new fn;o.position.set(r,s,0);const a=new fe(new Xe(i,t,e),n);return a.position.y=-t/2,o.add(a),o}function Eb(i,t){const e=document.createElement("canvas"),n=e.getContext("2d"),s='600 40px "Pixelify Sans", monospace';n.font=s;const r=Math.ceil(n.measureText(i).width)+24;e.width=r,e.height=56,n.font=s,n.fillStyle="rgba(0,0,0,0.45)",n.fillRect(0,0,r,56),n.fillStyle=t,n.fillRect(0,52,r,4),n.fillStyle="#ffffff",n.textBaseline="middle",n.fillText(i,12,28);const o=new vu(e);o.colorSpace=hn;const a=new u1(new Kp({map:o,depthTest:!1,transparent:!0,toneMapped:!1}));return a.scale.set(.32*r/56,.32,1),a.position.y=2.25,a.renderOrder=10,a}class yl{constructor(t,e,n,s){w(this,"group",new fn);w(this,"target",new F);w(this,"light",{value:new F(1,1,1)});w(this,"sneaking",!1);w(this,"sleeping",!1);w(this,"targetYaw",0);w(this,"targetPitch",0);w(this,"yaw",0);w(this,"walkPhase",0);w(this,"swingTime",1);w(this,"body",new fn);w(this,"head");w(this,"torso");w(this,"arms");w(this,"legs");w(this,"tag");w(this,"materials",[]);w(this,"held",null);w(this,"heldId",0);w(this,"armorMeshes",[]);w(this,"armorIds",[0,0,0,0]);this.name=t,this.items=s;const r=d=>{const m=new gi(d);return this.materials.push(m),m},o=r({color:e}),a=r({color:bb}),c=r({color:oc}),{face:l,side:h}=Sb();this.body.scale.setScalar(.9),this.group.add(this.body),this.torso=new fe(new Xe(.5,.75,.25),o),this.torso.position.y=1.125,this.body.add(this.torso),this.head=new fn,this.head.position.y=1.5;const u=[r({map:h}),r({map:h}),r({color:Vs}),r({color:oc}),r({color:Vs}),r({map:l})],f=new fe(new Xe(.5,.5,.5),u);f.position.y=.25,this.head.add(f),this.body.add(this.head),this.arms=[Ca(.25,.75,.25,o,1.5,.375),Ca(.25,.75,.25,o,1.5,-.375)];for(const d of this.arms){const m=new fe(new Xe(.251,.2,.251),c);m.position.y=-.65,d.add(m)}this.legs=[Ca(.25,.75,.25,a,.75,.125),Ca(.25,.75,.25,a,.75,-.125)],this.body.add(...this.arms,...this.legs),this.tag=Eb(t,e),this.group.add(this.tag),Ss(this.body,this.light),this.target.set(...n),this.group.position.copy(this.target)}setTarget(t,e,n,s,r){this.target.set(t,e,n),this.targetYaw=s,this.targetPitch=r}swing(){this.swingTime=0}setHeld(t){if(t===this.heldId||(this.heldId=t,this.held&&(this.held.object.removeFromParent(),this.held.dispose(),this.held=null),!t))return;this.held=this.items.create(t);const e=this.held.object,n=this.items.isFlat(t);e.scale.setScalar(n?.55:.3),e.position.set(0,-.72,n?-.12:-.08),e.rotation.set(n?-Math.PI/2:0,n?Math.PI/2:Math.PI/4,0),this.arms[0].add(e)}setArmor(t){if(t.every((s,r)=>s===this.armorIds[r]))return;this.armorIds=[...t];for(const s of this.armorMeshes)s.removeFromParent(),s.geometry.dispose(),s.material.dispose();this.armorMeshes=[];const e=(s,r,o,a,c,l)=>{const h=new gi({color:l}),u=new fe(new Xe(r,o,a),h);u.position.y=c,s.add(u),this.armorMeshes.push(u)},n=s=>{var r,o;return((o=(r=ge(s))==null?void 0:r.armor)==null?void 0:o.color)??"#cccccc"};if(t[0]&&e(this.head,.58,.58,.58,.25,n(t[0])),t[1]){e(this.torso,.56,.8,.31,0,n(t[1]));for(const s of this.arms)e(s,.31,.4,.31,-.18,n(t[1]))}if(t[2])for(const s of this.legs)e(s,.29,.5,.29,-.28,n(t[2]));if(t[3])for(const s of this.legs)e(s,.3,.22,.3,-.66,n(t[3]));Ss(this.body,this.light)}update(t){const e=this.group.position,n=e.x,s=e.z;e.distanceToSquared(this.target)>64?e.copy(this.target):e.lerp(this.target,1-Math.exp(-t*14));let r=this.targetYaw-this.yaw;r=Math.atan2(Math.sin(r),Math.cos(r)),this.yaw+=r*(1-Math.exp(-t*14)),this.group.rotation.y=this.yaw,this.head.rotation.x+=(this.targetPitch-this.head.rotation.x)*(1-Math.exp(-t*14));const o=Math.hypot(e.x-n,e.z-s),a=t>0?o/t:0;this.walkPhase+=o*2.6;const c=Math.min(1,a/4),l=Math.sin(this.walkPhase)*.8*c;this.legs[0].rotation.x=l,this.legs[1].rotation.x=-l,this.arms[0].rotation.x=-l*.8,this.arms[1].rotation.x=l*.8,this.swingTime=Math.min(1,this.swingTime+t/.3),this.swingTime<1&&(this.arms[0].rotation.x=-Math.sin(this.swingTime*Math.PI)*1.6),this.heldId&&this.swingTime>=1&&(this.arms[0].rotation.x-=.3),this.body.rotation.x=0,this.body.position.set(0,0,0),this.torso.rotation.x=this.sneaking?.45:0,this.head.position.y=this.sneaking?1.38:1.5,this.tag.position.y=this.sneaking?2:2.25,this.sleeping&&(this.body.rotation.x=-Math.PI/2,this.body.position.set(0,.3,.9)),this.held&&(this.held.color.value.copy(this.light.value),this.held.light.set(1,0))}dispose(){var t,e;this.group.traverse(n=>{var s;n instanceof fe&&!((s=this.held)!=null&&s.object.getObjectById(n.id))&&n.geometry.dispose()}),(t=this.held)==null||t.dispose();for(const n of this.materials)n.dispose();for(const n of this.armorMeshes)n.material.dispose();(e=this.tag.material.map)==null||e.dispose(),this.tag.material.dispose()}}const We=16;class y0{constructor(t=We,e=We){w(this,"px");this.width=t,this.height=e,this.px=new Uint8ClampedArray(t*e*4)}index(t,e){const n=this.width,s=this.height;return((Math.floor(e)%s+s)%s*n+(Math.floor(t)%n+n)%n)*4}set(t,e,n,s=255){const r=this.index(t,e);this.px[r]=n[0],this.px[r+1]=n[1],this.px[r+2]=n[2],this.px[r+3]=s}get(t,e){const n=this.index(t,e);return[this.px[n],this.px[n+1],this.px[n+2]]}getAlpha(t,e){return this.px[this.index(t,e)+3]}alpha(t,e,n){this.px[this.index(t,e)+3]=n}clear(){this.px.fill(0)}rect(t,e,n,s,r,o=255){for(let a=e;a<=s;a++)for(let c=t;c<=n;c++)this.set(c,a,r,o)}copyFrom(t){this.px.set(t.px)}}const U=i=>[parseInt(i.slice(1,3),16),parseInt(i.slice(3,5),16),parseInt(i.slice(5,7),16)],dn=(i,t)=>[i[0]*t,i[1]*t,i[2]*t],bn=(i,t,e)=>[i[0]+(t[0]-i[0])*e,i[1]+(t[1]-i[1])*e,i[2]+(t[2]-i[2])*e];function b0(i){let t=2166136261;for(let e=0;e<i.length;e++)t=Math.imul(t^i.charCodeAt(e),16777619);return t>>>0}function Mc(i){const t=document.createElement("canvas");return t.width=i.width,t.height=i.height,t.getContext("2d",{willReadFrequently:!0}).putImageData(new ImageData(new Uint8ClampedArray(i.px),i.width,i.height),0,0),t}function S0(i){return new Wb(i)}const Mn=1/16,Ws=64,La=.01,E0=2.66,wb=.8,Do=i=>i>0?i<1?i:1:0,hd=(i,t,e)=>i>t?i<e?i:e:t;function Rs(i,t){i.rotation.y=hd(t.headYaw||0,-1.4,1.4),i.rotation.x=hd(t.headPitch||0,-1.2,1.2)}function yc(i,t=1){return Math.sin((i.walkPhase||0)*E0)*wb*t*Do(i.walkAmount)}function bc(i,t){const e=yc(t);i[0].rotation.x=-e,i[1].rotation.x=e,i[2].rotation.x=e,i[3].rotation.x=-e}function w0(i){const t=i*20;return[Math.sin(t*.067)*.05,Math.cos(t*.09)*.05+.05]}const T0=["right","left","top","bottom","back","front"];class Tb{constructor(t,e,n,s,r){this.u=t,this.v=e,this.w=n,this.h=s,this.d=r}face(t){const{u:e,v:n,w:s,h:r,d:o}=this;switch(t){case"top":return{x:e+o,y:n,w:s,h:o};case"bottom":return{x:e+o+s,y:n,w:s,h:o};case"right":return{x:e,y:n+o,w:o,h:r};case"front":return{x:e+o,y:n+o,w:s,h:r};case"left":return{x:e+o+s,y:n+o,w:o,h:r};case"back":return{x:e+2*o+s,y:n+o,w:s,h:r}}}}function Ti(i,t){return(e,n)=>{var s;return t[((s=i[n])==null?void 0:s[e])??""]}}class Ab{constructor(t){w(this,"tile",new y0(Ws,Ws));w(this,"shelves",[]);w(this,"bottom",0);this.rnd=t}box(t,e,n,s){const r=this.alloc(2*(t+n),e+n),o=new Tb(r.x,r.y,t,e,n);for(const a of T0){const c=o.face(a);this.fill(c,(l,h)=>s(a,l,h,c.w,c.h))}return o}rect(t,e,n){const s=this.alloc(t,e),r={x:s.x,y:s.y,w:t,h:e};return this.fill(r,n),r}n(t,e=.1){return dn(t,1+(this.rnd()-.5)*e)}pick(t,e){let n=this.rnd()*e.reduce((s,r)=>s+r,0);for(let s=0;s<t.length;s++)if(n-=e[s],n<0)return t[s];return t[t.length-1]}alloc(t,e){let n=this.shelves.find(r=>e<=r.h&&r.x+t<=Ws);if(!n){if(t>Ws||this.bottom+e>Ws)throw new Error("mobModels: texture atlas overflow");n={x:0,y:this.bottom,h:e},this.shelves.push(n),this.bottom+=e}const s={x:n.x,y:n.y};return n.x+=t,s}fill(t,e){for(let n=0;n<t.h;n++)for(let s=0;s<t.w;s++){const r=e(s,n);r&&this.tile.set(t.x+s,t.y+n,r)}}}function Rb(i){const t=new vu(Mc(i));return t.colorSpace=hn,t.magFilter=ln,t.minFilter=ln,t.generateMipmaps=!1,t}function A0(i,t,e,n,s){i.setXY(t,(e.x+La+n*(e.w-2*La))/Ws,1-(e.y+La+(1-s)*(e.h-2*La))/Ws)}function Ht(i,t,e,n,s=0){const r=new Xe((i.w+2*s)*Mn,(i.h+2*s)*Mn,(i.d+2*s)*Mn),o=r.getAttribute("uv");for(let a=0;a<6;a++){const c=i.face(T0[a]);for(let l=a*4;l<a*4+4;l++)A0(o,l,c,o.getX(l),o.getY(l))}return r.translate(t*Mn,e*Mn,n*Mn),r}function Cb(i,t,e,n){const s=new Go(i.w*Mn,i.h*Mn);s.rotateY(Math.PI);const r=s.getAttribute("uv");for(let o=0;o<r.count;o++)A0(r,o,i,r.getX(o),r.getY(o));return s.translate(t*Mn,e*Mn,n*Mn),s}function ue(...i){let t=0,e=0;for(const c of i)t+=c.getAttribute("position").count,e+=c.getIndex().count;const n={position:new Float32Array(t*3),normal:new Float32Array(t*3),uv:new Float32Array(t*2)},s=new Uint16Array(e);let r=0,o=0;for(const c of i){for(const h in n){const u=c.getAttribute(h);n[h].set(u.array,r*u.itemSize)}const l=c.getIndex().array;for(let h=0;h<l.length;h++)s[o+h]=l[h]+r;r+=c.getAttribute("position").count,o+=l.length,c.dispose()}const a=new He;return a.setAttribute("position",new ye(n.position,3)),a.setAttribute("normal",new ye(n.normal,3)),a.setAttribute("uv",new ye(n.uv,2)),a.setIndex(new ye(s,1)),a.computeBoundingSphere(),a}const Lb=new qt(1.8,1.8,1.8);class Db{constructor(t,e,n){w(this,"materials",[]);w(this,"skin");this.root=t,this.map=e,this.skin=new gi({map:e,alphaTest:n?.01:0,side:n?Qn:Xi,alphaHash:!0}),this.materials.push(this.skin)}part(t,e,n,s,r=this.root,o=this.skin){const a=new fe(t,o);return a.position.set(e*Mn,n*Mn,s*Mn),a.rotation.order="ZYX",a.castShadow=!0,r.add(a),a}glow(){const t=new Qr({map:this.map,color:Lb,alphaTest:.5,alphaHash:!0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-2});return this.materials.push(t),t}}function Sc(i,t,e,n,s,r){return[i.part(t,e,n,s),i.part(t,-e,n,s),i.part(t,e,n,r),i.part(t,-e,n,r)]}const Eu=U("#f4f1f1");function Pb(i){const t=U("#efa3a0"),e=U("#d98884"),n=U("#f6b6b2"),s=U("#b06a66"),r=Ti(["","","","","wb....bw"],{w:Eu,b:U("#24181a")}),o=Ti(["","n..n"],{n:U("#9a524f")}),a=i.box(8,8,8,(m,_,g)=>m==="front"&&r(_,g)||i.n(m==="bottom"?e:t,.08)),c=i.box(4,3,1,(m,_,g)=>m==="front"&&o(_,g)||i.n(n,.05)),l=i.box(10,8,16,(m,_,g,p,M)=>i.n(m==="bottom"||m!=="top"&&g===M-1?e:t,.08)),h=i.box(4,6,4,(m,_,g)=>i.n(m==="bottom"||g===5?s:t,.08)),u=ue(Ht(a,0,0,-4),Ht(c,0,-1.5,-8.5)),f=ue(Ht(l,0,0,0)),d=ue(Ht(h,0,-3,0));return m=>{m.part(f,0,10,0);const _=m.part(u,0,12,-6),g=Sc(m,d,3,6,-5,7);return p=>{Rs(_,p),bc(g,p)}}}function Ib(i,t,e,n){const s=new Array(t*e).fill(!1);for(let r=0;r<n;r++){const o=i.rnd()*t,a=i.rnd()*e,c=1.5+i.rnd()*t*.3,l=1.5+i.rnd()*e*.3;for(let h=0;h<e;h++)for(let u=0;u<t;u++){const f=(u+.5-o)/c,d=(h+.5-a)/l;f*f+d*d<.85+i.rnd()*.3&&(s[h*t+u]=!0)}}return s}function Nb(i){const t=U("#4f3b2b"),e=U("#3b2b1f"),n=U("#e7e5e0"),s=U("#d8cfb8"),r=U("#eaa3a1"),o=U("#4a433d"),a=Ti(["BBBWWBBB","BBWWWWBB","BBBWWBBB","wkBWWBkw","BBBBBBBB","BmmmmmmB","BmnmmnmB","BmmmmmmB"],{B:t,W:n,w:Eu,k:U("#141010"),m:U("#c9b0a0"),n:U("#5e4940")}),c=new Map,l=(v,E)=>(T,S,L,x,y)=>{const A=v+T;let P=c.get(A);return P||c.set(A,P=Ib(i,x,y,T==="bottom"?E+2:E)),P[L*x+S]?i.n(n,.05):i.n(i.rnd()<.15?e:t,.08)},h=l("head",1),u=i.box(8,8,6,(v,E,T,S,L)=>v==="front"?a(E,T)??i.n(t,.08):v==="top"&&(E===3||E===4)&&T<3?i.n(n,.05):h(v,E,T,S,L)),f=i.box(1,3,1,(v,E,T)=>i.n(T===0?dn(s,.75):s,.05)),d=i.box(12,10,18,l("body",3)),m=i.box(4,1,6,(v,E,T)=>i.n(v==="bottom"&&(E===0||E===3)&&(T===1||T===4)?dn(r,.82):r,.05)),_=l("leg",1),g=i.box(4,12,4,(v,E,T,S,L)=>v==="bottom"||T>=10?i.n(o,.08):_(v,E,T,S,L)),p=ue(Ht(u,0,0,-3),Ht(f,4.5,3.5,-3.5),Ht(f,-4.5,3.5,-3.5)),M=ue(Ht(d,0,0,0),Ht(m,0,-5.5,6)),b=ue(Ht(g,0,-6,0));return v=>{v.part(M,0,17,1);const E=v.part(p,0,20,-8),T=Sc(v,b,4,12,-6,7);return S=>{Rs(E,S),bc(T,S)}}}function Ub(i){const t=U("#ebe8e1"),e=U("#d6d2c9"),n=U("#f7f5f0"),s=U("#d6b8a3"),r=U("#c09f89"),o=U("#c3b1a1"),a=U("#6f6159"),c=Ti(["","","wb..bw","","..pp..","..mm.."],{w:Eu,b:U("#1a1414"),p:U("#d79c94"),m:U("#a2827a")}),l=()=>{const M=i.rnd();return i.n(M<.14?e:M>.88?n:t,.05)},h=i.box(8,6,16,M=>i.n(M==="bottom"?r:s,.06)),u=i.box(8,6,16,l),f=i.box(4,12,4,(M,b,v)=>i.n(M==="bottom"||v===11?a:s,.06)),d=i.box(4,6,4,l),m=i.box(6,6,8,(M,b,v)=>M==="front"&&c(b,v)||i.n(o,.06)),_=i.box(6,6,6,l),g={body:ue(Ht(h,0,0,0),Ht(u,0,0,0,1.75)),head:ue(Ht(m,0,1,-2),Ht(_,0,1,-1,.6)),leg:ue(Ht(f,0,-6,0),Ht(d,0,-3,0,.5))},p={body:ue(Ht(h,0,0,0)),head:ue(Ht(m,0,1,-2)),leg:ue(Ht(f,0,-6,0))};return M=>{const b=M.part(g.body,0,15,0),v=M.part(g.head,0,18,-8),E=Sc(M,g.leg,3,12,-5,7);return T=>{const S=T.sheared?p:g;b.geometry=S.body,v.geometry=S.head;for(const L of E)L.geometry=S.leg;Rs(v,T),bc(E,T)}}}function kb(i){const t=U("#f4f4f2"),e=U("#d8d8d4"),n=U("#f5b01c"),s=U("#d68712"),r=U("#d42a1e"),o=U("#e3892a"),a=U("#141414"),c=()=>i.n(i.rnd()<.1?e:t,.05),l=i.box(4,6,3,(v,E,T,S)=>T===1&&(v==="front"&&(E===0||E===S-1)||v==="right"&&E===S-1||v==="left"&&E===0)?a:c()),h=i.box(4,2,2,(v,E,T)=>i.n(v==="bottom"||v!=="top"&&T===1?s:n,.05)),u=i.box(2,2,2,(v,E,T)=>i.n(v==="bottom"||T===1?dn(r,.8):r,.05)),f=i.box(6,6,8,(v,E,T)=>v==="bottom"||v==="back"&&T<3&&E>0&&E<5&&(E+T)%2===0?i.n(e,.05):c()),d=i.box(1,4,6,(v,E,T,S,L)=>v==="top"||v==="bottom"?c():i.n(T===L-1||T===L-2&&E%2===(v==="right"?0:1)&&S>1?e:t,.05)),m=i.box(1,5,1,()=>i.n(o,.06)),_=i.box(3,1,2,v=>i.n(v==="top"?o:dn(o,.88),.06)),g=ue(Ht(l,0,3,-.5),Ht(h,0,3,-3),Ht(u,0,1,-2)),p=ue(Ht(f,0,0,0)),M=ue(Ht(d,0,-2,0)),b=ue(Ht(m,0,-2.5,0),Ht(_,0,-4.5,-.5));return v=>{v.part(p,0,8,0);const E=v.part(g,0,9,-4),T=[v.part(M,3.5,11,0),v.part(M,-3.5,11,0)],S=[v.part(b,1.5,5,-.5),v.part(b,-1.5,5,-.5)],L=Math.random()*7;return x=>{Rs(E,x);const y=yc(x,1.2);S[0].rotation.x=y,S[1].rotation.x=-y;const A=(((x.time||0)+L)%7+7)%7,P=A<.8?Math.sin(A/.8*Math.PI):0,z=Math.max(P,Do(x.walkAmount)*.35)*(.5+.5*Math.sin((x.time||0)*28))*1.1;T[0].rotation.z=z,T[1].rotation.z=-z}}}function Ob(i){const t=U("#5c8e42"),e=U("#4a7535"),n=U("#3d6230"),s=U("#2e9b9b"),r=U("#247c7d"),o=U("#46409a"),a=U("#36307b"),c=U("#3d3d44"),l=Ti(["hhhhhhhh","h......h","","",".kk..kk.","...nn...","..mmmm.."],{h:n,k:U("#141812"),n:U("#436b31"),m:U("#2e4a23")}),h=i.box(8,8,8,(M,b,v)=>M==="front"?l(b,v)??i.n(t,.08):M==="top"?i.n(n,.1):M==="bottom"?i.n(e,.08):M==="back"?i.n(v<3?n:e,.08):i.n(v<2||v===2&&i.rnd()<.5?n:t,.08)),u=i.box(8,12,4,(M,b,v)=>M==="front"&&v===0&&(b===3||b===4)?i.n(t,.06):i.n(i.rnd()<.1?r:s,.08)),f=i.box(4,12,4,(M,b,v)=>i.n(M==="bottom"||v===11?e:t,.08)),d=i.box(4,12,4,(M,b,v)=>i.n(M==="bottom"||v>=11?c:i.rnd()<.1?a:o,.08)),m=ue(Ht(h,0,4,0)),_=ue(Ht(u,0,0,0)),g=ue(Ht(f,0,-4,0)),p=ue(Ht(d,0,-6,0));return M=>{M.part(_,0,18,0);const b=M.part(m,0,24,0),v=[M.part(g,6,22,0),M.part(g,-6,22,0)],E=[M.part(p,1.9,12,0),M.part(p,-1.9,12,0)];return T=>{Rs(b,T);const S=yc(T);E[0].rotation.x=S,E[1].rotation.x=-S;const L=T.attackTime>=0&&T.attackTime<.3?T.attackTime/.3:0,x=Math.sin(L*Math.PI),y=Math.sin((1-(1-L)*(1-L))*Math.PI),[A,P]=w0(T.time||0),N=1.48-x*1.2+y*.4,z=.1-x*.6;v[0].rotation.set(N+A-S*.15,z,P),v[1].rotation.set(N-A+S*.15,-z,-P)}}}function Fb(i){const t=U("#c6c6c6"),e=U("#dedede"),n=U("#9a9a9a"),s=U("#7a5332"),r=Ti(["","","",".kk..kk.",".kk..kk.","...nn...",".dldldl.","jjjjjjjj"],{k:U("#222222"),n:U("#4a4a4a"),d:U("#3a3a3a"),l:e,j:n}),o=i.box(8,8,8,(v,E,T)=>v==="front"&&r(E,T)||i.n(i.rnd()<.08?n:t,.07)),a=v=>v===0||v===2||v===4||v===6||v>=10,c=i.box(8,12,4,(v,E,T)=>v==="top"||v==="bottom"?i.n(t,.07):(v==="front"||v==="back")&&(E===3||E===4)||a(T)?i.n(T>=10?n:t,.07):null),l=i.box(2,12,2,(v,E,T)=>v==="bottom"||T===5||T===11?i.n(n,.06):i.n(E===0&&v!=="top"?e:t,.06)),h=i.box(1,5,1,(v,E,T)=>i.n(T===0||T===4?s:U("#4d3420"),.06)),u=i.box(1,3,1,()=>i.n(s,.08)),f=i.box(1,2,2,()=>i.n(U("#9c6c3e"),.06)),d=i.box(1,15,1,()=>i.n(U("#e6e6e6"),.04)),m=ue(Ht(h,0,0,-.5),Ht(u,0,4,.5),Ht(u,0,-4,.5),Ht(f,0,6.5,2),Ht(f,0,-6.5,2),Ht(d,0,0,3.2,-.3));m.rotateX(-Math.PI/2),m.translate(0,-10*Mn,0);const _=ue(Ht(o,0,4,0)),g=ue(Ht(c,0,0,0)),p=ue(Ht(l,0,-4,0)),M=ue(Ht(l,0,-4,0),m),b=ue(Ht(l,0,-6,0));return v=>{v.part(g,0,18,0);const E=v.part(_,0,24,0),T=[v.part(M,5,22,0),v.part(p,-5,22,0)],S=[v.part(b,2,12,0),v.part(b,-2,12,0)];return L=>{Rs(E,L);const x=yc(L);S[0].rotation.x=x,S[1].rotation.x=-x;const[y,A]=w0(L.time||0),P=L.attackTime>=0&&L.attackTime<.25?1-L.attackTime/.25:0,N=Math.PI/2+E.rotation.x;T[0].rotation.set(N+y+P*.25,.1+E.rotation.y,A),T[1].rotation.set(N-y,-.5+E.rotation.y,-A)}}}function Bb(i){const t=["#4b9a41","#5fae54","#7cc370","#367a2f","#245a20","#a6d69b","#c5cfc2","#3f8b37"].map(U),e=[24,20,13,16,8,8,5,6],n=()=>i.n(i.pick(t,e),.06),s=U("#0f0f0f"),r=U("#262626"),o=Ti(["","",".##..##.",".##..##.","...##...","..####..","..####..","..#..#.."],{"#":s}),a=i.box(8,8,8,(d,m,_)=>d==="front"&&o(m,_)&&(i.rnd()<.2?r:s)||n()),c=i.box(8,12,4,n),l=i.box(4,6,4,d=>d==="bottom"?i.n(t[4],.1):n()),h=ue(Ht(a,0,4,0)),u=ue(Ht(c,0,0,0)),f=ue(Ht(l,0,-3,0));return d=>{d.part(u,0,12,0);const m=d.part(h,0,18,0),_=Sc(d,f,2,6,-4,4);return g=>{Rs(m,g),bc(_,g)}}}const ud=[2,1,0,-1],zb=[Math.PI/4,Math.PI/8,-Math.PI/8,-Math.PI/4],fd=[-Math.PI/4,-.5812,-.5812,-Math.PI/4],dd=[0,Math.PI,Math.PI/2,Math.PI*1.5];function Gb(i){const t=U("#2d2621"),e=U("#1c1815"),n=U("#4b3d32"),s=U("#5e4736"),r={E:U("#d01b16"),H:U("#ff5a40"),e:U("#b01412")},o=Ti(["","","...ee...",".HE..HE.","eEE..EEe"],r),a=Ti(["","","","","","","..f..f..","..f..f.."],{f:U("#6b5a4a")}),c=Ti(["","....mm....","...m..m...","..m.mm.m..","....mm....",".m..mm..m.","..m.mm.m..","....mm....","...m..m...","..m....m.."],{m:s}),l=()=>{const v=i.rnd();return i.n(v<.16?n:v<.4?e:t,.12)},h=i.box(8,8,8,(v,E,T)=>v==="front"&&(o(E,T)||a(E,T))||l()),u=i.box(6,6,6,l),f=i.box(10,8,12,(v,E,T)=>v==="top"&&c(E,T)&&i.n(s,.1)||l()),d=i.box(16,2,2,(v,E)=>i.n(E%5===4?n:i.rnd()<.3?e:t,.12)),m=i.rect(8,8,(v,E)=>o(v,E)??null),_=ue(Ht(h,0,0,-4)),g=Cb(m,0,0,-8.05),p=ue(Ht(u,0,0,0),Ht(f,0,0,9)),M=ue(Ht(d,7,0,0)),b=ue(Ht(d,-7,0,0));return v=>{v.part(p,0,9,0);const E=v.part(_,0,9,-3);v.part(g,0,0,0,E,v.glow()).castShadow=!1;const T=ud.map(L=>v.part(M,4,9,L)),S=ud.map(L=>v.part(b,-4,9,L));return L=>{Rs(E,L);const x=Do(L.walkAmount),y=(L.walkPhase||0)*E0,A=L.attackTime>=0&&L.attackTime<.4?Math.sin(L.attackTime/.4*Math.PI):0;E.rotation.x+=A*.35;for(let P=0;P<4;P++){const N=zb[P]-Math.cos(y*2+dd[P])*.4*x,z=Math.abs(Math.sin(y+dd[P]))*.4*x+A*(P===3?1.1:P===2?.5:0);T[P].rotation.set(0,-N,fd[P]+z),S[P].rotation.set(0,N,-fd[P]-z)}}}}const R0={pig:{height:1,lift:5,build:Pb},cow:{height:1.5,lift:6,build:Nb},sheep:{height:1.4,lift:5,build:Ub},chicken:{height:.95,lift:3,build:kb},zombie:{height:2,lift:4,build:Ob},skeleton:{height:2,lift:4,cutout:!0,build:Fb},creeper:{height:1.65,lift:4,build:Bb},spider:{height:.85,lift:5,build:Gb}},pd=new Map;function Hb(i){let t=pd.get(i);if(!t){const e=new Ab(Ho(b0(`mob:${i}`))),n=R0[i].build(e);t={map:Rb(e.tile),rig:n},pd.set(i,t)}return t}const Vb={walkPhase:0,walkAmount:0,headYaw:0,headPitch:0,attackTime:1/0,fuse:0,sheared:!1,hurt:!1,death:0,time:0};class Wb{constructor(t){w(this,"group",new fn);w(this,"height");w(this,"root",new fn);w(this,"kind");w(this,"rig");w(this,"animate");w(this,"swells");w(this,"flashPhase",0);this.kind=R0[t],this.height=this.kind.height,this.swells=t==="creeper";const e=Hb(t);this.group.name=`mob:${t}`,this.group.add(this.root),this.rig=new Db(this.root,e.map,this.kind.cutout===!0),this.animate=e.rig(this.rig),this.update(0,Vb)}update(t,e){this.animate(e,t);const n=Do(e.death),s=n>0?Math.min(1,Math.sqrt(n*1.6))*(Math.PI/2):0;this.root.rotation.z=s,this.root.position.y=Math.sin(s)*this.kind.lift*Mn;let r=0;if(this.swells){const c=Do(e.fuse),l=c*c,h=1+Math.sin(c*100)*c*.01,u=(1+l*.22)*h;if(this.root.scale.set(u,(1+l*.1)/h,u),c>0){const f=Number.isFinite(t)&&t>0?t:0;this.flashPhase=(this.flashPhase+f*(2+10*c))%1,this.flashPhase>=.5&&(r=.35+.4*c)}else this.flashPhase=0}const o=this.rig.skin;e.hurt||n>0?(o.color.setRGB(1.2,.5,.5),o.emissive.setRGB(.22,.01,.01)):r>0?(o.color.setScalar(1+r),o.emissive.setScalar(r)):(o.color.setScalar(1),o.emissive.setScalar(0));const a=n>.7?1-(n-.7)/.3:1;for(const c of this.rig.materials)c.opacity=a}dispose(){this.group.removeFromParent();for(const t of this.rig.materials)t.dispose()}}const md=i=>Math.atan2(Math.sin(i),Math.cos(i));class Xb{constructor(t,e,n,s,r){w(this,"visuals",new Map);w(this,"time",0);this.scene=t,this.items=e,this.world=n,this.particles=s,this.lightFn=r}get count(){return this.visuals.size}get(t){return this.visuals.get(t)}spawn(t){var l,h;const e=this.visuals.get(t.id);if(e){t.item&&e.info.item&&(t.item.count!==e.info.item.count||t.item.id!==e.info.item.id)&&(e.info.item=t.item),e.target.set(...t.p);return}const n={value:new F(1,1,1)};let s,r,o,a,c;switch(t.kind){case"mob":{r=S0(t.type),s=r.group,Ss(s,n);break}case"item":{const u=((l=t.item)==null?void 0:l.id)??C.STONE;o=this.items.create(u);const f=new fn,d=this.items.isFlat(u);o.object.scale.setScalar(d?.42:.26),o.object.position.y=d?.22:.16,f.add(o.object),(((h=t.item)==null?void 0:h.count)??1)>1&&(a=this.items.create(u),a.object.scale.copy(o.object.scale),a.object.position.set(.06,o.object.position.y+.04,.05),f.add(a.object)),s=f;break}case"tnt":case"falling":{const u=t.kind==="tnt"?C.TNT:t.state??C.SAND;o=this.items.create(Kt(u),u);const f=new fn;o.object.position.y=.5,f.add(o.object),t.kind==="tnt"&&(c=new fe(new Xe(1.01,1.01,1.01),new Qr({color:"#ffffff",transparent:!0,opacity:0})),c.position.y=.5,f.add(c)),s=f;break}default:{const u=new fn,f=new fe(new Xe(.05,.05,.55),new gi({color:"#8b6a3e"})),d=new fe(new Xe(.07,.07,.08),new gi({color:"#9a9a9a"}));d.position.z=-.3;const m=new fe(new Xe(.12,.12,.12),new gi({color:"#e8e8e8"}));m.position.z=.25,u.add(f,d,m),Ss(u,n),s=u}}s.position.set(...t.p),this.scene.add(s),this.visuals.set(t.id,{info:t,object:s,target:new F(...t.p),targetYaw:t.yaw,targetPitch:t.pitch??0,yaw:t.yaw,pitch:t.pitch??0,flags:t.flags??0,mob:r,item:o,extra:a,light:n,walkPhase:0,walkAmount:0,attackTime:1/0,fuse:0,fuseActive:!1,death:0,hurt:0,spawnTime:this.time,flash:c})}move(t){for(let e=0;e+6<t.length;e+=7){const n=this.visuals.get(t[e]);if(!n)continue;n.target.set(t[e+1],t[e+2],t[e+3]),n.targetYaw=t[e+4],n.targetPitch=t[e+5];const s=t[e+6];s&$u&&!(n.flags&$u)&&(n.hurt=.4),s&ju&&!(n.flags&ju)&&(n.attackTime=0),n.flags=s,n.info.kind==="tnt"&&(n.fuse=s/10)}}event(t,e,n){const s=this.visuals.get(t);s&&(e==="hurt"?s.hurt=.4:e==="death"?(s.hurt=.4,s.death=1e-4):e==="attack"?s.attackTime=0:e==="fuse"&&(s.fuseActive=n===1))}remove(t,e){for(const n of t){const s=this.visuals.get(n);if(s){if(e&&s.info.kind==="item"){s.pickup={to:e,t:0};continue}if(s.info.kind==="mob"&&s.death>0){const[r,o]=Yo[s.info.type]??[.6,1];this.particles.puff(s.object.position.x,s.object.position.y+o/2,s.object.position.z,14,r,[.8,.8,.8],1.5)}this.dispose(n,s)}}}dispose(t,e){var s,r,o;this.scene.remove(e.object),(s=e.mob)==null||s.dispose(),(r=e.item)==null||r.dispose(),(o=e.extra)==null||o.dispose();const n=new Set;e.item&&e.item.object.traverse(a=>n.add(a)),e.extra&&e.extra.object.traverse(a=>n.add(a)),e.object.traverse(a=>{const c=a;c.isMesh&&!e.mob&&!n.has(c)&&(c.geometry.dispose(),c.material.dispose())}),this.visuals.delete(t)}clear(){for(const[t,e]of this.visuals)this.dispose(t,e)}update(t){this.time+=t,new F;for(const[e,n]of this.visuals){const s=n.object.position;if(n.pickup){n.pickup.t+=t/.15,s.lerp(n.pickup.to(),Math.min(1,n.pickup.t)),n.pickup.t>=1&&this.dispose(e,n);continue}const r=s.x,o=s.z;s.distanceToSquared(n.target)>64?s.copy(n.target):s.lerp(n.target,1-Math.exp(-t*12)),n.yaw+=md(n.targetYaw-n.yaw)*(1-Math.exp(-t*10)),n.pitch+=md(n.targetPitch-n.pitch)*(1-Math.exp(-t*10));const a=this.world.getLight(Math.floor(s.x),Math.floor(s.y+.5),Math.floor(s.z));switch(this.lightFn(a,n.light.value),n.item&&(n.item.light.set((a>>4)/15,(a&15)/15),n.item.color.value.copy(n.light.value),n.extra&&(n.extra.light.copy(n.item.light),n.extra.color.value.copy(n.light.value))),n.info.kind){case"mob":{const c=Math.hypot(s.x-r,s.z-o);if(n.walkPhase+=c,n.walkAmount+=(Math.min(1,c/Math.max(t,.001)/3)-n.walkAmount)*Math.min(1,t*8),n.hurt=Math.max(0,n.hurt-t),n.attackTime+=t,n.death>0&&(n.death=Math.min(1,n.death+t)),n.fuseActive?n.fuse=Math.min(1,n.fuse+t/1.5):n.fuse=Math.max(0,n.fuse-t/1.5),n.object.rotation.y=n.yaw,n.mob.update(t,{walkPhase:n.walkPhase,walkAmount:n.walkAmount,headYaw:n.pitch,headPitch:0,attackTime:n.attackTime,fuse:n.fuse,sheared:(n.flags&jm)!==0,hurt:n.hurt>0,death:n.death,time:this.time}),n.flags&$m&&Math.random()<t*20){const[l,h]=Yo[n.info.type];this.particles.puff(s.x,s.y+Math.random()*h,s.z,1,l,[2.4,1.1,.3],.8)}break}case"item":{const c=this.time-n.spawnTime,l=n.object.children;for(const h of l)h.rotation.y=c*1.6;n.object.position.y=s.y+Math.sin(c*2.5)*.06,s.y=n.object.position.y,n.object.position.y=n.target.y+(s.y-n.target.y);break}case"tnt":{if(n.fuse=Math.max(0,n.fuse-t),n.flash){const c=Math.floor(n.fuse*(n.fuse<1?10:4))%2===0;n.flash.material.opacity=c?.55:0;const l=1+(n.fuse<.4?(.4-n.fuse)*.6:0);n.object.scale.setScalar(l)}Math.random()<t*30&&this.particles.puff(s.x,s.y+1.1,s.z,1,.1,[.5,.5,.5],.5);break}case"arrow":n.object.rotation.set(n.pitch,n.yaw,0,"YXZ");break}}}raycast(t,e,n){let s=null;for(const[r,o]of this.visuals){if(o.info.kind!=="mob"||o.death>0)continue;const[a,c]=Yo[o.info.type]??[.6,1.8],l=o.object.position,h=Yb(t,e,l.x-a/2,l.y,l.z-a/2,l.x+a/2,l.y+c,l.z+a/2);h!==null&&h<=n&&(!s||h<s.dist)&&(s={id:r,dist:h})}return s}blocksCell(t,e,n){for(const s of this.visuals.values()){if(s.info.kind!=="mob"||s.death>0)continue;const[r,o]=Yo[s.info.type]??[.6,1.8],a=s.object.position;if(a.x+r/2>t&&a.x-r/2<t+1&&a.y+o>e&&a.y<e+1&&a.z+r/2>n&&a.z-r/2<n+1)return!0}return!1}isMob(t){const e=this.visuals.get(t);return(e==null?void 0:e.info.kind)==="mob"?e.info.type:null}static particleLayer(t){return _s(t)?Rn[t*384]:-1}}function Yb(i,t,e,n,s,r,o,a){let c=0,l=1/0;const h=[e,n,s],u=[r,o,a],f=[i.x,i.y,i.z],d=[t.x,t.y,t.z];for(let m=0;m<3;m++){if(Math.abs(d[m])<1e-9){if(f[m]<h[m]||f[m]>u[m])return null;continue}let _=(h[m]-f[m])/d[m],g=(u[m]-f[m])/d[m];if(_>g&&([_,g]=[g,_]),c=Math.max(c,_),l=Math.min(l,g),c>l)return null}return c}const wu=()=>matchMedia("(pointer: coarse)").matches||navigator.maxTouchPoints>0;class Kb{constructor(t,e){w(this,"active",!1);w(this,"sensitivity",8);w(this,"invertY",!1);w(this,"keys",new Set);w(this,"lookX",0);w(this,"lookY",0);w(this,"lockedAt",0);w(this,"lastMove",0);w(this,"lastSpace",0);w(this,"lastW",0);w(this,"sprintLatch",!1);w(this,"stick",{x:0,y:0});w(this,"touchJump",!1);w(this,"touchDown",!1);w(this,"touchSneak",!1);w(this,"onKeyDown",t=>{var e;if(((e=t.target)==null?void 0:e.tagName)!=="INPUT"&&this.active&&(["Space","Tab","F1","F3","F5","Slash","ArrowUp","ArrowDown","KeyQ"].includes(t.code)&&t.preventDefault(),(t.ctrlKey||t.metaKey)&&t.preventDefault(),this.keys.add(t.code),!t.repeat)){if(t.code==="Space"){const n=performance.now();n-this.lastSpace<300?(this.h.toggleFly(),this.lastSpace=0):this.lastSpace=n}if(t.code==="KeyW"){const n=performance.now();n-this.lastW<280&&(this.sprintLatch=!0),this.lastW=n}if(t.code.startsWith("Digit")){const n=Number(t.code.slice(5));n>=1&&n<=9&&this.h.hotbar(n-1)}switch(t.code){case"KeyT":case"Enter":t.preventDefault(),this.release(),this.h.chat("");break;case"Slash":this.release(),this.h.chat("/");break;case"KeyE":this.release(),this.h.inventory(),t.stopImmediatePropagation();break;case"KeyQ":this.h.drop(t.ctrlKey);break;case"Tab":this.h.playerList(!0);break;case"F3":this.h.debug();break;case"F5":this.h.toggleView();break}}});w(this,"onKeyUp",t=>{this.keys.delete(t.code),t.code==="Tab"&&this.h.playerList(!1)});w(this,"onMouseMove",t=>{if(!this.active||!this.pointerLocked)return;const e=Math.max(Math.abs(t.movementX),Math.abs(t.movementY));if(e===0)return;const n=this.lastMove;this.lastMove=e,!(performance.now()-this.lockedAt<120)&&(e>400||e>200&&e>10*Math.max(n,15)||(this.lookX+=t.movementX,this.lookY+=t.movementY))});w(this,"onMouseDown",t=>{!this.active||!this.pointerLocked||(t.button===0?this.h.attackStart():t.button===2?this.h.useStart():t.button===1&&(t.preventDefault(),this.h.pick()))});w(this,"onMouseUp",t=>{t.button===0?this.h.attackEnd():t.button===2&&this.h.useEnd()});w(this,"onWheel",t=>{t.preventDefault(),this.active&&t.deltaY&&this.h.scroll(Math.sign(t.deltaY))});this.canvas=t,this.h=e,window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("blur",()=>{this.keys.clear(),this.h.attackEnd(),this.h.useEnd()}),document.addEventListener("mousemove",this.onMouseMove),document.addEventListener("pointerlockchange",()=>{this.pointerLocked&&(this.lockedAt=performance.now(),this.lastMove=0)}),t.addEventListener("mousedown",this.onMouseDown),window.addEventListener("mouseup",this.onMouseUp),t.addEventListener("wheel",this.onWheel,{passive:!1}),t.addEventListener("contextmenu",n=>n.preventDefault())}get pointerLocked(){return document.pointerLockElement===this.canvas}release(){this.keys.clear(),this.stick={x:0,y:0},this.touchJump=this.touchDown=!1,this.sprintLatch=!1}moveInput(){if(!this.active)return{forward:0,strafe:0,jump:!1,sneak:this.touchSneak,sprint:!1};const t=this.keys;let e=(t.has("KeyW")||t.has("ArrowUp")?1:0)-(t.has("KeyS")||t.has("ArrowDown")?1:0),n=(t.has("KeyD")||t.has("ArrowRight")?1:0)-(t.has("KeyA")||t.has("ArrowLeft")?1:0);(this.stick.x||this.stick.y)&&(e=-this.stick.y,n=this.stick.x),e<=0&&(this.sprintLatch=!1);const s=Math.hypot(this.stick.x,this.stick.y)>.97&&-this.stick.y>.8;return{forward:e,strafe:n,jump:t.has("Space")||this.touchJump,sneak:t.has("ShiftLeft")||t.has("ShiftRight")||this.touchDown||this.touchSneak,sprint:t.has("ControlLeft")||t.has("KeyR")||this.sprintLatch||s}}consumeLook(){const t=this.sensitivity*25e-5,e=[this.lookX*t,this.lookY*t*(this.invertY?-1:1)];return this.lookX=this.lookY=0,e}setupTouch(t){t.hidden=!1;const e=t.querySelector("#joystick"),n=t.querySelector("#joystick-knob");let s=null,r=null,o={x:0,y:0,t:0},a={x:0,y:0},c=0,l=!1,h=!1,u={x:0,y:0};const f=.15,d=.32,m=p=>{const M=e.getBoundingClientRect().width/2;let b=(p.clientX-u.x)/(M*.8),v=(p.clientY-u.y)/(M*.8);const E=Math.min(1,Math.hypot(b,v));if(E<f)b=v=0;else{let T=Math.atan2(v,b);const S=Math.round(T/(Math.PI/2))*(Math.PI/2);Math.abs(T-S)<d&&(T=S);const L=(E-f)/(1-f);b=Math.cos(T)*L,v=Math.sin(T)*L}this.stick={x:b,y:v},n.style.transform=`translate(${b*M*.6}px, ${v*M*.6}px)`};e.addEventListener("touchstart",p=>{p.preventDefault();const M=p.changedTouches[0];s=M.identifier;const b=e.getBoundingClientRect(),v=b.left+b.width/2,E=b.top+b.height/2;u=Math.hypot(M.clientX-v,M.clientY-E)<b.width/4?{x:M.clientX,y:M.clientY}:{x:v,y:E},m(M)}),this.canvas.addEventListener("touchstart",p=>{if(p.preventDefault(),r!==null||!this.active)return;const M=p.changedTouches[0];r=M.identifier,o={x:M.clientX,y:M.clientY,t:performance.now()},a={x:M.clientX,y:M.clientY},h=!1,l=!1,clearTimeout(c),c=window.setTimeout(()=>{r!==null&&!h&&(l=!0,this.h.attackStart())},280)}),window.addEventListener("touchmove",p=>{for(const M of Array.from(p.changedTouches))M.identifier===s?m(M):M.identifier===r&&this.active&&(this.lookX+=(M.clientX-a.x)*2.2,this.lookY+=(M.clientY-a.y)*2.2,a={x:M.clientX,y:M.clientY},Math.hypot(M.clientX-o.x,M.clientY-o.y)>14&&(h=!0))},{passive:!0});const _=p=>{for(const M of Array.from(p.changedTouches))M.identifier===s&&(s=null,this.stick={x:0,y:0},n.style.transform=""),M.identifier===r&&(r=null,clearTimeout(c),l?this.h.attackEnd():!h&&performance.now()-o.t<280&&this.active&&(this.h.useStart(),this.h.useEnd()),l=!1)};window.addEventListener("touchend",_),window.addEventListener("touchcancel",_);const g=(p,M,b=()=>{})=>{const v=t.querySelector(p);if(!v)return;v.addEventListener("touchstart",T=>{T.preventDefault(),T.stopPropagation(),v.classList.add("pressed"),M()});const E=T=>{T.preventDefault(),v.classList.remove("pressed"),b()};v.addEventListener("touchend",E),v.addEventListener("touchcancel",E)};g("#btn-jump",()=>this.touchJump=!0,()=>this.touchJump=!1),g("#btn-down",()=>this.touchDown=!0,()=>this.touchDown=!1),g("#btn-sneak",()=>{var p;this.touchSneak=!this.touchSneak,(p=t.querySelector("#btn-sneak"))==null||p.classList.toggle("active",this.touchSneak)}),g("#btn-fly",()=>this.h.toggleFly()),g("#btn-attack",()=>this.h.attackStart(),()=>this.h.attackEnd()),g("#btn-use",()=>this.h.useStart(),()=>this.h.useEnd()),g("#btn-chat",()=>this.h.chat("")),g("#btn-inventory",()=>this.h.inventory()),g("#btn-drop",()=>this.h.drop(!1)),g("#btn-pause",()=>this.h.pause())}}class qb{constructor(){w(this,"slots",Lr(Cr));w(this,"armor",Lr(ul));w(this,"selected",0);w(this,"onChange",()=>{});w(this,"onOverflow")}load(t,e,n){this.slots=id(t,Cr),this.armor=id(e,ul),this.selected=Math.max(0,Math.min(zi-1,n|0)),this.changed()}changed(){this.onChange()}get held(){return this.slots[this.selected]}set held(t){this.slots[this.selected]=t&&t.count>0?t:null,this.changed()}select(t){this.selected=(t%zi+zi)%zi,this.changed()}add(t){const e=fi(this.slots,t);return this.changed(),e}consumeHeld(t=1){const e=this.held;e&&(e.count-=t,this.held=e.count>0?e:null)}damageHeld(t=1){var s;const e=this.held;if(!e||!((s=ge(e.id))!=null&&s.durability))return!1;const n=sd(e,t);return this.held=n,n===null}replaceHeld(t){var n;const e=this.held;e&&e.count>1?(e.count--,fi(this.slots,t)>0&&((n=this.onOverflow)==null||n.call(this,t)),this.changed()):this.held=t}armorPoints(){return this.armor.reduce((t,e)=>{var n,s;return t+(e?((s=(n=ge(e.id))==null?void 0:n.armor)==null?void 0:s.points)??0:0)},0)}damageArmor(t){const e=Math.max(1,Math.floor(t/4));let n=!1;this.armor=this.armor.map(s=>s&&(n=!0,sd(s,e))),n&&this.changed()}takeAll(){const t=[...this.slots,...this.armor].filter(e=>!!e).map(e=>({...e}));return this.slots=Lr(Cr),this.armor=Lr(ul),this.changed(),t}count(t){return this.slots.reduce((e,n)=>e+(n&&n.id===t?n.count:0),0)}takeOne(t){for(let e=Cr-1;e>=0;e--){const n=this.slots[e];if(n&&n.id===t)return n.count--,n.count<=0&&(this.slots[e]=null),this.changed(),!0}return!1}}function Da(i,t,e,n,s){const r=i[t];if(!e){if(!r)return null;if(n){const o=Math.ceil(r.count/2),a=r.count-o;return i[t]=a>0?{...r,count:a}:null,{...r,count:o}}return i[t]=null,r}if(s&&!s(e))return e;if(!r)return n?(i[t]={...e,count:1},e.count>1?{...e,count:e.count-1}:null):(i[t]=e,null);if(c0(r,e)){const o=ps(r.id),a=Math.min(n?1:e.count,o-r.count);return a<=0?e:(i[t]={...r,count:r.count+a},e.count-a>0?{...e,count:e.count-a}:null)}return i[t]=e,r}const $b={planks:[C.OAK_PLANKS,C.BIRCH_PLANKS,C.SPRUCE_PLANKS],log:[C.OAK_LOG,C.BIRCH_LOG,C.SPRUCE_LOG],coal:[j.COAL,j.CHARCOAL],wool:[C.WHITE_WOOL,C.RED_WOOL,C.PINK_WOOL,C.YELLOW_WOOL,C.GREEN_WOOL,C.BLUE_WOOL,C.PURPLE_WOOL,C.BLACK_WOOL]},ac=(i,t)=>typeof i=="number"?i===t:$b[i].includes(t),jb=ac,Po=[],ie=(i,t,e,n=1)=>Po.push({kind:"shaped",pattern:i,keys:t,result:Fe(e,n)}),ai=(i,t,e=1)=>Po.push({kind:"shapeless",ingredients:i,result:Fe(t,e)});ai([C.OAK_LOG],C.OAK_PLANKS,4);ai([C.BIRCH_LOG],C.BIRCH_PLANKS,4);ai([C.SPRUCE_LOG],C.SPRUCE_PLANKS,4);ie(["#","#"],{"#":"planks"},j.STICK,4);ie(["##","##"],{"#":"planks"},C.CRAFTING_TABLE);ie(["C","S"],{C:"coal",S:j.STICK},C.TORCH,4);ie(["###","# #","###"],{"#":"planks"},C.CHEST);ie(["###","# #","###"],{"#":C.COBBLESTONE},C.FURNACE);ie(["S S","SSS","S S"],{S:j.STICK},C.LADDER,3);ie(["##","##","##"],{"#":"planks"},j.OAK_DOOR,3);ie(["#S#","#S#"],{"#":"planks",S:j.STICK},C.OAK_FENCE,3);ie(["###"],{"#":"planks"},C.OAK_SLAB,6);ie(["###"],{"#":C.COBBLESTONE},C.COBBLESTONE_SLAB,6);ie(["###"],{"#":C.STONE},C.STONE_SLAB,6);ie(["#  ","## ","###"],{"#":"planks"},C.OAK_STAIRS,4);ie(["#  ","## ","###"],{"#":C.COBBLESTONE},C.COBBLESTONE_STAIRS,4);ie(["#  ","## ","###"],{"#":C.STONE_BRICKS},C.STONE_BRICK_STAIRS,4);ie(["WWW","###"],{W:"wool","#":"planks"},j.BED);ie(["###","###"],{"#":"planks"},C.OAK_TRAPDOOR,2);ie(["S#S","S#S"],{"#":"planks",S:j.STICK},C.OAK_FENCE_GATE);ie(["###","BBB","###"],{"#":"planks",B:j.BOOK},C.BOOKSHELF);ie(["###","###"],{"#":C.GLASS},C.GLASS_PANE,16);ie(["P","T"],{P:C.PUMPKIN,T:C.TORCH},C.JACK_O_LANTERN);ie(["###"],{"#":C.SUGAR_CANE},j.PAPER,3);ai([j.PAPER,j.PAPER,j.PAPER,j.LEATHER],j.BOOK);ie(["##","##"],{"#":C.SAND},C.SANDSTONE);ie(["##","##"],{"#":C.STONE},C.STONE_BRICKS,4);ie(["##","##"],{"#":j.STRING},C.WHITE_WOOL);ie(["GSG","SGS","GSG"],{G:j.GUNPOWDER,S:C.SAND},C.TNT);ie(["I I"," I "],{I:j.IRON_INGOT},j.BUCKET);ie([" I","I "],{I:j.IRON_INGOT},j.SHEARS);ai([j.IRON_INGOT,j.FLINT],j.FLINT_AND_STEEL);ie([" #S","# S"," #S"],{"#":j.STICK,S:j.STRING},j.BOW);ie(["F","#","E"],{F:j.FLINT,"#":j.STICK,E:j.FEATHER},j.ARROW,4);ie(["WWW"],{W:j.WHEAT},j.BREAD);ai([j.BONE],j.BONE_MEAL,3);ai([C.POPPY],j.RED_DYE);ai([C.DANDELION],j.YELLOW_DYE);ai([C.WHITE_WOOL,j.RED_DYE],C.RED_WOOL);ai([C.WHITE_WOOL,j.YELLOW_DYE],C.YELLOW_WOOL);ai([C.WHITE_WOOL,j.RED_DYE,j.BONE_MEAL],C.PINK_WOOL);for(const[i,t]of[[j.IRON_INGOT,C.IRON_BLOCK],[j.GOLD_INGOT,C.GOLD_BLOCK],[j.DIAMOND,C.DIAMOND_BLOCK]])ie(["###","###","###"],{"#":i},t),ai([t],i,9);const Zb=["planks",C.COBBLESTONE,j.IRON_INGOT,j.GOLD_INGOT,j.DIAMOND];wp.forEach((i,t)=>{const e=Zb[t],n=300+t*5;ie(["XXX"," # "," # "],{X:e,"#":j.STICK},n),ie(["XX","X#"," #"],{X:e,"#":j.STICK},n+1),ie(["X","#","#"],{X:e,"#":j.STICK},n+2),ie(["X","X","#"],{X:e,"#":j.STICK},n+3),ie(["XX"," #"," #"],{X:e,"#":j.STICK},n+4)});const Jb=[j.LEATHER,j.IRON_INGOT,j.GOLD_INGOT,j.DIAMOND];Jb.forEach((i,t)=>{const e=330+t*4;ie(["XXX","X X"],{X:i},e),ie(["X X","XXX","XXX"],{X:i},e+1),ie(["XXX","X X","X X"],{X:i},e+2),ie(["X X","X X"],{X:i},e+3)});function Qb(i,t){const e=i.length/t;let n=t,s=e,r=-1,o=-1;const a=[];for(let h=0;h<e;h++)for(let u=0;u<t;u++){const f=i[h*t+u];f&&(a.push(f.id),n=Math.min(n,u),r=Math.max(r,u),s=Math.min(s,h),o=Math.max(o,h))}if(!a.length)return null;const c=r-n+1,l=o-s+1;for(const h of Po){if(h.kind==="shapeless"){if(h.ingredients.length!==a.length)continue;const f=[...a];if(h.ingredients.every(m=>{const _=f.findIndex(g=>ac(m,g));return _<0?!1:(f.splice(_,1),!0)}))return h;continue}if(!(Math.max(...h.pattern.map(f=>f.length))!==c||h.pattern.length!==l))for(const f of[!1,!0]){let d=!0;for(let m=0;m<l&&d;m++)for(let _=0;_<c&&d;_++){const g=h.pattern[m][f?c-1-_:_]??" ",p=i[(s+m)*t+n+_];g===" "?d=!p:d=!!p&&ac(h.keys[g],p.id)}if(d)return h}}return null}function bl(i,t){const e=new Array(t*t).fill(null);return i.kind==="shapeless"?i.ingredients.length>e.length?null:(i.ingredients.forEach((s,r)=>e[r]=s),e):Math.max(...i.pattern.map(s=>s.length))>t||i.pattern.length>t?null:(i.pattern.forEach((s,r)=>{for(let o=0;o<s.length;o++)s[o]!==" "&&(e[r*t+o]=i.keys[s[o]])}),e)}function tS(i){if(i.kind==="shapeless")return[...i.ingredients];const t=[];for(const e of i.pattern)for(const n of e)n!==" "&&t.push(i.keys[n]);return t}function gd(i,t){const e=t.filter(n=>!!n).map(n=>({id:n.id,count:n.count}));for(const n of tS(i)){const s=e.find(r=>r.count>0&&ac(n,r.id));if(!s)return!1;s.count--}return!0}const eS={[C.IRON_ORE]:Fe(j.IRON_INGOT),[C.GOLD_ORE]:Fe(j.GOLD_INGOT),[C.DIAMOND_ORE]:Fe(j.DIAMOND),[C.COAL_ORE]:Fe(j.COAL),[C.SAND]:Fe(C.GLASS),[C.COBBLESTONE]:Fe(C.STONE),[C.OAK_LOG]:Fe(j.CHARCOAL),[C.BIRCH_LOG]:Fe(j.CHARCOAL),[C.SPRUCE_LOG]:Fe(j.CHARCOAL),[j.PORKCHOP]:Fe(j.COOKED_PORKCHOP),[j.BEEF]:Fe(j.STEAK),[j.CHICKEN]:Fe(j.COOKED_CHICKEN),[j.MUTTON]:Fe(j.COOKED_MUTTON)},nS=i=>{var t;return((t=ge(i))==null?void 0:t.fuel)??0},k=16,Js=[255,255,255],cc=[0,0,0],pt=(...i)=>i.map(U);function Tt(i,t){const e=Math.round(t);return i[e<0?0:e>=i.length?i.length-1:e]}function Tu(i,t,e){if(!e)return i[Math.min(i.length-1,Math.max(0,Math.floor(t*i.length)))];let n=0;for(const r of e)n+=r;let s=0;for(let r=0;r<i.length;r++)if(s+=e[r]/n,t<s)return i[r];return i[i.length-1]}const Ce=(i,t)=>t[Math.floor(i()*t.length)],Be=(i,t,e)=>dn(i,1+(t()-.5)*e),Au=(i,t)=>(t%k+k)%k*k+(i%k+k)%k,lc=(i,t)=>{const e=Math.abs(i-t)%k;return Math.min(e,k-e)},_d=i=>i*i*(3-2*i);function we(i,t,e=t){const n=Array.from({length:t*e},()=>i()),s=(r,o)=>n[(o%e+e)%e*t+(r%t+t)%t];return(r,o)=>{const a=(r+.5)/k*t-.5,c=(o+.5)/k*e-.5,l=Math.floor(a),h=Math.floor(c),u=_d(a-l),f=_d(c-h),d=s(l,h)+(s(l+1,h)-s(l,h))*u,m=s(l,h+1)+(s(l+1,h+1)-s(l,h+1))*u;return d+(m-d)*f}}function on(i){const t=new Float32Array(k*k);for(let s=0;s<k;s++)for(let r=0;r<k;r++)t[s*k+r]=i(r,s);const e=Array.from({length:k*k},(s,r)=>r).sort((s,r)=>t[s]-t[r]),n=new Float32Array(k*k);return e.forEach((s,r)=>n[s]=(r+.5)/(k*k)),n}function Un(i,t,e,n){for(let s=0;s<k;s++)for(let r=0;r<k;r++)i.set(r,s,Tu(t,e[s*k+r],n))}function Ec(i,t,e,n=.85,s=.3){const r=[];for(let a=0;a<e;a++)for(let c=0;c<t;c++)r.push([(c+.5+(i()-.5)*n)*k/t,(a+.5+(i()-.5)*n)*k/e,1+(i()-.5)*s]);const o=new Int16Array(k*k);for(let a=0;a<k;a++)for(let c=0;c<k;c++){let l=1/0;r.forEach(([h,u,f],d)=>{const m=Math.hypot(lc(c+.5,h),lc(a+.5,u))/f;m<l&&(l=m,o[a*k+c]=d)})}return{count:r.length,at:(a,c)=>o[Au(a,c)]}}function si(i,t,e,n,s=0,r=0){e.forEach((o,a)=>{for(let c=0;c<o.length;c++){const l=n[o[c]];l&&i.set(s+c,r+a,Array.isArray(l[0])?Ce(t,l):l)}})}function C0(i){let t=i>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function ms(i,t,e,n,s,r,o,a){for(let c=s;c<=o;c++){let l=n;for(;l<=r;){const h=2+Math.floor(t()*5),u=(t()-.5)*1.6;for(let f=0;f<h&&l<=r;f++,l++)i.set(l,c,Tt(e,a+u+(t()<.07?-1:0)))}}}function L0(i,t,e){for(let n=0;n<k;n++)i.set(n,0,Ce(t,e)),i.set(n,k-1,Ce(t,e)),i.set(0,n,Ce(t,e)),i.set(k-1,n,Ce(t,e))}const iS=pt("#5b3d27","#69472e","#775236","#845d3f","#916848","#a07553"),D0=pt("#3c7322","#468229","#509030","#5a9d37","#65a93f","#73b649"),P0=pt("#d6e1e8","#e1eaef","#eaf1f5","#f3f8fa","#fbfdfe");function Sl(i,t){const e=we(t,8);Un(i,iS,on((n,s)=>e(n,s)*.45+t()*.7),[1,2,3,3,2,1]);for(let n=0;n<8;n++)i.set(t()*k,t()*k,t()<.5?U("#ad855b"):U("#47301f"))}function sS(i,t){const e=we(t,8);Un(i,D0,on((n,s)=>e(n,s)*.35+t()*.8),[1,2,3,3,2,1.2])}function vd(i,t,e,n,s){for(let r=0;r<k;r++){let o=s+(t()<.5?1:0);t()<.22&&(o+=1+Math.floor(t()*2));for(let a=0;a<o;a++)i.set(r,a,Tt(e,1+t()*(e.length-1.5)-(a===o-1?1:0)));i.set(r,o-1,t()<.6?n:e[0]),i.set(r,o,dn(i.get(r,o),.72))}}function rS(i,t){const e=pt("#24160a","#2f1d0e","#3a2614","#45301a","#513a21","#5e4428","#6c4f31"),n=we(t,8);Un(i,e.slice(2),on((r,o)=>n(r,o)*.45+t()*.8),[1,2,3,2,1]);const s=we(t,4,1);for(let r=0;r<4;r++)for(let o=0;o<k;o++){if(t()<.15)continue;const a=r*4+3+(s(o,0)>.55?1:0);i.set(o,a,Tt(e,t()*1.6)),t()<.5&&i.set(o,a-1,Tt(e,2+t()))}for(let r=0;r<9;r++)i.set(t()*k,t()*k,t()<.5?e[6]:U("#7a5a3c"))}const El=pt("#5e5e5e","#686868","#717171","#7a7a7a","#838383","#8d8d8d","#979797");function I0(i,t){const e=we(t,4),n=we(t,8);Un(i,El,on((s,r)=>e(s,r)*.15+n(s,r)*.4+t()*.5),[1,2,3,4,3,2,1]);for(let s=0;s<8;s++){const r=Math.floor(t()*k),o=Math.floor(t()*k),a=2+Math.floor(t()*3),c=t()<.6?El[1]:El[5];for(let l=0;l<a;l++)i.set(r+l,o,c)}}const xd=[[[0,0],[1,0],[0,1],[1,1],[2,1]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[1,0],[1,1],[2,1],[2,2],[1,2]],[[1,0],[2,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[1,0],[0,1],[1,1],[2,1],[1,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[3,1],[1,2],[2,2]]];function Pa(i,t,e,n=6){I0(i,t);const s=[];for(let r=0;s.length<n&&r<400;r++){const o=Math.floor(t()*k),a=Math.floor(t()*k);if(s.some(([h,u])=>Math.max(lc(h,o),lc(u,a))<5))continue;s.push([o,a]);const c=xd[Math.floor(t()*xd.length)],l=(h,u)=>c.some(([f,d])=>f===h&&d===u);for(const[h,u]of c)l(h+1,u)||i.set(o+h+1,a+u,dn(i.get(o+h+1,a+u),.8)),l(h,u+1)||i.set(o+h,a+u+1,dn(i.get(o+h,a+u+1),.8));for(const[h,u]of c){const f=!l(h,u-1)||!l(h-1,u),d=!l(h,u+1)||!l(h+1,u),m=f&&!d?e[2]:d&&!f?e[0]:e[1];i.set(o+h,a+u,Be(m,t,.08))}}}const oS=pt("#4a4a4a","#585858","#666666","#757575","#848484","#939393","#a3a3a3"),aS=pt("#303030","#383838","#404040");function N0(i,t){const e=Ec(t,3,3,.9,.35),n=Array.from({length:e.count},()=>t()),s=new Uint8Array(k*k);for(let o=0;o<k;o++)for(let a=0;a<k;a++){const c=e.at(a,o);(e.at(a+1,o)!==c||e.at(a,o+1)!==c)&&(s[o*k+a]=1)}const r=(o,a)=>s[Au(o,a)]===1;for(let o=0;o<k;o++)for(let a=0;a<k;a++){if(r(a,o)){i.set(a,o,Ce(t,aS));continue}let c=1.4+n[e.at(a,o)]*2.8+(t()-.5)*1.4;(r(a-1,o)||r(a,o-1))&&(c+=1.4),(r(a+1,o)||r(a,o+1))&&(c-=1.2),i.set(a,o,Tt(oS,c))}}function cS(i,t){const e=pt("#2f4a1c","#3a5b23","#466c2a","#537d32","#618e3b","#6f9d45");N0(i,t);const n=we(t,4),s=on((r,o)=>n(r,o)+t()*.35);for(let r=0;r<k;r++)for(let o=0;o<k;o++){if(s[r*k+o]<.6)continue;const[a,c,l]=i.get(o,r);i.set(o,r,Tt(e,((a+c+l)/3-50)/21))}}function lS(i,t){const e=pt("#5c5c5c","#676767","#727272","#7c7c7c","#868686","#919191","#9c9c9c"),n=we(t,8),s=on((r,o)=>n(r,o)*.5+t()*.6);for(let r=0;r<k;r++)for(let o=0;o<k;o++){const a=r<8?0:1,c=(o+(a?8:0))%k,l=r%8;if(l===7||c===15){i.set(o,r,Be(U("#454545"),t,.12));continue}let h=1.6+s[r*k+o]*2.8;l===0||c===0?h+=1.5:(l===6||c===14)&&(h-=1.3),i.set(o,r,Tt(e,h))}for(let r=0;r<2;r++){let o=2+Math.floor(t()*11),a=1+Math.floor(t()*4)+(r?8:0);for(let c=0;c<3;c++)i.set(o,a,U("#555555")),o+=t()<.5?1:0,a+=1}}function Md(i,t){const e=pt("#999999","#a0a0a0","#a6a6a6","#acacac","#b2b2b2"),n=we(t,8);Un(i,e,on((s,r)=>n(s,r)*.3+t()),[1,2,3,2,1])}const hS=pt("#151515","#252525","#353535","#464646","#575757","#6a6a6a","#808080");function uS(i,t){const e=we(t,4),n=we(t,8);Un(i,hS,on((s,r)=>e(s,r)*.5+n(s,r)*.5+t()*.45),[2,2,2,2,2,1.5,1])}function fS(i,t){const e=pt("#0b0814","#120d1d","#1a1428","#231b35","#2e2444","#3c2f59","#54427c"),n=we(t,4),s=we(t,8);Un(i,e,on((r,o)=>n(r,o)*.45+s(r,o)*.35+t()*.3),[3,3,3,2,1.6,1,.5]);for(let r=0;r<4;r++){const o=Math.floor(t()*k),a=Math.floor(t()*k);i.set(o,a,U("#6b56a0")),i.set(o+1,a+1,U("#3c2f59"))}}const dS=pt("#cbbf8b","#d4c995","#dbd19f","#e2d9a9","#e9e1b4"),Ru=pt("#bcae76","#c6b880","#d0c28a","#d8cb94","#dfd39e","#e7ddab");function pS(i,t){const e=we(t,8);Un(i,dS,on((n,s)=>e(n,s)*.3+t()),[1,2,3,2,1]);for(let n=0;n<10;n++)i.set(t()*k,t()*k,t()<.6?U("#b8aa76"):U("#f2ecca"))}function mS(i,t){const e=pt("#4f4a48","#5e5855","#6d6763","#7c7672","#8b8581","#9b9591","#aba5a1"),n=pt("#54473f","#63554c","#72635a","#827268","#918176","#a09084","#ae9f93"),s=Ec(t,5,5,.95,.5),r=Array.from({length:s.count},()=>2+t()*3.5),o=Array.from({length:s.count},()=>t()<.28);for(let a=0;a<k;a++)for(let c=0;c<k;c++){const l=s.at(c,a),h=s.at(c+1,a)!==l||s.at(c,a+1)!==l,u=s.at(c-1,a)!==l||s.at(c,a-1)!==l,f=r[l]+(t()-.5)*.9+(u?1:0)-(h?2.2:0);i.set(c,a,Tt(o[l]?n:e,f))}}function gS(i,t){const e=we(t,2,8),n=on((s,r)=>e(s,r)*.6+t()*.5);for(let s=0;s<k;s++)for(let r=0;r<k;r++){let o=1.6+n[s*k+r]*2.6;s<=1&&(o+=1.4),(s===2||s===13)&&(o-=.7),(s===3||s===12)&&(o=.2+t()*.6),s===15&&(o-=1.4),i.set(r,s,Tt(Ru,o))}}function _S(i,t){const e=we(t,8);Un(i,Ru.slice(2),on((n,s)=>e(n,s)*.3+t()),[1,3,3,1])}function vS(i,t){const e=we(t,4);Un(i,Ru.slice(0,5),on((n,s)=>e(n,s)*.5+t()*.8),[1,2,3,3,2]);for(let n=0;n<5;n++){let s=Math.floor(t()*k),r=Math.floor(t()*k);for(let o=0;o<3;o++)i.set(s,r,U("#a99a63")),s+=t()<.5?1:-1,r+=t()<.5?1:0}}function xS(i,t){const e=we(t,8);Un(i,P0,on((n,s)=>e(n,s)*.4+t()*.8),[1,2,3,4,3])}function MS(i,t){const e=pt("#729ce8","#7fa7ec","#8db2f0","#9cbdf4","#aecaf7"),n=we(t,4),s=on((r,o)=>n(r,o)*.55+t()*.6);for(let r=0;r<k;r++)for(let o=0;o<k;o++){const a=s[r*k+o];i.set(o,r,Tu(e,a),Math.round(190+a*14))}for(let r=0;r<4;r++){let o=Math.floor(t()*k),a=Math.floor(t()*k);const c=3+Math.floor(t()*4);for(let l=0;l<c;l++)i.set(o,a,U("#d6e6fd"),208),o+=1,a-=t()<.7?1:0}}const Jn={ramp:pt("#7d5f36","#8c6b3e","#9b7847","#a98551","#b6915b","#c29d65"),gap:U("#5c4426")},yS={ramp:pt("#a5925c","#b3a068","#c0ad74","#cab87f","#d4c389","#ddcd94"),gap:U("#86744a")},bS={ramp:pt("#47321e","#523a23","#5d4228","#684b2d","#735333","#7e5c39"),gap:U("#2f2116")},yd={ramp:pt("#6a4217","#784b1b","#875520","#955f26","#a2692c","#ae7434"),gap:U("#432a0f")};function Xa(i,t,e){const n=(e.ramp.length-1)/2;let s=Math.floor(t()*k);for(let r=0;r<4;r++){const o=r*4,a=n+(t()-.5)*1.1;ms(i,t,e.ramp,0,o,k-1,o,a+.7),ms(i,t,e.ramp,0,o+1,k-1,o+1,a),ms(i,t,e.ramp,0,o+2,k-1,o+2,a-.7);for(let c=0;c<k;c++)i.set(c,o+3,Be(e.gap,t,.12));for(let c=0;c<3;c++)i.set(s,o+c,bn(e.gap,e.ramp[1],.45));s=(s+5+Math.floor(t()*7))%k}}function bd(i,t,e){const n=e.length,s=[];for(;s.length<k;){const r=2+Math.floor(t()*2),o=n-2+(t()-.5)*1.4;for(let a=0;a<r;a++)s.push(o-(a===0?-.3:a===r-1?1.3:.3));s.push(.3+t()*.9)}for(let r=0;r<k;r++){let o=0;for(let a=0;a<k;a++)t()<.2&&(o=(t()-.5)*2),i.set(r,a,Tt(e,s[r]+o))}for(let r=0;r<5;r++){const o=Math.floor(t()*k),a=Math.floor(t()*k);i.set(o,a,e[0]),i.set(o,a+1,e[1])}}function wl(i,t,e,n){for(let s=0;s<k;s++)for(let r=0;r<k;r++){if(r===0||s===0||r===k-1||s===k-1){i.set(r,s,Tt(n,1+t()*2.5));continue}const o=Math.abs(r-7.5),a=Math.abs(s-7.5),c=.45*Math.max(o,a)+.55*Math.hypot(o,a)+(t()-.5)*.3;let l;Math.max(o,a)>6?l=bn(e[0],n[n.length-1],.35):c<1.2?l=e[0]:l=c%2.2<.85?e[0]:c%2.2<1.5?e[1]:e[2],i.set(r,s,Be(l,t,.06))}}function SS(i,t){const e=pt("#b4b1a8","#c3c0b7","#d1cfc6","#dddbd3","#e8e6df"),n=pt("#1f1f1f","#2c2c2c","#3a3a3a"),s=we(t,2,8);Un(i,e,on((r,o)=>s(r,o)*.5+t()*.6),[1,2,3,3,2]);for(let r=0;r<9;r++){const o=Math.floor(t()*k),a=Math.floor(t()*k),c=2+Math.floor(t()*4);for(let l=0;l<c;l++)i.set(o+l,a,Ce(t,n));if(c>3&&t()<.5)for(let l=1;l<c-1;l++)i.set(o+l,a+1,Ce(t,n))}}const Sd=pt("#382916","#45331c","#523d23","#5f472a","#6c5131","#7a5d39"),Ed=pt("#21160b","#2a1d0f","#342413","#3e2c18","#48331d","#533c23"),ES=pt("#9d9a91","#c3c0b7","#d1cfc6","#e2e0d8");function Tl(i,t,e,n=.18){const s=Ec(t,6,6,.9,.4),r=Array.from({length:s.count},()=>1.5+t()*(e.length-2.5)),o=new Float32Array(k*k);for(let h=0;h<k;h++)for(let u=0;u<k;u++){const f=s.at(u,h),d=s.at(u+1,h)!==f||s.at(u,h+1)!==f,m=s.at(u-1,h)!==f||s.at(u,h-1)!==f;i.set(u,h,Tt(e,r[f]+(t()-.5)*1.2+(m?1:0)-(d?1.3:0))),o[h*k+u]=(d?.3:0)+t()}const a=Array.from({length:k*k},(h,u)=>u).sort((h,u)=>o[u]-o[h]),c=Math.round(k*k*n),l=new Uint8Array(k*k);for(let h=0;h<c;h++)l[a[h]]=1;for(let h=0;h<k;h++)for(let u=0;u<k;u++)l[h*k+u]?i.alpha(u,h,0):l[Au(u,h-1)]&&i.set(u,h,dn(i.get(u,h),.78))}const Io=pt("#2c6a1b","#367d21","#418f28","#4ca030","#5ab03b","#69bd47");function wS(i,t){for(let e=0;e<20;e++){let n=1+Math.floor(t()*14);const s=3+Math.floor(t()*12),r=t()<.5?-1:1,o=.3+t()*.4,a=1+t()*3;for(let c=0;c<s&&(c>s*o&&t()<.35&&(n+=r),!(n<0||n>=k));c++)i.set(n,k-1-c,Tt(Io,a+c/s*1.6-.9))}}const U0=[".......g........",".......g........","....G..g..G.....",".....GGg.GG.....","......Ggg.......",".......g........",".......g........"];function TS(i,t){const e={g:Io[2],G:Io[1],Y:pt("#f2d421","#f7dc2c"),y:U("#fff27c"),o:U("#e0a10e")};si(i,t,U0,e,0,9),si(i,t,[".yYY.","yYYYo","YYoYo",".Yoo."],e,5,5)}function AS(i,t){const e={g:Io[2],G:Io[1],R:pt("#e0282a","#d62224"),r:U("#a8141a"),l:U("#ff5a4f"),k:U("#2b0b0b")};si(i,t,U0,e,0,9),si(i,t,[".lRr.","lRRRr","RRkRr","rRRrr",".rrr."],e,5,4)}function RS(i,t){const e={b:pt("#7a5429","#87602f"),B:U("#5e3f1c"),l:U("#9c7440")};si(i,t,["................","..l.........l...","...b.......b..l.",".l..b.....b..b..","..b..b...l..b...","...b.b..b..b....","....bb..b.b..l..",".l...b.b.bb.b...","..b..bbbbb..b...","...bb.bBb..b....",".....bBBb.b.....","......BBbb......",".......BB.......",".......BB.......",".......BB.......",".......BB......."],e)}const CS=pt("#5d4124","#6e4e2c");function Al(i,t,e,n,s){si(i,t,e,{d:n[0],g:[n[1],n[2]],G:[n[3],n[4]],L:n[5],t:s[1],T:s[0]})}const LS=["................","................","......gGg.......","....gGLGGgg.....","...gGLGgGLGg....","..gGGdGGLGGgd...","..gLGgdGgGdGg...","...gGGgGLGgGd...","..dgGdgGGdGGg...","...dgGgtgGgd....",".....dgtTgd.....",".......tT.......",".......tT.......",".......tT.......",".......tT.......","......tTTT......"],DS=["................",".......gG.......",".....gGLGg......","....gGLGGGg.....","...gGGgLGgGd....","...gLGdGGLGg....","....gGGgGGgd....",".....dgGtgd.....","......dgtd......","........t.......",".......Tt.......","........t.......","........t.......",".......tT.......","........t.......",".......ttT......"],PS=["................",".......g........","......gGg.......",".....gGLGd......","......gGd.......","....gGGLGGd.....","...gGLGGGLGd....",".....dgtgd......","...gGGgtGGgd....","..gGLGGtGGLGd...",".gGGgGGtGgGGGd..","....dd.tT.dd....",".......tT.......",".......tT.......",".......tT.......","......tTTT......"];function IS(i){return t=>{const e=C0(99537381),n=pt("#245d15","#2f7419","#3c8a22","#4b9e2d","#5db23a"),s=pt("#6e5016","#8a671f","#a6812a","#bf9a37","#d5b24b","#e6c963"),r=Math.min(1,Math.max(0,(i-3)/4)),o=l=>bn(Tt(n,l),Tt(s,l+.8),r),a=i>=7?s.slice(1):i===6?s.slice(1).map(l=>bn(l,n[3],.3)):s.slice(1).map(l=>bn(l,n[3],.6)),c=9;for(let l=0;l<c;l++){const h=l%2===0;let u=Math.min(k-1,Math.max(0,Math.round(.8+l*1.8+(e()-.5)*.8)));const f=.72+e()*.28,d=Math.max(1,Math.round((1.6+i*1.8)*f)),m=e()<.5?-1:1,_=Math.floor(d*(.45+e()*.3)),g=1+Math.floor(e()*3),p=i>=5?i-2:0,M=h?2.2:1.2;for(let b=0;b<d;b++){const v=k-1-b;if(b===_&&i>=2&&e()<.7&&(u=Math.min(k-1,Math.max(0,u+m))),b>=d-p){const E=(b&1)===0;t.set(u,v,Tt(a,(h?3:2)+(E?1:-1))),(E||b===d-p)&&t.set(u-m,v,Tt(a,(h?2:1)+(E?-1:1))),b===d-1&&t.set(u,v-1,Tt(a,4))}else if(t.set(u,v,o(M+(b%3===0?.6:0))),i>=1&&i<=6&&(b===g||i>=3&&b===g+4)){const E=b===g?-m:m;t.set(u+E,v-1,o(M+1)),i>=2&&t.set(u+2*E,v-2,o(M+1.6))}}}}}function NS(i,t){const e=pt("#1b4716","#255b1d","#306f25","#3c832e","#4a9638","#59a944"),n=[0,2,4,3,1,2,4,3,1,2,4,3,1,3,2,0];for(let s=0;s<k;s++)for(let r=0;r<k;r++)i.set(r,s,Tt(e,n[r]+(t()<.15?-1:0)));for(const[s,r]of[[4,2],[8,6],[12,3],[4,10],[8,13],[12,11]])i.set(s,r,U("#e4e0a6")),i.set(s,r+1,U("#173f12"))}function US(i,t){const e=pt("#1b4716","#255b1d","#306f25","#3c832e","#4a9638","#59a944");for(let n=0;n<k;n++)for(let s=0;s<k;s++){const r=Math.max(Math.abs(s-7.5),Math.abs(n-7.5)),o=r>7?0:r>6?2:Math.floor(r)%2===0?4:3;i.set(s,n,Tt(e,o+(t()<.15?-1:0)))}for(const[n,s]of[[3,3],[12,3],[3,12],[12,12],[7,2],[2,8],[13,7],[8,13]])i.set(n,s,U("#e4e0a6"))}function kS(i,t){const e=pt("#86a85a","#94b567","#a1c174","#adcc82");for(let n=0;n<k;n++)for(let s=0;s<k;s++){const r=Math.max(Math.abs(s-7.5),Math.abs(n-7.5));i.set(s,n,r>7?U("#1b4716"):r>6?U("#306f25"):r>5?U("#4a9638"):Ce(t,e))}for(let n=0;n<6;n++)i.set(4+t()*8,4+t()*8,U("#6c8d44"))}function OS(i,t){const e=pt("#7a3829","#8a4332","#994e3a","#a65843","#b4654f","#c0735c"),n=pt("#958f86","#a29c93","#aea99f");for(let s=0;s<4;s++){const r=s%2?4:0;for(let o=0;o<2;o++){const a=1.2+t()*2.2;for(let c=0;c<4;c++)for(let l=0;l<8;l++){const h=o*8+l+r,u=s*4+c;if(c===3||l===7){i.set(h,u,Ce(t,n));continue}const f=a+(c===0?.9:0)-(c===2||l===6?.8:0)+(t()-.5)*.9;i.set(h,u,Tt(e,f))}}}}function FS(i,t){const e=pt("#8e2626","#2a4c8c","#2d7a39","#8c6a1d","#6a2a7a","#b0802c","#3f6f78","#7a2f4a"),n=pt("#2c1d0c","#352411");ms(i,t,Jn.ramp,0,0,k-1,0,4),ms(i,t,Jn.ramp,0,7,k-1,7,4),ms(i,t,Jn.ramp,0,8,k-1,8,1.5),ms(i,t,Jn.ramp,0,15,k-1,15,1);for(let s=0;s<k;s++)i.set(0,s,Tt(Jn.ramp,3+t())),i.set(k-1,s,Tt(Jn.ramp,1+t()));for(const[s,r]of[[1,6],[9,14]]){for(let a=s;a<=r;a++)for(let c=1;c<k-1;c++)i.set(c,a,Ce(t,n));let o=1;for(;o<k-1;){const a=t()<.2?1:t()<.8?2:3,c=Ce(t,e),l=s+(t()<.35?1:0),h=t()<.6?l+1+Math.floor(t()*3):-1;for(let u=0;u<a&&o<k-1;u++,o++)for(let f=l;f<=r;f++){let d=dn(c,u===0?1.15:u===a-1&&a>1?.8:1);f===l&&(d=dn(d,1.2)),f===h&&(d=bn(d,U("#e2c46a"),.55)),i.set(o,f,d)}t()<.18&&o<k-2&&o++}}}function BS(i,t){const e=pt("#6b4a22","#8c6430","#b0823b","#cf9f48","#e8bb57","#f8d572","#ffe9a3","#fff7d6"),n=Ec(t,4,4,.95,.5),s=Array.from({length:n.count},()=>3+t()*3.5);for(let r=0;r<k;r++)for(let o=0;o<k;o++){const a=n.at(o,r),c=n.at(o+1,r)!==a||n.at(o,r+1)!==a,l=n.at(o-1,r)!==a||n.at(o,r-1)!==a,h=c?t()*2.2:s[a]+(t()-.5)*1.6+(l?1:0);i.set(o,r,Tt(e,h))}}function os(i){const t=U(i),e=[bn(t,cc,.3),bn(t,cc,.15),t,bn(t,Js,.08),bn(t,Js,.18)];return(n,s)=>{const r=we(s,4);for(let o=0;o<k;o++)for(let a=0;a<k;a++){const c=a+o+Math.round(r(a,o)*4)&3,l=c===0?-.9:c===1?.7:0;n.set(a,o,Tt(e,2+l+(s()-.5)*1.1))}}}function Cu(i,t,e){for(let n=0;n<k;n++)for(let s=0;s<k;s++)i.set(s,n,Be(e.base,t,.04));for(let n=0;n<k;n++)i.set(n,0,e.light),i.set(0,n,e.light),i.set(n,k-1,e.dark),i.set(k-1,n,e.dark);for(let n=1;n<k-1;n++)i.set(n,1,e.hi),i.set(1,n,e.hi),i.set(n,k-2,e.shadow),i.set(k-2,n,e.shadow);i.set(k-2,1,e.base),i.set(1,k-2,e.base)}const zS={hi:U("#ffffff"),light:U("#f0f0f0"),base:U("#dadada"),shadow:U("#b2b2b2"),dark:U("#8f8f8f")},Mi={hi:U("#fffbc4"),light:U("#fff09a"),base:U("#f5d33a"),shadow:U("#d4a923"),dark:U("#a77d15")},Ia={hi:U("#e6fffc"),light:U("#b4fbf3"),base:U("#5fe0d6"),shadow:U("#36b3aa"),dark:U("#1d827b")};function GS(i,t){Cu(i,t,zS);for(let e=2;e<k-2;e++)i.set(e,7,U("#bdbdbd")),i.set(e,8,U("#ececec"));for(const[e,n]of[[3,3],[12,3],[3,12],[12,12]])i.set(e,n,U("#a4a4a4")),i.set(e-1,n-1,Js)}function HS(i,t){Cu(i,t,Mi);for(let e=2;e<k-2;e++)for(let n=2;n<k-2;n++){const s=n+e;s===8||s===9?i.set(n,e,bn(Mi.base,Mi.light,s===8?.75:.45)):s===11?i.set(n,e,bn(Mi.base,Mi.light,.3)):s>16&&t()<.12&&i.set(n,e,bn(Mi.base,Mi.shadow,.5))}i.set(10,11,Mi.shadow),i.set(11,11,Mi.shadow),i.set(5,9,Mi.shadow)}function VS(i,t){Cu(i,t,Ia);for(let e=2;e<k-2;e++)for(let n=2;n<k-2;n++){const s=Math.abs(n-7.5)+Math.abs(e-7.5);s>5&&s<6.1?i.set(n,e,e<7.5?Ia.light:Ia.shadow):s<2.1&&i.set(n,e,Ia.hi)}i.set(4,4,Js),i.set(5,3,Js)}function WS(i,t){const e=U("#c63a2c"),n=[1.15,1,.88,.6];for(let r=0;r<k;r++)for(let o=0;o<k;o++)i.set(o,r,Be(dn(e,n[o%4]),t,.06));for(let r=0;r<k;r++){i.set(r,4,U("#9c2c22")),i.set(r,5,U("#d8d8d8"));for(let o=6;o<=10;o++)i.set(r,o,Be(U("#f0f0f0"),t,.04));i.set(r,11,U("#cfcfcf")),i.set(r,12,U("#9c2c22"))}const s=U("#1a1a1a");si(i,t,["###.#..#.###",".#..##.#..#.",".#..#.##..#.",".#..#..#..#.",".#..#..#..#."],{"#":s},2,6)}function wd(i,t,e){const n=U("#6e1d16");for(let s=0;s<k;s++)for(let r=0;r<k;r++)i.set(r,s,Be(n,t,.1));for(let s=0;s<4;s++)for(let r=0;r<4;r++)si(i,t,[".rr.","rRRr","RlRr",".rr."],{r:U("#b8352a"),R:U("#d64a3a"),l:U("#e8705e")},r*4,s*4);e&&(si(i,t,["..kk..",".kgGk.","kgGGgk","kGgGgk",".kgGk.","..kk.."],{k:U("#2a2a2a"),g:U("#6b6b6b"),G:U("#9a9a9a")},5,5),i.set(10,4,U("#9a9a9a")),i.set(11,3,U("#6b6b6b")))}const Tr=pt("#3f2a14","#47301a","#4f361d");function XS(i,t){const e=pt("#8f6b3c","#9d7745","#ab844f","#b89159","#c49d64","#cfa86e");for(let n=0;n<k;n++)for(let s=0;s<k;s++){if(s===0||n===0||s===k-1||n===k-1){i.set(s,n,Ce(t,Tr));continue}if(s%5===0||n%5===0){i.set(s,n,Be(U("#62441f"),t,.1));continue}const r=s%5,o=n%5;let a=2.5+(t()-.5)*1.4;(r===1||o===1)&&(a+=1.3),(r===4||o===4)&&(a-=1.3),i.set(s,n,Tt(e,a))}}function k0(i,t){Xa(i,t,Jn);const e=pt("#6b4a26","#77542c","#835e33");for(let n=0;n<k;n++)i.set(n,0,Ce(t,Tr)),i.set(n,1,Ce(t,e)),i.set(n,2,Ce(t,e)),i.set(n,3,Ce(t,Tr)),i.set(n,k-1,Ce(t,Tr));for(let n=4;n<k;n++)i.set(0,n,Ce(t,Tr)),i.set(1,n,Ce(t,e)),i.set(k-2,n,Ce(t,e)),i.set(k-1,n,Ce(t,Tr))}function YS(i,t){k0(i,t),si(i,t,["..k...k..","..mk.km..","...mkm...","....k....","...b.b...","..b...b..","..b...b..",".bb...bb."],{k:U("#4a4a4a"),m:U("#b5b5b5"),b:U("#5a3a1a")},3,5)}function KS(i,t){k0(i,t);const e={b:U("#4f3215"),B:U("#7a5328"),m:U("#bdbdbd"),M:U("#8f8f8f"),k:U("#4e4e4e")};si(i,t,["...BBB...kMMMk..","..Bb.bB..kmmmk..","..BBBBB....B....","...mmM.....b....","...mmMk....B....","...mmMM....b....","...mmMk....B....","...mmMM....b....","...mMMk....B....","...MMk.....b...."],e,0,5)}const qS=pt("#5b5b5b","#666666","#717171","#7c7c7c","#878787","#929292");function Lu(i,t){const e=we(t,8);Un(i,qS,on((n,s)=>e(n,s)*.4+t()*.8),[1,2,3,3,2,1]);for(let n=0;n<k;n++)i.set(n,0,Be(U("#4c4c4c"),t,.08)),i.set(0,n,Be(U("#4c4c4c"),t,.08)),i.set(n,k-1,Be(U("#3c3c3c"),t,.08)),i.set(k-1,n,Be(U("#3c3c3c"),t,.08));for(let n=1;n<k-1;n++)i.set(n,1,Be(U("#a0a0a0"),t,.06)),i.set(1,n,Be(U("#a0a0a0"),t,.06)),i.set(n,k-2,Be(U("#5e5e5e"),t,.06)),i.set(k-2,n,Be(U("#5e5e5e"),t,.06))}function $S(i,t){Lu(i,t);for(let e=4;e<=11;e++)i.set(e,4,U("#5a5a5a")),i.set(4,e,U("#5a5a5a")),i.set(e,11,U("#9a9a9a")),i.set(11,e,U("#9a9a9a"))}function Td(i){return(t,e)=>{Lu(t,e);for(let s=4;s<=11;s++)t.set(s,3,U("#2f2f2f")),t.set(s,4,U("#232323")),t.set(s,5,U("#a5a5a5"));for(let s=3;s<=12;s++)t.set(s,7,U("#a8a8a8")),t.set(s,14,U("#5a5a5a"));for(let s=8;s<=13;s++){t.set(3,s,U("#4a4a4a")),t.set(12,s,U("#9a9a9a"));for(let r=4;r<=11;r++)t.set(r,s,s===8?U("#0e0e0e"):Be(U("#191919"),e,.2))}if(!i){for(let s=4;s<=11;s++)t.set(s,13,Be(U("#2b2b2b"),e,.2));return}const n=pt("#7a1d06","#b33208","#e0560d","#f78a1b","#fdbb2f","#ffe36a","#fff8cf");for(let s=4;s<=11;s++){const r=2+Math.floor(e()*4);for(let o=0;o<r;o++){const a=13-o;t.set(s,a,Tt(n,6-o/r*5-e()*.8))}t.set(s,13-r,U("#3a1004"))}}}const Ad=pt("#2b1a09","#34200c","#3d260f");function Vh(i,t,e){const n=(yd.ramp.length-1)/2;ms(i,t,yd.ramp,0,0,k-1,k-1,n);for(let s=0;s<k;s++)for(let r=0;r<k;r++){const o=s%5;o===0&&i.set(r,s,dn(i.get(r,s),1.12)),o===4&&i.set(r,s,dn(i.get(r,s),.82))}if(L0(i,t,Ad),e)for(let s=1;s<k-1;s++)i.set(s,5,Ce(t,Ad)),i.set(s,6,dn(i.get(s,6),.8)),i.set(s,4,dn(i.get(s,4),1.1))}function jS(i,t){Vh(i,t,!0),si(i,t,["kkkk","kmMk","kmMk","kMdk","kMMk","kkkk"],{k:U("#2a2a2a"),m:U("#e4e4e4"),M:U("#b0b0b0"),d:U("#3a3a3a")},6,3)}function ZS(i){const t=pt("#5a3d1c","#7a5529","#956a35");for(let e=8;e<k;e++)i.set(7,e,t[2]),i.set(8,e,t[1]);i.set(8,15,t[0]),i.set(7,8,U("#6b4a22")),i.set(8,8,U("#4a3216")),i.set(7,6,U("#ffd84a")),i.set(8,6,U("#ffa62b")),i.set(7,7,U("#fffbe8")),i.set(8,7,U("#ffe066"))}function JS(i,t){const e=pt("#5e4320","#77562b","#8e6935","#a07a40");for(let n=0;n<k;n++)i.set(1,n,Tt(e,2.5+(t()-.5))),i.set(2,n,Tt(e,1.2+(t()-.5))),i.set(13,n,Tt(e,2.5+(t()-.5))),i.set(14,n,Tt(e,1.2+(t()-.5)));for(let n=1;n<k;n+=4){for(let s=3;s<=12;s++)i.set(s,n,Tt(e,3-(t()<.2?1:0))),i.set(s,n+1,Tt(e,1+(t()<.3?1:0)));i.set(2,n,U("#3b2912")),i.set(13,n,U("#3b2912"))}}function Rd(i){const t=pt("#45301a","#4d361d"),e=pt("#674a28","#70522d");return(n,s)=>{for(let r=0;r<k;r++)for(let o=0;o<k;o++){const a=i?r<=2||r===12||r===13:r===6||r===7||r>=13;let c;if(o===0||o===k-1||r===(i?0:k-1))c=Ce(s,t);else if(o===1||o===k-2||a){const l=i?r===2||r===13:r===7||r===14;c=Tt(Jn.ramp,4.2+(s()-.5)*1.2-(o===k-2?1.4:0)-(l?1.6:0))}else{const l=(o-2)%3;c=l===2?Be(U("#6a4e2b"),s,.08):Tt(Jn.ramp,2.3+(l===0?.7:0)+(s()-.5)*1.1)}n.set(o,r,c)}if(i){for(let r=3;r<=11;r++)for(let o=3;o<=12;o++)n.set(o,r,Ce(s,e));for(const r of[4,8])for(const o of[4,9])for(let a=r;a<r+3;a++)for(let c=o;c<o+3;c++)n.set(c,a,cc,0)}else{for(let r=2;r<=4;r++)n.set(13,r,U("#2d2d2d"));n.set(11,3,U("#cfcfcf")),n.set(12,3,U("#8f8f8f")),n.set(11,4,U("#5c4326")),n.set(12,4,U("#5c4326"))}}}const Pr=pt("#7c5a30","#94703f","#aa854f","#bd9862","#cdaa73"),ys=pt("#6f1518","#861b1f","#9e2327","#b42b2e","#c63a3b","#d65050"),yo=pt("#bdbdbd","#d0d0d0","#e1e1e1","#eeeeee","#fafafa");function O0(i,t,e,n){for(let s=e;s<=n;s++)for(let r=1;r<k-1;r++){const o=(r+s)%4===0?-.7:(r-s+k)%4===2?.5:0;i.set(r,s,Tt(ys,2.6+o+(t()-.5)*.8))}}function F0(i,t){for(let e=0;e<k;e++)i.set(0,e,Tt(Pr,3+(t()-.5))),i.set(k-1,e,Tt(Pr,1.5+(t()-.5)))}function QS(i,t){F0(i,t);for(let e=0;e<=5;e++)for(let n=1;n<k-1;n++){const s=e===0||e===5,r=n===1||n===k-2;let o=3.3+(t()-.5)*.6;e===1&&(o+=.8),(s||r)&&(o=1.5),s&&r&&(o=.3),i.set(n,e,Tt(yo,o))}O0(i,t,6,k-1);for(let e=1;e<k-1;e++)i.set(e,6,Tt(yo,2.5+(t()-.5))),i.set(e,7,Tt(ys,1))}function t2(i,t){F0(i,t),O0(i,t,0,k-1);for(let e=1;e<k-1;e++)i.set(e,11,Tt(ys,4.6)),i.set(e,12,Tt(ys,3.6)),i.set(e,13,Tt(ys,.4))}function Na(i){return(t,e)=>{for(let n=0;n<k;n++)i?(t.set(n,7,Tt(yo,4)),t.set(n,8,Tt(yo,3+(e()-.5))),t.set(n,9,Tt(yo,1.6))):(t.set(n,7,Tt(ys,4.5)),t.set(n,8,Tt(ys,2.8+(e()-.5)*.8)),t.set(n,9,Tt(ys,1.5))),t.set(n,10,Tt(Pr,3.8)),t.set(n,11,Tt(Pr,2.5+(e()-.5))),t.set(n,12,Tt(Pr,1));for(let n=13;n<k;n++)for(const s of[0,1,2,13,14,15]){const r=s===0||s===13?2.6:s===2||s===15?.6:1.7;t.set(s,n,Tt(Pr,r))}}}function Cd(i){const t=pt("#2546a9","#2a50b9","#2f5ac6","#3664d0","#3f6fd8"),e=U("#6f97e8"),n=U("#93b4f0");return(s,r)=>{const o=i?we(r,8,2):we(r,4),a=on((c,l)=>o(c,l)*.75+r()*.35);for(let c=0;c<k;c++)for(let l=0;l<k;l++){const h=a[c*k+l];s.set(l,c,Tu(t,h,[1,2,3,2,1]),Math.round(178+h*14))}if(i)for(let c=0;c<9;c++){const l=Math.floor(r()*k),h=Math.floor(r()*k),u=2+Math.floor(r()*4);for(let f=0;f<u;f++)s.set(l,h+f,f===0?n:e,196)}else for(let c=0;c<7;c++){const l=Math.floor(r()*k),h=Math.floor(r()*k),u=3+Math.floor(r()*3);for(let f=0;f<u;f++)s.set(l+f,h+(f===0||f===u-1?0:1),f===1?n:e,196)}}}function Ld(i){const t=pt("#5c1403","#822006","#a72e08","#ca420b","#e35b10","#f27a17","#f99d22","#fdc334","#ffe370","#fff4bf");return(e,n)=>{const s=i?we(n,4,2):we(n,4),r=i?we(n,8,3):we(n,8),o=on((a,c)=>s(a,c)*.6+r(a,c)*.4+n()*.12);Un(e,t,o,[1,1.4,2,3,3.5,3.5,3,2,1.2,.5])}}let Rl=null;function e2(){if(Rl)return Rl;const i=C0(12648430),t=new Uint8Array(k*k),e=[],n=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]],s=(l,h)=>l>=0&&h>=0&&l<k&&h<k,r=(l,h)=>{let u=0;for(const[f,d]of n)s(l+f,h+d)&&t[(h+d)*k+l+f]&&u++;return u>2},o=(l,h,u)=>(l-7.5)*n[u][0]+(h-7.5)*n[u][1]>=-.5,a=(l,h)=>{t[h*k+l]=1,e.push([l,h,180+Math.floor(i()*50)])},c=[];a(7,8);for(const l of[1,3,5,7])c.push({x:7,y:8,d:l,life:4+Math.floor(i()*6)});for(let l=0;e.length<100&&l<5e3;l++){if(!c.length){const[h,u]=e[Math.floor(i()*Math.min(e.length,40))];let f=Math.floor(i()*8);for(;!o(h,u,f);)f=(f+1)%8;c.push({x:h,y:u,d:f,life:3+Math.floor(i()*6)})}for(let h=0;h<c.length;h++){const u=c[h];if(i()<.15){const _=(u.d+(i()<.5?1:7))%8;o(u.x,u.y,_)&&(u.d=_)}const f=i()<.4?(u.d+(i()<.5?1:7))%8:u.d,d=u.x+n[f][0],m=u.y+n[f][1];if(!s(d,m)||t[m*k+d]||r(d,m)||--u.life<0){c.splice(h--,1);continue}if(u.x=d,u.y=m,a(d,m),i()<.1){const _=(u.d+(i()<.5?2:6))%8;o(d,m,_)&&c.push({x:d,y:m,d:_,life:2+Math.floor(i()*4)})}}}return Rl=e,e}const n2=[3,8,14,21,29,38,48,60,74,90];function i2(i){return t=>{const e=e2(),n=Math.min(e.length,n2[i]);for(let s=0;s<n;s++){const[r,o,a]=e[s];t.set(r,o,s%3===0?U("#262626"):U("#121212"),a)}}}const B0=pt("#a4520a","#b65f0e","#c66c12","#d47a18","#e08a22","#eb9a30");function z0(i,t){for(let e=0;e<k;e++)for(let n=0;n<k;n++){const s=n%4,r=s===0?.6:s===2?4.2:2.8;i.set(n,e,Tt(B0,r+(t()-.5)*1.3-(e===0||e===k-1?.8:0)))}}function s2(i,t){for(let n=0;n<k;n++)for(let s=0;s<k;s++){const r=Math.max(Math.abs(s-7.5),Math.abs(n-7.5)),o=Math.floor(r)%3===0?1.2:3.2;i.set(s,n,Tt(B0,o+(t()-.5)*1.2))}const e=pt("#3d4a1c","#4f5f23","#617329");for(let n=6;n<=9;n++)for(let s=6;s<=9;s++)i.set(s,n,Ce(t,e));i.set(6,6,U("#2e3815")),i.set(9,9,U("#2e3815"))}function Dd(i){return(t,e)=>{z0(t,e);const n=(s,r)=>{const o=i?r>=10?U("#ffe46b"):U("#ffbf2e"):U("#2a1404");t.set(s,r,i?bn(o,Js,e()*.25):Be(o,e,.3))};for(const s of[3,10]){n(s+1,4);for(let r=s;r<=s+2;r++)n(r,5);for(let r=s;r<=s+2;r++)n(r,6)}for(let s=3;s<=12;s++)n(s,10);for(let s=2;s<=13;s++)s!==5&&s!==10&&n(s,11);for(let s=3;s<=12;s++)s!==7&&s!==8&&n(s,12);for(let s=5;s<=10;s++)n(s,13)}}function r2(i,t){const e=pt("#5d8a33","#6f9e3c","#84b44a","#98c45a","#aed36f"),n=U("#c9d98c");for(const[s,r,o]of[[3,1,0],[8,0,2],[12,3,1]])for(let a=r;a<k;a++){const c=(a+o)%5===0;i.set(s,a,c?n:Tt(e,3+(t()-.5))),i.set(s+1,a,c?bn(n,e[1],.5):Tt(e,1.4+(t()-.5)))}for(const[s,r,o]of[[2,6,-1],[5,10,1],[10,4,1],[7,12,-1],[14,9,1]])i.set(s,r,e[2]),i.set(s+o,r-1,e[3])}function o2(i,t){for(let e=0;e<k;e++)for(let n=0;n<k;n++)n===0||e===0||n===k-1||e===k-1?i.set(n,e,Tt(Jn.ramp,1+(t()-.5))):n===7||n===8||e===7||e===8||n===1||e===1||n===k-2||e===k-2?i.set(n,e,Tt(Jn.ramp,3.4+(t()-.5)*1.2)):(n===3||n===12)&&(e===3||e===12)?i.set(n,e,U("#5c4426")):i.set(n,e,cc,0);i.set(7,7,U("#4a3216")),i.set(8,8,U("#4a3216"))}const a2={stone:I0,grass_side:(i,t)=>{Sl(i,t),vd(i,t,D0,U("#356a1d"),3)},grass_top:sS,dirt:Sl,cobblestone:N0,oak_planks:(i,t)=>Xa(i,t,Jn),birch_planks:(i,t)=>Xa(i,t,yS),spruce_planks:(i,t)=>Xa(i,t,bS),oak_log:(i,t)=>bd(i,t,Sd),oak_log_top:(i,t)=>wl(i,t,pt("#8a6a3c","#a9864f","#b8955d"),Sd),birch_log:SS,birch_log_top:(i,t)=>wl(i,t,pt("#b49f68","#cdba85","#d9c893"),ES),spruce_log:(i,t)=>bd(i,t,Ed),spruce_log_top:(i,t)=>wl(i,t,pt("#5a3e22","#76552f","#846138"),Ed),oak_leaves:(i,t)=>Tl(i,t,pt("#1f4a17","#29601d","#337223","#3e842a","#4a9531","#58a53b")),birch_leaves:(i,t)=>Tl(i,t,pt("#395c24","#456c2b","#527c33","#5f8c3b","#6d9b44","#7ca94f")),spruce_leaves:(i,t)=>Tl(i,t,pt("#14301d","#1b3d24","#224a2b","#2a5733","#33643b","#3d7044")),sand:pS,gravel:mS,sandstone_side:gS,sandstone_top:_S,sandstone_bottom:vS,glass:i=>{const t=U("#f2fafc"),e=U("#d4e9f0"),n=U("#a8c9d5");for(let s=0;s<k;s++)i.set(s,0,t),i.set(0,s,t),i.set(s,k-1,n),i.set(k-1,s,n);i.set(k-1,0,e),i.set(0,k-1,e);for(const[s,r]of[[3,6],[4,5],[5,4],[6,3],[5,6],[6,5],[10,12],[11,11],[12,10]])i.set(s,r,s+r>15?e:Js)},bedrock:uS,water_flow:Cd(!0),water_still:Cd(!1),lava_flow:Ld(!0),lava_still:Ld(!1),coal_ore:(i,t)=>Pa(i,t,pt("#141414","#262626","#404040")),iron_ore:(i,t)=>Pa(i,t,pt("#9c765e","#cfa486","#ebcdb7")),gold_ore:(i,t)=>Pa(i,t,pt("#b88a10","#f2cc2e","#fff3a0")),diamond_ore:(i,t)=>Pa(i,t,pt("#1b9a94","#4de0e6","#c9fffb"),4),snow:xS,snowy_grass_side:(i,t)=>{Sl(i,t),vd(i,t,P0.slice(1),U("#c3d1d9"),3)},ice:MS,cactus_side:NS,cactus_top:US,cactus_bottom:kS,tall_grass:wS,dandelion:TS,poppy:AS,dead_bush:RS,bricks:OS,stone_bricks:lS,mossy_cobblestone:cS,obsidian:fS,bookshelf:FS,glowstone:BS,wool_white:os("#e9ecec"),wool_red:os("#a12722"),wool_pink:os("#ed8dac"),wool_yellow:os("#f8c527"),wool_green:os("#5e7c16"),wool_blue:os("#35399d"),wool_purple:os("#7a2aac"),wool_black:os("#1d1d21"),crafting_table_side:YS,crafting_table_top:XS,crafting_table_front:KS,furnace_side:Lu,furnace_top:$S,furnace_front:Td(!1),furnace_front_lit:Td(!0),chest_side:(i,t)=>Vh(i,t,!0),chest_top:(i,t)=>Vh(i,t,!1),chest_front:jS,torch:ZS,ladder:JS,door_bottom:Rd(!1),door_top:Rd(!0),stone_slab_side:(i,t)=>{Md(i,t);for(let e=0;e<k;e++)i.set(e,0,U("#bdbdbd")),i.set(e,7,U("#7c7c7c")),i.set(e,8,U("#bdbdbd")),i.set(e,k-1,U("#7c7c7c"))},stone_slab_top:(i,t)=>{Md(i,t),L0(i,t,pt("#7c7c7c","#818181"))},bed_foot_side:Na(!1),bed_foot_top:t2,bed_foot_end:Na(!1),bed_head_side:Na(!1),bed_head_top:QS,bed_head_end:Na(!0),farmland_top:rS,...Object.fromEntries(Array.from({length:8},(i,t)=>[`wheat_${t}`,IS(t)])),oak_sapling:(i,t)=>Al(i,t,LS,pt("#1f4a17","#2c621f","#367425","#41862c","#4d9733","#62ad42"),CS),birch_sapling:(i,t)=>Al(i,t,DS,pt("#395c24","#4a702d","#577f35","#668f3e","#749e47","#88b257"),pt("#3a3a3a","#e0ded6")),spruce_sapling:(i,t)=>Al(i,t,PS,pt("#14301d","#1d4126","#244e2d","#2d5c36","#37693f","#4a7f50"),pt("#2e1f10","#4a3420")),tnt_side:WS,tnt_top:(i,t)=>wd(i,t,!0),tnt_bottom:(i,t)=>wd(i,t,!1),iron_block:GS,gold_block:HS,diamond_block:VS,glass_pane_top:(i,t)=>{for(let e=0;e<k;e++)for(let n=0;n<k;n++)i.set(n,e,Be(U("#cfe3ea"),t,.06))},trapdoor:o2,pumpkin_side:z0,pumpkin_top:s2,pumpkin_face:Dd(!1),jack_o_lantern:Dd(!0),sugar_cane:r2,...Object.fromEntries(Array.from({length:10},(i,t)=>[`destroy_${t}`,i2(t)]))},Pd=9;function Wh(i,t,e,n=()=>!0){t.forEach((s,r)=>{for(let o=0;o<s.length;o++){const a=e[s[o]];a&&n(o)&&i.set(o,r,U(a))}})}function as(i,t){return e=>Wh(e,i,t)}function Cl(i,t,e,n){return s=>{const r=o=>n?o<=4:o>=4;Wh(s,i,e,o=>!r(o)),Wh(s,i,t,r)}}const Ll=[".kkk.kkk.","kWWRkRRRk","kWRRRRRRk","kRRRRRRDk",".kRRRRDk.","..kRRDk..","...kDk...","....k....","........."],Id={k:"#1e0505",W:"#ffc4c4",R:"#e0201f",D:"#a3100f"},Nd={k:"#1e0505",W:"#4a3434",R:"#2f1e1e",D:"#241616"},Dl=["....kkkk.","...kMHMMk","..kMHMMMk","..kMMMMDk",".kWkMMDk.","kWWWkkk..","kWWk.....",".kk......","........."],Ud={k:"#2a1405",M:"#b5642a",H:"#e09a52",D:"#7f3f14",W:"#f2eee4"},kd={k:"#2a1405",M:"#33261b",H:"#45362a",D:"#271c13",W:"#3a3a36"},Pl=["kkk...kkk","kLLkkkLAk","kLAAAAAAk","kkAAAAAkk",".kLAAAAk.",".kAAAADk.",".kAAADDk.",".kkkkkkk.","........."],Od={k:"#1c1c1c",L:"#ffffff",A:"#d6d6d6",D:"#9a9a9a"},Fd={k:"#1c1c1c",L:"#3c3c3c",A:"#2c2c2c",D:"#232323"},c2=["..kkkkk..",".kLLLLLk.","kLWWBBBLk","kLWBBBBLk","kLBBBBBLk","kLBBBBDLk","kLBBBDDLk",".kLLLLLk.","..kkkkk.."],l2=["....k....",".k..L..k.","..L...L..",".........","kL.....Lk",".........","..L...L..",".k..L..k.","....k...."],Bd={k:"#0d2a5e",L:"#8fc3ff",W:"#ffffff",B:"#c9e4ff",D:"#a3cbff"},h2={heart_full:as(Ll,Id),heart_half:Cl(Ll,Id,Nd,!0),heart_empty:as(Ll,Nd),food_full:as(Dl,Ud),food_half:Cl(Dl,Ud,kd,!1),food_empty:as(Dl,kd),armor_full:as(Pl,Od),armor_half:Cl(Pl,Od,Fd,!0),armor_empty:as(Pl,Fd),bubble:as(c2,Bd),bubble_pop:as(l2,Bd)},ri=16,zd=i=>i[0]*.299+i[1]*.587+i[2]*.114;class Ri{constructor(t=ri,e=ri){w(this,"c");w(this,"o");this.w=t,this.h=e,this.c=new Array(t*e).fill(null),this.o=new Array(t*e).fill(null)}inside(t,e){return t>=0&&e>=0&&t<this.w&&e<this.h}put(t,e,n,s=null){this.inside(t,e)&&(this.c[e*this.w+t]=n,this.o[e*this.w+t]=s)}emit(t){for(let e=0;e<this.h;e++)for(let n=0;n<this.w;n++){const s=this.c[e*this.w+n];if(s){t.set(n,e,s);continue}let r=null;for(const[o,a]of[[1,0],[-1,0],[0,1],[0,-1]]){if(!this.inside(n+o,e+a))continue;const c=this.o[(e+a)*this.w+n+o];c&&(!r||zd(c)<zd(r))&&(r=c)}r&&t.set(n,e,r)}}}function G0(i,t,e,n,s,r=0,o=0){e.forEach((a,c)=>{for(let l=0;l<a.length;l++){const h=n[a[l]];if(!h)continue;const u=Array.isArray(h)?h:[h],f=s===null?null:typeof s=="string"?s:s[a[l]]??s["*"]??null;i.put(r+l,o+c,U(u[Math.floor(t()*u.length)]),f?U(f):null)}})}function xe(i,t,e){return(n,s)=>{const r=new Ri(n.width,n.height);G0(r,s,i,t,e),r.emit(n)}}const ti=(i,t,e,n,s)=>({hi:U(i),light:U(t),mid:U(e),dark:U(n),outline:U(s)});function Gi(i,t,e){for(let n=0;n<i.h;n++)for(let s=0;s<i.w;s++){if(!t(s,n))continue;const r=t(s,n-1),o=t(s-1,n),a=!r||!o,c=!t(s,n+1)||!t(s+1,n);let l=a&&!c?e.light:c&&!a?e.dark:e.mid;!r&&!o&&!c&&(l=e.hi),i.put(s,n,l,e.outline)}}const H0=(i,t="#")=>(e,n)=>n>=0&&n<i.length&&e>=0&&i[n][e]===t,Il=ti("#b38b50","#a27c45","#8a6837","#6a4f27","#2a1c0b");function Xh(i,t,e=-11){for(let n=0;n<ri;n++)for(let s=0;s<ri;s++){const r=s-n,o=s+n;(o===15||o===16)&&r>=e&&r<=t&&i.put(s,n,o===15?Il.light:Il.dark,Il.outline)}}const u2=["................","................","...########.....",".....########...",".........####...","..........####..","...........###..","............##..","............##..","............##..","............##..",".............#..",".............#.."];function f2(i,t){const e=i-t,n=i+t;if(n-e<2||e-n>-2)return!1;if(n>=7&&n<=14){const s=14-n,r=n===7?1.2:0;return e>=2-s*.65+r&&e<=4+s*.6-r}return(n===17||n===18)&&Math.abs(e-3)<=1.5}const d2=["................","................","...........####.","..........#####.","..........#####.","..........####..","...........##..."],p2=["................","................",".....########...","....#########...","....##.....##...","....#..........."];function m2(i,t){return e=>{const n=new Ri;if(i==="sword"){const o=(l,h)=>{const u=l-h,f=l+h;return f>=14&&f<=16&&u>=-1&&u<=13-Math.abs(f-15)};Xh(n,-4,-8),Gi(n,o,t),Gi(n,(l,h)=>{const u=l-h,f=l+h;return(u===-2||u===-3)&&f>=11&&f<=20},{...t,hi:t.mid,light:t.mid,mid:t.dark,dark:bn(t.dark,t.outline,.4)}),Gi(n,(l,h)=>{const u=l-h,f=l+h;return(u===-9||u===-10)&&f>=14&&f<=17},t),n.emit(e);return}const s={pickaxe:4,axe:6,shovel:4,hoe:6}[i];Xh(n,s);const r=i==="axe"?f2:H0({pickaxe:u2,shovel:d2,hoe:p2}[i]);Gi(n,r,t),n.emit(e)}}const Ya={wooden:ti("#c9a466","#b8925a","#a5824f","#8b6a3e","#3b2a12"),stone:ti("#b8b8b8","#a4a4a4","#8a8a8a","#6a6a6a","#2c2c2c"),iron:ti("#ffffff","#f2f2f2","#d8d8d8","#a9a9a9","#383838"),golden:ti("#fffbd0","#fbe77a","#f2cf3a","#c99b1b","#4f3604"),diamond:ti("#e8fffc","#b4fbf3","#5fe0d6","#2aa69e","#0c3f3b")},g2=["................","................","................",".....######.....","....########....","...##########...","...##########...","...##########...","...####..####...","...###....###...","...##......##..."],_2=["................","................","..####....####..",".######..######.",".##############.",".##############.",".##.########.##.","...##########...","...##########...","...##########...","...##########...","...##########...","...##########...","....########...."],v2=["................","................","...##########...","...##########...","...####..####...","...####..####...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###...","...###....###..."],x2=["................","................","................","................","................","................","................","...###....###...","...###....###...","...###....###...","...###....###...","..####...####...","..####...####..."],V0={helmet:g2,chestplate:_2,leggings:v2,boots:x2},M2={helmet:["","","","","","....l...........","","...dddddddddd..."],chestplate:["","","","","......dddd......","..l.............","",".......dd.......",".......dd.......",".......dd.......","","","",""],leggings:["","","....l...........","...dddddddddd..."],boots:["","","","","","","","","","","","","..dddd...dddd..."]},y2={leather:ti("#b88148","#a46f3a","#8b5a2b","#6a431f","#2e1b0a"),iron:Ya.iron,golden:Ya.golden,diamond:Ya.diamond};function b2(i,t){const e=V0[i],n=M2[i];return s=>{const r=new Ri,o=H0(e);Gi(r,o,t),n.forEach((a,c)=>{for(let l=0;l<a.length;l++)o(l,c)&&a[l]!=="."&&r.put(l,c,a[l]==="d"?t.dark:t.light,t.outline)}),r.emit(s)}}const S2=i=>{const t=new Ri;Xh(t,9,-9),t.emit(i)},W0=["................","................","................",".......abb......",".....aabbbc.....","....abbbcbbc....","....babbbbcc....","...abbbbbcbcd...","...bbcbbbbccd...","...bbbbcbbccd...","....bbbbbccdd...","....cbccccdd....",".....ccddd......"],E2=xe(W0,{a:"#5c5c5c",b:["#3a3a3a","#363636"],c:"#262626",d:"#171717"},"#080808"),w2=xe(W0,{a:"#6a5646",b:["#45382e","#41352b"],c:"#30271f",d:"#1e1813"},"#0c0907"),X0=["................","................","................","................","................","......hhhhhhh...",".....hlllllllr..","....hlllllllrr..","...ffffffffrr...","...mmmmmmmmr....","...dddddddd....."],T2=xe(X0,{h:"#ffffff",l:"#e8e8e8",r:"#9c9c9c",f:"#d4d4d4",m:"#c2c2c2",d:"#8e8e8e"},"#353535"),A2=xe(X0,{h:"#fffbd0",l:"#fbe46a",r:"#c4931a",f:"#f2cf3a",m:"#e3b92b",d:"#b4840f"},"#4f3604"),R2=xe(["................","................","................",".....wwllll.....","....wllbbbbc....","...wlbbbbbbcc...","..llbbbbbbbbcc..","..lbbbbbbbbbcd..","...bbbbbbbbccd..","....bbbbbbccd...",".....bbbbccd....","......bbccd.....",".......bcd......","........d......."],{w:"#ffffff",l:"#b9fbf3",b:"#5fe0d6",c:"#2fb3aa",d:"#1b7f78"},"#0c3f3b"),C2=xe(["................","................","................","........a.......",".......abb......","......abbbc.....",".....abbcbbc....",".....bbbbcbc....","....abbcbbbcc...","....bbbbbcbcc...","....bcbbbbccd...",".....bbcbccdd...","......ccccdd....",".......ddd......"],{a:"#7c7c7c",b:"#525252",c:"#3b3b3b",d:"#272727"},"#0f0f0f");function L2(i,t){const e=new Ri,n=ti("#ffffff","#e6e6e6","#bdbdbd","#858585","#232323");Gi(e,(s,r)=>{const o=s+.5-10.5,a=r+.5-5.5,c=Math.hypot(o,a);return c>=1.9&&c<=3.7&&!(o<0&&Math.abs(a)<1.5)},n),G0(e,t,["..ab...",".abbc..","abbcbc.","bbcbccd",".bccdd.","..ddd.."],{a:"#7c7c7c",b:"#545454",c:"#3c3c3c",d:"#282828"},"#0f0f0f",2,8),e.emit(i)}const D2=xe(["................","................",".............w..","............w...","...........w....","........www.....",".......w........","......w.........","......w.........",".......gw.......",".........w......",".........w......","........w.......","......wg........","....ww.........."],{w:"#f4f4f4",g:"#cfcfcf"},"#3e3e3e");function P2(i){const t=new Ri,e=U("#f3f3f3"),n=U("#d6d6d6"),s=U("#a7a7a7");for(let r=0;r<ri;r++)for(let o=0;o<ri;o++){const a=o-r,c=o+r;if(a<-10||a>11)continue;const l=1-Math.abs(a-1)/11,h=Math.round(3.2*Math.sqrt(Math.max(0,l))),u=Math.round(1.6*Math.sqrt(Math.max(0,l)));c===15?t.put(o,r,a<-7?U("#8a8a8a"):s,U("#5a5a5a")):a>-7&&c<15&&15-c<=h?t.put(o,r,(15-c+a)%4===0?n:e,U("#5a5a5a")):a>-7&&c>15&&c-15<=u&&t.put(o,r,n,U("#5a5a5a"))}t.emit(i)}const Y0=["................","................","................","................","................","................",".......pp.......",".....pppPpp.....","....pPpppppPp...","...ppppdpPpppp..","..pPpppppppdppp.","..ppdppPpppppp..","...pppppdpppp..."],I2=xe(Y0,{p:["#7a7a7a","#6c6c6c","#858585"],P:"#ababab",d:"#454545"},"#262626"),N2=xe(Y0,{p:["#ebe8dd","#dcd8cc","#f4f2ea"],P:"#ffffff",d:"#bdb8a8"},"#6b665a");function U2(i){const t=new Ri,e=U("#f2efe6"),n=U("#d3cebf"),s=U("#5f5a4f");for(let r=0;r<ri;r++)for(let o=0;o<ri;o++){const a=o-r,c=o+r,l=(c===15||c===16)&&Math.abs(a)<=8,h=Math.abs(a)>=8&&Math.abs(a)<=10&&(c>=12&&c<=14||c>=17&&c<=19);(l||h)&&t.put(o,r,c>=16&&!h?n:e,s)}t.emit(i)}function k2(i){const t=new Ri,e=ti("#ffffff","#dcdcdc","#b0b0b0","#7c7c7c","#262626");Gi(t,(n,s)=>{const r=n-s,o=Math.abs(n+s-15);return r>=8&&r<=11&&o<=11-r+(r===8?1:0)},e);for(let n=0;n<ri;n++)for(let s=0;s<ri;s++){const r=s-n,o=s+n,a=Math.abs(o-15);o===15&&r>=-11&&r<=7?t.put(s,n,r<-6?U("#5e4424"):U("#7d5c33"),U("#2a1c0b")):a>=1&&a<=2&&r>=-11&&r<=-7-a&&t.put(s,n,o<15?U("#f4f4f4"):U("#c4c4c4"),U("#4a4a4a"))}t.emit(i)}function O2(i){const t=new Ri,e=ti("#b08a52","#9a7542","#80602f","#5e4520","#24180a");for(let n=0;n<ri;n++)for(let s=0;s<ri;s++){const r=s-n,o=s+n;if(Math.abs(r)>11)continue;const a=15-9.5*(1-(r/11.5)**2);if(Math.abs(o-a)<=.9){const l=Math.abs(r)<=2;t.put(s,n,l?U("#5a3a1c"):o<a?e.light:e.mid,e.outline)}else o===15&&Math.abs(r)<=9&&t.put(s,n,U("#e6e6e6"),null)}t.emit(i)}const F2=xe(["................","................","................","..LL........LL..","..LMMMMMMMMMMM..","...MMMlMMMMMMM..","...MMMMMMMlMM...","...MlMMMMMMMM...","...MMMMMlMMMD...","...MMMMMMMMMD...","...MMlMMMMMMD...","...MMMMMMMMMMD..","..MMDDD...DDDD..","..DD........DD.."],{L:"#b9803f",M:["#9a5f2c","#94592a"],l:"#a96b33",D:"#764720"},"#331e0b"),B2=xe(["................","................","................","........gg......","......gGgbb.....","....ggbbGbbb....","...gbbbbbblGb...","..gbbGbbbbbbbg..","..bbblbbgbbbbb..","..gbbbbbbbbGbb..","...bbGbbblbbg...","....bbbbgbbb....",".....gbbbbb.....",".......gg......."],{b:["#94563a","#8c5034"],l:"#b0704c",G:"#6f8c35",g:"#55702a"},"#2f1a10"),z2=xe(["................","................","................","................",".........a......","....a....b......","....b.......a...","............b...",".......a........",".......b...ab...","...ab...........","..........a.....",".......a..b.....",".......b........"],{a:"#b9cf62",b:"#7a9832"},"#26300c"),G2=xe(["................","...........E..E.","..........Ee.Ee.",".........eE.eE..","........Ee.Ee.E.",".......eE.eE.eE.",".......s.Ee.Ee..","......s.s..eE...","......ss..s.....",".....ss.ss......","....kkks........","....kks.........","...ss...........","..ss............"],{E:"#f4d872",e:"#cfa640",s:["#b8a046","#a58c38"],k:"#7a5222"},"#3d2c08"),H2=xe(["................","................","................","................","................",".....LLLLLL.....","...LLlLLlLLLL...","..LlLLlLLlLLlL..",".LLLLLLLLLLLLLL.",".MMMMMMMMMMMMMMD",".MMMMMMMMMMMMMD.","..DDDDDDDDDDDD.."],{L:"#c9903f",l:"#ecc26e",M:"#a86e2a",D:"#7a4d1c"},"#3a220c"),V2=xe(["................","................","........S.......",".......SLL......","....rrrSrrr.....","...rRRRrRRRr....","..rRWRRRRRRRr...","..rRWRRRRRRRr...","..rRRRRRRRRRr...","..rRRRRRRRRDr...","...rRRRRRRDr....","...rRRRRRRDr....","....rRRRRDr.....",".....rrrrr......"],{S:"#5a3a1a",L:"#3f9a2a",r:"#b3161b",R:"#d8262b",W:"#ff9a8f",D:"#8a0f13"},{S:"#1f1006",L:"#123a0c","*":"#3a0507"}),K0=["................","................","................","................",".......ffff.....",".....ffpppff....","....fpppPpppf...","...fppPpppppf...","...fpppppPppf...","..fpppPpppppf...","..fppppppppf....","..fpppppppf.....","...ffpppff......",".....fff........"],W2=xe(K0,{f:"#f6dcd6",p:["#ea9aa1","#e5939a"],P:"#c96d78"},"#5a2a2e"),X2=xe(K0,{f:"#e6c48e",p:["#b5783c","#ad7236"],P:"#8a5426"},"#3a210c"),q0=["................","................","................","................","......rrrrr.....","....rrRRrRRrr...","...rRRwRRRRRr...","..rRRRRRRwRRRr..","..rRwRRRRRRRRr..","..rRRRRRRwRRr...","...rRRRRRRRRr...","....rrRRRRrr....","......rrrr......"],Y2=xe(q0,{r:"#9a2320",R:["#cc3630","#c4322c"],w:"#f2c8c4"},"#3f0b0a"),K2=xe(q0,{r:"#5e3a1e",R:["#8c5c33","#86572f"],w:"#b88c5a"},"#2a1608"),$0=["................","................","................","........mmmm....",".......mMMMMm...","......mMHMMMMm..","......mMMMMMMm..","......mMMMMMm...",".....bmMMMMm....","....bb.mmmm.....","...bb...........",".bbb............",".bb.............","..b............."],q2=xe($0,{m:"#d9a493",M:"#f1cbbd",H:"#fff0e8",b:"#f4f0e6"},{b:"#6b665a","*":"#5a3328"}),$2=xe($0,{m:"#9c6428",M:"#c98a3e",H:"#e8b56a",b:"#f4f0e6"},{b:"#6b665a","*":"#3a210c"}),j0=["................","................","................","......RRRR......","....RRRRRRRr....","...RRwRRRRRRr...","...RRRRRRwRRr...","...RRRRRRRRRr...","....RRRwRRRr....",".....RRRRRr.....","......rrrb......","........bb......","........bbb.....",".........bb....."],j2=xe(j0,{R:["#c23b3b","#ba3636"],r:"#8a2626",w:"#eaa9a1",b:"#efe9dc"},{b:"#6b665a","*":"#3a0c0c"}),Z2=xe(j0,{R:["#8f5732","#88522f"],r:"#5e3418",w:"#c48e5c",b:"#efe9dc"},{b:"#6b665a","*":"#2a1608"});function Nl(i){return xe(["................","................","................","......hhhh......","....hh....hh....","...h........h...","...LLLLLLLLLL...","..LiiiiiiiiiiD..","..LLiiiiiiiiDD..","...MMMMMMMMMD...","...LMMMMMMMMD...","....MMMMMMMD....","....LMMMMMMD....",".....MMMMMD....."],{h:"#8a8a8a",L:"#e8e8e8",M:["#c4c4c4","#bcbcbc"],D:"#8c8c8c",i:i??["#4a4a4a","#444444"]},"#2c2c2c")}const J2=xe(["................","....FFFFFFFF....","....FggFFggf....","....FggFFggf....","....FFFFFFFf....","....FggFFggf....","....FggFFggf....","....FFFFFFFf....","....FPPPPPpf....","....FPPPPPkf....","....FPPPPPpf....","....FFFFFFFf....","....FPPPPPpf....","....FPPPPPpf....","....FFFFFFFf...."],{F:["#b38e58","#ad8853"],f:"#8a6a3c",g:"#3d2c16",P:"#9d7a47",p:"#83633a",k:"#2a2a2a"},"#2e200d"),Q2=xe(["................","................","................","................","................","..pppRRRRRRRRR..",".pppRRRRRRRRRR..",".PPPrrrrrrrrrrr.",".wwwrrrrrrrrrrr.",".FFFFFFFFFFFFFF.",".FF..........FF.",".ff..........ff."],{p:"#f4f4f4",P:"#d0d0d0",w:"#bdbdbd",R:"#c63a3b",r:"#9e2327",F:"#bd9862",f:"#94703f"},{p:"#4a4a4a",P:"#4a4a4a",w:"#4a4a4a","*":"#2e0c0c",F:"#3a2a12",f:"#3a2a12"});function tE(i){const t=new Ri,e=ti("#ffffff","#f0f0f0","#cdcdcd","#9a9a9a","#262626"),n=ti("#8c8c8c","#787878","#606060","#484848","#161616");Gi(t,(o,a)=>{const c=o-a;return c>=0&&c<=10&&Math.abs(o+a-15.5)<=(c<=5?1.6:1.6-(c-5)*.22)},e);const s=(o,a,c,l)=>Math.max(Math.abs(o-c),Math.abs(a-l))===1;Gi(t,(o,a)=>s(o,a,3,8)||s(o,a,8,13)||a===8&&(o===5||o===6)||o===8&&(a===10||a===11)||o===7&&a===9,n),t.put(7,8,U("#3a3a3a"),n.outline),t.emit(i)}const Z0=["................","................","................","................","................",".......hh.......","......hCCC......",".....hCCCCC.....","....hCCCCCCC....","...hCCCCCCCCD...","...CCCCCCCCDD...","....DDDDDDDD...."],eE=xe(Z0,{h:"#ff6b5e",C:["#cc282c","#c4252a"],D:"#8a1418"},"#3a0507"),nE=xe(Z0,{h:"#fff28a",C:["#f2c81c","#ecc118"],D:"#b8860b"},"#4f3604"),J0={};for(const[i,t]of Object.entries(Ya))for(const e of["pickaxe","axe","shovel","sword","hoe"])J0[`${i}_${e}`]=m2(e,t);const Q0={};for(const[i,t]of Object.entries(y2))for(const e of Object.keys(V0))Q0[`${i}_${e}`]=b2(e,t);const iE={stick:S2,coal:E2,charcoal:w2,iron_ingot:T2,gold_ingot:A2,diamond:R2,flint:C2,flint_and_steel:L2,string:D2,feather:P2,gunpowder:I2,bone:U2,bone_meal:N2,arrow:k2,bow:O2,leather:F2,rotten_flesh:B2,wheat_seeds:z2,wheat:G2,bread:H2,apple:V2,porkchop:W2,cooked_porkchop:X2,beef:Y2,steak:K2,chicken:q2,cooked_chicken:$2,bucket:Nl(null),water_bucket:Nl(["#2f5fd0","#3a6bd8","#4a7ce0"]),lava_bucket:Nl(["#e8600f","#f8901c","#ffc23a"]),oak_door_item:J2,bed_item:Q2,shears:tE,paper:xe(["................","................","...wwwwwwwwww...","...wwwwwwwwwww..","...wllllllllww..","...wwwwwwwwwww..","..wwlllllllww...","..wwwwwwwwwww...","..wwllllllllw...","..wwwwwwwwwww...","...wllllllllww..","...wwwwwwwwwww..","...wwwwwwwwww...","................","................","................"],{w:["#f6f6f2","#efefe9"],l:"#c8c8c0"},"#5e5e58"),book:xe(["................","...dCCCCCCCCC...","...dCCCCCCCCCc..","...dCcyyyyyCCc..","...dCcyCCCyCCc..","...dCcyyyyyCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dCCCCCCCCCc..","...dpppppppppp..","....pppppppppp..","................","................"],{C:["#7a3f1c","#84461f"],c:"#9b5a2c",d:"#4a250f",y:"#e9c23a",p:["#f2efe4","#e2ddcc"]},"#2a1607"),red_dye:eE,yellow_dye:nE,mutton:j2,cooked_mutton:Z2,...J0,...Q0},Gd=i=>{for(let t=0;t<We;t++)for(let e=0;e<We;e++)i.set(e,t,e>>3^t>>3?U("#f800f8"):U("#000000"))};function Du(i,t,e=We,n=We){const s=new y0(e,n);try{(i??Gd)(s,Ho(b0(t)))}catch(r){console.error(`Текстура «${t}» не нарисовалась`,r),Gd(s)}return s}function sE(){const i=Ur.length,t=new Uint8Array(i*We*We*4),e=Ur.map((n,s)=>{const r=Du(a2[n],n);return t.set(r.px,s*We*We*4),r});return{data:t,count:i,tiles:e}}const Hd=new Map;function tm(i){let t=Hd.get(i);return t||Hd.set(i,t=Du(iE[i],i)),t}const Vd=new WeakMap,yr=i=>{let t=Vd.get(i);return t||Vd.set(i,t=Mc(i)),t},Wd=new Map;function Pu(i,t){const e=Wd.get(t);if(e)return e;const n=64,s=document.createElement("canvas");s.width=s.height=n;const r=s.getContext("2d",{willReadFrequently:!0});r.imageSmoothingEnabled=!1;const o=ge(t);if(o&&_s(t)){const c=pn[t],l=h=>i.tiles[Rn[t*384+h]];if(c===Yr||c===Bo||c===qr||c===$r||c===Qh||c===eu||c===vp||c===nu)r.drawImage(yr(l(0)),4,4,56,56);else if(c===dc){const h=yr(l(0));for(const[u,f,d,m]of[[6,10,8,46],[50,10,8,46],[14,18,36,8],[14,38,36,8],[28,26,8,12]])r.drawImage(h,u/4,f/4,d/4,m/4,u,f,d,m)}else{const h=c===xo?.5:c===gp?.9375:c===Gl?.875:1,u=c===_p||c===Gl||c===tu?4:0;oE(r,yr(l(2)),yr(l(4)),yr(l(0)),h,u)}}else o!=null&&o.sprite&&r.drawImage(yr(tm(o.sprite)),4,4,56,56);r.setTransform(1,0,0,1,0,0);const a=s.toDataURL();return Wd.set(t,a),a}function rE(i,t){let e=0;const n=r=>typeof requestIdleCallback=="function"?requestIdleCallback(r,{timeout:1e3}):setTimeout(()=>r({timeRemaining:()=>6}),30),s=r=>{const o=performance.now();for(;e<t.length&&(r.timeRemaining()>2||performance.now()-o<3);)Pu(i,t[e++]);e<t.length&&n(s)};n(s)}function oE(i,t,e,n,s,r){const o=(1-s)*32,a=(64-r*2)/64,c=r,l=(h,u,f,d)=>{i.setTransform(u[0]*a,u[1]*a,u[2]*a,u[3]*a,c+u[4]*a,r+u[5]*a),i.globalCompositeOperation="source-over",d?i.drawImage(h,0,We*(1-s),We,We*s,0,0,We,We*s):i.drawImage(h,0,0),f>0&&(i.globalCompositeOperation="source-atop",i.fillStyle=`rgba(0,0,0,${f})`,i.fillRect(0,0,We,d?We*s:We))};l(t,[2,-1,2,1,0,16+o],0,!1),l(e,[2,1,0,2,0,16+o],.22,!0),l(n,[2,-1,0,2,32,32+o],.42,!0),i.globalCompositeOperation="source-over"}const Xd=new Map;function Yd(i){let t=Xd.get(i);if(!t){const e=Du(h2[i],i,Pd,Pd);t=Mc(e).toDataURL(),Xd.set(i,t)}return t}function aE(i,t,e=0){const n=Mc(i.tiles[iu(t)]);if(e){const s=n.getContext("2d");s.fillStyle=`rgba(0,0,0,${e})`,s.fillRect(0,0,We,We)}return n.toDataURL()}const cE={menu:"menu",loading:"loading",pause:"pause",death:"death",inventory:"inventory-screen",disconnected:"disconnected"},lE=80,hE=1e4,yt=i=>document.getElementById(i);function Ka(i,t,e){var o;const n=t?`${t.id}:${t.count}:${t.dmg??0}`:"";if(i.dataset.key===n||(i.dataset.key=n,i.replaceChildren(),!t))return;const s=document.createElement("img");if(s.src=Pu(e,t.id),s.alt="",s.draggable=!1,i.append(s),t.count>1){const a=document.createElement("span");a.className="count",a.textContent=String(t.count),i.append(a)}const r=(o=ge(t.id))==null?void 0:o.durability;if(r&&t.dmg){const a=1-t.dmg/r,c=document.createElement("span");c.className="dur";const l=document.createElement("i");l.style.width=`${Math.round(a*100)}%`,l.style.background=`hsl(${Math.round(a*120)}, 90%, 50%)`,c.append(l),i.append(c)}}class uE{constructor(t){w(this,"itemNameTimer",0);w(this,"hudKey","");this.atlas=t}show(t){for(const[e,n]of Object.entries(cE))yt(n).hidden=e!==t}setHud(t){yt("hud").hidden=!t}setLoading(t){yt("loading-bar").style.width=`${Math.round(Math.max(0,Math.min(1,t))*100)}%`}renderHotbar(t,e){const n=yt("hotbar");n.childElementCount!==9&&n.replaceChildren(...Array.from({length:9},(s,r)=>{const o=document.createElement("div");return o.className="slot",o.addEventListener("pointerdown",a=>{a.stopPropagation(),e(r)}),o})),Array.from(n.children).forEach((s,r)=>{s.classList.toggle("selected",r===t.selected),Ka(s,t.slots[r],this.atlas)})}setStatus(t,e,n,s,r,o){const a=`${Math.ceil(t)}|${e}|${n}|${Math.ceil(s)}|${r}|${o}`;if(a===this.hudKey)return;this.hudKey=a;const c=r==="survival";if(yt("status").style.visibility=c?"visible":"hidden",!c)return;const l=(f,d,m,_,g,p=!0)=>{const M=yt(f);if(M.replaceChildren(),!!p)for(let b=0;b<10;b++){const v=d-b*2,E=v>=2?m:v===1?_:g;if(!E)continue;const T=document.createElement("i");T.style.backgroundImage=`url(${Yd(E)})`,M.append(T)}};l("hearts",Math.ceil(t),"heart_full","heart_half","heart_empty"),l("food",e,"food_full","food_half","food_empty"),l("armor-bar",n,"armor_full","armor_half","armor_empty",n>0);const h=Math.ceil(s/15*10),u=yt("air");if(u.replaceChildren(),s<15)for(let f=0;f<h;f++){const d=document.createElement("i");d.style.backgroundImage=`url(${Yd(f===h-1&&s%1.5<.4?"bubble_pop":"bubble")})`,u.append(d)}yt("hearts").classList.toggle("shake",o)}flashItemName(t){const e=yt("item-name");e.textContent=t?Km(t):"",e.classList.add("show"),clearTimeout(this.itemNameTimer),this.itemNameTimer=window.setTimeout(()=>e.classList.remove("show"),1600)}addChat(t,e,n){const s=document.createElement("div");if(s.className="chat-line"+(t?"":" system"),t){const o=document.createElement("b");o.textContent=`<${t}> `,e&&(o.style.color=e),s.append(o)}s.append(document.createTextNode(n));const r=yt("chat-log");for(r.append(s);r.childElementCount>lE;)r.firstElementChild.remove();r.scrollTop=r.scrollHeight,setTimeout(()=>s.classList.add("faded"),hE)}openChat(t){yt("chat").classList.add("open"),yt("chat-form").hidden=!1;const e=yt("chat-input");e.value=t,setTimeout(()=>e.focus(),0)}closeChat(){yt("chat").classList.remove("open"),yt("chat-form").hidden=!0,yt("chat-input").blur()}setPlayerList(t){const e=yt("player-list");if(e.hidden=!t,!t)return;const n=document.createElement("div");n.textContent=`Игроки онлайн: ${t.length}`,e.replaceChildren(n,...t.map(s=>{const r=document.createElement("div"),o=document.createElement("i");return o.style.background=s.color,r.append(o,document.createTextNode(s.name)),r}))}setDebug(t){const e=yt("debug");e.hidden=t===null,t!==null&&(e.textContent=t)}setUnderwater(t){yt("underwater").classList.toggle("on",t)}setSleeping(t){yt("sleep-overlay").classList.toggle("on",t)}get isSleeping(){return yt("sleep-overlay").classList.contains("on")}}const Kd="minecraft:recipe-book",qd=[{key:"all",name:"Все",filter:()=>!0},{key:"blocks",name:"Блоки",filter:i=>_s(i)},{key:"tools",name:"Инструменты",filter:i=>{var t,e;return!!((t=ge(i))!=null&&t.tool)||!!((e=ge(i))!=null&&e.armor)||[263,269,270,283,284,285,288].includes(i)}},{key:"food",name:"Еда",filter:i=>{var t;return!!((t=ge(i))!=null&&t.food)}},{key:"misc",name:"Разное",filter:i=>{var t,e,n;return!_s(i)&&!((t=ge(i))!=null&&t.tool)&&!((e=ge(i))!=null&&e.armor)&&!((n=ge(i))!=null&&n.food)}}];class fE{constructor(t,e,n,s){w(this,"kind",null);w(this,"cursor",null);w(this,"craft",Lr(9));w(this,"craftW",2);w(this,"container",null);w(this,"panel",yt("inventory-panel"));w(this,"cursorEl",yt("cursor-item"));w(this,"tooltip",yt("tooltip"));w(this,"slots",[]);w(this,"tab","all");w(this,"pointer",{x:0,y:0});w(this,"longPress",0);w(this,"longPressed",!1);w(this,"lastTap",{el:null,time:0});w(this,"book",yt("recipe-book"));w(this,"bookOpen",!0);w(this,"bookAll",!1);w(this,"bookKey","");w(this,"bookRecipes",[]);w(this,"onPointerDown",t=>{const e=t.target.closest(".slot");if(e){if(t.preventDefault(),this.pointer={x:t.clientX,y:t.clientY},t.pointerType==="touch"){this.longPressed=!1,clearTimeout(this.longPress),this.longPress=window.setTimeout(()=>{this.longPressed=!0,this.click(e,!0,!1)},420);return}this.click(e,t.button===2,t.shiftKey)}});w(this,"onPointerUp",t=>{if(t.pointerType!=="touch")return;clearTimeout(this.longPress);const e=t.target.closest(".slot");if(!e||this.longPressed)return;const n=performance.now(),s=this.lastTap.el===e&&n-this.lastTap.time<320;this.lastTap={el:e,time:n},s?(this.click(e,!1,!1),this.click(e,!1,!0)):this.click(e,!1,!1)});this.atlas=t,this.inv=e,this.h=n,this.mode=s;const r=yt("inventory-screen");try{this.bookOpen=localStorage.getItem(Kd)!=="0"}catch{}this.setupBook(),this.panel.addEventListener("contextmenu",o=>o.preventDefault()),r.addEventListener("contextmenu",o=>o.preventDefault()),this.panel.addEventListener("pointerdown",this.onPointerDown),this.panel.addEventListener("pointerup",this.onPointerUp),this.panel.addEventListener("pointercancel",()=>clearTimeout(this.longPress)),r.addEventListener("pointermove",o=>{this.pointer={x:o.clientX,y:o.clientY},this.placeFloating()}),r.addEventListener("pointerdown",o=>{const a=o.target;this.panel.contains(a)||this.book.contains(a)||a.closest("#inv-close")||this.cursor&&(o.button===2?(this.h.drop({...this.cursor,count:1}),this.cursor=this.cursor.count>1?{...this.cursor,count:this.cursor.count-1}:null):(this.h.drop(this.cursor),this.cursor=null),this.render())}),this.panel.addEventListener("pointerover",o=>{const a=o.target.closest(".slot");if(!a||o.pointerType==="touch")return this.hideTooltip();const c=this.stackOf(a);if(!c)return this.hideTooltip();const l=ge(c.id);let h=(l==null?void 0:l.name)??"";l!=null&&l.durability&&(h+=` (${l.durability-(c.dmg??0)}/${l.durability})`),this.tooltip.textContent=h,this.tooltip.hidden=!1,this.placeFloating()}),this.panel.addEventListener("pointerout",()=>this.hideTooltip())}get isOpen(){return this.kind!==null}get openContainerId(){var t;return((t=this.container)==null?void 0:t.cid)??null}open(t,e){this.returnCraft(),this.kind=t,this.container=e??null,this.craftW=t==="crafting"?3:2,this.build(),this.render()}close(){this.kind&&(this.returnCraft(),this.cursor&&(this.giveBack(this.cursor),this.cursor=null),this.kind=null,this.container=null,this.book.hidden=!0,this.cursorEl.hidden=!0,this.hideTooltip(),this.inv.changed(),this.h.close())}giveBack(t){const e=fi(this.inv.slots,{...t});e>0&&this.h.drop({...t,count:e})}returnCraft(){for(let t=0;t<this.craft.length;t++){const e=this.craft[t];e&&this.giveBack(e),this.craft[t]=null}}setContainerSlot(t,e,n){var s;((s=this.container)==null?void 0:s.cid)===t&&(this.container.slots[e]=n,this.render())}setProgress(t,e,n,s){var a;if(((a=this.container)==null?void 0:a.cid)!==t)return;this.container.burn=e,this.container.burnMax=n,this.container.cook=s;const r=this.panel.querySelector(".flame"),o=this.panel.querySelector(".cook-arrow");r&&r.style.setProperty("--burn",`${n?Math.round(e/n*100):0}%`),o&&o.style.setProperty("--cook",`${Math.round(s/200*100)}%`)}containerClosed(t){var e;((e=this.container)==null?void 0:e.cid)===t&&this.close()}refresh(){this.kind&&this.render()}slot(t,e,n){const s=document.createElement("div");return s.className="slot",s.dataset.g=t,s.dataset.i=String(e),n==null||n(s),this.slots.push(s),s}grid(t,e,n,s){const r=document.createElement("div");r.className="inv-grid",r.style.gridTemplateColumns=`repeat(${s}, var(--slot))`;for(let o=0;o<n;o++)r.append(this.slot(t,e+o));return r}title(t){const e=document.createElement("div");return e.className="inv-title",e.textContent=t,e}playerSection(){const t=this.grid("main",zi,Cr-zi,9),e=this.grid("hotbar",0,zi,9);return e.style.marginTop="6px",[this.title("Инвентарь"),t,e]}craftingRow(){const t=document.createElement("div");t.className="inv-row";const e=document.createElement("div");e.className="craft-grid",e.style.gridTemplateColumns=`repeat(${this.craftW}, var(--slot))`;for(let o=0;o<this.craftW*this.craftW;o++)e.append(this.slot("craft",o));const n=document.createElement("div");n.className="arrow",n.textContent="➜";const s=document.createElement("button");s.className="book-toggle",s.title="Книга рецептов";const r=document.createElement("img");return r.src=Pu(this.atlas,j.BOOK),r.alt="Рецепты",s.append(r),s.onclick=()=>{this.bookOpen=!this.bookOpen;try{localStorage.setItem(Kd,this.bookOpen?"1":"0")}catch{}this.bookKey="",this.renderBook()},t.append(e,n,this.slot("out",0),s),t}build(){this.slots=[];const t=[];switch(this.kind){case"inventory":{const e=document.createElement("div");e.className="inv-row";const n=document.createElement("div");n.className="inv-col";for(let r=0;r<4;r++)n.append(this.slot("armor",r));const s=document.createElement("div");if(s.className="inv-col",s.append(this.title("Создание"),this.craftingRow()),e.append(n,s),t.push(e,...this.playerSection()),this.mode()==="creative"){const r=document.createElement("button");r.className="mc-button small",r.textContent="Творческий инвентарь",r.onclick=()=>this.open("creative"),t.push(r)}break}case"crafting":t.push(this.title("Верстак"),this.craftingRow(),...this.playerSection());break;case"chest":t.push(this.title("Сундук"),this.grid("cont",0,27,9),...this.playerSection());break;case"furnace":{const e=document.createElement("div");e.className="furnace-ui";const n=document.createElement("div");n.className="inv-col";const s=document.createElement("div");s.className="flame",n.append(this.slot("cont",0),s,this.slot("cont",1));const r=document.createElement("div");r.className="cook-arrow",e.append(n,r,this.slot("cont",2)),t.push(this.title("Печь"),e,...this.playerSection());break}case"creative":{const e=document.createElement("div");e.className="creative-tabs";for(const a of qd){const c=document.createElement("button");c.textContent=a.name,c.className=a.key===this.tab?"active":"",c.onclick=()=>{this.tab=a.key,this.build(),this.render()},e.append(c)}const n=document.createElement("button");n.textContent="Инвентарь",n.onclick=()=>this.open("inventory"),e.append(n);const s=document.createElement("div");s.className="creative-grid";const r=qd.find(a=>a.key===this.tab).filter;Ap.filter(r).forEach(a=>s.append(this.slot("creative",a)));const o=document.createElement("div");o.className="inv-row",o.append(this.grid("hotbar",0,zi,9),this.slot("trash",0,a=>a.classList.add("trash"))),t.push(this.title("Творческий режим"),e,s,o);break}}this.panel.replaceChildren(...t),this.kind==="furnace"&&this.container&&this.setProgress(this.container.cid,this.container.burn??0,this.container.burnMax??0,this.container.cook??0)}output(){var e;const t=this.craftW===3?this.craft:[this.craft[0],this.craft[1],this.craft[2],this.craft[3]];return((e=Qb(t,this.craftW))==null?void 0:e.result)??null}stackOf(t){var n;const e=Number(t.dataset.i);switch(t.dataset.g){case"main":case"hotbar":return this.inv.slots[e];case"armor":return this.inv.armor[e];case"craft":return this.craft[e];case"out":return this.output();case"cont":return((n=this.container)==null?void 0:n.slots[e])??null;case"creative":return Fe(e,1);default:return null}}render(){for(const t of this.slots)Ka(t,this.stackOf(t),this.atlas);this.cursorEl.hidden=!this.cursor,Ka(this.cursorEl,this.cursor,this.atlas),this.placeFloating(),this.renderBook()}setupBook(){this.book.addEventListener("contextmenu",t=>t.preventDefault()),this.book.addEventListener("pointerdown",t=>{const e=t.target.closest(".slot[data-r]");if(!e)return;t.preventDefault();const n=this.bookRecipes[Number(e.dataset.r)];n&&this.fillRecipe(n,t.shiftKey||t.button===2)}),this.book.addEventListener("pointerover",t=>{var r;const e=t.target.closest(".slot[data-r]");if(!e||t.pointerType==="touch")return this.hideTooltip();const n=this.bookRecipes[Number(e.dataset.r)];if(!n)return this.hideTooltip();let s=((r=ge(n.result.id))==null?void 0:r.name)??"";bl(n,this.craftW)?gd(n,[...this.inv.slots,...this.craft])||(s+=" — не хватает материалов"):s+=" — нужен верстак",this.tooltip.textContent=s,this.tooltip.hidden=!1,this.placeFloating()}),this.book.addEventListener("pointerout",()=>this.hideTooltip())}renderBook(){const t=(this.kind==="inventory"||this.kind==="crafting")&&this.bookOpen;if(this.book.hidden=!t,!t)return;const e=[...this.inv.slots,...this.craft],n=Po.map(l=>({r:l,fits:!!bl(l,this.craftW),ok:gd(l,e)})).filter(l=>this.bookAll||l.ok).sort((l,h)=>Number(h.ok&&h.fits)-Number(l.ok&&l.fits)||Number(h.ok)-Number(l.ok)),s=`${this.craftW}|${this.bookAll}|${n.map(l=>`${Po.indexOf(l.r)}${l.ok?1:0}${l.fits?1:0}`).join(",")}`;if(s===this.bookKey)return;this.bookKey=s,this.bookRecipes=n.map(l=>l.r);const r=document.createElement("div");r.className="inv-title",r.textContent="Рецепты";const o=document.createElement("label"),a=document.createElement("input");a.type="checkbox",a.checked=this.bookAll,a.onchange=()=>{this.bookAll=a.checked,this.renderBook()},o.append(a,"Показать все");const c=document.createElement("div");if(c.className="recipe-grid",n.forEach((l,h)=>{const u=document.createElement("div");u.className=`slot${l.ok&&l.fits?" ready":" locked"}`,u.dataset.r=String(h),Ka(u,l.r.result,this.atlas),c.append(u)}),!n.length){const l=document.createElement("div");l.className="empty",l.textContent="Пока ничего — добудьте дерево (бейте ствол дерева)",c.append(l)}this.book.replaceChildren(r,o,c)}fillRecipe(t,e){const n=bl(t,this.craftW);if(n){this.returnCraft();for(let s=0;s<(e?64:1);s++){const r=this.inv.slots.map(c=>c?{...c}:null),o=this.craft.map(c=>c?{...c}:null);let a=!0;for(let c=0;c<n.length&&a;c++){const l=n[c];if(l===null)continue;const h=o[c];if(h&&h.count>=ps(h.id)){a=!1;break}const u=r.findIndex(d=>!!d&&(h?d.id===h.id:jb(l,d.id)));if(u<0){a=!1;break}const f=r[u];r[u]=f.count>1?{...f,count:f.count-1}:null,o[c]=h?{...h,count:h.count+1}:{...f,count:1}}if(!a)break;r.forEach((c,l)=>this.inv.slots[l]=c),o.forEach((c,l)=>this.craft[l]=c)}this.h.sound("click"),this.inv.changed(),this.render()}}placeFloating(){this.cursorEl.style.left=`${this.pointer.x}px`,this.cursorEl.style.top=`${this.pointer.y}px`,this.tooltip.style.left=`${this.pointer.x+16}px`,this.tooltip.style.top=`${this.pointer.y-30}px`}hideTooltip(){this.tooltip.hidden=!0}click(t,e,n){const s=t.dataset.g,r=Number(t.dataset.i),o=this.container?this.container.slots.map(a=>a?{...a}:null):null;switch(s){case"main":case"hotbar":n?this.quickFromInventory(r):this.cursor=Da(this.inv.slots,r,this.cursor,e);break;case"armor":if(n){const a=this.inv.armor[r];a&&fi(this.inv.slots,{...a})===0&&(this.inv.armor[r]=null)}else this.cursor=Da(this.inv.armor,r,this.cursor,e,a=>{var c,l;return((l=(c=ge(a.id))==null?void 0:c.armor)==null?void 0:l.slot)===r});break;case"craft":if(n){const a=this.craft[r];if(a){const c=fi(this.inv.slots,{...a});this.craft[r]=c>0?{...a,count:c}:null}}else this.cursor=Da(this.craft,r,this.cursor,e);break;case"out":this.takeOutput(n);break;case"cont":{if(!this.container)break;const a=this.container.slots;if(n){const c=a[r];if(c){const l=fi(this.inv.slots,{...c});a[r]=l>0?{...c,count:l}:null}}else{const c=this.container.kind==="furnace"&&r===2;this.cursor=c?this.takeOnly(a,r):Da(a,r,this.cursor,e)}break}case"creative":{const a=ps(r);n?fi(this.inv.slots,Fe(r,a)):this.cursor&&this.cursor.id===r&&!e?this.cursor={...this.cursor,count:Math.min(a,this.cursor.count+1)}:this.cursor?this.cursor=null:this.cursor=Fe(r,e?1:a);break}case"trash":this.cursor=null;break}this.container&&o&&this.container.slots.forEach((a,c)=>{const l=o[c];!a&&!l||a&&l&&a.id===l.id&&a.count===l.count&&(a.dmg??0)===(l.dmg??0)||this.h.containerSlot(this.container.cid,c,a)}),this.h.sound("click"),this.inv.changed(),this.render()}takeOnly(t,e){const n=t[e];return n?this.cursor?this.cursor.id===n.id&&this.cursor.count+n.count<=ps(n.id)?(t[e]=null,{...this.cursor,count:this.cursor.count+n.count}):this.cursor:(t[e]=null,n):this.cursor}quickFromInventory(t){var c;const e=this.inv.slots[t];if(!e)return;const n=(l,h)=>{const u=fi(l,{...e},h);this.inv.slots[t]=u>0?{...e,count:u}:null};if(this.kind==="chest"&&this.container)return n(this.container.slots,Array.from({length:27},(l,h)=>h));if(this.kind==="furnace"&&this.container){if(eS[e.id])return n(this.container.slots,[0]);if(nS(e.id)>0)return n(this.container.slots,[1])}const s=(c=ge(e.id))==null?void 0:c.armor;if(this.kind==="inventory"&&s&&!this.inv.armor[s.slot]){this.inv.armor[s.slot]=e,this.inv.slots[t]=null;return}if(this.kind==="creative")return;const r=t<zi?Array.from({length:27},(l,h)=>h+9):Array.from({length:9},(l,h)=>h),o={...e};this.inv.slots[t]=null;const a=fi(this.inv.slots,o,r);a>0&&(this.inv.slots[t]={...e,count:a})}takeOutput(t){for(let e=0;e<(t?64:1);e++){const n=this.output();if(!n)return;if(t){const r=this.inv.slots.map(o=>o?{...o}:null);if(fi(r,{...n})>0)return;fi(this.inv.slots,{...n})}else{if(this.cursor&&(this.cursor.id!==n.id||this.cursor.count+n.count>ps(n.id)))return;this.cursor=this.cursor?{...this.cursor,count:this.cursor.count+n.count}:{...n}}const s=this.craftW*this.craftW;for(let r=0;r<s;r++){const o=this.craft[r];o&&(this.craft[r]=o.count>1?{...o,count:o.count-1}:null)}this.h.sound("pop")}}}function dE(i){const t=-Math.sin(i),e=-Math.cos(i);return Math.abs(t)>Math.abs(e)?t>0?1:3:e>0?2:0}function Ul(i,t){return i>0?1:i<0?3:t>0?2:0}function pE(i,t,e,n){const s=ge(i);if(!(s!=null&&s.places))return null;const r=Kt(s.places),o=pn[r],a=t.state&Ge,c=dE(e),l=t.py-Math.floor(t.py);if(o===xo&&a===r){const g=bs(t.state)&1;if(t.ny===1&&g===0||t.ny===-1&&g===1)return{x:t.x,y:t.y,z:t.z,state:ei(qu[r]??r)}}let h=t.x+t.nx,u=t.y+t.ny,f=t.z+t.nz;Ar[a]&&a!==C.AIR&&(h=t.x,u=t.y,f=t.z);const d=n(h,u,f),m=Kt(d);if(o===xo&&m===r)return{x:h,y:u,z:f,state:ei(qu[r]??r)};if(!Ar[m])return null;let _=0;switch(r){case C.OAK_LOG:case C.BIRCH_LOG:case C.SPRUCE_LOG:_=t.nx!==0?1:t.nz!==0?2:0;break;case C.FURNACE:case C.CHEST:case C.PUMPKIN:case C.JACK_O_LANTERN:_=wr(c);break}switch(o){case xo:_=t.ny===-1||t.ny===0&&l>.5?1:0;break;case mp:_=c|(t.ny===-1||t.ny===0&&l>.5?4:0);break;case qr:{if(t.ny===-1)return null;if(t.ny===1){if(!un[Kt(n(h,u-1,f))])return null;_=0}else if(_=1+wr(Ul(t.nx,t.nz)),!un[a])return null;break}case $r:if(t.ny!==0||!un[a])return null;_=wr(Ul(t.nx,t.nz));break;case Qh:if(_=c,!Ar[Kt(n(h,u+1,f))]||!Ze[Kt(n(h,u-1,f))].fullCube)return null;break;case nu:t.ny===0?_=wr(Ul(t.nx,t.nz))|(l>.5?8:0):_=wr(c)|(t.ny===-1?8:0);break;case dc:_=c;break;case eu:{_=c;const[g,,p]=ko[c];if(!Ar[Kt(n(h+g,u,f+p))]||!Ze[Kt(n(h,u-1,f))].solid||!Ze[Kt(n(h+g,u-1,f+p))].solid)return null;break}}return r===C.WHEAT&&Kt(n(h,u-1,f))!==C.FARMLAND||r===C.SUGAR_CANE&&!zm(n,h,u,f)?null:{x:h,y:u,z:f,state:ei(r,_)}}function mE(i){const t=Kt(i);return t===C.CRAFTING_TABLE||t===C.CHEST||t===C.FURNACE||t===C.LIT_FURNACE||t===C.OAK_DOOR||t===C.OAK_TRAPDOOR||t===C.OAK_FENCE_GATE||t===C.BED}function gE(i){const t=Kt(i.state),e=bs(i.state);if(t===C.OAK_DOOR)return[{x:i.x,y:i.y+1,z:i.z,state:ei(C.OAK_DOOR,e&3|8)}];if(t===C.BED){const[n,,s]=ko[e&3];return[{x:i.x+n,y:i.y,z:i.z+s,state:ei(C.BED,e&3|4)}]}return[]}const _E=.6,vE=1.8,xE=1.62,ME=1.54,$d=32,yE=8.6,bE={fall:"разбивается насмерть",drown:"тонет",lava:"сгорает в лаве",fire:"сгорает",starve:"умирает от голода",void:"падает в пустоту",kill:"погибает",зомби:"погибает от зомби",скелет:"погибает от стрелы скелета",стрела:"погибает от стрелы",паук:"погибает от паука",крипер:"взрывается из-за крипера",динамит:"взрывается"};class SE{constructor(t){w(this,"x",0);w(this,"y",0);w(this,"z",0);w(this,"vx",0);w(this,"vy",0);w(this,"vz",0);w(this,"width",_E);w(this,"height",vE);w(this,"onGround",!1);w(this,"collidedH",!1);w(this,"yaw",0);w(this,"pitch",0);w(this,"mode","survival");w(this,"flying",!1);w(this,"sneaking",!1);w(this,"sprinting",!1);w(this,"inWater",!1);w(this,"inLava",!1);w(this,"eyeInWater",!1);w(this,"onLadder",!1);w(this,"alive",!0);w(this,"sleeping",!1);w(this,"hp",20);w(this,"food",20);w(this,"saturation",5);w(this,"exhaustion",0);w(this,"air",15);w(this,"fire",0);w(this,"fallDistance",0);w(this,"hurtCooldown",0);w(this,"regenTimer",0);w(this,"starveTimer",0);w(this,"drownTimer",0);w(this,"fireTimer",0);w(this,"lavaTimer",0);w(this,"walkDistance",0);w(this,"speed",0);w(this,"lastCause","kill");w(this,"onHurt",()=>{});w(this,"onDeath",()=>{});w(this,"onStep",()=>{});w(this,"onLand",()=>{});w(this,"onSplash",()=>{});w(this,"armorPoints",()=>0);this.world=t}get eyeHeight(){return this.sneaking&&!this.flying?ME:xE}get survival(){return this.mode==="survival"}setPosition(t,e,n){this.x=t,this.y=e,this.z=n,this.vx=this.vy=this.vz=0,this.fallDistance=0}update(t,e){if(!this.alive||this.sleeping)return;this.hurtCooldown=Math.max(0,this.hurtCooldown-t);const n=this.inWater,s=Ey(this.world,this,this.eyeHeight);this.inWater=s.inWater,this.inLava=s.inLava,this.eyeInWater=s.eyeInWater,this.onLadder=s.onLadder,this.inWater&&!n&&this.vy<-4&&this.onSplash(),this.mode!=="creative"&&(this.flying=!1),this.sneaking=e.sneak&&!this.flying;const r=e.forward!==0||e.strafe!==0;this.sprinting=e.sprint&&e.forward>0&&!this.sneaking&&(this.food>6||!this.survival);const o=Math.sin(this.yaw),a=Math.cos(this.yaw);let c=-o*e.forward+a*e.strafe,l=-a*e.forward-o*e.strafe;const h=Math.hypot(c,l);h>1&&(c/=h,l/=h);let u=this.sprinting?5.612:4.317;this.sneaking&&(u=1.3);let f=this.onGround?14:2.6;this.flying?(u=this.sprinting?21.6:10.9,f=8):(this.inWater||this.inLava)&&(u=this.inLava?1.2:this.sprinting?3:2.1,f=6);const d=1-Math.exp(-f*t);this.vx+=(c*u-this.vx)*d,this.vz+=(l*u-this.vz)*d;let m=!1;if(this.flying){const L=((e.jump?1:0)-(e.sneak?1:0))*(this.sprinting?12:8);this.vy+=(L-this.vy)*(1-Math.exp(-10*t))}else this.onLadder?e.jump||r&&this.collidedH?this.vy=2.6:this.sneaking?this.vy=0:this.vy=Math.max(this.vy-$d*t,-2.6):this.inWater||this.inLava?(this.vy-=(this.inLava?6:10)*t,this.vy*=Math.exp(-2.5*t),e.jump&&(this.vy=Math.min(this.vy+28*t,this.inLava?2:3.6)),e.sneak&&(this.vy=Math.max(this.vy-20*t,-3.6)),e.jump&&this.collidedH&&!this.eyeInWater&&(this.vy=6.5),this.vy=Math.max(this.vy,-5)):(this.vy=Math.max(this.vy-$d*t,-78),e.jump&&this.onGround&&(this.vy=yE,m=!0,this.sprinting&&(this.vx+=c*2,this.vz+=l*2)));let _=this.vx*t,g=this.vz*t;this.sneaking&&this.onGround&&!this.flying&&([_,g]=Sy(this.world,this,_,g));const p=Math.max(Math.abs(_),Math.abs(this.vy*t),Math.abs(g)),M=Math.max(1,Math.ceil(p/.35)),b=this.x,v=this.z,E=this.y,T=this.onGround;for(let L=0;L<M;L++)by(this.world,this,_/M,this.vy*t/M,g/M,this.flying?0:.6);this.flying&&this.onGround&&!e.jump&&(this.flying=!1);const S=Math.hypot(this.x-b,this.z-v);if(this.speed=S/Math.max(t,1e-4),this.onGround&&!this.flying){const L=Math.floor(this.walkDistance/2.2);this.walkDistance+=S,Math.floor(this.walkDistance/2.2)!==L&&!this.sneaking&&this.onStep()}else this.onLadder&&(this.walkDistance+=Math.abs(this.y-E)*.8);if(this.survival&&(this.exhaustion+=S*(this.sprinting?.1:this.inWater?.015:.01),m&&(this.exhaustion+=this.sprinting?.2:.05)),this.flying||this.inWater||this.onLadder||!this.survival?this.fallDistance=0:this.y<E&&(this.fallDistance+=E-this.y),this.onGround&&!T){this.fallDistance>1.5&&this.onLand(this.fallDistance);const L=Math.ceil(this.fallDistance-3);L>0&&this.damage(L,"fall"),this.fallDistance=0}this.y<-40&&this.damage(4*t*10,"void"),this.survivalTick(t)}survivalTick(t){if(!this.survival){this.air=15,this.fire=0;return}for(this.eyeInWater?(this.air-=t,this.air<=0&&(this.air=0,this.drownTimer+=t,this.drownTimer>=1&&(this.drownTimer=0,this.damage(2,"drown")))):this.air=Math.min(15,this.air+t*5),this.inLava&&(this.fire=8,this.lavaTimer+=t,this.lavaTimer>=.5&&(this.lavaTimer=0,this.damage(4,"lava"))),this.inWater&&(this.fire=0),this.fire>0&&(this.fire-=t,this.fireTimer+=t,this.fireTimer>=1&&(this.fireTimer=0,this.damage(1,"fire")));this.exhaustion>=4;)this.exhaustion-=4,this.saturation>0?this.saturation=Math.max(0,this.saturation-1):this.food=Math.max(0,this.food-1);this.food>=18&&this.hp<20?(this.regenTimer+=t,this.regenTimer>=4&&(this.regenTimer=0,this.hp=Math.min(20,this.hp+1),this.exhaustion+=3)):this.regenTimer=0,this.food<=0&&(this.starveTimer+=t,this.starveTimer>=4&&(this.starveTimer=0,this.hp>1&&this.damage(1,"starve")))}damage(t,e,n=0,s=0){if(!this.alive||!this.survival&&e!=="kill"&&e!=="void"||this.hurtCooldown>0&&e!=="kill"&&e!=="void")return;const r=!["fall","drown","starve","void","kill","fire","lava"].includes(e);let o=t;r&&(o*=1-Math.min(20,this.armorPoints())/25),this.hp=Math.max(0,this.hp-o),this.hurtCooldown=.5,this.exhaustion+=.1,this.lastCause=e,this.sleeping=!1,(n||s)&&(this.vx+=n*5,this.vz+=s*5,this.vy=Math.max(this.vy,4.5)),this.onHurt(o,e),this.hp<=0&&(this.alive=!1,this.onDeath(e))}eat(t,e){this.food=Math.min(20,this.food+t),this.saturation=Math.min(this.food,this.saturation+e)}addExhaustion(t){this.survival&&(this.exhaustion+=t)}respawn(t,e,n){this.setPosition(t,e,n),this.hp=20,this.food=20,this.saturation=5,this.exhaustion=0,this.air=15,this.fire=0,this.alive=!0}}function EE(i,t,e,n,s,r,o){let a=-1/0,c=1/0,l=-1,h=0;const u=[i,t,e],f=[n,s,r];for(let d=0;d<3;d++){const m=o[d],_=o[d+3];if(Math.abs(f[d])<1e-12){if(u[d]<m||u[d]>_)return null;continue}let g=(m-u[d])/f[d],p=(_-u[d])/f[d],M=-1;if(g>p&&([g,p]=[p,g],M=1),g>a&&(a=g,l=d,h=M),c=Math.min(c,p),a>c)return null}return c<0?null:{t:Math.max(0,a),axis:l,sign:h}}function jd(i,t,e,n,s,r,o,a){let c=Math.floor(t),l=Math.floor(e),h=Math.floor(n);const u=Math.sign(s),f=Math.sign(r),d=Math.sign(o),m=u?Math.abs(1/s):1/0,_=f?Math.abs(1/r):1/0,g=d?Math.abs(1/o):1/0;let p=u>0?(c+1-t)*m:u<0?(t-c)*m:1/0,M=f>0?(l+1-e)*_:f<0?(e-l)*_:1/0,b=d>0?(h+1-n)*g:d<0?(n-h)*g:1/0,v=0;for(let E=0;E<64&&v<=a;E++){const T=i(c,l,h),S=T&Ge;if(S!==C.AIR&&pn[S]!==Kr&&pn[S]!==Xr){const L=c,x=l,y=h,A=Fh(T,(N,z,X)=>i(L+N,x+z,y+X));let P=null;for(const N of A){const z=EE(t,e,n,s,r,o,[c+N[0],l+N[1],h+N[2],c+N[3],l+N[4],h+N[5]]);z&&z.t<=a&&(!P||z.t<P.t)&&(P=z)}if(P){const N=[0,0,0];return P.axis>=0&&(N[P.axis]=P.sign),{x:c,y:l,z:h,nx:N[0],ny:N[1],nz:N[2],state:T,px:t+s*P.t,py:e+r*P.t,pz:n+o*P.t,dist:P.t}}}p<M&&p<b?(c+=u,v=p,p+=m):M<b?(l+=f,v=M,M+=_):(h+=d,v=b,b+=g)}return null}function wE(i,t,e,n,s,r,o,a){const c=Math.ceil(a/.1);for(let l=1;l<=c;l++){const h=l*.1,u=Math.floor(t+s*h),f=Math.floor(e+r*h),d=Math.floor(n+o*h),m=i(u,f,d),_=m&Ge;if(pn[_]===Kr)return{x:u,y:f,z:d,state:m};if(_!==C.AIR&&pn[_]!==Xr&&pn[_]!==Yr)return null}return null}const yi=(i,t,e)=>[i[0]+(t[0]-i[0])*e,i[1]+(t[1]-i[1])*e,i[2]+(t[2]-i[2])*e],cs=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)},TE={zenith:[.1,.27,.75],horizon:[.5,.68,1],ambient:[.34,.42,.58],light:[1.05,.97,.82],glow:[.55,.5,.4]},AE={zenith:[.14,.18,.42],horizon:[1.05,.5,.22],ambient:[.32,.27,.3],light:[.95,.5,.22],glow:[1.5,.62,.2]},Zd={zenith:[.004,.006,.018],horizon:[.014,.02,.048],ambient:[.05,.065,.12],light:[.16,.2,.32],glow:[.02,.025,.04]},RE=[.32,.35,.4],em=12,In=64,br=em*In,CE=118,LE=4,Jd=9;class DE{constructor(t,e){w(this,"sunDir",new F);w(this,"lightDir",new F);w(this,"daylight",1);w(this,"night",0);w(this,"sunVisibility",1);w(this,"rayColor",new F);w(this,"dome");w(this,"skyUniforms");w(this,"clouds",null);w(this,"cloudPrepass",null);w(this,"cloudDrift",0);w(this,"cloudTiles","");this.scene=t,this.u=e,this.skyUniforms={...e,uNight:{value:0},uSunDisk:{value:new F},uMoonDisk:{value:new F}};const n=new en({vertexShader:pb,fragmentShader:mb,uniforms:this.skyUniforms,side:Cn,depthWrite:!1});this.dome=new fe(new xu(500,32,16),n),this.dome.frustumCulled=!1,this.dome.renderOrder=-1e3,t.add(this.dome)}setClouds(t){t&&!this.clouds&&this.buildClouds(),this.clouds&&(this.clouds.visible=t),this.cloudPrepass&&(this.cloudPrepass.visible=t)}update(t,e,n,s,r,o){const a=this.u,c=t/up*Math.PI*2;this.sunDir.set(Math.cos(c),Math.sin(c),.3).normalize();const l=this.sunDir.y,h=cs(-.14,.18,l),u=Math.max(0,1-Math.abs(l)/.32)*cs(-.3,.02,l);this.daylight=.15+.85*h,this.night=1-cs(-.2,.05,l);const f=b=>{let v=yi(Zd[b],TE[b],h);return v=yi(v,AE[b],u*.85),v};let d=f("zenith"),m=f("horizon"),_=f("ambient");const g=f("glow");let p=f("light");if(l>-.06){this.lightDir.copy(this.sunDir);const b=cs(-.06,.12,l);p=yi([0,0,0],p,b)}else{this.lightDir.copy(this.sunDir).negate();const b=cs(.06,.25,-l);p=yi([0,0,0],Zd.light,b)}if(e>0){const b=yi([.01,.012,.02],RE,h);d=yi(d,b,e*.85),m=yi(m,yi(b,[.45,.48,.52],h*.5),e*.85),_=yi(_,[_[0]*.75,_[1]*.78,_[2]*.8],e),p=yi(p,[p[0]*.15,p[1]*.16,p[2]*.18],e)}a.uSunDir.value.copy(this.sunDir),a.uLightDir.value.copy(this.lightDir),a.uLightColor.value.set(...p),a.uAmbient.value.set(..._),a.uZenith.value.set(...d),a.uHorizon.value.set(...m),a.uSunGlow.value.set(...g).multiplyScalar(1-e*.8),a.uRain.value=e,a.uUnderwater.value=o?1:0,a.uWaterFog.value.set(.015,.06,.13).multiplyScalar(.25+.75*this.daylight);const M=Math.max(32,r*16-6);if(a.uFogFar.value=M*(1-e*.35),a.uFogNear.value=M*(.42-e*.2),this.skyUniforms.uNight.value=this.night,this.skyUniforms.uSunDisk.value.set(55,46,32).multiplyScalar(cs(-.05,.05,l)),this.skyUniforms.uMoonDisk.value.set(2.6,2.8,3.2).multiplyScalar(cs(-.05,.05,-l)),this.sunVisibility=cs(-.02,.12,l)*(1-e),this.rayColor.set(...g).multiplyScalar(.9+u).lerp(new F(...p).multiplyScalar(.25),.4),this.dome.position.copy(n.position),this.clouds&&this.cloudPrepass){this.cloudDrift+=s*.8,this.clouds.position.set(this.cloudDrift,CE,0),this.cloudPrepass.position.copy(this.clouds.position);const b=a.uFogFar.value*3.2,v=n.position.x-this.cloudDrift,E=n.position.z,T=Math.floor((v-b)/br),S=Math.floor((v+b)/br),L=Math.floor((E-b)/br),x=Math.floor((E+b)/br),y=`${T},${S},${L},${x}`;if(y!==this.cloudTiles){this.cloudTiles=y;const A=new de;let P=0;for(let N=L;N<=x;N++)for(let z=T;z<=S&&P<Jd;z++,P++)A.makeTranslation(z*br,0,N*br),this.clouds.setMatrixAt(P,A),this.cloudPrepass.setMatrixAt(P,A);for(const N of[this.clouds,this.cloudPrepass])N.count=P,N.instanceMatrix.needsUpdate=!0}}}buildClouds(){const t=us(Ho(4242)),e=[];for(let d=0;d<In;d++)for(let m=0;m<In;m++){const _=m/In*Math.PI*2,g=d/In*Math.PI*2,p=t(Math.cos(_)*1.6,Math.sin(_)*1.6+Math.cos(g)*1.6)*.6+t(Math.sin(g)*3.2,Math.cos(_)*3.2+Math.sin(g))*.4;e.push(p>.22)}const n=(d,m)=>e[(m%In+In)%In*In+(d%In+In)%In],s=[],r=[],o=(d,m)=>{const[_,g,p,M]=d;s.push(..._,...g,...p,..._,...p,...M);for(let b=0;b<6;b++)r.push(m)},a=em,c=LE;for(let d=0;d<In;d++)for(let m=0;m<In;m++){if(!n(m,d))continue;const _=m*a,g=d*a,p=_+a,M=g+a;o([[_,c,M],[p,c,M],[p,c,g],[_,c,g]],1),o([[_,0,g],[p,0,g],[p,0,M],[_,0,M]],.62),n(m+1,d)||o([[p,0,M],[p,0,g],[p,c,g],[p,c,M]],.78),n(m-1,d)||o([[_,0,g],[_,0,M],[_,c,M],[_,c,g]],.78),n(m,d+1)||o([[_,0,M],[p,0,M],[p,c,M],[_,c,M]],.86),n(m,d-1)||o([[p,0,g],[_,0,g],[_,c,g],[p,c,g]],.86)}const l=new He;l.setAttribute("position",new Ye(s,3)),l.setAttribute("aShade",new Ye(r,1));const h=new en({vertexShader:cd,fragmentShader:gb,uniforms:this.u,transparent:!0,depthWrite:!1}),u=new en({vertexShader:cd,fragmentShader:"void main() { gl_FragColor = vec4(0.0); }",colorWrite:!1}),f=d=>{const m=new p1(l,d,Jd);return m.count=0,m.frustumCulled=!1,m};this.cloudPrepass=f(u),this.cloudPrepass.renderOrder=1,this.clouds=f(h),this.clouds.renderOrder=2,this.scene.add(this.cloudPrepass,this.clouds),this.cloudTiles=""}}const PE="#e0ac80",IE=new Jr().setFromUnitVectors(new F(0,1,0),new F(-.36,.3,-.88).normalize());class NE{constructor(t,e,n){w(this,"root",new fn);w(this,"arm");w(this,"armLight",{value:new F(1,1,1)});w(this,"item",null);w(this,"itemId",-1);w(this,"swingTime",1);w(this,"equip",1);w(this,"bob",0);this.meshes=e,t.add(new n0("#ffffff",Math.PI*.75));const s=new e0("#ffffff",Math.PI*.55);s.position.set(-.5,1,.6),t.add(s);const r=new gi({color:PE}),o=new gi({color:n});this.arm=new fe(new Xe(.25,.75,.25),r);const a=new fe(new Xe(.27,.3,.27),o);a.position.y=-.24,this.arm.add(a),Ss(this.arm,this.armLight),t.add(this.root)}swing(){this.swingTime>.5&&(this.swingTime=0)}setItem(t){var n;const e=t??0;if(e!==this.itemId){if(this.itemId=e,this.equip=0,this.root.clear(),(n=this.item)==null||n.dispose(),this.item=null,!e){this.root.add(this.arm);return}this.item=this.meshes.create(e,void 0,!0),this.root.add(this.item.object)}}update(t,e){this.swingTime=Math.min(1,this.swingTime+t/.3),e.mining&&this.swingTime>=1&&(this.swingTime=0),this.equip=Math.min(1,this.equip+t/.2),e.speed>.1&&(this.bob+=t*e.speed*2.2);const n=Math.min(1,e.speed/4.3),s=this.swingTime,r=Math.sin(Math.sqrt(s)*Math.PI),o=Math.sin(s*s*Math.PI),a=Math.sin(this.bob)*.025*n,c=-Math.abs(Math.cos(this.bob))*.03*n,l=(1-this.equip)*.6,h=this.itemId?this.meshes.isFlat(this.itemId):!1,u=this.root;if(u.rotation.set(0,0,0),u.scale.setScalar(1),this.itemId?h?(u.position.set(.5+a-r*.25,-.38+c-l+Math.sin(Math.sqrt(s)*Math.PI*2)*.12,-.62-r*.2),u.rotation.set(-r*1.2,-1.3+o*.4,.35),u.scale.setScalar(.62)):(u.position.set(.48+a-r*.25,-.42+c-l+Math.sin(Math.sqrt(s)*Math.PI*2)*.1,-.68-r*.15),u.rotation.set(-r*.8,.78,0),u.scale.setScalar(.4)):(u.position.set(.5+a-r*.25,-.5+c-l+Math.sin(Math.sqrt(s)*Math.PI*2)*.1,-.56-r*.2),u.rotation.set(-r*.7,-o*.3,r*.25),this.arm.position.set(0,0,0),this.arm.quaternion.copy(IE)),e.eating>0){const f=Math.min(1,e.eating*4);u.position.x-=.32*f,u.position.y+=.18*f+Math.abs(Math.sin(e.eating*40))*.03,u.rotation.y+=.5*f}e.bowDraw>0&&(u.position.x-=.28*Math.min(1,e.bowDraw*3),u.position.z+=.1*e.bowDraw,u.rotation.y+=.6,e.bowDraw>=1&&(u.position.y+=Math.sin(performance.now()*.05)*.004)),this.item&&(this.item.light.set(e.sky,e.block),this.item.color.value.copy(e.lightColor)),this.armLight.value.copy(e.lightColor)}get isBlockInHand(){return this.itemId>0&&_s(this.itemId)&&!this.meshes.isFlat(this.itemId)}}const No=Bt+2,Hi=No*No,hc=Hi*(Ae+2),Zn=Ae/16,Iu=(i,t,e)=>((t+1)*No+(e+1))*No+(i+1);function UE(i,t,e){t.fill(0),e.fill(0),t.fill(C.BEDROCK,0,Hi),e.fill(240,Hi*(Ae+1));for(let n=-1;n<=1;n++)for(let s=-1;s<=1;s++){const r=i[(n+1)*3+(s+1)];if(!r)continue;const o=s===-1?Bt-1:0,a=s===1?0:Bt-1,c=n===-1?Bt-1:0,l=n===1?0:Bt-1;for(let h=0;h<Ae;h++)for(let u=c;u<=l;u++){let f=Iu(o+s*Bt,h,u+n*Bt),d=Hn(o,h,u);for(let m=o;m<=a;m++,f++,d++)t[f]=r.blocks[d],e[f]=r.light[d]}}}class kl{constructor(){w(this,"pos",new Uint16Array(4096*4));w(this,"data",new Uint8Array(4096*4));w(this,"index",new Uint32Array(4096*6));w(this,"verts",0);w(this,"indices",0);w(this,"minY",Ae);w(this,"maxY",0);w(this,"sections",new Uint32Array(Zn+1))}reset(){this.verts=0,this.indices=0,this.minY=Ae,this.maxY=0,this.sections.fill(0)}grow(){const t=new Uint16Array(this.pos.length*2);t.set(this.pos),this.pos=t;const e=new Uint8Array(this.data.length*2);e.set(this.data),this.data=e;const n=new Uint32Array(this.index.length*2);n.set(this.index),this.index=n}vertex(t,e,n,s,r,o,a,c){(this.verts+1)*4>this.pos.length&&this.grow();const l=this.verts*4;this.pos[l]=t,this.pos[l+1]=e,this.pos[l+2]=n,this.pos[l+3]=s,this.data[l]=r,this.data[l+1]=o,this.data[l+2]=a,this.data[l+3]=c,this.verts++}quad(t,e){this.indices+12>this.index.length&&this.grow();const n=this.verts-4,s=this.index;let r=this.indices;t?(s[r++]=n+1,s[r++]=n+2,s[r++]=n+3,s[r++]=n+1,s[r++]=n+3,s[r++]=n):(s[r++]=n,s[r++]=n+1,s[r++]=n+2,s[r++]=n,s[r++]=n+2,s[r++]=n+3),e&&(s[r++]=n,s[r++]=n+2,s[r++]=n+1,s[r++]=n,s[r++]=n+3,s[r++]=n+2),this.indices=r}span(t,e){t<this.minY&&(this.minY=t),e>this.maxY&&(this.maxY=e)}build(){if(!this.verts)return null;const t=this.verts>65535?this.index.slice(0,this.indices):Uint16Array.from(this.index.subarray(0,this.indices));return{pos:this.pos.slice(0,this.verts*4),data:this.data.slice(0,this.verts*4),index:t,minY:Math.max(0,Math.floor(this.minY)),maxY:Math.min(Ae,Math.ceil(this.maxY)),sections:this.sections.slice()}}}const nm=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],Vo=[[[1,0,1,0,1],[1,0,0,1,1],[1,1,0,1,0],[1,1,1,0,0]],[[0,0,0,0,1],[0,0,1,1,1],[0,1,1,1,0],[0,1,0,0,0]],[[0,1,1,0,1],[1,1,1,1,1],[1,1,0,1,0],[0,1,0,0,0]],[[0,0,0,0,1],[1,0,0,1,1],[1,0,1,1,0],[0,0,1,0,0]],[[0,0,1,0,1],[1,0,1,1,1],[1,1,1,1,0],[0,1,1,0,0]],[[1,0,0,0,1],[0,0,0,1,1],[0,1,0,1,0],[1,1,0,0,0]]],bo=(i,t,e)=>t*Hi+e*No+i,Uo=nm.map(([i,t,e])=>bo(i,t,e)),kE=nm.map((i,t)=>{const e=i.findIndex(s=>s!==0),n=[0,1,2].filter(s=>s!==e);return Vo[t].map(s=>{const r=[...i],o=[...i];r[n[0]]+=s[n[0]]?1:-1,o[n[1]]+=s[n[1]]?1:-1;const a=[...i];return a[n[0]]=r[n[0]],a[n[1]]=o[n[1]],[bo(r[0],r[1],r[2]),bo(o[0],o[1],o[2]),bo(a[0],a[1],a[2])]})});function OE(i,t,e){switch(e&3){case 1:return[1-t,i];case 2:return[1-i,1-t];case 3:return[t,1-i];default:return[i,t]}}const no=(i,t,e,n)=>i|t<<8|e<<11|n<<13,xn=(i,t,e)=>i|t<<5|e<<7,gs=i=>Math.round(i*17),FE={opaque:new kl,cutout:new kl,translucent:new kl};function BE(i,t,e){const{opaque:n,cutout:s,translucent:r}=FE;n.reset(),s.reset(),r.reset();const o=[0,0,0,0],a=[0,0,0,0],c=[0,0,0,0];let l=0;for(let h=0;h<Ae;h++){const u=1<<(h>>4);if((h&15)===0){const f=h>>4;n.sections[f]=n.indices,s.sections[f]=s.indices,r.sections[f]=r.indices}for(let f=0;f<Bt;f++){let d=Iu(0,h,f);for(let m=0;m<Bt;m++,d++){const _=i[d],g=_&Ge,p=pn[g];if(p===Xr)continue;const M=_>>>10,b=bp[g],v=b===Mp?r:b===xp?s:n;if(p===fc){const x=Wl[g]===1,y=g===C.ICE?1:0;for(let A=0;A<6;A++){const N=i[d+Uo[A]]&Ge;if(un[N]||N===g&&(Sp[g]||x&&!1))continue;const z=d+Uo[A],X=kE[A];for(let Z=0;Z<4;Z++){const rt=d+X[Z][0],Mt=d+X[Z][1],Ut=d+X[Z][2],zt=un[i[rt]&Ge],te=un[i[Mt]&Ge],re=zt&&te?1:un[i[Ut]&Ge];o[Z]=zt&&te?0:3-zt-te-re;let Q=t[z]>>4,nt=t[z]&15,mt=1;zt||(Q+=t[rt]>>4,nt+=t[rt]&15,mt++),te||(Q+=t[Mt]>>4,nt+=t[Mt]&15,mt++),re||(Q+=t[Ut]>>4,nt+=t[Ut]&15,mt++),a[Z]=gs(Q/mt),c[Z]=gs(nt/mt)}a[0]+a[1]+a[2]+a[3]>0&&(l|=u);const W=Rn[g*384+M*6+A],K=zo[W],G=Vo[A];for(let Z=0;Z<4;Z++){const rt=G[Z];v.vertex((m+rt[0])*16,(h+rt[1])*16,(f+rt[2])*16,no(W,A,o[Z],K),xn(rt[3]*16,x?1:0,0),rt[4]*16+(y<<5),a[Z],c[Z])}v.quad(o[0]+o[2]<o[1]+o[3],!1),v.span(h,h+1)}continue}const E=t[d],T=gs(E>>4),S=gs(E&15);if((E>>4||t[d+Hi]>>4)&&(l|=u),p===Yr){const x=Rn[g*384+M*6],y=Wl[g]===2?2:0,A=Math.max(Math.floor($e(m,h,f,77)*7)-3,-m*16),P=Math.max(Math.floor($e(f,h,m,78)*7)-3,-f*16);Qd(v,m,h,f,A,P,[0,0,16,16],x,y,T,S),Qd(v,m,h,f,A,P,[0,16,16,0],x,y,T,S),v.span(h,h+1);continue}if(p===Bo){const x=Rn[g*384+M*6];for(const y of[4,12])tp(v,m,h,f,"x",y,x,T,S),tp(v,m,h,f,"z",y,x,T,S);v.span(h,h+1);continue}if(p===Kr){WE(v,i,t,d,m,h,f,_);continue}if(p===qr){zE(v,m,h,f,M,Rn[g*384],T,S),v.span(h,h+1);continue}const L=yu(_,(x,y,A)=>i[d+bo(x,y,A)]);for(const x of L)HE(v,i,t,d,m,h,f,g,M,x)}}}for(const h of[n,s,r])h.sections[Zn]=h.indices;return{opaque:n.build(),cutout:s.build(),translucent:r.build(),lit:l}}function Qd(i,t,e,n,s,r,o,a,c,l,h){const[u,f,d,m]=o,_=t*16+s,g=n*16+r,p=e*16,M=no(a,6,3,zo[a]);i.vertex(_+u,p,g+f,M,xn(0,0,0),16,l,h),i.vertex(_+d,p,g+m,M,xn(16,0,0),16,l,h),i.vertex(_+d,p+16,g+m,M,xn(16,c,0),0,l,h),i.vertex(_+u,p+16,g+f,M,xn(0,c,0),0,l,h),i.quad(!1,!0)}function tp(i,t,e,n,s,r,o,a,c){const l=no(o,6,3,0),h=Math.max(0,e*16-1);if(s==="x"){const u=t*16+r;i.vertex(u,h,n*16,l,xn(0,0,0),16,a,c),i.vertex(u,h,n*16+16,l,xn(16,0,0),16,a,c),i.vertex(u,h+16,n*16+16,l,xn(16,2,0),0,a,c),i.vertex(u,h+16,n*16,l,xn(0,2,0),0,a,c)}else{const u=n*16+r;i.vertex(t*16,h,u,l,xn(0,0,0),16,a,c),i.vertex(t*16+16,h,u,l,xn(16,0,0),16,a,c),i.vertex(t*16+16,h+16,u,l,xn(16,2,0),0,a,c),i.vertex(t*16,h+16,u,l,xn(0,2,0),0,a,c)}i.quad(!1,!0)}function zE(i,t,e,n,s,r,o,a){const c=s>=1&&s<=4,l=c?s-1:0,h=l===1?1:l===3?-1:0,u=l===0?-1:l===2?1:0,f=[7/16,0,7/16,9/16,10/16,9/16],d=(m,_,g)=>{if(!c)return[m,_,g];const p=_*.4;return[m+h*.3125-h*p,_+.2,g+u*.3125-u*p]};for(let m=0;m<6;m++){const[_,g,p,M]=GE(m),b=Vo[m];for(let v=0;v<4;v++){const E=b[v],T=E[0]?f[3]:f[0],S=E[1]?f[4]:f[1],L=E[2]?f[5]:f[2],[x,y,A]=d(T,S,L);i.vertex(Math.round((t+x)*16),Math.round((e+y)*16),Math.round((n+A)*16),no(r,m,3,1),xn(E[3]?p:_,0,0),E[4]?M:g,o,a)}i.quad(!1,!1)}}function GE(i){return i===2?[7,6,9,8]:i===3?[7,14,9,16]:[7,6,9,16]}function HE(i,t,e,n,s,r,o,a,c,l){const[h,u,f,d,m,_]=l;for(let g=0;g<6;g++){const p=g===0&&d>=1||g===1&&h<=0||g===2&&m>=1||g===3&&u<=0||g===4&&_>=1||g===5&&f<=0,M=n+Uo[g];if(p&&un[t[M]&Ge])continue;const b=p?e[M]:e[n],v=gs(b>>4),E=gs(b&15),T=Rn[a*384+c*6+g],S=zo[T],L=g===2?Ep[a*64+c]:0,x=Vo[g];for(let y=0;y<4;y++){const A=x[y],P=A[0]?d:h,N=A[1]?m:u,z=A[2]?_:f;let[X,W]=VE(g,P,N,z);L&&([X,W]=OE(X,W,L)),i.vertex(Math.round((s+P)*16),Math.round((r+N)*16),Math.round((o+z)*16),no(T,g,3,S),xn(Math.round(X*16),0,0),Math.round(W*16),v,E)}i.quad(!1,!1)}i.span(r+u,r+Math.min(m,1.5))}function VE(i,t,e,n){const s=Math.min(1,Math.max(0,e));switch(i){case 0:return[1-n,1-s];case 1:return[n,1-s];case 2:return[t,n];case 3:return[t,1-n];case 4:return[t,1-s];default:return[1-t,1-s]}}function WE(i,t,e,n,s,r,o,a){const c=a&Ge,h=(t[n+Hi]&Ge)===c,u=h?1:$a(a),f=c===C.WATER,d=e[n],m=Math.max(d>>4,e[n+Hi]>>4),_=gs(m),g=gs(Math.max(d&15,e[n+Hi]&15)),p=a>>>10;for(let M=0;M<6;M++){const b=t[n+Uo[M]],v=b&Ge;if(un[v]&&M!==2)continue;let E=0,T=u;if(M===2){if(h||un[v]&&u>=1)continue}else if(M===3){if(v===c)continue}else if(v===c&&(E=(t[n+Uo[M]+Hi]&Ge)===c?1:$a(b),E>=T))continue;const S=Rn[c*384+p*6+M],L=zo[S],x=M===2&&f?3:0,y=Vo[M];for(let A=0;A<4;A++){const P=y[A],N=M===2?u:M===3?0:P[1]?T:E,z=M===2||M===3?P[4]:1-N;i.vertex((s+P[0])*16,Math.round((r+N)*16),(o+P[2])*16,no(S,M,3,L),xn(P[3]*16,x,1),Math.round(z*16)+(f?0:32),_,g)}i.quad(!1,!1)}i.span(r,r+1)}function XE(i){const t=new Uint16Array(hc),e=new Uint8Array(hc).fill(240);return t[Iu(0,1,0)]=i,BE(t,e)}function YE(i){const t=new He;return t.setAttribute("aPos",new ye(i.pos,4)),t.setAttribute("aData",new ye(i.data,4)),t.setIndex(new ye(i.index,1)),t.boundingSphere=new qi(new F(.5,1.5,.5),1.2),t}function KE(i){const t=[],e=[],n=[],s=new qt,r=i.width,o=i.height,a=(f,d)=>f>=0&&d>=0&&f<r&&d<o&&i.getAlpha(f,d)>127,c=1/16,l=c,h=(f,d,m,_,g)=>{for(const p of[f,d,m,f,m,_])t.push(...p),e.push(...g),n.push(s.r,s.g,s.b)};for(let f=0;f<o;f++)for(let d=0;d<r;d++){if(!a(d,f))continue;const[m,_,g]=i.get(d,f);s.setRGB(m/255,_/255,g/255,hn);const p=d*c-.5,M=p+c,b=.5-f*c,v=b-c,E=-l/2,T=l/2;h([p,v,T],[M,v,T],[M,b,T],[p,b,T],[0,0,1]),h([M,v,E],[p,v,E],[p,b,E],[M,b,E],[0,0,-1]),a(d-1,f)||h([p,v,E],[p,v,T],[p,b,T],[p,b,E],[-1,0,0]),a(d+1,f)||h([M,v,T],[M,v,E],[M,b,E],[M,b,T],[1,0,0]),a(d,f-1)||h([p,b,T],[M,b,T],[M,b,E],[p,b,E],[0,1,0]),a(d,f+1)||h([p,v,E],[M,v,E],[M,v,T],[p,v,T],[0,-1,0])}const u=new He;return u.setAttribute("position",new Ye(t,3)),u.setAttribute("normal",new Ye(e,3)),u.setAttribute("color",new Ye(n,3)),u.computeBoundingSphere(),u}class qE{constructor(t,e){w(this,"blockGeo",new Map);w(this,"spriteGeo",new Map);this.atlas=t,this.materials=e}setMaterials(t){this.materials=t}isFlat(t){if(!_s(t))return!0;const e=pn[t];return e===Yr||e===Bo||e===qr||e===$r}spriteFor(t){const e=ge(t);return _s(t)?this.atlas.tiles[Rn[t*384]]:tm((e==null?void 0:e.sprite)??"stick")}create(t,e,n=!1){var c,l;const s=new Ft(1,0),r={value:new F(1,1,1)},o=new fn,a=[];if(e!==void 0||!this.isFlat(t)){const h=e??((c=ge(t))==null?void 0:c.places)??ei(t);let u=this.blockGeo.get(h);if(!u){const d=XE(h);u=[d.opaque,d.cutout,d.translucent].filter(m=>!!m).map(YE),this.blockGeo.set(h,u)}const f=new fn;f.position.set(-.5,-1.5,-.5);for(const d of u){const m=this.materials.entityBlock(s,n);a.push(m);const _=new fe(d,m);_.frustumCulled=!1,f.add(_)}o.add(f)}else{const h=_s(t)?`block:${t}`:((l=ge(t))==null?void 0:l.sprite)??"stick";let u=this.spriteGeo.get(h);u||this.spriteGeo.set(h,u=KE(this.spriteFor(t)));const f=new gi({vertexColors:!0});a.push(f),o.add(new fe(u,f)),Ss(o,r)}return{object:o,light:s,color:r,dispose:()=>a.forEach(h=>h.dispose())}}}const $E=`
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
`,jE=`
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
`;class ZE{constructor(t,e){w(this,"crack");w(this,"crackMat");w(this,"outline");w(this,"layers",Array.from({length:10},(t,e)=>iu(`destroy_${e}`)));this.crackMat=new zs({glslVersion:Bi,vertexShader:$E,fragmentShader:jE,uniforms:{uAtlas:{value:e},uLayer:{value:0}},transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-4});const n=new Xe(1,1,1);n.translate(.5,.5,.5),this.crack=new fe(n,this.crackMat),this.crack.visible=!1,this.crack.renderOrder=3,t.add(this.crack);const s=new M1(new Xe(1,1,1).translate(.5,.5,.5));this.outline=new jp(s,new $p({color:"#000000",transparent:!0,opacity:.5})),this.outline.visible=!1,t.add(this.outline)}fit(t,e,n,s,r,o){let a=1,c=1,l=1,h=0,u=0,f=0;for(const d of r)a=Math.min(a,d[0]),c=Math.min(c,d[1]),l=Math.min(l,d[2]),h=Math.max(h,d[3]),u=Math.max(u,d[4]),f=Math.max(f,d[5]);t.position.set(e+a-o,n+c-o,s+l-o),t.scale.set(h-a+o*2,u-c+o*2,f-l+o*2)}setTarget(t){this.outline.visible=!!t&&t.boxes.length>0,t&&this.outline.visible&&this.fit(this.outline,t.x,t.y,t.z,t.boxes,.003)}setCrack(t,e){this.crack.visible=!!t&&e>=0&&t.boxes.length>0,!(!t||!this.crack.visible)&&(this.crackMat.uniforms.uLayer.value=this.layers[Math.max(0,Math.min(9,e))],this.fit(this.crack,t.x,t.y,t.z,t.boxes,.002))}}const JE=`
attribute float aAlpha;
varying float vAlpha;
varying vec3 vWorld;
void main() {
  vAlpha = aAlpha;
  vec4 w = modelMatrix * vec4(position, 1.0);
  vWorld = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}
`,QE=`
${$i}
${eo}
varying float vAlpha;
varying vec3 vWorld;
void main() {
  vec3 c = (uAmbient * 1.2 + uLightColor * 0.2) * vec3(0.75, 0.82, 1.0);
  gl_FragColor = vec4(c, 0.45 * vAlpha);
}
`,tw=`
uniform float uPixelScale;
void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = clamp(uPixelScale * 0.07 / -mv.z, 1.0, 9.0);
  gl_Position = projectionMatrix * mv;
}
`,ew=`
${$i}
void main() {
  gl_FragColor = vec4(uAmbient * 1.4 + uLightColor * 0.6 + vec3(0.02), 0.9);
}
`,Sr=900;class nw{constructor(t,e,n,s,r=()=>1){w(this,"lines");w(this,"flakes");w(this,"pos",new Float32Array(Sr*6));w(this,"alpha",new Float32Array(Sr*2));w(this,"flakePos",new Float32Array(Sr*3));w(this,"drops",[]);w(this,"snowUniforms",{uPixelScale:{value:800}});w(this,"kind",1);w(this,"kindTimer",0);w(this,"time",0);w(this,"intensity",0);this.surfaceY=n,this.onSplash=s,this.precipitation=r;const o=new He;o.setAttribute("position",new ye(this.pos,3).setUsage(qs)),o.setAttribute("aAlpha",new ye(this.alpha,1).setUsage(qs)),this.lines=new jp(o,new en({vertexShader:JE,fragmentShader:QE,uniforms:e,transparent:!0,depthWrite:!1})),this.lines.frustumCulled=!1,this.lines.visible=!1,t.add(this.lines);const a=new He;a.setAttribute("position",new ye(this.flakePos,3).setUsage(qs)),this.flakes=new Zp(a,new en({vertexShader:tw,fragmentShader:ew,uniforms:{...e,...this.snowUniforms},transparent:!0,depthWrite:!1})),this.flakes.frustumCulled=!1,this.flakes.visible=!1,t.add(this.flakes)}setPixelScale(t){this.snowUniforms.uPixelScale.value=t}reset(t,e,n,s,r){t.x=e+(Math.random()-.5)*32,t.z=s+(Math.random()-.5)*32,t.y=r?n+14+Math.random()*6:n+(Math.random()-.3)*24,t.floor=this.surfaceY(Math.floor(t.x),Math.floor(t.z))+1,t.speed=this.kind===2?1.6+Math.random()*1.2:22+Math.random()*8,t.phase=Math.random()*Math.PI*2}update(t,e){if(this.time+=t,this.kindTimer-=t,this.kindTimer<=0){this.kindTimer=.5;const o=this.precipitation(Math.floor(e.x),Math.floor(e.y),Math.floor(e.z));if(o!==this.kind){this.kind=o;for(const a of this.drops)this.reset(a,e.x,e.y,e.z,!1)}}const n=this.intensity>.01&&this.kind!==0;if(this.lines.visible=n&&this.kind===1,this.flakes.visible=n&&this.kind===2,!n)return;const s=this.kind===2,r=Math.floor(Sr*this.intensity);for(;this.drops.length<Sr;){const o={x:0,y:0,z:0,floor:0,speed:0,phase:0};this.reset(o,e.x,e.y,e.z,!1),this.drops.push(o)}for(let o=0;o<Sr;o++){const a=this.drops[o];a.y-=a.speed*t,s&&(a.x+=Math.sin(this.time*1.3+a.phase)*.5*t,a.z+=Math.cos(this.time*1.1+a.phase*1.7)*.4*t),(a.y<a.floor||Math.abs(a.x-e.x)>18||Math.abs(a.z-e.z)>18)&&(!s&&a.y<a.floor&&a.floor>e.y-16&&Math.random()<.08&&this.onSplash(a.x,a.floor,a.z),this.reset(a,e.x,e.y,e.z,!0));const c=o<r&&a.y>a.floor?1:0;if(s){const h=o*3;this.flakePos[h]=a.x,this.flakePos[h+1]=c?a.y:-9999,this.flakePos[h+2]=a.z;continue}const l=o*6;this.pos[l]=a.x,this.pos[l+1]=a.y,this.pos[l+2]=a.z,this.pos[l+3]=a.x,this.pos[l+4]=a.y+.7,this.pos[l+5]=a.z,this.alpha[o*2]=c,this.alpha[o*2+1]=c*.2}s?this.flakes.geometry.getAttribute("position").needsUpdate=!0:(this.lines.geometry.getAttribute("position").needsUpdate=!0,this.lines.geometry.getAttribute("aAlpha").needsUpdate=!0)}}const Er=2048,iw=`
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
`,sw=`
precision highp float;
precision highp sampler2DArray;
uniform sampler2DArray uAtlas;
${$i}
${eo}
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
`;class rw{constructor(t,e,n,s,r){w(this,"list",[]);w(this,"geometry",new He);w(this,"pos",new Float32Array(Er*3));w(this,"info",new Float32Array(Er*4));w(this,"light",new Float32Array(Er*2));w(this,"color",new Float32Array(Er*3));w(this,"points");w(this,"material");this.getState=s,this.getLight=r,this.geometry.setAttribute("position",new ye(this.pos,3).setUsage(qs)),this.geometry.setAttribute("aInfo",new ye(this.info,4).setUsage(qs)),this.geometry.setAttribute("aLight",new ye(this.light,2).setUsage(qs)),this.geometry.setAttribute("aColor",new ye(this.color,3).setUsage(qs)),this.geometry.setDrawRange(0,0),this.material=new zs({glslVersion:Bi,vertexShader:iw,fragmentShader:sw,uniforms:{...n,uAtlas:{value:e},uScale:{value:400}}}),this.points=new Zp(this.geometry,this.material),this.points.frustumCulled=!1,t.add(this.points)}setPixelScale(t){this.material.uniforms.uScale.value=t*.6}push(t){this.list.length>=Er&&this.list.shift(),this.list.push(t)}blockBreak(t,e,n,s,r=28,o=!1){for(let a=0;a<r;a++){const c=o?t+Math.random():t+.1+Math.random()*.8,l=o?e+Math.random():e+.1+Math.random()*.8,h=o?n+Math.random():n+.1+Math.random()*.8;this.push({x:c,y:l,z:h,vx:(c-t-.5)*3+(Math.random()-.5),vy:Math.random()*3+(o?.5:1.5),vz:(h-n-.5)*3+(Math.random()-.5),life:.6+Math.random()*.6,gravity:14,layer:s,u:Math.floor(Math.random()*12),v:Math.floor(Math.random()*12),size:.08+Math.random()*.06,r:1,g:1,b:1,emissive:!1})}}puff(t,e,n,s,r,o,a=2){for(let c=0;c<s;c++)this.push({x:t+(Math.random()-.5)*r,y:e+(Math.random()-.5)*r,z:n+(Math.random()-.5)*r,vx:(Math.random()-.5)*a,vy:Math.random()*a*.6,vz:(Math.random()-.5)*a,life:.5+Math.random()*1.2,gravity:-.6,layer:-1,u:0,v:0,size:.12+Math.random()*.25,r:o[0],g:o[1],b:o[2],emissive:!0})}splash(t,e,n,s,r){for(let o=0;o<s;o++)this.push({x:t+(Math.random()-.5)*.8,y:e,z:n+(Math.random()-.5)*.8,vx:(Math.random()-.5)*2,vy:2+Math.random()*2,vz:(Math.random()-.5)*2,life:.4+Math.random()*.3,gravity:12,layer:r,u:Math.floor(Math.random()*12),v:Math.floor(Math.random()*12),size:.05,r:.8,g:.9,b:1,emissive:!1})}update(t){let e=0;for(let n=this.list.length-1;n>=0;n--){const s=this.list[n];if(s.life-=t,s.life<=0){this.list.splice(n,1);continue}s.vy-=s.gravity*t;const r=s.x+s.vx*t,o=s.y+s.vy*t,a=s.z+s.vz*t;if(s.gravity>0&&un[this.getState(Math.floor(r),Math.floor(o),Math.floor(a))&Ge]?(s.vx*=.3,s.vz*=.3,s.vy=0):(s.x=r,s.y=o,s.z=a),e>=Er)continue;this.pos[e*3]=s.x,this.pos[e*3+1]=s.y,this.pos[e*3+2]=s.z,this.info[e*4]=s.layer,this.info[e*4+1]=s.u,this.info[e*4+2]=s.v,this.info[e*4+3]=s.size;const c=s.emissive?240:this.getLight(Math.floor(s.x),Math.floor(s.y),Math.floor(s.z));this.light[e*2]=(c>>4)/15,this.light[e*2+1]=(c&15)/15;const l=s.layer<0?Math.min(1,s.life*2):1;this.color[e*3]=s.r*l,this.color[e*3+1]=s.g*l,this.color[e*3+2]=s.b*l,e++}this.geometry.setDrawRange(0,e);for(const n of["position","aInfo","aLight","aColor"])this.geometry.getAttribute(n).needsUpdate=!0}}class ow{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const aw=new vc(-1,1,1,-1,0,1);class cw extends He{constructor(){super(),this.setAttribute("position",new Ye([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ye([0,2,0,0,2,0],2))}}const lw=new cw;class im{constructor(t){this._mesh=new fe(lw,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,aw)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}const Ol={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},hw={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new qt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class Gr extends ow{constructor(t,e=1,n,s){super(),this.strength=e,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new Ft(t.x,t.y):new Ft(256,256),this.clearColor=new qt(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new ni(r,o,{type:Vi}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new ni(r,o,{type:Vi});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new ni(r,o,{type:Vi});f.texture.name="UnrealBloomPass.v"+h,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=hw;this.highPassUniforms=Uh.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new en({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new Ft(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Uh.clone(Ol.uniforms),this.blendMaterial=new en({uniforms:this.copyUniforms,vertexShader:Ol.vertexShader,fragmentShader:Ol.fragmentShader,blending:Xl,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new qt,this._oldClearAlpha=1,this._basic=new Qr,this._fsQuad=new im(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,s),this.renderTargetsVertical[r].setSize(n,s),this.separableBlurMaterials[r].uniforms.invSize.value=new Ft(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,r){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=n.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=Gr.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=Gr.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),a=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(n),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new en({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Ft(.5,.5)},direction:{value:new Ft(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}}Gr.BlurDirectionX=new Ft(1,0);Gr.BlurDirectionY=new Ft(0,1);const Ua={low:{level:"low",shadowSize:0,shadowDistance:0,shadowTaps:4,bloom:!1,godRays:!1,msaa:0,fancyLeaves:!1,clouds:!0,waving:!0,maxPixelRatio:1},medium:{level:"medium",shadowSize:1024,shadowDistance:36,shadowTaps:4,bloom:!0,godRays:!1,msaa:0,fancyLeaves:!0,clouds:!0,waving:!0,maxPixelRatio:1},high:{level:"high",shadowSize:2048,shadowDistance:48,shadowTaps:8,bloom:!0,godRays:!0,msaa:2,fancyLeaves:!0,clouds:!0,waving:!0,maxPixelRatio:1.25},ultra:{level:"ultra",shadowSize:4096,shadowDistance:72,shadowTaps:12,bloom:!0,godRays:!0,msaa:4,fancyLeaves:!0,clouds:!0,waving:!0,maxPixelRatio:2}},Fl={low:"Низкая (телефоны)",medium:"Средняя",high:"Высокая (шейдеры)",ultra:"Ультра"};class uw{constructor(t,e,n,s,r){w(this,"renderer");w(this,"handScene",new Yp);w(this,"handCamera",new Wn(70,1,.01,10));w(this,"sceneRT");w(this,"shadowRT",null);w(this,"shadowCamera",new vc(-1,1,1,-1,1,400));w(this,"bloom",null);w(this,"finalQuad");w(this,"finalMaterial");w(this,"entityDepth",new Qp);w(this,"width",1);w(this,"height",1);w(this,"renderScale",1);w(this,"onPass",()=>{});w(this,"damageFlash",0);w(this,"exposure",1);this.scene=e,this.camera=n,this.uniforms=s,this.quality=r,this.renderer=new ly({antialias:!1,powerPreference:"high-performance",stencil:!1}),this.renderer.autoClear=!1,this.renderer.info.autoReset=!1,this.renderer.debug.checkShaderErrors=!1,t.prepend(this.renderer.domElement),this.camera.layers.enable(zh),this.camera.layers.enable(Hh),this.camera.layers.enable(Gh),this.finalMaterial=new en({vertexShader:_b,fragmentShader:vb,uniforms:{tColor:{value:null},tDepth:{value:null},uSunScreen:{value:new Ft},uSunVisible:{value:0},uRayColor:{value:new F},uExposure:{value:1},uSaturation:{value:1.08},uUnderwaterTint:{value:0},uTimeF:{value:0},uDamage:{value:0}},depthTest:!1,depthWrite:!1}),this.finalQuad=new im(this.finalMaterial),this.setQuality(r)}get hdrSupported(){return this.renderer.extensions.has("EXT_color_buffer_half_float")||this.renderer.extensions.has("EXT_color_buffer_float")}get scale(){return this.renderScale}setRenderScale(t){const e=Math.max(.5,Math.min(1,t));Math.abs(e-this.renderScale)<.01||(this.renderScale=e,this.applyPixelRatio(),this.resize(this.width,this.height,!0))}applyPixelRatio(){this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,this.quality.maxPixelRatio)*this.renderScale)}setQuality(t){var e;if(this.quality=t,this.applyPixelRatio(),this.finalMaterial.defines=t.godRays?{GOD_RAYS:1}:{},this.finalMaterial.needsUpdate=!0,(e=this.shadowRT)==null||e.dispose(),this.shadowRT=null,t.shadowSize>0){const n=new nc(t.shadowSize,t.shadowSize);n.compareFunction=pu,n.minFilter=n.magFilter=di,this.shadowRT=new ni(t.shadowSize,t.shadowSize,{depthTexture:n,depthBuffer:!0}),this.uniforms.uShadowMap.value=n,this.uniforms.uShadowTexel.value=1/t.shadowSize}else this.uniforms.uShadowMap.value=null;this.resize(this.width,this.height,!0)}resize(t,e,n=!1){var a,c;if(!n&&t===this.width&&e===this.height)return;this.width=t,this.height=e,this.renderer.setSize(t,e),this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.handCamera.aspect=t/e,this.handCamera.updateProjectionMatrix();const s=this.renderer.getPixelRatio(),r=Math.max(1,Math.floor(t*s)),o=Math.max(1,Math.floor(e*s));(a=this.sceneRT)==null||a.dispose(),this.sceneRT=new ni(r,o,{type:this.hdrSupported?Vi:_i,samples:this.quality.msaa,depthTexture:new nc(r,o),depthBuffer:!0}),(c=this.bloom)==null||c.dispose(),this.bloom=this.quality.bloom?new Gr(new Ft(r/2,o/2),.32,.55,1.05):null}precompile(t){const e=this.renderer,n=r=>{const o=e.getRenderTarget();e.setRenderTarget(this.sceneRT);try{return r()}finally{e.setRenderTarget(o)}},s=r=>{var a;const o=r.material;for(const c of Array.isArray(o)?o:o?[o]:[])(a=e.properties.get(c).currentProgram)==null||a.getUniforms()};return n(()=>e.compileAsync(t,this.camera,this.scene)).then(()=>{n(()=>{e.compile(this.scene,this.camera),e.compile(this.handScene,this.handCamera)}),this.scene.traverse(s),this.handScene.traverse(s)})}renderShadows(t,e){if(!this.shadowRT)return;const n=this.quality,s=this.shadowCamera,r=n.shadowDistance;s.left=-r,s.right=r,s.top=r,s.bottom=-r;const o=r+48;s.near=1,s.far=o*2;const a=this.uniforms.uLightDir.value;s.position.copy(e).addScaledVector(a,o),s.up.set(0,0,1),s.lookAt(e),s.updateMatrixWorld(),s.updateProjectionMatrix();const c=new de().multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse),l=new ke(0,0,0,1).applyMatrix4(c),h=n.shadowSize/2,u=(Math.round(l.x*h)-l.x*h)/h,f=(Math.round(l.y*h)-l.y*h)/h;s.projectionMatrix.elements[12]+=u,s.projectionMatrix.elements[13]+=f,this.uniforms.uShadowMatrix.value.multiplyMatrices(s.projectionMatrix,s.matrixWorldInverse);const d=this.renderer;this.onPass(s,!0),d.setRenderTarget(this.shadowRT),d.clear(!0,!0,!1),s.layers.set(zh),this.scene.overrideMaterial=t.shadowOpaque,d.render(this.scene,s),s.layers.set(Hh),this.scene.overrideMaterial=t.shadowCutout,d.render(this.scene,s),s.layers.set(Gh),this.scene.overrideMaterial=this.entityDepth,d.render(this.scene,s),this.scene.overrideMaterial=null}render(t,e,n,s,r){const o=this.renderer;o.info.reset(),this.shadowRT&&this.uniforms.uLightColor.value.lengthSq()>1e-4&&this.renderShadows(t,n),this.onPass(this.camera,!1),o.setRenderTarget(this.sceneRT),o.setClearColor(0,1),o.clear(!0,!0,!1),o.render(this.scene,this.camera),o.clearDepth(),o.render(this.handScene,this.handCamera),this.bloom&&this.bloom.render(o,null,this.sceneRT,0,!1);const a=this.finalMaterial.uniforms,l=this.camera.position.clone().addScaledVector(e.sunDir,400).project(this.camera),h=new F;this.camera.getWorldDirection(h);const u=h.dot(e.sunDir);a.uSunScreen.value.set(l.x*.5+.5,l.y*.5+.5),a.uSunVisible.value=u>0&&!r?e.sunVisibility*Math.min(1,u*2):0,a.uRayColor.value.copy(e.rayColor),a.tColor.value=this.sceneRT.texture,a.tDepth.value=this.sceneRT.depthTexture,a.uExposure.value=this.exposure,a.uUnderwaterTint.value=r?1:0,a.uTimeF.value=s,a.uDamage.value=this.damageFlash,o.setRenderTarget(null),o.clear(!0,!0,!1),this.finalQuad.render(o)}dispose(){var t,e;this.sceneRT.dispose(),(t=this.shadowRT)==null||t.dispose(),(e=this.bloom)==null||e.dispose(),this.finalQuad.dispose(),this.renderer.dispose()}}const sm="minecraft:settings:v3",fw="minecraft:settings:v2",dw=["name","color","sensitivity","fov","volume","music"];function pw(){var i;if(wu())return"low";try{const t=document.createElement("canvas").getContext("webgl2");if(!t)return"low";const e=t.getExtension("WEBGL_debug_renderer_info"),n=String(t.getParameter(e?e.UNMASKED_RENDERER_WEBGL:t.RENDERER)).toLowerCase();return(i=t.getExtension("WEBGL_lose_context"))==null||i.loseContext(),/swiftshader|llvmpipe|software|basic render/.test(n)?"low":/nvidia|geforce|quadro|\brtx\b|\bgtx\b|radeon (rx|pro|r9)|\brx ?\d{3,4}|\barc\b|apple m\d (pro|max|ultra)/.test(n)?"high":"medium"}catch{return"medium"}}const mw={low:4,medium:6,high:8,ultra:10};function gw(){const i=wu(),t=pw();return{name:"",color:Rp[7],renderDistance:mw[t],sensitivity:i?10:8,fov:75,quality:t,volume:80,music:40}}function ep(i){const t=localStorage.getItem(i);return t?JSON.parse(t):null}function _w(){const i=gw();try{let t=ep(sm);if(!t){const n=ep(fw)??{};t=Object.fromEntries(dw.filter(s=>n[s]!==void 0).map(s=>[s,n[s]]))}const e={...i,...t};return["low","medium","high","ultra"].includes(e.quality)||(e.quality=i.quality),e}catch{return i}}function qa(i){try{localStorage.setItem(sm,JSON.stringify(i))}catch{}}const Nu=[1,-1,0,0,0,0],Uu=[0,0,1,-1,0,0],ku=[0,0,0,0,1,-1],rm=3,Hr=(i,t,e)=>(t*Bt+e)*Bt+i,Yh=(i,t)=>su[i.blocks[t]&Ge],Vr=(i,t,e)=>e?i.light[t]>>4:i.light[t]&15,$s=(i,t,e,n)=>{i.light[t]=e?i.light[t]&15|n<<4:i.light[t]&240|n};class om{constructor(t,e){w(this,"lastCx",NaN);w(this,"lastCz",NaN);w(this,"last");w(this,"lastMarked");this.src=t,this.changed=e}chunk(t,e){const n=t>>4,s=e>>4;return(n!==this.lastCx||s!==this.lastCz)&&(this.lastCx=n,this.lastCz=s,this.last=this.src.getChunk(n,s)),this.last}mark(t,e,n){if(!this.changed)return;const s=e&15,r=n&15,o=s===0||s===15||r===0||r===15;if(t===this.lastMarked&&!o)return;this.lastMarked=t;const a=e>>4,c=n>>4;if(this.changed.add(tn(a,c)),!o)return;const l=s===0?-1:s===15?1:0,h=r===0?-1:r===15?1:0;l&&this.changed.add(tn(a+l,c)),h&&this.changed.add(tn(a,c+h)),l&&h&&this.changed.add(tn(a+l,c+h))}}function Kh(i,t,e){for(let n=0;n<t.length;n+=3){const s=t[n],r=t[n+1],o=t[n+2],a=i.chunk(s,o);if(!a)continue;const c=Vr(a,Hr(s&15,r,o&15),e);if(!(c<=1))for(let l=0;l<6;l++){const h=r+Uu[l];if(h<0||h>=Ae)continue;const u=s+Nu[l],f=o+ku[l],d=i.chunk(u,f);if(!d)continue;const m=Hr(u&15,h,f&15),_=Yh(d,m);if(_>=15)continue;const g=e&&l===rm&&c===15&&_===0?15:c-Math.max(1,_);g>Vr(d,m,e)&&($s(d,m,e,g),i.mark(d,u,f),t.push(u,h,f))}}}function vw(i,t,e,n,s,r){const o=[t,e,n,s],a=[];for(let c=0;c<o.length;c+=4){const l=o[c],h=o[c+1],u=o[c+2],f=o[c+3];for(let d=0;d<6;d++){const m=h+Uu[d];if(m<0||m>=Ae)continue;const _=l+Nu[d],g=u+ku[d],p=i.chunk(_,g);if(!p)continue;const M=Hr(_&15,m,g&15),b=Vr(p,M,r);if(b!==0)if(b<f||r&&d===rm&&f===15&&b===15){const v=r?0:ru[p.blocks[M]&Ge];$s(p,M,r,v),i.mark(p,_,g),o.push(_,m,g,b),v&&a.push(_,m,g)}else a.push(_,m,g)}}return a}function np(i,t,e,n,s){if(e<0||e>=Ae)return;const r=new om(i,s),o=r.chunk(t,n);if(!o)return;const a=Hr(t&15,e,n&15),c=ru[o.blocks[a]&Ge];r.mark(o,t,n);for(const l of[!0,!1]){const h=Vr(o,a,l);$s(o,a,l,0);const u=h>0?vw(r,t,e,n,h,l):[];!l&&c&&($s(o,a,!1,c),u.push(t,e,n));for(let d=0;d<6;d++){const m=e+Uu[d];m>=0&&m<Ae&&u.push(t+Nu[d],m,n+ku[d])}const f=su[o.blocks[a]&Ge];l&&e===Ae-1&&f<15&&($s(o,a,!0,Math.max(0,15-f)),u.push(t,e,n)),Kh(r,u,l)}}function xw(i,t,e,n){const s=i.getChunk(t,e);if(!s)return;const r=new om(i,n),o={sky:[],block:[]};for(let a=0;a<4;a++){const c=a===0?1:a===1?-1:0,l=a===2?1:a===3?-1:0,h=i.getChunk(t+c,e+l);if(h)for(let u=0;u<Ae;u++)for(let f=0;f<Bt;f++){const d=c===1?15:c===-1?0:f,m=l===1?15:l===-1?0:f,_=c===1?0:c===-1?15:f,g=l===1?0:l===-1?15:f,p=Hr(d,u,m),M=Hr(_,u,g),b=Yh(s,p),v=Yh(h,M),E=t*Bt+d,T=e*Bt+m,S=(t+c)*Bt+_,L=(e+l)*Bt+g;for(const x of[!0,!1]){const y=Vr(s,p,x),A=Vr(h,M,x),P=x?o.sky:o.block;v<15&&y-Math.max(1,v)>A?($s(h,M,x,y-Math.max(1,v)),r.mark(h,S,L),P.push(S,u,L)):b<15&&A-Math.max(1,b)>y&&($s(s,p,x,A-Math.max(1,b)),r.mark(s,E,T),P.push(E,u,T))}}}Kh(r,o.sky,!0),Kh(r,o.block,!1)}const ka=3;class Mw{constructor(){w(this,"chunks",new Map);w(this,"edits",new Map);w(this,"onEdit",()=>{})}getChunk(t,e){return this.chunks.get(tn(t,e))}getState(t,e,n){if(e<0)return C.BEDROCK;if(e>=Ae)return C.AIR;const s=this.chunks.get(tn(t>>4,n>>4));return s?s.blocks[Hn(t&15,e,n&15)]:C.AIR}getLight(t,e,n){if(e>=Ae)return 240;if(e<0)return 0;const s=this.chunks.get(tn(t>>4,n>>4));return s?s.light[Hn(t&15,e,n&15)]:240}isLoaded(t,e){return this.chunks.has(tn(Math.floor(t)>>4,Math.floor(e)>>4))}isReady(t,e){var n;return!!((n=this.chunks.get(tn(Math.floor(t)>>4,Math.floor(e)>>4)))!=null&&n.meshed)}editsFor(t,e){const n=this.edits.get(tn(t,e));return n?[...n]:[]}setState(t,e,n,s){if(e<0||e>=Ae)return!1;const r=t>>4,o=n>>4,a=tn(r,o),c=Hn(t&15,e,n&15);let l=this.edits.get(a);l||this.edits.set(a,l=new Map),l.set(c,s);const h=this.chunks.get(a);if(!h||h.blocks[c]===s)return!1;h.blocks[c]=s;const u=new Set([a]);np(this,t,e,n,u);const f=t&15,d=n&15;for(let m=d===0?-1:0;m<=(d===15?1:0);m++)for(let _=f===0?-1:0;_<=(f===15?1:0);_++)u.add(tn(r+_,o+m));for(const m of u){const _=this.chunks.get(m);_&&(_.needsMesh=_.urgent=!0)}return this.onEdit(),!0}applyEdits(t){for(let e=0;e+3<t.length;e+=4)this.setState(t[e],t[e+1],t[e+2],t[e+3])}addChunk(t,e,n,s){const r={cx:t,cz:e,blocks:n,light:s,meshes:[null,null,null],sections:[null,null,null],conn:null,needsMesh:!0,urgent:!1,meshed:!1,meshing:!1,viewLo:0,viewHi:Zn-1,minY:0,maxY:Ae,litLo:0,litHi:Zn-1},o=tn(t,e);this.chunks.set(o,r);const a=[],c=this.edits.get(o);if(c)for(const[h,u]of c)n[h]!==u&&a.push(h,u);const l=new Set;xw(this,t,e,l);for(let h=0;h<a.length;h+=2){const u=a[h];n[u]=a[h+1],np(this,t*Bt+(u&15),u>>8,e*Bt+(u>>4&15),l)}for(const h of l){const u=this.chunks.get(h);u&&u!==r&&u.meshed&&(u.needsMesh=!0)}return r}isOpaque(t,e,n){return un[this.getState(t,e,n)&Ge]===1}}const yw=2,bw=[1,-1,0,0,0,0],Sw=[0,0,1,-1,0,0],Ew=[0,0,0,0,1,-1],ip=[1,0,3,2,5,4];class ww{constructor(t,e,n,s,r){w(this,"renderDistance");w(this,"meshOptions",{fancyLeaves:!0});w(this,"culling",!0);w(this,"workers",[]);w(this,"workerLoad",[]);w(this,"jobs",new Map);w(this,"nextJob",1);w(this,"inflightGen",new Set);w(this,"genQueue",[]);w(this,"center",null);w(this,"padPool",[]);w(this,"ready",[]);w(this,"urgentReady",[]);w(this,"batches",new Map);w(this,"nextBatch",1);w(this,"editQueued",!1);w(this,"meshing",0);w(this,"visDirty",!0);w(this,"viewMatrix",new de);w(this,"lastView",new de);w(this,"frustum",new Co);w(this,"passMatrix",new de);w(this,"passFrustum",new Co);w(this,"box",new Yi);w(this,"visCap",0);w(this,"visSeen",new Uint8Array(0));w(this,"visQueue",new Int32Array(0));w(this,"visFrom",new Uint8Array(0));w(this,"visDirs",new Uint8Array(0));w(this,"visLo",new Int8Array(0));w(this,"visHi",new Int8Array(0));w(this,"visGrid",[]);this.world=t,this.scene=e,this.materials=n,this.seed=s,this.renderDistance=r,t.onEdit=()=>{this.editQueued||(this.editQueued=!0,queueMicrotask(()=>{this.editQueued=!1,this.center&&this.dispatch(this.center[0],this.center[1],performance.now(),1)}))};const o=Math.max(1,Math.min(4,(navigator.hardwareConcurrency||4)-1));for(let a=0;a<o;a++){const c=new Worker(new URL(""+new URL("chunk.worker-D1VeblQN.js",import.meta.url).href,import.meta.url),{type:"module"});c.onmessage=l=>this.onResult(a,l.data),this.workers.push(c),this.workerLoad.push(0)}}setRenderDistance(t){this.renderDistance=t,this.center=null}setMaterials(t,e){const n=e.fancyLeaves!==this.meshOptions.fancyLeaves;this.materials=t,this.meshOptions=e;for(const s of this.world.chunks.values()){for(let r=0;r<ka;r++){const o=s.meshes[r];o&&(o.material=this.layerMaterial(r))}n&&s.meshed&&(s.needsMesh=!0)}}get loadedCount(){return this.world.chunks.size}get pendingCount(){return this.genQueue.length+this.inflightGen.size+this.meshing+this.ready.length}update(t,e){const{x:n,z:s}=t.position,r=Math.floor(n)>>4,o=Math.floor(s)>>4;(!this.center||this.center[0]!==r||this.center[1]!==o)&&(this.center=[r,o],this.refresh(r,o));const a=performance.now();for(const c of this.urgentReady.splice(0))this.applyMesh(c);for(;this.ready.length&&performance.now()-a<e;)this.applyMesh(this.ready.shift());this.dispatch(r,o,a,e),this.updateVisibility(t)}refresh(t,e){const n=this.renderDistance;for(const[r,o]of this.world.chunks)Math.max(Math.abs(o.cx-t),Math.abs(o.cz-e))>n+2&&(this.disposeMeshes(o),this.world.chunks.delete(r));const s=[];for(let r=-n-1;r<=n+1;r++)for(let o=-n-1;o<=n+1;o++){if(o*o+r*r>(n+1.5)*(n+1.5))continue;const a=t+o,c=e+r,l=tn(a,c);this.world.chunks.has(l)||this.inflightGen.has(l)||s.push([a,c,o*o+r*r])}s.sort((r,o)=>o[2]-r[2]),this.genQueue=s.map(([r,o])=>[r,o]),this.visDirty=!0}pickWorker(t){let e=0;for(let n=1;n<this.workers.length;n++)this.workerLoad[n]<this.workerLoad[e]&&(e=n);return t||this.workerLoad[e]<yw?e:-1}dispatch(t,e,n,s){const r=this.renderDistance,o=[];for(const l of this.world.chunks.values()){if(!l.needsMesh||l.meshing)continue;const h=l.cx-t,u=l.cz-e,f=h*h+u*u;f>(r+.5)*(r+.5)&&!l.meshed||this.hasNeighbors(l)&&o.push({chunk:l,score:l.urgent?-1:f})}o.sort((l,h)=>l.score-h.score);let a=0,c=0;for(;c<o.length&&o[c].chunk.urgent;c++)a||(a=this.nextBatch++,this.batches.set(a,{left:0,results:[]})),this.batches.get(a).left++,this.sendMesh(o[c].chunk,this.pickWorker(!0),a);for(;;){const l=this.pickWorker(!1);if(l<0)return;const h=o[c],u=this.genQueue[this.genQueue.length-1],f=u?(u[0]-t)**2+(u[1]-e)**2:1/0;if(h&&h.score<=f){if(performance.now()-n>s)return;c++,this.sendMesh(h.chunk,l,0)}else if(u)this.genQueue.pop(),this.sendGen(u[0],u[1],l);else return}}sendGen(t,e,n){const s=tn(t,e),r=this.nextJob++;this.inflightGen.add(s),this.jobs.set(r,{kind:"gen",key:s,worker:n}),this.workerLoad[n]++,this.post(n,{t:"gen",id:r,seed:this.seed,cx:t,cz:e,edits:this.world.editsFor(t,e)},[])}sendMesh(t,e,n){const s=[];for(let c=-1;c<=1;c++)for(let l=-1;l<=1;l++)s.push(this.world.getChunk(t.cx+l,t.cz+c));const r=this.padPool.pop()??{blocks:new Uint16Array(hc),light:new Uint8Array(hc)};UE(s,r.blocks,r.light),t.needsMesh=t.urgent=!1,t.meshing=!0,this.meshing++;const o=this.nextJob++;this.jobs.set(o,{kind:"mesh",chunk:t,worker:e,batch:n}),this.workerLoad[e]++;const a={t:"mesh",id:o,blocks:r.blocks,light:r.light,fancyLeaves:this.meshOptions.fancyLeaves};this.post(e,a,[r.blocks.buffer,r.light.buffer])}post(t,e,n){this.workers[t].postMessage(e,n)}onResult(t,e){this.handleResult(t,e),this.center&&this.dispatch(this.center[0],this.center[1],performance.now(),1)}handleResult(t,e){const n=this.jobs.get(e.id);if(!n)return;if(this.jobs.delete(e.id),this.workerLoad[t]--,e.t==="gen"){this.inflightGen.delete(tn(e.cx,e.cz));const o=this.center;if(!o||Math.max(Math.abs(e.cx-o[0]),Math.abs(e.cz-o[1]))>this.renderDistance+2||this.world.chunks.has(tn(e.cx,e.cz)))return;this.world.addChunk(e.cx,e.cz,e.blocks,e.light);return}if(this.padPool.push({blocks:e.blocks,light:e.light}),n.kind!=="mesh")return;n.chunk.meshing=!1,this.meshing--;const s={chunk:n.chunk,meshes:e.meshes,lit:e.lit,conn:e.conn};if(!n.batch){this.ready.push(s);return}const r=this.batches.get(n.batch);r.results.push(s),!(--r.left>0)&&(this.batches.delete(n.batch),this.urgentReady.push(...r.results))}hasNeighbors(t){for(let e=-1;e<=1;e++)for(let n=-1;n<=1;n++)if(!this.world.chunks.has(tn(t.cx+n,t.cz+e)))return!1;return!0}applyMesh(t){const e=t.chunk;if(this.world.getChunk(e.cx,e.cz)===e){this.disposeMeshes(e),e.minY=Ae,e.maxY=0;for(let n=0;n<ka;n++){const s=t.meshes[n];e.sections[n]=s?s.sections:null,e.meshes[n]=s?this.createMesh(s,n,e):null,s&&(e.minY=Math.min(e.minY,s.minY-.5),e.maxY=Math.max(e.maxY,s.maxY+.5))}e.conn=t.conn,e.litLo=t.lit?31-Math.clz32(t.lit&-t.lit):Zn,e.litHi=t.lit?31-Math.clz32(t.lit):-1,e.meshed=!0,this.visDirty=!0}}layerMaterial(t){return t===0?this.materials.opaque:t===1?this.materials.cutout:this.materials.translucent}createMesh(t,e,n){const s=new He;s.setAttribute("aPos",new ye(t.pos,4)),s.setAttribute("aData",new ye(t.data,4)),s.setIndex(new ye(t.index,1)),s.boundingBox=new Yi(new F(0,t.minY-.5,0),new F(Bt,t.maxY+.5,Bt)),s.boundingSphere=s.boundingBox.getBoundingSphere(new qi);const r=new fe(s,this.layerMaterial(e));return r.frustumCulled=!1,r.visible=!1,r.position.set(n.cx*Bt,0,n.cz*Bt),r.matrixAutoUpdate=!1,r.updateMatrix(),e===0?r.layers.set(zh):e===1&&r.layers.set(Hh),this.scene.add(r),r}disposeMeshes(t){for(let e=0;e<ka;e++){const n=t.meshes[e];n&&(this.scene.remove(n),n.geometry.dispose(),t.meshes[e]=null,t.sections[e]=null)}}preparePass(t,e){t.updateMatrixWorld(),this.passMatrix.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this.passFrustum.setFromProjectionMatrix(this.passMatrix);const n=this.box,s=e&&!this.culling;for(const r of this.world.chunks.values()){const o=s?0:e?r.litLo:r.viewLo,a=s?Zn-1:e?r.litHi:r.viewHi;let c=o<=a;c&&(n.min.set(r.cx*Bt,Math.max(o*16,r.minY),r.cz*Bt),n.max.set(r.cx*Bt+Bt,Math.min(a*16+16,r.maxY),r.cz*Bt+Bt),c=n.min.y<n.max.y&&this.passFrustum.intersectsBox(n));for(let l=0;l<ka;l++){const h=r.meshes[l],u=r.sections[l];if(!h||!u)continue;const f=c?u[o]:0,d=c?u[a+1]-f:0;h.visible=d>0,d>0&&h.geometry.setDrawRange(f,d)}}}updateVisibility(t){const{x:e,y:n,z:s}=t.position,r=Math.floor(e)>>4,o=Math.floor(s)>>4,a=Math.min(Zn-1,Math.max(0,Math.floor(n)>>4));if(t.updateMatrixWorld(),this.viewMatrix.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),!this.visDirty&&this.viewMatrix.equals(this.lastView))return;if(this.lastView.copy(this.viewMatrix),this.visDirty=!1,!this.culling){for(const f of this.world.chunks.values())f.viewLo=0,f.viewHi=Zn-1;this.visDirty=!0;return}const l=this.renderDistance+1,h=2*l+1,u=this.visGrid;u.length=h*h;for(let f=0;f<h;f++)for(let d=0;d<h;d++)u[f*h+d]=this.world.getChunk(r+d-l,o+f-l);this.frustum.setFromProjectionMatrix(this.viewMatrix),this.traverse(r,a,o,this.frustum);for(const f of this.world.chunks.values()){const d=f.cx-r+l,m=f.cz-o+l,_=d>=0&&d<h&&m>=0&&m<h?m*h+d:-1;f.viewLo=_<0?Zn:this.visLo[_],f.viewHi=_<0?-1:this.visHi[_]}}traverse(t,e,n,s){var T;const r=this.renderDistance,o=r+1,a=2*o+1,c=a*a,l=c*Zn;this.visCap<l&&(this.visCap=l,this.visSeen=new Uint8Array(l),this.visQueue=new Int32Array(l),this.visFrom=new Uint8Array(l),this.visDirs=new Uint8Array(l),this.visLo=new Int8Array(c),this.visHi=new Int8Array(c));const{visSeen:h,visQueue:u,visFrom:f,visDirs:d,visLo:m,visHi:_,visGrid:g,box:p}=this;h.fill(0,0,l),m.fill(Zn,0,c),_.fill(-1,0,c);const M=(e*a+o)*a+o;h[M]=1,u[0]=M,f[0]=6,d[0]=0;let b=0,v=1;const E=(r+1)*(r+1);for(;b<v;){const S=u[b],L=f[b],x=d[b];b++;const y=S%a,A=(S/a|0)%a,P=S/c|0,N=A*a+y;P<m[N]&&(m[N]=P),P>_[N]&&(_[N]=P);const z=(T=g[N])==null?void 0:T.conn,X=L===6||!z?63:z[P*6+L];for(let W=0;W<6;W++){if(!(X&1<<W)||x&1<<ip[W])continue;const K=P+Sw[W];if(K<0||K>=Zn)continue;const G=y+bw[W],Z=A+Ew[W],rt=G-o,Mt=Z-o;if(rt*rt+Mt*Mt>E)continue;const Ut=(K*a+Z)*a+G;if(!h[Ut]){if(Math.abs(rt)>1||Math.abs(Mt)>1||Math.abs(K-e)>1){const zt=(t+rt)*Bt,te=(n+Mt)*Bt;if(p.min.set(zt,K*16,te),p.max.set(zt+Bt,K*16+16,te+Bt),!s.intersectsBox(p))continue}h[Ut]=1,u[v]=Ut,f[v]=ip[W],d[v]=x|1<<W,v++}}}}dispose(){for(const t of this.workers)t.terminate();for(const t of this.world.chunks.values())this.disposeMeshes(t)}}const qh="minecraft:autojoin",Ui=.25,sp=i=>i/(3-2*i),Tw=(i,t,e)=>{const n=Math.min(1,Math.max(0,(e-i)/(t-i)));return n*n*(3-2*n)};function Aw(i,t,e,n,s){const r=Kt(n),o=n>>>10;if(r===C.OAK_DOOR){const a=o&8?t-1:t+1;return Kt(s(i,a,e))===C.OAK_DOOR?[[i,a,e]]:[]}if(r===C.BED){const a=o&4?(o&3)+2&3:o&3,[c,l]=[[0,-1],[1,0],[0,1],[-1,0]][a];return Kt(s(i+c,t,e+l))===C.BED?[[i+c,t,e+l]]:[]}return[]}class Rw{constructor(t,e,n,s,r){w(this,"scene",new Yp);w(this,"camera",new Wn(75,1,.05,1200));w(this,"uniforms",xb());w(this,"pipeline");w(this,"env");w(this,"atlasTex");w(this,"materials");w(this,"quality");w(this,"world",new Mw);w(this,"chunks");w(this,"player");w(this,"inv",new qb);w(this,"invUI");w(this,"itemMeshes");w(this,"entities");w(this,"particles");w(this,"overlays");w(this,"rainFx");w(this,"hand");w(this,"sound",new hb(()=>new Worker(new URL(""+new URL("synth.worker-B3ptNxFe.js",import.meta.url).href,import.meta.url),{type:"module"})));w(this,"input");w(this,"avatars",new Map);w(this,"colors",new Map);w(this,"selfAvatar");w(this,"touch",wu());w(this,"myId");w(this,"mode","loading");w(this,"autoReconnect",!1);w(this,"tipsPending",!1);w(this,"gameMode");w(this,"time");w(this,"rain");w(this,"rainLevel");w(this,"spawn");w(this,"openContainerId",null);w(this,"target",null);w(this,"targetEntity",null);w(this,"attackHeld",!1);w(this,"useHeld",!1);w(this,"breakProgress",0);w(this,"breakKey","");w(this,"breakTick",0);w(this,"actionCooldown",0);w(this,"attackCooldown",0);w(this,"eating",0);w(this,"bowDraw",0);w(this,"view",0);w(this,"debug",!1);w(this,"fps",0);w(this,"fpsFrames",0);w(this,"fpsTime",0);w(this,"lastFrame",performance.now());w(this,"lastSent",0);w(this,"lastSentPos",new F(1/0,0,0));w(this,"lastSentRot",[0,0]);w(this,"invTimer",0);w(this,"statsTimer",0);w(this,"damageFlash",0);w(this,"shake",0);w(this,"hurtTilt",0);w(this,"lastHp",20);w(this,"elapsed",0);w(this,"entityLight",new F);w(this,"autoQuality",!0);w(this,"perfFrames",[]);w(this,"perfSlow",0);w(this,"playTime",0);w(this,"lastDownscale",-1/0);w(this,"onResize",()=>{this.pipeline.resize(window.innerWidth,window.innerHeight);const t=window.innerHeight*this.pipeline.renderer.getPixelRatio();this.particles.setPixelScale(t),this.rainFx.setPixelScale(t)});w(this,"onMessage",t=>{var e;switch(t.t){case"join":this.addAvatar(t.player);break;case"leave":{const n=this.avatars.get(t.id);if(!n)break;this.scene.remove(n.group),n.dispose(),this.avatars.delete(t.id),this.colors.delete(t.id);break}case"moves":for(let n=0;n+6<t.d.length;n+=7){if(t.d[n]===this.myId)continue;const s=this.avatars.get(t.d[n]);s&&(s.setTarget(t.d[n+1],t.d[n+2],t.d[n+3],t.d[n+4],t.d[n+5]),s.sneaking=(t.d[n+6]&1)!==0,s.sleeping=(t.d[n+6]&2)!==0)}break;case"playerInfo":{const n=this.avatars.get(t.id);n==null||n.setHeld(t.held),n==null||n.setArmor(t.armor);break}case"swing":(e=this.avatars.get(t.id))==null||e.swing();break;case"blocks":for(let n=0;n+3<t.d.length;n+=4)this.applyRemoteBlock(t.d[n],t.d[n+1],t.d[n+2],t.d[n+3]);break;case"spawn":for(const n of t.e)this.entities.spawn(n);break;case"entities":this.entities.move(t.d);break;case"despawn":{const n=t.by,s=n===this.myId?()=>new F(this.player.x,this.player.y+.8,this.player.z):n!==void 0&&this.avatars.has(n)?()=>this.avatars.get(n).group.position.clone().add(new F(0,.8,0)):void 0;this.entities.remove(t.ids,s);break}case"entityEvent":this.entities.event(t.id,t.ev,t.v);break;case"hurt":this.player.damage(t.amount,t.cause,t.kx,t.kz);break;case"give":{const n=this.inv.add({...t.item});this.sound.play("pop",{pitch:1+Math.random()*.4}),n>0&&this.dropItem({...t.item,count:n},!0);break}case"container":this.openContainerId=t.c.cid,(this.mode==="play"||this.mode==="inventory")&&(this.setMode("inventory"),this.invUI.open(t.c.kind,t.c));break;case"containerSlot":this.invUI.setContainerSlot(t.cid,t.slot,t.item);break;case"containerProgress":this.invUI.setProgress(t.cid,t.burn,t.burnMax,t.cook);break;case"containerClosed":this.invUI.containerClosed(t.cid);break;case"sound":this.sound.play(t.name,{x:t.p[0],y:t.p[1],z:t.p[2],volume:t.volume,pitch:t.pitch});break;case"explosion":{const[n,s,r]=t.p;this.sound.play("explode",{x:n,y:s,z:r}),this.particles.puff(n,s,r,60,t.power*1.2,[1.4,1.3,1.2],5),this.particles.puff(n,s,r,20,t.power*.6,[3,2,.8],3);const o=Math.hypot(this.player.x-n,this.player.y-s,this.player.z-r);this.shake=Math.max(this.shake,Math.max(0,1-o/24));break}case"chat":this.ui.addChat(t.from,t.color,t.text);break;case"time":this.time=t.time;break;case"weather":this.rain=t.rain;break;case"tp":this.player.setPosition(...t.p);break;case"mode":this.gameMode=t.mode,this.applyGameMode();break;case"spawnPoint":this.spawn=t.p,this.ui.addChat(null,void 0,"Точка возрождения установлена");break;case"sleep":this.player.sleeping=t.sleeping,this.ui.setSleeping(t.sleeping);break}});w(this,"frame",t=>{requestAnimationFrame(this.frame);const e=t-this.lastFrame,n=Math.min(.1,Math.max(0,e/1e3));this.lastFrame=t,this.elapsed+=n;const s=this.player,r=this.camera,[o,a]=this.input.consumeLook();if(s.sleeping||(s.yaw-=o,s.pitch=Math.max(-Math.PI/2+.01,Math.min(Math.PI/2-.01,s.pitch-a))),this.actionCooldown=Math.max(0,this.actionCooldown-n),this.attackCooldown=Math.max(0,this.attackCooldown-n),this.mode==="loading")this.trySpawn()&&(this.tipsPending=!0,this.setMode(this.touch?"play":"pause"));else if(this.world.isLoaded(s.x,s.z)){const m=this.input.moveInput();s.sleeping&&((m.forward||m.strafe||m.jump||m.sneak)&&this.wake(),m.forward=m.strafe=0,m.jump=m.sneak=m.sprint=!1),(this.eating>0||this.bowDraw>0)&&(m.forward*=.3,m.strafe*=.3,m.sprint=!1);const _=Math.ceil(n/.05);for(let g=0;g<_;g++)s.update(n/_,m)}const c=this.eye,l=this.shake*.3;if(this.shake=Math.max(0,this.shake-n*1.5),this.hurtTilt=Math.max(0,this.hurtTilt-n*3),r.rotation.set(s.pitch+(Math.random()-.5)*l*.1,s.yaw+(Math.random()-.5)*l*.1,Math.sin(this.hurtTilt*8)*this.hurtTilt*.12),s.sleeping?r.position.set(s.x,s.y+.4,s.z):r.position.copy(c),this.view>0){const m=this.lookDir().multiplyScalar(this.view===1?-1:1),_=jd((p,M,b)=>this.world.getState(p,M,b),c.x,c.y,c.z,m.x,m.y,m.z,4),g=_?Math.max(.3,_.dist-.25):4;r.position.addScaledVector(m,g),this.view===2&&r.rotation.set(-s.pitch,s.yaw+Math.PI,0)}const h=this.settings.fov*(s.sprinting?1.12:1)*(this.bowDraw>0?1-Math.min(1,this.bowDraw)*.15:1);Math.abs(r.fov-h)>.01&&(r.fov+=(h-r.fov)*Math.min(1,n*10),r.updateProjectionMatrix()),this.chunks.update(r,this.mode==="loading"?8:3),this.time=(this.time+n*20)%up,this.rainLevel+=(this.rain-this.rainLevel)*Math.min(1,n*.4);const u=s.eyeInWater&&this.view===0;this.uniforms.uTime.value=this.elapsed,this.uniforms.uCameraPos.value.copy(r.position),this.env.update(this.time,this.rainLevel,r,n,this.chunks.renderDistance,u),this.ui.setUnderwater(u),this.updateTarget(),this.mode==="play"&&(this.updateBreaking(n),this.updateUsing(n));const f=this.world.getLight(Math.floor(s.x),Math.floor(s.y+1),Math.floor(s.z));this.lightColor(f,this.entityLight),this.hand.update(n,{speed:s.onGround?s.speed:0,sky:(f>>4)/15,block:(f&15)/15,lightColor:this.entityLight,eating:this.eating>0?Math.min(1,this.eating):0,bowDraw:this.bowDraw>0?Math.min(1,this.bowDraw):0,mining:this.attackHeld&&this.breakProgress>0}),this.pipeline.handScene.visible=this.view===0&&!s.sleeping,this.selfAvatar.group.visible=this.view>0,this.view>0&&(this.selfAvatar.setTarget(s.x,s.y,s.z,s.yaw,s.pitch),this.selfAvatar.sneaking=s.sneaking,this.selfAvatar.light.value.copy(this.entityLight),this.selfAvatar.update(n));for(const m of this.avatars.values()){const _=m.group.position;this.lightColor(this.world.getLight(Math.floor(_.x),Math.floor(_.y+1),Math.floor(_.z)),m.light.value),m.update(n)}this.entities.update(n),this.particles.update(n),this.rainFx.intensity=this.rainLevel,this.rainFx.update(n,r.position);const d=f>>4>=14;this.sound.setListener(r.position.x,r.position.y,r.position.z,s.yaw,s.pitch),this.sound.setUnderwater(u),this.sound.setRain(this.rainLevel*(d?1:.3)),this.mode!=="loading"&&this.sendMove(t),this.invTimer>0&&(this.invTimer-=n,this.invTimer<=0&&this.sendInventory()),this.statsTimer+=n,this.statsTimer>3&&(this.statsTimer=0,this.conn.send({t:"stats",hp:s.hp,food:s.food,saturation:s.saturation})),s.hp<this.lastHp&&(this.damageFlash=1,this.hurtTilt=1),this.lastHp=s.hp,this.damageFlash=Math.max(0,this.damageFlash-n*2.5),this.pipeline.damageFlash=this.damageFlash*.5,this.ui.setStatus(s.hp,s.food,this.inv.armorPoints(),s.air,this.gameMode,s.hp<=4&&Math.floor(this.elapsed*6)%2===0),this.updateDebug(n),this.trackPerformance(e,n),this.pipeline.render(this.materials,this.env,new F(s.x,s.y,s.z),this.elapsed,u)});this.conn=t,this.settings=n,this.ui=s,this.myId=e.id,this.time=e.time,this.rain=e.rain,this.rainLevel=e.rain,this.gameMode=e.self.mode,this.spawn=e.self.spawn,this.quality=Ua[n.quality],this.atlasTex=Mb(r.data,r.count),this.materials=this.makeMaterials(),this.pipeline=new uw(yt("app"),this.scene,this.camera,this.uniforms,this.quality),this.camera.rotation.order="YXZ",this.camera.fov=n.fov,this.env=new DE(this.scene,this.uniforms),this.env.setClouds(this.quality.clouds),this.scene.add(new n0("#ffffff",Math.PI*.62));const o=new e0("#ffffff",Math.PI*.5);o.position.set(.4,1,.6),this.scene.add(o),this.chunks=new ww(this.world,this.scene,this.materials,e.seed,n.renderDistance),this.chunks.meshOptions={fancyLeaves:this.quality.fancyLeaves},this.pipeline.onPass=(c,l)=>this.chunks.preparePass(c,l),this.world.applyEdits(e.edits),this.player=new SE(this.world),this.player.setPosition(...e.self.p),this.player.yaw=e.self.r[0],this.player.pitch=e.self.r[1],this.player.hp=e.self.hp,this.player.food=e.self.food,this.player.saturation=e.self.saturation,this.player.mode=this.gameMode,this.player.armorPoints=()=>this.inv.armorPoints(),this.lastHp=this.player.hp,this.itemMeshes=new qE(r,this.materials),this.particles=new rw(this.scene,this.atlasTex,this.uniforms,(c,l,h)=>this.world.getState(c,l,h),(c,l,h)=>this.world.getLight(c,l,h)),this.overlays=new ZE(this.scene,this.atlasTex);const a=new Ly(e.seed);this.rainFx=new nw(this.scene,this.uniforms,(c,l)=>this.surfaceY(c,l),(c,l,h)=>this.particles.splash(c,l,h,2,Rn[C.WATER*384]),(c,l,h)=>{const{biome:u}=a.column(c,h);return u===ve.DESERT?0:u===ve.SNOWY||u===ve.MOUNTAINS&&l>Wa-8?2:1}),this.hand=new NE(this.pipeline.handScene,this.itemMeshes,n.color),this.entities=new Xb(this.scene,this.itemMeshes,this.world,this.particles,(c,l)=>this.lightColor(c,l));for(const c of e.entities)this.entities.spawn(c);for(const c of e.players)this.addAvatar(c);this.selfAvatar=new yl(n.name,n.color,e.self.p,this.itemMeshes),this.selfAvatar.group.visible=!1,this.scene.add(this.selfAvatar.group),this.sound.setVolume(n.volume/100),this.sound.setMusicVolume(n.music/100),this.input=new Kb(this.pipeline.renderer.domElement,{attackStart:()=>this.onAttackStart(),attackEnd:()=>this.onAttackEnd(),useStart:()=>this.onUseStart(),useEnd:()=>this.onUseEnd(),pick:()=>this.pickBlock(),hotbar:c=>this.selectSlot(c),scroll:c=>this.selectSlot(this.inv.selected+c),toggleFly:()=>{this.gameMode==="creative"&&(this.player.flying=!this.player.flying,this.player.vy=0)},drop:c=>this.dropHeld(c),chat:c=>this.openChat(c),inventory:()=>this.openInventory(),playerList:c=>this.ui.setPlayerList(c?this.playerList():null),debug:()=>this.debug=!this.debug,pause:()=>this.setMode("pause"),toggleView:()=>this.view=(this.view+1)%3}),this.input.sensitivity=n.sensitivity,this.touch&&this.input.setupTouch(yt("touch")),this.invUI=new fE(r,this.inv,{close:()=>{this.openContainerId&&this.conn.send({t:"containerClose"}),this.openContainerId=null,this.mode==="inventory"&&this.resume()},drop:c=>this.dropItem(c,!1),containerSlot:(c,l,h)=>this.conn.send({t:"containerSlot",cid:c,slot:l,item:h}),sound:c=>this.sound.play(c)},()=>this.gameMode),this.inv.onOverflow=c=>this.dropItem(c,!1),this.inv.onChange=()=>this.onInventoryChange(),this.inv.load(e.self.inventory,e.self.armor,e.self.selected),this.bindPlayer(),this.setupUI(),this.setupPointerLock(),window.addEventListener("resize",this.onResize),this.onResize(),t.onClose=(c,l)=>this.disconnect(c,!l),t.setHandler(this.onMessage),t.isOpen||this.disconnect("Соединение с сервером потеряно"),this.applyGameMode(),this.ui.setHud(!0),this.setMode("loading"),this.warmUpShaders(),requestAnimationFrame(this.frame)}warmUpShaders(){const t=new fn;t.visible=!1;const e={value:new F(1,1,1)};for(const r of Object.keys(qm)){const o=S0(r);Ss(o.group,e),t.add(o.group)}t.add(new yl("",this.settings.color,[0,0,0],this.itemMeshes).group);for(const r of[C.STONE,j.STICK])t.add(this.itemMeshes.create(r).object);const n=new Xe(.1,.1,.1),s=new fe(n,new gi({color:"#8b6a3e"}));Ss(s,e),t.add(s,new fe(n,new Qr({transparent:!0})),new fe(n,this.pipeline.entityDepth)),this.scene.add(t),this.pipeline.precompile(t).catch(()=>{})}makeMaterials(){return yb(this.atlasTex,this.uniforms,{shadows:this.quality.shadowSize>0,shadowTaps:this.quality.shadowTaps,waving:this.quality.waving})}lightColor(t,e){const n=sp((t>>4)/15),s=sp((t&15)/15),r=this.uniforms;return e.copy(r.uAmbient.value).multiplyScalar(n*1.2),e.addScaledVector(r.uLightColor.value,.5*Tw(.6,.95,(t>>4)/15)),e.addScaledVector(r.uBlockLight.value,s*s*1.35),e.addScalar(.02),e}surfaceY(t,e){for(let n=Ae-1;n>0;n--){const s=this.world.getState(t,n,e)&Ge;if(s!==C.AIR&&(Vl[s]||Lc(s)||Ze[s].opacity>0))return n}return 0}setMode(t){this.mode!=="disconnected"&&(this.mode=t,this.input.active=t==="play",t!=="play"&&(this.input.release(),this.attackHeld=this.useHeld=!1,this.stopUsing(),this.overlays.setCrack(null,-1)),t==="play"&&(yt("resume").textContent="Вернуться к игре",this.tipsPending&&(this.tipsPending=!1,this.showTips())),this.ui.show(t==="pause"?"pause":t==="loading"?"loading":t==="dead"?"death":t==="disconnected"?"disconnected":t==="inventory"?"inventory":null),yt("touch").hidden=!this.touch||t!=="play",t!=="play"&&t!=="loading"&&!this.touch&&document.pointerLockElement&&document.exitPointerLock())}resume(){var e;if(this.sound.unlock(),this.touch)return this.setMode("play");this.ui.show(null);const t=()=>{this.mode!=="dead"&&this.mode!=="disconnected"&&this.setMode("pause")};try{const n=this.pipeline.renderer.domElement.requestPointerLock();(e=n==null?void 0:n.catch)==null||e.call(n,t)}catch{t()}}setupPointerLock(){document.addEventListener("pointerlockchange",()=>{this.input.pointerLocked?(this.mode==="pause"||this.mode==="chat"||this.mode==="inventory"||this.mode==="dead"&&this.player.alive)&&this.setMode("play"):this.mode==="play"&&this.setMode("pause")}),document.addEventListener("pointerlockerror",()=>{this.mode!=="disconnected"&&this.mode!=="dead"&&this.mode!=="inventory"&&this.setMode("pause")}),this.pipeline.renderer.domElement.addEventListener("click",()=>{this.sound.unlock(),!this.touch&&this.mode==="pause"&&this.resume()});const e=()=>this.sound.unlock();for(const n of["pointerdown","keydown","touchend"])window.addEventListener(n,e,{capture:!0,passive:!0})}setupUI(){const t=this.settings;yt("resume").onclick=()=>this.resume(),yt("reconnect").onclick=()=>this.reconnect(),yt("disconnect-menu").onclick=()=>location.reload(),document.addEventListener("visibilitychange",()=>{!document.hidden&&this.mode==="disconnected"&&this.autoReconnect&&this.reconnect()}),yt("to-menu").onclick=()=>location.reload(),yt("respawn").onclick=()=>this.respawn(),yt("wake").onclick=()=>this.wake(),yt("fullscreen").onclick=()=>{var o,a;if(document.fullscreenElement){document.exitFullscreen().catch(()=>{});return}const r=()=>{var c,l;return(l=(c=screen.orientation).lock)==null?void 0:l.call(c,"landscape").catch(()=>{})};(a=(o=document.documentElement).requestFullscreen)==null||a.call(o).then(r).catch(()=>{})};const e=yt("quality");e.replaceChildren(...Object.keys(Ua).map(r=>{const o=document.createElement("option");return o.value=r,o.textContent=Fl[r],o})),e.value=t.quality,e.onchange=()=>{t.quality=e.value,qa(t),this.autoQuality=!1,this.setQuality(Ua[t.quality])};const n=(r,o,a,c)=>{const l=yt(r),h=yt(`${r}-value`),u=f=>h.textContent=c?c(f):String(f);l.value=String(o),u(o),l.oninput=()=>{const f=Number(l.value);u(f),a(f),qa(t)}};n("rd",t.renderDistance,r=>{t.renderDistance=r,this.chunks.setRenderDistance(r)}),n("sens",t.sensitivity,r=>{t.sensitivity=r,this.input.sensitivity=r}),n("fov",t.fov,r=>t.fov=r),n("vol",t.volume,r=>{t.volume=r,this.sound.setVolume(r/100)},r=>`${r}%`),n("music",t.music,r=>{t.music=r,this.sound.setMusicVolume(r/100)},r=>r?`${r}%`:"выкл");const s=yt("chat-input");yt("chat-form").onsubmit=r=>{r.preventDefault();const o=s.value.trim();o&&this.conn.send({t:"chat",text:o}),this.closeChat()},s.onkeydown=r=>{r.key==="Escape"&&(r.preventDefault(),this.closeChat())},window.addEventListener("keydown",r=>{this.mode==="inventory"&&!r.repeat&&(r.code==="KeyE"||r.code==="Escape")&&(r.preventDefault(),this.invUI.close())}),yt("inv-close").onclick=()=>this.invUI.close(),this.renderHotbar()}setQuality(t){this.quality=t;const e=this.materials;this.materials=this.makeMaterials(),this.pipeline.setQuality(t),this.chunks.setMaterials(this.materials,{fancyLeaves:t.fancyLeaves}),this.itemMeshes.setMaterials(this.materials),this.env.setClouds(t.clouds),this.onResize();for(const n of[e.opaque,e.cutout,e.translucent,e.shadowOpaque,e.shadowCutout])n.dispose()}trackPerformance(t,e){if(this.mode!=="play"||document.hidden||this.chunks.pendingCount>16){this.perfFrames.length=0;return}if(this.playTime+=e,this.playTime<3||(this.perfFrames.push(t),this.perfFrames.length<60))return;const n=this.perfFrames.sort((o,a)=>o-a),s=n[n.length>>1];this.perfFrames.length=0;const r=this.pipeline.scale;if(s>22){if(this.lastDownscale=this.elapsed,r>.55){this.pipeline.setRenderScale(r-(s>40?.2:.1));return}const o=["low","medium","high","ultra"],a=o.indexOf(this.quality.level);if(!this.autoQuality||a<=0||++this.perfSlow<2)return;this.perfSlow=0;const c=o[a-1];this.settings.quality=c,qa(this.settings),this.setQuality(Ua[c]),this.pipeline.setRenderScale(.8),yt("quality").value=c,this.ui.addChat(null,void 0,`Графика: «${Fl[c]}» — так игра пойдёт плавнее. Изменить можно в меню паузы.`)}else this.perfSlow=0,s<17.5&&r<1&&this.elapsed-this.lastDownscale>20&&this.pipeline.setRenderScale(r+.05)}applyGameMode(){this.player.mode=this.gameMode,this.gameMode!=="creative"&&(this.player.flying=!1),yt("touch").classList.toggle("creative",this.gameMode==="creative")}renderHotbar(){this.ui.renderHotbar(this.inv,t=>this.selectSlot(t))}selectSlot(t){var e;this.inv.select(t),this.stopUsing(),this.ui.flashItemName(((e=this.inv.held)==null?void 0:e.id)??null)}onInventoryChange(){var t,e;this.renderHotbar(),this.hand.setItem(((t=this.inv.held)==null?void 0:t.id)??null),this.selfAvatar.setHeld(((e=this.inv.held)==null?void 0:e.id)??0),this.selfAvatar.setArmor(this.inv.armor.map(n=>(n==null?void 0:n.id)??0)),this.invUI.refresh(),this.invTimer=.4}sendInventory(){var t;this.conn.send({t:"inventory",slots:this.inv.slots,armor:this.inv.armor,selected:this.inv.selected,held:((t=this.inv.held)==null?void 0:t.id)??0})}openChat(t){this.mode==="play"&&(this.setMode("chat"),this.ui.openChat(t))}closeChat(){this.ui.closeChat(),this.mode==="chat"&&this.resume()}openInventory(){this.mode==="play"&&(this.setMode("inventory"),this.invUI.open(this.gameMode==="creative"?"creative":"inventory"))}disconnect(t,e=!0){this.mode!=="disconnected"&&(yt("disconnect-reason").textContent=t,this.setMode("disconnected"),this.ui.setHud(!1),this.autoReconnect=e,e&&!document.hidden&&setTimeout(()=>this.autoReconnect&&!document.hidden&&this.reconnect(),3e3))}reconnect(){this.autoReconnect=!1;try{sessionStorage.setItem(qh,"1")}catch{}location.reload()}playerList(){return[{name:`${this.settings.name} (вы)`,color:this.settings.color},...[...this.avatars].map(([t,e])=>({name:e.name,color:this.colors.get(t)??"#fff"}))]}applyRemoteBlock(t,e,n,s){const r=this.world.getState(t,e,n);if(!this.world.setState(t,e,n,s))return;const o=Kt(r),a=Kt(s);o!==a&&(a===C.AIR&&o!==C.AIR&&!Lc(r)?(this.particles.blockBreak(t,e,n,Rn[o*384]),this.sound.play(`break_${Ze[o].sound}`,{x:t+.5,y:e+.5,z:n+.5})):o===C.AIR&&a!==C.AIR&&!Lc(s)&&this.sound.play(`place_${Ze[a].sound}`,{x:t+.5,y:e+.5,z:n+.5}))}addAvatar(t){if(t.id===this.myId||this.avatars.has(t.id))return;const e=new yl(t.name,t.color,t.p,this.itemMeshes);e.setTarget(...t.p,t.r[0],t.r[1]),e.setHeld(t.held),e.setArmor(t.armor),this.avatars.set(t.id,e),this.colors.set(t.id,t.color),this.scene.add(e.group)}sendMove(t,e=!1){if(!e&&t-this.lastSent<50)return;const n=this.player,s=new F(n.x,n.y,n.z);!(s.distanceToSquared(this.lastSentPos)>1e-4||Math.abs(n.yaw-this.lastSentRot[0])>.001||Math.abs(n.pitch-this.lastSentRot[1])>.001)&&t-this.lastSent<2e3||(this.conn.send({t:"move",p:[n.x,n.y,n.z],r:[n.yaw,n.pitch],sneak:n.sneaking,fly:n.flying}),this.lastSent=t,this.lastSentPos.copy(s),this.lastSentRot=[n.yaw,n.pitch])}get eye(){return new F(this.player.x,this.player.y+this.player.eyeHeight,this.player.z)}lookDir(){const t=this.player;return new F(-Math.sin(t.yaw)*Math.cos(t.pitch),Math.sin(t.pitch),-Math.cos(t.yaw)*Math.cos(t.pitch))}swing(){this.hand.swing(),this.selfAvatar.swing(),this.conn.send({t:"swing"})}onAttackStart(){if(!(this.mode!=="play"||!this.player.alive)){if(this.attackHeld=!0,this.breakProgress=0,this.breakKey="",this.targetEntity&&(!this.target||this.targetEntity.dist<this.target.dist)){this.attackEntity(this.targetEntity.id);return}this.swing(),this.gameMode==="creative"&&this.creativeBreak()}}onAttackEnd(){this.attackHeld=!1,this.breakProgress=0,this.overlays.setCrack(null,-1)}attackEntity(t){var s;if(this.attackCooldown>0)return;this.attackCooldown=.25,this.swing();const e=this.inv.held,n=this.player.vy<-.5&&!this.player.onGround;if(this.conn.send({t:"attack",id:t,item:(e==null?void 0:e.id)??null,crit:n}),this.sound.play(n?"strong_hit":"attack"),this.player.addExhaustion(.1),e&&((s=ge(e.id))!=null&&s.tool)&&this.gameMode==="survival"){const r=ge(e.id).tool.type;this.inv.damageHeld(r==="sword"?1:2)&&this.sound.play("tool_break")}}creativeBreak(){var e,n,s;const t=this.target;!t||this.actionCooldown>0||((s=(n=ge(((e=this.inv.held)==null?void 0:e.id)??0))==null?void 0:n.tool)==null?void 0:s.type)!=="sword"&&(this.actionCooldown=.2,this.breakBlock(t))}breakBlock(t){var s,r;const e=t.state,n=Kt(e);this.world.setState(t.x,t.y,t.z,C.AIR);for(const[o,a,c]of Aw(t.x,t.y,t.z,e,(l,h,u)=>this.world.getState(l,h,u)))this.world.setState(o,a,c,C.AIR);if(this.conn.send({t:"break",x:t.x,y:t.y,z:t.z,tool:((s=this.inv.held)==null?void 0:s.id)??null}),this.particles.blockBreak(t.x,t.y,t.z,Rn[n*384+(e>>>10)*6]),this.sound.play(`break_${Ze[n].sound}`,{x:t.x+.5,y:t.y+.5,z:t.z+.5}),this.gameMode==="survival"){this.player.addExhaustion(.005);const o=this.inv.held;if(o&&((r=ge(o.id))!=null&&r.tool)&&Ze[n].hardness>0){const a=ge(o.id).tool.type;this.inv.damageHeld(a==="sword"?2:1)&&this.sound.play("tool_break")}}}updateBreaking(t){var a;if(!this.attackHeld){this.overlays.setCrack(null,-1);return}if(this.gameMode==="creative"){this.actionCooldown<=0&&this.creativeBreak();return}if(this.targetEntity&&(!this.target||this.targetEntity.dist<this.target.dist)){this.attackCooldown<=0&&this.attackEntity(this.targetEntity.id),this.overlays.setCrack(null,-1);return}const e=this.target;if(!e){this.breakProgress=0,this.overlays.setCrack(null,-1);return}const n=`${e.x},${e.y},${e.z},${e.state}`;if(n!==this.breakKey&&(this.breakKey=n,this.breakProgress=0,this.breakTick=0),this.actionCooldown>0)return;const s=this.player,r=dy(e.state,((a=this.inv.held)==null?void 0:a.id)??null,s.eyeInWater,s.onGround||s.onLadder||s.flying);if(!Number.isFinite(r))return;if(this.breakProgress+=r<=0?1:t/r,this.breakTick-=t,this.breakTick<=0){this.breakTick=.25,this.swing();const c=Kt(e.state);this.sound.play(`hit_${Ze[c].sound}`,{x:e.x+.5,y:e.y+.5,z:e.z+.5}),this.particles.blockBreak(e.x,e.y,e.z,Rn[c*384+(e.state>>>10)*6],3,!0)}const o=Fh(e.state,(c,l,h)=>this.world.getState(e.x+c,e.y+l,e.z+h));this.overlays.setCrack({x:e.x,y:e.y,z:e.z,boxes:o},Math.floor(this.breakProgress*10)),this.breakProgress>=1&&(this.breakBlock(e),this.breakProgress=0,this.breakKey="",this.actionCooldown=Ui,this.overlays.setCrack(null,-1))}onUseStart(){this.mode!=="play"||!this.player.alive||(this.useHeld=!0,this.useItem(!0))}onUseEnd(){this.useHeld=!1,this.bowDraw>0&&this.releaseBow(),this.eating=0}stopUsing(){this.eating=0,this.bowDraw=0}useItem(t){var h;if(this.actionCooldown>0&&!t)return;const e=this.player,n=this.inv.held,s=n?ge(n.id):void 0,r=this.target;if(this.targetEntity&&(!r||this.targetEntity.dist<r.dist)&&(n==null?void 0:n.id)===j.SHEARS&&this.entities.isMob(this.targetEntity.id)==="sheep"){this.conn.send({t:"interactEntity",id:this.targetEntity.id,item:n.id}),this.swing(),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break"),this.actionCooldown=Ui;return}if(r&&mE(r.state)&&!e.sneaking){if(!t)return;this.swing(),Kt(r.state)===C.CRAFTING_TABLE?(this.setMode("inventory"),this.invUI.open("crafting")):this.conn.send({t:"interact",x:r.x,y:r.y,z:r.z}),this.actionCooldown=Ui;return}if(s!=null&&s.food){(e.food<20||this.gameMode==="creative")&&(this.eating=Math.max(this.eating,1e-4));return}if((n==null?void 0:n.id)===j.BOW){(this.gameMode==="creative"||this.inv.count(j.ARROW)>0)&&(this.bowDraw=Math.max(this.bowDraw,1e-4));return}if((n==null?void 0:n.id)===j.BUCKET){const u=this.eye,f=this.lookDir(),d=wE((m,_,g)=>this.world.getState(m,_,g),u.x,u.y,u.z,f.x,f.y,f.z,Cc);if(d&&!(d.state>>>10)){const m=Kt(d.state)===C.LAVA;this.conn.send({t:"use",x:d.x,y:d.y,z:d.z,action:"fill"}),this.world.setState(d.x,d.y,d.z,C.AIR),this.sound.play("bucket_fill"),this.gameMode==="survival"&&this.inv.replaceHeld(Fe(m?j.LAVA_BUCKET:j.WATER_BUCKET)),this.actionCooldown=Ui}return}if(!r)return;const o={x:r.x+r.nx,y:r.y+r.ny,z:r.z+r.nz};if((n==null?void 0:n.id)===j.WATER_BUCKET||(n==null?void 0:n.id)===j.LAVA_BUCKET){const u=n.id===j.LAVA_BUCKET,f=Ze[Kt(r.state)].replaceable?r:o;this.conn.send({t:"use",x:f.x,y:f.y,z:f.z,action:"empty",fluid:u?"lava":"water"}),this.world.setState(f.x,f.y,f.z,ei(u?C.LAVA:C.WATER)),this.sound.play("bucket_empty"),this.swing(),this.gameMode==="survival"&&this.inv.replaceHeld(Fe(j.BUCKET)),this.actionCooldown=Ui;return}if(((h=s==null?void 0:s.tool)==null?void 0:h.type)==="hoe"){const u=Kt(r.state);(u===C.GRASS||u===C.DIRT)&&r.ny===1&&this.world.getState(r.x,r.y+1,r.z)===C.AIR&&(this.conn.send({t:"use",x:r.x,y:r.y,z:r.z,action:"till"}),this.world.setState(r.x,r.y,r.z,C.FARMLAND),this.sound.play("step_gravel",{x:r.x+.5,y:r.y+1,z:r.z+.5}),this.swing(),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break"),this.actionCooldown=Ui);return}if((n==null?void 0:n.id)===j.BONE_MEAL){const u=Kt(r.state);(u===C.WHEAT||u===C.GRASS||u===C.OAK_SAPLING||u===C.BIRCH_SAPLING||u===C.SPRUCE_SAPLING)&&(this.conn.send({t:"use",x:r.x,y:r.y,z:r.z,action:"bonemeal"}),this.particles.puff(r.x+.5,r.y+1,r.z+.5,8,.8,[.4,1.4,.4],.5),this.swing(),this.gameMode==="survival"&&this.inv.consumeHeld(),this.actionCooldown=Ui);return}if((n==null?void 0:n.id)===j.FLINT_AND_STEEL){Kt(r.state)===C.TNT&&(this.conn.send({t:"use",x:r.x,y:r.y,z:r.z,action:"ignite"}),this.sound.play("flint_and_steel"),this.swing(),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break")),this.actionCooldown=Ui;return}if(!n||!(s!=null&&s.places))return;const a=pE(n.id,r,e.yaw,(u,f,d)=>this.world.getState(u,f,d));if(!a||a.y<1||a.y>=Ae)return;const c=Kt(a.state),l=gE(a);if(Vl[c])for(const u of[a,...l]){if(rd(e,u.x,u.y,u.z)||this.entities.blocksCell(u.x,u.y,u.z))return;for(const f of this.avatars.values())if(rd({x:f.target.x,y:f.target.y,z:f.target.z,width:.6,height:1.8},u.x,u.y,u.z))return}this.world.setState(a.x,a.y,a.z,a.state);for(const u of l)this.world.setState(u.x,u.y,u.z,u.state);this.sendMove(performance.now(),!0),this.conn.send({t:"place",x:a.x,y:a.y,z:a.z,state:a.state,item:n.id}),this.sound.play(`place_${Ze[c].sound}`,{x:a.x+.5,y:a.y+.5,z:a.z+.5}),this.swing(),this.gameMode==="survival"&&this.inv.consumeHeld(),this.actionCooldown=Ui}updateUsing(t){const e=this.inv.held,n=e?ge(e.id):void 0;if(this.eating>0)if(!this.useHeld||!(n!=null&&n.food))this.eating=0;else{const s=this.eating;this.eating+=t,Math.floor(s/.24)!==Math.floor(this.eating/.24)&&this.sound.play("eat",{pitch:.9+Math.random()*.3}),this.eating>=1.6&&(this.player.eat(n.food.hunger,n.food.saturation),this.gameMode==="survival"&&this.inv.consumeHeld(),this.sound.play("burp"),this.eating=0)}this.bowDraw>0&&((e==null?void 0:e.id)!==j.BOW?this.bowDraw=0:this.bowDraw+=t),this.useHeld&&this.eating===0&&this.bowDraw===0&&this.actionCooldown<=0&&this.useItem(!1)}releaseBow(){const t=Math.min(1,this.bowDraw);if(this.bowDraw=0,t<.15||this.gameMode==="survival"&&!this.inv.takeOne(j.ARROW))return;const e=this.eye,n=this.lookDir(),s=12+t*48;this.conn.send({t:"shoot",p:[e.x+n.x*.6,e.y+n.y*.6,e.z+n.z*.6],v:[n.x*s,n.y*s,n.z*s]}),this.sound.play("bow_shoot"),this.gameMode==="survival"&&this.inv.damageHeld()&&this.sound.play("tool_break")}pickBlock(){var s;const t=this.target;if(!t)return;const e=Ze[Kt(t.state)].item;if(e===null||!ge(e))return;for(let r=0;r<9;r++)if(((s=this.inv.slots[r])==null?void 0:s.id)===e)return this.selectSlot(r);if(this.gameMode==="creative"){this.inv.slots[this.inv.selected]=Fe(e,ge(e).maxStack),this.inv.changed();return}const n=this.inv.slots.findIndex((r,o)=>o>=9&&(r==null?void 0:r.id)===e);if(n>=0){const r=this.inv.slots[this.inv.selected];this.inv.slots[this.inv.selected]=this.inv.slots[n],this.inv.slots[n]=r,this.inv.changed()}}dropHeld(t){const e=this.inv.held;if(!e)return;const n=t?e.count:1;this.dropItem({...e,count:n},!1),this.inv.consumeHeld(n),this.swing()}dropItem(t,e){const n=this.eye,s=this.lookDir();this.conn.send({t:"drop",item:t,p:[n.x+s.x*.3,n.y-.3,n.z+s.z*.3],v:[s.x*5,s.y*5+2,s.z*5],returned:e})}showTips(){const t="minecraft:tips-shown";try{if(localStorage.getItem(t))return;localStorage.setItem(t,"1")}catch{return}(this.touch?["Добро пожаловать! Удерживайте палец на стволе дерева, чтобы добыть брёвна.","Кнопка «Инвентарь» — крафт. Слева книга рецептов: нажмите на рецепт, потом заберите результат.","Короткое касание — поставить блок. Сделайте верстак, а на нём — кирку и факелы.","Ночью выходят монстры — постройте укрытие. Друзья заходят по ссылке или QR-коду из главного меню."]:["Добро пожаловать! Зажмите ЛКМ на стволе дерева, чтобы добыть брёвна.","E — инвентарь и крафт. Слева книга рецептов: кликните рецепт, потом заберите результат.","ПКМ — поставить блок. Сделайте верстак, а на нём — кирку и факелы.","Ночью выходят монстры — постройте укрытие. Друзья заходят по ссылке или QR-коду из главного меню, /help — команды."]).forEach((n,s)=>setTimeout(()=>this.ui.addChat(null,void 0,n),1500+s*7e3))}bindPlayer(){const t=this.player;t.onHurt=(e,n)=>{this.sound.play("hurt"),this.ui.isSleeping&&(this.ui.setSleeping(!1),this.conn.send({t:"wake"})),n!=="fall"&&n!=="drown"&&n!=="starve"&&this.inv.damageArmor(e)},t.onDeath=e=>this.onDeath(e),t.onStep=()=>{const e=Kt(this.world.getState(Math.floor(t.x),Math.floor(t.y-.2),Math.floor(t.z)));e!==C.AIR&&this.sound.play(`step_${Ze[e].sound}`,{volume:.5})},t.onLand=e=>this.sound.play(e>5?"fall_big":"fall_small",{volume:Math.min(1,e/6)}),t.onSplash=()=>{this.sound.play("splash"),this.particles.splash(t.x,t.y+.5,t.z,16,Rn[C.WATER*384])}}onDeath(t){this.setMode("dead"),this.invUI.isOpen&&this.invUI.close(),this.openContainerId=null,this.ui.setSleeping(!1);const e=this.gameMode==="survival"?this.inv.takeAll():[],n=bE[t]??`погибает (${t})`;this.conn.send({t:"died",cause:n,items:e}),this.sound.play("death"),yt("death-cause").textContent=`${this.settings.name} ${n}`}respawn(){this.ui.setSleeping(!1),this.conn.send({t:"respawn"}),this.player.respawn(...this.spawn),this.lastHp=20,this.resume()}wake(){this.player.sleeping&&(this.player.sleeping=!1,this.ui.setSleeping(!1),this.conn.send({t:"wake"}))}trySpawn(){const t=this.player,e=this.chunks.renderDistance;if(this.ui.setLoading(Math.min(1,this.world.chunks.size/Math.max(1,Math.PI*(e+1)*(e+1)))),!this.world.isReady(t.x,t.z))return!1;const n=Math.floor(t.x),s=Math.floor(t.z);let r=Math.floor(t.y);const o=a=>un[Kt(this.world.getState(n,a,s))]||un[Kt(this.world.getState(n,a+1,s))];if(o(r)){for(;r<Ae&&o(r);)r++;t.setPosition(t.x,r,t.z)}return!0}updateTarget(){const t=this.eye,e=this.lookDir(),n=this.gameMode==="creative"?Cc+1.5:Cc,s=(c,l,h)=>this.world.getState(c,l,h),r=this.mode!=="loading"&&this.player.alive;this.target=r?jd(s,t.x,t.y,t.z,e.x,e.y,e.z,n):null,this.targetEntity=r?this.entities.raycast(t,e,Math.min(n,4.5)):null;const o=this.target,a=o&&!(this.targetEntity&&this.targetEntity.dist<o.dist);this.overlays.setTarget(a&&o?{x:o.x,y:o.y,z:o.z,boxes:Fh(o.state,(c,l,h)=>s(o.x+c,o.y+l,o.z+h))}:null)}updateDebug(t){if(this.fpsFrames++,this.fpsTime+=t,this.fpsTime>=.5&&(this.fps=Math.round(this.fpsFrames/this.fpsTime),this.fpsFrames=0,this.fpsTime=0),!this.debug)return this.ui.setDebug(null);const e=this.player,s=["север (-Z)","запад (-X)","юг (+Z)","восток (+X)"][(Math.round(e.yaw/(Math.PI/2))%4+4)%4],r=Math.floor((this.time/1e3+6)%24),o=Math.floor(this.time%1e3/1e3*60),a=this.world.getLight(Math.floor(e.x),Math.floor(e.y),Math.floor(e.z)),c=this.pipeline.renderer.info;this.ui.setDebug([`${hp} · ${this.fps} FPS · ${Fl[this.quality.level]} · разрешение ${Math.round(this.pipeline.scale*100)}%`,`XYZ: ${e.x.toFixed(2)} / ${e.y.toFixed(2)} / ${e.z.toFixed(2)}`,`Чанк: ${tn(Math.floor(e.x)>>4,Math.floor(e.z)>>4)} · загружено ${this.chunks.loadedCount}, в очереди ${this.chunks.pendingCount}`,`Смотрит на ${s}`,`Свет: небо ${a>>4}, блоки ${a&15}`,`Время: ${String(r).padStart(2,"0")}:${String(o).padStart(2,"0")}${this.rain?", дождь":""}`,`Режим: ${this.gameMode==="creative"?"творческий":"выживание"}${e.flying?", полёт":""}`,`Сущностей: ${this.entities.count} · игроков: ${this.avatars.size+1}`,`Отрисовка: ${c.render.calls} вызовов, ${Math.round(c.render.triangles/1e3)}k треугольников`,this.target?`Блок: ${Ze[Kt(this.target.state)].key} (${this.target.x} ${this.target.y} ${this.target.z})`:""].filter(Boolean).join(`
`))}}class Ou{constructor(t,e){w(this,"endpoints",new Map);w(this,"nextId",1);w(this,"saveWaiters",[]);w(this,"guests",0);w(this,"onGuestsChange",()=>{});this.worker=t,this.seed=e,t.onmessage=s=>{var o;const r=s.data;if(r.t==="msg")(o=this.endpoints.get(r.id))==null||o.deliver(r.data);else if(r.t==="close"){const a=this.endpoints.get(r.id);this.endpoints.delete(r.id),a==null||a.end()}else r.t==="saved"&&this.saveWaiters.splice(0).forEach(a=>a())};const n=()=>void this.save();window.addEventListener("pagehide",n),document.addEventListener("visibilitychange",()=>document.hidden&&n())}static start(t=!1){const e=new Worker(new URL(""+new URL("server.worker-Bt9Hci-1.js",import.meta.url).href,import.meta.url),{type:"module"});return new Promise((n,s)=>{const r=setTimeout(()=>s(new Error("Мир не запустился")),3e4);e.onmessage=o=>{o.data.t==="ready"?(clearTimeout(r),n(new Ou(e,o.data.seed))):o.data.t==="error"&&(clearTimeout(r),s(new Error(`Не удалось открыть мир: ${o.data.message}`)))},e.onerror=o=>{clearTimeout(r),s(new Error(`Не удалось запустить мир: ${o.message}`))},e.postMessage({t:"start",fresh:t})})}post(t){this.worker.postMessage(t)}connectLocal(){const t=this.nextId++;let e=!0;const n={get isOpen(){return e},send:s=>e&&this.post({t:"msg",id:t,data:s}),close:()=>{e&&(e=!1,this.endpoints.delete(t),this.post({t:"close",id:t}),n.onclose())},onopen:()=>{},onmessage:()=>{},onclose:()=>{}};return this.endpoints.set(t,{deliver:s=>n.onmessage(s),end:()=>{e&&(e=!1,n.onclose())}}),this.post({t:"open",id:t}),n}attach(t){const e=this.nextId++;let n=!0;this.guests++,this.onGuestsChange(this.guests);const s=()=>{n&&(n=!1,this.guests--,this.onGuestsChange(this.guests))};this.endpoints.set(e,{deliver:r=>t.send(r),end:()=>{s(),setTimeout(()=>t.close(),200)}}),t.onmessage=r=>n&&this.post({t:"msg",id:e,data:r}),t.onclose=()=>{n&&(s(),this.endpoints.delete(e),this.post({t:"close",id:e}))},this.post({t:"open",id:e})}save(){return new Promise(t=>{this.saveWaiters.push(t),this.post({t:"save"})})}}const Cw="modulepreload",Lw=function(i,t){return new URL(i,t).href},rp={},Dw=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){let o=function(h){return Promise.all(h.map(u=>Promise.resolve(u).then(f=>({status:"fulfilled",value:f}),f=>({status:"rejected",reason:f}))))};const a=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),l=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));s=o(e.map(h=>{if(h=Lw(h,n),h in rp)return;rp[h]=!0;const u=h.endsWith(".css"),f=u?'[rel="stylesheet"]':"";if(!!n)for(let _=a.length-1;_>=0;_--){const g=a[_];if(g.href===h&&(!u||g.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${f}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":Cw,u||(m.as="script"),m.crossOrigin="",m.href=h,l&&m.setAttribute("nonce",l),document.head.appendChild(m),u)return new Promise((_,g)=>{m.addEventListener("load",_),m.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${h}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return t().catch(r)})},op="mincraft:host-id",Oa=16e3;function am(){const i=new URLSearchParams(location.search).get("peer");if(i){const[t,e]=i.split(":");return{host:t,port:Number(e)||9e3,path:"/",secure:!1,debug:0}}return{debug:0}}function Pw(){const i=new URLSearchParams(location.search).get("peer");return i?`&peer=${encodeURIComponent(i)}`:""}async function cm(){return(await Dw(()=>import("./bundler-asumSYiq.js"),[],import.meta.url)).Peer}function Iw(){let i=1;return(t,e)=>{if(t.length<=Oa)return e(`=${t}`);const n=i++,s=Math.ceil(t.length/Oa);for(let r=0;r<s;r++)e(`+${n},${r},${s},${t.slice(r*Oa,(r+1)*Oa)}`)}}function Nw(){const i=new Map;return t=>{if(t[0]==="=")return t.slice(1);if(t[0]!=="+")return null;let e=1;const n=()=>{const c=t.indexOf(",",e),l=Number(t.slice(e,c));return e=c+1,l},s=n(),r=n(),o=n();if(!Number.isInteger(s)||!Number.isInteger(o)||o>1e4||r>=o)return null;let a=i.get(s);return a||i.set(s,a=[]),a[r]=t.slice(e),a.filter(c=>c!==void 0).length<o?null:(i.delete(s),a.join(""))}}const ap=3e3,Uw=3e4;function lm(i){const t=Iw(),e=Nw();let n=!1,s=Date.now(),r=0;const o={get isOpen(){return i.open&&!n},send:l=>{!i.open||n||t(l,h=>void i.send(h))},close:()=>{n||(c(),i.close())},onopen:()=>{},onmessage:()=>{},onclose:()=>{}},a=()=>{s=Date.now();let l=Date.now();r=window.setInterval(()=>{if(n)return;const h=Date.now();if(h-l>ap*3&&(s=h),l=h,h-s>Uw)return o.close();i.open&&i.send("~")},ap)};i.open&&a(),i.on("open",()=>{r||a(),o.onopen()}),i.on("data",l=>{if(s=Date.now(),typeof l!="string"||l==="~")return;const h=e(l);h!==null&&o.onmessage(h)});function c(){n||(n=!0,clearInterval(r),o.onclose())}return i.on("close",c),i.on("error",c),o}async function kw(i,t){const e=await cm();let n="";try{n=localStorage.getItem(op)??""}catch{}const s=()=>`mincraft-${Math.random().toString(36).slice(2,8)}${Math.random().toString(36).slice(2,8)}`;/^mincraft-[a-z0-9]{6,}$/.test(n)||(n=s());const r=(o,a)=>{t({state:"connecting"});const c=new e(o,am());c.on("open",l=>{try{localStorage.setItem(op,l)}catch{}t({state:"ready",id:l})}),c.on("connection",l=>{const h=lm(l);l.open?i.attach(h):h.onopen=()=>i.attach(h)}),c.on("disconnected",()=>{c.destroyed||setTimeout(()=>!c.destroyed&&c.reconnect(),3e3)}),c.on("error",l=>{const h=l.type;if(h==="unavailable-id"&&a<3){c.destroy(),setTimeout(()=>r(a<2?o:s(),a+1),4e3);return}if(h==="network"||h==="server-error"||h==="socket-error"||h==="socket-closed"){t({state:"error",message:"Сервер приглашений недоступен — играть можно, но друзья пока не смогут зайти"});return}h!=="peer-unavailable"&&t({state:"error",message:`Ошибка соединения: ${h??String(l)}`})}),window.addEventListener("pagehide",()=>c.destroy(),{once:!0})};r(n,0)}async function Ow(i){const t=await cm();return new Promise((e,n)=>{const s=new t(am());let r=!1;const o=c=>{r||(r=!0,s.destroy(),n(new Error(c)))},a=setTimeout(()=>o("Не удалось связаться с другом: проверьте, что у него открыта игра. Если вы в разных сетях, попробуйте одну Wi-Fi"),25e3);s.on("open",()=>{const c=s.connect(i,{reliable:!0,serialization:"raw"}),l=lm(c),h=l.onopen;l.onopen=()=>{r||(r=!0,clearTimeout(a),e(l),h())},window.addEventListener("pagehide",()=>s.destroy(),{once:!0})}),s.on("error",c=>{const l=c.type;clearTimeout(a),o(l==="peer-unavailable"?"Мир друга не найден — возможно, он закрыл игру. Попросите прислать ссылку заново":l==="network"||l==="server-error"||l==="socket-error"?"Сервер приглашений недоступен. Проверьте интернет":`Не удалось подключиться: ${l??String(c)}`)})})}function Fw(i=`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws`){const t=new WebSocket(i),e={get isOpen(){return t.readyState===WebSocket.OPEN},send:n=>t.readyState===WebSocket.OPEN&&t.send(n),close:()=>t.close(),onopen:()=>{},onmessage:()=>{},onclose:()=>{}};return t.addEventListener("open",()=>e.onopen()),t.addEventListener("message",n=>e.onmessage(String(n.data))),t.addEventListener("close",()=>e.onclose()),e}class Fu{constructor(t){w(this,"onClose",()=>{});w(this,"handler",null);w(this,"pending",[]);w(this,"kickReason",null);w(this,"closed",!1);this.link=t,t.onmessage=e=>{let n;try{n=JSON.parse(e)}catch{return}n.t==="kick"&&(this.kickReason=n.reason),this.handler?this.handler(n):this.pending.push(n)},t.onclose=()=>{this.closed||(this.closed=!0,this.onClose(this.kickReason??"Соединение с сервером потеряно",this.kickReason!==null))}}get isOpen(){return!this.closed&&this.link.isOpen}setHandler(t){this.handler=t;const e=this.pending;this.pending=[];for(const n of e)t(n)}static connect(t,e,n=Fw(),s=15e3){return new Promise((r,o)=>{const a=new Fu(n),c=setTimeout(()=>{n.close(),o(new Error("Сервер не отвечает"))},s);a.handler=h=>{h.t==="welcome"&&(clearTimeout(c),a.handler=null,a.onClose=()=>{},r({conn:a,welcome:h}))},a.onClose=h=>{clearTimeout(c),o(new Error(a.kickReason?h:"Не удалось подключиться к серверу"))};const l=()=>a.send({t:"hello",name:t,color:e});n.isOpen?l():n.onopen=l})}send(t){this.isOpen&&this.link.send(JSON.stringify(t))}}const wc=sE(),Es=_w(),Bw=new uE(wc);rE(wc,Ap);const zw=`url(${aE(wc,"dirt",.55)})`;document.querySelectorAll(".dirt").forEach(i=>i.style.backgroundImage=zw);document.title=hp;const Bu=yt("name-input"),Xs=yt("menu-status"),Gw=yt("join-form"),Hw=yt("play");Bu.value=Es.name;const uc=new URLSearchParams(location.search).get("join"),Vw=yt("color-picker"),hm=()=>Vw.replaceChildren(...Rp.map(i=>{const t=document.createElement("button");return t.type="button",t.className="swatch"+(i===Es.color?" selected":""),t.style.background=i,t.ariaLabel=i,t.onclick=()=>{Es.color=i,hm()},t}));hm();function Ww(){try{return!!document.createElement("canvas").getContext("webgl2")}catch{return!1}}function um(i){const t=Wr(0,"M");t.addData(i),t.make();const e=t.getModuleCount(),n=2,s=document.createElement("canvas");s.width=s.height=e+n*2;const r=s.getContext("2d");r.fillStyle="#fff",r.fillRect(0,0,s.width,s.height),r.fillStyle="#000";for(let o=0;o<e;o++)for(let a=0;a<e;a++)t.isDark(o,a)&&r.fillRect(a+n,o+n,1,1);return s}function fm(i,t=i.replace(/^https?:\/\//,"")){const e=document.createElement("a");return e.href=i,e.textContent=t,e.target="_blank",e.className="copy",e.onclick=n=>{navigator.clipboard&&(n.preventDefault(),navigator.clipboard.writeText(i).then(()=>{e.dataset.copied="1",setTimeout(()=>delete e.dataset.copied,1500)}))},e}async function Xw(){try{const i=await fetch("api/lan",{cache:"no-store"});return i.ok&&(i.headers.get("content-type")??"").includes("json")}catch{return!1}}async function Yw(){const i=location.hostname,t=i==="localhost"||i==="127.0.0.1"||i==="[::1]";let e=[];if(t)try{const s=await(await fetch("api/lan")).json(),r=location.port?`:${location.port}`:"";e=(s.addresses??[]).map(o=>`${location.protocol}//${o}${r}`)}catch{}else{e=[location.origin];const n=document.querySelector("#share p");n&&(n.textContent="Отправьте друзьям эту ссылку или покажите QR-код:")}e.length&&(yt("share-links").replaceChildren(...e.slice(0,3).map(n=>fm(n))),yt("share-qr").replaceChildren(um(e[0])),yt("share").hidden=!1)}function Kw(){const i=document.querySelector("#share p");i&&(i.textContent=uc?"Вы откроете мир друга. Чтобы играть в своём мире, нажмите «Играть в своём мире».":"Мир хранится в этом браузере. Чтобы позвать друзей, в игре откройте паузу → «Пригласить друзей» и отправьте ссылку или покажите QR-код."),yt("share").hidden=!1}function qw(i){const t=yt("invite-btn"),e=yt("invite"),n=yt("invite-status");t.hidden=!1,t.onclick=()=>e.hidden=!e.hidden;let s="";const r=()=>{s&&(n.textContent=i.guests?`Друзей в игре: ${i.guests}`:"Ждём друзей — отправьте им ссылку:")};i.onGuestsChange=r,kw(i,o=>{o.state==="connecting"?n.textContent="Подключаемся к серверу приглашений…":o.state==="error"?n.textContent=o.message:(s=`${location.origin}${location.pathname}?join=${encodeURIComponent(o.id)}${Pw()}`,yt("invite-link").replaceChildren(fm(s,"Ссылка-приглашение (нажмите, чтобы скопировать)")),yt("invite-qr").replaceChildren(um(s)),r())}).catch(o=>{console.error(o),n.textContent="Не удалось загрузить модуль приглашений"})}let $h=!1,Bl=!1;function $w(){const i=Bu.value.trim().replace(/\s+/g," ");return!i||i.length>Dm||!/^[\p{L}\p{N}_\- ]+$/u.test(i)?(Xs.textContent="Ник: буквы, цифры, пробел, _ или -",null):Ww()?(Es.name=i,qa(Es),i):(Xs.textContent="Браузер не поддерживает WebGL 2 — игра не запустится",null)}const cp=i=>document.querySelectorAll("#join-form button").forEach(t=>t.disabled=i);async function Tc(i){if(Bl)return;const t=$w();if(t){Bl=!0,cp(!0);try{let e,n=null;i.kind==="local"?(Xs.textContent=i.fresh?"Создаём новый мир…":"Открываем мир…",n=await Ou.start(i.fresh),e=n.connectLocal()):i.kind==="peer"?(Xs.textContent="Подключаемся к другу…",e=await Ow(i.id)):Xs.textContent="Подключение…";const{conn:s,welcome:r}=await Fu.connect(t,Es.color,e);Xs.textContent="";const o=new Rw(s,r,Es,Bw,wc);n&&qw(n),new URLSearchParams(location.search).has("debug")&&Object.assign(window,{game:o,host:n})}catch(e){console.error(e),Xs.textContent=e.message,Bl=!1,cp(!1)}}}const dm=()=>$h?{kind:"server"}:uc?{kind:"peer",id:uc}:{kind:"local",fresh:!1};Gw.onsubmit=i=>{i.preventDefault(),Tc(dm())};yt("own-world").onclick=()=>void Tc({kind:"local",fresh:!1});yt("new-world").onclick=()=>{confirm("Начать новый мир? Текущий мир в этом браузере будет удалён.")&&Tc({kind:"local",fresh:!0})};async function jw(){$h=await Xw(),$h?Yw():(yt("world-actions").hidden=!1,uc&&(yt("invite-banner").hidden=!1,Hw.textContent="Присоединиться к другу",yt("own-world").hidden=!1,yt("new-world").hidden=!0),Kw());let i=!1;try{i=sessionStorage.getItem(qh)==="1",sessionStorage.removeItem(qh)}catch{}i&&Es.name?Tc(dm()):matchMedia("(pointer: coarse)").matches||Bu.focus()}jw();
