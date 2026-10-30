(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var secs=$$('.sec'),navs=$$('.nav'),q=$('#q'),cur=0;
function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.h);toast.h=setTimeout(function(){t.classList.remove('on')},1400)}
function copyText(s,btn){
  function done(){if(btn){var o=btn.textContent;btn.textContent='Copied ✓';btn.classList.add('ok');setTimeout(function(){btn.textContent=o;btn.classList.remove('ok')},1400)}toast('Copied to clipboard')}
  if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(s).then(done,fb)}else fb();
  function fb(){var a=document.createElement('textarea');a.value=s;a.style.position='fixed';a.style.opacity='0';document.body.appendChild(a);a.select();try{document.execCommand('copy');done()}catch(e){toast('Copy failed')}document.body.removeChild(a)}
}
function pt(p){var c=p.cloneNode(true);$$('br',c).forEach(function(b){b.replaceWith('\n')});$$('.copy',c).forEach(function(b){b.remove()});return c.textContent.trim()}
function replyText(r){return $$('p,pre',r).map(pt).join('\n\n')}
function cardText(c){var o=[];Array.prototype.forEach.call($('.card-body',c).children,function(n){var t;if(n.tagName==='UL'||n.tagName==='OL')t=$$('li',n).map(function(l){return '- '+pt(l)}).join('\n');else if(n.classList.contains('tablewrap'))t=$$('tr',n).map(function(r){return $$('th,td',r).map(pt).join('\t')}).join('\n');else if(n.classList.contains('reply'))t=replyText(n);else t=pt(n);if(t)o.push(t)});return o.join('\n\n')}
$$('.card').forEach(function(c){var x=c.cloneNode(true);$$('.copy',x).forEach(function(b){b.remove()});c.setAttribute('data-s',x.textContent.replace(/\s+/g,' ').toLowerCase())});
function unmark(){$$('mark').forEach(function(m){var p=m.parentNode;p.replaceChild(document.createTextNode(m.textContent),m);p.normalize()})}
function mark(root,terms){
  var re=new RegExp('('+terms.map(function(t){return t.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}).join('|')+')','gi');
  var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){return n.parentNode.closest('button,mark,script')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}}),L=[],n;
  while(n=w.nextNode())L.push(n);
  L.forEach(function(n){if(!re.test(n.nodeValue))return;re.lastIndex=0;var f=document.createDocumentFragment(),parts=n.nodeValue.split(re);
    parts.forEach(function(p,i){if(i%2){var m=document.createElement('mark');m.textContent=p;f.appendChild(m)}else if(p)f.appendChild(document.createTextNode(p))});n.parentNode.replaceChild(f,n)});
}
function show(i,noHash){
  cur=i;document.body.classList.toggle('isdash',i===0);
  if(i>0){try{localStorage.setItem('faq_last',navs[i].querySelector('.lb').textContent)}catch(e){}}
  secs.forEach(function(s,k){s.classList.toggle('show',k===i)});
  navs.forEach(function(n,k){n.classList.toggle('on',k===i)});
  $('#crumb').textContent=navs[i].querySelector('.lb').textContent;
  if(!noHash)history.replaceState(null,'','#'+secs[i].id);
}
function search(){
  unmark();var v=q.value.trim().toLowerCase(),terms=v.split(/\s+/).filter(Boolean),total=0;if(terms.length)document.body.classList.remove('isdash');
  if(!terms.length){secs.forEach(function(s){$$('.card',s).forEach(function(c){c.hidden=false})});navs.forEach(function(n){n.classList.remove('dim')});show(cur,1);$('#rs').textContent='';$('#none').hidden=true;return}
  secs.forEach(function(s,k){var hit=0;
    $$('.card',s).forEach(function(c){var ok=terms.every(function(t){return c.getAttribute('data-s').indexOf(t)>-1});c.hidden=!ok;if(ok){hit++;c.classList.add('open');mark(c,terms)}});
    s.classList.toggle('show',hit>0);navs[k].classList.toggle('dim',!hit);total+=hit});
  $('#rs').textContent=total+' result'+(total===1?'':'s');$('#none').hidden=total>0;$('#crumb').textContent='Search';
}
navs.forEach(function(n,k){n.addEventListener('click',function(e){e.preventDefault();q.value='';search();show(k);$('#side').classList.remove('open');window.scrollTo(0,0)})});
document.addEventListener('click',function(e){
  var g=e.target.closest('.qn');if(g){e.preventDefault();q.value='';search();show(+g.getAttribute('data-go'));window.scrollTo(0,0);return}
  var b=e.target.closest('.copy');
  if(b){e.stopPropagation();var r=b.closest('.reply'),c=b.closest('.card');copyText(r?replyText(r):cardText(c),b);return}
  var h=e.target.closest('.card-head');if(h)h.parentNode.classList.toggle('open');
});
document.addEventListener('keydown',function(e){
  var h=e.target.closest&&e.target.closest('.card-head');
  if(h&&(e.key==='Enter'||e.key===' ')&&!e.target.closest('.copy')){e.preventDefault();h.parentNode.classList.toggle('open')}
  if(e.key==='/'&&document.activeElement!==q){e.preventDefault();q.focus()}
  if(/^[0-9]$/.test(e.key)&&!/INPUT|TEXTAREA/.test(document.activeElement.tagName)&&secs[+e.key]){q.value='';search();show(+e.key);window.scrollTo(0,0)}
  if(e.key==='Escape'){q.value='';search();q.blur()}
});
q.addEventListener('input',search);
$('#ex').onclick=function(){$$('.card:not([hidden])').forEach(function(c){c.classList.add('open')})};
$('#co').onclick=function(){$$('.card:not(.plain)').forEach(function(c){c.classList.remove('open')})};
$('#menu').onclick=function(){$('#side').classList.toggle('open')};
var MO=['January','February','March','April','May','June','July','August','September','October','November','December'],DY=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function p2(n){return(n<10?'0':'')+n}
function tick(){var d=new Date(),m=d.getHours()*60+d.getMinutes(),h=d.getHours(),s=m>=1305||m<465?['Night Shift','21:45 – 08:00']:m<840?['Morning Shift','07:45 – 16:00']:['Evening Shift','14:00 – 22:00'];
  $('#clock').textContent=p2(h)+':'+p2(d.getMinutes())+':'+p2(d.getSeconds());$('#shiftrange').textContent=s[0]+' · '+s[1];$('#shiftchip').textContent=s[0];
  $('#today').textContent=DY[d.getDay()]+', '+MO[d.getMonth()]+' '+d.getDate()+', '+d.getFullYear();
  $('#greet').innerHTML='Good '+(h<12?'morning':h<17?'afternoon':h<21?'evening':'night')+', <em>Team</em>!'}
tick();setInterval(tick,1000);
try{var ls=localStorage.getItem('faq_last');if(ls){$('#lastsec').textContent=ls;$('#lastnote').textContent='Last opened section'}}catch(e){}
$('#ksb').onclick=function(){var k=$('#ks');k.hidden=!k.hidden};
var h=location.hash.slice(1),i=secs.findIndex(function(s){return s.id===h});show(i>-1?i:0,1);
})();
