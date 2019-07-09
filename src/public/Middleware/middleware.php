<?php
// Application middleware
$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
// e.g: $app->add(new \Slim\Csrf\Guard);
// $app->add(new \Tuupola\Middleware\JwtAuthentication([
//     "path" => "/api/v1", /* or ["/api", "/admin"] */
//     "ignore" => ["/api/v1/login", "/api/v1/create"],
//     "attribute" => "decoded_token_data",
//     "secret" => "aMImBEhML0JXjmieK050pac1bFw3RvUP",
//     "algorithm" => ["HS256"],
//     "error" => function ($response, $arguments) {
//         $data["status"] = "error";
//         $data["message"] = $arguments["message"];
//         return $response
//             ->withHeader("Content-Type", "application/json")
//             ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
//     }
// ]));