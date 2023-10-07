<?php
class Database {
    private $host = 'localhost:3306';
    private $user = 'root';
    private $password = '';
    private $database = 'bookstore';

    public function connect() {
        $connection = new mysqli($this->host, $this->user, $this->password, $this->database);

        if ($connection->connect_error) {
            die('Connection failed: ' . $connection->connect_error);
        }

        return $connection;
    }
}

?>