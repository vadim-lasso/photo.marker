<? if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die(); ?>

<div class="v-tour-box virtual">
	<div class="wrap-v-t">
		<? if($arResult['PICTURE_SRC']): ?>
			<img src="<?=$arResult['PICTURE_SRC']?>" alt="" class="img-v-t">
		<? endif; ?>
		<? foreach($arResult['MARKER'] as $arMarker): ?>
			<div class="lbl-object" style="top: <?=$arMarker['top']?>%; left: <?=$arMarker['left']?>%">
				<div class="ctrl-l-o"></div>
				<div class="box-l-o">
					<div class="title"><?=$arMarker['title']?></div>
					<?=$arMarker['description']?>
				</div>
			</div>
		<? endforeach ?>
	</div>
</div>
