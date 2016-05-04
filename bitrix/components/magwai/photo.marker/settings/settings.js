function OnSettingsEdit(arParams)
{
	if (null != window.jsPhotoMarker)
	{
		try {window.jsPhotoMarker.Close();}catch (e) {}
		window.jsPhotoMarker = null;
	}
	window.jsPhotoMarker = new JCEditorOpener(arParams);
}

function JCEditorOpener(arParams)
{
	this.jsOptions = arParams.data;
	this.arParams = arParams;

	var obButton = document.createElement('INPUT');
    obButton.type = "button";
    obButton.value = this.jsOptions['BUTTON_NAME'];
	this.arParams.oCont.appendChild(obButton);
	
	obButton.onclick = BX.delegate(this.btnClick, this);
	this.saveData = BX.delegate(this.__saveData, this);
}

JCEditorOpener.prototype.Close = function(e)
{
	if (false !== e)
		BX.PreventDefault(e);

	if (null != window.jsPopupPhotoMarker)
	{
		window.jsPopupPhotoMarker.Close();
	}
}

JCEditorOpener.prototype.btnClick = function ()
{
	this.arElements = this.arParams.getElements();
	if (!this.arElements)
		return false;

	if (null == window.jsPopupPhotoMarker)
	{
		var strUrl = this.jsOptions['COMPONENT_PATH'] + '/settings/settings.php';

		var strUrlPost = 'DATA=' + BX.util.urlencode(this.arParams.oInput.value)
						+ '&PICTURE_SRC=' + this.jsOptions['PICTURE_SRC']
						+ '&COMPONENT_PATH=' + this.jsOptions['COMPONENT_PATH'];

		window.jsPopupPhotoMarker = new BX.CDialog({
			'content_url': strUrl,
			'content_post': strUrlPost,
			'width':800, 'height':500,
			'resizable':true
		});
	}

	window.jsPopupPhotoMarker.Show();
	window.jsPopupPhotoMarker.PARAMS.content_url = '';
	return false;
}

JCEditorOpener.prototype.__saveData = function(strData)
{
	this.arParams.oInput.value = strData;
	if (null != this.arParams.oInput.onchange)
		this.arParams.oInput.onchange();

	this.Close(false);
}