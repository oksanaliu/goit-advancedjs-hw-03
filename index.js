import{S as p}from"./assets/vendor-BQtLt1QN.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}})();async function u(e,o=1,s=12){const t=`https://pixabay.com/api/?key=47684004-d700c1255eaadac249fdd5630&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${s}`;try{const a=await fetch(t);if(!a.ok)throw new Error("Failed to fetch images");const d=await a.json();if(d.totalHits===0||!d.hits.length)throw new Error("No images found");return d}catch(a){throw console.error("Error fetching images:",a),a}}function f(e){const o=document.querySelector(".gallery"),s=e.map(n=>`
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
      `).join("");o.innerHTML=s}function g(){const e=document.querySelector(".gallery");e.innerHTML=""}function h(){document.querySelector(".loader").classList.remove("hidden")}function m(){document.querySelector(".loader").classList.add("hidden")}function w(e){console.log("Error message:",e),iziToast.error({title:"Error",message:e})}function c(e){iziToast.info({title:"Info",message:e})}const L=document.querySelector("#search-form"),b=document.querySelector('input[name="searchQuery"]');let l=1,i="",y=new p(".gallery a");L.addEventListener("submit",async e=>{if(e.preventDefault(),i=b.value.trim(),!i){c("Please enter a search term.");return}g(),l=1,h();try{const o=await u(i,l);if(o.hits.length===0){c("Sorry, there are no images matching your search query. Please try again!");return}f(o.hits),y.refresh()}catch(o){console.error(o),w("Sorry, there are no images matching your search query. Please try again!")}finally{m()}});window.addEventListener("scroll",async()=>{if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100){l+=1,h();try{const e=await u(i,l);if(e.hits.length===0){c("No more images to load.");return}f(e.hits),y.refresh()}catch(e){console.error(e),c("No more images to load.")}finally{m()}}});
//# sourceMappingURL=index.js.map
