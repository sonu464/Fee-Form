const printButton = document.getElementById("printButton");
const showViewVoucher = document.querySelector(".showViewVouceher");
const storedItem = document.querySelector(".dataStored");

function printPage() {
  window.print();
}

function sendDataToPrint(voucherData) {
  const showViewVoucher = document.querySelector(".showViewVouceher");
  const viewVoucherForm = document.createElement("form");
  viewVoucherForm.setAttribute("id", "form");
  viewVoucherForm.innerHTML = `
                              <button type="button" onclick="printPage()" class="printBtn">Print Page</button>
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
    storedItem.innerHTML = "";
    storedItem.textContent = "Loading..";
    window.location.href = "/";
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
      particularAddingItem.setAttribute("id", particularId);
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

const fetchCurrentData = async () => {
  try {
    const response = await fetch("/voucher/print", {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);

    const tableData = data.success.map((item) => item);
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

      sendDataToPrint(voucherData);
    });
  } catch (error) {
    console.log("not Fetched");
  }
};

printButton.addEventListener("click", fetchCurrentData);
