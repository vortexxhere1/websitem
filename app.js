document.addEventListener("DOMContentLoaded", () => {
    fetch("links.json")
        .then(response => response.json())
        .then(data => {
            // Profil Bilgilerini Yerleştirme
            document.getElementById("profile-name").textContent = data.profile.name;
            document.getElementById("profile-bio").textContent = data.profile.bio;

            const linksContainer = document.getElementById("links-container");
            linksContainer.innerHTML = "";

            // Linkleri Döngü ile Oluşturma
            data.links.forEach(link => {
                const a = document.createElement("a");
                a.href = link.url;
                a.className = "link-button";
                a.target = "_blank";
                a.style.backgroundColor = link.bgColor;

                a.innerHTML = `
                    <span><i class="${link.icon}"></i> ${link.title}</span>
                    <i class="fas fa-chevron-right"></i>
                `;

                linksContainer.appendChild(a);
            });
        })
        .catch(error => console.error("Veriler yüklenirken hata oluştu:", error));
});