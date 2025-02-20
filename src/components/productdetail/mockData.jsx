// 상품이미지
import mainImage from "../../assets/images/productdetail/main.jpg";
import subImage1 from "../../assets/images/productdetail/sub1.jpg";
import subImage2 from "../../assets/images/productdetail/sub2.jpg";
import subImage3 from "../../assets/images/productdetail/sub3.jpg";

// 상품정보관련
export const mockProductData = {
  id: "12345", // 상품 ID (실제 API에서는 동적으로 받아올 예정)
  name: "아기용 프리미엄 다기능 점퍼루", // 상품명
  price: "35,000원", // 가격 (실제 API 연동 시 숫자 관리)
  mainImage: mainImage, // ✅ 현재는 로컬 이미지 사용 (실제 API에서는 서버 URL을 제공)
  subImages: [subImage1, subImage2, subImage3], // ✅ 서브 이미지 리스트 (최대 3개)
  description:
    "신나는 음악과 함께 아기의 운동 신경을 발달 시켜주는 다기능 점퍼루! 엄마, 아빠도 안심하고 사용할 수 있는 안전한 유아용품이에요!",
  options: ["기본형", "고급형", "프리미엄형"], // ✅ 옵션을 동적으로 불러오도록 추가
  stockQuantity: 1, // ✅ 재고량 추가 (0이면 대여 불가로 설정됨)
};
export const fetchMockProduct = async (productId) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProductData), 500); // 0.5초 후 데이터 반환 (API 응답 시뮬레이션)
  });
};

// 상품후기관련
export const reviews = [
  {
    id: 1,
    user: "qw***12",
    rating: 5,
    comment: "아주 좋아요!",
    date: "2025-01-01",
    photo: "https://via.placeholder.com/100",
    likes: 15,
  },
  {
    id: 2,
    user: "kk***34",
    rating: 4,
    comment: "좋아요!",
    date: "2025-01-02",
    photo: null,
    likes: 12,
  },
  {
    id: 3,
    user: "yy***21",
    rating: 3,
    comment: "보통이에요",
    date: "2025-01-03",
    photo: "https://via.placeholder.com/100",
    likes: 9,
  },
  {
    id: 4,
    user: "zz***56",
    rating: 2,
    comment: "그냥 그래요",
    date: "2025-01-04",
    photo: null,
    likes: 6,
  },
  {
    id: 5,
    user: "aa***99",
    rating: 1,
    comment: "별로예요",
    date: "2025-01-05",
    photo: "https://via.placeholder.com/100",
    likes: 3,
  },
  {
    id: 6,
    user: "bb***78",
    rating: 5,
    comment: "최고에요! 대만족!",
    date: "2025-01-06",
    photo: null,
    likes: 20,
  },
  {
    id: 7,
    user: "cc***45",
    rating: 4,
    comment: "괜찮아요",
    date: "2025-01-07",
    photo: "https://via.placeholder.com/100",
    likes: 13,
  },
  {
    id: 8,
    user: "dd***23",
    rating: 5,
    comment: "완전 추천합니다!",
    date: "2025-01-08",
    photo: "https://via.placeholder.com/100",
    likes: 22,
  },
  {
    id: 9,
    user: "ee***98",
    rating: 3,
    comment: "기대보다 평범",
    date: "2025-01-09",
    photo: null,
    likes: 7,
  },
  {
    id: 10,
    user: "ff***11",
    rating: 2,
    comment: "그냥 그랬어요",
    date: "2025-01-10",
    photo: null,
    likes: 5,
  },
  {
    id: 11,
    user: "gg***33",
    rating: 1,
    comment: "다시는 안살 듯",
    date: "2025-01-11",
    photo: "https://via.placeholder.com/100",
    likes: 2,
  },
  {
    id: 12,
    user: "hh***67",
    rating: 5,
    comment: "만족합니다!",
    date: "2025-01-12",
    photo: null,
    likes: 18,
  },
  {
    id: 13,
    user: "ii***29",
    rating: 4,
    comment: "좋아요",
    date: "2025-01-13",
    photo: "https://via.placeholder.com/100",
    likes: 11,
  },
  {
    id: 14,
    user: "jj***07",
    rating: 3,
    comment: "보통이에요",
    date: "2025-01-14",
    photo: null,
    likes: 8,
  },
  {
    id: 15,
    user: "kk***56",
    rating: 2,
    comment: "별로에요",
    date: "2025-01-15",
    photo: "https://via.placeholder.com/100",
    likes: 4,
  },
  {
    id: 16,
    user: "ll***74",
    rating: 1,
    comment: "기대 이하",
    date: "2025-01-16",
    photo: null,
    likes: 1,
  },
  {
    id: 17,
    user: "mm***21",
    rating: 5,
    comment: "정말 만족스러워요",
    date: "2025-01-17",
    photo: "https://via.placeholder.com/100",
    likes: 21,
  },
  {
    id: 18,
    user: "nn***83",
    rating: 4,
    comment: "괜찮아요!",
    date: "2025-01-18",
    photo: null,
    likes: 10,
  },
  {
    id: 19,
    user: "oo***32",
    rating: 3,
    comment: "그냥 보통",
    date: "2025-01-19",
    photo: "https://via.placeholder.com/100",
    likes: 6,
  },
  {
    id: 20,
    user: "pp***11",
    rating: 2,
    comment: "음...",
    date: "2025-01-20",
    photo: null,
    likes: 3,
  },
  {
    id: 21,
    user: "qq***77",
    rating: 1,
    comment: "최악이에요",
    date: "2025-01-21",
    photo: "https://via.placeholder.com/100",
    likes: 1,
  },
  {
    id: 22,
    user: "rr***44",
    rating: 5,
    comment: "또 구매할 예정!",
    date: "2025-01-22",
    photo: null,
    likes: 25,
  },
  {
    id: 23,
    user: "ss***02",
    rating: 4,
    comment: "좋아요!",
    date: "2025-01-23",
    photo: "https://via.placeholder.com/100",
    likes: 12,
  },
  {
    id: 24,
    user: "tt***15",
    rating: 3,
    comment: "보통입니다.",
    date: "2025-01-24",
    photo: null,
    likes: 9,
  },
  {
    id: 25,
    user: "uu***39",
    rating: 2,
    comment: "그냥 그래요",
    date: "2025-01-25",
    photo: "https://via.placeholder.com/100",
    likes: 5,
  },
  {
    id: 26,
    user: "vv***61",
    rating: 1,
    comment: "이건 좀 아니에요",
    date: "2025-01-26",
    photo: null,
    likes: 2,
  },
  {
    id: 27,
    user: "ww***88",
    rating: 5,
    comment: "최고의 선택!",
    date: "2025-01-27",
    photo: "https://via.placeholder.com/100",
    likes: 19,
  },
  {
    id: 28,
    user: "xx***55",
    rating: 4,
    comment: "맘에 들어요!",
    date: "2025-01-28",
    photo: null,
    likes: 14,
  },
  {
    id: 29,
    user: "yy***23",
    rating: 3,
    comment: "무난합니다",
    date: "2025-01-29",
    photo: "https://via.placeholder.com/100",
    likes: 7,
  },
  {
    id: 30,
    user: "zz***09",
    rating: 2,
    comment: "재구매는 안 할듯",
    date: "2025-01-30",
    photo: null,
    likes: 4,
  },
];
export const fetchMockReviews = async () => {
  console.log("📢 Mock Fetching Reviews...");
  return new Promise((resolve) => {
    setTimeout(() => resolve(reviews), 500); // 0.5초 후에 리뷰 데이터를 반환
  });
};

// 상품문의관련
export const mockInquiries = [
  {
    id: 1,
    title: "배송은 얼마나 걸리나요?",
    content: "보통 몇 일 걸리는지 궁금합니다.",
    user: "qw***12",
    createdAt: "2025-02-01",
    answer: "평균 2~3일 소요됩니다.",
  },
  {
    id: 2,
    title: "재고가 부족하면 예약도 가능한가요?",
    content: "재고가 없을 때 예약할 수 있나요?",
    user: "kk***34",
    createdAt: "2025-02-02",
    answer: null,
  },
  {
    id: 3,
    title: "대여 기간을 연장할 수 있나요?",
    content: "대여 중에 기간을 추가할 수 있나요?",
    user: "yy***21",
    createdAt: "2025-02-03",
    answer: "네, 연장 가능합니다. 고객센터로 문의해주세요.",
  },
  {
    id: 4,
    title: "상품 상태는 어떤가요?",
    content: "사용감이 있는 상품인가요?",
    user: "zz***56",
    createdAt: "2025-02-04",
    answer: null,
  },
  {
    id: 5,
    title: "반납 방법이 궁금합니다.",
    content: "반납 시 직접 방문해야 하나요?",
    user: "aa***99",
    createdAt: "2025-02-05",
    answer: "택배 반납도 가능합니다!",
  },
  {
    id: 6,
    title: "배송지 변경이 가능한가요?",
    content: "주문 후 배송지 변경을 할 수 있나요?",
    user: "bb***88",
    createdAt: "2025-02-06",
    answer: "배송 전까지는 가능합니다.",
  },
  {
    id: 7,
    title: "교환은 어떻게 하나요?",
    content: "상품이 마음에 들지 않으면 교환할 수 있나요?",
    user: "cc***77",
    createdAt: "2025-02-07",
    answer: "교환은 고객센터를 통해 신청해 주세요.",
  },
  {
    id: 8,
    title: "할인 쿠폰은 어떻게 사용하나요?",
    content: "할인 쿠폰이 있는데, 어떻게 적용하나요?",
    user: "dd***66",
    createdAt: "2025-02-08",
    answer: "주문 결제 시 쿠폰 코드를 입력하시면 됩니다.",
  },
  {
    id: 9,
    title: "예약 취소는 어떻게 하나요?",
    content: "예약을 취소하려면 어떻게 해야 하나요?",
    user: "ee***55",
    createdAt: "2025-02-09",
    answer: "예약 취소는 고객센터로 문의해주세요.",
  },
  {
    id: 10,
    title: "해외 배송이 가능한가요?",
    content: "해외로 상품을 배송할 수 있나요?",
    user: "ff***44",
    createdAt: "2025-02-10",
    answer: "해외 배송은 현재 지원되지 않습니다.",
  },
  {
    id: 11,
    title: "상품이 파손되었어요.",
    content: "상품을 받았는데 파손된 것 같습니다.",
    user: "gg***33",
    createdAt: "2025-02-11",
    answer: "죄송합니다. 고객센터로 연락 주시면 빠르게 처리해 드리겠습니다.",
  },
  {
    id: 12,
    title: "배송 중 상태 확인 방법",
    content: "배송 상태를 어떻게 확인하나요?",
    user: "hh***22",
    createdAt: "2025-02-12",
    answer: "배송 추적 번호를 통해 확인 가능합니다.",
  },
  {
    id: 13,
    title: "대여 상품 반납 시 주의사항",
    content: "대여 상품 반납 시 주의사항이 있나요?",
    user: "ii***11",
    createdAt: "2025-02-13",
    answer: "상품에 손상이 가지 않도록 주의 부탁드립니다.",
  },
  {
    id: 14,
    title: "구매 후 환불은 가능한가요?",
    content: "구매 후에 환불도 가능한가요?",
    user: "jj***00",
    createdAt: "2025-02-14",
    answer: "구매 후 7일 이내에 환불이 가능합니다.",
  },
  {
    id: 15,
    title: "상품 가격은 어떻게 결정되나요?",
    content: "상품 가격은 어떻게 책정되나요?",
    user: "kk***99",
    createdAt: "2025-02-15",
    answer: "상품의 원가와 물류비용을 고려하여 책정됩니다.",
  },
  {
    id: 16,
    title: "회원 가입 시 혜택이 있나요?",
    content: "회원 가입을 하면 어떤 혜택이 있나요?",
    user: "ll***88",
    createdAt: "2025-02-16",
    answer: "회원 가입 시 첫 구매 시 할인 혜택이 제공됩니다.",
  },
  {
    id: 17,
    title: "상품 리뷰를 수정할 수 있나요?",
    content: "상품 리뷰를 수정하고 싶은데 가능한가요?",
    user: "mm***77",
    createdAt: "2025-02-17",
    answer: "리뷰 수정은 불가능합니다. 새로 작성해 주세요.",
  },
  {
    id: 18,
    title: "재고가 언제 입고되나요?",
    content: "재고가 부족한 상품은 언제 입고되나요?",
    user: "nn***66",
    createdAt: "2025-02-18",
    answer: "입고 일정은 정확히 알 수 없으며, 재입고 알림을 신청해 주세요.",
  },
  {
    id: 19,
    title: "반품 정책은 어떻게 되나요?",
    content: "반품이 가능한 상품과 조건이 궁금합니다.",
    user: "oo***55",
    createdAt: "2025-02-19",
    answer: "반품은 7일 이내에 가능합니다.",
  },
  {
    id: 20,
    title: "택배 배송비는 얼마인가요?",
    content: "택배 반납 시 배송비는 얼마인가요?",
    user: "pp***44",
    createdAt: "2025-02-20",
    answer: "배송비는 고객님 부담입니다.",
  },
  {
    id: 21,
    title: "배송지 주소 변경 방법",
    content: "배송지 주소를 변경하려면 어떻게 해야 하나요?",
    user: "qq***33",
    createdAt: "2025-02-21",
    answer: "배송 전에는 주소 변경이 가능합니다. 고객센터에 연락주세요.",
  },
  {
    id: 22,
    title: "회원 탈퇴는 어떻게 하나요?",
    content: "회원 탈퇴 방법을 알고 싶습니다.",
    user: "rr***22",
    createdAt: "2025-02-22",
    answer: "회원 탈퇴는 고객센터로 신청하시면 됩니다.",
  },
  {
    id: 23,
    title: "상품에 대한 상세 정보",
    content: "상품에 대한 자세한 정보를 알고 싶어요.",
    user: "ss***11",
    createdAt: "2025-02-23",
    answer: "상품 상세 페이지에서 확인 가능합니다.",
  },
  {
    id: 24,
    title: "세금계산서 발행이 가능한가요?",
    content: "세금계산서 발행을 요청할 수 있나요?",
    user: "tt***00",
    createdAt: "2025-02-24",
    answer: "세금계산서는 발행되지 않습니다.",
  },
  {
    id: 25,
    title: "구매 전 상품을 볼 수 있나요?",
    content: "상품을 직접 보고 싶어요. 실물을 볼 수 있나요?",
    user: "uu***99",
    createdAt: "2025-02-25",
    answer: "저희는 온라인만 운영됩니다. 실물 확인은 어렵습니다.",
  },
  {
    id: 26,
    title: "영수증을 이메일로 받을 수 있나요?",
    content: "구매 후 영수증을 이메일로 받을 수 있나요?",
    user: "vv***88",
    createdAt: "2025-02-26",
    answer:
      "영수증은 이메일로 발송되지 않습니다. 마이페이지에서 다운로드 가능합니다.",
  },
  {
    id: 27,
    title: "포인트 적립은 어떻게 하나요?",
    content: "구매 후 포인트는 어떻게 적립되나요?",
    user: "ww***77",
    createdAt: "2025-02-27",
    answer: "구매 금액에 따라 자동으로 포인트가 적립됩니다.",
  },
  {
    id: 28,
    title: "상담 시간이 언제인가요?",
    content: "고객센터 상담 시간을 알고 싶어요.",
    user: "xx***66",
    createdAt: "2025-02-28",
    answer: "상담 시간은 평일 9시~18시입니다.",
  },
  {
    id: 29,
    title: "상품 사진을 요청할 수 있나요?",
    content: "상품 사진을 받아볼 수 있을까요?",
    user: "yy***55",
    createdAt: "2025-02-29",
    answer: "상품 사진은 고객센터를 통해 요청 가능합니다.",
  },
  {
    id: 30,
    title: "회원 등급이 어떻게 결정되나요?",
    content: "회원 등급은 어떻게 결정되나요?",
    user: "zz***44",
    createdAt: "2025-03-01",
    answer: "회원 등급은 구매 실적과 활동에 따라 달라집니다.",
  },
];
export const fetchMockInquiries = async () => {
  console.log("📢 Mock Fetching Inquiries...");
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockInquiries), 500); // 0.5초 후 데이터 반환
  });
};
// ✅ mockInquiries를 직접 재할당하지 않고 배열을 수정하도록 변경
export const postNewInquiry = async (newInquiry) => {
  console.log("📢 Mock Posting Inquiry...");

  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = mockInquiries.length + 1; // 새로운 문의 ID 생성
      const createdAt = new Date().toISOString().split("T")[0]; // 현재 날짜 저장
      const newInquiryData = { id: newId, createdAt, ...newInquiry };

      mockInquiries.unshift(newInquiryData); // ✅ 배열을 직접 수정하여 재할당 방지
      resolve([...mockInquiries]); // ✅ 배열의 복사본 반환 (원본 배열 유지)
    }, 500);
  });
};
