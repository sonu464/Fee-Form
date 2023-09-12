const selectPaymentMethod = document.getElementById("choose-type");
const ifCheque = document.getElementById("if-cheque");

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

checkMethod();
