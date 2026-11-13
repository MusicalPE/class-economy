/* ──────────────────────────────────────────────────────────────
   가짜 학급 자료와 가짜 서버

   실제 스프레드시트 대신 이 자료로 화면을 띄웁니다.
   서버가 돌려주는 모양(gas/Code.gs 의 반환값)과 똑같이 맞춰 두었습니다.
   Code.gs 의 반환 모양을 바꿀 때는 여기도 같이 고쳐야 합니다.
   ────────────────────────────────────────────────────────────── */

export const SETTINGS = {
  title: '돈워리!', subtitle: '우리 반 경제를 함께 운영해요',
  logoType: 'default', emoji: '', logoUrl: '',
  theme: 'donworry', iconColor: 'theme'
};

export const STUDENTS = [
  { num: '1', name: '김하늘', balance: 12000, initial: 10000 },
  { num: '2', name: '이바다', balance: 8500,  initial: 10000 },
  { num: '3', name: '박가온', balance: 15500, initial: 10000 },
  { num: '4', name: '최슬기', balance: 9000,  initial: 10000 }
];

export const JOBS = [
  { name: '반장',     salary: 2000, slots: 1, desc: '학급 회의 진행' },
  { name: '상점지기', salary: 2500, slots: 1, desc: '물품 판매' },
  { name: '은행직원', salary: 2000, slots: 1, desc: '적금 창구' },
  { name: '청소반장', salary: 1500, slots: 1, desc: '청소 점검' }
];

export const ASSIGNMENTS = [
  { studentNum: '1', jobName: '반장' },
  { studentNum: '2', jobName: '상점지기' },
  { studentNum: '3', jobName: '은행직원' },
  { studentNum: '4', jobName: '청소반장' }
];

export const ITEMS = [
  { name: '자리 선택권', price: 50000, stock: 999, desc: '원하는 자리 1회', category: '특권' },
  { name: '급식 1등권', price: 5000,  stock: 1,   desc: '가장 먼저 급식',  category: '특권' },
  { name: '간식 쿠폰',   price: 1500,  stock: 18,  desc: '간식 1개',       category: '간식' }
];

export const LEDGER = [
  { date: '2026-11-12', month: '11', studentNum: '1', studentName: '김하늘',
    type: '급여', detail: '반장 급여 (11월 상반기)', amount: 2000, balance: 12000, treasury: 298500 },
  { date: '2026-11-11', month: '11', studentNum: '1', studentName: '김하늘',
    type: '보너스', detail: '학급 행사 기여', amount: 500, balance: 10000, treasury: 300500 },
  { date: '2026-11-10', month: '11', studentNum: '2', studentName: '이바다',
    type: '물품구입', detail: '간식 쿠폰 x1', amount: -1500, balance: 8500, treasury: 301000 }
];

export const SAVINGS = [
  { id: 'S1', studentNum: '3', studentName: '박가온', depositor: '박가온',
    principal: 5000, rate: 10, days: 15, startDate: '2026-11-10',
    maturityDate: '2026-11-25', status: '승인대기' }
];

function studentData(num) {
  const s = STUDENTS.find(x => String(x.num) === String(num));
  if (!s) return null;
  const a = ASSIGNMENTS.find(x => String(x.studentNum) === String(num));
  const job = a ? JOBS.find(j => j.name === a.jobName) : null;
  return {
    student: { num: s.num, name: s.name, balance: s.balance },
    job: job || null,
    ledger: LEDGER.filter(l => String(l.studentNum) === String(num)),
    shopPerms: a && a.jobName === '상점지기'
      ? [{ jobName: '상점지기', category: '전체', perm: '판매' }] : [],
    bankRole: a && a.jobName === '은행직원' ? '은행직원' : null,
    mySavings: SAVINGS.filter(v => String(v.studentNum) === String(num)),
    hasPendingReq: false
  };
}

export const LOAD_ALL = {
  students: STUDENTS, jobs: JOBS, assignments: ASSIGNMENTS,
  salaryCfg: [], items: ITEMS,
  shopPerms: [{ jobName: '상점지기', category: '전체', perm: '판매' }],
  ledger: LEDGER,
  pendingCount: 0, pendingSavingsCount: 1,
  bankPerms: [{ jobName: '은행직원', role: '은행직원' }],
  bankSettings: { rate15: 5, rate30: 10 },
  loginSettings: SETTINGS,
  treasuryBalance: 298500,
  suggestionCount: 1,
  currentPeriod: { month: 11, half: 1 }
};

/* 시험마다 바꿔 끼우는 서버 상태
     version   : 서버(라이브러리)가 자기 판이라고 답하는 숫자
     hasInfo   : false 면 getServerInfo 가 없는 옛 서버(2.2.0 이전)처럼 군다 */
export const state = { version: '2.0.0', hasInfo: true };

/* 함수 이름 → 돌려줄 값. 서버가 하는 일을 흉내만 냅니다. */
export function reply(fn, args) {
  switch (fn) {
    case 'ping':                return { ok: true, version: state.version };
    case 'getServerInfo':
      if (!state.hasInfo) throw new Error('허용되지 않은 요청입니다: getServerInfo');
      return { ok: true, version: state.version,
               sheetUrl: 'https://docs.google.com/spreadsheets/d/TEST/edit' };
    case 'getStudentsForLogin': return STUDENTS.map(s => ({ num: s.num, name: s.name }));
    case 'getLoginSettings':    return SETTINGS;
    case 'verifyStudentLogin': {
      const d = studentData(args[0]);
      return d ? { ok: true, data: d } : { ok: false, msg: '학생을 찾을 수 없습니다.' };
    }
    case 'refreshStudentData':  return { ok: true, data: studentData(args[0]) };
    case 'verifyAdminLogin':    return { ok: String(args[0]) === '1234', isDefault: true };
    case 'loadAll':             return LOAD_ALL;
    case 'getLedger':           return LEDGER;
    case 'getSavings':          return SAVINGS;
    case 'getSuggestions':      return [{ id: 'G1', date: '2026-11-12', studentName: '김하늘',
                                          category: '학급 규칙', title: '간식 쿠폰 가격',
                                          body: '조금 내려 주세요', reason: '저축해서 사고 싶어요',
                                          reply: '', status: '대기' }];
    case 'getTreasuryStats':    return { balance: 298500, monthIncome: 3500,
                                         monthExpense: 6500, income: 406000, expense: 107500 };
    case 'getTreasuryLedger':   return [{ date: '2026-11-12', month: '11', kind: '수입',
                                          type: '물품판매', detail: '간식 쿠폰', amount: 1500,
                                          balance: 298500 }];
    case 'getAllPasswords':     return STUDENTS.map(s => ({ num: s.num, name: s.name, pw: s.num }));
    case 'getSalaryTargets': {
      const targets = ASSIGNMENTS.map(a => {
        const s = STUDENTS.find(x => x.num === a.studentNum);
        const j = JOBS.find(x => x.name === a.jobName);
        return { num: s.num, name: s.name, jobName: a.jobName, amt: j.salary, paid: false };
      });
      return { targets, total: targets.reduce((t, x) => t + x.amt, 0),
               treasury: 298500, label: '11월 상반기' };
    }
    case 'getRestockStatus':    return ITEMS.map((it, i) => ({ idx: i, name: it.name,
                                   stock: it.stock, canRestock: true, lastWeek: '' }));
    case 'getStudentShopPerms': return { canSell: true, items: ITEMS };
    default:                    return { ok: true };
  }
}
