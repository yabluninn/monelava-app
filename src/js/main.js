let user = {
  categories: {
    income: [
      {
        categoryName: "Salary",
        color: "rgb(137, 255, 73)",
        icon: "fa-money-bill-1-wave",
      },
      {
        categoryName: "Scholarship",
        color: "rgb(161, 215, 131)",
        icon: "fa-graduation-cap",
      },
    ],
    expense: [
      {
        categoryName: "Groceries",
        color: "rgb(60, 211, 60)",
        icon: "fa-cart-shopping",
      },
      {
        categoryName: "Health",
        color: "red",
        icon: "fa-heart",
      },
      {
        categoryName: "Restaurants",
        color: "orange",
        icon: "fa-utensils",
      },
      {
        categoryName: "Transport",
        color: "rgb(0, 132, 255)",
        icon: "fa-bus",
      },
      {
        categoryName: "Taxi",
        color: "rgb(122, 95, 31)",
        icon: "fa-taxi",
      },
    ],
  },
  monthes: [],
};

let month = {
  monthNumber: 0,
  income: 0,
  expense: 0,
  transactions: [],
};

let transaction = {
  amount: 0,
  type: "Income",
  date: "",
  method: "Cash",
  details: "",
  category: {},
};

let category = {
  categoryName: "",
  color: "",
  icon: "",
};

let currentAddingPage = "";

// Header UI
const headerMainPageBtn = document.querySelector(".header-main-page-btn");
const headerTransactionsPageBtn = document.querySelector(
  ".header-transactions-page-btn"
);
const headerAddingPageBtn = document.querySelector(".header-adding-page-btn");
const headerCategoriesPageBtn = document.querySelector(
  ".header-categories-page-btn"
);
const headerChartPageBtn = document.querySelector(".header-chart-page-btn");

// Pages
const addingPage = document.querySelector(".adding-modal-window");
const transactionsPage = document.querySelector(".transactions-page");

// Adding page
const addingCategoryTitle = document.querySelector(".adding-category-title");
const addingIncomeBtn = document.querySelector(".adding-income-btn");
const addingExpenseBtn = document.querySelector(".adding-expense-btn");

const addingBudgetTypeBtn = document.querySelector(".add-budget-type-btn");
const addingCancelBtn = document.querySelector(".cancel-adding-btn");
const addingCashMethodBtn = document.querySelector(".adding-cash-method-btn");
const addingCardMethodBtn = document.querySelector(".adding-card-method-btn");

const addingAmountInput = document.querySelector(".adding-amount-input");
const addingDateInput = document.querySelector(".adding-date-input");
const addingDetailsInput = document.querySelector(".adding-details-input");

start();

function start() {
  // document.body.addEventListener("touchmove", function (e) {
  //   e.preventDefault();
  // });
  headerAddingPageBtn.addEventListener("click", function () {
    openPage("Adding");
  });
  headerTransactionsPageBtn.addEventListener("click", function () {
    openPage("Transactions");
  });
  loadData();
}

function loadData() {
  if (localStorage.getItem("user")) {
    let requiredUser = localStorage.getItem("user");
    let parsedRequiredUser = JSON.parse(requiredUser);
  } else {
    let newUser = Object.assign({}, user);
    for (let i = 0; i < 12; i++) {
      let newMonth = {
        monthNumber: i,
        income: 0,
        expense: 0,
        transactions: [],
      };
      newUser.monthes.push(newMonth);
    }
    localStorage.setItem("user", JSON.stringify(newUser));
  }
}

function openPage(page) {
  addingPage.id = "";
  transactionsPage.id = "";
  headerTransactionsPageBtn.id = "";
  headerAddingPageBtn.id = "";
  switch (page) {
    case "Adding":
      showAddingTransactionPage();
      headerAddingPageBtn.id = "header-current-btn";
      break;
    case "Transactions":
      showTransactionsPage();
      headerTransactionsPageBtn.id = "header-current-btn";
      break;
  }
}

function showAddingTransactionPage() {
  let requiredUser = localStorage.getItem("user");
  let parsedRequiredUser = JSON.parse(requiredUser);

  addingPage.id = "current-page";
  currentAddingPage = "Expense";
  addingIncomeBtn.id = "";
  addingExpenseBtn.id = "current-adding-types-btn";
  // addingBudgetTypeBtn.classList.add("add-expense-btn");

  let amount = "";
  let date = "";
  let details = "";
  let method = "";
  let category = "";

  // Set and change categories
  function chooseCategory(_category) {
    category = _category;
    addingCategoryTitle.textContent = `Category - ${_category.categoryName}`;
    resetCategoryItemsBackground();
  }

  const addingCategoriesList = document.querySelector(
    ".adding-categories-container"
  );
  if (currentAddingPage == "Income") {
    addingCategoriesList.innerHTML = "";
    for (let i = 0; i < parsedRequiredUser.categories.income.length; i++) {
      let addingCategoryItem = document.createElement("div");
      addingCategoryItem.className = "adding-category-item";
      let addingCategoryBtn = document.createElement("button");
      addingCategoryBtn.className = "adding-category-btn";
      addingCategoryBtn.style.backgroundColor =
        parsedRequiredUser.categories.income[i].color;
      let addingCategoryIcon = document.createElement("i");
      addingCategoryIcon.classList.add("fa-solid");
      addingCategoryIcon.classList.add(
        parsedRequiredUser.categories.income[i].icon
      );
      addingCategoryBtn.appendChild(addingCategoryIcon);
      addingCategoryItem.appendChild(addingCategoryBtn);
      let addingCategoryName = document.createElement("p");
      addingCategoryName.className = "adding-category-name";
      addingCategoryName.textContent =
        parsedRequiredUser.categories.income[i].categoryName;
      addingCategoryItem.appendChild(addingCategoryName);
      addingCategoryItem.addEventListener(
        "click",
        function () {
          if (category == "") {
            chooseCategory(parsedRequiredUser.categories.income[i]);
            const categoryColor =
              window.getComputedStyle(addingCategoryBtn).backgroundColor;
            addingCategoryItem.style.backgroundColor = categoryColor;
            addingCategoryItem.style.color = "white";
          }
        },
        false
      );
      addingCategoriesList.appendChild(addingCategoryItem);
    }
  }
  if (currentAddingPage == "Expense") {
    addingCategoriesList.innerHTML = "";
    for (let i = 0; i < parsedRequiredUser.categories.expense.length; i++) {
      let addingCategoryItem = document.createElement("div");
      addingCategoryItem.className = "adding-category-item";
      let addingCategoryBtn = document.createElement("button");
      addingCategoryBtn.className = "adding-category-btn";
      addingCategoryBtn.style.backgroundColor =
        parsedRequiredUser.categories.expense[i].color;
      let addingCategoryIcon = document.createElement("i");
      addingCategoryIcon.classList.add("fa-solid");
      addingCategoryIcon.classList.add(
        parsedRequiredUser.categories.expense[i].icon
      );
      addingCategoryBtn.appendChild(addingCategoryIcon);
      addingCategoryItem.appendChild(addingCategoryBtn);
      let addingCategoryName = document.createElement("p");
      addingCategoryName.className = "adding-category-name";
      addingCategoryName.textContent =
        parsedRequiredUser.categories.expense[i].categoryName;
      addingCategoryItem.appendChild(addingCategoryName);
      addingCategoryItem.addEventListener(
        "click",
        function () {
          if (category == "") {
            chooseCategory(parsedRequiredUser.categories.expense[i]);
            const categoryColor =
              window.getComputedStyle(addingCategoryBtn).backgroundColor;
            addingCategoryItem.style.backgroundColor = categoryColor;
            addingCategoryItem.style.color = "white";
          }
        },
        false
      );
      addingCategoriesList.appendChild(addingCategoryItem);
    }
  }

  const categoryItems = document.querySelectorAll(" .adding-category-item");
  function resetCategoryItemsBackground() {
    categoryItems.forEach((item) => {
      item.style.backgroundColor = "transparent";
      item.style.color = "black";
    });
  }

  // Choose transaction method buttons
  addingCashMethodBtn.addEventListener(
    "click",
    function () {
      addingCashMethodBtn.id = "current-adding-method";
      addingCardMethodBtn.id = "";
      method = "Cash";
    },
    false
  );
  addingCardMethodBtn.addEventListener(
    "click",
    function () {
      addingCardMethodBtn.id = "current-adding-method";
      addingCashMethodBtn.id = "";
      method = "Card";
    },
    false
  );

  // Choose transaction type buttons
  function chooseAddingTransactionType(type) {
    currentAddingPage = type;
    addingCategoriesList.innerHTML = "";
    addingAmountInput.value = "";
    addingDateInput.value = "";
    addingDetailsInput.value = "";
    amount = "";
    date = "";
    category = "";
    addingCategoryTitle.textContent = "Category";
    if (type == "Income") {
      for (let i = 0; i < parsedRequiredUser.categories.income.length; i++) {
        let addingCategoryItem = document.createElement("div");
        addingCategoryItem.className = "adding-category-item";
        let addingCategoryBtn = document.createElement("button");
        addingCategoryBtn.className = "adding-category-btn";
        addingCategoryBtn.style.backgroundColor =
          parsedRequiredUser.categories.income[i].color;
        let addingCategoryIcon = document.createElement("i");
        addingCategoryIcon.classList.add("fa-solid");
        addingCategoryIcon.classList.add(
          parsedRequiredUser.categories.income[i].icon
        );
        addingCategoryBtn.appendChild(addingCategoryIcon);
        addingCategoryItem.appendChild(addingCategoryBtn);
        let addingCategoryName = document.createElement("p");
        addingCategoryName.className = "adding-category-name";
        addingCategoryName.textContent =
          parsedRequiredUser.categories.income[i].categoryName;
        addingCategoryItem.appendChild(addingCategoryName);
        addingCategoryItem.addEventListener(
          "click",
          function () {
            if (category == "") {
              chooseCategory(parsedRequiredUser.categories.income[i]);
              const categoryColor =
                window.getComputedStyle(addingCategoryBtn).backgroundColor;
              addingCategoryItem.style.backgroundColor = categoryColor;
              addingCategoryItem.style.color = "white";
            }
          },
          false
        );
        addingCategoriesList.appendChild(addingCategoryItem);
      }
      addingIncomeBtn.id = "current-adding-types-btn";
      addingExpenseBtn.id = "";
    } else if (type == "Expense") {
      for (let i = 0; i < parsedRequiredUser.categories.expense.length; i++) {
        let addingCategoryItem = document.createElement("div");
        addingCategoryItem.className = "adding-category-item";
        let addingCategoryBtn = document.createElement("button");
        addingCategoryBtn.className = "adding-category-btn";
        addingCategoryBtn.style.backgroundColor =
          parsedRequiredUser.categories.expense[i].color;
        let addingCategoryIcon = document.createElement("i");
        addingCategoryIcon.classList.add("fa-solid");
        addingCategoryIcon.classList.add(
          parsedRequiredUser.categories.expense[i].icon
        );
        addingCategoryBtn.appendChild(addingCategoryIcon);
        addingCategoryItem.appendChild(addingCategoryBtn);
        let addingCategoryName = document.createElement("p");
        addingCategoryName.className = "adding-category-name";
        addingCategoryName.textContent =
          parsedRequiredUser.categories.expense[i].categoryName;
        addingCategoryItem.appendChild(addingCategoryName);
        addingCategoryItem.addEventListener(
          "click",
          function () {
            if (category == "") {
              chooseCategory(parsedRequiredUser.categories.expense[i]);
              const categoryColor =
                window.getComputedStyle(addingCategoryBtn).backgroundColor;
              addingCategoryItem.style.backgroundColor = categoryColor;
              addingCategoryItem.style.color = "white";
            }
          },
          false
        );
        addingCategoriesList.appendChild(addingCategoryItem);
      }
      addingIncomeBtn.id = "";
      addingExpenseBtn.id = "current-adding-types-btn";
    }
  }
  addingIncomeBtn.addEventListener(
    "click",
    function () {
      chooseAddingTransactionType("Income");
    },
    false
  );
  addingExpenseBtn.addEventListener(
    "click",
    function () {
      chooseAddingTransactionType("Expense");
    },
    false
  );

  // Cancel and close adding window button
  addingCancelBtn.addEventListener("click", function () {
    addingPage.id = "hidden";
    addingCashMethodBtn.removeEventListener("click", arguments.callee, false);
    addingCardMethodBtn.removeEventListener("click", arguments.callee, false);
    addingIncomeBtn.removeEventListener("click", arguments.callee, false);
    addingExpenseBtn.removeEventListener("click", arguments.callee, false);
    const categoryItems = document.querySelectorAll(".adding-category-item");
    categoryItems.forEach((item) => {
      item.removeEventListener("click", arguments.callee, false);
    });
    addingAmountInput.value = "";
    addingDateInput.value = "";
    addingDetailsInput.value = "";
    amount = "";
    date = "";
    categoryName = "";
    addingCategoryTitle.textContent = "Category";
    addingBudgetTypeBtn.removeEventListener("click", addingTransaction, false);
    headerTransactionsPageBtn.id = "";
    headerAddingPageBtn.id = "";
  });

  // Adding transaction button
  function addingTransaction() {
    amount = addingAmountInput.value;
    date = addingDateInput.value;
    details = addingDetailsInput.value;
    if (currentAddingPage == "Expense") {
      if (
        (amount != "" || amount != "0") &&
        date != "" &&
        category != "" &&
        method != ""
      ) {
        addExpense(amount, date, category, details, method);
        // addingBudgetTypeBtn.removeEventListener(
        //   "click",
        //   addingTransaction,
        //   false
        // );
      }
    } else if (currentAddingPage == "Income") {
      if (
        (amount != "" || amount != "0") &&
        date != "" &&
        category != "" &&
        method != ""
      ) {
        addIncome(amount, date, category, details, method);
        // addingBudgetTypeBtn.removeEventListener(
        //   "click",
        //   addingTransaction,
        //   false
        // );
      }
    }
  }
  addingBudgetTypeBtn.addEventListener("click", addingTransaction, false);
}

function addExpense(amount, date, category, details, method) {
  let requiredUser = localStorage.getItem("user");
  let parsedRequiredUser = JSON.parse(requiredUser);
  let splittedDate = date.split("-");
  let month = splittedDate[1];
  month = month.replace(/^0/, "");
  console.log("MONTH: " + month);
  // let neededMonth = parsedRequiredUser.monthes.filter((obj) => {
  //   return obj.monthNumber === month;
  // });
  const neededMonth = parsedRequiredUser.monthes.find(
    (e) => e.monthNumber == parseInt(month - 1)
  );
  console.log(neededMonth);
  let newTransaction = Object.assign({}, transaction);
  newTransaction.amount = amount;
  newTransaction.type = "Expense";
  newTransaction.method = method;
  newTransaction.details = details;
  newTransaction.category = category;
  newTransaction.date = date;
  newTransaction.date.day = splittedDate[2];
  neededMonth.transactions.push(newTransaction);
  console.log(
    `[EXPENSE] Amount: ${amount}, date: ${date}, category: ${category}, details: ${details}, methond: ${method}`
  );
  neededMonth.expense += parseInt(amount);
  localStorage.setItem("user", JSON.stringify(parsedRequiredUser));
}
function addIncome(amount, date, category, details, method) {
  let requiredUser = localStorage.getItem("user");
  let parsedRequiredUser = JSON.parse(requiredUser);
  let splittedDate = date.split("-");
  let month = splittedDate[1];
  month = month.replace(/^0/, "");
  console.log("MONTH: " + month);
  // let neededMonth = parsedRequiredUser.monthes.filter((obj) => {
  //   return obj.monthNumber === month;
  // });
  const neededMonth = parsedRequiredUser.monthes.find(
    (e) => e.monthNumber == parseInt(month - 1)
  );
  console.log(neededMonth);
  let newTransaction = Object.assign({}, transaction);
  newTransaction.amount = amount;
  newTransaction.type = "Income";
  newTransaction.method = method;
  newTransaction.details = details;
  newTransaction.category = category;
  newTransaction.date = date;
  neededMonth.transactions.push(newTransaction);
  neededMonth.income += parseInt(amount);
  localStorage.setItem("user", JSON.stringify(parsedRequiredUser));
  console.log(
    `[INCOMR] Amount: ${amount}, date: ${date}, category: ${category}, details: ${details}, methond: ${method}`
  );
}

function showTransactionsPage() {
  let requiredUser = localStorage.getItem("user");
  let parsedRequiredUser = JSON.parse(requiredUser);

  let transactionsAllButton = document.querySelector(".tpt-all-btn");
  let transactionsIncomesButton = document.querySelector(".tpt-incomes-btn");
  let transactionsExpensesButton = document.querySelector(".tpt-expenses-btn");
  transactionsAllButton.id = "tpt-current-btn";
  transactionsIncomesButton.id = "";
  transactionsExpensesButton.id = "";

  let transactionsCurrentDateInput = document.querySelector(".tp-current-date");
  let _now = new Date();
  let _day = ("0" + _now.getDate()).slice(-2);
  let _month = ("0" + (_now.getMonth() + 1)).slice(-2);
  let _today = _now.getFullYear() + "-" + _month + "-" + _day;
  transactionsCurrentDateInput.value = _today;

  transactionsCurrentDateInput.onchange = function () {
    let splittedDate = transactionsCurrentDateInput.value.split("-");
    let _month = splittedDate[1];
    _month = _month.replace(/^0/, "");
    // let neededMonth = parsedRequiredUser.monthes.filter((obj) => {
    //   return obj.monthNumber === month;
    // });
    // let month = _now.getMonth();
    let neededMonth = parsedRequiredUser.monthes.find(
      (item) => item.monthNumber == parseInt(_month - 1)
    );
    const transactionsPageList = document.querySelector(
      ".transactions-page-container"
    );
    transactionsPageList.innerHTML = "";
    for (let i = 0; i < neededMonth.transactions.length; i++) {
      let transactionItem = document.createElement("div");
      transactionItem.className = "tp-item";
      let transactionMainBlock = document.createElement("div");
      transactionMainBlock.className = "tp-item-main-block";
      let transactionItemBlock1 = document.createElement("div");
      transactionItemBlock1.className = "tp-item-block1";
      let transactionCategoryBlock = document.createElement("div");
      transactionCategoryBlock.className = "tp-category-block";
      transactionCategoryBlock.style.backgroundColor =
        neededMonth.transactions[i].category.color;
      let transactionCategoryIcon = document.createElement("i");
      transactionCategoryIcon.classList.add("fa-solid");
      transactionCategoryIcon.classList.add(
        neededMonth.transactions[i].category.icon
      );
      transactionCategoryBlock.appendChild(transactionCategoryIcon);
      transactionItemBlock1.appendChild(transactionCategoryBlock);
      let transactionInfoBlock = document.createElement("div");
      transactionInfoBlock.className = "tp-info-block";
      let transactionCategoryName = document.createElement("p");
      transactionCategoryName.className = "tp-category-name";
      transactionCategoryName.textContent =
        neededMonth.transactions[i].category.categoryName;
      transactionInfoBlock.appendChild(transactionCategoryName);
      let transactionDetails = document.createElement("p");
      transactionDetails.className = "tp-details";
      transactionDetails.textContent = neededMonth.transactions[i].details;
      transactionInfoBlock.appendChild(transactionDetails);
      transactionItemBlock1.appendChild(transactionInfoBlock);
      transactionMainBlock.appendChild(transactionItemBlock1);
      let transactionItemBlock2 = document.createElement("div");
      transactionItemBlock2.className = "tp-item-block2";
      let transactionAmount = document.createElement("p");
      transactionAmount.className = "tp-amount";
      transactionAmount.textContent = neededMonth.transactions[i].amount + " ₴";
      transactionItemBlock2.appendChild(transactionAmount);
      transactionMainBlock.appendChild(transactionItemBlock2);
      transactionItem.appendChild(transactionMainBlock);
      let transactionSubmainBlock = document.createElement("div");
      transactionSubmainBlock.className = "tp-item-submain-block";
      let transactionDate = document.createElement("p");
      transactionDate.className = "tp-date";
      transactionDate.textContent = neededMonth.transactions[i].date;
      transactionSubmainBlock.appendChild(transactionDate);
      let transactionOptionsBlock = document.createElement("div");
      transactionOptionsBlock.className = "tp-options-block";
      let transactionOption1 = document.createElement("div");
      transactionOption1.className = "tp-option";
      let transactionOptionIcon1 = document.createElement("i");
      transactionOptionIcon1.classList.add("fa-solid");
      if (neededMonth.transactions[i].method == "Cash") {
        transactionOptionIcon1.classList.add("fa-money-bill-wave");
      } else if (neededMonth.transactions[i].method == "Card") {
        transactionOptionIcon1.classList.add("fa-credit-card");
      }
      transactionOption1.appendChild(transactionOptionIcon1);
      transactionOptionsBlock.appendChild(transactionOption1);
      let transactionOption2 = document.createElement("div");
      transactionOption2.className = "tp-option";
      let transactionOptionIcon2 = document.createElement("i");
      transactionOptionIcon2.classList.add("fa-solid");
      if (neededMonth.transactions[i].type == "Income") {
        transactionOptionIcon2.classList.add("fa-arrow-up");
        transactionOptionIcon2.style.color = "rgb(0, 176, 9)";
        transactionAmount.style.color = "rgb(0, 176, 9)";
      } else if (neededMonth.transactions[i].type == "Expense") {
        transactionOptionIcon2.classList.add("fa-arrow-down");
        transactionOptionIcon2.style.color = "rgb(218, 0, 0)";
        transactionAmount.style.color = "rgb(218, 0, 0)";
      }
      transactionOption2.appendChild(transactionOptionIcon2);
      transactionOptionsBlock.appendChild(transactionOption2);
      transactionSubmainBlock.appendChild(transactionOptionsBlock);
      transactionItem.appendChild(transactionSubmainBlock);
      transactionsPageList.appendChild(transactionItem);
    }
  };
  // let transactionsCurrentMonth = document.querySelector(".tp-current-month");
  // transactionsCurrentMonth.innerHTML = `<i class="fa-regular fa-calendar"></i>${moment().format(
  //   "LL"
  // )}`;

  function chooseTransactionsType(type) {
    transactionsAllButton.id = "";
    transactionsIncomesButton.id = "";
    transactionsExpensesButton.id = "";
    switch (type) {
      case "All":
        transactionsAllButton.id = "tpt-current-btn";
        break;
      case "Incomes":
        transactionsIncomesButton.id = "tpt-current-btn";
        break;
      case "Expenses":
        transactionsExpensesButton.id = "tpt-current-btn";
        break;
    }
  }

  transactionsAllButton.addEventListener("click", function () {
    chooseTransactionsType("All");
  });
  transactionsIncomesButton.addEventListener("click", function () {
    chooseTransactionsType("Incomes");
  });
  transactionsExpensesButton.addEventListener("click", function () {
    chooseTransactionsType("Expenses");
  });

  transactionsPage.id = "current-page";
}
