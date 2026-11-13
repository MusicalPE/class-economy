/* ──────────────────────────────────────────────────────────────
   브라우저 없이 하는 검사

   버튼을 눌렀는데 아무 일도 안 일어나는 사고는 대부분 여기서 잡힙니다.
     · 문법 오류, 중괄호 짝
     · 화면의 on* 핸들러가 가리키는 함수가 실제로 있는지
     · 화면이 부르는 서버 함수가 서버 목록에 등록돼 있는지
     · 등록된 서버 함수가 Code.gs 에 정의돼 있는지
   ────────────────────────────────────────────────────────────── */
import fs from 'fs';
import path from 'path';
import os from 'os';
import { execFileSync } from 'child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8');

export function runStatic() {
  const out = [];
  const add = (name, ok, detail) => out.push({ name, ok, detail: detail || '' });

  const html = read('index.html');
  const app = read('js/app.js');
  const api = read('js/api.js') + '\n' + read('js/update.js');
  const gs = read('gas/Code.gs');
  const shell = read('shell/Shell.gs');

  // 1. 문법
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dw-'));
  for (const [label, src] of [['js/app.js', app], ['js/api.js', api], ['sw.js', read('sw.js')], ['js/demo.js', read('js/demo.js')], ['js/update.js', read('js/update.js')],
                              ['gas/Code.gs', gs], ['shell/Shell.gs', shell]]) {
    const f = path.join(tmp, label.replace(/[\/.]/g, '_') + '.js');
    fs.writeFileSync(f, src);
    try {
      execFileSync(process.execPath, ['--check', f], { stdio: 'pipe' });
      add('문법 ' + label, true);
    } catch (e) {
      add('문법 ' + label, false, String(e.stderr || e.message).split('\n').slice(0, 3).join(' '));
    }
  }

  // 2. 중괄호 짝
  for (const [label, src] of [['js/app.js', app], ['css/style.css', read('css/style.css')],
                              ['gas/Code.gs', gs]]) {
    const o = (src.match(/{/g) || []).length, c = (src.match(/}/g) || []).length;
    add('중괄호 ' + label, o === c, o === c ? '' : '{ ' + o + ' / } ' + c);
  }

  // 3. on* 핸들러 ↔ 함수 정의
  const defined = new Set([
    ...[...(app + api).matchAll(/function\s+(\w+)\s*\(/g)].map(m => m[1]),
    ...[...(app + api).matchAll(/(?:var|let|const)\s+(\w+)\s*=\s*function/g)].map(m => m[1]),
    ...[...(app + api).matchAll(/window\.(\w+)\s*=\s*function/g)].map(m => m[1])
  ]);
  const skip = new Set(['if', 'for', 'while', 'return', 'typeof', 'alert', 'confirm',
                        'parseInt', 'parseFloat', 'Number', 'String', 'event', 'this']);
  const handlers = new Set();
  for (const m of html.matchAll(/\son\w+\s*=\s*"([^"]*)"/g))
    for (const n of m[1].matchAll(/(\w+)\s*\(/g)) handlers.add(n[1]);
  const deadHandlers = [...handlers].filter(h => !defined.has(h) && !skip.has(h));
  add('버튼이 부르는 함수 ' + handlers.size + '종', deadHandlers.length === 0,
      deadHandlers.length ? '정의 없음: ' + deadHandlers.join(', ') : '');

  // 4. 화면이 부르는 서버 함수 ↔ 서버 목록
  const called = new Set([...(app + read('js/update.js')).matchAll(/call\('(\w+)'/g)].map(m => m[1]));
  const i = gs.indexOf('function _apiTable()'), j = gs.indexOf('function doPost(e)');
  const table = new Set([...gs.slice(i, j).matchAll(/^\s{4}(\w+):/gm)].map(m => m[1]));
  const notRegistered = [...called].filter(c => !table.has(c));
  add('화면 → 서버 호출 ' + called.size + '종', notRegistered.length === 0,
      notRegistered.length ? '서버 목록에 없음: ' + notRegistered.join(', ') : '');

  // 5. 서버 목록 ↔ Code.gs 정의
  const gsDefined = new Set([...gs.matchAll(/^function\s+(\w+)/gm)].map(m => m[1]));
  const undefinedInGs = [...table].filter(t => t !== 'ping' && !gsDefined.has(t));
  add('서버 목록 ' + table.size + '종', undefinedInGs.length === 0,
      undefinedInGs.length ? 'Code.gs 에 없음: ' + undefinedInGs.join(', ') : '');

  // 6. 속으로만 쓰는 함수가 밖으로 열려 있지 않은지
  const leaked = [...table].filter(t => t.startsWith('_'));
  add('내부 함수 비공개', leaked.length === 0, leaked.join(', '));

  // 7. 껍데기가 부르는 라이브러리 함수가 실제로 있는지
  const shellCalls = new Set([...shell.matchAll(/CE\.(\w+)\(/g)].map(m => m[1]));
  const missingInLib = [...shellCalls].filter(c => !gsDefined.has(c));
  add('껍데기 → 라이브러리 ' + shellCalls.size + '종', missingInLib.length === 0,
      missingInLib.length ? '라이브러리에 없음: ' + missingInLib.join(', ') : '');

  // 8. 앱스 스크립트를 거치던 시절의 흔적
  add('google.script.run 호출 없음', !/google\.script\.run\s*[.\[]/.test(app + api));

  // 9. 판 번호가 화면·서비스워커에서 서로 맞는지
  const vHtml = [...new Set([...html.matchAll(/\?v=([\d.]+)/g)].map(m => m[1]))];
  const vSw = (read('sw.js').match(/VERSION\s*=\s*'([\d.]+)'/) || [])[1];
  add('판 번호 일치', vHtml.length === 1 && vHtml[0] === vSw,
      'index.html ' + vHtml.join('/') + ' · sw.js ' + vSw);

  // 10. 화면이 '최신'이라고 알리는 판이 실제 서버 코드보다 앞서지 않는지
  const latest = (read('js/update.js').match(/DW_SERVER_LATEST\s*=\s*'([\d.]+)'/) || [])[1];
  const appVer = (gs.match(/APP_VERSION\s*=\s*'([\d.]+)'/) || [])[1];
  const num = v => String(v || '0').split('.').map(Number).reduce((a, b) => a * 1000 + b, 0);
  add('알리는 최신 판 ≤ 서버 코드 판', !!latest && num(latest) <= num(appVer),
      '알림 ' + latest + ' · Code.gs ' + appVer);

  return out;
}
