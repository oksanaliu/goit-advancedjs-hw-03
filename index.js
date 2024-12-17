import{i as f,S as w}from"./assets/vendor-CYmbJjjI.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();async function m(e,r=1,i=12){const n=`https://pixabay.com/api/?key=47684004-d700c1255eaadac249fdd5630&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${i}`;try{const a=await fetch(n);if(!a.ok)throw new Error("Failed to fetch images");const u=await a.json();if(!u.hits||u.hits.length===0)throw new Error("No images found");return u}catch(a){throw console.error("Error fetching images:",a),a}}function p(e){const r=document.querySelector(".gallery"),i=e.map(o=>`
      <a href="${o.largeImageURL}" class="gallery-item">
        <div class="photo-card">
          <img src="${o.webformatURL}" alt="${o.tags}" loading="lazy" />
          <div class="info">
            <p><b>Likes:</b> ${o.likes}</p>
            <p><b>Views:</b> ${o.views}</p>
            <p><b>Comments:</b> ${o.comments}</p>
            <p><b>Downloads:</b> ${o.downloads}</p>
          </div>
        </div>
      </a>
    `).join("");r.innerHTML=i}function L(){const e=document.querySelector(".gallery");e.innerHTML=""}function y(){document.querySelector(".loader").classList.remove("hidden")}function s(){document.querySelector(".loader").classList.add("hidden")}function v(e){console.log("Error message:",e),f.error({title:"Error",message:e,position:"topRight"})}function l(e){f.info({title:"Info",message:e,position:"topRight"})}const b=document.querySelector("#search-form"),E=document.querySelector('input[name="searchQuery"]'),h=document.createElement("div");h.classList.add("loader","hidden");h.innerHTML=`<div class="loader-inner ball-pulse">
  <div></div>
  <div></div>
  <div></div>
</div>`;document.body.appendChild(h);let d=1,c="",g=new w(".gallery a");b.addEventListener("submit",async e=>{if(e.preventDefault(),c=E.value.trim(),!c){l("Please enter a search term.");return}L(),d=1,y();try{const r=Date.now(),i=await m(c,d),o=Math.max(500-(Date.now()-r),0);setTimeout(()=>{if(!i.hits||i.hits.length===0){l("Sorry, there are no images matching your search query. Please try again!"),s();return}p(i.hits),g.refresh()},o)}catch(r){console.error(r),setTimeout(()=>{v("Sorry, there was an error fetching images. Please try again later."),s()},500)}finally{s()}});window.addEventListener("scroll",async()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100){d+=1,y();try{const e=Date.now(),r=await m(c,d),i=Math.max(500-(Date.now()-e),0);setTimeout(()=>{if(!r.hits||r.hits.length===0){l("No more images to load."),s();return}p(r.hits),g.refresh()},i)}catch(e){console.error(e),setTimeout(()=>{l("No more images to load."),s()},500)}}});
//# sourceMappingURL=index.js.map
