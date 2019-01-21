<?php
require __DIR__ . '../../lib/vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
//require_once('Middleware/settings.php');
use \Firebase\JWT\JWT;
//use \Tuupola\Base62;
//
//require '../../vendor/autoload.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
/*
$config['db']['host']   = 'localhost';
$config['db']['user']   = 'root';
$config['db']['pass']   = 'Welcome@747';
$config['db']['dbname'] = 'atozservice_db';
*/
$app = new \Slim\App(['settings' => $config]);

$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});
//require __DIR__ . '/Middleware/middleware.php';

//$app->add(new \TokenAuth());


$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
/*$app->add(new \Tuupola\Middleware\JwtAuthentication([
    "path" => "/api/v1", /* or ["/api", "/admin"] 
    "ignore" => ["/api/v1/login", "/api/v1/create"],
    "attribute" => "decoded_token_data",
    "secret" => "aMImBEhML0JXjmieK050pac1bFw3RvUP",
    "algorithm" => ["HS256"],
    "error" => function ($response, $arguments) {
        $data["status"] = "error";
        $data["message"] = $arguments["message"];
        return $response
            ->withHeader("Content-Type", "application/json")
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }
]));*/
/*$container = $app->getContainer();

$container['logger'] = function($c) {
    $logger = new \Monolog\Logger('my_logger');
    $file_handler = new \Monolog\Handler\StreamHandler('../logs/app.log');
    $logger->pushHandler($file_handler);
    return $logger;
};
$container['db'] = function ($c) {
    $db = $c['settings']['db'];
    $pdo = new PDO('mysql:host=' . $db['host'] . ';dbname=' . $db['dbname'],
        $db['user'], $db['pass']);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $pdo;
};*/
$app->group('/api', function () use ($app) {
    // Version group
    $app->group('/v1', function () use ($app) {
		//$app->get('/employees', 'getEmployes');
		//$app->get('/employee/{id}', 'getEmployee');
		$app->post('/create', 'addcustomer');
		$app->post('/login', 'cust_login');
		//$app->delete('/delete/{id}', 'deleteEmployee');
	});
});
function getConnection() {
    $dbhost="localhost";
    $dbuser="a2zuser";
    $dbpass="Welcome*1";
    $dbname="atozservice_db";
    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $dbh->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    return $dbh;
}
/*$app->post('/signup', function (Request $request, Response $response, array $args) {
   $req =json_decode($request->getBody());


    // $data = json_decode($req, true);
       /* $this->logger->addInfo("Ticket list");
    $mapper = new TicketMapper($this->db);
    $tickets = $mapper->getTickets();
    $response->withJson($req);

    return $req;
});*/

function cust_login($request , $resp) {
    $login = json_decode($request->getBody());
    $response = array();
    $pwd = md5($login->pwd);
    $sql = "SELECT * FROM cust_sign_tbl WHERE email_id= :email and pwd= :pwd";
    try {
     $db = getConnection();
        $stmt =$db->prepare($sql);
        $stmt->bindParam("email", $login->email);
        $stmt->bindParam("pwd", $pwd);
        $stmt->execute();
        $count = $stmt->rowCount();
        $res = $stmt->fetchAll();

        if ($count > 0){
            $base62 = new Tuupola\Base62;
            $now = new DateTime();
            $future = new DateTime("now +2 hours");
           // $header =  $base62->encode(["typ"=> "JWT","alg"=> "HS256"]);
            $jti = $base62->encode(random_bytes(16));
            $payload = [
                "jti" => $jti,
                "iat" => $now->getTimeStamp(),
                "nbf" => $future->getTimeStamp()
            ];
            
            $secret = 'aMImBEhML0JXjmieK050pac1bFw3RvUP';
        $response["token"] = JWT::encode( $payload, $secret, "HS256");
        $response["status"] = "Success";
        $response["Code"] = "200";
       
                 
    }
    $response["Result"] = $res;
    $db = null;
       return $resp->withJson($response);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

}
function addcustomer($request ,$resp) {
    $cust = json_decode($request->getBody());
    $response = array();
    $pwd = md5($cust->pwd);
	
    $sql = "INSERT INTO cust_sign_tbl (fname, lname, email_id, pwd, mobile) VALUES (:fname, :lname, :email, :pwd, :mobile)";
    try {
		if (verify_email($cust->email)){
		$db = getConnection();
        $stmt =$db->prepare($sql);
        $stmt->bindParam("fname", $cust->fname);
        $stmt->bindParam("lname", $cust->lname);
        $stmt->bindParam("email", $cust->email);
        $stmt->bindParam("pwd", $pwd);
        $stmt->bindParam("mobile", $cust->mobile);
        $stmt->execute();
        $response["Result"] = "Customer Registered Successfully";
        $response["status"] = "Success";
        $response["Code"] = "200";
		
		}else{
		$response["Result"] = "Email Id Already Registered";
        $response["status"] = "Success";
        $response["Code"] = "201";
	}
        $db = null;
		$response["verify"] = verify_email($cust->email);
		//$response = json_encode($response);
        return $resp->withJson($response);	        
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
	
	
}
function verify_email($email){
	
     $sql = "SELECT email_id FROM cust_sign_tbl WHERE email_id= :email";
    try {
     $db = getConnection();
        $stmt =$db->prepare($sql);
        $stmt->bindParam("email", $email);
        $stmt->execute();
        $count = $stmt->rowCount();
		if ($count > 0){
        $response = false;
        		}
		else{
		$response = true;
		}
       $db = null;
       return $response;
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }

}
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
    $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
    return $handler($req, $res);
});

$app->run();
?>