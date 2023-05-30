window.addEventListener('DOMContentLoaded', (event) => {
    const splash = document.getElementById('splash');
    const form = document.getElementById('questionForm');
    const questions = document.getElementsByClassName('question');
    const resultsButton = document.getElementById('resultsButton');
    const result = document.getElementById('result');
    const resultText = document.getElementById('resultText');
    const restartButton = document.getElementById('restartButton');
    const steps = document.getElementsByClassName('step');

    let answers = [];

    setTimeout(() => {
        splash.classList.add('hidden');
        form.classList.remove('hidden');
        form.classList.add('flex');
        steps[0].classList.remove('hidden');
        document.getElementById('step' + 1).classList.add('active');

    }, 4000);

    window.nextQuestion = function (num) {
        // Validate the current question
        let currentQuestion = document.getElementById(`question${num - 1}`);
        let selectedValue = Array.from(currentQuestion.getElementsByTagName('input')).find(input => input.checked)?.value;

        if (selectedValue) {
            // Save answer and go to next question
            answers[num - 2] = selectedValue; // Update the answer at the corresponding index
            currentQuestion.classList.add('hidden');

            if (num <= questions.length) {
                // Move to the next question
                document.getElementById(`question${num}`).classList.remove('hidden');
                document.getElementById('step' + (num - 1)).classList.remove('active');
                document.getElementById('step' + num).classList.add('active');
            } else {
                // All questions answered, show the "See Results" button
                resultsButton.classList.remove('hidden');
            }
        } else {
            alert("Please select an answer before proceeding.");
        }
            // Update step indicator
 

    }

    window.previousQuestion = function (num) {
        // Go back to previous question
        document.getElementById(`question${num}`).classList.add('hidden');
        document.getElementById(`question${num - 1}`).classList.remove('hidden');
        document.getElementById('step' + num).classList.remove('active');
        document.getElementById('step' + (num - 1)).classList.add('active');
    
    }

    window.showResults = function () {
        // All questions answered, show result
        form.classList.add('hidden');
        form.classList.remove('flex');
        result.classList.remove('hidden');
        resultsButton.classList.add('hidden');
        restartButton.classList.remove('hidden');
        resultText.classList.remove('hidden');
        resultText.classList.add('flex');
        
        let yesCount = answers.filter(answer => answer === 'yes').length;

        if (yesCount >= 4) {
            resultText.innerText = 'Es posible que posea migraña.';
        } else {
            resultText.innerText = 'No posee migraña.';
        }
    }

    window.restart = function() {
        // Reset answers array
        answers = [];
        result.classList.add('hidden');
        result.classList.remove('flex');
        resultsButton.classList.add('hidden');
        restartButton.classList.add('hidden')
        resultText.classList.add('hidden');
        resultText.classList.remove('flex');
        form.classList.add('flex');
        form.classList.remove('hidden');
    
        // Reset radio buttons
        let radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(function(radio) {
            radio.checked = false;
        });
    
        // Hide result and show first question
        document.getElementById('question1').classList.remove('hidden');
    }
    




});


