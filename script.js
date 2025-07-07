// ========= CONFIG ========= //

const target = document.getElementById("scrambleText");
const button = document.getElementById("toggleBtn");
const message = "Deciphered. Click Here!";
const scrambleChars =
  "!@#$%^&*abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
let isDecoded = false;

const quotes = document.querySelectorAll(".quote");

// ========= SCRAMBLE FUNCTION ========= //

function scrambleText(el, finalText, duration = 1500) {
  let iterations = 0;
  const interval = 30;
  const steps = duration / interval;

  const scramble = setInterval(() => {
    const scrambled = finalText
      .split("")
      .map((char, i) => {
        if (i < iterations) return char;
        return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
      })
      .join("");
    el.textContent = scrambled;

    iterations++;
    if (iterations > finalText.length) clearInterval(scramble);
  }, interval);
}

// ========= TOGGLE DECRYPT ========= //

button.addEventListener("click", () => {
  if (isDecoded) {
    scrambleText(target, "*&@#$#@#$@*&$(@#^)", 800);
    button.textContent = "Decrypt";
  } else {
    scrambleText(target, message, 1500);
    button.textContent = "Encrypt";
  }
  isDecoded = !isDecoded;
});

// ========= H1 ANIMATION (NO SplitText) ========= //

const heading = document.getElementById("animatedText");
const words = heading.textContent.trim().split(" ");
heading.innerHTML = words
  .map(
    (word) =>
      `<span class="inline-block opacity-0 translate-y-8">${word}</span>`
  )
  .join(" ");

const wordSpans = heading.querySelectorAll("span");
gsap.to(wordSpans, {
  opacity: 1,
  y: 0,
  stagger: 0.1,
  duration: 1,
  ease: "back.out(1.7)",
});

// ========= QUOTE ANIMATION ========= //

function getRandomPosition() {
  const x = Math.random() * (window.innerWidth - 200);
  const y = Math.random() * (window.innerHeight - 100);
  return { x, y };
}

function animateQuote(quote, text) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  tl.call(() => {
    const { x, y } = getRandomPosition();
    gsap.set(quote, { x, y });
  })
    .to(quote, {
      duration: 1,
      opacity: 1,
      ease: "power2.out",
    })
    .to(quote, {
      delay: 1.5,
      duration: 1,
      opacity: 0,
      ease: "power2.in",
    });
}

quotes.forEach((quote) => {
  gsap.set(quote, {
    position: "absolute",
    whiteSpace: "nowrap",
    opacity: 0,
  });
  animateQuote(quote, quote.textContent || "");
});
