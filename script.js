/* =========================
   VALIDASI FORM
========================= */

const form = document.getElementById("registrationForm");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const ekstrakurikuler = document.getElementById("ekstrakurikuler");

const namaError = document.getElementById("namaError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");
const ekstrakurikulerError = document.getElementById("ekstrakurikulerError");

const successMessage = document.getElementById("successMessage");


function setValid(input, errorElement) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    errorElement.textContent = "";
}


function setInvalid(input, errorElement, message) {
    input.classList.remove("valid");
    input.classList.add("invalid");
    errorElement.textContent = message;
}


/* NAMA */

nama.addEventListener("input", function () {

    if (nama.value.trim().length < 3) {

        setInvalid(
            nama,
            namaError,
            "Nama minimal 3 karakter."
        );

    } else {

        setValid(nama, namaError);

    }

});


/* EMAIL */

email.addEventListener("input", function () {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value)) {

        setInvalid(
            email,
            emailError,
            "Masukkan email yang valid."
        );

    } else {

        setValid(email, emailError);

    }

});


/* PASSWORD */

password.addEventListener("input", function () {

    if (password.value.length < 8) {

        setInvalid(
            password,
            passwordError,
            "Password minimal 8 karakter."
        );

    } else {

        setValid(password, passwordError);

    }

});


/* KONFIRMASI PASSWORD */

confirmPassword.addEventListener("input", function () {

    if (
        confirmPassword.value === "" ||
        confirmPassword.value !== password.value
    ) {

        setInvalid(
            confirmPassword,
            confirmPasswordError,
            "Password tidak sama."
        );

    } else {

        setValid(
            confirmPassword,
            confirmPasswordError
        );

    }

});


/* EKSTRAKURIKULER */

ekstrakurikuler.addEventListener("change", function () {

    if (ekstrakurikuler.value === "") {

        setInvalid(
            ekstrakurikuler,
            ekstrakurikulerError,
            "Silakan pilih ekstrakurikuler."
        );

    } else {

        setValid(
            ekstrakurikuler,
            ekstrakurikulerError
        );

    }

});


/* SUBMIT */

form.addEventListener("submit", function (event) {

    event.preventDefault();

    let valid = true;

    if (nama.value.trim().length < 3) {
        setInvalid(
            nama,
            namaError,
            "Nama minimal 3 karakter."
        );
        valid = false;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value)) {
        setInvalid(
            email,
            emailError,
            "Masukkan email yang valid."
        );
        valid = false;
    }

    if (password.value.length < 8) {
        setInvalid(
            password,
            passwordError,
            "Password minimal 8 karakter."
        );
        valid = false;
    }

    if (
        confirmPassword.value === "" ||
        confirmPassword.value !== password.value
    ) {
        setInvalid(
            confirmPassword,
            confirmPasswordError,
            "Password tidak sama."
        );
        valid = false;
    }

    if (ekstrakurikuler.value === "") {
        setInvalid(
            ekstrakurikuler,
            ekstrakurikulerError,
            "Silakan pilih ekstrakurikuler."
        );
        valid = false;
    }

    if (valid) {

        successMessage.style.display = "block";

        successMessage.textContent =
            "Pendaftaran berhasil dikirim. Selamat bergabung!";

        form.reset();

        document.querySelectorAll(
            ".form-group input, .form-group select"
        ).forEach(function (input) {
            input.classList.remove("valid");
        });

    } else {

        successMessage.style.display = "none";

    }

});


/* =========================
   CHATBOT
========================= */

const chatMessages =
    document.getElementById("chatMessages");

const chatInput =
    document.getElementById("chatInput");

const sendChat =
    document.getElementById("sendChat");

const clearChat =
    document.getElementById("clearChat");


/* INFORMASI EKSTRA */

const ekstraInfo = {

    "Paskib":
        "Paskib adalah kegiatan yang melatih baris-berbaris, kedisiplinan, kekompakan, tanggung jawab, dan kerja sama tim.",

    "Dramben":
        "Dramben adalah kegiatan musik baris-berbaris yang melatih kemampuan memainkan alat musik, kekompakan, ritme, dan kerja sama.",

    "Pramuka":
        "Pramuka melatih kemandirian, kedisiplinan, kerja sama, kepemimpinan, dan berbagai keterampilan praktis.",

    "Rohani Islam":
        "Rohani Islam berisi kegiatan keagamaan Islam, pembinaan karakter, dan kegiatan yang meningkatkan pemahaman keagamaan.",

    "Voli":
        "Voli melatih teknik dasar permainan bola voli, kerja sama tim, strategi permainan, dan kebugaran tubuh.",

    "OSIS":
        "OSIS merupakan organisasi siswa yang melatih kepemimpinan, tanggung jawab, kerja sama, dan kemampuan mengelola kegiatan sekolah.",

    "Paduan Suara":
        "Paduan Suara melatih kemampuan bernyanyi, teknik vokal, harmoni, kekompakan, dan percaya diri.",

    "Tari":
        "Tari mengembangkan kreativitas, kemampuan gerak, koordinasi tubuh, ekspresi, dan kerja sama.",

    "Futsal":
        "Futsal melatih teknik bermain, strategi, kerja sama tim, kecepatan, dan kebugaran.",

    "Jurnalistik":
        "Jurnalistik melatih kemampuan menulis, mencari informasi, membuat berita, melakukan wawancara, dan membuat konten sekolah.",

    "Club Bahasa Jepang":
        "Club Bahasa Jepang membantu mempelajari bahasa Jepang, kosakata, percakapan dasar, dan budaya Jepang.",

    "PMR":
        "PMR melatih kepedulian sosial, kerja sama, pengetahuan dasar pertolongan pertama, dan kegiatan kemanusiaan.",

    "Silat":
        "Silat melatih bela diri, kedisiplinan, konsentrasi, koordinasi, dan kebugaran tubuh.",

    "Foster":
        "Foster merupakan kegiatan yang dapat membantu mengembangkan minat, kreativitas, dan kemampuan siswa."
};


/* CARI EKSTRA */

function findEkstra(message) {

    const lowerMessage = message.toLowerCase();

    for (const namaEkstra in ekstraInfo) {

        if (
            lowerMessage.includes(
                namaEkstra.toLowerCase()
            )
        ) {

            return namaEkstra;

        }

    }

    return null;
}


/* JAWABAN BOT */

function getBotResponse(message) {

    const text = message.toLowerCase().trim();

    const ekstra = findEkstra(text);

    if (
        text.includes("halo") ||
        text.includes("hai") ||
        text.includes("hello")
    ) {

        return "Halo! Saya siap membantu kamu mencari informasi tentang ekstrakurikuler.";

    }


    if (
        text.includes("daftar") ||
        text.includes("apa saja") ||
        text.includes("ekstrakurikuler apa")
    ) {

        return "Ekstrakurikuler yang tersedia adalah Paskib, Dramben, Pramuka, Rohani Islam, Voli, OSIS, Paduan Suara, Tari, Futsal, Jurnalistik, Club Bahasa Jepang, PMR, Silat, dan Foster.";

    }


    if (ekstra) {

        return ekstraInfo[ekstra];

    }


    if (
        text.includes("olahraga") ||
        text.includes("sport")
    ) {

        return "Untuk kegiatan olahraga tersedia Voli, Futsal, dan Silat.";

    }


    if (
        text.includes("menulis") ||
        text.includes("berita") ||
        text.includes("jurnal")
    ) {

        return "Kalau kamu tertarik menulis dan membuat berita, kamu bisa mencari informasi tentang Jurnalistik.";

    }


    if (
        text.includes("musik") ||
        text.includes("nyanyi") ||
        text.includes("menyanyi")
    ) {

        return "Untuk bidang musik tersedia Dramben dan Paduan Suara.";

    }


    if (
        text.includes("organisasi") ||
        text.includes("kepemimpinan")
    ) {

        return "Untuk belajar organisasi dan kepemimpinan, kamu bisa mencari informasi tentang OSIS atau Paskib.";

    }


    if (
        text.includes("agama") ||
        text.includes("islam")
    ) {

        return "Untuk kegiatan keagamaan Islam tersedia Rohani Islam.";

    }


    if (
        text.includes("jepang")
    ) {

        return "Club Bahasa Jepang cocok untuk mempelajari bahasa dan budaya Jepang.";

    }


    if (
        text.includes("password")
    ) {

        return "Password harus memiliki minimal 8 karakter.";

    }


    if (
        text.includes("email")
    ) {

        return "Gunakan alamat email yang valid, contohnya nama@email.com.";

    }


    if (
        text.includes("daftar") ||
        text.includes("registrasi")
    ) {

        return "Untuk mendaftar, isi nama, email, password, konfirmasi password, lalu pilih ekstrakurikuler.";

    }


    if (
        text.includes("terima kasih") ||
        text.includes("makasih")
    ) {

        return "Sama-sama. Semoga informasi ini membantu.";

    }


    return "Maaf, saya belum memahami pertanyaan tersebut. Coba tanyakan tentang nama ekstrakurikuler seperti Paskib, Pramuka, Futsal, OSIS, PMR, atau lainnya.";

}


/* TAMBAH PESAN */

function addMessage(text, type) {

    const message = document.createElement("div");

    message.classList.add(
        "message",
        type === "user"
            ? "user-message"
            : "bot-message"
    );


    const content =
        document.createElement("div");

    content.classList.add("message-content");

    content.textContent = text;


    const deleteButton =
        document.createElement("button");

    deleteButton.classList.add(
        "delete-message"
    );

    deleteButton.textContent = "Hapus";

    deleteButton.onclick = function () {
        deleteMessage(deleteButton);
    };


    message.appendChild(content);
    message.appendChild(deleteButton);

    chatMessages.appendChild(message);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;
}


/* KIRIM PESAN */

function sendMessage() {

    const message =
        chatInput.value.trim();

    if (message === "") {
        return;
    }


    /* PESAN USER */

    addMessage(
        message,
        "user"
    );

    chatInput.value = "";


    /* JAWABAN BOT */

    setTimeout(function () {

        const response =
            getBotResponse(message);

        addMessage(
            response,
            "bot"
        );

    }, 500);

}


/* TOMBOL KIRIM */

sendChat.addEventListener(
    "click",
    sendMessage
);


/* ENTER */

chatInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* QUICK QUESTION */

function quickQuestion(question) {

    chatInput.value = question;

    sendMessage();

}


/* HAPUS SATU PESAN */

function deleteMessage(button) {

    const message =
        button.closest(".message");

    if (message) {

        message.remove();

    }

}


/* HAPUS SEMUA PESAN */

clearChat.addEventListener(
    "click",
    function () {

        chatMessages.innerHTML = "";

        addMessage(
            "Chat telah dihapus. Silakan tanyakan sesuatu tentang ekstrakurikuler.",
            "bot"
        );

    }
);