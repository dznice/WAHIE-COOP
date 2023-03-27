@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header"></div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                        <p>OTP SENT TO EMAIL {{ auth()->user()->email }}</p>
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <div class="card">
                                    <div class="card-header">Enter OTP </div>
                    @foreach ($users as $user)
                        @if(auth()->user()->email==$user->email)
                   
                                    <div class="card-body">
                                        <form action='confirm-otp'  method="POST">
                                            @csrf
                                            <div class="row mb-3">
                                                <label for="code" class="col-md-4 col-form-label text-md-end"></label>
                      
                                                <div class="col-md-13">
                                                    <input id="code" type="text" class="form-control @error('code') is-invalid @enderror" name="code" required autocomplete="code">
                                                    <input id="id" type="hidden"  name="id" value={{  $user->id }}>
                                      
                                                    @error('code')
                                                        <span class="invalid-feedback" role="alert">
                                                            <strong>{{ $message }}</strong>
                                                        </span>
                                                    @enderror
                                                </div>
                                            </div>
                    
                    
                                            <div class="row mb-0">
                                                <div class="col-md-8 offset-md-4">
                                                    <button type="submit" class="btn btn-primary">
                                                        Submit
                                                    </button>
                 
                         @endif
                    @endforeach
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
