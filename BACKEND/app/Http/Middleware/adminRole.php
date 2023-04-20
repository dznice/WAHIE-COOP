<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class adminRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */

      //will be redirected back to admin webpage when trying to access superadmin
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->role_id==1){
            return $next($request);
        }else{
            return redirect('/superadmin/home')->with('error', 'You do not have access to admin');
        }

        
        
    }
    
}
