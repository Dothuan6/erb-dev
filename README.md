# XBuild ERP — Design System & Màn hình mẫu (MD3)

Bộ giao diện mẫu (prototype tĩnh) cho **XBuild ERP / ERP Mini** — nền tảng business
no-code/low-code tiếng Việt. Triển khai theo **Material Design 3**, palette Google,
primary `#1A73E8`, hỗ trợ **light & dark** qua một bộ CSS token duy nhất.

> Đây là site **HTML tĩnh thuần** — không cần Node, không cần build step. Mở trực tiếp
> hoặc deploy lên bất kỳ static host nào (Netlify, GitHub Pages, Vercel…).

## Cấu trúc

```
.
├── index.html              # Entry point ở URL gốc → chuyển vào pages/trang-chu.html
├── netlify.toml            # Cấu hình deploy (publish ".", rewrite "/" → trang chủ)
├── design-system.md        # Tài liệu design system
├── assets/
│   ├── css/
│   │   ├── tokens.css      # NGUỒN TOKEN DUY NHẤT (màu/spacing/typography, light + dark)
│   │   └── app.css         # Style component dùng chung
│   └── js/
│       └── shell.js        # Sidebar + theme dùng chung cho mọi trang (tự đánh dấu nav active)
└── pages/                  # Các màn hình
    ├── trang-chu.html              # Trang chủ / dashboard
    ├── viec-cua-toi.html           # Việc của tôi (Tasks)
    ├── du-lieu.html                # Dữ liệu / Collections
    ├── xem-du-lieu.html            #   ↳ xem bản ghi (Google Sheets)
    ├── quan-ly-truong.html         #   ↳ quản lý trường
    ├── workflow.html               # Workflow automation (n8n-style)
    ├── workflow-editor.html        #   ↳ trình dựng workflow
    ├── bieu-mau.html               # Biểu mẫu (Forms)
    ├── bieu-mau-editor.html        #   ↳ trình sửa biểu mẫu
    ├── cai-dat-thanh-vien.html     # Cài đặt → Thành viên
    └── styleguide.html             # Xem trực tiếp design system
```

> **Shell dùng chung:** mỗi trang chỉ còn `<aside class="sidebar"></aside>` + `<script src="../assets/js/shell.js">`.
> Sidebar và nút đổi theme do `shell.js` dựng — sửa nav 1 chỗ, áp dụng mọi trang. Mục nav active tự xác định theo tên file.

## Chạy thử ở máy

Mở thẳng `index.html` bằng trình duyệt, hoặc chạy 1 static server bất kỳ:

```bash
# Python
python -m http.server 8080
# hoặc Node
npx serve .
```

Rồi mở http://localhost:8080

## Deploy lên Netlify

**Cách 1 — kéo-thả (nhanh nhất):** vào https://app.netlify.com/drop và kéo cả thư mục này vào.

**Cách 2 — qua GitHub (tự động deploy mỗi lần push):**
1. Push repo này lên GitHub.
2. Netlify → *Add new site* → *Import an existing project* → chọn repo.
3. Để **Build command** trống, **Publish directory** = `.` (đã khai báo sẵn trong `netlify.toml`).
4. *Deploy*.

## Ghi chú thiết kế

- Không hardcode màu/spacing — mọi giá trị đọc từ `tokens.css`.
- Palette rút gọn: **neutral + primary + 3 status** (success/warning/error).
- Bảng dữ liệu theo hướng **Google Sheets** (class `.gsheet`).
- Font: Inter + Be Vietnam Pro + Material Symbols (load qua Google Fonts CDN).
