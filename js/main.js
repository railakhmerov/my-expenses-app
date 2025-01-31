const BODY_FIXED = document.querySelector('.popup-body');

const CURRENCY = "руб." // валюта
const STATUS_IN_LIMIT = "Вы в лимите";
const STATUS_OUT_OF_LIMIT = "Лимит превышен";
let EXPENSES_LIMIT = 1000;
let SUM_EXPENSES = 0;
let MINUS_EXPENSES = 0;
let currentCategory = '';

const expensesInputNode = document.querySelector('.input-cost-js');
const inputErrorTextNode = document.querySelector('.input-error-text-js');
const inputCategoriesNode = document.querySelector('.input-categories-js');
const inputCategoryErrorTextNode = document.querySelector('.input-error-category-text-js');
const popupInputErrorTextNode = document.querySelector('.popup__input-error-text-js');
const addExpensesBtnNode = document.querySelector('.add-costs-btn-js');
const expensesHistoryNode = document.querySelector('.costs-history__items-js');
const expensesLimitNode = document.querySelector('.costs-limit-js');
const allExpensesCounterNode = document.querySelector('.costs-all__counter-js');
const expensesStatusNode = document.querySelector('.cost-status-js');
const clearExpensesBtnNode = document.querySelector('.clear-expenses-btn-js');
const limitPopupNode = document.querySelector('.popup-btn-js');
const displayPopupNode = document.querySelector('.popup-js');
const popupCloseBtn = document.querySelector('.close-btn');
const popupExpensesInputNode = document.querySelector('.input-in-popup-js');
const popupAddLimitNode = document.querySelector('.add-limit__popup-btn');

const expenses = []; // массив расходов

initialValue(); // изначальные значения на сайте

// ОБРАБОТЧИКИ СОБЫТИЙ -------------------------------------------------------

addExpensesBtnNode.addEventListener('click', function() {
    // 1.Получаем значение из поля ввода
    const currentAmount = getExpenseFromUser(); // записываем в переменную полученное значение expense из функции

    // 2.Проверяем полученное значение из input
    if (!currentAmount) {
        return;
    };

    // Проверка на выбор категории
    currentCategory = inputCategoriesNode.value;
    if (currentCategory === "Категории") {
        inputCategoryErrorTextNode.classList.remove('hidden-text');
        console.log("Вы не выбрали категорию");
        return;
    } else {
        inputCategoryErrorTextNode.classList.add('hidden-text');
    };

    const newExpenses = { amount: currentAmount, category: currentCategory };

    // 3.Сохраняем полученное значение
    saveValueFromInputInArray(newExpenses);

    // 4. Чистим input после ввода
    clearInput();

    // 5.Выводим новый список трат
    // currentCategory = inputCategoriesNode.value;
    // if (currentCategory === "Категории") {
    //     inputCategoryErrorTextNode.classList.remove('hidden-text');
    //     console.log("Вы не выбрали категорию");
    //     return;
    // } else {
    //     inputCategoryErrorTextNode.classList.add('hidden-text');
    //     console.log(currentCategory);
    // };

    outputNewListExpenses();

    // 6. Выводить сумму расходов
    calculateSumExpenses();

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
    openPopup();
});

popupCloseBtn.addEventListener('click', function() {
    closePopup();
});

popupAddLimitNode.addEventListener('click', function() {
    const limit = getExpenseLimitFromUser();

    if (!limit) {
        return;
    };

    EXPENSES_LIMIT = popupExpensesInputNode.value;
    expensesLimitNode.innerHTML = `${EXPENSES_LIMIT} ${CURRENCY}`;
    popupExpensesInputNode.value = '';
    checkExpensesLimit();
    closePopup();
});

// -------------------------------------------

// ФУНКЦИИ ---------------------------------------
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
        return;
    } else {
        inputErrorTextNode.classList.add('hidden-text'); // если user ввел число, то текст скрыт
    };

    const expense = parseInt(expensesInputNode.value); //parseInt - конвертирует строку в число

    return expense;
};
function getExpenseLimitFromUser() {
    if (!popupExpensesInputNode.value || popupExpensesInputNode.value[0] == 0) {
        popupInputErrorTextNode.classList.remove('hidden-text'); // убираем класс и появляется текст
        return;
    } else {
        popupInputErrorTextNode.classList.add('hidden-text'); // если user ввел число, то текст скрыт
    };

    const expense = parseInt(popupExpensesInputNode.value); //parseInt - конвертирует строку в число

    return expense;
};

function saveValueFromInputInArray(newExpenses) {
    expenses.push(newExpenses);
    console.log(expenses);
};

function clearInput() {
    expensesInputNode.value = ''; // после ввода числа мы сбрасываем прошлоее значение в поле ввода
}

function outputNewListExpenses() {
    let expensesListHTML = '';

    expenses.forEach(expense => {
        console.log(expense)
        expensesListHTML += `<li class="costs-history__item">${expense.amount} ${CURRENCY} - ${expense.category}</li>`;
    });
    
    expensesHistoryNode.innerHTML = `
        <ol class="costs-history__item">${expensesListHTML}</ol>
    `;
};

function calculateSumExpenses() {
    let sumExpenses = 0;

    expenses.forEach(expense => {
        sumExpenses += expense.amount;
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
    } else {
        expensesStatusNode.innerHTML = `<span class="cost-status-bed">${STATUS_OUT_OF_LIMIT} (${calcResult} ${CURRENCY})</span>`;
    };
};

// ---------------------------------------