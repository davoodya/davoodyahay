<?php
session_start();
// هندل خروج
if (isset($_GET['logout'])) {
    session_destroy();
    header("Location: messages_view.php");
    exit;
}

$messagesFile = __DIR__ . '/messages.json';

// هندل حذف پیام
if (isset($_POST['delete_message'])) {
    $dateToDelete = $_POST['delete_message'];

    if (file_exists($messagesFile)) {
        $messages = json_decode(file_get_contents($messagesFile), true);

        // فیلتر کردن پیام‌ها بر اساس تاریخ و حذف پیام
        $messages = array_filter($messages, function($msg) use ($dateToDelete) {
            return $msg['date'] !== $dateToDelete;
        });

        // بازنویسی فایل بدون پیام حذف‌شده
        file_put_contents($messagesFile, json_encode(array_values($messages), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
        header("Location: messages_view.php");
        exit;
    }
}


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
        <link rel="stylesheet" href="/assets/css/fonts/Shabnam.css">
        <link rel="stylesheet" href="/css/api/message_view.css">
    </head>
    <body>
    <div class="login-container">
        <form class="login-form" method="POST">
            <h2>ورود به مدیریت پیام‌ها</h2>
            <?php if (isset($error)): ?>
                <p class="error-message"><?= $error ?></p>
            <?php endif; ?>

            <div class="input-group">
                <input type="text" name="username" placeholder="نام کاربری" required>
            </div>

            <div class="input-group">
                <input type="password" name="password" placeholder="رمز عبور" required>
            </div>

            <button type="submit" class="login-btn">ورود</button>
        </form>
    </div>
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
    <link rel="stylesheet" href="/assets/css/fonts/Shabnam.css">
    <link rel="stylesheet" href="/css/api/message_view.css" type="text/css">

</head>
<body>

<a href="?logout=1" class="logout">خروج</a>
<h1 class="header-title">📩 پیام‌های دریافتی</h1>
<?php if (empty($messages)): ?>
    <p>هیچ پیامی دریافت نشده است.</p>
<?php else: ?>

    <div class="table-container">
        <table class="messages-table">
            <thead>
            <tr>
                <th class="orange-title" width="12%">تاریخ</th>
                <th class="orange-title" width="15%">نام</th>
                <th class="orange-title" width="18%">ایمیل</th>
                <th class="orange-title" width="15%">موضوع</th>
                <th class="orange-title" width="30%">پیام</th>
                <th class="orange-title" width="5%">وضعیت</th>
                <th class="orange-title" width="5%">عملیات</th>
            </tr>
            </thead>
            <tbody>
            <?php foreach ($messages as $msg): ?>
                <tr class="<?= isset($msg['read']) && $msg['read'] ? 'read' : 'unread' ?>">
                    <td><?= htmlspecialchars($msg['date']) ?></td>
                    <td><?= htmlspecialchars($msg['name']) ?></td>
                    <td><?= htmlspecialchars($msg['email']) ?></td>
                    <td><?= htmlspecialchars($msg['subject']) ?></td>
                    <td class="message-content">
                        <span class="message-preview"><?= htmlspecialchars(substr($msg['message'], 0, 30)) ?>...</span>
                        <button class="show-message-btn" data-message="<?= htmlspecialchars($msg['message']) ?>">
                            نمایش کامل پیام
                        </button>
                    </td>
                    <td class="actions">
                        <?php if (empty($msg['read']) || !$msg['read']): ?>
                            <form method="post" class="inline-form">
                                <input type="hidden" name="mark_read" value="<?= $msg['date'] ?>">
                                <button type="submit" class="table-btn btn-outline">
                                    <span class="btn-icon">✅</span>
                                    <span class="btn-text">خوانده</span>
                                </button>
                            </form>
                        <?php else: ?>
                            <span class="read-badge">خوانده شده</span>
                        <?php endif; ?>
                    </td>
                    <td class="actions">
                        <form method="post" class="inline-form">
                            <input type="hidden" name="delete_message" value="<?= $msg['date'] ?>">
                            <button type="submit" class="table-btn btn-secondary">
                                <span class="btn-icon">❌</span>
                                <span class="btn-text">حذف</span>
                            </button>
                        </form>
                    </td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <!-- ماژول نمایش پیام -->
    <div id="messageModal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3 class="modal-title">متن کامل پیام</h3>
            <div class="modal-body"></div>
        </div>
    </div>
    <script src="/js/api/messages_view.js"></script>
<?php endif; ?>

</body>
</html>

<?php

?>
