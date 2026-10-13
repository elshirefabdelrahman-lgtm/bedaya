(()=>{
 "use strict";
 const D=window.BEDAYA_DATA;
 const p=window.Bedaya.path;
 const teamRoot=document.getElementById("teamGrid");
 const categories=[
  ["leadership","الإدارة والقيادة"],
  ["medical","الإدارة الفنية والاستشاريون والأطباء"],
  ["psychology","الأخصائيون النفسيون"],
  ["nursing","فريق التمريض"]
 ];

 function teamCard(person){
  const card=document.createElement("article");
  card.className="card team-profile";
  const image=document.createElement("img");
  image.className="team-profile-image";
  image.src=p(person.image);
  image.alt=person.name;
  image.width=1024;
  image.height=1024;
  image.loading="lazy";
  const body=document.createElement("div");
  body.className="team-profile-body";
  const name=document.createElement("h3");name.textContent=person.name;
  const role=document.createElement("p");role.className="team-role";role.textContent=person.role;
  const specialty=document.createElement("p");specialty.className="team-specialty";specialty.textContent=person.specialty;
  const bio=document.createElement("p");bio.className="team-bio";bio.textContent=person.bio;
  body.append(name,role,specialty,bio);
  if(person.details?.length){
   const details=document.createElement("details");
   const summary=document.createElement("summary");summary.textContent="المؤهلات والخبرات";
   const list=document.createElement("ul");list.className="team-details";
   person.details.forEach(text=>{const item=document.createElement("li");item.textContent=text;list.append(item)});
   details.append(summary,list);body.append(details);
   if(document.body.dataset.teamCategory||document.body.classList.contains("team-overview"))details.open=true;
  }
  card.append(image,body);
  return card;
 }

 if(teamRoot){
  teamRoot.className="team-groups";
  const requestedCategory=document.body.dataset.teamCategory;
  categories.forEach(([id,label])=>{
   if(requestedCategory&&requestedCategory!==id)return;
   const people=D.team.filter(person=>person.category===id);
   if(!people.length)return;
   const section=document.createElement("section");section.className="team-group";
   const heading=document.createElement("div");heading.className="team-group-heading";
   const title=document.createElement("h2");title.textContent=label;
   const count=document.createElement("span");count.textContent=`${people.length} ${people.length===1?"عضو":"أعضاء"}`;
   heading.append(title,count);
   const grid=document.createElement("div");grid.className=`team-grid${requestedCategory?" team-grid-detailed":""}`;
   people.forEach(person=>grid.append(teamCard(person)));
   section.append(heading,grid);teamRoot.append(section);
  });
 }

 const branch=document.body.dataset.branch;
 const galleries={
  "minya-1":{dir:"branch-1",ext:"jpeg",items:[7,1,3,5,6],label:"مركز بداية 1 — المنيا"},
  "minya-2":{dir:"branch-2",ext:"jfif",items:[1,2,4,6,8],label:"مركز بداية 2 — المنيا"},
  assiut:{dir:"branch-3",ext:"jfif",items:[1,2,3,4],label:"مجموعة صور الفرع الثالث — الربط بأسيوط يحتاج تأكيدًا"}
 };
 const gallery=document.getElementById("branchGallery");
 if(gallery&&galleries[branch]){
  const data=galleries[branch];
  gallery.classList.add("gallery-uniform");
  data.items.forEach((number,index)=>{
   const filename=String(number).padStart(2,"0");
   const figure=document.createElement("figure");
   if(index===0)figure.className="gallery-featured";
   const image=document.createElement("img");
   image.src=p(`assets/images/branches/${data.dir}/facility-${filename}.${data.ext}`);
   image.alt=number===7&&branch==="minya-1"?"صورة مدخل مركز بداية 1 بالمنيا":`${data.label} — صورة ${number}`;
   image.loading=index===0?"eager":"lazy";
   const caption=document.createElement("figcaption");
   caption.textContent=number===7&&branch==="minya-1"?"مدخل مركز بداية 1 — المنيا":`${data.label} — صورة ${number}`;
   figure.append(image,caption);gallery.append(figure);
  });
 }
})();
