document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form");
  const nameInput = document.getElementById("signup-name");
  const emailInput = document.getElementById("signup-email");
  const passwordInput = document.getElementById("signup-password");
  const confirmPasswordInput = document.getElementById(
    "signup-confirm-password"
  );
  const agreeTermsCheckbox = document.getElementById("agree-terms");
  const passwordToggle = document.querySelectorAll(".password-toggle");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah halaman refresh sebelum validasi

      let isValid = true;

      // Reset pesan error
      document.querySelectorAll(".error-message").forEach((el) => {
        el.textContent = "";
        el.style.display = "none"; // Sembunyikan jika tidak ada error
      });

      // Validasi Nama Lengkap
      if (!nameInput.value.trim()) {
        setError(nameInput, "Nama lengkap tidak boleh kosong");
        isValid = false;
      }

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
          "Password minimal 8 karakter dan harus mengandung huruf & angka"
        );
        isValid = false;
      }

      // Validasi Konfirmasi Password
      if (!confirmPasswordInput.value.trim()) {
        setError(
          confirmPasswordInput,
          "Konfirmasi password tidak boleh kosong"
        );
        isValid = false;
      } else if (
        confirmPasswordInput.value.trim() !== passwordInput.value.trim()
      ) {
        setError(confirmPasswordInput, "Password dan konfirmasi tidak cocok");
        isValid = false;
      }

      // Validasi Checkbox Syarat & Ketentuan
      if (!agreeTermsCheckbox.checked) {
        setError(
          agreeTermsCheckbox,
          "Anda harus menyetujui syarat & ketentuan"
        );
        isValid = false;
      }

      if (isValid) {
        alert(`Pendaftaran berhasil!`);
        window.location.href = "login.html";
      }
    });
  }

  // Toggle Password Visibility untuk semua field password
  if (passwordToggle.length > 0) {
    passwordToggle.forEach((toggle) => {
      toggle.addEventListener("click", function () {
        const inputField =
          this.closest(".password-input").querySelector("input");
        if (inputField.type === "password") {
          inputField.type = "text";
          this.classList.add("visible");
        } else {
          inputField.type = "password";
          this.classList.remove("visible");
        }
      });
    });
  }

  // Validasi Password saat mengetik untuk feedback real-time
  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      if (this.value.trim() === "") {
        removeError(this);
      } else if (!validatePassword(this.value.trim())) {
        setError(
          this,
          "Password minimal 8 karakter dan harus mengandung huruf & angka"
        );
      } else {
        removeError(this);
      }
    });
  }

  // Validasi Konfirmasi Password saat mengetik
  if (confirmPasswordInput && passwordInput) {
    confirmPasswordInput.addEventListener("input", function () {
      if (this.value.trim() === "") {
        removeError(this);
      } else if (this.value.trim() !== passwordInput.value.trim()) {
        setError(this, "Password dan konfirmasi tidak cocok");
      } else {
        removeError(this);
      }
    });
  }

  // Fungsi Set Error
  function setError(input, message) {
    const formGroup = input.closest(".form-group");
    if (!formGroup) return; // Pastikan elemen form-group ada

    let errorMessage = formGroup.querySelector(".error-message");

    if (!errorMessage) {
      errorMessage = document.createElement("div");
      errorMessage.className = "error-message";
      formGroup.appendChild(errorMessage); // Tambahkan error message jika belum ada
    }

    errorMessage.textContent = message;
    errorMessage.style.color = "white"; // Mengubah warna peringatan menjadi putih
    errorMessage.style.marginTop = "8px"; // Memindahkan lebih ke bawah
    errorMessage.style.fontSize = "12px"; // Sesuaikan ukuran teks
    errorMessage.style.display = "block"; // Pastikan pesan error terlihat
  }

  // Fungsi Remove Error
  function removeError(input) {
    const errorMessage = input
      .closest(".form-group")
      ?.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.textContent = "";
      errorMessage.style.display = "none"; // Sembunyikan pesan error
    }
  }

  // Fungsi Validasi Email
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Fungsi Validasi Password (Minimal 8 karakter, harus ada huruf & angka)
  function validatePassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }
});
