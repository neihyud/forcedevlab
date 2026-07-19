import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { AboutContainer } from "./AboutContainer";
import { Card } from "@/components/ui/Card";
import mockVision from "@/lib/assets/mock-images/about-us/about-us-vision.webp";
import mockMission from "@/lib/assets/mock-images/about-us/about-us-mission.webp";
import mockPhilosophy from "@/lib/assets/mock-images/about-us/about-us-philosophy.webp";

export const VisionMissionValuesSection = () => {
  const coreValues = [
    {
      title: "Uy tín",
      desc: "Chúng tôi đặt chữ tín làm nền tảng cho mọi hoạt động, luôn minh bạch trong quản trị và cam kết trong từng dịch vụ cung cấp cho khách hàng.",
    },
    {
      title: "Chuyên nghiệp",
      desc: "Không ngừng nâng cao năng lực đội ngũ, tối ưu quy trình vận hành và duy trì tiêu chuẩn dịch vụ ở mức cao nhất trong mọi trải nghiệm khách hàng.",
    },
    {
      title: "Đổi mới",
      desc: "Liên tục ứng dụng công nghệ và cải tiến sản phẩm nhằm mang đến những giải pháp đầu tư nhanh chóng, thông minh và phù hợp với xu hướng thị trường.",
    },
    {
      title: "Đồng hành",
      desc: "Xem sự thành công của khách hàng là mục tiêu phát triển lâu dài; luôn đồng hành, hỗ trợ và cung cấp những giá trị thiết thực cho nhà đầu tư.",
    },
    {
      title: "Hiệu quả",
      desc: "Mọi chiến lược, dịch vụ và giải pháp đều hướng tới việc tối ưu lợi ích, gia tăng hiệu quả đầu tư và tạo ra giá trị bền vững.",
    },
    {
      title: "Minh bạch",
      desc: "Đề cao tính công khai, rõ ràng trong thông tin, quy trình và hoạt động kinh doanh, góp phần xây dựng niềm tin lâu dài với khách hàng và thị trường.",
    },
  ];

  const items = [
    {
      title: "Tầm nhìn",
      img: mockVision,
      desc: "Khẳng định vị thế là một trong những định chế tài chính uy tín hàng đầu tại Việt Nam, tiên phong kiến tạo hệ sinh thái đầu tư hiện đại, minh bạch và bền vững; góp phần thúc đẩy sự phát triển chuyên nghiệp của thị trường vốn Việt Nam trong tiến trình hội nhập quốc tế.\nHVS định hướng phát triển trở thành đối tác tài chính chiến lược được nhà đầu tư, doanh nghiệp và các tổ chức trong nước cũng như quốc tế tin tưởng lựa chọn.",
    },
    {
      title: "Sứ mệnh",
      img: mockMission,
      desc: "Cung cấp các giải pháp tài chính và dịch vụ chứng khoán toàn diện với tiêu chuẩn chuyên nghiệp cao, ứng dụng công nghệ tiên tiến nhằm tối ưu hóa hiệu quả đầu tư và gia tăng giá trị tài sản cho khách hàng.\nChúng tôi cam kết xây dựng môi trường đầu tư an toàn, minh bạch và hiệu quả; đồng thời đóng góp tích cực vào sự phát triển bền vững của thị trường tài chính Việt Nam qua năng lực quản trị chuẩn mực, tư duy đổi mới và trách nhiệm đối với cộng đồng.",
    },
  ];

  return (
    <section className="relative w-full bg-[#f3f3f9] dark:bg-[#0f172a]/20 pb-20 md:pb-32">
      {/* Dark overlap background block matching Figma Rectangle 34624131 */}
      <div className="absolute top-0 left-0 right-0 h-[120px] bg-navy-dark pointer-events-none" />

      <AboutContainer className="pt-[32px]">
        {/* Vision & Mission Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {items.map((item, idx) => (
            <Card
              key={idx}
              borderRadius="16px"
              padding="0px"
              shadow="sm"
              className="border border-border h-[600px] hover:-translate-y-1.5 transition-transform duration-300 bg-white dark:bg-card"
            >
              <div className="h-[320px] relative overflow-hidden shrink-0">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-start">
                <h3 className="text-2xl font-bold text-text-navy dark:text-white mb-2 leading-8 font-poppins">
                  {item.title}
                </h3>
                <p className="text-[#121212] dark:text-[#e5e5e5] text-base font-normal leading-6 font-poppins whitespace-pre-line">
                  {item.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Core Values Card (Stacked horizontally on desktop, vertically on mobile) */}
        <div className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-sm mt-6 border border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left Column: Image Illustration */}
            <div className="relative w-full h-[350px] lg:h-[747px]">
              <Image
                src={mockPhilosophy}
                alt="Giá trị cốt lõi"
                fill
                className="object-cover object-center"
              />
            </div>

            {/* Right Column: Values list stacked in a single vertical column */}
            <div className="p-6 flex flex-col justify-start lg:h-[747px]">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-text-navy dark:text-white leading-8 font-poppins">
                  GIÁ TRỊ CỐT LÕI
                </h2>
              </div>

              <div className="space-y-3.5">
                {coreValues.map((val, idx) => (
                  <div key={idx} className="flex gap-2 items-start">
                    <div className="shrink-0 mt-0.5">
                      <CheckCircle2 className="w-6 h-6 text-white fill-[#f5a623]" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-text-navy dark:text-white leading-[24px] mb-1 font-poppins">
                        {val.title}
                      </h4>
                      <p className="text-[#5b5b5b] dark:text-gray-300 text-[16px] font-normal leading-[24px] font-poppins">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AboutContainer>
    </section>
  );
};
