// 1. Tabs Switching Logic
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    
    // Sabhi tab content ko hide karo
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    
    // Sabhi tab buttons se active class hatao
    tablinks = document.getElementsByClassName("tab-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    
    // Current tab dikhao aur button ko active karo
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// 2. Password Hide/Show Logic
function togglePass(inputId, icon) {
    const passInput = document.getElementById(inputId);
    if (passInput.type === "password") {
        passInput.type = "text";
        icon.classList.replace('fa-eye-slash', 'fa-eye');
        icon.style.color = "#00e5ff"; // Glowing color when visible
    } else {
        passInput.type = "password";
        icon.classList.replace('fa-eye', 'fa-eye-slash');
        icon.style.color = "#444"; // Muted color when hidden
    }
}

// 3. Login Function (AJAX)
function loginUser() {
    let phone = document.getElementById('login-phone').value;
    let pass = document.getElementById('login-pass').value;

    if(phone == "" || pass == "") {
        alert("Please fill all fields");
        return;
    }

    let formData = new FormData();
    formData.append('phone', phone);
    formData.append('password', pass);

    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        if(data.trim() === "Success") {
            window.location.href = "home.html"; // Login ke baad home par bhej dega
        } else {
            alert(data); // Error message dikhayega
        }
    })
    .catch(error => console.error('Error:', error));
}

// 4. Registration Function (AJAX)
function registerUser() {
    let username = document.querySelector('#register input[placeholder="Enter your username"]').value;
    let email = document.querySelector('#register input[placeholder="you@example.com"]').value;
    let phone = document.querySelector('#register input[placeholder="10-digit number"]').value;
    let confirmPhone = document.querySelector('#register input[placeholder="Re-enter 10-digit number"]').value;
    let pass = document.getElementById('reg-pass').value;
    let telegramId = document.querySelector('#register input[placeholder="Your Telegram ID"]').value;

    // Basic Validation
    if(phone !== confirmPhone) {
        alert("Phone numbers do not match!");
        return;
    }
    if(pass.length < 6) {
        alert("Password must be at least 6 characters!");
        return;
    }

    let formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', pass);
    formData.append('telegram_id', telegramId);

    fetch('register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        if(data.trim().includes("Success")) {
            // Registration ke baad login tab par bhej do
            location.reload(); 
        }
    })
    .catch(error => console.error('Error:', error));
}

// 5. Telegram ID Verification Button (Sirf redirect ya info ke liye)
document.querySelector('.btn-verify').addEventListener('click', function() {
    alert("Opening Telegram Bot for Verification...");
    window.open("https://t.me/YourBotName", "_blank"); // Apna bot link yahan dalein
});
// Pay to User Function
function transferMoney() {
    // Ab variable ka naam kgl_number hai
    let kgl_number = document.getElementById('pay-kgl-number').value; 
    let amt = document.getElementById('pay-amount').value;

    if(kgl_number == "" || amt == "") {
        alert("KGL: Please fill all details!");
        return;
    }

    let formData = new FormData();
    // PHP ko bhi ab 'receiver_kgl' ke naam se data jayega
    formData.append('receiver_kgl', kgl_number); 
    formData.append('amount', amt);

    fetch('pay_user.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            document.getElementById('new-balance-display').innerText = "₹ " + data.new_balance;
            document.getElementById('success-popup').style.display = 'flex';
        } else {
            alert(data.message || "KGL Error: Transaction Failed!");
        }
    })
    .catch(err => {
        console.error("KGL Connection Error:", err);
    });
}

function createLifafaSimple() {
    let amt = prompt("KGL: Enter amount for Lifafa:");

    if (amt === null || amt === "") return;
    
    let formData = new FormData();
    formData.append('amount', amt);

    fetch('create_lifafa.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            // Seedha browser alert mein code aur naya balance dikhana
            alert("KGL Lifafa Created!\nCode: " + data.lifafa_code + "\nNew Balance: ₹" + data.new_balance);
            location.reload(); // Balance refresh karne ke liye
        } else {
            alert(data.message || "KGL Error!");
        }
    })
    .catch(err => alert("Connection Error!"));
}

function claimLifafa() {
    let code = prompt("KGL: Enter Lifafa Code to Claim:");

    if (code === null || code === "") return;

    let formData = new FormData();
    formData.append('lifafa_code', code);

    fetch('claim_lifafa.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            // Success alert mein kitna paisa mila aur naya balance dikhao
            alert("KGL Success!\nAmount Received: ₹" + data.claimed_amount + "\nNew Balance: ₹" + data.new_balance);
            location.reload(); 
        } else {
            alert(data.message || "Invalid or Expired Code!");
        }
    })
    .catch(err => alert("KGL: Connection Error!"));
}
// Claim Lifafa Function
function claimLifafa() {
    let code = prompt("KGL: Enter Lifafa Code to Claim:");

    if (code === null || code === "") return;

    let formData = new FormData();
    formData.append('lifafa_code', code);

    fetch('claim_lifafa.php', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if(data.status === "success") {
            // Success alert mein amount aur naya balance dikhega
            alert("KGL Success!\nAmount Received: ₹" + data.claimed_amount + "\nNew Balance: ₹" + data.new_balance);
            location.reload(); 
        } else {
            alert(data.message || "Invalid or Expired Code!");
        }
    })
    .catch(err => {
        console.error("KGL Error:", err);
        alert("KGL: Connection Error!");
    });
}
