document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const emailInput = document.getElementById("login-email");
  const passwordInput = document.getElementById("login-password");
  const roleSelect = document.getElementById("role"); // Role tetap ada
  const rememberMeCheckbox = document.getElementById("remember-me");
  const passwordToggle = document.querySelector(".password-toggle");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;

      // Reset pesan error
      document.querySelectorAll(".error-message").forEach((error) => {
        error.textContent = "";
        error.style.display = "none";
      });

      // Validasi Email
      if (!emailInput.value.trim()) {
        setError(emailInput, "Email tidak boleh kosong");
        isValid = false;
      } else if (!validateEmail(emailInput.value.trim())) {
        setError(emailInput, "Email harus mengandung '@' dan domain");
        isValid = false;
      }

      // Validasi Password
      if (!passwordInput.value.trim()) {
        setError(passwordInput, "Password tidak boleh kosong");
        isValid = false;
      } else if (!validatePassword(passwordInput.value.trim())) {
        setError(
          passwordInput,
          "Password minimal 8 karakter dan harus mengandung huruf"
        );
        isValid = false;
      }

      // Validasi Role (Pastikan pengguna memilih peran)
      if (!roleSelect.value) {
        setError(roleSelect, "Role harus dipilih");
        isValid = false;
      }

      if (isValid) {
        const role = roleSelect.value;
        if (rememberMeCheckbox.checked) {
          localStorage.setItem("rememberedEmail", emailInput.value.trim());
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        alert(`Login berhasil sebagai ${role}`);
        window.location.href =
          role === "admin" ? "dashboardAdmin.html" : "user-dashboard.html";
      }
    });

    // Ingat Email jika sebelumnya dicentang
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      emailInput.value = rememberedEmail;
      rememberMeCheckbox.checked = true;
    }
  }

  // Toggle Password Visibility
  if (passwordToggle) {
    passwordToggle.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        passwordToggle.classList.add("visible");
      } else {
        passwordInput.type = "password";
        passwordToggle.classList.remove("visible");
      }
    });
  }

  // Fungsi Set Error
  function setError(input, message) {
    const formGroup = input.closest(".form-group");
    if (!formGroup) return;

    let errorMessage = formGroup.querySelector(".error-message");
    if (!errorMessage) {
      errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      formGroup.appendChild(errorMessage);
    }

    errorMessage.textContent = message;
    errorMessage.style.color = "white";
    errorMessage.style.marginTop = "8px";
    errorMessage.style.fontSize = "12px";
    errorMessage.style.display = "block";
  }

  // Fungsi Remove Error
  function removeError(input) {
    const errorMessage = input
      .closest(".form-group")
      ?.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.textContent = "";
      errorMessage.style.display = "none";
    }
  }

  // Fungsi Validasi Email
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Fungsi Validasi Password (Minimal 8 karakter dan harus mengandung setidaknya 1 huruf)
  function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }
});
