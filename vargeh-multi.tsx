import { useState, useEffect, useRef, useCallback } from "react";

const LOGO_SMALL="data:image/png;base64,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";
const LOGO_192=LOGO_SMALL;
const MASTER_KEY="$2a$10$8CIqY0WYarqFXMsXMC/yd.dsZ72hayKnRF2yRDppHDVyvqExVrg7K";
let BIN_ID=localStorage.getItem("vargeh_bin_id")||"";
const USERS=[
  {id:"ali",name:"علی طهماسبی",nameEn:"AliTahmasebi",pass:"At9148499058",role:"مدیر",color:"#5BBA6F"},
  {id:"mohamadamin",name:"محمد امین چترزرین",nameEn:"MohamadaminChatrzarin",pass:"M09189890898",role:"مسئول فنی",color:"#9B72CF"},
];
const GD=150;
const C={bg:"#0B1610",surface:"#142019",card:"#1C2E22",border:"#263D2C",accent:"#5BBA6F",accentGlow:"rgba(91,186,111,0.13)",gold:"#D4A843",goldDim:"rgba(212,168,67,0.13)",text:"#E4EDE6",textMid:"#8FAF97",textDim:"#4E6B56",danger:"#E05C5C",dangerDim:"rgba(224,92,92,0.13)",info:"#5BA4BA",warn:"#E09A3E",purple:"#9B72CF"};
const toP=n=>String(n).replace(/\d/g,d=>"۰۱۲۳۴۵۶۷۸۹"[d]);
const isDate=d=>/^\d{4}\/\d{2}\/\d{2}$/.test(d);
const gC=g=>g==="BB"?C.accent:g==="B+"?C.gold:C.danger;
const sC=s=>s==="در گله"?C.accent:s==="فروش"?C.gold:C.danger;
const uid=()=>Math.random().toString(36).slice(2,9);
const fmtRial=n=>{const abs=Math.abs(Math.round(n));const s=abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");return (n<0?"-":n>0?"+":"")+s+" ریال";};
const fmtM=n=>(n>=0?"+":"")+Math.round(n/1000000)+"M";
const sDim=(m)=>m<=6?31:m<=11?30:29;
const sLeap=(y)=>y>1&&y%4===1;
const sLC=(y)=>y<=5?0:Math.floor((y-6)/4)+1;
const sToAbs=(y,m,d)=>{let t=(y-1)*365+sLC(y);for(let i=1;i<m;i++)t+=sDim(i);return t+d;};
const absToS=(t)=>{let y=1;while(true){const dy=sLeap(y)?366:365;if(t<=dy)break;t-=dy;y++;}let m=1;while(true){const dm=sDim(m);if(t<=dm)break;t-=dm;m++;}return[y,m,t];};
const shamsiToDays=d=>{if(!isDate(d))return 0;const[y,m,day]=d.split("/").map(Number);return sToAbs(y,m,day);};
const daysFrom=ds=>{if(!isDate(ds))return null;const now=new Date();const[ty,tm,td]=absToS(sToAbs(now.getFullYear()-621,now.getMonth()+1,now.getDate()));return shamsiToDays(ds)-sToAbs(ty,tm,td);};
const addDays=(ds,n)=>{if(!isDate(ds))return null;const[y,m,d]=ds.split("/").map(Number);const[ny,nm,nd]=absToS(sToAbs(y,m,d)+n);return`${ny}/${String(nm).padStart(2,"0")}/${String(nd).padStart(2,"0")}`;};
const calcFin=a=>{const c=(a.costs||[]).reduce((s,x)=>s+(+x.amount||0),0);const r=(a.revenues||[]).reduce((s,x)=>s+(+x.amount||0),0);return{c,r,p:r-c};};
const isPregnant=a=>(a.reproductions||[]).some(r=>r.result==="در انتظار");
const ageInMonths=a=>{if(isDate(a.birthDate)){const days=Math.abs(daysFrom(a.birthDate)||0);return Math.floor(days/30);}if(a.estimatedAge){const n=parseFloat(a.estimatedAge);if(!isNaN(n))return a.estimatedAge.includes("ماه")?n:n*12;}return null;};
const calcAge=a=>{if(isDate(a.birthDate)){const mo=ageInMonths(a);if(mo===null)return a.estimatedAge||"—";const yr=Math.floor(mo/12);const mn=mo%12;if(yr===0)return `${mn} ماه`;if(mn===0)return `${yr} سال`;return `${yr} سال و ${mn} ماه`;}return a.estimatedAge||"—";};
const lastWeight=a=>a.weights?.at(-1)?.weight||null;
const daysSinceLastBirth=a=>{const done=(a.reproductions||[]).filter(r=>r.result==="زنده"&&isDate(r.birthDate));if(!done.length)return null;return -(daysFrom(done[done.length-1].birthDate)||0);};

const calcScore=a=>{
  if(a.type!=="میش")return null;
  const gs=a.genotype==="BB"?100:a.genotype==="B+"?60:20;
  const done=(a.reproductions||[]).filter(r=>r.result==="زنده"&&r.lambCount);
  const avg=done.length>0?done.reduce((s,r)=>s+r.lambCount,0)/done.length:0;
  const rs=Math.min(100,avg*40);
  const ws=a.weights||[];let grow=50;
  if(ws.length>=2){const g=ws[ws.length-1].weight-ws[0].weight;grow=Math.min(100,Math.max(0,50+g*3));}
  const hs=Math.max(0,100-(a.treatments||[]).length*15);
  const total=Math.round(gs*0.4+rs*0.35+grow*0.15+hs*0.1);
  return{total,gs,rs:Math.round(rs),grow:Math.round(grow),hs,avg:avg.toFixed(1),seasons:done.length,
    grade:total>=80?"عالی":total>=60?"خوب":total>=40?"متوسط":"ضعیف",
    gc:total>=80?C.accent:total>=60?C.gold:total>=40?C.warn:C.danger};
};

const calcMate=(ewe,ram)=>{
  const errors=[],warns=[],oks=[];let score=0,blocked=false;
  if(isPregnant(ewe)){errors.push("🚫 این میش آبستن است");blocked=true;}
  const eweFather=ewe.fatherCode?.trim();
  if(eweFather&&eweFather!=="-"&&eweFather===ram.id){errors.push("🚫 همخونی مستقیم — پدر میش = قوچ (F=25٪)");blocked=true;}
  const ramFather=ram.fatherCode?.trim();
  if(!blocked&&eweFather&&ramFather&&eweFather!=="-"&&ramFather!=="-"&&eweFather===ramFather){errors.push("🚫 همخونی — پدر مشترک (F=12.5٪)");blocked=true;}
  const ageMo=ageInMonths(ewe);
  if(ageMo!==null&&ageMo<12){errors.push(`🚫 سن ${toP(ageMo)} ماه — حداقل ۱۲ ماه`);blocked=true;}
  if(blocked)return{score:0,errors,warns,oks,blocked:true,verdict:"مجاز نیست",verdictColor:C.danger};
  const daysSince=daysSinceLastBirth(ewe);
  if(daysSince!==null&&daysSince<45){warns.push(`⚠️ ${toP(daysSince)} روز از آخرین زایمان`);score-=30;}
  else{oks.push("✅ فاصله زایمان مناسب");score+=15;}
  const lw=lastWeight(ewe)||0;
  if(ageMo!==null&&ageMo<18){if(lw>=45){oks.push(`✅ وزن ${toP(lw)} کیلو`);score+=15;}else{warns.push(`⚠️ وزن پایین`);score+=5;}}
  else{if(lw>=55){oks.push(`✅ وزن ایده‌آل`);score+=20;}else{warns.push(`⚠️ فلاشینگ توصیه‌شده`);score+=8;}}
  if(ewe.genotype==="BB"&&ram.genotype==="BB"){score+=40;oks.push("✅ هر دو BB");}
  else if(ewe.genotype==="BB"||ram.genotype==="BB"){score+=25;oks.push("✅ یک والد BB");}
  else{score+=5;warns.push("⚠️ هیچ‌کدام BB نیستند");}
  const sc=calcScore(ewe);
  if(sc&&sc.seasons>=2&&+sc.avg>=2){score+=15;oks.push(`✅ میانگین ${sc.avg} بره`);}
  const treats=(ewe.treatments||[]).filter(t=>{const d=daysFrom(t.date);return d!==null&&d>-90;});
  if(treats.length>0){warns.push(`⚠️ ${toP(treats.length)} بیماری اخیر`);score-=15;}
  if(!ewe.hasFecBTest){warns.push("⚠️ آزمایش FecB نشده");score-=10;}
  const fs=Math.min(100,Math.max(0,score));
  return{score:fs,errors,warns,oks,blocked:false,verdict:fs>=75?"توصیه میشه":fs>=50?"با احتیاط":fs>=25?"بررسی لازم":"توصیه نمیشه",verdictColor:fs>=75?C.accent:fs>=50?C.gold:fs>=25?C.warn:C.danger};
};

const calcCull=a=>{
  const sc=calcScore(a);const{p}=calcFin(a);
  const reasons=[];let urgency=0;
  if(sc&&sc.seasons>=2&&+sc.avg<1.3){reasons.push(`میانگین ${sc.avg} بره`);urgency+=3;}
  if(p<-50000000){reasons.push(`زیان‌ده: ${fmtM(p)}`);urgency+=2;}
  if(!a.hasFecBTest){reasons.push("بدون آزمایش FecB");urgency+=1;}
  if(sc&&sc.hs<40){reasons.push(`سلامت ضعیف`);urgency+=2;}
  return{reasons,urgency};
};

const SAMPLE=[
  {id:"VRG-001",name:"ستاره",type:"میش",genotype:"B+",birthDate:"1402/03/10",estimatedAge:"۳ سال",entryWeight:64,entryDate:"1405/03/01",entryType:"خرید",purchasePrice:950000000,motherCode:"-",fatherCode:"-",hasFecBTest:true,hasHealthCert:true,hasVaccCard:true,
  costs:[{id:"c1",date:"1405/03/01",category:"خرید دام",amount:950000000,note:""}],
  revenues:[],quickNotes:[],
  vaccines:[{id:"v1",name:"آبله گوسفند",lastDate:"1404/07/15",nextDate:"1405/07/15",vet:"دکتر رضایی"},{id:"v2",name:"تب برفکی",lastDate:"1405/01/10",nextDate:"1405/07/10",vet:"دکتر رضایی"}],
  reproductions:[{id:"r1",season:1,matingDate:"1404/07/20",result:"در انتظار",ramCode:"-",expectedBirthDate:"1405/04/25"}],
  weights:[{id:"w1",date:"1405/03/01",weight:64,physStatus:"ورود"},{id:"w2",date:"1405/03/20",weight:66,physStatus:"آبستن"}],
  treatments:[],status:"در گله",createdAt:new Date().toISOString()},
  {id:"VRG-002",name:"مهتاب",type:"میش",genotype:"B+",birthDate:"1402/05/20",estimatedAge:"۳ سال",entryWeight:61,entryDate:"1405/03/01",entryType:"خرید",purchasePrice:950000000,motherCode:"-",fatherCode:"-",hasFecBTest:true,hasHealthCert:true,hasVaccCard:true,
  costs:[{id:"c1",date:"1405/03/01",category:"خرید دام",amount:950000000,note:""}],
  revenues:[],quickNotes:[],
  vaccines:[{id:"v1",name:"آبله گوسفند",lastDate:"1404/07/15",nextDate:"1405/07/15",vet:"دکتر رضایی"},{id:"v2",name:"تب برفکی",lastDate:"1405/01/10",nextDate:"1405/07/10",vet:"دکتر رضایی"}],
  reproductions:[{id:"r1",season:1,matingDate:"1404/07/25",result:"در انتظار",ramCode:"-",expectedBirthDate:"1405/04/30"}],
  weights:[{id:"w1",date:"1405/03/01",weight:61,physStatus:"ورود"},{id:"w2",date:"1405/03/20",weight:63,physStatus:"آبستن"}],
  treatments:[],status:"در گله",createdAt:new Date().toISOString()},
  {id:"VRG-003",name:"نسیم",type:"میش",genotype:"B+",birthDate:"1402/01/05",estimatedAge:"۳ سال",entryWeight:66,entryDate:"1405/03/01",entryType:"خرید",purchasePrice:950000000,motherCode:"-",fatherCode:"-",hasFecBTest:true,hasHealthCert:true,hasVaccCard:true,
  costs:[{id:"c1",date:"1405/03/01",category:"خرید دام",amount:950000000,note:""}],
  revenues:[],quickNotes:[],
  vaccines:[{id:"v1",name:"آبله گوسفند",lastDate:"1404/07/15",nextDate:"1405/07/15",vet:"دکتر رضایی"},{id:"v2",name:"آنتروتوکسمی",lastDate:"1405/02/01",nextDate:"1406/02/01",vet:"دکتر رضایی"}],
  reproductions:[{id:"r1",season:1,matingDate:"1404/07/18",result:"در انتظار",ramCode:"-",expectedBirthDate:"1405/04/23"}],
  weights:[{id:"w1",date:"1405/03/01",weight:66,physStatus:"ورود"},{id:"w2",date:"1405/03/20",weight:68,physStatus:"آبستن"}],
  treatments:[],status:"در گله",createdAt:new Date().toISOString()},
  {id:"VRG-004",name:"بهار",type:"میش",genotype:"B+",birthDate:"1402/06/12",estimatedAge:"۳ سال",entryWeight:63,entryDate:"1405/03/01",entryType:"خرید",purchasePrice:950000000,motherCode:"-",fatherCode:"-",hasFecBTest:true,hasHealthCert:true,hasVaccCard:true,
  costs:[{id:"c1",date:"1405/03/01",category:"خرید دام",amount:950000000,note:""}],
  revenues:[],quickNotes:[],
  vaccines:[{id:"v1",name:"آبله گوسفند",lastDate:"1404/07/15",nextDate:"1405/07/15",vet:"دکتر رضایی"},{id:"v2",name:"تب برفکی",lastDate:"1405/01/10",nextDate:"1405/07/10",vet:"دکتر رضایی"}],
  reproductions:[{id:"r1",season:1,matingDate:"1404/07/22",result:"در انتظار",ramCode:"-",expectedBirthDate:"1405/04/27"}],
  weights:[{id:"w1",date:"1405/03/01",weight:63,physStatus:"ورود"},{id:"w2",date:"1405/03/20",weight:65,physStatus:"آبستن"}],
  treatments:[],status:"در گله",createdAt:new Date().toISOString()},
  {id:"VRG-005",name:"سپیده",type:"میش",genotype:"B+",birthDate:"1402/04/08",estimatedAge:"۳ سال",entryWeight:65,entryDate:"1405/03/01",entryType:"خرید",purchasePrice:950000000,motherCode:"-",fatherCode:"-",hasFecBTest:true,hasHealthCert:true,hasVaccCard:true,
  costs:[{id:"c1",date:"1405/03/01",category:"خرید دام",amount:950000000,note:""}],
  revenues:[],quickNotes:[],
  vaccines:[{id:"v1",name:"آبله گوسفند",lastDate:"1404/07/15",nextDate:"1405/07/15",vet:"دکتر رضایی"},{id:"v2",name:"آنتروتوکسمی",lastDate:"1405/02/01",nextDate:"1406/02/01",vet:"دکتر رضایی"}],
  reproductions:[{id:"r1",season:1,matingDate:"1404/07/28",result:"در انتظار",ramCode:"-",expectedBirthDate:"1405/05/02"}],
  weights:[{id:"w1",date:"1405/03/01",weight:65,physStatus:"ورود"},{id:"w2",date:"1405/03/20",weight:67,physStatus:"آبستن"}],
  treatments:[],status:"در گله",createdAt:new Date().toISOString()},
];

const Bdg=({l,c=C.accent,sm})=>(<span style={{background:c+"22",color:c,border:`1px solid ${c}44`,borderRadius:6,padding:sm?"1px 7px":"3px 10px",fontSize:sm?10:11,fontWeight:700,whiteSpace:"nowrap"}}>{l}</span>);

// ══ SubForm — خارج از کامپوننت اصلی ══
function SubForm({type,aid,onClose,animals,saveAnimals,toast_,editRecord=null,formData={},updateForm}){
  const isEdit=editRecord!==null;
  const fd=formData;
  const sv=(k,v)=>updateForm(k,v);
  const rams=animals.filter(a=>a.type==="قوچ"&&a.status==="در گله");
  const inpS2={background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",color:C.text,fontFamily:"inherit",fontSize:14,width:"100%",outline:"none",boxSizing:"border-box"};
  const lbl2={fontSize:11,color:C.textDim,marginBottom:4,display:"block",fontWeight:600};

  // محاسبه تاریخ زایمان
  if(type==="repro"&&fd.matingDate&&isDate(fd.matingDate)&&!fd.expDate){
    const exp=addDays(fd.matingDate,GD);
    if(exp&&exp!==fd.expDate)updateForm("expDate",exp);
  }

  const F=(l,k,opts,ph,tp)=>(
    <div style={{marginBottom:10}}>
      <label style={lbl2}>{l}</label>
      {opts?<select value={fd[k]||""} onChange={e=>sv(k,e.target.value)} style={inpS2}><option value="">—</option>{opts.map(o=><option key={o}>{o}</option>)}</select>
      :<input type={tp||"text"} value={fd[k]||""} placeholder={ph||""} onChange={e=>sv(k,e.target.value)} style={inpS2}/>}
    </div>
  );

  const titles={vaccine:"💉 واکسن",weight:"⚖️ وزن‌کشی",treat:"🩺 درمان",repro:"🐑 جفت‌گیری",cost:"💸 هزینه",rev:"💰 درآمد",note:"📝 یادداشت"};
  const fieldMap={vaccine:"vaccines",weight:"weights",treat:"treatments",repro:"reproductions",cost:"costs",rev:"revenues",note:"quickNotes"};

  const save=()=>{
    const field=fieldMap[type];
    const na=animals.map(a=>{
      if(a.id!==aid)return a;
      const arr=a[field]||[];
      if(isEdit){
        return{...a,[field]:arr.map(r=>r.id===editRecord.id?{...fd,id:editRecord.id}:r)};
      }else{
        const rec={...fd,id:uid(),weight:fd.weight?+fd.weight:undefined,lambCount:fd.lambCount?+fd.lambCount:undefined,amount:fd.amount?+fd.amount:undefined,expectedBirthDate:fd.expDate,date:fd.date||new Date().toLocaleDateString("fa-IR")};
        const final=field==="reproductions"?{...rec,season:arr.length+1}:rec;
        return{...a,[field]:[...arr,final]};
      }
    });
    saveAnimals(na);onClose();toast_(isEdit?"✓ ویرایش شد":"✓ ثبت شد");
  };

  const cs2={background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:800,padding:14}}>
      <div style={{...cs2,width:"100%",maxWidth:420,maxHeight:"88vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontWeight:800,fontSize:16}}>{isEdit?"✏️ ویرایش":"➕"} {titles[type]}</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.textDim,fontSize:24,cursor:"pointer"}}>✕</button>
        </div>
        {type==="vaccine"&&<>{F("نوع واکسن","name",["آبله گوسفند","آنتروتوکسمی","بروسلوز","تب برفکی","پاستورلوز","لپتوسپیروز"])}{F("تاریخ تزریق","lastDate",null,"۱۴۰۳/۰۷/۱۰")}{F("تکرار بعدی","nextDate",null,"۱۴۰۴/۰۷/۱۰")}{F("دامپزشک","vet")}</>}
        {type==="weight"&&<>{F("تاریخ","date",null,"۱۴۰۳/۰۹/۰۱")}{F("وزن (کیلو)","weight",null,"","number")}{F("وضعیت","physStatus",["ورود","نرمال","آبستن","شیردهی","بیمار"])}{F("یادداشت","note")}</>}
        {type==="treat"&&<>{F("تاریخ","date")}{F("شرح رویداد","event")}{F("داروی مصرفی","drug")}{F("دامپزشک","vet")}{F("نتیجه","result",["موفق","بهبود کامل","در حال درمان","فوت شد"])}</>}
        {type==="repro"&&<>
          {F("تاریخ جفت‌گیری","matingDate",null,"۱۴۰۳/۰۷/۲۰")}
          {rams.length>0&&F("قوچ","ramCode",rams.map(r=>r.id+(r.name?` — ${r.name}`:"")))}
          {fd.expDate&&<div style={{background:C.goldDim,borderRadius:8,padding:"8px 12px",marginBottom:10}}><div style={{fontSize:11,color:C.gold,fontWeight:700}}>🗓️ زایمان احتمالی</div><div style={{fontWeight:800,fontSize:16}}>{fd.expDate}</div></div>}
          {F("تاریخ زایمان واقعی","birthDate")}{F("تعداد بره","lambCount",null,"","number")}
          {F("نوع زایمان","birthType",["طبیعی","کمک دستی","سزارین"])}{F("نتیجه","result",["در انتظار","زنده","مرده"])}{F("یادداشت","notes")}
        </>}
        {type==="cost"&&<>
          {F("تاریخ","date")}{F("دسته","category",["خرید دام","خوراک","دارو","واکسیناسیون","دامپزشک","حمل‌ونقل","سایر"])}
          <div style={{marginBottom:10}}><label style={lbl2}>مبلغ (ریال)</label>
            <input type="number" value={fd.amount||""} onChange={e=>sv("amount",e.target.value)} placeholder="مثال: 5000000" style={inpS2}/>
            {fd.amount&&<div style={{fontSize:11,color:C.gold,marginTop:4,fontWeight:600}}>= {fmtRial(+fd.amount)}</div>}
          </div>
          {F("توضیح","note")}
        </>}
        {type==="rev"&&<>
          {F("تاریخ","date")}{F("دسته","category",["فروش بره","فروش میش","فروش قوچ","فروش پشم","سایر"])}
          <div style={{marginBottom:10}}><label style={lbl2}>مبلغ (ریال)</label>
            <input type="number" value={fd.amount||""} onChange={e=>sv("amount",e.target.value)} placeholder="مثال: 18000000" style={inpS2}/>
            {fd.amount&&<div style={{fontSize:11,color:C.gold,marginTop:4,fontWeight:600}}>= {fmtRial(+fd.amount)}</div>}
          </div>
          {F("توضیح","note")}
        </>}
        {type==="note"&&<><div style={{marginBottom:10}}><label style={lbl2}>یادداشت</label><textarea value={fd.note||""} onChange={e=>sv("note",e.target.value)} rows={3} style={{...inpS2,resize:"vertical"}}/></div>{F("تاریخ","date")}</>}
        <div style={{display:"flex",gap:8,marginTop:14}}>
          <button onClick={onClose} style={{flex:1,background:C.surface,color:C.text,border:`1px solid ${C.border}`,borderRadius:8,padding:10,fontFamily:"inherit",fontWeight:700,cursor:"pointer"}}>انصراف</button>
          <button onClick={save} style={{flex:2,background:C.accent,color:"#0B1610",border:"none",borderRadius:8,padding:10,fontFamily:"inherit",fontWeight:800,cursor:"pointer"}}>💾 {isEdit?"ذخیره":"ثبت"}</button>
        </div>
      </div>
    </div>
  );
}

// ══ AddAnimal — خارج از کامپوننت اصلی ══
function AddAnimal({onClose,animals,saveAnimals,toast_,formData={},updateForm,resetForm}){
  const fd={type:"میش",genotype:"BB",entryType:"خرید",status:"در گله",...formData};
  const sv=(k,v)=>updateForm(k,v);
  const inpS2={background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",color:C.text,fontFamily:"inherit",fontSize:14,width:"100%",outline:"none",boxSizing:"border-box"};
  const lbl2={fontSize:11,color:C.textDim,marginBottom:4,display:"block",fontWeight:600};
  const g22={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12};
  const F=(l,k,opts,ph,tp)=>{
    return(<div><label style={lbl2}>{l}</label>
      {opts
        ?<select value={fd[k]||""} onChange={e=>sv(k,e.target.value)} style={inpS2}>
          <option value="">—</option>
          {opts.map(o=><option key={o}>{o}</option>)}
        </select>
        :<input type={tp||"text"} value={fd[k]||""} placeholder={ph||""} onChange={e=>sv(k,e.target.value)} style={inpS2}/>
      }
    </div>);
  };
  const save=()=>{
    if(!fd.id){alert("کد داخلی الزامی");return;}
    if(animals.find(a=>a.id===fd.id)){alert("کد تکراری");return;}
    const na=[...animals,{...fd,entryWeight:+fd.entryWeight||0,purchasePrice:+fd.purchasePrice||0,costs:[],revenues:[],quickNotes:[],vaccines:[],reproductions:[],weights:[],treatments:[],createdAt:new Date().toISOString()}];
    saveAnimals(na);onClose();toast_("✓ دام ثبت شد");
  };
  const cs2={background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:900,padding:14}}>
      <div style={{...cs2,width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontWeight:800,fontSize:16}}>➕ ثبت دام جدید</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.textDim,fontSize:24,cursor:"pointer"}}>✕</button>
        </div>
        <div style={g22}>
          {F("کد داخلی *","id",null,`VRG-${String(animals.length+1).padStart(3,"0")}`)}
          {F("شناسه الکترونیکی (RFID)","rfid",null,"982000...")}
          {F("نام دام","name",null,"مثال: ستاره")}
          {F("نوع","type",["میش","قوچ","بره"])}
          {F("ژنوتیپ (FecB)","genotype",["BB","B+","++"])}
          {F("تاریخ تولد","birthDate",null,"۱۴۰۲/۰۳/۱۵")}
          {F("سن تخمینی","estimatedAge",null,"۲ سال")}
          {F("تاریخ ورود","entryDate",null,"۱۴۰۲/۰۶/۰۱")}
          {F("نحوه ورود","entryType",["خرید","تولد","هدیه","سایر"])}
          {F("وزن ورود (کیلو)","entryWeight",null,"","number")}
          {F("قیمت خرید (ریال)","purchasePrice",null,"","number")}
          {F("کد پدر","fatherCode",null,"— یا VRG-Q01")}
          {F("کد مادر","motherCode",null,"—")}
        </div>
        <div style={{background:C.goldDim,borderRadius:8,padding:"10px 14px",margin:"14px 0",fontSize:12,color:C.textMid}}>💡 کد پدر را حتماً وارد کنید</div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={onClose} style={{flex:1,background:C.surface,color:C.text,border:`1px solid ${C.border}`,borderRadius:8,padding:12,fontFamily:"inherit",fontWeight:700,cursor:"pointer"}}>انصراف</button>
          <button onClick={save} style={{flex:2,background:C.accent,color:"#0B1610",border:"none",borderRadius:8,padding:12,fontFamily:"inherit",fontWeight:800,cursor:"pointer"}}>💾 ثبت دام</button>
        </div>
      </div>
    </div>
  );
}

// ══ EditAnimal — ویرایش مشخصات پایه دام ══
function EditAnimal({onClose,animal,animals,saveAnimals,toast_}){
  const[fd,setFd]=useState({...animal});
  useEffect(()=>{setFd({...animal});},[animal.id]);
  const sv=(k,v)=>setFd(p=>({...p,[k]:v}));
  const inpS2={background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",color:C.text,fontFamily:"inherit",fontSize:14,width:"100%",outline:"none",boxSizing:"border-box"};
  const lbl2={fontSize:11,color:C.textDim,marginBottom:4,display:"block",fontWeight:600};
  const g22={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12};
  const F=(l,k,opts,ph,tp)=>{
    return(<div><label style={lbl2}>{l}</label>
      {opts
        ?<select value={fd[k]||""} onChange={e=>sv(k,e.target.value)} style={inpS2}>
          <option value="">—</option>
          {opts.map(o=><option key={o}>{o}</option>)}
        </select>
        :<input type={tp||"text"} value={fd[k]||""} placeholder={ph||""} onChange={e=>sv(k,e.target.value)} style={inpS2}/>
      }
    </div>);
  };
  const save=()=>{
    const na=animals.map(a=>a.id===animal.id?{...a,...fd}:a);
    saveAnimals(na);onClose();toast_("✓ مشخصات ذخیره شد");
  };
  const cs2={background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16};
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:900,padding:14}}>
      <div style={{...cs2,width:"100%",maxWidth:480,maxHeight:"90vh",overflowY:"auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontWeight:800,fontSize:16}}>✏️ ویرایش مشخصات دام</div>
          <button onClick={onClose} style={{background:"none",border:"none",color:C.textDim,fontSize:24,cursor:"pointer"}}>✕</button>
        </div>
        <div style={g22}>
          {F("نام دام","name",null,"مثال: ستاره")}
          {F("نوع","type",["میش","قوچ","بره"])}
          {F("ژنوتیپ (FecB)","genotype",["BB","B+","++"])}
          {F("تاریخ تولد","birthDate",null,"۱۴۰۲/۰۳/۱۵")}
          {F("سن تخمینی","estimatedAge",null,"۲ سال")}
          {F("تاریخ ورود","entryDate",null,"۱۴۰۲/۰۶/۰۱")}
          {F("نحوه ورود","entryType",["خرید","تولد","هدیه","سایر"])}
          {F("وزن ورود (کیلو)","entryWeight",null,"","number")}
          {F("قیمت خرید (ریال)","purchasePrice",null,"","number")}
          {F("کد پدر","fatherCode",null,"— یا VRG-Q01")}
          {F("کد مادر","motherCode",null,"—")}
          {F("وضعیت","status",["در گله","فروش","تلف","جدا"])}
        </div>
        <div style={{display:"flex",gap:8,marginTop:16}}>
          <button onClick={onClose} style={{flex:1,background:C.surface,color:C.text,border:`1px solid ${C.border}`,borderRadius:8,padding:12,fontFamily:"inherit",fontWeight:700,cursor:"pointer"}}>انصراف</button>
          <button onClick={save} style={{flex:2,background:C.accent,color:"#0B1610",border:"none",borderRadius:8,padding:12,fontFamily:"inherit",fontWeight:800,cursor:"pointer"}}>💾 ذخیره مشخصات</button>
        </div>
      </div>
    </div>
  );
}

export default function VargehMulti(){
  const[user,setUser]=useState(()=>{try{const u=localStorage.getItem("vargeh_user");return u?JSON.parse(u):null;}catch{return null;}});
  const[loginName,setLoginName]=useState("");
  const[loginPass,setLoginPass]=useState("");
  const[loginErr,setLoginErr]=useState("");
  const[animals,setAnimals]=useState(()=>{try{const s=localStorage.getItem("vargeh_animals");return s?JSON.parse(s):SAMPLE;}catch{return SAMPLE;}});
  const[syncing,setSyncing]=useState(false);
  const[lastSync,setLastSync]=useState(null);
  const[syncErr,setSyncErr]=useState("");
  const[page,setPage]=useState("dash");
  const[selId,setSelId]=useState(null);
  const[dtab,setDtab]=useState("info");
  const[rawQ,setRawQ]=useState("");
  const[q,setQ]=useState("");
  const[filt,setFilt]=useState("همه");
  const[addModal,setAddModal]=useState(null);
  const[editRecord,setEditRecord]=useState(null);
  const[analysisTab,setAnalysisTab]=useState("mate");
  const[delId,setDelId]=useState(null);
  const[toast,setToast]=useState(null);
  const[editName,setEditName]=useState(null);
  const[editAnimalModal,setEditAnimalModal]=useState(false);
  const[formData,setFormData]=useState({});
  const updateForm=(k,v)=>setFormData(p=>({...p,[k]:v}));
  const resetForm=(initial={})=>setFormData(initial);
  const qRef=useRef(null);
  const syncRef=useRef(null);
  const sel=animals.find(a=>a.id===selId)||null;

  useEffect(()=>{
    const manifest={name:"وارگه چندکاربره",short_name:"وارگه",start_url:".",display:"standalone",background_color:"#0B1610",theme_color:"#5BBA6F",dir:"rtl",lang:"fa",icons:[{src:LOGO_192,sizes:"192x192",type:"image/png",purpose:"any maskable"}]};
    const blob=new Blob([JSON.stringify(manifest)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    let ml=document.querySelector("link[rel=manifest]");
    if(!ml){ml=document.createElement("link");ml.rel="manifest";document.head.appendChild(ml);}
    ml.href=url;
    let mt=document.querySelector("meta[name=theme-color]");
    if(!mt){mt=document.createElement("meta");mt.name="theme-color";document.head.appendChild(mt);}
    mt.content="#5BBA6F";
    let al=document.querySelector("link[rel=apple-touch-icon]");
    if(!al){al=document.createElement("link");al.rel="apple-touch-icon";document.head.appendChild(al);}
    al.href=LOGO_192;
    document.title="وارگه — هسته اصلاح‌نژاد";
  },[]);

  const readBin=useCallback(async()=>{
    if(!BIN_ID)return null;
    try{const res=await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`,{headers:{"X-Master-Key":MASTER_KEY,"X-Bin-Meta":"false"}});if(!res.ok)return null;const j=await res.json();return j.record||j;}catch{return null;}
  },[]);

  const writeBin=useCallback(async(data,userName)=>{
    try{
      if(!BIN_ID){const res=await fetch("https://api.jsonbin.io/v3/b",{method:"POST",headers:{"Content-Type":"application/json","X-Master-Key":MASTER_KEY,"X-Bin-Name":"vargeh-gelle","X-Bin-Private":"false"},body:JSON.stringify({animals:data,updatedBy:userName,updatedAt:new Date().toISOString()})});const j=await res.json();if(j.metadata?.id){BIN_ID=j.metadata.id;localStorage.setItem("vargeh_bin_id",BIN_ID);}}
      else{await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`,{method:"PUT",headers:{"Content-Type":"application/json","X-Master-Key":MASTER_KEY},body:JSON.stringify({animals:data,updatedBy:userName,updatedAt:new Date().toISOString()})});}
    }catch(e){throw e;}
  },[]);

  const animalsRef=useRef(animals);
  useEffect(()=>{animalsRef.current=animals;},[animals]);
  const lastWriteRef=useRef(0);

  const syncFromCloud=useCallback(async()=>{
    if(!user||!BIN_ID)return;
    if(Date.now()-lastWriteRef.current<5000)return;
    try{
      setSyncing(true);setSyncErr("");
      const rec=await readBin();
      if(rec?.animals){
        const newStr=JSON.stringify(rec.animals);
        const curStr=JSON.stringify(animalsRef.current);
        if(newStr!==curStr){
          setAnimals(rec.animals);
          localStorage.setItem("vargeh_animals",newStr);
        }
        setLastSync(new Date());
      }
    }
    catch{setSyncErr("خطا در دریافت");}
    finally{setSyncing(false);}
  },[user,readBin]);

  useEffect(()=>{if(!user)return;syncFromCloud();syncRef.current=setInterval(syncFromCloud,30000);return()=>clearInterval(syncRef.current);},[user,syncFromCloud]);
  useEffect(()=>{try{localStorage.setItem("vargeh_animals",JSON.stringify(animals));}catch{}},[animals]);
  useEffect(()=>{clearTimeout(qRef.current);qRef.current=setTimeout(()=>setQ(rawQ),260);return()=>clearTimeout(qRef.current);},[rawQ]);

  const toast_=(m,t="ok")=>{setToast({m,t});setTimeout(()=>setToast(null),2800);};

  const saveAnimals=useCallback(async(newA)=>{
    lastWriteRef.current=Date.now();
    setAnimals(newA);localStorage.setItem("vargeh_animals",JSON.stringify(newA));
    if(user){try{setSyncing(true);setSyncErr("");await writeBin(newA,user.name);setLastSync(new Date());}catch{setSyncErr("خطا در ذخیره ابری");}finally{setSyncing(false);}}
  },[user,writeBin]);

  const doLogin=()=>{const u=USERS.find(u=>u.nameEn===loginName&&u.pass===loginPass);if(!u){setLoginErr("نام کاربری یا رمز اشتباه");return;}setUser(u);localStorage.setItem("vargeh_user",JSON.stringify(u));setLoginErr("");};
  const doLogout=()=>{setUser(null);localStorage.removeItem("vargeh_user");setPage("dash");};
  const delAnimal=id=>{const na=animals.filter(a=>a.id!==id);saveAnimals(na);setPage("dash");setDelId(null);toast_("دام حذف شد","warn");};
  const delSub=(aid,field,rid)=>{const na=animals.map(a=>a.id!==aid?a:{...a,[field]:(a[field]||[]).filter(r=>r.id!==rid)});saveAnimals(na);toast_("حذف شد","warn");};
  const saveName=()=>{if(!editName)return;const na=animals.map(a=>a.id===editName.id?{...a,name:editName.value}:a);saveAnimals(na);setEditName(null);toast_("نام ذخیره شد");};

  const ewes=animals.filter(a=>a.type==="میش"&&a.status==="در گله");
  const rams=animals.filter(a=>a.type==="قوچ"&&a.status==="در گله");
  const birthCal=animals.filter(a=>a.status==="در گله").flatMap(a=>(a.reproductions||[]).filter(r=>r.result==="در انتظار"&&r.expectedBirthDate).map(r=>({aid:a.id,aname:a.name||a.id,gen:a.genotype,date:r.expectedBirthDate,dl:daysFrom(r.expectedBirthDate),s:r.season}))).sort((a,b)=>(a.dl||999)-(b.dl||999));
  const vaccAlerts=animals.flatMap(a=>(a.vaccines||[]).filter(v=>{const d=daysFrom(v.nextDate);return d!==null&&d<=14;}).map(v=>({aid:a.id,aname:a.name||a.id,vname:v.name,dl:daysFrom(v.nextDate)})));
  const totalC=animals.reduce((s,a)=>s+calcFin(a).c,0);
  const totalR=animals.reduce((s,a)=>s+calcFin(a).r,0);
  const filtered=animals.filter(a=>{const sq=q.toLowerCase();const ms=!sq||a.id.toLowerCase().includes(sq)||(a.name||"").includes(sq);const mf=filt==="همه"?true:["میش","قوچ","بره"].includes(filt)?a.type===filt:["BB","B+"].includes(filt)?a.genotype===filt:a.status===filt;return ms&&mf;});

  const cs={background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:16};
  const btnP={background:C.accent,color:"#0B1610",border:`1px solid ${C.accent}`,borderRadius:8,padding:"7px 14px",fontFamily:"inherit",fontSize:12,fontWeight:700,cursor:"pointer"};
  const btnD={background:C.dangerDim,color:C.danger,border:`1px solid ${C.danger}`,borderRadius:8,padding:"7px 14px",fontFamily:"inherit",fontSize:12,fontWeight:700,cursor:"pointer"};
  const btnG={background:"transparent",color:C.text,border:`1px solid ${C.border}`,borderRadius:8,padding:"7px 14px",fontFamily:"inherit",fontSize:12,fontWeight:700,cursor:"pointer"};
  const inpS={background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"9px 12px",color:C.text,fontFamily:"inherit",fontSize:14,width:"100%",outline:"none",boxSizing:"border-box"};
  const lbl={fontSize:11,color:C.textDim,marginBottom:4,display:"block",fontWeight:600};
  const g2={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))",gap:12};
  const g3={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:10};
  const navs=[{v:"dash",i:"📊",l:"داشبورد"},{v:"list",i:"🐑",l:"گله"},{v:"cal",i:"🗓️",l:"تقویم"},{v:"fin",i:"💰",l:"مالی"},{v:"ai",i:"🧬",l:"تحلیل"}];

  if(!user)return(
    <div style={{fontFamily:"'Vazirmatn',sans-serif",direction:"rtl",background:C.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}`}</style>
      <div style={{...cs,width:"100%",maxWidth:340,padding:32}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <img src={LOGO_SMALL} style={{width:80,height:80,borderRadius:16,marginBottom:12}} alt="وارگه"/>
          <div style={{fontWeight:800,fontSize:22,color:C.accent}}>وارگه</div>
          <div style={{fontSize:11,color:C.textDim,marginTop:4}}>هسته اصلاح‌نژاد قزل افشار</div>
        </div>
        <div style={{marginBottom:14}}>
          <label style={lbl}>نام کاربری</label>
          <select value={loginName} onChange={e=>setLoginName(e.target.value)} style={inpS}>
            <option value="">— انتخاب کنید —</option>
            {USERS.map(u=><option key={u.id} value={u.nameEn}>{u.name} ({u.role})</option>)}
          </select>
        </div>
        <div style={{marginBottom:20}}>
          <label style={lbl}>رمز عبور</label>
          <input type="password" value={loginPass} onChange={e=>setLoginPass(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")doLogin();}} placeholder="رمز خود را وارد کنید" style={inpS}/>
        </div>
        {loginErr&&<div style={{background:C.dangerDim,border:`1px solid ${C.danger}44`,borderRadius:8,padding:"8px 12px",marginBottom:14,fontSize:12,color:C.danger,textAlign:"center"}}>{loginErr}</div>}
        <button onClick={doLogin} style={{...btnP,width:"100%",padding:"12px",fontSize:15}}>ورود به سیستم</button>
      </div>
    </div>
  );

  return(
    <div style={{fontFamily:"'Vazirmatn',sans-serif",direction:"rtl",background:C.bg,minHeight:"100vh",color:C.text,fontSize:14,paddingBottom:62}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#263D2C;border-radius:2px;}input::placeholder,textarea::placeholder{color:#4E6B56;}select option{background:#142019;}button:active{opacity:.8;}`}</style>

      <div style={{background:C.surface,borderBottom:`1px solid ${C.border}`,padding:"0 12px",height:54,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:200}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {!navs.find(n=>n.v===page)&&<button onClick={()=>setPage(selId?"list":"dash")} style={{...btnG,padding:"4px 8px",fontSize:18}}>→</button>}
          <img src={LOGO_SMALL} style={{width:34,height:34,borderRadius:8,objectFit:"cover"}} alt="وارگه"/>
          <div>
            <div style={{fontWeight:800,color:C.accent,fontSize:13}}>وارگه <span style={{color:C.purple,fontSize:10}}>چندکاربره</span></div>
            <div style={{fontSize:9,color:C.textDim}}>هسته اصلاح‌نژاد قزل افشار</div>
          </div>
          {syncing&&<span style={{fontSize:10,color:C.gold,fontWeight:700}}>⏳</span>}
          {syncErr&&<span style={{fontSize:10,color:C.danger}}>⚠️ آفلاین</span>}
          {lastSync&&!syncing&&!syncErr&&<span style={{fontSize:9,color:C.accent}}>✓ {lastSync.toLocaleTimeString("fa-IR",{hour:"2-digit",minute:"2-digit"})}</span>}
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          <div style={{background:user.color+"22",color:user.color,border:`1px solid ${user.color}44`,borderRadius:6,padding:"2px 8px",fontSize:10,fontWeight:700}}>{user.name.split(" ")[0]}</div>
          {page==="list"&&<button onClick={()=>{resetForm({type:"میش",genotype:"BB",entryType:"خرید",status:"در گله"});setAddModal("animal");}} style={{...btnP,padding:"5px 10px"}}>+ ثبت</button>}
          {page==="detail"&&sel&&<button onClick={()=>setDelId(sel.id)} style={{...btnD,padding:"5px 10px"}}>🗑️</button>}
          <button onClick={doLogout} style={{...btnG,padding:"5px 10px",fontSize:11}}>خروج</button>
        </div>
      </div>

      {syncErr&&<div style={{background:C.dangerDim,borderBottom:`1px solid ${C.danger}44`,padding:"6px 14px",fontSize:11,color:C.danger,textAlign:"center"}}>⚠️ {syncErr}</div>}

      {page==="dash"&&(
        <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(110px,1fr))",gap:8,marginBottom:14}}>
            {[{l:"کل دام",v:animals.filter(a=>a.status==="در گله").length,c:C.accent,i:"🐑"},{l:"میش مولد",v:ewes.length,c:C.info,i:"♀"},{l:"قوچ",v:rams.length,c:C.gold,i:"♂"},{l:"بره متولد",v:animals.flatMap(a=>a.reproductions||[]).filter(r=>r.result==="زنده").reduce((s,r)=>s+(r.lambCount||0),0),c:C.accent,i:"🐣"}].map(it=>(
              <div key={it.l} style={{background:C.card,border:`1px solid ${it.c}33`,borderRadius:12,padding:"12px 6px",textAlign:"center"}}>
                <div style={{fontSize:20}}>{it.i}</div>
                <div style={{fontSize:24,fontWeight:800,color:it.c,lineHeight:1.2}}>{toP(it.v)}</div>
                <div style={{fontSize:10,color:C.textDim,marginTop:2}}>{it.l}</div>
              </div>
            ))}
          </div>
          {vaccAlerts.filter(v=>v.dl<=0).length>0&&(
            <div style={{...cs,marginBottom:12,borderColor:C.danger+"66"}}>
              <div style={{fontWeight:800,color:C.danger,marginBottom:8}}>🚨 واکسن سررسیده</div>
              {vaccAlerts.filter(v=>v.dl<=0).map((al,i)=>(
                <div key={i} onClick={()=>{setSelId(al.aid);setPage("detail");}} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}>
                  <span style={{fontWeight:700,color:C.accent}}>{al.aname}</span>
                  <span style={{fontSize:12,color:C.danger}}>{al.vname} — سررسیده!</span>
                </div>
              ))}
            </div>
          )}
          {birthCal.filter(e=>e.dl!==null&&e.dl<=14).length>0&&(
            <div style={{...cs,marginBottom:12,borderColor:C.gold+"55"}}>
              <div style={{fontWeight:700,color:C.gold,marginBottom:8}}>🐣 زایمان نزدیک</div>
              {birthCal.filter(e=>e.dl!==null&&e.dl<=14).map(e=>(
                <div key={e.aid+e.s} onClick={()=>{setSelId(e.aid);setPage("detail");}} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer"}}>
                  <span style={{fontWeight:700,color:C.accent}}>{e.aname}</span>
                  <span style={{fontWeight:800,color:e.dl<=7?C.danger:C.gold}}>{e.dl===0?"امروز!":`${toP(e.dl)} روز`}</span>
                </div>
              ))}
            </div>
          )}
          <div style={{...cs,borderColor:C.purple+"33"}}>
            <div style={{fontWeight:700,color:C.purple,marginBottom:10}}>🧬 امتیاز ژنتیکی</div>
            {ewes.length===0&&<div style={{color:C.textDim,fontSize:12}}>میشی ثبت نشده</div>}
            {ewes.map(e=>{const sc=calcScore(e);return sc?(
              <div key={e.id} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{flex:1,fontWeight:700}}>{e.name||e.id}</span>
                <div style={{width:60,background:C.border,borderRadius:4,height:5}}><div style={{background:sc.gc,borderRadius:4,height:5,width:`${sc.total}%`}}/></div>
                <span style={{fontWeight:800,color:sc.gc,fontSize:13}}>{toP(sc.total)}</span>
                <Bdg l={sc.grade} c={sc.gc} sm/>
              </div>
            ):null;})}
          </div>
        </div>
      )}

      {page==="list"&&(
        <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
            <input placeholder="🔍 جستجو..." value={rawQ} onChange={e=>setRawQ(e.target.value)} style={{...inpS,flex:1,minWidth:150}}/>
            <select value={filt} onChange={e=>setFilt(e.target.value)} style={{...inpS,width:110}}>
              {["همه","میش","قوچ","بره","BB","B+","در گله"].map(f=><option key={f}>{f}</option>)}
            </select>
          </div>
          <div style={{...cs,padding:0,overflow:"hidden"}}>
            {filtered.length===0&&<div style={{padding:40,textAlign:"center",color:C.textDim}}>دامی یافت نشد</div>}
            {filtered.map((a,i)=>{
              const lw=a.weights?.at(-1)?.weight;const sc=calcScore(a);
              return(
                <div key={a.id} onClick={()=>{setSelId(a.id);setDtab("info");setPage("detail");}}
                  style={{display:"grid",gridTemplateColumns:"1fr 80px 60px 70px",gap:6,padding:"10px 14px",borderBottom:`1px solid ${C.border}`,cursor:"pointer",background:i%2===1?C.surface+"44":"transparent",alignItems:"center"}}>
                  <div>
                    <div style={{fontWeight:700,color:C.accent,fontSize:13}}>{a.id}{a.name?` — ${a.name}`:""}</div>
                    <div style={{display:"flex",gap:4,marginTop:2,flexWrap:"wrap"}}>
                      <span style={{fontSize:10,color:C.textMid}}>{a.type}</span>
                      {a.hasFecBTest&&<Bdg l="ژنتیک✓" c={C.accent} sm/>}
                      {sc&&<Bdg l={`${toP(sc.total)}pt`} c={sc.gc} sm/>}
                      {isPregnant(a)&&<Bdg l="آبستن" c={C.gold} sm/>}
                    </div>
                  </div>
                  <Bdg l={a.genotype} c={gC(a.genotype)} sm/>
                  <div style={{fontWeight:700,color:lw?C.text:C.textDim,fontSize:12}}>{lw?`${toP(lw)}kg`:"—"}</div>
                  <Bdg l={a.status} c={sC(a.status)} sm/>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {page==="cal"&&(
        <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
          <div style={{fontWeight:800,fontSize:17,marginBottom:14,color:C.accent}}>🗓️ تقویم زایمان</div>
          {birthCal.length===0&&<div style={{...cs,textAlign:"center",padding:40,color:C.textDim}}>میش آبستنی ثبت نشده</div>}
          {birthCal.map(e=>(
            <div key={e.aid+e.s} onClick={()=>{setSelId(e.aid);setPage("detail");}} style={{...cs,marginBottom:10,cursor:"pointer",borderColor:e.dl!==null&&e.dl<=7?C.danger+"66":C.gold+"33"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontWeight:800,fontSize:14,color:C.accent}}>{e.aname}</div><div style={{fontSize:12,color:C.textMid}}>شکم {toP(e.s)}</div></div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:24,fontWeight:800,color:e.dl!==null&&e.dl<=7?C.danger:C.gold}}>{e.dl===null?"—":e.dl===0?"امروز!":e.dl<0?`${toP(Math.abs(e.dl))} روز گذشت`:`${toP(e.dl)} روز`}</div>
                  <div style={{fontSize:11,color:C.textDim}}>{e.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {page==="fin"&&(
        <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
          <div style={{fontWeight:800,fontSize:17,marginBottom:14,color:C.accent}}>💰 گزارش مالی</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:10,marginBottom:14}}>
            {[{l:"جمع هزینه‌ها",v:totalC,c:C.danger},{l:"جمع درآمدها",v:totalR,c:C.accent},{l:"سود / زیان",v:totalR-totalC,c:totalR-totalC>=0?C.accent:C.danger}].map(it=>(
              <div key={it.l} style={{background:C.card,border:`1px solid ${it.c}33`,borderRadius:12,padding:14,textAlign:"center"}}>
                <div style={{fontSize:11,color:C.textDim,marginBottom:5}}>{it.l}</div>
                <div style={{fontSize:13,fontWeight:800,color:it.c}}>{fmtRial(it.v)}</div>
              </div>
            ))}
          </div>
          <div style={cs}>
            {animals.map(a=>{const{c,r,p}=calcFin(a);return(
              <div key={a.id} onClick={()=>{setSelId(a.id);setPage("detail");}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer",flexWrap:"wrap",gap:6}}>
                <div><div style={{fontWeight:700,color:C.accent}}>{a.name||a.id}</div><div style={{fontSize:11,color:C.textMid}}>{a.type} · {a.genotype}</div></div>
                <div style={{display:"flex",gap:10}}>
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

      {page==="detail"&&sel&&(()=>{
        const a=sel;const{c:tc,r:tr,p:tp}=calcFin(a);
        const tabs=["info","vacc","repro","weight","treat","cost","rev","fin","note"];
        const tl={info:"هویت",vacc:"واکسن",repro:"زایمان",weight:"وزن",treat:"درمان",cost:"هزینه",rev:"درآمد",fin:"مالی",note:"یادداشت"};
        const subMap={vacc:"vaccine",weight:"weight",treat:"treat",repro:"repro",cost:"cost",rev:"rev",note:"note"};
        const btnEdit={background:"none",border:"none",color:C.gold,cursor:"pointer",fontSize:16,padding:"2px 6px"};
        const btnDel={background:"none",border:"none",color:C.danger,cursor:"pointer",fontSize:16,padding:"2px 6px"};
        return(
          <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
            <div style={{...cs,marginBottom:12,borderColor:C.accent+"33"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <div style={{width:46,height:46,background:C.accentGlow,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>{a.type==="قوچ"?"🐏":a.type==="بره"?"🐣":"🐑"}</div>
                  <div>
                    <button onClick={()=>setEditAnimalModal(true)} style={{...btnP,padding:"4px 10px",fontSize:11,marginBottom:6}}>✏️ ویرایش مشخصات</button>
                    {editName?.id===a.id?(
                      <div style={{display:"flex",gap:6,marginBottom:4}}>
                        <input value={editName.value} onChange={e=>setEditName(p=>({...p,value:e.target.value}))} onKeyDown={e=>{if(e.key==="Enter")saveName();if(e.key==="Escape")setEditName(null);}} style={{background:C.surface,border:`1px solid ${C.accent}`,borderRadius:6,padding:"4px 8px",color:C.text,fontFamily:"inherit",fontSize:16,fontWeight:800,width:140}} autoFocus/>
                        <button onClick={saveName} style={{...btnP,padding:"4px 10px",fontSize:12}}>✓</button>
                        <button onClick={()=>setEditName(null)} style={{...btnG,padding:"4px 8px",fontSize:12}}>✕</button>
                      </div>
                    ):(
                      <div style={{fontSize:17,fontWeight:800,marginBottom:4}}>{a.name||a.id}</div>
                    )}
                    <div style={{fontSize:12,color:C.textMid}}>{a.id} · {a.type} · {calcAge(a)}</div>
                    <div style={{display:"flex",gap:5,flexWrap:"wrap",marginTop:5}}>
                      <Bdg l={a.genotype} c={gC(a.genotype)} sm/>
                      <Bdg l={a.status} c={sC(a.status)} sm/>
                      {isPregnant(a)&&<Bdg l="🤰 آبستن" c={C.gold} sm/>}
                    </div>
                  </div>
                </div>
                <div style={{textAlign:"center"}}>
                  <div style={{fontSize:15,fontWeight:800,color:tp>=0?C.accent:C.danger}}>{fmtM(tp)}</div>
                  <div style={{fontSize:10,color:C.textDim}}>سود/زیان</div>
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:0,marginBottom:10,overflowX:"auto",borderBottom:`1px solid ${C.border}`}}>
              {tabs.map(t=><button key={t} onClick={()=>setDtab(t)} style={{background:"none",border:"none",borderBottom:`3px solid ${dtab===t?C.accent:"transparent"}`,color:dtab===t?C.accent:C.textMid,padding:"8px 10px",fontFamily:"inherit",fontSize:12,fontWeight:700,cursor:"pointer",whiteSpace:"nowrap"}}>{tl[t]}</button>)}
            </div>
            {subMap[dtab]&&<div style={{marginBottom:10}}><button onClick={()=>{setEditRecord(null);resetForm({});setAddModal(subMap[dtab]);}} style={{...btnP,padding:"6px 12px"}}>+ افزودن {tl[dtab]}</button></div>}

            {dtab==="info"&&<div style={cs}><div style={g3}>
              {[["کد",a.id],["نوع",a.type],["ژنوتیپ",a.genotype],["تولد",a.birthDate],["سن",calcAge(a)],["وزن ورود",a.entryWeight?`${toP(a.entryWeight)} کیلو`:null],["کد پدر",a.fatherCode||"—"],["کد مادر",a.motherCode||"—"],["وضعیت",a.status]].map(([l,v])=>(
                <div key={l}><div style={{fontSize:11,color:C.textDim,marginBottom:3,fontWeight:600}}>{l}</div><div style={{fontWeight:600}}>{v||"—"}</div></div>
              ))}
            </div></div>}

            {dtab==="vacc"&&<div style={cs}>
              {(!a.vaccines?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.vaccines||[]).map(v=>(<div key={v.id} style={{padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:700,color:C.accent}}>{v.name}</span>
                  <div style={{display:"flex",gap:4}}>
                    <button onClick={()=>{setEditRecord(v);resetForm({...v});setAddModal("vaccine");}} style={btnEdit}>✏️</button>
                    <button onClick={()=>delSub(a.id,"vaccines",v.id)} style={btnDel}>🗑</button>
                  </div>
                </div>
                <div style={{fontSize:11,color:C.textDim}}>{v.lastDate} ← {v.nextDate} · {v.vet||""}</div>
              </div>))}
            </div>}

            {dtab==="repro"&&<div style={{display:"flex",flexDirection:"column",gap:10}}>
              {(!a.reproductions?.length)&&<div style={{...cs,color:C.textDim,textAlign:"center"}}>ثبت نشده</div>}
              {(a.reproductions||[]).map(r=>(<div key={r.id} style={{...cs,borderColor:r.result==="در انتظار"?C.gold+"44":C.border}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                  <span style={{fontWeight:800}}>شکم {toP(r.season)}</span>
                  <div style={{display:"flex",gap:4,alignItems:"center"}}>
                    <Bdg l={r.result||"—"} c={r.result==="در انتظار"?C.gold:r.result==="زنده"?C.accent:C.danger} sm/>
                    <button onClick={()=>{setEditRecord(r);resetForm({...r});setAddModal("repro");}} style={btnEdit}>✏️</button>
                    <button onClick={()=>delSub(a.id,"reproductions",r.id)} style={btnDel}>🗑</button>
                  </div>
                </div>
                <div style={g3}>
                  {[["جفت‌گیری",r.matingDate],["احتمالی",r.expectedBirthDate],["واقعی",r.birthDate],["بره",r.lambCount?`${toP(r.lambCount)} رأس`:null]].map(([l,v])=>(
                    <div key={l}><div style={{fontSize:11,color:C.textDim}}>{l}</div><div style={{fontWeight:600}}>{v||"—"}</div></div>
                  ))}
                </div>
              </div>))}
            </div>}

            {dtab==="weight"&&<div style={cs}>
              {(!a.weights?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.weights||[]).map(w=>(<div key={w.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                <span style={{color:C.textMid,fontSize:12}}>{w.date}</span>
                <span style={{fontWeight:800,color:C.accent}}>{toP(w.weight)} کیلو</span>
                <div style={{display:"flex",gap:4}}>
                  <button onClick={()=>{setEditRecord(w);resetForm({...w});setAddModal("weight");}} style={btnEdit}>✏️</button>
                  <button onClick={()=>delSub(a.id,"weights",w.id)} style={btnDel}>🗑</button>
                </div>
              </div>))}
            </div>}

            {dtab==="treat"&&<div style={cs}>
              {(!a.treatments?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.treatments||[]).map(t=>(<div key={t.id} style={{padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <span style={{fontWeight:600}}>{t.event}</span>
                  <div style={{display:"flex",gap:4}}>
                    <button onClick={()=>{setEditRecord(t);resetForm({...t});setAddModal("treat");}} style={btnEdit}>✏️</button>
                    <button onClick={()=>delSub(a.id,"treatments",t.id)} style={btnDel}>🗑</button>
                  </div>
                </div>
                <div style={{fontSize:11,color:C.textDim}}>{t.date} · {t.drug||"—"}</div>
              </div>))}
            </div>}

            {dtab==="cost"&&<div style={cs}>
              {(!a.costs?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.costs||[]).map(c=>(<div key={c.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`,alignItems:"center"}}>
                <div><div style={{fontWeight:600}}>{c.category}</div><div style={{fontSize:11,color:C.textDim}}>{c.date}</div></div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{fontWeight:700,color:C.danger,fontSize:12}}>{fmtRial(+c.amount)}</span>
                  <button onClick={()=>{setEditRecord(c);resetForm({...c});setAddModal("cost");}} style={btnEdit}>✏️</button>
                  <button onClick={()=>delSub(a.id,"costs",c.id)} style={btnDel}>🗑</button>
                </div>
              </div>))}
              <div style={{marginTop:10,background:C.dangerDim,borderRadius:8,padding:"8px 12px"}}><span style={{color:C.textDim,fontSize:12}}>جمع: </span><span style={{fontWeight:800,color:C.danger}}>{fmtRial(tc)}</span></div>
            </div>}

            {dtab==="rev"&&<div style={cs}>
              {(!a.revenues?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.revenues||[]).map(r=>(<div key={r.id} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${C.border}`,alignItems:"center"}}>
                <div><div style={{fontWeight:600}}>{r.category}</div><div style={{fontSize:11,color:C.textDim}}>{r.date}</div></div>
                <div style={{display:"flex",gap:6,alignItems:"center"}}>
                  <span style={{fontWeight:700,color:C.accent,fontSize:12}}>{fmtRial(+r.amount)}</span>
                  <button onClick={()=>{setEditRecord(r);resetForm({...r});setAddModal("rev");}} style={btnEdit}>✏️</button>
                  <button onClick={()=>delSub(a.id,"revenues",r.id)} style={btnDel}>🗑</button>
                </div>
              </div>))}
              <div style={{marginTop:10,background:C.accentGlow,borderRadius:8,padding:"8px 12px"}}><span style={{color:C.textDim,fontSize:12}}>جمع: </span><span style={{fontWeight:800,color:C.accent}}>{fmtRial(tr)}</span></div>
            </div>}

            {dtab==="fin"&&<div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[{l:"جمع هزینه‌ها",v:tc,c:C.danger},{l:"جمع درآمدها",v:tr,c:C.accent},{l:"سود / زیان",v:tp,c:tp>=0?C.accent:C.danger}].map(it=>(
                <div key={it.l} style={{...cs,display:"flex",justifyContent:"space-between",alignItems:"center",borderColor:it.c+"33"}}>
                  <span style={{color:C.textMid}}>{it.l}</span>
                  <span style={{fontSize:16,fontWeight:800,color:it.c}}>{fmtRial(it.v)}</span>
                </div>
              ))}
            </div>}

            {dtab==="note"&&<div style={cs}>
              {(!a.quickNotes?.length)&&<div style={{color:C.textDim,padding:"20px 0",textAlign:"center"}}>ثبت نشده</div>}
              {(a.quickNotes||[]).slice().reverse().map(n=>(<div key={n.id} style={{padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div><div style={{fontSize:11,color:C.textDim,marginBottom:3}}>{n.date}</div><div style={{lineHeight:1.6}}>{n.note}</div></div>
                  <div style={{display:"flex",gap:4}}>
                    <button onClick={()=>{setEditRecord(n);resetForm({...n});setAddModal("note");}} style={btnEdit}>✏️</button>
                    <button onClick={()=>delSub(a.id,"quickNotes",n.id)} style={btnDel}>🗑</button>
                  </div>
                </div>
              </div>))}
            </div>}
          </div>
        );
      })()}

      {page==="ai"&&(()=>{
        const mateResults=ewes.map(ewe=>{const res=rams.map(ram=>({ram,result:calcMate(ewe,ram)})).sort((a,b)=>b.result.score-a.result.score);return{ewe,rams:res,sc:calcScore(ewe)};});
        const cullList=ewes.map(ewe=>({ewe,...calcCull(ewe)})).filter(x=>x.urgency>0).sort((a,b)=>b.urgency-a.urgency);
        const vaccPlan=[{name:"تب برفکی",season:"فروردین و مهر",freq:"۲ بار",target:"تمام گله",law:true},{name:"بروسلوز",season:"پاییز",freq:"یک‌بار عمر",target:"میش نابالغ",law:true},{name:"آنتروتوکسمی",season:"۴ هفته قبل زایمان",freq:"سالانه",target:"میش آبستن",law:false},{name:"آبله گوسفند",season:"مهر",freq:"سالانه",target:"تمام گله",law:false},{name:"پاستورلوز",season:"پاییز",freq:"سالانه",target:"تمام گله",law:false}];
        const overdueV=animals.filter(a=>a.status==="در گله").flatMap(a=>(a.vaccines||[]).filter(v=>{const d=daysFrom(v.nextDate);return d!==null&&d<=30;}).map(v=>({aid:a.id,aname:a.name||a.id,vname:v.name,dl:daysFrom(v.nextDate)})));
        return(
          <div style={{padding:14,maxWidth:960,margin:"0 auto"}}>
            <div style={{fontWeight:800,fontSize:15,marginBottom:14}}>🧬 تحلیل هوشمند وارگه</div>
            <div style={{display:"flex",gap:0,marginBottom:16,borderBottom:`1px solid ${C.border}`}}>
              {[{id:"mate",l:"🔗 جفت‌گیری"},{id:"cull",l:"⚠️ حذف"},{id:"vacc",l:"💉 واکسن"}].map(t=>(
                <button key={t.id} onClick={()=>setAnalysisTab(t.id)} style={{background:"none",border:"none",borderBottom:`3px solid ${analysisTab===t.id?C.accent:"transparent"}`,color:analysisTab===t.id?C.accent:C.textMid,padding:"10px 14px",fontFamily:"inherit",fontSize:13,fontWeight:700,cursor:"pointer"}}>{t.l}</button>
              ))}
            </div>
            {analysisTab==="mate"&&mateResults.map(({ewe,rams:ramResults})=>(
              <div key={ewe.id} style={{...cs,marginBottom:14}}>
                <div style={{fontWeight:800,fontSize:14,marginBottom:10}}>🐑 {ewe.name||ewe.id}</div>
                {ramResults.map(({ram,result},i)=>(
                  <div key={ram.id} style={{background:result.blocked?C.dangerDim:i===0?C.accentGlow:"transparent",border:`1px solid ${result.blocked?C.danger:i===0?C.accent:C.border}`,borderRadius:10,padding:"10px 12px",marginBottom:8}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,flexWrap:"wrap",gap:8}}>
                      <div style={{fontWeight:700}}>{result.blocked?"🚫":"🐏"} {ram.name||ram.id} ({ram.genotype})</div>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <span style={{fontSize:20,fontWeight:800,color:result.blocked?C.danger:result.verdictColor}}>{result.blocked?"—":toP(result.score)}</span>
                        <Bdg l={result.blocked?"مجاز نیست":result.verdict} c={result.blocked?C.danger:result.verdictColor} sm/>
                      </div>
                    </div>
                    {result.errors.map((e,j)=><div key={j} style={{fontSize:12,color:C.danger,fontWeight:600,marginBottom:2}}>{e}</div>)}
                    {result.oks.map((o,j)=><div key={j} style={{fontSize:12,color:C.textMid,marginBottom:2}}>{o}</div>)}
                    {result.warns.map((w,j)=><div key={j} style={{fontSize:12,color:C.warn,marginBottom:2}}>{w}</div>)}
                  </div>
                ))}
              </div>
            ))}
            {analysisTab==="cull"&&(cullList.length===0?
              <div style={{...cs,textAlign:"center",padding:40}}><div style={{fontSize:40,marginBottom:10}}>✅</div><div style={{fontWeight:700,color:C.accent}}>همه میش‌ها وضعیت قابل قبول دارند</div></div>:
              cullList.map(({ewe,reasons,urgency})=>(
                <div key={ewe.id} style={{...cs,marginBottom:10,borderColor:urgency>=4?C.danger+"66":C.warn+"44"}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,flexWrap:"wrap",gap:6}}>
                    <div style={{fontWeight:800}}>{ewe.name||ewe.id}</div>
                    <Bdg l={urgency>=5?"حذف فوری":urgency>=3?"پیشنهاد حذف":"بررسی"} c={urgency>=5?C.danger:urgency>=3?C.warn:C.textDim} sm/>
                  </div>
                  {reasons.map((r,i)=><div key={i} style={{fontSize:12,color:C.textMid,marginBottom:3}}>• {r}</div>)}
                </div>
              ))
            )}
            {analysisTab==="vacc"&&<div>
              {overdueV.length>0&&<div style={{...cs,marginBottom:12,borderColor:C.danger+"66"}}>
                <div style={{fontWeight:700,color:C.danger,marginBottom:8}}>🚨 فوری</div>
                {overdueV.map((v,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:`1px solid ${C.border}`}}>
                  <span style={{fontWeight:600}}>{v.aname} — {v.vname}</span>
                  <Bdg l={v.dl<=0?"سررسیده!":v.dl===0?"امروز":`${toP(v.dl)} روز`} c={v.dl<=0?C.danger:C.warn} sm/>
                </div>)}
              </div>}
              {vaccPlan.map((v,i)=>(
                <div key={i} style={{...cs,marginBottom:8,borderColor:v.law?C.danger+"44":C.accent+"33"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6}}>
                    <div style={{fontWeight:700}}>{v.name}{v.law&&<Bdg l="⚡ قانونی" c={C.danger} sm/>}</div>
                    <span style={{fontSize:11,color:C.gold}}>{v.season}</span>
                  </div>
                  <div style={{fontSize:11,color:C.textDim,marginTop:4}}>{v.freq} · {v.target}</div>
                </div>
              ))}
            </div>}
          </div>
        );
      })()}

      <div style={{position:"fixed",bottom:0,left:0,right:0,background:C.surface,borderTop:`1px solid ${C.border}`,display:"flex",zIndex:150}}>
        {navs.map(n=>(
          <button key={n.v} onClick={()=>setPage(n.v)} style={{flex:1,background:"none",border:"none",padding:"10px 2px 8px",cursor:"pointer",color:page===n.v?C.accent:C.textDim,fontFamily:"inherit",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <span style={{fontSize:18}}>{n.i}</span>
            <span style={{fontSize:9,fontWeight:700}}>{n.l}</span>
          </button>
        ))}
      </div>

      {addModal==="animal"&&<AddAnimal onClose={()=>{setAddModal(null);resetForm({});}} animals={animals} saveAnimals={saveAnimals} toast_={toast_} formData={formData} updateForm={updateForm} resetForm={resetForm}/>}
      {addModal&&addModal!=="animal"&&sel&&<SubForm key={addModal+(editRecord?.id||"new")} type={addModal} aid={sel.id} onClose={()=>{setAddModal(null);setEditRecord(null);resetForm({});}} animals={animals} saveAnimals={saveAnimals} toast_={toast_} editRecord={editRecord} formData={formData} updateForm={updateForm}/>}
      {editAnimalModal&&sel&&<EditAnimal key={sel.id+"_edit"} onClose={()=>setEditAnimalModal(false)} animal={sel} animals={animals} saveAnimals={saveAnimals} toast_={toast_}/>}

      {delId&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:900,padding:16}}>
          <div style={{...cs,border:`1px solid ${C.danger}55`,maxWidth:300,width:"100%",textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:10}}>⚠️</div>
            <div style={{fontWeight:700,fontSize:15,marginBottom:6}}>حذف دام {delId}؟</div>
            <div style={{color:C.textDim,fontSize:12,marginBottom:20}}>این عمل برگشت‌پذیر نیست.</div>
            <div style={{display:"flex",gap:10,justifyContent:"center"}}>
              <button onClick={()=>setDelId(null)} style={{...btnG,padding:"10px 20px"}}>انصراف</button>
              <button onClick={()=>delAnimal(delId)} style={{...btnD,padding:"10px 20px"}}>حذف</button>
            </div>
          </div>
        </div>
      )}

      {toast&&<div style={{position:"fixed",bottom:68,left:"50%",transform:"translateX(-50%)",background:toast.t==="err"?C.danger:toast.t==="warn"?C.warn:C.accent,color:"#0B1610",borderRadius:10,padding:"10px 22px",fontWeight:700,fontSize:13,zIndex:9999,boxShadow:"0 4px 20px rgba(0,0,0,0.6)",pointerEvents:"none",whiteSpace:"nowrap"}}>{toast.m}</div>}
    </div>
  );
}
