-- prepares a Mysql server for the tpc project/test

CREATE DATABASE IF NOT EXISTS tpc_test_db;
CREATE USER IF NOT EXISTS 'tpc_test'@'localhost' IDENTIFIED BY 'tpc_test_pwd';
GRANT ALL PRIVILEGES ON `tpc_test_db`.* TO 'tpc_test'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'tpc_test'@'localhost';
FLUSH PRIVILEGES;
