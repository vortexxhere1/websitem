document.addEventListener("DOMContentLoaded", () => {
    const profileTrigger = document.getElementById("profile-trigger");
    const linksContainer = document.getElementById("links-container");
    const footer = document.getElementById("footer");
    const musicToggle = document.getElementById("music-toggle");
    const bgMusic = document.getElementById("bg-music");
    const toast = document.getElementById("toast");
    let isOpened = false;

    // Müzik Açma / Kapatma
    musicToggle.addEventListener("click", () => {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                musicToggle.classList.add("playing");
                musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
                showToast("Lofi müzik çalıyor 🎶");
            }).catch(e => {
                console.log("Müzik çalma hatası:", e);
                showToast("Tarayıcı müziği engelledi!");
            });
        } else {
            bgMusic.pause();
            musicToggle.classList.remove("playing");
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
            showToast("Müzik durduruldu 🔇");
        }
    });

    // Arka Plan Kar Efekti
    const snowContainer = document.getElementById("snow-container");
    const snowflakeCount = 35;

    for (let i = 0; i < snowflakeCount; i++) {
        const star = document.createElement("div");
        star.className = "snowflake";
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = -Math.random() * 20 + "vh";
        
        const size = Math.random() * 3 + 2;
        star.style.width = size + "px";
        star.style.height = size + "px";
        
        const duration = Math.random() * 8 + 5;
        const delay = Math.random() * 5;
        star.style.animationDuration = duration + "s";
        star.style.animationDelay = delay + "s";
        
        snowContainer.appendChild(star);
    }

    // Toast (Kopyalandı) Bildirimi Gösterme
    function showToast(text) {
        toast.textContent = text;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }

    // JSON Verilerini Çekme ve İşleme
    fetch("links.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("profile-name").textContent = data.profile.name;
            document.getElementById("profile-bio").textContent = data.profile.bio;

            linksContainer.innerHTML = "";

            data.links.forEach(link => {
                const a = document.createElement("a");
                a.className = "link-button";
                a.style.backgroundColor = link.bgColor;

                // Eğer URL "#" ise panoya kopyalama özelliği ekle
                if (link.url === "#") {
                    a.href = "javascript:void(0);";
                    a.addEventListener("click", (e) => {
                        e.preventDefault();
                        let copyText = link.title;
                        if (link.title.includes(":")) {
                            copyText = link.title.split(":")[1].trim();
                        }
                        navigator.clipboard.writeText(copyText).then(() => {
                            showToast(`Panoya kopyalandı: ${copyText} ✨`);
                        }).catch(() => {
                            showToast("Kopyalanamadı!");
                        });
                    });
                } else {
                    a.href = link.url;
                    a.target = "_blank";
                }

                a.innerHTML = `
                    <span><i class="${link.icon}"></i> ${link.title}</span>
                    <i class="fas fa-chevron-right"></i>
                `;

                linksContainer.appendChild(a);
            });
        })
        .catch(error => console.error("Veriler yüklenirken hata oluştu:", error));

    // Profile tıklandığında açılış animasyonunu başlat
    profileTrigger.addEventListener("click", () => {
        if (isOpened) return;
        isOpened = true;

        profileTrigger.classList.add("opened");
        linksContainer.classList.remove("hidden");
        footer.classList.remove("hidden");
    });
});