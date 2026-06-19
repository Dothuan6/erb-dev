/* shell.js — sidebar + theme dùng chung cho mọi trang.
   Mỗi trang chỉ cần <aside class="sidebar"></aside> và <script src="../assets/js/shell.js"></script>.
   Mục nav active tự xác định theo tên file đang mở. */
(function () {
  "use strict";

  var NAV = [
    { label: "Tổng quan", items: [
      { key: "trang-chu", href: "trang-chu.html", icon: "home", text: "Trang chủ" },
      { key: "viec-cua-toi", href: "viec-cua-toi.html", icon: "check_circle", text: "Việc của tôi", count: "5" }
    ]},
    { label: "Không gian làm việc", items: [
      { key: "du-lieu", href: "du-lieu.html", icon: "table_chart", text: "Dữ liệu" },
      { key: "workflow", href: "workflow.html", icon: "account_tree", text: "Workflow" },
      { key: "bieu-mau", href: "bieu-mau.html", icon: "description", text: "Biểu mẫu" },
      { key: "file", href: null, icon: "folder", text: "File" },
      { key: "bao-cao", href: null, icon: "bar_chart", text: "Báo cáo" }
    ]}
  ];

  var BOTTOM = [
    { key: "cai-dat", href: "cai-dat-thanh-vien.html", icon: "settings", text: "Cài đặt" },
    { key: "tro-giup", href: null, icon: "help", text: "Trợ giúp" }
  ];

  /* file đang mở -> nav key được active (các trang con quy về nhóm cha) */
  var ACTIVE_MAP = {
    "trang-chu.html": "trang-chu",
    "viec-cua-toi.html": "viec-cua-toi",
    "du-lieu.html": "du-lieu",
    "xem-du-lieu.html": "du-lieu",
    "quan-ly-truong.html": "du-lieu",
    "workflow.html": "workflow",
    "workflow-editor.html": "workflow",
    "bieu-mau.html": "bieu-mau",
    "bieu-mau-editor.html": "bieu-mau",
    "cai-dat-thanh-vien.html": "cai-dat"
  };

  var file = (location.pathname.split("/").pop() || "trang-chu.html").toLowerCase();
  var active = ACTIVE_MAP[file] || "";

  function itemHTML(it) {
    var isActive = it.key === active;
    var cls = "nav-item" + (isActive ? " active" : "");
    var attr = "";
    if (it.href && !isActive) attr += ' href="' + it.href + '"';
    if (isActive) attr += ' aria-current="page"';
    var count = it.count ? '<span class="count">' + it.count + "</span>" : "";
    return '<a class="' + cls + '"' + attr +
      '><span class="material-symbols-outlined">' + it.icon + "</span><span>" +
      it.text + "</span>" + count + "</a>";
  }

  function renderSidebar(el) {
    var html = '<div class="brand"><div class="logo">XB</div><span class="name">XBuild ERP</span></div>';
    NAV.forEach(function (g) {
      html += '<div class="nav-label">' + g.label + "</div>";
      g.items.forEach(function (it) { html += itemHTML(it); });
    });
    html += '<div class="bottom">';
    BOTTOM.forEach(function (it) { html += itemHTML(it); });
    html += "</div>";
    el.innerHTML = html;
  }

  function wireTheme() {
    var root = document.documentElement;
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    var ico = btn.querySelector(".material-symbols-outlined");
    var lbl = document.getElementById("themeLabel");
    btn.addEventListener("click", function () {
      var dark = root.classList.toggle("dark");
      root.classList.toggle("light", !dark);
      if (ico) ico.textContent = dark ? "light_mode" : "dark_mode";
      if (lbl) lbl.textContent = dark ? "Light" : "Dark";
    });
  }

  function init() {
    var sb = document.querySelector(".sidebar");
    if (sb) renderSidebar(sb);
    wireTheme();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
