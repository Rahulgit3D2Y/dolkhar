<?php 
//function Code link url

function create_slug($string){
   $slug=preg_replace('/[^A-Za-z0-9-]+/', '-', $string);
   return $slug;
}

//$subject = $_POST['subject'];
$subject = "Enquiry Page";

// $destination = $_POST['destination'];

// $destination1 = strtolower(create_slug($destination));
$name = $_POST['name'];
$checkin = $_POST['checkin'];
$checkout = $_POST['checkout'];
$rooms = $_POST['rooms'];
$phone =$_POST['phone'];
$adult = $_POST['adult'];
$email_address = $_POST['email'];
$children = $_POST['children'];
$sms = $_POST['message'];
$from = $email_address;

// $to = "reservation@dolkharladakh.com"; //firstpointcreations@gmail.com
$to = "reservation@dolkharladakh.com"; //firstpointcreations@gmail.com


echo $body = "<br><br><table width='100%' border='1' cellpadding='0' cellspacing='0'>


<tr>

<td width='25%' style='padding-left:10px;'><strong>Subject</strong></td>

<td width='10%' style='padding-left:10px;text-align:center;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$subject</td>

</tr>



<tr>

<td width='25%' style='padding-left:10px;'><strong>User Name</strong></td>

<td width='10%' style='padding-left:10px;text-align:center;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$name</td>

</tr>

<tr>

<td width='25%' style='padding-left:10px;'><strong>Email Id</strong></td>

<td width='10%' style='padding-left:10px;text-align:center;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$email_address</td>

</tr>

<tr>

<td width='25%' style='padding-left:10px;'><strong>Check In</strong></td>

<td width='10%' style='padding-left:10px;text-align:center;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$checkin</td>

</tr>

<tr>

<td width='25%' style='padding-left:10px;'><strong>Check Out</strong></td>

<td width='10%' style='padding-left:10px;text-align:center;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$checkout</td>

</tr>





<tr>

<td width='25%' style='padding-left:10px;'><strong>Rooms</strong></td>

<td width='10%' style='padding-left:10px;text-align:center;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$rooms</td>

</tr>



<tr>

<td width='25%' style='padding-left:10px;'><strong>Phone</strong></td>

<td width='10%' style='padding-left:10px;text-align:center;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$phone</td>

</tr>



<tr>

<td width='25%' style='padding-left:10px;'><strong>Adults</strong></td>

<td width='10%' style='padding-left:10px;text-align:center;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$adult</td>

</tr>


<tr>

<td width='25%' style='padding-left:10px;'><strong>Children</strong></td>

<td width='10%' style='padding-left:10px;text-align:center;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$children</td>

</tr>

<tr>

<td width='25%' style='padding-left:10px;'><strong>Message</strong></td>

<td width='10%' style='padding-left:10px;text-align:center;'><strong> : </strong></td>

<td width='55%' style='padding-left:10px;'>$sms</td>

</tr>


</table>"; 

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
// $headers = array(
//             'MIME-Version: 1.0',
//             'Content-Type: text/html; charset="UTF-8";',
//             'Content-Transfer-Encoding: 7bit',
//             'Date: ' . date('r', $_SERVER['REQUEST_TIME']),
//             'From: ' . $from,
//             'Return-Path: ' . $from
//         );
$mailsent = mail($to, $subject, $body, $headers);

if($mailsent){
            //$msg="<font color='#3C1006' face='verdana' size='2'>Congratulation!! <b> ".$_POST['name']." </b>, Thank you for submitting the form. We will contact you soon!....<hr color='#CC0000' size='4'></font>";
			//$msg2="Congratulation!! ".$_POST['name'].", Thank you for submitting the form. We will contact you soon!....";
			echo "<script>alert('Hi $name, Thank you for submitting the form. We will contact you soon!....')</script>";
$msg1 = "hi-$name"."-thank-you-for-submitting-the-form-We-will-contact-you-soon!"; 
	echo  "<script>"; 
	echo "location.href='index.html'";  
	echo  "</script>"; 
// 		header("location:payment/index.php?name=$name&checkin=$checkin&checkout=$checkout&rooms=$rooms&phone=$phone&adult=$adult&email=$email_address&child=$children&sms=$sms");

			
	//redirect to the 'thank you' page
	//include('index.php');
        }else{
            //$msg="<font color='#cc0000' face='verdana' size='2'>Sorry Mail Not Sent<hr color='#CC0000' size='4'></font>";
			//$msg2="Sorry Mail Not Sent";
			
		echo "<script>alert('Hii $name, Sorry Mail Not Sent')</script>";
$msg1 = "hi-$name"."-sorry-mail-not-sent"; 
	echo  "<script>"; 
	echo "location.href='index.html'";  
	echo  "</script>";	
			
			
	//redirect to the 'thank you' page
	//include('index.php');
        }


?>
