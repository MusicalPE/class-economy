/* ──────────────────────────────────────────────────────────────
   돈워리! — 사용 안내

   어느 화면에서나 [? 사용 안내] 단추로 엽니다.
     · 로그인 화면: 왼쪽 위
     · 학생 화면: 위쪽 줄 단추들 맨 앞
     · 선생님 화면: 왼쪽 메뉴 맨 아래
   설치·처음 준비는 넣지 않습니다. 이 창을 보는 사람은 이미 설치한 뒤입니다.
   ────────────────────────────────────────────────────────────── */
var DW_HELP_ITEMS = [
  { t: '학생 명단 만들기 (선생님)', b: [
    '"학생 명단"에서 "학생 추가"를 눌러 출석 번호·이름·초기 잔액을 넣어요.',
    '학생의 처음 비밀번호는 출석번호예요. 학생이 직접 바꿀 수 있어요.'
  ]},
  { t: '직업 만들고 배정하기 (선생님)', b: [
    '"직업 관리"에서 "직업 추가"로 직업명·기본 급여·최대 인원을 정해요.',
    '"직업 배정"에서 학생과 직업을 고르고 "배정 확인"을 눌러요.',
    '이번 달만 직업 급여를 바꾸려면 "급여 설정"에 적어요. 비워 두면 기본 급여예요.'
  ]},
  { t: '급여·보너스·세금 (선생님)', b: [
    '위쪽에서 달과 회차(상반기·하반기)를 고르고 "급여 지급"을 눌러요.',
    '"보너스"는 고른 학생에게 같은 금액을 줘요. 급여와 보너스는 "학급 금고"에서 나가요.',
    '"세금"에서 고정 금액이나 잔액의 %로 걷어 학급 금고에 모아요. 잔액이 모자라도 0원까지만 빠져요.'
  ]},
  { t: '상점 열기 (선생님)', b: [
    '"물품 구입"에서 "물품 추가"로 물품명·가격·재고를 넣어요.',
    '"권한 관리"에서 직업에 상점 권한을 붙이면, 그 직업 학생이 물건을 팔 수 있어요.',
    '"자동 리필 켜기"를 해 두면 재고가 저절로 다시 채워져요.'
  ]},
  { t: '내 통장 보기 (학생)', b: [
    '첫 화면에서 번호를 고르고 비밀번호를 넣은 뒤 "내 통장 확인하기"를 눌러요.',
    '현재 잔액, 이번달 수입·지출, "최근 거래 내역"을 볼 수 있어요.',
    '"비밀번호 변경"에서 비밀번호를 바로 바꿀 수 있어요. 선생님 승인은 필요 없어요.'
  ]},
  { t: '물건 팔기·적금 받기 (학생)', b: [
    '상점 권한이 있는 학생은 내 화면의 "내 상점"에서 구매 학생·물품·수량을 고르고 "판매하기"를 눌러요.',
    '은행직원은 "은행 창구"에서 예금주·원금·기간·이자율을 정하고 "적금 신청"을 눌러요.',
    '교실 기기 하나로 하려면 선생님 메뉴의 "상점지기"·"은행 창구"에서 출석 번호로 들어가요.'
  ]},
  { t: '적금 승인하기 (선생님)', b: [
    '은행직원이 받은 적금은 "적금 현황"에 승인 대기로 올라와요. 메뉴 옆 숫자가 대기 건수예요.',
    '"승인"을 누르면 학생 잔액에서 원금이 빠지고 적금이 시작돼요. 만기가 되면 이자와 함께 돌아와요.'
  ]},
  { t: '건의 받기 (학생·선생님)', b: [
    '학생은 "선생님께 건의하기"에 제목·내용·이유를 적고 "건의 보내기"를 눌러요.',
    '선생님은 "건의함"에서 읽고 검토중·반영됨·보류로 표시해요.',
    '"거래 내역"과 "잔액 그래프"로 반 전체 흐름을 한눈에 볼 수 있어요.'
  ]},
  { t: '비밀번호를 잊었을 때·새 학년 (선생님)', b: [
    '학생 비밀번호: "비밀번호 관리"에서 그 학생의 "초기화"를 누르면 출석번호로 돌아가요.',
    '선생님 비밀번호: 스프레드시트의 \'설정\' 시트에서 ADMIN_PW 칸을 1234로 바꾸면 처음 비밀번호로 돌아가요.',
    '새 학기는 "초기화"의 "거래 기록 초기화", 새 학년은 "전체 초기화"를 써요. 되돌릴 수 없으니 신중히 눌러 주세요.'
  ]}
];

function dwHelpEsc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function openHelp() {
  closeHelp();
  var demo = !!window.CE_DEMO;
  var demoUrl = location.origin + location.pathname + '?demo';
  var h = '<div class="dw-help-box" role="dialog" aria-modal="true" aria-labelledby="dw-help-title">' +
    '<div class="dw-help-head"><div class="dw-help-title" id="dw-help-title">돈워리! 간략 사용법</div>' +
    '<button type="button" class="dw-help-x" onclick="closeHelp()" aria-label="닫기">&times;</button></div>' +
    '<ol class="dw-help-list">';
  for (var i = 0; i < DW_HELP_ITEMS.length; i++) {
    var it = DW_HELP_ITEMS[i];
    h += '<li class="dw-help-item"><span class="dw-help-no">' + (i + 1) + '</span><div>' +
         '<div class="dw-help-item-t">' + dwHelpEsc(it.t) + '</div><ul>';
    for (var j = 0; j < it.b.length; j++) h += '<li>' + dwHelpEsc(it.b[j]) + '</li>';
    h += '</ul></div></li>';
  }
  h += '</ol><div class="dw-help-foot">' +
    (demo ? '<span></span>' :
      '<a class="dw-help-demo" href="' + demoUrl + '" target="_blank" rel="noopener">지어낸 학급으로 미리 눌러 보기</a>') +
    '<button type="button" class="btn btn-primary" onclick="closeHelp()">확인</button></div></div>';

  var bg = document.createElement('div');
  bg.id = 'dw-help';
  bg.innerHTML = h;
  bg.onclick = function (e) { if (e.target === bg) closeHelp(); };
  document.body.appendChild(bg);
  var ok = bg.querySelector('.dw-help-foot .btn');
  if (ok) ok.focus();
}

function closeHelp() {
  var g = document.getElementById('dw-help');
  if (g) g.remove();
}

document.addEventListener('keydown', function (e) {
  if ((e.key === 'Escape' || e.key === 'Esc') && document.getElementById('dw-help')) {
    e.stopPropagation();
    closeHelp();
  }
}, true);
