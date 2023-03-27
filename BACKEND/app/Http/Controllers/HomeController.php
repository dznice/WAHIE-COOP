<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Journal; 
use Illuminate\Http\Request;
use Illuminate\Http\Response;




class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
  
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index() 
    { 
        return view('home');
      
    }

    public function superHome(){    
        return view('super-home');
    }
    public function fChangPass()
    { 
        $data = user::all();
        if(auth()->user()->code==0){
            return redirect('super-home');
        }else
        return view('superadmin/first-change-password',['users' => $data]);
    }
    

    public function adminDisabled(){
        if(auth()->user()->status==1){
            return redirect('home');
        }else{
            return view('adminDisabled');
    }
     
    }
    public function adminTable(){
        $data = User::all();
       
        return view('superadmin/admin-table',['users' => $data]);
    }

    public function approval()
    {
        if(auth()->user()->status=='verified'){
            return redirect('home');
        }else{
        return view('approval');
        }
    }
    public function confirmOtp()
    {
        if(auth()->user()->code==0){
            return redirect('home');
        }else{
        $data = User::all();
        return view('confirm-otp',['users' => $data]);
    }
    }

    public function confirmOtpForm(Request $request){
   
    $user = user::find($request->id);
    if($request->code==auth()->user()->code){
    $user->code = 0;
    $user->save();
    return redirect('home');
    
}
dd('error');
}

/**
 * Show the form for creating a new resource.
 */
public function display()
{
    $journals = Journal::all();
    return view('accounting/journalentry')->with('journals', $journals);
}

/**
 * Store a newly created resource in storage.
 */
public function saveJournal(Request $request)
{
        $journal = new Journal; 
        $input = $request->all();
        
        //$journal->journal_number = $request->input('journal_number');
        //$journal->journal_name = $request->input('journal_name');
        //$journal->journal_type = $request->input('journal_type');
        $journal->fill($input)->save();
 
 
        return redirect('/');
}
}
