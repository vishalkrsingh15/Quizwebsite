var questions = [
    {
        q: "What is Java?",
        options: ["Operating System", "Programming Language", "Database", "Web Browser"],
        answer: 1
    },
    {
        q: "Which keyword is used to define a class in Java?",
        options: ["function", "class", "define", "method"],
        answer: 1
    },
    {
        q: "Which method is the entry point of a Java program?",
        options: ["start()", "run()", "main()", "init()"],
        answer: 2
    },
    {
        q: "Which concept allows same method name with different parameters?",
        options: ["Inheritance", "Encapsulation", "Method Overloading", "Abstraction"],
        answer: 2
    },
    {
        q: "Which keyword is used to create an object in Java?",
        options: ["class", "object", "new", "create"],
        answer: 2
    }
];

var index = 0;
var score = 0;
var selected = -1;
var wrongList = [];

function startQuiz() {
    document.getElementById("startBox").style.display = "none";
    document.getElementById("quizBox").style.display = "block";
    showQuestion();
}

function showQuestion() {
    selected = -1;
    document.getElementById("question").innerText = questions[index].q;

    var optDiv = document.getElementById("options");
    optDiv.innerHTML = "";

    for (let i = 0; i < 4; i++) {
        var div = document.createElement("div");
        div.className = "option";
        div.innerText = questions[index].options[i];
        div.onclick = function () {
            selectOption(i);
        };
        optDiv.appendChild(div);
    }
}

function selectOption(i) {
    selected = i;
    var opts = document.getElementsByClassName("option");
    for (let j = 0; j < opts.length; j++) {
        opts[j].classList.remove("selected");
    }
    opts[i].classList.add("selected");
}

function nextQuestion() {
    if (selected == -1) {
        alert("Please select an option");
        return;
    }

    if (selected == questions[index].answer) {
        score++;
    } else {
        wrongList.push({
            question: questions[index].q,
            correct: questions[index].options[questions[index].answer],
            selected: questions[index].options[selected]
        });
    }

    index++;

    if (index < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quizBox").style.display = "none";
    document.getElementById("resultBox").style.display = "block";

    var total = questions.length;
    var percent = Math.round((score / total) * 100);
    var degree = percent * 3.6;

    document.querySelector(".circle").style.background =
        "conic-gradient(#2e7d32 0deg " + degree + "deg, #b71c1c " + degree + "deg 360deg)";

    document.getElementById("percentage").innerText =
        score + "/" + total + " (" + percent + "%)";

    document.getElementById("resultText").innerText =
        "Correct: " + score + " | Wrong: " + (total - score);

    document.getElementById("reaction").innerText =
        percent >= 60 ? "😊" : "😞";

    var wrongDiv = document.getElementById("wrongAnswers");
    wrongDiv.innerHTML = "";

    if (wrongList.length > 0) {
        wrongDiv.innerHTML = "<h3>Wrong Answers</h3>";
        wrongList.forEach(function (item) {
            wrongDiv.innerHTML += `
                <div class="wrong-box">
                    <p><b>Q:</b> ${item.question}</p>
                    <p class="wrong">Your Answer: ${item.selected}</p>
                    <p class="correct">Correct Answer: ${item.correct}</p>
                </div>
            `;
        });
    }
}
