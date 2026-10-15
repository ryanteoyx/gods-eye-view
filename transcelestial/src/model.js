import {haversineKm} from './geo.js';
export const FRESH_DAYS=30;
export function matchRecords(records,query='',region='All regions',saved=null){
 const q=query.trim().toLowerCase();
 return records.filter(r=>(region==='All regions'||r.region===region)&&(!saved||saved.includes(r.id))&&[r.name,r.title,r.category,r.region,r.summary].filter(Boolean).join(' ').toLowerCase().includes(q));
}
export function staleRecord(record,now=Date.now()){
 const date=Date.parse(record.checkedAt);return !Number.isFinite(date)||now-date>FRESH_DAYS*86400000;
}
export function normalizeQuakes(data){
 if(!data||data.type!=='FeatureCollection'||!Array.isArray(data.features))throw new Error('Unexpected USGS response');
 return data.features.flatMap(f=>{
  const c=f?.geometry?.coordinates,p=f?.properties;
  if(!Array.isArray(c)||!p||!Number.isFinite(c[0])||!Number.isFinite(c[1])||Math.abs(c[0])>180||Math.abs(c[1])>90||!Number.isFinite(p.mag)||!Number.isFinite(p.time))return [];
  let url;try{url=new URL(p.url);if(url.protocol!=='https:'||url.hostname!=='earthquake.usgs.gov')return [];}catch{return [];}
  return [{id:String(f.id),lon:c[0],lat:c[1],mag:p.mag,time:p.time,title:String(p.place||'Location unavailable'),url:url.href}];
 });
}
export function nearbyQuakes(record,quakes,maxKm=500){
 return quakes.map(q=>({...q,distance:haversineKm(record.lat,record.lon,q.lat,q.lon)})).filter(q=>q.distance<=maxKm).sort((a,b)=>a.distance-b.distance);
}
export function makeBrief(record,sources,note=''){
 return `# ${record.name||record.title}\n\nResearch brief — not a qualified opportunity\n\nStatus: ${record.status}\nEvidence checked: ${record.checkedAt}\n\n${record.summary}\n\n## Next research step\n${record.next}\n\n## Missing evidence\n${record.gaps.join('\n')}\n\n## Analyst note\n${note||'No note added.'}\n\n## Sources\n${record.sources.map(id=>{const s=sources.find(x=>x.id===id);return s?`${s.name}: ${s.url}`:''}).join('\n')}\n`;
}
