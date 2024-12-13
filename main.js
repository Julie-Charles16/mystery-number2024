document.addEventListener('DOMContentLoaded', function() {
    let mysteryNumber;
    let maxAttempts;
    let attempts = 0;
    let maxNumber;

    const userInput = document.getElementById('userInput');
    const btnTest = document.getElementById('btnTest');
    const firstTry = document.getElementById('firstTry');
    const secondTry = document.getElementById('secondTry');
    const thirdTry = document.getElementById('thirdTry');
    const replayBtn = document.getElementById('replay');
    const levelSelect = document.getElementById('levelSelect');

    function setDifficulty() {
        const level = levelSelect.value;
        if (level === 'facile') {
            mysteryNumber = Math.floor(Math.random() * 10) + 1;
            maxNumber = 10;
            maxAttempts = 3;
            displayResult('Vous avez 3 essais pour trouver un nombre entre 1 et 10.', firstTry);
        } else if (level === 'moyen') {
            mysteryNumber = Math.floor(Math.random() * 50) + 1;
            maxNumber = 50;
            maxAttempts = 2;
            displayResult('Vous avez 2 essais pour trouver un nombre entre 1 et 50.', firstTry);
        } else if (level === 'difficile') {
            mysteryNumber = Math.floor(Math.random() * 100) + 1;
            maxNumber = 100;
            maxAttempts = 1;
            displayResult('Vous avez 1 essai pour trouver un nombre entre 1 et 100.', firstTry);
        }
        resetGame();
    }

    function displayResult(message, paragraph) {
        paragraph.innerHTML = message;
    }

    function testNumber() {
        const userGuess = parseInt(userInput.value);

        if (userGuess > maxNumber || userGuess < 1) {
            displayResult(`Veuillez entrer un nombre valide entre 1 et ${maxNumber}.`, firstTry);
            return;
        }

        if (userGuess === mysteryNumber) {
            displayResult(`<span style="font-size:2rem">Bravo!🥳 Vous avez trouvé le nombre mystère <span style="color:red">${mysteryNumber}</span> en ${attempts + 1} essai(s).</span>`, thirdTry);
            btnTest.disabled = true;
            userInput.disabled = true;

            // Lancer l'animation de confettis
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });

            // Afficher le bouton "Rejouer" et lancer l'animation de clignotement
            replayBtn.classList.add('blink');
            replayBtn.style.display = 'inline-block'; // Affiche le bouton

        } else {
            attempts++;
            let hint = userGuess < mysteryNumber ? 'plus grand' : 'plus petit';

            if (attempts < maxAttempts) {
                displayResult(`<span style="font-size:2rem">${userGuess} ? 🤔...C'est ${hint}. Il vous reste ${maxAttempts - attempts} essai(s).</span>`, firstTry);
            }

            if (attempts >= maxAttempts) {
                displayResult(`<span style="font-size:2rem">Perdu!😟 Vous avez utilisé tous vos essais. Le bon nombre était <span style="color:red">${mysteryNumber}</span>.</span>`, thirdTry);
                btnTest.disabled = true;
                userInput.disabled = true;

                // Faire clignoter le bouton "Rejouer"
                replayBtn.classList.add('blink');
                replayBtn.style.display = 'inline-block'; // Affiche le bouton

                // Lancer la pluie de pouces vers le bas
                rainThumbsDown();
            }
        }
    }

    // Fonction pour faire apparaître la pluie de pouces vers le bas
    function rainThumbsDown() {
        const numberOfThumbs = 30; // Nombre de pouces qui vont tomber
        for (let i = 0; i < numberOfThumbs; i++) {
            const thumb = document.createElement('div');
            thumb.classList.add('thumb-down');
            thumb.textContent = '👎'; // Emoji pouce vers le bas

            // Positionner aléatoirement les pouces sur l'écran (en largeur)
            thumb.style.left = Math.random() * 100 + 'vw';
            thumb.style.animationDuration = Math.random() * 2 + 2 + 's'; // Temps de chute aléatoire

            // Ajouter les pouces à l'élément body pour qu'ils tombent
            document.body.appendChild(thumb);

            // Retirer les pouces après qu'ils sont tombés (après 4 secondes ici)
            setTimeout(() => {
                thumb.remove();
            }, 4000);
        }
    }

    function resetGame() {
        attempts = 0;
        displayResult('', firstTry);
        displayResult('', secondTry);
        displayResult('', thirdTry);
        btnTest.disabled = false;
        userInput.disabled = false;
        userInput.value = '';

        // Cacher le bouton "Rejouer" au démarrage du jeu
        replayBtn.style.display = 'none'; 
        replayBtn.classList.remove('blink'); // Enlever l'animation de clignotement
    }

    btnTest.addEventListener('click', testNumber);
    replayBtn.addEventListener('click', setDifficulty);
    levelSelect.addEventListener('change', setDifficulty);

    setDifficulty();
});


