<?php

namespace Test\Unit;

use Api\Query\QuerySQL;
use \Api\Application;

class QuerySQLTest extends \PHPUnit_Framework_TestCase
{
    protected $app;

    public function setUp()
    {
        $_SESSION = array();
        $this->app = new Application();
    }

    public function testQueryJson4IdsIsArray()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids');
        $this->assertTrue(gettype($obj)==="array");
    }
/*    public function testQueryJson4IdsContainObjs()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $this->assertTrue(gettype($obj)==="object");
    }*/
    public function testQueryJson4IdsOneObjContainKeyId()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="id";
        $this->assertTrue(array_key_exists($key, $obj));
    }
    public function testQueryJson4IdsOneObjContainKeyIp()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="ip";
        $this->assertTrue(array_key_exists($key, $obj));
    }
    public function testQueryJson4IdsOneObjContainKeyUseragent()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="useragent";
        $this->assertTrue(array_key_exists($key, $obj));
    }
    public function testQueryJson4IdsOneObjContainKeyNdate()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="ndate";
        $this->assertTrue(array_key_exists($key, $obj));
    }
    public function testQueryJson4IdsOneObjContainKeyTypeext()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="typeext";
        $this->assertTrue(array_key_exists($key, $obj));
    }

    public function testQueryJson4IdsOneObjContainKeyExtrawpts()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="extrawpts";
        $this->assertTrue(array_key_exists($key, $obj));
    }

    public function testQueryJson4IdsOneObjContainKeyExtratrk()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="extratrk";
        $this->assertTrue(array_key_exists($key, $obj));
    }

    public function testQueryJson4IdsOneObjContainKeyFname()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="fname";
        $this->assertTrue(array_key_exists($key, $obj));
    }

    public function testQueryJson4IdsOneObjContainKeyEname()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="ename";
        $this->assertTrue(array_key_exists($key, $obj));
    }

    public function testQueryJson4IdsOneObjContainKeySendtype()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="sendtype";
        $this->assertTrue(array_key_exists($key, $obj));
    }

    public function testQueryJson4IdsOneObjContainKeyDel1step0()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="del1step0";
        $this->assertTrue(array_key_exists($key, $obj));
    }

    public function testQueryJson4IdsOneObjContainKeyDel1step1()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('ids')[0];
        $key="del1step1";
        $this->assertTrue(array_key_exists($key, $obj));
    }

    public function testQueryJson4UrlsOneObjContainKeyUrl()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('urls')[0];
        $key="url";
        $this->assertTrue(array_key_exists($key, $obj));
    }

    public function testQueryJson4UrlsOneObjContainKeyDel1step()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('urls')[0];
        $key="del1step";
        $this->assertTrue(array_key_exists($key, $obj));
    }

    public function testQueryJson4UrlsOneObjContainKeyErrorjson()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('urls')[0];
        $key="errorjson";
        $this->assertTrue(array_key_exists($key, $obj));
    }

    public function testQueryJson4UrlsOneObjContainKeyErrorjson2()
    {
        $temp = new QuerySQL($this->app->config['connMySQL'], $this->app->config['queries']);
        $obj = $temp->queryJson('urls')[0];
        $key="errorjson2";
        $this->assertTrue(array_key_exists($key, $obj));
    }
}
