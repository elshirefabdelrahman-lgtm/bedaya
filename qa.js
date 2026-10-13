const fs=require("fs");
const path=require("path");
const cp=require("child_process");
const root=__dirname;
const required=["index.html","about.html","addiction-treatment.html","psychiatry.html","facilities.html","medical-team.html","branches.html","branches/minya-1.html","branches/minya-2.html","branches/assiut.html","articles.html","contact.html","privacy-policy.html","medical-disclaimer.html","404.html"];
const errors=[];
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):path.join(dir,entry.name));
const htmlFiles=walk(root).filter(file=>file.endsWith(".html")&&!file.includes(`${path.sep}reference${path.sep}`));
for(const rel of required)if(!fs.existsSync(path.join(root,rel)))errors.push(`Missing required page: ${rel}`);
for(const file of htmlFiles){
 const source=fs.readFileSync(file,"utf8");
 const rel=path.relative(root,file);
 if(!/<html lang="ar" dir="rtl">/i.test(source))errors.push(`${rel}: missing Arabic RTL root`);
 if((source.match(/<title>/gi)||[]).length!==1)errors.push(`${rel}: expected one title`);
 if((source.match(/<h1[ >]/gi)||[]).length!==1)errors.push(`${rel}: expected one H1`);
 if(rel!=="404.html"&&!/name="description"/i.test(source))errors.push(`${rel}: missing description`);
 for(const match of source.matchAll(/(?:href|src)="([^"]+)"/g)){
  const value=match[1];
  if(/^(https?:|tel:|mailto:|#|data:)/i.test(value))continue;
  const clean=value.split(/[?#]/)[0];
  if(clean&&!fs.existsSync(path.resolve(path.dirname(file),clean)))errors.push(`${rel}: broken local reference ${value}`);
 }
 if(/D:\\مركز بداية|file:\/\/|domain-pending\.invalid|example\.com/i.test(source))errors.push(`${rel}: contains local or placeholder URL`);
}
for(const file of walk(path.join(root,"assets","js")).filter(file=>file.endsWith(".js"))){
 const result=cp.spawnSync(process.execPath,["--check",file],{encoding:"utf8"});
 if(result.status!==0)errors.push(`${path.relative(root,file)}: JavaScript syntax error`);
}
const allProduction=walk(root).filter(file=>!file.includes(`${path.sep}reference${path.sep}`)&&!file.includes(`${path.sep}.git${path.sep}`)&&!file.endsWith("qa.js")).map(file=>fs.readFileSync(file).toString()).join("\n");
if(/domain-pending\.invalid|example\.com/i.test(allProduction))errors.push("Production files contain a placeholder domain");
const sitemap=fs.readFileSync(path.join(root,"sitemap.xml"),"utf8");
if(/<loc>/i.test(sitemap))errors.push("Interim sitemap must remain empty until the domain is confirmed");
for(const number of ["01033536226","01013130772","01024436904"])if(!allProduction.includes(number))errors.push(`Missing contact number ${number}`);
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`QA passed: ${htmlFiles.length} production HTML pages, local references, JavaScript syntax, contact data, and interim SEO state.`);
