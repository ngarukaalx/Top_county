--  MySQL setup development


CREATE DATABASE IF NOT EXISTS tpc_dev_db;
CREATE USER IF NOT EXISTS 'tpc_dev'@'localhost' IDENTIFIED BY 'tcp_dev_pwd';
GRANT ALL PRIVILEGES ON `tpc_dev_db`.* TO 'tpc_dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'tpc_dev'@'localhost';
FLUSH PRIVILEGES;
