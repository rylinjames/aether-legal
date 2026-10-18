(() => {
  "use strict";

  // Assemble the address only after a visitor asks to reveal it.
  const supportAddress = () => ["delia", "support"].join("") + "@" + ["gmail", "com"].join(".");

  document.querySelectorAll("[data-support-contact]").forEach((contact) => {
    const reveal = contact.querySelector("[data-reveal-email]");
    const details = contact.querySelector(".support-contact__details");
    const address = contact.querySelector("[data-support-address]");
    const openEmail = contact.querySelector("[data-open-email]");
    const copy = contact.querySelector("[data-copy-email]");
    const status = contact.querySelector("[data-copy-status]");

    reveal.addEventListener("click", () => {
      const expanded = reveal.getAttribute("aria-expanded") === "true";
      details.hidden = expanded;
      reveal.setAttribute("aria-expanded", String(!expanded));
      reveal.textContent = expanded ? "Show support email" : "Hide support email";
      status.textContent = "";
      if (expanded) {
        address.textContent = "";
        openEmail.removeAttribute("href");
      } else {
        address.textContent = supportAddress();
        openEmail.href = "mailto:" + supportAddress() + "?subject=Delia%20support";
      }
    });

    copy.addEventListener("click", async () => {
      copy.disabled = true;
      try {
        await navigator.clipboard.writeText(supportAddress());
        status.textContent = "Email address copied.";
      } catch {
        status.textContent = "Select the email address above to copy it manually.";
      } finally {
        copy.disabled = false;
      }
    });
  });
})();
