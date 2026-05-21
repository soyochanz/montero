const navToggle = document.querySelector(".nav-toggle");
const body = document.body;
const navLinks = document.querySelectorAll(".main-nav a");

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;
    document.querySelectorAll(".faq-list details").forEach((other) => {
      if (other !== item) other.removeAttribute("open");
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const bookingForm = document.querySelector("[data-booking-form]");
const freshaUrl =
  "https://www.fresha.com/book-now/montero-barbershop-re9evcnz/services?lid=2989765&share=true&pId=2890036";
const nextBookingButton = document.querySelector("[data-next-booking]");
const prevBookingButton = document.querySelector("[data-prev-booking]");
const serviceScreen = document.querySelector('[data-booking-screen="services"]');
const barberScreen = document.querySelector('[data-booking-screen="barber"]');
const serviceError = document.querySelector('[data-booking-error="services"]');
const barberError = document.querySelector('[data-booking-error="barber"]');
const bookingSummary = document.querySelector("[data-booking-summary]");
const stepOneDot = document.querySelector('[data-step-dot="1"]');
const stepTwoDot = document.querySelector('[data-step-dot="2"]');

const selectedService = () => document.querySelector('input[name="service"]:checked')?.value;

const selectedBarber = () => document.querySelector('input[name="barber"]:checked')?.value;

const setBookingStep = (step) => {
  const isBarberStep = step === "barber";
  serviceScreen?.classList.toggle("is-active", !isBarberStep);
  barberScreen?.classList.toggle("is-active", isBarberStep);
  stepOneDot?.classList.toggle("is-active", !isBarberStep);
  stepTwoDot?.classList.toggle("is-active", isBarberStep);

  if (bookingSummary) {
    const service = selectedService();
    bookingSummary.textContent = service ? `Servicio seleccionado: ${service}` : "Servicio seleccionado: ninguno";
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
};

nextBookingButton?.addEventListener("click", () => {
  if (!selectedService()) {
    if (serviceError) serviceError.hidden = false;
    return;
  }
  if (serviceError) serviceError.hidden = true;
  setBookingStep("barber");
});

prevBookingButton?.addEventListener("click", () => {
  if (barberError) barberError.hidden = true;
  setBookingStep("services");
});

document.querySelectorAll('input[name="service"]').forEach((input) => {
  input.addEventListener("change", () => {
    if (serviceError && selectedService()) serviceError.hidden = true;
  });
});

document.querySelectorAll('input[name="barber"]').forEach((input) => {
  input.addEventListener("change", () => {
    if (barberError && selectedBarber()) barberError.hidden = true;
  });
});

bookingForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!selectedService()) {
    if (serviceError) serviceError.hidden = false;
    setBookingStep("services");
    return;
  }

  if (!selectedBarber()) {
    if (barberError) barberError.hidden = false;
    return;
  }

  window.location.href = freshaUrl;
});

window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "stroke-width": 1.8
      }
    });
  }
});
