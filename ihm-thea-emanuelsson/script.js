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

// Skicka kontaktformuläret till HubSpot.
const kontaktForm = document.querySelector("#kontakt-formular");
const formStatus = document.querySelector("#form-status");
const skickaKnapp = document.querySelector("#skicka-meddelande");

if (kontaktForm && formStatus && skickaKnapp) {
    kontaktForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const namn = kontaktForm.elements.namn.value.trim();
        const epost = kontaktForm.elements.email.value.trim();
        const meddelande = kontaktForm.elements.message.value.trim();
        const namnDelar = namn.split(/\s+/);
        const fornamn = namnDelar.shift() || namn;
        const efternamn = namnDelar.join(" ");

        const fields = [
            { name: "firstname", value: fornamn },
            { name: "email", value: epost },
            { name: "message", value: meddelande }
        ];

        if (efternamn) {
            fields.push({ name: "lastname", value: efternamn });
        }

        skickaKnapp.disabled = true;
        formStatus.textContent = "Skickar ditt meddelande…";
        formStatus.className = "form-status synlig";

        try {
            const response = await fetch(
                "https://api-eu1.hsforms.com/submissions/v3/integration/submit/149565936/59181a08-2ffb-4f09-9f5f-41db74480aa5",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fields,
                        context: {
                            pageUri: window.location.href,
                            pageName: document.title
                        }
                    })
                }
            );

            if (!response.ok) {
                throw new Error("HubSpot kunde inte ta emot formuläret.");
            }

            formStatus.textContent = `Tack ${namn}! Ditt meddelande har skickats.`;
            formStatus.className = "form-status synlig framgang";
            kontaktForm.reset();
        } catch (error) {
            formStatus.textContent = "Det gick inte att skicka meddelandet just nu. Försök igen eller mejla mig direkt.";
            formStatus.className = "form-status synlig fel";
        } finally {
            skickaKnapp.disabled = false;
        }
    });
}

