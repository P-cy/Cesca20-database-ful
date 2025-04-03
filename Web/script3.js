function sendRequest(event) {
    // ป้องกันหน้าเว็บรีโหลด (ถ้ามี event เข้ามา)
    if (event) {
        event.preventDefault();
    }

    const apiPath = "http://127.0.0.1:5000";  // URL ของ API
    let data = {};  // เตรียมข้อมูลสำหรับส่งไปเซิร์ฟเวอร์
    let method = "POST";  // HTTP method ที่จะใช้

    console.log("คำสั่งเวทมนตร์:", apiPath);

    // เก็บข้อมูลที่ต้องการส่งไป
    data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        contact: document.getElementById('contact').value,
        home: document.querySelector('input[name="house"]:checked')?.value,  // ตรวจสอบหากไม่เลือก
        goal: document.getElementById('dream').value,
        detail: document.getElementById('detail').value
    };

    console.log("Data", data)

    // เรียก API ด้วย fetch
    fetch(apiPath, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : null  // ส่งข้อมูลเฉพาะเมื่อมี
    })
        .then(response => response.json())  // แปลงข้อมูลจาก response
        .then(data => {
            const resultBox = document.getElementById('resultBox'); // ประกาศตัวแปร resultBox
            if (resultBox) {
                resultBox.textContent = JSON.stringify(data, null, 2);  // แสดงผลข้อมูลที่ได้รับ
            }
        })
        .catch(error => {
            console.error('เกิดข้อผิดพลาดในการส่งข้อมูล:', error);
        });
}
