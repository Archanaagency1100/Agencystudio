<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    $uploadDir = "uploads/";
    
    echo 'form data';
    print_r($_POST);

    // Create the uploads directory if not exists
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (!empty($username) && !empty($password) && isset($_FILES['file'])) {
        $file = $_FILES['file'];
        $fileName = basename($file['name']);
        $fileTmpPath = $file['tmp_name'];
        $fileSize = $file['size'];
        $fileType = $file['type'];
        $targetFilePath = $uploadDir . $fileName;
        
        // Allowed file types
        $allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        
        if (in_array($fileType, $allowedTypes)) {
            if ($fileSize < 5 * 1024 * 1024) { // 5MB limit
                if (move_uploaded_file($fileTmpPath, $targetFilePath)) {
                    echo "<p style='color: green;'>Form submitted successfully!</p>";
                    echo "<p><strong>Username:</strong> " . htmlspecialchars($username) . "</p>";
                    echo "<p><strong>Password:</strong> " . htmlspecialchars($password) . "</p>";
                    echo "<p><strong>Uploaded File:</strong> <a href='$targetFilePath' target='_blank'>$fileName</a></p>";
                } else {
                    echo "<p style='color: red;'>Error uploading file.</p>";
                }
            } else {
                echo "<p style='color: red;'>File size exceeds 5MB limit.</p>";
            }
        } else {
            echo "<p style='color: red;'>Invalid file type. Only JPG, PNG, and PDF allowed.</p>";
        }
    } else {
        echo "<p style='color: red;'>Please fill in all fields and upload a file.</p>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP Form with File Upload</title>
</head>
<body>

<h2>PHP Form with File Upload</h2>
<form method="post" action="" enctype="multipart/form-data">
    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required><br><br>

    <label for="password">Password:</label>
    <input type="password" id="password" name="password" required><br><br>

    <label for="file">Upload File:</label>
    <input type="file" id="file" name="file"  required><br><br>

    <input type="submit" value="Submit">
</form>

</body>
</html>
