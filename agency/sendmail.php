<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $email = $_POST['email'] ?? '';
    $number = $_POST['number'] ?? '';
    $fileUpload = $_FILES['resume']['name'] ?? '';

    $to = "priya@1100.in";
    $subject = "New Job Application from $firstName $lastName";

    $message = "You have received a new job application.\n\n";
    $message .= "First Name: $firstName\n";
    $message .= "Last Name: $lastName\n";
    $message .= "Email: $email\n";
    $message .= "Phone Number: $number\n";

    $boundary = md5(time());
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n\r\n";
    $body .= chunk_split(base64_encode($message));

    if (!empty($fileUpload) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $fileName = $_FILES['resume']['name'];
        $fileTmpName = $_FILES['resume']['tmp_name'];
        $fileType = $_FILES['resume']['type'];
        $fileContent = chunk_split(base64_encode(file_get_contents($fileTmpName)));

        $body .= "--$boundary\r\n";
        $body .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n\r\n";
        $body .= $fileContent . "\r\n";
        $body .= "--$boundary--";
    }

    // Send email and redirect
    if (mail($to, $subject, $body, $headers)) {
        header("Location: career.html?msg=success");
        exit();
    } else {
        header("Location: career.html?msg=error");
        exit();
    }
}
?>
