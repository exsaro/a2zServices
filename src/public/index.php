<?php
require __DIR__ . '../../lib/vendor/autoload.php';

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

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
		//$app->put('/update/{id}', 'updateEmployee');
		//$app->delete('/delete/{id}', 'deleteEmployee');
	});
});
function getConnection() {
    $dbhost="localhost";
    $dbuser="root";
    $dbpass="Welcome@747";
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
function addcustomer($request) {
    $cust = json_decode($request->getBody());
	$response = array();
    $sql = "INSERT INTO cust_sign_tbl (fname, lname, email_id,mobile) VALUES (:fname, :lname, :email, :mobile)";
    try {
     $db = getConnection();
        $stmt =$db->prepare($sql);
        $stmt->bindParam("fname", $cust->fname);
        $stmt->bindParam("lname", $cust->lname);
        $stmt->bindParam("email", $cust->email);
        $stmt->bindParam("mobile", $cust->mobile);
        $stmt->execute();
        $response["id"] = $db->lastInsertId();
       $db = null;
        echo json_encode($response);
    } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}';
    }
}
$app->run();
?>