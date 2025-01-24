const EXPENSES_LIMIT = 10_000;

const expenses = []; // массив расходов

const expensesInputNode = document.querySelector('.input-cost-js');
const inputErrorTextNode = document.querySelector('.input-error-text-js');
const addExpensesBtnNode = document.querySelector('.add-costs-btn-js');
const expensesHistoryNode = document.querySelector('.costs-history__items-js');
const expensesLimitNode = document.querySelector('.costs-limit-js');
const allExpensesCounterNode = document.querySelector('.costs-all__counter-js');
const expensesStatusNode = document.querySelector('.cost-status-js');

expensesLimitNode.innerHTML = EXPENSES_LIMIT; // задаем лимит

addExpensesBtnNode.addEventListener('click', function() {
    // 2.Получаем значение из поля ввода
    if (!expensesInputNode.value) {
        inputErrorTextNode.classList.remove('hidden-text'); // убираем класс и появляется текст
        console.log('Вы не ввели число!');
        return
    } else {
        inputErrorTextNode.classList.add('hidden-text'); // если user ввел число, то текст скрыт
    };

    // 3.Конвертируем строку в число и сохраняем в массив
    saveValueFromInputInArray();
    clearInput();

    // 4.Выводим новый список трат
    outputNewListExpenses();

    // 5. Выводить сумму расходов
    checkExpensesLimit();
});

function saveValueFromInputInArray() {
    const expense = parseInt(expensesInputNode.value); //parseInt - конвертирует строку в число
    expenses.push(expense);
    console.log(expenses);
};

function clearInput() {
    expensesInputNode.value = ''; // после ввода числа мы сбрасываем прошлоее значение в поле ввода
}

function outputNewListExpenses() {
    let expensesListHTML = '';

    expenses.forEach(element => {
        expensesListHTML += `<li class="costs-history__item">${element} руб.</li>`;
    });

    expensesHistoryNode.innerHTML = `
        <ol class="costs-history__item">${expensesListHTML}</ol>
    `;
}

function checkExpensesLimit() {
    let sumExpenses = 0;

    expenses.forEach(element => {
        sumExpenses += element;
    });

    allExpensesCounterNode.innerHTML = `${sumExpenses} руб.`;
    if (EXPENSES_LIMIT >= sumExpenses) { // Проверяем превышен ли лимит или нет
        console.log("Вы в лимите");
    } else {
        expensesStatusNode.innerHTML = `<span class="cost-status-bed">Лимит превышен</span>`;
        console.log("Лимит превышен");
    }
};