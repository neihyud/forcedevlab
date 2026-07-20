import { AboutContainer } from "./AboutContainer";

export const AddressStatsSection = () => {
  const stats = [
    { value: "10+ Năm", label: "Kinh nghiệm đầu tư" },
    { value: "50,000+", label: "Khách hàng đã sử dụng" },
    { value: "1000+", label: "Hãng hàng không" },
    { value: "30,000+", label: "Lượt tìm kiếm hàng ngày" },
  ];

  return (
    <section className="w-full bg-navy-dark text-white py-10 relative z-10">
      <AboutContainer>
        {/* Inner container — Figma node 342-2580: width 1140px, height 184px */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-0">
          {/* Left: Address — 550px, Poppins Medium 20px, lineHeight 150%, color #e5e5e5 */}
          <div className="w-full lg:w-[550px]">
            <p className="text-[#e5e5e5] text-[20px] font-medium  leading-[150%] whitespace-pre-line">
              {
                "Địa chỉ: Tầng 4, Trung tâm Thương mại Dịch vụ Cống Vị, số 2 Liễu Giai, Phường Ngọc Hà, TP Hà Nội.\nĐiện thoại: (+84-24) 38869999\nFax: (+84-24) 36888886\nEmail: info@hvsvn.com\nThời gian làm việc: 08:00 – 17:00 (Thứ 2 – Thứ 6)"
              }
            </p>
          </div>

          {/* Right: Stats Grid — 550px, 2 cols × 2 rows, gap-x 40px, gap-y 24px */}
          <div className="w-full lg:w-[550px] grid grid-cols-2 gap-y-6 gap-x-10">
            {stats.map((stat, idx) => (
              /* Each stat item: height 80px — value 48px + 4px gap + label 28px */
              <div key={idx} className="flex flex-col h-20">
                {/* Value: Poppins Bold 32px, #f5a623, height 48px */}
                <span className="text-[32px] font-bold font-poppins text-brand-gold leading-[48px]">
                  {stat.value}
                </span>
                {/* Label: Inter Medium 18px, lineHeight 28px, #e5e5e5, mt-1 (4px gap) */}
                <span className="text-[#e5e5e5] text-[18px] font-medium font-inter leading-[28px] mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </AboutContainer>
    </section>
  );
};
