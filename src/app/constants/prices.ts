// 파티별 참가비 상수
// 이 파일에서 모든 금액을 중앙 관리합니다.

export const SULGAETING_PRICES = {
  male: 59000,
  maleNonAlcohol: 49000,
  female: 29000,
  femaleNonAlcohol: 19000,
} as const;

export const HEXAGON_PARTY_PRICES = {
  male: 69000,
  female: 39000,
  afterParty: 10000,
} as const;

export const STAR_PARTY_PRICES = {
  entryFee: 10000,        // 참여비 (술개팅 참여자는 무료)
  entryFeeForSulgaeting: 0, // 술개팅 참여자 참여비
  // 술값은 N분의 1 (별도)
} as const;

// 금액 포맷 헬퍼 (예: 59000 → "59,000원")
export function formatPrice(price: number): string {
  return `${price.toLocaleString("ko-KR")}원`;
}

// 금액 포맷 헬퍼 (예: 59000 → "5.9만원" 형태가 아닌 "59,000원")
export function formatPriceWon(price: number): string {
  const man = price / 10000;
  if (Number.isInteger(man)) {
    return `${man}만원`;
  }
  return `${price.toLocaleString("ko-KR")}원`;
}
