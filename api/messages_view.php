<?php
session_start();
// هندل خروج
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: messages_view.php");
    exit;
}

$messagesFile = __DIR__ . '/messages.json';

// هندل خواندن پیام
if (isset($_POST['mark_read'])) {
    $dateToMark = $_POST['mark_read'];

    if (file_exists($messagesFile)) {
        $messages = json_decode(file_get_contents($messagesFile), true);

        foreach ($messages as &$msg) {
            if ($msg['date'] === $dateToMark) {
                $msg['read'] = true;
                break;
            }
        }

        file_put_contents($messagesFile, json_encode($messages, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        header("Location: messages_view.php");
        exit;
    }
}
// اطلاعات ورود ساده (می‌تونی اینها رو تغییر بدی)
define("USERNAME", "davoodya");
define("PASSWORD", "12945");

// هندل ورود
if (isset($_POST['username']) && isset($_POST['password'])) {
    if ($_POST['username'] === USERNAME && $_POST['password'] === PASSWORD) {
        $_SESSION['logged_in'] = true;
    } else {
        $error = "نام کاربری یا رمز عبور اشتباه است.";
    }
}

// اگر لاگین نیست، فرم ورود نمایش بده
if (!isset($_SESSION['logged_in'])):
    ?>
    <!DOCTYPE html>
    <html lang="fa" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <title>ورود به مدیریت پیام‌ها</title>
        <style>
            body { font-family: sans-serif; background: #121212; color: #eee; display: flex; align-items: center; justify-content: center; height: 100vh; }
            form { background: #1e1e1e; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px #00ffcc; }
            input { display: block; margin: 10px 0; padding: 8px; width: 100%; background: #222; border: 1px solid #00ffcc; color: #fff; }
            button { background: #00ffcc; color: #000; border: none; padding: 10px; cursor: pointer; width: 100%; }
            .error { color: red; }
        </style>
    </head>
    <body>
    <form method="POST">
        <h2>ورود به مدیریت پیام‌ها</h2>
        <?php if (isset($error)) echo "<p class='error'>$error</p>"; ?>
        <input type="text" name="username" placeholder="نام کاربری" required>
        <input type="password" name="password" placeholder="رمز عبور" required>
        <button type="submit">ورود</button>
    </form>
    </body>
    </html>
    <?php
    exit;
endif;

// در اینجا لاگین شده‌ایم، پیام‌ها را نمایش بدهیم
$messagesFile = __DIR__ . '/messages.json';
$messages = [];

if (file_exists($messagesFile)) {
    $json = file_get_contents($messagesFile);
    $messages = json_decode($json, true);
}
?>
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <title>پیام‌های دریافتی</title>
    <style>
        body { font-family: sans-serif; background: #111; color: #eee; padding: 20px; }
        h1 { color: #00ffcc; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; background: #222; }
        th, td { border: 1px solid #00ffcc; padding: 10px; text-align: center; }
        th { background: #00ffcc; color: #000; }
        tr:nth-child(even) { background: #1a1a1a; }
        .logout { float: left; background: #cc0000; color: #fff; padding: 5px 10px; text-decoration: none; }
    </style>
</head>
<body>
<a href="?logout=1" class="logout">خروج</a>
<h1>📩 پیام‌های دریافتی</h1>
<?php if (empty($messages)): ?>
    <p>هیچ پیامی دریافت نشده است.</p>
<?php else: ?>
    <table>
        <tr>
            <th>تاریخ</th>
            <th>نام</th>
            <th>ایمیل</th>
            <th>موضوع</th>
            <th>پیام</th>
        </tr>
        <?php foreach ($messages as $msg): ?>
            <tr style="<?= isset($msg['read']) && $msg['read'] ? 'opacity: 0.6;' : '' ?>">
                <td><?= htmlspecialchars($msg['date']) ?></td>
                <td><?= htmlspecialchars($msg['name']) ?></td>
                <td><?= htmlspecialchars($msg['email']) ?></td>
                <td><?= htmlspecialchars($msg['subject']) ?></td>
                <td><?= nl2br(htmlspecialchars($msg['message'])) ?></td>
                <td>
                    <?php if (empty($msg['read']) || !$msg['read']): ?>
                        <form method="post" style="margin:0;">
                            <input type="hidden" name="mark_read" value="<?= $msg['date'] ?>">
                            <button type="submit">✅ خوانده شده</button>
                        </form>
                    <?php else: ?>
                        خوانده شده
                    <?php endif; ?>
                </td>
            </tr>


        <?php endforeach; ?>
    </table>
<?php endif; ?>
</body>
</html>

<?php

?>
