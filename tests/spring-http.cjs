// Build the sample first with mvn package. Tests start a private local server on a free port.
const {spawn}=require('node:child_process');
const net=require('node:net');
const path=require('node:path');
const fs=require('node:fs');
const assert=require('node:assert/strict');
(async()=>{
  const jar=process.env.SPRING_JAR||path.resolve(__dirname,'../examples/spring-student-api/target/student-api-1.0.0.jar');
  assert.ok(fs.existsSync(jar),'Build the example or set SPRING_JAR to an executable jar.');
  const probe=net.createServer();await new Promise(resolve=>probe.listen(0,'127.0.0.1',resolve));const port=probe.address().port;await new Promise(resolve=>probe.close(resolve));
  const child=spawn('java',['-jar',jar,'--server.address=127.0.0.1','--server.port='+port,'--logging.level.root=ERROR'],{stdio:['ignore','pipe','pipe']});
  let log='',spawnError;child.stdout.on('data',chunk=>{log=(log+chunk).slice(-4000);});child.stderr.on('data',chunk=>{log=(log+chunk).slice(-4000);});child.on('error',error=>{spawnError=error;});
  const base='http://127.0.0.1:'+port;
  try{
    let ready=false;
    for(let i=0;i<100;i++){
      if(spawnError)throw spawnError;
      if(child.exitCode!==null)throw new Error('Application exited: '+log);
      try{const result=await fetch(base+'/actuator/health');if(result.ok){assert.equal((await result.json()).status,'UP');ready=true;break;}}catch{}
      await new Promise(resolve=>setTimeout(resolve,150));
    }
    assert.ok(ready,'Server did not become ready: '+log);
    const send=(method,url,body)=>fetch(base+url,{method,...(body!==undefined?{headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{})});
    let result=await send('GET','/api/students');assert.equal(result.status,200);assert.deepEqual(await result.json(),[]);
    result=await send('POST','/api/students',{name:'  Amali  ',email:' AMALI@EXAMPLE.COM '});assert.equal(result.status,201);const student=await result.json();assert.equal(student.name,'Amali');assert.equal(student.email,'amali@example.com');assert.equal(result.headers.get('location'),'/api/students/'+student.id);
    result=await send('PATCH','/api/students/'+student.id,{name:'Amali Silva',email:student.email});assert.equal(result.status,200);assert.equal((await result.json()).name,'Amali Silva');
    result=await send('POST','/api/students',{name:'Other',email:student.email});assert.equal(result.status,409);
    result=await send('POST','/api/students',{name:' ',email:'bad'});assert.equal(result.status,400);
    result=await send('DELETE','/api/students/'+student.id);assert.equal(result.status,204);assert.equal(await result.text(),'');
    result=await send('GET','/api/students/'+student.id);assert.equal(result.status,404);
    console.log('PASS: packaged Spring Boot JAR starts; real HTTP health/list/create/update/duplicate/validation/delete/missing-record checks pass.');
  }finally{
    if(child.exitCode===null){child.kill('SIGTERM');await new Promise(resolve=>{const timer=setTimeout(()=>{child.kill('SIGKILL');resolve();},5000);child.once('exit',()=>{clearTimeout(timer);resolve();});});}
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
