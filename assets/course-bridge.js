/* Adds an ordered project entry and guided replay to all four reference courses. */
'use strict';
(() => {
  const isSpring=location.pathname.endsWith('spring-boot.html');
  const target='projects.html#'+(isSpring?'erp':'pos')+'/overview';
  const top=document.querySelector('.topbar');
  if(top){
    const banner=document.createElement('section');banner.className='build-course-entry';banner.setAttribute('aria-label','Ordered project learning path');
    banner.innerHTML=`<div><svg viewBox="0 0 44 44" aria-hidden="true"><rect x="2" y="2" width="40" height="40" rx="11" fill="#e9f2e8"/><path d="M12 14h8v7h-8zM25 25h8v7h-8zM20 18h9v7M16 21v8h9" fill="none" stroke="#39734f" stroke-width="1.5"/><path d="m26 22 3 3 3-3" fill="none" stroke="#39734f" stroke-width="1.5"/></svg><div><b>මුල සිට පිළිවෙළට project එකක් හදමු.</b><p>POS → E-commerce → ERP · Planning, JS/TS, UI, API, Docker සහ release දක්වා මඟ නොහැරෙන milestones 28ක්.</p></div></div><a href="${target}">Start project path →</a>`;
    top.after(banner);
  }
  const brand=document.querySelector('.sidebar .brand');
  if(brand){const link=document.createElement('a');link.className='build-sidebar-entry';link.href=target;link.textContent='↗ Project paths · මුල සිට හදමු';brand.after(link);}
  const sessions=new Map();
  function stop(panel){const session=sessions.get(panel);if(!session)return;clearTimeout(session.timer);session.timer=null;session.playing=false;const button=panel.querySelector('[data-bridge-action="play"]');if(button)button.textContent='▶ Play explanation';}
  function scan(){
    for(const [panel]of sessions)if(!panel.isConnected){stop(panel);sessions.delete(panel);}
    document.querySelectorAll('.code-panel').forEach(panel=>{
      if(sessions.has(panel))return;
      const lines=[...panel.querySelectorAll('.code-lines > button.code-line')];
      if(lines.length===0)return;
      const session={timer:null,playing:false,index:0,automatic:false};sessions.set(panel,session);
      const controls=document.createElement('div');controls.className='bridge-replay';
      controls.innerHTML='<button type="button" data-bridge-action="play">▶ Play explanation</button><button type="button" data-bridge-action="restart">↺ Restart</button><label>Speed <select aria-label="Code explanation speed"><option value="6500">Slow</option><option value="4200" selected>Normal</option><option value="2000">Fast</option></select></label><small>Guided replay · code execute කරන්නේ නැහැ</small>';
      panel.querySelector('.code-lines').before(controls);
      const select=index=>{session.index=index;session.automatic=true;lines[index].click();session.automatic=false;};
      const schedule=()=>{session.timer=setTimeout(()=>{if(!panel.isConnected||!session.playing){stop(panel);return;}if(session.index>=lines.length-1){stop(panel);return;}select(session.index+1);schedule();},Number(controls.querySelector('select').value));};
      panel.addEventListener('click',event=>{
        const line=event.target.closest('.code-line');if(line&&!session.automatic){stop(panel);session.index=lines.indexOf(line);}
        const action=event.target.closest('[data-bridge-action]')?.dataset.bridgeAction;
        if(action==='restart'){stop(panel);select(0);}
        if(action==='play'){
          if(session.playing)stop(panel);
          else{for(const [other]of sessions)if(other!==panel)stop(other);if(session.index>=lines.length-1)select(0);session.playing=true;event.target.closest('button').textContent='Ⅱ Pause explanation';schedule();}
        }
      });
      controls.querySelector('select').addEventListener('change',()=>{if(session.playing){clearTimeout(session.timer);schedule();}});
    });
  }
  const observer=new MutationObserver(scan);observer.observe(document.querySelector('#main')||document.body,{childList:true,subtree:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)for(const [panel]of sessions)stop(panel);});
  window.addEventListener('hashchange',()=>{for(const [panel]of sessions)stop(panel);});
  window.addEventListener('pagehide',()=>{for(const [panel]of sessions)stop(panel);observer.disconnect();});
  scan();
})();
