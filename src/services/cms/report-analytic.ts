import { cmsFetch } from "./client";
import { IReportAnalyst, ICategory } from "@/types/cms";
import { IStrapiCollectionResponse } from "@/types/strapi";

// ─── Mock Report Analysts Data ──────────────────────────────────────────────────
const mockReportAnalysts: Record<string, any[]> = {
  vi: [
    {
      title:
        "CHIẾN LƯỢC ĐẦU TƯ 6 THÁNG CUỐI NĂM 2026 - ĐỊNH VỊ DANH MỤC TRONG BỐI CẢNH THỊ TRƯỜNG BIẾN ĐỘNG",
      description:
        "Báo cáo phân tích sâu sắc về vị thế thị trường và các cơ hội đầu tư trong nửa cuối năm 2026, tập trung vào việc xác định các nhóm ngành phòng thủ và đón sóng từ các chính sách vĩ mô đầu tư công.",
      badge: "Báo cáo chiến lược",
      date: "18/06/2026",
      category: "strategy",
      isFeatured: true,
      tags: "Vĩ mô,Thị trường",
      image: null,
    },
    {
      title:
        "Báo cáo chiến lược ngành ngân hàng nửa cuối năm 2026: Động lực tăng trưởng từ tín dụng",
      description:
        "Đánh giá chi tiết về biên lợi nhuận (NIM) và chất lượng tài sản của hệ thống ngân hàng thương mại Việt Nam dưới tác động của lãi suất.",
      badge: "Chiến lược",
      date: "16/06/2026",
      category: "strategy",
      isFeatured: false,
      tags: "Ngân hàng,Tín dụng",
      image: null,
    },
    {
      title:
        "Chiến lược đầu tư bất động sản khu công nghiệp: Sóng dịch chuyển vốn FDI thế hệ mới",
      description:
        "Xu hướng phát triển khu công nghiệp xanh và giá thuê đất tại các vùng kinh tế trọng điểm phía Bắc và Nam.",
      badge: "Chiến lược",
      date: "15/06/2026",
      category: "strategy",
      isFeatured: false,
      tags: "Bất động sản,FDI",
      image: null,
    },
    {
      title:
        "Báo cáo phân bổ danh mục tài sản quý 3: Phòng thủ với nhóm điện nước và năng lượng",
      description:
        "Gợi ý tỷ trọng tiền mặt và cổ phiếu phòng thủ trong bối cảnh tỷ giá biến động và lạm phát toàn cầu gia tăng.",
      badge: "Chiến lược",
      date: "12/06/2026",
      category: "strategy",
      isFeatured: false,
      tags: "Danh mục,Năng lượng",
      image: null,
    },
    {
      title:
        "BÁO CÁO VĨ MÔ QUÝ 2: TĂNG TRƯỞNG GDP VƯỢT KỲ VỌNG VÀ ÁP LỰC TỪ TỶ GIÁ NGOẠI TỆ",
      description:
        "Phân tích tác động của các chính sách tiền tệ mới nhất của Ngân hàng Nhà nước và xu hướng dòng vốn FDI đổ vào Việt Nam.",
      badge: "Báo cáo vĩ mô",
      date: "17/06/2026",
      category: "macro",
      isFeatured: true,
      tags: "Vĩ mô,GDP",
      image: null,
    },
    {
      title:
        "Chỉ số CPI tháng 6 và dự báo lạm phát 6 tháng cuối năm dưới góc nhìn vĩ mô",
      description:
        "Phân tích biến động giá hàng hóa thiết yếu và chính sách tài khóa hỗ trợ bình ổn giá của Chính phủ.",
      badge: "Vĩ mô",
      date: "14/06/2026",
      category: "macro",
      isFeatured: false,
      tags: "CPI,Lạm phát",
      image: null,
    },
    {
      title:
        "Động thái tăng lãi suất của Fed và ảnh hưởng trực tiếp đến thị trường tài chính Việt Nam",
      description:
        "Báo cáo chuyên sâu đánh giá rủi ro rút vốn của khối ngoại và biến động lãi suất liên ngân hàng.",
      badge: "Vĩ mô",
      date: "10/06/2026",
      category: "macro",
      isFeatured: false,
      tags: "Fed,Lãi suất",
      image: null,
    },
    {
      title:
        "Đẩy mạnh đầu tư công: Trọng tâm thúc đẩy tăng trưởng kinh tế cuối năm 2026",
      description:
        "Đánh giá tiến độ giải ngân các dự án cao tốc trọng điểm và các nhóm ngành được hưởng lợi trực tiếp.",
      badge: "Vĩ mô",
      date: "08/06/2026",
      category: "macro",
      isFeatured: false,
      tags: "Đầu tư công,Kinh tế",
      image: null,
    },
    {
      title:
        "PHÂN TÍCH DOANH NGHIỆP: CƠ HỘI ĐẦU TƯ TỪ DOANH NGHIỆP DẪN ĐẦU NGÀNH CÔNG NGHỆ BÁN DẪN",
      description:
        "Đánh giá chi tiết mô hình kinh doanh, triển vọng đơn hàng quốc tế và báo cáo tài chính của doanh nghiệp đầu ngành công nghệ.",
      badge: "Phân tích DN",
      date: "16/06/2026",
      category: "business",
      isFeatured: true,
      tags: "Doanh nghiệp,Công nghệ",
      image: null,
    },
    {
      title:
        "Cập nhật kết quả kinh doanh Hòa Phát (HPG): Doanh thu tăng trưởng từ thép xuất khẩu",
      description:
        "Đánh giá biên lợi nhuận gộp và tiến độ xây dựng dự án Dung Quất 2 trong bối cảnh giá thép phục hồi.",
      badge: "Phân tích DN",
      date: "15/06/2026",
      category: "business",
      isFeatured: false,
      tags: "HPG,Thép",
      image: null,
    },
    {
      title:
        "Phân tích FPT: Động lực từ xuất khẩu phần mềm và chuyển đổi số toàn cầu",
      description:
        "Dự phóng doanh thu tăng trưởng bền bỉ từ thị trường Nhật Bản và Mỹ, cơ hội hợp tác AI thế hệ mới.",
      badge: "Phân tích DN",
      date: "11/06/2026",
      category: "business",
      isFeatured: false,
      tags: "FPT,Công nghệ",
      image: null,
    },
    {
      title:
        "Khảo sát thực địa doanh nghiệp bán lẻ MWG: Hiệu quả từ tái cấu trúc chuỗi cửa hàng",
      description:
        "Báo cáo phân tích điểm hòa vốn của chuỗi Bách Hóa Xanh và triển vọng tăng trưởng lợi nhuận ròng.",
      badge: "Phân tích DN",
      date: "09/06/2026",
      category: "business",
      isFeatured: false,
      tags: "MWG,Bán lẻ",
      image: null,
    },
    {
      title:
        "BÁO CÁO THỊ TRƯỜNG HÀNG HÓA: CĂNG THẲNG ĐỊA CHÍNH TRỊ ĐẨY GIÁ DẦU THÔ VÀ VÀNG THẾ GIỚI TĂNG CAO",
      description:
        "Báo cáo chi tiết về xu hướng nguồn cung dầu mỏ OPEC+ và phân tích dự phòng kỹ thuật đối với biểu đồ giá vàng giao ngay.",
      badge: "Hàng hóa",
      date: "15/06/2026",
      category: "commodity",
      isFeatured: true,
      tags: "Dầu thô,Vàng",
      image: null,
    },
    {
      title:
        "Dự báo xu hướng giá thép thế giới nửa cuối năm 2026 dưới áp lực dư thừa nguồn cung",
      description:
        "Phân tích tình hình sản xuất của Trung Quốc và triển vọng tiêu thụ tại thị trường bất động sản nội địa.",
      badge: "Hàng hóa",
      date: "12/06/2026",
      category: "commodity",
      isFeatured: false,
      tags: "Thép,Hàng hóa",
      image: null,
    },
    {
      title:
        "Báo cáo cung cầu nông sản: Giá cà phê Robusta lập đỉnh lịch sử do thời tiết El Nino",
      description:
        "Khảo sát sản lượng thu hoạch tại vùng Tây Nguyên Việt Nam và ảnh hưởng tới xuất khẩu nông sản.",
      badge: "Hàng hóa",
      date: "10/06/2026",
      category: "commodity",
      isFeatured: false,
      tags: "Cà phê,Nông sản",
      image: null,
    },
    {
      title:
        "Cập nhật thị trường Cao su toàn cầu: Cơ hội cho doanh nghiệp xuất khẩu cao su Việt Nam",
      description:
        "Giá cao su thế giới hồi phục mạnh mẽ nhờ nhu cầu sản xuất lốp xe tại thị trường châu Âu tăng trưởng trở lại.",
      badge: "Hàng hóa",
      date: "06/06/2026",
      category: "commodity",
      isFeatured: false,
      tags: "Cao su,Xuất khẩu",
      image: null,
    },
    {
      title:
        "NHẬN ĐỊNH THỊ TRƯỜNG: VN-INDEX TIẾP CẬN VÙNG KHÁNG CỰ MẠNH 1.280 ĐIỂM - CHỜ ĐỢI DÒNG TIỀN DẪN DẮT",
      description:
        "Phân tích cấu trúc dòng tiền luân chuyển giữa các nhóm ngành ngân hàng, chứng khoán, bất động sản và kịch bản xu hướng tiếp theo.",
      badge: "Nhận định thị trường",
      date: "19/06/2026",
      category: "market",
      isFeatured: true,
      tags: "VN-Index,Dòng tiền",
      image: null,
    },
    {
      title:
        "Điểm tin thị trường sáng: VN-Index hồi phục nhẹ trong phiên cuối tuần nhờ lực đỡ nhóm Bluechip",
      description:
        "Thanh khoản khớp lệnh cải thiện đạt 18.000 tỷ đồng, lực mua ròng của khối ngoại tập trung vào các mã cổ phiếu trụ cột.",
      badge: "Báo cáo ngày",
      date: "18/06/2026",
      category: "market",
      isFeatured: false,
      tags: "Báo cáo ngày,Thị trường",
      image: null,
    },
    {
      title:
        "Nhận định thị trường tuần: Xu hướng tích lũy tích active và cơ hội giải ngân các nhóm cổ phiếu Midcap",
      description:
        "Hỗ trợ cứng của chỉ số tại mốc 1.250 điểm, khuyến nghị gia tăng tỷ trọng cổ phiếu khi thị trường có nhịp rung lắc kỹ thuật.",
      badge: "Báo cáo tuần",
      date: "17/06/2026",
      category: "market",
      isFeatured: false,
      tags: "Nhận định tuần,Midcap",
      image: null,
    },
    {
      title:
        "Bản tin phái sinh ngày: Chiến lược giao dịch Sideway biên độ rộng trong phiên đáo hạn hợp đồng",
      description:
        "Phân tích số liệu vị thế mở (OI) của các quỹ tự doanh và khối ngoại, định hướng điểm Long/Short tối ưu.",
      badge: "Phái sinh",
      date: "16/06/2026",
      category: "market",
      isFeatured: false,
      tags: "Phái sinh,Hợp đồng",
      image: null,
    },
    {
      title:
        "GÓC NHÌN CHUYÊN GIA: LUẬT ĐẤT ĐAI SỬA ĐỔI SẼ KHƠI THÔNG DÒNG VỐN VÀ THAY ĐỔI CỤC DIỆN THỊ TRƯỜNG BẤT ĐỘNG SẢN",
      description:
        "Phỏng vấn chuyên gia kinh tế trưởng về các nút thắt pháp lý được tháo gỡ và dự báo thời điểm thị trường địa ốc hồi phục thực sự.",
      badge: "Góc nhìn chuyên gia",
      date: "19/06/2026",
      category: "expert",
      isFeatured: true,
      tags: "Luật đất đai,Bất động sản",
      image: null,
    },
    {
      title:
        "Triển vọng nâng hạng thị trường chứng khoán Việt Nam lên thị trường mới nổi (Emerging Markets)",
      description:
        "Chuyên gia phân tích tiến độ gỡ bỏ rào cản ký quỹ trước giao dịch (pre-funding) và khả năng thu hút dòng vốn ngoại.",
      badge: "Góc nhìn",
      date: "17/06/2026",
      category: "expert",
      isFeatured: false,
      tags: "Nâng hạng,Thị trường",
      image: null,
    },
    {
      title:
        "Đầu tư giá trị trong bối cảnh vĩ mô mới: Lựa chọn cổ phiếu dựa trên tiêu chuẩn biên an toàn",
      description:
        "Chia sẻ từ Giám đốc đầu tư về việc ứng dụng phương pháp Buffett vào thực tiễn thị trường chứng khoán Việt Nam.",
      badge: "Góc nhìn",
      date: "14/06/2026",
      category: "expert",
      isFeatured: false,
      tags: "Đầu tư giá trị,Buffett",
      image: null,
    },
    {
      title:
        "Xuương hướng số hóa dịch vụ tài chính và công nghệ quản lý gia sản (Wealthtech) tại Việt Nam",
      description:
        "Đánh giá tiềm năng phát triển của các ứng dụng đầu tư tự động và sự chuyển dịch hành vi người dùng thế hệ Gen Z.",
      badge: "Góc nhìn",
      date: "10/06/2026",
      category: "expert",
      isFeatured: false,
      tags: "Số hóa,Wealthtech",
      image: null,
    },
  ],
  en: [
    {
      title:
        "INVESTMENT STRATEGY FOR THE LAST 6 MONTHS OF 2026 - PORTFOLIO POSITIONING IN VOLATILE MARKET",
      description:
        "In-depth analysis report on market position and investment opportunities in the second half of 2026, focusing on defensive sectors and capital waves from public investment macro policies.",
      badge: "Strategy Report",
      date: "18/06/2026",
      category: "strategy",
      isFeatured: true,
      tags: "Macro,Market",
      image: null,
    },
    {
      title:
        "Banking Sector Strategy Report H2 2026: Growth Momentum Driven by Credit Expansion",
      description:
        "Detailed evaluation of Net Interest Margin (NIM) and asset quality of Vietnamese commercial banks under the impact of interest rates.",
      badge: "Strategy",
      date: "16/06/2026",
      category: "strategy",
      isFeatured: false,
      tags: "Banking,Credit",
      image: null,
    },
    {
      title:
        "Industrial Real Estate Strategy: Wave of Next-Gen FDI Capital Relocation",
      description:
        "Development trends of green industrial parks and land rental prices in key economic zones of Northern and Southern Vietnam.",
      badge: "Strategy",
      date: "15/06/2026",
      category: "strategy",
      isFeatured: false,
      tags: "Real Estate,FDI",
      image: null,
    },
    {
      title:
        "Q3 Asset Allocation Report: Defending Portfolio with Utilities and Energy Sectors",
      description:
        "Suggested weight of cash and defensive stocks in the context of exchange rate fluctuations and rising global inflation.",
      badge: "Strategy",
      date: "12/06/2026",
      category: "strategy",
      isFeatured: false,
      tags: "Portfolio,Energy",
      image: null,
    },
    {
      title:
        "Q2 MACRO REPORT: GDP GROWTH EXCEEDS EXPECTATIONS AND PRESSURE FROM FOREIGN EXCHANGE RATES",
      description:
        "Analyzing the impacts of the State Bank's latest monetary policies and the trends of FDI inflows into Vietnam.",
      badge: "Macro Report",
      date: "17/06/2026",
      category: "macro",
      isFeatured: true,
      tags: "Macro,GDP",
      image: null,
    },
    {
      title:
        "June CPI Index and Inflation Forecast for the Second Half of the Year under Macro View",
      description:
        "Analyzing price fluctuations of essential goods and fiscal policies of the Government supporting price stabilization.",
      badge: "Macro",
      date: "14/06/2026",
      category: "macro",
      isFeatured: false,
      tags: "CPI,Inflation",
      image: null,
    },
    {
      title: "Fed Rate Hikes and Direct Impact on Vietnamese Financial Markets",
      description:
        "In-depth report evaluating risks of foreign capital outflow and interbank interest rate fluctuations.",
      badge: "Macro",
      date: "10/06/2026",
      category: "macro",
      isFeatured: false,
      tags: "Fed,Rates",
      image: null,
    },
    {
      title:
        "Promoting Public Investment: Core Driver of Economic Growth in Late 2026",
      description:
        "Assessing disbursement progress of key highway projects and sectors receiving direct benefits.",
      badge: "Macro",
      date: "08/06/2026",
      category: "macro",
      isFeatured: false,
      tags: "Investment,Economy",
      image: null,
    },
    {
      title:
        "COMPANY ANALYSIS: INVESTMENT OPPORTUNITIES FROM LEADING SEMICONDUCTOR TECH ENTERPRISES",
      description:
        "Detailed evaluation of business model, international orders outlook, and financial statements of top-tier technology enterprises.",
      badge: "Company Analysis",
      date: "16/06/2026",
      category: "business",
      isFeatured: true,
      tags: "Enterprise,Technology",
      image: null,
    },
    {
      title:
        "Hoa Phat (HPG) Business Update: Revenue Growth Driven by Exported Steel",
      description:
        "Assessing gross profit margins and construction progress of Dung Quất 2 project under recovering steel prices.",
      badge: "Company Analysis",
      date: "15/06/2026",
      category: "business",
      isFeatured: false,
      tags: "HPG,Steel",
      image: null,
    },
    {
      title:
        "FPT Analysis: Drivers from Software Exports and Global Digital Transformation",
      description:
        "Forecasting resilient revenue growth from Japan and US markets, alongside next-gen AI cooperation opportunities.",
      badge: "Company Analysis",
      date: "11/06/2026",
      category: "business",
      isFeatured: false,
      tags: "FPT,Technology",
      image: null,
    },
    {
      title:
        "MWG Retail Field Survey: Efficiency from Store Chain Restructuring",
      description:
        "Analysis report on break-even point of Bách Hóa Xanh chain and growth prospects of net profit.",
      badge: "Company Analysis",
      date: "09/06/2026",
      category: "business",
      isFeatured: false,
      tags: "MWG,Retail",
      image: null,
    },
    {
      title:
        "COMMODITY MARKET REPORT: GEOPOLITICAL TENSIONS PUSH GLOBAL CRUDE OIL AND GOLD PRICES HIGHER",
      description:
        "Detailed report on OPEC+ oil supply trends and technical backup analysis for spot gold price charts.",
      badge: "Commodities",
      date: "15/06/2026",
      category: "commodity",
      isFeatured: true,
      tags: "Crude Oil,Gold",
      image: null,
    },
    {
      title:
        "Global Steel Price Trend Forecast H2 2026 under Supply Surplus Pressures",
      description:
        "Analyzing manufacturing activity in China and consumption prospects in the domestic real estate market.",
      badge: "Commodities",
      date: "12/06/2026",
      category: "commodity",
      isFeatured: false,
      tags: "Steel,Commodity",
      image: null,
    },
    {
      title:
        "Agriculture Supply/Demand Report: Robusta Coffee Prices Hit Historical Highs due to El Nino",
      description:
        "Surveying harvest output in Central Highlands of Vietnam and its influence on agricultural exports.",
      badge: "Commodities",
      date: "10/06/2026",
      category: "commodity",
      isFeatured: false,
      tags: "Coffee,Agriculture",
      image: null,
    },
    {
      title:
        "Global Rubber Market Update: Opportunities for Vietnamese Rubber Exporters",
      description:
        "Global rubber prices recover strongly supported by rebound in tire production demand in European markets.",
      badge: "Commodities",
      date: "06/06/2026",
      category: "commodity",
      isFeatured: false,
      tags: "Rubber,Export",
      image: null,
    },
    {
      title:
        "MARKET COMMENTARY: VN-INDEX APPROACHES STRONG 1,280 RESISTANCE - AWAITING LEADING CAPITAL FLOWS",
      description:
        "Analyzing structural cash flow rotations between banks, securities, real estate sectors and next trend scenarios.",
      badge: "Market Commentary",
      date: "19/06/2026",
      category: "market",
      isFeatured: true,
      tags: "VN-Index,Cash flow",
      image: null,
    },
    {
      title:
        "Morning Market Brief: VN-Index Rebounds Slightly in Weekend Session Supported by Bluechips",
      description:
        "Match liquidity improves to 18,000 billion VND, foreign net buying concentrates on core pillar stocks.",
      badge: "Daily Report",
      date: "18/06/2026",
      category: "market",
      isFeatured: false,
      tags: "Daily Brief,Market",
      image: null,
    },
    {
      title:
        "Weekly Market Commentary: Positive Accumulation Trend and Midcap Accumulation Opportunities",
      description:
        "Index strong support at 1,250 points, recommending weight increases on technical shakes.",
      badge: "Weekly Report",
      date: "17/06/2026",
      category: "market",
      isFeatured: false,
      tags: "Weekly Brief,Midcap",
      image: null,
    },
    {
      title:
        "Daily Derivatives Bulletin: Broad Range Sideway Trading Strategy on Contract Expiry Session",
      description:
        "Analyzing Open Interest (OI) of proprietary funds and foreign entities, directing optimal Long/Short entries.",
      badge: "Derivatives",
      date: "16/06/2026",
      category: "market",
      isFeatured: false,
      tags: "Derivatives,Contract",
      image: null,
    },
    {
      title:
        "EXPERT PERSPECTIVE: AMENDED LAND LAW WILL UNLOCK CAPITAL FLOWS AND RESHAPE REAL ESTATE MARKET DYNAMICS",
      description:
        "Interviewing chief economist on resolved legal bottlenecks and forecasting timeline for actual real estate market recovery.",
      badge: "Expert Perspective",
      date: "19/06/2026",
      category: "expert",
      isFeatured: true,
      tags: "Land Law,Real Estate",
      image: null,
    },
    {
      title:
        "Prospects of Upgrading Vietnamese Stock Market to Emerging Markets",
      description:
        "Expert analyzes progress in removing pre-funding requirements and capacity to attract foreign capital flows.",
      badge: "Perspective",
      date: "17/06/2026",
      category: "expert",
      isFeatured: false,
      tags: "Upgrade,Market",
      image: null,
    },
    {
      title:
        "Value Investing in New Macro Context: Selecting Stocks based on Margin of Safety Standards",
      description:
        "Insights from Chief Investment Officer on applying Buffett methodologies to Vietnamese stock market conditions.",
      badge: "Perspective",
      date: "14/06/2026",
      category: "expert",
      isFeatured: false,
      tags: "Value Investing,Buffett",
      image: null,
    },
    {
      title: "Digital Financial Services Trends and Wealthtech in Vietnam",
      description:
        "Evaluating growth potential of automated investment apps and behavioral shifts among Gen Z users.",
      badge: "Perspective",
      date: "10/06/2026",
      category: "expert",
      isFeatured: false,
      tags: "Digital,Wealthtech",
      image: null,
    },
  ],
};

/**
 * Fetch list of Report Analysts by locale.
 */
export async function fetchReportAnalysts(
  locale: string,
): Promise<IStrapiCollectionResponse<IReportAnalyst>> {
  try {
    return await cmsFetch<IStrapiCollectionResponse<IReportAnalyst>>(
      "/api/report-analytics",
      {
        params: {
          locale: locale,
          populate: ["image", "category"],
          pagination: {
            limit: 100,
          },
        },
        revalidate: 86400,
        tags: [`cms-report-analysts-${locale}`],
      },
    );
  } catch (error) {
    console.error(
      "Failed to fetch report analysts, falling back to mock data:",
      error,
    );
    const data = (mockReportAnalysts[locale] || mockReportAnalysts.vi).map(
      (item, index) => ({
        id: index + 1,
        documentId: `report-${index + 1}`,
        createdAt: "2026-07-19T00:00:00.000Z",
        updatedAt: "2026-07-19T00:00:00.000Z",
        Keyword: item.tags || "",
        ...item,
      }),
    );
    return { data, meta: {} };
  }
}

/**
 * Fetch report categories by type = "bao-cao-phan-tich"
 */
export async function fetchReportCategories(
  locale: string,
): Promise<IStrapiCollectionResponse<ICategory>> {
  try {
    return await cmsFetch<IStrapiCollectionResponse<ICategory>>(
      "/api/categories",
      {
        params: {
          locale,
          filters: {
            type: "bao-cao-phan-tich",
            active: "ACTIVE",
          },
          sort: ["order:asc", "id:asc"],
        },
        revalidate: 86400,
        tags: [`cms-report-categories-${locale}`],
      },
    );
  } catch (error) {
    console.error(
      "Failed to fetch report categories, falling back to mock data:",
      error,
    );
    const mockCategories: Omit<ICategory, "id">[] = [
      {
        title: "Báo cáo chiến lược",
        slug: "strategy",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 1,
      },
      {
        title: "Báo cáo vĩ mô",
        slug: "macro",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 2,
      },
      {
        title: "Phân tích doanh nghiệp",
        slug: "business",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 3,
      },
      {
        title: "Thị trường hàng hóa",
        slug: "commodity",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 4,
      },
      {
        title: "Nhận định thị trường",
        slug: "market",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 5,
      },
      {
        title: "Góc nhìn chuyên gia",
        slug: "expert",
        type: "bao-cao-phan-tich",
        active: "ACTIVE",
        order: 6,
      },
    ];
    const data = mockCategories.map((item, index) => ({
      id: index + 1,
      documentId: `cat-${index + 1}`,
      createdAt: "2026-07-19T00:00:00.000Z",
      updatedAt: "2026-07-19T00:00:00.000Z",
      ...item,
    }));
    return { data, meta: {} };
  }
}
