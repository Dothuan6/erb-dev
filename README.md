# XBuild ERP — Design System & Màn hình mẫu (MD3)

Bộ giao diện mẫu (prototype tĩnh) cho **XBuild ERP / ERP Mini** — nền tảng business
no-code/low-code tiếng Việt. Triển khai theo **Material Design 3**, palette Google,
primary `#1A73E8`, hỗ trợ **light & dark** qua một bộ CSS token duy nhất.

> Đây là site **HTML tĩnh thuần** — không cần Node, không cần build step. Mở trực tiếp
> hoặc deploy lên bất kỳ static host nào (Netlify, GitHub Pages, Vercel…).

## Cấu trúc

| File | Vai trò |
| --- | --- |
| `index.html` | Entry point ở URL gốc → mở `trang-chu.html` |
| `tokens.css` | **Nguồn token DUY NHẤT** (màu/spacing/typography, light + dark) |
| `app.css` | Style component dùng chung |
| `styleguide.html` | Xem trực tiếp design system |
| `design-system.md` | Tài liệu design system |
| `trang-chu.html` | Trang chủ / dashboard |
| `viec-cua-toi.html` | Việc của tôi (Tasks) |
| `du-lieu.html` · `xem-du-lieu.html` · `quan-ly-truong.html` | Dữ liệu / Collections |
| `workflow.html` · `workflow-editor.html` | Workflow automation (n8n-style) |
| `bieu-mau.html` · `bieu-mau-editor.html` | Biểu mẫu (Forms) |
| `cai-dat-thanh-vien.html` | Cài đặt → Thành viên |

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
