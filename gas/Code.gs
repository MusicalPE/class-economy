// ============================================================
//  돈워리! — Code.gs (라이브러리)
// ============================================================

const SHEET_NAMES = {
  STUDENTS   : '학생',
  JOBS       : '직업',
  ASSIGN     : '배정',
  SALARY     : '월급설정',
  ITEMS      : '물품',
  LEDGER     : '거래내역',
  SHOPPERMS  : '상점권한',
  PASSWORDS  : '비밀번호',
  PW_REQUESTS: '변경요청',
  BANK_PERMS : '은행권한',
  SAVINGS    : '적금',
  TREASURY   : '학급금고',
  SUGGESTIONS: '건의사항',
  PAYLOG     : '급여지급기록',
  SETTINGS   : '설정'
};

const APP_VERSION = '2.1.0';

// 화면이 올라가 있는 주소 (GitHub Pages)
const APP_URL = 'https://musicalpe.github.io/class-economy/';

/* ──────────────────────────────────────────────────────────────
   웹앱 입구
   선생님이 배포한 /exec 주소로 들어오면 화면으로 보내 줍니다.
   학생에게는 지금까지처럼 /exec 주소만 알려 주면 됩니다.
   ────────────────────────────────────────────────────────────── */
function doGet(e, selfUrl) {
  const target = APP_URL + '?app=' + encodeURIComponent(selfUrl || '');
  const html =
    '<!DOCTYPE html><meta charset="utf-8"><title>돈워리!</title>' +
    '<body style="font-family:sans-serif;padding:28px;color:#374151">' +
    '<p>화면을 여는 중입니다...</p>' +
    '<p><a href="' + target + '" target="_top">열리지 않으면 여기를 눌러 주세요</a></p>' +
    '<script>window.top.location.href=' + JSON.stringify(target) + ';<\/script>';
  return HtmlService.createHtmlOutput(html)
    .setTitle('돈워리!')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/* ──────────────────────────────────────────────────────────────
   화면에서 오는 요청 처리
   { fn: '함수이름', args: [...] } 를 받아 아래 목록에 있는
   함수만 실행합니다. 목록에 없는 이름은 거부합니다.
   ────────────────────────────────────────────────────────────── */
function _apiTable() {
  return {
    ping: function () { return { ok: true, version: APP_VERSION }; },
    adjustBalance: adjustBalance,
    applyTax: applyTax,
    approveSaving: approveSaving,
    assignJob: assignJob,
    cancelPayPeriod: cancelPayPeriod,
    cancelSavingEarly: cancelSavingEarly,
    changeAdminPw: changeAdminPw,
    changeStudentPwDirect: changeStudentPwDirect,
    createSaving: createSaving,
    createSavingByTeacher: createSavingByTeacher,
    deleteBankPerm: deleteBankPerm,
    deleteItem: deleteItem,
    deleteJob: deleteJob,
    deleteShopPerm: deleteShopPerm,
    deleteStudent: deleteStudent,
    deleteSuggestion: deleteSuggestion,
    getAllPasswords: getAllPasswords,
    getLedger: getLedger,
    getLoginSettings: getLoginSettings,
    getRestockStatus: getRestockStatus,
    getSalaryTargets: getSalaryTargets,
    getSavings: getSavings,
    getStudentShopPerms: getStudentShopPerms,
    getStudentsForLogin: getStudentsForLogin,
    getSuggestions: getSuggestions,
    getTreasuryLedger: getTreasuryLedger,
    getTreasuryStats: getTreasuryStats,
    initRefillTrigger: initRefillTrigger,
    initSavingsTrigger: initSavingsTrigger,
    loadAll: loadAll,
    payBonus: payBonus,
    paySelectedSalaries: paySelectedSalaries,
    processAutoRefill: processAutoRefill,
    processBuy: processBuy,
    processBuyByShopkeeper: processBuyByShopkeeper,
    processMatureSavings: processMatureSavings,
    refreshStudentData: refreshStudentData,
    rejectSaving: rejectSaving,
    repairLedgerMonths: repairLedgerMonths,
    replySuggestion: replySuggestion,
    resetAllPasswords: resetAllPasswords,
    resetClassData: resetClassData,
    resetRestockLimit: resetRestockLimit,
    resetStudentData: resetStudentData,
    resetStudentPw: resetStudentPw,
    restockItem: restockItem,
    saveBankPerm: saveBankPerm,
    saveBankSettings: saveBankSettings,
    saveItem: saveItem,
    saveJob: saveJob,
    saveLoginSettings: saveLoginSettings,
    saveShopPerm: saveShopPerm,
    saveStudent: saveStudent,
    setSalaryConfig: setSalaryConfig,
    setStudentPwAdmin: setStudentPwAdmin,
    shopkeeperChangePrice: shopkeeperChangePrice,
    shopkeeperChangeStock: shopkeeperChangeStock,
    shopkeeperDeleteItem: shopkeeperDeleteItem,
    shopkeeperSaveItem: shopkeeperSaveItem,
    submitSuggestion: submitSuggestion,
    treasuryDeposit: treasuryDeposit,
    treasurySpend: treasurySpend,
    updateJobSlot: updateJobSlot,
    verifyAdminLogin: verifyAdminLogin,
    verifyStudentLogin: verifyStudentLogin
  };
}

function doPost(e) {
  let out;
  try {
    const req  = JSON.parse(e.postData.contents);
    const fn   = String(req.fn || '');
    const args = req.args || [];
    const table = _apiTable();
    if (!Object.prototype.hasOwnProperty.call(table, fn)) {
      throw new Error('허용되지 않은 요청입니다: ' + fn);
    }
    if (fn !== 'ping') ensureInit();
    out = { __r: table[fn].apply(null, args) };
  } catch (err) {
    out = { __error: String((err && err.message) || err) };
  }
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ──────────────────────────────────────────────────────────────
   설정 저장소
   예전에는 ScriptProperties 에 저장했습니다. 그런데 라이브러리
   방식에서는 그 값이 학교별로 나뉘지 않아, 한 학교가 제목이나
   비밀번호를 바꾸면 다른 학교까지 바뀔 수 있습니다.
   그래서 학교 시트 안의 '설정' 시트에 저장합니다.
   쓰는 방법(getProperty / setProperty)은 전과 같습니다.
   ────────────────────────────────────────────────────────────── */
var _SETTINGS_CACHE = null;

function _settingsMap() {
  if (_SETTINGS_CACHE) return _SETTINGS_CACHE;
  const sh = getSheet(SHEET_NAMES.SETTINGS);
  const m = {};
  if (sh.getLastRow() > 1) {
    sh.getRange(2, 1, sh.getLastRow() - 1, 2).getValues().forEach(function (r) {
      if (r[0] !== '' && r[0] !== null) m[String(r[0])] = String(r[1]);
    });
  }
  _SETTINGS_CACHE = m;
  return m;
}

function _props() {
  return {
    getProperty: function (k) {
      const m = _settingsMap();
      return Object.prototype.hasOwnProperty.call(m, k) ? m[k] : null;
    },
    setProperty: function (k, v) {
      const sh = getSheet(SHEET_NAMES.SETTINGS);
      const rows = sh.getLastRow() > 1
        ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getValues() : [];
      let ri = -1;
      for (let i = 0; i < rows.length; i++) {
        if (String(rows[i][0]) === String(k)) { ri = i; break; }
      }
      if (ri >= 0) sh.getRange(ri + 2, 2).setValue(String(v));
      else sh.appendRow([String(k), String(v)]);
      if (_SETTINGS_CACHE) _SETTINGS_CACHE[String(k)] = String(v);
      return this;
    },
    getProperties: function () {
      const m = _settingsMap(), o = {};
      Object.keys(m).forEach(function (k) { o[k] = m[k]; });
      return o;
    }
  };
}

/* 2.0 이전 판에서 올라올 때 한 번만 쓰는 기능입니다.
   예전 스크립트 속성에 있던 설정을 '설정' 시트로 옮깁니다.
   새로 설치한 학교에서는 쓸 일이 없습니다. */
function importLegacySettings(oldProps) {
  ensureInit();
  const keys = ['ADMIN_PW','APP_THEME','APP_ICON','BANK_RATE_15','BANK_RATE_30',
                'LOGIN_TITLE','LOGIN_SUBTITLE','LOGIN_LOGO_TYPE','LOGIN_EMOJI',
                'LOGIN_LOGO_URL','RESTOCK_LOG'];
  const p = _props();
  let n = 0;
  keys.forEach(function (k) {
    if (oldProps && oldProps[k] !== undefined && oldProps[k] !== null && oldProps[k] !== '') {
      p.setProperty(k, oldProps[k]); n++;
    }
  });
  return { ok: true, count: n };
}

// ── 시트 초기화 ──────────────────────────────────────────────
function initSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const headers = {
    [SHEET_NAMES.STUDENTS]   : ['번호','이름','잔액','초기잔액'],
    [SHEET_NAMES.JOBS]       : ['직업명','기본급여','최대인원','설명'],
    [SHEET_NAMES.ASSIGN]     : ['학생번호','직업명'],
    [SHEET_NAMES.SALARY]     : ['월','직업명','급여'],
    [SHEET_NAMES.ITEMS]      : ['물품명','가격','재고','설명','카테고리','자동리필','리필수량','마지막리필'],
    [SHEET_NAMES.LEDGER]     : ['날짜','월','학생번호','학생이름','유형','상세','금액','잔액','금고잔액'],
    [SHEET_NAMES.SHOPPERMS]  : ['직업명','카테고리','권한'],
    [SHEET_NAMES.PASSWORDS]  : ['학생번호','비밀번호'],
    [SHEET_NAMES.PW_REQUESTS]: ['학생번호','학생이름','요청비밀번호','요청일시','상태'],
    [SHEET_NAMES.BANK_PERMS] : ['직업명','역할'],
    [SHEET_NAMES.SAVINGS]    : ['ID','예금주번호','예금주이름','은행직원번호','원금','이자율(%)','기간(일)','시작일','만기일','상태','지급액'],
    [SHEET_NAMES.TREASURY]   : ['날짜','월','구분','유형','내용','금액','잔액'],
    [SHEET_NAMES.SUGGESTIONS]: ['날짜','학생번호','학생이름','분류','제목','내용','이유','상태','교사답변','답변일'],
    [SHEET_NAMES.PAYLOG]     : ['회차','학생번호','학생이름','직업','금액','지급일'],
    [SHEET_NAMES.SETTINGS]   : ['설정키','값']
  };
  Object.entries(headers).forEach(([name,cols])=>{
    let sh=ss.getSheetByName(name);
    if(!sh){sh=ss.insertSheet(name);sh.getRange(1,1,1,cols.length).setValues([cols]).setFontWeight('bold').setBackground('#1a56db').setFontColor('#ffffff');sh.setFrozenRows(1);}
  });
  const jobSh=ss.getSheetByName(SHEET_NAMES.JOBS);
  if(jobSh.getLastRow()<=1){jobSh.getRange(2,1,7,4).setValues([['반장',2000,1,'학급 대표'],['부반장',1800,1,'반장 보조'],['환경부장',1500,2,'교실 환경 관리'],['학습부장',1500,2,'학습 관련 관리'],['도서부장',1200,2,'도서 관리'],['상점지기',2500,1,'학급 상점 운영'],['은행직원',2000,2,'학급 은행 운영']]);}
  const itemSh=ss.getSheetByName(SHEET_NAMES.ITEMS);
  if(itemSh.getLastRow()<=1){itemSh.getRange(2,1,5,5).setValues([['자리 선택권',3000,-1,'원하는 자리에 앉을 수 있는 1회 사용권','특권'],['숙제 면제권',5000,5,'숙제 1회 면제','특권'],['간식 쿠폰',1500,20,'간식 1개','간식'],['음료 쿠폰',1000,15,'음료 1개','간식'],['칭찬 스티커',500,50,'칭찬 스티커 1장','문구']]);}
  const permSh=ss.getSheetByName(SHEET_NAMES.SHOPPERMS);
  if(permSh.getLastRow()<=1){permSh.getRange(2,1,1,3).setValues([['상점지기','전체','전체관리']]);}
  const bankSh=ss.getSheetByName(SHEET_NAMES.BANK_PERMS);
  if(bankSh.getLastRow()<=1){bankSh.getRange(2,1,1,2).setValues([['은행직원','은행직원']]);}
  return {ok:true};
}

// ── 유틸 ─────────────────────────────────────────────────────
var _initDone = false;
function ensureInit(){
  if(_initDone)return;
  initSheets();
  _initDone = true;
}
function getSheet(name){const ss=SpreadsheetApp.getActiveSpreadsheet();let sh=ss.getSheetByName(name);if(!sh){initSheets();sh=ss.getSheetByName(name);}return sh;}
function sheetToArray(name){const sh=getSheet(name);if(sh.getLastRow()<=1)return[];return sh.getRange(2,1,sh.getLastRow()-1,sh.getLastColumn()).getValues();}
function todayStr(){return Utilities.formatDate(new Date(),Session.getScriptTimeZone(),'yyyy-MM-dd');}
function dateAddDays(d,days){const r=new Date(d);r.setDate(r.getDate()+days);return Utilities.formatDate(r,Session.getScriptTimeZone(),'yyyy-MM-dd');}

// ── 직업명 변경 시 관련 시트 일괄 업데이트 ──────────────────────
function _cascadeJobRename(oldName, newName) {
  if (oldName === newName) return;
  [[SHEET_NAMES.ASSIGN,2],[SHEET_NAMES.SALARY,2],[SHEET_NAMES.SHOPPERMS,1],[SHEET_NAMES.BANK_PERMS,1]].forEach(([sn,col])=>{
    const sh=getSheet(sn);
    const rows=sheetToArray(sn);
    rows.forEach((r,i)=>{if(r[col-1]===oldName)sh.getRange(i+2,col).setValue(newName);});
  });
}

// ── 학생 ─────────────────────────────────────────────────────
function getStudents(){
  return sheetToArray(SHEET_NAMES.STUDENTS).map(function(r){
    var init = (r[3]===''||r[3]===null||r[3]===undefined) ? Number(r[2])||0 : Number(r[3])||0;
    return {num:r[0], name:r[1], balance:Number(r[2])||0, initial:init};
  });
}

// 특정 학생의 거래 합계 (초기잔액 이후 변동분)
function _ledgerSum(studentNum){
  var sh=getSheet(SHEET_NAMES.LEDGER);
  var last=sh.getLastRow();
  if(last<=1)return 0;
  var rows=sh.getRange(2,3,last-1,5).getValues(); // 학생번호(3)~금액(7)
  var sum=0;
  for(var i=0;i<rows.length;i++){
    if(String(rows[i][0])===String(studentNum)) sum+=Number(rows[i][4])||0;
  }
  return sum;
}

// 초기잔액 + 거래합계 로 잔액 재계산
function recalcBalance(rowIdx, studentNum, initial){
  var bal=Math.max(0, Number(initial)+_ledgerSum(studentNum));
  getSheet(SHEET_NAMES.STUDENTS).getRange(rowIdx+2,3).setValue(bal);
  return bal;
}
function saveStudent(data){
  const sh=getSheet(SHEET_NAMES.STUDENTS);
  const initial=Number(data.balance)||0;
  if(data.editIdx===-1){
    // 신규: 초기잔액 = 잔액
    sh.appendRow([data.num,data.name,initial,initial]);
    _ensurePassword(data.num,String(data.num));
    return{ok:true,balance:initial};
  }
  // 수정: 초기잔액만 바꾸고 잔액은 거래내역 반영해 재계산
  sh.getRange(data.editIdx+2,1,1,2).setValues([[data.num,data.name]]);
  sh.getRange(data.editIdx+2,4).setValue(initial);
  const bal=recalcBalance(data.editIdx,data.num,initial);
  return{ok:true,balance:bal};
}
function deleteStudent(idx){getSheet(SHEET_NAMES.STUDENTS).deleteRow(idx+2);return{ok:true};}
function adjustBalance(idx,amount,memo){
  const sh=getSheet(SHEET_NAMES.STUDENTS),current=sh.getRange(idx+2,3).getValue(),newBal=Math.max(0,current+Number(amount));
  sh.getRange(idx+2,3).setValue(newBal);
  const s=getStudents()[idx];
  appendLedger(s.num,s.name,'수동조정',memo||'잔액수동조정',Number(amount),newBal);
  return{ok:true,balance:newBal};
}

// ── 직업 ─────────────────────────────────────────────────────
function getJobs(){return sheetToArray(SHEET_NAMES.JOBS).map(r=>({name:r[0],salary:r[1],slots:r[2],desc:r[3]}));}
function saveJob(data){
  const sh=getSheet(SHEET_NAMES.JOBS);
  if(data.editIdx===-1){sh.appendRow([data.name,Number(data.salary),Number(data.slots),data.desc||'']);}
  else{
    const old=sheetToArray(SHEET_NAMES.JOBS)[data.editIdx];
    if(old&&old[0]!==data.name)_cascadeJobRename(old[0],data.name);
    sh.getRange(data.editIdx+2,1,1,4).setValues([[data.name,Number(data.salary),Number(data.slots),data.desc||'']]);
  }
  return{ok:true};
}
function deleteJob(idx){getSheet(SHEET_NAMES.JOBS).deleteRow(idx+2);return{ok:true};}
function updateJobSlot(idx,delta){const sh=getSheet(SHEET_NAMES.JOBS),cell=sh.getRange(idx+2,3),nv=Math.max(1,Math.min(99,cell.getValue()+delta));cell.setValue(nv);return{ok:true,slots:nv};}

// ── 배정 ─────────────────────────────────────────────────────
function getAssignments(){return sheetToArray(SHEET_NAMES.ASSIGN).map(r=>({studentNum:r[0],jobName:r[1]}));}
function assignJob(studentNum,jobName){
  const sh=getSheet(SHEET_NAMES.ASSIGN),rows=sheetToArray(SHEET_NAMES.ASSIGN),ri=rows.findIndex(r=>String(r[0])===String(studentNum));
  if(jobName===''||jobName==null){if(ri>=0)sh.deleteRow(ri+2);}
  else{if(ri>=0)sh.getRange(ri+2,1,1,2).setValues([[studentNum,jobName]]);else sh.appendRow([studentNum,jobName]);}
  return{ok:true};
}

// ── 급여 설정 ────────────────────────────────────────────────
function getSalaryConfig(){return sheetToArray(SHEET_NAMES.SALARY).map(r=>({month:r[0],jobName:r[1],salary:r[2]}));}
function setSalaryConfig(month,jobName,salary){
  const sh=getSheet(SHEET_NAMES.SALARY),rows=sheetToArray(SHEET_NAMES.SALARY),ri=rows.findIndex(r=>String(r[0])===String(month)&&r[1]===jobName);
  if(salary===''||salary==null){if(ri>=0)sh.deleteRow(ri+2);}
  else{if(ri>=0)sh.getRange(ri+2,1,1,3).setValues([[month,jobName,Number(salary)]]);else sh.appendRow([month,jobName,Number(salary)]);}
  return{ok:true};
}

// ── 급여 지급 ────────────────────────────────────────────────

// 회차 키: "8-1" (8월 상반기), "8-2" (8월 하반기)
function makePeriodKey(month, half){
  return String(month)+'-'+String(half);
}
function periodLabel(month, half){
  return String(month)+'월 '+(String(half)==='1'?'상반기':'하반기');
}

// 오늘 날짜 기준 현재 회차 (1~15일=상반기, 16일~=하반기)
function getCurrentPeriod(){
  var tz=Session.getScriptTimeZone();
  var now=new Date();
  var m=Number(Utilities.formatDate(now,tz,'M'));
  var d=Number(Utilities.formatDate(now,tz,'d'));
  return {month:m, half:(d<=15?1:2), key:makePeriodKey(m,(d<=15?1:2))};
}

// 이미 지급받은 학생 번호 목록
function _paidNums(periodKey){
  var rows=sheetToArray(SHEET_NAMES.PAYLOG);
  var set={};
  for(var i=0;i<rows.length;i++){
    if(_s(rows[i][0])===String(periodKey)) set[String(rows[i][1])]=true;
  }
  return set;
}

// 급여 대상과 총액 계산 (내부 공용)
function _salaryTargets(month, half){
  var students=getStudents(),jobs=getJobs(),assigns=getAssignments(),cfg=getSalaryConfig();
  var paid=_paidNums(makePeriodKey(month,half));
  var targets=[],total=0;
  for(var n=0;n<students.length;n++){
    var s=students[n];
    var asgn=null;
    for(var i=0;i<assigns.length;i++){
      if(String(assigns[i].studentNum)===String(s.num)){ asgn=assigns[i]; break; }
    }
    if(!asgn)continue;
    var job=null;
    for(var j=0;j<jobs.length;j++){
      if(jobs[j].name===asgn.jobName){ job=jobs[j]; break; }
    }
    if(!job)continue;
    var cfgRow=null;
    for(var k=0;k<cfg.length;k++){
      if(String(cfg[k].month)===String(month)&&cfg[k].jobName===job.name){ cfgRow=cfg[k]; break; }
    }
    var amt=cfgRow?Number(cfgRow.salary):Number(job.salary);
    if(!amt||amt<=0)continue;
    targets.push({num:s.num,name:s.name,rowIdx:n,balance:s.balance,
                  jobName:job.name,amt:amt,paid:!!paid[String(s.num)]});
    total+=amt;
  }
  return {targets:targets,total:total};
}

// 선택 지급용 대상 목록
function getSalaryTargets(month, half){
  var r=_salaryTargets(month,half);
  var list=[];
  for(var i=0;i<r.targets.length;i++){
    var t=r.targets[i];
    list.push({num:_s(t.num),name:_s(t.name),jobName:_s(t.jobName),
               amt:_n(t.amt),paid:!!t.paid});
  }
  return {targets:list, total:r.total, treasury:getTreasuryBalance(),
          label:periodLabel(month,half)};
}

// 선택한 학생에게 급여 지급
function paySelectedSalaries(month, half, studentNums){
  if(!studentNums || !studentNums.length)return{ok:false,msg:'지급할 학생을 선택해 주세요.'};
  var sh=getSheet(SHEET_NAMES.STUDENTS);
  var key=makePeriodKey(month,half);
  var label=periodLabel(month,half);
  var r=_salaryTargets(month,half);

  var picked=[], total=0, skipped=0;
  for(var i=0;i<r.targets.length;i++){
    var t=r.targets[i];
    for(var k=0;k<studentNums.length;k++){
      if(String(studentNums[k])===String(t.num)){
        if(t.paid){ skipped++; break; }   // 중복 지급 방지
        picked.push(t); total+=t.amt; break;
      }
    }
  }
  if(picked.length===0){
    return{ok:false,msg:(skipped>0?'선택한 학생은 이미 '+label+' 급여를 받았습니다.':'지급 대상을 찾을 수 없습니다.')};
  }

  var treasury=getTreasuryBalance();
  if(treasury<total){
    return{ok:false,insufficient:true,need:total,have:treasury,
           msg:'학급 금고 잔액이 부족합니다.\n필요: '+total+'원 / 현재: '+treasury+'원'};
  }

  var logSh=getSheet(SHEET_NAMES.PAYLOG);
  var today=todayStr();
  var treBal=appendTreasury('급여지급', label+' 급여 ('+picked.length+'명)', -total, month);

  var count=0;
  for(var j=0;j<picked.length;j++){
    var p=picked[j];
    var newBal=p.balance+p.amt;
    sh.getRange(p.rowIdx+2,3).setValue(newBal);
    appendLedger(p.num,p.name,'급여',p.jobName+' 급여 ('+label+')',p.amt,newBal,month);
    logSh.appendRow([key,p.num,p.name,p.jobName,p.amt,today]);
    count++;
  }
  return{ok:true,count:count,total:total,skipped:skipped,
         treasuryBalance:treBal,label:label};
}

// 회차 지급 취소 (되돌리기)
function cancelPayPeriod(month, half){
  var key=makePeriodKey(month,half);
  var label=periodLabel(month,half);
  var logSh=getSheet(SHEET_NAMES.PAYLOG);
  var rows=sheetToArray(SHEET_NAMES.PAYLOG);
  var students=getStudents();
  var stSh=getSheet(SHEET_NAMES.STUDENTS);
  var refund=0, count=0;

  for(var i=rows.length-1;i>=0;i--){
    if(_s(rows[i][0])!==key)continue;
    var num=rows[i][1], amt=Number(rows[i][4])||0;
    for(var s=0;s<students.length;s++){
      if(String(students[s].num)===String(num)){
        var nb=Math.max(0,students[s].balance-amt);
        stSh.getRange(s+2,3).setValue(nb);
        students[s].balance=nb;
        appendLedger(students[s].num,students[s].name,'급여취소',
                     label+' 급여 취소',-amt,nb,month);
        break;
      }
    }
    logSh.deleteRow(i+2);
    refund+=amt; count++;
  }
  if(count===0)return{ok:false,msg:label+' 지급 기록이 없습니다.'};
  var treBal=appendTreasury('급여취소', label+' 급여 취소 ('+count+'명)', refund, month);
  return{ok:true,count:count,refund:refund,treasuryBalance:treBal,label:label};
}


// ── 보너스 지급 ──────────────────────────────────────────────
function payBonus(params){
  var nums=params.studentNums;
  if(!nums || !nums.length)return{ok:false,msg:'지급할 학생을 선택해 주세요.'};
  var amt=Number(params.amount)||0;
  if(amt<=0)return{ok:false,msg:'금액을 올바르게 입력해 주세요.'};
  var reason=String(params.reason||'').trim();
  if(!reason)return{ok:false,msg:'지급 사유를 입력해 주세요.'};

  var students=getStudents();
  var sh=getSheet(SHEET_NAMES.STUDENTS);

  // 대상 확인 및 총액 계산
  var picked=[];
  for(var i=0;i<students.length;i++){
    for(var k=0;k<nums.length;k++){
      if(String(nums[k])===String(students[i].num)){ picked.push({s:students[i],idx:i}); break; }
    }
  }
  if(picked.length===0)return{ok:false,msg:'학생을 찾을 수 없습니다.'};

  var total=amt*picked.length;
  var treasury=getTreasuryBalance();
  if(treasury<total){
    return{ok:false,insufficient:true,need:total,have:treasury,
           msg:'학급 금고 잔액이 부족합니다.\n필요: '+total+'원 / 현재: '+treasury+'원'};
  }

  var treBal=appendTreasury('보너스', reason+' ('+picked.length+'명)', -total, params.month);

  var count=0;
  for(var j=0;j<picked.length;j++){
    var p=picked[j];
    var newBal=p.s.balance+amt;
    sh.getRange(p.idx+2,3).setValue(newBal);
    appendLedger(p.s.num,p.s.name,'보너스',reason,amt,newBal,params.month);
    count++;
  }
  return{ok:true,count:count,total:total,treasuryBalance:treBal};
}

// ── 세금 ─────────────────────────────────────────────────────
function applyTax(params){
  var students=getStudents(), sh=getSheet(SHEET_NAMES.STUDENTS);
  var targets = (params.studentNums && params.studentNums.length)
    ? students.filter(function(s){ return params.studentNums.indexOf(String(s.num))>=0; })
    : students;

  // 1단계: 걷을 금액을 먼저 계산
  var plan=[], collected=0;
  for(var i=0;i<targets.length;i++){
    var s=targets[i];
    var si=-1;
    for(var k=0;k<students.length;k++){ if(String(students[k].num)===String(s.num)){ si=k; break; } }
    if(si<0)continue;
    var amt = (params.mode==='percent')
      ? Math.round(s.balance*params.amount/100)
      : Number(params.amount);
    if(amt<=0)continue;
    plan.push({s:s,si:si,amt:amt});
    collected+=amt;
  }
  if(plan.length===0)return{ok:true,count:0,collected:0};

  // 2단계: 금고에 먼저 입금 (거래내역에 금고잔액을 함께 남기기 위해)
  var label=params.type+(params.memo?' - '+params.memo:'')+' ('+plan.length+'명)';
  appendTreasury('세금', label, collected, params.month);

  // 3단계: 학생별 차감
  var count=0;
  for(var j=0;j<plan.length;j++){
    var p=plan[j];
    var newBal=Math.max(0,p.s.balance-p.amt);
    sh.getRange(p.si+2,3).setValue(newBal);
    appendLedger(p.s.num,p.s.name,'세금',
      params.type+(params.memo?' - '+params.memo:''), -p.amt, newBal, params.month);
    count++;
  }
  return{ok:true,count:count,collected:collected};
}

// ── 물품 ─────────────────────────────────────────────────────
function getItems(){
  return sheetToArray(SHEET_NAMES.ITEMS).map(function(r){
    return{name:r[0], price:Number(r[1])||0, stock:Number(r[2])||0,
           desc:r[3]||'', category:r[4]||'기타',
           autoRefill:(r[5]===true||r[5]==='TRUE'||r[5]==='true'||r[5]==='Y'),
           refillQty:Number(r[6])||0,
           lastRefill:_s(r[7])};
  });
}

function saveItem(data){
  var sh=getSheet(SHEET_NAMES.ITEMS);
  var auto = !!data.autoRefill;
  var qty = Number(data.refillQty)||0;
  var row=[data.name, Number(data.price)||0, Number(data.stock)||0,
           data.desc||'', data.category||'기타', auto, qty, ''];
  if(data.editIdx===-1){
    sh.appendRow(row);
  } else {
    // 마지막 리필 날짜는 유지
    var prev=sheetToArray(SHEET_NAMES.ITEMS)[data.editIdx];
    row[7]=(prev&&prev.length>7)?prev[7]:'';
    sh.getRange(data.editIdx+2,1,1,8).setValues([row]);
  }
  return{ok:true};
}

// ── 자동 리필 (매일 자정 기준) ──────────────────────────────
// 재고가 설정 수량보다 적으면 그 수량까지 채움
function processAutoRefill(){
  var sh=getSheet(SHEET_NAMES.ITEMS);
  var last=sh.getLastRow();
  if(last<=1)return{ok:true,refilled:0};
  if(sh.getLastColumn()<8) sh.getRange(1,6,1,3).setValues([['자동리필','리필수량','마지막리필']]);

  var today=todayStr();
  var rng=sh.getRange(2,1,last-1,8);
  var vals=rng.getValues();
  var refilled=0, names=[];

  for(var i=0;i<vals.length;i++){
    if(vals[i][0]==='')continue;
    var auto=(vals[i][5]===true||vals[i][5]==='TRUE'||vals[i][5]==='true'||vals[i][5]==='Y');
    if(!auto)continue;
    var target=Number(vals[i][6])||0;
    if(target<=0)continue;
    if(_s(vals[i][7])===today)continue;      // 오늘 이미 리필함
    var stock=Number(vals[i][2])||0;
    if(stock<0)continue;                      // 무제한은 제외
    if(stock<target){
      vals[i][2]=target;
      refilled++; names.push(vals[i][0]);
    }
    vals[i][7]=today;
  }
  if(refilled>0||names.length>=0) rng.setValues(vals);
  return{ok:true,refilled:refilled,names:names,date:today};
}

// 자동 리필 트리거 설정 (매일 자정)
function initRefillTrigger(){
  ScriptApp.getProjectTriggers().forEach(function(t){
    if(t.getHandlerFunction()==='processAutoRefill') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('processAutoRefill').timeBased().atHour(0).nearMinute(10).everyDays(1).create();
  return{ok:true};
}

// 자동 리필 설정 저장 (물품 목록에서 바로 변경)
function setAutoRefill(itemIdx, enabled, qty){
  var sh=getSheet(SHEET_NAMES.ITEMS);
  if(sh.getLastColumn()<8) sh.getRange(1,6,1,3).setValues([['자동리필','리필수량','마지막리필']]);
  sh.getRange(itemIdx+2,6).setValue(!!enabled);
  sh.getRange(itemIdx+2,7).setValue(Number(qty)||0);
  return{ok:true};
}
function deleteItem(idx){getSheet(SHEET_NAMES.ITEMS).deleteRow(idx+2);return{ok:true};}
function processBuy(params){
  const students=getStudents(),items=getItems(),si=students.findIndex(s=>String(s.num)===String(params.studentNum)),item=items[params.itemIdx],s=students[si];
  if(!item||!s)return{ok:false,msg:'학생 또는 물품 없음'};
  const total=item.price*params.qty;
  if(s.balance<total)return{ok:false,msg:`잔액 부족 (현재: ${s.balance}원)`};
  if(item.stock>=0&&item.stock<params.qty)return{ok:false,msg:`재고 부족 (재고: ${item.stock})`};
  const newBal=s.balance-total;
  getSheet(SHEET_NAMES.STUDENTS).getRange(si+2,3).setValue(newBal);
  if(item.stock>=0)getSheet(SHEET_NAMES.ITEMS).getRange(params.itemIdx+2,3).setValue(item.stock-params.qty);
  appendTreasury('물품판매', s.name+' - '+item.name+' x'+params.qty, total, params.month);
  appendLedger(s.num,s.name,'물품구입',`${item.name} x${params.qty}`,-total,newBal,params.month);
  return{ok:true,balance:newBal};
}

// ── 상점 권한 ─────────────────────────────────────────────────
function getShopPerms(){return sheetToArray(SHEET_NAMES.SHOPPERMS).map(r=>({jobName:r[0],category:r[1]||'전체',perm:r[2]||'판매'}));}
function saveShopPerm(data){const sh=getSheet(SHEET_NAMES.SHOPPERMS),row=[data.jobName,data.category||'전체',data.perm||'판매'];if(data.editIdx===-1)sh.appendRow(row);else sh.getRange(data.editIdx+2,1,1,3).setValues([row]);return{ok:true};}
function deleteShopPerm(idx){getSheet(SHEET_NAMES.SHOPPERMS).deleteRow(idx+2);return{ok:true};}
function getStudentShopPerms(studentNum){
  const assigns=getAssignments(),asgn=assigns.find(a=>String(a.studentNum)===String(studentNum));
  if(!asgn)return{canSell:false,canChangePrice:false,canManageStock:false,canFullManage:false,allowedCategories:[]};
  const perms=getShopPerms().filter(p=>p.jobName===asgn.jobName);
  if(!perms.length)return{canSell:false,canChangePrice:false,canManageStock:false,canFullManage:false,allowedCategories:[]};
  const cats=perms.map(p=>p.category),hasAll=cats.includes('전체'),types=perms.map(p=>p.perm);
  const canFull=types.includes('전체관리'),canStock=canFull||types.includes('재고관리'),canPrice=canFull||types.includes('가격변경'),canSell=canFull||canStock||canPrice||types.includes('판매');
  return{canSell,canChangePrice:canPrice,canManageStock:canStock,canFullManage:canFull,allowedCategories:hasAll?['전체']:cats};
}
function processBuyByShopkeeper(params){const perms=getStudentShopPerms(params.shopkeeperNum);if(!perms.canSell)return{ok:false,msg:'판매 권한이 없습니다.'};const items=getItems(),item=items[params.itemIdx];if(!item)return{ok:false,msg:'물품을 찾을 수 없습니다.'};if(!perms.allowedCategories.includes('전체')&&!perms.allowedCategories.includes(item.category))return{ok:false,msg:`'${item.category}' 카테고리 판매 권한이 없습니다.`};return processBuy({studentNum:params.buyerNum,itemIdx:params.itemIdx,qty:params.qty,month:params.month});}
function shopkeeperChangePrice(params){const perms=getStudentShopPerms(params.shopkeeperNum);if(!perms.canChangePrice)return{ok:false,msg:'가격 변경 권한이 없습니다.'};getSheet(SHEET_NAMES.ITEMS).getRange(params.itemIdx+2,2).setValue(Number(params.newPrice));return{ok:true};}
function shopkeeperChangeStock(params){const perms=getStudentShopPerms(params.shopkeeperNum);if(!perms.canManageStock)return{ok:false,msg:'재고 관리 권한이 없습니다.'};getSheet(SHEET_NAMES.ITEMS).getRange(params.itemIdx+2,3).setValue(Number(params.newStock));return{ok:true};}
function shopkeeperSaveItem(params){const perms=getStudentShopPerms(params.shopkeeperNum);if(!perms.canFullManage)return{ok:false,msg:'전체관리 권한이 필요합니다.'};return saveItem(params.itemData);}
function shopkeeperDeleteItem(params){const perms=getStudentShopPerms(params.shopkeeperNum);if(!perms.canFullManage)return{ok:false,msg:'전체관리 권한이 필요합니다.'};return deleteItem(params.itemIdx);}

// ── 거래 내역 ─────────────────────────────────────────────────
function appendLedger(studentNum,studentName,type,detail,amount,balance,month){
  var today=todayStr();
  // 월이 전달되지 않으면 오늘 날짜에서 자동 계산
  var m=month;
  if(m===undefined||m===null||m===''){ m=Number(today.split('-')[1]); }
  var treBal='';
  try{ treBal=getTreasuryBalance(); }catch(e){ treBal=''; }
  getSheet(SHEET_NAMES.LEDGER).appendRow([today,m,studentNum,studentName,type,detail,amount,balance,treBal]);
}

// 거래내역의 '월' 열을 날짜 기준으로 다시 계산 (잘못 기록된 월 교정)
function repairLedgerMonths(){
  var sh=getSheet(SHEET_NAMES.LEDGER);
  var last=sh.getLastRow();
  if(last<=1)return{ok:true,fixed:0,total:0};
  var rng=sh.getRange(2,1,last-1,2);
  var vals=rng.getValues();
  var fixed=0;
  for(var i=0;i<vals.length;i++){
    var dateStr=_s(vals[i][0]);
    if(!dateStr)continue;
    var parts=dateStr.split('-');
    if(parts.length<2)continue;
    var correct=Number(parts[1]);
    if(Number(vals[i][1])!==correct){ vals[i][1]=correct; fixed++; }
  }
  rng.setValues(vals);
  return{ok:true,fixed:fixed,total:vals.length};
}

function getLedger(filterType){
  return sheetToArray(SHEET_NAMES.LEDGER)
    .filter(function(r){ return !filterType||filterType==='all'||r[4]===filterType; })
    .map(function(r){
      return{date:_s(r[0]),month:_s(r[1]),studentNum:_s(r[2]),studentName:_s(r[3]),
             type:_s(r[4]),detail:_s(r[5]),amount:_n(r[6]),balance:_n(r[7]),
             treasury:(r.length>8&&r[8]!==''&&r[8]!==null&&r[8]!==undefined)?_n(r[8]):null};
    }).reverse();
}

// ════════════════════════════════════════════════════════════
//  로그인 & 비밀번호 관리
// ════════════════════════════════════════════════════════════
// 처음 설치했을 때의 관리자 비밀번호.
// 짧게 두는 대신, 이 비밀번호로 들어오면 화면에서 바꾸라고 알립니다.
const DEFAULT_ADMIN_PW = '1234';
function _getAdminPw(){return _props().getProperty('ADMIN_PW')||DEFAULT_ADMIN_PW;}
function _setAdminPw(pw){_props().setProperty('ADMIN_PW',pw);}
function _ensurePassword(studentNum,defaultPw){const sh=getSheet(SHEET_NAMES.PASSWORDS),rows=sheetToArray(SHEET_NAMES.PASSWORDS),ri=rows.findIndex(r=>String(r[0])===String(studentNum));if(ri<0)sh.appendRow([studentNum,defaultPw]);}
function _getStoredPw(studentNum){const rows=sheetToArray(SHEET_NAMES.PASSWORDS),row=rows.find(r=>String(r[0])===String(studentNum));return row?String(row[1]):String(studentNum);}
function verifyAdminLogin(pw){
  const ok = pw===_getAdminPw();
  // 아직 초기 비밀번호를 쓰고 있으면 화면에서 안내하도록 알려 줍니다.
  return {ok:ok, isDefault: ok && _getAdminPw()===DEFAULT_ADMIN_PW};
}
function verifyStudentLogin(studentNum,password){
  try{
    const students=getStudents();
    const s=students.find(x=>String(x.num)===String(studentNum));
    if(!s)return{ok:false,msg:'학생을 찾을 수 없습니다.'};
    if(String(password)!==_getStoredPw(studentNum))return{ok:false,msg:'비밀번호가 올바르지 않습니다.'};
    const data=_loadStudentData(studentNum);
    if(!data)return{ok:false,msg:'학생 정보를 불러오지 못했습니다.'};
    return{ok:true,data:data};
  }catch(err){
    return{ok:false,msg:'서버 오류: '+(err&&err.message?err.message:err)};
  }
}
// 값을 안전한 문자열로 (Date 객체 등 직렬화 문제 방지)
function _s(v){
  if(v===null||v===undefined)return '';
  if(Object.prototype.toString.call(v)==='[object Date]')
    return Utilities.formatDate(v,Session.getScriptTimeZone(),'yyyy-MM-dd');
  return String(v);
}
function _n(v){ const x=Number(v); return isNaN(x)?0:x; }

function _loadStudentData(studentNum){
  const students=getStudents();
  const s=students.find(x=>String(x.num)===String(studentNum));
  if(!s)return null;

  const asgn=getAssignments().find(a=>String(a.studentNum)===String(studentNum));
  const jobRaw=asgn?getJobs().find(j=>j.name===asgn.jobName):null;
  const job=jobRaw?{name:_s(jobRaw.name),salary:_n(jobRaw.salary),slots:_n(jobRaw.slots),desc:_s(jobRaw.desc)}:null;

  const ledger=getLedger('all')
    .filter(l=>String(l.studentNum)===String(studentNum))
    .slice(0,30)
    .map(l=>({date:_s(l.date),month:_s(l.month),studentNum:_s(l.studentNum),
              studentName:_s(l.studentName),type:_s(l.type),detail:_s(l.detail),
              amount:_n(l.amount),balance:_n(l.balance)}));

  const shopPerms=(asgn?getShopPerms().filter(p=>p.jobName===asgn.jobName):[])
    .map(p=>({jobName:_s(p.jobName),category:_s(p.category),perm:_s(p.perm)}));

  const bankRoleRaw=getStudentBankRole(studentNum);

  // 본인 명의로 진행 중인 적금 (만기일 안내용)
  const mySavings=sheetToArray(SHEET_NAMES.SAVINGS)
    .filter(function(r){return String(r[1])===String(studentNum)&&(r[9]==='진행중'||r[9]==='승인대기');})
    .map(function(r){return{principal:_n(r[4]),rate:_n(r[5]),days:_n(r[6]),
                            startDate:_s(r[7]),maturityDate:_s(r[8]),status:_s(r[9])};});

  return {
    student:{num:_s(s.num),name:_s(s.name),balance:_n(s.balance)},
    job:job,
    ledger:ledger,
    shopPerms:shopPerms,
    bankRole:bankRoleRaw?_s(bankRoleRaw):null,
    mySavings:mySavings,
    hasPendingReq:false
  };
}
function refreshStudentData(studentNum){return _loadStudentData(studentNum);}
function getAllPasswords(){
  try{
    ensureInit();
    var students=getStudents();
    var pwRows=sheetToArray(SHEET_NAMES.PASSWORDS);
    var out=[];
    for(var i=0;i<students.length;i++){
      var s=students[i];
      if(s.num===''||s.num===null||s.num===undefined)continue;
      var pw=null;
      for(var k=0;k<pwRows.length;k++){
        if(String(pwRows[k][0])===String(s.num)){ pw=pwRows[k][1]; break; }
      }
      out.push({
        num:_s(s.num),
        name:_s(s.name),
        password:(pw===null||pw===undefined||pw==='')?_s(s.num):_s(pw)
      });
    }
    return out;
  }catch(err){
    return [];
  }
}
function setStudentPwAdmin(studentNum,newPw){const sh=getSheet(SHEET_NAMES.PASSWORDS),rows=sheetToArray(SHEET_NAMES.PASSWORDS),ri=rows.findIndex(r=>String(r[0])===String(studentNum));if(ri>=0)sh.getRange(ri+2,2).setValue(newPw);else sh.appendRow([studentNum,newPw]);return{ok:true};}
function resetStudentPw(studentNum){return setStudentPwAdmin(studentNum,String(studentNum));}
function resetAllPasswords(){const students=getStudents();students.forEach(s=>setStudentPwAdmin(s.num,String(s.num)));return{ok:true,count:students.length};}
function changeAdminPw(currentPw,newPw){
  if(currentPw!==_getAdminPw())return{ok:false,msg:'현재 비밀번호가 올바르지 않습니다.'};
  if(!newPw||newPw.length<4)return{ok:false,msg:'새 비밀번호는 4자리 이상이어야 합니다.'};
  if(newPw===DEFAULT_ADMIN_PW)return{ok:false,msg:'초기 비밀번호와 같습니다. 다른 번호로 정해 주세요.'};
  _setAdminPw(newPw);return{ok:true};
}
// 학생이 직접 비밀번호 변경 (승인 불필요)
function changeStudentPwDirect(studentNum, currentPw, newPw, confirmPw) {
  if(newPw !== confirmPw) return {ok:false, msg:'새 비밀번호가 일치하지 않습니다.'};
  if(!newPw || newPw.length < 4) return {ok:false, msg:'비밀번호는 4자리 이상이어야 합니다.'};
  if(String(currentPw) !== _getStoredPw(studentNum)) return {ok:false, msg:'현재 비밀번호가 올바르지 않습니다.'};
  setStudentPwAdmin(studentNum, newPw);
  return {ok:true};
}

function requestPwChange(studentNum,currentPw,newPw,confirmPw){
  if(newPw!==confirmPw)return{ok:false,msg:'새 비밀번호가 일치하지 않습니다.'};
  if(!newPw||newPw.length<4)return{ok:false,msg:'비밀번호는 4자리 이상이어야 합니다.'};
  if(String(currentPw)!==_getStoredPw(studentNum))return{ok:false,msg:'현재 비밀번호가 올바르지 않습니다.'};
  const students=getStudents(),s=students.find(s=>String(s.num)===String(studentNum));
  const sh=getSheet(SHEET_NAMES.PW_REQUESTS),rows=sheetToArray(SHEET_NAMES.PW_REQUESTS);
  const ei=rows.findIndex(r=>String(r[0])===String(studentNum)&&r[4]==='대기');
  const row=[studentNum,s?s.name:'',newPw,todayStr(),'대기'];
  if(ei>=0)sh.getRange(ei+2,1,1,5).setValues([row]);else sh.appendRow(row);
  return{ok:true};
}
function getPwRequests(){initSheets();return sheetToArray(SHEET_NAMES.PW_REQUESTS).map((r,i)=>({idx:i,studentNum:r[0],studentName:r[1],newPw:r[2],date:r[3],status:r[4]}));}
function approvePwRequest(idx){const rows=sheetToArray(SHEET_NAMES.PW_REQUESTS),req=rows[idx];if(!req)return{ok:false,msg:'요청을 찾을 수 없습니다.'};setStudentPwAdmin(req[0],req[2]);getSheet(SHEET_NAMES.PW_REQUESTS).getRange(idx+2,5).setValue('승인');return{ok:true};}
function rejectPwRequest(idx){getSheet(SHEET_NAMES.PW_REQUESTS).getRange(idx+2,5).setValue('거절');return{ok:true};}

// ════════════════════════════════════════════════════════════
//  은행 시스템
// ════════════════════════════════════════════════════════════

// ── 은행 권한 ─────────────────────────────────────────────────
function getBankPerms(){return sheetToArray(SHEET_NAMES.BANK_PERMS).map(r=>({jobName:r[0],role:r[1]}));}
function saveBankPerm(data){const sh=getSheet(SHEET_NAMES.BANK_PERMS),row=[data.jobName,data.role];if(data.editIdx===-1)sh.appendRow(row);else sh.getRange(data.editIdx+2,1,1,2).setValues([row]);return{ok:true};}
function deleteBankPerm(idx){getSheet(SHEET_NAMES.BANK_PERMS).deleteRow(idx+2);return{ok:true};}
function getStudentBankRole(studentNum){
  const assigns=getAssignments(),asgn=assigns.find(a=>String(a.studentNum)===String(studentNum));
  if(!asgn)return null;
  const perm=getBankPerms().find(p=>p.jobName===asgn.jobName);
  return perm?perm.role:null;
}

// ── 은행 설정 (기본 이자율) ────────────────────────────────────
function getBankSettings(){
  const p=_props();
  return{rate15:parseFloat(p.getProperty('BANK_RATE_15')||'5'),rate30:parseFloat(p.getProperty('BANK_RATE_30')||'10')};
}
function saveBankSettings(s){
  const p=_props();
  p.setProperty('BANK_RATE_15',String(s.rate15));p.setProperty('BANK_RATE_30',String(s.rate30));return{ok:true};
}

// ── 적금 CRUD ─────────────────────────────────────────────────
function getSavings(filterStatus){
  return sheetToArray(SHEET_NAMES.SAVINGS).map(function(r,i){
    return{
      idx:i, id:_s(r[0]),
      depositorNum:_s(r[1]), depositorName:_s(r[2]), bankStaffNum:_s(r[3]),
      principal:_n(r[4]), rate:_n(r[5]), days:_n(r[6]),
      startDate:_s(r[7]), maturityDate:_s(r[8]),
      status:_s(r[9]), paidAmount:_n(r[10])
    };
  }).filter(function(r){
    return !filterStatus||filterStatus==='all'||r.status===filterStatus;
  });
}

// 교사가 직접 적금 개설 (즉시 진행 중, 승인 불필요)
function createSavingByTeacher(params){
  const students=getStudents();
  const depositor=students.find(s=>String(s.num)===String(params.depositorNum));
  if(!depositor)return{ok:false,msg:'학생을 찾을 수 없습니다.'};
  if(depositor.balance<params.principal)return{ok:false,msg:`잔액 부족 (현재: ${depositor.balance}원)`};
  if(params.rate<0||params.rate>50)return{ok:false,msg:'이자율은 0~50% 사이로 입력하세요.'};
  const days=Number(params.days);
  if(days!==15&&days!==30)return{ok:false,msg:'기간은 15일 또는 30일만 가능합니다.'};
  const si=students.findIndex(s=>String(s.num)===String(params.depositorNum));
  const newBal=depositor.balance-params.principal;
  getSheet(SHEET_NAMES.STUDENTS).getRange(si+2,3).setValue(newBal);
  const startStr=todayStr(),matStr=dateAddDays(new Date(),days),id='T'+Date.now();
  getSheet(SHEET_NAMES.SAVINGS).appendRow([id,params.depositorNum,depositor.name,'교사',params.principal,params.rate,days,startStr,matStr,'진행중','']);
  appendLedger(depositor.num,depositor.name,'적금납입','적금 납입 ('+days+'일/'+params.rate+'%) · 만기 '+matStr,- params.principal,newBal);
  return{ok:true,balance:newBal};
}

// 은행직원이 직접 적금 개설 (승인 불필요)
function createSaving(params){
  const role=getStudentBankRole(params.bankStaffNum);
  if(!role)return{ok:false,msg:'은행 권한이 없습니다.'};
  const students=getStudents();
  const depositor=students.find(s=>String(s.num)===String(params.depositorNum));
  if(!depositor)return{ok:false,msg:'학생을 찾을 수 없습니다.'};
  if(depositor.balance<params.principal)return{ok:false,msg:`잔액 부족 (현재 잔액: ${depositor.balance}원)`};
  if(params.rate<0||params.rate>50)return{ok:false,msg:'이자율은 0~50% 사이로 입력하세요.'};
  const days=Number(params.days);
  if(days!==15&&days!==30)return{ok:false,msg:'기간은 15일 또는 30일만 가능합니다.'};
  const startStr=todayStr(),matStr=dateAddDays(new Date(),days),id='S'+Date.now();
  getSheet(SHEET_NAMES.SAVINGS).appendRow([id,params.depositorNum,depositor.name,params.bankStaffNum,params.principal,params.rate,days,startStr,matStr,'승인대기','']);
  return{ok:true};
}

// 교사 승인 → 잔액 차감 후 진행 시작
function approveSaving(idx){
  const rows=sheetToArray(SHEET_NAMES.SAVINGS),r=rows[idx];
  if(!r||r[9]!=='승인대기')return{ok:false,msg:'승인 대기 중인 적금이 아닙니다.'};
  const students=getStudents(),si=students.findIndex(s=>String(s.num)===String(r[1]));
  if(si<0)return{ok:false,msg:'학생을 찾을 수 없습니다.'};
  if(students[si].balance<Number(r[4]))return{ok:false,msg:`잔액 부족 (현재: ${students[si].balance}원, 필요: ${r[4]}원)`};
  const newBal=students[si].balance-Number(r[4]);
  getSheet(SHEET_NAMES.STUDENTS).getRange(si+2,3).setValue(newBal);
  getSheet(SHEET_NAMES.SAVINGS).getRange(idx+2,10).setValue('진행중');
  appendLedger(students[si].num,students[si].name,'적금납입','적금 납입 ('+r[6]+'일/'+r[5]+'%) · 만기 '+_s(r[8]),- Number(r[4]),newBal);
  return{ok:true};
}

// 교사 거절
function rejectSaving(idx){
  const rows=sheetToArray(SHEET_NAMES.SAVINGS),r=rows[idx];
  if(!r||r[9]!=='승인대기')return{ok:false,msg:'승인 대기 중인 적금이 아닙니다.'};
  getSheet(SHEET_NAMES.SAVINGS).getRange(idx+2,10).setValue('거절');
  return{ok:true};
}

// 만기 적금 처리 (트리거 또는 수동)
function processMatureSavings(){
  const sh=getSheet(SHEET_NAMES.SAVINGS),rows=sheetToArray(SHEET_NAMES.SAVINGS);
  const today=todayStr();let processed=0;
  rows.forEach((r,i)=>{
    if(r[9]!=='진행중')return;
    if(_s(r[8])>today)return;
    const depositorNum=r[1],principal=Number(r[4]),rate=Number(r[5]);
    const payout=Math.round(principal*(1+rate/100)),interest=payout-principal;
    const students=getStudents(),si=students.findIndex(s=>String(s.num)===String(depositorNum));
    if(si>=0){
      const newBal=students[si].balance+payout;
      getSheet(SHEET_NAMES.STUDENTS).getRange(si+2,3).setValue(newBal);
      appendLedger(students[si].num,students[si].name,'적금해약',`적금 해약 (원금:${principal}원, 이자:${interest}원, ${r[6]}일/${rate}%)`,payout,newBal);
      sh.getRange(i+2,10).setValue('해약완료');sh.getRange(i+2,11).setValue(payout);
    }
    processed++;
  });
  return{ok:true,processed};
}

// 적금 자동 트리거 설정
function initSavingsTrigger(){
  ScriptApp.getProjectTriggers().forEach(t=>{if(t.getHandlerFunction()==='processMatureSavings')ScriptApp.deleteTrigger(t);});
  ScriptApp.newTrigger('processMatureSavings').timeBased().atHour(9).everyDays(1).create();
  return{ok:true};
}

// 적금 조기 해약 (교사 전용)
function cancelSavingEarly(idx){
  const sh=getSheet(SHEET_NAMES.SAVINGS),rows=sheetToArray(SHEET_NAMES.SAVINGS),r=rows[idx];
  if(!r||r[9]!=='진행중')return{ok:false,msg:'진행 중인 적금이 아닙니다.'};
  const principal=Number(r[4]),students=getStudents(),si=students.findIndex(s=>String(s.num)===String(r[1]));
  if(si>=0){
    const newBal=students[si].balance+principal;
    getSheet(SHEET_NAMES.STUDENTS).getRange(si+2,3).setValue(newBal);
    appendLedger(students[si].num,students[si].name,'적금해약','조기 해약 (이자 없음)',principal,newBal);
    sh.getRange(idx+2,10).setValue('조기해약');sh.getRange(idx+2,11).setValue(principal);
  }
  return{ok:true};
}

// ════════════════════════════════════════════════════════════
//  로그인 화면 설정
// ════════════════════════════════════════════════════════════
function getLoginSettings(){
  const p=_props();
  return{title:p.getProperty('LOGIN_TITLE')||'돈워리!',subtitle:p.getProperty('LOGIN_SUBTITLE')||'우리 반 경제를 함께 운영해요',logoType:p.getProperty('LOGIN_LOGO_TYPE')||'default',emoji:p.getProperty('LOGIN_EMOJI')||'',logoUrl:p.getProperty('LOGIN_LOGO_URL')||'',theme:p.getProperty('APP_THEME')||'donworry',iconColor:p.getProperty('APP_ICON')||'theme'};
}
function saveLoginSettings(settings){
  const p=_props();
  p.setProperty('LOGIN_TITLE',settings.title||'돈워리!');p.setProperty('LOGIN_SUBTITLE',settings.subtitle||'우리 반 경제를 함께 운영해요');p.setProperty('LOGIN_LOGO_TYPE',settings.logoType||'default');p.setProperty('LOGIN_EMOJI',settings.emoji||'');p.setProperty('LOGIN_LOGO_URL',settings.logoUrl||'');p.setProperty('APP_THEME',settings.theme||'donworry');p.setProperty('APP_ICON',settings.iconColor||'theme');
  return{ok:true};
}

// 로그인 화면 전용 - 학생 목록만 빠르게 반환 (initSheets 없음)
function getStudentsForLogin() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(SHEET_NAMES.STUDENTS);
  if (!sh || sh.getLastRow() <= 1) return [];
  return sh.getRange(2, 1, sh.getLastRow()-1, 2).getValues()
    .filter(r => r[0] !== '')
    .map(r => ({num: r[0], name: r[1]}));
}


// ════════════════════════════════════════════════════════════
//  초기화 기능
// ════════════════════════════════════════════════════════════

// 특정 학생의 거래내역 삭제 + 잔액을 초기잔액으로 되돌림
function resetStudentData(studentNum){
  var students=getStudents();
  var si=-1;
  for(var i=0;i<students.length;i++){
    if(String(students[i].num)===String(studentNum)){ si=i; break; }
  }
  if(si<0)return{ok:false,msg:'학생을 찾을 수 없습니다.'};

  // 거래내역에서 해당 학생 행 삭제 (아래에서 위로)
  var sh=getSheet(SHEET_NAMES.LEDGER);
  var last=sh.getLastRow();
  var deleted=0;
  if(last>1){
    var rows=sh.getRange(2,3,last-1,1).getValues(); // 학생번호 열
    for(var r=rows.length-1;r>=0;r--){
      if(String(rows[r][0])===String(studentNum)){ sh.deleteRow(r+2); deleted++; }
    }
  }

  // 해당 학생의 적금 삭제
  var svs=getSheet(SHEET_NAMES.SAVINGS);
  var slast=svs.getLastRow();
  var savDel=0;
  if(slast>1){
    var srows=svs.getRange(2,2,slast-1,1).getValues(); // 예금주번호 열
    for(var q=srows.length-1;q>=0;q--){
      if(String(srows[q][0])===String(studentNum)){ svs.deleteRow(q+2); savDel++; }
    }
  }

  // 잔액을 초기잔액으로 복원
  var initial=Number(students[si].initial)||0;
  getSheet(SHEET_NAMES.STUDENTS).getRange(si+2,3).setValue(initial);

  return{ok:true,deleted:deleted,savings:savDel,balance:initial,name:students[si].name};
}

// 반 전체 데이터 초기화
// mode: 'transactions' = 거래내역/적금만, 'all' = 학생 명단까지 전부
function resetClassData(mode){
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var result={ok:true,mode:mode};

  // 거래내역 비우기
  var led=getSheet(SHEET_NAMES.LEDGER);
  if(led.getLastRow()>1) led.deleteRows(2,led.getLastRow()-1);

  // 적금 비우기
  var sav=getSheet(SHEET_NAMES.SAVINGS);
  if(sav.getLastRow()>1) sav.deleteRows(2,sav.getLastRow()-1);

  // 학급 금고 비우기
  var tre=getSheet(SHEET_NAMES.TREASURY);
  if(tre.getLastRow()>1) tre.deleteRows(2,tre.getLastRow()-1);

  // 건의사항 비우기
  var sug=getSheet(SHEET_NAMES.SUGGESTIONS);
  if(sug.getLastRow()>1) sug.deleteRows(2,sug.getLastRow()-1);

  // 급여 지급 기록 비우기
  var plg=getSheet(SHEET_NAMES.PAYLOG);
  if(plg.getLastRow()>1) plg.deleteRows(2,plg.getLastRow()-1);

  if(mode==='all'){
    // 학생, 배정, 비밀번호, 변경요청 비우기
    [SHEET_NAMES.STUDENTS,SHEET_NAMES.ASSIGN,SHEET_NAMES.PASSWORDS,SHEET_NAMES.PW_REQUESTS].forEach(function(n){
      var sh=getSheet(n);
      if(sh.getLastRow()>1) sh.deleteRows(2,sh.getLastRow()-1);
    });
    result.students=0;
  } else {
    // 학생은 유지하되 잔액을 초기잔액으로 복원
    var sh=getSheet(SHEET_NAMES.STUDENTS);
    var last=sh.getLastRow();
    if(last>1){
      var rng=sh.getRange(2,1,last-1,4);
      var vals=rng.getValues();
      for(var i=0;i<vals.length;i++){
        if(vals[i][0]==='')continue;
        var init=(vals[i][3]===''||vals[i][3]===null||vals[i][3]===undefined)?0:Number(vals[i][3]);
        vals[i][2]=init;
      }
      rng.setValues(vals);
      result.students=vals.length;
    }
  }
  return result;
}


// ════════════════════════════════════════════════════════════
//  학급 금고
// ════════════════════════════════════════════════════════════

function getTreasuryBalance(){
  var sh=getSheet(SHEET_NAMES.TREASURY);
  var last=sh.getLastRow();
  if(last<=1)return 0;
  return Number(sh.getRange(last,7).getValue())||0;
}

// 금고 입출금 기록 (amount 양수=입금, 음수=출금)
function appendTreasury(type, detail, amount, month, category){
  var sh=getSheet(SHEET_NAMES.TREASURY);
  var cur=getTreasuryBalance();
  var newBal=cur+Number(amount);
  var today=todayStr();
  var m=month;
  if(m===undefined||m===null||m===''){ m=Number(today.split('-')[1]); }
  sh.appendRow([today, m, (Number(amount)>=0?'수입':'지출'), type, detail, Number(amount), newBal]);
  return newBal;
}

function getTreasuryLedger(limit){
  var sh=getSheet(SHEET_NAMES.TREASURY);
  var last=sh.getLastRow();
  if(last<=1)return [];
  var max=limit||300;
  var start=Math.max(2,last-max+1);
  var rows=sh.getRange(start,1,last-start+1,7).getValues();
  return rows.map(function(r){
    return{date:_s(r[0]),month:_s(r[1]),flow:_s(r[2]),type:_s(r[3]),
           detail:_s(r[4]),amount:_n(r[5]),balance:_n(r[6])};
  }).reverse();
}

// 교사: 금고에서 지출 (학급 행사 등)
function treasurySpend(params){
  var amt=Number(params.amount)||0;
  if(amt<=0)return{ok:false,msg:'금액을 올바르게 입력하세요.'};
  var cur=getTreasuryBalance();
  if(cur<amt)return{ok:false,msg:'금고 잔액이 부족합니다. (현재 '+cur+'원)'};
  var bal=appendTreasury(params.type||'학급행사', params.detail||'', -amt, params.month);
  return{ok:true,balance:bal};
}

// 교사: 금고에 직접 입금 (기부, 보정 등)
function treasuryDeposit(params){
  var amt=Number(params.amount)||0;
  if(amt<=0)return{ok:false,msg:'금액을 올바르게 입력하세요.'};
  var bal=appendTreasury(params.type||'기타수입', params.detail||'', amt, params.month);
  return{ok:true,balance:bal};
}

// 금고 통계
function getTreasuryStats(month){
  var rows=getTreasuryLedger(1000);
  var income=0, expense=0, mIncome=0, mExpense=0;
  for(var i=0;i<rows.length;i++){
    var a=rows[i].amount;
    if(a>0) income+=a; else expense+=Math.abs(a);
    if(String(rows[i].month)===String(month)){
      if(a>0) mIncome+=a; else mExpense+=Math.abs(a);
    }
  }
  return{balance:getTreasuryBalance(),income:income,expense:expense,
         monthIncome:mIncome,monthExpense:mExpense,count:rows.length};
}


// ════════════════════════════════════════════════════════════
//  물품 재입고 (품절 시, 주 1회)
// ════════════════════════════════════════════════════════════

// 이번 주 월요일 00:00 기준 주차 키 (예: '2026-W35')
function _weekKey(d){
  var dt = d ? new Date(d) : new Date();
  var day = dt.getDay();                 // 0=일 ... 6=토
  var diff = (day === 0 ? -6 : 1 - day); // 월요일로 이동
  var mon = new Date(dt);
  mon.setDate(dt.getDate() + diff);
  mon.setHours(0,0,0,0);
  return Utilities.formatDate(mon, Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function _restockProp(){ return _props(); }

// 저장 형식: {"물품명": "주차키", ...}
function _getRestockLog(){
  var raw = _restockProp().getProperty('RESTOCK_LOG');
  if(!raw) return {};
  try { return JSON.parse(raw); } catch(e){ return {}; }
}
function _setRestockLog(obj){
  _restockProp().setProperty('RESTOCK_LOG', JSON.stringify(obj));
}

// 품절 물품의 재입고 가능 여부 조회
function getRestockStatus(){
  var items = getItems();
  var log = _getRestockLog();
  var wk = _weekKey();
  var out = [];
  for(var i=0;i<items.length;i++){
    var it = items[i];
    if(Number(it.stock) !== 0) continue;   // 품절만
    var done = (log[it.name] === wk);
    out.push({ idx:i, name:_s(it.name), category:_s(it.category),
               price:_n(it.price), done:done });
  }
  return { week:wk, items:out };
}

// 재입고 실행 (1~20 랜덤)
function restockItem(itemIdx){
  var items = getItems();
  var it = items[itemIdx];
  if(!it) return {ok:false, msg:'물품을 찾을 수 없습니다.'};
  if(Number(it.stock) !== 0) return {ok:false, msg:'품절된 물품만 재입고할 수 있습니다.'};

  var log = _getRestockLog();
  var wk = _weekKey();
  if(log[it.name] === wk){
    return {ok:false, msg:'이번 주에 이미 재입고했습니다.\n다음 주 월요일부터 다시 가능합니다.'};
  }

  var qty = Math.floor(Math.random() * 20) + 1;   // 1~20
  getSheet(SHEET_NAMES.ITEMS).getRange(itemIdx+2, 3).setValue(qty);

  log[it.name] = wk;
  _setRestockLog(log);

  return {ok:true, name:_s(it.name), qty:qty, week:wk};
}


// ════════════════════════════════════════════════════════════
//  재입고 (주 1회, 월요일 자정 기준)
// ════════════════════════════════════════════════════════════

// 이번 주 월요일 날짜 문자열 (주간 구분 키)
function _weekKey(){
  var tz=Session.getScriptTimeZone();
  var now=new Date();
  var dow=now.getDay();              // 0=일 ... 6=토
  var back=(dow===0)?6:(dow-1);      // 일요일이면 6일 전이 월요일
  var mon=new Date(now.getTime());
  mon.setDate(mon.getDate()-back);
  return Utilities.formatDate(mon,tz,'yyyy-MM-dd');
}

// 물품별 마지막 재입고 주 조회
function _restockStore(){
  var raw=_props().getProperty('RESTOCK_LOG');
  if(!raw)return {};
  try{ return JSON.parse(raw); }catch(e){ return {}; }
}
function _saveRestockStore(obj){
  _props().setProperty('RESTOCK_LOG',JSON.stringify(obj));
}

// 재입고 가능 여부 확인
function canRestock(itemName){
  var log=_restockStore();
  var wk=_weekKey();
  return { ok:(log[itemName]!==wk), week:wk, last:(log[itemName]||null) };
}

// 전체 물품의 재입고 가능 상태
function getRestockStatus(){
  var log=_restockStore();
  var wk=_weekKey();
  var items=getItems();
  return items.map(function(it){
    return { name:_s(it.name), stock:_n(it.stock),
             done:(log[it.name]===wk), last:_s(log[it.name]||'') };
  });
}

// 랜덤 재입고 (1~20)
function restockItem(itemIdx, fixedAmount){
  var items=getItems();
  var it=items[itemIdx];
  if(!it)return{ok:false,msg:'물품을 찾을 수 없습니다.'};
  if(Number(it.stock)<0)return{ok:false,msg:'재고 무제한 물품은 재입고할 수 없습니다.'};

  var log=_restockStore();
  var wk=_weekKey();
  if(log[it.name]===wk){
    return{ok:false,msg:'이번 주에는 이미 재입고했습니다.\n다음 주 월요일부터 다시 가능합니다.'};
  }

  var amount;
  if(fixedAmount!==undefined && fixedAmount!==null && fixedAmount!==''){
    amount=Math.max(1,Math.floor(Number(fixedAmount)));
  } else {
    amount=Math.floor(Math.random()*20)+1;   // 1~20
  }

  var newStock=Number(it.stock)+amount;
  getSheet(SHEET_NAMES.ITEMS).getRange(itemIdx+2,3).setValue(newStock);

  log[it.name]=wk;
  _saveRestockStore(log);

  return{ok:true, amount:amount, stock:newStock, name:it.name,
         random:(fixedAmount===undefined||fixedAmount===null||fixedAmount===''), week:wk};
}

// 교사 전용: 재입고 제한 해제
function resetRestockLimit(itemName){
  var log=_restockStore();
  if(itemName){ delete log[itemName]; }
  else { log={}; }
  _saveRestockStore(log);
  return{ok:true};
}


// ════════════════════════════════════════════════════════════
//  건의사항
// ════════════════════════════════════════════════════════════

// 학생이 건의 제출
function submitSuggestion(params){
  var num=params.studentNum;
  var students=getStudents();
  var s=null;
  for(var i=0;i<students.length;i++){
    if(String(students[i].num)===String(num)){ s=students[i]; break; }
  }
  if(!s)return{ok:false,msg:'학생 정보를 찾을 수 없습니다.'};

  var title=String(params.title||'').trim();
  var body=String(params.body||'').trim();
  if(!title)return{ok:false,msg:'건의 제목을 입력해 주세요.'};
  if(!body)return{ok:false,msg:'건의 내용을 입력해 주세요.'};

  // 하루 3건 제한
  var today=todayStr();
  var rows=sheetToArray(SHEET_NAMES.SUGGESTIONS);
  var todayCount=0;
  for(var k=0;k<rows.length;k++){
    if(_s(rows[k][0])===today && String(rows[k][1])===String(num)) todayCount++;
  }
  if(todayCount>=3)return{ok:false,msg:'하루에 3건까지 건의할 수 있습니다.\n내일 다시 이용해 주세요.'};

  getSheet(SHEET_NAMES.SUGGESTIONS).appendRow([
    today, num, s.name,
    String(params.category||'기타'),
    title, body,
    String(params.reason||''),
    '접수', '', ''
  ]);
  return{ok:true};
}

// 목록 조회 (studentNum 주면 본인 것만)
function getSuggestions(studentNum){
  var rows=sheetToArray(SHEET_NAMES.SUGGESTIONS);
  var out=[];
  for(var i=0;i<rows.length;i++){
    if(rows[i][1]==='')continue;
    if(studentNum && String(rows[i][1])!==String(studentNum))continue;
    out.push({
      idx:i, date:_s(rows[i][0]),
      studentNum:_s(rows[i][1]), studentName:_s(rows[i][2]),
      category:_s(rows[i][3]), title:_s(rows[i][4]),
      body:_s(rows[i][5]), reason:_s(rows[i][6]),
      status:_s(rows[i][7])||'접수',
      reply:_s(rows[i][8]), replyDate:_s(rows[i][9])
    });
  }
  return out.reverse();
}

// 교사: 상태 변경 + 답변
function replySuggestion(idx, status, reply){
  var sh=getSheet(SHEET_NAMES.SUGGESTIONS);
  var rows=sheetToArray(SHEET_NAMES.SUGGESTIONS);
  if(!rows[idx])return{ok:false,msg:'건의를 찾을 수 없습니다.'};
  sh.getRange(idx+2,8).setValue(status||'검토중');
  if(reply!==undefined && reply!==null){
    sh.getRange(idx+2,9).setValue(String(reply));
    sh.getRange(idx+2,10).setValue(todayStr());
  }
  return{ok:true};
}

// 교사: 건의 삭제
function deleteSuggestion(idx){
  getSheet(SHEET_NAMES.SUGGESTIONS).deleteRow(idx+2);
  return{ok:true};
}

// 미확인 건의 수
function getSuggestionCount(){
  var rows=sheetToArray(SHEET_NAMES.SUGGESTIONS);
  var n=0;
  for(var i=0;i<rows.length;i++){
    if(rows[i][1]!=='' && (_s(rows[i][7])==='접수'||rows[i][7]==='')) n++;
  }
  return n;
}

// ── 전체 로드 ─────────────────────────────────────────────────
// 거래내역은 최근 500건만 (전체를 읽으면 매우 느려짐)
function getLedgerLimited(limit){
  const sh=getSheet(SHEET_NAMES.LEDGER);
  const last=sh.getLastRow();
  if(last<=1)return [];
  const max=limit||500;
  const start=Math.max(2,last-max+1);
  const cols=Math.max(8,Math.min(9,sh.getLastColumn()));
  const rows=sh.getRange(start,1,last-start+1,cols).getValues();
  return rows.map(function(r){
    return{date:_s(r[0]),month:_s(r[1]),studentNum:_s(r[2]),studentName:_s(r[3]),
           type:_s(r[4]),detail:_s(r[5]),amount:_n(r[6]),balance:_n(r[7]),
           treasury:(cols>8&&r[8]!==''&&r[8]!==null&&r[8]!==undefined)?_n(r[8]):null};
  }).reverse();
}

// 기존 시트에 초기잔액 열이 없으면 만들고, 빈 칸은 (현재잔액 - 거래합계)로 채움
function ensureInitialColumn(){
  var sh=getSheet(SHEET_NAMES.STUDENTS);
  var last=sh.getLastRow();
  if(sh.getLastColumn()<4) sh.getRange(1,4).setValue('초기잔액');
  if(last<=1)return;
  var rng=sh.getRange(2,1,last-1,4);
  var vals=rng.getValues();
  var changed=false;
  for(var i=0;i<vals.length;i++){
    if(vals[i][0]==='')continue;
    if(vals[i][3]===''||vals[i][3]===null||vals[i][3]===undefined){
      vals[i][3]=Math.max(0,(Number(vals[i][2])||0)-_ledgerSum(vals[i][0]));
      changed=true;
    }
  }
  if(changed) rng.setValues(vals);
}

function loadAll(){
  ensureInit();
  try{ ensureInitialColumn(); }catch(e){}
  const savRows=sheetToArray(SHEET_NAMES.SAVINGS);
  const pendingSavingsCount=savRows.filter(function(r){return r[9]==='승인대기';}).length;
  return{
    students:getStudents().map(function(s){return{num:_s(s.num),name:_s(s.name),balance:_n(s.balance),initial:_n(s.initial)};}),
    jobs:getJobs().map(function(j){return{name:_s(j.name),salary:_n(j.salary),slots:_n(j.slots),desc:_s(j.desc)};}),
    assignments:getAssignments().map(function(a){return{studentNum:_s(a.studentNum),jobName:_s(a.jobName)};}),
    salaryCfg:getSalaryConfig().map(function(c){return{month:_s(c.month),jobName:_s(c.jobName),salary:_n(c.salary)};}),
    items:getItems().map(function(i){return{name:_s(i.name),price:_n(i.price),stock:_n(i.stock),desc:_s(i.desc),category:_s(i.category)};}),
    shopPerms:getShopPerms().map(function(p){return{jobName:_s(p.jobName),category:_s(p.category),perm:_s(p.perm)};}),
    ledger:getLedgerLimited(500),
    pendingCount:0,
    pendingSavingsCount:pendingSavingsCount,
    bankPerms:getBankPerms().map(function(b){return{jobName:_s(b.jobName),role:_s(b.role)};}),
    bankSettings:getBankSettings(),
    loginSettings:getLoginSettings(),
    treasuryBalance:getTreasuryBalance(),
    suggestionCount:getSuggestionCount(),
    currentPeriod:getCurrentPeriod()
  };
}
