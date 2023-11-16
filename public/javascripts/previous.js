async function getData() {
  try {
    // Fetch data from the Express server
    const response = await fetch("/getDataFromDatabase");
    const data = await response.json();

    if (data.success) {
      const optionsHead = data.data.map((item) => {
        return item.head;
      });

      const optionsData = [];

      for (let i = 0; i < optionsHead.length; i++) {
        optionsData.push({ value: optionsHead[i], text: optionsHead[i] });
      }

      const searchedType = document.getElementById("searchedType");
      optionsData.forEach((option) => {
        const optionId = Math.floor(Math.random() * 10000);
        const optionElement = document.createElement("option");
        optionElement.setAttribute("id", optionId);
        optionElement.value = option.value;
        optionElement.text = option.text;
        searchedType.appendChild(optionElement);
      });

      searchedType.addEventListener("change", () => {
        const changedValue = searchedType.value;
        document.getElementById("searchInput").value = changedValue;
      });
    } else {
      console.error("Failed to fetch data:", data.message);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

getData();
