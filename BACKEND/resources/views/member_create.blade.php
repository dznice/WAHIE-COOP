<!DOCTYPE html>
<html lang="en">
<head>
  <title>Member Add Management</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
</head>
<body>

<div class="container">
  <h2 class="text-center">Member Add Management</h2>

  <br>
  <form action = "/member_create" method = "post" class="form-group" style="width:70%; margin-left:15%;">

  <input type = "hidden" name = "_token" value = "<?php echo csrf_token(); ?>"><input type = "hidden" name = "_token" value = "<?php echo csrf_token(); ?>">

  	<label >MEMBER ID:</label>
    <br>

      @php
      $count = 1;
      $member = 1;
      $loop = true;
      $max = $members->max();

    while($loop == true){
      $id = 1;
      while($count<=$max){
    foreach ($members as $member) {
      if($member==$id){
      $id++;
      }
    }
      $count++;
      }
    $member = $id;
    $loop = false;
    }
  @endphp



    <input type="hidden" name="predef" value="WAH">
    WAH - <input  type="text" name="account_id" value={{$member}} >

    @if ($errors->has('account_id'))
    <span class="text-danger">{{ $errors->first('account_id') }}</span>
@endif
    <br>

	<label>First Name:</label>
    <input type="text" class="form-control" placeholder="First Name" name="first_name">
    <label>Middle Name:</label>
    <input type="text" class="form-control" placeholder="Middle Name" name="middle_name">
    <label>Last Name:</label>
    <input type="text" class="form-control" placeholder="Last Name" name="last_name">
    <label>Suffix:</label>
    <input type="text" class="form-control" placeholder="Suffix" name="suffix">
    <label>Date of Birth:</label>
	<input type="date" class="form-control" id="birthday" name="birthdate">
    <label>Address:</label>
    <input type="text" class="form-control" placeholder="Address" name="address">
    <label>Spouse:</label>
    <input type="text" class="form-control" placeholder="Spouse" name="spouse">
    <label>Civil Status:</label>
    <input type="text" class="form-control" placeholder="Civil Status" name="civil_status">
    <label>TIN Number:</label>
    <input type="text" class="form-control" placeholder="TIN Number" name="tin_number">
    <label>Occupation:</label>
    <input type="text" class="form-control" placeholder="Occupation" name="occupation">
    <label>Gender:</label>
	<select class="form-control" name="gender" required>
    <option value=" "></option>
		<option value="Male">Male</option>
		<option value="Female">Female</option>
		<option value="Others">Others</option>
	</select>
    <label>Department:</label>
    <input type="text" class="form-control" placeholder="Department" name="department">
    <label>Employment Status:</label>
    <input type="text" class="form-control" placeholder="Employment Status" name="employment_status">
    <label>Company Name:</label>
    <input type="text" class="form-control" placeholder="Company Name" name="company_name">
    <label>Company Address:</label>
    <input type="text" class="form-control" placeholder="Company Address" name="company_address">
    <label>Job Title:</label>
    <input type="text" class="form-control" placeholder="Job Title" name="job_title">
	<label>Email:</label>
    <input type="text" class="form-control" placeholder="Enter Email" name="email">
    <label>Mobile Number:</label>
    <input type="text" class="form-control" placeholder="Enter Number" name="mobile_number"><br>

    <br>
    <table>
      <button type="button"  class="btn btn-primary" id = "add_benificiaries"> ADD</button>
     <thead>
          <tr>
              <td></td>
              <td></td>
          </tr>
      </thead>
      <tbody class="benificiary_table">
      </tbody>
  </table>
    <br>

    <button type="submit"  value = "Add student" class="btn btn-primary">Submit</button>


  </form>
</div>

<script>
  $('#add_benificiaries').on('click', function(){
    var html = '';
    html+='<tr>';
    html+=' <td class="col-6 p-2 ps-0"><input type="text" class="form-control" placeholder="Enter Member" name="member_name[]"/></td>';
    html+='<<td ><input type="date" class="form-control" placeholder="Enter Birthdate" name="member_birthdate[]"/></td>';
    html+='<td class="col-3 pe-2 ps-0"><input type="text" class="form-control" placeholder="Enter Relation" name="member_relation[]"/></td>';
    html+='<td><button type="button" class="btn p-2" id="remove_benificiaries" ><i class="fa-sharp fa-regular fa-circle-xmark fw-bold text-danger fs-3"></i> Delete </button></td>';
    html+='<tr>';
    $('.benificiary_table').append(html);
})
$(document).on('click', '#remove_benificiaries', function () {
      $(this).parents('tr').remove();
  });

</script>
</body>
</html>
