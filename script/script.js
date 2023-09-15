const selectPaymentMethod = document.getElementById("choose-type");
const totalMoney = document.getElementById("total-money");
const ifCheque = document.getElementById("if-cheque");
const passesPayment = document.getElementById("passes-payment");
const paymentType = document.getElementById("payment-type");
const voucher = document.getElementById("voucher");
const head = document.getElementById("head");
const date = document.getElementById("date");
const addParticular = document.getElementById("add-particular");
const feeType = document.getElementById("fee-type");
const rsType = document.getElementById("rs-type");

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
let particularArray = [];

// Adding particulars
const particularItem = () => {
  addParticular.addEventListener("click", () => {
    const particularId = Math.floor(Math.random() * 1000);
    // Adding particular box
    const particularAddingItem = document.createElement("span");
    particularAddingItem.setAttribute("id", particularId);
    particularAddingItem.classList.add("feeOptions");
    particularAddingItem.innerHTML = `
         <input  class="fee-input" type="text" name="Admission fee" />
         <button class="particular-delete">X</button>
      `;

    particularArray.push(particularAddingItem);
    // Adding rupee box
    const rupeeAddingItem = document.createElement("span");
    rupeeAddingItem.setAttribute("id", particularId);
    rupeeAddingItem.classList.add("rsOptions");
    rupeeAddingItem.innerHTML = `
         <input type="number" class="rupee" min="0" />
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
        paymentType.value = total;
      });
      if (rupee.length === 0) {
        totalMoney.innerHTML = `<h1>Rs 0</h1>`;
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
          }
        });
      });
    };

    rupeeTotalAmount();
    // Function to add total amount
    totalAmount();
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

// // Total Amount
// const totalAmount = () => {

//   let total = 0;
//   rupee.forEach((item) => {
//     console.log(item.value);
//   total += parseFloat(item.value || 0);
//   totalMoney.innerHTML = `
//       <h1>Rs ${total}</h1>
//     `;
//   passesPayment.value = total;
//   paymentType.value = total;
//   });
// };

// // Adding Event Listener on Rs
// const rupeeTotalAmount =()=>{
//   rupee.forEach((item) => {
//     item.addEventListener("input", totalAmount);
//     item.addEventListener("input", () => {
//       if (item.value < 1) {
//         item.value = "";
//       }

//     });
//   });
// }

// rupeeTotalAmount();

// Validation Field
const validation = (callback) => {
  voucher.addEventListener("input", () => {
    if (voucher.value < 1) {
      voucher.value = "";
    }
    voucherValue = voucher.value;
    callback(voucherValue);
  });
};

// Function to check the payment method
checkMethod();

// Function to add particulars
particularItem();

// Validation
validation();

// Event Listeners
// Add an event listener to the select element to listen for changes
selectPaymentMethod.addEventListener("change", checkMethod);
