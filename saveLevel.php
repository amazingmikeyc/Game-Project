<?php

include("db.php");
print_r($_POST);



$serialised =json_encode($_POST,JSON_NUMERIC_CHECK);



$serialised = str_replace('\\','',$serialised);
echo $serialised;


$sql = 'insert into level (serialised_level, last_edited, author_id) values ("'.mysql_real_escape_string($serialised, $connection).'", now(), 1)';

mysql_query($sql, $connection);

echo $sql;
?>