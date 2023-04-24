<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class isZero
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */

     //will redirect to input otp when the code is not yet confirmed
    public function handle(Request $request, Closure $next)
    {
        if(auth()->user()->code!=0){
            return redirect()->route('confirm-otp');
    }
        return $next($request);
    

}
}
