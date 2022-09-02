// main function
const loadAllProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
};

// menu
const setMenu = async () => {
  const menulist = await loadAllProducts();
  const listParent = document.getElementById("all-menu");
  uniqueArray = [];
  menulist.forEach((productList) => {
    console.log(productList);
    if (uniqueArray.indexOf(productList.category) === -1) {
      uniqueArray.push(productList.category);
      const newDiv = document.createElement("li");
      newDiv.innerHTML = `
       <a class="shadow"> ${productList.category}</a>
        `;
      listParent.appendChild(newDiv);
    }
  });
};
setMenu();

// show product
const searchField = document.getElementById("search-field");
searchField.addEventListener("keypress", async (event) => {
  const spiner = document.getElementById("progressbar");
  spiner.classList.remove("hidden");

  if (event.key === "Enter") {
    const searchValue = searchField.value;
    searchField.value = "";

    const allProduct = await loadAllProducts();
    spiner.classList.add("hidden");
    const findProduct = allProduct.filter((product) =>
      product.category.includes(searchValue)
    );

    const NotMatch = document.getElementById("not-match");
    if (findProduct.length === 0) {
      NotMatch.classList.remove("hidden");
    } else {
      NotMatch.classList.add("hidden");
    }

    const productContainer = document.getElementById("products-container");
    productContainer.textContent = "";
    findProduct.forEach((product) => {
      const { category, image, title, description } = product;
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                      <img src="${image}" alt="Shoes" class="rounded-xl h-50 w-full" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${category}</h2>
                      <p>${title.length > 20 ? title.slice(0, 20) : title}</p>
                      <div class="card-actions">
                      <div class="card-actions justify-end">
                      <label for="my-modal-3" 
                       class="btn btn-primary modal-button" onclick="showModal('${description}', '${image}')">Show Detail</label>
                    </div>
                      </div>
                    </div>
                  </div>   
         `;
      productContainer.appendChild(div);
    });
  }
});

// show modal
const showModal = (description, image) => {
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <p class="py-4">${description}</p>
   <img src = "${image}">
  `;
};
