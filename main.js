console.log('Script loaded');

URL = 'https://gist.githubusercontent.com/benna100/13f5850bf78f59d9baea915cbbe9f258/raw/ef8f2b137b07b05e8f593cef0281b4f1f0aba79a/JS-3%2520questions'

const creatQuiz = function(){
    return {
        fetchQuiz: function(URL){
           return fetch(URL)
               .then((res) => res.json())
        },
        
        RenderQuestions: function(questionS) {
            const UL = document.querySelector('ul.questions');
            
            questionS.forEach((question) => {
                const liMaker = document.createElement('li');
                UL.appendChild(liMaker);
                
                const h2Maker = document.createElement('h2');
                h2Maker.innerText = question.title;
                liMaker.appendChild(h2Maker);

                const pMaker = document.createElement('p');
                pMaker.innerText = question.content;
                liMaker.appendChild(pMaker);
              
                const selectMaker = document.createElement('select');
                liMaker.appendChild(selectMaker);
                
                question.options.forEach((optionArr) => {
                    const optionMaker = document.createElement('option');
                    optionMaker.innerText = optionArr.content;
                    optionMaker.value = optionArr.correct;
                    selectMaker.appendChild(optionMaker);
                })  
            })
        },
        
        showScore: function(event){
            event.preventDefault();
            console.log("hi");
            
            let score = 0;
            
            const selector = [...document.querySelectorAll('select')]
            
            selector.forEach((select) => {
                console.log(select);
                const i = select.selectedIndex;
                const answer = select.options[i].value;
                
                if(answer === 'true'){
                    score++
                }
            });
            
            const total = selector.length
            document.querySelector('.result').innerHTML = score + '/' + total;
            
            if(score === total){
                const confetti = new ConfettiGenerator({ target: 'confetti' });
                confetti.render();
            }
            
        }

    }
}

const hyfQuiz = creatQuiz();
hyfQuiz.fetchQuiz(URL)
    .then(res => {
         console.log(res)
         return res;
    })
    .then((questionS) => {
        hyfQuiz.RenderQuestions(questionS)
});

document.querySelector('button').addEventListener('click', hyfQuiz.showScore);
