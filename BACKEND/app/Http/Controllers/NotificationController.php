<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function sendSmsNotification(Request $request)
    {
        $mobile = $request->mobile;
        $basic  = new \Vonage\Client\Credentials\Basic("a2099d81", "RLhOCBdklPsMz9DF");
        $client = new \Vonage\Client($basic);

        $response = $client->sms()->send(
            new \Vonage\SMS\Message\SMS($mobile, 'BRAND_NAME', 'A text message sent using the Nexmo SMS API')
        ); 
        
        $message = $response->current();
        
        if ($message->getStatus() == 0) {
            echo "The message was sent successfully\n";
        } else {
            echo "The message failed with status: " . $message->getStatus() . "\n";
        }
    }


public function member_create()
{
    $data = Member::all();
    return view('member_create',['members' => $data]);
} 
}