const fs=require("fs");
const path=require("path");
const cp=require("child_process");
const root=__dirname;
const required=["index.html","about.html","addiction-treatment.html","psychiatry.html","facilities.html","medical-team.html","doctors.html","nursing-team.html","branches.html","branches/minya-1.html","branches/minya-2.html","branches/assiut.html","contact.html","privacy-policy.html","404.html"];
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
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(match=>match[1]);
if(new Set(sitemapUrls).size!==sitemapUrls.length)errors.push("Sitemap contains duplicate URLs");
const expectedSitemapUrls=required.filter(rel=>!["404.html","branches/assiut.html"].includes(rel)).map(rel=>rel==="index.html"?"https://www.bidayanew.com/":`https://www.bidayanew.com/${rel}`);
for(const url of expectedSitemapUrls)if(!sitemapUrls.includes(url))errors.push(`Sitemap missing ${url}`);
for(const url of sitemapUrls)if(!expectedSitemapUrls.includes(url))errors.push(`Unexpected sitemap URL ${url}`);
for(const url of sitemapUrls){const pathname=new URL(url).pathname;const rel=pathname==="/"?"index.html":pathname.slice(1);const source=fs.readFileSync(path.join(root,rel),"utf8");if(/name="robots"[^>]+noindex/i.test(source))errors.push(`Sitemap includes noindex page ${url}`)}
const robots=fs.readFileSync(path.join(root,"robots.txt"),"utf8");
if(!/^Sitemap: https:\/\/www\.bidayanew\.com\/sitemap\.xml$/mi.test(robots))errors.push("robots.txt is missing the production sitemap declaration");
for(const number of ["01033536226","01013130772","01024436904"])if(!allProduction.includes(number))errors.push(`Missing contact number ${number}`);
if(errors.length){console.error(errors.join("\n"));process.exit(1)}
console.log(`QA passed: ${htmlFiles.length} production HTML pages, local references, JavaScript syntax, contact data, sitemap, robots, and production SEO state.`);
