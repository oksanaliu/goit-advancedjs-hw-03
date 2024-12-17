import{i as f,S as w}from"./assets/vendor-CYmbJjjI.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();async function h(e,t=1,s=12){const o=`https://pixabay.com/api/?key=47684004-d700c1255eaadac249fdd5630&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${s}`;try{const i=await fetch(o);if(!i.ok)throw new Error("Failed to fetch images");const d=await i.json();if(!d.hits||d.hits.length===0)throw new Error("No images found");return d}catch(i){throw console.error("Error fetching images:",i),i}}function m(e){const t=document.querySelector(".gallery"),s=e.map(n=>`
      <a href="${n.largeImageURL}" class="gallery-item">
        <div class="photo-card">
          <img src="${n.webformatURL}" alt="${n.tags}" loading="lazy" />
          <div class="info">
            <p><b>Likes:</b> ${n.likes}</p>
            <p><b>Views:</b> ${n.views}</p>
            <p><b>Comments:</b> ${n.comments}</p>
            <p><b>Downloads:</b> ${n.downloads}</p>
          </div>
        </div>
      </a>
    `).join("");t.innerHTML=s}function L(){const e=document.querySelector(".gallery");e.innerHTML=""}function p(){document.querySelector(".loader").classList.remove("hidden")}function y(){document.querySelector(".loader").classList.add("hidden")}function v(e){console.log("Error message:",e),f.error({title:"Error",message:e,position:"topRight"})}function c(e){f.info({title:"Info",message:e,position:"topRight"})}const b=document.querySelector("#search-form"),E=document.querySelector('input[name="searchQuery"]'),u=document.createElement("div");u.classList.add("loader","hidden");u.innerHTML=`<div class="loader-inner ball-pulse">
  <div></div>
  <div></div>
  <div></div>
</div>`;document.body.appendChild(u);let l=1,a="",g=new w(".gallery a");b.addEventListener("submit",async e=>{if(e.preventDefault(),a=E.value.trim(),!a){c("Please enter a search term.");return}L(),l=1,p();try{const t=await h(a,l);if(!t.hits||t.hits.length===0){c("Sorry, there are no images matching your search query. Please try again!");return}m(t.hits),g.refresh()}catch(t){console.error(t),v("Sorry, there was an error fetching images. Please try again later.")}finally{y()}});window.addEventListener("scroll",async()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100){l+=1,p();try{const e=await h(a,l);if(!e.hits||e.hits.length===0){c("No more images to load.");return}m(e.hits),g.refresh()}catch(e){console.error(e),c("No more images to load.")}finally{y()}}});
//# sourceMappingURL=index.js.map
