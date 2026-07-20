# Product (Sản phẩm)

## Register (Danh mục)

product

## Platform (Nền tảng)

web

## Users (Người dùng)

- Người dùng và khách hàng tìm kiếm dịch vụ hoặc sản phẩm từ ForceDevLab.
- Quản trị viên trang web quản lý nội dung động thông qua Strapi CMS.

## Product Purpose (Mục đích sản phẩm)

Trang web doanh nghiệp đa ngôn ngữ, động, đóng vai trò là bộ mặt của ForceDevLab, tích hợp Strapi CMS để quản lý cấu hình toàn cục (global settings), menu và các phần của trang đích trong thời gian thực.

## Positioning (Định vị)

Một trang web doanh nghiệp React/Next.js được tối ưu hóa hiệu năng, có tính mô-đun cao và hoạt động hoàn toàn dựa trên tích hợp CMS động.

## Brand Personality (Tính cách thương hiệu)

- Chuyên nghiệp, Đáng tin cậy, Năng động, Hiện đại.
- Giao diện trực quan phải khớp với hệ thống thiết kế "Deep Ocean Accent".

## Anti-references (Mẫu thiết kế cần tránh)

- Văn bản tĩnh được code cứng hoặc các văn bản giữ chỗ cho các trường dữ liệu cần lấy từ CMS.
- Các tệp trang nguyên khối (không tách các component dùng chung).
- Hình ảnh chưa được tối ưu hóa (như PNG/JPG gốc).

## Design Principles (Nguyên tắc thiết kế)

- **Ưu tiên nội dung động từ CMS (Dynamic Content First):** Toàn bộ cấu hình toàn cục, menu và cài đặt phải được lấy qua API của CMS. Luôn triển khai các skeleton/trạng thái tải (loading) và fallback an toàn. Không bao giờ để văn bản tĩnh/placeholder trong bản chạy production.
- **Chuẩn hình ảnh WebP (WebP Media Standard):** Tất cả hình ảnh phải được phân phối ở định dạng WebP để tối ưu hóa tốc độ tải trang và chỉ số Largest Contentful Paint (LCP).
- **Tách Component Mô-đun (Modular Component Separation):** Các khối chung hoặc các phần được chia sẻ phải được tách thành các component độc lập có thể tái sử dụng, thay vì viết gộp trong các tệp layout cha.
- **SEO điều khiển bởi CMS (CMS-Driven SEO):** Siêu dữ liệu SEO (SEO metadata), mô tả và tiêu đề trang phải được lấy động từ cấu hình của CMS.
- **Bản dịch có cấu trúc (Structured Localization):** Đối với các bản dịch đa ngôn ngữ, hãy xác định các trường bản dịch thường dùng và tách chúng ra phạm vi toàn cục thay vì khai báo trùng lặp trong từng trang riêng lẻ.

## Accessibility & Inclusion (Khả năng tiếp cận & Hòa nhập)

- Tuân thủ chuẩn WCAG 2.1 AA (đặc biệt là độ tương phản của chữ Poppins và chỉ báo tiêu điểm focus).
