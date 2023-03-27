<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class adminDisabled
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */


     //will redirect to disable webpage if the admin account is disabled
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->status==0){
            return redirect()->route('adminDisabled');
        }
        return $next($request);
    }
    }

