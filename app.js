document.addEventListener("DOMContentLoaded", () => {
    fetch('links.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('profile-name').textContent = data.profile.name;
            document.getElementById('profile-bio').textContent = data.profile.bio;
            if (data.profile.avatar) {
                document.getElementById('profile-avatar').src = data.profile.avatar;
            }

            const container = document.getElementById('links-container');
            container.innerHTML = '';

            data.links.forEach((item, index) => {
                const a = document.createElement('a');
                a.href = item.url;
                a.className = 'link-card';
                a.target = '_blank';
                
                // Sıralı animasyon gecikmesi
                a.style.animationDelay = `${(index + 1) * 0.07}s`;
                
                if (item.bgColor) {
                    a.style.backgroundColor = item.bgColor;
                }
                
                a.innerHTML = `
                    <i class="${item.icon}"></i>
                    <span>${item.title}</span>
                `;
                container.appendChild(a);
            });
        })
        .catch(error => console.error('Veri yüklenirken hata oluştu:', error));
});