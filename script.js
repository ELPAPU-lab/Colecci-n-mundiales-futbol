// NAVEGACIÓN

const buttons = document.querySelectorAll(".menu-btn");
const pages = document.querySelectorAll(".page");

buttons.forEach(btn => {

    btn.addEventListener("click", () => {

        const target = btn.dataset.section;

        pages.forEach(page => {
            page.classList.remove("active");
        });

        document
            .getElementById(target)
            .classList.add("active");

    });

});

// CHECKBOXES

const packets = document.querySelectorAll(".packet");

packets.forEach((packet, index) => {

    const saved = localStorage.getItem("packet_" + index);

    if(saved === "true"){
        packet.checked = true;
    }

    packet.addEventListener("change", () => {

        localStorage.setItem(
            "packet_" + index,
            packet.checked
        );

        updateStats();

    });

});

// ESTADÍSTICAS

function updateStats(){

    const total = packets.length;

    let owned = 0;

    packets.forEach(packet => {

        if(packet.checked){
            owned++;
        }

    });

    const percent =
        total > 0
        ? Math.round((owned / total) * 100)
        : 0;

    // Inicio

    const globalCount =
        document.getElementById("globalCount");

    if(globalCount){
        globalCount.textContent =
            owned + " / " + total;
    }

    const globalPercent =
        document.getElementById("globalPercent");

    if(globalPercent){
        globalPercent.textContent =
            percent + "%";
    }

    const progressBar =
        document.getElementById("progressBar");

    if(progressBar){
        progressBar.style.width =
            percent + "%";
    }

    // Estadísticas

    const statsTotal =
        document.getElementById("statsTotal");

    if(statsTotal){
        statsTotal.textContent =
            owned + " / " + total;
    }

    const statsPercent =
        document.getElementById("statsPercent");

    if(statsPercent){
        statsPercent.textContent =
            percent + "%";
    }

    // Logros

    checkAchievements(percent);

}

// LOGROS

function checkAchievements(percent){

    if(percent === 100){

        setTimeout(() => {

            alert(
                "🏆 ¡Colección completada al 100%!"
            );

        }, 300);

    }

}

// BUSCADOR AUTOMÁTICO (si luego agregas uno)

function searchPackets(text){

    const cards =
        document.querySelectorAll(".packet-card");

    cards.forEach(card => {

        const name =
            card.innerText.toLowerCase();

        if(
            name.includes(
                text.toLowerCase()
            )
        ){

            card.style.display = "block";

        }else{

            card.style.display = "none";

        }

    });

}

// INICIO

updateStats();

console.log(
    "Colección Mundialista cargada correctamente."
);
