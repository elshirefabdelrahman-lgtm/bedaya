(()=>{
 "use strict";
 const D=window.BEDAYA_DATA;
 const depth=document.body.dataset.depth||"";
 const here=document.body.dataset.page||"home";
 const p=value=>depth+value;
 const wa=(href,text)=>href+"?text="+encodeURIComponent(text);
 const phoneIcon=`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 3.2 9.6 8 7.8 9.5a14.5 14.5 0 0 0 6.7 6.7l1.5-1.8 4.8 2.4v2.5a1.8 1.8 0 0 1-1.8 1.8A16.1 16.1 0 0 1 2.9 5 1.8 1.8 0 0 1 4.7 3.2h2.5Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
 const whatsappIcon=`<svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 3a12.7 12.7 0 0 0-10.8 19.4L3.5 29l6.8-1.8A12.8 12.8 0 1 0 16 3Zm0 22.9c-2 0-3.9-.6-5.5-1.6l-.4-.2-4 .9 1.1-3.8-.3-.4A10.2 10.2 0 1 1 16 25.9Zm5.6-7.6c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.1c-.2.2-.4.2-.7.1-2-.9-3.5-2-4.8-4.1-.3-.5.3-.5.8-1.7.1-.2 0-.4 0-.6l-1-2.3c-.3-.6-.6-.5-.8-.5h-.7c-.3 0-.7.1-.9.4-.3.4-1.3 1.3-1.3 3.1 0 1.8 1.3 3.6 1.5 3.8.2.3 2.6 4 6.3 5.6 2.4 1 3.3 1.1 4.5.9 1.4-.2 2.7-1.2 3.1-2.3.4-1.1.4-2 .3-2.2-.2-.3-.5-.4-.8-.5Z"/></svg>`;

 const header=`<a class="skip-link" href="#main">تخطي إلى المحتوى</a><header class="site-header"><div class="container navbar"><a class="brand" href="${p("index.html")}" aria-label="مركز بداية - الرئيسية"><img src="${p("assets/images/brand/bedaya-center-logo.jpeg")}" width="50" height="50" alt="شعار مركز بداية"><span><strong>مركز بداية</strong><small>للطب النفسي وعلاج الإدمان</small></span></a><nav class="nav-links" id="navLinks" aria-label="التنقل الرئيسي"><a data-nav="home" href="${p("index.html")}">الرئيسية</a><a data-nav="about" href="${p("about.html")}">من نحن</a><a data-nav="addiction" href="${p("addiction-treatment.html")}">علاج الإدمان</a><a data-nav="psychiatry" href="${p("psychiatry.html")}">الطب النفسي</a><a data-nav="facilities" href="${p("facilities.html")}">المرافق</a><a data-nav="team" href="${p("medical-team.html")}">الفريق</a><a data-nav="contact" href="${p("contact.html")}">تواصل</a></nav><div class="nav-actions"><a class="btn btn-primary btn-sm" href="${wa(D.contact.consultWhatsAppHref,"مرحبًا، أرغب في طلب استشارة من مركز بداية.")}" target="_blank" rel="noopener">اطلب استشارة</a><button class="icon-btn menu-toggle" id="menuToggle" aria-expanded="false" aria-controls="navLinks" aria-label="فتح القائمة">☰</button></div></div></header>`;
 document.getElementById("siteHeader").innerHTML=header;
 const active=document.querySelector(`[data-nav="${here}"]`);
 if(active)active.setAttribute("aria-current","page");
 const toggle=document.getElementById("menuToggle");
 const nav=document.getElementById("navLinks");
 toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",open);toggle.textContent=open?"×":"☰";document.body.classList.toggle("menu-open",open)});
 nav.addEventListener("click",()=>{nav.classList.remove("open");document.body.classList.remove("menu-open")});

 const footer=`<footer class="site-footer"><div class="container"><div class="footer-grid"><div><a class="brand" href="${p("index.html")}"><img src="${p("assets/images/brand/bedaya-center-logo.jpeg")}" width="50" height="50" alt=""><span><strong>مركز بداية</strong><small>للطب النفسي وعلاج الإدمان</small></span></a><p>معلومات واضحة ومسارات تواصل مباشرة للتعرف على خدمات الطب النفسي وعلاج الإدمان في المنيا وأسيوط.</p></div><div><h4>الموقع</h4><ul><li><a href="${p("about.html")}">من نحن</a></li><li><a href="${p("medical-team.html")}">فريق العمل</a></li><li><a href="${p("doctors.html")}">الأطباء والاستشاريون</a></li><li><a href="${p("nursing-team.html")}">فريق التمريض</a></li><li><a href="${p("facilities.html")}">المرافق</a></li></ul></div><div><h4>الخدمات</h4><ul><li><a href="${p("addiction-treatment.html")}">برامج علاج الإدمان</a></li><li><a href="${p("psychiatry.html")}">الطب النفسي</a></li><li><a href="${p("branches.html")}">الفروع</a></li><li><a href="${p("contact.html")}">التواصل</a></li></ul></div><div><h4>معلومات مهمة</h4><ul><li><a href="${p("privacy-policy.html")}">سياسة الخصوصية</a></li><li><a href="${D.contact.phoneHref}">${D.contact.phone}</a></li><li><a href="${D.contact.generalWhatsAppHref}" target="_blank" rel="noopener">واتساب المركز</a></li></ul></div></div><div class="footer-bottom"><p>جميع الحقوق محفوظة © <span id="year"></span> مركز بداية.</p></div></div></footer><div class="floating-contact" aria-label="تواصل سريع"><a class="phone" href="${D.contact.phoneHref}" aria-label="اتصل بالمركز">${phoneIcon}</a><a class="wa" href="${D.contact.generalWhatsAppHref}" target="_blank" rel="noopener" aria-label="واتساب المركز">${whatsappIcon}</a></div>`;
 document.getElementById("siteFooter").innerHTML=footer;
 document.getElementById("year").textContent=new Date().getFullYear();

 document.querySelectorAll("[data-faq]").forEach(box=>box.querySelectorAll(".faq-q").forEach(button=>button.addEventListener("click",()=>{const item=button.closest(".faq-item");const open=item.classList.toggle("open");button.setAttribute("aria-expanded",open)})));

 // Enrich the compact team cards on the homepage from the central data file.
 if(here==="home")document.querySelectorAll(".section-dark .team-card").forEach(card=>{const displayedName=card.querySelector("h3")?.textContent.trim();const person=D.team.find(item=>item.name===displayedName);if(!person)return;const body=card.querySelector(".card-body");const text=document.createElement("p");text.className="team-home-bio";text.textContent=person.bio;body.append(text)});

 // The center confirmed image 7 as the main entry image for Bedaya 1.
 const branchOneImage=document.querySelector('img[src$="branch-1/facility-01.jpeg"]');
 if(branchOneImage&&(here==="home"||location.pathname.endsWith("branches.html")||document.body.dataset.branch==="minya-1")){
  branchOneImage.src=p("assets/images/branches/branch-1/facility-07.jpeg");
  branchOneImage.alt="مدخل مركز بداية 1 بالمنيا";
 }

 if("IntersectionObserver" in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.1});document.querySelectorAll(".reveal").forEach(element=>observer.observe(element))}else document.querySelectorAll(".reveal").forEach(element=>element.classList.add("visible"));
 window.Bedaya={path:p,wa,icons:{phone:phoneIcon,whatsapp:whatsappIcon}};
})();
