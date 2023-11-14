function searchedUserDataList(data) {
  const tableData = data.success.map((item) => item);

  const tableBody = document.querySelector("#employeeTable tbody");

  tableData.forEach((employee) => {
    const voucherData = {
      voucher: employee.voucher,
      head: employee.head,
      voucherDate: employee.voucherDate,
      totalAmount: employee.totalAmount,
    };

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${employee.voucher}</td>
      <td>${employee.head}</td>
      <td><button class="singleVoucher">View</button></td>
    `;
    tableBody.appendChild(row);

    // Attach a click event listener to the button
    row.querySelector(".singleVoucher").addEventListener("click", function () {
      viewDetails(voucherData);
    });
  });
}

// function printPage() {
//   window.print();
// }

function viewDetails(voucherData) {
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
                                <h3>ROHTAK - 124001</h3>
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
                                  />
                                </div>
                                <div class="head-box">
                                  <h4>Head</h4>
                                  <input value=${voucherData.head} name="head" type="text" id="head" />
                                </div>
                              </div>
                              <div class="t-right">
                                <h4>Date</h4>
                                <input value=${voucherData.voucherDate} name="voucherDate" type="date" id="date" />
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
                                <div class="fee-type" id="fee-type"></div>
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
                                <input type="number" id="payment-type" value=${voucherData.totalAmount} disabled /> in
                                <select id="choose-type">
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
}

// =============================================================
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
    // Assuming data.success is an array
    //   const searchedData = data.success.map((item) => {
    //     return item;
    //   });

    //   // Loop through each item in serchedData
    //   for (let i = 0; i < searchedData.length; i++) {
    //     let searchedUser = searchedData[i];

    //     // Fill in the form fields with the fetched data for the current item
    //     document.getElementById("voucher").value = searchedUser.voucher || "";
    //     document.getElementById("head").value = searchedUser.head || "";
    //     document.getElementById("date").value = searchedUser.voucherDate || "";

    //     // Assume searchedUser.particularData is an array of objects with properties "feeType" and "rs"

    //     let particulars = searchedUser.particularData.map((item) => {
    //       return item;
    //     });
    //     for (let i = 0; i < particulars.length; i++) {
    //       let particular = [];
    //       particular = particulars[i];

    //       const itemContainer = document.getElementById("item-container");

    //       for (const item in particular) {
    //         if (Object.hasOwnProperty.call(particular, item)) {
    //           const particularArray = [];
    //           const feeType = document.querySelector(".fee-type");
    //           const particularId = Math.floor(Math.random() * 1000);
    //           const particularAddingItem = document.createElement("span");
    //           particularAddingItem.setAttribute("id", particularId);
    //           particularAddingItem.classList.add("feeOptions");
    //           particularAddingItem.innerHTML = `
    //                     <input value=${item}  class="fee-input" type="text" name="particular" />
    //                     <button class="particular-delete">X</button>
    //                  `;
    //           particularArray.push(particularAddingItem);
    //           feeType.appendChild(particularAddingItem);

    //           const rsType = document.querySelector(".rs");
    //           const rupeeAddingItem = document.createElement("span");
    //           rupeeAddingItem.setAttribute("id", particularId);
    //           rupeeAddingItem.classList.add("rsOptions");
    //           rupeeAddingItem.innerHTML = `
    //                     <input value=${particular[item]} type="number" class="rupee" minlength="0" name="rupee" />
    //                `;

    //           rsType.appendChild(rupeeAddingItem);
    //         }
    //       }
    //     }

    //     // Handle "Cheque" specific elements
    //     const ifChequeSpan = document.getElementById("if-cheque");
    //   }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
