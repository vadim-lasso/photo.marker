<?
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true) die();

$arResult['PICTURE_SRC'] =  $arParams['PATH'];

if (CheckSerializedData($arParams['~DATA']) && ($arResult['MARKER'] = unserialize($arParams['~DATA'])))
{
	if (is_array($arResult['MARKER']) && ($cnt = count($arResult['MARKER'])))
	{
		for ($i = 0; $i < $cnt; $i++)
		{
			$arResult['MARKER'][$i]['TEXT'] = str_replace('###RN###', "\r\n", $arResult['MARKER'][$i]['TEXT']);
		}
	}
}

$this->IncludeComponentTemplate();
?>