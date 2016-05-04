<?
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED!==true) die();

$obJSPopup = new CJSPopup('',
	array(
		'TITLE' => 'test'
	)
);

$obJSPopup->StartContent();
?>

<h1>TEST!!!!!!!!!!!!!!!!!!!</h1>

<?
$componentPath = str_replace($_SERVER['DOCUMENT_ROOT'], '', dirname(__FILE__));

$arComponentParameters = array(
	'GROUPS' => array(
	),
	'PARAMETERS' => array(
		'PATH' => array(
			'PARENT' => 'BASE',
			'NAME' => 'Путь к файлу',
			'TYPE' => 'FILE',
			'FD_TARGET' => 'F',
			'FD_EXT' => 'jpg, gif, bmp, png, jpeg',
			'FD_UPLOAD' => true,
			'FD_USE_MEDIALIB' => true,
			'FD_MEDIALIB_TYPES' => Array('image'),
			'DEFAULT' => '',
			'REFRESH' => 'Y'
		),
	),
);

if(!empty($arCurrentValues['PATH']))
{
	$arComponentParameters['PARAMETERS']['DATA'] = array(
		'NAME' => 'Данные, выводимые на изображении',
		'TYPE' => 'CUSTOM',
		'JS_FILE' => $componentPath . '/settings/settings.js',
		'JS_EVENT' => 'OnSettingsEdit',
		'JS_DATA' => array(
			'BUTTON_NAME' => 'Изменить',
			'COMPONENT_PATH' => $componentPath,
			'PICTURE_SRC' => $arCurrentValues['PATH'],
		),
		'DEFAULT' => '',
		'PARENT' => 'BASE',
	);
}


?>