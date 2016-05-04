<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_before.php");
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_admin_js.php");

$obJSPopup = new CJSPopup('',
	array(
		'TITLE' => 'Настройки карты',
		'SUFFIX' => 'marker',
		'ARGS' => ''
	)
);

$arData = array();
if ($_REQUEST['DATA'])
{
	CUtil::JSPostUnescape();
	if (CheckSerializedData($_REQUEST['DATA']))
	{
		$arData = unserialize($_REQUEST['DATA']);
		if (is_array($arData) && count($arData))
		{
			foreach ($arData as &$arMarker) {
				$arMarker['description'] = str_replace('###RN###', "\r\n", $arMarker['description']);
			}
		}
	}
}

$componentPath = str_replace($_SERVER['DOCUMENT_ROOT'], '', dirname(__FILE__));
$filePath = htmlspecialcharsEx($_REQUEST['PICTURE_SRC']);
?>

<script type="text/javascript" src="<?=$componentPath?>/jquery-2.2.3.min.js"></script>
<script type="text/javascript" src="<?=$componentPath?>/jquery.kinetic.min.js"></script>
<script type="text/javascript" src="<?=$componentPath?>/settings_load.js"></script>
<script type="text/javascript">
	BX.loadCSS('<?=$componentPath?>/settings.css');
	var arPositionData = <?echo is_array($arData) && count($arData) > 0 ? CUtil::PhpToJsObject($arData) : '[]'?>;
	window._global_BX_UTF = <?echo defined('BX_UTF') && BX_UTF == true ? 'true' : 'false'?>;
</script>
<?
$obJSPopup->ShowTitlebar();
$obJSPopup->StartDescription('bx-edit-menu');
?>
	<p><b>Управление отметками на изображении</b></p>
	<p class="note">Чтобы добавить новую отметку - сделайте двойной клик по выбранной области изображения</p>
<?
$obJSPopup->StartContent();
?>
<!--<div style="max-width: 770px; height: 415px;">-->
	<div id="photo-marker-window" class="v-tour-box v-tour-box-edit">
		<div id="photo-marker-container" class="wrap-v-t">
			<img src="<?=$filePath?>" alt="" class="img-v-t hide">

			<div id="photo-marker-item" class="lbl-object hide">
				<div class="ctrl-l-o"></div>
				<div class="box-l-o">
					<div class="title"></div>
				</div>
			</div>

			<div id="photo-marker-form" class="lbl-object hide">
				<div class="ctrl-l-o"></div>
				<div class="box-l-o">
					<form action="">
						<div class="row-form2">
							<input type="text" name="photo-marker-title" class="input-style1" placeholder="Заголовок" value="" />
						</div>
						<div class="row-form2">
							<textarea name="photo-marker-description" class="textarea-style1" placeholder="Описание"></textarea>
						</div>
						<div class="row-form2">
							<button type="button" name="save" class="btn btn-style1">Сохранить</button>
							<button type="button" name="delete" class="btn btn-style1">Удалить</button>
							<button type="button" name="cancel" class="btn btn-style1">Отменить</button>
						</div>
					</form>
				</div>
			</div>

		</div>
	</div>


<script type="text/javascript">
	window.photoMarker.init();
</script>
<?
$obJSPopup->StartButtons();
?>
<input type="submit" value="Сохранить" onclick="return window.photoMarker.saveData();" class="adm-btn-save"/>
<?
$obJSPopup->ShowStandardButtons(array('cancel'));
$obJSPopup->EndButtons();
?>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/epilog_admin_js.php");?>