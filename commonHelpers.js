import{a as m,i}from"./assets/vendor-ae6d56ab.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const y=document.getElementById("search-form"),f=document.getElementById("gallery"),c=document.getElementById("load-more");let l=1,a="";y.addEventListener("submit",async o=>{o.preventDefault(),f.innerHTML="",c.style.display="none",l=1,a=o.target.searchQuery.value.trim(),a&&await u(a,l)});c.addEventListener("click",async()=>{l++,await u(a,l)});async function u(o,s){const n=`https://pixabay.com/api/?key=44486034-0380855ab7a69aa1783ee0e98&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${s}`;try{const t=(await m.get(n)).data;t.hits.length===0&&s===1?i.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again."}):(s===1&&i.success({title:"Success",message:`Hooray! We found ${t.totalHits} images.`}),p(t.hits),t.totalHits>s*40?c.style.display="block":(c.style.display="none",s>1&&i.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})))}catch{i.error({title:"Error",message:"Failed to fetch images. Please try again later."})}}function p(o){const s=o.map(r=>`
        <div class="photo-card">
            <img src="${r.webformatURL}" alt="${r.tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                    <b>Likes</b> ${r.likes}
                </p>
                <p class="info-item">
                    <b>Views</b> ${r.views}
                </p>
                <p class="info-item">
                    <b>Comments</b> ${r.comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b> ${r.downloads}
                </p>
            </div>
        </div>
    `).join("");f.insertAdjacentHTML("beforeend",s)}
//# sourceMappingURL=commonHelpers.js.map
