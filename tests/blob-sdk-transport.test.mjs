import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url),ts=require('typescript');
const {MockAgent,setGlobalDispatcher,getGlobalDispatcher}=require('undici');
test('pinned real SDK makes one HTTP PUT on transient failure, with zero retries and no network',async()=>{
 const original=getGlobalDispatcher(),agent=new MockAgent();agent.disableNetConnect();setGlobalDispatcher(agent);
 const prior=process.env.VERCEL_BLOB_RETRIES;let calls=0;
 try {
  agent.get('https://vercel.com').intercept({path:/.*/,method:'PUT'}).reply(()=>{calls++;return {statusCode:503,data:JSON.stringify({error:{code:'service_unavailable'}}),responseOptions:{headers:{'content-type':'application/json'}}};}).persist();
  const source=fs.readFileSync(new URL('../src/lib/blob-write-transport.ts',import.meta.url),'utf8');
  const code=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const loadedModule={exports:{}};new Function('require','module','exports','process',code)(require,loadedModule,loadedModule.exports,process);
  await assert.rejects(loadedModule.exports.putPublicationObject({pathname:'bayut/media/TEST/photo.jpg',body:new TextEncoder().encode('local').buffer,contentType:'image/jpeg',isFeed:false,token:'vercel_blob_rw_example123_fake',storeId:'example123'}));
  assert.equal(process.env.VERCEL_BLOB_RETRIES,'0');assert.equal(calls,1);
 } finally {setGlobalDispatcher(original);await agent.close();if(prior===undefined)delete process.env.VERCEL_BLOB_RETRIES;else process.env.VERCEL_BLOB_RETRIES=prior;}
});
