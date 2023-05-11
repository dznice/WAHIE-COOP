<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class adminAdd extends Mailable
{
    use Queueable, SerializesModels;
 public $password;
 public $email;
 public $name;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($password,$email)
    {
       $this->password = $password;
       $this->email = $email;


    }
    public function build(){

        $password = $this->password;
        $email = $this ->email;
        return $this->to($email)->subject($password);
    }

    public function envelope()
    {
        return new Envelope(
            subject: 'New Admin',
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
            markdown: 'mail.add-admin',
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
