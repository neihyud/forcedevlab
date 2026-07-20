export interface IFaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface IFaqSection {
  title: string;
  subtitle: string;
  items: IFaqItem[];
}

export const mockFaqSection: IFaqSection = {
  title: "Những câu hỏi thường gặp",
  subtitle: "Chúng tôi luôn sẵn sàng hỗ trợ để đưa ra giải pháp tốt nhất",
  items: [
    {
      id: 1,
      question: "HVS là công ty chứng khoán như thế nào?",
      answer:
        "HVS là một trong những định chế tài chính uy tín tại Việt Nam, chuyên cung cấp các giải pháp chứng khoán và tư vấn đầu tư toàn diện. Chúng tôi kết hợp công nghệ hiện đại với đội ngũ chuyên gia giàu kinh nghiệm để mang lại hiệu quả đầu tư tối ưu cho khách hàng.",
    },
    {
      id: 2,
      question: "Làm thế nào để mở tài khoản giao dịch tại HVS?",
      answer:
        "Bạn có thể mở tài khoản trực tuyến thông qua ứng dụng HVS hoặc trực tiếp tại văn phòng. Quá trình đăng ký đơn giản, nhanh chóng và được xác thực eKYC trong vòng vài phút.",
    },
    {
      id: 3,
      question: "HVS có những sản phẩm đầu tư nào?",
      answer:
        "HVS cung cấp đa dạng sản phẩm: giao dịch cổ phiếu, trái phiếu, chứng quyền, phái sinh, cùng các dịch vụ tư vấn danh mục và quản lý tài sản chuyên nghiệp.",
    },
    {
      id: 4,
      question: "Phí giao dịch tại HVS được tính như thế nào?",
      answer:
        "Phí giao dịch tại HVS cạnh tranh và minh bạch, được tính theo giá trị giao dịch thực tế. Bạn có thể xem bảng phí chi tiết trên website hoặc liên hệ đội ngũ tư vấn để được hỗ trợ.",
    },
    {
      id: 5,
      question: "HVS có hỗ trợ giao dịch ký quỹ (margin) không?",
      answer:
        "Có, HVS cung cấp dịch vụ giao dịch ký quỹ với tỷ lệ hấp dẫn và danh sách cổ phiếu được phép margin đa dạng. Điều kiện và tỷ lệ ký quỹ sẽ được thông báo cụ thể khi mở tài khoản.",
    },
    {
      id: 6,
      question: "Thông tin tài khoản và giao dịch của tôi có được bảo mật?",
      answer:
        "Chúng tôi áp dụng các công nghệ bảo mật tiên tiến nhất, bao gồm mã hóa SSL, xác thực 2 lớp (2FA) và hệ thống giám sát 24/7 để đảm bảo an toàn tuyệt đối cho tài sản và thông tin khách hàng.",
    },
    {
      id: 7,
      question: "Tôi có thể theo dõi danh mục đầu tư ở đâu?",
      answer:
        "Bạn có thể theo dõi và quản lý toàn bộ danh mục đầu tư của mình thông qua ứng dụng HVS trên điện thoại hoặc website trading.hvsvn.com, cập nhật theo thời gian thực.",
    },
    {
      id: 8,
      question: "Làm thế nào để liên hệ với bộ phận hỗ trợ của HVS?",
      answer:
        "Bạn có thể liên hệ với chúng tôi qua hotline (+84-24) 38869999, email info@hvsvn.com hoặc chat trực tiếp trên ứng dụng. Đội ngũ hỗ trợ luôn sẵn sàng phục vụ từ 8:00 - 17:00 các ngày làm việc.",
    },
  ],
};
