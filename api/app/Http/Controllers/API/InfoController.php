<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller; 
use Validator;
use App\Traits\InfoTrait;
use Illuminate\Http\Request;

class InfoController extends Controller {
    
    use InfoTrait;

    public function CreateNewInfoRecord (Request $request) {
        
        $input =  $request->all();
    
        $validator = Validator::make($input['data'], [ 
            'first_name' => 'required',
            'last_name' => 'required', 
        ]);

        if ($validator->fails()) { 
            return response()->json(['message'=> json_encode($validator->errors())], 401);            
        }

        // Create New Record
        return $this->CreateNewInfoRecordTrait( $input['data'] );

       
    }

    public function GetInfoList (Request $request) {
        
        $input =  $request->all();
        // Get Info List
        return $this->GetInfoListTrait( $input );
    }

    public function UpdateInfoRecord (Request $request) {
        $input = $request->all();
        
        $validator = Validator::make($input['data'], [ 
            'id' => 'required',
            'infoToUpdate' => 'required|array', 
        ]);

        if ($validator->fails()) { 
            return response()->json(['message'=> json_encode($validator->errors())], 401);            
        }

        // Update Record
        return $this->UpdateInfoRecordTrait( $input['data'] );
    }

    public function RemoveInfoRecord(Request $request) {
        $input =  $request->all();
        
        $validator = Validator::make($input['data'], [ 
            'id' => 'required'
        ]);

        if ($validator->fails()) { 
            return response()->json(['message'=> json_encode($validator->errors())], 401);            
        }

        // Update Record
        return $this->RemoveInfoRecordTrait( $input['data'] );
    }
}