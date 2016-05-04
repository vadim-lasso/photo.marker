window.photoMarker = {};

window.photoMarker.init = function() {

	window.photoMarker.photoMarkerData = arPositionData;


	$(function() {

		window.photoMarker.$containerLink = $('#photo-marker-container');
		window.photoMarker.$windowLink = $('#photo-marker-window');
		window.photoMarker.$markerFormLink = $('#photo-marker-form');
		window.photoMarker.$markerLink = $('#photo-marker-item');
		window.photoMarker.$markerItemLink = $('[data-type="marker"]');
		window.photoMarker.$markerFormPointLink = window.photoMarker.$markerFormLink.children('div:first-child');

		window.photoMarker.$markerFormDeleteLink = window.photoMarker.$markerFormLink.find('[name="delete"]');
		window.photoMarker.$markerFormCancelLink = window.photoMarker.$markerFormLink.find('[name="cancel"]');
		window.photoMarker.$markerFormSaveLink = window.photoMarker.$markerFormLink.find('[name="save"]');

		window.photoMarker.actionTypeTemp = '';
		window.photoMarker.markerCurrentID = false;
		window.photoMarker.arMarkerCurrent = {};


		window.photoMarker.$containerLink.find('img').removeClass('hide');
		window.photoMarker.$windowLink.kinetic();


		if(window.photoMarker.photoMarkerData.length > 0) {
			window.photoMarker.photoMarkerData.forEach(function(arMarker, key) {
				window.photoMarker.markerCreate(arMarker, (key + 1));
			});
		}

		window.photoMarker.$containerLink.on('dblclick', function(event) {
			var x = event.offsetX / ($(this).width() / 100);
			var y = event.offsetY / ($(this).height() / 100);
			var type = 'add';

			window.photoMarker.arMarkerCurrent = {
				top: y, left: x, type: type
			};

			if (window.photoMarker.actionTypeTemp == 'edit') {
				window.photoMarker.formClean();
			}
			window.photoMarker.formShow();
			window.photoMarker.formPosition(y, x, type);

			return false;
		});

		$(document).on('click', window.photoMarker.$markerItemLink.selector, function() {
			window.photoMarker.markerCurrentID = $(this).data('id');
			var markerIndex = (window.photoMarker.markerCurrentID - 1);
			var marker = window.photoMarker.photoMarkerData[markerIndex];
			var type = 'edit';

			window.photoMarker.arMarkerCurrent = {
				top: marker.top, left: marker.left, type: type
			};

			window.photoMarker.$markerFormLink.find('[name="photo-marker-title"]').val(marker.title);
			window.photoMarker.$markerFormLink.find('[name="photo-marker-description"]').val(marker.description);

			window.photoMarker.formShow();
			window.photoMarker.formPosition(marker.top, marker.left, type);

			return false;
		});

		window.photoMarker.$markerFormPointLink.on('click', function() {
			window.photoMarker.formHide();
			return false;
		});

		window.photoMarker.$markerFormCancelLink.on('click', function() {
			window.photoMarker.formHide();
			return false;
		});

		window.photoMarker.$markerFormDeleteLink.on('click', function() {
			var markerID = window.photoMarker.markerCurrentID;
			var markerIndex = (markerID - 1);

			var $currentMarkerLink = window.photoMarker.$containerLink.find('[data-id="' + markerID + '"]');
			$currentMarkerLink.remove();

			delete window.photoMarker.photoMarkerData[markerIndex];

			window.photoMarker.formHide();
			return false;
		});

		window.photoMarker.$markerFormSaveLink.on('click', function() {
			var arMarker = window.photoMarker.arMarkerCurrent;
			arMarker.title = window.photoMarker.$markerFormLink.find('[name="photo-marker-title"]').val();
			arMarker.description = window.photoMarker.$markerFormLink.find('[name="photo-marker-description"]').val();

			if (window.photoMarker.actionTypeTemp == 'edit') {
				var markerID = window.photoMarker.markerCurrentID;
				var markerIndex = (markerID - 1);
				window.photoMarker.photoMarkerData[markerIndex] = arMarker;
			} else {
				window.photoMarker.photoMarkerData.push(arMarker);
				var markerIndex = window.photoMarker.photoMarkerData.length - 1;
				window.photoMarker.markerCreate(arMarker, (markerIndex + 1));
			}

			window.photoMarker.formClean();
			window.photoMarker.formHide();
			return false;
		});
	});
}

window.photoMarker.formPosition = function(top, left, type) {
	window.photoMarker.actionTypeTemp = type;
	window.photoMarker.$markerFormLink.find('button').removeClass('hide');
	if (type == 'edit') {
		window.photoMarker.$markerFormLink.find('[name="cancel"]').addClass('hide');
	} else {
		window.photoMarker.$markerFormLink.find('[name="delete"]').addClass('hide');
	}

	window.photoMarker.$markerFormLink.css('top', top + '%');
	window.photoMarker.$markerFormLink.css('left', left + '%');

	window.photoMarker.$markerItemLink.css('z-index', '10');
	window.photoMarker.$markerFormLink.css('z-index', '100');

	var bottom = window.photoMarker.$windowLink.offset().top + window.photoMarker.$windowLink.height();
	var left = window.photoMarker.$windowLink.offset().left;
	var $tooltip = window.photoMarker.$markerFormLink.children('div:nth-child(2)');

	$tooltip.css({'marginTop':0, 'marginRight':0});

	if ($tooltip.offset().top + $tooltip.outerHeight() > bottom) {
		$tooltip.css('margin-top', - ($tooltip.outerHeight()));
	}
	if ($tooltip.offset().left < left){
		$tooltip.css('margin-right', $tooltip.offset().left - left - 10);
	}
}

window.photoMarker.formShow = function() {
	window.photoMarker.$markerFormLink.removeClass('hide');
	window.photoMarker.$markerFormPointLink.addClass('active');
}

window.photoMarker.formHide = function() {
	window.photoMarker.$markerFormLink.addClass('hide');
	window.photoMarker.$markerFormPointLink.removeClass('active');
}

window.photoMarker.formClean = function() {
	window.photoMarker.$markerFormLink.find('[name="photo-marker-title"]').val('');
	window.photoMarker.$markerFormLink.find('[name="photo-marker-description"]').val('');
}

window.photoMarker.markerCreate = function(arMarker, ID) {
	var $marker = window.photoMarker.$markerLink.clone().removeAttr('id').removeClass('hide');
	$marker.attr('data-id', ID);
	$marker.attr('data-type', 'marker');
	$marker.css('top', arMarker.top + '%');
	$marker.css('left', arMarker.left + '%');
	if(arMarker.title) {
		$marker.find('div:nth-child(2)').children().text(arMarker.title);
	}
	if(arMarker.description) {
		$marker.find('div:nth-child(2)').append(arMarker.description);
	}
	$marker.appendTo(window.photoMarker.$containerLink);
}

window.photoMarker.saveData = function() {
	window.photoMarker.photoMarkerData = window.photoMarker.photoMarkerData.filter(function(obj){ return obj }); // fix undefined element
	window.jsPhotoMarker.__saveData(window.photoMarker.serialize(window.photoMarker.photoMarkerData));
	return false;
}


window.photoMarker.serialize =  function(obj)
{
	if (typeof(obj) == 'object')
	{
		var str = '', cnt = 0;
		for (var i in obj)
		{
			++cnt;
			str += window.photoMarker.serialize(i) + window.photoMarker.serialize(obj[i]);
		}

		str = "a:" + cnt + ":{" + str + "}";

		return str;
	}
	else if (typeof(obj) == 'boolean')
	{
		return 'b:' + (obj ? 1 : 0) + ';';
	}
	else if (null == obj)
	{
		return 'N;'
	}
	else if (Number(obj) == obj && obj != '' && obj != ' ')
	{
		if (Math.floor(obj) == obj)
			return 'i:' + obj + ';';
		else
			return 'd:' + obj + ';';
	}
	else if(typeof(obj) == 'string')
	{
		obj = obj.replace(/\r\n/g, "\n");
		obj = obj.replace(/\n/g, "###RN###");

		var offset = 0;
		if (window._global_BX_UTF)
		{
			for (var q = 0, cnt = obj.length; q < cnt; q++)
			{
				if (obj.charCodeAt(q) > 2047) offset+=2;
				else if (obj.charCodeAt(q) > 127) offset++;
			}
		}

		return 's:' + (obj.length + offset) + ':"' + obj + '";';
	}
}

