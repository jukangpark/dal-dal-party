"use client";

import { useState } from "react";

type PartyType = "sulgaeting" | "hexagon-party" | "star-party";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RawApp = Record<string, any>;

const PARTY_LABELS: Record<PartyType, string> = {
  sulgaeting: "술개팅",
  "hexagon-party": "육각형파티",
  "star-party": "별별파티",
};

const STATUS_STYLE: Record<string, string> = {
  "승인": "bg-green-50 border-green-300 text-green-700",
  "거절": "bg-red-50 border-red-300 text-red-700",
  "대기": "bg-yellow-50 border-yellow-300 text-yellow-700",
};

function splitUrls(val: unknown): string[] {
  if (!val || typeof val !== "string") return [];
  return val.split(",").map((s) => s.trim()).filter(Boolean);
}

// ─── 이미지 모달 ──────────────────────────────────────────────────────────────
function Modal({ urls, start, onClose }: { urls: string[]; start: number; onClose: () => void }) {
  const [i, setI] = useState(start);
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center px-4 py-2 border-b">
          <span className="text-sm text-gray-500">{i + 1} / {urls.length}</span>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-700">×</button>
        </div>
        <div className="bg-black relative flex items-center justify-center" style={{ height: "60vh" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={urls[i]} alt="" className="max-h-full max-w-full object-contain" />
          {urls.length > 1 && (
            <>
              <button onClick={() => setI(p => Math.max(0, p - 1))} disabled={i === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full text-2xl flex items-center justify-center disabled:opacity-30">‹</button>
              <button onClick={() => setI(p => Math.min(urls.length - 1, p + 1))} disabled={i === urls.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full text-2xl flex items-center justify-center disabled:opacity-30">›</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 신청자 카드 ──────────────────────────────────────────────────────────────
function Card({ app, pt, onApprove, onReject, onReset }: {
  app: RawApp; pt: PartyType;
  onApprove: () => void; onReject: () => void; onReset: () => void;
}) {
  const [modal, setModal] = useState<{ urls: string[]; start: number } | null>(null);

  const status = String(app["상태"] ?? "대기");
  const style = STATUS_STYLE[status] ?? STATUS_STYLE["대기"];
  const isHexagon = pt === "hexagon-party";

  const birth = (() => {
    const v = String(app["생년월일"] ?? app["생년"] ?? "");
    return v.includes("T") ? v.split("T")[0] : v;
  })();

  const personal = splitUrls(isHexagon ? app["사진"] : app["본인사진"]);
  const idPhoto  = splitUrls(app["신분증사진"]);
  const jobProof = splitUrls(app["직업증명서류"]);

  const visitRoute = (() => {
    const r = String(app["방문경로"] ?? "");
    if (r === "instagram") return "인스타";
    if (r === "blog")      return "블로그";
    if (r === "friend")    return "지인소개";
    if (r === "moram")     return "모람";
    if (r === "other")     return `기타: ${app["방문경로기타"] ?? ""}`;
    return r;
  })();

  return (
    <>
      {modal && <Modal urls={modal.urls} start={modal.start} onClose={() => setModal(null)} />}

      <div className={`border-2 rounded-2xl overflow-hidden ${style}`}>
        {/* 헤더 */}
        <div className="bg-white/60 px-4 py-3 flex items-center justify-between border-b border-current/20">
          <div className="flex items-center gap-2">
            <span>{app["성별"] === "male" ? "💁‍♂️" : "💁‍♀️"}</span>
            <span className="font-bold text-gray-900">{app["성함"] ?? "-"}</span>
            <span className="text-xs text-gray-500">{app["성별"] === "male" ? "남성" : "여성"}</span>
          </div>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full border bg-white ${style}`}>{status}</span>
        </div>

        <div className="p-4 space-y-3">
          {/* 정보 */}
          <div className="grid grid-cols-2 gap-2 text-sm">
            {birth          && <Info k="생년월일"    v={birth} />}
            {app["직업"]    && <Info k="직업"        v={String(app["직업"])} />}
            {app["키"]      && <Info k="키"          v={`${app["키"]}cm`} />}
            {app["연락처"]  && <Info k="연락처"      v={String(app["연락처"])} />}
            {app["닮은꼴"]  && <Info k="닮은꼴"      v={String(app["닮은꼴"])} />}
            {app["MBTI"]    && <Info k="MBTI"        v={String(app["MBTI"])} />}
            {app["거주지"]  && <Info k="거주지"      v={String(app["거주지"])} />}
            {app["좋아하는안주"] && <Info k="좋아하는 안주" v={String(app["좋아하는안주"])} />}
            {app["매력포인트"]   && <Info k="매력포인트"    v={String(app["매력포인트"])} />}
            {visitRoute     && <Info k="방문경로"    v={visitRoute} />}
            {app["무료파티의향"] && (
              <Info k="무료파티" v={app["무료파티의향"] === "possible" ? "참여가능" : "불가"} />
            )}
          </div>

          {/* 사진 */}
          {personal.length > 0 && (
            <Photos label="본인 사진" urls={personal} onOpen={(i) => setModal({ urls: personal, start: i })} />
          )}
          {idPhoto.length > 0 && (
            <Photos label="신분증" urls={idPhoto} onOpen={(i) => setModal({ urls: idPhoto, start: i })} />
          )}
          {jobProof.length > 0 && (
            <Photos label="직업 증명" urls={jobProof} onOpen={(i) => setModal({ urls: jobProof, start: i })} />
          )}

          {/* 버튼 */}
          <div className="flex gap-2 pt-1">
            <button onClick={onApprove} disabled={status === "승인"}
              className="flex-1 py-2 rounded-xl text-sm font-bold bg-green-500 text-white hover:bg-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              승인
            </button>
            <button onClick={onReject} disabled={status === "거절"}
              className="flex-1 py-2 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
              거절
            </button>
            {status !== "대기" && (
              <button onClick={onReset}
                className="px-4 py-2 rounded-xl text-sm font-bold border-2 border-gray-300 text-gray-600 bg-white hover:bg-gray-50 transition-colors">
                초기화
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function Info({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-white/60 rounded-lg px-3 py-2">
      <div className="text-xs text-gray-400">{k}</div>
      <div className="text-sm font-medium text-gray-800 break-all">{v}</div>
    </div>
  );
}

function Photos({ label, urls, onOpen }: { label: string; urls: string[]; onOpen: (i: number) => void }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1">{label}</p>
      <div className="flex gap-2 overflow-x-auto">
        {urls.map((url, i) => (
          <button key={i} onClick={() => onOpen(i)}
            className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 hover:border-[#0e6d62] bg-gray-100 transition-colors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── 메인 ─────────────────────────────────────────────────────────────────────
export default function ManagerPage() {
  const [pw, setPw]             = useState("");
  const [authed, setAuthed]     = useState(false);
  const [pwErr, setPwErr]       = useState("");

  const [pt, setPt]             = useState<PartyType>("sulgaeting");
  const [apps, setApps]         = useState<RawApp[]>([]);
  const [dates, setDates]       = useState<string[]>([]);
  const [date, setDate]         = useState("");
  const [loading, setLoading]   = useState(false);
  const [err, setErr]           = useState("");

  async function load(password: string, partyType: PartyType) {
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`/api/manager/applications?partyType=${partyType}`, {
        headers: { "x-manager-password": password },
      });
      const json = await res.json();
      const list: RawApp[] = Array.isArray(json.applications) ? json.applications : [];
      setApps(list);
      const ds = Array.from(new Set(list.map((a) => String(a["날짜"] ?? "")).filter(Boolean))).sort((a, b) => b.localeCompare(a));
      setDates(ds);
      setDate(ds[0] ?? "");
    } catch (e) {
      setErr(String(e));
    } finally {
      setLoading(false);
    }
  }

  function updateStatus(idx: number, newStatus: string) {
    setApps((prev) => prev.map((a, i) => i === idx ? { ...a, "상태": newStatus } : a));
    // 서버에도 업데이트
    fetch("/api/manager/applications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-manager-password": pw },
      body: JSON.stringify({ rowId: String(apps[idx]["ID"]), partyType: pt, status: newStatus }),
    }).catch(() => {});
  }

  // 로그인
  if (!authed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0e6d62]/10 to-white flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#0e6d62] rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl">🛡️</div>
            <h1 className="text-2xl font-bold text-gray-800">관리자 페이지</h1>
            <p className="text-gray-400 text-sm mt-1">달달파티 신청 관리</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            if (!pw.trim()) { setPwErr("비밀번호를 입력해주세요."); return; }
            setAuthed(true);
            load(pw, pt);
          }} className="space-y-4">
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}
              placeholder="비밀번호 입력" autoFocus
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#0e6d62] focus:outline-none text-sm" />
            {pwErr && <p className="text-red-500 text-xs">{pwErr}</p>}
            <button type="submit"
              className="w-full py-3 bg-[#0e6d62] text-white rounded-xl font-bold text-sm hover:bg-[#0a5a52] transition-colors">
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 필터
  const filtered = date ? apps.filter((a) => String(a["날짜"]) === date) : apps;
  const males    = filtered.filter((a) => a["성별"] === "male");
  const females  = filtered.filter((a) => a["성별"] === "female");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-30 bg-white border-b shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <span className="text-xl">🛡️</span>
          <h1 className="font-bold text-gray-800 text-sm sm:text-base shrink-0">신청 관리</h1>
          <div className="flex gap-1 bg-gray-100 p-1 rounded-xl overflow-x-auto mx-auto">
            {(Object.keys(PARTY_LABELS) as PartyType[]).map((p) => (
              <button key={p} onClick={() => { setPt(p); load(pw, p); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${pt === p ? "bg-[#0e6d62] text-white" : "text-gray-600"}`}>
                {PARTY_LABELS[p]}
              </button>
            ))}
          </div>
          <button onClick={() => setAuthed(false)} className="text-xs text-gray-400 hover:text-gray-600 shrink-0">로그아웃</button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-5">
        {err && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{err}</div>}

        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="animate-spin w-10 h-10 border-4 border-[#0e6d62] border-t-transparent rounded-full" />
          </div>
        )}

        {!loading && apps.length > 0 && (
          <>
            {/* 날짜 탭 */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              <button onClick={() => setDate("")}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors ${date === "" ? "bg-[#0e6d62] border-[#0e6d62] text-white" : "bg-white border-gray-200 text-gray-600"}`}>
                전체 ({apps.length})
              </button>
              {dates.map((d) => (
                <button key={d} onClick={() => setDate(d)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold border-2 transition-colors ${date === d ? "bg-[#0e6d62] border-[#0e6d62] text-white" : "bg-white border-gray-200 text-gray-600"}`}>
                  {d} ({apps.filter((a) => String(a["날짜"]) === d).length})
                </button>
              ))}
            </div>

            {/* 통계 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Stat label="전체"     v={filtered.length}                                        c="bg-gray-100 text-gray-700" />
              <Stat label="💁‍♂️ 남성" v={males.length}                                           c="bg-blue-50 text-blue-700" />
              <Stat label="💁‍♀️ 여성" v={females.length}                                          c="bg-pink-50 text-pink-700" />
              <Stat label="승인됨"   v={filtered.filter((a) => a["상태"] === "승인").length}     c="bg-green-50 text-green-700" />
            </div>

            {/* 남/여 목록 */}
            <div className="grid sm:grid-cols-2 gap-5 items-start">
              {/* 남성 */}
              <div className="space-y-3">
                <h2 className="font-bold text-gray-700">💁‍♂️ 남성 <span className="text-gray-400 font-normal text-sm">({males.length}명)</span></h2>
                {males.length === 0
                  ? <EmptySlot />
                  : males.map((app, i) => {
                      const globalIdx = apps.indexOf(app);
                      return (
                        <Card key={`m-${i}`} app={app} pt={pt}
                          onApprove={() => updateStatus(globalIdx, "승인")}
                          onReject={()  => updateStatus(globalIdx, "거절")}
                          onReset={()   => updateStatus(globalIdx, "대기")} />
                      );
                    })
                }
              </div>
              {/* 여성 */}
              <div className="space-y-3">
                <h2 className="font-bold text-gray-700">💁‍♀️ 여성 <span className="text-gray-400 font-normal text-sm">({females.length}명)</span></h2>
                {females.length === 0
                  ? <EmptySlot />
                  : females.map((app, i) => {
                      const globalIdx = apps.indexOf(app);
                      return (
                        <Card key={`f-${i}`} app={app} pt={pt}
                          onApprove={() => updateStatus(globalIdx, "승인")}
                          onReject={()  => updateStatus(globalIdx, "거절")}
                          onReset={()   => updateStatus(globalIdx, "대기")} />
                      );
                    })
                }
              </div>
            </div>
          </>
        )}

        {!loading && apps.length === 0 && !err && (
          <div className="text-center py-24 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p>신청 내역이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, v, c }: { label: string; v: number; c: string }) {
  return (
    <div className={`rounded-2xl px-4 py-3 ${c}`}>
      <p className="text-xs font-medium opacity-70 mb-0.5">{label}</p>
      <p className="text-2xl font-bold">{v}</p>
    </div>
  );
}

function EmptySlot() {
  return (
    <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 py-10 text-center text-gray-400 text-sm">
      신청자 없음
    </div>
  );
}
