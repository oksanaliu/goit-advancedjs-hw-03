import{i as f,S as g}from"./assets/vendor-B2mb6eXk.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(t){if(t.ep)return;t.ep=!0;const n=s(t);fetch(t.href,n)}})();async function h(e,r=1,s=12){const n=`https://pixabay.com/api/?key=47684004-d700c1255eaadac249fdd5630&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${s}`;try{const a=await fetch(n);if(!a.ok)throw new Error("Failed to fetch images");const u=await a.json();if(!u.hits||u.hits.length===0)throw new Error("No images found");return u}catch(a){throw console.error("Error fetching images:",a),a}}function m(e){const r=document.querySelector(".gallery"),s=e.map(o=>`
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
    `).join("");r.insertAdjacentHTML("beforeend",s)}function w(){const e=document.querySelector(".gallery");e.innerHTML=""}function y(){const e=document.querySelector(".loader");e.style.display="inline-block",e.classList.remove("hidden")}function i(){const e=document.querySelector(".loader");e.classList.add("hidden"),setTimeout(()=>{e.style.display="none"},300)}function L(e){console.log("Error message:",e),f.error({title:"Error",message:e,position:"topRight"})}function l(e){f.info({title:"Info",message:e,position:"topRight"})}const b=document.querySelector("#search-form"),S=document.querySelector('input[name="searchQuery"]');let d=1,c="",p=new g(".gallery a");const v=document.querySelector(".loader");b.addEventListener("submit",async e=>{if(e.preventDefault(),c=S.value.trim(),!c||!/^[a-zA-Z0-9 ]+$/.test(c)){l("Please enter a valid search term using only letters, numbers, and spaces.");return}w(),d=1,y();try{const r=Date.now(),s=await h(c,d),o=Math.max(500-(Date.now()-r),0);setTimeout(()=>{if(!s.hits||s.hits.length===0){l("Sorry, there are no images matching your search query. Please try again!"),i();return}m(s.hits),p.refresh(),i()},o)}catch(r){console.error(r),setTimeout(()=>{L("Sorry, there was an error fetching images. Please try again later."),i()},500)}});window.addEventListener("scroll",async()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100&&!v.classList.contains("hidden")){d+=1,y();try{const e=Date.now(),r=await h(c,d),s=Math.max(500-(Date.now()-e),0);setTimeout(()=>{if(!r.hits||r.hits.length===0){l("No more images to load."),i();return}m(r.hits),p.refresh(),i()},s)}catch(e){console.error(e),setTimeout(()=>{l("No more images to load."),i()},500)}}});
//# sourceMappingURL=index.js.map