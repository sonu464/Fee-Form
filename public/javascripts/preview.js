console.log("done");
console.log(results);
if (window.searchResults && window.searchResults.length > 0) {
  const voucherData = window.searchResults[0]; // Assuming there is only one result

  // Populate the form fields
  document.getElementById("voucher").value = voucherData.voucher;
  document.getElementById("head").value = voucherData.head;
  document.getElementById("date").value = voucherData.voucherDate;
  document.getElementById("passes-payment").value = voucherData.totalAmount;
  document.getElementById("payment-type").value = voucherData.paymentType;
  document.getElementById("choose-type").value = voucherData.chooseType;
  document.getElementById("if-cheque").textContent = voucherData.ifCheque;

  // Populate particularData fields
  voucherData.particularData.forEach((particular, index) => {
    document.getElementById(`particular-${index}`).value = particular;
  });

  // Populate other fields similarly...

  // If amounts is an array as well
  voucherData.amounts.forEach((amount, index) => {
    document.getElementById(`amount-${index}`).value = amount;
  });

  // Populate other fields as needed...
}
