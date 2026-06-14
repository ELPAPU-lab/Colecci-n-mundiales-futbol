// NAVEGACIÓN
const buttons = document.querySelectorAll(".menu-btn");
const pages = document.querySelectorAll(".page");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.dataset.section;

        pages.forEach(page => page.classList.remove("active"));

        const el = document.getElementById(target);
        if (el) el.classList.add("active");
    });
});

// CHECKBOXES + LOCALSTORAGE
const packets = document.querySelectorAll(".packet");

packets.forEach((packet, index) => {
    const saved = localStorage.getItem("packet_" + index);

    if (saved === "true") packet.checked = true;

    packet.addEventListener("change", () => {
        localStorage.setItem("packet_" + index, packet.checked);
        updateStats();
        calculateWorldCupProgress();
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
    const missing = total - owned;

    const globalCount = document.getElementById("globalCount");
    const globalPercent = document.getElementById("globalPercent");
    const missingCount = document.getElementById("missingCount");
    const progressBar = document.getElementById("progressBar");

    if (globalCount) globalCount.textContent = `${owned} / ${total}`;
    if (globalPercent) globalPercent.textContent = percent + "%";
    if (missingCount) missingCount.textContent = missing;
    if (progressBar) progressBar.style.width = percent + "%";

    const statsTotal = document.getElementById("statsTotal");
    const statsPercent = document.getElementById("statsPercent");

    if (statsTotal) statsTotal.textContent = `${owned} / ${total}`;
    if (statsPercent) statsPercent.textContent = percent + "%";

    if (percent === 100) {
        setTimeout(() => alert("🏆 ¡Colección completada al 100%!"), 300);
    }
}

// PROGRESO POR MUNDIAL
function calculateWorldCupProgress() {
    document.querySelectorAll(".page").forEach(section => {
        const localPackets = section.querySelectorAll(".packet");
        if (!localPackets.length) return;

        let owned = 0;

        localPackets.forEach(p => {
            if (p.checked) owned++;
        });

        let progress = section.querySelector(".worldcup-progress");

        if (!progress) {
            progress = document.createElement("p");
            progress.className = "worldcup-progress";

            const title = section.querySelector("h1");
            if (title) title.insertAdjacentElement("afterend", progress);
        }

        progress.textContent = `${owned}/${localPackets.length} sobres`;
    });
}

// INICIO
function refreshAll() {
    updateStats();
    calculateWorldCupProgress();
}

refreshAll();
