const temperatureInput = document.getElementById("temperature");
const humiditeInput = document.getElementById("humidite");
const evaluerButton = document.getElementById("evaluer");

function temperatureFroide(t) {
    if (t <= 10) return 1;
    if (t >= 20) return 0;
    return (20 - t) / 10;
}

function temperatureModeree(t) {
    if (t <= 15 || t >= 30) return 0;
    if (t <= 22.5) return (t - 15) / 7.5;
    return (30 - t) / 7.5;
}

function temperatureChaude(t) {
    if (t <= 25) return 0;
    if (t >= 35) return 1;
    return (t - 25) / 10;
}

function humiditeFaible(h) {
    if (h <= 20) return 1;
    if (h >= 40) return 0;
    return (40 - h) / 20;
}

function humiditeMoyenne(h) {
    if (h <= 30 || h >= 70) return 0;
    if (h <= 50) return (h - 30) / 20;
    return (70 - h) / 20;
}

function humiditeElevee(h) {
    if (h <= 60) return 0;
    if (h >= 80) return 1;
    return (h - 60) / 20;
}

evaluerButton.addEventListener("click", function () {

    const temperature = Number(temperatureInput.value);
    const humidite = Number(humiditeInput.value);

    if (
        temperatureInput.value === "" ||
        humiditeInput.value === "" ||
        temperature < 0 ||
        temperature > 40 ||
        humidite < 0 ||
        humidite > 100
    ) {
        alert("Veuillez entrer une température entre 0 et 40°C et une humidité entre 0 et 100%.");
        return;
    }

    // =========================
    // 1. FUZZIFICATION
    // =========================

    const froide = temperatureFroide(temperature);
    const moderee = temperatureModeree(temperature);
    const chaude = temperatureChaude(temperature);

    const faible = humiditeFaible(humidite);
    const moyenne = humiditeMoyenne(humidite);
    const elevee = humiditeElevee(humidite);

    // =========================
    // 2. REGLES FLOUES
    // =========================

   
const regle1 = Math.min(froide, faible);
const regle2 = Math.min(froide, moyenne);
const regle3 = Math.min(froide, elevee);

const regle4 = Math.min(moderee, faible);
const regle5 = Math.min(moderee, moyenne);
const regle6 = Math.min(moderee, elevee);

const regle7 = Math.min(chaude, faible);
const regle8 = Math.min(chaude, moyenne);
const regle9 = Math.min(chaude, elevee);

// Agrégation des règles
const mauvais = Math.max(
    regle1, regle2, regle3,
    regle7, regle8, regle9
);

const moyen = Math.max(regle4, regle6);

const bon = regle5;
    // =========================
    // 4. DEFUZZIFICATION
    // =========================

    const total = mauvais + moyen + bon;

    let score = 0;

    if (total > 0) {
        score =
            (mauvais * 20 +
             moyen * 50 +
             bon * 80) / total;
    }

    // =========================
    // 5. SCORE
    // =========================

    document.getElementById("score").textContent =
        score.toFixed(0);

    document.getElementById("progress-bar").style.width =
        score + "%";

    // =========================
    // 6. INTERPRETATION
    // =========================

    const interpretation =
        document.getElementById("interpretation");

    if (score <= 40) {
        interpretation.textContent = "Confort faible";
    } 
    else if (score <= 70) {
        interpretation.textContent = "Confort moyen";
    } 
    else {
        interpretation.textContent = "Confort élevé";
    }

    // =========================
    // 7. DEGRES TEMPERATURE
    // =========================

    document.getElementById("froide-result").textContent =
        froide.toFixed(2);

    document.getElementById("moderee-result").textContent =
        moderee.toFixed(2);

    document.getElementById("chaude-result").textContent =
        chaude.toFixed(2);

    // =========================
    // 8. DEGRES HUMIDITE
    // =========================

    document.getElementById("faible-result").textContent =
        faible.toFixed(2);

    document.getElementById("moyenne-result").textContent =
        moyenne.toFixed(2);

    document.getElementById("elevee-result").textContent =
        elevee.toFixed(2);

    // =========================
    // 9. BARRES
    // =========================

    document.getElementById("froide-bar").style.width =
        (froide * 100) + "%";

    document.getElementById("moderee-bar").style.width =
        (moderee * 100) + "%";

    document.getElementById("chaude-bar").style.width =
        (chaude * 100) + "%";

    document.getElementById("faible-bar").style.width =
        (faible * 100) + "%";

    document.getElementById("moyenne-bar").style.width =
        (moyenne * 100) + "%";

    document.getElementById("elevee-bar").style.width =
        (elevee * 100) + "%";

    // =========================
    // 10. CONFORT THERMIQUE
    // =========================

    document.getElementById("mauvais-result").innerText =
        mauvais.toFixed(2);

    document.getElementById("moyen-result").innerText =
        moyen.toFixed(2);

    document.getElementById("bon-result").innerText =
        bon.toFixed(2);

    // =========================
    // 11. RECOMMANDATION
    // =========================

    const recommendation =
        document.getElementById("recommendation-text");

    if (score <= 40) {

        recommendation.textContent =
            "Le niveau de confort est faible. La température et l'humidité peuvent être ajustées afin d'améliorer les conditions de confort.";

    } 
    else if (score <= 70) {

        recommendation.textContent =
            "Le niveau de confort est moyen. La température et l'humidité sont dans une zone acceptable, mais peuvent être optimisées pour un meilleur confort.";

    } 
    else {

        recommendation.textContent =
            "Le niveau de confort est élevé. La température et l'humidité sont favorables à de bonnes conditions de confort.";

    }

});
