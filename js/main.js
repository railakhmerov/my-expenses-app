const BODY_FIXED = document.querySelector('.popup-body');

const CURRENCY = "руб." // валюта
const STATUS_IN_LIMIT = "Вы в лимите";
const STATUS_OUT_OF_LIMIT = "Лимит превышен";
let EXPENSES_LIMIT = 0;
let SUM_EXPENSES = 0;
let MINUS_EXPENSES = 0;

const expensesInputNode = document.querySelector('.input-cost-js');
const inputErrorTextNode = document.querySelector('.input-error-text-js');
const addExpensesBtnNode = document.querySelector('.add-costs-btn-js');
const expensesHistoryNode = document.querySelector('.costs-history__items-js');
const expensesLimitNode = document.querySelector('.costs-limit-js');
const allExpensesCounterNode = document.querySelector('.costs-all__counter-js');
const expensesStatusNode = document.querySelector('.cost-status-js');
const clearExpensesBtnNode = document.querySelector('.clear-expenses-btn-js');
const limitPopupNode = document.querySelector('.popup-btn-js');
const displayPopupNode = document.querySelector('.popup-js');
const popupCloseBtn = document.querySelector('.close-btn');
const popupInputNode = document.querySelector('.input-popup');
const popupAddLimitNode = document.querySelector('.add-limit__popup-btn');

const expenses = []; // массив расходов


initialValue(); // изначальные значения на сайте

addExpensesBtnNode.addEventListener('click', function() {
    // 1.Получаем значение из поля ввода
    const expense = getExpenseFromUser(); // записываем в переменную полученное значение expense из функции

    // 2.Проверяем полученное значение из input
    if (!expense) {
        return;
    }

    // 3.Сохраняем полученное значение в массив
    saveValueFromInputInArray(expense);

    // 4. Чистим input после ввода
    clearInput();

    // 5.Выводим новый список трат
    outputNewListExpenses();

    // 6. Выводить сумму расходов
    calculateSumExpenses()

    // 7. Проверяет на превышение лимита
    checkExpensesLimit();
});

clearExpensesBtnNode.addEventListener('click', function() { // Кнопка сброса расходов
    allExpensesCounterNode.innerHTML = `0 ${CURRENCY}`; // Очищаем сумму
    expenses.length = 0; // длина массива = 0
    outputNewListExpenses(); // возвращает пустую историю
    checkExpensesLimit(); // сравниваем лимит после сброса
})

limitPopupNode.addEventListener('click', function() { // popup
    openPopup()
});

popupCloseBtn.addEventListener('click', function() {
    closePopup();
});

popupAddLimitNode.addEventListener('click', function() {
    EXPENSES_LIMIT = popupInputNode.value;
    expensesLimitNode.innerHTML = `${EXPENSES_LIMIT} ${CURRENCY}`;
    popupInputNode.value = '';
    checkExpensesLimit();
    closePopup();
});

function openPopup() {
    BODY_FIXED.classList.add('body_fixed'); // чтобы нельзя было нажимать вне popup
    displayPopupNode.setAttribute("style", "display: flex;"); // чтобы появился popup
}
function closePopup() {
    BODY_FIXED.classList.remove('body_fixed');
    displayPopupNode.removeAttribute("style", "display: flex");
}
function initialValue() {
    expensesLimitNode.innerHTML = `${EXPENSES_LIMIT} ${CURRENCY}`; // задаем лимит
    allExpensesCounterNode.innerHTML = `${SUM_EXPENSES} ${CURRENCY}`;
    expensesStatusNode.innerHTML = `${STATUS_IN_LIMIT}`;
};

function getExpenseFromUser() {
    if (!expensesInputNode.value || expensesInputNode.value[0] == 0) {
        inputErrorTextNode.classList.remove('hidden-text'); // убираем класс и появляется текст
        console.log("Вы не ввели число!");
        return;
    } else {
        inputErrorTextNode.classList.add('hidden-text'); // если user ввел число, то текст скрыт
    };

    const expense = parseInt(expensesInputNode.value); //parseInt - конвертирует строку в число

    return expense;
};

function saveValueFromInputInArray(expense) {
    expenses.push(expense);
    console.log(expenses);
};

function clearInput() {
    expensesInputNode.value = ''; // после ввода числа мы сбрасываем прошлоее значение в поле ввода
};

function outputNewListExpenses() {
    let expensesListHTML = '';

    expenses.forEach(element => {
        expensesListHTML += `<li class="costs-history__item">${element} ${CURRENCY}</li>`;
    });

    expensesHistoryNode.innerHTML = `
        <ol class="costs-history__item">${expensesListHTML}</ol>
    `;
};

function calculateSumExpenses() {
    let sumExpenses = 0;

    expenses.forEach(element => {
        sumExpenses += element;
    });

    return sumExpenses;
};

function calculateMinusLimit() {
    const result = EXPENSES_LIMIT - SUM_EXPENSES;

    return result;
}

function checkExpensesLimit() { // Проверяем превышен ли лимит или нет
    let SUM_EXPENSES = calculateSumExpenses();
    let calcResult = EXPENSES_LIMIT - SUM_EXPENSES;

    allExpensesCounterNode.innerHTML = `${SUM_EXPENSES} ${CURRENCY}`;
    if (EXPENSES_LIMIT >= SUM_EXPENSES) {
        expensesStatusNode.innerHTML = `<span class="cost-status-good">${STATUS_IN_LIMIT}</span>`;
        console.log(STATUS_IN_LIMIT);
    } else {
        expensesStatusNode.innerHTML = `<span class="cost-status-bed">${STATUS_OUT_OF_LIMIT} (${calcResult} ${CURRENCY})</span>`;
        console.log(STATUS_OUT_OF_LIMIT);
    };
};