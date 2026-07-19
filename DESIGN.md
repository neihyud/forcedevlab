---
name: ForceDevLab
description: Hệ thống thiết kế Deep Ocean Accent với tông màu xanh dương đậm chuyên nghiệp và các điểm nhấn màu cam ấm áp.
colors:
  primary: "#032c57"
  primary-foreground: "#ffffff"
  secondary: "#f58733"
  secondary-foreground: "#ffffff"
  background: "#fffefa"
  foreground: "#0d0d12"
  muted: "#eceff3"
  muted-foreground: "#666d80"
  border: "#dfe1e6"
  accent: "#f6f8fa"
typography:
  display:
    fontFamily: "Poppins, var(--font-poppins), sans-serif"
    fontSize: "72px"
    fontWeight: 700
    lineHeight: "90px"
  body:
    fontFamily: "Poppins, var(--font-poppins), sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#0A4C8F"
---

# Hệ thống thiết kế: ForceDevLab

## 1. Tổng quan (Overview)

**Creative North Star (Định hướng sáng tạo): "The Deep Ocean Accent"**

ForceDevLab sử dụng một khung giao diện chuyên nghiệp, hiện đại và tập trung vào sự tin cậy. Hệ thống được xây dựng xung quanh nền tảng màu xanh dương đậm tĩnh lặng lấy cảm hứng từ đại dương, tương phản với các điểm nhấn màu cam ấm áp rực rỡ để dẫn dắt sự chú ý của người dùng vào các hành động quan trọng.

Hệ thống thiết kế này từ chối các màu nền kem/beige bão hòa mặc định của AI, thay vào đó cam kết sử dụng màu trắng kem sạch sẽ (`#fffefa`) cho chế độ sáng (light mode) và màu xanh đen đậm cứng cáp (`#0d0d12`) cho chế độ tối (dark mode). Mật độ thông tin được cân bằng, ưu tiên khoảng cách lưới sạch sẽ và kiểu chữ dễ đọc hơn là các yếu tố trang trí thừa.

**Đặc điểm chính:**

- **Điểm nhấn tương phản cao:** Màu cam thứ cấp tràn đầy năng lượng trên các khu vực kích hoạt tương tác.
- **Mật độ cấu trúc rõ ràng:** Thước đo khoảng cách tiêu chuẩn dựa trên bội số của 8px.
- **Hình học sắc nét:** Bo góc tiêu chuẩn 10px (`0.625rem`) cho vẻ ngoài hiện đại, hơi tròn trịa nhưng vẫn giữ được sự chuyên nghiệp.

## 2. Màu sắc (Colors)

Hệ thống màu sắc được chia thành các bảng màu: Thương hiệu chính (Primary), Nhấn phụ (Secondary), Xám/Trung tính (Grays/Neutrals) và các bảng màu ngữ nghĩa (Semantic), ánh xạ trực tiếp từ Figma Node `4:14596` và đồng bộ với `globals.css`.

### Màu cơ bản (Base Colors)

- **White (Trắng)**: `#FFFFFF`
- **Background (Nền)**: `#FFFEFA`
- **Black (Đen)**: `#000000`

### Nhóm màu chính (Primary - Branding)

- **Primary/600**: `#011128` (Xanh biển sâu đậm nhất)
- **Primary/500**: `#032c57` (Màu thương hiệu chính)
- **Primary/400**: `#0A4C8F` (Xanh dương sống động)
- **Primary/300**: `#136ecb` (Xanh thông tin / liên kết)
- **Primary/200**: `#4493fc`
- **Primary/100**: `#98b9fd`
- **Primary/50**: `#D5E1FE`
- **Primary/25**: `#E7EEFF`
- **Primary/0**: `#F5F8FF`

### Nhóm màu phụ (Secondary - Branding)

- **Secondary/600**: `#2e1403`
- **Secondary/500**: `#5a2d0c`
- **Secondary/400**: `#F58733` (Màu cam Solar Orange làm điểm nhấn)
- **Secondary/300**: `#BE6625`
- **Secondary/200**: `#F58532`
- **Secondary/100**: `#FBBBA2`
- **Secondary/50**: `#FEEDE8`
- **Secondary/25**: `#FFF0EB`
- **Secondary/0**: `#FFF8F5`

### Bảng màu xám (Grays - Neutrals)

- **Gray/900**: `#0D0D12` (Chữ chính mặc định)
- **Gray/800**: `#1A1B25`
- **Gray/700**: `#272835`
- **Gray/600**: `#353849`
- **Gray/500**: `#666D80` (Màu chữ phụ / icons)
- **Gray/400**: `#808897`
- **Gray/300**: `#A4ABB8`
- **Gray/200**: `#C1C7CF`
- **Gray/100**: `#DFE1E6` (Đường viền / vạch chia)
- **Gray/50**: `#ECEFF3` (Nền vô hiệu hóa - disabled background)
- **Gray/25**: `#F6F8FA`
- **Gray/0**: `#F8F9FB`

### Bảng màu ngữ nghĩa (Semantic Palettes)

#### Lỗi (Error)

- **Error/400**: `#9A2D2D`
- **Error/300**: `#CC4F4F`
- **Error/200**: `#D67272`
- **Error/100**: `#E09595`
- **Error/50**: `#EBB8B8`
- **Error/25**: `#FAEDED`
- **Error/0**: `#FCF6F6`

#### Thành công (Success)

- **Success/400**: `#289029`
- **Success/300**: `#30AF32`
- **Success/200**: `#59BF5B`
- **Success/100**: `#83CF84`
- **Success/50**: `#ACDFAD`
- **Success/25**: `#EAF7EA`
- **Success/0**: `#F5FBF5`

#### Cảnh báo (Warning)

- **Warning/300**: `#FFBD00`
- **Warning/200**: `#F3C551`
- **Warning/100**: `#F6D47D`
- **Warning/50**: `#F9E2A8`
- **Warning/25**: `#FDF8E9`
- **Warning/0**: `#FEFBF4`

### Quy tắc đặt tên (Named Rules)

**Quy tắc nhấn 10% (The 10% Accent Rule).** Màu cam nhấn Secondary/400 (`#F58733`) chỉ được sử dụng trên ít hơn 10% diện tích của bất kỳ khung hình nào. Sự khan hiếm là nguồn gốc tạo nên sức mạnh thị giác của nó.

## 3. Kiểu chữ (Typography)

**Font chữ hiển thị (Display Font):** Poppins (kèm font không chân hệ thống fallback)
**Font chữ nội dung (Body Font):** Poppins (kèm font không chân hệ thống fallback)
**Font chữ nhãn/đơn cách (Label/Mono Font):** Geist Mono (monospace)

**Đặc điểm:** Hệ thống kiểu chữ sử dụng **Poppins** làm font chính cho tất cả tiêu đề hiển thị, đề mục và nội dung văn bản để tạo ra thẩm mỹ hình học sạch sẽ, hiện đại như định nghĩa tại Figma Node `4:15497`. Hệ thống sử dụng **Geist Mono** cho code và siêu dữ liệu kỹ thuật.

### Phân cấp chữ (Hierarchy)

Thang phân cấp kiểu chữ tuân thủ chính xác các hướng dẫn về kích thước và chiều cao dòng từ Figma:

- **Display-2xl** (Bold/Semibold, 72px / 90px): Tiêu đề Hero chính.
- **Display-xl** (Bold/Semibold, 60px / 72px): Tiêu đề biểu ngữ lớn.
- **Display-lg** (Bold/Semibold, 48px / 60px): Tiêu đề các phần chính của trang.
- **Display-md** (Bold/Semibold, 36px / 44px): Tiêu đề trang cấp 1.
- **Display-sm** (Bold/Semibold, 30px / 38px): Tiêu đề các component phụ.
- **Display-xs** (Bold/Semibold, 24px / 32px): Tiêu đề khối tính năng.
- **Text-xl** (Medium/Regular, 20px / 30px): Đoạn dẫn nhập / văn bản giới thiệu.
- **Text-lg** (Medium/Regular, 18px / 28px): Văn bản lớn / nội dung nổi bật.
- **Text-md** (Regular, 16px / 24px): Văn bản nội dung mặc định. Giới hạn độ rộng dòng ở 65–75ch.
- **Text-sm** (Medium/Regular, 14px / 20px): Siêu dữ liệu, chi tiết phụ, chữ trên nút nhỏ.
- **Text-xs** (Medium/Regular, 12px / 18px): Chú thích, nhãn phụ (eyebrows) và văn bản trợ giúp.

### Quy tắc đặt tên (Named Rules)

**Quy tắc cân bằng dòng (The Balanced Line Rule).** Tất cả các tiêu đề lớn (h1, h2, h3) phải sử dụng `text-wrap: balance` để tránh ngắt dòng mất cân đối.

## 4. Chiều sâu (Elevation)

Hệ thống được thiết kế phẳng theo mặc định, sử dụng đường viền mảnh (`#dfe1e6`) và sự thay đổi tông màu nhẹ để phân tách cấu trúc thay vì dùng đổ bóng nặng.

### Từ vựng đổ bóng (Shadow Vocabulary)

- **Interactive Hover** (`0 4px 20px rgba(3, 44, 87, 0.08)`): Được áp dụng lên các thẻ (cards) hoặc nút khi người dùng tương tác rê chuột (hover).

### Quy tắc đặt tên (Named Rules)

**Quy tắc phẳng tĩnh (The Flat-at-Rest Rule).** Tất cả các thẻ và vùng chứa thông tin phải phẳng và có đường viền ở trạng thái tĩnh. Đổ bóng nhẹ chỉ xuất hiện khi có trạng thái tương tác hoạt động (hover/focus).

## 5. Thành phần giao diện (Components)

### Nút (Buttons)

- **Bo góc (Shape):** Bo góc nhẹ (10px / 0.625rem).
- **Primary:** Nền xanh Deep Ocean Blue, chữ trắng.
- **Secondary:** Nền cam Solar Orange, chữ trắng.
- **Hover / Focus:** Chuyển đổi mượt mà 200ms sang tông màu sáng/tối hơn.

### Thẻ / Vùng chứa (Cards / Containers)

- **Bo góc (Corner Style):** 10px (`0.625rem`) radius.
- **Nền (Background):** Trắng (`#ffffff`) hoặc Xám nhạt (`#f8f9fb`).
- **Viền (Border):** 1px solid (`#dfe1e6`).
- **Khoảng đệm trong (Internal Padding):** 24px (`1.5rem`).

### Trường nhập liệu (Inputs / Fields)

- **Kiểu dáng:** Viền 1px (`#dfe1e6`), bo góc 10px, nền `#ffffff`.
- **Focus:** Viền chuyển sang màu chính (`#032c57`) kèm vòng phát sáng nhẹ.

## 6. Nên làm và Tránh làm (Do's and Don'ts)

### Nên làm (Do):

- **Nên** sử dụng các biến CSS custom (ví dụ: `var(--primary)`) để đảm bảo khả năng tương thích tự động với chế độ tối (dark mode).
- **Nên** giới hạn độ rộng vùng chứa văn bản dài ở mức tối đa 65-75ch để người dùng dễ đọc.
- **Nên** sử dụng `text-wrap: balance` cho tất cả các tiêu đề từ h1 đến h3.
- **Nên** chuyển đổi tất cả hình ảnh sang định dạng WebP để tối ưu hóa hiệu năng tải trang.
- **Nên** tách các phần giao diện hoặc bố cục dùng chung thành các React component tái sử dụng độc lập.
- **Nên** lấy tất cả cấu hình toàn cục, menu và cài đặt SEO động từ CMS (Strapi).
- **Nên** triển khai các skeleton loading và trạng thái fallback phù hợp cho tất cả các cuộc gọi API.
- **Nên** tách các key dịch thuật/bản dịch thường dùng ra phạm vi toàn cục thay vì khai báo trùng lặp.

### Tránh làm (Don't):

- **Tránh** sử dụng đường viền nhấn dày ở một bên (ví dụ: viền trái dày trên các thẻ callout).
- **Tránh** sử dụng văn bản dạng gradient (chữ chuyển màu) trong bất kỳ trường hợp nào.
- **Tránh** lạm dụng hiệu ứng mờ (blur) hoặc hiệu ứng kính (glassmorphism) làm phong cách mặc định.
- **Tránh** sử dụng các giá trị z-index tùy tiện; hãy tuân thủ thang đo đã định nghĩa trong `globals.css`.
- **Tránh** sử dụng văn bản giả/tĩnh được code cứng thay thế cho các trường dữ liệu động từ CMS.
- **Tránh** sử dụng các định dạng ảnh chưa được tối ưu hóa (như PNG hoặc JPG gốc).
- **Tránh** viết các trang web dưới dạng một file nguyên khối khổng lồ; hãy giữ các component tập trung và tách biệt.
