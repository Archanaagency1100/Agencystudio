<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);
    $email = htmlspecialchars($_POST['email']);
    $number = htmlspecialchars($_POST['number']);
    $service = htmlspecialchars($_POST['service']);

    $to = "info@1100.in";
    $subject = "New Contact Form Submission";
    $message = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
    </head>
    <body>
        <p><strong>First Name:</strong> $firstName</p>
        <p><strong>Last Name:</strong> $lastName</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone Number:</strong> $number</p>
        <p><strong>Service Interested In:</strong> $service</p>
    </body>
    </html>
    ";

    // Set headers to improve deliverability
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: info@yourdomain.com" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "Return-Path: info@yourdomain.com" . "\r\n";

    // Send email
    if (mail($to, $subject, $message, $headers)) {
        echo "Email sent successfully!";
    } else {
        echo "Failed to send email.";
    }
}
?>
