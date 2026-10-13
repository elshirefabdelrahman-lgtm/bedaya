const http=require("http");
const fs=require("fs");
const path=require("path");
const root=__dirname;
const port=Number(process.env.PORT||8080);
const mime={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"text/javascript; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".jfif":"image/jpeg",".xml":"application/xml; charset=utf-8",".txt":"text/plain; charset=utf-8"};
http.createServer((req,res)=>{
  let pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  if(pathname==="/")pathname="/index.html";
  const file=path.normalize(path.join(root,pathname));
  if(!file.startsWith(root)){res.writeHead(403);res.end("Forbidden");return;}
  fs.readFile(file,(error,data)=>{
    if(error){fs.readFile(path.join(root,"404.html"),(notFoundError,notFound)=>{res.writeHead(404,{"Content-Type":"text/html; charset=utf-8"});res.end(notFoundError?"Not found":notFound)});return;}
    res.writeHead(200,{"Content-Type":mime[path.extname(file).toLowerCase()]||"application/octet-stream"});res.end(data);
  });
}).listen(port,()=>console.log(`Bedaya preview: http://127.0.0.1:${port}`));
