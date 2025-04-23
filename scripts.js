// Language management
const languages = {
    en: {
      title: "PE-Pass v2 Generator",
      subtitle: "Create ultra-secure passwords with advanced encryption",
      lengthLabel: "Password Length",
      uppercaseLabel: "Uppercase (A-Z)",
      lowercaseLabel: "Lowercase (a-z)",
      numbersLabel: "Numbers (0-9)",
      symbolsLabel: "Symbols (!@#$%)",
      strengthLabel: "Password Strength",
      generateText: "Generate Password",
      advancedTooltip: "Advanced Options",
      footerText1:
        "Your generated passwords are created locally in your browser and never sent over the internet.",
      footerText2:
        "For maximum security, use a password manager to store your passwords.",
      strengthTexts: [
        "Very Weak",
        "Weak",
        "Medium",
        "Strong",
        "Very Strong",
      ],
      copyTooltip: "Copy to clipboard",
      copiedTooltip: "Copied!",
      generatingText: "Generating...",
    },
    fr: {
      title: "Générateur PE-Pass v2",
      subtitle:
        "Créez des mots de passe ultra-sécurisés avec un cryptage avancé",
      lengthLabel: "Longueur du mot de passe",
      uppercaseLabel: "Majuscules (A-Z)",
      lowercaseLabel: "Minuscules (a-z)",
      numbersLabel: "Chiffres (0-9)",
      symbolsLabel: "Symboles (!@#$%)",
      strengthLabel: "Solidité du mot de passe",
      generateText: "Générer un mot de passe",
      advancedTooltip: "Options avancées",
      footerText1:
        "Vos mots de passe générés sont créés localement dans votre navigateur et jamais envoyés sur Internet.",
      footerText2:
        "Pour une sécurité maximale, utilisez un gestionnaire de mots de passe pour les stocker.",
      strengthTexts: [
        "Très faible",
        "Faible",
        "Moyen",
        "Fort",
        "Très fort",
      ],
      copyTooltip: "Copier dans le presse-papier",
      copiedTooltip: "Copié!",
      generatingText: "Génération...",
    },
  };

  let currentLanguage = "en";

  function setLanguage(lang) {
    currentLanguage = lang;
    const langData = languages[lang];

    document.getElementById("title").textContent = langData.title;
    document.getElementById("subtitle").textContent = langData.subtitle;
    document.getElementById("lengthLabel").textContent =
      langData.lengthLabel;
    document.getElementById("uppercaseLabel").textContent =
      langData.uppercaseLabel;
    document.getElementById("lowercaseLabel").textContent =
      langData.lowercaseLabel;
    document.getElementById("numbersLabel").textContent =
      langData.numbersLabel;
    document.getElementById("symbolsLabel").textContent =
      langData.symbolsLabel;
    document.getElementById("strengthLabel").textContent =
      langData.strengthLabel;
    document.getElementById("generateText").textContent =
      langData.generateText;
    document.getElementById("advancedTooltip").textContent =
      langData.advancedTooltip;
    document.getElementById(
      "footerText"
    ).innerHTML = `<p>${langData.footerText1}</p><p class="mt-2">${langData.footerText2}</p>`;

    // Update strength text if it exists
    if (document.getElementById("passwordDisplay").textContent) {
      updateStrengthIndicator();
    }

    // Update copy button tooltip
    const copyBtn = document.getElementById("copyBtn");
    if (copyBtn.classList.contains("copied")) {
      copyBtn.title = langData.copiedTooltip;
    } else {
      copyBtn.title = langData.copyTooltip;
    }

    // Update active language button
    document
      .getElementById("enBtn")
      .classList.toggle("active", lang === "en");
    document
      .getElementById("frBtn")
      .classList.toggle("active", lang === "fr");
  }

  document
    .getElementById("enBtn")
    .addEventListener("click", () => setLanguage("en"));
  document
    .getElementById("frBtn")
    .addEventListener("click", () => setLanguage("fr"));

  // Matrix background effect
  function createMatrixEffect() {
    const chars =
      "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const container = document.getElementById("matrixBg");
    const fontSize = 16;
    const columns = Math.floor(window.innerWidth / fontSize);

    for (let i = 0; i < columns; i++) {
      const column = document.createElement("div");
      column.style.position = "absolute";
      column.style.top = "0";
      column.style.left = `${i * fontSize}px`;
      column.style.width = `${fontSize}px`;
      column.style.height = "100%";
      container.appendChild(column);

      // Start the animation
      animateColumn(column, chars);
    }

    function animateColumn(column, chars) {
      const charCount = Math.floor(Math.random() * 10) + 5;
      const delay = Math.random() * 10;

      setTimeout(() => {
        let positions = [];

        for (let i = 0; i < charCount; i++) {
          positions.push({
            char: chars[Math.floor(Math.random() * chars.length)],
            position: -i * fontSize,
            speed: 0.05 + Math.random() * 0.1,
          });
        }

        const interval = setInterval(() => {
          // Clear previous characters
          column.innerHTML = "";

          // Update and draw characters
          for (let i = 0; i < positions.length; i++) {
            positions[i].position += positions[i].speed;

            if (positions[i].position > window.innerHeight) {
              positions[i].position = -fontSize;
              positions[i].char =
                chars[Math.floor(Math.random() * chars.length)];
            }

            const charElement = document.createElement("div");
            charElement.className = "matrix-char";
            charElement.textContent = positions[i].char;
            charElement.style.top = `${positions[i].position}px`;

            // Fade out at the bottom
            if (positions[i].position > window.innerHeight - fontSize * 3) {
              const opacity =
                1 -
                (positions[i].position -
                  (window.innerHeight - fontSize * 3)) /
                  (fontSize * 3);
              charElement.style.opacity = opacity;
            }

            // Brighten the first character
            if (i === 0) {
              charElement.style.color = "#ffffff";
              charElement.style.textShadow = "0 0 10px #ffffff";
            }

            column.appendChild(charElement);
          }
        }, 30);

        // Stop after a while and restart
        setTimeout(() => {
          clearInterval(interval);
          setTimeout(
            () => animateColumn(column, chars),
            Math.random() * 5000
          );
        }, 5000 + Math.random() * 5000);
      }, delay * 1000);
    }
  }

  // Password generation logic
  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
  };

  function getRandomChar(set) {
    return set[Math.floor(Math.random() * set.length)];
  }

  function generatePassword(length, options) {
    let charset = "";
    let password = "";

    // Build charset based on options
    if (options.uppercase) charset += charSets.uppercase;
    if (options.lowercase) charset += charSets.lowercase;
    if (options.numbers) charset += charSets.numbers;
    if (options.symbols) charset += charSets.symbols;

    // Ensure at least one character from each selected set
    if (options.uppercase) password += getRandomChar(charSets.uppercase);
    if (options.lowercase) password += getRandomChar(charSets.lowercase);
    if (options.numbers) password += getRandomChar(charSets.numbers);
    if (options.symbols) password += getRandomChar(charSets.symbols);

    // Fill the rest of the password
    for (let i = password.length; i < length; i++) {
      password += getRandomChar(charset);
    }

    // Shuffle the password to mix the mandatory characters
    return shuffleString(password);
  }

  function shuffleString(str) {
    const array = str.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.join("");
  }

  function calculatePasswordStrength(password) {
    let strength = 0;

    // Length contributes up to 50 points
    strength += Math.min(50, (password.length / 32) * 50);

    // Character variety
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);

    let varietyCount = 0;
    if (hasUppercase) varietyCount++;
    if (hasLowercase) varietyCount++;
    if (hasNumbers) varietyCount++;
    if (hasSymbols) varietyCount++;

    // Variety contributes up to 30 points
    strength += (varietyCount / 4) * 30;

    // Entropy estimation (very simplified)
    let charsetSize = 0;
    if (hasUppercase) charsetSize += 26;
    if (hasLowercase) charsetSize += 26;
    if (hasNumbers) charsetSize += 10;
    if (hasSymbols) charsetSize += 20; // Approximate symbol count

    const entropy = password.length * Math.log2(charsetSize);
    strength += Math.min(20, entropy / 10); // Contributes up to 20 points

    return Math.min(100, Math.round(strength));
  }

  function updateStrengthIndicator() {
    const password = document.getElementById("passwordDisplay").textContent;
    const strength = calculatePasswordStrength(password);
    const strengthFill = document.getElementById("strengthFill");
    const strengthText = document.getElementById("strengthText");

    let strengthLevel = Math.floor(strength / 20);
    if (strengthLevel > 4) strengthLevel = 4;

    const strengthColors = [
      "#ef4444",
      "#f97316",
      "#eab308",
      "#10b981",
      "#3b82f6",
    ];
    const strengthLevels = languages[currentLanguage].strengthTexts;

    strengthFill.style.width = `${strength}%`;
    strengthFill.style.backgroundColor = strengthColors[strengthLevel];
    strengthText.textContent = strengthLevels[strengthLevel];
    strengthText.className = `text-xs font-mono ${
      strengthLevel < 2
        ? "text-red-400"
        : strengthLevel < 3
        ? "text-amber-400"
        : strengthLevel < 4
        ? "text-emerald-400"
        : "text-blue-400"
    }`;
  }

  // Progressive password generation with animation
  async function generatePasswordWithAnimation() {
    const length = parseInt(
      document.getElementById("passwordLength").value
    );
    const options = {
      uppercase: document.getElementById("uppercase").checked,
      lowercase: document.getElementById("lowercase").checked,
      numbers: document.getElementById("numbers").checked,
      symbols: document.getElementById("symbols").checked,
    };

    // Validate at least one option is selected
    if (
      !options.uppercase &&
      !options.lowercase &&
      !options.numbers &&
      !options.symbols
    ) {
      alert(
        languages[currentLanguage].strengthTexts[0] +
          " - " +
          (currentLanguage === "en"
            ? "Please select at least one character type."
            : "Veuillez sélectionner au moins un type de caractère.")
      );
      return;
    }

    const passwordDisplay = document.getElementById("passwordDisplay");
    const generateBtn = document.getElementById("generateBtn");
    const progressFill = document.getElementById("progressFill");

    // Disable button during generation
    generateBtn.disabled = true;
    generateBtn.innerHTML = `<i class="fas fa-cog fa-spin mr-2"></i><span>${languages[currentLanguage].generatingText}</span>`;

    // Clear previous password
    passwordDisplay.innerHTML = "";

    // Generate the actual password first
    const password = generatePassword(length, options);

    // Display empty slots
    for (let i = 0; i < length; i++) {
      const charSpan = document.createElement("span");
      charSpan.className = "password-char";
      charSpan.textContent = "_";
      passwordDisplay.appendChild(charSpan);
    }

    // Generate characters one by one with animation
    const charElements = passwordDisplay.querySelectorAll(".password-char");

    for (let i = 0; i < length; i++) {
      // Update progress bar
      progressFill.style.width = `${((i + 1) / length) * 100}%`;

      // Animate the current character
      charElements[i].classList.add("generating");

      // Simulate generation time (2 seconds per character as requested)
      await new Promise((resolve) => setTimeout(resolve, 2000 / length));

      // Set the final character and validate
      charElements[i].textContent = password[i];
      charElements[i].classList.remove("generating");
      charElements[i].classList.add("validated");

      // Update strength indicator progressively
      if (i === length - 1) {
        updateStrengthIndicator();
      }
    }

    // Reset button
    generateBtn.disabled = false;
    generateBtn.innerHTML = `<i class="fas fa-key mr-2"></i><span>${languages[currentLanguage].generateText}</span>`;

    // Reset copy button state
    const copyBtn = document.getElementById("copyBtn");
    copyBtn.classList.remove("copied");
    copyBtn.title = languages[currentLanguage].copyTooltip;
    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
  }

  // Copy to clipboard function
  function copyToClipboard() {
    const password = document.getElementById("passwordDisplay").textContent;
    if (!password) return;

    navigator.clipboard.writeText(password).then(() => {
      const copyBtn = document.getElementById("copyBtn");
      copyBtn.classList.add("copied");
      copyBtn.title = languages[currentLanguage].copiedTooltip;
      copyBtn.innerHTML = '<i class="fas fa-check"></i>';

      setTimeout(() => {
        copyBtn.classList.remove("copied");
        copyBtn.title = languages[currentLanguage].copyTooltip;
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
      }, 2000);
    });
  }

  // Initialize the app
  document.addEventListener("DOMContentLoaded", () => {
    createMatrixEffect();

    // Set up event listeners
    document
      .getElementById("generateBtn")
      .addEventListener("click", generatePasswordWithAnimation);
    document
      .getElementById("copyBtn")
      .addEventListener("click", copyToClipboard);

    // Update length value display
    document
      .getElementById("passwordLength")
      .addEventListener("input", function () {
        document.getElementById("lengthValue").textContent = this.value;
      });

    // Update strength indicator when options change
    const optionCheckboxes = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    optionCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        if (document.getElementById("passwordDisplay").textContent) {
          updateStrengthIndicator();
        }
      });
    });

    // Generate initial password
    generatePasswordWithAnimation();
  });