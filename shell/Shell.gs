/* ──────────────────────────────────────────────────────────────
   돈워리! — 껍데기 (Shell.gs)

   이 파일은 고칠 일이 없습니다.
   실제 기능은 라이브러리(CE)에 들어 있고, 선생님의 자료는
   이 스프레드시트 안에만 남습니다.

   새 기능이 나오면 라이브러리 버전만 올리면 됩니다.
   ────────────────────────────────────────────────────────────── */

/* ── 웹앱 입구 ───────────────────────────────────────────────── */

function doGet(e) {
  return CE.doGet(e, ScriptApp.getService().getUrl());
}

function doPost(e) {
  return CE.doPost(e);
}

/* ── 자동 처리 ───────────────────────────────────────────────
   매일 정해진 시각에 저절로 실행되는 일입니다.
   시간 예약은 이 스프레드시트에 걸리기 때문에, 예약이 부를
   이름이 여기에도 있어야 합니다.
   ────────────────────────────────────────────────────────── */

function processAutoRefill() {
  return CE.processAutoRefill();
}

function processMatureSavings() {
  return CE.processMatureSavings();
}

/* ── 스프레드시트 메뉴 ───────────────────────────────────────── */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('돈워리!')
    .addItem('접속 주소 보기', 'ce_showUrl')
    .addItem('자동 처리 켜기', 'ce_initTriggers')
    .addSeparator()
    .addItem('이전 판 설정 가져오기', 'ce_importLegacy')
    .addToUi();
}

function ce_showUrl() {
  var url = ScriptApp.getService().getUrl();
  var ui = SpreadsheetApp.getUi();
  if (!url) {
    ui.alert('아직 배포하지 않았습니다.\n\n확장 프로그램 > Apps Script > 배포 > 새 배포에서\n웹 앱으로 배포한 뒤 다시 눌러 주세요.');
    return;
  }
  ui.alert('학생들에게 알려 줄 주소입니다.\n\n' + url +
           '\n\n이 주소로 들어오면 돈워리! 화면이 열립니다.');
}

function ce_initTriggers() {
  CE.initRefillTrigger();
  CE.initSavingsTrigger();
  SpreadsheetApp.getUi().alert(
    '자동 처리를 켰습니다.\n\n' +
    '· 매일 0시 10분 — 물품 자동 리필\n' +
    '· 매일 9시 — 적금 만기 처리');
}

/* 2.0 이전 판을 쓰던 학급만 한 번 실행하면 됩니다.
   예전에 저장해 둔 제목·로고·테마·이자율·관리자 비밀번호를
   '설정' 시트로 옮겨 옵니다. 새로 설치했다면 누를 일이 없습니다. */
function ce_importLegacy() {
  var r = CE.importLegacySettings(PropertiesService.getScriptProperties().getProperties());
  SpreadsheetApp.getUi().alert(
    r.count > 0
      ? '이전 설정 ' + r.count + '개를 가져왔습니다.'
      : '가져올 이전 설정이 없습니다. 새로 설치한 학급이라면 정상입니다.');
}
