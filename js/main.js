'use strict'

{
    const question = document.getElementById('question'); 
    const choices = document.getElementById('choices'); 
    const btn = document.getElementById('btn'); 
    const result = document.getElementById('result'); 
    const scoreLabel = document.querySelector('#result > p');

    const quizSet = shuffle([
        {q: 'What is A?', c: ['A0', 'A1', 'A2']},
        {q: 'What is B?', c: ['B0', 'B1', 'B2']},
        {q: 'What is C?', c: ['C0', 'C1', 'C2']},
    ]);
    let currentNum = 0;
    let isAnswerd;
    let score = 0;

    function shuffle(arr){
        for (let i = arr.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    function checkAnswer(li) {
        if(isAnswerd) {
            return;
        }
        isAnswerd = true;

        if (li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('wrong');
        }

        btn.classList.remove('disabled');
    }

    function setQuiz() {
        isAnswerd = false;

        question.textContent = quizSet[currentNum].q;

        while(choices.firstChild){
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);
        shuffledChoices.forEach(choice =>{
            const li = document.createElement('li');
            li.textContent = choice;
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });

        if(currentNum === quizSet.length - 1){
            btn.textContent = 'Show Score';
        }
    }

    setQuiz();

    btn.addEventListener('click', () => {
        if(btn.classList.contains('disabled')){
            return;
        }
        btn.classList.add('disabled');

        if(currentNum === quizSet.length - 1) {
            scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuiz();
        }
    });
}