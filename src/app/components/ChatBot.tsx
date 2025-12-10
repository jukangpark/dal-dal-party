"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MessageCircle, X, Send } from "lucide-react";

interface ChatMessage {
  id: string;
  message: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      message:
        "안녕하세요! 술개팅입니다. 아래 질문 중에서 궁금한 것을 선택해주세요! 🎉",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지가 추가될 때 자동 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // 미리 정의된 질문 리스트
  const quickQuestions = [
    "파티 신청 방법",
    "참가비 안내",
    "환불 규정",
    "파티 종류",
    "예약 확인",
  ];

  const handleQuickQuestion = async (question: string) => {
    // 사용자 메시지 추가
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      message: question,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // AI 응답 시뮬레이션 (실제로는 API 호출)
    setTimeout(() => {
      const botResponse = generateBotResponse(question);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        message: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // 파티 신청 방법
    if (lowerMessage.includes("신청") || lowerMessage.includes("방법") || lowerMessage.includes("어떻게")) {
      return "파티 신청 방법 안내입니다! 📝\n\n1️⃣ 예약하기 페이지에서 원하는 날짜 선택\n2️⃣ 신청하기 버튼 클릭\n3️⃣ 신청 폼 작성 (개인정보, 사진 등)\n4️⃣ 운영진 심사 후 승인 안내\n5️⃣ 입금 안내 및 확정\n\n신청 후 하루 이내 결과 안내 예정입니다!";
    }

    // 참가비 안내
    else if (lowerMessage.includes("참가비") || lowerMessage.includes("비용") || lowerMessage.includes("가격")) {
      return "참가비 안내입니다! 💰\n\n💁‍♂️ 남성: 39,000원\n💁‍♀️ 여성: 29,000원\n\n➕ 애프터 파티 참여: +10,000원\n(21:00~23:00, 2시간 연장)\n\n비주류 참여도 가능합니다!\n💁‍♂️ 남성: 40,000원\n💁‍♀️ 여성: 25,000원\n\n자세한 내용은 각 파티 페이지에서 확인해주세요!";
    }

    // 환불 규정
    else if (lowerMessage.includes("환불") || lowerMessage.includes("취소")) {
      return "환불 규정 안내입니다! 💚\n\n❌ 노쇼 시: 어떠한 경우에도 환불 불가\n✅ 취소 및 환불: 7일 전까지 가능\n⚠️ 참가일 5일 전 이상: 50% 공제 후 환불\n❌ 1일 전부터: 환불 불가능\n\n자세한 내용은 고객센터 페이지에서 확인해주세요!";
    }

    // 파티 종류
    else if (lowerMessage.includes("파티 종류") || lowerMessage.includes("어떤 파티") || lowerMessage.includes("종류")) {
      return "파티 종류 안내입니다! 🎉\n\n1️⃣ 술개팅\n• 신분과 직업이 검증된 프리미엄 소개팅\n• 1:1 릴레이 소개팅\n• 최대 8명의 이성과 만남\n\n2️⃣ 육각형 파티\n• 아무나 올 수 없는 승인제 파티\n• 외모·키·재력·직업 중 2가지 이상\n• 6각형 컨셉\n\n3️⃣ 별별파티\n• 다양한 테마의 특별한 파티\n• 대규모 파티 및 특별 이벤트\n\n홈페이지에서 각 파티를 자세히 확인해보세요!";
    }

    // 예약 확인
    else if (lowerMessage.includes("예약") || lowerMessage.includes("확인") || lowerMessage.includes("상태")) {
      return "예약 확인 안내입니다! 📅\n\n✅ 예약하기 페이지에서 달력을 확인하세요\n📱 신청 후 하루 이내 승인 여부 안내\n💬 승인되신 분께만 장소 및 입금 안내 개별 발송\n\n현재 모집중인 파티는 예약하기 페이지에서 확인하실 수 있습니다!";
    }

    // 인사 관련
    else if (
      lowerMessage.includes("안녕") ||
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi")
    ) {
      return "안녕하세요! 술개팅에 오신 것을 환영합니다! 🎉 파티 신청이나 궁금한 점이 있으시면 언제든 말씀해주세요!";
    }

    // 감사 인사
    else if (
      lowerMessage.includes("감사") ||
      lowerMessage.includes("고마워") ||
      lowerMessage.includes("thank")
    ) {
      return "천만에요! 좋은 인연 만나시길 바랍니다! 💚 더 궁금한 점이 있으시면 언제든 말씀해주세요!";
    }

    // 기본 응답
    else {
      return "좋은 질문이네요! 술개팅에 대해 더 자세히 알고 싶으시다면 홈페이지의 각 메뉴를 확인해보세요! 🎉 파티 종류, 신청 방법, 참가비, 환불 규정 등 다양한 정보를 제공하고 있습니다. 특정 질문이 있으시면 더 구체적으로 말씀해주세요!";
    }
  };

  return (
    <>
      {/* 챗봇 토글 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#0e6d62] hover:bg-[#059669] text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="챗봇 열기"
      >
        {isOpen ? (
          <X className="w-6 h-6 cursor-pointer" />
        ) : (
          <MessageCircle className="w-6 h-6 cursor-pointer" />
        )}
      </button>

      {/* 챗봇 창 */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-40 w-80 h-[400px] md:w-96 md:h-[600px] lg:h-[700px] bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* 헤더 */}
          <div className="bg-gradient-to-r from-[#0e6d62] to-[#059669] text-white p-3 flex items-center space-x-3">
            <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <Image
                src="/술개팅로고.jpg"
                alt="술개팅"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <h3 className="font-semibold text-white">술개팅</h3>
              <p className="text-xs text-white/80">AI 어시스턴트</p>
            </div>
          </div>

          {/* 채팅 컨테이너 */}
          <div className="h-[300px] md:h-[500px] lg:h-[600px] flex flex-col">
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-[#0e6d62] text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.message}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === "user" ? "text-white/70" : "text-gray-500"
                    }`}>
                      {msg.timestamp.toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* 빠른 질문 버튼들 */}
            <div className="p-3 border-t border-gray-200">
              <div className="space-y-2">
                <p className="text-xs text-gray-600 mb-2">자주 묻는 질문:</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-left px-2 py-1.5 bg-gray-100 hover:bg-[#0e6d62] hover:text-white text-gray-600 hover:text-white rounded-md text-xs transition-colors border border-gray-300 hover:border-[#0e6d62] cursor-pointer"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;

