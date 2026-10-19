const knapp = document.querySelector("#visa-mer");
const mer = document.querySelector("#mer");

if (knapp && mer) {
    mer.classList.add("gomd");

    function visaMer() {
        mer.classList.toggle("gomd");
        if (mer.classList.contains("gomd")) {
            knapp.textContent = "Visa mer";
            knapp.setAttribute("aria-expanded", "false");
        } else {
            knapp.textContent = "Visa mindre";
            knapp.setAttribute("aria-expanded", "true");
        }
    }

    knapp.addEventListener("click", visaMer);
}

// Kopiera mailadressen med ett klick
const kopiera = document.querySelector("#kopiera");

if (kopiera) {
    function kopieraMail() {
        navigator.clipboard.writeText("theaemanuelsson@icloud.com");
        kopiera.textContent = "Kopierat!";
        setTimeout(() => {
            kopiera.textContent = "Kopiera mejl";
        }, 2500);
    }

    kopiera.addEventListener("click", kopieraMail);
}

// Bädda in kontaktformuläret från HubSpot på sidan.
const hubspotForm = document.querySelector("#hubspot-form");

if (hubspotForm && window.hbspt?.forms) {
    window.hbspt.forms.create({
        region: "eu1",
        portalId: "149565936",
        formId: "59181a08-2ffb-4f09-9f5f-41db74480aa5",
        target: "#hubspot-form"
    });
}


