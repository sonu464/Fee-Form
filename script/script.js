const selectPaymentMethod = document.getElementById("choose-type");
const totalMoney = document.getElementById("total-money");
const ifCheque = document.getElementById("if-cheque");
const passesPayment = document.getElementById("passes-payment");
const paymentType = document.getElementById("payment-type");

const rupee = document.querySelectorAll(".rupee");
const rs1 = document.getElementById("rs1");
const rs2 = document.getElementById("rs2");
const rs3 = document.getElementById("rs3");
const rs4 = document.getElementById("rs4");
const rs5 = document.getElementById("rs5");
const rs6 = document.getElementById("rs6");

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

// Add an event listener to the select element to listen for changes
selectPaymentMethod.addEventListener("change", checkMethod);

// Function to check the payment method
checkMethod();

// Total Amount
const totalAmount = () => {
  const total =
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

totalAmount();
