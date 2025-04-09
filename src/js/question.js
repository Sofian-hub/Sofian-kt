window.onload = () => {
    afficherQuestion(0); // Charge les questions
    const bruteforceBtn = document.getElementById("bruteforce-btn");
    
    if (bruteforceBtn) {
        bruteforceBtn.addEventListener("click", bruteforce);
    } else {
        console.error("Le bouton bruteforce-btn n'existe pas !");
    }
};

const originalConsoleError = console.error;
console.error = function (message) {
    if (!message.includes("ERR_ABORTED") && !message.includes("404")) {
        originalConsoleError.apply(console, arguments);
    }
};

const questionnaire = [
    {
        qlabel: "Combien de trophé(s) à Neymar avec l'équipe du Brésil ?",
        qid: 1,
        reponses: [
            { rlabel: "4", rid: 1 },
            { rlabel: "2", rid: 2 },
            { rlabel: "1", rid: 3 },
            { rlabel: "3", rid: 4 }
        ]
    },
    {
        qlabel: "Quel est le montant de son transfert au PSG ?",
        qid: 2,
        reponses: [
            { rlabel: "222 Millions", rid: 1 },
            { rlabel: "17 €", rid: 2 },
            { rlabel: "100 Millions", rid: 3 },
            { rlabel: "Gratuit", rid: 4 }
        ]
    },
    {
        qlabel: "Quel est son premier club ?",
        qid: 3,
        reponses: [
            { rlabel: "Barcelone", rid: 1 },
            { rlabel: "Paris Saint-Germain", rid: 2 },
            { rlabel: "Al-Hilal", rid: 3 },
            { rlabel: "Santos", rid: 4 }
        ]
    },
    {
        qlabel: "Quelle est l'origine de Neymar JR ?",
        qid: 4,
        reponses: [
            { rlabel: "Anglais", rid: 1 },
            { rlabel: "Brésilien", rid: 2 },
            { rlabel: "Portugais", rid: 3 },
            { rlabel: "Espagnol", rid: 4 }
        ]
    }
];

const bonnesReponses = "A1_3-A2_1-A3_4-A4_2";
let reponses = "";
let questionIndex = 0;

function afficherQuestion(index) {
    const question = questionnaire[index];
    document.getElementById("question").innerHTML = question.qlabel;
    document.getElementById("reponses").innerHTML = "";


    question.reponses.forEach((reponse) => {
        const btn = document.createElement("button");
        btn.textContent = reponse.rlabel;
        btn.className = "btn btn-primary";
        btn.onclick = () => handleReponseClick(question.qid, reponse.rid);
        document.getElementById("reponses").appendChild(btn);
    });
}

function handleReponseClick(qid, rid) {
    reponses += (reponses ? "-" : "") + `A${qid}_${rid}`;
    questionIndex++;

    if (questionIndex < questionnaire.length) {
        afficherQuestion(questionIndex);
    } else {
        verifierReponses();
    }
}

function verifierReponses() {
    const resultEl = document.getElementById("result");
    const questionEl = document.getElementById("question");
    const reponsesEl = document.getElementById("reponses");
    const bruteforceBtn = document.getElementById("bruteforce-btn");

    if (reponses === bonnesReponses) {
        // Redirection vers une autre page s'il répond bien
        window.location.href = "contact.html";
    } else {
        resultEl.innerHTML = `<p class="text-red-600 font-bold text-center">Tu n'as pas les bonnes réponses pour me contacter.</p>`;
        questionEl.innerHTML = "";
        reponsesEl.innerHTML = "";
        bruteforceBtn.classList.add("hidden");

        const retryButton = document.createElement("button");
        retryButton.textContent = "Recommencer";
        retryButton.className = "cursor-pointer rounded-md mt-6 bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-red-700";
        retryButton.onclick = recommencer;
        resultEl.appendChild(retryButton);
    }
}


function recommencer() {
    document.getElementById("bruteforce-btn").classList.remove("hidden");
    reponses = "";
    questionIndex = 0;
    afficherQuestion(0);
}

// Fermer le modal
function fermerModal() {
    document.getElementById("modal-contact").classList.add("hidden");
}

// Gérer l'envoi du formulaire
function envoyerMessage(event) {
    event.preventDefault();
    const nom = document.getElementById("nom").value;
    const message = document.getElementById("message").value;

    if (nom && message) {
        alert(`Merci ${nom}, ton message a bien été envoyé !`);
        fermerModal();
    }
}

function bruteforce() {
    const maxValues = [4, 4, 4, 4];
    const resultDiv = document.getElementById("result");
    const divquest = document.getElementById("divquest");
    const spinner = document.getElementById("spinner");
    const questionDiv = document.getElementById("question");
    const reponsesDiv = document.getElementById("reponses");
    const bruteforceBtn = document.getElementById("bruteforce-btn");
    const countdownDiv = document.getElementById("countdown");

    if (reponsesDiv) reponsesDiv.innerHTML = "";
    if (bruteforceBtn) bruteforceBtn.classList.add("hidden");

    if (questionDiv) {
        questionDiv.textContent = "Bruteforce en cours";
    }

    spinner.classList.remove("hidden");
    divquest.classList.add("items-center");
    

    let countdown = 5; 
    let total = 0;
    let found = false;

    const delay = 50;

    const loop = () => {
        for (let i1 = 1; i1 <= maxValues[0]; i1++) {
            for (let i2 = 1; i2 <= maxValues[1]; i2++) {
                for (let i3 = 1; i3 <= maxValues[2]; i3++) {
                    for (let i4 = 1; i4 <= maxValues[3]; i4++) {
                        if (found) return;

                        const fileName = `A1_${i1}-A2_${i2}-A3_${i3}-A4_${i4}.html`;

                        setTimeout(() => {
                            total++;

                            if (verifierFichierExiste(fileName)) {
                                found = true;
                                resultDiv.innerHTML = `
                                    ✅ Trouvé !<br>
                                    ${fileName}<br>
                                    🔍 ${total} tests effectués
                                `;
                                spinner.classList.add("hidden");
                                questionDiv.textContent = "Bruteforce réussi !";
                                countdownDiv.textContent = `Redirection dans ${countdown}s...`;
                                
                                const countdownInterval = setInterval(() => {
                                    countdown--;
                                    countdownDiv.textContent = `Redirection dans ${countdown}s...`;

                                    if (countdown <= 0) {
                                        clearInterval(countdownInterval);
                                        window.location.href = "contact.html";
                                    }
                                }, 1000);
                            } else {
                                resultDiv.innerHTML = `
                                    ❌ Test n°${total}: ${fileName} - Non trouvé
                                `;
                            }

                            if (total === maxValues[0] * maxValues[1] * maxValues[2] * maxValues[3] && !found) {
                                spinner.classList.add("hidden");
                                questionDiv.textContent = "redirection en cours ⌛";
                                setTimeout(() => {
                                    window.location.href = "contact.html";
                                }, 2000);
                            }
                        }, total * delay);
                    }
                }
            }
        }
    };

    loop();
}




function verifierFichierExiste(fileName) {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", fileName, false);
    try {
        xhr.send();
        return xhr.status === 200;
    } catch (err) {
        return false;
    }
}
