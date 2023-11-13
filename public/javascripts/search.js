async function fetchData() {
  try {
    const response = await fetch("http://localhost:3000/sercheditem", {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Assuming data.success is an array
    const searchedData = data.success.map((item) => {
      return item;
    });

    // Loop through each item in serchedData
    for (let i = 0; i < searchedData.length; i++) {
      let searchedUser = searchedData[i];

      // Fill in the form fields with the fetched data for the current item
      document.getElementById("voucher").value = searchedUser.voucher || "";
      document.getElementById("head").value = searchedUser.head || "";
      document.getElementById("date").value = searchedUser.voucherDate || "";

      // Assume searchedUser.particularData is an array of objects with properties "feeType" and "rs"

      let particulars = searchedUser.particularData.map((item) => {
        return item;
      });
      for (let i = 0; i < particulars.length; i++) {
        let particular = [];
        particular = particulars[i];

        const itemContainer = document.getElementById("item-container");

        for (const item in particular) {
          if (Object.hasOwnProperty.call(particular, item)) {
            const particularArray = [];
            const feeType = document.querySelector(".fee-type");
            const particularId = Math.floor(Math.random() * 1000);
            const particularAddingItem = document.createElement("span");
            particularAddingItem.setAttribute("id", particularId);
            particularAddingItem.classList.add("feeOptions");
            particularAddingItem.innerHTML = ` 
                      <input value=${item}  class="fee-input" type="text" name="particular" /> 
                      <button class="particular-delete">X</button> 
                   `;
            particularArray.push(particularAddingItem);
            feeType.appendChild(particularAddingItem);

            const rsType = document.querySelector(".rs");
            const rupeeAddingItem = document.createElement("span");
            rupeeAddingItem.setAttribute("id", particularId);
            rupeeAddingItem.classList.add("rsOptions");
            rupeeAddingItem.innerHTML = ` 
                      <input value=${particular[item]} type="number" class="rupee" minlength="0" name="rupee" /> 
                 `;

            rsType.appendChild(rupeeAddingItem);
          }
        }
      }

      // Handle "Cheque" specific elements
      const ifChequeSpan = document.getElementById("if-cheque");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
