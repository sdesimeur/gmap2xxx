<?php

namespace Test\Functional;

use \Slim\Environment;
use \Api\Application;

class QuerySQLTest extends \PHPUnit_Framework_TestCase
{
    protected $app;

    public function setUp()
    {
        $_SESSION = array();
        $this->app = new Application();
    }

    public function testQuerySQL()
    {
        $this->assertEquals(2, count($this->app->config['queries']));
        foreach ($this->app->config['queries'] as $id => $query) {
            $app = new Application();
            Environment::mock(array(
                'PATH_INFO' => '/querysql/' . $id,
            ));
            $response = $app->invoke();
            $resjson = $response->getBody();
            $this->assertEquals(
                json_encode(array_merge(array('id' => $id), $feature, array('href' => './api/features/' . $id))),
                $response->getBody()
            );
            $this->assertEquals(200, $response->getStatus());
        }
    }

    public function testUnknownQuerySQLGets404()
    {
        Environment::mock(array(
            'PATH_INFO' => '/querysql/unknown',
        ));
        $response = $this->app->invoke();
        $this->assertEquals(json_encode(array(
            "status" => 404,
            "statusText" => "Not Found",
            "description" => "Resource /querysql/unknown using GET method does not exist.",
        )), $response->getBody());
        $this->assertEquals(404, $response->getStatus());
    }
}
