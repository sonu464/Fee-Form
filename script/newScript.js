const addParticular = document.getElementById("add-particular"); 
 const passesPayment = document.getElementById("passes-payment"); 
 const paymentType = document.getElementById("payment-type"); 
 const rsType = document.getElementById("rs-type"); 
 const feeType = document.getElementById("fee-type"); 
  
 let globalTotalAmount = 0; 
 let particularArray = []; 
  
 // Adding particulars 
 addParticular.addEventListener("click", () => { 
   const totalMoney = document.getElementById("total-money"); 
  
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
       globalTotalAmount = total; 
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
         } 
       }); 
     }); 
   }; 
  
   rupeeTotalAmount(); 
   // Function to add total amount 
   totalAmount(); 
 }); 
  
 function onSubmitHandler(event) { 
   event.preventDefault(); 
  
   // Validate the input fields 
   const voucher = document.getElementById("voucher").value; 
   const head = document.getElementById("head").value; 
   const date = document.getElementById("date").value; 
   //   const totalAmount = document.getElementById("total-amount").innerText; 
   const chooseType = document.getElementById("choose-type").value; 
  
   if (!voucher || !head || !date || !chooseType || !globalTotalAmount) { 
     alert("Please fill in all required fields."); 
     return; 
   } 
  
   // Gather the data 
   const data = { 
     voucher, 
     head, 
     date, 
     chooseType, 
     globalTotalAmount, 
   }; 
  
   // You can access and use this 'data' object as needed 
   console.log("Data:", data); 
  
   // Here you can send the data to a server or perform any other actions 
  
   // Clear the form (if needed) 
   document.getElementById("voucher").value = ""; 
   document.getElementById("head").value = ""; 
   document.getElementById("date").value = ""; 
   document.getElementById("total-money").innerHTML = "<h1>Rs 0<h1/>"; 
   document.getElementById("choose-type").value = "Cash"; 
   document.getElementById("rs-type").innerHTML = ""; 
   document.getElementById("fee-type").innerHTML = ""; 
 } 
  
 // Attach the submit event handler to the form 
 // document.querySelector("form").addEventListener("submit", onSubmitHandler); 
  
 // Attach a click event handler to the "save" button 
 document 
   .getElementById("saveVoucherData") 
   .addEventListener("click", onSubmitHandler)
