const words = [
    "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew",
    "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry",
    "strawberry", "tangerine", "watermelon", "book", "computer", "desk", "elephant",
    "flower", "guitar", "house", "island", "jacket", "key", "lamp", "mountain",
    "notebook", "ocean", "pencil", "queen", "river", "sun", "tree", "umbrella"
];

const leetMap = {
    'a': '4',
    'e': '3',
    'i': '1',
    'o': '0',
    's': '5',
    't': '7',
    'b': '8',
    'g': '9',
    'l': '1'
};

function leetify(word) {
    return word.split('').map(char => leetMap[char.toLowerCase()] || char).join('');
}

function generatePassword() {
    const passwordLength = parseInt(document.getElementById("passwordLength").value);
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;

    let password = "";
    while (password.length < passwordLength) {
        const word = words[Math.floor(Math.random() * words.length)];
        let leetWord = leetify(word);
        
        // Kelimenin ilk harfini büyük yap
        leetWord = leetWord.charAt(0).toUpperCase() + leetWord.slice(1);
        
        password += leetWord;
    }

    // Şifreyi istenen uzunluğa kes
    password = password.slice(0, passwordLength);

    // Sayı ekle
    if (includeNumbers && !/\d/.test(password)) {
        const randomIndex = Math.floor(Math.random() * password.length);
        const randomNumber = Math.floor(Math.random() * 10);
        password = password.slice(0, randomIndex) + randomNumber + password.slice(randomIndex + 1);
    }

    // Özel karakter ekle
    if (includeSymbols && !/[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]+/.test(password)) {
        const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        const randomIndex = Math.floor(Math.random() * password.length);
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        password = password.slice(0, randomIndex) + randomSymbol + password.slice(randomIndex + 1);
    }

    return password;
}

document.addEventListener("DOMContentLoaded", function() {
    const generateButton = document.getElementById("generate");
    const copyButton = document.getElementById("copy");

    if (generateButton) {
        generateButton.addEventListener("click", function() {
            const password = generatePassword();
            document.getElementById("password").value = password;
        });
    } else {
        console.error("Generate button not found");
    }

    if (copyButton) {
        copyButton.addEventListener("click", function() {
            const passwordInput = document.getElementById("password");
            passwordInput.select();
            document.execCommand("copy");
            alert("Şifre kopyalandı!");
        });
    } else {
        console.error("Copy button not found");
    }
});