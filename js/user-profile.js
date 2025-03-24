document.addEventListener("DOMContentLoaded", function () {
  // --- Tab Switching ---
  const tabButtons = document.querySelectorAll(".profile-tab-btn");
  const tabContents = document.querySelectorAll(".profile-tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const target = this.getAttribute("data-target");

      // Hapus class 'active' dari semua tab dan tombol
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((tab) => tab.classList.remove("active"));

      // Tambahkan class 'active' ke tab yang sesuai
      document.getElementById(target).classList.add("active");
      this.classList.add("active");
    });
  });

  // --- Toggle Switch for Two-Factor Authentication ---
  const tfaToggle = document.getElementById("tfa-toggle");
  const tfaLabel = document.querySelector(".toggle-label");

  if (tfaToggle) {
    tfaToggle.addEventListener("change", function () {
      tfaLabel.textContent = this.checked ? "Enabled" : "Disabled";
    });
  }

  // --- Toggle Switch for Notifications ---
  const notificationToggles = document.querySelectorAll(".toggle-switch input");

  notificationToggles.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      const status = this.checked ? "ON" : "OFF";
      console.log(`Notification "${this.id}" switched to ${status}`);
    });
  });

  // --- Form Submission Alerts ---
  document.querySelectorAll(".profile-form").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // Mencegah refresh halaman
      alert("Changes have been saved successfully!");
    });
  });
});
