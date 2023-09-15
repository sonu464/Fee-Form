const selectPaymentMethod = document.getElementById("choose-type");
const totalMoney = document.getElementById("total-money");
const ifCheque = document.getElementById("if-cheque");
const passesPayment = document.getElementById("passes-payment");
const paymentType = document.getElementById("payment-type");
const voucher = document.getElementById("voucher");
const head = document.getElementById("head");
const date = document.getElementById("date");
const addParticular = document.getElementById("add-particular");

const rupee = document.querySelectorAll(".rupee");
const rs1 = document.getElementById("rs1");
const rs2 = document.getElementById("rs2");
const rs3 = document.getElementById("rs3");
const rs4 = document.getElementById("rs4");
const rs5 = document.getElementById("rs5");
const rs6 = document.getElementById("rs6");

// Values
let voucherValue = "";
let headValue = "";
let dateValue = "";

// Adding particulars
const particularItem = () => {
  particularItem.addEventListener("click", () => {
    const particularAddingItem = document.createElement("span");
  });
};

// function to check payment by cash or cheque
const checkMethod = () => {
  const selectedOption = selectPaymentMethod.value;
  if (selectedOption === "Cheque") {
    const chequeInfo = document.createElement("span");
    chequeInfo.innerHTML = `
        no <input type="text" /> date
        <input type="date" class="cheque-date"/>
    `;
    ifCheque.appendChild(chequeInfo);
  } else {
    ifCheque.innerHTML = "";
  }
};

// Total Amount
const totalAmount = (item) => {
  let total = item;
  total =
    parseFloat(rs1.value || 0) +
    parseFloat(rs2.value || 0) +
    parseFloat(rs3.value || 0) +
    parseFloat(rs4.value || 0) +
    parseFloat(rs5.value || 0) +
    parseFloat(rs6.value || 0);
  totalMoney.innerHTML = `
      <h1>Rs ${total}</h1>
    `;
  passesPayment.value = total;
  paymentType.value = total;
};

// Adding Event Listener on Rs
rupee.forEach((item) => {
  item.addEventListener("input", totalAmount);
});

// Function
// Function to get total value
totalAmount();

// Function to check the payment method
checkMethod();

// Function to add particulars
particularItem();

// Event Listeners
// Add an event listener to the select element to listen for changes
selectPaymentMethod.addEventListener("change", checkMethod);
