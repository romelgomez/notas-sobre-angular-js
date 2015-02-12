<?php

    $array_data = array(
        0 => array(
            'text'=> 'Aprender Angular Js',
            'status'=> false,
        ),
        1 => array(
            'text'=> 'Migrar el codigo',
            'status'=> false,
        ),
        2 => array(
            'text'=> 'Actualizar el blog',
            'status'=> false,
        ),
        3 => array(
            'text'=> 'Tomar agua',
            'status'=> true,
        ),
        4 => array(
            'text'=> 'Comer',
            'status'=> true,
        )
    );

    // callback=angular.callback._0

    if(isset($_GET["callback"])){
       echo $_GET["callback"].'({"results":'.json_encode($array_data).'})';
    }else{
       echo '{"results":'.json_encode($array_data).'}';
    }