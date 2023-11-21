// >>>>>>>>> Edit voucher ==========================================
async function editVoucher(voucherData) {
  const showViewVoucher = document.querySelector(".showViewVouceher");
  const viewVoucherForm = document.createElement("form");
  viewVoucherForm.setAttribute("id", "form");
  viewVoucherForm.innerHTML = `
                        <button onclick="printPage()">Print Page</button>
                        <div class="closeVoucher">X</div>
                          <div class="container">
                          <!-- Top-box -->
                          <div class="top-box">
                            <div class="top-up">
                              <div class="logo">
                                <img src="/images/himt.jpg" alt="" />
                              </div>
                              <div class="institute-name">
                                <h1>Hindu Institute of Management & Technology</h1>
                                <h3>Rohtak - 124001</h3>
                              </div>
                            </div>
                            <div class="top-down">
                              <div class="t-left">
                                <div class="voucher-box">
                                  <h4>Voucher No.</h4>
                                  <input
                                    type="number"
                                    id="voucher"
                                    minlength="1"
                                    maxlength="10000"
                                    value=${voucherData.voucher}
                                    disabled
                                  />
                                </div>
                                <div class="head-box">
                                  <h4>Head</h4>
                                  <input value="${voucherData.head}" name="head" type="text" id="head" />
                                </div>
                              </div>
                              <div class="t-right">
                                <h4>Date</h4>
                                <input value=${voucherData.voucherDate} type="date" id="date" />
                              </div>
                            </div>
                          </div>

                          <!-- Center1-box -->
                          <div class="center1-box">
                            <div class="heading">
                              <div class="particular">
                                <h4>PARTICULARS</h4>
                                <button type="button" id="add-particular">+</button>
                              </div>
                              <div class="amount">
                                <h5>Amount</h5>
                              </div>
                            </div>

                            <div class="particular-container">
                              <div class="particular-box">
                                <div class="fee-type" id="fee-type">

                                </div>
                              </div>
                              <div class="amount-box">
                                <div class="rs-box">
                                  <h5>Rs</h5>
                                  <div class="rs" id="rs-type"></div>
                                </div>
                              </div>
                            </div>
                            <div class="total">
                              <div class="total-heading">
                                <h4>Total Amount</h4>
                              </div>
                              <div class="total-value">
                                <span id="total-money">
                                  <h1>Rs ${voucherData.totalAmount}</h1>
                                </span>
                              </div>
                            </div>
                          </div>

                          <!-- Center2-box -->
                          <div class="center2-box">
                            <div class="center2-left">
                              <h5>Passed for Payment of Rs</h5>
                              <input name="totalAmount" type="number" id="passes-payment" value=${voucherData.totalAmount} disabled />
                            </div>
                            <div class="center2-right">
                              <div class="accountant">
                                <h3>Accountant</h3>
                              </div>
                              <div class="director">
                                <h3>Director</h3>
                              </div>
                            </div>
                          </div>

                          <!-- Bottom-box -->
                          <div class="bottom-box">
                            <div class="payment-method">
                              <h5>
                                Received Payment of Rs
                                <input type="number" id="payment-type" value=${voucherData.totalAmount} disabled  /> in
                                <select id="choose-type" >
                                  <option value="Cash">Cash</option>
                                  <option value="Cheque">Cheque</option>
                                </select>
                                <span id="if-cheque"></span>
                              </h5>
                            </div>
                            <div class="reci-sign">Signature of Recipient</div>
                          </div>
                        </div>
                        <div class="saveBtn">
                        <button type="submit" id="saveVoucherData">save</button>
                      </div>

  `;
  showViewVoucher.appendChild(viewVoucherForm);
  showViewVoucher.style.display = "block";

  // Close edit voucher
  document.querySelector(".closeVoucher").addEventListener("click", () => {
    showViewVoucher.style.display = "none";
    showViewVoucher.innerHTML = "";
  });

  // cheque data filled to form ----------------------------
  const ifCheque = document.getElementById("if-cheque");
  const selectedOption = voucherData.paymentType;

  const choosePaymentType = document.getElementById("choose-type");
  choosePaymentType.value = selectedOption;
  if (selectedOption === "Cheque") {
    const chequeInfo = document.createElement("span");
    chequeInfo.innerHTML = ` 
           no <input name="chequeNo"  id="chequeNo" value="${voucherData.chequeNo}"   type="number"  /> date 
           <input name="chequeDate"  id="chequeDate" value="${voucherData.chequeDate}" type="date" class="cheque-date"  /> 
       `;
    ifCheque.appendChild(chequeInfo);
  }

  // Adding particulars to voucher ----------------------------
  function addingVoucherParticular() {
    const paymentType = document.getElementById("payment-type");
    const rsType = document.getElementById("rs-type");
    const feeType = document.getElementById("fee-type");
    const totalMoney = document.getElementById("total-money");
    const passesPayment = document.getElementById("passes-payment");

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
  }

  const addParticular = document.getElementById("add-particular");
  addParticular.addEventListener("click", addingVoucherParticular);

  // Adding particular item data ----------------------------
  const particularArray = [];
  voucherData.particular.map((item) => {
    const feeType = document.querySelector(".fee-type");
    const rsType = document.querySelector(".rs");
    //  here we convert object to array
    Object.entries(item).forEach(([key, value]) => {
      // Create particular input
      const particularId = Math.floor(Math.random() * 1000);
      const particularAddingItem = document.createElement("span");
      particularAddingItem.setAttribute("id", particularId);
      particularAddingItem.classList.add("feeOptions");

      particularAddingItem.innerHTML = `
        <input value="${key}" class="fee-input" type="text" />
      `;

      particularArray.push(particularAddingItem);
      feeType.appendChild(particularAddingItem);

      // Create rupee input
      const rupeeId = Math.floor(Math.random() * 1000); // Use a different ID for rupee
      const rupeeAddingItem = document.createElement("span");
      rupeeAddingItem.setAttribute("id", rupeeId);
      rupeeAddingItem.classList.add("rsOptions");

      rupeeAddingItem.innerHTML = `
        <input value="${value}" type="number" class="rupee" minlength="0" name="rupee" />
      `;

      rsType.appendChild(rupeeAddingItem);
    });
  });

  document.querySelectorAll(".rupee").forEach((item) => {
    item.addEventListener("input", () => {
      const paymentType = document.getElementById("payment-type");
      const totalMoney = document.getElementById("total-money");
      const passesPayment = document.getElementById("passes-payment");

      const rupee = document.querySelectorAll(".rupee");
      // let total = document.getElementById("passes-payment").value;
      let total = 0;
      rupee.forEach((item) => {
        total += parseFloat(item.value || 0);
        totalMoney.innerHTML = ` <h1>Rs ${total}</h1>`;
        passesPayment.value = total;
        globalTotalAmount = total;
        paymentType.value = total;
      });
    });
  });

  document.getElementById("choose-type").addEventListener("change", () => {
    const selectPaymentMethod = document.getElementById("choose-type");
    const ifCheque = document.getElementById("if-cheque");
    const selectedOption = selectPaymentMethod.value;

    const choosePaymentType = document.getElementById("choose-type");
    choosePaymentType.value = selectedOption;
    if (selectedOption === "Cheque") {
      const chequeInfo = document.createElement("span");
      chequeInfo.innerHTML = ` 
           no <input name="chequeNo"  id="chequeNo" value="${voucherData.chequeNo}"   type="number"  /> date 
           <input name="chequeDate"  id="chequeDate" value="${voucherData.chequeDate}" type="date" class="cheque-date"  /> 
       `;
      ifCheque.appendChild(chequeInfo);
    } else {
      ifCheque.innerHTML = "";
    }
  });

  // Sending data to database ----------------------------
  try {
    const saveVoucherData = viewVoucherForm.querySelector("#saveVoucherData");

    saveVoucherData.addEventListener("click", async (event) => {
      event.preventDefault();

      const particularData = [];
      const particularObject = {};

      let particularName = [];
      let particularRupee = [];

      // Find all fee-input elements and iterate over them
      const feeInputs = document.querySelectorAll(".fee-input");
      feeInputs.forEach((feeInput) => {
        particularName.push(feeInput.value);
      });

      // Find all rupee elements and iterate over them
      const rupeeInputs = document.querySelectorAll(".rupee");
      rupeeInputs.forEach((rupeeInput) => {
        particularRupee.push(rupeeInput.value);
      });

      if (particularName.length === particularRupee.length) {
        for (let i = 0; i < particularName.length; i++) {
          particularObject[particularName[i]] = particularRupee[i];
        }
      }
      particularData.push(particularObject);

      let chequeNo;
      let chequeDate;
      const type = document.getElementById("choose-type").value;
      if (type === "cheque") {
        chequeNo = document.getElementById("chequeNo").value;
        chequeDate = document.getElementById("chequeDate").value;
      } else {
        chequeNo = "";
        chequeDate = "";
      }

      console.log(chequeDate, "and", chequeNo);

      // create a array, use to send this array to database for updating the voucher
      const editedVoucherData = [
        {
          voucherNumber: document.getElementById("voucher").value,
          voucherHead: document.getElementById("head").value,
          voucherDate: document.getElementById("date").value,
          totalAmount: document.getElementById("passes-payment").value,
          paymentType: document.getElementById("choose-type").value,
          chequeNo,
          chequeDate,
          particularData,
        },
      ];

      const editedResponse = await fetch("/editvoucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          editedVoucherData,
        }),
      });

      const editedResponseData = await editedResponse.json();

      if (editedResponseData.success) {
        const showViewVouceher = document.querySelector(".showViewVouceher");
        const showVoucherUpdated = document.querySelector(
          ".showVoucherUpdated"
        );
        showViewVouceher.style.display = "none";
        showVoucherUpdated.style.transform = " translate(0, 0)";

        // close edited voucher
        const closeBtn = document.createElement("div");
        closeBtn.classList.add("editedVoucherCloseBtn");
        closeBtn.textContent = "X";
        closeBtn.addEventListener("click", () => {
          showVoucherUpdated.style.transform = " translate(0, -110%)";
          window.location.href = "/preview";
        });

        const styledDiv = document.createElement("div");
        styledDiv.classList.add("showView");

        const title = document.createElement("h2");
        title.textContent = `${editedResponseData.message}`;

        const paragraph = document.createElement("p");
        paragraph.textContent =
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

        // Append the h2 and p elements to the div(styledDiv)
        styledDiv.appendChild(title);
        styledDiv.appendChild(paragraph);

        // Append the div to the body
        showVoucherUpdated.appendChild(styledDiv);
        showVoucherUpdated.appendChild(closeBtn);
      }
    });
  } catch (error) {
    console.error("Error adding event listener:", error);
  }
}

// >>>>>>>>> Delete voucher ==========================================
async function removeHandler(voucherData) {
  try {
    // Fetch data from the Express server to get voucher numbers
    const response = await fetch("/getDataFromDatabase");
    const data = await response.json();

    if (data.success) {
      const voucherNumbers = data.data.map((item) => item.voucher);

      // Check if the voucher number of the selected voucherData is in the list
      if (voucherNumbers.includes(voucherData.voucher)) {
        // Send a request to delete the voucher item
        const deleteResponse = await fetch("/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            voucher: voucherData.voucher,
            head: voucherData.head,
          }),
        });

        const deleteData = await deleteResponse.json();

        if (deleteData.success) {
          const showVoucherUpdated = document.querySelector(
            ".showVoucherUpdated"
          );
          showVoucherUpdated.style.transform = " translate(0, 0)";

          // close edited voucher
          const closeBtn = document.createElement("div");
          closeBtn.classList.add("editedVoucherCloseBtn");
          closeBtn.textContent = "X";
          closeBtn.addEventListener("click", () => {
            showVoucherUpdated.style.transform = " translate(0, -110%)";
            window.location.href = "/preview";
          });

          const styledDiv = document.createElement("div");
          styledDiv.classList.add("showView");

          const title = document.createElement("h2");
          title.textContent = `${deleteData.message}`;

          const paragraph = document.createElement("p");
          paragraph.textContent = `with Voucher No.: ${voucherData.voucher} and voucher head: ${voucherData.head}`;

          // Append the h2 and p elements to the div(styledDiv)
          styledDiv.appendChild(title);
          styledDiv.appendChild(paragraph);

          // Append the div to the body
          showVoucherUpdated.appendChild(styledDiv);
          showVoucherUpdated.appendChild(closeBtn);
        }
      } else {
        console.error("Failed to delete voucher:", deleteData.message);
        // Handle error scenario, e.g., show an error message
      }
    } else {
      console.error("Voucher not found for deletion");
      // Show a message indicating that the voucher was not found
      showErrorMessage("Voucher not found for deletion");
    }
  } catch (error) {
    console.error("Error handling voucher deletion:", error.message);
    // Show a generic error message
    showErrorMessage("An error occurred while deleting the voucher");
  }
}

// Print page
function printPage() {
  window.print();
}

// >>>>>>>>> View Voucher ==========================================
function viewDetails(voucherData) {
  const showViewVoucher = document.querySelector(".showViewVouceher");
  const viewVoucherForm = document.createElement("form");
  viewVoucherForm.setAttribute("id", "form");
  viewVoucherForm.innerHTML = `
                        <button type="button" onclick="printPage()">Print Page</button>
                        <div class="closeVoucher">X</div>
                          <div class="container">
                          <!-- Top-box -->
                          <div class="top-box">
                            <div class="top-up">
                              <div class="logo">
                                <img src="/images/himt.jpg" alt="" />
                              </div>
                              <div class="institute-name">
                                <h1>Hindu Institute of Management & Technology</h1>
                                <h3>Rohtak - 124001</h3>
                              </div>
                            </div>
                            <div class="top-down">
                              <div class="t-left">
                                <div class="voucher-box">
                                  <h4>Voucher No.</h4>
                                  <input
                                    name="voucher
                                    type="number"
                                    id="voucher"
                                    minlength="1"
                                    maxlength="10000"
                                    value=${voucherData.voucher}
                                    disabled
                                  />
                                </div>
                                <div class="head-box">
                                  <h4>Head</h4>
                                  <input value="${voucherData.head}" name="head" type="text" id="head" disabled />
                                </div>
                              </div>
                              <div class="t-right">
                                <h4>Date</h4>
                                <input value=${voucherData.voucherDate} name="voucherDate" type="date" id="date" disabled/>
                              </div>
                            </div>
                          </div>

                          <!-- Center1-box -->
                          <div class="center1-box">
                            <div class="heading">
                              <div class="particular">
                                <h4>PARTICULARS</h4>
                               
                              </div>
                              <div class="amount">
                                <h5>Amount</h5>
                              </div>
                            </div>

                            <div class="particular-container">
                              <div class="particular-box">
                                <div class="fee-type" id="fee-type">

                                </div>
                              </div>
                              <div class="amount-box">
                                <div class="rs-box">
                                  <h5>Rs</h5>
                                  <div class="rs" id="rs-type"></div>
                                </div>
                              </div>
                            </div>
                            <div class="total">
                              <div class="total-heading">
                                <h4>Total Amount</h4>
                              </div>
                              <div class="total-value">
                                <span id="total-money">
                                  <h1>Rs ${voucherData.totalAmount}</h1>
                                </span>
                              </div>
                            </div>
                          </div>

                          <!-- Center2-box -->
                          <div class="center2-box">
                            <div class="center2-left">
                              <h5>Passed for Payment of Rs</h5>
                              <input name="totalAmount" type="number" id="passes-payment" value=${voucherData.totalAmount} disabled/>
                            </div>
                            <div class="center2-right">
                              <div class="accountant">
                                <h3>Accountant</h3>
                              </div>
                              <div class="director">
                                <h3>Director</h3>
                              </div>
                            </div>
                          </div>

                          <!-- Bottom-box -->
                          <div class="bottom-box">
                            <div class="payment-method">
                              <h5>
                                Received Payment of Rs
                                <input type="number" id="payment-type" value=${voucherData.totalAmount}  disabled/> in
                                <select id="choose-type" disabled>
                                  <option value="Cash">Cash</option>
                                  <option value="Cheque">Cheque</option>
                                </select>
                                <span id="if-cheque"></span>
                              </h5>
                            </div>
                            <div class="reci-sign">Signature of Recipient</div>
                          </div>
                        </div>
                      

  `;
  showViewVoucher.appendChild(viewVoucherForm);
  showViewVoucher.style.display = "block";

  document.querySelector(".closeVoucher").addEventListener("click", () => {
    showViewVoucher.style.display = "none";
    showViewVoucher.innerHTML = "";
  });

  // >>>>>>>>> adding particular item data  ===========================================
  const particularArray = [];
  voucherData.particular.map((item) => {
    const feeType = document.querySelector(".fee-type");
    const rsType = document.querySelector(".rs");
    Object.entries(item).forEach(([key, value]) => {
      // Create particular input
      const particularId = Math.floor(Math.random() * 1000);
      const particularAddingItem = document.createElement("span");
      // particularAddingItem.setAttribute("id", particularId);
      particularAddingItem.classList.add("feeOptions");

      particularAddingItem.innerHTML = `
        <input value="${key}" class="fee-input" type="text" name="${key}" disabled/>
      `;

      particularArray.push(particularAddingItem);
      feeType.appendChild(particularAddingItem);

      // Create rupee input
      const rupeeId = Math.floor(Math.random() * 1000); // Use a different ID for rupee
      const rupeeAddingItem = document.createElement("span");
      rupeeAddingItem.setAttribute("id", rupeeId);
      rupeeAddingItem.classList.add("rsOptions");

      rupeeAddingItem.innerHTML = `
        <input value="${value}" type="number" class="rupee" minlength="0" name="rupee" disabled/>
      `;

      rsType.appendChild(rupeeAddingItem);
    });
  });

  //check payment by cash or cheque
  const ifCheque = document.getElementById("if-cheque");
  const selectedOption = voucherData.paymentType;

  const choosePaymentType = document.getElementById("choose-type");
  choosePaymentType.value = selectedOption;
  if (selectedOption === "Cheque") {
    const chequeInfo = document.createElement("span");
    chequeInfo.innerHTML = ` 
           no <input name="chequeNo"  id="chequeNo" value="${voucherData.chequeNo}"   type="number" disabled /> date 
           <input name="chequeDate"  id="chequeDate" value="${voucherData.chequeDate}" type="date" class="cheque-date" disabled /> 
       `;
    ifCheque.appendChild(chequeInfo);
  } else {
    ifCheque.innerHTML = "";
  }
}

// >>>>>>>>> Searching Voucher ==========================================
function searchedUserDataList(data) {
  document.getElementById("searchInput").value = "";
  const tableData = data.success.map((item) => item);

  const tableBody = document.querySelector("#employeeTable tbody");

  tableData.forEach((employee) => {
    const voucherData = {
      voucher: employee.voucher,
      head: employee.head,
      voucherDate: employee.voucherDate,
      totalAmount: employee.totalAmount,
      particular: employee.particularData,
      paymentType: employee.paymentType,
      chequeDate: employee.chequeDate,
      chequeNo: employee.chequeNo,
    };

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.voucher}</td>
      <td>${employee.voucherDate}</td>
      <td>${employee.head}</td>
      <td><button class="singleVoucher">View</button></td>
      <td><button class="editVoucher">Edit</button></td>
      <td ><button class="removeVoucher">Delete</button></td>
    `;
    tableBody.appendChild(row);

    // Attach a click event listener to view voucher
    row.querySelector(".singleVoucher").addEventListener("click", function () {
      viewDetails(voucherData);
    });

    // Attach a click event listener to delete voucher
    row
      .querySelector(".removeVoucher")
      .addEventListener("click", async function () {
        const confirmToDelete = confirm("Do you want to delete this voucher");
        if (confirmToDelete) {
          removeHandler(voucherData);
        } else {
          return;
        }
      });

    // Attach a click event listener to edit voucher
    row.querySelector(".editVoucher").addEventListener("click", function () {
      editVoucher(voucherData);
    });
  });
}

// >>>>>>>>>  Voucher Data ==========================================
async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/sercheditem", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    searchedUserDataList(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
