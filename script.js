// Đợi trang web tải xong hoàn toàn
window.addEventListener("load", () => {
  // 1. Tắt màn hình loading
  const loader = document.querySelector(".loader");
  loader.classList.add("hidden");

  // 2. Kích hoạt Plugin ScrollTrigger của GSAP
  gsap.registerPlugin(ScrollTrigger);

  // 3. Tạo hiệu ứng cuộn ngang
  // Chọn tất cả các panel
  const sections = gsap.utils.toArray(".panel");

  // Thiết lập animation
  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1), // Di chuyển sang trái
    ease: "none", // Chuyển động đều, không giật
    scrollTrigger: {
      trigger: ".gallery-wrapper", // Kích hoạt khi cuộn đến wrapper
      pin: true, // "Ghim" màn hình lại (quan trọng)
      scrub: 1, // Hiệu ứng chạy theo thanh cuộn chuột (mượt mà)
      snap: 1 / (sections.length - 1), // Tự động hít vào giữa ảnh khi dừng cuộn
      end: () => "+=" + document.querySelector(".gallery-wrapper").offsetWidth, // Độ dài của quãng đường cuộn
    },
  });

  // 4. Hiệu ứng xuất hiện cho các phần text (Fade Up)
  gsap.from(".hero-content", {
    y: 50,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    delay: 0.5,
  });

  gsap.from(".section-title", {
    scrollTrigger: ".intro",
    y: 30,
    opacity: 0,
    duration: 1,
  });

  gsap.from(".card", {
    scrollTrigger: ".goals",
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2, // Các thẻ hiện lần lượt
  });
  // ... Đoạn code GSAP cũ nằm ở trên ...

  // --- HIỆU ỨNG CHO STACKING CARDS (Phần mới) ---
  // Hiệu ứng: Khi thẻ sau trồi lên, thẻ trước đó bị thu nhỏ nhẹ và mờ đi

  const stackCards = gsap.utils.toArray(".stack-card");

  stackCards.forEach((card, index) => {
    // Trừ thẻ cuối cùng ra, không cần hiệu ứng scale
    if (index === stackCards.length - 1) return;

    gsap.to(card, {
      scale: 0.9, // Thu nhỏ lại chút xíu
      opacity: 0.5, // Mờ đi
      scrollTrigger: {
        trigger: card,
        start: "top 10vh", // Bắt đầu khi thẻ chạm vị trí dính
        end: "bottom 10vh", // Kết thúc khi hết chiều cao thẻ
        scrub: true, // Mượt mà theo chuột
        // markers: true // Bật cái này nếu muốn debug vị trí
      },
    });
  }); // --- HIỆU ỨNG CHO PHẦN KẾT (GRAND FINALE) ---
  gsap.from(".finale-header", {
    scrollTrigger: {
      trigger: ".grand-finale",
      start: "top 70%", // Khi cuộn đến 70% màn hình
    },
    y: 50,
    opacity: 0,
    duration: 1,
  });

  gsap.from(".goal-item", {
    scrollTrigger: {
      trigger: ".grand-finale",
      start: "top 60%",
    },
    x: 50, // Trượt từ phải sang
    opacity: 0,
    duration: 0.8,
    stagger: 0.2, // Mục này hiện sau mục kia 0.2s
  });
});
