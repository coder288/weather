<?php

$coords = json_decode($_POST['coords'], true);
$lat = $coords['lat'];
$lng = $coords['lng'];

$limitDays = 7;

$condition = [
    'Clouds' => 'cloudy',
    'Clear' => 'clear',
    'Snow' => 'cloudy-and-snow',
    'Rain' => 'cloudy-and-rain',
    'Drizzle' => 'cloudy-and-light-rain',
    'Thunderstorm' => 'overcast-thunderstorms-with-rain'
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL,"https://api.openweathermap.org/data/2.5/forecast?lat=$lat&lon=$lng&APPID=1cc70ab40065531978208c146bd12990&units=metric");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$server_output = curl_exec ($ch);

curl_close ($ch);

$server_output = json_decode($server_output, true);

// Части дня
$dayParts = [];

$dayParts[0] = [
    'date' => date('Y-m-d', $server_output['list'][2]['dt']),
    'morning' => [
        'temp' => round($server_output['list'][2]['main']['temp']),
        'condition' => $condition[$server_output['list'][2]['weather'][0]['main']]
    ],
    'day' => [
        'temp' => round($server_output['list'][4]['main']['temp']),
        'condition' => $condition[$server_output['list'][4]['weather'][0]['main']]
    ],
    'evening' => [
        'temp' => round($server_output['list'][6]['main']['temp']),
        'condition' => $condition[$server_output['list'][6]['weather'][0]['main']]
    ],
    'night' => [
        'temp' => round($server_output['list'][8]['main']['temp']),
        'condition' => $condition[$server_output['list'][8]['weather'][0]['main']]
    ],
];

$dayParts[1] = [
    'date' => date('Y-m-d', $server_output['list'][10]['dt']),
    'morning' => [
        'temp' => round($server_output['list'][10]['main']['temp']),
        'condition' => $condition[$server_output['list'][10]['weather'][0]['main']]
    ],
    'day' => [
        'temp' => round($server_output['list'][12]['main']['temp']),
        'condition' => $condition[$server_output['list'][12]['weather'][0]['main']]
    ],
    'evening' => [
        'temp' => round($server_output['list'][14]['main']['temp']),
        'condition' => $condition[$server_output['list'][14]['weather'][0]['main']]
    ],
    'night' => [
        'temp' => round($server_output['list'][16]['main']['temp']),
        'condition' => $condition[$server_output['list'][16]['weather'][0]['main']]
    ],
];

$dayParts[2] = [
    'date' => date('Y-m-d', $server_output['list'][18]['dt']),
    'morning' => [
        'temp' => round($server_output['list'][18]['main']['temp']),
        'condition' => $condition[$server_output['list'][18]['weather'][0]['main']]
    ],
    'day' => [
        'temp' => round($server_output['list'][20]['main']['temp']),
        'condition' => $condition[$server_output['list'][20]['weather'][0]['main']]
    ],
    'evening' => [
        'temp' => round($server_output['list'][22]['main']['temp']),
        'condition' => $condition[$server_output['list'][22]['weather'][0]['main']]
    ],
    'night' => [
        'temp' => round($server_output['list'][24]['main']['temp']),
        'condition' => $condition[$server_output['list'][24]['weather'][0]['main']]
    ],
];

$dayParts[3] = [
    'date' => date('Y-m-d', $server_output['list'][26]['dt']),
    'morning' => [
        'temp' => round($server_output['list'][26]['main']['temp']),
        'condition' => $condition[$server_output['list'][26]['weather'][0]['main']]
    ],
    'day' => [
        'temp' => round($server_output['list'][28]['main']['temp']),
        'condition' => $condition[$server_output['list'][28]['weather'][0]['main']]
    ],
    'evening' => [
        'temp' => round($server_output['list'][30]['main']['temp']),
        'condition' => $condition[$server_output['list'][30]['weather'][0]['main']]
    ],
    'night' => [
        'temp' => round($server_output['list'][32]['main']['temp']),
        'condition' => $condition[$server_output['list'][32]['weather'][0]['main']]
    ],
];




// Создаём массив с данными для отображения
$result = [];
$result['days'] = $dayParts;
$result['now'] = time() . '000';
$result['success'] = true;

print_r(json_encode($result, 256));