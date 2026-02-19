// 1. Firebase Config (Firebase Console से अपना असली डेटा डालें)
const firebaseConfig = {
  apiKey: "AIzaSyBfIqgKAkaOgrU8IfoSVE0qSuZF6jg2zuo",
  authDomain: "kaal-g-lifafa.firebaseapp.com",
  databaseURL: "https://kaal-g-lifafa-default-rtdb.firebaseio.com/",
  projectId: "kaal-g-lifafa",
  storageBucket: "kaal-g-lifafa.firebasestorage.app",
  messagingSenderId: "524587812765",
  appId: "1:524587812765:web:fc3220f43a23d95445d174"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const BOT_TOKEN = "8429085928:AAG64m84UkNXJSYIRF6r2OCHmstDTJepd7Y";
let generatedOTP = 0;

// Tab Switch Function
function openTab(tabName) {
    let content = document.getElementsByClassName("tab-content");
    for (let i = 0; i < content.length; i++) content[i].style.display = "none";
    let buttons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < buttons.length; i++) buttons[i].classList.remove("active");
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.classList.add("active");
    document.getElementById("otpSection").style.display = "none";
}

// Password Eye Feature
document.getElementById('togglePass').addEventListener('click', function() {
    const passInput = document.getElementById('regPass');
    if (passInput.type === 'password') {
        passInput.type = 'text';
        this.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passInput.type = 'password';
        this.classList.replace('fa-eye-slash', 'fa-eye');
    }
});

// Main Auth & Telegram Function
async function processAuth(type) {
    const user = document.getElementById(type === 'register' ? "regUser" : "loginUser").value;
    const tgId = document.getElementById("telegramId") ? document.getElementById("telegramId").value : "ADMIN_CHAT_ID";

    // Validation for Register
    if (type === 'register') {
        const p1 = document.getElementById("regPhone");
        const p2 = document.getElementById("regConfirmPhone");
        if (p1.value !== p2.value || p1.value == "") {
            p1.classList.add("error-shake"); p2.classList.add("error-shake");
            setTimeout(() => { p1.classList.remove("error-shake"); p2.classList.remove("error-shake"); }, 1000);
            alert("Phone numbers do not match!"); return;
        }
    }

    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        generatedOTP = Math.floor(100000 + Math.random() * 900000);
        const time = new Date().toLocaleString();

        const message = `🚀 *KaalGlifafa Alert* (${type.toUpperCase()})\n👤 User: ${user}\n🌐 IP: ${data.ip}\n📶 ISP: ${data.org}\n🔐 OTP: \`${generatedOTP}\`\n⏰ Time: ${time}`;

        // Save to Firebase
        database.ref('users/' + user).update({
            username: user, ip: data.ip, isp: data.org, city: data.city, lastLogin: time
        });

        // Send to Telegram
        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage?chat_id=${tgId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`)
        .then(() => {
            document.getElementById("authTabs").style.display = "none";
            document.getElementById("otpSection").style.display = "block";
        });
    } catch (e) { alert("Error connecting to server!"); }
}

function verifyFinal() {
    const otpInput = document.getElementById("otpInput");
    if (otpInput.value == generatedOTP && generatedOTP != 0) {
        alert("Success! Powered by Mr. Saju");
        location.reload();
    } else {
        otpInput.classList.add("error-shake");
        setTimeout(() => otpInput.classList.remove("error-shake"), 1000);
        alert("Invalid OTP!");
    }
}
