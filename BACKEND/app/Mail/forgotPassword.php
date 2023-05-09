<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class forgotPassword extends Mailable
{
    use Queueable, SerializesModels;
    public $email;
    public $link;
       /**
        * Create a new message instance.
        *
        * @return void
        */
       public function __construct($link,$email)
       {
          $this->link = $link;
          $this->email = $email;
   
          
       }
       public function build(){
   
           $link = $this->link;
           $email = $this->email;
           return $this->to($email)->subject($link);
       }
   
       public function envelope()
       {
           return new Envelope(
               subject: 'Forgot Password',
           );
       }
   
       /**
        * Get the message content definition.
        *
        * @return \Illuminate\Mail\Mailables\Content
        */
       public function content()
       {
           return new Content(
               markdown: 'mail.forgot-pass',
           );
       }
   
       /**
        * Get the attachments for the message.
        *
        * @return array
        */
       public function attachments()
       {
           return [];
       }
   }
   