const buttons = document.querySelectorAll(".menu-btn");
const pages = document.querySelectorAll(".page");
const packets = document.querySelectorAll(".packet");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        pages.forEach(p => p.classList.remove("active"));
        document.getElementById(btn.dataset.section).classList.add("active");
    });
});

// ESTADÍSTICAS
function updateStats() {
    const total = packets.length;
    let owned = 0;

    packets.forEach(p => {
        if (p.checked) owned++;
    });

    const percent = total ? Math.round((owned / total) * 100) : 0;

    document.getElementById("globalCount").textContent = owned;
    document.getElementById("globalPercent").textContent = percent + "%";
    document.getElementById("missingCount").textContent = total - owned;

    document.getElementById("statsTotal").textContent = owned;
    document.getElementById("statsPercent").textContent = percent + "%";

    document.getElementById("progressBar").style.width = percent + "%";
}

// CHECKBOX SAVE
packets.forEach((p, i) => {
    const saved = localStorage.getItem("packet_" + i);
    if (saved === "true") p.checked = true;

    p.addEventListener("change", () => {
        localStorage.setItem("packet_" + i, p.checked);
        updateStats();
    });
});

// NAV INIT FIX
window.addEventListener("DOMContentLoaded", () => {
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById("inicio").classList.add("active");
    updateStats();
});
