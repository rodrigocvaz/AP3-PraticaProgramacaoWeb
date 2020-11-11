const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");

start_btn.onclick = ()=>{
    info_box.classList.add("activeInfo");
}

exit_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = ()=>{
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuetions(0); 
}

let que_count = 0;
let userScore = 0;
let que_numb = 1;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

restart_quiz.onclick = ()=>{
    quiz_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count);
    next_btn.classList.remove("show"); 
}

quit_quiz.onclick = ()=>{
    window.location.reload(); 
}

const next_btn = document.querySelector("footer .next_btn");

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){ 
        que_count++;
        que_numb++; 
        showQuetions(que_count);
        next_btn.classList.remove("show"); 
    }else{
        showResult(); 
    }
}

function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    let que_tag = '<span>'+ questions[index].numb + ". " + questions[index].question +'</span>';
    let option_tag = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
    + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    const option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer){ 
    let userAns = answer.textContent; 
    let correcAns = questions[que_count].answer; 
    const allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1; 
        answer.classList.add("correct"); 
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    }else{
        answer.classList.add("incorrect"); 
        answer.insertAdjacentHTML("beforeend", crossIconTag); 
        console.log("Wrong Answer");

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){  
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
                console.log("Auto selected correct answer.");
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled");
    }
    next_btn.classList.add("show"); 
}

function showResult(){
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 7){ 
        let scoreTag = '<span>Parabéns! Você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 4){
        let scoreTag = '<span>Pode melhorar! você acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 0){
        let scoreTag = '<span>Poxa! Você só acertou <p>'+ userScore +'</p> de <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
	else {
        let scoreTag = '<span>Poxa! Você não acertou nenhuma pergunta.</span>';
        scoreText.innerHTML = scoreTag;
	}
}

let questions = [
    {
    numb: 1,
    question: "Como o COVID-19 é transmitido?",
    answer: "Através de gotículas que saem de sua boca e nariz quando você tosse ou espirra",
    options: [
      "Através de gotículas que saem de sua boca e nariz quando você tosse ou espirra",
      "Bebendo água suja",
      "Falando pelo telefone",
      "Transmissão pela internet"
    ]
  },
    {
    numb: 2,
    question: "Um sintoma comum do COVID-19?",
    answer: "Febre",
    options: [
      "Febre",
      "Unha encravada",
      "Espinhela caída",
      "Bico de papagaio"
    ]
  },
    {
    numb: 3,
    question: "Lavar as mãos pode protegê-lo do COVID-19?",
    answer: "Sim. Se lavar com água e sabonete ou álcool em gel.",
    options: [
      "Sim. Somente se lavar com água sanitária.",
      "Sim. Se lavar com água e sabonete ou álcool em gel.",
      "Sim. Lavar as mãos águal e sal.",
	  "Não. Lavar as mãos não protege do COVID-19."
    ]
  },
    {
    numb: 4,
    question: "Quais das seguinte pessoas o COVID-19 é mais perigoso?",
    answer: "Idosos, principalmente acima de 70 anos.",
    options: [
      "Crianças",
      "Pessoas européias",
      "Idosos, principalmente acima de 70 anos.",
      "Estudantes"
    ]
  },
    {
    numb: 5,
    question: "Como são chamados os vírus que infectam bactérias?",
    answer: "Bacteriófagos",
    options: [
      "Metanógenos",
      "Patógenos",
      "Fungos",
      "Bacteriófagos"
    ]
  },
    {
    numb: 6,
    question: "Qual é a temperatura normal do corpo humano?",
    answer: "36 - 37°C",
    options: [
	  "35 - 36°C",
      "36 - 37°C",
      "34 - 35°C",
      "30 - 31°C"
    ]
  },
    {
    numb: 7,
    question: "Qual cidade foi identificado o primeiro caso de novo coronavírus?",
    answer: "Wuhan",
    options: [
      "Beijing",
      "Wuhan",
      "Shangai",
      "Tianjin"
    ]
  },
    {
    numb: 8,
    question: "Qual a origem do nome coronavirus?",
    answer: "Devido a sua forma de coroa",
    options: [
      "A pessoa que descobriu o vírus se chama Corona",
      "Devido a sua forma de folha",
      "Devido a sua forma de coroa",
      "Devido a sua forma de triângulo"
    ]
  },
    {
    numb: 9,
    question: "Qual é o período de incubação do COVID-19?",
    answer: "1 a 14 dias",
    options: [
      "1 a 14 dias",
      "5 a 25 dias",
      "10 a 15 dias",
      "40 a 50 dias"
    ]
  },
    {
    numb: 10,
    question: "Quanto tempo o vírus pode sobreviver em superfícies de plástico e aço inoxidável?",
    answer: "72 horas ou mais",
    options: [
      "1 a 2 horas",
      "4 a 12 horas",
      "24 a 60 horas",
      "72 horas ou mais"
    ]
  },
]