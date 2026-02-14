const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>User Management System | AWS RDS</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: "Poppins", sans-serif;
        background: linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%);
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 40px 20px;
        position: relative;
        overflow-x: hidden;
    }

    body::before {
        content: '';
        position: absolute;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        top: -300px;
        right: -200px;
        animation: float1 8s ease-in-out infinite;
    }

    body::after {
        content: '';
        position: absolute;
        width: 500px;
        height: 500px;
        background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        bottom: -250px;
        left: -150px;
        animation: float2 10s ease-in-out infinite;
    }

    @keyframes float1 {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(50px, 50px) rotate(180deg); }
    }

    @keyframes float2 {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(-30px, -40px) rotate(-180deg); }
    }

    .container {
        width: 100%;
        max-width: 950px;
        background: rgba(255, 255, 255, 0.95);
        padding: 0;
        border-radius: 30px;
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4),
                    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
        animation: slideUp 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        position: relative;
        z-index: 1;
        backdrop-filter: blur(20px);
        overflow: hidden;
        transform-style: preserve-3d;
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(100px) rotateX(20deg);
        }
        to {
            opacity: 1;
            transform: translateY(0) rotateX(0);
        }
    }

    .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 40px;
        text-align: center;
        position: relative;
        overflow: hidden;
    }

    .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
        opacity: 0.3;
    }

    .logo-3d {
        width: 100px;
        height: 100px;
        background: linear-gradient(145deg, #ffffff, #e0e0e0);
        border-radius: 25px;
        margin: 0 auto 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 50px;
        box-shadow:
            12px 12px 24px rgba(0, 0, 0, 0.2),
            -12px -12px 24px rgba(255, 255, 255, 0.5),
            inset 3px 3px 6px rgba(0, 0, 0, 0.1),
            inset -3px -3px 6px rgba(255, 255, 255, 0.8);
        animation: rotate3d 4s ease-in-out infinite;
        position: relative;
        z-index: 1;
    }

    @keyframes rotate3d {
        0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
        25% { transform: rotateY(10deg) rotateX(-5deg); }
        75% { transform: rotateY(-10deg) rotateX(5deg); }
    }

    h1 {
        color: white;
        font-weight: 800;
        font-size: 32px;
        letter-spacing: -1px;
        text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
        position: relative;
        z-index: 1;
    }

    .subtitle {
        color: rgba(255, 255, 255, 0.9);
        font-size: 15px;
        margin-top: 8px;
        font-weight: 400;
        position: relative;
        z-index: 1;
    }

    .form-content {
        padding: 45px 50px;
    }

    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 25px;
        margin-bottom: 25px;
    }

    .input-group {
        position: relative;
        text-align: left;
    }

    .input-group.full-width {
        grid-column: 1 / -1;
    }

    .input-group label {
        display: block;
        color: #2d3748;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
        margin-left: 5px;
    }

    .input-group label span {
        color: #e53e3e;
    }

    .input-wrapper {
        position: relative;
    }

    .input-wrapper input,
    .input-wrapper select,
    .input-wrapper textarea {
        width: 100%;
        padding: 16px 20px;
        padding-left: 55px;
        border-radius: 15px;
        border: 2px solid #e2e8f0;
        font-size: 15px;
        transition: all 0.3s ease;
        font-family: "Poppins", sans-serif;
        background: #f7fafc;
        box-shadow:
            5px 5px 10px rgba(0, 0, 0, 0.05),
            -5px -5px 10px rgba(255, 255, 255, 0.8);
    }

    .input-wrapper textarea {
        resize: vertical;
        min-height: 100px;
        padding-top: 16px;
    }

    .input-wrapper input:focus,
    .input-wrapper select:focus,
    .input-wrapper textarea:focus {
        border-color: #667eea;
        outline: none;
        background: white;
        box-shadow:
            0 0 0 4px rgba(102, 126, 234, 0.1),
            8px 8px 15px rgba(0, 0, 0, 0.1),
            -5px -5px 10px rgba(255, 255, 255, 0.8);
        transform: translateY(-2px);
    }

    .input-wrapper .icon {
        position: absolute;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 22px;
        transition: all 0.3s ease;
        filter: grayscale(1);
    }

    .input-wrapper textarea + .icon {
        top: 25px;
        transform: none;
    }

    .input-wrapper input:focus + .icon,
    .input-wrapper select:focus + .icon,
    .input-wrapper textarea:focus + .icon {
        filter: grayscale(0);
        transform: translateY(-50%) scale(1.1);
    }

    .input-wrapper textarea:focus + .icon {
        transform: scale(1.1);
    }

    .button-group {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-top: 35px;
    }

    button {
        padding: 18px;
        border: none;
        border-radius: 15px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 600;
        font-family: "Poppins", sans-serif;
        position: relative;
        overflow: hidden;
        box-shadow:
            8px 8px 16px rgba(0, 0, 0, 0.15),
            -5px -5px 10px rgba(255, 255, 255, 0.7);
    }

    button::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.6s, height 0.6s;
    }

    button:hover::before {
        width: 300px;
        height: 300px;
    }

    #submitBtn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }

    #submitBtn:hover {
        transform: translateY(-3px);
        box-shadow:
            10px 10px 25px rgba(102, 126, 234, 0.4),
            -5px -5px 10px rgba(255, 255, 255, 0.7);
    }

    #resetBtn {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
    }

    #resetBtn:hover {
        transform: translateY(-3px);
        box-shadow:
            10px 10px 25px rgba(245, 87, 108, 0.4),
            -5px -5px 10px rgba(255, 255, 255, 0.7);
    }

    button:active {
        transform: translateY(0);
    }

    button:disabled {
        background: #cbd5e0;
        cursor: not-allowed;
        transform: none;
    }

    button span {
        position: relative;
        z-index: 1;
    }

    #msg {
        margin-top: 25px;
        font-size: 15px;
        font-weight: 500;
        padding: 16px 20px;
        border-radius: 15px;
        display: none;
        animation: fadeInMsg 0.5s ease;
        box-shadow:
            5px 5px 15px rgba(0, 0, 0, 0.1),
            -3px -3px 8px rgba(255, 255, 255, 0.8);
    }

    @keyframes fadeInMsg {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }

    #msg.show {
        display: block;
    }

    #msg.success {
        background: linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%);
        color: #1e4620;
        border: 2px solid #68d391;
    }

    #msg.error {
        background: linear-gradient(135deg, #fbc2eb 0%, #fda085 100%);
        color: #742a2a;
        border: 2px solid #fc8181;
    }

    #msg.info {
        background: linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%);
        color: #1e429f;
        border: 2px solid #63b3ed;
    }

    .footer {
        text-align: center;
        padding: 25px;
        background: #f7fafc;
        border-top: 2px solid #e2e8f0;
        color: #718096;
        font-size: 13px;
        border-radius: 0 0 30px 30px;
    }

    .footer strong {
        color: #2d3748;
        font-weight: 600;
    }

    .loader {
        width: 18px;
        height: 18px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top-color: white;
        border-radius: 50%;
        display: inline-block;
        animation: spin 0.8s linear infinite;
        vertical-align: middle;
        margin-right: 8px;
    }

    @keyframes spin {
        to { transform: rotate(360deg); }
    }

    @media (max-width: 768px) {
        .form-row {
            grid-template-columns: 1fr;
            gap: 20px;
        }

        .button-group {
            grid-template-columns: 1fr;
        }

        .form-content {
            padding: 30px 25px;
        }

        .container {
            margin: 20px;
        }
    }
</style>
</head>
<body>
<div class="container">
    <div class="header">
        <div class="logo-3d">🚀</div>
        <h1>User Management System</h1>
        <p class="subtitle">Powered by AWS EC2 & RDS Database</p>
    </div>

    <div class="form-content">
        <div class="form-row">
            <div class="input-group">
                <label for="firstName">First Name <span>*</span></label>
                <div class="input-wrapper">
                    <input type="text" id="firstName" placeholder="Enter first name" required>
                    <span class="icon">👤</span>
                </div>
            </div>

            <div class="input-group">
                <label for="lastName">Last Name <span>*</span></label>
                <div class="input-wrapper">
                    <input type="text" id="lastName" placeholder="Enter last name" required>
                    <span class="icon">👥</span>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="input-group">
                <label for="email">Email Address <span>*</span></label>
                <div class="input-wrapper">
                    <input type="email" id="email" placeholder="example@email.com" required>
                    <span class="icon">📧</span>
                </div>
            </div>

            <div class="input-group">
                <label for="phone">Phone Number <span>*</span></label>
                <div class="input-wrapper">
                    <input type="tel" id="phone" placeholder="10-digit number" required>
                    <span class="icon">📱</span>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="input-group">
                <label for="age">Age</label>
                <div class="input-wrapper">
                    <input type="number" id="age" placeholder="Enter age" min="1" max="120">
                    <span class="icon">🎂</span>
                </div>
            </div>

            <div class="input-group">
                <label for="gender">Gender</label>
                <div class="input-wrapper">
                    <select id="gender">
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <span class="icon">⚧</span>
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="input-group">
                <label for="city">City</label>
                <div class="input-wrapper">
                    <input type="text" id="city" placeholder="Enter city">
                    <span class="icon">🏙️</span>
                </div>
            </div>

            <div class="input-group">
                <label for="country">Country</label>
                <div class="input-wrapper">
                    <input type="text" id="country" placeholder="Enter country">
                    <span class="icon">🌍</span>
                </div>
            </div>
        </div>

        <div class="input-group full-width">
            <label for="address">Address</label>
            <div class="input-wrapper">
                <textarea id="address" placeholder="Enter full address (optional)"></textarea>
                <span class="icon">📍</span>
            </div>
        </div>

        <div class="button-group">
            <button type="button" onclick="resetForm()" id="resetBtn">
                <span>🔄 Reset Form</span>
            </button>
            <button type="submit" onclick="saveUser()" id="submitBtn">
                <span id="btnText">💾 Save User</span>
            </button>
        </div>

        <div id="msg"></div>
    </div>

    <div class="footer">
        <strong>AWS Cloud Demo Project</strong> | EC2 Instance + RDS MySQL Database
    </div>
</div>

<h1> hii my name is kunal singh </h1>
	 

<script>
async function saveUser() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;
    const city = document.getElementById("city").value.trim();
    const country = document.getElementById("country").value.trim();
    const address = document.getElementById("address").value.trim();

    const msg = document.getElementById("msg");
    const submitBtn = document.getElementById("submitBtn");
    const btnText = document.getElementById("btnText");

    msg.classList.remove("show", "success", "error", "info");

    // Validation
    if (!firstName || !lastName || !email || !phone) {
        msg.classList.add("show", "error");
        msg.innerText = "⚠️ Please fill all required fields (marked with *)";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        msg.classList.add("show", "error");
        msg.innerText = "⚠️ Please enter a valid email address";
        return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\D/g, ''))) {
        msg.classList.add("show", "error");
        msg.innerText = "⚠️ Please enter a valid 10-digit phone number";
        return;
    }

    if (age && (age < 1 || age > 120)) {
        msg.classList.add("show", "error");
        msg.innerText = "⚠️ Please enter a valid age (1-120)";
        return;
    }

    submitBtn.disabled = true;
    btnText.innerHTML = '<span class="loader"></span>Saving to Database...';

    try {
        const userData = {
            firstName,
            lastName,
            email,
            phone,
            age: age || null,
            gender: gender || null,
            city: city || null,
            country: country || null,
            address: address || null
        };

        const res = await fetch("http://13.233.163.43:3000/save", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await res.json();

        if (res.ok) {
            msg.classList.add("show", "success");
            msg.innerText = "✅ Success! User registered successfully in AWS RDS";
            resetForm();
        } else {
            msg.classList.add("show", "error");
            msg.innerText = "❌ " + (data.message || "Failed to save user");
        }

    } catch (error) {
        msg.classList.add("show", "error");
        msg.innerText = "❌ Connection Error: Unable to connect to AWS EC2 server";
    } finally {
        submitBtn.disabled = false;
        btnText.innerHTML = '💾 Save User';
    }
}

function resetForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("age").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("city").value = "";
    document.getElementById("country").value = "";
    document.getElementById("address").value = "";

    const msg = document.getElementById("msg");
    msg.classList.remove("show", "success", "error", "info");
}

// Enter key support
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
        saveUser();
    }
});
</script>
</body>
</html>
");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.listen(PORT,"0.0.0.0", () => {
  console.log(`App running on port ${PORT}`);
});



