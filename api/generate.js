<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>어린이집 알림장 자동 생성기</title>
<link rel="manifest" href="/manifest.json">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="알림장">
<meta name="theme-color" content="#1D9E75">
<link rel="apple-touch-icon" href="/icon-192.png">
<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
<link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">
<link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
html,body{font-family:'Gaegu',cursive;background:#D3D1C7;color:#2C2C2A;min-height:100vh;}
.wrap{max-width:700px;margin:0 auto;padding:1.4rem 1rem;}
.app-title{font-size:28px;font-weight:700;color:#1D9E75;text-align:center;margin-bottom:2px;}
.app-sub{font-size:16px;font-weight:700;color:#5F5E5A;text-align:center;margin-bottom:1.2rem;}

.tabs{display:flex;gap:6px;margin-bottom:14px;}
.tab{flex:1;padding:9px 6px;border:1px solid #B4B2A9;border-radius:99px;background:#F1EFE8;color:#5F5E5A;font-size:16px;font-weight:700;cursor:pointer;font-family:'Gaegu',cursive;text-align:center;transition:all 0.15s;}
.tab.on{background:#1D9E75;border-color:#1D9E75;color:#fff;}

.card{background:#F1EFE8;border:1px solid #B4B2A9;border-radius:14px;padding:1rem 1.25rem;margin-bottom:12px;}
.card-title{font-size:17px;font-weight:700;color:#27500A;margin-bottom:10px;}

.label{font-size:15px;font-weight:700;color:#444441;margin-bottom:4px;display:block;}
.field{margin-bottom:10px;}
input[type=text],textarea,select{
  width:100%;font-size:15px;font-weight:700;font-family:'Gaegu',cursive;
  border-radius:8px;border:1px solid #B4B2A9;padding:8px 10px;
  color:#2C2C2A;background:#fff;
}
input[type=text]:focus,textarea:focus,select:focus{outline:none;border-color:#1D9E75;}
textarea{resize:none;line-height:1.5;}
input::placeholder,textarea::placeholder{color:#888780;font-family:'Gaegu',cursive;font-weight:400;}

.cat-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}

.kids-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;}
.kid-btn{
  padding:8px 16px;border:1px solid #B4B2A9;border-radius:99px;
  background:#F1EFE8;color:#444441;font-size:15px;font-weight:700;
  cursor:pointer;font-family:'Gaegu',cursive;transition:all 0.15s;
}
.kid-btn.on{background:#1D9E75;border-color:#1D9E75;color:#fff;}

.mode-row{display:flex;gap:6px;margin-bottom:10px;}
.mode-btn{
  padding:8px 6px;border:1px solid #B4B2A9;border-radius:8px;
  background:#F1EFE8;color:#5F5E5A;font-size:15px;font-weight:700;
  cursor:pointer;font-family:'Gaegu',cursive;text-align:center;flex:1;transition:all 0.15s;
}
.mode-btn.a-out{background:#EAF3DE;border-color:#97C459;color:#27500A;}
.mode-btn.a-in{background:#E6F1FB;border-color:#85B7EB;color:#0C447C;}
.mode-btn.a-both{background:#FAEEDA;border-color:#EF9F27;color:#633806;}

.act-block{border-radius:8px;padding:10px 12px;margin-bottom:8px;}
.out-blk{background:#EAF3DE;border:1px solid #97C459;}
.in-blk{background:#E6F1FB;border:1px solid #85B7EB;}
.blk-label{font-size:14px;font-weight:700;margin-bottom:6px;}
.out-blk .blk-label{color:#27500A;}
.in-blk .blk-label{color:#0C447C;}

.gen-btn-row{display:flex;gap:8px;margin-top:4px;}
.gen-btn{
  flex:1;padding:12px;border-radius:8px;border:none;
  font-size:17px;font-weight:700;font-family:'Gaegu',cursive;cursor:pointer;transition:all 0.15s;
}
.gen-btn:active{transform:scale(0.97);}
.gen-main{background:#1D9E75;color:#fff;}
.gen-copy{background:#EAF3DE;color:#27500A;border:1px solid #97C459;}

.result-box{
  background:#fff;border:1px solid #97C459;border-radius:14px;
  padding:1rem 1.25rem;margin-top:10px;font-size:15px;font-weight:700;
  color:#2C2C2A;line-height:1.8;white-space:pre-wrap;display:none;
}
.loading-box{
  text-align:center;padding:1.5rem;color:#1D9E75;font-size:17px;font-weight:700;display:none;
}

.profile-form{
  display:none;background:#EAF3DE;border:1px solid #97C459;
  border-radius:14px;padding:1rem 1.25rem;margin-top:8px;
}
.profile-form.open{display:block;}
.save-btn{
  width:100%;padding:10px;background:#1D9E75;color:#fff;border:none;
  border-radius:8px;font-size:16px;font-weight:700;font-family:'Gaegu',cursive;cursor:pointer;margin-top:8px;
}
.del-btn{
  width:100%;padding:8px;background:#FCEBEB;color:#A32D2D;
  border:1px solid #F09595;border-radius:8px;font-size:14px;font-weight:700;
  font-family:'Gaegu',cursive;cursor:pointer;margin-top:6px;
}
.cancel-btn{
  width:100%;padding:8px;background:#F1EFE8;color:#5F5E5A;
  border:1px solid #B4B2A9;border-radius:8px;font-size:14px;font-weight:700;
  font-family:'Gaegu',cursive;cursor:pointer;margin-top:4px;
}

.gender-row{display:flex;gap:8px;}
.gender-opt{
  flex:1;padding:10px;border:1px solid #B4B2A9;border-radius:8px;
  background:#fff;color:#444441;font-size:16px;font-weight:700;
  font-family:'Gaegu',cursive;cursor:pointer;text-align:center;transition:all 0.15s;
}
.gender-opt.boy{background:#E6F1FB;border-color:#85B7EB;color:#0C447C;}
.gender-opt.girl{background:#FBEAF0;border-color:#ED93B1;color:#72243E;}

.common-notice{
  background:#FAEEDA;border:1px solid #EF9F27;border-radius:8px;
  padding:8px 12px;font-size:14px;font-weight:700;color:#633806;margin-bottom:10px;
  white-space:pre-line;
}

.kid-info-preview{font-size:15px;font-weight:700;color:#444441;line-height:1.8;white-space:pre-line;}

.add-profile-btn{
  width:100%;padding:10px;background:#EAF3DE;color:#27500A;
  border:1px solid #97C459;border-radius:8px;font-size:16px;font-weight:700;
  font-family:'Gaegu',cursive;cursor:pointer;
}
</style>
</head>
<body>
<div class="wrap">
  <div class="app-title">🌿 어린이집 알림장</div>
  <div class="app-sub">아이별 맞춤 알림장 자동 생성기</div>

  <div class="tabs">
    <div class="tab on" onclick="showTab('alarm')">📝 알림장 작성</div>
    <div class="tab" onclick="showTab('profile')">👶 아이 프로필</div>
    <div class="tab" onclick="showTab('common')">📌 공통 정보</div>
  </div>

  <!-- 알림장 탭 -->
  <div id="tab-alarm">

    <div class="card">
      <div class="card-title">🌿 오늘 공통 활동 입력 <span style="font-size:13px;color:#888780;font-weight:400;">(한번만 입력 → 모든 아이 공유)</span></div>
      <div class="mode-row">
        <div class="mode-btn a-out" onclick="setMode('out')">🌿 야외활동</div>
        <div class="mode-btn" onclick="setMode('in')">🏠 실내활동</div>
        <div class="mode-btn" onclick="setMode('both')">🌿+🏠 모두</div>
      </div>
      <div id="outBlock" class="act-block out-blk">
        <div class="blk-label">🌿 야외활동</div>
        <div class="field"><label class="label">목적지 / 체험 장소</label><input type="text" id="outPlace" placeholder="예: 뒷산 숲, 공원"></div>
      </div>
      <div id="inBlock" class="act-block in-blk" style="display:none;">
        <div class="blk-label">🏠 실내활동</div>
        <div class="field"><label class="label">실내활동 내용</label><input type="text" id="inAct" placeholder="예: 우산 만들기, 악기놀이"></div>
      </div>
      <div class="cat-grid" style="margin-top:8px;">
        <div class="field"><label class="label">💬 언어/말하기</label><input type="text" id="cat1" placeholder="예: 다람쥐 찾기"></div>
        <div class="field"><label class="label">🎮 활동과 놀이</label><input type="text" id="cat2" placeholder="예: 모종심기"></div>
        <div class="field"><label class="label">🍱 식사</label><input type="text" id="cat3" placeholder="예: 잘 먹음, 당근 조금 남김"></div>
        <div class="field"><label class="label">🤝 사회성/발달</label><input type="text" id="cat4" placeholder="예: 친구와 함께 놀기"></div>
        <div class="field"><label class="label">💊 건강/약복용</label><input type="text" id="cat5" placeholder="예: 감기약 알약 잘 복용"></div>
        <div class="field"><label class="label">⭐ 특징적인 일</label><input type="text" id="cat6" placeholder="예: 넘어져서 손등 살짝 까짐"></div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">👶 아이 선택 후 바로 생성!</div>
      <div style="font-size:14px;font-weight:700;color:#888780;margin-bottom:10px;">아이 버튼 클릭하면 바로 알림장이 생성돼요 🌿</div>
      <div class="kids-row" id="kidsBtns"></div>
    </div>

    <div class="card" id="kidInfoCard" style="display:none;">
      <div class="card-title">📋 선택된 아이</div>
      <div class="kid-info-preview" id="kidInfoPreview"></div>
    </div>

    <div class="loading-box" id="loadingBox">✨ 알림장 작성 중이에요... 잠깐만요! 🥰</div>
    <div class="result-box" id="resultBox"></div>
    <div class="gen-btn-row" id="copyBtnRow" style="display:none;margin-top:8px;">
      <button class="gen-btn gen-copy" onclick="copyResult()">📋 복사하기</button>
    </div>
  </div>

  <!-- 프로필 탭 -->
  <div id="tab-profile" style="display:none;">
    <div class="card">
      <div class="card-title">👶 아이 프로필 관리</div>
      <div class="kids-row" id="profileBtns"></div>
      <button class="add-profile-btn" onclick="openAddForm()">➕ 새 아이 추가하기</button>
    </div>

    <div class="profile-form" id="profileForm">
      <input type="hidden" id="editingKidId">
      <div class="field"><label class="label">🏷️ 아이 이름</label><input type="text" id="pName" placeholder="예: 김민준"></div>
      <div class="field">
        <label class="label">⚥ 성별</label>
        <div class="gender-row">
          <div class="gender-opt" id="genderM" onclick="selectGender('남')">👦 남자</div>
          <div class="gender-opt" id="genderF" onclick="selectGender('여')">👧 여자</div>
        </div>
        <input type="hidden" id="pGender" value="">
      </div>
      <div class="field"><label class="label">🎂 나이 (만 나이)</label><input type="text" id="pAge" placeholder="예: 3" style="width:140px;"></div>
      <div class="field"><label class="label">🌟 성격 / 특징</label><textarea id="pChar" rows="2" placeholder="예: 활발하고 호기심 많음, 수줍음 많고 섬세함"></textarea></div>
      <div class="field"><label class="label">💬 언어 발달 수준</label><input type="text" id="pLang" placeholder="예: 문장으로 잘 말함, 단어 위주로 표현"></div>
      <div class="field"><label class="label">🍱 식습관</label><input type="text" id="pEat" placeholder="예: 골고루 잘 먹음, 당근 못 먹음"></div>
      <div class="field"><label class="label">💊 알레르기 / 건강</label><input type="text" id="pHealth" placeholder="예: 땅콩 알레르기, 특이사항 없음"></div>
      <div class="field"><label class="label">✏️ 기타 메모</label><textarea id="pMemo" rows="2" placeholder="예: 낮잠 잘 안 잠, 특정 친구와 잘 놀음"></textarea></div>
      <button class="save-btn" onclick="saveKid()">💾 저장하기</button>
      <button class="del-btn" id="delBtn" style="display:none;" onclick="deleteKid()">🗑️ 이 아이 삭제하기</button>
      <button class="cancel-btn" onclick="closeForm()">✕ 취소</button>
    </div>
  </div>

  <!-- 공통 정보 탭 -->
  <div id="tab-common" style="display:none;">
    <div class="card">
      <div class="card-title">📌 공통 준비물 (매번 유지)</div>
      <div class="field"><textarea id="commonPrep" rows="3" placeholder="예: 여벌 옷 1벌, 물통, 낮잠 이불" oninput="saveCommon()"></textarea></div>
    </div>
    <div class="card">
      <div class="card-title">📢 공통 공지사항</div>
      <div class="field"><textarea id="commonNotice" rows="3" placeholder="예: 이번 주 금요일 부모 참여 수업 있습니다." oninput="saveCommon()"></textarea></div>
    </div>
    <div class="card">
      <div class="card-title">🏫 어린이집 / 학급 이름</div>
      <div class="field"><input type="text" id="className" placeholder="예: 햇빛반" oninput="saveCommon()"></div>
    </div>
  </div>
</div>

<script>
let kids = [];
let selKidId = null;
let actMode = 'out';
let editGender = '';

function loadData() {
  try { kids = JSON.parse(localStorage.getItem('kn_kids_v2') || '[]'); } catch(e) { kids = []; }
  try {
    const c = JSON.parse(localStorage.getItem('kn_common') || '{}');
    if (c.prep) document.getElementById('commonPrep').value = c.prep;
    if (c.notice) document.getElementById('commonNotice').value = c.notice;
    if (c.className) document.getElementById('className').value = c.className;
  } catch(e) {}
  renderKidBtns();
  renderProfileBtns();
  updateCommonPreview();
}

function saveKids() { localStorage.setItem('kn_kids_v2', JSON.stringify(kids)); }

function saveCommon() {
  localStorage.setItem('kn_common', JSON.stringify({
    prep: document.getElementById('commonPrep').value,
    notice: document.getElementById('commonNotice').value,
    className: document.getElementById('className').value
  }));
  updateCommonPreview();
}

function updateCommonPreview() {
  const prep = document.getElementById('commonPrep').value;
  const notice = document.getElementById('commonNotice').value;
  let txt = '';
  if (prep) txt += '📦 준비물: ' + prep + '\n';
  if (notice) txt += '📢 공지: ' + notice;
  // commonPreview removed
}

function renderKidBtns() {
  const row = document.getElementById('kidsBtns');
  row.innerHTML = '';
  if (!kids.length) {
    row.innerHTML = '<div style="font-size:15px;font-weight:700;color:#888780;">아이 프로필 탭에서 아이를 추가해줘요!</div>';
    return;
  }
  kids.forEach(k => {
    const icon = k.gender === '여' ? '👧' : (k.gender === '남' ? '👦' : '👶');
    const btn = document.createElement('div');
    btn.className = 'kid-btn' + (selKidId === k.id ? ' on' : '');
    btn.textContent = icon + ' ' + k.name + (k.age ? ' (' + k.age + '세)' : '');
    btn.onclick = () => selectKid(k.id);
    row.appendChild(btn);
  });
}

function renderProfileBtns() {
  const row = document.getElementById('profileBtns');
  row.innerHTML = '';
  kids.forEach(k => {
    const icon = k.gender === '여' ? '👧' : (k.gender === '남' ? '👦' : '👶');
    const btn = document.createElement('div');
    btn.className = 'kid-btn';
    btn.textContent = icon + ' ' + k.name + (k.age ? ' (' + k.age + '세)' : '');
    btn.onclick = () => openEditForm(k.id);
    row.appendChild(btn);
  });
}

function selectKid(id) {
  selKidId = id;
  renderKidBtns();
  const k = kids.find(x => x.id === id);
  if (!k) return;
  document.getElementById('kidInfoCard').style.display = 'block';
  const icon = k.gender === '여' ? '👧' : (k.gender === '남' ? '👦' : '👶');
  const genderTxt = k.gender ? ' | ' + k.gender + '아' : '';
  const ageTxt = k.age ? ' | 만 ' + k.age + '세' : '';
  let info = icon + ' ' + k.name + genderTxt + ageTxt;
  if (k.char) info += '\n🌟 성격: ' + k.char;
  if (k.lang) info += '\n💬 언어: ' + k.lang;
  if (k.eat) info += '\n🍱 식습관: ' + k.eat;
  if (k.health) info += '\n💊 건강: ' + k.health;
  if (k.memo) info += '\n✏️ 메모: ' + k.memo;
  document.getElementById('kidInfoPreview').textContent = info;
  // 아이 선택하면 바로 알림장 생성!
  generateAlarm();
}

function setMode(m) {
  actMode = m;
  const btns = document.querySelectorAll('.mode-btn');
  btns.forEach(b => b.className = 'mode-btn');
  if (m === 'out') {
    btns[0].className = 'mode-btn a-out';
    document.getElementById('outBlock').style.display = 'block';
    document.getElementById('inBlock').style.display = 'none';
  } else if (m === 'in') {
    btns[1].className = 'mode-btn a-in';
    document.getElementById('outBlock').style.display = 'none';
    document.getElementById('inBlock').style.display = 'block';
  } else {
    btns[2].className = 'mode-btn a-both';
    document.getElementById('outBlock').style.display = 'block';
    document.getElementById('inBlock').style.display = 'block';
  }
}

function selectGender(g) {
  editGender = g;
  document.getElementById('pGender').value = g;
  document.getElementById('genderM').className = 'gender-opt' + (g === '남' ? ' boy' : '');
  document.getElementById('genderF').className = 'gender-opt' + (g === '여' ? ' girl' : '');
}

function openAddForm() {
  editGender = '';
  document.getElementById('editingKidId').value = '';
  ['pName','pAge','pChar','pLang','pEat','pHealth','pMemo'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('pGender').value = '';
  document.getElementById('genderM').className = 'gender-opt';
  document.getElementById('genderF').className = 'gender-opt';
  document.getElementById('delBtn').style.display = 'none';
  document.getElementById('profileForm').className = 'profile-form open';
}

function openEditForm(id) {
  const k = kids.find(x => x.id === id);
  if (!k) return;
  document.getElementById('editingKidId').value = id;
  document.getElementById('pName').value = k.name || '';
  document.getElementById('pAge').value = k.age || '';
  document.getElementById('pChar').value = k.char || '';
  document.getElementById('pLang').value = k.lang || '';
  document.getElementById('pEat').value = k.eat || '';
  document.getElementById('pHealth').value = k.health || '';
  document.getElementById('pMemo').value = k.memo || '';
  selectGender(k.gender || '');
  document.getElementById('delBtn').style.display = 'block';
  document.getElementById('profileForm').className = 'profile-form open';
}

function closeForm() {
  document.getElementById('profileForm').className = 'profile-form';
}

function saveKid() {
  const name = document.getElementById('pName').value.trim();
  if (!name) { alert('이름을 입력해줘요! 🥺'); return; }
  const id = document.getElementById('editingKidId').value;
  const data = {
    id: id || ('k' + Date.now()),
    name,
    gender: document.getElementById('pGender').value,
    age: document.getElementById('pAge').value.trim(),
    char: document.getElementById('pChar').value.trim(),
    lang: document.getElementById('pLang').value.trim(),
    eat: document.getElementById('pEat').value.trim(),
    health: document.getElementById('pHealth').value.trim(),
    memo: document.getElementById('pMemo').value.trim()
  };
  if (id) { const i = kids.findIndex(x => x.id === id); if (i >= 0) kids[i] = data; }
  else kids.push(data);
  saveKids();
  renderKidBtns();
  renderProfileBtns();
  closeForm();
}

function deleteKid() {
  const id = document.getElementById('editingKidId').value;
  if (!id || !confirm('정말 삭제할까요?')) return;
  kids = kids.filter(x => x.id !== id);
  saveKids();
  if (selKidId === id) { selKidId = null; document.getElementById('kidInfoCard').style.display = 'none'; }
  renderKidBtns();
  renderProfileBtns();
  closeForm();
}

async function generateAlarm() {
  if (!selKidId) { alert('아이를 먼저 선택해줘요! 👶'); return; }
  const k = kids.find(x => x.id === selKidId);
  if (!k) return;

  const genderTxt = k.gender === '남' ? '남자아이' : k.gender === '여' ? '여자아이' : '';
  const ageTxt = k.age ? '만 ' + k.age + '세' : '';
  const kidInfo = [
    '이름: ' + k.name,
    genderTxt ? '성별: ' + genderTxt : '',
    ageTxt ? '나이: ' + ageTxt : '',
    k.char ? '성격: ' + k.char : '',
    k.lang ? '언어발달: ' + k.lang : '',
    k.eat ? '식습관: ' + k.eat : '',
    k.health ? '건강/알레르기: ' + k.health : '',
    k.memo ? '메모: ' + k.memo : ''
  ].filter(Boolean).join('\n');

  let actInfo = '';
  if (actMode === 'out') actInfo = '야외활동 - 장소: ' + document.getElementById('outPlace').value;
  else if (actMode === 'in') actInfo = '실내활동 - 내용: ' + document.getElementById('inAct').value;
  else actInfo = '야외활동(' + document.getElementById('outPlace').value + ') + 실내활동(' + document.getElementById('inAct').value + ')';

  const kw = [];
  const ids = ['cat1','cat2','cat3','cat4','cat5','cat6'];
  const labels = ['💬 언어/말하기','🎮 활동/놀이','🍱 식사','🤝 사회성','💊 건강/약','⭐ 특이사항'];
  ids.forEach((id, i) => { const v = document.getElementById(id).value; if (v) kw.push(labels[i] + ': ' + v); });

  const commonPrep = document.getElementById('commonPrep').value;
  const commonNotice = document.getElementById('commonNotice').value;
  const className = document.getElementById('className').value || '우리반';

  const prompt = `아래 정보로 어린이집 알림장을 써줘.

[아이 정보]
${kidInfo}

[활동 정보]
${actInfo}

[오늘 키워드]
${kw.join('\n') || '없음'}

[준비물]
공통: ${commonPrep || '없음'}

[공지사항]
${commonNotice || '없음'}

[학급명]
${className}

[작성 규칙]
- 반드시 하나의 글처럼 자연스럽게 이어서 써줘. 절대 카테고리나 소제목으로 나누지 말 것
- 인사말로 시작해서 오늘 있었던 일을 하나의 이야기처럼 쭉 이어서 써줘
- 아이 행동 묘사는 반드시 평어체(먹었어요, 했어요, 놀았어요) - 존칭(드셨어요, 하셨어요) 절대 금지
- 부모님께 전달하는 말투는 정중하게
- 중간중간 이모지 자연스럽게 포함
- 준비물/공지사항은 글 마지막 부분에 자연스럽게 포함
- 따뜻하고 정겨운 마무리 인사로 끝내기
- 아이 성격과 특징을 반영하여 개인화된 내용으로 작성`;

  const rb = document.getElementById('resultBox');
  const lb = document.getElementById('loadingBox');
  const cbr = document.getElementById('copyBtnRow');
  rb.style.display = 'none'; lb.style.display = 'block'; cbr.style.display = 'none';

  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, maxTokens: 1200 })
    });
    if (!res.ok) throw new Error('서버 오류 (' + res.status + ') - Vercel 환경변수에 API 키가 설정되어 있는지 확인해주세요!');
    const text = await res.text();
    let data;
    try { data = JSON.parse(text); } catch(e) { throw new Error('서버 응답 오류: ' + text.substring(0, 80)); }
    if (data.error) throw new Error(data.error);
    if (!data.text) throw new Error('응답이 비어있어요');
    rb.textContent = data.text || '생성 실패 😢';
    rb.style.display = 'block';
    cbr.style.display = 'flex';
  } catch(e) {
    rb.textContent = '에러가 났어요 😢\n' + e.message;
    rb.style.display = 'block';
  }
  lb.style.display = 'none';
}

function copyResult() {
  const txt = document.getElementById('resultBox').textContent;
  if (!txt) return;
  navigator.clipboard.writeText(txt).then(() => {
    const btn = document.querySelector('#copyBtnRow .gen-copy');
    btn.textContent = '✅ 복사됐어요!';
    setTimeout(() => { btn.textContent = '📋 복사하기'; }, 1500);
  });
}

function showTab(t) {
  ['alarm','profile','common'].forEach((name, i) => {
    document.querySelectorAll('.tabs .tab')[i].className = 'tab' + (name === t ? ' on' : '');
    document.getElementById('tab-' + name).style.display = name === t ? 'block' : 'none';
  });
}

setMode('out');
loadData();
</script>
</body>
</html>
