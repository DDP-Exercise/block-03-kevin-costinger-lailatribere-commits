"use strict";
/*******************************************************
 *     kevincostinger.js - 100p.
 *
 *     This is Kevin. Kevin keeps track of your expenses
 *     and costs. To add an expense, pick a date, declare
 *     the amount and add a short description.
 *
 *     When you submit the form, all fields are validated.
 *     If Kevin is not happy with your inputs, the least
 *     he will do is, bring you back to the field where
 *     you made a mistake. But who knows? Maybe he can
 *     even provide some excellent User experience?
 *     (+5 Bonus points available)
 *
 *     These are the rules for the form validation:
 *      - Date is valid, if it's not empty.
 *      - Amount is valid, if it's at least 0.01.
 *      - Text is valid, if it's at least 3 letters long.
 *
 *     If everything is okay, Kevin adds a new table row,
 *     containing the expense. The table row also contains
 *     a button, which deletes the expense, once you click
 *     it. After adding a table row, the form is reset and
 *     ready for the next input.
 *
 *     At the bottom of the expense tracker, you can see
 *     a small number. It represents the sum of all expenses,
 *     which are currently tracked. It is always accurate!
 *
 *     Have a look at the pictures provided. They demonstrate
 *     how the software looks like. Notice the details, like
 *     the perfectly formatted currency! Isn't that great?
 *
 *     By the way...
 *     Kevin is a clean guy. He is free of code duplications.
 *     Kevin defines his quality by using functions and
 *     events, to keep his sourcecode clean af. He understands
 *     the scope of his variables and of course, makes use of
 *     event delegation, to keep his event listeners tidied up!
 *
 *     Laila  - 2026-03-25
 *******************************************************/
let sumExpenses = 0; //Use this variable to keep the sum up to date.
//input output prim nodes
const expenseForm = document.querySelector("form");
const expenseTableBody = document.querySelector("#expenses tbody");
const totalSumDisplay = document.querySelector("#expenseSum");
//allows reactions to browser
expenseForm.addEventListener("submit", submitForm);
expenseTableBody.addEventListener("click", deleteExpense);

function submitForm(e) {
    //TODO: Prevent the default behavior of the submit button.
    e.preventDefault(); // page stays still , preventing default
    // selecting html elements using const, --> wont change
    const userDateInput = document.querySelector("#date");
    const amountInput = document.querySelector("#amount");
    const expenseInput = document.querySelector("#expense");

    //TODO: Validate the form. If everything is fine, add the expense to the tracker and reset the form.

    // Date is valid, if it's not empty.
    // Amount is valid, if it's at least 0.01.
    // Text is valid, if it's at least 3 letters long.

    if (isEmpty(userDateInput.value)){
        userDateInput.focus(); // focus() will send back to empty or wrong input box/field e.g. if i write "eg" or "21" etc , when pressing submit it will send back to that input box where i have a mistake
        return; // ends when empty
    }

    if (expenseInput.value.length <3){
        expenseInput.focus();
        return;
    }
    const amountValue = parseFloat(amountInput.value); // to use if (isNaN...) parseFloat converts string to nr
    if (isNaN(amountValue) || amountValue < 0.01){
        amountInput.focus();
        return;
    }
    // manipulates values and updates sum
    sumExpenses += amountValue;
    // new element and append
    const newRow = document.createElement("tr");
    newRow.innerHTML =
        "<td>" + userDateInput.value + "</td>" +
        "<td>" + formatEuro(amountValue) + "</td>" +
        "<td>" + expenseInput.value + "</td>" +
        "<td> <button class = 'delete-btn' data-amount='"+ amountValue + "'>Delete</button> </td>";

    expenseTableBody.append(newRow);
    totalSumDisplay.innerHTML = formatEuro(sumExpenses);
    e.target.reset(); // resets after succ. output
}
// functional delete btn
function deleteExpense(e) {
    if(e.target.classList.contains("delete-btn")){ // checks in element for delete btn
        const amount = parseFloat(e.target.getAttribute("data-amount"));
        sumExpenses -= amount;// removes amount
        totalSumDisplay.innerHTML = formatEuro(sumExpenses); // updates all amount of expenses
        e.target.closest("tr").remove(); // e.target is a btn , clicking it will delete tr row that is closest
    }
}

/*****************************
 * DO NOT CHANGE CODE BELOW.
 * USE IT.
 ****************************/


/*******************************************************
 *     Checks if variable is empty
 *     @param {any} variable - Variable which you want to check.
 *     @return {Boolean} Empty or not.
 ******************************************************/
let isEmpty = function(variable) {
    if(Array.isArray(variable))
        return (variable.length === 0);
    else if(typeof variable === "object")
        return (Object.entries(variable).length === 0);
    else
        return (typeof variable === "undefined" || variable == null || variable === "");
};

/*******************************************************
 *     Converts number into currency string.
 *     @param {Number} number - Any numeric value.
 *     @return {String} Well formatted currency string.
 ******************************************************/
function formatEuro(number) {
    return number.toLocaleString('de-DE', { style: 'currency', currency: 'EUR' });
}