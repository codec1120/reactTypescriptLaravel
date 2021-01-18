<?php

namespace App\Traits;

use App\Models\Info;

trait InfoTrait { 
    
    public function CreateNewInfoRecordTrait ( $input ) {
       
         // Check User existence
         $userExist = Info::where('first_name', '=',  $input['first_name'])
                            ->where('last_name', '=',  $input['last_name'])
                            ->exists();

         // If User Exist then return message user already exist in the Database
         if ( $userExist ) {
             return response()
                     ->json(
                         array(
                             'message' => $input['first_name']." ".$input['last_name']." already exist!"
                         ),
                         201
                     );
         }
 
         // Create New Record
         $info = [
             'first_name' => $input['first_name'],
             'last_name' => $input['last_name']
         ];
         
         Info::create( $info );
        
         return response()
                ->json(
                    array(
                        'message' => "Successfully Created!"
                    ),
                    200
                );
    }

    public function GetInfoListTrait ( $input ) {
        // Verify Parameter
        $whereValue =  isset( $input['whereValue'] ) ? $input['whereValue'] : '';
        $Wherecolumn = isset( $input['whereColumn'] ) ? $input['whereColumn'] : '';
        $limit =isset( $input['limit'] ) ? $input['limit'] : 20;
        $page = isset( $input['page'] ) ? $input['page'] : 0;
        $infoList = '';
        
        // Get list

        if ( !empty( $whereValue ) || !empty( $Wherecolumn ) ) {
            $infoList = Info::where($Wherecolumn, "like" ,"%".$whereValue."%")
                        ->skip( $page )
                        ->take( $limit )
                        ->get()
                        ->toArray();
        } else {
            $infoList = Info::skip( $page )
                        ->take( $limit )
                        ->get()
                        ->toArray();
        }

        return response()
                ->json(
                    empty( $infoList ) || count( $infoList ) <= 0 ?
                        array(
                            'message' => "No record found."
                        ) :
                        array(
                            'data' => $infoList
                        ),
                    empty( $infoList ) || count( $infoList ) <= 0 ? 200: 200 
                ); 
        
    }

    public function UpdateInfoRecordTrait ( $input ) {
        Info::where('id', $input['id'])->update( $input['infoToUpdate'] );
        
         return response()
                ->json(
                    array(
                        'message' => "Successfully updated!"
                    ),
                    200
                );
    }

    public function RemoveInfoRecordTrait ( $input ) {
      
        Info::where('id', $input['id'])->delete( );

        return response()
                ->json(
                    array(
                        'message' => "Successfully deleted!"
                    ),
                    200
                );
    }
}