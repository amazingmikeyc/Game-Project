<?php


include("db.php");

if ($_GET['id']) {
	$id = (int) $_GET['id'];
	$sql = 'SELECT * FROM `level` l where id='.$id.' limit 1';
}else {
	$sql = 'SELECT * FROM `level` l order by rand() limit 1';
}
$result = mysql_query($sql,$connection);

$record = mysql_fetch_assoc($result);

$level = ($record['serialised_level']);



echo $level;

?>
