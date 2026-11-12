/* ──────────────────────────────────────────────────────────────
   돈워리! 올리기 전 검사

     node test/run.mjs

   새 기능을 넣었든 색만 바꿨든, 올리기 전에 한 번 돌립니다.
   하나라도 걸리면 끝에 "올리지 마세요"가 뜨고 종료 코드 1 로 끝납니다.

   처음 한 번은 준비가 필요합니다:  npm install
   ────────────────────────────────────────────────────────────── */
import { runStatic } from './static.mjs';

const only = process.argv[2];           // static | browser
let results = [];

function section(title, rows) {
  console.log('\n' + title);
  for (const r of rows) {
    console.log('  ' + (r.ok ? '통과' : '실패') + '  ' + r.name + (r.ok || !r.detail ? '' : '  →  ' + r.detail));
  }
  results = results.concat(rows);
}

if (only !== 'browser') section('[ 코드 검사 ]', runStatic());

if (only !== 'static') {
  let runBrowser;
  try {
    ({ runBrowser } = await import('./browser.mjs'));
    await import('playwright');
  } catch (e) {
    console.log('\n[ 화면 검사 ]\n  건너뜀  playwright 가 없습니다. 저장소 폴더에서 npm install 을 먼저 해 주세요.');
    results.push({ name: '화면 검사 준비', ok: false, detail: 'playwright 없음' });
    runBrowser = null;
  }
  if (runBrowser) section('[ 화면 검사 ]', await runBrowser());
}

const bad = results.filter(r => !r.ok);
console.log('\n' + '─'.repeat(52));
console.log('전체 ' + results.length + '개 · 통과 ' + (results.length - bad.length) + '개 · 실패 ' + bad.length + '개');
console.log(bad.length ? '올리지 마세요. 위의 실패 항목부터 고쳐야 합니다.' : '올려도 됩니다.');
process.exit(bad.length ? 1 : 0);
