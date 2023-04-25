@extends('layouts.app')
@section('content')
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" ></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css"  />
    <link href="https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css" rel="stylesheet">
    <script src="https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js"></script>
</head>
<body>
    <div class="container">
        <h1>Manage Accounts</h1>
        <table class="table table-bordered">
            <thead>
               <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
               </tr> 
            </thead>
               
            <tbody>
               @foreach($users as $user)
               @if ($user->role_id==1)
                  <tr>
                     <td>{{ $user->name }}</td>
                     <td>{{ $user->email }}</td>
                     <td>
                       
                     @if ( $user->status==2)  
                     
                        <form action='/superadmin/admin-table'  method="POST">
                            @csrf
                            <div class="input-group" >
                                <input type="hidden" class="form-control" value={{ $user->id }} name="id">
                                <input type="hidden" class="form-control" value='1' name="status">
                                </div>
                                <button type="submit"  class="btn btn-success">
                                    <span>Activate</span>
                                </button>
                            </div>
                        </form>
                        @else
                     <input data-id="{{$user->id}}" class="toggle-class" type="checkbox" data-onstyle="success" data-offstyle="danger" data-toggle="toggle" data-on="Verified" data-off="Disabled" {{ $user->status ? 'checked' : '' }}>
                     @endif
                     </td>
                     @endif
                  </tr>
               @endforeach
            </tbody>
          
        </table>
    </div>
</body>
<script>
    $(function() { 
        
            $('.toggle-class').change(function() { 

            var status = $(this).prop('checked') == true ? 1 : 0;  

            var id = $(this).data('id');  
            $.ajax({ 
     
                type: "GET", 
                dataType: "json", 
                url: '/changeStatus', 
                data: {'status': status, 'id': id}, 
                success: function(data){ 
                console.log(data.success) 
             }
            
          }); 
       }) 
    }); 
 </script>
</html>
@endsection