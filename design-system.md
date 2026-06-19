# XBuild ERP — Design System (Material Design 3)

> **Trạng thái:** Active · **Ngày:** 2026-06-18
> Bộ design system MD3 cho toàn dự án, sinh từ seed primary `#1A73E8` (Google Blue).
> Áp dụng skill `material-3` (MD3 / Material You) cho nền tảng **web** (Next.js/React).
> Tuân thủ PERMANENT DECISION trong `AGENTS.md`: Material Design 3, palette Google,
> primary `#1A73E8`, light & dark first-class, drive bằng **một bộ CSS token duy nhất**,
> không hardcode màu/spacing.

---

## 1. Vì sao MD3 trên web dùng CSS custom properties

Skill `material-3` nêu rõ: `@material/web` (web component `<md-*>`) đang ở **maintenance mode** và
**M3 Expressive không có trên web**. Dự án là Next.js/React nên cách triển khai chuẩn là:

> **CSS custom properties (`--md-sys-*`) + component tự dựng (HTML/CSS hoặc React/shadcn) đọc từ token.**

Token là nguồn chân lý; component chỉ tham chiếu `var(--md-sys-...)`. Cách này giữ được dynamic
theming, dark mode và điều chỉnh tương phản — đúng tinh thần MD3 mà không phụ thuộc thư viện đã ngừng phát triển.

## 2. Cấu trúc bộ design system (folder `Designmui3/`)

| File | Vai trò |
|------|---------|
| `tokens.css` | **Nguồn chân lý DUY NHẤT** — toàn bộ token `--md-sys-*` (color light+dark, typography, shape, elevation, motion, spacing). Mọi file khác nạp file này trước. |
| `app.css` | App shell + component dùng chung (sidebar, topbar, button, card, KPI, badge, table, drawer, tabs…). Chỉ dùng token. |
| `styleguide.html` | Styleguide sống — xem trực tiếp mọi color role, type scale, component; có nút toggle light/dark. |
| `trang-chu.html` | Trang chủ / Dashboard dựng trên design system. |
| `viec-cua-toi.html` | "Việc của tôi" (bảng `.gsheet` + drawer chi tiết). |
| `du-lieu.html` | "Dữ liệu" / Collections (card grid không icon, một CTA "Tạo Collection"). |
| `quan-ly-truong.html` | Quản lý trường của collection (vào từ menu "…" → "Quản lý Trường"); list trường gọn không icon; thêm/sửa trường bằng **drawer sidebar** (dialog chọn loại trước khi thêm). |
| `xem-du-lieu.html` | Xem dữ liệu (bản ghi) của collection — lưới `.gsheet` kiểu Google Sheets: cột STT đóng băng trái, header dính, cuộn ngang, ô active, toolbar Bảng/Kanban + view + bộ lọc + phân trang. |
| `workflow.html` | Danh sách workflow (hướng người dùng cuối): card icon + badge trạng thái màu + "Cập nhật …", menu "…", lọc theo trạng thái. Card → mở editor. |
| `workflow-editor.html` | Trình dựng workflow (palette + canvas node). Bấm node mở **modal 3 cột**: trái Đầu vào (data bước trước), giữa cấu hình bước hiện tại, phải Đầu ra (data tạo ra). |
| `bieu-mau.html` | Quản lý biểu mẫu: card icon + badge trạng thái + chip "Khi gửi → chạy: workflow", Copy link, Sửa + menu "…". |
| `bieu-mau-editor.html` | Trình sửa biểu mẫu: trái = danh sách trường **accordion** (mở từng trường), phải = **xem trước form công khai cập nhật trực tiếp**; thiết lập chung (tiêu đề/lời chào/workflow). |
| `cai-dat-thanh-vien.html` | Cài đặt → Thành viên: 2-pane (sub-nav cài đặt + nội dung), bảng thành viên (avatar+tên/email, chọn vai trò, badge trạng thái, menu "…"), dialog Mời thành viên. |
| `design-system.md` | Tài liệu này. |

Thứ tự nạp trong mỗi trang:

```html
<link rel="stylesheet" href="tokens.css">   <!-- token trước -->
<link rel="stylesheet" href="app.css">       <!-- component sau -->
```

## 3. Color roles (seed `#1A73E8`)

Token theo namespace `--md-sys-color-*`. **Chỉ ghép theo cặp đúng vai trò** (`primary` + `on-primary`,
`surface` + `on-surface`, `*-container` + `on-*-container`). Ghép sai cặp sẽ vỡ tương phản ở dark mode.

| Role | Light | Dark | Dùng cho |
|------|-------|------|----------|
| `primary` / `on-primary` | `#1A73E8` / `#FFFFFF` | `#8AB4F8` / `#0A2E5C` | Nút chính, nav active, link |
| `primary-container` / `on-` | `#E8F0FE` / `#08306B` | `#1F3A60` / `#D2E3FC` | Nền chọn/active, FAB |
| `secondary` · `tertiary` · `info` | *(alias → `primary`)* | *(alias → `primary`)* | Vai trò "nhấn phụ" (tonal button, chip chọn, count pill, avatar) dùng tông primary — **không tách màu riêng** |
| `surface` / `on-surface` | `#FFFFFF` / `#202124` | `#202124` / `#E8EAED` | Nền trang/card, chữ chính |
| `on-surface-variant` | `#5F6368` | `#9AA0A6` | Chữ phụ, nhãn, icon |
| `surface-container-*` | `#F8F9FA → #E6E7E9` | `#202124 → #3C4043` | Bậc độ sâu (thay shadow) |
| `outline` / `outline-variant` | `#74777F` / `#E0E2E5` | `#8E9099` / `#3C4043` | Viền input / divider |
| `error` /`-container` | `#D93025` / `#FCE8E6` | `#F2B8B5` / `#8C1D18` | Lỗi, phá huỷ |

**Bộ màu rút gọn (3–5 màu cần thiết):** chỉ gồm **neutral (grey) + primary + 3 status** (`success` xanh lá,
`warning` amber, `error` đỏ). Đã loại bỏ secondary/tertiary/info để giảm nhiễu màu — chúng nay **alias về
`primary`**. Mọi trạng thái **luôn kèm icon/nhãn**, không bao giờ chỉ dùng màu.

### Status vocabulary (badge — dùng nhất quán toàn app)

| Trạng thái | Token | Nhãn ví dụ |
|-----------|-------|-----------|
| Đang chạy / xử lý | `info` / `primary` | "Đang chạy", "Đang xử lý" |
| Chờ / đợi | `warning` | "Chờ duyệt", "Chờ xử lý" |
| Hoàn thành / hoạt động | `success` | "Hoàn thành", "Đang hoạt động" |
| Lỗi / thất bại | `error` | "Lỗi", "Quá hạn" |
| Nháp / tạm dừng | `neutral` (`on-surface-variant`) | "Nháp", "Tạm dừng" |

## 4. Typography

Token `--md-sys-typescale-*` (M3 roles) + alias thang dự án (`--type-*`). Font **Inter** + **Be Vietnam Pro**
(phủ tiếng Việt), fallback `system-ui`. Số liệu/tiền/ID dùng `font-variant-numeric: tabular-nums`.

| Alias dự án | = M3 role | Size/Weight | Dùng |
|-------------|-----------|-------------|------|
| `--type-display` | title-large | 22/600 | H1 trang list |
| `--type-title` | — | 18/600 | Tiêu đề dialog/section |
| `--type-subtitle` | title-medium | 16/600 | Tên editor, nhóm card |
| `--type-body-strong` | — | 15/600 | Tên card, dòng list chính |
| `--type-body` | body-medium | 14/400 | Body mặc định, input |
| `--type-body-sm` | body-small | 13/400 | Chữ phụ, form dày |
| `--type-caption` | label-medium | 12/500 | Nhãn trường, meta |
| `--type-overline` | — | 11/600 uppercase | Tag node, eyebrow nhóm |

Cách dùng nhanh: `style="font: var(--md-sys-typescale-title-large)"`.

## 5. Shape · Elevation · Motion · Spacing

- **Shape** (`--md-sys-shape-corner-*`): input/menu `small 8`, card `medium/large 12–16`,
  dialog/sheet `extra-large 28`, button/chip/badge `full`. Alias: `--radius-sm/md/lg/pill`.
- **Elevation**: MD3 ưu tiên **đổi màu surface** (bậc `surface-container-*`) làm tín hiệu độ sâu;
  shadow (`--md-sys-elevation-level1..3`) chỉ thêm khi cần tách khỏi nền bận (menu, dialog, drawer).
- **Motion**: easing `--md-sys-motion-easing-*` + duration `short 100 / medium 200 / long 300`.
  Enter dùng `emphasized-decelerate`, exit dùng `standard-accelerate`. Tôn trọng `prefers-reduced-motion`.
- **Spacing**: hệ 8dp, base 4px — `4·8·12·16·24·32·48·80` (`--md-sys-spacing-*`). Control height 36px
  (dense 32px); vùng chạm tối thiểu 44px.

## 6. Dark mode

Một bộ token, hai cách bật:

1. **Thủ công (ưu tiên):** thêm class `.dark` (hoặc `.light`) lên `<html>`. Nút toggle trong các trang
   demo thao tác đúng cách này.
2. **Theo hệ thống:** khi chưa chọn `.light`/`.dark`, `@media (prefers-color-scheme: dark)` tự áp dark.

Component **không cần biết** đang ở theme nào — chỉ đọc token; đổi theme là đổi giá trị token.

## 7. Component → token (tham chiếu nhanh)

| Component | Nền | Chữ | Viền | Bo | Elevation |
|-----------|-----|-----|------|-----|-----------|
| Card | `surface` | `on-surface` | `outline-variant` | large | level1 (→2 hover) |
| Button filled | `primary` | `on-primary` | — | full | — |
| Button tonal | `secondary-container` | `on-secondary-container` | — | full | — |
| Button outlined | trong suốt | `primary` | `outline` | full | — |
| Input | `surface` | `on-surface` | `outline` (→`primary` focus, `error` invalid) | small | — |
| Badge (status) | `*-container` | `on-*-container` | — | full | — |
| Chip (filter) | `surface`/`secondary-container` (selected) | tương ứng | `outline` | small | — |
| Nav item active | `primary-container` | `on-primary-container` | — | full | — |
| Drawer | `surface` | `on-surface` | `outline-variant` (mép) | — | level3 |
| Bảng dữ liệu (`.gsheet`) | `surface` | `on-surface` | `outline-variant` (lưới 2 trục) | medium (wrap) | — |

### Bảng dữ liệu — hướng Google Sheets

Lưới bản ghi (Dữ liệu/Collections, báo cáo) dùng class `.gsheet` theo phong cách **Google Sheets**:

- **Lưới ô cả 2 trục** — mỗi ô có viền phải + dưới (`outline-variant`), tạo cảm giác bảng tính (khác list chỉ có vạch ngang).
- **Header xám dính (sticky)** — nền `surface-container`, chữ `caption` đậm; hover sáng lên `surface-container-high`; có affordance sort.
- **Cột STT** (`.idx`) bên trái — nền xám, số tabular, gợi cột số dòng của Sheets.
- **Ô đang chọn** (`.active`) — viền `primary` 2px (inset) + nền `primary-container`, đúng kiểu active-cell của Sheets; cả dòng chọn dùng nền primary 12%.
- **Số canh phải + `tabular-nums`**; bọc trong `.gsheet-wrap` (bo góc + cuộn + header dính).

> Phân biệt: các bề mặt **dạng bảng có cột** (Dữ liệu/Collections, **Việc của tôi**, báo cáo) dùng `.gsheet`
> với lưới đầy đủ + badge chấm dịu màu + ô/dòng active viền primary; còn **feed/dòng thời gian**
> (vd "Hoạt động gần đây") giữ pattern *list* — chỉ vạch ngang, không kẻ lưới dọc.

## 8. Quy tắc bắt buộc (anti-patterns MD3)

- ❌ **Không hardcode** hex/rgb hay px màu/spacing trong component → luôn `var(--md-sys-*)`.
- ❌ **Không ghép sai cặp tonal** (vd `primary` trên `surface-variant`).
- ❌ **Không dùng `outline`** cho divider → dùng `outline-variant`. `outline` dành cho viền quan trọng (input).
- ❌ **Không dùng shadow làm tín hiệu độ sâu mặc định** → ưu tiên bậc `surface-container-*`.
- ❌ **Không dùng `border-radius` số rời** → dùng shape token.
- ❌ **Không emoji làm icon cấu trúc** → dùng Material Symbols (một bộ icon).
- ❌ **Màu không bao giờ là chỉ dấu duy nhất** → status luôn kèm icon + chữ.

## 9. Accessibility (WCAG 2.1 AA)

Mọi cặp token đã kiểm tương phản (script ở §10):
- Chữ thường ≥ 4.5:1; chữ lớn / viền UI ≥ 3:1 — đạt ở **cả light & dark**.
- `outline` (viền input) đạt 3:1; `outline-variant` (divider, trang trí) không yêu cầu 3:1.
- Focus ring `primary` 2px + offset 2px qua `:focus-visible`; thứ tự tab theo thị giác.
- Icon-only có `aria-label`; dialog/drawer có `role`, `aria-modal`, đóng bằng Esc, trả focus.
- Tôn trọng `prefers-reduced-motion`.

## 10. Kiểm tra & bảo trì

- **Contrast:** chạy lại script kiểm cặp token khi đổi màu (xem báo cáo audit kèm theo).
- **MD3 audit:** dùng quy trình `audit` của skill `material-3` (chấm điểm 10 hạng mục: color tokens,
  typography, shape, elevation, components, layout, navigation, motion, accessibility, theming).
- **Khi thêm/đổi token:** sửa `tokens.css` (không sửa rải rác trong component), rồi cập nhật tài liệu này
  và `AGENTS.md` (Version History) theo RULE 2.

## 11. Mở rộng sang các trang còn lại

Các màn còn lại (Dữ liệu, Workflow builder, Biểu mẫu, Báo cáo, Cài đặt, Cowork) dựng theo cùng pattern:
nạp `tokens.css` + `app.css`, tái dùng shell (sidebar/topbar) và component (card, badge, table, drawer,
tabs, field). Chi tiết layout từng module xem `Designsystem/spec-system-ui-ux.md` §9.

---

## Liên kết
- Skill nguồn: `material-3` (Material Design 3 / Material You) — bản web dùng CSS custom properties.
- Spec hệ thống: `../Designsystem/spec-system-ui-ux.md`
- Design source-of-truth (tổng): `../Designv1/SKILL-DESIGN-FINAL.md`
- Quy tắc dự án: `../AGENTS.md` (PERMANENT DECISION về Material Design 3, `#1A73E8`).
