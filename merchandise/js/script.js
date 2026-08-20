// ===== Data untuk setiap slide hero =====
const slides = [
  {
    eyebrow: "New",
    title: "Get the<br>Best Collection<br>2025",
    price: 'From <strong>&euro;2,999</strong>'
  },
  {
    eyebrow: "Best Seller",
    title: "Track Every<br>Move You<br>Make",
    price: 'From <strong>&euro;2,499</strong>'
  },
  {
    eyebrow: "Limited",
    title: "Style Meets<br>Smart<br>Technology",
    price: 'From <strong>&euro;3,299</strong>'
  }
];

let currentSlide = 0;
let autoplayTimer = null;

const eyebrowEl = document.getElementById("slide-eyebrow");
const titleEl = document.getElementById("slide-title");
const priceEl = document.getElementById("slide-price");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.getElementById("prev-slide");
const nextBtn = document.getElementById("next-slide");
const heroWatch = document.getElementById("hero-watch");

function renderSlide(index) {
  const slide = slides[index];

  // fade out
  eyebrowEl.style.opacity = 0;
  titleEl.style.opacity = 0;
  priceEl.style.opacity = 0;
  heroWatch.style.opacity = 0;

  setTimeout(() => {
    eyebrowEl.textContent = slide.eyebrow;
    titleEl.innerHTML = slide.title;
    priceEl.innerHTML = slide.price;

    eyebrowEl.style.opacity = 1;
    titleEl.style.opacity = 1;
    priceEl.style.opacity = 1;
    heroWatch.style.opacity = 1;
  }, 200);

  dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
}

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  renderSlide(currentSlide);
  restartAutoplay();
}

function nextSlide() {
  goToSlide(currentSlide + 1);
}

function prevSlide() {
  goToSlide(currentSlide - 1);
}

function restartAutoplay() {
  clearInterval(autoplayTimer);
  autoplayTimer = setInterval(nextSlide, 5000);
}

// Event listeners
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    goToSlide(parseInt(dot.dataset.slide, 10));
  });
});

// Transisi halus untuk elemen teks & watch
[eyebrowEl, titleEl, priceEl, heroWatch].forEach((el) => {
  el.style.transition = "opacity 0.2s ease";
});

// Mulai autoplay saat halaman siap
restartAutoplay();

// ===== Tahun footer otomatis =====
const footerYear = document.getElementById("footer-year");
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}


// ===================== ACCOUNT MODAL =====================
const accountBtn = document.getElementById("account-btn");
const loginModal = document.getElementById("login-modal");
const loginClose = document.getElementById("login-close");
const loginOverlay = document.querySelector("[data-close-login]");

const loginView = document.getElementById("account-login-view");
const registerView = document.getElementById("account-register-view");

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const rememberMe = document.getElementById("remember-me");
const loginMessage = document.getElementById("login-message");

const createAccount = document.getElementById("create-account");
const backToLogin = document.getElementById("back-to-login");
const forgotPassword = document.getElementById("forgot-password");

const registerName = document.getElementById("register-name");
const registerEmail = document.getElementById("register-email");
const registerPassword = document.getElementById("register-password");
const registerConfirmPassword = document.getElementById("register-confirm-password");
const registerTerms = document.getElementById("register-terms");

const socialButtons = document.querySelectorAll(".social-btn");

let lastFocusedElement = null;

function openLoginModal() {
  if (!loginModal) return;

  lastFocusedElement = document.activeElement;

  showLoginView(false);

  loginModal.classList.add("active");
  loginModal.setAttribute("aria-hidden", "false");
  accountBtn.setAttribute("aria-expanded", "true");
  document.body.classList.add("login-open");

  clearAccountMessage();

  setTimeout(() => {
    loginEmail?.focus();
  }, 200);
}

function closeLoginModal() {
  if (!loginModal) return;

  loginModal.classList.remove("active");
  loginModal.setAttribute("aria-hidden", "true");
  accountBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("login-open");

  showLoginView(false);
  clearAccountMessage();

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function clearAccountMessage() {
  if (loginMessage) {
    loginMessage.textContent = "";
    loginMessage.classList.remove("success", "error");
  }
}

function showAccountMessage(message, type = "error") {
  if (!loginMessage) return;

  loginMessage.textContent = message;
  loginMessage.classList.remove("success", "error");
  loginMessage.classList.add(type);
}

function showLoginView(focusInput = true) {
  if (!loginView || !registerView) return;

  loginView.hidden = false;
  loginView.classList.add("active");
  registerView.hidden = true;
  registerView.classList.remove("active");

  clearAccountMessage();

  if (focusInput) {
    setTimeout(() => {
      loginEmail?.focus();
    }, 100);
  }
}

function showRegisterView(focusInput = true) {
  if (!loginView || !registerView) return;

  loginView.hidden = true;
  loginView.classList.remove("active");
  registerView.hidden = false;
  registerView.classList.add("active");

  clearAccountMessage();

  if (focusInput) {
    setTimeout(() => {
      registerName?.focus();
    }, 100);
  }
}

async function hashPassword(password) {
  if (!window.crypto?.subtle) {
    throw new Error("Secure password hashing is unavailable in this browser.");
  }

  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function getRegisteredAccount() {
  try {
    return JSON.parse(localStorage.getItem("imajirekaAccount")) || null;
  } catch {
    return null;
  }
}

function saveRegisteredAccount(account) {
  localStorage.setItem("imajirekaAccount", JSON.stringify(account));
}

if (accountBtn) {
  accountBtn.addEventListener("click", openLoginModal);
}

if (loginClose) {
  loginClose.addEventListener("click", closeLoginModal);
}

if (loginOverlay) {
  loginOverlay.addEventListener("click", closeLoginModal);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && loginModal?.classList.contains("active")) {
    closeLoginModal();
  }
});

// ---- Password visibility ----
document.querySelectorAll(".password-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const targetId = toggle.dataset.target || "login-password";
    const input = document.getElementById(targetId);

    if (!input) return;

    const isPassword = input.type === "password";

    input.type = isPassword ? "text" : "password";
    toggle.innerHTML = isPassword
      ? '<i class="fa-regular fa-eye"></i>'
      : '<i class="fa-regular fa-eye-slash"></i>';

    toggle.setAttribute(
      "aria-label",
      isPassword ? "Sembunyikan password" : "Tampilkan password"
    );
  });
});

// ---- Remembered email ----
const savedEmail = localStorage.getItem("imajirekaRememberEmail");

if (savedEmail && loginEmail && rememberMe) {
  loginEmail.value = savedEmail;
  rememberMe.checked = true;
}

// ---- Login ----
if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = loginEmail.value.trim().toLowerCase();
    const password = loginPassword.value;

    clearAccountMessage();

    if (!loginEmail.checkValidity()) {
      showAccountMessage("Please enter a valid email address.");
      loginEmail.focus();
      return;
    }

    if (password.length < 6) {
      showAccountMessage("Password must contain at least 6 characters.");
      loginPassword.focus();
      return;
    }

    const registeredAccount = getRegisteredAccount();

    if (!registeredAccount) {
      showAccountMessage(
        "Account belum tersedia. Silakan Create Account terlebih dahulu."
      );
      return;
    }

    if (registeredAccount.email !== email) {
      showAccountMessage("Email belum terdaftar di Imajireka.");
      loginEmail.focus();
      return;
    }

    try {
      const passwordHash = await hashPassword(password);

      if (passwordHash !== registeredAccount.passwordHash) {
        showAccountMessage("Email atau password yang kamu masukkan salah.");
        loginPassword.focus();
        return;
      }

      if (rememberMe.checked) {
        localStorage.setItem("imajirekaRememberEmail", email);
      } else {
        localStorage.removeItem("imajirekaRememberEmail");
      }

      sessionStorage.setItem(
        "imajirekaLoggedIn",
        JSON.stringify({
          name: registeredAccount.name,
          email: registeredAccount.email
        })
      );

      showAccountMessage(
        `Selamat datang kembali, ${registeredAccount.name}!`,
        "success"
      );
    } catch (error) {
      showAccountMessage(error.message);
    }
  });
}

// ---- Create Account view ----
if (createAccount) {
  createAccount.addEventListener("click", () => {
    showRegisterView(true);
  });
}

if (backToLogin) {
  backToLogin.addEventListener("click", () => {
    showLoginView(true);
  });
}

// ---- Register ----
if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = registerName.value.trim();
    const email = registerEmail.value.trim().toLowerCase();
    const password = registerPassword.value;
    const confirmPassword = registerConfirmPassword.value;

    clearAccountMessage();

    if (name.length < 2) {
      showAccountMessage("Please enter your full name.");
      registerName.focus();
      return;
    }

    if (!registerEmail.checkValidity()) {
      showAccountMessage("Please enter a valid email address.");
      registerEmail.focus();
      return;
    }

    if (password.length < 6) {
      showAccountMessage("Password must contain at least 6 characters.");
      registerPassword.focus();
      return;
    }

    if (password !== confirmPassword) {
      showAccountMessage("Password confirmation does not match.");
      registerConfirmPassword.focus();
      return;
    }

    if (!registerTerms.checked) {
      showAccountMessage("Please agree to the Terms & Conditions and Privacy Policy.");
      return;
    }

    const existingAccount = getRegisteredAccount();

    if (existingAccount?.email === email) {
      showAccountMessage(
        "Email sudah terdaftar. Silakan kembali ke Login."
      );
      return;
    }

    try {
      const passwordHash = await hashPassword(password);

      saveRegisteredAccount({
        name,
        email,
        passwordHash,
        createdAt: new Date().toISOString()
      });

      localStorage.setItem("imajirekaRememberEmail", email);

      registerForm.reset();
      loginEmail.value = email;
      rememberMe.checked = true;

      showLoginView(false);
      showAccountMessage(
        "Akun berhasil dibuat. Silakan login dengan akun Imajireka kamu.",
        "success"
      );

      setTimeout(() => {
        loginEmail.focus();
      }, 100);
    } catch (error) {
      showAccountMessage(error.message);
    }
  });
}

// ---- Forgot Password ----
if (forgotPassword) {
  forgotPassword.addEventListener("click", () => {
    showAccountMessage(
      "Fitur reset password akan tersedia setelah sistem email Imajireka terhubung."
    );
  });
}

// ---- Social Login ----
socialButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const provider = button.dataset.provider;
    const isRegister = !registerView.hidden;
    const action = isRegister ? "Daftar" : "Login";

    showAccountMessage(
      `${action} dengan ${provider} akan tersedia setelah OAuth Imajireka terhubung.`
    );
  });
});

// ===== Wishlist Modal =====

const wishlistBtn = document.getElementById("wishlist-btn");
const wishlistModal = document.getElementById("wishlist-modal");
const wishlistClose = document.getElementById("wishlist-close");
const wishlistList = document.getElementById("wishlist-list");
const wishlistEmpty = document.getElementById("wishlist-empty");
const wishlistBadge = document.getElementById("wishlist-badge");
const wishlistCount = document.getElementById("wishlist-count");
const wishlistContinue = document.getElementById("wishlist-continue");
const wishlistShop = document.getElementById("wishlist-shop");
const wishlistOverlay = document.querySelector("[data-close-wishlist]");

const defaultWishlist = [
  {
    id: 1,
    name: "Magic Keyboard for iPad Air",
    price: "$260.00",
    oldPrice: "$280.00",
    stock: "In Stock",
    icon: "fa-keyboard"
  },
  {
    id: 2,
    name: "Wireless Fitness Earbuds",
    price: "$290.00",
    oldPrice: "",
    stock: "In Stock",
    icon: "fa-headphones-simple"
  },
  {
    id: 3,
    name: "High-Performance Earbuds",
    price: "$199.00",
    oldPrice: "$299.00",
    stock: "In Stock",
    icon: "fa-headphones"
  }
];

let wishlistItems = JSON.parse(
  localStorage.getItem("imajirekaWishlist") || "null"
);

if (!Array.isArray(wishlistItems)) {
  wishlistItems = defaultWishlist;
  localStorage.setItem(
    "imajirekaWishlist",
    JSON.stringify(wishlistItems)
  );
}

function saveWishlist() {
  localStorage.setItem(
    "imajirekaWishlist",
    JSON.stringify(wishlistItems)
  );
}

function updateWishlistBadge() {
  const total = wishlistItems.length;

  if (wishlistBadge) {
    wishlistBadge.textContent = total;
    wishlistBadge.style.display = total > 0 ? "flex" : "none";
  }

  if (wishlistCount) {
    wishlistCount.textContent =
      `${total} ${total === 1 ? "Item" : "Items"}`;
  }
}

function renderWishlist() {
  if (!wishlistList || !wishlistEmpty) return;

  wishlistList.innerHTML = "";

  if (wishlistItems.length === 0) {
    wishlistList.style.display = "none";
    wishlistEmpty.hidden = false;
    updateWishlistBadge();
    return;
  }

  wishlistList.style.display = "block";
  wishlistEmpty.hidden = true;

  wishlistItems.forEach((item) => {
    const row = document.createElement("div");
    row.className = "wishlist-item";
    row.dataset.id = item.id;

    row.innerHTML = `
      <button
        class="wishlist-remove"
        type="button"
        aria-label="Hapus ${item.name} dari wishlist"
        data-remove-wishlist="${item.id}"
      >
        <i class="fa-solid fa-xmark"></i>
      </button>

      <div class="wishlist-product">
        <div class="wishlist-product-thumb">
          <i class="fa-solid ${item.icon}"></i>
        </div>
        <div class="wishlist-product-info">
          <h3>${item.name}</h3>
          <p>Imajireka Merchandise</p>
        </div>
      </div>

      <div class="wishlist-price">
        <strong>${item.price}</strong>
        ${item.oldPrice ? `<del>${item.oldPrice}</del>` : ""}
      </div>

      <div class="wishlist-stock">${item.stock}</div>

      <button
        class="wishlist-add"
        type="button"
        data-add-cart="${item.id}"
      >
        Add to Cart
      </button>
    `;

    wishlistList.appendChild(row);
  });

  updateWishlistBadge();
}

function openWishlistModal() {
  if (!wishlistModal) return;

  renderWishlist();
  wishlistModal.classList.add("active");
  wishlistModal.setAttribute("aria-hidden", "false");
  wishlistBtn.setAttribute("aria-expanded", "true");
  document.body.classList.add("wishlist-open");
}

function closeWishlistModal() {
  if (!wishlistModal) return;

  wishlistModal.classList.remove("active");
  wishlistModal.setAttribute("aria-hidden", "true");
  wishlistBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("wishlist-open");
}

function removeWishlistItem(id) {
  wishlistItems = wishlistItems.filter(
    (item) => item.id !== Number(id)
  );

  saveWishlist();
  renderWishlist();
}

function addWishlistItemToCart(id) {
  const item = wishlistItems.find(
    (wishlistItem) => wishlistItem.id === Number(id)
  );

  if (!item) return;

  addItemToCart({
    id: item.id,
    name: item.name,
    price: parsePrice(item.price),
    oldPrice: item.oldPrice ? parsePrice(item.oldPrice) : null,
    icon: item.icon,
    size: "Standard",
    color: "Original"
  });

  const button = wishlistList.querySelector(
    `[data-add-cart="${id}"]`
  );

  if (button) {
    button.textContent = "Added";
    button.disabled = true;

    setTimeout(() => {
      if (!button.isConnected) return;
      button.textContent = "Add to Cart";
      button.disabled = false;
    }, 1200);
  }
}

if (wishlistBtn) {
  wishlistBtn.addEventListener("click", openWishlistModal);
}

if (wishlistClose) {
  wishlistClose.addEventListener("click", closeWishlistModal);
}

if (wishlistOverlay) {
  wishlistOverlay.addEventListener("click", closeWishlistModal);
}

if (wishlistContinue) {
  wishlistContinue.addEventListener("click", closeWishlistModal);
}

if (wishlistShop) {
  wishlistShop.addEventListener("click", () => {
    closeWishlistModal();
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth"
    });
  });
}

if (wishlistList) {
  wishlistList.addEventListener("click", (event) => {
    const removeButton = event.target.closest(
      "[data-remove-wishlist]"
    );

    const addButton = event.target.closest(
      "[data-add-cart]"
    );

    if (removeButton) {
      removeWishlistItem(removeButton.dataset.removeWishlist);
      return;
    }

    if (addButton) {
      addWishlistItemToCart(addButton.dataset.addCart);
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (
    event.key === "Escape" &&
    wishlistModal?.classList.contains("active")
  ) {
    closeWishlistModal();
  }
});

updateWishlistBadge();


// ===== Cart Modal =====

const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const cartClose = document.getElementById("cart-close");
const cartItemsEl = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartBadge = document.getElementById("cart-badge");
const cartCount = document.getElementById("cart-count");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartDiscount = document.getElementById("cart-discount");
const cartDiscountLabel = document.getElementById("cart-discount-label");
const cartDelivery = document.getElementById("cart-delivery");
const cartTotal = document.getElementById("cart-total");
const cartContinue = document.getElementById("cart-continue");
const cartShop = document.getElementById("cart-shop");
const cartOverlay = document.querySelector("[data-close-cart]");
const cartPromoCode = document.getElementById("cart-promo-code");
const cartPromoApply = document.getElementById("cart-promo-apply");
const cartPromoMessage = document.getElementById("cart-promo-message");
const cartCheckout = document.getElementById("cart-checkout");

const defaultCart = [
  {
    id: 1,
    name: "Magic Keyboard for iPad Air",
    price: 260,
    oldPrice: 280,
    quantity: 1,
    size: "Standard",
    color: "White",
    icon: "fa-keyboard"
  },
  {
    id: 2,
    name: "Wireless Fitness Earbuds",
    price: 290,
    oldPrice: null,
    quantity: 1,
    size: "Standard",
    color: "Black",
    icon: "fa-headphones-simple"
  },
  {
    id: 3,
    name: "High-Performance Earbuds",
    price: 199,
    oldPrice: 299,
    quantity: 1,
    size: "Standard",
    color: "White",
    icon: "fa-headphones"
  }
];

let cartItems = JSON.parse(
  localStorage.getItem("imajirekaCart") || "null"
);

if (!Array.isArray(cartItems)) {
  cartItems = defaultCart;
  localStorage.setItem("imajirekaCart", JSON.stringify(cartItems));
}

let cartDiscountRate = 0;
const deliveryFee = 15;

function parsePrice(value) {
  if (typeof value === "number") return value;
  return Number(String(value).replace(/[^0-9.]/g, "")) || 0;
}

function formatCurrency(value) {
  return `$${Number(value).toFixed(2)}`;
}

function saveCart() {
  localStorage.setItem("imajirekaCart", JSON.stringify(cartItems));
}

function getCartQuantity() {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

function updateCartBadge() {
  const total = getCartQuantity();

  if (cartBadge) {
    cartBadge.textContent = total;
    cartBadge.style.display = total > 0 ? "flex" : "none";
  }

  if (cartCount) {
    cartCount.textContent = `${total} ${total === 1 ? "Item" : "Items"}`;
  }
}

function calculateCart() {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = subtotal * cartDiscountRate;
  const delivery = cartItems.length > 0 ? deliveryFee : 0;
  const total = subtotal - discount + delivery;

  return { subtotal, discount, delivery, total };
}

function renderCart() {
  if (!cartItemsEl || !cartEmpty) return;

  cartItemsEl.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsEl.style.display = "none";
    cartEmpty.hidden = false;
  } else {
    cartItemsEl.style.display = "block";
    cartEmpty.hidden = true;

    cartItems.forEach((item) => {
      const row = document.createElement("div");
      row.className = "cart-item";
      row.dataset.id = item.id;

      row.innerHTML = `
        <div class="cart-product-thumb">
          <i class="fa-solid ${item.icon}"></i>
        </div>

        <div class="cart-product-info">
          <h3>${item.name}</h3>
          <p>Size: ${item.size}</p>
          <p>Color: ${item.color}</p>
          <strong>${formatCurrency(item.price)}</strong>
        </div>

        <button
          type="button"
          class="cart-remove"
          aria-label="Hapus ${item.name} dari keranjang"
          data-cart-remove="${item.id}"
        >
          <i class="fa-solid fa-trash-can"></i>
        </button>

        <div class="cart-quantity">
          <button type="button" aria-label="Kurangi jumlah" data-cart-minus="${item.id}">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span>${item.quantity}</span>
          <button type="button" aria-label="Tambah jumlah" data-cart-plus="${item.id}">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      `;

      cartItemsEl.appendChild(row);
    });
  }

  const summary = calculateCart();

  if (cartSubtotal) cartSubtotal.textContent = formatCurrency(summary.subtotal);
  if (cartDiscount) cartDiscount.textContent = `-${formatCurrency(summary.discount)}`;
  if (cartDiscountLabel) cartDiscountLabel.textContent = `(${Math.round(cartDiscountRate * 100)}%)`;
  if (cartDelivery) cartDelivery.textContent = formatCurrency(summary.delivery);
  if (cartTotal) cartTotal.textContent = formatCurrency(summary.total);

  updateCartBadge();
}

function addItemToCart(item) {
  const existing = cartItems.find((cartItem) => cartItem.id === Number(item.id));

  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({ ...item, quantity: item.quantity || 1 });
  }

  saveCart();
  renderCart();
}

function updateCartQuantity(id, change) {
  const item = cartItems.find((cartItem) => cartItem.id === Number(id));
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cartItems = cartItems.filter((cartItem) => cartItem.id !== Number(id));
  }

  saveCart();
  renderCart();
}

function removeCartItem(id) {
  cartItems = cartItems.filter(
    (item) => item.id !== Number(id)
  );

  saveCart();
  renderCart();
}

function openCartModal() {
  if (!cartModal) return;

  if (wishlistModal?.classList.contains("active")) {
    closeWishlistModal();
  }

  renderCart();
  cartModal.classList.add("active");
  cartModal.setAttribute("aria-hidden", "false");
  cartBtn.setAttribute("aria-expanded", "true");
  document.body.classList.add("cart-open");
}

function closeCartModal() {
  if (!cartModal) return;

  cartModal.classList.remove("active");
  cartModal.setAttribute("aria-hidden", "true");
  cartBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("cart-open");
}

if (cartBtn) {
  cartBtn.addEventListener("click", openCartModal);
}

if (cartClose) {
  cartClose.addEventListener("click", closeCartModal);
}

if (cartOverlay) {
  cartOverlay.addEventListener("click", closeCartModal);
}

if (cartContinue) {
  cartContinue.addEventListener("click", closeCartModal);
}

if (cartShop) {
  cartShop.addEventListener("click", () => {
    closeCartModal();
    document.getElementById("products")?.scrollIntoView({
      behavior: "smooth"
    });
  });
}

if (cartItemsEl) {
  cartItemsEl.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-cart-remove]");
    const minusButton = event.target.closest("[data-cart-minus]");
    const plusButton = event.target.closest("[data-cart-plus]");

    if (removeButton) {
      removeCartItem(removeButton.dataset.cartRemove);
      return;
    }

    if (minusButton) {
      updateCartQuantity(minusButton.dataset.cartMinus, -1);
      return;
    }

    if (plusButton) {
      updateCartQuantity(plusButton.dataset.cartPlus, 1);
    }
  });
}

if (cartPromoApply) {
  cartPromoApply.addEventListener("click", () => {
    const code = cartPromoCode.value.trim().toUpperCase();

    if (code === "IMAJIREKA20") {
      cartDiscountRate = 0.20;
      cartPromoMessage.textContent = "Promo IMAJIREKA20 applied successfully.";
      cartPromoMessage.classList.add("success");
      renderCart();
      return;
    }

    if (!code) {
      cartDiscountRate = 0;
      cartPromoMessage.textContent = "Enter a promo code first.";
      cartPromoMessage.classList.remove("success");
      renderCart();
      return;
    }

    cartDiscountRate = 0;
    cartPromoMessage.textContent = "Promo code not recognized.";
    cartPromoMessage.classList.remove("success");
    renderCart();
  });
}

if (cartCheckout) {
  cartCheckout.addEventListener("click", () => {
    if (cartItems.length === 0) {
      cartPromoMessage.textContent = "Your cart is empty.";
      cartPromoMessage.classList.remove("success");
      return;
    }

    cartPromoMessage.textContent = "Checkout flow will be connected next.";
    cartPromoMessage.classList.add("success");
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (cartModal?.classList.contains("active")) {
    closeCartModal();
    return;
  }

  if (wishlistModal?.classList.contains("active")) {
    closeWishlistModal();
  }
});

updateCartBadge();


// ===== Product Quick View Modal =====

const productModal = document.getElementById("product-modal");
const productModalClose = document.getElementById("product-modal-close");
const productModalOverlay = document.querySelector("[data-close-product]");
const productZoomArea = document.getElementById("product-zoom-area");
const productZoomImage = document.getElementById("product-zoom-image");
const productModalIcon = document.getElementById("product-modal-icon");
const productModalBadge = document.getElementById("product-modal-badge");
const productModalCategory = document.getElementById("product-modal-category");
const productModalTitle = document.getElementById("product-modal-title");
const productModalRating = document.getElementById("product-modal-rating");
const productReviewCount = document.getElementById("product-review-count");
const productSoldCount = document.getElementById("product-sold-count");
const productModalPrice = document.getElementById("product-modal-price");
const productModalOldPrice = document.getElementById("product-modal-old-price");
const productSelectedSize = document.getElementById("product-selected-size");
const productSelectedColor = document.getElementById("product-selected-color");
const productSizeList = document.getElementById("product-size-list");
const productColorList = document.getElementById("product-color-list");
const productQuantity = document.getElementById("product-quantity");
const productQuantityMinus = document.getElementById("product-quantity-minus");
const productQuantityPlus = document.getElementById("product-quantity-plus");
const productAddCart = document.getElementById("product-add-cart");
const productBuyNow = document.getElementById("product-buy-now");
const productWishlistToggle = document.getElementById("product-wishlist-toggle");
const productDetailsLink = document.getElementById("product-details-link");
const productModalMessage = document.getElementById("product-modal-message");
const productCards = document.querySelectorAll(".product-card[data-product-id]");

const productCatalog = [
  {
    id: 1,
    category: "Imajireka Tech",
    name: "Magic Keyboard for iPad Air",
    price: 260,
    oldPrice: 280,
    icon: "fa-keyboard",
    badge: "New",
    reviews: 12,
    sold: 41,
    rating: 5,
    sizes: ["Standard"],
    colors: [
      { name: "White", value: "#f7f5f1" },
      { name: "Graphite", value: "#55565a" },
      { name: "Sand", value: "#d8c2a6" }
    ]
  },
  {
    id: 2,
    category: "Imajireka Audio",
    name: "Wireless Fitness Earbuds",
    price: 290,
    oldPrice: null,
    icon: "fa-headphones-simple",
    badge: "",
    reviews: 18,
    sold: 35,
    rating: 5,
    sizes: ["Standard"],
    colors: [
      { name: "Black", value: "#2b2b2b" },
      { name: "White", value: "#f4f4f4" },
      { name: "Orange", value: "#f7931e" }
    ]
  },
  {
    id: 3,
    category: "Imajireka Audio",
    name: "High-Performance Earbuds",
    price: 199,
    oldPrice: 299,
    icon: "fa-headphones",
    badge: "-30%",
    reviews: 21,
    sold: 52,
    rating: 5,
    sizes: ["Standard"],
    colors: [
      { name: "White", value: "#f4f4f4" },
      { name: "Black", value: "#2b2b2b" }
    ]
  },
  {
    id: 4,
    category: "Imajireka Home",
    name: "HomePod mini - Blue",
    price: 249,
    oldPrice: null,
    icon: "fa-volume-high",
    badge: "",
    reviews: 14,
    sold: 29,
    rating: 5,
    sizes: ["Standard"],
    colors: [
      { name: "Blue", value: "#315b78" },
      { name: "White", value: "#f4f4f4" }
    ]
  },
  {
    id: 5,
    category: "Imajireka Accessories",
    name: "USB-C Charging Cable",
    price: 19,
    oldPrice: null,
    icon: "fa-plug",
    badge: "",
    reviews: 9,
    sold: 64,
    rating: 5,
    sizes: ["1m", "2m"],
    colors: [
      { name: "White", value: "#f4f4f4" },
      { name: "Black", value: "#2b2b2b" }
    ]
  },
  {
    id: 6,
    category: "Imajireka Wearable",
    name: "Sport Smart Watch",
    price: 213,
    oldPrice: 299,
    icon: "fa-clock",
    badge: "-29%",
    reviews: 27,
    sold: 46,
    rating: 5,
    sizes: ["40mm", "44mm"],
    colors: [
      { name: "Black", value: "#2b2b2b" },
      { name: "Silver", value: "#c7c7c7" },
      { name: "Orange", value: "#f7931e" }
    ]
  },
  {
    id: 7,
    category: "Imajireka Mobile",
    name: "Silicone Phone Case",
    price: 39,
    oldPrice: null,
    icon: "fa-mobile-screen-button",
    badge: "",
    reviews: 16,
    sold: 38,
    rating: 5,
    sizes: ["Standard"],
    colors: [
      { name: "Orange", value: "#f7931e" },
      { name: "Cream", value: "#fee6ca" },
      { name: "Black", value: "#2b2b2b" }
    ]
  },
  {
    id: 8,
    category: "Imajireka Gaming",
    name: "Wireless Game Controller",
    price: 99,
    oldPrice: 195,
    icon: "fa-gamepad",
    badge: "-49%",
    reviews: 24,
    sold: 43,
    rating: 5,
    sizes: ["Standard"],
    colors: [
      { name: "Black", value: "#2b2b2b" },
      { name: "White", value: "#f4f4f4" }
    ]
  }
];

let activeProduct = null;
let selectedProductSize = "Standard";
let selectedProductColor = "Original";
let selectedProductQuantity = 1;

function getProductById(id) {
  return productCatalog.find((product) => product.id === Number(id));
}

function isProductInWishlist(productId) {
  return wishlistItems.some((item) => item.id === Number(productId));
}

function updateProductWishlistButton() {
  if (!productWishlistToggle || !activeProduct) return;

  const active = isProductInWishlist(activeProduct.id);
  productWishlistToggle.classList.toggle("active", active);
  productWishlistToggle.setAttribute(
    "aria-label",
    active ? "Hapus dari wishlist" : "Tambah ke wishlist"
  );
  productWishlistToggle.innerHTML = active
    ? '<i class="fa-solid fa-heart"></i>'
    : '<i class="fa-regular fa-heart"></i>';
}

function renderProductOptions(product) {
  if (productSizeList) {
    productSizeList.innerHTML = product.sizes.map((size) => `
      <button
        type="button"
        class="product-size-btn ${size === selectedProductSize ? "active" : ""}"
        data-product-size="${size}"
      >
        ${size}
      </button>
    `).join("");
  }

  if (productColorList) {
    productColorList.innerHTML = product.colors.map((color, index) => `
      <button
        type="button"
        class="product-color-btn ${color.name === selectedProductColor || (!selectedProductColor && index === 0) ? "active" : ""}"
        data-product-color="${color.name}"
        aria-label="Pilih warna ${color.name}"
        title="${color.name}"
      >
        <span style="--color: ${color.value};"></span>
      </button>
    `).join("");
  }
}

function renderProductModal(product) {
  activeProduct = product;
  selectedProductSize = product.sizes[0];
  selectedProductColor = product.colors[0]?.name || "Original";
  selectedProductQuantity = 1;

  if (productModalBadge) {
    productModalBadge.textContent = product.badge || "Imajireka";
    productModalBadge.style.display = product.badge ? "inline-flex" : "none";
  }

  if (productModalCategory) productModalCategory.textContent = product.category;
  if (productModalTitle) productModalTitle.textContent = product.name;
  if (productModalIcon) productModalIcon.className = `fa-solid ${product.icon}`;
  if (productModalPrice) productModalPrice.textContent = formatCurrency(product.price);

  if (productModalOldPrice) {
    productModalOldPrice.textContent = product.oldPrice ? formatCurrency(product.oldPrice) : "";
    productModalOldPrice.style.display = product.oldPrice ? "inline" : "none";
  }

  if (productReviewCount) {
    productReviewCount.textContent = `(${product.reviews} reviews)`;
  }

  if (productModalRating) {
    const stars = productModalRating.querySelector(".rating-stars");
    if (stars) stars.textContent = "★".repeat(product.rating) + "☆".repeat(5 - product.rating);
  }

  if (productSoldCount) {
    productSoldCount.textContent = `${product.sold} sold in last 16 hours`;
  }

  if (productSelectedSize) productSelectedSize.textContent = selectedProductSize;
  if (productSelectedColor) productSelectedColor.textContent = selectedProductColor;
  if (productQuantity) productQuantity.textContent = selectedProductQuantity;
  if (productModalMessage) productModalMessage.textContent = "";

  renderProductOptions(product);
  updateProductWishlistButton();
}

function openProductModal(productId) {
  const product = getProductById(productId);
  if (!product || !productModal) return;

  if (loginModal?.classList.contains("active")) closeLoginModal();
  if (wishlistModal?.classList.contains("active")) closeWishlistModal();
  if (cartModal?.classList.contains("active")) closeCartModal();

  renderProductModal(product);
  productModal.classList.add("active");
  productModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("product-open");
  productZoomArea?.classList.remove("is-zoomed");

  setTimeout(() => productModalClose?.focus(), 150);
}

function closeProductModal() {
  if (!productModal) return;

  productModal.classList.remove("active");
  productModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("product-open");
  productZoomArea?.classList.remove("is-zoomed");
}

function showProductMessage(message) {
  if (!productModalMessage) return;
  productModalMessage.textContent = message;
}

function toggleProductWishlist() {
  if (!activeProduct) return;

  const existing = wishlistItems.find((item) => item.id === activeProduct.id);

  if (existing) {
    wishlistItems = wishlistItems.filter((item) => item.id !== activeProduct.id);
    showProductMessage("Product removed from your wishlist.");
  } else {
    wishlistItems.push({
      id: activeProduct.id,
      name: activeProduct.name,
      price: formatCurrency(activeProduct.price),
      oldPrice: activeProduct.oldPrice ? formatCurrency(activeProduct.oldPrice) : "",
      stock: "In Stock",
      icon: activeProduct.icon
    });
    showProductMessage("Product added to your wishlist.");
  }

  saveWishlist();
  renderWishlist();
  updateProductWishlistButton();
}

function addActiveProductToCart(openCartAfter = false) {
  if (!activeProduct) return;

  addItemToCart({
    id: activeProduct.id,
    name: activeProduct.name,
    price: activeProduct.price,
    oldPrice: activeProduct.oldPrice,
    icon: activeProduct.icon,
    size: selectedProductSize,
    color: selectedProductColor,
    quantity: selectedProductQuantity
  });

  showProductMessage(`${activeProduct.name} added to your cart.`);

  if (openCartAfter) {
    setTimeout(() => {
      closeProductModal();
      openCartModal();
    }, 500);
  }
}

if (productCards.length) {
  productCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.preventDefault();
      openProductModal(card.dataset.productId);
    });
  });
}

if (productModalClose) {
  productModalClose.addEventListener("click", closeProductModal);
}

if (productModalOverlay) {
  productModalOverlay.addEventListener("click", closeProductModal);
}

if (productZoomArea) {
  productZoomArea.addEventListener("mouseenter", () => {
    productZoomArea.classList.add("is-zoomed");
  });

  productZoomArea.addEventListener("mousemove", (event) => {
    const rect = productZoomArea.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    productZoomImage.style.setProperty("--zoom-x", `${x}%`);
    productZoomImage.style.setProperty("--zoom-y", `${y}%`);
  });

  productZoomArea.addEventListener("mouseleave", () => {
    productZoomArea.classList.remove("is-zoomed");
    productZoomImage.style.setProperty("--zoom-x", "50%");
    productZoomImage.style.setProperty("--zoom-y", "50%");
  });
}

if (productSizeList) {
  productSizeList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-size]");
    if (!button) return;

    selectedProductSize = button.dataset.productSize;
    productSelectedSize.textContent = selectedProductSize;

    productSizeList.querySelectorAll(".product-size-btn").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
  });
}

if (productColorList) {
  productColorList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-color]");
    if (!button) return;

    selectedProductColor = button.dataset.productColor;
    productSelectedColor.textContent = selectedProductColor;

    productColorList.querySelectorAll(".product-color-btn").forEach((item) => {
      item.classList.toggle("active", item === button);
    });
  });
}

if (productQuantityMinus) {
  productQuantityMinus.addEventListener("click", () => {
    selectedProductQuantity = Math.max(1, selectedProductQuantity - 1);
    productQuantity.textContent = selectedProductQuantity;
  });
}

if (productQuantityPlus) {
  productQuantityPlus.addEventListener("click", () => {
    selectedProductQuantity = Math.min(99, selectedProductQuantity + 1);
    productQuantity.textContent = selectedProductQuantity;
  });
}

if (productAddCart) {
  productAddCart.addEventListener("click", () => {
    addActiveProductToCart(false);
  });
}

if (productBuyNow) {
  productBuyNow.addEventListener("click", () => {
    addActiveProductToCart(true);
  });
}

if (productWishlistToggle) {
  productWishlistToggle.addEventListener("click", toggleProductWishlist);
}

if (productDetailsLink) {
  productDetailsLink.addEventListener("click", () => {
    showProductMessage("Full product detail page will be connected next.");
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && productModal?.classList.contains("active")) {
    closeProductModal();
  }
});


// ===================== SEARCH MODAL =====================
const searchBtn = document.getElementById("search-btn");
const searchModal = document.getElementById("search-modal");
const searchClose = document.getElementById("search-close");
const searchOverlay = document.querySelector("[data-close-search]");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchClear = document.getElementById("search-clear");
const searchPopular = document.getElementById("search-popular");
const searchResults = document.getElementById("search-results");
const searchMessage = document.getElementById("search-message");
const searchTags = document.querySelectorAll("[data-search-term]");

let lastSearchFocusedElement = null;

function openSearchModal() {
  if (!searchModal) return;

  lastSearchFocusedElement = document.activeElement;

  searchModal.classList.add("active");
  searchModal.setAttribute("aria-hidden", "false");
  searchBtn?.setAttribute("aria-expanded", "true");
  document.body.classList.add("search-open");

  renderSearchResults("");

  setTimeout(() => {
    searchInput?.focus();
  }, 180);
}

function closeSearchModal() {
  if (!searchModal) return;

  searchModal.classList.remove("active");
  searchModal.setAttribute("aria-hidden", "true");
  searchBtn?.setAttribute("aria-expanded", "false");
  document.body.classList.remove("search-open");

  if (lastSearchFocusedElement) {
    lastSearchFocusedElement.focus();
  }
}

function normalizeSearchText(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function renderSearchResults(query) {
  if (!searchResults || !searchPopular) return;

  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    searchPopular.hidden = false;
    searchResults.classList.remove("has-results");
    searchResults.innerHTML = "";
    searchMessage.textContent = "";
    searchClear?.classList.remove("visible");
    return;
  }

  searchPopular.hidden = true;
  searchResults.classList.add("has-results");
  searchClear?.classList.add("visible");

  const matches = productCatalog.filter((product) => {
    const searchableText = normalizeSearchText(
      `${product.name} ${product.category} ${product.badge || ""}`
    );

    return searchableText.includes(normalizedQuery);
  });

  if (!matches.length) {
    searchResults.innerHTML = `
      <div class="search-empty">
        <i class="fa-regular fa-face-frown"></i>
        <h3>No products found</h3>
        <p>Try another keyword or explore our popular searches.</p>
      </div>
    `;
    searchMessage.textContent = "";
    return;
  }

  searchResults.innerHTML = matches
    .slice(0, 6)
    .map((product) => {
      const price = formatCurrency(product.price);

      return `
        <button
          type="button"
          class="search-result-item"
          data-search-product-id="${product.id}"
        >
          <span class="search-result-thumb">
            <i class="fa-solid ${product.icon}"></i>
          </span>
          <span class="search-result-info">
            <span class="search-result-category">${product.category}</span>
            <span class="search-result-name">${product.name}</span>
            <span class="search-result-price">${price}</span>
          </span>
          <span class="search-result-arrow">
            <i class="fa-solid fa-arrow-right"></i>
          </span>
        </button>
      `;
    })
    .join("");

  searchMessage.textContent = `${matches.length} product${matches.length > 1 ? "s" : ""} found`;
}

if (searchBtn) {
  searchBtn.addEventListener("click", openSearchModal);
}

if (searchClose) {
  searchClose.addEventListener("click", closeSearchModal);
}

if (searchOverlay) {
  searchOverlay.addEventListener("click", closeSearchModal);
}

if (searchForm) {
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    renderSearchResults(searchInput.value);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    renderSearchResults(searchInput.value);
  });
}

if (searchClear) {
  searchClear.addEventListener("click", () => {
    searchInput.value = "";
    renderSearchResults("");
    searchInput.focus();
  });
}

searchTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    const term = tag.dataset.searchTerm || "";
    searchInput.value = term;
    renderSearchResults(term);
    searchInput.focus();
  });
});

if (searchResults) {
  searchResults.addEventListener("click", (event) => {
    const result = event.target.closest("[data-search-product-id]");
    if (!result) return;

    const productId = result.dataset.searchProductId;

    closeSearchModal();

    setTimeout(() => {
      openProductModal(productId);
    }, 120);
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (searchModal?.classList.contains("active")) {
    closeSearchModal();
  }
});


// ===================== NAVBAR SECTION ACTIVE =====================
const navLinks = document.querySelectorAll("[data-nav-section]");
const navSections = Array.from(navLinks)
  .map((link) => document.getElementById(link.dataset.navSection))
  .filter(Boolean);

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    const isActive = link.dataset.navSection === sectionId;
    link.classList.toggle("active", isActive);
    link.setAttribute("aria-current", isActive ? "page" : "false");
  });
}

if (navLinks.length && navSections.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length) {
        setActiveNav(visibleSections[0].target.id);
      }
    },
    {
      root: null,
      rootMargin: "-88px 0px -45% 0px",
      threshold: [0.1, 0.25, 0.5, 0.75],
    }
  );

  navSections.forEach((section) => navObserver.observe(section));

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.dataset.navSection;
      if (targetId) setActiveNav(targetId);
    });
  });
}


// ===================== MOBILE BOTTOM NAVIGATION =====================
const mobileNavActions = document.querySelectorAll("[data-mobile-action]");

mobileNavActions.forEach((action) => {
  action.addEventListener("click", () => {
    const target = action.dataset.mobileAction;

    if (target === "wishlist") {
      document.getElementById("wishlist-btn")?.click();
    }

    if (target === "account") {
      document.getElementById("account-btn")?.click();
    }
  });
});

// Keep the mobile wishlist badge synchronized with the desktop badge.
const mobileWishlistBadge = document.getElementById("mobile-wishlist-badge");

function syncMobileWishlistBadge() {
  const desktopBadge = document.getElementById("wishlist-badge");

  if (!mobileWishlistBadge || !desktopBadge) return;

  mobileWishlistBadge.textContent = desktopBadge.textContent;
  mobileWishlistBadge.style.display =
    desktopBadge.style.display === "none" ? "none" : "flex";
}

syncMobileWishlistBadge();

if (wishlistBadge && mobileWishlistBadge) {
  const wishlistBadgeObserver = new MutationObserver(syncMobileWishlistBadge);

  wishlistBadgeObserver.observe(wishlistBadge, {
    childList: true,
    characterData: true,
    attributes: true,
    subtree: true,
  });
}


// ===================== TABLET HAMBURGER MENU =====================
const menuToggle = document.querySelector(".menu-toggle");
const tabletMenuPanel = document.getElementById("tablet-menu-panel");
const tabletMenuLinks = document.querySelectorAll(".tablet-menu-link");

function closeTabletMenu() {
  if (!menuToggle || !tabletMenuPanel) return;

  menuToggle.classList.remove("active");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu");

  tabletMenuPanel.classList.remove("active");
  tabletMenuPanel.setAttribute("aria-hidden", "true");
}

function toggleTabletMenu() {
  if (!menuToggle || !tabletMenuPanel) return;

  const isOpen = tabletMenuPanel.classList.toggle("active");

  menuToggle.classList.toggle("active", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
  tabletMenuPanel.setAttribute("aria-hidden", isOpen ? "false" : "true");
}

if (menuToggle && tabletMenuPanel) {
  menuToggle.setAttribute("aria-controls", "tablet-menu-panel");
  menuToggle.setAttribute("aria-expanded", "false");

  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleTabletMenu();
  });

  tabletMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.dataset.navSection;
      if (targetId) setActiveNav(targetId);
      closeTabletMenu();
    });
  });

  document.addEventListener("click", (event) => {
    if (!tabletMenuPanel.classList.contains("active")) return;

    if (
      !tabletMenuPanel.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeTabletMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeTabletMenu();
    }
  });
}


// ===================== ACCOUNT STATE & POPUP =====================

const accountPopupWrapper = document.getElementById("account-popup-wrapper");
const accountPopupClose = document.getElementById("account-popup-close");
const accountPopupEmail = document.getElementById("account-popup-email");
const accountAvatar = document.getElementById("account-avatar");
const accountLogout = document.getElementById("account-logout");

const accountPageWrapper = document.getElementById("account-page-wrapper");
const accountPageClose = document.getElementById("account-page-close");
const accountPageEmail = document.getElementById("account-page-email");
const accountPageAvatar = document.getElementById("account-page-avatar");

const ACCOUNT_STORAGE_KEY = "imajirekaAccount";
const ACCOUNT_SESSION_KEY = "imajirekaLoggedIn";

function getStoredAccount() {
  try {
    return JSON.parse(localStorage.getItem(ACCOUNT_STORAGE_KEY));
  } catch (error) {
    return null;
  }
}

function isUserLoggedIn() {
  return localStorage.getItem(ACCOUNT_SESSION_KEY) === "true";
}

function getInitials(name = "I") {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
  }

  return (words[0]?.[0] || "I").toUpperCase();
}

function updateAccountUI() {
  const account = getStoredAccount();

  if (!account || !isUserLoggedIn()) return;

  const name = account.name || "Imajireka User";
  const email = account.email || "";

  const initials = getInitials(name);

  if (accountPopupEmail) {
    accountPopupEmail.textContent = email;
  }

  if (accountPageEmail) {
    accountPageEmail.textContent = email;
  }

  if (accountAvatar) {
    accountAvatar.textContent = initials;
  }

  if (accountPageAvatar) {
    accountPageAvatar.textContent = initials;
  }

  const accountPopupTitle = document.getElementById("account-popup-title");

  if (accountPopupTitle) {
    accountPopupTitle.textContent = `Hello, ${name.split(" ")[0]}! 👋`;
  }

  const accountPageTitle = document.getElementById("account-page-title");

  if (accountPageTitle) {
    accountPageTitle.textContent = `Welcome back, ${name.split(" ")[0]}!`;
  }
}

function openAccountPopup() {
  if (!accountPopupWrapper) return;

  updateAccountUI();

  accountPopupWrapper.classList.add("active");
  accountPopupWrapper.setAttribute("aria-hidden", "false");

  document.body.classList.add("account-popup-open");
}

function closeAccountPopup() {
  if (!accountPopupWrapper) return;

  accountPopupWrapper.classList.remove("active");
  accountPopupWrapper.setAttribute("aria-hidden", "true");

  document.body.classList.remove("account-popup-open");
}

function openAccountPage() {
  if (!accountPageWrapper) return;

  closeAccountPopup();
  updateAccountUI();

  accountPageWrapper.classList.add("active");
  accountPageWrapper.setAttribute("aria-hidden", "false");

  document.body.classList.add("account-page-open");
}

function closeAccountPage() {
  if (!accountPageWrapper) return;

  accountPageWrapper.classList.remove("active");
  accountPageWrapper.setAttribute("aria-hidden", "true");

  document.body.classList.remove("account-page-open");
}

// Override the existing account button behavior when logged in.
if (accountBtn) {
  accountBtn.addEventListener("click", (event) => {
    if (!isUserLoggedIn()) return;

    event.stopImmediatePropagation();

    openAccountPopup();
  }, true);
}

if (accountPopupClose) {
  accountPopupClose.addEventListener("click", closeAccountPopup);
}

document.querySelector("[data-close-account]")?.addEventListener(
  "click",
  closeAccountPopup
);

if (accountPageClose) {
  accountPageClose.addEventListener("click", closeAccountPage);
}

document.querySelector("[data-close-account-page]")?.addEventListener(
  "click",
  closeAccountPage
);

document.querySelectorAll("[data-account-page]").forEach((item) => {
  item.addEventListener("click", () => {
    const page = item.dataset.accountPage;

    if (page === "account") {
      openAccountPage();
      return;
    }

    if (page === "wishlist") {
      closeAccountPopup();
      document.getElementById("wishlist-btn")?.click();
      return;
    }

    // Orders and addresses are prepared for the next development stage.
    openAccountPage();

    const message = document.getElementById("account-page-title");

    if (message) {
      if (page === "orders") {
        message.textContent = "My Orders";
      }

      if (page === "addresses") {
        message.textContent = "Addresses";
      }
    }
  });
});

document.querySelectorAll("[data-account-page-card]").forEach((card) => {
  card.addEventListener("click", () => {
    const page = card.dataset.accountPageCard;

    if (page === "wishlist") {
      closeAccountPage();
      document.getElementById("wishlist-btn")?.click();
      return;
    }

    if (page === "orders") {
      document.getElementById("account-page-title").textContent = "My Orders";
      return;
    }

    if (page === "addresses") {
      document.getElementById("account-page-title").textContent = "Addresses";
      return;
    }

    document.getElementById("account-page-title").textContent = "Personal Information";
  });
});

if (accountLogout) {
  accountLogout.addEventListener("click", () => {
    localStorage.removeItem(ACCOUNT_SESSION_KEY);

    closeAccountPopup();
    closeAccountPage();

    // Return the navbar account button to the login state.
    if (accountBtn) {
      accountBtn.setAttribute("aria-label", "Akun");
    }

    // Existing login modal remains available for the next login.
    openLoginModal();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (accountPopupWrapper?.classList.contains("active")) {
    closeAccountPopup();
    return;
  }

  if (accountPageWrapper?.classList.contains("active")) {
    closeAccountPage();
  }
});

updateAccountUI();
