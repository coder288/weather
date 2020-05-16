<?php

$coords = json_decode($_POST['coords'], true);
$lat = $coords['lat'];
$lng = $coords['lng'];

$limitDays = 7;
$url = 'https://api.weather.yandex.ru/v1/forecast?lat=' . $lat . '&lon=' . $lng . '&lang=ru_RU&limit=' . $limitDays . '&hours=false&extra=false';


$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$headers = [
    'X-Yandex-API-Key: 41fc1d38-8db4-42b1-9c05-65a94e26a27b',
];

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$server_output = curl_exec ($ch);

curl_close ($ch);

$server_output = json_decode($server_output, true);

// Части дня
$dayParts = [];

foreach ($server_output['forecasts'] as $key => $value) {
    $dayParts[$key] = [
        'date' => $value['date'],
        'morning' => [
            'temp' => $value['parts']['morning']['temp_min'] . '°' . '…' . $value['parts']['morning']['temp_max'] . '°',
            'condition' => $value['parts']['morning']['condition']
        ],
        'day' => [
            'temp' => $value['parts']['day']['temp_min'] . '°' . '…' . $value['parts']['day']['temp_max'] . '°',
            'condition' => $value['parts']['day']['condition']
        ],
        'evening' => [
            'temp' => $value['parts']['evening']['temp_min'] . '°' . '…' . $value['parts']['evening']['temp_max'] . '°',
            'condition' => $value['parts']['evening']['condition']
        ],
        'night' => [
            'temp' => $value['parts']['night']['temp_min'] . '°' . '…' . $value['parts']['night']['temp_max'] . '°',
            'condition' => $value['parts']['night']['condition']
        ]
    ];
}

// Создаём массив с данными для отображения
$result = [];
$result['days'] = $dayParts;
$result['now'] = $server_output['now'] . '000';
$result['success'] = true;

print_r(json_encode($result, 256));