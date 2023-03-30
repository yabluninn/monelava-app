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
  date: {
    day: 0,
    month: 0,
    year: 0,
  },
  method: "Cash",
  details: "",
  category: "",
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
  headerAddingPageBtn.addEventListener("click", function () {
    openPage("Adding");
  });
  loadData();
}

function loadData() {
  if (localStorage.getItem("user")) {
    let requiredUser = localStorage.getItem("user");
    let parsedRequiredUser = JSON.parse(requiredUser);
  } else {
    let newUser = Object.assign({}, user);

    let firstMonth = Object.assign({}, month);
    firstMonth.monthNumber = moment().month() + 1;
    firstMonth.income = 0;
    firstMonth.expense = 0;
    firstMonth.transactions = [];
    newUser.monthes.push(firstMonth);
    localStorage.setItem("user", JSON.stringify(newUser));
  }
}

function openPage(page) {
  switch (page) {
    case "Adding":
      showAddingTransactionPage();
      break;
    case "Transactions":
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
    addingCategoryTitle.textContent = `Category - ${_category}`;
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
            chooseCategory(
              parsedRequiredUser.categories.income[i].categoryName
            );
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
            chooseCategory(
              parsedRequiredUser.categories.expense[i].categoryName
            );
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
              chooseCategory(
                parsedRequiredUser.categories.income[i].categoryName
              );
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
              chooseCategory(
                parsedRequiredUser.categories.expense[i].categoryName
              );
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
    category = "";
    addingCategoryTitle.textContent = "Category";
    addingBudgetTypeBtn.removeEventListener("click", addingTransaction, false);
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
    (e) => e.monthNumber == parseInt(month)
  );
  console.log(neededMonth);
  let newTransaction = Object.assign({}, transaction);
  newTransaction.amount = amount;
  newTransaction.type = "Expense";
  newTransaction.method = method;
  newTransaction.details = details;
  newTransaction.category = category;
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
    (e) => e.monthNumber == parseInt(month)
  );
  console.log(neededMonth);
  let newTransaction = Object.assign({}, transaction);
  newTransaction.amount = amount;
  newTransaction.type = "Income7";
  newTransaction.method = method;
  newTransaction.details = details;
  newTransaction.category = category;
  neededMonth.transactions.push(newTransaction);
  neededMonth.income += parseInt(amount);
  localStorage.setItem("user", JSON.stringify(parsedRequiredUser));
  console.log(
    `[INCOMR] Amount: ${amount}, date: ${date}, category: ${category}, details: ${details}, methond: ${method}`
  );
}
