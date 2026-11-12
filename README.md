# 돈워리!

초등 교실에서 직업·급여·세금·상점·은행·학급 금고를 운영하는 웹 프로그램입니다.

돈 걱정 말고 돈을 배우자는 뜻으로 지은 이름입니다.

Made by 음악적체육인

---

## 구조

```
화면          GitHub Pages (이 저장소)
데이터·계산    학교 스프레드시트 + Apps Script 라이브러리
```

학생 정보·잔액·거래 내역은 **각 학교의 스프레드시트 안에만** 있습니다.
이 저장소에는 화면만 들어 있고, 어떤 자료도 수집하지 않습니다.

```
index.html          화면 틀
css/style.css       모양
js/api.js           서버 연결 (fetch)
js/app.js           화면 동작
assets/             아이콘 (icon.svg 가 원본)
manifest.webmanifest
gas/Code.gs         라이브러리 원본 (제작자용)
gas/appsscript.json
shell/Shell.gs      각 학교 시트에 붙는 껍데기
shell/appsscript.json
```

## 미리보기

학교 시트 없이 지어낸 학급으로 둘러볼 수 있어요. 바꾼 내용은 저장되지 않고 새로고침하면 처음으로 돌아갑니다.

- 첫 화면: https://musicalpe.github.io/class-economy/?demo
- 선생님 화면: https://musicalpe.github.io/class-economy/?demo=teacher
- 학생 화면: https://musicalpe.github.io/class-economy/?demo=student

`js/demo.js` 가 `gas/Code.gs` 를 브라우저에서 그대로 돌리고, 스프레드시트 대신 메모리 속 표를 씁니다.
서버를 고치면 미리보기도 함께 바뀝니다.

## 화면을 고쳤을 때

GitHub에 올리면 모든 학교에 바로 적용됩니다. 따로 할 일이 없습니다.
브라우저가 옛 파일을 쥐고 있을 수 있으므로, `index.html` 안의
`?v=2.0.0` 숫자를 함께 올려 주세요.

## 서버를 고쳤을 때

`gas/Code.gs` 를 라이브러리 프로젝트에 반영하고 **배포 > 새 배포**로
라이브러리 버전을 올립니다. 각 학교는 라이브러리 버전만 바꾸면 됩니다.
껍데기(`Shell.gs`)는 다시 붙여 넣을 필요가 없습니다.

## 설치

`설치안내.txt` 를 보세요.

## 올리기 전 검사

새 기능을 넣었든 색만 바꿨든, 올리기 전에 한 번 돌립니다.

```
npm install        (처음 한 번)
node test/run.mjs
```

가짜 학급 자료로 화면을 실제로 띄워서 학생 로그인, 교사 로그인,
모든 메뉴, 급여 지급, 건의 제출, 비밀번호 변경을 한 번씩 밟습니다.
하나라도 걸리면 "올리지 마세요"가 뜹니다.

서버가 돌려주는 값의 모양을 바꿨다면 `test/mock.mjs` 도 같이 고쳐야 합니다.

## 판 번호

- 2.0.0 — GitHub Pages로 화면 분리, 라이브러리 + 껍데기 구조로 전환
