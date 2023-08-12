<?php 
//function Code link url

function create_slug($string){
   $slug=preg_replace('/[^A-Za-z0-9-]+/', '-', $string);
   return $slug;
}

//$subject = $_POST['subject'];
$subject = "Contact Us";

$name = $_POST['name'];

$newname = strtolower(create_slug($name));

$phone = $_POST['phone'];

$brief = $_POST['message'];

$email_address = $_POST['email'];

$from = "$email_address";

$to = "info@transx.com"; //firstpointcreations@gmail.com


$body = "<br><br><table width='100%' border='1' cellpadding='0' cellspacing='0'>


<tr>

<td width='25%' style='padding-left:10px;'><strong>Subject</strong></td>

<td width='10%' style='padding-left:10px;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$subject</td>

</tr>




<tr>

<td width='25%' style='padding-left:10px;'><strong>Name</strong></td>

<td width='10%' style='padding-left:10px;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$name</td>

</tr>



<tr>

<td width='25%' style='padding-left:10px;'><strong>E-mail Address</strong></td>

<td width='10%' style='padding-left:10px;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$email_address</td>

</tr>



<tr>

<td width='25%' style='padding-left:10px;'><strong>Phone</strong></td>

<td width='10%' style='padding-left:10px;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$phone</td>

</tr>


<tr>

<td width='25%' style='padding-left:10px;'><strong>Message</strong></td>

<td width='10%' style='padding-left:10px;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$brief</td>

</tr>


</table>"; 



$headers = array(
            'MIME-Version: 1.0',
            'Content-Type: text/html; charset="UTF-8";',
            'Content-Transfer-Encoding: 7bit',
            'Date: ' . date('r', $_SERVER['REQUEST_TIME']),
            'From: ' . $from,
            'Return-Path: ' . $from
        );
$mailsent = mail($to, $subject, $body, implode("\n", $headers));

if($mailsent){
            //$msg="<font color='#3C1006' face='verdana' size='2'>Congratulation!! <b> ".$_POST['name']." </b>, Thank you for submitting the form. We will contact you soon!....<hr color='#CC0000' size='4'></font>";
			//$msg2="Congratulation!! ".$_POST['name'].", Thank you for submitting the form. We will contact you soon!....";
			echo "<script>alert('Hi $name, Thank you for submitting the form. We will contact you soon!....')</script>";
$msg1 = "hi-$newname"."-thank-you-for-submitting-the-form-We-will-contact-you-soon!"; 
	echo  "<script>"; 
	echo "location.href='index.php?$msg1'";  
	echo  "</script>"; 
			
	//redirect to the 'thank you' page
	//include('index.php');
        }else{
            //$msg="<font color='#cc0000' face='verdana' size='2'>Sorry Mail Not Sent<hr color='#CC0000' size='4'></font>";
			//$msg2="Sorry Mail Not Sent";
			
		echo "<script>alert('Hii $name, Sorry Mail Not Sent')</script>";
$msg1 = "hi-$newname"."-sorry-mail-not-sent"; 
	echo  "<script>"; 
	echo "location.href='index.php?$msg1'";  
	echo  "</script>";	
			
			
	//redirect to the 'thank you' page
	//include('index.php');
        }


?>
