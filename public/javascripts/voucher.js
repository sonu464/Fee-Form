const selectPaymentMethod = document.getElementById("choose-type");
const ifCheque = document.getElementById("if-cheque");
const addParticular = document.getElementById("add-particular");
const passesPayment = document.getElementById("passes-payment");
const paymentType = document.getElementById("payment-type");
const rsType = document.getElementById("rs-type");
const feeType = document.getElementById("fee-type");
const voucherNo = document.getElementById("voucher");
const voucherDate = document.getElementById("date");

let globalTotalAmount = 0;
let particularArray = [];

// Adding an validation on some field
const headField = document.getElementById("head");
headField.addEventListener("blur", () => {
  console.log("done");
  const headMainDiv = document.querySelector(".head-box");
  const headError = document.createElement("div");
  if (headField.value.trim() === "") {
    headError.textContent = "Enter a valid head field!";
    headError.className = "validationError";
    headMainDiv.appendChild(headError);
  } else {
    const existingError = headMainDiv.querySelector(".validationError");
    if (existingError) {
      headMainDiv.removeChild(existingError);
    }
  }
});

passesPayment.addEventListener("change", () => {
  passesPayment.value = paymentType.value;
});

// set voucher date automatically with current date
const currentDate = new Date();
const currentVoucherDate = currentDate.toISOString().slice(0, 10);
voucherDate.value = currentVoucherDate;

voucherNo.addEventListener("change", () => {
  if (voucherNo.value.trim() < 1) {
    voucherNo.value = "";
  }
});

// function to check payment by cash or cheque ==================================
const checkMethod = () => {
  const selectedOption = selectPaymentMethod.value;
  if (selectedOption === "Cheque") {
    const chequeInfo = document.createElement("span");
    chequeInfo.innerHTML = ` 
         no <input name="chequeNo"  id="chequeNo"    type="number" /> date 
         <input name="chequeDate"  id="chequeDate" type="date" class="cheque-date"/> 
     `;
    ifCheque.appendChild(chequeInfo);

    const bottomBox = document.querySelector(".bottom-box");
    const chequeValid = document.querySelector("#chequeNo");
    chequeValid.addEventListener("blur", () => {
      const errorMessage = document.createElement("div");
      if (chequeValid.value.trim() === "") {
        errorMessage.textContent = "Enter a valid cheque no.!";
        errorMessage.className = "validationChequeError";
        bottomBox.appendChild(errorMessage);
        bottomBox.insertBefore(errorMessage, bottomBox.firstChild);
      } else {
        const existingChequeNoError = document.querySelector(
          ".validationChequeError"
        );
        if (existingChequeNoError) {
          bottomBox.removeChild(existingChequeNoError);
        }
      }
    });
  } else {
    ifCheque.innerHTML = "";
  }
};

// Function to check the payment method ==================================
checkMethod();

// Adding particulars
addParticular.addEventListener("click", () => {
  const totalMoney = document.getElementById("total-money");
  const particularId = Math.floor(Math.random() * 1000);
  // Adding particular box
  const particularAddingItem = document.createElement("span");
  particularAddingItem.setAttribute("id", particularId);
  particularAddingItem.classList.add("feeOptions");
  particularAddingItem.innerHTML = ` 
            <input  class="fee-input" type="text" name="particular" /> 
            <button class="particular-delete">X</button> 
         `;

  particularArray.push(particularAddingItem);
  // Adding rupee box
  const rupeeAddingItem = document.createElement("span");
  rupeeAddingItem.setAttribute("id", particularId);
  rupeeAddingItem.classList.add("rsOptions");
  rupeeAddingItem.innerHTML = ` 
            <input type="number" class="rupee" minlength="0" name="rupee" /> 
       `;

  rsType.appendChild(rupeeAddingItem);
  feeType.appendChild(particularAddingItem);

  // Add an event listener to removeParticular
  const removeParticularItem = (btnParentId) => {
    const particularToRemove = document.getElementById(btnParentId);
    const rupeeId = rupeeAddingItem.getAttribute("id");

    if (btnParentId === rupeeId) {
      particularToRemove.remove();
      rupeeAddingItem.remove();

      // Recalculate the total amount after removal
      totalAmount();
    }
  };

  const removeParticular = document.querySelectorAll(".particular-delete");
  removeParticular.forEach((item) => {
    item.addEventListener("click", () => {
      const btnParentId = item.parentElement.getAttribute("id");
      removeParticularItem(btnParentId);
    });
  });

  // Total Amount
  const totalAmount = () => {
    const rupee = document.querySelectorAll(".rupee");
    let total = 0;
    rupee.forEach((item) => {
      total += parseFloat(item.value || 0);
      totalMoney.innerHTML = ` <h1>Rs ${total}</h1>`;
      passesPayment.value = total;
      globalTotalAmount = total;
      paymentType.value = total;
    });
    if (rupee.length === 0) {
      totalMoney.innerHTML = `<h1  id="total-amount">Rs 0</h1>`;
      passesPayment.value = 0;
      paymentType.value = 0;
    }
  };

  // Adding Event Listener on Rs
  const rupeeTotalAmount = () => {
    const rupee = document.querySelectorAll(".rupee");
    rupee.forEach((item) => {
      item.addEventListener("input", totalAmount);
      item.addEventListener("input", () => {
        if (item.value < 1) {
          item.value = "";
          totalMoney.innerHTML = `<h1  id="total-amount">Rs 0</h1>`;
          passesPayment.value = 0;
          paymentType.value = 0;
        }
      });
    });
  };

  rupeeTotalAmount();
  // Function to add total amount
  totalAmount();
});

// Adding voucher number dynamically ==================================
function checkVoucherNumber(data) {
  if (data.success) {
    const voucherData = data.data.map((item) => item);
    const voucherNumbers = [];
    voucherData.forEach((item) => {
      voucherNumbers.push(item.voucher);
    });

    if (voucherNumbers.length < 1) {
      voucherNo.value = 1;
      voucherNo.addEventListener("change", () => {
        const voucherBox = document.querySelector(".voucher-box");
        const voucherAlertDiv = document.createElement("div");
        voucherAlertDiv.id = "voucherNoAlert";
        voucherAlertDiv.className = "voucherNo-alert";
        voucherAlertDiv.textContent = `please don't try to change this field `;
        voucherNo.value = 1;
        voucherBox.appendChild(voucherAlertDiv);

        setInterval(() => {
          voucherAlertDiv.style.display = "none";
        }, 2000);
      });
    } else {
      const nextVoucherValue = Math.max(...voucherNumbers);
      voucherNo.value = nextVoucherValue + 1;

      voucherNo.addEventListener("change", () => {
        const voucherBox = document.querySelector(".voucher-box");
        const voucherAlertDiv = document.createElement("div");
        voucherAlertDiv.id = "voucherNoAlert";
        voucherAlertDiv.className = "voucherNo-alert";
        voucherAlertDiv.textContent = `please don't try to change this field `;
        voucherNo.value = nextVoucherValue + 1;
        voucherBox.appendChild(voucherAlertDiv);

        setTimeout(() => {
          voucherAlertDiv.style.display = "none";
        }, 2000);
      });
    }
  }
}

// fucntion to get data from database ==================================
async function getDataFromDB() {
  const response = await fetch("/getDataFromDatabase", {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  checkVoucherNumber(data);
}

// Add an event listener to the select element to listen for changes ==================================
selectPaymentMethod.addEventListener("change", checkMethod);

getDataFromDB();
