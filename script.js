const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");

let allProducts = [];

async function fetchProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  allProducts = data;
  displayProducts(allProducts);
  populateCategories(allProducts);
}

function populateCategories(products) {
  const categories = ["all", ...new Set(products.map((p) => p.category))];
  categories.forEach((cat) => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    categorySelect.appendChild(option);
  });
}

function displayProducts(products) {
  productContainer.innerHTML = "";
  products.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p class="category">${p.category}</p>
      <p class="price">$${p.price}</p>
      <button>Add to Cart</button>
    `;
    productContainer.appendChild(card);
  });
}

function filterProducts() {
  let filtered = [...allProducts];
  const searchText = searchInput.value.toLowerCase();
  const category = categorySelect.value;
  const sort = sortSelect.value;

  if (searchText)
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(searchText)
    );

  if (category !== "all")
    filtered = filtered.filter((p) => p.category === category);

  if (sort === "low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "high") filtered.sort((a, b) => b.price - a.price);

  displayProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);
sortSelect.addEventListener("change", filterProducts);

fetchProducts();
