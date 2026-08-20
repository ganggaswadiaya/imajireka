/* ===================== ALL PRODUCTS ===================== */

const allProducts = [
  {
    id: 101,
    category: "Apparel",
    name: "Dreamscape Illustration T-Shirt",
    price: 24,
    oldPrice: 30,
    icon: "fa-shirt",
    badge: "Best Seller",
    stock: true,
    newest: 18,
  },
  {
    id: 102,
    category: "Apparel",
    name: "Bali Sunset Oversized Tee",
    price: 28,
    oldPrice: null,
    icon: "fa-shirt",
    badge: "New",
    stock: true,
    newest: 17,
  },
  {
    id: 103,
    category: "Apparel",
    name: "Little Things Graphic T-Shirt",
    price: 22,
    oldPrice: 27,
    icon: "fa-shirt",
    badge: "-18%",
    stock: true,
    newest: 13,
  },
  {
    id: 104,
    category: "Apparel",
    name: "Imajireka Illustration Hoodie",
    price: 46,
    oldPrice: null,
    icon: "fa-shirt",
    badge: "New",
    stock: true,
    newest: 16,
  },
  {
    id: 105,
    category: "Bags",
    name: "Everyday Illustration Tote Bag",
    price: 18,
    oldPrice: null,
    icon: "fa-bag-shopping",
    badge: "Best Seller",
    stock: true,
    newest: 15,
  },
  {
    id: 106,
    category: "Bags",
    name: "Bali Story Canvas Tote",
    price: 21,
    oldPrice: 25,
    icon: "fa-bag-shopping",
    badge: "-16%",
    stock: true,
    newest: 11,
  },
  {
    id: 107,
    category: "Posters & Prints",
    name: "Kintamani Morning Art Poster",
    price: 14,
    oldPrice: null,
    icon: "fa-image",
    badge: "New",
    stock: true,
    newest: 14,
  },
  {
    id: 108,
    category: "Posters & Prints",
    name: "Island Stories A3 Poster",
    price: 16,
    oldPrice: null,
    icon: "fa-image",
    badge: "",
    stock: true,
    newest: 9,
  },
  {
    id: 109,
    category: "Posters & Prints",
    name: "Dreamy Flora Art Print Set",
    price: 19,
    oldPrice: 24,
    icon: "fa-images",
    badge: "-20%",
    stock: true,
    newest: 12,
  },
  {
    id: 110,
    category: "Stickers",
    name: "Imajireka Illustration Sticker Pack",
    price: 7,
    oldPrice: null,
    icon: "fa-note-sticky",
    badge: "Best Seller",
    stock: true,
    newest: 10,
  },
  {
    id: 111,
    category: "Stickers",
    name: "Bali Mood Vinyl Sticker Set",
    price: 8,
    oldPrice: null,
    icon: "fa-note-sticky",
    badge: "New",
    stock: true,
    newest: 8,
  },
  {
    id: 112,
    category: "Accessories",
    name: "Illustrated Bucket Hat",
    price: 25,
    oldPrice: null,
    icon: "fa-hat-cowboy-side",
    badge: "New",
    stock: true,
    newest: 7,
  },
  {
    id: 113,
    category: "Accessories",
    name: "Little Planet Acrylic Keychain",
    price: 9,
    oldPrice: 12,
    icon: "fa-key",
    badge: "-25%",
    stock: true,
    newest: 6,
  },
  {
    id: 114,
    category: "Accessories",
    name: "Imajireka Enamel Pin",
    price: 8,
    oldPrice: null,
    icon: "fa-star",
    badge: "",
    stock: true,
    newest: 5,
  },
  {
    id: 115,
    category: "Accessories",
    name: "Illustrated Phone Case",
    price: 17,
    oldPrice: null,
    icon: "fa-mobile-screen-button",
    badge: "",
    stock: true,
    newest: 4,
  },
  {
    id: 116,
    category: "Stationery",
    name: "Daily Ideas Illustration Notebook",
    price: 12,
    oldPrice: null,
    icon: "fa-book",
    badge: "New",
    stock: true,
    newest: 3,
  },
  {
    id: 117,
    category: "Stationery",
    name: "Imajireka Postcard Collection",
    price: 10,
    oldPrice: null,
    icon: "fa-envelope",
    badge: "",
    stock: true,
    newest: 2,
  },
  {
    id: 118,
    category: "Home & Lifestyle",
    name: "Illustration Ceramic Mug",
    price: 15,
    oldPrice: 19,
    icon: "fa-mug-hot",
    badge: "-21%",
    stock: false,
    newest: 1,
  },
];


/* ===================== ALL PRODUCTS → SHARED PRODUCT MODAL =====================
   The Home page product modal is powered by productCatalog/openProductModal()
   from js/script.js. All Products uses a larger catalog, so convert those
   products to the same modal data structure before rendering the page.
=============================================================================== */

function registerAllProductsInProductModal() {
  if (typeof productCatalog === "undefined") return;

  allProducts.forEach((product) => {
    // Do not duplicate entries if this script is initialized more than once.
    if (productCatalog.some((item) => item.id === product.id)) return;

    const sizeMap = {
      Apparel: ["S", "M", "L", "XL"],
      Bags: ["Standard"],
      "Posters & Prints": ["A4", "A3"],
      Stickers: ["Standard"],
      Accessories: ["Standard"],
      Stationery: ["A5", "A4"],
      "Home & Lifestyle": ["Standard"],
    };

    const colorMap = {
      Apparel: [
        { name: "Cream", value: "#FEE6CA" },
        { name: "Black", value: "#2B2B2B" },
        { name: "Orange", value: "#F7931E" },
      ],
      Bags: [
        { name: "Natural", value: "#E9D7BC" },
        { name: "Black", value: "#2B2B2B" },
      ],
      "Posters & Prints": [
        { name: "Original", value: "#FEE6CA" },
        { name: "Warm White", value: "#F5F0E8" },
      ],
      Stickers: [
        { name: "Mixed", value: "#F7931E" },
      ],
      Accessories: [
        { name: "Orange", value: "#F7931E" },
        { name: "Black", value: "#2B2B2B" },
      ],
      Stationery: [
        { name: "Cream", value: "#FEE6CA" },
      ],
      "Home & Lifestyle": [
        { name: "Natural", value: "#E9D7BC" },
      ],
    };

    productCatalog.push({
      id: product.id,
      category: product.category,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      icon: product.icon,
      badge: product.badge || "",
      reviews: 0,
      sold: 0,
      rating: 5,
      sizes: sizeMap[product.category] || ["Standard"],
      colors: colorMap[product.category] || [
        { name: "Original", value: "#FEE6CA" },
      ],
    });
  });
}

registerAllProductsInProductModal();

const catalogGrid = document.getElementById("catalog-grid");
const catalogEmpty = document.getElementById("catalog-empty");
const catalogResult = document.getElementById("catalog-result");
const catalogSearchInput = document.getElementById("catalog-search-input");
const catalogSearchClear = document.getElementById("catalog-search-clear");
const sortProducts = document.getElementById("sort-products");
const priceMin = document.getElementById("price-min");
const priceMax = document.getElementById("price-max");
const inStockOnly = document.getElementById("in-stock-only");
const categoryInputs = document.querySelectorAll("[data-filter-category]");
const activeFilters = document.getElementById("active-filters");
const clearFilters = document.getElementById("clear-filters");
const emptyReset = document.getElementById("empty-reset");
const resetPrice = document.getElementById("reset-price");
const activeFilterCount = document.getElementById("active-filter-count");
const filterMobileBtn = document.getElementById("filter-mobile-btn");
const filterSidebar = document.getElementById("filter-sidebar");
const filterClose = document.getElementById("filter-close");
const filterOverlay = document.getElementById("filter-overlay");
const applyFilters = document.getElementById("apply-filters");
const heroProductCount = document.getElementById("hero-product-count");

const formatPrice = (value) => `$${Number(value).toFixed(2)}`;

let filters = {
  categories: [],
  min: 0,
  max: 500,
  stock: false,
  search: "",
  sort: "featured",
};

const productAuthors = {
  101: 'Deva Ardiansyah',
  102: 'Salsa Amelia',
  103: 'Bimo Aditya',
  104: 'Alya Ramadhani',
  105: 'Raka Pratama',
  106: 'Nadia Putri',
  107: 'Made Arya',
  108: 'Citra Lestari',
  109: 'Dewa Bagus',
  110: 'Ayu Maharani',
  111: 'Rizky Pramana',
  112: 'Komang Adi',
  113: 'Salsa Amelia',
  114: 'Bimo Aditya',
  115: 'Deva Ardiansyah',
  116: 'Alya Ramadhani',
  117: 'Citra Lestari',
  118: 'Made Arya',
};

function renderProducts(products) {
  if (!catalogGrid || !catalogEmpty) return;

  catalogGrid.innerHTML = "";

  if (!products.length) {
    catalogGrid.style.display = "none";
    catalogEmpty.hidden = false;
  } else {
    catalogGrid.style.display = "grid";
    catalogEmpty.hidden = true;
  }

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "catalog-product-card";
    card.dataset.productId = product.id;

    const oldPrice = product.oldPrice
      ? `<span class="catalog-product-old-price">${formatPrice(product.oldPrice)}</span>`
      : "";

    const stockText = product.stock ? "In stock" : "Currently unavailable";
    const stockClass = product.stock ? "" : "out";

    card.innerHTML = `
      <div class="catalog-product-visual">
        ${product.badge ? `<span class="catalog-product-badge">${product.badge}</span>` : ""}
        <button type="button" class="catalog-wishlist" aria-label="Add ${product.name} to wishlist" data-catalog-wishlist="${product.id}">
          <i class="fa-regular fa-heart"></i>
        </button>
        <div class="catalog-product-art"><i class="fa-solid ${product.icon}"></i></div>
      </div>

      <div class="catalog-product-info">
        <span class="catalog-product-category">${product.category}</span>
        <h2 class="catalog-product-name">${product.name}</h2>
        <div class="catalog-product-price-row">
          <span class="catalog-product-price">${formatPrice(product.price)}</span>
          ${oldPrice}
        </div>
        <div class="catalog-product-meta">
          <span class="catalog-product-author"><i class="fa-solid fa-palette"></i> Karya oleh: ${productAuthors[product.id] || "Imajireka Studio"}</span>
          <button type="button" class="catalog-view-btn" data-catalog-view="${product.id}">Lihat Produk <i class="fa-solid fa-arrow-right"></i></button>
        </div>
      </div>
    `;

    catalogGrid.appendChild(card);
  });

  if (catalogResult) {
    catalogResult.textContent = `${products.length} product${products.length === 1 ? "" : "s"}`;
  }
}

function getFilteredProducts() {
  let products = [...allProducts];
  const search = filters.search.toLowerCase().trim();

  products = products.filter((product) => {
    const categoryMatch =
      !filters.categories.length ||
      filters.categories.every((category) => {
        if (category === "Karya Siswa Imajireka") {
          return Boolean(productAuthors[product.id]);
        }
        return product.category === category;
      });

    const priceMatch =
      product.price >= filters.min && product.price <= filters.max;

    const stockMatch = !filters.stock || product.stock;

    const searchText = `${product.name} ${product.category} ${product.badge} ${productAuthors[product.id] || ""}`.toLowerCase();
    const searchMatch = !search || searchText.includes(search);

    return categoryMatch && priceMatch && stockMatch && searchMatch;
  });

  switch (filters.sort) {
    case "newest":
      products.sort((a, b) => b.newest - a.newest);
      break;
    case "price-low":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      products.sort((a, b) => b.price - a.price);
      break;
    case "name":
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      products.sort((a, b) => b.newest - a.newest);
  }

  return products;
}

function renderActiveFilters() {
  if (!activeFilters) return;

  const chips = [];

  filters.categories.forEach((category) => {
    chips.push(`
      <span class="active-filter-chip">
        ${category}
        <button type="button" data-remove-category="${category}" aria-label="Remove ${category} filter">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </span>
    `);
  });


  if (filters.min > 0 || filters.max < 500) {
    chips.push(`
      <span class="active-filter-chip">
        ${formatPrice(filters.min)} – ${formatPrice(filters.max)}
        <button type="button" data-remove-price aria-label="Remove price filter">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </span>
    `);
  }

  if (filters.stock) {
    chips.push(`
      <span class="active-filter-chip">
        In stock only
        <button type="button" data-remove-stock aria-label="Remove stock filter">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </span>
    `);
  }

  if (filters.search) {
    chips.push(`
      <span class="active-filter-chip">
        “${filters.search}”
        <button type="button" data-remove-search aria-label="Remove search filter">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </span>
    `);
  }

  activeFilters.innerHTML = chips.join("");

  const count =
    filters.categories.length +
    (filters.min > 0 || filters.max < 500 ? 1 : 0) +
    (filters.stock ? 1 : 0) +
    (filters.search ? 1 : 0);

  if (activeFilterCount) {
    activeFilterCount.textContent = count;
    activeFilterCount.classList.toggle("visible", count > 0);
  }
}

function applyCurrentFilters() {
  renderProducts(getFilteredProducts());
  renderActiveFilters();
  catalogSearchClear?.classList.toggle("visible", Boolean(filters.search));
}

function readFilterInputs() {
  filters.categories = [...categoryInputs]
    .filter((input) => input.checked)
    .map((input) => input.value);


  filters.min = Math.max(0, Number(priceMin?.value) || 0);
  filters.max = Math.max(filters.min, Number(priceMax?.value) || 500);
  filters.stock = Boolean(inStockOnly?.checked);
  filters.search = catalogSearchInput?.value || "";
  filters.sort = sortProducts?.value || "featured";
}

function resetAllFilters() {
  filters = {
    categories: [],
      min: 0,
    max: 500,
    stock: false,
    search: "",
    sort: "featured",
  };

  categoryInputs.forEach((input) => {
    input.checked = false;
  });


  if (priceMin) priceMin.value = 0;
  if (priceMax) priceMax.value = 500;
  if (inStockOnly) inStockOnly.checked = false;
  if (catalogSearchInput) catalogSearchInput.value = "";
  if (sortProducts) sortProducts.value = "featured";

  applyCurrentFilters();
}

categoryInputs.forEach((input) => {
  input.addEventListener("change", () => {
    readFilterInputs();
    applyCurrentFilters();
  });
});

inStockOnly?.addEventListener("change", () => {
  readFilterInputs();
  applyCurrentFilters();
});

sortProducts?.addEventListener("change", () => {
  readFilterInputs();
  applyCurrentFilters();
});

priceMin?.addEventListener("change", () => {
  readFilterInputs();
  applyCurrentFilters();
});

priceMax?.addEventListener("change", () => {
  readFilterInputs();
  applyCurrentFilters();
});

catalogSearchInput?.addEventListener("input", () => {
  readFilterInputs();
  applyCurrentFilters();
});

catalogSearchClear?.addEventListener("click", () => {
  if (catalogSearchInput) catalogSearchInput.value = "";
  readFilterInputs();
  applyCurrentFilters();
  catalogSearchInput?.focus();
});

resetPrice?.addEventListener("click", () => {
  if (priceMin) priceMin.value = 0;
  if (priceMax) priceMax.value = 500;
  readFilterInputs();
  applyCurrentFilters();
});

clearFilters?.addEventListener("click", resetAllFilters);
emptyReset?.addEventListener("click", resetAllFilters);

activeFilters?.addEventListener("click", (event) => {
  const categoryButton = event.target.closest("[data-remove-category]");
  const priceButton = event.target.closest("[data-remove-price]");
  const stockButton = event.target.closest("[data-remove-stock]");
  const searchButton = event.target.closest("[data-remove-search]");

  if (categoryButton) {
    const category = categoryButton.dataset.removeCategory;
    const input = [...categoryInputs].find((item) => item.value === category);
    if (input) input.checked = false;
  }

  if (priceButton) {
    if (priceMin) priceMin.value = 0;
    if (priceMax) priceMax.value = 500;
  }

  if (stockButton && inStockOnly) inStockOnly.checked = false;

  if (searchButton && catalogSearchInput) catalogSearchInput.value = "";

  readFilterInputs();
  applyCurrentFilters();
});

filterMobileBtn?.addEventListener("click", () => {
  filterSidebar?.classList.add("active");
  filterOverlay?.classList.add("active");
  document.body.classList.add("filter-open");
});

function closeFilters() {
  filterSidebar?.classList.remove("active");
  filterOverlay?.classList.remove("active");
  document.body.classList.remove("filter-open");
}

filterClose?.addEventListener("click", closeFilters);
filterOverlay?.addEventListener("click", closeFilters);
applyFilters?.addEventListener("click", closeFilters);

catalogGrid?.addEventListener("click", (event) => {
  const wishlistButton = event.target.closest("[data-catalog-wishlist]");

  // Wishlist has its own action and must not open the product modal.
  if (wishlistButton) {
    event.preventDefault();
    event.stopPropagation();

    const product = allProducts.find(
      (item) => item.id === Number(wishlistButton.dataset.catalogWishlist)
    );

    if (!product) return;

    const stored = JSON.parse(localStorage.getItem("imajirekaWishlist") || "[]");
    const exists = stored.some((item) => item.id === product.id);

    const updated = exists
      ? stored.filter((item) => item.id !== product.id)
      : [
          ...stored,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice,
            icon: product.icon,
            stock: product.stock ? "In Stock" : "Out of Stock",
          },
        ];

    localStorage.setItem("imajirekaWishlist", JSON.stringify(updated));
    wishlistButton.classList.toggle("active", !exists);
    wishlistButton.innerHTML = exists
      ? '<i class="fa-regular fa-heart"></i>'
      : '<i class="fa-solid fa-heart"></i>';

    return;
  }

  // Every other click on a product card opens the same product popup
  // used by the Home / index.html page.
  const card = event.target.closest(".catalog-product-card");

  if (card && typeof openProductModal === "function") {
    const productId = Number(card.dataset.productId);
    if (productId) {
      openProductModal(productId);
    }
  }
});

if (heroProductCount) {
  heroProductCount.textContent = allProducts.length;
}

applyCurrentFilters();



/* ALL PRODUCTS: keep Products navbar active */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-nav-section="hero"]').forEach((link) => {
    link.classList.remove("active");
    link.setAttribute("aria-current", "false");
  });
  document.querySelectorAll('[data-nav-section="products"]').forEach((link) => {
    link.classList.add("active");
    link.setAttribute("aria-current", "page");
  });
});
