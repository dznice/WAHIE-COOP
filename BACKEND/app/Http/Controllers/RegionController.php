<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RegionModel;
use App\Models\ProvinceModel;
use App\Models\CitiesModel;
use App\Models\BarangayModel;

class RegionController extends Controller
{

    public function region(){
        $region = RegionModel::all();
        return response()->json($region);
    }

    public function regions($regions){
        $region = RegionModel::where('region_code', $regions)->get();
        return response()->json($region);
    }

    public function provinces(){
        $provinces = ProvinceModel::all();
        return response()->json($provinces);
    }

    public function province($regionCode){
        $provinces = ProvinceModel::where('region_code', $regionCode)->get();
        return response()->json($provinces);
    }

    public function provinceer($province){
        $provinces = ProvinceModel::where('province_code', $province)->get();
        return response()->json($provinces);
    }

    public function cities(){
        $cities = CitiesModel::all();
        return response()->json($cities);
    }

    public function city($provinceCode){
        $cities = CitiesModel::where('province_code', $provinceCode)->get();
        return response()->json($cities);
    }

    public function memcity($memcity){
        $cities = CitiesModel::where('city_municipality_code', $memcity)->get();
        return response()->json($cities);
    }

    public function barangays(){
        $brgy = BarangayModel::all();
        return response()->json($brgy);
    }

    public function barangay($cityCode){
        $brgy = BarangayModel::where('city_municipality_code', $cityCode)->get();
        return response()->json($brgy);
    }

    public function brgys($brgys){
        $brgy = BarangayModel::where('barangay_code', $brgys)->get();
        return response()->json($brgy);
    }

    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
