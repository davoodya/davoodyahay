<?php
// گرفتن داده‌های ارسال‌شده به صورت JSON
$data = json_decode(file_get_contents("php://input"), true);

// اگر داده خالی بود، خطا بده
if (!$data) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "درخواست نامعتبر"]);
    exit;
}

// فایل مقصد برای ذخیره پیام‌ها
$file = __DIR__ . '/messages.json'; // مسیر کامل مطلق به دایرکتوری جاری


// خواندن داده‌های قبلی (اگر وجود داشته باشه)
$messages = [];
if (file_exists($file)) {
    $json = file_get_contents($file);
    $messages = json_decode($json, true);
}

// افزودن پیام جدید به لیست
$data["date"] = date("Y-m-d H:i:s");
$messages[] = $data;

// ذخیره در فایل
if (file_put_contents($file, json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE))) {
    echo json_encode(["success" => true, "message" => "پیام ذخیره شد"]);
} else {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "خطا در ذخیره پیام"]);
}
?>