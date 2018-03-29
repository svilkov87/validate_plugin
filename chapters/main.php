<?php

include("include/connection.php");

## проверка ошибок
error_reporting(E_ALL | E_STRICT);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);

$time = time() - 20;

if (isset($_POST['send'])) {
    $login = $_POST['login'];
    $mail = $_POST['e-mail'];
    $password = $_POST['password'];
    $repeat = $_POST['repeat-password'];
    $message = $_POST['message'];
    $insert = $pdo->prepare("INSERT INTO `form_table` SET login=:login, email=:email, pass=:pass, rpass=:rpass, message=:message ");
    $insert->bindParam(':login', $login);
    $insert->bindParam(':email', $mail);
    $insert->bindParam(':pass', $password);
    $insert->bindParam(':rpass', $repeat);
    $insert->bindParam(':message', $message);
    $insert->execute();
    header("Location: ".$_SERVER["HTTP_REFERER"]);
    // header("Location: http://impovar.tt90.ru/profile/".$_SESSION["user_id"]);
    exit();
}

echo "<pre>";
var_dump($_POST);
echo "</pre>";

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>validate</title>
    <meta name="description" content="cv" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="img/favicon_fd.ico"/>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">
    <link rel="stylesheet" href="https://opensource.keycdn.com/fontawesome/4.7.0/font-awesome.min.css" integrity="sha384-dNpIIXE8U05kAbPhy3G1cz+yZmTzA6CY8Vg/u2L9xRnHjJiAK76m2BIEaSEV+/aU" crossorigin="anonymous">
    <link rel="stylesheet" href="app/css/libs.min.css">
</head>
<body>
<form action="" method="post" id="b-form">
  <input type="text" data-label="login" id="login" name="login">
  <input type="text" data-label="You're email" id="e-mail" name="e-mail">
  <input type="password" data-label="Password" id="password" name="password">
  <input type="password" data-label="Repeat you're password" id="repeat-password" name="repeat-password">
  <textarea data-label="Message" name="message"></textarea>
  <button name="send" type="submit">Login</button>
</form>
<script>
var pluginSettings = {
    formId : 'b-form',
    rules  : {
        'login' : {
            required  : true,
            messageRequired : 'Login is not required',
            messageLength   : 'Login must be more 4 symbols',
            // required  : false,
            minLength : 4
        },
        'password' : {
            minLength : 8,
            required  : true,
            matched   : 'repeat-password',
            messageRequired : 'Password is not required',
            messageLength   : 'Password must be more 8 symbols',
            messageMatch    : 'Passwords is not match'
        },
        'e-mail' : {
            minLength : 8,
            required  : true,
            messageRequired : 'Email is not required',
            messageLength   : 'Email must be more 8 symbols',
            messageExist    : 'Email must contain @, .com, .ru symbols',
            exist     : ['@','.ru','.com']
        },
        'message' : {
            minLength : 10,
            required  : false
        }
    }
    // defaultStyles : false
};
</script>
<script src="app/libs/main-min.js?<?php echo $time; ?>"></script>
</body>
</html>

