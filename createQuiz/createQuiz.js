'use strict'
const addQuest = document.querySelector('.add-quest');
const form = document.querySelector('.createQuiz');

const endQuest = document.querySelector('.end-quest');


let value = 2;
addQuest.addEventListener('click', event => {
    event.preventDefault();

    const quest = document.createElement('div');
    quest.className = 'quest';
    quest.id = value;

    quest.innerHTML = `
        <input type="text" name="quest" placeholder="Введите вопрос">
        <input type="text" name="answer" placeholder="Введите ответ">
        <input type="text" name="answer" placeholder="Введите ответ">
        <input type="text" name="answer" placeholder="Введите ответ">
        <input type="text" name="answer" placeholder="Введите ответ">
        <input type="number" name="number" placeholder="Введите сколько правильных ответов">
    `;

    form.append(quest);

    window.location.href = `#${value}`;

    value++
});
const wrapper = [
];
const list = [];

const renderObj = () => {
    const id = String(Math.floor(Math.random() * 100000));
    const theme = document.querySelector('input[name=title]').value;
    const result = [
        [10, "есть зададтки, нужно развивать"],
        [60, "очень хорошо, но есть пробелы"],
        [90, "отличный результат"]
    ];
    const object = {
        id,
        theme,
        result,
        list
    };
    wrapper.push(object);
    const obj = JSON.stringify(wrapper);
    localStorage.setItem('obj', obj);

    
    window.location.href = '/';
    
};

const renderAdd = (children) => {
    const question = children[0].value;

    const typeValue = children[5].value;

    let type;

    if (typeValue == 1){
        type = 'radio';
    } else {
        type = 'checkbox';
    }
    
    const answers = [
        children[1].value,
        children[2].value,
        children[3].value,
        children[4].value,

    ];
    if (typeValue > 1){
        var obj = {
            type,
            question,
            answers,
            correct: typeValue,
        };
    } else {
        var obj = {
            type,
            question,
            answers,
        };
    }
    list.push(obj);
};

endQuest.addEventListener('click', (event) => {
    event.preventDefault();

    const questions = document.querySelectorAll('.quest');
    const length = questions.length;
    for(let i = 0; i < length; i++){
        renderAdd(questions[i].children);
    }

    const data = JSON.parse(localStorage.getItem('obj'));
    if (data) {
        if (data.length >= 1){
            for (let i = 0; i < data.length; i++){
                wrapper.push(data[i]);
            }
        }
    }
    renderObj();
});