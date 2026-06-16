import { useState, useEffect, useRef } from "react";
const LOGO_SMALL="data:image/png;base64,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";
const LOGO_192=LOGO_SMALL;

const SK="vargeh_v7";
const GD=150; // روزهای آبستنی گوسفند
const C={bg:"#0B1610",surface:"#142019",card:"#1C2E22",border:"#263D2C",
  accent:"#5BBA6F",accentGlow:"rgba(91,186,111,0.13)",
  gold:"#D4A843",goldDim:"rgba(212,168,67,0.13)",
  text:"#E4EDE6",textMid:"#8FAF97",textDim:"#4E6B56",
  danger:"#E05C5C",dangerDim:"rgba(224,92,92,0.13)",
  info:"#5BA4BA",warn:"#E09A3E",purple:"#9B72CF"};

// ── ابزارها ──
const toP=n=>String(n).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]);
const isDate=d=>/^\d{4}\/\d{2}\/\d{2}$/.test(d);
const gC=g=>g==="BB"?C.accent:g==="B+"?C.gold:C.danger;
const sC=s=>s==="در گله"?C.accent:s==="فروش"?C.gold:C.danger;
const uid=()=>Math.random().toString(36).slice(2,9);
const fmtRial=n=>{
  const abs=Math.abs(Math.round(n));
  const s=abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
  return (n<0?"-":n>0?"+":"")+s+" ریال";
};
const fmtM=n=>(n>=0?"+":"")+Math.round(n/1000000)+"M";
const shamsiToDays=d=>{if(!isDate(d))return 0;const[y,m,day]=d.split("/").map(Number);return y*365+m*30+day;};
const daysFrom=ds=>{if(!isDate(ds))return null;const now=new Date();const td=(now.getFullYear()-621)*365+now.getMonth()*30+now.getDate();return shamsiToDays(ds)-td;};
const addDays=(ds,n)=>{if(!isDate(ds))return null;const[y,m,d]=ds.split("/").map(Number);let t=y*365+m*30+d+n;const ny=Math.floor(t/365);t-=ny*365;const nm=Math.min(12,Math.max(1,Math.floor(t/30)));const nd=Math.max(1,t-nm*30);return`${ny}/${String(nm).padStart(2,"0")}/${String(Math.min(nd,30)).padStart(2,"0")}`;};
const calcFin=a=>{const c=(a.costs||[]).reduce((s,x)=>s+(+x.amount||0),0);const r=(a.revenues||[]).reduce((s,x)=>s+(+x.amount||0),0);return{c,r,p:r-c};};

// سن تخمینی به ماه
const ageInMonths=a=>{
  if(isDate(a.birthDate)){
    const days=Math.abs(daysFrom(a.birthDate)||0);
    return Math.floor(days/30);
  }
  if(a.estimatedAge){
    const n=parseFloat(a.estimatedAge);
    if(!isNaN(n)){
      if(a.estimatedAge.includes("ماه"))return n;
      return n*12; // سال به ماه
    }
  }
  return null;
};

// آخرین وزن
const lastWeight=a=>a.weights?.at(-1)?.weight||null;

// آبستن بودن
const isPregnant=a=>(a.reproductions||[]).some(r=>r.result==="در انتظار");

// روزهای بعد از آخرین زایمان
const daysSinceLastBirth=a=>{
  const done=(a.reproductions||[]).filter(r=>r.result==="زنده"&&isDate(r.birthDate));
  if(!done.length)return null;
  const last=done[done.length-1];
  const d=daysFrom(last.birthDate);
  return d!==null?-d:null; // مثبت = روزهای گذشته
};

// ══════════════════════════════════════════════════════
// موتور امتیاز ژنتیکی
// ══════════════════════════════════════════════════════
const calcScore=a=>{
  if(a.type!=="میش")return null;
  // ژنوتیپ FecB (منبع: Davis et al. 1982)
  const gs=a.genotype==="BB"?100:a.genotype==="B+"?60:20;
  const done=(a.reproductions||[]).filter(r=>r.result==="زنده"&&r.lambCount);
  const avg=done.length>0?done.reduce((s,r)=>s+r.lambCount,0)/done.length:0;
  const rs=Math.min(100,avg*40);
  const ws=a.weights||[];let grow=50;
  if(ws.length>=2){const g=ws[ws.length-1].weight-ws[0].weight;grow=Math.min(100,Math.max(0,50+g*3));}
  const hs=Math.max(0,100-(a.treatments||[]).length*15);
  const total=Math.round(gs*0.4+rs*0.35+grow*0.15+hs*0.1);
  return{total,gs,rs:Math.round(rs),grow:Math.round(grow),hs,
    avg:avg.toFixed(1),seasons:done.length,
    grade:total>=80?"عالی":total>=60?"خوب":total>=40?"متوسط":"ضعیف",
    gc:total>=80?C.accent:total>=60?C.gold:total>=40?C.warn:C.danger};
};

// ══════════════════════════════════════════════════════
// موتور جفت‌گیری — علمی و اصلاح‌شده
// منابع: Wright 1922، ICAR 2023، FAO 2012، Davis 1982
// ══════════════════════════════════════════════════════
const calcMate=(ewe,ram,allAnimals)=>{
  const errors=[]; // موانع قطعی — جفت‌گیری مجاز نیست
  const warns=[]; // هشدار — با احتیاط
  const oks=[];   let score=0;
  let blocked=false;

  // ۱-الف) آبستن بودن (FAO 2012)
  if(isPregnant(ewe)){
    errors.push("🚫 این میش هم‌اکنون آبستن است — جفت‌گیری مجاز نیست");
    blocked=true;
  }

  // ۱-ب) همخونی مستقیم — پدر=قوچ (Wright 1922: F=25%)
  const eweFather=ewe.fatherCode?.trim();
  if(eweFather&&eweFather!=="-"&&eweFather!==""&&eweFather===ram.id){
    errors.push("🚫 همخونی مستقیم: این قوچ پدر این میش است (ضریب همخونی ۲۵٪ — خطر جدی برای سلامت بره‌ها)");
    blocked=true;
  }

  // ۱-ج) همخونی از طریق پدربزرگ — پدر قوچ = پدر میش (F=12.5%)
  const ramFather=ram.fatherCode?.trim();
  if(!blocked&&eweFather&&ramFather&&eweFather!=="-"&&ramFather!=="-"&&eweFather===ramFather&&eweFather!==""){
    errors.push("🚫 همخونی: هر دو از یک پدر هستند (ضریب همخونی ۱۲.۵٪ — مجاز نیست)");
    blocked=true;
  }

  // ۱-د) سن کمتر از ۱۲ ماه (ICAR 2023)
  const ageMo=ageInMonths(ewe);
  if(ageMo!==null&&ageMo<12){
    errors.push(`🚫 سن میش ${toP(ageMo)} ماه است — حداقل ۱۲ ماه لازم است`);
    blocked=true;
  }

  if(blocked){
    return{score:0,errors,warns,oks,blocked:true,
      verdict:"مجاز نیست",verdictColor:C.danger};
  }

  const daysSince=daysSinceLastBirth(ewe);
  if(daysSince!==null&&daysSince<45){
    warns.push(`⚠️ ${toP(daysSince)} روز از آخرین زایمان گذشته — حداقل ۴۵ روز فاصله لازم است (رحم هنوز بازنگشته)`);
    score-=30;
  }else if(daysSince===null&&(ewe.reproductions||[]).length===0){
    oks.push("✅ تلیسه (اولین جفت‌گیری)");
    score+=10;
  }else{
    oks.push(`✅ ${toP(daysSince||0)} روز از آخرین زایمان گذشته — رحم بازگشته`);
    score+=15;
  }

  const lw=lastWeight(ewe)||0;
  const ADULT_WEIGHT=70; // وزن بالغ قزل افشار

  if(ageMo!==null&&ageMo<18){
    // ۱۲-۱۸ ماه: وزن مهم‌تر از سن
    if(lw>=ADULT_WEIGHT*0.65){ // ۶۵٪ وزن بالغ = ~۴۵ کیلو
      oks.push(`✅ سن ${toP(ageMo)} ماه با وزن ${toP(lw)} کیلو — مجاز (بالاتر از ۶۵٪ وزن بالغ)`);
      score+=15;
    }else if(lw>=ADULT_WEIGHT*0.55){
      warns.push(`⚠️ سن ${toP(ageMo)} ماه، وزن ${toP(lw)} کیلو — پرتغذیه‌کردن (فلاشینگ) ۳ هفته قبل توصیه میشه`);
      score+=5;
    }else{
      warns.push(`⚠️ سن ${toP(ageMo)} ماه، وزن ${toP(lw)} کیلو — زیر حد مطلوب. صبر کنید تا وزن به ۴۵ کیلو برسد`);
      score-=15;
    }
  }else if(ageMo!==null&&ageMo>=18){
    if(lw>=55){oks.push(`✅ سن و وزن ایده‌آل (${toP(ageMo)} ماه، ${toP(lw)} کیلو)`);score+=20;}
    else if(lw>=45){oks.push(`✅ سن مناسب (${toP(ageMo)} ماه)، وزن قابل قبول`);score+=12;}
    else{warns.push(`⚠️ وزن ${toP(lw)} کیلو پایین است — پرتغذیه‌کردن (فلاشینگ) ۳ هفته قبل انجام دهید`);score+=5;}
  }else{
      if(lw>=55){oks.push(`✅ وزن ${toP(lw)} کیلو — مناسب`);score+=15;}
    else if(lw>=45){warns.push(`⚠️ وزن ${toP(lw)} کیلو — پرتغذیه‌کردن توصیه میشه`);score+=5;}
    else if(lw>0){warns.push(`⚠️ وزن ${toP(lw)} کیلو — کم است`);score-=5;}
    else{warns.push("⚠️ وزن ثبت نشده — قبل از جفت‌گیری وزن‌کشی کنید");score-=10;}
  }

  if(ewe.genotype==="BB"&&ram.genotype==="BB"){
    score+=40;
    oks.push("✅ هر دو BB — بیشترین احتمال چندقلوزایی در بره‌ها");
  }else if(ewe.genotype==="BB"||ram.genotype==="BB"){
    score+=25;
    oks.push("✅ یک والد BB — احتمال انتقال ژن پرباری به بره‌ها وجود دارد");
  }else if(ewe.genotype==="B+"&&ram.genotype==="B+"){
    score+=15;
    warns.push("⚠️ هر دو B+ — احتمال BB در بره‌ها ۲۵٪ است");
  }else{
    score+=5;
    warns.push("⚠️ یک یا هر دو ++ — انتقال ژن FecB به بره‌ها کم است");
  }

  const sc=calcScore(ewe);
  if(sc&&sc.seasons>=2&&+sc.avg>=2.5){
    score+=20;oks.push(`✅ عالی: میانگین ${sc.avg} بره در ${toP(sc.seasons)} زایمان قبلی`);
  }else if(sc&&sc.seasons>=1&&+sc.avg>=1.5){
    score+=12;oks.push(`✅ خوب: میانگین ${sc.avg} بره در ${toP(sc.seasons)} زایمان`);
  }else if(sc&&sc.seasons===0){
    score+=8;oks.push("✅ تلیسه — سابقه‌ای برای قضاوت نیست");
  }else if(sc&&sc.seasons>=2){
    warns.push(`⚠️ میانگین ${sc.avg} بره — پایین‌تر از انتظار برای قزل افشار BB`);
  }

  const treats=ewe.treatments||[];
  const recentIll=treats.filter(t=>{const d=daysFrom(t.date);return d!==null&&d>-90;});
  if(recentIll.length>0){
    warns.push(`⚠️ ${toP(recentIll.length)} بیماری/درمان در ۳ ماه اخیر — نظر دامپزشک قبل از جفت‌گیری`);
    score-=15;
  }else if(treats.length===0){
    oks.push("✅ سابقه بیماری ندارد");score+=5;
  }

  if(!ewe.hasFecBTest){
    warns.push("⚠️ آزمایش ژنتیک (FecB) این میش انجام نشده — ژنوتیپ دقیق نامشخص است");
    score-=10;
  }
  if(!ram.hasFecBTest){
    warns.push("⚠️ آزمایش ژنتیک (FecB) قوچ انجام نشده — ژنوتیپ دقیق نامشخص است");
    score-=10;
  }

  if(!warns.some(w=>w.includes("فلاشینگ"))&&lw>0&&lw<60){
    oks.push("💡 پرتغذیه‌کردن (فلاشینگ): ۳ هفته قبل از جفت‌گیری، روزانه ۲۵۰ گرم جو اضافه کنید");
  }

  const finalScore=Math.min(100,Math.max(0,score));
  const verdict=finalScore>=75?"توصیه میشه":finalScore>=50?"با احتیاط":finalScore>=25?"بررسی بیشتر لازم":"توصیه نمیشه";
  const verdictColor=finalScore>=75?C.accent:finalScore>=50?C.gold:finalScore>=25?C.warn:C.danger;

  return{score:finalScore,errors,warns,oks,blocked:false,verdict,verdictColor};
};

// ══ موتور حذف ══
const calcCull=a=>{
  const sc=calcScore(a);const{p}=calcFin(a);
  const reasons=[];let urgency=0;
  if(sc&&sc.seasons>=2&&+sc.avg<1.3){reasons.push(`میانگین ${sc.avg} بره در ${toP(sc.seasons)} زایمان — زیر استاندارد قزل افشار`);urgency+=3;}
  if(p<-50000000){reasons.push(`زیان‌ده: ${fmtM(p)} ریال`);urgency+=2;}
  if(!a.hasFecBTest){reasons.push("بدون آزمایش ژنتیک (FecB) — ژنوتیپ نامشخص");urgency+=1;}
  if(sc&&sc.hs<40){reasons.push(`امتیاز سلامت پایین (${toP(sc.hs)} از ۱۰۰)`);urgency+=2;}
  const ageMo=ageInMonths(a);
  if(ageMo&&ageMo>=48&&sc&&sc.seasons===0){reasons.push(`${toP(ageMo)} ماه سن، هنوز زایمان نکرده`);urgency+=2;}
  if(a.genotype==="++"&&sc&&sc.seasons>=2&&+sc.avg<1.2){reasons.push("ژنوتیپ ++ با عملکرد ضعیف");urgency+=1;}
  return{reasons,urgency};
};

// ══ داده نمونه ══
const SAMPLE=[
  {id:"VRG-001",rfid:"982000411234567",name:"ستاره",type:"میش",genotype:"BB",
  color:"سفید با خال قهوه‌ای",birthDate:"1402/03/15",estimatedAge:"۲ سال",teethStatus:"شیری",
  entryWeight:62,entryDate:"1402/06/01",entryType:"خرید",seller:"مرکز اصلاح‌نژاد زنجان",
  originProvince:"زنجان",purchasePrice:120000000,motherCode:"-",fatherCode:"-",
  hasFecBTest:true,fecBLab:"آزمایشگاه مرجع دانشگاه تهران",fecBDate:"1402/05/20",
  hasUltrasound:true,hasHealthCert:true,hasVaccCard:true,hasPreviousID:false,
  costs:[{id:"c1",date:"1402/06/01",category:"خرید دام",amount:120000000,note:""},{id:"c2",date:"1403/06/01",category:"خوراک",amount:4000000,note:""}],
  revenues:[{id:"r1",date:"1403/03/01",category:"فروش بره",amount:18000000,note:""}],
  quickNotes:[{id:"n1",date:"1403/09/01",note:"بی‌اشتهایی جزئی — تحت نظر"}],
  vaccines:[{id:"v1",name:"آبله گوسفند",lastDate:"1403/07/10",nextDate:"1404/07/10",vet:"دکتر رضایی"},{id:"v2",name:"تب برفکی",lastDate:"1403/06/15",nextDate:"1403/12/15",vet:"دکتر رضایی"}],
  reproductions:[{id:"r1",season:1,matingDate:"1402/07/20",birthDate:"1402/12/25",lambCount:2,birthType:"طبیعی",result:"زنده",notes:"دوقلو",ramCode:"VRG-Q01",expectedBirthDate:"1402/12/22"},
  {id:"r2",season:2,matingDate:"1403/07/15",birthDate:null,lambCount:null,birthType:null,result:"در انتظار",notes:"",ramCode:"VRG-Q01",expectedBirthDate:"1403/12/12"}],
  weights:[{id:"w1",date:"1402/06/01",weight:62,physStatus:"ورود",note:""},{id:"w2",date:"1402/09/01",weight:65,physStatus:"نرمال",note:""},{id:"w3",date:"1403/06/01",weight:67,physStatus:"نرمال",note:""}],
  treatments:[{id:"t1",date:"1402/09/15",event:"ضدانگل",drug:"آلبندازول",vet:"دکتر رضایی",result:"موفق"}],
  status:"در گله",createdAt:new Date().toISOString()},

  {id:"VRG-002",rfid:"982000411234568",name:"لاله",type:"میش",genotype:"BB",
  color:"سفید",birthDate:"1401/08/10",estimatedAge:"۳ سال",teethStatus:"دایمی ۲ دندان",
  entryWeight:68,entryDate:"1402/06/01",entryType:"خرید",seller:"مرکز اصلاح‌نژاد زنجان",
  originProvince:"زنجان",purchasePrice:130000000,motherCode:"-",fatherCode:"-",
  hasFecBTest:true,fecBLab:"آزمایشگاه مرجع دانشگاه تهران",fecBDate:"1402/05/20",
  hasUltrasound:true,hasHealthCert:true,hasVaccCard:true,hasPreviousID:false,
  costs:[{id:"c1",date:"1402/06/01",category:"خرید دام",amount:130000000,note:""},{id:"c2",date:"1403/06/01",category:"خوراک",amount:4000000,note:""}],
  revenues:[{id:"r1",date:"1403/03/05",category:"فروش بره",amount:28000000,note:""}],
  quickNotes:[],
  vaccines:[{id:"v1",name:"آبله گوسفند",lastDate:"1403/07/10",nextDate:"1404/07/10",vet:"دکتر رضایی"}],
  reproductions:[{id:"r1",season:1,matingDate:"1402/07/20",birthDate:"1402/12/28",lambCount:3,birthType:"طبیعی",result:"زنده",notes:"سه‌قلو",ramCode:"VRG-Q01",expectedBirthDate:"1402/12/22"},
  {id:"r2",season:2,matingDate:"1403/08/01",birthDate:null,lambCount:null,birthType:null,result:"در انتظار",notes:"",ramCode:"VRG-Q01",expectedBirthDate:"1403/12/29"}],
  weights:[{id:"w1",date:"1402/06/01",weight:68,physStatus:"ورود",note:""},{id:"w2",date:"1403/06/01",weight:72,physStatus:"نرمال",note:""}],
  treatments:[],status:"در گله",createdAt:new Date().toISOString()},

  {id:"VRG-003",rfid:"982000411234570",name:"گلنار",type:"میش",genotype:"B+",
  color:"سفید با خال خاکستری",birthDate:"1400/05/20",estimatedAge:"۴ سال",teethStatus:"دایمی ۴ دندان",
  entryWeight:58,entryDate:"1402/06/01",entryType:"خرید",seller:"دامداری محلی",
  originProvince:"ایلام",purchasePrice:80000000,motherCode:"-",fatherCode:"-",
  hasFecBTest:false,fecBLab:"",fecBDate:"",hasUltrasound:false,hasHealthCert:true,hasVaccCard:true,hasPreviousID:false,
  costs:[{id:"c1",date:"1402/06/01",category:"خرید دام",amount:80000000,note:""},{id:"c2",date:"1403/06/01",category:"خوراک",amount:4000000,note:""}],
  revenues:[{id:"r1",date:"1403/01/01",category:"فروش بره",amount:7000000,note:""},{id:"r2",date:"1403/07/01",category:"فروش بره",amount:7000000,note:""}],
  quickNotes:[],
  vaccines:[{id:"v1",name:"آبله گوسفند",lastDate:"1403/07/10",nextDate:"1404/07/10",vet:"دکتر رضایی"}],
  reproductions:[{id:"r1",season:1,matingDate:"1402/07/20",birthDate:"1402/12/20",lambCount:1,birthType:"طبیعی",result:"زنده",notes:"",ramCode:"VRG-Q01",expectedBirthDate:"1402/12/17"},
  {id:"r2",season:2,matingDate:"1403/01/10",birthDate:"1403/06/05",lambCount:1,birthType:"طبیعی",result:"زنده",notes:"",ramCode:"VRG-Q01",expectedBirthDate:"1403/06/09"}],
  weights:[{id:"w1",date:"1402/06/01",weight:58,physStatus:"ورود",note:""},{id:"w2",date:"1403/06/01",weight:59,physStatus:"نرمال",note:""}],
  treatments:[{id:"t1",date:"1403/03/01",event:"التهاب سم",drug:"آنتی‌بیوتیک",vet:"دکتر رضایی",result:"بهبود کامل"}],
  status:"در گله",createdAt:new Date().toISOString()},

  {id:"VRG-Q01",rfid:"982000411234569",name:"شیر",type:"قوچ",genotype:"BB",
  color:"سفید با سر قهوه‌ای",birthDate:"1400/05/01",estimatedAge:"۴ سال",teethStatus:"دایمی ۴ دندان",
  entryWeight:85,entryDate:"1402/06/01",entryType:"خرید",seller:"مرکز اصلاح‌نژاد زنجان",
  originProvince:"زنجان",purchasePrice:200000000,motherCode:"-",fatherCode:"-",
  hasFecBTest:true,fecBLab:"آزمایشگاه مرجع دانشگاه تهران",fecBDate:"1402/05/20",
  hasUltrasound:false,hasHealthCert:true,hasVaccCard:true,hasPreviousID:true,
  costs:[{id:"c1",date:"1402/06/01",category:"خرید دام",amount:200000000,note:""}],revenues:[],quickNotes:[],
  vaccines:[{id:"v1",name:"آبله گوسفند",lastDate:"1403/07/10",nextDate:"1404/07/10",vet:"دکتر رضایی"}],
  reproductions:[],
  weights:[{id:"w1",date:"1402/06/01",weight:85,physStatus:"ورود",note:""},{id:"w2",date:"1403/06/01",weight:89,physStatus:"نرمال",note:""}],
  treatments:[],status:"در گله",createdAt:new Date().toISOString()},
];

// ══ کامپوننت‌های کوچک ══
const Bdg=({l,c=C.accent,sm})=>(
  <span style={{background:c+"22",color:c,border:`1px solid ${c}44`,borderRadius:6,
    padding:sm?"1px 7px":"3px 10px",fontSize:sm?10:11,fontWeight:700,whiteSpace:"nowrap"}}>{l}</span>
);
const Bar=({v,c,label})=>(
  <div style={{marginBottom:8}}>
    <div style={{display:"flex",justifyContent:"space-between",marginBottom:3}}>
      <span style={{fontSize:11,color:C.textDim}}>{label}</span>
      <span style={{fontSize:11,fontWeight:700,color:c}}>{toP(v)}</span>
    </div>
    <div style={{background:C.border,borderRadius:4,height:6}}>
      <div style={{background:c,borderRadius:4,height:6,width:`${v}%`,transition:"width 0.5s"}}/>
    </div>
  </div>
);
const WBar=({weights})=>{
  const d=weights.at(-1).weight-weights[0].weight;
  return(
    <div style={{marginTop:10,background:C.accentGlow,borderRadius:8,padding:"8px 14px",display:"flex",gap:20}}>
      <div><span style={{fontSize:11,color:C.textDim}}>تغییر کل: </span>
        <span style={{fontWeight:700,color:d>=0?C.accent:C.danger}}>{d>=0?"+":""}{toP(d)} کیلو</span></div>
      <div><span style={{fontSize:11,color:C.textDim}}>دفعات وزن‌کشی: </span>
        <span style={{fontWeight:700}}>{toP(weights.length)}</span></div>
    </div>
  );
};

// ══ فرم رکورد ══
const SubForm=({type,aid,animals,onSave,onClose})=>{
  const[fd,setFd]=useState({});
  const s=(k,v)=>setFd(p=>({...p,[k]:v}));
  const rams=animals.filter(a=>a.type==="قوچ"&&a.status==="در گله");
  useEffect(()=>{
    if(type==="repro"&&fd.matingDate&&isDate(fd.matingDate))
      setFd(p=>({...p,expDate:addDays(fd.matingDate,GD)}));
  },[fd.matingDate,type]);
  const inp={background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",
    color:C.text,fontFamily:"inherit",fontSize:14,width:"100%",outline:"none",boxSizing:"border-box"};
  const lbl={fontSize:11,color:C.textDim,marginBottom:4,display:"block",fontWeight:600};
  const F=(l,k,opts,ph,tp)=>(
    <div style={{marginBottom:10}}>
      <label style={lbl}>{l}</label>
      {opts?(<select value={fd[k]||""} onChange={e=>s(k,e.target.value)} style={inp}>
        <option value="">— انتخاب کنید —</option>{opts.map(o=><option key={o}>{o}</option>)}</select>)
      :(<input type={tp||"text"} value={fd[k]||""} placeholder={ph||""} onChange={e=>s(k,e.target.value)} style={inp}/>)}
    </div>
  );
  const ramOpts=rams.map(r=>r.id+(r.name?` — ${r.name}`:""));
  const titles={vaccine:"💉 ثبت واکسن",weight:"⚖️ ثبت وزن‌کشی",treat:"🩺 ثبت درمان",
    repro:"🐑 ثبت جفت‌گیری",cost:"💸 ثبت هزینه",rev:"💰 ثبت درآمد",note:"📝 یادداشت"};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",
      alignItems:"center",justifyContent:"center",zIndex:800,padding:14}}>
      <div style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:14,
        padding:22,width:"100%",maxWidth:420,maxHeight:"88vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontWeight:800,fontSize:16}}>{titles[type]}</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.textDim,fontSize:24,cursor:"pointer"}}>✕</button>
        </div>
        {type==="vaccine"&&<>{F("نوع واکسن *","name",["آبله گوسفند","آنتروتوکسمی ⚡الزامی","بروسلوز ⚡الزامی قانونی","تب برفکی ⚡الزامی قانونی","پاستورلوز","لپتوسپیروز"])}{F("تاریخ تزریق *","lastDate",null,"۱۴۰۳/۰۷/۱۰")}{F("تکرار بعدی","nextDate",null,"۱۴۰۴/۰۷/۱۰")}{F("نام دامپزشک","vet")}</>}
        {type==="weight"&&<>{F("تاریخ *","date",null,"۱۴۰۳/۰۹/۰۱")}{F("وزن (کیلوگرم) *","weight",null,"","number")}{F("وضعیت","physStatus",["ورود","نرمال","آبستن","شیردهی","بیمار","پس از زایمان"])}{F("یادداشت","note")}</>}
        {type==="treat"&&<>{F("تاریخ *","date",null,"۱۴۰۳/۰۱/۱۰")}{F("شرح رویداد *","event")}{F("داروی مصرفی","drug")}{F("نام دامپزشک","vet")}{F("نتیجه درمان","result",["موفق","بهبود کامل","در حال درمان","فوت شد"])}</>}
        {type==="repro"&&<>
          {F("تاریخ جفت‌گیری *","matingDate",null,"۱۴۰۳/۰۷/۲۰")}
          {ramOpts.length>0&&F("قوچ (پدر بره‌ها)","ramCode",ramOpts)}
          {fd.expDate&&<div style={{background:C.goldDim,borderRadius:8,padding:"10px 14px",marginBottom:10}}>
            <div style={{fontSize:11,color:C.gold,fontWeight:700}}>🗓️ تاریخ زایمان احتمالی (خودکار)</div>
            <div style={{fontWeight:800,fontSize:17}}>{fd.expDate}</div>
            <div style={{fontSize:11,color:C.textDim}}>({toP(GD)} روز دوره آبستنی)</div>
          </div>}
          {F("تاریخ زایمان واقعی","birthDate",null,"در صورت وقوع")}
          {F("تعداد بره متولد","lambCount",null,"","number")}
          {F("نوع زایمان","birthType",["طبیعی","کمک دستی","سزارین"])}
          {F("نتیجه","result",["در انتظار","زنده","مرده"])}
          {F("یادداشت","notes")}
        </>}
        {type==="cost"&&<>{F("تاریخ *","date")}{F("دسته هزینه *","category",["خرید دام","خوراک و علوفه","دارو و درمان","واکسیناسیون","حق‌الزحمه دامپزشک","حمل‌ونقل","آزمایشگاه","سایر"])}{F("مبلغ (ریال) *","amount",null,"","number")}{F("توضیح","note")}</>}
        {type==="rev"&&<>{F("تاریخ *","date")}{F("دسته درآمد *","category",["فروش بره","فروش میش مولد","فروش قوچ","فروش پشم","فروش کود","سایر"])}{F("مبلغ (ریال) *","amount",null,"","number")}{F("توضیح","note")}</>}
        {type==="note"&&<>
          <div style={{marginBottom:10}}>
            <label style={lbl}>متن یادداشت *</label>
            <textarea value={fd.note||""} onChange={e=>s("note",e.target.value)} rows={3}
              style={{...inp,resize:"vertical",lineHeight:1.6}}/>
          </div>
          {F("تاریخ","date",null,"۱۴۰۳/۰۹/۰۱")}
        </>}
        <div style={{display:"flex",gap:8,marginTop:14}}>
          <button onClick={onClose} style={{flex:1,background:C.surface,color:C.text,
            border:`1px solid ${C.border}`,borderRadius:8,padding:10,
            fontFamily:"inherit",fontWeight:700,cursor:"pointer"}}>انصراف</button>
          <button onClick={()=>onSave({...fd,id:uid(),
            weight:fd.weight?+fd.weight:undefined,
            lambCount:fd.lambCount?+fd.lambCount:undefined,
            amount:fd.amount?+fd.amount:undefined,
            expectedBirthDate:fd.expDate,
            date:fd.date||new Date().toLocaleDateString("fa-IR")})}
            style={{flex:2,background:C.accent,color:"#0B1610",border:"none",
              borderRadius:8,padding:10,fontFamily:"inherit",fontWeight:800,cursor:"pointer"}}>
            💾 ثبت
          </button>
        </div>
      </div>
    </div>
  );
};

// ══ کامپوننت اصلی ══
export default function VargehApp(){
  const [animals,setAnimals]=useState(()=>{
    try{const s=localStorage.getItem(SK);return s?JSON.parse(s):SAMPLE;}catch{return SAMPLE;}
  });
  const [page,setPage]=useState("dash");
  const [selId,setSelId]=useState(null);
  const [dtab,setDtab]=useState("info");
  const [rawQ,setRawQ]=useState("");
  const [q,setQ]=useState("");
  const [filt,setFilt]=useState("همه");
  const [addModal,setAddModal]=useState(null);
  const [analysisTab,setAnalysisTab]=useState("mate");
  const [selEwe,setSelEwe]=useState(null);
  const [delId,setDelId]=useState(null);
  const [toast,setToast]=useState(null);
  const [editName,setEditName]=useState(null); // {id, value}
  const qRef=useRef(null);
  const sel=animals.find(a=>a.id===selId)||null;

  useEffect(()=>{
    // Manifest
    const manifest={
      name:"وارگه — هسته اصلاح‌نژاد",short_name:"وارگه",
      description:"نرم‌افزار مدیریت هسته اصلاح‌نژاد قزل افشار",
      start_url:".",display:"standalone",
      background_color:"#0B1610",theme_color:"#5BBA6F",
      dir:"rtl",lang:"fa",
      icons:[{src:LOGO_192,sizes:"192x192",type:"image/png",purpose:"any maskable"},
             {src:LOGO_192,sizes:"512x512",type:"image/png",purpose:"any maskable"}]
    };
    const blob=new Blob([JSON.stringify(manifest)],{type:"application/json"});
    const mUrl=URL.createObjectURL(blob);
    let ml=document.querySelector("link[rel=manifest]");
    if(!ml){ml=document.createElement("link");ml.rel="manifest";document.head.appendChild(ml);}
    ml.href=mUrl;
    // Theme
    let mt=document.querySelector("meta[name=theme-color]");
    if(!mt){mt=document.createElement("meta");mt.name="theme-color";document.head.appendChild(mt);}
    mt.content="#5BBA6F";
    // Apple icon
    let al=document.querySelector("link[rel=apple-touch-icon]");
    if(!al){al=document.createElement("link");al.rel="apple-touch-icon";document.head.appendChild(al);}
    al.href=LOGO_192;
    // Title
    document.title="وارگه — هسته اصلاح‌نژاد";
  },[]);
  useEffect(()=>{try{localStorage.setItem(SK,JSON.stringify(animals));}catch{};},[animals]);
  useEffect(()=>{
    clearTimeout(qRef.current);
    qRef.current=setTimeout(()=>setQ(rawQ),260);
    return()=>clearTimeout(qRef.current);
  },[rawQ]);

  const toast_=(m,t="ok")=>{setToast({m,t});setTimeout(()=>setToast(null),2800);};

  const ewes=animals.filter(a=>a.type==="میش"&&a.status==="در گله");
  const rams=animals.filter(a=>a.type==="قوچ"&&a.status==="در گله");
  const birthCal=animals.filter(a=>a.status==="در گله").flatMap(a=>
    (a.reproductions||[]).filter(r=>r.result==="در انتظار"&&r.expectedBirthDate)
    .map(r=>({aid:a.id,aname:a.name||a.id,gen:a.genotype,
      date:r.expectedBirthDate,dl:daysFrom(r.expectedBirthDate),s:r.season}))
  ).sort((a,b)=>(a.dl||999)-(b.dl||999));
  const vaccAlerts=animals.flatMap(a=>(a.vaccines||[]).filter(v=>{
    const d=daysFrom(v.nextDate);return d!==null&&d<=14;
  }).map(v=>({aid:a.id,aname:a.name||a.id,vname:v.name,dl:daysFrom(v.nextDate)})));
  const totalC=animals.reduce((s,a)=>s+calcFin(a).c,0);
  const totalR=animals.reduce((s,a)=>s+calcFin(a).r,0);
  const filtered=animals.filter(a=>{
    const sq=q.toLowerCase();
    const ms=!sq||a.id.toLowerCase().includes(sq)||(a.name||"").includes(sq)||(a.rfid||"").includes(sq);
    const mf=filt==="همه"?true:["میش","قوچ","بره"].includes(filt)?a.type===filt:["BB","B+"].includes(filt)?a.genotype===filt:a.status===filt;
    return ms&&mf;
  });

  const delAnimal=id=>{setAnimals(p=>p.filter(a=>a.id!==id));setPage("dash");setDelId(null);toast_("دام حذف شد","warn");};
  const addSub=(aid,field,rec)=>{
    setAnimals(p=>p.map(a=>{
      if(a.id!==aid)return a;
      const arr=a[field]||[];
      const final=field==="reproductions"?{...rec,season:arr.length+1}:rec;
      return{...a,[field]:[...arr,final]};
    }));
    setAddModal(null);toast_("✓ ثبت شد");
  };
  const delSub=(aid,field,rid)=>{
    setAnimals(p=>p.map(a=>a.id!==aid?a:{...a,[field]:(a[field]||[]).filter(r=>r.id!==rid)}));
    toast_("حذف شد","warn");
  };
  const saveName=()=>{
    if(!editName)return;
    setAnimals(p=>p.map(a=>a.id===editName.id?{...a,name:editName.value}:a));
    setEditName(null);toast_("نام ذخیره شد");
  };

  const cs={background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16};
  const btnS=(v="p",sm)=>({
    background:v==="p"?C.accent:v==="d"?C.dangerDim:v==="g"?"transparent":C.surface,
    color:v==="p"?"#0B1610":v==="d"?C.danger:C.text,
    border:`1px solid ${v==="p"?C.accent:v==="d"?C.danger:C.border}`,
    borderRadius:8,padding:sm?"6px 12px":"9px 18px",fontFamily:"inherit",
    fontSize:sm?12:13,fontWeight:700,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:5});
  const inpS={background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,
    padding:"9px 12px",color:C.text,fontFamily:"inherit",fontSize:14,width:"100%",
    outline:"none",boxSizing:"border-box"};
  const lbl={fontSize:11,color:C.textDim,marginBottom:4,display:"block",fontWeight:600};
  const g2={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12};
  const g3={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10};
  const navs=[{v:"dash",i:"📊",l:"داشبورد"},{v:"list",i:"🐑",l:"گله"},
    {v:"cal",i:"🗓️",l:"تقویم"},{v:"fin",i:"💰",l:"مالی"},{v:"ai",i:"🧬",l:"تحلیل"}];

  const AddAnimal=({onClose})=>{
    const[fd,setFd]=useState({type:"میش",genotype:"BB",entryType:"خرید",status:"در گله"});
    const s=(k,v)=>setFd(p=>({...p,[k]:v}));
    const F=(l,k,opts,ph,tp)=>(
      <div>
        <label style={lbl}>{l}</label>
        {opts?(<select value={fd[k]||""} onChange={e=>s(k,e.target.value)} style={inpS}>
          <option value="">—</option>{opts.map(o=><option key={o}>{o}</option>)}</select>)
        :(<input type={tp||"text"} value={fd[k]||""} placeholder={ph||""}
            onChange={e=>s(k,e.target.value)} style={inpS}/>)}
      </div>
    );
    const save=()=>{
      if(!fd.id){alert("کد داخلی الزامی است");return;}
      if(animals.find(a=>a.id===fd.id)){alert("این کد قبلاً ثبت شده");return;}
      setAnimals(p=>[...p,{...fd,entryWeight:+fd.entryWeight||0,purchasePrice:+fd.purchasePrice||0,
        costs:[],revenues:[],quickNotes:[],vaccines:[],reproductions:[],weights:[],treatments:[],
        createdAt:new Date().toISOString()}]);
      onClose();toast_("✓ دام ثبت شد");
    };
    return(
      <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",
        alignItems:"center",justifyContent:"center",zIndex:900,padding:14}}>
        <div style={{...cs,width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontWeight:800,fontSize:16}}>➕ ثبت دام جدید</div>
            <button onClick={onClose} style={{background:"none",border:"none",color:C.textDim,fontSize:24,cursor:"pointer"}}>✕</button>
          </div>
          <div style={g2}>
            {F("کد داخلی گله *","id",null,`VRG-${String(animals.length+1).padStart(3,"0")}`)}
            {F("شناسه الکترونیکی گوشواره (RFID)","rfid",null,"982000...")}
            {F("نام دام","name",null,"مثال: ستاره")}
            {F("نوع دام *","type",["میش","قوچ","بره"])}
            {F("ترکیب ژنی / ژنوتیپ (FecB)","genotype",["BB — دو نسخه ژن","B+ — یک نسخه ژن","++ — بدون ژن"])}
            {F("رنگ پشم","color")}
            {F("تاریخ تولد","birthDate",null,"۱۴۰۲/۰۳/۱۵")}
            {F("سن تخمینی","estimatedAge",null,"مثال: ۲ سال یا ۱۸ ماه")}
            {F("تاریخ ورود به گله","entryDate",null,"۱۴۰۲/۰۶/۰۱")}
            {F("نحوه ورود","entryType",["خرید","تولد در گله","هدیه","سایر"])}
            {F("وزن هنگام ورود (کیلوگرم)","entryWeight",null,"","number")}
            {F("قیمت خرید (ریال)","purchasePrice",null,"","number")}
            {F("نام فروشنده یا مرکز مبدأ","seller")}
            {F("استان مبدأ","originProvince",["ایلام","زنجان","تهران","اصفهان","آذربایجان شرقی","سایر"])}
            {F("کد پدر (برای بررسی همخونی)","fatherCode",null,"— یا VRG-Q01")}
            {F("کد مادر","motherCode",null,"— یا VRG-001")}
          </div>
          <div style={{background:C.goldDim,borderRadius:8,padding:"10px 14px",margin:"14px 0",fontSize:12,color:C.textMid}}>
            💡 <strong style={{color:C.gold}}>نکته مهم:</strong> کد پدر را حتماً وارد کنید — برای جلوگیری از همخونی ضروری است.
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={onClose} style={{flex:1,background:C.surface,color:C.text,
              border:`1px solid ${C.border}`,borderRadius:8,padding:12,
              fontFamily:"inherit",fontWeight:700,cursor:"pointer",fontSize:14}}>انصراف</button>
            <button onClick={save} style={{flex:2,background:C.accent,color:"#0B1610",border:"none",
              borderRadius:8,padding:12,fontFamily:"inherit",fontWeight:800,cursor:"pointer",fontSize:14}}>
              💾 ثبت دام
            </button>
          </div>
        </div>
      </div>
    );
  };

  return(
    <div style={{fontFamily:"'Vazirmatn',sans-serif",direction:"rtl",background:C.bg,
      minHeight:"100vh",color:C.text,fontSize:14,paddingBottom:62}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#263D2C;border-radius:2px;}
        input::placeholder,textarea::placeholder{color:#4E6B56;}
        select option{background:#142019;}
        button:active{opacity:0.8;}
        @keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}
      `}</style>

      {/* هدر */}
      <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,
        padding:"0 14px",height:52,display:"flex",alignItems:"center",
        justifyContent:"space-between",position:"sticky",top:0,zIndex:200}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {!navs.find(n=>n.v===page)&&
            <button onClick={()=>setPage(selId?"list":"dash")}
              style={{...btnS("g"),padding:"5px 10px",fontSize:20}}>→</button>}
          <img src={LOGO_SMALL} style={{width:34,height:34,borderRadius:8,objectFit:"cover"}} alt="وارگه"/>
          <div>
            <div style={{fontWeight:800,color:C.accent,fontSize:14}}>وارگه</div>
            <div style={{fontSize:9,color:C.textDim}}>هسته اصلاح‌نژاد قزل افشار</div>
          </div>
          {vaccAlerts.filter(v=>v.dl<=0).length>0&&
            <Bdg l={`💉 ${toP(vaccAlerts.filter(v=>v.dl<=0).length)} واکسن سررسیده`} c={C.danger} sm/>}
          {birthCal.filter(e=>e.dl!==null&&e.dl<=7).length>0&&
            <Bdg l={`🐣 زایمان نزدیک`} c={C.gold} sm/>}
        </div>
        <div style={{display:"flex",gap:6}}>
          {page==="list"&&<button onClick={()=>setAddModal("animal")} style={btnS("p",true)}>+ ثبت دام</button>}
          {page==="detail"&&sel&&<button onClick={()=>setDelId(sel.id)} style={btnS("d",true)}>🗑️ حذف</button>}
        </div>
      </div>

      {/* داشبورد */}
      {page==="dash"&&(
        <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:8,marginBottom:14}}>
            {[{l:"کل دام",v:animals.filter(a=>a.status==="در گله").length,c:C.accent,i:"🐑"},
              {l:"میش مولد",v:ewes.length,c:C.info,i:"♀"},
              {l:"قوچ",v:rams.length,c:C.gold,i:"♂"},
              {l:"بره متولد",v:animals.flatMap(a=>a.reproductions||[]).filter(r=>r.result==="زنده").reduce((s,r)=>s+(r.lambCount||0),0),c:C.accent,i:"🐣"}
            ].map(it=>(
              <div key={it.l} style={{background:C.card,border:`1px solid ${it.c}33`,
                borderRadius:12,padding:"12px 6px",textAlign:"center"}}>
                <div style={{fontSize:20}}>{it.i}</div>
                <div style={{fontSize:24,fontWeight:800,color:it.c,lineHeight:1.2}}>{toP(it.v)}</div>
                <div style={{fontSize:10,color:C.textDim,marginTop:2}}>{it.l}</div>
              </div>
            ))}
          </div>

          {/* هشدارهای فوری */}
          {vaccAlerts.filter(v=>v.dl<=0).length>0&&(
            <div style={{...cs,marginBottom:12,borderColor:C.danger+"66",borderWidth:2,
              background:`linear-gradient(135deg,${C.card},${C.dangerDim})`}}>
              <div style={{fontWeight:800,color:C.danger,marginBottom:10,fontSize:14}}>
                🚨 واکسن‌های سررسیده — اقدام فوری لازم است
              </div>
              {vaccAlerts.filter(v=>v.dl<=0).map((al,i)=>(
                <div key={i} onClick={()=>{setSelId(al.aid);setPage("detail");}}
                  style={{display:"flex",justifyContent:"space-between",padding:"8px 0",
                    borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}>
                  <span style={{fontWeight:700,color:C.accent}}>{al.aname}</span>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{fontSize:12,color:C.textMid}}>{al.vname}</span>
                    <Bdg l="سررسیده!" c={C.danger} sm/>
                  </div>
                </div>
              ))}
            </div>
          )}

          {birthCal.filter(e=>e.dl!==null&&e.dl<=14).length>0&&(
            <div style={{...cs,marginBottom:12,borderColor:C.gold+"55"}}>
              <div style={{fontWeight:700,color:C.gold,marginBottom:10,fontSize:13}}>🐣 زایمان‌های نزدیک (کمتر از ۱۴ روز)</div>
              {birthCal.filter(e=>e.dl!==null&&e.dl<=14).map(e=>(
                <div key={e.aid+e.s} onClick={()=>{setSelId(e.aid);setPage("detail");}}
                  style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                    padding:"9px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}>
                  <div><span style={{fontWeight:700,color:C.accent}}>{e.aname}</span>
                    <span style={{color:C.textMid,fontSize:12,marginRight:6}}>شکم {toP(e.s)}</span></div>
                  <div style={{fontWeight:800,fontSize:15,color:e.dl<=7?C.danger:C.gold}}>
                    {e.dl===0?"امروز!":`${toP(e.dl)} روز`}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{...cs,borderColor:C.purple+"33"}}>
            <div style={{fontWeight:700,color:C.purple,marginBottom:10,fontSize:13}}>🧬 خلاصه امتیاز ژنتیکی میش‌ها</div>
            {ewes.length===0&&<div style={{color:C.textDim,fontSize:12}}>هنوز میشی ثبت نشده</div>}
            {[...ewes].map(e=>({e,sc:calcScore(e)})).sort((a,b)=>(b.sc?.total||0)-(a.sc?.total||0))
              .map(({e,sc},i)=>sc&&(
              <div key={e.id} style={{display:"flex",alignItems:"center",gap:8,
                padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{fontSize:16}}>{i===0?"🥇":i===1?"🥈":"🥉"}</span>
                <span style={{fontWeight:700,flex:1}}>{e.name||e.id}</span>
                <div style={{width:70,background:C.border,borderRadius:4,height:5}}>
                  <div style={{background:sc.gc,borderRadius:4,height:5,width:`${sc.total}%`}}/>
                </div>
                <span style={{fontWeight:800,color:sc.gc,minWidth:26,fontSize:13}}>{toP(sc.total)}</span>
                <Bdg l={sc.grade} c={sc.gc} sm/>
              </div>
            ))}
            <button onClick={()=>setPage("ai")} style={{...btnS("g",true),
              marginTop:10,color:C.purple,border:`1px solid ${C.purple}44`}}>
              مشاهده تحلیل کامل ›
            </button>
          </div>
        </div>
      )}

      {/* لیست */}
      {page==="list"&&(
        <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
            <input placeholder="🔍 جستجو با کد، نام یا شناسه..." value={rawQ}
              onChange={e=>setRawQ(e.target.value)} style={{...inpS,flex:1,minWidth:150}}/>
            <select value={filt} onChange={e=>setFilt(e.target.value)} style={{...inpS,width:120}}>
              {["همه","میش","قوچ","بره","BB","B+","در گله","فروش","تلف"].map(f=><option key={f}>{f}</option>)}
            </select>
          </div>
          <div style={{...cs,padding:0,overflow:"hidden"}}>
            <div style={{background:C.surface,padding:"9px 14px",fontSize:11,color:C.textDim,
              fontWeight:700,borderBottom:`1px solid ${C.border}`,
              display:"grid",gridTemplateColumns:"1fr 90px 65px 70px 30px",gap:6}}>
              <span>دام</span><span>ژنوتیپ</span><span>وزن</span><span>وضعیت</span><span></span>
            </div>
            {filtered.length===0&&<div style={{padding:40,textAlign:"center",color:C.textDim}}>
              <div style={{fontSize:40}}>🐑</div>دامی یافت نشد
            </div>}
            {filtered.map((a,i)=>{
              const lw=a.weights?.at(-1)?.weight;
              const sc=calcScore(a);
              return(
                <div key={a.id} onClick={()=>{setSelId(a.id);setDtab("info");setPage("detail");}}
                  style={{display:"grid",gridTemplateColumns:"1fr 90px 65px 70px 30px",
                    gap:6,padding:"10px 14px",borderBottom:`1px solid ${C.border}`,
                    cursor:"pointer",background:i%2===1?C.surface+"44":"transparent",alignItems:"center"}}
                  onMouseEnter={e=>e.currentTarget.style.background=C.accentGlow}
                  onMouseLeave={e=>e.currentTarget.style.background=i%2===1?C.surface+"44":"transparent"}>
                  <div>
                    <div style={{fontWeight:700,color:C.accent,fontSize:13}}>
                      {a.id}{a.name?` — ${a.name}`:""}
                    </div>
                    <div style={{display:"flex",gap:4,marginTop:2,flexWrap:"wrap"}}>
                      <span style={{fontSize:10,color:C.textMid}}>{a.type}</span>
                      {a.hasFecBTest&&<Bdg l="ژنتیک ✓" c={C.accent} sm/>}
                      {sc&&<Bdg l={`${toP(sc.total)}pt`} c={sc.gc} sm/>}
                      {isPregnant(a)&&<Bdg l="آبستن" c={C.gold} sm/>}
                      {vaccAlerts.find(v=>v.aid===a.id)&&<Bdg l="💉!" c={C.danger} sm/>}
                    </div>
                  </div>
                  <Bdg l={a.genotype?.split(" ")[0]||a.genotype} c={gC(a.genotype?.split(" ")[0]||a.genotype)} sm/>
                  <div style={{fontWeight:700,color:lw?C.text:C.textDim,fontSize:12}}>
                    {lw?`${toP(lw)}kg`:"—"}
                  </div>
                  <Bdg l={a.status} c={sC(a.status)} sm/>
                  <div style={{color:C.textDim,fontSize:16,textAlign:"center"}}>›</div>
                </div>
              );
            })}
          </div>
          <div style={{marginTop:8,fontSize:11,color:C.textDim}}>
            {toP(filtered.length)} از {toP(animals.length)} دام
          </div>
        </div>
      )}

      {/* تقویم */}
      {page==="cal"&&(
        <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
          <div style={{fontWeight:800,fontSize:17,marginBottom:14,color:C.accent}}>🗓️ تقویم زایمان</div>
          {birthCal.length===0&&<div style={{...cs,textAlign:"center",padding:40,color:C.textDim}}>
            <div style={{fontSize:40}}>🐑</div>هیچ میش آبستنی ثبت نشده
          </div>}
          {birthCal.map(e=>(
            <div key={e.aid+e.s} onClick={()=>{setSelId(e.aid);setPage("detail");}}
              style={{...cs,marginBottom:10,cursor:"pointer",
                borderColor:e.dl!==null&&e.dl<=7?C.danger+"66":e.dl!==null&&e.dl<=21?C.gold+"55":C.border,
                borderWidth:e.dl!==null&&e.dl<=7?2:1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
                <div>
                  <div style={{fontWeight:800,fontSize:14,color:C.accent}}>{e.aname}</div>
                  <div style={{color:C.textMid,fontSize:12,marginTop:3}}>
                    شکم {toP(e.s)} · <Bdg l={e.gen} c={gC(e.gen)} sm/>
                  </div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:26,fontWeight:800,
                    color:e.dl!==null&&e.dl<=7?C.danger:e.dl!==null&&e.dl<=21?C.gold:C.textMid}}>
                    {e.dl===null?"—":e.dl===0?"امروز!":e.dl<0?`${toP(Math.abs(e.dl))} روز گذشت`:`${toP(e.dl)} روز`}
                  </div>
                  <div style={{fontSize:11,color:C.textDim}}>{e.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* مالی */}
      {page==="fin"&&(
        <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
          <div style={{fontWeight:800,fontSize:17,marginBottom:14,color:C.accent}}>💰 گزارش مالی</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:14}}>
            {[{l:"جمع هزینه‌ها",v:totalC,c:C.danger},{l:"جمع درآمدها",v:totalR,c:C.accent},
              {l:"سود / زیان",v:totalR-totalC,c:totalR-totalC>=0?C.accent:C.danger}].map(it=>(
              <div key={it.l} style={{background:C.card,border:`1px solid ${it.c}33`,borderRadius:12,padding:14,textAlign:"center"}}>
                <div style={{fontSize:11,color:C.textDim,marginBottom:5}}>{it.l}</div>
                <div style={{fontSize:14,fontWeight:800,color:it.c}}>{fmtRial(it.v)}</div>
              </div>
            ))}
          </div>
          <div style={cs}>
            {animals.map(a=>{const{c,r,p}=calcFin(a);return(
              <div key={a.id} onClick={()=>{setSelId(a.id);setPage("detail");}}
                style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"10px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer",flexWrap:"wrap",gap:6}}>
                <div>
                  <div style={{fontWeight:700,color:C.accent}}>{a.name||a.id}</div>
                  <div style={{fontSize:11,color:C.textMid}}>{a.type} · {a.genotype}</div>
                </div>
                <div style={{display:"flex",gap:12}}>
                  {[{v:c,c:C.danger,l:"هزینه"},{v:r,c:C.accent,l:"درآمد"},{v:p,c:p>=0?C.accent:C.danger,l:"سود/زیان"}].map(it=>(
                    <div key={it.l} style={{textAlign:"center"}}>
                      <div style={{fontSize:11,fontWeight:700,color:it.c}}>{fmtM(it.v)}</div>
                      <div style={{fontSize:9,color:C.textDim}}>{it.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            );})}
          </div>
        </div>
      )}

      {/* جزئیات دام */}
      {page==="detail"&&sel&&(()=>{
        const a=sel;const lw=a.weights?.at(-1);const{c:tc,r:tr,p:tp}=calcFin(a);
        const tabs=["info","docs","vacc","repro","weight","treat","cost","rev","fin","note"];
        const tl={info:"هویت",docs:"مدارک",vacc:"واکسن",repro:"زایمان",
          weight:"وزن‌کشی",treat:"درمان",cost:"هزینه",rev:"درآمد",fin:"مالی",note:"یادداشت"};
        const subMap={vacc:"vaccine",weight:"weight",treat:"treat",repro:"repro",cost:"cost",rev:"rev",note:"note"};
        const fieldMap={vaccine:"vaccines",weight:"weights",treat:"treatments",repro:"reproductions",cost:"costs",rev:"revenues",note:"quickNotes"};
        return(
          <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
            {/* کارت سرصفحه */}
            <div style={{...cs,marginBottom:12,background:`linear-gradient(135deg,${C.card},${C.surface})`,borderColor:C.accent+"33"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{width:50,height:50,background:C.accentGlow,borderRadius:12,
                    border:`2px solid ${C.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>
                    {a.type==="قوچ"?"🐏":a.type==="بره"?"🐣":"🐑"}
                  </div>
                  <div>
                    {/* ویرایش نام */}
                    {editName?.id===a.id?(
                      <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:4}}>
                        <input value={editName.value} onChange={e=>setEditName(p=>({...p,value:e.target.value}))}
                          onKeyDown={e=>{if(e.key==="Enter")saveName();if(e.key==="Escape")setEditName(null);}}
                          style={{background:C.surface,border:`1px solid ${C.accent}`,borderRadius:6,
                            padding:"4px 8px",color:C.text,fontFamily:"inherit",fontSize:16,fontWeight:800,width:140}}
                          autoFocus/>
                        <button onClick={saveName} style={{background:C.accent,color:"#0B1610",border:"none",
                          borderRadius:6,padding:"4px 10px",fontFamily:"inherit",fontWeight:700,cursor:"pointer",fontSize:12}}>✓</button>
                        <button onClick={()=>setEditName(null)} style={{background:"none",border:`1px solid ${C.border}`,
                          borderRadius:6,padding:"4px 8px",color:C.textDim,fontFamily:"inherit",cursor:"pointer",fontSize:12}}>✕</button>
                      </div>
                    ):(
                      <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:4}}>
                        <div style={{fontSize:18,fontWeight:800}}>{a.name||a.id}</div>
                        <button onClick={()=>setEditName({id:a.id,value:a.name||""})}
                          title="تغییر نام"
                          style={{background:"none",border:`1px solid ${C.border}`,borderRadius:6,
                            padding:"2px 8px",color:C.textDim,fontFamily:"inherit",cursor:"pointer",fontSize:11}}>
                          ✏️ تغییر نام
                        </button>
                      </div>
                    )}
                    <div style={{color:C.textMid,fontSize:12}}>{a.id} · {a.type} · {a.estimatedAge||"—"}</div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:5}}>
                      <Bdg l={a.genotype?.split(" ")[0]||a.genotype} c={gC(a.genotype?.split(" ")[0]||a.genotype)} sm/>
                      <Bdg l={a.status} c={sC(a.status)} sm/>
                      {a.hasFecBTest&&<Bdg l="ژنتیک ✓" c={C.accent} sm/>}
                      {isPregnant(a)&&<Bdg l="🤰 آبستن" c={C.gold} sm/>}
                      {(()=>{const sc=calcScore(a);return sc&&<Bdg l={`${toP(sc.total)}pt ${sc.grade}`} c={sc.gc} sm/>;})()}
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",gap:14}}>
                  {lw&&<div style={{textAlign:"center"}}>
                    <div style={{fontSize:22,fontWeight:800,color:C.accent}}>{toP(lw.weight)}</div>
                    <div style={{fontSize:10,color:C.textDim}}>کیلوگرم</div>
                  </div>}
                  <div style={{textAlign:"center"}}>
                    <div style={{fontSize:13,fontWeight:800,color:tp>=0?C.accent:C.danger}}>{fmtRial(tp)}</div>
                    <div style={{fontSize:10,color:C.textDim}}>سود/زیان</div>
                  </div>
                </div>
              </div>
            </div>

            {/* تب‌ها */}
            <div style={{display:"flex",gap:0,marginBottom:10,overflowX:"auto",
              paddingBottom:3,borderBottom:`1px solid ${C.border}`}}>
              {tabs.map(t=>(
                <button key={t} onClick={()=>setDtab(t)}
                  style={{background:"none",border:"none",
                    borderBottom:`3px solid ${dtab===t?C.accent:"transparent"}`,
                    color:dtab===t?C.accent:C.textMid,padding:"8px 11px",
                    fontFamily:"inherit",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>
                  {tl[t]}
                </button>
              ))}
            </div>

            {subMap[dtab]&&(
              <div style={{marginBottom:10,display:"flex",gap:8}}>
                <button onClick={()=>setAddModal(subMap[dtab])} style={btnS("p",true)}>
                  + افزودن {tl[dtab]}
                </button>
                {a.type==="میش"&&dtab==="repro"&&(
                  <button onClick={()=>{setSelEwe(a);setAnalysisTab("mate");setPage("ai");}}
                    style={{...btnS("g",true),color:C.purple,border:`1px solid ${C.purple}44`}}>
                    🧬 بررسی آمادگی جفت‌گیری
                  </button>
                )}
              </div>
            )}

            {dtab==="info"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={cs}>
                <div style={{fontSize:11,fontWeight:800,color:C.textDim,marginBottom:12,letterSpacing:"1px"}}>مشخصات هویتی</div>
                <div style={g2}>
                  {[["کد داخلی گله",a.id,C.accent],["شناسه الکترونیکی (RFID)",a.rfid],
                    ["نوع دام",a.type],["ترکیب ژنی (ژنوتیپ)",a.genotype?.split(" ")[0]||a.genotype,gC(a.genotype?.split(" ")[0]||a.genotype)],
                    ["رنگ پشم",a.color],["تاریخ تولد",a.birthDate],["سن",a.estimatedAge],["وضعیت دندان",a.teethStatus]
                  ].map(([l,v,ac])=>(
                    <div key={l}><div style={{fontSize:11,color:C.textDim,marginBottom:3,fontWeight:600}}>{l}</div>
                      <div style={{fontWeight:600,color:ac||C.text}}>{v||"—"}</div></div>
                  ))}
                </div>
              </div>
              <div style={cs}>
                <div style={{fontSize:11,fontWeight:800,color:C.textDim,marginBottom:12,letterSpacing:"1px"}}>اطلاعات ورود</div>
                <div style={g3}>
                  {[["تاریخ ورود",a.entryDate],["نحوه ورود",a.entryType],
                    ["وزن ورود (کیلوگرم)",a.entryWeight?`${toP(a.entryWeight)} کیلو`:null],
                    ["فروشنده",a.seller],["استان مبدأ",a.originProvince],
                    ["قیمت خرید",a.purchasePrice?toP(a.purchasePrice.toLocaleString())+" ریال":null]
                  ].map(([l,v])=>(
                    <div key={l}><div style={{fontSize:11,color:C.textDim,marginBottom:3,fontWeight:600}}>{l}</div>
                      <div style={{fontWeight:600}}>{v||"—"}</div></div>
                  ))}
                </div>
              </div>
              <div style={cs}>
                <div style={{fontSize:11,fontWeight:800,color:C.textDim,marginBottom:12,letterSpacing:"1px"}}>
                  نسب‌نامه — برای بررسی همخونی مهم است
                </div>
                <div style={g2}>
                  <div><div style={lbl}>کد پدر</div>
                    <div style={{fontWeight:600,color:C.gold}}>{a.fatherCode||"—"}
                      {!a.fatherCode||a.fatherCode==="-"?
                        <span style={{fontSize:11,color:C.danger,marginRight:8}}>⚠️ وارد نشده</span>:null}
                    </div>
                  </div>
                  <div><div style={lbl}>کد مادر</div>
                    <div style={{fontWeight:600,color:C.info}}>{a.motherCode||"—"}</div>
                  </div>
                </div>
              </div>
            </div>}

            {dtab==="docs"&&<div style={cs}>
              {[{l:"آزمایش ژنتیک (FecB)",v:a.hasFecBTest,ex:a.hasFecBTest?`${a.fecBLab||"—"} · ${a.fecBDate||"—"}`:null,req:true},
                {l:"سونوگرافی آبستنی",v:a.hasUltrasound},
                {l:"گواهی سلامت دامپزشکی",v:a.hasHealthCert,req:true},
                {l:"کارت واکسیناسیون",v:a.hasVaccCard,req:true},
                {l:"شناسنامه دام (قبلی)",v:a.hasPreviousID}
              ].map(it=>(
                <div key={it.l} style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                  <div>
                    <div style={{fontWeight:600}}>{it.l}
                      {it.req&&<span style={{fontSize:10,color:C.danger,marginRight:6}}>⚡ الزامی</span>}
                    </div>
                    {it.ex&&<div style={{fontSize:12,color:C.textDim,marginTop:2}}>{it.ex}</div>}
                  </div>
                  <Bdg l={it.v?"✓ دارد":"✗ ندارد"} c={it.v?C.accent:it.req?C.danger:C.textDim} sm/>
                </div>
              ))}
            </div>}

            {dtab==="vacc"&&<div style={cs}>
              <div style={{fontSize:11,color:C.textDim,marginBottom:12}}>
                ⚡ واکسن‌های الزامی قانونی: تب برفکی، بروسلوز، آنتروتوکسمی، آبله گوسفند
              </div>
              {(!a.vaccines?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.vaccines||[]).map(v=>{
                const dl=daysFrom(v.nextDate);
                const overdue=dl!==null&&dl<=0;
                return(
                  <div key={v.id} style={{padding:"10px 0",borderBottom:`1px solid ${C.border}`,
                    background:overdue?C.dangerDim+"44":"transparent",borderRadius:overdue?6:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8}}>
                      <div style={g3}>
                        <div><div style={lbl}>نوع واکسن</div>
                          <div style={{fontWeight:700,color:overdue?C.danger:C.accent}}>{v.name}</div></div>
                        <div><div style={lbl}>آخرین تزریق</div><div>{v.lastDate||"—"}</div></div>
                        <div><div style={lbl}>تکرار بعدی</div>
                          <div style={{color:overdue?C.danger:C.gold,fontWeight:overdue?800:400}}>
                            {v.nextDate||"—"}{overdue?` 🚨`:""}
                          </div>
                        </div>
                        <div><div style={lbl}>دامپزشک</div>
                          <div style={{fontSize:12,color:C.textMid}}>{v.vet||"—"}</div></div>
                      </div>
                      <button onClick={()=>delSub(a.id,"vaccines",v.id)}
                        style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:18}}>🗑</button>
                    </div>
                  </div>
                );
              })}
            </div>}

            {dtab==="repro"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
              {(!a.reproductions?.length)&&<div style={{...cs,color:C.textDim,textAlign:"center"}}>ثبت نشده</div>}
              {(a.reproductions||[]).map(r=>(
                <div key={r.id} style={{...cs,borderColor:r.result==="در انتظار"?C.gold+"44":C.border}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                    <div style={{fontWeight:800}}>شکم {toP(r.season)}</div>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <Bdg l={r.result||"—"} c={r.result==="در انتظار"?C.gold:r.result==="زنده"?C.accent:C.danger} sm/>
                      <button onClick={()=>delSub(a.id,"reproductions",r.id)}
                        style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:18}}>🗑</button>
                    </div>
                  </div>
                  <div style={g3}>
                    {[["تاریخ جفت‌گیری",r.matingDate],["زایمان احتمالی",r.expectedBirthDate,"gold"],
                      ["زایمان واقعی",r.birthDate],["تعداد بره",r.lambCount?`${toP(r.lambCount)} رأس`:null],
                      ["نوع زایمان",r.birthType],["کد قوچ (پدر)",r.ramCode,"gold"]
                    ].map(([l,v,ac])=>(
                      <div key={l}><div style={lbl}>{l}</div>
                        <div style={{fontWeight:600,color:ac==="gold"?C.gold:C.text}}>{v||"—"}</div></div>
                    ))}
                  </div>
                  {r.notes&&<div style={{marginTop:8,background:C.accentGlow,borderRadius:8,
                    padding:"7px 12px",fontSize:12,color:C.textMid}}>📝 {r.notes}</div>}
                </div>
              ))}
            </div>}

            {dtab==="weight"&&<div style={cs}>
              {(!a.weights?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.weights||[]).map(w=>(
                <div key={w.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"9px 0",borderBottom:`1px solid ${C.border}`,flexWrap:"wrap",gap:8}}>
                  <div style={{color:C.textMid,fontSize:12,minWidth:90}}>{w.date}</div>
                  <div style={{fontWeight:800,fontSize:17,color:C.accent}}>{toP(w.weight)} <span style={{fontSize:10,color:C.textDim}}>کیلو</span></div>
                  <Bdg l={w.physStatus||"—"} c={w.physStatus==="آبستن"?C.gold:w.physStatus==="بیمار"?C.danger:C.accent} sm/>
                  <div style={{fontSize:12,color:C.textDim,flex:1}}>{w.note}</div>
                  <button onClick={()=>delSub(a.id,"weights",w.id)}
                    style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:18}}>🗑</button>
                </div>
              ))}
              {a.weights?.length>1&&<WBar weights={a.weights}/>}
            </div>}

            {dtab==="treat"&&<div style={cs}>
              {(!a.treatments?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.treatments||[]).map(t=>(
                <div key={t.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",
                  padding:"10px 0",borderBottom:`1px solid ${C.border}`,flexWrap:"wrap",gap:8}}>
                  <div style={g3}>
                    <div><div style={lbl}>تاریخ</div><div style={{fontSize:12}}>{t.date}</div></div>
                    <div><div style={lbl}>رویداد</div><div style={{fontWeight:600}}>{t.event}</div></div>
                    <div><div style={lbl}>دارو</div><div style={{color:C.gold}}>{t.drug||"—"}</div></div>
                    <div><div style={lbl}>دامپزشک</div><div style={{fontSize:12,color:C.textMid}}>{t.vet||"—"}</div></div>
                  </div>
                  <div style={{display:"flex",gap:8,alignItems:"center"}}>
                    <Bdg l={t.result||"—"} c={t.result==="موفق"||t.result==="بهبود کامل"?C.accent:t.result==="در حال درمان"?C.gold:C.danger} sm/>
                    <button onClick={()=>delSub(a.id,"treatments",t.id)}
                      style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:18}}>🗑</button>
                  </div>
                </div>
              ))}
            </div>}

            {dtab==="cost"&&<div style={cs}>
              {(!a.costs?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.costs||[]).map(c=>(
                <div key={c.id} style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
                  <div><div style={{fontWeight:600}}>{c.category}</div>
                    <div style={{fontSize:12,color:C.textDim}}>{c.date}{c.note?` · ${c.note}`:""}</div></div>
                  <div style={{display:"flex",gap:8}}>
                    <div style={{fontWeight:700,color:C.danger,fontSize:12}}>{fmtRial(+c.amount)}</div>
                    <button onClick={()=>delSub(a.id,"costs",c.id)}
                      style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:18}}>🗑</button>
                  </div>
                </div>
              ))}
              <div style={{marginTop:10,background:C.dangerDim,borderRadius:8,padding:"8px 12px"}}>
                <span style={{color:C.textDim,fontSize:12}}>جمع هزینه‌ها: </span>
                <span style={{fontWeight:800,color:C.danger}}>{fmtRial(tc)}</span>
              </div>
            </div>}

            {dtab==="rev"&&<div style={cs}>
              {(!a.revenues?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.revenues||[]).map(r=>(
                <div key={r.id} style={{display:"flex",justifyContent:"space-between",
                  alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
                  <div><div style={{fontWeight:600}}>{r.category}</div>
                    <div style={{fontSize:12,color:C.textDim}}>{r.date}{r.note?` · ${r.note}`:""}</div></div>
                  <div style={{display:"flex",gap:8}}>
                    <div style={{fontWeight:700,color:C.accent,fontSize:12}}>{fmtRial(+r.amount)}</div>
                    <button onClick={()=>delSub(a.id,"revenues",r.id)}
                      style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:18}}>🗑</button>
                  </div>
                </div>
              ))}
              <div style={{marginTop:10,background:C.accentGlow,borderRadius:8,padding:"8px 12px"}}>
                <span style={{color:C.textDim,fontSize:12}}>جمع درآمدها: </span>
                <span style={{fontWeight:800,color:C.accent}}>{fmtRial(tr)}</span>
              </div>
            </div>}

            {dtab==="fin"&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[{l:"جمع هزینه‌ها",v:tc,c:C.danger},{l:"جمع درآمدها",v:tr,c:C.accent},
                {l:"سود / زیان",v:tp,c:tp>=0?C.accent:C.danger}].map(it=>(
                <div key={it.l} style={{...cs,display:"flex",justifyContent:"space-between",
                  alignItems:"center",borderColor:it.c+"33"}}>
                  <div style={{color:C.textMid,fontSize:14}}>{it.l}</div>
                  <div style={{fontSize:22,fontWeight:800,color:it.c}}>
                    {fmtRial(it.v)}
                  </div>
                </div>
              ))}
            </div>}

            {dtab==="note"&&<div style={cs}>
              {(!a.quickNotes?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.quickNotes||[]).slice().reverse().map(n=>(
                <div key={n.id} style={{padding:"10px 0",borderBottom:`1px solid ${C.border}`}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:11,color:C.textDim,marginBottom:3}}>{n.date||"—"}</div>
                      <div style={{lineHeight:1.6}}>{n.note}</div>
                    </div>
                    <button onClick={()=>delSub(a.id,"quickNotes",n.id)}
                      style={{background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:18,marginLeft:8}}>🗑</button>
                  </div>
                </div>
              ))}
            </div>}
          </div>
        );
      })()}

      {/* ══ تحلیل هوشمند ══ */}
      {page==="ai"&&(()=>{
        // پیشنهادهای جفت‌گیری
        const mateResults=ewes.map(ewe=>{
          const res=rams.map(ram=>({ram,result:calcMate(ewe,ram,animals)}))
            .sort((a,b)=>b.result.score-a.result.score);
          return{ewe,rams:res,sc:calcScore(ewe)};
        });
              const cullList=ewes.map(ewe=>({ewe,...calcCull(ewe)}))
          .filter(x=>x.urgency>0).sort((a,b)=>b.urgency-a.urgency);
              const vaccPlan=[
          {name:"تب برفکی",season:"فروردین و مهر",freq:"۲ بار در سال",target:"تمام گله",req:true,law:true,note:"قانونی — اجباری در ایران، هر ۶ ماه"},
          {name:"بروسلوز",season:"پاییز",freq:"یک‌بار در عمر",target:"میش‌های نابالغ",req:true,law:true,note:"قانونی — بیماری مشترک انسان و دام، خطرناک"},
          {name:"آنتروتوکسمی",season:"۴ هفته قبل از زایمان",freq:"سالانه",target:"میش‌های آبستن",req:true,law:false,note:"مرگ ناگهانی بره‌ها را پیشگیری میکند"},
          {name:"آبله گوسفند",season:"مهر",freq:"سالانه",target:"تمام گله",req:true,law:false,note:"بومی ایران — تلفات بالا در صورت عدم واکسیناسیون"},
          {name:"پاستورلوز",season:"پاییز",freq:"سالانه",target:"تمام گله",req:false,law:false,note:"توصیه‌شده در اقلیم دره‌شهر"},
          {name:"لپتوسپیروز",season:"بهار",freq:"سالانه",target:"تمام گله",req:false,law:false,note:"در صورت توصیه دامپزشک منطقه"},
        ];
        const overdueV=animals.filter(a=>a.status==="در گله").flatMap(a=>
          (a.vaccines||[]).filter(v=>{const d=daysFrom(v.nextDate);return d!==null&&d<=30;})
          .map(v=>({aid:a.id,aname:a.name||a.id,vname:v.name,dl:daysFrom(v.nextDate)}))
        );

              const focusEwe=selEwe?mateResults.find(m=>m.ewe.id===selEwe.id):null;

        return(
          <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:36,height:36,background:`linear-gradient(135deg,${C.purple},${C.accent})`,
                borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🧬</div>
              <div>
                <div style={{fontWeight:800,fontSize:15}}>تحلیل هوشمند وارگه</div>
                <div style={{fontSize:10,color:C.textDim}}>بر اساس داده‌های واقعی گله — بدون نیاز به اینترنت</div>
              </div>
              {selEwe&&<button onClick={()=>setSelEwe(null)}
                style={{...btnS("g",true),marginRight:"auto"}}>← همه میش‌ها</button>}
            </div>

            {/* تب‌ها */}
            <div style={{display:"flex",gap:0,marginBottom:16,borderBottom:`1px solid ${C.border}`}}>
              {[{id:"mate",l:"🔗 جفت‌گیری"},{id:"cull",l:"⚠️ پیشنهاد حذف"},{id:"vacc",l:"💉 واکسیناسیون"}].map(t=>(
                <button key={t.id} onClick={()=>setAnalysisTab(t.id)}
                  style={{background:"none",border:"none",
                    borderBottom:`3px solid ${analysisTab===t.id?C.accent:"transparent"}`,
                    color:analysisTab===t.id?C.accent:C.textMid,
                    padding:"10px 16px",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                  {t.l}
                </button>
              ))}
            </div>

            {/* ══ جفت‌گیری ══ */}
            {analysisTab==="mate"&&(
              <div>
                <div style={{background:C.goldDim,borderRadius:10,padding:"12px 14px",marginBottom:14,fontSize:12,color:C.textMid}}>
                  <strong style={{color:C.gold}}>روش علمی استفاده‌شده:</strong> Wright 1922 (همخونی) + ICAR 2023 (سن/وزن) + FAO 2012 (فاصله زایمان) + Davis 1982 (FecB)
                </div>

                {(focusEwe?[focusEwe]:mateResults).map(({ewe,rams:ramResults,sc})=>(
                  <div key={ewe.id} style={{...cs,marginBottom:14}}>
                    {/* سرصفحه میش */}
                    <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:12,
                      paddingBottom:12,borderBottom:`1px solid ${C.border}`}}>
                      <div style={{fontSize:26}}>🐑</div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:800,fontSize:15}}>{ewe.name||ewe.id}</div>
                        <div style={{display:"flex",gap:6,marginTop:4,flexWrap:"wrap"}}>
                          <Bdg l={ewe.genotype?.split(" ")[0]||ewe.genotype} c={gC(ewe.genotype?.split(" ")[0]||ewe.genotype)} sm/>
                          {sc&&<Bdg l={`امتیاز ژنتیکی: ${toP(sc.total)}`} c={sc.gc} sm/>}
                          {sc&&<Bdg l={`میانگین بره: ${sc.avg}`} c={C.info} sm/>}
                          {isPregnant(ewe)&&<Bdg l="🤰 هم‌اکنون آبستن" c={C.gold} sm/>}
                        </div>
                      </div>
                    </div>

                    {/* نتایج قوچ‌ها */}
                    {ramResults.map(({ram,result},i)=>(
                      <div key={ram.id} style={{
                        background:result.blocked?C.dangerDim:i===0?C.accentGlow:"transparent",
                        border:`1px solid ${result.blocked?C.danger:i===0?C.accent:C.border}`,
                        borderRadius:10,padding:"12px 14px",marginBottom:10}}>

                        {/* هدر قوچ */}
                        <div style={{display:"flex",justifyContent:"space-between",
                          alignItems:"center",marginBottom:10,flexWrap:"wrap",gap:8}}>
                          <div style={{display:"flex",gap:10,alignItems:"center"}}>
                            <span style={{fontSize:22}}>{result.blocked?"🚫":i===0?"🥇":i===1?"🥈":"🥉"}</span>
                            <div>
                              <div style={{fontWeight:800,fontSize:14}}>{ram.name||ram.id}</div>
                              <div style={{fontSize:11,color:C.textDim}}>
                                ژنوتیپ: {ram.genotype?.split(" ")[0]||ram.genotype} · {ram.weights?.at(-1)?.weight||"—"} کیلو
                              </div>
                            </div>
                          </div>
                          <div style={{display:"flex",gap:10,alignItems:"center"}}>
                            <div style={{textAlign:"center"}}>
                              <div style={{fontSize:28,fontWeight:800,color:result.blocked?C.danger:result.verdictColor}}>
                                {result.blocked?"—":toP(result.score)}
                              </div>
                              <div style={{fontSize:10,color:C.textDim}}>امتیاز</div>
                            </div>
                            <Bdg l={result.blocked?"مجاز نیست":result.verdict} c={result.blocked?C.danger:result.verdictColor} sm/>
                          </div>
                        </div>

                        {/* موانع قطعی */}
                        {result.errors.length>0&&(
                          <div style={{background:C.dangerDim,borderRadius:8,padding:"10px 12px",marginBottom:8}}>
                            {result.errors.map((e,j)=>(
                              <div key={j} style={{fontSize:12,color:C.danger,marginBottom:j>0?4:0,fontWeight:600}}>{e}</div>
                            ))}
                          </div>
                        )}

                        {/* نقاط مثبت */}
                        {!result.blocked&&result.oks.length>0&&(
                          <div style={{background:C.accentGlow+"66",borderRadius:8,padding:"9px 12px",marginBottom:result.warns.length>0?8:0}}>
                            {result.oks.map((o,j)=>(
                              <div key={j} style={{fontSize:12,color:C.textMid,marginBottom:2}}>{o}</div>
                            ))}
                          </div>
                        )}

                        {/* هشدارها */}
                        {!result.blocked&&result.warns.length>0&&(
                          <div style={{background:C.goldDim,borderRadius:8,padding:"9px 12px"}}>
                            {result.warns.map((w,j)=>(
                              <div key={j} style={{fontSize:12,color:C.textMid,marginBottom:2}}>{w}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                    {rams.length===0&&(
                      <div style={{textAlign:"center",padding:"20px 0",color:C.textDim,fontSize:13}}>
                        هیچ قوچی در گله ثبت نشده — ابتدا قوچ اضافه کنید
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ══ حذف ══ */}
            {analysisTab==="cull"&&(
              <div>
                {cullList.length===0?(
                  <div style={{...cs,textAlign:"center",padding:40}}>
                    <div style={{fontSize:48,marginBottom:10}}>✅</div>
                    <div style={{fontWeight:700,fontSize:15,color:C.accent}}>همه میش‌ها وضعیت قابل قبول دارند</div>
                    <div style={{fontSize:12,color:C.textDim,marginTop:6}}>در این مرحله پیشنهاد حذفی وجود ندارد</div>
                  </div>
                ):cullList.map(({ewe,reasons,urgency})=>(
                  <div key={ewe.id} style={{...cs,marginBottom:10,
                    borderColor:urgency>=4?C.danger+"66":C.warn+"55",borderWidth:urgency>=4?2:1}}>
                    <div style={{display:"flex",justifyContent:"space-between",
                      alignItems:"flex-start",marginBottom:10,flexWrap:"wrap",gap:8}}>
                      <div style={{display:"flex",gap:10,alignItems:"center"}}>
                        <div style={{fontSize:28}}>🐑</div>
                        <div>
                          <div style={{fontWeight:800,fontSize:14}}>{ewe.name||ewe.id}</div>
                          <div style={{display:"flex",gap:5,marginTop:3,flexWrap:"wrap"}}>
                            <Bdg l={ewe.genotype?.split(" ")[0]||ewe.genotype} c={gC(ewe.genotype?.split(" ")[0]||ewe.genotype)} sm/>
                            {(()=>{const sc=calcScore(ewe);return sc&&<Bdg l={`امتیاز ${toP(sc.total)}`} c={sc.gc} sm/>;})()}
                          </div>
                        </div>
                      </div>
                      <Bdg l={urgency>=5?"حذف فوری":urgency>=3?"پیشنهاد حذف":"بررسی بیشتر"}
                        c={urgency>=5?C.danger:urgency>=3?C.warn:C.textDim} sm/>
                    </div>
                    <div style={{background:C.dangerDim,borderRadius:8,padding:"10px 12px"}}>
                      <div style={{fontSize:11,fontWeight:700,color:C.danger,marginBottom:6}}>دلایل:</div>
                      {reasons.map((r,i)=><div key={i} style={{fontSize:12,color:C.textMid,marginBottom:3}}>• {r}</div>)}
                    </div>
                    <div style={{marginTop:8,fontSize:11,color:C.textDim}}>
                      💡 قبل از هر تصمیم، وضعیت آبستنی و نظر دامپزشک را بررسی کنید
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ══ واکسیناسیون ══ */}
            {analysisTab==="vacc"&&(
              <div>
                {overdueV.length>0&&(
                  <div style={{...cs,marginBottom:14,borderColor:C.danger+"66",borderWidth:2}}>
                    <div style={{fontWeight:800,color:C.danger,marginBottom:10,fontSize:14}}>
                      🚨 واکسن‌های فوری (سررسیده یا کمتر از ۳۰ روز)
                    </div>
                    {overdueV.map((v,i)=>(
                      <div key={i} style={{display:"flex",justifyContent:"space-between",
                        alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                        <div>
                          <span style={{fontWeight:700,color:C.accent}}>{v.aname}</span>
                          <span style={{color:C.textMid,fontSize:12,marginRight:6}}>— {v.vname}</span>
                        </div>
                        <Bdg l={v.dl<=0?"سررسیده!":v.dl===0?"امروز":`${toP(v.dl)} روز`}
                          c={v.dl<=0?C.danger:C.warn} sm/>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{fontSize:12,color:C.textDim,marginBottom:12}}>
                  برنامه سالانه واکسیناسیون گله قزل افشار — استان ایلام:
                </div>

                {vaccPlan.map((v,i)=>(
                  <div key={i} style={{...cs,marginBottom:8,
                    borderColor:v.law?C.danger+"44":v.req?C.accent+"33":C.border,
                    borderWidth:v.law?2:1}}>
                    <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                      <span style={{fontWeight:800,fontSize:14}}>{v.name}</span>
                      {v.law&&<Bdg l="⚡ قانونی — اجباری" c={C.danger} sm/>}
                      {v.req&&!v.law&&<Bdg l="✅ الزامی" c={C.accent} sm/>}
                      {!v.req&&<Bdg l="توصیه‌شده" c={C.textDim} sm/>}
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:6,marginBottom:8}}>
                      <div><span style={{fontSize:10,color:C.textDim}}>زمان: </span>
                        <span style={{fontSize:12,fontWeight:600,color:C.gold}}>{v.season}</span></div>
                      <div><span style={{fontSize:10,color:C.textDim}}>تکرار: </span>
                        <span style={{fontSize:12,fontWeight:600}}>{v.freq}</span></div>
                      <div><span style={{fontSize:10,color:C.textDim}}>برای: </span>
                        <span style={{fontSize:12,fontWeight:600,color:C.accent}}>{v.target}</span></div>
                    </div>
                    <div style={{background:C.surface,borderRadius:7,padding:"6px 10px",fontSize:11,color:C.textMid}}>
                      📌 {v.note}
                    </div>
                  </div>
                ))}

                <div style={{...cs,marginTop:14,background:C.goldDim,borderColor:C.gold+"44"}}>
                  <div style={{fontWeight:700,color:C.gold,marginBottom:10,fontSize:13}}>
                    🪱 برنامه ضدانگل (خارج از واکسن)
                  </div>
                  {[{n:"ضدانگل داخلی (کرم‌های روده‌ای)",f:"هر ۳ ماه یکبار",d:"آلبندازول یا لوامیزول",req:true},
                    {n:"ضدانگل خارجی (کنه و شپش)",f:"بهار و پاییز",d:"اسپری یا حمام دارویی",req:true}
                  ].map((x,i)=>(
                    <div key={i} style={{display:"flex",justifyContent:"space-between",
                      alignItems:"center",padding:"8px 0",borderBottom:i===0?`1px solid ${C.border}`:"none"}}>
                      <div>
                        <div style={{fontWeight:600,fontSize:13}}>{x.n}</div>
                        <div style={{fontSize:11,color:C.textDim,marginTop:2}}>{x.d}</div>
                      </div>
                      <div style={{textAlign:"center"}}>
                        <Bdg l={x.f} c={C.gold} sm/>
                        {x.req&&<div style={{fontSize:10,color:C.danger,marginTop:3}}>⚡ الزامی</div>}
                      </div>
                    </div>
                  ))}
                  <div style={{marginTop:10,fontSize:11,color:C.textDim}}>
                    ⚠️ همچنین: آزمایش بروسلوز کل گله — سالانه — الزامی قانونی
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })()}

      {/* ناوبری پایین */}
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.surface,
        borderTop:`1px solid ${C.border}`,display:"flex",zIndex:150}}>
        {navs.map(n=>(
          <button key={n.v} onClick={()=>setPage(n.v)}
            style={{flex:1,background:"none",border:"none",padding:"10px 2px 8px",cursor:"pointer",
              color:page===n.v?n.v==="ai"?C.purple:C.accent:C.textDim,
              fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:18}}>{n.i}</span>
            <span style={{fontSize:9,fontWeight:700}}>{n.l}</span>
          </button>
        ))}
      </div>

      {/* مودال‌ها */}
      {addModal==="animal"&&<AddAnimal onClose={()=>setAddModal(null)}/>}
      {addModal&&addModal!=="animal"&&sel&&(
        <SubForm type={addModal} aid={sel.id} animals={animals}
          onSave={rec=>{
            const m={vaccine:"vaccines",weight:"weights",treat:"treatments",
              repro:"reproductions",cost:"costs",rev:"revenues",note:"quickNotes"};
            addSub(sel.id,m[addModal],rec);
          }}
          onClose={()=>setAddModal(null)}/>
      )}

      {delId&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",
          alignItems:"center",justifyContent:"center",zIndex:900,padding:16}}>
          <div style={{...cs,border:`1px solid ${C.danger}55`,maxWidth:320,width:"100%",textAlign:"center"}}>
            <div style={{fontSize:44,marginBottom:10}}>⚠️</div>
            <div style={{fontWeight:800,fontSize:16,marginBottom:6}}>حذف دام {delId}؟</div>
            <div style={{color:C.textDim,fontSize:13,marginBottom:22}}>این عمل برگشت‌پذیر نیست. تمام اطلاعات این دام پاک میشه.</div>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button onClick={()=>setDelId(null)}
                style={{background:C.surface,color:C.text,border:`1px solid ${C.border}`,
                  borderRadius:8,padding:"11px 22px",fontFamily:"inherit",fontWeight:700,cursor:"pointer",fontSize:14}}>
                انصراف
              </button>
              <button onClick={()=>delAnimal(delId)}
                style={{background:C.dangerDim,color:C.danger,border:`1px solid ${C.danger}`,
                  borderRadius:8,padding:"11px 22px",fontFamily:"inherit",fontWeight:700,cursor:"pointer",fontSize:14}}>
                بله، حذف شود
              </button>
            </div>
          </div>
        </div>
      )}

      {toast&&(
        <div style={{position:"fixed",bottom:68,left:"50%",transform:"translateX(-50%)",
          background:toast.t==="err"?C.danger:toast.t==="warn"?C.warn:C.accent,
          color:"#0B1610",borderRadius:10,padding:"11px 24px",fontWeight:700,fontSize:14,
          zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,0.6)",pointerEvents:"none",whiteSpace:"nowrap"}}>
          {toast.m}
        </div>
      )}
    </div>
  );
}
